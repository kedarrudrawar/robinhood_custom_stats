import { ServerData } from "components/DataPage";
import {
  createInstrumentToItemMapping,
  createInstrumentToArrayMapping,
} from "statistics/processing/instrumentMapping";
import {
  RHPosition,
  RHOrder,
  RHDividend,
} from "statistics/DAO/ServerResponseTypes";
import getAccountInfo from "./getAccountInfo";
import getAllOrders from "./getAllOrders";
import getAllPositions from "./getAllPositions";
import { getAllSymbolsAndCurrentPrices } from "./getAllSymbolsAndCurrentPrices";
import { getPaidDividends } from "./getDividends";
import { RobinhoodBaseToken } from "DAOConstants";

export async function getAllServerData(
  token: RobinhoodBaseToken
): Promise<ServerData> {
  const positions = createInstrumentToItemMapping<RHPosition>(
    await getAllPositions(token)
  );
  const ordersArrays = createInstrumentToArrayMapping<RHOrder>(
    await getAllOrders(token)
  );
  const dividends = createInstrumentToArrayMapping<RHDividend>(
    await getPaidDividends(token)
  );

  let allInstruments: Array<string> = [
    ...Object.keys(positions),
    ...Object.keys(ordersArrays),
  ];
  allInstruments = Array.from(new Set(allInstruments));

  const allSymbolsAndCurrentPrices = await getAllSymbolsAndCurrentPrices(
    allInstruments,
    token
  );

  const symbolAndCurrentPrice = createInstrumentToItemMapping(
    allSymbolsAndCurrentPrices
  );

  const accountInfo = await getAccountInfo(token);

  return {
    ordersArrays,
    dividends,
    positions,
    symbolAndCurrentPrice,
    accountInfo,
  };
}
