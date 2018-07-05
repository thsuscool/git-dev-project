/**
 * 
 */
(function (W, D) {
	W.$thematicMapMain = W.$thematicMapMain || {};
	
	$(document).ready(function () {
		// thematicMap.html 파라미터 갖고오기
		//stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type & title = ""
		$thematicMapMain.param = getAllParameter();
		if ($thematicMapMain.param.stat_thema_map_id) {
			// StatthemamappLists 조회
			$thematicMapMain.request.getStatsThemeMapList($thematicMapMain.param, null, "normal"); // map
		}else if ($thematicMapMain.param.id) {
			$thematicMapMain.bookmarkId = $thematicMapMain.param.id;
		}
		
		var widthSize = $(window).width();
		if (widthSize > 1260) {
			var value = parseInt(widthSize / 2 - 500);
			if (value < 0) {
				value = 0;
			}
			
			$("#mapNavi2").css("margin-left", value);
			
		}else{
			$("#mapNavi2").css("margin-left", '100px');
		}
		
		// map size
		var mapheight = $("body").height();
		var headheight = $("header").height();
		
		$(".map_dummy").css("height", mapheight-104 + "px");
		$("#header").css("margin-bottom", "0px");
		
		$(window).resize(function () {
			var widthSize = $(window).width();
			var heightSize = $(window).height();
			if (widthSize > 1260) {
				var value = parseInt(widthSize / 2 - 500);
				if (value < 0) {
					value = 0;
				}
				
				$("#mapNavi2").css("margin-left", value);
				
			}else{
				$("#mapNavi2").css("margin-left", '100px');
			}
			$(".map_dummy").css("height", heightSize-104 + "px");
		});	
	});
	
	$thematicMapMain.ui = {
			mainParams : null,
			
			/**
			 * 
			 * @name         : doAnalysisShareInfo
			 * @description  : 공유된 정보를 분석하여, 통계정보를 조회한다.
			 * @date         : 2015. 11. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param key    : 공유ID
			 */
			doAnalysisShareInfo : function (type, data) {
				if (data.param_info) {
					data["param_info"] = JSON.parse(data.param_info);
					$thematicMapMain.data = data;
					$thematicMapMain.request.getStatsThemeMapList(data.param_info.paramInfo, null, "bookmark"); // map
				}
			}
	};
	
	$thematicMapMain.request = {
		getStatsThemeMapList : function (paramObj, searchParam, type) {
			var requestParam = {
				stat_thema_map_id : paramObj.stat_thema_map_id
			};
			$thematicMapMain.param = paramObj;
			$thematicMapMain.param["type"] = type;
			$statsPotal.api.thematicMap.getStatsThemeMapListByThematicId({
				param : requestParam,
				method : 'POST',
				success : $thematicMapMain.response.successStatsThemeMapList
			});
		}
	};
	$thematicMapMain.response = {
		successStatsThemeMapList : function (status, res) {
			if (res.errCd === 0) {
				var themaInfo = res.result.themeMapInfoList;
				$thematicMapMain.themaInfo = themaInfo;
			
				// Frame URL 설정
				if ($thematicMapMain.param.mapType == '01') { 
					// 테마 주제도
//					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame03" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id);
				}else if ($thematicMapMain.param.mapType == '02') {
					//1인가구 증가
					// 하기 조건절에 배열로 오는 이유를 모르겠음
//					if($thematicMapMain.param.stat_thema_map_id=="tpJ7rCwppD20141030095222504MzKtvExLrF"){
//						$("#themeticFrame").attr("src", "/view/thematicMap/others/singleFamily/singleFamily" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id);
//					}
					//예전 주제도 형식//&theme='+themeListObj[i].category+'&stat_thema_map_id='+themeListObj[i].stat_thema_map_id
//					$("#themeticFrame").attr("src", $thematicMapMain.param.stat_thema_map_file_url+"?stat_thema_map_id="+$thematicMapMain.param.stat_thema_map_id+"&theme="+$thematicMapMain.param.theme+"&mapType="+$thematicMapMain.param.mapType);
				}else if ($thematicMapMain.param.mapType == '03') {
					// 색상형
					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame03" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
				}else if ($thematicMapMain.param.mapType == '04') {
					// 증감형
					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame04" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
				}else if ($thematicMapMain.param.mapType == '05') {
					// 시계열형
					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame05" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
				}else if ($thematicMapMain.param.mapType == '06') {
					// 분할형
					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame06" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
				} else if ($thematicMapMain.param.mapType == '07') {
					// 분할형
					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame07" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
				}
				
			}
		}
	};
	
	/* window console.log 문제해결 */
	if (!window.console) {
		console = {
			log : function () {
			}
		};
	}
}(window, document));

function getSession(auth) {
	var timer = setInterval(function() {
		if ($("#themeticFrame").get(0).contentWindow.AuthInfo) {
			console.log($("#themeticFrame").get(0).contentWindow.AuthInfo);
			$("#themeticFrame").get(0).contentWindow.AuthInfo.authStatus = auth.authStatus;
			clearInterval(timer);
		}
	},200);
};
