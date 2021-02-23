import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Nav } from "components/Nav";
import { Layout } from "components/Layout";

import { Login } from "views/login";
import { Register } from "views/register";
import { Signup } from "views/signup";
import { Hitmans } from "views/hitmans";
import { Hits } from "views/hits";
import { Home } from "views/home";

function App() {
  return (
    <Router>
      <Layout>
        <Nav />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/hitmans">
            <Hitmans />
          </Route>
          <Route path="/hits">
            <Hits />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
