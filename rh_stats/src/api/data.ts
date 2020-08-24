import * as urls from "./endpoints";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { buildHeaders } from "./auth";

function processRHObject(object: AxiosResponse<any>) {
  return object.data;
}

// accounts

export async function getAccountDetails(header: any) {
  let payload = buildHeaders(header);

  let res = await axios.get(urls.ACCOUNTS, payload);
  let data = processRHObject(res);
  return data.results;
}

// portfolio

export async function getPortfolio(header: any) {
  let payload = buildHeaders(header);
  const res = await axios.get(urls.PORTFOLIOS, payload);
  let data = processRHObject(res);
  return data;
}

/**
 *
 * @param {object - contains bearer authorization token} header
 * @param {boolean - true for only active positions, false for all} active
 */
export async function getPositionsEquity(header: any, active = false) {
  let payload = buildHeaders(header);
  let url = active
    ? urls.equityPaths.POSITIONS_NON_ZERO
    : urls.equityPaths.POSITIONS;
  let nextPosLink = await checkForNext(url, payload);
  let nextExists = true;
  let positions: any[] = [];
  let res, data;

  const filterOptions = (data: any[]) => {
    if (active) {
      return data.filter(
        (position: { [x: string]: string }) =>
          parseFloat(position["quantity"]) > 0
      );
    }
    return data;
  };

  while (nextExists) {
    nextExists = nextPosLink !== null;

    res = await axios.get(url, payload);
    data = processRHObject(res).results;
    data = filterOptions(data);
    positions = positions.concat(data);

    if (nextExists) {
      url = nextPosLink;
      nextPosLink = await checkForNext(url, payload);
    }
  }

  return positions;
}

/**
 *
 * @param {object - contains bearer authorization token} header
 * @param {boolean - true for only active positions, false for all} active
 */
export async function getPositionsOptions(header: any, active = false) {
  let payload = buildHeaders(header);
  let url = active
    ? urls.optionPaths.POSITIONS_NON_ZERO
    : urls.optionPaths.POSITIONS;
  let nextPosLink = await checkForNext(url, payload);
  let nextExists = true;
  let positions: any[] = [];
  let res, data;

  const filterOptions = (data: any[]) => {
    if (active) {
      return data.filter(
        (option: { [x: string]: string }) => parseFloat(option["quantity"]) >= 1
      );
    }
    return data;
  };

  while (nextExists) {
    nextExists = nextPosLink !== null;

    res = await axios.get(url, payload);
    data = processRHObject(res).results;
    data = filterOptions(data);
    positions = positions.concat(data);

    if (nextExists) {
      url = nextPosLink;
      nextPosLink = await checkForNext(url, payload);
    }
  }

  return positions;
}

// dividends
export const getDividends = async (
  auth_header: any,
  states: string | any[]
) => {
  let payload = buildHeaders(auth_header);
  let url = urls.equityPaths.DIVIDENDS;
  let nextDivsLink = await checkForNext(url, payload);
  let nextExists = true;

  let dividends: any[] = [];
  let res, data, filtered;
  while (nextExists) {
    nextExists = nextDivsLink !== null;
    res = await axios.get(url, payload);
    data = processRHObject(res).results;
    filtered = data.filter((dividendObj: { [x: string]: any }) =>
      states.includes(dividendObj["state"])
    );
    dividends = dividends.concat(filtered);

    if (nextExists) {
      url = nextDivsLink;
      nextDivsLink = await checkForNext(url, payload);
    }
  }

  return dividends;
};

// instruments

export const getInstrumentsFromOrders = async (header: any, orders: any) => {
  let payload = buildHeaders(header);
  let instrumentURLs: Set<string> = new Set(); // remove duplicate urls
  for (const o of orders) {
    instrumentURLs.add(o["instrument"]);
  }

  let orderPromises = Array.from(instrumentURLs).map((instrumentURL) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(instrumentURL, payload);
        let data = processRHObject(await res);
        resolve(await data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  });
  return Promise.all(orderPromises);
};

export async function getFieldFromInstrumentOption(
  header: any,
  instrument_url: string,
  field: string | number
) {
  let payload = buildHeaders(header);

  try {
    let response = await axios.get(instrument_url, payload);
    let data = processRHObject(response);
    return data[field];
  } catch (err) {
    return err;
  }
}

/**
 * Returns Array of arrays: [symbol, price]
 * @param {Object with Authorization header} header
 * @param {DataFrame containing instrument URL column} df
 */
