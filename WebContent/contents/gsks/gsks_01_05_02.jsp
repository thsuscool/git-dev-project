<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.*"%>
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

	String req_year_month = lData.getString("req_year_month");
	String fromYear  = lData.getString("from_yy");
	int year;
	int month;
	if (req_year_month.equals("")) {
		String toDate = DateTime.getShortDateString();
		year      = NumberUtil.toInt(toDate.substring(0, 4));
		month     = NumberUtil.toInt(toDate.substring(4, 6));
	}else{
		year      = NumberUtil.toInt(req_year_month.substring(0, 4));
		month     = NumberUtil.toInt(req_year_month.substring(5, 7));
	}
	

	String toYear  = lData.getString("to_yy");
	String toMonth = lData.getString("to_mm");

	if(StringUtil.isEmpty(fromYear))	fromYear  = Integer.toString(year);
	lData.setString("key_year"  , fromYear);

	String sgis_menu_h_id         = "";	//상위 아이디
	String sgis_menu_d_name       = "";	//서브 메뉴명
	String sgis_menu_h_name       = "";	//상위 메뉴명
	String sgis_menu_d_code_id    = "";

	int maxCount  = 0;
	int minCount  = 0;
	
	
	
		

	try {

		dbmgr = new DbManager();

	  
		logQuery.append(" select                              \n");
			for(int iStart=1;iStart<13;iStart++){
				if(iStart == 12){
					logQuery.append(" month_"+iStart+".month_"+iStart+"                              \n");
				}else{
					logQuery.append(" month_"+iStart+".month_"+iStart+",                              \n");
				}
				
			}
		logQuery.append(" from                               \n"); 
			for(int iStart=1;iStart<13;iStart++){
			
			logQuery.append("      (select count(*) month_"+iStart+"                             \n");
			logQuery.append("           from SGIS_VISIT_COUNTS                                  \n");
			if(iStart > 9){
				logQuery.append("          where SGIS_VISIT_DATE like '"+lData.get("key_year")+"-"+iStart+"%'  \n");
			}else{
				logQuery.append("          where SGIS_VISIT_DATE like '"+lData.get("key_year")+"-0"+iStart+"%'  \n");
			}
			if(iStart == 12){
				logQuery.append("        ) month_"+iStart+"                                              \n");
			}else{
				logQuery.append("        ) month_"+iStart+",                                              \n");
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
	var searchFm = document.searchForm;

	searchFm.action = 'gsks_01_05_02.jsp';
	searchFm.target = '_self';

	searchFm.submit();
}

function goPeriodView(menuId,ym) {
	var searchFm = document.searchForm;
	 
    if (ym < 10){
       ym = "0"+ym;
    }
    
     
    searchFm.req_year_month.value = searchFm.from_yy.value+"-"+ym;
    
	if(menuId == '1'){
    	searchFm.action = 'gsks_01_05.jsp';
    }else if(menuId == '2'){
    	searchFm.action = 'gsks_01_05_01.jsp';
    }else{
    	searchFm.action = 'gsks_01_05_03.jsp';
    }
	searchFm.target = '_self';

	searchFm.submit();
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
	<input type="hidden" name="sgis_menu_d_code_id"/>
	<input type="hidden" name="req_year_month"/>

<div class="content_admin">
		<div class="list_wrap">

<div class="admin_tab_button">
	<table border=0>
		<tr>
			<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
			   <a href="javascript:goPeriodView('1');"> <strong>월별 페이지뷰</strong></a></td>
			<td width="140" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
			   <a href="javascript:goPeriodView('2');"><strong>일별 페이지뷰</strong></a></td>
			<td width="140" align="center" bgcolor="#00BFFF">
			   <a href="javascript:document.searchForm.submit();"><font color="#FFFFFF"><strong>월별 방문자통계</strong></font></a></td>  
			<td width="140" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
			   <a href="javascript:goPeriodView('4','<%= month%>');"><strong>일별 방문자통계</strong></a></td>    
		</tr>
		<tr>
			<td colspan="4"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="575" height="1px"></td>
		</tr>
	</table>
	</div>
	<div style="padding:10px 0px 10px 0px;">
		<select name="from_yy">
<%
	for(int j=(NumberUtil.toInt(fromYear)-5); j<(NumberUtil.toInt(fromYear)+5); j++) {
%>
			<option value="<%=j %>" <%=j == NumberUtil.toInt(fromYear) ? "selected" : "" %>><%=j %>년</option>
<%} %>
		</select>
		<img src="/contents/gsks/images/popup_button_search.gif" align="absmiddle" onclick="periodSearch()" style="cursor:pointer;"/>
	</div>
	<table cellpadding="0" cellspacing="1" class="c_table">
    <tr>
      
      <td>
      	 
       	<table width="100" cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
       		<thead>
       			<th class="td_top" width="100" align="center">월</th>
       			<th class="td_top" width="300" align="center">방문자 통계</th>

			     
			</thead>
       	</table>
      	 
       </td>
       
     </tr>
     <tr>
       <td width="270" valign="top">
       	 
         <table cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
 


<%int monCnt     = 12;
	if(logSet != null)
	{
		logSet.setIterator();
		BigDecimal month_log    = new BigDecimal("0");	//방문자  달별 접속수
		long max_log    = 0;	//메뉴별 접속수
		long min_log = 0;	//max 비교 값
		double avg_log = 0;	//min 비교 값
		long tot_logs   = 0;		//월별 접속수 합계
			
%>
      			 
<%while(logSet.next()) 
			{
				for(int i=1; i<=monCnt; i++) {

					month_log     = NumberUtil.verify(new BigDecimal((Integer)logSet.get("month_"+i)));
				
					tot_logs   +=Long.parseLong(month_log.toString()) ;	//월별(i) 기준으로 합계를 낸다.(i = 월과 같음)
					
					if(Long.parseLong( month_log.toString()) > max_log){
						 max_log = Long.parseLong( month_log.toString());
					 }
					 
					 if(Long.parseLong( month_log.toString()) < min_log){
						 min_log = Long.parseLong( month_log.toString());
					 }

					 
%>			<tr>
			    <td class="cell_center" width="100" ><b><%=i %>월</b></td>
				<td class="cell_center" width="300" ><a href="javascript:goPeriodView('3','<%=i %>')"><%=month_log %></a></td>
			</tr>
<%				}
			} 
			avg_log =  tot_logs/Double.parseDouble(String.valueOf(monCnt));
			


%>          
		    <tr>
			    <td class="cell_center" width="100" align="center"><b>최소</b></td>
				<td class="cell_center" width="300" align="center"><%=min_log %></td>
			</tr>	
			<tr>
			    <td class="cell_center" width="100" align="center"><b>최대</b></td>
				<td class="cell_center" width="300" align="center"><%=max_log %></td>
			</tr>
			<tr>
			    <td class="cell_center" width="100" align="center"><b>평균</b></td>
				<td class="cell_center" width="300" align="center"><%=Math.round(avg_log) %></td>
			</tr>
			<tr>
			    <td class="cell_center" width="100" align="center"><b>합계</b></td>
				<td class="cell_center" width="300" align="center"><%=tot_logs %></td>
			</tr>	 
      			
<%
		}
%>



      			
      		</table>
      		 
      	</td>
      
      </tr>
</table>

    </div>
  </div>
</form>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
