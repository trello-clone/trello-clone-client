import React from 'react';
import styled from 'styled-components';
import homeIcon from '../icons/home-2.svg';
import teamIcon from '../icons/users-mm-3.svg';
import boardIcon from '../icons/board-2.svg';

const SideBar = () => {
    return (
        <Wrapper>
            <SideNavItem href="#">
                <HomeIcon src={homeIcon} alt="Home Icon" />
            </SideNavItem>
            <SideNavItem href="#">
                <TeamIcon src={teamIcon} alt="Team Icon" />
            </SideNavItem>
            <SideNavItem href="#">
                <BoardIcon src={boardIcon} alt="Board Icon"/>
            </SideNavItem>
        </Wrapper>
    );
};

export default SideBar;

const Wrapper = styled.div`
    width: 51.5px;
    position: fixed;
    z-index: 1;
    top: 77.5px;
    left: 0;
`;

const SideNavItem = styled.a`
    text-decoration: none;
    font-size: 25px;
    display: block;
    display: flex;
    justify-content: center;
    margin-bottom: 21px;
    cursor: pointer;
`;

const HomeIcon = styled.img`
    width: 13.5px;
    height: 13.5px;
    border-radius: 2.5px;
    background: #fc8f66;
    padding: 9px;
`;
const TeamIcon = styled.img`
    width: 15px;
    height: 12.7px;
`;

const BoardIcon = styled.img`
    width: 15px;
    height: 12.7px;
`;

