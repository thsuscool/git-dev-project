<%
/**************************************************************************************************************************
* Program Name  : 회원정보수정 JSP  
* File Name     : mysubpage.jsp
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
    <title>회원정보관리 | 통계지리정보서비스</title>
    <link href="/css/default.css" rel="stylesheet" type="text/css" />
    <link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css' />
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />	
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
    <script src="/js/common/common.js"></script>        
    
    <script type="text/javascript" src="/js/mypage/mySubpage.js"></script>
    <script type="text/javascript" src="/js/member/modyfyCPNO.js"></script>
    <script src="/js/board/jquery.paging.js"></script>       
            
	 <script src="/js/plugins/ui.js"></script>
	 <script src="/js/plugins/common.js"></script>         
</head>
<body>
<!-- //2015-09-10 수정 -->
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
				<a href="/view/mypage/mypage"><span class="path_el">마이페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/mypage/mysubpage"><span class="path_el current">회원정보 관리</span></a>
			</p>
			<h2 class="ctit">회원정보 관리</h2>
			<p class="smr">변경된 회원정보에 따라 항목을 수정하여 주시기 바랍니다.</p>
			<form name='reqPCCForm' method='post'>
				<input type='hidden' name='reqInfo' id='reqInfo' />
				<input type='hidden' name='retUrl' id='retUrl' />
			</form>
			<div class="account-join account-modify">
					<form action="#" method="post" class="account-info">
						<!-- 기존회원 정보  -->
						<fieldset id="originField">
						<!-- //2015-09-10 수정 -->
							<div class="f-el" id="memberId" style="display:none;">
								<span class="el-h">
									<label for="member_id">아이디</label>
								</span>
								<span class="el-b">
									<input type="text" id="member_id" value="" readonly='readonly' class="ti10" /><!-- <a href="#" class="cert">아이핀인증</a><a href="#" class="cert">휴대폰인증</a> -->
								</span>
							</div>
							
							<!-- //2015-09-10 수정 -->
							<div class="f-el"  id="memberName" style="display:none;">
								<span class="el-h">
									<label for="member_nm">이름</label>
								</span>
								<span class="el-b">
									<input type="text" id="member_nm" value="" readonly='readonly' class="ti10" />
								</span>
							</div>
							
							<div class="f-el" id="originPwd" style="display:none;">
								<span class="el-h">
									<label for="member_pw">기존 비밀번호</label>
								</span>
								<span class="el-b">
									<input type='password' name='member_pw' id='member_pw' value='' maxlength="20" />
								</span>
							</div>
							<div class="f-el" id="modifyPwd" style="display:none;">
								<span class="el-h">
									<label for="pw">변경할 비밀번호</label>
								</span>
								<span class="el-b">
									<input type='password' name='pw' id = 'pw' value='' maxlength="20" />
								</span>
							</div>
							<div class="f-el" id="checkPwd" style="display:none;">
								<span class="el-h">
									<label for="pw2">비밀번호 확인</label>
								</span>
								<span class="el-b">
									<input type='password' name='pw2' id = 'pw2' value='' maxlength="20" />
								</span>
							</div>
							<div class="f-el" id="modifyCpNo" style="display:none;">
								<span class="el-h">
									<label for="cp_no">휴대폰 변경</label>
								</span>
								<span class="el-b">
									<!-- //2015-09-10 수정 -->
									<!-- <input type='text' name='cp_no' id = 'cp_no' readonly value=" + listItem.cp_no + ">" + "<a href='javascript:modyfyCPNO.nameCheckFnc();'><input type='button' value='휴대폰 인증'></a> -->
									<input type="text" name='cp_no' id = 'cp_no' class="ti10" value="" />
<!-- 									<a href="javascript:modyfyCPNO.nameCheckFnc()" class="cert">휴대폰인증</a> -->
								</span>
							</div>
							<div class="f-el" id="modifyEmail" style="display:none;">
								<span class="el-h">
									<label for="email">이메일 변경</label>
								</span>
								<span class="el-b">
									<input type='text' name='email' id = 'email' class="ti10" value=''/>
								</span>
							</div>
							<div class="f-el" id="intgrCpNo" style="display:none;">
								<span class="el-h">
									<label for="intgr_cpNo">휴대폰</label>
								</span>
								<span class="el-b">
									<input type="text" name='cp_no' id = 'intgr_cpNo' readonly class="ti10" value="" />
								</span>
							</div>
							<div class="f-el" id="intgrEmail" style="display:none;">
								<span class="el-h">
									<label for="intgr_email">이메일</label>
								</span>
								<span class="el-b">
									<input type='text' name='email' id = 'intgr_email' readonly class="ti10" value=''/>
								</span>
							</div>
						</fieldset>
						
						<div class="sbm">
							<!-- <input type="submit" value="정보변경" /> -->			
							<a href='javascript:mySubpageList.memberInfoUpdate()' class="sbn">정보변경</a>							
							<a href="/view/mypage/mypage">취소</a>
						</div>
						<div id="mypage_memberDel"></div>						
					</form>	
				</div>
				
				
	    	<div id="mysubpage_lists_div"></div>
	    	
	    	<!--  기존회원정보 수정 시, 통합인증역으로 회원정보를 전달하는 폼  -->
	    	<form action="//kosis.kr/oneid/cmmn/member/GoToOLDMemberInfoMod.do" method="post" id="originModfyForm" name="originModfyForm">
	    		<!-- ID 중복으로 class 변경 문제 발생시 수정-->
	    		<input type="hidden" class="SYS_CD" name="SYS_CD" value="S" />
				<input type="hidden" class="SYS_URL" name="SYS_URL"/>
				<input type="hidden" class="SYS_URL" name="CUR_URL"/>
				<input type="hidden" class="SYS_USR_ID" name="SYS_USR_ID"/>
				<input type="hidden" id="SYS_USR_NAME" name="SYS_USR_NAME"/>
				<input type="hidden" id="SYS_USR_MOBILE" name="SYS_USR_MOBILE"/>
				<input type="hidden" id="SYS_USR_EMAIL" name="SYS_USR_EMAIL"/>
				<input type="hidden" id="SYS_USR_OPENAPI_YN" name="SYS_USR_OPENAPI_YN"/>
				<input type="hidden" id="SYS_USR_BIRTHDAY" name="SYS_USR_BIRTHDAY"/>
				<input type="hidden" id="SYS_USR_SEX" name="SYS_USR_SEX"/>
				<input type="hidden" id="SYS_USR_PHONE" name="SYS_USR_PHONE"/>
				<input type="hidden" id="SYS_USR_DI_INFO" name="SYS_USR_DI_INFO"/>
				<input type="hidden" id="SYS_USR_JOIN_DT" name="SYS_USR_JOIN_DT"/>
				<input type="hidden" id="SYS_USR_PRE_DI_INFO" name="SYS_USR_PRE_DI_INFO"/>
			</form>    
			
			<!--  기존회원정보 탈퇴 시, 통합인증역으로 회원정보를 전달하는 폼  -->	
			<form action="//kosis.kr/oneid/cmmn/login/GoToOLDMemberDrop.do" method="post" id="originDeletForm" name="originDeletForm">
	    		<input type="hidden" class="SYS_CD" name="SYS_CD" value="S" />
				<input type="hidden" class="SYS_URL" name="SYS_URL"/>
				<input type="hidden" class="SYS_URL" name="CUR_URL"/>
				<input type="hidden" class="SYS_USR_ID" name="SYS_USR_ID"/>
			</form>    
	    </div>
	    	  
	    
	   	<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>		
	</div>
</body>
</html>