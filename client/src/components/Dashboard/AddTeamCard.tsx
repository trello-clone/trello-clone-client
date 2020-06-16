import React, { useContext } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { DialogContext, ModalTypes } from '../../contexts/DialogContext';

const AddTeamCard = () => {
    const context = useContext(DialogContext);
    return (
        <AddBtn
            onClick={() => {
                context.openModalByType!(ModalTypes.CreateTeam);
            }}
        >
            +
        </AddBtn>
    );
};

export default AddTeamCard;

const AddBtn = styled.button`
    min-width: 280px;
    height: 220px;
    margin: 16px 16px 16px 0;
    border: solid 2px ${(props) => rgba(props.theme.colors.dark_blue, 1)};
    border-radius: 8px;
    border-style: dashed;
    opacity: 0.25;
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 70px;

    &:hover {
        cursor: pointer;
    }
`;
