/**
 * 启动loading
 */
define(['jquery', 'app'], function($, app) {
	app.directive('preloader', [function() {
		return {
			restrict: 'E',
			replace: true,
			template: '<div id="preloader"><div id="status"><i class="fa fa-spinner fa-spin"></i></div></div>'
		};

	}]);

});