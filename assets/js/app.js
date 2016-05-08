(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _drawer = require('./drawer.js');

var _drawer2 = _interopRequireDefault(_drawer);

var _fixedHeader = require('./fixed-header.js');

var _fixedHeader2 = _interopRequireDefault(_fixedHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _drawer2.default('._c-drawer');
new _fixedHeader2.default();

},{"./drawer.js":2,"./fixed-header.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasisDrawer = function () {
	function BasisDrawer(container, params) {
		_classCallCheck(this, BasisDrawer);

		if (!container) {
			container = '._c-drawer';
		}
		if (!params) {
			params = {};
		}
		this.params = params;
		if (!this.params.drawer) {
			this.params.drawer = '._c-drawer__body';
		}
		if (!this.params.btn) {
			this.params.btn = '._c-drawer__btn';
		}

		this.container = document.querySelectorAll(container);
		this.setListener();
	}

	_createClass(BasisDrawer, [{
		key: 'setListener',
		value: function setListener() {
			var _this = this;

			var _loop = function _loop(i) {
				var container = _this.container[i];
				var drawer = container.querySelector(_this.params.drawer);
				var btn = container.querySelector(_this.params.btn);

				container.addEventListener('click', function (event) {
					_this.close(drawer);
				}, false);

				drawer.addEventListener('click', function (event) {
					event.stopPropagation();
				}, false);

				btn.addEventListener('click', function (event) {
					_this.toggle(drawer);
					event.stopPropagation();
				}, false);

				container.addEventListener('resize', function (event) {
					_this.close(drawer);
				}, false);

				var has_submenus = drawer.querySelectorAll('[aria-expanded]');

				var _loop2 = function _loop2(_i) {
					var element = has_submenus[_i].children;
					for (var j = 0; j < element.length; j++) {
						if (element[j].tagName.toUpperCase() == 'A') {
							element[j].addEventListener('click', function (event) {
								_this.toggle(has_submenus[_i]);
								event.stopPropagation();
							}, false);
						}
					}
				};

				for (var _i = 0; _i < has_submenus.length; _i++) {
					_loop2(_i);
				}
			};

			for (var i = 0; i < this.container.length; i++) {
				_loop(i);
			}
		}
	}, {
		key: 'toggle',
		value: function toggle(drawer) {
			event.preventDefault();
			var btn = container.querySelector(this.params.btn);
			if (drawer.getAttribute('aria-expanded') === 'false') {
				this.open(drawer);
				btn.classList.add('is-close');
			} else {
				this.close(drawer);
				btn.classList.remove('is-close');
				var _has_submenus = drawer.querySelectorAll('[aria-expanded]');
				for (var i = 0; i < _has_submenus.length; i++) {
					this.close(_has_submenus[i]);
				}
			}
		}
	}, {
		key: 'open',
		value: function open(drawer) {
			drawer.setAttribute('aria-expanded', 'true');
		}
	}, {
		key: 'close',
		value: function close(drawer) {
			drawer.setAttribute('aria-expanded', 'false');
		}
	}]);

	return BasisDrawer;
}();

exports.default = BasisDrawer;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasisFixedHeader = function () {
	function BasisFixedHeader(container, params) {
		_classCallCheck(this, BasisFixedHeader);

		if (!container) {
			container = '._l-container';
		}
		if (!params) {
			params = {};
		}
		this.params = params;
		if (!this.params.header) {
			this.params.header = '._l-header';
		}
		if (!this.params.class) {
			this.params.class = '_l-header--is-scrolled';
		}

		this.container = document.querySelector(container);
		this.header = document.querySelector(this.params.header);
		this.setListener();
	}

	_createClass(BasisFixedHeader, [{
		key: 'setListener',
		value: function setListener() {
			var _this = this;

			this.container.addEventListener('scroll', function (event) {
				var scroll = container.scrollTop;
				if (scroll > 0) {
					_this.header.classList.add(_this.params.class);
				} else {
					_this.header.classList.remove(_this.params.class);
				}
			}, false);
		}
	}]);

	return BasisFixedHeader;
}();

exports.default = BasisFixedHeader;

},{}]},{},[1]);
