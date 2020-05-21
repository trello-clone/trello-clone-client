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
                <Icon src={teamIcon} alt="Team Icon" />
            </SideNavItem>
            <SideNavItem href="#">
                <Icon src={boardIcon} alt="Board Icon"/>
            </SideNavItem>
        </Wrapper>
    );
};

export default SideBar;

const Wrapper = styled.div`
    width: 70px;
    position: fixed;
    z-index: 1;
    top: 80px;
    left: 0;
    bottom: 0;
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
    width: 20px;
    height: 20px;
    border-radius: 2.5px;
    background: #fc8f66;
    padding: 9px;
    margin-top: 17.5px;
`;
const Icon = styled.img`
    width: 20px;
    height: 20px;
`;



