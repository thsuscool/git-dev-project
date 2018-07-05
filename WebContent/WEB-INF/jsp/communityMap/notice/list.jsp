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
		<script src="${pageContext.request.contextPath}/js/common/board.js"></script>
		<script src="${pageContext.request.contextPath}/js/communityMap/communityCommon.js"></script>
		<script src="${pageContext.request.contextPath}/js/communityMap/notice/list.js"></script>
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
				<a href="#"><span class="path_el current">공지사항</span></a>
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
							<div class="notice_list" style="display: block;">
								<h3 class="ptit"></h3>
								<div id="content">
									<div id="article-wrap">
										<div class="article-search2">
											<form action="#" method="POST">
												<fieldset style="margin-left: 165px;">
													<legend class="blind">
														게시물 검색
													</legend>
													<div class="f-el f-el-select">
														<span class="el-h blind"> <label for="atc-sel1">검색항목</label> </span>
														<span class="el-b select_box">
															<select id="notice_search_select" class="easyui-combobox" data-options="editable:false" name="searchsel" style="width: 155px; height: 40px; cursor: pointer;">
																<option value="post_title">제목</option>
																<option value="post_content">내용</option>
																<option value="post_all" selected="selected">제목 + 내용</option>
															</select> 
														</span>
													</div>
													<div class="f-el">
														<span class="el-h"> <label for="atc-kwd">검색어입력</label> </span>
														<span class="el-b">
															<input id="notice_search_title_text" class="easyui-textbox" type="text" name="search" style="width: 350px;" data-options="required:true" />
														</span>
													</div>
												</fieldset>
												<div class="sbm">
													<input style="cursor: pointer;" type="button" onclick="javascript:$notice.ui.search();" value="검색" />
												</div>
											</form>
										</div>
										<div id="article-wrap">
											<div id="notice_list" class="exp_list" style="width: 100%;"></div>
										</div>
										<div id="board_lists_paging" class="pagenation1" align="center" style="width: 100%;">
											<span class="pages"> <a href="" class="page">1</a></span>
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