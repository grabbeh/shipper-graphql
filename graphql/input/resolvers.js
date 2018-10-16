import { Subscriber } from './connectors'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { sendConfirmationEmail, confirmSubscription } from './confirm'

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
  Query: {
    subscriber: async (root, { id }, context) => {
      return Subscriber.findById(id)
    }
  },
  Mutation: {
    addSubscriber: async (root, { email, username }, context) => {
      let existingSubscriber = await Subscriber.findOne({ email })
      if (!existingSubscriber) {
        const subscriber = await Subscriber.create({ email, username })
        await sendConfirmationEmail(email, username, subscriber._id)
        return subscriber
      } else return new Error('EXISTING_SUBSCRIPTION')
    },
    confirmSubscriber: async (root, { id }, context) => {
      try {
        let subscriber = await confirmSubscription(id)
        return subscriber
      } catch (e) {
        return new Error(e)
      }
    },
    deleteSubscriber: async (root, { id }, context) => {
      let result = await Subscriber.deleteOne({ id })
      console.log(result)
      return result
    }
  }
}

export default resolvers
