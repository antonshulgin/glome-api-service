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

		return externals;

		function createSocialObject(schemaName, objectModel) {
			if (!util.isNonEmptyString(schemaName)) {
				return util.panic('No valid schemaName provided');
			}
			if (!util.isNonEmptyObject(objectModel)) {
				return util.panic('No valid objectModel provided');
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


