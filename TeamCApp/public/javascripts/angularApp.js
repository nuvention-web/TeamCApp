var app = angular.module('flapperNews', ['ui.router']);

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
  // '$stateParams',
  // 'posts',
  function($scope, $http){
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


  
    }}]);

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
