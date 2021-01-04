import { RHDividend } from "./ServerResponseTypes";
import extractAllResults from "./DAOUtils";
import { DIVIDENDS_URL } from "./PortfolioDataURLs";
import { RobinhoodBaseToken } from "DAOConstants";

export async function getPaidDividends(
  token: RobinhoodBaseToken
): Promise<Array<RHDividend>> {
  const results = await extractAllResults<RHDividend>({
    endpoint: DIVIDENDS_URL,
    token,
  });
  return results.filter(
    (dividend) => dividend.state === "reinvested" || dividend.state === "paid"
  );
}
