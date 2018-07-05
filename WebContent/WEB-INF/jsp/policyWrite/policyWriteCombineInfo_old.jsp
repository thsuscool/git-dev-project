<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="policy-info" class="DataBox FR_info Make_map DataBoxScroll" style="display:none;">
	<div id="policy-show">
		<h4><label for="policy-info-title">제목</label></h4>
		<div id="policy-info-title" style="background: #f4f4f4;border: #ddd solid 1px;font-size: 14px;color: #555;width: 350px;padding: 4px;box-sizing: border-box;margin-bottom: 15px;"></div>
	
		<h4><label for="policy-info-content">내용</label></h4>
		<div id="policy-info-content" style="background: #f4f4f4;border: #ddd solid 1px;font-size: 14px;color: #555;width: 350px;padding: 4px;box-sizing: border-box;margin-bottom: 15px;min-height:150px;"></div>
	
		<h4><label for="policy-info-url">URL</label></h4>
		<div id="policy-info-url" style="background: #f4f4f4;border: #ddd solid 1px;font-size: 14px;color: #555;width: 350px;padding: 4px;box-sizing: border-box;margin-bottom: 15px;"></div>
	
		<h4><label for="policy-info-community-list">지역현안 소통지도</label> <span class="Help">도움말</span></h4>
		<ul id="policy-info-community-list" class="CommunityList" style="width: 350px;"></ul>
		<div class="Btn_Group">
			<button id="btn-update" type="button">수정</button>
			<button id="btn-delete" type="button" style="background:#999;">삭제</button>
		</div>
	</div>
	<div id="policy-update" style="display: none;">
		<div>
			<h4><label for="policy-title-update">제목</label> <span id="policy-title-update_length" class="Count">(<span>0</span>/40자)</span></h4>
			<input id="policy-title-update" class="makemap_title" type="text" style="width: 350px;padding: 4px;box-sizing: border-box;margin-bottom: 15px;">
	
			<h4><label for="policy-content-update">내용</label> <span id="policy-content-update_length" class="Count">(<span>0</span>/1000자)</span></h4>
			<textarea id="policy-content-update" class="makemap_title" style="resize: none; width: 350px;padding: 4px;box-sizing: border-box;margin-bottom: 15px;"></textarea>
	
			<h4><label for="policy-url-update">URL</label> <span id="policy-url-update_length" class="Count">(<span>0</span>/100자)</span> <span class="Help">도움말</span></h4>
			<input id="policy-url-update" class="makemap_title" type="text"  style="width: 350px;padding: 4px;box-sizing: border-box;margin-bottom: 15px;">
	
			<h4>지역현안 소통지도 <span class="Help">도움말</span></h4>
			<ul id="community-list-update" class="CommunityList"  style="width: 350px;padding: 4px;box-sizing: border-box;margin-bottom: 15px;"></ul>
		</div>
		<div class="Btn_Group">
			<button id="btn-submit-update" type="button">수정 완료</button>
			<button id="btn-cancel-update" type="button" style="background:#999;">취소</button>
		</div>
	</div>
</div>
