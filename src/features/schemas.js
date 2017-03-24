// jshint esnext: true
(function (glomeApiService) {
	'use strict';

	glomeApiService.schemas = schemas();

	function schemas() {
		//const internals = {};
		const externals = {};

		const core = glomeApiService.core;
		const util = glomeApiService.util;

		externals.createSchema = createSchema;

		return externals;

		function createSchema(schemaModel) {
			if (!util.isNonEmptyObject(schemaModel)) {
				return core.panic('No valid schemaModel provided');
			}
			const params = {
				method: 'post',
				path: '/schemas',
				includeHeaders: {
					appId: true,
					appSecret: true
				},
				data: schemaModel
			};
			return core.produceRequest(params);
		}
	}

})(this.glomeApiService);
