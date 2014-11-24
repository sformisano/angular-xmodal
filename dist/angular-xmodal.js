'use strict';
angular.module('angular-xmodal', ['angular-xclick']);
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
'use strict';

angular.module('angular-xmodal')
  .service('xmodalService', function($rootScope, $q){
    function _validateConfig(config, type){
      var titleIsValid = config.title && typeof(config.title) === 'string';

      if( ! titleIsValid ){
        throw new Error('Please enter a valid xmodal title.');
      }

      var bodyIsValid = (
        type !== 'dialog' ||
        config.bodyHtml && typeof(config.bodyHtml) === 'string' ||
        config.bodyTemplate && typeof(config.bodyTemplate) === 'string'
      );

      if( ! bodyIsValid ){
        throw new Error('Please enter a valid xmodal body.');
      }
    }

    function _show(config){
      var deferred = $q.defer();
      $rootScope.$emit('xmodalShow', config, deferred);
      return deferred.promise;
    }

      function _showDialog(config){
        config = angular.extend({}, config, { type: 'dialog'});
        _validateConfig(config);
        return _show(config);
      }

      function _showNotice(config){
        config = angular.extend({}, config, { type: 'notice'} );
        _validateConfig(config);
        return _show(config);
      }

      function _showWaiting(config){
        config = angular.extend({}, config, { type: 'waiting'} );
        _validateConfig(config);
        return _show(config);
      }

      function _showSuccess(config){
        config = angular.extend({}, config, { type: 'success'} );
        _validateConfig(config);
        return _show(config);
      }

      function _showError(config){
        config = angular.extend({}, config, { type: 'error'} );
        _validateConfig(config);
        return _show(config);
      }

    function _hide(){
      $rootScope.$emit('xmodalHide');
    }

    return {
      dialog: _showDialog,
      notice: _showNotice,
      waiting: _showWaiting,
      success: _showSuccess,
      error: _showError,
      done: _hide
    };
  });
(function(module) {
try { module = angular.module("angular-xmodal"); }
catch(err) { module = angular.module("angular-xmodal", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/xmodal.html",
    "<div id=\"xmodal\"\n" +
    "  ng-class=\"{visible: xmodalVisible, above: xmodalAbove}\"\n" +
    "  xclick=\"close()\">\n" +
    "\n" +
    "  <div id=\"xmodal-inner\">\n" +
    "    <div id=\"xmodal-content-wrapper\" xclick=\"close()\">\n" +
    "      <div id=\"xmodal-content\" class=\"{{xmodal.type}}\">\n" +
    "        <button id=\"close-xmodal\"\n" +
    "          ng-if=\"xmodal.type === 'dialog'\"\n" +
    "          xclick=\"close()\">X</button>\n" +
    "          \n" +
    "        <h3 ng-if=\"xmodal.title\" ng-bind-html=\"xmodal.title\"></h3>\n" +
    "\n" +
    "        <div class=\"xmodal-body\"\n" +
    "          ng-if=\"xmodal.bodyHtml\"\n" +
    "          ng-bind-html=\"xmodal.bodyHtml\"></div>\n" +
    "          \n" +
    "        <div class=\"xmodal-body\"\n" +
    "          ng-if=\"xmodal.bodyTemplate\"\n" +
    "          ng-include=\"xmodal.bodyTemplate\"></div>\n" +
    "\n" +
    "        <div ng-if=\"xmodal.type === 'dialog'\" id=\"xmodal-answers\">\n" +
    "          <button class=\"cancel\"\n" +
    "            ng-if=\"xmodal.cancelLabel\"\n" +
    "            ng-click=\"dialogCancel()\">{{xmodal.cancelLabel}}</button>\n" +
    "\n" +
    "          <button class=\"confirm\"\n" +
    "            ng-if=\"xmodal.confirmLabel\"\n" +
    "            ng-click=\"dialogConfirm()\">{{xmodal.confirmLabel}}</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();
