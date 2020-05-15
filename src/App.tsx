import React from 'react';
import styled from 'styled-components';
import TeamCard from './components/TeamCard';
import BoardCard from './components/BoardCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

const App = () => {
    return (
        <>
            <Header />
            <SideBar />
            <CardWrapper>
                <BoardContainer>
                    Boards
                    <BoardCard />
                </BoardContainer>
                <TeamContainer>
                    Teams
                    <TeamCard />
                </TeamContainer>
            </CardWrapper>
        </>
    );
};

export default App;

const BoardContainer = styled.div`
    margin-top: 100px;
`;

const TeamContainer = styled.div``;

const CardWrapper = styled.div`
    margin-left: 82px;
`;
