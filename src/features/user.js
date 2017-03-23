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

		return externals;

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

