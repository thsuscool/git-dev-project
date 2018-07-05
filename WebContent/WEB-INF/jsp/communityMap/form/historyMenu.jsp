<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div id="history-menu-box" class="Add_bookmark">
	<div id="history-depth-1" class="bk_box">
		<h3>대화형통계지도 메뉴</h3>
		<button class="box_close" type="button" onclick="$('#history-menu-box,#history-menu-box>div').removeClass('M_on');">닫기</button>
		<div class="bk_cont">
			<ul id="history-depth-1-menu" class="Depth1_menu">
				<li class="M_on">
					<a href="#" data-id="major" title="${tooltipList.A0001}" data-subj="총조사 주요지표"><img src="${pageContext.request.contextPath}/img/ico/ico_qm01.png" alt="">총조사 주요지표</a>
				</li>
				<li>
					<a href="#" data-id="population" title="${tooltipList.A0102}" data-subj="인구주택총조사"><img src="${pageContext.request.contextPath}/img/ico/ico_qm02.png" alt="">인구주택총조사</a>
				</li>
				<li>
					<a href="#" data-id="3fFish" title="${tooltipList.A0201}" data-subj="농림어업총조사"><img src="${pageContext.request.contextPath}/img/ico/ico_qm03.png" alt="">농림어업총조사</a>
				</li>
				<li>
					<a href="#" data-id="company" title="${tooltipList.A0301}" data-subj="전국사업체조사"><img src="${pageContext.request.contextPath}/img/ico/ico_qm04.png" alt="">전국사업체조사</a>
				</li>
				<li>
					<a href="#" data-id="kosistree" title="${tooltipList.A0401}" data-subj="KOSIS(지역통계)"><img src="${pageContext.request.contextPath}/img/ico/ico_qm06.png" alt="">KOSIS(지역통계)</a>
				</li>
			</ul>
		</div>
	</div>
	<jsp:include page="/view/community/form/layerPopup/historyMenu/major"/>
	<jsp:include page="/view/community/form/layerPopup/historyMenu/population"/>
	<jsp:include page="/view/community/form/layerPopup/historyMenu/3fFish"/>
	<jsp:include page="/view/community/form/layerPopup/historyMenu/company"/>
	<jsp:include page="/view/community/form/layerPopup/historyMenu/kosis"/>
</div>
