/**
 * 入口文件
 * 2017-06-23
 */
require.config({
	baseUrl: "js/",
	map: {
		'*': {
			'css': 'libs/require/css'
		}
	},
	paths: {
		"jquery": "libs/jquery-1.11.1.min",
		"jquery-ui": "libs/jquery-ui-1.10.3.min",
		"datepicker-cn": "libs/datepicker-zh-CN",
		"moment": "libs/moment.min",
		"highcharts": "libs/highcharts",

		"angular": "libs/angular.min",
		"angular-route": "libs/angular-route.min",
		"angular-sanitize": "libs/angular-sanitize.min",

		"preloader": "directives/preloader",
		"leftpanel": "directives/leftpanel",
		"headerbar": "directives/headerbar",
		"datepickerBox": "directives/datepickerBox",
		"areaRdio": "directives/areaRdio",

		"chartHepler" : "services/chartHepler",
		"queryCriteria" : "services/queryCriteria",

		"app": "controllers/app",
		"homeCtrl": "controllers/homeCtrl",
		"route": "routes/appRoute",
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-route': {
			deps: ["angular"],
			exports: 'angular-route'
		},
		'angular-sanitize': {
			deps: ['angular'],
			exports: 'angular-sanitize'
		},
		'jquery-ui': {
			deps: ['jquery'],
			exports: 'jquery-ui'
		},
		'datepicker-cn': {
			deps: ['jquery-ui'],
			exports: 'datepicker-cn'
		},
		'highcharts': {
			deps: ['jquery'],
			exports: 'highcharts'
		}
	}
});

require(['jquery', 'angular', 'angular-route', 'angular-sanitize', 'app', 'route', 'preloader', 'leftpanel', 'headerbar', 'datepickerBox', 'areaRdio', 'queryCriteria', 'chartHepler', 'homeCtrl'], function($, angular) {
	$(function() {
		angular.bootstrap(document, ["kpApp"]);

		$('#preloader').delay(350).fadeOut(function() {
			$('body').delay(350).css({
				'overflow': 'visible'
			});
		});
	});
});