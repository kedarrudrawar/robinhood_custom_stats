import * as urls from './endpoints';
import axios from 'axios';

const CLIENT_ID = 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS';
const { v4: uuidv4 } = require('uuid');

export let HEADERS = {
    'Cache-Control': 'no-cache',
    'Accept': '*/*',
    'Accept-Language': 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
}

export const BODY = {
    'password': '', 
    'username': '',
    'grant_type': 'password',
    'client_id': CLIENT_ID,
    'expires_in': '734000',
    'scope': 'internal',
    'device_token': uuidv4(),
    'challenge_type': 'email',
}

export function oauth2(username, password){
    let data = {
        headers: HEADERS,
    }
    Object.assign(data, BODY);
    data['username'] = username;
    data['password'] = password;

    return axios.post(urls.OAUTH2, data)
        .then((response) => {
            let res = response.data;
            return res;
        })
        .catch((err) => {
            console.log("got an error yall");
            console.log(err);
        });
}

export function isMFA(responseData){
    return 'mfa_required' in responseData;
}

export function isChallenge(responseData){
    return 'challenge' in responseData;
}

export function getMFA(){
    
}

export function getChallenge(){

}

export function oauth2_MFA(username, password, mfa_code){
    let BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME;
    let data = {
        headers: HEADERS,
    }
    Object.assign(data, BODY);
    data['username'] = username;
    data['password'] = password;
    data['mfa_code'] = mfa_code;

    return axios.post(urls.OAUTH2, data)
        .then((response) => {
            let res = response.data;
            BEARER_TOKEN = res['access_token'];
            REFRESH_TOKEN = res['refresh_token'];
            EXPIRY_TIME = new Date().getTime() / 1000 + res['expires_in'];
            return [BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME];
        })
        .catch((err) => {
            console.log("got an error yall");
            console.log(err);
        });
}


/*************************************************/
// DATA
/*************************************************/

function processRHObject(object){
    return object.data;
}

function buildHeaders(header){
    let headers = {...HEADERS, ...header};
    return {
        headers: headers,
    };
}

// accounts

export async function getAccountDetails(header){
    let payload = buildHeaders(header);

    return axios.get(urls.ACCOUNTS, payload)
    .then(res => processRHObject(res))
    .then(data => data.results)
}

// portfolio

export function getPortfolio(header){
    let payload = buildHeaders(header);
    return axios.get(urls.PORTFOLIOS, payload)
    .then(res => {
        let data = processRHObject(res);
        return data;
    });
}

/**
 * 
 * @param {object - contains bearer authorization token} header 
 * @param {boolean - true for only active positions, false for all} active 
 */
export function getPositions(header, active=false){
    let data = buildHeaders(header);
    let url = active ? urls.POSITIONS_NON_ZERO : urls.POSITIONS;
    return axios.get(url, data)
    .then(res => processRHObject(res).results);
    
}

// dividends
export const getDividends = async (auth_header, states) => {
    let payload = buildHeaders(auth_header);
    let url = urls.DIVIDENDS;
    let nextDivsLink = await checkForNext(url, payload);
    
    let dividends = [];
    while(nextDivsLink !== null){
        dividends = dividends.concat(await axios.get(url, payload)
        .then(response => processRHObject(response).results)
        .then(data => {
            return data.filter((dividendObj) => states.includes(dividendObj['state']));
        }));

        url = nextDivsLink;
        nextDivsLink = await checkForNext(url, payload);
    }

    dividends = dividends.concat(await axios.get(url, payload)
    .then(res => processRHObject(res).results )
    .then(data => {
        return data.filter((dividendObj) => states.includes(dividendObj['state']));
    }));


    return dividends;
    
}





// instruments

