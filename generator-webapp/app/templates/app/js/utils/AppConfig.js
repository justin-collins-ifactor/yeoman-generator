function AppConfig(){
	var config = {
		serviceURLBase:''
	};
	return {
		set: function (settings) {
			angular.extend(config, settings);
		},
		$get: function () {
			return config;
		}
	};
}
AppConfig.$inject = [];

angular.module('<%= appname %>').provider('AppConfig', AppConfig);