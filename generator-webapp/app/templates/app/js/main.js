angular.module('<%= appname %>', ['ngResource', 'ngRoute']);

function config($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}
config.$inject = ['$routeProvider'];

function <%= appname %>Controller($scope) {

}
<%= appname %>Controller.$inject = ['$scope'];

angular.module('<%= appname %>')
.config(config)
.controller('<%= appname %>Controller', <%= appname %>Controller);