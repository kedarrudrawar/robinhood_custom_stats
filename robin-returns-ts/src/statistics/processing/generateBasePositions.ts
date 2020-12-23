import { RHPosition, url } from "../ResponseTypes";
import { TableColumn } from "../../components/DataTable";
import InstrumentMap, {
  createInstrumentToItemMapping,
} from "./instrumentMapping";
import {
  CurrentPriceAndSymbol,
  getAllCurrentPrices,
} from "../DAO/getAllCurrentPrices";

export interface BasePosition {
  [TableColumn.AVERAGE_COST]: number;
  [TableColumn.QUANTITY]: number;
  [TableColumn.TICKER]: string;
  [TableColumn.CURRENT_PRICE]: number | null;
  instrument: url;
  // These will be populated later.
  [TableColumn.DIVIDEND]?: number | null;
  [TableColumn.UNREALIZED_PROFIT]?: number | null;
  [TableColumn.REALIZED_PROFIT]?: number | null;
}

/**
 * Creates a mapping from a a position's instrument url to the base position itself.
 * @param positionsResponse - full RHPositionsResponse from Robinhood's server.
 */
export async function generateBasePositions(
  positionsFromServer: InstrumentMap<RHPosition>
): Promise<InstrumentMap<BasePosition>> {
  const instrumentToPricesAndSymbols: InstrumentMap<CurrentPriceAndSymbol> = await getAllCurrentPrices(
    Object.keys(positionsFromServer)
  );

  const basePositions = Object.values(positionsFromServer).map((rhPosition) => {
    const { instrument, quantity, average_buy_price } = rhPosition;
    const { currentPrice, symbol } = instrumentToPricesAndSymbols[instrument];
    return {
      [TableColumn.TICKER]: symbol,
      [TableColumn.QUANTITY]: parseFloat(quantity),
      [TableColumn.AVERAGE_COST]: parseFloat(average_buy_price),
      [TableColumn.CURRENT_PRICE]: currentPrice,
      instrument,
    };
  });

  return createInstrumentToItemMapping(basePositions);
}
