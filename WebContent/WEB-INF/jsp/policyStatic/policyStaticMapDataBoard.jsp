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
<a href="javascript:void(0)" class="policyStaticMapDataBoard disabled" tabindex="96">데이터보드</a>
<div class="dataSideBox">
	<div class="bar">
		<div id="dataSlider" class="dataSlider"></div> 
		<a href="javascript:void(0)"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>  <!-- 2017.09.13 [개발팀] 기능수정 -->
	</div>
	<div class="dataSideContents" style="display:block;">
	
		<!-- 일반 DataBoard Start -->
		<div class="dataSideScroll " id="normalDataBoard">
			<div class="dataBoardDiv" id="viewDataBoard">
			<!-- 2017.09.13 [개발팀] 기능수정 START -->
				<div class="pcGuide">
   					<table class="pcTable03">
   						<colgroup>
   							<col style="width:90px;" />
   							<col style="width:auto;" />
   						</colgroup>
   						<tr>
   							<th>대상지역 :</th>
   							<td id="regionTitleDB"></td>
   						</tr>
   						<tr>
   							<th>주요지표 :</th>
   							<td id="dataA_titleDB"></td>
   						</tr>
   						<tr>
   							<th></th>
   							<td id="dataB_titleDB"></td>
   						</tr>
   						<tr>
   							<th>출처 :</th>
   							<td id="dataA_originDB"></td>
   						</tr>
   						<tr>
   							<th></th>
   							<td id="dataB_originDB"></td>
   						</tr>
   					</table>
   					<a id="inst_titleDB"></a>
   				</div>
   				<!-- 2017.09.13 [개발팀] 기능수정 END -->
				<!-- 통계 -->
				
				<div class="dscList">
					<!-- 데이터 보기 Start -->
					<div id="viewCurrentRegionData_dd_area">
			  			<div class="dbTabs" style="margin-top:20px;">  <!-- 2017.09.13 [개발팀] 기능수정 -->
							<a href="javascript:void(0)">데이터 A·B</a>    <!-- 2017.09.13 [개발팀] 기능수정 -->
						</div>    <!-- 2017.09.13 [개발팀] 기능수정 START -->
						<div class="compareBox">
							<div class="typeBox" id="typeBoxDB">
								<a href="javascript:void(0)" class="first on">차트</a>
								<a href="javascript:void(0)">표</a>
							</div>
							<div id="wrapperChartScroll3" class="censusChart" style="width:520px;height:303px;">
								<div class="charts" id="targetChartsDB"></div>    <!-- 2017.09.13 [개발팀] 기능수정 -->
							</div>
							<div id="dataGridDB" style="width:520px;display:none;">
								<table class="pcTable02" id="dataTableDB" style="margin-bottom:20px;"></table> <!-- 2018.01.03 [개발팀] -->
							</div>
							<!-- 2017.09.13 [개발팀] 기능수정 END -->
						</div>
					</div>
					<!-- 데이터 보기 End -->
					
					<!-- 상위 지역 비교 데이터 보기 Start -->
				
					<!-- 상위 지역 비교 데이터 보기 End -->
					
					<!-- 시계열 조회 Start -->
					
					<!-- 시계열 조회 End -->
				</div>
			</div>
			
			<!-- 공공데이터 Include -->
			
			<!-- 나의데이터 Include -->
		</div>
		<!-- 일반 DataBoard End -->
			
		<!-- Full Size DataBoard Start -->
		
		<!-- Full Size DataBoard End -->
	</div>
</div>  