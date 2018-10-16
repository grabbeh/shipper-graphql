"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Grid = require("../layout/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const style = {
  footer: {
    margin: '20px 0'
  },
  p: {
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0,
    color: '#607D8B',
    textAlign: 'center'
  },
  a: {
    color: '#00a1ef'
  }
};

function Footer() {
  return _react2.default.createElement(_Grid2.default, {
    style: style.footer
  }, _react2.default.createElement(_Grid2.default.Cell, {
    style: style.content
  }, _react2.default.createElement("p", {
    style: style.p
  }, "This email was created with React."), _react2.default.createElement("p", {
    style: style.p
  }, "The template and source code is freely available\xA0", _react2.default.createElement("a", {
    style: style.a,
    href: "https://github.com/sentisis/react-emails"
  }, "here"))));
}

exports.default = Footer;