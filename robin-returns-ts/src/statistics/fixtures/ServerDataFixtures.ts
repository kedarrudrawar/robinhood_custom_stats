import { ServerData } from "components/DataPage";
import { DIVIDEND_1 } from "./DividendFixtures";
import { SMALL_ORDERS_RESPONSE } from "./OrdersFixtures";
import { RH_POSITION_1, RH_POSITION_2 } from "./PositionsFixtures";

const { instrument } = SMALL_ORDERS_RESPONSE.results[0];
const { instrument: instrument2 } = SMALL_ORDERS_RESPONSE.results[2];

export const SERVER_DATA_1: ServerData = {
  ordersArrays: {
    [instrument]: SMALL_ORDERS_RESPONSE.results.slice(0, 2),
    [instrument2]: SMALL_ORDERS_RESPONSE.results.slice(2, 4),
  },
  positions: {
    [instrument]: { ...RH_POSITION_1, instrument: instrument },
    [instrument2]: {
      ...RH_POSITION_2,
      instrument: instrument2,
      quantity: "1.004",
    },
  },
  dividends: { [instrument]: [{ ...DIVIDEND_1, instrument: instrument }] },
  symbolAndCurrentPrice: {
    [instrument]: {
      instrument: instrument,
      symbol: "MRNA",
      currentPrice: 10,
    },
    [instrument2]: {
      instrument: instrument2,
      symbol: "AAPL",
      currentPrice: 150,
    },
  },
  accountInfo: {
    portfolioCash: 10000,
    totalMarketValue: 20000,
  },
};
