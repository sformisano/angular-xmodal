'use strict';

angular.module('angular-xmodal')
  .directive('xmodal', function($rootScope, $timeout){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/xmodal.html',
      controller: function($scope){
        function _hide(){
          $scope.xmodalVisible = false;
        }

        function _show(ev, config, deferred){
          $scope.deferred = deferred;
          $scope.xmodal = config;
          $scope.xmodalVisible = true;
        }

        $scope.close = _hide;

        $rootScope.$on('xmodalShow', _show);
        $rootScope.$on('xmodalHide', _hide);

        $scope.$watch('xmodalVisible', function(xmodalVisible){
          if(xmodalVisible === true){
            $scope.xmodalAbove = true;
          }
          else if(xmodalVisible === false){
            $timeout(function(){
              $scope.xmodalAbove = false;
            }, 500);
          }
        });

        $scope.dialogConfirm = function(){
          $scope.deferred.resolve();
        };

        $scope.dialogCancel = function(){
          $scope.deferred.reject();
        };
      }
    };
  });