import React from 'react';
import styled from 'styled-components';

import archiveIcon from '../../icons/BoardCard/archive.svg';
import attachmentIcon from '../../icons/BoardCard/attachment.svg';
import checklistIcon from '../../icons/BoardCard/checklist.svg';
import copyIcon from '../../icons/BoardCard/copy.svg';
import dueDateIcon from '../../icons/BoardCard/duedate.svg';
import addMemberIcon from '../../icons/BoardCard/Group 40.svg';
import addLabelIcon from '../../icons/BoardCard/label.svg';
import moveIcon from '../../icons/BoardCard/move.svg';
import { UtilButton, BtnDescription, Icon } from '../common/ModalComponents';

const SideBarInCard = () => {
    return (
        <Wrapper>
            <ModuleTitle>Add to card</ModuleTitle>
            <UtilButton>
                <Icon addMember src={addMemberIcon} />
                <BtnDescription>Members</BtnDescription>
            </UtilButton>
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
