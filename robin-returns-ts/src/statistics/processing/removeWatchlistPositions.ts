import { PositionData } from "components/statistics/DataTable";
import { Position } from "statistics/Position";

export default function removeWatchlistPositions(
  positions: Array<Position>
): Array<Position> {
  return positions.filter(
    (position) =>
      position[PositionData.REALIZED_PROFIT] != null ||
      position[PositionData.UNREALIZED_PROFIT] != null
  );
}
