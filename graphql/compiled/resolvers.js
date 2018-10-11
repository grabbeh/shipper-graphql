"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectors = require("./connectors");

var _graphql = require("graphql");

var _language = require("graphql/language");

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
  Query: {},
  Mutation: {
    addSubscriber: async (root, {
      email,
      username
    }, context) => {
      let existingSubscriber = await _connectors.Subscriber.findOne({
        email
      });
      if (existingSubscriber) return new Error('EXISTING_SUBSCRIPTION');else return _connectors.Subscriber.create({
        email,
        username
      });
    }
  }
};
exports.default = resolvers;