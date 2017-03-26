// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.socialObjects = socialObjects();

	function socialObjects() {
		const ERR_NO_SCHEMA_NAME = 'No valid schemaName provided';
		const ERR_NO_OBJECT_ID = 'No valid objectId provided';
		const ERR_NO_OBJECT_MODEL = 'No valid objectModel provided';

		const panic = glomeApiService.panic;
		const isNonEmptyString = glomeApiService.isNonEmptyString;
		const isNonEmptyObject = glomeApiService.isNonEmptyObject;
		const produceRequest = glomeApiService.produceRequest;

		const externals = {};

		externals.createSocialObject = createSocialObject;
		externals.deleteSocialObject = deleteSocialObject;
		externals.getSocialObject = getSocialObject;
		externals.listSocialObjects = listSocialObjects;
		externals.replaceSocialObject = replaceSocialObject;
		externals.updateSocialObject = updateSocialObject;

		return externals;

		function updateSocialObject(schemaName, objectId, objectModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(objectId)) { return panic(ERR_NO_OBJECT_ID); }
			if (!isNonEmptyObject(objectModel)) { return panic(ERR_NO_OBJECT_MODEL); }
			return produceRequest({
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
				data: {
					model: objectModel
				}
			});
		}

		function replaceSocialObject(schemaName, objectId, objectModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(objectId)) { return panic(ERR_NO_OBJECT_ID); }
			if (!isNonEmptyObject(objectModel)) { return panic(ERR_NO_OBJECT_MODEL); }
			return produceRequest({
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
				data: {
					model: objectModel
				}
			});
		}

		function listSocialObjects(schemaName) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			return produceRequest({
				method: 'get',
				path: '/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					authToken: true,
					appId: true
				}
			});
		}

		function getSocialObject(schemaName, objectId) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(objectId)) { return panic(ERR_NO_OBJECT_ID); }
			return produceRequest({
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
			});
		}

		// A payload within a DELETE request message has no defined semantics;
		// sending a payload body on a DELETE request might cause some existing
		// implementations to reject the request.
		// https://tools.ietf.org/html/rfc7231#section-4.3.5
		function deleteSocialObject(schemaName, objectId) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyString(objectId)) { return panic(ERR_NO_OBJECT_ID); }
			return produceRequest({
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
			});
		}

		function createSocialObject(schemaName, objectModel) {
			if (!isNonEmptyString(schemaName)) { return panic(ERR_NO_SCHEMA_NAME); }
			if (!isNonEmptyObject(objectModel)) { return panic(ERR_NO_OBJECT_MODEL); }
			return produceRequest({
				method: 'post',
				path: '/:schemaName',
				pathParams: {
					schemaName: schemaName
				},
				includeHeaders: {
					authToken: true,
					appId: true
				},
				data: {
					model: objectModel
				}
			});
		}
	}

})(this.glomeApiService);
