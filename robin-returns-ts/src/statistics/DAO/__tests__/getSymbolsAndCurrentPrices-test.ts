import axios from "axios";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { SinonStub } from "sinon";

import { INSTRUMENT_1 } from "../../fixtures/InstrumentFixtures";
import { QUOTE_1 } from "../../fixtures/QuoteFixtures";

import {
  getSymbolAndCurrentPrice,
  getAllSymbolsAndCurrentPrices,
  SymbolAndCurrentPrice,
} from "../getAllSymbolsAndCurrentPrices";

chai.use(dirtyChai);

var sandbox = require("sinon").createSandbox();

describe("getAllCurrentPrices", () => {
  let axiosGetStub: SinonStub;
  let expectedPriceAndSymbol: SymbolAndCurrentPrice;

  beforeEach(() => {
    axiosGetStub = sandbox.stub(axios, "get");
    expectedPriceAndSymbol = {
      instrument: INSTRUMENT_1.url,
      symbol: QUOTE_1.symbol,
      currentPrice: parseFloat(QUOTE_1.last_trade_price),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getCurrentPrice", () => {
    it("properly extracts the current price from a RH quote", async () => {
      axiosGetStub.withArgs(INSTRUMENT_1.url).returns({ data: INSTRUMENT_1 });
      axiosGetStub.withArgs(INSTRUMENT_1.quote).returns({ data: QUOTE_1 });

      expect(await getSymbolAndCurrentPrice(INSTRUMENT_1.url)).deep.equal(
        expectedPriceAndSymbol
      );
    });
  });

  describe("getAllCurrentPrices", () => {
    it("retrieves all current prices and symbols for given a list of instrument url's", async () => {
      axiosGetStub.withArgs(INSTRUMENT_1.url).returns({ data: INSTRUMENT_1 });
      axiosGetStub.withArgs(INSTRUMENT_1.quote).returns({ data: QUOTE_1 });

      expect(
        await getAllSymbolsAndCurrentPrices([INSTRUMENT_1.url])
      ).deep.equal([expectedPriceAndSymbol]);
    });
  });
});
