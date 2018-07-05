var contextPath = ""; // 포탈 Context

//========================== openApiPath ========================================
// operator
//var openApiPath = "//sgisapi.kostat.go.kr";

// local test
//var openApiPath = "//localhost:8080/SOPOpenAPI";

var openApiPath = "//sgis.neighbor21.co.kr:8080/SOPOpenAPI";

//========================== kosisApiPath ========================================// KOSIS API 주소 (KOSIS 서버)
var kosisApiPath = "//sgis1.kostat.go.kr";

//========================== developApiPath ========================================
//var developApiPath = "//sgis.kostat.go.kr/developer";
var developApiPath = "//sgis.kostat.go.kr/developer";

//========================== 데이터년도 및 경계년도 설정 =============================
var dataYear = "2014";
var censusDataYear = "2015";
var bndYear = "2015";
//====================================================================================

var accessToken = "none";
var accessTokenFailCnt = 0;	//accessToken 실패 횟수 (10회가 넘어가면 자동 멈춤)
var AuthInfo; // 세션정보
if (!AuthInfo) {
	AuthInfo = {
		authStatus : false
	};
}

$(document).ready(function () {
	var allcookies = document.cookie;
	var cookies = allcookies.split("; ");
	for ( var i = 0; i < cookies.length; i++) {
		var keyValues = cookies[i].split("=");
		if (keyValues[0] == "accessToken") {
			accessToken = unescape(keyValues[1]);
			break;
		}
	}
	if (accessToken == "none") {
		accessTokenInfo();
	}
	
	// 세션체크
//	sessionInfo();
//	sessionInfoDeveloper();
	//외부서비스 링크를 위한 폼생성
	createExternalForm();
	
	//페이지호출통계 저장
	pageCallReg();
	
	// 메인화면 최근목록 조회
	getMainRecentLists();
	
	if (window.attachEvent) {
		window.attachEvent("onload", load_proc);
	}else {
		window.addEventListener("load", load_proc, false);
	}
	//통합인증 IFrame 설정
	$("#authFrame").attr("src", "/mobile/html/authorization/getAuth.jsp");
});
/** ********* 회원가입 Start ********* */
function memberRegister(curUrl) {
	var frame = document.getElementById("registerFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberRegister();
}
/** ********* 회원가입 End ********** */
/** ********* 회원탈퇴 Start ********* */
function memberUnRegister() {
	var frame = document.getElementById("unRegisterFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberUnRegister();
}
/** ********* 회원탈퇴 End ********** */
/** ********* 로그인 Start ********* */
function memberLogin(curUrl) {
	var frame = document.getElementById("loginFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberLogin(curUrl);
}
/** ********* 로그인 End ********** */
/** ********* 로그아웃 Start ********* */
function memberLogout() {
	//기존회원일 경우, 개발자사이트 로그아웃
	logoutDeveloperProcess();
	
	//통합회원/기존회원 체크필요
	//통합회원일 경우
	var frame = document.getElementById("logoutFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberLogout("/mobile");
}
/** ********* 로그아웃 End ********** */
/** ********* 기존/통합로그인 선택 Start ********* */
function goSelectLogin(curUrl) {
	if (curUrl == undefined ||  curUrl.length == 0) {
		curUrl = "/view/index";
	}
	window.location.href = "/view/member/login_new?returnPage=" + encodeURI(curUrl);
}
/** ********* 기존/통합로그인 선택 End ********* */
/** ********* 회원정보수정 Start ********* */
function memberModify() {
	var frame = document.getElementById("modifyFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberModify();
}
/** ********* 기존/통합로그인 선택 End ********* */
/** ********* 회원정보수정 Start ********* */
function goExternalUrlLink(url) {
	$("#externalLinkForm").find($("#SYS_URL")).val(url);
	$("#externalLinkForm").submit();
}
/** ********* 회원정보수정 End ********* */
function createExternalForm() {
	var html = "";
	html += "<form action='//kosis.kr/oneid/cmmn/login/ConnectStatItgrSvr.do' method='post' id='externalLinkForm' name='externalLinkForm' target='_blank'>";
	html += "<input type='hidden' id='SYS_URL' name='SYS_URL'/>";	
	html += "<input type='hidden' id='SYS_CD' name='SYS_CD' value='S'/>";	
	html += "</form>";
	$("body").append(html)
}
/** ********* API 호출 로그 Start ********* */
(function () {
	$class("sop.portal.apiLogWrite.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
});
}());
function apiLogWrite(type, options) {
	var api_id = "";				//API
	var title = "";				//타이틀
	var parameter = "";		//파라미터
	var zoomLevel = 0;		//줌레벨
	var adm_nm = "";			//지역정보
	//대화형통계지도
	if(type == "A0") {
		//API
		//일반검색
		if(options.btntype == "normal") {
			if(options.params.api_id == "API_0301") {	//인구통계총괄
				api_id = "A01";
			} else if(options.params.api_id == "API_0302") {	//인구통계세부조건검색
				api_id = "A02";
			} else if(options.params.api_id == "API_0304") {	//사업체분류검색
				api_id = "A05";
			} else if(options.params.api_id == "API_0305") {	//가구통계검색
				api_id = "A03";
			} else if(options.params.api_id == "API_0306") {	//주택통계검색
				api_id = "A04";
			} else if(options.params.api_id == "API_0307") {	//농가통계검색
				api_id = "A06";
			} else if(options.params.api_id == "API_0308") {	//임가통계검색
				api_id = "A07";
			} else if(options.params.api_id == "API_0309") {	//어가통계검색
				api_id = "A08";
			} else if(options.params.api_id == "API_0310") {	//가구원통계검색
				api_id = "A09";
			}
		} else if(options.btntype == "kosis") {
			//KOSIS
			api_id = "A10";
		} else if(options.btntype == "build") {
			//사업체전개도
			api_id = "A11";
		} else if(options.btntype == "combine") {
			//범례결합
			api_id = "A13";
		} else if(options.btntype == "item") {
			//조건결합
			api_id = "A14";
		} else if(options.btntype == "poi") {
			//POI
			api_id = "A12";
			title = options.that.oldselected.innerText;		//타이틀
			for(key in options.param) {
				parameter += key + "=";
				parameter += options.param[key] + "&";
			}
			zoomLevel = options.that._map._zoom;		//줌레벨
			//지역정보
			for(var i = 0; i < $interactiveMap.ui.mapList.length; i ++) {
				if(options.that._map._sop_id == $interactiveMap.ui.mapList[i].gMap._sop_id) {
					var naviData = $interactiveMap.ui.mapList[i].mapNavigation.data;
					adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;
				}
			}
		}
	} else if(type == "B0") {	//창업통계맵
		//API
		//일반검색
		if(options.btntype == "normal") {
			if(options.params.api_id == "API_0601") {	//지역찾기	
				api_id = "B01";
			} else {
				if(options.params.param_info.api_id == "API_0302") {	//인구통계세부조건검색
					api_id = "B02";
					title = "인구통계";
				} else if(options.params.param_info.api_id == "API_0304") {	//사업체분류검색
					api_id = "B03";
					title = "사업체";
				} else if(options.params.param_info.api_id == "API_0305") {	//가구통계검색
					api_id = "B04";
					title = "가구";
				} else if(options.params.param_info.api_id == "API_0306") {	//주택통계검색
					api_id = "B05";
					title = "주택";
				}
				//파라미터
				for(key in options.params.param_info.paramInfo) {
					parameter += key + "=";
					parameter += options.params.param_info.paramInfo[key] + "&";
				}
				//지역정보
				adm_nm = options.params.param_info.adm_nm;	
			}
		} else if(options.btntype == "chart") {
			//차트
			if(options.api_id == "API_0610") {	//지역종합현황
				api_id = "B06";
				title = "지역종합현황";
			} else if(options.api_id == "API_0602") {	//연령별
				api_id = "B07";
				title = "연령별";
			} else if(options.api_id == "API_0603") {	//성별
				api_id = "B08";
				title = "성별";
			} else if(options.api_id == "API_0605") {	//거주외국인
				api_id = "B09";
				title = "거주외국인";
			} else if(options.api_id == "API_0604") {	//거처종류
				api_id = "B10";
				title = "거처종류";
			} else if(options.api_id == "API_0606") {	//점유형태
				api_id = "B11";
				title = "점유형태";
			} else if(options.api_id == "API_0607") {	//업종별 비율
				api_id = "B12";
				title = "업종별 비율";
			} else if(options.api_id == "API_0608") {	//업종별 업력
				api_id = "B13";
				title = "업종별 업력";
			} else if(options.api_id == "API_0609") {	//업종별 증감
				api_id = "B14";
				title = "업종별 증감";
			} else if(options.api_id == "10008") {	//주택거래가격
				api_id = "B15";
				title = "주택거래가격";
			} else if(options.api_id == "10009") {	//주택 거래량
				api_id = "B16";
				title = "주택 거래량";
			}
			//파라미터
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			//줌레벨
			zoomLevel = options.target.map.zoom;
			//지역정보
			adm_nm = options.params.adm_nm;
		} else if(options.btntype == "poi") {
			//POI
			api_id = "B17";
			title = options.that.oldselected.innerText;		//타이틀
			for(key in options.param) {
				parameter += key + "=";
				parameter += options.param[key] + "&";
			}
			zoomLevel = options.that._map._zoom;		//줌레벨
			//지역정보
			for(var i = 0; i < $bizStatsMap.ui.mapList.length; i ++) {
				if(options.that._map._sop_id == $bizStatsMap.ui.mapList[i].gMap._sop_id) {
					var naviData = $bizStatsMap.ui.mapList[i].mapNavigation.data;
					adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;
				}
			}
		} else if(options.btntype == "etc") {
			if(options.api_id == "10011") {
				//행사/공연
				api_id = "B18";
			} else if(options.api_id == "10013") {
				//유동인구
				api_id = "B19";
			} else if(options.api_id == "10015") {
				//학교인구
				api_id = "B20";
			} else if(options.api_id == "10014") {
				//지하철승하차인구
				api_id = "B21";
			} else if(options.api_id == "10012") {
				//버스정류장
				api_id = "B22";
			}
			title = options.target.oldselected.innerText;		//타이틀
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			zoomLevel = options.target._map._zoom;		//줌레벨
			//지역정보
			for(var i = 0; i < $bizStatsMap.ui.mapList.length; i ++) {
				if(options.target._map._sop_id == $bizStatsMap.ui.mapList[i].gMap._sop_id) {
					var naviData = $bizStatsMap.ui.mapList[i].mapNavigation.data;
					adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;
				}
			}
		}
	} else if(type == "C0") {	//통계주제도
		//API
		api_id = options.theme.substring(5, 8);
		//파라미터
		if(options.params.param == undefined) {
			parameter = "null";
		} else {
			for(key in options.params.param) {
				parameter += key + "=";
				parameter += options.params.param[key] + "&";
			}
		}
		//줌레벨
		zoomLevel = options.params.map._zoom;	
	}
	//타이틀
	if(title == "") {
		title = options.params.title;	
	}
	//파라미터
	if(parameter == "") {
		for(var i = 0; i < options.params.param.length; i ++) {
			parameter += options.params.param[i].key + "=";
			parameter += options.params.param[i].value + "&";
		}	
	}
	//줌레벨
	if(zoomLevel == "") {
		zoomLevel = options.params.map.zoom;	
	}
	//지역정보
	if(adm_nm == "") {
		adm_nm = options.params.adm_nm;	
	}
	var sopPortalAPILogWriteObj = new sop.portal.apiLogWrite.api();
	sopPortalAPILogWriteObj.addParam("type", type);
	sopPortalAPILogWriteObj.addParam("api_id", api_id);
	sopPortalAPILogWriteObj.addParam("title", title);
	sopPortalAPILogWriteObj.addParam("parameter", encodeURIComponent(parameter));
	sopPortalAPILogWriteObj.addParam("zoomLevel", zoomLevel);
	sopPortalAPILogWriteObj.addParam("adm_nm", adm_nm);
	sopPortalAPILogWriteObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/common/APILogWrite.json"
	});
}
function apiLogWrite2(type, api_id, title, parameter, zoomLevel, adm_nm) {
	var sopPortalAPILogWriteObj = new sop.portal.apiLogWrite.api();
	sopPortalAPILogWriteObj.addParam("type", type);
	sopPortalAPILogWriteObj.addParam("api_id", api_id);
	sopPortalAPILogWriteObj.addParam("title", title);
	sopPortalAPILogWriteObj.addParam("parameter", encodeURIComponent(parameter));
	sopPortalAPILogWriteObj.addParam("zoomLevel", zoomLevel);
	sopPortalAPILogWriteObj.addParam("adm_nm", adm_nm);
	sopPortalAPILogWriteObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/common/APILogWrite.json"
	});
}
/** ********* API 호출 로그 End ********* */
/** ********* 행정동코드로 지역명칭 조회 (API 호출 로그) Start ********* */
(function () {
	$class("sop.portal.addrCdToNm.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			if (res.errCd == "0") {
				options.params["adm_nm"] = result.addrList[0].adm_nm;
				apiLogWrite(options.type, options);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());
function addrCdToNm (base_year, adm_cd, options) {
	if(adm_cd == null) {
		adm_cd = "00";
	}
	var sopPortalAddrCdToNmObj = new sop.portal.addrCdToNm.api();
	sopPortalAddrCdToNmObj.addParam("base_year", base_year);
	sopPortalAddrCdToNmObj.addParam("adm_cd", adm_cd);
	sopPortalAddrCdToNmObj.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/map/codeToAddress.json",
		options : options
	});
}
/** ********* 행정동코드로 지역명칭 조회 (API 호출 로그) End ********* */

