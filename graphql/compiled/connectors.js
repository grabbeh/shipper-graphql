"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscriber = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({
  path: '../../.env'
});

try {
  _mongoose2.default.connect(process.env.DB_CONNECTION, {
    dbName: 'bookmark',
    useNewUrlParser: true
  });
} catch (error) {
  console.log(error);
}

_mongoose2.default.Promise = require('bluebird');

const SubscriberSchema = _mongoose2.default.Schema({
  email: String,
  username: String,
  lastEmailed: Date,
  isConfirmed: {
    type: Boolean,
    default: false
  }
});

const Subscriber = _mongoose2.default.model('subscriber', SubscriberSchema);

exports.Subscriber = Subscriber;