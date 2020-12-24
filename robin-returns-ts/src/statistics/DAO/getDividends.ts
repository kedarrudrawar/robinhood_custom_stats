import { RHDividend } from "../ResponseTypes";
import extractAllResults from "./extractAllResults";
import { DIVIDENDS_URL } from "./urls";

export async function getPaidDividends(): Promise<Array<RHDividend>> {
  const results = await extractAllResults<RHDividend>(DIVIDENDS_URL);
  return results.filter(
    (dividend) => dividend.state === "reinvested" || dividend.state === "paid"
  );
}
