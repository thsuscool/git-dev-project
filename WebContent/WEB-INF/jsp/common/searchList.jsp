<%
/**************************************************************************************************************************
* Program Name  : 연관검색 JSP  
* File Name     : errorCode.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>

<%
	String value="";
	value = request.getAttribute("searchKeyword")==null?"":(String)request.getAttribute("searchKeyword");
%>

<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>연관검색 | 통계지리정보서비스</title>
    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />	
	<link rel="stylesheet" type="text/css" href="/css/pm.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	
    <script type="text/javascript"  src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
    <script type="text/javascript"  src="/js/common/includeHead.js"></script>
	<script type="text/javascript"  src="/js/common/common.js"></script>
	<script type="text/javascript"  src="/js/common/map.js"></script>
	<script type="text/javascript"  src="/js/board/jquery.paging.js"></script>
	<script type="text/javascript"  src="/js/common/searchList.js"></script>
	<link href="/css/board/board.css" rel="stylesheet" type="text/css" media="screen">
	<script>
	
		var XssSearchKeyword = "<%=value%>";
	
		$(function(){
			var word = decodeURIComponent($(location).attr('search'));
			var word_idx = word.indexOf("=")+1;
			var post_title = word.substr(word_idx);
			
			$.ajax({
				type : "POST",
				data : {"post_title" : post_title},
				url: contextPath + "/ServiceAPI/board/boardLists_Word.json",
				success:function(data){
// 					alert("성공");
					console.log(data);
					var resultData = data.result;
					$.each(resultData.post_title_list,function(i){
						var ptitle_word_ex = resultData.post_title_list[i].post_content;
						var ptitle_word = resultData.post_title_list[i].post_title;
						var ptitle_word_start_idx = ptitle_word.indexOf("[");
						var ptitle_word_end_idx;
						var ptitle_word_kr;
						var ptitle_word_en;
						if(ptitle_word_start_idx >= 0 ){
							ptitle_word_end_idx = ptitle_word.indexOf("]")-ptitle_word_start_idx-1;
							ptitle_word_kr = ptitle_word.substr(0,ptitle_word_start_idx).trim();
							ptitle_word_en = ptitle_word.substr(ptitle_word_start_idx+1,ptitle_word_end_idx).trim();
						}else{
							ptitle_word_start_idx = ptitle_word.length;
							ptitle_word_kr = ptitle_word.substr(0,ptitle_word_start_idx).trim();
							ptitle_word_en = "";
						}
						
						if(post_title == ptitle_word_kr){
							$("#word_title").html(ptitle_word);
							$("#word_en").html(ptitle_word_en);
							$("#word_ex").html(ptitle_word_ex);
						}
					});
					if($("#word_title").text() == ""){
						$("#wordDiv").css("display","none");
					}else{
						$("#wordDiv").css("display","block");
					}
				},
				error:function(error){
// 					alert("에러");
				}
			})
// 			var word_ = decodeURIComponent($(location).attr('search'));
// 			var word_cnt = word_.indexOf("=")+1;
// 			var word = word_.substr(word_cnt);
// 			var arr = ["집계구","인구밀도","인구","행정구역","지도","경계","통계내비게이터","유동인구","면적","인구피라미드"];
// 			for(i=0; i< arr.length; i++){
// 				if(word === (arr[i])){
// 					$("#word_" + i).css("display","block");
// 				}
// 			}
		});
	</script>
	
</head>
<body>
	<div class="wrapper">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		
		<!-- body -->
	    <div id="container">
	    <p class="path">
			<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
			<a href="/view/common/searchList?searchKeyword="><span class="path_el current">검색</span></a>
		</p>
	    
    	<div id="content">

			<!-- 게시판 전체 영역// -->
			<div id="article-wrap">					
				<div class="drop_search">					
					<div class="drop_search_section">
						<p>연관 검색어</p>
						<div>								
							<span><span id="relWordSpan1"></span></span>								
							<span><span id="relWordSpan2"></span></span>
							<span><span id="relWordSpan3"></span></span>
							<span><span id="relWordSpan4"></span></span>
							<span><span id="relWordSpan5"></span></span>																		
						</div>
					</div>
				</div>				

				<!-- ( drop_search_result ) -->
				<div id="search_result"></div>					
				<!-- //( drop_search_result ) -->

				<!-- ( 지도 + POI 검색결과 ) -->
				<div class="search_map">
					<div class="map">							
						<div id="miniMap"  style="width:550px; height:450px;"></div>							
					</div>
					<div class="map_list">
						<div>
							<ul>
								<div id="poiListTable"></div>
							</ul>
						</div>
					</div>
				</div>
				<div id="poiListTablePage"></div>
				<!-- //( 지도 + POI 검색결과 ) -->

				<!-- 통계용어 설명 -->
				<div id="wordDiv" style="display:none;">
					<p style="color:#3792de; font-size:18px; font-weight:bold; line-height:18px; margin-bottom:17px;">통계용어 설명</p>
					<div style="margin-left:20px;padding:28px 0; border-bottom:1px solid #d6d6d6; border-top:1px solid #d6d6d6;">
							<p id="word_title" style="margin-bottom:20px;font-size:17px; line-height:16px; font-family:'나눔고딕B';color: #333;" ></p>
							<p id="word_en" style="margin-bottom:7px; color:#999"></p>
							<p id="word_ex" style="letter-spacing:-0.6px;"></p>
					</div>
				</div>
				<br><br><br><br>

				<!-- ( 인터랙티브맵 검색결과 ) -->
				<div id="sopListTable"></div>
				<div id="sopListTablePage"></div>										
				<!-- //( 인터랙티브맵 검색결과) -->
				<br><br><br><br>
				
				<!-- ( 통계주제도 검색결과 ) -->
				<div id="themeListTable"></div>
				<div id="themeListTablePage"></div>										
				<!-- //( 통계주제도 검색결과) -->
				<br><br><br><br>
				
				<!-- ( 행정구역통계 검색결과 ) -->
				<div id="kosisListTable"></div>
				<div id="kosisListTablePage"></div>	
				<br/>				
				</div>					
				<!-- //( 행정구역통계 검색결과 ) -->
			</div>
			<!-- //게시판 전체 영역 -->
		</div>	
		
		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
    </div>
</body>
</html>