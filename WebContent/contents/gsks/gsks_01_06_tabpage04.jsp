<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	DbManager dmg = null;
	RecordModel rm = null;

	try {

		dmg = new DbManager();

			String sql = " select sgis_menu_h_id ";
							sql += "					, sgis_menu_h_name ";
							sql += "				from sgis_menu_high_code ";
							sql += "	order by sgis_menu_h_id	";

			dmg.prepareStatement(sql);
			rm = dmg.select();

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		dmg.close();
	}
%>
<script src=/contents/scripts/divwriter.js></script>
    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>

<SCRIPT LANGUAGE="JavaScript">
<!--
function calender_view(data){
	if(data=="on")document.getElementById('popup_calendar').style.display="block";
	if(data=="off")document.getElementById('popup_calendar').style.display="none";
}

function addClicked(lev) {

	if(lev == 1) {

		var am1 = document.getElementById("addmenu1");
		var am2 = document.getElementById("addmenu2");
		var am3 = document.getElementById("addmenu3");

		var text1 = "<input type=\"checkbox\" name=\"chk\" value=\"\" checked>";
		var text2 = "<input type=\"text\" name=\"sgis_menu_h_id\" style=\"width:55px\" maxlength=6>";
		var	text3 = "<input type=\"text\" name=\"sgis_menu_h_name\" style=\"150px\">";
				text3 += "<input type=\"hidden\" name=\"status\" value=\"I\">	<input type=\"hidden\" name=\"inUse\" value=\"Y\">";
		am1.innerHTML = text1;
		am2.innerHTML = text2;
		am3.innerHTML = text3;
	}else if(lev == 2) {

		var am1 = document.getElementById("sub_addmenu1");
		var am2 = document.getElementById("sub_addmenu2");
		var am3 = document.getElementById("sub_addmenu3");
		var am4 = document.getElementById("sub_addmenu4");
		var am5 = document.getElementById("sub_addmenu5");
		var am6 = document.getElementById("sub_addmenu6");
		var am7 = document.getElementById("sub_addmenu7");

		am1.innerHTML = '<input type="checkbox" name="sub_chk" checked>';
		am2.innerHTML = '<input type="text"     name="sgis_menu_d_code_id" style="width:50px" maxlength="6"/>';
		am3.innerHTML = '<input type="text"     name="sgis_menu_d_name"    style="width:140px;"/>';
		am4.innerHTML = '<input type="text"     name="sgis_menu_url"       style="width:140px;"/>';
		am5.innerHTML = '<input type="checkbox" name="auth_new" value="01"/>관리자'
		               +'<input type="checkbox" name="auth_new" value="02"/>일반사용자'
		               //+'<input type="checkbox" name="auth_new" id="auth_c" value="03"/>기타회원'
		               +'<input type="hidden"   name="sub_status" value="I">'
		               +'<input type="hidden"   name="sub_inUse"  value="Y">';

    am6.innerHTML = '<select name="sgis_menu_use_yn"><option value="Y">사용</option><option value="N">미사용</option></select>';
    am7.innerHTML = '<select name="sgis_menu_pop_chk"><option value="Y">Y</option><option value="N" selected>N</option></select>';
	}
}

function saveClicked() {
	var fm=document.eFm;
	var cnt = fm.chk.length;
	var ischk=0;
	var isnull=0;

	for(i=0; i < cnt; i++) {
		if(fm.	chk[i].checked) {
			ischk++;
			fm.inUse[i].value = "Y";
			if(fm.sgis_menu_h_id[i].value == "" || fm.sgis_menu_h_name[i].value == "") {
				alert("누락된 항목을 입력하세요.");
				return;
			}

			for(var j=0; j<cnt; j++) {

				if(fm.sgis_menu_h_id[i].value == fm.sgis_menu_h_id[j].value && i != j) {
					alert('중복된 코드가 존재합니다.');
					return;
				}
			}
		} else {
			fm.inUse[i].value = "N";
		}
	}

	if(ischk == 0) {
		alert("선택 항목이 없습니다.");
		return;
	} else {

		var c = confirm("저장 하시겠습니까?");
		if(c == 1) {
			fm.aT.value = "INS";
			fm.action="gsks_01_06_tabpage04_prc.jsp";
			fm.target="prcIfr";
			fm.submit();
		}
	}

}

