import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
var sandbox = sinon.createSandbox();

// describe("generateBasePositions", () => {
//   let getAllSymbolsAndCurrentPrices: SinonStub<
//     [instrument: Array<string>],
//     Promise<Array<getAllSymbolAndCurrentPrices.SymbolAndCurrentPrice>>
//   >;

//   beforeEach(() => {
//     getAllSymbolsAndCurrentPrices = sandbox.stub(
//       getAllSymbolAndCurrentPrices,
//       "getAllSymbolsAndCurrentPrices"
//     );
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it("should convert positions from server to a base position", async () => {
//     getAllSymbolsAndCurrentPrices.returns(
//       new Promise((resolve) =>
//         resolve([
//           {
//             instrument: INSTRUMENT_1.url,
//             symbol: INSTRUMENT_1.symbol,
//             currentPrice: 100,
//           },
//         ])
//       )
//     );

//     const positionsFromServer = [
//       { ...RH_POSITION_1, instrument: INSTRUMENT_1.url },
//     ];

//     const actualBasePositions = await generateBasePositions(
//       createInstrumentToItemMapping(positionsFromServer)
//     );

//     const expectedBasePosition: BasePosition = {
//       [TableColumn.TICKER]: INSTRUMENT_1.symbol,
//       [TableColumn.QUANTITY]: parseFloat(RH_POSITION_1.quantity),
//       [TableColumn.CURRENT_PRICE]: 100,
//       [TableColumn.AVERAGE_COST]: parseFloat(RH_POSITION_1.average_buy_price),
//       [TableColumn.REALIZED_PROFIT]: null,
//       [TableColumn.UNREALIZED_PROFIT]: null,
//       [TableColumn.DIVIDEND]: null,
//       instrument: INSTRUMENT_1.url,
//     };

//     chai.expect(actualBasePositions).deep.equal({
//       [INSTRUMENT_1.url]: expectedBasePosition,
//     });
//   });
// });