/** ********* AccessToken 정보 조회 Start ********* */
(function () {
	$class("sop.portal.accessToken.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res,options) {
			var result = res.result;
			if (res.errCd == "0") {
				accessToken = result.accessToken;
				
				date = new Date(); // 오늘 날짜
				// 만료시점 : 오늘날짜+10 설정
				var validity = 1;
				date.setDate(date.getDate() + validity);
				
				document.cookie = "accessToken=" + escape(accessToken) + ';expires=' + date.toGMTString();
			}
			else {
				//messageAlert.open("알림", res.errMsg);
			}
			if(options.callback === "function"){
				options.callback();
			}
		},
		onFail : function (status) {
		}
	});
}());

function accessTokenInfo (callback) {
	var sopPortalAccessTokenObj = new sop.portal.accessToken.api();
	sopPortalAccessTokenObj.addParam("consumer_key", "590a2718c58d41d9ae3b");
	sopPortalAccessTokenObj.addParam("consumer_secret", "ab7fe94f9fb64336abd3");
	sopPortalAccessTokenObj.request({
		method : "GET",
		async : false,
		url : openApiPath + "/OpenAPI3/auth/authentication.json",
		options : {
			callback : callback
		}
	});
}
/** ********* AccessToken 정보 조회 End ********* */

