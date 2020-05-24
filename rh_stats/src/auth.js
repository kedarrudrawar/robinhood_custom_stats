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