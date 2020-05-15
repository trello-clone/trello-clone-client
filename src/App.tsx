import React from 'react';
import TeamCard from './components/TeamCard';
import BoardCard from './components/BoardCard';
import Header from './components/Header';
import styled from 'styled-components';

const App = () => {
    return (
        <>
            <Header />
            <BoardContainer>
                Boards
                <BoardCard />
            </BoardContainer>
            <TeamContainer>
                Teams
                <TeamCard />
            </TeamContainer>
        </>
    );
};

export default App;

const BoardContainer = styled.div`
    margin-top: 100px;
`;

const TeamContainer = styled.div``;
