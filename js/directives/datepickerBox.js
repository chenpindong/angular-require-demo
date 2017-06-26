/**
 * datepicker
 */
define(['jquery', 'app', 'jquery-ui', 'datepicker-cn'], function($, app) {
	app.directive('datepickerBox', ['queryCriteria', function(queryCriteria) {
		return {
			restrict: 'AE',
			template: '<div class="col-xs-12 input-group"><input type="text" class="form-control datepicker" value="{{inputValue}}" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div>',
			replace: true,
			link: function(scope, ele, attr) {
				scope.inputValue = "对比日: " + queryCriteria.time;

				var options = $.extend(true, $.datepicker.regional['zh-CN'], {
					dateFormat: '对比日: yy-mm-dd',
					maxDate: '0d',
					defaultDate: queryCriteria.time,
					numberOfMonths: 2,
					showButtonPanel: false,
					onSelect: function(dateText, inst) {
						queryCriteria.time = dateText.substr(5);
						scope.$emit('homeLoadData');//发送器
					}
				});

				$(ele).find('input.datepicker').datepicker(options);

			}
		};

	}]);

});