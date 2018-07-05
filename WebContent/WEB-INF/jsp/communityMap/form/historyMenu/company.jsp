<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div id="history-menu-depth-company" class="bk_box">
	<h3>전국사업체조사 검색조건</h3>
	<div class="bk_cont" style="padding-left:10px;">
		<ol class="cateMenu" id="companyTabDiv">
			<li class="on"><a href="#" data-id="industry" data-subj="조건설정 팁" title="${tooltipList.A0302}">산업분류</a></li>
			<li><a href="#" data-id="theme" data-subj="조건설정 팁" title="${tooltipList.A0303}">테마업종</a></li>
		</ol>
		<div class="cm01 company_tab" id="API_0304-b">
			<div class="stepBox">
				<p class="on">조사년도(필수)
					<select title="사업체 조사년도" id="company_year" name="company_year" style="font-size:13px;"></select>
				</p>
				<p class="on">대상 선택하기(필수)</p>
				<ul class="radioStepBox validationStepBox" style="padding-left: 10px;">
					<li>
						<input type="radio" id="cDataType01" name="cDataType" value="corp_cnt" checked="checked" data-show-name="사업체수" data-unit="개"/>
						<label for="cDataType01" class="mr20 on">사업체수</label>
						<input type="radio" id="cDataType02" name="cDataType" value="tot_worker" data-show-name="종사자수" data-unit="명"/>
						<label for="cDataType02">종사자수</label>
					</li>
				</ul>
			</div>
		</div>
		<div class="cm02 company_tab" id="API_0304-a">
			<div class="stepBox">
				<p class="on">대상 선택하기(필수)</p>
				<ul class="radioStepBox validationStepBox">
					<li>
						<input type="radio" id="cDataType1_01" name="cDataType1" value="corp_cnt" checked="checked" data-show-name="사업체수" data-unit="개"/>
						<label for="cDataType1_01" class="mr20 on">사업체수</label>
						<input type="radio" id="cDataType1_02" name="cDataType1" value="tot_worker" data-show-name="종사자수" data-unit="명"/>
						<label for="cDataType1_02" class="mr20">종사자수</label>
					</li>
				</ul>
				<p class="on">테마유형 사업체(필수)</p>
				<div id="themeCodeList">
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>생활서비스</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_1001" value="1001" />
								<label for="theme_codes_1001">인테리어</label>
								<input type="radio" name="theme_codes" id="theme_codes_1002" value="1002" />
								<label for="theme_codes_1002">목욕탕</label>
								<input type="radio" name="theme_codes" id="theme_codes_1003" value="1003" />
								<label for="theme_codes_1003">교습학원</label>
								<input type="radio" name="theme_codes" id="theme_codes_1004" value="1004" />
								<label for="theme_codes_1004">어학원</label>
								<input type="radio" name="theme_codes" id="theme_codes_1005" value="1005" />
								<label for="theme_codes_1005">예체능학원</label>
								<input type="radio" name="theme_codes" id="theme_codes_1006" value="1006" />
								<label for="theme_codes_1006">부동산중개업</label>
								<input type="radio" name="theme_codes" id="theme_codes_1007" value="1007" />
								<label for="theme_codes_1007">이발소</label>
								<input type="radio" name="theme_codes" id="theme_codes_1008" value="1008" />
								<label for="theme_codes_1008">미용실</label>
								<input type="radio" name="theme_codes" id="theme_codes_1009" value="1009" />
								<label for="theme_codes_1009">세탁소</label>
								<input type="radio" name="theme_codes" id="theme_codes_1010" value="1010" />
								<label for="theme_codes_1010">PC방</label>
								<input type="radio" name="theme_codes" id="theme_codes_1011" value="1011" />
								<label for="theme_codes_1011">노래방</label>
							</li>
						</ul>
					</div>
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>도소매</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_2001" value="2001" />
								<label for="theme_codes_2001">문구점</label>
								<input type="radio" name="theme_codes" id="theme_codes_2002" value="2002" />
								<label for="theme_codes_2002">서점</label>
								<input type="radio" name="theme_codes" id="theme_codes_2003" value="2003" />
								<label for="theme_codes_2003">편의점</label>
								<input type="radio" name="theme_codes" id="theme_codes_2004" value="2004" />
								<label for="theme_codes_2004">식료품점</label>
								<input type="radio" name="theme_codes" id="theme_codes_2005" value="2005" />
								<label for="theme_codes_2005">휴대폰점</label>
								<input type="radio" name="theme_codes" id="theme_codes_2006" value="2006" />
								<label for="theme_codes_2006">의류</label>
								<input type="radio" name="theme_codes" id="theme_codes_2007" value="2007" />
								<label for="theme_codes_2007">화장품/방향제</label>
								<input type="radio" name="theme_codes" id="theme_codes_2008" value="2008" />
								<label for="theme_codes_2008">철물점</label>
								<input type="radio" name="theme_codes" id="theme_codes_2009" value="2009" />
								<label for="theme_codes_2009">주유소</label>
								<input type="radio" name="theme_codes" id="theme_codes_2010" value="2010" />
								<label for="theme_codes_2010">꽃집</label>
								<input type="radio" name="theme_codes" id="theme_codes_2011" value="2011" />
								<label for="theme_codes_2011">슈퍼마켓</label>
							</li>
						</ul>
					</div>
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>숙박</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_4001" value="4001" />
								<label for="theme_codes_4001">호텔</label>
								<input type="radio" name="theme_codes" id="theme_codes_4002" value="4002" />
								<label for="theme_codes_4002">여관(모텔포함)및 여인숙</label>
							</li>
						</ul>
					</div>
					<a id="food" href="javascript:void(0)" class="subRoundTextBox">
						<span>음식점</span>
					</a>
					<div id="foodInfo" class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_5001" value="5001" />
								<label for="theme_codes_5001">한식</label>
								<input type="radio" name="theme_codes" id="theme_codes_5002" value="5002" />
								<label for="theme_codes_5002">중식</label>
								<input type="radio" name="theme_codes" id="theme_codes_5003" value="5003" />
								<label for="theme_codes_5003">일식</label>
								<input type="radio" name="theme_codes" id="theme_codes_5004" value="5004" />
								<label for="theme_codes_5004">분식</label>
								<input type="radio" name="theme_codes" id="theme_codes_5005" value="5005" />
								<label for="theme_codes_5005">서양식</label>
								<input type="radio" name="theme_codes" id="theme_codes_5006" value="5006" />
								<label for="theme_codes_5006">제과점</label>
								<input type="radio" name="theme_codes" id="theme_codes_5007" value="5007" />
								<label for="theme_codes_5007">패스트푸드</label>
								<input type="radio" name="theme_codes" id="theme_codes_5008" value="5008" />
								<label for="theme_codes_5008">치킨</label>
								<input type="radio" name="theme_codes" id="theme_codes_5009" value="5009" />
								<label for="theme_codes_5009">호프 및 간이주점</label>
								<input type="radio" name="theme_codes" id="theme_codes_5010" value="5010" />
								<label for="theme_codes_5010">카페</label>
								<input type="radio" name="theme_codes" id="theme_codes_5011" value="5011" />
								<label for="theme_codes_5011">기타 외국식</label>
							</li>
						</ul>
					</div>
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>교통</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_3001" value="3001" />
								<label for="theme_codes_3001">지하철역</label>
								<input type="radio" name="theme_codes" id="theme_codes_3002" value="3002" />
								<label for="theme_codes_3002">터미널</label>
							</li>
						</ul>
					</div>
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>공공</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_6001" value="6001" />
								<label for="theme_codes_6001">우체국</label>
								<input type="radio" name="theme_codes" id="theme_codes_6002" value="6002" />
								<label for="theme_codes_6002">행정기관</label>
								<input type="radio" name="theme_codes" id="theme_codes_6003" value="6003" />
								<label for="theme_codes_6003">경찰/지구대</label>
								<input type="radio" name="theme_codes" id="theme_codes_6004" value="6004" />
								<label for="theme_codes_6004">소방서</label>
							</li>
						</ul>
					</div>
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>교육</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_7001" value="7001" />
								<label for="theme_codes_7001">초등학교</label>
								<input type="radio" name="theme_codes" id="theme_codes_7002" value="7002" />
								<label for="theme_codes_7002">중학교</label>
								<input type="radio" name="theme_codes" id="theme_codes_7003" value="7003" />
								<label for="theme_codes_7003">고등학교</label>
								<input type="radio" name="theme_codes" id="theme_codes_7004" value="7004" />
								<label for="theme_codes_7004">전문대학</label>
								<input type="radio" name="theme_codes" id="theme_codes_7005" value="7005" />
								<label for="theme_codes_7005">대학교</label>
								<input type="radio" name="theme_codes" id="theme_codes_7006" value="7006" />
								<label for="theme_codes_7006">대학원</label>
								<input type="radio" name="theme_codes" id="theme_codes_7007" value="7007" />
								<label for="theme_codes_7007">어린이보육업</label>
							</li>
						</ul>
					</div>
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>기업</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_8001" value="8001" />
								<label for="theme_codes_8001">제조/화학</label>
								<input type="radio" name="theme_codes" id="theme_codes_8002" value="8002" />
								<label for="theme_codes_8002">서비스</label>
								<input type="radio" name="theme_codes" id="theme_codes_8003" value="8003" />
								<label for="theme_codes_8003">통신/IT</label>
								<input type="radio" name="theme_codes" id="theme_codes_8004" value="8004" />
								<label for="theme_codes_8004">건설</label>
								<input type="radio" name="theme_codes" id="theme_codes_8005" value="8005" />
								<label for="theme_codes_8005">판매/유통</label>
								<input type="radio" name="theme_codes" id="theme_codes_8006" value="8006" />
								<label for="theme_codes_8006">기타금융업</label>
								<input type="radio" name="theme_codes" id="theme_codes_8007" value="8007" />
								<label for="theme_codes_8007">기타의료업</label>
								<input type="radio" name="theme_codes" id="theme_codes_8008" value="8008" />
								<label for="theme_codes_8008">문화/체육</label>
							</li>
						</ul>
					</div>
					<a href="javascript:void(0)" class="subRoundTextBox">
						<span>편의/문화</span>
					</a>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType subRadioStepBox">
							<li>
								<input type="radio" name="theme_codes" id="theme_codes_9001" value="9001" />
								<label for="theme_codes_9001">백화점/중대형마트</label>
								<input type="radio" name="theme_codes" id="theme_codes_9002" value="9002" />
								<label for="theme_codes_9002">은행</label>
								<input type="radio" name="theme_codes" id="theme_codes_9003" value="9003" />
								<label for="theme_codes_9003">병원</label>
								<input type="radio" name="theme_codes" id="theme_codes_9004" value="9004" />
								<label for="theme_codes_9004">극장/영화관</label>
								<input type="radio" name="theme_codes" id="theme_codes_9005" value="9005" />
								<label for="theme_codes_9005">도서관/박물관</label>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="cm_make_map_finish"><button class="Finish" type="button">즐겨찾기 생성</button></div>
</div>

<div id="history-menu-depth-companytree" class="bk_box">
	<h3>산업분류목록 선택하기</h3>
	<div class="bk_cont" style="height:503px;">
		<div class="stepBox" style="margin-top:4px;">
			<ul>
				<li>
					<input type="text" class="inp" id="companySearchText" placeholder="통계항목 검색" />
					<a href="#" id="companySearchButton" class="btn_stepSearch">검색</a>
				</li>
			</ul>
		</div>
		<div class="stepTreeBox" id="company_TreeBox">
		</div>
		<div class="stepBox xWidth" id="company_SearchBox" style="display: none;">
			<p class="result">검색결과 : <span id="companySearchCount"></span>개</p>
			<ul class="xWidth radioStepOneBox2" id="companySearchDataList">
			</ul>
			<div id="companyTablePage"></div>
			<br/>
			<div style="text-align: center;">
				<a href="#" class="btnStyle01" onclick="$('#company_TreeBox').show();$('#company_SearchBox').hide();return false;" style="height: 30px;">산업분류 목록으로</a>
			</div>
		</div>
	</div>
</div>