function removeClicked() {
	var fm=document.eFm;
	var cnt = fm.chk.length;
	var ischk=0;
	var isnull=0;

	for(i=0; i < cnt; i++) {
		if(fm.	chk[i].checked) {
			ischk++;
			fm.inUse[i].value = "Y";
			if(fm.sgis_menu_h_id[i].value == "" || fm.sgis_menu_h_name[i].value == "") {
				alert("누락된 항목을 입력하세요.");
				return;
			}
		} else {
			fm.inUse[i].value = "N";
		}
	}

	if(ischk == 0) {
		alert("선택 항목이 없습니다.");
		return;
	} else {

		var c = confirm("삭제하시면 관련된 하위 메뉴도 삭제됩니다. 삭제 하시겠습니까?");
		if(c == 1) {
			fm.aT.value = "DEL";
			fm.action="gsks_01_06_tabpage04_prc.jsp";
			fm.target="prcIfr";
			fm.submit();
		}
	}

}

function subControlClicked(stat) {

	var subFm    = document.subForm;
	var subChk   = document.getElementsByName('sub_chk');
	var menuId   = document.getElementsByName('sgis_menu_d_code_id');
	var menuNm   = document.getElementsByName('sgis_menu_d_name');
	var menuUrl  = document.getElementsByName('sgis_menu_url');
	var inUse    = document.getElementsByName('sub_inUse');

	var checkCnt = 0;

	for(var i=0; i<subChk.length; i++) {

		if(subChk[i].checked) {
			checkCnt++;
			inUse[i].value = 'Y';
			if(menuId[i].value == '' || menuNm[i].value == '' || menuUrl[i].value == '') {

				alert('누락된 항목을 확인하세요.');
				return;
			}

			for(var j=0; j<menuId.length; j++) {

				if(menuId[i].value == menuId[j].value && i != j) {

					alert('중복된 코드가 존재합니다.');
					return;
				}
			}
		}else {
			inUse[i].value = 'N';
		}
	}

	if(checkCnt == 0) {

		alert('선택 항목이 없습니다.');
		return;
	}else {

		var msg = '';
		if(stat == 'INS')				msg = '저장하시겠습니까?';
		else if(stat == 'DEL')	msg = '삭제하시겠습니까?';

		if(!confirm(msg))	return;
		subFm.aT.value = stat;
		subFm.action   = 'gsks_01_06_tabpage04_prc.jsp';
		subFm.target   = 'prcIfr';

		subFm.submit();
	}
}

/**
 *  @desc  해당 row의 checkbox를 체크한다.
 *  @param row index, checkbox name
 */
function updateChecked(idx, elemName) {

	var chk = document.getElementsByName(elemName);

	chk[idx].checked = true;
}

/**
 * @desc  event가 발생한 element의 defaultvalue와 event발생후 value를 비교하여 변화가 있는경우
 *        해당row의 checkbox를 체크하는 함수를 호출한다.
 * @param event발생 element, row index
 */
function valueChecked(elem, idx) {

	if(elem.defaultValue != elem.value) {

		updateChecked(idx, 'chk');
	}
}

/**
 * @desc  권한관리 팝업 open
 */
function openGroupManager() {
	var popFm     = document.popForm;

  var rMW    = screen.availWidth;
  var rMH    = screen.availHeight;
  var width  = 300;
  var height = 250;

	var param = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable,titlebar=no,width='+width+',height='+height+',left=' + (rMW-width)/2 + ',top=' + (rMH-height)/2;
	window.open('about:blank', 'groupPop', param);

	popFm.action = 'gsks_01_06_tabpage04_grp.jsp';
	popFm.target = 'groupPop';

	popFm.submit();
}
//-->

