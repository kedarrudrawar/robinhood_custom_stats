import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {login, oauth2} from './api/api';

class Login extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    oauth2();
    return (
      <div>test</div>
    );

  }
}


ReactDOM.render(
  <Login />,
  document.getElementById('root')
);

