// login
export const BASE_PATH = 'https://api.robinhood.com/'
export const OAUTH2 = BASE_PATH + 'oauth2/token/'

// instruments
export const INSTRUMENTS = BASE_PATH + 'instruments/'

// positions
export const POSITIONS = BASE_PATH + 'positions/'

// portfolio
export const PORTFOLIOS = BASE_PATH + 'portfolios/'

// order history
export const ORDERS = BASE_PATH + 'orders/'

// account details
export const ACCOUNTS = BASE_PATH + 'accounts/'

const QUOTES = BASE_PATH + 'quotes/';

export const build_quote_url = (ticker) => {
    return QUOTES + ticker + '/';
}