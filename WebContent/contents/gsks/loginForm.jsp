<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%
	//로그인+관리자 권한인 경우
	if(loginYn.equals("Y") && sc_authid.equals("01")) response.sendRedirect("index.jsp");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><%=sc_pageTitle %></title>

<script language="javascript">
  function loginClicked() {
    if(document.loginFm.userid.value == "") {
      loginFm.userid.focus();
      alert("아이디를 입력하세요.");
      return;
    } else if(document.loginFm.userpassword.value == "") {
      loginFm.userpassword.focus();
      alert("비밀번호를 입력하세요.");
      return;
    } else if(document.loginFm.userpassword.value != ""){
    	var fieldValue = document.loginFm.userpassword.value;
    	var re =/^.*(?=.{9,20})(?=.*\D)(?=.*[a-zA-Z])(?=.*[!@#$% *^&(){}]).*$/;
    	if(!re.test(fieldValue)){
    	  alert("비밀번호는  숫자와 영문자, 특수문자 등을 혼합하여  9자리 이상이어야 합니다. \n변경 후 재접속 해주십시오.");
    	  return;
    	}
    	
    }
    document.loginFm.action="login.jsp";
    document.loginFm.submit();
    
  }

  function loginEnter() {
    if(event.keyCode == 13) {
      loginClicked();
    }
  }

  function init(){
    loginFm.userid.focus();
  }
</script>
</head>
<body onload="javascript:init();">
<br>
  <table width="100%" height="100%" border=0>
    <tr>
      <th height="50"><font size="4"><%=sc_pageTitle%> 관리자</font></th>
    </tr>
    <tr>
      <td align="center" valign="middle">
      <form name="loginFm" method="post">
        <table width="" border=0 cellpadding=0 cellspacing=1 bgcolor="#CCCCCC">
          <tr>
            <td width="80" align="left" bgcolor="#DDDDDD">&nbsp;* ID</td>
            <td align="left" bgcolor="#FFFFFF">&nbsp;<input type="text" name="userid" maxlength="12" style="width:150px" tabindex="1" value=""></td>
            <td width="80" rowspan="2" align="center" bgcolor="#FFFFFF"><a href="javascript:loginClicked();"><img src="/contents/images/login_pop_loginbtn.gif" alt="로그인" border="0"></a></td>
          </tr>
          <tr>
            <td align="left" bgcolor="#DDDDDD">&nbsp;* Pass</td>
            <td align="left" bgcolor="#FFFFFF">&nbsp;<input type="password" name="userpassword"  style="width:150px" onKeyUp="loginEnter();" tabindex="2" value=""></td>
          </tr>
        </table>
        </form>
      </td>
    </tr>
  </table>
</body>
</html>