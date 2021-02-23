import styled from "styled-components";

const StyledLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
`;

export { StyledLayout };
