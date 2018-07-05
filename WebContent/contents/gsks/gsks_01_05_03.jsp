<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%!
	/**
	 * @desc  문자열 가공
	 * @param String originalStr 대상 문자
	 *        String appendStr   덧붙일 문자
	 *        int    size        분기될 문자열 길이
	 */
	String getProcessCharacter(String originalStr, String appendStr, int size) {

		if(originalStr.length() == size) {

			originalStr = appendStr + originalStr;
		}
		return originalStr;
	}
%>

<%
	DbManager dbmgr           = null;
	RecordModel compareSet    = null;
	RecordModel logSet        = null;
	StringBuffer logQuery     = new StringBuffer(1024);
	StringBuffer compareQuery = new StringBuffer(1024);

	String sgis_menu_d_code_id = lData.getString("sgis_menu_d_code_id");
	String req_year_month = lData.getString("req_year_month");
	String fromYear  = lData.getString("from_yy");
	String fromMonth = lData.getString("from_mm");
	if (sgis_menu_d_code_id.equals("")){
		sgis_menu_d_code_id = "%";
	}
	int year      ;
	int month     ;

	if (req_year_month.equals("")) {
		String toDate = DateTime.getShortDateString();
		year      = NumberUtil.toInt(toDate.substring(0, 4));
		month     = NumberUtil.toInt(toDate.substring(4, 6));
	}else{
		year      = NumberUtil.toInt(req_year_month.substring(0, 4));
		month     = NumberUtil.toInt(req_year_month.substring(5, 7));
	}

	if(StringUtil.isEmpty(fromYear))	fromYear  = Integer.toString(year);
	if(StringUtil.isEmpty(fromMonth))	fromMonth = Integer.toString(month);

	int loopCnt = NumberUtil.toInt(fromMonth) <= 7 ? (NumberUtil.toInt(fromMonth) % 2 == 0 ? 30 : 31) : (NumberUtil.toInt(fromMonth) % 2 == 0 ? 31 : 30);
	
	if(NumberUtil.toInt(fromMonth) == 2) {
		if(NumberUtil.toInt(fromYear) % 4 == 0) loopCnt = 29;
		else																		loopCnt = 28;
	}

	fromMonth = getProcessCharacter(fromMonth, "0", 1);

	lData.setString("key_period", fromYear+"-"+fromMonth);
	lData.setNumber("loop_cnt"  , loopCnt);

	String sgis_menu_h_id         = "";	//상위 아이디
	String sgis_menu_d_name       = "";	//서브 메뉴명
	String sgis_menu_h_name       = "";	//상위 메뉴명

	int maxCount  = 0;
	int minCount  = 0;

	try {

		dbmgr = new DbManager();
		
		
		logQuery.append(" select                              \n");
		for(int iStart=1;iStart<32;iStart++){
			if(iStart == 31){
				logQuery.append(" date_"+iStart+".date_"+iStart+"                              \n");
			}else{
				logQuery.append(" date_"+iStart+".date_"+iStart+",                              \n");
			}
			
		}
		logQuery.append(" from                               \n"); 
		for(int iStart=1;iStart<32;iStart++){
		
		logQuery.append("      (select count(*) date_"+iStart+"                             \n");
		logQuery.append("           from SGIS_VISIT_COUNTS                                  \n");
			if(iStart > 9){
				logQuery.append("          where SGIS_VISIT_DATE like '"+lData.get("key_period")+"-"+iStart+"%'  \n");
			}else{
				logQuery.append("          where SGIS_VISIT_DATE like '"+lData.get("key_period")+"-0"+iStart+"%'  \n");
			}
			if(iStart == 31){
				logQuery.append("        ) date_"+iStart+"                                              \n");
			}else{
				logQuery.append("        ) date_"+iStart+",                                              \n");
			}
		
		}
		

		 
		
		 

		dbmgr.prepareStatement(logQuery.toString(), lData);
		logSet = dbmgr.select();
	} catch(Exception e) {
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		dbmgr.close();
	}

