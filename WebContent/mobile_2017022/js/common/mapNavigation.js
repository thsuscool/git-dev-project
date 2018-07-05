/**
 * 지도 화면의 네비게이션에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/02/05  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {

	W.mapNavigation = W.mapNavigation || {};

	mapNavigation = {

		UI: function(mapName) {

			var that = this;
			this.changeLocation = false;
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
			this.mapName = null;
			this.create = function(objectId, type, delegate) {
				this.mapName = mapName;
				this.objectId = objectId;
				this.sidoSelectId = "sidoSelect_" + objectId;
				this.sggSelectId = "sggSelect_" + objectId;
				this.admSelectId = "admSelect_" + objectId;

				this.curMapId = parseInt(type) - 1;
				var classNm = "";
				var html = "";

				if (this.isThematicMap) {
					classNm = "-right";
				}

				//확인버튼 클릭 시
				$("button[data-id=navi-confirm]").click(function() {
					if(mapName&&mapName==="biz"&&$("#admSelect_mapNavi_1").val().replace(/ /gi,'')==""){
						messageAlert.open("알림", "읍면동을 선택해주시길 바랍니다.");
						return false;
					}
					$(".Open_Type1").hide();
					that.naviConfirm();
				});

				if (delegate != undefined) {
					this.initialize(delegate);
				}
			};

			this.initialize = function(delegate) {
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
			this.getLocationCoords = function(delegate) {
				var map = this.delegate;
				var center = [989674, 1818313]; // 대전 정부 청사

				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
						center = [utmkXY.x, utmkXY.y];
						//						console.log(position.coords.latitude);
						//						console.log(position.coords.longitude);
					});
				}
				return center;
			};

			//현재 위치 가져오기
			this.getLocation = function(delegate) {
				var map = this.curMap;
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
						var center = [utmkXY.x, utmkXY.y];
						map.mapMove(center, map.zoom);
					}, function(error) {
						map.mapMove([989674, 1818313], map.zoom);
						console.log("브라우져가 기능을 제공하지 않습니다.");
					});
				} else {
					map.mapMove([989674, 1818313], map.zoom);
					console.log("브라우져가 기능을 제공하지 않습니다.");
				}
			};
			this.setCurrentMarker = function(delegate, callback) {
				if (navigator.geolocation) {
					var center = [989674, 1818313];
					var map = this.curMap;
					if (map) {
						navigator.geolocation.getCurrentPosition(function(position) {
							var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
							center = [utmkXY.x, utmkXY.y];
							map.mapMove(center, map.zoom);
							var marker = map.addMarker(center[0], center[1], {
								tooltipMsg: undefined
							});
							if (callback != undefined && typeof callback === "function") {
								callback(center, marker);
							}
						}, function(error) {
							if (error.code === 1) {
								console.warn("현재위치를 동의하지 않아 기본 설정값인 대전 정부청사로 이동");
							} else if (error.code === 2) {
								console.warn("GPS를 확인할 수 없습니다");
							} else if (error.code === 3) {
								console.warn("시간이 초과되었습니다");
							} else {
								console.error("알수 없는 에러");
							}
							map.mapMove(center, map.zoom);
							var marker = map.addMarker(center[0], center[1], {
								tooltipMsg: undefined
							});
							if (callback != undefined && typeof callback === "function") {
								callback(center, marker);
							}
						}, {
							timeout: 5000
						});
					} else {
						console.error("지도가 존재하지 않습니다.");
					}
				}
			};
				//확인
			this.naviConfirm = function(upsacre) {
				var sidoId = $("#" + this.sidoSelectId + " option:selected").val();
				var sggId = $("#" + this.sggSelectId + " option:selected").val();
				var admId = $("#" + this.admSelectId + " option:selected").val();
				if (sidoId == undefined) {
					return;
				}
				var sidoArray = sidoId.split("/");
				var sggIdArray = "";
				var admIdArray = "";
				var level = "";
				if(sidoId=="00"){
					this.curMap.gMap.setZoom(1); //지도 위치 이동
					level = "1";
				}else{
					if (admId != undefined & admId != "") {
						admIdArray = admId.split("/");
						this.curMap.mapMove([admIdArray[1], admIdArray[2]], upsacre?level=9:level=10); //지도 위치 이동
					} else if (sggId != undefined & sggId != "") {
						sggIdArray = sggId.split("/");
						this.curMap.mapMove([sggIdArray[1], sggIdArray[2]], upsacre?level=5:level=6); //지도 위치 이동
					} else {
						this.curMap.mapMove([sidoArray[1], sidoArray[2]], upsacre?level=3:level=4); //지도 위치 이동
					}
				}
				var param = getParams();
				var title = $(".MapTitle h3").text();
	            var adm_nm = $("#sidoSelect_mapNavi_1 option:selected").text() + " " + $("#sggSelect_mapNavi_1 option:selected").text() + " " + $("#admSelect_mapNavi_1 option:selected").text();
	            var parameter = "theme="+param["theme"]+"&stat_thema_map_id="+param["stat_thema_map_id"]+"&mapType="+param["mapType"];
	            apiLogWrite2("L0", "L02", title, parameter, level, adm_nm);
			};

			//시군구 검색
			this.sggSelectSet = function(sido_cd) {
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
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
					options: {
						target: this
					}
				});
			};

			//읍면동 검색 
			this.admSelectSet = function(sgg_cd) {

					if (!this.admView) {
						return;
					}
					var sidoId = $("#" + this.sidoSelectId + " option:selected").val();


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
						method: "POST",
						async: true,
						url: contextPath + "/ServiceAPI/map/admAddressList.json",
						options: {
							target: this
						}
					});
				},

				//맵 이동 시 시도/시군구/읍면동 셀렉트박스 변경
				this.reverseOnSelectChange = function(map) {
					this.curMap = map;
					var sopPortalAllAddressObj = new sop.portal.allAddress.api();
					sopPortalAllAddressObj.addParam("sido_cd", this.curMap.curSidoCd);
					sopPortalAllAddressObj.addParam("sgg_cd", this.curMap.curSiggCd);
					sopPortalAllAddressObj.addParam("dong_cd", this.curMap.curDongCd);
					sopPortalAllAddressObj.addParam("base_year", this.curMap.bnd_year);
					sopPortalAllAddressObj.request({
						method: "POST",
						async: true,
						url: contextPath + "/ServiceAPI/map/allAddressList.json",
						options: {
							target: this
						}
					});
				},

				//리버스 지오코딩의 검색결과가 없을 경우
				this.notFoundData = function(map) {
					$("#location_" + this.objectId).find("span").html("주소가 없는 지역입니다");
					this.curMap = map;
					var sopPortalSidoAddressObj = new sop.portal.sidoAddress.api();
					sopPortalSidoAddressObj.addParam("base_year", this.curMap.bnd_year);
					sopPortalSidoAddressObj.request({
						method: "POST",
						async: true,
						url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
						options: {
							target: this
						}
					});
				}
		}
	};

	/*********** 시군구 검색 Start **********/
	(function() {
		$class("sop.portal.sgg.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var that = options.target;
				$("select[data-id=" + that.sggSelectId + "]").empty();
				if (res.errCd == "0") {
					if (result.sggList != undefined) {
						var sggList = result.sggList.sort(dynamicSort("sgg_nm"));
						if(that.mapName==undefined||that.mapName!="biz"){
							$("select[data-id=" + that.sggSelectId + "]").append("<option  value='' selected>전체</option>");
						}
						for (var i = 0; i < sggList.length; i++) {
							var elem = sggList[i];
							$("select[data-id=" + that.sggSelectId + "]").append("<option  value='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "' >" + elem.sgg_nm + "</option>");
						}

					}
					$("select[data-id=" + that.admSelectId + "]").empty();
					var changeItem = function(element){
						if ($(element).val() != "") {
							that.admSelectSet($(element).val());
							$("select[data-id=" + that.sggSelectId + "]").val($(element).val());
						}
					}
					if(that.mapName==="biz"){
						changeItem($("select[data-id=" + that.sggSelectId + "]:eq(0)"));
					}
					$("select[data-id=" + that.sggSelectId + "]").change(function() {
						changeItem($(this));
					});

				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 시군구 검색 End **********/

	/*********** 읍면동 검색 Start **********/
	(function() {
		$class("sop.portal.adm.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					$("select[data-id=" + that.admSelectId + "]").empty();
					if (result.admList != undefined) {
						var admList = result.admList.sort(dynamicSort("emdong_nm"));
						if(that.mapName==undefined||that.mapName!="biz"){
							$("select[data-id=" + that.admSelectId + "]").append("<option  value=''>전체</option>");
						}
						for (var i = 0; i < admList.length; i++) {
							var elem = admList[i];
							$("select[data-id=" + that.admSelectId + "]").append("<option  value='" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "' >" + elem.emdong_nm + "</option>");
						}
					}
					$("select[data-id=" + that.admSelectId + "]").change(function() {
						if ($(this).val() != "") {
							$("select[data-id=" + that.admSelectId + "]").val($(this).val());
						}
					});
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 읍면동 검색 End **********/

	/*********** 시도/시군구/읍면동 일괄 검색 Start **********/
	(function() {
		$class("sop.portal.allAddress.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var that = options.target;
				var navigationSelect = navigationSelectResult(that.curMap.gMap.getZoom());
				if (res.errCd == "0") {
					var sido_elem = "";
					var sgg_elem = "";
					var adm_elem = "";
					var html = "";
					//시도 생성
					$("select[data-id=" + that.sidoSelectId + "]").empty();
					var sidoList = result.sidoList.sort(dynamicSort("sido_cd"));
					var countryValue = "00";
					$("select[data-id=" + that.sidoSelectId + "]").append("<option value='"+countryValue+"'>전국</option>");
					var hasSelected = false;
					for (var i = 0; i < sidoList.length; i++) {
						var elem = sidoList[i];
						if (navigationSelect[0]&&(elem.sido_cd == result.sido_cd)) {
							hasSelected = true;
							$("select[data-id=" + that.sidoSelectId + "]").append("<option  value='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "' selected>" + elem.sido_nm + "</option>");
							sido_elem = elem;
						} else {
							$("select[data-id=" + that.sidoSelectId + "]").append("<option  value='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>" + elem.sido_nm + "</option>");
						}

					}
					$("select[data-id=" + that.sidoSelectId + "]").change(function() {
						that.changeLocation = true;
						$("select[data-id=" + that.sggSelectId + "]").empty();
						$("select[data-id=" + that.admSelectId + "]").empty();
						that.sggSelectSet($(this).val());
						$("select[data-id=" + that.sidoSelectId + "]").val($(this).val());
					});
					//시군구 생성

					$("select[data-id=" + that.sggSelectId + "]").empty();
					if($("select[data-id=" + that.sidoSelectId + "]").val()==countryValue){
						$("select[data-id=" + that.sggSelectId + "]").append("<option  value=''>전체</option>");
					}else{
						if (navigationSelect[0]&&that.sggView) {
							if (result.sggList != undefined) {
								var sggList = result.sggList.sort(dynamicSort("sgg_nm"));
								if(that.mapName==undefined||that.mapName!="biz"){
									$("select[data-id=" + that.sggSelectId + "]").append("<option  value='' "+(navigationSelect[1]?"selected":"")+">전체</option>");
								}
								for (var i = 0; i < sggList.length; i++) {
									var elem = sggList[i];
									if (navigationSelect[1]&&(elem.sgg_cd == result.sgg_cd)) {
										$("select[data-id=" + that.sggSelectId + "]").append("<option  value='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "' selected>" + elem.sgg_nm + "</option>");
										sgg_elem = elem;
									} else {
										$("select[data-id=" + that.sggSelectId + "]").append("<option  value='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "' >" + elem.sgg_nm + "</option>");
									}
								}
							}
							$("select[data-id=" + that.sggSelectId + "]").change(function() {
								that.changeLocation = true;
								$("select[data-id=" + that.admSelectId + "]").empty();
								if ($(this).val() != "") {
									that.admSelectSet($(this).val());
									$("select[data-id=" + that.sggSelectId + "]").val($(this).val());
								}
							});
						}
					}
					//읍면동 생성

					$("select[data-id=" + that.admSelectId + "]").empty();
					if (navigationSelect[1]&&that.admView) {
						if (result.admList != undefined) {
							if(that.mapName==undefined||that.mapName!="biz"){
								$("select[data-id=" + that.admSelectId + "]").append("<option  value='' "+(navigationSelect[2]?"selected":"")+">전체</option>");
							}
							var admList = result.admList.sort(dynamicSort("emdong_nm"));
							for (var i = 0; i < admList.length; i++) {
								var elem = admList[i];
								if (navigationSelect[2]&&(elem.emdong_cd == result.dong_cd)) {
									$("select[data-id=" + that.admSelectId + "]").append("<option  value='" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "' selected>" + elem.emdong_nm + "</option>");
									adm_elem = elem;
								} else {
									$("select[data-id=" + that.admSelectId + "]").append("<option  value='" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "' >" + elem.emdong_nm + "</option>");

								}
							}
						}
						$("select[data-id=" + that.admSelectId + "]").change(function() {
							that.changeLocation = true;
							if ($(this).val() != "") {
								$("select[data-id=" + that.admSelectId + "]").val($(this).val());
							}
						});
					}
					that.curMap.curSidoCd = result.sido_cd;
					that.curMap.curSiggCd = result.sgg_cd;
					that.curMap.curDongCd = result.dong_cd;

					that.data = {
						"sido_elem": sido_elem,
						"sgg_elem": sgg_elem,
						"adm_elem": adm_elem
					};
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {

			}
		});
	}());
	/*********** 시도/시군구/읍면동 일괄 검색 End **********/

	/*********** 시도 검색 Start **********/
	(function() {
		$class("sop.portal.sidoAddress.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var that = options.target;
				$("select[data-id=" + that.sidoSelectId + "]").empty();
				$("select[data-id=" + that.sggSelectId + "]").empty();
				$("select[data-id=" + that.admSelectId + "]").empty();
				if (res.errCd == "0") {
					var sidoList = result.sidoList.sort(dynamicSort("sido_cd"));
					for (var i = 0; i < sidoList.length; i++) {
						var elem = sidoList[i];
						$("select[data-id=" + that.sidoSelectId + "]").append("<option  value='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>" + elem.sido_nm + "</option>");
					}
					$("select[data-id=" + that.sidoSelectId + "]").change(function() {
						that.sggSelectSet($(this).val());
						$("select[data-id=" + that.sidoSelectId + "]").val($(this).val());
					});
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {

			}
		});
	}());
	/*********** 시도 검색 End **********/
	function navigationSelectResult(mapZoom){
		var sidoSelect = false;
		var sggSelect = false;
		var admSelect = false;
		if (mapZoom < 2) {
			sidoSelect = false;
		}else if (mapZoom <= 4) {
			sidoSelect = true;
		}else if (mapZoom <= 6) {
			sidoSelect = true;
			sggSelect = true;
		}else if (mapZoom > 6) {
			sidoSelect = true;
			sggSelect = true;
			admSelect = true;
		}
		return [sidoSelect,sggSelect,admSelect];
	}
}(window, document));

function getParams() {
    // 파라미터가 담길 배열
    var param = new Array();
 
    // 현재 페이지의 url
    var url = decodeURIComponent(location.href);
    // url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
    url = decodeURIComponent(url);
 
    var params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring( url.indexOf('?')+1, url.length );
    // 파라미터 구분자("&") 로 분리
    params = params.split("&");

    // params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
    var size = params.length;
    var key, value;
    for(var i=0 ; i < size ; i++) {
        key = params[i].split("=")[0];
        value = params[i].split("=")[1];

        param[key] = value;
    }

    return param;
}