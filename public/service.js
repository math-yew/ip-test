angular.module('ip')
.service('mainService', function ($http) {
  this.test = function () {
    return $http.get('/api/test');
  }

  this.serviceTest = "service is working";

  this.startThisComputer = function() {
    return $http.get('/trigger');
  }

  this.startThatComputer = function() {
    // return $http.get('http://192.168.1.214:3002/client');

    return $http({
         method: 'GET',
         url: 'http://192.168.0.5:3002/client',
         withCredentials: true
       })
    .then(function (response) {
      // console.log('client response', response.data);
      return response.data;
    });
  }

  this.storeResults = function(results) {
    var posting = {};
    posting.results = results;
    console.log('posting: ', posting);
    return $http.post('/store', posting)
    .then(function (response) {
      return response.data;
    });;
  }


})
