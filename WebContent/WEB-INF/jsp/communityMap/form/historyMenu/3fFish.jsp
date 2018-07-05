<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div id="history-menu-depth-3fFish" class="bk_box">
	<h3>농림어업총조사 검색조건</h3>
	<div class="bk_cont">
		<ol class="cateMenu type02" id="3fTabDiv">
			<li class="on"><a href="#" data-id="farm" data-subj="조건설정 팁" title="${tooltipList.A0202}">농가</a></li>
			<li><a href="#" data-id="forest" data-subj="조건설정 팁" title="${tooltipList.A0203}">임가</a></li>
			<li><a href="#" data-id="fish" data-subj="조건설정 팁" title="${tooltipList.A0204}">어가</a></li>
		</ol>
		<div class="cm01" id="API_0310">
			<div class="stepBox">
				<p class="on">조사년도(필수)
					<select title="농림어업 조사년도" id="3f_year" name="3f_year" style="font-size:13px;"></select>
				</p>
				<p class="on" id="3fFishTab-title">어가 구분(필수)</p>
				<ul class="dbTypeCk radioStepBox validationStepBox" id="3fFishTab-content">
					<li>
						<input type="radio" name="3f_fish_ppl" id="3f_fish_ppl_01" value="3" checked="checked"/>
						<label for="3f_fish_ppl_01" class="mr20 on">해수면어가</label>
						<input type="radio" name="3f_fish_ppl" id="3f_fish_ppl_02" value="4" />
						<label for="3f_fish_ppl_02">내수면어가</label>
					</li>
				</ul>
				<div class="txt01">필수항목 설정 시 가구기준 검색조건이
					<br />생성되며, 선택항목 추가 설정시 가구원 기준으로 검색됩니다.</div>
			</div>
		
			<div class="stepBox">
				<div class="txt01">추가선택시 가구원 기준 검색</div>
				<a href="javascript:void(0)" class="roundTextBox" id="3fGenderTab">
					<input type="checkbox" id="rt01">
					<span>가구원 성별(선택)</span>
				</a>
				<div class="joinDefault">
					<ul class="dbTypeCk radioStepBox">
						<li>
							<input type="radio" name="3f_gender" id="3f_gender01" value="1" checked="checked"/>
							<label for="3f_gender01" class="mr20 on">전체</label>
							<input type="radio" name="3f_gender" id="3f_gender02" value="2" />
							<label for="3f_gender02" class="mr20">남자</label>
							<input type="radio" name="3f_gender" id="3f_gender03" value="3" />
							<label for="3f_gender03">여자</label>
						</li>
					</ul>
				</div>
		
				<a href="javascript:void(0)" class="roundTextBox" id="3fAgeTab">
					<input type="checkbox">
					<span>해당 가구원 연령(선택)</span>
				</a>
				<div class="joinDefault">
					<div class="box_area_option02">
						<div class="mgb_12">
							<p class="houseArea">
								<select title="시작범위" id="3fAgeFrom" name="age_from"></select>
								<span>이상 ~</span>
								<select title="마지막범위" id="3fAgeTo" name="age_to"></select>
								<span id="3fAgeToText">미만</span>
							</p>
						</div>
						<div id="slider-range4" class="slider-range"></div>
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
			</div>
		</div>
	</div>
	<div class="cm_make_map_finish"><button class="Finish" type="button">즐겨찾기 생성</button></div>
</div>
