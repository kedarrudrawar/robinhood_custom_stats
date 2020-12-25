import { RHPosition } from "../ResponseTypes";
import { TableColumn } from "../../components/DataTable";
import InstrumentMap, {
  createInstrumentToItemMapping,
} from "./instrumentMapping";
import {
  getAllSymbolsAndCurrentPrices,
  SymbolAndCurrentPrice,
} from "../DAO/getAllSymbolsAndCurrentPrices";
import { BasePosition } from "../Position";
import { ServerData } from "../../components/DataPage";

/**
 * Creates a mapping from a position's instrument url to the base position itself.
 * Initializes dividends, unrealized profit, and realized profit as null.
 * @param positionsResponse - full RHPositionsResponse from Robinhood's server.
 */
export async function generateBasePositions(
  positionsFromServer: InstrumentMap<RHPosition>
): Promise<InstrumentMap<BasePosition>> {
  const instrumentToPricesAndSymbols: InstrumentMap<SymbolAndCurrentPrice> = createInstrumentToItemMapping(
    await getAllSymbolsAndCurrentPrices(Object.keys(positionsFromServer))
  );

  const basePositions: Array<BasePosition> = Object.values(
    positionsFromServer
  ).map(
    (rhPosition): BasePosition => {
      const { instrument, quantity, average_buy_price } = rhPosition;

      console.log(instrument);
      console.log(instrumentToPricesAndSymbols);

      const { currentPrice, symbol } = instrumentToPricesAndSymbols[instrument];
      return {
        [TableColumn.TICKER]: symbol,
        [TableColumn.QUANTITY]: parseFloat(quantity),
        [TableColumn.AVERAGE_COST]: parseFloat(average_buy_price),
        [TableColumn.CURRENT_PRICE]: currentPrice,
        [TableColumn.DIVIDEND]: null,
        [TableColumn.UNREALIZED_PROFIT]: null,
        [TableColumn.REALIZED_PROFIT]: null,
        instrument,
      };
    }
  );

  return createInstrumentToItemMapping<BasePosition>(basePositions);
}

export function generateBasePositionsFromServerData(
  serverData: ServerData
): InstrumentMap<BasePosition> {
  const { symbolAndCurrentPrice, positions: positionsFromServer } = serverData;

  const basePositions: Array<BasePosition> = Object.values(
    positionsFromServer
  ).map(
    (rhPosition): BasePosition => {
      const { instrument, quantity, average_buy_price } = rhPosition;
      const { currentPrice, symbol } = symbolAndCurrentPrice[instrument];
      return {
        [TableColumn.TICKER]: symbol,
        [TableColumn.QUANTITY]: parseFloat(quantity),
        [TableColumn.AVERAGE_COST]: parseFloat(average_buy_price),
        [TableColumn.CURRENT_PRICE]: currentPrice,
        [TableColumn.DIVIDEND]: null,
        [TableColumn.UNREALIZED_PROFIT]: null,
        [TableColumn.REALIZED_PROFIT]: null,
        instrument,
      };
    }
  );

  return createInstrumentToItemMapping<BasePosition>(basePositions);
}
