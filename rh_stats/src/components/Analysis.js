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

export async function getRealizedProfit(filledOrdersObj){
    console.log('in real profit method');
    console.log(filledOrdersObj.length);
    filledOrdersObj.reverse(); // orders are returned by API anti-chronologically
    let df = new DataFrame(filledOrdersObj);
    if (df.columns.size === 0){
        return df;
    }
    
    let positions = {};
    let profits = {};
    return ordersToDF(df)
        .then((df) => {
            for(const row of df){
                let tick  = row.get('symbol');
                let side = row.get('side');
                
                let quantity = Math.round(parseFloat(row.get('quantity')));
                let price = parseFloat(row.get('average_price')).toFixed(2);

                console.log(`${side} ${quantity} ${tick} @ ${price}`);

                if(! (tick in profits)){
                    profits[tick] = 0;
                }
                positions[tick] = [];
                if(! (tick in positions)){
                    positions[tick] = [];
                }
                
                if (side == 'buy'){
                    for(let i = 0; i < quantity; i++){
                        positions[tick].push(price);
                    }
                    console.log(positions[tick]);
                }
                else{
                    let spent = 0
                    for (let i = 0; i < quantity; i++){
                        if (positions[tick]){
                            spent += positions[tick].pop();
                        }
                        else{
                            break;
                        }
                    }
                    profits[tick] += price * quantity - spent;
                }
            };
            console.log(profits)
            return profits
        })
        
    

    // console.log(df.toString());
}