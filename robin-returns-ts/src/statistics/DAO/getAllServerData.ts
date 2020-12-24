import getAllOrders from "./getAllOrders";
import getAllPositions from "./getAllPositions";
import { getPaidDividends } from "./getDividends";
import { getAllSymbolsAndCurrentPrices } from "./getAllSymbolsAndCurrentPrices";
import { ServerData } from "../../components/DataTableContainer";
import {
  createInstrumentToArrayMapping,
  createInstrumentToItemMapping,
} from "../processing/instrumentMapping";
import { RHDividend, RHOrder, RHPosition } from "../ResponseTypes";

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

  return {
    ordersArrays,
    dividends,
    positions,
    symbolAndCurrentPrice,
  };
}
