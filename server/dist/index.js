"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers_1 = require("./resolvers");
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: 'schema/schema.graphql',
    resolvers: resolvers_1.resolvers,
});
var options = {
    port: 3000,
    endpoint: '/api',
    playground: '/playground',
};
server.start(options, function () {
    console.log("Graphql server is running on http://localhost:" + options.port + options.endpoint);
    console.log("The GraphQL playground is running on http://localhost:" + options.port + options.playground);
});
