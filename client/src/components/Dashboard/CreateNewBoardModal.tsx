import React, { useContext, useRef, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import avatar from '../../icons/avatar.jpg';
import background from '../../icons/teamBackground.jpg';
import { Backdrop, Input } from '../common/ModalComponents';
import { DialogContext, ModalTypes, CreateBoardOptions } from '../../contexts/DialogContext';
import CustomSelect from '../CustomSelect';
import { Team, User, OpenModal } from '../../types.js';
import { CREATE_BOARD_BY_MEMBERS, CREATE_BOARD_BY_TEAM } from 'graphql/mutations';
import { GET_TEAMS } from 'graphql/queries';
import { useOnClickOutside } from '../../utils/index';
import AddMemberPopover from '../AddMemberPopover';

interface BoardModalProps {
    dataRefetch: any;
    boardData: OpenModal;
}

const CreateNewBoardModal = (props: BoardModalProps) => {
    const { dataRefetch, boardData } = props;
    const context = useContext(DialogContext);
    const modalRef = useRef<HTMLDivElement>(null);
    const [boardModalOption, setBoardModalOption] = useState(boardData.createBoardOption);
    const [selectedItem, setSelectedItem] = useState<User[]>([]);
    const [selectedItemName, setSelectedItemName] = useState<String[]>([]);
    const [selectedItemID, setSelectedItemID] = useState<String[]>([]);
    const [titleInput, setTitleInput] = useState('');
    const [teamIDSelected, setTeamIDSelected] = useState(boardData.dataType ? boardData.dataType._id || '' : '');
    const history = useHistory();
    const [addBoardByMembers] = useMutation(CREATE_BOARD_BY_MEMBERS);
    const [addBoardByTeam] = useMutation(CREATE_BOARD_BY_TEAM);
    const { data: teamData, loading: teamLoading } = useQuery(GET_TEAMS);

    // handle changes from custom select
    const getSelectResult = (item: User) => {
        if (selectedItem.find((itemInArr) => itemInArr === item) === undefined) {
            setSelectedItem(selectedItem.concat(item));
            setSelectedItemName(selectedItemName.concat(item.name));
            setSelectedItemID(selectedItemID.concat(item._id));
        }
    };

    // deselect the item from the selectedItem arr
    const deselectItem = (item: User) => {
        const index = selectedItem.indexOf(item);

        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(index, 1);
        setSelectedItem(newSelectedItem);

        const newSelectedItemName = [...selectedItemName];
        newSelectedItemName.splice(index, 1);
        setSelectedItemName(newSelectedItemName);

        const newSelectedItemID = [...selectedItemName];
        newSelectedItemID.splice(index, 1);
        setSelectedItemID(newSelectedItemID);
    };

    //create a new board by members
    const handleSubmitWithMembers = (e: MouseEvent) => {
        e.preventDefault();
        addBoardByMembers({ variables: { title: titleInput, members: selectedItemID } });
        context.closeModal!({ modalType: ModalTypes.CreateBoard });
        dataRefetch();
        history.push('/');
    };

    //create a new board by team
    const handleSubmitWithTeam = (e: MouseEvent) => {
        e.preventDefault();
        addBoardByTeam({ variables: { title: titleInput, team: teamIDSelected } });
        context.closeModal!({ modalType: ModalTypes.CreateBoard });
        dataRefetch();
        history.push('/');
    };

    const cancelAddingNewBoard = () => {
        context.closeModal!({ modalType: ModalTypes.CreateBoard });
    };

    useOnClickOutside(modalRef, cancelAddingNewBoard);

    return (
        <Backdrop>
            <Modal ref={modalRef}>
                <Header>Create board</Header>
                <TypeWrapper>
                    <TypeNav
                        active={boardModalOption === CreateBoardOptions.ByTeam}
                        onClick={() => {
                            setBoardModalOption(CreateBoardOptions.ByTeam);
                        }}
                    >
                        With team
                    </TypeNav>
                    <TypeNav
                        active={boardModalOption === CreateBoardOptions.ByMembers}
                        onClick={() => {
                            setBoardModalOption(CreateBoardOptions.ByMembers);
                        }}
                    >
                        With members
                    </TypeNav>
                </TypeWrapper>
                {boardModalOption === CreateBoardOptions.ByTeam && (
                    <>
                        <SectionTitle>Select team</SectionTitle>
                        <TeamContainer>
                            {!teamLoading &&
                                (teamData.teams as Team[]).map((team) => (
                                    <TeamItem onClick={() => setTeamIDSelected(team._id)} isSelected={team._id === teamIDSelected}>
                                        <TeamImage src={background} alt="background" />
                                        <TeamLabel>{team.name}</TeamLabel>
                                    </TeamItem>
                                ))}
                        </TeamContainer>
                    </>
                )}
                {boardModalOption === CreateBoardOptions.ByMembers && (
                    <>
                        <AddMemberPopover selectItems={getSelectResult} memberNames={selectedItemName} deselectMember={deselectItem} />
                        {/* <CustomSelect selectItems={getSelectResult} /> */}
                        <MemberContainer>
                            <MemberList>
                                {selectedItemName.map((item: any, index: any) => (
                                    <Member key={index}>{item}</Member>
                                ))}
                            </MemberList>
                            <MemberAvatar src={avatar} />
                        </MemberContainer>
                    </>
                )}
                {/* <MemberAvatar src={avatar} />
                <MemberAvatar src={avatar} /> */}
                <Input onChange={(input) => setTitleInput(input.target.value)} type="text" placeholder="Title" />
                <SectionTitle>Select background</SectionTitle>
                <BackgroundContainer>
                    <BackgroundItem src={background} alt="background" />
                    <BackgroundItem src={background} alt="background" />
                </BackgroundContainer>
                <ButtonContainer>
                    <CancelButton onClick={cancelAddingNewBoard}>Cancel</CancelButton>
                    {boardModalOption === CreateBoardOptions.ByMembers ? (
                        <CreateNewBoardBtn onClick={handleSubmitWithMembers}>Create new board</CreateNewBoardBtn>
                    ) : (
                        <CreateNewBoardBtn onClick={handleSubmitWithTeam}>Create new board</CreateNewBoardBtn>
                    )}
                </ButtonContainer>
            </Modal>
        </Backdrop>
    );
};

export default CreateNewBoardModal;

const Modal = styled.div`
    background-color: white;
    width: 350px;
    min-height: 430px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 8px;
    font-size: 16px;
`;
const Header = styled.div`
    font-size: 20px;
    font-family: 'ProximaNovaBold', sans-serif;
`;
const TypeWrapper = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
    display: flex;
`;

const TypeNav = styled.a<{ active: boolean }>`
    font-family: 'ProximaNovaBold', sans-serif;
    width: 50%;
    line-height: 54px;
    text-align: center;

    color: ${(props) => (props.active ? rgba(props.theme.colors.lemon, 1) : rgba(props.theme.colors.black, 0.25))};
    &:first-child {
        border-right: 1px solid ${(props) => rgba(props.theme.colors.black, 0.25)};
    }
    &:hover {
        cursor: pointer;
    }
`;

const MemberContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 350px;
    margin-bottom: 5px;
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

const TeamContainer = styled.div`
    display: flex;
    margin-bottom: 8px;
`;
const TeamItem = styled.div<{ isSelected: boolean }>`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin-right: 12px;
    border: ${(props) => (props.isSelected ? `2px solid ${rgba(props.theme.colors.black, 0.25)}` : 'none')};
    border-radius: 4px;
    &:hover {
        cursor: pointer;
    }
`;
const TeamImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 4px;
`;
const TeamLabel = styled.div`
    margin-top: 4px;
    color: ${(props) => rgba(props.theme.colors.black, 1)};
    font-size: 12px;
`;

const SectionTitle = styled.div`
    margin-bottom: 10px;
    color: ${(props) => rgba(props.theme.colors.black, 1)};
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
    font-family: 'ProximaNovaBold', sans-serif;
    text-decoration: none;
    color: ${(props) => rgba(props.theme.colors.dark_blue, 0.55)};
    &:hover {
        cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    align-self: flex-end;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
`;

const CreateNewBoardBtn = styled.button`
    font-family: 'ProximaNovaBold', sans-serif;
    font-size: 16px;
    color: white;
    background: ${(props) => rgba(props.theme.colors.lemon, 1)};
    padding: 10px 28px;
    margin-left: 30px;
    border-radius: 3px;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;
