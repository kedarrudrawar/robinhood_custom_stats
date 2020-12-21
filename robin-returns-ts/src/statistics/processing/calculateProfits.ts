import { TableColumn } from "../DataTable";
import { RHOrdersResponse, RHPosition, url, Response } from "../ResponseTypes";
import InstrumentMap from "./instrumentMapping";
import { BasePosition } from "./processPositions";

// TODO kedar: rename file

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

export function addRealizedProfits(
  ordersResponse: RHOrdersResponse,
  basePositions: InstrumentMap<BasePosition> // TODO kedar: extract into type
): InstrumentMap<BasePositionWithRealizedProfits> {
  // TODO kedar: extract all orders by iterating through the paginated results
  const { results } = ordersResponse;

  // Put in chronological order
  const orders = results.reverse();

  // Separate into buy / sell orders.
  const instrumentToOrders: InstrumentMap<{
    buyOrders: Array<OrderData>;
    sellOrders: Array<OrderData>;
  }> = {};

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

    if (!instrumentToOrders.hasOwnProperty(instrument)) {
      instrumentToOrders[instrument] = { buyOrders: [], sellOrders: [] };
    }
    if (side === "buy") {
      instrumentToOrders[instrument].buyOrders.push(orderData);
    } else {
      instrumentToOrders[instrument].sellOrders.push(orderData);
    }
  }

  const basePositionsWithRealizedProfits: InstrumentMap<BasePositionWithRealizedProfits> = {};

  // Remove all the buy orders that occur after the last sell order
  for (const [instrument, { buyOrders, sellOrders }] of Object.entries(
    instrumentToOrders
  )) {
    const lastSell = sellOrders[sellOrders.length - 1];
    // Pop off buy order if after last sell date
    while (
      buyOrders.length > 0 &&
      buyOrders[buyOrders.length - 1].created_at > lastSell.created_at
    ) {
      buyOrders.pop();
    }
    instrumentToOrders[instrument].buyOrders = buyOrders;

    // Calculate average buy / sell prices of all the equity that was sold
    let sumCost = 0;
    let sumQuantityBought = 0;
    buyOrders.forEach((orderData: OrderData) => {
      sumCost += parseFloat(orderData.executed_notional.amount);
      sumQuantityBought += parseFloat(orderData.cumulative_quantity);
    });

    let averageBuyPrice = sumCost / sumQuantityBought;

    let sumProfit = 0;
    let sumQuantitySold = 0;
    sellOrders.forEach((orderData: OrderData) => {
      sumProfit += parseFloat(orderData.executed_notional.amount);
      sumQuantitySold += parseFloat(orderData.cumulative_quantity);
    });

    let averageSellPrice = sumProfit / sumQuantitySold;

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
  basePositions: InstrumentMap<BasePosition>,
  currentPrices: InstrumentMap<number>
): InstrumentMap<BasePositionWithUnrealizedProfits> {
  const basePositionWithUnrealizedProfits: InstrumentMap<BasePositionWithUnrealizedProfits> = {};
  for (const instrument of Object.keys(basePositions)) {
    const {
      average_buy_price: averageBuyPrice,
      quantity,
    } = positionsFromServer[instrument];

    basePositionWithUnrealizedProfits[instrument] = {
      ...basePositions[instrument],
      [TableColumn.UNREALIZED_PROFIT]:
        (currentPrices[instrument] - parseFloat(averageBuyPrice)) *
        parseFloat(quantity),
    };
  }

  return basePositionWithUnrealizedProfits;
}
