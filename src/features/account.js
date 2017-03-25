// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.account = account();

	function account() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;

		externals.createAccount = createAccount;
		externals.createLinkingToken = createLinkingToken;
		externals.createLinkedAccount = createLinkedAccount;
		externals.getAccount = getAccount;
		externals.setPublicData = setPublicData;

		return externals;

		function setPublicData(publicData) {
			if (!core.isNonEmptyObject(publicData)) {
				return core.panic('No valid publicData provided');
			}
			const params = {
				method: 'post',
				path: '/account/data',
				includeHeaders: {
					authToken: true,
					appId: true
				},
				data: publicData
			};
			return core.produceRequest(params);
		}

		function getAccount() {
			const params = {
				method: 'get',
				path: '/account',
				includeHeaders: {
					authToken: true,
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function createLinkedAccount(linkId) {
			if (!core.isNonEmptyString(linkId)) {
				return core.panic('No valid linkId provided');
			}
			const params = {
				method: 'post',
				path: '/account/link',
				contentType: 'application/json',
				includeHeaders: {
					appId: true
				},
				data: {
					linkId: linkId
				}
			};
			return core.produceRequest(params);
		}

		function createLinkingToken(lifetimeMinutes) {
			if (!core.isNumber(lifetimeMinutes)) {
				return core.panic('No valid lifetimeMinutes provided');
			}
			const params = {
				method: 'get',
				path: '/account/link?validfor=:lifetimeMinutes',
				pathParams: {
					lifetimeMinutes: lifetimeMinutes
				},
				includeHeaders: {
					appId: true,
					authToken: true
				}
			};
			return core.produceRequest(params);
		}

		function createAccount() {
			const params = {
				method: 'post',
				path: '/account',
				includeHeaders: {
					appId: true
				}
			};
			return core.produceRequest(params);
		}

	}

})(this.glomeApiService);
