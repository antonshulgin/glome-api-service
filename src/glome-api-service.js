// jshint esnext: true
(function (exports) {
	'use strict';

	exports.glomeApiService = glomeApiService();

	function glomeApiService() {
		const internals = {};
		const externals = {};

		externals.getAppKey = getAppKey;
		externals.setAppKey = setAppKey;
		externals.getAppSecret = getAppSecret;
		externals.setAppSecret = setAppSecret;
		externals.getBaseUrl = getBaseUrl;
		externals.setBaseUrl = setBaseUrl;

		return externals;

		function getBaseUrl() {
			return internals.baseUrl;
		}

		function setBaseUrl(baseUrl) {
			if (!isNonEmptyString(baseUrl)) {
				return panic('Failed to set baseUrl: `' + baseUrl + '`');
			}
			internals.baseUrl = baseUrl;
			return getBaseUrl();
		}

		function getAppSecret() {
			return internals.appSecret;
		}

		function setAppSecret(appSecret) {
			if (!isNonEmptyString(appSecret)) {
				return panic('Failed to set appSecret: `' + appSecret + '`');
			}
			internals.appSecret = appSecret;
			return getAppSecret();
		}

		function getAppKey() {
			return internals.appKey;
		}

		function setAppKey(appKey) {
			if (!isNonEmptyString(appKey)) {
				return panic('Failed to set appKey: `' + appKey + '`');
			}
			internals.appKey = appKey;
			return getAppKey();
		}
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

})(this);
