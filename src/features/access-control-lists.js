// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.accessControlLists = accessControlLists();

	function accessControlLists() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;
		const util = glomeApiService.util;

		externals.getListForObject = getListForObject;
		externals.getListForSchema = getListForSchema;
		externals.replaceListForObject = replaceListForObject;
		externals.replaceListForSchema = replaceListForSchema;

		return externals;

		function replaceListForSchema(schemaName, listModel) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyObject(listModel)) {
				return core.panic('No valid listModel provided');
			}
			const params = {
				method: 'put',
				path: '/schemas/' + encodeURIComponent(schemaName),
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: listModel
			};
			return core.produceRequest(params);
		}

		function replaceListForObject(schemaName, socialObjectId, listModel) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyString(socialObjectId)) {
				return core.panic('No valid socialObjectId provided');
			}
			if (!util.isNonEmptyObject(listModel)) {
				return core.panic('No valid listModel provided');
			}
			const params = {
				method: 'put',
				path: '/schemas/' + encodeURIComponent(schemaName) + '/' + encodeURIComponent(socialObjectId),
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: listModel
			};
			return core.produceRequest(params);
		}

		function getListForSchema(schemaName) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			const params = {
				method: 'get',
				path: '/schemas/' + encodeURIComponent(schemaName) + '/acl',
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}

		function getListForObject(schemaName, socialObjectId) {
			if (!util.isNonEmptyString(schemaName)) {
				return core.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyString(socialObjectId)) {
				return core.panic('No valid socialObjectId provided');
			}
			const params = {
				method: 'get',
				path: '/schemas/' + encodeURIComponent(schemaName) + '/' + encodeURIComponent('socialObjectId') + '/acl',
				includeHeaders: {
					appId: true,
					appSecret: true
				}
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);
