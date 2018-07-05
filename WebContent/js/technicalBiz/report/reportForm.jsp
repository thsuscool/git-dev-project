<!-- 
* 검색창에 입력한 단어와 연관되는 데이터를 보여주는 HTML입니다.
* 
* history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
//-->
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>보고서</title>
	
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	<link href="/css/reportForm.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/common.css">
	<link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	<link href="/css/map/technicalBiz.css" rel="stylesheet" type="text/css" />
	
	<link href="/css/statsPotal/statsPotal.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/js/plugins/jquery-1.11.1.min.js"></script>
	<script src="/js/plugins/btoa.js"></script>
	<script type="text/javascript" src="/js/plugins/highcharts/highcharts.js"></script>
	<script type="text/javascript" src="/js/plugins/jsPDF/jspdf.min.js"></script>
	<script type="text/javascript" src="/js/plugins/imageCapture/rgbcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/imageCapture/canvg.js"></script> <!-- 2017.03.13 pdf저장 이슈  -->
    <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.js"></script>
	<script src="/js/plugins/highcharts/modules/exporting.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	<script type="text/javascript" src="/js/common/common.js"></script>	    
	<script type="text/javascript" src="/js/common/map.js"></script>
	<script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
	<script type="text/javascript" src="/js/technicalBiz/report/reportForm.js"></script>
	<script type="text/javascript" src="/js/technicalBiz/report/reportFormEvent.js"></script>
	<style type="text/css" media="print">@page{size:auto;margin:10mm;}body{margin:0;}</style> 
	
	<style type="text/css">
		#AlertMessage {
			width : 400px;
			overflow : hidden;
			border : 3px solid #656972;
			barder-radius : 5px;
			padding : 20px 20px 20px 70px;
			font-size : 20px;
			color : #333333;
			box-shadow : 1px 1px 3px #cccccc;
			word-break : break-all;
			position : absolute;
			top : 45%;
			left : 20%;
		}
	</style>
	
	<script>
		var beforePrint = function() {
		    console.log("1");
		};
		var afterPrint = function() {
		    console.log("2");
		};
		
		if (window.matchMedia) {
		    var mediaQueryList = window.matchMedia('print');
		    mediaQueryList.addListener(function(mql) {
		        if (mql.matches) {
		            beforePrint();
		        } else {
		            afterPrint();
		        }
		    });
		}
		
		window.onbeforeprint = beforePrint;
		window.onafterprint = afterPrint;
	</script>
	
