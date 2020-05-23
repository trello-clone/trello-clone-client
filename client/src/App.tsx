import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { rgba } from 'polished';

import TeamCard from './components/TeamCard';
import BoardCard from './components/BoardCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

import AddBoard from './components/AddBoardCard';
import AddTeam from './components/AddTeamCard';
import CreateNewBoardModal from './components/CreateNewBoardModal';
import { ModalTypes, DialogContext } from './contexts/DialogContext';

import BoardView from './components/BoardView';


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

        <Router>
              
                <Header />
                <SideBar />
                <Switch>
                    <Route path="/board/:board_id">
                      <BoardView />
                    </Route>
                    <Route path="/">
                      <DashBoardWrapper>
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
                          {context.openModals.includes(ModalTypes.CreateBoard) && <CreateNewBoardModal />}
                      </DashBoardWrapper>
                     </Route>
                  </Switch>
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
            
        </Router>

    );
}

export default App;
const DashBoardWrapper = styled.div`
    background-color: ${props => rgba(props.theme.colors.blue, 0.03)};
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
    padding-bottom: 16px;
`;

const TeamContainer = styled.div`

`;
