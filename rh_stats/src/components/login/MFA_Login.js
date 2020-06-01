import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Head } from '../misc/html_head'

const MFA_Login = props => {
    const [mfa_code, setMFAcode] = useState('');

    const changeMFA = (e) => {
        setMFAcode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = await props.onSubmit(mfa_code);
        if(success)
            props.history.push('/stats');
        else 
            alert('Invalid MFA code');
        
    }

    return (
        <div>
            <Head/>
            <div className='Page mfa'>
                <div className='login-container mfa-container'>
                    <form onSubmit={handleSubmit}>
                        <label className='small-title login-contents'>Authentication Code</label>
                        <input 
                            className='input-box input-text'
                            id='mfa_code'
                            type='text'
                            value={mfa_code}
                            onChange={changeMFA}
                            ></input>
                        <button className='login-btn login-btn-text login-contents' type='submit'>Log in</button>
                    </form>
                    <div className='note'>Check your app for 2-FA code</div>
                </div>
            </div>
        </div>
    );









    //     <form onSubmit={handleSubmit} >
    //         <label>2-Factor Code:
    //             <input id="mfa_code" type="text" value={mfa_code} onChange={changeMFA}></input><br/>
    //         </label>
    //         <input type="submit"/>
    //     </form>
    // );
}

export default withRouter(MFA_Login);