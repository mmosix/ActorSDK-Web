'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ImageUtils = require('../../utils/ImageUtils');

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _confirm = require('../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _NotificationsActionCreators = require('../../actions/NotificationsActionCreators');

var _NotificationsActionCreators2 = _interopRequireDefault(_NotificationsActionCreators);

var _CallActionCreators = require('../../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _BlockedUsersActionCreators = require('../../actions/BlockedUsersActionCreators');

var _BlockedUsersActionCreators2 = _interopRequireDefault(_BlockedUsersActionCreators);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _NotificationsStore = require('../../stores/NotificationsStore');

var _NotificationsStore2 = _interopRequireDefault(_NotificationsStore);

var _OnlineStore = require('../../stores/OnlineStore');

var _OnlineStore2 = _interopRequireDefault(_OnlineStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _ContactDetails = require('../common/ContactDetails.react');

var _ContactDetails2 = _interopRequireDefault(_ContactDetails);

var _ToggleNotifications = require('../common/ToggleNotifications.react');

var _ToggleNotifications2 = _interopRequireDefault(_ToggleNotifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UserProfile = function (_Component) {
  _inherits(UserProfile, _Component);

  UserProfile.getStores = function getStores() {
    return [_NotificationsStore2.default, _OnlineStore2.default];
  };

  UserProfile.calculateState = function calculateState(prevState, nextProps) {
    var uid = nextProps.user.id;
    var peer = uid ? _UserStore2.default.getUser(uid) : null;

    return _extends({}, prevState, {
      peer: peer,
      isNotificationsEnabled: peer ? _NotificationsStore2.default.isNotificationsEnabled(peer) : true,
      message: _OnlineStore2.default.getMessage()
    });
  };

  function UserProfile(props) {
    _classCallCheck(this, UserProfile);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      isMoreDropdownOpen: false
    };

    _this.onClearChat = _this.onClearChat.bind(_this);
    _this.onDeleteChat = _this.onDeleteChat.bind(_this);
    _this.onBlockUser = _this.onBlockUser.bind(_this);
    _this.onRemoveFromContacts = _this.onRemoveFromContacts.bind(_this);
    _this.onAddToContacts = _this.onAddToContacts.bind(_this);
    _this.onNotificationChange = _this.onNotificationChange.bind(_this);
    _this.closeActionsDropdown = _this.closeActionsDropdown.bind(_this);
    _this.toggleActionsDropdown = _this.toggleActionsDropdown.bind(_this);
    _this.handleAvatarClick = _this.handleAvatarClick.bind(_this);
    _this.makeCall = _this.makeCall.bind(_this);
    return _this;
  }

  UserProfile.prototype.onAddToContacts = function onAddToContacts() {
    _ContactActionCreators2.default.addContact(this.props.user.id);
  };

  UserProfile.prototype.onNotificationChange = function onNotificationChange(event) {
    var peer = this.state.peer;

    _NotificationsActionCreators2.default.changeNotificationsEnabled(peer, event.target.checked);
  };

  UserProfile.prototype.toggleActionsDropdown = function toggleActionsDropdown() {
    var isActionsDropdownOpen = this.state.isActionsDropdownOpen;


    if (!isActionsDropdownOpen) {
      this.setState({ isActionsDropdownOpen: true });
      document.addEventListener('click', this.closeActionsDropdown, false);
    } else {
      this.closeActionsDropdown();
    }
  };

  UserProfile.prototype.closeActionsDropdown = function closeActionsDropdown() {
    this.setState({ isActionsDropdownOpen: false });
    document.removeEventListener('click', this.closeActionsDropdown, false);
  };

  UserProfile.prototype.onClearChat = function onClearChat() {
    var user = this.props.user;

    (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.user.clear', values: { name: user.name } })).then(function () {
      var peer = _ActorClient2.default.getUserPeer(user.id);
      _DialogActionCreators2.default.clearChat(peer);
    }, function () {});
  };

  UserProfile.prototype.onRemoveFromContacts = function onRemoveFromContacts() {
    var user = this.props.user;

    (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.user.removeContact', values: { name: user.name } })).then(function () {
      return _ContactActionCreators2.default.removeContact(user.id);
    }, function () {});
  };

  UserProfile.prototype.onDeleteChat = function onDeleteChat() {
    var user = this.props.user;


    (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.user.delete', values: { name: user.name } })).then(function () {
      var peer = _ActorClient2.default.getUserPeer(user.id);
      _DialogActionCreators2.default.deleteChat(peer);
    }, function () {});
  };

  UserProfile.prototype.onBlockUser = function onBlockUser() {
    var user = this.props.user;


    (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.user.block', values: { name: user.name } })).then(function () {
      return _BlockedUsersActionCreators2.default.blockUser(user.id);
    }, function () {});
  };

  UserProfile.prototype.handleAvatarClick = function handleAvatarClick() {
    _ImageUtils.lightbox.open(this.props.user.bigAvatar);
  };

  UserProfile.prototype.makeCall = function makeCall() {
    var user = this.props.user;

    _CallActionCreators2.default.makeCall(user.id);
  };

  UserProfile.prototype.renderAbout = function renderAbout() {
    var about = this.props.user.about;

    if (!about) return null;

    return _react2.default.createElement('div', {
      className: 'user_profile__meta__about',
      dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(about).replace(/\n/g, '<br/>') } });
  };

  UserProfile.prototype.renderToggleContact = function renderToggleContact() {
    var isContact = this.props.user.isContact;


    if (isContact) {
      return _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.onRemoveFromContacts },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'removeFromContacts' })
      );
    }

    return _react2.default.createElement(
      'li',
      { className: 'dropdown__menu__item', onClick: this.onAddToContacts },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'addToContacts' })
    );
  };

  UserProfile.prototype.render = function render() {
    var user = this.props.user;
    var _state = this.state;
    var isNotificationsEnabled = _state.isNotificationsEnabled;
    var isActionsDropdownOpen = _state.isActionsDropdownOpen;
    var message = _state.message;


    var dropdownClassNames = (0, _classnames2.default)('dropdown', {
      'dropdown--opened': isActionsDropdownOpen
    });

    return _react2.default.createElement(
      'div',
      { className: 'activity__body user_profile' },
      _react2.default.createElement(
        'ul',
        { className: 'profile__list' },
        _react2.default.createElement(
          'li',
          { className: 'profile__list__item user_profile__meta' },
          _react2.default.createElement(
            'header',
            null,
            _react2.default.createElement(_AvatarItem2.default, {
              className: 'profile__avatar',
              size: 'large',
              image: user.bigAvatar,
              placeholder: user.placeholder,
              title: user.name,
              onClick: this.handleAvatarClick
            }),
            _react2.default.createElement('h3', { className: 'user_profile__meta__title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(user.name) } }),
            _react2.default.createElement(
              'div',
              { className: 'user_profile__meta__message' },
              message
            )
          ),
          this.renderAbout(),
          _react2.default.createElement(
            'footer',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              _react2.default.createElement(
                'button',
                { className: 'button button--green button--wide', onClick: this.makeCall },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'phone'
                ),
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.call' })
              )
            ),
            _react2.default.createElement('div', { style: { width: 10 } }),
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              _react2.default.createElement(
                'div',
                { className: dropdownClassNames },
                _react2.default.createElement(
                  'button',
                  { className: 'dropdown__button button button--flat button--wide', onClick: this.toggleActionsDropdown },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'more_horiz'
                  ),
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'actions' })
                ),
                _react2.default.createElement(
                  'ul',
                  { className: 'dropdown__menu dropdown__menu--right' },
                  this.renderToggleContact(),
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: this.onBlockUser },
                    _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'blockUser' })
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: this.onClearChat },
                    _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'clearConversation' })
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: this.onDeleteChat },
                    _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'deleteConversation' })
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'li',
          { className: 'profile__list__item user_profile__contact_info no-p' },
          _react2.default.createElement(_ContactDetails2.default, { peerInfo: user })
        ),
        _react2.default.createElement(
          'li',
          { className: 'profile__list__item user_profile__notifications no-p' },
          _react2.default.createElement(_ToggleNotifications2.default, {
            isNotificationsEnabled: isNotificationsEnabled,
            onNotificationChange: this.onNotificationChange })
        )
      )
    );
  };

  return UserProfile;
}(_react.Component);

UserProfile.propTypes = {
  user: _react.PropTypes.object.isRequired
};
exports.default = _utils.Container.create(UserProfile, { pure: false, withProps: true });
//# sourceMappingURL=UserProfile.react.js.map