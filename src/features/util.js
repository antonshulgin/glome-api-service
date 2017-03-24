// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.util = util();

	function util() {
		const externals = {};

		externals.isNonEmptyString = isNonEmptyString;
		externals.isNonEmptyObject = isNonEmptyObject;
		externals.isNumber = isNumber;

		return externals;

		function isNumber(item) {
			return (toStringCall(item) === '[object Number]') &&
				isFinite(item);
		}

		function isNonEmptyObject(item) {
			return (toStringCall(item) === '[object Object]') &&
				(Object.keys(item).length > 0);
		}

		function isNonEmptyString(item) {
			return (toStringCall(item) === '[object String]') &&
				(item.length > 0);
		}

		function toStringCall(item) {
			return Object.prototype.toString.call(item);
		}
	}

})(this.glomeApiService);
