import MaterialTable, { Column as MaterialTableColumn } from "material-table";
import _ from "underscore";

import { Position, UserFriendlyPosition } from "../statistics/Position";
import { PriceButton } from "../ui/PriceButton";

const TABLE_TITLE = "History";
interface DataTableProps {
  positions: Array<UserFriendlyPosition>;
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

const materialTableColumns: Array<
  MaterialTableColumn<UserFriendlyPosition>
> = COLUMNS.map((column) => ({
  title: column,
  field: column,
}));

function DataTable(props: DataTableProps): JSX.Element {
  const { positions } = props;
  return (
    <MaterialTable
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
