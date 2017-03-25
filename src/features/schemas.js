// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.schemas = schemas();

	function schemas() {
		const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
		const ERR_NO_SCHEMA_FIELDS = 'No valid schemaFields provided';
		const ERR_NO_SCHEMA_MODEL = 'No valid schemaModel provided';

		const panic = glomeApiService.core.panic;
		const isNonEmptyString = glomeApiService.core.isNonEmptyString;
		const isNonEmptyObject = glomeApiService.core.isNonEmptyObject;
		const produceRequest = glomeApiService.core.produceRequest;

		const externals = {};

		externals.createSchema = createSchema;
		externals.deleteSchema = deleteSchema;
		externals.getSchema = getSchema;
		externals.listSchemas = listSchemas;
		externals.replaceSchema = replaceSchema;
		externals.updateFields = updateFields;

		return externals;

		function updateFields(schemaName, schemaFields) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyObject(schemaFields)) { return panic(ERR_NO_SCHEMA_FIELDS); }
			return produceRequest({
				method: 'patch',
				path: '/schemas/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: schemaFields
			});
		}

		function replaceSchema(schemaName, schemaModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyObject(schemaModel)) { return panic(ERR_NO_SCHEMA_MODEL); }
			return produceRequest({
				method: 'put',
				path: '/schemas/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: schemaModel
			});
		}

		function listSchemas() {
			return produceRequest({
				method: 'get',
				path: '/schemas',
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}

		function getSchema(schemaName) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			return produceRequest({
				method: 'get',
				path: '/schemas/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}

		function deleteSchema(schemaName) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			return produceRequest({
				method: 'delete',
				path: '/schemas/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}

		function createSchema(schemaModel) {
			if (!isNonEmptyObject(schemaModel)) { return panic(ERR_NO_SCHEMA_MODEL); }
			return produceRequest({
				method: 'post',
				path: '/schemas',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: schemaModel
			});
		}
	}

})(this.glomeApiService);
