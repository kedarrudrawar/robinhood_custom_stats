import { AuthContext, AuthContextType } from "auth/AuthContext";
import { attemptMFALogin } from "auth/AuthDAO";
import { getErrorMessage } from "auth/ErrorUtil";
import { RobinhoodError } from "auth/ServerResponseConstants";
import React, { useState } from "react";
import { LaptopPreview } from "./LaptopPreview";

interface MFALoginPageProps {
  loginWithToken: (token: string) => void;
  performOnValidatedResponse: () => void;
}

export function MFALoginPage(props: MFALoginPageProps) {
  const [MFACode, setMFACode] = useState<string>("");

  function changeMFA(e: any) {
    setMFACode(e.target.value);
  }

  return (
    <AuthContext.Consumer>
      {({ username, password }: AuthContextType) => {
        return (
          <div className="login-page">
            <div className="login-container">
              <div className="mfa-login-body">
                <div className="mfa-title login-contents ">
                  Authentication Code
                </div>
                <form
                  onSubmit={async function (e) {
                    e.preventDefault();
                    // Make MFA login request
                    const response = await attemptMFALogin({
                      username,
                      password,
                      MFACode: MFACode,
                      onReject: (data: RobinhoodError) => {
                        alert(getErrorMessage(data));
                      },
                    });

                    if (response != null) {
                      const { access_token } = response.data;
                      props.loginWithToken(access_token);
                      props.performOnValidatedResponse();
                    }
                  }}
                >
                  <input
                    className="input-box input-text"
                    id="mfa_code"
                    type="text"
                    value={MFACode}
                    onChange={changeMFA}
                  ></input>
                  <button
                    className="login-btn login-btn-text login-contents"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <div className="note">Check your app for 2-FA code</div>
              </div>
            </div>
            <LaptopPreview />
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
