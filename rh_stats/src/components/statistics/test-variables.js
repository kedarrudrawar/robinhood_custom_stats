// -------------------------------------------------- EQUITY --------------------------------------------------

export const positionsEquity = [
  {
    url:
      "https://api.robinhood.com/positions/925501777/49945af2-ee94-496f-9b18-18ab01f90033/",
    instrument:
      "https://api.robinhood.com/instruments/49945af2-ee94-496f-9b18-18ab01f90033/",
    account: "https://api.robinhood.com/accounts/925501777/",
    account_number: "925501777",
    average_buy_price: "278.8450",
    pending_average_buy_price: "278.8450",
    quantity: "4.00000000",
    intraday_average_buy_price: "0.0000",
    intraday_quantity: "0.00000000",
    shares_held_for_buys: "0.00000000",
    shares_held_for_sells: "0.00000000",
    shares_held_for_stock_grants: "0.00000000",
    shares_held_for_options_collateral: "0.00000000",
    shares_held_for_options_events: "0.00000000",
    shares_pending_from_options_events: "0.00000000",
    updated_at: "2020-03-03T16:41:34.604614Z",
    created_at: "2020-03-03T16:41:33.818202Z",
  },
  {
    url:
      "https://api.robinhood.com/positions/925501777/b2e06903-5c44-46a4-bd42-2a696f9d68e1/",
    instrument:
      "https://api.robinhood.com/instruments/b2e06903-5c44-46a4-bd42-2a696f9d68e1/",
    account: "https://api.robinhood.com/accounts/925501777/",
    account_number: "925501777",
    average_buy_price: "220.9920",
    pending_average_buy_price: "220.9920",
    quantity: "5.00000000",
    intraday_average_buy_price: "0.0000",
    intraday_quantity: "0.00000000",
    shares_held_for_buys: "0.00000000",
    shares_held_for_sells: "0.00000000",
    shares_held_for_stock_grants: "0.00000000",
    shares_held_for_options_collateral: "0.00000000",
    shares_held_for_options_events: "0.00000000",
    shares_pending_from_options_events: "0.00000000",
    updated_at: "2020-02-06T18:13:01.689546Z",
    created_at: "2020-02-06T16:45:32.183660Z",
  },
  {
    url:
      "https://api.robinhood.com/positions/925501777/fc77229c-9134-4817-bd0c-588e672c15e7/",
    instrument:
      "https://api.robinhood.com/instruments/fc77229c-9134-4817-bd0c-588e672c15e7/",
    account: "https://api.robinhood.com/accounts/925501777/",
    account_number: "925501777",
    average_buy_price: "40.3900",
    pending_average_buy_price: "40.3900",
    quantity: "25.00000000",
    intraday_average_buy_price: "0.0000",
    intraday_quantity: "0.00000000",
    shares_held_for_buys: "0.00000000",
    shares_held_for_sells: "0.00000000",
    shares_held_for_stock_grants: "0.00000000",
    shares_held_for_options_collateral: "0.00000000",
    shares_held_for_options_events: "0.00000000",
    shares_pending_from_options_events: "0.00000000",
    updated_at: "2019-12-24T14:30:05.110090Z",
    created_at: "2019-12-21T18:59:15.258848Z",
  },
  {
    url:
      "https://api.robinhood.com/positions/925501777/50810c35-d215-4866-9758-0ada4ac79ffa/",
    instrument:
      "https://api.robinhood.com/instruments/50810c35-d215-4866-9758-0ada4ac79ffa/",
    account: "https://api.robinhood.com/accounts/925501777/",
    account_number: "925501777",
    average_buy_price: "168.2460",
    pending_average_buy_price: "168.2460",
    quantity: "5.00000000",
    intraday_average_buy_price: "0.0000",
    intraday_quantity: "0.00000000",
    shares_held_for_buys: "0.00000000",
    shares_held_for_sells: "0.00000000",
    shares_held_for_stock_grants: "0.00000000",
    shares_held_for_options_collateral: "0.00000000",
    shares_held_for_options_events: "0.00000000",
    shares_pending_from_options_events: "0.00000000",
    updated_at: "2020-04-07T14:16:31.074120Z",
    created_at: "2020-02-21T15:36:44.671119Z",
  },
  // GOOG - 0.38 shares
  {
    url:
      "https://api.robinhood.com/positions/925501777/943c5009-a0bb-4665-8cf4-a95dab5874e4/",
    instrument:
      "https://api.robinhood.com/instruments/943c5009-a0bb-4665-8cf4-a95dab5874e4/",
    account: "https://api.robinhood.com/accounts/925501777/",
    account_number: "925501777",
    average_buy_price: "1437.6755",
    pending_average_buy_price: "1437.6755",
    quantity: "0.38256200",
    intraday_average_buy_price: "0.0000",
    intraday_quantity: "0.00000000",
    shares_held_for_buys: "0.00000000",
    shares_held_for_sells: "0.00000000",
    shares_held_for_stock_grants: "0.00000000",
    shares_held_for_options_collateral: "0.00000000",
    shares_held_for_options_events: "0.00000000",
    shares_pending_from_options_events: "0.00000000",
    updated_at: "2020-06-03T15:22:37.426930Z",
    created_at: "2020-06-03T15:22:34.861748Z",
  },
];

