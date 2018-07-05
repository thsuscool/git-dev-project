<%@ page language="java" contentType="text/html;charset=utf-8" %>

<%@ page import="kr.co.offton.jdf.util.StringUtil"     %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"      %>
<%@ page import="kr.co.offton.jdf.db.DbManager"        %>
<%@ page import="java.math.BigDecimal"                %>
<%@ include file="/contents/include/auth_session.jsp"%>
<%@ include file="/contents/include/session_out.jsp"%> <%//  세션  아웃 관련  2012 04 03 SWan%> 
<%@ include file="/contents/include/logger.jsp"%>


<%
  /* 최종으로 접근한 페이지의 url set */
  session.setAttribute("returnUrl", request.getRequestURI());

  DbManager top_dbmgr = null;
  RecordModel top_rm  = null;
 

  String top_sgis_menu_d_code_id = "";	//상세메뉴 id
  String top_sgis_menu_d_name    = "";	//상세메뉴명
  String top_sgis_menu_pop_chk   = "";	//팝업여부
  String top_sgis_menu_url       = "";	//메뉴링크 URL
  String top_sgis_menu_h_id      = "";	//상위메뉴 id
  
  /* 현재페이지의 메뉴및 서브메뉴 펼침(상위메뉴아이디(parentMenuId)로 식별하여 body의 onload event에서 제어한다.) */
  if(!StringUtil.isEmpty(lData.getString("parentMenuId")))	session.setAttribute("parentMenuId", lData.getString("parentMenuId"));
  String parentMenuId = (String)session.getAttribute("parentMenuId");

  int top_menu_cnt               = 0;		//메뉴별 count

  StringBuffer topMenuQuery = new StringBuffer(1024);

  topMenuQuery.append(" select x.sgis_menu_d_code_id                       \n");
  topMenuQuery.append("       ,sgis_menu_d_name                           \n");
  topMenuQuery.append("       ,sgis_menu_pop_chk                          \n");
  topMenuQuery.append("       ,sgis_menu_url                              \n");
  topMenuQuery.append("       ,sgis_menu_h_id                             \n");
  topMenuQuery.append("       ,(select count(*)                           \n");
  topMenuQuery.append("           from sgis_menu_config                   \n");
  topMenuQuery.append("          where sgis_menu_h_id = x.sgis_menu_h_id  \n");
  topMenuQuery.append("            and sgis_menu_use_yn = 'Y'             \n");
  topMenuQuery.append("         ) menu_cnt                                \n");
  topMenuQuery.append("   from sgis_menu_config x,                        \n");
  topMenuQuery.append("        (select * from sgis_menu_d_auth_set where sgis_auth_id = '"+sgis_authid+"') a  \n");
  topMenuQuery.append("  where x.sgis_menu_d_code_id = a.sgis_menu_d_code_id \n");
  topMenuQuery.append("    and sgis_menu_use_yn = 'Y'                           \n");
  topMenuQuery.append("  order by sgis_menu_d_code_id asc                 \n");

  try {

    top_dbmgr = new DbManager();
    top_dbmgr.prepareStatement(topMenuQuery.toString());

    top_rm = top_dbmgr.select();
  }catch(Exception e) {

	//2015-12-03 시큐어코딩
	//e.printStackTrace();
	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
  }finally {
    if(top_dbmgr != null) top_dbmgr.close();
  }
  
  String head_sgis_menu_d_code_id = "";	//상세메뉴 id
  String head_sgis_menu_d_name    = "";	//상세메뉴명
  String head_sgis_menu_pop_chk   = "";	//팝업여부
  String head_sgis_menu_url       = "";	//메뉴링크 URL
  String head_sgis_menu_h_id      = "";	//상위메뉴 id
  
  DbManager head_dbmgr = null;
  RecordModel head_rm  = null;
  StringBuffer headMenuQuery = new StringBuffer(1024);
%>


