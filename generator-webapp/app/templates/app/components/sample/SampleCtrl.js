function SampleCtrl(SampleDataResolver) {
	var scope = this;
	scope.data = SampleDataResolver;
}
SampleCtrl.$inject = ['SampleDataResolver'];

angular.module('<%= appname %>').controller('SampleCtrl', SampleCtrl);