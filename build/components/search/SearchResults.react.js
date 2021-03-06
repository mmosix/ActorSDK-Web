'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactIntl = require('react-intl');

var _SearchResultItem = require('./SearchResultItem.react');

var _SearchResultItem2 = _interopRequireDefault(_SearchResultItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SearchResults = function (_Component) {
  _inherits(SearchResults, _Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  SearchResults.prototype.renderResults = function renderResults() {
    var _props = this.props;
    var query = _props.query;
    var results = _props.results;
    var isSearching = _props.isSearching;


    if (!query) {
      return _react2.default.createElement(
        'li',
        { className: 'search__results__item search__results__item--empty' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'search.emptyQuery' })
      );
    }

    if (isSearching) {
      return _react2.default.createElement(
        'li',
        { className: 'search__results__item search__results__item--not-found' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'search.searching', values: { query: query } })
      );
    }

    if (!results.length) {
      return _react2.default.createElement(
        'li',
        { className: 'search__results__item search__results__item--not-found' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'search.notFound', values: { query: query } })
      );
    }

    return results.map(function (result, index) {
      return _react2.default.createElement(_SearchResultItem2.default, _extends({}, result, { key: index }));
    });
  };

  SearchResults.prototype.render = function render() {
    var _props2 = this.props;
    var isExpanded = _props2.isExpanded;
    var onToggleExpanded = _props2.onToggleExpanded;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'search__expand', onClick: onToggleExpanded },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          isExpanded ? 'chevron_right' : 'chevron_left'
        ),
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          isExpanded ? 'chevron_right' : 'chevron_left'
        )
      ),
      _react2.default.createElement(
        'header',
        { className: 'search__header' },
        _react2.default.createElement(
          'ul',
          { className: 'search__filter' },
          _react2.default.createElement(
            'li',
            { className: 'search__filter__item search__filter__item--active' },
            'Text'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'search__body' },
        _react2.default.createElement(
          'ul',
          { className: 'search__results' },
          this.renderResults()
        )
      )
    );
  };

  return SearchResults;
}(_react.Component);

SearchResults.propTypes = {
  query: _react.PropTypes.string.isRequired,
  results: _react.PropTypes.array.isRequired,
  isExpanded: _react.PropTypes.bool.isRequired,
  isSearching: _react.PropTypes.bool.isRequired,
  onToggleExpanded: _react.PropTypes.func.isRequired
};
exports.default = SearchResults;
//# sourceMappingURL=SearchResults.react.js.map