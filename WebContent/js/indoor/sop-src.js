/*
 sop 0.1-dev,
*/
(function (window, document, undefined) {
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

sop.Util = {
	// extend an object with properties of one or more other objects
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
		return this._ObjectToType[toSting.call(obj)] || (obj ? 'object' : obj === null ? 'null' : 'undefined');
	},

	_ObjectToType: {
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


/*
 * sop.Class 객체
 */

sop.Class = function () {};

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
sop.Class.include = function (props) {
	sop.extend(this.prototype, props);
};

//  클래스옵션에 파리미터로 전달받은 옵션을 머지하여 반환.
sop.Class.mergeOptions = function (options) {
	sop.extend(this.prototype.options, options);
};

// 생성자 훅 추가
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

/**
 * sop.Evented
 * 이벤트 처리.
 *
 * @class
 *
 *
 */
sop.Evented = sop.Class.extend({

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

	// adds a parent to propagate events to (when you fire with true as a 3rd argument)
	addEventParent: function (obj) {
		this._eventParents = this._eventParents || {};
		this._eventParents[sop.stamp(obj)] = obj;
		return this;
	},

	removeEventParent: function (obj) {
		if (this._eventParents) {
			delete this._eventParents[sop.stamp(obj)];
		}
		return this;
	},

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

	sop.Browser = {
		ie: ie,
		ielt9: ie && !document.addEventListener,
		webkit: webkit,
		gecko: (ua.indexOf('gecko') !== -1) && !webkit && !window.opera && !ie,
		android: ua.indexOf('android') !== -1,
		android23: android23,
		chrome: chrome,
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

		//ajax새로 추가
		xhr: xhr
	};

}());


/**
 * Created by neighbor on 2014-07-09.
 */
sop.Const = sop.Class.extend({
	statics: {
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
	resolutions: [
		2048,   // level 00
		1024,   // level 01
		512,    // level 02
		256,    // level 03
		128,    // level 04
		64,     // level 05
		32,     // level 06
		16,     // level 07
		8,      // level 08
		4,      // level 09
		2,      // level 10
		1,      // level 11
		0.5,    // level 12
		0.25,   // level 13
		0.125,  // level 14
		0.0625, // level 15
		0.03125, // level 16
		0.015625, // level 17
		0.0078125, // level 18
		0.00390625, // level 19
		0.001953125  // level 20
	],
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
	}
});


/**
 * sop.Map
 * 지도 생성에 사용되는 객체 입니다.
 *
 * @class
 * @augments Evented
 *
 */
sop.Map = sop.Evented.extend(/** @lends sop.Map.prototype */{

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
	 * @param utmk
	 * @param zoom
	 * @param options
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
	 * @param bounds
	 * @param options
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

	panTo: function (center, options) { // (UTMK)
		return this.setView(center, this._zoom, {pan: options});
	},

	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.PanAnimation.js
		this.fire('movestart');

		this._rawPanBy(sop.point(offset));

		this.fire('move');
		return this.fire('moveend');
	},

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

	panInsideBounds: function (bounds, options) {
		var center = this.getCenter(),
			newCenter = this._limitCenter(center, this._zoom, bounds);

		if (center.equals(newCenter)) {
			return this;
		}

		return this.panTo(newCenter, options);
	},

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

	_initContainer: function (id) {
		var container = this._container = sop.DomUtil.get(id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._sop) {
			throw new Error('Map container is already initialized.');
		}

		container._sop = true;
	},

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

	_rawPanBy: function (offset) {
		sop.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},

	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	_panInsideMaxBounds: function () {
		this.panInsideBounds(this.options.maxBounds);
	},

	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// map events

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

	_onResize: function () {
		sop.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = sop.Util.requestAnimFrame(
			function () {
				this.invalidateSize({debounceMoveend: true});
			}, this, false, this._container);
	},

	_handleMouseEvent: function (e) {
		if (!this._loaded) {
			return;
		}

		this._fireMouseEvent(this, e,
				e.type === 'mouseenter' ? 'mouseover' :
					e.type === 'mouseleave' ? 'mouseout' : e.type);
	},

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

	_getMapPanePos: function () {
		return sop.DomUtil.getPosition(this._mapPane);
	},

	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	_getTopLeftPoint: function () {
		return this.getPixelOrigin().subtract(this._getMapPanePos());
	},

	_getNewTopLeftPoint: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		// TODO round on display, not calculation to increase precision?
		return this.project(center, zoom)._subtract(viewHalf)._round();
	},

	_utmkToNewLayerPoint: function (utmk, newZoom, newCenter) {
		var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
		return this.project(utmk, newZoom)._subtract(topLeft);
	},

	// layer point of the current center
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	_getCenterOffset: function (utmk) {
		return this.utmkToLayerPoint(utmk).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
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
	_limitOffset: function (offset, bounds) {
		if (!bounds) {
			return offset;
		}

		var viewBounds = this.getPixelBounds(),
			newBounds = new sop.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
			seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),

			dx = this._rebound(nwOffset.x, -seOffset.x),
			dy = this._rebound(nwOffset.y, -seOffset.y);

		return new sop.Point(dx, dy);
	},

	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
			max = this.getMaxZoom();

		return Math.max(min, Math.min(max, zoom));
	}
});

