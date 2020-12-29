import React, { useState } from "react";

import { AuthContext } from "login/AuthContext";
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
import { LoginPage } from "./login/LoginPage";
import { MFALoginPage } from "./login/MFALoginPage";

import "ui/css/Login.css";
import "ui/css/styles.css";
import "ui/css/MFALogin.css";

interface ProtectedRouteProps extends RouteProps {
  isLoggedIn: boolean;
  token: string | null;
  logout: () => void;
  component: React.ComponentType<RouteComponentProps> | React.ComponentType;
}

function ProtectedRoute({
  isLoggedIn,
  token,
  logout,
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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  return (
    <>
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
            <ProtectedRoute
              path="/statistics"
              isLoggedIn={isLoggedIn}
              token={token}
              logout={logout}
              component={DataPage}
            />
            <Route
              path="/login"
              render={(props: RouteComponentProps) => (
                <LoginPage {...props} onSubmit={async () => true} />
              )}
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
                    // Validate response
                    props.history.push("/statistics");
                  }}
                />
              )}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
