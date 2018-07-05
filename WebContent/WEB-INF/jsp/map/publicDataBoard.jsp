<%
/**************************************************************************************************************************
* Program Name  : 공공데이터 데이터보드 JSP  
* File Name     : publicDataBoard.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-11-18
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="dataBoardDiv" id="publicDataDiv">
	<dl class="dscList"> 
		<!-- 2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행흐름 정보-->
		<dt class="mt15" id="publicPoiInfo"><a href="javascript:void(0)" class="on">지도영역 내 조회된 정보 목록</a></dt>
		<dd>
			<p class="rsText">총 <strong id="publicDataCnt"></strong>개 검색</p>
			<div class="mapResultList">
				<ul id="publicDataList">
				</ul>
			</div>
		</dd>
		
		<!-- 유동인구 정보 Start -->
		<dt class="publicDataDT"><a href="javascript:void(0)" class="on">해당 POI 통계정보</a></dt>
		<dd class="publicDataDD" id="publicPopulationDiv">
			<div class="publicArrControllerBox">
				<a href="javascript:$publicDataBoard.ui.publicPopulationPrev();" class="fl">이전</a>
				<strong id="publicPopulationTitle"></strong>
				<a href="javascript:$publicDataBoard.ui.publicPopulationNext();" class="fr">다음</a>
			</div>
			<div class="poiCharts" id="publicPopulationChart"></div>
			<p class="origin_txt_2">출처 : 중소기업청, 전국 주요상권 유동인구 DB (2010)</p>
		</dd>
		<!-- 유동인구 정보 End -->
		
		<!-- 학교인구 정보 Start -->
		<dt class="publicDataDT"><a href="javascript:void(0)" class="on">해당 POI 통계정보</a></dt>
		<dd class="publicDataDD" id="publicSchoolDiv">
			<div class="publicArrControllerBox">
				<a href="javascript:$publicDataBoard.ui.publicSchoolPrevNext();" class="fl">이전</a>
				<strong id="publicSchoolTitle">학생/교직원 현황</strong>
				<a href="javascript:$publicDataBoard.ui.publicSchoolPrevNext();" class="fr">다음</a>
			</div>
			<!-- 해당학교 학생/교직원 현황 Start -->
			<div id="publicSchoolChartDiv01">
				<div class="poiPieCharts" id="publicSchoolChart"></div>
				<ul class="poiPieList">
					<li>・ 총학생수 : <span id="schoolStdtCnt"></span>명</li>
					<li>・ 총교직원수 : <span id="schoolTcherCnt"></span>명</li>
					<li>・ 교직원 1명당 학생수 : <span id="schoolTperS"></span>명</li>
					<li>・ <span id="sggNmSchool"></span> 평균 학생수
						<ol>
							<li>- 총학생수 평균 : <span id="schoolStdtAvg"></span>명</li>
							<li>- 총교직원수 평균 : <span id="schoolTcherAvg"></span>명</li>
						</ol>
					</li>
				</ul>
			</div>
			<!-- 해당학교 학생/교직원 현황 End -->
			<!-- 학교별 평균 학생/교직원 현황 Start -->
			<div id="publicSchoolChartDiv02" style="display: none;">
				<div class="imAreaCharts" id="publicSchoolGroupChart"></div>
			</div>
			<!-- 학교별 평균 학생/교직원 현황 End -->
			<p class="origin_txt_2">출처 : 한국교육개발원, 교육기본통계 (유초중등통계, 고등통계) (2013)</p>
		</dd>
		<!-- 학교인구 정보 End -->
		
		<!-- 지하철 승하차인구 정보 Start -->
		<dt class="publicDataDT"><a href="javascript:void(0)" class="on">해당 POI 통계정보</a></dt>
		<dd class="publicDataDD" id="publicMetroDiv">
			<div class="publicArrControllerBox">
				<a href="javascript:$publicDataBoard.ui.publicMetroPrev();" class="fl">이전</a>
				<strong id="publicMetroTitle">일평균 / 승하차인원 정보</strong>
				<a href="javascript:$publicDataBoard.ui.publicMetroNext();" class="fr">다음</a>
			</div>
			<div class="imAreaCharts metroChartDiv" id="publicMetroChart01"></div>		<!-- 일평균 승하차인원 정보 -->
			<div class="imAreaCharts metroChartDiv" id="publicMetroChart02"></div>		<!-- 월평균 승하차인원 정보 -->
			<div class="imAreaCharts metroChartDiv" id="publicMetroChart03"></div>		<!-- 요일평균 승하차인원 정보 -->
			<p class="origin_txt_2">출처 : 철도 노선별 관리기관, 지하철 이용현황 (2015, 2016)</p>
		</dd>
		<!-- 지하철 승하차인구 정보 End -->
		
		<!-- 버스정류장 정보 Start -->
		<dt class="publicDataDT"><a href="javascript:void(0)" class="on">해당 POI 통계정보</a></dt>
		<dd class="publicDataDD" id="publicBusStopDiv">
			<p class="origin_txt_2">출처 : 교통안전공단, 버스정류장 위치정보 (2016)</p>
		</dd>
		<!-- 버스정류장 정보 End -->
		
		<!-- 2017.06.26 [개발팀]공공데이터 추가 - 대전-세종간 통행정보 Start -->
		<dt class="publicDataDT mt15" ><a href="javascript:void(0)" class="on">해당 POI 정보</a></dt>
		<dd class="publicDataDD" id="publicCctvPoiDiv">
			<div class="dbTabs03">
				<a id="cctvList" class="yellow on" onclick="javascript:$publicDataBoard.ui.changeCctvAndBusPoiList('cctv')">CCTV 정보</a>
				<a id="busStopList" class="blue" onclick="javascript:$publicDataBoard.ui.changeCctvAndBusPoiList('busStop')">버스정류장 정보</a>
			</div>
			
			<div class="chartAreaRela" id="cctvPoiArea">
				<div class="cctvMode dbTabs02">
					<a class="all on" onclick="javascript:$publicDataBoard.ui.changeCctvDrawMode('0');">전체</a>
					<a class="in" onclick="javascript:$publicDataBoard.ui.changeCctvDrawMode('2');">세종 IN 방향</a>
					<a class="out" onclick="javascript:$publicDataBoard.ui.changeCctvDrawMode('1');">세종 OUT 방향</a>
				</div>
				<p class="rsText" style="font-size:13px;border-bottom:0px;padding-left:10px;">총 CCTV POI 수 : <strong id="publicCctvDataCnt">60</strong>개</p>
				<p class="cctvAllTextTip">* 한가지색으로만 표기된 경우, 반대방향 CCTV 없음</p>
				<div >
					<ul class="techList" id="publicCctvList"></ul>
					<p class="origin_txt_2" style="padding-right:10px;">출처 : 세종시 CCTV 통헁량, 2017</p>
					<div id="cctvListPaging" class="paging" style="width: 100%;margin-bottom:0px;text-align:center;"> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
						<span class="pages"> <a href="" class="page"></a></span>
					</div>
				</div>
			</div>
			<div class="chartAreaRela" id="busStopPoiArea" style="display:none;">
				<div class="brtMode dbTabs02">
					<a class="in on" onclick="$publicDataBoard.ui.changeBrtDrawMode('1');">오송방향</a>
					<a class="out" onclick="$publicDataBoard.ui.changeBrtDrawMode('2');">반석방향</a>
				</div>
				<p class="rsText" style="font-size:13px;border-bottom:0px;padding-left:10px;">총 버스정류장 POI 수 <strong id="publicBusStopDataCnt">20</strong>개</p>
				<div>
					<ul class="techList" id="publicBusStopList"></ul>
					<p class="origin_txt_2" style="padding-right:10px;">출처 : 세종시 BRT 이용현황, 2017</p>
					<div id="busStopListPaging" class="paging" style="width: 100%;;margin-bottom:0px;text-align:center;"> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
						<span class="pages"> <a href="" class="page"></a></span>
					</div>
				</div>
			</div>
		</dd>
		
		<!-- 월별 통계정보 -->
		<dt class="publicDataDT mt15" id="timeseriesGraphDiv" style="margin-top:0px;"><a href="javascript:void(0)">해당 POI 월별 통계정보</a></dt> <!-- 2017.06.26  공공데이터 추가 -->
		<!-- 시간대 및 요일별 통계정보(CCTV) -->
		<dd class="publicDataDD">
		<div id="publicCctvTimeseriesGraphDiv">
			<div class="dbTabs03">
				<a id="timeseriesGraph" class="yellow on" onclick="javascript:$publicDataBoard.ui.drawCctvTimeseriesGraph('0')">시간대별 그래프</a>
				<a id="dayOfWeekGraph" class="blue" onclick="javascript:$publicDataBoard.ui.drawCctvTimeseriesGraph('1')">요일별 그래프</a>
			</div>
			<div class="timeSeriesBoxArea">
				<div class="stepBox" style="border-bottom:none;text-align:center;">
					<select class="cctvSelectBox" id="cctvTimeSeriesYear">
						<option value="2017">2017년</option>
					</select>
					<select class="cctvSelectBox" id="cctvTimeSeriesMonth">
						<option value="05">05월</option>
						<option value="04">04월</option>
						<option value="03">03월</option>
						<option value="02">02월</option>
						<option value="01">01월</option>
					</select>
				</div>
			
				<!-- 시간대별 -->
				<div class="chartAreaRela" id="timeseriesGraphArea">
					<div style="height:10px;"></div>
					<div id="timeseriesChart"></div>
					<a class="ar cctvGrapTooltip" data-subj="시간대별 그래프" title="-주중 : 월~금<br>-주말 : 토~일, 공휴일포함<br>-전체평균 : 시간대별 전체평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-주중 : 월~금<br>-주말 : 토~일, 공휴일포함<br>-평균 : 전체평균"></a>
				</div>
				
				<!-- 요일별 -->
				<div class="chartAreaRela" id="dayOfWeekGraphArea" style="display:none;">
					<div style="height:10px;"></div>
					<div id="dayOfWeekChart"></div>
					<a class="ar cctvGrapTooltip" data-subj="요일별 그래프" title="-출근시간대 : 07~10시<br>-퇴근시간대 : 17~20시<br>-전시간대평균 : 요일별 전시간대 평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-출근시간대 : 07~10시<br>-퇴근시간대 : 17~20시<br>-평균 : 전시간대 평균"></a>
				</div>
				<p class="origin_txt_2" style="padding-right:10px;">출처 : 세종시 CCTV 통헁량, 2017</p>					
			</div>
		</div>
		<!-- 주중/주말, 출근/퇴근시간대별 통계(BRT) -->
			<div id="publicBrtTimeseriesGraphDiv" style="display:none;">
				<div class="dbTabs03">
					<a id="dayOfWeektimeseriesGraph" class="yellow on" onclick="javascript:$publicDataBoard.ui.drawBrtTimeseriesGraph('0')">주중 시간대별</a>
					<a id="weekendTimeseriesGraph" class="yellow2" onclick="javascript:$publicDataBoard.ui.drawBrtTimeseriesGraph('1')">주말 시간대별</a>
					<a id="onWorkTimeseriesGraph" class="blue" onclick="javascript:$publicDataBoard.ui.drawBrtTimeseriesGraph('2')">출근 시간대별</a>
					<a id="offWorkTimeseriesGraph" class="blue2" onclick="javascript:$publicDataBoard.ui.drawBrtTimeseriesGraph('3')">퇴근 시간대별</a>
				</div>
		
				<div class="timeSeriesBoxArea">
					<div class="stepBox" style="border-bottom:none;text-align:center;">
						<select class="cctvSelectBox" id="brtTimeSeriesYear">
							<option value="2017">2017년</option>
						</select>
						<select class="cctvSelectBox" id="brtTimeSeriesMonth">
							<option value="05">05월</option>
							<option value="04">04월</option>
							<option value="03">03월</option>
							<option value="02">02월</option>
							<option value="01">01월</option>
						</select>
					</div>
				
					<!-- 주중시간대별 -->
					<div class="chartAreaRela" id="brtTimeSeriesDayOfWeekGraphArea">
						<div style="height:10px;"></div>
						<div id="brtTimeSeriesDayOfWeekChart"></div>
						<a class="ar brtGrapTooltip" data-subj="주중시간대별 그래프" title="-주중 : 월~금<br>-전체평균 승차/하차 : 시간대별 승/하차 전체평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-주중 : 월~금<br>-평균 : 전체평균"></a>
					</div>
					
					<!-- 주말시간대별 -->
					<div class="chartAreaRela" id="brtTimeSeriesWeekendGraphArea" style="display:none;">
						<div style="height:10px;"></div>
						<div id="brtTimeSeriesWeekendChart"></div>
						<a class="ar brtGrapTooltip" data-subj="주말시간대별 그래프" title="-주말 : 토~일, 공휴일포함<br>-전체평균 승/하차 : 시간대별 승/하차 전체평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-주말 : 토~일, 공휴일포함<br>-평균 : 전체평균"></a>
					</div>
					
					<!-- 출근시간대별 -->
					<div class="chartAreaRela" id="brtTimeSeriesOnWorkGraphArea" style="display:none;">
						<div style="height:10px;"></div>
						<div id="brtTimeSeriesOnWorkChart"></div>
						<a class="ar brtGrapTooltip" data-subj="출근시간대별 그래프" title="-출근시간대 : 07~10시<br>-전시간대평균 승/하차 : 요일별 승/하차 전시간대 평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-출근시간대 : 07~10시<br>-평균 : 전시간대 평균"></a>
					</div>
					
					<!-- 퇴근시간대별 -->
					<div class="chartAreaRela" id="brtTimeSeriesOffWorkGraphArea" style="display:none;">
						<div style="height:10px;"></div>
						<div id="brtTimeSeriesOffWorkChart"></div>
						<a class="ar brtGrapTooltip" data-subj="퇴근시간대별 그래프" title="-퇴근시간대 : 17~20시<br>-전시간대평균 승/하차: 요일별 승/하차 전시간대 평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-퇴근시간대 : 17~20시<br>-평균 : 전시간대 평균"></a>
					</div>
				</div>
				<p class="origin_txt_2" style="padding-right:10px;">출처 : 세종시 BRT 이용현황, 2017</p>
			</div>
			
		</dd>

		<!-- 시계열 통계정보 -->
		<dt class="publicDataDT mt15" id="weekendGraphDiv" style="margin-top:0px;" ><a href="javascript:void(0)">해당 POI 시계열 통계정보</a></dt>
		<dd class="publicDataDD">
			<!-- CCTV 주중/주말, 출퇴근시간 -->
			<div id="publicCctvWeekendGraphDiv">
				<div class="dbTabs03">
					<a id="weekendGraph" class="yellow on" onclick="javascript:$publicDataBoard.ui.drawCctvWeekendGraph('0')">주중/주말 그래프</a>
					<a id="rushHoursGraph" class="blue" onclick="javascript:$publicDataBoard.ui.drawCctvWeekendGraph('1')">출퇴근시간대별 그래프</a>
				</div>
				<div class="monthBoxArea">
					<div class="chartAreaRela" id="weekendGraphArea">
						<div style="height:10px;"></div>
						<div id="weekendChart"></div>
						<a class="ar cctvGrapTooltip" data-subj="주중/주말 그래프" title="-주중 : 월~금<br>-주말 : 토~일, 공휴일포함<br>-전체평균 : 월별 전체평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-주중 : 월~금<br>-주말 : 토~일, 공휴일포함<br>-평균 : 전체평균"></a>
					</div>
					<div class="chartAreaRela" id="rushHoursGraphArea" style="display:none;">
						<div style="height:10px;"></div>
						<div id="rushHoursChart"></div>
						<a class="ar cctvGrapTooltip" data-subj="출/퇴근시간대별 그래프" title="-출근시간대 : 07~10시<br>-퇴근시간대 : 17~20시<br>-전시간대평균 : 월별 전시간대 평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-출근시간대 : 07~10시<br>-퇴근시간대 : 17~20시<br>-평균 : 전시간대 평균"></a>
					</div>
				</div>
				<p class="origin_txt_2" style="padding-right:10px;">출처 : 세종시 CCTV 통헁량, 2017</p>	
			</div>
			<!-- BRT 주중/주말, 출근/퇴근시간대 정보 -->
			<div id="publicBrtWeekendGraphDiv" style="display:none;">
				<div class="dbTabs03">
					<a id="brtMonthDayOfWeekGraph" class="yellow on" onclick="javascript:$publicDataBoard.ui.drawBrtWeekendGraph('0')">주중 승하차</a>
					<a id="brtMonthWeekendGraph" class="yellow2" onclick="javascript:$publicDataBoard.ui.drawBrtWeekendGraph('1')">주말 승하차</a>
					<a id="brtMonthOnWorkGraph" class="blue" onclick="javascript:$publicDataBoard.ui.drawBrtWeekendGraph('2')">출근시간 승하차</a>
					<a id="brtMonthOffWorkGraph" class="blue2" onclick="javascript:$publicDataBoard.ui.drawBrtWeekendGraph('3')">퇴근시간 승하차</a>
				</div>
				<div class="monthBoxArea">
					<div class="chartAreaRela" id="brtMonthDayOfWeekGraphArea">
						<div style="height:10px;"></div>
						<div id="brtMonthDayOfWeekChart"></div>
						<a class="ar brtGrapTooltip" data-subj="주중승하차 그래프" title="-주중 : 월~금<br>-전체평균 승/하차 : 월별 승/하차 전체평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-주중 : 월~금<br>-평균 : 전체평균"></a>
					</div>
					<div class="chartAreaRela" id="brtMonthWeekendGraphArea" style="display:none;">
						<div style="height:10px;"></div>
						<div id="brtMonthWeekendChart"></div>
						<a class="ar brtGrapTooltip" data-subj="주말승하차 그래프" title="-주말 : 토~일, 공휴일포함<br>-전체평균 승/하차: 월별 승/하차 전체평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-주말 : 토~일, 공휴일포함<br>-평균 : 전체평균"></a>
					</div>
					<div class="chartAreaRela" id="brtMonthOnWorkGraphArea" style="display:none;">
						<div style="height:10px;"></div>
						<div id="brtMonthOnWorkChart"></div>
						<a class="ar brtGrapTooltip" data-subj="출근시간승하차 그래프" title="-출근시간대 : 07~10시<br>-전시간대평균 승/하차: 월별 승/하차 전시간대 평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-출근시간대 : 07~10시<br>-평균 : 전시간대 평균"></a>
					</div>
					<div class="chartAreaRela" id="brtMonthOffWorkGraphArea" style="display:none;">
						<div style="height:10px;"></div>
						<div id="brtMonthOffWorkChart"></div>
						<a class="ar brtGrapTooltip" data-subj="퇴근시간승하차 그래프" title="-퇴근시간대 : 17~20시<br>-전시간대평균 승/하차 : 월별 승/하차 전시간대 평균"><img src="/img/ico/ico_tooltip01.png" style="margin-left:20px;" width=20 height=20 alt="-퇴근시간대 : 17~20시<br>-평균 : 전시간대 평균"></a>
					</div>
				</div>
				<p class="origin_txt_2" style="padding-right:10px;">출처 : 세종시 BRT 이용현황, 2017</p>
			</div>
			
		</dd>
		
		
		<!-- 2017.06.26 [개발팀]공공데이터 추가 - 대전-세종간 통행정보 End -->
		
		<dt><a href="javascript:void(0)" class="on">임의영역 반경 내 주요 정보 목록</a></dt>
		<dd id="userAreaDiv"> 	<!-- 2017.06.26 [개발팀] 공공데이터 추가 -->
			<div style="position: relative;">
				<div class="imAreaSlideEtc">임의반경영역 설정(m)</div>
				<div class="imAreaSlide" id="publicDataSlide"></div>
				<div>
					<ul class="rbSlide_controll_bar">
		            	<li>100</li>
		                <li>300</li>
		                <li>500</li>
		                <li>1000</li>
					</ul>
				</div> 
				<ul class="imAreaList">
					<li>반경 내 인구 : <span id="circlePeople"></span>명</li>
					<li>반경 내 가구 : <span id="circleFamily"></span>가구</li>
					<li>반경 내 주택 : <span id="circleHouse"></span>호</li>
					<li>반경 내 사업체 수 : <span id="circleCorp"></span>개</li>
				</ul>	 
				<div class="imAreaCharts" id="publicDataThemeChart"></div>
				<div class="imAreaTitle">임의반경에 포함되는 집계구 단위의 통계</div>
			</div>
			<!-- 2017.07.24 [개발팀] 출처표출-->
			<p class="origin_txt_2" style="padding-right:10px;">통계청 , 인구주택총조사, 2016 / 통계청, 전국사업체조사, 2015</p>
		</dd>
	</dl>
</div>