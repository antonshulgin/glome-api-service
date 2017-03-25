// jshint esnext: true
(function (glomeApiService) {
	'use strict';

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
				return core.panic('No valid schemaName provided');
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic('No valid objectId provided');
			}
			if (!core.isNonEmptyObject(objectModel)) {
				return core.panic('No valid objectModel provided');
			}
			const params = {
				method: 'patch',
				path: '/' + encodeURIComponent(schemaName) + '/' + encodeURIComponent(objectId),
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
				return core.panic('No valid schemaName provided');
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic('No valid objectId provided');
			}
			if (!core.isNonEmptyObject(objectModel)) {
				return core.panic('No valid objectModel provided');
			}
			const params = {
				method: 'put',
				path: '/' + encodeURIComponent(schemaName) + '/' + encodeURIComponent(objectId),
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
				return core.panic('No valid schemaName provided');
			}
			const params = {
				method: 'get',
				path: '/' + encodeURIComponent(schemaName),
				includeHeaders: {
					authToken: true,
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function getSocialObject(schemaName, objectId) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic('No valid objectId provided');
			}
			const params = {
				method: 'get',
				path: '/' + encodeURIComponent(schemaName) + '/' + encodeURIComponent(objectId),
				includeHeaders: {
					authToken: true,
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function deleteSocialObject(schemaName, objectId) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!core.isNonEmptyString(objectId)) {
				return core.panic('No valid objectId provided');
			}
			const params = {
				method: 'delete',
				path: '/' + encodeURIComponent(schemaName) + '/' + encodeURIComponent(objectId),
				includeHeaders: {
					authToken: true,
					appId: true
				}
			};
			return core.produceRequest(params);
		}

		function createSocialObject(schemaName, objectModel) {
			if (!core.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!core.isNonEmptyObject(objectModel)) {
				return core.panic('No valid objectModel provided');
			}
			const params = {
				method: 'post',
				path: '/' + encodeURIComponent(schemaName),
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


