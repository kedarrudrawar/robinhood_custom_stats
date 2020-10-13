import { Series, DataFrame } from "pandas-js";
import * as api from "../../api/api";
import auth from "../../auth/auth";

export const HEADER = {
  Authorization: `Bearer ${auth.bearer_token}`,
};

// export const HEADER = {
//     'Authorization': `Bearer ${process.env.REACT_APP_BEARER}`
// }

// -------------------------------------------------- OPTIONS --------------------------------------------------

export async function positionsToDFOptions(positions) {
  if (!positions || Array.from(positions).length === 0) {
    return new DataFrame();
  }

  let df = new DataFrame(positions);
  return df;
}

async function filterOrdersDFOptions(
  df,
  categories,
  extra_fields_to_pull = [],
  names_of_extra_fields = []
) {
  if (df.columns.size === 0) {
    return df;
  }

  df = df.get(categories);
  let filterArray = new Array(df.length).fill(true);
  let idx = 0;
  for (const row of df) {
    if (row.get("state") !== "filled") {
      filterArray[idx] = false;
    }
    idx += 1;
  }
  df = df.filter(filterArray);

  for (let i = 0; i < extra_fields_to_pull.length; i++) {
    df = getExtraFields(df, extra_fields_to_pull[i], names_of_extra_fields[i]);
  }
  return df;
}

/**
 * Returns array of [symbol, unrealized profit, percent unrealized profit]
 * @param {DataFrame containing symbol, quantity, average buy price, and current price} df
 */
export async function getUnrealizedProfitOptions(df) {
  let profit = [];
  for (const row of df) {
    let symbol = row.get("symbol");
    let quantity = row.get("quantity");
    let average_price = row.get("average_buy_price");
    let current_price = row.get("price");
    let currReturn = (current_price - average_price) * quantity;
    let percentReturn =
      quantity && average_price > 0
        ? ((current_price - average_price) / average_price) * 100
        : 0.0;
    profit.push([symbol, currReturn, percentReturn]);
  }
  return profit;
}

const getFieldFromOptionsRowDF = (row, field, inLegs = false) => {
  if (inLegs) return row.get("legs")[0][field];
  return row.get(field);
};

/**
 * This method calculates realized profit using
 * weighted average gains/losses of buy and sell orders
 * @param {Array of buy order objects for options} buyOrders
 * @param {Array of sell order objects for options} sellOrders
 */
export async function getRealizedProfitOptions(buyOrders, sellOrders) {
  let buyDF = new DataFrame(buyOrders);
  let sellDF = new DataFrame(sellOrders);

  let categories = [
    "chain_symbol",
    "quantity",
    "legs",
    "state",
    "premium",
    "direction",
    "processed_premium",
  ];

  buyDF = await filterOrdersDFOptions(buyDF, categories);
  sellDF = await filterOrdersDFOptions(sellDF, categories);

  let weighted_avg = {};
  let quantity_dict = {};
  let instruments = {};

  // calculate avg sell prices
  for (const row of await sellDF) {
    let ticker = getFieldFromOptionsRowDF(row, "chain_symbol", false);
    let quantity = parseFloat(getFieldFromOptionsRowDF(row, "quantity", false));
    let price =
      parseFloat(getFieldFromOptionsRowDF(row, "processed_premium", false)) /
      quantity;
    let instrument = getFieldFromOptionsRowDF(row, "option", true);

    if (!(ticker in weighted_avg)) {
      weighted_avg[ticker] = 0;
      quantity_dict[ticker] = 0;
      instruments[ticker] = instrument;
    }

    weighted_avg[ticker] += price * quantity;
    quantity_dict[ticker] -= quantity;
  }

  // console.log('after selling:');
  // console.log('sell DF:');
  // console.log(sellDF.toString());
  // console.log('weighted_avg');
  // console.log(JSON.parse(JSON.stringify(weighted_avg)));
  // console.log('quantity_dict');
  // console.log(JSON.parse(JSON.stringify(quantity_dict))); ;

  // console.log('BUY DF:');
  // console.log(buyDF.toString());

  // subtract weighted avg buy price from sell price
  for (const row of await buyDF) {
    let ticker = getFieldFromOptionsRowDF(row, "chain_symbol", false);
    let quantity = parseFloat(getFieldFromOptionsRowDF(row, "quantity", false));
    let price =
      parseFloat(getFieldFromOptionsRowDF(row, "processed_premium", false)) /
      quantity;
    let instrument = getFieldFromOptionsRowDF(row, "option", true);

    if (!(ticker in weighted_avg) || quantity_dict[ticker] === 0) {
      // no more sell orders, so they are either:
      //    -  still active options that haven't sold
      //    -  options that expired worthless
      let expiration_date = new Date(
        await api.getFieldFromInstrumentOption(
          HEADER,
          instrument,
          "expiration_date"
        )
      );
      if (expiration_date < new Date()) {
        // option has expired
        // console.log('expired option:', ticker, price);
        if (!(ticker in weighted_avg)) {
          // an option of this ticker has never been sold
          weighted_avg[ticker] = -price * quantity;
          quantity_dict[ticker] = 0;
          instruments[ticker] = instrument;
        } else {
          // an option of this ticker has been sold, but this specific option expired
          weighted_avg[ticker] -= price * quantity;
          quantity_dict[ticker] += quantity;
        }
        // console.log('current option:', ticker, quantity, price);
        // console.log('weighted_avg');
        // console.log(JSON.parse(JSON.stringify(weighted_avg)));
        // console.log('quantity_dict');
        // console.log(JSON.parse(JSON.stringify(quantity_dict)));
        continue;
      }
    }

    // option was bought, and did not expire
    quantity_dict[ticker] += quantity;
    weighted_avg[ticker] -= price * quantity;
    instruments[ticker] = instrument;

    // console.log('current option:', ticker, quantity, price);
    // console.log('weighted_avg');
    // console.log(JSON.parse(JSON.stringify(weighted_avg)));
    // console.log('quantity_dict');
    // console.log(JSON.parse(JSON.stringify(quantity_dict)));
  }

  let weightedObjArr = Object.keys(weighted_avg).map((key) => {
    return [key, weighted_avg[key], instruments[key]];
  });

  // console.log(weightedObjArr);
  return weightedObjArr;
}

