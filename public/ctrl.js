angular.module('ip')
.controller('ctrl', function ($scope, mainService) {
  $scope.thisComputer = "192.168.1.75";
  $scope.thatComputer = "192.168.0.5";
  $scope.ctrlTest = "controller is working";
  $scope.serviceTest = mainService.serviceTest;

  mainService.getMyIp()
  .then(function (res) {
    $scope.thisComputer = res;
    });

  $scope.startThisComputer = function(){
    console.log('this clicked: ');
    mainService.startThisComputer()
    .then(function (res) {
      });
  }

  $scope.startThatComputer = function(){
    console.log('that clicked: ');
    mainService.startThatComputer($scope.thisComputer, $scope.thatComputer)
    .then(function (res) {
      var rows = res.replace(/Bytes/g,"Bytesmmmm").replace(/sec/g,"secmmmm").replace(/\[\s+\S+\]\s/g,"").replace(/\\n/g,"nnnn");
      var rows=rows.split("nnnn");
      var resultsTable=[];
      var resultsTrue = false;
      for(var i=0;i<rows.length;i++){
        if(resultsTrue){
          var entry = rows[i].split("mmmm");
        resultsTable.push(entry);
        }
        if(rows[i].indexOf("- - - - -") > -1){
          resultsTrue = true;
        }
        if(rows[i].indexOf("receiver") > -1){
          break;
        }
      }
      $scope.testResults = resultsTable;
      console.log("testResults: ", $scope.testResults)
      })
      .then(function (response) {
        mainService.storeResults($scope.testResults)
        .then(function (response) {
          $scope.currentResults = response;
        });;
      });
  }

  $scope.getPastResults = function(){
    console.log('contrl past: ');
    mainService.getPastResults()
    .then(function (response) {
        $scope.allResults = response;
      });
  }


  /////////////////////////
})
