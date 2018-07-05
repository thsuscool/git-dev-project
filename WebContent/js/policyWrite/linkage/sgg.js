/**
 * 전국 시군구 경계 관련
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2017/02/23  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$sgg = W.$sgg || {};
	$sgg = {
		setPreBound : function(map,callback){
			map.multiLayerControl.clear();
			map.isNoReverseGeocode = false;
			map.isFixedBound = false;
			map.selectedBoundList = [];
			map.selectedBoundMode = null;
			if(map.curPolygonCode==1){
				map.setZoom(2);
				var preBoundaryCallback = map.boundaryCallback;
				map.boundaryCallback = function(){
					map.isNoReverseGeocode = true;
					map.isFixedBound = true;
					map.selectedBoundList = [];
					map.selectedBoundMode = "multi";
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetSidoCodeList.json",
						async : true,
						success: function(res) {
							if (res.errCd == "0") {
								$.each(res.result.sidoCodeList,function(cnt,node){
									map.selectedBoundList.push({
										feature:{
											properties:{adm_cd:node.sido_cd}
										}
									});
								});
								if(typeof callback === "function"){
									map.boundaryCallback = preBoundaryCallback;
									callback();
								}
							}
						},									 
						dataType: "json"
					});
				} 
			}else{
				if(typeof callback === "function"){
					callback();
				}
			}
		}
	};
}(window, document));

