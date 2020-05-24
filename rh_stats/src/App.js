import React from "react";
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  ProtectedRoute
} from "react-router-dom";

import {Login} from './components/login/Login';
import { MFA_Login } from "./components/login/MFA_Login";
import * as api from './api/api';
import { ChallengeLogin } from "./components/login/ChallengeLogin";
import { Statistics } from "./components/statistics/Statistics";
import auth from './auth';

const App = props => {
  // const [bearerToken, setBearerToken] = useState(process.env.REACT_APP_BEARER);  
  const [bearerToken, setBearerToken] = useState();  
  // const [_refreshToken, setRefreshToken] = useState(process.env.REACT_APP_REFRESH);
  const [refreshToken, setRefreshToken] = useState();
  const [expiryTime, setExpiryTime] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const handleInitialSubmit = async (username, password) => {
    auth.setCredentials(username, password);
    
    // TODO: Validate input
    return await auth.initialLogin();
  }

  
  const handleMFASubmit = async (mfa_code) => {
    return await auth.loginMFA(mfa_code);

  };

  const handleChallengeSubmit = (challenge_id) => {
    return false;
  }


  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path={['/','/login']} 
            exact 
            render = {(props) => 
              <Login {...props} 
                onSubmit={handleInitialSubmit}
              />}
            />

          <Route path='/MFA' 
            exact 
            render = {(props) => 
              <MFA_Login {...props}
                onSubmit={handleMFASubmit}
                username={username}
                password={password}
              />}
            />

          <Route path='/challenge' 
            exact 
            render = {(props) => 
              <ChallengeLogin {...props}
                onSubmit={handleChallengeSubmit}
              />}
            />

          <Route path='/stats' 
            render = {props => 
              <Statistics {...props}
                bearer={bearerToken}
              />
            }
            
            />
        </Switch>
      </div>
    </Router>

  );
}

export default App;