/** ********* 세션 정보 조회 Start ********* */
(function () {
	$class("sop.portal.sessionInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			var result = res.result;
			if (res.errCd == "0") {
				var Authobj;
				if (result.sessionId == null) {
					Authobj = {
						authStatus : false
					}
				}
				else {
					Authobj = {
						authStatus : true
					}
				}
				
				AuthInfo = Authobj;
				setSession();
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function sessionInfo () {
	var sopPortalSessionInfoObj = new sop.portal.sessionInfo.api();
	sopPortalSessionInfoObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/auth/sessionInfo.json"
	});
}
/** ********* 세션 정보 조회 End ********* */

/** ********* 개발자 세션 정보 조회 Start ********* */
(function () {
	$class("sop.portal.sessionInfoDeveloper.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());

function sessionInfoDeveloper () {
	var sopPortalSessionInfoDeveloperObj = new sop.portal.sessionInfoDeveloper.api();
	sopPortalSessionInfoDeveloperObj.request({
		method : "POST",
		async : false,
		url : developApiPath + "/auth/get.json"
	});
}
/** ********* 개발자 세션 정보 조회 End ********* */

/** ********* 페이지 호출통계 Start ********* */
(function () {
	$class("sop.portal.pageCallReg.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());

function pageCallReg() {
	var url = document.location.href;
	var hpage;
	
	if(url.indexOf("#") > -1) {	//파라미터가 있으면 # 까지 자름
		hpage = url.substring(0, url.indexOf("#"));
		url = hpage;
	}
	if(url.indexOf("?") > -1) {	//파라미터가 있으면 ? 까지 자름 
		hpage = url.substring(url.indexOf("/", 10), url.indexOf("?"));		
	} else {
		hpage = url.substring(url.indexOf("/", 10), url.length);
	}
	
	var sopPortalPageCallRegObj = new sop.portal.pageCallReg.api();
	sopPortalPageCallRegObj.addParam("hpage", hpage);
	sopPortalPageCallRegObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/common/pageCallReg.json"
	});
}
/** ********* 페이지 호출통계 End ********* */

/** ********* 실명인증 회원사 정보 조회 Start ********* */
(function () {
	$class("sop.portal.configInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			var result = res.result;
			if (res.errCd == "0") {
				$("#reqInfo").val(result.reqInfo);
				$("#retUrl").val(result.retUrl);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function configInfo (type) {
	var sopPortalConfigInfoObj = new sop.portal.configInfo.api();
	sopPortalConfigInfoObj.addParam("type", type);
	sopPortalConfigInfoObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/member/memberConfigInfo.json"
	});
}
/** ********* 실명인증 회원사 정보 조회 End ********* */

/** ********* 로그아웃 프로세스 Start ********* */
(function () {
	$class("sop.portal.logout.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			var result = res.result;
			if (res.errCd == "0") {
				AuthInfo = {
					authStatus : false
				};
				setSession();
				logoutDeveloperProcess();
				messageAlert.open(
						"알림", 
						"로그아웃되었습니다.",
						function done(){
							window.location.href = contextPath+"/mobile";
						}
				);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function logoutProcess () {
	messageAlert.open(
			"알림", 
			"로그아웃 하시겠습니까?",
			function done() {
				var sopPortalLogoutObj = new sop.portal.logout.api();
				sopPortalLogoutObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/member/logout.json"
				});
			},
			function cancel() {
				
			}
	);
	
/*	if (confirm("로그아웃 하시겠습니까?")) {
		var sopPortalLogoutObj = new sop.portal.logout.api();
		sopPortalLogoutObj.request({
			method : "POST",
			async : false,
			url : contextPath + "/ServiceAPI/member/logout.json"
		});
	}*/
}
/** ********* 로그아웃 프로세스 End ********* */

/** ********* 개발자 로그아웃 프로세스 Start ********* */
(function () {
	$class("sop.portal.logoutDeveloper.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());

function logoutDeveloperProcess () {
	var sopPortalLogoutDeveloperObj = new sop.portal.logoutDeveloper.api();
	sopPortalLogoutDeveloperObj.request({
		method : "POST",
		async : false,
		url : developApiPath + "/ServiceAPI/member/logout.json"
	});
}
/** ********* 개발자 로그아웃 프로세스 End ********* */

// 세션받아오기
function setSession (auth) {
	AuthInfo = auth;
	$sgis.start();
	if (AuthInfo&&AuthInfo.authStatus) {
		$(".Footer>.Footermenu").html('<a href="javascript:memberLogout();">로그아웃</a> | <a href="/mobile/html/mypage/mypage.html">마이페이지</a> | <a href="/mobile/help_sgis_mobile.pdf" target="_blank">도움말</a>');
	} else {
		var redirect = encodeURIComponent(location.href.replace(/http(s)?:\/\//gi,'').substring(location.href.replace(/http(s)?:\/\//gi,'').indexOf("/")));
		$(".Footer>.Footermenu").html('<a href="/mobile/html/member/login.html?returnPage='+redirect+'">로그인</a> | <a href="/mobile/html/member/login.html?returnPage=/mobile/html/mypage/mypage.html">마이페이지</a> | <a href="/mobile/help_sgis_mobile.pdf" target="_blank">도움말</a>');
	}
	// 함수 존재유무 판단
	if ($.isFunction(window.getSession)) {
		// 호출 페이지에 getSession 함수가 있으면 호출
		getSession();
	}
}

var PCC_window;
// 휴대폰 본인인증 팝업
function openPCCWindow () {
	 wWidth = 430;
	 wHight = 560;

	 wX = (window.screen.width - wWidth) / 2;	    
 	 wY = (window.screen.height - wHight) / 2;	    	

    var PCC_window = window.open('', 'PCCV3Window', "directories=no,scrollbars=yes,scrollbars=no,left="+wX+",top="+wY+",width="+wWidth+",height="+wHight);
	//var PCC_window = window.open('', 'PCCV3Window', 'width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200');    
	if (PCC_window == null) {
		alert(" ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.");
	}
	
	document.reqPCCForm.action = 'https://pcc.siren24.com/pcc_V3/jsp/pcc_V3_j10.jsp';
	document.reqPCCForm.target = 'PCCV3Window';
	document.reqPCCForm.submit();
}

// Timstamp 만드는 함수
function makeStamp (d) { // Date d
	var y = d.getFullYear(), M = d.getMonth() + 1, D = d.getDate(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), ss = d.getMilliseconds(),

	pad = function (x) {
		x = x + '';
		if (x.length === 1) {
			return '0' + x;
		}
		return x;
	};
	return y + pad(M) + pad(D) + pad(h) + pad(m) + pad(s) + pad(ss);
}

// 아이디는 영문 & 숫자 조합으로만 사용 했는지 확인
function mycheck (p) {
	chk1 = /^[a-z\d]{6,12}$/i; // a-z와 0-9이외의 문자가 있는지 확인
	chk2 = /[a-z]/i; // 적어도 한개의 a-z 확인
	chk3 = /\d/; // 적어도 한개의 0-9 확인
	return chk1.test(p) && chk2.test(p) && chk3.test(p);
}

// 패스워드 숫자, 영문, 특수키 혼합하여 9 ~ 20자리 사용 여부 확인
function passwd_check (p) {
	var reg = /^.*(?=.{9,20})(?=.*\D)(?=.*[a-zA-Z])(?=.*[!@#$*^(){}]).*$/;
	return reg.test(p);
}
function passwd_check2 (p) {
	var reg = /[&%<>]/;
	return reg.test(p);
}

// Get 방식으로 파라미터를 받을 때
function getParameter (name) {
	search = location.search;
	if (search) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return results[1] || 0;
		}
	}
}

function getAllParameter (val) {
	var query_string = {};
	var query = window.location.search.substring(1);
	if(val != undefined) {	//주소창 url이 아닐경우
		query = val;
	}
	query = query.replace("params=", "");
	
	var vars = query.split('&');
	for ( var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		// If first entry with this name
		if (typeof query_string[pair[0]] === 'undefined') {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		}
		else if (typeof query_string[pair[0]] === 'string') {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		}
		else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
}

function JSONtoString (object) {
	var results = [];
	for ( var property in object) {
		var value = object[property];
		if (value)
			results.push(property.toString() + ': ' + value);
	}
	
	return '{' + results.join(', ') + '}';
}

// 37자리 아이디 생성 (Random10 + yyyyMMddHHmmssSSS + Random10)
function makeRandomThirtySevenDigitString () {
	var front = makeRandomDigitString(10);
	var currentdate = new Date();
	var timestamp = makeStamp(currentdate);
	var end = makeRandomDigitString(10);
	
	return front + timestamp + end;
}

function makeRandomDigitString (x) {
	var s = "";
	while (s.length < x && x > 0) {
		var r = Math.random();
		s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
	}
	return s;
}

// 천단위 자리 콤마
function appendCommaToNumber (num) {
	var len, point, str;
	
	num = num + "";
	var tmpNum = null;
	var tmpMod = null;
	var isNagative = false;
	
	if (num.indexOf("-") != -1) {
		isNagative = true;
		num = num.replace("-", "");
	}
	
	if (num.indexOf(".") == -1) {
		tmpNum = num;
	}else {
		tmpNum = num.split(".")[0];
		tmpMod = "." + num.split(".")[1];
	}

	point = tmpNum.length % 3;
	len = tmpNum.length;
	
	str = tmpNum.substring(0, point);
	while (point < len) {
		if (str != "")
			str += ",";
		str += tmpNum.substring(point, point + 3);
		point += 3;
	}

	if (tmpMod != null && tmpMod.length > 0) {
		str = str + tmpMod;
	}
	
	if (isNagative) {
		str = "-" + str;
	}
	return str;
}

//전화번호 하이픈
function appendHyphenToPhoneNumber (num) {
	if(num.indexOf("-") > -1) {
		return num;
	}
	
	var returnStr = "";
	num=num.trim();
	var len = num.length;
	
	switch(len) {
	case 9:
		returnStr = num.substring(0, 2);
		returnStr += "-";
		returnStr += num.substring(2, 5);
		returnStr += "-";
		returnStr += num.substring(5, 9);
		break;
		
	case 10:
		if(num.substring(0, 2) == "02") {
			returnStr = num.substring(0, 2);
			returnStr += "-";
			returnStr += num.substring(2, 6);
			returnStr += "-";
			returnStr += num.substring(6, 10);
		} else {
			returnStr = num.substring(0, 3);
			returnStr += "-";
			returnStr += num.substring(3, 6);
			returnStr += "-";
			returnStr += num.substring(6, 10);
		}
		
		break;
		
	case 11:
		returnStr = num.substring(0, 3);
		returnStr += "-";
		returnStr += num.substring(3, 7);
		returnStr += "-";
		returnStr += num.substring(7, 11);
		break;
		
	default:
		if(len < 9) {
			returnStr = num.substring(0, (len / 2));
			returnStr += "-";
			returnStr += num.substring((len / 2));
		} else {
			returnStr = num.substring(0, (len / 3));
			returnStr += "-";
			returnStr += num.substring((len / 3), (len / 3) * 2);
			returnStr += "-";
			returnStr += num.substring((len / 3) * 2);
		}
		break;
	}
	
	return returnStr;
}

function makeYYYYMMDDString (str) {
	var date = str;
	var dateString = '';
	dateString += date.substring(0, 4) + '년 ';
	dateString += date.substring(4, 6) + '월 ';
	dateString += date.substring(6, 8) + '일';
	return dateString;
	
}

/*	공통 알럿 DIV
 * 	messageAlert.open(제목, 내용, 확인버튼콜백(options), 취소버튼콜백(options))
 */
var messageAlert = {
	open: function(title, message, okFnc, cancelFnc, options) {
		var alertId = makeRandomThirtySevenDigitString();
		var html = "";
		html +=
			html += "	<div class='popupWrapper' id='wrapper_" + alertId + "'>";
		html += "		<div class='alertPopupWrapper' id='popup_" + alertId + "'>";
		html += "			<div class='alertPopupTitle'>";
		html += "				<div class='myTitleFont' style='padding-top:9px;'>" + title + "</div>";
		html += "				<div class='myXbtn' id='myXbtn_" + alertId + "' style='padding-top:12px;'><a href='#'><img src='/mobile/img/popup/btn_popupX.png' alt='종료'/></a></div>";
		html += "			</div>";
		html += "			<div class='messageBox'>" + message + "</div>";
		html += "			<div class='btnbox'>";
		html += "				<img src='/mobile/img/popup/btn_confirm.png' alt='확인' id='okBtn_" + alertId + "' style='cursor: pointer;' />";
		if (cancelFnc != undefined) {
			html += "				<img src='/mobile/img/popup/btn_cancel.png' alt='취소' id='cancelBtn_" + alertId + "' style='cursor: pointer;' />";
		}
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		$("body").append(html);

		//화면 중앙에 맞추기
		var d = document;
		var h = d.body.clientHeight;
		var y = (window.pageYOffset) ?
			window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
			d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
		$("#popup_" + alertId).css("margin-top", ((h / 2) + y) - 50);
		$(".popupWrapper").css("height", d.body.scrollHeight);

		$("#okBtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (typeof okFnc === "function") {
				okFnc.call(this, options);
			}
		});

		$("#cancelBtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (typeof cancelFnc === "function") {
				cancelFnc.call(this, options);
			}
		});

		$("#myXbtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (typeof cancelFnc === "function") {
				cancelFnc.call(this, options);
			}
		});

	},

	defaultClose: function(alertId) {
		$("#wrapper_" + alertId).remove();
	}
};

var messageConfirm = {
	open: function(title, message, btnOptions) {
		var alertId = makeRandomThirtySevenDigitString();
		var html = "";
		html +=
			html += "	<div class='popupWrapper' id='wrapper_" + alertId + "'>";
		html += "		<div class='alertPopupWrapper' id='popup_" + alertId + "'>";
		html += "			<div class='alertPopupTitle'>";
		html += "				<div class='myTitleFont' style='padding-top:9px;'>" + title + "</div>";
		html += "				<div class='myXbtn' id='myXbtn_" + alertId + "' style='padding-top:12px;'><a href='#'><img src='/mobile/img/popup/btn_popupX.png' alt='종료'/></a></div>";
		html += "			</div>";
		html += "			<div class='messageBox'>" + message + "</div>";
		html += "			<div class='btnbox'>";
		html += "			<div style='margin:auto 0; width:100%'>";

		for (var i = 0; i < btnOptions.length; i++) {
			html += "<input type='button' id='btn_" + i + "_" + alertId + "' class='cBtn' value='" + btnOptions[i].title + "'>";
		}

		html += "			</div>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		$("body").append(html);


		$(".cBtn").css({
			"-webkit-appearance": "none",
			"height": "35px",
			"width": "100px",
			"font-size": "14px",
			"font-weight": "bold",
			"line-height": "35px",
			"color": "#ffffff",
			"background": "#3386d4",
			"margin-right": "5px",
			"cursor": "pointer",
			"border": "0"
		});

		$(".cBtn").hover(function() {
			$(this).css({
				"background": "#666666"
			});
		}, function() {
			$(this).css({
				"background": "#3386d4"
			});
		});

		for (var i = 0; i < btnOptions.length; i++) {
			$("#btn_" + i + "_" + alertId).click(function(index) {
				messageAlert.defaultClose(alertId);
				var id = this.id.split("_");
				var idx = id[1];
				if (btnOptions[idx].func != undefined) {
					btnOptions[idx].func.call(this, btnOptions[idx].fAgm);
				}
			});

			if (btnOptions[i].disable != undefined && btnOptions[i].disable) {
				$("#btn_" + i + "_" + alertId).attr("disabled", "disabled");
				$("#btn_" + i + "_" + alertId).css({
					"background": "#cecece"
				});
			}

			if (btnOptions[i].style != undefined && btnOptions[i].style) {
				$("#btn_" + i + "_" + alertId).css(btnOptions[i].style);
			}

		}

		//화면 중앙에 맞추기
		var d = document;
		var h = d.body.clientHeight;
		var y = (window.pageYOffset) ?
			window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
			d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
		$("#popup_" + alertId).css("margin-top", ((h / 2) + y) - 50);
		$(".popupWrapper").css("height", d.body.scrollHeight);

		$("#okBtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (typeof okFnc === "function") {
				okFnc.call(this, options);
			}
		});

		$("#cancelBtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (typeof cancelFnc === "function") {	
				cancelFnc.call(this, options);
			}
		});

		$("#myXbtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (typeof cancelFnc === "function") {
				cancelFnc.call(this, options);
			}
		});

	},

	defaultClose: function(alertId) {
		$("#wrapper_" + alertId).remove();
	}
};
var messagePrompt = {
	open: function(title, message, btnOptions, defaultValue, placeholder,callback) {
		var alertId = makeRandomThirtySevenDigitString();
		var html = "";
		html +=
			html += "	<div class='popupWrapper' id='wrapper_" + alertId + "'>";
		html += "		<div class='alertPopupWrapper' id='popup_" + alertId + "'>";
		html += "			<div class='alertPopupTitle'>";
		html += "				<div class='myTitleFont' style='padding-top:8px;'>" + title + "</div>";
		html += "				<div class='myXbtn' id='myXbtn_" + alertId + "' style='padding-top:12px;'><a href='#'><img src='/mobile/img/popup/btn_popupX.png' alt='종료'/></a></div>";
		html += "			</div>";
		html += "			<div class='messageBox'>" + message + "</div>";
		html += "			<div><input type='text' id='popupInput" + alertId + "' class='alertInputBox' " + (placeholder != undefined ? "placeholder='" + placeholder + "'" : "") + "value='"+defaultValue+"'></div>";
		html += "			<div class='btnbox'>";
		html += "			<div style='margin:auto 0; width:100%'>";

		for (var i = 0; i < btnOptions.length; i++) {
			html += "<input type='button' id='btn_" + i + "_" + alertId + "' class='cBtn' value='" + btnOptions[i].title + "'>";
		}

		html += "			</div>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		$("body").append(html);


		$(".cBtn").css({
			"-webkit-appearance": "none",
			"height": "35px",
			"width": "100px",
			"font-size": "14px",
			"font-weight": "bold",
			"line-height": "35px",
			"color": "#ffffff",
			"background": "#3386d4",
			"margin-right": "5px",
			"cursor": "pointer",
			"border": "0"
		});

		$(".cBtn").hover(function() {
			$(this).css({
				"background": "#666666"
			});
		}, function() {
			$(this).css({
				"background": "#3386d4"
			});
		});

		for (var i = 0; i < btnOptions.length; i++) {
			$("#btn_" + i + "_" + alertId).click(function(index) {
				messageAlert.defaultClose(alertId);
				var id = this.id.split("_");
				var idx = id[1];
				if (btnOptions[idx].func != undefined) {
					btnOptions[idx].func.call(this, btnOptions[idx].fAgm);
				}
			});

			if (btnOptions[i].disable != undefined && btnOptions[i].disable) {
				$("#btn_" + i + "_" + alertId).attr("disabled", "disabled");
				$("#btn_" + i + "_" + alertId).css({
					"background": "#cecece"
				});
			}

			if (btnOptions[i].style != undefined && btnOptions[i].style) {
				$("#btn_" + i + "_" + alertId).css(btnOptions[i].style);
			}

		}

		//화면 중앙에 맞추기
		var d = document;
		var h = d.body.clientHeight;
		var y = (window.pageYOffset) ?
			window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
			d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
		$("#popup_" + alertId).css("margin-top", ((h / 2) + y) - 150);
		$(".popupWrapper").css("height", d.body.scrollHeight);

		$("#okBtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (okFnc != undefined) {
				okFnc.call(this, options);
			}
		});

		$("#cancelBtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (cancelFnc != undefined) {
				cancelFnc.call(this, options);
			}
		});

		$("#myXbtn_" + alertId).click(function() {
			messageAlert.defaultClose(alertId);
			if (typeof cancelFnc === "function") {
				cancelFnc.call(this, options);
			}
		});
		
		if(typeof callback === "function"){
			callback(alertId);
		}
	},

	defaultClose: function(alertId) {
		$("#wrapper_" + alertId).remove();
	}
};

