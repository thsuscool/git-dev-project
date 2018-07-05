<%
/**************************************************************************************************************************
* Program Name  : 메인 JSP  
* File Name     : index.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String userAgent = request.getHeader("User-Agent");
	String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos",
				"Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};
	
	String param = request.getParameter("param");
	if(param == null || !param.equals("0")){
		int j = -1;
		if(userAgent != null && !userAgent.equals("")){
			for(int i = 0; i < mobileOs.length; i++){
				j = userAgent.indexOf(mobileOs[i]);
				if(j > -1 ){
					out.println("");
					out.println("");
					out.println("<script>");
					out.println("location.href='/mobile';");
					out.println("</script>");
					out.println("");
					out.println("");
					break;
				}
			}
		}
	}
%>
<!-- Top Include -->
<jsp:include page="/view/common/common"></jsp:include>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>통계지리정보서비스</title>
    <link href="/css/default.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="/css/main/main.css" />
    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type="text/javascript" src="/js/plugins/slick.min.js"></script>    
    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
    
    <script type="text/javascript" src="/js/common/common.js"></script>
    <script type="text/javascript" src="/js/index.js"></script>        
    <script>
	    $(function(){		
	    	$(".slickList").mCustomScrollbar({axis:"xy"}); 
		});
	    function video(){
	    	var url = '/html/videoPopup/popup.html';
		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
		                  'status=no,location=no,menubar=no,width=821,height=461'; 
		   window.open(url, 'video', options);
	    }
		
		function Pop_close(){
			$("#Popup_main").hide();
		}
		function gridPop(){
			var url = '/view/board/gridWrite';
		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
		                  'status=no,location=no,menubar=no,top=200,left=200'; 
		   window.open(url, '', options);
		}
    </script>
</head>

<body class="main">
	<!-- 레이어팝업 S -->
	    <div class="Popup_main" id="Popup_main"  style="display:none;">
	    </div>
	    <!-- 레이어팝업 E -->
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		
	    <!-- body -->
	    <div id="container">
			<dl class="latestList">
				<dt class="im"><!-- 인터렉티브맵 -->
					<p class="h3" title="통계주제도"><a href="/view/thematicMap/categoryList" class="evtLatest">Thematic Maps <span >통계주제도</span></a></p>
					<ul>
						<li><a href="/view/thematicMap/categoryListHuman">인구와 가구</a></li>
						<li><a href="/view/thematicMap/categoryListHouse">주거와 교통</a></li>
						<li><a href="/view/thematicMap/categoryListWelfare">복지와 문화</a></li>
						<li><a href="/view/thematicMap/categoryListWork">노동과 경제</a></li>
						<li><a href="/view/thematicMap/categoryListEnvironment">환경과 안전</a></li>
					</ul>
				</dt>
				<dd class="im">
					<p class="h4" title="통계주제도"><span>통계주제도</span>Thematic Maps </p>
					<p class="etc" title="통계주제도">사회적으로 관심 있는 주제별<br>통계지도를 설정없이 간편하게 <br>조회할 수 있습니다.</p> 
					<p class="subj"><!-- "6월 보훈의 달" 추천 주제도 --></p>
					<p class="roundBox"><span class="cate">주요지표</span><span id="mainThemaTitle2"><!-- 1세~7세 + 남자(명) --></span></p>
					<div id="thema_recent_list_div" class="slickList">
						<ul class="exContentsList" id="thema">
							<!-- <li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li> -->
						</ul> 
					</div>
					
					<div class="arr"></div>
				</dd>
				<dt class="tm"><!-- 통계주제도 -->
					<div style="font-size:12px;">
					<!-- mng_s 20170913_김건민 -->
					<a href="/view/map/interactiveMap" class="evtLatest">Interactive Map <br /><span style="font-size: 20px; font-family: 나눔고딕b;">대화형 통계지도 </span></a>
					<!-- mng_e 20170913_김건민 -->
					</div>
					<ul>
						<li><a href="/view/map/interactiveMap/mainIndexView">주요지표</a></li>
						<li><a href="/view/map/interactiveMap/populationHouseView">인구주택총조사</a></li>
						<li><a href="/view/map/interactiveMap/companyView">전국사업체조사</a></li>
						<li><a href="/view/map/interactiveMap/kosisView">KOSIS(지역통계)</a></li>
						<li><a href="/view/map/interactiveMap/userDataView">나의 데이터</a></li>
					</ul>
				</dt>
				<dd class="tm">
					<!-- mng_s 20170913_김건민 -->
					<h4 title="대화형 통계지도"><span>대화형 통계지도 </span></h4>
					<!-- mng_e 20170913_김건민 -->
					<p class="etc" title="대화형 통계지도">인구, 가구, 주택, 사업체 등<br>다양한 데이터를 지도위에서 <br>사용자 조건에 맞게<br>조회할 수 있습니다.</p>
					<p class="subj"><!-- "6월 보훈의 달" 추천 주제도 --></p>
					<p class="roundBox2"><span class="cate2">주요지표</span><span id="mainThemaTitle"><!-- 1세~7세 + 남자(명) --></span></p>
					<div id="interactive_recent_list_div" class="slickList">
						<ul class="exContentsList" id="inter">
							<!-- <li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li>
							<li><a href="javascript:void(0)"><span class="cate">주요지표</span><span>1세~7세 + 남자(명)</span></a></li> -->
						</ul> 
					</div>
					
					<div class="arr"></div>
				</dd>
				<dt class="ca"><!-- 활용사례 -->
					<p class="h3" title="활용서비스"><a href="/view/common/serviceMain">Case of Application <span >활용서비스</span></a></p>  
				</dt>
				<dd class="ca">
					<div class="icoSlideBox">
						<div class="icoSlideController">
							<a href="javascript:void(0)" class="micoPrev">이전</a>
							<a href="javascript:void(0)" class="micoNext">다음</a>
						</div>
						<div class="icoSlide">
							<div class="item"><a href="/view/map/policyStaticMap" class="caIco06">정책<br>통계지도</a></div>
							<div class="item"><a href="/view/technicalBiz/technicalBizMap" class="caIco05">기술업종<br>통계지도</a></div>							
							<div class="item"><a href="/view/house/houseAnalysisMap" class="caIco01">살고싶은<br>우리동네</a></div>
							<div class="item"><a href="/view/bizStats/bizStatsMap" class="caIco02">우리동네<br>생활업종</a></div>
							<div class="item"><a href="/view/community/intro" class="caIco03">지역현안<br>소통지도</a></div>
							<div class="item"><a href="https://sgis.kostat.go.kr/statexp/index.jsp" class="caIco04">통계지도체험</a></div>
							<div class="item"><a href="/view/gallery/resultGallery" class="caIco07">통계갤러리</a></div>
						</div>
					</div> 
				</dd>
				<dt class="ma"><!-- 분석지도 -->
					<p class="h3" title="분석지도"><a href="/view/common/analMapMain">Map Analysis  <span >분석지도 </span></a></p>  
				</dt>
				<dd class="ma">
					<ul>
					
					<!--
					<li><a href="javascript:alert('서비스 점검중입니다. 신속히 복구하겠습니다.');">월간통계</a></li>
					-->
						<li><a href="https://analysis.kostat.go.kr/funny_month/month/sta_month_main.do">월간통계</a></li>
						<li><a href="https://sgis.kostat.go.kr/jsp/pyramid/pyramid1.jsp">움직이는<br />인구피라미드</a></li>
						<!--
							<li><a href="javascript:alert('서비스 점검중입니다. 신속히 복구하겠습니다.');">고령화<br />현황보기</a></li>
						-->
						<li><a href="https://analysis.kostat.go.kr/publicsmodel/">고령화<br />현황보기</a></li>
						<li><a href="https://sgis.kostat.go.kr/statbd/family_01.vw">성씨분포</a></li>
						<li><a href="https://sgis.kostat.go.kr/statbd/future_01.vw">지방의<br />변화보기</a></li>
					</ul>
				</dd>
			</dl>
			
			<div class="sideContents">
				<div class="sideBanner">
					<button class="bannerPlayer on" style="background-image:url('/img/ico/play.png'); background-repeat:no-repeat; width:20px; height:20px; position:absolute; z-index:1; bottom:250px; right:10px; cursor:pointer;"></button>
					<ul class="sbList">
						<li id="IMG_3"></li>
						<li id="IMG_2"></li>
						<li id="IMG_1"></li>
						<li id="IMG_0"></li>
					</ul>
				</div>
				
				<div class="sideGuide">
					<h3 title="SGIS+ 소개"><a href="/view/board/sopIntro">SGIS+ 소개</a></h3>
					<ul>
						<li><a href="http://sti.kostat.go.kr/coresti/site/board/StudentBoardViewList.do?gmenu=3&rmenu=03&cmenu=0305&pageIndex=1&level1=&lecture_code=2482&kisu_code=6127&pageUnit=20&searchText=&searchField=lecture_name&select=0" target="_blank">SGIS+ 공개강의실</a></li>
						<li><a href="/view/board/mediaIntro">언론소개자료</a></li>
						<li><a href="javascript:video();">SGIS+ 홍보동영상</a></li>
						<li><a href="/view/newhelp/us_help_10_0.jsp">서비스사용법</a></li>
					</ul>
				</div>
			</div> 
	    </div> 
	    
	    <div id="containerBottomList">
			<div class="cbWrapper">
				<div class="cbwBox" id="board001" >
					<h3>공지사항</h3>
					<!-- <ul>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
					</ul> -->
					<!-- <a href="javascript:void(0)" class="btnMore"><img src="/img/ico/ico_more.png" alt="공지사항 더보기" /></a> -->
				</div>
				<div class="cbwBox" id="board003" >
					<h3>Q&amp;A</h3>
					<!-- <ul>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
					</ul> -->
					<!-- <a href="javascript:void(0)" class="btnMore"><img src="/img/ico/ico_more.png" alt="Q&amp;A 더보기" /></a> -->
				</div>
				<div class="cbwBox" id="board002" >
					<h3>FAQ</h3>
					<!-- <ul>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
					</ul> -->
					<!-- <a href="javascript:void(0)" class="btnMore"><img src="/img/ico/ico_more.png" alt="Q&amp;A 더보기" /></a> -->
				</div>
				<div class="cbwBox" id="shortcut" style="cursor: pointer;">
					<h3>자료제공 및 신청</h3>
					<ul class="type01">
						<!-- <li><a href="javascript:void(0)">알림마당 중 자료제공</a></li> -->
						<!-- <li><a href="/contents/shortcut/shortcut_05.jsp">자료제공목록</a></li>
						<li><a href="/view/member/login_new?returnPage=/contents/shortcut/shortcut_05_03.jsp">자료신청</a></li>
						<li><a href="/view/member/login_new?returnPage=/contents/shortcut/shortcut_05_01.jsp">자료다운로드</a></li> -->
						<li><a href="javascript:void(0)">자료제공목록</a></li>
						<li><a href="javascript:void(0)">자료신청</a></li>
						<li><a href="javascript:void(0)">자료다운로드</a></li> 
					</ul> 
				</div> 
			</div>
			<div class="cbWrapper bot">
				<div class="cbwBox" id="board000" >
					<h3>지역현안 소통지도</h3>
					<ul>
						<!-- <li><a href="javascript:void(0)">1SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li> -->
					</ul>
					<!-- <a href="javascript:void(0)" class="btnMore"><img src="/img/ico/ico_more.png" alt="통계커뮤니티맵 더보기" /></a> -->
				</div>
<!-- 				<div class="cbwBox" id="board004" > -->
<!-- 					<h3>사용자 공유마당</h3> -->
<!-- 					<ul> -->
<!-- 						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>	-->
<!-- 						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li> -->
<!-- 						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li> -->
<!-- 						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li> -->
<!-- 						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li> -->
<!-- 					</ul> -->
<!-- 					<a href="javascript:void(0)" class="btnMore"><img src="/img/ico/ico_more.png" alt="공지사항 더보기" /></a> -->
<!-- 				</div> -->
				
				<div class="cbwBox" id="shareTable" >
					<h3>우수활용사례</h3>
					<ul>
						<!-- <li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li>
						<li><a href="javascript:void(0)">SGIS 오픈플랫폼 시범서비스 실시</a></li> -->
					</ul>
					<!-- <a href="javascript:void(0)" class="btnMore"><img src="/img/ico/ico_more.png" alt="통계커뮤니티맵 더보기" /></a> -->
				</div>
				<div class="cbwBox" id="eduKidz" >
					<h3><a href="/edu/jsp/main.jsp">SGIS 에듀</a></h3>
					<ul class="type03">
						<li><a href="/edu/jsp/sub01.jsp">SGIS에듀가 알려주는 사회변화</a></li>
						<li><a href="/edu/jsp/sub05.jsp">생활에 유익한 SGIS에듀 체험</a></li>
					</ul>
				</div>				
				
				<div class="cbwBox" id="developer" style="cursor: pointer;">
					<h3><a href="/developer/html/home.html" target="_blank">개발지원센터</a></h3>
					<p class="etc">S-OpenAPI를 활용한 통계기반의 <br />웹서비스 제작지원</p>
					<ul class="type02">
						<li><a href="/developer/html/develop/dvp_2.html" target="_blank" title="새창으로 열림">체험하기</a></li>
						<li><a href="/developer/html/openApi/api/data.html" target="_blank" title="새창으로 열림">DATA API</a></li>
						<li><a href="/developer/html/openApi/api/map.html" target="_blank" title="새창으로 열림">지도 API</a></li>
						<!-- <li><a href="/developer/html/develop/dvp.html">체험하기</a></li>
						<li><a href="/developer/html/openApi/api/data.html">DATA API</a></li>
						<li><a href="/developer/html/openApi/api/map.html">지도 API</a></li> --> 
					</ul> 
				</div> 
			</div>
		</div>
	    
	    <!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>
