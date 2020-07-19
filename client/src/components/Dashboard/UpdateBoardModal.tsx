import React, { useContext, useRef, useEffect, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useMutation } from '@apollo/react-hooks';

import avatar from '../../icons/avatar.jpg';
import background from '../../icons/teamBackground.jpg';
import { DialogContext, ModalTypes } from '../../contexts/DialogContext';
import CustomSelect from './CustomSelect';
import { UPDATE_BOARD } from 'graphql/mutations';
import { Board, User, Team, OpenModal } from '../../types.js';

interface BoardCardProps {
    boardData: OpenModal;
    dataRefetch: any;
}

const UpdateBoardModal = (props: BoardCardProps) => {
    const { boardData, dataRefetch } = props;
    const teamOfBoard = boardData.dataType.team;
    const context = useContext(DialogContext);
    const modalRef = useRef<HTMLDivElement>(null);
    const [titleInput, setTitleInput] = useState(boardData.dataType.title || '');
    const [selectedItem, setSelectedItem] = useState<User[]>(boardData.dataType.members || undefined);
    const boardMemberName: string[] = [];
    const boardMemberID: string[] = [];
    if (selectedItem) {
        selectedItem.map((item) => boardMemberName.push(item.name));
        selectedItem.map((item) => boardMemberID.push(item._id));
    }
    const [selectedItemName, setSelectedItemName] = useState<string[]>(boardMemberName || '');
    const [selectedItemID, setSelectedItemID] = useState<string[]>(boardMemberID || '');
    // Graphql mutation to update a board
    const [updateBoard, { loading }] = useMutation<
        { boardUpdated: Board },
        { id: string; title: string; team?: string[]; members?: string[] }
    >(UPDATE_BOARD);

    // Close the modal by clicking outside
    const onClickOutside = (e: any) => {
        const element = e.target;
        if (modalRef.current && !modalRef.current.contains(element)) {
            e.preventDefault();
            e.stopPropagation();
            context.closeModal!({ modalType: ModalTypes.UpdateBoard });
        }
    };

    // handle changes from custom select
    const getSelectResult = (item: User) => {
        if (selectedItem && selectedItem.find((itemInArr) => itemInArr._id === item._id) === undefined) {
            setSelectedItem(selectedItem.concat(item));
            setSelectedItemName(selectedItemName.concat(item.name));
            setSelectedItemID(selectedItemID.concat(item._id));
        }
    };

    // Handle changes of a board's title
    const handleTitleChange = (input: any) => {
        setTitleInput(input.target.value);
    };

    const handleUpdateBoard = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        updateBoard({ variables: { id: boardData.dataType._id, title: titleInput, members: selectedItemID } });
        if (!loading) {
            dataRefetch();
        }
        context.closeModal!({ modalType: ModalTypes.UpdateBoard });
    };

    useEffect(() => {
        document.body.addEventListener('click', onClickOutside);
        return () => window.removeEventListener('click', onClickOutside);
    });

    return (
        <Container>
            <Modal ref={modalRef}>
                <Header>Update board</Header>
                {teamOfBoard && teamOfBoard.length !== 0 ? (
                    <SectionTitle>Your team</SectionTitle>
                ) : (
                    <SectionTitle>Add a team to your board</SectionTitle>
                )}
                <TeamContainer>
                    {teamOfBoard &&
                        (teamOfBoard as Team[]).map((team) => (
                            <TeamItem>
                                <TeamImage src={background} alt="background" />
                                <TeamLabel>{team.name}</TeamLabel>
                            </TeamItem>
                        ))}
                    {(!teamOfBoard || teamOfBoard.length === 0) && (
                        <AddBtn
                        // onClick={() => {
                        //     context.openModalByType!(ModalTypes.CreateTeam);
                        // }}
                        >
                            +
                        </AddBtn>
                    )}
                </TeamContainer>

                {/* <MemberAvatar src={avatar} />
                <MemberAvatar src={avatar} /> */}
                <CustomSelect selectItems={getSelectResult} />
                <MemberContainer>
                    <MemberList>
                        {selectedItemName.map((item: String, index: any) => (
                            <Member key={index}>{item}</Member>
                        ))}
                    </MemberList>
                    <MemberAvatar src={avatar} />
                </MemberContainer>
                <Input onChange={handleTitleChange} type="text" placeholder="Title" value={titleInput} />
                <SectionTitle>Select background</SectionTitle>
                <BackgroundContainer>
                    <BackgroundItem src={background} alt="background" />
                    <BackgroundItem src={background} alt="background" />
                </BackgroundContainer>
                <ButtonContainer>
                    <CancelButton
                        onClick={() => {
                            context.closeModal!({ modalType: ModalTypes.UpdateBoard });
                        }}
                    >
                        Cancel
                    </CancelButton>
                    <UpdateBoardBtn onClick={handleUpdateBoard}>Update</UpdateBoardBtn>
                </ButtonContainer>
            </Modal>
        </Container>
    );
};

export default UpdateBoardModal;

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
    margin-bottom: 20px;
`;

const Input = styled.input`
    font-family: 'ProximaNovaMedium', sans-serif;
    height: 23px;
    width: 348px;
    outline: 0;
    border: 0;
    padding-bottom: 5px;
    padding-right: 0;
    margin-bottom: 20px;
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
const TeamItem = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin-right: 12px;
`;
const AddBtn = styled.button`
    width: 70px;
    height: 70px;
    border-radius: 4px;
    border: solid 2px ${(props) => rgba(props.theme.colors.dark_blue, 1)};
    border-style: dashed;
    opacity: 0.25;
    font-size: 30px;
    font-family: 'ProximaNovaMedium', sans-serif;
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
    font-family: 'ProximaNovaMedium', sans-serif;
    color: ${(props) => rgba(props.theme.colors.black, 1)};
    font-size: 12px;
`;

const SectionTitle = styled.div`
    margin-bottom: 10px;
    font-family: 'ProximaNovaMedium', sans-serif;
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

const UpdateBoardBtn = styled.button`
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
