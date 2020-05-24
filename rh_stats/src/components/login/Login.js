import React from 'react';
import { useState } from 'react';
import '../../UI/css/Login.css';
import { Head } from '../misc/html_head'

export const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(username, password) // store credentials in parent state
        .then((result) => {
            if(result.isMFA)
                props.history.push('/MFA'); // redirect to subsequent login page
            else if(result.isChallenge)
                props.history.push('/challenge')
        });
    };


    return (
        <div>
        <Head/>
        <div className='Page'>
            {/* <div className='graphic'>Graphic</div> */}
            <div className='login-container'>
                <div className='login'>
                    <div className='header'>
                        {/* <div className='small-title login-contents'>Login</div> */}
                        <div className='large-title login-contents '>Link your Robinhood Account</div>
                    </div>

                    <div className='login-body'>
                    <form onSubmit={handleSubmit} >
                        <label>Email<br/>
                            <input 
                                className='input-box input-text' 
                                id="username" 
                                type="text" 
                                value={username}
                                onChange={changeUsername}>
                            </input><br/>
                        </label><br/>
                        <label>Password<br/>
                            <input 
                                className='input-box input-text' 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={changePassword}>
                            </input><br/>
                        </label><br/>
                        <button type="submit" className='login-btn login-btn-text login-contents'> Login</button>
                    </form>
                    <div class='note login-contents '>We do not store your Robinhood credentials.</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );

}
