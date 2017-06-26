/**
 * 首页
 */
define(['jquery', 'app', 'moment'], function($, app, moment) {
	return app.controller('homeCtrl', ['$scope', '$rootScope', '$http', '$timeout', 'queryCriteria', 'chartHelper', function($scope, $rootScope, $http, $timeout, queryCriteria, chartHelper) {

		$rootScope.headTitle = "应用概览";

		$scope.title = "应用概览";
		$scope.icon = "fa-home";
		$scope.pageClass = "home";

		//初始化
		$scope.init = function() {
			$scope.payModule = $scope.getModule("pay-chart", "收入");
			$scope.activeModule = $scope.getModule("active-chart", "活跃");
			$scope.userAddModule = $scope.getModule("userAdd-chart", "新增");

			$scope.moduleData = [$scope.payModule, $scope.activeModule, $scope.userAddModule];

			$scope.loadData();
		}

		var delay = (function() {
			var timer = 0;
			return function(callback, ms) {
				clearTimeout(timer);
				timer = setTimeout(callback, ms);
			};
		})();

		//加载数据
		$scope.loadData = function() {
			console.log(queryCriteria);
			loadOnline();
			loadPay();
			loadActive();
			loadUserAdd();
			loadTotalData();

			delay(function() {
				$scope.loadData()
			}, 120000);
		}
		
		//接收器
		$scope.$on('loadData', function () {
           $scope.loadData();
        });
		
		//数据模块
		$scope.getModule = function(id, name) {
			//数据对象
			function module(id, name) {
				this.id = id;
				this.name = name;
				this.sum = 0;
				this.prediction = 0;
				this.compare = 0;
				this.percentage = 0;

				this.setData = function(sum, prediction, compare, percentage) {
					this.sum = sum;
					this.prediction = prediction;
					this.compare = compare;
					this.percentage = percentage;
				}
			}

			return new module(id, name);
		};

		//处理数据, type = 'Column' or type = 'Areaspline'
		function handleData(data, type = 'Column') {
			var serverTime = data.serverTime;
			var today = data.today;
			var compareDay = data.compareDay;
			var hh = moment(serverTime).format('HH:00');

			var categories = [],
				seriesToday = [],
				seriesCompareDay = [];

			for(var key in today) {
				var xAxis = moment(key).format('HH:mm');
				if(xAxis == "00:00") {
					categories.push(moment(key).format('MM-DD'));
				} else {
					categories.push(xAxis);
				}
				var isCurrent = xAxis == hh;
				seriesToday.push(key > serverTime ? null : type === 'Column'? chartHelper.getDataItem(today[key], isCurrent) : today[key]);
			}

			for(var key in compareDay) {
				seriesCompareDay.push(key > serverTime ? null : compareDay[key]);
			}

			return {
				'categories': categories,
				'seriesToday': seriesToday,
				'seriesCompareDay': seriesCompareDay
			};
		}
		
		//加载在线数据图
		function loadOnline() {
			$http.get("js/data/online.json", queryCriteria).success(function(data) {
				if(!!data && data.code == 0 && !!data.data) {
					var result = handleData(data.data, 'Areaspline');

					if(!$scope.onlineChart) {
						$scope.onlineChart = chartHelper.getAreasplineChart('online', result.categories);
					}
					chartHelper.redraw($scope.onlineChart, [result.seriesCompareDay, result.seriesToday]);
				}

			});

		}

		//加载支付数据图
		function loadPay() {
			$http.get("js/data/pay.json", queryCriteria).success(function(data) {
				if(!!data && data.code == 0 && !!data.data) {
					var result = handleData(data.data);

					if(!$scope.payChart) {
						$scope.payChart = chartHelper.getColumnChart($scope.payModule.id, result.categories);
					}
					chartHelper.redraw($scope.payChart, [result.seriesToday, result.seriesCompareDay]);
				}

			});

		}
		
		//加载在线数据图
		function loadActive() {
			$http.get("js/data/active.json", queryCriteria).success(function(data) {
				if(!!data && data.code == 0 && !!data.data) {
					var result = handleData(data.data);

					if(!$scope.activeChart) {
						$scope.activeChart = chartHelper.getColumnChart($scope.activeModule.id, result.categories);
					}
					chartHelper.redraw($scope.activeChart, [result.seriesToday, result.seriesCompareDay]);
				}

			});

		}

		//加载新增数据图
		function loadUserAdd() {
			$http.get("js/data/userAdd.json", queryCriteria).success(function(data) {
				if(!!data && data.code == 0 && !!data.data) {
					var result = handleData(data.data);

					if(!$scope.userAddChart) {
						$scope.userAddChart = chartHelper.getColumnChart($scope.userAddModule.id, result.categories);
					}
					chartHelper.redraw($scope.userAddChart, [result.seriesToday, result.seriesCompareDay]);
				}

			});

		}

		//加载总计数据
		function loadTotalData() {
			$http.get("js/data/totalData.json", queryCriteria).success(function(data) {
				if(!!data && data.code == 0 && !!data.data) {
					var temp = data.data;
					$scope.payModule.setData(temp.incomeTotal, temp.incomeEstimate, temp.incomeCompare, temp.incomePercent);
					$scope.activeModule.setData(temp.activeTotal, temp.activeEstimate, temp.activeCompare, temp.activePercent);
					$scope.userAddModule.setData(temp.newDeviceTotal, temp.newDeviceEstimate, temp.newDeviceCompare, temp.newDevicePercent);

					//$scope.moduleData = [$scope.payModule, $scope.activeModule, $scope.userAddModule];
					//$scope.$apply();
				}

			});

		}

		$scope.init();
	}]);
});