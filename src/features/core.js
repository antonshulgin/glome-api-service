// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.core = core();

	function core() {
		const internals = {};
		const externals = {};

		externals.panic = panic;
		externals.isNonEmptyString = isNonEmptyString;
		externals.isNonEmptyObject = isNonEmptyObject;
		externals.isNumber = isNumber;
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

		function applyRouteParams(routeTemplate, routeParams) {
			if (!isNonEmptyString(routeTemplate)) {
				return panic('No routeTemplate provided');
			}
			if (!isNonEmptyObject(routeParams)) {
				return panic('No routeParams provided');
			}
			Object.keys(routeParams)
				.sort(sortLongestFirst)
				.forEach(applyRouteParam);
			return routeTemplate;

			function applyRouteParam(routeParam) {
				var patternString = new RegExp('\:' + routeParam, 'gi');
				routeTemplate = routeTemplate.replace(
					patternString,
					encodeURIComponent(routeParams[routeParam])
				);
			}

			function sortLongestFirst(a, b) {
				return a.length < b.length;
			}
		}

		function produceRequest(params) {
			const baseUrl = getBaseUrl();
			if (!baseUrl) {
				return panic('baseUrl is missing');
			}
			if (!isNonEmptyObject(params)) {
				return panic('No params provided');
			}
			if (!isNonEmptyString(params.method)) {
				return panic('No method provided');
			}
			if (!isNonEmptyString(params.route)) {
				return panic('No route provided');
			}
			if (isNonEmptyObject(params.routeParams)) {
				params.route = applyRouteParams(params.route, params.routeParams);
			}
			return new Promise(promiseProduceRequest);

			function promiseProduceRequest(resolve, reject) {
				const url = baseUrl + params.route;
				const request = new XMLHttpRequest();
				request.addEventListener('load', onLoad, false);
				request.addEventListener('error', onError, false);
				request.open(params.method.toUpperCase(), url, true);
				if (isNonEmptyObject(params.includeHeaders)) {
					if (params.includeHeaders.authToken) {
						request.setRequestHeader('Authorization', getAuthToken());
					}
					if (params.includeHeaders.appId) {
						request.setRequestHeader('X-Glome-Application-ID', getAppId());
					}
					if (params.includeHeaders.appSecret) {
						request.setRequestHeader('X-Glome-Application-Secret', getAppSecret());
					}
					if (isNonEmptyString(params.contentType)) {
						request.setRequestHeader('Content-Type', params.contentType);
					}
				}
				if (isNonEmptyObject(params.data)) {
					request.send(params.data);
				} else {
					request.send();
				}

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
			if (!isNonEmptyString(authToken)) {
				return panic('Failed to set authToken: `' + authToken + '`');
			}
			internals.authToken = authToken;
			return getAuthToken();
		}

		function getBaseUrl() {
			return internals.baseUrl;
		}

		function setBaseUrl(baseUrl) {
			if (!isNonEmptyString(baseUrl)) {
				return panic('Failed to set baseUrl: `' + baseUrl + '`');
			}
			internals.baseUrl = baseUrl.replace(/\/*$/, '');
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

		function getAppId() {
			return internals.appId;
		}

		function setAppId(appId) {
			if (!isNonEmptyString(appId)) {
				return panic('Failed to set appId: `' + appId + '`');
			}
			internals.appId = appId;
			return getAppId();
		}

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

		function panic(reason) {
			console.error('[glomeApiService] ' + reason);
			return;
		}
	}

})(this.glomeApiService);
