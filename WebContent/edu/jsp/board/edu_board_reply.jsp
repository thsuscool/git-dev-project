<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%

	String board_no = (String)request.getParameter("board_no");
	String board_rep_no = (String)request.getParameter("board_rep_no");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	String nowPage = (String)request.getParameter("nowPage");
	
	if(nowPage == null){
		nowPage = "1";
	}
%>

<!DOCTYPE html>
<html lang="ko"> 
<head>
<meta charset="utf-8" />  
<meta name="format-detection" content="telephone=no" /> 
<title>SGIS 통계지리정보서비스</title>         
<link rel="stylesheet" href="/edu/jsp/board/include/css/common.css" type="text/css" /> 
<link rel="stylesheet" href="/edu/jsp/board/include/css/notice.css" type="text/css" /> 
<script type="text/javascript" src="/edu/include/js/ui.js"></script>    

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
var nowPage = "<%=nowPage %>";
var searchCont = "<%=searchCont %>";
var searchGb = "<%=searchGb %>";
//mng_s  20170801 로그 추가
apiLogWrite3("Q08","SGIS 게시판 조회");
//mng_e  20170801 로그 추가
var paramStr = "nowPage=" + nowPage +  "&searchCont=" + searchCont + "&searchGb=" + searchGb;


function getEduBoardView(){
	 var dataObj = new Object();
	 dataObj.gubun = "getEduBoardView";
	 dataObj.board_no = "<%= board_no%>";
	 dataObj.board_rep_no = "<%= board_rep_no%>";
	 
	 
	 
	 jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/edu/eduMain.json",
	 		data : dataObj,
	 		success:function(data){
	 			$("#board_cd").val(data.result.getEduBoardView.board_cd);
	 			var board_cd_nm = "";
	 			if(data.result.getEduBoardView.board_cd == "A"){
	 				board_cd_nm = "자유";
	 			}else if(data.result.getEduBoardView.board_cd == "B"){
	 				board_cd_nm = "이벤트";
	 			}
	 			$("#board_cd_nm").html(board_cd_nm);
	 			
	 			$("#post_title").val(data.result.getEduBoardView.post_title);
	 			
	 			
	 			var postContentStr = data.result.getEduBoardView.post_content;
	 			postContentStr = replaceAll("<br />", "\n", postContentStr);
	 			postContentStr += "\n\n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n";
	 			$("#post_content").val(postContentStr);
	 			//$("#ref_file").val(data.result.getEduBoardView.ref_file);

				
	 		},
	 		error:function(data) {
				alert("error");
	 		}
		});
	 
}

