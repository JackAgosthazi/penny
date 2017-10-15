'use strict';

penny.controller('SmileyCtrl', function SmileyCtrl($scope, $rootScope, $location, $state, $uibModal, $document) {

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
  
  $scope.openAddModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      appendTo: angular.element($document[0].querySelector('.smiley-page')),
      templateUrl: 'addEmotionModal.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: 'sm',
      resolve: {
        items: function () {
          return 'hello';
        }
      }
    });

    modalInstance.result.then(function (tagName) {
      // ok click on modal
      addTag(tagName);
    }, function () {
      // cancel click on modal
    });
  };
  
  function addTag(name) {
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
  }

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

penny.controller('ModalInstanceCtrl', function ($uibModalInstance) {
  var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.emotionName);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