<script type="text/javascript" language="javascript" src="/contents/inc/script.js" ></script>
<script type="text/javascript" language="javascript">
//<![CDATA[
window.onload = function() {

    var parentMenuId = '<%=parentMenuId %>';

    if(parentMenuId == '200000' || parentMenuId == '700000') {
     menuOverOut("lnb101_over");
    }else if(parentMenuId == '400000' || parentMenuId == '800000') {
     menuOverOut("lnb201_over");
    }else if(parentMenuId == '300000') {
     menuOverOut("lnb301_over");
    }else if(parentMenuId == '500000') {
     menuOverOut("lnb401_over");
    } else {
     menuOverOut("lnb101_over");
    }

    init();
    
    // 통계지리정보 첫페이지 상단 서비스 전체보기 의 서비스안내 순서정렬
    sortMenu1();
}



function sortMenu1(){
    var arr = [];
    list = document.getElementById('sort_menu1');
    c = list.children;
    l = c.length
    var i;
    for(i=0; i<l; i++) arr[i] = c[i]; // "convert" NodeList to array
    arr.sort(function(a,b) {
        return a.id < b.id ? -1 : 1; 
    });
  
    for(i=0; i<l; i++) list.appendChild(arr[i]);
}




var subMenu = Array("lnb101_over","lnb201_over","lnb301_over","lnb401_over");

function doInsertPageLog(id, url, pop_yn, h_id) {

  var menuFm = document.topMenuForm;

  menuFm.sgis_menu_d_code_id.value = id;
  menuFm.sgis_menu_url.value       = url;
  menuFm.sgis_menu_pop_chk.value   = pop_yn;
  menuFm.sgis_menu_h_id.value      = h_id;

  menuFm.action = '/contents/include/pageLog_process.jsp';
  menuFm.target = 'topPrcFrame';

  menuFm.submit();
}

function checkLogin(url){
      var loginYn = '<%=loginYn%>';

      if(loginYn == 'Y')
        return true;
      else{
        alert('로그인 후 신청할 수 있습니다.');
        pop_login = window.open('https://sgis1.kostat.go.kr/contents/member/pop_login.jsp?login_url='+url,'','width=355,height=255');
        pop_login.focus();

        return false;
      }
    }

