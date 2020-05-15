from login import login

import pandas as pd
import json
import api
import sys


rh = login()

def positions_to_df(limit=sys.maxsize):
    positions = rh.positions()['results']
    df = pd.DataFrame.from_records(positions[:limit])
    df['instrument'] = df['instrument'].apply(lambda url: api.get_symbol_from_instrument_url(rh, url))
    df['current_price'] = df['instrument'].apply(lambda ticker: api.ticker_to_current_price(ticker, rh))
    df = df.drop(['url',
             'account', 
             'account_number', 
             'intraday_average_buy_price', 
             'intraday_quantity', 
             'shares_held_for_buys', 
             'shares_held_for_sells', 
             'shares_held_for_stock_grants',
             'shares_held_for_options_collateral',
             'shares_held_for_options_events',
             'shares_pending_from_options_events',
             'pending_average_buy_price'
            ], axis = 1)
    
    
    return df

