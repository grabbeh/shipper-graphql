"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _format = require("date-fns/format");

var _format2 = _interopRequireDefault(_format);

var _Grid = require("../layout/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Img = require("./Img");

var _Img2 = _interopRequireDefault(_Img);

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

function Icon({
  abbr,
  style
}) {
  return _react2.default.createElement(_Img2.default, {
    style: style,
    src: `https://www.metaweather.com/static/img/weather/png/64/${abbr}.png`,
    alt: abbr
  });
}

function Weather({
  report
}) {
  // The first element is today's date
  const [today, ...forecast] = report;
  return _react2.default.createElement(_Grid2.default, {
    style: style.container
  }, _react2.default.createElement("h2", {
    style: style.title
  }, "Today \u2014 ", (0, _format2.default)(new Date(today.date), 'D/M')), _react2.default.createElement(_Grid2.default.Cell, null, _react2.default.createElement(_Grid2.default, {
    style: style.todayContainer
  }, _react2.default.createElement(_Grid2.default.Row, null, _react2.default.createElement(Icon, {
    abbr: today.abbr
  }), _react2.default.createElement(_Grid2.default, {
    style: style.todayBody
  }, _react2.default.createElement("p", {
    style: style.todayName
  }, today.name), _react2.default.createElement(_Grid2.default, null, _react2.default.createElement(_Grid2.default.Row, null, _react2.default.createElement("p", {
    style: style.todayTemp
  }, "Max: ", Math.round(today.tMax), " \u2103"), _react2.default.createElement("p", {
    style: style.todayTemp
  }, "Min: ", Math.round(today.tMin), " \u2103"))))))), _react2.default.createElement("h2", {
    style: style.title
  }, "Forecast"), _react2.default.createElement(_Grid2.default.Cell, null, _react2.default.createElement(_Grid2.default, {
    style: style.forecastContainer
  }, forecast.map(weather => _react2.default.createElement(_Grid2.default, {
    style: style.weatherContainer,
    key: weather.date
  }, _react2.default.createElement(_Grid2.default.Row, null, _react2.default.createElement(Icon, {
    style: style.weatherIcon,
    abbr: weather.abbr
  }), _react2.default.createElement(_Grid2.default, {
    style: style.weatherBody
  }, _react2.default.createElement("p", {
    style: style.weatherDate
  }, (0, _format2.default)(new Date(weather.date), 'dddd, MMMM Do')), _react2.default.createElement("p", {
    style: style.weatherName
  }, weather.name), _react2.default.createElement(_Grid2.default, null, _react2.default.createElement(_Grid2.default.Row, null, _react2.default.createElement("p", {
    style: style.weatherTemp
  }, "Max: ", Math.round(weather.tMax), " \u2103"), _react2.default.createElement("p", {
    style: style.weatherTemp
  }, "Min: ", Math.round(weather.tMin), " \u2103"))))))))));
}

exports.default = Weather;