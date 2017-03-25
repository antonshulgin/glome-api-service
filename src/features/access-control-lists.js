// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.accessControlLists = accessControlLists();

	function accessControlLists() {
		const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
		const ERR_NO_LIST_MODEL = 'No valid listModel provided';
		const ERR_NO_SOCIAL_OBJECT_ID = 'No valid socialObjectId provided';

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
				data: listModel
			});
		}

		function updateListForObject(schemaName, socialObjectId, listModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(socialObjectId)) { return panic(ERR_NO_SOCIAL_OBJECT_ID); }
			if (!isNonEmptyObject(listModel)) { return panic(ERR_NO_LIST_MODEL); }
			return produceRequest({
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
				data: listModel
			});
		}

		function replaceListForObject(schemaName, socialObjectId, listModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(socialObjectId)) { return panic(ERR_NO_SOCIAL_OBJECT_ID); }
			if (!isNonEmptyObject(listModel)) { return panic(ERR_NO_LIST_MODEL); }
			return produceRequest({
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

		function getListForObject(schemaName, socialObjectId) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(socialObjectId)) { return panic(ERR_NO_SOCIAL_OBJECT_ID); }
			return produceRequest({
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
			});
		}
	}

})(this.glomeApiService);
