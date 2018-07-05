<%
/**************************************************************************************************************************
* Program Name  : 기술창업통계지도 데이터보드 JSP  
* File Name     : technicalBizDataBoard.jsp
* Comment       : 
* History       : 네이버시스템 권차욱 2016-06-21
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<a href="javascript:void(0)" class="bizStatsDataBoard bizStatsDataBoard">데이터보드</a>
<div class="dataSideBox">
	<div class="bar">
		<div id="dataSlider" class="dataSlider"></div> 
		<a href="javascript:void(0)"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	</div>
	<div class="dataSideContents">
		<div class="dataSideScroll">
		
			<!-- sido 시도별 기술업종 현황 -->
			<div class="dataBoardDiv" id="sidoDiv">
				<div class="areaBox"></div>
				<dl class="dscList">
					<dt class="mt15">
						<!-- 2017.08.24 개발팀 수정 시작-->
						<!-- <a href="javascript:void(0)">업종별 지역 특성 정보</a> -->
						<a href="javascript:void(0)">기술업종별 지역 특성 정보</a> 
						<!-- 2017.08.24 개발팀 수정 완료-->
					</dt>
					<dd>
						<div class="dbTabs" id="sidoFeatureMajorBtn">
						<!-- 2017.08.24 개발팀 수정 시작-->
							<!-- <a id="sidoFeatureMajorBtn01" href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(1);void(0);" class="on">기술업종 분포현황</a> -->
							<!-- <a id="sidoFeatureMajorBtn02" href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(2);void(0);">업종별 특성정보</a> -->
							<a id="sidoFeatureMajorBtn01" href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(1);void(0);" class="on">업종별 특성 현황</a>
							<a id="sidoFeatureMajorBtn02" href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(3);void(0);">업종별 입지계수 현황</a>
						<!-- 2017.08.24 개발팀 수정 완료-->
						</div>
						
						<!-- 2017.08.24 개발팀 수정 시작-->
						<!-- <div class="dbTabs type01" id="sidoFeatureMinorBtn" style="display:none;">
							<a id="sidoFeatureMinorBtn02" href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(2);void(0)" class="on">전체현황</a>
							<a id="sidoFeatureMinorBtn03" href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(3);void(0)">기술혁신</a>
							<a id="sidoFeatureMinorBtn04" href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(4);void(0)">지식집약</a>
						</div> -->
						<!-- 2017.08.24 개발팀 수정 완료-->
						<!-- 2017.08.24 개발팀 수정 시작-->
						<div class="dbTabs inType" id="sidoFeatureDetailBtn">
   							<a href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(1);" class="on">수</a>
   							<a href="javascript:$technicalBizDataBoard.ui.changeSidoFeatureChart(2);" class="">증감</a>
						</div>
						<!-- 2017.08.24 개발팀 수정 완료-->
						
						<!-- 기술혁신정도 -->
						<div class="chartAreaRela sidoFeatureChartArea" id="sidoFeatureChartArea01">
							<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="기술업종 분포현황 방사형그래프" title="${paramInfo.tooltipList.E0002}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0002}"></a> <!-- 2018.01.15 [개발팀] -->
							<div id="sidoFeatureChart01" class="chartSize01 sidoFeatureChart"></div>
							<%-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="기술업종 분포현황 방사형그래프" title="${paramInfo.tooltipList.E0002}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0002}"></a> --%> <!-- 2018.01.15 [개발팀] 주석처리 -->
							<div class="posb">
								<ul class="cateSaupLegend line type01">
								</ul>
							</div>
						</div>
						<!-- 업종별 특성정보 - 전체현황 -->
						<div class="chartAreaRela sidoFeatureChartArea" id="sidoFeatureChartArea02" style="display:none;">
							<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="업종별특성정보 전체현황 방사형그래프" title="${paramInfo.tooltipList.E0003}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0003}"></a> <!-- 2018.01.15 [개발팀] -->
							<div id="sidoFeatureChart02" class="chartSize01 sidoFeatureChart"></div>
							<%-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="업종별특성정보 전체현황 방사형그래프" title="${paramInfo.tooltipList.E0003}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0003}"></a> --%> <!-- 2018.01.15 [개발팀] 주석처리 -->
							<div class="posb">
								<ul class="cateSaupLegend line type01">
								</ul>
							</div>
						</div>
						<!-- 업종별 특성정보 - 기술혁신 -->
						<div class="chartAreaRela sidoFeatureChartArea" id="sidoFeatureChartArea03" style="display:none;">
							<div class="compareBox">
								<div class="typeBox" style="margin-left:260px;">
									<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('sidoFeatureChart03','1');" class="first on">차트</a>
									<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('sidoFeatureChart03','2');">표</a>
								</div>
								
								<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다.<br/>(그래프에서 특정영역을 마우스로 드래그하면 확대하여 볼 수 있습니다.)<br/><br/>-입지계수(Location Quotient):상대적 특화도 지수로 불리는 입지계수는 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표<br/><br/>예시)입지계수 계산식(사업체기준):<br/>(해당지역 기술업종 사업체수 / 해당지역 전체기술업종 사업체수 ) / (기준지역 기술업종 사업체수 / 기준지역 전체 기술업종 사업체수)<br/><br/>*기준지역 : 전국 또는 시도 등의 기준이 되는지역"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;margin-top:4px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> <!-- 2018.01.22 [개발팀] 툴팁추가  -->
								<div id="sidoFeatureChart03_1">
									<!-- <p class="sTit" style="top:45px;">종사자 LQ</p> -->
									<div id="sidoFeatureChart03" class="chartSize01 sidoFeatureChart"></div>
									<!-- <p class="eTit">사업체 LQ</p> --> 
									<!-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-335px;margin-left:300px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> -->
									<div class="posb">
										<ul class="cateSaupLegend line type02">
										</ul>
									</div>	
								</div>
								<div id="sidoFeatureChart03_2" style="display:none;">
								</div>
							</div>
							<%-- <p class="sTit">종사자 LQ</p>
							<div id="sidoFeatureChart03" class="chartSize01 sidoFeatureChart"></div>
							<p class="eTit">사업체 LQ</p> 
							<a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="${paramInfo.tooltipList.E0004}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a>
							<div class="posb">
								<ul class="cateSaupLegend line type02">
								</ul>
							</div> --%>
							
							
							<div class="ltListBox">	
								<ul>
									<li>
										<span class="t01">사업체</span>
										<span class="t02" id="sigoLctCorpText"><span id="sidoLctCorpTextAdmNm" class="txtBold cRed"></span>는 사업체 기준&nbsp;&nbsp;<span id="sidoLctCorpMclassNm" class="txtBold cRed"></span><span id="sidoLctCorpMclassNm_append"></span></span>
									</li>
									<li>
										<span class="t01">종사자</span>
										<span class="t02" id="sidoLctWorkerText"><span id="sidoLctWorkerTextAdmNm" class="txtBold cRed"></span>는 종사자 기준&nbsp;&nbsp;<span id="sidoLctWorkerMclassNm" class="txtBold cRed"></span><span id="sidoLctWorkerMclassNm_append"></span></span>
									</li>
								</ul>
							</div>
							
						</div>
						<!-- 업종별 특성정보 - 지식집약 -->
						<div class="chartAreaRela sidoFeatureChartArea" id="sidoFeatureChartArea04" style="display:none;">
							<a href="javascript:void(0)" class="ar" data-subj="업종별특성정보 지식집약 방사형그래프" title="${paramInfo.tooltipList.E0005}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0005}"></a> <!-- 2018.01.15 [개발팀] -->
							<div id="sidoFeatureChart04" class="chartSize01 sidoFeatureChart"></div>
							<%-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="업종별특성정보 지식집약 방사형그래프" title="${paramInfo.tooltipList.E0005}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0005}"></a> --%> <!-- 2018.01.15 [개발팀] -->
							<div class="posb">
								<ul class="cateSaupLegend line type03">
								</ul>
							</div>
						</div>
					</dd>
					<dt class="mt15">
						<a href="javascript:void(0)">경제총조사 현황</a>
					</dt>
					<dd>
						<!-- 2017.08.24 개발팀 수정 시작-->
						<!-- <div class="dbTabs" id="sidoEconomyMajorBtn">
							<a id="sidoEconomyMajorBtn00" href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('sales', 0);void(0);" class="on">전체현황</a>
							<a id="sidoEconomyMajorBtn01" href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('sales', 1);void(0);">기술혁신정도</a>
							<a id="sidoEconomyMajorBtn02" href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('sales', 2);void(0);">지식집약정도</a>
						</div>
						<div class="dbTabs type01" id="sidoEconomyMinorBtn">
							<a id="sidoEconomyMinorBtn_sales" href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('sales');void(0);" class="on">매출액</a>
							<a id="sidoEconomyMinorBtn_lbcst" href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('lbcst');void(0);">인건비</a>
							<a id="sidoEconomyMinorBtn_rntchrg" href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('rntchrg');void(0);">임차료</a>
							<a id="sidoEconomyMinorBtn_business_profit" href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('business_profit');void(0);">영업이익</a>
						</div> -->
						
						<div class="chartAreaRela full cellType">  
					    	<div id="techBizGraphCheck" class="carRight bottomLine">
					    		<p>
					    			<a href="javascript:$technicalBizDataBoard.event.checkClass(11)" class="ckbtn on" id="check_11">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.event.checkClass(12)" class="ckbtn on" id="check_12">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.event.checkClass(13)" class="ckbtn on" id="check_13">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.event.checkClass(14)" class="ckbtn on" id="check_14">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.event.checkClass(21)" class="ckbtn on" id="check_21">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.event.checkClass(22)" class="ckbtn on" id="check_22">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.event.checkClass(23)" class="ckbtn on" id="check_23">
					    				<span class="ico"></span>
					    			</a>
					    		</p>
					    	</div>
					    </div>
					    					
						<div class="dbTabs" id="techBizGraphList">
							<!-- 2018.01.22 [개발팀]  -->
							<a href="javascript:void(0)" onclick="javascript:$technicalBizDataBoard.event.checkClass(11);" class="c01 on">첨단기술</a>
					    	<a href="javascript:void(0)" onclick="javascript:$technicalBizDataBoard.event.checkClass(12);" class="c02">고기술</a>
					    	<a href="javascript:void(0)" onclick="javascript:$technicalBizDataBoard.event.checkClass(13);" class="c03">중기술</a>
					    	<a href="javascript:void(0)" onclick="javascript:$technicalBizDataBoard.event.checkClass(14);" class="c04">저기술</a>
					    	<a href="javascript:void(0)" onclick="javascript:$technicalBizDataBoard.event.checkClass(21);" class="c05">창의 및 디지털</a>
					    	<a href="javascript:void(0)" onclick="javascript:$technicalBizDataBoard.event.checkClass(22);" class="c06">ICT</a>
					    	<a href="javascript:void(0)" onclick="javascript:$technicalBizDataBoard.event.checkClass(23);" class="c07">전문서비스</a>  
						</div>
						<div class="dbTabs type01" id="ChangeEconomyChart">
							<a href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('sales', 0)" class="on">매출액</a>
							<a href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('lbcst', 0)">인건비</a>
							<a href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('rntchrg', 0)">임차료</a> 
							<a href="javascript:$technicalBizDataBoard.ui.changeSidoEconomyChart('business_profit', 0)">영업이익</a>
						</div>
						<!-- 2017.08.24 개발팀 수정 종료-->
						<div class="arText">(단위 : 백 만)</div>
						<div class="chartAreaRela sidoEconomyChartArea" id="sidoEconomyChartArea00">
							<div id="sidoEconomyChart00" class="chartSize01 sidoEconomyChart"></div>
							<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,경제총조사(2015)</p> <!-- 2018.01.09 [개발팀]-->
						</div>
						<div class="chartAreaRela sidoEconomyChartArea" id="sidoEconomyChartArea01">
							<div id="sidoEconomyChart01" class="chartSize02 sidoEconomyChart"></div>
							<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,경제총조사(2015)</p> <!-- 2018.01.09 [개발팀]-->
						</div>
						<div class="chartAreaRela sidoEconomyChartArea" id="sidoEconomyChartArea02">
							<div id="sidoEconomyChart02" class="chartSize02 sidoEconomyChart"></div>
							<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,경제총조사(2015)</p> <!-- 2018.01.09 [개발팀]-->
						</div>
					</dd>
					<!-- 
					<dt class="mt15">
						<a href="javascript:void(0)">업종별 사업체 비율</a>
					</dt>
					<dd>
						<div class="chartAreaRela h350">
							<div id="sidoRatioChart01" class="ratioCharts"></div>
							<div class="typelabel">
								<p class="txtSubj"><span class="admNm">경기도</span> 비율 <p>
							</div>
						</div>
					</dd>
					-->
				</dl>
			</div>
			<!-- sido 시도별 기술업종 현황 end -->
			
			<!-- sigungu 시군구 기술업종 현황 start -->
			<div class="dataBoardDiv" id="sigunguDiv">
   				<div class="areaBox"></div>
   				<div class="techLegendBox">
					<div id="techLegend_color" class="techLegend_color on">색상지도</div>
					<div id="techLegend_bubble" class="techLegend_bubble">버블지도</div>
				</div>
   				<dl class="dscList"> 
    				<dt class="mt15">
    					<!-- 2017.09.11 개발팀 수정 시작-->
    					<!-- <a href="javascript:void(0)">기술업종 분류별 사업체 현황 정보</a> -->
    					<a href="javascript:void(0)">기술업종 별 지역 현황 정보</a>
    					<!-- 2017.09.11 개발팀 수정 종료 -->
    				</dt>
    				<dd>
    					<!-- 2017.09.11 개발팀 수정 시작-->
    					<div class="dbTabs" id="sigunguDbTabs">
					    	<a href="javascript:$technicalBizDataBoard.ui.changeSigunguFeatureChart(1);" class="on">업종별 비율 현황</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.changeSigunguFeatureChart(2);">업종별 입지계수 현황</a> 
					    </div>
					    <!-- 2017.09.11 개발팀 수정 종료 -->
					    <!-- 업종별 비율 현황 탭 -->
					    <!-- 2017.09.11 기존 html sigunguPerTab 으로 감싸기-->
					    <!-- 2017.09.11 개발팀 수정 sigunguTabs class type01 추가-->
					    <div id="sigunguPerTab">
						    <div class="dbTabs type01" id="sigunguTabs">
	    						<a id="sigunguTab_00" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('00');void(0);">전체현황</a>
	    						<a id="sigunguTab_11" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('11');void(0);" class="on">첨단기술</a>
	    						<a id="sigunguTab_12" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('12');void(0);">고기술</a> 
	    						<a id="sigunguTab_13" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('13');void(0);">중기술</a>
	    						<a id="sigunguTab_14" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('14');void(0);">저기술</a>
	    						<a id="sigunguTab_21" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('21');void(0);">창의/디지털</a>
	    						<a id="sigunguTab_22" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('22');void(0);">ICT</a>
	    						<a id="sigunguTab_23" href="javascript:$technicalBizDataBoard.ui.changeSigunguClassCd('23');void(0);">전문서비스</a>
	    					</div>
	    					
	    					<div class="chartAreaType02 t01 fn" id="sigunguClassChartArea01">
	    						<p class="jtxtSubj" id="sigunguClassChartArea01Subj"><p>
	    						<div class="typeCharts01" id="sigunguClassChart01"></div>
	    						<div class="typelabel">
	    						</div>
	    					</div> 
	    					<div class="chartAreaType02 t01 fn line" id="sigunguClassChartArea02">
	    						<p class="jtxtSubj" id="sigunguClassChartArea02Subj"><p>
	    						<div class="typeCharts01" id="sigunguClassChart02"></div>
	    						<div class="typelabel">
	    						</div>
	    					</div>
	    					<div class="divChartMiddle">
						    	<p><a href="javascript:$('.hideChart').slideToggle();" class="noneView" id="moreSidoInfoButton">&gt;&gt;경기도 평균보기</a></p> 
						    </div>
	    					<!-- 2017.09.13 개발팀 추가 -->
	    					<div class="chartAreaType02 t01 fn hideChart" id="sigunguClassChartArea03">
	    						<p class="jtxtSubj" id="sigunguClassChartArea03Subj"><p>
	    						<div class="typeCharts01" id="sigunguClassChart03"></div>
	    						<div class="typelabel">
	    						</div>
	    					</div> 
	    					<div class="chartAreaType02 t01 fn line hideChart" id="sigunguClassChartArea04">
	    						<p class="jtxtSubj" id="sigunguClassChartArea04Subj"><p>
	    						<div class="typeCharts01" id="sigunguClassChart04"></div>
	    						<div class="typelabel">
	    						</div>
	    					</div>
					    </div>
    					
    					<!-- 업종별 비율 현황 끝 -->
    					<!-- 업종별 입지계수 현황 탭 -->
    					<div id="sigunguLctTab" style="display:none;">
    						<!-- <div class="noneAreaBox">
	    						<div class="dbTabs">
	    							<a href="javascript:$technicalBizDataBoard.ui.changeSigunguLctChart('country')" class="on">전국 대비</a>
	    							<a href="javascript:$technicalBizDataBoard.ui.changeSigunguLctChart('sido');">시도 대비</a> 
	    						</div>
			    			</div> -->
    						<div class="chartAreaRela">
    							<div class="compareBox">
    							
    								<div class="noneAreaBox">
	    								<div class="dbTabs">
	    									<a href="javascript:$technicalBizDataBoard.ui.changeSigunguLctChart('country')" class="on">전국 대비</a>
	    									<a href="javascript:$technicalBizDataBoard.ui.changeSigunguLctChart('sido');">시도 대비</a>
	    								</div>
			    					</div>
			    					<div class="typeBox" style="position:absolute;top:2px;left:260px">
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('sigunguLctChart','1');" class="first on">차트</a>
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('sigunguLctChart','2');">표</a>
									</div>
									<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다.<br/>(그래프에서 특정영역을 마우스로 드래그하면 확대하여 볼 수 있습니다.)<br/><br/>-입지계수(Location Quotient):상대적 특화도 지수로 불리는 입지계수는 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표<br/><br/>예시)입지계수 계산식(사업체기준):<br/>(해당지역 기술업종 사업체수 / 해당지역 전체기술업종 사업체수 ) / (기준지역 기술업종 사업체수 / 기준지역 전체 기술업종 사업체수)<br/><br/>*기준지역 : 전국 또는 시도 등의 기준이 되는지역"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;margin-top:1px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> <!-- 2018.01.22 [개발팀] 툴팁추가 -->
									<div id="sigunguLctChart_1">
										<!-- <p class="sTit" style="top:45px;">종사자 LQ</p> -->
    									<div id="sigunguLctChart" class="chartSize01"></div> 
    									<!-- <p class="eTit">사업체 LQ</p> --> 
    									<!-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-335px;margin-left:300px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> -->
									</div>
									<div id="sigunguLctChart_2" style="display:none;">
									
									</div>
									
    							</div>
    							
    							
    							<%-- <p class="sTit">종사자 LQ</p>
    							<div id="sigunguLctChart" class="chartSize01"></div> 
    							<p class="eTit">사업체 LQ</p> 
    							<a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="${paramInfo.tooltipList.E0004}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> --%>
    						</div>  
    						<div class="ltListBox">	
    							<ul>
    								<li>
    									<span class="t01">사업체</span>
    									<span class="t02" id="sigunguLctCorpText"><span id="sigunguLctCorpTextAdmNm" class="txtBold cRed">경기도</span>는 사업체 기준&nbsp;&nbsp;<span id="sigunguLctCorpMclassNm" class="txtBold cRed"></span><span id="sigunguLctCorpMclassNm_append"> 업종이 전국과 비교하여 집적도가 높음</span></span>
    								</li>
    								<li>
    									<span class="t01">종사자</span>
    									<span class="t02" id="sigunguLctWorkerText"><span id="sigunguLctWorkerTextAdmNm" class="txtBold cRed">경기도</span>는 종사자 기준&nbsp;&nbsp;<span id="sigunguLctWorkerMclassNm" class="txtBold cRed"></span><span id="sigunguLctWorkerMclassNm_append">업종이 전국과 비교하여 집적도가 높음</span></span>
    								</li>
    							</ul>
		    				</div>
    					</div>
    					<!-- 업종별 입지계수 현황 끝 -->
    					
    					<!-- 2017.09.13 개발팀 추가 종료 --> 
    					
    					<dt class="t01 mt15" id="techRank_corp_cnt" title="상위 지역 대비 사업체 수">
					    		<a href="javascript:$technicalBizDataBoard.ui.changeSigunguRankType('corp_cnt');">
					    		<span class="jcate">사업체 수</span>
					    		<span class="jsubj">경기도 44개 시군구 중 3위</span>
					    		<span class="jnum sggCnt">13,310개<br />(경기도 평균 10,000개)</span>
					    	</a> 
					    </dt>
					    <dd id="rankChart_corp_cnt"> 
					    	<div class="chartAreaRela">
								<div id="typeCharts_corp_cnt" class="chartSize02"></div>
								<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,등록센서스(2016)</p> <!-- 2018.01.09 [개발팀] -->
					    	</div>
					    </dd>  
					    
						<dt class="t01 mt15" id="techRank_corp_per" title="상위 지역 대비 사업체 비율">
					    		<a href="javascript:$technicalBizDataBoard.ui.changeSigunguRankType('corp_per');void(0);" class="on">
					    		<span class="jcate"></span>
					    		<span class="jsubj"></span>
					    		<span class="jnum sggCnt"></span>
					    	</a> 
					    </dt>
					    <dd id="rankChart_corp_per" style="display:none;"> 
					    	<div class="chartAreaRela">
								<div id="typeCharts_corp_per" class="chartSize02"></div>
								<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,등록센서스(2016)</p> <!-- 2018.01.09 [개발팀] -->
					    	</div>  
					    </dd>  
    					<dt class="t01 mt15" id="techRank_resid_ppltn_cnt" title="상위 지역 대비 인구 수">
					    		<a href="javascript:$technicalBizDataBoard.ui.changeSigunguRankType('resid_ppltn_cnt');void(0);" class="on">
					    		<span class="jcate"></span>
					    		<span class="jsubj"></span>
					    		<span class="jnum sggCnt"></span>
					    	</a> 
					    </dt>
					    <dd id="rankChart_resid_ppltn_cnt" style="display:none;"> 
					    	<div class="chartAreaRela">
								<div id="typeCharts_resid_ppltn_cnt" class="chartSize02"></div>
								<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,등록센서스(2016)</p> <!-- 2018.01.09 [개발팀] -->
					    	</div>  
					    </dd>
    					
    					<dt class="t01 mt15" id="techRank_worker_cnt" title="상위 지역 대비 종사자 수">
					    		<a href="javascript:$technicalBizDataBoard.ui.changeSigunguRankType('worker_cnt');void(0);" class="on">
					    		<span class="jcate"></span>
					    		<span class="jsubj"></span>
					    		<span class="jnum sggCnt"></span>
					    	</a> 
					    </dt>
					    <dd id="rankChart_worker_cnt" style="display:none;"> 
					    	<div class="chartAreaRela">
								<div id="typeCharts_worker_cnt" class="chartSize02"></div>
								<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,등록센서스(2016)</p> <!-- 2018.01.09 [개발팀] -->
					    	</div>  
					    </dd>
    					<dt class="t01 mt15" id="techRank_avg_worker_cnt" title="상위 지역 대비 평균 종사자수">
					    		<a href="javascript:$technicalBizDataBoard.ui.changeSigunguRankType('avg_worker_cnt');void(0);" class="on">
					    		<span class="jcate"></span>
					    		<span class="jsubj"></span>
					    		<span class="jnum sggCnt"></span>
					    	</a> 
					    </dt>
					    <dd id="rankChart_avg_worker_cnt" style="display:none;"> 
					    	<div class="chartAreaRela">
								<div id="typeCharts_avg_worker_cnt" class="chartSize02"></div>
								<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청,등록센서스(2016)</p> <!-- 2018.01.09 [개발팀] -->
					    	</div>  
					    </dd>
   						
   					<!-- 2017.09.14 개발팀 수정 종료-->
    				</dd>
    			</dl>
			</div>
			<!-- sigungu 시군구 기술업종 현황 end -->
			
			<!-- 2017.10.18 개발팀 추가 -->
			<div class="dataBoardDiv" id="technicalLqDiv">
				<div class="areaBox" id="technicalLqDivAreaBox" data-name="sido" data-admcd="00" data-classCd="11">adm_nm <span>dateYear</span></div>
					<button id="technicalLqPrevButton" class="MapBefore" onclick="javascript:$technicalBizMap.ui.doPrevRegionInfo('lq');" style="display:none;"></button>
					<dl class="dscList" id="lqIncreaseTab" style="display:none;">
						<dt class="mt15">
							<a href="javascript:void(0)">연도별 입지계수</a> <!-- 2018.01.11 [개발팀] 문구수정 -->
						</dt>
						<dd>
							<div class="dbTabs" id="technicalYearDbTabs">
					    		<a id="technicalYearDbTab_11" href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(11)" class="c01 on" data-name="11">첨단기술</a>
					    		<a id="technicalYearDbTab_12" href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(12)" class="c02" data-name="12">고기술</a>
					    		<a id="technicalYearDbTab_13" href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(13)" class="c03" data-name="13">중기술</a>
					    		<a id="technicalYearDbTab_14" href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(14)" class="c04" data-name="14">저기술</a>
					    		<a id="technicalYearDbTab_21" href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(21)" class="c05" data-name="21">창의 및 디지털</a>
					    		<a id="technicalYearDbTab_22" href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(22)" class="c06" data-name="22">ICT</a>
					    		<a id="technicalYearDbTab_23" href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(23)" class="c07" data-name="23">전문서비스</a>  
					    	</div>
					    	<!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
					    	<ul class="dbTabs01" id="subTechnicalYearList">
								<li id="subTechnicalYearList_00"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid('11')" class="on">전체현황</a></li>
						 		<li id="subTechnicalYearList_110"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid('110')">의료용 품짐 및 아앙 제조업</a></li>
						    	<li id="subTechnicalYearList_111"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid('111')">전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업</a></li>
						    	<li id="subTechnicalYearList_112"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid('112')">의료, 정밀, 광학기기 및 시계제조업</a></li>
						    	<li id="subTechnicalYearList_113"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid('113')">항공기, 우주선 및 부품 제조업</a></li>
						    	 
					 		</ul>
					    	<!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
					    	
					    	<div class="chartAreaRela">
					    		<p class="jdkIcon"><a href="javascript:void(0)" title="연도별 입지계수 변화 추이"><img src="/img/statsPotal/ico_about.png" alt="연도별 입지계수 변화 추이" /></a></p> <!-- 2018.01.11 [개발팀] 문구수정 -->
					    		<div id="lqColumCharts02" class="chartSize01"></div> 
					    		<div id="lqChartCheckZone">
					    			<!-- <div class="chtChkArea">
					    				<a href="javascript:void(0)" class="ckbtn on">
				    						<span class="ico"></span>
				    						<span class="txt">대전시</span>
				    					</a>
				    					<div class="item i01">사업체</div>
				    					<div class="item i02">종사자</div>
					    			</div>
					    			<div class="chtChkArea">
					    				<a href="javascript:void(0)" class="ckbtn on">
				    						<span class="ico"></span>
				    						<span class="txt">유성구</span>
				    					</a>
				    					<div class="item i03">사업체</div>
				    					<div class="item i04">종사자</div>
					    			</div> -->
					    		</div>
					    	</div> 
						</dd>
					</dl>			
					<dl class="dscList">
						<dt class="mt15">
					    	<a href="javascript:void(0)">기술업종별 지역 특성 정보</a>
					    </dt>
					    <dd>
					    <div class="dbTabs" id="technicalDbTabs">
					    	<a id="technicalDbTab_11" href="javascript:$technicalBizDataBoard.ui.changeLqInfo(11)" class="c01 on" data-name="11">첨단기술</a>
					    	<a id="technicalDbTab_12" href="javascript:$technicalBizDataBoard.ui.changeLqInfo(12)" class="c02" data-name="12">고기술</a>
					    	<a id="technicalDbTab_13" href="javascript:$technicalBizDataBoard.ui.changeLqInfo(13)" class="c03" data-name="13">중기술</a>
					    	<a id="technicalDbTab_14" href="javascript:$technicalBizDataBoard.ui.changeLqInfo(14)" class="c04" data-name="14">저기술</a>
					    	<a id="technicalDbTab_21" href="javascript:$technicalBizDataBoard.ui.changeLqInfo(21)" class="c05" data-name="21">창의 및 디지털</a>
					    	<a id="technicalDbTab_22" href="javascript:$technicalBizDataBoard.ui.changeLqInfo(22)" class="c06" data-name="22">ICT</a>
					    	<a id="technicalDbTab_23" href="javascript:$technicalBizDataBoard.ui.changeLqInfo(23)" class="c07" data-name="23">전문서비스</a>  
					    </div>
					    <!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
					    <ul class="dbTabs01" id="subTechnicalList">
							<li id="subTechnicalList_00"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfo('11')" class="on">전체현황</a></li>
						 	<li id="subTechnicalList_110"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfo('110')">의료용 품짐 및 아앙 제조업</a></li>
						    <li id="subTechnicalList_111"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfo('111')">전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업</a></li>
						    <li id="subTechnicalList_112"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfo('112')">의료, 정밀, 광학기기 및 시계제조업</a></li>
						    <li id="subTechnicalList_113"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfo('113')">항공기, 우주선 및 부품 제조업</a></li> 
					 	</ul>
					 	<!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
					 	<!-- <div class="noneAreaBox" id="lqInfoChartStandard">
							<div class="dbTabs" id="lqInfoChartStandardButton">
						    	<a href="javascript:void(0)" class="on">전국 대비</a>
						    	<a href="javascript:void(0)">경기도 대비</a> 
						    </div>
						</div> -->
								
				  		<div class="chartAreaRela" id="lqInfoChartRela">
				  			<div class="compareBox">
				  				
				  				<div class="noneAreaBox" id="lqInfoChartStandard"> <!-- 2018.01.15 [개발팀] -->
									<div class="dbTabs" id="lqInfoChartStandardButton">
						    			<a href="javascript:void(0)" class="on">전국 대비</a>
						    			<a href="javascript:void(0)">경기도 대비</a> 
						    		</div>
								</div>
						
				  				<div class="typeBox" style="position:absolute;top:2px;left:260px" id="lqInfoTypeBox"> <!-- 2018.01.15 [개발팀] -->
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('lqInfoLctChart','1');" class="first on">차트</a>
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('lqInfoLctChart','2');">표</a>
								</div>
								
								<div class="combineGrid" style="margin-top: -50px;">
	    							<a href="javascript:void(0)" class="btn_excelDownload" style="position: relative;">엑셀다운로드</a>
	    						</div>
								
								<a href="javascript:void(0)" class="ar" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다.<br/>(그래프에서 특정영역을 마우스로 드래그하면 확대하여 볼 수 있습니다.)<br/><br/>-입지계수(Location Quotient):상대적 특화도 지수로 불리는 입지계수는 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표<br/><br/>예시)입지계수 계산식(사업체기준):<br/>(해당지역 기술업종 사업체수 / 해당지역 전체기술업종 사업체수 ) / (기준지역 기술업종 사업체수 / 기준지역 전체 기술업종 사업체수)<br/><br/>*기준지역 : 전국 또는 시도 등의 기준이 되는지역"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;margin-top:1px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> <!-- 2018.01.22 [개발팀] -->
			    				<br>	
				  				<div id="lqInfoLctChart_1">
				  					<!-- <p class="sTit" style="top:45px;">종사자 LQ</p> -->
			    					<!-- <a href="javascript:void(0)" style="position:absolute;top:60px;left:500px;z-index:100" class="sBtn" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_help06.png" alt="도움말" /></a> -->
			    					<div id="lqInfoLctChart" class="chartSize01"></div>
			    					<!-- <p class="eTit">사업체 LQ</p> -->
			    					<!-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-335px;margin-left:300px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> -->
				  				</div>
				  				<div id="lqInfoLctChart_2" style="display:none;">
				  				</div>
				  			
				  			</div>
			    			<!-- <p class="sTit">종사자 LQ</p>
			    			<a href="javascript:void(0)" class="sBtn" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_help06.png" /></a>
			    			<div id="lqInfoLctChart" class="chartSize01"></div>
			    			<p class="eTit">사업체 LQ</p> -->
			    		</div>  
			    		<div class="ltListBox" style="margin-bottom:15px;"> <!-- 2018..01.02 [개발팀] -->
			    			<ul>
			    				<li>
				   					<span class="t01">사업체</span>
				   					<span class="t02"><span id="company_nm1">경기도는 사업체 기준&nbsp;&nbsp;</span><span id="company_nm2" class="txtBold cRed">ICT, 창의 디지털</span> <span id="company_nm2_append">업종이 전국과 비교하여 집적도가 높음</span></span>
				   				</li>
				   				<li>
				 					<span class="t01">종사자</span>
				   					<span class="t02"><span id="worker_nm1">경기도는 종사자 기준&nbsp;&nbsp;</span><span id="worker_nm2" class="txtBold cRed">전문서비스, ICT</span> <span id="worker_nm2_append">업종이 전국과 비교하여 집적도가 높음</span></span>
				   				</li>
				   			</ul>
				   		</div>
				   		<p class="timeTitle">조회년도 설정</p>
				   		<ul class="ysettingList" id="lqInfoYearSettingList">
				   			<li id="lqInfoYear_2006"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2006')">2006</a></li>
				   			<li id="lqInfoYear_2007"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2007')">2007</a></li>
				   			<li id="lqInfoYear_2008"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2008')">2008</a></li>
				   			<li id="lqInfoYear_2009"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2009')">2009</a></li>
				   			<li id="lqInfoYear_2010"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2010')">2010</a></li>
				   			<li id="lqInfoYear_2011"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2011')">2011</a></li>
				   			<li id="lqInfoYear_2012"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2012')">2012</a></li>
				   			<li id="lqInfoYear_2013"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2013')">2013</a></li>
				   			<li id="lqInfoYear_2014"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2014')">2014</a></li>
				   			<li id="lqInfoYear_2015"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2015')">2015</a></li>
				   			<li id="lqInfoYear_2016"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoard('2016')" class="on">2016</a></li>
				   		</ul>
				   	</dd> 
				</dl>
			</div>
			<!-- 2017.10.18 개발팀 추가 -->
			
			<!-- 2017.10.30 개발팀 추가 -->
			
			<div class="dataBoardDiv" id="technicalSearch">
				<div class="areaBox" id="technicalSearchDivAreaBox">시군구 지역별 정보 현황</div>
				<dl class="dscList"> 
					<dt class="mt15">
						<a href="javascript:void(0)">조건설정 목록</a>
					</dt>
					<dd>
						<div class="btListBox t01" id="technicalSearcParamInfo">
					    	<a href="javascript:void(0)">
			    				<span class="t01">업종선택</span>
			    				<span class="t02">미선택</span>
			    			</a>
			    			<a href="javascript:void(0)">
			    				<span class="t01">사업체 입지계수</span>
			    				<span class="t02">1.0~1.5</span>
			    			</a>
			    			<a href="javascript:void(0)">
			    				<span class="t01">종사자 입지계수</span>
			    				<span class="t02">미선택</span>
			    			</a>
			    			<a href="javascript:void(0)">
			    				<span class="t01">창업  지원시설</span>
			    				<span class="t02">포함</span>
			    			</a>
			    			<a href="javascript:void(0)">
			    				<span class="t01">산업단지</span>
			    				<span class="t02">미포함</span>
			    			</a> 
					    </div>
					</dd>
					
					<dt class="mt15">
						<a href="javascript:void(0)">비교지역 목록</a> 
					</dt>
					<dd>
						<div class="dbTabs type01" id="techbizSearchTabList" style="height : 35px;">
					    	<a href="javascript:$technicalBizDataBoard.ui.initSearchGridTechBizSggGridInfo()" class="on">검색지역 리스트</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.initSearchGridTechBizCorpGraph()">사업체 <br>입지계수</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.initSearchGridTechBizWorkerGraph()">종사자<br>입지계수</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.initSearchGridSupplyInfo()">창업지원시설</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.initSearchGridIndustry()">산업단지</a> 
						</div>
					    <div class="chartAreaRela full cellType">  
					    	<div class="carRight">
					    		<p id="searchTechBizCheckBoxList">
									<a href="javascript:$technicalBizDataBoard.ui.searchCheckBoxChange(0)" class="ckbtn">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.ui.searchCheckBoxChange(1)" class="ckbtn">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.ui.searchCheckBoxChange(2)" class="ckbtn">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.ui.searchCheckBoxChange(3)" class="ckbtn">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.ui.searchCheckBoxChange(4)" class="ckbtn">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.ui.searchCheckBoxChange(5)" class="ckbtn">
					    				<span class="ico"></span>
					    			</a>
					    			<a href="javascript:$technicalBizDataBoard.ui.searchCheckBoxChange(6)" class="ckbtn">
					    				<span class="ico"></span>
					    			</a>
					    		</p>
							</div>
						</div>
					    <div class="dbTabs">
					    	<a href="javascript:$technicalBizDataBoard.ui.searchTabBoxChange(0);" class="c01">첨</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.searchTabBoxChange(1);" class="c02">고</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.searchTabBoxChange(2);" class="c03">중</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.searchTabBoxChange(3);" class="c04">저</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.searchTabBoxChange(4);" class="c05">창</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.searchTabBoxChange(5);" class="c06">ICT</a>
					    	<a href="javascript:$technicalBizDataBoard.ui.searchTabBoxChange(6);" class="c07">서</a>  
					    </div> 
					    <a href="javascript:$technicalBizMap.ui.areaSelectSearch(0)" class="selSslBtn">지역 비교하기</a>
						<p class="nTitle" id="techBizSggCount">총 6개 시군구 검색 완료</p>
					    <ul class="areaList01" id="techBizSggGridTable">
					    	<li>
					    		<div class="rela">
					    			<span class="tit">경기도 화성시</span>
					    			<div class="sikunBox">
					    				<span class="b01">첨</span>
						    			<span class="b02">고</span>
						    			<span class="b03">중</span>
					    			</div>
					    			<a href="javascript:void(0)">상세정보</a>
					    		</div>
					    	</li>
					    	<li>
					    		<div class="rela">
					    			<span class="tit">대전시 유성시</span>
					    			<div class="sikunBox">
					    				<span class="b04">저</span>
						    			<span class="b05">창</span>
						    			<span class="b06">ICT</span>
					    			</div>
					    			<a href="javascript:void(0)">상세정보</a>
					    		</div>
					    	</li>
					    	<li>
					    		<div class="rela">
					    			<span class="tit">서울시 강남구</span>
					    			<div class="sikunBox">
					    				<span class="b07">서</span> 
					    			</div>
					    			<a href="javascript:void(0)">상세정보</a>
					    		</div>
					    	</li>
					    	<li>
					    		<div class="rela">
					    			<span class="tit">경기도 군포시</span>
					    			<div class="sikunBox">
					    				<span class="b07">서</span> 
					    			</div>
					    			<a href="javascript:void(0)">상세정보</a>
					    		</div>
					    	</li>
					    	<li>
					    		<div class="rela">
					    			<span class="tit">경기도 화성시</span>
					    			<div class="sikunBox">
					    				<span class="b01">고</span>
						    			<span class="b02">중</span>
						    			<span class="b03">서</span>
					    			</div>
					    			<a href="javascript:void(0)">상세정보</a>
					    		</div>
					    	</li>
					    	<li>
					    		<div class="rela">
					    			<span class="tit">경기도 화성시</span>
					    			<div class="sikunBox">
					    				<span class="b01">고</span>
						    			<span class="b02">중</span>
						    			<span class="b03">서</span>
					    			</div>
					    			<a href="javascript:void(0)">상세정보</a>
					    		</div>
					    	</li>
					    </ul>
					</dd>  
				</dl>
			</div>
			
			<!-- 2017.10.30 개발팀 종료 -->
			
			<!-- 2017.11.20 개발팀 추가 -->
			<div class="dataBoardDiv" id="technicalSearchDetail">
				<div class="areaBox" id="technicalSearchAdmNm">검색 지역</div>
				<button class="MapBefore" onclick="javascript:$technicalBizMap.ui.doPrevRegionInfo('search');"></button>
				<dl class="dscList">
				 	<dt class="mt15 botype">
    					<a href="javascript:void(0)">지역 종합 통계 정보</a>
    				</dt>
    				<dd>
    					<div class="norRela">
    						<div class="dscTextCont on" id="searchDetailStatsInfoTab01_Btn01">
				    			<p class="t01">총 사업체 수 <span id="totalSearchCorpCnt">0(개)</span></p>
				    			<p class="t02">사업체 대비 지원시설 : <span id="searchTechbizAvgTxt"></span></p>
				    		</div>
				    		
				    		<div class="dscTextCont" id="searchDetailStatsInfoTab01_Btn02">
				    			<p class="t01">총 종사자 수 <span id="totalSearchWorkerCnt">0(명)</span></p>
				    			<p class="t02">종사자 대비 지원시설 : <span id="searchWorkerAvgTxt"></span></p>
				    		</div>
    					</div>
    					
    					
    					<div class="dbTabs mt20">
    						<a id="searchDetailStatsInfoTab02_Btn01" class="searchDetailStatsInfoTab02 on" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab02('1')">기술업종별 <span class="searchDetailSynthesizeStatsInfo02_type">사업체</span> 수(<span class="searchDetailStatsInfo02_unit">개</span>)</a>
    						<a id="searchDetailStatsInfoTab02_Btn02" class="searchDetailStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab02('2')">기술업종별 <span class="searchDetailSynthesizeStatsInfo02_type">사업체</span> 비율(%)</a>
    						<a id="searchDetailStatsInfoTab02_Btn03" class="searchDetailStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab02('3')">기술업종별 <span class="searchDetailSynthesizeStatsInfo02_type">사업체</span> 증감(<span class="searchDetailStatsInfo02_unit">%</span>)</a>  
    						<a id="searchDetailStatsInfoTab02_Btn04" class="searchDetailStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab02('4')">기술업종별  입지계수</a>
    					</div> 
    					<div class="dbTabs type01" id="searchDetailInfoTab03">
    						<a id="searchDetailStatsInfoTab03_Btn00" class="searchDetailStatsInfoTab03 on" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('0')">전체현황</a>
    						<a id="searchDetailStatsInfoTab03_Btn01" class="searchDetailStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('1')">첨단기술</a>
    						<a id="searchDetailStatsInfoTab03_Btn02" class="searchDetailStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('2')">고기술</a>
    						<a id="searchDetailStatsInfoTab03_Btn03" class="searchDetailStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('3')">중기술</a>
    						<a id="searchDetailStatsInfoTab03_Btn04" class="searchDetailStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('4')">저기술</a>
    						<a id="searchDetailStatsInfoTab03_Btn05" class="searchDetailStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('5')">창의/디지털</a>
    						<a id="searchDetailStatsInfoTab03_Btn06" class="searchDetailStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('6')">ICT</a>
    						<a id="searchDetailStatsInfoTab03_Btn07" class="searchDetailStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaInfoTab03('7')">전문서비스</a>  
    					</div>
    					
    					<div class="chartAreaRela searchDetailStatsInfoChart" id="searchDetailStatsInfo01Div">
    						<p class="etcText05 mt30"></p>
    						<div id="searchDetailStatsInfoChart01" ></div>
    						<ul class="techLegend02">
    							<li class="ico03"></li>
    							<li class="ico02"></li>
    						</ul>
    						<p class="etcRight05" style="margin-top:40px;">출처 : 통계청,전국사업체조사(2016)</p> <!-- 2018.01.09 [개발팀]-->
    					</div>   
						<div class="chartAreaType02 t01 mt20 searchDetailStatsInfoChart" id="searchDetailStatsInfoChart02Div" style="height: auto;">
							<div id="searchDetailStatsInfoChart02" style="width: 200px; height: 200px; float: left;"></div>
							<div class="typelabel" style="height: auto;"></div>
							<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p> <!-- 2018.01.09 [개발팀]-->
						</div>
						<div class="chartAreaRela searchDetailStatsInfoChart" id="searchDetailStatsInfoChart03Div">
    						<p class="etcText05 mt30"></p>
    						<div id="searchDetailStatsInfoChart03" class="chartSize02"></div> 
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p> <!-- 2018.01.09 [개발팀]-->
    					</div>
    					
    					<div id="searchDetailStatsInfoChart04Div" class="chartAreaRela searchDetailStatsInfoChart">
    						
    						<div class="chartAreaRela">
    							<div class="compareBox">
    								<div class="noneAreaBox">
	    								<div class="dbTabs">
	    									<a href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaBizLctChart('country')" class="on">전국 대비</a>	
	    									<a href="javascript:$technicalBizDataBoard.ui.changeSearchDetailAreaBizLctChart('sido');">시도 대비</a> 
	    								</div>
			    					</div>  
    								<div class="typeBox" style="position:absolute;top:2px;left:260px">
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('searchDetailStatsInfoChart04','1');" class="first on">차트</a>
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('searchDetailStatsInfoChart04','2');">표</a>
									</div>
									<a href="javascript:void(0)" class="ar" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다.<br/>(그래프에서 특정영역을 마우스로 드래그하면 확대하여 볼 수 있습니다.)<br/><br/>-입지계수(Location Quotient):상대적 특화도 지수로 불리는 입지계수는 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표<br/><br/>예시)입지계수 계산식(사업체기준):<br/>(해당지역 기술업종 사업체수 / 해당지역 전체기술업종 사업체수 ) / (기준지역 기술업종 사업체수 / 기준지역 전체 기술업종 사업체수)<br/><br/>*기준지역 : 전국 또는 시도 등의 기준이 되는지역"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> <!-- 2018.01.22 [개발팀] -->
									<div id="searchDetailStatsInfoChart04_1">
										<!-- <p class="sTit" style="top:30px">종사자 LQ</p> -->
    									<div id="searchDetailStatsInfoChart04" class="chartSize01"></div> 
    									<!-- <p class="eTit">사업체 LQ</p> -->
    									<!-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-335px;margin-left:300px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> -->
									</div>
									<div id="searchDetailStatsInfoChart04_2" style="display:none;">

									</div>
    								
    							
    							</div>
    							<!-- <p class="sTit">종사자 LQ</p> -->
    							<!-- <a href="javascript:void(0)" class="sBtn" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_help06.png" /></a> -->
    							<!-- <div id="technicalLctChart" class="chartSize01"></div> -->
    							<%-- <div id="searchDetailStatsInfoChart04" class="chartSize01"></div> 
    							<p class="eTit">사업체 LQ</p>
    							<a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="${paramInfo.tooltipList.E0004}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> --%>
    						</div>  
    						<div class="ltListBox">	
    							<ul>
    								<li>
    									<span class="t01">사업체</span>
    									<span class="t02" id="searchDetailLctCorpText"><span id="searchDetailLctCorpTextAdmNm" class="txtBold cRed">경기도</span>는 사업체 기준&nbsp;&nbsp;<span id="searchDetailLctCorpMclassNm" class="txtBold cRed"></span><span id="searchDetailLctCorpMclassNm_append"> 업종이 전국과 비교하여 집적도가 높음</span></span>
    								</li>
    								<li>
    									<span class="t01">종사자</span>
    									<span class="t02" id="searchDetailLctWorkerText"><span id="searchDetailLctWorkerTextAdmNm" class="txtBold cRed">경기도</span>는 종사자 기준&nbsp;&nbsp;<span id="searchDetailLctWorkerMclassNm" class="txtBold cRed"></span><span id="searchDetailLctWorkerMclassNm_append"> 업종이 전국과 비교하여 집적도가 높음</span></span>
    								</li>
    							</ul>
		    				</div>
    					</div>
    					
    					
    				</dd>
				</dl>
				
			</div>
			<!-- 2017.11.20 개발팀 추가 종료 -->
			<!-- density 업종밀집도 변화 start -->
			<div class="dataBoardDiv" id="densityDiv">
				<div class="areaBox" id="densityAdmTitle">
   					<!-- <a href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp();void(0);" class="abBtnRight">신설법인  OFF</a> -->
   				</div>
   				<button class="MapBefore" onclick="javascript:$technicalBizMap.ui.doPrevRegionInfo('density');" style="display:none;"></button>
   				<dl class="dscList"> 
    				<dt class="mt15">
    					<a href="javascript:void(0)">기술업종 분류별 사업체 수</a>
    				</dt>
    				<dd>
    					<div class="dbTabs">
    						<a id="m_class_00" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('0','0');void(0);">전체현황</a>
    						<a id="m_class_11" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('11','11');void(0);" class="on">첨단기술</a>
    						<a id="m_class_12" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('12','12');void(0);">고기술</a> 
    						<a id="m_class_13" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('13','13');void(0);">중기술</a>
    						<a id="m_class_14" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('14','14');void(0);">저기술</a>
    						<a id="m_class_21" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('21','21');void(0);">창의/디지털</a>
    						<a id="m_class_22" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('22','22');void(0);">ICT</a>
    						<a id="m_class_23" href="javascript:$technicalBizDataBoard.ui.changeDensityTab('23','23');void(0);">전문서비스</a>
    					</div>
    					<!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
    					<!-- <ul class="dbTabs01" id="tab_11">
    						<li><a id="s_class_11" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('11');void(0);">전체현황</a></li>
    						<li><a id="s_class_110" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('110');void(0);">의료용 물질 및 의약품 제조업</a></li>
							<li><a id="s_class_111" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('111');void(0);">전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업</a></li>
							<li><a id="s_class_112" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('112');void(0);">의료, 정밀, 광학기기 및 시계제조업</a></li>
							<li><a id="s_class_113" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('113');void(0);">항공기, 우주선 및 부품 제조업</a></li>
	    				</ul>
    					<ul class="dbTabs01" id="tab_12">
    						<li><a id="s_class_12" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('12');void(0);">전체현황</a></li>
    						<li><a id="s_class_120" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('120');void(0);">화학물질 및 화학제품 제조업</a></li>
							<li><a id="s_class_121" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('121');void(0);">전기장비 제조업</a></li>
							<li><a id="s_class_122" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('122');void(0);">기타 기계 및 장비 제조업</a></li>
							<li><a id="s_class_123" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('123');void(0);">자동차 및 트레일러 제조업</a></li>
							<li><a id="s_class_124" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('124');void(0);">기타 운송장비 제조업</a></li>
	    				</ul>
    					<ul class="dbTabs01" id="tab_13">
    						<li><a id="s_class_13" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('13');void(0);">전체현황</a></li>
    						<li><a id="s_class_130" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('130');void(0);">코크스, 연탄 및 석유정제품 제조업</a></li>
							<li><a id="s_class_131" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('131');void(0);">고무제품 및 플라스틱 제조업</a></li>
							<li><a id="s_class_132" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('132');void(0);">비금속 광물제품 제조업</a></li>
							<li><a id="s_class_133" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('133');void(0);">1차 금속 제조업</a></li>
							<li><a id="s_class_134" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('134');void(0);">금속가공제품 제조업</a></li>
							<li><a id="s_class_135" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('135');void(0);">선박 및 보트 건조업</a></li>
    					</ul>
    					<ul class="dbTabs01" id="tab_14">
    						<li><a id="s_class_14" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('14');void(0);">전체현황</a></li>
    						<li><a id="s_class_140" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('140');void(0);">식료품 제조업</a></li>
							<li><a id="s_class_141" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('141');void(0);">음료 제조업</a></li>
							<li><a id="s_class_142" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('142');void(0);">담배 제조업</a></li>
							<li><a id="s_class_143" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('143');void(0);">섬유제품 제조업_의복복 제외</a></li>
							<li><a id="s_class_144" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('144');void(0);">의복, 의복액세서리 및 모피제품 제조업</a></li>
							<li><a id="s_class_145" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('145');void(0);">가죽 가방 및 신발 제조업</a></li>
							<li><a id="s_class_146" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('146');void(0);">목재 및 나무제품 제조업</a></li>
							<li><a id="s_class_147" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('147');void(0);">펄프, 종이 및 종이제품 제조업</a></li>
							<li><a id="s_class_148" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('148');void(0);">인쇄 및 기록매체 복제업</a></li>
							<li><a id="s_class_149" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('149');void(0);">가구 제조업</a></li>
							<li><a id="s_class_14A" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('14A');void(0);">기타제품 제조업</a></li>
    					</ul>
    					<ul class="dbTabs01" id="tab_21">
    						<li><a id="s_class_21" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('21');void(0);">전체현황</a></li>
    						<li><a id="s_class_210" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('210');void(0);">출판, 광고, 영화</a></li>
							<li><a id="s_class_211" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('211');void(0);">영상, 오디어 기록물 제작 및 배급업</a></li>
							<li><a id="s_class_212" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('212');void(0);">영화, 비디오물 및 방송프로그램 제작업</a></li>
							<li><a id="s_class_213" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('213');void(0);">영화, 비디오물 및 방송프로그램 제작 관련 서비스업</a></li>
							<li><a id="s_class_214" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('214');void(0);">음악 및 기타 오디오물 출판업</a></li>
							<li><a id="s_class_215" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('215');void(0);">오락, 뉴스 활동 및 박물관</a></li>
    					</ul>
    					<ul class="dbTabs01" id="tab_22">
    						<li><a id="s_class_22" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('22');void(0);">전체현황</a></li>
    						<li><a id="s_class_220" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('220');void(0);">소프트웨어개발 및 공급업</a></li>
							<li><a id="s_class_221" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('221');void(0);">하드웨어, 소프트웨어 컨설팅</a></li>
							<li><a id="s_class_222" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('222');void(0);">전기통신업</a></li>
							<li><a id="s_class_223" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('223');void(0);">컴퓨터 프로그래밍, 시스템 통합 및 관리업</a></li>
							<li><a id="s_class_224" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('224');void(0);">정보서비스업</a></li>
							<li><a id="s_class_225" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('225');void(0);">데이터 프로세싱, 데이터 베이스 작업</a></li>
    					</ul>
    					<ul class="dbTabs01" id="tab_23">
    						<li><a id="s_class_23" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('23');void(0);">전체현황</a></li>
	    					<li><a id="s_class_230" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('230');void(0);void(0);">연구개발업</a></li>
							<li><a id="s_class_231" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('231');void(0);void(0);">전문서비스업</a></li>
							<li><a id="s_class_232" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('232');void(0);void(0);">법무ㆍ회계ㆍ건축 서비스</a></li>
							<li><a id="s_class_233" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('233');void(0);void(0);">광고대행업 및 전시광고업</a></li>
							<li><a id="s_class_234" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('234');void(0);void(0);">시장조사 및 여론조사업</a></li>
							<li><a id="s_class_235" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('235');void(0);void(0);">경영컨설팅업</a></li>
							<li><a id="s_class_236" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('236');void(0);void(0);">건축기술, 엔지니어링 및 기타 과학기술 서비스업</a></li>
							<li><a id="s_class_237" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('237');void(0);void(0);">기타 전문, 과학 및 기술 서비스업</a></li>
							<li><a id="s_class_238" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('238');svoid(0);void(0);">사업지원 서비스업</a></li>
    					</ul> -->
    					<ul class="dbTabs01" id="tab_11">
    						<li><a id="s_class_11" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('11');void(0);">전체현황</a></li>
    						<li><a id="s_class_110" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('110');void(0);">의료용 물질 및 의약품 제조업</a></li>
							<li><a id="s_class_111" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('111');void(0);">전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업</a></li>
							<li><a id="s_class_112" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('112');void(0);">의료, 정밀, 광학기기 및 시계제조업</a></li>
							<li><a id="s_class_113" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('113');void(0);">항공기, 우주선 및 부품 제조업</a></li>
	    				</ul>
    					<ul class="dbTabs01" id="tab_12">
    						<li><a id="s_class_12" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('12');void(0);">전체현황</a></li>
    						<li><a id="s_class_120" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('120');void(0);">화학물질 및 화학제품 제조업</a></li>
							<li><a id="s_class_121" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('121');void(0);">전기장비 제조업</a></li>
							<li><a id="s_class_122" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('122');void(0);">기타 기계 및 장비 제조업</a></li>
							<li><a id="s_class_123" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('123');void(0);">자동차 및 트레일러 제조업</a></li>
							<li><a id="s_class_124" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('124');void(0);">기타 운송장비 제조업</a></li>
	    				</ul>
    					<ul class="dbTabs01" id="tab_13">
    						<li><a id="s_class_13" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('13');void(0);">전체현황</a></li>
    						<li><a id="s_class_130" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('130');void(0);">코크스, 연탄 및 석유정제품 제조업</a></li>
							<li><a id="s_class_131" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('131');void(0);">고무제품 및 플라스틱 제조업</a></li>
							<li><a id="s_class_132" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('132');void(0);">비금속 광물제품 제조업</a></li>
							<li><a id="s_class_133" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('133');void(0);">1차 금속 제조업</a></li>
							<li><a id="s_class_134" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('134');void(0);">금속가공제품 제조업</a></li>
							<li><a id="s_class_135" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('135');void(0);">선박 및 보트 건조업</a></li>
    					</ul>
    					<ul class="dbTabs01" id="tab_14">
    						<li><a id="s_class_14" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('14');void(0);">전체현황</a></li>
    						<li><a id="s_class_140" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('140');void(0);">식료품 제조업</a></li>
							<li><a id="s_class_141" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('141');void(0);">음료 제조업</a></li>
							<li><a id="s_class_142" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('142');void(0);">담배 제조업</a></li>
							<li><a id="s_class_143" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('143');void(0);">섬유제품 제조업_의복복 제외</a></li>
							<li><a id="s_class_144" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('144');void(0);">의복, 의복액세서리 및 모피제품 제조업</a></li>
							<li><a id="s_class_145" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('145');void(0);">가죽 가방 및 신발 제조업</a></li>
							<li><a id="s_class_146" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('146');void(0);">목재 및 나무제품 제조업</a></li>
							<li><a id="s_class_147" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('147');void(0);">펄프, 종이 및 종이제품 제조업</a></li>
							<li><a id="s_class_148" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('148');void(0);">인쇄 및 기록매체 복제업</a></li>
							<li><a id="s_class_149" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('149');void(0);">가구 제조업</a></li>
							<li><a id="s_class_14A" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('14A');void(0);">기타제품 제조업</a></li>
    					</ul>
    					<ul class="dbTabs01" id="tab_21">
    						<li><a id="s_class_21" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('21');void(0);">전체현황</a></li>
    						<li><a id="s_class_210" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('210');void(0);">서적, 잡지 및 기타 인쇄물 출판업</a></li>
							<li><a id="s_class_211" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('211');void(0);">영화, 비디오물, 방송프로그램 제작 및 배급업</a></li>
							<li><a id="s_class_212" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('212');void(0);">음악 및 오디오물 출판 및 원판 녹음업</a></li>
							<li><a id="s_class_213" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('213');void(0);">방송업</a></li>
							<!-- <li><a id="s_class_214" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('214');void(0);">음악 및 기타 오디오물 출판업</a></li>
							<li><a id="s_class_215" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('215');void(0);">오락, 뉴스 활동 및 박물관</a></li> -->
    					</ul>
    					<ul class="dbTabs01" id="tab_22">
    						<li><a id="s_class_22" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('22');void(0);">전체현황</a></li>
    						<li><a id="s_class_220" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('220');void(0);">소프트웨어개발 및 공급업</a></li>
							<li><a id="s_class_221" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('221');void(0);">전기통신업</a></li>
							<li><a id="s_class_222" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('222');void(0);">컴퓨터 프로그래밍, 시스템 통합 및 관리업</a></li>
							<li><a id="s_class_223" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('223');void(0);">정보서비스업</a></li>
							<!-- <li><a id="s_class_224" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('224');void(0);">정보서비스업</a></li>
							<li><a id="s_class_225" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('225');void(0);">데이터 프로세싱, 데이터 베이스 작업</a></li> -->
    					</ul>
    					<ul class="dbTabs01" id="tab_23">
    						<li><a id="s_class_23" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('23');void(0);">전체현황</a></li>
	    					<li><a id="s_class_230" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('230');void(0);void(0);">연구개발업</a></li>
							<li><a id="s_class_231" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('231');void(0);void(0);">법무ㆍ회계ㆍ건축 서비스</a></li>
							<li><a id="s_class_232" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('232');void(0);void(0);">광고대행업 및 전시광고업</a></li>
							<li><a id="s_class_233" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('233');void(0);void(0);">시장조사 및 여론조사업</a></li>
							<li><a id="s_class_234" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('234');void(0);void(0);">경영컨설팅업</a></li>
							<li><a id="s_class_235" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('235');void(0);void(0);">건축기술, 엔지니어링 및 기타 과학기술 서비스업</a></li>
							<li><a id="s_class_236" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('236');void(0);void(0);">기타 전문, 과학 및 기술 서비스업</a></li>
							<li><a id="s_class_237" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('237');void(0);void(0);">사업지원 서비스업</a></li>
							<!-- <li><a id="s_class_238" href="javascript:$technicalBizDataBoard.ui.changeDensitySubTab('238');svoid(0);void(0);">사업지원 서비스업</a></li> -->
    					</ul>
    					<!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
	    			</dd>
	    			<dt class="mt15">
    					<a id="densitySummaryTitle" href="javascript:void(0)">2014 총사업체 2,542개</a>
    				</dt>
    				<dd> 
    					<p class="timeTitle">시계열별 데이터 조회</p>
    					<div class="timeAreaCharts" id="timeAreaCharts01"></div>
    					
    					<p class="timeTitle">조회년도 설정</p>
    					<ul id="densityBaseYearList" class="ysettingList">
    						<li><a id="densityBaseYear_2006" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2006');void(0);">2006</a></li>
    						<li><a id="densityBaseYear_2007" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2007');void(0);">2007</a></li>
    						<li><a id="densityBaseYear_2008" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2008');void(0);">2008</a></li>
    						<li><a id="densityBaseYear_2009" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2009');void(0);">2009</a></li>
    						<li><a id="densityBaseYear_2010" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2010');void(0);">2010</a></li>
    						<li><a id="densityBaseYear_2011" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2011');void(0);">2011</a></li>
    						<li><a id="densityBaseYear_2012" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2012');void(0);">2012</a></li>
    						<li><a id="densityBaseYear_2013" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2013');void(0);">2013</a></li>
    						<li><a id="densityBaseYear_2014" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2014');void(0);">2014</a></li>
    						<li><a id="densityBaseYear_2015" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2015');void(0);">2015</a></li>
    						<li><a id="densityBaseYear_2016" href="javascript:$technicalBizDataBoard.ui.changeDensityBaseYear('2015');void(0);" class="on">2016</a></li>
    					</ul>
    					<ul id="newCorpBaseYearList" class="ysettingList" style="display:none;">
    						<li><a id="newCorpBaseYear_2009" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2009');void(0);">2009</a></li>
    						<li><a id="newCorpBaseYear_2010" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2010');void(0);">2010</a></li>
    						<li><a id="newCorpBaseYear_2011" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2011');void(0);">2011</a></li>
    						<li><a id="newCorpBaseYear_2012" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2012');void(0);">2012</a></li>
    						<li><a id="newCorpBaseYear_2013" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2013');void(0);">2013</a></li>
    						<li><a id="newCorpBaseYear_2014" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2014');void(0);">2014</a></li>
    						<li><a id="newCorpBaseYear_2015" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2015');void(0);" class="on">2015</a></li>
    						<li><a id="newCorpBaseYear_2016" href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp('2016');void(0);" class="on">2016</a></li>
    					</ul>
    					<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p>
    				</dd>
    				<dd class="specializedInfo" style="display: none;">
    					<p class="timeTitle mt20">특화정보 설정</p>
    					<ul class="ysettingList">
    						<li><a href="javascript:$technicalBizDataBoard.ui.changeDensityNewCorp();void(0);">신설법인</a></li> 
    					</ul>
    				</dd>
    			</dl>
			</div>			
			<!-- density 업종밀집도 변화 현황 end -->
			
			<!-- 지원시설 - 지역통계 현황 & 창업지원시설 현황 Start -->
			<div class="dataBoardDiv" id="supplyDiv">
				<div class="areaBox">전국 시도별 현황</div>
   				<div class="dscList"> 
    				<div>
    					<div class="dbTabs">
    						<a id="changeSupplyTabBtn01" href="javascript:$technicalBizDataBoard.ui.changeSupplyTab('1')" class="on">지역통계 현황</a>
    						<a id="changeSupplyTabBtn02" href="javascript:$technicalBizDataBoard.ui.changeSupplyTab('2')">창업지원시설 현황</a>  
    					</div>
    					
    					<div class="chartAreaRela supplyAreaStateDiv" style="display: none;">
    						<div class="carLeft">
    							<p>
    								<a href="javascript:$technicalBizDataBoard.ui.changeSupplyMap('1')" id="supplyMapBtn01" class="supplyMap ckbtn on" style="width: 160px;">
	   									<span class="ico"></span>
	   									<span class="txt" style="text-align: center; width: 120px;;">기술업종 사업체</span>
	   								</a>
    							</p>
    							<div class="chartSize03" id="enterpriseBarCharts01"></div> 
    						</div>
   							<ul class="carLabel supplyAreaStateChartLabel">
   								<li>전국평균</li>
   								<li>서울특별시</li>
   								<li>부산광역시</li>
   								<li>대구광역시</li>
   								<li>인천광역시</li>
   								<li>광주광역시</li>
   								<li>대전광역시</li>
   								<li>울산광역시</li>
   								<li>세종특별차치도</li>
   								<li>경기도</li>
   								<li>강원도</li>
   								<li>충청북도</li>
   								<li>충청남도</li>
   								<li>전라북도</li>
   								<li>전라남도</li>
   								<li>경상북도</li>
   								<li>경상남도</li>
   								<li>제주특별자치도</li>
   							</ul>
    						<div class="carRight">
    							<p>
    								<a href="javascript:$technicalBizDataBoard.ui.changeSupplyMap('2')" id="supplyMapBtn02" class="supplyMap ckbtn" style="width: 160px;">
    									<span class="ico"></span>
    									<span class="txt" style="text-align: center; width: 120px;;">기술업종 종사자</span>
    								</a>
    							</p>
    							<div class="chartSize03" id="professionalBarCharts02"></div> 
    						</div>
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 중소기업청,벤처창업일지 114</p>
    					</div>
    					
    					<div class="chartAreaRela full startUpSupplyDiv" style="display: none;">      					
    						<div class="carRight chgCkbox">
    							<p>
    								<a href="javascript:void(0)" class="ckbtn c01 on" id="startUpSupplyLctType_1" title="<p>벤처기업 직접시설, 벤처기업 육성 촉진지구,<br/>신기술 창업 집적지역 등</p>">
    									<span class="ico"></span>
    									<span class="txt" style="margin-left:-25px;">기업집적</span>
    								</a>
    								<a href="javascript:void(0)" class="ckbtn c02 on" id="startUpSupplyLctType_2" title="<p>1인 창조 기업 비즈니스센터,<br/>시니어 창업센터 등</p>">
    									<span class="ico"></span>
    									<span class="txt" style="margin-left:-25px;">비즈니스센터</span>
    								</a>
    								<a href="javascript:void(0)" class="ckbtn c03 on" id="startUpSupplyLctType_3" title="<p>정부에서 지정한 대학ㆍ연구소 등의<br/>창업보육센터</p>">
    									<span class="ico"></span>
    									<span class="txt" style="margin-left:-25px;color:#fff;">창업보육센터</span> <!-- 2018.01.02 [개발팀] -->
    								</a>
    								<a href="javascript:void(0)" class="ckbtn c04 on" id="startUpSupplyLctType_4" title="<p>창업을 지원하는 밴처캐티탈<br/>투자회사</p>">
    									<span class="ico"></span>
    									<span class="txt" style="margin-left:-25px;">창업투자회사</span>
    								</a>
    							</p>
    							<div class="chartSize03" id="startUpSupplyBarChart01"></div> 
	    						<br/>
	    						<div>※ 창업지원시설 현황은  중소기업청에서 제공한 벤처창업입지114정보를 활용하고 있습니다.</div>
    						</div>
    					</div>		
    					
	    			</div>
    			</div>
			</div>
			
			<!-- 지원시설 - 지역통계 현황 & 창업지원시설 현황  End -->
			
			<!-- 지원시설 - 해당지역 상세보기  Start -->
			<div class="dataBoardDiv" id="supplyDetailDiv">
   				<!-- <p class="dbText01">17개 주요 시도별 생활업종현황</p> -->
   				<div class="areaBox">경기도</div>
   				<button class="MapBefore" onclick="javascript:$technicalBizMap.ui.doPrevRegionInfo('supply');"></button> 
   				<dl class="dscList"> 
    				<dt class="mt15 botype">
    					<a href="javascript:void(0)">지역 종합 통계 정보</a>
    				</dt>
    				<dd>
    					<div class="norRela">
    					<!-- 2017.09.28 개발팀 수정 시작 -->
	    					<!-- <ul class="dbTabs02">
		    					<li><a id="changeSupplyAreaSynthesizeStatsInfoTab01_Btn01" class="changeSupplyAreaSynthesizeStatsInfoTab01 on" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab01('1')">총사업체<span id="totalSupplyCorpCnt">0(개)</span></a></li>
		    					<li><a id="changeSupplyAreaSynthesizeStatsInfoTab01_Btn02" class="changeSupplyAreaSynthesizeStatsInfoTab01" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab01('2')">총종사자<span id="totalSupplyWorkerCnt">0(명)</span></a></li>  
		    				</ul>
		    				<ul class="techLegend01">
    							<li>사업체 대비 지원시설 : <span id="supplyTechbizAvgTxt"></span></li>
    							<li>종사자 대비 지원시설 : <span id="supplyWorkerAvgTxt"></span></li>
    							<li>인구 대비 지원시설: <span id="supplyResidPpltnAvgTxt"></span></li>
    						</ul> -->
    						
    						<div class="dscTextCont on" id="changeSupplyAreaSynthesizeStatsInfoTab01_Btn01">
				    			<p class="t01">총 사업체 수 <span id="totalSupplyCorpCnt">0(개)</span></p>
				    			<p class="t02">사업체 대비 지원시설 : <span id="supplyTechbizAvgTxt"></span></p>
				    		</div>
				    		
				    		<div class="dscTextCont" id="changeSupplyAreaSynthesizeStatsInfoTab01_Btn02">
				    			<p class="t01">총 종사자 수 <span id="totalSupplyWorkerCnt">0(명)</span></p>
				    			<p class="t02">종사자 대비 지원시설 : <span id="supplyWorkerAvgTxt"></span></p>
				    		</div>
    						<!-- 2017.09.28 개발팀 수정 종료 -->
   						</div>
   						
   						<!-- 2017.09.28 개발팀 수정 시작 -->
    					<div class="dbTabs mt20 techDataboardTab">
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab02_Btn01" class="changeSupplyAreaSynthesizeStatsInfoTab02 on" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab02('1')">기술업종별 <span class="supplyAreaSynthesizeStatsInfo02_type">사업체</span> 수(<span class="supplyAreaSynthesizeStatsInfo02_unit">개</span>)</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab02_Btn02" class="changeSupplyAreaSynthesizeStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab02('2')">기술업종별 <span class="supplyAreaSynthesizeStatsInfo02_type">사업체</span> 비율(%)</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab02_Btn03" class="changeSupplyAreaSynthesizeStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab02('3')">기술업종별 <span class="supplyAreaSynthesizeStatsInfo02_type">사업체</span> 증감(<span class="supplyAreaSynthesizeStatsInfo02_unit">%</span>)</a>  
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab02_Btn04" class="changeSupplyAreaSynthesizeStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab02('4')">기술업종별  입지계수</a>
    					</div> 
    					<div class="dbTabs type01" id="supplyAreaInfoTab03">
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn00" class="changeSupplyAreaSynthesizeStatsInfoTab03 on" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('0')">전체현황</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn01" class="changeSupplyAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('1')">첨단기술</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn02" class="changeSupplyAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('2')">고기술</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn03" class="changeSupplyAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('3')">중기술</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn04" class="changeSupplyAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('4')">저기술</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn05" class="changeSupplyAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('5')">창의/디지털</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn06" class="changeSupplyAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('6')">ICT</a>
    						<a id="changeSupplyAreaSynthesizeStatsInfoTab03_Btn07" class="changeSupplyAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab03('7')">전문서비스</a>  
    					</div>
    					<!-- 2017.09.28 개발팀 수정 종료--> 
    					<div class="chartAreaRela supplyAreaSynthesizeStatsInfoChart" id="supplyAreaSynthesizeStatsInfoChart01Div">
    						<p class="etcText05 mt30"></p>
    						<div id="supplyAreaSynthesizeStatsInfoChart01" ></div>
    						<ul class="techLegend02">
    							<li class="ico03"></li>
    							<li class="ico02"></li>
    						</ul>
    						<p class="etcRight05" style="margin-top:40px;">출처 : 통계청,전국사업체조사(2016)</p> <!-- 2018.01.09 [개발팀]-->
    					</div>   
						<div class="chartAreaType02 t01 mt20 supplyAreaSynthesizeStatsInfoChart" id="supplyAreaSynthesizeStatsInfoChart02Div" style="height: auto;">
							<div id="supplyAreaSynthesizeStatsInfoChart02" style="width: 200px; height: 200px; float: left;"></div>
							<div class="typelabel" style="height: auto;"></div>
							<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p> <!-- 2018.01.09 [개발팀]-->
						</div>
						<div class="chartAreaRela supplyAreaSynthesizeStatsInfoChart" id="supplyAreaSynthesizeStatsInfoChart03Div">
    						<p class="etcText05 mt30"></p>
    						<div id="supplyAreaSynthesizeStatsInfoChart03" class="chartSize02"></div> 
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p> <!-- 2018.01.09 [개발팀]-->
    					</div>
    					
    					<!-- 2017.09.27 개발팀 추가 -->
    					<div id="supplyAreaSynthesizeStatsInfoChart04Div" class="chartAreaRela supplyAreaSynthesizeStatsInfoChart">
    						<!-- <div class="noneAreaBox">
	    						<div class="dbTabs">
	    							<a href="javascript:$technicalBizDataBoard.ui.changeSigunguLctChart('country')" class="on">전국 대비</a>
	    							<a href="javascript:$technicalBizDataBoard.ui.changeSigunguLctChart('sido');">시도 대비</a> 
	    						</div>
			    			</div> --> 
    						<div class="chartAreaRela">
    							<div class="compareBox">
    								<!-- 2018.01.15 [개발팀] 기능추가 -->
    								<div class="noneAreaBox" id="supplyLqInfoChartStandard" style="display:none;">
										<div class="dbTabs" id="supplyLqInfoChartStandardButton">
							    			<a href="javascript:void(0)" class="on">전국 대비</a>
							    			<a href="javascript:void(0)">경기도 대비</a> 
							    		</div>
									</div>
    								<div class="typeBox" style="position:relative;margin-left:260px;top:5px;">
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('supplyAreaSynthesizeStatsInfoChart04','1');" class="first on">차트</a>
										<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('supplyAreaSynthesizeStatsInfoChart04','2');">표</a>
									</div>
    							</div>
    							<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다.<br/>(그래프에서 특정영역을 마우스로 드래그하면 확대하여 볼 수 있습니다.)<br/><br/>-입지계수(Location Quotient):상대적 특화도 지수로 불리는 입지계수는 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표<br/><br/>예시)입지계수 계산식(사업체기준):<br/>(해당지역 기술업종 사업체수 / 해당지역 전체기술업종 사업체수 ) / (기준지역 기술업종 사업체수 / 기준지역 전체 기술업종 사업체수)<br/><br/>*기준지역 : 전국 또는 시도 등의 기준이 되는지역"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;margin-top:1px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> <!-- 2018.01.22 [개발팀] -->
    							<div id="supplyAreaSynthesizeStatsInfoChart04_1">
    								<!-- <p class="sTit" style="top:25px;">종사자 LQ</p> -->
    								<div id="supplyAreaSynthesizeStatsInfoChart04" class="chartSize01"></div> 
    								<!-- <p class="eTit" style="top:300px;">사업체 LQ</p> -->
    								<!-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-330px;margin-left:300px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> -->
    							</div>
    							<div id="supplyAreaSynthesizeStatsInfoChart04_2" style="display:none;">
    							
    							</div>
    							<!-- <p class="sTit">종사자 LQ</p> -->
    							<!-- <div id="technicalLctChart" class="chartSize01"></div> -->
    							<!-- <a href="javascript:void(0)" class="sBtn" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_help06.png" /></a> -->
    							<%-- <div id="supplyAreaSynthesizeStatsInfoChart04" class="chartSize01"></div> 
    							<p class="eTit">사업체 LQ</p>
    							<a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="${paramInfo.tooltipList.E0004}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> --%>
    						</div>  
    						<div class="ltListBox">	
    							<ul>
    								<li>
    									<span class="t01">사업체</span>
    									<span class="t02" id="technicalLctCorpText"><span id="technicalLctCorpTextAdmNm" class="txtBold cRed">경기도</span>는 사업체 기준&nbsp;&nbsp;<span id="technicalLctCorpMclassNm" class="txtBold cRed"></span><span id="technicalLctCorpMclassNm_append">업종이 전국과 비교하여 집적도가 높음</span></span>
    								</li>
    								<li>
    									<span class="t01">종사자</span>
    									<span class="t02" id="technicalLctWorkerText"><span id="technicalLctWorkerTextAdmNm" class="txtBold cRed">경기도</span>는 종사자 기준&nbsp;&nbsp;<span id="technicalLctWorkerMclassNm" class="txtBold cRed"></span><span id="technicalLctWorkerMclassNm_append"> 업종이 전국과 비교하여 집적도가 높음</span></span>
    								</li>
    							</ul>
		    				</div>
    					</div>
    					<!-- 2017.09.27 개발팀 추가 -->
    				</dd>
    				<!-- 2017.09.28 개발팀 수정  시작 위치 이동-->
    				<!-- <dt class="mt15 botype">
    					<a href="javascript:void(0)">주요지원시설 현황</a>
    				</dt> 
    				<dd>
    					<div class="chartAreaRela">
    						<div id="supplyMajorFacilityBarChart" class="chartSize01 mt50"></div>
    						<p class="etcText05">지원시설 분류</p>
    					</div> 
    				</dd> --!>
    				<!-- 2017.09.28 개발팀 수정  죵료-->
    				<dt class="mt15">
    					<a href="javascript:void(0)">창업지원시설 목록</a> 
    				</dt>
    				<dd>
    					<!-- 2017.09.26 개발팀 수정 시작-->
    					<!-- <div class="dbTabs">
    						<a id="startUpSupplyListTab_Btn0" class="startUpSupplyListTab on" href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab('0')" >종합</a>
    						<a id="startUpSupplyListTab_Btn1" class="startUpSupplyListTab" href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab('1')">기업직접시설</a> 
    						<a id="startUpSupplyListTab_Btn2" class="startUpSupplyListTab" href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab('2')">비즈니스센터</a> 
    						<a id="startUpSupplyListTab_Btn3" class="startUpSupplyListTab" href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab('3')">창업보육센터</a> 
    						<a id="startUpSupplyListTab_Btn4" class="startUpSupplyListTab" href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab('4')">창업투자회사</a>   
    					</div>  -->
    					<div class="chgCkbox" id="startUpSupplyList">
				    		<a href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab()" class="ckbtn c01 on">
			    				<span class="ico"></span>
			    				<span class="txt" style="margin-left:-25px;">기업직접시설</span>
			    			</a>
			    			<a href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab()" class="ckbtn c02 on">
			    				<span class="ico"></span>
			    				<span class="txt" style="margin-left:-25px;">비즈니스센터</span>
			    			</a>
			    			<a href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab()" class="ckbtn c03 on">
			    				<span class="ico"></span>
			    				<span class="txt" style="margin-left:-25px;">창업보육센터</span>
			    			</a>
			    			<a href="javascript:$technicalBizDataBoard.ui.changeStartUpSupplyListTab()" class="ckbtn c04 on">
			    				<span class="ico"></span>
			    				<span class="txt" style="margin-left:-25px;">창업투자회사</span>
			    			</a>
				    	</div>
    					<!-- 2017.09.26 개발팀 수정 종료-->
    					<p class="horizontalTitle mt20 startUpSupplyListsTitle">
  								<span>해당 지역 전체 종합 개수 :</span> <strong>0</strong><span>개</span>
  							</p>
  							<!-- 2017.09.28 개발팀 수정 시작-->
  							<ul class="techList startUpSupplyLists" id="techListStartUpSupplyLists"></ul>
  							<p class="etcRight05" id="techListOrigin">출처 : 중소기업청, 벤처창업입지 114</p>
  							<!-- 2017.09.28 개발팀 수정 종료 -->
  							<div id="startUpSupplyListPaging" class="paging" style="width: 100%;text-align:center;">
								<span class="pages"> <a href="" class="page"></a></span>
							</div>
    				</dd>
    				<!-- 2017.09.28 개발팀 수정 시작  -->
    				<dt class="mt15 botype">
    					<a href="javascript:void(0)">주요지원시설 현황</a>
    				</dt> 
    				<dd>
    					<div class="chartAreaRela">
    						<div id="supplyMajorFacilityBarChart" class="chartSize01 mt50"></div>
    						<p class="etcText05">지원시설 분류</p>
    					</div> 
    				</dd>
    				<!-- 2017.09.28 개발팀 수정 종료 -->
    			</dl>
   			</div>
			<!-- 지원시설 - 해당지역 상세보기  End -->
			
			<!-- 산업단지 Start -->
			<div class="dataBoardDiv" id="industryDiv">
				<div class="areaBox">전국 시도별 현황</div>
   				<dl class="dscList"> 
    				<dt class="mt15 botype">
    					<a href="javascript:void(0)" class="industySidoDataboardTitle">기술업종 사업체 수 / 산업단지 수  현황</a>
    				</dt> 
    				<dd>
    					<div class="chartAreaRela">
    						<div class="carLeft">
    							<p class="ar"><span class="txt industySidoDataBoardGraphTitle" style="padding-left:0;">사업체</span></p>
    							<div class="chartSize03" id="industryBarCharts01"></div> 
    						</div>
   							<ul class="carLabel industryBarChartLabel">
   								<li>전국평균</li>
   								<li>서울특별시</li>
   								<li>부산광역시</li>
   								<li>대구광역시</li>
   								<li>인천광역시</li>
   								<li>광주광역시</li>
   								<li>대전광역시</li>
   								<li>울산광역시</li>
   								<li>세종특별차치도</li>
   								<li>경기도</li>
   								<li>강원도</li>
   								<li>충청북도</li>
   								<li>충청남도</li>
   								<li>전라북도</li>
   								<li>전라남도</li>
   								<li>경상북도</li>
   								<li>경상남도</li>
   								<li>제주특별자치도</li>
   							</ul>
    						<div class="carRight">
    							<p class="al"><span class="txt" style="padding-left:0;">산업단지</span></p>
    							<div class="chartSize03" id="industryBarCharts02"></div> 
    						</div>
    						<p class="etcRight05">출처 : 통계청, 전국사업체조사(2016)</p>
    						<p class="etcRight05">출처 : 국토교통부, 산업단지현황(2015)</p>
    						<p class="etcRight05">출처 : 한국산업단지공단, 한국산업단지총람(2015)</p>
    					</div>
	    			</dd>
    			</dl>
			</div>
			<!-- 산업단지 End -->
			
			<!-- 산업단지 - 해당지역 상세보기  Start -->
			<div class="dataBoardDiv" id="industryDetailDiv">
   				<div class="areaBox">경기도</div>
   				<button class="MapBefore" onclick="javascript:$technicalBizMap.ui.doPrevRegionInfo('industry');"></button> 
   				<dl class="dscList"> 
	   				<div class="industryDetailStep01">
	    				<dt class="mt15 botype">
	    					<a href="javascript:void(0)">지역 종합 통계 정보</a>
	    				</dt>
	    				<dd>
	    					<div class="norRela">
	    						<!-- 2017.09.30 개발팀 수정 시작-->
		    					<!-- <ul class="dbTabs02">
			    					<li><a id="changeIndustryAreaSynthesizeStatsInfoTab01_Btn01" class="changeIndustryAreaSynthesizeStatsInfoTab01 on" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab01('1')">총사업체<span id="totalIndustryCorpCnt">0(개)</span></a></li>
			    					<li><a id="changeIndustryAreaSynthesizeStatsInfoTab01_Btn02" class="changeIndustryAreaSynthesizeStatsInfoTab01" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab01('2')">총종사자<span id="totalIndustryWorkerCnt">0(명)</span></a></li>  
			    				</ul>
			    				<ul class="techLegend01">
	    							<li>사업체 대비 산업단지 : <span id="industryTechbizAvgTxt"></span></li>
	    							<li>종사자 대비 산업단지 : <span id="industryWorkerAvgTxt"></span></li>
	    							<li>인구 대비 산업단지 : <span id="industryResidPpltnAvgTxt"></span></li>
	    						</ul> -->
	    						
								<div class="dscTextCont on" id="changeIndustryAreaSynthesizeStatsInfoTab01_Btn01">
									<p class="t01">총 사업체 수 <span id="totalIndustryCorpCnt">0(개)</span></p>
									<p class="t02">사업체 대비 지원시설 : <span id="industryTechbizAvgTxt"></span></p>
								</div>
												    		
								<div class="dscTextCont" id="changeIndustryAreaSynthesizeStatsInfoTab01_Btn02" style="display:none;">
									<p class="t01">총 종사자 수 <span id="totalIndustryWorkerCnt">0(명)</span></p>
									<p class="t02">종사자 대비 지원시설 : <span id="industryWorkerAvgTxt"></span></p>
								</div>
	    						
	    						<!-- 2017.09.30 개발팀 수정 종료-->
	   						</div>
	    					<div class="dbTabs mt20 techDataboardTab">
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab02_Btn01" class="changeIndustryAreaSynthesizeStatsInfoTab02 on" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab02('1')">기술업종별 <span class="industryAreaSynthesizeStatsInfo02_type">사업체</span> 수(<span class="industryAreaSynthesizeStatsInfo02_unit">개</span>)</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab02_Btn02" class="changeIndustryAreaSynthesizeStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab02('2')">기술업종별 <span class="industryAreaSynthesizeStatsInfo02_type">사업체</span> 비율(%)</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab02_Btn03" class="changeIndustryAreaSynthesizeStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab02('3')">기술업종별 <span class="industryAreaSynthesizeStatsInfo02_type">사업체</span> 증감(<span class="industryAreaSynthesizeStatsInfo02_unit">%</span>)</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab02_Btn04" class="changeIndustryAreaSynthesizeStatsInfoTab02" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab02('4')">기술업종별  입지계수</a>
	    					</div> 
	    					<!-- 2017.09.30 개발팀 div id 추가ㅣ -->
	    					<div class="dbTabs type01" id="industryTab03">
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn00" class="changeIndustryAreaSynthesizeStatsInfoTab03 on" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('0')">전체현황</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn01" class="changeIndustryAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('1')">첨단기술</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn02" class="changeIndustryAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('2')">고기술</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn03" class="changeIndustryAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('3')">중기술</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn04" class="changeIndustryAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('4')">저기술</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn05" class="changeIndustryAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('5')">창의/디지털</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn06" class="changeIndustryAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('6')">ICT</a>
	    						<a id="changeIndustryAreaSynthesizeStatsInfoTab03_Btn07" class="changeIndustryAreaSynthesizeStatsInfoTab03" href="javascript:$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab03('7')">전문서비스</a>  
	    					</div> 
	    					<div class="chartAreaRela industryAreaSynthesizeStatsInfoChart" id="industryAreaSynthesizeStatsInfoChart01Div">
	    						<p class="etcText05 mt30"></p>
	    						<div id="industryAreaSynthesizeStatsInfoChart01"></div>
	    						<ul class="techLegend02">
	    							<li class="ico03"></li>
	    							<li class="ico02"></li>
	    						</ul>
	    						<p class="etcRight05" style="margin-top:40px;">출처 : 통계청, 전국사업체조사(2016)</p>
	    					</div>   
							<div class="chartAreaType02 t01 mt20 industryAreaSynthesizeStatsInfoChart" id="industryAreaSynthesizeStatsInfoChart02Div" style="height: auto;">
								<div id="industryAreaSynthesizeStatsInfoChart02" style="width: 200px; height: 200px; float: left;"></div>
								<div class="typelabel" style="height: auto;"></div>
								<p class="etcRight05">출처 : 통계청, 전국사업체조사(2016)</p>
							</div>
							<div class="chartAreaRela industryAreaSynthesizeStatsInfoChart" id="industryAreaSynthesizeStatsInfoChart03Div">
	    						<p class="etcText05 mt30"></p>
	    						<div id="industryAreaSynthesizeStatsInfoChart03" class="chartSize02"></div> 
	    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p>
	    					</div>
	    					<!-- 2017.10.10 개발팀 추가 -->
	    					<div class="chartAreaRela industryAreaSynthesizeStatsInfoChart" id="industryAreaSynthesizeStatsInfoChart04Div">
    							<!-- <div class="noneAreaBox">
	    							<div class="dbTabs" id="industryLctStandard" style="display:none;">
	    								<a href="javascript:void(0)" class="on">전국 대비</a>
	    								<a href="javascript:void(0)">시도 대비</a> 
									</div> 
								</div> -->
								
								<div class="chartAreaRela">
									<div class="compareBox">
										<!-- 2018.01.15 [개발팀] 기능추가 -->
    									<div class="noneAreaBox" id="industryLqInfoChartStandard" style="display:none;">
											<div class="dbTabs" id="industryLqInfoChartStandardButton">
								    			<a href="javascript:void(0)" class="on">전국 대비</a>
								    			<a href="javascript:void(0)">경기도 대비</a> 
								    		</div>
										</div>
										<div class="typeBox" style="position:relative;margin-left:260px;top:5px;">
											<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('industryAreaSynthesizeStatsInfoLctChart','1');" class="first on">차트</a>
											<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('industryAreaSynthesizeStatsInfoLctChart','2');">표</a>
										</div>
									</div>
									<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다.<br/>(그래프에서 특정영역을 마우스로 드래그하면 확대하여 볼 수 있습니다.)<br/><br/>-입지계수(Location Quotient):상대적 특화도 지수로 불리는 입지계수는 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표<br/><br/>예시)입지계수 계산식(사업체기준):<br/>(해당지역 기술업종 사업체수 / 해당지역 전체기술업종 사업체수 ) / (기준지역 기술업종 사업체수 / 기준지역 전체 기술업종 사업체수)<br/><br/>*기준지역 : 전국 또는 시도 등의 기준이 되는지역"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;margin-top:1px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> <!-- 2018.01.22 [개발팀] -->
									<div id="industryAreaSynthesizeStatsInfoLctChart_1">
										<!-- <p class="sTit">종사자 LQ</p> -->
										<div id="industryAreaSynthesizeStatsInfoLctChart" class="chartSize01"></div> 
										<!-- <p class="eTit">사업체 LQ</p> --> 
										<!-- <a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-330px;margin-left:300px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> -->
									</div>
									
									<div id="industryAreaSynthesizeStatsInfoLctChart_2" style="display:none;">
									
									</div>
									<!-- <p class="sTit">종사자 LQ</p> -->
									<!-- <a href="javascript:void(0)" class="sBtn" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_help06.png" /></a> -->
									<%-- <div id="industryAreaSynthesizeStatsInfoLctChart" class="chartSize01"></div> 
									<p class="eTit">사업체 LQ</p> 
									<a href="javascript:void(0)" class="ar" style="position:absolute;margin-top:-260px;margin-left:430px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="${paramInfo.tooltipList.E0004}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> --%> 
								</div>  
								<div class="ltListBox">	
									<ul>
										<li>
											<span class="t01">사업체</span>
											<span class="t02" id="industryLctCorpText"><span id="industryLctCorpTextAdmNm" class="txtBold cRed">경기도</span>는 사업체 기준&nbsp;&nbsp;<span id="industryLctCorpMclassNm" class="txtBold cRed"></span><span id="industryLctCorpMclassNm_append">업종이 전국과 비교하여 집적도가 높음</span></span>
										</li>
										<li>
											<span class="t01">종사자</span>
											<span class="t02" id="industryLctWorkerText"><span id="industryLctWorkerTextAdmNm" class="txtBold cRed">경기도</span>는 종사자 기준&nbsp;&nbsp;<span id="industryLctWorkerMclassNm" class="txtBold cRed"></span><span id="industryLctWorkerMclassNm_append">업종이 전국과 비교하여 집적도가 높음</span></span>
										</li>
									</ul>
								</div>
    						</div>
    						<!-- 2017.10.10 개발팀 추가 종료 -->  
	    					
	    				</dd>
						<!-- 주요지원시설 현황 -->
	    				<dt class="mt15 botype">
	    					<a href="javascript:void(0)">주요지원시설 현황</a>
	    				</dt>
	    				<dd>
	    					<div class="chartAreaRela">
	    						<div id="industryMajorFacilityBarChart" class="chartSize01 mt50"></div>
	    						<p class="etcText05">지원시설 분류</p>
	    					</div> 
	    				</dd>	
	    				<!-- 산업단지 목록 -->	
	    				<dt class="mt15">
	    					<a href="javascript:void(0)">산업단지 목록</a> 
	    				</dt>
	    				<dd>
	    					<div class="chgCkbox" id="industryList">
					    		<a href="javascript:$technicalBizDataBoard.ui.changeIndustryListTab()" class="ckbtn c04 on">
				    				<span class="ico"></span>
				    				<span class="txt" style="margin-left:-20px;">국가</span>
				    			</a>
				    			<a href="javascript:$technicalBizDataBoard.ui.changeIndustryListTab()" class="ckbtn c02 on">
				    				<span class="ico"></span>
				    				<span class="txt" style="margin-left:-20px;">일반</span>
				    			</a>
				    			<a href="javascript:$technicalBizDataBoard.ui.changeIndustryListTab()" class="ckbtn c03 on">
				    				<span class="ico"></span>
				    				<span class="txt" style="margin-left:-20px;">도시첨단</span>
				    			</a>
				    			<a href="javascript:$technicalBizDataBoard.ui.changeIndustryListTab()" class="ckbtn c01 on">
				    				<span class="ico"></span>
				    				<span class="txt" style="margin-left:-20px;">농공</span>
				    			</a>
				    		</div>
	    					
	    					
	    					
	    					
	    					<p class="horizontalTitle mt20 industryListsTitle">
								<span>해당 지역 전체 산업단지 개수 :</span> <strong>0</strong><span>개</span>
							</p>
	  							
	  							<ul class="techList industryLists" id="industryLists"></ul>
	  							<p class="etcRight05" id="industryOrigin1">출처 : 국토교통부,산업단지현황(2015)</p>
	  							<p class="etcRight05" id="industryOrigin2">출처 : 한국산업단지공단,한국산업단지총람(2015)</p>
	  							<div id="industryListPaging" class="paging" style="width: 100%;text-align:center;">
									<span class="pages"> <a href="" class="page"></a></span>
								</div>
						<!-- 2017.09.30 개발팀 수정 종료 -->
	    				</dd>
					</div>
					
					<!-- 2017.10.12 개발팀 추가 -->
					<div class="industryDetailStep02" style="display:none;">
						<dt class="mt15">
							<a href="javascript:void(0);" id="industryLctDetailIrds"></a>
						</dt>
						<dd>
							<div id="industryAreaSynthesizeStatsDetailInfoChart04Div" data-index="" data-page="">
    							<!-- <div class="noneAreaBox">
	    							<div class="dbTabs" id="industryLctDetailStandard">
	    								<a href="javascript:$technicalBizDataBoard.ui.industryLctDetailChartStandardChange(0)" class="on">전국 대비</a>
	    								<a href="javascript:$technicalBizDataBoard.ui.industryLctDetailChartStandardChange(1)">시도 대비</a> 
									</div> 
								</div> -->
								<div class="chartAreaRela">
									<div class="compareBox">
										<div class="noneAreaBox">
	    									<div class="dbTabs" id="industryLctDetailStandard">
	    										<a href="javascript:$technicalBizDataBoard.ui.industryLctDetailChartStandardChange(0)" class="on">전국 대비</a>
	    										<a href="javascript:$technicalBizDataBoard.ui.industryLctDetailChartStandardChange(1)">시도 대비</a> 
											</div> 
										</div>	
										<div class="typeBox" style="position:absolute;top:2px;left:260px">
											<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('industryAreaSynthesizeStatsInfoDetailLctChart','1');" class="first on">차트</a>
											<a onclick="javascript:$technicalBizDataBoard.ui.changeShowChartTable('industryAreaSynthesizeStatsInfoDetailLctChart','2');">표</a>
										</div>
										<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="업종별특성정보 기술혁신 방사형그래프" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다.<br/>(그래프에서 특정영역을 마우스로 드래그하면 확대하여 볼 수 있습니다.)<br/><br/>-입지계수(Location Quotient):상대적 특화도 지수로 불리는 입지계수는 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표<br/><br/>예시)입지계수 계산식(사업체기준):<br/>(해당지역 기술업종 사업체수 / 해당지역 전체기술업종 사업체수 ) / (기준지역 기술업종 사업체수 / 기준지역 전체 기술업종 사업체수)<br/><br/>*기준지역 : 전국 또는 시도 등의 기준이 되는지역"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;margin-top:1px;" width=20 height=20 alt="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."></a> <!-- 2018.01.22 [개발팀] -->
										<div id="industryAreaSynthesizeStatsInfoDetailLctChart_1">
											<!-- <p class="sTit" style="top:45px;">종사자 LQ</p> -->
											<!-- <a href="javascript:void(0)" style="position:absolute;top:60px; left:500px;z-index:100" class="sBtn" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_help06.png" alt="도움말" /></a> -->
											<div id="industryAreaSynthesizeStatsInfoDetailLctChart" class="chartSize01"></div> 
											<!-- <p class="eTit" style="top:300px;">사업체 LQ</p> --> 
										</div>
										<div id="industryAreaSynthesizeStatsInfoDetailLctChart_2" style="display:none;">
										
										
										</div>
										
									</div>
									<!-- <p class="sTit">종사자 LQ</p>
									<a href="javascript:void(0)" style="position:absolute;top:15px; left:500px;z-index:100" class="sBtn" title="선택된 지역의 기술업종의 사업체 입지계수와 종사자 입지계수를 표현합니다. 1이상의 경우 입지계수가 평균보다 높음을 의미합니다."><img src="/img/ico/ico_help06.png" /></a>
									<div id="industryAreaSynthesizeStatsInfoDetailLctChart" class="chartSize01"></div> 
									<p class="eTit">사업체 LQ</p>  -->
								</div>  
								<div class="ltListBox">	
									<ul>
										<li>
											<span class="t01">사업체</span>
											<span class="t02" id="industryLctDetailCorpText"><span id="industryLctDetailCorpTextAdmNm" class="txtBold cRed">경기도</span>는 사업체 기준&nbsp;&nbsp;<span id="industryLctDetailCorpMclassNm" class="txtBold cRed"></span><span id="industryLctDetailCorpMclassNm_append">업종이 전국과 비교하여 집적도가 높음</span></span>
										</li>
										<li>
											<span class="t01">종사자</span>
											<span class="t02" id="industryLctDetailWorkerText"><span id="industryLctDetailWorkerTextAdmNm" class="txtBold cRed">경기도</span>는 종사자 기준&nbsp;&nbsp;<span id="industryDetailLctWorkerMclassNm" class="txtBold cRed"></span><span id="industryDetailLctWorkerMclassNm_append">업종이 전국과 비교하여 집적도가 높음</span></span>
										</li>
									</ul>
								</div>
    						</div>
						</dd>
					</div>
					<!-- 2017.10.12 개발팀 추가 종료 -->
					<!-- 산업단지 내 증감현황 -->
					<div class="industryDetailStep02" style="display:none;">
						<dt class="mt15">
	    					<a href="javascript:void(0)" id="industryIrds"></a>
	    				</dt>    	
						<dd>
	    					<div class="dbTabs">
	    						<a id="industryVariationStateTab_Btn01" class="industryVariationStateTab on" href="javascript:$technicalBizDataBoard.ui.changeIndustryVariationStateTab('1')">사업체</a>
	    						<a id="industryVariationStateTab_Btn02" class="industryVariationStateTab" href="javascript:$technicalBizDataBoard.ui.changeIndustryVariationStateTab('2')">종사자</a>  
	    					</div> 
	    					<div class="chartAreaRela t01">
	    						<div id="industryVariationStateChart" class="chartSize02"></div> 
	    						<p class="etcRight05" id="industryTimeseriesOrigin"></p>
	    					</div> 
	    				</dd>
	    				<!-- 산업단지 내 분포현황 -->
						<dt class="mt15">
	    					<a href="javascript:void(0)" id="industrySpiderRate"></a>
	    				</dt> 
	    				<dd>  
	    					<div class="chartAreaRela">
	    						<a href="javascript:void(0)" class="ar" style="margin-left:35px;" data-subj="산업단지 내 기술업종분포현황 방사형그래프" title="${paramInfo.tooltipList.E0402}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0402}"></a> <!-- 2018.01.15 [개발팀] -->
	    						<div id="industryDistributionStateChart" class="chartSize01"></div>
	    						<%-- <a href="javascript:void(0)" class="ar" data-subj="산업단지 내 기술업종분포현황 방사형그래프" title="${paramInfo.tooltipList.E0402}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="${paramInfo.tooltipList.E0402}"></a> --%> <!-- 2018.01.15 [개발팀] -->
								<div class="posb t01">
		    						<ul class="cateSaupLegend line">
		    							<li class="cy">산업단지 평균</li>
		    							<li class="cb" id="industryShapeChartLegend"></li>   
		    						</ul>
		    					</div>
	    					</div>  
	    				</dd>
	    				<!-- 산업단지 내 기술업종 상세현황 -->
						<dt class="mt15">
	    					<a href="javascript:void(0)" id="industryDetailInfo"></a>
	    				</dt> 
	    				<dd>  
	    					<div class="dbTabs">
	    						<a id="industryDetailStateTab_Btn01" class="industryDetailStateTab on" href="javascript:$technicalBizDataBoard.ui.changeIndustryDetailStateTab('1')">첨단기술</a>
	    						<a id="industryDetailStateTab_Btn02" class="industryDetailStateTab" href="javascript:$technicalBizDataBoard.ui.changeIndustryDetailStateTab('2')">고기술</a>
	    						<a id="industryDetailStateTab_Btn03" class="industryDetailStateTab" href="javascript:$technicalBizDataBoard.ui.changeIndustryDetailStateTab('3')">중기술</a>
	    						<a id="industryDetailStateTab_Btn04" class="industryDetailStateTab" href="javascript:$technicalBizDataBoard.ui.changeIndustryDetailStateTab('4')">저기술</a>
	    						<a id="industryDetailStateTab_Btn05" class="industryDetailStateTab" href="javascript:$technicalBizDataBoard.ui.changeIndustryDetailStateTab('5')">창의/디지털</a>
	    						<a id="industryDetailStateTab_Btn06" class="industryDetailStateTab" href="javascript:$technicalBizDataBoard.ui.changeIndustryDetailStateTab('6')">ICT</a>
	    						<a id="industryDetailStateTab_Btn07" class="industryDetailStateTab" href="javascript:$technicalBizDataBoard.ui.changeIndustryDetailStateTab('7')">전문서비스</a>  
	    					</div> 
	    					<div class="chartAreaRela">
	    						<p class="etcText05 mt30" id="industryDetailInfoUpperTitle"></p>
	    						<div id="industryDetailStateChart"></div>
	    						<ul class="techLegend02">
	    							<li class="ico02">산업단지 평균</li>
	    							<li class="ico03" id="industryDetailInfoLegend"></li>
	    						</ul>
	    						<p class="etcRight05" style="margin-top:40px;">출처 : 통계청,전국사업체조사(2016)</p>
	    					</div>
	    					
	    				</dd>
	    				<!-- 산업단지 내 기술업종 주요시설 현황  -->
	    				<dt class="mt15">
	    					<a href="javascript:void(0)" id="industryMainFacility"></a>
	    				</dt> 
	    				<dd>  
	    					<div id="industryImportantFacilityStateChart" class="timeAreaCharts"></div>
	    					<p class="etcText05">지원시설 분류</p>
	    					<ul class="techLegend02 mb20">
	   							<li class="ico02">산업단지 평균</li>
	   							<li class="ico03" id="industryImportantFacilityLegend"></li>
	   						</ul>
	    				</dd>
					</div>
    			</dl>
   			</div>
			<!-- 산업단지 - 해당지역 상세보기  End -->
			
			
			
			<!-- 공공데이터 Include -->
			<jsp:include page="/view/map/publicDataBoard"></jsp:include>
			
			<!-- 나의데이터 Include -->
			<jsp:include page="/view/map/mydataDataBoard"></jsp:include>
		</div>
			
	</div>
</div>  
<form id="excelDownForm" name="excelDownForm" method="post">
</form>
