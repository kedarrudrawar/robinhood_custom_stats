import chai from "chai";
import axios from "axios";
import dirtyChai from "dirty-chai";
import { RHOrder, Response } from "../../ResponseTypes";
import { SMALL_ORDERS_RESPONSE } from "../../OrdersFixtures";
import extractAllResults from "../extractAllResults";
import { ORDERS_URL } from "../../DAO/urls";

var sandbox = require("sinon").createSandbox();

chai.use(dirtyChai);

describe("extractAllResults", () => {
  it("successfully fetches and concatenates all paginated results from server", async () => {
    const firstUrl = ORDERS_URL;
    const secondUrl = "secondURL";

    const getStub = sandbox.stub(axios, "get");
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

    // Should be in reversed order.
    chai
      .expect(await extractAllResults(ORDERS_URL, true))
      .deep.equal([
        SMALL_ORDERS_RESPONSE.results[1],
        SMALL_ORDERS_RESPONSE.results[0],
      ]);
  });
});
