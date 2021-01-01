import axios from "axios";

import {
  isInactiveQuote,
  isInstrument,
  isQuote,
  RHInstrument,
  RHQuote,
  RHQuoteInactive,
} from "statistics/DAO/RHPortfolioDataResponseTypes";
import { assert } from "util/assert";
import {
  buildHeaders,
  RobinhoodBaseToken,
  RobinhoodURL,
} from "../../DAOConstants";

export interface SymbolAndCurrentPrice {
  instrument: RobinhoodURL;
  currentPrice: number | null;
  symbol: string;
}

export async function getSymbolAndCurrentPrice(
  instrument: RobinhoodURL,
  token: RobinhoodBaseToken
): Promise<SymbolAndCurrentPrice> {
  const authHeaders = buildHeaders(token);
  const { data: instrumentData } = await axios.get<RHInstrument>(
    instrument,
    authHeaders
  );
  assert(
    isInstrument(instrumentData),
    `Instrument Endpoint should return an RHInstrument. Instead returned: ${instrumentData}`
  );

  const { quote } = instrumentData;
  let quoteData: RHQuote | RHQuoteInactive;
  try {
    quoteData = (await axios.get<RHQuote | RHQuoteInactive>(quote, authHeaders))
      .data;
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
  instruments: Array<RobinhoodURL>,
  token: RobinhoodBaseToken
): Promise<Array<SymbolAndCurrentPrice>> {
  const promises = instruments.map((instrument) => {
    return getSymbolAndCurrentPrice(instrument, token);
  });

  return await Promise.all(promises);
}
