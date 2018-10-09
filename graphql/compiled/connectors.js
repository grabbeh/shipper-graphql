'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscriber = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _db = require('../../config/db.js');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  _mongoose2.default.connect(_db2.default, { dbName: 'bookmark', useNewUrlParser: true });
} catch (error) {
  console.log(error);
}

_mongoose2.default.Promise = require('bluebird');

const SubscriberSchema = _mongoose2.default.Schema({
  email: String,
  username: String,
  lastEmailed: Date,
  isConfirmed: { type: Boolean, default: false }
});

const Subscriber = _mongoose2.default.model('subscriber', SubscriberSchema);

exports.Subscriber = Subscriber;