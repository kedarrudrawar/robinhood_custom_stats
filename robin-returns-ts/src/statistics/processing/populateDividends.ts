import { ServerData } from "components/DataPage";
import { PositionData } from "components/statistics/DataTable";
import { Position } from "statistics/Position";
import { RHDividend } from "statistics/DAO/ServerResponseTypes";
import InstrumentMap from "./instrumentMapping";

export function populateDividends(
  instrumentToPosition: InstrumentMap<Position>,
  instrumentToDividend: InstrumentMap<RHDividend>
): InstrumentMap<Position> {
  const instrumentToPositionWithDividend: InstrumentMap<Position> = {};

  for (const position of Object.values(instrumentToPosition)) {
    const { instrument } = position;
    const dividendString = instrumentToDividend[instrument]?.amount;
    if (dividendString != null) {
      const dividend = dividendString ? parseFloat(dividendString) : null;

      instrumentToPosition[instrument][PositionData.DIVIDEND] = dividend;
    }
  }

  return instrumentToPositionWithDividend;
}

export function populateDividendsFromServerData(
  serverData: ServerData,
  instrumentToPosition: InstrumentMap<Position>
): InstrumentMap<Position> {
  const { dividends: instrumentToDividend } = serverData;

  const instrumentToPositionWithDividend: InstrumentMap<Position> = {};
  for (const position of Object.values(instrumentToPosition)) {
    const { instrument } = position;
    instrumentToPositionWithDividend[instrument] = {
      ...position,
    };

    const dividends: Array<RHDividend> = instrumentToDividend[instrument] ?? [];
    for (const { amount: dividendString } of dividends) {
      const dividend = parseFloat(dividendString);
      if (
        instrumentToPositionWithDividend[instrument][PositionData.DIVIDEND] ==
        null
      ) {
        instrumentToPositionWithDividend[instrument][
          PositionData.DIVIDEND
        ] = dividend;
      } else {
        // @ts-expect-error - TypeScript not recognizing null-check in the conditional.
        instrumentToPositionWithDividend[instrument][
          PositionData.DIVIDEND
        ] += dividend;
      }
    }
  }

  return instrumentToPositionWithDividend;
}
