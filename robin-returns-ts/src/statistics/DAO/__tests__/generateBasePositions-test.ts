import chai from "chai";
import dirtyChai from "dirty-chai";
import { SinonStub } from "sinon";

import { TableColumn } from "../../../components/DataTable";
import * as getSymbolAndCurrentPrices from "../getSymbolsAndCurrentPrices";
import { INSTRUMENT_1 } from "../../fixtures/InstrumentFixtures";
import { POSITION_1 } from "../../fixtures/PositionsFixtures";
import {
  BasePosition,
  generateBasePositions,
} from "../../processing/generateBasePositions";
import { createInstrumentToItemMapping } from "../../processing/instrumentMapping";

chai.use(dirtyChai);
var sandbox = require("sinon").createSandbox();

describe("generateBasePositions", () => {
  let getSymbolsAndCurrentPricesStub: SinonStub;

  beforeEach(() => {
    getSymbolsAndCurrentPricesStub = sandbox.stub(
      getSymbolAndCurrentPrices,
      "getSymbolsAndCurrentPrices"
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should query for current prices", () => {
    getSymbolsAndCurrentPricesStub.returns({
      [INSTRUMENT_1.url]: {
        instrument: INSTRUMENT_1.url,
        symbol: INSTRUMENT_1.symbol,
        currentPrice: 100,
      },
    });
    // TODO kedar:
  });
  it("should convert positions from server to a base position", async () => {
    getSymbolsAndCurrentPricesStub.returns({
      [INSTRUMENT_1.url]: {
        instrument: INSTRUMENT_1.url,
        symbol: INSTRUMENT_1.symbol,
        currentPrice: 100,
      },
    });

    const positionsFromServer = [
      { ...POSITION_1, instrument: INSTRUMENT_1.url },
    ];

    const actualBasePositions = await generateBasePositions(
      createInstrumentToItemMapping(positionsFromServer)
    );

    const expectedBasePosition: BasePosition = {
      [TableColumn.TICKER]: INSTRUMENT_1.symbol,
      [TableColumn.QUANTITY]: parseFloat(POSITION_1.quantity),
      [TableColumn.CURRENT_PRICE]: 100,
      [TableColumn.AVERAGE_COST]: parseFloat(POSITION_1.average_buy_price),
      instrument: INSTRUMENT_1.url,
    };

    chai.expect(actualBasePositions).deep.equal({
      [INSTRUMENT_1.url]: expectedBasePosition,
    });
  });
});
