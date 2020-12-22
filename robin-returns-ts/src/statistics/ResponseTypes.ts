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
 * @param recurseAndCheck // TODO kedar: figure out how to assert that the subtype is valid too..
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

export type RHOrdersResponse = Response<RHOrder>;
export type RHPositionsResponse = Response<RHPosition>;
