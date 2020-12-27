import { TableColumn } from "../components/statistics/DataTable";
import { TableHeaderCell } from "./TableHeaderCell";

interface TableHeaderRowProps {
  columns: Array<TableColumn>;
}

export function TableHeaderRow(props: TableHeaderRowProps) {
  const headerCells: Array<JSX.Element> = props.columns.map((columnName) => (
    <TableHeaderCell value={columnName} />
  ));
  return <tr>{headerCells}</tr>;
}
