/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
  .controller('login', ["$scope","$http","$state",function ($scope,$http,$state) {

      $scope.username = '';
      $scope.password = '';
      $scope.innText = '';
      if(sessionStorage.user != ''||sessionStorage.user != undefined){
        $scope.username = sessionStorage.user;
      }
      $(document).keydown(function(e){
        var e = e||window.event;
        //console.log(e.keyCode)
        if(e.keyCode == 13){
          show();
        }
      })
      $scope.btn = function(){
        show();
      }

      $('.lzk_login').width(innerWidth);
      $('.lzk_login').height(innerHeight);
      function show(){
        if($scope.username==''||$scope.password==''){
          $('#myModal').modal('show');
          $scope.innText = '请输入账号或密码';
        }else{
          $http({
            url:'http://47.88.16.225:408/users/login'
            ,method:'post'
            ,data:{
              username:$scope.username
              ,password:$scope.password
            }
          }).then(function(reqs){
          	console.log(reqs)
           $state.go('mainpath.homepage',{uid:reqs.data.uid})
          },function(error){
            $('#myModal').modal('show');
            $scope.innText = '登陆失败';
          })
        }
      }
  }])
