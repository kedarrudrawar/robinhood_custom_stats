import React, { Component } from "react";
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { Login } from './components/login/Login';
import MFA_Login from "./components/login/MFA_Login";
import * as api from './api/api';
import { ChallengeLogin } from "./components/login/ChallengeLogin";
import { Statistics } from "./components/statistics/Statistics";
import auth from './auth/auth';




const ProtectedRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={(props) => {
        return auth.isAuthenticated()
        ? <Component {...props}/>
        : <Redirect 
            to='/login'
        />
    }}/>
}


const App = props => {
    const handleInitialSubmit = async (username, password) => {
        auth.setCredentials(username, password);

        // TODO: Validate input
        return await auth.initialLogin();
    }


    const handleMFASubmit = async (mfa_code) => {
        let success = await auth.loginMFA(mfa_code);

        return success;

    };

    const handleChallengeSubmit = (challenge_id) => {
        return false;
    }


    return (
        // <Router>
        // <div className="App">
        <Switch>

            <Route path={['/', '/login']}
                exact
                render={(props) =>
                    <Login {...props}
                        onSubmit={handleInitialSubmit}
                    />}
            />

            <Route path='/MFA'
                exact
                render={(props) =>
                    <MFA_Login {...props}
                        onSubmit={handleMFASubmit}
                        username={auth.username}
                        password={auth.password}
                    />}
            />

            <Route path='/challenge'
                exact
                render={(props) =>
                    <ChallengeLogin {...props}
                        onSubmit={handleChallengeSubmit}
                    />}
            />

            <ProtectedRoute path='/stats'
                auth={auth}
                component={Statistics}
            />
        </Switch>
    );
    {/* </div> */ }
    // </Router>

}

export default App;