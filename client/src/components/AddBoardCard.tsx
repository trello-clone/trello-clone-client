import React, {useContext} from 'react';
import styled from 'styled-components';
import { DialogContext, ModalTypes } from "../contexts/DialogContext";

const AddBoardCard = ()=>{
    const context = useContext(DialogContext);
    return(
        <Wrapper>
            <AddBtn onClick={()=>{context.openModalByType(ModalTypes.CreateBoard)}}>+</AddBtn> 
        </Wrapper>
    );
};

export default AddBoardCard;

const Wrapper = styled.div`
    width: 280px;
    height: 160px;
    border: solid 1px #707070;
    border-radius: 8px;
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