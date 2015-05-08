function SampleService($resource){
	var data;

	var rest = $resource('/path/to/json');

	var loadData = function(){
		//data = rest.query().$promise.then(dataLoaded);
	};

	var dataLoaded = function(result){
		data = result;
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

SampleService.$inject = ['$resource'];

angular.module('<%= appname %>').factory('SampleService', SampleService);