<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>데이터 일괄 업로드 | 통계청SGIS 오픈플랫폼</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css"/>
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/themes/default/easyui.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/um.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/communityMap.css" />
<script src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
<script src="${pageContext.request.contextPath}/js/common/sop.portal.absAPI.js"></script>
<script src="${pageContext.request.contextPath}/js/common/map.js"></script>
<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script src="${pageContext.request.contextPath}/js/communityMap/communityCommon.js"></script>
<script src="${pageContext.request.contextPath}/js/communityMap/batch/communityBatchMap.js"></script>
<script src="${pageContext.request.contextPath}/js/communityMap/batch/communityBatch.js"></script>
<script>$communityBatchMap.ui.communityMapInfo = ${communityMapInfo };</script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage/mypage.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/handsontable.full.css">
<script src="${pageContext.request.contextPath}/js/plugins/handsontable.full.js"></script>
<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

</head>
<body>
	<div id="wrap">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		<div id="container">
			<c:set var="appendPath" scope="request">
				<a href="#"><span class="path_el current">통계소통지도 데이터 일괄 업로드</span></a>
			</c:set>
			<jsp:include page="/view/community/communityPath"/>
			<div class="containerBox">
				<div class="mpSubTitle">
					 <h3>데이터 일괄 업로드</h3>
					<p>업로드된 데이터를 SGIS+plus에 적용하기 위해서는 데이터 설정이 필요합니다. 설정을 통해 더욱 다양하게 자료를 활용해보세요.</p>
					<p>1회당 업로드 제한:3500row / 10 column</p> 
				</div>
				<div class="dataMenuBox">
					<h3>내 컴퓨터 파일 찾기</h3>
					<form name="fileForm" method="post" enctype="multipart/form-data">
						<div class="dmFile">
							<input type="file" name="mpsFile" id="mpsFile" class="fileEvent"/> 
							<input name="myData_regist_file" type="text" class="inp" title="파일위치" disabled/> 
							<label for="mpsFile" class="spbox type01">파일찾기</label>
						</div>
						<ul class="dmBtn">
							<li>
								<a href="${pageContext.request.contextPath}/view/community/sample/download?cmmnty_map_id=${param.cmmnty_map_id}" class="spbox type02">엑셀양식다운로드</a>
							</li>
						</ul>
					</form>
				</div>
				<div class="mpFormArea">
					<div class="fl">
						<p class="mpfText01">업로드 데이터를 지도에 표시하기 위해서는 위치조회(지오코딩)를 하여야 합니다.</p>
					</div>
					<div id="tableRowChange" class="btnbox type02" style="display:none;">
						<div class="fl" id="progeress">
							<span>진행&nbsp;현황 </span>
							<span id="currentCodingRow">0</span>
							<span>/&nbsp;</span>
							<span id="maxCodingRow"></span>
							<span id="successSubj">성공:</span>
							<span id="successCount"></span>
							<span id="failSubj">실패:</span>
							<span id="failCount"></span>
						</div>
						<div class="fr">
							<a href="#" id="add-row" class="btnType01">추가(행)</a>
							<a href="#" id="delete-row" class="btnType01">삭제(행)</a>
						</div>
					</div>
				</div>
				<div id="hondsontable-box" style="display:none;">
					<div id="basic_handson" style="overflow:auto"></div>
					<div class="btnbox">
						<div class="fl">
							<button id="gioCoding" class="spbox type01" style="display:none;width: 220px;" type="button">위치조회(지오코딩) 및 데이터 검증</button>
							<button id="preview-button" class="spbox type01" style="display:none;" type="button">미리보기</button>
							<button id="save-button" class="spbox type01" style="display:none;" type="button">저장</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer id="footer">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>
	<div id="mapSetting" class="DetailInfo" style="display: none;">
		<div class="cm_newwin" style="margin-left:-375px; width: 1000px;height: 600px;left: 50%;top: 50%;margin: -300px 0 0 -500px">
			<h3>미리보기</h3>
			<button class="btnclose" type="button" onclick="$('#mapSetting').hide();"> 창닫기</button>
			<div class="cm_newwin_cont" style="padding:0;">
				<div style="float: left; width:250px;">
					<div class="TabCont">
						<h4>의견</h4>
						<div class="SelectArea" style="height: 460px; padding:0px; overflow:hidden;">
							<ul id="mapSettingDisp" style="height: 470px;overflow: scroll;padding:3px;"></ul>
						</div>
					</div>
				</div>
				<div id="map" class="map_img" style="width:750px;height: 559px;"></div>
			</div>
		</div>
		<div class="Bg_black">&nbsp;</div>
	</div>
	<script>
		$("#mapSetting>.Bg_black").height($(document).height());
	</script>
</body>
</html>