Poi.BizMap = sop.Class.extend({
	
	// Control 이름
	controlName : 'bisMapControl',
	
	floatPplnView : 0,			//유동인구에서 현재 보고 있는 Index
	etcType : "",				//기타 구분
	themeCd : "",
	pageNum : "",
	isCenter : "", 
	isRectangle : "",
	mapBounds : null,
	year : dataYear,
	bnd_year : bndYear,
	
	initialize : function (map) {
		this._map = map;
		this.markers = sop.markerClusterGroup({
			animateAddingMarkers : true
		});
		this._map.addLayer(this.markers);
		this.themeType = {
			company : '사업체',
			factory : '시설',
			etc : '기타'
		};
	},
	
	setActivate : function (activated) {
		this._activated = activated;
	},
	
	_isActivated : function () {
		return this._activated;
	},
	// Control Button 이미지 생성
	_createSubUI : function (element) {
		this.ui = {};
		this.ui = sop.DomUtil.create('div', 'poi-bizmap', element);
		sop.DomUtil.addClass(this.ui, 'draw-control-background');
		
		this.ui.company = sop.DomUtil.create('div', 'poi-biz-company-title', this.ui);
		this.ui.company.innerHTML = '사업체';
		this.ui.company.list = sop.DomUtil.create('div', 'poi-biz-company-subbar-ui', this.ui.company);
		this.ui.company.list.style.display = 'none';
		this.ui.company.list.isShow = false;
		this._createCompanyHtml();
		
		sop.DomEvent.on(this.ui.company, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.company.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);
		
		// sop.DomEvent.on(this.ui.company.list, 'click',
		// this.changeSubButtonStatus, this);
		
		this.ui.factory = sop.DomUtil.create('div', 'poi-biz-factory-title', this.ui);
		this.ui.factory.innerHTML = '시설';
		this.ui.factory.list = sop.DomUtil.create('div', 'poi-biz-factory-subbar-ui', this.ui.factory);
		this.ui.factory.list.style.display = 'none';
		this.ui.factory.list.isShow = false;
		this._createFactoryHtml();
		sop.DomEvent.on(this.ui.factory, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.factory.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);
		
		this.ui.etc = sop.DomUtil.create('div', 'poi-biz-etc-title', this.ui);
		this.ui.etc.innerHTML = '기타';
		this.ui.etc.list = sop.DomUtil.create('div', 'poi-biz-etc-subbar-ui', this.ui.etc);
		this.ui.etc.list.style.display = 'none';
		this.ui.etc.list.isShow = false;
		this._createEtcHtml();
		sop.DomEvent.on(this.ui.etc, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.etc.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);
		// this.ui.arrow= sop.DomUtil.create('span', 'poi-arrow', this.ui);
		// this.ui.arrow.innerHTML='<img src="/img/icon_arrow.png">';
		return this.ui;
	},
	
	initSubMenu : function () {
		
	},
	
	// 사업체 HTML
	_createCompanyHtml : function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="company_theme" id="company_theme_'+sop_id+'">';
		html += '<li id="20_04"><img src="/img/marker/circleMarker/c_20_04_over.png" alt="식료품" ><span>식료품</span></li>';
		html += '<li id="50_08"><img src="/img/marker/circleMarker/c_50_08_over.png" alt="치킨"><span>치킨</span></li>';
		html += '<li id="50_04"><img src="/img/marker/circleMarker/c_50_04_over.png" alt="분식"><span>분식</span></li>';
		html += '<li id="50_10"><img src="/img/marker/circleMarker/c_50_10_over.png" alt="까페"><span>까페</span></li>';
		html += '<li id="50_06"><img src="/img/marker/circleMarker/c_50_06_over.png" alt="제과점"><span>제과점</span></li>';
		html += '<li id="10_13"><img src="/img/marker/circleMarker/c_10_13_over.png" alt="pc방/노래방"><span>pc방/노래방</span></li>';
		
		html += '<li id="50_07"><img src="/img/marker/circleMarker/c_50_07_over.png" alt="패스트푸드"><span>패스트푸드</span></li>';
		html += '<li id="50_01"><img src="/img/marker/circleMarker/c_50_01_over.png" alt="한식"><span>한식</span></li>';
		html += '<li id="50_02"><img src="/img/marker/circleMarker/c_50_02_over.png" alt="중식"><span>중식</span></li>';
		html += '<li id="50_03"><img src="/img/marker/circleMarker/c_50_03_over.png" alt="일식"><span>일식</span></li>';
		html += '<li id="50_04"><img src="/img/marker/circleMarker/c_50_05_over.png" alt="서양식"><span>서양식</span></li>';
		html += '<li id="50_11"><img src="/img/marker/circleMarker/c_50_11_over.png" alt="기타 외국식"><span>기타 외국식</span></li>';
		
		html += '<li id="50_09"><img src="/img/marker/circleMarker/c_50_09_over.png" alt="호프/간이주점"><span>호프/간이주점</span></li>';
		html += '<li id="10_03"><img src="/img/marker/circleMarker/c_10_03_over.png" alt="서점"><span>서점</span></li>';
		html += '<li id="10_04"><img src="/img/marker/circleMarker/c_10_04_over.png" alt="문구점"><span>문구점</span></li>';
		html += '<li id="10_09"><img src="/img/marker/circleMarker/c_10_09_over.png" alt="세탁소"><span>세탁소</span></li>';
		html += '<li id="10_05"><img src="/img/marker/circleMarker/c_10_05_over.png" alt="화장품/방향제"><span>화장품/방향제</span></li>';
		html += '<li id="10_06"><img src="/img/marker/circleMarker/c_10_06_over.png" alt="꽃집"><span>꽃집</span></li>';
		
		html += '<li id="20_06"><img src="/img/marker/circleMarker/c_20_06_over.png" alt="의류"><span>의류</span></li>';
		html += '<li id="10_07"><img src="/img/marker/circleMarker/c_10_07_over.png" alt="이발소"><span>이발소</span></li>';
		html += '<li id="10_08"><img src="/img/marker/circleMarker/c_10_08_over.png" alt="미용실"><span>미용실</span></li>';
		html += '<li id="10_02"><img src="/img/marker/circleMarker/c_10_02_over.png" alt="철문점"><span>철문점</span></li>';
		html += '<li id="10_01"><img src="/img/marker/circleMarker/c_10_01_over.png" alt="인테리어"><span>인테리어</span></li>';
		html += '<li id="40_02"><img src="/img/marker/circleMarker/c_40_02_over.png" alt="여관"><span>여관</span></li>';
		html += '</ul>';
		this.ui.company.list.innerHTML = html;
	},
	
	// 시설 HTML
	_createFactoryHtml : function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="factory_theme" id="factory_theme_'+sop_id+'">';
		html += '<li id="10_10"><img src="/img/marker/circleMarker/c_10_10_over.png" alt="극장/영화관" ><span>극장/영화관</span></li>';
		html += '<li id="10_11"><img src="/img/marker/circleMarker/c_10_11_over.png" alt="금융"><span>금융</span></li>';
		html += '<li id="10_12"><img src="/img/marker/circleMarker/c_10_12_over.png" alt="의료"><span>의료</span></li>';
		
		html += '<li id="20_01"><img src="/img/marker/circleMarker/c_20_01_over.png" alt="백화점"><span>백화점</span></li>';
		html += '<li id="20_02"><img src="/img/marker/circleMarker/c_20_02_over.png" alt="중대형마트"><span>중대형마트</span></li>';
		html += '<li id="20_03"><img src="/img/marker/circleMarker/c_20_03_over.png" alt="편의점"><span>편의점</span></li>';
		
		html += '<li id="30_01"><img src="/img/marker/circleMarker/c_30_01_over.png" alt="지하철역"><span>지하철역</span></li>';
		html += '<li id="30_02"><img src="/img/marker/circleMarker/c_30_02_over.png" alt="터미널"><span>터미널</span></li>';
		
		html += '<li id="40_01"><img src="/img/marker/circleMarker/c_40_01_over.png" alt="호텔"><span>호텔</span></li>';
		html += '<li id="40_00"><img src="/img/marker/circleMarker/c_40_00_over.png" alt="기타숙박"><span>기타숙박</span></li>';
		
		html += '<li id="60_01"><img src="/img/marker/circleMarker/c_60_01_over.png" alt="우체국"><span>우체국</span></li>';
		html += '<li id="60_02"><img src="/img/marker/circleMarker/c_60_02_over.png" alt="행정기관"><span>행정기관</span></li>';
		
		html += '<li id="70_01"><img src="/img/marker/circleMarker/c_70_01_over.png" alt="초등학교"><span>초등학교</span></li>';
		html += '<li id="70_02"><img src="/img/marker/circleMarker/c_70_02_over.png" alt="중학교"><span>중학교</span></li>';
		html += '<li id="70_03"><img src="/img/marker/circleMarker/c_70_03_over.png" alt="고등학교"><span>고등학교</span></li>';
		html += '<li id="70_04"><img src="/img/marker/circleMarker/c_70_04_over.png" alt="대학교/대학원"><span>대학교/대학원</span></li>';
		
		html += '</ul>';
		this.ui.factory.list.innerHTML = html;
	},
	
	// 시설 HTML
	_createEtcHtml : function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="etc_theme" id="etc_theme_'+sop_id+'">';
		html += '<li id="areaEvent_'+sop_id+'"><span>행사/공연</span></li>';
		html += '<li id="floatPpln_'+sop_id+'"><span>유동인구</span></li>';
		html += '<li id="schoolPpln_'+sop_id+'"><span>학교인구</span></li>';
		html += '<li id="metroPpln_'+sop_id+'"><span>지하철승하차인구</span></li>';
		html += '<li id="busStop_'+sop_id+'"><span>버스정류장</span></li>';
		html += '</ul>';
		this.ui.etc.list.innerHTML = html;
	},
	
	reqPoi : function() {
		if(this.etcType == "normal") {
			this.requestPoiinfo(
					this.themeCd, 
					"0", 
					this.isCenter, 
					this.isRectangle
			);
		} else if(this.etcType == "event") {
			this.requestAreaEventinfo();
		} else if(this.etcType == "float") {
			this.requestFloatPplninfo();
		} else if(this.etcType == "school") {
			this.requestSchoolPplninfo();
		} else if(this.etcType == "metro") {
			this.requestMetroPplninfo();
		} else if(this.etcType == "busStop") {
			this.requestBusStopinfo();
		}
	},
	
	// 사업체정보 요청API
	requestPoiinfo : function (themeCd, pageNum, isCenter, isRectangle) {
		this.etcType = "normal";
		this.themeCd = themeCd;
		this.pageNum = pageNum;
		this.isCenter = isCenter;
		this.isRectangle = isRectangle;
		this.mapBounds = this._map.getBounds();
		
		var that = this;
		var area = '';
		if (isCenter == true) {
			var center = this._map.getCenter();
			area = 'CIRCLE(' + center.x + ' ' + center.y + ',' + '5000' + ')';
		}
		if (isRectangle == true) {
			var mapBounds = this._map.getBounds();
			area = 'RECTANGLE(';
			area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
			area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
			area += ')';
		}
		var param = {
			year : this.year, //2012
			area_type : '1',
			bnd_year : this.bnd_year, //2012
			resultcount : '500',
			area : area,
			theme_cd : themeCd,
			pagenum : pageNum
		};
		$statsPotal.api.poi.getPoiInfobyThemecd({
			param : param,
			accessToken : accessToken,
			success : this.successPoi,
			options : {
				btntype: "poi",
				title : "",
				param : param,
				year : this.year, //2012
				isCenter : isCenter,
				isRectangle : isRectangle,
				that : that
			}
		});
	},
	
	// 행사정보 요청API
	requestAreaEventinfo : function () {
		this.etcType = "event";
		var bounds = this._map.getBounds();
		this.mapBounds = bounds;
		var sopPortalEventPoiDrawObj = new sop.openApi.eventPoi.api();
		sopPortalEventPoiDrawObj.addParam("minx", bounds._southWest.x);
		sopPortalEventPoiDrawObj.addParam("miny", bounds._southWest.y);
		sopPortalEventPoiDrawObj.addParam("maxx", bounds._northEast.x);
		sopPortalEventPoiDrawObj.addParam("maxy", bounds._northEast.y);
		sopPortalEventPoiDrawObj.request({
			method : "POST",
			async : true,
			url : contextPath + "/ServiceAPI/bizStats/areaevent.json",
			options : {
				btntype: "etc",
				api_id : "10011",
				title : "행사/공연",
				params : {
					minx : bounds._southWest.x,
					miny : bounds._southWest.y,
					maxx : bounds._northEast.x,
					maxy : bounds._northEast.y
				},
				target : this,
				map : this._map
			}
		});
	},
	
	// 유동인구 요청API
	requestFloatPplninfo : function () {
		this.etcType = "float";
		var bounds = this._map.getBounds();
		this.mapBounds = bounds;
		var sopPortalFloatPplnPoiDrawObj = new sop.openApi.floatPplnPoi.api();
		sopPortalFloatPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
		sopPortalFloatPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
		sopPortalFloatPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
		sopPortalFloatPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
		sopPortalFloatPplnPoiDrawObj.request({
			method : "POST",
			async : true,
			url : contextPath + "/ServiceAPI/bizStats/poietcfloatppln.json",
			options : {
				btntype: "etc",
				api_id : "10013",
				title : "유동인구",
				params : {
					minx : bounds._southWest.x,
					miny : bounds._southWest.y,
					maxx : bounds._northEast.x,
					maxy : bounds._northEast.y
				},
				target : this,
				map : this._map
			}
		});
	},
	// 유동인구 이전 페이지
	floatPplnPre : function(result) {
		if(this.floatPplnView > 0) {
			this.floatPplnView = this.floatPplnView - 1;	
		} else {
			return;
		}
		this.floatPplnChartDraw(result);
	},
	// 유동인구 다음 페이지
	floatPplnNext : function(result) {
		var maxLength = result.target.info.resultList.length;
		if(this.floatPplnView < (maxLength-1)) {
			this.floatPplnView = this.floatPplnView + 1;
		} else {
			return;
		}
		this.floatPplnChartDraw(result);
	},
	//유동인구 차트 및 내용 그리기
	floatPplnChartDraw : function (result) {
		var tableId = result.target.info.floatPpln;
		var chartId = result.target.info.floatPplnChart;
		var resultList = result.target.info.resultList;
		var maleData = new Array();
		var femaleData = new Array();
		
		var idx = this.floatPplnView;
		maleData.push(parseInt(resultList[idx].male_10_cnt)*-1);
		maleData.push(parseInt(resultList[idx].male_20_cnt)*-1);
		maleData.push(parseInt(resultList[idx].male_30_cnt)*-1);
		maleData.push(parseInt(resultList[idx].male_40_cnt)*-1);
		maleData.push(parseInt(resultList[idx].male_50_cnt)*-1);
		femaleData.push(parseInt(resultList[idx].fem_10_cnt));
		femaleData.push(parseInt(resultList[idx].fem_20_cnt));
		femaleData.push(parseInt(resultList[idx].fem_30_cnt));
		femaleData.push(parseInt(resultList[idx].fem_40_cnt));
		femaleData.push(parseInt(resultList[idx].fem_50_cnt));
		
		var minValue = Math.min.apply(null, maleData);
		var maxValue = Math.max.apply(null, femaleData);
		
		$(".floatPplnTable_"+result.target.info.sop_id).hide();
		$("#"+tableId+"_"+this.floatPplnView).show();
		$("#"+chartId+"_"+this.floatPplnView).highcharts({
	        chart: {
	            type: 'bar', backgroundColor: 'white', width: 300, height: 200
	        },
	        title: {
	        	text : ''
	        },
	        xAxis: [{
	            categories: ['10대', '20대', '30대', '40대', '50대'],
	            reversed: false,
	            labels: {
                    step: 1
                }
	        }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: ['10대', '20대', '30대', '40대', '50대'],
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
	        yAxis: {
	        	title: {
                    text: null
                },
                min: minValue,
                max: maxValue
	        },
	        plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ',  ' + this.point.category + '</b><br/>' +
                        Highcharts.numberFormat(Math.abs(this.point.y), 0) + '명';
                }
            },
	        series: [{
	            name: '남자',
	            data: maleData
	        }, {
	            name: '여자',
	            data: femaleData
	        }]
	    });
	},
	
	// 학교인구 요청API
	requestSchoolPplninfo : function () {
		this.etcType = "school";
		var bounds = this._map.getBounds();
		this.mapBounds = bounds;
		var sopPortalSchoolPplnPoiDrawObj = new sop.openApi.schoolPplnPoi.api();
		sopPortalSchoolPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
		sopPortalSchoolPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
		sopPortalSchoolPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
		sopPortalSchoolPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
		sopPortalSchoolPplnPoiDrawObj.request({
			method : "POST",
			async : true,
			url : contextPath + "/ServiceAPI/bizStats/poietcschoolppln.json",
			options : {
				btntype: "etc",
				api_id : "10015",
				title : "학교인구",
				params : {
					minx : bounds._southWest.x,
					miny : bounds._southWest.y,
					maxx : bounds._northEast.x,
					maxy : bounds._northEast.y
				},
				target : this,
				map : this._map
			}
		});
	},
	
	// 지하철승하차인구 요청API
	requestMetroPplninfo : function () {
		this.etcType = "metro";
		var bounds = this._map.getBounds();
		this.mapBounds = bounds;
		var sopPortalMetroPplnPoiDrawObj = new sop.openApi.metroPplnPoi.api();
		sopPortalMetroPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
		sopPortalMetroPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
		sopPortalMetroPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
		sopPortalMetroPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
		sopPortalMetroPplnPoiDrawObj.request({
			method : "POST",
			async : true,
			url : contextPath + "/ServiceAPI/bizStats/poietcmetroppln.json",
			options : {
				btntype: "etc",
				api_id : "10014",
				title : "지하철승하차인구",
				params : {
					minx : bounds._southWest.x,
					miny : bounds._southWest.y,
					maxx : bounds._northEast.x,
					maxy : bounds._northEast.y
				},
				target : this,
				map : this._map
			}
		});
	},
	
	// 버스정류장 요청API
	requestBusStopinfo : function () {
		this.etcType = "busStop";
		var bounds = this._map.getBounds();
		this.mapBounds = bounds;
		var sopPortalBusStopPoiDrawObj = new sop.openApi.busStopPoi.api();
		sopPortalBusStopPoiDrawObj.addParam("minx", bounds._southWest.x);
		sopPortalBusStopPoiDrawObj.addParam("miny", bounds._southWest.y);
		sopPortalBusStopPoiDrawObj.addParam("maxx", bounds._northEast.x);
		sopPortalBusStopPoiDrawObj.addParam("maxy", bounds._northEast.y);
		sopPortalBusStopPoiDrawObj.request({
			method : "POST",
			async : true,
			url : contextPath + "/ServiceAPI/bizStats/poietcbusstop.json",
			options : {
				btntype: "etc",
				api_id : "10012",
				title : "버스정류장",
				params : {
					minx : bounds._southWest.x,
					miny : bounds._southWest.y,
					maxx : bounds._northEast.x,
					maxy : bounds._northEast.y
				},
				target : this,
				map : this._map
			}
		});
	},
	
	successPoi : function (status, res, options) {
		if (res.errCd == '-401') {
			// console.log('401');
		}
		else if (res.errCd == '-200') {
			// console.log('res.errCd', res.errCd);
		}
		else if (res.errCd == '0') {
			// console.log('res', res);
			var totalCount = res.result[0].totalcount;
			var returnCount = res.result[0].returncount;
			var pageNum = res.result[0].pagenum;
			var apicallCount = parseInt(totalCount / (options.param.resultcount * (pageNum + 1)));
			
			// console.log('apicallCount', apicallCount);
			if (returnCount !== totalCount && apicallCount > 0) {
				if (options.isCenter) {
					options.that.requestPoiinfo(options.param.theme_cd, pageNum + 1, true, false);
				}
				if (options.isRectangle) {
					options.that.requestPoiinfo(options.param.theme_cd, pageNum + 1, false, true);
				}
			}
			var theme_cd = options.param.theme_cd.substring(0, 2) + '_' + options.param.theme_cd.substring(2, 4);
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
					// _marker.addTo($thematicMap.ui.markerGroup);
					_marker.addTo(options.that.markers);
					var tel_num = "";
					if (!sop.Util.isUndefined(poiList[i].tel_no)) {
						tel_num = poiList[i].tel_no;
					}
					var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
					html += '<tr>';
					html += '<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
					html += '<td >';
					html += '</td>';
					html += '</tr>';
					//html += '<tr>';
					//html += ' <th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
					//html += '<td >';
					//html += '</td>';
					//html += '</tr>';
					/*html += '<tr>';
					html += ' <th style="word-break:break-all;white-space: nowrap;width:50px;padding:0px 5px 5px 5px;font-size:12px;">&nbsp;' + tel_num + '</th>';
					html += '<td >';
					html += '</td>';
					html += '</tr>';*/
					html += '</table>';
					_marker.bindInfoWindow(html);
				}
				
				//API 로그
				apiLogWrite("B0", options);
			}
			else {
				
			}
		}
	},
	
	listClickEvt : function () {
		this.oldselected = '';
		var that = this;
		$(".closeThemeBtn").hover(function () {
			$(this).attr('src', '/img/im/icon_arrow_left_top_on.gif');
			
		}, function () {
			$(this).attr('src', '/img/im/icon_arrow_left_top_off.gif');
		});
		
		$(".closeThemeBtn").click(function () {
			for ( var themeType in that.themeType) {
				that.ui[themeType].list.style.display = 'none';
				that.ui[themeType].style.backgroundColor = '#f7f7f7';
			}
		});
		
		//사업체, 시설 버튼 클릭 이벤트
		$("#company_theme_"+this._map._sop_id+" li, #factory_theme_"+this._map._sop_id+" li").click(function (e) {
			if (that.oldselected != '') {
				if ($(that.oldselected).has(e.target).length) {
					console.log('sameClick no event;');
					return;
				}
				$(that.oldselected).children('img').attr({
					src : '/img/marker/circleMarker/c_' + that.oldselected.id + '_over.png'
				});
				$(that.oldselected).children('span').css('font-weight', 'normal');
				
			}
			
			$(this).children('img').attr({
				src : '/img/marker/circleMarker/c_' + this.id + '_on.png'
			});
			$(this).children('span').css('font-weight', 'bold');
			
			that.oldselected = this;
			
			that.removeMarkers();
			if (that._map.getZoom() <= 8) {
				// 원으로 반경검색
				that.requestPoiinfo(this.id.replace('_', ''), '0', true, false);
			}
			else {
				// MBR Rectancle을 검색
				that.requestPoiinfo(this.id.replace('_', ''), '0', false, true);
			}
		});
		
		//기타 버튼 클릭 이벤트
		$("#etc_theme_"+this._map._sop_id+" li").click(function (e) {
			var sop_id = that._map._sop_id;
			
			if (that.oldselected != '') {
				if ($(that.oldselected).has(e.target).length) {
					console.log('sameClick no event;');
					return;
				}
				
				$(that.oldselected).children('span').css({
					"font-weight" : "normal",
					"color" : "#666666"
				});
			}
			
			$(this).children('span').css({
				"font-weight" :  "bold",
				"color" : "#6799FF"
			});
			
			that.oldselected = this;
			
			that.removeMarkers();
			if ($(this).attr("id") == 'areaEvent_'+sop_id) {
				// 행사
				that.requestAreaEventinfo();
			}
			if ($(this).attr("id") == 'floatPpln_'+sop_id) {
				// 유동인구
				that.requestFloatPplninfo();
			}
			if ($(this).attr("id") == 'schoolPpln_'+sop_id) {
				// 학교인구
				that.requestSchoolPplninfo();
			}
			if ($(this).attr("id") == 'metroPpln_'+sop_id) {
				// 지하철승하차인구
				that.requestMetroPplninfo();
			}
			if ($(this).attr("id") == 'busStop_'+sop_id) {
				// 버스정류장
				that.requestBusStopinfo();
			}
		});
	},
	
	_allSubButtonOff : function () {
		for ( var themeType in this.themeType) {
			this.ui[themeType].style.backgroundColor = '#f7f7f7';
			this.ui[themeType].list.style.display = 'none';
		}
		this.oldselectedMenu = '';
	},
	
	changeStatusButton : function (e) {
		if (this.oldselectedMenu != null) {
			if (this.oldselectedMenu == '') {
			}
		}
		this.initListHtml();
		this.removeMeasureEvents();
		this.listClickEvt();
		for ( var themeType in this.themeType) {
			// console.log('themeType', themeType);
			if (e.target == this.ui[themeType]) {
				this.ui[themeType].style.background = '#C7E2F5';
				this.ui[themeType].list.style.display = 'block';
			}
			else {
				this.ui[themeType].style.background = '#f7f7f7';
				this.ui[themeType].list.style.display = 'none';
			}
		}
		this.oldselectedMenu = e.target;
	},
	
	removeMarkers : function () {
		this.markers.clearLayers();
	},
	
	// Measure Control 이벤트 등록
	initMeasureEvents : function () {
		
	},
	
	// Measure Control 이벤트 해제
	removeMeasureEvents : function () {
		$(".closeThemeBtn").off('hover');
		$(".closeThemeBtn").off('click');
		//$(".company_theme li").off('click');
		//$(".factory_theme li").off('click');
		//$(".etc_theme li").off('click');
		$("#company_theme_"+this._map._sop_id+" li").off('click');
		$("#factory_theme_"+this._map._sop_id+" li").off('click');
		$("#etc_theme_"+this._map._sop_id+" li").off('click');
	},
	
	initListHtml : function () {
		this.oldselected = '';
		this._createCompanyHtml();
		this._createFactoryHtml();
		this._createEtcHtml();
	},
	
	onRemove : function () {
		this.floatPplnView = 0;			//유동인구에서 현재 보고 있는 Index
		this.etcType = "";				//기타 구분
		this.themeCd = "";
		this.pageNum = "";
		this.isCenter = ""; 
		this.isRectangle = "";
		this.mapBounds = null;
		
		this.removeMarkers();
		this.oldselected = '';
		this._createCompanyHtml();
		this._createFactoryHtml();
		this._createEtcHtml();
	},
	
});

