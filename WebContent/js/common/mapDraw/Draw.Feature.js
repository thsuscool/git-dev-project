/**
 * Created by neighbor on 2014-10-16.
 */
var Draw = {};
var draw = {};
Draw.Feature = sop.Control.Measure.Overlay.extend({
	hasSubMenu : false,
	initialize : function (map, options) {
		sop.Control.Measure.Overlay.prototype.initialize.call(this, map);
		sop.setOptions(this, options);
		// 추가 되는 polyline 의 Group
		this._shapeGroup = new sop.LayerGroup();
		this._endMarkersGroup = new sop.LayerGroup();
		map.addLayer(this._endMarkersGroup);
	},
	
	subActivated : function () {
		this.setActivate(true);
		this.initMeasureEvents();
		this._map.fire('absclickstart');
		//console.log('등록...this._map.absClick', this._map.absClick);
		// Switch On Button Style Set
		this._switchSubOnButton();
	},
	
	subDeactivated : function (e) {
		if (this._shape) {
			this._endVector(e);
		}
		this.setActivate(false);
		this.removeMeasureEvents();
		// Switch Off Button Style Set
		this._switchSubOffButton();
	},
	
	onRemove : function () {
		this._shapeGroup.clearLayers();
		this._infoWindowGroup.clearLayers();
		this._endMarkersGroup.clearLayers();
	},
	
	// 방금그린 shape 지우기
	thisShapeRemove : function () {
		var markersGroupLayers = this._endMarkersGroup.getLayers();
		var lastIndex = markersGroupLayers.length - 1;
		this._endMarkersGroup.removeLayer(markersGroupLayers[lastIndex]);
		this._shapeGroup.removeLayer(this._shapeGroup.getLayers()[lastIndex]);
	},
	
	initMeasureEvents : function () {
		// 지도를 처음 클릭했을때 Event
		this._map.dragging.disable();
		this._map.on('mousedown', this._startVector, this);
		
	},
	
	removeMeasureEvents : function () {
		this._map.off('mousedown', this._startVector, this);
		this._map.off('mousemove', this._updateVector, this);
		this._map.off('mouseup', this.subDeactivated, this);
	},
	
	setControlNameToInfoWindow : function () {
		// this._infoWindow._tipContainer.style.display = 'none';
		var infoContent = '<div class="sop-measusre-areaInfo">' + this.controlName + '입니다.' + '</div>';
		this._infoWindow.setContent(infoContent);
	},
	
	setContentInfoWindow : function (content) {
		// this._infoWindow._tipContainer.style.display = 'none';
		var infoContent = '<div class="sop-measusre-areaInfo">' + content + '</div>';
		this._infoWindow.setContent(infoContent);
	},
	
	// 지도를 처음 클릭해서 시작되는 Event
	_startVector : function (e) {
		if (this._activated) {
			// infoWindow 초기화 객체
			this._initWindow(e.utmk);
			this.setControlNameToInfoWindow();
			this._map.addLayer(this._infoWindowGroup);
			
			this._startUtmk = e.utmk;
			// mousemove Event에 발생시 circle 업데이트 함수(_updateVector) 호출
			this._map.on('mousemove', this._updateVector, this);
		}
	},
	
	_endVector : function (e) {
		var layer = this._shape;
		var shapeArea = this._getArea();
		
		this._map.fire('absclickend');
		//console.log('End...this._map.absClick', this._map.absClick);
		
		/*if (shapeArea < 20000) {
			alert('개인정보보호를 위해 사용자 임의영역 면적이 20000m²이상이 되어야 합니다.');
			this._shapeGroup.removeLayer(this._shape);
			this._shape = null;
			this._map.dragging.enable();
		}
		else if (shapeArea > 113000000) {
			alert('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
			this._shapeGroup.removeLayer(this._shape);
			this._shape = null;
			this._map.dragging.enable();
		}
		else {*/
			this._shape = null;
			this._map.dragging.enable();
			this._fireCreateEvent(layer, this);
			this._addCloseButton(e.utmk);
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
		}).addTo(this._endMarkersGroup);
		
		_closeMarker._bringToFront();
		// polygon의 closeButton 클릭시 선택한 polygon만 삭제하는 Event
		_closeMarker.on('click', function () {
			var markersGroupLayers = this._endMarkersGroup.getLayers();
			for ( var i = 0; i < markersGroupLayers.length; i++) {
				if (markersGroupLayers[i] == _closeMarker) {
					this._endMarkersGroup.removeLayer(markersGroupLayers[i]);
					this._shapeGroup.removeLayer(this._shapeGroup.getLayers()[i]);
				}
			}
		}, this);
	},
	
	_initWindow : function (utmk) {
		this._infoWindow = sop.infoWindow({
			keepInView : false,
			closeOnClick : false,
			closeButton : false,
			autoPan : false
		}).setUTMK(utmk).addTo(this._infoWindowGroup);
	},
	
	_fireCreateEvent : function (layer) {
		this._map.fire('draw:created', {
			layer : layer,
			layerType : layer.type,
			shapeGroup : this
		});
	}
});