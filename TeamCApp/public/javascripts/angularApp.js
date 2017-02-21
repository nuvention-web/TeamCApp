var app = angular.module('flapperNews', ['ui.router', 'apiServices', 'tokenFactory', 'languageFactory', 'formatFactory', 'apiUrls', 'checklist-model']);

app.controller('MainCtrl', [
'$scope', '$location',
function($scope, $location){
 $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

}]);

app.controller('TalkingCtrl', [
  '$scope',
  function($scope, $location){
    $scope.points = [];
    $scope.completed = [];
    $scope.addPoint = function(){
      if(!$scope.title || $scope.title === '') { return; }
      $scope.points.push({title: $scope.title, priority: 1});
    };
    $scope.incrementPriority = function(point) {
      point.priority += 1;
    };
    $scope.decrementPriority = function(point) {
      point.priority -= 1;
    };
    $scope.completedPoint = function(point) {
      $scope.points.pop(point);
      $scope.completed.push(point);
    };
    $scope.undoComplete = function(point) {
      $scope.points.push(point);
      $scope.completed.pop(point);
    };
  }]);

app.controller('NotesCtrl', [
  '$scope',
  function($scope, $location){
    $scope.notes = [];
    $scope.addNote = function(){
      $scope.notes.push({desc: $scope.desc});
    };
    $scope.deleteNote = function(note){
      $scope.notes.pop(note)
    };
  }]);

  // app.controller('HeaderController', ['$scope', '$location',
  //   function($scope, $location) {
  //   $scope.isActive = function (viewLocation) { 
  //       return viewLocation === $location.path();
  //   };
  // }]);


