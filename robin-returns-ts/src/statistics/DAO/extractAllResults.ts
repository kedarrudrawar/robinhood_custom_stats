import axios, { AxiosResponse } from "axios";
import { RobinhoodURL, RobinhoodBaseToken, buildHeaders } from "DAOConstants";
import {
  PaginatedResultsResponse,
  isPaginatedResultsResponse,
} from "statistics/DAO/RHPortfolioDataResponseTypes";
import { assert } from "util/assert";

/**
 *
 * @param url Robinhood's endpoint URL to send request to
 * @param reverse useful for when Robinhood sends results in anti-chronological order
 */
async function extractAllResults<ResultType>({
  endpoint,
  token,
  reverse = false,
}: {
  endpoint: RobinhoodURL;
  token: RobinhoodBaseToken;
  reverse?: boolean;
}): Promise<Array<ResultType>> {
  let rv: AxiosResponse;
  let data: PaginatedResultsResponse<ResultType>;
  let nextUrl: RobinhoodURL | null = endpoint;
  let results: Array<ResultType> = [];
  let headers = buildHeaders(token);

  while (nextUrl != null) {
    rv = await axios.get<PaginatedResultsResponse<ResultType>>(
      nextUrl,
      headers
    );
    data = rv.data;
    assert(
      isPaginatedResultsResponse<ResultType>(data),
      "Data should be of shape `PaginatedResultsResponse`."
    );
    // TODO kedar: Need to assert shape of actual result, not just response
    results = results.concat(data.results);

    nextUrl = data.next;
  }

  if (reverse) {
    results.reverse();
  }

  return results;
}

export default extractAllResults;
