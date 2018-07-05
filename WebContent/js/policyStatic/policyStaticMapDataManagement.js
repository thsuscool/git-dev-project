/**
 * 정책통계지도 데이터관리 화면에 대한 클래스
 * 
 * history : 유코아시스템(주), 2017/03/13  초기 작성
 * author : 김도형
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyStaticMapDataManagement = W.$policyStaticMapDataManagement || {};
	
	$(document).ready(function() {
		$policyStaticMapDataManagement.event.setUIEvent();	
	});
	
	$policyStaticMapDataManagement.ui = {
		currentIndex : 1, //현재 페이지 인덱스번호
		pageSize : 10, 	  //페이지 당 항목 개수
		srvType : "01",	  //서비스타입  01:정책통계지도, 02:살고싶은 우리동네, 03:지역현안통계지도 //2017.10.30 [개발팀]
			
		/**
		 * @name         : dataManagement
		 * @description  : 데이터 보기
		 * @date         : 2017. 03. 10. 
		 * @author	     : 김도형
		 */
		dataManagement : function(from, to, nm, pageNum, srvType){
			var params = {};
			if(from != '' & from != null){
				params["from"] = from;
			}
			if(to != '' & to != null){
				params["to"] = to;
			}
			if(nm != '' & nm != null){
				params["nm"] = nm;
			}
			params["policy_data_page"] = pageNum;
			params["type"] = srvType; //2017.10.30 [개발팀]
			
			//lbdms 데이터 조회 
			$policyStaticMapDataManagement.ui.srvType = srvType;
			$policyStaticMapDataManagement.request.doReqDataView(params);
		},
		
		/**
		 * @name         : lbdmsDataViewPaging
		 * @description  : 데이터 보기
		 * @date         : 2017. 03. 10. 
		 * @author	     : 김도형
		 */
		lbdmsDataViewPaging : function(totalCount, currentIndex) {
			var totalPage = Math.ceil(totalCount / this.pageSize); // 전체 페이지 수
			$('#page').paging({
				current : currentIndex,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'data',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function(e, page) { // 페이지 선택 시
					var startDate = $("#data_from").val();
					var endDate = $("#data_to").val();
					var dataNm = $("#data_nm").val();
					var type = $policyStaticMapDataManagement.ui.srvType; //2017.10.30 [개발팀]
					$policyStaticMapDataManagement.ui.currentIndex = page; 
					$policyStaticMapDataManagement.ui.dataManagement(startDate, endDate, dataNm, page, type);
					$("#allChk").prop("checked",false);
				}
			});
		},
		
		/**
		 * @name         : doDeleteData
		 * @description  : lbdms 데이터 삭제
		 * @date         : 2017. 10. 10. 
		 * @author	     : 권차욱
		 */	
		doDeleteData : function() {
			messageConfirm.open(
	    			 "알림", 
	    			 "삭제 하시겠습니까.",
	    			 btns = [
						{
						    title : "네 ",
						    fAgm : null,
						    disable : false,
						    func : function(opt) {
						    	var params = {};
						    	var text = "";
						    	$.each($(".dataCheck:checked"),function(cnt,node){
						    		text += $(node).data("type") + ",";
						    	});
						    	
						    	if (text!= ""){
						    		params["data_chk"] = text;
						    	}
						    	
						    	//데이터 삭제
						    	$policyStaticMapDataManagement.request.doReqDeleteDataView(params);
						    }
						 },
						 
	    			     {
						   title : "아니오",
						   fAgm : null,
						   disable : false,
						   func : function(opt) {}
	    			     }   
	    			 ]
	    	);
		},
		
		/**
		 * @name         : doOpenData
		 * @description  : lbdms 데이터 공개
		 * @date         : 2017. 10. 10. 
		 * @author	     : 권차욱
		 */	
		doOpenData : function() {
			messageConfirm.open(
	    			 "알림", 
	    			 "선택된 항목을 공개 또는 비공개 하시겠습니까.",
	    			 btns = [
						{
						    title : "공개",
						    fAgm : null,
						    disable : false,
						    func : function(opt) {
						    	var params = {};
						    	var text = "";
						    	$.each($(".dataCheck:checked"),function(cnt,node){
						    		text += $(node).data("type") + ",";
						    	});
						    	
						    	if (text != "") {
						    		params["data_chk"] = text;	
						    	}
						    	params["open_yn"] = "1";
						    	
						    	//데이터 공개
						    	$policyStaticMapDataManagement.request.doReqOpenDataView(params);
						    }
						 },
						 
	    			     {
						   title : "비공개",
						   fAgm : null,
						   disable : false,
						   func : function(opt) {
							   var params = {};
						    	var text = "";
						    	$.each($(".dataCheck:checked"),function(cnt,node){
						    		text += $(node).data("type") + ",";
						    	});
						    	
						    	if (text != "") {
						    		params["data_chk"] = text;	
						    	}
						    	params["open_yn"] = "0";
						    	
						    	//데이터 공개
						    	$policyStaticMapDataManagement.request.doReqOpenDataView(params);
						   }
	    			     }   
	    			 ]
	    	);
		}
	};
	
	$policyStaticMapDataManagement.request = {
			
		/**
		 * @name         : doReqDataView
		 * @description  : lbdms 데이터 조회
		 * @date         : 2017. 10. 10. 
		 * @author	     : 권차욱
		 */	
		doReqDataView : function(params) {
			$.ajax({
				url : contextPath + "/ServiceAPI/policyWrite/dataveiw.json",
				type : "POST",
				data : params,
				async : true,
				dataType : "json",
				beforeSend: function() {},
				success : function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$(".TB_02 tbody").empty();
							$("#page").empty();
							if (res.result.veiwList.length == 0) {
								var html = "";
									html += "<tr style='height:100px;'>";
									html +=		"<td colspan=10>검색된 결과가 없습니다.</td>";
									html +=	"</tr>";
								$(".TB_02 tbody").html(html);
								$(".Btn_Group").hide();
								$("#lbdmsPopup").show();
								return;
							}
							$policyStaticMapDataManagement.ui.lbdmsDataViewPaging(res.result.veiwPage, $policyStaticMapDataManagement.ui.currentIndex);
							$.each(res.result.veiwList, function(cnt, node){
								var openChk;
								if(node.open_yn=="1"){
									openChk = '공개';
								}else{
									openChk = '비공개'
								}
								
								if (node.spacial_data_type == "null") {
									node.spacial_data_type = "-";
								}
								
								var srvRealm = "-";
								if (node.info_link_srv_realm != undefined && 
									node.info_link_srv_realm != null &&
									node.info_link_srv_realm.length > 0) {
									srvRealm = node.info_link_srv_realm;
								}
								
								$(".TB_02 tbody").append(
									'<tr>'+
									'	<th scope="row">'+
									'		<input type="checkbox" class="dataCheck" data-type='+node.seq+'>'+
									'	</th>'+
									'	<td>'+(res.result.veiwPage-(($policyStaticMapDataManagement.ui.currentIndex-1) * $policyStaticMapDataManagement.ui.pageSize) - cnt)+'</td>'+
									'	<td>'+node.open_dt+'</td>'+
									'	<td>'+node.open_data_nm+'</td>'+
									'	<td>'+node.open_inst_nm+'</td>'+
									'	<td>'+node.usr_nm+'</td>'+
									'	<td>'+$policyStaticMapDataManagement.util.getDataTypeName(node.spacial_data_type_cd)+'</td>'+
									'	<td>'+node.info_link_srv_nm+'</td>'+
									'	<td>'+srvRealm+'</td>'+
									'	<td>'+openChk+'</td>'+
									'</tr>'
								);
							});
							$(".Btn_Group").show();
							$("#lbdmsPopup").show();
							break;
						default:
							messageAlert.open("알림", res.errMsg);
							break;
					}
				},
				error : function(res) {
					messageAlert.open("알림", res.errMsg);
				}
			});
		},
		
		/**
		 * @name         : doReqDeleteDataView
		 * @description  : lbdms 데이터 조회
		 * @date         : 2017. 10. 10. 
		 * @author	     : 권차욱
		 */	
		doReqDeleteDataView : function(params) {
			$.ajax({
				url :  contextPath + "/ServiceAPI/policyWrite/datadelete.json",
				type : "POST",
				data : params,
				async : true,
				dataType : "json",
				beforeSend: function() {},
				success : function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var srvType = $policyStaticMapDataManagement.ui.srvType;
							$policyStaticMapDataManagement.ui.dataManagement('','','','1',srvType);
							$policyStaticMapDataManagement.ui.currentIndex = 1;
							break;
						default:
							messageAlert.open("알림", res.errMsg);
							break;
					}
				},
				error : function(res) {
					messageAlert.open("알림", res.errMsg);
				}
			});
		},
		
		/**
		 * @name         : doReqOpenDataView
		 * @description  : lbdms 데이터 조회
		 * @date         : 2017. 10. 10. 
		 * @author	     : 권차욱
		 */	
		doReqOpenDataView : function(params) {
			$.ajax({
				url :  contextPath + "/ServiceAPI/policyWrite/dataopen.json",
				type : "POST",
				data : params,
				async : true,
				dataType : "json",
				beforeSend: function() {},
				success : function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var srvType = $policyStaticMapDataManagement.ui.srvType;
							$policyStaticMapDataManagement.ui.dataManagement('','','','1',srvType);
							$policyStaticMapDataManagement.ui.currentIndex = 1;
							break;
						default:
							messageAlert.open("알림", res.errMsg);
							break;
					}
				},
				error : function(res) {
					messageAlert.open("알림", res.errMsg);
				}
			});
		}
	};
		
	$policyStaticMapDataManagement.event = {
		setUIEvent : function() {
			$("#data_search").click(function(){
				var srvType = $policyStaticMapDataManagement.ui.srvType;
				$policyStaticMapDataManagement.ui.currentIndex = 1;
				$policyStaticMapDataManagement.ui.dataManagement($("#data_from").val(),$("#data_to").val(),$("#data_nm").val(),1, srvType);
			});
			
			$("#lbdmsClosePopup").click(function(){
				$("#lbdmsPopup").hide();
			});
			
			$("#allChk").change(function(){
				$(".dataCheck").prop("checked",$("#allChk").is(":checked"));
		    });
							
			//datepicker 시작
			$("#data_from, #data_to").datepicker({
				dateFormat : "yy-mm-dd",
				showButtonPanel : true,
				dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
				monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
				monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
				changeYear : true,
				changeMonth : true,
				onSelect:function (value, element){
					if(element.id=="data_from"){
						$("#data_to").datepicker("option", "minDate", value);
					}else{
						$("#data_from").datepicker("option", "maxDate", value);
					}
				}
			});
			
			if ($("#data_from").val().replace(/ /gi,"") != ""){
				$("#data_to").datepicker("option", "minDate", $("#data_from").val());
			}
			
			if ($("#data_to").val().replace(/ /gi,"") != ""){
				$("#data_from").datepicker("option", "maxDate", $("#data_to").val());
			}
		}
	};
	
	$policyStaticMapDataManagement.util = {
			
		/**
		 * @name         : getDataTypeName
		 * @description  : 데이터타입명을 가져온다.
		 * @date         : 2017. 10. 30. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param cd	 : 데이터타입코드 
		 */
		getDataTypeName : function(cd) {
			var name = "";
			switch(cd) {
				case "01":
					name = "점";
					break;
				case "02":
					name = "면";
					break;
				case "03":
					name = "집계";
					break;
				default:
					name = "-";
					break;
				}
			return name;
		}
	};
}(window, document));