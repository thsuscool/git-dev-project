<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/common.css" />
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help.css" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help_plus.css" />
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
				<div class="leftTitle">지역현안 소통지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/community_help_1">서비스 개요</a></li>
						<li><a href="/view/newhelp/community_help_4">이용정책</a></li>
						<li><a href="/view/newhelp/community_help_2_1">기본조작 방법</a></li>
						<li><a href="/view/newhelp/community_help_3_1" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/community_help_3_1" class="on">ㆍ소통지도 만들기</a></li>
								<li><a href="/view/newhelp/community_help_3_2">ㆍ소통지도 목록 조회</a></li>
								<li><a href="/view/newhelp/community_help_3_3">ㆍ소통지도 참여/승인</a></li>
								<li><a href="/view/newhelp/community_help_3_4">ㆍ소통지도 의견 등록</a></li>
								<li><a href="/view/newhelp/community_help_3_5">ㆍ소통지도 의견 검색</a></li>
								<li><a href="/view/newhelp/community_help_3_6">ㆍ댓글쓰기 및 신고하기</a></li>
								<li><a href="/view/newhelp/community_help_3_7">ㆍ데이터보드</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>소통지도 만들기</h1>
					
					<h2 class="Type_4">지역현안 소통지도 개설</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_01.png" style="width:700px;" alt="소통지도 만들기">
					</figure>
					<ol>
						<li>1) 대표사진 : 해당 소통지도의 메인사진을 업로드하거나 기본으로 제공하는 샘플 이미지를 선택합니다.</li>
						<li>2) 맵이름 : 해당 소통지도의 타이틀을 입력합니다.</li>
						<li>3) 맵소개 : 해당 소통지도의 주요 설명을 입력합니다.</li>
						<li>4) 지역설정 : 개설할 소통지도의 지역을 시도/시군구/읍면동 단위로 설정합니다.</li>
						<li>5) 기간설정 : 현재날짜를 기준으로 개설 소통지도의 이용기간을 설정합니다.</li>
						<li>6) 의견등록 참여방법 : 개설할 소통지도의 방식을 설정합니다.</li>
						<li>7) 등록아이콘 선택 : 의견정보를 등록할때 등록아이콘을 설정합니다.</li>
						<li>8) 태그 : 해당 소통지도 검색시 알수있는 키워드를 입력합니다.</li>
					</ol>
					
					<h2 class="Type_4">배경지도 만들기</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_02.png" style="width:700px;" alt="배경지도만들기">
					</figure>
					<ol>
						<li>1) 기본통계 : 통계데이터를 기본데이터정보를 설정합니다.</li>
						<li>2) 통계리스트(색지도) : 대화형통계지도에서 저장된 즐겨찾기 통계정보 중에 개설하려는 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 소통지도와 관련된 통계를 선택합니다. 최대 5개까지 등록 가능합니다.</li>
						<li>3) 즐겨찾기 추가 : 추가 버튼을 클릭하여 즐겨찾기 할 수 있는 메뉴를 보여줍니다.</li>
						<li>4) 테마 : 원하는 테마 POI를 최대 4개까지 등록 가능합니다. POI는 집계구 레벨에서 표출이 가능합니다</li>
						<li>5) 나의데이터 : 마이페이지에서 저장한 나의데이터의 POI 1개를 등록 가능합니다.</li>
					</ol>
					
					<h2 class="Type_4">즐겨찾기 추가</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_09.png" style="width:700px" alt="즐겨찾기 추가">
					</figure>
					<ol>
						<li>1) 원하는 즐겨찾기 메뉴를 선택 후 [즐겨찾기 생성] 버튼을 선택합니다</li>
					</ol>
					<h2 class="Type_4">아이콘 만들기</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_08.png" style="width:700px;" alt="아이콘 만들기">
					</figure>
					<ol>
						<li>1) [사용자 정의 아이콘] 버튼을 선택합니다.</li>
						<li>2) [만들기] 버튼을 선택합니다.</li>
						<li>3) 그룹명 입력합니다.</li>
						<li>4) [파일] 버튼을 선택합니다.</li>
						<li>5) 아이콘의 라벨을 지정할 수 있습니다.</li>
						<li>6) 만들기 버튼 선택합니다.</li>
						<li>7) 목록에서 라디오 버튼을 체크합니다.</li>
					</ol>
				</div>
			</div><!--contentsWrap-->
		</div><!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div><!--wrapper-->
</body>
</html>