// -------------------------------------------------- EQUITY --------------------------------------------------

export async function positionsToDF(positions) {
  if (!positions || Array.from(positions).length === 0) {
    return new DataFrame();
  }

  let df = new DataFrame(positions);
  let tickerResponse = await api.getFieldFromInstrumentsDF(df, "symbol");
  let tickerSeries = new Series(tickerResponse, "tickers");

  let tradeableResponse = await api.getFieldFromInstrumentsDF(
    df,
    "tradability"
  );
  let tradabilitySeries = new Series(tradeableResponse, "tradability");
  df = df.set("symbol", await tickerSeries);
  df = df.set("tradability", await tradabilitySeries);

  return df;
}

async function getExtraFields(df, field_in_response, field_name_for_df) {
  let response = await api.getFieldFromInstrumentsDF(df, field_in_response);
  let series = new Series(response, "placeholder");
  df = df.set(field_name_for_df, series);
  return df;
}

async function filterOrdersDF(
  df,
  categories,
  extra_fields_to_pull = [],
  names_of_extra_fields = []
) {
  if (df.columns.size === 0) {
    return df;
  }

  df = df.get(categories);
  for (let i = 0; i < extra_fields_to_pull.length; i++) {
    df = getExtraFields(df, extra_fields_to_pull[i], names_of_extra_fields[i]);
  }
  return df;
}

/**
 * This method calculates realized profit using
 * weighted average gains/losses of buy and sell orders
 * @param {Array of buy order objects for equities} buyOrders
 * @param {Array of sell order objects for equities} sellOrders
 */
export async function getRealizedProfit(buyOrders, sellOrders) {
  let buyDF = new DataFrame(buyOrders);
  let sellDF = new DataFrame(sellOrders);

  let categories = ["average_price", "quantity", "side", "instrument"];
  let extra_fields_to_pull = ["symbol"];
  let names_of_extra_fields = ["symbol"];

  buyDF = await filterOrdersDF(
    buyDF,
    categories,
    extra_fields_to_pull,
    names_of_extra_fields
  );
  sellDF = await filterOrdersDF(
    sellDF,
    categories,
    extra_fields_to_pull,
    names_of_extra_fields
  );

  let weighted_avg = {};
  let quantity_dict = {};
  let instruments = {};

  // calculate avg sell prices
  for (const row of await sellDF) {
    let tick = row.get("symbol");
    let quantity = parseFloat(row.get("quantity"));
    let price = parseFloat(row.get("average_price"));
    let instrument = row.get("instrument");
    if (!(tick in weighted_avg)) {
      weighted_avg[tick] = 0;
      quantity_dict[tick] = 0;
      instruments[tick] = instrument;
    }

    weighted_avg[tick] += price * quantity;
    quantity_dict[tick] += quantity;
  }

  // subtract weighted avg buy price from sell price
  for (const row of await buyDF) {
    let tick = row.get("symbol");
    let quantity = parseFloat(row.get("quantity"));
    let price = parseFloat(row.get("average_price"));
    let instrument = row.get("instrument");

    if (!(tick in weighted_avg) || quantity_dict[tick] === 0) continue; // sell orders have been depleted, remaining buys are for current position

    quantity = Math.min(quantity, quantity_dict[tick]);
    quantity_dict[tick] -= quantity;
    weighted_avg[tick] -= price * quantity;
    instruments[tick] = instrument;
  }
  let weightedObjArr = Object.keys(weighted_avg).map((key) => {
    return [key, weighted_avg[key], instruments[key]];
  });

  return weightedObjArr;
}

const getFieldsFromRow = (fields, row) => {
  return fields.map((field) => row.get(field));
};

/**
 * Returns array of [symbol, unrealized profit, percent unrealized profit]
 * @param {DataFrame containing symbol, quantity, average buy price, and current price} df
 */
export async function getUnrealizedProfit(df) {
  let profit = [];
  for (const row of df) {
    let symbol = row.get("symbol");
    let quantity = row.get("quantity");
    let average_price = row.get("average_buy_price");
    let current_price = row.get("price");
    let currReturn = (current_price - average_price) * quantity;
    // let percentReturn = (quantity && average_price > 0) ? (current_price - average_price) / average_price * 100 : 0.00;
    profit.push([symbol, currReturn]);
  }
  return profit;
}

export function dividendsToDF(dividendsRes) {
  let dividends = {};
  Array.from(dividendsRes).map((div) => {
    if (dividends.hasOwnProperty(div["instrument"]))
      dividends[div["instrument"]] += parseFloat(div["amount"]);
    else dividends[div["instrument"]] = parseFloat(div["amount"]);
    return null;
  });

  let arr = Object.keys(dividends).map((div) => {
    return [div, dividends[div]];
  });

  let df = new DataFrame(arr);
  df.columns = ["instrument", "dividend"]; //, 'dividend rate'];

  return df;
}

export function getEquities(df) {
  let equities = [];
  for (const row of df) {
    let [symbol, current_price, quantity] = getFieldsFromRow(
      ["symbol", "price", "quantity"],
      row
    );
    equities.push([symbol, parseFloat(current_price) * parseFloat(quantity)]);
  }
  return equities;
}
