<%@ page language="java" contentType="text/html; charset=UTF-8" session="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>editor</title>
<link rel="stylesheet" href="/contents/css/egovframework/cmm/utl/com.css" type="text/css" />

<script type="text/javascript" src="/contents/scripts/htmlarea3.0/htmlarea.js"></script>
<script type="text/javascript" language="javascript">
//<![CDATA[
_editor_area = "htmlarea";

function goSaveData() {
	document.edit.onsubmit();
	var htmldata = document.edit.htmlarea.value;
	fm.htmldata.value = htmldata;
	fm.action = "EgovPageLink.do";
	fm.submit();
}
//]]>
</script>
<%
String execFlag = request.getParameter("execFlag");
String savedata = "";
if(execFlag==null || execFlag.equals("")) {
    execFlag="SAVE";
}
%>

<%
if(execFlag.equals("SAVE")){
%>
<!-- 웹에디터 화면  시작-->
<body onload="javascript:HTMLArea.init(); HTMLArea.onload = initEditor;">
  	<table>
	  	<tr>
	      <td class="title_left">웹에디터(HTMLAREA) 테스트</td>
	    </tr>
  	</table>
  	
  	<!-- 무료웹에디터로 대체될 textarea -->
  	<form name="edit">
 
	  <textarea id="htmlarea" name="htmlarea" cols="75" rows="14"  style="width:450px; height:400px"></textarea><p>
	</form>
	<!-- 웹에디터로 작성한 데이터를 저장하기 위한 form -->
	<form name="fm" method="post" action="javascript:goSaveData();">
	  <input type = "hidden" name="execFlag" value="DATA_SAVE" />
	  <input type = "hidden" name="htmldata" value="" />
	  <input type = "hidden" name="link" value="cmm/utl/EgovWebEditor" />
	  <input type = "button"  value="저장합니다." onclick="fm.submit()" />
	</form>
	
</body>
<!-- 웹에디터 화면  끝-->
<%  
} else if(execFlag.equals("DATA_SAVE")){
	
	String data = request.getParameter("htmldata");
	
%>
<!-- 웹에디터를 통한 데이터 저장 결과화면 시작 -->
<form name="fm1" action ="EgovPageLink.do">
<input type = "hidden" name="execFlag" value="SAVE" />
<input type = "hidden" name="link" value="cmm/utl/EgovWebEditor" />
<table width="430" border="0" cellpadding="0" cellspacing="1" class="table-register">
    <tr>
        <td width="100" class="title_left">■ ㅋㅋ 내용</td>
        <td><%=data %></td>
    </tr>
</table> 
<br>
<input type = "button" method="post"  value="화면으로 돌아가기" onclick="fm1.submit()" />
</form>
<!-- 웹에디터를 통한 데이터 저장 결과화면 끝 -->
<%
}
%>