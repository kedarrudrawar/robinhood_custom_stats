import { RHPosition } from "../ResponseTypes";
import extractAllResults from "./extractAllResults";
import { POSITIONS_URL } from "./urls";

export default async function getAllPositions(): Promise<Array<RHPosition>> {
  return await extractAllResults(POSITIONS_URL);
}
