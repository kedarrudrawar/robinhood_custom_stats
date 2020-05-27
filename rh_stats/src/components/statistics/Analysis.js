import { Series, DataFrame } from 'pandas-js';
import * as api from './api/api';


export async function positionsToDF(positions){
    if(!positions || Array.from(positions).length === 0){
        return new DataFrame();
    }


    let df = new DataFrame(positions);
    let tickerResponse = await api.getFieldFromInstrumentsDF(df, 'symbol');
    let tickerSeries = new Series(tickerResponse, 'tickers');

    let tradeableResponse = await api.getFieldFromInstrumentsDF(df, 'tradability');
    let tradabilitySeries = new Series(tradeableResponse, 'tradability');
    df = df.set('symbol', await tickerSeries);
    df = df.set('tradability', await tradabilitySeries);
   
    return df;
}

async function filterOrdersDF(df, categories)  {
    if(df.columns.size === 0){
        return df;
    }

    df = df.get(categories);
    let tickerResponse = await api.getFieldFromInstrumentsDF(df, 'symbol');
    let tickerSeries = new Series(tickerResponse, 'tickers');
    df = df.set('symbol', tickerSeries);

    return df;
}


// ----------------------------------------- profit calculations -----------------------------------------

/**
 * This method calculates realized profit using 
 * weighted average gains/losses of buy and sell orders
 * @param {*} buyOrders 
 * @param {*} sellOrders 
 */
export async function getRealizedProfit(buyOrders, sellOrders){
    let buyDF = new DataFrame(buyOrders);
    let sellDF = new DataFrame(sellOrders);

    let categories = ['average_price', 'quantity', 'side', 'instrument'];

    buyDF = await filterOrdersDF(buyDF, categories);
    sellDF = await filterOrdersDF(sellDF, categories);

    if (buyDF.columns.size === 0 || sellDF.columns.size === 0 ){
        return null;
    }

    let weighted_avg = {};
    let quantity_dict = {};
    let instruments = {};

    // calculate avg sell prices
    for(const row of await sellDF){
        let tick  = row.get('symbol');
        let quantity = parseFloat(row.get('quantity'));
        let price = parseFloat(row.get('average_price')); 
        let instrument = row.get('instrument');
        if (!(tick in weighted_avg)) {
            weighted_avg[tick] = 0;
            quantity_dict[tick] = 0;
            instruments[tick] = instrument;
        }
        
        weighted_avg[tick] += price * quantity;
        quantity_dict[tick] += quantity;

    }

    // subtract weighted avg buy price from sell price
    for(const row of await buyDF){
        let tick  = row.get('symbol');
        let quantity = parseFloat(row.get('quantity'));
        let price = parseFloat(row.get('average_price')); 
        let instrument = row.get('instrument');

        if(!(tick in weighted_avg) || quantity_dict[tick] === 0)  
            continue; // sell orders have been depleted, remaining buys are for current position
        
        quantity = Math.min(quantity, quantity_dict[tick]);
        quantity_dict[tick] -= quantity;
        weighted_avg[tick] -= price * quantity;
        instruments[tick] = instrument;
    }

    let weightedObjArr = Object.keys(weighted_avg).map(key => {
        return [key, weighted_avg[key], instruments[key]];
    })


    return weightedObjArr;
}



/**
 * Returns array of [symbol, unrealized profit]
 * @param {DataFrame containing symbol, quantity, average buy price, and current price} df 
 */
export async function getUnrealizedProfit(df){
    let profit = [];
    for(const row of df){
        let symbol = row.get('symbol');
        let quantity = row.get('quantity');
        let average_price = row.get('average_buy_price');
        let current_price = row.get('price');
        let currProfit = (current_price - average_price) * quantity;
        profit.push([symbol, currProfit]);
    }
    // console.log(profit);
    return profit;
}

export function dividendsToDF(dividendsRes){
    let arr = Array.from(dividendsRes).map(div => {
        return [div['instrument'], div['amount'], div['rate']];
    })
    let df = new DataFrame(arr);
    df.columns = ['instrument', 'dividend', 'dividend rate'];

    return df;
}