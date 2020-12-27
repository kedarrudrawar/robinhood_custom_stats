import { TableColumn } from "components/DataTable";
import { Position } from "statistics/Position";

export default function removeWatchlistPositions(
  positions: Array<Position>
): Array<Position> {
  return positions.filter(
    (position) =>
      position[TableColumn.REALIZED_PROFIT] != null ||
      position[TableColumn.UNREALIZED_PROFIT] != null
  );
}
