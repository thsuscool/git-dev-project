<%@ page language="java" contentType="text/html;charset=utf-8" %>

<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/auth_session.jsp"%>
<%@ include file="/contents/include/logger.jsp"%>
<%
  GeneralBroker broker = null;
  RecordModel noticeRm = null;
  RecordModel qnaRm = null;
  RecordModel know1Rm = null;
  RecordModel know2Rm = null;
  RecordModel know3Rm = null;
  RecordModel top_rm  = null;
  RecordModel pop_rm  = null;
  RecordModel logSet  = null;

  RecordModel rm_main1 = null;
  RecordModel rm_main2 = null;
  RecordModel rm_main3 = null;
  RecordModel rm_main4 = null;

  RecordModel rm_api = null;

  String sgis_menu_d_code_id = "";  //상세메뉴 id
  String sgis_menu_d_name    = "";  //상세메뉴명
  String sgis_menu_pop_chk   = "";  //팝업여부
  String sgis_menu_url       = "";  //메뉴링크 URL
  String sgis_menu_h_id      = "";  //상위메뉴 id

  int menu_cnt               = 0;   //메뉴별 count

  try {

    broker = new GeneralBroker("maaa00");

    /* insert index log info */
    lData.setString("sgis_menu_d_code_id", "1");
    lData.setString("PARAM", "INSERT_LOG");
    broker.process(Const.P_INS, lData);

    //top menu
    lData.setString("PARAM", "TOP_MENU");
    lData.setString("sgis_authid", sgis_authid);
    top_rm = broker.getList(lData);

    //popup
    lData.setString("PARAM", "POPUP_COUNT");
    pop_rm = broker.getList(lData);

  }catch(Exception e) {
	//2015-12-03 시큐어코딩
	//e.printStackTrace();
	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
  }
%>
<HTML>
<HEAD>
<TITLE><%=sc_pageTitle %></TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<link rel="stylesheet" href="/contents/style/newstyle.css" type="text/css" media="all">
<script src=/contents/scripts/common.js></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<script src=/contents/scripts/flash.js></script>
<script src=/contents/scripts/index.js></script>
<script type="text/javascript">
<!--
window.onload = function() {
  var pop_status = '<%=pop_status %>';

  if(pop_status == 'Y') openPop();

  MM_preloadImages('/contents/images/main_middle_box_second_mapbox_menu_button_01_over.gif');
}
  var front_state = 1;
  var frontLastRow = 3;

function main_middle_box_second_mapbox_menu_click(data){
  front_state = data;
<%
  /******************************************/
  /* main cente tab button */
  /* 통계내비게이터, 이사지역찾기, 노령화정책지원서비스 */
  /******************************************/

  int main0_cnt=1;

  try {
          lData.setString("PARAM", "MAIN_LINK");
          rm_main1 = broker.getList(lData);


          int fake=1;

          while(rm_main1 !=null && rm_main1.next()) {
            String sgis_main_low_url = StringUtil.verify_s((String)rm_main1.get("sgis_main_low_url"));
            String sgis_main_low_site = StringUtil.verify_s((String)rm_main1.get("sgis_main_low_site"));
            String sgis_main_low_image_on = StringUtil.verify_s((String)rm_main1.get("sgis_main_low_image_on"));
            String sgis_main_low_image_off = StringUtil.verify_s((String)rm_main1.get("sgis_main_low_image_off"));
%>
  document.getElementById('main_middle_box_second_mapbox_menu_<%=main0_cnt%>').src= "/contents/images/<%=sgis_main_low_image_off%>"

  if(data==<%=main0_cnt%>){document.getElementById('main_iframe').src="<%=sgis_main_low_url%>";}

  var pdata = 1;
  if(data == 1) pdata=2;
  else if(data == 2) pdata = 1;
  else pdata = data;
  document.getElementById('main_middle_box_second_mapbox_menu_'+data+'').src= "/contents/images/main_middle_box_second_mapbox_menu_button_0"+pdata+"_over.gif"

<%
            main0_cnt++;
          }
  } catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
  }
%>
frontLastRow = "<%=main0_cnt-1%>";
}

