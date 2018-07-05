/**
 * Created by neighbor on 2014-10-16.
 */
Draw.Control.Distance = Draw.Feature.extend({
	//Control 이름
	controlName: 'distanceControl',

	initialize: function (map) {
		sop.Control.Measure.Overlay.prototype.initialize.call(this, map);
		//추가 되는 polyline 의 Group
		this._polylineGroup = new sop.LayerGroup();
		//'_marker' LayerGorup을 담는 Group
		this._markersGroup = new sop.LayerGroup();
		//마커들간의 거리의 Group
		this._distanceGorup = [];
	},

	//Control Button 이미지 생성
	_createUI: function (element) {
		this.ui = {};
		this.ui = sop.DomUtil.create('div', 'sop-distance-out', element);
		sop.DomUtil.addClass(this.ui, 'sop-control-background');
		return this.ui;
	},

	activated: function () {
		this.setActivate(true);
		this.initMeasureEvents();
		this._map.fire('absclickstart');
		console.log('등록...this._map.absClick', this._map.absClick);
		this._switchOnButton();
	},

	deactivated: function (e) {
		if (this._polyline) {
			if (this._polyline.getUTMKs().length > 0) {
				this._endVector(e);
			}
		}

		this.setActivate(false);
		this.removeMeasureEvents();
		//Switch Off Button Style Set
		this._switchOffButton();

	},

	isDrawing: function () {
		this.isNowDrawing = false;
		/*
		if(this._isActivated()){
			this.isNowDrawing = true;
		}*/
		return this.isNowDrawing;
	},

	//button 클릭시 이미지 변경 On
	_switchOnButton: function () {
		sop.DomUtil.removeClass(this.ui, 'sop-distance-out');
		sop.DomUtil.addClass(this.ui, 'sop-distance-selected');
	},

	//button 클릭시 이미지 변경 Off
	_switchOffButton: function () {
		sop.DomUtil.removeClass(this.ui, 'sop-distance-selected');
		sop.DomUtil.addClass(this.ui, 'sop-distance-out');
	},

	//Measure Control 이벤트 등록
	initMeasureEvents: function () {
		//지도를 처음 클릭했을때  Event
		this._map.on('click', this._startVector, this);
		//오른쪽 버튼 클릭 draw Event 해제
		this._map.on('contextmenu', this.deactivated, this);
	},

	//Measure Control 이벤트 해제
	removeMeasureEvents: function () {
		this._map.off('click', this._startVector, this);
		this._map.off('click', this._addVertex, this);
		this._map.off('mousemove', this._updateVector, this);
		this._map.off('contextmenu', this.deactivated, this);
	},

	initVector: function () {
		//polyine 객체생성
		this._polyline = new sop.Polyline([], this.shapeOptions);

		//markers 의 LayerGroup
		this._markers = new sop.LayerGroup();

		this._polylineGroup.addLayer(this._polyline);
		this._markersGroup.addLayer(this._markers);

		this._map.addLayer(this._polylineGroup);
		this._map.addLayer(this._markersGroup);
		this._map.addLayer(this._infoWindowGroup);
	},

	onRemove: function () {
		this._polylineGroup.clearLayers();
		this._markersGroup.clearLayers();
		this._infoWindowGroup.clearLayers();
		if (this._markers) {
			this._markers.clearLayers();
		}
	},

	//지도를 처음 클릭해서 시작되는 Event
	_startVector: function (e) {
		this.initVector();
		this._addStartMarker(e.utmk);
		this._addMarker(e.utmk);

		if (this._markers.getLayers().length === 2) {
			this._polyline.addUTMK(this._mouseMarker.getUTMK());
			this._map.off('click', this._startVector, this);

			//mousemove Event에 발생시 polygon 업데이트 함수(_updateVector) 호출
			this._map.on('mousemove', this._updateVector, this);

			//마커간의 거리를 담는 distanceGroup 초기화
			this._distanceGorup = [];

			//guideLine 객채 생성
			this._guideLine = new sop.Polyline(this._polyline.getUTMKs(), this.guideOptions).addTo(this._map);
			this._guideLine.addUTMK(e.utmk);

			//guideline Canvas 마우스 포인터 변경 class 추가
			sop.DomUtil.addClass(this._guideLine._renderer._container, 'sop-clickable');

			//infowindow 초기화 및 객체 설정
			this._initWindow(e.utmk);
			//text select 방지
			this._infoWindow.setContent(this.setDistanceInfo(0));
			this._infoWindow._container.onselectstart = function () {
				return false;
			};
			this._infoWindow._container.onmousedown = function () {
				return false;
			};
			this._infoWindow._tipContainer.style.display = 'none';
		}
	},

	//mousemove될때 호출 되는 함수
	_updateVector: function (e) {
		if (this._activated) {
			//mousemove evnent 중에는 polyline 좌표배열의 마지막 좌표를 제거하고 현재 이벤트 좌표를 추가한다.
			var polyArray = this._polyline.getUTMKs();
			var lastPos = polyArray[polyArray.length - 1];

			//guidLine mousemove 이벤트시 발생 좌표로 위치설정
			this._guideLine.setUTMKs([lastPos, e.utmk]);
			this._guideLine.redraw();
			//_polyline 최상위레벨로 보이게하기
			this._guideLine.bringToFront();
			//mousemove 때 실시간 총거리 계산
			this._realTimeDistance = lastPos.distanceTo(e.utmk);
			var totalDistance = 0;
			for (var i = 0; i < this._distanceGorup.length; i++) {
				totalDistance += this._distanceGorup[i];
			}
			totalDistance += this._realTimeDistance;

			//infowindow 위치및 내용 설정
			this._infoWindow.setUTMK(e.utmk);

			//infowindow Guide 문구 추가
			var infoContent = this.setDistanceInfo(totalDistance);
			infoContent += '<div class="sop-measusre-distanceInfo">마우스 오른쪽 버튼을<br>누르면 마침&nbsp;';
			infoContent += '<span class="sop-measure-bluemouse"></span></div>';
			this._infoWindow.setContent(infoContent);

			//click Event에  _addVertex 이벤트 등록
			this._map.on('click', this._addVertex, this);

			sop.DomEvent.preventDefault(e.originalEvent);

		}
	},

	_addVertex: function (e) {
		if (this._activated) {
			this._polyline.addUTMK(e.utmk);
			this._addMarker(e.utmk, true);
			//_polyline 최상위레벨로 보이게하기
			this._polyline.bringToFront();
		}
	},

	//Mouse 오른쪽 버튼 클릭시 마지막 마커 추가
	_endVector: function (e) {

		var guidePosArray = this._guideLine.getUTMKs();
		var endPos = e.utmk ? e.utmk : guidePosArray[guidePosArray.length - 1];

		this._polyline.addUTMK(endPos);
		this._addMarker(endPos, false);
		this._addCloseButton(endPos);

		this._map.fire('absclickend');
		console.log('End...this._map.absClick', this._map.absClick);

		//this._guideLine.onRemove();
		this._guideLine.setUTMKs([]);

		this._polyline = null;

		//guideline Canvas 마우스 포인터 변경 class 제거
		sop.DomUtil.removeClass(this._guideLine._renderer._container, 'sop-clickable');

		//마지막마커 추가후 최종 Polyline의 거리를 구한다.
		var totalDistance = 0;
		for (var i = 0; i < this._distanceGorup.length; i++) {
			totalDistance += this._distanceGorup[i];
		}

		//infoWindow 창에 총거리를 표시한다.
		this._infoWindow.setUTMK(endPos).setContent(this.setDistanceInfo(totalDistance));
	},

	//'시작' 마커아이콘 설정
	_addStartMarker: function (utmk) {
		var startMarkerIcon = sop.divIcon({
				className: 'sop-control-background sop-distance-start',
				iconAnchor: [0, 0],
				iconSize: [37, 21]
			}
		);

		this._startMarker = sop.marker(utmk, {
				icon: startMarkerIcon
			}
		).addTo(this._markers);

	},

	//기본 마커 아이콘 설정
	_addMarker: function (utmk, _isCaption) {
		var markerIcon = sop.divIcon({
				className: 'sop-control-background sop-distance-icon',
				iconAnchor: [5, 5],
				iconSize: [11, 11]
			}
		);

		//mouseMarker를 _markers LayerGroup에 추가해준다.
		this._mouseMarker = sop.marker(utmk, {
				icon: markerIcon
			}
		);
		this._mouseMarker.addTo(this._markers);
		this._mouseMarker._bringToFront();

		var _lastMarkerPos = this._markers.getLayers()[this._markers.getLayers().length - 2].getUTMK();

		//직전에 추가된 마커의 좌표와 현재추가된 마커의 좌표의 거리를 계산하여 추가한다.
		var _distance = _lastMarkerPos.distanceTo(utmk);
		this._distanceGorup.push(_distance);

		var zIndex = 900 + this._markers.getLayers().length;
		this._mouseMarker._zIndex = zIndex;

		//mouseMarker setPos Override......
		this._mouseMarker._setPos = function (pos) {
			sop.DomUtil.setPosition(this._icon, pos);
			if (this._shadow) {
				sop.DomUtil.setPosition(this._shadow, pos);
			}
		};

		if (_isCaption) {
			this._mouseMarker.setCaption({
				title: this._setMeterToKm(_distance),
				backgroundColor: 'white',
				border: '2px solid',
				borderColor: '#1F51B7',
				zIndex: zIndex
			});
		}
	},

	_addCloseButton: function (utmk) {
		var closeIcon = sop.divIcon({
				className: 'sop-control-background sop-distance-delete',
				iconAnchor: [-10, 5],
				iconSize: [18, 17]
			}
		);
		var _closeMarker = sop.marker(utmk, {icon: closeIcon, zIndexOffset: 1000}).addTo(this._markers);

		//Polyine의 closeButton 클릭시 선택한 polyine만 삭제하는 Event
		_closeMarker.on('click', function () {
			var markersGroupLayers = this._markersGroup.getLayers();
			for (var markersLayer in markersGroupLayers) {
				if (markersGroupLayers[markersLayer].hasLayer(_closeMarker)) {
					this._markersGroup.removeLayer(markersGroupLayers[markersLayer]);
					this._polylineGroup.removeLayer(this._polylineGroup.getLayers()[markersLayer]);
					this._infoWindowGroup.removeLayer(this._infoWindowGroup.getLayers()[markersLayer]);
				}
			}
		}, this);
	},

	_setMeterToKm: function (_meter) {
		if (_meter > 1000) {
			var _kilometer = _meter / 1000;
			return '<font color = "red" > ' + Math.floor(_kilometer) + ' </font > km';
		} else {
			return '<font color="red">' + Math.floor(_meter) + '</font> m';
		}
	},

	_getTime: function (_meter, _speed) {
		//i는 분단위로 계산되어 시간,분으로 변환된다.
		var i = _meter / _speed,
			s = Math.floor(i / 60),
			o = Math.floor(i % 60),
			n = {
				m: o
			};
		return s > 0 && (n.h = s), n;
	},

	_getTimeHtml: function (_meter, _speed) {
		var timeObj = this._getTime(_meter, _speed),
			timeTransformHtml = '';
		if (timeObj.h) {
			timeTransformHtml = '<font color="red">' + timeObj.h + '</font>시간 ';
		}
		timeTransformHtml += '<font color="red">' + timeObj.m + '</font>분';
		return timeTransformHtml;
	},

	setDistanceInfo: function (_distance) {
		var byWalkValue = this._getTimeHtml(_distance, 66.6),
			byBikeValue = this._getTimeHtml(_distance, 266.6),
			distanceValue = this._setMeterToKm(_distance),
			contentHtml = '<table class="sop-measure-infoWindow">';
		contentHtml += '<tr><td>총거리</td><td class="sop-masure-infoValue">' + distanceValue + '</td></tr>';
		//	contentHtml += '<tr><td>도보</td><td class="sop-masure-infoValue">' + byWalkValue + '</td></tr>';
		//	contentHtml += '<tr><td>자전거</td><td class="sop-masure-infoValue">' + byBikeValue + '</td></tr>';
		contentHtml += '</table>';
		return contentHtml;
	},
	//infoWindow 객체생성
	_initWindow: function (utmk) {
		this._infoWindow = sop.infoWindow({
			keepInView: false,
			closeOnClick: false,
			closeButton: false,
			offset: [100, -10],
			autoPan: false
		}).setUTMK(utmk).addTo(this._infoWindowGroup);
	}
});
