import React, { useContext } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { DialogContext, ModalTypes } from '../contexts/DialogContext';

const AddBoardCard = () => {
    const context = useContext(DialogContext);
    return (
        <AddBtn
            onClick={() => {
                context.openModalByType(ModalTypes.CreateBoard);
            }}
        >
            +
        </AddBtn>
    );
};

export default AddBoardCard;

const AddBtn = styled.button`
    width: 280px;
    height: 150px;
    margin: 16px 16px 16px 0;
    border: solid 2px ${(props) => rgba(props.theme.colors.dark_blue,1)};
    border-radius: 8px;
    border-style: dashed;
    opacity: 0.25;
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 60px;

    &:hover {
        cursor: pointer;
    }
`;
