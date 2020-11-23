import React, { useState } from 'react';
import styled from 'styled-components';

import archiveIcon from '../../icons/BoardCard/archive.svg';
import attachmentIcon from '../../icons/BoardCard/attachment.svg';
import checklistIcon from '../../icons/BoardCard/checklist.svg';
import copyIcon from '../../icons/BoardCard/copy.svg';
import dueDateIcon from '../../icons/BoardCard/duedate.svg';
import addLabelIcon from '../../icons/BoardCard/label.svg';
import moveIcon from '../../icons/BoardCard/move.svg';
import { UtilButton, BtnDescription, Icon } from '../common/ModalComponents';
import { User } from '../../types.js';
import AddMemberPopover from '../AddMemberPopover';

const SideBarInCard = () => {
  const [selectedItem, setSelectedItem] = useState<User[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<String[]>([]);
  const [selectedItemID, setSelectedItemID] = useState<String[]>([]);

  // handle changes from custom select
  const getSelectResult = (item: User) => {
    if (selectedItem.find((itemInArr) => itemInArr === item) === undefined) {
      setSelectedItem(selectedItem.concat(item));
      setSelectedItemName(selectedItemName.concat(item.name));
      setSelectedItemID(selectedItemID.concat(item._id));
    }
  };

  // deselect the item from the selectedItem arr
  const deselectItem = (name: string) => {
    const index = selectedItem.findIndex((user) => user.name === name);

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

  return (
    <Wrapper>
      <ModuleTitle>Add to card</ModuleTitle>
      <AddMemberPopover
        isSideBar
        selectItems={getSelectResult}
        memberNames={selectedItemName}
        deselectMember={deselectItem}
      />
      <UtilButton>
        <Icon src={addLabelIcon} />
        <BtnDescription>Labels</BtnDescription>
      </UtilButton>
      <UtilButton>
        <Icon src={checklistIcon} />
        <BtnDescription>Checklist</BtnDescription>
      </UtilButton>
      <UtilButton>
        <Icon src={dueDateIcon} />
        <BtnDescription>Due Date</BtnDescription>
      </UtilButton>
      <UtilButton>
        <Icon src={attachmentIcon} />
        <BtnDescription>Attachment</BtnDescription>
      </UtilButton>
      <ModuleTitle>Actions</ModuleTitle>
      <UtilButton>
        <Icon src={moveIcon} />
        <BtnDescription>Move</BtnDescription>
      </UtilButton>
      <UtilButton>
        <Icon src={copyIcon} />
        <BtnDescription>Copy</BtnDescription>
      </UtilButton>
      <UtilButton>
        <Icon src={archiveIcon} />
        <BtnDescription>Archive</BtnDescription>
      </UtilButton>
    </Wrapper>
  );
};
export default SideBarInCard;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
`;

const ModuleTitle = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;
