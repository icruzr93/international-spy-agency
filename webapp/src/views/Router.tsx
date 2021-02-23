import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "views/login";
import { Register } from "views/register";
import { Signup } from "views/signup";
import { Hitmans } from "views/hitmans";
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
          <Route path="/registro">
            <Register />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/hits">
            <Hits />
          </Route>
          <Route path="/hits/nuevo">
            <CreateHit />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/hitmans">
            <Hitmans />
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
