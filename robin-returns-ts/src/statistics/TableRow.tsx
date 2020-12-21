import React from "react";
import { Position } from "../Position";
import { TableColumn } from "./DataTable";
import { TableCell } from "./TableCell";

export interface TableRowProps {
  position: Position;
  columns: Array<TableColumn>;
}

export function TableRow(props: TableRowProps): JSX.Element {
  const { position, columns } = props;

  const cells = columns.map((columnName: TableColumn) => (
    <TableCell key={columnName} value={position[columnName]} />
  ));

  return <tr>{cells}</tr>;
}
