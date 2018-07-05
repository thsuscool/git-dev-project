/**
 * 정책지도 작성 INDEX 페이지에 대한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2016/12/01  초기 작성
 * author : 송종대
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyWriteMapIndex = W.$policyWriteMapIndex || {};
	$(document).ready(function() {
		$policyWriteMapIndex.event.setUIEvent();
	});
	$policyWriteMapIndex.event = {
			setUIEvent : function() {
				
				//index 닫기 -> 작성 취소
				$("#close_pw_index").click(function() {
					location.href = "/view/map/policyStaticMap";
				});
				
				//data poi (버퍼설정)
				$("#index-buffer").click(function() {
					$interactiveMap.ui.curMenuType = "dataPoi";
					$(".New_layer").removeClass("M_on");
					$(".btn_fuse_operation").addClass("off").off();
					var map = $interactiveMap.ui.mapList[1];
					$("#legend_"+map.legend.id).hide();
				});
				
				//data data (연산형)
				$("#index-combine").click(function() {
					$interactiveMap.ui.curMenuType = "dataData";
					$(".New_layer").removeClass("M_on");
					$(".btn_fuse_buffer").addClass("off").off();
					var map = $interactiveMap.ui.mapList[1];
					$("#legendColor_"+map.legend.id+" a:eq(4)").trigger("click");
				});
				
			}
			
	};
	
	
}(window, document));