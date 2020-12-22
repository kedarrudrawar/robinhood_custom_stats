import { PositionValue } from "../statistics/Position";

export interface TableCellProps {
  value: PositionValue;
}

export function TableCell(props: TableCellProps) {
  return <td>{props.value}</td>;
}
