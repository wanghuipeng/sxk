angular.module("mobileControllers")
  .controller('BankController', function ($scope, Popup, $state, $location, $timeout, $ionicViewSwitcher, $ionicLoading, MobileService) {
    var query = $location.$$search;
    // $scope.linealData = [{type: 0, name: '请选择'}];
    $scope.form = {
      list: [{type: 0, name: '请选择'}],
      lock: false
    };
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    MobileService.getBankCard().then(function (response) {
      $ionicLoading.hide();
      if (response.code != 0) {
        Popup.alert(response.message);
        return;
      }
      var data = response.data;
      if (data && data.item) {
        var item = data.item;
        // if(item.is_can_change == 0){
        //   $scope.form.lock = true;
        // }
        // if(item.lineal_mobile && item.lineal_name && item.lineal_relation &&
        //   item.other_mobile && item.other_name && item.other_relation){
        //   $scope.form.lock = true;
        // }
      }
      $scope.form = $.extend(true, $scope.form, data);
      $scope.form.card_default = $scope.form.list[0];
      $scope.sendDisabled = false
      $scope.codeText = '发送验证码'
    });

    var setup = function (m, l) {
      $timeout(function () {
        $scope.codeText = m + "秒后重试";
        if (m) {
          setup(--m, 1000);
        } else {
          $scope.codeText = '重新发送';
          $scope.sendDisabled = false;
        }
      }, l)
    }

    $scope.sendCode = function () {
      // console.log($stateParams.phone)
      var phone =  $scope.form.mobile;
      if (!/^1\d{10}$/.test(phone)) {
        Popup.alert('手机号格式不对');
        return;
      }

      $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
      MobileService.getBankCardCode({phone: phone, source: 'shanxianka'}).then(function (data) {
        $ionicLoading.hide();
        if (data.code !== 0) {
          Popup.alert(data.message);
          return
        }

        $scope.sendDisabled = true;
        setup(60);
      })
    };
    $scope.save = function (form) {
      form.bank_id = form.card_default.bank_id || '';
      var data = {
        phone: form.mobile,
        card_no: form.card_no,
        bank_id: form.bank_id,
        code: form.v_code
      };
      if (!data.phone || data.phone.length != 11) {
        Popup.alert('银行手机预留号码格式错误');
        return;
      }
      if (!data.card_no || !/^(\d{16}|\d{19})$/.test(data.card_no)) {
        Popup.alert('银行卡号只能16或19位数字');
        return;
      }
      $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
      MobileService.addBankCard(data).then(function (response) {
        $ionicLoading.hide();
        Popup.alert(response.message, function () {
          if (response.code != 0) return;

          $state.go('certification');
        });
      });
    };
  })