function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
}

 function getEduBoardReply(){
	 

	 
	 var dataObj = new Object();
	 
	 
	 dataObj.gubun = "getEduBoardReply";
	 dataObj.board_no = "<%= board_no%>";
	 dataObj.boanCode = $("#boan_code").val();
	 dataObj.board_cd = $("#board_cd").val();

	 
	 if($("#ref_file").val() != "" && $("#real_file_name").val() != ""){
			dataObj.ref_file = $("#ref_file").val();
			dataObj.real_file_name = $("#real_file_name2").val();
			
			
	}
	
	 if($("#post_title").val() != ""){
			dataObj.post_title = $("#post_title").val();
	}else{
		alert("글 제목을 입력해 주세요");
		return false
	}

	 if($("#post_content").val() != ""){
			dataObj.post_content = $("#post_content").val();
	}else{
		alert("글 내용을 입력해 주세요");
		return false
	}

	 
	 
	 jQuery.ajax({
 	 		type:"POST",
 	 		url: "/ServiceAPI/edu/eduMain.json",
 	 		data : dataObj,
 	 		success:function(data){
 	 					if(!data.result.isResponseCorrect){
 	 						alert("보안코드를 잘못 입력하셨습니다");
 	 						boanNumber();
 	 					}else{
 	 					//mng_s  20170801 로그 추가
 	 						apiLogWrite3("Q09","SGIS 게시판 글 등록");
 	 					//mng_e  20170801 로그 추가
 	 						location.href = "/edu/jsp/board/edu_board_list.jsp";
 	 					}
 	 					
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
 
 
 
 function fileName(value) {
		var fileName = value.substring(value.lastIndexOf('\\') + 1);
		$("#fileName").val(fileName);
		var file = $("#req_file_real").val();
	}

$(document).ready(function(){
	
	getEduBoardView()
	
	$("#req_file_search").on('click', (function(e) {
		$("#real_file_name").click();
	}));
	
	$("#reloadBtn").on('click', (function(e) {
		boanNumber();
	}));
	
	$("#replyBtn").on('click', (function(e) {
		getEduBoardReply();
	}));
	
	$("#listBtn").on('click', (function(e) {
		location.href = "/edu/jsp/board/edu_board_list.jsp?" + paramStr;
	}));

	
	
	
	
	$("#real_file_name").on('change', (function(e) {
		var form1 = new FormData(document.getElementById("formData1"))
		jQuery.ajax({
			async : true,
			method : "post",
			url : "/ServiceAPI/edu/eduFileRegist.form",
			processData : false,
			data : form1,
			contentType : false,
			success : function(data) {
				alert("adsfasdfasdf");
				var jsonData = JSON.parse(data);
				$("#ref_file").val(jsonData.result.fileId);
				$("#real_file_name2").val(jsonData.result.fileName);
				
				
			},
			error : function() {
				alert("fail");
			}
		})
	}));

});

function boanNumber(){
	var secret_code_img = document.getElementById("secret_code_img");
    
    var tempCaptcha = "/jcaptcha?" + Math.random();
    secret_code_img.src = tempCaptcha;
}




//mng_s  20170801 로그 추가
function apiLogWrite3(api_id, title){
	//type, api_id, title, parameter, zoomLevel, adm_nm
	jQuery.ajax({
		type:"POST",
		url: "/ServiceAPI/common/APILogWrite.json",
		data:{	"type": "Q0",
			"api_id" : api_id,
			"title" : title,
			"parameter" : "없음",
			"zoomLevel" : "00",
			"adm_nm" : "전국"
		},
		async: true,
		success:function(data){ 
		//	alert("success");
		},
		error:function(data) {
		//	alert(data);
		}
	});
//	
	
}
//mng_e  20170801 로그 추가




</script>
</head>  
<body>      
	<div class="header" id="header">
		<h1>
			<a href="/"><img src="/edu/jsp/board/include/img/etc/etc_logo.png" alt="SGIS"></a>
			<a href="/edu/jsp/main.jsp"><img src="/edu/jsp/board/include/img/etc/edu_home.png" alt="SGIS" style="margin-left:-15px;"></a>
		</h1>
		<ul class="gnb">
			<li><a id="tit01" href="/edu/jsp/sub01.jsp">SGIS에듀가 알려주는 사회변화</a></li>
			<li><a id="tit02" href="/edu/jsp/sub05.jsp">생활에 유익한 SGIS에듀 체험</a></li>
			<li><a id="tit03" href="/edu/jsp/board/edu_board_list.jsp"  style="color:#ff8e70">이벤트게시판</a></li>
			<li><a id="tit02" href="/edu/jsp/game01.jsp">카드뒤집기</a></li>
			<li><a id="tit02" href="/edu/jsp/game02.jsp">OX퀴즈</a></li>
		</ul>
	</div>
	<div class="container">
		<div class="noticWrap">
			<div class="notic">
				<h1>SGIS에듀 게시판</h1>
				
				<table class="table02 mt40">
				<colgroup>
					<col style="width:190px">
					<col style="width:px">
				</colgroup>
				<tbody>
					<tr>
						<th>분류</th>
						<td><span id="board_cd_nm"></span>
							<select id="board_cd" style="height:0px; width:0px;">
								<option value="A">자유</option>
								<option value="B">이벤트</option>
								<!-- 
								<option>분류1</option>
								 -->
								<!-- 
								<option>분류1</option>
								 -->
							</select>
						</td>
					</tr>
					<tr>
						<th>보안코드</th>
						<td>
							<input type="text" class=" mr10 w200" id="boan_code" />
							<button class="mr10 tableBtn" id="reloadBtn">Reload</button>
							<!-- 
							<button class="mr10 tableBtn">1234</button>
							 -->
							 <img id="secret_code_img" src="/jcaptcha" style="margin-left: 10px; vertical-align: middle;" alt="보안코드"/>
						</td>
					</tr>
					<tr>
						<th>글제목</th>
						<td>
							<input type="text" class=" mr10 w798" id="post_title" />
						</td>
					</tr>
					<tr>
						<th>글내용</th>
						<td>
							<textarea class=" mr10" id="post_content"></textarea>
						</td>
					</tr>
					<tr style="height:40px;">
						<th>파일첨부</th>
						<td>
						<span style="height:30px;"> 
						<form id="formData1" name="formData1" method="post"
								enctype="multipart/form-data" class="account-info">
							<input type="text" class=" mr10 w200"  id="ref_file" readonly="readonly"/>
					<input type="text" id="real_file_name2" />
							<input id="real_file_name"  type="file"
								name="real_file_name" style="cursor: pointer; width:0px; height:0px;" >
							</form>
						</span>
						<div style="position: relative; left:230px; top:-30px; height:0px;">
							<button class="mr10 tableBtn" id="req_file_search">파일찾기</button>
						</div>
						</td>
					</tr>
					
				</tbody>
			</table>
			<div class="fr mt30">
				<!-- 
				<button class="noticButton bule mr10">삭제</button>
				<button class="noticButton bule mr10" id="updateBtn">수정</button>
				 -->
				<button class="noticButton orange mr10 " id="replyBtn">댓글등록</button>
				<button class="noticButton bule" id="listBtn" >목록</button>
			</div>
			
			
			
		</div>		
	</div>
	
</div>
</body>
</html> 