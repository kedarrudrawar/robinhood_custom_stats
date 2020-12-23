import { TableColumn } from "../components/DataTable";
import { url } from "./ResponseTypes";

export type Position = {
  [TableColumn.TICKER]: string;
  [TableColumn.QUANTITY]: number;
  [TableColumn.REALIZED_PROFIT]: number | null;
  [TableColumn.UNREALIZED_PROFIT]: number | null;
  [TableColumn.CURRENT_PRICE]: number | null;
  [TableColumn.DIVIDEND]: number | null;
  [TableColumn.AVERAGE_COST]: number;
  instrument: url;
};

export type UserFriendlyPosition = {
  [TableColumn.TICKER]: string;
  [TableColumn.QUANTITY]: string;
  [TableColumn.REALIZED_PROFIT]: string;
  [TableColumn.UNREALIZED_PROFIT]: string;
  [TableColumn.CURRENT_PRICE]: string;
  [TableColumn.DIVIDEND]: string;
  [TableColumn.AVERAGE_COST]: string;
  instrument: url;
};
