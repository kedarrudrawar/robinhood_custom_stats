import extractAllResults from "../DAO/extractAllResults";
import { DIVIDENDS_URL } from "../DAO/urls";
import InstrumentMap from "./instrumentMapping";
import { BasePosition } from "./generateBasePositions";

export async function populateDividends(
  positions: InstrumentMap<BasePosition>
) {
  const results = await extractAllResults(DIVIDENDS_URL);
}