/* 서브메뉴리스트 visible */
function visibleSubMenuList(h_id) {

	setParam(['sgis_menu_h_id:'+h_id]);
	writeDiv(['subMenuDiv']);
}

/* ajax callback */
function onLoadAjax(id) {

	//alert(id);
}

function checkedAll(isCheck, subName) {

	var chk = document.getElementsByName(subName);
	for(var i=0; i<chk.length; i++)	chk[i].checked = isCheck;
}

</script>
<form name="popForm" method="post"></form>
<iframe name="prcIfr" src="" width=0 height=0 frameborder=0></iframe>

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

	  <div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_06_tabpage01.jsp"><strong>공지사항</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage02.jsp"><strong>FAQ</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_06_tabpage03.jsp"><strong>Q&A</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage04.jsp"><font color="#FFFFFF"><strong>메뉴</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage06.jsp"><strong>메인메뉴</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage05.jsp"><strong>용어설명관리</strong></a></td>
				</tr>
				<tr>
					<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
				</tr>
			</table>
		<div class="clear"></div>
	  </div>

	<table border=0>
		<tr>
			<td>
			<form name="eFm" method="post" style="margin:0px;">
					<input type="hidden"	name="aT">
					<input type="hidden" name="gb" value="HIGH">

				 	<table cellpadding="0" cellspacing="1" class="table1">
				   <thead>
				      <tr>
				        <th class="td_top" width="20"><input type="checkbox" name="mainChk" onclick="checkedAll(this.checked, 'chk')"></th>
				        <th class="td_top" width="60">코드</th>
				        <th class="t_end td_top" width="100">메뉴명</th>
				      </tr>
				    </thead>

				<%
							int rowCnt = 0;
							while(rm != null && rm.next()) {
								String sgis_menu_h_id = String.valueOf((BigDecimal)rm.get("sgis_menu_h_id"));
								String sgis_menu_h_name = StringUtil.verify((String)rm.get("sgis_menu_h_name"));
					%>
						<tr>
							<td class="cell_center"><input type="checkbox" name="chk"></td>
							<td class="cell_center"><input type="text" name="sgis_menu_h_id" value="<%=sgis_menu_h_id %>" style="border:0; width:50px;cursor:pointer" onclick="visibleSubMenuList('<%=sgis_menu_h_id %>')" readOnly></td>
							<td class="cell_center"><input type="text" name="sgis_menu_h_name" value="<%=sgis_menu_h_name %>" style="width:150px;cursor:pointer" onclick="visibleSubMenuList('<%=sgis_menu_h_id %>')" onkeyup="valueChecked(this, <%=rowCnt %>)"></td>
					</tr>

					<input type="hidden" name="status" value="U">
					<input type="hidden" name="inUse" value="N">

<%
								rowCnt++;
							}
%>
					<tr>
						<td id="addmenu1" class="cell_center"></td>
						<td id="addmenu2"></td>
						<td id="addmenu3"></td>
					</tr>
					</table>
			</form>
			</td>
		</tr>
		<tr>
			<td>
				<a href="javascript:addClicked(1);"><img src="images/admin_01_04_tab_page_03_button_add.gif" border=0></a>
				<a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0 ></a>
				<a href="javascript:removeClicked();"><img src="images/admin_01_04_tab_page_03_button_delete.gif" border=0></a>
				<a href="javascript:openGroupManager();"><img src="images/admin_01_04_tab_page_05_button_group.gif" border="0"></a>
			</td>
		</tr>
	</table>
	<table border="0">
		<tr>
			<td valign="top">
				<div id="subMenuDiv" type="table" data="/contents/gsks/gsks_01_06_tabpage04_sub.jsp"></div>
			</td>
		</tr>
	</table>

    </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
