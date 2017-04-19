angular.module('yeomanApp')
  .controller('register', ["$scope","$http","$state",function ($scope,$http,$state) {
     $scope.username = '';
     $scope.password = '';
     $scope.rname = '';
     $scope.innText = '';
     $scope.btn = function(){
       var reg = /^[\u4e00-\u9fa5]+$/i;
       if($scope.username==''||$scope.password==''||$scope.rname==''){
         $('#myModal').modal('show');
         $scope.innText = '输入不能为空';
       }else if(/^[\u4e00-\u9fa5]+$/.test($scope.username)){
         $('#myModal').modal('show');
         $scope.innText = '账号密码输入不能为汉字';
       }else if($scope.username.length > 15 ||$scope.password.length > 15 ||$scope.rname.length > 10){
         $('#myModal').modal('show');
         $scope.innText = '账号密码长度需小于15位，名称长度需小于10位';
       }else if($scope.username.length <5 ||$scope.password.length < 5){
         $('#myModal').modal('show');
         $scope.innText = '账号密码长度需大于5位';
       }else{
          $http({
            url:'http://47.88.16.225:408/users'
            ,method:'post'
            ,data:{
              username:$scope.username
              ,password:$scope.password
              ,name:$scope.rname
            }
          }).then(function(reqs){
            sessionStorage.user = $scope.username;
            $state.go('login');
          },function(error){
            if(error.status==400){
              $('#myModal').modal('show');
              $scope.innText = '账号已存在';
            }else{
              $('#myModal').modal('show');
              $scope.innText = '请求失败';
            }
          })
       }
     }
    $('.lzk_login').width(innerWidth);
    $('.lzk_login').height(innerHeight)
  }])
