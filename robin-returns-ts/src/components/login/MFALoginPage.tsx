import { AuthContext, AuthContextType } from "login/AuthContext";
import { attemptMFALogin } from "login/AuthDAO";
import { getErrorMessage } from "login/ErrorUtil";
import { RobinhoodError } from "login/RobinhoodResponseConstants";
import { useState } from "react";

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
          <div>
            <div className="Page gray-bg">
              <div className="login-container mfa-container">
                <form
                  onSubmit={async function (e) {
                    e.preventDefault();
                    // Make MFA login request
                    const response = await attemptMFALogin({
                      username,
                      password,
                      MFACode: parseInt(MFACode),
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
                  <label className="small-title login-contents">
                    Authentication Code
                  </label>
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
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
