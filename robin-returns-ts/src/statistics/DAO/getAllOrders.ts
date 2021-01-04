import { ORDERS_URL } from "./PortfolioDataURLs";
import extractAllResults from "./DAOUtils";
import { RHOrder } from "statistics/DAO/ServerResponseTypes";
import { RobinhoodBaseToken } from "DAOConstants";

export default async function getAllOrders(
  token: RobinhoodBaseToken
): Promise<Array<RHOrder>> {
  return await extractAllResults<RHOrder>({
    endpoint: ORDERS_URL,
    reverse: true,
    token,
  });
}
