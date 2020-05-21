import React from 'react';
import styled from 'styled-components';


const AddBoard = ()=>{
    return(
        <Wrapper>
            <AddBtn>+</AddBtn>
            
        </Wrapper>
    );
};

export default AddBoard;

const Wrapper = styled.div`
    width: 280px;
    height: 160px;
    border: solid 1px #707070;
    border-radius: 7.5px;
    border-style: dashed;
    opacity: 0.25;
   
`;

const AddBtn = styled.button`
    width: 100%;
    height: 100%;
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 60px;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;