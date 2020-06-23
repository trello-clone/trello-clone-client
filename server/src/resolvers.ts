import { API } from './api';
import { Resolvers, User, Board, Team, List, Card, DeletedItem} from './types';
import { GraphQLScalarType } from 'graphql';

export const resolvers: Resolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => value,
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.kind),
    }),
    Query: {
        users: (parent, args) => API.get(`/users${args.keyword ? `?filter=${args.keyword}&metafields=true` : ''}`).then((res) => res.data as User[]),
        user: (parent, args) => API.get(`/users/${args.id}?metafields=true`).then((res) => res.data as User),
        boards: (parent, args) => API.get(`/board?metafields=true`).then((res) => res.data as Board[]),
        board: (parent, args) => API.get(`/board/${args.id}?metafields=true`).then((res) => res.data as Board),
        teams: (parent, args) => API.get(`/team?metafields=true`).then((res) => res.data as Team[]),
        lists: (parent, args) => API.get(`/list?metafields=true?q={"board_id":"${args.board_id}"}`).then((res) => res.data as List[]),
    },
    Mutation: {
        createBoardByMembers: (parent, args) => API.post(`/board`, { ...args }).then((res) => res.data as Board),
        createBoardByTeam: (parent, args) => API.post(`/board`, { ...args }).then((res) => res.data as Board),
        createTeam: (parent, args) => API.post(`/team`, { ...args }).then((res) => res.data as Team),
        createList: (parent, args) => API.post(`/list`, { ...args }).then((res) => res.data as List),
        updateListOrder: (parent, args) =>
            API.patch(`/board/${args.board_id}`, { lists_order: args.lists_order }).then((res) => res.data as Board),
        updateCardsInList: (parent, args) =>
            API.patch(`/list/${args.list_id}`, { cards: args.cards, cards_order: args.cards_order }).then((res) => res.data as List),
        createCard: (parent, args) => API.post(`/card`, { ...args }).then((res) => res.data as Card),
        deleteBoard: (parent, args) => API.delete(`/board/${args.id}`).then((res)=> res.data as DeletedItem),
        deleteTeam: (parent, args) => API.delete(`/team/${args.id}`).then((res)=> res.data as DeletedItem),
        updateTeam: (parent, args) => API.put(`/team/${args.id}`,{...args}).then((res) => res.data as Team ),
        updateBoard: (parent, args) => API.put(`/board/${args.id}`,{...args}).then((res) => res.data as Board ),
    },
    Team: {
        __resolveType: (obj) => {
            if (!obj.members || !obj.members.length) {
                return null;
            }
            if (typeof obj.members[0] === 'string') {
                return 'TeamWithMemberID';
            }
            return 'TeamWithMemberObj';
        },
    },
};
