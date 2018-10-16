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
  container: {
    color: '#333'
  },
  todayContainer: {
    width: 'auto',
    margin: '0 auto'
  },
  todayBody: {
    marginLeft: '20px'
  },
  todayName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0
  },
  todayTemp: {
    fontSize: '14px',
    margin: 0,
    color: '#8a8a8a',
    lineHeight: '1.5'
  },
  title: {
    fontSize: '16px',
    margin: '20px 0 10px 0',
    textAlign: 'center'
  },
  forecastContainer: {
    margin: '0 auto',
    width: 'auto'
  },
  weatherContainer: {
    marginBottom: '10px',
    width: 'auto'
  },
  weatherIcon: {
    width: '32px',
    height: '32px',
    marginRight: '20px'
  },
  weatherBody: {
    maxWidth: '280px'
  },
  weatherDate: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: 0
  },
  weatherName: {
    fontSize: '18px',
    margin: '3px 0 2px 0'
  },
  weatherTemp: {
    fontSize: '12px',
    color: '#8a8a8a',
    lineHeight: '1.5',
    margin: 0
  }
};

function Content(props) {
  let {
    data: {
      content
    }
  } = props;
  return _react2.default.createElement(_Grid2.default, {
    style: style.container
  }, _react2.default.createElement("h2", {
    style: style.title
  }, "Content"), _react2.default.createElement(_Grid2.default.Cell, null, _react2.default.createElement(_Grid2.default, {
    style: style.forecastContainer
  }, content.map((article, i) => _react2.default.createElement(_Grid2.default, {
    style: style.weatherContainer,
    key: i
  }, _react2.default.createElement(_Grid2.default.Row, null, _react2.default.createElement(_Grid2.default, {
    style: style.weatherBody
  }, _react2.default.createElement(_Grid2.default, null, _react2.default.createElement(_Grid2.default.Row, null, article.title), ">"))))))));
}

exports.default = Content;