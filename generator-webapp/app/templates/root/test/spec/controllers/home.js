'use strict';

describe('Controller: homeCtrl', function () {
	//create data matching function
	beforeEach(function(){
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});

	// load the controller's module
	beforeEach(module('<%= appname %>'));

	var homeCtrl, scope, httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
		scope = $rootScope.$new();

		httpBackend = $httpBackend;

		homeCtrl = $controller('homeCtrl', {$scope: scope});
	}));

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});
});