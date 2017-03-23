// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.account = account();

	function account() {
		const internals = {};
		const externals = {};

		const core = glomeApiService.core;
		const util = glomeApiService.util;

		externals.createAccount = createAccount;
		externals.createLinkingToken = createLinkingToken;
		externals.createLinkedAccount = createLinkedAccount;

		return externals;

		function createLinkedAccount() {
			const params = {
				method: 'post',
				path: '/account/link',
				includeHeaders: {
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function createLinkingToken(lifetimeMinutes) {
			if (!util.isNumber(lifetimeMinutes)) {
				return util.panic('No valid lifetimeMinutes provided');
			}
			const params = {
				method: 'get',
				path: '/account/link?validfor=' + lifetimeMinutes,
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
