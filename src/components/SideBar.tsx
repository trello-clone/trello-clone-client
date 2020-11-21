import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import homeIcon from '../icons/home-2.svg';
import blackHomeIcon from '../icons/black-home.svg';
import teamIcon from '../icons/team-white.svg';
import blackTeamIcon from '../icons/black-team.svg';

const SideBar = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <Link to="/">
        <SideNavItem>
          <Icon active={location.pathname === '/'} src={location.pathname === '/' ? homeIcon : blackHomeIcon} alt="Home Icon" />
        </SideNavItem>
      </Link>
      <Link to="/teams">
        <SideNavItem>
          <Icon active={location.pathname === '/teams'} src={location.pathname === '/teams' ? teamIcon : blackTeamIcon} alt="Team Icon" />
        </SideNavItem>
      </Link>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.div`
  width: 70px;
  position: fixed;
  z-index: -1;
  top: 80px;
  left: 0;
  bottom: 0;
`;

const SideNavItem = styled.button`
  padding: 0;
  border: none;
  border-radius: 2px;
  font-size: 25px;
  display: flex;
  margin: auto;
  margin-bottom: 21px;
  &:first-child {
    margin-top: 17.5px;
  }
  cursor: pointer;
`;

const Icon = styled.img<{ active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 2.5px;
  background: ${(props) => props.active && props.theme.colors.orange};
  padding: 9px;
`;
