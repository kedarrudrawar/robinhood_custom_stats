import axios, { AxiosResponse } from "axios";

import {
  url,
  PaginatedResultsResponse,
  isPaginatedResultsResponse,
} from "../ResponseTypes";
import { AXIOS_HEADERS } from "./DAOConstants";
import { assert } from "../../util/asserts";

async function extractAllResults<ResultType>(
  url: url,
  reverse: boolean = false
): Promise<Array<ResultType>> {
  let rv: AxiosResponse;
  let data: PaginatedResultsResponse<ResultType>;
  let nextUrl: url | null = url;
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
