import React from 'react';
import styled from 'styled-components';

const AddTeamCard = () => {
    return <AddBtn>+</AddBtn>;
};

export default AddTeamCard;

const AddBtn = styled.button`
    width: 280px;
    height: 220px;
    margin: 16px 16px 16px 0;
    border: solid 2px #707070;
    border-radius: 8px;
    border-style: dashed;
    opacity: 0.25;
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 70px;

    &:hover {
        cursor: pointer;
    }
`;
