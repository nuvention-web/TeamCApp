var app = angular.module('flapperNews', ['ui.router', 'apiServices', 'tokenFactory', 'languageFactory', 'formatFactory', 'apiUrls']);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.points = [
    // {title: 'Knee pain', priority: 5},
    // {title: 'Morning cough', priority: 2},
    // {title: 'Itchy skin', priority: 1},
  ];
  $scope.completed = [
    // completed posts go here
  ];
  $scope.notes = [
    // added notes go here
  ];
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
  $scope.addNote = function(){
    $scope.notes.push({desc: $scope.desc});
  };
  $scope.deleteNote = function(note){
    $scope.notes.pop(note)
  };
}]);

app.controller('LookupCtrl', [
  '$scope',
  '$http',
  'apiServices', 'tokenFactory', 'languageFactory', 'formatFactory', 'apiUrls',
  // '$stateParams',
  // 'posts',
  function($scope, $http, apiServices, tokenFactory, languageFactory, formatFactory, apiUrls){
    
    $scope.submitSymptomForm = function() {
      var url = 'https://api.infermedica.com/v2/diagnosis';
      var h = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'App-Id': '0a050d61', 
          'App-Key': '27b39f8797dd512dad0c647e3a2b0879', 
          'Dev-Mode': true}
        };
      var d = {
        data: {'sex': 'male', 'age': 30, 
                'evidence': [{"id": "s_1193", "choice_id": "present"}]}
        };

      $http.post(url, h, d)
        .then(function(response) {
          console.log(response);
        },
        function(reason) {
          console.error('ERROR: ' + JSON.stringify(reason));
        });

      // $http.post('https://api.infermedica.com/v2/diagnosis', 
      //           {headers: {'App-Id': '0a050d61', 'App-Key': 'da284e44c660689c77129697a386fd67', 'Content-Type': 'application/json', 'Dev-Mode': 'true'}}, 
      //           {'sex': 'male', 'age': 30, 
      //             'evidence': [{"id": "s_1193", "choice_id": "present"},
      //                          {"id": "s_488", "choice_id": "present"},
      //                          {"id": "s_418", "choice_id": "present"}]})
      //   .then(function(response) {
      //     console.log(response);
      //   },
      //   function(reason) {
      //     console.error('ERROR: ' + JSON.stringify(reason));
      //   });


  
    }
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
    
    vm.languages=[{value:"en-gb",name:"en-gb"},{value:"de-ch",name:"de-ch"},{value:"fr-fr",name:"fr-fr"},{value:"es-es",name:"es-es"},{value:"tr-tr",name:"tr-tr"}]
    //Setting first option as selected in configuration select
    vm.lang = vm.languages[0].value;
    
    vm.formats=[{value:"json",name:"json"},{value:"xml",name:"xml"}]
    //Setting first option as selected in configuration select
    vm.format = vm.formats[0].value;
    
    vm.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtpdHR5LnIubGl1QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTE3MSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxNy0wMi0xMyIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNDg2OTY4OTk2LCJuYmYiOjE0ODY5NjE3OTZ9.yBuDHHvNKILXsCk9rYAJmGg6fClazt9gW9Meu4mesHk';
    tokenFactory.storeToken(vm.token);

    // vm.loadSymptoms = function () {
    //   var url = apiUrls.loadSymptoms;
    //   generic_api_call(url, 'symptoms','symptomsError','symptomsConfig');
    // }

    vm.loadDiagnosis = function (selectedSymptoms, gender, yearOfBirth) {
      var symptoms = selectedSymptoms.split(',');
      var url = apiUrls.loadDiagnosis+'?symptoms='+JSON.stringify(symptoms)+'&gender='+gender.value+'&year_of_birth='+yearOfBirth;
      generic_api_call(url, 'diagnosis','diagnosisError','diagnosisConfig');
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


  $urlRouterProvider.otherwise('home');
}]);
