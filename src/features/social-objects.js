// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
	const ERR_NO_OBJECT_ID = 'No valid objectId provided';
	const ERR_NO_OBJECT_MODEL = 'No valid objectModel provided';

	glomeApiService.socialObjects = socialObjects();

	function socialObjects() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;

		externals.createSocialObject = createSocialObject;
		externals.deleteSocialObject = deleteSocialObject;
		externals.getSocialObject = getSocialObject;
		externals.listSocialObjects = listSocialObjects;
		externals.replaceSocialObject = replaceSocialObject;
		externals.updateSocialObject = updateSocialObject;

		return externals;

		function updateSocialObject(schemaName, objectId, objectModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic(ERR_NO_OBJECT_ID);
			}
			if (!core.isNonEmptyObject(objectModel)) {
				return core.panic(ERR_NO_OBJECT_MODEL);
			}
			const params = {
				method: 'patch',
				path: '/:schemaName/:objectId',
				pathParams: {
					schemaName: schemaName,
					objectId: objectId
				},
				includeHeaders: {
					authToken: true,
					appId: true
				},
				data: objectModel
			};
			return core.produceRequest(params);
		}

		function replaceSocialObject(schemaName, objectId, objectModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic(ERR_NO_OBJECT_ID);
			}
			if (!core.isNonEmptyObject(objectModel)) {
				return core.panic(ERR_NO_OBJECT_MODEL);
			}
			const params = {
				method: 'put',
				path: '/:schemaName/:objectId',
				pathParams: {
					schemaName: schemaName,
					objectId: objectId
				},
				includeHeaders: {
					authToken: true,
					appId: true
				},
				data: objectModel
			};
			return core.produceRequest(params);
		}

		function listSocialObjects(schemaName) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			const params = {
				method: 'get',
				path: '/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					authToken: true,
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function getSocialObject(schemaName, objectId) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic(ERR_NO_OBJECT_ID);
			}
			const params = {
				method: 'get',
				path: '/:schemaName/:objectId',
				pathParams: {
					schemaName: schemaName,
					objectId: objectId
				},
				includeHeaders: {
					authToken: true,
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function deleteSocialObject(schemaName, objectId) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic(ERR_NO_OBJECT_ID);
			}
			const params = {
				method: 'delete',
				path: '/:schemaName/:objectId',
				pathParams: {
					schemaName: schemaName,
					objectId: objectId
				},
				includeHeaders: {
					authToken: true,
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function createSocialObject(schemaName, objectModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic(ERR_NO_SCHEMA_NAME);
			}
			if (!core.isNonEmptyObject(objectModel)) {
				return core.panic(ERR_NO_OBJECT_MODEL);
			}
			const params = {
				method: 'post',
				path: '/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					authToken: true,
					appId: true
				},
				data: objectModel
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);


