import axios, { AxiosResponse } from "axios";
import {
  PaginatedResultsResponse,
  isPaginatedResultsResponse,
  RobinhoodURL,
} from "statistics/ResponseTypes";
import { assert } from "util/assert";
import { AXIOS_HEADERS } from "./DAOConstants";

async function extractAllResults<ResultType>(
  url: RobinhoodURL,
  reverse: boolean = false
): Promise<Array<ResultType>> {
  let rv: AxiosResponse;
  let data: PaginatedResultsResponse<ResultType>;
  let nextUrl: RobinhoodURL | null = url;
  let results: Array<ResultType> = [];

  while (nextUrl != null) {
    rv = await axios.get<PaginatedResultsResponse<ResultType>>(
      nextUrl,
      AXIOS_HEADERS
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

  // orders are returned by API anti-chronologically
  if (reverse) {
    results.reverse();
  }

  return results;
}

export default extractAllResults;
