<%
/**************************************************************************************************************************
* Program Name  : 기술창업 통계지도 Left메뉴 JSP  
* File Name     : technicalBizLeftMenu.jsp
* Comment       : 
* History       : 네이버시스템 권차욱 2016-06-21
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div class="shadow"></div>
<!-- 1Depth Start -->
<div class="quickBox step01">
	<div class="subj">
		<span>기술업종 통계지도 메뉴 보기</span>
		<a href="javascript:void(0)" class="stepClose">닫기</a>
	</div> 
	<div class="scrollBox">
		<dl class="qmdl pt0"> 
			<dt><a href="javascript:$('#qmdlList01').slideToggle();void(0);">지역별 기술업종 현황</a></dt>
			<dd id="qmdlList01">
				<ul class="techType01">
					<%-- <li class="icon01"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('characteristic');" data-subj="기술업종 특성 현황 조회" title="${paramInfo.tooltipList.E0001}">기술업종 특성 현황 조회</a></li> --%>
					<li class="icon01"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('sido');" data-subj="시도별 기술업종 현황" title="${paramInfo.tooltipList.E0001}" tabindex="100">시도별 기술업종 현황</a></li>
					<li class="icon02"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('sigungu');" data-subj="시군구별 기술업종 현황" title="${paramInfo.tooltipList.E0101}" tabindex="101">시군구 기술업종 현황</a></li>
					<li class="icon03"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('density');" data-subj="업종밀집도변화" title="${paramInfo.tooltipList.E0201}" tabindex="102">업종밀집도 변화</a></li>
				</ul>
			</dd>
		</dl> 
		
		<!-- 2017.09.25 개발팀 추가 -->
		<dl class="qmdl pt0">
			<dt><a href="javascript:$('#qmdlList02').slideToggle();void(0);">기술업종 분석지도</a></dt>
			<dd id="qmdlList02">
				<ul class="techType01">
					<li class="icon06"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('lq');" data-subj="업종별 입지계수 지도" title="${paramInfo.tooltipList.E0501}" tabindex="103">업종별 입지계수 지도</a></li>
					<li class="icon07"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('search');" data-subj="조건별 지역찾기" title="${paramInfo.tooltipList.E0601}" tabindex="104">조건별 지역찾기</a></li>
				</ul>
			</dd>
		</dl>
		<!-- 2017.09.25 개발팀 추가 종료 -->
		
		<dl class="qmdl pt0"> 
			<dt><a href="javascript:$('#qmdlList03').slideToggle();void(0);">기술업종 생태정보 현황</a></dt>
			<dd id="qmdlList03">
				<ul class="techType01">
					<li class="icon04"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('supply');" data-subj="지원시설 조회" title="${paramInfo.tooltipList.E0301}" tabindex="105">지원시설 조회</a></li>
					<li class="icon05"><a href="javascript:$technicalBizLeftMenu.ui.setDetailStatsPanel('industry');" data-subj="산업단지 조회" title="${paramInfo.tooltipList.E0401}" tabindex="106">산업단지 조회</a></li>
				</ul>
			</dd>
		</dl>  
	</div>

	<div class="menuAutoClose">
		<input type="checkbox" id="menuAutoClose_check" name="menuAutoClose_check" checked="checked"/>
		<label for="menuAutoClose_check" class="on">통계메뉴 자동닫기</label>
	</div>
	<div class="btnBottom">
		<span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
		<div id="bottomServiceLayer" class="serviceLayer" style="display: none;">
			<ol>
				<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');" title="새창으로 열림">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');" title="새창으로 열림">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdss.kostat.go.kr');" title="새창으로 열림">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');" title="새창으로 열림">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');" title="새창으로 열림">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');" title="새창으로 열림">통계분류</a></li>
			</ol>
		</div>
		<a href="javascript:void(0);" class="btnService" id="bottomService">통계청 주요서비스</a>
	</div>
</div>
<!-- 1Depth End -->

<!-- 2Depth Start -->
<div class="quickBox step02">
	<div class="subj">
		<span id="title">시군구 기술업종 현황</span>
		<a href="javascript:void(0)" class="stepClose" tabindex="167">닫기</a>
	</div>
	<div class="normalBox01"> 
		<div class="stepBox xWidth">
		<a href="javascript:void(0)" class="roundTextBox" tabindex="107">전체현황</a>
		<div class="joinDefault">
			<ul class="radioType techType02"> 
                <li>
                    <input type="radio" name="rd_cate" id="rd_cate02" value="00"/>
		            <label id="lebelTech00" for="rd_cate02" tabindex="108">기술업종 전체현황</label>
                </li>
		    </ul>
		</div>
		<a href="javascript:void(0)" class="roundTextBox" tabindex="109">기술혁신정도(4종)</a>
		<div class="joinDefault">
			<ul class="radioType techType02"> 
                <li >
                    <input type="radio" name="rd_cate" id="rd_cate03" value="11"/>
		            <label id="lebelTech11" for="rd_cate03" tabindex="110">첨단기술업종</label>
                </li>
                <li>
                    <input type="radio" name="rd_cate" id="rd_cate04" value="12"/>
		            <label id="lebelTech12" for="rd_cate04" tabindex="111">고기술업종</label>
                </li>
                <li>
                    <input type="radio" name="rd_cate" id="rd_cate05" value="13"/>
		            <label id="lebelTech13" for="rd_cate05" tabindex="112">중기술업종</label>
                </li>
                <li>
                    <input type="radio" name="rd_cate" id="rd_cate06" value="14"/>
		            <label id="lebelTech14" for="rd_cate06" tabindex="113">저기술업종</label>
                </li>
		    </ul>
		</div>
        <a href="javascript:void(0)" class="roundTextBox" tabindex="114">지식집약정도(3종)</a>
		<div class="joinDefault">
			<ul class="radioType techType02"> 
                <li>
                    <input type="radio" name="rd_cate" id="rd_cate08" value="21"/>
		            <label id="lebelTech21" for="rd_cate08" tabindex="115">창의 및 디지털업종</label>
                </li> 
                <li>
                    <input type="radio" name="rd_cate" id="rd_cate09" value="22"/>
		            <label id="lebelTech22" for="rd_cate09" tabindex="116">ICT업종</label>
                </li> 
                <li>
                    <input type="radio" name="rd_cate" id="rd_cate10" value="23"/>
		            <label id="lebelTech23" for="rd_cate10" tabindex="117">전문서비스업종</label>
                </li> 
		    </ul>
		</div>    
		</div> 
	</div> 
</div>
<!-- 2Depth End -->

<!-- 3Depth Start -->
<div class="quickBox step03">
	<div class="subj">
		<span>첨단기술업종</span>
		<a href="javascript:void(0)" class="stepClose">닫기</a>
	</div>
	<div class="normalBox01"> 
		<div class="stepBox xWidth">
			<!-- 첨단기술 -->
			<!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
            <ul class="radioType xWidth" id="densityMenu3Depth_11"> 
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha11" value="11" />
		            <label for="rd_goocha11" tabindex="118">전체 현황</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha110" value="110"/>
		            <label for="rd_goocha110" tabindex="119">의료용 물질 및 의약품 제조업</label>
                </li>
                <li style="height:40px;">
                    <input type="radio" name="rd_goocha" id="rd_goocha111" value="111" />
		            <label for="rd_goocha111" tabindex="120">전자부품,컴퓨터,영상,음향 및 통신장비<br>제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha112" value="112" />
		            <label for="rd_goocha112" tabindex="121">의료,정밀,광학기기 및 시계 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha113" value="113"/>
		            <label for="rd_goocha113" tabindex="122">항공기,우주선 및 부품 제조업</label>
                </li> 
		    </ul>
		    
		    <!-- 고기술 -->
		    <ul class="radioType xWidth" id="densityMenu3Depth_12" style="display:none;"> 
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha12" value="12"/>
		            <label for="rd_goocha12" tabindex="123">전체 현황</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha120" value="120"/>
		            <label for="rd_goocha120" tabindex="124">화학물질 및 화학제품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha121" value="121"/>
		            <label for="rd_goocha121" tabindex="125">전기장비 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha122" value="122"/>
		            <label for="rd_goocha122" tabindex="126">기타 기계 및 장비 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha123" value="123"/>
		            <label for="rd_goocha123" tabindex="127">자동차 및 트레일러 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha124" value="124"/>
		            <label for="rd_goocha124" tabindex="128">기타 운송장비 제조업</label>
                </li>  
		    </ul>
		    
		    <!-- 중기술 -->
		    <ul class="radioType xWidth" id="densityMenu3Depth_13" style="display:none;"> 
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha13" value="13"/>
		            <label for="rd_goocha13" tabindex="129">전체 현황</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha130" value="130"/>
		            <label for="rd_goocha130" tabindex="130">코크스,연탄 및 석유정제품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha131" value="131"/>
		            <label for="rd_goocha131" tabindex="131">고무제품 및 플라스틱 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha132" value="132"/>
		            <label for="rd_goocha132" tabindex="132">비금속 광물제품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha133" value="133"/>
		            <label for="rd_goocha133" tabindex="133">1차 금속 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha134" value="134"/>
		            <label for="rd_goocha134" tabindex="134">금속가공제품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha135" value="135"/>
		            <label for="rd_goocha135" tabindex="135">선박 및 보트 건조업</label>
                </li>  
		    </ul>
		    
		    <!-- 저기술 -->
		    <ul class="radioType xWidth" id="densityMenu3Depth_14" style="display:none;"> 
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha14" value="14"/>
		            <label for="rd_goocha14" tabindex="136">전체 현황</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha140" value="140"/>
		            <label for="rd_goocha140" tabindex="137">식료품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha141" value="141"/>
		            <label for="rd_goocha141" tabindex="138">음료 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha142" value="142"/>
		            <label for="rd_goocha142" tabindex="139">담배 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha143" value="143"/>
		            <label for="rd_goocha143" tabindex="140">섬유제품 제조업(의복 제외)</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha144" value="144"/>
		            <label for="rd_goocha144" tabindex="141">의복,의복액세서리 및 모피제품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha145" value="145"/>
		            <label for="rd_goocha145" tabindex="142">가죽 가방 및 신발 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha146" value="146"/>
		            <label for="rd_goocha146" tabindex="143">목재 및 나무제품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha147" value="147"/>
		            <label for="rd_goocha147" tabindex="144">펄프,종이 및 종이제품 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha148" value="148"/>
		            <label for="rd_goocha148" tabindex="145">인쇄 및 기록매체 복제업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha149" value="149"/>
		            <label for="rd_goocha149" tabindex="146">가구 제조업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha14A" value="14A"/>
		            <label for="rd_goocha14A" tabindex="147">기타제품 제조업</label>
                </li>
		    </ul>
		    
		    <!-- 창의 및 디지털 -->
		    <ul class="radioType xWidth" id="densityMenu3Depth_21" style="display:none;"> 
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha21" value="21"/>
		            <label for="rd_goocha21" tabindex="148">전체 현황</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha210" value="210"/>
		            <label for="rd_goocha210" tabindex="149">서적, 잡지 및 기타 인쇄물 출판업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha211" value="211"/>
		            <label for="rd_goocha211" tabindex="150">영화, 비디오물, 방송프로그램 제작 및 배급업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha212" value="212"/>
		            <label for="rd_goocha212" tabindex="151">음악 및 오디오물 출판 및 원판 녹음업</label>
                </li>
                <li style="height:40px;">
                    <input type="radio" name="rd_goocha" id="rd_goocha213" value="213"/>
		            <label for="rd_goocha213" tabindex="152">방송업</label>
                </li>
                <!-- <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha214" value="214"/>
		            <label for="rd_goocha214">음악 및 기타 오디오물 출판업</label>
                </li> -->
                <!-- <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha215" value="215"/>
		            <label for="rd_goocha215">오락,뉴스 활동 및 박물관</label>
                </li> -->
		    </ul>
		    
		    <!-- ICT -->
		    <ul class="radioType xWidth" id="densityMenu3Depth_22" style="display:none;"> 
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha22" value="22"/>
		            <label for="rd_goocha22" tabindex="153">전체 현황</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha220" value="220"/>
		            <label for="rd_goocha220" tabindex="154">소프트웨어개발 및 공급업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha221" value="221"/>
		            <label for="rd_goocha221" tabindex="155">전기통신업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha222" value="222"/>
		            <label for="rd_goocha222" tabindex="156">컴퓨터 프로그래밍, 시스템 통합 및 관리업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha223" value="223"/>
		            <label for="rd_goocha223" tabindex="157">정보서비스업</label>
                </li>
                <!-- <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha224" value="224"/>
		            <label for="rd_goocha224">정보서비스업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha225" value="225"/>
		            <label for="rd_goocha225">데이터 프로세싱, 데이터 베이스 작업</label>
                </li> -->
		    </ul>
		    
		    <!-- 전문서비스 -->
		    <ul class="radioType xWidth" id="densityMenu3Depth_23" style="display:none;"> 
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha23" value="23"/>
		            <label for="rd_goocha23" tabindex="158">전체 현황</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha230" value="230"/>
		            <label for="rd_goocha230" tabindex="159">연구개발업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha231" value="231"/>
		            <label for="rd_goocha231" tabindex="160">전문서비스업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha232" value="232"/>
		            <label for="rd_goocha232" tabindex="161">법무,회계,건축 서비스</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha233" value="233"/>
		            <label for="rd_goocha233" tabindex="162">광고대행업 및 전시광고업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha234" value="234"/>
		            <label for="rd_goocha234" tabindex="163">시장조사 및 여론조사업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha235" value="235"/>
		            <label for="rd_goocha235" tabindex="164">경영컨설팅업</label>
                </li>
                <li style="height:40px;">
                    <input type="radio" name="rd_goocha" id="rd_goocha236" value="236"/>
		            <label for="rd_goocha236" tabindex="165">건축기술,엔지니어링 및 기타 과학기술<br>서비스업</label>
                </li>
                <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha237" value="237"/>
		            <label for="rd_goocha237" tabindex="166">기타 전문,과학 및 기술 서비스업</label>
                </li>
                <!-- <li>
                    <input type="radio" name="rd_goocha" id="rd_goocha238" value="238"/>
		            <label for="rd_goocha238">사업지원 서비스업</label>
                </li> -->
		    </ul>
		    <!-- 2017.12.01 개발팀 수정 기술업종 코드 변경 -->
		</div> 
	</div> 
</div>
<!-- 3Depth End -->

<!-- 조건별 지역찾기 Start -->
<div class="quickBox dubble step04">
	<div class="subj">
		<span>조건별 지역찾기</span>
		<a href="javascript:void(0)" class="stepClose">닫기</a>
	</div>
	
	<div class="normalBox01 searchAreaBox" > 
		<div class="stepBox searchBox" style="border-bottom : 0px solid #f7f6f6;">
			<a href="javascript:void(0)" onclick="javascript:$technicalBizLeftMenu.event.toggle(this)" class="noneTextBox on">업종 선택</a>
			<ul class="type01 radioType" id="searchSelectThemeCd">
				<li class="full">
					<input type="radio" id="rd_suyo01" name="sectors" value="00" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo01">기술업종 전체</label>
				</li>
				<li>
					<input type="radio" id="rd_suyo02" name="sectors" value="11" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo02">첨단기술업종</label>
				</li>
				<li>
					<input type="radio" id="rd_suyo03" name="sectors" value="12" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo03">고기술업종</label>
				</li>
				<li>
					<input type="radio" id="rd_suyo04" name="sectors" value="13" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo04">중기술업종</label>
				</li>
				<li>
					<input type="radio" id="rd_suyo05" name="sectors" value="14" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo05">저기술업종</label>
				</li>
				<li>
					<input type="radio" id="rd_suyo06" name="sectors" value="21" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo06">창의·디지털업종</label>
				</li>
				<li>
					<input type="radio" id="rd_suyo07" name="sectors" value="22" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo07">ICT 업종</label>
				</li>
				<li>
					<input type="radio" id="rd_suyo08" name="sectors" value="23" onclick="$technicalBizLeftMenu.ui.searchSelectThemeCd(this)">
					<label for="rd_suyo08">전문서비스업종</label>
				</li>
			</ul>
			<a href="javascript:void(0)" onclick="javascript:$technicalBizLeftMenu.event.toggle01(this)" class="noneTextBox on">기술업종 통계정보 설정</a>
			<div class="ifBox">
				<ul class="type01 radioType" id="selectSliderTab">
					<li class="half" onclick="$technicalBizLeftMenu.ui.changeSliderTab('0')">
						<input type="radio" id="rd_suyoTab01" name="infoSet" value="lq" checked='checked'>
						<label  class="s01 on" for="rd_suyoTab01">입지계수</label> 
					</li>
					<li  class="half" onclick="$technicalBizLeftMenu.ui.changeSliderTab('1')">
						<input type="radio" id="rd_suyoTab02" name="infoSet" value="irds">
						<label  class="s01" for="rd_suyoTab02">증감률(전년대비)</label>
					</li>
				</ul>
				<div class="infoSetArea on" id="infoSetArea0">
					<ul class="type01 cktype">
						<li>
							<input type="checkbox" id="chk_saup01" onclick="$technicalBizLeftMenu.ui.searchStandard('chk_saup01')">
							<label for="chk_saup01" class="t01">사업체 기준</label>
						</li>
						<li>
							<input type="checkbox" id="chk_jongsa01" onclick="$technicalBizLeftMenu.ui.searchStandard('chk_jongsa01')">
							<label for="chk_jongsa01" class="t02">종사자 기준</label>
						</li>
					</ul>	
					<div class="slideArea10">
						<div id='slider01' class="silderStyle"></div>
						<div class="resultValue01">
							<div class="val01"></div>
							<div class="val02"></div>
						</div>
					</div>
					<div class="slideArea10">
						<div id='slider02' class="silderStyle"></div>
						<div class="resultValue01">
							<div class="val01"></div>
							<div class="val02"></div>
						</div>
					</div>
				</div>
							       	
				<div class="infoSetArea" id="infoSetArea1">
					<ul class="type01 cktype">
						<li>
							<input type="checkbox" id="chk_saup02" onclick="$technicalBizLeftMenu.ui.searchStandard('chk_saup02')">
							<label for="chk_saup02" class="t01">사업체 기준</label>
						</li>
						<li>
							<input type="checkbox" id="chk_jongsa02" onclick="$technicalBizLeftMenu.ui.searchStandard('chk_jongsa02')">
							<label for="chk_jongsa02" class="t02">종사자 기준</label>
						</li>
					</ul>	
					<div class="slideArea10">
						<div id='slider03' class="silderStyle"></div>
						<div class="resultValue01">
							<div class="val01"></div>
							<div class="val02"></div>
						</div>
					</div>
					<div class="slideArea10">
						<div id='slider04' class="silderStyle"></div>
						<div class="resultValue01">
							<div class="val01"></div>
							<div class="val02"></div>
						</div>
					</div>
				</div>
			</div>
							    
			<a href="javascript:void(0)" onclick="javascript:$technicalBizLeftMenu.event.toggle(this)" class="noneTextBox on">지역 내 지원시설 선택</a>
				<ul class="type01 cktype">
					<li>
						<input type="checkbox" id="rd_inFac01" onclick="$technicalBizLeftMenu.ui.searchStandard('rd_inFac01')">
						<label for="rd_inFac01">창원지원센터가 있는 지역</label>
					</li>
					<li>
						<input type="checkbox" id="rd_inFac02" onclick="$technicalBizLeftMenu.ui.searchStandard('rd_inFac02')">
						<label for="rd_inFac02">산업단지가 있는 지역</label>
					</li>
				</ul>
				
		</div> 
	</div>
	<div class="btnBottom" style="margin-top:0;">
		<a href="javascript:$technicalBizLeftMenu.ui.lqStandardSearch();" class="btnAreaSearch">지역 검색</a>
	</div> 
</div>

<!-- 조건별 지역찾기 End -->