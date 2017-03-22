// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.core = core();

	function core() {
		const internals = {};
		const externals = {};

		const util = glomeApiService.util;

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
			if (!util.isNonEmptyString(baseUrl)) {
				return util.panic('Failed to set baseUrl: `' + baseUrl + '`');
			}
			internals.baseUrl = baseUrl;
			return getBaseUrl();
		}

		function getAppSecret() {
			return internals.appSecret;
		}

		function setAppSecret(appSecret) {
			if (!util.isNonEmptyString(appSecret)) {
				return util.panic('Failed to set appSecret: `' + appSecret + '`');
			}
			internals.appSecret = appSecret;
			return getAppSecret();
		}

		function getAppKey() {
			return internals.appKey;
		}

		function setAppKey(appKey) {
			if (!util.isNonEmptyString(appKey)) {
				return util.panic('Failed to set appKey: `' + appKey + '`');
			}
			internals.appKey = appKey;
			return getAppKey();
		}
	}

})(this.glomeApiService);