function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
};


/**
 * SQLinjection
 */

var IsValidMsg = {
	searchInput : [ /^[a-zA-Z0-9가-힣.\s-]{0,20}$/, "영문 ,숫자 ,한글 그리고 20자리 미만 문자열 입력가능합니다.", "disabled" ],
	crSearchInput : [ /^[a-zA-Z0-9가-힣][_?=.*-]{0,12}$/g, "영문, 숫자, 한글만 입력가능합니다.","disabled" ],
	formInput : [ /^[a-zA-Z0-9가-힣.\s-]{0,250}$/, "영문 ,숫자 ,한글만 입력가능합니다.", "disabled" ]
	

// PWD : [/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm,"8~15 사이의 수, 최소 1개의
// 대문자와 소문자 그리고 특수문자 1개 포함","disabled"],
// EMAIL :
// [/^[a-zA-Z]{1,}[0-9a-zA-Z_-]{1,}[.]{0,1}[0-9a-zA-Z_-]{1,}[@][0-9a-zA-Z_-]{1,}[.][\/.0-9a-zA-Z_-]{1,}[0-9a-zA-Z_-]{1,}$/,"0000@000.com","disabled"],
};

function IsValid(input, inputdata) {
	var ExpStr = IsValidMsg[input][0];
	var status = true;
	status = ExpStr.test(inputdata);
		if (!status) {
		if (IsValidMsg[input][1] != "") {
			var okmessage = IsValidMsg[input][1];
			messageAlert.open('', okmessage);			
			status=false;
		}
	}
	return status;

};

