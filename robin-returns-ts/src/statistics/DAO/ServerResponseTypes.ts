import { RobinhoodURL } from "DAOConstants";
import { HasInstrument } from "../processing/instrumentMapping";

export interface Execution {
  price: string;
  quantity: string;
  settlement_date: string;
  timestamp: string;
  id: string;
}

export interface ResultsResponse<T> {
  results: Array<T>;
}
export interface PaginatedResultsResponse<T> extends ResultsResponse<T> {
  next: RobinhoodURL | null;
  previous: RobinhoodURL | null;
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
  instrument: RobinhoodURL;
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
  url: RobinhoodURL;
  quote: RobinhoodURL;
  fundamentals: RobinhoodURL;
  splits: RobinhoodURL;
  state: "active";
  market: RobinhoodURL;
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

export interface RHOrder extends HasInstrument {
  id: string;
  ref_id: string | null;
  url: RobinhoodURL;
  account: RobinhoodURL;
  position: RobinhoodURL;
  cancel: RobinhoodURL | null;
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

export interface RHPosition extends HasInstrument {
  url: RobinhoodURL;
  account: RobinhoodURL;
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

export interface RHDividend extends HasInstrument {
  id: string;
  url: RobinhoodURL;
  account: RobinhoodURL;
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
  nra_withholding: string;
}

export interface RHPortfolio {
  url: RobinhoodURL;
  account: RobinhoodURL;
  start_date: string;
  market_value: string;
  equity: string;
  extended_hours_market_value: string;
  extended_hours_equity: string;
  extended_hours_portfolio_equity: string;
  last_core_market_value: string;
  last_core_equity: string;
  last_core_portfolio_equity: string;
  excess_margin: string;
  excess_maintenance: string;
  excess_margin_with_uncleared_deposits: string;
  excess_maintenance_with_uncleared_deposits: string;
  equity_previous_close: string;
  portfolio_equity_previous_close: string;
  adjusted_equity_previous_close: string;
  adjusted_portfolio_equity_previous_close: string;
  withdrawable_amount: string;
  unwithdrawable_deposits: string;
  unwithdrawable_grants: string;
}

export interface RHAccount {
  url: RobinhoodURL;
  portfolio_cash: string;
  can_downgrade_to_cash: string;
  user: RobinhoodURL;
  account_number: string;
  type: string;
  created_at: string;
  updated_at: string;
  deactivated: boolean;
  deposit_halted: boolean;
  withdrawal_halted: boolean;
  only_position_closing_trades: boolean;
  buying_power: string;
  cash_available_for_withdrawal: string;
  cash: string;
  amount_eligible_for_deposit_cancellation: string;
  cash_held_for_orders: string;
  uncleared_deposits: string;
  sma: string;
  sma_held_for_orders: string;
  unsettled_funds: string;
  unsettled_debit: string;
  crypto_buying_power: string;
  max_ach_early_access_amount: string;
  cash_balances: null;
  margin_balances: {
    uncleared_deposits: string;
    cash: string;
    cash_held_for_dividends: string;
    cash_held_for_restrictions: string;
    cash_held_for_nummus_restrictions: string;
    cash_held_for_orders: string;
    cash_available_for_withdrawal: string;
    unsettled_funds: string;
    unsettled_debit: string;
    outstanding_interest: string;
    unallocated_margin_cash: string;
    margin_limit: string;
    crypto_buying_power: string;
    day_trade_buying_power: string;
    sma: string;
    day_trades_protection: false;
    start_of_day_overnight_buying_power: string;
    overnight_buying_power: string;
    overnight_buying_power_held_for_orders: string;
    day_trade_buying_power_held_for_orders: string;
    overnight_ratio: string;
    day_trade_ratio: string;
    marked_pattern_day_trader_date: string;
    created_at: string;
    updated_at: string;
    start_of_day_dtbp: string;
    portfolio_cash: string;
    cash_held_for_options_collateral: string;
    gold_equity_requirement: string;
    uncleared_nummus_deposits: string;
    cash_pending_from_options_events: string;
    settled_amount_borrowed: string;
    pending_deposit: string;
    funding_hold_balance: string;
    pending_debit_card_debits: string;
    net_moving_cash: string;
    margin_withdrawal_limit: null;
    instant_used: string;
    instant_allocated: string;
    eligible_deposit_as_instant: string;
  };
  sweep_enabled: false;
  instant_eligibility: {
    reason: string;
    reinstatement_date: null;
    reversal: null;
    state: string;
    updated_at: null;
    additional_deposit_needed: string;
    compliance_user_major_oak_email: null;
    created_at: string;
    created_by: null;
  };
  option_level: string;
  is_pinnacle_account: true;
  rhs_account_number: number;
  state: "active";
  active_subscription_id: null;
  locked: false;
  permanently_deactivated: false;
  received_ach_debit_locked: true;
  drip_enabled: true;
  eligible_for_fractionals: true;
  eligible_for_drip: true;
  eligible_for_cash_management: null;
  cash_management_enabled: true;
  option_trading_on_expiration_enabled: false;
  cash_held_for_options_collateral: string;
  fractional_position_closing_only: false;
  user_id: string;
  rhs_stock_loan_consent_status: string;
  equity_trading_lock: string;
  option_trading_lock: string;
}
