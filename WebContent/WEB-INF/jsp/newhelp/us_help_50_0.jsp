<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/common.css" />
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help.css" />
	<title>SGIS 플러스 도움말</title>
</head>
<body>
	<div class="wrapper">
		<!--header start-->
		<jsp:include page="/view/newhelp/helpHeader"></jsp:include>
		<!--header end-->
		<div class="container">
			<!--leftmenu-->
			<div class="leftWrap">
				<div class="leftTitle">홈페이지 이용안내</div>
				<div class="leftmenu">
					<ul>
						<!-- mng_s 20170915_김건민 -->
						<li><a href="/view/newhelp/us_help_10_0">SGIS플러스란?</a></li>
						<!-- mng_e 20170915_김건민 -->
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a></li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a></li>
						<!-- <li><a href="/view/newhelp/us_help_40_0">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0" class="on">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					 <h1>사이트맵</h1><br>
					<h2>통계지리정보서비스의 새로운 소식을 빠르게 전해 드립니다.</h2>
					<br><br>
					<!-- mng_s 20170908_김건민 -->	
					<div class="mapContentsWrap">
						<div class="mapContents ">
							<div class="mapTitle"><img src="/img/newhelp/maplogo1.png" alt="SGIS plus"/><span>소개</span></div>
							<ul>
								<li><a href="/view/board/sopIntro">SGIS 플러스란</a></li>
								<li>서비스 소개
									<ul class="list">
										<li><a href="/view/thematicMap/categoryList">ㆍ통계주제도</a></li>
										<li><a href="/view/map/interactiveMap">ㆍ대화형 통계지도</a></li>
										<li><a href="/view/common/serviceMain">ㆍ활용서비스</a></li>
										<li><a href="/view/common/analMapMain">ㆍ분석지도</a></li>
										<li><a href="/view/board/sopBoardMain">ㆍ알림마당</a></li>
									</ul>
								</li>
								<li><a href="/view/board/expAndNotice#">용어설명</a></li>
							</ul>
						</div>
						<div class="mapContents  mt38">
							<div class="mapTitle">통계주제도</div>
							<ul>
								<li><a href="/view/thematicMap/categoryListHuman">인구와가구</a></li>
								<li><a href="/view/thematicMap/categoryListHouse">주거와교통</a></li>
								<li><a href="/view/thematicMap/categoryListWelfare">복지와문화</a></li>
								<li><a href="/view/thematicMap/categoryListWork">노동과경제</a></li>
								<li><a href="/view/thematicMap/categoryListEnvironment">환경과안전</a></li>
							</ul>
						</div>
					</div>
					<div class="mapContentsWrap  ml26">
						<div class="mapContents">
							<div class="mapTitle">대화형 통계지도</div>
							<ul>
								<li><a href="/view/map/interactiveMap/mainIndexView">총조사 주요지표</a></li>
								<li><a href="/view/map/interactiveMap/populationHouseView">인구주택총조사</a></li>
								<li><a href="/view/map/interactiveMap/3fView">농림어업총조사</a></li>
								<li><a href="/view/map/interactiveMap/companyView">전국사업체조사</a></li>
								<li><a href="/view/map/interactiveMap/kosisView">KOSIS(지역통계)</a></li>
								<li><a href="/view/map/interactiveMap/publicDataView">공공데이터</a></li>
								<li><a href="/view/map/interactiveMap/userDataView">나의 데이터</a></li>
							</ul>
						</div>
						<div class="mapContents mt38 ">
							<div class="mapTitle">활용서비스</div>
							<ul>
								<li><a href="/view/map/policyStaticMap">정책통계지도</a></li>
								<li><a href="/view/technicalBiz/technicalBizMap">기술업종 통계지도</a></li>
								<li><a href="/view/house/houseAnalysisMap">살고싶은우리동네</a></li>
								<li><a href="/view/bizStats/bizStatsMap">우리동네 생활업종</a></li>
								<li><a href="/view/community/intro">지역현안 소통지도</a></li>
								<li><a href="/statexp/index.vw">통계지도체험</a></li>
								<li><a href="/view/gallery/resultGallery">통계갤러리</a></li>
								
								<!-- <li><a href="/jsp/share/useBoardList.jsp">우수활용사례</a></li> -->
							</ul>
						</div>
						<div class="mapContents mt38">
							<div class="mapTitle">분석지도</div>
							<ul>
							<!-- 
								<li><a href="http://sgis.nso.go.kr/project/future/futue_main.asp">지방의 변화보기</a></li>
							 -->
								<li><a href="https://analysis.kostat.go.kr/funny_month/month/sta_month_main.do">월간통계</a></li>
								<li><a href="/jsp/pyramid/pyramid1.jsp">인구피라미드</a></li>
								<li><a href="https://analysis.kostat.go.kr/publicsmodel/">고령화현황보기</a></li>
								<li><a href="https://sgis.kostat.go.kr/statbd/family_01.vw">성씨분포</a></li>
								<!-- mng_s 20170913_김건민 -->
								<li><a href="https://sgis.kostat.go.kr/statbd/future_01.vw">지방의 변화보기</a></li>
								<!-- mng_e 20170913_김건민 -->
							</ul>
						</div>
					</div>
					<div class="mapContentsWrap  ml26">
						<div class="mapContents">
							<div class="mapTitle">알림마당</div>
							<ul>
								<li><a href="/view/board/sopIntro">SGIS 플러스 소개</a></li>
								<li><a href="/view/board/expAndNotice">설명과 공지</a></li>
								<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청</a></li>
								<li><a href="/view/board/qnaAndRequest">질문과 개선요청</a></li>
							</ul>
						</div>
						<div class="mapContents mt38">
							<div class="mapTitle">개발지원센터</div>
							<ul>
								<li><a href="/developer/html/openApi/api/intro.html">OpenAPI소개</a></li>
								<li><a href="/developer/html/openApi/api/map.html">API목록</a></li>
								<li><a href="/developer/html/develop/dvp.html">체험하기</a></li>
								<li><a href="/developer/html/community/qna/list.html">알림마당</a></li>
							</ul>
						</div>
						<div class="mapContents mt38">
							<div class="mapTitle">회원가입</div>
							<ul>
								<li><a href="https://kosis.kr/oneid/cmmn/login/MemberType.do">회원가입</a></li>
								<li><a href="/view/member/IDFind">아이디/패스워드 찾기</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div><!--contentsWrap-->
		</div><!--container-->
		<!-- mng_e 20170908_김건민 -->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom" flush="true"></jsp:include>
		</footer>
		<!--footer-->
	</div><!--wrapper-->
</body>
</html>
