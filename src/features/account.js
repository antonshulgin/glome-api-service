// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.account = account();

	function account() {
		const ERR_NO_PUBLIC_DATA = 'No valid publicData provided';
		const ERR_NO_LINK_ID = 'No valid linkId provided';
		const ERR_NO_LIFETIME = 'No valid lifetimeMinutes provided';

		const panic = glomeApiService.panic;
		const isNonEmptyString = glomeApiService.isNonEmptyString;
		const isNonEmptyObject = glomeApiService.isNonEmptyObject;
		const isNumber = glomeApiService.isNumber;
		const produceRequest = glomeApiService.produceRequest;

		const externals = {};

		externals.createAccount = createAccount;
		externals.createLinkingToken = createLinkingToken;
		externals.createLinkedAccount = createLinkedAccount;
		externals.getAccount = getAccount;
		externals.setPublicData = setPublicData;

		return externals;

		function setPublicData(publicData) {
			if (!isNonEmptyObject(publicData)) { return panic(ERR_NO_PUBLIC_DATA); }
			return produceRequest({
				method: 'post',
				path: '/account/data',
				includeHeaders: {
					authToken: true,
					appId: true
				},
				payload: publicData
			});
		}

		function getAccount() {
			return produceRequest({
				method: 'get',
				path: '/account',
				includeHeaders: {
					authToken: true,
					appId: true
				}
			});
		}

		function createLinkedAccount(linkId) {
			if (!isNonEmptyString(linkId)) { return panic(ERR_NO_LINK_ID); }
			return produceRequest({
				method: 'post',
				path: '/account/link',
				contentType: 'application/json',
				includeHeaders: {
					appId: true
				},
				payload: {
					linkId: linkId
				}
			});
		}

		function createLinkingToken(lifetimeMinutes) {
			if (!isNumber(lifetimeMinutes)) { return panic(ERR_NO_LIFETIME); }
			return produceRequest({
				method: 'get',
				path: '/account/link?validfor=:lifetimeMinutes',
				pathParams: {
					lifetimeMinutes: lifetimeMinutes
				},
				includeHeaders: {
					appId: true,
					authToken: true
				}
			});
		}

		function createAccount() {
			return produceRequest({
				method: 'post',
				path: '/account',
				includeHeaders: {
					appId: true
				}
			});
		}

	}

})(this.glomeApiService);
