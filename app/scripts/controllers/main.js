'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
.controller('mainpath',["$scope","$http","$stateParams","$state","$timeout",function ($scope,$http,$stateParams,$state,$timeout) {
      $scope.lzk_arr = [];
      $http({
        url:'http://47.88.16.225:408/users/'+$stateParams.uid
        ,method:'get'
      }).then(function(reqs){
        $scope.lzk_arr = reqs.data;
      },function(){
        $state.go('login')
      })
      var lzk_tim = new Date().getTime();
      $scope.lzkary = [];
      $http({
        url:'http://47.88.16.225:408/list'
        ,method:'get'
      }).then(function(reqs){
        $scope.lzkary = reqs.data;
        for(var i=0;i<$scope.lzkary.length;i++){
            var lzk_n = Math.floor(($scope.lzkary[i].daoqishijian - lzk_tim) / (1000 * 60 * 60 * 24))
            if(lzk_n < 0){
                  lzkhide($scope.lzkary[i].uid);
                  lzkshow($scope.lzkary[i].id);
            }
        }
      },function(){
          alert('失败')
      })
      function lzkhide(id){
        $http({
          url:'http://47.88.16.225:408/room/'+id
          ,method:'put'
          ,data:{
            zhuangtai:'0'
          }
        }).then(function(){
          console.log('成功')
        },function(){
          console.log('失败')
        })
      }
      function lzkshow(id){
        $http({
          url:'http://47.88.16.225:408/list/'+id
          ,method:'delete'
        }).then(function(){
          console.log('成功')
        },function(){
          console.log('失败')
        })
      }
}])
