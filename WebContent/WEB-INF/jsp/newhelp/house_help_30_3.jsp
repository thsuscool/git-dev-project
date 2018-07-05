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
				<div class="leftTitle">살고싶은 우리동네</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/house_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/house_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/house_help_30_0" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/house_help_30_0">ㆍ추천지역 찾기</a></li>
								<li><a href="/view/newhelp/house_help_30_1">ㆍ주거현황 보기</a></li>
								<li><a href="/view/newhelp/house_help_30_3" class="on">ㆍ간편동네 찾기</a></li>
								<li><a href="/view/newhelp/house_help_30_2">ㆍ지표내용</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1 style="float: left;">간편동네 찾기 </h1><img src="/img/newhelp/img_house_5_00.png" style="width:90px;margin-top: 0px;" alt="간편동네 찾기" />
					<h2 class="Type_3">1) 관심사 선택 : 관심사와 부가정보를 선택합니다.</h2>

					<ul class="Cont_List">
						<li>자신의 성별, 연령, 관심 동네, 관심거주지를 설정합니다.</li>
						<li>성별, 연령을 선택 시 선택한 성별과 연령이 많은 곳을 찾아줍니다.
							<ul>
								<li>남자(혹은 여자)를 선택하시면 남자(혹은 여자)가 많은 지역을 찾아줍니다.</li>
							</ul>
						</li>
						<li>관심거주지는 찾아보고 싶은, 이사 하고자 하는 지역입니다.
							<ul>
								<li>이사 하고 싶은 지역을 관심거주지로 설정 하시면, 설정된 지역 내에서 이상형 지역을 찾습니다.</li>
								<li>관심거주지를 전국으로 설정하시면, 전국에 대한 모든 읍면동 중에서 추천 지역을 찾습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_5_02.png" alt="관심사/부가정보 선택">
						<figcaption>[관심사/부가정보 선택]</figcaption>
					</figure>

					<h2 class="Type_3">2) 우선순위 설정 : 설정한 관심항목을 통해 추천된 지표들의 우선순위를 설정합니다.</h2>
					<ul class="Cont_List">
						<li>앞서 설정한 관심항목을 통해 추천된 지표들을 관심이 높은 순으로 지표를 하단 우선순위 항목 퍼즐에 드래그 합니다.
							<ul>
								<li>더블클릭으로도 순차적으로 우선순위를 설정할 수 있습니다.</li>
								<li>최대 여섯개까지 설정할 수 있습니다.</li>
								<li>이미 놓여진 지표위에 다른 지표를 드래그한다면 새롭게 드래그 된 지표가 놓여집니다.</li>
							</ul>
						</li>
						<li>자신이 선택한 지표의 우선순위를 정할 수 있습니다
							<ul>
								<li>예를들면 문화체육시설 수가 1번에 위치해있다면 문화체육시설 수가 많은 지역을 우선하여 검색합니다.</li>
								<li>퍼즐에 놓여진 지표의 오른쪽 상단의 'x'표시로 놓여진 지표를 삭제할 수 있습니다.</li>
							</ul>
						</li>
						<li>이전 버튼을 통해 관심항목을 새롭게 설정할 수 있습니다.</li>
						<li>우선순위 설정 후, 간편동네찾기 버튼을 누르시면, 추천된 지역을 보여줍니다.
							<ul>
								<li>추천된 10개 지역을 보실 수 있으며, 같은 순위일 때는 행정구역 순서대로 나타납니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_5_03.png" alt="우선순위 설정">
						<figcaption>[우선순위 설정]</figcaption>
					</figure>
					<h2 class="Type_3">3) 추천지역 검색결과 조회 : 추천된 지역을 보실 수 있습니다.</h2>

					<ul class="Cont_List">
						<li>추천된 지역은 색상으로 표시되며, 추천지역 리스트로 보실 수도 있습니다.
							<ul>
								<li>추천지역 리스트에 추천된 지역을 클릭하시면 추천된 지역으로 이동합니다.</li>
								<li>추천된 지역의 색상지도를 클릭하시면 추천된 지역의 상세정보를 보실 수 있습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_5_04.png" alt="간편동네 검색결과 조회">
						<figcaption>[간편동네 검색결과 조회]</figcaption>
					</figure>

					<h2 class="Type_3">4) 추천지역 정보 조회 : 추천된 간편동네에 대한 다양한 정보를 보실 수 있습니다.</h2>

					<ul class="Cont_List">
						<li>추천된 간편동네에 대한 정보를 지도와 우측의 데이터보드에서 보실 수 있습니다.
							<ul>
								<li>
									지표별 종합현황 : 자연, 주택, 지역인구 등 32종의 주거지표 현황을 보실 수 있습니다.<br>
									<span style="font-size: 12px;padding-left: 107px;">(※ 방사형 그래프의 각 지표를 클릭하면 하단에 지표별 종합현황이 그래프로 표기 됩니다.)</span>
								</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_5_05.png" alt="간편동네 정보 조회 – 지표별 종합현황">
						<figcaption>[간편동네 정보 조회 – 지표별 종합현황]</figcaption>
					</figure>
					<ul class="Cont_List">
						<li style="background:none;">
							<ul>
								<li>소지역 정보 : 인구 현황, 가구 현황, 사업체 등 집계구별 소지역 정보를 조회하실 수 있습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_5_06.png" alt="간편동네 정보 조회 – 소지역 정보">
						<figcaption>[간편동네 정보 조회 – 소지역 정보]</figcaption>
					</figure>

				</div>
			</div>
			<!--contentsWrap-->
		</div>
		<!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div>
	<!--wrapper-->
</body>

</html>