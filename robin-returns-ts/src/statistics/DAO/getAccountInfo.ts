import axios from "axios";
import { AccountInfo } from "../../components/DataPage";
import { ResultsResponse, RHPortfolio } from "../ResponseTypes";
import { AXIOS_HEADERS } from "./DAOConstants";
import { PORTFOLIOS_URL } from "./urls";

async function getAccountInfo(): Promise<AccountInfo> {
  const {
    data: { results },
  } = await axios.get<ResultsResponse<RHPortfolio>>(
    PORTFOLIOS_URL,
    AXIOS_HEADERS
  );

  const { withdrawable_amount, market_value } = results[0];
  return {
    portfolioCash: parseFloat(withdrawable_amount),
    // TODO kedar: figure out why i'm getting the entire pfolio value here
    totalMarketValue: parseFloat(market_value),
  };
}

export default getAccountInfo;
