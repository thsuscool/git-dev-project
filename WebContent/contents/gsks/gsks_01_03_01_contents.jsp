<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="org.apache.commons.lang.StringEscapeUtils" %>
<%
	String co = request.getParameter("co");
%>
<HTML>
<HEAD>
<TITLE>OpenApi Comment</TITLE>
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<script src=/contents/scripts/javascript.js></script>
<style>
.pop_private { width:200px; margin:5px 0px 0px 5px;}
.private_box { width:200px; margin-top:10px;}
.private_box_top { background:url(/contents/images/private_box_top_image.gif) no-repeat; height:6px; width:200px; font-size:1px; line-height:1px;}
.private_box_middle {background:url(/contents/images/private_box_middle_image.gif) repeat-y; width:3200px;}
.private_box_middle .txt { margin:15px;}
.private_box_middle .txt p { text-align:justify;} 
.private_box_bottom {background:url(/contents/images/private_box_bottom_image.gif) no-repeat; height:9px; width:200px; font-size:1px; line-height:1px;}
.private_copyright { float:left; margin:0px 0px 0px 10px;}
.private_button_close { float:left; margin-left:120px; margin-bottom:20px;}
.private_button_close1 { float:left; margin-left:120px; margin-bottom:20px;}
.private_box2 { border: solid 1px #e1e1e1; width:390px; height:80px; padding:5px; text-align:justify; margin-top:20px; margin-bottom:20px;}
.private_box2 p { margin:5px;}
.login_pop_button{width:200px; height:22px; text-align:center; margin-bottom:30px;}
</style>
<SCRIPT LANGUAGE="JavaScript">
<!--
	
	var opener = dialogArguments.document.apiFm;
	
    // 반려
	function refuseClicked() {		
		
		event.returnValue = false;
		var f = document.fo;
		
		var co = "<%=co%>";
		
		if (co == 'B') {
			if(f.refuse.value == "") {
				alert("반려사유를 입력하세요.");
				f.refuse.focus();
				return;	
			}
			var c = confirm("반려하시겠습니까?");
			if(c == 1) {
				opener.aT.value="UPD";
				opener.target = "_self";
				opener.approve_status.value="B";
				opener.refuse.value = f.refuse.value;
				opener.submit();				
			}
		} else if ((co == 'C')) {
			if(f.refuse.value == "") {
				alert("취소사유를 입력하세요.");
				f.refuse.focus();
				return;	
			}
			var c = confirm("승인취소하시겠습니까?\n승인상태는 신청상태로 변경 됩니다. ");
			if(c == 1) {
			    opener.target = "_self";
				opener.aT.value="CANCEL";
				opener.api_modify_desc.value = f.refuse.value;
				opener.submit();
			}
		} else if ((co == 'M')) {
			if(f.refuse.value == "") {
				alert("변경사유를 입력하세요.");
				f.refuse.focus();
				return;	
			}
			var c = confirm("수정하시겠습니까? ");
			if(c == 1) {
				opener.aT.value="UPD";
				opener.api_modify_desc.value = f.refuse.value;
				opener.target = "_self";
				opener.submit();	
			}
		} 

		
		this.close();
	}
		
	function fn_init()
	{		
		var f = document.fo;
	  	var co = "<%=co%>";
	  	var code_name = "";	  	
	  	
	  	if (co == 'B') {
	  	   	code_name = "반려사유";
	  	   	f.refuse.value = opener.refuse.value;
	  	} else if (co == 'C') {
	  		code_name = "취소사유";
	  		f.refuse.value = opener.api_modify_desc.value;
	  	} else {
	  		code_name = "변경사유";
	  		f.refuse.value = opener.api_modify_desc.value;
	  	}
	    f.code.value = code_name;
	}
	
	function closeWin(){
	  self.close();
	}
//-->
</SCRIPT>
</HEAD>
<BODY onload="fn_init();">
<form name="fo" method="post">
	<div class="pop_private">
        <div class="txt">
            <h1 class="left_mar_0"><input type="text" name="code" size="4" readonly style="BORDER-WIDTH: 0px; text-align:right;"> </h3>
        </div>
		<div>
			<textarea name="refuse" cols="34" rows="8"></textarea>
		</div><br>
    	<div class="login_pop_button">
    		<input type="image" src="/contents/gsks/images/admin_01_04_tab_page_02_button_apply.gif" onclick="javascript=refuseClicked();" align="absmiddle" alt="확인">
    		<input type="image" src="/contents/gsks/images/admin_01_03_tab_page_01_button_close.gif" onClick="window.close();event.returnValue = false;" align="absmiddle" alt="닫기">
    	</div>
    </div>		
</form>		
</BODY>
</HTML>