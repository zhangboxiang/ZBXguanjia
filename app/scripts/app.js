'use strict';

/**
 * @ngdoc overview
 * @name yeomanApp
 * @description
 * # yeomanApp
 *
 * Main module of the application.
 */
  angular.module('yeomanApp', ['ui.router','chart.js'])
  .config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
      $stateProvider.state("mainpath",{
        url:'/mainpath/{uid}'
        ,templateUrl:'views/mainpath.html'
      }).state("mainpath.homepage",{
        //首页赵万宝
        url:'/homepage'
        ,templateUrl:'views/homepage.html'
      }).state("mainpath.particulars",{
        //客户详情程璐宇
        url:'/particulars/{id}/{uid}'
        ,templateUrl:'views/particulars.html'
      }).state("mainpath.list",{
        //客户列表薛文凯
        url:'/list'
        ,templateUrl:'views/list.html'
      }).state("mainpath.occupancy",{
        //入住率宋明唐
        url:'/occupancy'
        ,templateUrl:'views/occupancy.html'
      }).state("mainpath.remain",{
        //剩余房余含水
        url:'/remain'
        ,templateUrl:'views/remain.html'
      }).state("mainpath.addition",{
        //添加李志锴
        url:'/addition'
        ,templateUrl:'views/addition.html'
      }).state("login",{
        //登陆
        url:'/login'
        ,templateUrl:'views/login.html'
      }).state("register",{
        //注册
        url:'/register'
        ,templateUrl:'views/register.html'
      })
      $urlRouterProvider.otherwise("/login")
  }])

