// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.user = user();

	function user() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;
		const util = glomeApiService.util;

		externals.getUser = getUser;
		externals.setAppData = setAppData;

		return externals;

		function setAppData(userId, appData) {
			if (!util.isNonEmptyString(userId)) {
				return util.panic('No valid userId provided');
			}
			if (!util.isNonEmptyObject(appData)) {
				return util.panic('No valid appData provided');
			}
			const params = {
				method: 'post', // `put` in the example from the doc
				path: '/user/' + userId + '/data',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: appData
			};
			return core.produceRequest(params);
		}

		function getUser(userId) {
			if (!util.isNonEmptyString(userId)) {
				return util.panic('No valid userId provided');
			}
			const params = {
				method: 'get',
				path: '/user/' + userId,
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);

