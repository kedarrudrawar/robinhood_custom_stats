import axios, { AxiosResponse } from "axios";

import { url, Response, isResponse } from "../ResponseTypes";
import { HEADERS } from "./DAOConstants";
import { assert } from "../../asserts";

async function extractAllResults<ResultType>(
  url: url,
  reverse: boolean = false
): Promise<Array<ResultType>> {
  let rv: AxiosResponse;
  let data: Response<ResultType>;
  let nextUrl: url | null = url;
  let results: Array<ResultType> = [];

  while (nextUrl != null) {
    rv = await axios.get(nextUrl, { headers: HEADERS });
    data = rv.data;
    assert(isResponse<ResultType>(data), "Data should be of shape `Response`.");
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
