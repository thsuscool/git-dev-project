<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%
	String sgisUseBoardSeq = (String)request.getParameter("sgisUseBoardSeq");
	String sgisUseAreaCd = (String)request.getParameter("sgisUseAreaCd");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	String nowPage = (String)request.getParameter("nowPage");
	
	if(nowPage == null){
		nowPage = "1";
	}
%>
<!doctype html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">




</style>
<script src="./scripts/libs/jquery-1.11.1.min.js"></script>
<script src="./scripts/ui.js"></script>


<script type='text/javascript' src='/js/plugins/jquery.min.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-1.11.1.min.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
<script type='text/javascript' src='/js/plugins/jquery.sha256.js'></script>
<script type='text/javascript' src='/js/plugins/common.js'></script>
<script type='text/javascript' src='/js/plugins/ui.js'></script>

<script src='/js/plugins/durian-v2.0.js'></script>
<script src='/js/common/sop.portal.absAPI.js'></script>

<!-- <link rel='shortcut icon' href='/img/ico/n_favicon.png'/> -->

<script type="text/javascript" src="/js/common/common.js"></script>


<title>SGIS에듀 게시판 | 통계지리정보서비스</title>
<script>


var nowPage = "<%=nowPage%>";
var listSize = 10;			//한페이지에 표시될 리스트의 갯수
var pageSize = 10;			//한페이지에 표시될 페이지의 갯수


if(nowPage == ""){
	nowPage = 1;
}
var smallIdx = 1;
var bigIdx = 1; 
var totCnt = 0;
var sgisUseAreaCd = "";
var searchCont = "";
var searchGb = "";

 $(function () {
	init();
 });
 
function init(){
	getEduBoardList();
	
} 

 
 //총 게시물 수를 가져온다
 function getEduBoardList(){
	 

	 
	 var dataObj = new Object();
	 
	 
	 dataObj.gubun = "getEduBoardList";
	 dataObj.nowPage = nowPage;
	 dataObj.listSize = listSize;
	 
	 if("" != $("#board_cd").val()){
		 dataObj.board_cd = $("#board_cd").val();
	 }
	 
	 if("" != $("#search_text").val()){
		 alert("in searchTExt");
		 if($("#search_gb").val()== "1"){
			 alert("1");
			 dataObj.post_title = $("#search_text").val();
			 dataObj.post_content = $("#search_text").val();
			 dataObj.selectGb = "ALL";
		 }
		 if($("#search_gb").val()== "2"){
			 alert("2");
			 dataObj.post_title = $("#search_text").val();
			 dataObj.selectGb = "TIT";
			 
		 }
		 if($("#search_gb").val()== "3"){
			 alert("3");
			 dataObj.post_content = $("#search_text").val();
			 dataObj.selectGb = "CON";
			 
		 }
	 }
	 

	 
	 jQuery.ajax({
 	 		type:"POST",
 	 		url: "/ServiceAPI/edu/eduMain.json",
 	 		data : dataObj,
 	 		success:function(data){
 	 			////////////////////paging 처리 start //////////////////////
				 	 var eduListCnt = data.result.eduListCnt;
				 	createPage(eduListCnt);
				////////////////////paging 처리 end //////////////////////
				 	 
				 	 
				 	 
 	 				var listHtml = "";
 	 				for(var i=0; i<data.result.eduList.length; i++){
 	 					listHtml +=data.result.eduList[i].board_no + data.result.eduList[i].post_title + "<br />";
 	 				}
 	 				
 	 				$("#listArea").html(listHtml);

				
 	 		},
 	 		error:function(data) {
				alert("error");
 	 		}
 		});
 }
 
 function pageMove(nPage){
	 
	 nowPage = nPage;
	 getEduBoardList();
} 
 
 
 //paging 처리 로직
 function createPage(eduListCnt){
	 
	 var sPage = 1;

 	 
 	 if(nowPage%10 != 0){
	 	 sPage = parseInt(nowPage / pageSize)*pageSize +1;
 	 }else{
	 	 sPage = parseInt((nowPage-1) / pageSize)*pageSize +1 ;
 	 }
 	 

 	 ePage = sPage + (pageSize-1);
 	 
 	 if(parseInt(eduListCnt/listSize) < ePage){
 		ePage = parseInt(eduListCnt/listSize)+1;
 	 }
 	 
 	 
 	var prePage = sPage-1;
 	var nextPage = parseInt(ePage+1);
 	if(prePage < 1){
 		prePage = 1;
 	}
 	if(nextPage > parseInt(eduListCnt /listSize + 1)){
 		nextPage = parseInt(eduListCnt /listSize + 1);
 	}
 	
 	
 	var pagingText = "<a href='javascript:pageMove(" + prePage + ");'>" + "<" + " </a>";
 	
 	 for(var i= sPage; i<=ePage; i++){
 		var color = "black";
 		 if(i==nowPage){
 			color = "red";
 		}
 		pagingText += "<a href='javascript:pageMove(" + i + ");'> <font color='" + color +"'>" + i + "</font> </a> ";
 	 }
 	pagingText += "<a href='javascript:pageMove(" + nextPage + ");'>" + ">" + " </a>";
 	 
		$("#pageArea").html(pagingText);
 }

$(document).ready(function(){
	
	 $("#btn_search").on('click',(function(e){
		 nowPage = "1";
		 getEduBoardList();
  	  }));

});
</script>
</head>
<body>
	<div id="listArea">
	</div>
	
	<div id="pageArea">
	</div>
	<div>
		분류 : 
		<select id="board_cd">
			<option value=''>전체</option>
			<option value='A'>분류1</option>
			<option value='B'>분류1</option>
			<option value='C'>분류3</option>
		</select>
		종류 : 
		<select id="search_gb">
			<option value='1'>제목+내용</option>
			<option value='2'>제목</option>
			<option value='3'>내용</option>
		</select>
		<input type="text" id="search_text" size="10"></input>
		<input type="button" id="btn_search" value="검색"></input>
	</div>
</body>
</html>
