/**
 * 정책지도 작성 등록팝업 페이지에 대한 클래스
 * 
 * history : 
 * 네이버시스템, 1.0, 2017/08/10 [개발팀]  초기 작성
 * author : 권차욱
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyWritePopup = W.$policyWritePopup || {};
	
	$(document).ready(function() {
		$policyWritePopup.event.setUIEvent();
	});
	
	$policyWritePopup.ui = {
			selectedIdx : 1,	//선택된 지표정보
			defaultSidoCd : "11", //기본 시도코드(서울)
			selectedSidoCd : null, //선택된 시도코드
			selectedSggCd : null, //선택된 시군구코드
			selectedEmdCd : null, //선택된 읍면동코드
			selectedAdmCd : null, //선택된 행정동코드
			isAtdrcYn : "N", //비자치구여부
			boundLevel : 1, //경계레벨
			
			/**
			 * @name         : goMyDataPage
			 * @description  : 마이데이터 페이지로 이동한다.
			 * @date         : 2017.08.10 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			goMyDataPage : function() {
				window.location.href = "/view/mypage/myData/dataList";
			},
			
			/**
			 * @name             : openPolicyWritePopup
			 * @description      : 정책통계지도 등록팝업을 표출한다.
			 * @date             : 2017. 08. 09.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param 
			 */
			openPolicyWritePopup : function() {
				$("#policyWritePopup").show();
				this.selectedSidoCd = this.defaultSidoCd;
				this.selectedAdmCd = this.defaultSidoCd;
				$policyWritePopup.request.getSidoList(function() {
					$policyWritePopup.request.getSggList($policyWritePopup.ui.defaultSidoCd, function() {
						
					});
				});
			},
			
			/**
			 * @name             : closePolicyWritePopup
			 * @description      : 정책통계지도 등록팝업을 표출한다.
			 * @date             : 2017. 08. 09.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param 
			 */
			closePolicyWritePopup : function() {
				$("#policyWritePopup").hide();
			},
			
			/**
			 * @name             : setAtdrcList
			 * @description      : 비자치구정보를 설정한다.
			 * @date             : 2017. 08. 11.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param sidoCd     : 시도코드
			 */
			setAtdrcList : function(sidoCd) {
				if($psmCombine.ui.atdrcList[sidoCd]){
					$.each($psmCombine.ui.atdrcList[sidoCd],function(sidoCnt,sidoNode){
						var op,index,empty = true;
						$.each(this.sgg_list,function(cnt,node){
							op = $("#pSggList option[value="+node+"]");
							if(op.length>0){
								empty = false;
								if(index==undefined){
									index = op.index();
								}else{
									index = Math.min(index,op.index());
								}
							}
						});
						if(!empty){
							//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
							$("#pSggList option:eq("+index+")").before($("<option/>",{text:sidoNode.sgg_nm,value:sidoNode.sgg_list.join(","),"x-coor":op.data("coor-x"),"y-coor":op.data("coor-y"), "admCd":sidoNode.adm_cd}));
						}
					});
				}
			},
			
			/**
			 * @name             : checkBoundLevel
			 * @description      : 행정동코드를 바탕으로 경계레벨을 설정한다.
			 * @date             : 2017. 08. 11.
			 * @author	         : 권차욱
			 * @history 	     :
			 */
			checkBoundLevel : function(admCd) {
				if (admCd == null || admCd == undefined) {
					return;
				}
				$("#bordArea a").removeClass("on");
				switch (admCd.length) {
					case 2: //시도레벨
						$("#sggBord > a").addClass("on");
						$("#sggBord").show();
						$("#emdBord").show();
						$("#jibgaeBord").hide();
						$policyWritePopup.ui.boundLevel = 1;
						break;
					case 5: //시군구레벨
						$("#emdBord > a").addClass("on");
						$("#sggBord").hide();
						$("#emdBord").show();
						$("#jibgaeBord").show();
						$policyWritePopup.ui.boundLevel = 1;
						break;
					case 7: //읍면동레벨
						$("#jibgaeBord > a").addClass("on");
						$("#sggBord").hide();
						$("#emdBord").hide();
						$("#jibgaeBord").show();
						$policyWritePopup.ui.boundLevel = 1;
						break;
					default:
						break;
				}
			},
			
			checkAtdrc : function(admCd) {
				//선택된 행정구역이 비자치구인지 아닌지를 체크한다.
				$policyWritePopup.ui.isAtdrcYn = "N";
				var sidoCd = $policyWritePopup.ui.selectedSidoCd;
				if($psmCombine.ui.atdrcList[sidoCd]){
					$.each($psmCombine.ui.atdrcList[sidoCd], function(sidoCnt, sidoNode){
						if (sidoNode.adm_cd == $policyWritePopup.ui.selectedAdmCd) {
							 $policyWritePopup.ui.isAtdrcYn = "Y";
						}
					});
				}
			},
			
			/**
			 * @name             : doCreatePolicyMap
			 * @description      : 정책통계지도 만들기 화면으로 이동한다.
			 * @date             : 2017. 08. 11.
			 * @author	         : 권차욱
			 * @history 	     :
			 */
			doCreatePolicyMap : function() {
				//통계청일 때, 대상지역 범위
				//0 : 해당없음(지자체)
				//1 : 전국단위
				//2 : 선택된 지역한정
				var dataRange = 0;
				if ($("#dataRangeArea").is(":visible")) {
					dataRange = $("input[name='dRange']:checked").val();
				}
				
				//대상지역명
				var admNm = "";
				var sidoNm = $("#pSidoList option:selected").text();
				var sggNm = $("#pSggList option:selected").text();
				var emdNm = $("#pEmdList option:selected").text();
				var coor_x =  $("#pSidoList option:selected").attr("x-coor");
				var coor_y =  $("#pSidoList option:selected").attr("y-coor");
				
				//경계레벨명
				var boundTitle = "";
				$("#bordArea li>a").each(function() {
					if ($(this).hasClass("on")) {
						boundTitle = $(this).html();
					}
				})
				
				admNm = sidoNm;
				if (sggNm != "") {
					if (sggNm != "전체") {
						admNm += " " + sggNm;
						coor_x =  $("#pSggList option:selected").attr("x-coor");
						coor_y =  $("#pSggList option:selected").attr("y-coor");
					}
					if (emdNm != "") {
						if (emdNm != "전체") {
							admNm += " " + emdNm;
							coor_x =  $("#pEmdList option:selected").attr("x-coor");
							coor_y =  $("#pEmdList option:selected").attr("y-coor");
						}
					}
				}
				
				var params = "idxType="+this.selectedIdx+
							 "&adm_cd="+this.selectedAdmCd+
							 "&boundLevel="+this.boundLevel+
							 "&atdrcYn="+this.isAtdrcYn+
							 "&dataRange="+dataRange+
							 "&adm_nm="+admNm+
							 "&boundLevelTitle="+boundTitle+
							 "&coor_x="+coor_x+
							 "&coor_y="+coor_y;
				params = window.btoa(encodeURIComponent(params));
				location.href = "/view/map/policyWriteMap?params="+params;
			}
			
			
	};
	
	$policyWritePopup.request = {
			
			/**
			 * @name             : getSidoList
			 * @description      : 시도정보를 가져온다.
			 * @date             : 2017. 08. 10.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param sidoCd     : 시도코드
			 * @param callback   : 콜백정보
			 */
			getSidoList: function(callback) {
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
					data: {
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						var sidoList = res.result.sidoList;
						if (sidoList != undefined || sidoList != null) {
							$("#pSidoList").empty();
							var html = "";
							for (var i=0; i<sidoList.length; i++) {
								html += "<option value='"+sidoList[i].sido_cd+"' x-coor='"+sidoList[i].x_coor+"' y-coor='"+sidoList[i].y_coor+"' admCd='"+sidoList[i].sido_cd+"'>";
								html += sidoList[i].sido_nm;
								html += "</option>";
							}
							$("#pSidoList").append(html);
							
							if (callback != undefined && 
									callback != null && 
									callback instanceof Function) {
									callback.call(undefined, sidoList);
							}
						}
					},
					error: function(e) {

					}
				});
			},
			
			/**
			 * @name             : getSggList
			 * @description      : 시도정보를 가져온다.
			 * @date             : 2017. 08. 10.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param sidoCd     : 시도코드
			 * @param callback   : 콜백정보
			 */
			getSggList: function(sidoCd, callback) {
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
					data: {
						sido_cd : sidoCd,
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						var sggList = res.result.sggList;
						if (sggList != undefined || sggList != null) {
							$("#pSggList").empty();
							var html = "<option value='' admCd='"+sidoCd+"'>전체</option>";
							for (var i=0; i<sggList.length; i++) {
								var admCd = sidoCd + sggList[i].sgg_cd;
								html += "<option value='"+sggList[i].sgg_cd+"' x-coor='"+sggList[i].x_coor+"' y-coor='"+sggList[i].y_coor+"' admCd='"+admCd+"'>";
								html += sggList[i].sgg_nm;
								html += "</option>";
							}
							$("#pSggList").append(html);
							
							//비자치구여부 체크시
							if ($("#atdrcYn").is(":checked")) {
								$policyWritePopup.ui.setAtdrcList(sidoCd);
							}
							
							if (callback != undefined && 
									callback != null && 
									callback instanceof Function) {
									callback.call(undefined, sidoCd, res);
							}
						}
					},
					error: function(e) {

					}
				});
			},
			
			/**
			 * @name             : getEmdList
			 * @description      : 읍면동정보를 가져온다.
			 * @date             : 2017. 08. 10.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param sidoCd     : 시도코드
			 * @param sggCd      : 시군구코드
			 * @param callback   : 콜백정보
			 */
			getEmdList: function(sidoCd, sggCd, callback) {
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/admAddressList.json",
					data: {
						sido_cd : sidoCd,
						sgg_cd : sggCd,
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						var admList = res.result.admList;
						if (admList != undefined || admList != null) {
							$("#pEmdList").empty();
							var html = "<option value='' admCd='"+sidoCd+sggCd+"'>전체</option>";
							for (var i=0; i<admList.length; i++) {
								var admCd = sidoCd + sggCd + admList[i].emdong_cd;
								html += "<option value='"+admList[i].emdong_cd+"' x-coor='"+admList[i].x_coor+"' y-coor='"+admList[i].y_coor+"' admCd='"+admCd+"'>";
								html += admList[i].emdong_nm;
								html += "</option>";
							}
							$("#pEmdList").append(html);
							
							if (callback != undefined && 
									callback != null && 
									callback instanceof Function) {
									callback.call(undefined, sidoCd, res);
							}
						}
					},
					error: function(e) {

					}
				});
			}
			
	};
	
	$policyWritePopup.event = {
			setUIEvent : function() {
				//툴팁설정
				this.linkTooltip();
				
				//수요변화,시설분석,통계연산형지표 선택 이벤트
				$("body").on("click", ".idxType", function() {
					$(".idxType").removeClass("on");
					$(this).addClass("on");
					
					var id = $(this).attr("id");
					switch(id) {
						case "demandIndex": //수요변화형
							$policyWritePopup.ui.selectedIdx = 1;
							break;
						case "calculateIndex": //통계연산형
							$policyWritePopup.ui.selectedIdx = 2;
							break;	
						case "analysisIndex": //시설분석형
							$policyWritePopup.ui.selectedIdx = 3;
							break;
						default:
							break;
					}
				});
				
				//시도 선택 이벤트 처리 
				$("body").on("change", "#pSidoList", function() {
					var obj = $("#pSidoList option:selected");
					var sidoCd = obj.val();
					var admCd = obj.attr("admCd");
					$policyWritePopup.ui.selectedAdmCd = admCd;
					$policyWritePopup.ui.selectedSidoCd = sidoCd;
					$policyWritePopup.request.getSggList(sidoCd);
					$policyWritePopup.ui.checkBoundLevel(admCd);
				});
				
				//시군구 선택 이벤트 처리
				$("body").on("change", "#pSggList", function() {
					var obj = $("#pSggList option:selected");
					var sidoCd = $policyWritePopup.ui.selectedSidoCd;
					var sggCd = obj.val();
					var admCd = obj.attr("admCd");
					$policyWritePopup.ui.selectedAdmCd = admCd;
					$policyWritePopup.ui.selectedSggCd = sggCd;
					$policyWritePopup.ui.checkBoundLevel(admCd);
					$policyWritePopup.ui.checkAtdrc(admCd);
					//읍면동 박스 show/hide 체크
					if (sggCd == "") {
						$("#pEmdListArea").hide();
					}
					//비자치구일경우, 읍면동 박스를 숨긴다.
					else if (sggCd.indexOf(",") != -1) {
						$("#pEmdListArea").hide();
						return;
					}
					else {
						$("#pEmdListArea").show();
					}
					
					$policyWritePopup.request.getEmdList(sidoCd, sggCd);
				});
				
				//읍면동 선택 이벤트 처리
				$("body").on("change", "#pEmdList", function() {
					var obj = $("#pEmdList option:selected");
					var emdCd = obj.val();
					var admCd = obj.attr("admCd");
					$policyWritePopup.ui.selectedAdmCd = admCd;
					$policyWritePopup.ui.selectedEmdCd = emdCd;
					$policyWritePopup.ui.checkBoundLevel(admCd);
				});
				
				//비자치구여부
				$("body").on("click", "#atdrcYn", function() {
					$("#pEmdListArea").hide();
					$policyWritePopup.ui.selectedAdmCd = $policyWritePopup.ui.selectedSidoCd;
					$policyWritePopup.ui.checkBoundLevel($policyWritePopup.ui.selectedAdmCd );
					$policyWritePopup.request.getSggList($policyWritePopup.ui.selectedSidoCd);
				});
				
				//경계레벨 선택 이벤트
				$("body").on("click", "#bordArea li>a", function() {
					$("#bordArea li>a").removeClass("on");
					$(this).addClass("on");
					var id = $(this).parent().attr("id");
					var admCd = $policyWritePopup.ui.selectedAdmCd;
					switch(id) {
						case "sggBord": //시군구 경계
							$policyWritePopup.ui.boundLevel = 1;
							break;
						case "emdBord": //읍면동 경계
							switch (admCd.length) {
								case 2:
									$policyWritePopup.ui.boundLevel = 2;
									break;
								case 5:
									$policyWritePopup.ui.boundLevel = 1;
									break;
								default:
									break;
							}
							break;
						case "jibgaeBord": //집계구 경계
							switch (admCd.length) {
								case 5:
									$policyWritePopup.ui.boundLevel = 2;
									break;
								case 7:
									$policyWritePopup.ui.boundLevel = 1;
									break;
								default:
									break;
							}
							break;
					} 
					
				});
				
				//대상지역 선택	
				$("body").on("click",".mainIndex_stepBox label",function(){
					$(".mainIndex_stepBox label").removeClass("on");
					$(".mainIndex_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
			},
			
			/**
		     * 
		     * @name         : linkTooltip
		     * @description  : 
		     * @date         : 2015. 10. 09. 
		     * @author	     : 최재영
		     * @history
		     */		
			linkTooltip : function(){
				$("a").tooltip({ 
					open: function( event, ui ) {
						var target = $(this);
						setTimeout(function() {
							$(".ui-tooltip").css("z-index", "10000");
							$(".ui-tooltip .subj").text(target.attr("data-subj"));
							 ui.tooltip.css("max-width", "400px");
							 ui.tooltip.css("top", event.clientY);
						},100);
						
					},
					position: {
					      my: "left+10 top", at: "right top", 
					      collision : "flip",
					      using: function( position, feedback ) {
					    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
					    		  $( this ).css( position ).prepend("<span class='subj'></span>");
					    	  }else {
					    		  $( this ).css( position ); 
					    	  }
					    	  
					          $( "<div>" )
					           /* .addClass( "arrow" )*/
					            .addClass( feedback.vertical )
					            .addClass( feedback.horizontal )
					            .appendTo( this );
					      }
					},
					content: function () {
						var title = $(this).attr("title");
						title = title.replace(/&lt;p&gt;/gi, '');
						title = title.replace(/&lt;p&gt;/gi, '');
						title = title.replace(/&lt;/gi, '<');
						title = title.replace(/&gt;/gi, '>');
						title = title.replace(/&quot;/gi, '');
						$(this).attr("title", title); 
						return $(this).prop('title');
			        }
				});
			}
	};

}(window, document));