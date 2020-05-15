import React from 'react';
import styled from 'styled-components';
import boardIcon from '../icons/add-board.svg';
import userIcon from '../icons/users-mmm-white.svg';
import userAva from '../icons/ray.jpg';
import searchIcon from '../icons/search.svg';

const Header = () => {
    return (
        <PageHeader>
            <PageWrapper>
                <SearchBox>
                    <SearchInput type="text" placeholder="Search something..." />
                    <SearchButton href="#">
                        <SearchIcon src={searchIcon} alt="search"></SearchIcon>
                    </SearchButton>
                </SearchBox>
                <List>
                    <ListItem>
                        <BoardButton>
                            <Icon src={boardIcon} alt="board"></Icon>
                        </BoardButton>
                    </ListItem>
                    <ListItem>
                        <TeamButton>
                            <Icon src={userIcon} alt="user"></Icon>
                        </TeamButton>
                    </ListItem>
                    <ListItem>
                        <UserAva />
                    </ListItem>
                </List>
                <Username>Thomas Eton</Username>
            </PageWrapper>
        </PageHeader>
    );
};

export default Header;

const PageHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;

`;
const PageWrapper = styled.div`
    display: flex;
    margin-top: 16px;
    height: 26.5px;
    align-items: center;
`;

const List = styled.ul`
    display: flex;
    flex-flow: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    margin-left: 12.5px;
`;
const BoardButton = styled.button`
    padding: 0;
    height: 27px;
    width: 27px;
    border-radius: 2.5px;
    border: none;
    box-shadow: 0 1.5px 4px 0 rgba(0, 0, 0, 0.08);
    background-color: #d4db26;
    cursor: pointer;
`;
const TeamButton = styled.button`
    padding: 0;
    height: 27px;
    width: 27px;
    border-radius: 2.5px;
    border: none;
    box-shadow: 0 1.5px 4px 0 rgba(0, 0, 0, 0.08);
    background-color: #214b8d;
    cursor: pointer;
`;

const Icon = styled.img`
    height: 11.9px;
    width: 14.5px;
`;

const UserAva = styled.button`
    padding: 0;
    height: 27px;
    width: 27px;
    border-radius: 2.5px;
    border: none;
    box-shadow: 0 1.5px 4px 0 rgba(0, 0, 0, 0.08);
    background-image: url(${userAva});
    background-size: 27px;
`;

const Username = styled.div`
    height: 10px;
    font-size: 8px;
    font-weight: 600;
    line-height: 1.25;
    margin-left: 10px;
    color: #0c1226;
`;

const SearchBox = styled.div`
    background: #f8fafc;
    width: 155px;
    height: 27px;
    border-radius: 5px;
    margin-left: 586.5px;
`;
const SearchButton = styled.a`
    color: #e84118;
    float: right;
    width: 27px;
    height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SearchInput = styled.input`
    border: none;
    background: none;
    outline: none;
    padding: 0;
    margin-left: 12.5px;
    font-size: 7px;
    line-height: 27px;
`;
const SearchIcon = styled.img`
    width: 10px;
    height: 10px;
`;
