import React from "react";
import { DataPage } from "./DataPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage } from "./LoginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/statistics">
          <DataPage />
        </Route>
        <Route path={["/", "/login"]}>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
