/**
 * highcharts
 */
define(['jquery', 'app', 'highcharts', 'moment'], function($, app, highcharts, moment) {

	app.service("chartHelper", function() {
		this.getBasicConfig = function() {
			//前一天日期（昨天）
			var todayDate = moment().format('YYYY-MM-DD');
			var headerFormat = todayDate + " {point.key}<br/><br/>";
			
			var option = {
				title: {
					text: ''
				},
				subtitle: {
					text: ''
				},
				credits: {
					enabled: false
				},
				legend: {
					align: 'center',
					verticalAlign: 'bottom',
					layout: 'horizontal'
				},
				yAxis: {
					title: {
						text: ''
					}
				},
				tooltip: {
					shared: true,
					valueSuffix: '',
					headerFormat: headerFormat
				}
			};

			return option;
		}

		this.getChart = function(option) {
			return new Highcharts.chart(option);
		}

		this.redraw = function(chart, series) {
			for(var i = 0, j = series.length; i < j; i++) {
				chart.series[i].setData(series[i]);
			}
			chart.redraw();
		}

		this.getColumnChart = function(element, categories) {
			var option = $.extend(this.getBasicConfig(), {
				chart: {
					type: 'column',
					renderTo: element
				},
				xAxis: {
					categories: categories,
					tickInterval: 6,
					crosshair: true
				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				series: [{
					name: '今日',
					color: '#2AB5FF',
					fillColor: 'rgba(42,181,255,0.5)',
					data: []
				}, {
					name: '对比日',
					color: '#BABABA',
					fillColor: 'rgba(205,205,205,0.6)',
					data: []
				}]
			});

			return this.getChart(option);
		}

		this.getAreasplineChart = function(element, categories) {
			var option = $.extend(this.getBasicConfig(), {
				chart: {
					type: 'areaspline',
					renderTo: element
				},
				legend: {
					reversed: true
				},
				xAxis: {
					categories: categories,
					tickInterval: 120,
					showLastLabel: true
				},
				plotOptions: {
					areaspline: {
						fillOpacity: 0.5
					}
				},
				series: [{
					name: '对比日',
					color: '#BABABA',
					fillColor: 'rgba(205,205,205,0.6)',
					data: []
				}, {
					name: '今日',
					color: '#2AB5FF',
					fillColor: 'rgba(42,181,255,0.5)',
					data: []
				}]
			});

			return this.getChart(option);
		}

		//数据对象
		function dataItem(y, isCurrent) {
			this.y = y;
			this.color = isCurrent ? '#fa6456' : '#2AB5FF';
		}

		this.getDataItem = function(y, isCurrent) {
			return new dataItem(y, isCurrent);
		};
		
	});

});