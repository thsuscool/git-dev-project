<%
/**************************************************************************************************************************
* Program Name	: 살고싶은 우리동네 Left메뉴에서 분류 얻는것 JSP	
* File Name		 : getClassElement.jsp
* Comment			 : 
* History			 : 2015-12-8
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
<c:forEach var="map" items="${mlsfcLists }" varStatus="depth">
	<c:forEach var="depthName" items="${map.key }">
		<c:if test="${mlsfcLists[depthName].info.recmd_region_search_disp_yn=='Y' }">
			<li class="index${depth.count } ${depth.count==1?'M_on':''}">
				<a href="#" class="indexL" data-id="${depthName }"><img src="${pageContext.request.contextPath}/img/house/icon_${depthName }_ov.png" alt="${mlsfcLists[depthName].info.b_class_idx_nm }" />${mlsfcLists[depthName].info.b_class_idx_nm }</a>
				<ul>
					<c:forEach var="indicator" items="${mlsfcLists[depthName].indicator }" varStatus="status">
						<c:forEach var="mlsfc" items="${indicator.key }">
							<%//TODO 오승찬 주무관이 주거현황보기 지표선택에서 자연은 디폴트로 녹지비율로 해달라고 해서 현재 이렇게 개발 되어있음 필요 없으면 activeMclass를 삭제해주시고 ${status.index==0 } 로 대체해주시면 됩니다. %>
							<c:set var="activeMclass">
								<c:choose>
									<c:when test="${depthName=='HML0001' }">
										${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id=='HMM0003' }
									</c:when>
									<c:otherwise>
										${status.index==0 }
									</c:otherwise>
								</c:choose>
							</c:set>
							<li class="${depth.count==1&&activeMclass&&!param.recommend?'M_on':'' } sub-class ${param.recommend?'UnSelect':'' }"
							title="${fn:replace((param.recommend?fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].recomend_area_search_exp):fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].abbrev_exp)), cn, br) }" 
							data-text="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }">
							<%
							/*
								추천지역찾기 지표설정
								default_value ( 0 = 3, 1 = 1)	0 : 첫번째	1 : 두번째
								order_base	1 : 좋음 / 나쁨	2 : 높음 / 낮음	3 : 넓음 / 좁음	4 : 많음 / 적음
								order_base_disp	0 : 첫번째만	1 : 두번째만	2 : 모두 표시
							*/
							 %>
								<a href="#" data-subj="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }" 
									data-parent-id="${depthName }" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" 
									data-level="${mlsfcLists[depthName].indicator[mlsfc].disp_level }" 
									data-text="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }"
									data-asis-order="">
									<img src="${pageContext.request.contextPath}/img/house/icon_${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }_ov.png" alt="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }" />${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }
								</a>
								<c:if test="${param.recommend }">
									<span class="bagic">기준지역지표<strong></strong></span>
									<span class="SetStart">
										정렬기준
										<c:set var="orderbyBase1">
											<c:choose>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='1' }">좋음<c:set var="orderbyBase2" value="나쁨"/></c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='2' }">높음<c:set var="orderbyBase2" value="낮음"/></c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='3' }">넒음<c:set var="orderbyBase2" value="좁음"/></c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='4' }">많음<c:set var="orderbyBase2" value="적음"/></c:when>
												<c:otherwise>
													좋음<c:set var="orderbyBase2" value="나쁨"/>
												</c:otherwise>
											</c:choose>
										</c:set>
										<c:choose>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '0' }">
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'M_on':''}" value="3" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase1 }</button>
											</c:when>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '1' }">
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==1?'M_on':''}" value="1" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase2 }</button>
											</c:when>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '2' }">
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'M_on':''}" value="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'3':'1'}" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase1 }</button>
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==1?'M_on':''}" value="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'1':'3'}" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase2 }</button>
											</c:when>
										</c:choose>
									</span>
									<span class="SetStepBar1">
									  가중치 
										<span>
											<span class="SetStopPoint" title=""></span>
										</span>
									</span>
								</c:if>
									<c:if test="${!param.recommend }">
										<span class="MapKind type${mlsfcLists[depthName].indicator[mlsfc].disp_level }">
											<c:choose>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='1' }">시도</c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='2' }">시군구</c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='3' }">읍면동</c:when>
											</c:choose>
										</span>
									</c:if>
								<c:if test="${param.recommend }">
									<!-- <span class="SetStepBar">
										<a class="SetStopPoint" href="#" title=""></a>
						            </span> -->
								</c:if>
							</li>
						</c:forEach>
						</c:forEach>
				</ul>
			</li>
		</c:if>
	</c:forEach>
</c:forEach>