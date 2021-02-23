import React from "react";
import { Link } from "react-router-dom";
import { NavBar, Menu, Logo } from "./Nav.styles";
import Image from "./images/logo.png";

function Nav() {
  return (
    <NavBar>
      <Logo src={Image} />
      <Menu>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/hitmans">Users</Link>
      </Menu>
    </NavBar>
  );
}

export { Nav };
