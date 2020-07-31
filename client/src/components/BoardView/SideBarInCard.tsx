import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import archiveIcon from '../../icons/BoardCard/archive.svg';
import attachmentIcon from '../../icons/BoardCard/attachment.svg';
import checklistIcon from '../../icons/BoardCard/checklist.svg';
import copyIcon from '../../icons/BoardCard/copy.svg';
import dueDateIcon from '../../icons/BoardCard/duedate.svg';
import addMemberIcon from '../../icons/BoardCard/Group 40.svg';
import addLabelIcon from '../../icons/BoardCard/label.svg';
import moveIcon from '../../icons/BoardCard/move.svg';

const SideBarInCard = () => {
    return (
        <Wrapper>
            <ModuleTitle>Add to card</ModuleTitle>
            <SideBtn>
                <Icon addMember src={addMemberIcon} />
                <BtnDescription>Members</BtnDescription>
            </SideBtn>
            <SideBtn>
                <Icon src={addLabelIcon} />
                <BtnDescription>Labels</BtnDescription>
            </SideBtn>
            <SideBtn>
                <Icon src={checklistIcon} />
                <BtnDescription>Checklist</BtnDescription>
            </SideBtn>
            <SideBtn>
                <Icon src={dueDateIcon} />
                <BtnDescription>Due Date</BtnDescription>
            </SideBtn>
            <SideBtn >
                <Icon src={attachmentIcon} />
                <BtnDescription>Attachment</BtnDescription>
            </SideBtn>
            <ModuleTitle>Actions</ModuleTitle>
            <SideBtn>
                <Icon src={moveIcon} />
                <BtnDescription>Move</BtnDescription>
            </SideBtn>
            <SideBtn>
                <Icon src={copyIcon} />
                <BtnDescription>Copy</BtnDescription>
            </SideBtn>
            <SideBtn>
                <Icon src={archiveIcon} />
                <BtnDescription>Archive</BtnDescription>
            </SideBtn>
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
const SideBtn = styled.a`
    padding: 14px 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    background-color: ${(props) => rgba(props.theme.colors.blue, 0.1)};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:nth-child(6) {
        margin-bottom: 10px;
    }
    &:hover{
        cursor: pointer
    }
    &:active{
        background-color: ${(props) => rgba(props.theme.colors.blue, 0.2)};
    }
`;
const BtnDescription = styled.span`
    font-size: 14px;
`;
const Icon = styled.img<{ addMember?: any }>`
    position: absolute;
    left: 16px;
    height: ${(props) => (props.addMember ? '18px' : '16px')};
`;
