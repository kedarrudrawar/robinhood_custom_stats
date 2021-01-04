import axios from "axios";
import { AccountInfo } from "components/DataPage";
import {
  ResultsResponse,
  RHPortfolio,
} from "statistics/DAO/ServerResponseTypes";
import { buildHeaders, RobinhoodBaseToken } from "../../DAOConstants";
import { PORTFOLIOS_URL } from "./PortfolioDataURLs";

async function getAccountInfo(token: RobinhoodBaseToken): Promise<AccountInfo> {
  const {
    data: { results },
  } = await axios.get<ResultsResponse<RHPortfolio>>(
    PORTFOLIOS_URL,
    buildHeaders(token)
  );
  // TODO kedar: This is only during trading hours, figure out how to get market value during after hours.
  const { withdrawable_amount, market_value, equity } = results[0];
  return {
    buyingPower: parseFloat(withdrawable_amount),
    totalInvested: parseFloat(market_value),
    totalAccountValue: parseFloat(equity),
  };
}

export default getAccountInfo;
