// login
export const BASE_PATH = 'https://api.robinhood.com/';
export const OAUTH2 = BASE_PATH + 'oauth2/token/';

// instruments
export const INSTRUMENTS = BASE_PATH + 'instruments/';

// positions
export const POSITIONS = BASE_PATH + 'positions/';
export const POSITIONS_NON_ZERO = POSITIONS + '?nonzero=true';

// portfolio
export const PORTFOLIOS = BASE_PATH + 'portfolios/';

// order history
export const ORDERS = BASE_PATH + 'orders/';

// account details
export const ACCOUNTS = BASE_PATH + 'accounts/';

const QUOTES = BASE_PATH + 'quotes/';

export const DIVIDENDS = BASE_PATH + 'dividends/';

export const build_quote_url = (ticker) => {
    return QUOTES + ticker + '/';
}