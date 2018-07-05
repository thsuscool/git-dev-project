<%--
/*********************************************************
* @source      : gsks_06_correcr.jsp
* @description : 관리자  신규입력 및 수정
*********************************************************
*    DATE    |     AUTHOR      |        DESC
*--------------------------------------------------------
* 2012.04.10       Bobby               최초등록
*********************************************************
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ page import="java.math.BigDecimal"                  %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.pdf.basis.*"              %>

<%@ page import="sun.misc.BASE64Decoder"                %>

<%@ include file="/contents/gsks/include/header.jsp"   %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%@ include file="/contents/gsks/scripts/interest_loc.jsp" %>

<%
	String pg = lData.getString("pg");
	String aT     = lData.getString("aT");
	String memKey = lData.getString("sgis_member_key");

	BASE64Decoder decoder = new BASE64Decoder();

	GeneralBroker broker = null;
	RecordModel userSet  = null;
	RecordModel pwdSet   = null;
	RecordModel jobSet   = null;
	RecordModel menuSet  = null;
	RecordModel authSet  = null;

	String member_id         ="";
	String member_key        ="";
	String main_auth   ="";
	String statistics_auth   ="";
	String msgis_auth        ="";
	String publicmodel_auth  ="";
	String metadata_auth     ="";
	String funnymonth_auth   ="";
	String statbd_auth       ="";
	String admin_manage      ="";
	String openapi_auth       ="";
	String census_auth       ="";

	String event   = aT.equals("INS") ? "onClick='resetID();'" : "";
	String bgcolor = aT.equals("UPD") ? "background-color:#DDDDDD;" : "";
	try {
		broker = new GeneralBroker("adaa0000");

		if(aT.equals("UPD")) {
			lData.setNumber("SEQ", 2);
			lData.setString("member_key", memKey);
			userSet = broker.getList(lData);
		}

		if(userSet != null && userSet.next()) {
			member_id         = StringUtil.verify((String)userSet.get("sgis_member_id"));
			member_key         = StringUtil.verify((String)userSet.get("sgis_member_key"));        
			main_auth     = StringUtil.verify((String)userSet.get("sgis_main_auth").toString());   
			statistics_auth     = StringUtil.verify((String)userSet.get("sgis_statistics_auth").toString());        
			msgis_auth         = StringUtil.verify((String)userSet.get("sgis_msgis_auth").toString());        
			publicmodel_auth         = StringUtil.verify((String)userSet.get("sgis_publicmodel_auth").toString());        
			metadata_auth         = StringUtil.verify((String)userSet.get("sgis_metadata_auth").toString());        
			funnymonth_auth         = StringUtil.verify((String)userSet.get("sgis_funnymonth_auth").toString());        
			statbd_auth         = StringUtil.verify((String)userSet.get("sgis_statbd_auth").toString());        
			admin_manage         = StringUtil.verify((String)userSet.get("sgis_admin_manage").toString());    
			openapi_auth         = StringUtil.verify((String)userSet.get("sgis_openapi_auth").toString());
			census_auth         = StringUtil.verify((String)userSet.get("sgis_census_auth").toString());

			/* 
			System.out.println("*************************"+member_id);
			System.out.println("*************************"+member_key);
			System.out.println("*************************"+statistics_auth);
			System.out.println("*************************"+msgis_auth);
			System.out.println("*************************"+publicmodel_auth);
			System.out.println("*************************"+metadata_auth);
			System.out.println("*************************"+funnymonth_auth);
			System.out.println("*************************"+statbd_auth);
			System.out.println("*************************"+admin_manage);  
			*/
		}
	}catch(Exception e) {
		System.out.println("***Main Page exception info***\n"+e);
	}finally {
	}
%>

<!-- 관심지역  -->
<script type="text/javascript" src="../search/stringUtil.js" charset=UTF-8></script>
<script type="text/javascript" src="../search/scriptLib.js" charset=UTF-8></script>
<script type="text/javascript" src="../search/ajaxUtil.js" charset=UTF-8></script>
<script type="text/javascript" src="../search/jslb_ajax.js" charset=UTF-8></script>
<script type="text/javascript">
	function list(pg){
		var fm = document.joinFm;

		fm.pg.value = pg;
		fm.action = 'gsks_06.jsp';
		fm.target = '_self';
		fm.submit();
	}

	function confirmUserInfo() {
		var fm = document.joinFm;

		if(confirm("저장하시겠습니까?")) {
			fm.sgis_member_key.value = <%=memKey%>;
			fm.action = "gsks_06_process.jsp";
			fm.target = "_self";
			fm.submit();
		}
	}
</script>

<form name="joinFm" method="post" style="margin:0px;">
<input type="hidden" name="pg" value="<%=pg %>"/>
<input type="hidden" name="aT" value="<%=aT %>"/>
<input type="hidden" name="sgis_member_key" value="<%=memKey %>"/>
<input type="hidden" name="isIDChk" value="N">					<!-- 아이디중복체크여부 -->
<input type="hidden" name="census_download" value="N">	<!-- census (default : N) -->
<input type="hidden" name="virtual_key" value=""> <!-- virtual key -->
<input type="hidden" name="mem_cond" value="<%=lData.get("mem_cond")%>"> <!-- 검색어 -->
<input type="hidden" name="list_search_input" value="<%=lData.get("list_search_input")%>"> <!-- 검색어 -->
<input type="hidden" name="sort" value="<%=lData.get("sort")%>">
<input type="hidden" name="mem_status" value="<%=lData.get("mem_status")%>">
<input type="hidden" name="mem_grade" value="<%=lData.get("mem_grade")%>">

