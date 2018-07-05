<%@ page language="java" contentType="text/html;charset=utf-8"%>

<!-- 세션정보 포함한 jsp임. 개발서버에 올릴때엔 삭제요망 -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<%
	String sgisUseBoardSeq = (String)request.getParameter("sgisUseBoardSeq");
	String sgisUseAreaCd = (String)request.getParameter("sgisUseAreaCd");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	String nowPage = (String)request.getParameter("nowPage");
	String member_id = (String)request.getSession().getAttribute("member_id");
	
	
	if(member_id== null){
		response.sendRedirect("http://sgis.kostat.go.kr");	
	}

	
	if("^^".equals(searchCont)){
		searchCont = "";
	}

	if(sgisUseBoardSeq == null){
		response.sendRedirect("/jsp/share/useBoardList.jsp");
	}
	if(member_id == null){
		response.sendRedirect("/html/member/login_new.html");
	}
	
	
%>

<!doctype html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
<link rel="stylesheet" type="text/css" href="./styles/common.css" />
<link rel="stylesheet" type="text/css" href="./styles/layout.css" />
<link rel="stylesheet" type="text/css" href="./styles/nm.css" />
<link rel="stylesheet" type="text/css" href="./styles/application.css" />

<link rel="stylesheet" type="text/css" href="/html/include/css/default.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />






<style>
.file_input_hidden2 {
	width: 0;
	height: 0;
}
</style>
<script src="./scripts/libs/jquery-1.11.1.min.js"></script>
<script src="./scripts/ui.js"></script>
<script src="./scripts/common.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<!-- 
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
 -->
<!--[if lt IE 9]><script src="./scripts/libs/html5shiv.js"></script><![endif]-->

<script type="text/javascript" src="/js/common/includeHead.js"></script>

<script>

pageCountPlus();