function copyToClipboard(text) {  
	if(window.clipboardData){  
		// IE처리
		// 클립보드에 문자열 복사
		window.clipboardData.setData('text', text);

		// 클립보드의 내용 가져오기
		// window.clipboardData.getData('Text');

		// 클립보드의 내용 지우기
		// window.clipboardData.clearData("Text");

	}  else {                     
		// 비IE 처리    
		window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);  
	}
}


var mimeTypeList = {
	application : [
	               // Zip 파일
	               "x-compressed",
	               "x-zip-compressed",
	               "zip",
	               "x-zip",
	               
	               // 엑셀
	               "excel",
	               "x-excel",
	               "x-msexcel",
	               "vnd.ms-excel",
	               "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	               
	               // 파워포인트
	               "mspowerpoint",
	               "powerpoint",
	               "x-mspowerpoint",
	               "vnd.openxmlformats-officedocument.presentationml.presentation",
	               "vnd.ms-powerpoint",
	               
	               // MS 워드
	               "msword",
	               "vnd.openxmlformats-officedocument.wordprocessingml.document",

				   // PDF
				   "pdf",
				   "x-pdf",
	               
	               // 한글
	               "haansofthwp"
	              ],
	image : ["bmp",
	         "jpeg",
	         "gif",
	         "png"
	         ],
	extension : [
				 "jpg",
				 "jpeg",
				 "bmp",
				 "png",
				 "gif",
				 "zip",
				 "hwp",
				 "xls",
				 "xlsx",
				 "ppt",
				 "pptx",
				 "doc",
				 "docx",
				 "csv",
				 "pdf"
				 ]
};

