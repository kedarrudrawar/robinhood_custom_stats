import { TableColumn } from "../components/DataTable";
import { HasInstrument } from "./processing/instrumentMapping";
import { url } from "./ResponseTypes";

// Includes ticker, quantity, avg cost, and current price.
// Profits & Dividend are intentionally null.
export type BasePosition = {
  [TableColumn.TICKER]: string;
  [TableColumn.QUANTITY]: number;
  [TableColumn.AVERAGE_COST]: number;
  [TableColumn.CURRENT_PRICE]: number | null;
  [TableColumn.REALIZED_PROFIT]: null;
  [TableColumn.UNREALIZED_PROFIT]: null;
  [TableColumn.DIVIDEND]: null;
} & HasInstrument;

export type Position = {
  [TableColumn.TICKER]: string;
  [TableColumn.QUANTITY]: number;
  [TableColumn.AVERAGE_COST]: number;
  [TableColumn.CURRENT_PRICE]: number | null;
  [TableColumn.REALIZED_PROFIT]: number | null;
  [TableColumn.UNREALIZED_PROFIT]: number | null;
  [TableColumn.DIVIDEND]: number | null;
} & HasInstrument;

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
