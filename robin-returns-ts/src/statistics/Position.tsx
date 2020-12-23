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
