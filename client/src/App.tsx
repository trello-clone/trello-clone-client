import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { rgba } from 'polished';

import TeamCard from './components/Dashboard/TeamCard';
import BoardCard from './components/Dashboard/BoardCard';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AddBoardCard from './components/Dashboard/AddBoardCard';
import AddTeamCard from './components/Dashboard/AddTeamCard';
import CreateNewBoardModal from './components/Dashboard/CreateNewBoardModal';
import CreateNewTeamModal from './components/Dashboard/CreateNewTeamModal';
import UpdateTeamModal from './components/Dashboard/UpdateTeamModal';
import UpdateBoardModal from './components/Dashboard/UpdateBoardModal';
import { ModalTypes, DialogContext } from './contexts/DialogContext';
import BoardView from './components/BoardView';
import { Board, Team} from './types';
import { GET_BOARDS, GET_TEAMS } from 'graphql/queries';

function App() {
    const context = useContext(DialogContext);
    const { data: boardData, loading: boardLoading, refetch: boardRefetch} = useQuery(GET_BOARDS);
    const { data: teamData, loading: teamLoading, refetch: teamRefetch} = useQuery(GET_TEAMS);
    const [needToRefetchBoard, setNeedToRefetchBoard] = useState(false)
    const [needToRefetchTeam, setNeedToRefetchTeam] = useState(false)
    const handleRefetchBoard = () => {
        setNeedToRefetchBoard(true)
    }
    const handleRefetchTeam = () => {
        setNeedToRefetchTeam(true)
    }
    useEffect(()=> {
        if(needToRefetchBoard === true){
            boardRefetch();
        }else if(needToRefetchTeam === true){
            teamRefetch();
        }
        return ()=>{
            setNeedToRefetchBoard(false)
            setNeedToRefetchTeam(false)
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
                            {!boardLoading && (boardData.boards as Board[]).map((board) => <BoardCard key={board._id} data={board} />)}
                            <AddBoardCard/>
                        </BoardContainer>
                        <Title>Teams</Title>
                        <TeamContainer>
                            {!teamLoading && (teamData.teams as Team[]).map((team) => <TeamCard key={team._id} data={team} />)}
                            <AddTeamCard />
                        </TeamContainer>
                        {context.openModals.includes(ModalTypes.CreateBoard) && <CreateNewBoardModal dataRefetch={handleRefetchBoard}/>}
                        {context.openModals.includes(ModalTypes.CreateTeam) && <CreateNewTeamModal dataRefetch={handleRefetchTeam}/>}
                        {context.openModals.includes(ModalTypes.UpdateTeam) && <UpdateTeamModal teamData={context.modalData as Team}/>}
                        {context.openModals.includes(ModalTypes.UpdateBoard) && <UpdateBoardModal boardData={context.modalData as Board}/>}
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
