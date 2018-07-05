<%
/**************************************************************************************************************************
* Program Name  : 살고싶은 우리동네 데이터보드 JSP  
* File Name     : houseAnalysisDataBoard.jsp
* Comment       : 
* History       : (주)유코아시스템 나광흠 2015-11-30
*
**************************************************************************************************************************/
%>

<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
   //치환 변수 선언
    pageContext.setAttribute("cr", "\r"); //Space
    pageContext.setAttribute("cn", "\n"); //Enter
    pageContext.setAttribute("crcn", "\r\n"); //Space, Enter
    pageContext.setAttribute("br", "<br/>"); //br 태그
%> 
<a href="javascript:void(0)" class="interactiveDataBoard disabled">데이터보드</a>

<div class="dataSideBox">
	<div class="bar">
		<div id="dataSlider" class="dataSlider"></div> 
		<a href="javascript:void(0)"><img src="${pageContext.request.contextPath}/img/ico/ico_close02.png" alt="데이터보드 닫기" /></a>
	</div>
	<div class="dataSideContents">
		<div class="dataSideScroll">
			<div class="dataBoardDiv" style="display:block;">
	  			<dl class="dscList">
	   				<dt style="display:none;">
	   					<a href="javascript:void(0)" id="data-board-dt-0">
	   						<span class="areaSpan"></span> 설정된지표
   						</a>
 					</dt>
	   				<dd style="display:none;">
	   				</dd>
	   				<dt style="display:none;">
	   					<a href="javascript:void(0)" id="data-board-dt-1">
	   						<span class="areaSpan"></span> 추천지역 리스트 <img alt="추천된 10개 지역을 보실 수 있으며, 같은 순위일 때는 행정구역 순서대로 나타납니다." src="/img/ico/ico_tooltip02.png" style="position: absolute;padding: 5px ;" />
   						</a>
 					</dt>
	   				<dd style="display:none;">
		   				<div class="List" id="interestList">
						</div>
	   				</dd>
	   				<dt style="display:none;"><a href="javascript:void(0)" id="data-board-dt-2"><span class="areaSpan"></span> 지역 종합현황 보기</a></dt>
	   				<dd style="display:none;">
	   					<div id="spider-web-slide-navigator" class="arrControllerBox">
    						<a href="javascript:void(0);" class="fl">이전</a>
    						<a href="javascript:void(0);" class="fr">다음</a>
    					</div>
						<div id="detailChart1" style="display:none;"></div>
	   					<div id="detailChart2" style="display:none;"></div>
	   					<div class="IndexStatusBar1">
	   						<ul id="indicator-navigator">
		   						<c:forEach var="map" items="${mlsfcLists }" varStatus="depth">
									<c:forEach var="depthName" items="${map.key }">
										<c:if test="${mlsfcLists[depthName].info.recmd_region_search_disp_yn=='Y'}">
											<li data-id="${depthName }">
												<a href="#">${mlsfcLists[depthName].info.b_class_idx_nm }</a>
												<ul>
													<c:forEach var="indicator" items="${mlsfcLists[depthName].indicator }" varStatus="status">
														<c:forEach var="mlsfc" items="${indicator.key }">
															<li title="${fn:replace(fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].abbrev_exp), cn, br) }">
																<a href="#" data-b-class="${mlsfcLists[depthName].indicator[mlsfc].b_class_idx_id }" data-m-class="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }">${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }</a>
															</li>
														</c:forEach>
													</c:forEach>
												</ul>
											</li>
										</c:if>
									</c:forEach>
								</c:forEach>
	   						</ul>
	   					</div>
	   					<div id="detailChart3-chart">
		   					<div id="detailChart5" style="width: 100%;height: 210px;"></div>
							<!-- 차트정보 S -->
							<div class="Chart_info">
							  <ul id="detailChart5-avg-text1">
							  </ul>
							  <ul id="detailChart5-avg-text2">
							  </ul>
							</div>
							<!-- 차트정보 E -->		   					
	   					</div>
	   				</dd>
	   				<dt style="display:none;"><a href="javascript:void(0)" id="data-board-dt-4"><span class="areaSpan"></span> 소지역 정보</a></dt>
	   				<dd style="display:none;">
						<div id="detailChart4" style="padding-right:5px;">
							<div class="ThisAreaInfo">
								<ul>
									<c:set var="censusDataYear" value="2016"/>
									<c:set var="companyDataYear" value="2015"/>
									<li class="M_on"><a class="Title" href="#" data-type="age">연령대별 인구</a>
										<div class="chart">
											<div class="radio">
												<label><input type="radio" name="color-map-age" checked="checked" data-option='{"api":"API_0301","filter":"tot_ppltn","showData":"tot_ppltn","data_nm":"총인구","unit":"명"}' data-parameters='{"year":"${censusDataYear }"}' /> 총인구</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"10대 이하","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"0","age_to":"9"}' /> 10대 이하</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"10대","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"10","age_to":"19"}' /> 10대</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"20대","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"20","age_to":"29"}' /> 20대</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"30대","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"30","age_to":"39"}' /> 30대</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"40대","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"40","age_to":"49"}' /> 40대</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"50대","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"50","age_to":"59"}' /> 50대</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"60대","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"60","age_to":"69"}' /> 60대</label>
												<label><input type="radio" name="color-map-age" data-option='{"api":"API_0302","filter":"population","showData":"population","data_nm":"70대 이상","unit":"명"}' data-parameters='{"year":"${censusDataYear }","age_from":"70","age_to":"150"}' /> 70대 이상</label>
											</div>
											<div id="age-chart" class="radio-chart"></div>
											<p class="origin_txt_2" style="padding:0;">출처 : ${censusDataYear } 인구주택총조사</p>
										</div>
									</li>
									<li><a class="Title" href="#" data-type="house">주택종류</a>
										<div class="chart">
											<div class="radio">
												<label><input type="radio" name="color-map-house"  checked="checked" data-option='{"api":"API_0306","filter":"house_cnt","showData":"house_cnt","data_nm":"아파트","unit":"호"}' data-parameters='{"year":"${censusDataYear }","house_type":"02"}' /> 아파트</label>
												<label><input type="radio" name="color-map-house" data-option='{"api":"API_0306","filter":"house_cnt","showData":"house_cnt","data_nm":"연립/다세대","unit":"호"}' data-parameters='{"year":"${censusDataYear }","house_type":"03,04"}' /> 연립/다세대</label>
												<label><input type="radio" name="color-map-house" data-option='{"api":"API_0306","filter":"house_cnt","showData":"house_cnt","data_nm":"단독주택","unit":"호"}' data-parameters='{"year":"${censusDataYear }","house_type":"01"}' /> 단독주택</label>
												<label><input type="radio" name="color-map-house" data-option='{"api":"API_0306","filter":"house_cnt","showData":"house_cnt","data_nm":"기타","unit":"호"}' data-parameters='{"year":"${censusDataYear }","house_type":"10"}' /> 기타</label>
											</div>
											<div id="house-chart" class="radio-chart"></div>
											<p class="origin_txt_2" style="padding:0;">출처 : ${censusDataYear } 인구주택총조사</p>
										</div>
									</li>
									<%
									//TODO 20160805 오승찬 요구사항 : 소지역 정보 - "자가/임차" 쪽 hidden 처리
									/*
									<li style="display:none"><a class="Title" href="#" data-type="household">자가/임차</a>
										<div class="chart">
											<div class="radio">
												<label><input type="radio" name="color-map-ocptn" value="1" checked="checked" data-option='{"api":"API_0305","filter":"household_cnt","showData":"household_cnt","data_nm":"자가","unit":"가구"}' data-parameters='{"year":"${censusDataYear }","ocptn_type":"1"}'> 자가</label>
												<label><input type="radio" name="color-map-ocptn" data-option='{"api":"API_0305","filter":"household_cnt","showData":"household_cnt","data_nm":"임차","unit":"가구"}' data-parameters='{"year":"${censusDataYear }","ocptn_type":"2,3,4,5,6"}'> 임차</label>
											</div>
											<div id="household-chart" class="radio-chart"></div>
											<p class="origin_txt_2" style="padding:0;">출처 : ${censusDataYear } 인구주택총조사</p>
										</div>
									</li>
									*/
									 %>
									<li><a class="Title" href="#" data-type="company">사업체 수</a>
										<div class="chart">
											<div class="radio">
												<label><input type="radio" name="color-map-company" checked="checked" data-option='{"api":"API_0301","filter":"employee_cnt","showData":"employee_cnt","data_nm":"종사자 수","unit":"명"}' data-parameters='{"year":"${companyDataYear }"}' /> 종사자 수</label>
												<label><input type="radio" name="color-map-company" data-option='{"api":"API_0301","filter":"corp_cnt","showData":"corp_cnt","data_nm":"사업체 수","unit":"개"}' data-parameters='{"year":"${companyDataYear }"}' /> 사업체 수</label>
											</div>
											<div id="company-chart" class="radio-chart"></div>
											<p class="origin_txt_2" style="padding:0;">출처 : ${companyDataYear } 전국사업체조사</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
	   				</dd>
	   				<!-- 2017.11.06 [개발팀] LBDMS 데이터 연계  START-->
	   				<dt style="display:none;"><a href="javascript:void(0)" id="data-board-dt-5"><span class="areaSpan">아산시 고유정보</span></a></dt>
	   				<dd style="display:none;">
	   					<ul id="asan-area" class="RadioTab" style="display:none;">
	   						<li><a href="#" id="returnToFarming">
	   						<img src="/img/house/icon_HML0003_ov.png" alt="">귀농<img src="/img/house/index_type_poi.png" alt="POI" />
	   						</a></li>
	   						<li><a href="#" id="pastoralHouse">
	   						<img src="/img/house/icon_HML0003_ov.png" alt="">전원주택 단지<img src="/img/house/index_type_color.png" alt="색지도" />
	   						</a></li>
   						</ul>
   						<ul id="lbdms-area" class="RadioTab" style="display:none;">
   						</ul>
	   				</dd>
	   				<!-- 2017.11.06 [개발팀] LBDMS 데이터 연계  END-->
	   			</dl>
			</div>
		</div>
	</div>
</div>  