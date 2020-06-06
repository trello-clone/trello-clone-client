import gql from 'graphql-tag';

// The query is used to fetch boards' data from database
export const GET_BOARDS = gql`
    query {
        boards {
            _id
            title
            team {
                ... on TeamWithMemberID {
                    _id
                    name
                    description
                    members
                    personal
                }
            }
            background
            _created
            _changed
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation createTeam($name: String!, $members: [ID!]!) {
        createTeam(name: $name, members: $members) {
            __typename
            ... on TeamWithMemberObj {
                _id
                name
                members {
                    _id
                    name
                    avatar
                    _created
                }
                personal
            }
        }
    }
`;
