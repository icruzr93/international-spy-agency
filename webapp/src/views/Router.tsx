import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "views/login";
import { Logout } from "views/logout";
import { Register } from "views/register";
import { Hitmen } from "views/hitmen";
import { Hits } from "views/hits";
import { CreateHit } from "views/create-hit";
import { AuthProvider } from "contexts/AuthContext";
import { Profile } from "./profile";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/registro" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/hits/nuevo" exact component={CreateHit} />
        <Route path="/hits" exact component={Hits} />
        <Route path="/hitmen" component={Hitmen} />
        <Route path="/home" component={Hits} />
        <Route path="/" component={Login} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
