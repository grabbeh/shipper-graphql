"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const typeDefs = `
type Query {
  allSubscribers: [Subscriber]
}

type Mutation {
  addSubscriber(username: String!, email: String!): Subscriber
}

type Subscriber {
  id: ID
  username: String
  email: String
  isConfirmed: Boolean
  lastEmailed: Date
}

input PostSubscriber {
  username: String
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