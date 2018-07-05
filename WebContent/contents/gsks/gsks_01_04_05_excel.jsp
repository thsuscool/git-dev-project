<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	String what_year = lData.getString("what_year");

	GeneralBroker broker = null;
	RecordModel rm = null;	
	
%>

<br />
<a href="#"><img src="images/admin_button_download_excel.gif" onClick="jo_excel_down();" alt="엑셀다운로드"  title="엑셀다운로드"  height="20px" align="middle" border="0" /></a>
<br />

<div style="clear:both; position:relative; overflow:auto; width:730px; height:350px; padding:7px; ">
<table width="3000" border=0 cellpadding="0" cellspacing="0" class="table1"  >
  <thead>

      <tr>
        <th class="td_top w40" >일련번호</th>
        <th class="td_top w100" >신청일자</th>
        <th class="td_top w100" >제공기관</th>
        <th class="td_top w80" >제공자료</th>
        <th class="td_top w80" >건수</th>
        <th class="td_top w80" >통계자료</th>
        <th class="td_top w80" >통계지역경계</th>
        <th class="td_top w80" >센서스지도</th>
        <th class="td_top w80" >요청목적</th>
        <th class="td_top w80" >DB</th>
        <th class="td_top w80" >연구</th>
        <th class="td_top w80" >작성</th>
        <th class="td_top w150" >활용목적</th>
        <th class="td_top w80" >중앙행정기관</th>
        <th class="td_top w80" >지방자치단체</th>
        <th class="td_top w80" >공사/공단</th>
        <th class="td_top w80" >대학</th>
        <th class="t_end td_top  w80" >민간</th>
      </tr>
    </thead>

    <tbody>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_REQ_EXCEL");
		lData.setString("what_year", what_year);
		rm = broker.getList(lData);
		
		String dt = 	"";
		String nm = 	"";
		String gbn = 	"";
		String su_t = 	"";
		String s1 = 	"";
		String s2 = 	"";
		String s3 = 	"";
		String mok = 	"";
		String b1 = 	"";
		String b2 = 	"";
		String b3 = 	"";
		String goal = 	"";
		String sosok =  "";
		String sosok_001001 = "";
		String sosok_001002 = "";
		String sosok_001003 = "";
		String sosok_001004 = "";
		String sosok_001005 = "";

		while(rm != null && rm.next()) {
			dt = 	StringUtil.verify((String)rm.get("dt"));
			nm = 	StringUtil.verify((String)rm.get("nm"));
			gbn = 	StringUtil.verify((String)rm.get("gbn"));			
			su_t = 	StringUtil.verify((String)rm.get("su_t"));
			s1 = 	StringUtil.verify((String)rm.get("s1"));
			s2 = 	StringUtil.verify((String)rm.get("s2"));
			s3 = 	StringUtil.verify((String)rm.get("s3"));
			
			mok = 	StringUtil.verify((String)rm.get("mok"));
			if ("002001".equals(mok)) mok = "DB";
			if ("002002".equals(mok)) mok = "연구";
			if ("002003".equals(mok)) mok = "작성";
			
			b1 = 	StringUtil.verify((String)rm.get("b1"));
			b2 = 	StringUtil.verify((String)rm.get("b2"));
			b3 = 	StringUtil.verify((String)rm.get("b3"));
			goal = 	StringUtil.verify((String)rm.get("goal"));
			
			sosok_001001 = "";
			sosok_001002 = "";
			sosok_001003 = "";
			sosok_001004 = "";
			sosok_001005 = "";
			
			sosok = StringUtil.verify((String)rm.get("sosok"));
			if ("001001".equals(sosok)) sosok_001001 = "1";
			if ("001002".equals(sosok)) sosok_001002 = "1";
			if ("001003".equals(sosok)) sosok_001003 = "1";
			if ("001004".equals(sosok)) sosok_001004 = "1";
			if ("001005".equals(sosok)) sosok_001005 = "1";
			
			
%>
   			
   			<tr>
   			<td class="cell_center w40"  ><%= cnt+1 %></td>
			<td class="cell_center w100"  ><%= dt %></td>
			<td class="cell_center w100"  ><%= nm %></td>
			<td class="cell_center w150" ><%= gbn %></td>
			<td class="cell_center w80"  ><%= su_t %></td>
			<td class="cell_center w80"  ><%= s1 %></td>
			<td class="cell_center w80"  ><%= s2 %></td>
			<td class="cell_center w80"  ><%= s3 %></td>
			<td class="cell_center w80"  ><%= mok %></td>
			<td class="cell_center w80"  ><%= b1 %></td>
			<td class="cell_center w80"  ><%= b2 %></td>
			<td class="cell_center w80"  ><%= b3 %></td>
			<td class="cell_center w150" ><%= goal %></td>
			<td class="cell_center w80"  ><%= sosok_001001 %></td>
			<td class="cell_center w80"  ><%= sosok_001002 %></td>
			<td class="cell_center w80"  ><%= sosok_001003 %></td>
			<td class="cell_center w80"  ><%= sosok_001004 %></td>
			<td class="cell_center w80"  ><%= sosok_001005 %></td>
	        
	      </tr>
   			
<%		
			cnt++;
		}
		if(cnt == 0) {
%>
			
<%			
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
	</tbody>
</table>

</div>

<script language="javascript">
function jo_excel_down() {
	
	
	document.censusFm.excel_down.value = "<%=what_year%>";
	//alert(document.censusFm.excel_down.value);
	document.censusFm.action = "gsks_01_04_05_excel_down.jsp";
	document.censusFm.submit();
	return false;
	
	/*
	jQuery.ajax({
		type:"POST",
		url:"gsks_01_04_05_excel_down.jsp",
		data:{"what_year": "<%=what_year%>" },
		success:function(data){
			//alert("조회가 완료되었습니다.");
			jQuery('#result_down').html(data);
		},
		error:function(data) {
			
		}
	});
	*/
	
}

</script>

<span id='result_dwon'></span>

