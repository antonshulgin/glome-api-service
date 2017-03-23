// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.core = core();

	function core() {
		const internals = {};
		const externals = {};

		const util = glomeApiService.util;

		externals.getAppId = getAppId;
		externals.setAppId = setAppId;
		externals.getAppSecret = getAppSecret;
		externals.setAppSecret = setAppSecret;
		externals.getBaseUrl = getBaseUrl;
		externals.setBaseUrl = setBaseUrl;
		externals.getAuthToken = getAuthToken;
		externals.setAuthToken = setAuthToken;
		externals.produceRequest = produceRequest;

		return externals;

		function produceRequest(params) {
			const baseUrl = getBaseUrl();
			if (!baseUrl) {
				return util.panic('baseUrl is missing');
			}
			if (!util.isNonEmptyObject(params)) {
				return util.panic('No params provided');
			}
			if (!util.isNonEmptyString(params.method)) {
				return util.panic('No method provided');
			}
			if (!util.isNonEmptyString(params.path)) {
				return util.panic('No path provided');
			}
			return new Promise(promiseProduceRequest);

			function promiseProduceRequest(resolve, reject) {
				const url = baseUrl + params.path;
				const request = new XMLHttpRequest();
				request.addEventListener('load', onLoad, false);
				request.addEventListener('error', onError, false);
				request.open(params.method.toUpperCase(), url, true);
				if (util.isNonEmptyObject(params.includeHeaders)) {
					if (params.includeHeaders.appId) {
						request.setRequestHeader('X-Glome-Application-ID', getAppId());
					}
					if (params.includeHeaders.appSecret) {
						request.setRequestHeader('X-Glome-Application-Secret', getAppSecret());
					}
				}
				request.send();

				function onLoad() {
					if (request.status <= 0) { return reject(request); }
					if (request.status >= 400) { return reject(request); }
					return resolve(request);
				}

				function onError() {
					return reject(request);
				}
			}
		}


		function getAuthToken() {
			return internals.authToken;
		}

		function setAuthToken(authToken) {
			if (!util.isNonEmptyString(authToken)) {
				return util.panic('Failed to set authToken: `' + authToken + '`');
			}
			internals.authToken = authToken;
			return getAuthToken();
		}

		function getBaseUrl() {
			return internals.baseUrl;
		}

		function setBaseUrl(baseUrl) {
			if (!util.isNonEmptyString(baseUrl)) {
				return util.panic('Failed to set baseUrl: `' + baseUrl + '`');
			}
			internals.baseUrl = baseUrl.replace(/\/*$/, '');
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

		function getAppId() {
			return internals.appId;
		}

		function setAppId(appId) {
			if (!util.isNonEmptyString(appId)) {
				return util.panic('Failed to set appId: `' + appId + '`');
			}
			internals.appId = appId;
			return getAppId();
		}
	}

})(this.glomeApiService);
