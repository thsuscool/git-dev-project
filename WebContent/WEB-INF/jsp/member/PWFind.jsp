<%
/**************************************************************************************************************************
* Program Name  : 비밀번호 찾기 JSP  
* File Name     : PWFind.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>아이디/비밀번호 찾기 | 통계지리정보서비스</title>
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />	
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
       
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script src="/js/common/common.js"></script>
            
    
    <!-- <script src="/js/member/findID.js"></script> -->
    <script src="/js/member/findPW.js"></script>    
    
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
			<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
			<a href="/view/member/login"><span class="path_el">로그인&nbsp;&nbsp;>&nbsp;</span></a>
			<a href="/view/member/PWFind"><span class="path_el current">비밀번호 찾기</span></a>
		</p>
		<h2 class="ctit">아이디/비밀번호 찾기</h2>
		<!-- //2015-09-10 수정 -->
		<p class="smr line24">SGIS<sup>+plus</sup> 를 이용하기 위해서는 로그인이 필요합니다.<br />로그인에 필요한 아이디 와 비밀번호의 확인 및 재발급을 신청하실 수 있습니다.</p>

		<div class="board_tabs board_tabs-quad">
			<span style="width: 50%; cursor: pointer;"><em>01</em> 아이디 찾기</span>
			<span style="width: 50%; cursor: pointer;" class="active"><em>02</em> 비밀번호 찾기</span>
		</div>
		<!-- //2015-09-10 수정 -->
		<div id="contents">
			<div id="content">

				<!-- ( 아이디 찾기 ) -->
				<div class="member_idsearch" style="display: none;">					
					<div class="idsearch_section02">
						<p class="idsearch_title">회원정보에 등록한 휴대폰으로 인증</p>

						<ul class="idsearch_list">
							<li>회원정보에 등록한 휴대폰 번호와 입력한 휴대폰 번호가 같아야, 인증번호를 받을 수 있습니다.</li>
						</ul>

						<!-- ( board_idsearch ) -->
						<div class="board_idsearch">
							<table>
								<colgroup>
									<col style=" width: 75px;" />
									<col style=" width: ;" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row"><span>이름</span></th>
										<td class="name">
											<input value="" type="text" id="member_nm" name="member_nm" style="width: 250px;" maxlength="20"/>
										</td>
									</tr>
									<tr>
										<th scope="row"><span>휴대폰</span></th>
										<td class="phone select_box">
											<select class="" id="cp_no1" name="cp_no1" style="width: 99px;">
												<option>010</option>
												<option>011</option>
												<option>016</option>
												<option>018</option>
												<option>019</option>
											</select>
											&nbsp;&nbsp;-&nbsp;&nbsp;
											<input type="text" maxLength=4 onkeyup='siche_next()' id="cp_no2" name="cp_no2" style="width: 51px;"  />
											&nbsp;&nbsp;-&nbsp;&nbsp;
											<input type="text" maxLength=4 onkeyup='siche_next()' id="cp_no3" name="cp_no3" style="width: 51px;" data-options="required:true" onkeypress="submitOnEnter(this, event, 0);"/>											
										</td>
									</tr>																		
								</tbody>
							</table>
 							
							<div class="btn_board">
							 <a class="anc-btn blue" style="width: 140px;" href="javascript:findID.nameCheckFnc();">아이디찾기</a>
							</div>
							<!-- <form name="reqPCCForm" method="post">
							<input type="hidden" name="reqInfo" id="reqInfo" />
							<input type="hidden" name="retUrl" id="retUrl" />							
							</form> -->
							<span id="findIDSpan"></span>
						</div>
						<!-- //( board_idsearch ) -->
					</div>
				</div>
				<!-- //( 아이디 찾기 ) -->

				<!-- ( 비밀번호 찾기 ) -->
 				<div class="member_idsearch" >
					<!-- 20150911 주석처리
						<p class="findTitle">기존 비밀번호찾기</p>
					-->
					<div class="idsearch_section02">
						<p class="idsearch_title">회원정보에 등록한 휴대폰으로 인증</p>
						<ul class="idsearch_list">
							<li>회원정보에 등록한 휴대폰 번호와 입력한 휴대폰 번호가 같아야, 인증번호를 받을 수 있습니다.</li>
						</ul>
						<div class="board_idsearch">
							<table>
								<colgroup>
									<col style=" width: 75px;" />
									<col style=" width: ;" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row"><span>아이디</span></th>
										<td class="name">
											<input value="" type="text" id="member_id" name="member_id" style="width: 250px;" />
										</td>
									</tr>
									<tr>
										<th scope="row"><span>이름</span></th>
										<td class="name">
											<input value="" type="text" id="member_nm2" name="member_nm2" style="width: 250px;" />
										</td>
									</tr>
									<tr>
										<th scope="row"><span>휴대폰</span></th>
										<td class="phone select_box">
											<select id="cp_no4" name="cp_no4" style="width: 99px;">
												<option>010</option>
												<option>011</option>
												<option>016</option>
												<option>018</option>
												<option>019</option>
											</select>
											&nbsp;&nbsp;-&nbsp;&nbsp;
											<input type="text" id="cp_no5" maxLength=4 onkeyup='siche_next()' name="cp_no5" style="width:51px;" />
											&nbsp;&nbsp;-&nbsp;&nbsp;
											<input type="text" id="cp_no6" maxLength=4 onkeyup='siche_next()' name="cp_no6" style="width: 51px;" onkeypress="submitOnEnter(this, event, 1);"/>											
										</td>
									</tr>																	
								</tbody>
							</table>
														
							
								<div class="btn_board">
									<a class="anc-btn blue" style="width: 140px;" href="javascript:findPW.nameCheckFnc();">비밀번호 찾기</a>									
								</div>
								<span id="findPWSpan"></span>
							<!-- <form name="reqPCCForm" method="post">                         
							<input type="hidden" name="reqInfo" id="reqInfo" />
							<input type="hidden" name="retUrl" id="retUrl" />
							</form> -->							
							<!-- <div class="btn_board">
								<a class="anc-btn blue" style="width: 140px;" onclick="idsearchForm();" href="#">비밀번호 찾기</a>
							</div> -->
						</div>						
					</div>					
				</div>
				<!-- //( 비밀번호 찾기 ) -->	
			</div>
		</div>
				
	</div>
	    
	<div style="height:50px;"></div>		
    </div>
    
    <form name="reqPCCForm" method="post">
	    <input type="hidden" name="reqInfo" id="reqInfo" />
		<input type="hidden" name="retUrl" id="retUrl" />
    </form>
    <!-- footer// -->
    <footer id="footer">
    	<!-- Bottom Include -->
		<jsp:include page="/view/common/includeBottom"></jsp:include>
    </footer>
</body>
<script>
$(document).ready(function(){
	$('.selectbox').selectbox();	
});
</script>
</html>