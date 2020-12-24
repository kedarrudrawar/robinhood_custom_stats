import MaterialTable, { Column as MaterialTableColumn } from "material-table";
import React from "react";

import { Position } from "../statistics/Position";
import { PriceButton } from "../ui/PriceButton";
import {
  beautifyPrice,
  beautifyQuantity,
  beautifyReturns,
} from "./beautifyPositions";

const TABLE_TITLE = "History";
interface DataTableProps {
  positions: Array<Position>;
}

export enum TableColumn {
  TICKER = "Name",
  AVERAGE_COST = "Average Cost",
  DIVIDEND = "Dividend",
  UNREALIZED_PROFIT = "Unrealized Profit",
  REALIZED_PROFIT = "Realized Profit",
  CURRENT_PRICE = "Current Price",
  QUANTITY = "Quantity",
}

const COLUMNS: Array<TableColumn> = [
  TableColumn.TICKER,
  TableColumn.QUANTITY,
  TableColumn.AVERAGE_COST,
  TableColumn.DIVIDEND,
  TableColumn.UNREALIZED_PROFIT,
  TableColumn.REALIZED_PROFIT,
  TableColumn.CURRENT_PRICE,
];

// const ACTION_COLUMN = TableColumn.CURRENT_PRICE;

const materialTableColumns: Array<MaterialTableColumn<Position>> = COLUMNS.map(
  (column) => {
    let render: (position: Position) => JSX.Element;
    switch (column) {
      case TableColumn.TICKER:
        render = (position: Position) => {
          return <div>{position[TableColumn.TICKER]}</div>;
        };
        break;

      case TableColumn.QUANTITY:
        render = (position: Position) => {
          return <div>{beautifyQuantity(position[TableColumn.QUANTITY])}</div>;
        };
        break;

      case TableColumn.AVERAGE_COST:
        render = (position: Position) => {
          return <div>{beautifyPrice(position[TableColumn.AVERAGE_COST])}</div>;
        };
        break;

      case TableColumn.DIVIDEND:
        render = (position: Position) => {
          return <div>{beautifyReturns(position[TableColumn.DIVIDEND])}</div>;
        };
        break;

      case TableColumn.UNREALIZED_PROFIT:
        render = (position: Position) => {
          return (
            <div>
              {beautifyReturns(position[TableColumn.UNREALIZED_PROFIT])}
            </div>
          );
        };
        break;

      case TableColumn.REALIZED_PROFIT:
        render = (position: Position) => {
          return (
            <div>{beautifyReturns(position[TableColumn.REALIZED_PROFIT])}</div>
          );
        };
        break;

      case TableColumn.CURRENT_PRICE:
        render = (position: Position) => <PriceButton position={position} />;
        break;

      default:
        throw new Error(`Found a column of type: ${column}`);
    }
    return {
      title: column,
      field: column,
      render,
    };
  }
);

function DataTable(props: DataTableProps): JSX.Element {
  const { positions } = props;
  console.log(positions);
  return (
    <MaterialTable<Position>
      title={TABLE_TITLE}
      data={positions}
      columns={materialTableColumns}
      options={{
        search: false,
        paging: false,
        // actionsColumnIndex: -1,
      }}
      // localization={{ header: { actions: ACTION_COLUMN } }}
      // actions={[
      //   {
      //     icon: "save",
      //     onClick: _.noop,
      //   },
      // ]}
      // components={{ Action: PriceButton }}
    />
  );
}

export default DataTable;
