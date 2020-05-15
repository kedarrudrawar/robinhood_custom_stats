from login import login

import requests
import pandas as pd
import json
import api
import rh_positions as positions
import sys


def get_filled_orders(limit=sys.maxsize):
    orders = api.get_all_history_orders(rh)[:limit]
    orders = [api.order_item_info(order, rh) for order in orders]
    df = pd.DataFrame.from_records(orders)
    filled_orders = df.loc[df['state'] == 'filled']
    filled_orders = filled_orders.sort_values('date')
    return filled_orders

def get_total_spent(filled_orders):
    total_spent = {}
    for _, row in filled_orders.iterrows():
        tick, side = row[['symbol', 'side']] 
        quantity, price = int(float(row['shares'])), float(row['price'])
        total_spent.setdefault(tick, 0)
        if side == 'buy':
            total_spent[tick] += price * quantity

    return pd.DataFrame.from_records([total_spent], index=['Total Spent']).transpose()

def get_realized_profits(filled_orders):
    positions = {}
    profits = {}
    for _, row in filled_orders.iterrows():
        tick, side = row[['symbol', 'side']]
        
        quantity, price = int(float(row['shares'])), float(row['price'])
        profits.setdefault(tick, 0)
        positions.setdefault(tick, [])

        if side == 'buy':
            positions[tick] += [price] * quantity
        else:
            spent = 0
            for _ in range(quantity):
                if positions[tick]:
                    spent += positions[tick].pop()
                else: break
            profits[tick] += price * quantity - spent

    return profits

def get_unrealized_profits(positions_df):
    profits = {}
    
    for _, row in positions_df.iterrows():
        quantity = int(float(row['quantity']))
        if quantity > 0:
            tick = row['instrument']
            price = float(row['current_price'])
            buy_price = float(row['average_buy_price'])
            # print(f'ticker: {tick} price: {price} buy price: {buy_price}')
            profits.setdefault(tick, 0)
            profits[tick] = (price - buy_price) * quantity 
    return profits

def get_holdings(positions):
    holdings = {}
    equity = {}

    for ticker in positions:
        holdings[ticker] = len(positions[ticker])
        equity[ticker] = sum(positions[ticker])
    
    return holdings, equity

def get_stats(filled_orders, positions_df):
    real = get_realized_profits(filled_orders)
    unreal = get_unrealized_profits(positions_df)

    return real, unreal

# TODO: Add total ROI on profits

def get_all_stats():
    print('Pulling order history and positions')
    orders = get_filled_orders()
    positions_df = positions.positions_to_df()

    stats = get_stats(orders, positions_df)

    print('Constructing table')
    profits = pd.DataFrame.from_records(stats, index=['Realized Profit', 'Unrealized Profit']).transpose().fillna(0)
    profits.index.name = 'instrument'
    profits = positions_df[['instrument', 'quantity', 'average_buy_price']].merge(profits, left_on='instrument', right_index=True)
    profits['average_buy_price'] = profits['average_buy_price'].astype(float) * profits['quantity'].astype(float)
    profits = profits.rename(columns={'average_buy_price' : 'Equity'})
    profits['Total Profit'] = profits['Realized Profit'] + profits['Unrealized Profit']
    
    # get total spent
    profits = profits.merge(get_total_spent(orders), left_on='instrument', right_index=True)
    
    # rearrange
    columns = ['instrument', 'quantity', 'Equity', 'Total Spent', 'Realized Profit',
       'Unrealized Profit', 'Total Profit']

    profits = profits[columns]
    return profits



if __name__ == '__main__':
    rh = login()

    print(get_all_stats())

