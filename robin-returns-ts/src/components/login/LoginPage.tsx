import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { AuthContext } from "login/AuthContext";
import { attemptInitialLogin } from "login/AuthDAO";
import { getErrorMessage } from "login/ErrorUtil";
import {
  isChallengeRequired,
  isMFARequired,
} from "login/RHResponseTypePredicates";
import {
  InitialLoginResponse,
  RobinhoodError,
} from "login/RobinhoodResponseConstants";
import { LaptopPreview } from "./LaptopPreview";

export interface LoginPageProps extends RouteComponentProps {
  onSubmit: (username: string, password: string) => Promise<{}>;
}

export function LoginPage(props: LoginPageProps): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  const changeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  function handleMFARequired(): void {
    // Redirect to MFA login
    props.history.push("/MFA");
  }

  function handleChallengeRequired(): void {
    // TODO kedar
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Update state of <App /> to store credentials.
    authContext.updateCredentials(username, password);

    const response: AxiosResponse<
      InitialLoginResponse | RobinhoodError
    > | null = await attemptInitialLogin({
      username,
      password,
      onReject: (data: RobinhoodError) => {
        alert(getErrorMessage(data));
      },
    });
    if (response != null) {
      const { data } = response;

      if (isMFARequired(data)) {
        handleMFARequired();
      } else if (isChallengeRequired(data)) {
        handleChallengeRequired();
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login">
          <div className="login-body">
            <div className="large-title login-contents ">
              Link your Robinhood Account
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <br />
                <input
                  className="input-box input-text"
                  id="username"
                  type="text"
                  value={username}
                  onChange={changeUsername}
                ></input>
                <br />
              </label>
              <br />
              <label>
                Password
                <br />
                <input
                  className="input-box input-text"
                  id="password"
                  type="password"
                  value={password}
                  onChange={changePassword}
                ></input>
                <br />
              </label>
              <br />
              <button type="submit" className="login-btn login-btn-text">
                Login
              </button>
            </form>
            <div className="note login-contents ">
              We do not store your Robinhood credentials.
            </div>
          </div>
        </div>
      </div>
      <LaptopPreview />
    </div>
  );
}
