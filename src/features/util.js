// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.util = util();

	function util() {
		const externals = {};

		externals.panic = panic;
		externals.isNonEmptyString = isNonEmptyString;

		return externals;

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
