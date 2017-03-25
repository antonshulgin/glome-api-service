// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.user = user();

	function user() {
		const ERR_NO_USER_ID = 'No valid userId provided';
		const ERR_NO_APP_DATA = 'No valid appData provided';

		const panic = glomeApiService.core.panic;
		const isNonEmptyString = glomeApiService.core.isNonEmptyString;
		const isNonEmptyObject = glomeApiService.core.isNonEmptyObject;
		const produceRequest = glomeApiService.core.produceRequest;

		const externals = {};

		externals.getUser = getUser;
		externals.setAppData = setAppData;

		return externals;

		function setAppData(userId, appData) {
			if (!isNonEmptyString(userId)) { return panic(ERR_NO_USER_ID); }
			if (!isNonEmptyObject(appData)) { return panic(ERR_NO_APP_DATA); }
			return produceRequest({
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
			});
		}

		function getUser(userId) {
			if (!isNonEmptyString(userId)) { return panic(ERR_NO_USER_ID); }
			return produceRequest({
				method: 'get',
				path: '/user/:userId',
				pathParams: {
					userId: userId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}
	}

})(this.glomeApiService);

