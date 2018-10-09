import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './schema'

const GRAPHQL_PORT = 8000

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()
server.applyMiddleware({ app })

app.listen({ port: GRAPHQL_PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`
  )
)
