import axios from "axios";

import {
  isInactiveQuote,
  isInstrument,
  isQuote,
  RHInstrument,
  RHQuote,
  RHQuoteInactive,
  RobinhoodURL,
} from "statistics/ResponseTypes";
import { assert } from "util/assert";
import { AXIOS_HEADERS } from "./DAOConstants";

export interface SymbolAndCurrentPrice {
  instrument: RobinhoodURL;
  currentPrice: number | null;
  symbol: string;
}

export async function getSymbolAndCurrentPrice(
  instrument: RobinhoodURL
): Promise<SymbolAndCurrentPrice> {
  const { data: instrumentData } = await axios.get<RHInstrument>(
    instrument,
    AXIOS_HEADERS
  );
  assert(
    isInstrument(instrumentData),
    `Instrument Endpoint should return an RHInstrument. Instead returned: ${instrumentData}`
  );

  const { quote } = instrumentData;
  let quoteData: RHQuote | RHQuoteInactive;
  try {
    quoteData = (
      await axios.get<RHQuote | RHQuoteInactive>(quote, AXIOS_HEADERS)
    ).data;
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

export async function getAllSymbolsAndCurrentPrices(
  instruments: Array<RobinhoodURL>
): Promise<Array<SymbolAndCurrentPrice>> {
  const promises = instruments.map((instrument) => {
    return getSymbolAndCurrentPrice(instrument);
  });

  return await Promise.all(promises);
}
