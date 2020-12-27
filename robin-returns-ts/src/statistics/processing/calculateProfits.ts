import { TableColumn } from "../../components/statistics/DataTable";
import { ServerData } from "../../components/DataPage";
import { BasePosition, Position } from "../Position";
import { RHPosition, RobinhoodURL, RHOrder } from "../ResponseTypes";
import InstrumentMap from "./instrumentMapping";

interface OrderData {
  instrument: RobinhoodURL;
  state: "confirmed" | "filled" | "cancelled";
  side: "buy" | "sell";
  executed_notional: {
    amount: string;
    currency_code: string;
    currency_id: string;
  };
  cumulative_quantity: string;
  created_at: Date;
}
interface SeparatedOrderData {
  buyOrderData: Array<OrderData>;
  sellOrderData: Array<OrderData>;
}
function separateOrdersIntoBuyAndSell(
  orders: Array<RHOrder>
): SeparatedOrderData {
  const buyOrderData: Array<OrderData> = [];
  const sellOrderData: Array<OrderData> = [];

  for (const {
    instrument,
    state,
    side,
    executed_notional,
    cumulative_quantity,
    created_at,
  } of orders) {
    if (state !== "filled") {
      continue;
    }
    if (executed_notional == null) {
      console.log("Found a non-cancelled order with price == null.");
      debugger;
      continue;
    }

    const orderData: OrderData = {
      instrument,
      state,
      side,
      executed_notional,
      cumulative_quantity,
      created_at: new Date(created_at),
    };

    if (side === "buy") {
      buyOrderData.push(orderData);
    } else {
      sellOrderData.push(orderData);
    }
  }

  return { buyOrderData, sellOrderData };
}

function filterOutBuyOrdersOccurringAfterLastSell({
  buyOrderData,
  sellOrderData,
}: SeparatedOrderData): SeparatedOrderData {
  if (sellOrderData.length === 0) {
    return { buyOrderData, sellOrderData };
  }

  const lastSell = sellOrderData[sellOrderData.length - 1];
  // Pop off buy order if after last sell date
  while (
    buyOrderData.length > 0 &&
    buyOrderData[buyOrderData.length - 1].created_at > lastSell.created_at
  ) {
    buyOrderData.pop();
  }

  return { buyOrderData, sellOrderData };
}

// TODO kedar: Figure out why it doesn't work on ERI.
/**
 *
 * @param instrumentToOrders Mapping from instrument to all orders of that instrument. Must be in chronological order (earliest to latest)
 * @param basePositions
 */
function populateRealizedProfits(
  instrumentToOrders: InstrumentMap<Array<RHOrder>>,
  basePositions: InstrumentMap<BasePosition>
): InstrumentMap<Position> {
  const basePositionsWithRealizedProfits: InstrumentMap<Position> = {};

  for (const [instrument, orders] of Object.entries(instrumentToOrders)) {
    const separatedOrderData = separateOrdersIntoBuyAndSell(orders);
    let sumCost = 0;
    let sumQuantityBought = 0;
    let sumProfit = 0;
    let sumQuantitySold = 0;

    let realizedProfit: number | null = 0;

    if (separatedOrderData.sellOrderData.length === 0) {
      // Realized profit already initialized to null in `generateBasePositions`, so we can just continue.
      basePositionsWithRealizedProfits[instrument] = {
        ...basePositions[instrument],
      };
      continue;
    }

    // Remove all the buy orders that occur after the last sell order
    const {
      buyOrderData,
      sellOrderData,
    } = filterOutBuyOrdersOccurringAfterLastSell(separatedOrderData);

    // Calculate average buy / sell prices of all the equity that's been sold already
    for (const { executed_notional, cumulative_quantity } of buyOrderData) {
      sumCost += parseFloat(executed_notional.amount);
      sumQuantityBought += parseFloat(cumulative_quantity);
    }

    // This accounts for gift stocks that have been sold. (There is no corresponding buy order.)
    const averageBuyPrice =
      sumQuantityBought > 0 ? sumCost / sumQuantityBought : sumCost;

    for (const { executed_notional, cumulative_quantity } of sellOrderData) {
      sumProfit += parseFloat(executed_notional.amount);
      sumQuantitySold += parseFloat(cumulative_quantity);
    }

    const averageSellPrice = sumProfit / sumQuantitySold;

    realizedProfit = (averageSellPrice - averageBuyPrice) * sumQuantitySold;

    // Copy base position with realized profits added
    basePositionsWithRealizedProfits[instrument] = {
      ...basePositions[instrument],
      [TableColumn.REALIZED_PROFIT]: realizedProfit,
    };
  }

  return basePositionsWithRealizedProfits;
}

function populateUnrealizedProfits(
  instrumentToPositionFromServer: InstrumentMap<RHPosition>,
  instrumentToPositionWithRealizedProfits: InstrumentMap<Position>
): InstrumentMap<Position> {
  const basePositionWithUnrealizedProfits: InstrumentMap<Position> = {};
  for (const [instrument, basePosition] of Object.entries(
    instrumentToPositionWithRealizedProfits
  )) {
    const {
      average_buy_price: averageBuyPrice,
    } = instrumentToPositionFromServer[instrument];
    const quantity = basePosition[TableColumn.QUANTITY];
    const currentPrice = basePosition[TableColumn.CURRENT_PRICE];

    basePositionWithUnrealizedProfits[instrument] = {
      ...basePosition,
      [TableColumn.UNREALIZED_PROFIT]:
        currentPrice != null && quantity > 0
          ? (currentPrice - parseFloat(averageBuyPrice)) * quantity
          : null,
    };
  }

  return basePositionWithUnrealizedProfits;
}

export function populateProfits(
  instrumentToOrders: InstrumentMap<Array<RHOrder>>,
  instrumentToPosition: InstrumentMap<RHPosition>,
  instrumentToBasePosition: InstrumentMap<BasePosition>
) {
  const instrumentToPositionWithRealizedProfit = populateRealizedProfits(
    instrumentToOrders,
    instrumentToBasePosition
  );

  const instrumentToPositionWithProfits = populateUnrealizedProfits(
    instrumentToPosition,
    instrumentToPositionWithRealizedProfit
  );

  return instrumentToPositionWithProfits;
}

export function populateProfitsFromServerData(
  serverData: ServerData,
  instrumentToBasePosition: InstrumentMap<BasePosition>
) {
  const {
    ordersArrays: instrumentToOrders,
    positions: instrumentToPosition,
  } = serverData;

  const instrumentToPositionWithRealizedProfit = populateRealizedProfits(
    instrumentToOrders,
    instrumentToBasePosition
  );

  const instrumentToPositionWithProfits = populateUnrealizedProfits(
    instrumentToPosition,
    instrumentToPositionWithRealizedProfit
  );

  return instrumentToPositionWithProfits;
}
