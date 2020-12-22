import { url } from "../ResponseTypes";

const BASE_URL: url = "https://api.robinhood.com/";

export const ORDERS_URL: url = BASE_URL + "orders";
export const POSITIONS_URL: url = BASE_URL + "positions/?nonzero=true";
