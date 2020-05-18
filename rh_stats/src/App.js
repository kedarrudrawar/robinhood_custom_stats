import React from "react";
import {useState, useEffect} from 'react';
import {Login} from './components/login/Login';
import * as api from './api/api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = props => {
  const [bearerToken, setBearerToken] = useState('');  
  const [refreshToken, setRefreshToken] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInitialSubmit = (username, password) => {
    setUsername(username);
    setPassword(password);
    let isMFA, isChallenge;

    api.oauth2(username, password)
    .then(data => {
      console.log(data);
      isMFA = api.isMFA(data);
      isChallenge = api.isChallenge(data);
      console.log('MFA: ' + isMFA);
    });
  }

  
  const handleMFASubmit = (mfa_code) => {
    api.oauth2_MFA(username, password, mfa_code)
    .then((data) => {
      let [bearer_token, refresh_token, expiry_time] = data;
      setBearerToken(bearer_token);
      setRefreshToken(refresh_token);
      setExpiryTime(expiry_time);
    });
  }


  return (
    <Login 
      onSubmit = {handleInitialSubmit}
    />
    // <Router>
    //   <div className="App">
    //     <Switch>
    //       <Route path={['/', '/login']} exact component={Login}/>
    //       <Route path='/stats' component={Statistics}/>
    //     </Switch>
    //   </div>
    // </Router>

  );
}

export default App;