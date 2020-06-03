import * as api from '../api/api';

class Auth{
    constructor(){
        this.authenticated = false;
        this.username = '';
        this.password = '';
        this.bearer_token = '';
        this.refresh_token = '';
        this.expiry_time = '';
    }


    setCredentials(username, password){
        this.username = username;
        this.password = password;
    }

    resetCredentials(){
        this.username = '';
        this.password = '';
    }

    setChallengeID(challengeID){
        this.challengeID = challengeID;
    }

    async initialLogin(){
        let data;
        try {
            data = await api.oauth2(this.username, this.password);
            console.log(data);
            if(api.isMFA(await data)){
                return {
                    'isMFA': true,
                    'isChallenge': false,
                };
            }
            else if (api.isChallenge(await data)){
                return {
                    'isMFA': false,
                    'isChallenge': true,
                };
            }
            return {
                'isMFA': false,
                'isChallenge': false,
            }; 
        }
        catch(err) {
            alert('Invalid Credentials');
            return {
                'isMFA': false,
                'isChallenge': false,
        };
        }
    }

    async loginMFA(mfa_code){
        try {
            let data = await api.oauth2_MFA(this.username, this.password, mfa_code);
            let [bearer_token, refresh_token, expiry_time] = data;

            this.login(bearer_token, refresh_token, expiry_time);
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    async loginChallenge(challenge_id){
        try {
            let data = await api.oauth2Challenge(this.username, this.password, challenge_id);
            let [bearer_token, refresh_token, expiry_time] = data;

            this.login(bearer_token, refresh_token, expiry_time);
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        } 
    }

    login(bearer_token, refresh_token, expiry_time) {
        this.resetCredentials();
        this.authenticated = true;
        
        this.bearer_token = bearer_token;
        this.refresh_token = refresh_token;
        this.expiry_time = expiry_time;
    }

    logout(cb){
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();