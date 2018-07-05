<%
/**************************************************************************************************************************
* Program Name  : 마이페이지 JSP  
* File Name     : mypage.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
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
    <title>마이페이지 | 통계지리정보서비스</title>
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css' />
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />	
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
       
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
    <script src="/js/common/common.js"></script>
    
    <script src="/js/mypage/mypage.js"></script>
    <script src="/js/board/jquery.paging.js"></script>   
            
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	
	
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/mypage/mypage.css" />
<!--     <link rel="stylesheet" type="text/css" href="/css/handsontable.css">  -->
    <!-- <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>-->
    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script> 
<!--     <script type="text/javascript" src="/js/plugins/handsontable.js"></script> -->
    <script type="text/javascript" src="/js/mypage/mypageEtc.js"></script>
    
    <!-- 2016.03.23 j.h.Seok -->
    <link rel="stylesheet" type="text/css" href="/css/handsontable.full.css" />
    <script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>
    
    <!--[if lt IE 9]>
		<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
	<![endif]-->

	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	
		
</head>

<body>
<!-- //2015-09-10 수정 -->
<!-- 	<script type="text/javascript"  src="/softcamp/scwebsc.js"></script> -->
	<div id="wrap">		
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		
	    <!-- body -->
	     <div id="container">
			<p class="path">
				<span class="path_el current">회원가입</span>&nbsp;&gt;
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/mypage/mypage"><span class="path_el current">마이페이지</span></a>
			</p>
			
			
			<div class="containerBox">  
				<div class="mpSubTitle">
					<h3>마이페이지 사용자 관리</h3>
					<p>SGIS plus를 이용에 따라 저장된 서비스 조회목록 및 업로드 데이터, 회원정보 등의 관리를 할 수 있습니다.</p>
					<a href="/view/mypage/mysubpage" class="btnType02">회원정보관리</a> 
				</div>  
		 
			</div>  
			
			<ul class="latest">
				<li>
					<h4><a href="/view/mypage/bookmark">즐겨찾기</a></h4>
					<p>SGIS+plus를 이용하면서 저장한 서비스 조회  이력으로 조회결과를 재조회하거나 저장된 목록을 관리할 수 있습니다.</p>
				</li>
				<li>
					<h4><a href="/view/mypage/myData/dataList">나의 데이터</a></h4>
					<p>개인이 수집하거나 작성한 데이터를 업로드한 목록을 조회, 관리할 수 있으며, 데이터 표출항목 설정을 통해 SGIS+plus에 활용할 수 있습니다.</p>
				</li>
				<li>
					<!-- <h4><a href="http://sgis.kostat.go.kr/developer/html/openApi/app/myApp.html">나의 인증키</a></h4> -->
					<h4><a href="/developer/html/openApi/app/myApp.html">나의 인증키</a></h4>
					<p>SGIS+plus의 오픈플랫폼의 개발자 사이트에서 공개된 데이터 및 개발예제를 활용하기 위한 인증키를 관리할 수 있습니다.</p>
				</li>
				<li>
					<!-- 20160727 나광흠 수정내용 : 나의 커뮤니티 링크 변경 -->
					<h4><a href="/view/mypage/community">나의 소통지도</a></h4>
					<p>개설 및 참여중인 소통지도를 확인할 수 있습니다.</p>
				</li>
			
			</ul>
			<%-- 		
			<!-- <h2 class="ctit">회원정보</h2>
			<p class="smr">변경된 회원정보에 따라 항목을 수정하여 주시기 바랍니다.</p> -->
			<!-- <div id="contents">
				<div id="content">
					<div class="account-join account-modify">
						<form action="#" method="post" class="account-info">
							<fieldset>
								<div class="f-el">
									<span class="el-h">
										<label for="uid">아이디</label>
									</span>
									<span class="el-b">
										<input type="text" id="uid" readonly="readonly" value="" class="ti10" /><a href="/view/mypage/mysubpage" class="cert">정보관리</a>
									</span>
								</div>
							</fieldset>
						</form>
					</div>
	
					<div class="mem_info_history">
						<dl>
							<dt>나의 통계 목록</dt>
							<dd>대화형통계지도에서 북마크(즐겨찾기)한 목록입니다.</dd>
						</dl>
					</div>
					<div id="article-wrap">
						게시물 목록 
						<div class="article-list type2">
							<ul>
								<li>								
									<div id="mypage_lists_div3"></div>
								</li>
							</ul>
						</div>
						<div id="mypage_lists_paging" align="center" style="width: 100%;">			
						</div>
						페이지 네이션
						<div id="mypage_lists_paging" class="pagenation" align="center" style="width: 100%;">
							<span class="pages"><a href="" class="page">1</a></span>
						</div>
						<br>
						<br>
						<br>															
						페이지 네이션
					</div>
					
					
					<div class="mem_info_history">
						<dl>
							<dt>나의 데이터 목록1</dt>
							<dd>업로드된 개인 데이터 목록입니다. <a href="/view/mypage/dataList" class="cert">파일관리</a></dd>
						</dl>
					</div>
					
					<div id="article-wrap-file">
						
						<div class="article-list type2">
							<ul>
								<li>								
									<div id="mypage_lists_div4"></div>
								</li>
							</ul>
						</div>
						
						<div id="mypage_lists_paging_file" class="pagenation" align="center" style="width: 100%;">
							<span class="pages"><a href="" class="page">1</a></span>
						</div>
						<br>
						<br>
						<br>															
						
					</div>
					
				</div>
			</div>	 -->	--%>
		</div>
	    	 	    
	   	<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>		
	</div>	
</body>
</html>