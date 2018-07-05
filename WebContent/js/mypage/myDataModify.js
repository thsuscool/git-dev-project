/**
 * mydata 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/03  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 *
 */
var stat = '1';
(function(W, D){
	
W.$myDataModify = W.$myDataModify || {};
	
	$(document).ready(function() {
		$myDataModify.getMyData($("#data_uid").val());
		if($(".popBox > div> a").length){
			$myDataModify.popClose();
		}
		
		$("#gioPop1").draggable();
		$("#gioPop2").draggable();
		$("#gioPop3").draggable();
			
		$('#awSelect02').change(function(){
		    $myDataModify.awSelectChange(this.value);
		});
		//2017 07 31 [개발팀] 수정 시작
		$("input[name='calcYear']").click(function(){
			$myDataModify.calcYearSelected(this.value);
		});
		//2017 07 31 [개발팀] 수정 종료
	});
	
	$myDataModify = {
			myData: null,
			hot : null,
			map : null,
			rowDataArray : null,
			rowHeaderArray : null,
			tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
			gioCalc : 1, // 집계 공간연산 값   1: 개별/ 2: 합계/ 3 : 빈도  / 4:이미 집계가 된것
			wasGioCalc : false,//해당 데이터가 집계를 행했던 데이터인지 확인
			fieldCalc : false, //연산을 진행 하였는지 여부
			gioField : null,
			dispData : new Array(),//표출데이터 설정
			tooltipSetting : new Array(), 
			rdOption : null,
			SHARE_YN : "N",
			USE_HISTORY:"N",
			dataVisualSetting : null,
			marker : new Array(),
			FILE_NM_LOGIC : null,
			FILE_PATH : null,
			FILE_NM_REAL : null,
			fileType : null,
			runLayer : null,
			
			currentIndex : 0,
			currentSuccessCount : 0,
			failCount  : 0,
			successCount : 0,
			endPointIndex : 0,
			
			//반복문으로 실행시 인덱스
			loopWork : null,
			loopStart : 1,
			loopLevel : 0,
			loopEnd : 0,
			loopTotalLevel : 0,
		
			//실패한 내용의 array
			failArray : new Array(),
			
			
			//2017 07 31 [개발팀] 수정 시작
			yearList : null, //년도집계시 해당 필드에 대한 년도 값 json Data 로 저장
			wasYearList : false, //년도 집계 여부
			//2017 07 31 [개발팀] 수정 종료
			
			dispPop : function(idx){
				if($myDataModify.wasYearList == true && idx == "2"){
					messageAlert.open("알림", "연도별 집계를 실행 한경우 연산 버튼은 사용하실수 없습니다.");
				}else{
					$("#gioPop"+idx).show();
					
					var html = "";
					for(var i =0; i < $myDataModify.hot.countCols();i++){
						var sWord = changeNumber(i);
						html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
					}
					$("#awSelect03").html(html);
					//2017 07 31 [개발팀] 수정 시작
					$("#awSelect04").html(html);
					//2017 07 31 [개발팀] 수정 종료
					$("#calcField1").html(html);
					$("#calcField3").html(html);
					$("#calcField4").html(html);
				}
					
					
			},
			
			popClose : function(){
				$("body").on("click",".popBox > div> a",
						function(){
							$(this).parents(".popBox").eq(0).hide();
						}
				)
			},
			hideMap : function(){
				$("#mapSetting").hide();
				if($myDataModify.fileType == "kml"){
					$myDataModify.map.remove();
				}else{
					$myDataModify.map.gMap.remove();
				}
				
			},
			
			awSelectChange : function(sVal){
				if(sVal =="3"){
					$("#awSelect03").prop('disabled', 'disabled');
				}else{
					$("#awSelect03").prop('disabled', false);
				}
			},
			
			popGio : function(idx){
				if(idx == 1){
					$("#gioCodingPop1").show();
				}else if(idx ==2){
					$("#gioCodingPop1").hide();
					$("#gioCodingPop2").show();
				}else if(idx ==3){
					$("#gioCodingPop1").hide();
					$("#gioCodingPop3").show();
				}
				
			},
			
			
			/**
			 * 
			 * @name         : calcYearSelected
			 * @description  : 연도별 시계열 데이터 사용 여부
			 * @date         : 2017. 07. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			calcYearSelected : function(val){
				if(val == "on"){
					$("#awSelect04").show();
				}else{
					$("#awSelect04").hide();
				}
			},
			
			
			/**
			 * 
			 * @name         : confirmGioPop
			 * @description  : 위치조회(지오코딩) 확인 버튼을 눌렀을 경우 단계에 따른 처리
			 * @date         : 2015. 11. 10. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			confirmGioPop : function(step,value){
				//x,y 필드 선택 / 주소 필드 선택
				if(step ==1){
					$myDataModify.gioCoding = value;
					if(value=="xy"){
						$myDataModify.popGio(2);
						
						var html = "";
						for(var i =0; i < $myDataModify.hot.countCols();i++){
							var sWord = changeNumber(i);
							html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
						}
						
						/*$("#awSelect01").html(html);
						$("#awSelect02").html(html);*/
						$("#awSelect04").html(html);
						$("#awSelect05").html(html);
						//awSelect04 x좌표
						//awSelect05 y좌표
						//awSelect06 주소필드
						
					}else{
						$myDataModify.popGio(3);
						
						var html = "";
						for(var i =0; i < $myDataModify.hot.countCols();i++){
							var sWord = changeNumber(i);
							html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
						}
						/*$("#awSelect03").html(html);*/
						$("#awSelect06").html(html);
					}
					
					$("#gioCodingPop1").hide();
					
				}else if(step ==2){
					
					$myDataModify.currentSuccessCount = 0;
					$myDataModify.failCount = 0;
					$myDataModify.successCount = 0;
					$("#successCount").text("0");
					$("#failCount").text("0");
					$("#currentCodingRow").text("0");
					//로딩바 삽입구간
					//x,y시 값
					if($myDataModify.gioCoding=="xy"){
						$myDataModify.gioX = $("#awSelect04").val();
						$myDataModify.gioY = $("#awSelect05").val();
						$("#gioCodingPop2").hide();
						$(".btnbox .fl >a:eq(1)").css("display","");
						$myDataModify.searchFailRow();
					}else{
						//주소필드시 값
						$myDataModify.gioField=$("#awSelect06").val();
						$("#gioCodingPop3").hide();
						$myDataModify.searchFailRow();
						//주소 필드를 xy 좌표로 변환 하는 코드가 필요하다.
					}
				}		
			},
			
			
			/**
			 * 
			 * @name         : getGioCode
			 * @description  : 주소로 입력 하였을 경우 Geo코드 가져오기
			 * @date         : 2015. 11. 10. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getGioCode : function(field){
				$myDataModify.hot.updateSettings({
			    	cells: function (row, col, prop,td) {
			    		var cellProperties = {};
			    		if (col == $myDataModify.hot.countCols()-4 |col == $myDataModify.hot.countCols()-3 | col == $myDataModify.hot.countCols()-2 | col == $myDataModify.hot.countCols()-1 ) {
			    			cellProperties.editor = false;
			    			/*cellProperties.type = {renderer: customRenderer};*/
			    			cellProperties.renderer = customRenderer;
			    		}
			    		return cellProperties;
			    	},

				});
				
				$("#basic_handson01").handsontable("render");
				var col = changeWord(field);
				
				//if $myDataModify.failArray.length > 1 
				//실행전 searchFailRow를 무조건 실행
					if($myDataModify.failArray.length < 1){
						$myDataModify.loopTotalLevel = $myDataModify.hot.countRows() / 5;
					}else{
						$myDataModify.loopTotalLevel = $myDataModify.failArray.length /5;
					}
					
					$myDataModify.loopStart = 1;
					$myDataModify.loopLevel = 1;
					$myDataModify.loopEnd = $myDataModify.loopLevel * 5;
					
					if($myDataModify.loopTotalLevel == 0){
						if($myDataModify.failArray.length < 1){
							$myDataModify.loopEnd = $myDataModify.hot.countRows();
						}else{
							$myDataModify.loopEnd = $myDataModify.failArray.length;
						}
					};
					
					$myDataModify.loopWork = setInterval($myDataModify.loopGeoCode,1200,col);
					
			},
			
			
			/**
			 * 
			 * @name         : loopGeoCode
			 * @description  : 리버스 코드 반복문 실행
			 * @date         : 2016. 05. 19. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			loopGeoCode : function(col){
				if($myDataModify.failArray.length < 1){
					if($myDataModify.hot.countRows() > $myDataModify.loopEnd){
						for(var i=$myDataModify.loopStart;i<$myDataModify.loopEnd;i++){	
							$myDataModify.openApiGeocode(i,col);
						}
						
						$myDataModify.loopStart = $myDataModify.loopEnd;
						$myDataModify.loopLevel = $myDataModify.loopLevel + 1;
						$myDataModify.loopEnd = $myDataModify.loopLevel * 5;
					}else{
						$myDataModify.loopEnd = $myDataModify.hot.countRows();
						for(var i=$myDataModify.loopStart;i<$myDataModify.loopEnd;i++){
							$myDataModify.openApiGeocode(i,col);
						}
						clearInterval($myDataModify.loopWork);
					}
				}else{
					//실패할경우 
					if($myDataModify.failArray.length > $myDataModify.loopEnd){
						for(var i =$myDataModify.loopStart-1;i<$myDataModify.loopEnd-1;i++){
							$myDataModify.openApiGeocode($myDataModify.failArray[i],col);
						}
						$myDataModify.loopStart = $myDataModify.loopEnd;
						$myDataModify.loopLevel = $myDataModify.loopLevel + 1;
						$myDataModify.loopEnd = $myDataModify.loopLevel * 5;
					}else{
						$myDataModify.loopEnd = $myDataModify.failArray.length;
						for(var i = $myDataModify.loopStart-1;i<$myDataModify.loopEnd;i++){
							$myDataModify.openApiGeocode($myDataModify.failArray[i],col);
						}
						clearInterval($myDataModify.loopWork);
					} 
				}
			},
			
			/**
			 * 
			 * @name         : getReverseGeoCode
			 * @description  : 좌표로 입력 하였을 경우 Geo코드 가져오기
			 * @date         : 2015. 11. 10. 
			 * @author	     : 최재영
			 * @history 	 : getgioCode와 중복 되어버림 변경 필요
			 */
			getReverseGeoCode : function(xField,yField){

				$myDataModify.hot.updateSettings({
			    	cells: function (row, col, prop) {
			    		var cellProperties = {};
			    		if (col == $myDataModify.hot.countCols()-4 |col == $myDataModify.hot.countCols()-3 | col == $myDataModify.hot.countCols()-2 | col == $myDataModify.hot.countCols()-1 ) {
			    			cellProperties.editor = false;
			    		}
			    		return cellProperties;
			    	}
				});

				$myDataModify.geoDataArray = new Array();
				var col1 = changeWord(xField);
				var col2 = changeWord(yField);
				
				if($myDataModify.failArray.length < 1){
					$myDataModify.loopTotalLevel = $myDataModify.hot.countRows() / 5;
				}else{
					$myDataModify.loopTotalLevel = $myDataModify.failArray.length /5;
				}
				
				$myDataModify.loopStart = 1;
				$myDataModify.loopLevel = 1;
				$myDataModify.loopEnd = $myDataModify.loopLevel * 5;
				
				
				
				if($myDataModify.loopTotalLevel == 0){
					if($myDataModify.failArray.length < 1){
						$myDataModify.loopEnd = $myDataModify.hot.countRows();
					}else{
						$myDataModify.loopEnd = $myDataModify.failArray.length;
					}
					
				};
				$myDataModify.loopWork = setInterval($myDataModify.loopReverseGeoCode,1200,col1,col2);
				
			},
			
			
			/**
			 * 
			 * @name         : loopReverseGeoCode
			 * @description  : 리버스 코드 반복문 실행
			 * @date         : 2016. 05. 19. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			loopReverseGeoCode : function(col1,col2){
				if($myDataModify.failArray.length < 1){
					if($myDataModify.hot.countRows() > $myDataModify.loopEnd){
						for(var i=$myDataModify.loopStart;i<$myDataModify.loopEnd;i++){						
							$myDataModify.openApiReverseGeoCode(i,col1,col2);
						}
						
						$myDataModify.loopStart = $myDataModify.loopEnd;
						$myDataModify.loopLevel = $myDataModify.loopLevel + 1;
						$myDataModify.loopEnd = $myDataModify.loopLevel * 5;
					}else{
						$myDataModify.loopEnd = $myDataModify.hot.countRows();
						for(var i=$myDataModify.loopStart;i<$myDataModify.loopEnd;i++){
							$myDataModify.openApiReverseGeoCode(i,col1,col2);
						}
						clearInterval($myDataModify.loopWork);
					}
				}else{
					//실패할경우 
					if($myDataModify.failArray.length > $myDataModify.loopEnd){
						for(var i =$myDataModify.loopStart-1;i<$myDataModify.loopEnd-1;i++){
							$myDataModify.openApiReverseGeoCode($myDataModify.failArray[i],col1,col2);
						}
						$myDataModify.loopStart = $myDataModify.loopEnd;
						$myDataModify.loopLevel = $myDataModify.loopLevel + 1;
						$myDataModify.loopEnd = $myDataModify.loopLevel * 5;
					}else{
						$myDataModify.loopEnd = $myDataModify.failArray.length;
						for(var i = $myDataModify.loopStart-1;i<$myDataModify.loopEnd;i++){
							$myDataModify.openApiReverseGeoCode($myDataModify.failArray[i],col1,col2);
						}
						clearInterval($myDataModify.loopWork);
					} 
				}
				
			},
			
			sessionIncrease: function() {
				var sopPortalSessionInfoObj = new sop.portal.sessionIncrease.api();
				sopPortalSessionInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/auth/sessionInfo.json"
				});
			},
			
			openApiGeocode : function(currentRow,addressCol){
				openApiPath = "//sgisapi.kostat.go.kr"; 	//운영서버
				dataYear = "2013";
				if($myDataModify.failArray.length < 1){
					$myDataModify.endPointIndex = $myDataModify.myData.length-1;// 다른걸로 바꾸고
				}else{
					$myDataModify.endPointIndex = $myDataModify.failArray.length-1;// 다른걸로 바꾸고
				}
				
				$myDataModify.onBlockUIPopup();
				var sopOpenApiGeocodeObj = new sop.openApi.openApiuserGeocode.api();
				
				if(currentRow % 100 == 0){
					$myDataModify.sessionIncrease();
				}
				
				sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
				sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent($myDataModify.myData[currentRow][addressCol])));
				sopOpenApiGeocodeObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath+"/OpenAPI3/addr/geocode.json",
			        options : {
			        	address : $myDataModify.myData[currentRow][addressCol],
			        	addressCol : addressCol,
			        	index : currentRow,
			        	maxIdx : $myDataModify.endPointIndex
			        }
			    });
				
			},
			
			
			
			// OpenAPI 리버스지오코딩
			openApiReverseGeoCode : function (currentRow,xCol,yCol) {
				//운영
				openApiPath = "//sgisapi.kostat.go.kr"; 	//운영서버
				dataYear = "2013";
				if($myDataModify.failArray.length < 1){
					$myDataModify.endPointIndex = $myDataModify.myData.length-1;// 다른걸로 바꾸고
				}else{
					$myDataModify.endPointIndex = $myDataModify.failArray.length-1;// 다른걸로 바꾸고
				}
				
				$myDataModify.onBlockUIPopup();
				var sopOpenApiReverseGeoCodeObj = new sop.openApi.myDataReverseGeoCode.api();
				
				if(currentRow % 100 == 0){
					$myDataModify.sessionIncrease();
				}
				
				sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
				sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
				
				sopOpenApiReverseGeoCodeObj.addParam("x_coor", $myDataModify.hot.getDataAtCell(currentRow,xCol));
				sopOpenApiReverseGeoCodeObj.addParam("y_coor", $myDataModify.hot.getDataAtCell(currentRow,yCol));
				
				sopOpenApiReverseGeoCodeObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						x:$myDataModify.hot.getDataAtCell(currentRow,xCol),
						y:$myDataModify.hot.getDataAtCell(currentRow,yCol),
						xCol:xCol,
						yCol:yCol,
						idx : currentRow,
						maxIdx : $myDataModify.endPointIndex
					}
				});
			},
			
			
			// OpenAPI 소지역구 sop.openApi.findcodeinsmallarea.api
			openApifindcodeinsmallarea : function (idx,x_coor,y_coor) {
				
				//openApiPath = "http://localhost:8080/SOPOpenAPI"; 		//개발서버
				dataYear = "2014";
				
				var openApifindcodeinsmallarea = new sop.openApi.findcodeinsmallarea.api();
				openApifindcodeinsmallarea.addParam("accessToken", accessToken);
				openApifindcodeinsmallarea.addParam("x_coor", x_coor);
				openApifindcodeinsmallarea.addParam("y_coor", y_coor);
				
				openApifindcodeinsmallarea.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/personal/findcodeinsmallarea.json",
					options : {
						idx : idx,
						x_coor : x_coor,
						y_coor : y_coor
					}
				});
			},
			
			
			  onBlockUIPopup : function(){
		        	// 2016.12.02 시큐어코딩 삭제
		           
		      },
		        
		        
		        onBlockUIClose : function() {
		        	
					/*if(!$d.util.isUndefined(this.blockUI)) {
						D.body.removeChild(this.blockUI);
						delete this.blockUI;
					}
					if(!$d.util.isUndefined(this.popupUI)) {
						D.body.removeChild(this.popupUI);
						delete this.popupUI;
					}*/
				},
			
			
			
			
			
			
			getMyData : function(data_uid){
				var getMyData = new sop.portal.getMyData.api();
				getMyData.addParam("data_uid", data_uid);
				getMyData.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/getMyData.json",
					options : {
						
					}
				});
			},
			
			updateMyData : function(usr_data,meta_data){
				var updateMyData = new sop.portal.updateMyData.api();
				updateMyData.addParam("data_uid",$("#data_uid").val());
				updateMyData.addParam("subject",$("#mpfSubj").val());
				updateMyData.addParam("usr_data",usr_data);
				updateMyData.addParam("meta_data",meta_data);
				
				updateMyData.addParam("map_disp_type",$myDataModify.dataVisualSetting);
				updateMyData.addParam("dispData" ,$myDataModify.dispData);
				updateMyData.addParam("tooltipSetting",$myDataModify.tooltipSetting);
				updateMyData.addParam("gioField",$myDataModify.gioField);
				//2017 08 01 [개발팀] 수정
				//leekh 20180223 yearlist null 처리 추가
				if($myDataModify.yearList != null){
					if(Object.keys($myDataModify.yearList).length > 0){
						updateMyData.addParam("yearList",JSON.stringify(arrayLikeToObject($myDataModify.yearList)));
						
						if($myDataModify.dataVisualSetting == "colorFull"){
							updateMyData.addParam("map_disp_type","ts_color");
						}else{
							updateMyData.addParam("map_disp_type","ts_bubble");
						}
						
					}else{
						updateMyData.addParam("yearList",null);
					}
				}else{
					updateMyData.addParam("yearList",null);
				}
				
				if($myDataModify.rdOption.length == 0){
					$myDataModify.rdOption.push("NullData");
				}
				updateMyData.addParam("rdOption",$myDataModify.rdOption);
				
				updateMyData.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/updateMyData.json",
					options : {
						
					}
				});
			},
			
			newSaveData : function(){
				
				var usrData = $myDataModify.makeUsrData($myDataModify.rowDataArray);
				var metaData = $myDataModify.makeMetaData($myDataModify.rowHeaderArray);
				
				var newSaveData = new sop.portal.newSaveMyData.api();
				newSaveData.addParam("data_title",$("#newSubject").val());//제목
				newSaveData.addParam("geoDataArray",JSON.stringify($myDataModify.rowDataArray));//기존의 geoDataArray
				newSaveData.addParam("usr_data",usrData);//usr_data
				newSaveData.addParam("meta_data",metaData);//metaData
				newSaveData.addParam("map_disp_type" ,$myDataModify.dataVisualSetting);
				newSaveData.addParam("dispData",$myDataModify.dispData);//dispData
				newSaveData.addParam("tooltipSetting",$myDataModify.tooltipSetting);//tooltipSetting
				newSaveData.addParam("file_nm_real",$myDataModify.FILE_NM_REAL);
				newSaveData.addParam("tot_type",$myDataModify.tot_type);
				newSaveData.addParam("gioField" , $myDataModify.gioField);

				//2017 08 01 [개발팀] 수정
				if($(":input:radio[name=calcYear]:checked").val() == "on"){
					newSaveData.addParam("yearList",JSON.stringify(arrayLikeToObject($myDataModify.yearList)));
					
					if($myDataModify.dataVisualSetting == "colorFull"){
						newSaveData.addParam("map_disp_type","ts_color");
					}else{
						newSaveData.addParam("map_disp_type","ts_bubble");
					}
					
				}else{
					newSaveData.addParam("yearList",null);
				}
				
				
				newSaveData.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/newSaveData.json",
					
				});
			},
			
			gridHandSonTable : function(mainData,uploadData,metaData){
				$("#mpfSubj").val(mainData.DATA_TITLE);
				if(mainData.SHARE_YN !="N"){
					$myDataModify.SHARE_YN = "Y";
					$("input[name=rd_option]").eq(0).attr("checked","checked");
					$("label[for='sharedChecked']").addClass("on");
				}
				if(mainData.USE_HISTORY !="N"){
					$myDataModify.USE_HISTORY = "Y";
					$("input[name=rd_option]").eq(1).attr("checked","checked");
					$("label[for='useHistoryChecked']").addClass("on");
				}
				
				$myDataModify.dataVisualSetting =mainData.MAP_DISP_TYPE;
				
				var data = [];
				var userDataArray = new Array();
				
				var col_id = new Array();
				var col_nm = new Array();
				
				var rowHeader = new Array();
				
				
				for(var i = 0; i < metaData.length; i ++){
					col_id[i] = metaData[i].COL_ID;
					col_nm[i] = metaData[i].COL_NM;
				}
				
				for(var i = 0 ; i < uploadData.length; i++){
					var userData = $.parseJSON(uploadData[i].USR_DATA);
					var userArray = new Array();
					$.each(userData,function(key,value){
						userArray[key] = value;
					});
					userDataArray[i] = userArray;
				}
				
				if($myDataModify.gioCalc != 1 | $myDataModify.wasGioCalc == true){
					for(var i = 0; i < col_nm.length; i ++){
						if(i==0){
						
							rowHeader[i] = "No";
						}
						
						rowHeader[i+1] = col_nm[i];
					}
					data.push(rowHeader);
					
					
					for(var i =0; i < userDataArray.length; i ++){
						var tempRow = new Array();
						tempRow.push(i+1);
						for(var j =0; j <col_id.length; j ++){
							tempRow.push(userDataArray[i][col_id[j]]);
						}
						data.push(tempRow);
					}
				}else{
					for(var i = 0; i < col_nm.length; i ++){
						if(i==0){
							rowHeader[i] = "결과";
							rowHeader[i+1] = "No";
						}
						//rowHeader[i+1] = col_nm[i];
						rowHeader[i+2] = col_nm[i];
					}
					data.push(rowHeader);
					
					
					for(var i =0; i < userDataArray.length; i ++){
						var tempRow = new Array();
						tempRow.push("O");
						tempRow.push(i+1);
						for(var j =0; j <col_id.length; j ++){
							tempRow.push(userDataArray[i][col_id[j]]);
						}
						data.push(tempRow);
					}
				}
				
				
				
				
				$myDataModify.handsonTable01(data);
			},
			
			handsonTable01 : function(obj){
				$myDataModify.myData = obj;
				var container = document.getElementById('basic_handson01'); 
				var data = function() {
				  return Handsontable.helper.createSpreadsheetData(100, 12);
				};
				
				  var data = obj;
				  /*handHeight = $myDataModify.myData.length*30;
				  handHeight = handHeight + 10;*/
				  
				  handHeight = 30*10;
				  handHeight = handHeight + 10;
					
				  $myDataModify.hot = new Handsontable(container, {
					  data : $myDataModify.myData,
					  height : handHeight,
					  colHeaders : true,
					  rowHeaders : true,
					  stretchH : 'all',
					  columnSorting : true,
					  contextMenu:false,
					  currentRowClassName: 'currentRow',
					  outsideClickDeselects: false,
					  search: true
				  });
				  
				  
				$myDataModify.hot.updateSettings({
					cells: function (row, col, prop,td) {
						var cellProperties = {};
							if($myDataModify.wasGioCalc == false){
									if (col == $myDataModify.hot.countCols()-4 |col == $myDataModify.hot.countCols()-3 | col == $myDataModify.hot.countCols()-2 | col == $myDataModify.hot.countCols()-1 ) {
										cellProperties.editor = false;
										cellProperties.renderer = customRenderer;
						    		}
					    		}else{
					    			if (col == changeWord($myDataModify.gioField)) {
						    			cellProperties.editor = false;
						    			cellProperties.renderer = customRenderer;
						    		}
					    		}					    		
					    		return cellProperties;
					    	}
					  });
				  
				  
				  
				  
				  
				  $("#basic_handson01").handsontable("render");
				  /*$myDataModify.createCol();*/
			},
			
			handsonTable02 : function(obj){
				document.getElementById('basic_handson01').innerHTML = "";
				$myDataModify.myData = obj;
				var container = document.getElementById('basic_handson01');
				var data = function(){
					return Handsontable.helper.createSpreadsheetData(100, 12); 
				}
				var data = obj;
				
				  /*handHeight = $myDataModify.myData.length*30;
				  handHeight = handHeight + 10;*/
				  handHeight = 30*10;
				  handHeight = handHeight + 10;
				  $myDataModify.hot = new Handsontable(container, {
					  data : $myDataModify.myData,
					  height : handHeight,
					  colHeaders : true,
					  rowHeaders : true,
					  stretchH : 'all',
					  columnSorting : true,
					  /*columnSorting : true,*/
					  contextMenu:false
				  });
				  
				  $myDataModify.gioField = "b";
				  $myDataModify.hot.updateSettings({
				    	cells: function (row, col, prop,td) {
				    		var cellProperties = {};
				    		if (col == 1) {
				    			cellProperties.editor = false;
				    			cellProperties.renderer = customRenderer;
				    		}
				    		return cellProperties;
				    	},

					});
				  
				  $("#basic_handson01").handsontable("render");
				
				  
			},
			
			selectGroupValue : function(){
				
			},
			
			setGioCalc : function(){
				
				$myDataModify.tot_type = $("#awSelect01").val();
				
				$myDataModify.gioCalc = $("#awSelect02").val();
				$("#gioPop1").hide();
				
				//2017 07 31 [개발팀] 수정 시작
				var yearField ="";
				if($(":input:radio[name=calcYear]:checked").val() == "on"){
					yearField = $("#awSelect04").val();
				}
				//2017 07 31 [개발팀] 수정 종료		
				if($("#awSelect02").val() == "2"){
					$myDataModify.sumGioCalc($("#awSelect03").val(),yearField);
				}else{
					$myDataModify.countGioCalc($("#awSelect03").val(),yearField);
				}
				//집계할 컬럼을 선택 후 
				//집계구 (집계구 코드) / 합 요런식으로
				
				$("#gioCalcButton").hide();
				$("#addRow").hide();
				$("#removeRow").hide();
				$("#progeress").hide();
				
			},
			selectFieldCalc : function(){
				
				$myDataModify.fieldCalc = true;
				
				var col1 = $("#calcField1").val();
				var col2 = $("#calcField2").val();
				var col3 = $("#calcField3").val();
				var col4 = $("#calcField4").val();
				
				for(var i = 0;i<$myDataModify.hot.countRows();i++){
					var result;
					if(i !=0){
						if(col2 == "plus"){
							result = Number($myDataModify.hot.getDataAtCell(i,changeWord(col1))) + Number($myDataModify.hot.getDataAtCell(i,changeWord(col3)));
						}else if(col2 == "minus"){
							result = Number($myDataModify.hot.getDataAtCell(i,changeWord(col1))) - Number($myDataModify.hot.getDataAtCell(i,changeWord(col3)));
						}else if(col2 == "multiple"){
							result = Number($myDataModify.hot.getDataAtCell(i,changeWord(col1))) * Number($myDataModify.hot.getDataAtCell(i,changeWord(col3)));
						}else if(col2 == "divided"){
							result = Number($myDataModify.hot.getDataAtCell(i,changeWord(col1))) / Number($myDataModify.hot.getDataAtCell(i,changeWord(col3)));
							//2016-03-17 수정 소수점 둘째자리까지만 나오게 설정
							result = (new Number(result).toFixed(2) *100)/100;
							
						} 
						$myDataModify.hot.setDataAtCell(i,changeWord(col4),result);
					}
					
				}
				$("#gioPop2").hide();
			},
			
			
			
			createRowObjData : function(){
				$myDataModify.rowHeaderArray = new Array();
				$myDataModify.rowDataArray = new Array();
				
				for(var i = 2; i < $myDataModify.hot.countCols(); i ++){
					var tempHeaderObj = new Object();
					tempHeaderObj.COL_ID = changeNumber(i);
					tempHeaderObj.COL_NM = $myDataModify.hot.getDataAtCell(0,i);
					$myDataModify.rowHeaderArray[i-2] = tempHeaderObj;
				}
				
				//집계 안된거
				for(var i = 1; i < $myDataModify.hot.countRows();i++){
					if($myDataModify.hot.getDataAtCell(i,0) =="O"){
						var rowDataObject= new Object();
						var rowObjList = new Array();
						for(var j = 2; j < $myDataModify.hot.countCols();j++){
							var tempRowObj = new Object();
							tempRowObj[changeNumber(j)] = $myDataModify.hot.getDataAtCell(i,j);
							rowObjList[j-2] = tempRowObj;
						}
						rowDataObject.USR_DATA = rowObjList;
								
						rowDataObject.SEQ = i;
						rowDataObject.GEO_X = $myDataModify.hot.getDataAtCell(i,$myDataModify.hot.countCols()-4);
						rowDataObject.GEO_Y = $myDataModify.hot.getDataAtCell(i,$myDataModify.hot.countCols()-3);
						rowDataObject.TOT_REG_CD = $myDataModify.hot.getDataAtCell(i,$myDataModify.hot.countCols()-2);
						rowDataObject.ADM_CD = rowDataObject.TOT_REG_CD.substring(0,7);
						rowDataObject.ADM_NM = $myDataModify.hot.getDataAtCell(i,$myDataModify.hot.countCols()-1);
						$myDataModify.rowDataArray[i-1] = rowDataObject;
					}
					
				}
				
			},
			
			//집계된것 createRowObjData변형 
			createRowObjData2 : function(){
				
				//col
				$myDataModify.rowHeaderArray = new Array();
				for(var i = 1; i < $myDataModify.hot.countCols(); i ++){
					var tempHeaderObj = new Object();
					tempHeaderObj.COL_ID = changeNumber(i);
					tempHeaderObj.COL_NM = $myDataModify.hot.getDataAtCell(0,i);
					$myDataModify.rowHeaderArray[i-1] = tempHeaderObj;
				}

				//usrData
				for(var i = 1; i < $myDataModify.hot.countRows();i++){
					var rowObjList = new Array();
					for(var j = 1; j < $myDataModify.hot.countCols();j++){
						var tempRowObj = new Object();
						tempRowObj[changeNumber(j)] = $myDataModify.hot.getDataAtCell(i,j);
						rowObjList[j-1] = tempRowObj;
					}
					$myDataModify.rowDataArray[i-1].USR_DATA = rowObjList;
					$myDataModify.rowDataArray[i-1].ADM_CD =$myDataModify.rowDataArray[i-1].ADM_CD.trim();
				}
				
				$myDataModify.rowDataArray = $myDataModify.rowDataArray.splice(0,$myDataModify.hot.countRows()-1);
			},
			
			//Map Setting Start
			pselect : function(idx){
				var radioLength = $("input[name=rd_pselect]").length;
				for(var i =0;i<radioLength;i++){
					$("input[name=rd_pselect]").eq(i).attr("checked",false);
				}
				$("input[name=rd_pselect]").eq(idx-1).attr("checked","checked");
			},
			
			pck : function(idx){
				var checkLength = $("input[name=rd_pck]").length;
				var checkCount = 0;
				if($("input[name=rd_pck]").eq(idx -1).attr("checked") == "checked"){
					$("input[name=rd_pck]").eq(idx -1).attr("checked",false);
				}else{
					$("input[name=rd_pck]").eq(idx -1).attr("checked","checked");
				}
				
				var checkedLength = 0;
			
				$("input:checkbox[name=rd_pck]").each(function(i){
					/*if(this.checked){
						console.log(i);
						checkedLength = checkedLength+1;
					}*/
					
					if($("input[name=rd_pck]").eq(i).attr("checked")){
						checkedLength = checkedLength+1;
					}
					
				});
				
				if(checkedLength >3){
					alert("3개 이상 체크 불가");
					$("label[for='rd_pck"+idx+"']").removeClass("on");
					$("input[name=rd_pck]").eq(idx -1).attr("checked",false);
				}
				
			},
			
			ptype : function(idx){
				
				
				if(idx=="3"){
					idx=1;
				}else if(idx=="4"){
					idx=2;
				}
				
				var radioLength = $("input[name=rd_ptype]").length;
				for(var i =0;i<radioLength;i++){
					$("input[name=rd_ptype]").eq(i).attr("checked",false);
				}
				
				$("input[name=rd_ptype]").eq(idx-1).attr("checked","checked");
				$myDataModify.dataVisualSetting =$("input[name=rd_ptype]").eq(idx-1).val();
				
				
			},
			
			rdOptionCheck : function(idx){
				var checkLength = $("input[name=rd_option]").length;
				if($("input[name=rd_option]").eq(idx -1).attr("checked") == "checked"){
					$("input[name=rd_option]").eq(idx -1).attr("checked",false);
				}else{
					$("input[name=rd_option]").eq(idx -1).attr("checked","checked");
				}
			},
			
			
			 /* 
			  @name         : popMapGisSetting
			  @description  : 지도표출 설정시 팝업창을 띄움과 동시에 맵과 마커를 생성 한다.
			  @date         : 2015. 11. 10. 
			  @author	     : 최재영
			  @history 	 :*/
			popMapGisSetting : function(){
				
				if($myDataModify.fileType == "kml"){
					
					$("#mapSettingDisp").html("<li>kml은 표출 데이터를 <br> 설정 하지 않습니다</li>");
					 $("#mapSettingTooltip").html("<li>kml은 툴팁 데이터를 <br> 설정 하지 않습니다</li>");
					 
					 $("#disp_subj_3").hide();						 
					 $("#disp_content_3").hide();
					 
					 $("#mapSetting").show();
					 
					 
					var mapOptions = {
							statisticTileLayer: true
					};
					
					var customLayer = sop.geoJson(null, {
						onEachFeature: onEachFeature
					});

					function onEachFeature (feature, layer) {
						
						var name = feature.properties.name || '';
						var description = feature.properties.description || '';
						layer.bindInfoWindow( name + '<br>' + description);

						layer.on({
							click: function (e) {
								layer.openInfoWindow();
								
							}
						});
					}
					
					
					/*if($myDataModify.map == null ) {*/
						$myDataModify.map = sop.map('mapRgn_1',mapOptions);
					/*}*/
					$myDataModify.map.setView([953427, 1950827], 5);
					 
					 /*var runLayer = sop.kml("/DATA/docs/statsPotal/upload/myData/Placemark.kml")*/
					 //PlaceMark.kml 대신에 이제 사용자ID로 대체 가능
					 $myDataModify.runLayer = sop.kml("/upload/myData"+"/"+$myDataModify.FILE_NM_LOGIC,null,customLayer)
			            .on('ready', function(e) {
			                console.log(e);
			                $myDataModify.map.fitBounds(runLayer.getBounds());
			            }).addTo($myDataModify.map);
				}else{
					if($myDataModify.gioCalc != 1 | $myDataModify.wasGioCalc == true){
						$myDataModify.createRowObjData2();
					}else{
						$myDataModify.createRowObjData();
					}
					
					$myDataModify.popMapMenuSetting();
					
					/* 2017.08.01 [개발팀] 수정  */
					if($myDataModify.gioCalc != 1 | $myDataModify.wasGioCalc == true){
						$("#mapSettingDisp > li:eq(0)").hide();
					}
					/* 2017.08.01 [개발팀] 종료 */
					
					$("#mapSetting").show();
					$myDataModify.createMap("mapRgn_1", 0);
					
					$myDataModify.map.gMap.whenReady(function() {
						
						var radio1 = $("input:radio[name=rd_pselect]");
						var radio1Index = radio1.index(radio1.filter(":checked"));
						var checkList = new Array();
						var tempIdx = 0;
						$("input:checkbox[name=rd_pck]").each(function(i){
							if(this.checked == true){
								checkList.push(tempIdx);
							}
							tempIdx = tempIdx +1;
						});
						
						
						var markerIcon = sop.icon({
							iconUrl: '/js/plugins/jquery-easyui-1.4/images/marker-icon.png',
							shadowUrl: '/js/plugins/jquery-easyui-1.4/images/marker-shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
						//여기선 이제 열지도냐 아니냐로 보여줄수 있다.
						if($myDataModify.rowDataArray.length >= 1){
							for (var i = 0; i< $myDataModify.marker.length; i++) {
								var marker = $myDataModify.marker[i];
								marker.remove();
							}
							//열지도 삭제
							if($myDataModify.map.heatMap){
								$myDataModify.map.heatMap.setUTMKs([]);
							}
							
							
							if($myDataModify.dataVisualSetting=="location"){
								for (var i = 0; i< $myDataModify.marker.length; i++) {
									var marker = $myDataModify.marker[i];
									marker.remove();
								}
							
							
								for(var i=0;i<$myDataModify.rowDataArray.length;i++){
									var marker = sop.marker([$myDataModify.rowDataArray[i].GEO_X,$myDataModify.rowDataArray[i].GEO_Y],{
										icon:markerIcon
									});
								
									var html ="";
									html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
									html += 	'<tr>';
									html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' +$myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[radio1Index])))+":"+getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[radio1Index]); + '</strong></th>';
									html += 		'<td></td>';
									html += 	'</tr>';
									html += 	'<tr>';
									html +='<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;text-align:left">' ;
									for(var x = 0; x<checkList.length; x++){
										if(x != 0){
											html +="<br>";
										}
										
										var dataText = getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[checkList[x]]);
										if(dataText.length > 22){
											dataText = dataText.substring(0, 22) + "<br />" + dataText.substring(22);
										}
										
										
										html += $myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[checkList[x]])))+":"+ dataText;
									}
									html +='</th>';
									html += 		'<td></td>';
									html += 	'</tr>';
									html += '</table>';
								
									marker.bindInfoWindow(html);
									marker.addTo($myDataModify.map.gMap);
									$myDataModify.marker.push(marker);
								}

							}else if($myDataModify.dataVisualSetting=="ratio"){
								for(var i=0;i<$myDataModify.rowDataArray.length;i++){
									$myDataModify.map.addHeatMap($myDataModify.rowDataArray[i].GEO_X, $myDataModify.rowDataArray[i].GEO_Y, 1000);
								}

							}else if($myDataModify.dataVisualSetting=="colorFull" ||$myDataModify.dataVisualSetting=="bubble" ){
								//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
								//adm_cd는 adm_cd로 그냥 가면 된다.
								var resultList = new Array();
								var result = new Array();
								var resultArray = new Array();
							
								/*for(var i = 0 ; i < $myDataModify.rowDataArray.length;i++){*/
								for(var i = 1 ; i < $myDataModify.hot.countRows();i++){
									var resultRow = new Array();
									var rowAddressFullCode = $myDataModify.hot.getDataAtCell(i,changeWord($myDataModify.gioField));
									var startAdmIdx = rowAddressFullCode.indexOf("(");
									var endAdmIdx = rowAddressFullCode.indexOf(")");
									var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
									resultRow["adm_cd"] = rowAdmCode;
									/*if($myDataModify.tot_type !="4"){
										resultRow["adm_cd"] = $myDataModify.rowDataArray[i].ADM_CD;
									}else{
										resultRow["adm_cd"] = $myDataModify.rowDataArray[i].TOT_REG_CD;
									}*/
									
									//흠 데이터는 disp로 선택 한 (표출데이터로) 한 경우에만 보여주자 !!!
									//단 첫 집계시의 경우에는 무조건 집계한 필드에 대한 데이터를 가져오는게 좋을것 같다!!
									/*resultRow["data"] = getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[radio1Index]);*/
									
									resultRow["data"] = $myDataModify.hot.getDataAtCell(i,radio1Index +1);
									
									resultArray[i-1] = resultRow;
								}
								
								$myDataModify.map.selectedBoundList = [];
								for(var i = 0; i < resultArray.length; i ++){
									resultObject = new Array();
									//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
									if(i == 0){
										resultObject["id"] = "API_MYDATA"
										resultObject["result"] = new Array();
										resultObject["result"].push(resultArray[i]);
										if($myDataModify.tot_type =="1"){
											resultObject["pAdmCd"] = "00";
											resultList["00"] = resultObject;
										}else if($myDataModify.tot_type =="2"){
											resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
											resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
										}else if($myDataModify.tot_type =="3"){
											resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
											resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
										}else if($myDataModify.tot_type =="4"){
											resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
											resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
											
										}
										$myDataModify.map.selectedBoundList.push(resultObject);
										
									}else if(resultList["00"] != undefined){
										resultList["00"].result.push(resultArray[i]);
									}else if(resultList[resultArray[i].adm_cd.substring(0,2)] !=undefined ){
										resultList[resultArray[i].adm_cd.substring(0,2)].result.push(resultArray[i]);
									}else if(resultList[resultArray[i].adm_cd.substring(0,5)] != undefined){
										resultList[resultArray[i].adm_cd.substring(0,5)].result.push(resultArray[i]);
									}else if(resultList[resultArray[i].adm_cd.substring(0,7)] != undefined){
										resultList[resultArray[i].adm_cd.substring(0,7)].result.push(resultArray[i]);
									}else{
											resultObject["id"] = "API_MYDATA";
											resultObject["result"] = new Array();
											resultObject["result"].push(resultArray[i]);
											
											if($myDataModify.tot_type =="1"){
												resultObject["pAdmCd"] = "00";
												resultList["00"] = resultObject;
											}else if($myDataModify.tot_type =="2"){
												resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
												resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
											}else if($myDataModify.tot_type =="3"){
												resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
												resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
											}else if($myDataModify.tot_type =="4"){
												resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
												resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
											}
											$myDataModify.map.selectedBoundList.push(resultObject);
									}
								}
								
								for(var i in resultList){
									if(i != "isEmpty"){
										switch(resultList[i].pAdmCd.length) {
											case 2:
												if(resultList[i].pAdmCd =="00"){
													$myDataModify.map.curPolygonCode = 1;
												}else{
													$myDataModify.map.curPolygonCode = 2;
												}
												break;
											case 5:
												$myDataModify.map.curPolygonCode = 3;
												break;
											case 7:
												$myDataModify.map.curPolygonCode = 4;
												break;
										}
										
										var options = {
											params : {
												filter : "data",
												unit: "",
												adm_cd : resultList[i].pAdmCd,
												year : "2014"
											}	
										};
										if($myDataModify.dataVisualSetting !="colorFull"){
											$myDataModify.map.legend.selectType = "bubble";
										}
										
										$myDataModify.map.multiLayerControl.setStatsData("normal", resultList[i], options, false);
									}
									
								}
							}
						}
					});
				}
								
				
			},
			
			
			
			popMapMenuSetting : function(){
				var html = "";
				//표출데이터 설정
				//라디오 버튼 생성!!
				var i = 1;
				$.each($myDataModify.rowHeaderArray,function(key,value){					
					html +='<li>';
					if($myDataModify.dispData[i-1] == true){
						html +=	'<input type="radio" value="'+value.COL_NM+'" name="rd_pselect" id="rd_pselect'+i+'" checked="checked"/>';
						html +='<label for="rd_pselect'+i+'" class="on"><a href="javascript:$myDataModify.pselect('+i+')">'+value.COL_NM+'</a></label>';
					}else{
						html +=	'<input type="radio" value="'+value.COL_NM+'" name="rd_pselect" id="rd_pselect'+i+'"/>';
						html +='<label for="rd_pselect'+i+'" ><a href="javascript:$myDataModify.pselect('+i+')">'+value.COL_NM+'</a></label>';
					}
					html +='</li>';
					i = i + 1;
				});
				
				$("#mapSettingDisp").html(html);
				html = "";
				//체크박스 선택
				i = 1;
				$.each($myDataModify.rowHeaderArray,function(key,value){
					html +='<li>';
					if($myDataModify.tooltipSetting[i-1] ==true){
						html +=	'<input type="checkbox" value="'+value.COL_NM+'" name="rd_pck" id="rd_pck'+i+'" checked="checked"/>';
						html +='<label for="rd_pck'+i+'" class="on" onclick=""><a >'+value.COL_NM+'</a></label>';
					}else{
						html +=	'<input type="checkbox" value="'+value.COL_NM+'" name="rd_pck" id="rd_pck'+i+'"/>';
						html +='<label for="rd_pck'+i+'"><a>'+value.COL_NM+'</a></label>';
					}
					html +='</li>';
					i = i + 1;
				});
				
				$("#mapSettingTooltip").html(html);
				
				
				html = "";
				
				
				
				if($myDataModify.gioCalc != 1 | $myDataModify.wasGioCalc == true){
					
					if($myDataModify.dataVisualSetting !="bubble"){
						$myDataModify.dataVisualSetting = "colorFull";
						html += '<input type="radio" value="colorFull" name="rd_ptype" id="rd_ptype3" checked="checked">';
						html += '<label for="rd_ptype3" class="on" ><a >색상지도</a></label>';
						html += '<input type="radio" value="bubble" name="rd_ptype" id="rd_ptype4">';
						html += '<label for="rd_ptype4"><a >버블지도</a></label>';
					}else{
						$myDataModify.dataVisualSetting = "bubble"
						html += '<input type="radio" value="colorFull" name="rd_ptype" id="rd_ptype3">';
						html += '<label for="rd_ptype3"><a >색상지도</a></label>';
						html += '<input type="radio" value="bubble" name="rd_ptype" id="rd_ptype4" checked="checked">';
						html += '<label for="rd_ptype4" class="on"><a >버블지도</a></label>';
					}
					
				}else{
					if($myDataModify.dataVisualSetting =="location"){
						html += '<input type="radio" value="location" name="rd_ptype" id="rd_ptype1" checked="checked" >';
						html += '<label for="rd_ptype1" class="on" ><a >위치표시</a></label>';
						html += '<input type="radio" value="ratio" name="rd_ptype" id="rd_ptype2" >';
						html += '<label for="rd_ptype2"><a >열지도</a></label>';
					}else{
						$myDataModify.dataVisualSetting = "ratio";
						html += '<input type="radio" value="location" name="rd_ptype" id="rd_ptype1" >';
						html += '<label for="rd_ptype1"><a>위치표시</a></label>';
						html += '<input type="radio" value="ratio" name="rd_ptype" id="rd_ptype2" checked="checked" >';
						html += '<label for="rd_ptype2" class="on"><a >열지도</a></label>';
					}
					
				}
				
				$("#dispMapSelect").html(html);
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
				$myDataModify.map = new sMap.map();
				
				if($myDataModify.rowDataArray.length >= 1){
					$myDataModify.map.createMap($myDataModify, id, {
						center : [ $myDataModify.rowDataArray[0].GEO_X, $myDataModify.rowDataArray[0].GEO_Y ],
						zoom : 8, //9->8
						measureControl : false,
						statisticTileLayer: true
					});
				}else{
					$myDataModify.map.createMap($myDataModify, id, {
						center : [ 989674, 1818313 ],
						zoom : 8, 
						measureControl : false,
						statisticTileLayer: true
					});
				}
				$myDataModify.map.createHeatMap();
				$myDataModify.map.id = seq;
				var legend = new sLegendInfo.legendInfo($myDataModify.map);
				legend.initialize($myDataModify);
				/*legend.createLegend();*/
				
				$myDataModify.map.legend = legend;
				$myDataModify.map.legend.numberData = true;
				$myDataModify.map.legend.legendColor = ["#CCCCCC","#C5BAC0","#BFA9B5","#B998AA","#B3879E","#AD7693","#A76588","#A1547C","#9B4371","#953266"];
				
				//버블 그리기 재정의
				$myDataModify.map.legend.drawBubbleMap = function(geojson){
					var searchYear = "";
		    		var delegate = $myDataModify.map.delegate.ui;
		    		if (delegate != undefined && delegate.curDropParams != undefined && delegate.curDropParams[$myDataModify.map.id] != undefined) {
						for(var i = 0; i < delegate.curDropParams[$myDataModify.map.id].param.length; i ++) {
							if (delegate.curDropParams[$myDataModify.map.id].param[i].key == "year") {
								searchYear = delegate.curDropParams[$myDataModify.map.id].param[i].value + "년 ";
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
			    			
			    			var radioLength = $("input[name=rd_pselect]").length;
							var checkLength = $("input[name=rd_pck]").length;
							var radioValue;
							var checkValue = new Array();
							
							var radioIndex;
							var checkList = new Array();
							
							for(var i =0;i<radioLength;i++){
								if($("input[name=rd_pselect]").eq(i).attr("checked") =="checked"){
									radioValue = $("input[name=rd_pselect]").eq(i).val();
									radioIndex = i;
								}
							}
							
							for(var i =0; i<checkLength;i++){
								if($("input[name=rd_pck]").eq(i).attr("checked") =="checked"){
									checkValue.push($("input[name=rd_pck]").eq(i).val());
									checkList.push(i);
								}
							}
							
							
							
							var sMessage = "";
							for(var i = 0; i<$myDataModify.rowDataArray.length;i++){
								
								var rowAddressFullCode = $myDataModify.hot.getDataAtCell(i+1,changeWord($myDataModify.gioField));
								var startAdmIdx = rowAddressFullCode.indexOf("(");
								var endAdmIdx = rowAddressFullCode.indexOf(")");
								var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
								
								if($myDataModify.tot_type != "4"){
			    					/*if($myDataModify.rowDataArray[i].ADM_CD == layer.feature.properties.adm_cd){*/
									if(rowAdmCode == layer.feature.properties.adm_cd){
			    						for(var j = 0; j<checkList.length; j++){
			    							sMessage +="<tr style='font-size:12px;padding-left:5px;'>";
			    							sMessage +="<td>";
			    							/*sMessage +=$myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[checkList[j]])));*/
			    							sMessage +=$myDataModify.hot.getDataAtCell(0,checkList[j]+1);
			    							sMessage +=":";
			    							/*sMessage +=getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[checkList[j]]);*/
			    							sMessage +=$myDataModify.hot.getDataAtCell(i+1,checkList[j]+1);
			    							sMessage +="</td>";
			    							sMessage +="</tr>";
			    						}
			    					}
			    				}else{
			    					/*if($myDataModify.rowDataArray[i].TOT_REG_CD == layer.feature.properties.adm_cd){*/
			    					if(rowAdmCode == layer.feature.properties.adm_cd){
			    						for(var j = 0; j<checkList.length; j++){
			    							sMessage +="<tr style='font-size:12px;padding-left:5px;'>";
			    							sMessage +="<td>";
			    							//sMessage +=$myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[checkList[j]])));
			    							sMessage +=$myDataModify.hot.getDataAtCell(0,checkList[j]+1);
			    							sMessage +=":";
			    							//sMessage +=getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[checkList[j]]);
			    							sMessage +=$myDataModify.hot.getDataAtCell(i+1,checkList[j]+1);
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
				    			/*toolTip += 		"<tr>";
				    			toolTip += 			"<td style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</td>";
				    			toolTip +=		"</tr>";
				    			toolTip +=		"<tr style='height:5px;'></tr>";*/
				    			toolTip +=sMessage;
				    			/*toolTip += "<tr style='font-size:12px;padding-left:5px;'>";
				    			toolTip += 			"<td>"+appendCommaToNumber(data)+"</td>";
				    			toolTip +="</tr>";*/
				    			toolTip += "</table>";
			    			
				    			
				    		for (var i=0; i<$myDataModify.map.legend.legendColor.length; i++) {
				    			if (color == $myDataModify.map.legend.legendColor[i]) {
				    				idx = i;
				    				break;
				    			}
				    		}
				    			
				    		var marker = $myDataModify.map.addCircleMarker(x, y, {
				    			radius : $myDataModify.map.legend.legendCircleRadius[idx],
				    			fillColor : color,
				    			weight : 2,
				    			tooltipMsg : toolTip 
				    		});
				    		$myDataModify.map.legend.circleMarkerGroup.push(marker);
			    		}
			    	});	 
		    		
				}
				
				
			},
			
			reMakeMap : function(){
				$myDataModify.map.gMap.remove();
				$myDataModify.createMap("mapRgn_1", 0);
				
				for (var i = 0; i< $myDataModify.marker.length; i++) {
					var marker = $myDataModify.marker[i];
					marker.remove();
				}
				//열지도 삭제
				if($myDataModify.map.heatMap){
					$myDataModify.map.heatMap.setUTMKs([]);
				}
				
				var radioLength = $("input[name=rd_pselect]").length;
				var checkLength = $("input[name=rd_pck]").length;
				var radioValue;
				var checkValue = new Array();
				
				var radioIndex;
				var checkedIndex = new Array();
				
				for(var i =0;i<radioLength;i++){
					if($("input[name=rd_pselect]").eq(i).attr("checked") =="checked"){
						radioValue = $("input[name=rd_pselect]").eq(i).val();
						radioIndex = i;
					}
				}
				
				for(var i =0; i<checkLength;i++){
					if($("input[name=rd_pck]").eq(i).attr("checked") =="checked"){
						checkValue.push($("input[name=rd_pck]").eq(i).val());
						checkedIndex.push(i);
					}
				}
			
				
				if($myDataModify.dataVisualSetting =="location"){
					
					var markerIcon = sop.icon({
						iconUrl: '/js/plugins/jquery-easyui-1.4/images/marker-icon.png',
						shadowUrl: '/js/plugins/jquery-easyui-1.4/images/marker-shadow.png',
						iconAnchor: [12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					
					if($myDataModify.rowDataArray.length >=1){	
						for(var i=0;i<$myDataModify.rowDataArray.length;i++){
							
							var marker = sop.marker([$myDataModify.rowDataArray[i].GEO_X,$myDataModify.rowDataArray[i].GEO_Y],{
								icon:markerIcon
							});
							
							var html ="";
							html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
							html += 	'<tr>';
							var text1 = getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[radioIndex]);
							if(text1.length > 22){
								text1 = text1.substring(0, 22) + "<br />" + text1.substring(22);
							}
							html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + $myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[radioIndex])))+":"+ text1 + '</strong></th>';
							html += 		'<td></td>';
							html += 	'</tr>';
							html += 	'<tr>';
							
							html +='<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">'; 
							for(var x = 0; x<checkedIndex.length; x++){
								if(x != 0){
									html +="<br>";
								}
								var text2 = getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[checkedIndex[x]]);
								if(text2.length > 22){
									text2 = text2.substring(0, 22) + "<br />" + text2.substring(22);
								}
								html += $myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[checkedIndex[x]])))+":"+ text2;
							}
							html +="</th>";
							
							html += 		'<td></td>';
							html += 	'</tr>';
							html += '</table>';
							
							marker.bindInfoWindow(html);
							marker.addTo($myDataModify.map.gMap);
							$myDataModify.marker.push(marker);
						}
						
					}

				}else if($myDataModify.dataVisualSetting =="ratio"){
					if($myDataModify.rowDataArray.length >=1){
						for(var i=0;i<$myDataModify.rowDataArray.length;i++){
							$myDataModify.map.addHeatMap($myDataModify.rowDataArray[i].GEO_X, $myDataModify.rowDataArray[i].GEO_Y, 1000);
						}
					}
					
				}else if($myDataModify.dataVisualSetting =="colorFull" | $myDataModify.dataVisualSetting =="bubble"){
					
					var resultList = new Array();
					var result = new Array();
					var resultArray = new Array();
				
					for(var i = 0 ; i < $myDataModify.rowDataArray.length;i++){
						var resultRow = new Array();
						if($myDataModify.tot_type !="4"){
							resultRow["adm_cd"] = $myDataModify.rowDataArray[i].ADM_CD;
						}else{
							resultRow["adm_cd"] = $myDataModify.rowDataArray[i].TOT_REG_CD;
						}
						
						resultRow["data"] = getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[radioIndex]);
						resultArray[i] = resultRow;
					}
					
					$myDataModify.map.selectedBoundList = [];
					for(var i = 0; i < resultArray.length; i ++){
						resultObject = new Array();
						//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
						if(i == 0){
							resultObject["id"] = "API_MYDATA";
							resultObject["result"] = new Array();
							resultObject["result"].push(resultArray[i]);
							if($myDataModify.tot_type =="1"){
								resultObject["pAdmCd"] = "00";
								resultList["00"] = resultObject;
							}else if($myDataModify.tot_type =="2"){
								resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
								resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
							}else if($myDataModify.tot_type =="3"){
								resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
								resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
							}else if($myDataModify.tot_type =="4"){
								resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
								resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
							}
							$myDataModify.map.selectedBoundList.push(resultObject);
							
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
								
								if($myDataModify.tot_type =="1"){
									resultObject["pAdmCd"] = "00";
									resultList["00"] = resultObject;
								}else if($myDataModify.tot_type =="2"){
									resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
									resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
								}else if($myDataModify.tot_type =="3"){
									resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
									resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
								}else if($myDataModify.tot_type =="4"){
									resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
									resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
								}
								$myDataModify.map.selectedBoundList.push(resultObject);
						}
					}
					
					for(var i in resultList){
						if(i != "isEmpty"){
							switch(resultList[i].pAdmCd.length) {
								case 2:
									if(resultList[i].pAdmCd =="00"){
										$myDataModify.map.curPolygonCode = 1;
									}else{
										$myDataModify.map.curPolygonCode = 2;
									}
									break;
								case 5:
									$myDataModify.map.curPolygonCode = 3;
									break;
								case 7:
									$myDataModify.map.curPolygonCode = 4;
									break;
							}

							var options = {
								params : {
									filter : "data",
									unit: "합계",
									adm_cd : resultList[i].pAdmCd
								}	
							};
							if($myDataModify.dataVisualSetting !="colorFull"){
								$myDataModify.map.legend.selectType = "bubble";
							}else{
								$myDataModify.map.legend.selectType = "color";
							}
							$myDataModify.map.multiLayerControl.setStatsData("normal", resultList[i], options, false);
						}	
					}					
				}
			},
			
			
			//map Setting End
			confirmMapSetting : function(){
				
				$myDataModify.dispData = new Array();
				var radioLength =  $("input[name=rd_pselect]").length;
				for(var i =0;i<radioLength;i++){
					if($("input[name=rd_pselect]").eq(i).attr("checked") == "checked"){
						$myDataModify.dispData[i] = true;
					}else{
						$myDataModify.dispData[i] = false;
					}
				}
				
				
				$myDataModify.tooltipSetting = new Array();
				
				var checkLength = $("input[name=rd_pck]").length;
				
				for(var i = 0; i < checkLength; i++){
					if($("input[name=rd_pck]").eq(i).attr("checked") == "checked"){
						$myDataModify.tooltipSetting[i] = true;
					}else{
						$myDataModify.tooltipSetting[i] = false;
					}
				}
				
				
								
				var visLength = $("input[name=rd_ptype]").length;
				for(var i = 0; i < visLength; i ++){
					if($("input[name=rd_ptype]").eq(i).attr("checked") == "checked"){
						$myDataModify.dataVisualSetting =$("input[name=rd_ptype]").eq(i).val(); 
					}
				}
				
				var rdLength =  $("input[name=rd_option]").length;
				
				$myDataModify.rdOption = new Array();
				
				for(var i = 0 ; i < rdLength ; i ++){
					if($("input[name=rd_option]").eq(i).attr("checked") == "checked"){
						$myDataModify.rdOption.push($("input[name=rd_option]").eq(i).val()); 
					}
				}
				
				//저장시
				$myDataModify.saveMyData();
			},
			
			makeUsrData : function(myData){
				var rowDataSet = new Array();
				for(var i = 0; i<myData.length; i ++){
					var rowData = {};
					for(var j = 0; j < myData[i].USR_DATA.length; j++){
						var value = getFirstKeyValue(myData[i].USR_DATA[j]);
						/*rowData[$myDataModify.hot.getColHeader(j+1)] = value;*/
						rowData[$myDataModify.hot.getColHeader(j+2)] = value;
					}
					rowDataSet.push(rowData);
					
				}
				
				
				/*rowDataSet.sort();*/
				return JSON.stringify(rowDataSet);
				//console.log(JSON.stringify(rowDataSet));
				/* rowObjList 
				 * {c:대호갈비 옆상가 
				 *  d : 주소
				 *  E : 123
				 *  F : 456
				 * 
				 * */
			},
			makeMetaData : function(myData){
				var rowDataSet = new Array();
				
					var rowData = {};
					for(var j = 0; j < myData.length; j++){
						var value = myData[j].COL_NM;
						/*rowData[$myDataModify.hot.getColHeader(j+1)] = value;*/
						rowData[$myDataModify.hot.getColHeader(j+2)] = value;
					}
					

					rowDataSet.push(rowData);
					
				return JSON.stringify(rowDataSet);
				/*
				 * {c:명칭
				 *  d:주소
				 *  e:x좌표
				 *  f:y좌표
				 * }
				 */
			},
			saveMyData : function(){
				
				if($myDataModify.fileType == "kml"){
					//kml에서만 데이터 업데이트를 따로 설정 하는 방법이 필요 함..
					var rdLength =  $("input[name=rd_option]").length;
					
					$myDataModify.rdOption = new Array();
					
					for(var i = 0 ; i < rdLength ; i ++){
						if($("input[name=rd_option]").eq(i).attr("checked") == "checked"){
							$myDataModify.rdOption.push($("input[name=rd_option]").eq(i).val()); 
						}
					}
					
					$myDataModify.updateMyKmlData($("#data_uid").val(),$("#mpfSubj").val(),$myDataModify.rdOption);
					
				}else{
					var usrData = $myDataModify.makeUsrData($myDataModify.rowDataArray);
					var metaData = $myDataModify.makeMetaData($myDataModify.rowHeaderArray);
					
					if($myDataModify.gioCalc == 1){
						$myDataModify.updateMyData(usrData,metaData);
					}else{
						$("#gioPop3").show();
					}
				}
				
			},
			
			
			createRow : function(){
				var emptyRow = new Array();
				for(var i =0;i<$myDataModify.hot.countCols();i++){
					emptyRow[changeNumber(i)] = "";
				}
				emptyRow[0] = "X"; 
				emptyRow[1] = $myDataModify.hot.countRows();
				
				$myDataModify.myData.push(emptyRow);
				/*$myDataModify.hot.updateSettings({
				  columnSorting: true
			  	});*/   
				/*$("#basic_handson01").handsontable("render");*/
				/*$myDataModify.hot.updateSettings({
				  columnSorting: false
			  	}); */
				  $("#gioCoding").show();
				  $("#progeress").show();
			},
			removeRow : function(){
				$myDataModify.myData.pop();
			},
			createCol : function(){
				
				if($myDataModify.hot.countCols() < 26){
					/*$myDataModify.hot.alter('insert_col',$myDataModify.hot.countRows());*/
					if($myDataModify.gioCalc != 1 | $myDataModify.wasGioCalc == true){
						/* 2017.08.01 [개발팀] 수정 */
						if($myDataModify.wasYearList == true){
							
							$("#yearFieldName").val(new Date().getFullYear());
							$("#yearListAddPop").show();
						}else{
							$myDataModify.hot.alter('insert_col',$myDataModify.hot.countCols());
						}
						/* 2017.08.01 [개발팀] 종료 */
					}else{
						$myDataModify.hot.alter('insert_col',$myDataModify.hot.countCols()-4);
					}
					
					  $myDataModify.hot.updateSettings({
						  //columnSorting: true
					  }); 
					$("#basic_handson01").handsontable("render");
					  $myDataModify.hot.updateSettings({
						  //columnSorting: false
					  });
				}
				 
			},
			
			removeCol : function(){
				
				if($myDataModify.gioCalc != 1 | $myDataModify.wasGioCalc == true){
					
					if($myDataModify.hot.countCols() > 2 ){
						var gioFiledColNum = changeWord($myDataModify.gioField);
						if(gioFiledColNum == $myDataModify.hot.countCols()-1){
							$myDataModify.gioField = changeNumber(gioFiledColNum -1);
							for(var i =0;i<$myDataModify.hot.countRows();i++){
								$myDataModify.myData[i].splice($myDataModify.myData[i].length-2,1);
							}
						}else{
							if($myDataModify.wasYearList == true){
								$myDataModify.yearFieldDelete(changeNumber($myDataModify.hot.countCols()-1));
							}
							for(var i =0;i<$myDataModify.hot.countRows();i++){
								$myDataModify.myData[i].pop();
							}
						}
						
					}
				}else{
					if($myDataModify.hot.countCols() > 6 ){
						for(var i =0;i<$myDataModify.hot.countRows();i++){
							$myDataModify.myData[i].splice($myDataModify.myData[i].length-5,1);
						}					
					}
				}
				  $myDataModify.hot.updateSettings({
					  //columnSorting: true
				  }); 
				$("#basic_handson01").handsontable("render");
				  $myDataModify.hot.updateSettings({
					  //columnSorting: false
				  }); 
			},
			
			/* 2017.08.01 [개발팀] 수정 */
			/**
			 * 
			 * @name         : yearFieldAdd
			 * @description  : yearField로 집계한 경우 열 추가시
			 * @date         : 2017. 08. 01. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			yearFieldAdd : function(val){
				var col_id = changeNumber($myDataModify.hot.countCols());
				
				if(arrayLikeKeyDuplication($myDataModify.yearList , val)){
					$myDataModify.yearList[col_id] = val;
					$myDataModify.hot.alter('insert_col',$myDataModify.hot.countCols());
					$("#yearListAddPop").hide();
					
					var data = $myDataModify.hot.getDataAtCell(0,$myDataModify.hot.countCols()-2);
					
					$myDataModify.hot.setDataAtCell(0,$myDataModify.hot.countCols()-1,val + " 년도");
					
				}else{
					messageAlert.open("알림","현재 중복된 년도가 존재 합니다");
				}
				
				
			},
			
			/**
			 * 
			 * @name         : yearFieldDelete
			 * @description  : yearField로 집계한 경우 열 삭제시
			 * @date         : 2017. 08. 01. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			yearFieldDelete : function(val){
				$myDataModify.yearList = arrayLikeDeleteCol($myDataModify.yearList , val); 
			},
			
			
			/**
			 * 
			 * @name         : searchFailRow
			 * @description  : 지오코딩 실패한 ROW 검색 
			 * @date         : 2016. 06. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			searchFailRow : function(){
				var queryResult = [];
				var queryMethod = Handsontable.Search.global.getDefaultQueryMethod();
				for (var rowIndex = 0; rowIndex < $myDataModify.hot.countRows(); rowIndex++) {
				        var cellData = $myDataModify.hot.getDataAtCell(rowIndex, 0);
				        var cellProperties = $myDataModify.hot.getCellMeta(rowIndex, 0);
				        //var cellCallback = cellProperties.search.callback || callback;
				        var cellQueryMethod = cellProperties.search.queryMethod || queryMethod;
				        var testResult = cellQueryMethod("X", cellData);
				        if (testResult) {
				          queryResult.push(rowIndex);
				        }
				    }
				

				$myDataModify.failArray = new Array();
				for(var i = 0; i < queryResult.length; i ++ ){
					$myDataModify.failArray[i] = queryResult[i];
				}
				
				$myDataModify.currentSuccessCount = 0;
				$myDataModify.failCount = 0;
				$myDataModify.successCount = 0;
				$("#successCount").text("0");
				$("#failCount").text("0");
				$("#currentCodingRow").text("0");
				$("#maxCodingRow").text($myDataModify.failArray.length);
				
				if($myDataModify.gioCoding=="xy"){
					$myDataModify.getReverseGeoCode($myDataModify.gioX,$myDataModify.gioY);
				}else{
					$myDataModify.getGioCode($myDataModify.gioField);
				}
			},
			
			settingDispAndToolTip : function(metaData){
				for(var i = 0; i < metaData.length ; i++){
					
					if(metaData[i].CHECK_TYPE =="3"){
						// disp , tooltip
						$myDataModify.dispData[i] = true;
						$myDataModify.tooltipSetting[i]=true;
					}else if(metaData[i].CHECK_TYPE =="2"){
						//tooltip
						$myDataModify.dispData[i] = false;
						$myDataModify.tooltipSetting[i]=true;
					}else if(metaData[i].CHECK_TYPE =="1"){
						//disp
						$myDataModify.dispData[i] = true;
						$myDataModify.tooltipSetting[i]=false;
					}else{
						//nothing
						$myDataModify.dispData[i] = false;
						$myDataModify.tooltipSetting[i]=false;
					}
				}
				
			},
			sumGioCalc : function(sField , yearField){
				//선택 된 필드의 SUM !!!
				var tempSumArray = new Array();
				//2017 07 31 [개발팀] 수정 시작
				for(var i =0; i < $myDataModify.hot.countRows()-1; i++){
					var admStrArray = $myDataModify.hot.getDataAtCell(i+1,$myDataModify.hot.countCols()-1);
					admStrArray = admStrArray.split("_");
					var tempStr = $myDataModify.hot.getDataAtCell(i+1,$myDataModify.hot.countCols()-2);
					var admStr = "";
					
					for(var j = 0; j <$myDataModify.tot_type; j++ ){
						if(j !=0){
							if(j < 3){
								admStr += " "+ admStrArray[j];
							}
						}else{
							admStr += admStrArray[j];
						}
					}
					tempStr = $myDataModify.createAddUpTitleName(tempStr,admStr,$myDataModify.tot_type,yearField,i);
					if(tempSumArray[tempStr] != undefined){
						tempSumArray[tempStr] =Number(tempSumArray[tempStr]) + Number($myDataModify.hot.getDataAtCell(i+1,changeWord(sField)));
					}else{
						tempSumArray[tempStr] = Number($myDataModify.hot.getDataAtCell(i+1,changeWord(sField)));
					}
				}			
				//2017 07 31 [개발팀] 수정 종료
				$myDataModify.gioCalcMakeRowData(tempSumArray,$myDataModify.hot.getDataAtCell(0,changeWord(sField))+" 합계");
			},
			countGioCalc : function(sField ,yearField){
				//선택 된 필드의 카운트 !!!
				var tempSumArray = new Array();
				//2017 07 31 [개발팀] 수정 시작
				for(var i =0; i < $myDataModify.hot.countRows()-1; i++){
					var admStrArray = $myDataModify.hot.getDataAtCell(i+1,$myDataModify.hot.countCols()-1);
					admStrArray = admStrArray.split("_");
					var tempStr = $myDataModify.hot.getDataAtCell(i+1,$myDataModify.hot.countCols()-2);
					var admStr = "";
					
					for(var j = 0; j <$myDataModify.tot_type; j++ ){
						if(j !=0){
							if(j < 3){
								admStr += " "+ admStrArray[j];
							}
						}else{
							admStr += admStrArray[j];
						}
					}
					tempStr = $myDataModify.createAddUpTitleName(tempStr,admStr,$myDataModify.tot_type,yearField,i);
					if(tempSumArray[tempStr] != undefined){
						tempSumArray[tempStr] =Number(tempSumArray[tempStr]) + 1;
					}else{
						tempSumArray[tempStr] = 1;
					}
				}
				//2017 07 31 [개발팀] 수정 종료
				$myDataModify.gioCalcMakeRowData(tempSumArray,"빈도(카운트)");
			},
			
			
			/**
			 * 2017 07 31 [개발팀] 추가
			 * @name         : createAddUpTitleName
			 * @description  : sumGioCalc와 countGioCalc시 배열 키값 생성 함수
			 * @date         : 2017. 07. 25. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			createAddUpTitleName : function(str,admStr,tot_type,yearField,idx){
				
				var strName = "";
				
				if(tot_type == 1){
					strName = str.substring(0,2) + "_" + admStr;
				}else if(tot_type == 2){
					strName = str.substring(0,5) + "_" + admStr;
				}else if(tot_type == 3){
					strName = str.substring(0,7) + "_" + admStr;
				}else if(tot_type == 4){
					strName = str + "_" + admStr;
				}
				
				if(yearField != ""){
					strName += "_"+$myDataModify.hot.getDataAtCell(idx+1,changeWord(yearField));
				}
				return strName; 
			},
			
			gioCalcMakeRowData : function(sumArray,sumType){
				
				$myDataModify.createRowObjData();
				
				$myDataModify.hot.updateSettings({
					  //columnSorting: true
				}); 
				
				//완성된 sumArray는 Excel에 
				//gioCalc = 2 면 집계구 / 합 
				//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
				var i = 1;
				var gridArray= new Array();
				var fStr ="";
				//2017 07 31 [개발팀] 수정 시작
				if($myDataModify.tot_type == "1"){
					gridArray[0] = ["No","시도"];
					fStr = "시도";
				}else if($myDataModify.tot_type == "2"){
					gridArray[0] = ["No","시군구"];
					fStr = "시군구";
				}else if($myDataModify.tot_type == "3"){
					gridArray[0] = ["No","읍면동"];
					fStr = "읍면동";
				}else if($myDataModify.tot_type == "4"){
					gridArray[0] = ["No","집계구"];
					fStr = "집계구";
				}
				//2017 07 31 [개발팀] 수정 종료		
				
				//2017 07 31 [개발팀] 수정 시작
				if($(":input:radio[name=calcYear]:checked").val() == "on"){
					gridArray[0].push("!년도!");
				}
				gridArray[0].push(sumType);
				//2017 07 31 [개발팀] 수정 종료

				for(var key in sumArray){
					if(key !="isEmpty"){
						var rowArray = new Array();
						rowArray[0]= i;
						rowArray[1]= key.split("_")[1] +"("+key.split("_")[0].replace(/[^0-9]/g,'')+")";
						/*rowArray[2]= sumArray[key];*/
						if($(":input:radio[name=calcYear]:checked").val() == "on"){
							rowArray.push(key.split("_")[2]);
						}
						rowArray.push(sumArray[key]);
						
						gridArray[i] = rowArray;
						if($myDataModify.tot_type !="4"){
							/*$myDataModify.rowDataArray[i-1].ADM_CD = key.replace(/[^0-9]/g,'');*/
							$myDataModify.rowDataArray[i-1].ADM_CD = key.split("_")[0];
							/*var tempStr = $myDataModify.hot.getDataAtCell(i,$myDataModify.hot.countCols()-2);
							$myDataModify.rowDataArray[i-1].ADM_CD = temStr.substr(0,7);*/
						}else{
							/*$myDataModify.rowDataArray[i-1].TOT_REG_CD = key.replace(/[^0-9]/g,'');*/
							$myDataModify.rowDataArray[i-1].TOT_REG_CD = key.split("_")[0];
							/*var tempStr = $myDataModify.hot.getDataAtCell(i,$myDataModify.hot.countCols()-2);
							$myDataModify.rowDataArray[i-1].TOT_REG_CD = tempStr;*/
						}
						i = i +1;
					}
					
				}

				//2017 07 31 [개발팀] 수정 시작
				if($(":input:radio[name=calcYear]:checked").val() == "on"){
					$myDataModify.yearList = new Array();
					$myDataModify.wasYearList = true;
					for(var i =1; i < gridArray.length;i++){
						if(i == 1){
							gridArray[0][gridArray[0].length-1] = gridArray[i][gridArray[0].length-2] + " 년도 " + sumType;
							$myDataModify.yearList[changeNumber(2)] = gridArray[i][gridArray[0].length-2];
						}
						for(var j=1;j<gridArray.length;j++){
							//전체 어레이를 비교 해야함
							if(gridArray[i][1] == gridArray[j][1] && i != j && gridArray[i][1] != ""){
								var bAddColumn = true;

								for(key in $myDataModify.yearList){
									if($myDataModify.yearList[key] == gridArray[j][2]){
										bAddColumn = false;
									}
								}
								
								if(bAddColumn == true){
									gridArray[0].push("!년도!");
									gridArray[0].push(gridArray[j][gridArray[j].length-2] + " " + "년도" + " " +sumType);
									$myDataModify.yearList[changeNumber(2 + Object.keys($myDataModify.yearList).length)] = gridArray[j][gridArray[j].length-2];
								}
								
								if(gridArray[0].length != gridArray[i].length){
									while(gridArray[0].length> gridArray[i].length){
										gridArray[i].push(0);
									}
								}
								var inputKey = null;
								var inputIndex = null;
								
								//c : 2 / d : 4 / e : 6 / f : 8
								//    2       3       4       5

								//changeWord(c) -1
								//그 값에 *2
								for(key in $myDataModify.yearList){
									//열을 추가하지 않고 넣는다 하더라도 해당 값이 어느 열에 들어가야 하느냐가 현재 정확하지가 않음
									if($myDataModify.yearList[key] == gridArray[j][gridArray[j].length-2]){
										inputKey = key;
									}
								}
								
								inputIndex = (changeWord(inputKey)-1)*2;
								gridArray[i][Number(inputIndex)] = gridArray[j][gridArray[j].length-2];
								gridArray[i][Number(inputIndex)+1] = gridArray[j][gridArray[j].length-1];
								gridArray[j][1] = "";
							}else if(gridArray[i][1] == gridArray[j][1] && i == j && gridArray[i][1] != ""){
								
								var bAddColumn = true;

								for(key in $myDataModify.yearList){
									if($myDataModify.yearList[key] == gridArray[i][2]){
										bAddColumn = false;
									}
								}
								
								if(bAddColumn == true){
									gridArray[0].push("!년도!");
									gridArray[0].push(gridArray[j][gridArray[j].length-2] + " " + "년도" + " " +sumType);
									$myDataModify.yearList[changeNumber(2 + Object.keys($myDataModify.yearList).length)] = gridArray[j][2];
								}
								
								
								if(gridArray[0].length != gridArray[i].length){
									while(gridArray[0].length> gridArray[i].length){
										gridArray[i].push(0);
									}
								}
								var inputKey = null;
								var inputIndex = null;
								
								//c : 2 / d : 4 / e : 6 / f : 8
								//    2       3       4       5

								//changeWord(c) -1
								//그 값에 *2
								for(key in $myDataModify.yearList){
									//열을 추가하지 않고 넣는다 하더라도 해당 값이 어느 열에 들어가야 하느냐가 현재 정확하지가 않음
									if($myDataModify.yearList[key] == gridArray[i][2]){
										inputKey = key;
									}
								}
								
								inputIndex = (changeWord(inputKey)-1)*2;
								var inputValue = gridArray[i][3];
								gridArray[i][3] = 0;
								
								gridArray[i][Number(inputIndex)] = $myDataModify.yearList[inputKey];
								gridArray[i][Number(inputIndex)+1] = inputValue;
								
							}
						}
					}
					
					//잠시 최적화 종료
					
					var tempArray = new Array();
					for(var i = 0; i < gridArray.length; i++){
						if(gridArray[i][1] != ""){
							tempArray.push(gridArray[i]);
						}
					}
					
					gridArray = tempArray;
					
					for(var i =1; i < gridArray.length; i++){
						var innerTempArray = new Array();
						if(gridArray[i].length < gridArray[0].length){
							var gap =  gridArray[0].length - gridArray[i].length 
							for(var j = 0; j < gap ; j++){
								gridArray[i].push("0");
							}
						}
						for(var j = 0; j < gridArray[i].length; j++){
							if(gridArray[0][j] != "!년도!"){
								innerTempArray.push(gridArray[i][j]);
							}
						}
						gridArray[i] = innerTempArray;
												
					}
					
					tempArray = new Array();
					
					for(var i =0; i < gridArray[0].length; i++){
						if(gridArray[0][i] != "!년도!"){
							tempArray.push(gridArray[0][i]);
						}
					}
					gridArray[0] = tempArray;
				}
				//2017 07 31 [개발팀] 수정 종료
				
				
				//dispData 초기화
				//tooltipSetting 초기화
				$myDataModify.dispData = new Array();
				$myDataModify.tooltipSetting = new Array();
				
				for(var i =0; i <gridArray[0].length;i++){
					if(i==1){
						$myDataModify.dispData.push(true);
						$myDataModify.tooltipSetting.push(true);
					}else{
						$myDataModify.dispData.push(false);
						$myDataModify.tooltipSetting.push(false);
					}
				}

				$myDataModify.handsonTable02(gridArray);
				$("#basic_handson01").handsontable("render");
				
				if($myDataModify.dataVisualSetting =="location" | $myDataModify.dataVisualSetting =="ratio"){
					$myDataModify.dataVisualSetting=="colorFull";
				}
				
				$myDataModify.hot.updateSettings({
					  /*columnSorting: false*/
				}); 
				
				
			},
			
			getMyKmlData : function(file_path,file_nm_logic,file_nm_real){
				var openApiGetMyKmlData = new sop.portal.getMyKmlData.api();
				openApiGetMyKmlData.addParam("file_path",file_path);
				openApiGetMyKmlData.addParam("file_nm_logic",file_nm_logic);
				openApiGetMyKmlData.addParam("file_nm_real",file_nm_real);
				
				$myDataModify.FILE_NM_LOGIC = file_nm_logic;
				$myDataModify.FILE_PATH = file_path;
				$myDataModify.FILE_NM_REAL = file_nm_real;
				
				openApiGetMyKmlData.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/getMyKmlData.json",
				});
				
			},
			
			updateMyKmlData : function(data_uid,title,rdOption){
				var updateMyKml = new sop.portal.updateMyKmlData.api();
				updateMyKml.addParam("data_uid",data_uid);
				updateMyKml.addParam("subject",title);
				updateMyKml.addParam("rdOption",rdOption);				
				
				
				updateMyKml.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/updateMyKmlData.json", 
				});
			},
			
			
			callbackFunc : {
					didMouseOverPolygon : function(event, data, type, map) {
						
						var radioLength = $("input[name=rd_pselect]").length;
						var checkLength = $("input[name=rd_pck]").length;
						var radioValue;
						var checkValue = new Array();
						
						var radioIndex;
						var checkList = new Array();
						
						for(var i =0;i<radioLength;i++){
							if($("input[name=rd_pselect]").eq(i).attr("checked") =="checked"){
								radioValue = $("input[name=rd_pselect]").eq(i).val();
								radioIndex = i;
							}
						}
						
						for(var i =0; i<checkLength;i++){
							if($("input[name=rd_pck]").eq(i).attr("checked") =="checked"){
								checkValue.push($("input[name=rd_pck]").eq(i).val());
								checkList.push(i);
							}
						}
						
						
						
						var html ='<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
						
						if(data.info.length >=1){
								for(var i =0;i<$myDataModify.rowDataArray.length;i++){
									
									var rowAddressFullCode = $myDataModify.hot.getDataAtCell(i+1,changeWord($myDataModify.gioField));
									var startAdmIdx = rowAddressFullCode.indexOf("(");
									var endAdmIdx = rowAddressFullCode.indexOf(")");
									var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
									
									if($myDataModify.tot_type !="4"){
										/*if($myDataModify.rowDataArray[i].ADM_CD == data.info[0].adm_cd){*/
										if(rowAdmCode == data.info[0].adm_cd){
											html +=data.properties.adm_nm;
											for(var x = 0; x<checkList.length; x++){
												html +="<br>";
												/*html += $myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[checkList[x]])));*/
												html += $myDataModify.hot.getDataAtCell(0,checkList[x]+1);
												html +=":";
												/*html +=getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[checkList[x]]);*/
												html += $myDataModify.hot.getDataAtCell(i+1,checkList[x]+1);
												
											}
										}
									}else{
										/*if($myDataModify.rowDataArray[i].TOT_REG_CD == data.info[0].adm_cd){*/
										if(rowAdmCode == data.info[0].adm_cd){
											html +=data.properties.adm_nm;
											for(var x = 0; x<checkList.length; x++){
												html +="<br>";
												//html += $myDataModify.hot.getDataAtCell(0,changeWord(getFirstKey($myDataModify.rowDataArray[i].USR_DATA[checkList[x]])));
												html += $myDataModify.hot.getDataAtCell(0,checkList[x]+1);
												html +=":";
												//html +=getFirstKeyValue($myDataModify.rowDataArray[i].USR_DATA[checkList[x]]);
												html += $myDataModify.hot.getDataAtCell(i+1,checkList[x]+1);
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

						}).addTo($myDataModify.map.gMap)._showToolTip(event);
						
						
					}
			}
			
					
	},
	
	/** ********* Data 가져오기 ********* */
	(function() {
	    $class("sop.portal.getMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if(res.errCd == "0") {
	        		// kml 일경우 데이터 불러오는것을 바꾸어야 한다.
	        		var str = res.result[0].mainData.FILE_NM_REAL;
	        		var extName = str.split(".");
	        		
	        		if(extName[extName.length-1] == "kml"){
	        			$("#mpfSubj").val(res.result[0].mainData.DATA_TITLE);
	        			$myDataModify.fileType = "kml";

	        			if(res.result[0].mainData.SHARE_YN !="N"){
	        				$myDataModify.SHARE_YN = "Y";
	        				$("input[name=rd_option]").eq(0).attr("checked","checked");
	        				$("label[for='sharedChecked']").addClass("on");
	        			}

	        			if(res.result[0].mainData.USE_HISTORY !="N"){
	        				$myDataModify.USE_HISTORY = "Y";
	        				$("input[name=rd_option]").eq(1).attr("checked","checked");
	        				$("label[for='useHistoryChecked']").addClass("on");
	        			}
	        			$("#disp_subj_3").hide();
	        			$("#disp_content_3").hide();
	        			
	        			$myDataModify.getMyKmlData(res.result[0].mainData.FILE_PATH,res.result[0].mainData.FILE_NM_LOGIC,res.result[0].mainData.FILE_NM_REAL);
	        		}else{
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
		        		
		        		if(mainData.MAP_DISP_TYPE == "bubble" | mainData.MAP_DISP_TYPE=="colorFull"){
		        			$myDataModify.wasGioCalc = true; 
		        			$myDataModify.gioField = mainData.GIOFIELD;
		        			// 2017 08 01 [개발팀] 수정 시작 
		        			$myDataModify.yearList = jsonStringToArrayLike(mainData.GROUP_COL_LIST);
		        			if(Object.keys($myDataModify.yearList).length > 0){
		        				$myDataModify.wasYearList = true;
		        			}
		        			// 2017 08 01 [개발팀] 수정 종료
		        			$("#gioCalcButton").hide();
		        			$("#addRow").hide();
		        			$("#removeRow").hide();
		        			$("#progeress").hide();
		        		}
		        		
		        		$myDataModify.FILE_NM_REAL = mainData.FILE_NM_REAL;
		        		$myDataModify.tot_type = mainData.TOT_TYPE;
		        		$myDataModify.rowDataArray = uploadData;
		        		$myDataModify.gridHandSonTable(mainData,uploadData,metaData);
		        		$myDataModify.settingDispAndToolTip(metaData);
		        		
	        		}

	        	}else if(res.errCd == "-401"){	        		
	        	}
	        },
	        onFail : function(status, options) {

	        }
	    });
	}());
	
	/** ********* Data 업데이트 ********* */
	(function() {
	    $class("sop.portal.updateMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	location.href="/view/mypage/myData/dataList";
	        	if(res.errCd == "0") {
	        		
	        	}else if(res.errCd == "-401"){
	        		
	        	}
	        },
	        onFail : function(status, options) {
	        }
	        
	    });
	}());
	
	/** ********* Data 업데이트 ********* */
	(function() {
	    $class("sop.portal.newSaveMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	location.href="/view/mypage/myData/dataList";
	        	if(res.errCd == "0") {
	        		
	        	}else if(res.errCd == "-401"){
	        		
	        	}
	        },
	        onFail : function(status, options) {
	        }
	        
	    });
	}());
	
	
	/** ********* kml 데이터 가져오기 ********* */
	(function() {
	    $class("sop.portal.getMyKmlData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	
	        	if(res.errCd == "0") {
	        		document.getElementById('basic_handson01').innerHTML = "<textarea disabled cols='118' rows='10' style='resize: none;wrap:hard'>"+res.result[0].content+"</textarea>";
	        		$("#modifyButtonSpace").hide();
	        	}else if(res.errCd == "-401"){
	        		
	        	}
	        },
	        onFail : function(status, options) {
	        }
	        
	    });
	}());
	
	
	/** ********* kml 데이터 가져오기 ********* */
	(function() {
	    $class("sop.portal.updateMyKmlData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	location.href="/view/mypage/myData/dataList";	
	        	if(res.errCd == "0") {
	        		
	        	}else if(res.errCd == "-401"){
	        		
	        	}
	        },
	        onFail : function(status, options) {
	        }
	        
	    });
	}());
	
	
	
	
	/** ********* 세션 시간 증가 ********* */
	(function () {
		$class("sop.portal.sessionIncrease.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					// 2016. 03. 24 j.h.Seok modify
					if (result.sessionId == null) {
						Authobj = {
							authStatus : false
						}
					} else {
						Authobj = {
							authStatus : true
						}
					}

					AuthInfo = Authobj;
					getSession(Authobj.authStatus);
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	
	

	/** ********* OpenAPI 지오코딩 Start ********* */
	(function() {
	    $class("sop.openApi.openApiuserGeocode.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if(res.errCd == "0") {
	        		var idx = options.index;
	        		
	        		var maxIdx = options.maxIdx;
	        		$myDataModify.hot.setDataAtCell(options.index,0,"진행중");
	        		$myDataModify.hot.setDataAtCell(options.index,$myDataModify.hot.countCols()-4,res.result.resultdata[0].x);
	        		$myDataModify.hot.setDataAtCell(options.index,$myDataModify.hot.countCols()-3,res.result.resultdata[0].y);
	        		$myDataModify.firstX =  res.result.resultdata[0].x;
	        		$myDataModify.firstY =  res.result.resultdata[0].y;

	        		$myDataModify.openApifindcodeinsmallarea(options.index,res.result.resultdata[0].x,res.result.resultdata[0].y);
	        	}else if(res.errCd == "-401"){
	        		accessTokenInfo(function() {
	        			$myDataModify.openApiGeocode(options.index,options.addressCol);
	        		});
	        	}else{
	        		//failCount +
	        		var idx = options.index;
	        		var maxIdx = options.maxIdx;
	        		$myDataModify.failCount = $myDataModify.failCount + 1;
	        		$("#failCount").text($myDataModify.failCount);

	        		if($myDataModify.currentSuccessCount <= maxIdx){
	        			$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
						$("#currentCodingRow").text($myDataModify.currentSuccessCount);
						
						$myDataModify.hot.setDataAtCell(options.index,0,"X");
						if($myDataModify.currentSuccessCount !=maxIdx){
							//$myDataModify.openApiGeocode(options.index +1 ,options.addressCol);
						}else{
							$myDataModify.onBlockUIClose();
	        				$("#mapDisp").css("display","");
	        				//$myDataModify.showFailButton();
	        				//끝났을떄
						}
	        		}else{	
	        			$myDataModify.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				//$myDataModify.showFailButton();
        				//끝났을때
	        		}
	        	}
	        	
	        	
	        },
	        onFail : function(status, options) {
        		//failCount +
	        	$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
	        	$("#currentCodingRow").text($myDataModify.currentSuccessCount);
	        	$myDataModify.failCount = $myDataModify.failCount + 1;
	        	$("#failCount").text($myDataModify.failCount);
	        	var idx = options.index;
        		
        		
        		var maxIdx = options.maxIdx;
        		if($myDataModify.currentSuccessCount <=maxIdx){
        			$myDataModify.hot.setDataAtCell(options.index,0,"X");
        			if($myDataModify.currentSuccessCount !=maxIdx){
						//$myDataModify.openApiGeocode(options.index +1 ,options.addressCol);
					}else{
						$myDataModify.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				/*$myDataModify.showFailButton();*/
        				//끝났을때
					}
        			
        		}else{
        			$myDataModify.onBlockUIClose();
    				$("#mapDisp").css("display","");
    				/*$myDataModify.showFailButton();*/
    				//끝났을때
        		}
	        }
	    });
	}());
	
	
	
	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.myDataReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if (res.errCd == "0") {
					var idx = options.idx;
					var maxIdx = options.maxIdx;
					
					$myDataModify.hot.setDataAtCell(options.idx,0,"진행중");
					
					$myDataModify.firstX = options.x;
					$myDataModify.firstY = options.y;
					
					$myDataModify.hot.setDataAtCell(options.idx,$myDataModify.hot.countCols()-4,options.x);
					$myDataModify.hot.setDataAtCell(options.idx,$myDataModify.hot.countCols()-3,options.y);
					$myDataModify.openApifindcodeinsmallarea(options.idx,options.x,options.y);
					
					/*if(idx <=maxIdx){
						$myDataModify.openApifindcodeinsmallarea(options.idx,options.x,options.y);
						if(idx !=maxIdx){
							//$myDataModify.openApiReverseGeoCode(options.idx+1,options.xCol,options.yCol);
						}	
					}*/
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						$myDataModify.openApiReverseGeoCode(options.idx,options.xCol,options.yCol);
	        		});
				}
				else {
					var idx = options.idx;
					idx = idx+1;
					var maxIdx = options.maxIdx;
					$myDataModify.failCount = $myDataModify.failCount + 1;
					$("#failCount").text($myDataModify.failCount);
					if($myDataModify.currentSuccessCount <= maxIdx){
	        			$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
						$("#currentCodingRow").text($myDataModify.currentSuccessCount);
						$myDataModify.hot.setDataAtCell(options.idx,0,"X");
						if($myDataModify.currentSuccessCount !=maxIdx){
							$myDataModify.openApiReverseGeoCode(options.idx+1,options.xCol,options.yCol);
						}else{
							$myDataModify.onBlockUIClose();
	        				$("#mapDisp").css("display","");
	        				/*$myDataModify.showFailButton();*/
	        				//끝났을때
						}
						
					}else{
						$myDataModify.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				/*$myDataModify.showFailButton();*/
        				//끝났을때
					}
					
					
					
				}
			},
			onFail : function (status) {
				$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
				$myDataModify.failCount = $myDataModify.failCount + 1;
				$("#failCount").text($myDataModify.failCount);
				$("#currentCodingRow").text($myDataModify.currentSuccessCount);
				
				var idx = options.idx;
				idx = idx+1;
				var maxIdx = options.maxIdx;
				if($myDataModify.currentSuccessCount <= maxIdx){
        			$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
					$("#currentCodingRow").text($myDataModify.currentSuccessCount);
					$myDataModify.hot.setDataAtCell(options.idx,0,"X");
					if($myDataModify.currentSuccessCount !=maxIdx){
						//$myDataModify.openApiReverseGeoCode(options.idx+1,options.xCol,options.yCol);
					}else{
						$myDataModify.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				/*$myDataModify.showFailButton();*/
					}
					
				}else{
					$myDataModify.onBlockUIClose();
    				$("#mapDisp").css("display","");
    				/*$myDataModify.showFailButton();*/
				}
				
			}
		});
	}());
	
	/** ********* OpenAPI 소지역구 Start ********* */
	(function () {
		$class("sop.openApi.findcodeinsmallarea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
							
				if (res.errCd == "0") {
					
					$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
					$("#currentCodingRow").text($myDataModify.currentSuccessCount);
						
					try{
						$myDataModify.hot.setDataAtCell(options.idx,0,"O");
						$myDataModify.hot.setDataAtCell(options.idx,$myDataModify.hot.countCols()-2,res.result.tot_reg_cd);
						$myDataModify.hot.setDataAtCell(options.idx,$myDataModify.hot.countCols()-1,res.result.sido_nm+"_"+res.result.sgg_nm+"_"+res.result.emdong_nm);
						
						$myDataModify.successCount = $myDataModify.successCount + 1;
						$("#successCount").text($myDataModify.successCount);
						
					}catch(err){
						//충청북도에 대한 데이터가 미존재 하여 예외처리
						/*console.log("해당 지역에 대한 데이터는 존재 하지 않습니다.");*/
						$myDataModify.hot.setDataAtCell(options.idx,0,"X");
						$myDataModify.failCount = $myDataModify.failCount + 1;
						$("#failCount").text($myDataModify.failCount);
					}
					
					//sido_nm: "서울특별시"
					//sgg_nm: "마포구"
					//emdong_nm: "성산2동"
					if(Number($myDataModify.successCount) + Number($myDataModify.failCount) >= $myDataModify.endPointIndex ){
						$myDataModify.onBlockUIClose();
	    				$("#mapDisp").css("display","");
	    				/*$myDataModify.showFailButton();*/
	    				//끝났을때
	    				
					}
					
				}
				else if (res.errCd == "-401") {
					/*$myDataModify.hot.setDataAtCell(options.idx,0,"X");*/
					accessTokenInfo(function() {
						$myDataModify.openApifindcodeinsmallarea(options.idx,options.x_coor,options.y_coor);
	        		});
				} else {
					$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
					$myDataModify.failCount = $myDataModify.failCount + 1;
					$("#failCount").text($myDataModify.failCount);
					$("#currentCodingRow").text($myDataModify.currentSuccessCount);					
					$myDataModify.hot.setDataAtCell(options.idx,0,"X");
					
					if(Number($myDataModify.successCount) + Number($myDataModify.failCount) == $myDataModify.endPointIndex ){
						$myDataModify.onBlockUIClose();
	    				$("#mapDisp").css("display","");
	    				/*$myDataModify.showFailButton();*/
	    				//끝났을때
	    				
					}
				}
			},
			onFail : function (status,options) {
				
				$myDataModify.currentSuccessCount = $myDataModify.currentSuccessCount + 1;
				$myDataModify.failCount = $myDataModify.failCount + 1;
				$("#failCount").text($myDataModify.failCount);
				$("#currentCodingRow").text($myDataModify.currentSuccessCount);
				
				$myDataModify.hot.setDataAtCell(options.idx,0,"X");
				
				if(Number($myDataModify.successCount) + Number($myDataModify.failCount) == $myDataModify.endPointIndex ){
					$myDataModify.onBlockUIClose();
    				$("#mapDisp").css("display","");
    				/*$myDataModify.showFailButton();*/
    				//끝났을때
    				
				}
			}
		});
	}());
	
	
	
	
	
	
}(window.document));



