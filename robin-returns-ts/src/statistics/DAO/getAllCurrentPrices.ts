import axios from "axios";
import { assert } from "../../util/asserts";
import InstrumentMap, {
  createInstrumentToItemMapping,
} from "../processing/instrumentMapping";
import { url, isQuote, isInstrument, isInactiveQuote } from "../ResponseTypes";
import { AXIOS_HEADERS } from "./DAOConstants";

export interface CurrentPriceAndSymbol {
  instrument: url;
  currentPrice: number;
  symbol: string;
}

export async function getAllCurrentPrices(
  instruments: Array<url>
): Promise<InstrumentMap<CurrentPriceAndSymbol>> {
  const promises = instruments.map((instrument) => {
    return new Promise<CurrentPriceAndSymbol>(async (resolve, reject) => {
      // Fetch quote url from instrument
      let { data } = await axios.get(instrument, AXIOS_HEADERS);
      assert(
        isInstrument(data),
        "Instrument Endpoint should return an RHInstrument"
      );
      const { quote } = data;
      let { data: quoteData } = await axios.get(quote, AXIOS_HEADERS);

      if (isQuote(quoteData)) {
        resolve({
          instrument,
          currentPrice: parseFloat(quoteData.last_trade_price),
          symbol: quoteData.symbol,
        });
      } else {
        if (isInactiveQuote(quoteData)) {
          reject(`Inactive instrument: + ${quoteData.inactive_instruments[0]}`);
        }
        reject(quoteData);
      }
    });
  });

  return createInstrumentToItemMapping(await Promise.all(promises));
}
