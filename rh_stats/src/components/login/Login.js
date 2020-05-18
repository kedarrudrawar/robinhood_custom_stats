import React from 'react';
import { useState } from 'react';


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
            .then((result) => {
                if(result.isMFA)
                    props.history.push('/MFA');
                else if(result.isChallenge)
                    props.history.push('/challenge')
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
