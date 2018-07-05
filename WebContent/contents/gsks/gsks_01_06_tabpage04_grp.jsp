<%--
/*********************************************************
 * @source      : gsks_01.jsp
 * @description : 관리자 / 메뉴관리 / 그룹 관리
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008.11.20   SHIN HYUN MYUNG         최초등록
 *********************************************************
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>


<%@ page import="kr.co.offton.jdf.db.RecordModel"                %>
<%@ page import="kr.co.offton.jdf.db.DbManager"                  %>

<%@ include file="/contents/include/comVarCoding.jsp"            %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	DbManager dbmgr     = null;
	RecordModel authSet = null;

	try {

		dbmgr = new DbManager();

		StringBuffer authQury = new StringBuffer(1024);

		authQury.append(" select sgis_auth_id   \n");
		authQury.append("       ,sgis_auth_name \n");
		authQury.append("   from sgis_auth_id   \n");

		dbmgr.prepareStatement(authQury.toString());
		authSet = dbmgr.select();
	}catch(Exception e) {

		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}finally {

		if(dbmgr != null)	dbmgr.close();
	}

	String idSet = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/contents/style/style.css"       type="text/css" media="all">
<link rel="stylesheet" href="/contents/gsks/style/style.css" type="text/css" media="all">
<title>권한관리</title>
<script type="text/javascript">
function checkedAll(isCheck, subName) {

	var chk = document.getElementsByName(subName);
	for(var i=0; i<chk.length; i++)	chk[i].checked = isCheck;
}

function addRow() {

	var elem1 = document.getElementById('addmenu1');
	var elem2 = document.getElementById('addmenu2');
	var elem3 = document.getElementById('addmenu3');

	elem1.innerHTML = '<input type="checkbox" name="chk" checked/>';
	elem2.innerHTML = '<input type="text"     name="auth_id"   style="width:48px; " maxlength="2"/>';
	elem3.innerHTML = '<input type="text"     name="auth_name" style="width:140px;" maxlength="15"/>'
	                 +'<input type="hidden"   name="status" value="I">'
	                 +'<input type="hidden"   name="inUse"  value="Y">';
}

function groupControl(stat) {

	var chk      = document.getElementsByName('chk');
	var authId   = document.getElementsByName('auth_id');
	var authName = document.getElementsByName('auth_name');
	var inUse    = document.getElementsByName('inUse');
	var chkCnt   = 0;
	var idSet    = document.getElementById('idSet').value;

	for(var i=0; i<chk.length; i++) {

		if(chk[i].checked) {

			chkCnt++;
			inUse[i].value = 'Y';
			if(authId[i].value == '' || authName[i].value == '') {

				alert('누락된 항목을 확인하세요.');
				return;
			}
			if(idSet.lastIndexOf(authId[i].value) != -1 && stat == 'INS') {

				alert('중복된 아이디가 존재합니다');
				return;
			}
		}else {
			inUse[i].value = 'N';
		}
	}

	if(chkCnt == 0) {

		alert('선택 항목이 없습니다.');
		return;
	}else {

		var grpFm = document.grpForm;
		var msg   = '';

		if(stat == 'INS')				msg = '저장하시겠습니까?';
		else if(stat == 'DEL')	msg = '삭제하시겠습니까?';

		if(!confirm(msg))	return;
		grpFm.aT.value = stat;
		grpFm.action   = 'gsks_01_06_tabpage04_grp_prc.jsp';
		grpFm.target   = 'prcFrame';

		grpFm.submit();
	}
}

function valueChecked(elem, idx) {

	var chk = document.getElementsByName('chk');

	if(elem.defaultValue != elem.value) {

		chk[idx].checked = true;
	}else {

		chk[idx].checked = false;
	}
}

function popClose() {

	opener.location.href='gsks_01_06_tabpage04.jsp';
	self.close();
}
</script>
</head>
<body>
<div style="padding:10px 10px 0px 10px;">

<iframe name="prcFrame" src="" width=0 height=0 frameborder=0></iframe>
<form   name="grpForm" method="post" style="margin:0px;">
	<input type="hidden" name="aT"/>

	<table width="270" cellpadding="0" cellspacing="0" class="table1">
		<thead>
		<tr>
		  <th class="td_top"       width="20" ><input type="checkbox" name="mainChk" onclick="checkedAll(this.checked, 'chk')"></th>
		  <th class="td_top"       width="60" >코드</th>
		  <th class="t_end td_top"            >권한명</th>
		</tr>
		</thead>
	</table>

  <div style="width:287px;height:150px;overflow-y:scroll;">
		<table width="270" cellpadding="0" cellspacing="0" class="table1">
			<thead></thead>
<%
		int rowCnt = 0;
		while(authSet != null && authSet.next()) {

			String sgis_auth_id   = StringUtil.verify((String)authSet.get("sgis_auth_id"));
			String sgis_auth_name = StringUtil.verify((String)authSet.get("sgis_auth_name"));

			idSet += sgis_auth_id;
%>
			<tr>
				<td width="20" class="cell_center"      ><input type="checkbox" name="chk"       value="<%=sgis_auth_id %>"/></td>
				<td width="60" class="cell_center"      ><input type="text"     name="auth_id"   value="<%=sgis_auth_id %>"   style="width:48px;border:0px;" readonly/></td>
				<td            class="t_end cell_center">
					<input type="text"   name="auth_name"  value="<%=sgis_auth_name %>" onkeyup="valueChecked(this, <%=rowCnt %>)" style="width:140px;"/>
					<input type="hidden" name="status"     value="U"/>
					<input type="hidden" name="inUse"      value="N">
				</td>
			</tr>
<%
			rowCnt++;
		}//end of while
%>
			<tr>
				<td id="addmenu1" class="cell_center"      ></td>
				<td id="addmenu2" class="cell_center"      ></td>
				<td id="addmenu3" class="t_end cell_center"></td>
			</tr>
		</table>
	</div>

	<div style="height:15px;"></div>

	<img src="images/admin_01_04_tab_page_03_button_add.gif"    onclick="addRow();"            style="cursor:pointer;" border=0/>
	<img src="images/admin_01_03_tab_page_01_button_02.gif"     onclick="groupControl('INS');" style="cursor:pointer;" border=0/>
	<img src="images/admin_01_04_tab_page_03_button_delete.gif" onclick="groupControl('DEL');" style="cursor:pointer;" border=0/>
	<img src="images/admin_01_03_tab_page_01_button_close.gif"  onclick="popClose();"          style="cursor:pointer;" border=0/>

	<input type="hidden" name="idSet" id="idSet" value="<%=idSet %>"/>
</form>

</div>
</body>
</html>