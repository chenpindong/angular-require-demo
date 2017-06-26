/**
 * 路由
 */
define(['app'], function(app) {
	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'js/views/home.html',
			controller: 'homeCtrl'
		}).otherwise({
			redirectTo: '/'
		});
	}]);
});