<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div id="history-menu-depth-population" class="bk_box">
	<h3>인구주택총조사 조건설정하기</h3>
	<div class="bk_cont">
		<div class="totalResult tr02">
			<ol class="cateMenu type01" id="populationTabDiv">
				<li class="on"><a href="javascript:void(0);" data-id="API_0302" data-subj="조건설정 팁" title="${tooltipList.A0101}">인구조건</a></li>
				<li><a href="javascript:void(0);" data-id="API_0305" data-subj="조건설정 팁" title="${tooltipList.A0103}">가구조건</a></li>
				<li><a href="javascript:void(0);" data-id="API_0306" data-subj="조건설정 팁" title="${tooltipList.A0114}">주택조건</a></li>
				<li><a href="javascript:void(0);" data-id="API_4011" data-subj="조건설정 팁" title="${tooltipList.A0121}">결합조건</a></li>
			</ol>
			<div class="cm01 population_tab" id="API_0302">
				<div class="stepBox">
					<p class="on">조사년도(필수)
						<select title="인구조건 조사년도" id="population_year" name="population_year" style="font-size:13px;"></select>
					</p>
					<p class="on">성별(필수)</p>
					<ul class="dbTypeCk radioStepBox validationStepBox">
						<li>
							<input type="radio" id="population_gender01" name="population_gender" value="0" checked="checked" data-show-name="남녀인구"/>
							<label for="population_gender01" class="mr20 on">전체</label>
							<input type="radio" id="population_gender02" name="population_gender" value="1" data-show-name="남자"/>
							<label for="population_gender02" class="mr20">남자</label>
							<input type="radio" id="population_gender03" name="population_gender" value="2" data-show-name="여자"/>
							<label for="population_gender03">여자</label>
						</li>
					</ul>
				</div>
				<div class="stepBox">
					<a href="javascript:void(0);" class="roundTextBox" id="populationAgeTab">
						<input type="checkbox"/>
						<span>연령(선택)</span>
					</a>
					<div class="joinDefault">
						<div class="box_area_option02">
							<div class="mgb_12">
								<p class="houseArea">
									<select title="시작범위" id="populationAgeFrom" name="age_from"></select>
									<span>이상 ~</span>
									<select title="마지막범위" id="populationAgeTo" name="age_to"></select>
									<span id="ageToText">미만</span>
								</p>
							</div>
		
							<div id="slider-range2" class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
								<div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 19.7324%; width: 8.3612%;"></div>
								<a class="ui-slider-handle ui-state-default ui-corner-all" href="javascript:void(0);" style="left: 19.7324%;"></a>
								<a class="ui-slider-handle ui-state-default ui-corner-all" href="javascript:void(0);" style="left: 28.0936%;"></a>
							</div>
							<ul class="slider_controll_bar">
								<li style="width: 28px;">0</li>
								<li>20</li>
								<li style="width: 34px;">40</li>
								<li style="margin-left:-2px;">60</li>
								<li>80</li>
								<li>100+</li>
							</ul>
						</div>
					</div>
		
					<a href="javascript:void(0);" class="roundTextBox" id="populationEduTab" style="display:none;">
						<input type="checkbox" id="rt02" />
						<span>교육정도별(선택)</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType multiCheckBox">
							<li>
								<input type="checkbox" name="edulevel_1" id="edu_level01" value="1" />
								<label for="edu_level01">수학없음</label>
								<input type="checkbox" name="edulevel_1" id="edu_level02" value="2" />
								<label for="edu_level02">초등학교</label>
							</li>
							<li>
								<input type="checkbox" name="edulevel_1" id="edu_level03" value="3" />
								<label for="edu_level03">중학교</label>
								<input type="checkbox" name="edulevel_1" id="edu_level04" value="4" />
								<label for="edu_level04">고등학교</label>
							</li>
							<li>
								<input type="checkbox" name="edulevel_1" id="edu_level05" value="5" />
								<label for="edu_level05">전문학사</label>
								<input type="checkbox" name="edulevel_1" id="edu_level06" value="6" />
								<label for="edu_level06">학사</label>
							</li>
							<li>
								<input type="checkbox" name="edulevel_1" id="edu_level07" value="7" />
								<label for="edu_level07">석사</label>
								<input type="checkbox" name="edulevel_1" id="edu_level08" value="8" />
								<label for="edu_level08">박사</label>
							</li>
						</ul>
					</div>
		
					<a href="javascript:void(0);" class="roundTextBox" id="populationMarryTab" style="display:none;">
						<input type="checkbox" id="rt03" />
						<span>혼인정도별(다중선택)</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType multiCheckBox">
							<li>
								<input type="checkbox" name="mrg_state_1" id="rd_honin01" value="1" />
								<label for="rd_honin01">미혼</label>
								<input type="checkbox" name="mrg_state_1" id="rd_honin02" value="4" />
								<label for="rd_honin02">이혼</label>
							</li>
							<li>
								<input type="checkbox" name="mrg_state_1" id="rd_honin03" value="2" />
								<label for="rd_honin03">기혼</label>
								<input type="checkbox" name="mrg_state_1" id="rd_honin04" value="3" />
								<label for="rd_honin04">사별</label>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="cm02 population_tab" id="API_0305">
				<div class="stepBox">
					<p class="on">조사년도(필수)
						<select title="가구조건 조사년도" id="household_year" name="household_year" style="font-size:13px;"></select>
					</p>
				</div>
				<div class="stepBox">
					<a href="javascript:void(0);" class="roundTextBox" id="householdTypeTab">
						<input type="checkbox" />
						<span>세대구성(다중선택)</span>
					</a>
					<div class="joinDefault">
						<ul class="multiCheckBox" style="overflow:visible;">
							<li>
								<input type="checkbox" id="rd_household01" name="household_type" value="01" />
								<label for="rd_household01">1세대 가구</label>
								<a href="javascript:void(0);" class="ar" data-subj="1세대 가구" title="${tooltipList.A0104}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_household02" name="household_type" value="02" />
								<label for="rd_household02">2세대 가구</label>
								<a href="javascript:void(0);" class="ar" data-subj="2세대 가구" title="${tooltipList.A0105}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_household03" name="household_type" value="03" />
								<label for="rd_household03">3세대 가구</label>
								<a href="javascript:void(0);" class="ar" data-subj="3세대 가구" title="${tooltipList.A0106}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_household04" name="household_type" value="04" />
								<label for="rd_household04">4세대 이상 가구</label>
								<a href="javascript:void(0);" class="ar" data-subj="4세대  이상 가구" title="${tooltipList.A0122}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li style="width:200px;height:1px;border-bottom:1px dashed #cccccc;margin-bottom:5px;">
								<input type="checkbox" id="rd_household06" name="household_type" value="A0" />
								<label for="rd_household06">1인가구</label>
								<a href="javascript:void(0);" class="ar" data-subj="1인가구" title="${tooltipList.A0107}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_household07" name="household_type" value="B0" />
								<label for="rd_household07">비혈연가구</label>
								<a href="javascript:void(0);" class="ar" data-subj="비혈연가구" title="${tooltipList.A0124}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
						</ul>
					</div>
		
					<a href="javascript:void(0);" class="roundTextBox" id="householdOcptnTab" style="display:none;">
						<input type="checkbox" />
						<span>점유형태(다중선택)</span>
					</a>
					<div class="joinDefault">
						<ul class="multiCheckBox">
							<li>
								<input type="checkbox" id="rd_occupy01" name="ocptn_type" value="1" />
								<label for="rd_occupy01">자기집</label>
								<a href="javascript:void(0);" class="ar" data-subj="자기집" title="${tooltipList.A0108}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_occupy02" name="ocptn_type" value="2" />
								<label for="rd_occupy02">전세(월세없음)</label>
								<a href="javascript:void(0);" class="ar" data-subj="전세" title="${tooltipList.A0109}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_occupy03" name="ocptn_type" value="3" />
								<label for="rd_occupy03">보증금 있는 월세</label>
								<a href="javascript:void(0);" class="ar" data-subj="보증금 있는 월세" title="${tooltipList.A0110}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_occupy04" name="ocptn_type" value="4" />
								<label for="rd_occupy04">보증금 없는 월세</label>
								<a href="javascript:void(0);" class="ar" data-subj="보증금 없는 월세" title="${tooltipList.A0111}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_occupy05" name="ocptn_type" value="5" />
								<label for="rd_occupy05">사글세</label>
								<a href="javascript:void(0);" class="ar" data-subj="사글세" title="${tooltipList.A0112}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_occupy06" name="ocptn_type" value="6" />
								<label for="rd_occupy06">무상(관사, 사택, 친척집 등)</label>
								<a href="javascript:void(0);" class="ar" data-subj="무상" title="${tooltipList.A0113}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="cm03 population_tab" id="API_0306">
				<div class="stepBox">
					<p class="on">조사년도(필수)
						<select title="주택조건 조사년도" id="house_year" name="house_year" style="font-size:13px;"></select>
					</p>
				</div>
				<div class="stepBox">
					<a href="javascript:void(0);" class="roundTextBox" id="houseTypeTab">
						<input type="checkbox" />
						<span>주택유형(다중선택)</span>
					</a>
					<div class="joinDefault">
						<ul class="multiCheckBox" style="width: 240px;font-size:11px;">
							<li>
								<input type="checkbox" id="rd_home01" name="house_type" value="01" />
								<label for="rd_home01">단독주택</label>
								<a href="javascript:void(0);" class="ar" data-subj="단독주택" title="${tooltipList.A0115}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_home02" name="house_type" value="02" />
								<label for="rd_home02">아파트</label>
								<a href="javascript:void(0);" class="ar" data-subj="아파트" title="${tooltipList.A0116}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_home03" name="house_type" value="03" />
								<label for="rd_home03">연립주택</label>
								<a href="javascript:void(0);" class="ar" data-subj="연립주택" title="${tooltipList.A0117}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_home04" name="house_type" value="04" />
								<label for="rd_home04">다세대주택</label>
								<a href="javascript:void(0);" class="ar" data-subj="다세대주택" title="${tooltipList.A0118}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_home05" name="house_type" value="05" />
								<label for="rd_home05">비주거용건물(상가,공장,여관 등)내주택</label>
								<a href="javascript:void(0);" class="ar" data-subj="비거주용건물 내 주택" title="${tooltipList.A0119}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
							<li>
								<input type="checkbox" id="rd_home06" name="house_type" value="06" />
								<label for="rd_home06">주택이외의 거처</label>
								<a href="javascript:void(0);" class="ar" data-subj="주택이외의 거처" title="${tooltipList.A0120}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
							</li>
						</ul>
					</div>
		
					<a href="javascript:void(0);" class="roundTextBox" id="houseConstYearTab" style="display:none;">
						<input type="checkbox" />
						<span>건축년도(선택)</span>
					</a>
					<div class="joinDefault" style="display:none;">
						<ul>
							<li>
								<div class="defaultLine">
									<select title="시작년도" id="houseConstYear" name="const_year">
										<option value="01">2010년</option>
										<option value="02">2009년</option>
										<option value="03">2008년</option>
										<option value="04">2007년</option>
										<option value="05">2006년</option>
										<option value="06">2005년</option>
										<option value="07">2000년~2004년</option>
										<option value="08">1995년~1999년</option>
										<option value="09">1990년~1994년</option>
										<option value="10">1980년~1989년</option>
										<option value="11">1970년~1979년</option>
										<option value="12">1960년~1969년</option>
										<option value="13">1959년 이전</option>
									</select>
								</div>
							</li>
						</ul>
					</div>
		
					<a href="javascript:void(0);" class="roundTextBox" id="houseUsePeriodTab">
						<input type="checkbox" />
						<span>노후년수(선택)</span>
					</a>
					<div class="joinDefault">
						<ul>
							<li>
								<div class="defaultLine">
									<select title="시작년도" id="houseUsePeriod" name="house_use_prid_cd">
										<option value="01">1년 미만</option>
										<option value="02">1년 ~ 2년 미만</option>
										<option value="03">2년 ~ 3년 미만</option>
										<option value="04">3년 ~ 4년 미만</option>
										<option value="05">4년 ~ 5년 미만</option>
										<option value="06">5년 ~ 10년 미만</option>
										<option value="07">10년 ~ 15년 미만</option>
										<option value="08">15년 ~ 20년 미만</option>
										<option value="09">20년 ~ 30년 미만</option>
										<option value="10">30년 ~ 40년 미만</option>
										<option value="11">40년 ~ 50년 미만</option>
										<option value="12">50년 이상</option>
									</select>
								</div>
							</li>
						</ul>
					</div>
		
					<a href="javascript:void(0);" class="roundTextBox" id="houseBdspaceTab">
						<input type="checkbox" />
						<span>연면적(선택)</span>
					</a>
					<div class="joinDefault">
						<div class="box_area_option02">
							<div class="mgb_12">
								<p class="houseArea">
									<select title="시작범위" id="houseBdspaceFrom" name="bdspace_from"></select>
									<span>초과 ~ </span>
									<select title="마지막범위" id="houseBdspaceTo" name="bdspace_to"></select>
									<span id="houseBdspaceToText">이하</span>
								</p>
								<p class="m2Area">
									<span class="houseBdspaceFrom"></span>
									<span>초과 ~</span>
									<span class="houseBdspaceTo"></span>
									<span class="houseBdspaceToText">이하</span>
								</p>
							</div>
							<div id="slider-range3" class="slider-range"></div>
							<ul class="slider_controll_bar_long">
								<li>0</li>
								<li>20</li>
								<li>40</li>
								<li>60</li>
								<li>85</li>
								<li>100</li>
								<li>130</li>
								<li>165</li>
								<li>230</li>
								<li>+</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="cm04 population_tab" id="API_4011">
				<div class="stepBox">
					<div class="roundTextBox fl">조사년도(필수)
						<select title="인구조건 조사년도" id="population_year_combine" name="population_year_combine" class="fl" style="font-size:13px;"></select>
					</div>
					<ul id="rd_combine_base" class="dbTypeCk flType01 radioStepBox validationStepBox" style="width:500px;">
						<li>
							<input type="radio" name="rd_combine_base" id="rd_combine_base01" value="population" />
							<label for="rd_combine_base01" class="mr20" style="display:none;">인구(명) 기준</label>
							<input type="radio" name="rd_combine_base" id="rd_combine_base02" value="household" />
							<label for="rd_combine_base02" class="mr20" style="display:none;">가구수(가구) 기준</label>
							<input type="radio" name="rd_combine_base" id="rd_combine_base03" value="house" />
							<label for="rd_combine_base03" style="display:none;">주택수(호) 기준</label>
						</li>
					</ul>
				</div>
				<div class="stepBox join">
					<div class="joinStepBox first" id="fusionPopulation">
						<a href="javascript:void(0);" class="roundTextBox" id="populationGenderTab_combine">
							<input type="checkbox" />
							<span>성별(선택)</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk radioStepBox validationStepBox">
								<li>
									<input type="radio" id="population_gender_combine01" name="population_gender_combine" value="0" />
									<label for="population_gender_combine01" class="mr20">전체</label>
									<input type="radio" id="population_gender_combine02" name="population_gender_combine" value="1" />
									<label for="population_gender_combine02" class="mr20">남자</label>
									<input type="radio" id="population_gender_combine03" name="population_gender_combine" value="2" />
									<label for="population_gender_combine03">여자</label>
								</li>
							</ul>
						</div>
		
						<a href="javascript:void(0);" class="roundTextBox" id="populationAgeTab_combine">
							<input type="checkbox" />
							<span>연령(선택)</span>
						</a>
						<div class="joinDefault">
							<div class="box_area_option02">
								<div class="mgb_12">
									<p class="houseArea">
										<select title="시작범위" id="populationAgeFrom_combine" name="age_from_combine" disabled="disabled"></select>
										<span>이상 ~ </span>
										<select title="마지막범위" id="populationAgeTo_combine" name="age_to_combine" disabled="disabled"></select>
										<span id="ageToText_combine">미만</span>
									</p>
								</div>
		
								<div id="slider-range2_combine" class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
									<div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 19.7324%; width: 8.3612%;"></div>
									<a class="ui-slider-handle ui-state-default ui-corner-all" href="javascript:void(0);" style="left: 19.7324%;"></a>
									<a class="ui-slider-handle ui-state-default ui-corner-all" href="javascript:void(0);" style="left: 28.0936%;"></a>
								</div>
								<ul class="slider_controll_bar">
									<li style="text-align: left;padding-left:5px;">0</li>
									<li style="text-align: left;padding-left:5px;">20</li>
									<li style="text-align: left;padding-left:5px;">40</li>
									<li style="text-align: left;padding-left:7px;">60</li>
									<li style="text-align: left;padding-left:10px;">80</li>
									<li style="text-align: left;width:29px;">100+</li>
								</ul>
							</div>
						</div>
		
						<a href="javascript:void(0);" class="roundTextBox" id="populationEduTab_combine" style="display:none;">
							<input type="checkbox" />
							<span>교육정도별(다중선택)</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType multiCheckBox">
								<li>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine01" value="1" />
									<label for="edu_level_combine01">수학없음</label>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine02" value="2" />
									<label for="edu_level_combine02">초등학교</label>
								</li>
								<li>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine03" value="3" />
									<label for="edu_level_combine03">중학교</label>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine04" value="4" />
									<label for="edu_level_combine04">고등학교</label>
								</li>
								<li>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine05" value="5" />
									<label for="edu_level_combine05">전문학사</label>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine06" value="6" />
									<label for="edu_level_combine06">학사</label>
								</li>
								<li>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine07" value="7" />
									<label for="edu_level_combine07">석사</label>
									<input type="checkbox" name="edulevel_1_combine" id="edu_level_combine08" value="8" />
									<label for="edu_level_combine08">박사</label>
								</li>
							</ul>
						</div>
		
						<a href="javascript:void(0);" class="roundTextBox" id="populationMarryTab_combine" style="display:none;">
							<input type="checkbox" />
							<span>혼인정도별(다중선택)</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType multiCheckBox">
								<li>
									<input type="checkbox" name="mrg_state_1_combine" id="rd_honin_combine01" value="1" />
									<label for="rd_honin_combine01">미혼</label>
									<input type="checkbox" name="mrg_state_1_combine" id="rd_honin_combine02" value="4" />
									<label for="rd_honin_combine02">이혼</label>
								</li>
								<li>
									<input type="checkbox" name="mrg_state_1_combine" id="rd_honin_combine03" value="2" />
									<label for="rd_honin03">기혼</label>
									<input type="checkbox" name="mrg_state_1_combine" id="rd_honin_combine04" value="3" />
									<label for="rd_honin04">사별</label>
								</li>
							</ul>
						</div>
					</div>
		
					<div class="joinStepBox" id="fusionHousehold">
						<a href="javascript:void(0);" class="roundTextBox" id="householdTypeTab_combine">
							<input type="checkbox" />
							<span>세대구성(다중선택)</span>
						</a>
						<div class="joinDefault">
							<ul class="multiCheckBox">
								<li>
									<input type="checkbox" id="rd_household_combine01" name="household_type_combine" value="01" />
									<label for="rd_household_combine01">1세대 가구</label>
									<a href="javascript:void(0);" class="ar" data-subj="1세대 가구" title="${tooltipList.A0104}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_household_combine02" name="household_type_combine" value="02" />
									<label for="rd_household_combine02">2세대 가구</label>
									<a href="javascript:void(0);" class="ar" data-subj="2세대 가구" title="${tooltipList.A0105}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_household_combine03" name="household_type_combine" value="03" />
									<label for="rd_household_combine03">3세대 가구</label>
									<a href="javascript:void(0);" class="ar" data-subj="3세대 가구" title="${tooltipList.A0106}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li style="width:200px;height:1px;border-bottom:1px dashed #cccccc;margin-bottom:5px;">
									<input type="checkbox" id="rd_household_combine04" name="household_type_combine" value="04" />
									<label for="rd_household_combine04">4세대  이상 가구</label>
									<a href="javascript:void(0);" class="ar" data-subj="4세대 이상 가구" title="${tooltipList.A0122}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_household_combine06" name="household_type_combine" value="A0" />
									<label for="rd_household_combine06">1인가구</label>
									<a href="javascript:void(0);" class="ar" data-subj="1인가구" title="${tooltipList.A0107}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_household_combine07" name="household_type_combine" value="B0" />
									<label for="rd_household_combine07">비혈연가구</label>
									<a href="javascript:void(0);" class="ar" data-subj="비혈연가구" title="${tooltipList.A0124}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
							</ul>
						</div>
		
						<a href="javascript:void(0);" class="roundTextBox" id="householdOcptnTab_combine" style="display:none;">
							<input type="checkbox" />
							<span>점유형태(다중선택)</span>
						</a>
						<div class="joinDefault">
							<ul class="multiCheckBox">
								<li>
									<input type="checkbox" id="rd_occupy_combine01" name="ocptn_type_combine" value="1" />
									<label for="rd_occupy_combine01">자기집</label>
									<a href="javascript:void(0);" class="ar" data-subj="자기집" title="${tooltipList.A0108}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_occupy_combine02" name="ocptn_type_combine" value="2" />
									<label for="rd_occupy_combine02">전세(월세없음)</label>
									<a href="javascript:void(0);" class="ar" data-subj="전세" title="${tooltipList.A0109}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_occupy_combine03" name="ocptn_type_combine" value="3" />
									<label for="rd_occupy_combine03">보증금 있는 월세</label>
									<a href="javascript:void(0);" class="ar" data-subj="보증금 있는 월세" title="${tooltipList.A0110}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_occupy_combine04" name="ocptn_type_combine" value="4" />
									<label for="rd_occupy_combine04">보증금 없는 월세</label>
									<a href="javascript:void(0);" class="ar" data-subj="보증금 없는 월세" title="${tooltipList.A0111}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_occupy_combine05" name="ocptn_type_combine" value="5" />
									<label for="rd_occupy_combine05">사글세</label>
									<a href="javascript:void(0);" class="ar" data-subj="사글세" title="${tooltipList.A0112}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_occupy_combine06" name="ocptn_type_combine" value="6" />
									<label for="rd_occupy_combine06">무상(관사, 사택, 친척집 등)</label>
									<a href="javascript:void(0);" class="ar" data-subj="무상" title="${tooltipList.A0113}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
							</ul>
						</div>
					</div>
		
					<div class="joinStepBox" id="fusionHouse" style="width: 264px;">
						<a href="javascript:void(0);" class="roundTextBox" id="houseTypeTab_combine">
							<input type="checkbox" />
							<span>주택유형(다중선택)</span>
						</a>
						<div class="joinDefault">
							<ul class="multiCheckBox" style="width: 235px;font-size:11px;">
								<li>
									<input type="checkbox" id="rd_home_combine01" name="house_type_combine" value="01" />
									<label for="rd_home_combine01">단독주택</label>
									<a href="javascript:void(0);" class="ar" data-subj="단독주택" title="${tooltipList.A0115}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_home_combine02" name="house_type_combine" value="02" />
									<label for="rd_home_combine02">아파트</label>
									<a href="javascript:void(0);" class="ar" data-subj="아파트" title="${tooltipList.A0116}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_home_combine03" name="house_type_combine" value="03" />
									<label for="rd_home_combine03">연립주택</label>
									<a href="javascript:void(0);" class="ar" data-subj="연립주택" title="${tooltipList.A0117}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_home_combine04" name="house_type_combine" value="04" />
									<label for="rd_home_combine04">다세대주택</label>
									<a href="javascript:void(0);" class="ar" data-subj="다세대주택" title="${tooltipList.A0118}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_home_combine05" name="house_type_combine" value="05" />
									<label for="rd_home_combine05">비주거용건물(상가,공장,여관 등)내주택</label>
									<a href="javascript:void(0);" class="ar" data-subj="비거주용건물" title="${tooltipList.A0119}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
								<li>
									<input type="checkbox" id="rd_home_combine06" name="house_type_combine" value="06" />
									<label for="rd_home_combine06">주택이외의 거처</label>
									<a href="javascript:void(0);" class="ar" data-subj="주택이외의 거처" title="${tooltipList.A0120}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
								</li>
							</ul>
						</div>
		
						<a href="javascript:void(0);" class="roundTextBox" id="houseConstYearTab_combine" style="display:none;">
							<input type="checkbox" />
							<span>건축년도(선택)</span>
						</a>
						<div class="joinDefault" style="display:none;">
							<div class="box_area_option02">
								<ul>
									<li>
										<select title="시작년도" id="houseConstYear_combine" name="const_year_combine">
											<option value="01">2010년</option>
											<option value="02">2009년</option>
											<option value="03">2008년</option>
											<option value="04">2007년</option>
											<option value="05">2006년</option>
											<option value="06">2005년</option>
											<option value="07">2000년~2004년</option>
											<option value="08">1995년~1999년</option>
											<option value="09">1990년~1994년</option>
											<option value="10">1980년~1989년</option>
											<option value="11">1970년~1979년</option>
											<option value="12">1960년~1969년</option>
											<option value="13">1959년 이전</option>
										</select>
									</li>
								</ul>
							</div>
						</div>
		
						<a href="javascript:void(0);" class="roundTextBox" id="houseUsePeriodTab_combine">
							<input type="checkbox" />
							<span>노후년수(선택)</span>
						</a>
						<div class="joinDefault">
							<ul>
								<li>
									<div class="defaultLine">
										<select title="시작년도" id="houseUsePeriod_combine" name="house_use_prid_cd_combine">
											<option value="01">1년 미만</option>
											<option value="02">1년 ~ 2년 미만</option>
											<option value="03">2년 ~ 3년 미만</option>
											<option value="04">3년 ~ 4년 미만</option>
											<option value="05">4년 ~ 5년 미만</option>
											<option value="06">5년 ~ 10년 미만</option>
											<option value="07">10년 ~ 15년 미만</option>
											<option value="08">15년 ~ 20년 미만</option>
											<option value="09">20년 ~ 30년 미만</option>
											<option value="10">30년 ~ 40년 미만</option>
											<option value="11">40년 ~ 50년 미만</option>
											<option value="12">50년 이상</option>
										</select>
									</div>
								</li>
							</ul>
						</div>
		
						<a href="javascript:void(0);" class="roundTextBox" id="houseBdspaceTab_combine">
							<input type="checkbox" />
							<span>연면적(선택)</span>
						</a>
						<div class="joinDefault">
							<div class="box_area_option02">
								<div class="mgb_12">
									<p class="houseArea">
										<select title="시작범위" id="houseBdspaceFrom_combine" name="bdspace_from_combine" disabled="disabled"></select>
										<span>초과 ~</span>
										<select title="마지막범위" id="houseBdspaceTo_combine" name="bdspace_to_combine" disabled="disabled"></select>
										<span id="houseBdspaceToText_combine">이하</span>
									</p>
									<p class="m2Area">
										<span class="houseBdspaceFrom_combine">약 18.2평</span>
										<span>초과 ~</span>
										<span class="houseBdspaceTo_combine">약 25.8평</span>
										<span class="houseBdspaceToText_combine">이하</span>
									</p>
								</div>
								<div id="slider-range3_combine" class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
									<div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 19.7324%; width: 8.3612%;"></div>
									<a class="ui-slider-handle ui-state-default ui-corner-all" href="javascript:void(0);" style="left: 19.7324%;"></a>
									<a class="ui-slider-handle ui-state-default ui-corner-all" href="javascript:void(0);" style="left: 28.0936%;"></a>
								</div>
								<ul class="slider_controll_bar">
									<li style="width: 22px;">0</li>
									<li style="width: 22px;">20</li>
									<li style="width: 22px;">40</li>
									<li style="width: 22px;">60</li>
									<li style="width: 22px;">85</li>
									<li style="width: 22px;">100</li>
									<li style="width: 22px;">130</li>
									<li style="width: 22px;">165</li>
									<li style="width: 28px;">230+</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="cm_make_map_finish"><button class="Finish" type="button">즐겨찾기 생성</button></div>
</div>
