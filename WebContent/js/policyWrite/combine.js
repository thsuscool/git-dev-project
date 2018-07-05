/**
 * 정택통계지도 융합 정보 매핑에 대한 클래스
 * 
 * history : 유코아시스템(주), 1.0, 2016/10/22  초기 작성
 * author : 송종대
 * version : 1.0
 * see : 
 */
(function(W, D) {
	W.$psmCombine = W.$psmCombine || {};
	
	
	$psmCombine.ui = {
			combineDataSet : null,//연산된 정보 데이터
			cdgLayer : null,//dataGeojsonLayer - 기준데이터
			cpoiMarkerList : [],//combine poi Marker 정보 - 추가데이터
			cpoiRadius : null,//combine poi 정보 버퍼설정(반경) - 추가데이터
			mapList : [],
			curDropParams : [],
			curTitle : [],
			combinePopup : null,
			/**
			 * @name         : combineDataValue
			 * @description  : 연산자에 따른 데이터 재 가공(연산처리) 처리한다.
			 *                 증감, 증감률 계산, showData 변경
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			combineDataValue : function(curMenuType, combineArithmetic){
				$psmCombine.ui.mapList  = W[policyTarget].ui.mapList;
				if($psmCombine.ui.mapList[0].isFixedBound==true){
					$psmCombine.ui.cdgLayer = $.extend(true, {}, W[policyTarget].ui.mapList[0].multiLayerControl);
				}else{
					$psmCombine.ui.cdgLayer = $.extend(true, {}, W[policyTarget].ui.mapList[0].dataGeojsonLayer);
				}
				$psmCombine.ui.curDropParams = W[policyTarget].ui.curDropParams;
				$psmCombine.ui.curTitle = W[policyTarget].ui.curTitle;
				var map1 = W[policyTarget].ui.mapList[0];
				var map2 = W[policyTarget].ui.mapList[1];
				var kosisIs = false;
				if("kosis" == map1.dataType || "kosis" == map2.dataType){
					kosisIs = true;
				}
				
				if("dataPoi" == curMenuType){
					$psmCombine.ui.cpoiMarkerList = $policyWriteMapRightmenu.ui.markerList;
					$psmCombine.ui.cpoiRadius = $policyWriteMapRightmenu.ui.poiRadius;
					
				}else if("dataData" == curMenuType){
					var _combineDataSet = $psmCombine.ui.combineDataGeojsonLayer(combineArithmetic);
					var combineData = _combineDataSet.combineData;
					
					//한쪽 이라도 N/A일 경우 : N/A
					//증감/증감률 연산
					for(var i = 0; i<combineData.length; i++){
						var value = 0;
						var rateValue = 0;//테스트
						
						if("N/A" == combineData[i].data1 || "N/A" == combineData[i].data2){
							value = "N/A";
						}else{
							//연산자에 의한 4칙 연산
							if("+" == combineArithmetic){
								value = parseFloat(combineData[i].data1) + parseFloat(combineData[i].data2);
							}else if("-" == combineArithmetic){
								value = parseFloat(combineData[i].data1) - parseFloat(combineData[i].data2);
							}else if("*" == combineArithmetic){
								value = parseFloat(combineData[i].data1) * parseFloat(combineData[i].data2);
							}else if("/" == combineArithmetic){
								value = parseFloat(combineData[i].data1) / parseFloat(combineData[i].data2);
							}
						}
						if("N/A" != value){
							combineData[i]["arithmeticData"] = value.toFixed(2);//소수점 2자리수
							combineData[i].showData = "arithmeticData";
						}else{
							combineData[i]["arithmeticData"] = value;
							combineData[i].showData = null;
						}
						
					}
					
					_combineDataSet["combineData"] = combineData;
					$psmCombine.ui.combineDataSet = _combineDataSet;
					
					//dataGeojson setting
					if(map1.isFixedBound==true){
						$.each(this.cdgLayer.multiData,function(){
							for(var k = 0; k < this.layer.features.length; k++){
								setData(this.layer.features[k]);
							}
						});
					}else{
						for(var k = 0; k < this.cdgLayer.features.length; k++){
							setData(this.cdgLayer.features[k]);
						}
					}
					function setData(_features){
						for(var i = 0; i < combineData.length; i++){
							if(_features.properties.adm_cd == combineData[i].adm_cd){
								if(!kosisIs){
									//N/A 같은 값 때문에 아예 info가 존재 하지 않는 경우
									if(0 == _features.info.length){
										_features.info.push({
											adm_cd : combineData[i]["adm_cd"],
											adm_nm : combineData[i]["adm_nm"],
											api_id : combineData[i]["api_id"],
											unit : null,
											showData : null,
											arithmetic : combineData[i]["arithmetic"],
											arithmeticData : combineData[i]["arithmeticData"],
											arithmeticDataUnit : combineData[i]["arithmeticDataUnit"]
										});
									}else{
										_features.info[0]["arithmetic"] = combineData[i]["arithmetic"];
										_features.info[0]["arithmeticData"] = combineData[i]["arithmeticData"];
										_features.info[0]["arithmeticDataUnit"] = combineData[i]["arithmeticDataUnit"];
										_features.info[0].showData = combineData[i]["showData"];
									}
								}else{
									if(0 == _features.info.length || "N/A" == combineData[i]["arithmeticData"]){
										_features.info = [];
									}else{
										_features.info[0] = combineData[i]["arithmeticData"];
										_features.info[1] = "";
										_features.info[2] = "kosis";
										_features.info[3] = "";
									}
									_features.isKosis = true;
									
								}
								
								break;
							}
						}
					}
					
				}
			},
			
			/**
			 * @name         : combineDataGeojsonLayer
			 * @description  : result 값을 전체 지도 값으로 재 매핑 처리한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @param    	 : arithmetic(연산자)
			 * @history 	 :
			 */
			combineDataGeojsonLayer : function(arithmetic){
				var map1 = W[policyTarget].ui.mapList[0];
				var map2 = W[policyTarget].ui.mapList[1];
				var showData1 = null;
				var showData2 = null;
				var result1 = [];
				var result2 = [];
				if("kosis" == map1.dataType){
					result1 = map1.dataForCombine;
				}else if(map1.isFixedBound==true){
					$.each(map1.dataForCombine,function(cnt,node){
						$.each(this.data.result,function(){
							result1.push(this);
						})
						if(cnt==0){
							showData1 = this.data.showData;
						}
					});
				}else{
					result1 = map1.dataForCombine.result;
					showData1 = map1.dataForCombine.showData;
				}
				
				if("kosis" == map2.dataType){
					result2 = map2.dataForCombine;
				}else if(map1.isFixedBound==true){
					$.each(map2.dataForCombine,function(cnt,node){
						$.each(this.data.result,function(){
							result2.push(this);
						})
						if(cnt==0){
							showData2 = this.data.showData;
						}
					});
				}else{
					result2 = map2.dataForCombine.result;
					showData2 = map2.dataForCombine.showData;
				}
				var curTitle = W[policyTarget].ui.curTitle;
				
				var return_dataSet = {
					curTitle : curTitle,
					combineData : []
				};
				var returnData = [];
				if(map1.isFixedBound==true){
					$.each(this.cdgLayer.multiData,function(){
						for(var k = 0; k < this.layer.features.length; k++){
							setData(this.layer.features[k]);
						}
					});
				}else{
					for(var k = 0; k < this.cdgLayer.features.length; k++){
						setData(this.cdgLayer.features[k]);
					}
				}
				function setData(_features){
					var data1 = "N/A";
					var data2 = "N/A";
					var unit1 = null;
					var unit2 = null;
					for(var i = 0; i<result1.length; i++){
						data1 = "N/A";
						if("kosis" == map1.dataType){
							if(_features.properties.adm_cd == result1[i].CODE){
								data1 = result1[i].DATA;
								break;
							}
						}else{
							if(_features.properties.adm_cd == result1[i].adm_cd){
								data1 = result1[i][showData1];
								unit1 = result1[i].unit;
								break;
							}
						}
					}
					
					for(var j = 0; j<result2.length; j++){
						data2 = "N/A";
						if("kosis" == map2.dataType){
							if(_features.properties.adm_cd == result2[j].CODE){
								data2 = result2[j].DATA;
								break;
							}
						}else{
							if(_features.properties.adm_cd == result2[j].adm_cd){
								data2 = result2[j][showData2];
								unit2 = result2[j].unit;
								break;
							}
						}
					}
					
					var adm_nm_split = _features.properties.adm_nm.split(" ");
					var admNm = "";
					if(0 < adm_nm_split.length){
						admNm = adm_nm_split[adm_nm_split.length - 1];
					}else{
						admNm = _features.properties.adm_nm;
					}
					
					returnData.push({
						adm_cd : _features.properties.adm_cd,
						adm_nm : admNm,
						arithmetic : arithmetic,
						arithmeticData : null,
						arithmeticDataUnit : null,
						data1 : data1,
						data2 : data2,
						unit1 : unit1,
						unit2 : unit2
					});
				}
				
				return_dataSet["combineData"] = returnData;
				return return_dataSet;
			},
			api : {
				absAPI : new sop.portal.absAPI(),
				leftDone : false,//api 호출 완료 유무
				rightDone : false,//api 호출 완료 유무
				left : null,//좌측 api 호출 정보
				right : null,//우측 api 호출 정보
				setParams : function(api_id,isKosis){
					api_id = api_id.split("-")[0];
					var paramInfo = $interactiveLeftMenu.ui.arParamList[$interactiveLeftMenu.ui.arParamList.length-1];
					$psmCombine.ui.api[W[policyTarget].ui.curDataSelect] = {
						disp_value : paramInfo.filterParam,
						disp_nm : paramInfo.names.join(" + "),
						disp_unit : paramInfo.unit,
						bnd_year : W[policyTarget].ui.mapList[W[policyTarget].ui.curDataSelect=="left"?0:1].bnd_year,
						url : isKosis?"/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do?":W[policyTarget+"Api"].request[api_id+"_URL"],
						api_id : api_id,
						params : paramInfo.params 
					}
				},
				setMapCallback : function(map){
					map.combineCallback = function(map, geojson) {
						$psmCombine.ui.api[map.policyType+"Done"] = true;
						$psmCombine.ui.api.combine();
					}
				},
				combine : function(){
					if($psmCombine.ui.api.leftDone===true&&$psmCombine.ui.api.rightDone===true){
						setTimeout(function(){
							$("#btn_fuse").trigger("click");
						},500);
					}
				}
			},
			openCombinePopup : function(curMenuType){
				if("dataPoi" == curMenuType){
					$psmCombine.ui.combinePopup = 
						window.open(
							"/view/map/policyWriteCombineBufferMap", 
							"combineWritePopup",
							"top=50, left=100, width=1000, height=600, menubar=no, status=no, toolbar=no, location=no, resizable=no"
						);	
					
				}else if("dataData" == curMenuType){
					$psmCombine.ui.combinePopup = 
						window.open(
							"/view/map/policyWriteCombineArithmeticMap", 
							"combineWritePopup",
							"top=50, left=100, width=1000, height=600, menubar=no, status=no, toolbar=no, location=no, resizable=no"
						);	
					
				}
			},
			//========== 2017.05.29 [개발팀] 지자체 URL 추가 START ===============//
			atdrcList : {
			    "31" : [{
			    	sgg_nm : "수원시",
			    	sgg_list : ["011","012","013","014"],
			    	adm_cd : "31010"
			    },{
			    	sgg_nm : "성남시",
			    	sgg_list : ["021","022","023"],
			    	adm_cd : "31020"
			    	
			    },{
			    	sgg_nm : "안양시",
			    	sgg_list : ["041","042"],
			    	adm_cd : "31040"
			    	
			    },{
			    	sgg_nm : "부천시",
			    	sgg_list : ["051","052","053"],
			    	adm_cd : "31050"
			    	
			    },{
			    	sgg_nm : "안산시",
			    	sgg_list : ["091","092"],
			    	adm_cd : "31090"
			    	
			    },{
			    	sgg_nm : "고양시",
			    	sgg_list : ["101","103","104"],
			    	adm_cd : "31100"
			    	
			    },{
			    	sgg_nm : "용인시",
			    	sgg_list : ["191","192","193"],
			    	adm_cd : "31190"
			    	
			    }],
			    "33" : [{
			    	sgg_nm : "청주시",
			    	sgg_list : ["041","042","043","044"],
			    	adm_cd : "33040"
			    	
			    }],
			    "34" : [{
			    	sgg_nm : "천안시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "34010"
			    	
			    }],
			    "35" : [{
			    	sgg_nm : "전주시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "35010"
			    	
			    }],
			    "37" : [{
			    	sgg_nm : "포항시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "37010"
			    	
			    }],
			    "38" : [{
			    	sgg_nm : "창원시",
			    	sgg_list : ["111","112","113","114","115"],
			    	adm_cd : "38110"
			    	
			    }]
			},
			//========== 2017.05.29 [개발팀] 지자체 URL 추가 END ===============//
			
			chartLegend : function(target){
	    		$("#"+target+" .highcharts-legend-item").hide();
	    		var legendItems=$("<div/>",{"style":"text-align:center;top: 0;width:"+$("#"+target).width()+"px;position: absolute;z-index: 1;"});
	    		$.each($("#"+target+" .highcharts-legend-item text"),function(cnt,node){
	    			var color = $("#"+target+" .highcharts-legend-item:eq("+cnt+") rect").attr("fill");
	    			legendItems.append(
    					$("<label/>",{"style":"margin-right: 15px;font-size: 12px;font-weight: bold;background-color: "+color+";color: #fff;padding: 5px 8px;height: 15px;line-height: 25px;border-radius: 5px;"}).append(
							$("<input/>",{"type":"checkbox","checked":"checked","style":"margin-right: 5px;"}).change(function(){
								$("#"+target+" .highcharts-legend-item:eq("+$(this).parent("label").index()+")").trigger("click");
								if($(this).is(":checked")){
									$(this).parent("label").css("background-color",color);
								}else{
									$(this).parent("label").css("background-color","#aaa");
								}
							}),
							$(node).text()
						)
					);
	    		});
	    		$("#"+target).prepend(legendItems);
			}
	};
	
}(window, document));