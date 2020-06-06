import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { rgba } from 'polished';

import TeamCard from './components/TeamCard';
import BoardCard from './components/BoardCard';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AddBoardCard from './components/AddBoardCard';
import AddTeamCard from './components/AddTeamCard';
import CreateNewBoardModal from './components/CreateNewBoardModal';
import CreateNewTeamModal from './components/CreateNewTeamModal';
import { ModalTypes, DialogContext } from './contexts/DialogContext';
import BoardView from './components/BoardView';
import { Board } from './types.js';
import { GET_BOARDS } from './common/Queries'

function App() {
    const context = useContext(DialogContext);
    const { data, loading, refetch} = useQuery(GET_BOARDS);
    const [needToRefetch, setNeedToRefetch] = useState(false)
    const handleRefetchBoardData = () => {
        setNeedToRefetch(true)
    }
    useEffect(()=> {
        if(needToRefetch === true){
            refetch()
        }
        return ()=>{
            setNeedToRefetch(false)
        }
    })
    return (
        <Router>
            <Header />
            <SideBar />
            <MainContentWrapper>
                <Switch>
                    <Route path="/board/:board_id">
                        <BoardView />
                    </Route>
                    <Route path="/">
                        <Title>Boards</Title>
                        <BoardContainer>
                            {!loading && (data.boards as Board[]).map((board) => <BoardCard key={board._id} data={board} />)}
                            <AddBoardCard/>
                        </BoardContainer>
                        <Title>Teams</Title>
                        <TeamContainer>
                            <TeamCard />
                            <TeamCard />
                            <AddTeamCard />
                        </TeamContainer>
                        {context.openModals.includes(ModalTypes.CreateBoard) && <CreateNewBoardModal dataRefetch={handleRefetchBoardData}/>}
                        {context.openModals.includes(ModalTypes.CreateTeam) && <CreateNewTeamModal dataRefetch={handleRefetchBoardData}/>}
                    </Route>
                </Switch>
            </MainContentWrapper>
        </Router>
    );
}

export default App;

const MainContentWrapper = styled.div`
    background-color: ${(props) => rgba(props.theme.colors.blue, 0.03)};
    position: fixed;
    top: 80px;
    left: 70px;
    right: 0;
    bottom: 0;
    border-top-left-radius: 20px;
    padding: 24px 36px;
`;

const Title = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
`;

const BoardContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding-bottom: 16px;
`;

const TeamContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;
