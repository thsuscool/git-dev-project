<%@ page pageEncoding="utf-8"%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.util.StringUtil"     %>
<%@page import="kr.co.offton.jdf.db.RecordModel"      %>
<%@page import="kr.co.offton.jdf.db.DbManager"        %>
<%@ page import="java.math.BigDecimal"                %>
<%@ include file="/contents/include/logger.jsp"%>
<%
  DbManager quick_dbmgr = null;
  RecordModel quick_rm  = null;

  String quick_menu_d_code_id = ""; //상세메뉴 id
  String quick_menu_d_name    = ""; //상세메뉴명
  String quick_menu_pop_chk   = ""; //팝업여부
  String quick_menu_url       = ""; //메뉴링크 URL
  String quick_menu_h_id      = ""; //상위메뉴 id

  StringBuffer quickMenuQuery = new StringBuffer(1024);

  quickMenuQuery.append(" select x.sgis_menu_d_code_id                        \n");
  quickMenuQuery.append("       ,sgis_menu_d_name                           \n");
  quickMenuQuery.append("       ,sgis_menu_pop_chk                          \n");
  quickMenuQuery.append("       ,sgis_menu_url                              \n");
  quickMenuQuery.append("       ,sgis_menu_h_id                             \n");
  quickMenuQuery.append("   from sgis_menu_config x,                        \n");
  quickMenuQuery.append("        (select * from sgis_menu_d_auth_set where sgis_auth_id = '"+sgis_authid+"') a  \n");
  quickMenuQuery.append("  where x.sgis_menu_d_code_id = a.sgis_menu_d_code_id \n");
  quickMenuQuery.append("    and sgis_menu_use_yn = 'Y'                     \n");
  quickMenuQuery.append("  order by sgis_menu_d_code_id asc                 \n");

  try {

    quick_dbmgr = new DbManager();
    quick_dbmgr.prepareStatement(quickMenuQuery.toString());

    quick_rm = quick_dbmgr.select();
  }catch(Exception e) {

	//2015-12-03 시큐어코딩
	//e.printStackTrace();
	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
  }finally {

    if(quick_dbmgr != null) quick_dbmgr.close();
  } 
%>
<script type="text/javascript" language="javascript">
//<![CDATA[
    function quickPageController(url,pop_yn,id,h_id){
        var menuFm = document.quickMenuForm;
        menuFm.sgis_menu_d_code_id.value = id;
        menuFm.sgis_menu_url.value       = url;
        menuFm.sgis_menu_pop_chk.value   = pop_yn;
        menuFm.sgis_menu_h_id.value      = h_id;

        
        menuFm.action = '/contents/include/pageLog_process.jsp';
        menuFm.target = 'quickPrcFrame';
        
        menuFm.submit();
    }
    function over_img(pPath, pName){
    document.images[pName].src = pPath;
    }
    function out_img(pPath, pName){
     document.images[pName].src = pPath;
    }   
    function msg(){
        alert("서비스 준비 중입니다.");
    }
//]]>   
</script>
<!-- body -->
<form name="quickMenuForm" method="post" action="">
  <input type="hidden" name="sgis_menu_d_code_id"/>
  <input type="hidden" name="sgis_menu_url"/>
  <input type="hidden" name="sgis_menu_pop_chk"/>
  <input type="hidden" name="sgis_menu_h_id"/>
</form>
<div id="quickCon">
  <div  id="quick" >
    <div id="gotop" >      
        <div id="quickImg">
        <div class="quickImg">
        <ul>
        <li class="qtop"></li>  
