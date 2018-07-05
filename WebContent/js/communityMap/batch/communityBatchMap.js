/**
 * 통계 소통지도 일괄 업로드에서 사용하는 지도 객체
 * 
 * history : (주)유코아시스템, 1.0, 2016/6/9  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$(document).ready(function(){
		$communityBatchMap.event.setUIEvent();
	});
	W.$communityBatchMap = W.$communityBatchMap || {};
	$communityBatchMap = {
		ui:{
			markers:[],//마커
			communityMapInfo:null,//소통지도 정보
			map:null,//지도
			/**
			 * @name             : $communityBatchMap.ui.createMap
			 * @description      : 지도생성
			 * @date             : 2016. 06. 09.
			 * @author	         : 나광흠
			 * @history 	     :
			 */
			createMap : function(){
				this.map = sop.map("map", {
					ollehTileLayer: false,
					scale: false, // 축적 컨트롤
					panControl: false, // 지도이동 컨트롤
					zoomSliderControl: false, //줌 컨트롤
					measureControl: false, // 측정 컨트롤 (면적, 길이)
					attributionControl: false // 지도속성 컨트롤
				});
				this.map.setView([953427, 1950827], 9);
			},
			/**
			 * @name             : $communityBatchMap.ui.preview
			 * @description      : 미리보기
			 * @date             : 2016. 06. 09.
			 * @author	         : 나광흠
			 * @history 	     :
			 */
			preview : function(){
				$("#mapSettingDisp").empty();
				$.each($communityBatchMap.ui.markers,function(cnt,node){
					node.remove();
				});
				$communityBatchMap.ui.markers = [];
				var data = $("#basic_handson").handsontable("getData");
				$.each(data,function(cnt,node){
					if(cnt==0){
						$communityBatchMap.ui.map.setView(sop.utmk(node[4], node[5]), 6, {
							animate : false
						});
					}
					$communityBatchMap.ui.createPoi(node,(data.length-1==cnt));
				});
				$("body").scrollTop(0);
				$("#mapSetting").show();
				$communityBatchMap.ui.map.invalidateSize();
			},
			/**
			 * @name             : $communityBatchMap.ui.createPoi
			 * @description      : poi 생성
			 * @date             : 2016. 06. 09.
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param node       : node
			 * @param last       : 마지막 유무
			 */
			createPoi : function(node,last){
				var html = "",title = node[2],address = node[3],center = [node[4],node[5]],opinion = node[6],symbolIndex = node.slice(7).indexOf("yes");
				if(symbolIndex>-1){
					var symbol = $communityBatchMap.ui.communityMapInfo.custom_symbol_list[symbolIndex];
					html+='<div class="BasicInfo" style="background: #fff;max-width: 280px;box-sizing: border-box;">';
					html+='	<h4 style="font-size: 16px;color: #06c;font-family: \'나눔고딕B\';overflow: initial;margin-bottom: 7px;white-space: initial;text-overflow: initial;">제목: '+title+'</h4>';
					html+='	<ul style="font-size: 12px;margin-bottom: 10px;">';
					html+='		<li style="overflow: initial;white-space: initial;text-overflow: initial;">주소: '+address+'</li>';
					html+='		<li style="overflow: initial;white-space: initial;text-overflow: initial;">의견: '+opinion.replace(/\n/gim, "</br>")+'</li>';
					html+='	</ul>';
					html+='</div>';
					var symbolImg,img = new Image();
					if($communityBatchMap.ui.communityMapInfo.reg_symbol){
						symbolImg = "/img/community/iconset_"+$communityBatchMap.ui.communityMapInfo.reg_symbol+symbol.order+".png";
					}else{
						symbolImg = symbol.path_nm+"/thumbnail/thumbnail-XS-"+symbol.save_file_nm;
					}
					img.onload = function() {
						var iconSize = [this.width,this.height]; 
						if($communityBatchMap.ui.communityMapInfo.reg_symbol===undefined||$communityBatchMap.ui.communityMapInfo.reg_symbol==null){
							iconSize = [23,28];
						}
						var myIcon = sop.icon({
							iconUrl: contextPath+symbolImg,
							iconSize: iconSize
						});
						var marker = sop.marker(center, {icon: myIcon}); //마커 생성시 myIcon 옵션값이용 마커 생성
						marker.addTo($communityBatchMap.ui.map);
						marker.bindInfoWindow(html,{
							minWidth:200,
							maxWidth:200,
							maxHeight:500
						});
						$communityBatchMap.ui.markers.push(marker);
						$("#mapSettingDisp").append($("<li/>",{style:"padding: 3px 5px 3px 5px;"+(last?"":"border-bottom: solid #ddd 1px;")}).append($("<a/>",{href:"#",text:title}).click(function(){
							$communityBatchMap.ui.map.setView(center, $communityBatchMap.ui.map.getZoom(), {
								animate : false
							});
							setTimeout(function(){
								marker.openInfoWindow();
							},100);
							return false;
						})));
					}
					img.src = contextPath+symbolImg;
				}
			}
		}
	};
	$communityBatchMap.event = {	
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 6. 9. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			$communityBatchMap.ui.createMap();
		}
	};
}(window, document));
