/**
 * 左侧导航
 */
define(['jquery', 'app'], function($, app) {
	app.directive('leftpanel', ['$http', '$timeout', function($http, $timeout) {
		return {
			restrict: 'AE',
			templateUrl: 'js/views/leftpanel.html',
			replace: true,
			link: function(scope, ele, attr) {
				$http.get("js/data/nav.json").success(function(data) {
					scope.navData = data;

					$timeout(function() {
						$(ele).find('li.nav').hover(function() {
							$(this).addClass('nav-hover');
						}, function() {
							$(this).removeClass('nav-hover');
						});
					}, 0);
				});

			}
		};

	}]);

});