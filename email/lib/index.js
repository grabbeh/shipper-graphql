"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Email = require("./Email");

var _Email2 = _interopRequireDefault(_Email);

require("./inlined.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This file is not used when rendering the email on the server.
 * It's the perfect place to include mock data for development.
 */
const mockData = {
  city: 'Madrid',
  weather: [{
    date: '2017-04-25',
    name: 'Light Rain',
    abbr: 'lr',
    tMax: 22.532857142857143,
    tMin: 10.307142857142859
  }, {
    date: '2017-04-26',
    name: 'Heavy Cloud',
    abbr: 'hc',
    tMax: 18.62285714285714,
    tMin: 6.680000000000001
  }, {
    date: '2017-04-27',
    name: 'Heavy Cloud',
    abbr: 'hc',
    tMax: 15.20142857142857,
    tMin: 3.5985714285714288
  }, {
    date: '2017-04-28',
    name: 'Heavy Cloud',
    abbr: 'hc',
    tMax: 15.881428571428572,
    tMin: 6.3985714285714295
  }, {
    date: '2017-04-29',
    name: 'Heavy Rain',
    abbr: 'hr',
    tMax: 15.994285714285715,
    tMin: 7.71
  }, {
    date: '2017-04-30',
    name: 'Light Rain',
    abbr: 'lr',
    tMax: 17.581666666666667,
    tMin: 6.489999999999999
  }]
};

_reactDom2.default.render(_react2.default.createElement(_Email2.default, {
  data: mockData
}), document.getElementById('root'));