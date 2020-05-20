import * as urls from './endpoints';

const axios = require('axios');


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

    console.log('making request');
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
    console.log('calling MFA request');

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
            console.log(res);
            BEARER_TOKEN = res['access_token'];
            REFRESH_TOKEN = res['refresh_token'];
            EXPIRY_TIME = new Date().getTime() / 1000 + res['expires_in'];
            console.log(BEARER_TOKEN);
            console.log(REFRESH_TOKEN);
            console.log(EXPIRY_TIME);
            return [BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME];
        })
        .catch((err) => {
            console.log("got an error yall");
            console.log(err);
        });
}

// function oauth2_Challenge(){}



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

export async function getAccountDetails(header){
    let payload = buildHeaders(header);

    return axios.get(urls.ACCOUNTS, payload)
    .then(res => processRHObject(res))
    .then(data => data.results)
}








export function getPortfolio(header){
    let data = buildHeaders(header);
    return axios.get(urls.PORTFOLIOS, data)
    .then(res => {
        let data = processRHObject(res)['0'];
        return data;
    });
}

export function getPositions(header, filtered=true){
    let data = buildHeaders(header);

    return axios.get(urls.POSITIONS, data)
    .then(res => {
        let data = processRHObject(res);
        return data;
    })
    .then(data => {
        if(filtered){
            let filteredArr = [];
            for(let i = 0; i < data.length; i++){
                console.log(data[i]['quantity']);
                if (parseFloat(data[i]['quantity']) > 0){
                    filteredArr.push(data[i]);
                }
            }
            return filteredArr;
        }
        return data;
    })
}


const checkForMoreOrders = async (url, payload) => {
    return axios.get(url, payload)
    .then(res => {
        return processRHObject(res);
    })
    .then(processedRes => {
        return processedRes.next;
    })
}

export const getOrderHistory = async (header, state=['filled'], side='', limit=Number.MAX_SAFE_INTEGER) => {
    let payload = buildHeaders(header);

    let url = urls.ORDERS
    let nextOrdersLink = await checkForMoreOrders(url, payload);
    let orders = [];
    while(await nextOrdersLink !== null){
        orders = orders.concat(await axios.get(url, payload)
        .then(res => {
            return processRHObject(res).results;
        })
        .then(resData => {
            if(state.length !== 0){
                resData = resData.filter(order => state.includes(order['state']));
            }
            if(side !== ''){
                resData = resData.filter(order => order['side'] === side);
            }
            return resData;
        }));

        url = await nextOrdersLink;
        nextOrdersLink = await checkForMoreOrders(url, payload);
    }

    orders = orders.concat(await axios.get(url, payload)
    .then(res => {
        return processRHObject(res).results;
    })
    .then(resData => {
        if(state.length !== 0){
            resData = resData.filter(order => state.includes(order['state']));
        }
        if(side !== ''){
            resData = resData.filter(order => order['side'] === side);
        }
        return resData;
    }));
    
    // orders are returned by API anti-chronologically
    orders.reverse();
    
    return orders;


    
}
