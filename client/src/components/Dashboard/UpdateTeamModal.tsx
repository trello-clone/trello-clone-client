import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useMutation } from '@apollo/react-hooks';

import avatar from '../../icons/avatar.jpg';
import background from '../../icons/teamBackground.jpg';
import { DialogContext, ModalTypes } from '../../contexts/DialogContext';
import CustomSelect from './CustomSelect';
import { UPDATE_TEAM} from 'graphql/mutations';
import { Team, User } from '../../types.js';

interface TeamCardProps {
    teamData: Team;
}


interface SelectState {
    selectedItemName: String[],
    selectedItemID: String[],
}

const UpdateTeamModal = (props: TeamCardProps) => {
    const { teamData } = props;
    const context = useContext(DialogContext);
    const modalRef = useRef<HTMLDivElement>(null);
    
    const [selectState, setSelectState] = useState< SelectState >({
        selectedItemName: [],
        selectedItemID: [],
    });
    const [teamName, setTeamName] = useState(teamData.name || "");
    
    const teamMemberNameSelected = selectState!.selectedItemName as String[];
    const teamMemberIDSelected = selectState!.selectedItemID as String[];
    // get the team's members from teamData props
    const teamMembers: User[] = teamData.members as User[];
    const teamMemberNames : String[] = []; 
    const teamMemberID : String[] = []; 
    teamMembers.map((item: User) => teamMemberNames.push(item.name))
    teamMembers.map((item: User) => teamMemberID.push(item._id))
    
    // Graphql mutation to update a team
    const [ updateTeam ] = useMutation< {teamUpdate: Team}, {id: String, name: String, members: String[]}>(UPDATE_TEAM);
    const onClickOutside = (e: any) => {
        const element = e.target;
        if (modalRef.current && !modalRef.current.contains(element)) {
            e.preventDefault();
            context.closeModalByType!(ModalTypes.UpdateTeam);
        }
    };

    // handle changes from custom select
    const onSelectionChange = (item: any) => {
        setSelectState({
            ...selectState,
            selectedItemName: Array.from(new Set(selectState!.selectedItemName.concat(item.name))),
            selectedItemID: Array.from(new Set(selectState!.selectedItemID.concat(item._id))),
        });
    };

    const handleTeamNameChange = (input: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(input.target.value);
    };

    const handleUpdateTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        updateTeam({ variables: {id: teamData._id , name: teamName, members: [...teamMemberIDSelected,...teamMemberID]}});
        context.closeModalByType!(ModalTypes.UpdateTeam);
    };
    useEffect(() => {
        document.body.addEventListener('click', onClickOutside);

        return () => window.removeEventListener('click', onClickOutside);
    },);

    return (
        <Container>
            <Modal ref={modalRef}>
                <Header>Update team</Header>
                <Input onChange={handleTeamNameChange} type="text" placeholder="Enter team's name" value={teamName}/>
                <CustomSelect selectedItems={selectState!.selectedItemName} onSelectionChange={onSelectionChange} />
                <MemberContainer>
                    <MemberList>
                        {teamMemberNameSelected.map((item: String, index: any) => (
                            <Member key={index}>{item}</Member>
                        ))}
                        {teamMemberNames.map((item: String, index: any) => (
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
                            context.closeModalByType!(ModalTypes.CreateTeam);
                        }}
                    >
                        Cancel
                    </CancelButton>
                    <UpdateBtn onClick={handleUpdateTeam}>Update</UpdateBtn>
                </ButtonContainer>
            </Modal>
        </Container>
    );
};

export default UpdateTeamModal;

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

const UpdateBtn = styled.button`
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
