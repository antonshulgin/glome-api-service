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
		externals.produceGet = produceGet;

		return externals;

		function produceGet(path) {
			if (!util.isNonEmptyString(path)) {
				return util.panic('path is missing');
			}
			return new Promise(promiseProduceGet);

			function promiseProduceGet(resolve, reject) {
				const baseUrl = getBaseUrl();
				if (!baseUrl) {
					return util.panic('baseUrl is missing');
				}
				const url = baseUrl + path;
				const request = new XMLHttpRequest();
				request.addEventListener('load', onLoad, false);
				request.addEventListener('error', onError, false);
				request.open('GET', url);
				request.setRequestHeader('X-Glome-Application-ID', getAppKey());
				request.send();

				function onLoad() {
					return (request.status < 400) ? resolve(request) : reject(request);
				}

				function onError() {
					return reject(request);
				}
			}
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
