function SampleService($resource, AppConfig){
	var data;

	var rest = $resource(AppConfig.serviceURLBase+'/path/to/json');

	var loadData = function(){
		//data = rest.query().$promise.then(dataLoaded);
	};

	var dataLoaded = function(result){
		data = result;
		return result;
	};

	var getData = function(){
		if(!data){
			loadData();
		}
		return data;
	};

	return{
		'getData':getData
	};
}

SampleService.$inject = ['$resource', 'AppConfig'];

angular.module('<%= appname %>').factory('SampleService', SampleService);