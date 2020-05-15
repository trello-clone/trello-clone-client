import { API } from './api';
import { Resolvers, User } from './types';

export const resolvers: Resolvers = {
    Query: {
        users: (parent, args) => API.get(`/tc-user${args.max ? `?max=${args.max}` : ''}`).then(res => res.data as User[]),
        user: (parent, args) => API.get(`/tc-user/${args.id}`).then(res => res.data as User)
    },
};