function checkLogin(){
  var loginYn = '<%=loginYn%>';

  if(loginYn == 'Y')
    return true;
  else{
    alert('로그인 후 등록할 수 있습니다.');
    pop_login = window.open('/contents/member/pop_login.jsp','','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
    pop_login.focus();

    return ;
  }

}

//-->
</script>
</HEAD>

<BODY>
<iframe name="prcFrame" src="" width=0 height=0 frameborder=0></iframe>
<!-------------------top 시작----------------------->
<div class="top">
  <div class="top_logo"><a href="/"><img src="/contents/images/top_logo.gif" alt="통계지리정보서비스" border="0"></a></div>
  <div class="<%if(loginYn.equals("Y")){ %>top_global_menu<%}else{ %>top_global_menu2<%} %>">
    <ul>
        <li><a href="/"><img src="/contents/images/main_topmenu01.gif" alt="시작페이지" border="0" /></a></li>
        <li><a href="/contents/sitemap/index.jsp"><img src="/contents/images/main_topmenu02.gif" alt="사이트맵" border="0" /></a></li>
        <li><%if(loginYn.equals("Y")){ %><a href="/contents/mypage/myPage_05.jsp"><img src="/contents/images/main_topmenu04.gif" alt="마이페이지" border="0" /></a><%} %></li>
      </ul>
    <div class="clear"></div>
  </div>


  <ul class="top_menu">

<!-------------------Login_LogOut 시작----------------------->
<%@ include file="/contents/include/header_index.jsp"%>
<!-------------------Login_LogOut 끝    ----------------------->

<!-------------------Login_LogOut 시작----------------------->
<%@ include file="/contents/include/login_logout.jsp"%>
<!-------------------Login_LogOut 끝    ----------------------->

  </ul>
</div>

<!-------------------top 끝----------------------->




<div class="main_middle_box">

  <div class="main_middle_box_first">
      <div class="main_middle_box_first_flash"><script language="JavaScript">flash('/contents/flash/main_flash.swf',330,547,'','','','transparent','always');</script></div>
        <div class="main_middle_box_first_notics">
          <div>
                <div class="main_middle_box_first_notics_ti"><img src="/contents/images/main_middle_box_first_notics_ti.gif" alt="WHATS NEW"></div>
                <div class="main_middle_box_first_notics_more"><a href="/contents/support/support_01.jsp"><img src="/contents/images/main_middle_box_first_notics_more.gif" alt="MORE" border="0"></a></div>
                <div class="clear"></div>
            </div>
            <ul class="main_middle_box_first_notics_ul">
              <li>
                  <a href="/contents/support/support_01.jsp" onMouseOver="MM_showHideLayers('main_middle_box_first_notics_menu_con_1','','show','main_middle_box_first_notics_menu_con_2','','hide');MM_showHideLayers('main_middle_box_first_notics_menu_1','','hide','main_middle_box_first_notics_menu_1_over','','show','main_middle_box_first_notics_menu_2','','show','main_middle_box_first_notics_menu_2_over','','hide')" onFocus="MM_showHideLayers('main_middle_box_first_notics_menu_con_1','','show','main_middle_box_first_notics_menu_con_2','','hide');MM_showHideLayers('main_middle_box_first_notics_menu_1','','hide','main_middle_box_first_notics_menu_1_over','','show','main_middle_box_first_notics_menu_2','','show','main_middle_box_first_notics_menu_2_over','','hide')"><div id="main_middle_box_first_notics_menu_1"><img src="/contents/images/main_middle_box_first_notics_menu_1.gif" alt="WHATS NEW" border="0"></div>
                  <div id="main_middle_box_first_notics_menu_1_over"><img src="/contents/images/main_middle_box_first_notics_menu_1_over.gif" alt="WHATS NEW" border="0"></div>
                  </a>
                    <dl id="main_middle_box_first_notics_menu_con_1">
                    <%
                      /*********************************************/
                      /* 공지사항 & 이벤트 */
                      /* 최대 6개 */
                      /*********************************************/
                      try {

                        lData.setString("PARAM", "NOTICE");
                        noticeRm = broker.getList(lData);

                        while(noticeRm != null && noticeRm.next()) {
                          String sgis_board_seq = String.valueOf((BigDecimal)noticeRm.get("sgis_board_seq"));
                          String sgis_board_title = StringUtil.verify_s((String)noticeRm.get("sgis_board_title"));
                          String create_date = StringUtil.verify_s((String)noticeRm.get("create_date"));
                          String isnew = StringUtil.verify_s((String)noticeRm.get("isnew"));

                          String short_sgis_board_title = StringUtil.toShortenStringB(sgis_board_title, 30);
                  %>
                    <dt><%=create_date %></dt>
                    <dd><a href="javascript:link('notice','<%=sgis_board_seq %>');"><%=short_sgis_board_title %><%if(isnew.equals("Y")) {%><img src="/contents/images/new_icon.gif" alt="new" border=0><%} %></a></dd>
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
              </li>

                <li>
                  <a href="/contents/support/support_02.jsp" onMouseOver="MM_showHideLayers('main_middle_box_first_notics_menu_con_1','','hide','main_middle_box_first_notics_menu_con_2','','show');MM_showHideLayers('main_middle_box_first_notics_menu_1','','show','main_middle_box_first_notics_menu_1_over','','hide','main_middle_box_first_notics_menu_2','','hide','main_middle_box_first_notics_menu_2_over','','show')" onFocus="MM_showHideLayers('main_middle_box_first_notics_menu_con_1','','hide','main_middle_box_first_notics_menu_con_2','','show');MM_showHideLayers('main_middle_box_first_notics_menu_1','','show','main_middle_box_first_notics_menu_1_over','','hide','main_middle_box_first_notics_menu_2','','hide','main_middle_box_first_notics_menu_2_over','','show')">
                  <div id="main_middle_box_first_notics_menu_2"><img src="/contents/images/main_middle_box_first_notics_menu_2.gif" alt="WHATS NEW" border="0"></div>
                  <div id="main_middle_box_first_notics_menu_2_over"><img src="/contents/images/main_middle_box_first_notics_menu_2_over.gif" alt="WHATS NEW" border="0"></div>
                  </a>
                    <dl id="main_middle_box_first_notics_menu_con_2">
                   <%
                      /*********************************************/
                      /* Q & A */
                      /* 최대 6개 */
                      /*********************************************/
                      try {

                        lData.setString("PARAM", "QNA");
                        qnaRm = broker.getList(lData);

                        while(qnaRm != null && qnaRm.next()) {
                          String sgis_board_seq = String.valueOf((BigDecimal)qnaRm.get("sgis_board_seq"));
                          String sgis_board_title = StringUtil.verify_s((String)qnaRm.get("sgis_board_title"));
                          String create_date = StringUtil.verify_s((String)qnaRm.get("create_date"));
                          String isnew = StringUtil.verify_s((String)qnaRm.get("isnew"));

                          String short_sgis_board_title = StringUtil.toShortenStringB(sgis_board_title, 30);
                  %>
                    <dt><%=create_date %></dt>
                    <dd><a href="javascript:link('qna','<%=sgis_board_seq %>');"><%=short_sgis_board_title %><%if(isnew.equals("Y")) {%><img src="/contents/images/new_icon.gif" alt="new" border=0><%} %></a></dd>
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
              </li>
              <li class="main_norice_left_right_button"><!-- <a href="#"><img src="/contents/images/main_middle_box_first_notics_left.gif" alt="이전" border="0"></a><a href="#"><img src="/contents/images/main_middle_box_first_notics_right.gif" alt="다음" border="0"></a>--></li>
            </ul>


        </div>
    </div>
           <form name="fm" method="post" style="margin:0px">
            <input type="hidden" name="frontRowCnt">
    <div class="main_middle_box_second">
      <div class="main_middle_box_second_mapbox">
          <div class="main_middle_box_second_mapbox_search_box">
             <!-- 지식검색  -->

           <div class="main_middle_box_second_mapbox_search_box2">
                <select name="sgis_know_service_code" class="search_site">
                   <option value="">전체</option>
                   <option value="10000">지식정보</option>
                   <option value="20000">서비스정보</option>
                   <option value="30000">API정보</option>
                </select><input name="cond_text" type="text" style="border:1px solid #b0d2e9;" onkeydown="javascrit:passEnter(event)">
                <a href="javascript:searchProcess()">
                   <img src="/contents/images/main_middle_box_second_mapbox_search_button.gif" alt="검색" border="0" class="left_mar_5">
                </a>
             </div>



                <div class="main_middle_box_second_mapbox_background">
                  <div class="main_map_result">
            <ul>
            <li class="arrow"><a href="javascript:frontPrev();"><img src="/contents/images/main_middle_box_second_mapbox_menu_right_button.gif" alt="이전메뉴" border="0" /></a></li>
            <li>
            <%
            /******************************************/
            /* main cente tab button */
            /* 통계내비게이터, 이사지역찾기, 노령화정책지원서비스 */
            /******************************************/
            String main_first_low_url = "";
            try {
                lData.setString("PARAM", "MAIN_LINK");
                rm_main1 = broker.getList(lData);
                int main1_cnt2=1;
                while(rm_main1 !=null && rm_main1.next()) {
                  String sgis_main_low_url = StringUtil.verify_s((String)rm_main1.get("sgis_main_low_url"));
                  String sgis_main_low_image_on = StringUtil.verify_s((String)rm_main1.get("sgis_main_low_image_on"));
                  String sgis_main_low_image_off = StringUtil.verify_s((String)rm_main1.get("sgis_main_low_image_off"));
                  if(main1_cnt2 == 1) main_first_low_url = sgis_main_low_url;
            %>
            <li>
          <a href="#" onClick="main_middle_box_second_mapbox_menu_click(<%=main1_cnt2 %>)" onKeyPress="main_middle_box_second_mapbox_menu_click(2)">
          <img name="main_middle_box_second_mapbox_menu_<%=main1_cnt2 %>" id="main_middle_box_second_mapbox_menu_<%=main1_cnt2 %>" border="0"
          src="/contents/images/<%if(main1_cnt2 == 1) {%><%=sgis_main_low_image_on %><%} else { %><%=sgis_main_low_image_off %><%} %>">
          </a>
          </li>
          <%          main1_cnt2++;
                }
          } catch(Exception e) {
				System.out.print("sgisWebError : ");
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
          }
          %>
          <li class="arrow"><a href="javascript:frontNext();"><img src="/contents/images/main_middle_box_second_mapbox_menu_left_button.gif" alt="다음메뉴" border="0" /></a></li>
          </ul>
          <div class="clear"></div>
          <div class="main_map_result_image">

          <!-- 메인 통계내비게이터 플래쉬 -->
          <iframe id="main_iframe" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="<%=main_first_low_url %>" class="main_iframe"></iframe>

          </div>
          <p><marquee scrollamount="1"><strong>통계내비게이터</strong> (전국을 대상으로 시범서비스 하고 있습니다.)</marquee></p>
          </div>
                </div>
          </div>
        </div>
</form>

    <!-- 통계검색 -->
    <iframe src="/contents/index_frame.jsp" width="100%" height="190" name="thumb_select" scrolling  = "no" frameborder = "no" > </iframe>

        <div class="clear"></div>
        <div class="main_middle_box_second_notics">

                <div class="main_middle_box_second_notics_ti"><img src="/contents/images/main_middle_box_second_notics_ti.gif" alt="WHATS INFORMATIONW"></div>


            <ul class="main_middle_box_second_notics_ul">
              <li>
                  <a onMouseOver="MM_showHideLayers('main_middle_box_second_notics_menu_con_1','','show','main_middle_box_second_notics_menu_con_2','','hide','main_middle_box_second_notics_menu_con_3','','hide');MM_showHideLayers('main_middle_box_second_notics_menu_1','','hide','main_middle_box_second_notics_menu_1_over','','show','main_middle_box_second_notics_menu_2','','show','main_middle_box_second_notics_menu_2_over','','hide','main_middle_box_second_notics_menu_3','','show','main_middle_box_second_notics_menu_3_over','','hide')" onFocus="MM_showHideLayers('main_middle_box_second_notics_menu_con_1','','show','main_middle_box_second_notics_menu_con_2','','hide','main_middle_box_second_notics_menu_con_3','','hide');MM_showHideLayers('main_middle_box_second_notics_menu_1','','hide','main_middle_box_second_notics_menu_1_over','','show','main_middle_box_second_notics_menu_2','','show','main_middle_box_second_notics_menu_2_over','','hide','main_middle_box_second_notics_menu_3','','show','main_middle_box_second_notics_menu_3_over','','hide')">
                    <div id="main_middle_box_second_notics_menu_1"><img src="/contents/images/main_middle_box_second_notics_menu_1.gif" alt="WHATS NEW" border="0"></div>
                    <div id="main_middle_box_second_notics_menu_1_over"><img src="/contents/images/main_middle_box_second_notics_menu_1_over.gif" alt="WHATS NEW" border="0"></div>
                  </a>
                    <ul id="main_middle_box_second_notics_menu_con_1">
                  <%
                      /*********************************************/
                      /* 이용자 추천지식 */
                      /* 최대 6개 */
                      /*********************************************/
                      try {

                        lData.setString("PARAM", "KNOW_RECOMMEND");
                        know1Rm = broker.getList(lData);

                      int rowcnt=0;
                      while(know1Rm != null && know1Rm.next()) {
                        String sgis_know_seq = String.valueOf((BigDecimal)know1Rm.get("sgis_know_seq"));
                        String sgis_know_service_code = String.valueOf((BigDecimal)know1Rm.get("sgis_know_service_code"));
                        String sgis_know_title = StringUtil.verify_s((String)know1Rm.get("sgis_know_title"));
                        String avr = StringUtil.verify_s((String)know1Rm.get("avr"));

                        String short_sgis_know_title = StringUtil.toShortenStringB(sgis_know_title, 50);
                        int point1 = 0;
                        int pointh = 0;
                        %>
                                  <li <%if((rowcnt+1) % 2 == 0) {%>class="main_middle_box_second_notics_2line"<%} %>><a href="javascript:link2('<%=sgis_know_seq %>','<%=sgis_know_service_code %>');"><%=short_sgis_know_title %></a>
                                    <span class="main_middle_box_second_notics_percent">
                                    <%for(int i=0; i < Integer.parseInt(avr.substring(0,1)); i++) { point1++; %><img src="/contents/images/star_icon_1.gif" alt="1"><%} %><%if(Integer.parseInt(avr.substring(2)) != 0 ) { pointh++; %><img src="/contents/images/star_icon_2.gif" alt="0.5"><%} %><%for(int i=0; i <  5 - (point1 + pointh); i++) {  %><img src="/contents/images/star_icon_3.gif" alt="0"><%} %>
                                     <%if(Float.parseFloat(avr) == 0) {%>0<%}else{%><%=avr %><%} %></span>
                                  </li>
                      <%  rowcnt++;
                      }
                    } catch(Exception e) {
						System.out.print("sgisWebError : ");
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
                    }
                  %>
                    </ul>
              </li>
                <li>
                  <a onMouseOver="MM_showHideLayers('main_middle_box_second_notics_menu_con_1','','hide','main_middle_box_second_notics_menu_con_2','','show','main_middle_box_second_notics_menu_con_3','','hide');MM_showHideLayers('main_middle_box_second_notics_menu_1','','show','main_middle_box_second_notics_menu_1_over','','hide','main_middle_box_second_notics_menu_2','','hide','main_middle_box_second_notics_menu_2_over','','show','main_middle_box_second_notics_menu_3','','show','main_middle_box_second_notics_menu_3_over','','hide')" onFocus="MM_showHideLayers('main_middle_box_second_notics_menu_con_1','','hide','main_middle_box_second_notics_menu_con_2','','show','main_middle_box_second_notics_menu_con_3','','hide');MM_showHideLayers('main_middle_box_second_notics_menu_1','','show','main_middle_box_second_notics_menu_1_over','','hide','main_middle_box_second_notics_menu_2','','hide','main_middle_box_second_notics_menu_2_over','','show','main_middle_box_second_notics_menu_3','','show','main_middle_box_second_notics_menu_3_over','','hide')">
                  <div id="main_middle_box_second_notics_menu_2"><img src="/contents/images/main_middle_box_second_notics_menu_2.gif" alt="WHATS NEW" border="0"></div>
                  <div id="main_middle_box_second_notics_menu_2_over"><img src="/contents/images/main_middle_box_second_notics_menu_2_over.gif" alt="WHATS NEW" border="0"></div>
                  </a>
                    <ul id="main_middle_box_second_notics_menu_con_2">
                  <%
                      /*********************************************/
                      /* 신규 등록지식 */
                      /* 최대 6개 */
                      /*********************************************/
                      try {
                            lData.setString("PARAM", "KNOW_NEW");
                            know2Rm = broker.getList(lData);

                              int rowcnt=0;
                              while(know2Rm != null && know2Rm.next()) {
                                String sgis_know_seq = String.valueOf((BigDecimal)know2Rm.get("sgis_know_seq"));
                                String sgis_know_service_code = String.valueOf((BigDecimal)know2Rm.get("sgis_know_service_code"));
                                String sgis_know_title = StringUtil.verify((String)know2Rm.get("sgis_know_title"));
                                String avr = StringUtil.verify_s((String)know2Rm.get("avr"));

                                String short_sgis_know_title = StringUtil.toShortenStringB(sgis_know_title, 50);
                                int point1 = 0;
                                int pointh = 0;
                                %>
                                          <li <%if((rowcnt+1) % 2 == 0) {%>class="main_middle_box_second_notics_2line"<%} %>><a href="javascript:link2('<%=sgis_know_seq %>','<%=sgis_know_service_code %>');"><%=short_sgis_know_title %></a>
                                            <span class="main_middle_box_second_notics_percent">
                                            <%for(int i=0; i < Integer.parseInt(avr.substring(0,1)); i++) { point1++; %><img src="/contents/images/star_icon_1.gif" alt="1"><%} %><%if(Integer.parseInt(avr.substring(2)) != 0 ) { pointh++; %><img src="/contents/images/star_icon_2.gif" alt="0.5"><%} %><%for(int i=0; i <  5 - (point1 + pointh); i++) {  %><img src="/contents/images/star_icon_3.gif" alt="0"><%} %>
                                             <%if(Float.parseFloat(avr) == 0) {%>0<%}else{%><%=avr %><%} %></span>
                                          </li>
                              <%   rowcnt++;
                              }
                    } catch(Exception e) {
						System.out.print("sgisWebError : ");
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
                    }
                  %>
                    </ul>
              </li>

              <li>
                  <a onMouseOver="MM_showHideLayers('main_middle_box_second_notics_menu_con_1','','hide','main_middle_box_second_notics_menu_con_2','','hide','main_middle_box_second_notics_menu_con_3','','show');MM_showHideLayers('main_middle_box_second_notics_menu_1','','show','main_middle_box_second_notics_menu_1_over','','hide','main_middle_box_second_notics_menu_2','','show','main_middle_box_second_notics_menu_2_over','','hide','main_middle_box_second_notics_menu_3','','hide','main_middle_box_second_notics_menu_3_over','','show')" onFocus="MM_showHideLayers('main_middle_box_second_notics_menu_con_1','','hide','main_middle_box_second_notics_menu_con_2','','hide','main_middle_box_second_notics_menu_con_3','','show');MM_showHideLayers('main_middle_box_second_notics_menu_1','','show','main_middle_box_second_notics_menu_1_over','','hide','main_middle_box_second_notics_menu_2','','show','main_middle_box_second_notics_menu_2_over','','hide','main_middle_box_second_notics_menu_3','','hide','main_middle_box_second_notics_menu_3_over','','show')">
                  <div id="main_middle_box_second_notics_menu_3"><img src="/contents/images/main_middle_box_second_notics_menu_3.gif" alt="WHATS NEW" border="0"></div>
                  <div id="main_middle_box_second_notics_menu_3_over"><img src="/contents/images/main_middle_box_second_notics_menu_3_over.gif" alt="WHATS NEW" border="0"></div>
                </a>
                    <ul id="main_middle_box_second_notics_menu_con_3">
                    <%
                      /*********************************************/
                      /* 통계청 등록지식 */
                      /* 최대 6개 */
                      /*********************************************/
                      try {

                            lData.setString("PARAM", "KNOW_ADMIN");
                            know3Rm = broker.getList(lData);

                            int rowcnt=0;
                            while(know3Rm != null && know3Rm.next()) {
                              String sgis_know_seq = String.valueOf((BigDecimal)know3Rm.get("sgis_know_seq"));
                              String sgis_know_service_code = String.valueOf((BigDecimal)know3Rm.get("sgis_know_service_code"));
                              String sgis_know_title = StringUtil.verify((String)know3Rm.get("sgis_know_title"));
                              String avr = StringUtil.verify_s((String)know3Rm.get("avr"));

                              String short_sgis_know_title = StringUtil.toShortenStringB(sgis_know_title, 50);
                              int point1 = 0;
                              int pointh = 0;
                              %>
                                        <li <%if((rowcnt+1) % 2 == 0) {%>class="main_middle_box_second_notics_2line"<%} %>><a href="javascript:link2('<%=sgis_know_seq %>','<%=sgis_know_service_code %>');"><%=short_sgis_know_title %></a>
                                          <span class="main_middle_box_second_notics_percent">
                                          <%for(int i=0; i < Integer.parseInt(avr.substring(0,1)); i++) { point1++; %><img src="/contents/images/star_icon_1.gif" alt="1"><%} %><%if(Integer.parseInt(avr.substring(2)) != 0 ) { pointh++; %><img src="/contents/images/star_icon_2.gif" alt="0.5"><%} %><%for(int i=0; i <  5 - (point1 + pointh); i++) {  %><img src="/contents/images/star_icon_3.gif" alt="0"><%} %>
                                           <%if(Float.parseFloat(avr) == 0) {%>0<%}else{%><%=avr %><%} %></span>
                                       </li>
                            <%   rowcnt++;
                            }
                  } catch(Exception e) {
						System.out.print("sgisWebError : ");
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
                  }
                %>
                    </ul>
              </li>
              <li class="main_norice_left_right_button"><!-- <a href="#"><img src="/contents/images/main_middle_box_first_notics_left.gif" alt="이전" border="0"></a><a href="#"><img src="/contents/images/main_middle_box_first_notics_right.gif" alt="다음" border="0"></a>--></li>
            </ul>

        </div>

        </div>


    <div class="main_middle_box_three">
      <div class="main_middle_box_three_sgisbox">
          <div class="main_middle_box_three_sgisbox_title"><img src="/contents/images/main_sgis_title.gif" alt="재미있는 SGIS" /></div>
      <div class="main_middle_box_three_sgisbox_link">
        <ul>
        <%
              /******************************************/
              /* main right image */
              /******************************************/
              try {
                lData.setString("PARAM", "SITE_LINK");
                lData.setString("sgis_main_loc_code", "B");
                rm_main2 = broker.getList(lData);

                int main1_cnt=1;
                while(rm_main2 !=null && rm_main2.next()) {
                  String sgis_main_low_url = StringUtil.verify_s((String)rm_main2.get("sgis_main_low_url"));
                  String sgis_main_low_site = StringUtil.verify_s((String)rm_main2.get("sgis_main_low_site"));
                  String sgis_main_low_image_on = StringUtil.verify_s((String)rm_main2.get("sgis_main_low_image_on"));
                  String sgis_main_low_image_off = StringUtil.verify_s((String)rm_main2.get("sgis_main_low_image_off"));
        %><%if(main1_cnt == 1 || (main1_cnt > 1 && main1_cnt % 2 != 0)) {%><li><%} %><a href="javascript:funsgis_pop('<%=sgis_main_low_url %>');"><img src="contents/images/<%=sgis_main_low_image_off %>" alt="<%=sgis_main_low_site %>" border="0" id="Image<%=main1_cnt %>" onMouseOver="MM_swapImage('Image<%=main1_cnt %>','','contents/images/<%=sgis_main_low_image_on %>',1)" onFocus="MM_swapImage('Image<%=main1_cnt %>','','<%=sgis_main_low_image_off %>',1)" onMouseOut="MM_swapImgRestore()" onBlur="MM_swapImgRestore()" /></a><%if(main1_cnt % 2 == 0) {%></li><%} %><%  main1_cnt++;     }
                } catch(Exception e) {
					System.out.print("sgisWebError : ");
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
        }
        %>
      </ul>
      </div>
        </div>


        <div class="main_middle_box_three_apibox">
          <div class="main_middle_box_three_api_background_1"><img src="/contents/images/main_middle_box_three_api_background_1.gif" alt="공간통계 Open API  공간통계Open API를 제공합니다."></div>
            <div class="main_middle_box_three_api_background_2">
              <div class="main_middle_box_three_api_list_left"><a href="javascript:apiPrev();"><img src="/contents/images/main_middle_box_three_api_list_left.gif" alt="이전메뉴" border="0"></a></div>
                <div class="main_middle_box_three_api_list_center">
                <div id="apiView">
                  <a href="javascript:apiLink();"><img id="apiImg" src="/contents/images/openAPI_banner1.gif" alt="좌표변환서비스" border=0></a>
                </div>
                </div>
                <div class="main_middle_box_three_api_list_right"><a href="javascript:apiNext();"><img src="/contents/images/main_middle_box_three_api_list_right.gif" alt="다음메뉴" border="0"></a></div>
            </div>
        </div>


        <div class="main_middle_box_three_sitebox_content_banner">
        <%    if(loginYn.equals("Y")){%><a href="/contents/mypage/myPage_01.jsp"><% }else{%><a href="javascript:checkLogin()"><%} %>
        <img src="/contents/images/main_middle_box_three_sitebox_content_banner.gif" alt="지식등록마법사 사용자가 제작한 ucc를 공유합니다.">
        </a>
        </div>

        <div class="main_middle_box_three_sitebox">

          <div class="main_middle_box_three_sitebox_content">

              <form name="siteFm" method="post">
                <div class="main_middle_box_three_sitebox_site">
                  <div><img src="/contents/images/main_middle_box_three_sitebox_site_title.gif" alt="관련사이트"></div>
                    <div><select name="sgisSite" style="width:145px;" class="img_align" onChange="chgSite(1);">
                    <%
                      /******************************************/
                      /* main right select site 1 */
                      /******************************************/
                      int main2_cnt= 0;
                      try {
                        lData.setString("PARAM", "SITE_LINK");
                        lData.setString("sgis_main_loc_code", "C");
                        rm_main3 = broker.getList(lData);

                        while(rm_main3 !=null && rm_main3.next()) {
                          String sgis_main_low_url = StringUtil.verify_s((String)rm_main3.get("sgis_main_low_url"));
                          String sgis_main_low_site = StringUtil.verify_s((String)rm_main3.get("sgis_main_low_site"));
                      %>
                      <option value="<%=sgis_main_low_url %>"><%=sgis_main_low_site %></option>
                      <% main2_cnt++;
                          }
                      } catch(Exception e) {
							System.out.print("sgisWebError : ");
							//2015-12-03 시큐어코딩
							//e.printStackTrace();
							logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
                      }
                      %>
                    </select> <a href="javascript:quickLink(1);"><img src="/contents/images/go_icon.gif" alt="선택바로가기" class="img_align" border=0></a></div>
                    <input type="hidden" name="sgisRowCnt" value="<%=main2_cnt %>">

                    <div class="main_middle_box_three_sitebox_site_banner">
                      <ul>
                          <li class="main_middle_box_three_sitebox_site_banner_1set"><a href="javascript:sgisPrev();"><img src="/contents/images/main_middle_box_three_sitebox_site_banner_left.gif" alt="이전" border="0"></a></li>
                            <li class="main_middle_box_three_sitebox_site_banner_2set"><a href="javascript:quickLink(1);"><img src="/contents/images/main_middle_box_three_sitebox_site_banner_1.gif" id="sgisImg" alt="통계청" border="0" width="132"></a></li>
                            <li class="main_middle_box_three_sitebox_site_banner_3set"><a href="javascript:sgisNext();"><img src="/contents/images/main_middle_box_three_sitebox_site_banner_right.gif" alt="다음" border="0"></a></li>
                        </ul>
                    </div>
                </div>




                <div class="main_middle_box_three_sitebox_site">
                  <div><img src="/contents/images/main_middle_box_three_sitebox_site_title_2.gif" alt="부동산관련사이트"></div>
                    <div><select name="landSite" style="width:145px;" class="img_align" onChange="chgSite(2);">
                         <%
                          /******************************************/
                          /* main right select site 2 */
                          /******************************************/
                          int main3_cnt= 0;
                          try {
                            lData.setString("PARAM", "SITE_LINK");
                            lData.setString("sgis_main_loc_code", "D");
                            rm_main4 = broker.getList(lData);

                            while(rm_main4 !=null && rm_main4.next()) {
                              String sgis_main_low_url = StringUtil.verify_s((String)rm_main4.get("sgis_main_low_url"));
                              String sgis_main_low_site = StringUtil.verify_s((String)rm_main4.get("sgis_main_low_site"));
                          %>
                            <option value="<%=sgis_main_low_url %>"><%=sgis_main_low_site %></option>
                          <%
                                    main3_cnt++;
                                  }
                            } catch(Exception e) {
								System.out.print("sgisWebError : ");
								//2015-12-03 시큐어코딩
								//e.printStackTrace();
								logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
                            }
                        %>
                    </select> <a href="javascript:quickLink(2);"><img src="/contents/images/go_icon.gif" alt="선택바로가기" class="img_align" border=0></a></div>
                    <input type="hidden" name="landRowCnt" value="<%=main3_cnt %>">
                    <div class="main_middle_box_three_sitebox_site_banner">
                      <ul>
                          <li class="main_middle_box_three_sitebox_site_banner_1set"><a href="javascript:landPrev();"><img src="/contents/images/main_middle_box_three_sitebox_site_banner_left.gif" alt="이전" border="0"></a></li>
                            <li class="main_middle_box_three_sitebox_site_banner_2set"><a href="javascript:quickLink(2);"><img src="/contents/images/main_middle_box_four_sitebox_site_banner_1.gif" id="landImg" alt="국세청" border="0" width="132"></a></li>
                            <li class="main_middle_box_three_sitebox_site_banner_3set"><a href="javascript:landNext();"><img src="/contents/images/main_middle_box_three_sitebox_site_banner_right.gif" alt="다음" border="0"></a></li>
                        </ul>
                    </div>
                </div>
                </form>
            </div>

        </div>
    </div>

  <div class="clear"></div>
</div>



<%
    /* 공지사항 팝업 */
    while(pop_rm != null && pop_rm.next()) {
      String sgis_board_seq = StringUtil.verify_s((String)pop_rm.get("sgis_board_seq"));
      String sgis_board_pop_width = StringUtil.verify_s((String)pop_rm.get("sgis_board_pop_width"));
      String sgis_board_pop_height = StringUtil.verify_s((String)pop_rm.get("sgis_board_pop_height"));
%>
      <script>openNotice('<%=sgis_board_seq%>', '<%=sgis_board_pop_width%>', '<%=sgis_board_pop_height%>');</script>
<%
    }
%>

<!-------------------bottom 시작----------------------->
<%@ include file="/contents/include/footer.jsp"%>
<!-------------------bottom 끝----------------------->

<form name="menuForm" method="post" style="margin:0px;">
  <input type="hidden" name="sgis_menu_d_code_id"/>
  <input type="hidden" name="sgis_menu_url"/>
  <input type="hidden" name="sgis_menu_pop_chk"/>
  <input type="hidden" name="sgis_menu_h_id"/>
  <input type="hidden" name="api_element_id"/>
</form>

<form name="popForm" method="post">
</form>

<form name="boardFm" method="post">
  <input type="hidden" name="sgis_board_seq">
  <input type="hidden" name="sgis_know_seq">
  <input type="hidden" name="sgis_know_service_code">
</form>
<script>
    window.open("notice.html","안내", "fullscreen=0,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=316,height=299;");
</script>
</BODY>
</HTML>

