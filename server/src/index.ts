import { GraphQLServer, Options } from 'graphql-yoga';
import { resolvers } from './resolvers';

const server = new GraphQLServer({
    typeDefs: 'schema/schema.graphql',
    resolvers: resolvers as any,
});

const options: Options = {
    port: 4000,
    endpoint: '/api',
    playground: '/playground',
};

server.start(options, () => {
    console.log(`Graphql server is running on http://localhost:${options.port}${options.endpoint}`);
    console.log(`The GraphQL playground is running on http://localhost:${options.port}${options.playground}`);
});
