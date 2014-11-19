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