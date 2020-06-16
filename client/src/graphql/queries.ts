import gql from 'graphql-tag';

// The query is used to fetch boards' data from database
export const GET_BOARDS = gql`
    query {
        boards {
            _id
            title
            members {
                _id
                name
                email
                _created
            }
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
                _created
            }
        }
    }
`;

export const GET_BOARD = gql`
    query board($id: ID!) {
        board(id: $id) {
            _id
            title
            team {
                ... on TeamWithMemberID {
                    _id
                    name
                }
            }
            members {
                _id
                name
            }
            background
            lists_order
            _created
            _changed
        }
    }
`;

export const GET_LISTS_BY_BOARD_ID = gql`
    query lists($board_id: ID!) {
        lists(board_id: $board_id) {
            _id
            title
            board_id
            cards_order
            cards {
                _id
                title
                description
                _created
                _changed
            }
        }
    }
`;