/** ********* 행사/이벤트 POI Start ********* */
(function () {
	$class("sop.openApi.eventPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			if (res.errCd == "0") {
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/tm/fastival_5.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i].x, result[i].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i];
					_marker.addTo(options.target.markers);
					
					var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
					html += '<tr>';
					html += '<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + result[i].event_nm + '</strong></th>';
					html += '<td >';
					html += '</td>';
					html += '</tr>';
					html += '<tr>';
					html += ' <th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">일정 : ' + result[i].event_start_dt + ' - ' + result[i].event_end_dt + '</th>';
					html += '<td >';
					html += '</td>';
					html += '</tr>';
					html += '<tr>';
					html += ' <th style="word-break:break-all;white-space: nowrap;width:50px;padding:0px 5px 5px 5px;font-size:12px;">주소 : ' + result[i].addr + '</th>';
					html += '<td >';
					html += '</td>';
					html += '</tr>';
					html += '</table>';
					
					_marker.bindInfoWindow(html);
				}
				
				//API 로그
				apiLogWrite("B0", options);
			}
		},
		onFail : function (status) {
		}
	});
}());
/** ********* 행사/이벤트 POI End ********* */

/** ********* 유동인구 POI Start ********* */
(function () {
	$class("sop.openApi.floatPplnPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			var poiBizMap = new Poi.BizMap(options.map);
			
			if (res.errCd == "0") {
				for(var i = 0; i < result.length; i ++) {
					var html = "";
					html += '<div id="floatPplnPreDiv_'+map._sop_id+'_'+i+'" style="position: absolute; top: 80px; left: 5px; cursor: pointer;"><img src="/img/im/btn_bx_arrleft.gif" /></div>';
					html += '<div id="floatPplnNextDiv_'+map._sop_id+'_'+i+'" style="position: absolute; top: 80px; right: 5px; cursor: pointer;"><img src="/img/im/btn_bx_arrright.gif" /></div>';
					
					for(var x = 0; x < result[i].length; x ++) {
						var tableId = 'floatPpln_'+map._sop_id+'_'+i+'_'+x;
						html += '<table id="'+tableId+'" class="floatPplnTable_'+map._sop_id+'" style="text-align:left;width:300px;white-space: nowrap;word-break:break-all;padding:5px;" display="none" >';
						html += '<tr>';
						html += 	'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + result[i][x].surv_area + '<br/>유동인구(총 '+ result[i][x].floating_ppltn_sum + '명)</strong></th>';
						html += '</tr>';
						html += '<tr>';
						html += 	'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">조사일자 : ' + makeYYYYMMDDString(result[i][x].surv_dt) + '</th>';
						html += '</tr>';
						html += '<tr>';
						html += 	'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:0px 5px 5px 5px;font-size:12px;">시간대 : ' + result[i][x].surv_time + '</th>';
						html += '</tr>';
						html += '<tr>';
						html += 	'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:0px 5px 5px 5px;font-size:12px;">행정구역명 : ' + result[i][x].adm_nm + '</th>';
						html += '</tr>';
						html += '<tr>';
						html += 	'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:0px 5px 5px 5px;font-size:12px;">날씨 : ' + result[i][x].weather + '</th>';
						html += '</tr>';
						html += '<tr>';
						html += 	'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:0px 5px 5px 5px;font-size:12px;">총인구 : ' + result[i][x].floating_ppltn_sum + '</th>';
						html += '</tr>';
						html += '<tr>';
						html += 	'<th><div id="floatPplnChart_'+map._sop_id+'_'+i+'_'+x+'"></div></th>';
						html += '</tr>';
						html += '<tr>';
						html += 	'<th style="word-break:break-all;white-space: nowrap;font-size:12px; float: right;">';
						html += 		'출처 : 중소기업청, 전국 주요상권 유동인구 DB (2010)';
						html += 	'</th>';
						html += '</tr>';
						html += '</table>';
						
						if((x+1) == result[i].length) {
							var _markerIcon = sop.icon({
								iconUrl: '/img/idm/marker-icon.png',
								shadowUrl: '/img/marker/theme_shadow.png',
								iconAnchor: [ 12.5, 40 ],
								iconSize: [ 25, 40 ],
								infoWindowAnchor: [1, -34]
							});
							var _marker = sop.marker([ result[i][x].x, result[i][x].y ], {
								icon: _markerIcon
							});
							_marker.info = result[i][x];
							_marker.addTo(options.target.markers);

							_marker.info["resultList"] = result[i];
							_marker.info["index"] = i;
							_marker.info["sop_id"] = map._sop_id;
							_marker.info["floatPpln"] = "floatPpln_"+map._sop_id+"_"+i;
							_marker.info["floatPplnChart"] = "floatPplnChart_"+map._sop_id+"_"+i;
							
							_marker.bindInfoWindow(html,{autoPan: false});
							
							_marker.on('infowindowopen', function(result){
								poiBizMap.floatPplnView = 0;
								
								//이전 클릭
								$("#floatPplnPreDiv_"+result.target.info.sop_id+"_"+result.target.info.index).find("img").click(function() {
									poiBizMap.floatPplnPre(result);
								});
								
								//다음 클릭
								$("#floatPplnNextDiv_"+result.target.info.sop_id+"_"+result.target.info.index).find("img").click(function() {
									poiBizMap.floatPplnNext(result);
								});
								
								//차트 그리기
								poiBizMap.floatPplnChartDraw(result);
							});
						}
					}
					

				}
				
				//API 로그
				apiLogWrite("B0", options);
			}
		},
		onFail : function (status) {
		}
	});
}());
/** ********* 유동인구 POI End ********* */

