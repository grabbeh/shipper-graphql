"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const typeDefs = `
type Query {
  allSubscribers: [Subscriber]
}

type Mutation {
  addSubscriber(username: String!, email: String!): String
}

type Subscriber {
  id: ID
  email: String
  isConfirmed: Boolean
  lastEmailed: Date
}

input PostSubscriber {
  name: String
  email: String
  isConfirmed: Boolean
  lastEmailed: Date
}

scalar Date
type MyType {
   created: Date
}

schema {
  query: Query
  mutation: Mutation
 }
`;
exports.default = typeDefs;