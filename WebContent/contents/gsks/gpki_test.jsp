<%@ page language="java" contentType="text/html;charset=euc-kr" %>

<%@ page import="com.gpki.gpkiapi.cert.*" %>
<%@ page import="com.gpki.gpkiapi.cms.*" %>
<%@ page import="com.gpki.gpkiapi.util.*" %>
<%@ page import="com.dsjdf.jdf.Logger" %>

<%@ page import="java.net.URLEncoder" %>

<%
	String serial = "";
	String subDN = "";
	
	//serial = "11622588789569624586268637385627693830700138076";
	//subDN = "cn=043������001,ou=people,ou=���û,o=Government of Korea,c=KR";
	
	serial = "20826451223842879853537628439164549868741414611";
	subDN = "cn=043�輱��01,ou=people,ou=���û,o=Government of Korea,c=KR";

	String subDNValue = URLEncoder.encode(subDN,"euc-kr");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=euc-kr">
<title>GPKI ������ �׽�Ʈ ������</title>

<SCRIPT LANGUAGE="JavaScript">
	function fn_proc(procType){
		var FRM = document.gpkiFORM;
		
		FRM.procType.value = procType;
		FRM.submit();
	}
</SCRIPT>

</head>

<body>

<center>
<form id="gpkiFORM" name="gpkiFORM" method="post" action="gpki_proc.jsp">
	<input type="hidden" name="procType" value="">
	<input type="hidden" name="subDNValue" value="<%=subDNValue%>">
	<input type="hidden" name="serial" value="<%=serial%>">
	<table width="300">
		<tr height="50" align="center">
			<td colspan="2"><b>������ �׽�Ʈ ������</b></td>
		</tr>
		<tr align="center">
			<td><input type="button" name="login" value="�α���" onclick="fn_proc('login');"/></td>
			<td><input type="button" name="regist" value="������ ���" onclick="fn_proc('regist');"/></td>
		</tr>
	</table>
</form>
</center>

</body>
</html>