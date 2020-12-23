export interface TableCellProps {
  value: string | number | null;
}

export function TableCell(props: TableCellProps) {
  return <td>{props.value}</td>;
}
