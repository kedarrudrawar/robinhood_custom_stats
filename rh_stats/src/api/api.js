import * as urls from './endpoints';
import axios from 'axios';
import qs from 'qs';

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
    'expires_in': '86400',
    'scope': 'internal',
    'device_token': uuidv4(),
}

export async function oauth2(username, password, challenge_type=''){
    let data = {
        headers: HEADERS,
    }
    Object.assign(data, BODY);
    data['username'] = username;
    data['password'] = password;
    if(challenge_type)
        data['challenge_type'] = challenge_type;
    
    try {
        const response = await axios.post(urls.OAUTH2, data);
        return response.data;
    }
    catch (err) {
        return err.response.data;
    }
}





export function isMFA(responseData){
    return 'mfa_required' in responseData;
}

export function isChallenge(responseData){
    return 'accept_challenge_types' in responseData;
}

export function getMFA(){
    
}

export function getChallenge(){

}


// ----------------- MFA ------------------

export async function oauth2_MFA(username, password, mfa_code){
    let BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME;
    let payload = {
        headers: HEADERS,
    }
    Object.assign(payload, BODY);
    payload['username'] = username;
    payload['password'] = password;
    payload['mfa_code'] = mfa_code;

    try {
        const response = await axios.post(urls.OAUTH2, payload);
        let data = response.data;
        BEARER_TOKEN = data['access_token'];
        REFRESH_TOKEN = data['refresh_token'];
        EXPIRY_TIME = new Date().getTime() / 1000 + data['expires_in'];
        return [BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME];
    }
    catch (err) {
        console.log("got an error yall");
        console.log(err);
    }
}

// ----------------- Challenge ------------------

export async function oauth2Challenge(username, password, challenge_type, challenge_id){
    let headers = {
        headers: {...HEADERS,
            'x-robinhood-challenge-response-id': challenge_id,
        }
    };
    let payload = { ...BODY};
    payload['username'] = username;
    payload['password'] = password;
    payload['challenge_type'] = challenge_type;

    try {
        const response = await axios.post(urls.OAUTH2, qs.stringify(payload), headers);
        let data = response.data;
        let BEARER_TOKEN = data['access_token'];
        let REFRESH_TOKEN = data['refresh_token'];
        let EXPIRY_TIME = new Date().getTime() / 1000 + data['expires_in'];
        return [BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME];
    }
    catch (err) {
        console.log(err);
        alert('Invalid code. Please go back and try again.');
    }
}

export async function respondToChallenge(username, password, challenge_id, challengeCode){
    let payload = {
        headers: HEADERS,
    }
    let url = urls.build_challenge(challenge_id);
    Object.assign(payload, BODY);
    payload['username'] = username;
    payload['password'] = password;
    payload['response'] = challengeCode;
    try {
        const response = await axios.post(url, payload);
        let data = response.data;
        let status = data['status'];
        if(status === 'validated')
            return true;
        return false;
    }
    catch(err){
        console.log("Failed Challenge Request");
        console.log(err);
    }
}

export async function oauth2ChallengeTypeInput(username, password, challenge_type){
    let payload = {
        headers: HEADERS,
    }
    Object.assign(payload, BODY);
    payload['username'] = username;
    payload['password'] = password;
    payload['challenge_type'] = challenge_type;
    
    try{
        let response = await axios.post(urls.OAUTH2, payload);
        let data = response.data;
        return data.challenge.id;
    }
    catch(err){
        // alert('Error');
        let data = err.response.data;
        return data.challenge.id;
    }
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

    let res = await axios.get(urls.ACCOUNTS, payload);
    let data = processRHObject(res);
    return data.results;
}

// portfolio

export async function getPortfolio(header){
    let payload = buildHeaders(header);
    const res = await axios.get(urls.PORTFOLIOS, payload);
    let data = processRHObject(res);
    return data;
}

/**
 * 
 * @param {object - contains bearer authorization token} header 
 * @param {boolean - true for only active positions, false for all} active 
 */
export async function getPositionsEquity(header, active=false){
    let payload = buildHeaders(header);
    let url = active ? urls.equityPaths.POSITIONS_NON_ZERO : urls.equityPaths.POSITIONS;
    let nextPosLink = await checkForNext(url, payload);
    let nextExists = true; 
    let positions = [];
    let res, data;

    const filterOptions = (data) => {
        if(active){
            return data.filter(position => parseFloat(position['quantity']) > 0)
        }
        return data;
    }

    while(nextExists){
        nextExists = nextPosLink !== null;

        res = await axios.get(url, payload);
        data = processRHObject(res).results;
        data = filterOptions(data);
        positions = positions.concat(data);

        if(nextExists){
            url = nextPosLink;
            nextPosLink = await checkForNext(url, payload);
        }
    }

    return positions;
    
}

