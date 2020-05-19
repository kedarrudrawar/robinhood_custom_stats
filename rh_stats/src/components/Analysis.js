import { Series, DataFrame } from 'pandas-js';


export function getRealizedProfit(filledOrdersObj){
    let df = new DataFrame(filledOrdersObj);
    let urls = df.get('url');
    
    // console.log(shortened.toString());
}