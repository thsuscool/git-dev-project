<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div id="history-menu-depth-kosistree" class="bk_box">
	<h3>KOSIS(지역통계) 목록보기</h3>
	<div class="bk_cont" style="height: 500px;">
		<div class="stepBox" style="margin-top:4px;">
			<ul>
				<li>
					<input type="text" class="inp" id="kosisSearchText" placeholder="통계항목 검색" />
					<a href="#" id="kosisSearchButton" class="btn_stepSearch">검색</a>
				</li>
				<li style="height: auto; text-align: right; padding-top: 5px;">
		        	<img src="${pageContext.request.contextPath}/img/ico/kosis_gis_se_sido.png" style="vertical-align: middle;"> : 시도 
		        	<img src="${pageContext.request.contextPath}/img/ico/kosis_gis_se_sgg.png" style="vertical-align: middle;"> : 시군구 
		        	<img src="${pageContext.request.contextPath}/img/ico/kosis_gis_se_adm.png" style="vertical-align: middle;"> : 읍면동 
		        </li>
			</ul>
		</div>
		<div class="stepTreeBox" id="kosis_TreeBox" style="height: 410px;"></div>
		<div class="stepBox xWidth" id="kosis_SearchBox" style="display:none;">
			<div style="text-align: center;">
				<a href="#" class="btnStyle01" onclick="$('#history-menu-depth-kosis').removeClass('M_on');$('#kosis_SearchBox').hide();$('#kosis_TreeBox').show();return false;" style="height: 30px;">KOSIS 목록으로</a>
			</div>
			<p id="kosisSearchCount" class="result"></p>
			<br>
			<ul id="kosisSearchDataList" class="xWidth radioStepOneBox"></ul>
			<div id="kosisTablePage"></div>
		</div>
	</div>
</div>

<div id="history-menu-depth-kosis" class="bk_box">
	<input type="hidden" name="org_id"/>
	<input type="hidden" name="tbl_id"/>
	<input type="hidden" name="field_id"/>
	<input type="hidden" name="obj_var_id"/>
	<input type="hidden" name="title"/>
	<input type="hidden" name="gis_se"/>
	<h3>산업분류목록 선택하기</h3>
	<div class="bk_cont">
		<div class="stepBox">
			<div id="kosisTitle"></div>
			<div id="kosisOrigin" style="margin-top:15px;"></div>
		</div>
		<div class="cm01">
			<div id="kosisDataFieldTable" class="stepBox">
			</div>
		</div>
	</div>
	<div class="cm_make_map_finish"><button class="Finish" type="button">즐겨찾기 생성</button></div>
</div>
