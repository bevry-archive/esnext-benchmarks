// imports es6-static-class.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	var A = function () {
		function A() {
			_classCallCheck(this, A);
		}

		_createClass(A, null, [{
			key: 'a',
			value: function a() {}
		}, {
			key: 'b',
			value: function b() {}
		}, {
			key: 'c',
			value: function c() {}
		}]);

		return A;
	}();

	return;
};
