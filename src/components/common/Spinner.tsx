import React from 'react';
import { rgba } from 'polished';
import styled from 'styled-components';

function Spinner() {
  return (
    <Container>
      <Main />
    </Container>
  );
}

export default Spinner;

const Container = styled.div`
  width: 280px;
  margin: 16px 16px 16px 0;
  border: solid 2px ${(props) => rgba(props.theme.colors.dark_blue, 1)};
  border-radius: 8px;
  border-style: dashed;
  opacity: 0.25;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  border: solid 5px lightgray;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;