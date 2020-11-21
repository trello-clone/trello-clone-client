import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useMutation } from '@apollo/react-hooks';

import avatar from '../../icons/avatar.jpg';
import background from '../../icons/teamBackground.jpg';
import { Backdrop, Input } from '../common/ModalComponents';
import { DialogContext, ModalTypes } from '../../contexts/DialogContext';
import CustomSelect from '../CustomSelect';
import { UPDATE_TEAM } from 'graphql/mutations';
import { Team, User, OpenModal } from '../../types.js';
import { useOnClickOutside } from '../../utils/index';

interface TeamCardProps {
  teamData: OpenModal;
  dataRefetch: any;
}

const UpdateTeamModal = (props: TeamCardProps) => {
  const { teamData, dataRefetch } = props;
  const context = useContext(DialogContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const [teamName, setTeamName] = useState(teamData.dataType.name || '');
  const [selectedItem, setSelectedItem] = useState<User[]>((teamData.dataType.members as User[]) || undefined);
  const teamMemberName: string[] = [];
  const teamMemberID: string[] = [];
  if (selectedItem) {
    selectedItem.map((item) => teamMemberName.push(item.name));
    selectedItem.map((item) => teamMemberID.push(item._id));
  }
  const [selectedItemName, setSelectedItemName] = useState<string[]>(teamMemberName || '');
  const [selectedItemID, setSelectedItemID] = useState<string[]>(teamMemberID || '');

  // Graphql mutation to update a team
  const [updateTeam, { loading }] = useMutation<{ teamUpdate: Team }, { id: String; name: String; members: String[] }>(UPDATE_TEAM);

  // handle changes from custom select
  const getSelectResult = (item: any) => {
    if (selectedItem && selectedItem.find((itemInArr) => itemInArr._id === item._id) === undefined) {
      setSelectedItem(selectedItem.concat(item));
      setSelectedItemName(selectedItemName.concat(item.name));
      setSelectedItemID(selectedItemID.concat(item._id));
    }
  };

  const handleTeamNameChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(input.target.value);
  };

  const handleUpdateTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    updateTeam({ variables: { id: teamData.dataType._id, name: teamName, members: teamMemberID } });
    if (!loading) {
      dataRefetch();
    }
    context.closeModal!({ modalType: ModalTypes.UpdateTeam });
  };

  const cancelUpdateTeam = () => {
    context.closeModal!({ modalType: ModalTypes.UpdateTeam });
  };

  useOnClickOutside(modalRef, cancelUpdateTeam);
  return (
    <Backdrop>
      <Modal ref={modalRef}>
        <Header>Update team</Header>
        <Input cardType="team" onChange={handleTeamNameChange} type="text" placeholder="Enter team's name" value={teamName} />
        <CustomSelect selectItems={getSelectResult} />
        <MemberContainer>
          <MemberList>
            {selectedItemName.map((item: String, index: any) => (
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
          <CancelButton onClick={cancelUpdateTeam}>Cancel</CancelButton>
          <UpdateBtn onClick={handleUpdateTeam}>Update</UpdateBtn>
        </ButtonContainer>
      </Modal>
    </Backdrop>
  );
};

export default UpdateTeamModal;

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
  font-family: 'ProximaNovaBold', sans-serif;
  font-size: 20px;
  margin-bottom: 36px;
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
  font-family: 'ProximaNovaSemiBold', sans-serif;
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
  font-family: 'ProximaNovaBold', sans-serif;
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
