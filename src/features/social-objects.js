// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.socialObjects = socialObjects();

	function socialObjects() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;
		const util = glomeApiService.util;

		externals.createSocialObject = createSocialObject;
		externals.deleteSocialObject = deleteSocialObject;
		externals.getSocialObject = getSocialObject;
		externals.listSocialObjects = listSocialObjects;
		externals.replaceSocialObject = replaceSocialObject;

		return externals;

		function replaceSocialObject(schemaName, objectId, objectModel) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyString(objectId)) {
				return core.panic('No valid objectId provided');
			}
			if (!util.isNonEmptyObject(objectModel)) {
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
			if (!util.isNonEmptyString(schemaName)) {
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
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyString(objectId)) {
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
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyString(objectId)) {
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
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyObject(objectModel)) {
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