function inputEvent(){
	$("body").on("click",".radio label",function(){
		
		$(this).parents("ul").eq(0).find("label").removeClass("on");
		$(this).addClass("on");
		
		var ckName = $(this).attr("for");
		var ckStr = ckName.split("_");
		if(ckStr.length >1){
			if(stat =="1"){
				
				if(ckStr[1].replace(/[0-9]/g, "") =="ptype"){
					$myDataModify.ptype(ckName.replace(/[^0-9]/g,''));
				}else{
					$myDataModify.pselect(ckName.replace(/[^0-9]/g,''));
				}
				
				
			}
		}else{
			
			$("#"+ckName).attr("checked","checked");
		}
		
		
    });
	$("body").on("click",".ckbox label",function(){
		
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
		
		var ckName = $(this).attr("for");
		var ckStr = ckName.split("_");
		if(ckStr.length >1){
			if(stat =="1"){
				$myDataModify.pck(ckName.replace(/[^0-9]/g,''));
			}
		}else{
			
			if(ckName == 'sharedChecked'){
				$myDataModify.rdOptionCheck(1);
			}else if(ckName == 'useHistoryChecked'){
				$myDataModify.rdOptionCheck(2);
			}else{
				$("#"+ckName).attr("checked","checked");
			}
			
		}
		
    });
}