function pageCountPlus(){
	jQuery.ajax({
		type:"POST",
		url: "/ServiceAPI/common/pageCallReg.json",
		data:{"hpage":"/jsp/share/useBoardModify.jsp"},
		success:function(data){
				
		},
		error:function(data) {

		}
	});
}

	var sgisUseBoardSeq = "<%=sgisUseBoardSeq%>";
	var sgisUseAreaCd = "<%=sgisUseAreaCd%>";
	var searchCont = "<%=searchCont%>";
	var searchGb = "<%=searchGb%>";
	var nowPage = "<%=nowPage%>";



	$(document).ready(function() {
		getCodeData('006');
		getCodeData('007');
		getCodeData('010');
		
		getUseBoardView();
		

		$("#boardInsertBtn").on('click', (function(e) {

			var sgisUseBoardTitle = "";
			var sgisUserName = "";
			var sgisUseGb = "";
			var sgisUsePurpose = "";
			var sgisUseAreaCd = "";
			var sgisUseData = "";
			var sgisUseDataOther = "";
			var sgisActCont = "";
			var sgisSiteUrl = "";
			var sgis_ref_data1 = "";
			var sgis_ref_data2 = "";
			var sgis_ref_data3 = "";
			var sgis_ref_data4 = "";
			var sgisRefImage = "";

			
			
			
			sgisUseBoardTitle = $("#sgisUseBoardTitle").val();
			sgisUserName = $("#sgisUserName").val();
			sgisUseGb = $("#sgisUseGb").val();
			sgisUsePurpose = $("#sgisUsePurpose").val();
			sgisUseAreaCd = $("#sgisUseAreaCd").val();
			sgisUseData = $("#sgisUseData").val();
			sgisUseDataOther = $("#sgisUseDataOther").val();
			sgisActCont = $("#sgisActCont").val();
			sgisSiteUrl = $("#sgisSiteUrl").val();
			
			sgis_ref_data1 = $("#sgis_ref_data1").val();
			sgis_ref_data2 = $("#sgis_ref_data2").val();
			sgis_ref_data3 = $("#sgis_ref_data3").val();
			sgis_ref_data4 = $("#sgis_ref_data4").val();
			sgisRefImage = $("#sgisRefImage").val();
			
			
			
			//val check
			//한글명, 내용, DB사이즈, 공백허용여부
			if(!isNullLengthCheck("제목", sgisUseBoardTitle, 2000, "N")){
				return false;
			}
			if(!isNullLengthCheck("활용자명", sgisUserName, 200, "N")){
				return false;
			}
			if(!isNullLengthCheck("이용자료(통계청)", sgisUseData, 2000, "Y")){
				return false;
			}
			if(!isNullLengthCheck("이용자료(타기관)", sgisUseDataOther, 2000, "Y")){
				return false;
			}
			if(!isNullLengthCheck("주요활동내용", sgisActCont, 3000, "N")){
				return false;
			}
			if(!isNumAlpCheck()){
				return false;
			}

			if (sgisUseData == "") {
				sgisUseData = "^^";
			}
			if (sgisUseDataOther == "") {
				sgisUseDataOther = "^^";
			}
			if (sgisSiteUrl == "") {
				sgisSiteUrl = "^^";
			}
			if (sgis_ref_data1 == "첨부파일 찾아보기" || sgis_ref_data1 =="") {
				sgis_ref_data1 = "^^";
			}
			if (sgis_ref_data2 == "첨부파일 찾아보기" || sgis_ref_data2 =="") {
				sgis_ref_data2 = "^^";
			}
			if (sgis_ref_data3 == "첨부파일 찾아보기" || sgis_ref_data3 =="") {
				sgis_ref_data3 = "^^";
			}
			if (sgis_ref_data4 == "첨부파일 찾아보기" || sgis_ref_data4 =="") {
				sgis_ref_data4 = "^^";
			}
			
			if (sgisRefImage == "첨부파일 찾아보기" || sgisRefImage =="") {
				sgisRefImage = "^^";
			}

			//활용사례 수정
			jQuery.ajax({
				type : "POST",
				url : "/ServiceAPI/share/useBoardInfo.json",
				data : {
					"gubun" : "useBoardUpdate",
					"sgisUseBoardSeq" : sgisUseBoardSeq,
					"sgisUseBoardTitle" : sgisUseBoardTitle,
					"sgisUserName" : sgisUserName,
					"sgisUseGb" : sgisUseGb,
					"sgisUsePurpose" : sgisUsePurpose,
					"sgisUseAreaCd" : sgisUseAreaCd,
					"sgisUseData" : sgisUseData,
					"sgisUseDataOther" : sgisUseDataOther,
					"sgisActCont" : sgisActCont,
					"sgisSiteUrl" : sgisSiteUrl,
					"sgis_ref_data1" : sgis_ref_data1,
					"sgis_ref_data2" : sgis_ref_data2,
					"sgis_ref_data3" : sgis_ref_data3,
					"sgis_ref_data4" : sgis_ref_data4,
					"sgisRefImage" : sgisRefImage
				},
				success : function(data) {
					window.location.href("/jsp/share/useBoardList.jsp");
				},
				error : function(data) {

				}
			});
		}));
		$("#req_file1").on('click', (function(e) {
			$("#req_file_real1").click();
		}));
		$("#req_file2").on('click', (function(e) {
			$("#req_file_real2").click();
		}));
		$("#req_file3").on('click', (function(e) {
			$("#req_file_real3").click();
		}));
		$("#req_file4").on('click', (function(e) {
			$("#req_file_real4").click();
		}));
		$("#req_file5").on('click', (function(e) {
			$("#req_file_real5").click();
		}));

		$("#req_file_real1").on('change', (function(e) {
			var form1 = new FormData(document.getElementById("formData1"))
			jQuery.ajax({
				async : true,
				method : "post",
				url : "/ServiceAPI/share/useBoardRegist.form",
				processData : false,
				data : form1,
				contentType : false,
				success : function(data) {
					var jsonData = JSON.parse(data);
					$("#sgis_ref_data1").val(jsonData.result.fileId);
				},
				error : function() {
					alert("fail");
				}
			})
		}));
		$("#req_file_real2").on('change', (function(e) {
			var form1 = new FormData(document.getElementById("formData2"))
			jQuery.ajax({
				async : true,
				method : "post",
				url : "/ServiceAPI/share/useBoardRegist.form",
				processData : false,
				data : form1,
				contentType : false,
				success : function(data) {
					var jsonData = JSON.parse(data);
					$("#sgis_ref_data2").val(jsonData.result.fileId);
				},
				error : function() {
					alert("fail");
				}
			})
		}));
		$("#req_file_real3").on('change', (function(e) {
			var form1 = new FormData(document.getElementById("formData3"))
			jQuery.ajax({
				async : true,
				method : "post",
				url : "/ServiceAPI/share/useBoardRegist.form",
				processData : false,
				data : form1,
				contentType : false,
				success : function(data) {
					var jsonData = JSON.parse(data);
					$("#sgis_ref_data3").val(jsonData.result.fileId);
				},
				error : function() {
					alert("fail");
				}
			})
		}));
		$("#req_file_real4").on('change', (function(e) {
			var form1 = new FormData(document.getElementById("formData4"))
			jQuery.ajax({
				async : true,
				method : "post",
				url : "/ServiceAPI/share/useBoardRegist.form",
				processData : false,
				data : form1,
				contentType : false,
				success : function(data) {
					var jsonData = JSON.parse(data);
					$("#sgis_ref_data4").val(jsonData.result.fileId);
				},
				error : function() {
					alert("fail");
				}
			})
		}));
		$("#req_file_real5").on('change', (function(e) {
			var form1 = new FormData(document.getElementById("formData5"))
			jQuery.ajax({
				async : true,
				method : "post",
				url : "/ServiceAPI/share/useBoardRegist.form",
				processData : false,
				data : form1,
				contentType : false,
				success : function(data) {
					var jsonData = JSON.parse(data);
					$("#sgisRefImage").val(jsonData.result.fileId);
				},
				error : function() {
					alert("fail");
				}
			})
		}));
	});
	
	function setFileDoc(text){
		if(text == null){
			text = "첨부파일 찾아보기";
		}
		return text;
	}
	
	
	//활용게시판 상세페이지 불러온다
	 function getUseBoardView(){
		 
		 
		 //활용사례 상세조회
		 jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/share/useBoardInfo.json",
	 		data:{	
	 				"gubun" 				: "useBoardView",
	 				"sgisUseBoardSeq" 		: sgisUseBoardSeq,
	 			  },
	 		success:function(data){
					var sgisUseBoardTitle = data.result[0].sgis_use_board_title;
					var sgisUserName = data.result[0].sgis_user_name;
					var sgisUseGb = data.result[0].sgis_use_board_gb;
					var sgisUsePurpose = data.result[0].sgis_use_purpose;
					var sgisUseAreaCd = data.result[0].sgis_use_area_cd;
					var sgisUseData = data.result[0].sgis_use_data;
					var sgisUseDataOther = data.result[0].sgis_use_data_other;
					var sgisActCont = data.result[0].sgis_act_cont;
					var sgisSiteUrl = data.result[0].sgis_site_url;
					var sgisRefData1 = data.result[0].sgis_ref_data1;
					var sgisRefData2 = data.result[0].sgis_ref_data2;
					var sgisRefData3 = data.result[0].sgis_ref_data3;
					var sgisRefData4 = data.result[0].sgis_ref_data4;
					var sgisRefImage = data.result[0].sgis_ref_image;
					var sgisProgressStat = data.result[0].sgis_progress_stat;
					
					$("#sgisUseBoardTitle").val(sgisUseBoardTitle);
					$("#sgisUserName").val(sgisUserName);
					$("#sgisUseGb").val(sgisUseGb);
					$("#sgisUsePurpose").val(sgisUsePurpose);
					$("#sgisUseAreaCd").val(sgisUseAreaCd);
					$("#sgisUseData").val(sgisUseData);
					$("#sgisUseDataOther").val(sgisUseDataOther);
					
					sgisActCont = replaceAll('<br />', '\n', sgisActCont);
					
					$("#sgisActCont").val(sgisActCont);
					$("#sgisSiteUrl").val(sgisSiteUrl);
					$("#sgis_ref_data1").val(setFileDoc(sgisRefData1));
					$("#sgis_ref_data2").val(setFileDoc(sgisRefData2));
					$("#sgis_ref_data3").val(setFileDoc(sgisRefData3));
					$("#sgis_ref_data4").val(setFileDoc(sgisRefData4));
					$("#sgisRefImage").val(setFileDoc(sgisRefImage));
				
	 		},
	 		error:function(data) {
	 			
	 		}
		});
	 }
	
	 function replaceAll(find, replace, str){
		 return str.replace(new RegExp(find, 'g'), replace);
	 }
	

	function fileName(value) {
		var fileName = value.substring(value.lastIndexOf('\\') + 1);
		$("#fileName").val(fileName);
		var file = $("#req_file_real").val();
	}

	//구분, 활용목적, 활용분야 select박스의 option을 세팅한다
	function getCodeData(code) {
		//검색의 콤보박스
		//sgisUseAreaCd
		jQuery.ajax({
			type : "POST",
			url : "/ServiceAPI/share/useBoardInfo.json",
			data : {
				"gubun" : "getCode",
				"code" : code
			},
			success : function(data) {
				for (var i = 0; i < data.result.length; i++) {
					var cont = "";
					cont = "<option value=\"" + data.result[i].sclas_cl + "\">"
							+ data.result[i].sclas_nm + "</option>";
					if (code == "006") {
						$("#sgisUseGb").append(cont);
					}
					if (code == "007") {
						$("#sgisUsePurpose").append(cont);
					}
					if (code == "010") {
						$("#sgisUseAreaCd").append(cont);
					}
				}
			},
			error : function(data) {
				alert("error");
			}
		});
	}

	function setEnterValueChange() {
		var key = window.event.keyCode;

		if (key == 13) {
			var text = document.getElementById("sgisActCont").value;
			;
			text = text.substring(0, text.length - 1);
			text = text + "\n";
			return false;
		} else {
			return true;
		}
	}
	
	//한글명, 내용, DB사이즈, 공백허용여부
	function isNullLengthCheck(text, param, size, gb){
		if(param == "" && gb == "N"){
			alert(text + "의 값이 입력되지 않았습니다.");
			return false;
		}else if((param.length+(escape(param)+"%u").match(/%u/g).length-1)>size){
			alert(text + "를 짧게 입력해 주세요");
			return false;
		}
		return true;
	}
	
	function isNumAlpCheck(){
		str = $("#sgisRefImage").val();
		if(str != "첨부파일 찾아보기"){
			if(!isNumOrEngChar(str)){
				alert("대표이미지는 영문과 숫자만 선택할 수 있습니다.");
				return false;
			}
		}
    	return true;
	}
	
    /*
	입력칸에 숫자&영문만 입력받기
	target	: 	html object(text,textarea)
*/
	function isNumOrEngChar(inText){
	var ret;
		for (var i = 0; i < inText.length; i++) {
			ret = inText.charCodeAt(i);
			
				if (!((ret>47 && ret<58) || (ret>64 && ret<91) || (ret>96&&ret<123) || (ret==95) || (ret==46)))
				{
					if(inText.substring(i, i+1) == "."){
						return true;
					}else{
						return false;
					}
				}
		}
		return true;
}
	
	
</script>
<title>활용사례 수정 | 통계지리정보서비스</title>
</head>
<body>
	<div id="wrap">
		<!-- header // -->
		 <header >
		<!-- Top Include -->
		<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		
		
		<!-- //header -->
		<div id="container">
			<p class="path">
				<a href="#"> <span class="path_el">처음페이지&nbsp;&nbsp;&gt;&nbsp;</span>
				</a> <a href="#"> <span class="path_el">활용갤러리&nbsp;&nbsp;&gt;&nbsp;</span>
				</a> <a href="#"> <span class="path_el current">활용사례 조회</span>
				</a>
			</p>
			<h2 class="ctit">활용사례 등록</h2>
			<p class="smr">이용자가 자료를 제공받아 직접 활용한 사례를 공유합니다.</p>
			<div class="tabs">
				<a href="/jsp/share/useBoardList.jsp">활용사례 조회</a> <a href="/jsp/share/useBoardRegist.jsp" class="active">활용사례 등록</a>
			</div>
			<div id="contents">
				<div id="content">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<div class="account-join data-modify">
							<form id="formData" name="formData" method="post"
								enctype="multipart/form-data" class="account-info">
								<fieldset>
									<div class="f-el">
										<span class="el-h"> <label for="sgisUseBoardTitle">제목</label>
										</span> <span class="el-b"> <input type="text" id="sgisUseBoardTitle" class="ti10" style="width: 723px;" />
										</span>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="sgisUserName">활용자명</label>
										</span> <span class="el-b"> <input type="text"
											id="sgisUserName" class="ti10" />
										</span>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="sgisUseGb">구분</label>
										</span> <span class="el-b"> <select
											class="selectbox bg-n  mr5" style="width: 254px;"
											id="sgisUseGb">
										</select>
										</span>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="sgisUsePurpose">활용목적</label>
										</span> <span class="el-b"> <select
											class="selectbox bg-n  mr5" style="width: 254px;"
											id="sgisUsePurpose">
										</select>
										</span>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="sgisUseAreaCd">활용분야</label>
										</span> <span class="el-b"> <select
											class="selectbox bg-n  mr5" style="width: 254px;"
											id="sgisUseAreaCd">
										</select>
										</span>
									</div>
									<div class="f-el">
										<span class="el-h lineHeight"> <label for="sgisUseData">이용자료<br />(통계청)
										</label>
										</span> <span class="el-b"> <input type="text"
											id="sgisUseData" class="ti10" style="width: 723px;" />
										</span>
									</div>
									<div class="f-el">
										<span class="el-h lineHeight"> <label
											for="sgisUseDataOther">이용자료<br />(타기관)
										</label>
										</span> <span class="el-b"> <input type="text"
											id="sgisUseDataOther" class="ti10" style="width: 723px;" />
										</span>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="sgisActCont">주요
												활용내용</label>
										</span>
										<div class="el-b">
											<textarea id="sgisActCont" 
												style="width: 723px; height: 100px; color: #666;"
												onkeypress="setEnterValueChange();"></textarea>
											<div class="desc02">통계정보 활용에 대한 개요, 적용대상 목적 등에 대한 계략적인
												설명을 해주세요.</div>
										</div>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="sgisSiteUrl">사이트
												URL</label>
										</span> <span class="el-b"> <input type="text"
											id="sgisSiteUrl" class="ti10" style="width: 723px;" />
										</span>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="census_file">참고자료</label>
										</span>
										<div class="el-b">
											<div>
												<input type="text" id="sgis_ref_data1" value="첨부파일 찾아보기"
													readonly="readonly" class="ti10 mt5" /> <span
													id="req_file1" class="check mt5">찾아보기</span>
											</div>
											<div>
												<input id="sgis_ref_data2" type="text" value="첨부파일 찾아보기"
													readonly="readonly" class="ti10 mt5" /> <span
													id="req_file2" class="check mt5">찾아보기</span>
											</div>
											<div>
												<input type="text" id="sgis_ref_data3" value="첨부파일 찾아보기"
													readonly="readonly" class="ti10 mt5" /> <span
													id="req_file3" class="check mt5">찾아보기</span>
											</div>
											<div>
												<input id="sgis_ref_data4" type="text" value="첨부파일 찾아보기"
													readonly="readonly" class="ti10 mt5" /> <span
													id="req_file4" class="check mt5">찾아보기</span>
											</div>
										</div>
									</div>
									<div class="f-el">
										<span class="el-h lineHeight"> <label
											for="sgisRefImage">대표이미지<br />/분석결과
										</label>
										</span> <span class="el-b"> <input type="text"
											value="첨부파일 찾아보기" id="sgisRefImage" readonly="readonly"
											class="ti10 " /> <span id="req_file5" class="check mt5">찾아보기</span>
										</span>
									</div>
								</fieldset>
								<div class="sbm">
									<input type="button" id="boardInsertBtn" value="등록신청" />
								</div>
							</form>
						</div>
					</div>
					<!-- //게시판 전체 영역 -->
				</div>
			</div>
		</div>
		<form id="formData1" name="formData1" method="post"
			enctype="multipart/form-data" class="account-info">
			<input id="req_file_real1" class="file_input_hidden2" type="file"
				name="req_file_real1" style="cursor: pointer;"
				onchange="javascript:fileName(this.value);">
		</form>
		<form id="formData2" name="formData2" method="post"
			enctype="multipart/form-data" class="account-info">
			<input id="req_file_real2" class="file_input_hidden2" type="file"
				name="req_file_real2" style="cursor: pointer;"
				onchange="javascript:fileName(this.value);">
		</form>
		<form id="formData3" name="formData3" method="post"
			enctype="multipart/form-data" class="account-info">
			<input id="req_file_real3" class="file_input_hidden2" type="file"
				name="req_file_real3" style="cursor: pointer;"
				onchange="javascript:fileName(this.value);">
		</form>
		<form id="formData4" name="formData4" method="post"
			enctype="multipart/form-data" class="account-info">
			<input id="req_file_real4" class="file_input_hidden2" type="file"
				name="req_file_real4" style="cursor: pointer;"
				onchange="javascript:fileName(this.value);">
		</form>
		<form id="formData5" name="formData5" method="post"
			enctype="multipart/form-data" class="account-info">
			<input id="req_file_real5" class="file_input_hidden2" type="file"
				name="req_file_real5" style="cursor: pointer;"
				onchange="javascript:fileName(this.value);">
		</form>
		<!-- footer//
		<footer id="footer">
			<div class="footer-in">
				<ul class="terms">
					<li><a href="#">질문 및 개선요청</a></li>
					<li><a href="#">이메일집단수집거부</a></li>
					<li><a href="#">개인정보처리방침</a></li>
				</ul>
				<ul class="relation">
					<li><a href="#"><img src="./images/common/f_link1.gif"
							alt="MDSS" /></a></li>
					<li><a href="#"><img src="./images/common/f_link2.gif"
							alt="통계청" /></a></li>
					<li><a href="#"><img src="./images/common/f_link3.gif"
							alt="OPEN API" /></a></li>
					<li><a href="#"><img src="./images/common/f_link4.gif"
							alt="e나라지표" /></a></li>
				</ul>
				<div class="info">
					<p class="address">(302-702)대전광역시 서구 청사로 189 통계청</p>
					<dl class="tel">
						<dt>콜센터 :</dt>
						<dd>02)2012-9114</dd>
						<dt>SGIS 담당자 :</dt>
						<dd>042)481-2342</dd>
						<dt>자료제공담당자 :</dt>
						<dd>(042)481-2438</dd>
					</dl>
				</div>
				<p class="copyright">COPYRIGHT STATICS KOREA. ALL RIGHTS
					RESERVED SINCE 2014</p>
			</div>
		</footer>
		 -->
		 <!-- 
		 <footer id="footer2">
                <div class='footer-in'>
						<ul class='terms'>
							<li><a href='/html/member/personalInfo.html'>개인정보처리방침</a></li>
							<li><a href='/html/member/emailInfo.html'>이메일무단수집거부</a></li>
						</ul>
						<ul class='relation'>
							<li style='margin-right:7px;'><a href='http://kostat.go.kr' target='_blank'>통계청 |</a></li>
							<li style='margin-right:7px;'><a href='http://kosis.kr' target='_blank'>KOSIS |</a></li>
							<li style='margin-right:7px;'><a href='http://mdss.kostat.go.kr' target='_blank'>MDSS |</a></li>
							<li style='margin-right:7px;'><a href='https://kssc.kostat.go.kr:8443/ksscNew_web/index.jsp' target='_blank'>통계분류</a></li>
						</ul>
						<div class='info'>
							<p class='address'>(35208)대전광역시 서구 청사로 189</p>
							<dl class='tel'>
								<dt>통계청콜센터 :</dt>
								<dd>02)2012-9114</dd>
								<dt>관리자 :</dt>
								<dd>042)481-2248</dd>
								<dt>자료제공담당자 :</dt>
								<dd>(042)481-2438</dd>
							</dl>
						</div>
					</div>
            </footer>
		  -->
		<!-- //footer -->
		
			 <div style="padding-bottom: 10px;">&nbsp;</div>
	    <!-- footer// -->
	    <footer id="footer">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
 	    </footer>
		
	</div>
</body>
</html>
