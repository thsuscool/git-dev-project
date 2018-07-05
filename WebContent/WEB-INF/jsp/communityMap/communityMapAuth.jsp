<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>통계소통지도</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/nm.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui-1.10.4.custom.css">
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/ui.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/html5shiv.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/sop.portal.absAPI.js"></script>
<%-- 	<link rel="shortcut icon" href="${pageContext.request.contextPath}/img/ico/n_favicon.png"/> --%>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/communityMap.css" />
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script>
		$(window).on("pageshow", function(e) {
			if(e.originalEvent.persisted) {
				location.reload(true);
			}
		});
		function getSession(auth){
			if(auth.authStatus===true){
				location.href="<c:out value="${param.returnPage}"/>";
			}else{
				location.href="/view/member/login_new?returnPage=<c:out value="${param.returnPage}"/>";
			}
		}
	</script>
</head>

<body style="background: none;">
	<footer id="footer" style="display:none;">
		<jsp:include page="/view/common/includeBottom"></jsp:include>
	</footer>
</body>

</html>