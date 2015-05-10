angular.module('<%= appname %>', ['ngResource', 'ui.router']);

function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
	.when('', '/sample');

	$stateProvider
	.state('sample', {
		url: '/sample',
		templateUrl: 'components/sample/SampleView.tpl.html',
		controller: 'SampleCtrl',
		controllerAs: 'SampleCtrl',
		resolve:{
			SampleDataResolver: ['SampleService', function(SampleService){
				return SampleService.getData();
			}]
		}
	});
}
config.$inject = ['$stateProvider', '$urlRouterProvider'];

function <%= appname %>Ctrl($scope) {}
<%= appname %>Ctrl.$inject = ['$scope'];

angular.module('<%= appname %>')
.config(config)
.controller('<%= appname %>Ctrl', <%= appname %>Ctrl);