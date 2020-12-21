import { RHPosition, RHPositionsResponse, url } from "../ResponseTypes";
import { TableColumn } from "../DataTable";

export interface BasePosition {
  [TableColumn.AVERAGE_COST]: string;
  [TableColumn.QUANTITY]: number;
  [TableColumn.TICKER]: string;
  instrument: url;
  // These will be populated later.
  [TableColumn.DIVIDEND]?: number;
  [TableColumn.UNREALIZED_PROFIT]?: number;
  [TableColumn.REALIZED_PROFIT]?: number;
}

/**
 * Creates a mapping from a a position's instrument url to the base position itself.
 * @param positionsResponse - full RHPositionsResponse from Robinhood's server.
 */
export function processPositions(
  positionsResponse: RHPositionsResponse
): { [instrument: string]: BasePosition } {
  // TODO kedar: extract all positions by iterating over paginated results

  const { results } = positionsResponse;

  const instrumentToBasePosition: { [instrument: string]: BasePosition } = {};

  for (const position of results) {
    instrumentToBasePosition[position.instrument] = {
      [TableColumn.AVERAGE_COST]: position.average_buy_price,
      [TableColumn.QUANTITY]: parseFloat(position.quantity),
      [TableColumn.TICKER]: "MSFT", // TODO kedar: Extract from instrument
      instrument: position.instrument,
    };
  }

  return instrumentToBasePosition;
}
