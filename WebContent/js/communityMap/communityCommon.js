
/**
 * 통계 소통지도 공통으로 사용할것
 * 
 * history : (주)유코아시스템, 1.0, 2016/1/12  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$communityMapCommon = W.$communityMapCommon || {};
	$(document).ready(function(){
		if($communityMapCommon.getParameter("type")=="full"){
			$communityMapCommon.doMax();
		}
	});
	$communityMapCommon= {
		/**
		 * @name         : doMax
		 * @description  : 맵을 최대화한다.
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		doMax : function(){
			if($(".tb_sizing").length>0){
				$(".tb_sizing").tooltip("close").attr("title","전체 화면 축소").addClass("on");
				$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
			}
			$("header").css({"height":"30px", "width":"100%"});
			$("body").css({"background":"none"});
			$(".gnb, .headerContents").hide();
			if($communityMapCommon.getParameter("type")==="full"){
				if($communityMapCommon.getParameter("footer")==="none"){
					$("#footer").hide();
				}
				if($communityMapCommon.getParameter("lm")==="none"){
					$(".headerEtc").hide();
				}
			}
			$(".headerContents h1").css({"height":"10px"});
			$(".headerContents h1 img").hide();
			$(".containerBox").css({"height":"calc(100% - 10px)", "top":($communityMapCommon.getParameter("type")==="full"&&$communityMapCommon.getParameter("lm")==="none"?"0px":"30px"),"border-top":"1px solid #ddd"});
		},
		/**
		 * @name         : $communityMapCommon.getParameter
		 * @description  : 원하는 파라미터의 값 받기
		 * @date         : 2016. 01. 17.
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param name   : 파라미터 명
		 */
		getParameter :function(name) {
			search = location.search;
			if(search) {
				if($communityMapCommon.hasText(name)){
					var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
					if (results==null){
						return null;
					}
					else{
						return results[1] || 0;
					}
				}else{
					var query = [];
					$.each(location.search.substring(1,location.search.length).split("&"),function(cnt,node){
						query.push({
							"key":node.substring(0,node.indexOf("=")),
							"value":node.substring(node.indexOf("=")+1,node.length)
						})
					});
					return query;
				}
			}
		},
		/**
		 * @name             : $communityMapCommon.createPaging
		 * @description      : 페이징 만들기
		 * @date             : 2016. 01. 17.
		 * @author	         : 나광흠
		 * @history 	     :
		 * @param tableName  : 테이블 이름
		 * @param totalCount : 총 개수
		 * @param obj        : 페이징할 object
		 */
		createPaging : function(tableName, totalCount, obj) {
			$("#"+tableName+"-page").empty();
			var totalPages = Math.ceil( totalCount / obj.pageSize);
			var pagingIndex = parseInt((obj.currentPageIndex - 1) / obj.pageSize);
			var pagingStart = (pagingIndex * obj.pageSize) + 1;
			var pagingEnd = (pagingIndex + 1) * obj.pageSize;
			if (pagingEnd > totalPages){
				pagingEnd = totalPages;
			}
			if(totalPages>1){
				$("#"+tableName+"-page").append($("<a/>",{
					"class" : "Arrow "+(obj.currentPageIndex>1?"":"off"),
					href : "#"
				}).append($("<img/>",{"src":contextPath+"/img/community/arrow_ll.png","alt":"맨앞"})).click(function(){
					if(obj.currentPageIndex>1){
						obj.currentPageIndex = 1;
						obj.getList();
					}
					return false;
				}));
				$("#"+tableName+"-page").append($("<a/>",{
					"class" : "Arrow "+(obj.currentPageIndex>1?"":"off"),
					href : "#"
				}).append($("<img/>",{"src":contextPath+"/img/community/arrow_l.png","alt":"이전"})).click(function(){
					if(obj.currentPageIndex>1){
						obj.currentPageIndex = obj.currentPageIndex-1;
						obj.getList();
					}
					return false;
				}));
				$("#"+tableName+"-page").append($("<span/>",{"html":obj.currentPageIndex+"&#47;"+totalPages}));
				$("#"+tableName+"-page").append($("<a/>",{
					"class" : "Arrow "+(obj.currentPageIndex<totalPages?"":"off"),
					href : "#"
				}).append($("<img/>",{"src":contextPath+"/img/community/arrow_r.png","alt":"다음"})).click(function(){
					if(obj.currentPageIndex<totalPages){
						obj.currentPageIndex = obj.currentPageIndex+1;
						obj.getList();
					}
					return false;
				}));
				$("#"+tableName+"-page").append($("<a/>",{
					"class" : "Arrow "+(obj.currentPageIndex<totalPages?"":"off"),
					href : "#"
				}).append($("<img/>",{"src":contextPath+"/img/community/arrow_rr.png","alt":"맨끝"})).click(function(){
					if(obj.currentPageIndex<totalPages){
						obj.currentPageIndex = totalPages;
						obj.getList();
					}
					return false;
				}));
				$("#"+tableName+"-page").show();
			}else{
				$("#"+tableName+"-page").hide();
			}
		},
		/**
		 * @name         : $communityMapCommon.hasText
		 * @description  : 문자열 유무
		 * @date         : 2015. 12. 1. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param str
		 */
		hasText : function(str){
			if(str==null||str==undefined){
				return false;
			}else if(typeof str === "number"){
				return true;
			}else if(typeof str === "boolean"){
				return str;
			}else if(typeof str === "string"){
				return !undefined&&!null&&str.replace(/ /gi,"")!="";
			}else if($.isArray(str)){
				return str&&str.length>0;
			}else if(typeof str === "object"){
				var result = false;
				$.map(str,function(){
					result = true;
					return false;
				});
				return result;
			}else{
				return false;
			}
		},
		/**
		 * @name         : $communityMapCommon.alert
		 * @description  : alert
		 * @date         : 2016. 10. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param title
		 * @param message
		 * @param okFnc
		 * @param cancelFnc
		 * @param options
		 */
		alert : function(title, message, okFnc, cancelFnc, options){
			messageAlert.open(title, message, okFnc, cancelFnc, options);
			$communityMapCommon.setCenter();
		},
		/**
		 * @name         : $communityMapCommon.confirm
		 * @description  : comfirm
		 * @date         : 2016. 10. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param title
		 * @param message
		 * @param btnOptions
		 * @param cancelCallback
		 */
		confirm : function(title, message, btnOptions, cancelCallback){
			messageConfirm.open(title, message, btnOptions, cancelCallback);
			$communityMapCommon.setCenter();
		},
		/**
		 * @name         : $communityMapCommon.setCenter
		 * @description  : center
		 * @date         : 2016. 10. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		setCenter : function(){
			setTimeout(function(){
				$(".popupWrapper").each(function(cnt,node){
					$(node).css({"height":$(document).height()});
					$(node).children(".alertPopupWrapper").css({"margin-top":$(document).scrollTop()+($(window).height()/2)-($(node).children(".alertPopupWrapper").height()/2)});
				});
			});
		},
		/**
		 * @name          : $communityMapCommon.addQuery
		 * @description   : 추가 파라미터
		 * @date          : 2016. 10. 21. 
		 * @author	      : 나광흠
		 * @history 	  :
		 * @param exclude : 제외 키
		 */
		addQuery : function(exclude){
			var excludeArray = [];
			if($communityMapCommon.hasText(exclude)){
				if($.isArray(exclude)){
					excludeArray = excludeArray.concat(exclude);
				}else{
					excludeArray.push(exclude);
				}
			}
			
			var addQuery = "";
			if($communityMapCommon.hasText($communityMapCommon.getParameter())){
				$.each($communityMapCommon.getParameter(),function(cnt,node){
					if(excludeArray.indexOf(node.key)<=-1){
						addQuery+="&"+node.key+"="+node.value;
					}
				});
				if($communityMapCommon.hasText(addQuery)&&!/^&/.test(addQuery)){
					addQuery = "&"+addQuery;
				}
			}
			return addQuery;
		},
		/**
		 * @name         : $communityMapCommon.twoDigitsZero
		 * @description  : 두자리 숫자 만들기 (ex. 1 -> 01)
		 * @date         : 2016. 11. 9. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param str    : 문자열
		 */
		twoDigitsZero:function(str){
			return (parseInt(str)<10?"0"+str:str).toString();
		},
		/**
		 * @name               : $communityMapCommon.getToday
		 * @description        : 두자리 숫자 만들기 (ex. 1 -> 01)
		 * @date               : 2016. 11. 9. 
		 * @author	           : 나광흠
		 * @history            :
		 * @param str          : 날짜 구분 글자
		 * @param isNoTwoDigit : 월,일 01로 할꺼면 false 1로 할꺼면 true
		 */
		getToday : function(str,isNoTwoDigit){
			str = typeof str==="string"?str:"";
			isNoTwoDigit = isNoTwoDigit===true;
			var today = new Date();
			var date = today.getFullYear().toString();
			if(isNoTwoDigit){
				date+=str+(today.getMonth()+1).toString()+str+today.getDate().toString();
			}else{
				date+=str+$communityMapCommon.twoDigitsZero(today.getMonth()+1)+str+$communityMapCommon.twoDigitsZero(today.getDate());
			}
			return date;
		},
		/**
		 * @name              : setContentLength
		 * @description       : 글자수 셋팅
		 * @date              : 2016.11.2
		 * @author	          : 나광흠
		 * @history 	      :
		 * @param selector    : jquery selector
		 * @param length      : 길이
		 * @param isAlert     : 경고창 보여주기 유무
		 * @param name        : 이름
		 * @param firstValue  : 종성 첫번째
		 * @param secondValue : 종성 두번째
		 */
		setContentLength : function(selector,length,isAlert,name,firstValue, secondValue){
			var str = $("#"+selector).val();
			var enter_length = str.split(/\r\n|\r|\n/).length-1;
			var str_length = str.length+enter_length;
			if(str_length>length){
				$("#"+selector+"_length span").css({"color":"#c00","font-weight":"bold"});
			}else{
				$("#"+selector+"_length span").css({"color":"","font-weight":""});
			}
			$("#"+selector+"_length span").text(str_length);
			var success = str_length<=length;
			if(isAlert===true&&success===false){
				$("#"+selector).val($("#"+selector).val().substring(0,length-enter_length));
				$communityMapCommon.setContentLength(selector,length);
				$("#"+selector).blur();
				$communityMapCommon.alert("알림",$communityMapCommon.getComleteWordByJongsung(name,firstValue,secondValue)+" 최대 "+length+"글자까지 쓸 수 있습니다");
			}
			return success;
		},
		/**
		 * @name              : getComleteWordByJongsung
		 * @description       : 종성 셋팅
		 * @date              : 2016.11.28
		 * @author	          : 나광흠
		 * @history 	      :
		 * @param name        : 이름
		 * @param firstValue  : 
		 * @param secondValue : 
		 */
		getComleteWordByJongsung : function(name, firstValue, secondValue) {
			if($communityMapCommon.hasText(name)){
				var lastName = name.charCodeAt(name.length - 1);
				// 한글의 제일 처음과 끝의 범위밖일 경우는 오류
				if (lastName < 0xAC00 || lastName > 0xD7A3) {
					return name;
				}
				var seletedValue = (lastName - 0xAC00) % 28 > 0 ? firstValue : secondValue;
				return name+seletedValue;
			}else{
				return "";
			}
		}
	};
}(window, document));
