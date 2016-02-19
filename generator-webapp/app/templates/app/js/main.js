angular.module('<%= appname %>', ['ngResource', 'ui.router']);

function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
	.when('', '/<%= componentName %>');

	$stateProvider
	.state('<%= componentName %>', {
		url: '/<%= componentName %>',
		templateUrl: 'components/<%= componentName %>/<%= componentNameCap %>View.tpl.html',
		controller: '<%= componentNameCap %>Ctrl',
		controllerAs: '<%= componentNameCap %>Ctrl',
		resolve:{
			<%= componentNameCap %>DataResolver: ['<%= componentNameCap %>Service', function(<%= componentNameCap %>Service){
				return <%= componentNameCap %>Service.getData();
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