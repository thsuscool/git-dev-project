<%
/**************************************************************************************************************************
* Program Name  : 생활업종 통계지도 Left메뉴 JSP  
* File Name     : bizStatsLeftMenu.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-11-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div class="shadow"></div>
<!-- 1Depth Start -->
<div class="quickBox step01">
	<div class="subj">
		<span>우리동네 생활업종 메뉴 보기</span>
		<a href="javascript:void(0)" class="stepClose">닫기</a>
	</div>
	<div class="scrollBox" id="depth1Menu">
		<dl class="qmdl pt0">
			<dt><a href="javascript:$('#qmdlList01').slideToggle();void(0);">생활업종 통계현황</a>
			<dd id="qmdlList01">
				<ul>
					<li class="icon01" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');"><a data-subj="시도별 생활업종현황" title="${paramInfo.tooltipList.B0001}">시도별 생활업종 현황</a></li>
					<li class="icon02" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');"><a data-subj="업종별 지역현황" title="${paramInfo.tooltipList.B0101}">시군구별 생활업종 현황</a></li>
					<li class="icon03" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');"><a data-subj="업종밀집도 변화" title="${paramInfo.tooltipList.B0201}">업종 밀집도 현황</a></li>
				</ul>
			</dd>
		</dl>
		<dl class="qmdl pt0">
			<dt><a href="javascript:$('#qmdlList02').slideToggle();void(0);">생활업종 후보지</a></dt>
			<dd id="qmdlList02">
				<ul>
					<li class="icon05" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');"><a data-subj="생활업종 후보지 검색" title="${paramInfo.tooltipList.B0401}">생활업종 후보지 검색</a></li>
					<li class="icon04" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');"><a data-subj="생활업종 후보지 정보 보기" title="${paramInfo.tooltipList.B0301}">생활업종 후보지 정보 보기</a></li>
				</ul>
			</dd>
		</dl>
		<dl class="qmdl pt0">
			<dt><a href="javascript:$('#qmdlList03').slideToggle();void(0);">지자체 인허가 통계</a></dt>
			<dd id="qmdlList03">
				
				<!-- 
				지자체 인허가 업종&#40;문화체육, 관광, 식품, 소상공인, 산업고용 등 5개분류&#41;에 대한 업종별 개업 현황을 제공합니다.&lt;br /&gt;
- 지자체 인허가 업종분류는 통계청의 표준산업분류와 체계가 다르며, 1:1 매칭이 되지 않사오니 유의하시기 바랍니다.&lt;br /&gt;
- 지자체 인허가 업종분류 관련 문의는 localdata.kr로 하시기 바랍니다.&lt;br /&gt;
- 지자체 인허가 데이터는 매일 업데이트 되며, 2017년 데이터는 2017년 1월 1일부터 현재까지의 데이터입니다.&lt;br /&gt;
- 업종별 개업 사업체가 너무 적은 경우 열지도 모양이 잘 나타나지 않습니다. 이 경우 열지도의 반지름을 조정해 보시기 바랍니다.
				 
				 db에서 불러오는 이유는 관리자에서 수정이 가능하기 때문에 이렇게 해놓았다.
				 -->				
				<ul><!-- 좌측 메뉴의 툴팁은 DB에서 불러온다. [지자체 인허가 업종(문화체육,] 이걸로 ctrl+h 에서 않나온다.  mng_dt_tooltipexp 이 테이블에서 수정하기 바란다.  ${paramInfo.tooltipList.B0701} -->
					<li class="icon05" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');">
						<a data-subj="업종별 개업 현황" title="${paramInfo.tooltipList.B0701}">업종별 개업 현황</a>
					</li>
					<li class="icon08" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');">
						<a data-subj="업종별 뜨는 지역" title="${paramInfo.tooltipList.B0702}">업종별 뜨는 지역</a>
					</li>
					
				</ul>
			</dd>
		</dl>
		<dl class="qmdl">
			<dd>
				<ul>
					<li class="icon06" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('publicData');"><a data-subj="공공데이터" title="${paramInfo.tooltipList.B0501}">공공데이터</a></li>
					<li class="icon07" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('userData');"><a data-subj="공공데이터" title="${paramInfo.tooltipList.B0601}">나의 데이터</a></li>
				</ul>
			</dd>
		</dl>
		<ul class="qmlist botn">
			<li><a onclick="javascript:$bizStatsLeftMenu.ui.doMaxSize();" style="cursor:pointer;">전체 화면 확대</a></li>
			<li><a href="/view/newhelp/so_help_10_0" target="_blank">도움말 보기</a></li>
		</ul>
	</div>
	<div class="menuAutoClose">
		<input type="radio" name="menuAutoClose_radio" id="menuAutoClose_radio" checked="checked"/>
		<label for="menuAutoClose_radio" class="on">통계메뉴바 자동 닫기</label>
	</div>
	<div class="btnBottom">
		<span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
        <div class="serviceLayer" id="bottomServiceLayer">
			<ol>
				<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');" title="새창으로 열림">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');" title="새창으로 열림">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdss.kostat.go.kr');" title="새창으로 열림">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');" title="새창으로 열림">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');" title="새창으로 열림">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');" title="새창으로 열림">통계분류</a></li>
			</ol>
		</div>
		<div class="btnService" id="bottomService">통계청 주요서비스</div>
	</div>
</div>
<!-- 1Depth End -->

<!-- 2Depth Start -->
<div class="quickBox step02">
	<div class="subj">
		<span id="submenuTitle"></span>
		<a href="javascript:void(0)" class="stepClose">닫기</a>
	</div>
	<div class="scrollBox">
		<!-- 업종별 지역현황 & 업종밀집도 변화 Start -->
		<div id="API_0000" class="totalResult tr01">
			<div class="stepBox">
				<a href="javascript:void(0)" class="roundTextBox">음식점(11종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="rd_food_5001" name="rd_food" value="5001" />
							<label for="rd_food_5001">한식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5002" name="rd_food" value="5002" />
							<label for="rd_food_5002">중식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5003" name="rd_food" value="5003" />
							<label for="rd_food_5003">일식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5004" name="rd_food" value="5004" />
							<label for="rd_food_5004">분식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5005" name="rd_food" value="5005" />
							<label for="rd_food_5005">서양식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5006" name="rd_food" value="5006" />
							<label for="rd_food_5006">제과점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5007" name="rd_food" value="5007" />
							<label for="rd_food_5007">패스트푸드</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5008" name="rd_food" value="5008" />
							<label for="rd_food_5008">치킨</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5009" name="rd_food" value="5009" />
							<label for="rd_food_5009">호프 및 간이주점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5010" name="rd_food" value="5010" />
							<label for="rd_food_5010">카페</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5011" name="rd_food" value="5011" />
							<label for="rd_food_5011">기타 외국식</label>
						</li>
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">도소매(11종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="rd_retail_2001" name="rd_retail" value="2001" />
							<label for="rd_retail_2001">문구점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2002" name="rd_retail" value="2002" />
							<label for="rd_retail_2002">서점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2003" name="rd_retail" value="2003" />
							<label for="rd_retail_2003">편의점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2004" name="rd_retail" value="2004" />
							<label for="rd_retail_2004">식료품점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2005" name="rd_retail" value="2005" />
							<label for="rd_retail_2005">휴대폰점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2006" name="rd_retail" value="2006" />
							<label for="rd_retail_2006">의류</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2007" name="rd_retail" value="2007" />
							<label for="rd_retail_2007">화장품/방향제</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2008" name="rd_retail" value="2008" />
							<label for="rd_retail_2008">철물점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2009" name="rd_retail" value="2009" />
							<label for="rd_retail_2009">주유소</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2010" name="rd_retail" value="2010" />
							<label for="rd_retail_2010">꽃집</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2011" name="rd_retail" value="2011" />
							<label for="rd_retail_2011">슈퍼마켓</label>
						</li>
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">서비스(11종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="rd_service_1001" name="rd_service" value="1001" />
							<label for="rd_service_1001">인테리어</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1002" name="rd_service" value="1002" />
							<label for="rd_service_1002">목욕탕</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1003" name="rd_service" value="1003" />
							<label for="rd_service_1003">교습학원</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1004" name="rd_service" value="1004" />
							<label for="rd_service_1004">어학원</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1005" name="rd_service" value="1005" />
							<label for="rd_service_1005">예체능학원</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1006" name="rd_service" value="1006" />
							<label for="rd_service_1006">부동산중개업</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1007" name="rd_service" value="1007" />
							<label for="rd_service_1007">이발소</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1008" name="rd_service" value="1008" />
							<label for="rd_service_1008">미용실</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1009" name="rd_service" value="1009" />
							<label for="rd_service_1009">세탁소</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1010" name="rd_service" value="1010" />
							<label for="rd_service_1010">PC방</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1011" name="rd_service" value="1011" />
							<label for="rd_service_1011">노래방</label>
						</li>
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">숙박(3종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="rd_hotel_4001" name="rd_hotel" value="4001" />
							<label for="rd_hotel_4001">호텔</label>
						</li>
						<li>
							<input type="checkbox" id="rd_hotel_4002" name="rd_hotel" value="4002" />
							<label for="rd_hotel_4002">여관(모텔포함) 및 여인숙</label>
						</li>
						<li>
							<input type="checkbox" id="rd_hotel_4003" name="rd_hotel" value="4003" />
							<label for="rd_hotel_4003">펜션</label>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 업종별 지역현황 & 업종밀집도 변화End -->

		<!-- 창업지역 찾기 Start -->
		<div class="totalResult tr05">
			<div class="stepBox">
				<span class="txt">
					관심 있는 지표를 선택해 보세요. <br />
					지표별 상하위 가중치를 설정하여 조건에<br />
					부합하는 후보지를 검색할 수 있습니다.<br />
					항목은 다중선택이 가능합니다.
				</span>
				<ul class="wonList01" id="wonList01">
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('companyCount');void(0);" id="companyCountAtag" data-subj="사업체수" title="${paramInfo.tooltipList.B0403}"><span>사업체수</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('companyIncrease');void(0);" id="companyIncreaseAtag" data-subj="사업체증감" title="${paramInfo.tooltipList.B0404}"><span>사업체증감</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('jobPeople');void(0);" id="jobPeopleAtag" data-subj="직장인구" title="${paramInfo.tooltipList.B0405}"><span>직장인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('stayPeople');void(0);" id="stayPeopleAtag" data-subj="거주" title="${paramInfo.tooltipList.B0406}"><span>거주인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('genderPeople');void(0);" id="genderPeopleAtag" data-subj="성별인구" title="${paramInfo.tooltipList.B0407}"><span>성별인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('agePeople');void(0);" id="agePeopleAtag" data-subj="연령별인구" title="${paramInfo.tooltipList.B0408}"><span>연령별인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('household');void(0);" id="householdAtag" data-subj="갸구유형" title="${paramInfo.tooltipList.B0409}"><span>가구유형</span></a></li>
					<!-- 2017.03.21 2015년 점유형태 추가에 따른 지표삭제 -->
					<%-- <li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('occupyType');void(0);" id="occupyTypeAtag" data-subj="점유형태" title="${paramInfo.tooltipList.B0410}"><span>점유형태</span></a></li> --%>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('houseType');void(0);" id="houseTypeAtag" data-subj="거주주택" title="${paramInfo.tooltipList.B0411}"><span>거주주택</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('apartPrice');void(0);" id="apartPriceAtag" data-subj="공시지가" title="${paramInfo.tooltipList.B0412}"><span>공시지가</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('oldHouse');void(0);" id="oldHouseAtag" data-subj="노후주택" title="${paramInfo.tooltipList.B0413}"><span>노후주택<br />(20년이상)</span></a></li>
<!-- 					<li class="disabled"><a href="javascript:void(0);"><span>자동차<br />등록정보<br /><font size="1">(항목추가예정)</font></span></a></li> -->
				</ul>
			</div>
		</div>
		<!-- 창업지역 찾기 End -->
		
		<!-- 공공데이터 조회하기 -->
		<div class="totalResult tr06">
			<div class="stepBox">
				<span class="noneTextBox">위치중심 공공데이터 목록</span>
				<ul class="type01 publicData_stepBox" id="publicDataLeftList">
				</ul>
			</div>
		</div>
		
		<!-- 사용자데이터업로드 -->
		<div class="totalResult tr07">
			<div class="stepBox"> 
			    <span class="txt">사용자가 보유하고 있는 txt, csv, Excel, KML 등의 포맷파일을 업로드하여 지도 위에 매핑할 수 있습니다
			    </span>
			    <p>나의 데이터에 저장된 목록</p>
			    <ul id="myDataLoadList">
			    </ul>
			    <br/>
			    <div style="text-align: center;">
	            	<a href="/view/mypage/myData/dataList" class="btnStyle01">나의 데이터 이동</a>
	        	</div>
			</div>
         	<div class="stepBox">
				<p>공개된 사용자 데이터 목록</p>
			    <ul id="shareDataLoadList">
			    </ul>
			</div>
		</div>
		
		
		<!-- ======================================== Start of 지자체 인허가 통계 업종별 개업정보 ======================================== -->
		<!-- 
				지표 변경시 같이 수정해야할 파일은
				bizStatsDataBoard.jsp, bizStatsDataBoard.js의 700번째 줄 정도의 코드들, 그리고 이 파일 ... 그래도 않되면 코드로 전체검색 요망.. ㅠㅠ
		-->
		
		<div id="API_0008" class="totalResult tr08">
			<div class="stepBox">
				<a href="javascript:void(0)" class="roundTextBox">문화체육(5종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<!-- input type의 이름 jj_ 는 bizStatsDataBoard.js에서 이름을 맞추어 주어야한다.  -->
						<li>
							<input type="checkbox" id="jj_culture_22_09_01_P" name="jj_culture" value="22_09_01_P" />
							<label for="jj_culture_22_09_01_P">인터넷 컴퓨터 게임시설 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_22_14_01_P" name="jj_culture" value="22_14_01_P" />
							<label for="jj_culture_22_14_01_P">청소년 게임 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_21_06_01_P" name="jj_culture" value="21_06_01_P" />
							<label for="jj_culture_21_06_01_P">노래 연습장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_06_01_P" name="jj_culture" value="23_06_01_P" />
							<label for="jj_culture_23_06_01_P">체육도장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_12_01_P" name="jj_culture" value="23_12_01_P" />
							<label for="jj_culture_23_12_01_P">무도 학원업</label>
						</li>
						
						
						
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_culture_41_36_01_P" name="jj_culture" value="41_36_01_P" />
							<label for="jj_culture_41_36_01_P">공중이용시설(학원)</label>
						</li>
						
						
						<li>
							<input type="checkbox" id="jj_culture_23_11_01_P" name="jj_culture" value="23_11_01_P" />
							<label for="jj_culture_23_11_01_P">무도장업</label>
						</li>
						 -->
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">관광(6종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_tour_41_43_01_P" name="jj_tour" value="41_43_01_P" />
							<label for="jj_tour_41_43_01_P">숙박업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_16_01_P" name="jj_tour" value="41_16_01_P" />
							<label for="jj_tour_41_16_01_P">숙박업(일반-여관업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_17_01_P" name="jj_tour" value="41_17_01_P" />
							<label for="jj_tour_41_17_01_P">숙박업(일반-여인숙업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_14_01_P" name="jj_tour" value="41_14_01_P" />
							<label for="jj_tour_41_14_01_P">숙박업(일반-일반호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_13_01_P" name="jj_tour" value="41_13_01_P" />
							<label for="jj_tour_41_13_01_P">숙박업(일반-관광호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_16_19_01_P" name="jj_tour" value="16_19_01_P" />
							<label for="jj_tour_16_19_01_P">관광펜션업</label>
						</li>
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_tour_41_15_01_P" name="jj_tour" value="41_15_01_P" />
							<label for="jj_tour_41_15_01_P">숙박업(일반-휴양콘도미니엄업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">식품(25종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_food_24_01_01_P" name="jj_food" value="24_01_01_P" />
							<label for="jj_food_24_01_01_P">일반음식점(한식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_44_01_P" name="jj_food" value="24_44_01_P" />
							<label for="jj_food_24_44_01_P">휴게음식점(커피숍)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_20_01_P" name="jj_food" value="24_20_01_P" />
							<label for="jj_food_24_20_01_P">일반음식점(기타)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_12_01_P" name="jj_food" value="24_12_01_P" />
							<label for="jj_food_24_12_01_P">일반음식점(호프/통닭)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_05_01_P" name="jj_food" value="24_05_01_P" />
							<label for="jj_food_24_05_01_P">일반음식점(분식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_18_01_P" name="jj_food" value="24_18_01_P" />
							<label for="jj_food_24_18_01_P">일반음식점(식육(숯불구이))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_03_01_P" name="jj_food" value="24_03_01_P" />
							<label for="jj_food_24_03_01_P">일반음식점(경양식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_42_01_P" name="jj_food" value="24_42_01_P" />
							<label for="jj_food_24_42_01_P">휴게음식점(편의점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_48_01_P" name="jj_food" value="24_48_01_P" />
							<label for="jj_food_24_48_01_P">제과점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_07_01_P" name="jj_food" value="24_07_01_P" />
							<label for="jj_food_24_07_01_P">일반음식점(정종,대포집,소주방)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_04_01_P" name="jj_food" value="24_04_01_P" />
							<label for="jj_food_24_04_01_P">일반음식점(일식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_02_01_P" name="jj_food" value="24_02_01_P" />
							<label for="jj_food_24_02_01_P">일반음식점(중국식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_43_01_P" name="jj_food" value="24_43_01_P" />
							<label for="jj_food_24_43_01_P">휴게음식점(패스트푸드)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_16_01_P" name="jj_food" value="24_16_01_P" />
							<label for="jj_food_24_16_01_P">일반음식점(횟집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_32_01_P" name="jj_food" value="24_32_01_P" />
							<label for="jj_food_24_32_01_P">단란주점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_06_01_P" name="jj_food" value="24_06_01_P" />
							<label for="jj_food_24_06_01_P">일반음식점(뷔페식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_15_01_P" name="jj_food" value="24_15_01_P" />
							<label for="jj_food_24_15_01_P">일반음식점(김밥(도시락))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_19_01_P" name="jj_food" value="24_19_01_P" />
							<label for="jj_food_24_19_01_P">일반음식점(탕류(보신용))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_45_01_P" name="jj_food" value="24_45_01_P" />
							<label for="jj_food_24_45_01_P">휴게음식점(전통찻집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_81_01_P" name="jj_food" value="24_81_01_P" />
							<label for="jj_food_24_81_01_P">일반음식점(패밀리레스토랑)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_76_01_P" name="jj_food" value="24_76_01_P" />
							<label for="jj_food_24_76_01_P">일반음식점(라이브카페)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_71_01_P" name="jj_food" value="24_71_01_P" />
							<label for="jj_food_24_71_01_P">유흥주점영업(노래클럽)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_68_01_P" name="jj_food" value="24_68_01_P" />
							<label for="jj_food_24_68_01_P">일반음식점(감성주점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_70_01_P" name="jj_food" value="24_70_01_P" />
							<label for="jj_food_24_70_01_P">일반음식점(냉면집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_30_01_P" name="jj_food" value="24_30_01_P" />
							<label for="jj_food_24_30_01_P">유흥주점영업(간이주점)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_food_24_14_01_P" name="jj_food" value="24_14_01_P" />
							<label for="jj_food_24_14_01_P">일반음식점(복어취급)</label>
						</li>
						 -->
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">소상공인(17종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
					
						<li><input type="checkbox" id="jj_service_41_40_01_P" name="jj_service" value="41_40_01_P" /><label for="jj_service_41_40_01_P">미용업(일반)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_01_P" name="jj_service" value="41_41_01_P" /><label for="jj_service_41_41_01_P">미용업(피부)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_02_P" name="jj_service" value="41_40_02_P" /><label for="jj_service_41_40_02_P">미용업(손톱ㆍ발톱)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_24_01_P" name="jj_service" value="41_24_01_P" /><label for="jj_service_41_24_01_P">이용업	                          </label></li>
						<li><input type="checkbox" id="jj_service_41_41_02_P" name="jj_service" value="41_41_02_P" /><label for="jj_service_41_41_02_P">미용업(피부/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_42_01_P" name="jj_service" value="41_42_01_P" /><label for="jj_service_41_42_01_P">미용업(종합)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_04_P" name="jj_service" value="41_40_04_P" /><label for="jj_service_41_40_04_P">미용업(일반/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_09_P" name="jj_service" value="41_40_09_P" /><label for="jj_service_41_40_09_P">미용업(일반/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_05_P" name="jj_service" value="41_40_05_P" /><label for="jj_service_41_40_05_P">미용업(일반/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_03_P" name="jj_service" value="41_40_03_P" /><label for="jj_service_41_40_03_P">미용업(손톱ㆍ발톱/화장ㆍ분장)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_19_01_P" name="jj_service" value="41_19_01_P" /><label for="jj_service_41_19_01_P">목욕장업(공동탕업)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_05_P" name="jj_service" value="41_41_05_P" /><label for="jj_service_41_41_05_P">미용업(화장ㆍ분장)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_40_06_P" name="jj_service" value="41_40_06_P" /><label for="jj_service_41_40_06_P">미용업(일반/피부)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_03_P" name="jj_service" value="41_41_03_P" /><label for="jj_service_41_41_03_P">미용업(피부/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_07_P" name="jj_service" value="41_40_07_P" /><label for="jj_service_41_40_07_P">미용업(일반/피부/손톱ㆍ발톱)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_04_P" name="jj_service" value="41_41_04_P" /><label for="jj_service_41_41_04_P">미용업(피부/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_08_P" name="jj_service" value="41_40_08_P" /><label for="jj_service_41_40_08_P">미용업(일반/피부/화장ㆍ분장)	  </label></li>
						
						
						
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_service_41_22_01_P" name="jj_service" value="41_22_01_P" />
							<label for="jj_service_41_22_01_P">목욕장업(공동탕업+찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_21_01_P" name="jj_service" value="41_21_01_P" />
							<label for="jj_service_41_21_01_P">목욕장업(찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_20_01_P" name="jj_service" value="41_20_01_P" />
							<label for="jj_service_41_20_01_P">목욕장업(한증막업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				
				<a href="javascript:void(0)" class="roundTextBox">산업고용(3종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_sanup_42_08_05_P" name="jj_sanup" value="42_08_05_P" />
							<label for="jj_sanup_42_08_05_P">석유판매업(주유소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_03_01_P" name="jj_sanup" value="42_03_01_P" />
							<label for="jj_sanup_42_03_01_P">석유 및 석유대체연료 판매업체</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_04_P" name="jj_sanup" value="42_08_04_P" />
							<label for="jj_sanup_42_08_04_P">석유판매업(일반판매소)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_sanup_42_08_07_P" name="jj_sanup" value="42_08_07_P" />
							<label for="jj_sanup_42_08_07_P">석유판매업(항공유판매소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_06_P" name="jj_sanup" value="42_08_06_P" />
							<label for="jj_sanup_42_08_06_P">석유판매업(특수판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_03_P" name="jj_sanup" value="42_08_03_P" />
							<label for="jj_sanup_42_08_03_P">석유판매업(용제판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_02_P" name="jj_sanup" value="42_08_02_P" />
							<label for="jj_sanup_42_08_02_P">석유판매업(부생연료유판매소)</label>
						</li>
						 -->
						
					</ul>
				</div>
				
				
				
			</div>
		</div>
		<!-- End of 지자체 인허가 통계 업종별 개업정보 -->
		
		<table id="jobOpen_use_info">
			<tr>
				<td style="font-size: 12px;padding: 10px; line-height:17px;">
					*지자체인허가 440여 업종중 생활업종과 연관된 56개업종을 서비스합니다.
					<br/>
					전국사업체조사 해당년도 이후 년도만 시계열로 제공합니다.
					<br/><br/>
					 <a href="http://localdata.kr/portal/main/contents.do?menuNo=200004" target="_blank" style="color:blue; text-decoration:underline">지자체인허가 이용안내보기</a>
				</td>
			</tr>
		</table>
		
		<!-- ======================================== Start of 업종별 뜨는 지역 ======================================== -->
		<!-- 
				지표 변경시 같이 수정해야할 파일은
				bizStatsDataBoard.jsp, bizStatsDataBoard.js의 700번째 줄 정도의 코드들, 그리고 이 파일 ... 그래도 않되면 코드로 전체검색 요망.. ㅠㅠ
		-->
		
		<div class="totalResult tr09">
			<div class="stepBox HouseMap">
				<h2>
					지역선택
					<a href="javascript:void(0)" style="position: absolute;right: 10px;top: 7px;" data-subj="지역선택" title="○ 관심지역은 전국 및 시도, 시군구를 선택하실 수 있습니다.">
						<img src="${pageContext.request.contextPath}/img/ico/ico_tooltip02.png" alt="아이콘" />
					</a>
				</h2>
				<dl class="SetArea">
					<dt><label for="inter-recommend-sido-select">관심지역</label></dt>
					<dd>
						<select id="inter-recommend-sido-select" data-type="inter-recommend" title="관심지역 시도 선택"></select>
						<select id="inter-recommend-sgg-select" title="관심지역 시군구 선택"></select>
					</dd>
				</dl>
			</div>
			<div class="stepBox HouseMap">
				<h2>
					기간선택
					<a href="javascript:void(0)" style="position: absolute;right: 10px;top: 7px;" data-subj="기간선택" title="○ 기간선택은 조회하실 기간을 분기단위로 선택하실 수 있습니다.">
						<img src="${pageContext.request.contextPath}/img/ico/ico_tooltip02.png" alt="아이콘" />
					</a>
				</h2>
				<dl class="SetArea">
					<dt style="width:100%;">
						<!-- 
						2016년 1Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4Q
						<br><br>
						2017년 1Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4Q
						 -->
						 
						
						<span id="job_best_from" ></span>
						~
						<span id="job_best_to" ></span>
						<br><br>
						<select id="select_job_best_from">
							<option value="20171" selected="selected">2017년 1Q</option>
							<option value="20172">2017년 2Q</option>
							<option value="20173">2017년 3Q</option>
							<option value="20174">2017년 4Q</option>
						</select>
						~
						<select id="select_job_best_to">
							<option value="20171">2017년 1Q</option>
							<option value="20172">2017년 2Q</option>
							<option value="20173">2017년 3Q</option>
							<option value="20174">2017년 4Q</option>
							<!-- mng_s 20180416_김건민 -->
							<option value="20181" selected="selected">2018년 1Q</option>
							<!-- mng_e 20180416_김건민 -->
						</select>
						 
					</dt>
					<!-- 
					<dd style="position:absolute; margin-left:70px;margin-top: 12px; ">
						<div id="slider-range_job_best" style="width: 0.6em; height: 200px; display:none;"></div>
						<span id="job_best_from" style="top: 50px; margin-left: 50px; position: absolute;"></span>
						<span style="top: 75px; margin-left: 100px; position: absolute;">~</span>
						<span id="job_best_to" style="top: 100px; margin-left: 50px; position: absolute;"></span>
                         
					</dd>
					 -->
					
					
				</dl>
			</div>
		
			
		</div>
		<!-- End of 업종별 뜨는 지역 -->
		
		
	</div>
	
	<div class="btnBottom">
		<a href="javascript:$bizStatsLeftMenu.ui.viewThreeDepth();" class="btnStyle01 buttonMakeBtnClass" id="buttonMakeBtn01">조건 창 열기</a>
		<a href="javascript:$bizStatsLeftMenu.ui.addSearchBtn();" class="btnStyle01 buttonMakeBtnClass" id="buttonMakeBtn02">검색조건 생성</a>
	</div>
</div>
<!-- 2Depth End -->

<!-- 3Depth Start -->
<div class="quickBox step03" id="areaSearchDetailDiv">
	<div class="subj">
		<span id="submenuTitle_stop03">조건 설정하기</span>
		<a href="javascript:void(0)" class="stepClose">닫기</a>
	</div>
	<div class="scrollBox">
		<div class="stepBox" id="job_recommend_3depth">
			<!-- 사업체 업종 Start -->
			<div id="companyTabDiv" style="display: none;">
				<span class="noneTextBox on">사업체 업종선택</span>
				<div class="noneDefault">
					<ol class="cateMenu type03">
						<li class="on"><a href="javascript:$bizStatsLeftMenu.ui.companyTab('food');">요식업</a></li>
	                    <li><a href="javascript:$bizStatsLeftMenu.ui.companyTab('retail');">도소매</a></li>
	                    <li><a href="javascript:$bizStatsLeftMenu.ui.companyTab('service');">서비스</a></li>
	                    <li><a href="javascript:$bizStatsLeftMenu.ui.companyTab('hotel');">숙박업</a></li>
					</ol>
					<div class="cm01">
						<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_food_5001" name="rd_sch_food" value="5001" checked=checked/>
								<label for="rd_sch_food_5001" class="on">한식</label>
								<input type="checkbox" id="rd_sch_food_5002" name="rd_sch_food" value="5002" />
								<label for="rd_sch_food_5002">중식</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5003" name="rd_sch_food" value="5003" />
								<label for="rd_sch_food_5003">일식</label>
								<input type="checkbox" id="rd_sch_food_5004" name="rd_sch_food" value="5004" />
								<label for="rd_sch_food_5004">분식</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5005" name="rd_sch_food" value="5005" />
								<label for="rd_sch_food_5005">서양식</label>
								<input type="checkbox" id="rd_sch_food_5006" name="rd_sch_food" value="5006" />
								<label for="rd_sch_food_5006">제과점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5007" name="rd_sch_food" value="5007" />
								<label for="rd_sch_food_5007">패스트푸드</label>
								<input type="checkbox" id="rd_sch_food_5008" name="rd_sch_food" value="5008" />
								<label for="rd_sch_food_5008">치킨</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5009" name="rd_sch_food" value="5009" />
								<label for="rd_sch_food_5009">호프 및 간이주점</label>
								<input type="checkbox" id="rd_sch_food_5010" name="rd_sch_food" value="5010" />
								<label for="rd_sch_food_5010">카페</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5011" name="rd_sch_food" value="5011" />
								<label for="rd_sch_food_5011">기타 외국식</label>
							</li>
						</ul>
					</div>
					<div class="cm02">
	                	<ul class="honinType radioStepOneBox">
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_retail_2001" name="rd_sch_retail" value="2001" />
								<label for="rd_sch_retail_2001">문구점</label>
								<input type="checkbox" id="rd_sch_retail_2002" name="rd_sch_retail" value="2002" />
								<label for="rd_sch_retail_2002">서점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2003" name="rd_sch_retail" value="2003" />
								<label for="rd_sch_retail_2003">편의점</label>
								<input type="checkbox" id="rd_sch_retail_2004" name="rd_sch_retail" value="2004" />
								<label for="rd_sch_retail_2004">식료품점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2005" name="rd_sch_retail" value="2005" />
								<label for="rd_sch_retail_2005">휴대폰점</label>
								<input type="checkbox" id="rd_sch_retail_2006" name="rd_sch_retail" value="2006" />
								<label for="rd_sch_retail_2006">의류</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2007" name="rd_sch_retail" value="2007" />
								<label for="rd_sch_retail_2007">화장품/방향제</label>
								<input type="checkbox" id="rd_sch_retail_2008" name="rd_sch_retail" value="2008" />
								<label for="rd_sch_retail_2008">철물점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2009" name="rd_sch_retail" value="2009" />
								<label for="rd_sch_retail_2009">주유소</label>
								<input type="checkbox" id="rd_sch_retail_2010" name="rd_sch_retail" value="2010" />
								<label for="rd_sch_retail_2010">꽃집</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2011" name="rd_sch_retail" value="2011" />
								<label for="rd_sch_retail_2011">슈퍼마켓</label>
							</li>
						</ul>
					</div>
	                <div class="cm03">
	                	<ul class="honinType radioStepOneBox">
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_service_1001" name="rd_sch_service" value="1001" />
								<label for="rd_sch_service_1001">인테리어</label>
								<input type="checkbox" id="rd_sch_service_1002" name="rd_sch_service" value="1002" />
								<label for="rd_sch_service_1002">목욕탕</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1003" name="rd_sch_service" value="1003" />
								<label for="rd_sch_service_1003">교습학원</label>
								<input type="checkbox" id="rd_sch_service_1004" name="rd_sch_service" value="1004" />
								<label for="rd_sch_service_1004">어학원</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1005" name="rd_sch_service" value="1005" />
								<label for="rd_sch_service_1005">예체능학원</label>
								<input type="checkbox" id="rd_sch_service_1006" name="rd_sch_service" value="1006" />
								<label for="rd_sch_service_1006">부동산중개업</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1007" name="rd_sch_service" value="1007" />
								<label for="rd_sch_service_1007">이발소</label>
								<input type="checkbox" id="rd_sch_service_1008" name="rd_sch_service" value="1008" />
								<label for="rd_sch_service_1008">미용실</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1009" name="rd_sch_service" value="1009" />
								<label for="rd_sch_service_1009">세탁소</label>
								<input type="checkbox" id="rd_sch_service_1010" name="rd_sch_service" value="1010" />
								<label for="rd_sch_service_1010">PC방</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1011" name="rd_sch_service" value="1011" />
								<label for="rd_sch_service_1011">노래방</label>
							</li>
						</ul>
					</div>
	                <div class="cm04">
	                	<ul class="honinType radioStepOneBox">
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_hotel_4001" name="rd_sch_hotel" value="4001" />
								<label for="rd_sch_hotel_4001">호텔</label>
								<input type="checkbox" id="rd_sch_hotel_4002" name="rd_sch_hotel" value="4002" />
								<label for="rd_sch_hotel_4002">여관(모텔포함) 및 여인숙</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_hotel_4003" name="rd_sch_hotel" value="4003" />
								<label for="rd_sch_hotel_4003">펜션</label>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 사업체 업종 End -->
			<!-- 사업체 수 Start -->
			<div id="companyCountDiv" style="display: none;">
	            <span class="noneTextBox on">해당 업종 사업체 수 설정</span>
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="companyCount"></div>
	               	<ul class="sliderDefault_bar">
	               		<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li>
					</ul>
			    </div>
		    </div>
		    <!-- 사업체 수 End -->
		    <!-- 사업체 증감  Start -->
		    <div id="companyIncreaseDiv" style="display: none;">
			    <span class="noneTextBox on">해당 업종 사업체 증감 설정</span>
			    <div class="noneDefault">
					<div class="sliderDefault" id="companyIncrease"></div>
	                <ul class="sliderDefault_bar">
	                	<li>낮은지역</li>
	                    <li>평균지역</li>
	                    <li>높은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 사업체 증감 End -->
			<!-- 직장인구 Start -->
			<div id="jobPeopleDiv" style="display: none;">
				<span class="noneTextBox on">직장인구 설정</span> 
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="jobPeople"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
		    	</div>
		    </div>
		    <!-- 직장인구 End -->
		    <!-- 거주인구 Start -->
		    <div id="stayPeopleDiv" style="display: none;">
			    <span class="noneTextBox on">거주인구 설정</span>  
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="stayPeople"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
		    	</div>
		    </div>
		    <!-- 거주인구 End -->
		    <!-- 성별인구 Start -->
		    <div id="genderPeopleDiv" style="display: none;">
			    <span class="noneTextBox on">성별인구 설정</span>
			    <div class="noneDefault">
			    	<ul class="dbTypeCk radioStepBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
						 <li>
<!-- 				        	<input type="radio" id="population_gender01" name="population_gender"  value="0" />
				            <label for="population_gender01" class="mr20">전체</label> -->
				            <input type="radio" id="population_gender02" name="population_gender" value="1" checked=checked />
				            <label for="population_gender02" class="mr20 on">남자</label>
				            <input type="radio" id="population_gender03" name="population_gender" value="2" />
				            <label for="population_gender03">여자</label>
				        </li> 
					</ul>
			    	<div class="sliderDefault" id="genderPeople"></div>
						<ul class="sliderDefault_bar">
							<li>적은지역</li>
	                     	<li>평균지역</li>
	                     	<li>많은지역</li> 
	                 </ul>
			    </div>
		    </div>
		    <!-- 성별인구 End -->
		    <!-- 연령별 인구 Start -->
		    <div id="agePeopleDiv" style="display: none;">
			    <span class="noneTextBox on">연령별 인구 설정, 다중선택 가능</span> 
			    <div class="noneDefault">
					<ul class="honinType multiCheckBox">
	                	<li>
	                    	<input type="checkbox" id="rd_age01" name="rd_age" value="10_under" checked=checked> <!-- 2016.03.21 수정, checked추가 -->
				            <label for="rd_age01" class="on">10세미만</label>
				            <input type="checkbox" id="rd_age02" name="rd_age" value="10">
				            <label for="rd_age02">10대</label>
						</li>
	                    <li>
	                    	<input type="checkbox" id="rd_age03" name="rd_age" value="20">
				            <label for="rd_age03">20대</label>
				            <input type="checkbox" id="rd_age04" name="rd_age" value="30">
				            <label for="rd_age04">30대</label>
						</li> 
	                    <li>
	                    	<input type="checkbox" id="rd_age05" name="rd_age" value="40">
				            <label for="rd_age05">40대</label>
				            <input type="checkbox" id="rd_age06" name="rd_age" value="50">
				            <label for="rd_age06">50대</label>
						</li> 
	                    <li>
	                    	<input type="checkbox" id="rd_age07" name="rd_age" value="60">
				            <label for="rd_age07">60대</label>
				            <input type="checkbox" id="rd_age08" name="rd_age" value="70_over">
				            <label for="rd_age08">70세 이상</label>
						</li> 
					</ul>
					<div class="sliderDefault" id="agePeople"></div>
	               	<ul class="sliderDefault_bar">
						<li>적은지역</li>
	                    <li>평균지역</li>
	                   	<li>많은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 연령별 인구 End -->
			<!-- 가구유형 Start -->
			<div id="householdDiv" style="display: none;">
			    <span class="noneTextBox on">세대구성별 설정</span> 
			    <div class="noneDefault">
			    	<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
			    		<li>
				            <input type="checkbox" id="rd_household01" name="household_type" value="01" checked=checked />
				            <label for="rd_household01" class="on">1세대 가구</label>
				            <input type="checkbox" id="rd_household02" name="household_type" value="02" />
				            <label for="rd_household02">2세대 가구</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_household03" name="household_type" value="03" />
				            <label for="rd_household03">3세대 가구</label>
				            <input type="checkbox" id="rd_household04" name="household_type" value="04" />
				            <label for="rd_household04">4세대 가구</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_household05" name="household_type" value="05" />
				            <label for="rd_household05">5세대 이상 가구</label>
				            <input type="checkbox" id="rd_household06" name="household_type" value="A0" />
				            <label for="rd_household06">1인가구</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_household07" name="household_type" value="B0" />
				            <label for="rd_household07">비혈연가구</label>
				        </li>
					</ul>
	                <div class="sliderDefault" id="household"></div>
	                <ul class="sliderDefault_bar">
	                    <li>적은지역</li>
	                	<li>평균지역</li>
	                	<li>많은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 가구유형 End -->
			<!-- 점유형태 Start -->
			<div id="occupyTypeDiv" style="display: none;">
			    <span class="noneTextBox on">점유 형태별 설정</span> 
			    <div class="noneDefault">
			    	<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
						<li>
				            <input type="checkbox" id="rd_occupy01" name="ocptn_type" value="1" checked=checked />
				            <label for="rd_occupy01" class="on">자기집</label>
				            <input type="checkbox" id="rd_occupy02" name="ocptn_type" value="2" />
				            <label for="rd_occupy02">전세(월세없음)</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_occupy03" name="ocptn_type" value="3" />
				            <label for="rd_occupy03">보증금 있는 월세</label>
				            <input type="checkbox" id="rd_occupy04" name="ocptn_type" value="4" />
				            <label for="rd_occupy04">보증금 없는 월세</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_occupy05" name="ocptn_type" value="5" />
				            <label for="rd_occupy05">사글세</label>
				            <input type="checkbox" id="rd_occupy06" name="ocptn_type" value="6" />
				            <label for="rd_occupy06">무상(관사, 사택, 친척집 등)</label>
				        </li>
					</ul>
			    	<div class="sliderDefault" id="occupyType"></div>
					<ul class="sliderDefault_bar">
	                	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 점유형태 End -->
			<!-- 거주 주택 Start -->
			<div id="houseLivingTypeDiv" style="display: none;">
			    <span class="noneTextBox on">거주 주택 유형 설정</span>  
			    <div class="noneDefault">
			    	<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
						<li>
				            <input type="checkbox" id="rd_home01" name="house_type" value="01" checked=checked />
				            <label for="rd_home01" class="on">단독주택</label>
				            <input type="checkbox" id="rd_home02" name="house_type" value="02" />
				            <label for="rd_home02">아파트</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_home03" name="house_type" value="03" />
				            <label for="rd_home03">연립주택</label>
				            <input type="checkbox" id="rd_home04" name="house_type" value="04" />
				            <label for="rd_home04">다세대주택</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_home05" name="house_type" value="05" />
				            <label for="rd_home05">비주거용건물(상가,공장,여관 등)내주택</label>
				            <input type="checkbox" id="rd_home06" name="house_type" value="06" />
				            <label for="rd_home06">주택이외의 거처</label>
				        </li>
					</ul>
			    </div>
			</div>
			<!-- 거주 주택 End -->
			<!-- 해당 주택 수 Start -->
			<div id="houseTypeDiv" style="display: none;">
			    <span class="noneTextBox on">해당 주택 수 설정</span>
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="houseType"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li>
					</ul>
		    	</div>
		    </div>
	    	<!-- 해당 주택 수 End -->
	    	<!-- 아파트 시세 Start -->
	    	<div id="apartPriceDiv" style="display: none;">
			    <span class="noneTextBox on">공시지가 설정</span>   
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="apartPrice"></div>
					<ul class="sliderDefault_bar">
	                   	<li>낮은지역</li>
	                    <li>평균지역</li>
	                    <li>높은지역</li> 
					</ul>
		    	</div>
		    </div>
			<!-- 아파트 시세 End -->
	    	<!-- 노후 주택 Start -->
	    	<div id="oldHouseDiv" style="display: none;">
			    <span class="noneTextBox on">20년 이상 된 해당 주택 수 설정</span>   
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="oldHouse"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
		    	</div>
		    </div>
	    	<!-- 노후 주택 End -->
		</div>
		
		<!-- mng_s ====================================== 업종별 뜨는 지역 시작 ========================================== -->
		<div  id="API_0009" class="totalResult tr10">
			<div class="stepBox">
				<a href="javascript:void(0)" class="roundTextBox">문화체육(5종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<!-- input type의 이름 jj_ 는 bizStatsDataBoard.js에서 이름을 맞추어 주어야한다.  -->
						<li>
							<input type="checkbox" id="jj_culture_22_09_01_P" name="jj_culture" value="22_09_01_P" />
							<label for="jj_culture_22_09_01_P">인터넷 컴퓨터 게임시설 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_22_14_01_P" name="jj_culture" value="22_14_01_P" />
							<label for="jj_culture_22_14_01_P">청소년 게임 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_21_06_01_P" name="jj_culture" value="21_06_01_P" />
							<label for="jj_culture_21_06_01_P">노래 연습장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_06_01_P" name="jj_culture" value="23_06_01_P" />
							<label for="jj_culture_23_06_01_P">체육도장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_12_01_P" name="jj_culture" value="23_12_01_P" />
							<label for="jj_culture_23_12_01_P">무도 학원업</label>
						</li>
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_culture_41_36_01_P" name="jj_culture" value="41_36_01_P" />
							<label for="jj_culture_41_36_01_P">공중이용시설(학원)</label>
						</li>
						
						
						<li>
							<input type="checkbox" id="jj_culture_23_11_01_P" name="jj_culture" value="23_11_01_P" />
							<label for="jj_culture_23_11_01_P">무도장업</label>
						</li>
						 -->
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">관광(6종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_tour_41_43_01_P" name="jj_tour" value="41_43_01_P" />
							<label for="jj_tour_41_43_01_P">숙박업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_16_01_P" name="jj_tour" value="41_16_01_P" />
							<label for="jj_tour_41_16_01_P">숙박업(일반-여관업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_17_01_P" name="jj_tour" value="41_17_01_P" />
							<label for="jj_tour_41_17_01_P">숙박업(일반-여인숙업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_14_01_P" name="jj_tour" value="41_14_01_P" />
							<label for="jj_tour_41_14_01_P">숙박업(일반-일반호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_13_01_P" name="jj_tour" value="41_13_01_P" />
							<label for="jj_tour_41_13_01_P">숙박업(일반-관광호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_16_19_01_P" name="jj_tour" value="16_19_01_P" />
							<label for="jj_tour_16_19_01_P">관광펜션업</label>
						</li>
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_tour_41_15_01_P" name="jj_tour" value="41_15_01_P" />
							<label for="jj_tour_41_15_01_P">숙박업(일반-휴양콘도미니엄업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">식품(25종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_food_24_01_01_P" name="jj_food" value="24_01_01_P" />
							<label for="jj_food_24_01_01_P">일반음식점(한식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_44_01_P" name="jj_food" value="24_44_01_P" />
							<label for="jj_food_24_44_01_P">휴게음식점(커피숍)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_20_01_P" name="jj_food" value="24_20_01_P" />
							<label for="jj_food_24_20_01_P">일반음식점(기타)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_12_01_P" name="jj_food" value="24_12_01_P" />
							<label for="jj_food_24_12_01_P">일반음식점(호프/통닭)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_05_01_P" name="jj_food" value="24_05_01_P" />
							<label for="jj_food_24_05_01_P">일반음식점(분식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_18_01_P" name="jj_food" value="24_18_01_P" />
							<label for="jj_food_24_18_01_P">일반음식점(식육(숯불구이))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_03_01_P" name="jj_food" value="24_03_01_P" />
							<label for="jj_food_24_03_01_P">일반음식점(경양식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_42_01_P" name="jj_food" value="24_42_01_P" />
							<label for="jj_food_24_42_01_P">휴게음식점(편의점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_48_01_P" name="jj_food" value="24_48_01_P" />
							<label for="jj_food_24_48_01_P">제과점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_07_01_P" name="jj_food" value="24_07_01_P" />
							<label for="jj_food_24_07_01_P">일반음식점(정종,대포집,소주방)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_04_01_P" name="jj_food" value="24_04_01_P" />
							<label for="jj_food_24_04_01_P">일반음식점(일식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_02_01_P" name="jj_food" value="24_02_01_P" />
							<label for="jj_food_24_02_01_P">일반음식점(중국식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_43_01_P" name="jj_food" value="24_43_01_P" />
							<label for="jj_food_24_43_01_P">휴게음식점(패스트푸드)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_16_01_P" name="jj_food" value="24_16_01_P" />
							<label for="jj_food_24_16_01_P">일반음식점(횟집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_32_01_P" name="jj_food" value="24_32_01_P" />
							<label for="jj_food_24_32_01_P">단란주점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_06_01_P" name="jj_food" value="24_06_01_P" />
							<label for="jj_food_24_06_01_P">일반음식점(뷔페식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_15_01_P" name="jj_food" value="24_15_01_P" />
							<label for="jj_food_24_15_01_P">일반음식점(김밥(도시락))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_19_01_P" name="jj_food" value="24_19_01_P" />
							<label for="jj_food_24_19_01_P">일반음식점(탕류(보신용))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_45_01_P" name="jj_food" value="24_45_01_P" />
							<label for="jj_food_24_45_01_P">휴게음식점(전통찻집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_81_01_P" name="jj_food" value="24_81_01_P" />
							<label for="jj_food_24_81_01_P">일반음식점(패밀리레스토랑)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_76_01_P" name="jj_food" value="24_76_01_P" />
							<label for="jj_food_24_76_01_P">일반음식점(라이브카페)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_71_01_P" name="jj_food" value="24_71_01_P" />
							<label for="jj_food_24_71_01_P">유흥주점영업(노래클럽)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_68_01_P" name="jj_food" value="24_68_01_P" />
							<label for="jj_food_24_68_01_P">일반음식점(감성주점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_70_01_P" name="jj_food" value="24_70_01_P" />
							<label for="jj_food_24_70_01_P">일반음식점(냉면집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_30_01_P" name="jj_food" value="24_30_01_P" />
							<label for="jj_food_24_30_01_P">유흥주점영업(간이주점)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_food_24_14_01_P" name="jj_food" value="24_14_01_P" />
							<label for="jj_food_24_14_01_P">일반음식점(복어취급)</label>
						</li>
						 -->
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">소상공인(17종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
					
						<li><input type="checkbox" id="jj_service_41_40_01_P" name="jj_service" value="41_40_01_P" /><label for="jj_service_41_40_01_P">미용업(일반)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_01_P" name="jj_service" value="41_41_01_P" /><label for="jj_service_41_41_01_P">미용업(피부)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_02_P" name="jj_service" value="41_40_02_P" /><label for="jj_service_41_40_02_P">미용업(손톱ㆍ발톱)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_24_01_P" name="jj_service" value="41_24_01_P" /><label for="jj_service_41_24_01_P">이용업	                          </label></li>
						<li><input type="checkbox" id="jj_service_41_41_02_P" name="jj_service" value="41_41_02_P" /><label for="jj_service_41_41_02_P">미용업(피부/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_42_01_P" name="jj_service" value="41_42_01_P" /><label for="jj_service_41_42_01_P">미용업(종합)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_04_P" name="jj_service" value="41_40_04_P" /><label for="jj_service_41_40_04_P">미용업(일반/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_09_P" name="jj_service" value="41_40_09_P" /><label for="jj_service_41_40_09_P">미용업(일반/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_05_P" name="jj_service" value="41_40_05_P" /><label for="jj_service_41_40_05_P">미용업(일반/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_03_P" name="jj_service" value="41_40_03_P" /><label for="jj_service_41_40_03_P">미용업(손톱ㆍ발톱/화장ㆍ분장)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_19_01_P" name="jj_service" value="41_19_01_P" /><label for="jj_service_41_19_01_P">목욕장업(공동탕업)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_05_P" name="jj_service" value="41_41_05_P" /><label for="jj_service_41_41_05_P">미용업(화장ㆍ분장)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_40_06_P" name="jj_service" value="41_40_06_P" /><label for="jj_service_41_40_06_P">미용업(일반/피부)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_03_P" name="jj_service" value="41_41_03_P" /><label for="jj_service_41_41_03_P">미용업(피부/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_07_P" name="jj_service" value="41_40_07_P" /><label for="jj_service_41_40_07_P">미용업(일반/피부/손톱ㆍ발톱)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_04_P" name="jj_service" value="41_41_04_P" /><label for="jj_service_41_41_04_P">미용업(피부/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_08_P" name="jj_service" value="41_40_08_P" /><label for="jj_service_41_40_08_P">미용업(일반/피부/화장ㆍ분장)	  </label></li>
						
						
						
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_service_41_22_01_P" name="jj_service" value="41_22_01_P" />
							<label for="jj_service_41_22_01_P">목욕장업(공동탕업+찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_21_01_P" name="jj_service" value="41_21_01_P" />
							<label for="jj_service_41_21_01_P">목욕장업(찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_20_01_P" name="jj_service" value="41_20_01_P" />
							<label for="jj_service_41_20_01_P">목욕장업(한증막업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				
				<a href="javascript:void(0)" class="roundTextBox">산업고용(3종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_sanup_42_08_05_P" name="jj_sanup" value="42_08_05_P" />
							<label for="jj_sanup_42_08_05_P">석유판매업(주유소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_03_01_P" name="jj_sanup" value="42_03_01_P" />
							<label for="jj_sanup_42_03_01_P">석유 및 석유대체연료 판매업체</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_04_P" name="jj_sanup" value="42_08_04_P" />
							<label for="jj_sanup_42_08_04_P">석유판매업(일반판매소)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_sanup_42_08_07_P" name="jj_sanup" value="42_08_07_P" />
							<label for="jj_sanup_42_08_07_P">석유판매업(항공유판매소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_06_P" name="jj_sanup" value="42_08_06_P" />
							<label for="jj_sanup_42_08_06_P">석유판매업(특수판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_03_P" name="jj_sanup" value="42_08_03_P" />
							<label for="jj_sanup_42_08_03_P">석유판매업(용제판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_02_P" name="jj_sanup" value="42_08_02_P" />
							<label for="jj_sanup_42_08_02_P">석유판매업(부생연료유판매소)</label>
						</li>
						 -->
						
					</ul>
				</div>
			</div>
		</div>
		<!-- mng_s 업종별 뜨는 지역 끝 -->
		
	</div>
	
	<div class="btnBottom" id="job_recommend_3depth_btn">
		<a href="javascript:$bizStatsLeftMenu.ui.addSearchBtn();" class="btnStyle02">조건버튼 생성</a><!-- id duple 문제로 id="buttonMakeBtn02" 삭제 문제시 id 추가 조치하면 됨 -->
	</div>
</div>
<!-- 3Depth End -->