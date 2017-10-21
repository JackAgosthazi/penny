'use strict';

penny.controller('MainCtrl', function MainCtrl($scope, $rootScope) {
	$rootScope.alerts = [];
	$rootScope.isNavCollapsed = true;
	$rootScope.closeAlert = function(index) {
		$rootScope.alerts.splice(index, 1);
	};

	$rootScope.eventsRef = firebase.database().ref(`/users/${currentUid}/events`);
	$rootScope.emotionsRef = firebase.database().ref(`/users/${currentUid}/emotions`);

	$rootScope.emotionsRef.once('value').then(snapshot => {
		const data = snapshot.val();
		if (data == null) {
			createStandardEmotions();
		}
		$rootScope.tags = data;
		$rootScope.$apply();
	}, err => {
		console.error(err);
		location.reload();
	});

	function createStandardEmotions() {
		Promise.all([
			$rootScope.emotionsRef.push({name: 'Angry', type: 'negative'}),
			$rootScope.emotionsRef.push({name: 'Sad', type: 'negative'}),
			$rootScope.emotionsRef.push({name: 'Jealous', type: 'negative'}),
			$rootScope.emotionsRef.push({name: 'Frustrated', type: 'negative'})
		]).then(() => {
			$rootScope.emotionsRef.once('value').then(snapshot => {
				$rootScope.tags = snapshot.val();
				$scope.$apply();
			});
			console.log('Standard emotions created');
		});
	}
	
});
