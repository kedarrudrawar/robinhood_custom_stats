import * as urls from "./endpoints";
import axios from "axios";
import { buildHeaders } from "./auth";

function processRHObject(object) {
  return object.data;
}

// accounts

export async function getAccountDetails(header) {
  let payload = buildHeaders(header);

  let res = await axios.get(urls.ACCOUNTS, payload);
  let data = processRHObject(res);
  return data.results;
}

// portfolio

export async function getPortfolio(header) {
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
export async function getPositionsEquity(header, active = false) {
  let payload = buildHeaders(header);
  let url = active
    ? urls.equityPaths.POSITIONS_NON_ZERO
    : urls.equityPaths.POSITIONS;
  let nextPosLink = await checkForNext(url, payload);
  let nextExists = true;
  let positions = [];
  let res, data;

  const filterOptions = (data) => {
    if (active) {
      return data.filter((position) => parseFloat(position["quantity"]) > 0);
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
export async function getPositionsOptions(header, active = false) {
  let payload = buildHeaders(header);
  let url = active
    ? urls.optionPaths.POSITIONS_NON_ZERO
    : urls.optionPaths.POSITIONS;
  let nextPosLink = await checkForNext(url, payload);
  let nextExists = true;
  let positions = [];
  let res, data;

  const filterOptions = (data) => {
    if (active) {
      return data.filter((option) => parseFloat(option["quantity"]) >= 1);
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
export const getDividends = async (auth_header, states) => {
  let payload = buildHeaders(auth_header);
  let url = urls.equityPaths.DIVIDENDS;
  let nextDivsLink = await checkForNext(url, payload);
  let nextExists = true;

  let dividends = [];
  let res, data, filtered;
  while (nextExists) {
    nextExists = nextDivsLink !== null;
    res = await axios.get(url, payload);
    data = processRHObject(res).results;
    filtered = data.filter((dividendObj) =>
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

export const getInstrumentsFromOrders = async (header, orders) => {
  let payload = buildHeaders(header);
  let instrumentURLs = new Set(); // remove duplicate urls
  for (const o of orders) {
    instrumentURLs.add(o["instrument"]);
  }

  let orderPromises = [...instrumentURLs].map((instrumentURL) => {
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
  header,
  instrument_url,
  field
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
export async function getCurrentPricesFromInstrumentsDF(header, df) {
  let payload = buildHeaders(header);

  let pricePromises = df.get("instrument").map((instrumentURL) => {
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
    pricePromises.map((p) => p.catch((e) => e))
  );
  const validResults = results.filter((result) => !(result instanceof Error));
  return validResults;
}

export async function getFieldFromInstrumentsDF(df, field) {
  return Promise.all(
    df.get("instrument").map(async (url) => {
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

export const getCurrentPricesFromInstruments = async (header, instruments) => {
  let payload = buildHeaders(header);

  let pricePromises = instruments.map((instrument) => {
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
    pricePromises.map((p) => p.catch((e) => e))
  );
  const validResults = results.filter((result) => !(result instanceof Error));

  return validResults;
};

// orders

const checkForNext = async (url, payload) => {
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
  header,
  state = ["filled"],
  direction = ""
) => {
  let payload = buildHeaders(header);

  let url = urls.optionPaths.ORDERS;
  let nextOrdersLink = await checkForNext(url, payload);
  let nextExists = true;
  let orders = [];
  let res, data, filtered;

  const filter = (resData) => {
    if (state.length !== 0)
      resData = resData.filter((order) => state.includes(order["state"]));
    if (direction !== "")
      resData = resData.filter((order) => order["direction"] === direction);

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
export const getOrderHistoryEquity = async (
  header,
  state = ["filled"],
  side = ""
) => {
  let payload = buildHeaders(header);

  let url = urls.equityPaths.ORDERS;
  let nextOrdersLink = await checkForNext(url, payload);
  let nextExists = true;
  let orders = [];
  let res, data, filtered;

  const filter = (resData) => {
    if (state.length !== 0)
      resData = resData.filter((order) => state.includes(order["state"]));
    if (side !== "")
      resData = resData.filter((order) => order["side"] === side);

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
