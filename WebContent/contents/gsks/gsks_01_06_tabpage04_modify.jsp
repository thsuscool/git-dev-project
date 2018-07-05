<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
<SCRIPT LANGUAGE="JavaScript">
<!--    
function calender_view(data){
	if(data=="on")document.getElementById('popup_calendar').style.display="block";
	if(data=="off")document.getElementById('popup_calendar').style.display="none";
}
//-->
</script>
  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>
    
  <div class="clear"></div>
    <div class="content_title_1"> 
      <div class="content_title_2">사이트관리</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">사이트관리</a></li>
      </ul>
    </div>
    <div class="content">
	
	  <div class="tab left_mar_10">
	    <ul>
		  <li><a href="/contents/gsks/gsks_01_06_tabpage01.jsp"><img src="/contents/gsks/images/site_control_tab01.gif" alt="공지사항" border="0" id="Image1" onmouseover="MM_swapImage('Image1','','/contentsgsksn/images/site_control_tab01_over.gif',1)" onfocus="MM_swapImage('Image1','','/contents/gsks/images/site_control_tab01_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
		  <li><a href="/contents/gsks/gsks_01_06_tabpage02.jsp"><img src="/contents/gsks/images/site_control_tab02.gif" alt="FAQ" border="0" id="Image2" onmouseover="MM_swapImage('Image2','','/contents/gsks/images/site_control_tab02_over.gif',1)" onfocus="MM_swapImage('Image2','','/contents/gsks/images/site_control_tab02_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
		  <li><a href="/contents/gsks/gsks_01_06_tabpage03.jsp"><img src="/contents/gsks/images/site_control_tab03.gif" alt="Q&A" border="0" id="Image3" onmouseover="MM_swapImage('Image3','','/contents/gsks/images/site_control_tab03_over.gif',1)" onfocus="MM_swapImage('Image3','','/contents/gsks/images/site_control_tab03_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
		  <li><a href="/contents/gsks/gsks_01_06_tabpage04.jsp"><img src="/contents/gsks/images/site_control_tab04_over.gif" alt="메뉴" border="0" id="Image4" onmouseover="MM_swapImage('Image4','','/contents/gsks/images/site_control_tab04_over.gif',1)" onfocus="MM_swapImage('Image4','','/contents/gsks/images/site_control_tab04_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
		  <li><a href="/contents/gsks/gsks_01_06_tabpage05.jsp"><img src="/contents/gsks/images/site_control_tab05.gif" alt="용어설명관리" border="0" id="Image5" onmouseover="MM_swapImage('Image5','','/contents/gsks/images/site_control_tab05_over.gif',1)" onfocus="MM_swapImage('Image5','','/contents/gsks/images/site_control_tab05_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
		</ul>
		<div class="clear"></div>
	  </div>
	  <div class="site_control_write">
	  <h2>메뉴 추가/수정</h2>
        <table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" summary="사이트관리에 대한 내용입니다.">
          <caption>
            사이트관리
          </caption>
          <tr>
            <th width="100" class="td_top">메뉴명</th>
            <td class="td_top t_end"><label>
              <input name="textfield" type="text" size="50" />
              </label>
                </th>
            </td>
          </tr>
          <tr>
            <th>팝업여부</th>
            <td class="t_end"><label>
            <input type="checkbox" name="checkbox" value="checkbox" class="menu_check" />
            </label></td>
          </tr>
          <tr>
            <th>팝업사이즈 </th>
            <td class="t_end"><label>
              <input name="textfield2" type="text" size="7" />
              ×
              <input name="textfield22" type="text" size="7" />
            </label></td>
          </tr>
		  <tr>
            <th>URL</th>
            <td class="t_end"><label>
              <input name="textfield2" type="text" size="50" />
            </label></td>
          </tr>
          <tr>
            <th>권한설정</th>
            <td class="t_end"><input type="checkbox" name="checkbox2" value="checkbox" class="menu_check" /> 
              일반회원<br />
              <input type="checkbox" name="checkbox3" value="checkbox" class="menu_check" />
              관리자<br />
              <input type="checkbox" name="checkbox4" value="checkbox" class="menu_check" /> 
              기타회원 </td>
          </tr>
        </table>
      </div>
	  <div class="site_control_write_button"><a href="#"><img src="/contents/gsks/images/button_ok.gif" alt="확인" border="0" /></a><a href="#"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" alt="취소" border="0" /></a></div>
	  
	  
	  
    </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
