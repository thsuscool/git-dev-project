/**
 * Created by neighbor on 2014-10-16.
 */
Draw.Control.Measure = Draw.Feature.extend({
	//Control 이름
	controlName: 'measureControl',
	isNowDrawing: false,
	hasSubMenu: true,

	initMeasureSubControl: function (_map) {
		this.measure = {};
		this.measure.area = new Draw.AreaMeasure(_map);
		this.measure.distance = new Draw.DistanceMeasure(_map);
	},

	//Control Button 이미지 생성
	_createUI: function (element) {
		this.initMeasureSubControl(this._map);
		this.ui = {};
		this.ui = sop.DomUtil.create('div', 'draw-first draw-measure-out', element);
		this.ui.title="지도측정도구";
		sop.DomUtil.addClass(this.ui, 'draw-control-background');

		this.ui.subbar = sop.DomUtil.create('div', 'draw-subbar-out', this.ui);
		this.ui.subbarUI = sop.DomUtil.create('ui', 'draw-subbar-ui', this.ui.subbar);
		sop.DomUtil.addClass(this.ui.subbar, 'draw-control-background');

		for (var controlType in this.measure) {
			this.ui[controlType] = this.measure[controlType]._createSubUI(this.ui.subbarUI);
			sop.DomEvent.on(this.ui[controlType], 'click', this.changeSubButtonStatus, this);
		}
		/*
		 this.ui.clearShape = sop.DomUtil.create('li', 'draw-clear-out', this.ui.subbarUI);
		 sop.DomUtil.addClass(this.ui.clearShape, 'draw-control-background');
		 sop.DomEvent.on(this.ui.clearShape, 'click', this.changeSubButtonStatus, this);
		 //sop.DomUtil.addClass(this.ui.clearDraw, 'sop-control-background');
		 */
		this.hideSubButton();
		return this.ui;
	},

	activated: function () {
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
		for (var drawObj in this.measure) {
			if (this.measure[drawObj]._isActivated()) {
				this.measure[drawObj].subDeactivated(e);
			}
		}

	},

	showSubButton: function () {
		this.ui.subbarUI.style.display = 'block';
	},

	hideSubButton: function () {
		this.ui.subbarUI.style.display = 'none';
		this._allSubButtonOff();
	},

	_allSubButtonOff: function () {
		for (var controlType in this.measure) {
			this.measure[controlType]._switchSubOffButton();
		}
	},

	//button 클릭시 이미지 변경 On
	_switchOnButton: function () {
		//sop.DomUtil.removeClass(this.ui, 'draw-measure-out');
		sop.DomUtil.addClass(this.ui, 'draw-measure-selected');
		sop.DomUtil.removeClass(this.ui, 'draw-measure-out');
	},

	//button 클릭시 이미지 변경 Off
	_switchOffButton: function () {
		//sop.DomUtil.removeClass(this.ui, 'draw-measure-out');
		sop.DomUtil.removeClass(this.ui, 'draw-measure-selected');
		sop.DomUtil.addClass(this.ui, 'draw-measure-out');
	},

	isDrawing: function () {
		this.isNowDrawing = false;
		for (var vector in this.measure) {
			if (this.measure[vector]._isActivated()) {
				this.isNowDrawing = true;
			}
		}
		return this.isNowDrawing;
	},

	//Measure Control 이벤트 등록
	initMeasureEvents: function () {

	},
	//Measure Control 이벤트 해제
	removeMeasureEvents: function () {
	},

	changeSubButtonStatus: function (e) {
		//event 발생된 elment 브라우저별 갖고오기
		if (sop.Browser.ielt9) {
			this._eleTarget = e.srcElement;
		}
		else {
			this._eleTarget = e.target;
		}

		//event가 발생된 eleTarget와 ui객체들중 같은 것 selectedTarget 값 삽입
		for (var uiObj in this.ui) {
			if (this.ui[uiObj] === this._eleTarget) {
				this.selectedTarget = uiObj;
			}
		}

		//직전에 눌렀던 버튼과 같은 버튼을 누르면 아무동작하지 않는다.
		if (this.oldSelectedTarget === this.selectedTarget) {
			if (this.selectedTarget == 'clearShape') {
				return;
			}
			if (this.measure[this.selectedTarget]._isActivated()) {
				return;
			}
		}

		for (var obj in this.measure) {
			if (obj === this.selectedTarget) {
				//controlGroup에 등록된 control activate 시킨다.
				this.measure[this.selectedTarget].subActivated();
			} else {
				//clear 버튼 및 눌러지지 않는 버튼에대한 deactivated 된다.
				this.measure[obj].subDeactivated(e);
			}

			if (this.selectedTarget === 'clearShape') {
				//clear 버튼이 눌러지면 그려진 모든 Control Vector 지운다.
				this.oldSelectedTarget = null;
				this.measure[obj].onRemove();
			}
		}

		//현재 눌러진 Target을 저장한다.
		this.oldSelectedTarget = this.selectedTarget;
	},

	onRemove: function () {
		for (var obj in this.measure) {
			this.measure[obj].onRemove();
		}
	}
});
