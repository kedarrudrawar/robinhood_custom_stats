import { RobinhoodURL } from "DAOConstants";
import { PositionData } from "../components/statistics/DataTable";
import { HasInstrument } from "./processing/instrumentMapping";

// Includes ticker, quantity, avg cost, and current price.
// Profits & Dividend are intentionally null.
export type BasePosition = {
  [PositionData.TICKER]: string;
  [PositionData.QUANTITY]: number;
  [PositionData.AVERAGE_COST]: number;
  [PositionData.CURRENT_PRICE]: number | null;
  [PositionData.REALIZED_PROFIT]: null;
  [PositionData.UNREALIZED_PROFIT]: null;
  [PositionData.DIVIDEND]: null;
} & HasInstrument;

export type Position = {
  [PositionData.TICKER]: string;
  [PositionData.QUANTITY]: number;
  [PositionData.AVERAGE_COST]: number;
  [PositionData.CURRENT_PRICE]: number | null;
  [PositionData.REALIZED_PROFIT]: number | null;
  [PositionData.UNREALIZED_PROFIT]: number | null;
  [PositionData.DIVIDEND]: number | null;
} & HasInstrument;

export type UserFriendlyPosition = {
  [PositionData.TICKER]: string;
  [PositionData.QUANTITY]: string;
  [PositionData.REALIZED_PROFIT]: string;
  [PositionData.UNREALIZED_PROFIT]: string;
  [PositionData.CURRENT_PRICE]: string;
  [PositionData.DIVIDEND]: string;
  [PositionData.AVERAGE_COST]: string;
  instrument: RobinhoodURL;
};
