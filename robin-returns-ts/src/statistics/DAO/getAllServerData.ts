import { ServerData } from "components/DataPage";
import {
  createInstrumentToItemMapping,
  createInstrumentToArrayMapping,
} from "statistics/processing/instrumentMapping";
import { RHPosition, RHOrder, RHDividend } from "statistics/ResponseTypes";
import getAccountInfo from "./getAccountInfo";
import getAllOrders from "./getAllOrders";
import getAllPositions from "./getAllPositions";
import { getAllSymbolsAndCurrentPrices } from "./getAllSymbolsAndCurrentPrices";
import { getPaidDividends } from "./getDividends";

export async function getAllServerData(): Promise<ServerData> {
  const positions = createInstrumentToItemMapping<RHPosition>(
    await getAllPositions()
  );
  const ordersArrays = createInstrumentToArrayMapping<RHOrder>(
    await getAllOrders()
  );
  const dividends = createInstrumentToArrayMapping<RHDividend>(
    await getPaidDividends()
  );

  let allInstruments: Array<string> = [
    ...Object.keys(positions),
    ...Object.keys(ordersArrays),
  ];
  allInstruments = Array.from(new Set(allInstruments));

  const symbolAndCurrentPrice = createInstrumentToItemMapping(
    await getAllSymbolsAndCurrentPrices(allInstruments)
  );

  const accountInfo = await getAccountInfo();

  return {
    ordersArrays,
    dividends,
    positions,
    symbolAndCurrentPrice,
    accountInfo,
  };
}
