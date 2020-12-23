import { url } from "../ResponseTypes";

export default interface InstrumentMap<T> {
  [instrument: string]: T;
}

export function instrumentMapToArray<T>(
  instrumentMap: InstrumentMap<T>
): Array<T> {
  return Object.values(instrumentMap);
}

export function createInstrumentToItemMapping<T>(
  args: Array<T & { instrument: url }>
): InstrumentMap<T> {
  const instrumentMap: InstrumentMap<T> = {};
  for (const arg of args) {
    instrumentMap[arg.instrument] = arg;
  }
  return instrumentMap;
}

export function createInstrumentToArrayMapping<T>(
  args: Array<T & { instrument: url }>
): InstrumentMap<Array<T>> {
  const instrumentMap: InstrumentMap<Array<T>> = {};
  for (const arg of args) {
    const { instrument } = arg;
    if (!instrumentMap.hasOwnProperty(instrument)) {
      instrumentMap[instrument] = [];
    }
    instrumentMap[instrument].push(arg);
  }
  return instrumentMap;
}
