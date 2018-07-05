<%@ page language="java" contentType="text/html;charset=euc-kr"%>

<%@ page import="com.gpki.gpkiapi.cert.*" %>
<%@ page import="com.gpki.gpkiapi.cms.*" %>
<%@ page import="com.gpki.gpkiapi.util.*" %>
<%@ page import="com.dsjdf.jdf.Logger" %>

<%@ include file='/standAPI/gpkisecureweb/demo/JSP/gpkisecureweb.jsp'%>

<%
	X509Certificate cert = null; 
	byte[] signData = null;
	byte[] privatekey_random = null;

	String signType = "";
	String queryString = "";
	//GPKIHttpServletRequest gpkirequest = new GPKIHttpServletRequest(request);

	cert = gpkirequest.getSignerCert(); 
	String subDN = cert.getSubjectDN();
	
	java.math.BigInteger b = cert.getSerialNumber();
	String serial = b.toString();

	int message_type =  gpkirequest.getRequestMessageType();

	if( message_type == gpkirequest.ENCRYPTED_SIGNDATA || message_type == gpkirequest.LOGIN_ENVELOP_SIGN_DATA ||
		message_type == gpkirequest.ENVELOP_SIGNDATA || message_type == gpkirequest.SIGNED_DATA){
		signData = gpkirequest.getSignedData();

		// random»πµÊ
		privatekey_random = gpkirequest.getSignerRValue();
		signType = gpkirequest.getSignType();
	}       

	queryString = gpkirequest.getQueryString();
	
	String subDNValue = URLEncoder.encode(subDN,"euc-kr");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=euc-kr">
<title>GPKI ¿Œ¡ıº≠ µÓ∑œ</title>

<SCRIPT LANGUAGE="JavaScript">
	window.onload = function(){
		var FRM = document.gpkiFORM;		
		FRM.submit();
	}
</SCRIPT>

</head>

<body>

<form id="gpkiFORM" name="gpkiFORM" method="post" action="gpki_proc.jsp">
	<input type="hidden" name="procType" value="regist">
	<input type="hidden" name=subDNValue value="<%=subDNValue%>">
	<input type="hidden" name="serial" value="<%=serial%>">
</form>

</body>
</html>