<!------------------------left끝---------------------------->      
<div class="admin_content">

	<!-- 메뉴Include -->
	<%@ include file="/contents/gsks/include/gsks_menu_AM.jsp" %>

	<div class="clear"></div>

	<div class="content_title_1"> 
		<div class="content_title_2">관리자 권한 관리</div>

		<ul class="navigation">
			<li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
			<li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_06.jsp">관리자 관리</a> > <a href="#">관리자 권한 관리</a></li>
		</ul>
	</div>

	<div class="content_admin">
		<div class="agreement_form">
			<table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" summary="마이페이지 개인정보입니다.">
				<caption>관리자 권한 정보</caption>
				<tr>
					<th class="td_top">SGIS유통홈페이지 관리자</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="main_auth" id="main_auth" tabindex="1" title="SGIS유통홈페이지 관리 권한" <%=main_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
					<th class="td_top">통계내비게이터 고도화 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="statistics_auth" id="statistics_auth" tabindex="1" title="통계내비게이터 관리 권한" <%=statistics_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
				</tr>
				<tr>
					<th class="td_top">민간서비스모델 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="msgis_auth" id="msgis_auth" tabindex="2" title="민간서비스모델 관리 권한" <%=msgis_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
					<th class="td_top">공공서비스모델 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="publicmodel_auth" id="publicmodel_auth" tabindex="3" title="공공서비스모델 관리 권한" <%=publicmodel_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
				</tr>
				<tr>
					<th class="td_top">통계지리정보 메타데이터 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="metadata_auth" id="metadata_auth" tabindex="4" title="통계지리정보 메타데이터 관리 권한" <%=metadata_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
					<th class="td_top">월간 SGIS 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="funnymonth_auth" id="funnymonth_auth" tabindex="3" title="월간 SGIS 관리 권한" <%=funnymonth_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
				</tr>
				<tr>
					<th class="td_top">지도로 보는 행정구역통계 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="statbd_auth" id="statbd_auth" tabindex="4" title="지도로 보는 행정구역통계 관리 권한" <%=statbd_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
					<th class="td_top">OpenAPI인증키 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="openapi_auth" id="openapi_auth" tabindex="4" title="OpenAPI인증키 관리 권한" <%=openapi_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
				</tr>
				<tr>
					<th class="td_top">센서스경계자료제공 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="census_auth" id="census_auth" tabindex="3" title="센서스경계자료제공 권한" <%=census_auth.equals("Y") ? "checked" : "" %>/></label>
					</td>
					<th class="td_top">관리자 관리 권한</th>
					<td class="td_top t_end">
					<label><input type="checkbox" name="admin_manage" id="admin_manage" tabindex="3" title="관리자 관리 권한" <%=admin_manage.equals("Y") ? "checked" : "" %>/></label>
					</td>
				</tr>
			</table>
		</div>

		<div class="center top_mar_20">
			<a href="javascript:confirmUserInfo();" onfocus="this.blur()"><img src="images/admin_01_03_tab_page_01_button_02.gif" tabindex="34" alt="확인" border="0"></a>
			<!-- <a href="javascript:document.joinFm.reset();" onfocus="this.blur()"><img src="images/admin_01_03_tab_page_01_button_03.gif" tabindex="35" alt="취소" border="0"></a> -->
			<a href="javascript:list('<%=pg %>');" onfocus="this.blur()"><img src="images/admin_01_03_tab_page_01_button_04.gif" tabindex="36" alt="목록" border="0"></a>	
		</div>

		<div id="popup_calendar">
			<div class="popup_calendar_button">
				<a href="#"><img src="/contents/member/images/popup_calendar_move.gif" alt="이동" border="0" /></a>
				<a href="javascript:;" onclick="calender_view('off')" onkeypress="calender_view('off')"><img src="/contents/member/images/popup_calendar_close.gif" alt="닫기" border="0" /></a>
			</div>

			<div class="popup_calendar_wrapper">
				<div class="popup_calendar_content">
					<div class="popup_calendar_top">
						<ul>
							<li class="arrow1"><img src="/contents/member/images/bullet_arrow01.gif" alt="이전달" /></li>
							<li class="month">11월</li>
							<li class="year">2008년</li>
							<li class="year_icon">
								<a href="#"><img src="/contents/member/images/bullet_arrow03.gif" alt="작년" border="0" /></a>
								<a href="#"><img src="/contents/member/images/bullet_arrow04.gif" alt="내년" border="0" /></a>
							</li>
							<li class="arrow2"><img src="/contents/member/images/bullet_arrow02.gif" alt="다음달" /></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>

</form>
<script>
//on_init();
</script>
<%@ include file="/contents/gsks/include/footer.jsp" %>