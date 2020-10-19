import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Login } from "./components/login/Login";
import MfaLogin from "./components/login/MFA_Login";
import { ChallengeLogin } from "./components/login/ChallengeLogin";
import { Statistics } from "./components/statistics/Statistics";
import auth from "./auth/auth";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

const App = (props: any) => {
  const handleInitialSubmit = async (
    username: string,
    password: string
  ): Promise<any> => {
    auth.setCredentials(username, password);

    // TODO: Validate input
    return await auth.initialLogin(); // gets returned to <Login>'s handleSubmit
  };

  const handleMFASubmit = async (mfa_code: string): Promise<any> => {
    let success = await auth.loginMFA(mfa_code);
    return success;
  };

  const handleChallengeSubmit = async (
    challenge_id: string,
    challenge_code: string,
    challenge_type: string
  ): Promise<any> => {
    let success = await auth.loginChallenge(
      challenge_id,
      challenge_code,
      challenge_type
    );
    return success;
  };

  return (
    <Switch>
      <Route
        path={["/", "/login"]}
        exact
        render={(props) => <Login {...props} onSubmit={handleInitialSubmit} />}
      />

      <Route
        path="/MFA"
        exact
        render={(props) => (
          <MfaLogin
            {...props}
            onSubmit={handleMFASubmit}
            username={auth.username}
            password={auth.password}
          />
        )}
      />

      <Route
        path="/challenge"
        exact
        render={(props) => (
          <ChallengeLogin {...props} onSubmit={handleChallengeSubmit} />
        )}
      />

      <ProtectedRoute path="/stats" auth={auth} component={Statistics} />
    </Switch>
  );
  // </Router>
};

export default App;
