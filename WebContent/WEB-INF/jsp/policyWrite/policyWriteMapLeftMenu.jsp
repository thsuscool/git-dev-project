<%
/**************************************************************************************************************************
* Program Name  : 정책통계지도 등록 Left메뉴 JSP  
* File Name     : policyWriteMapLeftMenu.jsp
* Comment       : 
* History       : 네이버시스템 권차욱 2017-08-13
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="java.util.ArrayList" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

				<div class="shadow"></div>
				<!-- 1Depth Start -->
					<div class="quickBox step01" id="quickBox-01">
						<div class="subj">
							<span>데이터 불러오기</span>
							<a class="stepClose">닫기</a>
						</div> 
						<div class="scrollBox" id="depth1Menu">
						
							<!-- 센서스 통계 목록  -->
							<dl class="qmdl pt0"> 
								<dt><a href="javascript:$('#qmdlList01').slideToggle();void(0);">센서스 통계 목록</a></dt>
								<dd id="qmdlList01">
									<ul class="techType01">
										<li id="mainIndexBtn" onclick="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('mainIndex');"><span><a data-subj="총조사주요지표" title="${paramInfo.tooltipList.A0001}">총조사 주요지표</a></span></li>
										<li onclick="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('populationHouse');"><span><a data-subj="인구주택총조사" title="${paramInfo.tooltipList.A0102}">인구주택총조사</a></span></li>
										<li onclick="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('3f');"><span><a data-subj="농림어업총조사" title="${paramInfo.tooltipList.A0201}">농림어업총조사</a></span></li>
										<li id="companyBtn" onclick="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('company');"><span><a data-subj="전국사업체조사" title="${paramInfo.tooltipList.A0301}">전국사업체조사</a></span></li>
									</ul>
								</dd>
							</dl> 
							
							<!-- 기타 통계 목록 -->
							<dl class="qmdl pt0" id="etcMenuItem"> 
								<dt><a href="javascript:$('#qmdlList02').slideToggle();void(0);">기타 통계 목록</a></dt>
								<dd id="qmdlList02">
									<ul class="techType01">
										<li id="kosisData" onclick="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('kosis');"><span><a data-subj="KOSIS(지역통계)" title="${paramInfo.tooltipList.A0401}">KOSIS(지역통계)</a></span></li>
										<li id="collaboData" onclick="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('local');"><span><a data-subj="협업형 데이터" title="${paramInfo.tooltipList.A0601}">협업형 데이터</a></span></li>  
									</ul>
								</dd>
							</dl>
							
							<!-- 사용자 통계 목록 -->
							<dl class="qmdl pt0"> 
								<dt><a href="javascript:$('#qmdlList03').slideToggle();void(0);">사용자 통계 목록</a></dt>
								<dd id="qmdlList03">
									<ul class="techType01">
										<li id="userData" onclick="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('userData');"><span><a data-subj="나의 데이터" title="${paramInfo.tooltipList.A0601}">나의 데이터</a></span></li>  
									</ul>
								</dd>
							</dl> 
							
						</div> 

						<div class="btnBottom">
	                        <span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
	                        <div class="serviceLayer" id="bottomServiceLayer">
								<ol>
									<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');" title="새창으로 열림">통계청 홈페이지</a></li>
									<li><a href="javascript:goExternalUrlLink('//kosis.kr');" title="새창으로 열림">국가통계포털</a></li>
									<li><a href="javascript:goExternalUrlLink('//mdis.kostat.go.kr');" title="새창으로 열림">마이크로데이터</a></li>
									<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');" title="새창으로 열림">e-나라지표</a></li>
									<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');" title="새창으로 열림">통계설명자료</a></li>
									<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');" title="새창으로 열림">통계분류</a></li>
								</ol>
							</div>
	                        <div class="btnService" id="bottomService">통계청 주요서비스</div>
	                    </div>
						
					</div><!-- 대화형통계지도 메뉴 보기 end -->
					
					<!-- 2Depth start -->
					<div class="quickBox step02" id="quickBox_2depth">
						<div class="subj">
							<span id="submenuTitle">주요지표 선택</span>
							<a href="javascript:void(0)" class="stepClose">닫기</a>
						</div>
						<div class="scrollBox">
							<div id="API_0301" class="totalResult tr01"><!-- 주요지표 목록보기 -->
								<div class="stepBox mainIndex_stepBox"> 
								    <p class="on">주요지표
								    	<select title="주요지표 조사년도" id="mainIndex_year" name="mainIndex_year" style="font-size:13px;">
								     	</select>
								    </p>
								   	<ul class="dbTypeCk">
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio01" value="tot_ppltn" checked="checked"/>
								            <label for="mainIndex_radio01" class="on">총인구(명)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0002}"><img src="/img/ico/ico_tooltip01.png" alt="물음표" /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio02" value="avg_age" />
								            <label for="mainIndex_radio02">평균나이(세)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0003}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio03" value="ppltn_dnsty" />
								            <label for="mainIndex_radio03">인구밀도(명/㎢)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0004}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio04" value="aged_child_idx" />
								            <label for="mainIndex_radio04">노령화지수</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0005}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio05" value="oldage_suprt_per" />
								            <label for="mainIndex_radio05">노년부양비</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0006}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio06" value="juv_suprt_per" />
								            <label for="mainIndex_radio06">유년부양비</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0007}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio07" value="tot_family" />
								            <label for="mainIndex_radio07">가구(가구)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0008}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio08" value="avg_fmember_cnt" />
								            <label for="mainIndex_radio08">평균 가구원(명)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0009}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio09" value="tot_house" />
								            <label for="mainIndex_radio09">주택(호)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0010}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
									</ul>
								</div>
								<div class="stepBox mainIndex_stepBox" id="mainIndex_box2" style="display:none;"> <!-- 2016.08.23 권차욱 9월서비스  -->
							  		<ul class="dbTypeCk mt10">
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio10" value="nongga_cnt" />
								            <label for="mainIndex_radio10">농가(가구)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0011}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio11" value="nongga_ppltn" />
								            <label for="mainIndex_radio11">농가인구_계(명)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0012}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li id="totalIdx_imga"> <!-- 2018.01.09 [개발팀] -->
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio12" value="imga_cnt" />
								            <label for="mainIndex_radio12">임가(가구)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0013}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li id="totalIdx_imgaPpltn"> <!-- 2018.01.09 [개발팀] -->
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio13" value="imga_ppltn" />
								            <label for="mainIndex_radio13">임가인구_계(명)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0014}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio14" value="naesuoga_cnt" />
								            <label for="mainIndex_radio14">내수면총어가(가구)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0015}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio15" value="naesuoga_ppltn" />
								            <label for="mainIndex_radio15">내수면어가인구(명)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0016}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio16" value="haesuoga_cnt" />
								            <label for="mainIndex_radio16">해수면총어가(가구)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0017}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio17" value="haesuoga_ppltn" />
								            <label for="mainIndex_radio17">해수면어가인구(명)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0018}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li>
								 	</ul>
								</div>
								<div class="stepBox mainIndex_stepBox"> 
								    <p class="on">사업체 주요지표
								    	<select title="주요지표 조사년도" id="mainIndex_corp_year" name="mainIndex_corp_year" style="font-size:13px;">
								     	</select>
								    </p>
								    <ul class="dbTypeCk mt10">
								        <li>
								            <input type="radio" name="mainIndex_radio" id="mainIndex_radio18" value="corp_cnt" />
								            <label for="mainIndex_radio18">사업체수(개)</label>
								            <a href="javascript:void(0)" class="ar" data-subj="주요지표" title="${paramInfo.tooltipList.A0019}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
								        </li> 
								    </ul> 
								</div>
							</div>
							
							<div class="totalResult tr02"><!-- 인구주택총조사 통계 -->
								<ol class="cateMenu type01" id="populationTabDiv">
	                                <li class="on"><a href="javascript:$policyWriteMapLeftMenu.ui.populationTab('population');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0101}">인구조건</a></li>
	                                <li><a href="javascript:$policyWriteMapLeftMenu.ui.populationTab('household');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0103}">가구조건</a></li>
	                                <li><a href="javascript:$policyWriteMapLeftMenu.ui.populationTab('house');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0114}">주택조건</a></li>
	                                <li><a href="javascript:$policyWriteMapLeftMenu.ui.populationTab('combine');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0121}">결합조건</a></li>
	                            </ol>
	                            
	                            <!-- 인구 조건 Start -->
	                            <div class="cm01 population_tab" id="API_0302">
	                            	<div class="stepBox">
									    <p class="on">조사년도(필수)
											<select title="인구조건 조사년도" id="population_year" name="population_year" style="font-size:13px;">
									        </select> 
										</p>
										<p class="on">성별(필수)</p>
									    <ul class="dbTypeCk radioStepBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
									        <li>
									        	<input type="radio" id="population_gender01" name="population_gender"  value="0" checked=checked/>
									            <label for="population_gender01" class="mr20 on">전체</label>
									            <input type="radio" id="population_gender02" name="population_gender" value="1" />
									            <label for="population_gender02" class="mr20">남자</label>
									            <input type="radio" id="population_gender03" name="population_gender" value="2" />
									            <label for="population_gender03">여자</label>
									        </li> 
									    </ul>
									</div>
									<div class="stepBox"> 
										<a href="javascript:void(0)" class="roundTextBox" id="populationAgeTab">
									    	<input type="checkbox" title="연령(선택)" />
											<span>연령(선택)</span>
									    </a>
									    
									    <div class="joinDefault" style="width:260px;">
									    	<div class="box_area_option02">
									    		<!-- 9월서비스 권차욱 수정 -->
				                                <div class="mgb_12">
				                                    <p class="houseArea">
				                                        <select title="시작범위" id="populationAgeFrom" name="age_from"></select>
				                                        <span>이상 ~</span>
				                                        <select title="마지막범위" id="populationAgeTo" name="age_to"></select>
				                                        <span id="ageToText">미만</span>
				                                    </p> 
				                                </div> 
				                                
				                                <div id="slider-range2" class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false"><div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 19.7324%; width: 8.3612%;"></div><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 19.7324%;"></a><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 28.0936%;"></a></div>
				                                <ul class="slider_controll_bar">
				                                	<!-- 2016.09.08 9월 서비스 -->
				                                    <li style="margin-left:-7px;">0</li>
				                                    <li style="margin-left:4px;">20</li>
				                                    <li style="margin-left:-5px;">40</li>
				                                    <li style="margin-left:-2px;">60</li>
				                                    <li style="margin-left:-7px;">80</li>
				                                    <li style="margin-left:-5px;">100+</li>
				                                </ul>
				                            </div>
									    </div>
										    
									    <a href="javascript:void(0)" class="roundTextBox" id="populationEduTab" style="display:none;"> <!-- 2016.08.23 권차욱 9월서비스 -->
									    	<input type="checkbox" id="rt02" title="교육정도별(다중선택)" />
									    	<span>교육정도별(다중선택)</span>
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
									    
									    <a href="javascript:void(0)" class="roundTextBox" id="populationMarryTab" style="display:none;"> <!-- 2016.08.23 권차욱 9월서비스 -->
									    	<input type="checkbox" id="rt03" title="혼인정도별(다중선택)" />
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
	                            <!-- 인구 조건 End -->
	                            
	                            <!-- 가구 조건 Start -->
	                            <div class="cm02 population_tab"  id="API_0305">
	                            	<div class="stepBox">
	                            		<p class="on">조사년도(필수)
											<select title="가구조건 조사년도" id="household_year" name="household_year" style="font-size:13px;">
									        </select>
										</p>   
									</div>
									<div class="stepBox">
										<a href="javascript:void(0)" class="roundTextBox" id="householdTypeTab">
											<input type="checkbox" title="세대구성(다중선택)" />
											<span>세대구성(다중선택)</span>
										</a>
									    <div class="joinDefault">
									    	<ul class="multiCheckBox" style="overflow:visible;"> <!-- 2016.08.23 권차욱 9월 서비스  -->
										        <li>
										            <input type="checkbox" id="rd_household01" name="household_type" value="01" />
										            <label for="rd_household01">1세대 가구</label>
										            <a href="javascript:void(0)" class="ar" data-subj="1세대 가구" title="${paramInfo.tooltipList.A0104}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_household02" name="household_type" value="02" />
										            <label for="rd_household02">2세대 가구</label>
										            <a href="javascript:void(0)" class="ar" data-subj="2세대 가구" title="${paramInfo.tooltipList.A0105}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_household03" name="household_type" value="03" />
										            <label for="rd_household03">3세대 가구</label>
										            <a href="javascript:void(0)" class="ar" data-subj="3세대 가구" title="${paramInfo.tooltipList.A0106}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_household04" name="household_type" value="04" />
										            <label for="rd_household04">4세대 이상 가구</label> <!-- 2016.08.23 권차욱 9월 서비스 - 4세대->4세대 이상 가구 -->
										            <a href="javascript:void(0)" class="ar" data-subj="4세대  이상 가구" title="${paramInfo.tooltipList.A0122}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <!--2016.08.23 권차욱 9월 서비스 - 라인추가 -->
										        <div style="width:260px;height:1px;border-bottom:1px dashed #cccccc;margin-bottom:5px;"></div>
										        <li>
										            <input type="checkbox" id="rd_household06" name="household_type" value="A0" />
										            <label for="rd_household06">1인가구</label>
										            <a href="javascript:void(0)" class="ar" data-subj="1인가구" title="${paramInfo.tooltipList.A0107}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_household07" name="household_type" value="B0" />
										            <label for="rd_household07">비혈연가구</label>
										            <a href="javascript:void(0)" class="ar" data-subj="비혈연가구" title="${paramInfo.tooltipList.A0124}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										    </ul>
									    </div> 
									    
									    <a href="javascript:void(0)" class="roundTextBox" id="householdOcptnTab" style="display:none;"> <!-- 2016.08.23 권차욱 9월 서비스 -->
									    	<input type="checkbox" title="점유형태(다중선택)" />
											<span>점유형태(다중선택)</span>
									    </a>
									    <div class="joinDefault">
									    	<ul class="multiCheckBox">
										        <li>
										            <input type="checkbox" id="rd_occupy01" name="ocptn_type" value="1" />
										            <label for="rd_occupy01">자기집</label>
										            <a href="javascript:void(0)" class="ar" data-subj="자기집" title="${paramInfo.tooltipList.A0108}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_occupy02" name="ocptn_type" value="2" />
										            <label for="rd_occupy02">전세(월세없음)</label>
										            <a href="javascript:void(0)" class="ar" data-subj="전세" title="${paramInfo.tooltipList.A0109}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_occupy03" name="ocptn_type" value="3" />
										            <label for="rd_occupy03">보증금 있는 월세</label>
										            <a href="javascript:void(0)" class="ar" data-subj="보증금 있는 월세" title="${paramInfo.tooltipList.A0110}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_occupy04" name="ocptn_type" value="4" />
										            <label for="rd_occupy04">보증금 없는 월세</label>
										            <a href="javascript:void(0)" class="ar" data-subj="보증금 없는 월세" title="${paramInfo.tooltipList.A0111}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_occupy05" name="ocptn_type" value="5" />
										            <label for="rd_occupy05">사글세</label>
										            <a href="javascript:void(0)" class="ar" data-subj="사글세" title="${paramInfo.tooltipList.A0112}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_occupy06" name="ocptn_type" value="6" />
										            <label for="rd_occupy06">무상(관사, 사택, 친척집 등)</label>
										            <a href="javascript:void(0)" class="ar" data-subj="무상" title="${paramInfo.tooltipList.A0113}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										    </ul>
									    </div> 
									</div>
	                            </div>
	                            <!-- 가구 조건 End -->
	                            
	                            <!-- 주택 조건 Start -->
	                            <div class="cm03 population_tab"  id="API_0306">
	                            	<div class="stepBox"> 
	                            		<p class="on">조사년도(필수)
									    	<select title="주택조건 조사년도" id="house_year" name="house_year" style="font-size:13px;">
									     	</select> 
									    </p>   
									</div>
									<div class="stepBox"> 
										<a href="javascript:void(0)" class="roundTextBox" id="houseTypeTab">
											<input type="checkbox" title="주택유형(다중선택)" />
											<span>주택유형(다중선택)</span>
										</a>
									    <div class="joinDefault">
									    	<ul class="multiCheckBox">
										        <li>
										            <input type="checkbox" id="rd_home01" name="house_type" value="01" />
										            <label for="rd_home01">단독주택</label>
										            <a href="javascript:void(0)" class="ar" data-subj="단독주택" title="${paramInfo.tooltipList.A0115}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_home02" name="house_type" value="02" />
										            <label for="rd_home02">아파트</label>
										            <a href="javascript:void(0)" class="ar" data-subj="아파트" title="${paramInfo.tooltipList.A0116}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_home03" name="house_type" value="03" />
										            <label for="rd_home03">연립주택</label>
										            <a href="javascript:void(0)" class="ar" data-subj="연립주택" title="${paramInfo.tooltipList.A0117}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_home04" name="house_type" value="04" />
										            <label for="rd_home04">다세대주택</label>
										            <a href="javascript:void(0)" class="ar" data-subj="다세대주택" title="${paramInfo.tooltipList.A0118}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_home05" name="house_type" value="05" />
										            <label for="rd_home05">비주거용건물(상가,공장,여관 등)내주택</label>
										            <a href="javascript:void(0)" class="ar" data-subj="비거주용건물 내 주택" title="${paramInfo.tooltipList.A0119}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										        <li>
										            <input type="checkbox" id="rd_home06" name="house_type" value="06" />
										            <label for="rd_home06">주택이외의 거처</label>
										            <a href="javascript:void(0)" class="ar" data-subj="주택이외의 거처" title="${paramInfo.tooltipList.A0120}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
										        </li>
										    </ul>
									    </div>
									     
									   	<a href="javascript:void(0)" class="roundTextBox" id="houseConstYearTab" style="display:none;">	<!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
									    	<input type="checkbox" title="건축년도(선택)" />
											<span>건축년도(선택)</span>
									    </a>
									    <div class="joinDefault" style="display:none;"> <!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
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
									    
									    <!-- 2016.08.30 권차욱 9월 서비스 : 주택사용기간 -->
									    <a href="javascript:void(0)" class="roundTextBox" id="houseUsePeriodTab">
									    	<input type="checkbox" title="노후년수(선택)" />
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
									     
									    <!-- 2016.08.30 권차욱  9월 서비스 --> 
									   	<a href="javascript:void(0)" class="roundTextBox" id="houseBdspaceTab">
									    	<input type="checkbox" title="연면적(선택)" />
											<span>연면적(선택)</span>
									    </a>
									    <div class="joinDefault" style="width:260px;">
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
				                                    <li style="margin-left:-12px;">20</li>
				                                    <li style="margin-left:-12px;">40</li>
				                                    <li style="margin-left:-14px;">60</li>
				                                    <li style="margin-left:-14px;">85</li>
				                                    <li style="margin-left:-14px;">100</li>
				                                    <li style="margin-left:-14px;">130</li>
				                                    <li style="margin-left:-14px;">165</li>
				                                    <li style="margin-left:-12px;">230</li>
				                                    <li style="margin-left:-18px;">+</li>
				                                </ul> 
				                            </div>
									    </div> 
									</div>
	                            </div>
	                            <!-- 주택 조건 End -->
	                            
	                            <!-- 인구+가구+주택 결합조건 Start-->
	                            <div class="cm04 population_tab"  id="API_4011">
	                            	<div class="stepBox">
	                            		<div class="roundTextBox fl">조사년도(필수)
									   		<select title="인구조건 조사년도" id="population_year_combine" name="population_year_combine" class="fl" style="font-size:13px;">
											</select>
									    </div>
									    <ul class="dbTypeCk flType01 radioStepBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
							                <li>
							                    <input type="radio" name="rd_combine_base" id="rd_combine_base01" value="population" />
									            <label for="rd_combine_base01" class="mr20" style="display:none;">인구(명) 기준</label> <!-- 2016.08.23 권차욱 9월 서비스 -->
									           <!--  <span id="rd_combine_base01-hidden" class="mr20 ml20">인구(명) 기준</span> -->
									            <input type="radio" name="rd_combine_base" id="rd_combine_base02" value="household" />
									            <label for="rd_combine_base02" class="mr20" style="display:none;">가구수(가구) 기준</label>	<!-- 2016.08.23 권차욱 9월 서비스 -->
									            <!-- <span id="rd_combine_base02-hidden" class="mr20 ml20">가구수(가구) 기준</span> -->
									            <input type="radio" name="rd_combine_base" id="rd_combine_base03" value="house" />
									            <label for="rd_combine_base03" style="display:none;">주택수(호) 기준</label>	<!-- 2016.08.23 권차욱 9월 서비스 -->
							                </li> 
									    </ul>
									</div>
									<div class="stepBox join">
							            <div class="joinStepBox first" id="fusionPopulation">
							            	<a href="javascript:void(0)" class="roundTextBox" id="populationGenderTab_combine">
										    	<input type="checkbox" title="성별(선택)" />
												<span>성별(선택)</span>
										    </a>
										     <div class="joinDefault">
								            	<ul class="dbTypeCk radioStepBox validationStepBox"> <!-- 2016.03.21 수정, class추가 --> 
									                <li>
									                	<input type="radio" id="population_gender_combine01" name="population_gender_combine"  value="0"/>
											            <label for="population_gender_combine01" class="mr20">전체</label> 
											            <input type="radio" id="population_gender_combine02" name="population_gender_combine" value="1"/>
											            <label for="population_gender_combine02" class="mr20">남자</label>
											            <input type="radio" id="population_gender_combine03" name="population_gender_combine" value="2"/>
											            <label for="population_gender_combine03">여자</label>
									                </li> 
											    </ul> 
								    		</div>
								    		
										    <a href="javascript:void(0)" class="roundTextBox" id="populationAgeTab_combine">
										    	<input type="checkbox" title="연령(선택)"/>
												<span>연령(선택)</span>
										    </a>
										    <div class="joinDefault" style="width:260px;">
										    	<div class="box_area_option02">
										    		<!-- 9월서비스 권차욱 수정 -->
					                                <div class="mgb_12">
					                                    <p class="houseArea">
					                                        <select title="시작범위" id="populationAgeFrom_combine" name="age_from_combine"></select>
					                                        <span>이상 ~ </span>
					                                        <select title="마지막범위" id="populationAgeTo_combine" name="age_to_combine"></select>
					                                        <span id="ageToText_combine">미만</span>
					                                    </p> 
					                                </div> 
					                                
					                                <div id="slider-range2_combine" class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false"><div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 19.7324%; width: 8.3612%;"></div><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 19.7324%;"></a><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 28.0936%;"></a></div>
					                                <ul class="slider_controll_bar">
					                                	<!-- 2016.09.08 9월 서비스 -->
					                                    <li style="margin-left:-8px;">0</li>
					                                    <li style="margin-left:12px;">20</li>
					                                    <li style="margin-left:8px;">40</li>
					                                    <li style="margin-left:7px;">60</li>
					                                    <li style="margin-left:9px;">80</li>
					                                    <li style="margin-left:7px;">100+</li>
					                                </ul>
					                            </div>
										    </div>
										    
										    <a href="javascript:void(0)" class="roundTextBox" id="populationEduTab_combine" style="display:none;"> <!-- 2016.08.23 권차욱 9월 서비스  -->
										    	<input type="checkbox" title="교육정도별(다중선택)" />
												<span>교육정도별(다중선택)</span>
										    </a>
										    <div class="joinDefault">
			                                    <ul class="dbTypeCk honinType multiCheckBox">
			                                    	<li>
			                                    		<input type="checkbox" name="edulevel_combine" id="edu_level_combine01" value="1" />
											            <label for="edu_level_combine01">수학없음</label>
											            <input type="checkbox" name="edulevel_combine" id="edu_level_combine02" value="2" />
											            <label for="edu_level_combine02">초등학교</label>
			                                    	</li>
			                                    	<li>
			                                    		<input type="checkbox" name="edulevel_combine" id="edu_level_combine03" value="3" />
											            <label for="edu_level_combine03">중학교</label>
											            <input type="checkbox" name="edulevel_combine" id="edu_level_combine04" value="4" />
											            <label for="edu_level_combine04">고등학교</label>
			                                    	</li>
			                                    	<li>
			                                    		<input type="checkbox" name="edulevel_combine" id="edu_level_combine05" value="5" />
											            <label for="edu_level_combine05">전문학사</label>
											            <input type="checkbox" name="edulevel_combine" id="edu_level_combine06" value="6" />
											            <label for="edu_level_combine06">학사</label>
			                                    	</li>
			                                    	<li>
			                                    		<input type="checkbox" name="edulevel_combine" id="edu_level_combine07" value="7" />
											            <label for="edu_level_combine07">석사</label>
											            <input type="checkbox" name="edulevel_combine" id="edu_level_combine08" value="8" />
											            <label for="edu_level_combine08">박사</label>
			                                    	</li>
		                                   		 </ul>
										    </div>
										    
										    <a href="javascript:void(0)" class="roundTextBox" id="populationMarryTab_combine" style="display:none;"> <!-- 2016.08.23 권차욱 9월 서비스 -->
										   		<input type="checkbox" title="혼인정도별(다중선택)" />
												<span>혼인정도별(다중선택)</span>
										    </a>
										    <div class="joinDefault">
										    	<ul class="dbTypeCk honinType multiCheckBox">
			                                    	<li>
			                                    		<input type="checkbox" name="mrg_state_combine" id="rd_honin_combine01" value="1" />
											            <label for="rd_honin_combine01">미혼</label>
											            <input type="checkbox" name="mrg_state_combine" id="rd_honin_combine02" value="4" />
											            <label for="rd_honin_combine02">이혼</label>
			                                    	</li>
			                                    	<li>
			                                    		<input type="checkbox" name="mrg_state_combine" id="rd_honin_combine03" value="2" />
											            <label for="rd_honin_combine03">기혼</label>
											            <input type="checkbox" name="mrg_state_combine" id="rd_honin_combine04" value="3" />
											            <label for="rd_honin_combine04">사별</label>
			                                    	</li>
			                                    </ul>
										    </div>
							            </div>
							            
							            <div class="joinStepBox" id="fusionHousehold">
							            	<a href="javascript:void(0)" class="roundTextBox" id="householdTypeTab_combine">
							            		<input type="checkbox" title="세대구성(다중선택)" />
												<span>세대구성(다중선택)</span>
							            	</a>
							            	<div class="joinDefault">
								            	<ul class="multiCheckBox" style="width:250px;"> 
									                <li>
											            <input type="checkbox" id="rd_household_combine01" name="household_type_combine" value="01" />
											            <label for="rd_household_combine01">1세대 가구</label>
											            <a href="javascript:void(0)" class="ar" data-subj="1세대 가구" title="${paramInfo.tooltipList.A0104}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_household_combine02" name="household_type_combine" value="02" />
											            <label for="rd_household_combine02">2세대 가구</label>
											            <a href="javascript:void(0)" class="ar" data-subj="2세대 가구" title="${paramInfo.tooltipList.A0105}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_household_combine03" name="household_type_combine" value="03" />
											            <label for="rd_household_combine03">3세대 가구</label>
											            <a href="javascript:void(0)" class="ar" data-subj="3세대 가구" title="${paramInfo.tooltipList.A0106}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_household_combine04" name="household_type_combine" value="04" />
											            <label for="rd_household_combine04">4세대  이상 가구</label>  <!-- 2016.08.23 권차욱 9월 서비스 - 4세대가구->4세대이상가구 -->
											            <a href="javascript:void(0)" class="ar" data-subj="4세대 이상 가구" title="${paramInfo.tooltipList.A0122}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
										       		<div style="width:260px;height:1px;border-bottom:1px dashed #cccccc;margin-bottom:5px;"></div>
											        <li>
											            <input type="checkbox" id="rd_household_combine06" name="household_type_combine" value="A0" />
											            <label for="rd_household_combine06">1인가구</label>
											            <a href="javascript:void(0)" class="ar" data-subj="1인가구" title="${paramInfo.tooltipList.A0107}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_household_combine07" name="household_type_combine" value="B0" />
											            <label for="rd_household_combine07">비혈연가구</label>
											            <a href="javascript:void(0)" class="ar" data-subj="비혈연가구" title="${paramInfo.tooltipList.A0124}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											    </ul>
										    </div>
										    
										    <a href="javascript:void(0)" class="roundTextBox" id="householdOcptnTab_combine" style="display:none;"> <!-- 2016.08.23 권차욱 9월 서비스 -->
										    	<input type="checkbox" title="점유형태(다중선택)" />
												<span>점유형태(다중선택)</span>
										    </a>
							            	<div class="joinDefault">
								            	<ul class="multiCheckBox" style="width:250px;"> 
									                <li>
											            <input type="checkbox" id="rd_occupy_combine01" name="ocptn_type_combine" value="1" />
											            <label for="rd_occupy_combine01">자기집</label>
											            <a href="javascript:void(0)" class="ar" data-subj="자기집" title="${paramInfo.tooltipList.A0108}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_occupy_combine02" name="ocptn_type_combine" value="2" />
											            <label for="rd_occupy_combine02">전세(월세없음)</label>
											            <a href="javascript:void(0)" class="ar" data-subj="전세" title="${paramInfo.tooltipList.A0109}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_occupy_combine03" name="ocptn_type_combine" value="3" />
											            <label for="rd_occupy_combine03">보증금 있는 월세</label>
											            <a href="javascript:void(0)" class="ar" data-subj="보증금 있는 월세" title="${paramInfo.tooltipList.A0110}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_occupy_combine04" name="ocptn_type_combine" value="4" />
											            <label for="rd_occupy_combine04">보증금 없는 월세</label>
											            <a href="javascript:void(0)" class="ar" data-subj="보증금 없는 월세" title="${paramInfo.tooltipList.A0111}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_occupy_combine05" name="ocptn_type_combine" value="5" />
											            <label for="rd_occupy_combine05">사글세</label>
											            <a href="javascript:void(0)" class="ar" data-subj="사글세" title="${paramInfo.tooltipList.A0112}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_occupy_combine06" name="ocptn_type_combine" value="6" />
											            <label for="rd_occupy_combine06">무상(관사, 사택, 친척집 등)</label>
											            <a href="javascript:void(0)" class="ar" data-subj="무상" title="${paramInfo.tooltipList.A0113}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											    </ul>
										    </div>
							            </div>
							            
							            <div class="joinStepBox" id="fusionHouse">
							            	<a href="javascript:void(0)" class="roundTextBox" id="houseTypeTab_combine">
							            		<input type="checkbox" title="주택유형(다중선택)"/>
												<span>주택유형(다중선택)</span>
							            	</a>
							            	<div class="joinDefault">
								            	<ul class="multiCheckBox" style="width:250px;"> 
									                <li>
											            <input type="checkbox" id="rd_home_combine01" name="house_type_combine" value="01" />
											            <label for="rd_home_combine01">단독주택</label>
											            <a href="javascript:void(0)" class="ar" data-subj="단독주택" title="${paramInfo.tooltipList.A0115}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_home_combine02" name="house_type_combine" value="02" />
											            <label for="rd_home_combine02">아파트</label>
											            <a href="javascript:void(0)" class="ar" data-subj="아파트" title="${paramInfo.tooltipList.A0116}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_home_combine03" name="house_type_combine" value="03" />
											            <label for="rd_home_combine03">연립주택</label>
											            <a href="javascript:void(0)" class="ar" data-subj="연립주택" title="${paramInfo.tooltipList.A0117}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_home_combine04" name="house_type_combine" value="04" />
											            <label for="rd_home_combine04">다세대주택</label>
											            <a href="javascript:void(0)" class="ar" data-subj="다세대주택" title="${paramInfo.tooltipList.A0118}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <li>
											            <input type="checkbox" id="rd_home_combine05" name="house_type_combine" value="05" />
											            <label for="rd_home_combine05">비주거용건물(상가,공장,여관 등)내주택</label>
											            <a href="javascript:void(0)" class="ar" data-subj="비거주용건물" title="${paramInfo.tooltipList.A0119}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
											        </li>
											        <!-- 2016.08.23 권차욱 9월 서비스 - 주택이외의 거처 살림 -->
											        <li> 
 											            <input type="checkbox" id="rd_home_combine06" name="house_type_combine" value="06" />
											            <label for="rd_home_combine06">주택이외의 거처</label>
											            <a href="javascript:void(0)" class="ar" data-subj="주택이외의 거처" title="${paramInfo.tooltipList.A0120}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
 											        </li> 
											    </ul>
										    </div>
										    
										    <a href="javascript:void(0)" class="roundTextBox" id="houseConstYearTab_combine" style="display:none;">	<!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
										    	<input type="checkbox" title="건축년도(선택)" />
												<span>건축년도(선택)</span>
										    </a>
										    <div class="joinDefault" style="display:none;width:260px;">	<!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
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
										    
										    <!-- 2016.08.30 권차욱 9월 서비스 : 노후년수-->
										    <a href="javascript:void(0)" class="roundTextBox" id="houseUsePeriodTab_combine">
										    	<input type="checkbox" title="노후년수(선택)" />
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
										    
										    <!-- 2016.09.09 권차욱  9월 서비스 -->
										    <a href="javascript:void(0)" class="roundTextBox" id="houseBdspaceTab_combine">
										    	<input type="checkbox" title="연면적(선택)"/>
												<span>연면적(선택)</span>
										    </a>
										    <div class="joinDefault" style="width:260px;">
										    	<div class="box_area_option02">
					                                <div class="mgb_12">
					                                    <p class="houseArea">
					                                        <select title="시작범위" id="houseBdspaceFrom_combine" name="bdspace_from_combine"></select>
					                                        <span>초과 ~</span>
					                                        <select title="마지막범위" id="houseBdspaceTo_combine" name="bdspace_to_combine"></select>
					                                        <span id="houseBdspaceToText_combine">이하</span>
					                                    </p>
					                                    <p class="m2Area">
					                                        <span class="houseBdspaceFrom_combine">약 18.2평</span>
					                                        <span>초과 ~</span>
					                                        <span class="houseBdspaceTo_combine">약 25.8평</span>
					                                        <span class="houseBdspaceToText_combine">이하</span>
					                                    </p>
					                                </div>
					                                <div id="slider-range3_combine" class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false"><div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 19.7324%; width: 8.3612%;"></div><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 19.7324%;"></a><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 28.0936%;"></a></div>
					                                <ul class="slider_controll_bar">
						                                    <li style="margin-left:-6px;">0</li>
						                                    <li style="margin-left:-11px;">20</li>
						                                    <li style="margin-left:-11px;">40</li>
						                                    <li style="margin-left:-9px;">60</li>
						                                    <li style="margin-left:-10px;">85</li>
						                                    <li style="margin-left:-10px;">100</li>
						                                    <li style="margin-left:-10px;">130</li>
						                                    <li style="margin-left:-10px;">165</li>
						                                    <li style="margin-left:-10px;">230</li>
						                                    <li style="margin-left:224px;position:absolute;">+</li>
						                                </ul> 
					                            </div>
										    </div>
							            </div>
									</div>
	                            </div>
	                            <!-- 인구+가구+주택 결합조건 End -->
							</div>
							
							<!-- 농림어가총조사 통계 -->
							<div class="totalResult tr03">
	                            <ol class="cateMenu type02" id="3fTabDiv">
	                                <li class="on"><a href="javascript:$policyWriteMapLeftMenu.ui.tripleFTab('farm');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0202}">농가</a></li>
	                                <li><a href="javascript:$policyWriteMapLeftMenu.ui.tripleFTab('forest');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0203}">임가</a></li>
	                                <li><a href="javascript:$policyWriteMapLeftMenu.ui.tripleFTab('fish');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0204}">어가</a></li>
	                            </ol>
	                            
	                            <!-- 농가 Start -->
	                            <div class="cm01" id="API_0310">
	                            	<div class="stepBox">
										<p class="on">조사년도(필수)
											<select title="농림어업 조사년도" id="3f_year" name="3f_year" style="font-size:13px;">
									        </select>
										</p>
										<p class="on" id="3fFishTab-title">어가 구분(필수)</p>
									    <ul class="dbTypeCk radioStepBox validationStepBox" id="3fFishTab-content"> <!-- 2016.03.21 수정, class추가 -->
									        <li>
									        	<!-- 2017. 03. 13 오류 수정 -->
									        	<input type="radio" name="3f_fish_ppl" id="3f_fish_see" value="1" checked=checked/>
									            <label for="3f_fish_see" class="mr20 on">내수면어가</label>
									            <input type="radio" name="3f_fish_ppl" id="3f_fish_land" value="2" />
									            <label for="3f_fish_land">해수면어가</label>
									        </li> 
									    </ul>
										<div class="txt01">필수항목 설정 시 가구기준 검색조건이 
										<br />생성되며, 선택항목 추가 설정시 가구원 기준으로 검색됩니다.</div>
									</div>
									
									<div class="stepBox">  
									    <div class="txt01">추가선택시 가구원 기준 검색</div>
									    <a href="javascript:void(0)" class="roundTextBox" id="3fGenderTab">
									    	<input type="checkbox" id="rt01" title="가구원 성별(선택)">
									    	<span>가구원 성별(선택)</span>
									    </a> 
									    <div class="joinDefault">
										    <ul class="dbTypeCk radioStepBox">
										        <li>
										            <input type="radio" name="3f_gender" id="3f_gender01" value="0" checked=checked/>
										            <label for="3f_gender01" class="mr20 on">전체</label>
										            <input type="radio" name="3f_gender" id="3f_gender02" value="1" />
										            <label for="3f_gender02" class="mr20">남자</label>
										            <input type="radio" name="3f_gender" id="3f_gender03" value="2" />
										            <label for="3f_gender03">여자</label>
										        </li> 
										    </ul>
										</div> 
										
									    <a href="javascript:void(0)" class="roundTextBox" id="3fAgeTab">
									    	<input type="checkbox" title="해당 가구원 연령 선택">
									    	<span>해당 가구원 연령(선택)</span>
									    </a>
									    <div class="joinDefault" style="width:260px;">
									    	<div class="box_area_option02">
									    		<!-- 9월서비스 권차욱 수정  -->
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
				                                	<!-- 2016.09.08 9월 서비스 -->
				                                   	<li style="margin-left:-7px;">0</li>
				                                    <li style="margin-left:4px;">20</li>
				                                    <li style="margin-left:-4px;">40</li>
				                                    <li style="margin-left:-4px;">60</li>
				                                    <li style="margin-left:-4px;">80</li>
				                                    <li style="margin-left:-5px;">100+</li>
				                                </ul> 
				                            </div>
									    </div>
									</div>
	                            </div>
	                            <!-- 농가 End -->
							</div>
							
							<!-- 사업체총조사 통계 Start -->
							<div class="totalResult tr04">
								<ol class="cateMenu" id="companyTabDiv">
	                                <li class="on"><a href="javascript:$policyWriteMapLeftMenu.ui.companyTab('industry');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0302}">산업분류</a></li>
	                                <li><a href="javascript:$policyWriteMapLeftMenu.ui.companyTab('theme');" data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0303}">테마업종</a></li>
	                            </ol>
	                            
	                            <!-- 산업분류 Start -->
	                            <div class="cm01 company_tab" id="API_0304-b">
	                            	<div class="stepBox">
										<p class="on">조사년도(필수)
											<select title="사업체 조사년도" id="company_year" name="company_year" style="font-size:13px;" onchange="javascript:$policyWriteMapLeftMenu.ui.setDetailStatsPanel('company');">
									        </select>
										</p>
									    <p class="on">대상 선택하기(필수)</p>
									    <ul class="radioStepBox validationStepBox">  <!-- 2016.03.21 수정, class추가 -->
									        <li>
									            <input type="checkbox" id="rd_cData_type01" name="cDataType" value="corp_cnt" checked=checked/>
									            <label for="rd_cData_type01" class="mr20 on">사업체수</label>
									            <input type="checkbox" id="rd_cData_type02" name="cDataType" value="tot_worker" />
									            <label for="rd_cData_type02">종사자수</label>
									        </li> 
									    </ul>
									</div>
									<div class="stepBox">
									    <a href="javascript:$policyWriteMapLeftMenu.ui.companyClassView();" data-subj="표준산업분류목록 팁" title="설정한 조사년도 기준의 산업분류차수 목록을 열람하여 조사 업종에 대하여 조회할 수 있습니다." class="roundArrBox">표준산업분류목록</a>
									</div>
	                            </div>
	                            <!-- 산업분류 End -->
	                            
	                            <!-- 테마업종 Start -->
	                            <div class="cm02 company_tab" id="API_0304-a">
	                            	<div class="stepBox">
	                            		<!-- 2018.01.09 [개발팀] 사업체테마 조사년도추가  -->
	                            		<p class="on">조사년도(필수)
											<select title="사업체 조사년도" id="company_year_theme" name="company_year_theme" style="font-size:13px;">
									        </select>
										</p>
										<p class="on">대상 선택하기(필수)</p>
									    <ul class="radioStepBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
									        <li>
									            <input type="checkbox" id="rd_cDataType01" name="cDataType1" value="corp_cnt" checked=checked/>
									            <label for="rd_cDataType01" class="mr20 on">사업체수</label>
									            <input type="checkbox" id="rd_cDataType02" name="cDataType1" value="tot_worker" />
									            <label for="rd_cDataType02" class="mr20">종사자수</label>
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
			                                    		<input type="checkbox" name="theme_codes" id="theme_1001" value="1001" />
											            <label for="theme_1001">인테리어</label>
											            <input type="checkbox" name="theme_codes" id="theme_1002" value="1002" />
											            <label for="theme_1002">목욕탕</label>
											            <input type="checkbox" name="theme_codes" id="theme_1003" value="1003" />
											            <label for="theme_1003">교습학원</label>
											            <input type="checkbox" name="theme_codes" id="theme_1004" value="1004" />
											            <label for="theme_1004">어학원</label>
											            <input type="checkbox" name="theme_codes" id="theme_1005" value="1005" />
											            <label for="theme_1005">예체능학원</label>
											            <input type="checkbox" name="theme_codes" id="theme_1006" value="1006" />
											            <label for="theme_1006">부동산중개업</label>
											            <input type="checkbox" name="theme_codes" id="theme_1007" value="1007" />
											            <label for="theme_1007">이발소</label>
											            <input type="checkbox" name="theme_codes" id="theme_1008" value="1008" />
											            <label for="theme_1008">미용실</label>
											            <input type="checkbox" name="theme_codes" id="theme_1009" value="1009" />
											            <label for="theme_1009">세탁소</label>
											            <input type="checkbox" name="theme_codes" id="theme_1010" value="1010" />
											            <label for="theme_1010">PC방</label>
											            <input type="checkbox" name="theme_codes" id="theme_1011" value="1011" />
											            <label for="theme_1011">노래방</label>
			                                    	</li>
			                                    </ul>
										    </div>
										    <a href="javascript:void(0)" class="subRoundTextBox">
												<span>도소매</span>
											</a>
											<div class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_2001" value="2001" />
											            <label for="theme_2001">문구점</label>
											            <input type="checkbox" name="theme_codes" id="theme_2002" value="2002" />
											            <label for="theme_2002">서점</label>
											            <input type="checkbox" name="theme_codes" id="theme_2003" value="2003" />
											            <label for="theme_2003">편의점</label>
											            <input type="checkbox" name="theme_codes" id="theme_2004" value="2004" />
											            <label for="theme_2004">식료품점</label>
											            <input type="checkbox" name="theme_codes" id="theme_2005" value="2005" />
											            <label for="theme_2005">휴대폰점</label>
											            <input type="checkbox" name="theme_codes" id="theme_2006" value="2006" />
											            <label for="theme_2006">의류</label>
											            <input type="checkbox" name="theme_codes" id="theme_2007" value="2007" />
											            <label for="theme_2007">화장품/방향제</label>
											            <input type="checkbox" name="theme_codes" id="theme_2008" value="2008" />
											            <label for="theme_2008">철물점</label>
											            <input type="checkbox" name="theme_codes" id="theme_2009" value="2009" />
											            <label for="theme_2009">주유소</label>
											            <input type="checkbox" name="theme_codes" id="theme_2010" value="2010" />
											            <label for="theme_2010">꽃집</label>
											            <input type="checkbox" name="theme_codes" id="theme_2011" value="2011" />
											            <label for="theme_2011">슈퍼마켓</label>
											        </li>
			                                    </ul>
										    </div>
										    <a href="javascript:void(0)" class="subRoundTextBox">
												<span>숙박</span>
											</a>
											<div class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_4001" value="4001" />
											            <label for="theme_4001">호텔</label>
											            <input type="checkbox" name="theme_codes" id="theme_4002" value="4002" />
											            <label for="theme_4002">여관(모텔포함)및 여인숙</label>
											        </li>
			                                    </ul>
										    </div>
										    <a id="food" href="javascript:void(0)" class="subRoundTextBox">
												<span>음식점</span>
											</a>
											<div id="foodInfo" class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_5001" value="5001" />
											            <label for="theme_5001">한식</label>
											            <input type="checkbox" name="theme_codes" id="theme_5002" value="5002" />
											            <label for="theme_5002">중식</label>
											            <input type="checkbox" name="theme_codes" id="theme_5003" value="5003" />
											            <label for="theme_5003">일식</label>
											            <input type="checkbox" name="theme_codes" id="theme_5004" value="5004" />
											            <label for="theme_5004">분식</label>
											            <input type="checkbox" name="theme_codes" id="theme_5005" value="5005" />
											            <label for="theme_5005">서양식</label>
											            <input type="checkbox" name="theme_codes" id="theme_5006" value="5006" />
											            <label for="theme_5006">제과점</label>
											            <input type="checkbox" name="theme_codes" id="theme_5007" value="5007" />
											            <label for="theme_5007">패스트푸드</label>
											            <input type="checkbox" name="theme_codes" id="theme_5008" value="5008" />
											            <label for="theme_5008">치킨</label>
											            <input type="checkbox" name="theme_codes" id="theme_5009" value="5009" />
											            <label for="theme_5009">호프 및 간이주점</label>
											            <input type="checkbox" name="theme_codes" id="theme_5010" value="5010" />
											            <label for="theme_5010">카페</label>
											            <input type="checkbox" name="theme_codes" id="theme_5011" value="5011" />
											            <label for="theme_5011">기타 외국식</label>
											        </li>
			                                    </ul>
										    </div>
										    <a href="javascript:void(0)" class="subRoundTextBox">
												<span>교통</span>
											</a>
											<div class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_3001" value="3001" />
											            <label for="theme_3001">지하철역</label>
											            <input type="checkbox" name="theme_codes" id="theme_3002" value="3002" />
											            <label for="theme_3002">터미널</label>
											        </li>
			                                    </ul>
										    </div>
										    <a href="javascript:void(0)" class="subRoundTextBox">
												<span>공공</span>
											</a>
											<div class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_6001" value="6001" />
											            <label for="theme_6001">우체국</label>
											            <input type="checkbox" name="theme_codes" id="theme_6002" value="6002" />
											            <label for="theme_6002">행정기관</label>
											            <input type="checkbox" name="theme_codes" id="theme_6003" value="6003" />
											            <label for="theme_6003">경찰/지구대</label>
											            <input type="checkbox" name="theme_codes" id="theme_6004" value="6004" />
											            <label for="theme_6004">소방서</label>
											        </li>
			                                    </ul>
										    </div>
										    <a href="javascript:void(0)" class="subRoundTextBox">
												<span>교육</span>
											</a>
											<div class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_7001" value="7001" />
											            <label for="theme_7001">초등학교</label>
											            <input type="checkbox" name="theme_codes" id="theme_7002" value="7002" />
											            <label for="theme_7002">중학교</label>
											            <input type="checkbox" name="theme_codes" id="theme_7003" value="7003" />
											            <label for="theme_7003">고등학교</label>
											            <input type="checkbox" name="theme_codes" id="theme_7004" value="7004" />
											            <label for="theme_7004">전문대학</label>
											            <input type="checkbox" name="theme_codes" id="theme_7005" value="7005" />
											            <label for="theme_7005">대학교</label>
											            <input type="checkbox" name="theme_codes" id="theme_7006" value="7006" />
											            <label for="theme_7006">대학원</label>
											            <input type="checkbox" name="theme_codes" id="theme_7007" value="7007" />
											            <label for="theme_7007">어린이보육업</label>
											        </li>
			                                    </ul>
										    </div>
										    <a href="javascript:void(0)" class="subRoundTextBox">
												<span>기업</span>
											</a>
											<div class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_8001" value="8001" />
											            <label for="theme_8001">제조/화학</label>
											            <input type="checkbox" name="theme_codes" id="theme_8002" value="8002" />
											            <label for="theme_8002">서비스</label>
											            <input type="checkbox" name="theme_codes" id="theme_8003" value="8003" />
											            <label for="theme_8003">통신/IT</label>
											            <input type="checkbox" name="theme_codes" id="theme_8004" value="8004" />
											            <label for="theme_8004">건설</label>
											            <input type="checkbox" name="theme_codes" id="theme_8005" value="8005" />
											            <label for="theme_8005">판매/유통</label>
											            <input type="checkbox" name="theme_codes" id="theme_8006" value="8006" />
											            <label for="theme_8006">기타금융업</label>
											            <input type="checkbox" name="theme_codes" id="theme_8007" value="8007" />
											            <label for="theme_8007">기타의료업</label>
											            <input type="checkbox" name="theme_codes" id="theme_8008" value="8008" />
											            <label for="theme_8008">문화/체육</label>
											        </li>
			                                    </ul>
										    </div>
										    <a href="javascript:void(0)" class="subRoundTextBox">
												<span>편의/문화</span>
											</a>
											<div class="joinDefault">
										    	<ul class="dbTypeCk honinType subRadioStepBox">
										    		<li>
			                                    		<input type="checkbox" name="theme_codes" id="theme_9001" value="9001" />
											            <label for="theme_9001">백화점/중대형마트</label>
											            <input type="checkbox" name="theme_codes" id="theme_9002" value="9002" />
											            <label for="theme_9002">은행</label>
											            <input type="checkbox" name="theme_codes" id="theme_9003" value="9003" />
											            <label for="theme_9003">병원</label>
											            <input type="checkbox" name="theme_codes" id="theme_9004" value="9004" />
											            <label for="theme_9004">극장/영화관</label>
											            <input type="checkbox" name="theme_codes" id="theme_9005" value="9005" />
											            <label for="theme_9005">도서관/박물관</label>
											        </li>
			                                    </ul>
										    </div>
									    </div>
									</div> 
	                            </div>
	                            <!-- 테마업종 End --> 
							</div>
							<!-- 사업체총조사 통계 End -->
							
							<!-- 행정구역 통계목록보기 Start -->
							<div class="totalResult tr05">
								<div id="kosis">
	                            	<div class="stepBox">
									    <ul>
									        <li>
									            <input type="text" class="inp" id="kosisSearchText" placeholder="통계항목 검색" title="통계항목 검색" />
									            <a href="javascript:$policyWriteMapKosis.request.kosisSearch(0);" class="btn_stepSearch">검색</a>
									        </li>
									        <li style="height: auto; text-align: right; padding-top: 5px; margin-bottom: -8px;">
									        	<img src="/img/ico/kosis_gis_se_sido.png" style="vertical-align: middle;" alt="시도" > : 시도
									        	<img src="/img/ico/kosis_gis_se_sgg.png" style="vertical-align: middle;"  alt="시군구" > : 시군구
									        	<img src="/img/ico/kosis_gis_se_adm.png" style="vertical-align: middle;"  alt="읍면동" > : 읍면동 
									        </li>
									    </ul>
									</div>
									<!-- kosis 리스트 -->
								    <div class="stepTreeBox" id="kosisStatsTree"></div>

			                        <!-- 검색 리스트 -->
			                        <div class="stepBox xWidth" id="kosis_SearchBox" style="display: none;">
			                        	<div style="text-align: center;">
							            	<a href="javascript:$policyWriteMapKosis.ui.kosisTreeShow();" class="btnStyle01">KOSIS 목록으로</a>
							        	</div>
										<p class="result">검색결과 : 5개</p>
							            <ul class="xWidth radioStepOneBox">
							                <li>
							                    <input type="radio" name="rd_goocha" id="rd_goocha01" />
									            <label for="rd_goocha01">농업, 임업 및 어업농업</label>
							                </li>
							                <li>
							                    <input type="radio" name="rd_goocha" id="rd_goocha02" />
									            <label for="rd_goocha02">광업</label>
							                </li>
							                <li>
							                    <input type="radio" name="rd_goocha" id="rd_goocha03" />
									            <label for="rd_goocha03">제조업</label>
							                </li>
							                <li>
							                    <input type="radio" name="rd_goocha" id="rd_goocha04" />
									            <label for="rd_goocha04">전기, 가스, 중기 및 수도사업</label>
							                </li>
									    </ul>
									    
									</div>
	                            </div>
							</div>
							<!-- 행정구역 통계목록보기 End --> 
							
							<!-- 협업형데이터 START -->
							<div class="totalResult tr06">
								<div class="stepBox mainIndex_stepBox">
									<p class="on">협업형 데이터</p>
									<ul class="dbTypeCk">
										<c:choose>
											<c:when test="${fn:length(localGovernmentList)>0 }">
												<c:forEach items="${localGovernmentList}" var="data" varStatus="status">
													<li>
														<input type="radio" name="local" id="local${data.div_cd }" value="${data.div_cd }" data-title="${data.div_nm }"/>
														<label for="local${data.div_cd }">${data.div_nm }</label>
													</li>
												</c:forEach>
											</c:when>
											<c:otherwise>
												<li>
													저장된 데이터가 존재하지 않습니다
												</li>
											</c:otherwise>
										</c:choose>
									</ul>
								</div>
								<div class="stepBox mainIndex_stepBox">
									<p class="on">LBDMS 전송 데이터</p>
									<ul class="dbTypeCk">
										<c:choose>
											<c:when test="${fn:length(lbdmsList)>0 }">
												<c:forEach items="${lbdmsList}" var="data" varStatus="status">
													<li>
														<input type="radio" name="lbdms" id="lbdms${data.seq }" value="${data.seq }" data-title="${data.open_data_nm }"/>
														<label for="lbdms${data.seq }">${data.open_data_nm }</label>
													</li>
												</c:forEach>
											</c:when>
											<c:otherwise>
												<li>
													저장된 데이터가 존재하지 않습니다
												</li>
											</c:otherwise>
										</c:choose>
									</ul>
								</div>
							</div>
							<!-- 협업형데이터 END -->
							 
							 <!-- 사용자데이터업로드 Start -->
							<div class="totalResult tr07">
	                            <div class="stepBox mainIndex_stepBox"> 
								    <p>나의 데이터에 저장된 목록</p>
								    <ul id="myDataLoadList" class="dbTypeCk"></ul>
								    <div id="myDataListTablePage"></div>
								</div>
							</div>
							<!-- 사용자데이터업로드 End --> 
							
							
						</div>

						<div class="btnBottom">
		                	<a href="javascript:$policyWriteMapLeftMenu.ui.doReqStatsData();" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">통계 보기</a>
		                </div> 
					</div><!-- 사업체총조사 통계조건 end --> 
					
					<!-- 3Depth start -->
					<!-- 해당분류 세부업종 선택하기 start -->
					<div class="quickBox step03" id="companyClassListDiv">
						<div class="subj">
							<span>산업분류목록 선택하기</span>
							<a href="javascript:void(0)" class="stepClose">닫기</a>
						</div>
						<div class="normalBox">
							<div class="stepBox">
								<ul>
							        <li>
							            <input type="text" class="inp" id="companySearchText" placeholder="통계항목 검색" title="통계항목 검색" />
							            <a href="javascript:$policyWriteMapLeftMenu.request.companySearch(0);" class="btn_stepSearch">검색</a>
							        </li>
							    </ul>
							</div>
							<!-- 산업분류 리스트 -->
					        <div class="stepTreeBox" id="company_TreeBox">
	                        </div>
	                        
	                        <!-- 산업분류 검색 리스트 -->
	                        <div class="stepBox xWidth" id="company_SearchBox" style="display: none;">
								<p class="result">검색결과 : <span id="companySearchCount"></span>개</p>
					            <ul class="xWidth radioStepOneBox2" id="companySearchDataList">
							    </ul>
							    <div id="companyTablePage"></div>
								<br/>
							    <div style="text-align: center;">
					            	<a href="javascript:$policyWriteMapLeftMenu.ui.companyTreeShow();" class="btnStyle01">산업분류 목록으로</a>
					        	</div>
							</div>
						</div>
						<div class="btnBottom">
	                        <a href="javascript:$policyWriteMapLeftMenu.ui.doReqStatsData();" class="btnStyle02">통계 보기</a>
	                    </div>
					</div>
					<!-- 해당분류 세부업종 선택하기 end -->
					
					<!-- 3Depth start -->
					<!-- KOSIS 세부항목 선택하기 start -->
					<div class="quickBox step03" id="kosisDetailDiv">
						<div class="subj">
							<span>KOSIS(지역통계) 세부항목 선택하기</span>
							<a href="javascript:void(0)" class="stepClose">닫기</a>
						</div>
						<div class="normalBox">
							<div class="stepBox" style="width:280px;">
								<div id="kosisTitle"></div>
								<div id="kosisOrigin" style="margin-top:15px;"></div>
							</div>
							<div class="cm01" style="width:280px;"> <!-- 2016.09.05 9월 서비스 -->
	                            	<div id="kosisDataFieldTable" class="stepBox"></div>
	                            </div>
						</div>
						<div class="btnBottom">
	                        <a href="javascript:$policyWriteMapKosis.ui.setKosisParams();" class="btnStyle02">통계 보기</a>
	                    </div>
					</div>
					<!-- 해당분류 세부업종 선택하기 end -->