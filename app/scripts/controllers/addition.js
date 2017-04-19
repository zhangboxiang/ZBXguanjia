/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('addition', ['$scope', '$http', function($scope, $http) {
		//初始化
		$scope.arr = [];
		//时间戳
		$scope.time = new Date().getTime();
		$scope.ary = [];
		$http({
			url: 'http://47.88.16.225:408/list',
			method: 'get'
		}).then(function(data) {
			if(data.data.length <= 0) {
				$scope.zanwu = true;
			} else {
				for(var i = 0; i < data.data.length; i++) {
					var huansuan = Math.floor((data.data[i].daoqishijian - $scope.time) / (1000 * 60 * 60 * 24))
					if(huansuan<30) {
						$scope.arr.push(data.data[i]);
						$scope.ary.push(Math.floor((data.data[i].daoqishijian - $scope.time) / (1000 * 60 * 60 * 24)))
						$scope.daoqi = true;
						$scope.num = Math.ceil($scope.ary.length / 8)
					}

				}
				if($scope.arr.length === 0) {
					$scope.zanwu = true;
				}
			}
		}, function(error) {
			alert('error')
		})
		//分页
		$scope.currentpage = 0;
		$scope.listpage = 8;
		$scope.page = 1;
		$scope.next = function() {
			if($scope.currentpage < $scope.num - 1) {
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
		//删除
		$scope.remove = function(i, $index) {
      console.log(i)
			$http({
				url: 'http://47.88.16.225:408/list/' + i.id,
				method: 'delete',
			}).then(function(data) {
				$scope.arr.splice($index,1);
        $http({
          url:'http://47.88.16.225:408/room/'+ i.uid
          ,method:'put'
          ,data:{
            zhuangtai:'0'
          }
        }).then(function(reqs){
          console.log(reqs.data)
        },function(){
          alert('error')
        })
			}, function(error) {
				alert('error')
			})
		}

		//续租
//		$scope.xuzu = function(index) {
//			$scope.ercai = $scope.arr[index];
//		}
	}])

	//	 自定义过滤器
	.filter("myfilter", function() {
		return function(list, start) {
			return list.slice(start)
		}
	})
