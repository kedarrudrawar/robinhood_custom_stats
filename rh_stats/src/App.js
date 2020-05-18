import React from "react";
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {Login} from './components/login/Login';
import { MFA_Login } from "./components/login/MFA_Login";
import * as api from './api/api';
import { Challenge_Login } from "./components/login/Challenge_Login";
import { Statistics } from "./components/Statistics";


const App = props => {
  // const [bearerToken, setBearerToken] = useState(process.env.REACT_APP_BEARER);  
  // const [refreshToken, setRefreshToken] = useState(process.env.REACT_APP_REFRESH);
  const [bearerToken, setBearerToken] = useState();  
  const [refreshToken, setRefreshToken] = useState();
  const [expiryTime, setExpiryTime] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const handleInitialSubmit = async (username, password) => {
    setUsername(username);
    setPassword(password);
    
    // return false;
    // TODO: Validate input
    return api.oauth2(username, password)
    .then(data => {
      console.log(data);
      if(api.isMFA(data)){
        return {
          'isMFA': true,
          'isChallenge': false,
        };
      }

      else if(api.isChallenge(data)){
        return {
          'isMFA': false,
          'isChallenge': true,
        };
      }

      return {
        'isMFA': false,
        'isChallenge': false,
      };

    })
    .catch(err => {
      alert('invalid credentials');
      return {
        'isMFA': false,
        'isChallenge': false,
      };
    });
  }

  
  const handleMFASubmit = (mfa_code) => {

    return api.oauth2_MFA(username, password, mfa_code)
    .then((data) => {
      let [bearer_token, refresh_token, expiry_time] = data;
      setBearerToken(bearer_token);
      setRefreshToken(refresh_token);
      setExpiryTime(expiry_time);
      setUsername('');
      setPassword('');
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  }

  const handleChallengeSubmit = (challenge_id) => {
    return false;
  }


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={['/','/login']} 
                exact 
                render = {(props) => <Login {...props} onSubmit={handleInitialSubmit}/>}
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
              <Challenge_Login {...props}
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