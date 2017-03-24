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
		externals.deleteWebhook = deleteWebhook;
		externals.getWebhook = getWebhook;

		return externals;

		function getWebhook(webhookId) {
			if (!util.isNonEmptyString(webhookId)) {
				return core.panic('No valid webhookId provided');
			}
			const params = {
				method: 'get',
				path: '/webhooks/' + encodeURIComponent(webhookId),
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function deleteWebhook(webhookId) {
			if (!util.isNonEmptyString(webhookId)) {
				return core.panic('No valid webhookId provided');
			}
			const params = {
				method: 'delete',
				path: '/webhooks/' + encodeURIComponent(webhookId),
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

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
