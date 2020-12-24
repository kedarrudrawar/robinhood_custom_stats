import axios from "axios";
import { assert } from "../../util/asserts";
import InstrumentMap, {
  createInstrumentToItemMapping,
} from "../processing/instrumentMapping";
import {
  url,
  isQuote,
  isInstrument,
  isInactiveQuote,
  RHQuote,
  RHQuoteInactive,
} from "../ResponseTypes";
import { AXIOS_HEADERS } from "./DAOConstants";

export interface SymbolAndCurrentPrice {
  instrument: url;
  currentPrice: number | null;
  symbol: string;
}

export async function getSymbolAndCurrentPrice(
  instrument: url
): Promise<SymbolAndCurrentPrice> {
  const { data: instrumentData } = await axios.get(instrument, AXIOS_HEADERS);
  assert(
    isInstrument(instrumentData),
    "Instrument Endpoint should return an RHInstrument"
  );

  const { quote } = instrumentData;
  let quoteData: RHQuote | RHQuoteInactive;
  try {
    quoteData = (await axios.get(quote, AXIOS_HEADERS)).data;
  } catch (err) {
    quoteData = err.response.data;
    if (isInactiveQuote(quoteData)) {
      console.log(
        `Inactive instrument: + ${quoteData.inactive_instruments[0]}`
      );
      return {
        instrument,
        currentPrice: null,
        symbol: quoteData.inactive_instruments[0],
      };
    } else {
      throw err;
    }
  }

  if (isQuote(quoteData)) {
    return {
      instrument,
      currentPrice: parseFloat(quoteData.last_trade_price),
      symbol: quoteData.symbol,
    };
  }

  throw new Error("Found an invalid quote: " + quoteData);
}

export async function getSymbolsAndCurrentPrices(
  instruments: Array<url>
): Promise<InstrumentMap<SymbolAndCurrentPrice>> {
  const promises = instruments.map((instrument) => {
    return getSymbolAndCurrentPrice(instrument);
  });

  return createInstrumentToItemMapping(await Promise.all(promises));
}