app.controller('LookupCtrl', [
  '$scope',
  '$http',
  'apiServices', 'tokenFactory', 'languageFactory', 'formatFactory', 'apiUrls', '$location', 
    // '$stateParams',
  // 'posts',
  function($scope, $http, apiServices, tokenFactory, languageFactory, formatFactory, apiUrls, $location){
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    var vm = $scope;

    vm.symptoms = '';
    vm.symptomsConfig= '';
    vm.symptomsError = '';
    
    vm.issues = '';
    vm.issuesConfig= '';
    vm.issuesError = '';
    
    vm.issueInfo = '';
    vm.issueInfoConfig = '';
    vm.issueInfoError = '';
    vm.issueId = 237;
    
    vm.diagnosis = '';
    vm.diagnosisConfig = '';
    vm.diagnosisError = '';
    
    vm.specialisations = '';
    vm.specialisationsConfig = '';
    vm.specialisationsError = '';
    
    vm.proposedSymptoms = '';
    vm.proposedSymptomsConfig = '';
    vm.proposedSymptomsError = '';
    
    vm.selectedSymptoms = '13';
    vm.gender = {
      value: 'male'
    }
    vm.yearOfBirth = 1988;
    vm.selectorStatus = {
      value: 'man'
    }
    
    vm.bodyLocations = '';
    vm.bodyLocationsConfig = '';
    vm.bodyLocationsError = '';
    
    vm.bodySublocations = '';
    vm.bodySublocationsConfig = '';
    vm.bodySublocationsError = '';
    vm.bodyLocationId = 16;
    
    vm.bodySublocationSymptoms = '';
    vm.bodySublocationSymptomsConfig = '';
    vm.bodySublocationSymptomsError = '';
    vm.bodySublocationId = 0;
    
    vm.redFlagText = '';
    vm.redFlagTextConfig = '';
    vm.redFlagTextError = '';
    vm.symptomId = 238;

    vm.continue = false; // false = do first continue, true = do second continue
    
    vm.languages=[{value:"en-gb",name:"en-gb"},{value:"de-ch",name:"de-ch"},{value:"fr-fr",name:"fr-fr"},{value:"es-es",name:"es-es"},{value:"tr-tr",name:"tr-tr"}]
    //Setting first option as selected in configuration select
    vm.lang = vm.languages[0].value;
    
    vm.formats=[{value:"json",name:"json"},{value:"xml",name:"xml"}]
    //Setting first option as selected in configuration select
    vm.format = vm.formats[0].value;
    
    // TOKEN HARD CODED
    vm.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJyaXR0YW55aGVycjIwMThAdS5ub3J0aHdlc3Rlcm4uZWR1Iiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMTcwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDE3LTAyLTEzIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE0ODc2NTk2ODQsIm5iZiI6MTQ4NzY1MjQ4NH0.e8c7KKPFYl_cTkzNqiOehthoQ9HYzUO0yZPwCJXlufQ';
    tokenFactory.storeToken(vm.token);


    vm.getToken = function () {
            var computedHash = CryptoJS.HmacMD5(apiUrls.authServiceUrl, vm.password);
            var computedHashString = computedHash.toString(CryptoJS.enc.Base64);
        apiServices.makeRequest({
            URL: apiUrls.authServiceUrl,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + vm.username + ':' + computedHashString
            }
        })
                .then(function (data) {
                    console.log(data);
                    vm.token = data.data.Token;
                    vm.error = '';
                }, function (data) {
                    console.log('error', data);
                    vm.error = data.data;
                    vm.token = '';
                    return false;
                });
    }


    //  LOAD THE BODY LOCATIONS #1
    vm.loadBodyLocations = function () {     
      var url = apiUrls.loadBodyLocations;
      generic_api_call(url, 'bodyLocations','bodyLocationsError','bodyLocationsConfig');
     }
    // LOAD THE SUB BODY LOCATIONS #2
     vm.loadBodySublocations = function (bodyLocationId) {
      $scope.subBody = true;
      var url = apiUrls.loadBodySublocations+'/'+bodyLocationId;
      generic_api_call(url, 'bodySublocations','bodySublocationsError','bodySublocationsConfig');
    }

    // LOAD THE SYMPTOMS #3
    vm.loadBodySublocationSymptoms = function (bodySublocationId, selectorStatus) {
      $scope.subSymptoms = true;
      var url = apiUrls.loadBodySublocationSymptoms+'/'+bodySublocationId+'/'+selectorStatus.value;
      generic_api_call(url, 'bodySublocationSymptoms','bodySublocationSymptomsError','bodySublocationSymptomsConfig');
    }

    //  LOAD THE DIAGNOSIS #4
    vm.loadDiagnosis = function (selectedSymptoms, gender, yearOfBirth) {
      $scope.loadDiag = true;
      var symptoms = selectedSymptoms.split(',');
      var url = apiUrls.loadDiagnosis+'?symptoms='+JSON.stringify(symptoms)+'&gender='+gender.value+'&year_of_birth='+yearOfBirth;
      generic_api_call(url, 'diagnosis','diagnosisError','diagnosisConfig');
    }


    // GENERATE A LIST OF INFORMATION TO DISPLAY AFTER API IS CALLED
    vm.listBodyLocations = function (bodyLocations) {

     if ($scope.subSymptoms == true) {  // LOADING SUB BODY SYMPTOMS #3, #4
          for (var i = 0; i < $scope.bodySublocationSymptoms.length; i++) {
              vm.loadDiagnosis($scope.bodySublocationSymptoms[i].ID.toString(), $scope.gender, $scope.yearOfBirth);
          }
          $scope.subSymptoms = false;
      } else if ($scope.subBody == true) { // LOADING SUB BODY PARTS #2
         $scope.subbodyParts = bodyLocations;
         $scope.subBody = false;
      } else { // LOADING BODY PARTS #1
        $scope.bodyParts = bodyLocations;
      }
      $scope.locationListed = true; 
    }


    vm.Done = function() {
      // console.log($scope.continue);
      if (!$scope.continue) { // FIRST CONTINUE
        $scope.continue = true;
        $scope.bodyLocationId = $scope.partList.bodyParts[0];
        vm.loadBodySublocations($scope.bodyLocationId);
      } else {  // SECOND CONTINUE
        $scope.continue = false;
        $scope.bodySublocationId = $scope.partList.subbodyParts[0];
        vm.loadBodySublocationSymptoms($scope.bodySublocationId, $scope.selectorStatus);
      } 
    }

// LIST OF BODY AND SUB BODY PARTS GENERATED FROM THE API
  $scope.partList = {
    bodyParts: [],
    subbodyParts: []
  };

  $scope.symptomList = []; // ARRAY OF DIAGNOSIS OBJECTS
  $scope.symptomNames = []; // ARRAY OF ONLY NAMES OF DIAGNOSIS FROM symptomList



  // CREATE LIST OF DIAGNOSIS NAMES TO BE DISPLAYED
  vm.showSymptoms = function(symList){
    for (var i = 0; i < symList.data.length; i++) {
      var x = symList.data[i].Issue;
      if ($scope.symptomNames.indexOf(x.Name) == -1) { // eliminates redundancy
        $scope.symptomNames.push(x.Name);
        $scope.symptomList.push(x);
      }
    }
    console.log($scope.symptomNames);
  }




    // $scope.$watch(
    //   function watchToken( scope ) {
    //     // Return the "result" of the watch expression.
    //     return( vm.token );
    //   },
    //   function handleTokenChange( newValue, oldValue ) {
    //     tokenFactory.storeToken(newValue);
    //     console.log( "fn( vm.token ):", newValue );
    //   }
    // );
    
    function generic_api_call(url, scope_variable_name, scope_error_variable_name, scope_config_variable_name)
    {
      var extraArgs = 'token='+tokenFactory.storeToken()+'&language='+languageFactory.storeLanguage()+'&format='+formatFactory.storeFormat()
      url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;
      vm[scope_variable_name] = "loading data from web service...";
      apiServices.makeRequest({
        URL: url,
        method: 'GET'
            })
      .then(function (data) {
        vm[scope_variable_name] = data.data != '' ? data.data : 'No results found';
        vm[scope_config_variable_name] = data.config;
        vm[scope_error_variable_name] = '';
        console.log('success', data);
        
        if (scope_variable_name == 'diagnosis') {
          vm.showSymptoms(data);
          $scope.symptomList.push(data);
        } else {
          vm.listBodyLocations(vm[scope_variable_name]);
        }
        
      }, function (data) {
        vm[scope_variable_name] = '';
        vm[scope_config_variable_name] = '';
        vm[scope_error_variable_name] = data;
        console.log('error', data);
        return false;
      });
    }




    }]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
  
  $stateProvider   
    .state('lookup', {
      url: '/lookup',
      templateUrl: '/lookup.html',
      controller: 'LookupCtrl'
    });

  $stateProvider   
    .state('talking', {
      url: '/talking',
      templateUrl: '/talking.html',
      controller: 'TalkingCtrl'
    });

  $stateProvider   
    .state('notes', {
      url: '/notes',
      templateUrl: '/notes.html',
      controller: 'NotesCtrl'
    });


  $urlRouterProvider.otherwise('home');
}]);
