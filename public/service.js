angular.module('ip')
.service('mainService', function ($http) {
  this.test = function () {
    return $http.get('/api/test');
  }

  this.serviceTest = "service is working";

  this.startThisComputer = function() {
    return $http.get('/trigger');
  }

})