</head>
<body>
	<div id="mask" style="background:#ffffff;z-index:10000;width:100%;height:100%;">
		<div id="AlertMessage">보고서 생성중입니다. 잠시만 기다려주세요.</div>
	</div>
	<div id="wrap">
		<div class="printArea">
			<div id="technicalBizTopDiv"> <!-- 기술업종통계 -->
			 	<div class="pntPage">
			 		<h1 class="pntHeader"><img src="/img/common/logo.gif" alt="SGIS 오픈플랫폼"></h1>	 
			 		<div class="pntBtn"><a href="javascript:$reportFormEvent.UI.reportPdfDown();" id="pdfdown">PDF</a><a href="javascript:$reportFormEvent.UI.reportPrint();">인쇄</a><a href="javascript:$reportFormEvent.UI.reportClose();">닫기</a></div>
			 		<p class="pntURI">통계지리정보서비스 (https://sgis.kostat.go.kr)</p> 
			 		
			 		<!-- 2017.03.13 pdf저장 이슈 -->
			 		<!-- START  -->
			 		<div class="pntNewCenter" style="margin-top:10px;"><h3 style="height:40px;line-height:40px;">보고서명</h3><div style="width:677px;height:40px;float:left;"><textarea cols="60" rows="1" id="reportTitle"></textarea></div></div>
			 		<div class="pntNewCenter"><h3>검색조건</h3><div id="searchItem" class="pntNewRight"></div></div>
			 		<div class="pntNewCenter"><h3>작성일자</h3><div id="date" class="pntNewRight"></div></div>
			 		<div class="pntNewCenter"><h3>출처</h3><div id="origin" class="pntNewRight"></div></div>
			 		
			 		<div id="mainMapDiv_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('mainMapDiv');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				 	<div id="pntLegend_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('pntLegend');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				 	<div id="mainMapDiv" class="pntCenter" style="position:relative;">
				 		<div class="pntNewCenterTitle"><h3>지도 시각화 화면</h3></div>
				 		<div class="pntCloseBtn"><a href="javascript:$reportForm.ui.onOffDiv('mainMapDiv');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
				 		<div id="pntLegend" style="width:220px;height:270px;border-right:1px solid #ccc;position:absolute; top:240px;z-index:10;background-color:#fff;">
				 			<h3 class="pntLegendTitle" id="legendTitle"></h3>
				 			<div class="pntCloseBtn"><a href="javascript:$reportForm.ui.onOffDiv('pntLegend');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					 		<div id="legend" class="pntLegend remarkbox" style="display: block; position: relative;width:215px;"></div>
				 		</div>
				 		<div style="width:798px;height:472px;float:right;">
				 			<div class="pntMap">
				 				<img id="reportMapDiv" src="">
				 				<img  id="report_captureImage" style="width:798px;height:472px;display:none;"></img>
				 			</div>
				 		</div>
				 	</div>
					<!-- END -->
			 		
			 		<!-- 2017.03.13 pdf저장 이슈 -->
			 		<!-- START  -->
			 		<div id="summayDiv_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('summayDiv');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
			 		<div id="summayDiv" class="pntCenter" style="position:relative;">
			 			<div class="pntCloseBtn"><a href="javascript:$reportForm.ui.onOffDiv('summayDiv');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
			 			<div class="pntLeft" id="summaryLegendArea">
				 			 <h3 class="legendTitle">범례</h3>
				 			 <div id="legend" class="pntLegend remarkbox" style="display: block;position: relative;width:215px;"></div>
			 			</div>
					 	<div class="pntRight mt60" id="summaryChartArea">
					 		<h3 class="chartTitle">그래프</h3> 
					 		<div class="pntChart chartContent" style="margin: 10px auto; width: 530px;"></div>
					 	</div>
			 		</div>
			 		<!-- END  -->
			 		
		 			<div id="firstChartDiv_show" class="pntShowBtn">
			 			<a href="javascript:$reportForm.ui.onOffDiv('firstChartDiv');">
			 				<img src='/img/im/btn_plus.png' alt='보이기' />
			 			</a>
		 			</div>
			 		<div class="pntPage" id="firstChartDiv" style="display: none;">
						<div class="pntCenter">
							<h3>
								<span class="chartTitle"></span>
								<a class="fr" href="javascript:$reportForm.ui.onOffDiv('firstChartDiv');" style="float:right;padding: 5px 5px;">
				 			 		<img src='/img/um/btn_closel01.png' alt='숨기기' />
			 			 		</a>
							</h3>
							<div id="firstChart" class="chartContent" style="margin: 10px auto; width: 530px;"></div> <!-- 2017.03.13 pdf저장 이슈 -->
						</div>
			 		</div>
			 		
			 		<div id="secondChartDiv_show" class="pntShowBtn">
			 			<a href="javascript:$reportForm.ui.onOffDiv('secondChartDiv');">
			 				<img src='/img/im/btn_plus.png' alt='보이기' />
			 			</a>
		 			</div>
			 		<div class="pntPage" id="secondChartDiv" style="display: none;">
						<div class="pntCenter">
							<h3>
								<span class="chartTitle"></span>
								<a href="javascript:$reportForm.ui.onOffDiv('secondChartDiv');" style="float:right;padding: 5px 5px;">
				 			 		<img src='/img/um/btn_closel01.png' alt='숨기기' />
			 			 		</a>
							</h3>
							<div class="chartContent" style="margin: 10px auto; width: 530px;"></div>
						</div>
			 		</div>
			 		
			 		<div id="3rdChartDiv_show" class="pntShowBtn">
			 			<a href="javascript:$reportForm.ui.onOffDiv('3rdChartDiv');">
			 				<img src='/img/im/btn_plus.png' alt='보이기' />
			 			</a>
		 			</div>
			 		<div class="pntPage" id="3rdChartDiv" style="display: none;">
						<div class="pntCenter">
							<h3>
								<span class="chartTitle"></span>
								<a href="javascript:$reportForm.ui.onOffDiv('3rdChartDiv');" style="float:right;padding: 5px 5px;">
				 			 		<img src='/img/um/btn_closel01.png' alt='숨기기' />
			 			 		</a>
							</h3>
							<div class="chartContent" style="margin: 10px auto; width: 530px;"></div>
						</div>
			 		</div>
			 		
			 		<div id="4thChartDiv_show" class="pntShowBtn">
			 			<a href="javascript:$reportForm.ui.onOffDiv('4thChartDiv');">
			 				<img src='/img/im/btn_plus.png' alt='보이기' />
			 			</a>
		 			</div>
			 		<div class="pntPage" id="4thChartDiv" style="display: none;">
						<div class="pntCenter">
							<h3>
								<span class="chartTitle"></span>
								<a href="javascript:$reportForm.ui.onOffDiv('4thChartDiv');" style="float:right;padding: 5px 5px;">
				 			 		<img src='/img/um/btn_closel01.png' alt='숨기기' />
			 			 		</a>
							</h3>
							<div class="chartContent" style="margin: 10px auto; width: 530px;"></div>
						</div>
			 		</div>
			 		
			 		<div id="5thChartDiv_show" class="pntShowBtn">
			 			<a href="javascript:$reportForm.ui.onOffDiv('5thChartDiv');">
			 				<img src='/img/im/btn_plus.png' alt='보이기' />
			 			</a>
		 			</div>
			 		<div class="pntPage" id="5thChartDiv" style="display: none;">
						<div class="pntCenter">
							<h3>
								<span class="chartTitle"></span>
								<a href="javascript:$reportForm.ui.onOffDiv('5thChartDiv');" style="float:right;padding: 5px 5px;">
				 			 		<img src='/img/um/btn_closel01.png' alt='숨기기' />
			 			 		</a>
							</h3>
							<div class="chartContent" style="margin: 10px auto; width: 530px;"></div>
						</div>
			 		</div>
			 		
			 		<!-- 2017.03.13 pdf저장 이슈 -->
			 		<div id="6thChartDiv_show" class="pntShowBtn">
			 			<a href="javascript:$reportForm.ui.onOffDiv('6thChartDiv');">
			 				<img src='/img/im/btn_plus.png' alt='보이기' />
			 			</a>
		 			</div>
			 		<div class="pntPage" id="6thChartDiv" style="display: none;">
						<div class="pntCenter">
							<h3>
								<span class="chartTitle"></span>
								<a href="javascript:$reportForm.ui.onOffDiv('6thChartDiv');" style="float:right;padding: 5px 5px;">
				 			 		<img src='/img/um/btn_closel01.png' alt='숨기기' />
			 			 		</a>
							</h3>
							<div class="chartContent" style="margin: 10px auto; width: 530px;"></div>
						</div>
			 		</div>
			 		
			 		
				</div>

			 	<div class="pntPage">
			 		<div id="memoDiv_show" class="pntShowBtn">
			 			<a href="javascript:$reportForm.ui.onOffDiv('memoDiv');">
			 				<img src='/img/im/btn_plus.png' alt='보이기' />
			 			</a>
		 			</div>
			 		<div class="pntCenter" id="memoDiv" style="position:relative;">
			 			 <h3>메모</h3> 
			 			 <textarea id="memo"></textarea>
			 			 <div class="pntCloseBtn">
			 			 	<a href="javascript:$reportForm.ui.onOffDiv('memoDiv');">
			 			 		<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 			 		</a>
	 			 		</div>
			 		</div>
			 	</div>
			</div>
		 		
		 	<div class="pntPage">
		 		<div id="sigunguClassGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('sigunguClassGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="sigunguClassGrid" style="display:none;">
		 			<div class="pntDataBox fc" id="gridArea" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('sigunguClassGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
				 		<table class="pntTable" summary="항목,비율(%),현재지역,상위지역" >
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="sClassNm" colspan="7"></th></tr>
								<tr>
									<th>분류</th>
									<th>사업체 수</th>
									<th>사업체 비율</th>
									<th>사업체 증감</th>
									<th>종사자 수</th>
									<th>종사자 비율</th>
									<th>종사자 증감</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>

				<!-- 시도특성정보 -->
				<div id="sidoClassGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('sidoClassGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="sidoClassGrid"" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('sidoClassGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
						<table class="pntTable" summary="항목,비율(%),현재지역,상위지역"">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="sClassNm" colspan="7"></th></tr>
								<tr>
									<th>지역</th>
									<th>사업체 수</th>
									<th>사업체 비율</th>
									<th>사업체 증감</th>
									<th>종사자 수</th>
									<th>종사자 비율</th>
									<th>종사자 증감</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
				
				<!-- 시군구순위정보 -->
				<div id="sigunguRankGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('sigunguRankGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="sigunguRankGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('sigunguRankGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
	 					<table class="pntTable" summary="항목,비율(%),현재지역,상위지역">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="sidoNm" colspan="6"></th></tr>
								<tr>
									<th>분류</th>
									<th>사업체 수</th>
									<th>업종 비율</th>
									<th>거주인구</th>
									<th>업종 종사자 수</th>
									<th>평균 종사자 수</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
	 					
				<!-- 밀집도정보 -->
				<div id="densityCombinedGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('densityCombinedGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="densityCombinedGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('densityCombinedGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
	 					<table class="pntTable" summary="항목,비율(%),현재지역,상위지역">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="combinedNm" colspan="2">시계열별 데이터</th></tr>
								<tr>
									<th>기준년도</th>
									<th>사업체 수 <span id="sClassNm"></span></th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
				
				<!-- 조건별 지역 찾기 -->
				<div id="searchOptionGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('searchOptionGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="searchOptionGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('searchOptionGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
	 					<div class="pntTable" id = "searchOptionDiv">
	 					
	 					</div>
				 		<!-- <table class="pntTable" summary = "">
				 		
				 		</table> -->
				 	</div>
				</div>
				<!-- 조건별 지역 검색 -->
				<div id="searchData_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('searchData');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="searchData" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('searchData');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
				 		<table class="pntTable" summary = "">
				 		
				 		</table>
				 	</div>
				</div>
				
								
				<!-- 시도특성정보 -->
				<div id="sidoFeatureGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('sidoFeatureGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="sidoFeatureGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('sidoFeatureGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
						<table class="pntTable" summary="항목,비율(%),현재지역,상위지역">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="sidoFeatureNm" colspan="5">기술업종 분포현황</th></tr>
								<tr>
									<th rowspan=2>업종</th>
									<th colspan=2><span class="sidoNm">지역명</span></th>
									<th colspan=2>전국</th>
								</tr>
								<tr>
									<th>사업체 비율(%)</th>
									<th>사업체 지수</th>
									<th>사업체 비율(%)</th>
									<th>사업체 지수</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
				
				<!-- 시도특성방사형차트정보 -->
				<div id="sidoFeatureDetailGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('sidoFeatureDetailGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="sidoFeatureDetailGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('sidoFeatureDetailGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
						<table class="pntTable" summary="항목,비율(%),현재지역,상위지역">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="sidoFeatureDetailNm" colspan="7">업종별 특성정보</th></tr>
								<tr>
									<th rowspan=2>업종</th>
									<th colspan=6><span class="sidoNm">지역명</span> 지표별 지수 (전국평균: 5)</th>
								</tr>
								<tr>
									<th>사업체 수</th>
									<th>세업체 비율</th>
									<th>사업체 증감률</th>
									<th>종사자 수</th>
									<th>종사자 비율</th>
									<th>종사자 증감률</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
				
				<!-- 경제총조사현황  -->
				<div id="sidoEconomyGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('sidoEconomyGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData"  id="sidoEconomyGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('sidoEconomyGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
	 					<table class="pntTable" summary="항목,비율(%),현재지역,상위지역">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="combinedNm" colspan="5">경제총조사 현황 (단위 : 백 만)</th></tr>
								<tr>
									<th>업종</th>
									<th>매출액</th>
									<th>인건비</th>
									<th>임차료</th>
									<th>영업이익</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
				
				<!-- 지원시설정보 -->
				<div id="supplyRegionGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('supplyRegionGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData"  id="supplyRegionGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('supplyRegionGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
						<table class="pntTable" summary="항목,비율(%),현재지역,상위지역" ">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="30%">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="combinedNm" colspan="3">전국시도별현황</th></tr>
								<tr>
									<th>지역</th>
									<th>사업체수</th>
									<th>종사자수</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				 </div>
				
				<!-- 산업단지정보 -->
		 		<div id="industryRegionGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('industryRegionGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="industryRegionGrid" style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('industryRegionGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
	 					<table class="pntTable" summary="항목,비율(%),현재지역,상위지역">
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="30%">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="combinedNm" colspan="3">전국시도별현황</th></tr>
								<tr>
									<th>지역</th>
									<th>사업체수</th>
									<th>산업단지수</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
				
			</div>
			
			<div class="pntPage">
				<div id="gridRegionInfo_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('gridRegionInfo');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData" id="gridRegionInfo" style="display:none;">
		 			<div class="pntDataBox fc"  style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('gridRegionInfo');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="지역종합정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="80" />
				 				<col width="150" />
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=6>지역종합 통계 정보</th>
								</tr>
								<tr>
									<th scope="col" rowspan=2>년도</th>	
						 			<th scope="col" rowspan=2>기술업종</th>
						 			<th scope="col" colspan=2>상위지역</th>	
						 			<th scope="col" colspan=2>현재지역</th>
								</tr>
				 	 			<tr>
						 			<th scope="col">사업체수</th>	
						 			<th scope="col">사업체비율</th>
						 			<th scope="col">사업체수</th>	
						 			<th scope="col">사업체비율</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
				
				<div id="variationLineInfo_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('variationLineInfo');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData" id="variationLineInfo"  style="display:none;">
		 			<div class="pntDataBox fc" style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('variationLineInfo');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="지역종합정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="30%" />
				 				<col width="" />
				 				<col width="" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=3>산업단지 내 기술업종 증감현황</th>
								</tr>
				 	 			<tr>
				 	 				<th scope="col">년도</th>	
						 			<th scope="col">사업체수</th>
						 			<th scope="col">종사자수</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
				
				<div id="distributionInfo_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('distributionInfo');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData"  id="distributionInfo"  style="display:none;">
		 			<div class="pntDataBox fc" id="gridMajorInfo" style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('distributionInfo');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="지역종합정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=7>산업단지 내 기술업종 분포현황</th>
								</tr>
				 	 			<tr>
				 	 				<th scope="col">첨단기술</th>	
						 			<th scope="col">고기술</th>
						 			<th scope="col">중기술</th>
						 			<th scope="col">저기술</th>
						 			<th scope="col">창의/디지털</th>
						 			<th scope="col">ICT</th>
						 			<th scope="col">전문서비스</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
				
				<div id="detailStateBarInfo_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('detailStateBarInfo');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData"  id="detailStateBarInfo"  style="display:none;">
		 			<div class="pntDataBox fc" id="gridMajorInfo" style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('detailStateBarInfo');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="지역종합정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=3>산업단지 내 기술업종 분포현황</th>
								</tr>
				 	 			<tr>
				 	 				<th scope="col">기술업종</th>	
						 			<th scope="col">사업체수</th>
						 			<th scope="col">평균사업체수</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
				
				<div id="importantFacilityStateBarInfo_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('importantFacilityStateBarInfo');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData"  id="importantFacilityStateBarInfo"  style="display:none;">
		 			<div class="pntDataBox fc" id="gridMajorInfo" style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('importantFacilityStateBarInfo');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="지역종합정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="" />
				 				<col width="" />
				 				<col width="" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=6>산업단지 내 주요시설 정보</th>
								</tr>
				 	 			<tr>
				 	 				<th scope="col">분류</th>
				 	 				<th scope="col">공공기관</th>	
						 			<th scope="col">교통시설</th>
						 			<th scope="col">금융기관</th>
						 			<th scope="col">대학</th>
						 			<th scope="col">창업지원센터</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
			
				<div id="majorInfo_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('majorInfo');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData" id="majorInfo"  style="display:none;">
		 			<div class="pntDataBox fc" id="gridMajorInfo" style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('majorInfo');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="지역종합정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="50%" />
				 				<col width="50%" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=2>주요지원시설 정보</th>
								</tr>
				 	 			<tr>
				 	 				<th scope="col">분류</th>	
						 			<th scope="col">시설수</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
				
				<div id="poiRegion_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('poiRegion');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData"  id="poiRegion"  style="display:none;">
		 			<div class="pntDataBox fc" id="gridPoi" style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('poiRegion');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="poi정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="100" />
				 				<col width="180" />
				 				<col width="" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=3>POI 정보</th>
								</tr>
				 	 			<tr>
				 	 				<th scope="col">타입</th>	
						 			<th scope="col">사업체명</th>
						 			<th scope="col">주소</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
				
				<div id="poiIndustyRegion_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('poiIndustyRegion');"><img src='/img/im/btn_plus.png' alt='보이기' /></a></div>
				<div class="pntData" id="poiIndustyRegion" style="display:none;">
		 			<div class="pntDataBox fc" id="gridIndustryPoi" style="position:relative;">
		 			<div class="pntCloseBtn" style="top:2px;"><a href="javascript:$reportForm.ui.onOffDiv('poiIndustyRegion');"><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>
					<table class="pntTable" summary="poi정보">
			 			<caption>데이터 표1</caption>
				 			<colgroup>
				 				<col width="200" />
				 				<col width="" />
				 				<col width="" />
				 				<col width="100" />
				 				<col width="100" />
							</colgroup>
							<tbody id="tBody">
								<tr>
									<th colspan=5>POI 정보</th>
								</tr>
				 	 			<tr>
				 	 				<th scope="col">산업단지명</th>	
						 			<th scope="col">시도명</th>
						 			<th scope="col">시군구명</th>
						 			<th scope="col">x좌표</th>
						 			<th scope="col">y좌표</th>
				 	 			</tr>
					 		</tbody>
					 </table>
					 </div>
				</div>
				
				<div id="upjongGrid_show" class="pntShowBtn"><a href="javascript:$reportForm.ui.onOffDiv('upjongGrid');">
		 			<img src='/img/im/btn_plus.png' alt='보이기' /></a>
	 			</div>
		 		<div class="pntData" id="upjongGrid" style="display:none;">
		 			<div class="pntDataBox fc" id="gridArea" style="position:relative;">
			 			<div class="pntCloseBtn" style="top:2px;">
			 				<a href="javascript:$reportForm.ui.onOffDiv('upjongGrid');">
			 					<img src='/img/um/btn_closel01.png' alt='숨기기' />
		 					</a>
	 					</div>
				 		<table class="pntTable" summary="업종명, 사업체 입지계수, 종사자 입지계수" >
		 					<caption></caption>
		 					<colgroup id="colgroup">
		 						<col width="15%">
		 						<col width="*">
		 						<col width="*">
							</colgroup>
							<tbody id="tBody">
								<tr><th id="sClassNm" colspan="3"></th></tr>
								<tr>
									<th>업종명</th>
									<th>사업체 입지계수</th>
									<th>종사자 입지계수</th>
								</tr>
							</tbody>
				 		</table>
				 	</div>
				</div>
				
			</div>
		
		 	<dl class="pntDl">
		 		<dt>※ 자료 이용시 유의사항</dt>
		 		<dd>
		 			<p>SGIS 오픈플랫폼에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업 등의 자료를 제외하고 최신경계를 반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다.
		 			</p>
		 			<ol>
		 			 	<li>제외된 자료 
			 			 	<br />- 인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대
			 			 	<br />- 사업체 센서스 : 개인 운수업(사업장이 일정치 않음)
		 			 	</li>
		 			 	<li>
		 			 		최신 경계 반영에 따른 차이
		 			 		<br />- SGIS는 최신 행정구역 경계에 맞추어 서비스 함에 따라 KOSIS 자료와 다를 수 있습니다.
		 			 	</li>
		 			 </ol>
		 		</dd>
		 	</dl>
	 	</div>
	</div>
	<div id="hiddenReport"></div>
</body>
</html>