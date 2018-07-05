<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 데이터보드 JSP  
* File Name     : interactiveDataBoard.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-09
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<a href="javascript:void(0)" class="interactiveDataBoard">데이터보드</a>
<div class="dataSideBox">
	<div class="bar">
		<div id="dataSlider" class="dataSlider"></div> 
		<a href="javascript:void(0)"><img src="/img/ico/ico_close02.png" alt="데이터보드 닫기" /></a>
	</div>
	<div class="dataSideContents">
	
		<!-- 일반 DataBoard Start -->
		<div class="dataSideScroll " id="normalDataBoard">
			<div class="dataBoardDiv" id="viewDataBoard">
				<p class="txt dataBoardTitle"></p><!-- id dupl 오류로 class 변경 -->								<!-- 제목 -->
				<p class="txt dataBoardOrigin" style="display:none;"></p> <!-- id dupl 오류로 class 변경 -->		<!-- 출처 -->
				<p class="txt dataBoardArea" ></p><!-- id dupl 오류로 class 변경 -->								<!-- 지역 -->
				<p class="txt dataBoardStats" ></p><!-- id dupl 오류로 class 변경 -->								<!-- 통계 -->
				<p class="txt" id="dataBoardStatsSum"></p>								<!-- 합계 -->
				
				<dl class="dscList">
					<!-- 데이터 보기 Start -->
					<dt id="viewCurrentRegionData_dt_area"><a href="javascript:void(0)" class="on">데이터 보기</a></dt>
					<dd id="viewCurrentRegionData_dd_area">
						<div class="compareBox">
							<div class="typeBox">
								<a href="javascript:void(0)" class="first on">차트</a>
								<a href="javascript:void(0)">표</a>
							</div>
							<div class="combineGrid" style="margin-top: -50px;">
    							<a href="javascript:void(0)" class="btn_excelDownload">엑셀다운로드</a>
    							<div class="dataGrid" style="width:480px;display:none;"></div><!-- dataGrid id중복문제 class로 수정 -->  
    						</div>
							<div id="wrapperChartScroll" class="censusChart" style="width:520px;height:303px;">
								<div class="charts" id="targetCharts"></div>
							</div>
							<div class="tables"><!-- 표영역 -->
								<table summary="항목, 순위, 값, 비율(%)" style="table-layout: fixed;">
									<caption>해당지역 내 데이터 보기</caption>
									<thead>
										<tr>
											<th scope="col">항목</th>
											<th class="adm_cd_th" scope="col" style="display: none;">집계구번호</th>
											<th scope="col">순위</th>
											<th scope="col">값</th>
											<th scope="col">비율(%)</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="항목, 순위, 값, 비율(%)">
										<caption>해당지역 내 데이터 보기</caption> 
										<tbody id="barChartTable">
										</tbody>
									</table>
								</div>
							</div><!-- 표영역 -->
						</div>
					</dd>
					<!-- 데이터 보기 End -->
					
					<!-- 상위 지역 비교 데이터 보기 Start -->
					<dt id="viewUpRegionData_dt_area"><a href="javascript:void(0)" class="on">상위 지역 비교 데이터 보기</a></dt>
					<dd id="viewUpRegionData_dd_area">
						<div class="compareBox">
							<div class="typeBox">
								<a href="javascript:void(0)" class="first on">차트</a>
								<a href="javascript:void(0)">표</a>
							</div>
							<div class="combineGrid" style="margin-top: -50px;">
    							<a href="javascript:void(0)" class="btn_excelDownload">엑셀다운로드</a>
    							<div class="dataGrid" style="width:480px;display:none;"></div><!-- dataGridID중복문제 class로 변경 -->  
    						</div>
							<div class="charts censusChart">
								<div class="topAreaChartsBox">
									<div id="pieChartDiv1"></div>
									<div id="pieChartDiv2"></div>
									<div id="pieChartDiv3"></div>
									<p class="pieLegend"></p>
								</div>
							</div>
							<div class="tables"><!-- 표영역 -->
								<table summary="항목, 값">
									<caption>상위 지역 비교 데이터 보기</caption>
									<thead>
										<tr>
											<th scope="col">항목</th>
											<th scope="col">값</th>
										</tr>
									</thead> 
								</table>
								<div>
									<table summary="항목, 값">
										<caption>상위 지역 비교 데이터 보기</caption>
										<tbody id="pieChartTable">
										</tbody>
									</table>
								</div>
							</div><!-- 표영역 -->
						</div>
					</dd> 
					<!-- 상위 지역 비교 데이터 보기 End -->
					
					<!-- 시계열 조회 Start -->
					<dt id="viewTimeSeriesData_dt_area"><a href="javascript:void(0)" class="on">시계열 조회</a></dt>
					<dd id="viewTimeSeriesData_dd_area">
						<div class="clockTypeBox">
							<a href="javascript:void(0)" class="btn_clockTypePlay">play</a>
							<a href="javascript:void(0)" class="btn_clockTypeSetting">설정</a>
							<a href="javascript:void(0)" class="btn_clockTypeLegend">off</a>
							<a href="javascript:void(0)" class="btn_clockTypeOk">ok</a>
							<ul class="yearList" id="tableTimeSeries">
							</ul>
						</div>
					</dd>
					<!-- 시계열 조회 End -->
				</dl>
			</div>
			
			<!-- 공공데이터 Include -->
			<jsp:include page="/view/map/publicDataBoard"></jsp:include>
			
			<!-- 나의데이터 Include -->
			<jsp:include page="/view/map/mydataDataBoard"></jsp:include>
		</div>
		<!-- 일반 DataBoard End -->
			
		<!-- Full Size DataBoard Start -->
		<div class="dataSideScroll" id="fullDataBoard">
			<div class="dssRow">
				<div class="fl">
					<p>데이터 조회 조건</p>
					<div class="dssContents" style="height:310px;">
