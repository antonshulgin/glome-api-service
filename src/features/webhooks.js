// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.webhooks = webhooks();

	function webhooks() {
		const ERR_NO_WEBHOOK_ID = 'No valid webhookId provided';
		const ERR_NO_WEBHOOK_MODEL = 'No valid webhookModel provided';

		const panic = glomeApiService.panic;
		const isNonEmptyString = glomeApiService.isNonEmptyString;
		const isNonEmptyObject = glomeApiService.isNonEmptyObject;
		const produceRequest = glomeApiService;

		const externals = {};

		externals.createWebhook = createWebhook;
		externals.deleteWebhook = deleteWebhook;
		externals.getWebhook = getWebhook;
		externals.listWebhooks = listWebhooks;
		externals.replaceWebhook = replaceWebhook;
		externals.updateWebhook = updateWebhook;

		return externals;

		function updateWebhook(webhookId, webhookModel) {
			if (!isNonEmptyString(webhookId)) { return panic(ERR_NO_WEBHOOK_ID); }
			if (!isNonEmptyObject(webhookModel)) { return panic(ERR_NO_WEBHOOK_MODEL); }
			return produceRequest({
				method: 'patch',
				path: '/webhooks/:webhookId',
				pathParams: {
					webhookId: webhookId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: webhookModel
			});
		}

		function replaceWebhook(webhookId, webhookModel) {
			if (!isNonEmptyString(webhookId)) { return panic(ERR_NO_WEBHOOK_ID); }
			if (!isNonEmptyObject(webhookModel)) { return panic(ERR_NO_WEBHOOK_MODEL); }
			return produceRequest({
				method: 'put',
				path: '/webhooks/:webhookId',
				pathParams: {
					webhookId: webhookId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: webhookModel
			});
		}

		function listWebhooks() {
			return produceRequest({
				method: 'get',
				path: '/webhooks',
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}

		function getWebhook(webhookId) {
			if (!isNonEmptyString(webhookId)) { return panic(ERR_NO_WEBHOOK_ID); }
			return produceRequest({
				method: 'get',
				path: '/webhooks/:webhookId',
				pathParams: {
					webhookId: webhookId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}

		function deleteWebhook(webhookId) {
			if (!isNonEmptyString(webhookId)) { return panic(ERR_NO_WEBHOOK_ID); }
			return produceRequest({
				method: 'delete',
				path: '/webhooks/:webhookId',
				pathParams: {
					webhookId: webhookId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}

		function createWebhook(webhookModel) {
			if (!isNonEmptyObject(webhookModel)) { return panic(ERR_NO_WEBHOOK_MODEL); }
			return produceRequest({
				method: 'post',
				path: '/webhooks',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: webhookModel
			});
		}
	}

})(this.glomeApiService);
