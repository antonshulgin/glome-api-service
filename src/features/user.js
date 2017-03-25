// jshint esnext: true
(function (glomeApiService) {
	'use strict';

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
				return core.panic('No valid userId provided');
			}
			if (!core.isNonEmptyObject(appData)) {
				return core.panic('No valid appData provided');
			}
			const params = {
				method: 'post', // `put` in the example from the doc
				path: '/user/' + encodeURIComponent(userId) + '/data',
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
				return core.panic('No valid userId provided');
			}
			const params = {
				method: 'get',
				path: '/user/' + encodeURIComponent(userId),
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);

