// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.util = util();

	function util() {
		const externals = {};

		externals.panic = panic;
		externals.isNonEmptyString = isNonEmptyString;
		externals.isNonEmptyObject = isNonEmptyObject;

		return externals;

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

		function panic(reason) {
			console.error('[glomeApiService] ' + reason);
			return;
		}
	}

})(this.glomeApiService);
