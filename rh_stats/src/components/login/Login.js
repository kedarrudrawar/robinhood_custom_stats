import React from 'react';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { useEffect } from 'react';
// import * as api from '../../api/api';


export const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) =>{
        setPassword(event.target.value);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(username, password)
            .then((isMFA) => {
                if(isMFA)
                    props.history.push('/MFA');
            });
            
            
        }} >
            <label>Username:
                <input id="username" type="text" value={username} onChange={changeUsername}></input><br/>
            </label><br/>
            <label>Password:
                <input id="password" type="password" value={password} onChange={changePassword}></input><br/>
            </label>
            <input type="submit"/>
        </form>
    );
}
