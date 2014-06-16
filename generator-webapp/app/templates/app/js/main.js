'use strict';

angular.module('<%= appname %>', [
	'ngResource',
	'ngRoute'
])
.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});