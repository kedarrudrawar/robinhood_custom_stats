import { RobinhoodBaseToken } from "DAOConstants";
import { RHPosition } from "statistics/DAO/ServerResponseTypes";
import extractAllResults from "./DAOUtils";
import { POSITIONS_URL } from "./PortfolioDataURLs";

export default async function getAllPositions(
  token: RobinhoodBaseToken
): Promise<Array<RHPosition>> {
  return await extractAllResults<RHPosition>({
    endpoint: POSITIONS_URL,
    token,
  });
}
