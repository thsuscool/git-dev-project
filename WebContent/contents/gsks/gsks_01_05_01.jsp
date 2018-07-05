<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>
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
    //메뉴 리스트를 가여와서 로그 데이터와 비교하여 로그 데이터가 없는 경우는 메뉴명만 보여주고 0으로 보여줌
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
    compareQuery.append("       where sgis_menu_connect_time like :key_period||'%'  \n");
    compareQuery.append("         and sgis_menu_d_code_id like '"+sgis_menu_d_code_id+"'    \n");
    compareQuery.append("      group by sgis_menu_d_code_id          \n");
    compareQuery.append("   )                                        \n");

    dbmgr.prepareStatement(compareQuery.toString(), lData);
    compareSet = dbmgr.select();

    if(compareSet != null && compareSet.next()) {

      maxCount = NumberUtil.toInt(StringUtil.verify((String)compareSet.get("max_count")));
      minCount = NumberUtil.toInt(StringUtil.verify((String)compareSet.get("min_count")));
    }


    //속도 문제로 인하여 쿼리  수정
    String hDate = lData.get("key_period")+"";
    String hereDate = hDate.replaceAll("-","");

    DateTime dTime = null;
    String nextDate = dTime.addMonths(hereDate,1,"yyyyMM");
    logQuery.append("		select																					  \n");
    logQuery.append("		to_char(x.sgis_menu_d_name) sgis_menu_d_name,								\n");
    logQuery.append("		to_char(x.sgis_menu_d_code_id) sgis_menu_d_code_id,			    \n");
    logQuery.append("		to_char(z.sgis_menu_h_id) sgis_menu_h_id,           				  \n");
    logQuery.append("		to_char(x.sgis_menu_d_code_id) sgis_menu_d_code_id,       		\n");
    logQuery.append("		to_char(z.sgis_menu_h_name) sgis_menu_h_name,       \n");
    logQuery.append("		sum(y.date_1) date_1,           	  \n");
    logQuery.append("		sum(y.date_2) date_2,           		\n");
    logQuery.append("		sum(y.date_3) date_3,               \n");
    logQuery.append("		sum(y.date_4) date_4,           	  \n");
    logQuery.append("		sum(y.date_5) date_5,           		\n");
    logQuery.append("		sum(y.date_6) date_6,               \n");
    logQuery.append("		sum(y.date_7) date_7,           	  \n");
    logQuery.append("		sum(y.date_8) date_8,           		\n");
    logQuery.append("		sum(y.date_9) date_9,               \n");
    logQuery.append("		sum(y.date_10) date_10,         	  \n");
    logQuery.append("		sum(y.date_11) date_11,         		\n");
    logQuery.append("		sum(y.date_12) date_12,             \n");
    logQuery.append("		sum(y.date_13) date_13,         	  \n");
    logQuery.append("		sum(y.date_14) date_14,         		\n");
    logQuery.append("		sum(y.date_15) date_15,             \n");
    logQuery.append("		sum(y.date_16) date_16,         	  \n");
    logQuery.append("		sum(y.date_17) date_17,         		\n");
    logQuery.append("		sum(y.date_18) date_18,             \n");
    logQuery.append("		sum(y.date_19) date_19,         	  \n");
    logQuery.append("		sum(y.date_20) date_20,         		\n");
    logQuery.append("		sum(y.date_21) date_21,             \n");
    logQuery.append("		sum(y.date_22) date_22,         	  \n");
    logQuery.append("		sum(y.date_23) date_23,         		\n");
    logQuery.append("		sum(y.date_24) date_24,             \n");
    logQuery.append("		sum(y.date_25) date_25,         	  \n");
    logQuery.append("		sum(y.date_26) date_26,         		\n");
    logQuery.append("		sum(y.date_27) date_27,             \n");
    logQuery.append("		sum(y.date_28) date_28,        		  \n");
    logQuery.append("		sum(y.date_29) date_29,        			\n");
    logQuery.append("		sum(y.date_30) date_30,              \n");
    logQuery.append("		sum(y.date_31) date_31,        		  \n");
    logQuery.append("		to_char(max(y.log_count),'9,999,999') max_log,   		\n");
    logQuery.append("		to_char(min(y.log_count),'9,999,999') min_log,        \n");
    logQuery.append("		to_char(sum(y.log_count),'9,999,999') tot_log,   	  \n");
    logQuery.append("		to_char(sum(y.log_count) / to_char(sysdate,'dd'), '9,999,999.0') avg_log      		\n");
    logQuery.append("		from                                 														      \n");
    logQuery.append("		sgis_menu_config x,                  																  \n");
    logQuery.append("		(                                    																	\n");
    logQuery.append("		    select                           														      \n");
    logQuery.append("		    sgis_menu_d_code_id,             																  \n");
    logQuery.append("		    log_count,                       																	\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '01', log_count, 0) date_1,           \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '02', log_count, 0) date_2,     		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '03', log_count, 0) date_3,     			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '04', log_count, 0) date_4,           \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '05', log_count, 0) date_5,     		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '06', log_count, 0) date_6,     			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '07', log_count, 0) date_7,           \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '08', log_count, 0) date_8,     		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '09', log_count, 0) date_9,     			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '10', log_count, 0) date_10,          \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '11', log_count, 0) date_11,    		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '12', log_count, 0) date_12,    			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '13', log_count, 0) date_13,          \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '14', log_count, 0) date_14,    		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '15', log_count, 0) date_15,    			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '16', log_count, 0) date_16,          \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '17', log_count, 0) date_17,    		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '18', log_count, 0) date_18,    			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '19', log_count, 0) date_19,          \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '20', log_count, 0) date_20,    		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '21', log_count, 0) date_21,    			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '22', log_count, 0) date_22,          \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '23', log_count, 0) date_23,    		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '24', log_count, 0) date_24,    			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '25', log_count, 0) date_25,          \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '26', log_count, 0) date_26,    		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '27', log_count, 0) date_27,    			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '28', log_count, 0) date_28,          \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '29', log_count, 0) date_29,    		  \n");
    logQuery.append("		    decode(sgis_menu_connect_time, '30', log_count, 0) date_30,    			\n");
    logQuery.append("		    decode(sgis_menu_connect_time, '31', log_count, 0) date_31           \n");
    logQuery.append("		                           			  \n");
    logQuery.append("		    from                   				\n");
    logQuery.append("		        (                  	      \n");
    logQuery.append("		        select             			  \n");
    logQuery.append("		            sgis_menu_d_code_id,          							\n");
    logQuery.append("		            to_char(sgis_menu_connect_time, 'dd') sgis_menu_connect_time,     		      \n");
    logQuery.append("		            count(*) log_count                      								  \n");
    logQuery.append("		        from                                        									\n");
    logQuery.append("		            sgis_page_log                           						      \n");
    logQuery.append("		        where                                       								  \n");
    logQuery.append("		            sgis_menu_connect_time between to_timestamp('"+hereDate+"','yyyymm') and  to_timestamp('"+nextDate+"','yyyymm')			\n");
    logQuery.append("		        group by sgis_menu_d_code_id, to_char(sgis_menu_connect_time, 'dd')                                    	    \n");
    logQuery.append("		        )                                                       		  \n");
    logQuery.append("		) y,                                                            			\n");
    logQuery.append("		sgis_menu_high_code z                                           	    \n");
    logQuery.append("		where                                                           		  \n");
    logQuery.append("		    x.sgis_menu_use_yn = 'Y'                                    			\n");
    logQuery.append("		    and x.sgis_menu_d_code_id = y.sgis_menu_d_code_id           	    \n");
    logQuery.append("		    and x.sgis_menu_h_id = z.sgis_menu_h_id                                                       \n");
    logQuery.append("       and x.sgis_menu_d_code_id like '"+sgis_menu_d_code_id+"'        \n");
    logQuery.append("		group by x.sgis_menu_d_name, x.sgis_menu_d_code_id, z.sgis_menu_h_name, z.sgis_menu_h_id        	\n");
    logQuery.append("		order by z.sgis_menu_h_id ,x.sgis_menu_d_code_id                                                    \n");
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

  fm.action = 'gsks_01_05_01.jsp';
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

  if(menuId == '3'){
      fm.action = 'gsks_01_05_02.jsp';
    }else if(menuId == '4'){
      fm.action = 'gsks_01_05_03.jsp';
    }else{
      fm.action = 'gsks_01_05.jsp';
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
         <a href="javascript:goPeriodView();">
            <strong>월별 페이지뷰</strong>
         </a>
      </td>
      <td width="140" align="center" bgcolor="#00BFFF">
         <a href="javascript:document.searchForm.submit();" >
            <font color="#FFFFFF"><strong>일별 페이지뷰</strong></font>
         </a>
      </td>
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
         <table width="<%=loopCnt * 50 + 200 %>" cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
           <thead>
<%
  for(int i=1; i<= loopCnt; i++) {
%>
            <th class="td_top" width="50"><%=i %>일</th>
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
          <div id="contents_div1" style="height:272px;overflow:hidden;">
         <table cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
<%
  String temp_id = "";

  if(sgis_menu_d_code_id.trim().equals("%")){//월별 페이지뷰에서 클릭해서 넘어 오지 않을 경우
    while(titleSet != null && titleSet.next()) {


      sgis_menu_h_id         = titleSet.get("sgis_menu_h_id").toString();
      sgis_menu_d_name       = titleSet.get("sgis_menu_d_name").toString();
      sgis_menu_h_name       = titleSet.get("sgis_menu_h_name").toString();

      if(sgis_menu_h_id.equals(temp_id))	sgis_menu_h_name = "";
      temp_id = sgis_menu_h_id;
%>
            <tr>
              <td class="cell_left" width="130"><b><%=sgis_menu_h_name %></b></td>
              <td class="cell_left" width="170"><%=sgis_menu_d_name %></td>
            </tr>
<%
    }
  }else{
    if(logSet.getRowCount() == 0){//월별 페이지에서 클릭해서 일별 페이지뷰를 불렀을 때 데이터가 없으면 메뉴명만 보여주고 데이터는 0으로 보여줌
      for(int titleNum =0;titleNum<titleSet.getRowCount();titleNum++){
        if(titleSet.get(titleNum,"sgis_menu_d_code_id").toString().equals(sgis_menu_d_code_id)){;
        sgis_menu_h_id         = titleSet.get(titleNum,"sgis_menu_h_id").toString();
        sgis_menu_d_name       = titleSet.get(titleNum,"sgis_menu_d_name").toString();
        sgis_menu_h_name       = titleSet.get(titleNum,"sgis_menu_h_name").toString();

        if(sgis_menu_h_id.equals(temp_id))  sgis_menu_h_name = "";
        temp_id = sgis_menu_h_id;
%>
            <tr>
              <td class="cell_left" width="130"><b><%=sgis_menu_h_name %></b></td>
              <td class="cell_left" width="170"><%=sgis_menu_d_name %></td>
            </tr>
<%    }
        }
    }else{//월별 페이지에서 클릭해서 일별 페이지뷰를 불렀을 때 데이터가 있으면 있는 그대로 보여줌
    while(logSet != null && logSet.next()) {


      sgis_menu_h_id         = logSet.get("sgis_menu_h_id").toString();
      sgis_menu_d_name       = logSet.get("sgis_menu_d_name").toString();
      sgis_menu_h_name       = logSet.get("sgis_menu_h_name").toString();

      if(sgis_menu_h_id.equals(temp_id))  sgis_menu_h_name = "";
      temp_id = sgis_menu_h_id;
%>
            <tr>
              <td class="cell_left" width="130"><b><%=sgis_menu_h_name %></b></td>
              <td class="cell_left" width="170"><%=sgis_menu_d_name %></td>
            </tr>
<%}
   }
    } %>
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
          <table width="<%=(loopCnt * 50 + 200)-17 %>" cellpadding="0" cellspacing="1" class="c_table" style="table-layout:fixed">
<%


  if(logSet != null)
  {
    logSet.setIterator();
    BigDecimal date_log     = new BigDecimal("0");
    BigDecimal compareVal_b = new BigDecimal("0");
    BigDecimal compareVal_s = new BigDecimal("0");
    BigDecimal[] tot_logs   = new BigDecimal[loopCnt+1];
    for(int i=0; i<loopCnt; i++) {

      tot_logs[i] = new BigDecimal("0");
    }

    String max_log        = "";
    String min_log        = "";
    String tot_log        = "";
    String avg_log        = "";

    boolean trueFlag = false;

    for(int j=0;j<titleSet.getRowCount();j++){
     trueFlag = false;

    //조회를 한후 메뉴명과 조회를 하여 나온 데이터의 메뉴명을 비교하여 데이터가 있으면 보여주고 아니면 0으로 보여줌
    for(int t = 0;t<logSet.getRowCount();t++) {

      //메뉴 리스트와 조회한 데이터의 메뉴명을 비교하여 데이터가 있는지 없는지 판단.
      if(titleSet.get(j,"sgis_menu_d_code_id").toString().equals(logSet.get(t,"sgis_menu_d_code_id").toString())){


      max_log = StringUtil.verify((String)logSet.get(t,"max_log"));
      min_log = StringUtil.verify((String)logSet.get(t,"min_log"));
      tot_log = StringUtil.verify((String)logSet.get(t,"tot_log"));
      avg_log = StringUtil.verify((String)logSet.get(t,"avg_log"));

      if(NumberUtil.toInt(tot_log) == 0)	minCount = 0;
%>
            <tr>
<%
        for(int i=1; i<=loopCnt; i++) {

          date_log      = NumberUtil.verify(new BigDecimal((Integer)logSet.get(t,"date_"+i)));
          tot_logs[i-1] = tot_logs[i-1].add(date_log);


          if(compareVal_b.compareTo(tot_logs[i-1]) <= 0)	compareVal_b = tot_logs[i-1];
          if(compareVal_s.compareTo(tot_logs[i-1]) >= 0)	compareVal_s = tot_logs[i-1];
%>
              <td class="cell_right" width="50"><%=date_log %></td>
<%			} %>
              <td class="cell_right" width="50"><%=max_log%></td>
              <td class="cell_right" width="50"><%=min_log%></td>
              <td class="cell_right" width="50"><%=tot_log %></td>
              <td class="cell_right" width="50"><%=avg_log %></td>
            </tr>
<%   trueFlag = true;

      }
    }
    if(sgis_menu_d_code_id.trim().equals("%")){//일별 페이지뷰를 바로 호출 했을 경우를 체크
    if(trueFlag == false){//일별 페이지뷰를 바로 호출했을 경우 메뉴명과 데이터를 비교 하여 데이터가 없는 경우 데이터를  0으로 처리 하는 부분


        %>
        <tr>
<%  max_log = "0";
    min_log = "0";
    tot_log = "0";
    avg_log = "0";

    minCount = 0;
    for(int i=1; i<=loopCnt; i++) {

      date_log      = new BigDecimal(0);
      tot_logs[i-1] = tot_logs[i-1].add(date_log);


      if(compareVal_b.compareTo(tot_logs[i-1]) <= 0)  compareVal_b = tot_logs[i-1];
      if(compareVal_s.compareTo(tot_logs[i-1]) >= 0)  compareVal_s = tot_logs[i-1];
%>
          <td class="cell_right" width="50">0</td>
<%      } %>
          <td class="cell_right" width="50"><%=max_log%></td>
          <td class="cell_right" width="50"><%=min_log%></td>
          <td class="cell_right" width="50"><%=tot_log %></td>
          <td class="cell_right" width="50"><%=avg_log %></td>
        </tr>


<%      }
      }
    }



%>
<%
    if(logSet.getRowCount() == 0 && !sgis_menu_d_code_id.trim().equals("%")){
       for(int zeroNum = 0;zeroNum<loopCnt+4;zeroNum++){
%>
        <td class="cell_right" width="50">0</td>
<%     }
    }
%>
      </tr>

            <tr>

<%
      String msg = "&nbsp;";
      BigDecimal max_h = new BigDecimal("0");
      for(int i=1; i<=loopCnt+4; i++) {

%>
              <td class="cell_right"><%=i <= loopCnt ? (compareVal_b.compareTo(tot_logs[i-1]) == 0 ? tot_logs[i-1] : "&nbsp;") : "&nbsp;" %></td>
<%		} %>
            </tr>
            <tr>
<%
      for(int i=1; i<=loopCnt+4; i++) {
%>
              <td class="cell_right"><%=i <= loopCnt ? (compareVal_s.compareTo(tot_logs[i-1]) == 0 ? tot_logs[i-1] : "&nbsp;") : "&nbsp;" %></td>
<%		} %>
            </tr>
            <tr>
<%
      for(int i=1; i<=loopCnt+4; i++) {
%>
              <td class="cell_right"><%=i <= loopCnt ? tot_logs[i-1] : "&nbsp;" %></td>
<%		} %>
            </tr>
            <tr>
<%    int titleLens = 0;
      if(sgis_menu_d_code_id.trim().equals("%")){//월별 페이지뷰에서 클릭해서 넘어 오지 않을 경우
        titleLens = titleSet.getRowCount();
      }else{
        if(logSet.getRowCount() ==0){
          titleLens = 0;
        }else{
          titleLens = logSet.getRowCount();
        }
      }
      for(int i=1; i<=loopCnt+4; i++) {
%>
              <td class="cell_right">
              <%if(logSet != null &&logSet.getRowCount()>0){ %>

              <%=i <= loopCnt ? tot_logs[i-1].divide(new BigDecimal(titleLens),1, BigDecimal.ROUND_UP ) : "&nbsp;" %>
              <%}else{ %>
              <%=i <= loopCnt ? tot_logs[i-1] : "&nbsp;" %>
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
