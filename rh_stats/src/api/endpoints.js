// login
export const BASE_PATH = "https://api.robinhood.com/";
export const OPTIONS_PATH = BASE_PATH + "options/";
export const OAUTH2 = BASE_PATH + "oauth2/token/";

// instruments
export const INSTRUMENTS = BASE_PATH + "instruments/";

const positions = BASE_PATH + "positions/";
const positions_non_zero = positions + "?nonzero=true";

export const equityPaths = {
  POSITIONS: positions,
  POSITIONS_NON_ZERO: positions_non_zero,

  ORDERS: BASE_PATH + "orders/",
  DIVIDENDS: BASE_PATH + "dividends/",
};

// TODO: Identify aggregage_positions vs. positions endpoint (?)
export const optionPaths = {
  POSITIONS: OPTIONS_PATH + "aggregate_positions/",
  POSITIONS_NON_ZERO: OPTIONS_PATH + "aggregate_positions/" + "?nonzero=true",

  ORDERS: OPTIONS_PATH + "orders/",
};

// portfolio
export const PORTFOLIOS = BASE_PATH + "portfolios/";

// order history

// account details
export const ACCOUNTS = BASE_PATH + "accounts/";

const QUOTES = BASE_PATH + "quotes/";

export const build_quote_url = (ticker) => {
  return QUOTES + ticker + "/";
};

/** Build challenge response url.
    Args:
        challenge_id: the id of the challenge passed in the oauth request flow.
    Returns:
        The constructed URL with the challenge_id embedded in teh url path.
*/
export const build_challenge = (challenge_id) => {
  return `${BASE_PATH}challenge/${challenge_id}/respond/`;
};
