import { ServerData } from "components/DataPage";
import { PositionData } from "components/statistics/DataTable";
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
        [PositionData.TICKER]: symbol,
        [PositionData.QUANTITY]: parseFloat(quantity),
        [PositionData.AVERAGE_COST]: parseFloat(average_buy_price),
        [PositionData.CURRENT_PRICE]: currentPrice,
        [PositionData.DIVIDEND]: null,
        [PositionData.UNREALIZED_PROFIT]: null,
        [PositionData.REALIZED_PROFIT]: null,
        instrument,
      };
    }
  );

  return createInstrumentToItemMapping<BasePosition>(basePositions);
}
