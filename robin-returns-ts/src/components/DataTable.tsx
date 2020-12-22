import MaterialTable, { Column as MaterialTableColumn } from "material-table";
import _ from "underscore";

import { Position } from "../statistics/Position";
import { PriceButton } from "../ui/PriceButton";

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
];

const ACTION_COLUMN = TableColumn.CURRENT_PRICE;

const materialTableColumns: Array<MaterialTableColumn<Position>> = COLUMNS.map(
  (column) => ({
    title: column,
    field: column,
  })
);

function DataTable(props: DataTableProps): JSX.Element {
  const { positions } = props;
  return (
    <MaterialTable
      data={positions}
      columns={materialTableColumns}
      options={{
        search: false,
        paging: false,
        actionsColumnIndex: -1,
      }}
      localization={{ header: { actions: ACTION_COLUMN } }}
      actions={[
        {
          icon: "save",
          onClick: _.noop,
        },
      ]}
      components={{ Action: PriceButton }}
    />
  );
}

export default DataTable;
