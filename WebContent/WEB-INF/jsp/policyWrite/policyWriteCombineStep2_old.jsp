<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="step2" class="FR_Data" style="display:none;">
	<div class="DataBox Make_map">
		<h4><label for="policy-title">제목</label> <span id="policy-title_length" class="Count">(<span>0</span>/40자)</span></h4>
		<input id="policy-title" class="makemap_title" type="text">

		<h4><label for="policy-content">내용</label> <span id="policy-content_length" class="Count">(<span>0</span>/1000자)</span></h4>
		<textarea id="policy-content" class="makemap_title" style="resize: none;"></textarea>

		<h4><label for="policy-url">URL</label> <span id="policy-url_length" class="Count">(<span>0</span>/100자)</span> <span class="Help">도움말</span></h4>
		<input id="policy-url" class="makemap_title" type="text">

		<h4>지역현안 소통지도 <span class="Help">도움말</span></h4>
		<ul id="community-list" class="CommunityList"></ul>
	</div>
	<div class="Btn_Group">
		<button id="btn-cancel" type="button" style="background:#999;">취소</button>
		<button id="btn-done" type="button">작성완료</button>
	</div>
</div>