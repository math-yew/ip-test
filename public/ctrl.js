angular.module('ip')
.controller('ctrl', function ($scope, mainService) {

  mainService.test().then(function (res) {
    $scope.test = res.data[0].value;
  });

  $scope.ctrlTest = "controller is working";
  $scope.serviceTest = mainService.serviceTest;

  $scope.startThisComputer = function(){
    mainService.startThisComputer()
    .then(function (res) {
        $scope.test = res.data[0].value;
      });
  }

  /////////////////////////
})
