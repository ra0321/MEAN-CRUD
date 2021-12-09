var app = angular.module('myfirstmean',[]);

app.controller('addcontrolle',function($scope,$http){

  var refresh = function(){
    $http.get('/contactlists').then(function(response){
      $scope.contactlist = response.data;
      $scope.contact.name = '';
      $scope.contact.email = '';
    });
  };

 refresh();
  //
  $scope.addData = function(){
    $http.post("/contactlists",$scope.contact).then(function(response){
      console.log(response);
      refresh();
    })
  };

  $scope.remove = function(id){
    $http.delete('/contactlists/'+id).then(function(response){
      refresh();
    })
  };

  $scope.edit = function(){
    //console.log($scope.contact._id);
    $http.put('/contactlists/'+$scope.contact._id, $scope.contact).then(function(response){
      refresh();
    });
  };

  $scope.update = function(id){
    $http.get('/contact/'+id).then(function(response){
      //console.log(response);
      $scope.contact= response.data;
    });
  };

});
