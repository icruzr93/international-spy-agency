import styled from "styled-components";

const NavBar = styled.nav`
  width: 100%;
  height: 5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2em;
  background-color: #043256;
`;

const Menu = styled.nav`
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 100%;
  }

  a {
    color: #ffffff;
    font-weight: bold;
    margin-left: 2em;

    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

const Logo = styled.img`
  width: 5rem;
`;

export { NavBar, Menu, Logo };
