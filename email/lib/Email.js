"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Grid = require("./layout/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Header = require("./elements/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Title = require("./elements/Title");

var _Title2 = _interopRequireDefault(_Title);

var _Body = require("./elements/Body");

var _Body2 = _interopRequireDefault(_Body);

var _Content = require("./elements/Content");

var _Content2 = _interopRequireDefault(_Content);

var _Footer = require("./elements/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const style = {
  container: {
    backgroundColor: '#efefef',
    padding: '20px 0',
    fontFamily: 'sans-serif'
  },
  main: {
    maxWidth: '500px',
    width: '100%'
  }
};

function Email({
  data
}) {
  return _react2.default.createElement("center", {
    style: style.container
  }, _react2.default.createElement(_Grid2.default, {
    style: style.main
  }, _react2.default.createElement(_Header2.default, null), _react2.default.createElement(_Body2.default, null, _react2.default.createElement(_Title2.default, null, "Tweet summary ", data.username), _react2.default.createElement(_Content2.default, {
    data: data
  })), _react2.default.createElement(_Footer2.default, null)));
}

exports.default = Email;