/**
 * 
 * @param {object - contains bearer authorization token} header 
 * @param {boolean - true for only active positions, false for all} active 
 */
export async function getPositionsOptions(header, active=false){
    let payload = buildHeaders(header);
    let url = active ? urls.optionPaths.POSITIONS_NON_ZERO : urls.optionPaths.POSITIONS;
    let nextPosLink = await checkForNext(url, payload);
    let nextExists = true; 
    let positions = [];
    let res, data;

    const filterOptions = (data) => {
        if(active){
            return data.filter(option => parseFloat(option['quantity']) >= 1)
        }
        return data;
    }

    while(nextExists){
        nextExists = nextPosLink !== null;

        res = await axios.get(url, payload);
        data = processRHObject(res).results;
        data = filterOptions(data);
        positions = positions.concat(data);

        if(nextExists){
            url = nextPosLink;
            nextPosLink = await checkForNext(url, payload);
        }
    }

    return positions;
    
}







// dividends
export const getDividends = async (auth_header, states) => {
    let payload = buildHeaders(auth_header);
    let url = urls.equityPaths.DIVIDENDS;
    let nextDivsLink = await checkForNext(url, payload);
    let nextExists = true; 
    
    let dividends = [];
    let res, data, filtered;
    while(nextExists){
        nextExists = nextDivsLink !== null;
        res = await axios.get(url, payload);
        data = processRHObject(res).results;
        filtered = data.filter((dividendObj) => states.includes(dividendObj['state']));
        dividends = dividends.concat(filtered)

        if(nextExists){
            url = nextDivsLink;
            nextDivsLink = await checkForNext(url, payload);
        }
    }

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



export async function getFieldFromInstrumentOption(header, instrument_url, field){
    let payload = buildHeaders(header);

    try {
        let response = await axios.get(instrument_url, payload);
        let data = processRHObject(response);
        return data[field];
    }
    catch(err){
        return err;
    }

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
    let res = await axios.get(url, payload);
    let data = processRHObject(res);
    let next = data.next;
    return next
}


/**
 * Returns Array of order Objects
 * @param {Object} header 
 * @param {Array of states ('filled', 'cancelled')} state 
 * @param {String ('debit', 'credit')} direction 
 *              (debit = buy, credit = sell)
 */
export const getOrderHistoryOptions = async (header, state=['filled'], direction='') => {
    let payload = buildHeaders(header);


    let url = urls.optionPaths.ORDERS;
    let nextOrdersLink = await checkForNext(url, payload);
    let nextExists = true; 
    let orders = [];
    let res, data, filtered;

    const filter = (resData) => {
        if(state.length !== 0)
            resData = resData.filter(order => state.includes(order['state']));
        if(direction !== '')
            resData = resData.filter(order => order['direction'] === direction);
        
        return resData;
    }

    while(nextExists){
        nextExists = nextOrdersLink !== null;

        res = await axios.get(url, payload);
        data = processRHObject(res).results;
        filtered = filter(data);
        orders = orders.concat(filtered);

        if(nextExists){
            url = nextOrdersLink;
            nextOrdersLink = await checkForNext(url, payload);
        }
    }
    
    // orders are returned by API anti-chronologically
    orders.reverse();
    
    return orders;
}





/**
 * Returns Array of order Objects
 * @param {Object} header 
 * @param {Array of states ('filled', 'cancelled')} state 
 * @param {String ('buy', 'sell')} side 
 */
export const getOrderHistoryEquity = async (header, state=['filled'], side='') => {
    let payload = buildHeaders(header);

    let url = urls.equityPaths.ORDERS
    let nextOrdersLink = await checkForNext(url, payload);
    let nextExists = true; 
    let orders = [];
    let res, data, filtered;

    const filter = (resData) => {
        if(state.length !== 0)
            resData = resData.filter(order => state.includes(order['state']));
        if(side !== '')
            resData = resData.filter(order => order['side'] === side);
        
        return resData;
    }

    while(nextExists){
        nextExists = nextOrdersLink !== null;

        res = await axios.get(url, payload);
        data = processRHObject(res).results;
        filtered = filter(data);
        orders = orders.concat(filtered);

        if(nextExists){
            url = nextOrdersLink;
            nextOrdersLink = await checkForNext(url, payload);
        }
    }
    
    // orders are returned by API anti-chronologically
    orders.reverse();
    
    return orders;
}
