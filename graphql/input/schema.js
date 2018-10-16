const typeDefs = `
type Query {
  allSubscribers: [Subscriber]
  subscriber(id: ID): Subscriber
}

type Mutation {
  addSubscriber(username: String!, email: String!): Subscriber
  confirmSubscriber(id: ID): Subscriber
  deleteSubscriber(id: ID!): String
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
`
export default typeDefs
