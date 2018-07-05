/**
 * Created by neighbor on 2014-07-28.
 */
Draw.Control = {};
Draw.Control.Manager = sop.Control.extend({
	isEnable: true,
	options: {
		position: 'topleft'
	},

	initialize: function (options) {
		sop.Control.prototype.initialize.call(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		this._ui = this._createMeasureUI();
		map.whenReady(this._initUIEvents, this);

		return this._ui.bar;
	},

	addControl: function (control) {
		this.controlGroup = this.controlGroup || {};
		this.controlGroup[control.controlName] = control;
	},

	//Contorl 객체 활성화
	enable: function () {
		this.isEnable = true;
		for (var uiControl in this.controlGroup) {
			this._ui[uiControl].style.backgroundColor = "#fff";
			this._ui[uiControl].isEnable = true;
		}
	},
	//Contorl 객체 비활성화
	disable: function () {
		this.isEnable = false;
		for (var uiControl in this.controlGroup) {
			this._ui[uiControl].style.backgroundColor = "#D9D9D9";
			this.controlGroup[uiControl].onRemove();
			this.controlGroup[uiControl].deactivated();
			this._ui[uiControl].isEnable = false;
		}
	},


	enableControl: function (controlName) {
		this._ui[controlName].style.backgroundColor = "#fff";
		this._ui[controlName].isEnable = true;
	},

	disableControl: function (controlName) {
		this._ui[controlName].isEnable = false;
		this._ui[controlName].style.backgroundColor = "#D9D9D9";
		this.controlGroup[controlName].onRemove();
		this.controlGroup[controlName].deactivated();
	},
	removeOverlay: function () {
		this.oldSelectedTarget = null;
		for (var k in this.controlGroup) {
			this.controlGroup[k].onRemove();
			this.controlGroup[k].deactivated();
		}
	},

	_createMeasureUI: function () {
		var ui = {},
			ns = this.options.styleNS;

		ui.bar = sop.DomUtil.create('div', ' sop-bar');

		//controlGroup에 있는 객체만 ui생성한다.
		for (var controlObj in this.controlGroup) {
			ui[controlObj] = this.controlGroup[controlObj]._createUI(ui.bar);
			sop.DomEvent.on(ui[controlObj], 'click', this._changeButtonStatus, this);
		//	sop.DomEvent.on(ui[controlObj], 'mouseover', this._showSubButton, this);

			ui[controlObj].isEnable = true;
		}

		ui.clear = sop.DomUtil.create('div', 'draw-clear-out', ui.bar);
		ui.clear.isEnable = true;
		ui.clear.title='지우기';
		sop.DomUtil.addClass(ui.clear, 'draw-control-background');
		sop.DomEvent.disableClickPropagation(ui.bar);

		return ui;
	},

	_initUIEvents: function () {
		//clear 버튼에대한 Event 처리
		sop.DomEvent.on(this._ui.clear, 'click', this._changeButtonStatus, this);
	},

	_showSubButton: function (e) {
		var somethingActivated=false;
		if (this.isEnable) {
			var isMapVectorDrawing = false;
			//SubButton mouseover시

			for (var control in this.controlGroup) {
				if (this.controlGroup[control].isDrawing()) {
					isMapVectorDrawing = true;
				}
				//컨트롤 버튼이 선택되어 실행되고 있다면 subButtom이 보이지 않게 한다.
				if (this.controlGroup[control]._isActivated()) {
					somethingActivated = true;
				}
			}
			if(somethingActivated){
				return;
			}
			//Vector가 그려지고 있을때
			if (isMapVectorDrawing) {
				return;
			}

			if (sop.Browser.ielt9) {
				this._eleTarget = e.srcElement;
			}
			else {
				this._eleTarget = e.target;
			}

			if (!e.target.hasChildNodes()) {
				if (sop.Browser.ielt9) {
					this._eleTarget = e.srcElement.parentNode;
				}
				else {
					this._eleTarget= e.target.parentNode;
				}
			}
			if(!this._eleTarget.isEnable){
				return;
			}
			for (var uiObj in this._ui) {
				if (this._ui[uiObj] === this._eleTarget) {
					this.selectedTarget = uiObj;
				}
				for (var subUiObj in this._ui[uiObj]) {
					if (this._ui[uiObj][subUiObj] === this._eleTarget) {
						this.selectedSubTarget = subUiObj;
					}
				}
			}

			if (sop.Util.isUndefined(this.selectedTarget)) {
				return;
			}

			for (var obj in this.controlGroup) {
				if (obj === this.selectedTarget) {
					if (this.controlGroup[obj].hasSubMenu) {
						//this.controlGroup[this.selectedTarget]._switchOnButton();
						this.controlGroup[this.selectedTarget].showSubButton();
					}
				}

				else {
					if (!this.controlGroup[obj]._isActivated()) {
						this.controlGroup[obj]._switchOffButton();
					}

					if (this.controlGroup[obj].hasSubMenu) {
						this.controlGroup[obj].hideSubButton();
					}
				}

			}
		}
	},

	_changeButtonStatus: function (e) {		
		if (this.isEnable) {
			//event 발생된 elment 브라우저별 갖고오기
			if (sop.Browser.ielt9) {
				this._eleTarget = e.srcElement;
			}
			else {
				this._eleTarget = e.target;
			}

			//if(e.target.parentNode)
			if (!this._eleTarget.isEnable) {
				return;
			}
			//event가 발생된 eleTarget와 ui객체들중 같은 것 selectedTarget 값 삽입
			for (var uiObj in this._ui) {
				if (this._ui[uiObj] === this._eleTarget) {
					this.selectedTarget = uiObj;
				}
				for (var subUiObj in this._ui[uiObj]) {
					if (this._ui[uiObj][subUiObj] === this._eleTarget) {
						this.selectedSubTarget = subUiObj;
					}
				}
			}

			if (sop.Util.isUndefined(this.selectedTarget)) {
				return;
			}

			//직전에 눌렀던 버튼과 같은 버튼을 누르면 아무동작하지 않는다.
			if (this.oldSelectedTarget === this.selectedTarget) {

				if (this.selectedTarget == 'clear') {
					for (var obj in this.controlGroup) {
						this.oldSelectedTarget = null;
						this.controlGroup[obj].onRemove();
						return;
					}
				}

				if (this.controlGroup[this.selectedTarget]._isActivated()) {
					if (this.selectedSubTarget === 'previousSibling') {
						this.controlGroup[this.selectedTarget].deactivated(e);
						this._map.fire('absclickend');
						console.log('End...this._map.absClick', this._map.absClick);
						return;
					}
				}
			}

			if (this.oldSelectedTarget === 'distanceControl' && this.selectedTarget === 'poiControl') {
				this._map.fire('absclickend');
				console.log('End...this._map.absClick', this._map.absClick);
			}

			if (this.oldSelectedTarget === 'distanceControl' && this.selectedTarget === 'drawControl') {
				if (this.selectedSubTarget === 'previousSibling') {
					this._map.fire('absclickend');
					console.log('End...this._map.absClick', this._map.absClick);
				}
			}

			if (this.oldSelectedTarget === 'drawControl' && this.selectedTarget !== 'distanceControl') {
				if (this.selectedTarget !== 'drawControl') {
					this._map.fire('absclickend');
					console.log('End...this._map.absClick', this._map.absClick);
				}
			}

			if (this.oldSelectedTarget === 'measureControl' && this.selectedTarget !== 'distanceControl') {
				if (this.selectedTarget !== 'measureControl') {
					this._map.fire('absclickend');
					console.log('End...this._map.absClick', this._map.absClick);
				}
			}
			for (var obj in this.controlGroup) {
				if (obj === this.selectedTarget) {
					//controlGroup에 등록된 control activate 시킨다.
					this.controlGroup[this.selectedTarget].activated();
				} else {
					//clear 버튼 및 눌러지지 않는 버튼에대한 deactivated 된다.
					this.controlGroup[obj].deactivated(e);

				}

				if (this.selectedTarget === 'clear') {
					//clear 버튼이 눌러지면 그려진 모든 Control Vector 지운다.
					console.log('clear..');
					this.oldSelectedTarget = null;
					this.controlGroup[obj].onRemove();
				}
			}

			//현재 눌러진 Target을 저장한다.
			this.oldSelectedTarget = this.selectedTarget;
		}
	}
});

sop.Map.mergeOptions({
	drawControl: false
});

sop.Map.addInitHook(function () {
	if (this.options.drawControl) {
		this.drawControl = new Draw.Control.Manager();
		this.drawControl.addControl(new Draw.Control.Measure(this));
		//this.drawControl.addControl(new Draw.Control.Distance(this));
		this.drawControl.addControl(new Draw.Control.Overlay(this));
		this.drawControl.addControl(new Draw.Control.Poi(this));
		this.addControl(this.drawControl);
	}
});

draw.control = {};
draw.control.manager = function (options) {
	return  new Draw.Control.Manager(options);
};
