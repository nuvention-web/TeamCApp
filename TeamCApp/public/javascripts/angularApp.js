var app = angular.module('flapperNews', ['ui.router', 'apiServices', 'tokenFactory', 'languageFactory', 'formatFactory', 'apiUrls', 'checklist-model']);

app.controller('MainCtrl', [
'$scope','$http',
  'apiServices', 'tokenFactory', 'languageFactory', 'formatFactory', 'apiUrls', '$location',
function($scope, $http, apiServices, tokenFactory, languageFactory, formatFactory, apiUrls, $location){
 $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

   var vm = $scope;
  vm.token = '';
  tokenFactory.storeToken(vm.token);

    vm.username = '';
    vm.password = '';
    vm.error = '';
    vm.loginbefore = true;
    vm.getToken = function () {
        var uri = "https://authservice.priaid.ch/login";
        var computedHash = CryptoJS.HmacMD5(uri, vm.password);
        var computedHashString = computedHash.toString(CryptoJS.enc.Base64);
        apiServices.makeRequest({
            URL: uri,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + vm.username + ':' + computedHashString
            }
        })
            .then(function (data) {
                console.log(data);
                vm.token = data.data.Token;
                vm.error = '';
                vm.loginbefore = false;
                console.log($location.path('/profile'));
            }, function (data) {
                console.log('error', data);
                vm.error = data.data;
                vm.token = '';
                return false;
            });
    }
    $scope.$watch(
      function watchToken( scope ) {
        // Return the "result" of the watch expression.
        return( vm.token );
      },
      function handleTokenChange( newValue, oldValue ) {
        tokenFactory.storeToken(newValue);
        console.log( "fn( vm.token ):", newValue );
      }
    );

}]);


app.controller('ProfileCtrl', [
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
    // Questions
    $scope.questions = [];
    $scope.form = false;
    $scope.addQuestion = function(){
      $scope.questions.push({title: $scope.title});
       $scope.title = "";
      console.log($scope.questions);
    };
    $scope.deleteQuestion = function(question){
      for (var i = 0; i < $scope.questions.length; i++) {
        if (question.title = $scope.questions[i].title) {
          $scope.questions.splice(i, 1)
        }
      }
      console.log($scope.questions);
    };
    $scope.displayForm = function(){
      $scope.form = !$scope.form;
      console.log($scope.form);
    };



    // Notes
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

    vm.continueStep = 0;
    
    vm.languages=[{value:"en-gb",name:"en-gb"},{value:"de-ch",name:"de-ch"},{value:"fr-fr",name:"fr-fr"},{value:"es-es",name:"es-es"},{value:"tr-tr",name:"tr-tr"}]
    //Setting first option as selected in configuration select
    vm.lang = vm.languages[0].value;
    
    vm.formats=[{value:"json",name:"json"},{value:"xml",name:"xml"}]
    //Setting first option as selected in configuration select
    vm.format = vm.formats[0].value;

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
      console.log('selectedSymptoms is', selectedSymptoms, ' with type of ', typeof selectedSymptoms);
      var symptoms = selectedSymptoms;// .split(',');
      var url = apiUrls.loadDiagnosis+'?symptoms='+JSON.stringify(symptoms)+'&gender='+gender.value+'&year_of_birth='+yearOfBirth;
      generic_api_call(url, 'diagnosis','diagnosisError','diagnosisConfig');
    }


    // GENERATE A LIST OF INFORMATION TO DISPLAY AFTER API IS CALLED
    vm.listBodyLocations = function (bodyLocations) {
      if ($scope.loadDiag) { 
        console.log('hello');
          for (var i = 0; i < $scope.symptomId.length; i++) {
            // vm.loadDiagnosis($scope.bodySublocationSymptoms[i].ID.toString(), $scope.gender, $scope.yearOfBirth);
            vm.loadDiagnosis($scope.symptomId[i].ID.toString(), $scope.gender, $scope.yearOfBirth);
          }
          $scope.loadDiag = false;
      } else if ($scope.subSymptoms) { // Loading sub bodypart symptoms #3
        $scope.subPartSymptoms = bodyLocations; 
        $scope.subSymptoms = false;
      } else if ($scope.subBody) { // LOADING SUB BODY PARTS #2
         $scope.subbodyParts = bodyLocations;
         $scope.subBody = false;
      } else { // LOADING BODY PARTS #1
        $scope.bodyParts = bodyLocations;
      }
      $scope.locationListed = true; 
    }

    vm.continue = function () {
      switch($scope.continueStep) {
        case 0:
          $scope.continueStep = 1;
          vm.loadBodyLocations();
          break;
        case 1:
          $scope.continueStep = 2;
          $scope.bodyLocationId = $scope.partList.bodyParts[0];
          vm.loadBodySublocations($scope.bodyLocationId);
          break;
        case 2:
          $scope.continueStep = 3;
          $scope.bodySublocationId = $scope.partList.subbodyParts[0];
          vm.loadBodySublocationSymptoms($scope.bodySublocationId, $scope.selectorStatus);
          break;
        case 3:
          $scope.continueStep = 4;
          $scope.symptomId = $scope.partList.subPartSymptoms;
          console.log('symptomID is', $scope.symptomId, ' with type ', typeof $scope.symptomId);
          vm.loadDiagnosis($scope.symptomId, $scope.gender, $scope.yearOfBirth);
          break;
      }

      vm.back = function () {
        switch($scope.continueStep) {
          case 2:
            $scope.continueStep = 1;
            break;
          case 3: 
            $scope.continueStep = 2;
            break;
          case 4: 
            $sconpe.continueStep = 3;
        }
      }
    } 



// LIST OF BODY AND SUB BODY PARTS GENERATED FROM THE API
  $scope.partList = {
    bodyParts: [],
    subbodyParts: [],
    subPartSymptoms: []
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
    .state('profile', {
      url: '/profile',
      templateUrl: '/profile.html',
      controller: 'ProfileCtrl'
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
