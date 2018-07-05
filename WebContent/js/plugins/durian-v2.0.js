/**
 * Durin Javascript Liabrary (v 2.0) 
 * @module durian
 * @author rainmaker
 * @since 2014
 * @version 2.0-dev
 */
(function(W, D) {
	//"use strict";
	/*
	if(location.href.substring(0, 5) == "https"){
		//location.href = "http://sgis.kostat.go.kr";
		location.href = location.href.replace("https", "http");
	}
	*/
	
	
	W.$d = W.$d || {};
	$d.version = '2.0-dev';

	var typeArr = {
		"[object Boolean]" : "boolean",
		"[object Number]" : "number",
		"[object String]" : "string",
		"[object Function]" : "function",
		"[object Object]" : "object",
		"[object Array]" : "array",
		"[object Date]" : "date",
		"[object RegExp]" : "regexp",
		"[object Error]" : "error"
	};

	var g = {
		"[object Boolean]" : "boolean",
		"[object Number]" : "number",
		"[object String]" : "string",
		"[object Function]" : "function",
		"[object Object]" : "object",
		"[object Array]" : "array",
		"[object Date]" : "date",
		"[object RegExp]" : "regexp",
		"[object Error]" : "error"
	};

	$d.browser = (function() {
		var userAgent = W.navigator.userAgent.toLowerCase();
		var ie11 = false, ie10 = false, ie9 = false, ie8 = false, ie7 = false, ie6 = false, ie = false;
		var safari = false, chrome = false, firefox = false, opera = false;
		var xhr = false;
		var xdr = false;

		if (userAgent.indexOf('trident/7') != -1) { // IE 11
			ie11 = true;
		}
		if (userAgent.indexOf('trident/6') != -1) { // IE 10
			ie10 = true;
		}
		if (userAgent.indexOf('msie 9') != -1) { // IE 9
			ie9 = true;
			xdr = true;
		}
		if (userAgent.indexOf('firefox') != -1) { // firefox
			firefox = true;
		}
		if (userAgent.indexOf('chrome') != -1) { // chrome
			chrome = true;
		}
		if (userAgent.indexOf('msie 8') != -1) { // IE 8
			ie8 = true;
			xdr = true;
		}
		if (userAgent.indexOf('safari') != -1) { // safari
			safari = true;
		}
		if (userAgent.indexOf('msie 7') != -1) { // IE 7
			ie7 = true;
		}
		if (userAgent.indexOf('msie 6') != -1) { // IE 6
			ie6 = true;
		}
		if (userAgent.indexOf('OPR') != -1) { // opera
			opera = true;
		}
		if (userAgent.indexOf('msie') != -1) { // IE
			ie = true;
		}

		if (typeof W.XMLHttpRequest === "function") {
			xhr = true;
		}
		
		return {
			ie11 : ie11,
			ie10 : ie10,
			ie9 : ie9,
			ie8 : ie8,
			ie7 : ie7,
			ie6 : ie6,
			ie : ie,
			firefox : firefox,
			chrome : chrome,
			safari : safari,
			opera : opera,
			xhr : xhr,
			xdr : xdr
		};
	}());

	$d.util = {

		typeOf : function(i) {
			return g[Object.prototype.toString.call(i)]
					|| (i ? "object" : i === null ? "null" : "undefined")
		},
		isArray : function(o, i) {
			if (!i) {
				return Array.isArray && (Array.isArray(o))
						|| this.typeOf(o) === "array"
			}
			else {
				return o
						&& (typeof o === "object"
								&& typeof o.length === "number"
								&& typeof o.splice === "function" && !o
								.propertyIsEnumerable("length"))
						|| (o instanceof Array)
			}
		},
		isBoolean : function(i) {
			return typeof i === "boolean"
		},
		isDate : function(i) {
			return this.typeOf(i) === "date"
		},
		isRegExp : function(i) {
			return this.typeOf(i) === "regexp"
		},
		isElement : function(i) {
			return !!(i && i.nodeType === 1)
		},
		isFragment : function(i) {
			return !!(i && i.nodeType === 11)
		},
		isFunction : function(i) {
			return this.typeOf(i) === "function"
		},
		isNamespace : function(i) {
			return this.isString(i) && /^[\w]+(\.[\w]+)*$/.test(i)
		},
		isNumber : function(i) {
			return typeof i === "number" && isFinite(i)
		},
		isObject : function(i, o) {
			return i && ((typeof i === "object") || (o && this.isFunction(i)))
					|| false
		},
		isString : function(i) {
			return typeof i === "string"
		},
		isUndefined : function(i) {
			return typeof i === "undefined"
		},
		isValue : function(o) {
			var i = this.typeOf(o);
			switch (i) {
			case "undefined":
			case "null":
				return false;
			case "number":
				return isFinite(o);
			case "string":
				return "" !== o
			}
			return !!(i)
		},
		digit2 : function(n) {
			return n < 10 ? '0' + n : n;
		},
		deepCopy : function(parent, child) {
			var i;
			if (this.isUndefined(parent)) {
				throw new Error("Parent Object is undefined");
			}
			if (this.isUndefined(child)) {
				throw new Error("Child Object is undefined");
			}
			for (i in parent) {
				if (parent.hasOwnProperty(i)) {
					if (this.isObject(parent[i])) {
						child[i] = this.isArray(parent[i]) ? [] : {};
						this.deepCopy(parent[i], child[i]);
					}
					else {
						child[i] = parent[i];
					}
				}
			}
		},
		namespace : function(className, conFunc) {
			var parent = W, i, len, props, classArr, isConFunc, isSuc;
			if (!this.isNamespace(className)) {
				throw new SyntaxError("invalid namespace [" + className + "]");
			}
			classArr = className.split(".");
			len = classArr.length - 1;
			isConFunc = this.isFunction(conFunc);

			for (i = 0; i < len; i += 1) {
				if (this.isUndefined(parent[classArr[i]])) {
					parent[classArr[i]] = {};
				}
				else {
					if (this.isFunction(parent[classArr[i]])) {
						throw new Error(
								"i["
										+ i
										+ "] "
										+ " function was previously defined in hierarchy");
					}
				}
				parent = parent[classArr[i]];
			}

			if (isConFunc) {
				if (this.isUndefined(parent[classArr[len]])) {
					parent[classArr[len]] = conFunc;
					isSuc = true;
				}
				else {
					throw new Error("namespace is already exists...");
				}
			}
			else {
				if (this.isUndefined(parent[classArr[len]])) {
					parent[classArr[len]] = {};
					parent = parent[classArr[len]];

					if (this.isObject(conFunc)) {
						for (props in conFunc) {
							if (this.isUndefined(parent[props])
									&& conFunc.hasOwnProperty(props)) {
								parent[props] = conFunc[props];
								isSuc = true
							}
						}
					}
				}
				else {
					throw new Error("namespace is already exists...");
				}
			}
			return isSuc;
		},
		addListener : null,
		removeListener : null,
		on : null,
		off : null
	};
	// EvnetListener 정리
	if ($d.util.isFunction(W.addEventListener)) {
		$d.util.addListener = function(el, type, fn) {
			el.addEventListener(type, fn, false);
		};

		$d.util.removeListener = function(el, type, fn) {
			el.removeEventListener(type, fn, false);
		};
	}
	else if ($d.util.isFunction(D.attachEvent)) {
		$d.util.addListener = function(el, type, fn) {
			el.attachEvent('on' + type, fn);
		};

		$d.util.removeListener = function(el, type, fn) {
			el.detachEvent('on' + type, fn);
		};
	}
	else {
		$d.util.addListener = function(el, type, fn) {
			el['on' + type] = fn;
		};

		$d.util.removeListener = function(el, type, fn) {
			el['on' + type] = null;
		};
	}

	$d.util.off = $d.util.removeListener;
	$d.util.on = $d.util.addListener;

	$class = function(cName) {
		var newClass = {
			name : cName
		};
		
		newClass.extend = function(parent) {
			if (!$d.util.isFunction(parent)) {
				throw new Error("$class.extend: " + this.name
						+ ' cannot extend undefined class, "' + parent + '"')
			}
			this.$super = parent;
			delete this.extend;
			return this
		};
		
		newClass.define = function(ops) { // r
			var w, temp, conFunc, parent = this.$super, className = this.name;

			conFunc = function() {
				var i, srcObj;
				parent.apply(this, arguments);
				$d.util.deepCopy(ops, this);
				var funcName = this[className.substring(className.lastIndexOf(".") + 1)];
				if ($d.util.isFunction(funcName)) {
					funcName.apply(this, arguments)
				}
			};

			temp = function() {};
			temp.prototype = parent.prototype;
			conFunc.prototype = new temp();
			conFunc.prototype.constructor = conFunc;
			conFunc.$super = parent.prototype;

			if (parent !== Object
					&& parent.prototype.constructor === Object.prototype.constructor) {
				parent.prototype.constructor = parent;
			}
			if (!$d.util.namespace(this.name, conFunc)) {
				throw new Error('$class.define: "' + this.name + '" already defined');
			}
			conFunc.prototype.getClass = function() {
				return conFunc;
			};
			delete this.name;
			delete this.$super;
			delete this.define;
		};
		return newClass;
	};

	$d.api = $d.api || {};
	$d.api.ajaxAPI = function() {
		var xhr, heads, params, i, activeXids = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
		var xdr;
		this.cancel = false;
		this.async = true;
		this.blockUI;

		// 초기화
		if ($d.util.isUndefined(xhr)) {
			if ($d.browser.xhr) {
				xhr = new XMLHttpRequest();
			}
			else {
				for (i = 0; i < activeXids.length; i += 1) {
					try {
						xhr = new ActiveXObject(activeXids[i]);
						break;
					} catch (e) {}
				}
			}
		}
		
		// 초기화
		if ($d.util.isUndefined(xdr)) {
			if ($d.browser.xdr) {
				xdr = new XDomainRequest();
			}
		}
		
		if ($d.util.isUndefined(heads)) {
			heads = {};
		}

		if ($d.util.isUndefined(params)) {
			params = {};
		}

		/**
		 * @method clear HTTP Header �� Parameter�� �ʱ�ȭ �ϴ� �Լ�
		 * @param none
		 * @returns none
		 */
		this.clear = function() {
			var i, p;

			for (i in heads) {
				if (heads.hasOwnProperty(i)) {
					delete heads[i];
				}
			}

			for (p in params) {
				if (params.hasOwnProperty(p)) {
					delete params[p];
				}
			}

			this.cancel = false;
		};

		this.addHeader = function(K, V) {
			if ($d.util.isUndefined(heads)) {
				heads = heads || {};
			}

			heads[K] = V;
		};

		this.addParam = function(K, V) {
			if ($d.util.isUndefined(params)) {
				params = params || {};
			}

			params[K] = V;
		};
		
		this.removeParam = function(K) {
			if ($d.util.isUndefined(params)) {
				params = params || {};
			}
			
			delete params[K];
		};

		/**
		 * @method $d.api.AjaxAPI.request Ajax를 통해 정보 요청
		 * @param method - POST, GET, PUT, DELETE, HEAD
		 * @param opt { url, method, async, datatype } 의 Object를 정의
		 * 				url - 요청 대상 URL
		 * 				method - GET, POST, PUT, DELETE (default는 GET)
		 * 				async - true : 비동기, false : 동기 방식 (default true)
		 * 				datatype - xml, json (default는 json)
		 * @return none
		 */
		this.request = function(opt) {
			var parameter = '', h, p, that=this, method, url;
			this.cancel = false;

			if($d.util.isUndefined(opt)) { opt={};}
			if($d.util.isUndefined(opt.url)) {
				throw new Error("url undefinded");
			}
			method = $d.util.isUndefined(opt.method) ? "GET" : opt.method;
			this.async = $d.util.isUndefined(opt.async) ? true : opt.async;
			this.format = $d.util.isUndefined(opt.datatype) ? 'json' : opt.datatype;
			this.options = $d.util.isUndefined(opt.options) ? null : opt.options;
			
			for (p in params) {
				if (params.hasOwnProperty(p)) {
					parameter += p + "=" + params[p] + "&";
				}
			}

			if(parameter.length > 1) {
				parameter = parameter.slice(0, parameter.length - 1);
			}
			// 초기화
			//console.log("$d.browser.ie8",$d.browser.ie8);
			
			//사파리일 경우만
			if ($d.browser.safari) {
				xhr = new XMLHttpRequest();
			}
			
			/*
			if ($d.browser.ie8 || $d.browser.ie9) {
				xhr = new XDomainRequest();
			}
			*/
			//console.log("before..........onreadystatechange");
			//console.log("xhr.readyState",xhr.readyState);
			xhr.onreadystatechange = function() {
			//console.log("inside..........onreadystatechange");
				if (!that.cancel) {
					//console.log("xhr.readyState",xhr.readyState);
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							if (that.format === 'json') {
								var optUrl = opt.url;

								//오픈API일 경우
								if(optUrl.indexOf("/OpenAPI3/") > -1) {
									var resps = $d.json.parse(xhr.responseText);
									if(resps.errCd == "-401") {
										++accessTokenFailCnt;
										if(accessTokenFailCnt < 30) {
											that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);	
										}
									} else if(resps.errCd == "0") {
										accessTokenFailCnt = 0;
										that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
									} else {
										that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
									}
								} else if(optUrl.indexOf("/SOP_Kosis/kosis/") > -1) {	//KOSIS API일 경우
									that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
								} else if(optUrl.indexOf("/SGIS_Plus_Kosis_new/kosis/") > -1) {	//KOSIS API일 경우
									that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
								} else {
									//보안 타임스탬프 비교
									var resps = $d.json.parse(xhr.responseText);
									var headerKey = "timeStamp:" + resps.ts + ";errCd:" + resps.errCd + ";trId:" + resps.trId + ";";
									//alert(xhr.getResponseHeader("headerKey") + "            " + $.sha256(headerKey));
									
									if(xhr.getResponseHeader("headerKey") === $.sha256(headerKey)) {
										that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
									} else {
										that.onFail(xhr.status, opt.options);
										console.log("error" + opt.url);
	                                }
								}
							}
							
							else if (that.format === 'xml') {
								var optUrl = opt.url;
								//오픈API일 경우
								if(optUrl.indexOf("/OpenAPI3/") > -1) {
									var resps = $d.json.parse(xhr.responseText);
									if(resps.errCd == "-401") {
										++accessTokenFailCnt;
										if(accessTokenFailCnt < 30) {
											that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);	
										}
									} else if(resps.errCd == "0") {
										accessTokenFailCnt = 0;
										that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
									} else {
										that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
									}
								} else if(optUrl.indexOf("/SOP_Kosis/kosis/") > -1) {	//KOSIS API일 경우
									that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
								} else if(optUrl.indexOf("/SGIS_Plus_Kosis_new/kosis/") > -1) {	//KOSIS API일 경우
									that.onSuccess(xhr.status, $d.json.parse(xhr.responseText), opt.options);
								} else {
									//보안 타임스탬프 비교
									var resps = $d.json.parse(xhr.responseText);
									var headerKey = "timeStamp:" + resps.ts + ";errCd:" + resps.errCd + ";trId:" + resps.trId + ";";
									if(xhr.getResponseHeader("headerKey") === $.sha256(headerKey)) {
										that.onSuccess(xhr.status, xhr.responseXML, opt.options);
									} else {
										that.onFail(xhr.status, opt.options);
									}
								}
							}
							else {
								that.onSuccess(xhr.status, xhr.responseText);
							}
						}
						else if (xhr.status === 204) {
							that.onSuccess(xhr.status, opt.options);
						}
						else if (xhr.status === 401) {
							location.href="/";
						}
						else {
							that.onFail(xhr.status, opt.options);
						}

						// Block UI 닫기
						if (!that.async) {
							//console.log("hat.async",that.async);
							that.onBlockUIClose();
						}
					}
					else if (xhr.readyState === 0) {
						that.onNotInitialized();
					}
					else if (xhr.readyState === 1) {
						that.onEstablished();
					}
					else if (xhr.readyState === 2) {
						that.noReceived();
					}
					else if (xhr.readyState === 3) {
						that.onProcessing();
					}
				}
			}
			
			//IE8, 9 전용
			if($d.browser.xdr) {
				xdr.onload = function() {
					var resps = $d.json.parse(xdr.responseText);
					if(resps.errCd == "-401") {
						++accessTokenFailCnt;
						if(accessTokenFailCnt < 30) {
							that.onSuccess(xdr.status, $d.json.parse(xdr.responseText), opt.options);	
						}
					} else if(resps.errCd == "0") {
						accessTokenFailCnt = 0;
						that.onSuccess(xdr.status, $d.json.parse(xdr.responseText), opt.options);
					} else {
						that.onSuccess(xdr.status, $d.json.parse(xdr.responseText), opt.options);
					}
				}
				xdr.onerror = function() {
					that.onFail(0);
				}
				xdr.onprogress = function() {
					that.onBlockUIClose();
				}
			}
			
			if (method === "POST" || method === "PUT") { // POST, PUT
				if(opt.url === '' || opt.url === null || opt.url === undefined) {
					console.log("URL is NULL");
				} else {
					xhr.open(method, opt.url, true);
					//xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
					for (h in heads) {
						if (heads.hasOwnProperty(h)) {
							xhr.setRequestHeader(h, heads[h]);
						}
					}
					
					//보안 타임스탬프를 헤더에 추가
					xhr.setRequestHeader("ts", makeStamp(new Date()));

					xhr.send(parameter);
				}
			}
			else { // GET, DELETE, HEAD
				if ($d.browser.ie8 || $d.browser.ie9) {
					if(parameter.length > 0) {
						opt.url += "?" + parameter;
					}
					xdr.open(method, opt.url);
					xdr.send();
					
				} else {
					if(parameter.length > 0) {
						opt.url += "?" + parameter;
					}
					xhr.open(method, opt.url, true);
					for (h in heads) {
						if (heads.hasOwnProperty(h)) {
							xhr.setRequestHeader(h, heads[h]);
						}
					}
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send();
				}
			}

			if (!this.async) {
				that.onBlockUIPopup();
				// cancel 이벤트 추가
				/*$d.util.addListener(D, "keyup", function(e) {
					if (e.keyCode === 27) {
						that.cancel = true;
						that.onBlockUIClose();
						that.onCancel();
					}
				}); */
			}
		}

        this.post = function(opt) {
            opt.method = "POST";
            this.request(opt);
        }

        this.get = function(opt) {
            opt.method = "GET";
            this.request(opt);
        }
        /*
        this.put = function(opt) {
            opt.method = "PUT";
            this.request(opt);
        }

        this.delete = function(opt) {
            opt.method = "DELETE";
            this.request(opt);
        }

        this.head = function(opt) {
            opt.method = "HEAD";
            this.request(opt);
        }
*/
		this.onSuccess = function(status, response) {}
        this.onFail = function(status) {}
		this.onNotInitialized = function() {}
		this.onEstablished = function() {}
		this.noReceived = function() {}
		this.onProcessing = function() {}
		this.onCancel = function() {}

		this.onBlockUIPopup = function() {
/*
			this.blockUI = D.createElement("DIV");
			this.blockUI.style.backgroundColor = "#D3D3D3";
			this.blockUI.style.border = "0px solid black";
			this.blockUI.style.position = "absolute";
			this.blockUI.style.left = '0px';
			this.blockUI.style.top = '0px';
			if(window.innerHeight == undefined){
				this.blockUI.style.height = document.documentElement.clientHeight + 'px';
				this.blockUI.style.width = document.documentElement.clientWidth + 'px';
			}else{
				this.blockUI.style.height = W.innerHeight + 'px';
				this.blockUI.style.width = W.innerWidth + 'px';
			}
			this.blockUI.style.zIndex = "10000";
			this.blockUI.style.filter = "alpha(opacity=60);";
			this.blockUI.style.MozOpacity = 0.6;
			this.blockUI.style.opacity = 0.6;
			this.blockUI.style.KhtmlOpacity = 0.6;
			D.body.appendChild(this.blockUI);
			
			this.popupUI=D.createElement("DIV");
			this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
			this.popupUI.style.border = "3px solid rgb(0,0,0)";
			this.popupUI.style.position = "absolute";
			this.popupUI.style.height = '200px';
			this.popupUI.style.paddingBottom='40px';
			this.popupUI.style.width ='400px';
			this.popupUI.style.top ='50%';
			this.popupUI.style.left = '50%';
			this.popupUI.style.zIndex = "11000";
			this.popupUI.style.cursor='wait';
			var divHeight=this.popupUI.style.height.replace('px','');
			var divWidth=this.popupUI.style.width.replace('px','');
			this.popupUI.style.margin='-'+divHeight/2+'px 0 0 -'+divWidth/2+'px';
			this.popupUI.style.textAlign='center';
			
			var errorMsg = "<p>Example message</p><br><img src='../img/loding_type01.GIF'/>";
			this.popupUI.innerHTML=errorMsg;
			
			D.body.appendChild(this.popupUI);
			*/
		}
		
		this.onBlockUIClose = function() {
			//console.log("pop..Close..");
			if(!$d.util.isUndefined(this.blockUI)) {
				D.body.removeChild(this.blockUI);
				delete this.blockUI;
			}
			if(!$d.util.isUndefined(this.popupUI)) {
				D.body.removeChild(this.popupUI);
				delete this.popupUI;
			}
		}
	}

	$d.json = {};

	var cx, escapable, gap, indent, meta, rep;

	escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	meta = { // table of character substitutions
		'\b' : '\\b',
		'\t' : '\\t',
		'\n' : '\\n',
		'\f' : '\\f',
		'\r' : '\\r',
		'"' : '\\"',
		'\\' : '\\\\'
	};
	cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

	if (typeof Date.prototype.toJSON !== 'function') {

		Date.prototype.toJSON = function() {

			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-'
					+ $d.util.digit2(this.getUTCMonth() + 1) + '-'
					+ $d.util.digit2(this.getUTCDate()) + 'T'
					+ $d.util.digit2(this.getUTCHours()) + ':'
					+ $d.util.digit2(this.getUTCMinutes()) + ':'
					+ $d.util.digit2(this.getUTCSeconds()) + 'Z' : null;
		};

		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
			return this.valueOf();
		};
	}

	$d.json.quote = function(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"'
				+ string.replace(escapable,
						function(a) {
							var c = meta[a];
							return typeof c === 'string' ? c : '\\u'
									+ ('0000' + a.charCodeAt(0).toString(16))
											.slice(-4);
						}) + '"' : '"' + string + '"';
	}

	$d.json.str = function(key, holder) {
		var i, // The loop counter.
		k, // The member key.
		v, // The member value.
		length, mind = gap, partial, value = holder[key];

		if (value && typeof value === 'object'
				&& typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}

		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}

		switch (typeof value) {
		case 'string':
			return $d.json.quote(value);
		case 'number':
			return isFinite(value) ? String(value) : 'null';
		case 'boolean':
		case 'null':
			return String(value);
		case 'object':
			if (!value) {
				return 'null';
			}

			gap += indent;
			partial = [];

			// Is the value an array?

			if (Object.prototype.toString.apply(value) === '[object Array]') {
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || 'null';
				}

				v = partial.length === 0 ? '[]' : gap ? '[\n' + gap
						+ partial.join(',\n' + gap) + '\n' + mind + ']' : '['
						+ partial.join(',') + ']';
				gap = mind;
				return v;
			}

			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === 'string') {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}
			else {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}

			v = partial.length === 0 ? '{}' : gap ? '{\n' + gap
					+ partial.join(',\n' + gap) + '\n' + mind + '}' : '{'
					+ partial.join(',') + '}';
			gap = mind;
			return v;
		}
	}

	$d.json.stringify = function(value, replacer, space) {
		var i;
		gap = '';
		indent = '';

		// If the space parameter is a number, make an indent string containing
		// that
		// many spaces.

		if (typeof space === 'number') {
			for (i = 0; i < space; i += 1) {
				indent += ' ';
			}

			// If the space parameter is a string, it will be used as the indent
			// string.

		}
		else if (typeof space === 'string') {
			indent = space;
		}

		// If there is a replacer, it must be a function or an array.
		// Otherwise, throw an error.

		rep = replacer;
		if (replacer
				&& typeof replacer !== 'function'
				&& (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
			throw new Error('$d.json.stringify');
		}

		// Make a fake root object containing our value under the key of ''.
		// Return the result of stringifying the value.

		return str('', {
			'' : value
		});
	}

	$d.json.parse = function(text, reviver) {
		var j;

		function walk(holder, key) {

			var k, v, value = holder[key];
			if (value && typeof value === 'object') {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = walk(value, k);
						if (v !== undefined) {
							value[k] = v;
						}
						else {
							delete value[k];
						}
					}
				}
			}
			return reviver.call(holder, key, value);
		}
		text = String(text);
		cx.lastIndex = 0;
		if (cx.test(text)) {
			text = text.replace(cx, function(a) {
				return '\\u'
						+ ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			});
		}

		if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

			j = eval('(' + text + ')');

			return typeof reviver === 'function' ? walk({
				'' : j
			}, '') : j;
		}

		throw new SyntaxError('$d.json.parse');
	}

	/**
	 * log를 남기는 Object가 정의되지 않았을 경우
	 */	
	if(!window.console)
	{   
		console = {};
	    console.log = function () {};
	   
	 }
	/**
	 * 함수 Binding
	 * @method Function.prototype.bind
	 * @param bind 대상 Object
	 * @return function
	 */
	if (typeof Function.prototype.bind === "undefined") {
		Function.prototype.bind = function(thisArg) {
			var fn = this, slice = Array.prototype.slice, args = slice.call(
					arguments, 1);
			return function() {
				return fn.apply(thisArg, args.concat(slice.call(arguments)));
			}
		}
	}

	if (typeof Array.prototype.isEmpty === "undefined") {
		Array.prototype.isEmpty = function() {
			if (this.length === 0) {
				return true;
			}
			else {
				return false;
			}
		}
	}
}(window, document));