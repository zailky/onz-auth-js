"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("onz", [], factory);
	else if(typeof exports === 'object')
		exports["onz"] = factory();
	else
		root["onz"] = factory();
})(self, function() {
return (self["webpackChunkonz"] = self["webpackChunkonz"] || []).push([[624,843],{

/***/ 62:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Auth": function() { return /* reexport */ Auth; }
});

;// CONCATENATED MODULE: ./src/lib/event-emiter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "_getEventListByName",
    value: function _getEventListByName(eventName) {
      if (typeof this.events[eventName] === 'undefined') {
        this.events[eventName] = new Set();
      }

      return this.events[eventName];
    }
  }, {
    key: "on",
    value: function on(eventName, fn) {
      this._getEventListByName(eventName).add(fn);
    }
  }, {
    key: "once",
    value: function once(eventName, fn) {
      var self = this;

      var onceFn = function onceFn() {
        self.removeListener(eventName, onceFn);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        fn.apply(self, args);
      };

      this.on(eventName, onceFn);
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this._getEventListByName(eventName).forEach( // eslint-disable-next-line func-names
      function (fn) {
        fn.apply(this, args);
      }.bind(this));
    }
  }, {
    key: "removeListener",
    value: function removeListener(eventName, fn) {
      this._getEventListByName(eventName)["delete"](fn);
    }
  }]);

  return EventEmitter;
}();

/* harmony default export */ var event_emiter = (EventEmitter);
;// CONCATENATED MODULE: ./src/constants.js
var OnzAuthEnum = Object.freeze({
  Production: {
    AuthUrl: 'https://auth.zailky.com',
    IdpUrl: 'https://idp.zailky.com',
    IdpApiUrl: 'https://idp-api.zailky.com'
  },
  Development: {
    AuthUrl: 'https://auth-develop.zailky.com',
    IdpUrl: 'https://idp-develop.zailky.com',
    IdpApiUrl: 'https://idp-api-develop.zailky.com'
  }
});
var OnzEvents = Object.freeze({
  OnAuthenticationFailure: 'authentication-failure',
  OnAuthenticated: 'authenticated',
  OnClosed: 'closed',
  OnError: 'error',
  OnRefreshed: 'refreshed',
  OnRefreshFailure: 'refresh-failure'
});
// EXTERNAL MODULE: ./node_modules/zoid/index.js
var zoid = __webpack_require__(175);
var zoid_default = /*#__PURE__*/__webpack_require__.n(zoid);
;// CONCATENATED MODULE: ./src/login/login.js

var OnzLoginComponent = zoid_default().create({
  // The html tag used to render my component
  tag: 'onz-login-component',
  // The url that will be loaded in the iframe or popup, when someone includes my component on their page
  url: function url(_ref) {
    var props = _ref.props;
    //return new URL('dummy.htm', window.location.href).href;
    //return "https://idp-develop.zailky.com/signin"
    return new URL('signin', props.apiURL).href;
  },
  // The size of the component on their page. Only px and % strings are supported
  dimensions: {
    width: '400px',
    height: '600px'
  },
  // The properties they can (or must) pass down to my component. This is optional.
  props: {
    apiURL: {
      type: 'string',
      required: true
    },
    clientID: {
      type: 'string',
      required: false,
      queryParam: 'client_id'
    },
    onLogin: {
      type: 'function',
      required: true
    },
    onLoginError: {
      type: 'function',
      required: true
    }
  }
});
;// CONCATENATED MODULE: ./src/login/index.js

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(669);
;// CONCATENATED MODULE: ./src/onz-auth.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function onz_auth_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function onz_auth_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function onz_auth_createClass(Constructor, protoProps, staticProps) { if (protoProps) onz_auth_defineProperties(Constructor.prototype, protoProps); if (staticProps) onz_auth_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





/**
 * Handles all the browser's authentication flows
 * @constructor
 * @param {Object} options
 * @param {String} options.clientID the Client ID found on your project overview page
 * @param {String} [options.containerID] the element container id, will default to 'container'
 * @param {String} [options.isIframe] boolean value indicating whether it is a popup or iframe
 * @param {String} [options.mode] 'production' or 'development', defaults to 'production'
 */

var Auth = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Auth, _EventEmitter);

  var _super = _createSuper(Auth);

  function Auth(options) {
    var _options$containerID, _options$mode;

    var _this;

    onz_auth_classCallCheck(this, Auth);

    _this = _super.call(this);

    if (!options) {
      throw new Exception("invalid auth options");
    }

    if (!options.clientID) {
      throw new Exception("invalid clientID");
    }

    _this.clientID = options.clientID;
    _this.containerID = (_options$containerID = options.containerID) !== null && _options$containerID !== void 0 ? _options$containerID : 'container';
    _this.isIframe = !!options.isIframe ? 'iframe' : 'popup';
    _this.mode = (_options$mode = options.mode) !== null && _options$mode !== void 0 ? _options$mode : 'production';

    _this._initialiseURL();

    _this._initialiseComponent();

    return _this;
  }

  onz_auth_createClass(Auth, [{
    key: "_initialiseURL",
    value: function _initialiseURL() {
      if (this.mode === 'development') {
        this.urls = OnzAuthEnum.Development;
      } else {
        this.urls = OnzAuthEnum.Production;
      }
    }
  }, {
    key: "_initialiseComponent",
    value: function _initialiseComponent() {
      var _this2 = this;

      this.component = OnzLoginComponent({
        clientID: this.clientID,
        apiURL: this.urls.IdpUrl,
        onLogin: function onLogin(authResult) {
          console.log(OnzEvents.OnAuthenticated, authResult);
          this.emit(OnzEvents.OnAuthenticated, authResult);
        },
        onLoginError: function onLoginError(errorMessage) {
          console.log(OnzEvents.OnError, errorMessage);
          this.emit(OnzEvents.OnError, errorMessage);
        },
        onClose: function onClose() {
          console.log(OnzEvents.OnClosed);

          _this2.emit(OnzEvents.OnClosed);
        },
        onError: function onError(err) {
          var message = err.message ? err.message.toString() : '';
          console.log(message);

          _this2.emit(OnzEvents.OnError, err);
        }
      });
    }
  }, {
    key: "showLogin",
    value: function showLogin() {
      this.component.render("#".concat(this.containerID), this.isIframe);
    }
  }, {
    key: "refreshAccessToken",
    value: function refreshAccessToken() {}
  }, {
    key: "signOut",
    value: function signOut() {}
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {}
  }, {
    key: "getOAuthTokens",
    value: function getOAuthTokens() {}
  }, {
    key: "getAccessToken",
    value: function getAccessToken() {}
  }, {
    key: "getDecodedAccessToken",
    value: function getDecodedAccessToken() {}
  }, {
    key: "getIDToken",
    value: function getIDToken() {}
  }, {
    key: "getDecodedIdToken",
    value: function getDecodedIdToken() {}
  }, {
    key: "getRefreshToken",
    value: function getRefreshToken() {}
  }]);

  return Auth;
}(event_emiter);
;// CONCATENATED MODULE: ./src/index.js


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(62));
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=onz-auth-js-sdk.js.map