// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
	const ERR_NO_SCHEMA_FIELDS = 'No valid schemaFields provided';
	const ERR_NO_SCHEMA_MODEL = 'No valid schemaModel provided';

	glomeApiService.schemas = schemas();

	function schemas() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;

		externals.createSchema = createSchema;
		externals.deleteSchema = deleteSchema;
		externals.getSchema = getSchema;
		externals.listSchemas = listSchemas;
		externals.replaceSchema = replaceSchema;
		externals.updateFields = updateFields;

		return externals;

		function updateFields(schemaName, schemaFields) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyObject(schemaFields)) {
				return core.panic(ERR_NO_SCHEMA_FIELDS);
			}
			const params = {
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
			};
			return core.produceRequest(params);
		}

		function replaceSchema(schemaName, schemaModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyObject(schemaModel)) {
				return core.panic(ERR_NO_SCHEMA_MODEL);
			}
			const params = {
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
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			const params = {
				method: 'get',
				path: '/schemas/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function deleteSchema(schemaName) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			const params = {
				method: 'delete',
				path: '/schemas/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function createSchema(schemaModel) {
			if (!core.isNonEmptyObject(schemaModel)) {
				return core.panic(ERR_NO_SCHEMA_MODEL);
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
