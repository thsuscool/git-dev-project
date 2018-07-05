<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE>
<html lang="ko">

<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<title>통계소통지도 공지사항 | 통계지리정보서비스</title>

	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/nm.css" />

	<script src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/communityCommon.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/notice/view.js"></script>
	<script src="${pageContext.request.contextPath}/js/board/jquery.paging.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/ckeditor/ckeditor.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/ui.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.form.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js"></script>

</head>

<body>
	<div id="wrap">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<div id="container">
			<c:set var="appendPath" scope="request">
				<c:url var="noticeListUrl" value="/view/community/notice/list">
					<c:forEach var="parameterItem" items="${param }">
						<c:if test="${parameterItem.key!='cmmnty_map_id'&&parameterItem.key!='post_no' }">
							<c:param name="${parameterItem.key }" value="${parameterItem.value }"/>
						</c:if>
					</c:forEach>
				</c:url>
				<a href="${noticeListUrl}"><span class="path_el">공지사항&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="#"><span class="path_el current">상세</span></a>
			</c:set>
			<jsp:include page="/view/community/communityPath"/>
			<h2 class="ctit">통계 소통지도 공지사항</h2>
			<p class="smr">
				SGIS 플러스의 통계 소통지도의 전체 공지사항을 볼 수 있습니다.
			</p>
			<div id="contents">
				<div id="content">
					<div id="article-wrap">
						<div class="tab_contents">
							<div class="notice_list">
								<h3 class="ptit"></h3>
								<div id="content">
									<div id="article-wrap">
										<div id="article-wrap">
											<div id="notice_list" class="exp_list" style="width: 100%;"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer id="footer">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>
</body>

</html>