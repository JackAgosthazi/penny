'use strict';

penny.controller('MainCtrl', function MainCtrl($scope, $rootScope, $location, $firebaseArray) {
	$rootScope.alerts = [];
	$rootScope.isNavCollapsed = true;
	$rootScope.closeAlert = function(index) {
		$rootScope.alerts.splice(index, 1);
	};
	
});
