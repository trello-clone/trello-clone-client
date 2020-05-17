import React from 'react';
// import gql from 'graphql-tag';
// import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import TeamCard from './components/TeamCard';
import BoardCard from './components/BoardCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

// import { User } from './types.js';

// const USERS_QUERY = gql`
//     {
//         users(max: 10) {
//             _id
//             name
//         }
//     }
// `;

function App() {
    return (
        <>
            <Header />
            <SideBar />
            <DashBoardWrapper>
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
            </DashBoardWrapper>
        </>

        // GrapqhQL query example
        // <Query query={USERS_QUERY}>
        //     {({ loading, error, data }: QueryResult) => {
        //         if (loading) return <div>Loading...</div>;
        //         if (error) return <div>Error: {error.message}</div>;
        //         return (
        //             <div>
        //                 {(data.users as User[]).map((user, index) => (
        //                     <div key={index}>
        //                         <h2>{user._id}</h2>
        //                         <h3>{user.name}</h3>
        //                         <br />
        //                     </div>
        //                 ))}
        //             </div>
        //         );
        //     }}
        // </Query>
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
const CardWrapper = styled.div`
    margin-left: 30.5px;
`;
const BoardContainer = styled.div`
    position: relative;
    z-index: 1;
`;

const TeamContainer = styled.div`
    font-family: 'ProximaNovaBold', sans-serif;
    position: relative;
    z-index: 1;
`;
