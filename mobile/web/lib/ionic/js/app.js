/* 2016-12-15 11:49:32 */angular.module("ionic").directive("kdPane",function(){return{restrict:"E",link:function(a,b){b.addClass("pane"),b.addClass("kd-pane")}}}),angular.module("credit",[]).directive("textScroll",["$timeout",function(a){return{restrict:"E",replace:!0,scope:{items:"=",interval:"="},template:'<ul class="text-scroll"><li ng-repeat="item in items track by $index">{{item.content}}</li></ul>',link:function(a,b,c){a.items.push(a.items[0]),a.$watch(function(){return b[0].children[0]},function(c){try{var d=b[0].children.length,e=c.offsetHeight,f=0,g=a.interval||1e3,h=function(){f++,f>=d&&(f=1,b.css("top",0)),$(b).animate({top:-e*f})};setInterval(h,g)}catch(i){}})}}}]).factory("Domain",["$location",function(a){var b=a.$$host,c=/(?:http(?:s)?:\/\/)?(?:www\.)?(.*?)\./,d=/https?:\/\/(?:[^\/]+\.)?([^.\/]+\.(?:com))(?:$|\/)/,e=b.match(c),f={www:a.$$protocol+"://"+a.$$host+"/website/web/",api:a.$$protocol+"://"+a.$$host+"/frontend/web/",m:a.$$protocol+"://"+a.$$host+"/mobile/web/",h5:a.$$protocol+"://"+a.$$host+"/h5/web/"};return null!==e&&("h5"===e[1]&&(f={www:a.$$protocol+"://www.koudailc.com/",api:a.$$protocol+"://api.koudailc.com/",m:a.$$protocol+"://m.koudailc.com/",h5:a.$$protocol+"://h5.koudailc.com/"}),"pre-h5"===e[1]&&(f={www:a.$$protocol+"://pre-www.koudailc.com/",api:a.$$protocol+"://pre-api.koudailc.com/",m:a.$$protocol+"://pre-m.koudailc.com/",h5:a.$$protocol+"://pre-h5.koudailc.com/"}),"42.96.204.114"==b&&(f={www:a.$$protocol+"://"+a.$$host+"/koudai/website/web/",api:a.$$protocol+"://"+a.$$host+"/koudai/frontend/web/",m:a.$$protocol+"://"+a.$$host+"/koudai/mobile/web/",h5:a.$$protocol+"://"+a.$$host+"/koudai/h5/web/"})),{resolveUrl:function(b){var e=b.match(c);return f[e[1]]?b.replace(d,f[e[1]]):b.replace(/^https?/,a.$$protocol)},domain:f}}]).factory("Platform",["$location",function(a){function b(b){if(void 0!==a.search()[b])return a.seach()[b];b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var c=new RegExp("[\\?&]"+b+"=([^&#]*)"),d=c.exec(location.search);return null===d?void 0:decodeURIComponent(d[1].replace(/\+/g," "))}var c=navigator.userAgent;return{getParamByName:b,isApp:void 0!==b("fromapp"),isAndroid:c.indexOf("Android")>-1||c.indexOf("Adr")>-1,isIos:!!c.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),isWeixin:c.indexOf("MicroMessenger")>-1,isQQ:" qq"==c.match(/\sQQ/i)}}]).factory("Popup",["$ionicPopup",function(a){function b(b,c){a.alert({title:"提示",template:b,okText:"确定",okType:"button-koudai"}).then(function(a){"function"==typeof c&&c()})}var c=function(b){a.confirm({title:b.title||"确认",template:b.content,cancelText:"取消",cancelType:"button-koudai-gray",okText:"确定",okType:"button-koudai"}).then(function(a){"function"==typeof b.callback&&b.callback(a),a?"function"==typeof b.ok&&b.ok():"function"==typeof b.cance&&b.cance()})};return{alert:b,confirm:c}}]).factory("HttpInterceptor",["$q","$injector",function(a,b){var c={responseError:function(b){return a.reject(b)},response:function(c){if(200!==c.status){var d=b.get("Popup"),e=b.get("$ionicLoading");return e.hide(),d.alert("请求不成功"),a.reject(c)}if(void 0!==c.data.code&&c.data.code==-3){var f=b.get("Domain");return location.href=f.resolveUrl("https://api.koudailc.com/user/re-login-page"),a.reject(c)}return c},request:function(a){return a},requestError:function(b){return a.reject(b)}};return c}]).filter("isEmpty",function(){var a;return function(b){for(a in b)if(b.hasOwnProperty(a))return!1;return!0}}).filter("trusted",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]);