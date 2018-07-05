/**
 * 지도 화면의 네비게이션에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/02/05  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function (W, D) {
	W.mapNavigation = W.mapNavigation || {};
	
	mapNavigation = {
		
		UI : function () {
			
			var that = this;
			this.delegate = "";
			this.objectId = "";
			this.sidoSelectId = "";
			this.sggSelectId = "";
			this.admSelectId = "";
			this.firstBoolean = false;
			this.curMapId = null, //현재 선택된 맵 ID (0, 1)
			this.curMap = null; //현재 선택된 맵
			this.data = []; //리턴 데이터
			this.sggView = true; //시군구 보이기
			this.admView = true; //읍면동 보이기
			this.isThematicMap = false;
			this.sidoList = null;
			
			this.create = function (objectId, type, delegate) {
				this.objectId = objectId;
				this.sidoSelectId = "sidoSelect_" + objectId;
				this.sggSelectId = "sggSelect_" + objectId;
				this.admSelectId = "admSelect_" + objectId;
				this.curMapId = parseInt(type) - 1;
				var classNm = "";
				var html = "";
				
				if(this.isThematicMap) {
					classNm = "-right";
				}
				
				html += "<div class='interactiveSelect' id='location_" + objectId + "'>서울특별시 강남구 도곡1동</div>";
				html += "	<div class='navi-content"+classNm+"'' id='content_" + objectId + "'>";
				html += "		<div class='scrl-first'>";
				html += "			<ul id='" + this.sidoSelectId + "'>";
				html += "			</ul>";
				html += "		</div>";
				html += "		<div class='scrl-second'>";
				html += "			<ul id='" + this.sggSelectId + "'>";
				html += "			</ul>";
				html += "		</div>";
				html += "		<div class='scrl-third'>";
				html += "			<ul id='" + this.admSelectId + "'>";
				html += "			</ul>";
				html += "		</div>";
				html += "		<div class='navi-action'>";
				html += "			<img id='navi-confirm' src='/img/popup/btn_confirm.png' alt='확인' style='cursor: pointer;'>";
				html += "			<img id='navi-cancel' src='/img/popup/btn_close.png' alt='닫기' style='cursor: pointer;'>";
				html += "		<img id='addr_magni' src='/img/popup/magni_plus.png' alt='돋보기' style='cursor: pointer;'></img>";
				html += "		</div>";
				html += "	</div>";
				html += "</div>";
				$("#" + this.objectId).html(html);
				
				//mng_s 주용민
				$("#addr_magni").click(function(){
					if(!$("#addr_magni").hasClass("on")){
						$("#addr_magni").attr("src","/img/popup/magni_minus.png");
						$("#addr_magni").addClass("on");
						$("#interactive_magni").attr("src","/img/popup/magni_minus.png");
						$("#interactive_magni").addClass("on");
						$(".navi-content").css({"width":"580px","height":"441px"});
						$(".scrl-first").css({"width":"206px","height":"394px"});
						$(".scrl-second").css({"width":"186px","height":"394px"});
						$(".scrl-third").css({"width":"186px","height":"394px"});
						$(".li-alink").css("height","25px");
						$(".li-strong").css({"font-size":"23px","overflow":"visible","width":"-1px"});
					}else{
						$("#addr_magni").attr("src","/img/popup/magni_plus.png");
						$("#addr_magni").removeClass("on");
						$("#interactive_magni").attr("src","/img/popup/magni_plus.png");
						$("#interactive_magni").removeClass("on");
						$(".navi-content").css({"width":"380px","height":"241px"});
						$(".scrl-first").css({"width":"126px","height":"194px"});
						$(".scrl-second").css({"width":"126px","height":"194px"});
						$(".scrl-third").css({"width":"126px","height":"194px"});
						$(".li-alink").css("height","20px");
						$(".li-strong").css({"font-size":"15px","overflow":"hidden","width":"100px"});
					}
				});
				//mng_e 주용민
				
				//확인버튼 클릭 시
				$("#content_" + objectId).find("#navi-confirm").click(function () {
					$("#content_" + objectId).hide();
					that.naviConfirm();
					//mng_s 주용민
					if($("#addr_magni").hasClass("on")){
						$("#addr_magni").attr("src","/img/popup/magni_plus.png");
						$("#addr_magni").removeClass("on");
						$(".navi-content").css({"width":"380px","height":"241px"});
						$(".scrl-first").css({"width":"126px","height":"194px"});
						$(".scrl-second").css({"width":"126px","height":"194px"});
						$(".scrl-third").css({"width":"126px","height":"194px"});
						$(".li-alink").css("height","20px");
						$(".li-strong").css({"font-size":"15px","overflow":"hidden","width":"100px"});
					}
					//mng_e 주용민
				});
				
				//취소버튼 클릭 시
				$("#content_" + objectId).find("#navi-cancel").click(function () {
					$("#content_" + objectId).hide();
					$("#location_" + objectId).css("background-image", "url(/img/ico/ico_arr01.gif)");
				});
				
				//상세 선택창 열기
				$("#location_" + objectId).click(function () {
					if ($("#content_" + objectId).is(":visible")) {
						$("#content_" + objectId).hide();
						$("#location_" + objectId).css("background-image", "url(/img/ico/ico_arr01.gif)");
					}
					else {
						$("#content_" + objectId).show();
						$("#location_" + objectId).css("background-image", "url(/img/ico/ico_arr02.gif)");
					}
				});
				
				if (delegate != undefined) {
					this.initialize(delegate);
				}
			};

			this.initialize = function (delegate) {
				this.delegate = delegate;
				if (!this.isThematicMap) {
					this.delegate.mapList[this.curMapId].mapNavigation = this;
					this.curMap = this.delegate.mapList[this.curMapId];
					if (this.firstBoolean) {
						this.getLocation(delegate);
					}
				} else {
					this.curMap = this.delegate.sMap;
				}
				
				this.firstBoolean = false;
			};
			
			//현재 위치 가져오기 (좌표)
			this.getLocationCoords = function (delegate) {
				var map = this.delegate;
				var center = [989674, 1818313];			// 대전 정부 청사
				
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						var utmkXY = new sop.LatLng (position.coords.latitude, position.coords.longitude);
						center = [utmkXY.x, utmkXY.y];
						console.log(position.coords.latitude);
						console.log(position.coords.longitude);
					});
				}
				return center;
			};

			//현재 위치 가져오기
			this.getLocation = function (delegate) {
				var map = this.delegate.mapList[0];
				if(document.location.href.indexOf("?areaCode=") > 1 ){
					var codeMove = document.location.href.split("|");
					var moveZoom = 3;
					if(codeMove.length == 4){
						if(codeMove[1].length == 5){
							moveZoom = 6;
						}else if (codeMove[1].length == 7){
							moveZoom = 10;
						}
						map.mapMove([codeMove[2], codeMove[3]], moveZoom);
					}else{
						map.mapMove([ 989674, 1818313 ], map.zoom);	
					}
				}else if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
						center = [ utmkXY.x, utmkXY.y ];
						console.log(position.coords.latitude);
						console.log(position.coords.longitude);
						var data = "?accessToken="+accessToken+"&addr_type=20"+"&x_coor="+center[0]+"&y_coor="+center[1];
						$.ajax({
				    		"url" : openApiPath + "/OpenAPI3/addr/rgeocode.json" + data	,		    
							"type" : "GET",
							"success" : function(data) {
													if(data.errCd=="-100" || data.errCd == "-401"){
														map.mapMove([ 989674, 1818313 ], map.zoom);
														//2017-08-16 [개발팀] 콜백추가
														map.openApiReverseGeoCode([ 989674, 1818313 ],delegate.rgeocodeCallback);
													}else{
														map.mapMove(center, map.zoom);
														//2017-08-16 [개발팀] 콜백추가
														if (delegate.rgeocodeCallback != undefined && typeof delegate.rgeocodeCallback === "function") {
															delegate.rgeocodeCallback(data);
														}
													}
												},
							"async" : "false",
							"dataType" : "json",
							"error": function(x,o,e){
									map.mapMove([ 989674, 1818313 ], map.zoom);	
									map.openApiReverseGeoCode([ 989674, 1818313 ]);
								}
							});						
//						setTimeout(function() {
//							map.mapMove(center, map.zoom);
//						}, 500);
					}, function (error) {
						map.mapMove([ 989674, 1818313 ], map.zoom);
						map.openApiReverseGeoCode([ 989674, 1818313 ]);
						console.log("브라우져가 기능을 제공하지 않습니다.");
					});
				}else {
					map.mapMove([ 989674, 1818313 ], map.zoom);
					console.log("브라우져가 기능을 제공하지 않습니다.");
				}
			};

			//확인
			this.naviConfirm = function () {
				var sidoId = $("#" + this.sidoSelectId).find(".on").attr("id");
				var sggId = $("#" + this.sggSelectId).find(".on").attr("id");
				var admId = $("#" + this.admSelectId).find(".on").attr("id");
				
				if(sidoId == undefined) {
					return;
				}
				
				var sidoArray = sidoId.split("/");
				var sggIdArray = "";
				var admIdArray = "";
				if (admId != undefined) {
					admIdArray = admId.split("/");
					this.curMap.mapMove([ admIdArray[1], admIdArray[2] ], 10); //지도 위치 이동
				}
				else if (sggId != undefined) {
					sggIdArray = sggId.split("/");
					var zoom = 6;
					if (admId == undefined) {
						zoom = 5; 
					}
					this.curMap.mapMove([ sggIdArray[1], sggIdArray[2] ], zoom); //지도 위치 이동
				}
				else {
					this.curMap.mapMove([ sidoArray[1], sidoArray[2] ], 3); //지도 위치 이동
				}
				
				console.log( sidoArray[1]);
				console.log(sidoArray[2]);
				
			};

			//시군구 검색
			this.sggSelectSet = function (sido_cd) {
				if (!this.sggView) {
					return;
				}
				var sidoArray = sido_cd.split("/");
				if (!this.firstBoolean) {
					//오픈API 호출
					this.curMap.curSidoCd = sidoArray[0];
					this.curMap.curSiggCd = null;
					this.curMap.curDongCd = null;
				}
				var sopPortalSggObj = new sop.portal.sgg.api();
				sopPortalSggObj.addParam("sido_cd", sidoArray[0]);
				sopPortalSggObj.addParam("base_year", this.curMap.bnd_year);
				sopPortalSggObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/sggAddressList.json",
					options : {
						target : this
					}
				});
			};

			//읍면동 검색 
			this.admSelectSet = function (sgg_cd) {
				if (!this.admView) {
					return;
				}
				var sidoId = $("#" + this.sidoSelectId).find(".on").attr("id");
				var sidoArray = sidoId.split("/");
				var sggArray = sgg_cd.split("/");
				if (!this.firstBoolean) {
					//지도 위치 이동
					this.curMap.curSidoCd = sidoArray[0];
					this.curMap.curSiggCd = sggArray[0];
					this.curMap.curDongCd = null;
				}
				var sopPortalAdmObj = new sop.portal.adm.api();
				sopPortalAdmObj.addParam("sido_cd", sidoArray[0]);
				sopPortalAdmObj.addParam("sgg_cd", sggArray[0]);
				sopPortalAdmObj.addParam("base_year", this.curMap.bnd_year);
				sopPortalAdmObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/admAddressList.json",
					options : {
						target : this
					}
				});
			},

			//맵 이동 시 시도/시군구/읍면동 셀렉트박스 변경
			this.reverseOnSelectChange = function (map) {
				this.curMap = map;
				var sopPortalAllAddressObj = new sop.portal.allAddress.api();
				sopPortalAllAddressObj.addParam("sido_cd", this.curMap.curSidoCd);
				sopPortalAllAddressObj.addParam("sgg_cd", this.curMap.curSiggCd);
				sopPortalAllAddressObj.addParam("dong_cd", this.curMap.curDongCd);
				sopPortalAllAddressObj.addParam("base_year", this.curMap.bnd_year);
				sopPortalAllAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/allAddressList.json",
					options : {
						target : this
					}
				});
			},
			
			//리버스 지오코딩의 검색결과가 없을 경우
			this.notFoundData = function(map) {
				$("#location_" + this.objectId).html("주소가 없는 지역입니다");
				this.curMap = map;
				var sopPortalSidoAddressObj = new sop.portal.sidoAddress.api();
				sopPortalSidoAddressObj.addParam("base_year", this.curMap.bnd_year);
				sopPortalSidoAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/sidoAddressList.json",
					options : {
						target : this
					}
				});
			}
		}
	};
	
	/*********** 시군구 검색 Start **********/
	(function () {
		$class("sop.portal.sgg.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var html = "";
					html += "<li class='li-on'>";
					html += "	<a class='li-alink on'>";
					html += "		<strong class='li-strong on'>전체</strong>";
					html += "	</a>";
					html += "</li>";
					if (result.sggList != undefined) {
						for ( var i = 0; i < result.sggList.length; i++) {
							var elem = result.sggList[i];
							html += "			<li>";
							html += "				<a class='li-alink' id='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
							html += "					<strong class='li-strong'>" + elem.sgg_nm + "</strong>";
							html += "				</a>";
							html += "			</li>";
						}
					}
					$("#" + that.sggSelectId).empty();
					$("#" + that.sggSelectId).html(html);
					//mng_s 주용민
					if($("#addr_magni").hasClass("on")){
						$(".li-alink").css("height","25px");
						$(".li-strong").css({"font-size":"23px","overflow":"visible","width":"-1px"});
					}
					//mng_e 주용민
					$("#" + that.admSelectId).empty();
					
					$("#" + that.sggSelectId).find("li").click(function () {
						$(this).parent().find("li").removeClass("li-on");
						$(this).parent().find("li > a, li > a > strong").removeClass("on");
						$(this).find("a, a > strong").addClass("on");
						$(this).addClass("li-on");
						if ($(this).find("a").attr("id") == undefined) {
							$("#" + that.admSelectId).empty();
						}
						else {
							that.admSelectSet($(this).find("a").attr("id"));
						}
					});
					
					//시군구 더블클릭 시 바로 이동
					$("#" + that.sggSelectId).find("li").dblclick(function () {
						that.naviConfirm();
					});
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/*********** 시군구 검색 End **********/
	
	/*********** 읍면동 검색 Start **********/
	(function () {
		$class("sop.portal.adm.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var html = "";
					html += "<li class='li-on'>";
					html += "	<a class='li-alink on'>";
					html += "		<strong class='li-strong on'>전체</strong>";
					html += "	</a>";
					html += "</li>";
					if (result.admList != undefined) {
						for ( var i = 0; i < result.admList.length; i++) {
							var elem = result.admList[i];
							html += "			<li>";
							html += "				<a class='li-alink' id='" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
							html += "					<strong class='li-strong'>" + elem.emdong_nm + "</strong>";
							html += "				</a>";
							html += "			</li>";
						}
					}
					$("#" + that.admSelectId).empty();
					$("#" + that.admSelectId).html(html);
					//mng_s 주용민
					if($("#addr_magni").hasClass("on")){
						$(".li-alink").css("height","25px");
						$(".li-strong").css({"font-size":"23px","overflow":"visible","width":"-1px"});
					}
					//mng_e 주용민
					
					$("#" + that.admSelectId).find("li").click(function () {
						$(this).parent().find("li").removeClass("li-on");
						$(this).parent().find("li > a, li > a > strong").removeClass("on");
						$(this).find("a, a > strong").addClass("on");
						$(this).addClass("li-on");
					});
					
					//읍면동 더블클릭 시 바로 이동
					$("#" + that.admSelectId).find("li").dblclick(function () {
						that.naviConfirm();
					});
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/*********** 읍면동 검색 End **********/
	
	/*********** 시도/시군구/읍면동 일괄 검색 Start **********/
	(function () {
		$class("sop.portal.allAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var sido_elem = "";
					var sgg_elem = "";
					var adm_elem = "";
					
					var html = "";
					//시도 생성
					that.sidoList = result.sidoList;
					for ( var i = 0; i < result.sidoList.length; i++) {
						var elem = result.sidoList[i];
						if (elem.sido_cd == result.sido_cd) {
							html += "			<li class='li-on'>";
							html += "				<a class='li-alink on' id='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
							html += "					<strong class='li-strong on'>" + elem.sido_nm + "</strong>";
							html += "				</a>";
							html += "			</li>";
							sido_elem = elem;
						}
						else {
							html += "			<li>";
							html += "				<a class='li-alink' id='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
							html += "					<strong class='li-strong'>" + elem.sido_nm + "</strong>";
							html += "				</a>";
							html += "			</li>";
						}
					}
					$("#" + that.sidoSelectId).empty();
					$("#" + that.sidoSelectId).html(html);
					
					$("#" + that.sidoSelectId).find("li").click(function () {
						$(this).parent().find("li").removeClass("li-on");
						$(this).parent().find("li > a, li > a > strong").removeClass("on");
						$(this).find("a, a > strong").addClass("on");
						$(this).addClass("li-on");
						that.sggSelectSet($(this).find("a").attr("id"));
					});
					
					//시도 더블클릭 시 바로 이동
					$("#" + that.sidoSelectId).find("li").dblclick(function () {
						that.naviConfirm();
					});
					
					//시군구 생성
					html = "";
					html += "<li>";
					html += "	<a class='li-alink'>";
					html += "		<strong class='li-strong'>전체</strong>";
					html += "	</a>";
					html += "</li>";
					if (result.sggList != undefined) {
						for ( var i = 0; i < result.sggList.length; i++) {
							var elem = result.sggList[i];
							if (elem.sgg_cd == result.sgg_cd) {
								html += "			<li class='li-on'>";
								html += "				<a class='li-alink on' id='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
								html += "					<strong class='li-strong on'>" + elem.sgg_nm + "</strong>";
								html += "				</a>";
								html += "			</li>";
								sgg_elem = elem;
							}
							else {
								html += "			<li>";
								html += "				<a class='li-alink' id='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
								html += "					<strong class='li-strong'>" + elem.sgg_nm + "</strong>";
								html += "				</a>";
								html += "			</li>";
							}
						}
					}
					$("#" + that.sggSelectId).empty();
					if (that.sggView) {
						$("#" + that.sggSelectId).html(html);
					}
					
					$("#" + that.sggSelectId).find("li").click(function () {
						$(this).parent().find("li").removeClass("li-on");
						$(this).parent().find("li > a, li > a > strong").removeClass("on");
						$(this).find("a, a > strong").addClass("on");
						$(this).addClass("li-on");
						if ($(this).find("a").attr("id") == undefined) {
							$("#" + that.admSelectId).empty();
						}
						else {
							that.admSelectSet($(this).find("a").attr("id"));
						}
					});
					
					//시군구 더블클릭 시 바로 이동
					$("#" + that.sggSelectId).find("li").dblclick(function () {
						that.naviConfirm();
					});
					
					//읍면동 생성
					html = "";
					html += "<li>";
					html += "	<a class='li-alink'>";
					html += "		<strong class='li-strong'>전체</strong>";
					html += "	</a>";
					html += "</li>";
					if (result.admList != undefined) {
						for ( var i = 0; i < result.admList.length; i++) {
							var elem = result.admList[i];
							if (elem.emdong_cd == result.dong_cd) {
								html += "			<li class='li-on'>";
								html += "				<a class='li-alink on' id='" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
								html += "					<strong class='li-strong on'>" + elem.emdong_nm + "</strong>";
								html += "				</a>";
								html += "			</li>";
								adm_elem = elem;
							}
							else {
								html += "			<li>";
								html += "				<a class='li-alink' id='" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
								html += "					<strong class='li-strong'>" + elem.emdong_nm + "</strong>";
								html += "				</a>";
								html += "			</li>";
							}
						}
					}
					$("#" + that.admSelectId).empty();
					if (that.admView) {
						$("#" + that.admSelectId).html(html);
					}
					
					$("#" + that.admSelectId).find("li").click(function () {
						$(this).parent().find("li").removeClass("li-on");
						$(this).parent().find("li > a, li > a > strong").removeClass("on");
						$(this).find("a, a > strong").addClass("on");
						$(this).addClass("li-on");
					});
					
					//읍면동 더블클릭 시 바로 이동
					$("#" + that.admSelectId).find("li").dblclick(function () {
						that.naviConfirm();
					});
					
					that.curMap.curSidoCd = result.sido_cd;
					that.curMap.curSiggCd = result.sgg_cd;
					that.curMap.curDongCd = result.dong_cd;
					
					setTimeout(function() {
						var sidoTop = $("#" + that.sidoSelectId).find(".on").position().top;
						$("#content_" + that.objectId).find(".scrl-first").scrollTop(sidoTop);
						$("#location_" + that.objectId).html(sido_elem.sido_nm);
						
						if (that.sggView) {
							if($("#" + that.sggSelectId).find(".on").position() != undefined) {
								var sggTop = $("#" + that.sggSelectId).find(".on").position().top;
								$("#content_" + that.objectId).find(".scrl-second").scrollTop(sggTop);
								$("#location_" + that.objectId).html(sido_elem.sido_nm + " " + sgg_elem.sgg_nm);	
							}
						}
						
						if (that.admView) {
							if($("#" + that.admSelectId).find(".on").position() != undefined) {
								var admTop = $("#" + that.admSelectId).find(".on").position().top;
								$("#content_" + that.objectId).find(".scrl-third").scrollTop(admTop);
								$("#location_" + that.objectId).html(sido_elem.sido_nm + " " + sgg_elem.sgg_nm + " " + adm_elem.emdong_nm);
							}
						}
					}, 200);
					
					
					that.data = {
						"sido_elem" : sido_elem,
						"sgg_elem" : sgg_elem,
						"adm_elem" : adm_elem
					};
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시도/시군구/읍면동 일괄 검색 End **********/
	
	/*********** 시도 검색 Start **********/
	(function () {
		$class("sop.portal.sidoAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var sido_elem = "";
					var sgg_elem = "";
					var adm_elem = "";
					
					var html = "";
					//시도 생성
					that.sidoList = result.sidoList;
					for ( var i = 0; i < result.sidoList.length; i++) {
						var elem = result.sidoList[i];
						html += "			<li>";
						html += "				<a class='li-alink' id='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
						html += "					<strong class='li-strong'>" + elem.sido_nm + "</strong>";
						html += "				</a>";
						html += "			</li>";
					}
					$("#" + that.sidoSelectId).empty();
					$("#" + that.sidoSelectId).html(html);
					
					$("#" + that.sidoSelectId).find("li").click(function () {
						$(this).parent().find("li").removeClass("li-on");
						$(this).parent().find("li > a, li > a > strong").removeClass("on");
						$(this).find("a, a > strong").addClass("on");
						$(this).addClass("li-on");
						that.sggSelectSet($(this).find("a").attr("id"));
					});
					
					//시도 더블클릭 시 바로 이동, 9월 서비스
					$("#" + that.sidoSelectId).find("li").dblclick(function () {
						that.naviConfirm();
					});
					
					$("#" + that.sggSelectId).empty();
					$("#" + that.admSelectId).empty();
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시도 검색 End **********/
	
}(window, document));