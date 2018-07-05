<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>


<script type="text/javascript" language="javascript" src="/contents/scripts/main/jquery-1.5.1.min.js"></script>

<script language="javascript">
	


function jo_year() {
	
	if ( jQuery('#retrieve_year').val() == "" ) {
		alert("년도를 입력하세요.(예: 2014)");
		return false;
	}
	
	jQuery.ajax({
		type:"POST",
		url:"gsks_01_04_05_excel.jsp",
		data:{"what_year": jQuery('#retrieve_year').val() },
		success:function(data){
			//alert("조회가 완료되었습니다.");
			jQuery('#result').html(data);
		},
		error:function(data) {
			
		}
	});
	
}

function jo_month() {
	
	if ( jQuery('#retrieve_month').val() == "" ) {
		alert("년도월을 입력하세요.(예: 201405)");
		return false;
	}
	
	var year_month= jQuery('#retrieve_month').val();
	year_month = year_month.substr(0,4) + "-" + year_month.substr(4,2);
	jQuery.ajax({
		type:"POST",
		url:"gsks_01_04_05_excel.jsp",
		data:{"what_year": year_month },
		success:function(data){
			//alert("조회가 완료되었습니다.");
			jQuery('#result').html(data);
		},
		error:function(data) {
			
		}
	});
	
}

</script>

<form name="censusFm" method="post">
			
     	

  <div class="admin_content">
  
    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">센서스경계 자료제공</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="#">센서스경계 자료제공</a></li>
      </ul>
    </div>

<div class="content_admin">
		<div class="list_wrap">
<div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04.jsp"><strong>요청관리</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_01.jsp"><strong>자료제공</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_04_02.jsp"><strong>자료및안내</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_03.jsp"><strong>자료목록관리</strong></a></td>
    				<td width="140" height="25" align="center" bgcolor="#00BFFF">
					    <a href="gsks_01_04_05.jsp"><font color="#FFFFFF"><strong>자료제공관리</strong></font></a></td>
    				<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_06.jsp"><strong>결재관리</strong></a></td>
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
			</tr>
		</table>
</div>


<table width="720px" cellpadding="0" cellspacing="0" class="table1" summary="" style="margin-left:10px" >

	<tr bgcolor="#FFFFFF">
		<th class="td_top" align="left" width="150px">연도별 엑셀다운로드 </th>
		<td class="td_top td_end">
			<input type="text" id="retrieve_year" name="retrieve_year" value="" class="inp w30 bg_g" maxlength="4"/>
			<a href="#" target="_blank" onclick="javascript:jo_year(); return false;">
            	<img src="images/buton_data_search.gif" alt="자료조회"  title="자료조회" height="20px" align="middle" border="0" />
            </a>
		</td>
	</tr>
	<tr bgcolor="#FFFFFF">
		<th align="left">월별 엑셀다운로드</span> </th>
		<td class="td_end">
			<input type="text" id="retrieve_month" name="retrieve_month" value="" class="inp w30 bg_g" maxlength="6" />
			<a href="#" target="_blank" onclick="javascript:jo_month(); return false;">
                <img src="images/buton_data_search.gif" alt="자료조회"  title="자료조회"  height="20px" align="middle" border="0" />
            </a>
		</td>
	</tr>

</table>
<input type="hidden" id="excel_down" name="excel_down" />


	<span id='result'></span>


<div class="clear"></div>
</form>

</div>

	</div><div class="clear"></div>

    </div>
  </div>
</div>
<div class="clear"></div>
<%@ include file="/contents/gsks/include/footer.jsp" %>