import { ServerData } from "../../components/DataPage";
import { DIVIDEND_1 } from "./DividendFixtures";
import { SMALL_ORDERS_RESPONSE } from "./OrdersFixtures";
import { RH_POSITION_1 } from "./PositionsFixtures";

const { url } = SMALL_ORDERS_RESPONSE.results[0];

export const SERVER_DATA_1: ServerData = {
  ordersArrays: { [url]: [SMALL_ORDERS_RESPONSE.results[0]] },
  positions: { [url]: { ...RH_POSITION_1, instrument: url } },
  dividends: { [url]: [{ ...DIVIDEND_1, instrument: url }] },
  symbolAndCurrentPrice: {
    [url]: {
      instrument: url,
      symbol: "MRNA",
      currentPrice: 10,
    },
  },
  accountInfo: {
    portfolioCash: 10000,
    totalMarketValue: 20000,
  },
};
