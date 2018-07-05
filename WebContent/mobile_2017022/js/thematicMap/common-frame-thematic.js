/**
 * 새로운 통계주제도에서 공통적으로 쓰는 곳입니다.
 */
(function (W, D) {
	$(document).ready(function(){
		$sgisMobileThematicFrame.getThemeInfo();
	});
	W.$sgisMobileThematicFrame = W.$sgisMobileThematicFrame || {};
	$sgisMobileThematicFrame = {
		mapInfo : null,
		openSetting : function(){
			$(".sqListBox.sq03").stop().animate({"left":"0px"},200);
		},
		closeSetting : function(){
			$(".sqListBox.sq03").stop().animate({"left":"-380px"},200);
		},
		getThemeInfo : function(){
			var sopAbs = new sop.portal.absAPI();
			sopAbs.onBlockUIPopup();
			$.ajax({
				url: contextPath + "/ServiceAPI/thematicMap/GetThemaTest.json",
				type:"GET",
				data: {
					stat_thema_map_id:getParameter("stat_thema_map_id")
				},
				async: false,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						$sgisMobileThematicFrame.mapInfo = res.result.getThemaStatsInfo[0];
					}else{
						messageAlert.open("알림", res.errMsg);
					}
					sopAbs.onBlockUIClose();
				},
				error: function(data){
					sopAbs.onBlockUIClose();
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					return false;
				}
			});
		},
		getThemeBaseYesr : function(thema_map_data_id){
			var sopAbs = new sop.portal.absAPI();
			var result = null;
			sopAbs.onBlockUIPopup();
			$.ajax({
				url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
				type:"GET",
				data: {
					thema_map_data_id:thema_map_data_id
				},
				async: false,
				dataType:"json",
				success: function(res){
					result = res.result.detailInfo;
					sopAbs.onBlockUIClose();
				},
				error: function(data){
					sopAbs.onBlockUIClose();
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
				}
			});
			return result;
		}
	};
}(window, document));