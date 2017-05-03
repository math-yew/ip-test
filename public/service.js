angular.module('ip')
.service('mainService', function ($http) {

  this.serviceTest = "service is working";

  this.startThisComputer = function() {
    return $http.get('/trigger');
  }

  this.startThatComputer = function(thisIp, thatIp) {
    // return $http.get('http://192.168.1.214:3002/client');

    return $http({
         method: 'GET',
         url: 'http://'+thatIp+':3002/client/'+thisIp,
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
      return response.data[0];
    });
  }

  this.getPastResults = function() {
    console.log('service past: ');
    return $http.get('/allResults')
    .then(function (response) {
      return response.data;
    });
  }


})
