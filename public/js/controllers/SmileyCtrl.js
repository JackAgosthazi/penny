'use strict';

penny.controller('SmileyCtrl', function MainCtrl($scope, $rootScope, $location, $state) {

  $scope.tagOnLongPress = function (tag, key) {
    var isRemove = confirm('Would you like to remove this emotion from the list?');

    if (isRemove) {
      $rootScope.emotionsRef.child(key).remove()
        .then(function() {
          $rootScope.emotionsRef.once('value').then(snapshot => {
            $rootScope.alerts.push({type: 'success', msg: `Removed emotion: ${tag.name}`});
            $rootScope.tags = snapshot.val();
            $scope.$apply();
          });
        });
    }
  };

  $scope.smileyClicked = function (type) {

    if (type == 'penny-happy') {
      logEvent('penny-happy', 'positive');
    } else if (type == 'penny-sad') {
      // open sad options
      $state.go('negative');
    } else {
      logEvent(type, 'negative');
    }
  };

  $scope.addTag = function () {
    var name = prompt("What should the new emotion be?", "Bummed out");
    var emotion = {
      name: name,
      type: 'negative'
    };

    if (name != null && name != "") {
      $rootScope.emotionsRef.push(emotion).then(() => {
        $rootScope.emotionsRef.once('value').then(snapshot => {
          $rootScope.alerts.push({type: 'success', msg: `Added new emotion: ${name}`});
          $rootScope.tags = snapshot.val();
          $scope.$apply();
        });
      });
    }
  };

  function logEvent(name, type) {
    var event = {
      name,
      type,
      time: new Date().getTime()
    };

    $rootScope.eventsRef.push(event).then(() => {
      $rootScope.eventsRef.once('value').then(() => {
        // make standard name human-readable
        if (name == 'penny-happy') {
          name = 'Happy';
        }

        $rootScope.alerts.push({type: 'success', msg: `Logged ${name} emotion`});
        $state.go('smiley');
        $rootScope.$apply();
      });
    });
  }
  
});
