<%
/**************************************************************************************************************************
* Program Name  : 질문과 개선요청 JSP  
* File Name     : qnaWrite.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	
	<title>질문과 개선요청 | 통계지리정보서비스</title>
	
	<link href="/css/default.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/common/board.js"></script>
	<!-- <script src="/js/board/themaAndRequest.js"></script> -->
	<!-- <script src="/js/board/qnaAndRequest.js"></script> -->
	<script src="/js/board/themaModify.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	
	<script src="/js/board/holder.js"></script>
	
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	
<!-- 	<script type="text/javascript" src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script> -->
	<script type="text/javascript" src='/js/plugins/google_recaptcha.js'></script>
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
                   <a href="/view/board/sopBoardMain"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a>
                   <a href="/view/board/qnaAndRequest"><span class="path_el">질문과 개선요청&nbsp;&nbsp;>&nbsp;</span></a>
                   <a href="/view/board/qnaAndRequest"><span class="path_el current">수정</span></a>
			</p>
			<h2 class="ctit">질문과 개선요청</h2>
			<p class="smr">SGIS 플러스에 대해 궁금한 사항이나 요청사항에 대한 글을 올려 주세요</p>
			
			<div id="contents">
				<div id="content">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						<div class="tab_contents">
							<div class="thema_list">
								<h3 class="ptit">
									통계주제도 요청
									<p class="ptit_stit"></p>
								</h3>
	
								<div id="thema_input_form" class="board_thema" >
									<table>
										<colgroup>
											<col style=" width: 140px;" />
											<col style=" width: ;" />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row"><span>보안코드</span></th>
												<td class="code" valign="middle">
													<input id="thema_regist_secret_code_input" type="text" name="code" style="width: 250px;" data-options="required:true" />
													<a href="javascript:board.refreshSecretCode();" class="anc-btn black qnaboardclose" style="width:80px; margin-left: 10px">Reload</a>
													<img id="thema_regist_secret_code_show" src="/jcaptcha" style="margin-left: 10px; vertical-align: middle;"/>
													<img id="qna_regist_secret_code_show" src="/jcaptcha" style="margin-left: 10px; vertical-align: middle; display: none;" />
												</td>
											</tr>
											<tr>
												<th scope="row"><span>글제목</span></th>
												<td class="title">
													<input id="thema_regist_title_input" type="text" value=" 글제목을 입력하세요." name="title" style="width: 600px;" data-options="required:true" />
												</td>
											</tr>
											<tr>
												<th scope="row"><span>글내용</span></th>
												<td class="content">
													<textarea id="thema_regist_content_input" name="message" style="width: 670px; height: 186px; padding-left: 10px;" >
													</textarea>
												</td>
											</tr>
											<tr>
												<th scope="row"><span>파일첨부</span></th>
												<form id="themaFileUploadForm" name="themaFileUploadForm" method="post" enctype="multipart/form-data">
												<td class="file">
													<input id="thema_regist_file" class="file_input_textbox" type="text" style="width: 280px;" readonly="readonly"/>
													<div class="file_input_div" style="width:400px;">
														<input type="button" value="파일찾기" class="file_input_button" style="cursor: pointer;" onclick="javascript:themaModify.openFileBrowser();"/>
														<input id="thema_file" class="file_input_hidden" type="file" name="qna_file" style="cursor: pointer;" onchange="javascript:themaModify.setFileName(this.value)">
														<input id="thema_file" class="file_input_ie9" type="file" name="qna_file" style="cursor: pointer;">
													</div>
												</td>
												</form>
											</tr>
											<tr hidden id="themaFileTr">
												<th scope="row"><span></span></th>
												<td>
													<div id="themaFileTrName" style="float: left; margin-left: 7px;">testFile.zip</div>
													<img src="/img/pm/btn_layer_close.gif" style="cursor: pointer; margin-left: 20px;" onclick="javascript:themaModify.removeFileOnModifyMode();"/>
													&nbsp;&nbsp;&nbsp;※이전 파일을 제거 후 등록 가능 합니다.
												</td>
											</tr>
										</tbody>
									</table>
	
									<div class="btn_board">
										<a id="themaRegistBtn" class="anc-btn" style="width: 140px; cursor: pointer;" onclick="javascript:themaModify.checkSecretCode();">글 수정</a>
									</div>
								</div>
								<!-- //(board_thema) -->
	
								<div id="article-wrap">
									<div id="thema_list_div">
									<div id="thema_list" class="qna_list" style="width: 100%;">
									</div>
									</div>
								</div>
							</div>
							
	
						</div>
						<!-- //게시물 목록 -->
	
					</div>
					<!-- //게시판 전체 영역 -->
	
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