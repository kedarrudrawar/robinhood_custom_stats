import { RHQuote, RHQuoteInactive } from "../ResponseTypes";

export const QUOTE_1: RHQuote = {
  ask_price: "1720.730000",
  ask_size: 1,
  bid_price: "1719.890000",
  bid_size: 1,
  last_trade_price: "1721.185000",
  last_extended_hours_trade_price: null,
  previous_close: "1739.370000",
  adjusted_previous_close: "1739.370000",
  previous_close_date: "2020-12-21",
  symbol: "GOOG",
  trading_halted: false,
  has_traded: true,
  last_trade_price_source: "nls",
  updated_at: "2020-12-22T18:45:28Z",
  instrument:
    "https://api.robinhood.com/instruments/943c5009-a0bb-4665-8cf4-a95dab5874e4/",
};

export const INACTIVE_QUOTE: RHQuoteInactive = {
  inactive_instruments: ["S"],
};