export const fullPositionsEquity = [
  { ...positionsEquity[0], symbol: "ILMN", tradability: "tradable" },
  { ...positionsEquity[1], symbol: "BABA", tradability: "tradable" },
  { ...positionsEquity[2], symbol: "RHHBY", tradability: "tradable" },
  { ...positionsEquity[3], symbol: "MSFT", tradability: "tradable" },
  { ...positionsEquity[4], symbol: "GOOG", tradability: "tradable" },
];

export const singleBuyOrderEquity = [
  // buy 15 MRNA at $26
  {
    id: "ae07ba70-0bb6-468f-9ef6-e08c543ac415",
    ref_id: "1730FE17-02A7-46D9-B549-EEB15271C5B1",
    url:
      "https://api.robinhood.com/orders/ae07ba70-0bb6-468f-9ef6-e08c543ac415/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/8b760bb0-106d-41ee-a1d5-618236320dd2/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/",
    cumulative_quantity: "15.00000000",
    average_price: "26.00000000",
    fees: "0.00",
    state: "filled",
    type: "limit",
    side: "buy",
    time_in_force: "gfd",
    trigger: "immediate",
    price: "26.00000000",
    stop_price: null,
    quantity: "15.00000000",
    reject_reason: null,
    created_at: "2020-02-27T17:19:21.474218Z",
    updated_at: "2020-02-27T17:42:42.816851Z",
    last_transaction_at: "2020-02-27T17:42:42.361000Z",
    executions: [
      {
        price: "26.00000000",
        quantity: "15.00000000",
        settlement_date: "2020-03-02",
        timestamp: "2020-02-27T17:42:42.361000Z",
        id: "e603ba79-f148-4ae5-a8a5-61d78a5d7c7f",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: null,
    drip_dividend_id: null,
    total_notional: {
      amount: "390.00",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    executed_notional: {
      amount: "390.00",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },
];

export const singleSellOrderEquity = [
  // sell 5 MRNA at $29.36
  {
    id: "99a63304-adc1-49de-aa0f-3c14f871bdb9",
    ref_id: "59F6DE60-CD18-44C5-91F0-40F035F8A2F2",
    url:
      "https://api.robinhood.com/orders/99a63304-adc1-49de-aa0f-3c14f871bdb9/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/8b760bb0-106d-41ee-a1d5-618236320dd2/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/",
    cumulative_quantity: "5.00000000",
    average_price: "29.36000000",
    fees: "0.00",
    state: "filled",
    type: "limit",
    side: "sell",
    time_in_force: "gfd",
    trigger: "immediate",
    price: "29.05000000",
    stop_price: null,
    quantity: "5.00000000",
    reject_reason: null,
    created_at: "2020-03-17T04:03:51.340854Z",
    updated_at: "2020-03-17T13:32:11.719444Z",
    last_transaction_at: "2020-03-17T13:30:02.165000Z",
    executions: [
      {
        price: "29.36000000",
        quantity: "5.00000000",
        settlement_date: "2020-03-19",
        timestamp: "2020-03-17T13:30:02.165000Z",
        id: "6da22a3a-b117-4b3a-8e38-b418049f5b59",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: null,
    drip_dividend_id: null,
    total_notional: {
      amount: "145.25",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    executed_notional: {
      amount: "146.80",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },
];

export const multipleBuyOrdersEquity = [
  ...singleBuyOrderEquity,
  // buy 3 FANG @  32.91
  {
    id: "2d5e4d72-df78-4335-a3cb-a4a1fac00787",
    ref_id: "B3207B6A-46F0-41F3-84F5-DCD359074F38",
    url:
      "https://api.robinhood.com/orders/2d5e4d72-df78-4335-a3cb-a4a1fac00787/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/00815789-becf-4d44-8733-032d602a33d8/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/00815789-becf-4d44-8733-032d602a33d8/",
    cumulative_quantity: "3.00000000",
    average_price: "32.91330000",
    fees: "0.00",
    state: "filled",
    type: "market",
    side: "buy",
    time_in_force: "gfd",
    trigger: "immediate",
    price: "34.58000000",
    stop_price: null,
    quantity: "3.00000000",
    reject_reason: null,
    created_at: "2020-04-07T19:04:05.755685Z",
    updated_at: "2020-04-07T19:04:06.330907Z",
    last_transaction_at: "2020-04-07T19:04:05.849000Z",
    executions: [
      {
        price: "32.91490000",
        quantity: "3.00000000",
        settlement_date: "2020-04-09",
        timestamp: "2020-04-07T19:04:05.849000Z",
        id: "23586925-a125-411c-bad9-48725d6e9f34",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: null,
    drip_dividend_id: null,
    total_notional: {
      amount: "103.74",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    executed_notional: {
      amount: "98.74",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },

  // buy 1 NEE @ $237.00
  {
    id: "7ea76211-3cfc-472c-8d66-824ae91f8040",
    ref_id: "2AB22D12-5489-4A82-9ACA-4169E8BE9730",
    url:
      "https://api.robinhood.com/orders/7ea76211-3cfc-472c-8d66-824ae91f8040/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
    cumulative_quantity: "1.00000000",
    average_price: "237.00000000",
    fees: "0.00",
    state: "filled",
    type: "limit",
    side: "buy",
    time_in_force: "gfd",
    trigger: "immediate",
    price: "237.00000000",
    stop_price: null,
    quantity: "1.00000000",
    reject_reason: null,
    created_at: "2020-04-24T16:29:07.739507Z",
    updated_at: "2020-04-24T16:34:49.442914Z",
    last_transaction_at: "2020-04-24T16:34:49.020000Z",
    executions: [
      {
        price: "237.00000000",
        quantity: "1.00000000",
        settlement_date: "2020-04-28",
        timestamp: "2020-04-24T16:34:49.020000Z",
        id: "c6596c5b-4d2a-4ed0-b05b-7231a343c98f",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: null,
    drip_dividend_id: null,
    total_notional: {
      amount: "237.00",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    executed_notional: {
      amount: "237.00",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },

  // buy 1 NEE @ $203.29
  {
    id: "2cd09ca9-6c48-413f-97e0-a80359e1c459",
    ref_id: "29C44E6E-1F12-4654-99CF-AE1F602519D6",
    url:
      "https://api.robinhood.com/orders/2cd09ca9-6c48-413f-97e0-a80359e1c459/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
    cumulative_quantity: "1.00000000",
    average_price: "203.29000000",
    fees: "0.00",
    state: "filled",
    type: "market",
    side: "buy",
    time_in_force: "gfd",
    trigger: "immediate",
    price: "213.40000000",
    stop_price: null,
    quantity: "1.00000000",
    reject_reason: null,
    created_at: "2020-03-16T19:34:14.027358Z",
    updated_at: "2020-03-16T19:34:14.607578Z",
    last_transaction_at: "2020-03-16T19:34:14.146000Z",
    executions: [
      {
        price: "203.28730000",
        quantity: "1.00000000",
        settlement_date: "2020-03-18",
        timestamp: "2020-03-16T19:34:14.146000Z",
        id: "8ffc4ac1-8538-40db-bbfe-ba9ebd49f247",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: null,
    drip_dividend_id: null,
    total_notional: {
      amount: "213.40",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    executed_notional: {
      amount: "203.29",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },

  // buy 0.00106700 AMZN @ $1780.6935
  {
    id: "0645d156-ba33-48cd-a85b-4552be708f6a",
    ref_id: "89A76B18-42EB-4034-B2BF-18A4C0F864F8",
    url:
      "https://api.robinhood.com/orders/0645d156-ba33-48cd-a85b-4552be708f6a/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/",
    cumulative_quantity: "0.00106700",
    average_price: "1780.69350000",
    fees: "0.00",
    state: "filled",
    type: "market",
    side: "buy",
    time_in_force: "gfd",
    trigger: "immediate",
    price: "1872.66000000",
    stop_price: null,
    quantity: "0.00106700",
    reject_reason: null,
    created_at: "2019-12-18T21:57:18.381285Z",
    updated_at: "2019-12-19T14:30:52.837825Z",
    last_transaction_at: "2019-12-19T14:30:08.861445Z",
    executions: [
      {
        price: "1780.01000000",
        quantity: "0.00106700",
        settlement_date: "2019-12-23",
        timestamp: "2019-12-19T14:30:08.861445Z",
        id: "c0a59454-9ad8-448c-8e2e-ab04c4178a06",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: {
      amount: "2.00000000",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    drip_dividend_id: null,
    total_notional: {
      amount: "2.00",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    executed_notional: {
      amount: "1.90",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },
];

export const multipleSellOrdersEquity = [
  ...singleSellOrderEquity,
  // 2 NEE @ $236.96
  {
    id: "92041639-071d-4784-8e51-0e2c8ba2bd2f",
    ref_id: "FC3FF229-6F62-40E7-AB2A-0F733855E39E",
    url:
      "https://api.robinhood.com/orders/92041639-071d-4784-8e51-0e2c8ba2bd2f/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
    cumulative_quantity: "2.00000000",
    average_price: "236.96000000",
    fees: "0.00",
    state: "filled",
    type: "market",
    side: "sell",
    time_in_force: "gfd",
    trigger: "immediate",
    price: null,
    stop_price: null,
    quantity: "2.00000000",
    reject_reason: null,
    created_at: "2020-05-26T14:56:40.081581Z",
    updated_at: "2020-05-26T14:56:40.795808Z",
    last_transaction_at: "2020-05-26T14:56:40.373000Z",
    executions: [
      {
        price: "236.95940000",
        quantity: "2.00000000",
        settlement_date: "2020-05-28",
        timestamp: "2020-05-26T14:56:40.371000Z",
        id: "e3bf5673-2939-4434-9bd0-608b6f12f8d6",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: null,
    drip_dividend_id: null,
    total_notional: null,
    executed_notional: {
      amount: "473.92",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },

  // 2 FANG @ $44.01
  {
    id: "1276000a-ffc9-43d4-8813-17db50b2f558",
    ref_id: "9A922E4B-BC4B-4C18-A6DE-4EF38B2208E4",
    url:
      "https://api.robinhood.com/orders/1276000a-ffc9-43d4-8813-17db50b2f558/",
    account: "https://api.robinhood.com/accounts/925501777/",
    position:
      "https://api.robinhood.com/positions/925501777/00815789-becf-4d44-8733-032d602a33d8/",
    cancel: null,
    instrument:
      "https://api.robinhood.com/instruments/00815789-becf-4d44-8733-032d602a33d8/",
    cumulative_quantity: "2.00000000",
    average_price: "44.00500000",
    fees: "0.00",
    state: "filled",
    type: "market",
    side: "sell",
    time_in_force: "gfd",
    trigger: "immediate",
    price: null,
    stop_price: null,
    quantity: "2.00000000",
    reject_reason: null,
    created_at: "2020-04-29T19:55:03.861321Z",
    updated_at: "2020-04-29T19:55:04.419559Z",
    last_transaction_at: "2020-04-29T19:55:03.955000Z",
    executions: [
      {
        price: "44.00600000",
        quantity: "2.00000000",
        settlement_date: "2020-05-01",
        timestamp: "2020-04-29T19:55:03.946000Z",
        id: "be5b4d48-6baa-4d55-996e-4d12c198ac3b",
      },
    ],
    extended_hours: false,
    override_dtbp_checks: false,
    override_day_trade_checks: false,
    response_category: null,
    stop_triggered_at: null,
    last_trail_price: null,
    last_trail_price_updated_at: null,
    dollar_based_amount: null,
    drip_dividend_id: null,
    total_notional: null,
    executed_notional: {
      amount: "88.01",
      currency_code: "USD",
      currency_id: "1072fc76-1862-41ab-82c2-485837590762",
    },
    investment_schedule_id: null,
  },
];

// -------------------------------------------------- OPTIONS --------------------------------------------------

// aggregate positions API
export const positionsOptions = [
  // 1 SPY call [ACTIVE]
  {
    id: "4cbb4e85-41e5-41d9-bf07-d746c1779e44",
    chain:
      "https://api.robinhood.com/options/chains/c277b118-58d9-4060-8dc5-a3b5898955cb/",
    symbol: "SPY",
    strategy: "long_call",
    average_open_price: "5.0000",
    legs: [
      {
        id: "cc9973fd-8319-46f8-abd5-9831d389f732",
        position:
          "https://api.robinhood.com/options/positions/7814ed82-30e3-4aaa-82ae-17826e5239f4/",
        position_type: "long",
        option:
          "https://api.robinhood.com/options/instruments/51e40b32-30d1-4644-83be-b6b0ed220f2e/",
        ratio_quantity: 1,
        expiration_date: "2020-07-10",
        strike_price: "343.0000",
        option_type: "call",
      },
    ],
    quantity: "1.0000",
    intraday_average_open_price: "5.0000",
    intraday_quantity: "1.0000",
    direction: "debit",
    intraday_direction: "debit",
    trade_value_multiplier: "100.0000",
    created_at: "2020-06-26T17:35:13.207458Z",
    updated_at: "2020-06-26T17:35:13.213726Z",
  },

  // 1 PLUG put [INACTIVE]
  {
    id: "8228fea0-fadd-47e5-8ca0-f6ca451910a3",
    chain:
      "https://api.robinhood.com/options/chains/bfd42df1-e4e3-46fc-aee0-0f1dad954482/",
    symbol: "PLUG",
    strategy: "long_put",
    average_open_price: "0.0000",
    legs: [
      {
        id: "6192e2df-ee59-4783-9d24-37138939bcd4",
        position:
          "https://api.robinhood.com/options/positions/3ef7c00a-f8be-482b-a94c-57680bbcc4f1/",
        position_type: "long",
        option:
          "https://api.robinhood.com/options/instruments/677f62de-ea83-4f8b-a960-722379c5519b/",
        ratio_quantity: 1,
        expiration_date: "2020-07-17",
        strike_price: "6.0000",
        option_type: "put",
      },
    ],
    quantity: "0.0000",
    intraday_average_open_price: "0.0000",
    intraday_quantity: "0.0000",
    direction: "debit",
    intraday_direction: "debit",
    trade_value_multiplier: "100.0000",
    created_at: "2020-06-24T14:50:21.576757Z",
    updated_at: "2020-06-26T14:10:08.315245Z",
  },

  // 1 CCL put [INACTIVE]
  {
    id: "9ede2e3f-e3e9-4a4f-8d72-847c74eaf241",
    chain:
      "https://api.robinhood.com/options/chains/26cb3176-c6c4-4cc2-8602-898cf73f3f96/",
    symbol: "CCL",
    strategy: "long_put",
    average_open_price: "0.0000",
    legs: [
      {
        id: "85452368-4c8c-48c3-b110-4dec768cef82",
        position:
          "https://api.robinhood.com/options/positions/584f9408-9579-49b8-8a93-4f5dbe350251/",
        position_type: "long",
        option:
          "https://api.robinhood.com/options/instruments/6eeefa6f-7498-494b-b06d-81c79a654ff8/",
        ratio_quantity: 1,
        expiration_date: "2020-07-17",
        strike_price: "12.5000",
        option_type: "put",
      },
    ],
    quantity: "0.0000",
    intraday_average_open_price: "0.0000",
    intraday_quantity: "0.0000",
    direction: "debit",
    intraday_direction: "debit",
    trade_value_multiplier: "100.0000",
    created_at: "2020-06-19T18:11:45.185441Z",
    updated_at: "2020-06-24T16:04:56.684452Z",
  },
];

export const positionsOptionsActive = positionsOptions.filter(
  (option) => parseFloat(option["quantity"]) > 0
);

export const singleBuyOrderOptions = [
  // PLUG buy - $27
  {
    cancel_url: null,
    canceled_quantity: "0.00000",
    created_at: "2020-06-24T14:50:20.697057Z",
    direction: "debit",
    id: "f27894b8-ab8c-4b36-a9be-bbd2b84ac026",
    legs: [
      {
        executions: [
          {
            id: "86f4d8cd-361c-4735-8c34-9345a70df7df",
            price: "0.27000000",
            quantity: "1.00000",
            settlement_date: "2020-06-25",
            timestamp: "2020-06-24T14:50:21.114000Z",
          },
        ],
        id: "4da45aa7-a0f0-4662-ba2d-3f19f024b252",
        option:
          "https://api.robinhood.com/options/instruments/677f62de-ea83-4f8b-a960-722379c5519b/",
        position_effect: "open",
        ratio_quantity: 1,
        side: "buy",
      },
    ],
    pending_quantity: "0.00000",
    premium: "27.00000000",
    processed_premium: "27.00000000000000000",
    price: "0.27000000",
    processed_quantity: "1.00000",
    quantity: "1.00000",
    ref_id: "5750EC68-D881-4C3C-98F5-D7A269BE0001",
    state: "filled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-24T14:50:21.592287Z",
    chain_id: "bfd42df1-e4e3-46fc-aee0-0f1dad954482",
    chain_symbol: "PLUG",
    response_category: null,
    opening_strategy: "long_put",
    closing_strategy: null,
    stop_price: null,
  },
];

export const singleSellOrderOptions = [
  {
    cancel_url: null,
    canceled_quantity: "0.00000",
    created_at: "2020-06-26T13:59:28.566373Z",
    direction: "credit",
    id: "10b58231-314d-4a98-bd35-7ef8991fd2ee",
    legs: [
      {
        executions: [
          {
            id: "42c4ef1b-0169-407c-9c2f-0ec1b73618bf",
            price: "0.28000000",
            quantity: "1.00000",
            settlement_date: "2020-06-29",
            timestamp: "2020-06-26T14:10:07.806000Z",
          },
        ],
        id: "58dd5337-f998-4c33-aee7-73d57941494e",
        option:
          "https://api.robinhood.com/options/instruments/677f62de-ea83-4f8b-a960-722379c5519b/",
        position_effect: "close",
        ratio_quantity: 1,
        side: "sell",
      },
    ],
    pending_quantity: "0.00000",
    premium: "28.00000000",
    processed_premium: "28.00000000000000000",
    price: "0.28000000",
    processed_quantity: "1.00000",
    quantity: "1.00000",
    ref_id: "0C0D22CC-BAEE-4F03-B034-EB3131DF11DA",
    state: "filled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-26T14:10:09.069592Z",
    chain_id: "bfd42df1-e4e3-46fc-aee0-0f1dad954482",
    chain_symbol: "PLUG",
    response_category: null,
    opening_strategy: null,
    closing_strategy: "long_put",
    stop_price: null,
  },
];

export const multipleBuyOrdersOptions = [
  // PLUG buy - $27
  ...singleBuyOrderOptions,

  // CCL buy - $55
  {
    cancel_url: null,
    canceled_quantity: "0.00000",
    created_at: "2020-06-19T18:11:44.347913Z",
    direction: "debit",
    id: "5ebb51ae-6bc5-49aa-9b89-6a0b2498c9b5",
    legs: [
      {
        executions: [
          {
            id: "0ee01e27-1643-4b37-84ed-8421d42dc89b",
            price: "0.55000000",
            quantity: "1.00000",
            settlement_date: "2020-06-22",
            timestamp: "2020-06-19T18:11:44.777000Z",
          },
        ],
        id: "37f31a0a-bbbf-4844-ad97-eddf8e9b6026",
        option:
          "https://api.robinhood.com/options/instruments/6eeefa6f-7498-494b-b06d-81c79a654ff8/",
        position_effect: "open",
        ratio_quantity: 1,
        side: "buy",
      },
    ],
    pending_quantity: "0.00000",
    premium: "55.00000000",
    processed_premium: "55.00000000000000000",
    price: "0.55000000",
    processed_quantity: "1.00000",
    quantity: "1.00000",
    ref_id: "055718E7-E59A-43CB-A778-B2E70C41D393",
    state: "filled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-19T18:11:45.193363Z",
    chain_id: "26cb3176-c6c4-4cc2-8602-898cf73f3f96",
    chain_symbol: "CCL",
    response_category: null,
    opening_strategy: "long_put",
    closing_strategy: null,
    stop_price: null,
  },
  // cancelled buy order
  {
    cancel_url: null,
    canceled_quantity: "1.00000",
    created_at: "2020-06-08T17:27:38.166787Z",
    direction: "debit",
    id: "bddd37b5-5380-4bc2-9376-d797f1aedff2",
    legs: [
      {
        executions: [],
        id: "48a524de-ce0a-482d-9e10-effe2a74cd3a",
        option:
          "https://api.robinhood.com/options/instruments/5a83e8d1-3de3-4316-8f8e-f661cfc43772/",
        position_effect: "open",
        ratio_quantity: 1,
        side: "buy",
      },
    ],
    pending_quantity: "0.00000",
    premium: "12.00000000",
    processed_premium: "0.0000",
    price: "0.12000000",
    processed_quantity: "0.00000",
    quantity: "1.00000",
    ref_id: "A6A6F8F3-148C-4D85-A59E-53B22F495D4E",
    state: "cancelled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-08T20:03:24.592698Z",
    chain_id: "103ce21e-4921-47ed-a263-e05d2d3d5e99",
    chain_symbol: "XLF",
    response_category: null,
    opening_strategy: "long_call",
    closing_strategy: null,
    stop_price: null,
  },
  // 1 XLF buy - $11
  {
    cancel_url: null,
    canceled_quantity: "0.00000",
    created_at: "2020-06-09T14:03:32.516857Z",
    direction: "debit",
    id: "e1da334f-f1bd-41f7-869a-418691fc0fd4",
    legs: [
      {
        executions: [
          {
            id: "3ea4faf1-1f0c-4fff-b21d-186220e5230e",
            price: "0.11000000",
            quantity: "1.00000",
            settlement_date: "2020-06-10",
            timestamp: "2020-06-09T14:03:33.053000Z",
          },
        ],
        id: "333060bb-c5b1-4d8b-911d-e6e011cb4a6c",
        option:
          "https://api.robinhood.com/options/instruments/5a83e8d1-3de3-4316-8f8e-f661cfc43772/",
        position_effect: "open",
        ratio_quantity: 1,
        side: "buy",
      },
    ],
    pending_quantity: "0.00000",
    premium: "11.00000000",
    processed_premium: "11.00000000000000000",
    price: "0.11000000",
    processed_quantity: "1.00000",
    quantity: "1.00000",
    ref_id: "1A9204E0-DEC8-493A-8B32-88E536254460",
    state: "filled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-09T14:03:33.608417Z",
    chain_id: "103ce21e-4921-47ed-a263-e05d2d3d5e99",
    chain_symbol: "XLF",
    response_category: null,
    opening_strategy: "long_call",
    closing_strategy: null,
    stop_price: null,
  },
  // cancelled buy order - XLF
  {
    cancel_url: null,
    canceled_quantity: "1.00000",
    created_at: "2020-06-08T17:27:38.166787Z",
    direction: "debit",
    id: "bddd37b5-5380-4bc2-9376-d797f1aedff2",
    legs: [
      {
        executions: [],
        id: "48a524de-ce0a-482d-9e10-effe2a74cd3a",
        option:
          "https://api.robinhood.com/options/instruments/5a83e8d1-3de3-4316-8f8e-f661cfc43772/",
        position_effect: "open",
        ratio_quantity: 1,
        side: "buy",
      },
    ],
    pending_quantity: "0.00000",
    premium: "12.00000000",
    processed_premium: "0.0000",
    price: "0.12000000",
    processed_quantity: "0.00000",
    quantity: "1.00000",
    ref_id: "A6A6F8F3-148C-4D85-A59E-53B22F495D4E",
    state: "cancelled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-08T20:03:24.592698Z",
    chain_id: "103ce21e-4921-47ed-a263-e05d2d3d5e99",
    chain_symbol: "XLF",
    response_category: null,
    opening_strategy: "long_call",
    closing_strategy: null,
    stop_price: null,
  },
  // 2 XLF buy - $ 16 each ($32 total)
  {
    cancel_url: null,
    canceled_quantity: "0.00000",
    created_at: "2020-06-08T16:25:59.494403Z",
    direction: "debit",
    id: "64e9b38c-6050-4d82-9f81-bdaa19fb7ce8",
    legs: [
      {
        executions: [
          {
            id: "da748b1e-0293-4b82-846c-110c7a72cd16",
            price: "0.16000000",
            quantity: "2.00000",
            settlement_date: "2020-06-09",
            timestamp: "2020-06-08T16:25:59.924000Z",
          },
        ],
        id: "ae6671cc-9c60-4ff5-971a-d06382a59cf4",
        option:
          "https://api.robinhood.com/options/instruments/5a83e8d1-3de3-4316-8f8e-f661cfc43772/",
        position_effect: "open",
        ratio_quantity: 1,
        side: "buy",
      },
    ],
    pending_quantity: "0.00000",
    premium: "16.00000000",
    processed_premium: "32.00000000000000000",
    price: "0.16000000",
    processed_quantity: "2.00000",
    quantity: "2.00000",
    ref_id: "5088D48A-6690-42C4-8A5D-43A83D8157A6",
    state: "filled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-08T16:26:00.389795Z",
    chain_id: "103ce21e-4921-47ed-a263-e05d2d3d5e99",
    chain_symbol: "XLF",
    response_category: null,
    opening_strategy: "long_call",
    closing_strategy: null,
    stop_price: null,
  },
];

export const multipleSellOrdersOptions = [
  // 1 PLUG sell - $28
  ...singleSellOrderOptions,

  // 1 CCL sell - $65
  {
    cancel_url: null,
    canceled_quantity: "0.00000",
    created_at: "2020-06-24T16:04:55.301433Z",
    direction: "credit",
    id: "da61d030-2bda-4cc3-842e-2539c34ab5fa",
    legs: [
      {
        executions: [
          {
            id: "db01d59f-5ead-463a-8ded-280e06c930c1",
            price: "0.65000000",
            quantity: "1.00000",
            settlement_date: "2020-06-25",
            timestamp: "2020-06-24T16:04:56.203000Z",
          },
        ],
        id: "0b571570-e781-482d-8c4c-e54450124f16",
        option:
          "https://api.robinhood.com/options/instruments/6eeefa6f-7498-494b-b06d-81c79a654ff8/",
        position_effect: "close",
        ratio_quantity: 1,
        side: "sell",
      },
    ],
    pending_quantity: "0.00000",
    premium: "65.00000000",
    processed_premium: "65.00000000000000000",
    price: "0.65000000",
    processed_quantity: "1.00000",
    quantity: "1.00000",
    ref_id: "F674E594-DB8A-4894-A320-FA8E4F075824",
    state: "filled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-24T16:04:56.686380Z",
    chain_id: "26cb3176-c6c4-4cc2-8602-898cf73f3f96",
    chain_symbol: "CCL",
    response_category: null,
    opening_strategy: null,
    closing_strategy: "long_put",
    stop_price: null,
  },

  // 3 XLF sell - $5 each ($15 total)
  {
    cancel_url: null,
    canceled_quantity: "0.00000",
    created_at: "2020-06-12T15:17:07.147954Z",
    direction: "credit",
    id: "f6b2ff38-1d19-4cf2-b2e9-2ec2ad0b3769",
    legs: [
      {
        executions: [
          {
            id: "061ba6d9-685c-4d42-9ce2-8eb29eb590e9",
            price: "0.05000000",
            quantity: "3.00000",
            settlement_date: "2020-06-15",
            timestamp: "2020-06-12T15:17:08.053000Z",
          },
        ],
        id: "f7c6e4c8-7beb-4f0d-9c63-b737271d6cd0",
        option:
          "https://api.robinhood.com/options/instruments/5a83e8d1-3de3-4316-8f8e-f661cfc43772/",
        position_effect: "close",
        ratio_quantity: 1,
        side: "sell",
      },
    ],
    pending_quantity: "0.00000",
    premium: "5.00000000",
    processed_premium: "15.00000000000000000",
    price: "0.05000000",
    processed_quantity: "3.00000",
    quantity: "3.00000",
    ref_id: "CDE8C0A4-7FA0-4BFC-85D5-F772289264A0",
    state: "filled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-12T15:17:08.581585Z",
    chain_id: "103ce21e-4921-47ed-a263-e05d2d3d5e99",
    chain_symbol: "XLF",
    response_category: null,
    opening_strategy: null,
    closing_strategy: "long_call",
    stop_price: null,
  },

  // cancelled sell order
  {
    cancel_url: null,
    canceled_quantity: "1.00000",
    created_at: "2020-06-24T16:03:49.415345Z",
    direction: "credit",
    id: "53ed3de2-4fec-4f29-86e4-96765b465b0f",
    legs: [
      {
        executions: [],
        id: "8ab5cc9d-d7d4-4f7b-be35-bcedbaab92da",
        option:
          "https://api.robinhood.com/options/instruments/6eeefa6f-7498-494b-b06d-81c79a654ff8/",
        position_effect: "close",
        ratio_quantity: 1,
        side: "sell",
      },
    ],
    pending_quantity: "0.00000",
    premium: "70.00000000",
    processed_premium: "0.0000",
    price: "0.70000000",
    processed_quantity: "0.00000",
    quantity: "1.00000",
    ref_id: "842A3D07-3077-4B3A-BFC4-8E7E8C6D06D7",
    state: "cancelled",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
    updated_at: "2020-06-24T16:04:41.582813Z",
    chain_id: "26cb3176-c6c4-4cc2-8602-898cf73f3f96",
    chain_symbol: "CCL",
    response_category: null,
    opening_strategy: null,
    closing_strategy: "long_put",
    stop_price: null,
  },
];

// -------------------------------------------------- DIVIDENDS --------------------------------------------------

// 1 AMAT dividend
export const singleDividend = [
  {
    id: "806640f4-60b0-5e78-a5ed-16bfcffe19d3",
    url:
      "https://api.robinhood.com/dividends/806640f4-60b0-5e78-a5ed-16bfcffe19d3/",
    account: "https://api.robinhood.com/accounts/925501777/",
    instrument:
      "https://api.robinhood.com/instruments/18006bfb-cbad-4326-8348-738c94ea47fa/",
    amount: "2.20",
    rate: "0.2200000000",
    position: "10.00000000",
    withholding: "0.00",
    record_date: "2020-05-21",
    payable_date: "2020-06-11",
    paid_at: null,
    state: "pending",
    nra_withholding: "0",
    drip_enabled: true,
  },
];

export const multipleDividends = [
  ...singleDividend,
  // MSFT dividend - 2.55
  {
    id: "d64633db-4326-5857-896c-6a3a64a94dd2",
    url:
      "https://api.robinhood.com/dividends/d64633db-4326-5857-896c-6a3a64a94dd2/",
    account: "https://api.robinhood.com/accounts/925501777/",
    instrument:
      "https://api.robinhood.com/instruments/50810c35-d215-4866-9758-0ada4ac79ffa/",
    amount: "2.55",
    rate: "0.5100000000",
    position: "5.00000000",
    withholding: "0.00",
    record_date: "2020-05-21",
    payable_date: "2020-06-11",
    paid_at: null,
    state: "pending",
    nra_withholding: "0",
    drip_enabled: true,
  },
  // PSX dividend - 1.80
  {
    id: "be1b32ef-cb48-5518-9e02-06cf7515125b",
    url:
      "https://api.robinhood.com/dividends/be1b32ef-cb48-5518-9e02-06cf7515125b/",
    account: "https://api.robinhood.com/accounts/925501777/",
    instrument:
      "https://api.robinhood.com/instruments/124133a3-cf48-45f4-a014-934529fdfd7b/",
    amount: "1.80",
    rate: "0.9000000000",
    position: "2.00000000",
    withholding: "0.00",
    record_date: "2020-05-18",
    payable_date: "2020-06-01",
    paid_at: null,
    state: "pending",
    nra_withholding: "0",
    drip_enabled: true,
  },
];

// 3 identical AMAT dividends
export const duplicateDividends = [
  ...singleDividend,
  ...singleDividend,
  ...singleDividend,
];

// duplicate + different dividends
export const manyDividends = [...duplicateDividends, ...multipleDividends];
