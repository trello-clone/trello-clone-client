import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

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
    return (
        <Query query={USERS_QUERY}>
            {({ loading, error, data }: QueryResult) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error: {error.message}</div>;
                return (
                    <div>
                        {(data.users as User[]).map((user, index) => (
                            <div key={index}>
                                <h2>{user._id}</h2>
                                <h3>{user.name}</h3>
                                <br />
                            </div>
                        ))}
                    </div>
                );
            }}
        </Query>
    );
}

export default App;
