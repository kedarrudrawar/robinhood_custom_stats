import { Series, DataFrame } from 'pandas-js';
import axios from 'axios';


 async function ordersToDF(df)  {
    console.log(df.get(['average_price', 'quantity']).toString());

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
    console.log(await df.toString());

    return df;

}

export function getRealizedProfit(filledOrdersObj){
    console.log('in real profit method');
    let df = new DataFrame(filledOrdersObj);
    // console.log(df.columns.toString());
    if(df.columns.size > 0){
        df = ordersToDF(df);
    }

    // console.log(df.toString());
}