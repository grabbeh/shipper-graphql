"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectors = require("./connectors");

var _graphql = require("graphql");

var _language = require("graphql/language");

var _confirm = require("./confirm");

const resolvers = {
  Date: new _graphql.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',

    parseValue(value) {
      return new Date(value); // value from the client
    },

    serialize(value) {
      return value.getTime(); // value sent to the client
    },

    parseLiteral(ast) {
      if (ast.kind === _language.Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }

      return null;
    }

  }),
  Query: {
    subscriber: async (root, {
      id
    }, context) => {
      return _connectors.Subscriber.findById(id);
    }
  },
  Mutation: {
    addSubscriber: async (root, {
      email,
      username
    }, context) => {
      let existingSubscriber = await _connectors.Subscriber.findOne({
        email
      });

      if (!existingSubscriber) {
        const subscriber = await _connectors.Subscriber.create({
          email,
          username
        });
        await (0, _confirm.sendConfirmationEmail)(email, username, subscriber._id);
        return subscriber;
      } else return new Error('EXISTING_SUBSCRIPTION');
    },
    confirmSubscriber: async (root, {
      id
    }, context) => {
      try {
        let subscriber = await (0, _confirm.confirmSubscription)(id);
        return subscriber;
      } catch (e) {
        return new Error(e);
      }
    },
    deleteSubscriber: async (root, {
      id
    }, context) => {
      let result = await _connectors.Subscriber.deleteOne({
        id
      });
      console.log(result);
      return result;
    }
  }
};
exports.default = resolvers;