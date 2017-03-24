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

		return externals;

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
