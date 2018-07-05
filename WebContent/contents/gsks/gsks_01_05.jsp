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
  RecordModel titleSet        = null;
  StringBuffer logQuery     = new StringBuffer(1024);
  StringBuffer compareQuery = new StringBuffer(1024);
  StringBuffer titleQuery = new StringBuffer(1024);

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

    //메뉴리스트를 조회함.
    titleQuery.append(" select x.sgis_menu_d_code_id sgis_menu_d_code_id   \n");
    titleQuery.append("       ,x.sgis_menu_d_name sgis_menu_d_name   \n");
    titleQuery.append("       ,z.sgis_menu_h_name sgis_menu_h_name   \n");
    titleQuery.append("       ,z.sgis_menu_h_id sgis_menu_h_id   \n");
    titleQuery.append("   from  sgis_menu_config x, sgis_menu_high_code z        \n");
    titleQuery.append("   where x.sgis_menu_use_yn = 'Y'        \n");
    titleQuery.append("   and x.sgis_menu_d_code_id = x.sgis_menu_d_code_id        \n");
    titleQuery.append("   and x.sgis_menu_h_id = z.sgis_menu_h_id        \n");
    titleQuery.append("   order by z.sgis_menu_h_id ,x.sgis_menu_d_code_id        \n");

    dbmgr.prepareStatement(titleQuery.toString(), lData);
    titleSet = dbmgr.select();

    compareQuery.append(" select to_char(max(log_count)) max_count   \n");
    compareQuery.append("       ,to_char(min(log_count)) min_count   \n");
    compareQuery.append("   from                                     \n");
    compareQuery.append("   (                                        \n");
    compareQuery.append("     select count(*) log_count              \n");
    compareQuery.append("       from sgis_page_log                   \n");
    compareQuery.append("       where sgis_menu_connect_time like :key_year||'%'  \n");
    compareQuery.append("      group by sgis_menu_d_code_id          \n");
    compareQuery.append("   )                                        \n");

    dbmgr.prepareStatement(compareQuery.toString(), lData);
    compareSet = dbmgr.select();

    if(compareSet != null && compareSet.next()) {

      maxCount = NumberUtil.toInt(StringUtil.verify((String)compareSet.get("max_count")));
      minCount = NumberUtil.toInt(StringUtil.verify((String)compareSet.get("min_count")));
    }




    //속도 문제로 인하여 쿼리 수정
    int nextYear = Integer.parseInt(lData.get("key_year"))+1;
    logQuery.append("	select                                                                            	\n");
    logQuery.append("	to_char(x.sgis_menu_d_name) sgis_menu_d_name,                                              	\n");
    logQuery.append("	to_char(x.sgis_menu_d_code_id )sgis_menu_d_code_id,                                        	\n");
    logQuery.append("	to_char(z.sgis_menu_h_id) sgis_menu_h_id,                                                  	\n");
    logQuery.append("	to_char(x.sgis_menu_d_code_id) sgis_menu_d_code_id,                                        	\n");
    logQuery.append("	to_char(z.sgis_menu_h_name) sgis_menu_h_name,                                     	\n");
    logQuery.append("	sum(y.month_1) month_1,                                                           	\n");
    logQuery.append("	sum(y.month_2) month_2,                                                           	\n");
    logQuery.append("	sum(y.month_3) month_3,                                                           	\n");
    logQuery.append("	sum(y.month_4) month_4,                                                           	\n");
    logQuery.append("	sum(y.month_5) month_5,                                                           	\n");
    logQuery.append("	sum(y.month_6) month_6,                                                           	\n");
    logQuery.append("	sum(y.month_7) month_7,                                                           	\n");
    logQuery.append("	sum(y.month_8) month_8,                                                           	\n");
    logQuery.append("	sum(y.month_9) month_9,                                                           	\n");
    logQuery.append("	sum(y.month_10) month_10,                                                         	\n");
    logQuery.append("	sum(y.month_11) month_11,                                                         	\n");
    logQuery.append("	sum(y.month_12) month_12,                                                         	\n");
    logQuery.append("	to_char(max(y.log_count),'9,999,999') max_log,                                    	\n");
    logQuery.append("	to_char(min(y.log_count),'9,999,999') min_log,                                    	\n");
    logQuery.append("	to_char(sum(y.log_count),'9,999,999') tot_log,                                    	\n");
    logQuery.append("	to_char(sum(y.log_count) / to_char(sysdate,'mm'), '9,999,999.0') avg_log          	\n");
    logQuery.append("	                                                                                  	\n");
    logQuery.append("	from                                                                              	\n");
    logQuery.append("	sgis_menu_config x,                                                               	\n");
    logQuery.append("	(                                                                                 	\n");
    logQuery.append("	    select                                                                        	\n");
    logQuery.append("	    sgis_menu_d_code_id,                                                          	\n");
    logQuery.append("	    log_count,                                                                    	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '01', log_count, 0) month_1,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '02', log_count, 0) month_2,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '03', log_count, 0) month_3,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '04', log_count, 0) month_4,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '05', log_count, 0) month_5,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '06', log_count, 0) month_6,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '07', log_count, 0) month_7,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '08', log_count, 0) month_8,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '09', log_count, 0) month_9,     	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '10', log_count, 0) month_10,    	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '11', log_count, 0) month_11,    	\n");
    logQuery.append("	    decode(sgis_menu_connect_time, '12', log_count, 0) month_12     	\n");
    logQuery.append("	    from                                                                          	\n");
    logQuery.append("	        (                                                                         	\n");
    logQuery.append("	        select                                                                    	\n");
    logQuery.append("	            sgis_menu_d_code_id,                                                  	\n");
    logQuery.append("	            to_char(sgis_menu_connect_time,'mm') sgis_menu_connect_time,           	\n");
    logQuery.append("	            count(*) log_count                                                    	\n");
    logQuery.append("	        from                                                                      	\n");
    logQuery.append("	            sgis_page_log                                                         	\n");
    logQuery.append("	        where                                                                     	\n");
    logQuery.append("	      sgis_menu_connect_time between to_timestamp('"+lData.get("key_year")+"','yyyy') and  to_timestamp('"+nextYear+"','yyyy')     	\n");
    logQuery.append("	        group by sgis_menu_d_code_id,to_char(sgis_menu_connect_time,'mm')        	\n");
    logQuery.append("	        )                                                                         	\n");
    logQuery.append("	) y,                                                                              	\n");
    logQuery.append("	sgis_menu_high_code z                                                             	\n");
    logQuery.append("	where                                                                             	\n");
    logQuery.append("	    x.sgis_menu_use_yn = 'Y'                                                      	\n");
    logQuery.append("	    and x.sgis_menu_d_code_id = y.sgis_menu_d_code_id                             	\n");
    logQuery.append("	    and x.sgis_menu_h_id = z.sgis_menu_h_id                                             		\n");
    logQuery.append("	group by x.sgis_menu_d_name, x.sgis_menu_d_code_id, z.sgis_menu_h_name, z.sgis_menu_h_id		\n");
    logQuery.append("	order by z.sgis_menu_h_id ,x.sgis_menu_d_code_id                                        		\n");

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

  searchFm.action = 'gsks_01_05.jsp';
  searchFm.target = '_self';

  searchFm.submit();
}

