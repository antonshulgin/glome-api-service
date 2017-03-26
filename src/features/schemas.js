// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.schemas = schemas();

	function schemas() {
		const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
		const ERR_NO_SCHEMA_FIELDS = 'No valid schemaFields provided';

		const panic = glomeApiService.panic;
		const isNonEmptyString = glomeApiService.isNonEmptyString;
		const isNonEmptyObject = glomeApiService.isNonEmptyObject;
		const produceRequest = glomeApiService.produceRequest;

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
				data: {
					name: schemaName,
					fields: schemaFields
				}
			});
		}

		function replaceSchema(schemaName, schemaFields) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyObject(schemaFields)) { return panic(ERR_NO_SCHEMA_FIELDS); }
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
				data: {
					name: schemaName,
					fields: schemaFields
				}
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

		function createSchema(schemaName, schemaFields) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyObject(schemaFields)) { return panic(ERR_NO_SCHEMA_FIELDS); }
			return produceRequest({
				method: 'post',
				path: '/schemas',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: {
					name: schemaName,
					fields: schemaFields
				}
			});
		}
	}

})(this.glomeApiService);
