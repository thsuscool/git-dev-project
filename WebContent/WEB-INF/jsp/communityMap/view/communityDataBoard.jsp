<%
/**************************************************************************************************************************
* Program Name  : 통계소통지도 데이터보드 JSP  
* File Name     : communityDataBoard.jsp
* Comment       : 
* History       : (주)유코아시스템 나광흠 2016-06-22
*
**************************************************************************************************************************/
%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<a href="javascript:void(0)" class="interactiveDataBoard">데이터보드</a>
<c:set var="regist_member_select">
	<c:if test="${communityMapInfo.usr_id == member_id }">
		<div class="search-select-box">
			<span>아이디 :</span> 
			<select name="search_usr_id">
				<option value="">전체</option>
				<c:forEach items="${regist_member_id_list }" var="usr_id">
					<option value="${usr_id }">${usr_id }</option>
				</c:forEach>
			</select>
		</div>
	</c:if>
</c:set>
<div class="dataSideBox">
	<div class="bar">
		<div id="dataSlider" class="dataSlider"></div> 
		<a href="javascript:void(0)"><img src="${pageContext.request.contextPath}/img/ico/ico_close02.png" alt="데이터보드 닫기" /></a>
	</div>
	<div class="dataSideContents">
		<div class="dataSideScroll">
			<div class="dataBoardDiv" style="display:block;">
	  			<dl class="dscList">
	   				<dt>
	   					<a href="javascript:void(0)" class="on">
	   						<span class="areaSpan"></span> 소통지도 의견 통계
   						</a>
 					</dt>
	   				<dd>
	   					<div id="region-stat" class="compareBox">
		   					<form id="region-stat-search-form">
								<c:set var="hasCountry" value="false"/>
								<c:set var="selectOption">
									<c:forEach items="${communityMapInfo.addAreaList }" var="area">
										<c:if test="${fn:trim(area.adm_cd)==''||fn:startsWith(area.adm_cd,'00') }">
											<c:set var="hasCountry" value="true"/>
										</c:if>
										<option value="${area.adm_cd }">${area.adm_nm }</option>
									</c:forEach>
								</c:set>
								<div class="search-box">
									<div class="search-select-box">
										<span>지역 :</span> 
										<select name="adm_cd">
											<c:if test="${!hasCountry }"><option value="">전국</option></c:if>
											${selectOption }
										</select>
									</div>
									${regist_member_select }
									<div class="submit-box">
										<button type="submit">검색</button>
									</div>
								</div>
							</form>
							<ul class="IndexStatusBar1 chart-type">
			   					<li class="M_on"><a href="#" data-value="column" data-type="region" class="on" id="pntColumn">막대형 차트</a></li>
			   					<li><a href="#" data-value="pie" data-type="region" id="pntPie">원형 차트</a></li>
			   					<li><a href="#" data-value="spider" data-type="region" id="pntSpider">방사형 차트</a></li>
			   					<li>
			   						<a href="#" data-value="all-data" data-type="region" id="allDataTable">모든데이터표</a>
			   						<ul id="region-type">
			   							<li class="M_on"><a href="#" data-region-type="sido" id="all_sido">시도</a></li>
			   							<li><a href="#" data-region-type="sgg" id="all_sgg">시군구</a></li>
			   							<li><a href="#" data-region-type="emdong" id="all_emdong">읍면동</a></li>
			   						</ul>
			   					</li>
			   				</ul>
			   				<div id="region-chart">
			   					<div class="chart" style="width:520px;height:303px;"></div>
								<div class="table">
									<div class="tables" style="position:static;">
										<table>
											<caption>의견 통계</caption>
											<thead><tr><td></td></tr></thead> 
											<tbody><tr><td></td></tr></tbody>
										</table>
									</div>
								</div>
			   				</div>
			   				<div id="region-all-data-table" class="tables" style="display:none;position: static;">
								<table id="data-header">
									<caption>의견 전체 데이터 보기</caption>
								</table>
								<div class="scrolls">
									<table id="data-body">
										<caption>해당지역 내 데이터 보기</caption> 
									</table>
								</div>
							</div>
	   					</div>
	   				</dd>
	   				<dt data-id="map-chart" style="display:none;">
	   					<a href="javascript:void(0)" class="on">
	   						<span class="areaSpan"></span> 선택된 통계 데이터
   						</a>
 					</dt>
	   				<dd data-id="map-chart" style="display:none;">
	   					<div id="map-stat" class="compareBox">
	   						<div class="typeBox">
								<a href="javascript:void(0)" class="first on">차트</a>
								<a href="javascript:void(0)">표</a>
							</div>
	   						<div class="normalBox" style="width:520px;height:303px;">
								<div class="chart" style="width:510px;height:303px;">
		   						</div>
							</div>
							<div class="tables">
								<table>
									<caption>해당지역 내 데이터 보기</caption>
									<thead>
										<tr>
											<th scope="col">항목</th>
											<th scope="col">순위</th>
											<th scope="col">값</th>
											<th scope="col">비율(%)</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table>
										<caption>해당지역 내 데이터 보기</caption> 
										<tbody id="barChartTable">
										</tbody>
									</table>
								</div>
							</div>
	   					</div>
	   				</dd>
	   			</dl>
			</div>
		</div>
	</div>
</div>  

