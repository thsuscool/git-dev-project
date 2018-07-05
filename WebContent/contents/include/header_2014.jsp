<%@ page language="java" contentType="text/html;charset=utf-8" %>

<%
	session.setAttribute("returnUrl", request.getRequestURI());
%>

<script type="text/javascript">
function topLogin(){
	var httpCode = location.href.substr(0,5);
//  pop_login = window.open('https://sgis1.kostat.go.kr/contents/member/pop_login.jsp','','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
  pop_login = window.open('https://'+location.host+'/contents/member/pop_login.jsp?httpCode='+httpCode+'','','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
}
</script>

<div class="defaultbox">
	<a href="/" class="logo"><img src="/contents/css/2014_css/img/pic/pic_logo.png" alt="SGIS 통계지리정보서비스" /></a>  
	<div class="navietc">
	<%if(loginYn.equals("Y")){%>
		<a href="/contents/include/logout.jsp">로그아웃</a>
		<a href="/">처음페이지</a>
		<a href="/contents/sitemap/index.jsp">사이트맵</a>
		<a href="/contents/mypage/myPage_04.jsp">마이페이지</a>
	<%} else{ %>
		<a href="#" onclick="topLogin()">로그인</a>
		<a href="/vname_input_seed_mem.jsp">회원가입</a>
		<a href="/">처음페이지</a>
		<a href="/contents/sitemap/index.jsp">사이트맵</a>
	<%	} %>
	
	</div>
</div> 
<ul class="navi">
	<li><a href="/contents/shortcut/shortcut_11.jsp">SGIS 소개</a></li>
	<li><a href="/sgisnavigator/index.jsp?initialMode=join">지도로 보는 통계</a></li>
	<li><a href="http://time.nso.go.kr/kostat/" target="_blank">분석지도</a></li> 
	<li><a href="/sgisComp2">활용지도</a></li>
	<li><a href="/contents/shortcut/shortcut_05_02.jsp">공유마당</a></li>
	<li class="on"><a href="/contents/support/support_07.jsp">참여마당</a></li>
</ul>
<div class="subMenu"></div>