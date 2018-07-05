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
	
	<!-- mng_s 20170810 이경현 -->
	<style>
table {border:1px solid #A09D9D; border-collapse: collapse;}
th, td {border:1px solid #A09D9D;}
</style>
<!-- mng_e 20170810 이경현 -->
	
	
	
	
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
				<div class="leftTitle">대화형 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/in_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/in_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a></li>
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/in_help_60_0">ㆍ사례별 이용법 1</a></li>
								<li><a href="/view/newhelp/so_help_40_0"  class="on">ㆍ사례별 이용법 2</a></li>	
							</ul>
						</li>	
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>사례 : 펜션 창업을 위해 제주도 숙박업 통계를 알고 싶어요.</h1>
					<h2>1. 지역선택 : 지역선택 메뉴를 이용해 제주도로 이동합니다.</h2>
					<img src="/img/newhelp/So_040_03_new.png" style="margin-left: 0px; width:600px; height:300px; border:0px; " alt="지역선택"/>

					<br><br>
					<h2>2. 통계선택 : 산업분류(숙박 및 음식점업>숙박업)를 이용해 숙박업 통계를 검색합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;①"사업체"버튼 선택 → ② 산업중분류(숙박 및 음식점업>숙박업)선택 → ③ "검색조건 담기"버튼 선택 →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;④ 제주도 경계 위로 통계버튼 끌어다 놓기 → ⑤ 숙박업 통계지도 확인 → ⑥ 제주시, 서귀포시 통계 확인 →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑦ 상위지역 대비 그래프 확인</h2>
					<img src="/img/newhelp/So_040_04_new.png" style="margin-left: 0px; width:700px; height:390px; border:0px;"  alt="숙박업통계 조회"/>
					<br><br>
					<h2>[결과]</h2>
					<img src="/img/newhelp/So_040_05_new.png" style="margin-left: 0px; width:700px; border:0px;" alt="숙박업통계 결과"/>


					<br><br>
					<h2>3. 숙박업 중 펜션 유사업종 사업체 통계를 검색합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;①"사업체"버튼 선택 → ② 산업세세분류(숙박 및 음식점업> 숙박업> 숙박시설운영업> 관광숙박시설운영업></h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;기타관광숙박시설운영업)선택 → ③ 산업분류 도움말(i) 확인 → ④ "검색조건 담기"버튼 선택 → </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑤ 제주도 경계 위로 통계버튼 끌어다 놓기 → ⑥ 펜션유사업종 통계지도 확인 →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑦ 제주도의 펜션유사업종 사업체수 확인</h2>
					<img src="/img/newhelp/So_040_06_new.png" style="margin-left: 0px; width:700px; height:400px; border:0px;" alt="숙박업통계 조회"/>
					<h2>[Tip] 기타관광숙박시설운영업 : 단기간의 숙박시설을 운영하는 산업활동</h2>
					<!-- mng_s 20170810 웹접근성 조치 -->
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사업체 산업분류는 <a href="http://kssc.kostat.go.kr" style="font-size:14px; color:#0000ff;"> 통계분류포털(http://kssc.kostat.go.kr)</a>에서 상세한 내용을 확인 하실 수 있습니다.</h2>
					<!-- mng_e 20170810 웹접근성 조치 -->
					<br><br>
					<h2>[결과]</h2>
					<img src="/img/newhelp/So_040_07_new.png" style="margin-left: 0px; width:700px; height:400px; border:0px;" alt="숙박업통계 결과"/>

					<br><br>
					<h2>4. 사용자 데이터(제주도 유명해변 주소)를 통계지도에 올릴 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;○ 제주도 유명 해변주변에 펜션 창업을 위해 관광공사 웹페이지에서 해변 이름과 주소 정보를 찾아 펜션관련</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;사업체 통계지도 위에 올려 사용자 통계지도를 만들 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;①"데이터업로드"버튼 선택 → ②"양식다운로드"버튼 선택 → ③엑셀파일에 해변 명칭과 주소 입력 → </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;④"파일"버튼으로 수정된 엑셀파일 선택 → ⑤ "업로드"버튼 선택 → ⑥"위치정보조회"</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;(주소를 이용해 지도에 위치값 생성) 버튼 선택 → ⑦"위치보기" 버튼 선택 → </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑧통계지도 위에 유명해변(사용자 데이터)의 위치가 매시업 된 지도 확인 → </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑨통계지도의 레벨(읍면동/집계구)을 변경하며 사용자 데이터와 비교</h2>

					<br>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;[사용자 데이터]</h2>
					<!-- mng_s 20170810 이경현 -->
					<div style="height:35px;"></div>
						<table>
						    <colgroup>
							    <col style="width:150px;" />
							    <col style="width:300px;" />
						    </colgroup>
					      <thead>
							<tr style="height:30px; background-color:#dadada;">
							<th scope="col">해변 이름</th>
							<th scope="col">위     치</th>
					      </thead>
					      <tr>
						   <td style="height:30px; text-align:center">검멀레해수욕장</td>
						   <td>제주특별자치도 제주시 우도면 연평리</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">곽지과물해변</td>
						   <td>제주특별자치도 제주시 애월읍 곽지리</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">금능 으뜸원해변</td>
						   <td>제주특별자치도 제주시 한림읍</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">........</td>
						   <td>........</td>
					      </tr>
					   </table>
					   <!-- mng_e 20170810 이경현 -->
					<img src="/img/newhelp/So_040_08_new.png" style="margin-left: 0px; width:420px;" border=0 alt="위치정보 조회"/>
					<img src="/img/newhelp/So_040_12_new.png" style="margin-left: 0px; width:500px; height:300px" border=0 alt="위치정보 조회"/>
					<img src="/img/newhelp/So_040_13_new.png" style="margin-left: 0px; width:500px; height:200px" border=0 alt="위치정보 조회"/>
					<h2>[Tip]위치정보 조회 : 통계청이 가진 주소자료를 가지고 위치를 찾아주며, 위치를 찾지 못해 ‘변환 실패’ 된 경우는</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;사용자가 직접 위치를 지정해 줄 수 있습니다.</h2><br><br>
					<h2>[결과] 집계구 단위로 유명해수욕장 근처의 펜션유사업종 통계 확인합니다.</h2>
					<img src="/img/newhelp/So_040_09_new.png" style="margin-left: 0px; width:700px; height:300px" border=0 alt="결과"/>

					<br><br>
					<h2>5. 펜션(기타 관광숙박시설 운영업) 유사 업종의 사업체 위치를 조회 할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;①"사업체"버튼 선택 → ② 위치표시 설정 → ③산업세세분류(숙박 및 음식점업> </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;숙박업> 숙박시설운영업>관광숙박시설운영업>기타관광숙박시설운영업)선택 →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;④ "검색조건 담기"버튼 선택 → ⑤ wleh 경계 위로 통계버튼 끌어다 놓기(읍면동 이하 축척으로 자동조절) →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑥ 지도위에 통계지도 및 사업체 개별위치 확인 → ⑦ "시계열"버튼 선택 → </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑧ 년도 설정 → 사업체의 위치 및 변화 추이 확인</h2>
					<img src="/img/newhelp/So_040_10_new.png" style="margin-left: 0px; width:700px; height:300px" border=0 alt="결과 확인"/>
					<h2>[결과] 집계구 단위로 유명해수욕장 근처의 펜션유사업종 통계 확인합니다.</h2>
					<img src="/img/newhelp/So_040_11_new.png" style="margin-left: 0px; width:700px; height:300px" border=0 alt="결과"/>
					<br><br>
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
