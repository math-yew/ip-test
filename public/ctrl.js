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
      });
  }

  $scope.startThatComputer = function(){
    console.log('that clicked: ');
    mainService.startThatComputer()
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
          $scope.allResults = response;
        });;
      });
  }

var res ="Connecting to host 192.168.1.75, port 5201\n[ 4] local 192.168.1.214 port 54273 connected to 192.168.1.75 port 5201\n[ ID] Interval Transfer Bandwidth\n[ 4] 0.00-1.00 sec 640 KBytes 5.23 Mbits/sec \n[ 4] 1.00-2.00 sec 896 KBytes 7.35 Mbits/sec \n[ 4] 2.00-3.00 sec 1.38 MBytes 11.5 Mbits/sec \n[ 4] 3.00-4.00 sec 1.00 MBytes 8.39 Mbits/sec \n[ 4] 4.00-5.00 sec 1.50 MBytes 12.6 Mbits/sec \n[ 4] 5.00-6.00 sec 768 KBytes 6.29 Mbits/sec \n[ 4] 6.00-7.00 sec 1.00 MBytes 8.38 Mbits/sec \n[ 4] 7.00-8.00 sec 1.38 MBytes 11.5 Mbits/sec \n[ 4] 8.00-9.00 sec 896 KBytes 7.34 Mbits/sec \n[ 4] 9.00-10.00 sec 1.38 MBytes 11.5 Mbits/sec \n- - - - - - - - - - - - - - - - - - - - - - - - -\n[ ID] Interval Transfer Bandwidth\n[ 4] 0.00-10.00 sec 10.8 MBytes 9.02 Mbits/sec sender\n[ 4] 0.00-10.00 sec 10.8 MBytes 9.02 Mbits/sec receiver\n\niperf Done.\n"




  /////////////////////////
})