sop.map = function (id, options) {
	return new sop.Map(id, options);
};



sop.Layer = sop.Evented.extend({

	options: {
		pane: 'overlayPane'
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	remove: function () {
		return this.removeFrom(this._map || this._mapToAdd);
	},

	removeFrom: function (obj) {
		if (obj) {
			obj.removeLayer(this);
		}
		return this;
	},

	getPane: function (name) {
		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
	},

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

	hasLayer: function (layer) {
		return !!layer && (sop.stamp(layer) in this._layers);
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	_addLayers: function (layers) {
		layers = layers ? (sop.Util.isArray(layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},

	_addZoomLimit: function (layer) {
		if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
			this._zoomBoundLayers[sop.stamp(layer)] = layer;
			this._updateZoomLevels();
		}
	},

	_removeZoomLimit: function (layer) {
		var id = sop.stamp(layer);

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}
	},

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


/*
 * sop.GridLayer is used as base class for grid-like layers like TileLayer.
 */

sop.GridLayer = sop.Layer.extend({

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

	initialize: function (options) {
		options = sop.setOptions(this, options);
	},

	onAdd: function () {
		this._initContainer();

		if (!this.options.updateWhenIdle) {
			// update tiles on move, but not more often than once per given interval
			this._update = sop.Util.throttle(this._update, this.options.updateInterval, this);
		}

		this._reset();
		this._update();
	},

	beforeAdd: function (map) {
		map._addZoomLimit(this);
	},

	onRemove: function (map) {
		this._clearBgBuffer();
		sop.DomUtil.remove(this._container);

		map._removeZoomLimit(this);

		this._container = null;
	},

	bringToFront: function () {
		if (this._map) {
			sop.DomUtil.toFront(this._container);
			this._setAutoZIndex(Math.max);
		}
		return this;
	},

	bringToBack: function () {
		if (this._map) {
			sop.DomUtil.toBack(this._container);
			this._setAutoZIndex(Math.min);
		}
		return this;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	getContainer: function () {
		return this._container;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._map) {
			this._updateOpacity();
		}
		return this;
	},

	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}
		return this;
	},

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

	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

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

	_getTileSize: function () {
		return this.options.tileSize;
	},

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
	_tileCoordsToKey: function (coords) {
		return coords.x + ':' + coords.y;
	},

	// converts tile cache key to coordinates
	_keyToTileCoords: function (key) {
		var kArr = key.split(':'),
		    x = parseInt(kArr[0], 10),
		    y = parseInt(kArr[1], 10);

		return new sop.Point(x, y);
	},

	// remove any present tiles that are off the specified bounds
	_removeOtherTiles: function (bounds) {
		for (var key in this._tiles) {
			if (!bounds.contains(this._keyToTileCoords(key))) {
				this._removeTile(key);
			}
		}
	},

	_removeTile: function (key) {
		var tile = this._tiles[key];

		sop.DomUtil.remove(tile);

		delete this._tiles[key];

		this.fire('tileunload', {tile: tile});
	},

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

	_visibleTilesReady: function () {
		this.fire('load');

		if (this._zoomAnimated) {
			// clear scaled tiles after all new tiles are loaded (for performance)
			clearTimeout(this._clearBgBufferTimer);
			this._clearBgBufferTimer = setTimeout(sop.bind(this._clearBgBuffer, this), 300);
		}
	},

	_getTilePos: function (coords) {
		return coords
				.multiplyBy(this._getTileSize())
				.subtract(this._map.getPixelOrigin());
	},

	_wrapCoords: function (coords) {
		coords.x = this._wrapLng ? sop.Util.wrapNum(coords.x, this._wrapLng) : coords.x;
		coords.y = this._wrapLat ? sop.Util.wrapNum(coords.y, this._wrapLat) : coords.y;
	},

	// get the global tile coordinates range for the current zoom
	_getTileNumBounds: function () {
		var bounds = this._map.getPixelWorldBounds(),
			size = this._getTileSize();

		return bounds ? sop.bounds(
				bounds.min.divideBy(size).floor(),
				bounds.max.divideBy(size).ceil().subtract([1, 1])) : null;
	},

	_startZoomAnim: function () {
		this._prepareBgBuffer();
		this._prevTranslate = this._translate || new sop.Point(0, 0);
		this._prevScale = this._scale;
	},

	_animateZoom: function (e) {
		// avoid stacking transforms by calculating cumulating translate/scale sequence
		this._translate = this._prevTranslate.multiplyBy(e.scale).add(e.origin.multiplyBy(1 - e.scale));
		this._scale = this._prevScale * e.scale;

		sop.DomUtil.setTransform(this._bgBuffer, this._translate, this._scale);
	},

	_endZoomAnim: function () {
		var front = this._tileContainer;
		front.style.visibility = '';
		sop.DomUtil.toFront(front); // bring to front
	},

	_clearBgBuffer: function () {
		var map = this._map,
			bg = this._bgBuffer;

		if (map && !map._animatingZoom /*&& !map.touchZoom._zooming */&& bg) {
			sop.DomUtil.empty(bg);
			sop.DomUtil.setTransform(bg);
		}
	},

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

sop.TileLayer = sop.GridLayer.extend({

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

	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}
		return this;
	},

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

	getTileUrl: function (coords) {
		return sop.Util.template(this._url, sop.extend({
			r: this.options.detectRetina && sop.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
			s: this._getSubdomain(coords),
			x: coords.x,
			y: this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y,
			z: this._getZoomForUrl()
		}, this.options));
	},

	_tileOnLoad: function (done, tile) {
		done(null, tile);
	},

	_tileOnError: function (done, tile, e) {
		var errorUrl = this.options.errorTileUrl;
		if (errorUrl) {
			tile.src = errorUrl;
		}
		done(e, tile);
	},

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

	_removeTile: function (key) {
		var tile = this._tiles[key];

		sop.GridLayer.prototype._removeTile.call(this, key);

		// for https://github.com/Leaflet/Leaflet/issues/137
		if (!sop.Browser.android) {
			tile.onload = null;
			tile.src = sop.Util.emptyImageUrl;
		}
	},

	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;

		return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
	},

	_getSubdomain: function (tilePoint) {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	// stops loading all tiles in the background layer
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
 * Created by htkim on 2014-11-05.
 */
sop.BuildingLayer = sop.GridLayer.extend({
	options: {
		minZoom: 0,
		maxZoom: 20
	},

	/**
	 * 배경으로 사용할 빌딩 타일 div 를 구성한다.
	 * @param coords
	 * @returns {HTMLElement}
	 */
	createTile: function (coords) {
		var tile = document.createElement('div');
//		tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');
//		tile.style.outline = '1px solid green';
		tile.style.background = 'white';
		return tile;
	}
});

sop.Map.mergeOptions({
	buildingLayer: true
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

sop.Handler = sop.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	enable: function () {
		if (this._enabled) { return; }

		this._enabled = true;
		this.addHooks();
	},

	disable: function () {
		if (!this._enabled) { return; }

		this._enabled = false;
		this.removeHooks();
	},

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


}(window, document));