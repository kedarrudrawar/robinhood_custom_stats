import React from "react";
import {useState} from 'react';
import {Login} from './components/login/Login';
import * as api from './api/api';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MFA_Login } from "./components/login/MFA_Login";

const App = props => {
  const [bearerToken, setBearerToken] = useState('');  
  const [refreshToken, setRefreshToken] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleInitialSubmit = async (username, password) => {
    setUsername(username);
    setPassword(password);
    
    // return false;
    // TODO: Validate input
    return api.oauth2(username, password)
    .then(data => {
      console.log(data);
      return api.isMFA(data);
    })
    .catch(err => {
      alert('invalid credentials');
    });
  }

  
  const handleMFASubmit = (mfa_code) => {
    console.log("in mfa submit");
    
    return api.oauth2_MFA(username, password, mfa_code)
    .then((data) => {
      let [bearer_token, refresh_token, expiry_time] = data;
      setBearerToken(bearer_token);
      setRefreshToken(refresh_token);
      setExpiryTime(expiry_time);
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  }

  return (
    // <Login 
    //   onSubmit = {handleInitialSubmit}
    // />
    <Router>
      <div className="App">
        <Switch>
          <Route path={['/','/login']} 
                exact 
                render = {(props) => <Login {...props} onSubmit={handleInitialSubmit}/>}
                />
          <Route path='/MFA' 
                exact 
                render = {(props) => <MFA_Login {...props}
                                        onSubmit={handleMFASubmit}
                                        username={username}
                                        password={password}
                                    />}
                />
          {/* <Route path='/stats' component={Statistics}/> */}
        </Switch>
      </div>
    </Router>

  );
}

export default App;