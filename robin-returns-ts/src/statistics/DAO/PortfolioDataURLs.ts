import { RobinhoodURL } from "DAOConstants";

const BASE_URL: RobinhoodURL = "https://api.robinhood.com/";

export const ORDERS_URL: RobinhoodURL = BASE_URL + "orders/";
export const POSITIONS_URL: RobinhoodURL = BASE_URL + "positions/";
export const ACTIVE_POSITIONS_URL: RobinhoodURL =
  BASE_URL + "positions/?nonzero=true";
export const DIVIDENDS_URL: RobinhoodURL = BASE_URL + "dividends/";
export const PORTFOLIOS_URL: RobinhoodURL = BASE_URL + "portfolios/";
export const ACCOUNT_INFO_URL: RobinhoodURL = BASE_URL + "accounts/";
