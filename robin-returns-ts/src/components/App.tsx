import React, { useState } from "react";

import { AuthContext } from "auth/AuthContext";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
} from "react-router-dom";
import { DataPage } from "./DataPage";
import { Head } from "./Head";
import { RobinhoodBaseToken } from "DAOConstants";
import { useEnvToken, DEBUG } from "config";

import "ui/css/Login.css";
import "ui/css/styles.css";
import "ui/css/MFALogin.css";
import { LoginPage } from "./auth/LoginPage";
import { MFALoginPage } from "./auth/MFALoginPage";

interface ProtectedRouteProps extends RouteProps {
  isLoggedIn: boolean;
  token: string | null;
  component: React.ComponentType<RouteComponentProps> | React.ComponentType;
}

function ProtectedRoute({
  isLoggedIn,
  token,
  component: Component,
  ...rest
}: ProtectedRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    ></Route>
  );
}

function App() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(DEBUG);
  const [token, setToken] = useState<RobinhoodBaseToken | null>(
    (useEnvToken && process.env.REACT_APP_BEARER) || null
  );

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  return (
    <div style={{ height: "100%" }}>
      <Head />
      <AuthContext.Provider
        value={{
          isLoggedIn,
          token,
          login,
          logout,
          username,
          password,
          updateCredentials: (username: string, password: string) => {
            setUsername(username);
            setPassword(password);
          },
        }}
      >
        <Router>
          <Switch>
            <Route
              path="/login"
              render={(props: RouteComponentProps) => <LoginPage {...props} />}
            />

            <Route
              path="/MFA"
              exact
              render={(props) => (
                <MFALoginPage
                  loginWithToken={(token: string) => {
                    setToken(token);
                    login();
                  }}
                  performOnValidatedResponse={() => {
                    props.history.push("/statistics");
                  }}
                />
              )}
            />
            <ProtectedRoute
              path={["/", "/statistics"]}
              isLoggedIn={isLoggedIn}
              token={token}
              component={DataPage}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
