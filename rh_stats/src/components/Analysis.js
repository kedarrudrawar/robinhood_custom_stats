import { Series, DataFrame } from 'pandas-js';
import axios from 'axios';


 async function ordersToDF(df)  {
    if(df.columns.size === 0){
        return df;
    }

    df = df.get(['average_price', 'quantity', 'side', 'instrument'])

    let tickerSeries = Promise.all(df.get('instrument').map(
        async (url) => {
            let data, res;
            return new Promise(async (resolve, reject) => {
                try {
                    res = await axios.get(url)
                    data = await res.data;
                    return resolve(data['symbol']);
                }
                catch(err) {
                    console.log(err);
                    return reject(err);
                }
            });
        })
    )
    .then((tickers) => { 
        return new Series(tickers, 'tickers');
    })
    
    df = df.set('symbol', await tickerSeries);

    return df;

}

/**
 * This method calculates realized profit using 
 * weighted average gains/losses of buy and sell orders
 * @param {*} buyOrders 
 * @param {*} sellOrders 
 */
export async function getRealizedProfit(buyOrders, sellOrders){
    console.log('realized profit');
    
    let buyDF = new DataFrame(buyOrders);
    let sellDF = new DataFrame(sellOrders);
    buyDF = await ordersToDF(buyDF);
    sellDF = await ordersToDF(sellDF);

    // console.log(buyDF.toString());
    // console.log(sellDF.toString());
    if (buyDF.columns.size === 0 || sellDF.columns.size === 0 ){
        return null;
    }

    let weighted_avg = {};
    let quantity_dict = {};

    for(const row of await sellDF){
        let tick  = row.get('symbol');
        let quantity = parseFloat(row.get('quantity'));
        let price = parseFloat(row.get('average_price')); 
        // console.log(`Selling ${quantity} ${tick} @ ${price}`);
        if (!(tick in weighted_avg)) {
            weighted_avg[tick] = 0;
            quantity_dict[tick] = 0;
        }
        
        weighted_avg[tick] += price * quantity;
        quantity_dict[tick] += quantity;

        // console.log(`updated: ${weighted_avg[tick]}`);
    }

    for(const row of await buyDF){
        let tick  = row.get('symbol');
        let quantity = parseFloat(row.get('quantity'));
        let price = parseFloat(row.get('average_price')); 
        // console.log(`Buying ${quantity} ${tick} @ ${price}`);

        if(!(tick in weighted_avg) || quantity_dict[tick] === 0)  
            continue; // sell orders have been depleted, remaining buys are for current position
        
        quantity = Math.min(quantity, quantity_dict[tick]);
        quantity_dict[tick] -= quantity;
        weighted_avg[tick] -= price * quantity;
    }

    return weighted_avg;
}