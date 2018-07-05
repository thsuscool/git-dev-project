/**
 * 지도 화면의 네비게이션에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/11/18  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function (W, D) {

	W.$mapNavigation = W.$mapNavigation || {};
	
	$(document).ready(function () {
		//$mapNavigation.event.setUIEvent();		//초기값 세팅
	});
	
	$mapNavigation.ui = {
		delegate : "",
		curMapId : null, //현재 선택된 맵 ID (0, 1)
		curMap : null, //현재 선택된 맵
		firstBoolean : true, // 처음로딩 여부
		firstValue : "", // 처음로딩 임시 저장값
		firstSggCd : "", // 처음로딩 좌표(시군구)
		firstAdmCd : "", // 처음로딩 좌표(읍면동)
		setMapObj : function (_map) {
			this.curMap = _map;
		},
		initialize : function (delegate) {
			this.delegate = delegate;
			if(this.firstBoolean) {
				this.getLocation(delegate);
			}
			this.firstBoolean = false;
		},
		
		//현재 위치 가져오기 (좌표)
		getLocationCoords : function (delegate) {
			var map = this.delegate;
			var center = [989674, 1818313];			// 대전 정부 청사
			
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					var utmkXY = new sop.LatLng (position.coords.latitude, position.coords.longitude);
					center = [utmkXY.x, utmkXY.y];
				});
			}
			return center;
		},
		
		//전국 지도보기
		allCountrySet : function (type) {
			this.curMapId = parseInt(type) - 1;
			
			this.curMap.mapMove([ "957082", "1856829" ], 1);
		},
		
		//시도 검색
		sidoSelectSet : function (type) {
			this.curMapId = parseInt(type) - 1;
			
			var sopPortalSidoObj = new sop.portal.sido.api();
			sopPortalSidoObj.addParam("base_year", this.curMap.bnd_year);
			sopPortalSidoObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/map/sidoAddressList.json",
				options : {
					type : type
				}
			});
		},
		
		//시군구 검색
		sggSelectSet : function (type, sido_cd) {
			this.curMapId = parseInt(type) - 1;
			
			var sidoArray = sido_cd.split("/");
			if (!this.firstBoolean) {
				//지도 위치 이동
				this.curMap.mapMove([ sidoArray[1], sidoArray[2] ], /*5*/3);
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
				async : false,
				url : contextPath + "/ServiceAPI/map/sggAddressList.json",
				options : {
					type : type
				}
			});
		},
		
		//읍면동 검색 
		admSelectSet : function (type, sgg_cd) {
			this.curMapId = parseInt(type) - 1;
			
			var sidoArray = $("#sidoSelect_" + type).val().split("/");
			var sggArray = sgg_cd.split("/");
			if (sgg_cd == "") {
				$("#admSelect_" + type).empty();
				$("#admSelect_" + type).html("<option value=''>동/읍면 선택</option>");
			}
			else {
				if (!this.firstBoolean) {
					//지도 위치 이동
					this.curMap.mapMove([ sggArray[1], sggArray[2] ], /*7*/6);
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
					async : false,
					url : contextPath + "/ServiceAPI/map/admAddressList.json",
					options : {
						type : type
					}
				});
			}
		},
		
		//읍면동 셀렉트박스 변경 시
		admOnchange : function (type, adm_cd) {
			this.curMapId = parseInt(type) - 1;
			
			var sidoArray = $("#sidoSelect_" + type).val().split("/");
			var sggArray = $("#sggSelect_" + type).val().split("/");
			var admArray = adm_cd.split("/");
			
			if (adm_cd != "") {
				//지도 위치 이동
				this.curMap.mapMove([ admArray[1], admArray[2] ], /*9*/10);
				this.curMap.curSidoCd = sidoArray[0];
				this.curMap.curSiggCd = sggArray[0];
				this.curMap.curDongCd = admArray[0];
			}
		},
		
		//맵 이동 시 시도/시군구/읍면동 셀렉트박스 변경
		reverseOnSelectChange : function () {
			
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
					type : this.curMap.id + 1
				}
			});
		},
	
	};
	
	$mapNavigation.event = {
		
		/**
		 * 
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2014. 11. 18 
		 * @author	     : 김성현
		 * @history 	 :
		 * @param
		 */
		setUIEvent : function () {
			
			//전국선택
			$("#contrySelect_1").click(function () {
				$mapNavigation.ui.allCountrySet(1);
			});
			
			//전국선택
//			$("#contrySelect_2").click(function () {
//				$mapNavigation.ui.allCountrySet(2);
//			});
			
			//시도선택
			$("#sidoSelect_1").change(function () {
				$mapNavigation.ui.sggSelectSet(1, this.value);
			});
			
			//시도선택
//			$("#sidoSelect_2").change(function () {
//				$mapNavigation.ui.sggSelectSet(2, this.value);
//			});
			
			//시군구선택
			$("#sggSelect_1").change(function () {
				$mapNavigation.ui.admSelectSet(1, this.value);
			});
			
			//시군구선택
//			$("#sggSelect_2").change(function () {
//				$mapNavigation.ui.admSelectSet(2, this.value);
//			});
			
			//읍면동선택
			$("#admSelect_1").change(function () {
				$mapNavigation.ui.admOnchange(1, this.value);
			});
			
			//읍면동선택
//			$("#admSelect_2").change(function () {
//				$mapNavigation.ui.admOnchange(2, this.value);
//			});
		}
	};
	
	/*********** 시도 검색 Start **********/
	(function () {
		$class("sop.portal.sido.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var type = options.type;
				if (res.errCd == "0") {
					var html = "";
					for ( var i = 0; i < result.sidoList.length; i++) {
						var elem = result.sidoList[i];
						html += "<option value=\"" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sido_nm + "</option>";
					}
					$("#sidoSelect_" + type).empty();
					$("#sidoSelect_" + type).html(html);
					
					$mapNavigation.ui.sggSelectSet(type, $("#sidoSelect_" + type).val());
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
	
	/*********** 시군구 검색 Start **********/
	(function () {
		$class("sop.portal.sgg.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var type = options.type;
				if (res.errCd == "0") {
					var html = "";
					html += "<option value=''>구/군 선택</option>";
					for ( var i = 0; i < result.sggList.length; i++) {
						var elem = result.sggList[i];
						html += "<option value=\"" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sgg_nm.substring(0, 4) + "</option>";
						
						//첫화면은 구단위
						if ($mapNavigation.ui.firstBoolean == true && elem.sgg_cd == "240") {
							$mapNavigation.ui.firstValue = elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor;
							$mapNavigation.ui.firstSggCd = elem.sgg_cd;
						}
					}
					$("#sggSelect_" + type).empty();
					$("#sggSelect_" + type).html(html);
					
					$("#admSelect_" + type).empty();
					$("#admSelect_" + type).html("<option value=''>동/읍면 선택</option>");
					
					//첫화면은 구단위
					if ($mapNavigation.ui.firstBoolean) {
						$("#sggSelect_" + type).val($mapNavigation.ui.firstValue).attr("selected", "selected");
						$mapNavigation.ui.admSelectSet(type, $mapNavigation.ui.firstValue);
					}
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
				var type = options.type;
				if (res.errCd == "0") {
					var html = "";
					var x_coor = "";
					var y_coor = "";
					html += "<option value=''>동/읍면 선택</option>";
					for ( var i = 0; i < result.admList.length; i++) {
						var elem = result.admList[i];
						html += "<option value=\"" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.emdong_nm + "</option>";
						
						//첫화면은 특정지역
						if ($mapNavigation.ui.firstBoolean == true && elem.emdong_cd == "65") {
							//$mapNavigation.ui.firstValue  = elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor;
							//$mapNavigation.ui.firstAdmCd = elem.emdong_cd;
							//x_coor = elem.x_coor;
							//y_coor = elem.y_coor;
						}
					}
					$("#admSelect_" + type).empty();
					$("#admSelect_" + type).html(html);
					
					//첫화면은 특정지역
					if ($mapNavigation.ui.firstBoolean) {
						$mapNavigation.ui.firstBoolean = false;
						//$("#admSelect_"+type).val($mapNavigation.ui.firstValue).attr("selected", "selected");
						//지도 위치 이동
						//$mapNavigation.ui.curMap.mapMove([x_coor, y_coor] , 9);
						
						//오픈API 호출
						//	var sidoArray = $("#sidoSelect_"+type).val().split("/");
						//	$mapNavigation.ui.curMap.curSidoCd = sidoArray[0];
						//	$mapNavigation.ui.curMap.curSiggCd = $mapNavigation.ui.firstSggCd;
						//	$mapNavigation.ui.curMap.curDongCd = $mapNavigation.ui.firstAdmCd;
					}
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
				var type = options.type;
				if (res.errCd == "0") {
					var html = "";
					
					//시도 생성
					for ( var i = 0; i < result.sidoList.length; i++) {
						var elem = result.sidoList[i];
						if(elem.sido_cd == result.sido_cd) {
	            			html += "<option selected='selected' value=\"" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sido_nm + "</option>";
	            		} else {
	            			html += "<option value=\"" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sido_nm + "</option>";	            			
	            		}
					}
					$("#sidoSelect_" + type).empty();
					$("#sidoSelect_" + type).html(html);
					
					//시군구 생성
					html = "";
					html += "<option value=''>구/군 선택</option>";
					if (result.sggList != undefined) {
						for ( var i = 0; i < result.sggList.length; i++) {
							var elem = result.sggList[i];
							if(elem.sgg_cd == result.sgg_cd) {
		            			html += "<option selected='selected' value=\"" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sgg_nm + "</option>";
		            		} else {
		            			html += "<option value=\"" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sgg_nm + "</option>";
		            		}
						}
					}
					$("#sggSelect_" + type).empty();
					$("#sggSelect_" + type).html(html);
					
					//읍면동 생성
					html = "";
					html += "<option value=''>동/읍면 선택</option>";
					if (result.admList != undefined) {
						for ( var i = 0; i < result.admList.length; i++) {
							var elem = result.admList[i];
							if(elem.emdong_cd == result.dong_cd) {
		            			html += "<option selected='selected' value=\"" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.emdong_nm + "</option>";
		            		} else {
		            			html += "<option value=\"" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.emdong_nm + "</option>";
		            		}
						}
					}
					$("#admSelect_" + type).empty();
					$("#admSelect_" + type).html(html);
					
					$mapNavigation.ui.curMap.curSidoCd = result.sido_cd;
					$mapNavigation.ui.curMap.curSiggCd = result.sgg_cd;
					$mapNavigation.ui.curMap.curDongCd = result.dong_cd;
					
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
	
}(window, document));