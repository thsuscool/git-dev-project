Poi.InteractiveMap = sop.Class.extend({

	//Control 이름
	controlName: 'interactivMapControl',
	
	themeCd : "",
	pageNum : "",
	isCenter : "", 
	isRectangle : "",
	companyParams : null,
	mapBounds : null,
	year : dataYear,
	bnd_year : bndYear,

	initialize: function (map) {
		this._map = map;
		this.markers = sop.markerClusterGroup({
			animateAddingMarkers: true
		});
		this._map.addLayer(this.markers);
		this.themeType = {
			life: '생활/편의',
			shop: '쇼핑',
			traffic: '교통',
			lodge: '숙박',
			restaurant: '음식점',
			public: '공공',
			education: '교육',
			cof: '기업'
		};
	},

	setActivate: function (activated) {
		this._activated = activated;
	},

	_isActivated: function () {
		return this._activated;
	},
	//Control Button 이미지 생성
	_createSubUI: function (element) {
		this.ui = {};
		this.ui = sop.DomUtil.create('div', 'poi-intmap', element);
		sop.DomUtil.addClass(this.ui, 'draw-control-background');


		//생활&편의
		this.ui.life = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.life.innerHTML = '생활/편의';
		this.ui.life.list = sop.DomUtil.create('div', 'poi-int-life-subbar-ui', this.ui.life);
		this.ui.life.list.style.display = 'none';
		this.ui.life.list.isShow = false;
		this._createLifeHtml();
		sop.DomEvent.on(this.ui.life, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.life.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);

		}, this);

		//쇼핑
		this.ui.shop = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.shop.innerHTML = '쇼핑';
		this.ui.shop.list = sop.DomUtil.create('div', 'poi-int-shop-subbar-ui', this.ui.shop);
		this.ui.shop.list.style.display = 'none';
		this.ui.shop.list.isShow = false;
		this._createShopHtml();
		sop.DomEvent.on(this.ui.shop, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.shop.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);

		//교통
		this.ui.traffic = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.traffic.innerHTML = '교통';
		this.ui.traffic.list = sop.DomUtil.create('div', 'poi-int-traffic-subbar-ui', this.ui.shop);
		this.ui.traffic.list.style.display = 'none';
		this.ui.traffic.list.isShow = false;
		this._createTrafficHtml();
		sop.DomEvent.on(this.ui.traffic, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.traffic.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);

		//숙박
		this.ui.lodge = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.lodge.innerHTML = '숙박';
		this.ui.lodge.list = sop.DomUtil.create('div', 'poi-int-lodge-subbar-ui', this.ui.shop);
		this.ui.lodge.list.style.display = 'none';
		this.ui.lodge.list.isShow = false;
		this._createLodgeHtml();
		sop.DomEvent.on(this.ui.lodge, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.lodge.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);

		//음식점 restaurant
		this.ui.restaurant = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.restaurant.innerHTML = '음식점';
		this.ui.restaurant.list = sop.DomUtil.create('div', 'poi-int-restaurant-subbar-ui', this.ui.shop);
		this.ui.restaurant.list.style.display = 'none';
		this.ui.restaurant.list.isShow = false;
		this._createRestaurantHtml();
		sop.DomEvent.on(this.ui.restaurant, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.restaurant.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);

		//음식점 공공
		this.ui.public = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.public.innerHTML = '공공';
		this.ui.public.list = sop.DomUtil.create('div', 'poi-int-public-subbar-ui', this.ui.shop);
		this.ui.public.list.style.display = 'none';
		this.ui.public.list.isShow = false;
		this._createPublicHtml();
		sop.DomEvent.on(this.ui.public, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.public.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);

		//교육
		this.ui.education = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.education.innerHTML = '교육';
		this.ui.education.list = sop.DomUtil.create('div', 'poi-int-education-subbar-ui', this.ui.shop);
		this.ui.education.list.style.display = 'none';
		this.ui.education.list.isShow = false;
		this._createEduHtml();
		sop.DomEvent.on(this.ui.education, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.education.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);

		//기업
		this.ui.cof = sop.DomUtil.create('div', 'poi-int-theme-title', this.ui);
		this.ui.cof.innerHTML = '기업';
		this.ui.cof.list = sop.DomUtil.create('div', 'poi-int-cof-subbar-ui', this.ui.shop);
		this.ui.cof.list.style.display = 'none';
		this.ui.cof.list.isShow = false;
		this._createCofHtml();
		sop.DomEvent.on(this.ui.cof, 'click', this.changeStatusButton, this);
		sop.DomEvent.on(this.ui.cof.list, 'click', function (e) {
			sop.DomEvent.stopPropagation(e);
		}, this);
		return this.ui;

	},

	initSubMenu: function () {

	},

	//생활/편의 HTML
	_createLifeHtml: function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="life_theme" id="life_theme_'+sop_id+'">';
		html += '<li id="10_01"><img src="/img/marker/circleMarker/c_10_01_over.png" alt="인테리어" ><span>인테리어</span></li>';
		html += '<li id="10_02"><img src="/img/marker/circleMarker/c_10_02_over.png" alt="철물점"><span>철물점</span></li>';
		html += '<li id="10_03"><img src="/img/marker/circleMarker/c_10_03_over.png" alt="서점"><span>서점</span></li>';
		html += '<li id="10_04"><img src="/img/marker/circleMarker/c_10_04_over.png" alt="문구점"><span>문구점</span></li>';
		html += '<li id="10_05"><img src="/img/marker/circleMarker/c_10_05_over.png" alt="화장품/방향제"><span>화장품/방향제</span></li>';
		html += '<li id="10_06"><img src="/img/marker/circleMarker/c_10_06_over.png" alt="꽃집"><span>꽃집</span></li>';
		html += '<li id="10_07"><img src="/img/marker/circleMarker/c_10_07_over.png" alt="이발소"><span>이발소</span></li>';
		html += '<li id="10_08"><img src="/img/marker/circleMarker/c_10_08_over.png" alt="미용실"><span>미용실</span></li>';
		html += '<li id="10_09"><img src="/img/marker/circleMarker/c_10_09_over.png" alt="세탁소"><span>세탁소</span></li>';
		html += '<li id="10_10"><img src="/img/marker/circleMarker/c_10_10_over.png" alt="극장/영화관"><span>극장/영화관</span></li>';
		html += '<li id="10_11"><img src="/img/marker/circleMarker/c_10_11_over.png" alt="금융"><span>금융</span></li>';
		html += '<li id="10_12"><img src="/img/marker/circleMarker/c_10_12_over.png" alt="의료"><span>의료</span></li>';
		html += '<li id="10_13"><img src="/img/marker/circleMarker/c_10_13_over.png" alt="PC방/노래방"><span>PC방/노래방</span></li>';
		html += '</ul>';
		this.ui.life.list.innerHTML = html;
	},

	//쇼핑 HTML
	_createShopHtml: function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="shop_theme" id="shop_theme_'+sop_id+'">';
		html += '<li id="20_01"><img src="/img/marker/circleMarker/c_20_01_over.png" alt="백화점"><span>백화점</span></li>';
		html += '<li id="20_02"><img src="/img/marker/circleMarker/c_20_02_over.png" alt="중대형마트"><span>중대형마트</span></li>';
		html += '<li id="20_03"><img src="/img/marker/circleMarker/c_20_03_over.png" alt="편의점"><span>편의점</span></li>';
		html += '<li id="20_04"><img src="/img/marker/circleMarker/c_20_04_over.png" alt="식료품점"><span>식료품점</span></li>';
		html += '<li id="20_06"><img src="/img/marker/circleMarker/c_20_06_over.png" alt="의류"><span>의류</span></li>';
		html += '</ul>';
		this.ui.shop.list.innerHTML = html;
	},

	//교통 HTML
	_createTrafficHtml: function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="traffic_theme" id="traffic_theme_'+sop_id+'">';
		html += '<li id="30_01"><img src="/img/marker/circleMarker/c_30_01_over.png" alt="지하철역"><span>지하철역</span></li>';
		html += '<li id="30_02"><img src="/img/marker/circleMarker/c_30_02_over.png" alt="터미널"><span>터미널</span></li>';
		html += '</ul>';
		this.ui.traffic.list.innerHTML = html;
	},

	//숙박 HTML
	_createLodgeHtml: function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="lodge_theme" id="lodge_theme_'+sop_id+'">';
		html += '<li id="40_01"><img src="/img/marker/circleMarker/c_40_01_over.png" alt="호텔"><span>호텔</span></li>';
		html += '<li id="40_02"><img src="/img/marker/circleMarker/c_40_02_over.png" alt="여관"><span>여관</span></li>';
		html += '</ul>';
		this.ui.lodge.list.innerHTML = html;
	},

	//음식점
	_createRestaurantHtml: function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="restaurant_theme" id="restaurant_theme_'+sop_id+'">';
		html += '<li id="50_01"><img src="/img/marker/circleMarker/c_50_01_over.png" alt="한식" ><span>한식</span></li>';
		html += '<li id="50_02"><img src="/img/marker/circleMarker/c_50_02_over.png" alt="중식"><span>중식</span></li>';
		html += '<li id="50_03"><img src="/img/marker/circleMarker/c_50_03_over.png" alt="일식"><span>일식</span></li>';
		html += '<li id="50_04"><img src="/img/marker/circleMarker/c_50_04_over.png" alt="분식"><span>분식</span></li>';
		html += '<li id="50_05"><img src="/img/marker/circleMarker/c_50_05_over.png" alt="서양식"><span>서양식</span></li>';
		html += '<li id="50_06"><img src="/img/marker/circleMarker/c_50_06_over.png" alt="제과점"><span>제과점</span></li>';
		html += '<li id="50_07"><img src="/img/marker/circleMarker/c_50_07_over.png" alt="패스트푸트"><span>패스트푸트</span></li>';
		html += '<li id="50_08"><img src="/img/marker/circleMarker/c_50_08_over.png" alt="치킨"><span>치킨</span></li>';
		html += '<li id="50_09"><img src="/img/marker/circleMarker/c_50_09_over.png" alt="호프 및 간이주점"><span>호프 및 간이주점</span></li>';
		html += '<li id="50_10"><img src="/img/marker/circleMarker/c_50_10_over.png" alt="까페"><span>까페</span></li>';
		html += '<li id="50_11"><img src="/img/marker/circleMarker/c_50_11_over.png" alt="기타 외국식"><span>기타 외국식</span></li>';
		html += '</ul>';
		this.ui.restaurant.list.innerHTML = html;
	},

	//공공 Html
	_createPublicHtml: function () {
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="public_theme" id="public_theme_'+sop_id+'">';
		html += '<li id="60_01"><img src="/img/marker/circleMarker/c_60_01_over.png" alt="우체국"><span>우체국</span></li>';
		html += '<li id="60_02"><img src="/img/marker/circleMarker/c_60_02_over.png" alt="행정기관"><span>행정기관</span></li>';
		html += '<li id="60_03"><img src="/img/marker/circleMarker/c_60_03_over.png" alt="경찰/지구대"><span>경찰/지구대</span></li>';
		html += '<li id="60_04"><img src="/img/marker/circleMarker/c_60_04_over.png" alt="소방서"><span>소방서</span></li>';
		html += '</ul>';
		this.ui.public.list.innerHTML = html;
	},

	//교육 Html
	_createEduHtml: function(){
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="education_theme" id="education_theme_'+sop_id+'">';
		html += '<li id="70_01"><img src="/img/marker/circleMarker/c_70_01_over.png" alt="초등학교" ><span>초등학교</span></li>';
		html += '<li id="70_02"><img src="/img/marker/circleMarker/c_70_02_over.png" alt="중학교"><span>중학교</span></li>';
		html += '<li id="70_03"><img src="/img/marker/circleMarker/c_70_03_over.png" alt="고등학교"><span>고등학교</span></li>';
		html += '<li id="70_04"><img src="/img/marker/circleMarker/c_70_04_over.png" alt="전문대학"><span>전문대학</span></li>';
		html += '<li id="70_05"><img src="/img/marker/circleMarker/c_70_05_over.png" alt="대학교"><span>대학교</span></li>';
		html += '<li id="70_06"><img src="/img/marker/circleMarker/c_70_06_over.png" alt="대학원"><span>대학원</span></li>';
		html += '<li id="70_07"><img src="/img/marker/circleMarker/c_70_07_over.png" alt="어린이보육업"><span>어린이보육업</span></li>';
		html += '</ul>';
		this.ui.education.list.innerHTML = html;
	},

	//기업 Html
	_createCofHtml: function(){
		var sop_id = this._map._sop_id;
		var html = '<img src="/img/im/icon_arrow_left_top_off.gif" alt="닫기" align="left" class="closeThemeBtn">';
		html += '<ul class="cof_theme" id="cof_theme_'+sop_id+'">';
		html += '<li id="80_01"><img src="/img/marker/circleMarker/c_80_01_over.png" alt="제조/화학" ><span>제조/화학</span></li>';
		html += '<li id="80_02"><img src="/img/marker/circleMarker/c_80_02_over.png" alt="서비스"><span>서비스</span></li>';
		html += '<li id="80_03"><img src="/img/marker/circleMarker/c_80_03_over.png" alt="통신/IT"><span>통신/IT</span></li>';
		html += '<li id="80_04"><img src="/img/marker/circleMarker/c_80_04_over.png" alt="건설"><span>건설</span></li>';
		html += '<li id="80_05"><img src="/img/marker/circleMarker/c_80_05_over.png" alt="판매/유통"><span>판매/유통</span></li>';
		html += '</ul>';
		this.ui.cof.list.innerHTML = html;
	},

	//사업체정보 요청API
	requestPoiinfo: function (themeCd, pageNum, isCenter, isRectangle) {
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
			year: this.year, //2012
			area_type: '1',
			bnd_year: this.bnd_year, //2012
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
				year: this.year, //2012
				isCenter: isCenter,
				isRectangle: isRectangle,
				that: that
			}
		});
	},
	successPoi: function (status, res, options) {
		if (res.errCd == '-401') {
			console.log('401');
		}
		else if (res.errCd == '-200') {
			console.log('res.errCd', res.errCd);
			//	.parent.messageAlert.open("알림", res.errMsg);
		}
		else if (res.errCd == '0') {
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
			var theme_cd = options.param.theme_cd.substring(0, 2) + '_' + options.param.theme_cd.substring(2, 4);
			var poiList = res.result[0].company_list;
			if (poiList.length > 0) {
				for (var i = 0; i < poiList.length; i++) {

					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/' + theme_cd + '.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
						icon: _markerIcon
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
					_marker.on('click', function(e){
						console.log('click', e);
					});
				}

				//API 로그
				apiLogWrite("A0", options);
			}
			else {
				/*messageAlert.open("알림", "해당 지역 사업체 정보가 없습니다.");		
				$(options.that.oldselected).children('img').attr({
					src : '/img/marker/circleMarker/c_' + options.that.oldselected.id + '_over.png'
				});
				$(options.that.oldselected).children('span').css('font-weight', 'normal');
				options.that.oldselected = '';*/
			}
		}
	},
	
	
	//사업체정보 요청API
	requestCompanyPoi: function (params, pageNum) {
		this.companyParams = params;
		this.pageNum = pageNum;
		this.isCenter = false;
		this.isRectangle = true;
		this.mapBounds = this._map.getBounds();
		
		var that = this;
		var mapBounds = this._map.getBounds();
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
			class_deg : class_deg,
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
	successCompanyPoi: function (status, res, options) {
		if (res.errCd == '-401') {
			console.log('401');
		}
		else if (res.errCd == '-200') {
			console.log('res.errCd', res.errMsg);
			//	.parent.messageAlert.open("알림", res.errMsg);
		}
		else if (res.errCd == '0') {
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
					}else {
						var theme_cd = poiList[i].theme_cd.substring(0, 2) + '_' + poiList[i].theme_cd.substring(2, 4);
						iconUrl = "/img/marker/marker/" + theme_cd + ".png";
					}
					var _markerIcon = sop.icon({
						iconUrl: iconUrl,
						shadowUrl: "/img/marker/theme_shadow.png",
						iconAnchor: [12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
						icon: _markerIcon
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
					_marker.on('click', function(e){
						console.log('click', e);
					});
				}
			}
		}
	},
	
	
	listClickEvt: function () {
		this.oldselected = '';
		var that = this;
		$(".closeThemeBtn").hover(function () {
			$(this).attr('src', '/img/im/icon_arrow_left_top_on.gif');

		}, function () {
			$(this).attr('src', '/img/im/icon_arrow_left_top_off.gif');
		});

		$(".closeThemeBtn").click(function () {
			for (var themeType in that.themeType) {
				that.ui[themeType].list.style.display = 'none';
				that.ui[themeType].style.backgroundColor = '#f7f7f7';
			}
		});

		$("#life_theme_"+this._map._sop_id+" li, #traffic_theme_"+this._map._sop_id+" li, #shop_theme_"+this._map._sop_id+" li, #lodge_theme_"+this._map._sop_id+" li, #restaurant_theme_"+this._map._sop_id+" li, #public_theme_"+this._map._sop_id+" li, #education_theme_"+this._map._sop_id+" li, #cof_theme_"+this._map._sop_id+" li").click(function (e) {
			if (that.oldselected != '') {
				if ($(that.oldselected).has(e.target).length) {
					//console.log('sameClick no event;');
					return;
				}
				$(that.oldselected).children('img').attr({src: '/img/marker/circleMarker/c_' + that.oldselected.id + '_over.png'});
				$(that.oldselected).children('span').css('font-weight', 'normal');

			}
			//console.log('mouseover this.id', this.id);
			$(this).children('img').attr({src: '/img/marker/circleMarker/c_' + this.id + '_on.png'});
			$(this).children('span').css('font-weight', 'bold');
			that.oldselected = this;
			//console.log("this.id.replace('_','')", this.id.replace('-', ''));
			that.removeMarkers();
			if (that._map.getZoom() <= 8) {
				//원으로 반경검색
				that.requestPoiinfo(this.id.replace('_', ''), '0', true, false);
			} else {
				//MBR Rectancle을 검색
				that.requestPoiinfo(this.id.replace('_', ''), '0', false, true);
			}
		});
	},

	_allSubButtonOff: function () {
		for (var themeType in this.themeType) {
			this.ui[themeType].style.backgroundColor = '#f7f7f7';
			this.ui[themeType].list.style.display = 'none';
		}
		this.oldselectedMenu = '';
	},

	changeStatusButton: function (e) {
		if (this.oldselectedMenu != null) {
			if (this.oldselectedMenu == '') {
			}
		}
		this.initListHtml();
		this.removeMeasureEvents();
		this.listClickEvt();
		for (var themeType in this.themeType) {
//			console.log('themeType', themeType);
			if (e.target == this.ui[themeType]) {
				this.ui[themeType].style.background = '#C7E2F5';
				this.ui[themeType].list.style.display = 'block';
			} else {
				this.ui[themeType].style.background = '#f7f7f7';
				this.ui[themeType].list.style.display = 'none';
			}
		}
		this.oldselectedMenu = e.target;
	},

	removeMarkers: function () {
		this.markers.clearLayers();
	},

	//Measure Control 이벤트 등록
	initMeasureEvents: function () {

	},

	//Measure Control 이벤트 해제
	removeMeasureEvents: function () {
		$(".closeThemeBtn").off('hover');
		$(".closeThemeBtn").off('click');
//		$(".life_theme li").off('click');
//		$(".shop_theme li").off('click');
//		$(".traffic_theme li").off('click');
//		$(".lodge_theme li").off('click');
//		$(".restaurant_theme li").off('click');
//		$(".public_theme li").off('click');
//		$(".cof_theme li").off('click');
		
		$("#life_theme_"+this._map._sop_id+" li").off('click');
		$("#shop_theme_"+this._map._sop_id+" li").off('click');
		$("#traffic_theme_"+this._map._sop_id+" li").off('click');
		$("#lodge_theme_"+this._map._sop_id+" li").off('click');
		$("#restaurant_theme_"+this._map._sop_id+" li").off('click');
		$("#public_theme_"+this._map._sop_id+" li").off('click');
		$("#cof_theme_"+this._map._sop_id+" li").off('click');
	},

	initListHtml: function () {
		this.oldselected = '';
		this._createLifeHtml();
		this._createShopHtml();
		this._createTrafficHtml();
		this._createLodgeHtml();
		this._createRestaurantHtml();
		this._createPublicHtml();
		this._createCofHtml();
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
	}

});
