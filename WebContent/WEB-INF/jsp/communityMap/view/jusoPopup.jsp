<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>주소 검색</title>
</head>
<body>
	<c:choose>
		<c:when test="${param.inputYn=='Y'}">
			<script>
				<%
					//TODO 운영의 개발서버에서는 한글이 깨져서 java에서 utf8로 변경하였고 운영의 시범운영서버는 utf8로 변경하면 한글이 깨져서 jstl의 param으로 해놨습니다.실서버도 확인하고 해당 코딩을 유동적으로 변경해주세요
				%>
				if(location.hostname=="sgis.kostat.go.kr"){
					opener.popupCallback("${param.jibunAddr }","${param.roadFullAddr }");
				}else{
					opener.popupCallback("${jibunAddr }","${roadFullAddr }");
				}
				window.close();
			</script>
		</c:when>
		<c:otherwise>
			<form id="juso-popup-form" name="form" action="https://www.juso.go.kr/addrlink/addrLinkUrl.do" method="post">
				<input type="hidden" name="confmKey" value="U01TX0FVVEgyMDE1MTAxOTE1NTgzODA="/>
				<input type="hidden" id="returnUrl" name="returnUrl"/>
			</form>
			<script>
				document.form.returnUrl.value=location.href;
				document.form.submit();
			</script>
		</c:otherwise>
	</c:choose>
</body>
</html>