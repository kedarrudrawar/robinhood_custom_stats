import axios from "axios";
import { AccountInfo } from "components/DataPage";
import {
  ResultsResponse,
  RHPortfolio,
} from "statistics/DAO/RHPortfolioDataResponseTypes";
import {
  AXIOS_HEADERS,
  buildHeaders,
  RobinhoodBaseToken,
} from "../../DAOConstants";
import { PORTFOLIOS_URL } from "./PortfolioDataURLs";

async function getAccountInfo(token: RobinhoodBaseToken): Promise<AccountInfo> {
  const {
    data: { results },
  } = await axios.get<ResultsResponse<RHPortfolio>>(
    PORTFOLIOS_URL,
    buildHeaders(token)
  );

  const { withdrawable_amount, market_value } = results[0];
  return {
    portfolioCash: parseFloat(withdrawable_amount),
    // TODO kedar: figure out why i'm getting the entire pfolio value here
    totalMarketValue: parseFloat(market_value),
  };
}

export default getAccountInfo;
