// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.schemas = schemas();

	function schemas() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;
		const util = glomeApiService.util;

		externals.createSchema = createSchema;
		externals.deleteSchema = deleteSchema;
		externals.getSchema = getSchema;
		externals.listSchemas = listSchemas;
		externals.replaceSchema = replaceSchema;

		return externals;

		function replaceSchema(schemaName, schemaModel) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyObject(schemaModel)) {
				return core.panic('No valid schemaModel provided');
			}
			const params = {
				method: 'put',
				path: '/schemas/' + encodeURIComponent(schemaName),
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: schemaModel
			};
			return core.produceRequest(params);
		}

		function listSchemas() {
			const params = {
				method: 'get',
				path: '/schemas',
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function getSchema(schemaName) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			const params = {
				method: 'get',
				path: '/schemas/' + encodeURIComponent(schemaName),
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function deleteSchema(schemaName) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			const params = {
				method: 'delete',
				path: '/schemas/' + encodeURIComponent(schemaName),
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function createSchema(schemaModel) {
			if (!util.isNonEmptyObject(schemaModel)) {
				return core.panic('No valid schemaModel provided');
			}
			const params = {
				method: 'post',
				path: '/schemas',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: schemaModel
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);
