import styled from "styled-components";

const Container = styled.div`
  grid-area: divcontent;
  display: grid;
  padding: 3em;
  border-radius: 20px;
  margin: 2rem auto 0 auto;
  width: 50%;

  @media (max-width: 480px) {
    width: auto;
    margin: 1rem;
  }

  @media (min-width: 481px) and (max-width: 950px) {
    width: 80%;
  }

  @media (min-width: 2500px) and (max-width: 3500px) {
    width: 30%;
  }

  @media (min-width: 3501px) and (max-width: 6000px) {
    width: 30%;
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
    width: 10rem;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #000000;
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

export { Container, ContainerButton, Title };
