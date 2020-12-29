import { ServerData } from "components/DataPage";
import { TableColumn } from "components/statistics/DataTable";
import { BasePosition } from "statistics/Position";
import InstrumentMap, {
  createInstrumentToItemMapping,
} from "./instrumentMapping";

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