/** ********* 학교인구 POI Start ********* */
(function () {
	$class("sop.openApi.schoolPplnPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			
			if (res.errCd == "0") {
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/70_01.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i].x, result[i].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i];
					_marker.addTo(options.target.markers);
					
					var html = '<table style="text-align:left;width:350px;white-space: nowrap;word-break:break-all;padding:5px;" >';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;;padding:5px;color: #3792de;font-size:14px; text-align: center;"><strong>' + result[i].school_nm + '</strong></th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;padding:5px;font-size:12px; text-align: center;">' + result[i].addr + '</th>';
					html += '</tr>';
					/*html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;padding:0px 5px 5px 5px;font-size:12px; text-align: center;">' + result[i].tel_no + '</th>';
					html += '</tr>';*/
					html += '<tr>';
					html += 	'<th><div id="schoolPieChart_'+map._sop_id+'_'+i+'"></div></th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;font-size:12px; float: right;">';
					html += 		'출처 : 한국교육개발원, 교육기본통계(유초중등통계, 고등통계) (2013)';
					html += 	'</th>';
					html += '</tr>';
					html += '</table>';
					html += '<div style="position: absolute; top: 120px; right: 60px;">';
					html += 	'<div style="width: 12px; height: 12px; background: #92D050; float: left; margin-top: 2px;"></div>';
					html += 	'<div id="schoolStudentDiv_'+map._sop_id+'_'+i+'" style="font-size: 11px; width: 150px; margin-right: -40px;"></div>';
					html += '</div>';
					html += '<div style="position: absolute; top: 145px; right: 60px;">';
					html += 	'<div style="width: 12px; height: 12px; background: #595959; float: left; margin-top: 2px;"></div>';
					html += 	'<div id="schoolFacultyDiv_'+map._sop_id+'_'+i+'" style="font-size: 11px; width: 150px; margin-right: -40px;"></div>';
					html += '</div>';
					
					_marker.info["resultList"] = result[i];
					_marker.info["sop_id"] = map._sop_id;
					_marker.info["index"] = i;
					
					_marker.bindInfoWindow(html, {maxWidth: "350"});
					
					_marker.on('infowindowopen', function(result){
						var id = result.target.info.sop_id + "_" + result.target.info.index;
						var stuCnt = result.target.info.resultList.student_cnt;		//학생수
						var facCnt = result.target.info.resultList.faculty_cnt;		//교직원수
						var stuPer = parseInt(stuCnt / (stuCnt + facCnt) * 100);	//학생%
						var facPer = parseInt(facCnt / (stuCnt + facCnt) * 100);	//교직원%
						
						$("#schoolStudentDiv_"+id).html("학생수 : " + stuCnt + "명(" + stuPer + "%)");
						$("#schoolFacultyDiv_"+id).html("교직원수 : " + facCnt + "명(" + facPer + "%)");
						
						$("#schoolPieChart_"+id).highcharts({
							chart: { backgroundColor:"#fff", borderWidth:0, margin: [0, 0, 0, 0], height: 130, width: 130 },
							colors: ['#92D050', '#595959'],
							tooltip: { enabled: false },
		    				navigation: { buttonOptions: { enabled: false } }, 
		    		        title: {
		    		            text: ''
		    		        },
				            tooltip: {
				                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				            },
				            plotOptions: {
		    		            pie: {
		    		                dataLabels: {
		    		                    enabled: true,
		    		                    distance: -50,
		    		                    style: {
		    		                        fontWeight: 'bold',
		    		                        color: 'white',
		    		                        textShadow: '0px 1px 2px black'
		    		                    }
		    		                },
		    		                startAngle: 0,
		    		                endAngle: 360,
		    		                center: ['50%', '50%'], borderWidth: 0
		    		            }
		    		        },
		    		        series: [{
		    			        type: 'pie',
		    		            name: '비율',
		    		            data: [
		    		                ['학생수',  stuPer],
		    		                ['교직원',  facPer]
		    		            ],
		    					dataLabels: {
		    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
		    					}
		    		        }]
				        });
					});
				}
				
				//API 로그
				apiLogWrite("B0", options);
			}
		},
		onFail : function (status) {
		}
	});
}());
/** ********* 학교인구 POI End ********* */

