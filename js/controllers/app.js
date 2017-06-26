/**
 * 建立angular.module
 */
define(['angular'], function (angular) {
    var app = angular.module('kpApp', ['ngRoute','ngSanitize']);
    
    return app;
});
