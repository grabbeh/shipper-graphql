"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This grid allows you to be less verbose by only defining whay you need:
 *
 *    <Grid>
 *      <Grid.Row>
 *        <Grid.Cell>
 *          <p>Foo</p>
 *        </Grid.Cell>
 *      </Grid.Row>
 *    </Grid>
 *
 * Is equivalent of:
 *
 *    <Grid>
 *      <p>Foo</p>
 *    </Grid>
 *
 * Add the missing row and cell declaration are automatically added.
 *
 * Examples
 * --------
 *
 * Render two cells in a row
 *
 *    <Grid>
 *      <Grid.Row>
*          <p>I'm in the first cell</p>
*          <p>I'm in the second cell</p>
 *      </Grid.Row>
 *    </Grid>
 *
 * Render two paragraphs in a cell
 *
 *    <Grid>
 *      <Grid.Cell>
*          <p>I'm in the first cell</p>
*          <p>I'm in the second cell</p>
 *      </Grid.Cell>
 *    </Grid>
 *
 */
const tableStyle = {
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  }
};

function Cell({
  children,
  style = {},
  className
}) {
  return _react2.default.createElement("td", {
    style: style,
    className: className
  }, children);
}

function Row({
  children,
  style = {}
}) {
  return _react2.default.createElement("tr", {
    style: style
  }, _react2.default.Children.map(children, el => {
    if (el.type === Cell) return el;
    return _react2.default.createElement("td", null, el);
  }));
}

function Grid({
  children,
  style = {}
}) {
  return _react2.default.createElement("table", {
    style: _objectSpread({}, tableStyle.table, style)
  }, _react2.default.createElement("tbody", null, _react2.default.Children.map(children, el => {
    if (!el) return; // We want this content the be on it's own row.

    if (el.type === Row) return el; // The content is all inside a single cell (so a row)

    if (el.type === Cell) {
      return _react2.default.createElement("tr", null, el);
    } // The content is one cell inside it's own row


    return _react2.default.createElement("tr", null, _react2.default.createElement("td", null, el));
  })));
}

Grid.Row = Row;
Grid.Cell = Cell;
exports.default = Grid;