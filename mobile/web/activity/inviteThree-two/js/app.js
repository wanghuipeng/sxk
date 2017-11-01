/* 2017-02-17 19:05:47 */angular.module("ionic").directive("kdPane",function(){return{restrict:"E",link:function(a,b){b.addClass("pane"),b.addClass("kd-pane")}}}),angular.module("credit",[]).directive("downloadPopup",["Platform","$timeout",function(a,b){return{restrict:"E",scope:{},replace:!0,template:'<div ng-show="isShow" ng-click="download()" class="download-popup">                   <a href="" class="close" ng-click="close($event)"></a>                   <img alt="" src="//h5.xianjincard.com/credit/img/download-logo.png"/>                   <div><p>下载即享极速借款<br/>被拒最高赔偿<i>50元</i></p></div>                 </div>',link:function(b,c,d){b.isShow=!a.isApp,b.close=function(a){a.stopPropagation(),b.isShow=!1},b.download=function(){window.location="https://credit.xianjincard.com/download-app.html"}}}}]).directive("popupPassword",["$timeout",function(a){return{restrict:"E",replace:!0,scope:{isShow:"=",isError:"=",sendHandler:"&"},template:'<div class="popup" id="defray" ng-show="isShow">                  <div class="overlay"></div>                  <div class="dialog pay">                    <span class="close" ng-click="close()"></span>                    <h2>请输入交易密码</h2>                    <p class="clearfix">                      <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>                      <input type="tel" value="" autofocus>                    </p>                    <p ng-show="isError" class="error-tips">密码错误</p>                    <a nav-direction="forward" href="#/my/findpaypassword?state=loan">忘记密码?</a>                  </div>                </div>',link:function(b,c,d){b.close=function(){b.isShow=!1},b.$watch("isShow",function(b){b&&a(function(){$("#defray input").focus()},0)}),b.$watch(function(){return c},function(a){$("#defray p").click(function(a){$("#defray input").focus()}),$("#defray input").focus(function(){var a=setInterval(function(){"INPUT"==document.activeElement.nodeName?$("#defray .dialog").css({top:0,marginTop:0}):($("#defray .dialog").attr("style",""),a&&(clearInterval(a),a=null))},500)}),$("#defray input").bind("input",function(a){var c=$(this).val();$("#defray i").removeClass("point"),$("#defray i").slice(0,c.length).addClass("point"),b.isError=!1,b.$apply(),c.length>=6&&($(this).val(c.slice(0,6)),b.sendHandler({password:$(this).val()}))})})}}}]).directive("textScroll",["$timeout",function(a){return{restrict:"E",replace:!0,scope:{items:"=",interval:"="},template:'<ul class="text-scroll"><li ng-repeat="item in items track by $index">{{item}}</li></ul>',link:function(a,b,c){a.$watch("items",function(b){b&&a.items.push(a.items[0])}),a.$watch(function(){return b[0].children[0]},function(c){try{var d=b[0].children.length,e=c.offsetHeight,f=0,g=a.interval||1e3,h=function(){f++,f>=d&&(f=1,b.css("top",0)),$(b).animate({top:-e*f})};setInterval(h,g)}catch(i){}})}}}]).factory("Domain",["$location",function(a){var b=a.$$host,c=/(?:http(?:s)?:\/\/)?(?:www\.)?(.*?)\./,d=/https?:\/\/(?:[^\/]+\.)?([^.\/]+\.(?:com))(?:$|\/)/,e=b.match(c),f={credit:a.$$protocol+"://"+a.$$host+"/credit/web/",api:a.$$protocol+"://"+a.$$host+"/frontend/web/",h5:a.$$protocol+"://"+a.$$host+"/h5/mobile/web/"};return null!==e&&("h5"===e[1]&&(f={credit:a.$$protocol+"://credit.xianjincard.com/",api:a.$$protocol+"://api.xianjincard.com/",h5:a.$$protocol+"://h5.xianjincard.com/"}),"pre-h5"===e[1]&&(f={credit:a.$$protocol+"://pre-credit.xianjincard.com/",api:a.$$protocol+"://pre-api.xianjincard.com/",h5:a.$$protocol+"://pre-h5.xianjincard.com/"}),"192.168.39.214"==b&&(f={credit:a.$$protocol+"://"+a.$$host+"/kdkj/credit/web/",api:a.$$protocol+"://"+a.$$host+"/kdkj/frontend/web/",h5:a.$$protocol+"://"+a.$$host+"/kdkj/h5/mobile/web/"}),"121.42.12.69"==b&&(f={credit:a.$$protocol+"://"+a.$$host+"/koudai/kdkj/credit/web/",api:a.$$protocol+"://"+a.$$host+"/koudai/kdkj/frontend/web/",h5:a.$$protocol+"://"+a.$$host+"/koudai/kdkj/h5/mobile/web/"})),{resolveUrl:function(b){var e=b.match(c);return f[e[1]]?b.replace(d,f[e[1]]):b.replace(/^https?/,a.$$protocol)},domain:f}}]).factory("Platform",["$location",function(a){function b(b){if(void 0!==a.search()[b])return a.seach()[b];b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var c=new RegExp("[\\?&]"+b+"=([^&#]*)"),d=c.exec(location.search);return null===d?void 0:decodeURIComponent(d[1].replace(/\+/g," "))}var c=navigator.userAgent,d=c.split("/");return{getParamByName:b,appVersion:d[d.length-1],isApp:c.indexOf("kdxj")!==-1,isAndroid:c.indexOf("Android")>-1||c.indexOf("Adr")>-1,isIos:!!c.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),isWeixin:c.indexOf("MicroMessenger")>-1,isQQ:" qq"==c.match(/\sQQ/i)}}]).factory("Popup",["$ionicPopup",function(a){function b(b,c){a.alert({title:"提示",template:b,okText:"确定",okType:"button-credit"}).then(function(a){"function"==typeof c&&c()})}var c=function(b){a.confirm({title:b.title||"确认",template:b.content,cancelText:"取消",cancelType:"button-credit-gray",okText:"确定",okType:"button-credit"}).then(function(a){"function"==typeof b.callback&&b.callback(a),a?"function"==typeof b.ok&&b.ok():"function"==typeof b.cance&&b.cance()})};return{alert:b,confirm:c}}]).factory("HttpInterceptor",["$q","$injector",function(a,b){var c={responseError:function(b){return a.reject(b)},response:function(c){if(200!==c.status){var d=b.get("Popup"),e=b.get("$ionicLoading");return e.hide(),d.alert("请求不成功"),a.reject(c)}if(void 0!==c.data.code&&c.data.code==-2){var d=b.get("Popup"),e=b.get("$ionicLoading");return e.hide(),d.alert(c.data.message,function(){var a=b.get("$state");a.go("login")}),a.reject(c)}return c},request:function(a){return a},requestError:function(b){return a.reject(b)}};return c}]).filter("isEmpty",function(){var a;return function(b){for(a in b)if(b.hasOwnProperty(a))return!1;return!0}}).filter("trusted",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),angular.module("inviteThree",["credit","ionic","InviteThreeControllers","InviteThreeFactory"]).run(["$ionicPlatform",function(a){a.ready(function(){window.StatusBar&&StatusBar.styleDefault()})}]).config(["$httpProvider","$compileProvider","$stateProvider","$urlRouterProvider","$ionicConfigProvider",function(a,b,c,d,e){e.tabs.position("bottom"),e.tabs.style("standard"),e.navBar.alignTitle("center"),b.aHrefSanitizationWhitelist(/^\s*(https?|http?|wap2app|schemekdlc|kdlc.app.launch):/),a.defaults.withCredentials=!0,a.interceptors.push("HttpInterceptor"),c.state("share",{url:"/",templateUrl:"templates/share.html",controller:"InviteThreeShareController"}),d.otherwise("/")}]),angular.module("InviteThreeFactory",[]).factory("InviteThreeShareService",["Domain","$http","Platform","$location","$httpParamSerializerJQLike",function(a,b,c,d,e){return{getData:function(c){var d=a.resolveUrl("http://credit.xianjincard.com/credit-invite/get-user-info?invite_code="+c);return b.get(d).then(function(a){return a.data})},getCode:function(c){var d=a.resolveUrl("http://credit.xianjincard.com/credit-user/reg-get-code");return b({method:"POST",url:d,data:e({phone:c}),headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}}).then(function(a){return a.data})},register:function(c,d){var f="inviteThree",g=a.resolveUrl("http://credit.xianjincard.com/credit-user/register?appMarket="+f);return b({method:"POST",url:g,data:e({phone:c.phone,password:c.password,code:c.code,source:21,invite_code:d}),headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}}).then(function(a){return a.data})}}}]),angular.module("InviteThreeControllers",[]).controller("InviteThreeShareController",["$scope","InviteThreeShareService","$ionicLoading","$state","Platform","Domain","$timeout",function(a,b,c,d,e,f,g){_hmt.push(["_trackPageview","/activityInviteThreeShareTwo"]),a.codeText="获取验证码",a.errorMessage="",a.shareData={},a.score=Math.round(20*Math.random())+70,a.percentage=a.score+5+Math.round(4*Math.random());var h=/^1(3|4|5|7|8)\d{9}$/;$(".other label i").show(),a.agreeAgreement=function(){$(".other label i").is(":visible")?$(".other label i").hide():$(".other label i").show()};var i=function(){var a={},b=window.location.href,c=b.split("?");if(c[1]){var d=c[1].split("#")[0];if(d.indexOf("?")==-1){var e=decodeURI(d);parameterArray=e.split("&");for(var f=0;f<parameterArray.length;f++)a[parameterArray[f].split("=")[0]]=parameterArray[f].split("=")[1]}}return a},j=i(),k=function(b,c){g(function(){a.codeText=b+"秒后重试",b?k(--b,1e3):(a.codeText="重新发送",a.sendDisabled=!1)},c)},l=function(){return function(){var a=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){+new Date-a<2e3&&(window.location="https://itunes.apple.com/us/app/xian-jin-bai-ka-you-shen-fen/id1156410247?mt=8")},500)},500)}},m=function(){return function(){var a=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){+new Date-a<2e3&&(window.location="https://credit.xianjincard.com/download-app.html")},500)},500)}};a.downloadApp=function(){$(".popup").hide(),e.isAndroid&&!e.isWeixin?(window.location.href="xianjincard://com.kdlc.mcc/openapp",m()):e.isIos&&!e.isWeixin?(window.location.href="https://itunes.apple.com/app/id1156410247?mt=8",l()):window.location.href="https://api.xianjincard.com/download-app.html"};var n=function(){c.show({template:"<ion-spinner></ion-spinner>"}),b.getData(encodeURIComponent(j.invite_code)).then(function(b){c.hide(),1==b.code?a.shareData=b.data:(a.errorMessage=b.message||"服务器繁忙，请稍候重试",$(".popup-code").show())})};n(),a.getCode=function(d,e){return""===d||void 0===d?(a.errorMessage="请输入手机号码",$(".popup-error").show(),!1):h.test(d)?""===e||void 0===e?(a.errorMessage="请设置登录密码",$(".popup-error").show(),!1):e.length<6?(a.errorMessage="请设置6位以上的登录密码",$(".popup-error").show(),!1):(c.show({template:"<ion-spinner></ion-spinner>"}),void b.getCode(d).then(function(b){c.hide(),1e3==b.code?$(".popup-login").show():0===b.code?k(60):(a.errorMessage=b.message||"服务器繁忙，请稍候重试",$(".popup-error").show())})):(a.errorMessage="请输入正确的手机号码",$(".popup-error").show(),!1)},a.submitTest=function(d){return void 0===d?(a.errorMessage="请输入手机号码",$(".popup-error").show(),!1):""===d.phone||void 0===d.phone?(a.errorMessage="请输入手机号码",$(".popup-error").show(),!1):h.test(d.phone)?""===d.password||void 0===d.password?(a.errorMessage="请设置登录密码",$(".popup-error").show(),!1):d.password.length<6?(a.errorMessage="请设置6位以上的登录密码",$(".popup-error").show(),!1):""===d.code||void 0===d.code?(a.errorMessage="验证码不能为空",$(".popup-error").show(),!1):$(".other label i").is(":visible")?(c.show({template:"<ion-spinner></ion-spinner>"}),void b.register(d,encodeURIComponent(j.invite_code)).then(function(b){c.hide(),0===b.code?$(".popup-intimacy").show():(a.errorMessage=b.message||"服务器繁忙，请稍候重试",$(".popup-error").show())})):(a.errorMessage="请选择同意《现金白卡使用协议》",$(".popup-error").show(),!1):(a.errorMessage="请输入正确的手机号码",$(".popup-error").show(),!1)},a.receive=function(){$(".popup").hide(),c.show({template:"<ion-spinner></ion-spinner>"}),g(function(){c.hide(),$(".popup-red").show()},1e3)},a.close=function(){$(".popup").hide()}}]);