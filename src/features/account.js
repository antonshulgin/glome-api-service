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

		return externals;

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
