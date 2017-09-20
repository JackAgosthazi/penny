'use strict';

penny.controller('SmileyCtrl', function MainCtrl($scope, $location, $firebaseArray) {
	console.log('SmileyCtrl');

	$scope.tags = ['Angry', 'Sad', 'Jealous', 'Frustrated'];
	$scope.mode = 'main';
	
	$scope.smileyClicked = function(type){
		console.log('type: ', type);
		
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
		
	}
	
	//var url = 'https://todomvc-angular.firebaseio.com/todos';
	//var fireRef = new Firebase(url);
  //
	//// Bind the todos to the firebase provider.
	//$scope.todos = $firebaseArray(fireRef);
	//$scope.newTodo = '';
	//$scope.editedTodo = null;
	
});
