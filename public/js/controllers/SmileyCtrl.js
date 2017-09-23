'use strict';

penny.controller('SmileyCtrl', function MainCtrl($scope, $rootScope, $location, $firebaseArray) {
	console.log('SmileyCtrl');
	
	var eventsUrl = `https://penny-for-your-thought.firebaseio.com/users/${currentUid}/events`;
	var eventsRef = new Firebase(eventsUrl);
	var eventsArray = $firebaseArray(eventsRef);

	var emotionsUrl = `https://penny-for-your-thought.firebaseio.com/users/${currentUid}/emotions`;
	var emotionsRef = new Firebase(emotionsUrl);
	var emotionsArray = $firebaseArray(emotionsRef);
	
	const standardEmotions = ['Angry', 'Sad', 'Jealous', 'Frustrated'];
	
	$scope.tags = _.cloneDeep(standardEmotions);
	$scope.mode = 'main';

	// add custom emotions once they loaded
	emotionsArray.$loaded()
		.then(function(data) {
			$scope.tags = _.cloneDeep(standardEmotions).concat(_.map(data, 'name'))
		});
	
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
	
	$scope.addTag = function(){
		var name = prompt("What should the new emotion be?", "Bummed out");
		var emotion = {
			name: name,
			type: 'negative'
		};
		
		if (name != null && name != "") {
			emotionsArray.$add(emotion).then(function() {
				$rootScope.alerts.push({ type: 'success', msg: `Added new emotion: ${name}`});

				$scope.tags = _.cloneDeep(standardEmotions).concat(_.map(emotionsArray, 'name'));
				
				// TODO: reload tags
			});
		}
	};
	
	function logEvent(type){
		console.log('log type: ', type);
		
		var event = {
			type,
			time: new Date().getTime()
		};

		eventsArray.$add(event).then(function() {
			
			// make standard type human-readable
			if(type == 'penny-happy'){
				type = 'Happy';
			}
			
			$rootScope.alerts.push({ type: 'success', msg: `Logged ${type} emotion`});
		});
		
	}
	
});
