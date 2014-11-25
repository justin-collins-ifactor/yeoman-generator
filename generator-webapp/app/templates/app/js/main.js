angular.module('<%= appname %>', ['ngResource', 'ui.router']);

function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
	.when('', '/home');

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'templates/home.tpl.html',
		controller: 'HomeCtrl',
		controllerAs: 'HomeCtrl'
		/*resolve:{
			loadJocs: ['JocService', function(JocService){
				return JocService.getData();
			}]
		}*/
	});
}
config.$inject = ['$stateProvider', '$urlRouterProvider'];

function <%= appname %>Controller($scope) {}
<%= appname %>Controller.$inject = ['$scope'];

angular.module('<%= appname %>')
.config(config)
.controller('<%= appname %>Controller', <%= appname %>Controller);