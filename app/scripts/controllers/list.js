/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('list', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
		//薛文凯
		$scope.shu = 1;
		$scope.fn = function() {
			if($scope.shu < 1) {

			} else {
				$scope.shu -= 1
			}
		}

		$scope.fn1 = function() {
			$scope.shu += 1
		}

//		function getTime(a,b,c){
//			return new Date(a+"-"+b+"-"+c).getTime();
//
//		}
		$scope.lzk_shijian = '';
		//手机号验证

		//日历
    $('.form_datetime').datetimepicker({
      //language:  'fr',
      format: 'yyyy-mm-dd hh:i',
      weekStart: 1,
      todayBtn: 1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
      showMeridian: 1,
    });
//		var start = {
//			format: 'YYYY年MM月DD日 ',
//			//minDate: $.nowDate(0), //设定最小日期为当前日期
//			isinitVal: true,
//			festival: true,
//			ishmsVal: false,
//			maxDate: '2099-06-30 23:59:59', //最大日期
//			choosefun: function(elem, datas) {
//				end.minDate = datas; //开始日选好后，重置结束日的最小日期
//				function getDate(strDate) {
//					var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
//						function(a) {
//							return parseInt(a, 10) - 1;
//						}).match(/\d+/g) + ')');
//					return date;
//				};
//				//转化成时间戳
//				var date = getDate(datas);
//				date = new Date(date);
//				window.localStorage.startTimer = date.valueOf()
//
//			}
//
//		};

		//console.log(start)
//		var end = {
//			format: 'YYYY年MM月DD日 ',
//			//minDate: $.nowDate(0), //设定最小日期为当前日期
//			festival: true,
//			maxDate: '2099-06-16 23:59:59', //最大日期
//			choosefun: function(elem, datas) {
//				start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
//				function getDate(strDate) {
//					var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
//						function(a) {
//							return parseInt(a, 10) - 1;
//						}).match(/\d+/g) + ')');
//					return date;
//				};
//				//转化成时间戳
//				var date = getDate(datas);
//				date = new Date(date);
//				window.localStorage.daoqiTimer = date.valueOf()
//			}
//		};
//		$('#inpstart').jeDate(start);
//		$('#inpend').jeDate(end);
//		//或者是
//		$.jeDate('#inpstart', start);
//		$.jeDate('#inpend', end);

		//详情

		$http({
			url: "http://47.88.16.225:408/list",
			method: "get",
		}).then(function(a) {
			$scope.sarr = a.data;
			console.log($scope.sarr.length)
			$scope.num = Math.ceil($scope.sarr.length/4);
		}, function() {

		})
			//添加
		$scope.sarr = []
		$scope.arr = [];

		$scope.yhs_sel = '';
		$scope.yhs_id = '';
		$scope.yhs_s = function(s){
			var yhs_i = eval("("+s+")");
			$scope.yhs_id = yhs_i;
			//console.log($scope.yhs_id)
		}
		$scope.yhs_next=function(){
			$scope.num = [];

      //到期时间
      function getDate(strDate) {
        var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
            function(a) {
              return parseInt(a, 10) - 1;
            }).match(/\d+/g) + ')');
        //console.log(a)
        return date;
      };
      //转化成时间戳
      var date = getDate($("#ii").val());
      date = new Date(date);
      window.localStorage.daoqiTimer = date.valueOf()
      //到期时间

      if(Math.floor((localStorage.daoqiTimer - localStorage.startTimer) / (1000 * 60 * 60 * 24)) <= 1){
        alert('请选择正确时间');
        return;
      }

			$scope.isShow = false;
			if($('.yhs_ming').val() == '' && $('.yhs_phone').val() == '' && $('.yhs_phone').val() == '' && $('.yhs_hj').val() == '' && $('.yhs_money').val() == '') {
				alert('输入不能为空')
				$scope.isShow = false;
			} else {
			console.log(1+'>>')
				$http({
					url: "http://47.88.16.225:408/list",
					method: "post",
					data: {
						xingming: $scope.xingming,
						lianxidianhua: $scope.lianxidianhua,
						shenfenzhenghao: $scope.shenfenzhenghao,
						juzhudi: $scope.juzhudi,
						ruzhushijian: localStorage.startTimer,
						daoqishijian: localStorage.daoqiTimer,
						renshu: $scope.shu,
						neirong: $scope.neirong,
						jiage: $scope.jiage
						,uid:$scope.yhs_id.id
						,fangjianhao:$scope.yhs_id.fangjianhao
					}
				}).then(function(data) {
//					$http({
//						url: "http://47.88.16.225:408/list/" + data.data.id,
//						method: "get",
//					}).then(function(a) {
//
//						console.log(Math.ceil($scope.sarr.length/4))
//					}, function() {
//
//					})
					console.log($scope.yhs_id.id)
					$scope.sarr.push(data.data)
					$http({
						url:'http://47.88.16.225:408/room/'+$scope.yhs_id.id
						,method:'put'
						,data:{
							zhuangtai:'1'
						}
					}).then(function(reqs){
						console.log(11111111)
						console.log(reqs)
					},function(){
						alert('失败')
					})
				})
			}

			$(".yhss_hint").slideDown(300)
			$(".yhss_bigbox").slideUp(300)
		}

		//浮层
		//删除
		$scope.shanchu = function(i,$index) {
			$http({
				url: 'http://47.88.16.225:408/list/' + i.id,
				method: 'delete'
			}).then(function(r) {
//				$scope.ar = r.data;
				$scope.sarr.splice($index,1);
				$http({
					url:'http://47.88.16.225:408/room/'+i.uid,
					method:'put'
					,data:{
						zhuangtai:'0'
					}
				}).then(function(reqs){
					console.log(reqs)
				},function(){
          alert('error')
        })
			}, function() {
				alert("数据请求失败")
			})
		}

		$scope.list = function() {
			$scope.yhs_arr = [];
			$(".yhss_bigbox").slideDown(300);
			$(".yhss_hint").slideUp(300);
			$scope.yhy_time = new Date().getTime();
			localStorage.startTimer = $scope.yhy_time;
			$http({
				url:'http://47.88.16.225:408/room',
				method:'get'
			}).then(function(reqs){
				for(var i=0;i<reqs.data.length;i++){
					if(reqs.data[i].zhuangtai == '0'){
						$scope.yhs_arr.push(reqs.data[i]);
						//console.log($scope.yhs_arr)
					}
				}

			},function(){
				alert('失败')
			})
		}
		$scope.back = function() {
			$(".yhss_bigbox").slideUp(200)
			$(".yhss_hint").slideDown(100)
		}
		$scope.yadd = function() {
			$(".yhs_xq").slideDown(300)
			$(".yhss_hint").slideUp(300)
		}
		$scope.backy = function() {
			$(".yhs_xq").slideUp(200)
			$(".yhss_hint").slideDown(100)
		}

		//修改信息
		$scope.xiugai = function($index) {
			$scope.yhs_xq = $scope.sarr[$index];
			console.log($scope.sarr[$index])
			$(".yhs_xiugai").slideDown(300)
			$(".yhss_hint").slideUp(300)
		}

		$scope.xgnext = function() {
			console.log(1)

			console.log($scope.yhs_xq.id)

			$http({
				url: 'http://47.88.16.225:408/list/' + $scope.yhs_xq.id,
				method: "put",
				data: {
					xingming: $scope.yhs_xq.xingming,
					lianxidianhua: $scope.yhs_xq.lianxidianhua,
					shenfenzhenghao: $scope.yhs_xq.shenfenzhenghao,
					juzhudi: $scope.yhs_xq.juzhudi,
					daoqishijian: localStorage.daoqiTimer,
					renshu: $scope.yhs_xq.shu,

					jiage: $scope.yhs_xq.jiage
				}
			}).then(function(data) {
				console.log(data.data)

			}, function(error) {


			})

			$(".yhss_hint").slideDown(300)
			$(".yhs_xiugai").slideUp(300)
		}

			$scope.currentpage = 0;

			$scope.listpage = 4;
			$scope.page = 1;
			$scope.next = function() {

				if($scope.currentpage < $scope.num-1) {
		            console.log($scope.num)
					$scope.currentpage++;
		       		$scope.page += 1;
				}
			}
			$scope.prev = function() {
				if($scope.currentpage > 0) {
					$scope.currentpage--;
					$scope.page -= 1;
				}
			}

	}])

.filter('myfilter', function() {
		return function(room, start) {
			return room.slice(start)
		}

	})
