import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';

const MFA_Login = props => {
    const [mfa_code, setMFAcode] = useState('');

    const changeMFA = (e) => {
        setMFAcode(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            props.onSubmit(mfa_code)
            .then((success) => {
                if(success){
                    props.history.push('/stats');
                }
                else {
                    alert('Invalid MFA code');
                }
            });
            
    }

    return (
        <form onSubmit={handleSubmit} >
            <label>2-Factor Code:
                <input id="mfa_code" type="text" value={mfa_code} onChange={changeMFA}></input><br/>
            </label>
            <input type="submit"/>
        </form>
    );
}

export default withRouter(MFA_Login);