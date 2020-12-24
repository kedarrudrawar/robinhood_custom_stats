import axios from "axios";
import chai from "chai";
import dirtyChai from "dirty-chai";
import sinon, { SinonStub } from "sinon";

import { ORDERS_URL, POSITIONS_URL } from "../../DAO/urls";
import { SMALL_ORDERS_RESPONSE } from "../../fixtures/OrdersFixtures";
import { FULL_POSITIONS_RESPONSE_1 } from "../../fixtures/PositionsFixtures";
import extractAllResults from "../../DAO/extractAllResults";

chai.use(dirtyChai);

var sandbox = sinon.createSandbox();

describe("extractAllResults", () => {
  let getStub: SinonStub;

  beforeEach(() => {
    getStub = sandbox.stub(axios, "get");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("fetches all paginated orders from the server", async () => {
    const firstUrl = ORDERS_URL;
    const secondUrl = "secondURL";

    getStub.withArgs(firstUrl).returns({
      data: {
        next: secondUrl,
        previous: null,
        results: SMALL_ORDERS_RESPONSE.results[0],
      },
    });

    getStub.withArgs(secondUrl).returns({
      data: {
        next: null,
        previous: firstUrl,
        results: SMALL_ORDERS_RESPONSE.results[1],
      },
    });

    // Should NOT be in reversed order.
    chai
      .expect(await extractAllResults(ORDERS_URL))
      .deep.equal([
        SMALL_ORDERS_RESPONSE.results[0],
        SMALL_ORDERS_RESPONSE.results[1],
      ]);

    // Should be in reversed order.
    chai
      .expect(await extractAllResults(ORDERS_URL, true))
      .deep.equal([
        SMALL_ORDERS_RESPONSE.results[1],
        SMALL_ORDERS_RESPONSE.results[0],
      ]);
  });

  it("fetches all paginated positions from the server", async () => {
    const firstUrl = POSITIONS_URL;
    const secondUrl = "secondURL";

    getStub.withArgs(firstUrl).returns({
      data: {
        next: secondUrl,
        previous: null,
        results: FULL_POSITIONS_RESPONSE_1.results.slice(0, 3),
      },
    });

    getStub.withArgs(secondUrl).returns({
      data: {
        next: null,
        previous: firstUrl,
        results: FULL_POSITIONS_RESPONSE_1.results.slice(3, 6),
      },
    });

    // Should NOT be in reversed order.
    chai
      .expect(await extractAllResults(POSITIONS_URL))
      .deep.equal(FULL_POSITIONS_RESPONSE_1.results.slice(0, 6));
  });
});
