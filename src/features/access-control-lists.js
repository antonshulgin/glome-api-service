// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
	const ERR_NO_LIST_MODEL = 'No valid listModel provided';
	const ERR_NO_SOCIAL_OBJECT_ID = 'No valid socialObjectId provided';

	glomeApiService.accessControlLists = accessControlLists();

	function accessControlLists() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;

		externals.getListForObject = getListForObject;
		externals.getListForSchema = getListForSchema;
		externals.replaceListForObject = replaceListForObject;
		externals.replaceListForSchema = replaceListForSchema;
		externals.updateListForObject = updateListForObject;
		externals.updateListForSchema = updateListForSchema;

		return externals;

		function updateListForSchema(schemaName, listModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyObject(listModel)) {
				return core.panic(ERR_NO_LIST_MODEL);
			}
			const params = {
				method: 'patch',
				path: '/schemas/:schemaName/acl',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: listModel
			};
			return core.produceRequest(params);
		}

		function updateListForObject(schemaName, socialObjectId, listModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyString(socialObjectId)) {
				return core.panic(ERR_NO_SOCIAL_OBJECT_ID);
			}
			if (!core.isNonEmptyObject(listModel)) {
				return core.panic(ERR_NO_LIST_MODEL);
			}
			const params = {
				method: 'patch',
				path: '/schemas/:schemaName/:socialObjectId/acl',
				pathParams: {
					schemaName: schemaName,
					socialObjectId: socialObjectId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: listModel
			};
			return core.produceRequest(params);
		}

		function replaceListForSchema(schemaName, listModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyObject(listModel)) {
				return core.panic(ERR_NO_LIST_MODEL);
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
				data: listModel
			};
			return core.produceRequest(params);
		}

		function replaceListForObject(schemaName, socialObjectId, listModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyString(socialObjectId)) {
				return core.panic(ERR_NO_SOCIAL_OBJECT_ID);
			}
			if (!core.isNonEmptyObject(listModel)) {
				return core.panic(ERR_NO_LIST_MODEL);
			}
			const params = {
				method: 'put',
				path: '/schemas/:schemaName/:socialObjectId',
				pathParams: {
					schemaName: schemaName,
					socialObjectId: socialObjectId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: listModel
			};
			return core.produceRequest(params);
		}

		function getListForSchema(schemaName) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			const params = {
				method: 'get',
				path: '/schemas/:schemaName/acl',
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

		function getListForObject(schemaName, socialObjectId) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyString(socialObjectId)) {
				return core.panic(ERR_NO_SOCIAL_OBJECT_ID);
			}
			const params = {
				method: 'get',
				path: '/schemas/:schemaName/:socialObjectId/acl',
				pathParams: {
					schemaName: schemaName,
					socialObjectId: socialObjectId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);
