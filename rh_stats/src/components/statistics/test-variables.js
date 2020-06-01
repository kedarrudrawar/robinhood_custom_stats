export const positions = [
    {
        "url": "https://api.robinhood.com/positions/925501777/49945af2-ee94-496f-9b18-18ab01f90033/",
        "instrument": "https://api.robinhood.com/instruments/49945af2-ee94-496f-9b18-18ab01f90033/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "account_number": "925501777",
        "average_buy_price": "278.8450",
        "pending_average_buy_price": "278.8450",
        "quantity": "4.00000000",
        "intraday_average_buy_price": "0.0000",
        "intraday_quantity": "0.00000000",
        "shares_held_for_buys": "0.00000000",
        "shares_held_for_sells": "0.00000000",
        "shares_held_for_stock_grants": "0.00000000",
        "shares_held_for_options_collateral": "0.00000000",
        "shares_held_for_options_events": "0.00000000",
        "shares_pending_from_options_events": "0.00000000",
        "updated_at": "2020-03-03T16:41:34.604614Z",
        "created_at": "2020-03-03T16:41:33.818202Z",
    }];

export const fullPositions = {...positions[0], 
    "symbol": "ILMN",
    "tradability": "tradable", 
};

export const singleBuyOrder = [
    // buy 15 MRNA at $26
    {
        "id": "ae07ba70-0bb6-468f-9ef6-e08c543ac415",
        "ref_id": "1730FE17-02A7-46D9-B549-EEB15271C5B1",
        "url": "https://api.robinhood.com/orders/ae07ba70-0bb6-468f-9ef6-e08c543ac415/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/8b760bb0-106d-41ee-a1d5-618236320dd2/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/",
        "cumulative_quantity": "15.00000000",
        "average_price": "26.00000000",
        "fees": "0.00",
        "state": "filled",
        "type": "limit",
        "side": "buy",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": "26.00000000",
        "stop_price": null,
        "quantity": "15.00000000",
        "reject_reason": null,
        "created_at": "2020-02-27T17:19:21.474218Z",
        "updated_at": "2020-02-27T17:42:42.816851Z",
        "last_transaction_at": "2020-02-27T17:42:42.361000Z",
        "executions": [
            {
                "price": "26.00000000",
                "quantity": "15.00000000",
                "settlement_date": "2020-03-02",
                "timestamp": "2020-02-27T17:42:42.361000Z",
                "id": "e603ba79-f148-4ae5-a8a5-61d78a5d7c7f"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": null,
        "drip_dividend_id": null,
        "total_notional": {
            "amount": "390.00",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "executed_notional": {
            "amount": "390.00",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null,
    },

       
];

export const singleSellOrder = [
    // sell 5 MRNA at $29.36
    {
        "id": "99a63304-adc1-49de-aa0f-3c14f871bdb9",
        "ref_id": "59F6DE60-CD18-44C5-91F0-40F035F8A2F2",
        "url": "https://api.robinhood.com/orders/99a63304-adc1-49de-aa0f-3c14f871bdb9/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/8b760bb0-106d-41ee-a1d5-618236320dd2/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/",
        "cumulative_quantity": "5.00000000",
        "average_price": "29.36000000",
        "fees": "0.00",
        "state": "filled",
        "type": "limit",
        "side": "sell",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": "29.05000000",
        "stop_price": null,
        "quantity": "5.00000000",
        "reject_reason": null,
        "created_at": "2020-03-17T04:03:51.340854Z",
        "updated_at": "2020-03-17T13:32:11.719444Z",
        "last_transaction_at": "2020-03-17T13:30:02.165000Z",
        "executions": [
            {
                "price": "29.36000000",
                "quantity": "5.00000000",
                "settlement_date": "2020-03-19",
                "timestamp": "2020-03-17T13:30:02.165000Z",
                "id": "6da22a3a-b117-4b3a-8e38-b418049f5b59"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": null,
        "drip_dividend_id": null,
        "total_notional": {
            "amount": "145.25",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "executed_notional": {
            "amount": "146.80",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null
    },

];

export const multipleBuyOrders = [
    ...singleBuyOrder, 
    // buy 3 FANG @  32.91
    {
        "id": "2d5e4d72-df78-4335-a3cb-a4a1fac00787",
        "ref_id": "B3207B6A-46F0-41F3-84F5-DCD359074F38",
        "url": "https://api.robinhood.com/orders/2d5e4d72-df78-4335-a3cb-a4a1fac00787/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/00815789-becf-4d44-8733-032d602a33d8/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/00815789-becf-4d44-8733-032d602a33d8/",
        "cumulative_quantity": "3.00000000",
        "average_price": "32.91330000",
        "fees": "0.00",
        "state": "filled",
        "type": "market",
        "side": "buy",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": "34.58000000",
        "stop_price": null,
        "quantity": "3.00000000",
        "reject_reason": null,
        "created_at": "2020-04-07T19:04:05.755685Z",
        "updated_at": "2020-04-07T19:04:06.330907Z",
        "last_transaction_at": "2020-04-07T19:04:05.849000Z",
        "executions": [
            {
                "price": "32.91490000",
                "quantity": "3.00000000",
                "settlement_date": "2020-04-09",
                "timestamp": "2020-04-07T19:04:05.849000Z",
                "id": "23586925-a125-411c-bad9-48725d6e9f34"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": null,
        "drip_dividend_id": null,
        "total_notional": {
            "amount": "103.74",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "executed_notional": {
            "amount": "98.74",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null
    },

    // buy 1 NEE @ $237.00
    {
        "id": "7ea76211-3cfc-472c-8d66-824ae91f8040",
        "ref_id": "2AB22D12-5489-4A82-9ACA-4169E8BE9730",
        "url": "https://api.robinhood.com/orders/7ea76211-3cfc-472c-8d66-824ae91f8040/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
        "cumulative_quantity": "1.00000000",
        "average_price": "237.00000000",
        "fees": "0.00",
        "state": "filled",
        "type": "limit",
        "side": "buy",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": "237.00000000",
        "stop_price": null,
        "quantity": "1.00000000",
        "reject_reason": null,
        "created_at": "2020-04-24T16:29:07.739507Z",
        "updated_at": "2020-04-24T16:34:49.442914Z",
        "last_transaction_at": "2020-04-24T16:34:49.020000Z",
        "executions": [
            {
                "price": "237.00000000",
                "quantity": "1.00000000",
                "settlement_date": "2020-04-28",
                "timestamp": "2020-04-24T16:34:49.020000Z",
                "id": "c6596c5b-4d2a-4ed0-b05b-7231a343c98f"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": null,
        "drip_dividend_id": null,
        "total_notional": {
            "amount": "237.00",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "executed_notional": {
            "amount": "237.00",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null
    },
     
    // buy 1 NEE @ $203.29
    {
        "id": "2cd09ca9-6c48-413f-97e0-a80359e1c459",
        "ref_id": "29C44E6E-1F12-4654-99CF-AE1F602519D6",
        "url": "https://api.robinhood.com/orders/2cd09ca9-6c48-413f-97e0-a80359e1c459/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
        "cumulative_quantity": "1.00000000",
        "average_price": "203.29000000",
        "fees": "0.00",
        "state": "filled",
        "type": "market",
        "side": "buy",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": "213.40000000",
        "stop_price": null,
        "quantity": "1.00000000",
        "reject_reason": null,
        "created_at": "2020-03-16T19:34:14.027358Z",
        "updated_at": "2020-03-16T19:34:14.607578Z",
        "last_transaction_at": "2020-03-16T19:34:14.146000Z",
        "executions": [
            {
                "price": "203.28730000",
                "quantity": "1.00000000",
                "settlement_date": "2020-03-18",
                "timestamp": "2020-03-16T19:34:14.146000Z",
                "id": "8ffc4ac1-8538-40db-bbfe-ba9ebd49f247"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": null,
        "drip_dividend_id": null,
        "total_notional": {
            "amount": "213.40",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "executed_notional": {
            "amount": "203.29",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null
    },

    // buy 0.00106700 AMZN @ $1780.6935
    {
        "id": "0645d156-ba33-48cd-a85b-4552be708f6a",
        "ref_id": "89A76B18-42EB-4034-B2BF-18A4C0F864F8",
        "url": "https://api.robinhood.com/orders/0645d156-ba33-48cd-a85b-4552be708f6a/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/",
        "cumulative_quantity": "0.00106700",
        "average_price": "1780.69350000",
        "fees": "0.00",
        "state": "filled",
        "type": "market",
        "side": "buy",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": "1872.66000000",
        "stop_price": null,
        "quantity": "0.00106700",
        "reject_reason": null,
        "created_at": "2019-12-18T21:57:18.381285Z",
        "updated_at": "2019-12-19T14:30:52.837825Z",
        "last_transaction_at": "2019-12-19T14:30:08.861445Z",
        "executions": [
            {
                "price": "1780.01000000",
                "quantity": "0.00106700",
                "settlement_date": "2019-12-23",
                "timestamp": "2019-12-19T14:30:08.861445Z",
                "id": "c0a59454-9ad8-448c-8e2e-ab04c4178a06"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": {
            "amount": "2.00000000",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "drip_dividend_id": null,
        "total_notional": {
            "amount": "2.00",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "executed_notional": {
            "amount": "1.90",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null
    },


]

export const multipleSellOrders = [
    ...singleSellOrder, 
    // 2 NEE @ $236.96
    {
        "id": "92041639-071d-4784-8e51-0e2c8ba2bd2f",
        "ref_id": "FC3FF229-6F62-40E7-AB2A-0F733855E39E",
        "url": "https://api.robinhood.com/orders/92041639-071d-4784-8e51-0e2c8ba2bd2f/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/",
        "cumulative_quantity": "2.00000000",
        "average_price": "236.96000000",
        "fees": "0.00",
        "state": "filled",
        "type": "market",
        "side": "sell",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": null,
        "stop_price": null,
        "quantity": "2.00000000",
        "reject_reason": null,
        "created_at": "2020-05-26T14:56:40.081581Z",
        "updated_at": "2020-05-26T14:56:40.795808Z",
        "last_transaction_at": "2020-05-26T14:56:40.373000Z",
        "executions": [
            {
                "price": "236.95940000",
                "quantity": "2.00000000",
                "settlement_date": "2020-05-28",
                "timestamp": "2020-05-26T14:56:40.371000Z",
                "id": "e3bf5673-2939-4434-9bd0-608b6f12f8d6"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": null,
        "drip_dividend_id": null,
        "total_notional": null,
        "executed_notional": {
            "amount": "473.92",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null
    }, 

    // 2 FANG @ $44.01
    {
        "id": "1276000a-ffc9-43d4-8813-17db50b2f558",
        "ref_id": "9A922E4B-BC4B-4C18-A6DE-4EF38B2208E4",
        "url": "https://api.robinhood.com/orders/1276000a-ffc9-43d4-8813-17db50b2f558/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "position": "https://api.robinhood.com/positions/925501777/00815789-becf-4d44-8733-032d602a33d8/",
        "cancel": null,
        "instrument": "https://api.robinhood.com/instruments/00815789-becf-4d44-8733-032d602a33d8/",
        "cumulative_quantity": "2.00000000",
        "average_price": "44.00500000",
        "fees": "0.00",
        "state": "filled",
        "type": "market",
        "side": "sell",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "price": null,
        "stop_price": null,
        "quantity": "2.00000000",
        "reject_reason": null,
        "created_at": "2020-04-29T19:55:03.861321Z",
        "updated_at": "2020-04-29T19:55:04.419559Z",
        "last_transaction_at": "2020-04-29T19:55:03.955000Z",
        "executions": [
            {
                "price": "44.00600000",
                "quantity": "2.00000000",
                "settlement_date": "2020-05-01",
                "timestamp": "2020-04-29T19:55:03.946000Z",
                "id": "be5b4d48-6baa-4d55-996e-4d12c198ac3b"
            }
        ],
        "extended_hours": false,
        "override_dtbp_checks": false,
        "override_day_trade_checks": false,
        "response_category": null,
        "stop_triggered_at": null,
        "last_trail_price": null,
        "last_trail_price_updated_at": null,
        "dollar_based_amount": null,
        "drip_dividend_id": null,
        "total_notional": null,
        "executed_notional": {
            "amount": "88.01",
            "currency_code": "USD",
            "currency_id": "1072fc76-1862-41ab-82c2-485837590762"
        },
        "investment_schedule_id": null
    },
];


// 1 AMAT dividend
export const singleDividend = [
    {
        "id": "806640f4-60b0-5e78-a5ed-16bfcffe19d3",
        "url": "https://api.robinhood.com/dividends/806640f4-60b0-5e78-a5ed-16bfcffe19d3/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "instrument": "https://api.robinhood.com/instruments/18006bfb-cbad-4326-8348-738c94ea47fa/",
        "amount": "2.20",
        "rate": "0.2200000000",
        "position": "10.00000000",
        "withholding": "0.00",
        "record_date": "2020-05-21",
        "payable_date": "2020-06-11",
        "paid_at": null,
        "state": "pending",
        "nra_withholding": "0",
        "drip_enabled": true
    },
]

export const multipleDividends = [
    ...singleDividend,
    {
        "id": "d64633db-4326-5857-896c-6a3a64a94dd2",
        "url": "https://api.robinhood.com/dividends/d64633db-4326-5857-896c-6a3a64a94dd2/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "instrument": "https://api.robinhood.com/instruments/50810c35-d215-4866-9758-0ada4ac79ffa/",
        "amount": "2.55",
        "rate": "0.5100000000",
        "position": "5.00000000",
        "withholding": "0.00",
        "record_date": "2020-05-21",
        "payable_date": "2020-06-11",
        "paid_at": null,
        "state": "pending",
        "nra_withholding": "0",
        "drip_enabled": true
    },
    {
        "id": "be1b32ef-cb48-5518-9e02-06cf7515125b",
        "url": "https://api.robinhood.com/dividends/be1b32ef-cb48-5518-9e02-06cf7515125b/",
        "account": "https://api.robinhood.com/accounts/925501777/",
        "instrument": "https://api.robinhood.com/instruments/124133a3-cf48-45f4-a014-934529fdfd7b/",
        "amount": "1.80",
        "rate": "0.9000000000",
        "position": "2.00000000",
        "withholding": "0.00",
        "record_date": "2020-05-18",
        "payable_date": "2020-06-01",
        "paid_at": null,
        "state": "pending",
        "nra_withholding": "0",
        "drip_enabled": true
    },
]

// 3 identical AMAT dividends 
export const duplicateDividends = [
    ...singleDividend,
    ...singleDividend,
    ...singleDividend
];

export const manyDividends = [
    ...duplicateDividends,
    ...multipleDividends
];