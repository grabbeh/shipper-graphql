"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require("apollo-server-express");

var _resolvers = require("./resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRAPHQL_PORT = 9000;
const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default
});
const app = (0, _express2.default)();
server.applyMiddleware({
  app
});
app.listen({
  port: GRAPHQL_PORT
}, () => console.log(`🚀 Server ready at http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`));