"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Grid = require("../layout/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Img = require("./Img");

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logoSrc = 'https://s3-eu-west-1.amazonaws.com/sentisis-images/github_public/react-emails/logo.png';
const style = {
  header: {
    margin: '10px auto 20px auto',
    width: 'auto'
  },
  img: {
    height: '35px'
  }
};

function Header() {
  return _react2.default.createElement(_Grid2.default, {
    style: style.header
  }, _react2.default.createElement(_Img2.default, {
    style: style.img,
    src: logoSrc,
    alt: "logo"
  }));
}

exports.default = Header;