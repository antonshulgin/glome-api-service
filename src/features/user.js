// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	const ERR_NO_USER_ID = 'No valid userId provided';
	const ERR_NO_APP_DATA = 'No valid appData provided';

	glomeApiService.user = user();

	function user() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;

		externals.getUser = getUser;
		externals.setAppData = setAppData;

		return externals;

		function setAppData(userId, appData) {
			if (!core.isNonEmptyString(userId)) {
				return core.panic(ERR_NO_USER_ID);
			}
			if (!core.isNonEmptyObject(appData)) {
				return core.panic(ERR_NO_APP_DATA);
			}
			const params = {
				method: 'post', // `put` in the example from the doc
				path: '/user/:userId/data',
				pathParams: {
					userId: userId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: appData
			};
			return core.produceRequest(params);
		}

		function getUser(userId) {
			if (!core.isNonEmptyString(userId)) {
				return core.panic(ERR_NO_USER_ID);
			}
			const params = {
				method: 'get',
				path: '/user/:userId',
				pathParams: {
					userId: userId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);

