<%@ page language="java" contentType="text/html;charset=utf-8" %>
   <link rel="stylesheet" type="text/css" href="/contents/inc/style.css">
   <script type="text/javascript" language="javascript" src="/contents/inc/script.js"></script>
   <script type="text/javascript" language="javascript">
    //<![CDATA[
           function topLogin(){
        	 pop_login = window.open('/contents/member/pop_login.jsp','','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
           }
     //]]>
   </script>
  <div id="header">
   <table border="0" cellpadding="0" cellspacing="0" width="970" id="table1" height="85">
	<tr>
		<td height="75" rowspan="3" valign="bottom" width="540">
		<a href="/"><img border="0" src="/contents/inc/img/logo.gif" width="180" height="48"  alt="통계지리정보서비스"></a></td>
		<td height="33" width="400" align="right" valign="bottom">
	
		<%if(loginYn.equals("Y")){%>
		<a href="/contents/include/logout.jsp"><img src="/contents/images/new/main_logout_button.gif" alt="로그아웃" /></a> 
		<%}else{ %>
		<a href="#" onclick="topLogin()"><img border="0" src="/contents/inc/img/button_1.gif" width="31" height="13" alt="로그인">
		<%} %>
		</a>&nbsp;
		<img border="0" src="/contents/inc/img/line_01.gif" width="3" height="13">&nbsp;
		<a href="/vname_input_seed_mem.jsp"><img border="0" src="/contents/inc/img/button_2.gif" width="39" height="13" alt="회원가입"></a>&nbsp;
		<img border="0" src="/contents/inc/img/line_01.gif" width="3" height="13">&nbsp;
		<a href="/contents/sitemap/index.jsp"><img border="0" src="/contents/inc/img/button_3.gif" width="38" height="13" alt="사이트맵"></a>&nbsp;
		<img border="0" src="/contents/inc/img/line_01.gif" width="3" height="13">&nbsp;
		<a href="http://sgis1.kostat.go.kr/statistics_eng/html/index.jsp"><img border="0" src="/contents/inc/img/button_4.gif" width="41" height="13" alt="ENGLISH"></a>&nbsp;
		<img border="0" src="/contents/inc/img/line_01.gif" width="3" height="13">&nbsp;
		<a href="/"><img border="0" src="/contents/inc/img/button_5.gif" width="66" height="13" alt="서비스전체보기"></a></td>
		<td height="33" width="30" align="right" valign="bottom"></td>
	</tr>
	<tr>
		<td height="2" width="430" align="right" colspan="2"></td>
	</tr>
	<tr>
		<td height="40" width="430" background="/contents/inc/img/top_bg2.gif" colspan="2">
		
		      <!--1차메뉴시작-->
		      <table border="0" cellpadding="0" cellspacing="0" width="98%" id="table2">
			      <tr>
			      	<td width="172" align="center"><a href="/contents/shortcut/shortcut_02.jsp" class="mB1"><span></span></a></td>
			      	<td align="center"><a href="/contents/search/search_01.jsp" class="mB2"><span></span></a></td>
				    <td width="147" align="center"><a href="/contents/support/support_01.jsp" class="mB3"><span></span></a></td>
				  </tr>
	      	</table>
	      	<!--1차메뉴끝-->
		</td>
	</tr>
	<tr>
		<td height="10" colspan="3">
		<img border="0" src="/contents/inc/img/top_bg.gif" width="970" height="10"></td>
	</tr>
</table>
</div>