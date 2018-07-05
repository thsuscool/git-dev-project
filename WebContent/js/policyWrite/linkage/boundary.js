/**
 * 전국 강제 경계 변경 관련
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2017/02/23  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$boundary = W.$boundary || {};
	$boundary = {
		setPreBound : function(map,admList,callback){
			map.multiLayerControl.clear();
			map.isNoReverseGeocode = false;
			map.isFixedBound = false;
			map.selectedBoundList = [];
			map.selectedBoundMode = null;
			if(admList!=undefined&&admList!=null&&typeof admList === "object"&&admList.length>0){
				map.isNoReverseGeocode = true;
				map.isFixedBound = true;
				map.selectedBoundList = [];
				map.selectedBoundMode = "multi";
				$.each(admList,function(cnt,node){
					map.selectedBoundList.push({
						feature:{
							properties:{adm_cd:node}
						}
					});
				});
				if(typeof callback === "function"){
					map.boundaryCallback = preBoundaryCallback;
					callback();
				}
			}else{
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
					};
				}else{
					if(typeof callback === "function"){
						callback();
					}
				}
			}
		},
		setSelectBoundaryList : function(map,admList,center,zoom,callback){
			map.multiLayerControl.clear();
			map.isNoReverseGeocode = false;
			map.isFixedBound = false;
			map.selectedBoundList = [];
			map.selectedBoundMode = null;
			map.clearDataOverlay();
			setTimeout(function(){
				map.mapMove(center,zoom,false);
			},500);
			var preBoundaryCallback = map.boundaryCallback;
			map.boundaryCallback = function(){
				if(typeof admList === "object"){
					map.isNoReverseGeocode = true;
					map.isFixedBound = true;
					map.selectedBoundList = [];
					$.each(admList,function(){
						map.selectedBoundList.push({
							feature:{
								properties:{adm_cd:this.toString()}
							}
						});
					});
					map.selectedBoundMode = "multi";
					if(typeof callback === "function"){
						map.boundaryCallback = preBoundaryCallback;
						callback();
					}
				}else if(admList === undefined||admList === null){
					map.boundaryCallback = function(){
						map.boundaryCallback = preBoundaryCallback;
						$boundary.setPreBound(map,null,function(){
							if(typeof callback === "function"){
								callback();
							}
						});
					};
				}else{
					if(typeof callback === "function"){
						map.boundaryCallback = preBoundaryCallback;
						callback();
					}
				}
			}; 
		}
	};
}(window, document));

