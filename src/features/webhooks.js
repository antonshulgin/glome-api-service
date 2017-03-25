// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	const ERR_NO_WEBHOOK_ID = 'No valid webhookId provided';
	const ERR_NO_WEBHOOK_MODEL = 'No valid webhookModel provided';

	glomeApiService.webhooks = webhooks();

	function webhooks() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;

		externals.createWebhook = createWebhook;
		externals.deleteWebhook = deleteWebhook;
		externals.getWebhook = getWebhook;
		externals.listWebhooks = listWebhooks;
		externals.replaceWebhook = replaceWebhook;
		externals.updateWebhook = updateWebhook;

		return externals;

		function updateWebhook(webhookId, webhookModel) {
			if (!core.isNonEmptyString(webhookId)) {
				return core.panic(ERR_NO_WEBHOOK_ID);
			}
			if (!core.isNonEmptyObject(webhookModel)) {
				return core.panic(ERR_NO_WEBHOOK_MODEL);
			}
			const params = {
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
			};
			return core.produceRequest(params);
		}

		function replaceWebhook(webhookId, webhookModel) {
			if (!core.isNonEmptyString(webhookId)) {
				return core.panic(ERR_NO_WEBHOOK_ID);
			}
			if (!core.isNonEmptyObject(webhookModel)) {
				return core.panic(ERR_NO_WEBHOOK_MODEL);
			}
			const params = {
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
			if (!core.isNonEmptyString(webhookId)) {
				return core.panic(ERR_NO_WEBHOOK_ID);
			}
			const params = {
				method: 'get',
				path: '/webhooks/:webhookId',
				pathParams: {
					webhookId: webhookId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function deleteWebhook(webhookId) {
			if (!core.isNonEmptyString(webhookId)) {
				return core.panic(ERR_NO_WEBHOOK_ID);
			}
			const params = {
				method: 'delete',
				path: '/webhooks/:webhookId',
				pathParams: {
					webhookId: webhookId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function createWebhook(webhookModel) {
			if (!core.isNonEmptyObject(webhookModel)) {
				return core.panic(ERR_NO_WEBHOOK_MODEL);
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
