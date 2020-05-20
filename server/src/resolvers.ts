import { API } from './api';
import { Resolvers, User, Board, Team } from './types';
import { GraphQLScalarType } from 'graphql';

export const resolvers: Resolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.kind),
    }),
    Query: {
        users: (parent, args) => API.get(`/users${args.max ? `?max=${args.max}` : ''}`).then((res) => res.data as User[]),
        user: (parent, args) => API.get(`/users/${args.id}`).then((res) => res.data as User),
        boards: (parent, args) => API.get(`/board`).then((res) => {console.log(res.data[0].team); return res.data as Board[]}),
        teams: (parent, args) => API.get(`/team`).then((res) => res.data as Team[]),
    },
    Mutation: {
        createBoardByMembers: (parent, args) => API.post(`/board`, { ...args }).then((res) => res.data as Board),
        createBoardByTeam: (parent, args) => API.post(`/board`, { ...args }).then((res) => res.data as Board),
        createTeam: (parent, args) => API.post(`/team`, { ...args }).then((res) => res.data as Team),
    },
    Team: {
        __resolveType: obj => {
            if (!obj.members || !obj.members.length) {
                return null;
            }
            if (typeof obj.members[0] === 'string') {
                return "TeamWithMemberID";
            }
            return "TeamWithMemberObj"
        }
    }
};
