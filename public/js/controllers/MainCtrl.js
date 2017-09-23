'use strict';

penny.controller('MainCtrl', function MainCtrl($scope, $rootScope, $location, $firebaseArray) {
	console.log('MainCtrl');
	$rootScope.alerts = [];
	$rootScope.closeAlert = function(index) {
		$rootScope.alerts.splice(index, 1);
	};
	
});
