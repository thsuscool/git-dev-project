<%
/**************************************************************************************************************************
* Program Name  : (String)통합회원찾기 결과 수신 JSP  
* File Name     : (String)returnFindOriginMember.jsp
* Comment       : (String)
* History       : (String)네이버시스템 권차욱, 김성현 2015-07-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %> 

<%
String strUsrId = "";				
String strJoinDT = "";	 	
String strSysUsrSeCd = "";
String strSysCd = "";			//<!-- 2015-09-10 수정 -->
String strMemberType = "";
String strSysUrl = "";
String strCurUrl ="";
String strChkSysCnt = "";
String strSopIdChkYn = "";
String strSopIdChkMsg = "";
String strSopIdChkYnLst = "";;
String strSopUsrId = "";
String strSopUsrJoinDT ="";
String strSopSearchId = "";
String strSopSearchDT ="";
String strKosisIdChkYn = "";
String strKosisIdChkMsg = "";
String strEnaraIdChkYn = "";
String strEnaraIdChkMsg = "";
String strMdssIdChkYn = "";
String strMdssIdChkMsg = "";
String strKosisIdChkYnLst = "";
String strEnaraIdChkYnLst = "";
String strMdssIdChkYnLst = "";
String strKosisUsrId = "";
String strKosisUsrJoinDT = "";
String strEnaraUsrId = "";
String strEnaraUsrJoinDT = "";
String strMdssUsrId = "";
String strMdssUsrJoinDT = "";
String strKosisSearchId = "";
String strEnaraSearchId = "";
String strMdssSearchId = "";
String strKosisSearchDT = "";
String strEnaraSearchDT = "";
String strMdssSearchDT = "";
String strRetInfo = "";
String strDupInfo = "";
String strRetval = "";
String strSysUsrName = "";

try {
	System.out.println("===========================================");
	Map map = (Map)request.getAttribute("findMember");
	
	System.out.println(map);
	
 	strUsrId = (String)map.get("USR_ID");				
	strJoinDT = (String)map.get("JOIN_DT");	 	
	strSysUsrName = (String)map.get("SYS_USR_NAME");		
	strSysUsrSeCd = (String)map.get("SYS_USR_SE_CD");		
	strSysCd = (String)map.get("SYS_CD");			//<!-- 2015-09-10 수정 -->
	strMemberType = (String)map.get("MEMBER_TYPE");	
	strSysUrl = (String)map.get("SYS_URL");	
	strCurUrl = (String)map.get("CUR_URL");	
	strChkSysCnt = (String)map.get("CHK_SYS_CNT");	
	strSopIdChkYn = (String)map.get("SOP_ID_CHK_YN");	
	strSopIdChkMsg = (String)map.get("SOP_ID_CHK_MSG");	
	strSopIdChkYnLst = (String)map.get("SOP_ID_CHK_YN_LST");	
	strSopUsrId = (String)map.get("SOP_USR_ID");	
	strSopUsrJoinDT = (String)map.get("SOP_USR_JOIN_DT");	
	strSopSearchId = (String)map.get("SOP_SEARCH_ID");	
	strSopSearchDT = (String)map.get("SOP_SEARCH_DT");
	strKosisIdChkYn = (String)map.get("KOSIS_ID_CHK_YN");
	strKosisIdChkMsg = (String)map.get("KOSIS_ID_CHK_MSG");
	strEnaraIdChkYn = (String)map.get("ENARA_ID_CHK_YN");
	strEnaraIdChkMsg = (String)map.get("ENARA_ID_CHK_MSG");
	strMdssIdChkYn = (String)map.get("MDSS_ID_CHK_YN");
	strMdssIdChkMsg = (String)map.get("MDSS_ID_CHK_MSG");
	strKosisIdChkYnLst = (String)map.get("KOSIS_ID_CHK_YN_LST");
	strEnaraIdChkYnLst = (String)map.get("ENARA_ID_CHK_YN_LST");
	strMdssIdChkYnLst = (String)map.get("MDSS_ID_CHK_YN_LST");
	strKosisUsrId = (String)map.get("KOSIS_USR_ID");
	strKosisUsrJoinDT = (String)map.get("KOSIS_USR_JOIN_DT");
	strEnaraUsrId = (String)map.get("ENARA_USR_ID");
	strEnaraUsrJoinDT = (String)map.get("ENARA_USR_JOIN_DT");
	strMdssUsrId = (String)map.get("MDSS_USR_ID");
	strMdssUsrJoinDT = (String)map.get("MDSS_USR_JOIN_DT");
	strKosisSearchId = (String)map.get("KOSIS_SEARCH_ID");
	strEnaraSearchId = (String)map.get("ENARA_SEARCH_ID");
	strMdssSearchId = (String)map.get("MDSS_SEARCH_ID");
	strKosisSearchDT = (String)map.get("KOSIS_SEARCH_DT");
	strEnaraSearchDT = (String)map.get("ENARA_SEARCH_DT");
	strMdssSearchDT = (String)map.get("MDSS_SEARCH_DT");
	strRetInfo = (String)map.get("retInfo");
	strDupInfo = (String)map.get("dupInfo");
	strRetval = (String)map.get("RET_VAL");
	
} catch (Exception e) {
	System.out.println("############"+e);
}
%>

	<!DOCTYPE>
	<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				$("#successFindOriginMemberForm").submit();
			});
		</script>
	</head>
	<body>
		<form action="//kosis.kr/oneid/cmmn/member/SearchMemberInfoRet.do" method="post" id="successFindOriginMemberForm" name="successFindOriginMemberForm">
			<input type="hidden" id="USR_ID" name="USR_ID" value="<%=strUsrId %>" />
			<input type="hidden" id="JOIN_DT" name="JOIN_DT" value="<%=strJoinDT %>" />
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="<%=strSysCd %>" />	<!-- 2015-09-10 수정 -->
			<input type="hidden" id="SYS_USR_NAME" name="SYS_USR_NAME" value="<%=strSysUsrName %>" />
			<input type="hidden" id="SYS_USR_SE_CD" name="SYS_USR_SE_CD" value="<%=strSysUsrSeCd %>" />
			<input type="hidden" id="MEMBER_TYPE" name="MEMBER_TYPE" value="<%=strMemberType %>" />
			<input type="hidden" id="CUR_URL" name="CUR_URL" value="<%=strCurUrl %>" />
			<input type="hidden" id="CHK_SYS_CNT" name="CHK_SYS_CNT" value="<%=strChkSysCnt %>" />
			<input type="hidden" id="SOP_ID_CHK_YN" name="SOP_ID_CHK_YN" value="<%=strSopIdChkYn %>" />
			<input type="hidden" id="SOP_ID_CHK_MSG" name="SOP_ID_CHK_MSG" value="<%=strSopIdChkMsg %>" />
			<input type="hidden" id="SOP_ID_CHK_YN_LST" name="SOP_ID_CHK_YN_LST" value="<%=strSopIdChkYnLst %>" />
			<input type="hidden" id="SOP_USR_ID" name="SOP_USR_ID" value="<%=strSopUsrId %>" />
			<input type="hidden" id="SOP_USR_JOIN_DT" name="SOP_USR_JOIN_DT" value="<%=strSopUsrJoinDT %>" />
			<input type="hidden" id="SOP_SEARCH_ID" name="SOP_SEARCH_ID" value="<%=strSopSearchId %>" />
			<input type="hidden" id="SOP_SEARCH_DT" name="SOP_SEARCH_DT" value="<%=strSopSearchDT %>" />	
			<input type="hidden" id="KOSIS_ID_CHK_YN" name="KOSIS_ID_CHK_YN" value="<%=strKosisIdChkYn%>" />
			<input type="hidden" id="KOSIS_ID_CHK_MSG" name="KOSIS_ID_CHK_MSG" value="<%=strKosisIdChkMsg%>" />
			<input type="hidden" id="ENARA_ID_CHK_YN" name="ENARA_ID_CHK_YN" value="<%=strEnaraIdChkYn%>" />
			<input type="hidden" id="ENARA_ID_CHK_MSG" name="ENARA_ID_CHK_MSG" value="<%=strEnaraIdChkMsg%>" />
			<input type="hidden" id="MDSS_ID_CHK_YN" name="MDSS_ID_CHK_YN" value="<%=strMdssIdChkYn%>" />
			<input type="hidden" id="MDSS_ID_CHK_MSG" name="MDSS_ID_CHK_MSG" value="<%=strMdssIdChkMsg%>" />
			<input type="hidden" id="KOSIS_ID_CHK_YN_LST" name="KOSIS_ID_CHK_YN_LST" value="<%=strKosisIdChkYnLst%>" />
			<input type="hidden" id="ENARA_ID_CHK_YN_LST" name="ENARA_ID_CHK_YN_LST" value="<%=strEnaraIdChkYnLst%>" />
			<input type="hidden" id="MDSS_ID_CHK_YN_LST" name="MDSS_ID_CHK_YN_LST" value="<%=strMdssIdChkYnLst%>" />
			<input type="hidden" id="KOSIS_USR_ID" name="KOSIS_USR_ID" value="<%=strKosisUsrId%>" />
			<input type="hidden" id="KOSIS_USR_JOIN_DT" name="KOSIS_USR_JOIN_DT" value="<%=strKosisUsrJoinDT%>" />
			<input type="hidden" id="ENARA_USR_ID" name="ENARA_USR_ID" value="<%=strEnaraUsrId%>" />
			<input type="hidden" id="ENARA_USR_JOIN_DT" name="ENARA_USR_JOIN_DT" value="<%=strEnaraUsrJoinDT%>" />
			<input type="hidden" id="MDSS_USR_ID" name="MDSS_USR_ID" value="<%=strMdssUsrId%>" />
			<input type="hidden" id="MDSS_USR_JOIN_DT" name="MDSS_USR_JOIN_DT" value="<%=strMdssUsrJoinDT%>" />
			<input type="hidden" id="KOSIS_SEARCH_ID" name="KOSIS_SEARCH_ID" value="<%=strKosisSearchId%>" />
			<input type="hidden" id="ENARA_SEARCH_ID" name="ENARA_SEARCH_ID" value="<%=strEnaraSearchId%>" />
			<input type="hidden" id="MDSS_SEARCH_ID" name="MDSS_SEARCH_ID" value="<%=strMdssSearchId%>" />
			<input type="hidden" id="KOSIS_SEARCH_DT" name="KOSIS_SEARCH_DT" value="<%=strKosisSearchDT%>" />
			<input type="hidden" id="ENARA_SEARCH_DT" name="ENARA_SEARCH_DT" value="<%=strEnaraSearchDT%>" />
			<input type="hidden" id="MDSS_SEARCH_DT" name="MDSS_SEARCH_DT" value="<%=strMdssSearchDT%>" />	
			<input type="hidden" id="retInfo" name="retInfo" value="<%=strRetInfo%>" />
			<input type="hidden" id="dupInfo" name="dupInfo" value="<%=strDupInfo%>" />	
			<input type="hidden" id="RET_VAL" name="RET_VAL" value="<%=strRetval%>" />	
		</form>
	</body>
	</html>