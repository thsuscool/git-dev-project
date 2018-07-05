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
								<li><a href="/view/newhelp/house_help_30_0" class="on">ㆍ추천지역 찾기</a></li>
								<li><a href="/view/newhelp/house_help_30_1">ㆍ주거현황 보기</a></li>
								<li><a href="/view/newhelp/house_help_30_3">ㆍ간편동네 찾기</a></li>
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
					<h1 style="float: left;">추천지역 찾기 </h1><img src="/img/newhelp/img_house_3_00.png" alt="추천지역찾기" style="width:90px;margin-top: 0px;">
					<h2 class="Type_3">1) 지역 선택 : 기준지역과 관심지역을 설정합니다.</h2>

					<ul class="Cont_List">
						<li>기준지역과 관심지역을 시도, 시군구까지 설정할 수 있습니다.</li>
						<li>기준지역은 지표의 기준, 비교의 대상이 되는 지역입니다.
							<ul>
								<li>현재 살고있는 지역을 입력하시면, 현 거주지에 대한 지표를 상, 중, 하로 보실 수 있습니다.</li>
								<li>기준지역을 전국으로 설정하시면, 전국 평균으로 지역을 검색하실 수 있습니다.</li>
							</ul>
						</li>
						<li>관심지역은 찾아보고 싶은, 이사 하고자 하는 지역입니다.
							<ul>
								<li>이사 하고 싶은 지역을 관심지역으로 설정 하시면, 설정된 지역 내에서 추천 지역을 찾습니다.</li>
								<li>관심지역을 전국으로 설정하시면, 전국에 대한 모든 읍면동 중에서 추천 지역을 찾습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_3_01.png" style="margin-left: 0px;" alt="지역 선택">
						<figcaption>[지역 선택]</figcaption>
					</figure>
					
					<h2 class="Type_3">2) 라이프스타일 별 지표 설정 : 인생관이나 생활태도에 맞는 지표를 선택하실 수  있습니다.</h2>
					<ul class="Cont_List">
						<li>7개의 라이프 스타일 중에서 자신에게 맞는 라이프스타일을 선택하실 수 있습니다.
							<ul>
								<li>각각의 이미지에 마우스를 올려보거나 클릭하시면, 라이프 별 설명글을 보실 수 있습니다.</li>
							</ul>
						</li>
						<li>해당 라이프 별로 설정되어 있는 정렬기준과 가중치(상/중/하)를 보실 수 있습니다.
							<ul>
								<li>자신의 라이프스타일에 맞춰서 정렬기준과 중요도를 변경하실 수 있습니다.</li>
								<li>또한, 관심있는 지표를 추가하거나 변경하실 수 있습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_3_06.png" style="margin-left: 0px;" alt="라이프스타일 별 지표 설정">
						<figcaption>[라이프스타일 별 지표 설정]</figcaption>
					</figure>

					<h2 class="Type_3">3) 지표 설정 : 기준지역과 관심지역을 설정합니다.</h2>
					<ul class="Cont_List">
						<li>33개 지표 중에서, 최대 9개의 관심 지표를 선택하실 수 있습니다.
							<ul>
								<li>각각의 지표에 마우스를 올려보시면, 지표 별 설명글을 보실 수 있습니다.</li>
							</ul>
						</li>
						<li>해당 지표 별로 설정되어 있는 정렬기준과 가중치(상/중/하)를 보실 수 있습니다.
							<ul>
								<li>예를들면 녹지비율을 높은지역으로 찾지 않고 낮은지역으로 추천지역을 검색할수 있습니다.</li>
								<li>예를들면 은퇴를 앞둔 노부부의 경우 녹지비율을  ‘상’, 면적당 아파트가격을 ‘하’로 중요도를 선택 합니다.</li>
							</ul>
						</li>
						<li>지표 설정 후, 추천지역찾기 버튼을 누르시면, 추천된 지역을 보여줍니다.
							<ul>
								<li>추천된 10개 지역을 보실 수 있으며, 같은 순위일 때는 행정구역 순서대로 나타납니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_3_02.png" style="margin-left: 0px;" alt="지표 설정">
						<figcaption>[지표 설정]</figcaption>
					</figure>
					
					<h2 class="Type_3">4) 추천지역 검색결과 조회 : 추천된 지역을 보실 수 있습니다.</h2>
					<ul class="Cont_List">
						<li>추천된 지역은 색상으로 표시되며, 추천지역 리스트로 보실 수도 있습니다.
							<ul>
								<li>추천지역 리스트에 추천된 지역을 클릭하시면 추천된 지역으로 이동합니다.</li>
								<li>추천된 지역의 색상지도를 클릭하시면 추천된 지역의 상세정보를 보실 수 있습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_3_03.png" style="margin-left: 0px;" alt="추천지역 검색결과 조회">
						<figcaption>[추천지역 검색결과 조회]</figcaption>
					</figure>

					<h2 class="Type_3">5) 추천지역 정보 조회 : 추천된 지역의 다양한 정보를 보실 수 있습니다.</h2>

					<ul class="Cont_List">
						<li>추천된 지역의 정보를 지도와 우측의 데이터보드에서 보실 수 있습니다.
							<ul>
								<li>
									지표별 종합현황 : 자연, 주택, 지역인구 등 35종의 주거지표 현황을 보실 수 있습니다.<br>
									<span style="font-size: 12px;padding-left: 107px;">(※ 방사형 그래프의 각 지표를 클릭하면 하단에 지표별 종합현황이 그래프로 표기 됩니다.)</span>
								</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_3_04.png" style="margin-left: 0px;" alt="추천지역 정보 조회 – 지표별 종합현황">
						<figcaption>[추천지역 정보 조회 – 지표별 종합현황]</figcaption>
					</figure>
					<ul class="Cont_List">
						<li style="background:none;">
							<ul>
								<li>소지역 정보 : 인구 현황, 가구 현황, 사업체 등 집계구별 소지역 정보를 조회하실 수 있습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_3_05.png" style="margin-left: 0px;" alt="추천지역 정보 조회 – 소지역 정보">
						<figcaption>[추천지역 정보 조회 – 소지역 정보]</figcaption>
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