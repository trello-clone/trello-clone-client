import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import avatar from '../icons/avatar.jpg';
import background from '../icons/teamBackground.jpg';
import { DialogContext, ModalTypes } from '../contexts/DialogContext';

const CreateNewBoardModal = () => {
    const context = useContext(DialogContext);
    const modalRef = useRef<HTMLDivElement>(null);

    const onClickOutside = (e: any) => {
        const element = e.target;
        if (modalRef.current && !modalRef.current.contains(element)) {
            e.preventDefault();
            e.stopPropagation();
            context.closeModalByType();
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', onClickOutside);
    });

    return (
        <Container>
            <Modal ref={modalRef}>
                <Header>Create board</Header>
                <TypeWrapper>
                    <TypeNav href="#">With team</TypeNav>
                    <TypeNav href="#">With members</TypeNav>
                </TypeWrapper>
                <Input type="text" placeholder="Enter member's name" />
                <TeamMember src={avatar} />
                <TeamMember src={avatar} />
                <TeamMember src={avatar} />
                <Input type="text" placeholder="Title" />
                <BackgroundLabel>Select background</BackgroundLabel>
                <BackgroundContainer>
                    <BackgroundItem src={background} alt="background" />
                    <BackgroundItem src={background} alt="background" />
                </BackgroundContainer>
                <ButtonContainer>
                    <CancelButton
                        href="#"
                        onClick={() => {
                            context.closeModalByType(ModalTypes.CreateBoard);
                        }}
                    >
                        Cancel
                    </CancelButton>
                    <CreateNewBoardBtn>Create new board</CreateNewBoardBtn>
                </ButtonContainer>
            </Modal>
        </Container>
    );
};

export default CreateNewBoardModal;
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled.div`
    background-color: #ffffff;
    width: 380px;
    height: 430px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 7.5px;
    font-size: 15px;
`;
const Header = styled.div`
    font-size: 20px;
`;
const TypeWrapper = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    opacity: 0.5;
`;
const TypeNav = styled.a`
    width: 50%;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    color: #707070;
    &:first-child {
        border-right: 1.5px solid #707070;
    }
    &:hover {
        cursor: pointer;
    }
`;

const Input = styled.input`
    font-family: 'ProximaNovaMedium', sans-serif;
    opacity: 0.55;
    width: 100%;
    padding: 5px;
    margin-bottom: 20px;
    border: 0;
    border-bottom: 1.5px solid #707070;
`;

const TeamMember = styled.img`
    width: 22.5px;
    height: 22.5px;
    margin-right: 5px;
    margin-bottom: 15px;
    border: solid 0.5px #ffffff;
    border-radius: 50%;
`;

const BackgroundLabel = styled.div`
    font-size: 15px;
    margin-bottom: 10px;
    font-family: 'ProximaNovaMedium', sans-serif;
`;

const BackgroundContainer = styled.div`
    display: flex;
`;

const BackgroundItem = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 2.5px;
    margin-right: 7.5px;
`;

const CancelButton = styled.a`
    text-decoration: none;
    color: #707070;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
`;

const CreateNewBoardBtn = styled.button`
    font-size: 15px;
    font-family: 'ProximaNovaMedium', sans-serif;
    color: #ffffff;
    background: #d4db2e;
    padding: 5px 15px;
    margin-left: 30px;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;
