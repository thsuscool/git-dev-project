/**
 * 통계 소통지도 일괄 업로드
 * 
 * history : (주)유코아시스템, 1.0, 2016/6/8  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$(document).ready(function(){
		$communityBatch.event.setUIEvent();
	});
	W.$communityBatch = W.$communityBatch || {};
	$communityBatch = {
		ui:{
			lastSelectedHandsontable : [],//마지막으로 선택한 위치
			hasValidation : false,//검증 진행 유무
			successValidation : false,//검증 성공 유무
			geocount : 0,//geo코딩 진행중인 개수
			/**
			 * @name             : $communityBatch.ui.openApiGeocode
			 * @description      : geocode
			 * @date             : 2016. 06. 09.
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param row        : 행
			 * @param address    : 주소
			 */
			openApiGeocode : function (row,address) {
				var obj = new sop.openApi.batch.geocode.api();
				obj.onBlockUIPopup();
				obj.addParam("accessToken", accessToken);
				obj.addParam("address", address);
				obj.addParam("pagenum", "0");
				obj.addParam("resultcount", "1");
				obj.request({
					method : "GET",
					async : true,
					url : openApiPath+"/OpenAPI3/addr/geocode.json",
					options : {
						row : row,
						address : address
					}
				});
			},
			/**
			 * @name             : $communityBatch.ui.openApiReverseGeocode
			 * @description      : rgeocode
			 * @date             : 2016. 06. 09.
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param row        : 행
			 * @param x_coor     : X좌표
			 * @param y_coor     : Y좌표
			 */
			openApiReverseGeocode : function (row,x_coor,y_coor) {
				var obj = new sop.openApi.batch.rgeocode.api();
				obj.onBlockUIPopup();
				obj.addParam("accessToken", accessToken);
				obj.addParam("x_coor", x_coor);
				obj.addParam("y_coor", y_coor);
				obj.addParam("addr_type", "20");
				obj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						row : row,
						x_coor : x_coor,
						y_coor : y_coor
					}
				});
			},
			/**
			 * @name             : $communityBatch.ui.dataValidation
			 * @description      : 데이터 검증
			 * @date             : 2016. 06. 09.
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param row        : 행
			 */
			dataValidation : function(row){
				$communityBatch.ui.hasValidation = true;
				var data = $("#basic_handson").handsontable("getDataAtRow",row);
				var errorMessage = [];
				if(data[2]==null||data[2].length<=0){
					errorMessage.push("제목을 입력해주세요");
				}else{
					if(data[2].length>30){
						errorMessage.push("제목은 최대 30자까지 작성하실 수 있습니다");
					}
				}
				if(data[6]==null||data[6].length<=0){
					errorMessage.push("의견기재 해주세요");
				}else{
					if(data[6].length>150){
						errorMessage.push("의견기재는 최대 150자까지 작성하실 수 있습니다");
					}
				}
				var checkedCnt = 0;
				for(var i=7;i<data.length;i++){
					if(data[i]=="yes"){
						checkedCnt++;
					}
				}
				if(checkedCnt<=0){
					errorMessage.push("아이콘은 선택해주세요");
				}else{
					if(checkedCnt>1){
						errorMessage.push("아이콘은 하나만 선택할 수 있습니다");
					}
				}
				if(errorMessage.length>0){
					$communityBatch.ui.successValidation = false;
					incrementCount("failCount");
					decreaseCount("successCount");
					$("#basic_handson").handsontable("setDataAtCell", row, 0, errorMessage.join("\n"));
				}else{
					$("#basic_handson").handsontable("setDataAtCell", row, 0, "O");
				}
			}
		}
	};
	

	$communityBatch.event = {	
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 6. 8. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			accessTokenInfo();
			$("#mpsFile").change(function(){
				var abs = new sop.portal.absAPI();
				abs.onBlockUIPopup();
				var file = $(this)
				initValid(function(){
					$("#preview-button,#save-button").hide();
					$("input[name=myData_regist_file]").val(file[0].files[0].name);
					var formData = new FormData();
					formData.append("mpsFile", file[0].files[0]);
					formData.append("cmmnty_map_id",$communityMapCommon.getParameter("cmmnty_map_id"));
					$.ajax({
						url: contextPath+"/view/community/getBatchData",
						data: formData,
						processData: false,
						contentType: false,
						async: true,
						type: 'POST',
						success: function(res) {
							abs.onBlockUIClose();
							if(res.errCd=="0"){
								$("#gioCoding,#hondsontable-box,#tableRowChange").show();
								$("#maxCodingRow").text(res.result.data.length);
								res.result.afterCreateRow = function(index, numberOfRows){
									setTimeout(function(){
										$("#basic_handson").handsontable("selectCell", index,0);
									},1);
								};
								res.result.modifyTransformStart = function(changes, source){
									initValid(function(){
										$("#preview-button,#save-button").hide();
									});
								};
								res.result.afterSelectionEnd = function(startRow,startCell,endRow,endCell){
									$communityBatch.ui.lastSelectedHandsontable = [startRow,startCell,endRow,endCell];
								};
								res.result.beforeSetRangeEnd = function(coords){
									$communityBatch.ui.lastSelectedHandsontable = [0,0,coords.row,0];
								};
								$("#basic_handson").handsontable("destroy");
								$("#basic_handson").height(300).handsontable(res.result);
							}else{
								$communityMapCommon.alert("알림",res.message);
							}
						},
						error: function(data){
							abs.onBlockUIClose();
							$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.");
						}
					});
				});
			});
			$("#gioCoding").click(function(){
				function init(callback){
					$.each($("#basic_handson").handsontable("getData"),function(cnt,node){
						$("#basic_handson").handsontable("setDataAtCell", cnt, 0, "진행중");
					});
					initValid(callback);
					$("#preview-button,#save-button").show();
				}
				$communityMapCommon.confirm(
					"알림","지오코딩은 지도에 표시할 X, Y 좌표을 찾는 과정입니다.<br>이미 X, Y 좌표가 있고, 지오코딩을 실행하지 않으시려면 “좌표로 지오코딩”을 클릭하세요.<br>X, Y 좌표값을 찾기 위해서는 “주소”정보가 필요합니다. “주소로 지오코딩”을 클릭하시고 주소 필드를 선택해주세요.",[{
						title : "좌표로 지오코딩",
						func : function(opt) {
							init(function(){
								$.each($("#basic_handson").handsontable("getData"),function(cnt,node){
									$communityBatch.ui.openApiReverseGeocode(cnt,node[4],node[5]);
								});
							});
						}
					},{
						title : "주소로 지오코딩",
						func : function(opt) {
							init(function(){
								$.each($("#basic_handson").handsontable("getDataAtCol",3),function(cnt,node){
									$communityBatch.ui.openApiGeocode(cnt,node);
								});
							});
						}
					}
				]);
				return false;
			});
			$("#preview-button").click(function(){
				if(isValidPass()){
					$communityBatchMap.ui.preview();
				}
			});
			$("#save-button").click(function(){
				if(isValidPass()){
					var abs = new sop.portal.absAPI();
					abs.onBlockUIPopup();
					var getData = $("#basic_handson").handsontable("getData"); 
					$.ajax({
						type: "POST",
						url : contextPath + "/view/community/poi/regist",
						data:{
							cmmnty_map_id:$communityMapCommon.getParameter("cmmnty_map_id"),
							data:JSON.stringify(getData)
						},
						dataType: "json",
						async : true,
						success: function(res) {
							abs.onBlockUIClose();
							if(res.success){
								$communityMapCommon.alert("알림","등록되었습니다",function(){
									location.href = contextPath+"/view/community/view?cmmnty_map_id="+$communityMapCommon.getParameter("cmmnty_map_id");
								});
							}else{
								if(res.message){
									$communityMapCommon.alert("알림",res.message);
								}else{
									$communityMapCommon.alert("알림","데이터 검증을 실패하였습니다. 데이터를 확인해주세요.");
								}
								if(res.error){
									$.map(res.error,function(value,key){
										$("#basic_handson").handsontable("setDataAtCell", key, 0, value.join("\n"));
									});
								}
								if(res.errCd!=-201){
									$.each(getData,function(cnt,node){
										var inMessage = $("#basic_handson").handsontable("getDataAtCell", cnt, 0);
										if(inMessage==undefined||inMessage==null||inMessage.replace(/ /gi,"")==""){
											$("#basic_handson").handsontable("setDataAtCell", cnt, 0, "O");
										}
									});
								}
							}
						},
						error: function(xhr, status, errorThrown) {
							abs.onBlockUIClose();
							$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.");
						}
					});
				}
			});
			$("#add-row").click(function(){
				var element = $("#basic_handson");
				element.handsontable("alter", "insert_row");
				element.handsontable("render");
				renumber();
				return false;
			});
			$("#delete-row").click(function(){
				if($communityBatch.ui.lastSelectedHandsontable.length>0){
					var last = $communityBatch.ui.lastSelectedHandsontable;
					var lastRow = last[0];
					$("#basic_handson").handsontable("alter", "remove_row", lastRow,last[0]-last[2]);
					var lastRowIndex = $("#basic_handson").handsontable("getData").length-1;
					if(lastRowIndex<lastRow){
						lastRow = lastRowIndex;
						$communityBatch.ui.lastSelectedHandsontable[0] = lastRow;
						$communityBatch.ui.lastSelectedHandsontable[2] = lastRow;
					}
					$("#basic_handson").handsontable("selectCell", lastRow,last[1]);
					renumber();
				}
				return false;
			});
		}
	};
	/**
	 * @name             : renumber
	 * @description      : 2번째에 있는 "No" 열에 있는 숫자 다시 등록
	 * @date             : 2016. 06. 10.
	 * @author	         : 나광흠
	 * @history 	     :
	 */
	function renumber(){
		var data = $("#basic_handson").handsontable("getData");
		$("#maxCodingRow").text(data.length);
		$.each(data,function(cnt,node){
			$("#basic_handson").handsontable("setDataAtCell", cnt, 1, cnt+1);
		});
	}
	/**
	 * @name             : initValid
	 * @description      : 검증 전 초기화
	 * @date             : 2016. 06. 10.
	 * @author	         : 나광흠
	 * @history 	     :
	 * @param callback   : callback
	 */
	function initValid(callback){
		$("#successCount,#failCount,#currentCodingRow").text(0);
		$communityBatch.ui.hasValidation = false;
		$communityBatch.ui.successValidation = true;
		$communityBatch.ui.geocount = 0;
		if(typeof callback === "function"){
			callback();
		}
	}
	/**
	 * @name             : incrementCount
	 * @description      : 숫자 증가
	 * @date             : 2016. 06. 10.
	 * @author	         : 나광흠
	 * @history 	     :
	 * @param id         : element id
	 */
	function incrementCount(id){
		if($.isNumeric($("#"+id).text())){
			$("#"+id).text(parseInt($("#"+id).text())+1);
		}else{
			$("#"+id).text(1);
		}
	}
	/**
	 * @name             : decreaseCount
	 * @description      : 숫자 감소
	 * @date             : 2016. 06. 10.
	 * @author	         : 나광흠
	 * @history 	     :
	 * @param callback   : callback
	 */
	function decreaseCount(id){
		if($.isNumeric($("#"+id).text())){
			if(parseInt($("#"+id).text())<=0){
				$("#"+id).text(parseInt($("#"+id).text())-1);
			}else{
				$("#"+id).text(0);
			}
		}else{
			$("#"+id).text(0);
		}
	}
	/**
	 * @name                     : isValidPass
	 * @description              : 검증된지 여부
	 * @date                     : 2016. 06. 10.
	 * @author	                 : 나광흠
	 * @history 	             :
	 */
	function isValidPass(){
		if($communityBatch.ui.hasValidation){
			if($("#basic_handson").handsontable("countRows")==$communityBatch.ui.geocount){
				if($.isNumeric($("#failCount").text())&&parseInt($("#failCount").text())<=0){
					if($communityBatch.ui.successValidation){
						return true;
					}else{
						$communityMapCommon.alert("알림","데이터 검증을 실패하였습니다. 데이터를 확인해주세요.");
					}
				}else{
					$communityMapCommon.alert("알림","위치 조회 실패한 건수가 존재합니다.");
				}
			}else{
				$communityMapCommon.alert("알림","위치 조회중입니다, 잠시만 기다려주세요.");
			}
		}else{
			$communityMapCommon.alert("알림","위치조회(위치코딩) 및 데이터 검증을 해주세요");
		}
		return false;
	}
	/*********** OpenAPI 지오코딩 Start **********/
	(function() {
	    $class("sop.openApi.batch.geocode.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	this.onBlockUIClose();
	        	incrementCount("currentCodingRow");
	        	$communityBatch.ui.geocount++;
	        	if(res.errCd == "0") {
	        		incrementCount("successCount");
	        		$communityBatch.ui.dataValidation(options.row);
	        		$("#basic_handson").handsontable("setDataAtCell", options.row, 4, res.result.resultdata[0].x);
	        		$("#basic_handson").handsontable("setDataAtCell", options.row, 5, res.result.resultdata[0].y);
	        	}else if(res.errCd == "-401"){
	        		accessTokenInfo(function() {
	        			initValid(function(){
	        				decreaseCount("currentCodingRow");
	        				$communityBatch.ui.openApiGeocode(options.row,options.address);
	        			});
	        		});
	        	}else{
	        		incrementCount("failCount");
	        		$("#basic_handson").handsontable("setDataAtCell", options.row, 0, "X");
	        	}
	        },
	        onFail : function(status, options) {
	        	this.onBlockUIClose();
	        	incrementCount("failCount");
	        	$("#basic_handson").handsontable("setDataAtCell", options.row, 0, "X");
	        }
	    });
	}());
	/*********** OpenAPI 리버스 지오코딩 Start **********/
	(function() {
		$class("sop.openApi.batch.rgeocode.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				this.onBlockUIClose();
				incrementCount("currentCodingRow");
				$communityBatch.ui.geocount++;
				if(res.errCd == "0") {
					incrementCount("successCount");
					$communityBatch.ui.dataValidation(options.row);
					$("#basic_handson").handsontable("setDataAtCell", options.row, 3, res.result[0].full_addr);
				}else if(res.errCd == "-401"){
					accessTokenInfo(function() {
						initValid(function(){
							decreaseCount("currentCodingRow");
							$communityBatch.ui.openApiReverseGeocode(options.row,options.x_coor,options.y_coor);
						});
					});
				}else{
					incrementCount("failCount");
					$("#basic_handson").handsontable("setDataAtCell", options.row, 0, "X");
				}
			},
			onFail : function(status, options) {
				this.onBlockUIClose();
				incrementCount("failCount");
				$("#basic_handson").handsontable("setDataAtCell", options.row, 0, "X");
			}
		});
	}());
}(window, document));
