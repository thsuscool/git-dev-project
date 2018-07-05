<%--
/*********************************************************
 * @source      : gsks_01_excel.jsp
 * @description : 관리자 / 센서스 자료제공 리스트 엑셀다운로드
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008.11.18   SHIN HYUN MYUNG         최초등록
 *********************************************************
--%>
<%@ page language="java" contentType="application/vnd.ms-excel;charset=utf-8"%>
<%@ page import="java.math.BigDecimal"                  %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.jdf.db.DbManager"         %>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp"   %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	if(request.getHeader("User-Agent").indexOf("MSIE 5.5") > -1)
	{
	    response.setHeader("Content-Type", "doesn/matter;");
	    response.setHeader("Content-Disposition", "filename=센서스자료제공리스트.xls");
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename=센서스자료제공리스트.xls");
	    response.setHeader("Content-Description", "JSP Generated Data");
	}

	GeneralBroker broker = null;
	RecordModel rm = null;

	int totrowcnt=0;

	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_APPROVE_LIST");
		rm = broker.getList(lData);
		totrowcnt = rm.getRowCount();

	}catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title></title>
<style type='text/css'>

.table1 {margin:5px 0px 0px 0px; padding:0px; border-collapse:collapse;}
.table1 caption{display: none;}
.table1 th{color:#33698f; background-color:#e3f0f9; border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px; font-size:12px;}
.table1 td{font-weight:normal;text-align:justify;  border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px;}
.table1 .t_end{ border-right:none; }
.table1 .td_top{ border-top:2px solid #72aacf;}
.table1 .td_bottom{ border-bottom:none;}
.table1 .cell_left {text-align:left;}
.table1 .cell_right{text-align:right;}
.table1 .cell_center{text-align:center;}
.table1 .cell_point {background:#f3faff;}
.table1 a:link{font-weight:normal;}
.table1 a:active{font-weight:normal;}
.table1 a:visited{font-weight:normal;}
.table1 a:hover{font-weight:normal;}

</style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="1" border=1>
    <thead>
      <tr>
        <th class="td_top">NO</th>
        <th class="td_top">성명(ID)</th>
        <th class="td_top">구분</th>
        <th class="td_top">대상자료명</th>
        <th class="td_top">년도</th>
        <th class="td_top">승인일자</th>
        <th class="td_top">게시시작일자</th>
        <th class="td_top">게시종료일자</th>
      </tr>
    </thead>
    <tbody>
<%
	int rowcnt=0;

	while(rm.next()) {
			String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
			String sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			String sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			String sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
			String sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
			String sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
			String sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
			String sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
			String sgis_census_app_date = StringUtil.verify((String)rm.get("sgis_census_app_date"));
			String sgis_census_req_y_s_d = StringUtil.verify((String)rm.get("sgis_census_req_y_s_d"));
			String sgis_census_req_y_e_d = StringUtil.verify((String)rm.get("sgis_census_req_y_e_d"));
			String sgis_census_req_y_use_che = String.valueOf((Character)rm.get("sgis_census_req_y_use_che"));
%>
      <tr>
        <td align="center"><%=totrowcnt - rowcnt %></td>
        <td><%=sgis_name %>(<%=sgis_member_id %>)</td>
        <td><%=sgis_census_name %></td>
        <td><%=sgis_census_data_name %></td>
        <td align="center"><%=sgis_census_req_year %></td>
        <td align="center"><%=sgis_census_app_date %></td>
        <td align="center"><%=sgis_census_req_y_s_d %></td>
        <td align="center"><%=sgis_census_req_y_e_d %></td>
      </tr>
<%		rowcnt++;
		}
%>

    </tbody>
  </table>
</body>
</html>