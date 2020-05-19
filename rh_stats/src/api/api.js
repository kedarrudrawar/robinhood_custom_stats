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
    return object.data.results;
}


export function getPortfolio(header){
    let headers = {...HEADERS, ...header};
    let data = {
        headers: headers,
    };
    return axios.get(urls.PORTFOLIOS, data)
    .then(res => {
        let data = processRHObject(res)['0'];
        return data;
    });
}

export function getPositions(header, filtered=true){
    let headers = {...HEADERS, ...header};
    let data = {
        headers: headers,
    }; 

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


export const getOrderHistory = async (header, filled=true) => {
    let headers = {...HEADERS, ...header};
    let payload = {
        headers: headers,
    };  

    return axios.get(urls.ORDERS, payload)
    .then(res => {
        return processRHObject(res);
    })
    .then(resData => {
        if(filled){
            resData = resData.filter(order => order['state'] !== 'cancelled');
        }
        const urls = resData.map(element => element['url']);

        let orderPromises = urls.map(url => {
            return new Promise((resolve, reject) => {
                axios.get(url, payload)
                .then(order => {
                    return resolve(order);
                })
                .catch(err => {
                    console.log('err');
                    reject(err)
                });
            });
        });
        
        return Promise.all(orderPromises)
        .then((orders) => {
            return orders;
        })

    });



}