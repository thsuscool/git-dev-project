/*
 sop 0.1-dev,
*/
(function (window, document, undefined) {/**
 *
 * SOP 지도제공시스템 namespace 정의.
 * @namespace
 */
var sop = {
	version: '0.1-dev'
};

function expose() {
	var oldL = window.sop;

	sop.noConflict = function () {
		window.sop = oldL;
		return this;
	};

	window.sop = sop;
}

// define sop for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = sop;

// define sop as an AMD module
} else if (typeof define === 'function' && define.amd) {
	define(sop);

// define sop as a global sop variable, saving the original sop to restore later if needed
} else {
	expose();
}


/*
 * sop.Util contains various utility functions used throughout sop code.
 */

/**
 * sop.Util 유틸성 함수 정의.
 * @namespace
 *
 */
sop.Util = {
	// extend an object with properties of one or more other objects
	/** sop.Util.extend 함수
	 *
	 * @example
	 * sop.Util.extend(this, {a: function}); // this 객체에 2번째 객체를 확장 시킨다.
	 *
	 * @param {Object} dest 확장 결과물 Object
	 * @param {Object} src... 복사 할 Object
	*/
	extend: function (dest) {
		var i, j, len, src;

		for (j = 1, len = arguments.length; j < len; j++) {
			src = arguments[j];
			for (i in src) {
				dest[i] = src[i];
			}
		}
		return dest;
	},

	// create an object from a given prototype
	create: Object.create || (function () {
		function F() {
		}

		return function (proto) {
			F.prototype = proto;
			return new F();
		};
	})(),

	// bind a function to be called with a given context
	bind: function (fn, obj) {
		var slice = Array.prototype.slice;

		if (fn.bind) {
			return fn.bind.apply(fn, slice.call(arguments, 1));
		}

		var args = slice.call(arguments, 2);

		return function () {
			return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
		};
	},

	// return unique ID of an object
	stamp: function (obj) {
		// jshint camelcase: false
		obj._sop_id = obj._sop_id || ++sop.Util.lastId;
		return obj._sop_id;
	},

	lastId: 0,

	// return a function that won't be called more often than the given interval
	throttle: function (fn, time, context) {
		var lock, args, wrapperFn, later;

		later = function () {
			// reset lock and call if queued
			lock = false;
			if (args) {
				wrapperFn.apply(context, args);
				args = false;
			}
		};

		wrapperFn = function () {
			if (lock) {
				// called too soon, queue to call later
				args = arguments;

			} else {
				// call and lock until later
				fn.apply(context, arguments);
				setTimeout(later, time);
				lock = true;
			}
		};

		return wrapperFn;
	},

	// wrap the given number to lie within a certain range (used for wrapping longitude)
	wrapNum: function (x, range, includeMax) {
		var max = range[1],
			min = range[0],
			d = max - min;
		return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
	},

	// do nothing (used as a noop throughout the code)
	falseFn: function () {
		return false;
	},

	// round a given number to a given precision
	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	// trim whitespace from both sides of a string
	trim: function (str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	},

	// split a string into words
	splitWords: function (str) {
		return sop.Util.trim(str).split(/\s+/);
	},

	// set options to an object, inheriting parent's options as well
	setOptions: function (obj, options) {
		if (!obj.hasOwnProperty('options')) {
			obj.options = obj.options ? sop.Util.create(obj.options) : {};
		}
		for (var i in options) {
			obj.options[i] = options[i];
		}
		return obj.options;
	},

	// make an URL with GET parameters out of a set of properties/values
	getParamString: function (obj, existingUrl, uppercase) {
		var params = [];
		for (var i in obj) {
			params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
		}
		return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	},

	// super-simple templating facility, used for TileLayer URLs
	template: function (str, data) {
		return str.replace(sop.Util.templateRe, function (str, key) {
			var value = data[key];

			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);

			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});
	},

	templateRe: /\{ *([\w_]+) *\}/g,

	isArray: Array.isArray || function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	},

	// minimal image URI, set to an image when disposing to flush memory
	emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',

	isUndefined: function (obj) {
		return typeof obj === 'undefined';
	},

	typeOf: function (obj) {
		var toSting = Object.prototype.toString;
		return this._OBJ2TYPE[toSting.call(obj)] || (obj ? 'object' : obj === null ? 'null' : 'undefined');
	},

	_OBJ2TYPE: {
		'[object Boolean]'  : 'boolean',
		'[object Number]'   : 'number',
		'[object String]'   : 'string',
		'[object Function]' : 'function',
		'[object Object]'   : 'object',
		'[object Array]'    : 'array',
		'[object Date]'     : 'date',
		'[object RegExp]'   : 'regexp',
		'[object Error]'    : 'error'
	}
};

(function () {
	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function getPrefixed(name) {
		return window['webkit' + name] || window['moz' + name] || window['ms' + name];
	}

	var lastTime = 0;

	// fallback for IE 7-8
	function timeoutDefer(fn) {
		var time = +new Date(),
			timeToCall = Math.max(0, 16 - (time - lastTime));

		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}

	var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer,
		cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
			getPrefixed('CancelRequestAnimationFrame') || function (id) {
			window.clearTimeout(id);
		};


	sop.Util.requestAnimFrame = function (fn, context, immediate) {
		if (immediate && requestFn === timeoutDefer) {
			fn.call(context);
		} else {
			return requestFn.call(window, sop.bind(fn, context));
		}
	};

	sop.Util.cancelAnimFrame = function (id) {
		if (id) {
			cancelFn.call(window, id);
		}
	};
})();

// shortcuts for most used utility functions
sop.extend = sop.Util.extend;
sop.bind = sop.Util.bind;
sop.stamp = sop.Util.stamp;
sop.setOptions = sop.Util.setOptions;


/**
 *
 * Javascript 에서 OOP(Object-Oriented Programing) 지원 하기 위한 함수 정의.
 * <br /> 생성자는 사용하지 않음.
 * @class
 * @abstract
 */
sop.Class = function () {};

/**
 * extend 함수 정의.
 * sop.Class.extend({}) 이용하여 함수를 확장해 나갈 수 있다.
 *
 * @example
 * var Fruit = sop.Class.extend({}); // 과일 객체를 정의.
 * var Apple = sop.Fruit.extend({}); // 과일 객체를 상속받은 사과 객체를 재정의.
 *
 * @param {Object} props 객체를 정의 할 Object.
 * @returns {NewClass}
 */
sop.Class.extend = function (props) {

	// extended class with the new prototype
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {

			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		if (this._initHooks.length) {
			this.callInitHooks();
		}
	};

	// jshint camelcase: false
	var parentProto = NewClass.__super__ = this.prototype;

	var proto = sop.Util.create(parentProto);
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		sop.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		sop.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (proto.options) {
		props.options = sop.Util.extend(sop.Util.create(proto.options), props.options);
	}

	// mix given properties into the prototype
	sop.extend(proto, props);

	proto._initHooks = [];

    // add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parentProto.callInitHooks) {
			parentProto.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};

// 프로토타입에 프로퍼티를 추가.
/**
 * 미리정의된 객체에 함수를 추가적으로 정의 할 수 있다. (mixin)
 *
 * @example
 * var MyMixin = {
 * 	foo: function () { ... },
 * 	bar: 5
 * };
 *
 * var MyClass = L.Class.extend({
 * 	includes: MyMixin
 * });
 *
 * var a = new MyClass();
 * a.foo();
 *
 * @param {Object} props include 될 Object
 */
sop.Class.include = function (props) {
	sop.extend(this.prototype, props);
};

//
/**
 * 함수 파라미터로 입력받은 options을 this객체의 옵션에 추가 한다.
 * mergeOptions 함수
 * @param {Object} options 객체 Options에 추가 될 Object
 */
sop.Class.mergeOptions = function (options) {
	sop.extend(this.prototype.options, options);
};

/**
 * 플러그인 추가시 사용하는 함수.
 * 파라미터로 전달 받은 함수는 객체가 생성자가 불러진후 후 실행 된다.
 *
 * @example
 * MyClass.addInitHook(function () {
 * 	// 생성자 함수 다음에 실행될 코드를 입력.
 * });
 *
 * // 아래와 같이 사용도 가능.
 * MyClass.addInitHook('methodName', arg1, arg2, …);
 *
 * @param {Function} fn addInitHook 대상 함수.
 */
sop.Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
};


/*
 * sop.Evented is a base class that sop classes inherit from to handle custom events.
 */

/*
 * sop.Evented
 * 이벤트 처리.
 *
 * @class
 * @classdesc SOP 지도제공시스템 이벤트 처리.
 *
 *
 */

/**
 * 이벤트 등록, 제거 함수 정의 클래스.
 * <br /> 생성자는 사용하지 않음.
 *
 * @class
 * @augments sop.Class
 * @abstract
 */
sop.Evented = sop.Class.extend(/** @lends sop.Evented.prototype */ {

	/**
	 *
	 * 이벤트 등록.
	 *
	 * @example
	 * map.on('click', function(e) {
	 * alert(e.latlng);
	 * });
	 *
	 * @param {String} types 이벤트명
	 * @param {Function} fn 이벤트 콜백 함수
	 * @param {Object} [context] 이벤트 컨텍스트
	 * @returns {sop.Evented}
	 *
	 */
	on: function (types, fn, context) {

		// types can be a map of types/handlers
		if (typeof types === 'object') {
			for (var type in types) {
				// we don't process space-separated events here for performance;
				// it's a hot path since Layer uses the on(obj) syntax
				this._on(type, types[type], fn);
			}

		} else {
			// types can be a string of space-separated words
			types = sop.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._on(types[i], fn, context);
			}
		}

		return this;
	},

	/**
	 * 이벤트 제거.
	 *
	 * @example
	 * map.off('click');
	 * map.off('click', 등록한 함수);
	 *
	 * @param {String} types 이벤트명
	 * @param {Function} [fn] on 함수로 등록한 콜백 함수
	 * @param {Object} [context] 이벤트 컨텍스트
	 * @returns {sop.Evented}
	 */
	off: function (types, fn, context) {

		if (!types) {
			// clear all listeners if called without arguments
			delete this._events;

		} else if (typeof types === 'object') {
			for (var type in types) {
				this._off(type, types[type], fn);
			}

		} else {
			types = sop.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._off(types[i], fn, context);
			}
		}

		return this;
	},

	// attach listener (without syntactic sugar now)
	/** @private */
	_on: function (type, fn, context) {

		var events = this._events = this._events || {},
		    contextId = context && context !== this && sop.stamp(context);

		if (contextId) {
			// store listeners with custom context in a separate hash (if it has an id);
			// gives a major performance boost when firing and removing events (e.g. on map object)

			var indexKey = type + '_idx',
			    indexLenKey = type + '_len',
			    typeIndex = events[indexKey] = events[indexKey] || {},
			    id = sop.stamp(fn) + '_' + contextId;

			if (!typeIndex[id]) {
				typeIndex[id] = {fn: fn, ctx: context};

				// keep track of the number of keys in the index to quickly check if it's empty
				events[indexLenKey] = (events[indexLenKey] || 0) + 1;
			}

		} else {
			// individual layers mostly use "this" for context and don't fire listeners too often
			// so simple array makes the memory footprint better while not degrading performance

			events[type] = events[type] || [];
			events[type].push({fn: fn});
		}
	},

	/** @private */
	_off: function (type, fn, context) {
		var events = this._events,
		    indexKey = type + '_idx',
		    indexLenKey = type + '_len';

		if (!events) { return; }

		if (!fn) {
			// clear all listeners for a type if function isn't specified
			delete events[type];
			delete events[indexKey];
			delete events[indexLenKey];
			return;
		}

		var contextId = context && context !== this && sop.stamp(context),
		    listeners, i, len, listener, id;

		if (contextId) {
			id = sop.stamp(fn) + '_' + contextId;
			listeners = events[indexKey];

			if (listeners && listeners[id]) {
				listener = listeners[id];
				delete listeners[id];
				events[indexLenKey]--;
			}

		} else {
			listeners = events[type];

			if (listeners) {
				for (i = 0, len = listeners.length; i < len; i++) {
					if (listeners[i].fn === fn) {
						listener = listeners[i];
						listeners.splice(i, 1);
						break;
					}
				}
			}
		}

		// set the removed listener to noop so that's not called if remove happens in fire
		if (listener) {
			listener.fn = sop.Util.falseFn;
		}
	},

	/**
	 * 이벤트를 발생시킴.
	 *
	 * @param {String} type 이벤트명
	 * @param {Object} data 이벤트 발생시 보낼 데이타
	 * @returns {sop.Evented}
	 */
	fire: function (type, data, propagate) {
		if (!this.listens(type, propagate)) { return this; }

		var event = sop.Util.extend({}, data, {type: type, target: this}),
		    events = this._events;

		if (events) {
		    var typeIndex = events[type + '_idx'],
		        i, len, listeners, id;

			if (events[type]) {
				// make sure adding/removing listeners inside other listeners won't cause infinite loop
				listeners = events[type].slice();

				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].fn.call(this, event);
				}
			}

			// fire event for the context-indexed listeners as well
			for (id in typeIndex) {
				typeIndex[id].fn.call(typeIndex[id].ctx, event);
			}
		}

		if (propagate) {
			// propagate the event to parents (set with addEventParent)
			this._propagateEvent(event);
		}

		return this;
	},

	/**
	 * @private
	 * @param type
	 * @param propagate
	 * @returns {boolean}
	 */
	listens: function (type, propagate) {
		var events = this._events;

		if (events && (events[type] || events[type + '_len'])) { return true; }

		if (propagate) {
			// also check parents for listeners if event propagates
			for (var id in this._eventParents) {
				if (this._eventParents[id].listens(type, propagate)) { return true; }
			}
		}
		return false;
	},

	/**
	 *
	 * sop.Evented.on 함수와 동일하게 이벤트 등록을 시키나 이벤트 처리를 한번만 수행.
	 *
	 * @param {String} types 이벤트명
	 * @param {Function} fn 이벤트 콜백 함수
	 * @param {Object} [context] 이벤트 컨텍스트
	 * @returns {sop.Evented}
	 */
	once: function (types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this.once(type, types[type], fn);
			}
			return this;
		}

		var handler = sop.bind(function () {
			this
			    .off(types, fn, context)
			    .off(types, handler, context);
		}, this);

		// add a listener that's executed once and removed after that
		return this
		    .on(types, fn, context)
		    .on(types, handler, context);
	},

	/**
	 * @private
	 * @param obj
	 * @returns {sop.Evented}
	 */
	// adds a parent to propagate events to (when you fire with true as a 3rd argument)
	addEventParent: function (obj) {
		this._eventParents = this._eventParents || {};
		this._eventParents[sop.stamp(obj)] = obj;
		return this;
	},

	/**
	 * @private
	 * @param obj
	 * @returns {sop.Evented}
	 */
	removeEventParent: function (obj) {
		if (this._eventParents) {
			delete this._eventParents[sop.stamp(obj)];
		}
		return this;
	},

	/** @private */
	_propagateEvent: function (e) {
		for (var id in this._eventParents) {
			this._eventParents[id].fire(e.type, sop.extend({layer: e.target}, e), true);
		}
	}
});

var proto = sop.Evented.prototype;

// aliases; we should ditch those eventually
proto.addEventListener = proto.on;
proto.removeEventListener = proto.clearAllEventListeners = proto.off;
proto.addOneTimeEventListener = proto.once;
proto.fireEvent = proto.fire;
proto.hasEventListeners = proto.listens;

sop.Mixin = {Events: proto};


/*
 * sop.Browser
 * 브라우져별 특성을 체크 함.
 */

(function () {

	var ua = navigator.userAgent.toLowerCase(),
		doc = document.documentElement,

		ie = 'ActiveXObject' in window,
		ie9 = ua.indexOf('msie 9') !== -1,
		webkit = ua.indexOf('webkit') !== -1,
		phantomjs = ua.indexOf('phantom') !== -1,
		android23 = ua.search('android [23]') !== -1,
		chrome = ua.indexOf('chrome') !== -1,

		mobile = typeof orientation !== 'undefined',
		msPointer = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !window.PointerEvent,
		pointer = (window.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints) || msPointer,

		ie3d = ie && ('transition' in doc.style),
		webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
		gecko3d = 'MozPerspective' in doc.style,
		opera3d = 'OTransition' in doc.style;


	var retina = 'devicePixelRatio' in window && window.devicePixelRatio > 1;

	if (!retina && 'matchMedia' in window) {
		var matches = window.matchMedia('(min-resolution:144dpi)');
		retina = matches && matches.matches;
	}

	var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch));

	var xhr = false;
	if (typeof XMLHttpRequest === 'function') {
		xhr = true;
	}

	/**
	 * @namespace
	 * @type {{ie: boolean, ielt9: boolean, chrome: boolean, safari: boolean, xhr: boolean}}
	 */
	sop.Browser = {
		/**
		 * Internet explorer 확인 flag (Internet explorer 9이상)
		 */
		ie: ie,

		/**
		 * Internet explorer 확인 flag (Internet explorer 9미만)
		 */
		ielt9: ie && !document.addEventListener || ie9,
		webkit: webkit,
		gecko: (ua.indexOf('gecko') !== -1) && !webkit && !window.opera && !ie,
		android: ua.indexOf('android') !== -1,
		android23: android23,

		/**
		 * Chrome 브라우져 확인 flag
		 */
		chrome: chrome,

		/**
		 * Safari 브라우져 확인 flag
		 */
		safari: !chrome && ua.indexOf('safari') !== -1,

		ie3d: ie3d,
		webkit3d: webkit3d,
		gecko3d: gecko3d,
		opera3d: opera3d,
		any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d) && !phantomjs,

		mobile: mobile,
		mobileWebkit: mobile && webkit,
		mobileWebkit3d: mobile && webkit3d,
		mobileOpera: mobile && window.opera,

		touch: !!touch,
		msPointer: !!msPointer,
		pointer: !!pointer,

		retina: !!retina,

		/**
		 * XmlHttpRequest 사용가능 flag
		 */
		xhr: xhr
	};

}());


/**
 *
 * SOP 지도제공시스템 상수 정의.
 * <br /> 생성자는 사용하지 않음.
 * @class
 * @augments sop.Class
 * @abstract
 */
sop.Const = sop.Class.extend({
	statics: {
		// IMAGE_PATH는 사용 URL로 교체 한다.
		/**
		 * sop 지도제공시스템에서 사용하는 이미지 경로.
		 * @static
		 * @memberOf sop.Const
		 */
		IMAGE_PATH: (function () {
			var scripts = document.getElementsByTagName('script'),
				sopRe = /[\/^]sop[\-\._]?([\w\-\._]*)\.js\??/;

			var i, len, src, path;

			for (i = 0, len = scripts.length; i < len; i++) {
				src = scripts[i].src;

				if (src.match(sopRe)) {
					path = src.split(sopRe)[0];

					return (path ? path + '/' : '') + 'images';
				}
			}
			// SOP 사용서버 images Path 반환
			return 'https://sgisapi.kostat.go.kr/maps/images';
		}())
	}
});



/*
 * sop.Point represents a point with x and y coordinates.
 */

sop.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
};

sop.Point.prototype = {

	clone: function () {
		return new sop.Point(this.x, this.y);
	},

	// non-destructive, returns a new point
	add: function (point) {
		return this.clone()._add(sop.point(point));
	},

	// destructive, used directly for performance in situations where it's safe to modify existing point
	_add: function (point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	subtract: function (point) {
		return this.clone()._subtract(sop.point(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	ceil: function () {
		return this.clone()._ceil();
	},

	_ceil: function () {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	},

	distanceTo: function (point) {
		point = sop.point(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	equals: function (point) {
		point = sop.point(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	contains: function (point) {
		point = sop.point(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	toString: function () {
		return 'Point(' +
		        sop.Util.formatNum(this.x) + ', ' +
		        sop.Util.formatNum(this.y) + ')';
	}
};

sop.point = function (x, y, round) {
	if (x instanceof sop.Point) {
		return x;
	}
	if (sop.Util.isArray(x)) {
		return new sop.Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	return new sop.Point(x, y, round);
};


/*
 * sop.Bounds represents a rectangular area on the screen in pixel coordinates.
 */

sop.Bounds = function (a, b) { //(Point, Point) or Point[]
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
};

sop.Bounds.prototype = {
	// extend the bounds to contain the given point
	extend: function (point) { // (Point)
		point = sop.point(point);

		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	getCenter: function (round) { // (Boolean) -> Point
		return new sop.Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	getBottomLeft: function () { // -> Point
		return new sop.Point(this.min.x, this.max.y);
	},

	getTopRight: function () { // -> Point
		return new sop.Point(this.max.x, this.min.y);
	},

	getSize: function () {
		return this.max.subtract(this.min);
	},

	contains: function (obj) { // (Bounds) or (Point) -> Boolean
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof sop.Point) {
			obj = sop.point(obj);
		} else {
			obj = sop.bounds(obj);
		}

		if (obj instanceof sop.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = sop.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};

sop.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
	if (!a || a instanceof sop.Bounds) {
		return a;
	}
	return new sop.Bounds(a, b);
};


/*
 * sop.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
 */

sop.Transformation = function (a, b, c, d) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
};

sop.Transformation.prototype = {
	transform: function (point, scale) { // (Point, Number) -> Point
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (point, scale) {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	untransform: function (point, scale) {
		scale = scale || 1;
		return new sop.Point(
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
};


/*
 * sop.DomUtil contains various utility functions for working with DOM.
 */

sop.DomUtil = {
	get: function (id) {
		return typeof id === 'string' ? document.getElementById(id) : id;
	},

	getStyle: function (el, style) {

		var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}

		return value === 'auto' ? null : value;
	},

	create: function (tagName, className, container) {

		var el = document.createElement(tagName);
		el.className = className;

		if (container) {
			container.appendChild(el);
		}

		return el;
	},

	remove: function (el) {
		var parent = el.parentNode;
		if (parent) {
			parent.removeChild(el);
		}
	},

	empty: function (el) {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	},

	toFront: function (el) {
		el.parentNode.appendChild(el);
	},

	toBack: function (el) {
		var parent = el.parentNode;
		parent.insertBefore(el, parent.firstChild);
	},

	hasClass: function (el, name) {
		if (el.classList !== undefined) {
			return el.classList.contains(name);
		}
		var className = sop.DomUtil.getClass(el);
		return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	},

	addClass: function (el, name) {
		if (el.classList !== undefined) {
			var classes = sop.Util.splitWords(name);
			for (var i = 0, len = classes.length; i < len; i++) {
				el.classList.add(classes[i]);
			}
		} else if (!sop.DomUtil.hasClass(el, name)) {
			var className = sop.DomUtil.getClass(el);
			sop.DomUtil.setClass(el, (className ? className + ' ' : '') + name);
		}
	},

	removeClass: function (el, name) {
		if (el.classList !== undefined) {
			el.classList.remove(name);
		} else {
			sop.DomUtil.setClass(el, sop.Util.trim((' ' + sop.DomUtil.getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
		}
	},

	setClass: function (el, name) {
		if (el.className.baseVal === undefined) {
			el.className = name;
		} else {
			// in case of SVG element
			el.className.baseVal = name;
		}
	},

	getClass: function (el) {
		return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	},

	setOpacity: function (el, value) {

		if ('opacity' in el.style) {
			el.style.opacity = value;

		} else if ('filter' in el.style) {

			var filter = false,
				filterName = 'DXImageTransform.Microsoft.Alpha';

			// filters collection throws an error if we try to retrieve a filter that doesn't exist
			try {
				filter = el.filters.item(filterName);
			} catch (e) {
				// don't set opacity to 1 if we haven't already set an opacity,
				// it isn't needed and breaks transparent pngs.
				if (value === 1) {
					return;
				}
			}

			value = Math.round(value * 100);

			if (filter) {
				filter.Enabled = (value !== 100);
				filter.Opacity = value;
			} else {
				el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
			}
		}
	},

	testProp: function (props) {

		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	setTransform: function (el, offset, scale) {
		var pos = offset || new sop.Point(0, 0);

		el.style[sop.DomUtil.TRANSFORM] =
			'translate3d(' + pos.x + 'px,' + pos.y + 'px' + ',0)' + (scale ? ' scale(' + scale + ')' : '');
	},

	setPosition: function (el, point, no3d) { // (HTMLElement, Point[, Boolean])

		// jshint camelcase: false
		el._sop_pos = point;

		if (sop.Browser.any3d && !no3d) {
			sop.DomUtil.setTransform(el, point);
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	getPosition: function (el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance

		// jshint camelcase: false
		return el._sop_pos;
	}
};


(function () {
	// prefix style property names

	sop.DomUtil.TRANSFORM = sop.DomUtil.testProp(
		['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);


	// webkitTransition comes first because some browser versions that drop vendor prefix don't do
	// the same for the transitionend event, in particular the Android 4.1 stock browser

	var transition = sop.DomUtil.TRANSITION = sop.DomUtil.testProp(
		['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

	sop.DomUtil.TRANSITION_END =
			transition === 'webkitTransition' || transition === 'OTransition' ? transition + 'End' : 'transitionend';


	if ('onselectstart' in document) {
		sop.DomUtil.disableTextSelection = function () {
			sop.DomEvent.on(window, 'selectstart', sop.DomEvent.preventDefault);
		};
		sop.DomUtil.enableTextSelection = function () {
			sop.DomEvent.off(window, 'selectstart', sop.DomEvent.preventDefault);
		};

	} else {
		var userSelectProperty = sop.DomUtil.testProp(
			['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

		sop.DomUtil.disableTextSelection = function () {
			if (userSelectProperty) {
				var style = document.documentElement.style;
				this._userSelect = style[userSelectProperty];
				style[userSelectProperty] = 'none';
			}
		};
		sop.DomUtil.enableTextSelection = function () {
			if (userSelectProperty) {
				document.documentElement.style[userSelectProperty] = this._userSelect;
				delete this._userSelect;
			}
		};
	}

	sop.DomUtil.disableImageDrag = function () {
		sop.DomEvent.on(window, 'dragstart', sop.DomEvent.preventDefault);
	};
	sop.DomUtil.enableImageDrag = function () {
		sop.DomEvent.off(window, 'dragstart', sop.DomEvent.preventDefault);
	};
})();


/**
 * Created on 2014-07-01.
 * sop.UTMK 지리적 x,y 좌표를 나타냄.
 */

sop.UTMK = function (x, y, alt) {
	if (isNaN(x) || isNaN(y)) {
		throw new Error('Invalid UTMK object: (' + x + ', ' + y + ')');
	}

	this.x = +x;
	this.y = +y;

	if (alt !== undefined) {
		this.alt = +alt;
	}
};

sop.UTMK.prototype = {
	equals: function (obj, maxMargin) {
		if (!obj) { return false; }

		obj = sop.utmk(obj);

		var margin = Math.max(
			Math.abs(this.x - obj.x),
			Math.abs(this.y - obj.y));

		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
	},

	toString: function (precision) {
		return 'UTMK(' +
			sop.Util.formatNum(this.x, precision) + ', ' +
			sop.Util.formatNum(this.y, precision) + ')';
	},

	distanceTo: function (other) {
		return sop.CRS.UTMK.distance(this, sop.utmk(other));
	},

	wrap: function () {
		return sop.CRS.UTMK.wrapUTMK(this);
	}
};

sop.UTMK.PROJ_CODE = 'SR-ORG:7308';
sop.UTMK.PROJ_DEF = '+proj=tmerc +lat_0=38.0 +lon_0=127.5 ' +
	'+x_0=1000000.0 +y_0=2000000.0 +k=0.9996 +a=6378137.0 +b=6356752.3141403 ' +
	'+ellps=GRS80 +towgs84=0,0,0 +datum=WGS84 +no_defs';

sop.utmk = function (a, b) { /*Number*/
	if (a instanceof sop.UTMK) {
		return a;
	}
	if (sop.Util.isArray(a) && typeof a[0] !== 'object') {
		if (a.length === 3) {
			return new sop.UTMK(a[0], a[1], a[2]);
		}
		return new sop.UTMK(a[0],  a[1]);
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'x' in a) {
		return new sop.UTMK(a.x, 'y' in a ? a.y : 0);
	}
	if (b === undefined) {
		return null;
	}
	return new sop.UTMK(a, b);
};



/**
 * Created on 2014-07-02.
 */

sop.UTMKBounds = function (southWest, northEast) { // (UTMK, UTMK) or (UTMK[])
	if (!southWest) {
		return;
	}

	var utmks = northEast ? [southWest, northEast] : southWest;

	for (var i = 0, len = utmks.length; i < len; i++) {
		this.extend(utmks[i]);
	}
};

sop.UTMKBounds.prototype = {

	// extend the bounds to contain the given point or bounds
	extend: function (obj) { // (UTMK) or (UTMKBounds)
		var sw = this._southWest,
			ne = this._northEast,
			sw2, ne2;

		if (obj instanceof sop.UTMK) {
			sw2 = obj;
			ne2 = obj;

		} else if (obj instanceof sop.UTMKBounds) {
			sw2 = obj._southWest;
			ne2 = obj._northEast;

			if (!sw2 || !ne2) {
				return this;
			}

		} else {
			return obj ? this.extend(sop.utmk(obj) || sop.utmkBounds(obj)) : this;
		}

		if (!sw && !ne) {
			this._southWest = new sop.UTMK(sw2.x, sw2.y);
			this._northEast = new sop.UTMK(ne2.x, ne2.y);
		} else {
			sw.x = Math.min(sw2.x, sw.x);
			sw.y = Math.min(sw2.y, sw.y);
			ne.x = Math.max(ne2.x, ne.x);
			ne.y = Math.max(ne2.y, ne.y);
		}

		return this;
	},

	// extend the bounds by a percentage
	pad: function (bufferRatio) { // (Number) -> UTMKBounds
		var sw = this._southWest,
			ne = this._northEast,
			heightBuffer = Math.abs(sw.y - ne.y) * bufferRatio,
			widthBuffer = Math.abs(sw.x - ne.x) * bufferRatio;

		return new sop.UTMKBounds(
			new sop.UTMK(sw.x - widthBuffer, sw.y - heightBuffer),
			new sop.UTMK(ne.x + widthBuffer, ne.y + heightBuffer));
	},

	getCenter: function () { // -> UTMK
		return new sop.UTMK(
				(this._southWest.x + this._northEast.x) / 2,
				(this._southWest.y + this._northEast.y) / 2);
	},

	getSouthWest: function () {
		return this._southWest;
	},

	getNorthEast: function () {
		return this._northEast;
	},

	getNorthWest: function () {
//		return new sop.UTMK(this.getNorth(), this.getWest());
		return new sop.UTMK(this.getWest(), this.getNorth());
	},

	getSouthEast: function () {
		return new sop.UTMK(this.getEast(), this.getSouth());
	},

	getWest: function () {
		return this._southWest.x;
	},

	getSouth: function () {
		return this._southWest.y;
	},

	getEast: function () {
		return this._northEast.x;
	},

	getNorth: function () {
		return this._northEast.y;
	},

	contains: function (obj) { // (UTMKBounds) or (UTMK) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof sop.UTMK) {
			obj = sop.utmk(obj);
		} else {
			obj = sop.utmkBounds(obj);
		}

		var sw = this._southWest,
			ne = this._northEast,
			sw2, ne2;

		if (obj instanceof sop.UTMKBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.x >= sw.x) && (ne2.x <= ne.x) &&
			(sw2.y >= sw.y) && (ne2.y <= ne.y);
	},

	intersects: function (bounds) { // (UTMKBounds)
		bounds = sop.utmkBounds(bounds);

		var sw = this._southWest,
			ne = this._northEast,
			sw2 = bounds.getSouthWest(),
			ne2 = bounds.getNorthEast(),

			yIntersects = (ne2.y >= sw.y) && (sw2.y <= ne.y),
			xIntersects = (ne2.x >= sw.x) && (sw2.x <= ne.x);

		return yIntersects && xIntersects;
	},

	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	equals: function (bounds) { // (UTMKBounds)
		if (!bounds) {
			return false;
		}

		bounds = sop.utmkBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest()) &&
			this._northEast.equals(bounds.getNorthEast());
	},

	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

sop.utmkBounds = function (a, b) { // (UTMKBounds) or (UTMK, UTMK)
	if (!a || a instanceof sop.UTMKBounds) {
		return a;
	}
	return new sop.UTMKBounds(a, b);
};


/**
 * sop.Projection.UTMK
 * 올레 타일맵에서 사용 하는 영역정보를 가지고 project, unproject를 실행한다.
 */

sop.Projection = {};

sop.Projection.UTMK = {

	bounds: sop.bounds([171162, 1214781], [1744026, 2787645]),
	utmkBounds: sop.utmkBounds([[171162, 1214781], [1744026, 2787645]]),

	project: function (utmk) {
		return new sop.Point(utmk.x, utmk.y);
	},

	unproject: function (point) {
		return new sop.UTMK(point.x, point.y);
	}
};


/*
 * sop.CRS is the base object for all defined CRS (Coordinate Reference Systems) in sop.
 */

sop.CRS = {
	// converts geo coords to pixel ones
	utmkToPoint: function (utmk, zoom) {
		var projectedPoint = this.projection.project(utmk),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	// converts pixel coords to geo coords
	pointToUTMK: function (point, zoom) {
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	// converts geo coords to projection-specific coords (e.g. in meters)
	project: function (utmk) {
		return this.projection.project(utmk);
	},

	// converts projected coords to geo coords
	unproject: function (point) {
		return this.projection.unproject(point);
	},

	// defines how the world scales with zoom
	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	// returns the bounds of the world in projected coords if applicable
	getProjectedBounds: function (zoom) {
		if (this.infinite) { return null; }
		var b = this.projection.bounds,
		    s = this.scale(zoom),
		    min = this.transformation.transform(b.min, s),
		    max = this.transformation.transform(b.max, s);

		return sop.bounds(min, max);
	},

	// whether a coordinate axis wraps in a given range (e.g. longitude from -180 to 180); depends on CRS
	// wrapLng: [min, max],
	// wrapLat: [min, max],

	// if true, the coordinate space will be unbounded (infinite in all directions)
	// infinite: false,

	// wraps geo coords in certain ranges if applicable
	wrapUTMK: function (utmk) {
		var x = this.wrapX ? sop.Util.wrapNum(utmk.x, this.wrapX, true) : utmk.x,
		    y = this.wrapY ? sop.Util.wrapNum(utmk.y, this.wrapY, true) : utmk.y;

		return sop.utmk(x, y);
	}
};


sop.CRS.UTMK = sop.extend({}, sop.CRS, {
	projection: sop.Projection.UTMK,
	transformation: new sop.Transformation(1, -171162, -1, 2787645),
	resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
	_scales: function () {
		var scales = [];
		for (var i = 0, len = this.resolutions.length; i  < len; i++)
		{
			scales[i] = 1 / this.resolutions[i];
		}
		return scales;
	},
	scale: function (zoom) {
		if ((typeof this._scales) === 'function')
		{
			this._scales = this._scales();
		}
		return this._scales[zoom];
	},

	distance: function (utmk1, utmk2) {
		var dx = utmk2.x - utmk1.x,
		    dy = utmk2.y - utmk1.y;

		return Math.sqrt(dx * dx + dy * dy);
	},

	code: 'UTMK'
});


/**
 * 지도 생성에 사용되는 객체 입니다.
 *
 * @class
 * @augments sop.Evented
 *
 * @param {HTMLElement|string} id - 지도를 표시할 HTMLElment 또는 지도 HTML Tag 값.
 * @param {MapOptions} [options] - 지도 옵션.
 *
 */

sop.Map = sop.Evented.extend(/** @lends sop.Map.prototype **/{

	/** sop.Map */
	options: {
		crs: sop.CRS.UTMK,
		/*
		 center: LatLng,
		 zoom: Number,
		 layers: Array,
		 */

		fadeAnimation: true,
		trackResize: true,
		markerZoomAnimation: true
	},

	/**
	 * 지도 객체 생성시 객체 초기화 함수, 명시된 HTML id, options를 사용해서 지도 객체를 생성한다.
	 *
	 * @param {HTMLElement|string} id - 지도를 표시할 HTMLElment 또는 지도 HTML Tag 값.
	 * @param {MapOptions} [options] - 지도 옵션.
	 * @private
	 */
	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = sop.setOptions(this, options);

		this._initContainer(id);
		this._initLayout();

		// hack for https://github.com/Leaflet/Leaflet/issues/1980
		this._onResize = sop.bind(this._onResize, this);

		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(sop.utmk(options.center), options.zoom, {reset: true});
		}

		this._handlers = [];
		this._layers = {};
		this._zoomBoundLayers = {};

		this.callInitHooks();

		this._addLayers(this.options.layers);
	},


	/**
	 * 파라미터로 입력 받은 중심좌표와 줌레벨을 이용하여 지도 화면을 설정 한다.
	 *
	 * @param {UTMK} center - 뷰를 설정할 지도 중심 UTMK 좌표
	 * @param {Number} [zoom] - 지도 줌 레벨
	 * @param {ZoomOptions|PanOptions} [options] - Zoom, Pan 옵션
	 * @returns {sop.Map} 지도객체를 반환.
	 */
	// replaced by animation-powered implementation in Map.PanAnimation.js
	setView: function (center, zoom) {
		zoom = zoom === undefined ? this.getZoom() : zoom;
		this._resetView(sop.utmk(center), this._limitZoom(zoom));
		return this;
	},

	/**
	 * 지도 줌을 설정 한다.
	 *
	 * @param {Number} zoom - 지도에 설정 할 줌 레벨.
	 * @param {ZoomOptions} options - 줌 옵션.
	 * @returns {sop.Map} 지도객체를 반환.
	 */
	setZoom: function (zoom, options) {
		if (!this._loaded) {
			this._zoom = this._limitZoom(zoom);
			return this;
		}
		return this.setView(this.getCenter(), zoom, {zoom: options});
	},

	/**
	 * delta 값 만큰 줌 레벨을 증가 시킨다.
	 *
	 * @param {Number} [delta] - 증가 시킬 줌 delta 값.
	 * @param {ZoomOptions} [options] - 줌 옵션.
	 * @returns {sop.Map} 지도객체를 반환.
	 */
	zoomIn: function (delta, options) {
		return this.setZoom(this._zoom + (delta || 1), options);
	},

	/**
	 * delta값 만큼 레벨을 감소 시킨다.
	 *
	 * @param {Number} [delta] - 감소 시킬 줌 delta 값.
	 * @param {ZoomOptions} [options] - 줌 옵션.
	 * @returns {sop.Map} 지도객체를 반환.
	 */
	zoomOut: function (delta, options) {
		return this.setZoom(this._zoom - (delta || 1), options);
	},

	/**
	 *
	 * @param {UTMK} [utmk]
	 * @param {Number} [zoom]
	 * @param {ZoomOptions} [options]
	 * @returns {sop.Map} 지도객체를 반환.
	 */
	setZoomAround: function (utmk, zoom, options) {
		var scale = this.getZoomScale(zoom),
			viewHalf = this.getSize().divideBy(2),
			containerPoint = utmk instanceof sop.Point ? utmk : this.utmkToContainerPoint(utmk),

			centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
			newCenter = this.containerPointToUTMK(viewHalf.add(centerOffset));

		return this.setView(newCenter, zoom, {zoom: options});
	},

	/**
	 * 입력받은 영역 영역이 화면에 표시 될 수 있는 최대 레벨로 화면을 설정 한다.
	 *
	 * @param {UTMKBounds} bounds
	 * @param {FitBoundsOptions} options
	 * @returns {sop.Map} 지도객체를 반환.
	 */
	fitBounds: function (bounds, options) {

		options = options || {};
		bounds = bounds.getBounds ? bounds.getBounds() : sop.utmkBounds(bounds);

		var paddingTL = sop.point(options.paddingTopLeft || options.padding || [0, 0]),
			paddingBR = sop.point(options.paddingBottomRight || options.padding || [0, 0]),

			zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

		zoom = options.maxZoom ? Math.min(options.maxZoom, zoom) : zoom;

		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

			swPoint = this.project(bounds.getSouthWest(), zoom),
			nePoint = this.project(bounds.getNorthEast(), zoom),
			center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

		return this.setView(center, zoom, options);
	},

	// fitWorld: function (options) {
	// 	return this.fitBounds([[-90, -180], [90, 180]], options);
	// },

	/**
	 * 입력받은 UTMK 좌표로 지도를 이동 시킨다.
	 *
	 * @param {UTMK} [center]
	 * @param {PanOptions} [options]
	 * @returns {sop.Map}
	 */
	panTo: function (center, options) { // (UTMK)
		return this.setView(center, this._zoom, {pan: options});
	},

	/**
	 * 입력받은 Point 픽셀위치로 지도를 이동 시킨다.
	 *
	 * @param {Point} [point]
	 * @returns {sop.Map}
	 */
	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.PanAnimation.js
		this.fire('movestart');

		this._rawPanBy(sop.point(offset));

		this.fire('move');
		return this.fire('moveend');
	},

	/**
	 * 지도 최대영역을 설정 한다.
	 *
	 * @param {UTMKBounds} [bounds]
	 * @returns {sop.Map}
	 */
	setMaxBounds: function (bounds) {
		bounds = sop.utmkBounds(bounds);

		this.options.maxBounds = bounds;

		if (!bounds) {
			return this.off('moveend', this._panInsideMaxBounds);
		}

		if (this._loaded) {
			this._panInsideMaxBounds();
		}

		return this.on('moveend', this._panInsideMaxBounds);
	},

	/**
	 * 파라미터로 전달받은 영역안으로 이동.
	 *
	 * @param {UTMKBounds} bounds
	 * @param {PanOptions} options
	 * @returns {sop.Map}
	 */
	panInsideBounds: function (bounds, options) {
		var center = this.getCenter(),
			newCenter = this._limitCenter(center, this._zoom, bounds);

		if (center.equals(newCenter)) {
			return this;
		}

		return this.panTo(newCenter, options);
	},

	/**
	 *
	 * @param options
	 * @returns {sop.Map}
	 */
	invalidateSize: function (options) {
		if (!this._loaded) {
			return this;
		}

		options = sop.extend({
			animate: false,
			pan: true
		}, options === true ? {animate: true} : options);

		var oldSize = this.getSize();
		this._sizeChanged = true;
		this._initialCenter = null;

		var newSize = this.getSize(),
			oldCenter = oldSize.divideBy(2).round(),
			newCenter = newSize.divideBy(2).round(),
			offset = oldCenter.subtract(newCenter);

		if (!offset.x && !offset.y) {
			return this;
		}

		if (options.animate && options.pan) {
			this.panBy(offset);

		} else {
			if (options.pan) {
				this._rawPanBy(offset);
			}

			this.fire('move');

			if (options.debounceMoveend) {
				clearTimeout(this._sizeTimer);
				this._sizeTimer = setTimeout(sop.bind(this.fire, this, 'moveend'), 200);
			} else {
				this.fire('moveend');
			}
		}

		return this.fire('resize', {
			oldSize: oldSize,
			newSize: newSize
		});
	},

	// TODO handler.addTo
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) {
			return this;
		}

		var handler = this[name] = new HandlerClass(this);

		this._handlers.push(handler);

		if (this.options[name]) {
			handler.enable();
		}

		return this;
	},

	remove: function () {

		this._initEvents('off');

		try {
			// throws error in IE6-8
			delete this._container._sop;
		} catch (e) {
			this._container._sop = undefined;
		}

		sop.DomUtil.remove(this._mapPane);

		if (this._clearControlPos) {
			this._clearControlPos();
		}

		this._clearHandlers();

		if (this._loaded) {
			this.fire('unload');
		}

		return this;
	},

	createPane: function (name, container) {
		var className = 'sop-pane' + (name ? ' sop-' + name.replace('Pane', '') + '-pane' : ''),
			pane = sop.DomUtil.create('div', className, container || this._mapPane);

		if (name) {
			this._panes[name] = pane;
		}
		return pane;
	},


	// public methods for getting map state

	getCenter: function () { // (Boolean) -> UTMK
		this._checkIfLoaded();

		if (this._initialCenter && !this._moved()) {
			return this._initialCenter;
		}
		return this.layerPointToUTMK(this._getCenterLayerPoint());
	},

	getZoom: function () {
		return this._zoom;
	},

	getBounds: function () {
		var bounds = this.getPixelBounds(),
			sw = this.unproject(bounds.getBottomLeft()),
			ne = this.unproject(bounds.getTopRight());

		return new sop.UTMKBounds(sw, ne);
	},

	getMinZoom: function () {
		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
	},

	getMaxZoom: function () {
		return this.options.maxZoom === undefined ?
			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
			this.options.maxZoom;
	},

	getBoundsZoom: function (bounds, inside, padding) { // (UTMKBounds[, Boolean, Point]) -> Number
		bounds = sop.utmkBounds(bounds);

		var zoom = this.getMinZoom() - (inside ? 1 : 0),
			maxZoom = this.getMaxZoom(),
			size = this.getSize(),

			nw = bounds.getNorthWest(),
			se = bounds.getSouthEast(),

			zoomNotFound = true,
			boundsSize;

		padding = sop.point(padding || [0, 0]);

		do {
			zoom++;
			boundsSize = this.project(se, zoom).subtract(this.project(nw, zoom)).add(padding);
			zoomNotFound = !inside ? size.contains(boundsSize) : boundsSize.x < size.x || boundsSize.y < size.y;

		} while (zoomNotFound && zoom <= maxZoom);

		if (zoomNotFound && inside) {
			return null;
		}

		return inside ? zoom : zoom - 1;
	},

	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new sop.Point(
				this._container.clientWidth,
				this._container.clientHeight);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	getPixelBounds: function () {
		var topLeftPoint = this._getTopLeftPoint();
		return new sop.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	getPixelOrigin: function () {
		this._checkIfLoaded();
		return this._initialTopLeftPoint;
	},

	getPixelWorldBounds: function () {
		return this.options.crs.getProjectedBounds(this.getZoom());
	},

	getPane: function (pane) {
		return typeof pane === 'string' ? this._panes[pane] : pane;
	},

	getPanes: function () {
		return this._panes;
	},

	getContainer: function () {
		return this._container;
	},


	// TODO replace with universal implementation after refactoring projections

	getZoomScale: function (toZoom) {
		var crs = this.options.crs;
		return crs.scale(toZoom) / crs.scale(this._zoom);
	},

	getScaleZoom: function (scale) {
		return this._zoom + (Math.log(scale) / Math.LN2);
	},


	// conversion methods

	project: function (utmk, zoom) { // (UTMK[, Number]) -> Point
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.utmkToPoint(sop.utmk(utmk), zoom);
	},

	unproject: function (point, zoom) { // (Point[, Number]) -> UTMK
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToUTMK(sop.point(point), zoom);
	},

	layerPointToUTMK: function (point) { // (Point)
		var projectedPoint = sop.point(point).add(this.getPixelOrigin());
		return this.unproject(projectedPoint);
	},

	//utmk 좌표를 point형으로 변환
	utmkToLayerPoint: function (utmk) { // (UTMK)
		var projectedPoint = this.project(sop.utmk(utmk))._round();
		return projectedPoint._subtract(this.getPixelOrigin());
	},

	wrapUTMK: function (utmk) {
		return this.options.crs.wrapUTMK(sop.utmk(utmk));
	},

	distance: function (utmk1, utmk2) {
		return this.options.crs.distance(sop.utmk(utmk1), sop.utmk(utmk2));
	},

	containerPointToLayerPoint: function (point) { // (Point)
		return sop.point(point).subtract(this._getMapPanePos());
	},

	layerPointToContainerPoint: function (point) { // (Point)
		return sop.point(point).add(this._getMapPanePos());
	},

	containerPointToUTMK: function (point) {
		var layerPoint = this.containerPointToLayerPoint(sop.point(point));
		return this.layerPointToUTMK(layerPoint);
	},

	utmkToContainerPoint: function (utmk) {
		return this.layerPointToContainerPoint(this.utmkToLayerPoint(sop.utmk(utmk)));
	},

	mouseEventToContainerPoint: function (e) { // (MouseEvent)
		return sop.DomEvent.getMousePosition(e, this._container);
	},

	mouseEventToLayerPoint: function (e) { // (MouseEvent)
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	mouseEventToUTMK: function (e) { // (MouseEvent)
		return this.layerPointToUTMK(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods
	/** @private */
	_initContainer: function (id) {
		var container = this._container = sop.DomUtil.get(id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._sop) {
			throw new Error('Map container is already initialized.');
		}

		container._sop = true;
	},

	/** @private */
	_initLayout: function () {
		var container = this._container;

		this._fadeAnimated = this.options.fadeAnimation && sop.Browser.any3d;

		sop.DomUtil.addClass(container, 'sop-container' +
			(sop.Browser.touch ? ' sop-touch' : '') +
			(sop.Browser.retina ? ' sop-retina' : '') +
			(sop.Browser.ielt9 ? ' sop-oldie' : '') +
			(sop.Browser.safari ? ' sop-safari' : '') +
			(this._fadeAnimated ? ' sop-fade-anim' : ''));

		var position = sop.DomUtil.getStyle(container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	/** @private */
	_initPanes: function () {
		var panes = this._panes = {};

		this._mapPane = this.createPane('mapPane', this._container);

		this.createPane('tilePane');
		this.createPane('shadowPane');
		this.createPane('overlayPane');
		this.createPane('markerPane');
		this.createPane('infowindowPane');

		if (!this.options.markerZoomAnimation) {
			sop.DomUtil.addClass(panes.markerPane, 'sop-zoom-hide');
			sop.DomUtil.addClass(panes.shadowPane, 'sop-zoom-hide');
		}
	},


	// private methods that modify map state

	/** @private */
	_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {

		var zoomChanged = (this._zoom !== zoom);

		if (!afterZoomAnim) {
			this.fire('movestart');

			if (zoomChanged) {
				this.fire('zoomstart');
			}
		}

		this._zoom = zoom;
		this._initialCenter = center;

		this._initialTopLeftPoint = this._getNewTopLeftPoint(center);

		if (!preserveMapOffset) {
			sop.DomUtil.setPosition(this._mapPane, new sop.Point(0, 0));
		} else {
			this._initialTopLeftPoint._add(this._getMapPanePos());
		}

		var loading = !this._loaded;
		this._loaded = true;

		this.fire('viewreset', {hard: !preserveMapOffset});

		if (loading) {
			this.fire('load');
		}

		this.fire('move');

		if (zoomChanged || afterZoomAnim) {
			this.fire('zoomend');
		}

		this.fire('moveend', {hard: !preserveMapOffset});
	},

	/** @private */
	_rawPanBy: function (offset) {
		sop.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},

	/** @private */
	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	/** @private */
	_panInsideMaxBounds: function () {
		this.panInsideBounds(this.options.maxBounds);
	},

	/** @private */
	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// map events

	/** @private */
	_initEvents: function (onOff) {
		if (!sop.DomEvent) {
			return;
		}

		onOff = onOff || 'on';

		sop.DomEvent[onOff](this._container,
			'click dblclick mousedown mouseup mouseenter mouseleave mousemove contextmenu',
			this._handleMouseEvent, this);

		if (this.options.trackResize) {
			sop.DomEvent[onOff](window, 'resize', this._onResize, this);
		}

		this.on('absclickstart', function () {
			this.absClick = true;
		});

		this.on('absclickend', function () {
			this.absClick = false;
		});
	},

	/** @private */
	_onResize: function () {
		sop.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = sop.Util.requestAnimFrame(
			function () {
				this.invalidateSize({debounceMoveend: true});
			}, this, false, this._container);
	},

	/** @private */
	_handleMouseEvent: function (e) {
		if (!this._loaded) {
			return;
		}

		this._fireMouseEvent(this, e,
				e.type === 'mouseenter' ? 'mouseover' :
					e.type === 'mouseleave' ? 'mouseout' : e.type);
	},

	/** @private */
	_fireMouseEvent: function (obj, e, type, propagate, utmk) {
		type = type || e.type;

		if (sop.DomEvent._skipped(e)) {
			return;
		}

		if (type === 'click') {
			if (!e._simulated && ((this.dragging && this.dragging.moved()) ||
				(this.boxZoom && this.boxZoom.moved()))) {
				return;
			}
			obj.fire('preclick');
		}

		if (!obj.listens(type, propagate)) {
			return;
		}


		if (type === 'contextmenu') {
			sop.DomEvent.preventDefault(e);
		}
		if (type === 'click' || type === 'dblclick' || type === 'contextmenu') {
			sop.DomEvent.stopPropagation(e);
		}

		var data = {
			originalEvent: e,
			containerPoint: this.mouseEventToContainerPoint(e)
		};

		data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
		data.utmk = utmk || this.layerPointToUTMK(data.layerPoint);
		//data.utmk = data.latlng;


		if (type === 'click') {
			if (this.absClick) {
				this.fire('click', data, propagate);
				return;
			}
		}

		obj.fire(type, data, propagate);
	},

	/** @private */
	_clearHandlers: function () {
		for (var i = 0, len = this._handlers.length; i < len; i++) {
			this._handlers[i].disable();
		}
	},

	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, {target: this});
		} else {
			this.on('load', callback, context);
		}
		return this;
	},


	// private methods for getting map state

	/** @private */
	_getMapPanePos: function () {
		return sop.DomUtil.getPosition(this._mapPane);
	},

	/** @private */
	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	/** @private */
	_getTopLeftPoint: function () {
		return this.getPixelOrigin().subtract(this._getMapPanePos());
	},

	/** @private */
	_getNewTopLeftPoint: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		// TODO round on display, not calculation to increase precision?
		return this.project(center, zoom)._subtract(viewHalf)._round();
	},

	/** @private */
	_utmkToNewLayerPoint: function (utmk, newZoom, newCenter) {
		var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
		return this.project(utmk, newZoom)._subtract(topLeft);
	},

	// layer point of the current center
	/** @private */
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	/** @private */
	_getCenterOffset: function (utmk) {
		return this.utmkToLayerPoint(utmk).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
	/** @private */
	_limitCenter: function (center, zoom, bounds) {

		if (!bounds) {
			return center;
		}

		var centerPoint = this.project(center, zoom),
			viewHalf = this.getSize().divideBy(2),
			viewBounds = new sop.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
			offset = this._getBoundsOffset(viewBounds, bounds, zoom);

		return this.unproject(centerPoint.add(offset), zoom);
	},

	// adjust offset for view to get inside bounds
	/** @private */
	_limitOffset: function (offset, bounds) {
		if (!bounds) {
			return offset;
		}

		var viewBounds = this.getPixelBounds(),
			newBounds = new sop.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	/** @private */
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
			seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),

			dx = this._rebound(nwOffset.x, -seOffset.x),
			dy = this._rebound(nwOffset.y, -seOffset.y);

		return new sop.Point(dx, dy);
	},

	/** @private */
	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	/** @private */
	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
			max = this.getMaxZoom();

		return Math.max(min, Math.min(max, zoom));
	}
});

sop.map = function (id, options) {
	return new sop.Map(id, options);
};



/**
 * 지도제공시스템 Layer
 * 생성자는 사용하지 않음.
 *
 * @class
 * @augments sop.Evented
 * @abstract
 */
sop.Layer = sop.Evented.extend(/** @lends sop.Layer.prototype */{

	/**
	 * sop.Layer 기본 옵션.
	 */
	options: {
		pane: 'overlayPane'
	},

	/**
	 * 파라미터로 전달받은 지도객체에 레이어를 추가 한다.
	 *
	 * @param {Object} map 지도객체
	 * @returns {sop.Layer}
	 */
	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	/**
	 * 해당레이어를 추가된 지도에서 제거 한다.
	 *
	 * @returns {sop.Layer}
	 */
	remove: function () {
		return this.removeFrom(this._map || this._mapToAdd);
	},

	/**
	 * 파라미터로 전달받은 지도 객체로 부터 해당 레이어를 제거 한다.
	 *
	 * @param {Object} obj 지도객체
	 * @returns {sop.Layer}
	 */
	removeFrom: function (obj) {
		if (obj) {
			obj.removeLayer(this);
		}
		return this;
	},

	getPane: function (name) {
		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
	},

	/** @private */
	_layerAdd: function (e) {
		var map = e.target;

		// check in case layer gets added and then removed before the map is ready
		if (!map.hasLayer(this)) { return; }

		this._map = map;
		this._zoomAnimated = map._zoomAnimated;

		this.onAdd(map);

		if (this.getAttribution && this._map.attributionControl) {
			this._map.attributionControl.addAttribution(this.getAttribution());
		}

		if (this.getEvents) {
			map.on(this.getEvents(), this);
		}

		this.fire('add');
		map.fire('layeradd', {layer: this});
	}
});


sop.Map.include({

	/**
	 * 지도객체에서 파라미터로 전달받은 레이어를 추가.
	 * @param {ILayer} layer 지도에 추가할 sop.Layer를 상속받은 객체.
	 * @returns {sop.Map}
	 *
	 * @instance
	 * @memberOf sop.Map.prototype
	 */
	addLayer: function (layer) {
		var id = sop.stamp(layer);
		if (this._layers[id]) { return layer; }
		this._layers[id] = layer;

		layer._mapToAdd = this;

		if (layer.beforeAdd) {
			layer.beforeAdd(this);
		}

		this.whenReady(layer._layerAdd, layer);

		return this;
	},

	/**
	 * 지도객체에서 파라미터로 전달 받은 레이어를 제거.
	 * @param {ILayer} layer
	 * @returns {sop.Map}
	 * @instance
	 * @memberOf sop.Map.prototype
	 */
	removeLayer: function (layer) {
		var id = sop.stamp(layer);

		if (!this._layers[id]) { return this; }

		if (this._loaded) {
			layer.onRemove(this);
		}

		if (layer.getAttribution && this.attributionControl) {
			this.attributionControl.removeAttribution(layer.getAttribution());
		}

		if (layer.getEvents) {
			this.off(layer.getEvents(), layer);
		}

		delete this._layers[id];

		if (this._loaded) {
			this.fire('layerremove', {layer: layer});
			layer.fire('remove');
		}

		layer._map = layer._mapToAdd = null;

		return this;
	},

	/**
	 * 지도객체에 파라미터로 전달받은 레이어가 있는지 확인.
	 *
	 * @param {ILayer} layer
	 * @returns {boolean}
	 * @instance
	 * @memberOf sop.Map.prototype
	 */
	hasLayer: function (layer) {
		return !!layer && (sop.stamp(layer) in this._layers);
	},

	/**
	 * 지도객체에 추가된 각각의 레이어를 파라미터로 전달받은 method 함수에 전달 한다.
	 *
	 * @param {Function} method
	 * @param {Object} [context]
	 * @returns {sop.Map}
	 * @instance
	 * @memberOf sop.Map.prototype
	 */
	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	/** @private */
	_addLayers: function (layers) {
		layers = layers ? (sop.Util.isArray(layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},

	/** @private */
	_addZoomLimit: function (layer) {
		if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
			this._zoomBoundLayers[sop.stamp(layer)] = layer;
			this._updateZoomLevels();
		}
	},

	/** @private */
	_removeZoomLimit: function (layer) {
		var id = sop.stamp(layer);

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}
	},

	/** @private */
	_updateZoomLevels: function () {
		var minZoom = Infinity,
			maxZoom = -Infinity,
			oldZoomSpan = this._getZoomSpan();

		for (var i in this._zoomBoundLayers) {
			var options = this._zoomBoundLayers[i].options;

			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
		}

		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

		if (oldZoomSpan !== this._getZoomSpan()) {
			this.fire('zoomlevelschange');
		}
	}
});


/**
 * SOP 지도제공시스템 GridLayer
 *
 * @class
 * @augments sop.Layer
 * @param {GridLayerOptions} options GridLayer Options
 */

sop.GridLayer = sop.Layer.extend(/** @lends sop.GridLayer.prototype */{

	/**
	 * GridLayer Options
	 */
	options: {
		pane: 'tilePane',

		tileSize: 256,
		opacity: 1,

		unloadInvisibleTiles: sop.Browser.mobile,
		updateWhenIdle: sop.Browser.mobile,
		updateInterval: 150

		/*
		minZoom: <Number>,
		maxZoom: <Number>,
		attribution: <String>,
		zIndex: <Number>,
		bounds: <UTMKBounds>
		*/
	},

	/**
	 * @private
	 * @param options
	 */
	initialize: function (options) {
		options = sop.setOptions(this, options);
	},

	/**
	 * 지도객체에 GridLayer가 추가 될 때 호출 됨.
	 * Dom Element 추가 코드 및 이벤트 추가 코드 작성에 사용된다.
	 */
	onAdd: function () {
		this._initContainer();

		if (!this.options.updateWhenIdle) {
			// update tiles on move, but not more often than once per given interval
			this._update = sop.Util.throttle(this._update, this.options.updateInterval, this);
		}

		this._reset();
		this._update();
	},

	/**
	 * GridLayer onAdd 함수가 호출 되기 전에 호출 됨.
	 * @param {Object} map
	 */
	beforeAdd: function (map) {
		map._addZoomLimit(this);
	},

	/**
	 * 지도객체에서 GridLyaer가 제거 될 때 호출 됨.
	 * @param {Object} map
	 */
	onRemove: function (map) {
		this._clearBgBuffer();
		sop.DomUtil.remove(this._container);

		map._removeZoomLimit(this);

		this._container = null;
	},

	/**
	 * 해당 레이어를 부모 Dom Element에서 첫번째 child로 설정 함.
	 * @returns {sop.GridLayer}
	 */
	bringToFront: function () {
		if (this._map) {
			sop.DomUtil.toFront(this._container);
			this._setAutoZIndex(Math.max);
		}
		return this;
	},

	/**
	 * 해당 레이어를 부모 Dom Element에서 첫번째 child 다음으로 설정 함.
	 * @returns {sop.GridLayer}
	 */
	bringToBack: function () {
		if (this._map) {
			sop.DomUtil.toBack(this._container);
			this._setAutoZIndex(Math.min);
		}
		return this;
	},

	/**
	 * @private
	 */
	getAttribution: function () {
		return this.options.attribution;
	},

	/**
	 * GridLayer에 해당 하는 Dom Element를 반환 한다.
	 * @returns {HTMLElement}
	 */
	getContainer: function () {
		return this._container;
	},

	/**
	 * GridLayer 두명도를 설정 한다.
	 * @param {Number} opacity 투명도 값
	 * @returns {sop.GridLayer}
	 */
	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._map) {
			this._updateOpacity();
		}
		return this;
	},

	/**
	 * GridLayer Dom Element zIndex를 설정 한다.
	 *
	 * @param {Number} zIndex
	 * @returns {sop.GridLayer}
	 */
	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	/**
	 * GridLayer를 다시 그린다.
	 * @returns {sop.GridLayer}
	 */
	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}
		return this;
	},

	/** @private */
	getEvents: function () {
		var events = {
			viewreset: this._reset,
			moveend: this._update
		};

		if (!this.options.updateWhenIdle) {
			events.move = this._update;
		}

		if (this._zoomAnimated) {
			events.zoomstart = this._startZoomAnim;
			events.zoomanim = this._animateZoom;
			events.zoomend = this._endZoomAnim;
		}

		return events;
	},

	/** @private */
	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

	/** @private */
	_setAutoZIndex: function (compare) {
		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

		var layers = this.getPane().children,
		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

			zIndex = layers[i].style.zIndex;

			if (layers[i] !== this._container && zIndex) {
				edgeZIndex = compare(edgeZIndex, +zIndex);
			}
		}

		if (isFinite(edgeZIndex)) {
			this.options.zIndex = edgeZIndex + compare(-1, 1);
			this._updateZIndex();
		}
	},

	/** @private */
	_updateOpacity: function () {
		var opacity = this.options.opacity;

		if (sop.Browser.ielt9) {
			// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
			for (var i in this._tiles) {
				sop.DomUtil.setOpacity(this._tiles[i], opacity);
			}
		} else {
			sop.DomUtil.setOpacity(this._container, opacity);
		}
	},

	/** @private */
	_initContainer: function () {
		if (this._container) { return; }

		this._container = sop.DomUtil.create('div', 'sop-layer');
		this._updateZIndex();

		if (this._zoomAnimated) {
			var className = 'sop-tile-container sop-zoom-animated';

			this._bgBuffer = sop.DomUtil.create('div', className, this._container);
			this._tileContainer = sop.DomUtil.create('div', className, this._container);

			sop.DomUtil.setTransform(this._tileContainer);

		} else {
			this._tileContainer = this._container;
		}

		if (this.options.opacity < 1) {
			this._updateOpacity();
		}

		this.getPane().appendChild(this._container);
	},

	/** @private */
	_reset: function (e) {
		for (var key in this._tiles) {
			this.fire('tileunload', {
				tile: this._tiles[key]
			});
		}

		this._tiles = {};
		this._tilesToLoad = 0;
		this._tilesTotal = 0;

		sop.DomUtil.empty(this._tileContainer);

		if (this._zoomAnimated && e && e.hard) {
			this._clearBgBuffer();
		}

		this._tileNumBounds = this._getTileNumBounds();
		this._resetWrap();
	},

	/** @private */
	_resetWrap: function () {
		var map = this._map,
		    crs = map.options.crs;

		if (crs.infinite) { return; }

		var tileSize = this._getTileSize();

		if (crs.wrapX) {
			this._wrapLng = [
				Math.floor(map.project([crs.wrapX[0], 0]).x / tileSize),
				Math.ceil(map.project([crs.wrapX[1], 0]).x / tileSize)
			];
		}

		if (crs.wrapY) {
			this._wrapLat = [
				Math.floor(map.project([0, crs.wrapY[0]]).y / tileSize),
				Math.ceil(map.project([0, crs.wrapY[1]]).y / tileSize)
			];
		}
	},

	/** @private */
	_getTileSize: function () {
		return this.options.tileSize;
	},

	/** @private */
	_update: function () {

		if (!this._map) { return; }

		var bounds = this._map.getPixelBounds(),
		    zoom = this._map.getZoom(),
		    tileSize = this._getTileSize();

		if (zoom > this.options.maxZoom ||
		    zoom < this.options.minZoom) { return; }

		// tile coordinates range for the current view
		var tileBounds = sop.bounds(
			bounds.min.divideBy(tileSize).floor(),
			bounds.max.divideBy(tileSize).floor());

		this._addTiles(tileBounds);

		if (this.options.unloadInvisibleTiles) {
			this._removeOtherTiles(tileBounds);
		}
	},

	/** @private */
	_addTiles: function (bounds) {
		var queue = [],
		    center = bounds.getCenter(),
		    zoom = this._map.getZoom();

		var j, i, coords;

		// create a queue of coordinates to load tiles from
		for (j = bounds.min.y; j <= bounds.max.y; j++) {
			for (i = bounds.min.x; i <= bounds.max.x; i++) {

				coords = new sop.Point(i, j);
				coords.z = zoom;

				// add tile to queue if it's not in cache or out of bounds
				if (!(this._tileCoordsToKey(coords) in this._tiles) && this._isValidTile(coords)) {
					queue.push(coords);
				}
			}
		}

		var tilesToLoad = queue.length;

		if (tilesToLoad === 0) { return; }

		// if its the first batch of tiles to load
		if (!this._tilesToLoad) {
			this.fire('loading');
		}

		this._tilesToLoad += tilesToLoad;
		this._tilesTotal += tilesToLoad;

		// sort tile queue to load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(center) - b.distanceTo(center);
		});

		// create DOM fragment to append tiles in one batch
		var fragment = document.createDocumentFragment();

		for (i = 0; i < tilesToLoad; i++) {
			this._addTile(queue[i], fragment);
		}

		this._tileContainer.appendChild(fragment);
	},

	/** @private */
	_isValidTile: function (coords) {
		var crs = this._map.options.crs;

		if (!crs.infinite) {
			// don't load tile if it's out of bounds and not wrapped
			var bounds = this._tileNumBounds;
			if ((!crs.wrapX && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
			    (!crs.wrapY && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
		}

		if (!this.options.bounds) { return true; }

		// don't load tile if it doesn't intersect the bounds in options
		var tileBounds = this._tileCoordsToBounds(coords);
		return sop.utmkBounds(this.options.bounds).intersects(tileBounds);
	},

	// converts tile coordinates to its geographical bounds
	/** @private */
	_tileCoordsToBounds: function (coords) {

		var map = this._map,
			tileSize = this._getTileSize(),

		    nwPoint = coords.multiplyBy(tileSize),
		    sePoint = nwPoint.add([tileSize, tileSize]),

		    nw = map.wrapUTMK(map.unproject(nwPoint, coords.z)),
		    se = map.wrapUTMK(map.unproject(sePoint, coords.z));

		return new sop.UTMKBounds(nw, se);
	},

	// converts tile coordinates to key for the tile cache
	/** @private */
	_tileCoordsToKey: function (coords) {
		return coords.x + ':' + coords.y;
	},

	// converts tile cache key to coordinates
	/** @private */
	_keyToTileCoords: function (key) {
		var kArr = key.split(':'),
		    x = parseInt(kArr[0], 10),
		    y = parseInt(kArr[1], 10);

		return new sop.Point(x, y);
	},

	// remove any present tiles that are off the specified bounds
	/** @private */
	_removeOtherTiles: function (bounds) {
		for (var key in this._tiles) {
			if (!bounds.contains(this._keyToTileCoords(key))) {
				this._removeTile(key);
			}
		}
	},

	/** @private */
	_removeTile: function (key) {
		var tile = this._tiles[key];

		sop.DomUtil.remove(tile);

		delete this._tiles[key];

		this.fire('tileunload', {tile: tile});
	},

	/** @private */
	_initTile: function (tile) {
		var size = this._getTileSize();

		sop.DomUtil.addClass(tile, 'sop-tile');

		tile.style.width = size + 'px';
		tile.style.height = size + 'px';

		tile.onselectstart = sop.Util.falseFn;
		tile.onmousemove = sop.Util.falseFn;

		// update opacity on tiles in IE7-8 because of filter inheritance problems
		if (sop.Browser.ielt9 && this.options.opacity < 1) {
			sop.DomUtil.setOpacity(tile, this.options.opacity);
		}

		// without this hack, tiles disappear after zoom on Chrome for Android
		// https://github.com/Leaflet/Leaflet/issues/2078
		if (sop.Browser.android && !sop.Browser.android23) {
			tile.style.WebkitBackfaceVisibility = 'hidden';
		}
	},

	/** @private */
	_addTile: function (coords, container) {
		var tilePos = this._getTilePos(coords);

		// wrap tile coords if necessary (depending on CRS)
		this._wrapCoords(coords);

		var tile = this.createTile(coords, sop.bind(this._tileReady, this));

		this._initTile(tile);

		// if createTile is defined with a second argument ("done" callback),
		// we know that tile is async and will be ready later; otherwise
		if (this.createTile.length < 2) {
			// mark tile as ready, but delay one frame for opacity animation to happen
			setTimeout(sop.bind(this._tileReady, this, null, tile), 0);
		}

		// we prefer top/left over translate3d so that we don't create a HW-accelerated layer from each tile
		// which is slow, and it also fixes gaps between tiles in Safari
		sop.DomUtil.setPosition(tile, tilePos, true);

		// save tile in cache
		this._tiles[this._tileCoordsToKey(coords)] = tile;

		container.appendChild(tile);
		this.fire('tileloadstart', {tile: tile});
	},

	/** @private */
	_tileReady: function (err, tile) {
		if (err) {
			this.fire('tileerror', {
				error: err,
				tile: tile
			});
		}

		sop.DomUtil.addClass(tile, 'sop-tile-loaded');

		this.fire('tileload', {tile: tile});

		this._tilesToLoad--;

		if (this._tilesToLoad === 0) {
			this._visibleTilesReady();
		}
	},

	/** @private */
	_visibleTilesReady: function () {
		this.fire('load');

		if (this._zoomAnimated) {
			// clear scaled tiles after all new tiles are loaded (for performance)
			clearTimeout(this._clearBgBufferTimer);
			this._clearBgBufferTimer = setTimeout(sop.bind(this._clearBgBuffer, this), 300);
		}
	},

	/** @private */
	_getTilePos: function (coords) {
		return coords
				.multiplyBy(this._getTileSize())
				.subtract(this._map.getPixelOrigin());
	},

	/** @private */
	_wrapCoords: function (coords) {
		coords.x = this._wrapLng ? sop.Util.wrapNum(coords.x, this._wrapLng) : coords.x;
		coords.y = this._wrapLat ? sop.Util.wrapNum(coords.y, this._wrapLat) : coords.y;
	},

	// get the global tile coordinates range for the current zoom
	/** @private */
	_getTileNumBounds: function () {
		var bounds = this._map.getPixelWorldBounds(),
			size = this._getTileSize();

		return bounds ? sop.bounds(
				bounds.min.divideBy(size).floor(),
				bounds.max.divideBy(size).ceil().subtract([1, 1])) : null;
	},

	/** @private */
	_startZoomAnim: function () {
		this._prepareBgBuffer();
		this._prevTranslate = this._translate || new sop.Point(0, 0);
		this._prevScale = this._scale;
	},

	/** @private */
	_animateZoom: function (e) {
		// avoid stacking transforms by calculating cumulating translate/scale sequence
		this._translate = this._prevTranslate.multiplyBy(e.scale).add(e.origin.multiplyBy(1 - e.scale));
		this._scale = this._prevScale * e.scale;

		sop.DomUtil.setTransform(this._bgBuffer, this._translate, this._scale);
	},

	/** @private */
	_endZoomAnim: function () {
		var front = this._tileContainer;
		front.style.visibility = '';
		sop.DomUtil.toFront(front); // bring to front
	},

	/** @private */
	_clearBgBuffer: function () {
		var map = this._map,
			bg = this._bgBuffer;

		if (map && !map._animatingZoom && !map.touchZoom._zooming && bg) {
			sop.DomUtil.empty(bg);
			sop.DomUtil.setTransform(bg);
		}
	},

	/** @private */
	_prepareBgBuffer: function () {

		var front = this._tileContainer,
		    bg = this._bgBuffer;

		if (this._abortLoading) {
			this._abortLoading();
		}

		if (this._tilesToLoad / this._tilesTotal > 0.5) {
			// if foreground layer doesn't have many tiles loaded,
			// keep the existing bg layer and just zoom it some more
			front.style.visibility = 'hidden';
			return;
		}

		// prepare the buffer to become the front tile pane
		bg.style.visibility = 'hidden';
		sop.DomUtil.setTransform(bg);

		// switch out the current layer to be the new bg layer (and vice-versa)
		this._tileContainer = bg;
		this._bgBuffer = front;

		// reset bg layer transform info
		this._translate = new sop.Point(0, 0);
		this._scale = 1;

		// prevent bg buffer from clearing right after zoom
		clearTimeout(this._clearBgBufferTimer);
	}
});

sop.gridLayer = function (options) {
	return new sop.GridLayer(options);
};


/*
 * sop.TileLayer is used for standard xyz-numbered tile layers.
 */
/**
 * sop.TileLayer
 * SOP 지도제공시스템 타일레이어.
 *
 * @class
 * @augments sop.GridLayer
 * @param {String} url - 타일URL
 * @param {Object} [options] - 타일레이어옵션
 */
sop.TileLayer = sop.GridLayer.extend(/** @lends sop.TileLayer.prototype */{

	options: {
		minZoom: 0,
		maxZoom: 18,

		subdomains: 'abc',
		// errorTileUrl: '',
		zoomOffset: 0

		/*
		maxNativeZoom: <Number>,
		tms: <Boolean>,
		zoomReverse: <Number>,
		detectRetina: <Boolean>,
		crossOrigin: <Boolean>,
		*/
	},

	/**
	 * 타일레이어 초기화 함수.
	 *
	 * @param {String} url - 타일URL
	 * @param {Object} [options] - 타일레이어옵션
	 * @private
	 */
	initialize: function (url, options) {

		this._url = url;

		options = sop.setOptions(this, options);

		// detecting retina displays, adjusting tileSize and zoom levels
		if (options.detectRetina && sop.Browser.retina && options.maxZoom > 0) {

			options.tileSize = Math.floor(options.tileSize / 2);
			options.zoomOffset++;

			options.minZoom = Math.max(0, options.minZoom);
			options.maxZoom--;
		}

		if (typeof options.subdomains === 'string') {
			options.subdomains = options.subdomains.split('');
		}
	},

	/**
	 * 타일레이어 URL을 설정.
	 *
	 * @param {String} url
	 * @param {Boolean} noRedraw
	 * @returns {sop.TileLayer}
	 */
	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}
		return this;
	},

	/**
	 * 타일 생성시 호출 된다.
	 * 새로운 타일레이어 구성시 sop.TileLayer 를 상속 받은 후
	 * 해당 함수를 재정의 할 수 있다.
	 *
	 * @param {UTMK} coords
	 * @param done
	 * @returns {HTMLElement}
	 * @private
	 */
	createTile: function (coords, done) {
		var tile = document.createElement('img');

		tile.onload = sop.bind(this._tileOnLoad, this, done, tile);
		tile.onerror = sop.bind(this._tileOnError, this, done, tile);
		
		if (this.options.crossOrigin) {
			tile.crossOrigin = '';
		}
		
		/*
		 Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
		 http://www.w3.org/TR/WCAG20-TECHS/H67
		*/
		tile.alt = '';

		tile.src = this.getTileUrl(coords);

		return tile;
	},

	/**
	 *
	 * @param {UTMK} coords
	 * @returns {String}
	 * @private
	 */
	getTileUrl: function (coords) {
		return sop.Util.template(this._url, sop.extend({
			r: this.options.detectRetina && sop.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
			s: this._getSubdomain(coords),
			x: coords.x,
			y: this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y,
			z: this._getZoomForUrl()
		}, this.options));
	},

	/** @private */
	_tileOnLoad: function (done, tile) {
		done(null, tile);
	},

	/** @private */
	_tileOnError: function (done, tile, e) {
		var errorUrl = this.options.errorTileUrl;
		if (errorUrl) {
			tile.src = errorUrl;
		}
		done(e, tile);
	},

	/** @private */
	_getTileSize: function () {
		var map = this._map,
		    options = this.options,
		    zoom = map.getZoom() + options.zoomOffset,
		    zoomN = options.maxNativeZoom;

		// increase tile size when overscaling
		return zoomN && zoom > zoomN ?
				Math.round(map.getZoomScale(zoom) / map.getZoomScale(zoomN) * options.tileSize) :
				options.tileSize;
	},

	/** @private */
	_removeTile: function (key) {
		var tile = this._tiles[key];

		sop.GridLayer.prototype._removeTile.call(this, key);

		// for https://github.com/Leaflet/Leaflet/issues/137
		if (!sop.Browser.android) {
			tile.onload = null;
			tile.src = sop.Util.emptyImageUrl;
		}
	},

	/** @private */
	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;

		return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
	},

	/** @private */
	_getSubdomain: function (tilePoint) {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	// stops loading all tiles in the background layer
	/** @private */
	_abortLoading: function () {
		var i, tile;
		for (i in this._tiles) {
			tile = this._tiles[i];

			if (!tile.complete) {
				tile.onload = sop.Util.falseFn;
				tile.onerror = sop.Util.falseFn;
				tile.src = sop.Util.emptyImageUrl;

				sop.DomUtil.remove(tile);
			}
		}
	}
});

sop.tileLayer = function (url, options) {
	return new sop.TileLayer(url, options);
};


/**
 * 통계타일레이어 정의.
 *
 * @class
 * @augments sop.TileLayer
 * @param {String} url 타일 URL
 * @param {Object} options TileLayer Options
 */
sop.StatisticTileLayer = sop.TileLayer.extend(/** @lends sop.StatisticTileLayer.prototype */{

	options : {
		url : 'https://sgisapi.kostat.go.kr/tiles/bmap/l{z}/{y}/{x}.png',
		maxZoom: 13,
		minZoom: 0,
		zoomReverse: false,
		continuousWorld: false,
		tms: false
	},

	/**
	 *
	 * @param {String} url 타일 URL
	 * @param {Object} options TileLayer Options
	 * @private
	 */
	initialize: function (url, options) {
		if (typeof url === 'string' || typeof options === 'object') {
			this.options.url = url;
			sop.setOptions(this, options);
		}

		sop.TileLayer.prototype.initialize.call(this, this.options.url, this.options);
	},

	/**
	 * 파라미터로 전달 받은 좌표 UTMK에 해당하는 타일 URL을 구성 한다.
	 * @param {UTMK} coords
	 * @returns {String}
	 */
	getTileUrl: function (coords) {
		var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;

		return sop.Util.template(this._url, sop.extend({
			r: this.options.detectRetina && sop.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
			s: this._getSubdomain(coords),
			x: 'c' + this.fillZero(coords.x.toString(16), 8),
			y: 'r' + this.fillZero(y.toString(16), 8),
			z: this.fillZero(this._getZoomForUrl().toString(10), 2)
		}, this.options));
	},

	/**
	 *
	 * @param {String} strB 16진수 String
	 * @param {Number} strLen 길이
	 * @returns {string} 0을 채운 16진수 String
	 */
	fillZero: function (strB, strLen) {
		return '00000000'.substr(0, strLen - (strB + '').length) + strB;
	}
});

sop.Map.mergeOptions({
	statisticTileLayer: true
});

sop.Map.addInitHook(function () {
	if (this.options.statisticTileLayer) {
		sop.Map.mergeOptions({
			crs: sop.CRS.UTMK,
			maxBounds: sop.CRS.UTMK.projection.utmkBounds
		});
		this.statisticTileLayer = new sop.StatisticTileLayer().addTo(this);
	}
});

/**
 * Created by htkim on 2014-11-05.
 */
sop.BuildingLayer = sop.GridLayer.extend({
	options: {
		minZoom: 0,
		maxZoom: 13
	},

	initialize: function (options) {
		options = sop.setOptions(this, options);
	},

	/**
	 * 배경으로 사용할 빌딩 타일 div 를 구성한다.
	 * @param coords
	 * @returns {HTMLElement}
	 */
	createTile: function (utmk) {
		var tile = document.createElement('div');
//		tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');
//		tile.style.outline = '1px solid green';
		tile.style.background = 'white';
		return tile;
	}
});

sop.Map.mergeOptions({
	buildingLayer: false
});

sop.Map.addInitHook(function () {
	if (this.options.buildingLayer) {
		sop.Map.mergeOptions({
			crs: sop.CRS.UTMK,
			maxBounds: sop.CRS.UTMK.projection.utmkBounds
		});
		this.buildingLayer = new sop.BuildingLayer().addTo(this);
	}
});

/**
 * sop.TileLayer.WMS
 * sop 지도제공시스템에서 WMS URL구성 및 타일을 불러온다 .
 *
 * @class
 * @augments sop.TileLayer
 *
 */
sop.TileLayer.WMS = sop.TileLayer.extend({

	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.1.1',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},

	initialize: function (url, options) {

		this._url = url;

		var wmsParams = sop.extend({}, this.defaultWmsParams);

		// all keys that are not TileLayer options go to WMS params
		for (var i in options) {
			if (!this.options.hasOwnProperty(i) && i !== 'crs') {
				wmsParams[i] = options[i];
			}
		}

		options = sop.setOptions(this, options);

		wmsParams.width = wmsParams.height =
				options.tileSize * (options.detectRetina && sop.Browser.retina ? 2 : 1);

		this.wmsParams = wmsParams;
	},

	onAdd: function (map) {

		this._crs = this.options.crs || map.options.crs;

		this._wmsVersion = parseFloat(this.wmsParams.version);

		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';

		if (sop.Util.typeOf(this._crs) === 'string') {
			this.wmsParams[projectionKey] = this._crs;
			this._crs = map.options.crs;
		} else {
			this.wmsParams[projectionKey] = this._crs.code;
		}

		sop.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (coords) {

		var tileBounds = this._tileCoordsToBounds(coords),
		    nw = this._crs.project(tileBounds.getNorthWest()),
		    se = this._crs.project(tileBounds.getSouthEast()),

		    bbox = (this._wmsVersion >= 1.3 && this._crs === sop.CRS.EPSG4326 ?
			    [se.y, nw.x, nw.y, se.x] :
			    [nw.x, se.y, se.x, nw.y]).join(','),

			url = sop.TileLayer.prototype.getTileUrl.call(this, coords);

		return url + sop.Util.getParamString(this.wmsParams, url, true) + '&BBOX=' + bbox;
	},

	setParams: function (params, noRedraw) {

		sop.extend(this.wmsParams, params);

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	}
});

sop.tileLayer.wms = function (url, options) {
	return new sop.TileLayer.WMS(url, options);
};


/*
 * sop.ImageOverlay is used to overlay images over the map (to specific geographical bounds).
 */

sop.ImageOverlay = sop.Layer.extend({

	options: {
		opacity: 1,
		alt: ''
	},

	initialize: function (url, bounds, options) { // (String, UTMKBounds, Object)
		this._url = url;
		this._bounds = sop.utmkBounds(bounds);

		sop.setOptions(this, options);
	},

	onAdd: function () {
		if (!this._image) {
			this._initImage();

			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
		}

		this.getPane().appendChild(this._image);

		this._reset();
	},

	onRemove: function () {
		sop.DomUtil.remove(this._image);
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._image) {
			this._updateOpacity();
		}
		return this;
	},

	bringToFront: function () {
		if (this._map) {
			sop.DomUtil.toFront(this._image);
		}
		return this;
	},

	bringToBack: function () {
		if (this._map) {
			sop.DomUtil.toBack(this._image);
		}
		return this;
	},

	setUrl: function (url) {
		this._url = url;

		if (this._image) {
			this._image.src = url;
		}
		return this;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	getEvents: function () {
		var events = {
			viewreset: this._reset
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},

	_initImage: function () {
		var img = this._image = sop.DomUtil.create('img',
				'sop-image-layer ' + (this._zoomAnimated ? 'sop-zoom-animated' : ''));

		img.onselectstart = sop.Util.falseFn;
		img.onmousemove = sop.Util.falseFn;

		img.onload = sop.bind(this.fire, this, 'load');
		img.src = this._url;
		img.alt = this.options.alt;
	},

	_animateZoom: function (e) {
		var topLeft = this._map._utmkToNewLayerPoint(this._bounds.getNorthWest(), e.zoom, e.center),
		    size = this._map._utmkToNewLayerPoint(this._bounds.getSouthEast(), e.zoom, e.center).subtract(topLeft),
		    offset = topLeft.add(size._multiplyBy((1 - 1 / e.scale) / 2));

		sop.DomUtil.setTransform(this._image, offset, e.scale);
	},

	_reset: function () {
		var image = this._image,
		    bounds = new sop.Bounds(
		        this._map.utmkToLayerPoint(this._bounds.getNorthWest()),
		        this._map.utmkToLayerPoint(this._bounds.getSouthEast())),
		    size = bounds.getSize();

		sop.DomUtil.setPosition(image, bounds.min);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	},

	_updateOpacity: function () {
		sop.DomUtil.setOpacity(this._image, this.options.opacity);
	}
});

sop.imageOverlay = function (url, bounds, options) {
	return new sop.ImageOverlay(url, bounds, options);
};


/*
 * sop.Icon is an image-based icon class that you can use with sop.Marker for custom markers.
 */

sop.Icon = sop.Class.extend({
	/*
	options: {
		iconUrl: (String) (required)
		iconRetinaUrl: (String) (optional, used for retina devices if detected)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
		infoWindowAnchor: (Point) (if not specified, infoWindow opens in the anchor point)
		shadowUrl: (String) (no shadow by default)
		shadowRetinaUrl: (String) (optional, used for retina devices if detected)
		shadowSize: (Point)
		shadowAnchor: (Point)
		className: (String)
	},
	*/

	initialize: function (options) {
		sop.setOptions(this, options);
	},

	createIcon: function (oldIcon) {
		return this._createIcon('icon', oldIcon);
	},

	createShadow: function (oldIcon) {
		return this._createIcon('shadow', oldIcon);
	},

	_createIcon: function (name, oldIcon) {
		var src = this._getIconUrl(name);

		if (!src) {
			if (name === 'icon') {
				throw new Error('iconUrl not set in Icon options (see the docs).');
			}
			return null;
		}

		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
		this._setIconStyles(img, name);

		return img;
	},

	_setIconStyles: function (img, name) {
		var options = this.options,
		    size = sop.point(options[name + 'Size']),
		    anchor = sop.point(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
		            size && size.divideBy(2, true));

		img.className = 'sop-marker-' + name + ' ' + (options.className || '');

		if (anchor) {
			img.style.marginLeft = (-anchor.x) + 'px';
			img.style.marginTop  = (-anchor.y) + 'px';
		}

		if (size) {
			img.style.width  = size.x + 'px';
			img.style.height = size.y + 'px';
		}
	},

	_createImg: function (src, el) {
		//Defult IconURL 또는 option iconURL 갖고온다.
		el = el || document.createElement('img');
		el.src = src;
		return el;
	},

	_getIconUrl: function (name) {
		return sop.Browser.retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
	}
});

sop.icon = function (options) {
	return new sop.Icon(options);
};


/*
 * sop.Icon.Default is the blue marker icon used by default in sop.
 */

sop.Icon.Default = sop.Icon.extend({

	options: {
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		infoWindowAnchor: [1, -34],
		shadowSize:  [41, 41]
//		iconUrl: 'http://sgisapi.kostat.go.kr:443/images/marker-icon.png',
//		iconRetinaUrl: 'http://sgisapi.kostat.go.kr:443/images/marker-icon-2x.png',
//		shadowUrl: 'http://sgisapi.kostat.go.kr:443/images/marker-shadow.png',
//		shadowRetinaUrl: 'http://sgisapi.kostat.go.kr:443/images/marker-shadow.png'
	},

	_getIconUrl: function (name) {
		var key = name + 'Url';

		if (this.options[key]) {
			return this.options[key];
		}

		var path = sop.Const.IMAGE_PATH;

		if (!path) {
			throw new Error('Couldn\'t autodetect sop.Const.imagePath, set it manually.');
		}

		return path + '/marker-' + name + (sop.Browser.retina && name === 'icon' ? '-2x' : '') + '.png';
	}
});




/*
 * sop.Marker is used to display clickable/draggable icons on the map.
 */

sop.Marker = sop.Layer.extend({

	options: {
		pane: 'markerPane',

		icon: new sop.Icon.Default(),
		// title: '',
		// alt: '',
		clickable: true,
		// draggable: false,
		keyboard: true,
		zIndexOffset: 0,
		opacity: 1,
		// riseOnHover: false,
		riseOffset: 250
	},

	initialize: function (utmk, options) {
		sop.setOptions(this, options);
		this._utmk = sop.utmk(utmk);
	},

	//Layer.js _laterAdd()에서 호출되어 MarkerIcon 설정및 위치를 Update한다.
	onAdd: function (map) {
		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

		this._initIcon();
		this.update();
	},

	onRemove: function () {
		if (this.dragging) {
			this.dragging.disable();
		}

		this._removeIcon();
		this._removeShadow();
		this.removeCaption();
	},

	getEvents: function () {
		var events = {viewreset: this.update};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},

	getUTMK: function () {
		return this._utmk;
	},

	setUTMK: function (utmk) {
		var oldUtmk = this._utmk;
		this._utmk = sop.utmk(utmk);
		this.update();
		return this.fire('move', { oldUtmk: oldUtmk, utmk: this._utmk });
	},

	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		return this.update();
	},

	setIcon: function (icon) {

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this.update();
		}

		if (this._infoWindow) {
			this.bindInfoWindow(this._infoWindow);
		}

		return this;
	},

	update: function () {
		if (this._icon) {
			//Marker의 utmk 좌표를 Point로 변환하여 Map에 Set 한다.
			var pos = this._map.utmkToLayerPoint(this._utmk).round();
			this._setPos(pos);
		}
		//caption
		this._updateCaptionPos();
		return this;
	},

	_initIcon: function () {
		var options = this.options,
			classToAdd = 'sop-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

		//icon 객체를 이용해서 Marker Image Path 설정한다.
		var icon = options.icon.createIcon(this._icon),
			addIcon = false;

		// if we're not reusing the icon, remove the old one and init new one
		if (icon !== this._icon) {
			if (this._icon) {
				this._removeIcon();
			}
			addIcon = true;

			if (options.title) {
				icon.title = options.title;
			}
			if (options.alt) {
				icon.alt = options.alt;
			}
		}

		sop.DomUtil.addClass(icon, classToAdd);

		if (options.keyboard) {
			icon.tabIndex = '0';
		}

		this._icon = icon;
		this._initInteraction();

		if (options.riseOnHover) {
			sop.DomEvent.on(icon, {
				mouseover: this._bringToFront,
				mouseout: this._resetZIndex
			}, this);
		}

		var newShadow = options.icon.createShadow(this._shadow),
			addShadow = false;

		if (newShadow !== this._shadow) {
			this._removeShadow();
			addShadow = true;
		}

		if (newShadow) {
			sop.DomUtil.addClass(newShadow, classToAdd);
		}
		this._shadow = newShadow;


		if (options.opacity < 1) {
			this._updateOpacity();
		}


		if (addIcon) {
			this.getPane().appendChild(this._icon);
		}
		if (newShadow && addShadow) {
			this.getPane('shadowPane').appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		if (this.options.riseOnHover) {
			sop.DomEvent.off(this._icon, {
				mouseover: this._bringToFront,
				mouseout: this._resetZIndex
			}, this);
		}

		sop.DomUtil.remove(this._icon);

		this._icon = null;
	},

	_removeShadow: function () {
		if (this._shadow) {
			sop.DomUtil.remove(this._shadow);
		}
		this._shadow = null;
	},

	_setPos: function (pos) {
		sop.DomUtil.setPosition(this._icon, pos);

		if (this._shadow) {
			sop.DomUtil.setPosition(this._shadow, pos);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	},

	_updateZIndex: function (offset) {
		this._icon.style.zIndex = this._zIndex + offset;
	},

	_animateZoom: function (opt) {
		var pos = this._map._utmkToNewLayerPoint(this._utmk, opt.zoom, opt.center).round();
		this._setPos(pos);

		//caption
		this._updateCaptionPos(opt);
	},

	_initInteraction: function () {

		if (!this.options.clickable) {
			return;
		}

		sop.DomUtil.addClass(this._icon, 'sop-clickable');

		//Marker 객체에 등록시킬 event 설정(_fireMouseEvent)
		sop.DomEvent.on(this._icon, 'click dblclick mousedown mouseup mouseover mouseout contextmenu keypress',
			this._fireMouseEvent, this);

		if (sop.Handler.MarkerDrag) {
			this.dragging = new sop.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_fireMouseEvent: function (e, type) {
		// to prevent outline when clicking on keyboard-focusable marker
		if (e.type === 'mousedown') {
			sop.DomEvent.preventDefault(e);
		}

		if (e.type === 'click' && this.dragging && this.dragging.moved()) {
			return;
		}

		if (e.type === 'keypress' && e.keyCode === 13) {
			type = 'click';
		}

		if (this._map) {
			this._map._fireMouseEvent(this, e, type, true, this._utmk);
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	_updateOpacity: function () {
		var opacity = this.options.opacity;

		sop.DomUtil.setOpacity(this._icon, opacity);

		if (this._shadow) {
			sop.DomUtil.setOpacity(this._shadow, opacity);
		}
	},

	_bringToFront: function () {
		this._updateZIndex(this.options.riseOffset);
	},

	_resetZIndex: function () {
		this._updateZIndex(0);
	},

	/* Caption 추가 */
	setCaption: function (captionOptions) {
		this.captionObj = new sop.Caption(this, this._utmk, captionOptions);
	},

	_updateCaptionPos: function (e) {
		if (this.captionObj) {
			this.captionObj._updateCaptionPos(this._utmk, e);
		}
	},

	getCaption: function () {
		return this.captionObj._getCaption();
	},

	removeCaption: function () {
		if (this.captionObj) {
			this.captionObj._removeCaption();
			this._catpionObj = null;
		}
	}

});

sop.marker = function (utmk, options) {
	return new sop.Marker(utmk, options);
};


/*
 * sop.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based sop.Icon)
 * to use with sop.Marker.
 */

sop.DivIcon = sop.Icon.extend({
	options: {
		iconSize: [12, 12], // also can be set through CSS
		/*
		iconAnchor: (Point)
		infoWindowAnchor: (Point)
		html: (String)
		bgPos: (Point)
		*/
		className: 'sop-div-icon',
		html: false
	},

	createIcon: function (oldIcon) {
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
		    options = this.options;

		div.innerHTML = options.html !== false ? options.html : '';

		if (options.bgPos) {
			div.style.backgroundPosition = (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
		}
		this._setIconStyles(div, 'icon');

		return div;
	},

	createShadow: function () {
		return null;
	}
});

sop.divIcon = function (options) {
	return new sop.DivIcon(options);
};


/**
 * sop.InfoWindow
 * 지도에 인포윈도우 표출에 사용 된다.
 *
 */

sop.Map.mergeOptions({
	closeInfoWindowOnClick: true
});

sop.InfoWindow = sop.Layer.extend({

	options: {
		pane: 'infowindowPane',

		minWidth: 50,
		maxWidth: 300,
		// maxHeight: <Number>,
		offset: [0, 7],

		autoPan: true,
		autoPanPadding: [5, 5],
		// autoPanPaddingTopLeft: <Point>,
		// autoPanPaddingBottomRight: <Point>,

		closeButton: true,
		// keepInView: false,
		// className: '',
		zoomAnimation: true
	},

	initialize: function (options, source) {
		sop.setOptions(this, options);

		this._source = source;
	},

	onAdd: function (map) {
		this._zoomAnimated = this._zoomAnimated && this.options.zoomAnimation;

		if (!this._container) {
			this._initLayout();
		}

		if (map._fadeAnimated) {
			sop.DomUtil.setOpacity(this._container, 0);
		}

		clearTimeout(this._removeTimeout);
		this.getPane().appendChild(this._container);
		this.update();

		if (map._fadeAnimated) {
			sop.DomUtil.setOpacity(this._container, 1);
		}

		map.fire('infowindowopen', {infoWindow: this});

		if (this._source) {
			this._source.fire('infowindowopen', {infoWindow: this}, true);
		}
	},

	openOn: function (map) {
		map.openInfoWindow(this);
		return this;
	},

	onRemove: function (map) {
		if (map._fadeAnimated) {
			sop.DomUtil.setOpacity(this._container, 0);
			this._removeTimeout = setTimeout(sop.bind(sop.DomUtil.remove, sop.DomUtil, this._container), 200);
		} else {
			sop.DomUtil.remove(this._container);
		}

		map.fire('infowindowclose', {infoWindow: this});

		if (this._source) {
			this._source.fire('infowindowclose', {infoWindow: this}, true);
		}
	},

	getUTMK: function () {
		return this._utmk;
	},

	setUTMK: function (utmk) {
		this._utmk = sop.utmk(utmk);
		if (this._map) {
			this._updatePosition();
			this._adjustPan();
		}
		return this;
	},

	getContent: function () {
		return this._content;
	},

	setContent: function (content) {
		this._content = content;
		this.update();
		return this;
	},

	update: function () {
		//bindInfoWindow()에서 호출했었을시 바로 return 시킨다.
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	getEvents: function () {
		var events = {viewreset: this._updatePosition},
		    options = this.options;

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}
		if ('closeOnClick' in options ? options.closeOnClick : this._map.options.closeInfoWindowOnClick) {
			events.preclick = this._close;
		}
		if (options.keepInView) {
			events.moveend = this._adjustPan;
		}
		return events;
	},
	
	isOpen: function () {
		return !!this._map && this._map.hasLayer(this);
	},

	_close: function () {
		if (this._map) {
			this._map.closeInfoWindow(this);
		}
	},

	_initLayout: function () {
		var prefix = 'sop-infowindow',
		    container = this._container = sop.DomUtil.create('div',
			prefix + ' ' + (this.options.className || '') +
			' sop-zoom-' + (this._zoomAnimated ? 'animated' : 'hide'));

		if (this.options.closeButton) {
			var closeButton = this._closeButton = sop.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';

			sop.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper = sop.DomUtil.create('div', prefix + '-content-wrapper', container);
		this._contentNode = sop.DomUtil.create('div', prefix + '-content', wrapper);

		sop.DomEvent
			.disableClickPropagation(wrapper)
			.disableScrollPropagation(this._contentNode)
			.on(wrapper, 'contextmenu', sop.DomEvent.stopPropagation);

		this._tipContainer = sop.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = sop.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	},

	_updateContent: function () {
		if (!this._content) { return; }

		var node = this._contentNode;

		if (typeof this._content === 'string') {
			node.innerHTML = this._content;
		} else {
			while (node.hasChildNodes()) {
				node.removeChild(node.firstChild);
			}
			node.appendChild(this._content);
		}
		this.fire('contentupdate');
	},

	_updateLayout: function () {
		var container = this._contentNode,
		    style = container.style;

		style.width = '';
		style.whiteSpace = 'nowrap';

		var width = container.offsetWidth;
		width = Math.min(width, this.options.maxWidth);
		width = Math.max(width, this.options.minWidth);

		style.width = (width + 1) + 'px';
		style.whiteSpace = '';

		style.height = '';

		var height = container.offsetHeight,
		    maxHeight = this.options.maxHeight,
		    scrolledClass = 'sop-infowindow-scrolled';

		if (maxHeight && height > maxHeight) {
			style.height = maxHeight + 'px';
			sop.DomUtil.addClass(container, scrolledClass);
		} else {
			sop.DomUtil.removeClass(container, scrolledClass);
		}

		this._containerWidth = this._container.offsetWidth;
	},

	_updatePosition: function () {
		if (!this._map) { return; }

		var pos = this._map.utmkToLayerPoint(this._utmk),
		    offset = sop.point(this.options.offset);

		if (this._zoomAnimated) {
			sop.DomUtil.setPosition(this._container, pos);
		} else {
			offset = offset.add(pos);
		}

		var bottom = this._containerBottom = -offset.y,
		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

		// bottom position the infowindow in case the height of the infowindow changes (images loading etc)
		this._container.style.bottom = bottom + 'px';
		this._container.style.left = left + 'px';
	},

	_animateZoom: function (e) {
		var pos = this._map._utmkToNewLayerPoint(this._utmk, e.zoom, e.center);
		sop.DomUtil.setPosition(this._container, pos);
	},

	_adjustPan: function () {
		if (!this.options.autoPan) { return; }

		var map = this._map,
		    containerHeight = this._container.offsetHeight,
		    containerWidth = this._containerWidth,
		    layerPos = new sop.Point(this._containerLeft, -containerHeight - this._containerBottom);

		if (this._zoomAnimated) {
			layerPos._add(sop.DomUtil.getPosition(this._container));
		}

		var containerPos = map.layerPointToContainerPoint(layerPos),
		    padding = sop.point(this.options.autoPanPadding),
		    paddingTL = sop.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = sop.point(this.options.autoPanPaddingBottomRight || padding),
		    size = map.getSize(),
		    dx = 0,
		    dy = 0;

		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
		}
		if (containerPos.x - dx - paddingTL.x < 0) { // left
			dx = containerPos.x - paddingTL.x;
		}
		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
		}
		if (containerPos.y - dy - paddingTL.y < 0) { // top
			dy = containerPos.y - paddingTL.y;
		}

		if (dx || dy) {
			map
			    .fire('autopanstart')
			    .panBy([dx, dy]);
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		sop.DomEvent.stop(e);
	}
});

sop.infoWindow = function (options, source) {
	return new sop.InfoWindow(options, source);
};


sop.Map.include({
	openInfoWindow: function (infoWindow, utmk, options) { // (InfoWindow) or (String || HTMLElement, UTMK[, Object])
		if (!(infoWindow instanceof sop.InfoWindow)) {
			var content = infoWindow;

			infoWindow = new sop.InfoWindow(options).setContent(content);
		}

		if (utmk) {
			infoWindow.setUTMK(utmk);
		}

		if (this.hasLayer(infoWindow)) {
			return this;
		}

		this.closeInfoWindow();
		this._infoWindow = infoWindow;
		return this.addLayer(infoWindow);
	},

	closeInfoWindow: function (infoWindow) {
		if (!infoWindow || infoWindow === this._infoWindow) {
			infoWindow = this._infoWindow;
			this._infoWindow = null;
		}
		if (infoWindow) {
			this.removeLayer(infoWindow);
		}
		return this;
	}
});


/**
 * InfoWindow와 관련있는 메소드를 모든 레이어에 추가함.
 *
 */

sop.Layer.include({

	bindInfoWindow: function (content, options) {

		if (content instanceof sop.InfoWindow) {
			this._infoWindow = content;
			content._source = this;
		} else {
			if (!this._infoWindow || options) {
				this._infoWindow = new sop.InfoWindow(options, this);
			}
			this._infoWindow.setContent(content);
		}

		if (!this._infoWindowHandlersAdded) {
			this.on({
				click: this._openInfoWindow,
				remove: this.closeInfoWindow,
				move: this._moveInfoWindow
			});
			this._infoWindowHandlersAdded = true;
		}

		return this;
	},

	unbindInfoWindow: function () {
		if (this._infoWindow) {
			this.on({
			    click: this._openInfoWindow,
			    remove: this.closeInfoWindow,
			    move: this._moveInfoWindow
			});
			this._infoWindowHandlersAdded = false;
			this._infoWindow = null;
		}
		return this;
	},

	openInfoWindow: function (utmk) {
		if (this._infoWindow && this._map) {
			this._map.openInfoWindow(this._infoWindow, utmk || this._utmk || this.getCenter());
		}
		return this;
	},

	closeInfoWindow: function () {
		if (this._infoWindow) {
			this._infoWindow._close();
		}
		return this;
	},

	//InfoWindow창이 Map에 있는경우 close 없으면 Open한다.
	toggleInfoWindow: function () {
		if (this._infoWindow) {
			if (this._infoWindow._map) {
				this.closeInfoWindow();
			} else {
				this.openInfoWindow();
			}
		}
		return this;
	},

	setInfoWindowContent: function (content) {
		if (this._infoWindow) {
			this._infoWindow.setContent(content);
		}
		return this;
	},

	getInfoWindow: function () {
		return this._infoWindow;
	},

	_openInfoWindow: function (e) {
		this._map.openInfoWindow(this._infoWindow, e.utmk);
	},

	_moveInfoWindow: function (e) {
		this._infoWindow.setUTMK(e.utmk);
	}
});


/**
 *
 * InfoWindow extension to sop.Marker, adding infoWindow-related methods.
 *
 */

sop.Marker.include({
	bindInfoWindow: function (content, options) {
		var anchor = sop.point(this.options.icon.options.infoWindowAnchor || [0, 0])
			.add(sop.InfoWindow.prototype.options.offset);

		options = sop.extend({offset: anchor}, options);

		return sop.Layer.prototype.bindInfoWindow.call(this, content, options);
	},

	_openInfoWindow: sop.Layer.prototype.toggleInfoWindow
});


/*
 * sop.LayerGroup is a class to combine several layers into one so that
 * you can manipulate the group (e.g. add/remove it) as one layer.
 */

sop.LayerGroup = sop.Layer.extend({

	initialize: function (layers) {
		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	addLayer: function (layer) {
		var id = this.getLayerId(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},

	hasLayer: function (layer) {
		return !!layer && (layer in this._layers || this.getLayerId(layer) in this._layers);
	},

	clearLayers: function () {
		for (var i in this._layers) {
			this.removeLayer(this._layers[i]);
		}
		return this;
	},

	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			layer = this._layers[i];

			if (layer[methodName]) {
				layer[methodName].apply(layer, args);
			}
		}

		return this;
	},

	onAdd: function (map) {
		for (var i in this._layers) {
			map.addLayer(this._layers[i]);
		}
	},

	onRemove: function (map) {
		for (var i in this._layers) {
			map.removeLayer(this._layers[i]);
		}
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	getLayer: function (id) {
		return this._layers[id];
	},

	getLayers: function () {
		var layers = [];

		for (var i in this._layers) {
			layers.push(this._layers[i]);
		}
		return layers;
	},

	setZIndex: function (zIndex) {
		return this.invoke('setZIndex', zIndex);
	},

	getLayerId: function (layer) {
		return sop.stamp(layer);
	}
});

sop.layerGroup = function (layers) {
	return new sop.LayerGroup(layers);
};


/*
 * sop.FeatureGroup extends sop.LayerGroup by introducing mouse events and additional methods
 * shared between a group of interactive layers (like vectors or markers).
 */

sop.FeatureGroup = sop.LayerGroup.extend({

	addLayer: function (layer) {
		if (this.hasLayer(layer)) {
			return this;
		}

		layer.addEventParent(this);

		sop.LayerGroup.prototype.addLayer.call(this, layer);

		if (this._infoWindowContent && layer.bindInfoWindow) {
			layer.bindInfoWindow(this._infoWindowContent, this._infoWindowOptions);
		}

		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		if (!this.hasLayer(layer)) {
			return this;
		}
		if (layer in this._layers) {
			layer = this._layers[layer];
		}

		layer.removeEventParent(this);

		sop.LayerGroup.prototype.removeLayer.call(this, layer);

		if (this._infoWindowContent) {
			this.invoke('unbindInfoWindow');
		}

		return this.fire('layerremove', {layer: layer});
	},

	bindInfoWindow: function (content, options) {
		this._infoWindowContent = content;
		this._infoWindowOptions = options;
		return this.invoke('bindInfoWindow', content, options);
	},

	openInfoWindow: function (utmk) {
		// open infoWindow on the first layer
		for (var id in this._layers) {
			this._layers[id].openInfoWindow(utmk);
			break;
		}
		return this;
	},

	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	getBounds: function () {
		var bounds = new sop.UTMKBounds();

		this.eachLayer(function (layer) {
			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getUTMK());
		});

		return bounds;
	}
});

sop.featureGroup = function (layers) {
	return new sop.FeatureGroup(layers);
};


/*
 * sop.Renderer is a base class for renderer implementations (SVG, Canvas);
 * handles renderer container, bounds and zoom animation.
 */

sop.Renderer = sop.Layer.extend({

	options: {
		// how much to extend the clip area around the map view (relative to its size)
		// e.g. 0.1 would be 10% of map view in each direction; defaults to clip with the map view
		padding: 0
	},

	initialize: function (options) {
		sop.setOptions(this, options);
		sop.stamp(this);
	},

	onAdd: function () {
		if (!this._container) {
			this._initContainer(); // defined by renderer implementations

			if (this._zoomAnimated) {
				sop.DomUtil.addClass(this._container, 'sop-zoom-animated');
			}
		}

		this.getPane().appendChild(this._container);
		this._update();
	},

	onRemove: function () {
		sop.DomUtil.remove(this._container);
	},

	getEvents: function () {
		var events = {
			moveend: this._update
		};
		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}
		return events;
	},

	_animateZoom: function (e) {
		var origin = e.origin.subtract(this._map._getCenterLayerPoint()),
		    offset = this._bounds.min.add(origin.multiplyBy(1 - e.scale));

		sop.DomUtil.setTransform(this._container, offset, e.scale);
	},

	_update: function () {
		// update pixel bounds of renderer container (for positioning/sizing/clipping later)
		var p = this.options.padding,
		    size = this._map.getSize(),
		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

		this._bounds = new sop.Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
	}
});


sop.Map.include({
	// used by each vector layer to decide which renderer to use
	getRenderer: function (layer) {
		var renderer = layer.options.renderer || this.options.renderer || this._renderer;

		if (!renderer) {
			renderer = this._renderer = (sop.SVG && sop.svg()) || (sop.Canvas && sop.canvas());
		}

		if (!this.hasLayer(renderer)) {
			this.addLayer(renderer);
		}
		return renderer;
	}
});


/*
 * sop.Path is the base class for all sop vector layers like polygons and circles.
 */

sop.Path = sop.Layer.extend({

	options: {
		stroke: true,
		color: '#3388ff',
		weight: 3,
		opacity: 1,
		lineCap: 'round',
		lineJoin: 'round',
		// dashArray: null
		// dashOffset: null

		// fill: false
		// fillColor: same as color by default
		fillOpacity: 0.2,

		// className: ''
		clickable: true
	},

	onAdd: function () {
		this._renderer = this._map.getRenderer(this);
		this._renderer._initPath(this);

		// defined in children classes
		this._project();
		this._update();

		this._renderer._addPath(this);
	},

	onRemove: function () {
		this._renderer._removePath(this);
	},

	getEvents: function () {
		return {
			viewreset: this._project,
			moveend: this._update
		};
	},

	redraw: function () {
		if (this._map) {
			this._renderer._updatePath(this);
		}
		return this;
	},

	setStyle: function (style) {
		sop.setOptions(this, style);
		if (this._renderer) {
			this._renderer._updateStyle(this);
		}
		return this;
	},

	bringToFront: function () {
		this._renderer._bringToFront(this);
		return this;
	},

	bringToBack: function () {
		this._renderer._bringToBack(this);
		return this;
	},

	_fireMouseEvent: function (e, type) {
		this._map._fireMouseEvent(this, e, type, true);
	},

	_clickTolerance: function () {
		// used when doing hit detection for Canvas layers
		return (this.options.stroke ? this.options.weight / 2 : 0) + (sop.Browser.touch ? 10 : 0);
	}
});


/*
 * sop.LineUtil contains different utility functions for line segments
 * and polylines (clipping, simplification, distances, etc.)
 */

/*jshint bitwise:false */ // allow bitwise operations for this file

sop.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// distance from a point to a segment between two points
	pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
		    newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
		    index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},

	// Cohen-Sutherland line clipping algorithm.
	// Used to avoid rendering parts of a polyline that are not currently visible.

	clipSegment: function (a, b, bounds, useLastCode) {
		var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
		    codeB = this._getBitCode(b, bounds),

		    codeOut, p, newCode;

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			// if a,b is outside the clip window (trivial reject)
			} else if (codeA & codeB) {
				return false;
			// other cases
			} else {
				codeOut = codeA || codeB;
				p = this._getEdgeIntersection(a, b, codeOut, bounds);
				newCode = this._getBitCode(p, bounds);

				if (codeOut === codeA) {
					a = p;
					codeA = newCode;
				} else {
					b = p;
					codeB = newCode;
				}
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max,
		    x, y;

		if (code & 8) { // top
			x = a.x + dx * (max.y - a.y) / dy;
			y = max.y;

		} else if (code & 4) { // bottom
			x = a.x + dx * (min.y - a.y) / dy;
			y = min.y;

		} else if (code & 2) { // right
			x = max.x;
			y = a.y + dy * (max.x - a.x) / dx;

		} else if (code & 1) { // left
			x = min.x;
			y = a.y + dy * (min.x - a.x) / dx;
		}

		return new sop.Point(x, y, true);
	},

	_getBitCode: function (/*Point*/ p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}

		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new sop.Point(x, y);
	}
};


/*
 * sop.Polyline implements polyline vector layer (a set of points connected with lines)
 */

sop.Polyline = sop.Path.extend({

	options: {
		// how much to simplify the polyline on each zoom level
		// more = better performance and smoother look, less = more accurate
		smoothFactor: 1.0
		// noClip: false
	},

	initialize: function (utmks, options) {
		sop.setOptions(this, options);
		this._setUTMKs(utmks);
	},

	getUTMKs: function () {
		// TODO rings
		return this._utmks;
	},

	setUTMKs: function (utmks) {
		this._setUTMKs(utmks);
		return this.redraw();
	},

	addUTMK: function (utmk) {
		// TODO rings
		utmk = sop.utmk(utmk);
		this._utmks.push(utmk);
		this._bounds.extend(utmk);
		return this.redraw();
	},

	spliceUTMKs: function () {
		// TODO rings
		var removed = [].splice.apply(this._utmks, arguments);
		this._setUTMKs(this._utmks);
		this.redraw();
		return removed;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity,
		    minPoint = null,
		    closest = sop.LineUtil._sqClosestPointOnSegment,
		    p1, p2;

		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
			var points = this._parts[j];

			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];

				var sqDist = closest(p, p1, p2, true);

				if (sqDist < minDistance) {
					minDistance = sqDist;
					minPoint = closest(p, p1, p2);
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	getCenter: function () {
		var i, halfDist, segDist, dist, p1, p2, ratio,
		    points = this._rings[0],
		    len = points.length;

		// polyline centroid algorithm; only uses the first ring if there are multiple

		for (i = 0, halfDist = 0; i < len - 1; i++) {
			halfDist += points[i].distanceTo(points[i + 1]) / 2;
		}

		for (i = 0, dist = 0; i < len - 1; i++) {
			p1 = points[i];
			p2 = points[i + 1];
			segDist = p1.distanceTo(p2);
			dist += segDist;

			if (dist > halfDist) {
				ratio = (dist - halfDist) / segDist;
				return this._map.layerPointToUTMK([
					p2.x - ratio * (p2.x - p1.x),
					p2.y - ratio * (p2.y - p1.y)
				]);
			}
		}
	},

	getBounds: function () {
		return this._bounds;
	},

	_setUTMKs: function (utmks) {
		this._bounds = new sop.UTMKBounds();
		this._utmks = this._convertUTMKs(utmks);
	},

	// recursively convert utmks input into actual UTMK instances; calculate bounds along the way
	_convertUTMKs: function (utmks) {
		var result = [],
		    flat = this._flat(utmks);

		for (var i = 0, len = utmks.length; i < len; i++) {
			if (flat) {
				result[i] = sop.utmk(utmks[i]);
				this._bounds.extend(result[i]);
			} else {
				result[i] = this._convertUTMKs(utmks[i]);
			}
		}

		return result;
	},

	_flat: function (utmks) {
		// true if it's a flat array of utmks; false if nested
		//utmks의 array가 하나의 집합이면 true 리턴하고 만약 여러개의 배열을 포함하고 있다면 false를 리턴한다.
		return !sop.Util.isArray(utmks[0]) || typeof utmks[0][0] !== 'object';
	},

	_project: function () {
		this._rings = [];
		this._projectUTMKs(this._utmks, this._rings);

		// project bounds as well to use later for Canvas hit detection/etc.
		var w = this._clickTolerance(),
			p = new sop.Point(w, -w);

		if (this._utmks.length) {
			this._pxBounds = new sop.Bounds(
				this._map.utmkToLayerPoint(this._bounds.getSouthWest())._subtract(p),
				this._map.utmkToLayerPoint(this._bounds.getNorthEast())._add(p));
		}
	},

	// recursively turns utmks into a set of rings with projected coordinates
	//utmk형 좌표를 point형 좌표로 변환하여 rings 배열에 담는다.
	_projectUTMKs: function (utmks, result) {

		var flat = utmks[0] instanceof sop.UTMK,
		    len = utmks.length,
		    i, ring;

		if (flat) {
			ring = [];
			for (i = 0; i < len; i++) {
				ring[i] = this._map.utmkToLayerPoint(utmks[i]);
			}
			result.push(ring);
		} else {
			for (i = 0; i < len; i++) {
				this._projectUTMKs(utmks[i], result);
			}
		}
	},

	// clip polyline by renderer bounds so that we have less to render for performance
	//적게 랜더링하여 성능을 높일 수 있게 랜더링할 바운드에 의해서 폴리라인을 오려낸다.
	_clipPoints: function () {
		if (this.options.noClip) {
			this._parts = this._rings;
			return;
		}

		this._parts = [];

		var parts = this._parts,
		    bounds = this._renderer._bounds,
		    i, j, k, len, len2, segment, points;

		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
			points = this._rings[i];

			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
				segment = sop.LineUtil.clipSegment(points[j], points[j + 1], bounds, j);

				if (!segment) { continue; }

				parts[k] = parts[k] || [];
				parts[k].push(segment[0]);

				// if segment goes out of screen, or it's the last one, it's the end of the line part
				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
					parts[k].push(segment[1]);
					k++;
				}
			}
		}
	},

	// simplify each clipped part of the polyline for performance
	_simplifyPoints: function () {
		var parts = this._parts,
			tolerance = this.options.smoothFactor;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = sop.LineUtil.simplify(parts[i], tolerance);
		}
	},

	_update: function () {
		if (!this._map) { return; }

		this._clipPoints();
		this._simplifyPoints();
		this._updatePath();
	},

	_updatePath: function () {
		this._renderer._updatePoly(this);
	}
});

sop.polyline = function (utmks, options) {
	return new sop.Polyline(utmks, options);
};


/*
 * sop.PolyUtil contains utility functions for polygons (clipping, etc.).
 */

/*jshint bitwise:false */ // allow bitwise operations here

sop.PolyUtil = {};

/*
 * Sutherland-Hodgeman polygon clipping algorithm.
 * Used to avoid rendering parts of a polygon that are not currently visible.
 */
sop.PolyUtil.clipPolygon = function (points, bounds) {
	var clippedPoints,
	    edges = [1, 4, 2, 8],
	    i, j, k,
	    a, b,
	    len, edge, p,
	    lu = sop.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};


/*
 * sop.Polygon implements polygon vector layer (closed polyline with a fill inside).
 */

sop.Polygon = sop.Polyline.extend({

	options: {
		fill: true
	},

	getCenter: function () {
		var i, j, len, p1, p2, f, area, x, y,
			points = this._rings[0];

		// polygon centroid algorithm; only uses the first ring if there are multiple

		area = x = y = 0;

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			p1 = points[i];
			p2 = points[j];

			f = p1.y * p2.x - p2.y * p1.x;
			x += (p1.x + p2.x) * f;
			y += (p1.y + p2.y) * f;
			area += f * 3;
		}

		return this._map.layerPointToUTMK([x / area, y / area]);
	},

	_getArea: function () {
		var i, j, len, p1, p2, f, area;
			points = this._rings[0];

		// polygon centroid algorithm; only uses the first ring if there are multiple

		area = 0;

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			p1 = points[i];
			p2 = points[j];

			f = p1.y * p2.x - p2.y * p1.x;
			area += f * 3;
		}

		return area;
	},

	_convertUTMKs: function (utmks) {
		var result = sop.Polyline.prototype._convertUTMKs.call(this, utmks),
			len = result.length;

		// remove last point if it equals first one
		if (len >= 2 && result[0] instanceof sop.UTMK && result[0].equals(result[len - 1])) {
			result.pop();
		}
		return result;
	},

	_clipPoints: function () {
		if (this.options.noClip) {
			this._parts = this._rings;
			return;
		}

		// polygons need a different clipping algorithm so we redefine that

		var bounds = this._renderer._bounds,
			w = this.options.weight,
			p = new sop.Point(w, w);

		// increase clip padding by stroke width to avoid stroke on clip edges
		bounds = new sop.Bounds(bounds.min.subtract(p), bounds.max.add(p));

		this._parts = [];

		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
			clipped = sop.PolyUtil.clipPolygon(this._rings[i], bounds);
			if (clipped.length) {
				this._parts.push(clipped);
			}
		}
	},

	_updatePath: function () {
		this._renderer._updatePoly(this, true);

		//IE Event ZoomAnimate 제공안되기 때문에 _updatePath에 Caption UpdatePos 추가
		this._updateCaptionPos();
	},

	/* Caption 추가 */
	setCaption: function (captionOptions) {
		this.captionObj = new sop.Caption(this, this.getCenter(), captionOptions);
	},

	_updateCaptionPos: function (e) {
		if (this.captionObj) {
			var area = this._getArea();
			if (area < 200) {
				this.captionObj._captionDiv.style.display = 'none';
			} else {
				var center = this.getCenter();
				this.captionObj._captionDiv.style.display = 'block';
				this.captionObj._updateCaptionPos(center, e);
			}
		}
	},

	getCaption: function () {
		return this.captionObj._getCaption();
	},

	removeCaption: function () {
		if (this.captionObj) {
			this.captionObj._removeCaption();
			this._catpionObj = null;
		}
	},

	getEvents: function () {
		var events = {
			viewreset: this._project,
			moveend: this._update
		};

		//ZoomEvent발생시 caption Event 추가
		events.zoomanim = this._updateCaptionPos;

		return events;
	},

	onRemove: function () {
		this._renderer._removePath(this);
		this.removeCaption();
	}

});

sop.polygon = function (utmks, options) {
	return new sop.Polygon(utmks, options);
};


/*
 * sop.Rectangle extends Polygon and creates a rectangle when passed a UTMKBounds object.
 */

sop.Rectangle = sop.Polygon.extend({

	initialize: function (utmkBounds, options) {
		sop.Polygon.prototype.initialize.call(this, this._boundsToUTMKs(utmkBounds), options);
	},

	setBounds: function (utmkBounds) {
		this.setUTMKs(this._boundsToUTMKs(utmkBounds));
	},

	_boundsToUTMKs: function (utmkBounds) {
		utmkBounds = sop.utmkBounds(utmkBounds);
		return [
			utmkBounds.getSouthWest(),
			utmkBounds.getNorthWest(),
			utmkBounds.getNorthEast(),
			utmkBounds.getSouthEast()
		];
	}

});

sop.rectangle = function (utmkBounds, options) {
	return new sop.Rectangle(utmkBounds, options);
};


/*
 * sop.CircleMarker
 * 고정된 픽셀 반경으로 원을 나타냅니다(레벨이 따른 원사이즈 변환이 일어 나지 않습니다.)
 */

sop.CircleMarker = sop.Path.extend({

	options: {
		fill: true,
		radius: 10
	},

	initialize: function (utmk, options) {
		sop.setOptions(this, options);
		this._utmk = sop.utmk(utmk);
		this._radius = this.options.radius;
	},

	setUTMK: function (utmk) {
		this._utmk = sop.utmk(utmk);
		this.redraw();
		return this.fire('move', {utmk: this._utmk});
	},

	getUTMK: function () {
		return this._utmk;
	},

	setRadius: function (radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._radius;
	},

	setStyle: function (options) {
		var radius = options && options.radius || this._radius;
		sop.Path.prototype.setStyle.call(this, options);
		this.setRadius(radius);
		return this;
	},

	_project: function () {
		this._point = this._map.utmkToLayerPoint(this._utmk);
		this._updateBounds();
	},

	_updateBounds: function () {
		var r = this._radius,
			r2 = this._radiusY || r,
			w = this._clickTolerance(),
			p = [r + w, r2 + w];
		this._pxBounds = new sop.Bounds(this._point.subtract(p), this._point.add(p));
	},

	_update: function () {
		if (this._map) {
			this._updatePath();
		}
	},

	_updatePath: function () {
		this._renderer._updateCircle(this);

		//IE Event ZoomAnimate 제공안되기 때문에 _updatePath에 Caption UpdatePos 추가
		this._updateCaptionPos();
	},

	_empty: function () {
		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
	},

	/* Caption 추가 */
	setCaption: function (captionOptions) {
		this.captionObj = new sop.Caption(this, this._utmk, captionOptions);
	},

	_updateCaptionPos: function (e) {
		if (this.captionObj) {
			this.captionObj._updateCaptionPos(this._utmk, e);
		}
	},

	getCaption: function () {
		return this.captionObj._getCaption();
	},

	removeCaption: function () {
		if (this.captionObj) {
			this.captionObj._removeCaption();
			this._catpionObj = null;
		}
	},

	getEvents: function () {
		var events = {
			viewreset: this._project,
			moveend: this._update
		};

		//ZoomEvent발생시 caption Event 추가
		events.zoomanim = this._updateCaptionPos;

		return events;
	},

	onRemove: function () {
		this._renderer._removePath(this);
		this.removeCaption();
	}

});

sop.circleMarker = function (utmk, options) {
	return new sop.CircleMarker(utmk, options);
};


/*
 * sop.Circle is a circle overlay (with a certain radius in meters).
 * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion)
 */

sop.Circle = sop.CircleMarker.extend({

	initialize: function (utmk, radius, options) {
		sop.setOptions(this, options);
		this._utmk = sop.utmk(utmk);
		this._mRadius = radius;
	},

	setRadius: function (radius) {
		this._mRadius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._mRadius;
	},

	getBounds: function () {
		if (!this._radiusY) {
			this._radiusY = this._radius;
		}

		var half = [this._radius, this._radiusY];

		return new sop.UTMKBounds(
			this._map.layerPointToUTMK(this._point.subtract(half)),
			this._map.layerPointToUTMK(this._point.add(half)));
	},

	setStyle: sop.Path.prototype.setStyle,

	_project: function () {

		var /*lng = this._utmk.x,
			lat = this._utmk.y,*/
			map = this._map,
			crs = map.options.crs;

		/*if (crs.distance === sop.CRS.Earth.distance) {
			var d = Math.PI / 180,
				latR = (this._mRadius / sop.CRS.Earth.R) / d,
				top = map.project([lat + latR, lng]),
				bottom = map.project([lat - latR, lng]),
				p = top.add(bottom).divideBy(2),
				lat2 = map.unproject(p).lat,
				lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
					(Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

			this._point = p.subtract(map.getPixelOrigin());
			this._radius = isNaN(lngR) ? 0 : Math.max(Math.round(p.x - map.project([lat2, lng - lngR]).x), 1);
			this._radiusY = Math.max(Math.round(p.y - top.y), 1);

		} else {
			var utmk2 = crs.unproject(crs.project(this._utmk).subtract([this._mRadius, 0]));

			this._point = map.utmkToLayerPoint(this._utmk);
			this._radius = this._point.x - map.utmkToLayerPoint(utmk2).x;

		}*/

		var utmk2 = crs.unproject(crs.project(this._utmk).subtract([this._mRadius, 0]));

		this._point = map.utmkToLayerPoint(this._utmk);
		this._radius = this._point.x - map.utmkToLayerPoint(utmk2).x;
		// sop.CRS.Earth 좌표일때 발생 문재로 인해 수정.
		this._radiusY = this._radius;

		this._updateBounds();
	}
});

sop.circle = function (utmk, radius, options) {
	return new sop.Circle(utmk, radius, options);
};


/*
 * sop.SVG renders vector layers with SVG. All SVG-specific code goes here.
 */

sop.SVG = sop.Renderer.extend({

	_initContainer: function () {
		this._container = sop.SVG.create('svg');

		this._paths = {};
		this._initEvents();

		// makes it possible to click through svg root; we'll reset it back in individual paths
		this._container.setAttribute('pointer-events', 'none');
	},

	_update: function () {
		if (this._map._animatingZoom && this._bounds) {
			return;
		}

		sop.Renderer.prototype._update.call(this);

		var b = this._bounds,
			size = b.getSize(),
			container = this._container,
			pane = this.getPane();

		// hack to make flicker on drag end on mobile webkit less irritating
		if (sop.Browser.mobileWebkit) {
			pane.removeChild(container);
		}

		sop.DomUtil.setPosition(container, b.min);

		// set size of svg-container if changed
		if (!this._svgSize || !this._svgSize.equals(size)) {
			this._svgSize = size;
			container.setAttribute('width', size.x);
			container.setAttribute('height', size.y);
		}

		// movement: update container viewBox so that we don't have to change coordinates of individual layers
		sop.DomUtil.setPosition(container, b.min);
		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));

		if (sop.Browser.mobileWebkit) {
			pane.appendChild(container);
		}
	},

	// methods below are called by vector layers implementations

	_initPath: function (layer) {
		var path = layer._path = sop.SVG.create('path');

		if (layer.options.className) {
			sop.DomUtil.addClass(path, layer.options.className);
		}

		if (layer.options.clickable) {
			sop.DomUtil.addClass(path, 'sop-clickable');
		}

		this._updateStyle(layer);
	},

	_addPath: function (layer) {
		var path = layer._path;
		this._container.appendChild(path);
		this._paths[sop.stamp(path)] = layer;
	},

	_removePath: function (layer) {
		var path = layer._path;
		sop.DomUtil.remove(path);
		delete this._paths[sop.stamp(path)];
	},

	_updatePath: function (layer) {
		layer._project();
		layer._update();
	},

	_updateStyle: function (layer) {
		var path = layer._path,
			options = layer.options;

		if (!path) {
			return;
		}

		if (options.stroke) {
			path.setAttribute('stroke', options.color);
			path.setAttribute('stroke-opacity', options.opacity);
			path.setAttribute('stroke-width', options.weight);
			path.setAttribute('stroke-linecap', options.lineCap);
			path.setAttribute('stroke-linejoin', options.lineJoin);

			if (options.dashArray) {
				path.setAttribute('stroke-dasharray', options.dashArray);
			} else {
				path.removeAttribute('stroke-dasharray');
			}

			if (options.dashOffset) {
				path.setAttribute('stroke-dashoffset', options.dashOffset);
			} else {
				path.removeAttribute('stroke-dashoffset');
			}
		} else {
			path.setAttribute('stroke', 'none');
		}

		if (options.fill) {
			path.setAttribute('fill', options.fillColor || options.color);
			path.setAttribute('fill-opacity', options.fillOpacity);
			path.setAttribute('fill-rule', 'evenodd');
		} else {
			path.setAttribute('fill', 'none');
		}

		path.setAttribute('pointer-events', options.pointerEvents || (options.clickable ? 'visiblePainted' : 'none'));
	},

	_updatePoly: function (layer, closed) {
		this._setPath(layer, sop.SVG.pointsToPath(layer._parts, closed));
	},

	_updateCircle: function (layer) {
		var p = layer._point,
			r = layer._radius,
			r2 = layer._radiusY || r,
			arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

		// drawing a circle with two half-arcs
		var d = layer._empty() ? 'M0 0' :
			'M' + (p.x - r) + ',' + p.y +
			arc + (r * 2) + ',0 ' +
			arc + (-r * 2) + ',0 ';

		this._setPath(layer, d);
	},

	_setPath: function (layer, path) {
		layer._path.setAttribute('d', path);
	},

	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
	_bringToFront: function (layer) {
		sop.DomUtil.toFront(layer._path);
	},

	_bringToBack: function (layer) {
		sop.DomUtil.toBack(layer._path);
	},

	// TODO remove duplication with sop.Map
	_initEvents: function () {
		sop.DomEvent.on(this._container, 'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu',
			this._fireMouseEvent, this);
	},

	_fireMouseEvent: function (e) {
		var path = this._paths[sop.stamp(e.target || e.srcElement)];
		if (path) {
			path._fireMouseEvent(e);
		}
	}
});


sop.extend(sop.SVG, {
	create: function (name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	},

	// generates SVG path string for multiple rings, with each ring turning into "M..L..L.." instructions
	pointsToPath: function (rings, closed) {
		var str = '',
			i, j, len, len2, points, p;

		for (i = 0, len = rings.length; i < len; i++) {
			points = rings[i];

			for (j = 0, len2 = points.length; j < len2; j++) {
				p = points[j];
				str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
			}

			// closes the ring for polygons; "x" is VML syntax
			str += closed ? (sop.Browser.svg ? 'z' : 'x') : '';
		}

		// SVG complains about empty path strings
		return str || 'M0 0';
	}
});

sop.Browser.svg = !!(document.createElementNS && sop.SVG.create('svg').createSVGRect);

sop.svg = function (options) {
	return sop.Browser.svg || sop.Browser.vml ? new sop.SVG(options) : null;
};


/*
 * Vector rendering for IE7-8 through VML.
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

sop.Browser.vml = !sop.Browser.svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());

// redefine some SVG methods to handle VML syntax which is similar but with some differences
sop.SVG.include(!sop.Browser.vml ? {} : {

	_initContainer: function () {
		this._container = sop.DomUtil.create('div', 'sop-vml-container');

		this._paths = {};
		this._initEvents();
	},

	_update: function () {
		if (this._map._animatingZoom) { return; }
		sop.Renderer.prototype._update.call(this);
	},

	_initPath: function (layer) {
		var container = layer._container = sop.SVG.create('shape');

		sop.DomUtil.addClass(container, 'sop-vml-shape ' + (this.options.className || ''));

		container.coordsize = '1 1';

		layer._path = sop.SVG.create('path');
		container.appendChild(layer._path);

		this._updateStyle(layer);
	},

	_addPath: function (layer) {
		var container = layer._container;
		this._container.appendChild(container);
		this._paths[sop.stamp(container)] = layer;
	},

	_removePath: function (layer) {
		var container = layer._container;
		sop.DomUtil.remove(container);
		delete this._paths[sop.stamp(container)];
	},

	_updateStyle: function (layer) {
		var stroke = layer._stroke,
		    fill = layer._fill,
		    options = layer.options,
		    container = layer._container;

		container.stroked = !!options.stroke;
		container.filled = !!options.fill;

		if (options.stroke) {
			if (!stroke) {
				stroke = layer._stroke = sop.SVG.create('stroke');
				container.appendChild(stroke);
			}
			stroke.weight = options.weight + 'px';
			stroke.color = options.color;
			stroke.opacity = options.opacity;

			if (options.dashArray) {
				stroke.dashStyle = sop.Util.isArray(options.dashArray) ?
				    options.dashArray.join(' ') :
				    options.dashArray.replace(/( *, *)/g, ' ');
			} else {
				stroke.dashStyle = '';
			}
			stroke.endcap = options.lineCap.replace('butt', 'flat');
			stroke.joinstyle = options.lineJoin;

		} else if (stroke) {
			container.removeChild(stroke);
			layer._stroke = null;
		}

		if (options.fill) {
			if (!fill) {
				fill = layer._fill = sop.SVG.create('fill');
				container.appendChild(fill);
			}
			fill.color = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;

		} else if (fill) {
			container.removeChild(fill);
			layer._fill = null;
		}
	},

	_updateCircle: function (layer) {
		var p = layer._point,
		    r = Math.round(layer._radius),
		    r2 = Math.round(layer._radiusY || r);

		this._setPath(layer, layer._empty() ? 'M0 0' :
				'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
	},

	_setPath: function (layer, path) {
		layer._path.v = path;
	}
});

if (sop.Browser.vml) {
	sop.SVG.create = (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	})();
}


/*
 * sop.Canvas handles Canvas vector layers rendering and mouse events handling. All Canvas-specific code goes here.
 */

sop.Canvas = sop.Renderer.extend({

	onAdd: function () {
		sop.Renderer.prototype.onAdd.call(this);

		this._layers = this._layers || {};

		// redraw vectors since canvas is cleared upon removal
		this._draw();
	},

	_initContainer: function () {
		var container = this._container = document.createElement('canvas');

		sop.DomEvent
			.on(container, 'mousemove', this._onMouseMove, this)
			.on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);

		this._ctx = container.getContext('2d');
	},

	_update: function () {
		if (this._map._animatingZoom && this._bounds) { return; }

		sop.Renderer.prototype._update.call(this);

		var b = this._bounds,
		    container = this._container,
		    size = b.getSize(),
		    m = sop.Browser.retina ? 2 : 1;

		sop.DomUtil.setPosition(container, b.min);

		// set canvas size (also clearing it); use double size on retina
		container.width = m * size.x;
		container.height = m * size.y;
		container.style.width = size.x + 'px';
		container.style.height = size.y + 'px';

		if (sop.Browser.retina) {
			this._ctx.scale(2, 2);
		}

		// translate so we use the same path coordinates after canvas element moves
		this._ctx.translate(-b.min.x, -b.min.y);
	},

	_initPath: function (layer) {
		this._layers[sop.stamp(layer)] = layer;
	},

	_addPath: sop.Util.falseFn,

	_removePath: function (layer) {
		layer._removed = true;
		this._requestRedraw(layer);
	},

	_updatePath: function (layer) {
		this._redrawBounds = layer._pxBounds;
		this._draw(true);
		layer._project();
		layer._update();
		this._draw();
		this._redrawBounds = null;
	},

	_updateStyle: function (layer) {
		this._requestRedraw(layer);
	},

	_requestRedraw: function (layer) {
		if (!this._map) { return; }

		this._redrawBounds = this._redrawBounds || new sop.Bounds();
		this._redrawBounds.extend(layer._pxBounds.min).extend(layer._pxBounds.max);

		this._redrawRequest = this._redrawRequest || sop.Util.requestAnimFrame(this._redraw, this);
	},

	_redraw: function () {
		this._redrawRequest = null;

		this._draw(true); // clear layers in redraw bounds
		this._draw(); // draw layers

		this._redrawBounds = null;
	},

	_draw: function (clear) {
		this._clear = clear;
		var layer;

		for (var id in this._layers) {
			layer = this._layers[id];
			if (!this._redrawBounds || layer._pxBounds.intersects(this._redrawBounds)) {
				layer._updatePath();
			}
			if (clear && layer._removed) {
				delete layer._removed;
				delete this._layers[id];
			}
		}
	},

	_updatePoly: function (layer, closed) {

		var i, j, len2, p,
		    parts = layer._parts,
		    len = parts.length,
		    ctx = this._ctx;

	    if (!len) { return; }

		ctx.beginPath();

		for (i = 0; i < len; i++) {
			for (j = 0, len2 = parts[i].length; j < len2; j++) {
				p = parts[i][j];
				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
			}
			if (closed) {
				ctx.closePath();
			}
		}

		this._fillStroke(ctx, layer);

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_updateCircle: function (layer) {

		if (layer._empty()) { return; }

		var p = layer._point,
		    ctx = this._ctx,
		    r = layer._radius,
		    s = (layer._radiusY || r) / r;

		if (s !== 1) {
			ctx.save();
			ctx.scale(1, s);
		}

		ctx.beginPath();
		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

		if (s !== 1) {
			ctx.restore();
		}

		this._fillStroke(ctx, layer);
	},

	_fillStroke: function (ctx, layer) {
		var clear = this._clear,
		    options = layer.options;

		ctx.globalCompositeOperation = clear ? 'destination-out' : 'source-over';

		if (options.fill) {
			ctx.globalAlpha = clear ? 1 : options.fillOpacity;
			ctx.fillStyle = options.fillColor || options.color;
			ctx.fill('evenodd');
		}

		if (options.stroke) {
			ctx.globalAlpha = clear ? 1 : options.opacity;

			// if clearing shape, do it with the previously drawn line width
			layer._prevWeight = ctx.lineWidth = clear ? layer._prevWeight + 1 : options.weight;

			ctx.strokeStyle = options.color;
			ctx.lineCap = options.lineCap;
			ctx.lineJoin = options.lineJoin;
			ctx.stroke();
		}
	},

	// Canvas obviously doesn't have mouse events for individual drawn objects,
	// so we emulate that by calculating what's under the mouse on mousemove/click manually

	_onClick: function (e) {
		var point = this._map.mouseEventToLayerPoint(e);

		for (var id in this._layers) {
			if (this._layers[id]._containsPoint(point)) {
				this._layers[id]._fireMouseEvent(e);
			}
		}
	},

	_onMouseMove: function (e) {
		if (!this._map || this._map._animatingZoom) { return; }

		var point = this._map.mouseEventToLayerPoint(e);

		// TODO don't do on each move event, throttle since it's expensive
		for (var id in this._layers) {
			this._handleHover(this._layers[id], e, point);
		}
	},

	_handleHover: function (layer, e, point) {
		if (!layer.options.clickable) { return; }

		if (layer._containsPoint(point)) {
			// if we just got inside the layer, fire mouseover
			if (!layer._mouseInside) {
				sop.DomUtil.addClass(this._container, 'sop-clickable'); // change cursor
				layer._fireMouseEvent(e, 'mouseover');
				layer._mouseInside = true;
			}
			// fire mousemove
			layer._fireMouseEvent(e);

		} else if (layer._mouseInside) {
			// if we're leaving the layer, fire mouseout
			sop.DomUtil.removeClass(this._container, 'sop-clickable');
			layer._fireMouseEvent(e, 'mouseout');
			layer._mouseInside = false;
		}
	},

	// TODO _bringToFront & _bringToBack, pretty tricky

	_bringToFront: sop.Util.falseFn,
	_bringToBack: sop.Util.falseFn
});

sop.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

sop.canvas = function (options) {
	return sop.Browser.canvas ? new sop.Canvas(options) : null;
};

sop.Polyline.prototype._containsPoint = function (p, closed) {
	var i, j, k, len, len2, part,
	    w = this._clickTolerance();

	if (!this._pxBounds.contains(p)) { return false; }

	// hit detection for polylines
	for (i = 0, len = this._parts.length; i < len; i++) {
		part = this._parts[i];

		for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
			if (!closed && (j === 0)) { continue; }

			if (sop.LineUtil.pointToSegmentDistance(p, part[k], part[j]) <= w) {
				return true;
			}
		}
	}
	return false;
};

sop.Polygon.prototype._containsPoint = function (p) {
	var inside = false,
	    part, p1, p2, i, j, k, len, len2;

	if (!this._pxBounds.contains(p)) { return false; }

	// ray casting algorithm for detecting if point is in polygon
	for (i = 0, len = this._parts.length; i < len; i++) {
		part = this._parts[i];

		for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
			p1 = part[j];
			p2 = part[k];

			if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
				inside = !inside;
			}
		}
	}

	// also check if it's on polygon stroke
	return inside || sop.Polyline.prototype._containsPoint.call(this, p, true);
};

sop.CircleMarker.prototype._containsPoint = function (p) {
	return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
};


/*
 * sop.GeoJSON turns any GeoJSON data into a sop layer.
 */

sop.GeoJSON = sop.FeatureGroup.extend({

	initialize: function (geojson, options) {
		sop.setOptions(this, options);

		this._layers = {};

		if (geojson) {
			this.addData(geojson);
		}
	},

	addData: function (geojson) {
		var features = sop.Util.isArray(geojson) ? geojson : geojson.features,
		    i, len, feature;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				// Only add this if geometry or geometries are set and not null
				feature = features[i];
				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
					this.addData(feature);
				}
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return; }
		// GeoJSON의 coord 데이터를 UTMK형으로 변환한다.
		var layer = sop.GeoJSON.geometryToLayer(geojson, options);
		layer.feature = sop.GeoJSON.asFeature(geojson);

		layer.defaultOptions = layer.options;
		this.resetStyle(layer);

		if (options.onEachFeature) {
			options.onEachFeature(geojson, layer);
		}

		return this.addLayer(layer);
	},

	resetStyle: function (layer) {
		// reset any custom styles
		layer.options = layer.defaultOptions;
		this._setLayerStyle(layer, this.options.style);
		return this;
	},

	setStyle: function (style) {
		return this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	}
});

sop.extend(sop.GeoJSON, {
	// GeoJSON 데이터의 유형에 따라 coord 값을 UTMK형으로 변경한다.
	geometryToLayer: function (geojson, options) {

		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry.coordinates,
		    layers = [],
		    pointToLayer = options && options.pointToLayer,
		    coordsToUTMK = options && options.coordsToUTMK || this.coordsToUTMK,
		    utmk, utmks, i, len;

		switch (geometry.type) {
		case 'Point':
			utmk = coordsToUTMK(coords);
			return pointToLayer ? pointToLayer(geojson, utmk) : new sop.Marker(utmk);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				utmk = coordsToUTMK(coords[i]);
				layers.push(pointToLayer ? pointToLayer(geojson, utmk) : new sop.Marker(utmk));
			}
			return new sop.FeatureGroup(layers);

		case 'LineString':
		case 'MultiLineString':
			utmks = this.coordsToUTMKs(coords, geometry.type === 'LineString' ? 0 : 1, coordsToUTMK);
			return new sop.Polyline(utmks, options);

		case 'Polygon':
		case 'MultiPolygon':
			utmks = this.coordsToUTMKs(coords, geometry.type === 'Polygon' ? 1 : 2, coordsToUTMK);
			return new sop.Polygon(utmks, options);

		case 'GeometryCollection':
			for (i = 0, len = geometry.geometries.length; i < len; i++) {

				layers.push(this.geometryToLayer({
					geometry: geometry.geometries[i],
					type: 'Feature',
					properties: geojson.properties
				}, options));
			}
			return new sop.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	coordsToUTMK: function (coords) {
		return new sop.UTMK(coords[0], coords[1], coords[2]);
	},

	coordsToUTMKs: function (coords, levelsDeep, coordsToUTMK) {
		var utmks = [];

		for (var i = 0, len = coords.length, utmk; i < len; i++) {
			utmk = levelsDeep ?
			        this.coordsToUTMKs(coords[i], levelsDeep - 1, coordsToUTMK) :
			        (coordsToUTMK || this.coordsToUTMK)(coords[i]);

			utmks.push(utmk);
		}

		return utmks;
	},

	utmkToCoords: function (utmk) {
		return utmk.alt !== undefined ?
				[utmk.x, utmk.y, utmk.alt] :
				[utmk.x, utmk.y];
	},

	utmksToCoords: function (utmks, levelsDeep, closed) {
		var coords = [];

		for (var i = 0, len = utmks.length; i < len; i++) {
			coords.push(levelsDeep ?
				sop.GeoJSON.utmksToCoords(utmks[i], levelsDeep - 1, closed):
				sop.GeoJSON.utmkToCoords(utmks[i]));
		}

		if (!levelsDeep && closed) {
			coords.push(coords[0]);
		}

		return coords;
	},

	getFeature: function (layer, newGeometry) {
		return layer.feature ?
				sop.extend({}, layer.feature, {geometry: newGeometry}) :
				sop.GeoJSON.asFeature(newGeometry);
	},

	asFeature: function (geoJSON) {
		if (geoJSON.type === 'Feature') {
			return geoJSON;
		}

		return {
			type: 'Feature',
			properties: {},
			geometry: geoJSON
		};
	}
});

var PointToGeoJSON = {
	toGeoJSON: function () {
		return sop.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: sop.GeoJSON.utmkToCoords(this.getUTMK())
		});
	}
};

sop.Marker.include(PointToGeoJSON);
sop.Circle.include(PointToGeoJSON);
sop.CircleMarker.include(PointToGeoJSON);

sop.Polyline.prototype.toGeoJSON = function () {
	var multi = !this._flat(this._utmks);

	var coords = sop.GeoJSON.utmksToCoords(this._utmks, multi ? 1 : 0);

	return sop.GeoJSON.getFeature(this, {
		type: (multi ? 'Multi' : '') + 'LineString',
		coordinates: coords
	});
};

sop.Polygon.prototype.toGeoJSON = function () {
	var holes = !this._flat(this._utmks),
	    multi = holes && !this._flat(this._utmks[0]);

	var coords = sop.GeoJSON.utmksToCoords(this._utmks, multi ? 2 : holes ? 1 : 0, true);

	if (holes && this._utmks.length === 1) {
		multi = true;
		coords = [coords];
	}
	if (!holes) {
		coords = [coords];
	}

	return sop.GeoJSON.getFeature(this, {
		type: (multi ? 'Multi' : '') + 'Polygon',
		coordinates: coords
	});
};


sop.LayerGroup.include({
	toMultiPoint: function () {
		var coords = [];

		this.eachLayer(function (layer) {
			coords.push(layer.toGeoJSON().geometry.coordinates);
		});

		return sop.GeoJSON.getFeature(this, {
			type: 'MultiPoint',
			coordinates: coords
		});
	},

	toGeoJSON: function () {

		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

		if (type === 'MultiPoint') {
			return this.toMultiPoint();
		}

		var isGeometryCollection = type === 'GeometryCollection',
			jsons = [];

		this.eachLayer(function (layer) {
			if (layer.toGeoJSON) {
				var json = layer.toGeoJSON();
				jsons.push(isGeometryCollection ? json.geometry : sop.GeoJSON.asFeature(json));
			}
		});

		if (isGeometryCollection) {
			return sop.GeoJSON.getFeature(this, {
				geometries: jsons,
				type: 'GeometryCollection'
			});
		}

		return {
			type: 'FeatureCollection',
			features: jsons
		};
	}
});

sop.geoJson = function (geojson, options) {
	return new sop.GeoJSON(geojson, options);
};


/*
 * sop.DomEvent contains functions for working with DOM events.
 * Inspired by John Resig, Dean Edwards and YUI addEvent implementations.
 */

var eventsKey = '_sop_events';

sop.DomEvent = {

	on: function (obj, types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this._on(obj, type, types[type], fn);
			}
		} else {
			types = sop.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._on(obj, types[i], fn, context);
			}
		}

		return this;
	},

	off: function (obj, types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this._off(obj, type, types[type], fn);
			}
		} else {
			types = sop.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._off(obj, types[i], fn, context);
			}
		}

		return this;
	},

	_on: function (obj, type, fn, context) {
		var id = type + sop.stamp(fn) + (context ? '_' + sop.stamp(context) : '');

		if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

		var handler = function (e) {
			return fn.call(context || obj, e || window.event);
		};

		var originalHandler = handler;

		if (sop.Browser.pointer && type.indexOf('touch') === 0) {
			return this.addPointerListener(obj, type, handler, id);
		}
		if (sop.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			this.addDoubleTapListener(obj, handler, id);
		}

		if ('addEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				handler = function (e) {
					e = e || window.event;
					if (!sop.DomEvent._checkMouse(obj, e)) { return; }
					return originalHandler(e);
				};
				obj.addEventListener(type === 'mouseenter' ? 'mouseover' : 'mouseout', handler, false);

			} else {
				if (type === 'click' && sop.Browser.android) {
					handler = function (e) {
						return sop.DomEvent._filterClick(e, originalHandler);
					};
				}
				obj.addEventListener(type, handler, false);
			}

		} else if ('attachEvent' in obj) {
			obj.attachEvent('on' + type, handler);
		}

		obj[eventsKey] = obj[eventsKey] || {};
		obj[eventsKey][id] = handler;

		return this;
	},

	_off: function (obj, type, fn, context) {

		var id = type + sop.stamp(fn) + (context ? '_' + sop.stamp(context) : ''),
		    handler = obj[eventsKey] && obj[eventsKey][id];

		if (!handler) { return this; }

		if (sop.Browser.pointer && type.indexOf('touch') === 0) {
			this.removePointerListener(obj, type, id);

		} else if (sop.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);

		} else if ('removeEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);

			} else {
				obj.removeEventListener(
					type === 'mouseenter' ? 'mouseover' :
					type === 'mouseleave' ? 'mouseout' : type, handler, false);
			}

		} else if ('detachEvent' in obj) {
			obj.detachEvent('on' + type, handler);
		}

		obj[eventsKey][id] = null;

		return this;
	},

	stopPropagation: function (e) {

		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		sop.DomEvent._skipped(e);

		return this;
	},

	disableScrollPropagation: function (el) {
		return sop.DomEvent.on(el, 'mousewheel MozMousePixelScroll', sop.DomEvent.stopPropagation);
	},

	disableClickPropagation: function (el) {
		var stop = sop.DomEvent.stopPropagation;

		sop.DomEvent.on(el, sop.Draggable.START.join(' '), stop);

		return sop.DomEvent.on(el, {
			click: sop.DomEvent._fakeStop,
			dblclick: stop
		});
	},

	preventDefault: function (e) {

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	},

	stop: function (e) {
		return sop.DomEvent
			.preventDefault(e)
			.stopPropagation(e);
	},

	getMousePosition: function (e, container) {
		if (!container) {
			return new sop.Point(e.clientX, e.clientY);
		}

		var rect = container.getBoundingClientRect();

		return new sop.Point(
			e.clientX - rect.left - container.clientLeft,
			e.clientY - rect.top - container.clientTop);
	},

	getWheelDelta: function (e) {

		var delta = 0;

		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	},

	_skipEvents: {},

	_fakeStop: function (e) {
		// fakes stopPropagation by setting a special event flag, checked/reset with sop.DomEvent._skipped(e)
		sop.DomEvent._skipEvents[e.type] = true;
	},

	_skipped: function (e) {
		var skipped = this._skipEvents[e.type];
		// reset when checking, as it's only used in map container and propagates outside of the map
		this._skipEvents[e.type] = false;
		return skipped;
	},

	// check if element really left/entered the event target (for mouseenter/mouseleave)
	_checkMouse: function (el, e) {

		var related = e.relatedTarget;

		if (!related) { return true; }

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	},

	// this is a horrible workaround for a bug in Android where a single touch triggers two click events
	_filterClick: function (e, handler) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
			elapsed = sop.DomEvent._lastClick && (timeStamp - sop.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events

		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			sop.DomEvent.stop(e);
			return;
		}
		sop.DomEvent._lastClick = timeStamp;

		return handler(e);
	}
};

sop.DomEvent.addListener = sop.DomEvent.on;
sop.DomEvent.removeListener = sop.DomEvent.off;


/*
 * sop.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
 */

sop.Draggable = sop.Evented.extend({

	statics: {
		START: sop.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
		END: {
			mousedown: 'mouseup',
			touchstart: 'touchend',
			pointerdown: 'touchend',
			MSPointerDown: 'touchend'
		},
		MOVE: {
			mousedown: 'mousemove',
			touchstart: 'touchmove',
			pointerdown: 'touchmove',
			MSPointerDown: 'touchmove'
		}
	},

	initialize: function (element, dragStartTarget) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
	},

	enable: function () {
		if (this._enabled) {
			return;
		}

		sop.DomEvent.on(this._dragStartTarget, sop.Draggable.START.join(' '), this._onDown, this);

		this._enabled = true;
	},

	disable: function () {
		if (!this._enabled) {
			return;
		}

		sop.DomEvent.off(this._dragStartTarget, sop.Draggable.START.join(' '), this._onDown, this);

		this._enabled = false;
		this._moved = false;
	},

	_onDown: function (e) {
		this._moved = false;

		if (e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) {
			return;
		}

		sop.DomEvent.stopPropagation(e);

		if (sop.Draggable._disabled) {
			return;
		}

		sop.DomUtil.disableImageDrag();
		sop.DomUtil.disableTextSelection();

		if (this._moving) {
			return;
		}

		this.fire('down');

		var first = e.touches ? e.touches[0] : e;

		this._startPoint = new sop.Point(first.clientX, first.clientY);
		this._startPos = this._newPos = sop.DomUtil.getPosition(this._element);
		//this._mousePos=newPoint;
		sop.DomEvent
			.on(document, sop.Draggable.MOVE[e.type], this._onMove, this)
			.on(document, sop.Draggable.END[e.type], this._onUp, this);
	},

	_onMove: function (e) {
		if (e.touches && e.touches.length > 1) {
			this._moved = true;
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
			newPoint = new sop.Point(first.clientX, first.clientY),
			offset = newPoint.subtract(this._startPoint);

		if (!offset.x && !offset.y) {
			return;
		}
		if (sop.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) {
			return;
		}

		sop.DomEvent.preventDefault(e);

		if (!this._moved) {
			this.fire('dragstart');

			this._moved = true;
			this._startPos = sop.DomUtil.getPosition(this._element).subtract(offset);

			sop.DomUtil.addClass(document.body, 'sop-dragging');

			this._lastTarget = e.target || e.srcElement;
			sop.DomUtil.addClass(this._lastTarget, 'sop-drag-target');
		}

		this._newPos = this._startPos.add(offset);
		this._moving = true;

		sop.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = sop.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
	},

	_updatePosition: function () {
		this.fire('predrag');
		sop.DomUtil.setPosition(this._element, this._newPos);
		this.fire('drag');
	},

	_onUp: function () {
		sop.DomUtil.removeClass(document.body, 'sop-dragging');

		if (this._lastTarget) {
			sop.DomUtil.removeClass(this._lastTarget, 'sop-drag-target');
			this._lastTarget = null;
		}

		for (var i in sop.Draggable.MOVE) {
			sop.DomEvent
				.off(document, sop.Draggable.MOVE[i], this._onMove, this)
				.off(document, sop.Draggable.END[i], this._onUp, this);
		}

		sop.DomUtil.enableImageDrag();
		sop.DomUtil.enableTextSelection();

		if (this._moved && this._moving) {
			// ensure drag is not fired after dragend
			sop.Util.cancelAnimFrame(this._animRequest);

			this.fire('dragend', {
				distance: this._newPos.distanceTo(this._startPos)
			});
		}
		this._moving = false;
	}
});


/*
	sop.Handler is a base class for handler classes that are used internally to inject
	interaction features like dragging to classes like Map and Marker.
*/

/**
 * @class
 * @augments sop.Class
 * @abstract
 * @param map 지도객체
 */
sop.Handler = sop.Class.extend(/** @lends sop.Handler.prototype */ {
	initialize: function (map) {
		this._map = map;
	},

	/**
	 * 핸들러 활성화.
	 */
	enable: function () {
		if (this._enabled) { return; }

		this._enabled = true;
		this.addHooks();
	},

	/**
	 * 핸들러 비활성화.
	 */
	disable: function () {
		if (!this._enabled) { return; }

		this._enabled = false;
		this.removeHooks();
	},

	/**
	 * 핸들러 활성화 여부 확인.
	 * @returns {boolean} 활성화 결과
	 */
	enabled: function () {
		return !!this._enabled;
	}
});


/*
 * sop.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
 */

sop.Map.mergeOptions({
	dragging: true,

	inertia: !sop.Browser.android23,
	inertiaDeceleration: 3400, // px/s^2
	inertiaMaxSpeed: Infinity, // px/s
	inertiaThreshold: sop.Browser.touch ? 32 : 18, // ms
	easeLinearity: 0.25,

	// TODO refactor, move to CRS
	worldCopyJump: false
});

sop.Map.Drag = sop.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new sop.Draggable(map._mapPane, map._container);

			this._draggable.on({
				down: this._onDown,
				dragstart: this._onDragStart,
				drag: this._onDrag,
				dragend: this._onDragEnd
			}, this);

			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDrag, this);
				map.on('viewreset', this._onViewReset, this);

				map.whenReady(this._onViewReset, this);
			}
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDown: function () {
		if (this._map._panAnim) {
			this._map._panAnim.stop();
		}
	},

	_onDragStart: function () {
		var map = this._map;

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	},

	_onDrag: function () {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			if (time - this._times[0] > 200) {
				this._positions.shift();
				this._times.shift();
			}
		}

		this._map
		    .fire('move')
		    .fire('drag');
	},

	_onViewReset: function () {
		var pxCenter = this._map.getSize().divideBy(2),
		    pxWorldCenter = this._map.utmkToLayerPoint([0, 0]);

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
	},

	_onPreDrag: function () {
		// TODO refactor to be able to adjust map pane position after zoom
		var worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function (e) {
		var map = this._map,
		    options = map.options,
		    delay = +new Date() - this._lastTime,

		    noInertia = !options.inertia || delay > options.inertiaThreshold || !this._positions[0];

		map.fire('dragend', e);

		if (noInertia) {
			map.fire('moveend');

		} else {

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime + delay - this._times[0]) / 1000,
			    ease = options.easeLinearity,

			    speedVector = direction.multiplyBy(ease / duration),
			    speed = speedVector.distanceTo([0, 0]),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

			if (!offset.x || !offset.y) {
				map.fire('moveend');

			} else {
				offset = map._limitOffset(offset, map.options.maxBounds);

				sop.Util.requestAnimFrame(function () {
					map.panBy(offset, {
						duration: decelerationDuration,
						easeLinearity: ease,
						noMoveStart: true
					});
				});
			}
		}
	}
});

sop.Map.addInitHook('addHandler', 'dragging', sop.Map.Drag);


/*
 * sop.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */

sop.Map.mergeOptions({
	doubleClickZoom: true
});

sop.Map.DoubleClickZoom = sop.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick, this);
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick, this);
	},

	_onDoubleClick: function (e) {
		var map = this._map,
		    zoom = map.getZoom() + (e.originalEvent.shiftKey ? -1 : 1);

		if (map.options.doubleClickZoom === 'center') {
			map.setZoom(zoom);
		} else {
			map.setZoomAround(e.containerPoint, zoom);
		}
	}
});

sop.Map.addInitHook('addHandler', 'doubleClickZoom', sop.Map.DoubleClickZoom);


/*
 * sop.Handler.ScrollWheelZoom is used by sop.Map to enable mouse scroll wheel zoom on the map.
 */

sop.Map.mergeOptions({
	scrollWheelZoom: true
});

sop.Map.ScrollWheelZoom = sop.Handler.extend({
	addHooks: function () {
		sop.DomEvent.on(this._map._container, {
			mousewheel: this._onWheelScroll,
			MozMousePixelScroll: sop.DomEvent.preventDefault
		}, this);

		this._delta = 0;
	},

	removeHooks: function () {
		sop.DomEvent.off(this._map._container, {
			mousewheel: this._onWheelScroll,
			MozMousePixelScroll: sop.DomEvent.preventDefault
		}, this);
	},

	_onWheelScroll: function (e) {
		var delta = sop.DomEvent.getWheelDelta(e);

		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		var left = Math.max(40 - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(sop.bind(this._performZoom, this), left);

		sop.DomEvent.stop(e);
	},

	_performZoom: function () {
		var map = this._map,
		    delta = this._delta,
		    zoom = map.getZoom();

		delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;
		this._startTime = null;

		if (!delta) { return; }

		if (map.options.scrollWheelZoom === 'center') {
			map.setZoom(zoom + delta);
		} else {
			map.setZoomAround(this._lastMousePos, zoom + delta);
		}
	}
});

sop.Map.addInitHook('addHandler', 'scrollWheelZoom', sop.Map.ScrollWheelZoom);


/*
 * Extends the event handling code with double tap support for mobile browsers.
 */

sop.extend(sop.DomEvent, {

	_touchstart: sop.Browser.msPointer ? 'MSPointerDown' : sop.Browser.pointer ? 'pointerdown' : 'touchstart',
	_touchend: sop.Browser.msPointer ? 'MSPointerUp' : sop.Browser.pointer ? 'pointerup' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last, touch,
		    doubleTap = false,
		    delay = 250,
		    trackedTouches = [];

		function onTouchStart(e) {
			var count;

			if (sop.Browser.pointer) {
				trackedTouches.push(e.pointerId);
				count = trackedTouches.length;
			} else {
				count = e.touches.length;
			}

			if (count > 1) { return; }

			var now = Date.now(),
			    delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}

		function onTouchEnd(e) {
			if (sop.Browser.pointer) {
				var idx = trackedTouches.indexOf(e.pointerId);
				if (idx === -1) { return; }
				trackedTouches.splice(idx, 1);
			}

			if (doubleTap) {
				if (sop.Browser.pointer) {
					// work around .type being readonly with MSPointer* events
					var newTouch = {},
						prop, i;

					for (i in touch) {
						prop = touch[i];
						newTouch[i] = prop && prop.bind ? prop.bind(touch) : prop;
					}
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}

		var pre = '_sop_',
		    touchstart = this._touchstart,
		    touchend = this._touchend;

		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		// on pointer we need to listen on the document, otherwise a drag starting on the map and moving off screen
		// will not come through to us, so we will lose track of how many touches are ongoing
		var endElement = sop.Browser.pointer ? document.documentElement : obj;

		obj.addEventListener(touchstart, onTouchStart, false);

		endElement.addEventListener(touchend, onTouchEnd, false);
		if (sop.Browser.pointer) {
			endElement.addEventListener(sop.DomEvent.POINTER_CANCEL, onTouchEnd, false);
		}

		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_sop_',
		    endElement = sop.Browser.pointer ? document.documentElement : obj,
		    touchend = obj[pre + this._touchend + id];

		obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);

		endElement.removeEventListener(this._touchend, touchend, false);
		if (sop.Browser.pointer) {
			endElement.removeEventListener(sop.DomEvent.POINTER_CANCEL, touchend, false);
		}

		return this;
	}
});


/*
 * Extends sop.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
 */

sop.extend(sop.DomEvent, {

	POINTER_DOWN:   sop.Browser.msPointer ? 'MSPointerDown'   : 'pointerdown',
	POINTER_MOVE:   sop.Browser.msPointer ? 'MSPointerMove'   : 'pointermove',
	POINTER_UP:     sop.Browser.msPointer ? 'MSPointerUp'     : 'pointerup',
	POINTER_CANCEL: sop.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',

	_pointers: {},

	// Provides a touch events wrapper for (ms)pointer events.
	// ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	addPointerListener: function (obj, type, handler, id) {

		if (type === 'touchstart') {
			this._addPointerStart(obj, handler, id);

		} else if (type === 'touchmove') {
			this._addPointerMove(obj, handler, id);

		} else if (type === 'touchend') {
			this._addPointerEnd(obj, handler, id);
		}

		return this;
	},

	removePointerListener: function (obj, type, id) {
		var handler = obj['_sop_' + type + id];

		if (type === 'touchstart') {
			obj.removeEventListener(this.POINTER_DOWN, handler, false);

		} else if (type === 'touchmove') {
			obj.removeEventListener(this.POINTER_MOVE, handler, false);

		} else if (type === 'touchend') {
			obj.removeEventListener(this.POINTER_UP, handler, false);
			obj.removeEventListener(this.POINTER_CANCEL, handler, false);
		}

		return this;
	},

	_addPointerStart: function (obj, handler, id) {
		var onDown = sop.bind(function (e) {
			sop.DomEvent.preventDefault(e);

			this._pointers[e.pointerId] = e;
			this._handlePointer(e, handler);
		}, this);

		obj['_sop_touchstart' + id] = onDown;
		obj.addEventListener(this.POINTER_DOWN, onDown, false);

		// need to also listen for end events to keep the _pointers object accurate
		if (!this._pointerDocListener) {
			var removePointer = sop.bind(function (e) {
				delete this._pointers[e.pointerId];
			}, this);

			// we listen documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener(this.POINTER_UP, removePointer, false);
			document.documentElement.addEventListener(this.POINTER_CANCEL, removePointer, false);

			this._pointerDocListener = true;
		}
	},

	_handlePointer: function (e, handler) {
		e.touches = [];
		for (var i in this._pointers) {
			e.touches.push(this._pointers[i]);
		}
		e.changedTouches = [e];

		handler(e);
	},

	_addPointerMove: function (obj, handler, id) {
		var onMove = sop.bind(function (e) {
			// don't fire touch moves when mouse isn't down
			if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

			this._pointers[e.pointerId] = e;
			this._handlePointer(e, handler);
		}, this);

		obj['_sop_touchmove' + id] = onMove;
		obj.addEventListener(this.POINTER_MOVE, onMove, false);
	},

	_addPointerEnd: function (obj, handler, id) {
		var onUp = sop.bind(function (e) {
			delete this._pointers[e.pointerId];
			this._handlePointer(e, handler);
		}, this);

		obj['_sop_touchend' + id] = onUp;
		obj.addEventListener(this.POINTER_UP, onUp, false);
		obj.addEventListener(this.POINTER_CANCEL, onUp, false);
	}
});


/*
 * sop.Handler.TouchZoom is used by sop.Map to add pinch zoom on supported mobile browsers.
 */

sop.Map.mergeOptions({
	touchZoom: sop.Browser.touch && !sop.Browser.android23,
	bounceAtZoomLimits: true
});

sop.Map.TouchZoom = sop.Handler.extend({
	addHooks: function () {
		sop.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		sop.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]),
		    viewCenter = map._getCenterLayerPoint();

		this._startCenter = p1.add(p2)._divideBy(2);
		this._startDist = p1.distanceTo(p2);

		this._moved = false;
		this._zooming = true;

		this._centerOffset = viewCenter.subtract(this._startCenter);

		if (map._panAnim) {
			map._panAnim.stop();
		}

		sop.DomEvent
		    .on(document, 'touchmove', this._onTouchMove, this)
		    .on(document, 'touchend', this._onTouchEnd, this);

		sop.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

		var map = this._map,
		    p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]);

		this._scale = p1.distanceTo(p2) / this._startDist;
		this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

		if (!map.options.bounceAtZoomLimits &&
		    ((map.getZoom() === map.getMinZoom() && this._scale < 1) ||
		     (map.getZoom() === map.getMaxZoom() && this._scale > 1))) { return; }

		if (!this._moved) {
			map
			    .fire('movestart')
			    .fire('zoomstart');

			this._moved = true;
		}

		sop.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = sop.Util.requestAnimFrame(this._updateOnMove, this, true, this._map._container);

		sop.DomEvent.preventDefault(e);
	},

	_updateOnMove: function () {
		var map = this._map;

		if (map.options.touchZoom === 'center') {
			this._center = map.getCenter();
		} else {
			this._center = map.layerPointToUTMK(this._getTargetCenter());
		}
		this._zoom = map.getScaleZoom(this._scale);

		map._animateZoom(this._center, this._zoom);
	},

	_onTouchEnd: function () {
		if (!this._moved || !this._zooming) {
			this._zooming = false;
			return;
		}

		this._zooming = false;
		sop.Util.cancelAnimFrame(this._animRequest);

		sop.DomEvent
		    .off(document, 'touchmove', this._onTouchMove)
		    .off(document, 'touchend', this._onTouchEnd);

		var map = this._map,
		    oldZoom = map.getZoom(),
		    zoomDelta = this._zoom - oldZoom,
		    finalZoom = map._limitZoom(oldZoom + (zoomDelta > 0 ? Math.ceil(zoomDelta) : Math.floor(zoomDelta)));

		map._animateZoom(this._center, finalZoom, true);
	},

	_getTargetCenter: function () {
		var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale);
		return this._startCenter.add(centerOffset);
	}
});

sop.Map.addInitHook('addHandler', 'touchZoom', sop.Map.TouchZoom);


/*
 * sop.Map.Tap is used to enable mobile hacks like quick taps and long hold.
 */

sop.Map.mergeOptions({
	tap: true,
	tapTolerance: 15
});

sop.Map.Tap = sop.Handler.extend({
	addHooks: function () {
		sop.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
	},

	removeHooks: function () {
		sop.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
	},

	_onDown: function (e) {
		if (!e.touches) { return; }

		sop.DomEvent.preventDefault(e);

		this._fireClick = true;

		// don't simulate click or track longpress if more than 1 touch
		if (e.touches.length > 1) {
			this._fireClick = false;
			clearTimeout(this._holdTimeout);
			return;
		}

		var first = e.touches[0],
		    el = first.target;

		this._startPos = this._newPos = new sop.Point(first.clientX, first.clientY);

		// if touching a link, highlight it
		if (el.tagName && el.tagName.toLowerCase() === 'a') {
			sop.DomUtil.addClass(el, 'sop-active');
		}

		// simulate long hold but setting a timeout
		this._holdTimeout = setTimeout(sop.bind(function () {
			if (this._isTapValid()) {
				this._fireClick = false;
				this._onUp();
				this._simulateEvent('contextmenu', first);
			}
		}, this), 1000);
		
		this._simulateEvent('mousedown', first);

		sop.DomEvent.on(document, {
			touchmove: this._onMove,
			touchend: this._onUp
		}, this);
	},

	_onUp: function (e) {
		clearTimeout(this._holdTimeout);

		sop.DomEvent.off(document, {
			touchmove: this._onMove,
			touchend: this._onUp
		}, this);

		if (this._fireClick && e && e.changedTouches) {

			var first = e.changedTouches[0],
			    el = first.target;

			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
				sop.DomUtil.removeClass(el, 'sop-active');
			}
			
			this._simulateEvent('mouseup', first);

			// simulate click if the touch didn't move too much
			if (this._isTapValid()) {
				this._simulateEvent('click', first);
			}
		}
	},

	_isTapValid: function () {
		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	},

	_onMove: function (e) {
		var first = e.touches[0];
		this._newPos = new sop.Point(first.clientX, first.clientY);
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent._simulated = true;
		e.target._simulatedClick = true;

		simulatedEvent.initMouseEvent(
		        type, true, true, window, 1,
		        e.screenX, e.screenY,
		        e.clientX, e.clientY,
		        false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});

if (sop.Browser.touch && !sop.Browser.pointer) {
	sop.Map.addInitHook('addHandler', 'tap', sop.Map.Tap);
}


/*
 * sop.Handler.ShiftDragZoom is used to add shift-drag zoom interaction to the map
  * (zoom to a selected bounding box), enabled by default.
 */

sop.Map.mergeOptions({
	boxZoom: true
});

sop.Map.BoxZoom = sop.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	addHooks: function () {
		sop.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		sop.DomEvent.off(this._container, 'mousedown', this._onMouseDown, this);
	},

	moved: function () {
		return this._moved;
	},

	_onMouseDown: function (e) {
		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		this._moved = false;

		sop.DomUtil.disableTextSelection();
		sop.DomUtil.disableImageDrag();

		this._startPoint = this._map.mouseEventToContainerPoint(e);

		sop.DomEvent.on(document, {
			contextmenu: sop.DomEvent.stop,
			mousemove: this._onMouseMove,
			mouseup: this._onMouseUp,
			keydown: this._onKeyDown
		}, this);
	},

	_onMouseMove: function (e) {
		if (!this._moved) {
			this._moved = true;

			this._box = sop.DomUtil.create('div', 'sop-zoom-box', this._container);
			sop.DomUtil.addClass(this._container, 'sop-crosshair');

			this._map.fire('boxzoomstart');
		}

		this._point = this._map.mouseEventToContainerPoint(e);

		var bounds = new sop.Bounds(this._point, this._startPoint),
		    size = bounds.getSize();

		sop.DomUtil.setPosition(this._box, bounds.min);

		this._box.style.width  = size.x + 'px';
		this._box.style.height = size.y + 'px';
	},

	_finish: function () {
		if (this._moved) {
			sop.DomUtil.remove(this._box);
			sop.DomUtil.removeClass(this._container, 'sop-crosshair');
		}

		sop.DomUtil.enableTextSelection();
		sop.DomUtil.enableImageDrag();

		sop.DomEvent.off(document, {
			contextmenu: sop.DomEvent.stop,
			mousemove: this._onMouseMove,
			mouseup: this._onMouseUp,
			keydown: this._onKeyDown
		}, this);
	},

	_onMouseUp: function (e) {
		if ((e.which !== 1) && (e.button !== 1)) { return false; }

		this._finish();

		if (!this._moved) { return; }

		var bounds = new sop.UTMKBounds(
		        this._map.containerPointToUTMK(this._startPoint),
		        this._map.containerPointToUTMK(this._point));

		this._map
			.fitBounds(bounds)
			.fire('boxzoomend', {boxZoomBounds: bounds});
	},

	_onKeyDown: function (e) {
		if (e.keyCode === 27) {
			this._finish();
		}
	}
});

sop.Map.addInitHook('addHandler', 'boxZoom', sop.Map.BoxZoom);


/*
 * sop.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
 */

sop.Map.mergeOptions({
	keyboard: true,
	keyboardPanOffset: 80,
	keyboardZoomOffset: 1
});

sop.Map.Keyboard = sop.Handler.extend({

	keyCodes: {
		left:    [37],
		right:   [39],
		down:    [40],
		up:      [38],
		zoomIn:  [187, 107, 61, 171],
		zoomOut: [189, 109, 173]
	},

	initialize: function (map) {
		this._map = map;

		this._setPanOffset(map.options.keyboardPanOffset);
		this._setZoomOffset(map.options.keyboardZoomOffset);
	},

	addHooks: function () {
		var container = this._map._container;

		// make the container focusable by tabbing
		if (container.tabIndex === -1) {
			container.tabIndex = '0';
		}

		sop.DomEvent.on(container, {
		    focus: this._onFocus,
		    blur: this._onBlur,
		    mousedown: this._onMouseDown
		}, this);

		this._map.on({
			focus: this._addHooks,
		    blur: this._removeHooks
		}, this);
	},

	removeHooks: function () {
		this._removeHooks();

		sop.DomEvent.off(this._map._container, {
		    focus: this._onFocus,
		    blur: this._onBlur,
		    mousedown: this._onMouseDown
		}, this);

		this._map.off({
			focus: this._addHooks,
		    blur: this._removeHooks
		}, this);
	},

	_onMouseDown: function () {
		if (this._focused) { return; }

		var body = document.body,
		    docEl = document.documentElement,
		    top = body.scrollTop || docEl.scrollTop,
		    left = body.scrollLeft || docEl.scrollLeft;

		this._map._container.focus();

		window.scrollTo(left, top);
	},

	_onFocus: function () {
		this._focused = true;
		this._map.fire('focus');
	},

	_onBlur: function () {
		this._focused = false;
		this._map.fire('blur');
	},

	_setPanOffset: function (pan) {
		var keys = this._panKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.left.length; i < len; i++) {
			keys[codes.left[i]] = [-1 * pan, 0];
		}
		for (i = 0, len = codes.right.length; i < len; i++) {
			keys[codes.right[i]] = [pan, 0];
		}
		for (i = 0, len = codes.down.length; i < len; i++) {
			keys[codes.down[i]] = [0, pan];
		}
		for (i = 0, len = codes.up.length; i < len; i++) {
			keys[codes.up[i]] = [0, -1 * pan];
		}
	},

	_setZoomOffset: function (zoom) {
		var keys = this._zoomKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
			keys[codes.zoomIn[i]] = zoom;
		}
		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
			keys[codes.zoomOut[i]] = -zoom;
		}
	},

	_addHooks: function () {
		sop.DomEvent.on(document, 'keydown', this._onKeyDown, this);
	},

	_removeHooks: function () {
		sop.DomEvent.off(document, 'keydown', this._onKeyDown, this);
	},

	_onKeyDown: function (e) {
		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

		var key = e.keyCode,
		    map = this._map;

		if (key in this._panKeys) {

			if (map._panAnim && map._panAnim._inProgress) { return; }

			map.panBy(this._panKeys[key]);

			if (map.options.maxBounds) {
				map.panInsideBounds(map.options.maxBounds);
			}

		} else if (key in this._zoomKeys) {
			map.setZoom(map.getZoom() + this._zoomKeys[key]);

		} else {
			return;
		}

		sop.DomEvent.stop(e);
	}
});

sop.Map.addInitHook('addHandler', 'keyboard', sop.Map.Keyboard);


/*
 * sop.Handler.MarkerDrag is used internally by sop.Marker to make the markers draggable.
 */

sop.Handler.MarkerDrag = sop.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;

		if (!this._draggable) {
			this._draggable = new sop.Draggable(icon, icon);
		}

		this._draggable.on({
			dragstart: this._onDragStart,
			drag: this._onDrag,
			dragend: this._onDragEnd
		}, this).enable();

		sop.DomUtil.addClass(icon, 'sop-marker-draggable');
	},

	removeHooks: function () {
		this._draggable.off({
			dragstart: this._onDragStart,
			drag: this._onDrag,
			dragend: this._onDragEnd
		}, this).disable();

		sop.DomUtil.removeClass(this._marker._icon, 'sop-marker-draggable');
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		this._marker
			.closeInfoWindow()
			.fire('movestart')
			.fire('dragstart');

	},

	_onDrag: function () {
		var marker = this._marker,
			shadow = marker._shadow,
			iconPos = sop.DomUtil.getPosition(marker._icon),
			utmk = marker._map.layerPointToUTMK(iconPos);

		// update shadow position
		if (shadow) {
			sop.DomUtil.setPosition(shadow, iconPos);
		}

		marker._utmk = utmk;

		marker
			.fire('move', {utmk: utmk})
			.fire('drag');

		//markerCaption
		if (marker.captionObj) {
			marker.captionObj._updateCaptionPos(utmk);
		}
	},

	_onDragEnd: function (e) {
		this._marker
			.fire('moveend')
			.fire('dragend', e);
	}
});


/**
 * sop.Control
 * 지도 컨트롤러를 나타내는 최상위 클래스.
 * 컨트롤러 추가, 제거 위치를 설정한다.
 */

sop.Control = sop.Class.extend({
	options: {
		position: 'topright'
	},

	initialize: function (options) {
		sop.setOptions(this, options);
	},

	getPosition: function () {
		return this.options.position;
	},

	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	getContainer: function () {
		return this._container;
	},

	addTo: function (map) {
		this._map = map;

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		sop.DomUtil.addClass(container, 'sop-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}

		return this;
	},

	remove: function () {
		sop.DomUtil.remove(this._container);

		if (this.onRemove) {
			this.onRemove(this._map);
		}

		this._map = null;

		return this;
	},

	_refocusOnMap: function () {
		if (this._map) {
			this._map.getContainer().focus();
		}
	}
});

sop.control = function (options) {
	return new sop.Control(options);
};


// adds control-related methods to sop.Map

sop.Map.include({
	addControl: function (control) {
		control.addTo(this);
		return this;
	},

	removeControl: function (control) {
		control.remove();
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
		    l = 'sop-',
		    container = this._controlContainer =
		            sop.DomUtil.create('div', l + 'control-container', this._container);

		function createCorner(vSide, hSide) {
			var className = l + vSide + ' ' + l + hSide;

			corners[vSide + hSide] = sop.DomUtil.create('div', className, container);
		}

		createCorner('top', 'left');
		createCorner('top', 'right');
		createCorner('bottom', 'left');
		createCorner('bottom', 'right');
	},

	_clearControlPos: function () {
		sop.DomUtil.remove(this._controlContainer);
	}
});


sop.Control.Zoomslider = sop.Control.extend({

	options: {
		position: 'topright',
		//Zoom Bar의 높이
		sliderHeight: 180,
		//Zoom Bar의 한칸 높이
		stepHeight: 9,
		styleNS: 'sop-control-zoomSlider',
		zoomInfo: {
			1: '전국',
			3: '도',
			5: '시군구',
			8: '동리',
			11: '거리'
//			13: '새주소'
		}
	},

	onAdd: function (map) {
		this._map = map;
		this._ui = this._createUI();
		this._sliderDrag = new sop.Control.Zoomslider.Drag(this._ui.slider,
			this.options.stepHeight
		);
		map.whenReady(this._initSliderDrag, this)
			.whenReady(this._initEvents, this)
			.whenReady(this._updateSize, this)
			.whenReady(this._updateSliderDragValue, this)
			.whenReady(this._updateBarValue, this)
			.whenReady(this._updateDisabled, this);
		return this._ui.bar;
	},

	onRemove: function (map) {
		map.off('zoomlevelschange', this._updateSize, this)
			.off('zoomend zoomlevelschange', this._updateSliderDragValue, this)
			.off('zoomend zoomlevelschange', this._updateBarValue, this)
			.off('zoomend zoomlevelschange', this._updateDisabled, this);
	},

	_createUI: function () {
		var ui = {},
			ns = this.options.styleNS;

		ui.bar = sop.DomUtil.create('div', ns + ' sop-bar');
		ui.zoomIn = this._createZoomBtn('in', 'top', ui.bar);
		ui.wrap = sop.DomUtil.create('div', ns + '-wrap sop-bar-part', ui.bar);
		ui.zoomOut = this._createZoomBtn('out', 'bottom', ui.bar);
		ui.deactiveBar = sop.DomUtil.create('div', ns + '-bar-deactive', ui.wrap);
		ui.activeBar = sop.DomUtil.create('div', ns + '-bar-active', ui.wrap);
		ui.slider = sop.DomUtil.create('div', ns + '-slider');

		// levelInfo UI 추가
		// StatisticTileLayer 에서만 사용함.
		if (this._zoomLevels() === 14) {
			if (this._map.statisticTileLayer) {
				this._createLevelInfoUI(ui, ns);
			}
		}

		sop.DomUtil.addClass(ui.zoomIn, 'sop-control-background');
		sop.DomUtil.addClass(ui.zoomOut, 'sop-control-background');
		sop.DomUtil.addClass(ui.deactiveBar, 'sop-control-background');
		sop.DomUtil.addClass(ui.activeBar, 'sop-control-background');
		sop.DomUtil.addClass(ui.slider, 'sop-control-background');

		//this._setZoomLevelInfo();

		sop.DomEvent.disableClickPropagation(ui.bar);
		sop.DomEvent.disableClickPropagation(ui.slider);

		return ui;
	},

	_createLevelInfoUI: function (rootObj, ns) {
		var lInfoPosition, match, level, className;

		lInfoPosition = this.getPosition();
		match = lInfoPosition.match(/left|right/);
		if (match) {
			lInfoPosition = match[0];
		}

		className = ns + '-bar-levelInfo-' + lInfoPosition;
		rootObj.levelInfo = sop.DomUtil.create('div', className, rootObj.bar);
		rootObj.levelInfo.style.display = 'none';
		for (level in this.options.zoomInfo) {
			rootObj.levelInfo[level] = sop.DomUtil.create('div', className + '-' + level, rootObj.levelInfo);
			sop.DomUtil.addClass(rootObj.levelInfo[level], ns + '-bar-levelInfo-background');
			rootObj.levelInfo[level].style.position = 'absolute';
			var _y = this.options.stepHeight * (this._zoomLevels() - 1 - level) - 1;
			sop.DomUtil.setPosition(rootObj.levelInfo[level], sop.point(0, _y));
		}
	},

	_createZoomBtn: function (zoomDir, end, container) {
		var classDef = this.options.styleNS + '-' + zoomDir + ' sop-bar-part' + ' sop-bar-part-' + end,
			link = sop.DomUtil.create('a', classDef, container);

		link.href = '#';
		link.title = 'Zoom ' + zoomDir;

		sop.DomEvent.on(link, 'click', sop.DomEvent.preventDefault);

		return link;
	},

	_initSliderDrag: function () {
		this._sliderDrag.enable();
		this._ui.deactiveBar.appendChild(this._ui.slider);
	},

	_initEvents: function () {
		this._map
			.on('zoomlevelschange', this._updateSize, this)
			.on('zoomend zoomlevelschange', this._updateSliderDragValue, this)
			.on('zoomend zoomlevelschange', this._updateBarValue, this)
			//zoom mousedown에 대한 clearIntoerval 처리
			.on('mouseup', this._clearInterval, this)
			.on('drag', this._clearInterval, this)
			.on('zoomend zoomlevelschange', this._updateDisabled, this);

		sop.DomEvent.on(this._ui.deactiveBar, 'click', this._onSliderClick, this);
		sop.DomEvent.on(this._ui.activeBar, 'click', this._onSliderClick, this);
		sop.DomEvent.on(this._ui.zoomIn, 'click mousedown', this._zoomIn, this);
		sop.DomEvent.on(this._ui.zoomOut, 'click mousedown', this._zoomOut, this);
		sop.DomEvent.on(this._ui.zoomIn, 'drag', this._clearInterval, this);
		sop.DomEvent.on(this._ui.zoomOut, 'drag', this._clearInterval, this);

		this._sliderDrag.on('drag', this._updateMapZoom, this);

		//mouseover zoomlevelInfo show/hide
		sop.DomEvent.on(this._ui.wrap, 'mouseover', this._showZoomLevelInfo, this);
		sop.DomEvent.on(this._ui.wrap, 'mouseout', this._hideZoomlevelInfo, this);

		sop.DomEvent.on(window, 'resize', this._browserResize, this);
		sop.DomEvent.on(window, 'onload', this._browserResize, this);
	},

	_onSliderClick: function (e) {
		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
			y = sop.DomEvent.getMousePosition(first, this._ui.deactiveBar).y;
		this._sliderDrag.setPosition(y);
		this._updateMapZoom();
	},

	_clearInterval: function () {
		window.clearTimeout(this._interval);
		delete this._interval;
	},

	_zoomIn: function (e) {
		if (typeof e === 'number') {
			this._map.zoomIn(1);
			return;
		}

		if (e.type === 'click') {
			if (!this._mDown) {
				//alert('1');
				this._map.zoomIn(e.shiftKey ? 3 : 1);
			}
		} else if (e.type === 'mousedown') {
			this._mDown = false;
			this._interval = setInterval(sop.Util.bind(function () {
				//zoomIn,zoomOut의 길게 mousedown와 click구분하기 위한 변수선언
				this._mDown = true;
				this._zoomIn(1);
			}, this), 500);
		}
	},
	_zoomOut: function (e) {
		if (typeof e === 'number') {
			this._map.zoomOut(1);
			return;
		}

		if (e.type === 'click') {
			if (!this._mDown) {
				//alert('1');
				this._map.zoomOut(e.shiftKey ? 3 : 1);
			}
		} else if (e.type === 'mousedown') {
			this._mDown = false;
			this._interval = setInterval(sop.Util.bind(function () {
				//zoomIn,zoomOut의 길게 mousedown와 click구분하기 위한 변수선언
				this._mDown = true;
				this._zoomOut(1);
			}, this), 500);
		}
	},

	_zoomLevels: function () {
		var zoomLevels = this._map.getMaxZoom() - this._map.getMinZoom() + 1;
		return zoomLevels < Infinity ? zoomLevels : 0;
	},

	_showZoomLevelInfo: function () {
		if (this._ui.levelInfo) {
			this._ui.levelInfo.style.display = 'block';
		}
	},

	_hideZoomlevelInfo: function () {
		if (this._ui.levelInfo) {
			this._ui.levelInfo.style.display = 'none';
		}
	},

	_toZoomLevel: function (value) {
		return value + this._map.getMinZoom();
	},

	_toValue: function (zoomLevel) {
		return zoomLevel - this._map.getMinZoom();
	},

	_updateSize: function () {
		var steps = this._zoomLevels();
		this._sliderDrag.setSteps(steps);
	},

	_updateMapZoom: function (e) {
		var sliderValue = this._sliderDrag.getValue();
		var zoom = this._toZoomLevel(sliderValue);
		this._updateBarValue(zoom);
		var mapAnimate = typeof e === 'object' ? false : true;
		this._map.setZoom(zoom, {animate: mapAnimate});
	},

	_updateSliderDragValue: function () {
		this._sliderDrag.setValue(this._toValue(this._map.getZoom()));
	},

	_updateBarValue: function (_zoom) {
		//_zoom 타입이 object는 +,- 버튼을 눌렀을때 zoomelevel change로 등록된 event 호출
		var z = typeof _zoom === 'object' ? this._map.getZoom() : _zoom,
			h = this.options.stepHeight;
		this._ui.deactiveBar.style.height = h * (this._map.getMaxZoom() - z + 1) + 'px';
		this._ui.activeBar.style.height = h * (z - this._map.getMinZoom() + 1) + 'px';
	},

	_updateDisabled: function () {
		var zoomLevel = this._map.getZoom(),
			className = this.options.styleNS + '-disabled';

		sop.DomUtil.removeClass(this._ui.zoomIn, className);
		sop.DomUtil.removeClass(this._ui.zoomOut, className);

		if (zoomLevel === this._map.getMinZoom()) {
			sop.DomUtil.addClass(this._ui.zoomOut, className);
		}
		if (zoomLevel === this._map.getMaxZoom()) {
			sop.DomUtil.addClass(this._ui.zoomIn, className);
		}
	},
	_browserResize: function () {
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		if (width < 500 || height < 500) {
			this._ui.wrap.style.display = 'none';
		} else {
			this._ui.wrap.style.display = 'block';
		}
	}
});

sop.Map.mergeOptions({
	zoomControl: false,
	zoomSliderControl: true
});

sop.Map.addInitHook(function () {
	if (this.options.zoomSliderControl) {
		this.zoomSliderControl = new sop.Control.Zoomslider();
		this.addControl(this.zoomSliderControl);
	}

});

sop.control.zoomSlider = function (options) {
	return  new sop.Control.Zoomslider(options);
};



sop.Control.Zoomslider.Drag = sop.Draggable.extend({

	initialize: function (element, stepHeight) {
		sop.Draggable.prototype.initialize.call(this, element, element);
		this._element = element;
		this._stepHeight = stepHeight;
		this._lastY = '';
		this.on('predrag', function () {
			this._newPos.x = 0;
			this._newPos.y = this._adjust(this._newPos.y);
		}, this);
	},

	_adjust: function (y) {
		var value = Math.ceil(this._toValue(y));
		value = Math.max(0, Math.min(this._maxValue, value));
		return this._toY(value);
	},

	//y좌표 계산
	_toY: function (value) {
		return this._k * (this._maxValue - value) + this._m / 2;// + this._m;
	},

	//zoom값 계산
	_toValue: function (y) {
		return this._maxValue - (y - this._m / 2) / this._k;
	},

	setSteps: function (steps) {
		this._maxValue = steps - 1;
		this._k = this._stepHeight;
		this._m = this._element.clientHeight;
	},

	setPosition: function (y) {
		sop.DomUtil.setPosition(this._element,
			sop.point(0, this._adjust(y)));
	},

	setValue: function (v) {
		//v는 set 해야하는 zoomlevel
		this.setPosition(this._toY(v));
	},

	getValue: function () {
		return this._toValue(sop.DomUtil.getPosition(this._element).y);
	}
});

/**
 * sop.Control.Attribution
 * 지도에 속성을 나타냄. (지도 출처 및 라이센스를 화면에 나타 낼 수 있음.)
 */

sop.Control.Attribution = sop.Control.extend({
	options: {
		position: 'bottomright'
	},

	initialize: function (options) {
		sop.setOptions(this, options);

		this._attributions = {};
	},

	onAdd: function (map) {
		this._container = sop.DomUtil.create('div', 'sop-control-attribution');
		sop.DomEvent.disableClickPropagation(this._container);

		// 정의된 prefix가 없을 경우에 통계청 이미지를 prefix로 사용함.
		if (!this.options.prefix) {
			var prefix = '<a style=color:#ffffff; href="http://kostat.go.kr" title="통계청">';
			prefix += '<div class="sop-control-background"';
			prefix += 'style="background-position: -78px -316px;';
			prefix += 'width: 55px; height: 15px; margin: 5px 0;"></div>';
			this.options.prefix = prefix;
		}

		// TODO ugly, refactor
		for (var i in map._layers) {
			if (map._layers[i].getAttribution) {
				this.addAttribution(map._layers[i].getAttribution());
			}
		}

		this._update();

		return this._container;
	},

	setPrefix: function (prefix) {
		this.options.prefix = prefix;
		this._update();
		return this;
	},

	addAttribution: function (text) {
		if (!text) { return; }

		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;

		this._update();

		return this;
	},

	removeAttribution: function (text) {
		if (!text) { return; }

		if (this._attributions[text]) {
			this._attributions[text]--;
			this._update();
		}

		return this;
	},

	_update: function () {
		if (!this._map) { return; }

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions[i]) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];

		if (this.options.prefix) {
			prefixAndAttribs.push(this.options.prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' | ');
	}
});

sop.Map.mergeOptions({
	attributionControl: true
});

sop.Map.addInitHook(function () {
	if (this.options.attributionControl) {
		this.attributionControl = (new sop.Control.Attribution()).addTo(this);
	}
});

sop.control.attribution = function (options) {
	return new sop.Control.Attribution(options);
};


/**
 * sop.Control.Scale
 * 지도 레벨별 스케일을 화면에 나타냄. 지도의 미터(metric) 값을 표출 함.
*/

sop.Control.Scale = sop.Control.extend({
	options: {
		position: 'bottomleft',
		maxWidth: 50,
		updateWhenIdle: true
	},

	onAdd: function (map) {
		var className = 'sop-control-scale',
		    container = sop.DomUtil.create('div', className),
		    options = this.options;

		this._addScales(options, className, container);

		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		map.whenReady(this._update, this);

		return container;
	},

	onRemove: function (map) {
		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	},

	_addScales: function (options, className, container) {
		// metric을 나타낼 html Tag 설정.
		this._mScaleTitle = sop.DomUtil.create('div', className + '-title', container);
		this._mScale = sop.DomUtil.create('div', className + '-image', container);
		sop.DomUtil.addClass(this._mScale, 'sop-control-background');

	},

	_update: function () {
		var map = this._map,
		y = map.getSize().y / 2;

		// CRS.UTMK를 이용하여 두 좌표간의 거리를 구한다.
		var maxMeters = sop.CRS.UTMK.distance(
			map.containerPointToUTMK([0, y]),
			map.containerPointToUTMK([this.options.maxWidth, y]));

		this._updateScales(maxMeters);
	},

	_updateScales: function (maxMeters) {
		if (maxMeters) {
			this._updateMetric(maxMeters);
		}
	},

	_updateMetric: function (maxMeters) {
		var label = (maxMeters < 2000) ? Math.round(maxMeters) + 'm' :
		Math.round((maxMeters / 1000)) + 'km';
		this._mScaleTitle.innerHTML = label;
	}
});

sop.Map.mergeOptions({
	scale: false
});

sop.Map.addInitHook(function () {
	if (this.options.scale) {
		this.scale = new sop.Control.Scale();
		this.addControl(this.scale);
	}
});

sop.control.scale = function (options) {
	return new sop.Control.Scale(options);
};

/**
 *  sop.Control.Pan
 *  마우스를 이용하여 지도 레이어 이동을 제어 한다.
 */

sop.Control.Pan = sop.Control.extend({

	options: {
		position: 'topleft',
		panInfo: {
			panup: {
				desc: '위로 이동',
				origin: sop.point(25, 6)
			},
			panleft: {
				desc: '왼쪽으로 이동',
				origin: sop.point(8, 23)
			},
			panright: {
				desc: '오른쪽으로 이동',
				origin: sop.point(44, 23)
			},
			pandown: {
				desc: '아래로 이동',
				origin: sop.point(25, 44)
			}
		}
	},

	onAdd: function (map) {
		var className = 'sop-control-pan',
		container = sop.DomUtil.create('div', className),
		options = this.options;

		sop.DomUtil.addClass(container, 'sop-control-background');

		this._addPanButton(options.panInfo.panup, className + '-up', container);
		this._addPanButton(options.panInfo.panleft, className + '-left', container);
		this._addPanButton(options.panInfo.panright, className + '-right', container);
		this._addPanButton(options.panInfo.pandown, className + '-down', container);

		sop.DomEvent
			.on(container, 'click mousedown dblclick ', sop.DomEvent.stopPropagation);
		// 지도에 팬컨트롤러가 로딩 되었을때 실행 할 콜백 함수 가 없다.
		map.whenReady(sop.Util.falseFn, this);

		return container;
	},

	onRemove: function (map) {
		var controlContainer = sop.DomUtil.get(map._controlCorners.topleft);
		if (sop.DomUtil.hasClass(controlContainer, 'sop-control-pan')) {
			sop.DomUtil.removeClass(controlContainer, 'sop-control-pan');
		}
	},

	_mouseDown: function (e) {
		var eleInfo = this.options.panInfo, moveVal = 20;

		this._moveX = this._moveX ||  0;
		this._moveY = this._moveY ||  0;

		if (sop.Browser.ielt9) {
			this._eleTarget = this._eleTarget || e.srcElement;
		}
		else {
			this._eleTarget = e.target;
		}

		if (eleInfo.panup.element === this._eleTarget) {
			this._moveY -= moveVal;
		}
		else if (eleInfo.panleft.element === this._eleTarget) {
			this._moveX -= moveVal;
		}
		else if (eleInfo.panright.element === this._eleTarget) {
			this._moveX += moveVal;
		}
		else if (eleInfo.pandown.element === this._eleTarget) {
			this._moveY += moveVal;
		}

		this._pressTimeoutId = setTimeout(sop.bind(this._mouseDown, this, e), 100);
		this._map.panBy(sop.point(this._moveX, this._moveY));
	},

	_mouseUp: function () {
		clearTimeout(this._pressTimeoutId);
		this._moveX = 0;
		this._moveY = 0;
		delete this._eleTarget;
	},

	_click: function () {
		this._map.panBy(sop.point(50, 50));
	},

	_addPanButton: function (panInfo, className, container) {
		var eleB = sop.DomUtil.create('div', className, container);
		sop.DomUtil.addClass(eleB, 'sop-control-background');
		eleB.style.position = 'absolute';
		sop.DomUtil.setPosition(eleB, panInfo.origin, true);

		sop.DomEvent
		    .on(eleB, 'click mousedown dblclick mouseup', sop.DomEvent.stopPropagation)
		    .on(eleB, 'mousedown mouseup', sop.DomEvent.stop)
		    .on(eleB, 'mousedown', this._mouseDown, this)
		    .on(eleB, 'mouseup mouseleave', this._mouseUp, this)
		    .on(eleB, 'mousedown mouseup', this._refocusOnMap, this);

		panInfo.element = eleB;
	}
});

sop.Map.mergeOptions({
	panControl: false
});

sop.Map.addInitHook(function () {
	// 모바일일 경우 팬컨트롤러를 사용하지 않음.
	if (!sop.Browser.mobile && this.options.panControl) {
		this.panControl = new sop.Control.Pan();
		this.addControl(this.panControl);
	}
});

sop.control.pan = function (options) {
	return new sop.Control.Pan(options);
};


/**
 * sop.Control.Layers
 * 사용자가 지도 레이어를 변경 할 수 있게 인터페이스를 제공 한다.
 */

sop.Control.Layers = sop.Control.extend({
	options: {
		collapsed: true,
		position: 'topright',
		autoZIndex: true
	},

	initialize: function (baseLayers, overlays, options) {
		sop.setOptions(this, options);

		this._layers = {};
		this._lastZIndex = 0;
		this._handlingClick = false;

		for (var i in baseLayers) {
			this._addLayer(baseLayers[i], i);
		}

		for (i in overlays) {
			this._addLayer(overlays[i], i, true);
		}
	},

	onAdd: function () {
		this._initLayout();
		this._update();

		return this._container;
	},

	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		return this._update();
	},

	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		return this._update();
	},

	removeLayer: function (layer) {
		layer.off('add remove', this._onLayerChange, this);

		delete this._layers[sop.stamp(layer)];
		return this._update();
	},

	_initLayout: function () {
		var className = 'sop-control-layers',
		    container = this._container = sop.DomUtil.create('div', className);

		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		if (!sop.Browser.touch) {
			sop.DomEvent
				.disableClickPropagation(container)
				.disableScrollPropagation(container);
		} else {
			sop.DomEvent.on(container, 'click', sop.DomEvent.stopPropagation);
		}

		var form = this._form = sop.DomUtil.create('form', className + '-list');

		if (this.options.collapsed) {
			if (!sop.Browser.android) {
				sop.DomEvent.on(container, {
					mouseenter: this._expand,
					mouseleave: this._collapse
				}, this);
			}

			var link = this._layersLink = sop.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';

			if (sop.Browser.touch) {
				sop.DomEvent
				    .on(link, 'click', sop.DomEvent.stop)
				    .on(link, 'click', this._expand, this);
			} else {
				sop.DomEvent.on(link, 'focus', this._expand, this);
			}

			// work around for Firefox Android issue https://github.com/Leaflet/Leaflet/issues/2033
			sop.DomEvent.on(form, 'click', function () {
				setTimeout(sop.bind(this._onInputClick, this), 0);
			}, this);

			this._map.on('click', this._collapse, this);
			// TODO keyboard accessibility
		} else {
			this._expand();
		}

		this._baseLayersList = sop.DomUtil.create('div', className + '-base', form);
		this._separator = sop.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = sop.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},

	_addLayer: function (layer, name, overlay) {
		layer.on('add remove', this._onLayerChange, this);

		var id = sop.stamp(layer);

		this._layers[id] = {
			layer: layer,
			name: name,
			overlay: overlay
		};

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}
	},

	_update: function () {
		if (!this._container) { return; }

		sop.DomUtil.empty(this._baseLayersList);
		sop.DomUtil.empty(this._overlaysList);

		var baseLayersPresent, overlaysPresent, i, obj;

		for (i in this._layers) {
			obj = this._layers[i];
			this._addItem(obj);
			overlaysPresent = overlaysPresent || obj.overlay;
			baseLayersPresent = baseLayersPresent || !obj.overlay;
		}

		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

		return this;
	},

	_onLayerChange: function (e) {
		if (!this._handlingClick) {
			this._update();
		}

		var overlay = this._layers[sop.stamp(e.target)].overlay;

		var type = overlay ?
			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
			(e.type === 'add' ? 'baselayerchange' : null);

		if (type) {
			this._map.fire(type, e.target);
		}
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createRadioElement: function (name, checked) {

		var radioHtml = '<input type="radio" class="sop-control-layers-selector" name="' +
				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_addItem: function (obj) {
		var label = document.createElement('label'),
		    checked = this._map.hasLayer(obj.layer),
		    input;

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'sop-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('sop-base-layers', checked);
		}

		input.layerId = sop.stamp(obj.layer);

		sop.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		label.appendChild(input);
		label.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);

		return label;
	},

	_onInputClick: function () {
		var inputs = this._form.getElementsByTagName('input'),
		    input, layer, hasLayer;

		this._handlingClick = true;

		for (var i = 0, len = inputs.length; i < len; i++) {
			input = inputs[i];
			layer = this._layers[input.layerId].layer;
			hasLayer = this._map.hasLayer(layer);

			if (input.checked && !hasLayer) {
				this._map.addLayer(layer);

			} else if (!input.checked && hasLayer) {
				this._map.removeLayer(layer);
			}
		}

		this._handlingClick = false;

		this._refocusOnMap();
	},

	_expand: function () {
		sop.DomUtil.addClass(this._container, 'sop-control-layers-expanded');
	},

	_collapse: function () {
		sop.DomUtil.removeClass(this._container, 'sop-control-layers-expanded');
	}
});

sop.control.layers = function (baseLayers, overlays, options) {
	return new sop.Control.Layers(baseLayers, overlays, options);
};


/**
 * Created by neighbor on 2014-07-28.
 */


sop.Control.Measure = {};

sop.Control.Measure.Overlay = sop.Class.extend({

	initialize: function (map) {
		this._map = map;
		//control 초기화 처음엔 false
		this._activated = false;
		//'_infoWindow' LayerGorup을 담는 Group
		this._infoWindowGroup = new sop.LayerGroup();
	},

	_isActivated: function () {
		return this._activated;
	},

	setActivate: function (activated) {
		this._activated = activated;
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


/**
 * Created by neighbor on 2014-07-28.
 */

sop.Control.Measure.Distance = sop.Control.Measure.Overlay.extend({
	//polyline Option
	shapeOptions: {
		stroke: true,
		color: '#6799FF',
		weight: 4,
		opacity: 0.7,
		fill: false
	},

	//guide polyline Option
	guideOptions: {
		stroke: true,
		color: '#6799FF',
		weight: 4,
		opacity: 0.3,
		fill: false,
		renderer: sop.canvas(),
		clickable: false
	},

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
		this._switchOnButton();

	},

	deactivated: function (e) {
		//마지막 클릭 marker 추가
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

	//button 클릭시 이미지 변경 On
	_switchOnButton: function () {
		//distance control 버튼 이벤트
		sop.DomUtil.removeClass(this.ui, 'sop-distance-out');
		sop.DomUtil.addClass(this.ui, 'sop-distance-selected');
	},

	//button 클릭시 이미지 변경 Off
	_switchOffButton: function () {
		sop.DomUtil.removeClass(this.ui, 'sop-distance-selected');
		sop.DomUtil.addClass(this.ui, 'sop-distance-out');
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

			for(var i=0; i<this._distanceGorup.length;i++){
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

		//this._guideLine.onRemove();
		this._guideLine.setUTMKs([]);

		this._polyline = null;

		//guideline Canvas 마우스 포인터 변경 class 제거
		sop.DomUtil.removeClass(this._guideLine._renderer._container, 'sop-clickable');

		//마지막마커 추가후 최종 Polyline의 거리를 구한다.
		var totalDistance = 0;
		for (var i=0; i< this._distanceGorup.length;i++) {
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
			return '<font color="red">' + Math.floor(_meter)+ '</font> m';
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
		//contentHtml += '<tr><td>도보</td><td class="sop-masure-infoValue">' + byWalkValue + '</td></tr>';
		//contentHtml += '<tr><td>자전거</td><td class="sop-masure-infoValue">' + byBikeValue + '</td></tr>';
		contentHtml += '</table>';
		return contentHtml;
	}

});



/**
 * Created by neighbor on 2014-07-28.
 */
sop.Control.Measure.Area = sop.Control.Measure.Overlay.extend({

	//polygon Option
	shapeOptions: {
		stroke: true,
		weight: 4,
		opacity: 0.6,
		fill: true,
		fillColor: null,
		fillOpacity: 0.3,
		color: '#F29661'
	},

	//Control 이름
	controlName: 'areaControl',

	initialize: function (map) {
		sop.Control.Measure.Overlay.prototype.initialize.call(this, map);
		//추가 되는 polyline 의 Group
		this._polygonGroup = new sop.LayerGroup();
		//'_marker' LayerGorup을 담는 Group
		this._markersGroup = new sop.LayerGroup();
	},

	//Control Button 이미지 생성
	_createUI: function (element) {
		this.ui = {};
		this.ui = sop.DomUtil.create('div', 'sop-area-out', element);
		sop.DomUtil.addClass(this.ui, 'sop-control-background');

		return this.ui;
	},

	activated: function () {
		this.setActivate(true);
		this.initMeasureEvents();

		//Switch On Button Style Set
		this._switchOnButton();

	},

	deactivated: function (e) {
		//마지막 클릭 marker 추가
		if (this._polygon) {
			if (this._polygon.getUTMKs().length > 0) {
				this._endVector(e);
			}
		}

		this.setActivate(false);
		this.removeMeasureEvents();

		//Switch Off Button Style Set
		this._switchOffButton();
	},

	onRemove: function () {
		this._polygonGroup.clearLayers();
		this._markersGroup.clearLayers();
		this._infoWindowGroup.clearLayers();
		if (this._markers) {
			this._markers.clearLayers();
		}
	},

	initVector: function () {
		// polygon 객체 생성
		this._polygon = new sop.Polygon([], this.shapeOptions);

		//markers 의 LayerGroup
		this._markers = new sop.LayerGroup();

		this._polygonGroup.addLayer(this._polygon);
		this._markersGroup.addLayer(this._markers);

		this._map.addLayer(this._polygonGroup);
		this._map.addLayer(this._markersGroup);
		this._map.addLayer(this._infoWindowGroup);
	},

	//button 클릭시 이미지 변경 On
	_switchOnButton: function () {
		sop.DomUtil.removeClass(this.ui, 'sop-area-out');
		sop.DomUtil.addClass(this.ui, 'sop-area-selected');
	},

	//button 클릭시 이미지 변경 Off
	_switchOffButton: function () {
		sop.DomUtil.removeClass(this.ui, 'sop-area-selected');
		sop.DomUtil.addClass(this.ui, 'sop-area-out');
	},

	//지도를 처음 클릭해서 시작되는 Event
	_startVector: function (e) {
		this.initVector();

		if (this._activated) {
			this._addMarker(e.utmk);
			if (this._markers.getLayers().length === 1) {
				this._polygon.addUTMK(this._mouseMarker.getUTMK());
				this._map.off('click', this._startVector, this);
				//mousemove Event에 발생시 polygon 업데이트 함수(_updateVector) 호출
				this._map.on('mousemove', this._updateVector, this);

				//infoWindow 초기화 객체
				this._initWindow(e.utmk);
				this._infoWindow._tipContainer.style.display = 'none';
			}
		}
	},

	_updateVector: function (e) {
		if (this._activated) {
			if (this._polygon.getUTMKs().length > 1) {
				//mousemove evnent 중에는 polygon 좌표배열의 마지막 좌표를 제거하고 현재 이벤트 좌표를 추가한다.
				//mousemove 의 polygon 동적 draw 가능
				this._polygon.spliceUTMKs(this._polygon.getUTMKs().length - 1, 1, e.utmk);
				//polygon 최상위레벨로 보이게하기
				this._polygon.bringToFront();
				//click Event에  _addVertex 이벤트 등록
				this._map.on('click', this._addVertex, this);

				//infowindow 위치및 내용 설정
				this._infoWindow.setUTMK(e.utmk);
				var infoContent = '<div class="sop-measusre-areaInfo">마우스 오른쪽 버튼을<br>누르면 마침&nbsp;';
				infoContent += '<span class="sop-measure-orangeemouse"></span></div>';
				this._infoWindow.setContent(infoContent);

			} else if (this._polygon.getUTMKs().length === 1) {

				this._polygon.addUTMK(e.utmk);
			}
		}
	},

	_addVertex: function (e) {
		if (this._activated) {
			this._polygon.addUTMK(e.utmk);
			//polygon 최상위레벨로 보이게하기
			this._polygon.bringToFront();
			this._polygon.redraw();
			this._addMarker(e.utmk);
		}
	},

	//Mouse 오른쪽 버튼 클릭시 마지막 마커 추가
	_endVector: function (e) {
		//면적계산 함수 호출
		var polyArea = this._getArea();

		var polyArray = this._polygon.getUTMKs();
		var endPos = e.utmk ? e.utmk : polyArray[polyArray.length - 1];

		this._polygon = null;

		//infoWindow 내용 설정
		this._infoWindow.setContent(this.setAreaInfo(polyArea));
		//text select 방지
		this._infoWindow._container.onselectstart = function () {
			return false;
		};
		this._infoWindow._container.onmousedown = function () {
			return false;
		};

		this._addMarker(endPos);
		this._addCloseButton(endPos);
	},

	//기본 마커 아이콘 설정
	_addMarker: function (utmk) {
		var markerIcon = sop.divIcon({
				className: 'sop-control-background sop-area-icon',
				iconAnchor: [5, 5],
				iconSize: [11, 11]
			}
		);
		//mouseMarker를 _markers LayerGroup에 추가해준다.
		this._mouseMarker = sop.marker(utmk, {
				icon: markerIcon
			}
		).addTo(this._markers);

		var zIndex = 900 + this._markers.getLayers().length;
		this._mouseMarker._zIndex = zIndex;
		this._mouseMarker._bringToFront();

		//mouseMarker setPos Override......
		this._mouseMarker._setPos = function (pos) {
			sop.DomUtil.setPosition(this._icon, pos);
			if (this._shadow) {
				sop.DomUtil.setPosition(this._shadow, pos);
			}
		};
	},

	_addCloseButton: function (utmk) {
		var closeIcon = sop.divIcon({
				className: 'sop-control-background sop-area-delete',
				iconAnchor: [-10, 5],
				iconSize: [18, 17]
			}
		);
		var _closeMarker = sop.marker(utmk, {icon: closeIcon}).addTo(this._markers);
		_closeMarker._bringToFront();
		//polygon의 closeButton 클릭시 선택한 polygon만 삭제하는 Event
		_closeMarker.on('click', function () {
			var markersGroupLayers = this._markersGroup.getLayers();
			for (var markersLayer in markersGroupLayers) {
				if (markersGroupLayers[markersLayer].hasLayer(_closeMarker)) {
					this._markersGroup.removeLayer(markersGroupLayers[markersLayer]);
					this._polygonGroup.removeLayer(this._polygonGroup.getLayers()[markersLayer]);
					this._infoWindowGroup.removeLayer(this._infoWindowGroup.getLayers()[markersLayer]);
				}
			}
		}, this);
	},

	//polyGon 면적계산
	_getArea: function () {
		var t = this._polygon.getUTMKs();
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
	},

	_getAreaTransformation: function (t) {
		//1km²= 1e6 = 1,000,000m²
		var e;
		return t > 1e6 ? (t /= 1e6, e = 'km²') : e = 'm²', {
			value: t.toFixed(3),
			unit: e
		};
	},

	_getAreaHtml: function (_areaObj) {
		if (_areaObj) {
			return '<font color="red">' + Math.floor(_areaObj.value) + '</font>' + _areaObj.unit;
		} else {
			return '<font color="red">0</font>m';
		}
	},

	setAreaInfo: function (_area) {
		var areaObj = this._getAreaTransformation(_area);
		var contentHtml = '<table class="sop-measure-infoWindow">';
		contentHtml += '<tr><td>총면적</td><td class="sop-masure-infoValue">' + this._getAreaHtml(areaObj) + '</td></tr>';
		contentHtml += '</table>';
		return contentHtml;
	}

});


/**
 * Created by neighbor on 2014-07-28.
 */
sop.Control.MeasureManager = sop.Control.extend({
	options: {
		position: 'topright'
	},

	initialize: function (options) {
		sop.Control.prototype.initialize.call(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		this._ui = this._createMeasureUI();

		//map.whenReady(this._initEvents, this);
		map.whenReady(this._initUIEvents, this);

		return this._ui.bar;
	},

	//Distance, Area 객체 생성
	addControl: function (control) {
		this.controlGroup = this.controlGroup || {};
		this.controlGroup[control.controlName] = control;
	},

	_createMeasureUI: function () {
		var ui = {},
			ns = this.options.styleNS;

		ui.bar = sop.DomUtil.create('div', ns + ' sop-bar');

		//controlGroup에 있는 객체만 ui생성한다.
		for (var controlObj in this.controlGroup) {
			ui[controlObj] = this.controlGroup[controlObj]._createUI(ui.bar);
			sop.DomEvent.on(ui[controlObj], 'click', this._changeButtonStatus, this);
		}

		ui.clear = sop.DomUtil.create('div', 'sop-clear-out', ui.bar);
		sop.DomUtil.addClass(ui.clear, 'sop-control-background');

		sop.DomEvent.disableClickPropagation(ui.bar);
		return ui;
	},

	_initUIEvents: function () {
		//clear 버튼에대한 Event 처리
		sop.DomEvent.on(this._ui.clear, 'click', this._changeButtonStatus, this);
	},

	_changeButtonStatus: function (e) {
		//event 발생된 elment 브라우저별 갖고오기
		if (sop.Browser.ielt9) {
			this._eleTarget = e.srcElement;
		}
		else {
			this._eleTarget = e.target;
		}

		//event가 발생된 eleTarget와 ui객체들중 같은 것 selectedTarget 값 삽입
		for (var uiObj in this._ui) {
			if (this._ui[uiObj] === this._eleTarget) {
				this.selectedTarget = uiObj;
			}
		}

		//직전에 눌렀던 버튼과 같은 버튼을 누르면 아무동작하지 않는다.
		if (this.oldSelectedTarget === this.selectedTarget) {
			if (this.selectedTarget == 'clear') {
				return;
			}
			if (this.controlGroup[this.selectedTarget]._isActivated()) {
				return;
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
				this.oldSelectedTarget = null;
				this.controlGroup[obj].onRemove();
			}
		}

		//현재 눌러진 Target을 저장한다.
		this.oldSelectedTarget = this.selectedTarget;
	}
});

sop.Map.mergeOptions({
	measureControl: true
});

sop.Map.addInitHook(function () {
	if (this.options.measureControl) {
		this.measureControl = new sop.Control.MeasureManager();
		this.measureControl.addControl(new sop.Control.Measure.Distance(this));
		this.measureControl.addControl(new sop.Control.Measure.Area(this));
		this.addControl(this.measureControl);
	}
});

sop.control.measureManager = function (options) {
	console.log('options', options);
	return  new sop.Control.MeasureManager(options);
};


/*
 * sop.PosAnimation is used by sop internally for pan animations.
 */

sop.PosAnimation = sop.Evented.extend({

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._newPos = newPos;

		this.fire('start');

		el.style[sop.DomUtil.TRANSITION] = 'all ' + (duration || 0.25) +
		        's cubic-bezier(0,0,' + (easeLinearity || 0.5) + ',1)';

		sop.DomEvent.on(el, sop.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
		sop.DomUtil.setPosition(el, newPos);

		// toggle reflow, Chrome flickers for some reason if you don't do this
		sop.Util.falseFn(el.offsetWidth);

		// there's no native way to track value updates of transitioned properties, so we imitate this
		this._stepTimer = setInterval(sop.bind(this._onStep, this), 50);
	},

	stop: function () {
		if (!this._inProgress) { return; }

		// if we just removed the transition property, the element would jump to its final position,
		// so we need to make it stay at the current position

                // Only setPosition if _getPos actually returns a valid position.
		this._newPos = this._getPos();
		if (this._newPos) {
		    sop.DomUtil.setPosition(this._el, this._newPos);
		}

		this._onTransitionEnd();
		sop.Util.falseFn(this._el.offsetWidth); // force reflow in case we are about to start a new animation
	},

	_onStep: function () {
		var stepPos = this._getPos();
		if (!stepPos) {
			this._onTransitionEnd();
			return;
		}
		// jshint camelcase: false
		// make sop.DomUtil.getPosition return intermediate position value during animation
		this._el._sop_pos = stepPos;

		this.fire('step');
	},

	// you can't easily get intermediate values of properties animated with CSS3 Transitions,
	// we need to parse computed style (in case of transform it returns matrix string)
	// IE11 에서 transform 값이 matrix3d여서 발생 버그 수정.
	_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,

	_getPos: function () {
		var left, top, matches,
		    el = this._el,
		    style = window.getComputedStyle(el);

		if (sop.Browser.any3d) {
			matches = style[sop.DomUtil.TRANSFORM].match(this._transformRe);
			if (!matches) { return; }

			if (style[sop.DomUtil.TRANSFORM].match(/matrix3d/) !== null) {
				left = parseFloat(matches[1]);
				top  = parseFloat(matches[2]);
			} else {
				left = parseFloat(matches[3]);
				top  = parseFloat(matches[4]);
			}
		} else {
			left = parseFloat(style.left);
			top  = parseFloat(style.top);
		}

		return new sop.Point(left, top, true);
	},

	_onTransitionEnd: function () {
		sop.DomEvent.off(this._el, sop.DomUtil.TRANSITION_END, this._onTransitionEnd, this);

		if (!this._inProgress) { return; }
		this._inProgress = false;

		this._el.style[sop.DomUtil.TRANSITION] = '';

		// jshint camelcase: false
		// make sure sop.DomUtil.getPosition returns the final position value after animation
		this._el._sop_pos = this._newPos;

		clearInterval(this._stepTimer);

		this.fire('step').fire('end');
	}

});


/*
 * Extends sop.Map to handle panning animations.
 */

sop.Map.include({

	setView: function (center, zoom, options) {

		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
		center = this._limitCenter(sop.utmk(center), zoom, this.options.maxBounds);
		options = options || {};

		if (this._panAnim) {
			this._panAnim.stop();
		}

		if (this._loaded && !options.reset && options !== true) {

			if (options.animate !== undefined) {
				options.zoom = sop.extend({animate: options.animate}, options.zoom);
				options.pan = sop.extend({animate: options.animate}, options.pan);
			}

			// try animating pan or zoom
			var animated = (this._zoom !== zoom) ?
				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
				this._tryAnimatedPan(center, options.pan);

			if (animated) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset, options) {
		offset = sop.point(offset).round();
		options = options || {};

		if (!offset.x && !offset.y) {
			return this;
		}
		//If we pan too far then chrome gets issues with tiles
		// and makes them disappear or appear in the wrong place (slightly offset) #2602
		if (options.animate !== true && !this.getSize().contains(offset)) {
			return this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
		}

		if (!this._panAnim) {
			this._panAnim = new sop.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			sop.DomUtil.addClass(this._mapPane, 'sop-pan-anim');

			var newPos = this._getMapPanePos().subtract(offset);
			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
		} else {
			this._rawPanBy(offset);
			this.fire('move').fire('moveend');
		}

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		sop.DomUtil.removeClass(this._mapPane, 'sop-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

		this.panBy(offset, options);

		return true;
	}
});


/*
 * sop.PosAnimation fallback implementation that powers sop pan animations
 * in browsers that don't support CSS3 Transitions.
 */

sop.PosAnimation = sop.DomUtil.TRANSITION ? sop.PosAnimation : sop.PosAnimation.extend({

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = sop.DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		this.fire('start');

		this._animate();
	},

	stop: function () {
		if (!this._inProgress) { return; }

		this._step();
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = sop.Util.requestAnimFrame(this._animate, this);
		this._step();
	},

	_step: function () {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration));
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		sop.DomUtil.setPosition(this._el, pos);

		this.fire('step');
	},

	_complete: function () {
		sop.Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});


/*
 * Extends sop.Map to handle zoom animations.
 */

sop.Map.mergeOptions({
	zoomAnimation: true,
	zoomAnimationThreshold: 4
});

var zoomAnimated = sop.DomUtil.TRANSITION && sop.Browser.any3d && !sop.Browser.mobileOpera;

if (zoomAnimated) {

	sop.Map.addInitHook(function () {
		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
		this._zoomAnimated = this.options.zoomAnimation;

		// zoom transitions run with the same duration for all layers, so if one of transitionend events
		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
		if (this._zoomAnimated) {
			sop.DomEvent.on(this._mapPane, sop.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
		}
	});
}

sop.Map.include(!zoomAnimated ? {} : {

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
			this._onZoomTransitionEnd();
		}
	},

	_nothingToAnimate: function () {
		return !this._container.getElementsByClassName('sop-zoom-animated').length;
	},

	_tryAnimatedZoom: function (center, zoom, options) {

		if (this._animatingZoom) { return true; }

		options = options || {};

		// don't animate if disabled, not supported or zoom difference is too large
		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

		// offset is the pixel coords of the zoom origin relative to the current center
		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

		sop.Util.requestAnimFrame(function () {
			this
			    .fire('movestart')
			    .fire('zoomstart')
			    ._animateZoom(center, zoom, true);
		}, this);

		return true;
	},

	_animateZoom: function (center, zoom, startAnim) {
		if (startAnim) {
			this._animatingZoom = true;

			// remember what center/zoom to set after animation
			this._animateToCenter = center;
			this._animateToZoom = zoom;

			// disable any dragging during animation
			if (sop.Draggable) {
				sop.Draggable._disabled = true;
			}

			sop.DomUtil.addClass(this._mapPane, 'sop-zoom-anim');
		}

		var scale = this.getZoomScale(zoom),
			origin = this._getCenterLayerPoint().add(this._getCenterOffset(center)._divideBy(1 - 1 / scale));

		this.fire('zoomanim', {
			center: center,
			zoom: zoom,
			origin: origin,
			scale: scale
		});
	},

	_onZoomTransitionEnd: function () {

		this._animatingZoom = false;

		sop.DomUtil.removeClass(this._mapPane, 'sop-zoom-anim');

		this._resetView(this._animateToCenter, this._animateToZoom, true, true);

		if (sop.Draggable) {
			sop.Draggable._disabled = false;
		}
	}
});


/**
 * Created by neighbor on 2014-07-28.
 */

sop.Caption = sop.Class.extend({

	options: {
		riseOffset: 900
	},

	initialize: function (layer, pos, options) {
		this._pos = pos;
		this._layer = layer;
		this._setCaption(options);
	},

	_getCaption: function () {
		return this._caption.title;
	},

	_setCaption: function (captionOption) {
		if (!captionOption) {
			throw new Error('CaptionOption not found.');
		}
		if (!captionOption.title) {
			throw new Error('Title is undefined');
		}

		this._caption = captionOption;
		this._updateCaption();
	},

	_updateCaption: function () {
		if (this._caption) {
			if (!this._captionDiv) {
				this._captionDiv = sop.DomUtil.create('div', 'sop-caption' + ' sop-zoom-animated', this._layer.getPane());
				this._captionspan = sop.DomUtil.create('span', 'sop-caption-span', this._captionDiv);
			}
			//title 문구 설정
			this._captionspan.innerHTML = this._caption.title;

			//captionDiv css 설정
			this._captionspan.style.backgroundColor = this._caption.backgroundColor || '';
			this._captionspan.style.color = this._caption.color || '#000000';
			this._captionspan.style.fontSize = this._caption.size || 9;
			this._captionspan.style.border = this._caption.border || '0px';
			this._captionspan.style.borderColor = this._caption.borderColor || '#000000';

			//Zoomlevel따라 보이는 Flag
			this._captionspan.showAllZoomLevel = this._caption.showAllZoomLevel || false;

			//text select 방지
			this._captionspan.onselectstart = function () {
				return false;
			};
			this._captionspan.onmousedown = function () {
				return false;
			};
			//captionDiv 위치 설정
			sop.DomUtil.setPosition(this._captionDiv, this._layer._map.utmkToLayerPoint(this._pos));
			this._captionspan.style.marginLeft = '-' + this._captionspan.offsetWidth / 2 + 'px';
			if (!this._caption.zIndex) {
				this._caption.zIndex = this.options.riseOffset;
			}
			this._updateZIndex(this._caption.zIndex);
		} else {
			this.removeCaption();
		}
	},

	_updateCaptionPos: function (utmkPos, event) {
		var point;
		if (this._caption) {
			if (!event) {
				point = this._layer._map.utmkToLayerPoint(utmkPos);
				sop.DomUtil.setPosition(this._captionDiv, point);
			}
			else {
				point = this._layer._map._utmkToNewLayerPoint(utmkPos, event.zoom, event.center).round();
				sop.DomUtil.setPosition(this._captionDiv, point);
				if (!this._captionspan.showAllZoomLevel) {
					//Zoom 레벨에 따라서 captionDiv show/hide 설정
					if (event.zoom < 5) {
						this._captionDiv.style.display = 'none';
					} else {
						this._captionDiv.style.display = 'block';
					}
				}
			}
		}
	},

	_removeCaption: function () {
		if (this._captionDiv) {
			sop.DomUtil.remove(this._captionDiv);
		}
		this._captionDiv = null;
		this._caption = null;
	},

	_updateZIndex: function (offset) {
		this._captionDiv.style.zIndex = offset;
	}

});


/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2014 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/v4.0.3/LICENSE
 */
(function(t,e){if(typeof define==="function"&&define.amd){define(e)}else if(typeof exports==="object"){module.exports=e()}else{t.returnExports=e()}})(this,function(){var t=Array.prototype;var e=Object.prototype;var r=Function.prototype;var n=String.prototype;var i=Number.prototype;var a=t.slice;var o=t.splice;var l=t.push;var u=t.unshift;var s=r.call;var f=e.toString;var c=function(t){return e.toString.call(t)==="[object Function]"};var h=function(t){return e.toString.call(t)==="[object RegExp]"};var p=function ve(t){return f.call(t)==="[object Array]"};var v=function ge(t){return f.call(t)==="[object String]"};var g=function ye(t){var e=f.call(t);var r=e==="[object Arguments]";if(!r){r=!p(t)&&t!==null&&typeof t==="object"&&typeof t.length==="number"&&t.length>=0&&c(t.callee)}return r};var y=Object.defineProperty&&function(){try{Object.defineProperty({},"x",{});return true}catch(t){return false}}();var d;if(y){d=function(t,e,r,n){if(!n&&e in t){return}Object.defineProperty(t,e,{configurable:true,enumerable:false,writable:true,value:r})}}else{d=function(t,e,r,n){if(!n&&e in t){return}t[e]=r}}var m=function(t,r,n){for(var i in r){if(e.hasOwnProperty.call(r,i)){d(t,i,r[i],n)}}};function w(t){t=+t;if(t!==t){t=0}else if(t!==0&&t!==1/0&&t!==-(1/0)){t=(t>0||-1)*Math.floor(Math.abs(t))}return t}function b(t){var e=typeof t;return t===null||e==="undefined"||e==="boolean"||e==="number"||e==="string"}function x(t){var e,r,n;if(b(t)){return t}r=t.valueOf;if(c(r)){e=r.call(t);if(b(e)){return e}}n=t.toString;if(c(n)){e=n.call(t);if(b(e)){return e}}throw new TypeError}var S=function(t){if(t==null){throw new TypeError("can't convert "+t+" to object")}return Object(t)};var O=function de(t){return t>>>0};function T(){}m(r,{bind:function me(t){var e=this;if(!c(e)){throw new TypeError("Function.prototype.bind called on incompatible "+e)}var r=a.call(arguments,1);var n=function(){if(this instanceof u){var n=e.apply(this,r.concat(a.call(arguments)));if(Object(n)===n){return n}return this}else{return e.apply(t,r.concat(a.call(arguments)))}};var i=Math.max(0,e.length-r.length);var o=[];for(var l=0;l<i;l++){o.push("$"+l)}var u=Function("binder","return function ("+o.join(",")+"){return binder.apply(this,arguments)}")(n);if(e.prototype){T.prototype=e.prototype;u.prototype=new T;T.prototype=null}return u}});var j=s.bind(e.hasOwnProperty);var E;var N;var I;var D;var _;if(_=j(e,"__defineGetter__")){E=s.bind(e.__defineGetter__);N=s.bind(e.__defineSetter__);I=s.bind(e.__lookupGetter__);D=s.bind(e.__lookupSetter__)}var M=function(){var t=[1,2];var e=t.splice();return t.length===2&&p(e)&&e.length===0}();m(t,{splice:function we(t,e){if(arguments.length===0){return[]}else{return o.apply(this,arguments)}}},M);var F=function(){var e={};t.splice.call(e,0,0,1);return e.length===1}();m(t,{splice:function be(t,e){if(arguments.length===0){return[]}var r=arguments;this.length=Math.max(w(this.length),0);if(arguments.length>0&&typeof e!=="number"){r=a.call(arguments);if(r.length<2){r.push(this.length-t)}else{r[1]=w(e)}}return o.apply(this,r)}},!F);var R=[].unshift(0)!==1;m(t,{unshift:function(){u.apply(this,arguments);return this.length}},R);m(Array,{isArray:p});var k=Object("a");var C=k[0]!=="a"||!(0 in k);var U=function xe(t){var e=true;var r=true;if(t){t.call("foo",function(t,r,n){if(typeof n!=="object"){e=false}});t.call([1],function(){"use strict";r=typeof this==="string"},"x")}return!!t&&e&&r};m(t,{forEach:function Se(t){var e=S(this),r=C&&v(this)?this.split(""):e,n=arguments[1],i=-1,a=r.length>>>0;if(!c(t)){throw new TypeError}while(++i<a){if(i in r){t.call(n,r[i],i,e)}}}},!U(t.forEach));m(t,{map:function Oe(t){var e=S(this),r=C&&v(this)?this.split(""):e,n=r.length>>>0,i=Array(n),a=arguments[1];if(!c(t)){throw new TypeError(t+" is not a function")}for(var o=0;o<n;o++){if(o in r){i[o]=t.call(a,r[o],o,e)}}return i}},!U(t.map));m(t,{filter:function Te(t){var e=S(this),r=C&&v(this)?this.split(""):e,n=r.length>>>0,i=[],a,o=arguments[1];if(!c(t)){throw new TypeError(t+" is not a function")}for(var l=0;l<n;l++){if(l in r){a=r[l];if(t.call(o,a,l,e)){i.push(a)}}}return i}},!U(t.filter));m(t,{every:function je(t){var e=S(this),r=C&&v(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!c(t)){throw new TypeError(t+" is not a function")}for(var a=0;a<n;a++){if(a in r&&!t.call(i,r[a],a,e)){return false}}return true}},!U(t.every));m(t,{some:function Ee(t){var e=S(this),r=C&&v(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!c(t)){throw new TypeError(t+" is not a function")}for(var a=0;a<n;a++){if(a in r&&t.call(i,r[a],a,e)){return true}}return false}},!U(t.some));var A=false;if(t.reduce){A=typeof t.reduce.call("es5",function(t,e,r,n){return n})==="object"}m(t,{reduce:function Ne(t){var e=S(this),r=C&&v(this)?this.split(""):e,n=r.length>>>0;if(!c(t)){throw new TypeError(t+" is not a function")}if(!n&&arguments.length===1){throw new TypeError("reduce of empty array with no initial value")}var i=0;var a;if(arguments.length>=2){a=arguments[1]}else{do{if(i in r){a=r[i++];break}if(++i>=n){throw new TypeError("reduce of empty array with no initial value")}}while(true)}for(;i<n;i++){if(i in r){a=t.call(void 0,a,r[i],i,e)}}return a}},!A);var P=false;if(t.reduceRight){P=typeof t.reduceRight.call("es5",function(t,e,r,n){return n})==="object"}m(t,{reduceRight:function Ie(t){var e=S(this),r=C&&v(this)?this.split(""):e,n=r.length>>>0;if(!c(t)){throw new TypeError(t+" is not a function")}if(!n&&arguments.length===1){throw new TypeError("reduceRight of empty array with no initial value")}var i,a=n-1;if(arguments.length>=2){i=arguments[1]}else{do{if(a in r){i=r[a--];break}if(--a<0){throw new TypeError("reduceRight of empty array with no initial value")}}while(true)}if(a<0){return i}do{if(a in r){i=t.call(void 0,i,r[a],a,e)}}while(a--);return i}},!P);var Z=Array.prototype.indexOf&&[0,1].indexOf(1,2)!==-1;m(t,{indexOf:function De(t){var e=C&&v(this)?this.split(""):S(this),r=e.length>>>0;if(!r){return-1}var n=0;if(arguments.length>1){n=w(arguments[1])}n=n>=0?n:Math.max(0,r+n);for(;n<r;n++){if(n in e&&e[n]===t){return n}}return-1}},Z);var J=Array.prototype.lastIndexOf&&[0,1].lastIndexOf(0,-3)!==-1;m(t,{lastIndexOf:function _e(t){var e=C&&v(this)?this.split(""):S(this),r=e.length>>>0;if(!r){return-1}var n=r-1;if(arguments.length>1){n=Math.min(n,w(arguments[1]))}n=n>=0?n:r-Math.abs(n);for(;n>=0;n--){if(n in e&&t===e[n]){return n}}return-1}},J);var z=!{toString:null}.propertyIsEnumerable("toString"),$=function(){}.propertyIsEnumerable("prototype"),G=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],B=G.length;m(Object,{keys:function Me(t){var e=c(t),r=g(t),n=t!==null&&typeof t==="object",i=n&&v(t);if(!n&&!e&&!r){throw new TypeError("Object.keys called on a non-object")}var a=[];var o=$&&e;if(i||r){for(var l=0;l<t.length;++l){a.push(String(l))}}else{for(var u in t){if(!(o&&u==="prototype")&&j(t,u)){a.push(String(u))}}}if(z){var s=t.constructor,f=s&&s.prototype===t;for(var h=0;h<B;h++){var p=G[h];if(!(f&&p==="constructor")&&j(t,p)){a.push(p)}}}return a}});var H=Object.keys&&function(){return Object.keys(arguments).length===2}(1,2);var L=Object.keys;m(Object,{keys:function Fe(e){if(g(e)){return L(t.slice.call(e))}else{return L(e)}}},!H);var X=-621987552e5;var Y="-000001";var q=Date.prototype.toISOString&&new Date(X).toISOString().indexOf(Y)===-1;m(Date.prototype,{toISOString:function Re(){var t,e,r,n,i;if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}n=this.getUTCFullYear();i=this.getUTCMonth();n+=Math.floor(i/12);i=(i%12+12)%12;t=[i+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];n=(n<0?"-":n>9999?"+":"")+("00000"+Math.abs(n)).slice(0<=n&&n<=9999?-4:-6);e=t.length;while(e--){r=t[e];if(r<10){t[e]="0"+r}}return n+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}},q);var K=false;try{K=Date.prototype.toJSON&&new Date(NaN).toJSON()===null&&new Date(X).toJSON().indexOf(Y)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(Q){}if(!K){Date.prototype.toJSON=function ke(t){var e=Object(this),r=x(e),n;if(typeof r==="number"&&!isFinite(r)){return null}n=e.toISOString;if(typeof n!=="function"){throw new TypeError("toISOString property is not callable")}return n.call(e)}}var V=Date.parse("+033658-09-27T01:46:40.000Z")===1e15;var W=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z"));var te=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));if(!Date.parse||te||W||!V){Date=function(t){function e(r,n,i,a,o,l,u){var s=arguments.length;if(this instanceof t){var f=s===1&&String(r)===r?new t(e.parse(r)):s>=7?new t(r,n,i,a,o,l,u):s>=6?new t(r,n,i,a,o,l):s>=5?new t(r,n,i,a,o):s>=4?new t(r,n,i,a):s>=3?new t(r,n,i):s>=2?new t(r,n):s>=1?new t(r):new t;f.constructor=e;return f}return t.apply(this,arguments)}var r=new RegExp("^"+"(\\d{4}|[+-]\\d{6})"+"(?:-(\\d{2})"+"(?:-(\\d{2})"+"(?:"+"T(\\d{2})"+":(\\d{2})"+"(?:"+":(\\d{2})"+"(?:(\\.\\d{1,}))?"+")?"+"("+"Z|"+"(?:"+"([-+])"+"(\\d{2})"+":(\\d{2})"+")"+")?)?)?)?"+"$");var n=[0,31,59,90,120,151,181,212,243,273,304,334,365];function i(t,e){var r=e>1?1:0;return n[e]+Math.floor((t-1969+r)/4)-Math.floor((t-1901+r)/100)+Math.floor((t-1601+r)/400)+365*(t-1970)}function a(e){return Number(new t(1970,0,1,0,0,0,e))}for(var o in t){e[o]=t[o]}e.now=t.now;e.UTC=t.UTC;e.prototype=t.prototype;e.prototype.constructor=e;e.parse=function l(e){var n=r.exec(e);if(n){var o=Number(n[1]),l=Number(n[2]||1)-1,u=Number(n[3]||1)-1,s=Number(n[4]||0),f=Number(n[5]||0),c=Number(n[6]||0),h=Math.floor(Number(n[7]||0)*1e3),p=Boolean(n[4]&&!n[8]),v=n[9]==="-"?1:-1,g=Number(n[10]||0),y=Number(n[11]||0),d;if(s<(f>0||c>0||h>0?24:25)&&f<60&&c<60&&h<1e3&&l>-1&&l<12&&g<24&&y<60&&u>-1&&u<i(o,l+1)-i(o,l)){d=((i(o,l)+u)*24+s+g*v)*60;d=((d+f+y*v)*60+c)*1e3+h;if(p){d=a(d)}if(-864e13<=d&&d<=864e13){return d}}return NaN}return t.parse.apply(this,arguments)};return e}(Date)}if(!Date.now){Date.now=function Ce(){return(new Date).getTime()}}var ee=i.toFixed&&(8e-5.toFixed(3)!=="0.000"||.9.toFixed(0)!=="1"||1.255.toFixed(2)!=="1.25"||0xde0b6b3a7640080.toFixed(0)!=="1000000000000000128");var re={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function Ue(t,e){var r=-1;while(++r<re.size){e+=t*re.data[r];re.data[r]=e%re.base;e=Math.floor(e/re.base)}},divide:function Ae(t){var e=re.size,r=0;while(--e>=0){r+=re.data[e];re.data[e]=Math.floor(r/t);r=r%t*re.base}},numToString:function Pe(){var t=re.size;var e="";while(--t>=0){if(e!==""||t===0||re.data[t]!==0){var r=String(re.data[t]);if(e===""){e=r}else{e+="0000000".slice(0,7-r.length)+r}}}return e},pow:function Ze(t,e,r){return e===0?r:e%2===1?Ze(t,e-1,r*t):Ze(t*t,e/2,r)},log:function Je(t){var e=0;while(t>=4096){e+=12;t/=4096}while(t>=2){e+=1;t/=2}return e}};m(i,{toFixed:function ze(t){var e,r,n,i,a,o,l,u;e=Number(t);e=e!==e?0:Math.floor(e);if(e<0||e>20){throw new RangeError("Number.toFixed called with invalid number of decimals")}r=Number(this);if(r!==r){return"NaN"}if(r<=-1e21||r>=1e21){return String(r)}n="";if(r<0){n="-";r=-r}i="0";if(r>1e-21){a=re.log(r*re.pow(2,69,1))-69;o=a<0?r*re.pow(2,-a,1):r/re.pow(2,a,1);o*=4503599627370496;a=52-a;if(a>0){re.multiply(0,o);l=e;while(l>=7){re.multiply(1e7,0);l-=7}re.multiply(re.pow(10,l,1),0);l=a-1;while(l>=23){re.divide(1<<23);l-=23}re.divide(1<<l);re.multiply(1,1);re.divide(2);i=re.numToString()}else{re.multiply(0,o);re.multiply(1<<-a,0);i=re.numToString()+"0.00000000000000000000".slice(2,2+e)}}if(e>0){u=i.length;if(u<=e){i=n+"0.0000000000000000000".slice(0,e-u+2)+i}else{i=n+i.slice(0,u-e)+"."+i.slice(u-e)}}else{i=n+i}return i}},ee);var ne=n.split;if("ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"test".split(/(?:)/,-1).length!==4||"".split(/.?/).length||".".split(/()()/).length>1){(function(){var e=/()??/.exec("")[1]===void 0;n.split=function(r,n){var i=this;if(r===void 0&&n===0){return[]}if(f.call(r)!=="[object RegExp]"){return ne.call(this,r,n)}var a=[],o=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.extended?"x":"")+(r.sticky?"y":""),l=0,u,s,c,h;r=new RegExp(r.source,o+"g");i+="";if(!e){u=new RegExp("^"+r.source+"$(?!\\s)",o)}n=n===void 0?-1>>>0:O(n);while(s=r.exec(i)){c=s.index+s[0].length;if(c>l){a.push(i.slice(l,s.index));if(!e&&s.length>1){s[0].replace(u,function(){for(var t=1;t<arguments.length-2;t++){if(arguments[t]===void 0){s[t]=void 0}}})}if(s.length>1&&s.index<i.length){t.push.apply(a,s.slice(1))}h=s[0].length;l=c;if(a.length>=n){break}}if(r.lastIndex===s.index){r.lastIndex++}}if(l===i.length){if(h||!r.test("")){a.push("")}}else{a.push(i.slice(l))}return a.length>n?a.slice(0,n):a}})()}else if("0".split(void 0,0).length){n.split=function $e(t,e){if(t===void 0&&e===0){return[]}return ne.call(this,t,e)}}var ie=n.replace;var ae=function(){var t=[];"x".replace(/x(.)?/g,function(e,r){t.push(r)});return t.length===1&&typeof t[0]==="undefined"}();if(!ae){n.replace=function Ge(t,e){var r=c(e);var n=h(t)&&/\)[*?]/.test(t.source);if(!r||!n){return ie.call(this,t,e)}else{var i=function(r){var n=arguments.length;var i=t.lastIndex;t.lastIndex=0;var a=t.exec(r);t.lastIndex=i;a.push(arguments[n-2],arguments[n-1]);return e.apply(this,a)};return ie.call(this,t,i)}}}var oe=n.substr;var le="".substr&&"0b".substr(-1)!=="b";m(n,{substr:function Be(t,e){return oe.call(this,t<0?(t=this.length+t)<0?0:t:t,e)}},le);var ue="	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003"+"\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff";var se="\u200b";var fe="["+ue+"]";var ce=new RegExp("^"+fe+fe+"*");var he=new RegExp(fe+fe+"*$");var pe=n.trim&&(ue.trim()||!se.trim());m(n,{trim:function He(){if(this===void 0||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(ce,"").replace(he,"")}},pe);if(parseInt(ue+"08")!==8||parseInt(ue+"0x16")!==22){parseInt=function(t){var e=/^0[xX]/;return function r(n,i){n=String(n).trim();if(!Number(i)){i=e.test(n)?16:10}return t(n,i)}}(parseInt)}});
// sourceMappingURL=es5-shim.map

!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.proj4=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var mgrs = _dereq_('mgrs');

function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0.0;
  }else if(typeof x === 'object'){
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0.0;
  } else if (typeof x === 'string' && typeof y === 'undefined') {
    var coords = x.split(',');
    this.x = parseFloat(coords[0], 10);
    this.y = parseFloat(coords[1], 10);
    this.z = parseFloat(coords[2], 10) || 0.0;
  }
  else {
    this.x = x;
    this.y = y;
    this.z = z || 0.0;
  }
  console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
}

Point.fromMGRS = function(mgrsStr) {
  return new Point(mgrs.toPoint(mgrsStr));
};
Point.prototype.toMGRS = function(accuracy) {
  return mgrs.forward([this.x, this.y], accuracy);
};
module.exports = Point;
},{"mgrs":66}],2:[function(_dereq_,module,exports){
var parseCode = _dereq_("./parseCode");
var extend = _dereq_('./extend');
var projections = _dereq_('./projections');
var deriveConstants = _dereq_('./deriveConstants');

function Projection(srsCode,callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  callback = callback || function(error){
    if(error){
      throw error;
    }
  };
  var json = parseCode(srsCode);
  if(typeof json !== 'object'){
    callback(srsCode);
    return;
  }
  var modifiedJSON = deriveConstants(json);
  var ourProj = Projection.projections.get(modifiedJSON.projName);
  if(ourProj){
    extend(this, modifiedJSON);
    extend(this, ourProj);
    this.init();
    callback(null, this);
  }else{
    callback(srsCode);
  }
}
Projection.projections = projections;
Projection.projections.start();
module.exports = Projection;

},{"./deriveConstants":32,"./extend":33,"./parseCode":36,"./projections":38}],3:[function(_dereq_,module,exports){
module.exports = function(crs, denorm, point) {
  var xin = point.x,
    yin = point.y,
    zin = point.z || 0.0;
  var v, t, i;
  for (i = 0; i < 3; i++) {
    if (denorm && i === 2 && point.z === undefined) {
      continue;
    }
    if (i === 0) {
      v = xin;
      t = 'x';
    }
    else if (i === 1) {
      v = yin;
      t = 'y';
    }
    else {
      v = zin;
      t = 'z';
    }
    switch (crs.axis[i]) {
    case 'e':
      point[t] = v;
      break;
    case 'w':
      point[t] = -v;
      break;
    case 'n':
      point[t] = v;
      break;
    case 's':
      point[t] = -v;
      break;
    case 'u':
      if (point[t] !== undefined) {
        point.z = v;
      }
      break;
    case 'd':
      if (point[t] !== undefined) {
        point.z = -v;
      }
      break;
    default:
      //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
      return null;
    }
  }
  return point;
};

},{}],4:[function(_dereq_,module,exports){
var HALF_PI = Math.PI/2;
var sign = _dereq_('./sign');

module.exports = function(x) {
  return (Math.abs(x) < HALF_PI) ? x : (x - (sign(x) * Math.PI));
};
},{"./sign":21}],5:[function(_dereq_,module,exports){
var TWO_PI = Math.PI * 2;
var sign = _dereq_('./sign');

module.exports = function(x) {
  return (Math.abs(x) < Math.PI) ? x : (x - (sign(x) * TWO_PI));
};
},{"./sign":21}],6:[function(_dereq_,module,exports){
module.exports = function(x) {
  if (Math.abs(x) > 1) {
    x = (x > 1) ? 1 : -1;
  }
  return Math.asin(x);
};
},{}],7:[function(_dereq_,module,exports){
module.exports = function(x) {
  return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)));
};
},{}],8:[function(_dereq_,module,exports){
module.exports = function(x) {
  return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)));
};
},{}],9:[function(_dereq_,module,exports){
module.exports = function(x) {
  return (0.05859375 * x * x * (1 + 0.75 * x));
};
},{}],10:[function(_dereq_,module,exports){
module.exports = function(x) {
  return (x * x * x * (35 / 3072));
};
},{}],11:[function(_dereq_,module,exports){
module.exports = function(a, e, sinphi) {
  var temp = e * sinphi;
  return a / Math.sqrt(1 - temp * temp);
};
},{}],12:[function(_dereq_,module,exports){
module.exports = function(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;

  phi = ml / e0;
  for (var i = 0; i < 15; i++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
  return NaN;
};
},{}],13:[function(_dereq_,module,exports){
var HALF_PI = Math.PI/2;

module.exports = function(eccent, q) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
    if (q < 0) {
      return (-1 * HALF_PI);
    }
    else {
      return HALF_PI;
    }
  }
  //var phi = 0.5* q/(1-eccent*eccent);
  var phi = Math.asin(0.5 * q);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i = 0; i < 30; i++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
  return NaN;
};
},{}],14:[function(_dereq_,module,exports){
module.exports = function(e0, e1, e2, e3, phi) {
  return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi));
};
},{}],15:[function(_dereq_,module,exports){
module.exports = function(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / (Math.sqrt(1 - con * con));
};
},{}],16:[function(_dereq_,module,exports){
var HALF_PI = Math.PI/2;
module.exports = function(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = HALF_PI - 2 * Math.atan(ts);
  for (var i = 0; i <= 15; i++) {
    con = eccent * Math.sin(phi);
    dphi = HALF_PI - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }
  //console.log("phi2z has NoConvergence");
  return -9999;
};
},{}],17:[function(_dereq_,module,exports){
var C00 = 1;
var C02 = 0.25;
var C04 = 0.046875;
var C06 = 0.01953125;
var C08 = 0.01068115234375;
var C22 = 0.75;
var C44 = 0.46875;
var C46 = 0.01302083333333333333;
var C48 = 0.00712076822916666666;
var C66 = 0.36458333333333333333;
var C68 = 0.00569661458333333333;
var C88 = 0.3076171875;

module.exports = function(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
};
},{}],18:[function(_dereq_,module,exports){
var pj_mlfn = _dereq_("./pj_mlfn");
var EPSLN = 1.0e-10;
var MAX_ITER = 20;
module.exports = function(arg, es, en) {
  var k = 1 / (1 - es);
  var phi = arg;
  for (var i = MAX_ITER; i; --i) { /* rarely goes over 2 iterations */
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
    //phi -= t * (t * Math.sqrt(t)) * k;
    t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
    phi -= t;
    if (Math.abs(t) < EPSLN) {
      return phi;
    }
  }
  //..reportError("cass:pj_inv_mlfn: Convergence error");
  return phi;
};
},{"./pj_mlfn":19}],19:[function(_dereq_,module,exports){
module.exports = function(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4]))));
};
},{}],20:[function(_dereq_,module,exports){
module.exports = function(eccent, sinphi) {
  var con;
  if (eccent > 1.0e-7) {
    con = eccent * sinphi;
    return ((1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con))));
  }
  else {
    return (2 * sinphi);
  }
};
},{}],21:[function(_dereq_,module,exports){
module.exports = function(x) {
  return x<0 ? -1 : 1;
};
},{}],22:[function(_dereq_,module,exports){
module.exports = function(esinp, exp) {
  return (Math.pow((1 - esinp) / (1 + esinp), exp));
};
},{}],23:[function(_dereq_,module,exports){
module.exports = function (array){
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length>2) {
    out.z = array[2];
  }
  if (array.length>3) {
    out.m = array[3];
  }
  return out;
};
},{}],24:[function(_dereq_,module,exports){
var HALF_PI = Math.PI/2;

module.exports = function(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow(((1 - con) / (1 + con)), com);
  return (Math.tan(0.5 * (HALF_PI - phi)) / con);
};
},{}],25:[function(_dereq_,module,exports){
exports.wgs84 = {
  towgs84: "0,0,0",
  ellipse: "WGS84",
  datumName: "WGS84"
};
exports.ch1903 = {
  towgs84: "674.374,15.056,405.346",
  ellipse: "bessel",
  datumName: "swiss"
};
exports.ggrs87 = {
  towgs84: "-199.87,74.79,246.62",
  ellipse: "GRS80",
  datumName: "Greek_Geodetic_Reference_System_1987"
};
exports.nad83 = {
  towgs84: "0,0,0",
  ellipse: "GRS80",
  datumName: "North_American_Datum_1983"
};
exports.nad27 = {
  nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
  ellipse: "clrk66",
  datumName: "North_American_Datum_1927"
};
exports.potsdam = {
  towgs84: "606.0,23.0,413.0",
  ellipse: "bessel",
  datumName: "Potsdam Rauenberg 1950 DHDN"
};
exports.carthage = {
  towgs84: "-263.0,6.0,431.0",
  ellipse: "clark80",
  datumName: "Carthage 1934 Tunisia"
};
exports.hermannskogel = {
  towgs84: "653.0,-212.0,449.0",
  ellipse: "bessel",
  datumName: "Hermannskogel"
};
exports.ire65 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "mod_airy",
  datumName: "Ireland 1965"
};
exports.rassadiran = {
  towgs84: "-133.63,-157.5,-158.62",
  ellipse: "intl",
  datumName: "Rassadiran"
};
exports.nzgd49 = {
  towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
  ellipse: "intl",
  datumName: "New Zealand Geodetic Datum 1949"
};
exports.osgb36 = {
  towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
  ellipse: "airy",
  datumName: "Airy 1830"
};
exports.s_jtsk = {
  towgs84: "589,76,480",
  ellipse: 'bessel',
  datumName: 'S-JTSK (Ferro)'
};
exports.beduaram = {
  towgs84: '-106,-87,188',
  ellipse: 'clrk80',
  datumName: 'Beduaram'
};
exports.gunung_segara = {
  towgs84: '-403,684,41',
  ellipse: 'bessel',
  datumName: 'Gunung Segara Jakarta'
};
exports.rnb72 = {
  towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
  ellipse: "intl",
  datumName: "Reseau National Belge 1972"
};
},{}],26:[function(_dereq_,module,exports){
exports.MERIT = {
  a: 6378137.0,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};
exports.SGS85 = {
  a: 6378136.0,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};
exports.GRS80 = {
  a: 6378137.0,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};
exports.IAU76 = {
  a: 6378140.0,
  rf: 298.257,
  ellipseName: "IAU 1976"
};
exports.airy = {
  a: 6377563.396,
  b: 6356256.910,
  ellipseName: "Airy 1830"
};
exports.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};
exports.NWL9D = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};
exports.mod_airy = {
  a: 6377340.189,
  b: 6356034.446,
  ellipseName: "Modified Airy"
};
exports.andrae = {
  a: 6377104.43,
  rf: 300.0,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};
exports.aust_SA = {
  a: 6378160.0,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};
exports.GRS67 = {
  a: 6378160.0,
  rf: 298.2471674270,
  ellipseName: "GRS 67(IUGG 1967)"
};
exports.bessel = {
  a: 6377397.155,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};
exports.bess_nam = {
  a: 6377483.865,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};
exports.clrk66 = {
  a: 6378206.4,
  b: 6356583.8,
  ellipseName: "Clarke 1866"
};
exports.clrk80 = {
  a: 6378249.145,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};
exports.clrk58 = {
  a: 6378293.645208759,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};
exports.CPM = {
  a: 6375738.7,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};
exports.delmbr = {
  a: 6376428.0,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};
exports.engelis = {
  a: 6378136.05,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};
exports.evrst30 = {
  a: 6377276.345,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};
exports.evrst48 = {
  a: 6377304.063,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};
exports.evrst56 = {
  a: 6377301.243,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};
exports.evrst69 = {
  a: 6377295.664,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};
exports.evrstSS = {
  a: 6377298.556,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};
exports.fschr60 = {
  a: 6378166.0,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};
exports.fschr60m = {
  a: 6378155.0,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};
exports.fschr68 = {
  a: 6378150.0,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};
exports.helmert = {
  a: 6378200.0,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};
exports.hough = {
  a: 6378270.0,
  rf: 297.0,
  ellipseName: "Hough"
};
exports.intl = {
  a: 6378388.0,
  rf: 297.0,
  ellipseName: "International 1909 (Hayford)"
};
exports.kaula = {
  a: 6378163.0,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};
exports.lerch = {
  a: 6378139.0,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};
exports.mprts = {
  a: 6397300.0,
  rf: 191.0,
  ellipseName: "Maupertius 1738"
};
exports.new_intl = {
  a: 6378157.5,
  b: 6356772.2,
  ellipseName: "New International 1967"
};
exports.plessis = {
  a: 6376523.0,
  rf: 6355863.0,
  ellipseName: "Plessis 1817 (France)"
};
exports.krass = {
  a: 6378245.0,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};
exports.SEasia = {
  a: 6378155.0,
  b: 6356773.3205,
  ellipseName: "Southeast Asia"
};
exports.walbeck = {
  a: 6376896.0,
  b: 6355834.8467,
  ellipseName: "Walbeck"
};
exports.WGS60 = {
  a: 6378165.0,
  rf: 298.3,
  ellipseName: "WGS 60"
};
exports.WGS66 = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "WGS 66"
};
exports.WGS7 = {
  a: 6378135.0,
  rf: 298.26,
  ellipseName: "WGS 72"
};
exports.WGS84 = {
  a: 6378137.0,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};
exports.sphere = {
  a: 6370997.0,
  b: 6370997.0,
  ellipseName: "Normal Sphere (r=6370997)"
};
},{}],27:[function(_dereq_,module,exports){
exports.greenwich = 0.0; //"0dE",
exports.lisbon = -9.131906111111; //"9d07'54.862\"W",
exports.paris = 2.337229166667; //"2d20'14.025\"E",
exports.bogota = -74.080916666667; //"74d04'51.3\"W",
exports.madrid = -3.687938888889; //"3d41'16.58\"W",
exports.rome = 12.452333333333; //"12d27'8.4\"E",
exports.bern = 7.439583333333; //"7d26'22.5\"E",
exports.jakarta = 106.807719444444; //"106d48'27.79\"E",
exports.ferro = -17.666666666667; //"17d40'W",
exports.brussels = 4.367975; //"4d22'4.71\"E",
exports.stockholm = 18.058277777778; //"18d3'29.8\"E",
exports.athens = 23.7163375; //"23d42'58.815\"E",
exports.oslo = 10.722916666667; //"10d43'22.5\"E"
},{}],28:[function(_dereq_,module,exports){
var proj = _dereq_('./Proj');
var transform = _dereq_('./transform');
var wgs84 = proj('WGS84');

function transformer(from, to, coords) {
  var transformedArray;
  if (Array.isArray(coords)) {
    transformedArray = transform(from, to, coords);
    if (coords.length === 3) {
      return [transformedArray.x, transformedArray.y, transformedArray.z];
    }
    else {
      return [transformedArray.x, transformedArray.y];
    }
  }
  else {
    return transform(from, to, coords);
  }
}

function checkProj(item) {
  if (item instanceof proj) {
    return item;
  }
  if (item.oProj) {
    return item.oProj;
  }
  return proj(item);
}
function proj4(fromProj, toProj, coord) {
  fromProj = checkProj(fromProj);
  var single = false;
  var obj;
  if (typeof toProj === 'undefined') {
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
    coord = toProj;
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  toProj = checkProj(toProj);
  if (coord) {
    return transformer(fromProj, toProj, coord);
  }
  else {
    obj = {
      forward: function(coords) {
        return transformer(fromProj, toProj, coords);
      },
      inverse: function(coords) {
        return transformer(toProj, fromProj, coords);
      }
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}
module.exports = proj4;
},{"./Proj":2,"./transform":64}],29:[function(_dereq_,module,exports){
var HALF_PI = Math.PI/2;
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_GRIDSHIFT = 3;
var PJD_WGS84 = 4; // WGS84 or equivalent
var PJD_NODATUM = 5; // WGS84 or equivalent
var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
var AD_C = 1.0026000;
var COS_67P5 = 0.38268343236508977;
var datum = function(proj) {
  if (!(this instanceof datum)) {
    return new datum(proj);
  }
  this.datum_type = PJD_WGS84; //default setting
  if (!proj) {
    return;
  }
  if (proj.datumCode && proj.datumCode === 'none') {
    this.datum_type = PJD_NODATUM;
  }
  if (proj.datum_params) {
    for (var i = 0; i < proj.datum_params.length; i++) {
      proj.datum_params[i] = parseFloat(proj.datum_params[i]);
    }
    if (proj.datum_params[0] !== 0 || proj.datum_params[1] !== 0 || proj.datum_params[2] !== 0) {
      this.datum_type = PJD_3PARAM;
    }
    if (proj.datum_params.length > 3) {
      if (proj.datum_params[3] !== 0 || proj.datum_params[4] !== 0 || proj.datum_params[5] !== 0 || proj.datum_params[6] !== 0) {
        this.datum_type = PJD_7PARAM;
        proj.datum_params[3] *= SEC_TO_RAD;
        proj.datum_params[4] *= SEC_TO_RAD;
        proj.datum_params[5] *= SEC_TO_RAD;
        proj.datum_params[6] = (proj.datum_params[6] / 1000000.0) + 1.0;
      }
    }
  }
  // DGR 2011-03-21 : nadgrids support
  this.datum_type = proj.grids ? PJD_GRIDSHIFT : this.datum_type;

  this.a = proj.a; //datum object also uses these values
  this.b = proj.b;
  this.es = proj.es;
  this.ep2 = proj.ep2;
  this.datum_params = proj.datum_params;
  if (this.datum_type === PJD_GRIDSHIFT) {
    this.grids = proj.grids;
  }
};
datum.prototype = {


  /****************************************************************/
  // cs_compare_datums()
  //   Returns TRUE if the two datums match, otherwise FALSE.
  compare_datums: function(dest) {
    if (this.datum_type !== dest.datum_type) {
      return false; // false, datums are not equal
    }
    else if (this.a !== dest.a || Math.abs(this.es - dest.es) > 0.000000000050) {
      // the tolerence for es is to ensure that GRS80 and WGS84
      // are considered identical
      return false;
    }
    else if (this.datum_type === PJD_3PARAM) {
      return (this.datum_params[0] === dest.datum_params[0] && this.datum_params[1] === dest.datum_params[1] && this.datum_params[2] === dest.datum_params[2]);
    }
    else if (this.datum_type === PJD_7PARAM) {
      return (this.datum_params[0] === dest.datum_params[0] && this.datum_params[1] === dest.datum_params[1] && this.datum_params[2] === dest.datum_params[2] && this.datum_params[3] === dest.datum_params[3] && this.datum_params[4] === dest.datum_params[4] && this.datum_params[5] === dest.datum_params[5] && this.datum_params[6] === dest.datum_params[6]);
    }
    else if (this.datum_type === PJD_GRIDSHIFT || dest.datum_type === PJD_GRIDSHIFT) {
      //alert("ERROR: Grid shift transformations are not implemented.");
      //return false
      //DGR 2012-07-29 lazy ...
      return this.nadgrids === dest.nadgrids;
    }
    else {
      return true; // datums are equal
    }
  }, // cs_compare_datums()

  /*
   * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
   * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
   * according to the current ellipsoid parameters.
   *
   *    Latitude  : Geodetic latitude in radians                     (input)
   *    Longitude : Geodetic longitude in radians                    (input)
   *    Height    : Geodetic height, in meters                       (input)
   *    X         : Calculated Geocentric X coordinate, in meters    (output)
   *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
   *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
   *
   */
  geodetic_to_geocentric: function(p) {
    var Longitude = p.x;
    var Latitude = p.y;
    var Height = p.z ? p.z : 0; //Z value not always supplied
    var X; // output
    var Y;
    var Z;

    var Error_Code = 0; //  GEOCENT_NO_ERROR;
    var Rn; /*  Earth radius at location  */
    var Sin_Lat; /*  Math.sin(Latitude)  */
    var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
    var Cos_Lat; /*  Math.cos(Latitude)  */

    /*
     ** Don't blow up if Latitude is just a little out of the value
     ** range as it may just be a rounding issue.  Also removed longitude
     ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
     */
    if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
      Latitude = -HALF_PI;
    }
    else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
      Latitude = HALF_PI;
    }
    else if ((Latitude < -HALF_PI) || (Latitude > HALF_PI)) {
      /* Latitude out of range */
      //..reportError('geocent:lat out of range:' + Latitude);
      return null;
    }

    if (Longitude > Math.PI) {
      Longitude -= (2 * Math.PI);
    }
    Sin_Lat = Math.sin(Latitude);
    Cos_Lat = Math.cos(Latitude);
    Sin2_Lat = Sin_Lat * Sin_Lat;
    Rn = this.a / (Math.sqrt(1.0e0 - this.es * Sin2_Lat));
    X = (Rn + Height) * Cos_Lat * Math.cos(Longitude);
    Y = (Rn + Height) * Cos_Lat * Math.sin(Longitude);
    Z = ((Rn * (1 - this.es)) + Height) * Sin_Lat;

    p.x = X;
    p.y = Y;
    p.z = Z;
    return Error_Code;
  }, // cs_geodetic_to_geocentric()


  geocentric_to_geodetic: function(p) {
    /* local defintions and variables */
    /* end-criterium of loop, accuracy of sin(Latitude) */
    var genau = 1e-12;
    var genau2 = (genau * genau);
    var maxiter = 30;

    var P; /* distance between semi-minor axis and location */
    var RR; /* distance between center and location */
    var CT; /* sin of geocentric latitude */
    var ST; /* cos of geocentric latitude */
    var RX;
    var RK;
    var RN; /* Earth radius at location */
    var CPHI0; /* cos of start or old geodetic latitude in iterations */
    var SPHI0; /* sin of start or old geodetic latitude in iterations */
    var CPHI; /* cos of searched geodetic latitude */
    var SPHI; /* sin of searched geodetic latitude */
    var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
    var At_Pole; /* indicates location is in polar region */
    var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

    var X = p.x;
    var Y = p.y;
    var Z = p.z ? p.z : 0.0; //Z value not always supplied
    var Longitude;
    var Latitude;
    var Height;

    At_Pole = false;
    P = Math.sqrt(X * X + Y * Y);
    RR = Math.sqrt(X * X + Y * Y + Z * Z);

    /*      special cases for latitude and longitude */
    if (P / this.a < genau) {

      /*  special case, if P=0. (X=0., Y=0.) */
      At_Pole = true;
      Longitude = 0.0;

      /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
       *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
      if (RR / this.a < genau) {
        Latitude = HALF_PI;
        Height = -this.b;
        return;
      }
    }
    else {
      /*  ellipsoidal (geodetic) longitude
       *  interval: -PI < Longitude <= +PI */
      Longitude = Math.atan2(Y, X);
    }

    /* --------------------------------------------------------------
     * Following iterative algorithm was developped by
     * "Institut for Erdmessung", University of Hannover, July 1988.
     * Internet: www.ife.uni-hannover.de
     * Iterative computation of CPHI,SPHI and Height.
     * Iteration of CPHI and SPHI to 10**-12 radian resp.
     * 2*10**-7 arcsec.
     * --------------------------------------------------------------
     */
    CT = Z / RR;
    ST = P / RR;
    RX = 1.0 / Math.sqrt(1.0 - this.es * (2.0 - this.es) * ST * ST);
    CPHI0 = ST * (1.0 - this.es) * RX;
    SPHI0 = CT * RX;
    iter = 0;

    /* loop to find sin(Latitude) resp. Latitude
     * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
    do {
      iter++;
      RN = this.a / Math.sqrt(1.0 - this.es * SPHI0 * SPHI0);

      /*  ellipsoidal (geodetic) height */
      Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - this.es * SPHI0 * SPHI0);

      RK = this.es * RN / (RN + Height);
      RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
      CPHI = ST * (1.0 - RK) * RX;
      SPHI = CT * RX;
      SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
      CPHI0 = CPHI;
      SPHI0 = SPHI;
    }
    while (SDPHI * SDPHI > genau2 && iter < maxiter);

    /*      ellipsoidal (geodetic) latitude */
    Latitude = Math.atan(SPHI / Math.abs(CPHI));

    p.x = Longitude;
    p.y = Latitude;
    p.z = Height;
    return p;
  }, // cs_geocentric_to_geodetic()

  /** Convert_Geocentric_To_Geodetic
   * The method used here is derived from 'An Improved Algorithm for
   * Geocentric to Geodetic Coordinate Conversion', by Ralph Toms, Feb 1996
   */
  geocentric_to_geodetic_noniter: function(p) {
    var X = p.x;
    var Y = p.y;
    var Z = p.z ? p.z : 0; //Z value not always supplied
    var Longitude;
    var Latitude;
    var Height;

    var W; /* distance from Z axis */
    var W2; /* square of distance from Z axis */
    var T0; /* initial estimate of vertical component */
    var T1; /* corrected estimate of vertical component */
    var S0; /* initial estimate of horizontal component */
    var S1; /* corrected estimate of horizontal component */
    var Sin_B0; /* Math.sin(B0), B0 is estimate of Bowring aux variable */
    var Sin3_B0; /* cube of Math.sin(B0) */
    var Cos_B0; /* Math.cos(B0) */
    var Sin_p1; /* Math.sin(phi1), phi1 is estimated latitude */
    var Cos_p1; /* Math.cos(phi1) */
    var Rn; /* Earth radius at location */
    var Sum; /* numerator of Math.cos(phi1) */
    var At_Pole; /* indicates location is in polar region */

    X = parseFloat(X); // cast from string to float
    Y = parseFloat(Y);
    Z = parseFloat(Z);

    At_Pole = false;
    if (X !== 0.0) {
      Longitude = Math.atan2(Y, X);
    }
    else {
      if (Y > 0) {
        Longitude = HALF_PI;
      }
      else if (Y < 0) {
        Longitude = -HALF_PI;
      }
      else {
        At_Pole = true;
        Longitude = 0.0;
        if (Z > 0.0) { /* north pole */
          Latitude = HALF_PI;
        }
        else if (Z < 0.0) { /* south pole */
          Latitude = -HALF_PI;
        }
        else { /* center of earth */
          Latitude = HALF_PI;
          Height = -this.b;
          return;
        }
      }
    }
    W2 = X * X + Y * Y;
    W = Math.sqrt(W2);
    T0 = Z * AD_C;
    S0 = Math.sqrt(T0 * T0 + W2);
    Sin_B0 = T0 / S0;
    Cos_B0 = W / S0;
    Sin3_B0 = Sin_B0 * Sin_B0 * Sin_B0;
    T1 = Z + this.b * this.ep2 * Sin3_B0;
    Sum = W - this.a * this.es * Cos_B0 * Cos_B0 * Cos_B0;
    S1 = Math.sqrt(T1 * T1 + Sum * Sum);
    Sin_p1 = T1 / S1;
    Cos_p1 = Sum / S1;
    Rn = this.a / Math.sqrt(1.0 - this.es * Sin_p1 * Sin_p1);
    if (Cos_p1 >= COS_67P5) {
      Height = W / Cos_p1 - Rn;
    }
    else if (Cos_p1 <= -COS_67P5) {
      Height = W / -Cos_p1 - Rn;
    }
    else {
      Height = Z / Sin_p1 + Rn * (this.es - 1.0);
    }
    if (At_Pole === false) {
      Latitude = Math.atan(Sin_p1 / Cos_p1);
    }

    p.x = Longitude;
    p.y = Latitude;
    p.z = Height;
    return p;
  }, // geocentric_to_geodetic_noniter()

  /****************************************************************/
  // pj_geocentic_to_wgs84( p )
  //  p = point to transform in geocentric coordinates (x,y,z)
  geocentric_to_wgs84: function(p) {

    if (this.datum_type === PJD_3PARAM) {
      // if( x[io] === HUGE_VAL )
      //    continue;
      p.x += this.datum_params[0];
      p.y += this.datum_params[1];
      p.z += this.datum_params[2];

    }
    else if (this.datum_type === PJD_7PARAM) {
      var Dx_BF = this.datum_params[0];
      var Dy_BF = this.datum_params[1];
      var Dz_BF = this.datum_params[2];
      var Rx_BF = this.datum_params[3];
      var Ry_BF = this.datum_params[4];
      var Rz_BF = this.datum_params[5];
      var M_BF = this.datum_params[6];
      // if( x[io] === HUGE_VAL )
      //    continue;
      var x_out = M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF;
      var y_out = M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF;
      var z_out = M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF;
      p.x = x_out;
      p.y = y_out;
      p.z = z_out;
    }
  }, // cs_geocentric_to_wgs84

  /****************************************************************/
  // pj_geocentic_from_wgs84()
  //  coordinate system definition,
  //  point to transform in geocentric coordinates (x,y,z)
  geocentric_from_wgs84: function(p) {

    if (this.datum_type === PJD_3PARAM) {
      //if( x[io] === HUGE_VAL )
      //    continue;
      p.x -= this.datum_params[0];
      p.y -= this.datum_params[1];
      p.z -= this.datum_params[2];

    }
    else if (this.datum_type === PJD_7PARAM) {
      var Dx_BF = this.datum_params[0];
      var Dy_BF = this.datum_params[1];
      var Dz_BF = this.datum_params[2];
      var Rx_BF = this.datum_params[3];
      var Ry_BF = this.datum_params[4];
      var Rz_BF = this.datum_params[5];
      var M_BF = this.datum_params[6];
      var x_tmp = (p.x - Dx_BF) / M_BF;
      var y_tmp = (p.y - Dy_BF) / M_BF;
      var z_tmp = (p.z - Dz_BF) / M_BF;
      //if( x[io] === HUGE_VAL )
      //    continue;

      p.x = x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp;
      p.y = -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp;
      p.z = Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp;
    } //cs_geocentric_from_wgs84()
  }
};

/** point object, nothing fancy, just allows values to be
    passed back and forth by reference rather than by value.
    Other point classes may be used as long as they have
    x and y properties, which will get modified in the transform method.
*/
module.exports = datum;

},{}],30:[function(_dereq_,module,exports){
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_GRIDSHIFT = 3;
var PJD_NODATUM = 5; // WGS84 or equivalent
var SRS_WGS84_SEMIMAJOR = 6378137; // only used in grid shift transforms
var SRS_WGS84_ESQUARED = 0.006694379990141316; //DGR: 2012-07-29
module.exports = function(source, dest, point) {
  var wp, i, l;

  function checkParams(fallback) {
    return (fallback === PJD_3PARAM || fallback === PJD_7PARAM);
  }
  // Short cut if the datums are identical.
  if (source.compare_datums(dest)) {
    return point; // in this case, zero is sucess,
    // whereas cs_compare_datums returns 1 to indicate TRUE
    // confusing, should fix this
  }

  // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
  if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
    return point;
  }

  //DGR: 2012-07-29 : add nadgrids support (begin)
  var src_a = source.a;
  var src_es = source.es;

  var dst_a = dest.a;
  var dst_es = dest.es;

  var fallback = source.datum_type;
  // If this datum requires grid shifts, then apply it to geodetic coordinates.
  if (fallback === PJD_GRIDSHIFT) {
    if (this.apply_gridshift(source, 0, point) === 0) {
      source.a = SRS_WGS84_SEMIMAJOR;
      source.es = SRS_WGS84_ESQUARED;
    }
    else {
      // try 3 or 7 params transformation or nothing ?
      if (!source.datum_params) {
        source.a = src_a;
        source.es = source.es;
        return point;
      }
      wp = 1;
      for (i = 0, l = source.datum_params.length; i < l; i++) {
        wp *= source.datum_params[i];
      }
      if (wp === 0) {
        source.a = src_a;
        source.es = source.es;
        return point;
      }
      if (source.datum_params.length > 3) {
        fallback = PJD_7PARAM;
      }
      else {
        fallback = PJD_3PARAM;
      }
    }
  }
  if (dest.datum_type === PJD_GRIDSHIFT) {
    dest.a = SRS_WGS84_SEMIMAJOR;
    dest.es = SRS_WGS84_ESQUARED;
  }
  // Do we need to go through geocentric coordinates?
  if (source.es !== dest.es || source.a !== dest.a || checkParams(fallback) || checkParams(dest.datum_type)) {
    //DGR: 2012-07-29 : add nadgrids support (end)
    // Convert to geocentric coordinates.
    source.geodetic_to_geocentric(point);
    // CHECK_RETURN;
    // Convert between datums
    if (checkParams(source.datum_type)) {
      source.geocentric_to_wgs84(point);
      // CHECK_RETURN;
    }
    if (checkParams(dest.datum_type)) {
      dest.geocentric_from_wgs84(point);
      // CHECK_RETURN;
    }
    // Convert back to geodetic coordinates
    dest.geocentric_to_geodetic(point);
    // CHECK_RETURN;
  }
  // Apply grid shift to destination if required
  if (dest.datum_type === PJD_GRIDSHIFT) {
    this.apply_gridshift(dest, 1, point);
    // CHECK_RETURN;
  }

  source.a = src_a;
  source.es = src_es;
  dest.a = dst_a;
  dest.es = dst_es;

  return point;
};


},{}],31:[function(_dereq_,module,exports){
var globals = _dereq_('./global');
var parseProj = _dereq_('./projString');
var wkt = _dereq_('./wkt');

function defs(name) {
  /*global console*/
  var that = this;
  if (arguments.length === 2) {
    if (arguments[1][0] === '+') {
      defs[name] = parseProj(arguments[1]);
    }
    else {
      defs[name] = wkt(arguments[1]);
    }
  }
  else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function(v) {
        if (Array.isArray(v)) {
          defs.apply(that, v);
        }
        else {
          defs(v);
        }
      });
    }
    else if (typeof name === 'string') {

    }
    else if ('EPSG' in name) {
      defs['EPSG:' + name.EPSG] = name;
    }
    else if ('ESRI' in name) {
      defs['ESRI:' + name.ESRI] = name;
    }
    else if ('IAU2000' in name) {
      defs['IAU2000:' + name.IAU2000] = name;
    }
    else {
      console.log(name);
    }
    return;
  }


}
globals(defs);
module.exports = defs;

},{"./global":34,"./projString":37,"./wkt":65}],32:[function(_dereq_,module,exports){
var Datum = _dereq_('./constants/Datum');
var Ellipsoid = _dereq_('./constants/Ellipsoid');
var extend = _dereq_('./extend');
var datum = _dereq_('./datum');
var EPSLN = 1.0e-10;
// ellipoid pj_set_ell.c
var SIXTH = 0.1666666666666666667;
/* 1/6 */
var RA4 = 0.04722222222222222222;
/* 17/360 */
var RA6 = 0.02215608465608465608;
module.exports = function(json) {
  // DGR 2011-03-20 : nagrids -> nadgrids
  if (json.datumCode && json.datumCode !== 'none') {
    var datumDef = Datum[json.datumCode];
    if (datumDef) {
      json.datum_params = datumDef.towgs84 ? datumDef.towgs84.split(',') : null;
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  if (!json.a) { // do we have an ellipsoid?
    var ellipse = Ellipsoid[json.ellps] ? Ellipsoid[json.ellps] : Ellipsoid.WGS84;
    extend(json, ellipse);
  }
  if (json.rf && !json.b) {
    json.b = (1.0 - 1.0 / json.rf) * json.a;
  }
  if (json.rf === 0 || Math.abs(json.a - json.b) < EPSLN) {
    json.sphere = true;
    json.b = json.a;
  }
  json.a2 = json.a * json.a; // used in geocentric
  json.b2 = json.b * json.b; // used in geocentric
  json.es = (json.a2 - json.b2) / json.a2; // e ^ 2
  json.e = Math.sqrt(json.es); // eccentricity
  if (json.R_A) {
    json.a *= 1 - json.es * (SIXTH + json.es * (RA4 + json.es * RA6));
    json.a2 = json.a * json.a;
    json.b2 = json.b * json.b;
    json.es = 0;
  }
  json.ep2 = (json.a2 - json.b2) / json.b2; // used in geocentric
  if (!json.k0) {
    json.k0 = 1.0; //default value
  }
  //DGR 2010-11-12: axis
  if (!json.axis) {
    json.axis = "enu";
  }

  json.datum = datum(json);
  return json;
};
},{"./constants/Datum":25,"./constants/Ellipsoid":26,"./datum":29,"./extend":33}],33:[function(_dereq_,module,exports){
module.exports = function(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== undefined) {
      destination[property] = value;
    }
  }
  return destination;
};

},{}],34:[function(_dereq_,module,exports){
module.exports = function(defs) {
  defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");

  defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
  defs.GOOGLE = defs['EPSG:3857'];
  defs['EPSG:900913'] = defs['EPSG:3857'];
  defs['EPSG:102113'] = defs['EPSG:3857'];
};

},{}],35:[function(_dereq_,module,exports){
var proj4 = _dereq_('./core');
proj4.defaultDatum = 'WGS84'; //default datum
proj4.Proj = _dereq_('./Proj');
proj4.WGS84 = new proj4.Proj('WGS84');
proj4.Point = _dereq_('./Point');
proj4.toPoint = _dereq_("./common/toPoint");
proj4.defs = _dereq_('./defs');
proj4.transform = _dereq_('./transform');
proj4.mgrs = _dereq_('mgrs');
proj4.version = _dereq_('../package.json').version;
_dereq_('./includedProjections')(proj4);
module.exports = proj4;
},{"../package.json":67,"./Point":1,"./Proj":2,"./common/toPoint":23,"./core":28,"./defs":31,"./includedProjections":"VzEyzV","./transform":64,"mgrs":66}],36:[function(_dereq_,module,exports){
var defs = _dereq_('./defs');
var wkt = _dereq_('./wkt');
var projStr = _dereq_('./projString');
function testObj(code){
  return typeof code === 'string';
}
function testDef(code){
  return code in defs;
}
function testWKT(code){
  var codeWords = ['GEOGCS','GEOCCS','PROJCS','LOCAL_CS'];
  return codeWords.reduce(function(a,b){
    return a+1+code.indexOf(b);
  },0);
}
function testProj(code){
  return code[0] === '+';
}
function parse(code){
  if (testObj(code)) {
    //check to see if this is a WKT string
    if (testDef(code)) {
      return defs[code];
    }
    else if (testWKT(code)) {
      return wkt(code);
    }
    else if (testProj(code)) {
      return projStr(code);
    }
  }else{
    return code;
  }
}

module.exports = parse;
},{"./defs":31,"./projString":37,"./wkt":65}],37:[function(_dereq_,module,exports){
var D2R = 0.01745329251994329577;
var PrimeMeridian = _dereq_('./constants/PrimeMeridian');
module.exports = function(defData) {
  var self = {};

  var paramObj = {};
  defData.split("+").map(function(v) {
    return v.trim();
  }).filter(function(a) {
    return a;
  }).forEach(function(a) {
    var split = a.split("=");
    split.push(true);
    paramObj[split[0].toLowerCase()] = split[1];
  });
  var paramName, paramVal, paramOutname;
  var params = {
    proj: 'projName',
    datum: 'datumCode',
    rf: function(v) {
      self.rf = parseFloat(v, 10);
    },
    lat_0: function(v) {
      self.lat0 = v * D2R;
    },
    lat_1: function(v) {
      self.lat1 = v * D2R;
    },
    lat_2: function(v) {
      self.lat2 = v * D2R;
    },
    lat_ts: function(v) {
      self.lat_ts = v * D2R;
    },
    lon_0: function(v) {
      self.long0 = v * D2R;
    },
    lon_1: function(v) {
      self.long1 = v * D2R;
    },
    lon_2: function(v) {
      self.long2 = v * D2R;
    },
    alpha: function(v) {
      self.alpha = parseFloat(v) * D2R;
    },
    lonc: function(v) {
      self.longc = v * D2R;
    },
    x_0: function(v) {
      self.x0 = parseFloat(v, 10);
    },
    y_0: function(v) {
      self.y0 = parseFloat(v, 10);
    },
    k_0: function(v) {
      self.k0 = parseFloat(v, 10);
    },
    k: function(v) {
      self.k0 = parseFloat(v, 10);
    },
    r_a: function() {
      self.R_A = true;
    },
    zone: function(v) {
      self.zone = parseInt(v, 10);
    },
    south: function() {
      self.utmSouth = true;
    },
    towgs84: function(v) {
      self.datum_params = v.split(",").map(function(a) {
        return parseFloat(a, 10);
      });
    },
    to_meter: function(v) {
      self.to_meter = parseFloat(v, 10);
    },
    from_greenwich: function(v) {
      self.from_greenwich = v * D2R;
    },
    pm: function(v) {
      self.from_greenwich = (PrimeMeridian[v] ? PrimeMeridian[v] : parseFloat(v, 10)) * D2R;
    },
    nadgrids: function(v) {
      if (v === '@null') {
        self.datumCode = 'none';
      }
      else {
        self.nadgrids = v;
      }
    },
    axis: function(v) {
      var legalAxis = "ewnsud";
      if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
        self.axis = v;
      }
    }
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params) {
      paramOutname = params[paramName];
      if (typeof paramOutname === 'function') {
        paramOutname(paramVal);
      }
      else {
        self[paramOutname] = paramVal;
      }
    }
    else {
      self[paramName] = paramVal;
    }
  }
  if(typeof self.datumCode === 'string' && self.datumCode !== "WGS84"){
    self.datumCode = self.datumCode.toLowerCase();
  }
  return self;
};

},{"./constants/PrimeMeridian":27}],38:[function(_dereq_,module,exports){
var projs = [
  _dereq_('./projections/merc'),
  _dereq_('./projections/longlat')
];
var names = {};
var projStore = [];

function add(proj, i) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function(n) {
    names[n.toLowerCase()] = len;
  });
  return this;
}

exports.add = add;

exports.get = function(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof names[n] !== 'undefined' && projStore[names[n]]) {
    return projStore[names[n]];
  }
};
exports.start = function() {
  projs.forEach(add);
};

},{"./projections/longlat":50,"./projections/merc":51}],39:[function(_dereq_,module,exports){
var EPSLN = 1.0e-10;
var msfnz = _dereq_('../common/msfnz');
var qsfnz = _dereq_('../common/qsfnz');
var adjust_lon = _dereq_('../common/adjust_lon');
var asinz = _dereq_('../common/asinz');
exports.init = function() {

  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);

  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
  this.qs1 = qsfnz(this.e3, this.sin_po, this.cos_po);

  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
  this.qs2 = qsfnz(this.e3, this.sin_po, this.cos_po);

  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = qsfnz(this.e3, this.sin_po, this.cos_po);

  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  }
  else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
};

/* Albers Conical Equal Area forward equations--mapping lat,long to x,y
  -------------------------------------------------------------------*/
exports.forward = function(p) {

  var lon = p.x;
  var lat = p.y;

  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);

  var qs = qsfnz(this.e3, this.sin_phi, this.cos_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * adjust_lon(lon - this.long0);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
};


exports.inverse = function(p) {
  var rh1, qs, con, theta, lon, lat;

  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  }
  else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }

  lon = adjust_lon(theta / this.ns0 + this.long0);
  p.x = lon;
  p.y = lat;
  return p;
};

/* Function to compute phi1, the latitude for the inverse of the
   Albers Conical Equal-Area projection.
-------------------------------------------*/
exports.phi1z = function(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = asinz(0.5 * qs);
  if (eccent < EPSLN) {
    return phi;
  }

  var eccnts = eccent * eccent;
  for (var i = 1; i <= 25; i++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
};
exports.names = ["Albers_Conic_Equal_Area", "Albers", "aea"];

},{"../common/adjust_lon":5,"../common/asinz":6,"../common/msfnz":15,"../common/qsfnz":20}],40:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
var HALF_PI = Math.PI/2;
var EPSLN = 1.0e-10;
var mlfn = _dereq_('../common/mlfn');
var e0fn = _dereq_('../common/e0fn');
var e1fn = _dereq_('../common/e1fn');
var e2fn = _dereq_('../common/e2fn');
var e3fn = _dereq_('../common/e3fn');
var gN = _dereq_('../common/gN');
var asinz = _dereq_('../common/asinz');
var imlfn = _dereq_('../common/imlfn');
exports.init = function() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
};

exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var dlon = adjust_lon(lon - this.long0);
  var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North Pole case
      p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
      p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South Pole case
      p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
      p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
      return p;
    }
    else {
      //default case
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c = Math.acos(cos_c);
      kp = c / Math.sin(c);
      p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p;
    }
  }
  else {
    e0 = e0fn(this.es);
    e1 = e1fn(this.es);
    e2 = e2fn(this.es);
    e3 = e3fn(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North Pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South Pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p;
    }
    else {
      //Default case
      tanphi = sinphi / cosphi;
      Nl1 = gN(this.a, this.e, this.sin_p12);
      Nl = gN(this.a, this.e, sinphi);
      psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
      Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
      if (Az === 0) {
        s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
        s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else {
        s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
      }
      G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
      H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
      GH = G * H;
      Hs = H * H;
      s2 = s * s;
      s3 = s2 * s;
      s4 = s3 * s;
      s5 = s4 * s;
      c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
      p.x = this.x0 + c * Math.sin(Az);
      p.y = this.y0 + c * Math.cos(Az);
      return p;
    }
  }


};

exports.inverse = function(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F;
  if (this.sphere) {
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > (2 * HALF_PI * this.a)) {
      return;
    }
    z = rh / this.a;

    sinz = Math.sin(z);
    cosz = Math.cos(z);

    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
    }
    else {
      lat = asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
      con = Math.abs(this.lat0) - HALF_PI;
      if (Math.abs(con) <= EPSLN) {
        if (this.lat0 >= 0) {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
        }
        else {
          lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
        }
      }
      else {
        /*con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
          //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }*/
        lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    e0 = e0fn(this.es);
    e1 = e1fn(this.es);
    e2 = e2fn(this.es);
    e3 = e3fn(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = Mlp - rh;
      lat = imlfn(M / this.a, e0, e1, e2, e3);
      lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = rh - Mlp;

      lat = imlfn(M / this.a, e0, e1, e2, e3);
      lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      //default case
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      Az = Math.atan2(p.x, p.y);
      N1 = gN(this.a, this.e, this.sin_p12);
      cosAz = Math.cos(Az);
      tmp = this.e * this.cos_p12 * cosAz;
      A = -tmp * tmp / (1 - this.es);
      B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
      D = rh / N1;
      Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
      F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
      psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
      lon = adjust_lon(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
      lat = Math.atan((1 - this.es * F * this.sin_p12 / Math.sin(psi)) * Math.tan(psi) / (1 - this.es));
      p.x = lon;
      p.y = lat;
      return p;
    }
  }

};
exports.names = ["Azimuthal_Equidistant", "aeqd"];

},{"../common/adjust_lon":5,"../common/asinz":6,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/imlfn":12,"../common/mlfn":14}],41:[function(_dereq_,module,exports){
var mlfn = _dereq_('../common/mlfn');
var e0fn = _dereq_('../common/e0fn');
var e1fn = _dereq_('../common/e1fn');
var e2fn = _dereq_('../common/e2fn');
var e3fn = _dereq_('../common/e3fn');
var gN = _dereq_('../common/gN');
var adjust_lon = _dereq_('../common/adjust_lon');
var adjust_lat = _dereq_('../common/adjust_lat');
var imlfn = _dereq_('../common/imlfn');
var HALF_PI = Math.PI/2;
var EPSLN = 1.0e-10;
exports.init = function() {
  if (!this.sphere) {
    this.e0 = e0fn(this.es);
    this.e1 = e1fn(this.es);
    this.e2 = e2fn(this.es);
    this.e3 = e3fn(this.es);
    this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  }
};



/* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
exports.forward = function(p) {

  /* Forward equations
      -----------------*/
  var x, y;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon(lam - this.long0);

  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  }
  else {
    //ellipsoid
    var sinphi = Math.sin(phi);
    var cosphi = Math.cos(phi);
    var nl = gN(this.a, this.e, sinphi);
    var tl = Math.tan(phi) * Math.tan(phi);
    var al = lam * Math.cos(phi);
    var asq = al * al;
    var cl = this.es * cosphi * cosphi / (1 - this.es);
    var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);

    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);


  }

  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
};

/* Inverse equations
  -----------------*/
exports.inverse = function(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var phi, lam;

  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  }
  else {
    /* ellipsoid */
    var ml1 = this.ml0 / this.a + y;
    var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
      p.x = this.long0;
      p.y = HALF_PI;
      if (y < 0) {
        p.y *= -1;
      }
      return p;
    }
    var nl1 = gN(this.a, this.e, Math.sin(phi1));

    var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
    var tl1 = Math.pow(Math.tan(phi1), 2);
    var dl = x * this.a / nl1;
    var dsq = dl * dl;
    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);

  }

  p.x = adjust_lon(lam + this.long0);
  p.y = adjust_lat(phi);
  return p;

};
exports.names = ["Cassini", "Cassini_Soldner", "cass"];
},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/imlfn":12,"../common/mlfn":14}],42:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
var qsfnz = _dereq_('../common/qsfnz');
var msfnz = _dereq_('../common/msfnz');
var iqsfnz = _dereq_('../common/iqsfnz');
/*
  reference:  
    "Cartographic Projection Procedures for the UNIX Environment-
    A User's Manual" by Gerald I. Evenden,
    USGS Open File Report 90-284and Release 4 Interim Reports (2003)
*/
exports.init = function() {
  //no-op
  if (!this.sphere) {
    this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
};


/* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y;
  /* Forward equations
      -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  }
  else {
    var qs = qsfnz(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }

  p.x = x;
  p.y = y;
  return p;
};

/* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
exports.inverse = function(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat;

  if (this.sphere) {
    lon = adjust_lon(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts));
    lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts));
  }
  else {
    lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
    lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
  }

  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["cea"];

},{"../common/adjust_lon":5,"../common/iqsfnz":13,"../common/msfnz":15,"../common/qsfnz":20}],43:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
var adjust_lat = _dereq_('../common/adjust_lat');
exports.init = function() {

  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";

  this.rc = Math.cos(this.lat_ts);
};


// forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
exports.forward = function(p) {

  var lon = p.x;
  var lat = p.y;

  var dlon = adjust_lon(lon - this.long0);
  var dlat = adjust_lat(lat - this.lat0);
  p.x = this.x0 + (this.a * dlon * this.rc);
  p.y = this.y0 + (this.a * dlat);
  return p;
};

// inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
exports.inverse = function(p) {

  var x = p.x;
  var y = p.y;

  p.x = adjust_lon(this.long0 + ((x - this.x0) / (this.a * this.rc)));
  p.y = adjust_lat(this.lat0 + ((y - this.y0) / (this.a)));
  return p;
};
exports.names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];

},{"../common/adjust_lat":4,"../common/adjust_lon":5}],44:[function(_dereq_,module,exports){
var e0fn = _dereq_('../common/e0fn');
var e1fn = _dereq_('../common/e1fn');
var e2fn = _dereq_('../common/e2fn');
var e3fn = _dereq_('../common/e3fn');
var msfnz = _dereq_('../common/msfnz');
var mlfn = _dereq_('../common/mlfn');
var adjust_lon = _dereq_('../common/adjust_lon');
var adjust_lat = _dereq_('../common/adjust_lat');
var imlfn = _dereq_('../common/imlfn');
var EPSLN = 1.0e-10;
exports.init = function() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn(this.es);
  this.e1 = e1fn(this.es);
  this.e2 = e2fn(this.es);
  this.e3 = e3fn(this.es);

  this.sinphi = Math.sin(this.lat1);
  this.cosphi = Math.cos(this.lat1);

  this.ms1 = msfnz(this.e, this.sinphi, this.cosphi);
  this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);

  if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
    this.ns = this.sinphi;
  }
  else {
    this.sinphi = Math.sin(this.lat2);
    this.cosphi = Math.cos(this.lat2);
    this.ms2 = msfnz(this.e, this.sinphi, this.cosphi);
    this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
};


/* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  var rh1;

  /* Forward equations
      -----------------*/
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  }
  else {
    var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * adjust_lon(lon - this.long0);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p.x = x;
  p.y = y;
  return p;
};

/* Inverse equations
  -----------------*/
exports.inverse = function(p) {
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }

  if (this.sphere) {
    lon = adjust_lon(this.long0 + theta / this.ns);
    lat = adjust_lat(this.g - rh1 / this.a);
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    var ml = this.g - rh1 / this.a;
    lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
    lon = adjust_lon(this.long0 + theta / this.ns);
    p.x = lon;
    p.y = lat;
    return p;
  }

};
exports.names = ["Equidistant_Conic", "eqdc"];

},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/imlfn":12,"../common/mlfn":14,"../common/msfnz":15}],45:[function(_dereq_,module,exports){
var FORTPI = Math.PI/4;
var srat = _dereq_('../common/srat');
var HALF_PI = Math.PI/2;
var MAX_ITER = 20;
exports.init = function() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
};

exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;

  p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
  p.x = this.C * lon;
  return p;
};

exports.inverse = function(p) {
  var DEL_TOL = 1e-14;
  var lon = p.x / this.C;
  var lat = p.y;
  var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
  for (var i = MAX_ITER; i > 0; --i) {
    lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), - 0.5 * this.e)) - HALF_PI;
    if (Math.abs(lat - p.y) < DEL_TOL) {
      break;
    }
    p.y = lat;
  }
  /* convergence failed */
  if (!i) {
    return null;
  }
  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["gauss"];

},{"../common/srat":22}],46:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
var EPSLN = 1.0e-10;
var asinz = _dereq_('../common/asinz');

/*
  reference:
    Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
  */
exports.init = function() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  // Approximation for projecting points to the horizon (infinity)
  this.infinity_dist = 1000 * this.a;
  this.rc = 1;
};


/* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
exports.forward = function(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g;
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = adjust_lon(lon - this.long0);

  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);

  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if ((g > 0) || (Math.abs(g) <= EPSLN)) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
  }
  else {

    // Point is in the opposing hemisphere and is unprojectable
    // We still need to return a reasonable point, so we project 
    // to infinity, on a bearing 
    // equivalent to the northern hemisphere equivalent
    // This is a reasonable approximation for short shapes and lines that 
    // straddle the horizon.

    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

  }
  p.x = x;
  p.y = y;
  return p;
};


exports.inverse = function(p) {
  var rh; /* Rho */
  var sinc, cosc;
  var c;
  var lon, lat;

  /* Inverse equations
      -----------------*/
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;

  if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
    c = Math.atan2(rh, this.rc);
    sinc = Math.sin(c);
    cosc = Math.cos(c);

    lat = asinz(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh);
    lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
    lon = adjust_lon(this.long0 + lon);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["gnom"];

},{"../common/adjust_lon":5,"../common/asinz":6}],47:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
exports.init = function() {
  this.a = 6377397.155;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  /* if scale not set default to 0.9999 */
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448; /* 45 */
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
};

/* ellipsoid */
/* calculate xy from lat/lon */
/* Constants, identical to inverse transform function */
exports.forward = function(p) {
  var gfi, u, deltav, s, d, eps, ro;
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon(lon - this.long0);
  /* Transformation */
  gfi = Math.pow(((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat))), (this.alfa * this.e / 2));
  u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
  d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p.y = ro * Math.cos(eps) / 1;
  p.x = ro * Math.sin(eps) / 1;

  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  return (p);
};

/* calculate lat/lon from xy */
exports.inverse = function(p) {
  var u, deltav, s, d, eps, ro, fi1;
  var ok;

  /* Transformation */
  /* revert y, x*/
  var tmp = p.x;
  p.x = p.y;
  p.y = tmp;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  ro = Math.sqrt(p.x * p.x + p.y * p.y);
  eps = Math.atan2(p.y, p.x);
  d = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
  deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
  p.x = this.long0 - deltav / this.alfa;
  fi1 = u;
  ok = 0;
  var iter = 0;
  do {
    p.y = 2 * (Math.atan(Math.pow(this.k, - 1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p.y) < 0.0000000001) {
      ok = 1;
    }
    fi1 = p.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }

  return (p);
};
exports.names = ["Krovak", "krovak"];

},{"../common/adjust_lon":5}],48:[function(_dereq_,module,exports){
var HALF_PI = Math.PI/2;
var FORTPI = Math.PI/4;
var EPSLN = 1.0e-10;
var qsfnz = _dereq_('../common/qsfnz');
var adjust_lon = _dereq_('../common/adjust_lon');
/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

exports.S_POLE = 1;
exports.N_POLE = 2;
exports.EQUIT = 3;
exports.OBLIQ = 4;


/* Initialize the Lambert Azimuthal Equal Area projection
  ------------------------------------------------------*/
exports.init = function() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
  }
  else if (Math.abs(t) < EPSLN) {
    this.mode = this.EQUIT;
  }
  else {
    this.mode = this.OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;

    this.qp = qsfnz(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = this.authset(this.es);
    switch (this.mode) {
    case this.N_POLE:
      this.dd = 1;
      break;
    case this.S_POLE:
      this.dd = 1;
      break;
    case this.EQUIT:
      this.rq = Math.sqrt(0.5 * this.qp);
      this.dd = 1 / this.rq;
      this.xmf = 1;
      this.ymf = 0.5 * this.qp;
      break;
    case this.OBLIQ:
      this.rq = Math.sqrt(0.5 * this.qp);
      sinphi = Math.sin(this.lat0);
      this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
      this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
      this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
      this.ymf = (this.xmf = this.rq) / this.dd;
      this.xmf *= this.dd;
      break;
    }
  }
  else {
    if (this.mode === this.OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
};

/* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
exports.forward = function(p) {

  /* Forward equations
      -----------------*/
  var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
  var lam = p.x;
  var phi = p.y;

  lam = adjust_lon(lam - this.long0);

  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = (this.mode === this.EQUIT) ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= EPSLN) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= (this.mode === this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.phi0) < EPSLN) {
        return null;
      }
      y = FORTPI - phi * 0.5;
      y = 2 * ((this.mode === this.S_POLE) ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  }
  else {
    sinb = 0;
    cosb = 0;
    b = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q = qsfnz(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
    case this.OBLIQ:
      b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
      break;
    case this.EQUIT:
      b = 1 + cosb * coslam;
      break;
    case this.N_POLE:
      b = HALF_PI + phi;
      q = this.qp - q;
      break;
    case this.S_POLE:
      b = phi - HALF_PI;
      q = this.qp + q;
      break;
    }
    if (Math.abs(b) < EPSLN) {
      return null;
    }
    switch (this.mode) {
    case this.OBLIQ:
    case this.EQUIT:
      b = Math.sqrt(2 / b);
      if (this.mode === this.OBLIQ) {
        y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
      }
      else {
        y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
      }
      x = this.xmf * b * cosb * sinlam;
      break;
    case this.N_POLE:
    case this.S_POLE:
      if (q >= 0) {
        x = (b = Math.sqrt(q)) * sinlam;
        y = coslam * ((this.mode === this.S_POLE) ? b : -b);
      }
      else {
        x = y = 0;
      }
      break;
    }
  }

  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
};

/* Inverse equations
  -----------------*/
exports.inverse = function(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var lam, phi, cCe, sCe, q, rho, ab;

  if (this.sphere) {
    var cosz = 0,
      rh, sinz = 0;

    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
    case this.EQUIT:
      phi = (Math.abs(rh) <= EPSLN) ? 0 : Math.asin(y * sinz / rh);
      x *= sinz;
      y = cosz * rh;
      break;
    case this.OBLIQ:
      phi = (Math.abs(rh) <= EPSLN) ? this.phi0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
      x *= sinz * this.cosph0;
      y = (cosz - Math.sin(phi) * this.sinph0) * rh;
      break;
    case this.N_POLE:
      y = -y;
      phi = HALF_PI - phi;
      break;
    case this.S_POLE:
      phi -= HALF_PI;
      break;
    }
    lam = (y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ)) ? 0 : Math.atan2(x, y);
  }
  else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < EPSLN) {
        p.x = 0;
        p.y = this.phi0;
        return p;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= (sCe = Math.sin(sCe));
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      }
      else {
        ab = y * sCe / rho;
        q = this.qp * ab;
        y = rho * cCe;
      }
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q = (x * x + y * y);
      if (!q) {
        p.x = 0;
        p.y = this.phi0;
        return p;
      }
      ab = 1 - q / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = this.authlat(Math.asin(ab), this.apa);
  }


  p.x = adjust_lon(this.long0 + lam);
  p.y = phi;
  return p;
};

/* determine latitude from authalic latitude */
exports.P00 = 0.33333333333333333333;
exports.P01 = 0.17222222222222222222;
exports.P02 = 0.10257936507936507936;
exports.P10 = 0.06388888888888888888;
exports.P11 = 0.06640211640211640211;
exports.P20 = 0.01641501294219154443;

exports.authset = function(es) {
  var t;
  var APA = [];
  APA[0] = es * this.P00;
  t = es * es;
  APA[0] += t * this.P01;
  APA[1] = t * this.P10;
  t *= es;
  APA[0] += t * this.P02;
  APA[1] += t * this.P11;
  APA[2] = t * this.P20;
  return APA;
};

exports.authlat = function(beta, APA) {
  var t = beta + beta;
  return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t));
};
exports.names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];

},{"../common/adjust_lon":5,"../common/qsfnz":20}],49:[function(_dereq_,module,exports){
var EPSLN = 1.0e-10;
var msfnz = _dereq_('../common/msfnz');
var tsfnz = _dereq_('../common/tsfnz');
var HALF_PI = Math.PI/2;
var sign = _dereq_('../common/sign');
var adjust_lon = _dereq_('../common/adjust_lon');
var phi2z = _dereq_('../common/phi2z');
exports.init = function() {

  // array of:  r_maj,r_min,lat1,lat2,c_lon,c_lat,false_east,false_north
  //double c_lat;                   /* center latitude                      */
  //double c_lon;                   /* center longitude                     */
  //double lat1;                    /* first standard parallel              */
  //double lat2;                    /* second standard parallel             */
  //double r_maj;                   /* major axis                           */
  //double r_min;                   /* minor axis                           */
  //double false_east;              /* x offset in meters                   */
  //double false_north;             /* y offset in meters                   */

  if (!this.lat2) {
    this.lat2 = this.lat1;
  } //if lat2 is not defined
  if (!this.k0) {
    this.k0 = 1;
  }
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }

  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);

  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = msfnz(this.e, sin1, cos1);
  var ts1 = tsfnz(this.e, this.lat1, sin1);

  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = msfnz(this.e, sin2, cos2);
  var ts2 = tsfnz(this.e, this.lat2, sin2);

  var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));

  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  }
  else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
};


// Lambert Conformal conic forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
exports.forward = function(p) {

  var lon = p.x;
  var lat = p.y;

  // singular cases :
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
    lat = sign(lat) * (HALF_PI - 2 * EPSLN);
  }

  var con = Math.abs(Math.abs(lat) - HALF_PI);
  var ts, rh1;
  if (con > EPSLN) {
    ts = tsfnz(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  }
  else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * adjust_lon(lon - this.long0);
  p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

  return p;
};

// Lambert Conformal Conic inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
exports.inverse = function(p) {

  var rh1, con, ts;
  var lat, lon;
  var x = (p.x - this.x0) / this.k0;
  var y = (this.rh - (p.y - this.y0) / this.k0);
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2((con * x), (con * y));
  }
  if ((rh1 !== 0) || (this.ns > 0)) {
    con = 1 / this.ns;
    ts = Math.pow((rh1 / (this.a * this.f0)), con);
    lat = phi2z(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  else {
    lat = -HALF_PI;
  }
  lon = adjust_lon(theta / this.ns + this.long0);

  p.x = lon;
  p.y = lat;
  return p;
};

exports.names = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"];

},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/sign":21,"../common/tsfnz":24}],50:[function(_dereq_,module,exports){
exports.init = function() {
  //no-op for longlat
};

function identity(pt) {
  return pt;
}
exports.forward = identity;
exports.inverse = identity;
exports.names = ["longlat", "identity"];

},{}],51:[function(_dereq_,module,exports){
var msfnz = _dereq_('../common/msfnz');
var HALF_PI = Math.PI/2;
var EPSLN = 1.0e-10;
var R2D = 57.29577951308232088;
var adjust_lon = _dereq_('../common/adjust_lon');
var FORTPI = Math.PI/4;
var tsfnz = _dereq_('../common/tsfnz');
var phi2z = _dereq_('../common/phi2z');
exports.init = function() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  if(!('x0' in this)){
    this.x0 = 0;
  }
  if(!('y0' in this)){
    this.y0 = 0;
  }
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    }
    else {
      this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  }
  else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      }
      else {
        this.k0 = 1;
      }
    }
  }
};

/* Mercator forward equations--mapping lat,long to x,y
  --------------------------------------------------*/

exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  // convert to radians
  if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
    return null;
  }

  var x, y;
  if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    return null;
  }
  else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
    }
    else {
      var sinphi = Math.sin(lat);
      var ts = tsfnz(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p.x = x;
    p.y = y;
    return p;
  }
};


/* Mercator inverse equations--mapping x,y to lat/long
  --------------------------------------------------*/
exports.inverse = function(p) {

  var x = p.x - this.x0;
  var y = p.y - this.y0;
  var lon, lat;

  if (this.sphere) {
    lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  }
  else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = phi2z(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = adjust_lon(this.long0 + x / (this.a * this.k0));

  p.x = lon;
  p.y = lat;
  return p;
};

exports.names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];

},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/tsfnz":24}],52:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */


/* Initialize the Miller Cylindrical projection
  -------------------------------------------*/
exports.init = function() {
  //no-op
};


/* Miller Cylindrical forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan((Math.PI / 4) + (lat / 2.5))) * 1.25;

  p.x = x;
  p.y = y;
  return p;
};

/* Miller Cylindrical inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
exports.inverse = function(p) {
  p.x -= this.x0;
  p.y -= this.y0;

  var lon = adjust_lon(this.long0 + p.x / this.a);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);

  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["Miller_Cylindrical", "mill"];

},{"../common/adjust_lon":5}],53:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
var EPSLN = 1.0e-10;
exports.init = function() {};

/* Mollweide forward equations--mapping lat,long to x,y
    ----------------------------------------------------*/
exports.forward = function(p) {

  /* Forward equations
      -----------------*/
  var lon = p.x;
  var lat = p.y;

  var delta_lon = adjust_lon(lon - this.long0);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);

  /* Iterate using the Newton-Raphson method to find theta
      -----------------------------------------------------*/
  for (var i = 0; true; i++) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < EPSLN) {
      break;
    }
  }
  theta /= 2;

  /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
       this is done here because of precision problems with "cos(theta)"
       --------------------------------------------------------------------------*/
  if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
};

exports.inverse = function(p) {
  var theta;
  var arg;

  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  arg = p.y / (1.4142135623731 * this.a);

  /* Because of division by zero problems, 'arg' can not be 1.  Therefore
       a number very close to one is used instead.
       -------------------------------------------------------------------*/
  if (Math.abs(arg) > 0.999999999999) {
    arg = 0.999999999999;
  }
  theta = Math.asin(arg);
  var lon = adjust_lon(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
  if (lon < (-Math.PI)) {
    lon = -Math.PI;
  }
  if (lon > Math.PI) {
    lon = Math.PI;
  }
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);

  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["Mollweide", "moll"];

},{"../common/adjust_lon":5}],54:[function(_dereq_,module,exports){
var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
/*
  reference
    Department of Land and Survey Technical Circular 1973/32
      http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf
    OSG Technical Report 4.1
      http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf
  */

/**
 * iterations: Number of iterations to refine inverse transform.
 *     0 -> km accuracy
 *     1 -> m accuracy -- suitable for most mapping applications
 *     2 -> mm accuracy
 */
exports.iterations = 1;

exports.init = function() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -0.0055161;
  this.A[7] = 0.0026906;
  this.A[8] = -0.001333;
  this.A[9] = 0.00067;
  this.A[10] = -0.00034;

  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 0.003371507;
  this.B_re[3] = -0.001541739;
  this.B_im[3] = 0.041058560;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;

  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -0.007809598;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;

  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 0.007317;
  this.D[7] = 0.01220;
  this.D[8] = 0.00394;
  this.D[9] = -0.0013;
};

/**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
exports.forward = function(p) {
  var n;
  var lon = p.x;
  var lat = p.y;

  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;

  // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
  // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
  var d_phi = delta_lat / SEC_TO_RAD * 1E-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1; // d_phi^0

  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }

  // 2. Calculate theta
  var th_re = d_psi;
  var th_im = d_lambda;

  // 3. Calculate z
  var th_n_re = 1;
  var th_n_im = 0; // theta^0
  var th_n_re1;
  var th_n_im1;

  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }

  // 4. Calculate easting and northing
  p.x = (z_im * this.a) + this.x0;
  p.y = (z_re * this.a) + this.y0;

  return p;
};


/**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
exports.inverse = function(p) {
  var n;
  var x = p.x;
  var y = p.y;

  var delta_x = x - this.x0;
  var delta_y = y - this.y0;

  // 1. Calculate z
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;

  // 2a. Calculate theta - first approximation gives km accuracy
  var z_n_re = 1;
  var z_n_im = 0; // z^0
  var z_n_re1;
  var z_n_im1;

  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }

  // 2b. Iterate to refine the accuracy of the calculation
  //        0 iterations gives km accuracy
  //        1 iteration gives m accuracy -- good enough for most mapping applications
  //        2 iterations bives mm accuracy
  for (var i = 0; i < this.iterations; i++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;

    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    // Complex division
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }

  // 3. Calculate d_phi              ...                                    // and d_lambda
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1; // d_psi^0

  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }

  // 4. Calculate latitude and longitude
  // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
  var lat = this.lat0 + (d_phi * SEC_TO_RAD * 1E5);
  var lon = this.long0 + d_lambda;

  p.x = lon;
  p.y = lat;

  return p;
};
exports.names = ["New_Zealand_Map_Grid", "nzmg"];
},{}],55:[function(_dereq_,module,exports){
var tsfnz = _dereq_('../common/tsfnz');
var adjust_lon = _dereq_('../common/adjust_lon');
var phi2z = _dereq_('../common/phi2z');
var HALF_PI = Math.PI/2;
var FORTPI = Math.PI/4;
var EPSLN = 1.0e-10;

/* Initialize the Oblique Mercator  projection
    ------------------------------------------*/
exports.init = function() {
  this.no_off = this.no_off || false;
  this.no_rot = this.no_rot || false;

  if (isNaN(this.k0)) {
    this.k0 = 1;
  }
  var sinlat = Math.sin(this.lat0);
  var coslat = Math.cos(this.lat0);
  var con = this.e * sinlat;

  this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(coslat, 4));
  this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - con * con);
  var t0 = tsfnz(this.e, this.lat0, sinlat);
  var dl = this.bl / coslat * Math.sqrt((1 - this.es) / (1 - con * con));
  if (dl * dl < 1) {
    dl = 1;
  }
  var fl;
  var gl;
  if (!isNaN(this.longc)) {
    //Central point and azimuth method

    if (this.lat0 >= 0) {
      fl = dl + Math.sqrt(dl * dl - 1);
    }
    else {
      fl = dl - Math.sqrt(dl * dl - 1);
    }
    this.el = fl * Math.pow(t0, this.bl);
    gl = 0.5 * (fl - 1 / fl);
    this.gamma0 = Math.asin(Math.sin(this.alpha) / dl);
    this.long0 = this.longc - Math.asin(gl * Math.tan(this.gamma0)) / this.bl;

  }
  else {
    //2 points method
    var t1 = tsfnz(this.e, this.lat1, Math.sin(this.lat1));
    var t2 = tsfnz(this.e, this.lat2, Math.sin(this.lat2));
    if (this.lat0 >= 0) {
      this.el = (dl + Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
    }
    else {
      this.el = (dl - Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
    }
    var hl = Math.pow(t1, this.bl);
    var ll = Math.pow(t2, this.bl);
    fl = this.el / hl;
    gl = 0.5 * (fl - 1 / fl);
    var jl = (this.el * this.el - ll * hl) / (this.el * this.el + ll * hl);
    var pl = (ll - hl) / (ll + hl);
    var dlon12 = adjust_lon(this.long1 - this.long2);
    this.long0 = 0.5 * (this.long1 + this.long2) - Math.atan(jl * Math.tan(0.5 * this.bl * (dlon12)) / pl) / this.bl;
    this.long0 = adjust_lon(this.long0);
    var dlon10 = adjust_lon(this.long1 - this.long0);
    this.gamma0 = Math.atan(Math.sin(this.bl * (dlon10)) / gl);
    this.alpha = Math.asin(dl * Math.sin(this.gamma0));
  }

  if (this.no_off) {
    this.uc = 0;
  }
  else {
    if (this.lat0 >= 0) {
      this.uc = this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
    }
    else {
      this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
    }
  }

};


/* Oblique Mercator forward equations--mapping lat,long to x,y
    ----------------------------------------------------------*/
exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon(lon - this.long0);
  var us, vs;
  var con;
  if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    if (lat > 0) {
      con = -1;
    }
    else {
      con = 1;
    }
    vs = this.al / this.bl * Math.log(Math.tan(FORTPI + con * this.gamma0 * 0.5));
    us = -1 * con * HALF_PI * this.al / this.bl;
  }
  else {
    var t = tsfnz(this.e, lat, Math.sin(lat));
    var ql = this.el / Math.pow(t, this.bl);
    var sl = 0.5 * (ql - 1 / ql);
    var tl = 0.5 * (ql + 1 / ql);
    var vl = Math.sin(this.bl * (dlon));
    var ul = (sl * Math.sin(this.gamma0) - vl * Math.cos(this.gamma0)) / tl;
    if (Math.abs(Math.abs(ul) - 1) <= EPSLN) {
      vs = Number.POSITIVE_INFINITY;
    }
    else {
      vs = 0.5 * this.al * Math.log((1 - ul) / (1 + ul)) / this.bl;
    }
    if (Math.abs(Math.cos(this.bl * (dlon))) <= EPSLN) {
      us = this.al * this.bl * (dlon);
    }
    else {
      us = this.al * Math.atan2(sl * Math.cos(this.gamma0) + vl * Math.sin(this.gamma0), Math.cos(this.bl * dlon)) / this.bl;
    }
  }

  if (this.no_rot) {
    p.x = this.x0 + us;
    p.y = this.y0 + vs;
  }
  else {

    us -= this.uc;
    p.x = this.x0 + vs * Math.cos(this.alpha) + us * Math.sin(this.alpha);
    p.y = this.y0 + us * Math.cos(this.alpha) - vs * Math.sin(this.alpha);
  }
  return p;
};

exports.inverse = function(p) {
  var us, vs;
  if (this.no_rot) {
    vs = p.y - this.y0;
    us = p.x - this.x0;
  }
  else {
    vs = (p.x - this.x0) * Math.cos(this.alpha) - (p.y - this.y0) * Math.sin(this.alpha);
    us = (p.y - this.y0) * Math.cos(this.alpha) + (p.x - this.x0) * Math.sin(this.alpha);
    us += this.uc;
  }
  var qp = Math.exp(-1 * this.bl * vs / this.al);
  var sp = 0.5 * (qp - 1 / qp);
  var tp = 0.5 * (qp + 1 / qp);
  var vp = Math.sin(this.bl * us / this.al);
  var up = (vp * Math.cos(this.gamma0) + sp * Math.sin(this.gamma0)) / tp;
  var ts = Math.pow(this.el / Math.sqrt((1 + up) / (1 - up)), 1 / this.bl);
  if (Math.abs(up - 1) < EPSLN) {
    p.x = this.long0;
    p.y = HALF_PI;
  }
  else if (Math.abs(up + 1) < EPSLN) {
    p.x = this.long0;
    p.y = -1 * HALF_PI;
  }
  else {
    p.y = phi2z(this.e, ts);
    p.x = adjust_lon(this.long0 - Math.atan2(sp * Math.cos(this.gamma0) - vp * Math.sin(this.gamma0), Math.cos(this.bl * us / this.al)) / this.bl);
  }
  return p;
};

exports.names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"];
},{"../common/adjust_lon":5,"../common/phi2z":16,"../common/tsfnz":24}],56:[function(_dereq_,module,exports){
var e0fn = _dereq_('../common/e0fn');
var e1fn = _dereq_('../common/e1fn');
var e2fn = _dereq_('../common/e2fn');
var e3fn = _dereq_('../common/e3fn');
var adjust_lon = _dereq_('../common/adjust_lon');
var adjust_lat = _dereq_('../common/adjust_lat');
var mlfn = _dereq_('../common/mlfn');
var EPSLN = 1.0e-10;
var gN = _dereq_('../common/gN');
var MAX_ITER = 20;
exports.init = function() {
  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn(this.es);
  this.e1 = e1fn(this.es);
  this.e2 = e2fn(this.es);
  this.e3 = e3fn(this.es);
  this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
};


/* Polyconic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y, el;
  var dlon = adjust_lon(lon - this.long0);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    }
    else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  }
  else {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    }
    else {
      var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }

  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
};


/* Inverse equations
  -----------------*/
exports.inverse = function(p) {
  var lon, lat, x, y, i;
  var al, bl;
  var phi, dphi;
  x = p.x - this.x0;
  y = p.y - this.y0;

  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
      lon = adjust_lon(x / this.a + this.long0);
      lat = 0;
    }
    else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i = MAX_ITER; i; --i) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      lon = adjust_lon(this.long0 + (Math.asin(x * Math.tan(phi) / this.a)) / Math.sin(lat));
    }
  }
  else {
    if (Math.abs(y + this.ml0) <= EPSLN) {
      lat = 0;
      lon = adjust_lon(this.long0 + x / this.a);
    }
    else {

      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i = MAX_ITER; i; --i) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }

      //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
    }
  }

  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["Polyconic", "poly"];
},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/mlfn":14}],57:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
var adjust_lat = _dereq_('../common/adjust_lat');
var pj_enfn = _dereq_('../common/pj_enfn');
var MAX_ITER = 20;
var pj_mlfn = _dereq_('../common/pj_mlfn');
var pj_inv_mlfn = _dereq_('../common/pj_inv_mlfn');
var HALF_PI = Math.PI/2;
var EPSLN = 1.0e-10;
var asinz = _dereq_('../common/asinz');
exports.init = function() {
  /* Place parameters in static storage for common use
    -------------------------------------------------*/


  if (!this.sphere) {
    this.en = pj_enfn(this.es);
  }
  else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }

};

/* Sinusoidal forward equations--mapping lat,long to x,y
  -----------------------------------------------------*/
exports.forward = function(p) {
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
    -----------------*/
  lon = adjust_lon(lon - this.long0);

  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    }
    else {
      var k = this.n * Math.sin(lat);
      for (var i = MAX_ITER; i; --i) {
        var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
        lat -= V;
        if (Math.abs(V) < EPSLN) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;

  }
  else {

    var s = Math.sin(lat);
    var c = Math.cos(lat);
    y = this.a * pj_mlfn(lat, s, c, this.en);
    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
  }

  p.x = x;
  p.y = y;
  return p;
};

exports.inverse = function(p) {
  var lat, temp, lon, s;

  p.x -= this.x0;
  lon = p.x / this.a;
  p.y -= this.y0;
  lat = p.y / this.a;

  if (this.sphere) {
    lat /= this.C_y;
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
    }
    else if (this.n !== 1) {
      lat = asinz(Math.sin(lat) / this.n);
    }
    lon = adjust_lon(lon + this.long0);
    lat = adjust_lat(lat);
  }
  else {
    lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
    s = Math.abs(lat);
    if (s < HALF_PI) {
      s = Math.sin(lat);
      temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      //temp = this.long0 + p.x / (this.a * Math.cos(lat));
      lon = adjust_lon(temp);
    }
    else if ((s - EPSLN) < HALF_PI) {
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["Sinusoidal", "sinu"];
},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/asinz":6,"../common/pj_enfn":17,"../common/pj_inv_mlfn":18,"../common/pj_mlfn":19}],58:[function(_dereq_,module,exports){
/*
  references:
    Formules et constantes pour le Calcul pour la
    projection cylindrique conforme à axe oblique et pour la transformation entre
    des systèmes de référence.
    http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
  */
exports.init = function() {
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
};


exports.forward = function(p) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
  var S = -this.alpha * (Sa1 + Sa2) + this.K;

  // spheric latitude
  var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

  // spheric longitude
  var I = this.alpha * (p.x - this.lambda0);

  // psoeudo equatorial rotation
  var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));

  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

  p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p.x = this.R * rotI + this.x0;
  return p;
};

exports.inverse = function(p) {
  var Y = p.x - this.x0;
  var X = p.y - this.y0;

  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);

  var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));

  var lambda = this.lambda0 + I / this.alpha;

  var S = 0;
  var phy = b;
  var prevPhy = -1000;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 0.0000001) {
    if (++iteration > 20) {
      //...reportError("omercFwdInfinity");
      return;
    }
    //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
  }

  p.x = lambda;
  p.y = phy;
  return p;
};

exports.names = ["somerc"];

},{}],59:[function(_dereq_,module,exports){
var HALF_PI = Math.PI/2;
var EPSLN = 1.0e-10;
var sign = _dereq_('../common/sign');
var msfnz = _dereq_('../common/msfnz');
var tsfnz = _dereq_('../common/tsfnz');
var phi2z = _dereq_('../common/phi2z');
var adjust_lon = _dereq_('../common/adjust_lon');
exports.ssfn_ = function(phit, sinphi, eccen) {
  sinphi *= eccen;
  return (Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen));
};

exports.init = function() {
  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
      this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
    }
  }
  else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (this.lat0 > 0) {
        //North pole
        //trace('stere:north pole');
        this.con = 1;
      }
      else {
        //South pole
        //trace('stere:south pole');
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
      this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
};

// Stereographic forward equations--mapping lat,long to x,y
exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A, X, sinX, cosX, ts, rh;
  var dlon = adjust_lon(lon - this.long0);

  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
    //case of the origine point
    //trace('stere:this is the origin point');
    p.x = NaN;
    p.y = NaN;
    return p;
  }
  if (this.sphere) {
    //trace('stere:sphere case');
    A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
    p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p;
  }
  else {
    X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= EPSLN) {
      ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p.x = this.x0 + rh * Math.sin(lon - this.long0);
      p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      //trace(p.toString());
      return p;
    }
    else if (Math.abs(this.sinlat0) < EPSLN) {
      //Eq
      //trace('stere:equateur');
      A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p.y = A * sinX;
    }
    else {
      //other case
      //trace('stere:normal case');
      A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p.x = A * cosX * Math.sin(dlon) + this.x0;
  }
  //trace(p.toString());
  return p;
};


//* Stereographic inverse equations--mapping x,y to lat/long
exports.inverse = function(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p.x * p.x + p.y * p.y);
  if (this.sphere) {
    var c = 2 * Math.atan(rh / (0.5 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= EPSLN) {
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < EPSLN) {
      if (this.lat0 > 0) {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
      }
      else {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
      }
    }
    else {
      lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (rh <= EPSLN) {
        lat = this.lat0;
        lon = this.long0;
        p.x = lon;
        p.y = lat;
        //trace(p.toString());
        return p;
      }
      p.x *= this.con;
      p.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * phi2z(this.e, ts);
      lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, - 1 * p.y));
    }
    else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= EPSLN) {
        Chi = this.X0;
      }
      else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
        lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
      }
      lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
    }
  }
  p.x = lon;
  p.y = lat;

  //trace(p.toString());
  return p;

};
exports.names = ["stere"];
},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/sign":21,"../common/tsfnz":24}],60:[function(_dereq_,module,exports){
var gauss = _dereq_('./gauss');
var adjust_lon = _dereq_('../common/adjust_lon');
exports.init = function() {
  gauss.init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
};

exports.forward = function(p) {
  var sinc, cosc, cosl, k;
  p.x = adjust_lon(p.x - this.long0);
  gauss.forward.apply(this, [p]);
  sinc = Math.sin(p.y);
  cosc = Math.cos(p.y);
  cosl = Math.cos(p.x);
  k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p.x = k * cosc * Math.sin(p.x);
  p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
};

exports.inverse = function(p) {
  var sinc, cosc, lon, lat, rho;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;
  if ((rho = Math.sqrt(p.x * p.x + p.y * p.y))) {
    var c = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  gauss.inverse.apply(this, [p]);
  p.x = adjust_lon(p.x + this.long0);
  return p;
};

exports.names = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea","Oblique Stereographic Alternative"];

},{"../common/adjust_lon":5,"./gauss":45}],61:[function(_dereq_,module,exports){
var e0fn = _dereq_('../common/e0fn');
var e1fn = _dereq_('../common/e1fn');
var e2fn = _dereq_('../common/e2fn');
var e3fn = _dereq_('../common/e3fn');
var mlfn = _dereq_('../common/mlfn');
var adjust_lon = _dereq_('../common/adjust_lon');
var HALF_PI = Math.PI/2;
var EPSLN = 1.0e-10;
var sign = _dereq_('../common/sign');
var asinz = _dereq_('../common/asinz');

exports.init = function() {
  this.e0 = e0fn(this.es);
  this.e1 = e1fn(this.es);
  this.e2 = e2fn(this.es);
  this.e3 = e3fn(this.es);
  this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
};

/**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
exports.forward = function(p) {
  var lon = p.x;
  var lat = p.y;

  var delta_lon = adjust_lon(lon - this.long0);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);

  if (this.sphere) {
    var b = cos_phi * Math.sin(delta_lon);
    if ((Math.abs(Math.abs(b) - 1)) < 0.0000000001) {
      return (93);
    }
    else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b));
      con = Math.acos(cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - b * b));
      if (lat < 0) {
        con = -con;
      }
      y = this.a * this.k0 * (con - this.lat0);
    }
  }
  else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c = this.ep2 * Math.pow(cos_phi, 2);
    var tq = Math.tan(lat);
    var t = Math.pow(tq, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    var n = this.a / Math.sqrt(con);
    var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat);

    x = this.k0 * n * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + Math.pow(t, 2) + 72 * c - 58 * this.ep2))) + this.x0;
    y = this.k0 * (ml - this.ml0 + n * tq * (als * (0.5 + als / 24 * (5 - t + 9 * c + 4 * Math.pow(c, 2) + als / 30 * (61 - 58 * t + Math.pow(t, 2) + 600 * c - 330 * this.ep2))))) + this.y0;

  }
  p.x = x;
  p.y = y;
  return p;
};

/**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
exports.inverse = function(p) {
  var con, phi;
  var delta_phi;
  var i;
  var max_iter = 6;
  var lat, lon;

  if (this.sphere) {
    var f = Math.exp(p.x / (this.a * this.k0));
    var g = 0.5 * (f - 1 / f);
    var temp = this.lat0 + p.y / (this.a * this.k0);
    var h = Math.cos(temp);
    con = Math.sqrt((1 - h * h) / (1 + g * g));
    lat = asinz(con);
    if (temp < 0) {
      lat = -lat;
    }
    if ((g === 0) && (h === 0)) {
      lon = this.long0;
    }
    else {
      lon = adjust_lon(Math.atan2(g, h) + this.long0);
    }
  }
  else { // ellipsoidal form
    var x = p.x - this.x0;
    var y = p.y - this.y0;

    con = (this.ml0 + y / this.k0) / this.a;
    phi = con;
    for (i = 0; true; i++) {
      delta_phi = ((con + this.e1 * Math.sin(2 * phi) - this.e2 * Math.sin(4 * phi) + this.e3 * Math.sin(6 * phi)) / this.e0) - phi;
      phi += delta_phi;
      if (Math.abs(delta_phi) <= EPSLN) {
        break;
      }
      if (i >= max_iter) {
        return (95);
      }
    } // for()
    if (Math.abs(phi) < HALF_PI) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.tan(phi);
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var n = this.a / Math.sqrt(con);
      var r = n * (1 - this.es) / con;
      var d = x / (n * this.k0);
      var ds = Math.pow(d, 2);
      lat = phi - (n * tan_phi * ds / r) * (0.5 - ds / 24 * (5 + 3 * t + 10 * c - 4 * cs - 9 * this.ep2 - ds / 30 * (61 + 90 * t + 298 * c + 45 * ts - 252 * this.ep2 - 3 * cs)));
      lon = adjust_lon(this.long0 + (d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 - 2 * c + 28 * t - 3 * cs + 8 * this.ep2 + 24 * ts))) / cos_phi));
    }
    else {
      lat = HALF_PI * sign(y);
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["Transverse_Mercator", "Transverse Mercator", "tmerc"];

},{"../common/adjust_lon":5,"../common/asinz":6,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/mlfn":14,"../common/sign":21}],62:[function(_dereq_,module,exports){
var D2R = 0.01745329251994329577;
var tmerc = _dereq_('./tmerc');
exports.dependsOn = 'tmerc';
exports.init = function() {
  if (!this.zone) {
    return;
  }
  this.lat0 = 0;
  this.long0 = ((6 * Math.abs(this.zone)) - 183) * D2R;
  this.x0 = 500000;
  this.y0 = this.utmSouth ? 10000000 : 0;
  this.k0 = 0.9996;

  tmerc.init.apply(this);
  this.forward = tmerc.forward;
  this.inverse = tmerc.inverse;
};
exports.names = ["Universal Transverse Mercator System", "utm"];

},{"./tmerc":61}],63:[function(_dereq_,module,exports){
var adjust_lon = _dereq_('../common/adjust_lon');
var HALF_PI = Math.PI/2;
var EPSLN = 1.0e-10;
var asinz = _dereq_('../common/asinz');
/* Initialize the Van Der Grinten projection
  ----------------------------------------*/
exports.init = function() {
  //this.R = 6370997; //Radius of earth
  this.R = this.a;
};

exports.forward = function(p) {

  var lon = p.x;
  var lat = p.y;

  /* Forward equations
    -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  var x, y;

  if (Math.abs(lat) <= EPSLN) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
  }
  var theta = asinz(2 * Math.abs(lat / Math.PI));
  if ((Math.abs(dlon) <= EPSLN) || (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN)) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    }
    else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
    //  return(OK);
  }
  var al = 0.5 * Math.abs((Math.PI / dlon) - (dlon / Math.PI));
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);

  var g = costh / (sinth + costh - 1);
  var gsq = g * g;
  var m = g * (2 / sinth - 1);
  var msq = m * m;
  var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  //con = Math.abs(con / (Math.PI * this.R));
  var q = asq + g;
  con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
  if (lat >= 0) {
    //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 + con;
  }
  else {
    //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 - con;
  }
  p.x = x;
  p.y = y;
  return p;
};

/* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
exports.inverse = function(p) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d;

  /* inverse equations
    -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  con = Math.PI * this.R;
  xx = p.x / con;
  yy = p.y / con;
  xys = xx * xx + yy * yy;
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = ((3 * d) / a1) / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    }
    else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }

  if (Math.abs(xx) < EPSLN) {
    lon = this.long0;
  }
  else {
    lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
  }

  p.x = lon;
  p.y = lat;
  return p;
};
exports.names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
},{"../common/adjust_lon":5,"../common/asinz":6}],64:[function(_dereq_,module,exports){
var D2R = 0.01745329251994329577;
var R2D = 57.29577951308232088;
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var datum_transform = _dereq_('./datum_transform');
var adjust_axis = _dereq_('./adjust_axis');
var proj = _dereq_('./Proj');
var toPoint = _dereq_('./common/toPoint');
module.exports = function transform(source, dest, point) {
  var wgs84;
  if (Array.isArray(point)) {
    point = toPoint(point);
  }
  function checkNotWGS(source, dest) {
    return ((source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM) && dest.datumCode !== "WGS84");
  }

  // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
  if (source.datum && dest.datum && (checkNotWGS(source, dest) || checkNotWGS(dest, source))) {
    wgs84 = new proj('WGS84');
    transform(source, wgs84, point);
    source = wgs84;
  }
  // DGR, 2010/11/12
  if (source.axis !== "enu") {
    adjust_axis(source, false, point);
  }
  // Transform source points to long/lat, if they aren't already.
  if (source.projName === "longlat") {
    point.x *= D2R; // convert degrees to radians
    point.y *= D2R;
  }
  else {
    if (source.to_meter) {
      point.x *= source.to_meter;
      point.y *= source.to_meter;
    }
    source.inverse(point); // Convert Cartesian to longlat
  }
  // Adjust for the prime meridian if necessary
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }

  // Convert datums if needed, and if possible.
  point = datum_transform(source.datum, dest.datum, point);

  // Adjust for the prime meridian if necessary
  if (dest.from_greenwich) {
    point.x -= dest.from_greenwich;
  }

  if (dest.projName === "longlat") {
    // convert radians to decimal degrees
    point.x *= R2D;
    point.y *= R2D;
  }
  else { // else project
    dest.forward(point);
    if (dest.to_meter) {
      point.x /= dest.to_meter;
      point.y /= dest.to_meter;
    }
  }

  // DGR, 2010/11/12
  if (dest.axis !== "enu") {
    adjust_axis(dest, true, point);
  }

  return point;
};
},{"./Proj":2,"./adjust_axis":3,"./common/toPoint":23,"./datum_transform":30}],65:[function(_dereq_,module,exports){
var D2R = 0.01745329251994329577;
var extend = _dereq_('./extend');

function mapit(obj, key, v) {
  obj[key] = v.map(function(aa) {
    var o = {};
    sExpr(aa, o);
    return o;
  }).reduce(function(a, b) {
    return extend(a, b);
  }, {});
}

function sExpr(v, obj) {
  var key;
  if (!Array.isArray(v)) {
    obj[v] = true;
    return;
  }
  else {
    key = v.shift();
    if (key === 'PARAMETER') {
      key = v.shift();
    }
    if (v.length === 1) {
      if (Array.isArray(v[0])) {
        obj[key] = {};
        sExpr(v[0], obj[key]);
      }
      else {
        obj[key] = v[0];
      }
    }
    else if (!v.length) {
      obj[key] = true;
    }
    else if (key === 'TOWGS84') {
      obj[key] = v;
    }
    else {
      obj[key] = {};
      if (['UNIT', 'PRIMEM', 'VERT_DATUM'].indexOf(key) > -1) {
        obj[key] = {
          name: v[0].toLowerCase(),
          convert: v[1]
        };
        if (v.length === 3) {
          obj[key].auth = v[2];
        }
      }
      else if (key === 'SPHEROID') {
        obj[key] = {
          name: v[0],
          a: v[1],
          rf: v[2]
        };
        if (v.length === 4) {
          obj[key].auth = v[3];
        }
      }
      else if (['GEOGCS', 'GEOCCS', 'DATUM', 'VERT_CS', 'COMPD_CS', 'LOCAL_CS', 'FITTED_CS', 'LOCAL_DATUM'].indexOf(key) > -1) {
        v[0] = ['name', v[0]];
        mapit(obj, key, v);
      }
      else if (v.every(function(aa) {
        return Array.isArray(aa);
      })) {
        mapit(obj, key, v);
      }
      else {
        sExpr(v, obj[key]);
      }
    }
  }
}

function rename(obj, params) {
  var outName = params[0];
  var inName = params[1];
  if (!(outName in obj) && (inName in obj)) {
    obj[outName] = obj[inName];
    if (params.length === 3) {
      obj[outName] = params[2](obj[outName]);
    }
  }
}

function d2r(input) {
  return input * D2R;
}

function cleanWKT(wkt) {
  if (wkt.type === 'GEOGCS') {
    wkt.projName = 'longlat';
  }
  else if (wkt.type === 'LOCAL_CS') {
    wkt.projName = 'identity';
    wkt.local = true;
  }
  else {
    if (typeof wkt.PROJECTION === "object") {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    }
    else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === 'metre') {
      wkt.units = 'meter';
    }
    if (wkt.UNIT.convert) {
      wkt.to_meter = parseFloat(wkt.UNIT.convert, 10);
    }
  }

  if (wkt.GEOGCS) {
    //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
    //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
    //}
    if (wkt.GEOGCS.DATUM) {
      wkt.datumCode = wkt.GEOGCS.DATUM.name.toLowerCase();
    }
    else {
      wkt.datumCode = wkt.GEOGCS.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === 'd_') {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
      wkt.datumCode = 'nzgd49';
    }
    if (wkt.datumCode === "wgs_1984") {
      if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
        wkt.sphere = true;
      }
      wkt.datumCode = 'wgs84';
    }
    if (wkt.datumCode.slice(-6) === '_ferro') {
      wkt.datumCode = wkt.datumCode.slice(0, - 6);
    }
    if (wkt.datumCode.slice(-8) === '_jakarta') {
      wkt.datumCode = wkt.datumCode.slice(0, - 8);
    }
    if (~wkt.datumCode.indexOf('belge')) {
      wkt.datumCode = "rnb72";
    }
    if (wkt.GEOGCS.DATUM && wkt.GEOGCS.DATUM.SPHEROID) {
      wkt.ellps = wkt.GEOGCS.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
      if (wkt.ellps.toLowerCase().slice(0, 13) === "international") {
        wkt.ellps = 'intl';
      }

      wkt.a = wkt.GEOGCS.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(wkt.GEOGCS.DATUM.SPHEROID.rf, 10);
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }

  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return parseFloat(input, 10) * ratio;
  }
  var renamer = function(a) {
    return rename(wkt, a);
  };
  var list = [
    ['standard_parallel_1', 'Standard_Parallel_1'],
    ['standard_parallel_2', 'Standard_Parallel_2'],
    ['false_easting', 'False_Easting'],
    ['false_northing', 'False_Northing'],
    ['central_meridian', 'Central_Meridian'],
    ['latitude_of_origin', 'Latitude_Of_Origin'],
    ['scale_factor', 'Scale_Factor'],
    ['k0', 'scale_factor'],
    ['latitude_of_center', 'Latitude_of_center'],
    ['lat0', 'latitude_of_center', d2r],
    ['longitude_of_center', 'Longitude_Of_Center'],
    ['longc', 'longitude_of_center', d2r],
    ['x0', 'false_easting', toMeter],
    ['y0', 'false_northing', toMeter],
    ['long0', 'central_meridian', d2r],
    ['lat0', 'latitude_of_origin', d2r],
    ['lat0', 'standard_parallel_1', d2r],
    ['lat1', 'standard_parallel_1', d2r],
    ['lat2', 'standard_parallel_2', d2r],
    ['alpha', 'azimuth', d2r],
    ['srsCode', 'name']
  ];
  list.forEach(renamer);
  if (!wkt.long0 && wkt.longc && (wkt.PROJECTION === 'Albers_Conic_Equal_Area' || wkt.PROJECTION === "Lambert_Azimuthal_Equal_Area")) {
    wkt.long0 = wkt.longc;
  }
}
module.exports = function(wkt, self) {
  var lisp = JSON.parse(("," + wkt).replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g, ',["$1",').slice(1).replace(/\s*\,\s*([A-Z_0-9]+?)\]/g, ',"$1"]'));
  var type = lisp.shift();
  var name = lisp.shift();
  lisp.unshift(['name', name]);
  lisp.unshift(['type', type]);
  lisp.unshift('output');
  var obj = {};
  sExpr(lisp, obj);
  cleanWKT(obj.output);
  return extend(self, obj.output);
};

},{"./extend":33}],66:[function(_dereq_,module,exports){



/**
 * UTM zones are grouped, and assigned to one of a group of 6
 * sets.
 *
 * {int} @private
 */
var NUM_100K_SETS = 6;

/**
 * The column letters (for easting) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

/**
 * The row letters (for northing) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

var A = 65; // A
var I = 73; // I
var O = 79; // O
var V = 86; // V
var Z = 90; // Z

/**
 * Conversion of lat/lon to MGRS.
 *
 * @param {object} ll Object literal with lat and lon properties on a
 *     WGS84 ellipsoid.
 * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
 *      100 m, 4 for 1000 m or 5 for 10000 m). Optional, default is 5.
 * @return {string} the MGRS string for the given location and accuracy.
 */
exports.forward = function(ll, accuracy) {
  accuracy = accuracy || 5; // default accuracy 1m
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
};

/**
 * Conversion of MGRS to lat/lon.
 *
 * @param {string} mgrs MGRS string.
 * @return {array} An array with left (longitude), bottom (latitude), right
 *     (longitude) and top (latitude) values in WGS84, representing the
 *     bounding box for the provided MGRS reference.
 */
exports.inverse = function(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
};

exports.toPoint = function(mgrsStr) {
  var llbbox = exports.inverse(mgrsStr);
  return [(llbbox[2] + llbbox[0]) / 2, (llbbox[3] + llbbox[1]) / 2];
};
/**
 * Conversion from degrees to radians.
 *
 * @private
 * @param {number} deg the angle in degrees.
 * @return {number} the angle in radians.
 */
function degToRad(deg) {
  return (deg * (Math.PI / 180.0));
}

/**
 * Conversion from radians to degrees.
 *
 * @private
 * @param {number} rad the angle in radians.
 * @return {number} the angle in degrees.
 */
function radToDeg(rad) {
  return (180.0 * (rad / Math.PI));
}

/**
 * Converts a set of Longitude and Latitude co-ordinates to UTM
 * using the WGS84 ellipsoid.
 *
 * @private
 * @param {object} ll Object literal with lat and lon properties
 *     representing the WGS84 coordinate to be converted.
 * @return {object} Object literal containing the UTM value with easting,
 *     northing, zoneNumber and zoneLetter properties, and an optional
 *     accuracy property in digits. Returns null if the conversion failed.
 */
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A, M;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  // (int)
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;

  //Make sure the longitude 180.00 is in Zone 60
  if (Long === 180) {
    ZoneNumber = 60;
  }

  // Special zone for Norway
  if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
    ZoneNumber = 32;
  }

  // Special zones for Svalbard
  if (Lat >= 72.0 && Lat < 84.0) {
    if (Long >= 0.0 && Long < 9.0) {
      ZoneNumber = 31;
    }
    else if (Long >= 9.0 && Long < 21.0) {
      ZoneNumber = 33;
    }
    else if (Long >= 21.0 && Long < 33.0) {
      ZoneNumber = 35;
    }
    else if (Long >= 33.0 && Long < 42.0) {
      ZoneNumber = 37;
    }
  }

  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
  // in middle of
  // zone
  LongOriginRad = degToRad(LongOrigin);

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A = Math.cos(LatRad) * (LongRad - LongOriginRad);

  M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

  var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

  var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
  if (Lat < 0.0) {
    UTMNorthing += 10000000.0; //10000000 meter offset for
    // southern hemisphere
  }

  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}

/**
 * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
 * class where the Zone can be specified as a single string eg."60N" which
 * is then broken down into the ZoneNumber and ZoneLetter.
 *
 * @private
 * @param {object} utm An object literal with northing, easting, zoneNumber
 *     and zoneLetter properties. If an optional accuracy property is
 *     provided (in meters), a bounding box will be returned instead of
 *     latitude and longitude.
 * @return {object} An object literal containing either lat and lon values
 *     (if no accuracy was provided), or top, right, bottom and left values
 *     for the bounding box calculated according to the provided accuracy.
 *     Returns null if the conversion failed.
 */
function UTMtoLL(utm) {

  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  // check the ZoneNummber is valid
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }

  var k0 = 0.9996;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C1, R1, D, M;
  var LongOrigin;
  var mu, phi1Rad;

  // remove 500,000 meter offset for longitude
  var x = UTMEasting - 500000.0;
  var y = UTMNorthing;

  // We must know somehow if we are in the Northern or Southern
  // hemisphere, this is the only time we use the letter So even
  // if the Zone letter isn't exactly correct it should indicate
  // the hemisphere correctly
  if (zoneLetter < 'N') {
    y -= 10000000.0; // remove 10,000,000 meter offset used
    // for southern hemisphere
  }

  // There are 60 zones with zone 1 being at West -180 to -174
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
  // in middle of
  // zone

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  M = y / k0;
  mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
  // double phi1 = ProjMath.radToDeg(phi1Rad);

  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);

  var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);

  var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);

  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  }
  else {
    result = {
      lat: lat,
      lon: lon
    };
  }
  return result;
}

/**
 * Calculates the MGRS letter designator for the given latitude.
 *
 * @private
 * @param {number} lat The latitude in WGS84 to get the letter designator
 *     for.
 * @return {char} The letter designator.
 */
function getLetterDesignator(lat) {
  //This is here as an error flag to show that the Latitude is
  //outside MGRS limits
  var LetterDesignator = 'Z';

  if ((84 >= lat) && (lat >= 72)) {
    LetterDesignator = 'X';
  }
  else if ((72 > lat) && (lat >= 64)) {
    LetterDesignator = 'W';
  }
  else if ((64 > lat) && (lat >= 56)) {
    LetterDesignator = 'V';
  }
  else if ((56 > lat) && (lat >= 48)) {
    LetterDesignator = 'U';
  }
  else if ((48 > lat) && (lat >= 40)) {
    LetterDesignator = 'T';
  }
  else if ((40 > lat) && (lat >= 32)) {
    LetterDesignator = 'S';
  }
  else if ((32 > lat) && (lat >= 24)) {
    LetterDesignator = 'R';
  }
  else if ((24 > lat) && (lat >= 16)) {
    LetterDesignator = 'Q';
  }
  else if ((16 > lat) && (lat >= 8)) {
    LetterDesignator = 'P';
  }
  else if ((8 > lat) && (lat >= 0)) {
    LetterDesignator = 'N';
  }
  else if ((0 > lat) && (lat >= -8)) {
    LetterDesignator = 'M';
  }
  else if ((-8 > lat) && (lat >= -16)) {
    LetterDesignator = 'L';
  }
  else if ((-16 > lat) && (lat >= -24)) {
    LetterDesignator = 'K';
  }
  else if ((-24 > lat) && (lat >= -32)) {
    LetterDesignator = 'J';
  }
  else if ((-32 > lat) && (lat >= -40)) {
    LetterDesignator = 'H';
  }
  else if ((-40 > lat) && (lat >= -48)) {
    LetterDesignator = 'G';
  }
  else if ((-48 > lat) && (lat >= -56)) {
    LetterDesignator = 'F';
  }
  else if ((-56 > lat) && (lat >= -64)) {
    LetterDesignator = 'E';
  }
  else if ((-64 > lat) && (lat >= -72)) {
    LetterDesignator = 'D';
  }
  else if ((-72 > lat) && (lat >= -80)) {
    LetterDesignator = 'C';
  }
  return LetterDesignator;
}

/**
 * Encodes a UTM location as MGRS string.
 *
 * @private
 * @param {object} utm An object literal with easting, northing,
 *     zoneLetter, zoneNumber
 * @param {number} accuracy Accuracy in digits (1-5).
 * @return {string} MGRS string for the given UTM location.
 */
function encode(utm, accuracy) {
  var seasting = "" + utm.easting,
    snorthing = "" + utm.northing;

  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}

/**
 * Get the two letter 100k designator for a given UTM easting,
 * northing and zone number value.
 *
 * @private
 * @param {number} easting
 * @param {number} northing
 * @param {number} zoneNumber
 * @return the two letter 100k designator for the given UTM location.
 */
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 100000);
  var setRow = Math.floor(northing / 100000) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}

/**
 * Given a UTM zone number, figure out the MGRS 100K set it is in.
 *
 * @private
 * @param {number} i An UTM zone number.
 * @return {number} the 100k set the UTM zone is in.
 */
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }

  return setParm;
}

/**
 * Get the two-letter MGRS 100k designator given information
 * translated from the UTM northing, easting and zone number.
 *
 * @private
 * @param {number} column the column index as it relates to the MGRS
 *        100k set spreadsheet, created from the UTM easting.
 *        Values are 1-8.
 * @param {number} row the row index as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM northing value. Values
 *        are from 0-19.
 * @param {number} parm the set block, as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM zone. Values are from
 *        1-60.
 * @return two letter MGRS 100k code.
 */
function getLetter100kID(column, row, parm) {
  // colOrigin and rowOrigin are the letters at the origin of the set
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

  // colInt and rowInt are the letters to build to return
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }

  if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
    colInt++;
  }

  if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
    colInt++;

    if (colInt === I) {
      colInt++;
    }
  }

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
    rowInt++;
  }

  if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
    rowInt++;

    if (rowInt === I) {
      rowInt++;
    }
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }

  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}

/**
 * Decode the UTM parameters from a MGRS string.
 *
 * @private
 * @param {string} mgrsString an UPPERCASE coordinate string is expected.
 * @return {object} An object literal with easting, northing, zoneLetter,
 *     zoneNumber and accuracy (in meters) properties.
 */
function decode(mgrsString) {

  if (mgrsString && mgrsString.length === 0) {
    throw ("MGRSPoint coverting from nothing");
  }

  var length = mgrsString.length;

  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;

  // get Zone number
  while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw ("MGRSPoint bad conversion from: " + mgrsString);
    }
    sb += testChar;
    i++;
  }

  var zoneNumber = parseInt(sb, 10);

  if (i === 0 || i + 3 > length) {
    // A good MGRS string has to be 4-5 digits long,
    // ##AAA/#AAA at least.
    throw ("MGRSPoint bad conversion from: " + mgrsString);
  }

  var zoneLetter = mgrsString.charAt(i++);

  // Should we check the zone letter here? Why not.
  if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
    throw ("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
  }

  hunK = mgrsString.substring(i, i += 2);

  var set = get100kSetForZone(zoneNumber);

  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);

  // We have a bug where the northing may be 2000000 too low.
  // How
  // do we know when to roll over?

  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2000000;
  }

  // calculate the char index for easting/northing separator
  var remainder = length - i;

  if (remainder % 2 !== 0) {
    throw ("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
  }

  var sep = remainder / 2;

  var sepEasting = 0.0;
  var sepNorthing = 0.0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 100000.0 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }

  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;

  return {
    easting: easting,
    northing: northing,
    zoneLetter: zoneLetter,
    zoneNumber: zoneNumber,
    accuracy: accuracyBonus
  };
}

/**
 * Given the first letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the easting value that
 * should be added to the other, secondary easting value.
 *
 * @private
 * @param {char} e The first letter from a two-letter MGRS 100´k zone.
 * @param {number} set The MGRS table set for the zone number.
 * @return {number} The easting value for the given letter and set.
 */
function getEastingFromChar(e, set) {
  // colOrigin is the letter at the origin of the set for the
  // column
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 100000.0;
  var rewindMarker = false;

  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw ("Bad character: " + e);
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 100000.0;
  }

  return eastingValue;
}

/**
 * Given the second letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the northing value that
 * should be added to the other, secondary northing value. You have to
 * remember that Northings are determined from the equator, and the vertical
 * cycle of letters mean a 2000000 additional northing meters. This happens
 * approx. every 18 degrees of latitude. This method does *NOT* count any
 * additional northings. You have to figure out how many 2000000 meters need
 * to be added for the zone letter of the MGRS coordinate.
 *
 * @private
 * @param {char} n Second letter of the MGRS 100k zone
 * @param {number} set The MGRS table set number, which is dependent on the
 *     UTM zone number.
 * @return {number} The northing value for the given letter and set.
 */
function getNorthingFromChar(n, set) {

  if (n > 'V') {
    throw ("MGRSPoint given invalid Northing " + n);
  }

  // rowOrigin is the letter at the origin of the set for the
  // column
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0.0;
  var rewindMarker = false;

  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    // fixing a bug making whole application hang in this loop
    // when 'n' is a wrong character
    if (curRow > V) {
      if (rewindMarker) { // making sure that this loop ends
        throw ("Bad character: " + n);
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 100000.0;
  }

  return northingValue;
}

/**
 * The function getMinNorthing returns the minimum northing value of a MGRS
 * zone.
 *
 * Ported from Geotrans' c Lattitude_Band_Value structure table.
 *
 * @private
 * @param {char} zoneLetter The MGRS zone to get the min northing for.
 * @return {number}
 */
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
  case 'C':
    northing = 1100000.0;
    break;
  case 'D':
    northing = 2000000.0;
    break;
  case 'E':
    northing = 2800000.0;
    break;
  case 'F':
    northing = 3700000.0;
    break;
  case 'G':
    northing = 4600000.0;
    break;
  case 'H':
    northing = 5500000.0;
    break;
  case 'J':
    northing = 6400000.0;
    break;
  case 'K':
    northing = 7300000.0;
    break;
  case 'L':
    northing = 8200000.0;
    break;
  case 'M':
    northing = 9100000.0;
    break;
  case 'N':
    northing = 0.0;
    break;
  case 'P':
    northing = 800000.0;
    break;
  case 'Q':
    northing = 1700000.0;
    break;
  case 'R':
    northing = 2600000.0;
    break;
  case 'S':
    northing = 3500000.0;
    break;
  case 'T':
    northing = 4400000.0;
    break;
  case 'U':
    northing = 5300000.0;
    break;
  case 'V':
    northing = 6200000.0;
    break;
  case 'W':
    northing = 7000000.0;
    break;
  case 'X':
    northing = 7900000.0;
    break;
  default:
    northing = -1.0;
  }
  if (northing >= 0.0) {
    return northing;
  }
  else {
    throw ("Invalid zone letter: " + zoneLetter);
  }

}

},{}],67:[function(_dereq_,module,exports){
module.exports={
  "name": "proj4",
  "version": "2.1.3-alpha",
  "description": "Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",
  "main": "lib/index.js",
  "directories": {
    "test": "test",
    "doc": "docs"
  },
  "scripts": {
    "test": "./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/proj4js/proj4js.git"
  },
  "author": "",
  "license": "MIT",
  "jam": {
    "main": "dist/proj4.js",
    "include": [
      "dist/proj4.js",
      "README.md",
      "AUTHORS",
      "LICENSE.md"
    ]
  },
  "devDependencies": {
    "grunt-cli": "~0.1.13",
    "grunt": "~0.4.2",
    "grunt-contrib-connect": "~0.6.0",
    "grunt-contrib-jshint": "~0.8.0",
    "chai": "~1.8.1",
    "mocha": "~1.17.1",
    "grunt-mocha-phantomjs": "~0.4.0",
    "browserify": "~3.24.5",
    "grunt-browserify": "~1.3.0",
    "grunt-contrib-uglify": "~0.3.2",
    "curl": "git://github.com/cujojs/curl.git",
    "istanbul": "~0.2.4",
    "tin": "~0.4.0"
  },
  "dependencies": {
    "mgrs": "0.0.0"
  }
}
},{}],"VzEyzV":[function(_dereq_,module,exports){
var projs = [
 _dereq_('./lib/projections/tmerc'),
	_dereq_('./lib/projections/utm'),
	_dereq_('./lib/projections/sterea'),
	_dereq_('./lib/projections/stere'),
	_dereq_('./lib/projections/somerc'),
	_dereq_('./lib/projections/omerc'),
	_dereq_('./lib/projections/lcc'),
	_dereq_('./lib/projections/krovak'),
	_dereq_('./lib/projections/cass'),
	_dereq_('./lib/projections/laea'),
	_dereq_('./lib/projections/aea'),
	_dereq_('./lib/projections/gnom'),
	_dereq_('./lib/projections/cea'),
	_dereq_('./lib/projections/eqc'),
	_dereq_('./lib/projections/poly'),
	_dereq_('./lib/projections/nzmg'),
	_dereq_('./lib/projections/mill'),
	_dereq_('./lib/projections/sinu'),
	_dereq_('./lib/projections/moll'),
	_dereq_('./lib/projections/eqdc'),
	_dereq_('./lib/projections/vandg'),
	_dereq_('./lib/projections/aeqd')
];
module.exports = function(proj4){
 projs.forEach(function(proj){
   proj4.Proj.projections.add(proj);
 });
}
},{"./lib/projections/aea":39,"./lib/projections/aeqd":40,"./lib/projections/cass":41,"./lib/projections/cea":42,"./lib/projections/eqc":43,"./lib/projections/eqdc":44,"./lib/projections/gnom":46,"./lib/projections/krovak":47,"./lib/projections/laea":48,"./lib/projections/lcc":49,"./lib/projections/mill":52,"./lib/projections/moll":53,"./lib/projections/nzmg":54,"./lib/projections/omerc":55,"./lib/projections/poly":56,"./lib/projections/sinu":57,"./lib/projections/somerc":58,"./lib/projections/stere":59,"./lib/projections/sterea":60,"./lib/projections/tmerc":61,"./lib/projections/utm":62,"./lib/projections/vandg":63}],"./includedProjections":[function(_dereq_,module,exports){
module.exports=_dereq_('VzEyzV');
},{}]},{},[35])
(35)
});

/*
 proj4 라이브러리가 먼저 로딩 되어야 한다.
 */
/**
 * sop.Projection.Proj
 * proj4js를 이용하여 project, unproject를 수행한다.
 *
 * 기본 좌표 타입은 SR-ORG:7308(UTM-K) 좌표를 사용한다.
 *
 * Created on 2014-08-25.
 */

sop.Projection.Proj = sop.Class.extend({

	initialize: function (a, def) {
		if (sop.Projection._isProj4Obj(a)) {
			this._proj = a;
		} else {
			var code = a;
			if (def) {
				if (proj4.defs[sop.UTMK.PROJ_CODE] === undefined) {
					proj4.defs(sop.UTMK.PROJ_CODE, sop.UTMK.PROJ_DEF);
				}
				// proj4 좌표체계를 정의 한다.
				proj4.defs(code, def);
			} else if (proj4.defs[code] === undefined) {
				var urn = code.split(':');
				if (urn.length > 3) {
					code = urn[urn.length - 3] + ':' + urn[urn.length - 1];
				}
				if (proj4.defs[code] === undefined) {
					throw 'No projection definition for code ' + code;
				}
			}
			this._proj = proj4(sop.UTMK.PROJ_CODE, code);
		}
	},

	project: function (utmk) {
		var point = this._proj.forward([utmk.x, utmk.y]);
		return new sop.Point(point[0], point[1]);
	},

	unproject: function (point, unbounded) {
		var point2 = this._proj.inverse([point.x, point.y]);
		return new sop.UTMK(point2[0], point2[1], unbounded);
	}
});

/*
proj4js 라이브러리 객체인지 확인.
 */
sop.Projection._isProj4Obj = function (a) {
	return (typeof a.inverse !== 'undefined' &&
		typeof a.forward !== 'undefined');
};

/*
 scale따른 변환 실행.
 sop.CRS.Proj.TMS 에서 사용.
 */
sop.Projection.ScaleDependantTransformation = function (scaleTransforms) {
	this.scaleTransforms = scaleTransforms;
};

sop.Projection.ScaleDependantTransformation.prototype.transform = function (point, scale) {
	return this.scaleTransforms[scale].transform(point, scale);
};

sop.Projection.ScaleDependantTransformation.prototype.untransform = function (point, scale) {
	return this.scaleTransforms[scale].untransform(point, scale);
};

/**
 * CRS.Proj
 * proj4js를 이용 한 좌표변환을 담당하는 베이스 클레스.
 * Created on 2014-08-25.
 */

sop.CRS.Proj = sop.Class.extend({
	includes: sop.CRS,

	options: {
		transformation: new sop.Transformation(1, 0, -1, 0)
	},

	initialize: function (code, def, options) {
		var proj;

		if (sop.Projection._isProj4Obj(code)) {
			proj = code;
			def = proj.srcCode;
			this.projection = new sop.Projection.Proj(proj);
		} else {
			this.projection = new sop.Projection.Proj(code, def);
		}

		options = options || {};

		sop.Util.setOptions(this, options);
		this.code = code;
		this.transformation = this.options.transformation;

		// 생성한 sop.Projection.Proj에 bounds 영역을 설정 한다.
		this.projection.bounds = this.options.bounds;

		if (this.options.origin) {
			this.transformation =
				new sop.Transformation(1, -this.options.origin[0],
					-1, this.options.origin[1]);
		}

		if (this.options.scales) {
			this._scales = this.options.scales;
		} else if (this.options.resolutions) {
			this._scales = [];
			for (var i = this.options.resolutions.length - 1; i >= 0; i--) {
				if (this.options.resolutions[i]) {
					this._scales[i] = 1 / this.options.resolutions[i];
				}
			}
		}
	},

	scale: function (zoom) {
		return this._scales[zoom];
	},

	getSize: function (zoom) {
		var b = this.options.bounds,
			s,
			min,
			max;

		if (b) {
			s = this.scale(zoom);
			min = this.transformation.transform(b.min, s);
			max = this.transformation.transform(b.max, s);
			return sop.point(Math.abs(max.x - min.x), Math.abs(max.y - min.y));
		} else {
			// Backwards compatibility with Leaflet < 0.7
			s = 256 * Math.pow(2, zoom);
			return sop.point(s, s);
		}
	}
});



/**
 * Created by htkim on 2014-09-16.
 */
sop.CRS.Proj.TMS = sop.CRS.Proj.extend({
	options: {
		tileSize: 256
	},

	initialize: function (a, b, c, d) {
		var code,
			def,
			proj,
			projectedBounds,
			options;

		if (sop.Projection._isProj4Obj(a)) {
			proj = a;
			projectedBounds = b;
			options = c || {};
			options.origin = [projectedBounds[0], projectedBounds[3]];
			sop.CRS.Proj.prototype.initialize.call(this, proj, options);
		} else {
			code = a;
			def = b;
			projectedBounds = c;
			options = d || {};
			options.origin = [projectedBounds[0], projectedBounds[3]];
			sop.CRS.Proj.prototype.initialize.call(this, code, def, options);
		}

		this.projectedBounds = projectedBounds;

		this.projection.bounds = sop.bounds([projectedBounds[0], projectedBounds[1]],
			[projectedBounds[2], projectedBounds[3]]);

		this._sizes = this._calculateSizes();
	},

	_calculateSizes: function () {
		var sizes = [],
			crsBounds = this.projectedBounds,
			projectedTileSize,
			i,
			x,
			y;
		for (i = this._scales.length - 1; i >= 0; i--) {
			if (this._scales[i]) {
				projectedTileSize = this.options.tileSize / this._scales[i];
				// to prevent very small rounding errors from causing us to round up,
				// cut any decimals after 3rd before rounding up.
				x = Math.ceil(parseFloat((crsBounds[2] - crsBounds[0]) / projectedTileSize).toPrecision(3)) *
					projectedTileSize * this._scales[i];
				y = Math.ceil(parseFloat((crsBounds[3] - crsBounds[1]) / projectedTileSize).toPrecision(3)) *
					projectedTileSize * this._scales[i];
				sizes[i] = sop.point(x, y);
			}
		}

		return sizes;
	},

	getSize: function (zoom) {
		return this._sizes[zoom];
	}
});


sop.Ajax = sop.Class.extend({
	version: '2.0-dev',

	initialize: function () {
		var i, activeXids = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
		this.cancel = false;
		this.async = true;
		//this.heads, this.params, this.xhr;
		var xhr;
		if (sop.Util.isUndefined(xhr)) {
			if (sop.Browser.xhr) {
				xhr = new XMLHttpRequest();
			}
			else {
				for (i = 0; i < activeXids.length; i += 1) {
					try {
						xhr = new ActiveXObject(activeXids[i]);
						break;
					} catch (e) {
					}
				}
			}
		}

		if (sop.Util.isUndefined(this.heads)) {
			this.heads = {};
		}

		if (sop.Util.isUndefined(this.params)) {
			this.params = {};
		}

		this.xhr = xhr;
	},

	clear: function () {
		var i, p;

		for (i in this.heads) {
			if (this.heads.hasOwnProperty(i)) {
				delete this.heads[i];
			}
		}

		for (p in this.params) {
			if (this.params.hasOwnProperty(p)) {
				delete this.params[p];
			}
		}

		this.cancel = false;
	},

	addHeader: function (K, Y) {
		if (sop.Util.isUndefined(this.heads)) {
			this.heads = this.heads || {};
		}

		this.heads[K] = Y;
	},

	addParam: function (K, Y) {
		if (sop.Util.isUndefined(this.params)) {
			this.params = this.params || {};
		}

		this.params[K] = Y;
	},

	/**
	 * @method $d.api.AjaxAPI.request Ajax를 통해 정보 요청
	 * @param method - POST, GET, PUT, DELETE, HEAD
	 * @param opt { url, method, async, datatype } 의 Object를 정의
	 *                url - 요청 대상 URL
	 *                method - GET, POST, PUT, DELETE (default는 GET)
	 *                async - true : 비동기, false : 동기 방식 (default true)
	 *                datatype - xml, json (default는 json)
	 * @return none
	 */
	request: function (opt) {
		var parameter = '', h, p, that = this, method;
		var url = opt.url;
		this.cancel = false;

		if (sop.Util.isUndefined(opt)) {
			opt = {};
		}
		if (sop.Util.isUndefined(url)) {
			throw new Error('url undefinded');
		}

		method = sop.Util.isUndefined(opt.method) ? 'GET' : opt.method;
		this.async = sop.Util.isUndefined(opt.async) ? true : opt.async;
		this.format = sop.Util.isUndefined(opt.format) ? 'json' : opt.format;

		for (p in this.params) {
			if (this.params.hasOwnProperty(p)) {
				parameter += p + '=' + this.params[p] + '&';
			}
		}

		if (parameter.length > 1) {
			parameter = parameter.slice(0, parameter.length - 1);
		}
		// 초기화
		if (sop.Browser.ielt9 && method === 'GET') {
			this.xhr = new XDomainRequest();
			this.xhr.onload = function () {
				if (that.format === 'json') {
					that.onSuccess(xhr.status, JSON.parse(xhr.responseText));
				}
				else {
					that.onSuccess(xhr.status, xhr.responseText);
				}
			};
			this.xhr.onerror = function () {
				that.onFail(xhr.responseText);
			};
		}

		var xhr = this.xhr;
		
		if (sop.Browser.safari) {
			xhr = new XMLHttpRequest();
		}

		xhr.onreadystatechange = function () {
			//console.log('inside..........onreadystatechange');
			if (!that.cancel) {
				//console.log('xhr.readyState', xhr.readyState);
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						if (that.format === 'json') {
							that.onSuccess(this.status, JSON.parse(xhr.responseText));
						}
						else if (that.format === 'xml') {
							that.onSuccess(this.status, xhr.responseXML);
						}
						else {
							that.onSuccess(this.status, xhr.responseText);
						}
					} else if (this.status === 204) {
						that.onSuccess(xhr.status);
					} else {
						that.onFail(xhr.status);
					}

					// Block UI 닫기
//					if (!that.async) {
//					}
				} else if (xhr.readyState === 0) {
					that.onNotInitialized();
				} else if (xhr.readyState === 1) {
					that.onEstablished();
				} else if (xhr.readyState === 2) {
					that.noReceived();
				} else if (xhr.readyState === 3) {
					that.onProcessing();
				}
			}
		};

		if (method === 'POST' || method === 'PUT') { // POST, PUT
			xhr.open(method, url, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
			for (h in this.heads) {
				if (this.heads.hasOwnProperty(h)) {
					xhr.setRequestHeader(h, this.heads[h]);
				}
			}

			xhr.send(parameter);
		}
		else { // GET, DELETE, HEAD
			if (parameter.length > 0) {
				url += '?' + parameter;
			}
			//xhr.withCredentials=false;
			xhr.open(method, url, true);
			for (h in this.heads) {
				if (this.heads.hasOwnProperty(h)) {
					xhr.setRequestHeader(h, this.heads[h]);
				}
			}
			xhr.send();
		}
	},

	onSuccess: function (status, response) {
	},

	onFail: function (status) {
	},

	onNotInitialized: function () {
	},

	onEstablished: function () {
	},

	noReceived: function () {
	},

	onProcessing: function () {
	},

	onCancel: function () {
	}

});


/**
 * Created by neighbor on 2014-09-24.
 */
sop.Api = sop.Ajax.extend({
	url: '',
	host: 'http://192.168.0.200',
	port: '8080',
	context: 'SOPOpenAPI',
	isAccessToken: true,

	initialize: function (opt) {
		//xhr 초기화 및 XMLHttpRequest 생성
		//param, header 초기화
		if (sop.Util.isUndefined(opt)) {
			throw new Error('Check opt Parameter');
		}
		sop.Ajax.prototype.initialize.call(this);

		opt.datatype = sop.Util.isUndefined(opt.datatype) ? 'json' : opt.datatype;

		//url 설정
		opt.url = this.host + ':' + this.port + '/' + this.context + this.url + '.' + opt.datatype;

		//callback Success 함수, Fail 함수 설정
		if (!sop.Util.isUndefined(opt.success)) {
			this.callbackSucesssFunc = opt.success;
		}

		//callback Success 함수, Fail 함수 설정
		if (!sop.Util.isUndefined(opt.fail)) {
			this.callbackFailFunc = opt.fail;
		}

		this.execute(opt);

	},

	execute: function (opt) {
		var that = this, paramKey, headerKey;

		//param, Header 초기화
		that.clear();

		//인증 API 외 API 호출시 accessToken 필요
		if (this.isAccessToken) {
			if (sop.Util.isUndefined(opt.accessToken)) {
				throw new Error('access Token undefined');
			} else {
				that.addParam('accessToken', opt.accessToken);
			}
		}


		if (opt.datatype === 'geojson' || opt.datatype === 'json') {
			opt.format = 'json';
		}
		else if (opt.datatype === 'kml' || opt.datatype === 'xml') {
			opt.format = 'xml';
		}

		else {
			throw new Error('Check Ajax datatype');
		}

		if (!sop.Util.isUndefined(opt.param)) {
			for (paramKey in opt.param) {
				that.addParam(paramKey, opt.param[paramKey]);
			}
		}

		if (!sop.Util.isUndefined(opt.heaader)) {
			for (headerKey in opt.heaader) {
				that.addHeader(headerKey, opt.heaader[headerKey]);
			}
		}
		that.request(opt);

	},

	onSuccess: function (status, res) {
		//console.loglog('AbsApi Success status', status);
		this.callbackSucesssFunc(status, res);

	},

	onFail: function (status) {
		//console.log('AbsApi Fail status', status);
		this.callbackFailFunc(status);
	},

	callbackSucesssFunc: function (status, res) {
		//console.log('Abs..callbackSucesssFunc', status);
	},
	callbackFailFunc: function (status) {
		//console.log('Abs..callbackFailFunc', status);
	}

});

sop.api = {};

/**
 * 인증 API
 * URL : '/OpenAPI3/auth/authentication'
 */
sop.Api.Authentication = sop.Api.extend({
	url: '/OpenAPI3/auth/authentication',
	isAccessToken: false
});

sop.api.authentication = function (opt) {
	return new sop.Api.Authentication(opt);
};


/**
 * Created by neighbor on 2014-09-26.
 */
sop.Api.Stats = {};
sop.api.stats = {};

sop.Api.Stats.Population = sop.Api.extend({
	url: '/OpenAPI3/stats/population'
});

sop.api.stats.population = function (opt) {
	return new sop.Api.Stats.Population(opt);
};

sop.Api.Stats.SearchPopulation = sop.Api.extend({
	url: '/OpenAPI3/stats/searchpopulation'
});

sop.api.stats.searchPopulation = function (opt) {
	return new sop.Api.Stats.SearchPopulation(opt);
};

sop.Api.Stats.Industrycode = sop.Api.extend({
	url: '/OpenAPI3/stats/industrycode'
});

sop.api.stats.industrycode = function (opt) {
	return new sop.Api.Stats.Industrycode(opt);
};

sop.Api.Stats.Company = sop.Api.extend({
	url: '/OpenAPI3/stats/company'
});

sop.api.stats.company = function (opt) {
	return new sop.Api.Stats.Company(opt);
};

sop.Api.Stats.Household = sop.Api.extend({
	url: '/OpenAPI3/stats/household'
});

sop.api.stats.household = function (opt) {
	return new sop.Api.Stats.Household(opt);
};

sop.Api.Stats.House = sop.Api.extend({
	url: '/OpenAPI3/stats/house'
});

sop.api.stats.house = function (opt) {
	return new sop.Api.Stats.House(opt);
};

sop.Api.Stats.FarmHousehold = sop.Api.extend({
	url: '/OpenAPI3/stats/farmhousehold'
});

sop.api.stats.farmhousehold = function (opt) {
	return new sop.Api.Stats.FarmHousehold(opt);
};

sop.Api.Stats.ForestryHousehold = sop.Api.extend({
	url: '/OpenAPI3/stats/forestryhousehold'
});

sop.api.stats.forestryhousehold = function (opt) {
	return new sop.Api.Stats.ForestryHousehold(opt);
};

sop.Api.Stats.FisheryHousehold = sop.Api.extend({
	url: '/OpenAPI3/stats/fisheryhousehold'
});

sop.api.stats.fisheryhousehold = function (opt) {
	return new sop.Api.Stats.FisheryHousehold(opt);
};

sop.Api.Stats.FisheryHousehold = sop.Api.extend({
	url: '/OpenAPI3/stats/fisheryhousehold'
});

sop.api.stats.fisheryhousehold = function (opt) {
	return new sop.Api.Stats.FisheryHousehold(opt);
};

sop.Api.Stats.HouseholdMember = sop.Api.extend({
	url: '/OpenAPI3/stats/householdmember'
});

sop.api.stats.householdmember = function (opt) {
	return new sop.Api.Stats.HouseholdMember(opt);
};


/**
 * Created by neighbor on 2014-09-26.
 */
sop.Api.Boundary = {};
sop.api.boundary = {};

sop.Api.Boundary.Hadmarea = sop.Api.extend({
	url: '/OpenAPI3/boundary/hadmarea'
});

sop.api.boundary.hadmarea = function (opt) {
	return new sop.Api.Boundary.Hadmarea(opt);
};

sop.Api.Boundary.Statsarea = sop.Api.extend({
	url: '/OpenAPI3/boundary/statsarea'
});

sop.api.boundary.statsarea = function (opt) {
	return new sop.Api.Boundary.Statsarea(opt);
};

sop.Api.Boundary.Basearea = sop.Api.extend({
	url: '/OpenAPI3/boundary/basearea'
});

sop.api.boundary.basearea = function (opt) {
	return new sop.Api.Boundary.Basearea(opt);
};

sop.Api.Boundary.Userarea = sop.Api.extend({
	url: '/OpenAPI3/boundary/userarea'
});

sop.api.boundary.userarea = function (opt) {
	return new sop.Api.Boundary.Userarea(opt);
};


/**
 * Created on 2014-09-19.
 * 위도/경도(Latitude, Longtitude) 좌표를 나타냄.
 *
 */

sop.LatLng = function (lat, lng) {

	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	this.lat = +lat;
	this.lng = +lng;

	var code = sop.UTMK.PROJ_CODE;
	var def = sop.UTMK.PROJ_DEF;

	// proj4에 정의 되어 있는 UTM-K를 확인 한다.
	if (proj4.defs[code] === undefined) {
		proj4.defs(code, def);
	}

	var point = proj4(code).forward([this.lng, this.lat]);

	sop.UTMK.call(this, point[0], point[1]);

	this.toString = function (precision) {
		var returnStr = 'UTMK(' +
			sop.Util.formatNum(this.x, precision) + ', ' +
			sop.Util.formatNum(this.y, precision) + ')';
		returnStr += ' LatLng(' + this.lat + ', ' + this.lng + ')';
		return returnStr;
	};
};

sop.LatLng.prototype = sop.UTMK.prototype;


/*
 * sop.MarkerClusterGroup extends sop.FeatureGroup by clustering the markers contained within
 */

sop.MarkerClusterGroup = sop.FeatureGroup.extend({

	options: {
		maxClusterRadius: 80, //A cluster will cover at most this many pixels from its center
		iconCreateFunction: null,

		spiderfyOnMaxZoom: true,
		showCoverageOnHover: true,
		zoomToBoundsOnClick: true,
		singleMarkerMode: false,

		disableClusteringAtZoom: null,

		// Setting this to false prevents the removal of any clusters outside of the viewpoint, which
		// is the default behaviour for performance reasons.
		removeOutsideVisibleBounds: true,

		//Whether to animate adding markers after adding the MarkerClusterGroup to the map
		// If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
		animateAddingMarkers: false,

		//Increase to increase the distance away that spiderfied markers appear from the center
		spiderfyDistanceMultiplier: 1,

		// When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call,
		// others will be loaded during setTimeouts
		chunkedLoading: false,
		chunkInterval: 200, // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
		chunkDelay: 50, // at the end of each interval, give n milliseconds back to system/browser
		chunkProgress: null, // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)

		//Options to pass to the sop.Polygon constructor
		polygonOptions: {}
	},

	initialize: function (options) {
		sop.Util.setOptions(this, options);
		if (!this.options.iconCreateFunction) {
			this.options.iconCreateFunction = this._defaultIconCreateFunction;
		}

		this._featureGroup = sop.featureGroup();
		var featureGroupEvents = 'click dbclick mouseover mouseout mousemove contextmenu popupopen popupclose';
		this._featureGroup.on(sop.FeatureGroup.EVENTS || featureGroupEvents, this._propagateEvent, this);

		this._nonPointGroup = sop.featureGroup();
		this._nonPointGroup.on(sop.FeatureGroup.EVENTS || featureGroupEvents, this._propagateEvent, this);

		this._inZoomAnimation = 0;
		this._needsClustering = [];
		this._needsRemoving = []; //Markers removed while we aren't on the map need to be kept track of
		//The bounds of the currently shown area (from _getExpandedVisibleBounds) Updated on zoom/move
		this._currentShownBounds = null;

		this._queue = [];
	},

	addLayer: function (layer) {

		if (layer instanceof sop.LayerGroup) {
			var array = [];
			for (var i in layer._layers) {
				array.push(layer._layers[i]);
			}
			return this.addLayers(array);
		}

		//Don't cluster non point data
		if (!layer.getUTMK) {
			this._nonPointGroup.addLayer(layer);
			return this;
		}

		if (!this._map) {
			this._needsClustering.push(layer);
			return this;
		}

		if (this.hasLayer(layer)) {
			return this;
		}


		//If we have already clustered we'll need to add this one to a cluster

		if (this._unspiderfy) {
			this._unspiderfy();
		}

		this._addLayer(layer, this._maxZoom);

		//Work out what is visible
		var visibleLayer = layer,
			currentZoom = this._map.getZoom();
		if (layer.__parent) {
			while (visibleLayer.__parent._zoom >= currentZoom) {
				visibleLayer = visibleLayer.__parent;
			}
		}

		if (this._currentShownBounds.contains(visibleLayer.getUTMK())) {
			if (this.options.animateAddingMarkers) {
				this._animationAddLayer(layer, visibleLayer);
			} else {
				this._animationAddLayerNonAnimated(layer, visibleLayer);
			}
		}
		return this;
	},

	removeLayer: function (layer) {

		if (layer instanceof sop.LayerGroup)
		{
			var array = [];
			for (var i in layer._layers) {
				array.push(layer._layers[i]);
			}
			return this.removeLayers(array);
		}

		//Non point layers
		if (!layer.getUTMK) {
			this._nonPointGroup.removeLayer(layer);
			return this;
		}

		if (!this._map) {
			if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
				this._needsRemoving.push(layer);
			}
			return this;
		}

		if (!layer.__parent) {
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();
			this._unspiderfyLayer(layer);
		}

		//Remove the marker from clusters
		this._removeLayer(layer, true);

		if (this._featureGroup.hasLayer(layer)) {
			this._featureGroup.removeLayer(layer);
			if (layer.setOpacity) {
				layer.setOpacity(1);
			}
		}

		return this;
	},

	//Takes an array of markers and adds them in bulk
	addLayers: function (layersArray) {
		var fg = this._featureGroup,
			npg = this._nonPointGroup,
			chunked = this.options.chunkedLoading,
			chunkInterval = this.options.chunkInterval,
			chunkProgress = this.options.chunkProgress,
			newMarkers, i, l, m;

		if (this._map) {
			var offset = 0,
				started = (new Date()).getTime();
			var process = sop.bind(function () {
				var start = (new Date()).getTime();
				for (; offset < layersArray.length; offset++) {
					if (chunked && offset % 200 === 0) {
						// every couple hundred markers, instrument the time elapsed since processing started:
						var elapsed = (new Date()).getTime() - start;
						if (elapsed > chunkInterval) {
							break; // been working too hard, time to take a break :-)
						}
					}

					m = layersArray[offset];

					//Not point data, can't be clustered
					if (!m.getUTMK) {
						npg.addLayer(m);
						continue;
					}

					if (this.hasLayer(m)) {
						continue;
					}

					this._addLayer(m, this._maxZoom);

					//If we just made a cluster of size 2 then we need to remove the other marker from the map
					// (if it is) or we never will
					if (m.__parent) {
						if (m.__parent.getChildCount() === 2) {
							var markers = m.__parent.getAllChildMarkers(),
								otherMarker = markers[0] === m ? markers[1] : markers[0];
							fg.removeLayer(otherMarker);
						}
					}
				}

				if (chunkProgress) {
					// report progress and time elapsed:
					chunkProgress(offset, layersArray.length, (new Date()).getTime() - started);
				}

				if (offset === layersArray.length) {
					//Update the icons of all those visible clusters that were affected
					this._featureGroup.eachLayer(function (c) {
						if (c instanceof sop.MarkerCluster && c._iconNeedsUpdate) {
							c._updateIcon();
						}
					});

					this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
				} else {
					setTimeout(process, this.options.chunkDelay);
				}
			}, this);

			process();
		} else {
			newMarkers = [];
			for (i = 0, l = layersArray.length; i < l; i++) {
				m = layersArray[i];

				//Not point data, can't be clustered
				if (!m.getUTMK) {
					npg.addLayer(m);
					continue;
				}

				if (this.hasLayer(m)) {
					continue;
				}

				newMarkers.push(m);
			}
			this._needsClustering = this._needsClustering.concat(newMarkers);
		}
		return this;
	},

	//Takes an array of markers and removes them in bulk
	removeLayers: function (layersArray) {
		var i, l, m,
			fg = this._featureGroup,
			npg = this._nonPointGroup;

		if (!this._map) {
			for (i = 0, l = layersArray.length; i < l; i++) {
				m = layersArray[i];
				this._arraySplice(this._needsClustering, m);
				npg.removeLayer(m);
			}
			return this;
		}

		for (i = 0, l = layersArray.length; i < l; i++) {
			m = layersArray[i];

			if (!m.__parent) {
				npg.removeLayer(m);
				continue;
			}

			this._removeLayer(m, true, true);

			if (fg.hasLayer(m)) {
				fg.removeLayer(m);
				if (m.setOpacity) {
					m.setOpacity(1);
				}
			}
		}

		//Fix up the clusters and markers on the map
		this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);

		fg.eachLayer(function (c) {
			if (c instanceof sop.MarkerCluster) {
				c._updateIcon();
			}
		});

		return this;
	},

	//Removes all layers from the MarkerClusterGroup
	clearLayers: function () {
		//Need our own special implementation as the LayerGroup one doesn't work for us

		//If we aren't on the map (yet), blow away the markers we know of
		if (!this._map) {
			this._needsClustering = [];
			delete this._gridClusters;
			delete this._gridUnclustered;
		}

		if (this._noanimationUnspiderfy) {
			this._noanimationUnspiderfy();
		}

		//Remove all the visible layers
		this._featureGroup.clearLayers();
		this._nonPointGroup.clearLayers();

		this.eachLayer(function (marker) {
			delete marker.__parent;
		});

		if (this._map) {
			//Reset _topClusterLevel and the DistanceGrids
			this._generateInitialClusters();
		}

		return this;
	},

	//Override FeatureGroup.getBounds as it doesn't work
	getBounds: function () {
		var bounds = new sop.UTMKBounds();

		if (this._topClusterLevel) {
			bounds.extend(this._topClusterLevel._bounds);
		}

		for (var i = this._needsClustering.length - 1; i >= 0; i--) {
			bounds.extend(this._needsClustering[i].getUTMK());
		}

		bounds.extend(this._nonPointGroup.getBounds());

		return bounds;
	},

	//Overrides LayerGroup.eachLayer
	eachLayer: function (method, context) {
		var markers = this._needsClustering.slice(),
			i;

		if (this._topClusterLevel) {
			this._topClusterLevel.getAllChildMarkers(markers);
		}

		for (i = markers.length - 1; i >= 0; i--) {
			method.call(context, markers[i]);
		}

		this._nonPointGroup.eachLayer(method, context);
	},

	//Overrides LayerGroup.getLayers
	getLayers: function () {
		var layers = [];
		this.eachLayer(function (l) {
			layers.push(l);
		});
		return layers;
	},

	//Overrides LayerGroup.getLayer, WARNING: Really bad performance
	getLayer: function (id) {
		var result = null;

		this.eachLayer(function (l) {
			if (sop.stamp(l) === id) {
				result = l;
			}
		});

		return result;
	},

	//Returns true if the given layer is in this MarkerClusterGroup
	hasLayer: function (layer) {
		if (!layer) {
			return false;
		}

		var i, anArray = this._needsClustering;

		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return true;
			}
		}

		anArray = this._needsRemoving;
		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return false;
			}
		}

		return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
	},

	//Zoom down to show the given layer (spiderfying if necessary) then calls the callback
	zoomToShowLayer: function (layer, callback) {

		var showMarker = function () {
			if ((layer._icon || layer.__parent._icon) && !this._inZoomAnimation) {
				this._map.off('moveend', showMarker, this);
				this.off('animationend', showMarker, this);

				if (layer._icon) {
					callback();
				} else if (layer.__parent._icon) {
					var afterSpiderfy = function () {
						this.off('spiderfied', afterSpiderfy, this);
						callback();
					};

					this.on('spiderfied', afterSpiderfy, this);
					layer.__parent.spiderfy();
				}
			}
		};

		if (layer._icon && this._map.getBounds().contains(layer.getUTMK())) {
			//Layer is visible ond on screen, immediate return
			callback();
		} else if (layer.__parent._zoom < this._map.getZoom()) {
			//Layer should be visible at this zoom level. It must not be on screen so just pan over to it
			this._map.on('moveend', showMarker, this);
			this._map.panTo(layer.getUTMK());
		} else {
			var moveStart = function () {
				this._map.off('movestart', moveStart, this);
				moveStart = null;
			};

			this._map.on('movestart', moveStart, this);
			this._map.on('moveend', showMarker, this);
			this.on('animationend', showMarker, this);
			layer.__parent.zoomToBounds();

			if (moveStart) {
				//Never started moving, must already be there, probably need clustering however
				showMarker.call(this);
			}
		}
	},

	//Overrides FeatureGroup.onAdd
	onAdd: function (map) {
		this._map = map;
		var i, l, layer;

		if (!isFinite(this._map.getMaxZoom())) {
			throw 'Map has no maxZoom specified';
		}

		map.addLayer(this._featureGroup);
		map.addLayer(this._nonPointGroup);
//		this._featureGroup.onAdd(map);
//		this._nonPointGroup.onAdd(map);

		if (!this._gridClusters) {
			this._generateInitialClusters();
		}

		for (i = 0, l = this._needsRemoving.length; i < l; i++) {
			layer = this._needsRemoving[i];
			this._removeLayer(layer, true);
		}
		this._needsRemoving = [];

		//Remember the current zoom level and bounds
		this._zoom = this._map.getZoom();
		this._currentShownBounds = this._getExpandedVisibleBounds();

		this._map.on('zoomend', this._zoomEnd, this);
		this._map.on('moveend', this._moveEnd, this);

		if (this._spiderfierOnAdd) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnAdd();
		}

		this._bindEvents();

		//Actually add our markers to the map:
		l = this._needsClustering;
		this._needsClustering = [];
		this.addLayers(l);
	},

	//Overrides FeatureGroup.onRemove
	onRemove: function (map) {
		map.off('zoomend', this._zoomEnd, this);
		map.off('moveend', this._moveEnd, this);

		this._unbindEvents();

		//In case we are in a cluster animation
		this._map._mapPane.className = this._map._mapPane.className.replace(' sop-cluster-anim', '');

		if (this._spiderfierOnRemove) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnRemove();
		}



		//Clean up all the layers we added to the map
		this._hideCoverage();
		this._featureGroup.onRemove(map);
		this._nonPointGroup.onRemove(map);

		this._featureGroup.clearLayers();

		this._map = null;
	},

	getVisibleParent: function (marker) {
		var vMarker = marker;
		while (vMarker && !vMarker._icon) {
			vMarker = vMarker.__parent;
		}
		return vMarker || null;
	},

	//Remove the given object from the given array
	_arraySplice: function (anArray, obj) {
		for (var i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === obj) {
				anArray.splice(i, 1);
				return true;
			}
		}
	},

	//Internal function for removing a marker from everything.
	//dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
	_removeLayer: function (marker, removeFromDistanceGrid, dontUpdateMap) {
		var gridClusters = this._gridClusters,
			gridUnclustered = this._gridUnclustered,
			fg = this._featureGroup,
			map = this._map;

		//Remove the marker from distance clusters it might be in
		if (removeFromDistanceGrid) {
			for (var z = this._maxZoom; z >= 0; z--) {
				if (!gridUnclustered[z].removeObject(marker, map.project(marker.getUTMK(), z))) {
					break;
				}
			}
		}

		//Work our way up the clusters removing them as we go if required
		var cluster = marker.__parent,
			markers = cluster._markers,
			otherMarker;

		//Remove the marker from the immediate parents marker list
		this._arraySplice(markers, marker);

		while (cluster) {
			cluster._childCount--;

			if (cluster._zoom < 0) {
				//Top level, do nothing
				break;
			} else if (removeFromDistanceGrid && cluster._childCount <= 1) { //Cluster no longer required
				//We need to push the other marker up to the parent
				otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];

				//Update distance grid
				gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cUTMK, cluster._zoom));
				gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getUTMK(), cluster._zoom));

				//Move otherMarker up to parent
				this._arraySplice(cluster.__parent._childClusters, cluster);
				cluster.__parent._markers.push(otherMarker);
				otherMarker.__parent = cluster.__parent;

				if (cluster._icon) {
					//Cluster is currently on the map, need to put the marker on the map instead
					fg.removeLayer(cluster);
					if (!dontUpdateMap) {
						fg.addLayer(otherMarker);
					}
				}
			} else {
				cluster._recalculateBounds();
				if (!dontUpdateMap || !cluster._icon) {
					cluster._updateIcon();
				}
			}

			cluster = cluster.__parent;
		}

		delete marker.__parent;
	},

	_isOrIsParent: function (el, oel) {
		while (oel) {
			if (el === oel) {
				return true;
			}
			oel = oel.parentNode;
		}
		return false;
	},

	_propagateEvent: function (e) {
		if (e.layer instanceof sop.MarkerCluster) {
			//Prevent multiple clustermouseover/off events if the icon is made up of stacked divs
			// (Doesn't work in ie <= 8, no relatedTarget)
			if (e.originalEvent && this._isOrIsParent(e.layer._icon, e.originalEvent.relatedTarget)) {
				return;
			}
			e.type = 'cluster' + e.type;
		}

		this.fire(e.type, e);
	},

	//Default functionality
	_defaultIconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		/*if (childCount < 10) {
			c += 'small';
		} else if (childCount < 100) {
			c += 'medium';
		} else {
			c += 'large';
		}*/

		if (childCount < 3) {
			c += 'small1';
		} else if (childCount < 6) {
			c += 'small2';
		} else if (childCount < 9) {
			c += 'small3';
		} else if (childCount < 12) {
			c += 'medium1';
		} else if (childCount < 15) {
			c += 'medium2';
		} else if (childCount < 18) {
			c += 'medium3';
		} else {
			c += 'large';
		}

		return new sop.DivIcon({ html: '<div><span>' + childCount + '</span></div>',
			className: 'marker-cluster' + c,
			iconSize: new sop.Point(60, 60) });
	},

	_bindEvents: function () {
		var map = this._map,
		    spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
		    showCoverageOnHover = this.options.showCoverageOnHover,
		    zoomToBoundsOnClick = this.options.zoomToBoundsOnClick;

		//Zoom on cluster click or spiderfy if we are at the lowest level
		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.on('clusterclick', this._zoomOrSpiderfy, this);
		}

		//Show convex hull (boundary) polygon on mouse over
		if (showCoverageOnHover) {
			this.on('clustermouseover', this._showCoverage, this);
			this.on('clustermouseout', this._hideCoverage, this);
			map.on('zoomend', this._hideCoverage, this);
		}
	},

	_zoomOrSpiderfy: function (e) {
		var map = this._map;
		if (map.getMaxZoom() === map.getZoom()) {
			if (this.options.spiderfyOnMaxZoom) {
				e.layer.spiderfy();
			}
		} else if (this.options.zoomToBoundsOnClick) {
			e.layer.zoomToBounds();
		}

		// Focus the map again for keyboard users.
		if (e.originalEvent && e.originalEvent.keyCode === 13) {
			map._container.focus();
		}
	},

	_showCoverage: function (e) {
		var map = this._map;
		if (this._inZoomAnimation) {
			return;
		}
		if (this._shownPolygon) {
			map.removeLayer(this._shownPolygon);
		}
		if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
			this._shownPolygon = new sop.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
			map.addLayer(this._shownPolygon);
		}
	},

	_hideCoverage: function () {
		if (this._shownPolygon) {
			this._map.removeLayer(this._shownPolygon);
			this._shownPolygon = null;
		}
	},

	_unbindEvents: function () {
		var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
			showCoverageOnHover = this.options.showCoverageOnHover,
			zoomToBoundsOnClick = this.options.zoomToBoundsOnClick,
			map = this._map;

		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.off('clusterclick', this._zoomOrSpiderfy, this);
		}
		if (showCoverageOnHover) {
			this.off('clustermouseover', this._showCoverage, this);
			this.off('clustermouseout', this._hideCoverage, this);
			map.off('zoomend', this._hideCoverage, this);
		}
	},

	_zoomEnd: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}
		this._mergeSplitClusters();

		this._zoom = this._map._zoom;
		this._currentShownBounds = this._getExpandedVisibleBounds();
	},

	_moveEnd: function () {
		if (this._inZoomAnimation) {
			return;
		}

		var newBounds = this._getExpandedVisibleBounds();

		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, newBounds);
		this._topClusterLevel._recursivelyAddChildrenToMap(null, this._map._zoom, newBounds);

		this._currentShownBounds = newBounds;
		return;
	},

	_generateInitialClusters: function () {
		var maxZoom = this._map.getMaxZoom(),
			radius = this.options.maxClusterRadius,
			radiusFn = radius;
	
		//If we just set maxClusterRadius to a single number, we need to create
		//a simple function to return that number. Otherwise, we just have to
		//use the function we've passed in.
		if (typeof radius !== 'function') {
			radiusFn = function () { return radius; };
		}

		if (this.options.disableClusteringAtZoom) {
			maxZoom = this.options.disableClusteringAtZoom - 1;
		}
		this._maxZoom = maxZoom;
		this._gridClusters = {};
		this._gridUnclustered = {};
	
		//Set up DistanceGrids for each zoom
		for (var zoom = maxZoom; zoom >= 0; zoom--) {
			this._gridClusters[zoom] = new sop.DistanceGrid(radiusFn(zoom));
			this._gridUnclustered[zoom] = new sop.DistanceGrid(radiusFn(zoom));
		}

		this._topClusterLevel = new sop.MarkerCluster(this, -1);
	},

	//Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
	_addLayer: function (layer, zoom) {
		var gridClusters = this._gridClusters,
		    gridUnclustered = this._gridUnclustered,
		    markerPoint, z;

		if (this.options.singleMarkerMode) {
			layer.options.icon = this.options.iconCreateFunction({
				getChildCount: function () {
					return 1;
				},
				getAllChildMarkers: function () {
					return [layer];
				}
			});
		}

		//Find the lowest zoom level to slot this one in
		for (; zoom >= 0; zoom--) {
			markerPoint = this._map.project(layer.getUTMK(), zoom); // calculate pixel position
			//Try find a cluster close by
			var closest = gridClusters[zoom].getNearObject(markerPoint);
			if (closest) {
				closest._addChild(layer);
				layer.__parent = closest;
				return;
			}

			//Try find a marker close by to form a new cluster with
			closest = gridUnclustered[zoom].getNearObject(markerPoint);
			if (closest) {
				var parent = closest.__parent;
				if (parent) {
					this._removeLayer(closest, false);
				}

				//Create new cluster with these 2 in it

				var newCluster = new sop.MarkerCluster(this, zoom, closest, layer);
				gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cUTMK, zoom));
				closest.__parent = newCluster;
				layer.__parent = newCluster;

				//First create any new intermediate parent clusters that don't exist
				var lastParent = newCluster;
				for (z = zoom - 1; z > parent._zoom; z--) {
					lastParent = new sop.MarkerCluster(this, z, lastParent);
					gridClusters[z].addObject(lastParent, this._map.project(closest.getUTMK(), z));
				}
				parent._addChild(lastParent);

				//Remove closest from this zoom level and any above that it is in, replace with newCluster
				for (z = zoom; z >= 0; z--) {
					if (!gridUnclustered[z].removeObject(closest, this._map.project(closest.getUTMK(), z))) {
						break;
					}
				}

				return;
			}

			//Didn't manage to cluster in at this zoom, record us as a marker here and continue upwards
			gridUnclustered[zoom].addObject(layer, markerPoint);
		}

		//Didn't get in anything, add us to the top
		this._topClusterLevel._addChild(layer);
		layer.__parent = this._topClusterLevel;
		return;
	},

	//Enqueue code to fire after the marker expand/contract has happened
	_enqueue: function (fn) {
		this._queue.push(fn);
		if (!this._queueTimeout) {
			this._queueTimeout = setTimeout(sop.bind(this._processQueue, this), 300);
		}
	},
	_processQueue: function () {
		for (var i = 0; i < this._queue.length; i++) {
			this._queue[i].call(this);
		}
		this._queue.length = 0;
		clearTimeout(this._queueTimeout);
		this._queueTimeout = null;
	},

	//Merge and split any existing clusters that are too big or small
	_mergeSplitClusters: function () {

		//Incase we are starting to split before the animation finished
		this._processQueue();

		if (this._zoom < this._map._zoom &&
			this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) { //Zoom in, split
			this._animationStart();
			//Remove clusters now off screen
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,
				this._zoom, this._getExpandedVisibleBounds());

			this._animationZoomIn(this._zoom, this._map._zoom);

		} else if (this._zoom > this._map._zoom) { //Zoom out, merge
			this._animationStart();

			this._animationZoomOut(this._zoom, this._map._zoom);
		} else {
			this._moveEnd();
		}
	},

	//Gets the maps visible bounds expanded in each direction by the size of the screen
	// (so the user cannot see an area we do not cover in one pan)
	_getExpandedVisibleBounds: function () {
		if (!this.options.removeOutsideVisibleBounds) {
			return this.getBounds();
		}

		var map = this._map,
			bounds = map.getBounds(),
			sw = bounds._southWest,
			ne = bounds._northEast,
			xDiff = sop.Browser.mobile ? 0 : Math.abs(sw.x - ne.x),
			yDiff = sop.Browser.mobile ? 0 : Math.abs(sw.y - ne.y);

		return new sop.UTMKBounds(
			new sop.UTMK(sw.x - xDiff, sw.y - yDiff, true),
			new sop.UTMK(ne.x + xDiff, ne.y + yDiff, true));
	},

	//Shared animation code
	_animationAddLayerNonAnimated: function (layer, newCluster) {
		if (newCluster === layer) {
			this._featureGroup.addLayer(layer);
		} else if (newCluster._childCount === 2) {
			newCluster._addToMap();

			var markers = newCluster.getAllChildMarkers();
			this._featureGroup.removeLayer(markers[0]);
			this._featureGroup.removeLayer(markers[1]);
		} else {
			newCluster._updateIcon();
		}
	}
});

sop.MarkerClusterGroup.include(!sop.DomUtil.TRANSITION ? {

	//Non Animated versions of everything
	_animationStart: function () {
		//Do nothing...
	},
	_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel);
		this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

		//We didn't actually animate, but we use this event to mean "clustering animations have finished"
		this.fire('animationend');
	},
	_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel);
		this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

		//We didn't actually animate, but we use this event to mean "clustering animations have finished"
		this.fire('animationend');
	},
	_animationAddLayer: function (layer, newCluster) {
		this._animationAddLayerNonAnimated(layer, newCluster);
	}
} : {

	//Animated versions here
	_animationStart: function () {
		this._map._mapPane.className += ' sop-cluster-anim';
		this._inZoomAnimation++;
	},
	_animationEnd: function () {
		if (this._map) {
			this._map._mapPane.className = this._map._mapPane.className.replace(' sop-cluster-anim', '');
		}
		this._inZoomAnimation--;
		this.fire('animationend');
	},
	_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
		var bounds = this._getExpandedVisibleBounds(),
		    fg = this._featureGroup,
		    i;

		//Add all children of current clusters to map and remove those clusters from map
		this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
			var startPos = c._utmk,
				markers = c._markers,
				m;

			if (!bounds.contains(startPos)) {
				startPos = null;
			}

			if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) { //Immediately add the new child and remove us
				fg.removeLayer(c);
				c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
			} else {
				//Fade out old cluster
				c.setOpacity(0);
				c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
			}

			//Remove all markers that aren't visible any more
			//TODO: Do we actually need to do this on the higher levels too?
			for (i = markers.length - 1; i >= 0; i--) {
				m = markers[i];
				if (!bounds.contains(m._utmk)) {
					fg.removeLayer(m);
				}
			}

		});

		this._forceLayout();

		//Update opacities
		this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
		//TODO Maybe? Update markers in _recursivelyBecomeVisible
		fg.eachLayer(function (n) {
			if (!(n instanceof sop.MarkerCluster) && n._icon) {
				n.setOpacity(1);
			}
		});

		//update the positions of the just added clusters/markers
		this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
			c._recursivelyRestoreChildPositions(newZoomLevel);
		});

		//Remove the old clusters and close the zoom animation
		this._enqueue(function () {
			//update the positions of the just added clusters/markers
			this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
				fg.removeLayer(c);
				c.setOpacity(1);
			});

			this._animationEnd();
		});
	},

	_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
		this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);

		//Need to add markers for those that weren't on the map before but are now
		this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
		//Remove markers that were on the map before but won't be now
		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel,
			this._getExpandedVisibleBounds());
	},
	_animationZoomOutSingle: function (cluster, previousZoomLevel, newZoomLevel) {
		var bounds = this._getExpandedVisibleBounds();

		//Animate all of the markers in the clusters to move to their cluster center point
		cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, previousZoomLevel + 1, newZoomLevel);

		var me = this;

		//Update the opacity (If we immediately set it they won't animate)
		this._forceLayout();
		cluster._recursivelyBecomeVisible(bounds, newZoomLevel);

		//TODO: Maybe use the transition timing stuff to make this more reliable
		//When the animations are done, tidy up
		this._enqueue(function () {

			//This cluster stopped being a cluster before the timeout fired
			if (cluster._childCount === 1) {
				var m = cluster._markers[0];
				//If we were in a cluster animation at the time then
				// the opacity and position of our child could be wrong now, so fix it
				m.setUTMK(m.getUTMK());
				if (m.setOpacity) {
					m.setOpacity(1);
				}
			} else {
				cluster._recursively(bounds, newZoomLevel, 0, function (c) {
					c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel + 1);
				});
			}
			me._animationEnd();
		});
	},
	_animationAddLayer: function (layer, newCluster) {
		var me = this,
			fg = this._featureGroup;

		fg.addLayer(layer);
		if (newCluster !== layer) {
			if (newCluster._childCount > 2) { //Was already a cluster

				newCluster._updateIcon();
				this._forceLayout();
				this._animationStart();

				layer._setPos(this._map.utmkToLayerPoint(newCluster.getUTMK()));
				layer.setOpacity(0);

				this._enqueue(function () {
					fg.removeLayer(layer);
					layer.setOpacity(1);

					me._animationEnd();
				});

			} else { //Just became a cluster
				this._forceLayout();

				me._animationStart();
				me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._map.getZoom());
			}
		}
	},

	//Force a browser layout of stuff in the map
	// Should apply the current opacity and location to all elements so we can update them again for an animation
	_forceLayout: function () {
		//In my testing this works, infact offsetWidth of any element seems to work.
		//Could loop all this._layers and do this for each _icon if it stops working

		sop.Util.falseFn(document.body.offsetWidth);
	}
});

sop.markerClusterGroup = function (options) {
	return new sop.MarkerClusterGroup(options);
};


sop.MarkerCluster = sop.Marker.extend({
	initialize: function (group, zoom, a, b) {

		sop.Marker.prototype.initialize.call(this, a ? (a._cUTMK || a.getUTMK()) : new sop.UTMK(0, 0), { icon: this });


		this._group = group;
		this._zoom = zoom;

		this._markers = [];
		this._childClusters = [];
		this._childCount = 0;
		this._iconNeedsUpdate = true;

		this._bounds = new sop.UTMKBounds();

		if (a) {
			this._addChild(a);
		}
		if (b) {
			this._addChild(b);
		}
	},

	//Recursively retrieve all child markers of this cluster
	getAllChildMarkers: function (storageArray) {
		storageArray = storageArray || [];

		for (var i = this._childClusters.length - 1; i >= 0; i--) {
			this._childClusters[i].getAllChildMarkers(storageArray);
		}

		for (var j = this._markers.length - 1; j >= 0; j--) {
			storageArray.push(this._markers[j]);
		}

		return storageArray;
	},

	//Returns the count of how many child markers we have
	getChildCount: function () {
		return this._childCount;
	},

	//Zoom to the minimum of showing all of the child markers, or the extents of this cluster
	zoomToBounds: function () {
		var childClusters = this._childClusters.slice(),
			map = this._group._map,
			boundsZoom = map.getBoundsZoom(this._bounds),
			zoom = this._zoom + 1,
			mapZoom = map.getZoom(),
			i;

		//calculate how far we need to zoom down to see all of the markers
		while (childClusters.length > 0 && boundsZoom > zoom) {
			zoom++;
			var newClusters = [];
			for (i = 0; i < childClusters.length; i++) {
				newClusters = newClusters.concat(childClusters[i]._childClusters);
			}
			childClusters = newClusters;
		}

		if (boundsZoom > zoom) {
			this._group._map.setView(this._utmk, zoom);
		} else if (boundsZoom <= mapZoom) { //If fitBounds wouldn't zoom us down, zoom us down instead
			this._group._map.setView(this._utmk, mapZoom + 1);
		} else {
			this._group._map.fitBounds(this._bounds);
		}
	},

	getBounds: function () {
		var bounds = new sop.UTMKBounds();
		bounds.extend(this._bounds);
		return bounds;
	},

	_updateIcon: function () {
		this._iconNeedsUpdate = true;
		if (this._icon) {
			this.setIcon(this);
		}
	},

	//Cludge for Icon, we pretend to be an icon for performance
	createIcon: function () {
		if (this._iconNeedsUpdate) {
			this._iconObj = this._group.options.iconCreateFunction(this);
			this._iconNeedsUpdate = false;
		}
		return this._iconObj.createIcon();
	},
	createShadow: function () {
		return this._iconObj.createShadow();
	},


	_addChild: function (new1, isNotificationFromChild) {

		this._iconNeedsUpdate = true;
		this._expandBounds(new1);

		if (new1 instanceof sop.MarkerCluster) {
			if (!isNotificationFromChild) {
				this._childClusters.push(new1);
				new1.__parent = this;
			}
			this._childCount += new1._childCount;
		} else {
			if (!isNotificationFromChild) {
				this._markers.push(new1);
			}
			this._childCount++;
		}

		if (this.__parent) {
			this.__parent._addChild(new1, true);
		}
	},

	//Expand our bounds and tell our parent to
	_expandBounds: function (marker) {
		var addedCount,
		    addedUTMK = marker._wUTMK || marker._utmk;

		if (marker instanceof sop.MarkerCluster) {
			this._bounds.extend(marker._bounds);
			addedCount = marker._childCount;
		} else {
			this._bounds.extend(addedUTMK);
			addedCount = 1;
		}

		if (!this._cUTMK) {
			// when clustering, take position of the first point as the cluster center
			this._cUTMK = marker._cUTMK || addedUTMK;
		}

		// when showing clusters, take weighted average of all points as cluster center
		var totalCount = this._childCount + addedCount;

		//Calculate weighted utmk for display
		if (!this._wUTMK) {
			this._utmk = this._wUTMK = new sop.UTMK(addedUTMK.x, addedUTMK.y);
		} else {
			this._wUTMK.x = (addedUTMK.x * addedCount + this._wUTMK.x * this._childCount) / totalCount;
			this._wUTMK.y = (addedUTMK.y * addedCount + this._wUTMK.y * this._childCount) / totalCount;
		}
	},

	//Set our markers position as given and add it to the map
	_addToMap: function (startPos) {
		if (startPos) {
			this._backupLatlng = this._utmk;
			this.setUTMK(startPos);
		}
		this._group._featureGroup.addLayer(this);
	},

	_recursivelyAnimateChildrenIn: function (bounds, center, maxZoom) {
		this._recursively(bounds, 0, maxZoom - 1,
			function (c) {
				var markers = c._markers,
					i, m;
				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];

					//Only do it if the icon is still on the map
					if (m._icon) {
						m._setPos(center);
						m.setOpacity(0);
					}
				}
			},
			function (c) {
				var childClusters = c._childClusters,
					j, cm;
				for (j = childClusters.length - 1; j >= 0; j--) {
					cm = childClusters[j];
					if (cm._icon) {
						cm._setPos(center);
						cm.setOpacity(0);
					}
				}
			}
		);
	},

	_recursivelyAnimateChildrenInAndAddSelfToMap: function (bounds, previousZoomLevel, newZoomLevel) {
		this._recursively(bounds, newZoomLevel, 0,
			function (c) {
				c._recursivelyAnimateChildrenIn(bounds, c._group._map.utmkToLayerPoint(c.getUTMK()).round(), previousZoomLevel);

				//TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
				//As a hack we only do a animation free zoom on a single level zoom,
				// if someone does multiple levels then we always animate
				if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
					c.setOpacity(1);
					//Immediately remove our children as we are replacing them. TODO previousBounds not bounds
					c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel);
				} else {
					c.setOpacity(0);
				}

				c._addToMap();
			}
		);
	},

	_recursivelyBecomeVisible: function (bounds, zoomLevel) {
		this._recursively(bounds, 0, zoomLevel, null, function (c) {
			c.setOpacity(1);
		});
	},

	_recursivelyAddChildrenToMap: function (startPos, zoomLevel, bounds) {
		this._recursively(bounds, -1, zoomLevel,
			function (c) {
				if (zoomLevel === c._zoom) {
					return;
				}

				//Add our child markers at startPos (so they can be animated out)
				for (var i = c._markers.length - 1; i >= 0; i--) {
					var nm = c._markers[i];

					if (!bounds.contains(nm._utmk)) {
						continue;
					}

					if (startPos) {
						nm._backupLatlng = nm.getUTMK();

						nm.setUTMK(startPos);
						if (nm.setOpacity) {
							nm.setOpacity(0);
						}
					}

					c._group._featureGroup.addLayer(nm);
				}
			},
			function (c) {
				c._addToMap(startPos);
			}
		);
	},

	_recursivelyRestoreChildPositions: function (zoomLevel) {
		//Fix positions of child markers
		for (var i = this._markers.length - 1; i >= 0; i--) {
			var nm = this._markers[i];
			if (nm._backupLatlng) {
				nm.setUTMK(nm._backupLatlng);
				delete nm._backupLatlng;
			}
		}

		if (zoomLevel - 1 === this._zoom) {
			//Reposition child clusters
			for (var j = this._childClusters.length - 1; j >= 0; j--) {
				this._childClusters[j]._restorePosition();
			}
		} else {
			for (var k = this._childClusters.length - 1; k >= 0; k--) {
				this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
			}
		}
	},

	_restorePosition: function () {
		if (this._backupLatlng) {
			this.setUTMK(this._backupLatlng);
			delete this._backupLatlng;
		}
	},

	//exceptBounds: If set, don't remove any markers/clusters in it
	_recursivelyRemoveChildrenFromMap: function (previousBounds, zoomLevel, exceptBounds) {
		var m, i;
		this._recursively(previousBounds, -1, zoomLevel - 1,
			function (c) {
				//Remove markers at every level
				for (i = c._markers.length - 1; i >= 0; i--) {
					m = c._markers[i];
					if (!exceptBounds || !exceptBounds.contains(m._utmk)) {
						c._group._featureGroup.removeLayer(m);
						if (m.setOpacity) {
							m.setOpacity(1);
						}
					}
				}
			},
			function (c) {
				//Remove child clusters at just the bottom level
				for (i = c._childClusters.length - 1; i >= 0; i--) {
					m = c._childClusters[i];
					if (!exceptBounds || !exceptBounds.contains(m._utmk)) {
						c._group._featureGroup.removeLayer(m);
						if (m.setOpacity) {
							m.setOpacity(1);
						}
					}
				}
			}
		);
	},

	//Run the given functions recursively to this and child clusters
	// boundsToApplyTo: a sop.UTMKBounds representing the bounds of what clusters to recurse in to
	// zoomLevelToStart: zoom level to start running functions (inclusive)
	// zoomLevelToStop: zoom level to stop running functions (inclusive)
	// runAtEveryLevel: function that takes an sop.MarkerCluster as an argument that should be applied on every level
	// runAtBottomLevel: function that takes an sop.MarkerCluster as an argument that should be applied at only the bottom level
	_recursively: function (boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
		var childClusters = this._childClusters,
		    zoom = this._zoom,
			i, c;

		if (zoomLevelToStart > zoom) { //Still going down to required depth, just recurse to child clusters
			for (i = childClusters.length - 1; i >= 0; i--) {
				c = childClusters[i];
				if (boundsToApplyTo.intersects(c._bounds)) {
					c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
				}
			}
		} else { //In required depth

			if (runAtEveryLevel) {
				runAtEveryLevel(this);
			}
			if (runAtBottomLevel && this._zoom === zoomLevelToStop) {
				runAtBottomLevel(this);
			}

			//TODO: This loop is almost the same as above
			if (zoomLevelToStop > zoom) {
				for (i = childClusters.length - 1; i >= 0; i--) {
					c = childClusters[i];
					if (boundsToApplyTo.intersects(c._bounds)) {
						c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
					}
				}
			}
		}
	},

	_recalculateBounds: function () {
		var markers = this._markers,
			childClusters = this._childClusters,
			i;

		this._bounds = new sop.UTMKBounds();
		delete this._wUTMK;

		for (i = markers.length - 1; i >= 0; i--) {
			this._expandBounds(markers[i]);
		}
		for (i = childClusters.length - 1; i >= 0; i--) {
			this._expandBounds(childClusters[i]);
		}
	},


	//Returns true if we are the parent of only one cluster and that cluster is the same as us
	_isSingleParent: function () {
		//Don't need to check this._markers as the rest won't work if there are any
		return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
	}
});



sop.DistanceGrid = function (cellSize) {
	this._cellSize = cellSize;
	this._sqCellSize = cellSize * cellSize;
	this._grid = {};
	this._objectPoint = { };
};

sop.DistanceGrid.prototype = {

	addObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    stamp = sop.Util.stamp(obj);

		this._objectPoint[stamp] = point;

		cell.push(obj);
	},

	updateObject: function (obj, point) {
		this.removeObject(obj);
		this.addObject(obj, point);
	},

	//Returns true if the object was found
	removeObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    i, len;

		delete this._objectPoint[sop.Util.stamp(obj)];

		for (i = 0, len = cell.length; i < len; i++) {
			if (cell[i] === obj) {

				cell.splice(i, 1);

				if (len === 1) {
					delete row[x];
				}

				return true;
			}
		}

	},

	eachObject: function (fn, context) {
		var i, j, k, len, row, cell, removed,
		    grid = this._grid;

		for (i in grid) {
			row = grid[i];

			for (j in row) {
				cell = row[j];

				for (k = 0, len = cell.length; k < len; k++) {
					removed = fn.call(context, cell[k]);
					if (removed) {
						k--;
						len--;
					}
				}
			}
		}
	},

	getNearObject: function (point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    i, j, k, row, cell, len, obj, dist,
		    objectPoint = this._objectPoint,
		    closestDistSq = this._sqCellSize,
		    closest = null;

		for (i = y - 1; i <= y + 1; i++) {
			row = this._grid[i];
			if (row) {

				for (j = x - 1; j <= x + 1; j++) {
					cell = row[j];
					if (cell) {

						for (k = 0, len = cell.length; k < len; k++) {
							obj = cell[k];
							dist = this._sqDist(objectPoint[sop.Util.stamp(obj)], point);
							if (dist < closestDistSq) {
								closestDistSq = dist;
								closest = obj;
							}
						}
					}
				}
			}
		}
		return closest;
	},

	_getCoord: function (x) {
		return Math.floor(x / this._cellSize);
	},

	_sqDist: function (p, p2) {
		var dx = p2.x - p.x,
		    dy = p2.y - p.y;
		return dx * dx + dy * dy;
	}
};


/* Copyright (c) 2012 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http://en.literateprograms.org/Quickhull_(Javascript)?action=history&offset=20120410175256

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http://en.literateprograms.org/Quickhull_(Javascript)?oldid=18434
*/

(function () {
	sop.QuickHull = {

		/*
		 * @param {Object} cpt a point to be measured from the baseline
		 * @param {Array} bl the baseline, as represented by a two-element
		 *   array of utmk objects.
		 * @returns {Number} an approximate distance measure
		 */
		getDistant: function (cpt, bl) {
			var vY = bl[1].y - bl[0].y,
				vX = bl[0].x - bl[1].x;
			return (vX * (cpt.y - bl[0].y) + vY * (cpt.x - bl[0].x));
		},

		/*
		 * @param {Array} baseLine a two-element array of utmk objects
		 *   representing the baseline to project from
		 * @param {Array} latLngs an array of utmk objects
		 * @returns {Object} the maximum point and all new points to stay
		 *   in consideration for the hull.
		 */
		findMostDistantPointFromBaseLine: function (baseLine, latLngs) {
			var maxD = 0,
				maxPt = null,
				newPoints = [],
				i, pt, d;

			for (i = latLngs.length - 1; i >= 0; i--) {
				pt = latLngs[i];
				d = this.getDistant(pt, baseLine);

				if (d > 0) {
					newPoints.push(pt);
				} else {
					continue;
				}

				if (d > maxD) {
					maxD = d;
					maxPt = pt;
				}
			}

			return { maxPoint: maxPt, newPoints: newPoints };
		},


		/*
		 * Given a baseline, compute the convex hull of latLngs as an array
		 * of latLngs.
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		buildConvexHull: function (baseLine, latLngs) {
			var convexHullBaseLines = [],
				t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);

			if (t.maxPoint) { // if there is still a point "outside" the base line
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints)
					);
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints)
					);
				return convexHullBaseLines;
			} else {  // if there is no more point "outside" the base line, the current base line is part of the convex hull
				return [baseLine[0]];
			}
		},

		/*
		 * Given an array of utmks, compute a convex hull as an array
		 * of utmks
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		getConvexHull: function (latLngs) {
			// find first baseline
			var maxLat = false, minLat = false,
				maxPt = null, minPt = null,
				i;

			for (i = latLngs.length - 1; i >= 0; i--) {
				var pt = latLngs[i];
				if (maxLat === false || pt.y > maxLat) {
					maxPt = pt;
					maxLat = pt.y;
				}
				if (minLat === false || pt.y < minLat) {
					minPt = pt;
					minLat = pt.y;
				}
			}
			var ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs),
								this.buildConvexHull([maxPt, minPt], latLngs));
			return ch;
		}
	};
}());

sop.MarkerCluster.include({
	getConvexHull: function () {
		var childMarkers = this.getAllChildMarkers(),
			points = [],
			p, i;

		for (i = childMarkers.length - 1; i >= 0; i--) {
			p = childMarkers[i].getUTMK();
			points.push(p);
		}

		return sop.QuickHull.getConvexHull(points);
	}
});


//This code is 100% based on https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
//Huge thanks to jawj for implementing it first to make my job easy :-)

sop.MarkerCluster.include({

	_2PI: Math.PI * 2,
	_circleFootSeparation: 25, //related to circumference of circle
	_circleStartAngle: Math.PI / 6,

	_spiralFootSeparation:  28, //related to size of spiral (experiment!)
	_spiralLengthStart: 11,
	_spiralLengthFactor: 5,

	_circleSpiralSwitchover: 9, //show spiral instead of circle from this marker count upwards.
								// 0 -> always spiral; Infinity -> always circle

	spiderfy: function () {
		if (this._group._spiderfied === this || this._group._inZoomAnimation) {
			return;
		}

		var childMarkers = this.getAllChildMarkers(),
			group = this._group,
			map = group._map,
			center = map.utmkToLayerPoint(this._utmk),
			positions;

		this._group._unspiderfy();
		this._group._spiderfied = this;

		//TODO Maybe: childMarkers order by distance to center

		if (childMarkers.length >= this._circleSpiralSwitchover) {
			positions = this._generatePointsSpiral(childMarkers.length, center);
		} else {
			center.y += 10; //Otherwise circles look wrong
			positions = this._generatePointsCircle(childMarkers.length, center);
		}

		this._animationSpiderfy(childMarkers, positions);
	},

	unspiderfy: function (zoomDetails) {
		/// <param Name="zoomDetails">Argument from zoomanim if being called in a zoom animation or null otherwise</param>
		if (this._group._inZoomAnimation) {
			return;
		}
		this._animationUnspiderfy(zoomDetails);

		this._group._spiderfied = null;
	},

	_generatePointsCircle: function (count, centerPt) {
		var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count),
			legLength = circumference / this._2PI,  //radius from circumference
			angleStep = this._2PI / count,
			res = [],
			i, angle;

		res.length = count;

		for (i = count - 1; i >= 0; i--) {
			angle = this._circleStartAngle + i * angleStep;
			res[i] = new sop.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
		}

		return res;
	},

	_generatePointsSpiral: function (count, centerPt) {
		var legLength = this._group.options.spiderfyDistanceMultiplier * this._spiralLengthStart,
			separation = this._group.options.spiderfyDistanceMultiplier * this._spiralFootSeparation,
			lengthFactor = this._group.options.spiderfyDistanceMultiplier * this._spiralLengthFactor,
			angle = 0,
			res = [],
			i;

		res.length = count;

		for (i = count - 1; i >= 0; i--) {
			angle += separation / legLength + i * 0.0005;
			res[i] = new sop.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
			legLength += this._2PI * lengthFactor / angle;
		}
		return res;
	},

	_noanimationUnspiderfy: function () {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			childMarkers = this.getAllChildMarkers(),
			m, i;

		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			fg.removeLayer(m);

			if (m._preSpiderfyLatlng) {
				m.setUTMK(m._preSpiderfyLatlng);
				delete m._preSpiderfyLatlng;
			}
			if (m.setZIndexOffset) {
				m.setZIndexOffset(0);
			}

			if (m._spiderLeg) {
				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
		}

		group._spiderfied = null;
	}
});

sop.MarkerCluster.include(!sop.DomUtil.TRANSITION ? {
	//Non Animated versions of everything
	_animationSpiderfy: function (childMarkers, positions) {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			i, m, leg, newPos;

		for (i = childMarkers.length - 1; i >= 0; i--) {
			newPos = map.layerPointToUTMK(positions[i]);
			m = childMarkers[i];

			m._preSpiderfyLatlng = m._utmk;
			m.setUTMK(newPos);
			if (m.setZIndexOffset) {
				m.setZIndexOffset(1000000); //Make these appear on top of EVERYTHING
			}

			fg.addLayer(m);


			leg = new sop.Polyline([this._utmk, newPos], { weight: 1.5, color: '#222' });
			map.addLayer(leg);
			m._spiderLeg = leg;
		}
		this.setOpacity(0.3);
		group.fire('spiderfied');
	},

	_animationUnspiderfy: function () {
		this._noanimationUnspiderfy();
	}
} : {
	//Animated versions here
	SVG_ANIMATION: (function () {
		return document.createElementNS('http://www.w3.org/2000/svg', 'animate').toString().indexOf('SVGAnimate') > -1;
	}()),

	_animationSpiderfy: function (childMarkers, positions) {
		var me = this,
			group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerPos = map.utmkToLayerPoint(this._utmk),
			i, m, leg, newPos;

		//Add markers to map hidden at our center point
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			//If it is a marker, add it now and we'll animate it out
			if (m.setOpacity) {
				m.setZIndexOffset(1000000); //Make these appear on top of EVERYTHING
				m.setOpacity(0);
			
				fg.addLayer(m);

				m._setPos(thisLayerPos);
			} else {
				//Vectors just get immediately added
				fg.addLayer(m);
			}
		}

		group._forceLayout();
		group._animationStart();

		var initialLegOpacity = sop.Path.SVG ? 0 : 0.3,
			xmlns = sop.Path.SVG_NS;


		for (i = childMarkers.length - 1; i >= 0; i--) {
			newPos = map.layerPointToUTMK(positions[i]);
			m = childMarkers[i];

			//Move marker to new position
			m._preSpiderfyLatlng = m._utmk;
			m.setUTMK(newPos);
			
			if (m.setOpacity) {
				m.setOpacity(1);
			}


			//Add Legs.
			leg = new sop.Polyline([me._utmk, newPos], { weight: 1.5, color: '#222', opacity: initialLegOpacity });
			map.addLayer(leg);
			m._spiderLeg = leg;

			//Following animations don't work for canvas
			if (!sop.Path.SVG || !this.SVG_ANIMATION) {
				continue;
			}

			//How this works:
			//http://stackoverflow.com/questions/5924238/how-do-you-animate-an-svg-path-in-ios
			//http://dev.opera.com/articles/view/advanced-svg-animation-techniques/

			//Animate length
			var length = leg._path.getTotalLength();
			leg._path.setAttribute('stroke-dasharray', length + ',' + length);

			var anim = document.createElementNS(xmlns, 'animate');
			anim.setAttribute('attributeName', 'stroke-dashoffset');
			anim.setAttribute('begin', 'indefinite');
			anim.setAttribute('from', length);
			anim.setAttribute('to', 0);
			anim.setAttribute('dur', 0.25);
			leg._path.appendChild(anim);
			anim.beginElement();

			//Animate opacity
			anim = document.createElementNS(xmlns, 'animate');
			anim.setAttribute('attributeName', 'stroke-opacity');
			anim.setAttribute('attributeName', 'stroke-opacity');
			anim.setAttribute('begin', 'indefinite');
			anim.setAttribute('from', 0);
			anim.setAttribute('to', 0.5);
			anim.setAttribute('dur', 0.25);
			leg._path.appendChild(anim);
			anim.beginElement();
		}
		me.setOpacity(0.3);

		//Set the opacity of the spiderLegs back to their correct value
		// The animations above override this until they complete.
		// If the initial opacity of the spiderlegs isn't 0 then they appear before the animation starts.
		if (sop.Path.SVG) {
			this._group._forceLayout();

			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i]._spiderLeg;

				m.options.opacity = 0.5;
				m._path.setAttribute('stroke-opacity', 0.5);
			}
		}

		setTimeout(function () {
			group._animationEnd();
			group.fire('spiderfied');
		}, 200);
	},

	_animationUnspiderfy: function (zoomDetails) {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerPos = zoomDetails ? map._utmkToNewLayerPoint(this._utmk, zoomDetails.zoom, zoomDetails.center)
				: map.utmkToLayerPoint(this._utmk),
			childMarkers = this.getAllChildMarkers(),
			svg = sop.Path.SVG && this.SVG_ANIMATION,
			m, i, a;

		group._animationStart();

		//Make us visible and bring the child markers back in
		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			//Marker was added to us after we were spidified
			if (!m._preSpiderfyLatlng) {
				continue;
			}

			//Fix up the location to the real one
			m.setUTMK(m._preSpiderfyLatlng);
			delete m._preSpiderfyLatlng;
			//Hack override the location to be our center
			if (m.setOpacity) {
				m._setPos(thisLayerPos);
				m.setOpacity(0);
			} else {
				fg.removeLayer(m);
			}

			//Animate the spider legs back in
			if (svg) {
				a = m._spiderLeg._path.childNodes[0];
				a.setAttribute('to', a.getAttribute('from'));
				a.setAttribute('from', 0);
				a.beginElement();

				a = m._spiderLeg._path.childNodes[1];
				a.setAttribute('from', 0.5);
				a.setAttribute('to', 0);
				a.setAttribute('stroke-opacity', 0);
				a.beginElement();

				m._spiderLeg._path.setAttribute('stroke-opacity', 0);
			}
		}

		setTimeout(function () {
			//If we have only <= one child left then that marker will be shown on the map so don't remove it!
			var stillThereChildCount = 0;
			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];
				if (m._spiderLeg) {
					stillThereChildCount++;
				}
			}


			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];

				if (!m._spiderLeg) { //Has already been unspiderfied
					continue;
				}


				if (m.setOpacity) {
					m.setOpacity(1);
					m.setZIndexOffset(0);
				}

				if (stillThereChildCount > 1) {
					fg.removeLayer(m);
				}

				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
			group._animationEnd();
		}, 200);
	}
});


sop.MarkerClusterGroup.include({
	//The MarkerCluster currently spiderfied (if any)
	_spiderfied: null,

	_spiderfierOnAdd: function () {
		this._map.on('click', this._unspiderfyWrapper, this);

		if (this._map.options.zoomAnimation) {
			this._map.on('zoomstart', this._unspiderfyZoomStart, this);
		}
		//Browsers without zoomAnimation or a big zoom don't fire zoomstart
		this._map.on('zoomend', this._noanimationUnspiderfy, this);

		if (sop.Path.SVG && !sop.Browser.touch) {
			this._map._initPathRoot();
			//Needs to happen in the pageload, not after, or animations don't work in webkit
			//  http://stackoverflow.com/questions/8455200/svg-animate-with-dynamically-added-elements
			//Disable on touch browsers as the animation messes up on a touch zoom and isn't very noticable
		}
	},

	_spiderfierOnRemove: function () {
		this._map.off('click', this._unspiderfyWrapper, this);
		this._map.off('zoomstart', this._unspiderfyZoomStart, this);
		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);

		this._unspiderfy(); //Ensure that markers are back where they should be
	},


	//On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
	//This means we can define the animation they do rather than Markers doing an animation to their actual location
	_unspiderfyZoomStart: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}

		this._map.on('zoomanim', this._unspiderfyZoomAnim, this);
	},
	_unspiderfyZoomAnim: function (zoomDetails) {
		//Wait until the first zoomanim after the user has finished touch-zooming before running the animation
		if (sop.DomUtil.hasClass(this._map._mapPane, 'leaflet-touching')) {
			return;
		}

		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
		this._unspiderfy(zoomDetails);
	},


	_unspiderfyWrapper: function () {
		/// <summary>_unspiderfy but passes no arguments</summary>
		this._unspiderfy();
	},

	_unspiderfy: function (zoomDetails) {
		if (this._spiderfied) {
			this._spiderfied.unspiderfy(zoomDetails);
		}
	},

	_noanimationUnspiderfy: function () {
		if (this._spiderfied) {
			this._spiderfied._noanimationUnspiderfy();
		}
	},

	//If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
	_unspiderfyLayer: function (layer) {
		if (layer._spiderLeg) {
			this._featureGroup.removeLayer(layer);

			layer.setOpacity(1);
			//Position will be fixed up immediately in _animationUnspiderfy
			layer.setZIndexOffset(0);

			this._map.removeLayer(layer._spiderLeg);
			delete layer._spiderLeg;
		}
	}
});


/**
 * Created by htkim on 2014-11-05.
 */
sop.ToolTip = sop.Layer.extend({

	options: {
		className: '',
		clickable: false,
		direction: 'right',
		noHide: false,
		offset: [12, -15], // 6 (width of the tooltip triangle) + 6 (padding)
		opacity: 1,
		zoomAnimation: true
	},

	initialize: function (options, source) {
		sop.setOptions(this, options);

		this._source = source;
		this._animated = sop.Browser.any3d && this.options.zoomAnimation;
		this._isOpen = false;
	},

	onAdd: function (map) {
		this._map = map;

		this._pane = this.options.pane ? map._panes[this.options.pane] :
				this._source instanceof sop.Marker ? map._panes.markerPane : map._panes.infowindowPane;

		if (!this._container) {
			this._initLayout();
		}

		this._pane.appendChild(this._container);

		this._initInteraction();

		this._update();

		this.setOpacity(this.options.opacity);
	},

	getEvents: function () {
		var events = {viewreset: this._onViewReset};

		if (this._animated) {
			events.zoomanim = this._zoomAnimation;
		}

		if (sop.Browser.touch && !this.options.noHide) {
			sop.DomEvent.on(this._container, 'click', this.close, this);
			events.click = this.close();
		}

		return events;
	},

	onRemove: function (map) {
		this._pane.removeChild(this._container);

		map.off({
			zoomanim: this._zoomAnimation,
			moveend: this._onMoveEnd,
			viewreset: this._onViewReset
		}, this);

		this._removeInteraction();

		this._map = null;
	},

	_initLayout: function () {
		this._container = sop.DomUtil.create('div', 'sop-tooltip ' + this.options.className + ' sop-zoom-animated');
		this.updateZIndex(this._zIndex);
	},

	setUTMK: function (utmk) {
		this._utmk = sop.utmk(utmk);
		if (this._map) {
			this._updatePosition();
		}
		return this;
	},

	setContent: function (content) {
		// Backup previous content and store new content
		this._previousContent = this._content;
		this._content = content;

		this._updateContent();

		return this;
	},

	close: function () {
		var map = this._map;

		if (map) {
			if (sop.Browser.touch && !this.options.noHide) {
				sop.DomEvent.off(this._container, 'click', this.close);
				map.off('click', this.close, this);
			}

			map.removeLayer(this);
		}
	},

	updateZIndex: function (zIndex) {
		this._zIndex = zIndex;

		if (this._container && this._zIndex) {
			this._container.style.zIndex = zIndex;
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._container) {
			sop.DomUtil.setOpacity(this._container, opacity);
		}
	},

	_update: function () {
		if (!this._map) {
			return;
		}

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updatePosition();

		this._container.style.visibility = '';
	},

	_updateContent: function () {
		if (!this._content || !this._map || this._prevContent === this._content) {
			return;
		}

		if (typeof this._content === 'string') {
			this._container.innerHTML = this._content;

			this._prevContent = this._content;

			this._tooltipWidth = this._container.offsetWidth;
		}
	},

	_updatePosition: function () {
		var pos = this._map.utmkToLayerPoint(this._utmk);

		this._setPosition(pos);
	},

	_setPosition: function (pos) {
		var map = this._map,
			container = this._container,
			centerPoint = map.utmkToContainerPoint(map.getCenter()),
			tooltipPoint = map.layerPointToContainerPoint(pos),
			direction = this.options.direction,
			tooltipWidth = this._tooltipWidth,
			offset = sop.point(this.options.offset);

		// position to the right (right or auto & needs to)
		if (direction === 'right' || direction === 'auto' && tooltipPoint.x < centerPoint.x) {
			sop.DomUtil.addClass(container, 'sop-tooltip-right');
			sop.DomUtil.removeClass(container, 'sop-tooltip-left');

			pos = pos.add(offset);
		} else { // position to the left
			sop.DomUtil.addClass(container, 'sop-tooltip-left');
			sop.DomUtil.removeClass(container, 'sop-tooltip-right');

			pos = pos.add(sop.point(-offset.x - tooltipWidth, offset.y));
		}

		sop.DomUtil.setPosition(container, pos);
	},

	_zoomAnimation: function (opt) {
		var pos = this._map._utmkToNewLayerPoint(this._utmk, opt.zoom, opt.center).round();

		this._setPosition(pos);
	},

	_onMoveEnd: function () {
		if (!this._animated || this.options.direction === 'auto') {
			this._updatePosition();
		}
	},

	_onViewReset: function (e) {
		/* if map resets hard, we must update the tooltip */
		// 이벤트 hard 가 무엇인지 확인 해야함.
		if (e && e.hard) {
			this._update();
		}
	},

	_initInteraction: function () {
		if (!this.options.clickable) {
			return;
		}

		var container = this._container,
			events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

		sop.DomUtil.addClass(container, 'sop-clickable');
		sop.DomEvent.on(container, 'click', this._onMouseClick, this);

		for (var i = 0; i < events.length; i++) {
			sop.DomEvent.on(container, events[i], this._fireMouseEvent, this);
		}
	},

	_removeInteraction: function () {
		if (!this.options.clickable) {
			return;
		}

		var container = this._container,
			events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

		sop.DomUtil.removeClass(container, 'leaflet-clickable');
		sop.DomEvent.off(container, 'click', this._onMouseClick, this);

		for (var i = 0; i < events.length; i++) {
			sop.DomEvent.off(container, events[i], this._fireMouseEvent, this);
		}
	},

	_onMouseClick: function (e) {
		if (this.hasEventListeners(e.type)) {
			sop.DomEvent.stopPropagation(e);
		}

		this.fire(e.type, {
			originalEvent: e
		});
	},

	_fireMouseEvent: function (e) {
		this.fire(e.type, {
			originalEvent: e
		});

		// TODO proper custom event propagation
		// this line will always be called if marker is in a FeatureGroup
		if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
			sop.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousedown') {
			sop.DomEvent.stopPropagation(e);
		} else {
			sop.DomEvent.preventDefault(e);
		}
	}
});

/**
 * Created by htkim on 2014-11-06.
 */
sop.Path.include({
	bindToolTip: function (content, options) {
		if (!this.tooltip || this.tooltip.options !== options) {
			this.tooltip = new sop.ToolTip(options, this);
		}

		this.tooltip.setContent(content);

		if (!this._showToolTipAdded) {
			this
				.on('mouseover', this._showToolTip, this)
				.on('mousemove', this._moveToolTip, this)
				.on('mouseout remove', this._hideToolTip, this);

			if (sop.Browser.touch) {
				this.on('click', this._showToolTip, this);
			}
			this._showToolTipAdded = true;
		}

		return this;
	},

	unbindToolTip: function () {
		if (this.tooltip) {
			this._hideToolTip();
			this.tooltip = null;
			this._showToolTipAdded = false;
			this
				.off('mouseover', this._showToolTip, this)
				.off('mousemove', this._moveToolTip, this)
				.off('mouseout remove', this._hideToolTip, this);
		}
		return this;
	},

	updateToolTipContent: function (content) {
		if (this.tooltip) {
			this.tooltip.setContent(content);
		}
	},

	_showToolTip: function (e) {
		this.tooltip.setUTMK(e.utmk);
		this._map.showToolTip(this.tooltip);
	},

	_moveToolTip: function (e) {
		this.tooltip.setUTMK(e.utmk);
	},

	_hideToolTip: function () {
		this.tooltip.close();
	}
});

/**
 * Created by htkim on 2014-11-06.
 */
sop.Map.include({
	showToolTip: function (tooltip) {
		return this.addLayer(tooltip);
	}
});

/**
 * Created by htkim on 2014-11-06.
 */
sop.CommonMarkerFunction = {

	showToolTip: function () {
		if (this.tooltip && this._map) {
			this.tooltip.setUTMK(this._utmk);
			this._map.showToolTip(this.tooltip);
		}

		return this;
	},

	hideToolTip: function () {
		if (this.tooltip) {
			this.tooltip.close();
		}
		return this;
	},

	setToolTipNoHide: function (noHide) {
		if (this._tooltipNoHide === noHide) {
			return;
		}

		this._tooltipNoHide = noHide;

		if (noHide) {
			this._removeToolTipRevealHandlers();
			this.showToolTip();
		} else {
			this._addToolTipRevealHandlers();
			this.hideToolTip();
		}
	},

	bindToolTip: function (content, options) {
		var tooltipAnchor = this.options.icon ? this.options.icon.options.tooltipAnchor : this.options.tooltipAnchor,
			anchor = sop.point(tooltipAnchor) || sop.point(0, 0);

		anchor = anchor.add(sop.ToolTip.prototype.options.offset);

		if (options && options.offset) {
			anchor = anchor.add(options.offset);
		}

		options = sop.Util.extend({offset: anchor}, options);

		this._tooltipNoHide = options.noHide;

		if (!this.tooltip) {
			if (!this._tooltipNoHide) {
				this._addToolTipRevealHandlers();
			}

			this
				.on('remove', this.hideToolTip, this)
				.on('move', this._moveToolTip, this)
				.on('add', this._onMarkerAdd, this);

			this._hasToolTipHandlers = true;
		}

		this.tooltip = new sop.ToolTip(options, this)
			.setContent(content);

		return this;
	},

	unbindToolTip: function () {
		if (this.tooltip) {
			this.hideToolTip();

			this.tooltip = null;

			if (this._hasToolTipHandlers) {
				if (!this._tooltipNoHide) {
					this._removeToolTipRevealHandlers();
				}

				this
					.off('remove', this.hideToolTip, this)
					.off('move', this._moveToolTip, this)
					.off('add', this._onMarkerAdd, this);
			}

			this._hasToolTipHandlers = false;
		}
		return this;
	},

	updateToolTipContent: function (content) {
		if (this.tooltip) {
			this.tooltip.setContent(content);
		}
	},

	getToolTip: function () {
		return this.tooltip;
	},

	_onMarkerAdd: function () {
		if (this._tooltipNoHide) {
			this.showToolTip();
		}
	},

	_addToolTipRevealHandlers: function () {
		this
			.on('mouseover', this.showToolTip, this)
			.on('mouseout', this.hideToolTip, this);

		if (sop.Browser.touch) {
			this.on('click', this.showToolTip, this);
		}
	},

	_removeToolTipRevealHandlers: function () {
		this
			.off('mouseover', this.showToolTip, this)
			.off('mouseout', this.hideToolTip, this);

		if (sop.Browser.touch) {
			this.off('click', this.showToolTip, this);
		}
	},

	_moveToolTip: function (e) {
		this.tooltip.setUTMK(e.utmk);
	}
};

/**
 * Created by htkim on 2014-11-06.
 */
sop.CircleMarker.mergeOptions({
	tooltipAnchor: new sop.Point(0, 0)
});


sop.CircleMarker.include(sop.CommonMarkerFunction);

/**
 * Created by htkim on 2014-11-06.
 */
sop.Icon.Default.mergeOptions({
	tooltipAnchor: new sop.Point(9, -20)
});

sop.Marker.include(sop.CommonMarkerFunction);

sop.Marker.include({

	_originalUpdateZIndex: sop.Marker.prototype._updateZIndex,

	_updateZIndex: function (offset) {
		var zIndex = this._zIndex + offset;

		this._originalUpdateZIndex(offset);

		if (this.tooltip) {
			this.tooltip.updateZIndex(zIndex);
		}
	},

	_originalSetOpacity: sop.Marker.prototype.setOpacity,

	setOpacity: function (opacity, tooltipHasSemiTransparency) {
		this.options.tooltipHasSemiTransparency = tooltipHasSemiTransparency;

		this._originalSetOpacity(opacity);
	},

	_originalUpdateOpacity: sop.Marker.prototype._updateOpacity,

	_updateOpacity: function () {
		var absoluteOpacity = this.options.opacity === 0 ? 0 : 1;

		this._originalUpdateOpacity();

		if (this.tooltip) {
			this.tooltip.setOpacity(this.options.tooltipHasSemiTransparency ? this.options.opacity : absoluteOpacity);
		}
	},

	_originalSetUTMK: sop.Marker.prototype.setUTMK,

	setUTMK: function (utmk) {
		if (this.tooltip && !this._tooltipNoHide) {
			this.hideToolTip();
		}

		return this._originalSetUTMK(utmk);
	}
});

/**
 * Created by htkim on 2014-11-06.
 */
sop.FeatureGroup.include({

	clearLayers: function () {
		this.unbindLabel();
		this.eachLayer(this.removeLayer, this);
		return this;
	},

	bindLabel: function (content, options) {
		return this.invoke('bindToolTip', content, options);
	},

	unbindLabel: function () {
		return this.invoke('unbindToolTip');
	},

	updateLabelContent: function (content) {
		this.invoke('updateToolTIpContent', content);
	}
});

}(window, document));