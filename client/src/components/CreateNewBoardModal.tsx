import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
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
            context.closeModalByType(ModalTypes.CreateBoard);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', onClickOutside);
    },[]);

    return (
        <Container>
            <Modal ref={modalRef}>
                <Header>Create board</Header>
                <TypeWrapper>
                    <TypeNav >With team</TypeNav>
                    <TypeNav >With members</TypeNav>
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
    background-color: white;
    width: 380px;
    height: 430px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 8px;
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
    color: ${(props) => rgba(props.theme.colors.black,0.9)};
    &:first-child {
        border-right: 1px solid ${(props) => rgba(props.theme.colors.black,0.9)};
    }
    &:hover {
        cursor: pointer;
    }
`;

const Input = styled.input`
    font-family: 'ProximaNovaMedium', sans-serif;
    opacity: 0.55;
    width: 100%;
    padding: 6px;
    margin-bottom: 20px;
    border: 0;
    border-bottom: 1px solid ${(props) => rgba(props.theme.colors.black,0.9)};
`;

const TeamMember = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 4px;
    margin-bottom: 16px;
    border: solid 1px white;
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
    border-radius: 4px;
    margin-right: 8px;
`;

const CancelButton = styled.a`
    text-decoration: none;
    color: ${(props) => rgba(props.theme.colors.navy_blue, 0.55)};
    &:hover {
        cursor: pointer;
    }
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
    color: white;
    background: ${(props) => rgba(props.theme.colors.lemon,1)} ;
    padding: 5px 15px;
    margin-left: 30px;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;
