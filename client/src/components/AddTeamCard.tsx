import React from 'react';
import styled from 'styled-components';

const AddTeamCard = ()=>{
    return(
        <Wrapper>
            <AddBtn>+</AddBtn>
        </Wrapper>
    );
};

export default AddTeamCard;

const Wrapper = styled.div`
    width: 280px;
    height: 220px;
    margin: 16px 16px 16px 0;
    border: solid 1px #707070;
    border-radius: 8px;
    border-style: dashed;
    opacity: 0.25;
   
`;

const AddBtn = styled.button`
    width: 100%;
    height: 100%;
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 70px;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;