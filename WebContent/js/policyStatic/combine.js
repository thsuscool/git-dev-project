/**
 * 정택통계지도 융합 정보 매핑에 대한 클래스
 * 
 * history : 유코아시스템(주), 1.0, 2016/10/22  초기 작성
 * author : 송종대
 * version : 1.0
 * see : 
 */
(function(W, D) {
	W.$staticPsmCombine = W.$staticPsmCombine || {};
	
	
	$staticPsmCombine.ui = {
			combineDataSet : null,//연산된 정보 데이터
			cdgLayer : null,//dataGeojsonLayer
			
			/**
			 * @name         : combineDataValue
			 * @description  : 연산자에 따른 데이터 재 가공(연산처리) 처리한다.
			 *                 증감, 증감률 계산, showData 변경
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			combineDataValue : function(){
				if($policyStaticMap.ui.mapList[0].isFixedBound==true){
					$staticPsmCombine.ui.cdgLayer = $.extend(true, {}, $policyStaticMap.ui.mapList[0].multiLayerControl);
				}else{
					$staticPsmCombine.ui.cdgLayer = $.extend(true, {}, $policyStaticMap.ui.mapList[0].dataGeojsonLayer);
				}
				var arithmetic = "-";
				var _combineDataSet = $staticPsmCombine.ui.combineDataGeojsonLayer(arithmetic);
				var combineData = _combineDataSet.combineData;
				
				//한쪽 이라도 N/A일 경우 : N/A
				//증감/증감률 연산
				for(var i = 0; i<combineData.length; i++){
					var value = 0;
					var rateValue = 0;//테스트
					
					if("N/A" == combineData[i].data1 || "N/A" == combineData[i].data2){
						value = "N/A";
						rateValue = "N/A";
					}else{
						value = parseFloat(combineData[i].data2) - parseFloat(combineData[i].data1);
						rateValue = (value/parseFloat(combineData[i].data1)) * 100;
					}
					
					if("N/A" != value){
						combineData[i]["arithmeticData"] = value.toFixed(2);//소수점 2자리수
						combineData[i].showData = "arithmeticData";
						combineData[i]["arithmeticRate"] = rateValue.toFixed(2);//소수점 2자리수
					}else{
						combineData[i]["arithmeticData"] = value;
						combineData[i].showData = null;
						combineData[i]["arithmeticRate"] = rateValue;
					}
					
				}
				
				_combineDataSet["combineData"] = combineData;
				$staticPsmCombine.ui.combineDataSet = _combineDataSet;
				if($policyStaticMap.ui.mapList[0].isFixedBound==true){
					//=========== 2017.05.29 [개발팀] 비자치구 추가 - 데이터정제 START ===========// 
					var tmpLayer = null;
					var tmpFeatures = null;
					$.each(this.cdgLayer.multiData,function(i){
						if (i == 0) {
							tmpLayer = this.layer;
							tmpFeatures = this.layer.features;
						}else {
							for(var k = 0; k < this.layer.features.length; k++){
								tmpFeatures.push(this.layer.features[k]);
							}
						}
					});
					this.cdgLayer = tmpLayer;
					for(var k = 0; k < this.cdgLayer.features.length; k++){
						setData(this.cdgLayer.features[k]);
					}
					//=========== 2017.05.29 [개발팀] 비자치구 추가 - 데이터정제 END ===========// 
				}else{
					for(var k = 0; k < this.cdgLayer.features.length; k++){
						setData(this.cdgLayer.features[k]);
					}
				}
				function setData(_features){
					//dataGeojson setting
					for(var i = 0; i < combineData.length; i++){
						if(_features.properties.adm_cd == combineData[i].adm_cd){
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
									arithmeticDataUnit : combineData[i]["arithmeticDataUnit"],
									arithmeticRate : combineData[i]["arithmeticRate"],
									arithmeticRateUnit : combineData[i]["arithmeticRateUnit"]
								});
							}else{
								_features.info[0]["arithmetic"] = combineData[i]["arithmetic"];
								_features.info[0]["arithmeticData"] = combineData[i]["arithmeticData"];
								_features.info[0]["arithmeticDataUnit"] = combineData[i]["arithmeticDataUnit"];
								_features.info[0]["arithmeticRate"] = combineData[i]["arithmeticRate"];
								_features.info[0]["arithmeticRateUnit"] = combineData[i]["arithmeticRateUnit"];
								_features.info[0].showData = combineData[i]["showData"];
							}
							break;
						}
					}
				}
				
				return this.cdgLayer;
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
				//2017.05.29 [개발팀] 비자치구 추가 - 레이어 융합
				var tmpDataList = [];
				var tmpShowData = [];
				for (var i=0; i<$policyStaticMap.ui.mapList.length; i++) {
					var tmpData = $policyStaticMap.ui.mapList[i].dataForCombine;
					if (Object.prototype.toString.call(tmpData) === "[object Array]") {
						for (var k=0; k<tmpData.length; k++) {
							if (k == 0) {
								tmpDataList[i] = tmpData[k].data.result;
								tmpShowData[i] = tmpData[k].data.showData;
							}else {
								for (var v=0; v<tmpData[k].data.result.length; v++) {
									tmpDataList[i].push(tmpData[k].data.result[v]);
								}
							}
						}
					}else {
						tmpDataList[i] = tmpData.result;
						tmpShowData[i] = tmpData.showData;
					}
				}
				
				var return_dataSet = {
					adm_cd : $("#current-sido-select option:selected").val()+$("#current-sgg-select option:selected").val(),
					adm_nm : $("#current-sido-select option:selected").text()+" "+$("#current-sgg-select option:selected").text(),
					api_id : $("#demand-box .OpenTab input:checked").attr("apiId"),
					menuText : $("#demand-box .OpenTab dt[class=M_on]").data("title"),//대메뉴
					subMenuText : $("#demand-box .OpenTab input:checked").attr("subMenu"),//중메뉴
					sideQuickText : $policyStaticMap.ui.sideQuickTitle,//지역별 수요변화, 협업형 정책지도
					selectYears : $policyStaticMap.ui.selectYears,
					combineData : []
				}
				var returnData = [];
				if($policyStaticMap.ui.mapList[0].isFixedBound==true){
					$.each(this.cdgLayer.multiData,function(){
						for(var k = 0; k < this.layer.features.length; k++){
							setInfo(this.layer.features[k]);
						}
					});
				}else{
					for(var k = 0; k < this.cdgLayer.features.length; k++){
						setInfo(this.cdgLayer.features[k]);
					}
				}
				function setInfo(_features){
					
					//======== 2017.05.29 [개발팀] 비자치구 추가 - 데이터 가공 START ========//
					var dataList = ["N/A", "N/A"];
					var unitList = [null, null];
					
					for (var i=0; i<tmpDataList.length; i++) {
						for (var k=0; k<tmpDataList[i].length; k++) {
							if (_features.properties.adm_cd == tmpDataList[i][k].adm_cd) {
								dataList[i] = tmpDataList[i][k][tmpShowData[i]];
								unitList[i] = tmpDataList[i][k].unit;
								break;
							}
						}
					}
					//======== 2017.05.29 [개발팀] 비자치구 추가 - 데이터 가공 END ========//
					
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
						arithmeticRate : null,
						arithmeticDataUnit : null,
						arithmeticRateUnit : "%",
						//2017.05.29 [개발팀] 비자치구 추가 
						data1 : dataList[0],
						data2 : dataList[1],
						unit1 : unitList[0],
						unit2 : unitList[1]
					});
				}
				
				return_dataSet["combineData"] = returnData;

				return return_dataSet;
			}
			
	};
	
}(window, document));