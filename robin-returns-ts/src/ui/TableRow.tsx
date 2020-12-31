import React from "react";
import { Position } from "../statistics/Position";
import { PositionData } from "../components/statistics/DataTable";
import { TableCell } from "./TableCell";

export interface TableRowProps {
  position: Position;
  columns: Array<PositionData>;
}

export function TableRow(props: TableRowProps): JSX.Element {
  const { position, columns } = props;

  const cells = columns.map((columnName: PositionData) => (
    <TableCell key={columnName} value={position[columnName]} />
  ));

  return <tr>{cells}</tr>;
}