export async function getCurrentPricesFromInstrumentsDF(
  header: any,
  df: { get: (arg0: string) => any[] }
) {
  let payload = buildHeaders(header);

  let pricePromises = df.get("instrument").map((instrumentURL: string) => {
    return new Promise(async (resolve, reject) => {
      let res = await axios.get(instrumentURL, payload);
      let data = processRHObject(res);
      let symbol = await data["symbol"];
      let tradeable = await data["tradeable"];

      if (!tradeable) reject(new Error("untradeable stock: " + symbol));
      else {
        let quoteURL = urls.build_quote_url(symbol);
        try {
          let res = await axios.get(quoteURL, payload);
          data = processRHObject(res);
          let price = data["last_trade_price"];
          let out = [symbol, price];
          resolve(out);
        } catch (err) {
          reject(err);
        }
      }
    });
  });

  const results = await Promise.all(
    pricePromises.map((p: Promise<any>) => p.catch((e: any) => e))
  );
  const validResults = results.filter((result) => !(result instanceof Error));
  return validResults;
}

export async function getFieldFromInstrumentsDF(
  df: {
    get: (
      arg0: string
    ) => {
      (): any;
      new (): any;
      map: {
        (arg0: (url: any) => Promise<unknown>): readonly [
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown
        ];
        new (): any;
      };
    };
  },
  field: string | number
) {
  return Promise.all(
    df.get("instrument").map(async (url: string) => {
      let data, res;
      return new Promise(async (resolve, reject) => {
        try {
          res = await axios.get(url);
          data = await res.data;
          return resolve(data[field]);
        } catch (err) {
          console.log(err);
          return reject(err);
        }
      });
    })
  );
}

export const getCurrentPricesFromInstruments = async (
  header: any,
  instruments: any[]
) => {
  let payload = buildHeaders(header);

  let pricePromises = instruments.map((instrument: { [x: string]: any }) => {
    return new Promise(async (resolve, reject) => {
      if (!instrument["tradeable"])
        reject(new Error("untradeable stock: " + instrument["symbol"]));
      else {
        let url = urls.build_quote_url(instrument["symbol"]);
        try {
          let res = await axios.get(url, payload);
          let data = processRHObject(res);
          let symbol = data["symbol"];
          let price = data["last_trade_price"];

          let out = [symbol, price];
          resolve(out);
        } catch (err) {
          reject(err);
        }
      }
    });
  });

  const results = await Promise.all(
    pricePromises.map((p: Promise<any>) => p.catch((e: any) => e))
  );
  const validResults = results.filter((result) => !(result instanceof Error));

  return validResults;
};

// orders

const checkForNext = async (
  url: string,
  payload: AxiosRequestConfig | undefined
) => {
  let res = await axios.get(url, payload);
  let data = processRHObject(res);
  let next = data.next;
  return next;
};

/**
 * Returns Array of order Objects
 * @param {Object} header
 * @param {Array of states ('filled', 'cancelled')} state
 * @param {String ('debit', 'credit')} direction
 *              (debit = buy, credit = sell)
 */
export const getOrderHistoryOptions = async (
  header: any,
  state = ["filled"],
  direction = ""
) => {
  let payload = buildHeaders(header);

  let url = urls.optionPaths.ORDERS;
  let nextOrdersLink = await checkForNext(url, payload);
  let nextExists = true;
  let orders: any[] = [];
  let res, data, filtered;

  const filter = (resData: any[]) => {
    if (state.length !== 0)
      resData = resData.filter((order: { [x: string]: string }) =>
        state.includes(order["state"])
      );
    if (direction !== "")
      resData = resData.filter(
        (order: { [x: string]: string }) => order["direction"] === direction
      );

    return resData;
  };

  while (nextExists) {
    nextExists = nextOrdersLink !== null;

    res = await axios.get(url, payload);
    data = processRHObject(res).results;
    filtered = filter(data);
    orders = orders.concat(filtered);

    if (nextExists) {
      url = nextOrdersLink;
      nextOrdersLink = await checkForNext(url, payload);
    }
  }

  // orders are returned by API anti-chronologically
  orders.reverse();

  return orders;
};

/**
 * Returns Array of order Objects
 * @param {Object} header
 * @param {Array of states ('filled', 'cancelled')} state
 * @param {String ('buy', 'sell')} side
 */
export async function getOrderHistoryEquity({
  header,
  state = ["filled"],
  side,
}: {
  header: any;
  state: Array<string>;
  side: string;
}) {
  let payload = buildHeaders(header);

  let url = urls.equityPaths.ORDERS;
  let nextOrdersLink = await checkForNext(url, payload);
  let nextExists = true;
  let orders: any[] = [];
  let res, data, filtered;

  const filter = (resData: any[]) => {
    if (state.length !== 0)
      resData = resData.filter((order: { [x: string]: string }) =>
        state.includes(order["state"])
      );
    if (side !== "")
      resData = resData.filter(
        (order: { [x: string]: string }) => order["side"] === side
      );

    return resData;
  };

  while (nextExists) {
    nextExists = nextOrdersLink !== null;

    res = await axios.get(url, payload);
    data = processRHObject(res).results;
    filtered = filter(data);
    orders = orders.concat(filtered);

    if (nextExists) {
      url = nextOrdersLink;
      nextOrdersLink = await checkForNext(url, payload);
    }
  }

  // orders are returned by API anti-chronologically
  orders.reverse();

  return orders;
}
