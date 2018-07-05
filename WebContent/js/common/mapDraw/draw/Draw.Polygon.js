/**
 * Created by neighbor on 2014-10-16.
 */
Draw.Polygon = Draw.Feature.extend({
	
	// Control 이름
	controlName : 'polygon',
	
	shapeOptions : {
		stroke : true,
		weight : 4,
		opacity : 0.7,
		fill : true,
		fillColor : null,
		fillOpacity : 0.5,
		// color: '#F29661',
		color : '#ff8cff',
		clickable : true
	},
	
	initialize : function (map) {
		sop.Control.Measure.Overlay.prototype.initialize.call(this, map);
		// 추가 되는 polyline 의 Group
		this._polygonGroup = new sop.LayerGroup();
		// '_marker' LayerGorup을 담는 Group
		this._markersGroup = new sop.LayerGroup();
	},
	
	// Control Button 이미지 생성
	_createSubUI : function (element) {
		this.ui = {};
		this.ui = sop.DomUtil.create('li', 'draw-polygon-sub-out', element);
		sop.DomUtil.addClass(this.ui, 'draw-control-background');
		this.ui.title = '다각형 그리기';
		return this.ui;
	},
	
	subDeactivated : function (e) {
		// 마지막 클릭 marker 추가
		if (this._polygon) {
			console.log('e', e);
			if (this._polygon.getUTMKs().length > 0) {
				this._endVector(e);
			}
		}
		
		this.setActivate(false);
		this.removeMeasureEvents();
		// Switch Off Button Style Set
		this._switchSubOffButton();
	},
	// Measure Control 이벤트 등록
	initMeasureEvents : function () {
		// 지도를 처음 클릭했을때 Event
		this._map.on('click', this._startVector, this);
		// 오른쪽 버튼 클릭 draw Event 해제
		// this._map.on('contextmenu', this.deactivated, this);
		this._map.on('contextmenu', this.subDeactivated, this);
	},
	
	// Measure Control 이벤트 해제
	removeMeasureEvents : function () {
		this._map.off('click', this._startVector, this);
		this._map.off('click', this._addVertex, this);
		this._map.off('mousemove', this._updateVector, this);
		// this._map.off('contextmenu', this.deactivated, this);
		this._map.off('contextmenu', this.subDeactivated, this);
	},
	
	onRemove : function () {
		this._polygonGroup.clearLayers();
		this._markersGroup.clearLayers();
		this._infoWindowGroup.clearLayers();
		if (this._markers) {
			this._markers.clearLayers();
		}
	},
	
	// button 클릭시 이미지 변경 On
	_switchSubOnButton : function () {
		sop.DomUtil.removeClass(this.ui, 'draw-polygon-sub-out');
		sop.DomUtil.addClass(this.ui, 'draw-polygon-sub-selected');
	},
	
	// button 클릭시 이미지 변경 Off
	_switchSubOffButton : function () {
		sop.DomUtil.removeClass(this.ui, 'draw-polygon-sub-selected');
		sop.DomUtil.addClass(this.ui, 'draw-polygon-sub-out');
	},
	// 지도를 처음 클릭해서 시작되는 Event
	_startVector : function (e) {
		this.initVector();
		if (this._activated) {
			this._addMarker(e.utmk);
			if (this._markers.getLayers().length === 1) {
				this._polygon.addUTMK(this._mouseMarker.getUTMK());
				this._map.off('click', this._startVector, this);
				// mousemove Event에 발생시 polygon 업데이트 함수(_updateVector) 호출
				this._map.on('mousemove', this._updateVector, this);
				
				// infoWindow 초기화 객체
				this._initWindow(e.utmk);
				this._infoWindow._tipContainer.style.display = 'none';
				var infoContent = '<div class="sop-measusre-areaInfo">폴리곤 API입니다.</div>';
				this._infoWindow.setContent(infoContent);
			}
		}
	},
	
	_updateVector : function (e) {
		if (this._activated) {
			var polyUtmks = this._polygon.getUTMKs();
			polyUtmks = sop.Polyline._flat(polyUtmks) ? polyUtmks : polyUtmks[0];
			
			if (polyUtmks.length > 1) {
				// mousemove evnent 중에는 polygon 좌표배열의 마지막 좌표를 제거하고 현재 이벤트 좌표를
				// 추가한다.
				// mousemove 의 polygon 동적 draw 가능
				//this._polygon.spliceUTMKs(polyUtmks.length - 1, 1, e.utmk);
				polyUtmks.pop();
				polyUtmks.push(e.utmk);
				this._polygon.setUTMKs(polyUtmks);
				
				// polygon 최상위레벨로 보이게하기
				this._polygon.bringToFront();
				// click Event에 _addVertex 이벤트 등록
				this._map.on('click', this._addVertex, this);
				
				// infowindow 위치및 내용 설정
				this._infoWindow.setUTMK(e.utmk);
				var infoContent = '<div class="sop-measusre-areaInfo">마우스 오른쪽 버튼을<br>누르면 마침&nbsp;';
				infoContent += '<span class="sop-measure-orangeemouse" ';
				infoContent += '"></span></div>';
				this._infoWindow.setContent(infoContent);
				
			}
			else if (this._polygon.getUTMKs().length === 1) {
				this._polygon.addUTMK(e.utmk);
			}
		}
	},
	
	_addVertex : function (e) {
		if (this._activated) {
			this._polygon.addUTMK(e.utmk);
			// polygon 최상위레벨로 보이게하기
			this._polygon.bringToFront();
			this._polygon.redraw();
			this._addMarker(e.utmk);
		}
	},
	
	initVector : function () {
		// polygon 객체 생성
		this._polygon = new sop.Polygon([], this.shapeOptions);
		
		// markers 의 LayerGroup
		this._markers = new sop.LayerGroup();
		
		this._polygonGroup.addLayer(this._polygon);
		this._markersGroup.addLayer(this._markers);
		
		this._map.addLayer(this._polygonGroup);
		this._map.addLayer(this._markersGroup);
		this._map.addLayer(this._infoWindowGroup);
	},
	
	_endVector : function (e) {
		var polyArray = this._polygon.getUTMKs();
		var endPos = e.utmk ? e.utmk : polyArray[polyArray.length - 1];
		var shape = this._polygon;
		
		var shapeArea = this._getArea();
		
		this._map.fire('absclickend');
		// console.log('End...this._map.absClick', this._map.absClick);
		
		/*if (shapeArea < 20000) {
			alert('개인정보보호를 위해 사용자 임의영역 면적이 20000m²이상이 되어야 합니다.');
			this._polygonGroup.removeLayer(this._polygon);
			this._markersGroup.removeLayer(this._markers);
			this._markers=null;
			this._polygon = null;
			this._map.dragging.enable();
		}
		else if (shapeArea > 113000000) {
			alert('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
			this._polygonGroup.removeLayer(this._polygon);
			this._markersGroup.removeLayer(this._markers);
			this._markers=null;
			this._polygon = null;
			this._map.dragging.enable();
		}
		else {*/
			this._polygon = null;
			this._addMarker(endPos);
			this._fireCreateEvent(shape);
			this._addMarker(endPos);
			this._addCloseButton(endPos);
		//}
		this._infoWindow._close();
	},
	
	_addCloseButton : function (utmk) {
		var closeIcon = sop.divIcon({
			className : 'sop-control-background sop-area-delete',
			iconAnchor : [ -10, 5 ],
			iconSize : [ 18, 17 ]
		});
		var _closeMarker = sop.marker(utmk, {
			icon : closeIcon
		}).addTo(this._markers);
		
		_closeMarker._bringToFront();
		// polygon의 closeButton 클릭시 선택한 polygon만 삭제하는 Event
		_closeMarker.on('click', function () {
			var markersGroupLayers = this._markersGroup.getLayers();
			for ( var i = 0; i < markersGroupLayers.length; i++) {
				if (markersGroupLayers[i].hasLayer(_closeMarker)) {
					this._markersGroup.removeLayer(markersGroupLayers[i]);
					this._polygonGroup.removeLayer(this._polygonGroup.getLayers()[i]);
					this._infoWindowGroup.removeLayer(this._infoWindowGroup.getLayers()[i]);
				}
			}
		}, this);
	},
	
	thisShapeRemove : function () {
		var markersGroupLayers = this._markersGroup.getLayers();
		var lastIndex = markersGroupLayers.length - 1;
		this._markersGroup.removeLayer(markersGroupLayers[lastIndex]);
		this._polygonGroup.removeLayer(this._polygonGroup.getLayers()[lastIndex]);
		this._infoWindowGroup.removeLayer(this._infoWindowGroup.getLayers()[lastIndex]);
	},
	
	_addMarker : function (utmk) {
		var markerIcon = sop.divIcon({
			className : 'sop-control-background sop-area-icon',
			iconAnchor : [ 5, 5 ],
			iconSize : [ 11, 11 ]
		});
		// mouseMarker를 _markers LayerGroup에 추가해준다.
		this._mouseMarker = sop.marker(utmk, {
			icon : markerIcon
		}).addTo(this._markers);
		
		var zIndex = 900 + this._markers.getLayers().length;
		this._mouseMarker._zIndex = zIndex;
		this._mouseMarker._bringToFront();
		
		// mouseMarker setPos Override......
		this._mouseMarker._setPos = function (pos) {
			sop.DomUtil.setPosition(this._icon, pos);
			if (this._shadow) {
				sop.DomUtil.setPosition(this._shadow, pos);
			}
		};
	},
	
	// infoWindow 객체생성
	_initWindow : function (utmk) {
		this._infoWindow = sop.infoWindow({
			keepInView : false,
			closeOnClick : false,
			closeButton : false,
			offset : [ 100, -10 ],
			autoPan : false
		}).setUTMK(utmk).addTo(this._infoWindowGroup);
	},
	
	_fireCreateEvent : function (shape) {
		shape.type = 'polygon';
		this._map.fire('draw:created', {
			layer : shape,
			layerType : shape.type,
			shapeGroup : this
		});
	}
	// polyGon 면적계산
	,
	_getArea : function () {
		var t = this._polygon.getUTMKs()[0];
		if (t.length < 3) {
			return 0;
		}
		for ( var e = t.length - 1, i = 0, s = 0; s < t.length; s++) {
			var o = t[e], n = t[s];
			i += (o.x + n.x) * (o.y - n.y);
			e = s;
		}
		return i /= 2, 0 > i && (i = -i), i;
	}
});

draw.polygon = function (map, options) {
	return new Draw.Polygon(map, options);
};
