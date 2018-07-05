<%
	String usr_id 		= (String) request.getAttribute("USR_ID");
	String gubun_cd 	= (String) request.getAttribute("GUBUN_CD");
	String sys_cd 		= (String) request.getAttribute("SYS_CD");
	String return_val 	= (String) request.getAttribute("RETURN_VAL");
	
	out.println( usr_id + "," + gubun_cd + "," + sys_cd + "," + return_val );
%>"src/main/webapp/WEB-INF/jsp/member/_600_memberMng_5fjsp.java"