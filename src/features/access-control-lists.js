// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.accessControlLists = accessControlLists();

	function accessControlLists() {
		const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
		const ERR_NO_LIST_MODEL = 'No valid listModel provided';
		const ERR_NO_OBJECT_ID = 'No valid objectId provided';

		const panic = glomeApiService.panic;
		const isNonEmptyString = glomeApiService.sNonEmptyString;
		const isNonEmptyObject = glomeApiService.sNonEmptyObject;
		const produceRequest = glomeApiService.produceRequest;

		const externals = {};

		externals.getListForObject = getListForObject;
		externals.getListForSchema = getListForSchema;
		externals.replaceListForObject = replaceListForObject;
		externals.replaceListForSchema = replaceListForSchema;
		externals.updateListForObject = updateListForObject;
		externals.updateListForSchema = updateListForSchema;

		return externals;

		function updateListForSchema(schemaName, listModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyObject(listModel)) { return panic(ERR_NO_LIST_MODEL); }
			return produceRequest({
				method: 'patch',
				path: '/schemas/:schemaName/acl',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				payload: listModel
			});
		}

		function updateListForObject(schemaName, objectId, listModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(objectId)) { return panic(ERR_NO_OBJECT_ID); }
			if (!isNonEmptyObject(listModel)) { return panic(ERR_NO_LIST_MODEL); }
			return produceRequest({
				method: 'patch',
				path: '/schemas/:schemaName/:objectId/acl',
				pathParams: {
					schemaName: schemaName,
					objectId: objectId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				payload: listModel
			});
		}

		function replaceListForSchema(schemaName, listModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyObject(listModel)) { return panic(ERR_NO_LIST_MODEL); }
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
				payload: listModel
			});
		}

		function replaceListForObject(schemaName, objectId, listModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(objectId)) { return panic(ERR_NO_OBJECT_ID); }
			if (!isNonEmptyObject(listModel)) { return panic(ERR_NO_LIST_MODEL); }
			return produceRequest({
				method: 'put',
				path: '/schemas/:schemaName/:objectId',
				pathParams: {
					schemaName: schemaName,
					objectId: objectId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				payload: listModel
			});
		}

		function getListForSchema(schemaName) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			return produceRequest({
				method: 'get',
				path: '/schemas/:schemaName/acl',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}

		function getListForObject(schemaName, objectId) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(objectId)) { return panic(ERR_NO_OBJECT_ID); }
			return produceRequest({
				method: 'get',
				path: '/schemas/:schemaName/:objectId/acl',
				pathParams: {
					schemaName: schemaName,
					objectId: objectId
				},
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			});
		}
	}

})(this.glomeApiService);