/** ********* 지하철승하차인구 POI Start ********* */
(function () {
	$class("sop.openApi.metroPplnPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			console.log(result);
			if (res.errCd == "0") {
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/30_01.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i][0].x, result[i][0].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i][0];
					_marker.addTo(options.target.markers);
					
					var onCnt = parseInt(result[i][0].hour_person_sum);	//승차인원
					var offCnt = parseInt(result[i][1].hour_person_sum);	//하차인원
					var onPer = parseInt(onCnt / (onCnt + offCnt) * 100);	//승차%
					var offPer = parseInt(offCnt / (onCnt + offCnt) * 100);	//하차%
					
					var html = '<table style="text-align:left; width:500px; white-space: nowrap;word-break:break-all;padding:5px;" >';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;padding:5px;color: #3792de; font-size:14px; text-align: center;"><strong>' + result[i][0].station_nm + '</strong></th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;padding:0px 5px 5px 5px;font-size:12px;"><일평균 승하차인원 통계></th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;padding:0px 5px 5px 5px;font-size:12px;">';
					html += 		'<div style="width: 12px; height: 12px; background: #5CD1E5; float: left; margin-top: 3px;"></div>';
					html += 		'<div style="margin-left: 17px; font-size: 11px;">일평균 승차인원 합계 : '+appendCommaToNumber(onCnt)+'명('+onPer+'%)</div>';
					html += 	'</th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;padding:0px 5px 5px 5px;font-size:12px;">';
					html += 		'<div style="width: 12px; height: 12px; background: #595959; float: left; margin-top: 3px;"></div>';
					html += 		'<div style="margin-left: 17px; font-size: 11px;">일평균 하차인원 합계 : '+appendCommaToNumber(offCnt)+'명('+offPer+'%)</div>';
					html += 	'</th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;padding:0px 5px 5px 5px;font-size:12px;">';
					html += 		'<div style="width: 10px; height: 10px; background: #fff; float: left; margin-top: 3px; border: 1px solid;"></div>';
					html += 		'<div style="margin-left: 17px; font-size: 11px;">일평균 승하차인원 합계 : '+appendCommaToNumber(onCnt+offCnt)+'명</div>';
					html += 	'</th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th><div id="metroChart_'+map._sop_id+'_'+i+'"></div></th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;font-size:12px; float: right;">';
					html += 		'출처 : 지자체 지하철 관리기관, 지하철 이용현황 (2013, 2014)';
					html += 	'</th>';
					html += '</tr>';
					html += '</table>';
					
					_marker.info["onResult"] = result[i][0];
					_marker.info["offResult"] = result[i][1];
					_marker.info["sop_id"] = map._sop_id;
					_marker.info["index"] = i;
					
					_marker.bindInfoWindow(html, {maxWidth: "500"});
					
					_marker.on('infowindowopen', function(result){
						var id = result.target.info.sop_id + "_" + result.target.info.index;
						
						//승차
						var onResult = result.target.info.onResult;	
						var onList = new Array();
						onList.push(parseInt(onResult.hour_person_1_cnt), parseInt(onResult.hour_person_2_cnt), parseInt(onResult.hour_person_3_cnt), parseInt(onResult.hour_person_4_cnt));
						onList.push(parseInt(onResult.hour_person_5_cnt), parseInt(onResult.hour_person_6_cnt), parseInt(onResult.hour_person_7_cnt), parseInt(onResult.hour_person_8_cnt));
						onList.push(parseInt(onResult.hour_person_9_cnt), parseInt(onResult.hour_person_10_cnt), parseInt(onResult.hour_person_11_cnt), parseInt(onResult.hour_person_12_cnt));
						onList.push(parseInt(onResult.hour_person_13_cnt), parseInt(onResult.hour_person_14_cnt), parseInt(onResult.hour_person_15_cnt), parseInt(onResult.hour_person_16_cnt));
						onList.push(parseInt(onResult.hour_person_17_cnt), parseInt(onResult.hour_person_18_cnt), parseInt(onResult.hour_person_19_cnt), parseInt(onResult.hour_person_20_cnt));
						onList.push(parseInt(onResult.hour_person_21_cnt), parseInt(onResult.hour_person_22_cnt), parseInt(onResult.hour_person_23_cnt), parseInt(onResult.hour_person_24_cnt));
						
						//하차
						var offResult = result.target.info.offResult;
						var offList = new Array();
						offList.push(parseInt(offResult.hour_person_1_cnt), parseInt(offResult.hour_person_2_cnt), parseInt(offResult.hour_person_3_cnt), parseInt(offResult.hour_person_4_cnt));
						offList.push(parseInt(offResult.hour_person_5_cnt), parseInt(offResult.hour_person_6_cnt), parseInt(offResult.hour_person_7_cnt), parseInt(offResult.hour_person_8_cnt));
						offList.push(parseInt(offResult.hour_person_9_cnt), parseInt(offResult.hour_person_10_cnt), parseInt(offResult.hour_person_11_cnt), parseInt(offResult.hour_person_12_cnt));
						offList.push(parseInt(offResult.hour_person_13_cnt), parseInt(offResult.hour_person_14_cnt), parseInt(offResult.hour_person_15_cnt), parseInt(offResult.hour_person_16_cnt));
						offList.push(parseInt(offResult.hour_person_17_cnt), parseInt(offResult.hour_person_18_cnt), parseInt(offResult.hour_person_19_cnt), parseInt(offResult.hour_person_20_cnt));
						offList.push(parseInt(offResult.hour_person_21_cnt), parseInt(offResult.hour_person_22_cnt), parseInt(offResult.hour_person_23_cnt), parseInt(offResult.hour_person_24_cnt));
						
						$("#metroChart_"+id).highcharts({
					        chart: {
					        	backgroundColor: 'white', width: 500, height: 200
					        },
					        title: {
					        	text : ''
					        },
					        xAxis: {
					            categories: ['00~01', '01~02', '02~03', '03~04', '04~05', '05~06', '06~07', '07~08', '08~09', '09~10', 
					                         	'10~11', '11~12', '12~13', '13~14', '14~15', '15~16', '16~17', '17~18', '18~19', '19~20',
					                         	'20~21', '21~22', '22~23', '23~24'],
					            labels: {
					                rotation: -45,
					                style: {
					                	fontSize: '9px;'
					                }
					        	}
					        },
					        yAxis: {
					            min: 0,
					            title: {
					                text: ''
					            }
					        },
					        tooltip: {
					        	pointFormat: '{point.y}명'
					        },
					        plotOptions: {
					            column: {
					                borderWidth: 0
					            }
					        },
					        series:[{
					        	name : '승차인원',
					        	data : onList,
					        	color : '#5CD1E5'
					        }, {
					        	name : '하차인원',
					        	data : offList,
					        	color : '#595959'
					        }]
					    });
					});
				}
				
				//API 로그
				apiLogWrite("B0", options);
			}
		},
		onFail : function (status) {
		}
	});
}());
/** ********* 지하철승하차인구 POI End ********* */

/** ********* 버스정류장 POI Start ********* */
(function () {
	$class("sop.openApi.busStopPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			console.log(result);
			if (res.errCd == "0") {
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/30_02.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i].x, result[i].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i];
					_marker.addTo(options.target.markers);
					
					var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + result[i].busstop_nm + '</strong></th>';
					html += '</tr>';
					html += '<tr>';
					html += 	'<th style="word-break:break-all;white-space: nowrap;font-size:12px; float: right;">';
					html += 		'출처 : 국토교통부, 버스정류장 위치정보 (2014)';
					html += 	'</th>';
					html += '</tr>';
					html += '</table>';
					
					_marker.bindInfoWindow(html);
				}
				
				//API 로그
				apiLogWrite("B0", options);
			}
		},
		onFail : function (status) {
		}
	});
}());
/** ********* 버스정류장 POI End ********* */