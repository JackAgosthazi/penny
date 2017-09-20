'use strict';

penny.controller('SmileyCtrl', function MainCtrl($scope, $location, $firebaseArray) {
	console.log('SmileyCtrl');
	
	var url = `https://penny-for-your-thought.firebaseio.com/users/${currentUid}/events`;
	var fireRef = new Firebase(url);
	var eventsArray = $firebaseArray(fireRef);
	
	$scope.tags = ['Angry', 'Sad', 'Jealous', 'Frustrated'];
	$scope.mode = 'main';
	
	$scope.smileyClicked = function(type){
		
		if(type == 'penny-happy'){
			logEvent('penny-happy');
		}else if(type == 'penny-sad'){
			// open sad options
			$scope.mode = 'tagList';
		}else{
			logEvent(type);
		}
		
	};
	
	
	function logEvent(type){
		console.log('log type: ', type);
		
		var event = {
			type,
			time: new Date().getTime()
		};

		eventsArray.$add(event).then(function(ref) {
			var id = ref.key();
			console.log("added record with id " + id);
		});
		
	}
	
});
