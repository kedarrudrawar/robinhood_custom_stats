import { TableColumn } from "../../components/DataTable";
import { Position } from "../Position";
import { BasePositionWithProfits } from "./calculateProfits";
import InstrumentMap from "./instrumentMapping";

// TODO kedar:
export function populateDividends(
  positions: InstrumentMap<BasePositionWithProfits>
): InstrumentMap<Position> {
  // const results = await extractAllResults(DIVIDENDS_URL);

  const instrumentToFullPosition: InstrumentMap<Position> = {};
  for (const position of Object.values(positions)) {
    instrumentToFullPosition[position.instrument] = {
      ...position,
      [TableColumn.DIVIDEND]: 0,
    };
  }

  return instrumentToFullPosition;
}
