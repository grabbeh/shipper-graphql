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

var _Weather = require("./elements/Weather");

var _Weather2 = _interopRequireDefault(_Weather);

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
  }, _react2.default.createElement(_Header2.default, null), _react2.default.createElement(_Body2.default, null, _react2.default.createElement(_Title2.default, null, "Weather report for ", data.city), _react2.default.createElement(_Weather2.default, {
    report: data.weather
  })), _react2.default.createElement(_Footer2.default, null)));
}

exports.default = Email;