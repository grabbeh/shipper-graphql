import { Subscriber } from './connectors'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      return new Date(value) // value from the client
    },
    serialize (value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    }
  }),
  Query: {},
  Mutation: {
    addSubscriber: async (root, { email, username }, context) => {
      let existingSubscriber = await Subscriber.findOne({ email })
      if (existingSubscriber) return new Error('EXISTING_SUBSCRIPTION')
      else return Subscriber.create({ email, username })
    }
  }
}

export default resolvers
