<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String sgis_census_year_id = request.getParameter("sgis_census_year");
	String inUseId = request.getParameter("inUse");
	String yearsId = request.getParameter("years");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>센서스 공간통계 자료신청 년도선택:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/pop.css" />

<script type="text/javascript" language="language">
//<![CDATA[
var isall="0";

function allChecked() {

  var fm=document.censusFm;
  var cnt=fm.yearchk.length;

  if(isall == "0") {
    for(i=0; i < cnt; i++) {
      fm.yearchk[i].checked=true;
    }
    if(cnt == undefined) fm.yearchk.checked=true;	//1개일경우
    isall="1";
  } else if(isall == "1") {
    for(i=0; i < cnt; i++) {
      fm.yearchk[i].checked=false;
    }
    if(cnt == undefined) fm.yearchk.checked=false;	//1개일경우
    isall="0";
  }
}

//년도 선택
function yearSelected() {
  var fm=document.censusFm;
  var cnt=fm.yearchk.length;
  var year="";
  var isyear=0;
  var inUse="";
  opener.document.censusFm.<%=inUseId%>.value="";
  opener.document.censusFm.<%=yearsId%>.value="";

//1개일경우
  if(cnt == undefined) {
    isyear++;
    year = fm.yearchk.value + ",";
    inUse = "Y,";
  }
  
  for(i=0; i < cnt; i++) {
    if(fm.yearchk[i].checked) {
      isyear++;
      year += fm.yearchk[i].value + ",";
      inUse += "Y,";
    }
  }

  if(isyear == 0) {
    alert("선택 항목이 없습니다.");
    return;
  } else {
	  try {
    	opener.document.censusFm.<%=sgis_census_year_id%>.value = year;
    	opener.document.censusFm.<%=yearsId%>.value = year;
    	opener.document.censusFm.<%=inUseId%>.value = inUse;
	  }catch(e) {
		  alert("부모창이 존재하지 않습니다.");
		  window.close();
	  }
  }

  window.close();
}
//]]>
</script>
</head>
<body class="body">
<div id="wrap">
<div style="100px;" class="popup_password">
 <h1 style="100px;" class="f14">년도선택</h1>
<form name="censusFm" method="post" action="">
<%
	GeneralBroker broker = null;
	RecordModel rm = null;

	String sgis_census_req_id = lData.getString("sgis_census_req_id");
	if(StringUtil.isEmpty(sgis_census_req_id))  sgis_census_req_id = "-1";
%>
		<ul><li>&nbsp;&nbsp;전체선택 <input type="checkbox" onclick="allChecked();" title="전체선택" /></li></ul>
   		<dl class="popup_box">
   			<dt></dt>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_AVAILABLE_YEAR");
		lData.setString("sgis_census_req_id", sgis_census_req_id);
		rm = broker.getList(lData);

		while(rm != null && rm.next()) {
			String sgis_census_year = StringUtil.verify((String)rm.get("sgis_census_year"));
			String sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
%>
   				<dd>&nbsp;&nbsp;<input type="checkbox" name="yearchk" value="<%=sgis_census_year %>" <%if(sgis_census_year.equals(sgis_census_req_year)) {%>checked="checked"<%} %> />
   				<%=sgis_census_year %>
   				<input type="hidden" name="inUse" value="N" />
   				<input type="hidden" name="years" value="<%=sgis_census_year %>" />   				
   				</dd>

   				
<%	cnt++;
		}
		if(cnt == 0) {
%>
		<dd>선택하신 대상자료에 해당하는 년도가 없습니다. 대상자료를 다시 선택해 주세요.</dd>
<%			
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
	</dl>
</form>
<p class="cb pt30" align="center"><a href="#" onclick="yearSelected()"><img src="/contents/images/choose.gif" alt="선택" /></a> <a href="#" onclick="window.close();"><img src="/contents/member/images/member_pop_close.gif" alt="닫기" /></a></p>
	</div>
</div>
</body>
</html>