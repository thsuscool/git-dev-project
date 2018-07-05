<%
/**************************************************************************************************************************
* Program Name  : 알림마당 JSP  
* File Name     : sopBoardMain.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-17
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>알림마당 | 통계지리정보서비스</title>

	<link href="/css/default.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script src="/js/common/common.js"></script>
	
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />

</head>
<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div id="container">
			<p class="path">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/board/sopBoardMain"><span class="path_el current">알림마당</span></a>
			</p>
			<h2 class="ctit">알림마당</h2>
			<p class="smr">SGIS 의 다양한 소식과 정보를 제공하는 공간입니다.</p>
			<div id="contents">
				<div id="content">
	
					<div class="notic_earea">
						<ul>
							<li>
								<p><img src="/img/nm/icon_noticearea_01.gif" alt="" /></p>
								<dl>
									<!-- mng_s 20170908_김건민 -->
									<dt>SGIS플러스 소개</dt>
									<!-- mng_e 20170908_김건민 -->
									<dd class="narea_txt01">About SGIS Open Platform</dd>
									<!-- mng_s 20170913_김건민 -->
									<dd class="narea_txt02">SGIS플러스에 대한 연혁과 소개 및 서비스에 대한<br />
															자세한 안내정보를 제공합니다.</dd>
									<!-- mng_e 20170913_김건민 -->															
									<dd>
										<a href="/view/board/sopIntro">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li class="last">
								<p><img src="/img/nm/icon_noticearea_03.gif" alt="" /></p>
								<dl>
									<dt>설명과 공지</dt>
									<dd class="narea_txt01">Term & Notice</dd>
									<dd class="narea_txt02">SGIS 플러스에서 사용하는 각종 통계용어와 더불어<br />
															공지사항을 볼 수 있습니다.</dd>
									<dd>
										<a href="/view/board/expAndNotice">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>								
							</li>
							<li>
								<p><img src="/img/nm/icon_noticearea_04.gif" alt="" /></p>
								<dl>
									<dt>질문과 개선요청</dt>
									<dd class="narea_txt01">Question & Request</dd>
									<dd class="narea_txt02">자주하는 질문과 더불어, SGIS 플러스에 대해<br />
															궁금한 사항이나 요청사항에 대해 언제든지 물어볼 수<br />
															있습니다.
									</dd>
									<dd>
										<a href="/view/board/qnaAndRequest">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li class="last">								
								<p><img src="/img/nm/icon_noticearea_02.gif" alt="" /></p>
								<dl>
									<dt>자료신청</dt>
									<dd class="narea_txt01">Current of Data / Open API</dd>
									<dd class="narea_txt02">현재 SGIS 플러스에서 제공하는 데이터의 종류 및<br />
															현황을 제공합니다.</dd>
									<dd>
										<a href="/contents/shortcut/shortcut_05_02.jsp">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
	
				</div>
			</div>
		</div>

		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>