<!-- 						<div class="clickMiniMap"></div> -->
						<div class="cmListBox">
							<span>조회정보</span>
							<div id="fullDataBoardTitle">
								<p class="txt dataBoardTitle" id="dataBoardTitle" style="padding-left:10px;font-size:13px;"></p><!-- -->								<!-- 제목 -->
								<p class="txt dataBoardOrigin" id="dataBoardOrigin" style="display:none;padding-left:10px;font-size:13px;"></p>					<!-- 기준년도 -->
								<p class="txt dataBoardArea" id="dataBoardArea" style="padding-left:10px;font-size:13px;"></p>								<!-- 지역 -->
								<p class="txt dataBoardStats" id="dataBoardStats"  style="padding-left:10px;font-size:13px;"></p>								<!-- 통계 -->
							</div>
							<span>조회년도</span>
							<ul id="fullTableTimeSeries">
							</ul>
						</div>
					</div>
				</div>
				<div class="fr"> 
					<p>해당 지역 내 데이터 보기(차트)</p>
					<div id="wrapperFullChartScroll" style="width:380px;height:250px;">
						<div class="dssContents" id="fullTargetChart"></div>
					</div>
				</div>
			</div> 
			<div class="dssRow">
				<div class="fl">
					<p>상위 지역 비교 데이터 보기</p>
					<div class="dssContents" id="fullPieChart" style="height:240px;"></div>
					<div class="fullPieLegend"></div>
				</div>
				<div class="fr"> 
					<p>해당 지역 내 데이터 보기(표)</p>
					<div class="dssContents fullCompareBox" id="dssChart03">
						<!-- 표영역 -->
						<div class="tables">
							<table summary="항목, 순위, 값, 비율(%)">
								<caption>해당지역 내 데이터 보기</caption>
								<thead>
									<tr>
										<th scope="col">항목</th>
										<th class="adm_cd_th" scope="col" style="display: none;">집계구번호</th>
										<th scope="col">순위</th>
										<th scope="col">값</th>
										<th scope="col">비율(%)</th>
									</tr>
								</thead> 
							</table>
							<div class="scrolls">
								<table summary="항목, 순위, 값, 비율(%)">
									<caption>해당지역 내 데이터 보기</caption> 
									<tbody id="fullBarChartTable">
									</tbody>
								</table>
							</div>
						</div>
						<!-- 표영역 -->
					
					</div>
				</div> 
			</div>
		</div>
		<!-- Full Size DataBoard End -->
	</div>
</div>  
<form id="excelDownForm" name="excelDownForm" method="post">
</form>