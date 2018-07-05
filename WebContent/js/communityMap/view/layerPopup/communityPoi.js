/**
 * 침여형소통지도 poi 관한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2016/01/17 초기작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$communityLeftMenu.ui.communityPoi = {
		/**
		 * @name           : $communityLeftMenu.ui.communityPoi.getList
		 * @description    : poi 리스트
		 * @date           : 2016. 01. 17.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param page_num :
		 * @param type     : type
		 */
		getList : function(page_num,type){
			if($communityMapCommon.hasText($communityView.ui.searchSymbol)||$communityView.ui.searchSymbol=="all"){
				var obj = new sop.portal.communityPoiList.api();
				obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
				obj.addParam("type", type);
				obj.addParam("page_num", page_num);
				obj.addParam("pageSize", $communityLeftMenu.ui.communityPoi[type].pageSize);
				if($communityLeftMenu.ui.communityPoi[type].searchWord!=null){
					obj.addParam("search_word", $communityLeftMenu.ui.communityPoi[type].searchWord);
				}
				if($communityView.ui.searchSymbol!="all"){
					obj.addParam("symbol", $communityView.ui.searchSymbol);
				}
				obj.request({
					method : "POST",				
					async : true,
					url : contextPath + "/ServiceAPI/community/communityPoiList.json",
					options : {
						page_num : page_num,
						type : type
					}
				});
			}else{
				$("#all-community-poi-list,#my-community-poi-list").empty().append($("<li/>").append($("<a/>",{"href":"javascript:void(0);","style":"text-align: center;padding: 17px 0px 0px 0px;","text":"등록자료가 존재하지 않습니다"})));
				$("#all-community-total-count,#my-community-total-count").text("0");
			}
		},
		all : {//전체 리스트
			currentPageIndex : 1,
			pageSize : 8,
			searchWord : null,
			search_start_date : null,
			search_end_date : null,
			getList : function(){
				$communityLeftMenu.ui.communityPoi.getList(this.currentPageIndex,"all");
			}
		},
		my : {//나의등록자료 리스트
			currentPageIndex : 1,
			pageSize : 8,
			searchWord : null,
			search_start_date : null,
			search_end_date : null,
			getList : function(){
				$communityLeftMenu.ui.communityPoi.getList(this.currentPageIndex,"my");
			}
		}
	};
	$communityLeftMenu.ui.poiRegist = {
		/**
		 * @name           : $communityLeftMenu.ui.poiRegist.chooseMap
		 * @description    : poi등록에서 위치선택
		 * @date           : 2016. 01. 17.
		 * @author	       : 나광흠
		 * @history 	   :
		 */
		chooseMap : function(){
			if(!$("#choose-map").parent(".write_position").hasClass("disabled")){
				initAddress("map");
				$("#choose-map").addClass("M_on");
			}
		},
		/**
		 * @name           : $communityLeftMenu.ui.poiRegist.popup
		 * @description    : 도로명 주소 팝업 띄우기
		 * @date           : 2016. 01. 17.
		 * @author	       : 나광흠
		 * @history 	   :
		 */
		popup : function(){
			if(!$("#choose-map").parent(".write_position").hasClass("disabled")){
				initAddress("popup");
				window.open(contextPath+"/view/community/popup/joso","pop","width=570,height=420, scrollbars=yes");
			}
		},
		/**
		 * @name           : $communityLeftMenu.ui.poiRegist.cmmntyEvent
		 * @description    : 주소 입력
		 * @date           : 2016. 05. 17.
		 * @author	       : 차수아
		 * @history 	   :
		 */
		cmmntyEvent : function(e){
			initAddress(null);
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			map.gMap.closeInfoWindow();
			var address = $communityMapApi.request.getAddressFromCoordinate(e.utmk.x,e.utmk.y,"10");
			if(address===undefined){
				address = $communityMapApi.request.getAddressFromCoordinate(e.utmk.x,e.utmk.y,"21");
			}
			if(address===undefined){
				address = $communityMapApi.request.getAddressFromCoordinate(e.utmk.x,e.utmk.y,"20");
			}
			if(address&&address.result.length>0){
				var data = address.result[0];
				$communityLeftMenu.ui.poiRegist.setNewMarker([e.utmk.x,e.utmk.y],data.full_addr); 
				$communityLeftMenu.ui.curAddressSearchType = null;
			}else{
				$communityMapCommon.alert("알림", "잘못된 좌표가 선택되었습니다. 다시 선택해주세요");
			}
		},
		/**
		 * @name           : $communityLeftMenu.ui.poiRegist.cmmntyRegist
		 * @description    : 의견 등록하기
		 * @date           : 2016. 05. 17.
		 * @author	       : 차수아
		 * @history 	   : 
		 */
		cmmntyRegist: function(){
			$communityView.ui.initForm();
			var popupId = "#layer-popup-poi-regist";
			if(!(/(M|P)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!=AuthInfo.member_id)){
				$(popupId+"-form>div,"+popupId+"-form>button[type=submit]").removeClass("disabled");
				$(popupId+"-form input:radio").prop("disabled",false);
				$(popupId+"-form input:not(:radio),"+popupId+" textarea").prop("readonly",false);
			}
			if(!$(popupId).hasClass("M_on")){
				$(popupId+" h2").text("의견 등록하기");
				if(/(M|P)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!=AuthInfo.member_id){
					$(popupId+"-form>div,"+popupId+"-form>button[type=submit]").addClass("disabled");
					$(popupId+"-form input:radio").prop("disabled",true);
					$(popupId+"-form input:not(:radio),"+popupId+" textarea").prop("readonly",true);
					$(popupId+"-form input[name=pw],"+popupId+"-form input[name=id]").prop("readonly",false).parent(".WriteBox").removeClass("disabled");
				}
				$(popupId).addClass("M_on");
			}
			$(popupId+"-location").prop("readonly",true);
		},
		/**
		 * @name           : $communityLeftMenu.ui.poiRegist.needLogin
		 * @description    : 로그인 알림창
		 * @date           : 2016. 05. 25.
		 * @author	       : 차수아
		 * @history 	   :
		 */
		needLogin : function(){
			$communityMapCommon.confirm("알림", "로그인이 필요합니다. 이동하시겠습니까?",[{
				title : "확인",
				func : function(opt) {
					location.href="/view/member/login_new?returnPage="+location.href;
				}
			},{title : "취소"}]);
		},
		/**
		 * @name          : $communityLeftMenu.ui.poiRegist.popupCallback
		 * @description   : 도로명 주소 팝업 띄우기
		 * @date          : 2016. 01. 17.
		 * @author	      : 나광흠
		 * @history 	  :
		 * @param center  : 중심
		 * @param address : 주소
		 */
		setNewMarker : function(center,address){
			$communityView.ui.removeMarkers($communityView.ui.newMarkers);
			$communityLeftMenu.ui.curAddressCenter = null;
			$communityLeftMenu.ui.curAddressSearchType = null;
			$("#layer-popup-poi-regist-location").val("");
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			$communityLeftMenu.ui.curAddressCenter = center;
			$("#layer-popup-poi-regist-location").val(address);
			var marker = sop.marker(center);
			marker.addTo(map.gMap);
			map.mapMove(center,map.gMap.getZoom());
			if(AuthInfo.authStatus||communityMapInfo.cmmnty_partcptn_grant_yn=="M"||communityMapInfo.cmmnty_partcptn_grant_yn=="P"||communityMapInfo.cmmnty_partcptn_grant_yn=="A"){
				marker.bindInfoWindow("해당 지점 등록");
			}else{
				marker.bindInfoWindow("주소 : "+address+"<br/><div style='text-align:center'><a href='#' onclick='$communityLeftMenu.ui.poiRegist.needLogin();'>등록하기</a></div>");
			}
			marker.openInfoWindow();
			$communityView.ui.newMarkers.push(marker);
		},
		/**
		 * @name          : $communityLeftMenu.ui.poiRegist.validationCoorOfDefault
		 * @description   : 디폴트값과 비교
		 * @date          : 2016. 01. 17.
		 * @author	      : 나광흠
		 * @history 	  :
		 * @param adm_cd  : adm_cd
		 */
		validationCoorOfDefault :function(adm_cd){
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			var curAdmCd = adm_cd.substring(0,defaultCurAdmCd.length);
			if(curAdmCd==defaultCurAdmCd||defaultCurAdmCd=="00"){
				return true;
			}else{
				$communityMapCommon.confirm(
					"알림","\'"+defaultCurAdmNm+"\' 에 벗어난 영역에는 등록하실 수 없습니다<br> 등록 가능 지역으로 이동하시겠습니까?",[{
						title : "확인",
						func : function(opt) {
							map.mapMove(defaultCurCenter,defaultCurZoom);
							if($(".sqList .dragItem>a.M_on").parent().data("list")){
								$communityMap.ui.curAdmCd = defaultCurAdmCd;
								$communityMap.ui.curCenter = defaultCurCenter;
								$communityMap.ui.curZoom = defaultCurZoom;
								setTimeout(function(){
									$communityMap.ui.setStats($(".sqList .dragItem>a.M_on").parent().data("list"),false,true);
								}, 500);
							}
						}
					},{title : "취소"}   
				]);
				return false;
			}
		},
		/**
		 * @name          : $communityLeftMenu.ui.poiRegist.openPoiRegistBox
		 * @description   : 의견 등록창 열기
		 * @date          : 2016. 11. 8.
		 * @author	      : 나광흠
		 * @history 	  :
		 */
		openPoiRegistBox : function(){
			if($communityLeftMenu.ui.poiRegist.checkDate()){
				if(communityMapInfo.cmmnty_partcptn_grant_yn=="A"){
					$("#type-password-check-button").hide();
				}
				$communityLeftMenu.ui.poiRegist.cmmntyRegist(); //20160601 차수아 추가
				return true;
			}else{
				return false;
			}
		},
		/**
		 * @name            : $communityLeftMenu.ui.poiRegist.checkDate
		 * @description     : 전체적인 날짜 체크
		 * @date            : 2016. 11. 8.
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param noMessage : 에러메시지 보여줄지 유무 기본 false
		 */
		checkDate : function(noMessage){
			if(!$communityLeftMenu.ui.poiRegist.checkStartDate()){
				return false;
			}else if(!$communityLeftMenu.ui.poiRegist.checkEndDate()){
				return false;
			}else{
				return true;
			}
			
		},
		/**
		 * @name            : $communityLeftMenu.ui.poiRegist.checkEndDate
		 * @description     : 종료 날짜 체크
		 * @date            : 2016. 11. 9.
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param noMessage : 에러메시지 보여줄지 유무 기본 false
		 */
		checkEndDate : function(noMessage){
			var today = parseInt($communityMapCommon.getToday());
			if(parseInt(communityMapInfo.prid_estbs_end_date.replace(/\./gi,""))<today){
				if(noMessage!==true){
					$communityMapCommon.alert("알림", "기간이 종료된 소통지도입니다.");
				}
				return false;
			}else{
				return true;
			}
		},
		/**
		 * @name            : $communityLeftMenu.ui.poiRegist.checkStartDate
		 * @description     : 시작 날짜 체크
		 * @date            : 2016. 11. 9.
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param noMessage : 에러메시지 보여줄지 유무 기본 false
		 */
		checkStartDate : function(noMessage){
			var today = parseInt($communityMapCommon.getToday());
			if(parseInt(communityMapInfo.prid_estbs_start_date.replace(/\./gi,""))>today){
				if(noMessage!==true){
					$communityMapCommon.alert("알림", "아직 시작하지 않은 커뮤니티입니다.");
				}
				return false;
			}else{
				return true;
			}
		}
		
	};
	/**
	 * @name           : initAddress
	 * @description    : 주소 초기화
	 * @date           : 2016. 07. 21.
	 * @author	       : 나광흠
	 * @history 	   :
	 * @param type     : $communityLeftMenu.ui.curAddressSearchType
	 */
	function initAddress(type){
		$("#choose-map").removeClass("M_on");
		$communityLeftMenu.ui.curAddressSearchType = type;
		$communityLeftMenu.ui.curAddressCenter = null;
		$("#layer-popup-poi-regist-location").val(null);
		$communityView.ui.removeMarkers($communityView.ui.newMarkers);
	}
	
	$communityLeftMenu.event.poi = {
		setUIEvent : function(){
			$communityLeftMenu.ui.communityPoi.all.getList();
			$communityLeftMenu.ui.communityPoi.my.getList();
			
			//새로운 poi 등록
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			map.gMap.on("click",function(e){
				if($communityLeftMenu.ui.curAddressSearchType=="map"){
					$communityLeftMenu.ui.poiRegist.cmmntyEvent(e);
				}							
			});
			map.gMap.on("contextmenu",function(e){
				if(!$communityMap.ui.mapList[$communityMap.ui.curMapId].drawControl._map.absClick){
					$communityLeftMenu.ui.leftLayerPopupAllClose();
					if(AuthInfo.authStatus||/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
						$("#poi-register-button").trigger("click");
						$communityLeftMenu.ui.poiRegist.cmmntyRegist();
					}
					$communityLeftMenu.ui.poiRegist.cmmntyEvent(e);
				}
			});
			//소통지도 등록 보여주기
			$("#poi-register-button").click(function(){
				$communityLeftMenu.ui.poiRegist.openPoiRegistBox();
			});
			
			//poi등록창 닫기 이벤트
			$("#layer-popup-poi-regist-close-button").click(function(){
				$(".scrollBox").mCustomScrollbar($communityLeftMenu.ui.scrollOptions);
				if($communityView.ui.newMarkers!=null){
					$.each($communityView.ui.newMarkers,function(cnt,node){
						node.remove();
					});
					$communityView.ui.newMarkers = [];
				}
				$communityLeftMenu.ui.curAddressCenter = null;
				$communityLeftMenu.ui.curAddressSearchType = null;
				$communityView.ui.curMarker = null;
				$communityView.ui.initForm();
				$("#layer-popup-poi-regist-photo-form-box").show();
				$("#layer-popup-poi-regist input:not(:radio),#layer-popup-poi-regist textarea").val("");
				$("#layer-popup-poi-regist input:radio:eq(0)").prop("checked",true);
				$("#layer-popup-poi-regist").removeClass('M_on');
			});
			$("#poi-file-search-button").click(function(){
				var popupId = "#layer-popup-poi-regist";
				if($(popupId+"-photo-file-list").children("li").length<5){
					$(popupId+"-photo-hidden-file-list input:file:eq(0)").click();
				}else{
					$communityMapCommon.alert("알림", "이미지는 최대 5개까지 등록하실 수 있습니다.");
				}
			});
			$("body").on("change","#layer-popup-poi-regist-photo-hidden-file-list input[name^=fileSearch]",function(){
				var popupId = "#layer-popup-poi-regist";
				if($(popupId+"-photo-file-list").children("li").length<5){
					var files = $(this)[0].files;
					var filePhoto = $(this);
					if (window.FileReader) {
			            if (!files[0].type.match(/image\//)){
			            	$communityMapCommon.alert("알림", "이미지만 등록할 수 있습니다");
			            	return;
			            }
			            try {
		            		var reader = new FileReader();
		            		reader.onload = function(e){
		            			$(popupId+"-photo-file-list").append($("<li/>").append(
	            					$("<span/>",{"class":"img","style":"background-image:url("+e.target.result+");"}),
	            					$("<span/>",{"class":"filename","text":files[0].name}),
	        						$("<button/>",{"type":"button"}).click(function(){
	        							var element = $(this);
	        							$communityMapCommon.confirm(
	        								"알림","삭제하시겠습니까?",[{
	        									title : "확인",
	        									func : function(opt) {
	        										filePhoto.remove();
	        										element.parent().remove();
	        									}
	        								},{title : "취소"}   
	        							]);
	        						})
	        					));
	        					$(popupId+"-photo-hidden-file-list").prepend($("<input/>",{"type":"file","name":"fileSearch"+($(popupId+"-photo-hidden-file-list input:file").length+1),"style":"display:none"}));
		            		}
			                reader.readAsDataURL(files[0]);
			            } catch (e) {
			            	$communityMapCommon.alert("알림", "오류가 발생하였습니다");
			            }
			        }
				}else{
					$communityMapCommon.alert("알림", "이미지는 최대 5개까지 등록하실 수 있습니다.");
					$(this).val(null);
				}
			});
			//poi등록
			$("#layer-popup-poi-regist-form").heumValidation({autoValidation:false},function(errors){
				var abs = new sop.portal.absAPI()
				abs.onBlockUIPopup();
				if(errors.length>0){
					var labelName = "";
					if($(errors[0].element).data("error-message")){
						labelName = $(errors[0].element).data("error-message");
					}
					$communityMapCommon.alert("알림", labelName+errors[0].message,function(){
						$(errors[0].element).focus();
					});
					abs.onBlockUIClose();
				}else if($("#layer-popup-poi-regist-form>button[type=submit]").hasClass("disabled")){
					return false;
				}else{
					var popupId = "#layer-popup-poi-regist";
					var formData = new FormData();
					formData.append("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
					formData.append("title", $(popupId+" input[name=title]").val());
					formData.append("reg_lc", $(popupId+" input[name=reg_lc]").val());
					formData.append("opinion_state", $(popupId+" textarea[name=opinion_state]").val());
					formData.append("symbol", $(popupId+" input[name=symbol]:checked").val());
					formData.append("loc_x", $communityLeftMenu.ui.curAddressCenter[0]);
					formData.append("loc_y", $communityLeftMenu.ui.curAddressCenter[1]);
					if($("#layer-popup-poi-regist-form input[name=id]").length>0){
						formData.append("cmmnty_ipcd", $("#layer-popup-poi-regist-form input[name=id]").val());
					}
					if($("#layer-popup-poi-regist-form input[name=pw]").length>0){
						formData.append("cmmnty_ppcd", $("#layer-popup-poi-regist-form input[name=pw]").val());
					}
					var url;
					$.each($("#layer-popup-poi-regist-photo-hidden-file-list input:file"),function(cnt,node){
						if($(node)[0].files&&$(node)[0].files.length>0){
							formData.append("fileSearch"+cnt, $(node)[0].files[0]);
						}
					});
					if($communityView.ui.curMarker==null){
						url = contextPath+"/ServiceAPI/community/communityPoiRegist.json";
					}else{
						url = contextPath+"/ServiceAPI/community/communityPoiModify.json";
						formData.append("cmmnty_poi_id", $communityView.ui.curMarker.cmmnty_poi_id);
						var deleteImageArray = new Array();
						$.each($("input[name=delete-image-id]"),function(cnt,node){
							deleteImageArray.push($(node).val());
						});
						if(deleteImageArray.length>0){
							formData.append("deleteImageArray", deleteImageArray);
						}
					}
					$.ajax({
						url: url,
						data: formData,
						processData: false,
						contentType: false,
						async: true,
						type: 'POST',
						success: function(res) {
							abs.onBlockUIClose();
							if(res.errCd=="0"){
								if(res.result.success){
									var poi_id = res.result.cmmnty_poi_id;
									$communityView.ui.initMarker();
									$communityView.ui.mapMarksLists(function(){
										$communityView.ui.initForm();
										$communityLeftMenu.ui.communityPoi.all.getList();
										$communityLeftMenu.ui.communityPoi.my.getList();
										$("#layer-popup-poi-regist").removeClass("M_on");
										$communityMapCommon.alert("알림", ($communityView.ui.curMarker==null?"등록":"수정")+"되었습니다",function(){
											$communityView.ui.markersObject[poi_id].openInfoWindow();
										});
										apiLogWrite2("K3", $communityMapCommon.getParameter("cmmnty_map_id"), "통계소통지도 웹 등록", "없음" , "00", "전국");
									});
								}else{
									$communityMapCommon.alert("알림", ($communityView.ui.curMarker==null?"등록":"수정")+"을 실패하였습니다");
								}
							}else{
								$communityMapCommon.alert("알림", res.errMsg);
							}
						},
						error: function(data){
							abs.onBlockUIClose();
							$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
							return false;
						}
					});
				}
				return false;
			});
			//poi 검색
			$("#poi-search-form").submit(function(errors){
				var type = $("#poi-list-tab>li.M_on>a").data("id");
				$communityLeftMenu.ui.communityPoi[type].currentPageIndex = 1;
				if($communityMapCommon.hasText($("#searchWord").val())){
					$communityLeftMenu.ui.communityPoi[type].searchWord = $("#searchWord").val();
				}else{
					$communityLeftMenu.ui.communityPoi[type].searchWord = null;
				}
				$communityLeftMenu.ui.communityPoi[type].getList();
				return false;
			});
			//등록 레이어 팝업 poi 툴팁 보여주기
			$("#poi-symbol-box label").tooltip({
				position: {
					my: "left-15 top-5", at: "right top"
				}
			});
			//등록자료 전체버튼 툴팁
			$("#symbol-all").tooltip({
				position: {
					my: "left+0 top-8", at: "right top"
				}
			});
			$("#layer-popup-poi-regist-opinion_state").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("layer-popup-poi-regist-opinion_state",150,true,"의견","은","는");
			});
			$("#layer-popup-poi-regist-title").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("layer-popup-poi-regist-title",30,true,"제목","은","는");
			});
			$("#poi-detail-reply-content").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("poi-detail-reply-content",30,true,"내용","은","는");
			});
			$("#poi-detail-sttemnt-content").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("poi-detail-sttemnt-content",1300,true,"내용","은","는");
			});
			$("#poi-detail-close-button").click(function(){
				$("#poi-detail").removeClass("M_on");
				$($communityView.ui.markersObject[$("#poi-detail").data("id")]._icon).css({
					"margin-left" : $communityView.ui.markersObject[$("#poi-detail").data("id")].originalMargin["margin-left"],
					"margin-top" : $communityView.ui.markersObject[$("#poi-detail").data("id")].originalMargin["margin-top"]
				}).removeClass("community-on");
			});
		}
	};
	/*********** 등록지점 리스트 시작 **********/
	(function() {
		$class("sop.portal.communityPoiList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				$("#"+options.type+"-community-poi-list").empty();
				$("#"+options.type+"-community-total-count").text("0");
				if(res.errCd == "0") {
					if(options.type==="all"){
						$(".cm_data>a.cn_tab_btn>span.member").text(res.result.total_count);
					}
					$("#"+options.type+"-community-total-count").text(res.result.total_count);
					var ul = $("<ul/>");
					if(res.result.total_count>0){
						$.each(res.result.summaryList,function(cnt,node){
							var symbol,symbolSize="";
							if($communityMapCommon.hasText(node.reg_symbol)){
								symbol = contextPath+"/img/community/iconset_"+node.reg_symbol+node.symbol+".png";
								var img = new Image();
								img.onload = function() {
									symbolSize = "width:"+this.width+"px;height:"+this.height+"px;";
								}
								img.src = symbol;
							}else{
								var imagePath = node.symbol_path.substring(0,node.symbol_path.lastIndexOf("/")); 
								var imageName = node.symbol_path.substring(node.symbol_path.lastIndexOf("/")+1);
								symbol = contextPath+imagePath+"/thumbnail/thumbnail-XS-"+imageName;
								symbolSize = "width:23px;height:28px;";
							}
							ul.append(
								$("<li/>").append(
									$("<a/>",{"href":"#","data-id":node.cmmnty_poi_id,"data-x":node.x_loc,"data-y":node.y_loc}).click(function(){
										var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
										map.mapMove([$(this).data("x"),$(this).data("y")],map.gMap.getZoom());
										$(".quickBox.step01 .stepClose").click();
										map.gMap.closeInfoWindow();
										$communityView.ui.markersObject[$(this).data("id")]._bringToFront();
										$communityView.ui.markersObject[$(this).data("id")].openInfoWindow();
									}).append(
											$("<span/>",{"class":"no","text":((res.result.total_count-($communityLeftMenu.ui.communityPoi[options.type].pageSize * (options.page_num - 1))))-cnt}),
											$("<span/>",{"class":"icon"}).append($("<img/>",{"src":symbol,"style":symbolSize,"alt":"등록 아이콘"})),
											$("<span/>",{"class":"title"}).append($("<strong/>",{"text":node.title}),$("<span/>",{"text":node.opinion_state})),
											$("<span/>",{"class":"date","text":node.reg_date})
									)
								)
							);
						});
						$("#"+options.type+"-community-poi-list").append(ul);
						$communityMapCommon.createPaging(options.type+"-community-poi", res.result.total_count, $communityLeftMenu.ui.communityPoi[options.type]);
					}else{
						var text;
						if(
							$communityLeftMenu.ui.communityPoi[options.type].searchWord!=null||
							$communityLeftMenu.ui.communityPoi[options.type].search_start_date!=null||
							$communityLeftMenu.ui.communityPoi[options.type].search_end_date!=null
						){
							text = "검색된 등록자료가 존재하지 않습니다";
						}else{
							text = "등록자료가 존재하지 않습니다 ";
						}
						ul.append($("<li/>").append($("<a/>",{"href":"javascript:void(0);","style":"text-align: center;padding: 17px 0px 0px 0px;","text":text})));
						$("#"+options.type+"-community-poi-list").append(ul);
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 등록지점 리스트 종료 **********/
}(window, document));