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

const BoardContainer = styled.div`
    margin-top: 100px;
`;

const TeamContainer = styled.div``;

const CardWrapper = styled.div`
    margin-left: 82px;
`;