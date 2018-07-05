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
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	
	<title>질문과 개선요청(Q&amp;A) | 통계지리정보서비스</title>
	
	<link href="/css/default.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/common/board.js"></script>
	<script src="/js/board/themaAndRequest.js"></script>
	<script src="/js/board/qnaAndRequest.js"></script>
	<script src="/js/board/faq.js"></script>
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
<body >
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div id="container">
			<p class="path">
                   <a href="/view/index" tabindex="37"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
                   <a href="/view/board/sopBoardMain" tabindex="38"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a>
                   <a href="/view/board/qnaAndRequest" tabindex="39"><span class="path_el current">질문과 개선요청</span></a>
			</p>
			<h2 class="ctit">질문과 개선요청</h2>
			<p class="smr">SGIS플러스에 대해 궁금한 사항이나 요청사항에 대한 글을 올려 주세요</p>
			<div class="board_tabs1">
				<a id="board_tabs_faq" class="active" style="cursor: pointer;" tabindex="40">FAQ</a>				
				<a id="board_tabs_qna" style="cursor: pointer;" tabindex="41">Q&A</a>
				<a id="board_tabs_thema" style="cursor: pointer;" tabindex="42">통계주제도 신규 요청</a>
			</div>
			<div id="contents">
				<div id="content">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						<div class="tab_contents">
							<div class="faq_list">
								<h3 class="ptit">FAQ 자주하는 질문</h3>
								<!-- 게시물 검색// -->
								<div class="article-search2">
									<form action="#" method="get">
										<fieldset style="margin-left: 165px;">
											<div class="f-el">
												<span class="el-h">
													<label for="faq_search_title_text" style="display: none">검색어 입력</label>
												</span>
												<span class="el-b">
													<input id="faq_search_title_text" class="" type="text" name="search" style="width: 350px;" data-options="required:true" title="검색어 입력" />
												</span>
											</div>
										</fieldset>
										<div class="sbm">
											<label for="searchBotton" style="display: none">검색</label>												
											<input id="searchBotton" name="searchBotton" title="검색" style="cursor: pointer;" type="button" onclick="javascript:faq.searchFaqLists();" value="검색" />
										</div>
									</form>
								</div>
								<!-- // 게시물 검색 -->
								
								<div id="article-wrap_1">
									<div id="faq_list_div">
										<div id="faq_list" class="faq_list" style="width: 100%;">
										</div>
									</div>
								</div>
								
								<div id="faq_lists_paging" class="pagenation" style="width: 100%;">
									<span class="pages"> <a href="" class="page">1</a></span>
								</div>
							</div>
	
							<div class="qna_list" style="display: none;">
								<div class="ptit">
									Q&A <br />
									<span class="ptit_stit">SGIS를 활용함에 있어서 질문사항 또는 서비스 개선의견에 대해 자유롭게 써주세요</span>
								</div>
	
								<!-- 게시물 검색// -->
								<div class="article-search2">
									<!-- 	//2015-12-03 시큐어코딩 -->
									<form action="#" method="POST">
										<fieldset style="margin-left: 165px;">
											<legend class="blind">게시물 검색</legend>
											<div class="f-el f-el-select">
												<span class="el-h blind">
													<label for="qna_search_select" style="display: none">게시물검색</label>
												</span>
												<span class="el-b select_box">
												
													<!-- <select id="qna_search_select" class="easyui-combobox" data-options="editable:false" name="searchsel" style="width: 155px; height: 40px; cursor: pointer;">
														<option value="post_title">제목</option>
														<option value="post_content">내용</option>
														<option value="post_all" selected="selected">제목 + 내용</option>
													</select> -->
													
													<select id="qna_search_select" style="width: 155px; height: 40px; cursor: pointer;">
														
													</select>
												</span>
											</div>
											<div class="f-el">
												<span class="el-b">
													<label for="qna_search_title_text" style="display: none">Q&A검색</label>													
													<input id="qna_search_title_text" type="text" name="search" style="width: 350px;" />
												</span>
											</div>
										</fieldset>
										<div class="sbm">																						
											<input id="qna_search_button" title="검색버튼" style="cursor: pointer;" type="button" onclick="javascript:qnaAndRequest.searchQnaLists();" value="검색" />
										</div>										
									</form>
								</div>
								<!-- // 게시물 검색 -->
	
								<!-- 2016.12.02 시큐어코딩 삭제  -->
								<div id="qna_login_box" class="loginbox">
									<p>로그인을 하셔야 의견작성이 가능합니다.</p>
									<a class="anc-btn" style="width: 80px;" href="javascript:qnaAndRequest.moveLogin();">로그인</a>
									<!-- <a class="anc-btn main" style="width: 80px;" href="javascript:qnaAndRequest.moveAgree();">회원가입</a> -->
									<a class="anc-btn main" style="width: 80px;" href="javascript:memberRegister();">회원가입</a>
								</div>
								<!-- 2016.12.02 시큐어코딩 삭제  -->
	
								<!-- (board_qna) -->
								<div id="qna_input_form_btn" class="btn_board" style="display: block;">
									<!-- <a id="qnaboardclose" style="cursor: pointer;" class="anc-btn black qnaboardclose" onclick="javascript:qnaAndRequest.controlInputForm();" style="width: 140px;">질문등록</a> -->
									<a id="qnaboardclose" style="cursor: pointer; width: 140px;" class="anc-btn black qnaboardclose" onclick="javascript:qnaAndRequest.controlInputWrite();">질문등록</a>
								</div>
								
								<div id="qna_input_form" class="board_qna" style="display: none;">
								<form id="qnaFileUploadForm" name="qnaFileUploadForm" method="post" enctype="multipart/form-data">
									<table>
									<caption>Q&A 게시판 글 등록</caption>
										<colgroup>
											<col style=" width: 140px;" />
											<col style=" width: ;" />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row"><span>질문유형</span></th>
												<td class="select_box">
													<!-- <select id="qna_regist_category_select" class="easyui-combobox" data-options="editable:false" name="mail" style="width: 155px;">
													</select> -->
												</td>
											</tr>
											<tr>
												<th scope="row"><span>보안코드</span></th>
												<td class="code" style="text-align:center;">
													<!-- 2017.12.27 [개발팀] 접근성시정조치  -->
													<label for="qna_regist_secret_code_input" style="display: none">보안코드</label>
													<input id="qna_regist_secret_code_input" type="text" name="code" title="보안코드" style="width: 250px;" data-options="required:true" />
													<a href="javascript:board.refreshSecretCode();" class="anc-btn black qnaboardclose" style="width:80px; margin-left: 10px">Reload</a>
													<img id="qna_regist_secret_code_show" src="/jcaptcha" style="margin-left: 10px; vertical-align: middle;" alt="보안코드"/>
												</td>
											</tr>
											<tr>
												<th scope="row"><span>글제목</span></th>
												<td class="title">
													<!-- 2017.12.27 [개발팀] 접근성시정조치  -->
													<label for="qna_regist_title_input" style="display: none">글제목</label>
													<input id="qna_regist_title_input" type="text" title="글제목" value=" 글제목을 입력하세요." name="title" style="width: 600px;" data-options="required:true" />
												</td>
											</tr>
											<tr>
												<th scope="row"><span>글내용</span></th>
												<td class="content">
													<label for="qna_regist_content_input" style="display: none">글내용</label>
													<textarea id="qna_regist_content_input" name="message" style="width: 670px; height: 186px; padding-left: 10px;" >
													</textarea>
												</td>
											</tr>
											<tr>
												<th scope="row"><span>파일첨부</span></th>
												
												<td class="file">
													<label for="qna_regist_file" style="display: none">파일선택창</label>
													<input id="qna_regist_file" class="file_input_textbox" type="text" style="width: 280px;" readonly="readonly"/>
													<div class="file_input_div" style="width:400px;">
														<label for="qna_file_selete" style="display: none">파일선택창</label>
														<input id="qna_file_selete" type="button" value="파일찾기" class="file_input_button" style="cursor: pointer;" onclick="javascript:qnaAndRequest.openFileBrowser();"/>
														<label for="qna_file" style="display: none">파일선택</label>
														<input id="qna_file" class="file_input_hidden" type="file" name="qna_file" style="cursor: pointer;" onchange="javascript:qnaAndRequest.setFileName(this.value)">
														<label for="qna_file_" style="display: none">파일선택ie9</label>
														<input id="qna_file_" class="file_input_ie9" type="file" name="qna_file" style="cursor: pointer;">
													</div>
												</td>
												
											</tr>
											<tr hidden id="qnaFileTr">
												<th scope="row"><span></span></th>
												<td>
													<div id="qnaFileTrName" style="float: left; margin-left: 7px;">testFile.zip</div>
													<img src="/img/pm/btn_layer_close.gif" style="cursor: pointer; margin-left: 20px;" alt="파일선택" onclick="javascript:qnaAndRequest.removeFileOnModifyMode();"/>
													&nbsp;&nbsp;&nbsp;※이전 파일을 제거 후 등록 가능 합니다.
												</td>
											</tr>
										</tbody>
									</table>
									</form>
	
									<div class="btn_board">
										<a id="qnaRegistBtn" class="anc-btn" style="width: 140px; cursor: pointer;" onclick="javascript:qnaAndRequest.checkSecretCode();">질문등록</a>
									</div>
								</div>
								<!-- //(board_qna) -->
	
								<div id="article-wrap_2">
									<div id="qna_list_div">
									<div id="qna_list" class="qna_list" style="width: 100%;">
									</div>
									</div>
								</div>
								<br/>
								<div id="board_lists_paging" class="pagenation1" style="width: 100%;">
									<span class="pages"> <a href="" class="page">1</a></span>
								</div>
							</div>
							
							<div class="thema_list" style="display: none;">
								<h3 class="ptit">
									통계주제도 신규 요청
