import { PositionValue } from "../Position";

export interface TableCellProps {
  value: PositionValue;
}

export function TableCell(props: TableCellProps) {
  return <td>{props.value}</td>;
}
