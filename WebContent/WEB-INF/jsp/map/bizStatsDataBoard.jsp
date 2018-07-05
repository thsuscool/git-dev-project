<%
/**************************************************************************************************************************
* Program Name  : 생활종합지도 데이터보드 JSP  
* File Name     : bizStatsDataBoard.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-09
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
			<!-- Intro 시도 & 세부업종별 Start -->
			<div class="dataBoardDiv" id="introSidoDiv">
				<p class="dbText01">17개 주요 시도별 생활업종현황</p>
	  			<div class="seoulBox"></div>
	  			<dl class="dscList">
	   				<dt class="mt15"><a href="javascript:void(0)" class="on" data-subj="생활업종분류별 사업체비율" title="해당 지역에 대한 생활업종분류별(36종) 사업체비율 정보를<br>그래프로 확인할 수 있습니다."><span class="areaSpan"></span> 생활편의업종(36종) 분류별 사업체 비율</a></dt>
	   				<dd>
						<div class="bizCateMenu dbTabs" id="introMainTabDiv">
							<a class="on" href="javascript:$bizStatsDataBoard.ui.pageBack('intro');">종합현황</a>             
							<a href="javascript:$bizStatsDataBoard.ui.introPieChartClick('50');">음식점</a>
							<a href="javascript:$bizStatsDataBoard.ui.introPieChartClick('20');">도소매</a>      
							<a href="javascript:$bizStatsDataBoard.ui.introPieChartClick('10');">서비스</a>      
							<a href="javascript:$bizStatsDataBoard.ui.introPieChartClick('40');">숙박업</a>      
						</div>
						
						<div id="introSidoChart" class="introChart">
		   					<div id="introSidoPieCharts01" class="typeCharts01"></div>
		   					<div id="introSidoPieCharts02" class="typeCharts01"></div>
	   					</div>
	   					
						<div id="introSidoDetailChart" class="introChart">
		   					<div id="intro3dChartArea01" class="chartAreaType02">
	   							<div id="intro3dChart01" class="typeCharts06"></div>
	   							<div class="typelabel">
	    							<p class="txtSubj" id="intro3dChartTitle01"><p>
	    						</div>
	   						</div>
							<div id="intro3dChartArea02" class="chartAreaType02">
		   						<div id="intro3dChart02" class="typeCharts06"></div>
		   						<div class="typelabel">
	    							<p class="txtSubj" id="intro3dChartTitle02"><p>
	    						</div>
	   						</div>
						</div>
					</dd>
					
	   				<dt><a href="javascript:void(0)" class="on" data-subj="지표별 생활업종순위" title="해당 지역에 대한 사업체/종사자 수,비율,증감 지표에 대한 순위정보를<br>그래프로 확인할 수 있습니다."><span class="areaSpan" ></span> 지표별 생활편의업종(36종) 순위 </a></dt>
	   				<dd> 
	   					<div class="dbTabs" id="introChartType">
    						<a href="javascript:$bizStatsDataBoard.ui.changeIntroChartType(1);" class="on" id="icType01">사업체</a>
    						<a href="javascript:$bizStatsDataBoard.ui.changeIntroChartType(2);" id="icType02">종사자</a> 
    					</div>
    					<div class="dbTabs type01" id="introChartContent">
    						<a href="javascript:$bizStatsDataBoard.ui.changeIntroChartContent(1);" class="on">수</a>
    						<a href="javascript:$bizStatsDataBoard.ui.changeIntroChartContent(2);">비율</a>
    						<a href="javascript:$bizStatsDataBoard.ui.changeIntroChartContent(3);">증감(전년대비)</a> 
    					</div>
    					<!-- id duple 문제로 class 변경 introRankChart01에서 introRankChart06 -->
    					<div class="introRankChart introRankChart01" >
	   						<div class="introRankChart01"></div>
    					</div>
    					<div class="introRankChart introRankChart02">
	   						<div class="introRankChart02"></div>
    					</div>
    					<div class="introRankChart introRankChart03">
	   						<div class="introRankChart03"></div>
    					</div>
    					<div class="introRankChart introRankChart04">
	   						<div class="introRankChart04"></div>
    					</div>
    					<div class="introRankChart introRankChart05">
	   						<div class="introRankChart05"></div>
    					</div>
    					<div class="introRankChart introRankChart06">
	   						<div class="introRankChart06"></div>
    					</div>
    					<!-- 2017-02-09 출처 -->
<!--     					<p class="etcRight05">출처 : 통계청,전국사업체조사(2015)</p> -->
						<!-- 20180220 leekh 사업체조사 반영 -->
    					<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p>
	   				</dd>
	   			</dl>
			</div>
			<!-- Intro 시도 & 세부업종별 End -->
			
			<!-- 업종별 지역현황 Start -->
			<div class="dataBoardDiv" id="jobAreaDiv">
				<p class="dbText01">생활업종별 지역 시군구 현황</p>
   				<div class="areaBox jobAreaTitle"></div>
   				<p class="areaEtcTextBox" style="position:absolute;margin-top:-10px;margin-left:20px;">※ 원하는 분류 탭을 선택하시면 해당분류 하위의 상세 생활업종 정보를 조회할 수 있습니다. </p>
				<div class="bizLegendBox">
					<div id="bizLegend_color" class="bizLegend_color on">색상지도</div>
					<div id="bizLegend_bubble" class="bizLegend_bubble">버블지도</div>
				</div>
				<dl class="dscList">
					<dd class="view">
						<div class="dbTabs bizCateMenu">
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTabClick('50');" id="bizCateMenu50" class="on">음식점</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTabClick('20');" id="bizCateMenu20">도소매</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTabClick('10');" id="bizCateMenu10">서비스</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTabClick('40');" id="bizCateMenu40">숙박업</a>
						</div>
						<ul class="dbTabs01 jobAreaTab" id="jobAreaTab50">	<!-- 음식점 -->
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5001', '한식');" id="jobArea_5001" class="on">한식</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5002', '중식');" id="jobArea_5002">중식</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5003', '일식');" id="jobArea_5003">일식</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5004', '분식');" id="jobArea_5004">분식</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5005', '서양식');" id="jobArea_5005">서양식</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5006', '제과점');" id="jobArea_5006">제과점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5007', '패스트푸드');" id="jobArea_5007">패스트푸드</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5008', '치킨');" id="jobArea_5008">치킨</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5009', '호프 및 간이주점');" id="jobArea_5009">호프 및 간이주점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5010', '카페');" id="jobArea_5010">카페</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '5011', '기타 외국식');" id="jobArea_5011">기타 외국식</a></li>
						</ul>
						<ul class="dbTabs01 jobAreaTab" id="jobAreaTab20">	<!-- 도소매 -->
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2001', '문구점');" id="jobArea_2001">문구점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2002', '서점');" id="jobArea_2002">서점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2003', '편의점');" id="jobArea_2003">편의점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2004', '식료품점');" id="jobArea_2004">식료품점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2005', '휴대폰점');" id="jobArea_2005">휴대폰점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2006', '의류');" id="jobArea_2006">의류</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2007', '화장품/방향제');" id="jobArea_2007">화장품/방향제</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2008', '철물점');" id="jobArea_2008">철물점</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2009', '주유소');" id="jobArea_2009">주유소</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2010', '꽃집');" id="jobArea_2010">꽃집</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '2011', '슈퍼마켓');" id="jobArea_2011">슈퍼마켓</a></li>
						</ul>
						<ul class="dbTabs01 jobAreaTab" id="jobAreaTab10">	<!-- 서비스 -->
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1001', '인테리어');" id="jobArea_1001">인테리어</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1002', '목욕탕');" id="jobArea_1002">목욕탕</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1003', '교습학원');" id="jobArea_1003">교습학원</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1004', '어학원');" id="jobArea_1004">어학원</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1005', '예체능학원');" id="jobArea_1005">예체능학원</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1006', '부동산중개업');" id="jobArea_1006">부동산중개업</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1007', '이발소');" id="jobArea_1007">이발소</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1008', '미용실');" id="jobArea_1008">미용실</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1009', '세탁소');" id="jobArea_1009">세탁소</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1010', 'PC방');" id="jobArea_1010">PC방</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '1011', '노래방');" id="jobArea_1011">노래방</a></li>
						</ul>
						<ul class="dbTabs01 jobAreaTab" id="jobAreaTab40">	<!-- 숙박업 -->
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '4001', '호텔');" id="jobArea_4001">호텔</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '4002', '여관(모텔포함) 및 여인숙');" id="jobArea_4002">여관(모텔포함) 및 여인숙</a></li>
							<li><a href="javascript:$bizStatsDataBoard.ui.jobAreaThemeClick('tabClick', '4003', '펜션');" id="jobArea_4003">펜션</a></li>
						</ul>
					</dd>
					<dd class="view">
						<div class="dbTabs type01 jobAreaType">
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTypeClick(0);" class="on">사업체 수</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTypeClick(1);">업종 비율</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTypeClick(2);">거주인구</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTypeClick(3);">직장인구</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTypeClick(4);">가구 수</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTypeClick(5);">종사자 수</a>
							<a href="javascript:$bizStatsDataBoard.ui.jobAreaTypeClick(6);">평균 종사자 수</a>
						</div>

						<!-- 사업체 수 start -->
						<div class="jobAreaTypeCont" id="jobAreaTypeCont01">
							<p class="horizontalTitle mt20">
								<span><span class="jobAreaThemeNmSpan"></span> 사업체 수 : <span class="sggSpan"></span>  <span class="jobAreaChartTotal">25</span>개 시군구 중 </span>  <span class="sggSpan02"></span> <strong id="jobAreaChartRank01">1</strong><span>위</span>
								<span class="etcRight" id="jobAreaTitle01">개</span>
							</p>
							<div class="foodAreaCharts typeCharts05" id="jobAreaCharts01"></div>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청, 등록센서스(2016)</p>
						</div>
						<!-- 사업체 수 end -->
						<!-- 업종비율 Start -->
						<div class="jobAreaTypeCont" id="jobAreaTypeCont02">
							<p class="horizontalTitle mt20">
								<span>상위지역 대비 <span class="jobAreaThemeNmSpan"></span> 업종의 비율 : <span class="sggSpan"></span>  <span class="jobAreaChartTotal">25</span>개 시군구 중 </span> <span class="sggSpan02"></span> <strong id="jobAreaChartRank02">1</strong><span>위</span>
								<span class="etcRight" id="jobAreaTitle02">%</span>
							</p>
							<div class="foodAreaCharts typeCharts05" id="jobAreaCharts02"></div>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청, 등록센서스(2016)</p>
						</div>
						<!-- 업종비율 End -->
						<!-- 거주인구 Start -->
						<div class="jobAreaTypeCont" id="jobAreaTypeCont03">
							<p class="horizontalTitle mt20">
								<span><span class="jobAreaThemeNmSpan"></span> 업종의 수 대비 거주인구 : <span class="sggSpan"></span>  <span class="jobAreaChartTotal">25</span>개 시군구 중 </span> <span class="sggSpan02"></span> <strong id="jobAreaChartRank03">1</strong><span>위</span>
								<span class="etcRight" id="jobAreaTitle03">명/개</span>
							</p>
							<div class="foodAreaCharts typeCharts05" id="jobAreaCharts03"></div>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청, 등록센서스(2016)</p>
						</div>
						<!-- 거주인구 End -->
						<!-- 직장인구 Start -->
						<div class="jobAreaTypeCont" id="jobAreaTypeCont04">
							<p class="horizontalTitle mt20">
								<span><span class="jobAreaThemeNmSpan"></span> 업종의 수 대비 직장인구 : <span class="sggSpan"></span>  <span class="jobAreaChartTotal">25</span>개 시군구 중 </span> <span class="sggSpan02"></span> <strong id="jobAreaChartRank04">1</strong><span>위</span>
								<span class="etcRight" id="jobAreaTitle04">명/개</span>
							</p>
							<div class="foodAreaCharts typeCharts05" id="jobAreaCharts04"></div>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청, 등록센서스(2016)</p>
						</div>
						<!-- 직장인구 End -->
						<!-- 가구 수 Start -->
						<div class="jobAreaTypeCont" id="jobAreaTypeCont05">
							<p class="horizontalTitle mt20">
								<span><span class="jobAreaThemeNmSpan"></span> 업종의 수 대비 가구 수 : <span class="sggSpan"></span>  <span class="jobAreaChartTotal">25</span>개 시군구 중 </span> <span class="sggSpan02"></span> <strong id="jobAreaChartRank05">1</strong><span>위</span>
								<span class="etcRight" id="jobAreaTitle05">가구/개</span>
							</p>
							<div class="foodAreaCharts typeCharts05" id="jobAreaCharts05"></div>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청, 등록센서스(2016)</p>
						</div>
						<!-- 가구 수 End -->
						<!-- 종사자 수 Start -->
						<div class="jobAreaTypeCont" id="jobAreaTypeCont06">
							<p class="horizontalTitle mt20">
								<span><span class="jobAreaThemeNmSpan"></span> 업종 종사자 수 : <span class="sggSpan"></span>  <span class="jobAreaChartTotal">25</span>개 시군구 중 </span> <span class="sggSpan02"></span> <strong id="jobAreaChartRank06">1</strong><span>위</span>
								<span class="etcRight" id="jobAreaTitle06">명</span>
							</p>
							<div class="foodAreaCharts typeCharts05" id="jobAreaCharts06"></div>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청, 등록센서스(2016)</p>
						</div>
						<!-- 종사자 수 End -->
						<!-- 평균 종사자 수 Start -->

						<div class="jobAreaTypeCont" id="jobAreaTypeCont07">
							<p class="horizontalTitle mt20">
								<span><span class="jobAreaThemeNmSpan"></span> 업종의 수 대비 평균 종사자 수 : <span class="sggSpan"></span>  <span class="jobAreaChartTotal">25</span>개 시군구 중 </span> <span class="sggSpan02"></span> <strong id="jobAreaChartRank07">1</strong><span>위</span>
								<span class="etcRight" id="jobAreaTitle07">명</span>
							</p>
							<div class="foodAreaCharts typeCharts05" id="jobAreaCharts07"></div>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016), 통계청, 등록센서스(2016)</p>
						</div>
						<!-- 평균 종사자 수 End -->

					</dd>
				</dl>

			</div>
			<!-- 업종별 지역현황 End -->
			
			<!-- 업종밀집도 변화 Start -->
			<div class="dataBoardDiv" id="jobChangeDiv">
				<p class="dbText01">업종밀집도 변화</p>
				<div class="areaBox jobChangeTitle">
					<span>서울/한식 (2014)</span>
				</div>
				<button class="MapBefore" onclick="javascript:$bizStatsMap.ui.doPrevRegionInfo('jobChange');" style="display:none;"></button>
   				<p class="areaEtcTextBox">※ 원하는 지역 내 업종별 분포 현황과 함께 연도별 업종 증감 변화를 지도상에서 확인할 수 있습니다.</p>
   				
   				<div class="dbTabs bizCateMenu">
   					<a href="javascript:$bizStatsDataBoard.ui.jobChangeTabClick('50');" id="jobChangeType50" class="on">음식점</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobChangeTabClick('20');" id="jobChangeType20">도소매</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobChangeTabClick('10');" id="jobChangeType10">서비스</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobChangeTabClick('40');" id="jobChangeType40">숙박업</a>
   				</div>
   				
   				<ul class="dbTabs01 jobChangeTab" id="jobChangeTab50">	<!-- 서비스 -->
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5001', '한식');" id="jobChange_5001">한식</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5002', '중식');" id="jobChange_5002">중식</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5003', '일식');" id="jobChange_5003">일식</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5004', '분식');" id="jobChange_5004">분식</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5005', '서양식');" id="jobChange_5005">서양식</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5006', '제과점');" id="jobChange_5006">제과점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5007', '패스트푸드');" id="jobChange_5007">패스트푸드</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5008', '치킨');" id="jobChange_5008">치킨</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5009', '호프 및 간이주점');" id="jobChange_5009">호프 및 간이주점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5010', '카페');" id="jobChange_5010">카페</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('5011', '기타 외국식');" id="jobChange_5011">기타 외국식</a></li> 
   				</ul>
   				<ul class="dbTabs01 jobChangeTab" id="jobChangeTab20">	<!-- 도소매 -->
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2001', '문구점');" id="jobChange_2001">문구점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2002', '서점');" id="jobChange_2002">서점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2003', '편의점');" id="jobChange_2003">편의점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2004', '식료품점');" id="jobChange_2004">식료품점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2005', '휴대폰점');" id="jobChange_2005">휴대폰점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2006', '의류');" id="jobChange_2006">의류</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2007', '화장품/방향제');" id="jobChange_2007">화장품/방향제</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2008', '철물점');" id="jobChange_2008">철물점</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2009', '주유소');" id="jobChange_2009">주유소</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2010', '꽃집');" id="jobChange_2010">꽃집</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('2011', '슈퍼마켓');" id="jobChange_2011">슈퍼마켓</a></li> 
   				</ul>
   				<ul class="dbTabs01 jobChangeTab" id="jobChangeTab10">	<!-- 숙박업 -->
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1001', '인테리어');" id="jobChange_1001">인테리어</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1002', '목욕탕');" id="jobChange_1002">목욕탕</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1003', '교습학원');" id="jobChange_1003">교습학원</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1004', '어학원');" id="jobChange_1004">어학원</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1005', '예체능학원');" id="jobChange_1005">예체능학원</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1006', '부동산중개업');" id="jobChange_1006">부동산중개업</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1007', '이발소');" id="jobChange_1007">이발소</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1008', '미용실');" id="jobChange_1008">미용실</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1009', '세탁소');" id="jobChange_1009">세탁소</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1010', 'PC방');" id="jobChange_1010">PC방</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('1011', '노래방');" id="jobChange_1011">노래방</a></li> 
   				</ul>
   				<ul class="dbTabs01 jobChangeTab" id="jobChangeTab40">	<!-- 숙박업 -->
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('4001', '호텔');" id="jobChange_4001">호텔</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('4002', '여관(모텔포함) 및 여인숙');" id="jobChange_4002">여관(모텔포함) 및 여인숙</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobChangeThemeClick('4003', '펜션');" id="jobChange_4003">펜션</a></li>
   				</ul>
   				 
   				<dl class="dscList type02"> 
    				<dd>
    					<div class="lineTextBox"></div> 
    				</dd>
    				<dd>
    					<p class="timeTitle">시계열별 데이터 조회</p>
    					<div class="timeAreaCharts" id="jobChangeBarCharts"></div>
    					<p class="timeTitle">조회년도 설정</p>
    					<div class="ysettingBox">
    						<ul class="ysettingList">
    							<c:forEach var="year" begin="2006" end="2016">
    								<c:choose>
    									<c:when test="${year == 2016}">
    										<li style="display: block;" >
    											<input type="checkbox" id="y${year}" value="${year}" checked="checked" title="${year}년 선택" />
    											<a class="on" href="javascript:void(0);" id="div_y${year}">${year}</a>
    										</li>
    									</c:when>
    									<c:otherwise>
    										<li style="display: block;">
    											<input type="checkbox" id="y${year}" value="${year}" title="${year}년 선택" >
    											<a href="javascript:void(0);" id="div_y${year}">${year}</a>
   											</li>
    									</c:otherwise>
    								</c:choose>
    							</c:forEach>
							</ul>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 통계청,전국사업체조사(2016)</p>
	    				</div>
    				</dd> 
    			</dl>
			</div>
			<!-- 업종밀집도 변화 End -->
			
			<!-- 지자체 인허가 업종별 개업 현황 Start -->
			<div class="dataBoardDiv" id="jobOpenDiv">
				<p class="dbText01">업종별 개업 현황</p>
				<div class="areaBox jobOpenTitle">
					<span>문화체육/공중이용시설(학원) 2015</span>
				</div>
				<button class="MapBefore" onclick="javascript:$bizStatsMap.ui.doPrevRegionInfo('jobOpen');" style="display:none;"></button>
   				<p class="areaEtcTextBox">※지자체 인허가 업종 5개 분류에 대한 개업 현황을 확인할 수 있습니다.</p>
   				
   				<div class="dbTabs bizCateMenu">
   					<a href="javascript:$bizStatsDataBoard.ui.jobOpenTabClick2('10');" id="jobOpenType10" class="on">문화체육</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobOpenTabClick2('20');" id="jobOpenType20">관광</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobOpenTabClick2('30');" id="jobOpenType30">식품</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobOpenTabClick2('40');" id="jobOpenType40">소상공인</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobOpenTabClick2('50');" id="jobOpenType50">산업고용</a>
   				</div>
   				
   				<ul class="dbTabs01 jobOpenTab" id="jobOpenTab10">	<!-- 문화체육 -->
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('22_09_01_P', '인터넷 컴퓨터 게임시설 제공업');" id="jobOpen_22_09_01_P">인터넷 컴퓨터 게임시설 제공업</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('22_14_01_P', '청소년 게임 제공업');" id="jobOpen_22_14_01_P">청소년 게임 제공업</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('21_06_01_P', '노래연습장업');" id="jobOpen_21_06_01_P">노래연습장업</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('23_06_01_P', '체육도장업');" id="jobOpen_23_06_01_P">체육도장업</a></li> 
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('23_12_01_P', '무도학원업');" id="jobOpen_23_12_01_P">무도학원업</a></li>
   					<!-- 
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_36_01_P', '공중이용시설(학원)');" id="jobOpen_41_36_01_P">공중이용시설(학원)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('23_11_01_P', '무도장업');" id="jobOpen_23_11_01_P">무도장업</a></li>
   					 -->
   				</ul>
   				<ul class="dbTabs01 jobOpenTab" id="jobOpenTab20">	<!-- 관광 -->
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_43_01_P', '숙박업');" id="jobOpen_41_43_01_P">숙박업</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_16_01_P', '숙박업(일반-여관업)');" id="jobOpen_41_16_01_P">숙박업(일반-여관업)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_17_01_P', '숙박업(일반-여인숙업)');" id="jobOpen_41_17_01_P">숙박업(일반-여인숙업)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_14_01_P', '숙박업(일반-일반호텔)');" id="jobOpen_41_14_01_P">숙박업(일반-일반호텔)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_13_01_P', '숙박업(일반-관광호텔)');" id="jobOpen_41_13_01_P">숙박업(일반-관광호텔)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('16_19_01_P', '관광펜션업');" id="jobOpen_16_19_01_P">관광펜션업</a></li>
   					<!-- 
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_15_01_P', '숙박업(일반-휴양콘도미니엄업)');" id="jobOpen_41_15_01_P">숙박업(일반-휴양콘도미니엄업)</a></li>
   					 -->
   				</ul>
   				<ul class="dbTabs01 jobOpenTab" id="jobOpenTab30">	<!-- 식품 -->
   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_01_01_P', '일반음식점(한식)');" id="jobOpen_24_01_01_P">일반음식점(한식)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_44_01_P', '휴게음식점(커피숍)');" id="jobOpen_24_44_01_P">휴게음식점(커피숍)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_20_01_P', '일반음식점(기타)');" id="jobOpen_24_20_01_P">일반음식점(기타)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_12_01_P', '일반음식점(호프/통닭)');" id="jobOpen_24_12_01_P">일반음식점(호프/통닭)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_05_01_P', '일반음식점(분식)');" id="jobOpen_24_05_01_P">일반음식점(분식)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_18_01_P', '일반음식점(식육(숯불구이))');" id="jobOpen_24_18_01_P">일반음식점(식육(숯불구이))</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_03_01_P', '일반음식점(경양식)');" id="jobOpen_24_03_01_P">일반음식점(경양식)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_42_01_P', '휴게음식점(편의점)');" id="jobOpen_24_42_01_P">휴게음식점(편의점)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_48_01_P', '제과점영업');" id="jobOpen_24_48_01_P">제과점영업</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_07_01_P', '일반음식점(정종,대포집,소주방)');" id="jobOpen_24_07_01_P">일반음식점(정종,대포집,소주방)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_04_01_P', '일반음식점(일식)');" id="jobOpen_24_04_01_P">일반음식점(일식)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_02_01_P', '일반음식점(중국식)');" id="jobOpen_24_02_01_P">일반음식점(중국식)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_43_01_P', '휴게음식점(패스트푸드)');" id="jobOpen_24_43_01_P">휴게음식점(패스트푸드)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_16_01_P', '일반음식점(횟집)');" id="jobOpen_24_16_01_P">일반음식점(횟집)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_32_01_P', '단란주점영업');" id="jobOpen_24_32_01_P">단란주점영업</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_06_01_P', '일반음식점(뷔페식)');" id="jobOpen_24_06_01_P">일반음식점(뷔페식)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_15_01_P', '일반음식점(김밥(도시락))');" id="jobOpen_24_15_01_P">일반음식점(김밥(도시락))</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_19_01_P', '일반음식점(탕류(보신용))');" id="jobOpen_24_19_01_P">일반음식점(탕류(보신용))</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_45_01_P', '휴게음식점(전통찻집)');" id="jobOpen_24_45_01_P">휴게음식점(전통찻집)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_81_01_P', '일반음식점(패밀리레스토랑)');" id="jobOpen_24_81_01_P">일반음식점(패밀리레스토랑)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_76_01_P', '일반음식점(라이브카페)');" id="jobOpen_24_76_01_P">일반음식점(라이브카페)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_71_01_P', '유흥주점영업(노래클럽)');" id="jobOpen_24_71_01_P">유흥주점영업(노래클럽)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_68_01_P', '일반음식점(감성주점)');" id="jobOpen_24_68_01_P">일반음식점(감성주점)</a></li>
   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_70_01_P', '일반음식점(냉면집)');" id="jobOpen_24_70_01_P">일반음식점(냉면집)</a></li>
   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_30_01_P', '유흥주점영업(간이주점)');" id="jobOpen_24_30_01_P">유흥주점영업(간이주점)</a></li>
   					
   					<!--
   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('24_14_01_P', '일반음식점(복어취급)');" id="jobOpen_24_14_01_P">일반음식점(복어취급)</a></li>
   					-->
   					
   					
   				</ul>
   				<ul class="dbTabs01 jobOpenTab" id="jobOpenTab40">	<!-- 소상공인 -->
   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_01_P', '미용업(일반)	                  ');" id="jobOpen_41_40_01_P">미용업(일반)	                  	</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_41_01_P', '미용업(피부)	                  ');" id="jobOpen_41_41_01_P">미용업(피부)	                  	</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_02_P', '미용업(손톱ㆍ발톱)	              ');" id="jobOpen_41_40_02_P">미용업(손톱ㆍ발톱)	          	</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_24_01_P', '이용업	                      ');" id="jobOpen_41_24_01_P">이용업	                      	</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_41_02_P', '미용업(피부/손톱ㆍ발톱)	          ');" id="jobOpen_41_41_02_P">미용업(피부/손톱ㆍ발톱)	      	</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_42_01_P', '미용업(종합)	                  ');" id="jobOpen_41_42_01_P">미용업(종합)	                  	</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_04_P', '미용업(일반/손톱ㆍ발톱)	          ');" id="jobOpen_41_40_04_P">미용업(일반/손톱ㆍ발톱)	          </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_09_P', '미용업(일반/화장ㆍ분장)	          ');" id="jobOpen_41_40_09_P">미용업(일반/화장ㆍ분장)	          </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_05_P', '미용업(일반/손톱ㆍ발톱/화장ㆍ분장) ');" id="jobOpen_41_40_05_P">미용업(일반/손톱ㆍ발톱/화장ㆍ분장)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_03_P', '미용업(손톱ㆍ발톱/화장ㆍ분장)	  ');" id="jobOpen_41_40_03_P">미용업(손톱ㆍ발톱/화장ㆍ분장)	  </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_19_01_P', '목욕장업(공동탕업)	              ');" id="jobOpen_41_19_01_P">목욕장업(공동탕업)	              </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_41_05_P', '미용업(화장ㆍ분장)	              ');" id="jobOpen_41_41_05_P">미용업(화장ㆍ분장)	              </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_06_P', '미용업(일반/피부)	              ');" id="jobOpen_41_40_06_P">미용업(일반/피부)	              </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_41_03_P', '미용업(피부/손톱ㆍ발톱/화장ㆍ분장) ');" id="jobOpen_41_41_03_P">미용업(피부/손톱ㆍ발톱/화장ㆍ분장)</a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_07_P', '미용업(일반/피부/손톱ㆍ발톱)	  ');" id="jobOpen_41_40_07_P">미용업(일반/피부/손톱ㆍ발톱)	  </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_41_04_P', '미용업(피부/화장ㆍ분장)	          ');" id="jobOpen_41_41_04_P">미용업(피부/화장ㆍ분장)	          </a></li>
					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_40_08_P', '미용업(일반/피부/화장ㆍ분장)	  ');" id="jobOpen_41_40_08_P">미용업(일반/피부/화장ㆍ분장)	  </a></li>
				   					
   					<!-- 
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_22_01_P', '목욕장업(공동탕업+찜질시설서비스영업)');" id="jobOpen_41_22_01_P">목욕장업(공동탕업+찜질시설서비스영업)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_21_01_P', '목욕장업(찜질시설서비스영업)');" id="jobOpen_41_21_01_P">목욕장업(찜질시설서비스영업)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('41_20_01_P', '목욕장업(한증막업)');" id="jobOpen_41_20_01_P">목욕장업(한증막업)</a></li>
   					 -->
   					
   				</ul>
   				<ul class="dbTabs01 jobOpenTab" id="jobOpenTab50">	<!-- 산업고용 -->
					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('42_08_05_P', '석유판매업(주유소)');" id="jobOpen_42_08_05_P">석유판매업(주유소)</a></li>
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('42_03_01_P', '석유 및 석유대체연료 판매업체');" id="jobOpen_42_03_01_P">석유 및 석유대체연료 판매업체</a></li>
					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('42_08_04_P', '석유판매업(일반판매소)');" id="jobOpen_42_08_04_P">석유판매업(일반판매소)</a></li>
					<!-- 
   					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('42_08_07_P', '석유판매업(항공유판매소)');" id="jobOpen_42_08_07_P">석유판매업(항공유판매소)</a></li>
					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('42_08_06_P', '석유판매업(특수판매소)');" id="jobOpen_42_08_06_P">석유판매업(특수판매소)</a></li>
					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('42_08_03_P', '석유판매업(용제판매소)');" id="jobOpen_42_08_03_P">석유판매업(용제판매소)</a></li>
					<li><a href="javascript:$bizStatsDataBoard.ui.jobOpenThemeClick('42_08_02_P', '석유판매업(부생연료유판매소)');" id="jobOpen_42_08_02_P">석유판매업(부생연료유판매소)</a></li>
					 -->
   				</ul>
   				 
   				<dl class="dscList type02"> 
    				<dd>
    					<div class="lineTextBox"></div> 
    				</dd>
    				<dd>
    					<p class="timeTitle">시계열별 데이터 조회</p>
    					<div class="timeAreaCharts" id="jobOpenBarCharts"></div>
    					<p class="timeTitle">조회년도 설정</p>
    					<div class="ysettingBox">
    						<ul class="ysettingList">
    							
    							<!-- 2018년 추가 되어서 변경함.  mng_s 20180416_김건민 -->
    							<c:forEach var="year" begin="2017" end="2018">
    								<c:choose>
    									<c:when test="${year == 2017}">
    										<li style="display: block;" >
    											<input type="checkbox" id="y${year}" value="${year}" checked="checked" title="${year}년 선택">
    											<a class="on" href="javascript:void(0);" id="div_y${year}">${year}</a>
    										</li>
    									</c:when>
    									<c:when test="${year == 2018}">
    										<li style="display: block;" >
    											<input type="checkbox" id="y${year}" value="${year}" checked="checked"  title="${year}년 선택">
    											<a title="2018년 1월부터 현째까지" href="javascript:void(0);" id="div_y${year}">${year}</a>
    										</li>
    									</c:when>
    									<c:otherwise>
    										<li style="display: block;">
    											<input type="checkbox" id="y${year}" value="${year}"  title="${year}년 선택">
    											<a href="javascript:void(0);" id="div_y${year}">${year}</a>
   											</li>
    									</c:otherwise>
    								</c:choose>
    							</c:forEach>
    							<!--  mng_e 20180416_김건민 -->
    							<!-- 현재 년도가 2017년도 밖에 없어서 아래 코드를 사용하지만 년도가 늘어나면 위 코드에서 년도를 변경하여 적용하여야함. 20180307 -->
    							<%-- <c:forEach var="year" begin="2017" end="2017">
    								<c:choose>
    									<c:when test="${year == 2017}">
    										<li style="display: block;" >
    											<input type="checkbox" id="y${year}" value="${year}" checked="checked" title="${year}년 선택">
    											<a class="on" href="javascript:void(0);" id="div_y${year}">${year}</a>
    										</li>
    									</c:when>
    									
    									<c:otherwise>
    										<li style="display: block;">
    											<input type="checkbox" id="y${year}" value="${year}"  title="${year}년 선택">
    											<a href="javascript:void(0);" id="div_y${year}">${year}</a>
   											</li>
    									</c:otherwise>
    								</c:choose>
    							</c:forEach> --%>
    							
    							
							</ul>
							<!-- 2017-02-09 출처 -->
    						<p class="etcRight05">출처 : 한국지역정보개발원</p>
	    				</div>
    				</dd> 
    			</dl>
			</div>
			<!-- 지자체 인허가 업종별 개업 현황 End -->
			
			<!-- mng_s 업종별 뜨는 지역 Start -->
			<div class="dataBoardDiv" id="jobBestDiv">
				<p class="dbText01">업종별 뜨는 지역 Best3</p>
				<div class="areaBox jobBestTitle">
					<span>문화체육/공중이용시설(학원) 2015</span>
				</div>
				<!-- <button class="MapBefore" onclick="javascript:$bizStatsMap.ui.doPrevRegionInfo('jobBest');" style="display:none;"></button> -->
   				<p class="areaEtcTextBox">개업기간 : 2015년 1월 1일 ~ 2017년 9월 30일</p>
   				<p id="jb_interest_area" style="font-size:12px;margin-left:10px; color:#848485;">관심지역 : 전국</p>
   				
   				<dl class="dscList type02"> 
    				<dd>
    					<div class="lineTextBox"></div> 
    				</dd>
    				<dd>
    					<p class="timeTitle">Best3 읍면동</p>
    					<ul id="jobBest3List">
    						<li>jobBest3List</li>
    					</ul>
    				</dd> 
    			</dl>
   				
   				<p style="font-size:12px;margin-left:40px; color:#848485;">※ 지도를 확대하면 업체 위치를 확인할 수 있습니다.</p>
   				
   				<dl class="dscList type02"> 
    				<dd>
    					<div class="lineTextBox"></div> 
    				</dd>
    				<!-- 
    				<dd>
    					<div class="timeAreaCharts" id="jobBestBarCharts"></div>
    				</dd>
    				 -->
    			</dl>
   				<div class="dbTabs bizCateMenu">
   					<a href="javascript:$bizStatsDataBoard.ui.jobBestTabClick2('10');" id="jobBestType10" class="on">문화체육</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobBestTabClick2('20');" id="jobBestType20">관광</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobBestTabClick2('30');" id="jobBestType30">식품</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobBestTabClick2('40');" id="jobBestType40">소상공인</a>
   					<a href="javascript:$bizStatsDataBoard.ui.jobBestTabClick2('50');" id="jobBestType50">산업고용</a>
   				</div>
   				
   				<!-- <div class="timeAreaCharts" id="jobBestBarCharts"></div> -->
   				<div style="display:none;">
   					<ul>	<!-- 문화체육 -->
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('22_09_01_P', '인터넷 컴퓨터 게임시설 제공업');" id="jobBest_22_09_01_P">인터넷 컴퓨터 게임시설 제공업</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('22_14_01_P', '청소년 게임 제공업');" id="jobBest_22_14_01_P">청소년 게임 제공업</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('21_06_01_P', '노래연습장업');" id="jobBest_21_06_01_P">노래연습장업</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('23_06_01_P', '체육도장업');" id="jobBest_23_06_01_P">체육도장업</a></li> 
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('23_12_01_P', '무도학원업');" id="jobBest_23_12_01_P">무도학원업</a></li>
	   					<!-- 
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_36_01_P', '공중이용시설(학원)');" id="jobBest_41_36_01_P">공중이용시설(학원)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('23_11_01_P', '무도장업');" id="jobBest_23_11_01_P">무도장업</a></li>
	   					 -->
	   				</ul>
	   				<ul>	<!-- 관광 -->
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_43_01_P', '숙박업');" id="jobBest_41_43_01_P">숙박업</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_16_01_P', '숙박업(일반-여관업)');" id="jobBest_41_16_01_P">숙박업(일반-여관업)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_17_01_P', '숙박업(일반-여인숙업)');" id="jobBest_41_17_01_P">숙박업(일반-여인숙업)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_14_01_P', '숙박업(일반-일반호텔)');" id="jobBest_41_14_01_P">숙박업(일반-일반호텔)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_13_01_P', '숙박업(일반-관광호텔)');" id="jobBest_41_13_01_P">숙박업(일반-관광호텔)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('16_19_01_P', '관광펜션업');" id="jobBest_16_19_01_P">관광펜션업</a></li>
	   					<!-- 
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_15_01_P', '숙박업(일반-휴양콘도미니엄업)');" id="jobBest_41_15_01_P">숙박업(일반-휴양콘도미니엄업)</a></li>
	   					 -->
	   				</ul>
	   				<ul>	<!-- 식품 -->
	   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_01_01_P', '일반음식점(한식)');" id="jobBest_24_01_01_P">일반음식점(한식)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_44_01_P', '휴게음식점(커피숍)');" id="jobBest_24_44_01_P">휴게음식점(커피숍)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_20_01_P', '일반음식점(기타)');" id="jobBest_24_20_01_P">일반음식점(기타)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_12_01_P', '일반음식점(호프/통닭)');" id="jobBest_24_12_01_P">일반음식점(호프/통닭)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_05_01_P', '일반음식점(분식)');" id="jobBest_24_05_01_P">일반음식점(분식)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_18_01_P', '일반음식점(식육(숯불구이))');" id="jobBest_24_18_01_P">일반음식점(식육(숯불구이))</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_03_01_P', '일반음식점(경양식)');" id="jobBest_24_03_01_P">일반음식점(경양식)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_42_01_P', '휴게음식점(편의점)');" id="jobBest_24_42_01_P">휴게음식점(편의점)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_48_01_P', '제과점영업');" id="jobBest_24_48_01_P">제과점영업</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_07_01_P', '일반음식점(정종,대포집,소주방)');" id="jobBest_24_07_01_P">일반음식점(정종,대포집,소주방)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_04_01_P', '일반음식점(일식)');" id="jobBest_24_04_01_P">일반음식점(일식)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_02_01_P', '일반음식점(중국식)');" id="jobBest_24_02_01_P">일반음식점(중국식)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_43_01_P', '휴게음식점(패스트푸드)');" id="jobBest_24_43_01_P">휴게음식점(패스트푸드)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_16_01_P', '일반음식점(횟집)');" id="jobBest_24_16_01_P">일반음식점(횟집)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_32_01_P', '단란주점영업');" id="jobBest_24_32_01_P">단란주점영업</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_06_01_P', '일반음식점(뷔페식)');" id="jobBest_24_06_01_P">일반음식점(뷔페식)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_15_01_P', '일반음식점(김밥(도시락))');" id="jobBest_24_15_01_P">일반음식점(김밥(도시락))</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_19_01_P', '일반음식점(탕류(보신용))');" id="jobBest_24_19_01_P">일반음식점(탕류(보신용))</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_45_01_P', '휴게음식점(전통찻집)');" id="jobBest_24_45_01_P">휴게음식점(전통찻집)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_81_01_P', '일반음식점(패밀리레스토랑)');" id="jobBest_24_81_01_P">일반음식점(패밀리레스토랑)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_76_01_P', '일반음식점(라이브카페)');" id="jobBest_24_76_01_P">일반음식점(라이브카페)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_71_01_P', '유흥주점영업(노래클럽)');" id="jobBest_24_71_01_P">유흥주점영업(노래클럽)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_68_01_P', '일반음식점(감성주점)');" id="jobBest_24_68_01_P">일반음식점(감성주점)</a></li>
	   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_70_01_P', '일반음식점(냉면집)');" id="jobBest_24_70_01_P">일반음식점(냉면집)</a></li>
	   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_30_01_P', '유흥주점영업(간이주점)');" id="jobBest_24_30_01_P">유흥주점영업(간이주점)</a></li>
	   					
	   					<!--
	   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('24_14_01_P', '일반음식점(복어취급)');" id="jobBest_24_14_01_P">일반음식점(복어취급)</a></li>
	   					-->
	   					
	   					
	   				</ul>
	   				<ul>	<!-- 소상공인 -->
	   					<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_01_P', '미용업(일반)	                  ');" id="jobBest_41_40_01_P">미용업(일반)	                  	</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_41_01_P', '미용업(피부)	                  ');" id="jobBest_41_41_01_P">미용업(피부)	                  	</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_02_P', '미용업(손톱ㆍ발톱)	              ');" id="jobBest_41_40_02_P">미용업(손톱ㆍ발톱)	          	</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_24_01_P', '이용업	                      ');" id="jobBest_41_24_01_P">이용업	                      	</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_41_02_P', '미용업(피부/손톱ㆍ발톱)	          ');" id="jobBest_41_41_02_P">미용업(피부/손톱ㆍ발톱)	      	</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_42_01_P', '미용업(종합)	                  ');" id="jobBest_41_42_01_P">미용업(종합)	                  	</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_04_P', '미용업(일반/손톱ㆍ발톱)	          ');" id="jobBest_41_40_04_P">미용업(일반/손톱ㆍ발톱)	          </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_09_P', '미용업(일반/화장ㆍ분장)	          ');" id="jobBest_41_40_09_P">미용업(일반/화장ㆍ분장)	          </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_05_P', '미용업(일반/손톱ㆍ발톱/화장ㆍ분장) ');" id="jobBest_41_40_05_P">미용업(일반/손톱ㆍ발톱/화장ㆍ분장)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_03_P', '미용업(손톱ㆍ발톱/화장ㆍ분장)	  ');" id="jobBest_41_40_03_P">미용업(손톱ㆍ발톱/화장ㆍ분장)	  </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_19_01_P', '목욕장업(공동탕업)	              ');" id="jobBest_41_19_01_P">목욕장업(공동탕업)	              </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_41_05_P', '미용업(화장ㆍ분장)	              ');" id="jobBest_41_41_05_P">미용업(화장ㆍ분장)	              </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_06_P', '미용업(일반/피부)	              ');" id="jobBest_41_40_06_P">미용업(일반/피부)	              </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_41_03_P', '미용업(피부/손톱ㆍ발톱/화장ㆍ분장) ');" id="jobBest_41_41_03_P">미용업(피부/손톱ㆍ발톱/화장ㆍ분장)</a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_07_P', '미용업(일반/피부/손톱ㆍ발톱)	  ');" id="jobBest_41_40_07_P">미용업(일반/피부/손톱ㆍ발톱)	  </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_41_04_P', '미용업(피부/화장ㆍ분장)	          ');" id="jobBest_41_41_04_P">미용업(피부/화장ㆍ분장)	          </a></li>
						<li style="width:170px;"><a style="text-align: left;" href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_40_08_P', '미용업(일반/피부/화장ㆍ분장)	  ');" id="jobBest_41_40_08_P">미용업(일반/피부/화장ㆍ분장)	  </a></li>
					   					
	   					<!-- 
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_22_01_P', '목욕장업(공동탕업+찜질시설서비스영업)');" id="jobBest_41_22_01_P">목욕장업(공동탕업+찜질시설서비스영업)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_21_01_P', '목욕장업(찜질시설서비스영업)');" id="jobBest_41_21_01_P">목욕장업(찜질시설서비스영업)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('41_20_01_P', '목욕장업(한증막업)');" id="jobBest_41_20_01_P">목욕장업(한증막업)</a></li>
	   					 -->
	   					
	   				</ul>
	   				<ul>	<!-- 산업고용 -->
						<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('42_08_05_P', '석유판매업(주유소)');" id="jobBest_42_08_05_P">석유판매업(주유소)</a></li>
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('42_03_01_P', '석유 및 석유대체연료 판매업체');" id="jobBest_42_03_01_P">석유 및 석유대체연료 판매업체</a></li>
						<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('42_08_04_P', '석유판매업(일반판매소)');" id="jobBest_42_08_04_P">석유판매업(일반판매소)</a></li>
						<!-- 
	   					<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('42_08_07_P', '석유판매업(항공유판매소)');" id="jobBest_42_08_07_P">석유판매업(항공유판매소)</a></li>
						<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('42_08_06_P', '석유판매업(특수판매소)');" id="jobBest_42_08_06_P">석유판매업(특수판매소)</a></li>
						<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('42_08_03_P', '석유판매업(용제판매소)');" id="jobBest_42_08_03_P">석유판매업(용제판매소)</a></li>
						<li><a href="javascript:$bizStatsDataBoard.ui.jobBestThemeClick('42_08_02_P', '석유판매업(부생연료유판매소)');" id="jobBest_42_08_02_P">석유판매업(부생연료유판매소)</a></li>
						 -->
	   				</ul>
   				</div>
   				
   				<ul class="dbTabs01 jobBestTab" id="jobBestTab10" style="display:none;">	<!-- 문화체육 -->
   					
   				</ul>
   				<ul class="dbTabs01 jobBestTab" id="jobBestTab20" style="display:none;">	<!-- 관광 -->
   					
   				</ul>
   				<ul class="dbTabs01 jobBestTab" id="jobBestTab30" style="display:none;">	<!-- 식품 -->
   					
   				</ul>
   				<ul class="dbTabs01 jobBestTab" id="jobBestTab40" style="display:none;">	<!-- 소상공인 -->
   					
   				</ul>
   				<ul class="dbTabs01 jobBestTab" id="jobBestTab50" style="display:none;">	<!-- 산업고용 -->
					
   				</ul>
   				
   				<p class="etcRight05">출처 : 한국지역정보개발원</p>
   				<br>
			</div>
			<!-- mng_e 업종별 뜨는 지역  End -->
			
			<!-- 지역 종합정보 Start -->
			<div class="dataBoardDiv" id="areaInfoDiv">
				<p class="dbText01">지역 종합정보</p>
   				<div class="areaBox">
   					<font class="areaInfoTitle">서울특별시<strong>/강남구</strong></font>
	   				<p class="areaEtcTextBox">※ 원하는 지역을 선택하여 해당 지역의 다양한 통계정보를 확인하실 수 있습니다.</p>
   				</div>
   				<dl class="dscList">
   					<dt class="mt15" id="areaSearchMinimap01"><a href="javascript:void(0)" class="on">후보지 검색결과</a></dt>
   					<dd id="areaSearchMinimap02">
    					<div class="clickArea">
	    					<div class="areaInfoMiniMap"><div id="miniMap_01"></div></div>
	    					<div class="clickListBox">
	    						<p class="rsText">후보지 리스트 총  <strong id="areaInfoCandidateCnt">0</strong>개 검색</p>
		    					<div class="mapResultList">
		    						<ul id="areaInfoCandidateList">
		    							<li><a href="javascript:void(0)">1. B지점/매체안경원 앞 유동인구</a></li>
		    							<li><a href="javascript:void(0)">2. A지점/압구정역 2번출구 유동인구</a></li>
		    							<li><a href="javascript:void(0)">3. B지점/세븐일레븐앞 유동인근</a></li>
		    							<li><a href="javascript:void(0)">4. A지점/하나은행앞 유동인구</a></li>
		    							<li><a href="javascript:void(0)">5. A지점/DKNY앞 유동인구</a></li>
		    							<li><a href="javascript:void(0)">6. 연극 행복</a></li>
		    							<li><a href="javascript:void(0)">7. 연극 행복</a></li>
		    							<li><a href="javascript:void(0)">8. 연극 행복</a></li>
		    							<li><a href="javascript:void(0)">9. 연극 행복</a></li>
		    						</ul>
		    					</div>
	    					</div>
    					</div>
    				</dd>
    				<dt class="mt15"><a href="javascript:void(0)" class="on">지역 특성정보 보기</a></dt>
    				<dd>
    					<div class="typeCharts03" id="spyCharts01"></div>
    					<a href="javascript:void(0)" class="ar"  style="position:absolute;margin-top:-292px;margin-left:320px;" data-subj="지역특성정보 방사형그래프" title="${paramInfo.tooltipList.B0302}"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="아이콘" /></a>
    					<div class="fb">
    						<ul class="cateSaupLegend line">
    							<li id="spyChartsArea01"></li>
    							<li id="spyChartsArea02"></li> 
    						</ul>
    					</div>
    					<p class="origin_txt_2">출처 : 통계청, 인구주택총조사 (2016)</p>
    				</dd> 
    				
    				<dt class="areaInfoDT"><a href="javascript:void(0)" class="on">지역 종합현황정보 보기</a></dt>
    				<!-- 총사업체 Start -->
    				<dd class="areaInfoAllDiv" id="areaInfoCompanyDiv">
    					<div>
		   					<ul class="dbTabs02 areaInfoTab">
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('company');" class="areaInfoTab_company on" data-subj="총사업체" title="소상공인 사업체비율/업종별증감 및 주요시설물현황정보를<br>확인할 수 있습니다.">총사업체<span class="areaInfoTabTotal01">0개</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('population')" class="areaInfoTab_population" data-subj="총인구" title="연령별인구비율, 성별인구비율정보를<br>확인할 수 있습니다.">총인구<span class="areaInfoTabTotal02">0명</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('household')" class="areaInfoTab_household" data-subj="총가구" title="점유형태별/거처유형별 가구비율정보를<br>확인할 수 있습니다.">총가구<span class="areaInfoTabTotal03">0가구</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('house')" class="areaInfoTab_house" data-subj="총주택" title="주택거래가격 및 주택거래동향정보를<br>확인할 수 있습니다.">총주택<span class="areaInfoTabTotal04">0호</span></a></li> 
		   					</ul>
    					</div>
    					<div id="areaInfoChartTabDiv01">
    						<div class="dbTabs type02">
			 					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('company', 0);" class="on">소상공인 업종별 사업체 비율</a>
			   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('company', 1);">소상공인 업종별 증감</a>
			   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('company', 2);">주요시설물 현황</a>
			   				</div>
    					</div>
    					
    					<div class="dbTabs bizCateMenu">
		   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoCateClick('1');" class="on">음식점</a>
		   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoCateClick('2');">도소매</a>
		   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoCateClick('3');">서비스</a>
		   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoCateClick('4');">숙박업</a>
		   				</div>
		   				
    					<ul class="dbTabs01 areaInfoChangeTab" id="areaInfoChangeTab01">	<!-- 서비스 -->
		   					<li><a class="on" href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5001', '한식');" id="areaInfo_5001">한식</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5002', '중식');" id="areaInfo_5002">중식</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5003', '일식');" id="areaInfo_5003">일식</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5004', '분식');" id="areaInfo_5004">분식</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5005', '서양식');" id="areaInfo_5005">서양식</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5006', '제과점');" id="areaInfo_5006">제과점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5007', '패스트푸드');" id="areaInfo_5007">패스트푸드</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5008', '치킨');" id="areaInfo_5008">치킨</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5009', '호프 및 간이주점');" id="areaInfo_5009">호프 및 간이주점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5010', '카페');" id="areaInfo_5010">카페</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('5011', '기타 외국식');" id="areaInfo_5011">기타 외국식</a></li> 
		   				</ul>
		   				<ul class="dbTabs01 areaInfoChangeTab" id="areaInfoChangeTab02">	<!-- 도소매 -->
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2001', '문구점');" id="areaInfo_2001">문구점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2002', '서점');" id="areaInfo_2002">서점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2003', '편의점');" id="areaInfo_2003">편의점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2004', '식료품점');" id="areaInfo_2004">식료품점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2005', '휴대폰점');" id="areaInfo_2005">휴대폰점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2006', '의류');" id="areaInfo_2006">의류</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2007', '화장품/방향제');" id="areaInfo_2007">화장품/방향제</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2008', '철물점');" id="areaInfo_2008">철물점</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2009', '주유소');" id="areaInfo_2009">주유소</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2010', '꽃집');" id="areaInfo_2010">꽃집</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('2011', '슈퍼마켓');" id="areaInfo_2011">슈퍼마켓</a></li> 
		   				</ul>
		   				<ul class="dbTabs01 areaInfoChangeTab" id="areaInfoChangeTab03">	<!-- 숙박업 -->
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1001', '인테리어');" id="areaInfo_1001">인테리어</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1002', '목욕탕');" id="areaInfo_1002">목욕탕</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1003', '교습학원');" id="areaInfo_1003">교습학원</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1004', '어학원');" id="areaInfo_1004">어학원</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1005', '예체능학원');" id="areaInfo_1005">예체능학원</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1006', '부동산중개업');" id="areaInfo_1006">부동산중개업</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1007', '이발소');" id="areaInfo_1007">이발소</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1008', '미용실');" id="areaInfo_1008">미용실</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1009', '세탁소');" id="areaInfo_1009">세탁소</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1010', 'PC방');" id="areaInfo_1010">PC방</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('1011', '노래방');" id="areaInfo_1011">노래방</a></li> 
		   				</ul>
		   				<ul class="dbTabs01 areaInfoChangeTab" id="areaInfoChangeTab04">	<!-- 숙박업 -->
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('4001', '호텔');" id="areaInfo_4001">호텔</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('4002', '여관(모텔포함) 및 여인숙');" id="areaInfo_4002">여관(모텔포함) 및 여인숙</a></li>
		   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoThemeClick('4003', '펜션');" id="areaInfo_4003">펜션</a></li>
		   				</ul>
			   				
    					<!-- 업종별 비율 Start -->
    					<div class="compareBox areaInfoCompany" id="areaInfoCompanyDiv01">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 업종별 비율 차트 -->
    						<div class="charts">
		    					<div class="chartsSizingBox areaInfoChart" id="areaInfoFoodRateChart"></div>
		    					<div class="chartsSizingBox areaInfoChart" id="areaInfoSalesRateChart" style="display:none;"></div>
		    					<div class="chartsSizingBox areaInfoChart" id="areaInfoServiceRateChart" style="display:none;"></div>
		    					<div class="chartsSizingBox areaInfoChart" id="areaInfoHospitalityRateChart" style="display:none;"></div>
    						</div>
    						<!-- 업종별 비율 표영역 -->
    						<div class="tables">
    							<table summary="사업체, 지역1, 지역2, 지역3">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoCompanyRateHeader">
										<tr>
											<th scope="col"></th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls areaInfoTable" id="areaInfoFoodRateTable">
									<table summary="사업체, 지역1, 지역2, 지역3">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody class="tBody">
										</tbody>
									</table>
								</div>
								<div class="scrolls areaInfoTable" id="areaInfoSalesRateTable" style="display:none;">
									<table summary="사업체, 지역1, 지역2, 지역3">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody class="tBody">
										</tbody>
									</table>
								</div>
								<div class="scrolls areaInfoTable" id="areaInfoServiceRateTable" style="display:none;">
									<table summary="사업체, 지역1, 지역2, 지역3">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody class="tBody">
										</tbody>
									</table>
								</div>
								<div class="scrolls areaInfoTable" id="areaInfoHospitalityRateTable" style="display:none;">
									<table summary="사업체, 지역1, 지역2, 지역3">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody class="tBody">
										</tbody>
									</table>
								</div>
    						</div>
    						<p class="origin_txt_2">출처 : 통계청, 전국사업체조사 (2016)</p>
    					</div>
    					<!-- 업종별 비율 End -->
    					
    					<!-- 업종별 증감 Start -->
    					<div class="compareBox areaInfoCompany" id="areaInfoCompanyDiv02" style="display: none;">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 업종별 증감 차트 -->
    						<div class="charts">
    							<div class="chartsTitleBox">
		    						<img src="/img/ico/bizStats/ico_sector_img_5001.png" alt="아이콘" />
		    						<span>한식</span>
		    					</div>
		    					<div class="chartsSizingBox" id="areaInfoCompanyIndecreaseChart"></div> 
    						</div>
    						<!-- 업종별 증감 표영역 -->
    						<div class="tables">
    							<table summary="년도, 사업체명">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoCompanyIndecreaseHeader">
										<tr>
											<th scope="col">년도</th>
											<th scope="col">사업체명</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="년도, 사업체명">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoCompanyIndecreaseTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<p class="origin_txt_2">출처 : 통계청, 전국사업체조사 (2016)</p>
    					</div>
    					<!-- 업종별 증감 End -->
    					
    					<!-- 주요시설물 현황 Start -->
    					<div class="compareBox areaInfoCompany" id="areaInfoCompanyDiv03" style="display: none;">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 주요시설물 현황 차트 -->
    						<div class="charts">
		    					<div class="chartsSizingBox" id="areaInfoMainFacilityChart"></div> 
    						</div>
    						<!-- 주요시설물 현황 표영역 -->
    						<div class="tables">
    							<table summary="시설, 개수">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoMainFacilityHeader">
										<tr>
											<th scope="col">시설</th>
											<th scope="col">개수</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="시설, 개수">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoMainFacilityTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<p class="origin_txt_2">출처 : 통계청, 전국사업체조사 (2016)</p>
    					</div>
    					<!-- 주요시설물 현황 End -->
    				</dd>
    				<!-- 총사업체 End -->
    				
    				<dt class="areaInfoDT"><a href="javascript:void(0)" class="on">지역 종합현황정보 보기</a></dt>
    				<!-- 총인구 Start -->
    				<dd class="areaInfoAllDiv" id="areaInfoPopulationDiv">
    					<div>
		   					<ul class="dbTabs02 areaInfoTab">
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('company');" class="areaInfoTab_company">총사업체<span class="areaInfoTabTotal01">0개</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('population')" class="areaInfoTab_population on">총인구<span class="areaInfoTabTotal02">0명</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('household')" class="areaInfoTab_household">총가구<span class="areaInfoTabTotal03">0가구</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('house')" class="areaInfoTab_house">총주택<span class="areaInfoTabTotal04">0호</span></a></li> 
		   					</ul>
    					</div>
    					
    					<div id="areaInfoChartTabDiv02">
    						<div class="dbTabs type02">
			 					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('population', 0);" class="on">연령별 인구비율(%)</a>
			   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('population', 1);">성별 인구비율</a>
			   				</div>
    					</div>
    					
    					<!-- 연령별 인구비율 Start -->
    					<div class="compareBox" id="areaInfoPopulationDiv01">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 연령별 인구비율 차트 -->
    						<div class="charts">
		    					<div class="chartsSizingBox" id="areaInfoPopulationAgeChart"></div> 
    						</div>
    						<!-- 연령별 인구비율 표영역 -->
    						<div class="tables">
    							<table summary="연령대, 지역1, 지역2, 지역3">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoPopulationAgeHeader">
										<tr>
											<th scope="col">연령대</th>
											<th scope="col">지역1</th>
											<th scope="col">지역2</th>
											<th scope="col">지역3</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="연령대, 지역1, 지역2, 지역3">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoPopulationAgeTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<p class="origin_txt_2">출처 : 통계청, 인구주택총조사 (2016)</p>
    					</div>
    					<!-- 연령별 인구비율 End -->
    					
    					<!-- 성별 인구비율 Start -->
    					<div class="compareBox" id="areaInfoPopulationDiv02" style="display: none;">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 성별 인구비율 차트 -->
    						<div class="charts">
		    					<div class="chartsSizingBox" id="areaInfoPopulationGenderChart"></div> 
		    					<div id="areaInfoPopulationGenderChart_male"><img src="/img/im/male.png" alt="남자" /><br/><span></span></div>
								<div id="areaInfoPopulationGenderChart_female"><img src="/img/im/female.png" alt="여자" /><br/><span></span></div>
    						</div>
    						<!-- 성별 인구비율 표영역 -->
    						<div class="tables">
    							<table summary="지역명, 남자인구, 남자비율, 여자인구, 여자비율">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoPopulationGenderHeader">
										<tr>
											<th scope="col">지역명</th>
											<th scope="col">남자인구</th>
											<th scope="col">남자비율</th>
											<th scope="col">여자인구</th>
											<th scope="col">여자비율</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="지역명, 남자인구, 남자비율, 여자인구, 여자비율">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoPopulationGenderTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<p class="origin_txt_2">출처 : 통계청, 인구주택총조사 (2016)</p>
    					</div>
    					<!-- 성별 인구비율 End -->
    				</dd>
    				<!-- 총인구 End -->
    				
    				<dt class="areaInfoDT"><a href="javascript:void(0)" class="on">지역 종합현황정보 보기</a></dt>
    				<!-- 총가구 Start -->
    				<dd class="areaInfoAllDiv" id="areaInfoHouseholdDiv">
    					<div>
		   					<ul class="dbTabs02 areaInfoTab">
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('company');" class="areaInfoTab_company">총사업체<span class="areaInfoTabTotal01">0개</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('population')" class="areaInfoTab_population">총인구<span class="areaInfoTabTotal02">0명</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('household')" class="areaInfoTab_household on">총가구<span class="areaInfoTabTotal03">0가구</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('house')" class="areaInfoTab_house">총주택<span class="areaInfoTabTotal04">0호</span></a></li> 
		   					</ul>
    					</div>
    					
    					<div id="areaInfoChartTabDiv03">
    						<div class="dbTabs type02">
			 					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('household', 0);" class="on">점유형태별 가구비율(%)</a>
			   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('household', 1);">거처유형별 가구비율(%)</a>
			   				</div>
    					</div>
    					
    					<!-- 점유형태별 가구비율 Start -->
    					<div class="compareBox" id="areaInfoHouseholdDiv01">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 점유형태별 가구비율 차트 -->
    						<div class="charts">
		    					<div class="chartsSizingBox" id="areaInfoHouseholdOccupyChart"></div> 
    						</div>
    						<!-- 점유형태별 가구비율 표영역 -->
    						<div class="tables">
    							<table summary="점유형태, 지역1, 지역2, 지역3">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoHouseholdOccupyHeader">
										<tr>
											<th scope="col">점유형태</th>
											<th scope="col">지역1</th>
											<th scope="col">지역2</th>
											<th scope="col">지역3</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="점유형태, 지역1, 지역2, 지역3">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoHouseholdOccupyTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<p class="origin_txt_2">출처 : 통계청, 인구주택총조사 (2015)</p>
    					</div>
    					<!-- 점유형태별 가구비율 End -->
    					
    					<!-- 거처유형별 가구비율 Start -->
    					<div class="compareBox" id="areaInfoHouseholdDiv02" style="display: none;">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 거처유형별 가구비율 차트 -->
    						<div class="charts">
		    					<div class="chartsSizingBox" id="areaInfoHouseholdTypeChart"></div> 
    						</div>
    						<!-- 거처유형별 가구비율 표영역 -->
    						<div class="tables">
    							<table summary="거처유형, 지역1, 지역2, 지역3">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoHouseholdTypeHeader">
										<tr>
											<th scope="col">거처유형</th>
											<th scope="col">지역1</th>
											<th scope="col">지역2</th>
											<th scope="col">지역3</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="거처유형, 지역1, 지역2, 지역3">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoHouseholdTypeTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<p class="origin_txt_2">출처 : 통계청, 인구주택총조사 (2016)</p>
    					</div>
    					<!-- 거처유형별 가구비율 End -->
    				</dd>
    				<!-- 총가구 End -->
    				
    				<dt class="areaInfoDT"><a href="javascript:void(0)" class="on">지역 종합현황정보 보기</a></dt>
    				<!-- 총주택 Start -->
    				<dd class="areaInfoAllDiv" id="areaInfoHouseDiv">
    					<div>
		   					<ul class="dbTabs02 areaInfoTab">
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('company');" class="areaInfoTab_company">총사업체<span class="areaInfoTabTotal01">0개</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('population')" class="areaInfoTab_population">총인구<span class="areaInfoTabTotal02">0명</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('household')" class="areaInfoTab_household">총가구<span class="areaInfoTabTotal03">0가구</span></a></li>
			   					<li><a href="javascript:$bizStatsDataBoard.ui.areaInfoTabClick('house')" class="areaInfoTab_house on">총주택<span class="areaInfoTabTotal04">0호</span></a></li> 
		   					</ul>
    					</div>
    					
    					<div id="areaInfoChartTabDiv04">
    						<div class="dbTabs type02">
			 					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('house', 0);" class="on">㎡당 주택 거래가격 (만원)</a>
			   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('house', 1);">주택 거래 동향 (건)</a>
			   					<a href="javascript:$bizStatsDataBoard.ui.areaInfoChartTab('house', 2);">공시지가 (원/㎡)</a>
			   				</div>
    					</div>
    					
    					<!-- 주택 거래가격 Start -->
    					<div class="compareBox" id="areaInfoHouseDiv01">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 주택 거래가격 차트 -->
    						<div class="charts">
    							<p class="radio_style">
									<input type="radio" name="priceRadio" value="apt" checked="checked" title="아파트" /> 아파트 &nbsp;
									<input type="radio" name="priceRadio" value="villa" title="다세대/연립" /> 다세대/연립 &nbsp;
									<input type="radio" name="priceRadio" value="house" title="단독" /> 단독
								</p>
		    					<div class="chartsSizingBox" id="areaInfoHousePriceChart"></div> 
    						</div>
    						<!-- 주택 거래가격 표영역 -->
    						<div class="tables">
    							<table summary="년월, 최고가, 최저가">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoHousePriceHeader">
										<tr>
											<th scope="col">년월</th>
											<th scope="col">최고가</th>
											<th scope="col">최저가</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="년월, 최고가, 최저가">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoHousePriceTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<!-- 2017-02-09 출처 -->
    						<p class="origin_txt_2">출처 : 국토교통부, 주택실거래가 (2015,2016)</p>
    					</div>
    					<!-- 주택 거래가격 End -->
    					
    					<!-- 주택 거래 동향 Start -->
    					<div class="compareBox" id="areaInfoHouseDiv02" style="display: none;">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 주택 거래 동향 차트 -->
    						<div class="charts">
    							<p class="radio_style">
									<input type="radio" name="tradeRadio" value="apt" checked="checked"  title="아파트" /> 아파트 &nbsp;
									<input type="radio" name="tradeRadio" value="villa" title="다세대/연립" /> 다세대/연립 &nbsp;
									<input type="radio" name="tradeRadio" value="house" title="단독" /> 단독
								</p>
		    					<div class="chartsSizingBox" id="areaInfoHouseTradeChart"></div> 
    						</div>
    						<!-- 주택 거래 동향 표영역 -->
    						<div class="tables">
    							<table summary="년월, 매매, 전세">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoHouseTradeHeader">
										<tr>
											<th scope="col">년월</th>
											<th scope="col">매매</th>
											<th scope="col">전세</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="년월, 매매, 전세">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoHouseTradeTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<!-- 2017-02-09 출처 -->
    						<p class="origin_txt_2">출처 : 국토교통부, 주택실거래가 (2015,2016)</p>
    					</div>
    					<!-- 주택 거래 동향 End -->
    					
    					<!-- 공시지가 Start -->
    					<div class="compareBox" id="areaInfoHouseDiv03" style="display: none;">
    						<div class="typeBox">
    							<a href="javascript:void(0)" class="first on">차트</a>
    							<a href="javascript:void(0)">표</a>
    						</div>
    						<!-- 공시지가 -->
    						<div class="charts">
    							<p class="radio_style">
									<input type="radio" name="pnilpRadio" value="house" checked="checked" title="주거용" /> 주거용 &nbsp;
									<input type="radio" name="pnilpRadio" value="business" title="상업용" /> 상업용 &nbsp;
								</p>
		    					<div class="chartsSizingBox" id="areaInfoHousePnilpChart"></div> 
    						</div>
    						<!-- 공시지가 표영역 -->
    						<div class="tables">
    							<table summary="항목, 년도, 공시지가">
									<caption>해당지역 내 데이터 보기</caption>
									<thead id="areaInfoHousePnilpHeader">
										<tr>
											<th scope="col">항목</th>
											<th scope="col">년도</th>
											<th scope="col">공시지가(원/㎡)</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table summary="항목, 년도, 공시지가">
										<caption>해당지역 내 데이터 보기</caption>
										<tbody id="areaInfoHousePnilpTable">
										</tbody>
									</table>
								</div>
    						</div>
    						<!-- 2017-02-09 출처 -->
    						<p class="origin_txt_2">출처 : 국토교통부, 주택공시지가 (2017)</p>
    					</div>
    					<!-- 공시지가 End -->
    				</dd>
    				<!-- 총주택 End -->
    			</dl>
			</div>
			<!-- 지역 종합정보 End -->

			<!-- 창업지역검색 Start -->
			<div class="dataBoardDiv" id="areaSearchDiv">
				<p class="dbText01">조건별 후보지역 정보현황</p>
				<div class="areaBox">후보지역 특성정보</div>
   				 
   				<dl class="dscList bob">
   					<dt class="mt15"><a href="javascript:void(0)">후보지 조건설정 목록</a></dt>
    				<dd>
    					<div class="optionListInfo mt20">
    						
    					</div>
    				</dd> 
    				<dt class="mt15"><a href="javascript:void(0)" class="on">후보지역 선택목록(최대 3개 선택가능)</a></dt>
    				<dd>
    					<ul class="huboAreaList compareSelectList">
   						</ul>
   						<a class="cslBtn" href="javascript:$bizStatsDataBoardApi.request.areaInfoCompareChart();">비교하기</a>
    				</dd> 
    				<dt><a href="javascript:void(0)" class="on">후보지역 특성정보 비교하기</a></dt>
    				<dd>
    					<div id="areaSearchCompareBarChart"></div>
    					<div class="typeCharts04" id="spyCharts02"></div>
    					<a href="javascript:void(0)" class="ar" data-subj="지역특성정보 방사형그래프" title="${paramInfo.tooltipList.B0302}" style="position:absolute;margin-left:310px;margin-top:-440px;"><img src="/img/ico/ico_tooltip01.png"  style="margin-left:20px;" width=20 height=20 alt="아이콘" /></a>
    					<div class="fb">
    						<ul class="cateSaupLegend line">
    							<li class="spyChartTitleClass" id="spyChartsArea03"></li>
    							<li class="spyChartTitleClass" id="spyChartsArea04"></li> 
    							<li class="spyChartTitleClass" id="spyChartsArea05"></li>
    							<li class="spyChartTitleClass" id="spyChartsArea06"></li>
    						</ul>
    					</div>
    				</dd>
    			</dl>
			</div>
			<!-- 창업지역검색 End -->
			
			<!-- 상권정보 Start -->
			<div class="dataBoardDiv" id="tradeDiv">
				<p class="dbText01">지역상권정보</p>
				<div class="areaBox">선택영역 특성정보</div>
				<div class="tradeAreaTitle"></div>
   				 
   				<dl class="dscList"> 
    				<dt class="mt15"><a href="javascript:void(0)" class="on">영역 내 업종 비율</a></dt>
    				<dd>
    					<div class="fl" id="tradePieCharts01"></div>
	   					<div class="fr" id="tradePieCharts02"></div>
	   					<div class="fb">
	   						<ul class="cateSaupLegend">
	   							<li>음식업</li>
	   							<li>서비스</li>
	   							<li>도소매</li>
	   							<li>숙박업</li>
	   						</ul>
	   					</div>
    				</dd>
    				<dt><a href="javascript:void(0)" class="on">영역 내 선택업종 현황 (<span id="tradeThemeNmSpan">음식점</span>)</a></dt>
    				<dd>
    					<div id="tradeBarCharts"></div>
    				</dd>
    			</dl>
    			<p class="origin_txt_2">출처 : 중기청 주요상권정보, 통계청 전국사업체조사(2016)</p>
			</div>
			<!-- 상권정보 End -->
			
			<!-- 공공데이터 Include -->
			<jsp:include page="/view/map/publicDataBoard"></jsp:include>
			
			<!-- 나의데이터 Include -->
			<jsp:include page="/view/map/mydataDataBoard"></jsp:include>
		</div>
	</div>
</div>  

<!-- 레이어팝업 -->
<div class="dialogbox">
	<div class="dimbox">
		<div class="cont">
			<div class="bar">
				<span>지역별 상세 비교 정보</span>
				<div class="compareBox">
					<div class="typeBox">
						<a href="javascript:void(0);" class="first">차트</a>
						<a href="javascript:void(0);" class="on">차트</a>
					</div>
					<a href="javascript:$bizStatsMap.ui.reportDataSet(1);void(0);" class="dimPrint">
						<img src="/img/ico/ico_print01.png" alt="print" />
					</a>
				</div>
			</div>
			<div class="dimAreaScroll" id="compareDiv">
				<div class="charts">
					<div class="dimChartsBox" id="spiderChartArea">
					</div>
					<p class="mt50">선택조건별 후보지 상세현황비교</p>
					<div class="dimChartsBox" id="barChartArea">
					</div>
				</div>
				<div class="tables">
					<p>지역 특성정보 비교</p>
					<table id="factorTable" summary="지역 특성정보 비교">
						<tr class="adm_nm">
							<th class="bor">구분</th>
						</tr>
						<tr class="resid_ppltn_per">
							<td class="bor">거주인구</td>
						</tr>
						<tr class="twenty_ppltn_per">
							<td class="bor">20대인구</td>
						</tr>
						<tr class="sixty_five_more_ppltn_per">
							<td class="bor">65세이상인구</td>
						</tr>
						<tr class="one_person_family_per">
							<td class="bor">1인가구</td>
						</tr>
						<tr class="job_ppltn_per">
							<td class="bor">직장인구비율</td>
						</tr>
						<tr class="apart_per">
							<td class="bor">아파트</td>
						</tr>
					</table>
					<p>선택 조건별 후보지 상세현황 비교</p>
					<table id="detailTable" summary="선택 조건별 후보지 상세현황 비교">
						<tr class="adm_nm">
							<th class="bor">구분</th>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<a href="javascript:$bizStatsDataBoard.ui.areaInfoComparePopupClose();" class="dimClose"><img src="/img/popup/btn_popupX.png" alt="닫기" /></a>
	</div>
</div>
<!-- 레이어팝업  -->
