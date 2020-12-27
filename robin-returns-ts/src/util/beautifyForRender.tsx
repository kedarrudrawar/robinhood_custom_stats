import { TableColumn } from "components/statistics/DataTable";
import { Position, UserFriendlyPosition } from "statistics/Position";

function numberWithCommas(num: number | string): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function beautifyReturns(num: number | null): string {
  if (num == null) return "-";

  return num >= 0
    ? "+$" + numberWithCommas(num.toFixed(2))
    : "-$" + numberWithCommas(Math.abs(num).toFixed(2));
}

export function beautifyPrice(num: number | null): string {
  return num != null && num !== 0
    ? "$" + numberWithCommas(num.toFixed(2))
    : "-";
}

function beautifyPercent(percentage: number): string {
  let sign = percentage >= 0 ? "+" : "-";
  return `${sign}${percentage.toFixed(2)}%`;
}

export function beautifyQuantity(qty: number): string {
  return qty.toFixed(2);
}

export default function beautifyPositions(
  positions: Array<Position>
): Array<UserFriendlyPosition> {
  return positions.map((position) => {
    return {
      ...position,
      [TableColumn.QUANTITY]: beautifyQuantity(position[TableColumn.QUANTITY]),
      [TableColumn.AVERAGE_COST]: beautifyPrice(
        position[TableColumn.AVERAGE_COST]
      ),
      [TableColumn.REALIZED_PROFIT]: beautifyReturns(
        position[TableColumn.REALIZED_PROFIT]
      ),
      [TableColumn.UNREALIZED_PROFIT]: beautifyReturns(
        position[TableColumn.UNREALIZED_PROFIT]
      ),
      [TableColumn.DIVIDEND]: beautifyPrice(position[TableColumn.DIVIDEND]),
      [TableColumn.CURRENT_PRICE]: beautifyPrice(
        position[TableColumn.CURRENT_PRICE]
      ),
    };
  });
}
