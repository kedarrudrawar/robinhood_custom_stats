export interface TableHeaderCellProps {
  value: string;
}

export function TableHeaderCell(props: TableHeaderCellProps) {
  return <th>{props.value}</th>;
}
