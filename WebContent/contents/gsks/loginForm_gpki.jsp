<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.sql.*, java.io.*, java.net.*, java.util.*" %>

<%@ include file="/standAPI/gpkisecureweb/demo/JSP/gpkisecureweb.jsp" %>
<%@ page import="com.gpki.servlet.GPKIHttpServletResponse" %>

<%
	String challenge = gpkiresponse.getChallenge();
	//String challenge = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>웹보안 API로그인</title>
<script language='javascript' src='/standAPI/gpkisecureweb/gpkisecureweb/var.js'></script>
<script language='javascript' src='/standAPI/gpkisecureweb/gpkisecureweb/GPKIFunc.js'></script>
<script language='javascript' src='/standAPI/gpkisecureweb/gpkisecureweb/object.js'></script>
<!-- <script language='javascript' src='/standAPI/gpkisecureweb/gpkisecureweb/embobject.js'></script> -->
<script language="javascript">
	
	function fn_regist(form){
		var strData;
		var nResult;
		var strReturnData;
		var strSendData; 

		strData= GPKISubmit(form); 
		nResult = Init();
		
		if( nResult == 117){
			return;
		}

		UbiKeyInit();	

		var sessionID = "";
		
	  if( form.challenge.value != null){
		  sessionID = form.challenge.value;
		  //sessionID = form.challenge.value;
	  }  
			
		if( GPKISecureWeb.SetSessionID(sessionID) != 1){
			return;
		}
		
		nResult = GPKISecureWeb.Login(SiteID, strData);
		strReturnData = GPKISecureWeb.GetReturnData();
		
		if( nResult == 1 ){
			document.gpkiForm.encryptedData.value = strReturnData;
			document.gpkiForm.method = form.method;
			document.gpkiForm.action = "gpki_regist.jsp";
			document.gpkiForm.submit();
		}else{
			if( nResult != 106){
				alert(strReturnData);
			}
		}
	}
	
	function fn_login(form){
		var strData;
		var nResult;
		var strReturnData;
		var strSendData; 

		strData= GPKISubmit(form); 
		nResult = Init();
		
		if( nResult == 117){
			return;
		}

		UbiKeyInit();	

		var sessionID = "";
		
	  if( form.challenge.value != null){
		  sessionID = form.challenge.value;
		  //sessionID = form.challenge.value;
	  }  
			
		if( GPKISecureWeb.SetSessionID(sessionID) != 1){
			return;
		}
		
		nResult = GPKISecureWeb.Login(SiteID, strData);
		strReturnData = GPKISecureWeb.GetReturnData();
		
		if( nResult == 1 ){
			document.gpkiForm.encryptedData.value = strReturnData;
			document.gpkiForm.method = form.method;
			document.gpkiForm.action = "gpki_login.jsp";
			document.gpkiForm.submit();
		}else{
			if( nResult != 106){
				alert(strReturnData);
			}
		}
	}
</script>

</head>

<!-- <body !OnLoad='EmbInit(popForm);'> -->
<body>

<form action="gpki_login.jsp" method="post" name="popForm" >
<input type="hidden" name="challenge" value=<%=challenge%>>
<br>
<table width="100%" height="100%" border=0>
	<tr>
		<th height="50"><font size="4">통계지리정보서비스 관리자</font></th>
	</tr>
	<tr>
		<td align="center" valign="middle">
		
			<table width="600" align="center">
				<tr> 
					<td valign="bottom" align="center">
			
						<table width="550" height="129" border="0" cellpadding="0" cellspacing="0" style="margin-top:16px;">
							<tr> 
								<td align="right" valign="top" background="/standAPI/gpkisecureweb/demo/JSP/img/login_bg_m2.gif">
			
									<table width="400" border="0" cellpadding="0" cellspacing="0" style="margin-top:15px;">
										<tr> 
											<td valign="top" align="center" colspan="2">
												<font size="2">하단의 <b>로그인 버튼</b>을 클릭하여 인증서로 로그인 하십시오.</font></br>
												<font size="2">로그인이 안되시면 <b>인증서를 먼저 등록</b>하십시오.</font>
											</td>
										</tr>
										<tr height="25">
											<td colspan="2"></td>
										</tr>
										<tr> 
											<td valign="middle" align="center">
												<img src="/standAPI/gpkisecureweb/demo/JSP/img/btn_login.gif" width="178" height="36" border="0" style="cursor: hand" onClick="fn_login(popForm);">
											</td>
											<td valign="middle" align="center">
												<img src="/standAPI/gpkisecureweb/demo/JSP/img/btn_gpkiRegist.gif" width="178" height="36" border="0" style="cursor: hand" onClick="fn_regist(popForm);">
											</td>
										</tr>
									</table>
			
								</td>
							</tr>
						</table>
			
					</td>
				</tr>
			</table>
		
		</td>
	</tr>
</table>
</form>

</body>
</html>