function isPossibleMimeType(type, extension) {
	var temp = mimeTypeList[type];
	
	if(!mimeTypeList[type]) {
		return false;
	} else {
		for(var i = 0; i < temp.length; i++) {
			if(temp[i] == extension) {
				return true;
			}
		}
	}
	
	return false;
};

//format 1-9 to 01, 02, ..., 09
//author: liudandan
function formatDate(date){  
	var d = date;  
	if(date.toString().length == 1){  
	   d = "0" + date;  
	}  
	return d;  
}

function numbersonly(e, value, decimal) {
    var key;
    var keychar;

    if (window.event) {
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return true;
    }
    
    keychar = String.fromCharCode(key);

    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13)
            || (key == 27)) {
        return true;
    } else if ((("0123456789").indexOf(keychar) > -1)) {
        return true;
    } else if (decimal && (keychar == ".")) {
    	if (value.indexOf(".") == -1) {
    		 return true;
    	}else {
    		return false;
    	}
       
    } else	
        return false;
}


function load_proc()
{
/*	document.oncontextmenu = function(){return false};
	document.onmousemove = function() {return false};*/
	document.oncontextmenu=function(){return false;}
	document.onselectstart=function(){return false;}
	//document.ondragstart=function(){return false;}
	//document.onmousemove=function(){return false;}
}