function goPeriodView(menuId,ym) {
  var searchFm = document.searchForm;
  if(goPeriodView.arguments.length != 0) {
    searchFm.sgis_menu_d_code_id.value = menuId;
  }

    if (ym < 10){
       ym = "0"+ym;
    }

    searchFm.sgis_menu_d_code_id.value = menuId;
    searchFm.req_year_month.value = searchFm.from_yy.value+"-"+ym;
    if(menuId == '3'){
      searchFm.action = 'gsks_01_05_02.jsp';
    }else if(menuId == '4'){
      searchFm.action = 'gsks_01_05_03.jsp';
    }else{
      searchFm.action = 'gsks_01_05_01.jsp';
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
      <td width="140" height="25" align="center" bgcolor="#00BFFF">
         <a href="javascript:document.searchForm.submit();"><font color="#FFFFFF"><strong>월별 페이지뷰</strong></font></a></td>
      <td width="140" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
         <a href="javascript:goPeriodView('','<%= month%>');"><strong>일별 페이지뷰</strong></a></td>
      <td width="140" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
         <a href="javascript:goPeriodView('3');"> <strong>월별 방문자통계</strong> </a></td>
      <td width="140" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
         <a href="javascript:goPeriodView('4');"><strong>일별 방문자통계</strong></a></td>
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
      <td width="300">
        <table cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
          <thead>
            <th class="td_top" width="130">상위메뉴명</th>
            <th class="td_top" width="170">메뉴명</th>
          </thead>
        </table>
      </td>
      <td>
        <div id="header_div" style="width:390px; overflow:hidden;">
         <table width="800" cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
           <thead>
<%
  int monCnt     = 12;
  for(int i=1; i<= monCnt; i++) {
%>
            <th class="td_top" width="50"><%=i %>월</th>
<%
  }
%>
            <th class="td_top" width="50">최다</th>
            <th class="td_top" width="50">최소</th>
            <th class="td_top" width="50">총계</th>
            <th class="td_top" width="50">평균</th>
          </thead>
         </table>
        </div>
       </td>
     </tr>
     <tr>
       <td width="300" valign="top">
          <div id="contents_div1" style="height:272px;overflow-y:hidden;">
         <table cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
<%
  String temp_id = "";

  while(titleSet != null && titleSet.next()) {
    sgis_menu_h_id         = titleSet.get("sgis_menu_h_id").toString();
    sgis_menu_d_name       = titleSet.get("sgis_menu_d_name").toString();
    sgis_menu_h_name       = titleSet.get("sgis_menu_h_name").toString();


    if(sgis_menu_h_id.equals(temp_id))	sgis_menu_h_name = "";	//동일한 상위 메뉴명일경우 빈값 처리
    temp_id = sgis_menu_h_id;
%>
            <tr>
              <td class="cell_left" width="130"><b><%=sgis_menu_h_name %></b></td>
              <td class="cell_left" width="170"><%=sgis_menu_d_name %></td>
            </tr>
<%
  }
%>
            <tr>
              <td class="cell_center" width="270" colspan="2">최다</td>
            </tr>
            <tr>
              <td class="cell_center" width="270" colspan="2">최소</td>
            </tr>
            <tr>
              <td class="cell_center" width="270" colspan="2">총계</td>
            </tr>
            <tr>
              <td class="cell_center" width="270" colspan="2">평균</td>
            </tr>
          </table>
          </div>
        </td>
        <td>
          <div id="contents_div2" style="width:407px;height:289px; overflow:scroll;"
           onscroll="header_div.scrollLeft=this.scrollLeft;contents_div1.scrollTop=this.scrollTop;">
          <table width="" cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
<%
  if(logSet != null)
  {
    logSet.setIterator();

    BigDecimal month_log    = new BigDecimal("0");	//메뉴별 접속수
    BigDecimal compareVal_b = new BigDecimal("0");	//max 비교 값
    BigDecimal compareVal_s = new BigDecimal("0");	//min 비교 값
    BigDecimal[] tot_logs   = new BigDecimal[12];		//월별 접속수 합계
    for(int i=0; i<12; i++) {

      tot_logs[i] = new BigDecimal("0");
    }

    String max_log        = "";
    String min_log        = "";
    String tot_log        = "";
    String avg_log        = "";

    boolean trueFlag = false;

    for(int j=0;j<titleSet.getRowCount();j++){
     trueFlag = false;
    if(logSet != null && logSet.getRowCount()>0){

    for(int t = 0;t<logSet.getRowCount();t++) {

    //메뉴 리스트와 조회한 데이터의 메뉴명을 비교하여 데이터가 없는경우는 0으로 보여줌 데이터가 있으면 그대로 보여줌
    if(titleSet.get(j,"sgis_menu_d_code_id").toString().equals(logSet.get(t,"sgis_menu_d_code_id").toString())){


    //while(logSet.next()) {
      max_log = StringUtil.verify((String)logSet.get(t,"max_log"));
      min_log = StringUtil.verify((String)logSet.get(t,"min_log"));
      tot_log = StringUtil.verify((String)logSet.get(t,"tot_log"));
      avg_log = StringUtil.verify((String)logSet.get(t,"avg_log"));
      sgis_menu_d_code_id    = StringUtil.verify((String)logSet.get(t,"sgis_menu_d_code_id"));

      if(NumberUtil.toInt(tot_log) == 0)	minCount = 0;
%>
            <tr>
<%
        for(int i=1; i<=monCnt; i++) {

          month_log     = NumberUtil.verify(new BigDecimal((Integer)logSet.get(t,"month_"+i)));
          tot_logs[i-1] = tot_logs[i-1].add(month_log);	//월별(i) 기준으로 합계를 낸다.(i = 월과 같음)

          if(compareVal_b.compareTo(tot_logs[i-1]) <= 0)	compareVal_b = tot_logs[i-1];	//월별 합계와 비교하여 값이 크거나 같을경우 치환
          if(compareVal_s.compareTo(tot_logs[i-1]) >= 0)	compareVal_s = tot_logs[i-1];	//월별 합계와 비교하여 값이 작거나 같을경우 치환
%>
              <td class="cell_right" width="50"><a href="javascript:goPeriodView('<%=sgis_menu_d_code_id%>',<%=i %>)"><%=month_log %></a></td>
<%			} %>
              <td class="cell_right" width="50"><%=max_log %></td>
              <td class="cell_right" width="50"><%=min_log %></td>
              <td class="cell_right" width="50"><%=tot_log %></td>
              <td class="cell_right" width="50"><%=avg_log %></td>
            </tr>
<%      trueFlag = true;

      }
       }
    }
     if(trueFlag == false){

%>


<%  max_log = "0";
    min_log = "0";
    tot_log = "0";
    avg_log = "0";

    minCount = 0;
    sgis_menu_d_code_id    =  titleSet.get(j,"sgis_menu_d_code_id").toString();
    for(int i=1; i<=monCnt; i++) {

      month_log     = new BigDecimal(0);//NumberUtil.verify(new BigDecimal((Integer)logSet.get("month_"+i)));
      tot_logs[i-1] = tot_logs[i-1].add(month_log); //월별(i) 기준으로 합계를 낸다.(i = 월과 같음)

      if(compareVal_b.compareTo(tot_logs[i-1]) <= 0)  compareVal_b = tot_logs[i-1]; //월별 합계와 비교하여 값이 크거나 같을경우 치환
      if(compareVal_s.compareTo(tot_logs[i-1]) >= 0)  compareVal_s = tot_logs[i-1]; //월별 합계와 비교하여 값이 작거나 같을경우 치환
%>
          <td class="cell_right" width="50"><a href="javascript:goPeriodView('<%=sgis_menu_d_code_id%>',<%=i %>)"><%=month_log %></a></td>
<%      } %>
          <td class="cell_right" width="50"><%=max_log %></td>
          <td class="cell_right" width="50"><%=min_log %></td>
          <td class="cell_right" width="50"><%=tot_log %></td>
          <td class="cell_right" width="50"><%=avg_log %></td>
        </tr>













<%    }

      }
%>
            <tr>
<%
      String msg = "&nbsp;";
      for(int i=1; i<=monCnt+4; i++) {
%>
              <td class="cell_right"><%=i <= 12 ? (compareVal_b.compareTo(tot_logs[i-1]) == 0 ? "max" : "&nbsp;") : "&nbsp;" %></td>
<%		} %>
            </tr>
            <tr>
<%
      for(int i=1; i<=monCnt+4; i++) {
%>
              <td class="cell_right"><%=i <= 12 ? (compareVal_s.compareTo(tot_logs[i-1]) == 0 ? "min" : "&nbsp;") : "&nbsp;" %></td>
<%		} %>
            </tr>
            <tr>
<%
      for(int i=1; i<=monCnt+4; i++) {
%>
              <td class="cell_right"><%=i <= 12 ? tot_logs[i-1] : "&nbsp;" %></td>
<%		} %>
            </tr>
            <tr>
<%
      for(int i=1; i<=monCnt+4; i++) {
%>
              <%-- 월별 합계의 평균 = 월별합계 / 데이터 rowset(menu count) --%>
              <td class="cell_right">
              <%if(logSet != null &&logSet.getRowCount()>0){ %>
              <%=i <= 12 ? tot_logs[i-1].divide(new BigDecimal(titleSet.getRowCount()),1, BigDecimal.ROUND_UP ) : "&nbsp;" %>
              <%}else{ %>
              <%=i <= 12 ? tot_logs[i-1] : "&nbsp;" %>
              <%} %>
              </td>
<%		}
  }
%>
            </tr>
          </table>
          </div>
        </td>
      </tr>
</table>

    </div>
  </div>
</form>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