%>
<style type="text/css">
.c_table {margin:5px 0px 0px 0px; padding:0px; border-collapse:collapse;}
.c_table caption{display: none;}
.c_table th{color:#33698f; background-color:#e3f0f9;  padding:5px 7px; font-size:12px;}
.c_table td{font-weight:normal;text-align:justify;  border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; }
.c_table .t_end{ border-right:none; }
.c_table .td_top{ border-top:2px solid #72aacf;}
.c_table .td_bottom{ border-bottom:none;}
.c_table .cell_left {text-align:left;}
.c_table .cell_right{text-align:right;}
.c_table .cell_center{text-align:center;}
.c_table .cell_point {background:#f3faff;}
.c_table a:link{font-weight:normal;}
.c_table a:active{font-weight:normal;}
.c_table a:visited{font-weight:normal;}
.c_table a:hover{font-weight:normal;}
</style>
<script type="text/javascript">
function periodSearch() {
	var fm = document.searchForm;

	fm.action = 'gsks_01_05_03.jsp';
	fm.target = '_self';
	fm.submit();
}

function goPeriodView(menuId) {
	var fm = document.searchForm;
    
    //alert(goPeriodView.arguments.length);
    //alert(menuId);
	//if(goPeriodView.arguments.length != 0) {
	//	searchFm.sgis_menu_d_code_id.value = menuId;
	//}
	
	if(menuId == '1'){
    	fm.action = 'gsks_01_05.jsp';
    }else if(menuId == '2'){
    
	    fm.req_year_month.value ="";
	    fm.from_yy.value ="";
	    fm.from_mm.value ="";
	  	fm.action = 'gsks_01_05_01.jsp';
    }else if(menuId == '3'){
    	fm.action = 'gsks_01_05_02.jsp';
    }

	
	fm.target = '_self';
	fm.submit();
}
</script>
  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>

  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">로그 및 통계조회</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">로그 및 통계조회</a></li>
      </ul>
    </div>
<form name="searchForm" method="post" style="margin:0px;">
	<input type="hidden" name="sgis_menu_d_code_id" value="<%=sgis_menu_d_code_id %>"/>
	<input type="hidden" name="req_year_month" value="<%= req_year_month %>"/>

<div class="content_admin">
		<div class="list_wrap">

<div class="admin_tab_button">
	<table border=0>
		<tr>
			<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
			   <a href="javascript:goPeriodView('1');">
			      <strong>월별 페이지뷰</strong>
			   </a>
			</td>
			<td width="140" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
			   <a href="javascript:goPeriodView('2');"" >
			       <strong>일별 페이지뷰</strong> 
			   </a>
			</td>
			<td width="140" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
			   <a href="javascript:goPeriodView('3');"> <strong>월별 방문자통계</strong> </a></td>  
			<td width="140" align="center" bgcolor="#00BFFF">
			   <a href="javascript:document.searchForm.submit();"><font color="#FFFFFF"><strong>일별 방문자통계</strong></font></a></td>
		</tr>
		<tr>
			<td colspan="4"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="575" height="1px"></td>
		</tr>
	</table>
	</div>
	<div style="padding:10px 0px 10px 0px;">
<%
	String showValue = "";
%>
		<select name="from_yy">
<%
	for(int i=(NumberUtil.toInt(fromYear)-5); i<(NumberUtil.toInt(fromYear)+5); i++) {
%>
			<option value="<%=i %>" <%=i == NumberUtil.toInt(fromYear) ? "selected" : "" %>><%=i %>년</option>
<%} %>
		</select>
		<select name="from_mm">
<%

	for(int i=1; i<13; i++) {
		showValue = getProcessCharacter(Integer.toString(i), "0", 1);
%>
			<option value="<%=showValue %>"<%=i == NumberUtil.toInt(fromMonth) ? "selected" : "" %>><%=showValue %>월</option>
<%} %>
		</select>
		<img src="/contents/gsks/images/popup_button_search.gif" align="absmiddle" onclick="periodSearch()" style="cursor:pointer;"/>
	</div>
	
	<div  style="width:730px;height:100px; overflow:scroll;">
    <table cellpadding="0" cellspacing="1"  width="100%" class="table1">
    <thead>
    <tr>
    	
      
      	 
       	
       		
<%
	for(int i=1; i<= loopCnt; i++) {
%>
				  <th class="td_top" width="300"><%=i %>일</th>
<%
	}
%>
			      <th class="td_top" width="50">최다</th>
			      <th class="td_top" width="50">최소</th>
			      <th class="td_top" width="50">총계</th>
			      <th class="td_top" width="50">평균</th>
			
       
       
       
     </tr>
     </thead>
      	
<%
	if(logSet != null)
	{
		logSet.setIterator();
		BigDecimal date_log    = new BigDecimal("0");	//방문자  달별 접속수
		long max_log    = 0;	//메뉴별 접속수
		long min_log = 0;	//max 비교 값
		double avg_log = 0;	//min 비교 값
		long tot_logs   = 0;		//월별 접속수 합계

		while(logSet.next()) {
			
%>
      			<tr>
<%
for(int i=1; i<=loopCnt; i++) {

	 date_log     = NumberUtil.verify(new BigDecimal((Integer)logSet.get("date_"+i)));
 
	 tot_logs   +=Long.parseLong(date_log.toString()) ;	//월별(i) 기준으로 합계를 낸다.(i = 월과 같음)
	
	 if(Long.parseLong( date_log.toString()) > max_log){
		 max_log = Long.parseLong( date_log.toString());
	 }
	 
	 if(Long.parseLong( date_log.toString()) < min_log){
		 min_log = Long.parseLong( date_log.toString());
	 }
%>
							<td class="cell_center" width="300"><%=date_log %></td>
<%			} %>
							<td class="cell_center" width="50"><%=max_log%></td>
							<td class="cell_center" width="50"><%=min_log%></td>
							<td class="cell_center" width="50"><%=tot_logs %></td>
							<td class="cell_center" width="50"><%=avg_log %></td>
      			</tr>
<%
		}}
%>
					 
 
      		</table>
      		</div>
     

    </div>
  </div>
</form>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
