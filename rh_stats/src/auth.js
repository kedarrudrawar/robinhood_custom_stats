import * as api from './api/api';

class Auth{
    constructor(){
        this.authenticated = false;
        this.username = '';
        this.password = '';
    }


    setCredentials(username, password){
        this.username = username;
        this.password = password;
    }

    resetCredentials(){
        this.username = '';
        this.password = '';
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
            alert('invalid credentials');
            return {
                'isMFA': false,
                'isChallenge': false,
        };
        }
    }

    login(cb) {
        this.authenticated = true;
        cb();
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