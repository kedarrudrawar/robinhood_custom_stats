import MaterialTable from "material-table";
import React from "react";

import Timestamp from "components/Timestamp";
import { Position } from "statistics/Position";
import { PriceButton } from "ui/PriceButton";
import { beautifyPrice, beautifyReturns } from "util/beautifyForRender";

const TABLE_TITLE = "History";
interface DataTableProps {
  positions: Array<Position>;
  updatedAt: string | null;
}

// TODO kedar: Add Total Equity column
export enum PositionData {
  TICKER = "Name",
  AVERAGE_COST = "Average Buy Price",
  DIVIDEND = "Total Received Dividends",
  UNREALIZED_PROFIT = "Total Unrealized Return",
  REALIZED_PROFIT = "Total Realized Return",
  CURRENT_PRICE = "Current Price",
  QUANTITY = "Quantity",
}

const COLUMNS: Array<PositionData> = [
  PositionData.TICKER,
  PositionData.AVERAGE_COST,
  PositionData.DIVIDEND,
  PositionData.UNREALIZED_PROFIT,
  PositionData.REALIZED_PROFIT,
  PositionData.CURRENT_PRICE,
];

function renderProfits(profit: number | null) {
  let positiveOrNegative = "";
  if (profit != null) {
    positiveOrNegative = profit >= 0 ? "positive" : "negative";
  }
  return (
    <div className={`text ${positiveOrNegative}`}>
      {beautifyReturns(profit)}
    </div>
  );
}

function getPageSizeOptions(numPositions: number): Array<number> {
  const options: Array<number> = [];
  const baseOptions = [5, 10];

  for (const base of baseOptions) {
    if (numPositions > base) {
      options.push(base);
    }
  }

  let lastOption = 25;
  while (numPositions > lastOption) {
    options.push(lastOption);
    lastOption *= 2;
  }

  if (options.length >= 1 && numPositions !== options[options.length - 1]) {
    options.push(numPositions);
  }

  return options;
}

export function DataTable(props: DataTableProps): JSX.Element {
  const { positions, updatedAt } = props;
  const pageSizeOptions = getPageSizeOptions(positions.length);
  return (
    <MaterialTable<Position>
      style={{ boxShadow: "none" }}
      data={positions}
      columns={COLUMNS.map((column) => {
        let render: (position: Position) => JSX.Element;
        switch (column) {
          case PositionData.TICKER:
            render = (position: Position) => {
              return (
                <div>
                  <div className={"text"}>{position[PositionData.TICKER]}</div>
                  <div className="shares-quantity">
                    {position[PositionData.QUANTITY]} shares
                  </div>
                </div>
              );
            };
            break;

          case PositionData.AVERAGE_COST:
            render = (position: Position) => {
              return (
                <div className={"text"}>
                  {beautifyPrice(position[PositionData.AVERAGE_COST])}
                </div>
              );
            };
            break;

          case PositionData.DIVIDEND:
            render = (position: Position) => {
              return renderProfits(position[PositionData.DIVIDEND]);
            };
            break;

          case PositionData.UNREALIZED_PROFIT: {
            render = (position: Position) => {
              return renderProfits(position[PositionData.UNREALIZED_PROFIT]);
            };
            break;
          }

          case PositionData.REALIZED_PROFIT:
            render = (position: Position) => {
              return renderProfits(position[PositionData.REALIZED_PROFIT]);
            };
            break;

          case PositionData.CURRENT_PRICE:
            render = (position: Position) => (
              <PriceButton position={position} />
            );
            break;

          default:
            throw new Error(`Found a column of type: ${column}`);
        }
        return {
          title: column,
          field: column,
          render,
        };
      })}
      options={{
        paging: pageSizeOptions.length >= 1,
        pageSizeOptions,
        rowStyle: (data, index, level) =>
          index % 2 === 0
            ? {
                backgroundColor: "#f8f8f8",
              }
            : {},
      }}
      components={{
        Toolbar: (props) => {
          return (
            <div style={{ paddingLeft: "16px", paddingBottom: "16px" }}>
              <Timestamp updatedAt={updatedAt} />
              <div className="table-title text">{TABLE_TITLE}</div>
            </div>
          );
        },
      }}
    />
  );
}

export default DataTable;
