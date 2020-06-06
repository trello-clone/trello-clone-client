import gql from 'graphql-tag';

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

export const CREATE_LIST = gql`
    mutation createList($board_id: ID!, $title: String!) {
        createList(board_id: $board_id, title: $title) {
            _id
        }
    }
`;

export const UPDATE_LISTS_ORDER = gql`
    mutation updateListOrder($board_id: ID!, $lists_order: String!) {
        updateListOrder(board_id: $board_id, lists_order: $lists_order) {
            _id
        }
    }
`;

export const CREATE_CARD = gql`
    mutation createCard($title: String!) {
        createCard(title: $title) {
            _id
            title
            description
            _created
            _changed
        }
    }
`;

export const UPDATE_CARDS_IN_LIST = gql`
    mutation updateCardsInList($list_id: ID!, $cards: [CardInput]!, $cards_order: String!) {
        updateCardsInList(list_id: $list_id, cards: $cards, cards_order: $cards_order) {
            _id
        }
    }
`;
