import gql from 'graphql-tag';

// Query to fetch boards' data from database
export const GET_BOARDS = gql`
  query {
    boards {
      _id
      title
      members {
        _id
        name
        email
        avatar
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

// Query tp get the teams' info from the database
export const GET_TEAMS = gql`
  {
    teams {
      ... on TeamWithMemberObj {
        _id
        name
        description
        members {
          _id
          name
          email
          avatar
          _created
        }
        personal
        _created
        _changed
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
        email
        avatar
        _created
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
        members
        _created
        _changed
      }
    }
  }
`;

// Query to request a user from database with specific keywords
export const GET_USERS = gql`
  query users($keyword: String!) {
    users(keyword: $keyword) {
      _id
      name
      email
      avatar
      _created
    }
  }
`;
