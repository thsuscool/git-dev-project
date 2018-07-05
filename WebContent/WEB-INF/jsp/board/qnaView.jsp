<%
/**************************************************************************************************************************
* Program Name  : 질문과 개선요청 JSP  
* File Name     : expAndNotice.jsp
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
	<!-- <script src="/js/common/board.js"></script> -->
	<!-- <script src="/js/board/themaAndRequest.js"></script> -->
	<!-- <script src="/js/board/qnaAndRequest.js"></script> -->
	<script src="/js/board/qnaView.js"></script>
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
                   <a href="/view/board/qnaAndRequest"><span class="path_el current">상세</span></a>
			</p>
			<h2 class="ctit">질문과 개선요청</h2>
			<p class="smr">SGIS 플러스에 대해 궁금한 사항이나 요청사항에 대한 글을 올려 주세요</p>
			<!-- <div class="board_tabs1">
				<a id="board_tabs_faq" class="active" style="cursor: pointer;">FAQ</a>
				<a id="board_tabs_qna" style="cursor: pointer;">Q&A</a>
				<a id="board_tabs_thema" style="cursor: pointer;">통계주제도 요청</a>
			</div> -->
			<div id="contents">
				<div id="content">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap_1">
						<!-- 게시물 목록 // -->
						<div class="tab_contents">
							<div class="qna_list">
								<div class="ptit">
									Q&A <br />
									<p class="ptit_stit">SGIS를 활용함에 있어서 질문사항 또는 서비스 개선의견에 대해 자유롭게 써주세요</p>
								</div>
								<div id="article-wrap">
									<div id="qna_list_div">
									<div id="qna_list" class="qna_list" style="width: 100%;">
									</div>
									</div>
								</div>
							</div>
							
							<div class="thema_list" style="display: none;">
								<div class="ptit">
									통계주제도 요청 <br />
									<p class="ptit_stit"></p>
								</div>
	
								<!-- 게시물 검색// -->
								<div class="article-search2">
									<!-- 	//2015-12-03 시큐어코딩 -->
									<form action="#" method="POST">
										<fieldset style="margin-left: 165px;">
											<legend class="blind">게시물 검색</legend>
											<div class="f-el f-el-select">
												<span class="el-h blind">
												<!-- 
													<label for="atc-sel1">검색항목</label>
												 -->
												</span>
												<span class="el-b select_box">
													<select id="thema_search_select" class="easyui-combobox" data-options="editable:false" name="searchsel" style="width: 155px; height: 40px; cursor: pointer;">
														<option value="post_title">제목</option>
														<option value="post_content">내용</option>
														<option value="post_all" selected="selected">제목 + 내용</option>
													</select>
												</span>
											</div>
											<div class="f-el">
												<span class="el-b">
													<input id="thema_search_title_text" type="text" name="search" style="width: 350px;" />
												</span>
											</div>
										</fieldset>
										<div class="sbm">
											<input style="cursor: pointer;" type="button" onclick="javascript:themaAndRequest.searchThemaLists();" value="검색" />
										</div>
									</form>
								</div>
								<!-- // 게시물 검색 -->
	
								<!-- 2016.12.02 시큐어코딩 삭제  -->
								<div id="thema_login_box" class="loginbox">
									<p>로그인을 하셔야 주제도 요청이 가능합니다.</p>
									<a class="anc-btn" style="width: 80px;" href="javascript:themaAndRequest.moveLogin();">로그인</a>
									<!-- <a class="anc-btn main" style="width: 80px;" href="javascript:themaAndRequest.moveAgree();">회원가입</a> -->
									<a class="anc-btn main" style="width: 80px;" href="javascript:memberRegister();">회원가입</a>
								</div>
								<!-- 2016.12.02 시큐어코딩 삭제  -->
	
								<!-- (board_thema) -->
								<div id="thema_input_form_btn" class="btn_board">
									<a id="themaboardclose" style="cursor: pointer; width: 140px;" class="anc-btn black themaboardclose" onclick="javascript:themaAndRequest.controlInputForm();">입력폼닫기</a>
								</div>
								
								<div id="thema_input_form" class="board_thema">
								<form id="themaFileUploadForm" name="themaFileUploadForm" method="post" enctype="multipart/form-data">
									<table>
										<colgroup>
											<col style=" width: 140px;" />
											<col style=" width: ;" />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row"><span>보안코드</span></th>
												<td class="code" style="text-align: center;">
													<input id="thema_regist_secret_code_input" type="text" name="code" style="width: 250px;" data-options="required:true" />
													<a href="javascript:board.refreshSecretCode();" class="anc-btn black qnaboardclose" style="width:80px; margin-left: 10px">Reload</a>
													<img id="thema_regist_secret_code_show" src="/jcaptcha" style="margin-left: 10px; vertical-align: middle;" alt="보안코드"/>
												</td>
<!-- 												<td style="margin-right: 10px"> -->
<!-- 													<a href="javascript:qnaAndRequest.refreshSecretCode();" class="anc-btn black qnaboardclose" style="width:80px">Reload</a> -->
<!-- 													<img id="qna_regist_secret_code_show" src="/jcaptcha" /> -->
<!-- 												</td> -->
<!-- 												<td width="90px"> -->
<!-- 													<img id="qna_regist_secret_code_show" src="/jcaptcha" /> -->
<!-- 												</td> -->
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
													<div id="qna_list_0" style="width: 670px; height: 50px; padding-left: 10px;" >
													</div>
												</td>
											</tr>
											<tr>
												<th scope="row"><span>파일첨부</span></th>
												
												<td class="file">
													<input id="thema_regist_file" class="file_input_textbox" type="text" style="width: 280px;" readonly="readonly"/>
													<div class="file_input_div" style="width:400px;">
														<input type="button" value="파일찾기" class="file_input_button" style="cursor: pointer;" onclick="javascript:themaAndRequest.openFileBrowser();"/>
														<input id="thema_file" class="file_input_hidden" type="file" name="qna_file" style="cursor: pointer;" onchange="javascript:themaAndRequest.setFileName(this.value)">
														<input id="thema_file_" class="file_input_ie9" type="file" name="qna_file" style="cursor: pointer;">
													</div>
												</td>
												
											</tr>
											<tr hidden id="themaFileTr">
												<th scope="row"><span></span></th>
												<td>
													<div id="themaFileTrName" style="float: left; margin-left: 7px;">testFile.zip</div>
													<img src="/img/pm/btn_layer_close.gif" style="cursor: pointer; margin-left: 20px;" onclick="javascript:themaAndRequest.removeFileOnModifyMode();" alt="파일제거"/>
													&nbsp;&nbsp;&nbsp;※이전 파일을 제거 후 등록 가능 합니다.
												</td>
											</tr>
										</tbody>
									</table>
									</form>
	
									<div class="btn_board">
										<a id="themaRegistBtn" class="anc-btn" style="width: 140px; cursor: pointer;" onclick="javascript:themaAndRequest.checkSecretCode();">질문등록</a>
									</div>
								</div>
								<!-- //(board_thema) -->
	
								<div id="article-wrap_2">
									<div id="thema_list_div">
									<div id="thema_list" class="qna_list" style="width: 100%;">
									</div>
									</div>
								</div>
					
								<div id="thema_lists_paging" class="pagenation2" style="text-align: center; width: 100%;">
									<span class="pages"> <a href="" class="page">1</a></span>
								</div>
							</div>
	
						</div>
						<!-- //게시물 목록 -->
	
					</div>
					<!-- //게시판 전체 영역 -->
					<!-- 맨위로 버튼 -->
					<a id=topScrollTag href="javascript:window.scroll(0,0)" style="position: fixed; bottom:220px; display:none; border-radius: 5px; width: 50px; height: 50px; cursor: pointer; background-color: #8e787f; opacity: 0.4; filter: alpha(opacity=40);">
                   		<img id="topScrollImg" src="/img/ico/arrowup.png" alt="통계청 바로가기" >
                    </a>
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