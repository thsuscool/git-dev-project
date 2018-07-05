<%
/**************************************************************************************************************************
* Program Name  : 하단 Footer JSP  
* File Name     : includeBottom.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-22
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:choose>
<c:when test="${ type == 'hidden' }">
	<div class="relaHidden">
		<!-- mng_s  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
		<iframe id="authFrame" width="0" height="0" style="border:0px;" title="SSO인증"></iframe>				<!--// SSO인증 -->
		<iframe id="registerFrame" width="0" height="0" style="border:0px;" title="회원가입"></iframe>					<!--// 회원가입 -->
		<iframe id="unRegisterFrame" width="0" height="0" style="border:0px;" title="회원탈퇴"></iframe>				<!--// 회원탈퇴 -->
		<iframe id="loginFrame" width="0" height="0" style="border:0px;" title="로그인"></iframe>					<!--// 로그인 -->
		<iframe id="logoutFrame" width="0" height="0" style="border:0px;" title="로그아웃"></iframe>					<!--// 로그아웃 -->
		<iframe id="modifyFrame" width="0" height="0" style="border:0px;" title="회원수정"></iframe>					<!--// 회원수정 -->
		<!-- mng_e 주석내용 웹표준 src 제거 2017.08.09 이경현 -->
	</div>
</c:when>
<c:otherwise>
	<script src="/js/common/includeBottom.js"></script> <!--2017.12.12 [개발팀] 접근성 조치  -->
	<!-- hidden일 경우 안보여줌 -->
	<div class="rela">
		<img src="/img/pic/pic_copyLogo.png" alt="통계청 바로가기" />
	 	<ul>
	 		<li><a href="/view/member/personalInfo" style="color:blue; font-weight:bold;">개인정보처리방침</a></li>
	 		<li><a href="/view/member/emailInfo">이메일무단수집거부</a></li>
	 		<li><a href="/view/member/clause">이용약관</a></li>
	 	</ul>
	 	<address>
			<span class="post">(35208) 대전광역시 서구 청사로 189 (둔산동, 정부대전청사 3동)</span> 
			<span>통계청콜센터 : 02)2012-9114</span>      
			<span>관리자 : 042)481-2342</span>
			<span>자료제공담당자 : 042)481-2438</span>
			<span><br />Copyright Statistics Korea. All rights reserved.</span>
		</address>
	
		<div class="serviceLayer">
			<ol>
			<!-- 
				<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdis.kostat.go.kr');">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');">통계분류</a></li>
			 -->
				<li><a href="javascript:goExternalUrlLink('http://www.kostat.go.kr');">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('http://kosis.kr');">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('http://mdis.kostat.go.kr');">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('http://www.index.go.kr');">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('http://meta.narastat.kr');">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('http://kssc.kostat.go.kr');">통계분류</a></li>
			</ol>
		</div>
<!-- 		2017.05.12 마크 삭제 -->
<!-- 		<a href="http://www.gov30.go.kr" target="_blank"><img src="/img/common/mark_30.gif" style="width:54px;height:54px;margin-left:700px;"></a> -->
		<a href="javascript:void(0)" class="btnService">통계청 주요서비스</a>
			
	<!-- mng_s  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
		<iframe id="authFrame" width="0" height="0" style="border:0px;" title="SSO인증"></iframe>				<!--// SSO인증 -->
		<iframe id="registerFrame" width="0" height="0" style="border:0px;" title="회원가입"></iframe>					<!--// 회원가입 -->
		<iframe id="unRegisterFrame" width="0" height="0" style="border:0px;" title="회원탈퇴"></iframe>				<!--// 회원탈퇴 -->
		<iframe id="loginFrame" width="0" height="0" style="border:0px;" title="로그인"></iframe>					<!--// 로그인 -->
		<iframe id="logoutFrame" width="0" height="0" style="border:0px;" title="로그아웃"></iframe>					<!--// 로그아웃 -->
		<iframe id="modifyFrame" width="0" height="0" style="border:0px;" title="회원수정"></iframe>					<!--// 회원수정 -->
	<!-- mng_e  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
	</div>
</c:otherwise>
</c:choose>