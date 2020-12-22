import { TableColumn } from "../../components/DataTable";
import { RHPosition, url, RHOrder } from "../ResponseTypes";
import InstrumentMap from "./instrumentMapping";
import { BasePosition } from "./generateBasePositions";

interface OrderData {
  instrument: url;
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

interface BasePositionWithRealizedProfits extends BasePosition {
  [TableColumn.REALIZED_PROFIT]: number;
}

interface BasePositionWithUnrealizedProfits extends BasePosition {
  [TableColumn.UNREALIZED_PROFIT]: number;
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

/**
 *
 * @param instrumentToOrders Mapping from instrument to all orders of that instrument. Must be in chronological order (earliest to latest)
 * @param basePositions
 */
export function addRealizedProfits(
  instrumentToOrders: InstrumentMap<Array<RHOrder>>,
  basePositions: InstrumentMap<BasePosition>
): InstrumentMap<BasePositionWithRealizedProfits> {
  const basePositionsWithRealizedProfits: InstrumentMap<BasePositionWithRealizedProfits> = {};

  for (const [instrument, orders] of Object.entries(instrumentToOrders)) {
    const separatedOrderData = separateOrdersIntoBuyAndSell(orders);
    // Remove all the buy orders that occur after the last sell order
    const {
      buyOrderData,
      sellOrderData,
    } = filterOutBuyOrdersOccurringAfterLastSell(separatedOrderData);

    // Calculate average buy / sell prices of all the equity that's been sold already
    let sumCost = 0;
    let sumQuantityBought = 0;

    let sumProfit = 0;
    let sumQuantitySold = 0;

    buyOrderData.forEach((orderData: OrderData) => {
      sumCost += parseFloat(orderData.executed_notional.amount);
      sumQuantityBought += parseFloat(orderData.cumulative_quantity);
    });

    const averageBuyPrice = sumCost / sumQuantityBought;

    sellOrderData.forEach((orderData: OrderData) => {
      sumProfit += parseFloat(orderData.executed_notional.amount);
      sumQuantitySold += parseFloat(orderData.cumulative_quantity);
    });

    const averageSellPrice = sumProfit / sumQuantitySold;

    // Copy base position with realized profits added
    basePositionsWithRealizedProfits[instrument] = {
      ...basePositions[instrument],
      [TableColumn.REALIZED_PROFIT]:
        (averageSellPrice - averageBuyPrice) * sumQuantitySold,
    };
  }

  return basePositionsWithRealizedProfits;
}

export function addUnrealizedProfits(
  positionsFromServer: InstrumentMap<RHPosition>,
  basePositions: InstrumentMap<BasePosition>
): InstrumentMap<BasePositionWithUnrealizedProfits> {
  const basePositionWithUnrealizedProfits: InstrumentMap<BasePositionWithUnrealizedProfits> = {};

  for (const [instrument, basePosition] of Object.entries(basePositions)) {
    const { average_buy_price: averageBuyPrice } = positionsFromServer[
      instrument
    ];
    const quantity = basePosition[TableColumn.QUANTITY];
    const currentPrice = basePosition[TableColumn.CURRENT_PRICE];

    basePositionWithUnrealizedProfits[instrument] = {
      ...basePosition,
      [TableColumn.UNREALIZED_PROFIT]:
        (currentPrice - parseFloat(averageBuyPrice)) * quantity,
    };
  }

  return basePositionWithUnrealizedProfits;
}
