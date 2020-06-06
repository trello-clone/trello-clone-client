import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useMutation } from '@apollo/react-hooks';

import avatar from '../icons/avatar.jpg';
import background from '../icons/teamBackground.jpg';
import { DialogContext, ModalTypes } from '../contexts/DialogContext';
import CustomSelect from './CustomSelect';
import { CREATE_TEAM } from '../common/Queries';

interface TeamModalProps {
    dataRefetch: any
}
const CreateNewTeamdModal = (props: TeamModalProps ) => {
    const { dataRefetch } = props;
    const context = useContext(DialogContext);
    const modalRef = useRef<HTMLDivElement>(null);

    const [selectState, setSelectState] = useState({
        selectedItemName: [],
        selectedItemID: [],
    });
    const [teamName, setTeamName] = useState('');

    const [addTeam] = useMutation(CREATE_TEAM);

    const teamMembers = selectState.selectedItemName;

    const onClickOutside = (e: any) => {
        const element = e.target;
        if (modalRef.current && !modalRef.current.contains(element)) {
            e.preventDefault();
            e.stopPropagation();
            context.closeModalByType(ModalTypes.CreateBoard);
        }
    };

    // handle changes from custom select
    const onSelectionChange = (item: any) => {
        setSelectState({
            ...selectState,
            selectedItemName: Array.from(new Set(selectState.selectedItemName.concat(item.name))),
            selectedItemID: Array.from(new Set(selectState.selectedItemID.concat(item._id))),
        });
    };

    const handleTeamNameChange = (input: any) => {
        setTeamName(input.target.value);
    };

    const handleSubmit = (e: any, refetch: any) => {
        e.preventDefault();
        addTeam({ variables: { name: teamName, members: selectState.selectedItemID } });
        context.closeModalByType(ModalTypes.CreateBoard);
        refetch();
    };

    useEffect(() => {
        document.body.addEventListener('click', onClickOutside);

        return () => window.removeEventListener('click', onClickOutside);
    });

    return (
        <Container>
            <Modal ref={modalRef}>
                <Header>Create team</Header>
                <Input onChange={handleTeamNameChange} type="text" placeholder="Enter team's name" />
                <CustomSelect selectedItems={selectState.selectedItemName} onSelectionChange={onSelectionChange} />
                <MemberContainer>
                    <MemberList>
                        {teamMembers.map((item: any, index: any) => (
                            <Member key={index}>{item}</Member>
                        ))}
                    </MemberList>
                    <MemberAvatar src={avatar} />
                </MemberContainer>
                <BackgroundLabel>Select background</BackgroundLabel>
                <BackgroundContainer>
                    <BackgroundItem src={background} alt="background" />
                    <BackgroundItem src={background} alt="background" />
                </BackgroundContainer>
                <ButtonContainer>
                    <CancelButton
                        onClick={() => {
                            context.closeModalByType(ModalTypes.CreateTeam);
                        }}
                    >
                        Cancel
                    </CancelButton>
                    <CreateNewTeamBtn onClick={e =>handleSubmit(e,dataRefetch)}>Create new team</CreateNewTeamBtn>
                </ButtonContainer>
            </Modal>
        </Container>
    );
};

export default CreateNewTeamdModal;

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
    width: 350px;
    height: 430px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 28px;
    border-radius: 8px;
    font-size: 16px;
`;
const Header = styled.div`
    font-size: 20px;
    margin-bottom: 36px;
`;

const Input = styled.input`
    font-family: 'ProximaNovaMedium', sans-serif;
    height: 23px;
    width: 348px;
    outline: 0;
    border: 0;
    padding-bottom: 5px;
    padding-right: 0;
    margin-bottom: 36px;
    border-bottom: 1px solid ${(props) => rgba(props.theme.colors.black, 0.25)};
    font-size: 16px;
    &::placeholder {
        font-size: 16px;
        color: ${(props) => rgba(props.theme.colors.black, 0.25)};
    }
`;
const MemberContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 350px;
    margin-bottom: 12px;
`;
const MemberAvatar = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 4px;
    margin-bottom: 16px;
    border: solid 1px white;
    border-radius: 50%;
`;
const MemberList = styled.div`
    display: flex;
`;
const Member = styled.div`
    margin-right: 5px;
`;

const BackgroundLabel = styled.div`
    margin-bottom: 10px;
    font-family: 'ProximaNovaMedium', sans-serif;
    color: ${(props) => rgba(props.theme.colors.black, 0.9)};
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
    color: ${(props) => rgba(props.theme.colors.dark_blue, 0.55)};
    &:hover {
        cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 40px;
`;

const CreateNewTeamBtn = styled.button`
    font-family: 'ProximaNovaBold', sans-serif;
    font-size: 16px;
    color: white;
    background: ${(props) => rgba(props.theme.colors.dark_blue, 1)};
    padding: 10px 28px;
    margin-left: 30px;
    border-radius: 3px;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;
