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

export const buyOrders = [
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

export const sellOrders = [
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
