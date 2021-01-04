import { PaginatedResultsResponse } from "statistics/DAO/ServerResponseTypes";

/**
 * Type predicate to make sure server response is of right shape.
 * @param response
 * @param isValidResult - callback to validate type of results type
 */
export function isValidPaginatedResultsResponse<ResultType>(
  response: any,
  isValidResult?: (result: any) => result is ResultType
): response is PaginatedResultsResponse<ResultType> {
  if (
    response.hasOwnProperty("next") &&
    response.hasOwnProperty("previous") &&
    response.hasOwnProperty("results")
  ) {
    if (response.results.length > 0) {
      return isValidResult ? isValidResult(response.results[0]) : true;
    }
    return true;
  }
  return false;
}
