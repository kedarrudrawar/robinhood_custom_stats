import json 
import requests

import csv
import shelve

from pyrh import Robinhood

def ticker_to_current_price(ticker, rh):
    try:
        data = rh.get_quote(ticker)
        price = data['last_trade_price']
    except:
        price = 'Delisted'
    return price


def get_symbol_from_instrument_url(rb_client, url):
    instrument = fetch_json_by_url(rb_client, url)
    return instrument["symbol"]


def fetch_json_by_url(rb_client, url):
    return rb_client.session.get(url).json()


def order_item_info(order, rb_client):
    # side: .side,  price: .average_price, shares: .cumulative_quantity,
    # instrument: .instrument, date : .last_transaction_at
    symbol = get_symbol_from_instrument_url(rb_client, order["instrument"])
    return {
        "side": order["side"],
        "price": order["average_price"],
        "shares": order["cumulative_quantity"],
        "symbol": symbol,
        "date": order["last_transaction_at"],
        "state": order["state"],
    }


def get_all_history_orders(rb_client):
    orders = []
    past_orders = rb_client.order_history()
    orders.extend(past_orders["results"])
    while past_orders["next"]:
        print("{} order fetched".format(len(orders)))
        next_url = past_orders["next"]
        past_orders = fetch_json_by_url(rb_client, next_url)
        orders.extend(past_orders["results"])
    print("{} order fetched".format(len(orders)))
    return orders
