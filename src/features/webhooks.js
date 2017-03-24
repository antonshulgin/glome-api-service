// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.webhooks = webhooks();

	function webhooks() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;
		const util = glomeApiService.util;

		externals.createWebhook = createWebhook;

		return externals;

		function createWebhook(hookModel) {
			if (!util.isNonEmptyObject(hookModel)) {
				return core.panic('No valid hookModel provided');
			}
			const params = {
				method: 'post',
				path: '/webhooks',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: hookModel
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);
