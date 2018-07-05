/**
 * Created by neighbor on 2014-10-16.
 */
var Poi=Poi ||{};
Draw.Control.Poi = Draw.Feature.extend({
	//Control 이름
	controlName: 'poiControl',
	hasSubMenu: true,
	options: {
		styleNS: 'draw-poi'
	},
	initPoiSubControl: function (_map) {
		this.poi={};
		var that=this;
		//this.poi.bizMap = new Poi.BizMap(_map);
		if(this.options.bizMap){
			that.poi.bizMap =  new Poi.BizMap(_map);
		}
		if(this.options.interactiveMap){
			that.poi.interactiveMap = new Poi.InteractiveMap(_map);
		}
	},

	//Control Button 이미지 생성
	_createUI: function (element) {
		this.initPoiSubControl(this._map);
		this.ui = {};
		var ns = this.options.styleNS;
		this.ui = sop.DomUtil.create('div', 'draw-poi-out', element);
		this.ui.title='사업체조회';
		sop.DomUtil.addClass(this.ui, 'draw-control-background');

		this.ui.subbar = sop.DomUtil.create('div', 'draw-subbar-out', this.ui);
		this.ui.subbarUI = sop.DomUtil.create('div', 'draw-subbar-ui', this.ui.subbar);
		this.hideSubButton();
		sop.DomUtil.addClass(this.ui.subbar, 'draw-control-background');

		for (var controlType in this.poi) {
			this.ui[controlType] = this.poi[controlType]._createSubUI(this.ui.subbarUI);
			sop.DomEvent.on(this.ui[controlType], 'click', this.changeSubButtonStatus, this);
		}
		return this.ui;
	},

	activated: function () {
		this._map.setZoom(10);
		this.setActivate(true);
		this.initMeasureEvents();
		this._switchOnButton();
		this.showSubButton();

	},

	deactivated: function (e) {
		this.setActivate(false);
		this.removeMeasureEvents();
		//Switch Off Button Style Set
		this._switchOffButton();
		this.hideSubButton();

		for (var poiObj in this.poi) {
			if (this.poi[poiObj]._isActivated()) {
				this.poi[poiObj].subDeactivated();
			}
		}
	},

	isDrawing: function () {
		this.isNowDrawing = false;
		return this.isNowDrawing;
	},

	//button 클릭시 이미지 변경 On
	_switchOnButton: function () {
		sop.DomUtil.removeClass(this.ui, 'draw-poi-out');
		sop.DomUtil.addClass(this.ui, 'draw-poi-selected');
		//sop.DomUtil.addClass(this.ui, 'draw-poi-out');
	},

	//button 클릭시 이미지 변경 Off
	_switchOffButton: function () {
		//sop.DomUtil.removeClass(this.ui, 'draw-poi-out');
		sop.DomUtil.removeClass(this.ui, 'draw-poi-selected');
		sop.DomUtil.addClass(this.ui, 'draw-poi-out');
	},

	showSubButton: function () {
		this.ui.subbarUI.style.display = 'block';
		this._allSubButtonOff();
	},

	hideSubButton: function () {
		this.ui.subbarUI.style.display = 'none';

	},

	_allSubButtonOff: function () {
		for (var controlType in this.poi) {
			this.poi[controlType]._allSubButtonOff(this.poi[controlType]);
		}
	},
	//Measure Control 이벤트 등록
	initMeasureEvents: function () {

	},
	//Measure Control 이벤트 해제
	removeMeasureEvents: function () {
	},

	changeSubButtonStatus: function (e) {

	},

	onRemove: function () {
		for (var obj in this.poi) {
			this.poi[obj].onRemove();
		}
	}
});
