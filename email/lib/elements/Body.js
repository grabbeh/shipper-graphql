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
  content: {
    backgroundColor: 'white',
    padding: '20px'
  }
};

function Body({
  children
}) {
  return _react2.default.createElement(_Grid2.default, null, _react2.default.createElement(_Grid2.default.Cell, {
    style: style.content
  }, children));
}

exports.default = Body;