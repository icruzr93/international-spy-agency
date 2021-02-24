import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "views/login";
import { Logout } from "views/logout";
import { Register } from "views/register";
import { Hitmen } from "views/hitmen";
import { Hits } from "views/hits";
import { CreateHit } from "views/create-hit";
import { Home } from "views/home";
import { AuthProvider } from "contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/registro">
            <Register />
          </Route>
          <Route path="/hits/nuevo" exact>
            <CreateHit />
          </Route>
          <Route path="/hits" exact>
            <Hits />
          </Route>
          <Route path="/hitmen">
            <Hitmen />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
