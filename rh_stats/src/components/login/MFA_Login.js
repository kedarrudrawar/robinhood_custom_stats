import React from 'react';
import { useState, useEffect } from 'react';

export const MFA_Login = props => {
    const [mfa_code, setMFAcode] = useState('');

    const changeMFA = (e) => {
        setMFAcode(e.target.value);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(mfa_code)
            .then((success) => {
                if(success)
                    props.history.replace('/stats');
                else{
                    alert('Invalid MFA code');
                    props.history.pop();
                    props.history.push('/login');
                }
            });
        }} >
            <label>2-Factor Code:
                <input id="mfa_code" type="text" value={mfa_code} onChange={changeMFA}></input><br/>
            </label>
            <input type="submit"/>
        </form>
    );
}