import React, { useContext, useEffect } from 'react';
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
import { ModalTypes, DialogContext, CreateBoardOptions } from './contexts/DialogContext';
import BoardView from './components/BoardView';
import { Board, Team, OpenModal } from './types';
import { GET_BOARDS, GET_TEAMS } from 'graphql/queries';

function App() {
  const context = useContext(DialogContext);
  const { data: boardData, loading: boardLoading, refetch: boardRefetch } = useQuery(GET_BOARDS);
  const { data: teamData, loading: teamLoading, refetch: teamRefetch } = useQuery(GET_TEAMS);
  // check if the selected board is personal board
  const isPersonalBoard = (board: Board) => !board.team || !board.team.length;
  // check if the selected board is NOT personal board
  const checkIfBoardHasTeam = (board: Board) => !!board.team && !!board.team.length;
  useEffect(() => {
    boardRefetch();
    teamRefetch();
  }, [boardRefetch, teamRefetch]);
  return (
    <Router>
      <Header />
      <SideBar />
      <MainContentWrapper>
        <Switch>
          <Route path="/board/:board_id">
            <BoardView />
          </Route>
          <Route path="/teams">
            <Title>Teams</Title>
            <TeamContainer>
              {!teamLoading && (teamData.teams as Team[]).map((team) => <TeamCard key={team._id} data={team} dataRefetch={teamRefetch} />)}
              <AddTeamCard />
            </TeamContainer>
          </Route>
          <Route path="/">
            <Title>Personal boards</Title>
            <BoardContainer>
              {!boardLoading &&
                (boardData.boards as Board[])
                  .filter(isPersonalBoard)
                  .map((board) => <BoardCard key={board._id} data={board} dataRefetch={boardRefetch} />)}
              <AddBoardCard createBoardOption={CreateBoardOptions.ByMembers} />
            </BoardContainer>
            {!teamLoading &&
              !boardLoading &&
              (teamData.teams as Team[]).map((team) => (
                <>
                  <Title key={team._id}>{team.name}</Title>
                  <BoardContainer>
                    {!boardLoading &&
                      (boardData.boards as Board[])
                        .filter(checkIfBoardHasTeam)
                        .filter((board) => board.team![0].name === team.name)
                        .map((board) => <BoardCard key={board._id} data={board} dataRefetch={boardRefetch} />)}
                    <AddBoardCard createBoardOption={CreateBoardOptions.ByTeam} boardData={team} />
                  </BoardContainer>
                </>
              ))}
          </Route>
        </Switch>
        {context.openModals.find((modal) => modal.modalType === ModalTypes.CreateBoard) !== undefined && (
          <CreateNewBoardModal
            dataRefetch={boardRefetch}
            boardData={context.openModals.find((modal) => modal.modalType === ModalTypes.CreateBoard) as OpenModal}
          />
        )}
        {context.openModals.find((modal) => modal.modalType === ModalTypes.CreateTeam) !== undefined && (
          <CreateNewTeamModal dataRefetch={teamRefetch} />
        )}
        {context.openModals.find((modal) => modal.modalType === ModalTypes.UpdateBoard) !== undefined && (
          <UpdateBoardModal
            dataRefetch={boardRefetch}
            boardData={context.openModals.find((modal) => modal.modalType === ModalTypes.UpdateBoard) as OpenModal}
          />
        )}
        {context.openModals.find((modal) => modal.modalType === ModalTypes.UpdateTeam) !== undefined && (
          <UpdateTeamModal
            dataRefetch={teamRefetch}
            teamData={context.openModals.find((modal) => modal.modalType === ModalTypes.UpdateTeam) as OpenModal}
          />
        )}
      </MainContentWrapper>
    </Router>
  );
}

export default App;

const MainContentWrapper = styled.div`
  background-color: ${(props) => rgba(props.theme.colors.blue, 0.03)};
  position: absolute;
  overflow-y: auto;
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
  font-size: 20px;
  font-family: 'ProximaNovaBold', sans-serif;
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
