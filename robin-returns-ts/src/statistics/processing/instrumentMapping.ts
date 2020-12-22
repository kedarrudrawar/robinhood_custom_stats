import { url } from "../ResponseTypes";

export default interface InstrumentMap<T> {
  [instrument: string]: T;
}

export function createInstrumentMapping<T>(
  args: Array<T & { instrument: url }>
) {
  const instrumentMap: InstrumentMap<T> = {};
  for (const arg of args) {
    instrumentMap[arg.instrument] = arg;
  }
  return instrumentMap;
}
