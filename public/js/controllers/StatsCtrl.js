'use strict';

penny.controller('StatsCtrl', function MainCtrl($scope, $rootScope, $location, $firebaseArray) {
	
	var eventsUrl = `https://penny-for-your-thought.firebaseio.com/users/${currentUid}/events`;
	var eventsRef = new Firebase(eventsUrl);
	var eventsArray = $firebaseArray(eventsRef);

	eventsArray.$loaded()
		.then(function (data) {
			init(data);
		});
	
	function init(events){
		$scope.totalPositive = _.filter(events, { 'type': 'positive'}).length;
		$scope.totalNegative = _.filter(events, { 'type': 'negative'}).length;
	}
});
