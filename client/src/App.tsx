import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import TeamCard from './components/TeamCard';
import BoardCard from './components/BoardCard';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AddBoard from './components/AddBoardCard';
import AddTeam from './components/AddTeamCard';
import CreateNewBoardModal from './components/CreateNewBoardModal';
import { ModalTypes, DialogContext } from './contexts/DialogContext';

import { User } from './types.js';

const USERS_QUERY = gql`
    {
        users(max: 10) {
            _id
            name
        }
    }
`;

function App() {
    const context = useContext(DialogContext);
    return (
        <>
            
                <Header />
                <SideBar />
                <DashBoardWrapper>
                    <CardWrapper>
                        <Title>Boards</Title>
                        <BoardContainer>
                            <BoardCard />
                            <BoardCard />
                            <AddBoard></AddBoard>
                        </BoardContainer>
                        <Title>Teams</Title>
                        <TeamContainer>
                            <TeamCard />
                            <TeamCard />
                            <AddTeam />
                        </TeamContainer>
                    </CardWrapper>
                    {context.openModals.includes(ModalTypes.CreateBoard) && <CreateNewBoardModal />}
                </DashBoardWrapper>
                {/* // GrapqhQL query example */}
                <Query query={USERS_QUERY}>
                    {({ loading, error, data }: QueryResult) => {
                        if (loading) return <div>Loading...</div>;
                        if (error) return <div>Error: {error.message}</div>;
                        return (
                            <div>
                                {(data.users as User[]).map((user, index) => (
                                    <div key={index}>
                                        <h3>{user.name}</h3>
                                        <br />
                                    </div>
                                ))}
                            </div>
                        );
                    }}
                </Query>
            
        </>
    );
}

export default App;
const DashBoardWrapper = styled.div`
    height: calc(100vh - 100px);
    margin-left: 70px;
    margin-top: 80px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    &::after {
        content: '';
        background: rgba(248, 250, 252);
        width: calc(100vw - 51.5px);
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.9;
    }
`;

const Title = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
`;

const CardWrapper = styled.div`
    margin-left: 30.5px;
`;

const BoardContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
`;

const TeamContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
`;