<%
   if(quick_rm !=null){
      String[][] quick_menu_Arr = new String[17][5];
      int i = 0;
      while(quick_rm != null && quick_rm.next()) {
          quick_menu_d_code_id = StringUtil.verify_s(((BigDecimal)quick_rm.get("sgis_menu_d_code_id")).toString());
          quick_menu_d_name    = StringUtil.verify_s((String)quick_rm.get("sgis_menu_d_name"));
          quick_menu_pop_chk   = String.valueOf((Character)quick_rm.get("sgis_menu_pop_chk"));
          quick_menu_url       = StringUtil.verify_s((String)quick_rm.get("sgis_menu_url"));
          quick_menu_h_id     = StringUtil.verify_s(((BigDecimal)quick_rm.get("sgis_menu_h_id")).toString());
          
        if(quick_menu_d_code_id.equals("999001")){//소분류     <!-- 소지역통계내비게이터 -->                                                                                                                                                                                             
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;
            i++;
        }else if(quick_menu_d_code_id.equals("999002")){ //행정구역소지역통계내비게이터 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;     
            i++;
        }else if(quick_menu_d_code_id.equals("999003")){ // <!-- 생활관심지역찾기 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;
            i++;
        }else if(quick_menu_d_code_id.equals("999004")){//  <!-- 노령화현황비교-->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;
            i++;
        }else if(quick_menu_d_code_id.equals("999005")){ // <!-- 월간SGIS -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;
            i++;
        }else if(quick_menu_d_code_id.equals("999006")){ // <!-- 지방의 변화모습 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id; 
            i++;
        }else if(quick_menu_d_code_id.equals("999007")){ //<!-- 인구피라미드 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;     
            i++;
        }else if(quick_menu_d_code_id.equals("999008")){ // <!-- 성씨분포 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;     
            i++;
        }else if(quick_menu_d_code_id.equals("999009")){ // <!-- 통계지도체험 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;     
            i++;
        }else if(quick_menu_d_code_id.equals("999010")){//  <!-- 인구이동통계 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;
            i++;
        }else if(quick_menu_d_code_id.equals("999011")){ // <!-- Open API -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id;     
            i++;
        }else if(quick_menu_d_code_id.equals("999012")){ // <!-- 자료제공 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id; 
            i++;
        }else if(quick_menu_d_code_id.equals("999013")){ // <!-- 홍보동영상 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id; 
            i++;
        }else if(quick_menu_d_code_id.equals("999015")){ // <!-- 사업체위치찾기 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id; 
            i++;
        }else if(quick_menu_d_code_id.equals("999016")){ // <!-- 지도로보는 통계보기 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id; 
            i++;
        }else if(quick_menu_d_code_id.equals("999018")){ // <!-- 통계지도 시계열서비스 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id; 
            i++;
        }else if(quick_menu_d_code_id.equals("999019")){ // <!-- 2012년 통계내비게이터 -->
            quick_menu_Arr[i][0] = quick_menu_d_code_id;
            quick_menu_Arr[i][1] = quick_menu_d_name;
            quick_menu_Arr[i][2] = quick_menu_pop_chk;
            quick_menu_Arr[i][3] = quick_menu_url;
            quick_menu_Arr[i][4] = quick_menu_h_id; 
            i++;
        }
      }
    //소분류%> <!-- 소지역통계내비게이터 -->                                                                                                                                                                                         
                <li><img src="/contents/images/quick/quick_1.gif"  onmouseover="over_img('/contents/images/quick/quick_1-2.gif', 'btn1')" onmouseout="out_img('/contents/images/quick/quick_1.gif', 'btn1')"  name="btn1" onclick="quickPageController('<%=quick_menu_Arr[16][3] %>','<%=quick_menu_Arr[16][2] %>','<%=quick_menu_Arr[16][0] %>','<%=quick_menu_Arr[16][4] %>')" alt="<%=quick_menu_Arr[16][1] %>" class="hand"/></li>
                <!-- 행정구역소지역통계내비게이터 -->
                <!-- 
                <li><img src="/contents/images/quick/quick_2.gif"  onmouseover="over_img('/contents/images/quick/quick_2-2.gif', 'btn2')" onmouseout="out_img('/contents/images/quick/quick_2.gif', 'btn2')"  name="btn2" onclick="quickPageController('<%=quick_menu_Arr[1][3] %>','<%=quick_menu_Arr[1][2] %>','<%=quick_menu_Arr[1][0] %>','<%=quick_menu_Arr[1][4] %>')" alt="<%=quick_menu_Arr[1][1] %>" class="hand"/></li>           
                 -->
                <!-- 통계지도 시계열서비스 -->
                <li><img src="/contents/images/quick/q_18.gif"  onmouseover="over_img('/contents/images/quick/q_18-2.gif', 'btn18')" onmouseout="out_img('/contents/images/quick/q_18.gif', 'btn18')"  name="btn18" onclick="quickPageController('<%=quick_menu_Arr[15][3] %>','<%=quick_menu_Arr[15][2] %>','<%=quick_menu_Arr[15][0] %>','<%=quick_menu_Arr[15][4] %>')" alt="<%=quick_menu_Arr[15][1] %>" class="hand"/></li>
                <!-- 지도로보는행정구역통계 -->
                <li><img src="/contents/images/quick/q_16.gif"  onmouseover="over_img('/contents/images/quick/q_16-2.gif', 'btn16')" onmouseout="out_img('/contents/images/quick/q_16.gif', 'btn16')"  name="btn16" onclick="quickPageController('<%=quick_menu_Arr[14][3] %>','<%=quick_menu_Arr[14][2] %>','<%=quick_menu_Arr[14][0] %>','<%=quick_menu_Arr[14][4] %>')" alt="<%=quick_menu_Arr[14][1] %>" class="hand"/></li>
                <!-- 사업체위치찾기 -->
                <li><img src="/contents/images/quick/q_15.gif"  onmouseover="over_img('/contents/images/quick/q_15-2.gif', 'btn15')" onmouseout="out_img('/contents/images/quick/q_15.gif', 'btn15')"  name="btn15" onclick="quickPageController('<%=quick_menu_Arr[13][3] %>','<%=quick_menu_Arr[13][2] %>','<%=quick_menu_Arr[13][0] %>','<%=quick_menu_Arr[13][4] %>')" alt="<%=quick_menu_Arr[13][1] %>" class="hand"/></li>
                <!-- 고령화현황비교-->
                <li><img src="/contents/images/quick/q_4.gif"  onmouseover="over_img('/contents/images/quick/q_4-2.gif', 'btn4')" onmouseout="out_img('/contents/images/quick/q_4.gif', 'btn4')"  name="btn4" onclick="quickPageController('<%=quick_menu_Arr[3][3] %>','<%=quick_menu_Arr[2][2] %>','<%=quick_menu_Arr[3][0] %>','<%=quick_menu_Arr[3][4] %>')" alt="<%=quick_menu_Arr[3][1] %>" class="hand"/></li>
                <!-- 생활관심지역찾기 -->
                <li><img src="/contents/images/quick/q_3.gif"  onmouseover="over_img('/contents/images/quick/q_3-2.gif', 'btn3')" onmouseout="out_img('/contents/images/quick/q_3.gif', 'btn3')"  name="btn3" onclick="quickPageController('<%=quick_menu_Arr[2][3] %>','<%=quick_menu_Arr[2][2] %>','<%=quick_menu_Arr[2][0] %>','<%=quick_menu_Arr[2][4] %>')" alt="<%=quick_menu_Arr[2][1] %>" class="hand"/></li> 
                <!-- 월간SGIS -->
                <li><img src="/contents/images/quick/q_5.gif"  onmouseover="over_img('/contents/images/quick/q_5-2.gif', 'btn5')" onmouseout="out_img('/contents/images/quick/q_5.gif', 'btn5')"  name="btn5" onclick="quickPageController('<%=quick_menu_Arr[4][3] %>','<%=quick_menu_Arr[4][2] %>','<%=quick_menu_Arr[4][0] %>','<%=quick_menu_Arr[4][4] %>')" alt="<%=quick_menu_Arr[4][1] %>" class="hand"/></li>
                <!-- 지방의 변화모습 -->
                <li><img src="/contents/images/quick/q_6.gif"  onmouseover="over_img('/contents/images/quick/q_6-2.gif', 'btn6')" onmouseout="out_img('/contents/images/quick/q_6.gif', 'btn6')"  name="btn6" onclick="quickPageController('<%=quick_menu_Arr[5][3] %>','<%=quick_menu_Arr[5][2] %>','<%=quick_menu_Arr[5][0] %>','<%=quick_menu_Arr[5][4] %>')" alt="<%=quick_menu_Arr[5][1] %>" class="hand"/></li>
                <!-- 인구피라미드 -->
                <li><img src="/contents/images/quick/q_7.gif"  onmouseover="over_img('/contents/images/quick/q_7-2.gif', 'btn7')" onmouseout="out_img('/contents/images/quick/q_7.gif', 'btn7')"  name="btn7" onclick="quickPageController('<%=quick_menu_Arr[6][3] %>','<%=quick_menu_Arr[6][2] %>','<%=quick_menu_Arr[6][0] %>','<%=quick_menu_Arr[6][4] %>')" alt="<%=quick_menu_Arr[6][1] %>" class="hand"/></li>
                <!-- 성씨분포 -->
                <li><img src="/contents/images/quick/q_8.gif"  onmouseover="over_img('/contents/images/quick/q_8-2.gif', 'btn8')" onmouseout="out_img('/contents/images/quick/q_8.gif', 'btn8')"  name="btn8" onclick="quickPageController('<%=quick_menu_Arr[7][3] %>','<%=quick_menu_Arr[7][2] %>','<%=quick_menu_Arr[6][0] %>','<%=quick_menu_Arr[7][4] %>')" alt="<%=quick_menu_Arr[7][1] %>" class="hand"/></li>
                <!-- 통계지도체험 -->
                <li><img src="/contents/images/quick/q_9.gif"  onmouseover="over_img('/contents/images/quick/q_9-2.gif', 'btn9')" onmouseout="out_img('/contents/images/quick/q_9.gif', 'btn9')"  name="btn9" onclick="quickPageController('<%=quick_menu_Arr[8][3] %>','<%=quick_menu_Arr[8][2] %>','<%=quick_menu_Arr[8][0] %>','<%=quick_menu_Arr[8][4] %>')" alt="<%=quick_menu_Arr[8][1] %>" class="hand"/></li>
                <!-- 인구이동통계 -->
                <li><img src="/contents/images/quick/q_10.gif"  onmouseover="over_img('/contents/images/quick/q_10-2.gif', 'btn10')" onmouseout="out_img('/contents/images/quick/q_10.gif', 'btn10')"  name="btn10" onclick="quickPageController('<%=quick_menu_Arr[9][3] %>','<%=quick_menu_Arr[9][2] %>','<%=quick_menu_Arr[9][0] %>','<%=quick_menu_Arr[9][4] %>')" alt="<%=quick_menu_Arr[9][1] %>" class="hand"/></li>
               
                <!-- 행정구역통계지도 -->
                <!--  
                <li><img src="/contents/images/quick/q_2.gif"  onmouseover="over_img('/contents/images/quick/q_2-2.gif', 'btn14')" onmouseout="out_img('/contents/images/quick/q_2.gif', 'btn14')"  name="btn14" onclick="msg();" class="hand" alt="행정구역통계지도"/></li>            
                -->
                <!-- Open API -->
                <li><img src="/contents/images/quick/q_11.gif"  onmouseover="over_img('/contents/images/quick/q_11-2.gif', 'btn11')" onmouseout="out_img('/contents/images/quick/q_11.gif', 'btn11')"  name="btn11" onclick="quickPageController('<%=quick_menu_Arr[10][3] %>','<%=quick_menu_Arr[10][2] %>','<%=quick_menu_Arr[10][0] %>','<%=quick_menu_Arr[10][4] %>')" alt="<%=quick_menu_Arr[10][1] %>" class="hand"/></li>
                <!-- 자료제공 -->
                <li><img src="/contents/images/quick/q_12.gif"  onmouseover="over_img('/contents/images/quick/q_12-2.gif', 'btn12')" onmouseout="out_img('/contents/images/quick/q_12.gif', 'btn12')"  name="btn12" onclick="quickPageController('<%=quick_menu_Arr[11][3] %>','<%=quick_menu_Arr[11][2] %>','<%=quick_menu_Arr[11][0] %>','<%=quick_menu_Arr[11][4] %>')" alt="<%=quick_menu_Arr[11][1] %>" class="hand"/></li>
                </ul>   
                <div id="quickEnd">         
                <!-- 홍보동영상 -->
                <img src="/contents/images/quick/q_13.gif"  onmouseover="over_img('/contents/images/quick/q_13-2.gif', 'btn13')" onmouseout="out_img('/contents/images/quick/q_13.gif', 'btn13')"  name="btn13" onclick="quickPageController('<%=quick_menu_Arr[12][3] %>','<%=quick_menu_Arr[12][2] %>','<%=quick_menu_Arr[12][0] %>','<%=quick_menu_Arr[12][4] %>')" alt="<%=quick_menu_Arr[12][1] %>" class="hand"/>
                </div>            
    <%      
  }
%>      
        </div>         
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">initMoving(document.getElementById("gotop"), 50, 50, 50);</script>
<iframe name="quickPrcFrame" src="#" width="0" height="0" frameborder="0" title="메뉴로그프레임" style="display:none;"></iframe>