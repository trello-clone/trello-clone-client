import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { Backdrop } from '../common/ModalComponents';
import CrossMark from '../../icons/crossmark.svg';
import SideBar from './SideBarInCard';
import { useOnClickOutside } from '../../utils/index';
import { ModalTypes, DialogContext } from '../../contexts/DialogContext';

const CardDetailModal = () => {
    const cardModalRef = useRef(null);
    const context = useContext(DialogContext);
    const closeModal = () => context.closeModal!({ modalType: ModalTypes.CardDetail });
    useOnClickOutside(cardModalRef, closeModal);
    return (
        <Backdrop>
            <CardDetailContainer ref={cardModalRef}>
                <CloseBtn onClick={closeModal} />
                <Header>
                    <ColumnName>Todo</ColumnName>
                    <CardName>Navigation Bar</CardName>
                    <Label />
                    <Label />
                </Header>
                <Body>
                    <MainContent>
                        <ModuleTitle>Description</ModuleTitle>
                        <Input placeholder="Type something for the description"></Input>
                        <ModuleTitle>Attachments</ModuleTitle>
                        <ModuleTitle>Activities</ModuleTitle>
                    </MainContent>
                    <SideBar />
                </Body>
            </CardDetailContainer>
        </Backdrop>
    );
};

export default CardDetailModal;

const CardDetailContainer = styled.div`
    position: absolute;
    background-color: white;
    width: 640px;
    min-height: 640px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    padding: 20px;
    border-radius: 8px;
    font-family: 'ProximaNovaSemiBold', sans-serif;
`;
const CloseBtn = styled.button`
    border: 0;
    font-family: 'ProximaNovaBold', sans-serif;
    background: url(${CrossMark});
    background-size: 100% 100%;
    height: 20px;
    width: 20px;
    position: absolute;
    right: 32px;
`;
const Header = styled.div`
    margin: 20px 12px;
`;
const Body = styled.div`
    display: flex;
    margin: 0 12px;
`;
const MainContent = styled.div`
    flex-grow: 6;
`;
const ColumnName = styled.label`
    color: ${(props) => rgba(props.theme.colors.black, 0.4)};
    font-size: 14px;
    display: block;
    margin-bottom: 5px;
`;
const CardName = styled.div`
    font-family: 'ProximaNovaBold', sans-serif;
    margin-bottom: 20px;
`;
const Label = styled.span`
    display: inline-block;
    height: 12px;
    width: 40px;
    background-color: ${(props) => props.theme.colors.red};
    border-radius: 8px;
    margin-right: 8px;
`;
const ModuleTitle = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
`;
const Input = styled.textarea`
    font-family: 'ProximaNovaMedium', sans-serif;
    width: 80%;
    height: 60px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => rgba(props.theme.colors.blue, 0.1)};
    resize: none;
    &::placeholder {
        color: ${(props) => rgba(props.theme.colors.black, 0.4)};
    }
`;
