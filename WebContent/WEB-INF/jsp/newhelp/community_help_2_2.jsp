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
				<div class="leftTitle">지역현황 소통지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/community_help_1">서비스 개요</a></li>
						<li><a href="/view/newhelp/community_help_4">이용정책</a></li>
						<li><a href="/view/newhelp/community_help_2_1" class="on">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/community_help_2_1">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/community_help_2_2" class="on">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/community_help_2_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/community_help_2_5">ㆍ통계버튼 목록 관리</a></li>
							</ul>
						</li>
						<li><a href="/view/newhelp/community_help_3_1">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>지도창 조작 방법</h1>
					
					<ul class="Cont_List">
						<li>지도이동은 마우스 드래그 방식으로 동작하고, 지도확대 및 축소는 마우스 휠 조작 또는 지도레벨 컨트롤 조작에 의해서 동작합니다.</li>
						<li>지도 레벨 컨트롤을 이용해서 1단계 지도 레벨 확대/축소를 할 수 있습니다.</li>
					</ul>
					<figure>
					<img src="/img/newhelp/img_community_2_06.png" alt="지도 이동">
					<figcaption>[지도 이동]</figcaption>
					</figure><br>

					<h2 class="Type_4">행정 구역으로 이동 방법</h2>
					<ul class="Cont_List">
						<li>시도, 시군구, 읍면동 각 단계별 행정구역을 선택해서 행정구역 위치조회를 할 수 있습니다.</li>
						<li>지도 이동 시 지도화면의 중심점 위치에 해당하는 행정구역 정보가 설정됩니다.</li>
					</ul>
					<figure>
					<img src="/img/newhelp/img_community_2_07.png" alt="행정구역 이동">
					<figcaption>[행정구역 이동]</figcaption>
					</figure><br>
					<h2 class="Type_4">데이터시각화 설정</h2>
					<ul class="Cont_List">
						<li>통계 조회 시 지도화면에 표출되는 통계정보에 대해서 해당 범례를 사용자가 직접 설정할 수 있습니다.</li>
						<li>데이터시각화창에서 “설정“ 버튼을 누르면 데이터시각화 설정창이 표출되고, 데이터시각화 설정창에서 표출색상, 분류방법 등을 수정해서 적용할 수 있습니다.</li>
					</ul>
					<figure><img src="/img/newhelp/img_community_2_08.png"	style="width:700px;" alt="데이터시각화 설정"></figure>
					
					 
					
					<h2 class="Type_4">SHP 파일 다운로드<img src="/img/newhelp/img_community_2_09.png" alt="SHP 파일 다운로드"></h2>
					<ul class="Cont_List">
						<li>해당 소통지도의 의견을 dbf,fix,prj,qix,shp,shx 파일로 내려받습니다.</li>
					</ul>
					
					<h2 class="Type_4">지도 확대<img src="/img/newhelp/img_community_2_10.png" alt="지도 확대"></h2>
					<ul class="Cont_List">
						<li>지도가 확대되어 상단메뉴가 사라지고 보다 넓은 지도 화면으로 이용할 수 있습니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_community_2_13.png" style="width:700px;" alt="지도 확대">
					</figure>
					
					<h2 class="Type_4">지도 초기화<img src="/img/newhelp/img_community_2_11.png" alt="지도초기화"></h2>
					<ul class="Cont_List">
						<li>지도화면에 표출되고 있는 통계정보를 모두 삭제하고, 초기화하는 기능입니다.</li>
						<li>초기화 버튼을 누르면 지도화면의 통계정보가 삭제되고,	요약 데이터창,	상세데이터창, 범례창 등이 모두 삭제됩니다.</li>
						<li>통계정보가 모두 삭제되면 초기의 기본 지도화면만 표출되는 상태로 변경됩니다.</li>
					</ul>
					
					
					<h2 class="Type_4">소통지도 보고서<img src="/img/newhelp/img_community_2_12.png" alt="소통지도 보고서"></h2>
					<ul class="Cont_List">
						<li>해당 소통지도의 제목과 장소, 시간 등 정보와 등록되어있는 다양한 의견들을 보고서 형식으로 한 눈에 확인이 가능하고 인쇄 또한 가능합니다. </li>
						<li>소통지도에서 사용한 범례와 등록자료에 대한 사용한 아이콘들을 확인할 수 있습니다.</li>
					</ul>
					
					<figure>
					<img src="/img/newhelp/img_community_2_15.png" alt="소통지도 보고서">
					</figure>
					<ol>
						<li>1) 보고서 제목을 수정할 수 있습니다. </li>
						<li>2) 해당 소통지도의 통계리스트와 지역, 보고서 작성일자가 함께 표시됩니다.</li>
						<li>3) 선택했던 범례를 표시합니다. </li>
						<li>4) 등록된 의견과 의견에 달린 댓글, 신고된 의견들, 또한 해당 의견에 사용된 아이콘들이 그래프로 표시됩니다.</li>
						<li>5) 메모를 사용하여 참조 글을 작성할 수 있습니다.</li>
						<li>6) 해당 의견들과 신고된 의견, 의견에 달린 댓글들의 자세한 수치를 표시합니다.</li>
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
