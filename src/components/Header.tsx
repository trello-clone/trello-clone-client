import React, {useContext} from 'react';
import styled from 'styled-components';
import boardIcon from '../icons/add-board.svg';
import userIcon from '../icons/users-mmm-white.svg';
import userAva from '../icons/ray.jpg';
import searchIcon from '../icons/search.svg';
import { DialogContext, ModalTypes, CreateBoardOptions } from "../contexts/DialogContext";


const Header = () => {
    const context = useContext(DialogContext);
    
    return (

        <AppHeader>
            <SearchBox>
                <SearchInput type="text" placeholder="Search something..." />
                <SearchButton href="#">
                    <SearchIcon src={searchIcon} alt="search"></SearchIcon>
                </SearchButton>
            </SearchBox>
            <List>
                <ListItem>
                    <ListBtn addBoard onClick={()=>{context.openModal!({modalType: ModalTypes.CreateBoard, createBoardOption: CreateBoardOptions.ByMembers})}}>
                        <Icon src={boardIcon} alt="board"></Icon>
                    </ListBtn>
                </ListItem>
                <ListItem>
                    <ListBtn onClick={()=>{context.openModal!({modalType: ModalTypes.CreateTeam})}}>
                        <Icon src={userIcon} alt="user"></Icon>
                    </ListBtn>
                </ListItem>
                <ListItem>
                    <UserAva />
                </ListItem>
            </List>
            <Username>Thomas Eton</Username>
        </AppHeader>

    );
};

export default Header;

const AppHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 40px;
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

const ListBtn = styled.button<{addBoard?: any}>`
    padding: 0;
    height: 42px;
    width: 42px;
    border-radius: 2.5px;
    border: none;
    box-shadow: 0 1.5px 4px 0 rgba(0, 0, 0, 0.08);
    background-color: ${props => props.addBoard ?  props.theme.colors.lemon : props.theme.colors.dark_blue};
    cursor: pointer;
`;

const Icon = styled.img`
    height: 20px;
    width: 20px;
`;

const UserAva = styled.button`
    padding: 0;
    height: 42px;
    width: 42px;
    border-radius: 2.5px;
    border: none;
    box-shadow: 0 1.5px 4px 0 rgba(0, 0, 0, 0.08);
    background-image: url(${userAva});
    background-size: 42px;
`;

const Username = styled.div`
    font-family: 'ProximaNovaSemiBold', sans-serif;
    font-size: 14px;
    line-height: 1.25;
    margin-left: 10px;
    color: #0c1226;
`;

const SearchBox = styled.div`
    background: #f8fafc;
    width: 222px;
    height: 42px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
`;
const SearchButton = styled.a`
    width: 32px;
    height: 42px;
    display: flex;
    align-items: center;
`;
const SearchInput = styled.input`
    border: none;
    background: none;
    outline: none;
    padding: 0;
    font-size: 12px;
    margin-left: 12.5px;
    flex-grow: 2;
`;
const SearchIcon = styled.img`
    width: 15px;
    height: 15px;
`;
