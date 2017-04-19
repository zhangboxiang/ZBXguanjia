/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('occupancy', ['$scope', '$stateParams', '$http', '$timeout', function($scope, $stateParams, $http, $timeout) {
		$scope.arr = [];
		$http({
			url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
			method: 'get'
		}).then(function(data) {
			$scope.arr = data.data;
		}, function() {

		})
		//获取昵称

		$scope.xwk_t = false
		$scope.xwk_title = "密码长度必须大于5，小于15"
		$scope.xwk_tsk = false
		$scope.xwk_sub = function() {
			if($scope.x_password == null) {
        $scope.xwk_t = true;
			}else if($scope.x_password.length<=5 || $scope.x_password.length>15){
        $scope.xwk_t = true
      }else{
        $scope.xwk_t = false;
        $http({
          url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
          method: "put",
          data: {
            img: $scope.arr.img,
            name: $scope.name,
            password: $scope.x_password
          }
        }).then(function(data) {
          $scope.xwk_tsk = true;
          $timeout(function() {
            $scope.xwk_tsk = false
          }, 1000)
          $http({
            url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
            method: 'get'
          }).then(function(data) {
            console.log(1)
            $scope.arr = data.data;
          }, function() {

          })
          $scope.x_password = ""
        }, function() {
          console.log("shibai")
        })
      }

		}

		if(typeof(FileReader) === 'undefined') {
			$("#result").innerHTML = "FileReader is not supported...";
			$("#img_input").setAttribute('disabled', 'disabled')
		} else {
//			$("#img_input").add('change', readFile, false);
			  img_input.addEventListener('change', readFile, false);
		}

		function readFile() {
			var file = this.files[0];
			if(!/image\/\w+/.test(file.type)) {
				alert("image only please.");
				return false;
			}
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				var img = new Image,
					width = 100, //image resize
					quality = 0.8, //image quality
					canvas = document.createElement("canvas"),
					drawer = canvas.getContext("2d");
				img.src = this.result;

				img.onload = function() {
					canvas.width = width;
					canvas.height = width * (img.height / img.width);
					drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
					img.src = canvas.toDataURL("image/jpeg", quality);
//					 console.log(img.src);
					// result.innerHTML = img.src;
					// img_area.innerHTML = '<img  src="' + img.src + '" />';
					// sessionStorage.img = img.src;
				}
        $timeout(function(){
          $scope.arr.img = img.src;
        },200)
			}
		}

	}])
