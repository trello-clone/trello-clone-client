import React from 'react';
import styled from 'styled-components';

import { Backdrop } from './ModalComponents';

function SpinnerWithBackdrop() {
  return (
    <Backdrop>
      <Main />
    </Backdrop>
  );
}

export default SpinnerWithBackdrop;

const Main = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
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
