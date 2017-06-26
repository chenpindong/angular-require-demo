/**
 * 全局设置查询条件
 */
define(['jquery', 'app', 'moment'], function($, app, moment) {

	app.factory('queryCriteria', [function() {
		var defaultTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
		var defaultArea = "10";
		
		return {
			time: defaultTime,
			area: defaultArea
		}

	}]);

});