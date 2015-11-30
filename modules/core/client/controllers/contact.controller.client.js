'use strict';

/* grecaptcha */

angular.module('core').controller('ContactController', ['$scope', 'ContactForm',
  function($scope, ContactForm) {

    $scope.contact = function(isValid) {
      $scope.error = null;
      $scope.success = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'contactForm');
        return false;
      }

      if (grecaptcha.getResponse() === "") { // jshint ignore:line
        $scope.error = "Please resolve the captcha first!";
      } else {
        var contactForm = new ContactForm({
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
          //Get the captcha value and send it to the server for verifing
          grecaptcha: grecaptcha.getResponse() // jshint ignore:line
        });

        $scope.submitButton = "Working...";
        $scope.submitButtonDisabled = true;

        contactForm.$save(function(response) {
          //Reset the reCaptcha
          grecaptcha.reset(); // jshint ignore:line
          $scope.success = response.message;
        }, function(errorResponse) {
          console.log('errorResponse', errorResponse);
          //Reset the reCaptcha
          grecaptcha.reset(); // jshint ignore:line
          $scope.error = errorResponse.data.message;
        });

        $scope.submitButton = "Send";
        $scope.submitButtonDisabled = false;
      }
    };

  }

]);
