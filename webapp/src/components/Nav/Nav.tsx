import React from "react";
import { Link } from "react-router-dom";
import { NavBar, Menu, Logo } from "./Nav.styles";
import Image from "./images/logo.png";
import { useAuthContext } from "contexts/AuthContext";

function NavItemsAutheticated() {
  return (
    <>
      <Link to="/hits">Home</Link>
      <Link to="/hits">Mis hits</Link>
      <Link to="/hitmen">Mis hitmen</Link>
      <Link to="/hits/nuevo">Crear objetivo</Link>
      <Link to="/logout">Logout</Link>
    </>
  );
}

function NavItemsGuest() {
  return (
    <>
      <Link to="/login">Login</Link>
      <Link to="/registro">Registro</Link>
    </>
  );
}

function Nav() {
  const { isAuthenticated } = useAuthContext();

  return (
    <NavBar>
      <Logo src={Image} />
      <Menu>
        {isAuthenticated ? <NavItemsAutheticated /> : <NavItemsGuest />}
      </Menu>
    </NavBar>
  );
}

export { Nav };
