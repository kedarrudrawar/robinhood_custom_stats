import * as urls from './endpoints';

const axios = require('axios');


const CLIENT_ID = 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS';
const { v4: uuidv4 } = require('uuid');

export const HEADERS = {
    'Authorization': '',
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
    // 'mfa_code': '967546',
}

export function oauth2(){
    let data = {
        headers: HEADERS,
    }
    Object.assign(data, BODY);


    axios.post(urls.OAUTH2, data)
        .then((response) => {
            let res = response.data;
            console.log(res);
            if(isMFA(res)){
                getMFA();
                oauth2_MFA();
            }
            else if(isChallenge(res)){
                getChallenge();
                oauth2_Challenge();
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

function oauth2_MFA(){

}

function oauth2_Challenge(){}