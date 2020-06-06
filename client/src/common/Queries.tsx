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

// The query is used to get the teams' info from the database
export const GET_TEAMS = gql`
    {
        teams {
            ... on TeamWithMemberObj {
                _id
                name
                description
                members {
                    _id
                    email
                    name
                }
                personal
            }
        }
    }
`;


/* ---------Mutation query-----------*/

// The mutation query is used to create a new board by members
export const CREATE_BOARD_BY_MEMBERS = gql`
    mutation createBoardByMembers($title: String!, $members: [ID!]!) {
        createBoardByMembers(title: $title, members: $members) {
            _id
            title
        }
    }
`;

// The mutation query is used to create a new board by team
export const CREATE_BOARD_BY_TEAM = gql`
    mutation createBoardByTeam($title: String!, $team: [ID!]!) {
        createBoardByTeam(title: $title, team: $team) {
            title
        }
    }
`;

// The mutation query is used to create a team 
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