export const getInstrumentsFromOrders = async (header, orders) => {
    let payload = buildHeaders(header);
    let instrumentURLs = new Set(); // remove duplicate urls
    for(const o of orders){
        instrumentURLs.add(o['instrument']);
    }

    let orderPromises = [...instrumentURLs].map((instrumentURL) => {
        return new Promise(async (resolve, reject) => {
            try{
                let res = await axios.get(instrumentURL, payload);
                let data = processRHObject(await res);
                resolve(await data);
            }
            catch(err) {
                console.log(err);
                reject(err);
            }
        })
    });
    return Promise.all(orderPromises);
}


/**
 * Returns Array of arrays: [symbol, price]
 * @param {Object with Authorization header} header 
 * @param {DataFrame containing instrument URL column} df 
 */
export async function getCurrentPricesFromInstrumentsDF(header, df){
    let payload = buildHeaders(header);

    let pricePromises = df.get('instrument').map(instrumentURL => { 
        return new Promise(async (resolve, reject) => {
            let res = await axios.get(instrumentURL, payload);
            let data = processRHObject(res);
            let symbol = await data['symbol'];
            let tradeable = await data['tradeable']

            if(! tradeable) 
                reject(new Error('untradeable stock: ' + symbol));
            else {
                let quoteURL = urls.build_quote_url(symbol);
                try{
                    let res = await axios.get(quoteURL, payload);
                    data = processRHObject(res);
                    let price = data['last_trade_price'];
                    let out = [symbol, price];
                    resolve(out);
                }
                catch(err){
                    reject(err);
                }
            }
        
        });
    });

    const results = await Promise.all(pricePromises.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));  
    return validResults; 
}

export async function getFieldFromInstrumentsDF(df, field){
    return Promise.all(df.get('instrument').map(
        async (url) => {
            let data, res;
            return new Promise(async (resolve, reject) => {
                try {
                    res = await axios.get(url)
                    data = await res.data;
                    return resolve(data[field]);
                }
                catch(err) {
                    console.log(err);
                    return reject(err);
                }
            });
        })
    );
}



export const getCurrentPricesFromInstruments = async (header, instruments) => {
    let payload = buildHeaders(header);

    let pricePromises = instruments.map(instrument => {
        return new Promise(async (resolve, reject) => {
            if(! instrument['tradeable']) 
                reject(new Error('untradeable stock: ' + instrument['symbol']));
            else {
                let url = urls.build_quote_url(instrument['symbol']);
                try{
                    let res = await axios.get(url, payload);
                    let data = processRHObject(res);
                    let symbol = data['symbol'];
                    let price = data['last_trade_price'];

                    let out = [symbol, price];
                    resolve(out);
                }
                catch(err){
                    reject(err);
                }
            }
        
        });
    });

    const results = await Promise.all(pricePromises.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));  

    return validResults;
}

// orders

const checkForNext = async (url, payload) => {
    return axios.get(url, payload)
    .then(res => {
        return processRHObject(res);
    })
    .then(processedRes => {
        return processedRes.next;
    })
}

/**
 * Returns Array of order Objects
 * @param {Object} header 
 * @param {Array of states ('filled', 'cancelled')} state 
 * @param {String ('buy', 'sell')} side 
 */
export const getOrderHistory = async (header, state=['filled'], side='') => {
    let payload = buildHeaders(header);

    let url = urls.ORDERS
    let nextOrdersLink = await checkForNext(url, payload);
    let nextExists = nextOrdersLink !== null;
    let orders = [];

    const filter = (resData) => {
        if(state.length !== 0){
            resData = resData.filter(order => state.includes(order['state']));
        }
        if(side !== ''){
            resData = resData.filter(order => order['side'] === side);
        }
        return resData;
    }

    while(nextExists){
        nextExists = nextOrdersLink !== null;
        orders = orders.concat(await axios.get(url, payload)
        .then(res => {
            return processRHObject(res).results;
        })
        .then(resData => {
            return filter(resData);
        }));
        if(nextExists){
            url = await nextOrdersLink;
            nextOrdersLink = await checkForNext(url, payload);
        }
    }

    // orders are returned by API anti-chronologically
    orders.reverse();
    
    return orders;
}
