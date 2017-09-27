'use strict';

penny.controller('MainCtrl', function MainCtrl($scope, $rootScope, $location, $firebaseArray) {
	$rootScope.alerts = [];
	$rootScope.closeAlert = function(index) {
		$rootScope.alerts.splice(index, 1);
	};
	
});
