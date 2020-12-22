export interface Execution {
  price: string;
  quantity: string;
  settlement_date: string;
  timestamp: string;
  id: string;
}

export type url = string;

export interface Response<T> {
  next: url | null;
  previous: url | null;
  results: Array<T>;
}

/**
 * Type predicate to make sure server response is of right shape.
 * @param response
 * @param recurseAndCheck // TODO kedar: figure out how to validate the generic type object
 */
export function isResponse<T>(
  response: any,
  recurseAndCheck?: (subtype: any) => subtype is T
): response is Response<T> {
  return (
    response.hasOwnProperty("next") &&
    response.hasOwnProperty("previous") &&
    response.hasOwnProperty("results")
  );
}

export function isQuote(quote: any): quote is RHQuote {
  return quote.hasOwnProperty("last_trade_price");
}

export function isInactiveQuote(
  inactiveQuote: any
): inactiveQuote is RHQuoteInactive {
  return inactiveQuote.hasOwnProperty("inactive_instruments");
}

export type RHQuote = {
  ask_price: string;
  ask_size: number;
  bid_price: string;
  bid_size: 1;
  last_trade_price: string;
  last_extended_hours_trade_price: null;
  previous_close: string;
  adjusted_previous_close: string;
  previous_close_date: string;
  symbol: string;
  trading_halted: false;
  has_traded: true;
  last_trade_price_source: string;
  updated_at: string;
  instrument: url;
};

export type RHQuoteInactive = {
  inactive_instruments: Array<string>;
};

export function isInstrument(instrument: any): instrument is RHInstrument {
  return (
    instrument.hasOwnProperty("symbol") && instrument.hasOwnProperty("quote")
  );
}

export interface RHInstrument {
  id: string;
  url: url;
  quote: url;
  fundamentals: url;
  splits: url;
  state: "active";
  market: url;
  simple_name: string;
  name: string;
  tradeable: boolean;
  tradability: string;
  symbol: string;
  bloomberg_unique: string;
  margin_initial_ratio: string;
  maintenance_ratio: string;
  country: string;
  day_trade_ratio: string;
  list_date: string;
  min_tick_size: null;
  type: string;
  tradable_chain_id: string;
  rhs_tradability: string;
  fractional_tradability: string;
  default_collar_fraction: string;
}

export interface RHOrder {
  id: string;
  ref_id: string | null;
  url: url;
  account: url;
  position: url;
  cancel: url | null;
  instrument: url;
  cumulative_quantity: string;
  average_price: string | null;
  fees: string;
  state: "confirmed" | "filled" | "cancelled";
  type: string;
  side: "buy" | "sell";
  time_in_force: string;
  trigger: string;
  price: string | null;
  stop_price: string | null;
  quantity: string;
  reject_reason: string | null;
  created_at: string;
  updated_at: string;
  last_transaction_at: string;
  executions: Array<Execution>;
  extended_hours: boolean;
  override_dtbp_checks: boolean;
  override_day_trade_checks: boolean;
  response_category: string | null;
  trailing_peg?: {
    type: string;
    percentage?: number;
  };
  stop_triggered_at: string | null;
  last_trail_price: {
    amount: string;
    currency_code: string;
    currency_id: string;
  } | null;
  last_trail_price_updated_at: string | null;
  dollar_based_amount: {
    amount: string;
    currency_code: string;
    currency_id: string;
  } | null;
  drip_dividend_id: string | null;
  total_notional: {
    amount: string;
    currency_code: string;
    currency_id: string;
  } | null;
  executed_notional: {
    amount: string;
    currency_code: string;
    currency_id: string;
  } | null;
  investment_schedule_id: string | null;
}

export interface RHPosition {
  url: url;
  instrument: url;
  account: url;
  account_number: string;
  average_buy_price: string;
  pending_average_buy_price: string;
  quantity: string;
  intraday_average_buy_price: string;
  intraday_quantity: string;
  shares_available_for_exercise: string;
  shares_held_for_buys: string;
  shares_held_for_sells: string;
  shares_held_for_stock_grants: string;
  shares_held_for_options_collateral: string;
  shares_held_for_options_events: string;
  shares_pending_from_options_events: string;
  shares_available_for_closing_short_position: string;
  updated_at: string;
  created_at: string;
}

export interface RHDividend {
  id: string;
  url: url;
  account: url;
  instrument: url;
  amount: string;
  rate: string;
  position: string;
  withholding: string;
  record_date: string;
  payable_date: string;
  paid_at: string | null;
  state: "pending" | "voided" | "reinvested" | "paid" | "reverted";
  drip_order_id?: string;
  drip_order_quantity?: string;
  drip_order_execution_price?: {
    currency_id: string;
    currency_code: string;
    amount: string;
  };
  drip_enabled: boolean;
  drip_order_state?: "filled";
  drip_skipped_reason?: "no_fractional_tradability";
  nra_withholding: "0";
}