<!-- 									<p class="ptit_stit"></p> -->
								</h3>
	
								<!-- 게시물 검색// -->
								<div class="article-search2">
									<!-- 	//2015-12-03 시큐어코딩 -->
									<form action="#" method="POST">
										<fieldset style="margin-left: 165px;">
											<legend class="blind">게시물 검색</legend>
											<div class="f-el f-el-select">
												<span class="el-h blind">
													<label for="thema_search_select" style="display: none">검색항목</label>
												</span>
												<span class="el-b select_box">
													<!-- <select id="thema_search_select" class="easyui-combobox" data-options="editable:false" name="searchsel" style="width: 155px; height: 40px; cursor: pointer;">
														<option value="post_title">제목</option>
														<option value="post_content">내용</option>
														<option value="post_all" selected="selected">제목 + 내용</option>
													</select> -->
													<select id="thema_search_select" style="width: 155px; height: 40px; cursor: pointer;">
														<!-- <option value="post_title">제목</option>
														<option value="post_content">내용</option>
														<option value="post_all" selected="selected">제목 + 내용</option> -->
													</select>
													
												</span>
											</div>
											<div class="f-el">
												<span class="el-b">
													<label for="thema_search_title_text" style="display: none">검색</label>
													<input id="thema_search_title_text" type="text" name="search" style="width: 350px;" />
												</span>
											</div>
										</fieldset>
										<div class="sbm">
											<input id="thema_search_button" style="cursor: pointer;" type="button" onclick="javascript:themaAndRequest.searchThemaLists();" value="검색" />
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
									<a id="themaboardclose" style="cursor: pointer; width: 140px;" class="anc-btn black themaboardclose" onclick="javascript:themaAndRequest.controlInputWrite();">질문등록</a>
								</div>
								
								<div id="thema_input_form" class="board_thema" style="display: none;">
									<form id="themaFileUploadForm" name="themaFileUploadForm" method="post" enctype="multipart/form-data">
									<table>
									<caption>통계주제도 글 등록</caption>
										<colgroup>
											<col style=" width: 140px;" />
											<col style=" width: ;" />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row"><span>보안코드</span></th>
												<td class="code" style="text-align:center;">
													<label for="thema_regist_secret_code_input" style="display: none">보안코드</label>
													<input id="thema_regist_secret_code_input" type="text" name="code" style="width: 250px;" data-options="required:true" />
													<a href="javascript:board.refreshSecretCode();" class="anc-btn black qnaboardclose" style="width:80px; margin-left: 10px">Reload</a>
													<img id="thema_regist_secret_code_show" src="/jcaptcha" alt="보안코드" style="margin-left: 10px; vertical-align: middle;"/>
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
													<label for="thema_regist_title_input" style="display: none">글제목</label>
													<input id="thema_regist_title_input" type="text" value=" 글제목을 입력하세요." name="title" style="width: 600px;" data-options="required:true" />
												</td>
											</tr>
											<tr>
												<th scope="row"><span>글내용</span></th>
												<td class="content">
													<label for="thema_regist_content_input" style="display: none">글내용</label>
													<textarea id="thema_regist_content_input" name="message" style="width: 670px; height: 186px; padding-left: 10px;" >
													</textarea>
												</td>
											</tr>
											<tr>
												<th scope="row"><span>파일첨부</span></th>
												
												<td class="file">
													<label for="thema_regist_file" style="display: none">파일첨부</label>
													<input id="thema_regist_file" class="file_input_textbox" type="text" style="width: 280px;" readonly="readonly"/>
													<div class="file_input_div" style="width:400px;">
														<label for="thema_button" style="display: none">파일찾기</label>
														<input id="thema_button" type="button" value="파일찾기" class="file_input_button" style="cursor: pointer;" onclick="javascript:themaAndRequest.openFileBrowser();"/>
														<label for="thema_file" style="display: none">파일선택</label>
														<input id="thema_file" class="file_input_hidden" type="file" name="qna_file" style="cursor: pointer;" onchange="javascript:themaAndRequest.setFileName(this.value)">
														<label for="thema_file_" style="display: none">파일선택</label>
														<input id="thema_file_" class="file_input_ie9" type="file" name="qna_file" style="cursor: pointer;">
													</div>
												</td>
												
											</tr>
											<tr hidden id="themaFileTr">
												<th scope="row"><span></span></th>
												<td>
													<div id="themaFileTrName" style="float: left; margin-left: 7px;">testFile.zip</div>
													<img src="/img/pm/btn_layer_close.gif" style="cursor: pointer; margin-left: 20px;" alt="파일닫기" onclick="javascript:themaAndRequest.removeFileOnModifyMode();"/>
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
	
								<div id="article-wrap_3">
									<div id="thema_list_div">
									<div id="thema_list" class="qna_list" style="width: 100%;">
									</div>
									</div>
								</div>
								<br/>
								<div id="thema_lists_paging" class="pagenation2" style="width: 100%;">
									<span class="pages"> <a href="" class="page">1</a></span>
								</div>
							</div>
	
						</div>
						<!-- //게시물 목록 -->
	
					</div>
					<!-- //게시판 전체 영역 -->
	
				</div>
			</div>
		</div>
		 <!-- 맨위로 버튼 -->
         <!-- <a id=topScrollTag href="javascript:window.scroll(0,0)" style="position: fixed; bottom:150px; display:none; border-radius: 5px; width: 50px; height: 50px;cursor: pointer;background-color: #8e787f; opacity: 0.4; filter: alpha(opacity=40);">
         	<img id="topScrollImg" src="/img/ico/arrowup.png" alt="맨위로 가기" >
         </a> -->
            
		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>