<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>통계 | 통계청SGIS 오픈플랫폼</title>
<link rel="stylesheet" href="/css/common.css"/>
<link rel="stylesheet" href="/css/default.css"/>
<script src="/js/plugins/jquery.min.js"></script>
<script src="/js/plugins/durian-v2.0.js"></script>
<script src="/js/common/sop.portal.absAPI.js"></script>
<script src="/js/common/common.js"></script>
<script src="/js/communityMap/communityCommon.js"></script>
<script src="/js/plugins/highcharts/highcharts.js"></script>
<script src="/js/plugins/highcharts/highcharts-more.js"></script>
<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script>
(function(W, D) {
	$(document).ready(function(){
		$communityMapStat.search($("#poi-stat-region-box select[name=region]").val());
		$("#poi-stat-search-form").submit(function(){
			$communityMapStat.search();
			return false;
		});
		$("input[name=stat_type]:radio").change(function(){
			$("#poi-stat-region-box,#poi-stat-icon-box").hide();
			$("#poi-stat-"+$(this).val()+"-box").show();
		});
	});
	W.$communityMapStat = W.$communityMapStat || {};
	$communityMapStat = {
		search: function(){
			var stat_type = $("input[name=stat_type]:checked").val();
			var parameters = {
				cmmnty_map_id:$communityMapCommon.getParameter("cmmnty_map_id"),
				stat_type:stat_type,
				bnd_year:bndYear
			};
			function val(value){
				if(value==undefined||value.replace(/ /gi,"")==""){
					return undefined;
				}else{
					return value;
				}
			}
			if(stat_type=="region"){
				parameters.adm_cd = val($("#poi-stat-region-box select[name=region]").val());
				parameters.search_usr_id = val($("#poi-stat-region-box select[name=search_usr_id]").val());
			}else if(stat_type=="icon"){
				parameters.icon = val($("#poi-stat-icon-box select[name=icon]").val());
			}else{
				return false;
			}
			parameters.search_usr_id = val($("#poi-stat-"+stat_type+"-box select[name=search_usr_id]").val());
			$.ajax({
				type: "POST",
				url: contextPath+"/ServiceAPI/community/communityPoiStats.json",
				data:parameters,
				dataType: "json",
				async : true,
				success: function(res) {
					if(res.errCd=="0"){
						var data = [];
						$.each(res.result.stats,function(cnt,node){
							data.push([node.label_nm,node.cnt]);
						});
						if($("#poi-stat-chart").highcharts()){
							$("#poi-stat-chart").highcharts().destroy();
						}
						$("#poi-stat-chart").highcharts({
						    chart: {
						        type: "column"
						    },
						    title: {
						        text: ""
						    },
						    subtitle: {
						        text: ""
						    },
						    xAxis: {
						        type: "category"
						    },
						    yAxis: {
						        title: ""
						    },
						    legend: {
						        enabled: false
						    },
						    tooltip: {
						        pointFormat: '{point.y} 개'
						    },
						    series: [{
						        data: data,
						        pointWidth: 50
						    }]
						});
					}
				},
				error: function(xhr, status, errorThrown) {
					$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.");
				}
			});
		}
	};
}(window, document));
</script>
</head>
<body style="background: none;">
	<form id="poi-stat-search-form">
		<div>
			<label><input type="radio" name="stat_type" value="region" checked="checked"> 지역별</label>
			<label><input type="radio" name="stat_type" value="icon"> 아이콘별</label>
		</div>
		<c:set var="hasCountry" value="false"/>
		<c:set var="selectOption">
			<c:forEach items="${communityMapInfo.addAreaList }" var="area">
				<c:if test="${fn:trim(area.adm_cd)==''||fn:startsWith(area.adm_cd,'00') }">
					<c:set var="hasCountry" value="true"/>
				</c:if>
				<option value="${area.adm_cd }">${area.adm_nm }</option>
			</c:forEach>
		</c:set>
		<c:set var="regist_member_select">
			<c:if test="${communityMapInfo.usr_id == member_id }">
				의견 등록 아이디 : <select name="search_usr_id">
				<option value="">전체</option>
				<c:forEach items="${regist_member_id_list }" var="usr_id">
					<option value="${usr_id }">${usr_id }</option>
				</c:forEach>
				</select>
			</c:if>
		</c:set>
		<div id="poi-stat-region-box">
			지역 : <select name="region">
				<c:if test="${!hasCountry }"><option value="">전국</option></c:if>
				${selectOption }
			</select>
			${regist_member_select }
		</div>
		<div id="poi-stat-icon-box" style="display:none;">
			아이콘 : <select name="icon">
				<option value="">전체</option>
				<c:forEach items="${communityMapInfo.custom_symbol_list }" var="symbol">
					<option value="${fn:trim(communityMapInfo.reg_symbol)==''?symbol.custom_symbol_id:symbol.order }">${symbol.label_nm}</option>
				</c:forEach>
			</select>
			${regist_member_select }
		</div>
		<button type="submit">검색</button>
	</form>
	<div id="poi-stat-chart"></div>
</body>
</html>