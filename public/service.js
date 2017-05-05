angular.module('ip')
.service('mainService', function ($http) {

  this.serviceTest = "service is working";

  this.getMyIp = function() {
    console.log('getting ip: ');
    return $http.get('/myIp')
    .then(function (response) {
      console.log('ip response: ', response);
      return response.data;
    });
  }

  this.startThisComputer = function() {
    console.log('service: start this computer');
    return $http.get('/trigger');
  }

  this.startThatComputer = function(thisIp, thatIp) {
    return $http({
       method: 'GET',
       url: 'http://'+thatIp+':3002/client/'+thisIp,
       withCredentials: true
     })
    .then(function (response) {
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
