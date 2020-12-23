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

export interface CurrentPriceAndSymbol {
  instrument: url;
  currentPrice: number | null;
  symbol: string;
}

async function getCurrentPrice(
  instrument: url
): Promise<CurrentPriceAndSymbol> {
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

export async function getAllCurrentPrices(
  instruments: Array<url>
): Promise<InstrumentMap<CurrentPriceAndSymbol>> {
  const promises = instruments.map((instrument) => {
    return getCurrentPrice(instrument);
  });

  return createInstrumentToItemMapping(await Promise.all(promises));
}
