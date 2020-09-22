import React, { useContext } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { DialogContext, ModalTypes, CreateBoardOptions } from '../../contexts/DialogContext';
import { Team } from '../../types';

interface AddBoardCardProps {
    createBoardOption?: CreateBoardOptions,
    boardData?: Team,
}
const AddBoardCard = (props: AddBoardCardProps) => {
    const { createBoardOption, boardData } = props;
    const context = useContext(DialogContext);
    return (
        <AddBtn
            onClick={() => {
                context.openModal!({modalType: ModalTypes.CreateBoard, dataType: boardData, createBoardOption: createBoardOption});
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
