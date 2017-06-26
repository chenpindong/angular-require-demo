/**
 * rdio
 */
define(['jquery', 'app'], function($, app) {
	app.directive('areaRdio', ['$http', '$timeout', 'queryCriteria', function($http, $timeout, queryCriteria) {
		return {
			restrict: 'AE',
			template: '<div><div ng-repeat="item in rdioData" class="rdio {{item.style}} inblock"><input type="radio" name="area" id="{{item.id}}" value="{{item.value}}"/><label class="mr10" for="{{item.id}}">{{item.name}}</label></div></div>',
			replace: true,
			link: function(scope, ele, attr) {
				$http.get("js/data/area.json").success(function(data) {
					scope.rdioData = data;

					$timeout(function() {
						$.each($(ele).find('input[type=radio]'), function(){
							if($(this).val() == queryCriteria.area) {
								$(this).attr('checked', true);
							}
						});
						
						$(ele).find('input[type=radio]').click(function() {
							queryCriteria.area = $(this).val();
							scope.$emit('loadData');//发送器
						});
					}, 0);

				});

			}
		};

	}]);

});