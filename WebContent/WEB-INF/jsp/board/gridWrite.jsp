<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>그리드 개선의견</title>
	<link rel="stylesheet" type="text/css" href="/css/board/gridWrite.css" />
	<script type='text/javascript' src='/js/plugins/jquery.min.js'></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script src="/js/plugins/ui.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script>

	 
	function getGridBoardRegist(){
		 

		 
		 var dataObj = new Object();
		 
		 
		 dataObj.boanCode = $("#boan_code").val();
		 

		var file = $("#grid_file").val();
		if(file != null && file.length > 1 && file.trim().length > 1) {
			gridRegistForm();
		}else{
		
			if($("#grid_title").val() != ""){
					dataObj.post_title = $("#grid_title").val();
			}else{
				alert("글 제목을 입력해 주세요");
				return false
			}
			if($("#grid_content").val() != ""){
					dataObj.post_content = $("#grid_content").val();
			}else{
				alert("글 내용을 입력해 주세요");
				return false
			}
		 
				jQuery.ajax({
	 	 		type:"POST",
	 	 		url: "/ServiceAPI/board/boardGridRegist.json",
	 	 		data : dataObj,
	 	 		success:function(data){	 	 					
	 	 					if(!data.result.isResponseCorrect){
	 	 						alert("보안코드를 잘못 입력하셨습니다");
	 	 						boanNumber();
	 	 					}else{
	 	 					//mng_s  20170801 로그 추가
	 	 						/* apiLogWrite3("Q09","SGIS 게시판 글 등록"); */
	 	 					//mng_e  20170801 로그 추가
	 	 						alert("등록되었습니다.");
		 	 					self.close();
		 	 					
	 	 					}
	 	 					
	 	 		},
	 	 		error:function(data) {
					alert("error");
	 	 		}
	 		});
		}
	}	
	
	function openFileBrowser(){
		$("#grid_file").click();
	}
 	function setFileName(value){
		var fileName = value.substring(value.lastIndexOf('\\') + 1);
		$("#grid_regist_file").val(fileName);
		var file = $("#grid_file").val();
	} 
	function gridRegistForm(){
		$("#gridFileUploadForm").ajaxForm({
			async: false,
			type : "POST",
			url : "/ServiceAPI/board/boardGridRegistForm.form",
			data : {
				post_depth : 0,
				post_order : 0,
				post_title : $("#grid_title").val(),
				post_content : $("#grid_content").val(),
				board_code : $("#boan_code").val(),
				priority_disp_yn : "N",
				file_yn : "Y",
			},
			beforeSend: function(xhr) {
//				console.log("beforeSend");
			},
			success: function(data) {
					alert("등록되었습니다");
					self.close();
				
	        },
	        complete: function() {
//	        	console.log("complete");
	        },
	        error: function(xhr, textStatus, error) {
	        }
		}).submit();
	}
	function gridOpinion(){
		$("#layerpop_Apiadd").show();
		$("#grid").hide();
		window.resizeTo(714,700);
	}
	function gridService(){
		$("#grid").show();
		$("#layerpop_Apiadd").hide();
		window.resizeTo(993,587);
	}
	function boanNumber(){
		var secret_code_img = document.getElementById("secret_code_img");
	    
	    var tempCaptcha = "/jcaptcha?" + Math.random();
	    secret_code_img.src = tempCaptcha;
	}

	$(document).ready(function(){
		console.log(window);
		if(location.search.substring(1)=="write"){
			gridOpinion();
		}else{
			window.resizeTo(993, 587);
			$("#gridistBtn").on('click', (function(e) {
				getGridBoardRegist();
			}));
			$("#reloadBtn").on('click', (function(e) {
				boanNumber();
			}));
		}
	});
	</script>
</head>
<!-- <body onload="javascript:gridPopup();"> -->
<body>
	<div class="deem" id="add_api_deem">
	<!-- ( layerpop ) -->
	<div id="grid">
		<img src="/img/popup/grid_service.png" alt="그리드서비스" style="box-shadow:0 0 5px #333;" usemap="#grid"/>
    	<map name="grid">
    		<area id="grid_opinion" shape="rect" coords="284 46 395 74" href="javascript:gridOpinion();">
    	</map>
	</div>
	
	<div id="layerpop_Apiadd" class="layerpop" style="width: 699px; margin: -225px 0 0 -349px; display: none;">
		<p class="layerpop_tit">그리드 개선의견</p>
		<!-- <span><input type="button" id="gridBtn" value="그리드 서비스 "/></span> -->
		<a id="gridBtn" style="cursor: pointer; position: relative; left:520px; top: -64px;" class="btn_blue2 font14 bold" href="javascript:gridService();">이용안내 보기</a>
		<div class="layerpop_con">
	
			<div class="layerpop_board">
				<table summary="그리드 개선요청">
					<colgroup>
						<col style=" width: 155px;" />
						<col style="" />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><span>* 제목</span></th>
							<td class="title">
								<input id="grid_title" type="text" name="title" style="width:445px;height: 30px; vertical-align: bottom;" data-options="required:true" />
							</td>
						</tr>
						<tr>
							<th scope="row" class="top"><span>* 글내용</span></th>
							<td class="content">
								<textarea id="grid_content" name="message" style="width: 442px; height: 232px; vertical-align: bottom;" ></textarea>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="grid_regist_file"><span>파일첨부</span></label></th>
							<form id="gridFileUploadForm" name="gridFileUploadForm" method="post" enctype="multipart/form-data">
							<td class="file">
								<input id="grid_regist_file" class="file_input_textbox" type="text" style="width: 280px; height:20px;" readonly="readonly"/>
								<input type="button" value="파일찾기" class="file_input_button" style="cursor: pointer; height:28px;" onclick="javascript:openFileBrowser();"/>
								<input id="grid_file" class="file_input_hidden" type="file" name="grid_file" style="cursor: pointer;" onchange="javascript:setFileName(this.value)">
						   <!-- <input id="qna_file" class="file_input_ie9" type="file" name="qna_file" style="cursor: pointer;"> -->
							</td>
							</form>
							</tr>
						<tr>
							<th>보안코드</th>
							<td>
								<input type="text" class=" mr10 w200" id="boan_code" style="height:20px;"/>
								<button id="reloadBtn" class="mr10 tableBtn" style="height:27px;">Reload</button>
								<!-- 
								<button class="mr10 tableBtn">1234</button>
								 -->
								 <img id="secret_code_img" src="/jcaptcha" style="margin-left: 10px; vertical-align: middle;" alt="보안코드"/>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<!-- <img id="img_ApIadd" alt="보안코드" class="vercodeImg" title="click to change" height="30px" onclick="javascript:refresh(this);" src="/developer/js/community/qna/image.jsp" style="/*margin-left:10px*/; vertical-align: middle;" /> -->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<div class="btn_area2 mb40">
				<a id="gridistBtn" style="width: 70px;cursor: pointer;" class="btn_blue2 font14 bold">작성</a>
				<a style="width: 70px;cursor: pointer;" class="close_panal btn_blue3 font14 bold" onclick="self.close();">취소</a>
			</div>
		</div>
		<!-- <a href="#" class="btn_closp"><img src="../../../images/api/btn_closep.gif" alt="닫기" /></a> -->
	</div>
</div>
</body>
</html>