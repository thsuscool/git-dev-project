/**
 * Created by neighbor on 2014-10-16.
 */
Draw.Circle = Draw.Feature.extend({
	//Control 이름
	controlName: 'circle',

	options: {
		stroke: true,
		color: '#ff8cff',
		weight: 4,
		opacity: 0.7,
		fill: true,
		fillColor: null, //same as color by default
		fillOpacity: 0.5,
		clickable: true
	},

		//Control Button 이미지 생성
	_createSubUI: function (element) {
		this.ui = {};
		this.ui = sop.DomUtil.create('li', 'draw-circle-sub-out', element);
		sop.DomUtil.addClass(this.ui, 'draw-control-background');
		this.ui.title='원 그리기';

		return this.ui;
	},

	//button 클릭시 이미지 변경 On
	_switchSubOnButton: function () {
		sop.DomUtil.removeClass(this.ui, 'draw-circle-sub-out');
		sop.DomUtil.addClass(this.ui, 'draw-circle-sub-selected');
	},

	//button 클릭시 이미지 변경 Off
	_switchSubOffButton: function () {
		sop.DomUtil.removeClass(this.ui, 'draw-circle-sub-selected');
		sop.DomUtil.addClass(this.ui, 'draw-circle-sub-out');
	},

	_updateVector: function (e) {
		if (this._activated) {
			//Subdeactiaved
			this._map.on('mouseup', this.subDeactivated, this);
			if (!this._shape) {
				this._shape = new sop.Circle(this._startUtmk, this._startUtmk.distanceTo(e.utmk), this.options);
				this._shapeGroup.addLayer(this._shape);
				this._map.addLayer(this._shapeGroup);
			} else {
				this._shape.setRadius(this._startUtmk.distanceTo(e.utmk));
			}
			this._infoWindow.setUTMK(e.utmk);
		}
	},

	_fireCreateEvent: function (layer) {
		layer.type = 'circle';
		Draw.Feature.prototype._fireCreateEvent.call(this, layer);
	},

	// 면적계산
	_getArea: function () {
		var r = this._shape._mRadius;
		if (r < 0) {
			return 0;
		}
		return r*r*3.14;
	}
});

draw.circle = function (map, options) {
	return new Draw.Circle(map, options);
};
