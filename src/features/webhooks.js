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
		externals.listWebhooks = listWebhooks;
		externals.replaceWebhook = replaceWebhook;

		return externals;

		function replaceWebhook(webhookId, webhookModel) {
			if (!util.isNonEmptyString(webhookId)) {
				return core.panic('No valid webhookId provided');
			}
			if (!util.isNonEmptyObject(webhookModel)) {
				return core.panic('No valid webhookModel provided');
			}
			const params = {
				method: 'put',
				path: '/webhooks/' + encodeURIComponent(webhookId),
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: webhookModel
			};
			return core.produceRequest(params);
		}

		function listWebhooks() {
			const params = {
				method: 'get',
				path: '/webhooks',
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

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

		function createWebhook(webhookModel) {
			if (!util.isNonEmptyObject(webhookModel)) {
				return core.panic('No valid webhookModel provided');
			}
			const params = {
				method: 'post',
				path: '/webhooks',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: webhookModel
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);
