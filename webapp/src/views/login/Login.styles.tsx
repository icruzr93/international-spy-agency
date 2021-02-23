import styled from "styled-components";

const Container = styled.main`
  grid-area: main;
  display: grid;
  padding: 3em;
  background: #fdfcfc;
  border-radius: 20px;
  -webkit-box-shadow: 3px 3px 10px #cecece;
  -moz-box-shadow: 3px 3px 10px #cecece;
  box-shadow: 3px 3px 10px #cecece;
  margin: 2rem auto 0 auto;
  width: 40%;

  @media (max-width: 480px) {
    width: auto;
    margin: 1rem;
  }

  @media (min-width: 481px) and (max-width: 950px) {
    width: 60%;
  }

  @media (min-width: 2500px) and (max-width: 3500px) {
    width: 30%;
  }

  @media (min-width: 3501px) and (max-width: 6000px) {
    width: 20%;
  }

  small {
    color: #f53a3a;
  }

  label {
    font-weight: bold;
  }
`;

const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;

  button {
    font-weight: bold;
  }
`;

const Welcome = styled.div`
  text-align: center;
  color: #007bff;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

export { Container, ContainerButton, Welcome };
