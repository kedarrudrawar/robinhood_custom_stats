import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as api from './api/api';
import Time from 'react-time';

import {BrowserRouter as Router,
        Switch,
        Route,
        Link
} from 'react-router-dom';

import App from './App';




ReactDOM.render(
  <App />,
  document.getElementById('root')
);