/** ********* 메인화면 최근목록 조회 Start ********* */
(function () {
	$class("sop.portal.mainRecentLists.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			if (res.errCd == "0") {
				setMainRecentLists(res.result);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function getMainRecentLists() {
	var sopPortalMainRecentListsObj = new sop.portal.mainRecentLists.api();
	sopPortalMainRecentListsObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/common/MainRecentLists.json"
	});
}

function setMainRecentLists(obj) {
	// 인터랙티브맵 최근목록
	var interactive = obj.interactive_lists;
	var html = "<ul>";
	for(var i = 0; i < interactive.length; i++) {
		if (interactive[i].hist_id != undefined) {
			var params = JSON.parse(interactive[i].param_info);
			html += "<li><p><a href='/view/map/interactiveMap?intr=" + interactive[i].hist_id + "'>" 
				+ interactive[i].title + " ("+ params.unit +")</a></p></li>";
		}
	}
	html += "</ul>";
	
	$("#interactive_recent_list_div").html(html);
	
	// 인터랙티브맵 최근목록
	var thema = obj.thema_lists;
	html = "<ul>";
	for(var i = 0; i < thema.length; i++) {
		if (thema[i].category != undefined) {
			html += "<li><p><a href='/view/thematicMap/thematicMapMain?theme=" + thema[i].category 
			 + "&stat_thema_map_id=" + thema[i].stat_thema_map_id 
			 + "&mapType=" + thema[i].thema_map_type + "'>" 
			 + thema[i].title + "</a></p></li>";
		}
	}
	html += "</ul>";
	
	$("#thema_recent_list_div").html(html);
}
/** ********* 페이지 호출통계 End ********* */

//지도 맵 분할에서 현재 보고있는 맵의 아이디 리턴 (0, 1)
function getMapDivisionId() {
	var mapId = "0";
	if($("#map_dummy_1").css("display") == "block" && $("#map_dummy_2").css("display") == "block") {	//맵 분할 시 첫번째 맵이 우선
		mapId = "0";
	} else if($("#map_dummy_1").css("display") == "block" && $("#map_dummy_2").css("display") == "none") {	//첫번째 맵
		mapId = "0";
	} else if($("#map_dummy_1").css("display") == "none" && $("#map_dummy_2").css("display") == "block") {	//두번째 맵
		mapId = "1";
	}
	return mapId;
}

/**
 * 	입력받은 텍스트를 해당 길이만큼만 자르고 나머지는 ... 처리
 *  param : 텍스트
 *  param : 길이
 */
function textSubString(txt, leng) {
	if(txt.length <= leng) {
		return txt;
	} else {
		return txt.substring(0, leng) + ".....";	
	}
}

function browserFnc() {    
    var rv = -1; // Return value assumes failure.    
    if (navigator.appName == 'Microsoft Internet Explorer') {        
         var ua = navigator.userAgent;        
         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
         if (re.exec(ua) != null)            
             rv = parseFloat(RegExp.$1);    
        }    
    return rv; 
} 
function decodeEntities(encodedString) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}
function CompareForSort(first, second){
	if (first == second)
		return 0;
	if (first < second)
		return -1;
	else
		return 1; 
}
function dynamicSort(property,isNumber) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
    	var compareA = isNumber?parseFloat(a[property]):a[property];
    	var compareB = isNumber?parseFloat(b[property]):b[property];
        var result = (compareA < compareB) ? -1 : (compareA > compareB) ? 1 : 0;
        return result * sortOrder;
    }
}
window.$sgis = {
	arrayFunction:[],
	ready:function(callback){
		this.arrayFunction.push(callback);
	},
	start:function(){
		$.each(this.arrayFunction,function(cnt,node){
			if(typeof node==="function"){
				node();
			}
		});
	}
};
//20160812 김도형 (추가 시작)
$(window).error(function(){
	setTimeout(function(){
		$(".sgis-loading-box").remove();
	},1000);
});
//20160812 김도형 (추가 끝)