/**
 * mydata 지도 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/03  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 *
 */

(function(W, D){
	
W.$myViewMap = W.$myViewMap || {};
	
	$(document).ready(function() {
		
	});
	
	$myViewMap = {
			map : null,
			dataVisualSetting : null,
			rowHeaderArray : new Array(),
			rowDataArray : new Array(),
			wasGioCalc : false,
			dispData : new Array(),
			tooltipSetting : new Array(),
			marker : new Array(),
			tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
			fileType : null,
			
			hideMap : function(){
				if($myViewMap.fileType == "kml"){
					$("#mapSetting").hide();
					$myViewMap.map.remove();
					$myViewMap.fileType = null;
				}else{
					$("#mapSetting").hide();
					$myViewMap.map.gMap.remove();
				}
			},
			
			 /* 
			  @name         : popMapGisSetting
			  @description  : 지도표출 설정시 팝업창을 띄움과 동시에 맵과 마커를 생성 한다.
			  @date         : 2015. 11. 10. 
			  @author	     : 최재영
			  @history 	 :*/
			popMapGisSetting : function(){
				$myViewMap.createRowObjData();
				$("#mapSetting").show();
				$myViewMap.createMap("mapRgn_1", 0);
				
				$myViewMap.map.gMap.whenReady(function() {
					var radio1Index = 0;
					for(var i =0; i < $myViewMap.dispData.length;i++){
						if($myViewMap.dispData[i] == true){
							radio1Index = i;
						}
					}
					var checkList = new Array();
					for(var i =0; i < $myViewMap.tooltipSetting.length; i++){
						if($myViewMap.tooltipSetting[i] == true){
							checkList.push(i);
						}
					}
					
					var markerIcon = sop.icon({
						iconUrl: '/js/plugins/jquery-easyui-1.4/images/marker-icon.png',
						shadowUrl: '/js/plugins/jquery-easyui-1.4/images/marker-shadow.png',
						iconAnchor: [12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					
					
					if($myViewMap.rowDataArray.length >= 1){
						for (var i = 0; i< $myViewMap.marker.length; i++) {
							var marker = $myViewMap.marker[i];
							marker.remove();
						}
						//열지도 삭제
						if($myViewMap.map.heatMap){
							$myViewMap.map.heatMap.setUTMKs([]);
						}
						
						
						if($myViewMap.dataVisualSetting=="location"){
							for (var i = 0; i< $myViewMap.marker.length; i++) {
								var marker = $myViewMap.marker[i];
								marker.remove();
							}
						
							for(var i=0;i<$myViewMap.rowDataArray.length;i++){
								var marker = sop.marker([$myViewMap.rowDataArray[i].GEO_X,$myViewMap.rowDataArray[i].GEO_Y],{
									icon:markerIcon
								});
								
								var html ="";
								html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
								html += 	'<tr>';
								/*html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + $myViewMap.rowDataArray[i].SEQ+"."+getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[radio1Index]); + '</strong></th>';*/
								html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + $myViewMap.rowHeaderArray[radio1Index].COL_NM+":"+getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[radio1Index]); + '</strong></th>';
								html += 		'<td></td>';
								html += 	'</tr>';
								html += 	'<tr>';
								
								html += 		'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;text-align:left;">&nbsp;';
								
								for(var x = 0; x<checkList.length; x++){
									if(x != 0){
										html +="<br>";
									}
									
									var dataText = getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[checkList[x]]);
									
									if(dataText.length>20){
										dataText = dataText.substr(0,22) + "<br />" + dataText.substr(22);
									}
									
									html  +=$myViewMap.rowHeaderArray[checkList[x]].COL_NM+":"+ dataText ;
								}
								html+= '</th>';
								html += 		'<td></td>';
								html += 	'</tr>';
								html += '</table>';
							
								marker.bindInfoWindow(html);
								marker.addTo($myViewMap.map.gMap);
								$myViewMap.marker.push(marker);
							}

						}else if($myViewMap.dataVisualSetting=="ratio"){
							for(var i=0;i<$myViewMap.rowDataArray.length;i++){
								$myViewMap.map.addHeatMap($myViewMap.rowDataArray[i].GEO_X, $myViewMap.rowDataArray[i].GEO_Y, 1000);
							}

						}else if($myViewMap.dataVisualSetting=="colorFull" ||$myViewMap.dataVisualSetting=="bubble" ){
							var resultList = new Array();
							var result = new Array();
							var resultArray = new Array();
						
							for(var i = 0 ; i < $myViewMap.rowDataArray.length;i++){
								var resultRow = new Array();
								if($myViewMap.tot_type !="4"){
									resultRow["adm_cd"] = $myViewMap.rowDataArray[i].ADM_CD;
								}else{
									resultRow["adm_cd"] = $myViewMap.rowDataArray[i].TOT_REG_CD;
								}
								
								
								
								resultRow["data"] = getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[radio1Index]);
								resultArray[i] = resultRow;
							}
							
							$myViewMap.map.selectedBoundList = [];
							
							for(var i = 0; i < resultArray.length; i ++){
								resultObject = new Array();
								
								if(i == 0){
									resultObject["id"] = "API_MYDATA"
									resultObject["result"] = new Array();
									resultObject["result"].push(resultArray[i]);
									if($myViewMap.tot_type =="1"){
										resultObject["pAdmCd"] = "00";
										resultList["00"] = resultObject;
									}else if($myViewMap.tot_type =="2"){
										resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
										resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
									}else if($myViewMap.tot_type =="3"){
										resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
										resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
									}else if($myViewMap.tot_type =="4"){
										resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
										resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;	
									}
									$myViewMap.map.selectedBoundList.push(resultObject);
									
								}else if(resultList["00"] != undefined){
									resultList["00"].result.push(resultArray[i]);
								}else if(resultList[resultArray[i].adm_cd.substring(0,2)] !=undefined ){
									resultList[resultArray[i].adm_cd.substring(0,2)].result.push(resultArray[i]);
								}else if(resultList[resultArray[i].adm_cd.substring(0,5)] != undefined){
									resultList[resultArray[i].adm_cd.substring(0,5)].result.push(resultArray[i]);
								}else if(resultList[resultArray[i].adm_cd.substring(0,7)] != undefined){
									resultList[resultArray[i].adm_cd.substring(0,7)].result.push(resultArray[i]);
								}else{
										resultObject["id"] = "API_MYDATA"
										resultObject["result"] = new Array();
										resultObject["result"].push(resultArray[i]);
										if($myViewMap.tot_type =="1"){
											resultObject["pAdmCd"] = "00";
											resultList["00"] = resultObject;
										}else if($myViewMap.tot_type =="2"){
											resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
											resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
										}else if($myViewMap.tot_type =="3"){
											resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
											resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
										}else if($myViewMap.tot_type =="4"){
											resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
											resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
										}
										$myViewMap.map.selectedBoundList.push(resultObject);
								}
							}
							
							for(var i in resultList){
								if(i != "isEmpty"){
									
									switch(resultList[i].pAdmCd.length) {
										case 2:
											if(resultList[i].pAdmCd =="00"){
												$myViewMap.map.curPolygonCode = 1;
											}else{
												$myViewMap.map.curPolygonCode = 2;
											}
											break;
										case 5:
											$myViewMap.map.curPolygonCode = 3;
											break;
										case 7:
											$myViewMap.map.curPolygonCode = 4;
											break;
									}
									
									var options = {
										params : {
											filter : "data",
											unit: "",
											adm_cd : resultList[i].pAdmCd
										}	
									};
									if($myViewMap.dataVisualSetting !="colorFull"){
										$myViewMap.map.legend.selectType = "bubble";
									}
									$myViewMap.map.multiLayerControl.setStatsData("normal", resultList[i], options, false);	
								}	
							}
						}
					}
				});
				
			},
			
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			createMap : function(id, seq) {
				$myViewMap.map = new sMap.map();
				if($myViewMap.rowDataArray.length >= 1){
					$myViewMap.map.createMap($myViewMap, id, {
						center : [ $myViewMap.rowDataArray[0].GEO_X, $myViewMap.rowDataArray[0].GEO_Y ],
						zoom : 8, //9->8
						measureControl : false,
						statisticTileLayer: true
					});
				}else{
					$myViewMap.map.createMap($myViewMap, id, {
						center : [ 989674, 1818313 ],
						zoom : 8, //9->8
						measureControl : false,
						statisticTileLayer: true
					});
				}
				$myViewMap.map.createHeatMap();
				$myViewMap.map.id = seq;
				var legend = new sLegendInfo.legendInfo($myViewMap.map);
				legend.initialize($myViewMap);
				$myViewMap.map.legend = legend;
				$myViewMap.map.legend.legendColor = ["#CCCCCC","#C5BAC0","#BFA9B5","#B998AA","#B3879E","#AD7693","#A76588","#A1547C","#9B4371","#953266"];
				
				//버블 그리기 재정의
				$myViewMap.map.legend.drawBubbleMap = function(geojson){
					var searchYear = "";
		    		var delegate = $myViewMap.map.delegate.ui;
		    		if (delegate != undefined && delegate.curDropParams != undefined && delegate.curDropParams[$myViewMap.map.id] != undefined) {
						for(var i = 0; i < delegate.curDropParams[$myViewMap.map.id].param.length; i ++) {
							if (delegate.curDropParams[$myViewMap.map.id].param[i].key == "year") {
								searchYear = delegate.curDropParams[$myViewMap.map.id].param[i].value + "년 ";
							}
						}	
					}
		    		
		    		geojson.eachLayer(function(layer) {
			    		var info = null;
			    		var data = null;
			    		var unit = null;
			    		var color = layer.options.fillColor;
			    		var idx = 0;
			    		var x = layer.feature.properties.x;
			    		var y = layer.feature.properties.y;
			    		
			    		var adm_nm = layer.feature.properties.adm_nm;
			    		if (layer.feature.info.length > 0) {		
			    			
			    			var radioIndex;
							var checkList = new Array();
			    			for(var i =0; i < $myViewMap.dispData.length;i++){
								if($myViewMap.dispData[i] == true){
									radioIndex = i;
								}
								
							}
							for(var i =0; i < $myViewMap.tooltipSetting.length; i++){
								if($myViewMap.tooltipSetting[i] == true){
									checkList.push(i);
								}
							}
							
							var sMessage = "";
							for(var i = 0; i<$myViewMap.rowDataArray.length;i++){
								if($myViewMap.tot_type != "4"){
			    					if($myViewMap.rowDataArray[i].ADM_CD == layer.feature.properties.adm_cd){
			    						for(var j = 0; j<checkList.length; j++){
			    							sMessage +="<tr style='font-size:12px;padding-left:5px;'>";
			    							sMessage +="<td>";
			    							sMessage +=$myViewMap.rowHeaderArray[checkList[j]].COL_NM;
			    							sMessage +=":";
			    							sMessage +=getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[checkList[j]]);
			    							sMessage +="</td>";
			    							sMessage +="</tr>";
			    						}
			    					}
			    				}else{
			    					if($myViewMap.rowDataArray[i].TOT_REG_CD == layer.feature.properties.adm_cd){
			    						for(var j = 0; j<checkList.length; j++){
			    							sMessage +="<tr style='font-size:12px;padding-left:5px;'>";
			    							sMessage +="<td>";
			    							sMessage +=$myViewMap.rowHeaderArray[checkList[j]].COL_NM;
			    							sMessage +=":";
			    							sMessage +=getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[checkList[j]]);
			    							sMessage +="</td>";
			    							sMessage +="</tr>";
			    						}
			    					}
			    				}
							}
							
			    			
			    				info = layer.feature.info[0];
				    			data = info[info.showData];
					    		unit = info.unit;
					    		
					    		var toolTip  = "<table style='margin:10px;'>";
					    		toolTip +=sMessage;
				    			toolTip += "</table>";
			    			
				    		for (var i=0; i<$myViewMap.map.legend.legendColor.length; i++) {
				    			if (color == $myViewMap.map.legend.legendColor[i]) {
				    				idx = i;
				    				break;
				    			}
				    		}
				    			
				    		var marker = $myViewMap.map.addCircleMarker(x, y, {
				    			radius : $myViewMap.map.legend.legendCircleRadius[idx],
				    			fillColor : color,
				    			weight : 2,
				    			tooltipMsg : toolTip 
				    		});
				    		$myViewMap.map.legend.circleMarkerGroup.push(marker);
			    		}
			    	});	 
				}
			},
	
			createRowObjData : function(){
			
				for(var i =0;i<$myViewMap.rowDataArray.length;i++){
					
					var userData = $.parseJSON($myViewMap.rowDataArray[i].USR_DATA);
					var rowObjList = new Array();
					
					$myViewMap.rowDataArray[i].USR_DATA = new Array();
					var j = 0;
					$.each(userData,function(key,value){
						var userObj = new Object();
						userObj[key] = value;
						rowObjList[j] = userObj;
						j++;
					});
					
					$myViewMap.rowDataArray[i].USR_DATA = rowObjList;
					$myViewMap.rowDataArray[i].ADM_CD =$myViewMap.rowDataArray[i].ADM_CD.trim();
				}
				
				//올바른 정렬 타이밍
				$myViewMap.sortRowDataArray();
				
			},
			
			settingDispAndToolTip : function(metaData){
				for(var i = 0; i < metaData.length ; i++){
					if(metaData[i].CHECK_TYPE =="3"){
						// disp , tooltip
						$myViewMap.dispData[i] = true;
						$myViewMap.tooltipSetting[i]=true;
					}else if(metaData[i].CHECK_TYPE =="2"){
						//tooltip
						$myViewMap.dispData[i] = false;
						$myViewMap.tooltipSetting[i]=true;
					}else if(metaData[i].CHECK_TYPE =="1"){
						//disp
						$myViewMap.dispData[i] = true;
						$myViewMap.tooltipSetting[i]=false;
					}else{
						//nothing
						$myViewMap.dispData[i] = false;
						$myViewMap.tooltipSetting[i]=false;
					}
				}
			},
			
			sortRowDataArray : function(){
				for(var i = 0; i < $myViewMap.rowDataArray.length; i++){
					var usrArray = new Array();
					
					for(var j = 0; j < $myViewMap.rowHeaderArray.length;j++){
						var key = $myViewMap.rowHeaderArray[j].COL_ID;
						for(var k = 0; k < $myViewMap.rowDataArray[i].USR_DATA.length;k++){
							var tempRowArray = $myViewMap.rowDataArray[i].USR_DATA[k];
							var tempKey =  getFirstKey(tempRowArray);
							if(key == tempKey){
								var makeRowArray = new Array();
								makeRowArray[key] = tempRowArray[key];
								usrArray.push(makeRowArray);
							}
						}
					}
					
					$myViewMap.rowDataArray[i].USR_DATA = usrArray;
				}
				
			},
			
			
			getMyData : function(data_uid){
				var sopPortalGetMyDataApi = new sop.portal.getMyData.api();
				sopPortalGetMyDataApi.addParam("data_uid", data_uid);
				sopPortalGetMyDataApi.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/getMyData.json",
					options : {
						
					}
				});
			},
			
			viewMyKml : function(data_id){
				$.ajax({
					async : false,
					type : "POST",
					url : "/view/mypage/myData/viewKml",
					dataType:"json",
					data:{
						data_id : data_id
					},
					success : function(data){
						console.log(data);
						$myViewMap.getMyKmlData(data.realFile);
					},
					error:function(xhr, textStatus, error){
						
						console.log("textStatus = "+ textStatus);
						console.log("error = " + error);
						console.log(xhr);
						
					},
					complete : function(){
						
					}					
					
				});
			},
			
			getMyKmlData : function(file_name){
				var mapOptions = {
						statisticTileLayer: true
				};
				
				 var customLayer = sop.geoJson(null, {
						onEachFeature: onEachFeature
					});

					function onEachFeature (feature, layer) {
						console.log(name + '<br>' + description);
						var name = feature.properties.name || '';
						var description = feature.properties.description || '';
						layer.bindInfoWindow( name + '<br>' + description);

						layer.on({
							click: function (e) {
								layer.openInfoWindow();
								console.log(feature);
							}
						});
					}
					
				
				
				$("#mapSetting").show();
				$myViewMap.fileType = "kml";
				$myViewMap.map = sop.map('mapRgn_1',mapOptions);
				$myViewMap.map.setView([953427, 1950827], 5);
				 
				 /*var runLayer = sop.kml("/DATA/docs/statsPotal/upload/myData/Placemark.kml")*/
				 //이제 logic파일 네임과 filePath 조합
				 /*var runLayer = sop.kml("/upload/myData/Placemark"+".kml")*/
				 
				 var runLayer = sop.kml("/upload/myData/"+file_name,null,customLayer).on('ready', function(e) {
		                map.fitBounds(runLayer.getBounds());
		            }).addTo($myViewMap.map);
				 
				 
			},
			
			
			callbackFunc : {
				didMouseOverPolygon : function(event, data, type, map) {
									
					var radioIndex;
					var checkList = new Array();
					
					for(var i =0; i < $myViewMap.dispData.length;i++){
						if($myViewMap.dispData[i] == true){
							radioIndex = i;
						}
					}
					
					for(var i =0; i < $myViewMap.tooltipSetting.length; i++){
						if($myViewMap.tooltipSetting[i] == true){
							checkList.push(i);
						}
					}

					var html ='<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
					
					if(data.info.length >=1){
							for(var i =0;i<$myViewMap.rowDataArray.length;i++){
								if($myViewMap.tot_type !="4"){
									if($myViewMap.rowDataArray[i].ADM_CD == data.info[0].adm_cd){
										html +=data.properties.adm_nm;
										for(var x = 0; x<checkList.length; x++){
											html +="<br>";
											html += $myViewMap.rowHeaderArray[checkList[x]].COL_NM;
											html +=":";
											
											var dataText = getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[checkList[x]]);
											
											if(dataText.length>20){
												dataText = dataText.substr(0,22) + "<br />" + dataText.substr(22);
											}
											
											html +=dataText;
										}
									}
								}else{
									if($myViewMap.rowDataArray[i].TOT_REG_CD == data.info[0].adm_cd){
										html +=data.properties.adm_nm;
										for(var x = 0; x<checkList.length; x++){
											html +="<br>";
											html += $myViewMap.rowHeaderArray[checkList[x]].COL_NM;
											html +=":";
											
											var dataText = getFirstKeyValue($myViewMap.rowDataArray[i].USR_DATA[checkList[x]]);
											
											if(dataText.length>20){
												dataText = dataText.substr(0,22) + "<br />" + dataText.substr(22);
											}
											
											html +=dataText;
										}
									}
								}
							}
					}
					
					html +="</table>";
					
					event.target.bindToolTip(html, {
						direction: 'right',
						noHide:true,
						opacity: 1

					}).addTo($myViewMap.map.gMap)._showToolTip(event);
					
				}
		}
			
	},
	
	
	/** ********* Data 가져오기 ********* */
	(function() {
	    $class("sop.portal.getMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if(res.errCd == "0") {
	        		var mainData = res.result[0].mainData;
	        		var uploadData = res.result[0].uploadData;
	        		var metaData = res.result[0].metaData;
	        		//2017 08 01 [개발팀] 수정
					if(mainData.MAP_DISP_TYPE == "ts_color"){
						mainData.MAP_DISP_TYPE = "colorFull"
					}else if(mainData.MAP_DISP_TYPE == "ts_bubble"){
						mainData.MAP_DISP_TYPE = "bubble"
					}
					//2017 08 01 [개발팀] 수정 종료
					
	        		$myViewMap.rowDataArray = res.result[0].uploadData;
	        		$myViewMap.rowHeaderArray =  res.result[0].metaData;
	        		$myViewMap.settingDispAndToolTip($myViewMap.rowHeaderArray);
	        		$myViewMap.dataVisualSetting = mainData.MAP_DISP_TYPE;
	        		$myViewMap.tot_type = mainData.TOT_TYPE;
	        		
	        		if(mainData.MAP_DISP_TYPE == "bubble" | mainData.MAP_DISP_TYPE=="colorFull"){
	        			$myViewMap.wasGioCalc = true; 
	        		}  
	        		$myViewMap.popMapGisSetting();
	        			        		
	        	}else if(res.errCd == "-401"){
	        		
	        	}
	        },
	        onFail : function(status, options) {

	        }
	    });
	}());
	
	/** ********* kmlData 가져오기 ********* */
	(function() {
	    $class("sop.portal.getMyKmlData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if(res.errCd == "0") {
	        		
	        	}else if(res.errCd == "-401"){
	        		
	        	}
	        },
	        onFail : function(status, options) {

	        }
	    });
	}());
	
	
}(window,document));


