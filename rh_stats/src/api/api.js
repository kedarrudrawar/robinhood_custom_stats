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
    'password': process.env.REACT_APP_PASSWORD, 
    'username': process.env.REACT_APP_USERNAME,
    'grant_type': 'password',
    'client_id': CLIENT_ID,
    'expires_in': '734000',
    'scope': 'internal',
    'device_token': uuidv4(),
    'challenge_type': 'email',
}

export function oauth2(){
    let data = {
        headers: HEADERS,
    }
    Object.assign(data, BODY);


    return axios.post(urls.OAUTH2, data)
        .then((response) => {
            let res = response.data;
            console.log(res);
            if(isMFA(res)){
                let mfa_code = getMFA();
                return oauth2_MFA(mfa_code);
            }
            else if(isChallenge(res)){
                let challenge_id = getChallenge();
                return oauth2_Challenge(challenge_id);
            }
        })
        .catch((err) => {
            console.log("got an error yall");
            console.log(err);
        });
}

function isMFA(response){
    return 'mfa_required' in response;
}

function isChallenge(response){
    return 'challenge' in response;
}

function getMFA(){
    
}

function getChallenge(){

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

function oauth2_Challenge(){}