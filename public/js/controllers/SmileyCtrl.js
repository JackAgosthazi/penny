'use strict';

penny.controller('SmileyCtrl', function MainCtrl($scope, $rootScope, $location, $firebaseArray, $state) {

  var eventsUrl = `https://penny-for-your-thought.firebaseio.com/users/${currentUid}/events`;
  var eventsRef = new Firebase(eventsUrl);
  var eventsArray = $firebaseArray(eventsRef);

  var emotionsUrl = `https://penny-for-your-thought.firebaseio.com/users/${currentUid}/emotions`;
  var emotionsRef = new Firebase(emotionsUrl);
  var emotionsArray = $firebaseArray(emotionsRef);

  $scope.tagOnLongPress = function (tag, index) {
    var isRemove = confirm('Would you like to remove this emotion from the list?');

    if (isRemove) {
      emotionsArray.$remove(tag).then(function () {
        $rootScope.alerts.push({type: 'success', msg: `Removed emotion: ${tag.name}`});
      });
    }
  };

  // add custom emotions once they loaded
  emotionsArray.$loaded()
    .then(function (data) {
      if (data.length == 0) {
        createStandardEmotions();
      }

      $scope.tags = data;
    });

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
      emotionsArray.$add(emotion).then(function () {
        $rootScope.alerts.push({type: 'success', msg: `Added new emotion: ${name}`});
        $scope.tags = emotionsArray;
      });
    }
  };

  function logEvent(name, type) {
    var event = {
      name,
      type,
      time: new Date().getTime()
    };

    eventsArray.$add(event).then(function () {

      // make standard name human-readable
      if (name == 'penny-happy') {
        name = 'Happy';
      }

      $rootScope.alerts.push({type: 'success', msg: `Logged ${name} emotion`});
      $state.go('smiley');
    });
  }

  function createStandardEmotions() {
    Promise.all([
      emotionsArray.$add({name: 'Angry', type: 'negative'}),
      emotionsArray.$add({name: 'Sad', type: 'negative'}),
      emotionsArray.$add({name: 'Jealous', type: 'negative'}),
      emotionsArray.$add({name: 'Frustrated', type: 'negative'})
    ]).then(function (ref) {
      console.log('Standard emotions created');
    });

  }

});