function menuOverOut(id){

     var menu1=document.getElementById("imgMenu1");
     var menu2=document.getElementById("imgMenu2");
     var menu3=document.getElementById("imgMenu3");
     var menu4=document.getElementById("imgMenu4");
     try {
     imgName1=menu1.src;
     imgName2=menu2.src;
     imgName3=menu3.src;
     imgName4=menu4.src;

     if(id == "lnb101_over"){
        menu1.src = "/contents/images/new/main_menu01_over.gif";
        menu2.src = "/contents/images/new/main_menu02.gif";
        menu3.src = "/contents/images/new/main_menu03.gif";
        menu4.src = "/contents/images/new/main_menu04.gif";
    }else if(id == "lnb201_over"){
        menu1.src = "/contents/images/new/main_menu01.gif";
        menu2.src = "/contents/images/new/main_menu02_over.gif";
        menu3.src = "/contents/images/new/main_menu03.gif";
        menu4.src = "/contents/images/new/main_menu04.gif";
    }else if(id == "lnb301_over"){
        menu1.src = "/contents/images/new/main_menu01.gif";
        menu2.src = "/contents/images/new/main_menu02.gif";
        menu3.src = "/contents/images/new/main_menu03_over.gif";
        menu4.src = "/contents/images/new/main_menu04.gif";
    }else if(id == "lnb401_over"){
        menu1.src = "/contents/images/new/main_menu01.gif";
        menu2.src = "/contents/images/new/main_menu02.gif";
        menu3.src = "/contents/images/new/main_menu03.gif";
        menu4.src = "/contents/images/new/main_menu04_over.gif";
    }

     for(i=0; i<subMenu.length; i++){
         if(subMenu[i] == id){
             eval("document.getElementById('"+id+"')").style.display = "block";
         }else{
             document.getElementById(subMenu[i]).style.display = "none";
         }
     }
     }catch(e) {}
}


       function topLogin(){
    	 pop_login = window.open('https://sgis1.kostat.go.kr/contents/member/pop_login.jsp','','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
       }

	   	function dEI(elementID){
		return document.getElementById(elementID);
	}




	// layer display
	function layerDis(layerID){
		var tlayer = dEI(layerID);
		if(tlayer.style.display != "block"){
			tlayer.style.display = "block";
		}else if(tlayer.style.display != "none"){
			tlayer.style.display = "none";
		}else{
			tlayer.style.display = "none";
		}
	}

	// layer display
	function layerClose(layerID){
		var tlayer = dEI(layerID);
			tlayer.style.display = "none";
	}

   function guidebookOpen(){
		window.open('/guidebook.jsp', 'devPop', 'width=600,height=730, scrollbars=1');
	}

//]]>
</script>


  
  <div id="header">
  <h1><a href="/" ><img style="border: 0px; width: 178px; height: 38px;"  src="/contents/inc/img/logo.gif"  alt="통계지리정보서비스" /></a></h1>
   <table style="border: 0px; width: 970px; height: 85px;" cellpadding="0" cellspacing="0" id="table1">
	<tr>
		<td style="height: 75px; width: 540px;" rowspan="3" valign="bottom" ></td>
		<td style="height: 33px; width: 400px;"  align="right" valign="bottom">
		<%if(loginYn.equals("Y")){%>
		
		<a href="/contents/include/logout.jsp"><img src="/contents/inc/img/button_9.gif" alt="로그아웃" />
		<%}else{ %>
		<a href="#" onclick="topLogin()"><img border="0" src="/contents/inc/img/button_1.gif" alt="로그인" />
		<%} %>
		</a>&nbsp;
		<img style="width: 3px; height: 13px;border: 0px;"  src="/contents/inc/img/line_01.gif" alt="" />&nbsp;
		 <%if(!loginYn.equals("Y")){%>
		<a href="/vname_input_seed_mem.jsp"><img border="0" src="/contents/inc/img/button_2.gif" alt="회원가입" /></a>&nbsp;
		<img style="width: 3px; height: 13px;border: 0px;"  src="/contents/inc/img/line_01.gif"  alt="" />&nbsp;
			<%} %>
		<a href="/"><img style="border: 0px;" src="/contents/inc/img/button_7.gif" alt="시작페이지 " /></a>&nbsp;
		<img  style="width: 3px; height: 13px;border: 0px;"  src="/contents/inc/img/line_01.gif"  alt="" />&nbsp;
		<!--
		<a href="http://sgis1.kostat.go.kr/statistics_eng/html/index.jsp"><img border="0" src="/contents/inc/img/button_4.gif" alt="ENGLISH" /></a>&nbsp;
		<img  style="width: 3px; height: 13px;border: 0px;"  src="/contents/inc/img/line_01.gif"  alt="" />&nbsp;
		-->
		<a href="/contents/sitemap/index.jsp"><img style="border: 0px;" src="/contents/inc/img/button_3.gif" alt="사이트맵" /></a>&nbsp;
		<img  style="width: 3px; height: 13px;border: 0px;"  src="/contents/inc/img/line_01.gif"  alt="" />&nbsp;
	    <%if(loginYn.equals("Y")){%>
		<a href="/contents/mypage/myPage_05.jsp"><img  style="border: 0px;" src="/contents/inc/img/button_8.gif" alt="마이페이지" /></a>&nbsp;
		<img  style="width: 3px; height: 13px;border: 0px;"  src="/contents/inc/img/line_01.gif"  alt="" />&nbsp;
		<%} %>
		<input type="image" src="/contents/inc/img/button_5.gif" onclick="layerDis('allmenu');" title="서비스전체보기" /></td>
		<td style="height: 33px; width: 30px; "  align="right" valign="bottom"></td>
	</tr>
	<tr>
		<td style="height: 2px; width: 430px;"  align="right" colspan="2"></td>
	</tr>
	  <!--수정-->
    <tr>
        <td style="height: 40px; width: 430px;">
        	<div  style="height: 40px; width: 300px; padding:0px; margin-left:35%; background: url('/contents/inc/img/top_bg3.gif');">
              <!--1차메뉴시작-->
              <table border="0" cellpadding="0" cellspacing="0" width="98%" id="table2" >
                  <tr>
                    <td align="center" width="100px"><a href="/contents/shortcut/shortcut_02.jsp" style="margin-top: 12px" class="mB1"><span></span></a></td>
                    <td align="center" width="100px"><a href="<%=request.getContextPath()%>/share/useBoard/useBoardList.do" style="margin-top: 12px" class="mB4"><span></span></a></td>
                    <!-- <td align="center"><a href="/contents/search/search_01.jsp" class="mB2"><span></span></a></td> -->
                    <td align="center" width="98px"><a href="/contents/support/support_01.jsp" style="margin-top: 12px;" class="mB3"><span></span></a></td>
                  </tr>
            </table>
            <!--1차메뉴끝-->
            </div>
        </td>
        <td></td>
    </tr>
	<tr>
		<td height="10px" colspan="3">
		<img border="0" src="/contents/inc/img/top_bg.gif" width="970" height="10" alt="" /></td>
	</tr>
</table>
			<div id="allmenu">
			<p class="menu"><img src="/contents/images/main/bt_allmenu.gif" alt="서비스 전체보기" /></p>
			<div id="allmenuBox">
				<ul class="allmenuBoxT">
				<%
				  headMenuQuery.append(" select x.sgis_menu_d_code_id                        \n");
				  headMenuQuery.append("       ,sgis_menu_d_name                           \n");
				  headMenuQuery.append("       ,sgis_menu_pop_chk                          \n");
				  headMenuQuery.append("       ,sgis_menu_url                              \n");
				  headMenuQuery.append("       ,sgis_menu_h_id                             \n");
				  headMenuQuery.append("   from sgis_menu_config x,                        \n");
				  headMenuQuery.append("        (select * from sgis_menu_d_auth_set where sgis_auth_id = '"+sgis_authid+"') a  \n");
				  headMenuQuery.append("  where x.sgis_menu_d_code_id = a.sgis_menu_d_code_id \n");
				  headMenuQuery.append("    and sgis_menu_use_yn = 'Y'                     \n");
				  headMenuQuery.append("    and sgis_menu_h_id = '100000'                  \n");
				  headMenuQuery.append("   and (x.sgis_menu_d_code_id  like '11%' or x.sgis_menu_d_code_id='120300' )         \n");
				  headMenuQuery.append("    order by sgis_menu_d_code_id asc                 \n");

				  try {

				    head_dbmgr = new DbManager();
				    head_dbmgr.prepareStatement(headMenuQuery.toString());
				    head_rm = head_dbmgr.select();
				  }catch(Exception e) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				  }finally {
				    if(head_dbmgr != null) head_dbmgr.close();
				  }
				   
				  if(head_rm !=null){
				  %>
					<li>
						<a href="/contents/shortcut/shortcut_02.jsp" ><img src="/contents/images/main/allmenu_m01.gif" alt="서비스바로가기" /></a> - <a href="#" onclick="guidebookOpen()"><img src="/contents/images/main/service_btn.gif" alt="서비스안내" /></a>
						<ul class="bgline" id="sort_menu1">
						 <%				 
						    while(head_rm != null && head_rm.next()) {
					        head_sgis_menu_d_code_id = StringUtil.verify_s(((BigDecimal)head_rm.get("sgis_menu_d_code_id")).toString());
					        head_sgis_menu_d_name    = StringUtil.verify_s((String)head_rm.get("sgis_menu_d_name"));
					        head_sgis_menu_pop_chk   = String.valueOf((Character)head_rm.get("sgis_menu_pop_chk"));
					        head_sgis_menu_url       = StringUtil.verify_s((String)head_rm.get("sgis_menu_url"));
					        head_sgis_menu_h_id      = StringUtil.verify_s(((BigDecimal)head_rm.get("sgis_menu_h_id")).toString());
							if(head_sgis_menu_d_code_id.equals("110110")){//소분류
							%>
							<li id="10"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%> <span class="text">- 소지역(집계구) 단위 통계보기</span></a></li>
							<%-- 
							<%}else if(head_sgis_menu_d_code_id.equals("110200")){ %>
							<li><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 행정구역 단위 통계보기</span></a></li>
							--%>
                            <%}else if(head_sgis_menu_d_code_id.equals("112000")){ %>
                            <li id="20"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','Y','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 행정구역단위의 통계보기<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(KOSIS, 우리지역주요지표)</span></a></li>
							<%}else if(head_sgis_menu_d_code_id.equals("110400")){ %>
							<li id="30"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 행정구역별 고령화 통계보기</span></a></li>
											
							<%}else if(head_sgis_menu_d_code_id.equals("110300")){ %>
							<li id="40"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 주거환경교육환경 등 생활관심 통계보기</span></a></li>
							 <%}else if(head_sgis_menu_d_code_id.equals("120300")){ %>
							<li id="45"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 사업체 명칭이나 산업분류코드로 사업체 위치보기</span></a></li>
							
							<%}else if(head_sgis_menu_d_code_id.equals("110500")){ %>
							<li id="50"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%> <span class="text">- 주요 월간 보도자료 통계보기</span></a></li>
							<%}else if(head_sgis_menu_d_code_id.equals("110600")){ %>
							<li id="60"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%> <span class="text">- 주요 통계로 본 시군구 변화 모습보기</span></a></li>
							<%}else if(head_sgis_menu_d_code_id.equals("110700")){ %>
							<li id="70"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 인구분포 변화모습을 피라미드로 보기</span></a></li>
							<%}else if(head_sgis_menu_d_code_id.equals("110800")){ %>
							<li id="80"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 50대성씨100대본관 인구 분포보기</span></a></li>
							<%}else if(head_sgis_menu_d_code_id.equals("110900")){ %>
							<li id="90"><a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%> <span class="text">- 통계 값을 입력하여 통계지도로 보기</span></a></li>
							<%}else if(head_sgis_menu_d_code_id.equals("111100")){ %>
                            <!-- <li><a href="#" onclick="pageController('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%>  <span class="text">- 고객 분포 서비스</span></a></li> -->
					    <%}
				       }		
					%>		
						</ul>
					</li>
					<%} %>
					<%  
					  headMenuQuery = new StringBuffer(1024);
					  headMenuQuery.append(" select x.sgis_menu_d_code_id                        \n");
					  headMenuQuery.append("       ,sgis_menu_d_name                           \n");
					  headMenuQuery.append("       ,sgis_menu_pop_chk                          \n");
					  headMenuQuery.append("       ,sgis_menu_url                              \n");
					  headMenuQuery.append("       ,sgis_menu_h_id                             \n");
					  headMenuQuery.append("   from sgis_menu_config x,                        \n");
					  headMenuQuery.append("        (select * from sgis_menu_d_auth_set where sgis_auth_id = '"+sgis_authid+"') a  \n");
					  headMenuQuery.append("  where x.sgis_menu_d_code_id = a.sgis_menu_d_code_id \n");
					  headMenuQuery.append("    and sgis_menu_use_yn = 'Y'                     \n");
					  headMenuQuery.append("    and sgis_menu_h_id = '100000'                  \n");
					  headMenuQuery.append("    and x.sgis_menu_d_code_id  like '12%'          \n");
					  headMenuQuery.append("    order by sgis_menu_d_code_id asc                 \n");

					  try {

					    head_dbmgr = new DbManager();
					    head_dbmgr.prepareStatement(headMenuQuery.toString());
					    head_rm = head_dbmgr.select();
					  }catch(Exception e) {
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
					  }finally {
					    if(head_dbmgr != null) head_dbmgr.close();
					  }
					
	                 if(head_rm !=null){
					 %> 
					<%--<li class="first"><a href="/contents/search/search_01.jsp"><img src="/contents/images/main/allmenu_m03.gif" alt="공간통계검색" /></a>
						<ul class="bgline">
							<li class="last">
							<% 
							 while(head_rm != null && head_rm.next()) {
							        head_sgis_menu_d_code_id = StringUtil.verify_s(((BigDecimal)head_rm.get("sgis_menu_d_code_id")).toString());
							        head_sgis_menu_d_name    = StringUtil.verify_s((String)head_rm.get("sgis_menu_d_name"));
							        head_sgis_menu_pop_chk   = String.valueOf((Character)head_rm.get("sgis_menu_pop_chk"));
							        head_sgis_menu_url       = StringUtil.verify_s((String)head_rm.get("sgis_menu_url"));
							        head_sgis_menu_h_id      = StringUtil.verify_s(((BigDecimal)head_rm.get("sgis_menu_h_id")).toString());
								
							   if(head_sgis_menu_d_code_id.equals("120100")){//소분류
							%>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a> 
						
							| 
							<%}else if(head_sgis_menu_d_code_id.equals("120200")){ %>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a> 
							
							| 
							<%}else if(head_sgis_menu_d_code_id.equals("120300")){ %>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a>
							<%} 
							
							
							}%>
							</li>
						</ul>
					  </li> --%>
					<%}%>
					
					<%
					  headMenuQuery = new StringBuffer(1024);
					  headMenuQuery.append(" select x.sgis_menu_d_code_id                        \n");
					  headMenuQuery.append("       ,sgis_menu_d_name                           \n");
					  headMenuQuery.append("       ,sgis_menu_pop_chk                          \n");
					  headMenuQuery.append("       ,sgis_menu_url                              \n");
					  headMenuQuery.append("       ,sgis_menu_h_id                             \n");
					  headMenuQuery.append("   from sgis_menu_config x,                        \n");
					  headMenuQuery.append("        (select * from sgis_menu_d_auth_set where sgis_auth_id = '"+sgis_authid+"') a  \n");
					  headMenuQuery.append("  where x.sgis_menu_d_code_id = a.sgis_menu_d_code_id \n");
					  headMenuQuery.append("    and sgis_menu_use_yn = 'Y'                     \n");
					  headMenuQuery.append("    and sgis_menu_h_id = '100000'                  \n");
					  headMenuQuery.append("    and x.sgis_menu_d_code_id  like '13%'          \n");
					  headMenuQuery.append("    order by sgis_menu_d_code_id asc                 \n");

					  try {

					    head_dbmgr = new DbManager();
					    head_dbmgr.prepareStatement(headMenuQuery.toString());
					    head_rm = head_dbmgr.select();
					  }catch(Exception e) {
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
					  }finally {
					    if(head_dbmgr != null) head_dbmgr.close();
					  }
					
	                 if(head_rm !=null){
						
					%>
					<li class="first"><a href="/contents/support/support_01.jsp"><img src="/contents/images/main/allmenu_m04.gif" alt="참여마당" /></a>
						<ul>
							<li class="last">
							 <% 
							  while(head_rm != null && head_rm.next()) {
							        head_sgis_menu_d_code_id = StringUtil.verify_s(((BigDecimal)head_rm.get("sgis_menu_d_code_id")).toString());
							        head_sgis_menu_d_name    = StringUtil.verify_s((String)head_rm.get("sgis_menu_d_name"));
							        head_sgis_menu_pop_chk   = String.valueOf((Character)head_rm.get("sgis_menu_pop_chk"));
							        head_sgis_menu_url       = StringUtil.verify_s((String)head_rm.get("sgis_menu_url"));
							        head_sgis_menu_h_id      = StringUtil.verify_s(((BigDecimal)head_rm.get("sgis_menu_h_id")).toString());
							   if(head_sgis_menu_d_code_id.equals("130100")){//소분류
							%>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%> </a>| 
								<%}else if(head_sgis_menu_d_code_id.equals("130150")){ %>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a> |
								<%}else if(head_sgis_menu_d_code_id.equals("130200")){ %>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a> | 
								<%}else if(head_sgis_menu_d_code_id.equals("130300")){ %>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a> | 
							    	<%}else if(head_sgis_menu_d_code_id.equals("130400")){ %>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a> | 
							       	<%}else if(head_sgis_menu_d_code_id.equals("130600")){ %>
							<a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a> |<br>
                             <%}else if(head_sgis_menu_d_code_id.equals("130700")){ %>
                            <a href="#" onclick="doInsertPageLog('<%=head_sgis_menu_d_code_id %>','<%=head_sgis_menu_url %>','<%=head_sgis_menu_pop_chk %>','<%=head_sgis_menu_h_id %>')"><%=head_sgis_menu_d_name%></a>
							<%} 
							}%>
							</li>
						</ul>
					</li>
					<%} %>
				</ul>
				<input type="image" id="tab_button" class="menuView" src="/contents/images/main/bt_allmenuclose.gif" title="전체메뉴닫기" onclick="layerClose('allmenu');"/>
			</div>			
		</div>
</div>

<form name="topMenuForm" method="post" action="/contents/include/pageLog_process.jsp">
  <input type="hidden" name="sgis_menu_d_code_id"/>
  <input type="hidden" name="sgis_menu_url"/>
  <input type="hidden" name="sgis_menu_pop_chk"/>
  <input type="hidden" name="sgis_menu_h_id"/>
</form>

<iframe name="topPrcFrame" src="#" width="0" height="0" frameborder="0" title="메뉴로그프레임" style="display:none;"></iframe>