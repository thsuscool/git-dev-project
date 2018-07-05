(function(W, D) {
	W.$communityRegistDetail = W.$communityRegistDetail || {};
	$sgis.ready(function(){
		$communityRegistResult.mapMarksLists();
		$("body").on("click",".poi-move-detail-button a",function(){
			var mapCenter=$interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].gMap.getCenter();
			var backCenter = "&center="+(encodeURIComponent(mapCenter.x+","+mapCenter.y));
			location.href = $(this).attr("href")+backCenter;
			return false;
		});
		$("body").on("click","#poi-image-navigator button",function(){
			$("#poi-image-box img").hide();
			$("#poi-image-box img:eq("+$(this).index()+")").show();
			$("#poi-image-navigator button").css({"background-color":"#ddd"});
			$(this).css({"background-color":"#aaa"});
			return false;
		});
	});
	$communityRegistResult = {
		markers:[],
		markersObject:null,
		mapMarksLists: function() {	
			var sopPortalNoticeObj = new sop.portal.mapMarksLists.api();			
			sopPortalNoticeObj.addParam("cmmnty_map_id", getParameter("cmmnty_map_id"));
			sopPortalNoticeObj.addParam("type", "markers");
			sopPortalNoticeObj.request({
				method: "POST",
				async: false,
				url: contextPath + "/ServiceAPI/community/communityPoiList.json"
			});
		}
	};
	/*********** 마커 리스트 시작  **********/	
	(function() {
		$class("sop.portal.mapMarksLists.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {		
				$communityRegistResult.markersObject = {};
				$communityRegistResult.markers = [];
				if (res.errCd == "0") {
					var result = res.result;
					if (result.summaryList.length > 0) {
						$.each(result.summaryList,function(cnt,node){
							var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;">';
							html += '	<tbody>';
							html += '		<tr>';
							html += '			<th style="word-break:break-all;width:30%;color: #3792de;font-size:14px;"><div style="width:200px; overflow:hidden;white-space:nowrap; text-overflow:ellipsis;  "><strong>' + node.title + '</strong></div></th>';
							html += '		</tr>';
							html += '		<tr>';
							html += '			<td style="word-break:break-all;white-space: nowrap;width:50px;font-size:11px;color: #555;">작성자 : '+node.usr_id+'</td>';
							html += '		</tr>';
							html += '		<tr>';
							html += '			<td style="word-break:break-all;white-space: nowrap;width:50px;font-size:11px;color: #555;">작성일 : '+node.reg_date+'</td>';
							html += '		</tr>';
							if(node.fileList&&node.fileList.length>0){
								var navigator = "";
								html += '<tr>';
								html += '	<td id="poi-image-box" style="word-break:break-all;white-space: nowrap;width:50px;font-size:12px;margin-bottom: 7px;">';
								$.each(node.fileList,function(imgCnt,imgNode){
									html += '<img src="'+imgNode.path_nm+imgNode.save_file_nm+'" alt="" style="max-width: 200px !important;'+(imgCnt==0?'':'display:none;')+'"/>';
									navigator+='<button style="border-radius: 50%;width: 15px;height: 15px;margin: 0 10px;border:none;background-color: #'+(imgCnt==0?'aaa':'ddd')+';"></button>';
								});
								html += '	</td>';
								html += '</tr>';
								if(node.fileList.length>1){
									html+='<tr id="poi-image-navigator" class="navigator" style="width: 100%;top: auto;bottom: 73px;text-align:center;"><td style="padding-top: 6px;">'+navigator+'</td></tr>';
								}
							}
							html += '	</tbody>';
							html += '	<tfoot>';
							html += '		<tr>';
							html += '			<td class="poi-move-detail-button" style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;margin-bottom: 7px;text-align: center">';
							html += '				<a href="'+contextPath+'/mobile/html/community/mapPrtcpntRegistDetail.html?cmmnty_map_id='+getParameter("cmmnty_map_id")+'&cmmnty_poi_id='+node.cmmnty_poi_id+'" style="font-size: 12px;color: #fff;font-family: \'나눔고딕B\';background: #3366cc;width: 100%;height: 26px;margin: 0;float: left;border: none;border-radius: 15px;padding-top:5px;">상세보기</a>';
							html += '			</td>';
							html += '		</tr>';
							html += '	</tfoot>';
							html += '</table>';
							var img = new Image();
							var symbol;
							if(node.reg_symbol){
								symbol = '/img/community/iconset_'+node.reg_symbol+node.symbol+'.png';
							}else{
								symbol = node.symbol_path;
							}
							img.onload = function() {
								var iconSize = [this.width,this.height]; 
								if(node.reg_symbol==undefined||node.reg_symbol==null){
									iconSize = [23,28];
								}
								var myIcon = sop.icon({
									iconUrl: contextPath+symbol,
									iconSize: iconSize
								});
								var marker = sop.marker([node.x_loc, node.y_loc], {icon: myIcon}); //마커 생성시 myIcon 옵션값이용 마커 생성
								marker.addTo($interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].gMap); //마커를 map 추가
							    marker.bindInfoWindow(html);
							    marker.on('click', function(e) {
							    	if($(".sideQuick.sq03").hasClass("on")){
										$(".sideQuick.sq03").next(".sqListBox").stop().animate({"left":"-293px"},200,function(){
											$(".sideQuick.sq03").next(".sqListBox").css("z-index","0");
											$(".sideQuick.sq03").removeClass("on");
										});
									}
								});
							    $communityRegistResult.markers.push(marker);
							    $communityRegistResult.markersObject[node.cmmnty_poi_id] = marker;
							}
							img.src = contextPath+symbol;
						});
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 마커 리스트 끝  **********/	
}(window, document));