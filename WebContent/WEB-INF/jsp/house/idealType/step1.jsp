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
<div id="ideal-type-step1">
	<div class="ContInfo">
		<h2><b>Step1.</b>관심사 / 부가정보 입력</h2>
		<p>나의 관심사와 라이프스타일이 반영된 간편 동네를 찾고 싶다면, 해당사항을 선택 또는 입력해보세요.<br /> 앞에 <img src="${pageContext.request.contextPath}/img/house/liketown_star.png" alt="필수" />가 표시된 항목은 필수 항목이므로 꼭 선택해주세요.</p>
	</div>

	<div class="ContBox step1">
		<c:forEach items="${idealTypeLists }" var="map">
			<c:forEach var="depthName" items="${map.key }">
				<dl>
					<dt><c:if test="${idealTypeLists[depthName].must_slctn_yn=='Y' }"><img src="${pageContext.request.contextPath}/img/house/liketown_star.png" alt="필수" /></c:if>${idealTypeLists[depthName].b_class_search_nm }</dt>
					<dd class="${idealTypeLists[depthName].search_type=='radio'||idealTypeLists[depthName].search_type=='checkbox'?'RadioGroup':'' }">
						<c:choose>
							<c:when test="${idealTypeLists[depthName].search_type=='location' }">
								<select id="ideal-type-sido-select" data-type="ideal-type"></select>
								<select id="ideal-type-sgg-select"></select>
							</c:when>
							<c:otherwise>
								<c:forEach items="${idealTypeLists[depthName].children }" var="idealTypeChildren">
									<c:forEach items="${idealTypeChildren.key }" var="ideal">
										<c:set var="defaultDataAttribute">
											data-search-item="true"
											data-type="radio"
											data-parent-id="${idealTypeLists[depthName].children[ideal].b_class_search_serial }"
											data-id="${idealTypeLists[depthName].children[ideal].m_class_search_serial }"
											data-title="${idealTypeLists[depthName].children[ideal].m_class_search_nm }"
											data-name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }"
											data-default="${idealTypeLists[depthName].children[ideal].base_slctn_yn }" 
										</c:set>
										<c:choose>
											<c:when test="${idealTypeLists[depthName].search_type=='image' }">
												<a 
													${defaultDataAttribute }
													href="#" class="${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'M_on':'' }"
													<c:if test="${fn:trim(idealTypeLists[depthName].children[ideal].det_exp)!=''}">title="${fn:replace(idealTypeLists[depthName].children[ideal].det_exp, cn, br)}"</c:if>>
													<span style="background-image: url(${pageContext.request.contextPath}/img/house/liketown_icon${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'_f':'' }.png);" />아이콘</span>${idealTypeLists[depthName].children[ideal].m_class_search_nm }
												</a>
											</c:when>
											<c:when test="${idealTypeLists[depthName].search_type=='radio'||idealTypeLists[depthName].search_type=='checkbox' }">
												<input 
													${defaultDataAttribute } 
													type="${idealTypeLists[depthName].search_type }" 
													name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }" 
													id="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }" 
													${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'checked="checked"':''}>
												<label data-name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }" for="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }" class="${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'on':''}">${idealTypeLists[depthName].children[ideal].m_class_search_nm }</label>
											</c:when>
										</c:choose>
									</c:forEach>
								</c:forEach>
							</c:otherwise>
						</c:choose>
					</dd>
				</dl>
			</c:forEach>
		</c:forEach>
	</div>
	<div class="BtnGroup">
		<button id="ideal-type-next" class="btnTypeG" type="button">다음</button>
	</div>
</div>
