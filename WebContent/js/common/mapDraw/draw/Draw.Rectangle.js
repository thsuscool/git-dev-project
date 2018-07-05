/**
 * Created by neighbor on 2014-10-16.
 */
Draw.Rectangle = Draw.Feature.extend({
	//Control 이름
	controlName: 'rectangle',

	options: {
		stroke: true,
//		color: '#40a940',
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
		this.ui = sop.DomUtil.create('li', 'draw-rectangle-sub-out', element);
		sop.DomUtil.addClass(this.ui, 'draw-control-background');
		this.ui.title='사각형 그리기';
		return this.ui;
	},

	//button 클릭시 이미지 변경 On
	_switchSubOnButton: function () {
		sop.DomUtil.removeClass(this.ui, 'draw-rectangle-sub-out');
		sop.DomUtil.addClass(this.ui, 'draw-rectangle-sub-selected');
	},

	//button 클릭시 이미지 변경 Off
	_switchSubOffButton: function () {
		sop.DomUtil.removeClass(this.ui, 'draw-rectangle-sub-selected');
		sop.DomUtil.addClass(this.ui, 'draw-rectangle-sub-out');
	},

	_updateVector: function (e) {
		if (this._activated) {
			//Subdeactiaved
			this._map.on('mouseup', this.subDeactivated, this);
			if (!this._shape) {
				this._shape = new sop.Rectangle(new sop.UTMKBounds(this._startUtmk, e.utmk), this.options);
				this._shapeGroup.addLayer(this._shape);
				this._map.addLayer(this._shapeGroup);
			} else {
				this._shape.setBounds(new sop.UTMKBounds(this._startUtmk, e.utmk));
			}
			this._infoWindow.setUTMK(e.utmk);
		}
	},

	_fireCreateEvent: function (layer) {
		layer.type = 'rectangle';
		Draw.Feature.prototype._fireCreateEvent.call(this, layer);
	},

	// 면적계산
	_getArea: function () {
		var t = this._shape._utmks;
		if (t.length < 3) {
			return 0;
		}
		for (var e = t.length - 1, i = 0, s = 0; s < t.length; s++) {
			var o = t[e],
				n = t[s];
			i += (o.x + n.x) * (o.y - n.y);
			e = s;
		}
		return i /= 2, 0 > i && (i = -i), i;
	}

});

draw.rectangle = function (map, options) {
	return new Draw.Rectangle(map, options);
};
