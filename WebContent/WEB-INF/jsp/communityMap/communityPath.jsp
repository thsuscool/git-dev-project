<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<p class="path">
	<a href="${pageContext.request.contextPath}/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
	<a href="${pageContext.request.contextPath}/view/common/serviceMain"><span class="path_el">활용서비스&nbsp;&nbsp;>&nbsp;</span></a>
	<c:url var="introUrl" value="/view/community/intro">
		<c:forEach var="parameterItem" items="${param }">
			<c:if test="${parameterItem.key!='cmmnty_map_id'&&parameterItem.key!='post_no' }">
				<c:param name="${parameterItem.key }" value="${parameterItem.value }"/>
			</c:if>
		</c:forEach>
	</c:url>
	<a href="${introUrl }"><span class="path_el">통계소통지도&nbsp;&nbsp;>&nbsp;</span></a>
	${appendPath }
</p>