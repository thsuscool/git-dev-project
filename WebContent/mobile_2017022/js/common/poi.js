(function(W, D) {
	W.$poi = W.$poi || {};
	$poi = {
		id: null,
		year : bndYear,
		bnd_year : bndYear,
		map : null,
		themeCd : null,
		pageNum : null,
		isCenter : null,
		isRectangle : null,
		mapBounds : null,
		theme: {
			interactive:{
				theme1: {
					name:"생활서비스",
					item:[
						{id: "1001",name: "인테리어"}, 
						{id: "1002",name: "목욕탕"}, 
						{id: "1003",name: "교습학원"}, 
						{id: "1004",name: "어학원"}, 
						{id: "1005",name: "예체능학원"}, 
						{id: "1006",name: "부동산중개업"}, 
						{id: "1007",name: "이발소"}, 
						{id: "1008",name: "미용실"}, 
						{id: "1009",name: "세탁소"}, 
						{id: "1010",name: "PC방"}, 
						{id: "1011",name: "노래방"} 
					]
				},
				theme2: {
					name:"도소매",
					item:[
						{id: "2001",name: "문구점"}, 
						{id: "2002",name: "서점"}, 
						{id: "2003",name: "편의점"}, 
						{id: "2004",name: "식료품점"}, 
						{id: "2005",name: "휴대폰점"}, 
						{id: "2006",name: "의류"}, 
						{id: "2007",name: "화장품/방향제"}, 
						{id: "2008",name: "철물점"}, 
						{id: "2009",name: "주유소"}, 
						{id: "2010",name: "꽃집"}, 
						{id: "2011",name: "슈퍼마켓"} 
					]
				},
				theme3: {
					name:"교통",
					item:[
						{id: "3001",name: "지하철역"}, 
						{id: "3002",name: "터미널"}
					]
				},
				theme4: {
					name:"숙박",
					item:[
						{id: "4001",name: "호텔"}, 
						{id: "4001",name: "여관"}, 
						{id: "4002",name: "펜션"}
					]
				},
				theme5: {
					name:"음식점",
					item:[
						{id: "5001",name: "한식"}, 
						{id: "5002",name: "중식"}, 
						{id: "5003",name: "일식"}, 
						{id: "5004",name: "분식"}, 
						{id: "5005",name: "서양식"}, 
						{id: "5006",name: "제과점"}, 
						{id: "5007",name: "패스트푸드"}, 
						{id: "5008",name: "치킨"}, 
						{id: "5009",name: "호프/간이주점"}, 
						{id: "5010",name: "까페"}, 
						{id: "5011",name: "기타 외국식"}
					]
				},
				theme6: {
					name:"공공",
					item:[
						{id: "6001",name: "우체국"}, 
						{id: "6002",name: "행정기관"}, 
						{id: "6003",name: "경찰/지구대"}, 
						{id: "6004",name: "소방서"}
					]
				},
				theme7: {
					name:"교육",
					item:[
						{id: "7001",name: "초등학교"}, 
						{id: "7002",name: "중학교"}, 
						{id: "7003",name: "고등학교"}, 
						{id: "7004",name: "전문대학"}, 
						{id: "7005",name: "대학교"}, 
						{id: "7006",name: "대학원"}, 
						{id: "7007",name: "어린이보육업"}
					]
				},
				theme7: {
					name:"기업",
					item:[
						{id: "8001",name: "제조/화학"}, 
						{id: "8002",name: "서비스"}, 
						{id: "8003",name: "통신/IT"}, 
						{id: "8004",name: "건설"}, 
						{id: "8005",name: "판매/유통"},
						{id: "8006",name: "기타금융업"},
						{id: "8007",name: "기타의료업"},
						{id: "8008",name: "문화/체육"}
					]
				},
				theme8: {
					name:"편의문화",
					item:[
						{id: "9001",name: "백화점/중대형"}, 
						{id: "9002",name: "은행"}, 
						{id: "9003",name: "병원"}, 
						{id: "9004",name: "극장/영화관"}, 
						{id: "9005",name: "도서관/박물관"}
					]
				}
			}
		},
		activated: function () {
			this.map.setZoom(10);
			this.setActivate(true);

		},

		deactivated: function (e) {
			this.setActivate(false);
			for (var poiObj in this.poi) {
				if (this.poi[poiObj]._isActivated()) {
					this.poi[poiObj].subDeactivated();
				}
			}
		},
		setActivate: function (activated) {
			this._activated = activated;
		},

		_isActivated: function () {
			return this._activated;
		},
		
		initialize: function(map,type) {
			var that = this;
			map.gPoi = that;
			this.map = map.gMap;
			this.markers = sop.markerClusterGroup({
				animateAddingMarkers : true
			});
			this.map.addLayer(this.markers);
			var id = Math.floor(Math.random() * 26) + Date.now();
			this.id = id;
			var div = $("<div/>",{id:id,"class":"POI_select"});
			var parentItemList=$("<ul/>");
			//that.activated();
            var cnt=0;
			$.map(that.theme[type],function(value, key){
				var item = $("<li/>",{"class":"parent",style:"cursor: pointer;"}).append($("<a/>",{text:value.name,href:"#","class":(cnt>0?"":"M_on")}));
                item.children("a").click(function(){
                    parentItemList.children("li").children("a").removeClass("M_on");
                    $(this).addClass("M_on");
                    div.find("ul ul").removeAttr("style");
                    $(this).parent("li").find("ul").attr("style","display:block;");
                });
                var childrenItemList = $("<ul/>",{"style":(cnt>0?"":"display:block;")});
                $.map(that.theme[type][key].item,function(childrenValue, childrenKey){
                    var childrenItem = $("<a/>",{href:"#","data-id":childrenValue.id,"text":childrenValue.name});
                    if(key!="etc"){
                        childrenItem.prepend(
                            $("<img/>",{src:"/img/ico/ico_"+childrenValue.id+".png"})
//                            $("<img/>",{src:"/img/marker/circleMarker/c_"+childrenValue.id+"_over.png"})
                        );
                    }
                    var childrenItemGroup = $("<li/>").append(childrenItem);
                    childrenItem.click(function(){
                        that.setPoiMarker($(this).data("id"));
                    });
                    childrenItemList.append(childrenItemGroup);
                });
                item.append(childrenItemList);
				parentItemList.append(item);
                cnt++;
			});
			var closeButton = $("<button/>",{"class":"BtnClose"});
			var top = this.getTop();
			$("body").append($("<div/>",{id:"poi-controle-panel","class":"Open_Type1",style:"height:"+($(window).outerHeight(true) - top)+"px;top:"+top+"px;overflow:scroll;display:none;"}).append($("<h3/>",{text:"POI"}),closeButton,div.append(parentItemList)));
			closeButton.click(function(){
				that.hidePoiPanel();
			});
		},
		getTop: function(){
			var top = 35;
			if($("div[id^=mapSizeControl_]").hasClass("downscale")){
				top = 0;
			}
			return top;
		},
		setPoiMarker: function(themeCd){
			var that = this;
			if(this.map.getZoom()<10){
				this.map.setZoom(10);
			}
			setTimeout(function(){
				that.requestPoiinfo(themeCd, '0', false, true);
				that.hidePoiPanel();
			},500);
		},
		showPoiPanel: function(){
			var top = this.getTop();
			$(".Wrap>.Content").css({"height":($(window).outerHeight(true) - top)+"px","overflow":"hidden","padding-top":top+"px"});
			var top = "35px";
			if($("div[id^=mapSizeControl_]").hasClass("downscale")){
				top = "0";
			}
			$("#poi-controle-panel").css({"height":($(window).outerHeight(true) - top)+"px","top":top}).show();
		},
		hidePoiPanel: function(){
			$("#poi-controle-panel").hide();
			$('.Wrap>.Content').removeAttr('style');
			if($("div[id^=mapSizeControl_]").hasClass("downscale")){
				$('.Wrap>.Content').css({"padding-top":"0px"});
			}
		},
		requestPoiinfo: function (themeCd, pageNum, isCenter, isRectangle) {
			this.themeCd = themeCd;
			this.pageNum = pageNum;
			this.isCenter = isCenter;
			this.isRectangle = isRectangle;
			this.mapBounds = this.map.getBounds();
			
			var that = this;
			var area = '';
			if (isCenter == true) {
				var center = this.map.getCenter();
				area = 'CIRCLE(' + center.x + ' ' + center.y + ',' + '5000' + ')';
			}
			if (isRectangle == true) {
				var mapBounds = this.map.getBounds();
				area = 'RECTANGLE(';
				area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
				area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
				area += ')';
			}
			var param = {
				year: this.year,
				area_type: '1',
				bnd_year: this.bnd_year,
				resultcount: '500',
				area: area,
				theme_cd: themeCd,
				pagenum: pageNum
			};
			$statsPotal.api.poi.getPoiInfobyThemecd({
				param: param,
				accessToken: accessToken,
				success: this.successPoi,
				options: {
					btntype: "poi",
					title : "",
					param: param,
					year: this.year,
					isCenter: isCenter,
					isRectangle: isRectangle,
					that: that
				}
			});
		},
		successPoi : function (status, res, options) {
			if (res.errCd == '-401') {options.that.deactivated();}
			else if (res.errCd == '-200') {options.that.deactivated();}
			else if (res.errCd == '0') {
				options.that.activated();
				options.that.removeMarkers();
				var totalCount = res.result[0].totalcount;
				var returnCount = res.result[0].returncount;
				var pageNum = res.result[0].pagenum;
				var apicallCount = parseInt(totalCount / (options.param.resultcount * (pageNum + 1)));
				
				if (returnCount !== totalCount && apicallCount > 0) {
					if (options.isCenter) {
						options.that.requestPoiinfo(options.param.theme_cd, pageNum + 1, true, false);
					}
					if (options.isRectangle) {
						options.that.requestPoiinfo(options.param.theme_cd, pageNum + 1, false, true);
					}
				}
				var theme_cd = options.param.theme_cd.toString().substring(0, 2) + '_' + options.param.theme_cd.toString().substring(2, 4);
				var poiList = res.result[0].company_list;
				if (poiList.length > 0) {
					for ( var i = 0; i < poiList.length; i++) {
						var _markerIcon = sop.icon({
							iconUrl : '/img/marker/marker/' + theme_cd + '.png',
							shadowUrl : '/img/marker/theme_shadow.png',
							iconAnchor : [ 12.5, 40 ],
							iconSize : [ 25, 40 ],
							infoWindowAnchor : [ 1, -34 ]
						});
						var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
							icon : _markerIcon
						});
						_marker.info = poiList[i];
						_marker.addTo(options.that.markers);
						var tel_num = "";
						if (!sop.Util.isUndefined(poiList[i].tel_no)) {
							tel_num = poiList[i].tel_no;
						}
						var html = 
						'		 <table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;" >';
						html += '		<tr>';
						html += '			<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
						html += '		</tr>';
						html += '		<tr>';
						html += '			<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
						html += '		</tr>';
						html += '</table>';
						_marker.bindInfoWindow(html);
						_marker.on('click', function(e) {
							console.log('click', e);
						});
					}
				}
            	$(".poi_remove_control").css("display","block");
			}
		},
		removeOverlay: function () {
			this.oldSelectedTarget = null;
			for (var k in this.controlGroup) {
				this.controlGroup[k].onRemove();
				this.controlGroup[k].deactivated();
			}
		},
		removeMarkers: function () {
			this.markers.clearLayers();
		},
		initListHtml: function () {
			this.oldselected = '';
		},
		onRemove: function () {
			this.companyParams = null;
			this.themeCd = "";
			this.pageNum = "";
			this.isCenter = ""; 
			this.isRectangle = "";
			this.mapBounds = null;
			this.removeMarkers();
			this.initListHtml();
		},
		//사업체정보 요청API
		requestCompanyPoi: function(params, pageNum) {
			this.companyParams = params;
			this.pageNum = pageNum;
			this.isCenter = false;
			this.isRectangle = true;
			this.mapBounds = this.map.getBounds();
			var that = this;
			var mapBounds = this.map.getBounds();
			var area = '';
			area = 'RECTANGLE(';
			area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
			area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
			area += ')';
			var bnd_year = this.bnd_year;
			var class_deg = "9"
			if (params.bnd_year != undefined && params.bnd_year != null && params.bnd_year.length > 0) {
				bnd_year = params.bnd_year;
			}
			if (params.class_deg != undefined && params.class_deg != null && params.class_deg.length > 0) {
				class_deg = params.class_deg;
			}
			var param = {
				year: params.year,
				area_type: '1',
				bnd_year: bnd_year,
				resultcount: '500',
				area: area,
				class_code: params.class_code,
				class_deg: class_deg,
				pagenum: pageNum
			};
			$statsPotal.api.poi.getPoiInfobyThemecd({
				param: param,
				accessToken: accessToken,
				success: this.successCompanyPoi,
				options: {
					param: param,
					isCenter: false,
					isRectangle: true,
					that: that
				}
			});
		},
		successCompanyPoi: function(status, res, options) {
			if (res.errCd == '-401') {
				console.log('401');
			} else if (res.errCd == '-200') {
				console.log('res.errCd', res.errMsg);
				//	.parent.messageAlert.open("알림", res.errMsg);
			} else if (res.errCd == '0') {
				var totalCount = res.result[0].totalcount;
				var returnCount = res.result[0].returncount;
				var pageNum = res.result[0].pagenum;
				var apicallCount = parseInt(totalCount / (options.param.resultcount * (pageNum + 1)));
				if (returnCount !== totalCount && apicallCount > 0) {
					options.that.requestPoiinfo(options.param, pageNum + 1);
				}
				var poiList = res.result[0].company_list;
				if (poiList.length > 0) {
					for (var i = 0; i < poiList.length; i++) {
						var iconUrl = "";
						if (poiList[i].theme_cd.substring(2, 4) == "00") {
							iconUrl = "/img/marker/thema_marker_defailt.png";
						} else {
							var theme_cd = poiList[i].theme_cd.substring(0, 2) + '_' + poiList[i].theme_cd.substring(2, 4);
							iconUrl = "/img/marker/marker/" + theme_cd + ".png";
						}
						var _markerIcon = sop.icon({
							iconUrl: iconUrl,
							shadowUrl: "/img/marker/theme_shadow.png",
							iconAnchor: [12.5, 40],
							iconSize: [25, 40],
							infoWindowAnchor: [1, -34]
						});
						var _marker = sop.marker([poiList[i].x, poiList[i].y], {
							icon: _markerIcon
						});
						_marker.info = poiList[i];
						// _marker.addTo($thematicMap.ui.markerGroup);
						_marker.addTo(options.that.markers);
						var tel_num = "";
						if (!sop.Util.isUndefined(poiList[i].tel_no)) {
							tel_num = poiList[i].tel_no;
						}
						var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;" >';
						html += '		<tr>';
						html += '			<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
						html += '		</tr>';
						html += '		<tr>';
						html += '			<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
						html += '		</tr>';
						html += '	</table>';
						_marker.bindInfoWindow(html);
						_marker.on('click', function(e) {
							console.log('click', e);
						});
					}
				}
			}
		}
	}
}(window, document));