import axios from "axios";

import { url, Response } from "../ResponseTypes";

// async function checkForNext(url: string, payload: unknown) {
//   let res = await axios.get(url, payload);
//   let next = data.next;
//   return next;
// }

function extractAllResults<ResultType>(
  response: Response<ResultType>,
  url: url,
  reverse: boolean = false
): Array<ResultType> {
  //   let nextOrdersLink = await checkForNext(url, payload);
  //   let nextExists = true;
  //   let results: Array<ResultType> = [];
  //   let res, data, filtered;

  //   while (nextExists) {
  //     nextExists = nextOrdersLink !== null;

  //     res = await axios.get(url, payload);
  //     data = processRHObject(res).results;
  //     results = results.concat(data);

  //     if (nextExists) {
  //       url = nextOrdersLink;
  //       nextOrdersLink = await checkForNext(url, payload);
  //     }
  //   }

  //   // orders are returned by API anti-chronologically
  //   results.reverse();
  const ret: Array<ResultType> = [];
  return ret;
}

export default extractAllResults;
