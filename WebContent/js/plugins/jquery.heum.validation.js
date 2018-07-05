/**
 * version : 5.0
 * developer : kwangheum
 * email : myrkh1213@gmail.com
 * hompage : http://kwangheum.blogspot.kr
*/
(function($, window, document) {
	var pluginName = "heumValidation", 
	defaults = {visibleOnly:false,autoValidation:true,isReturnCallback:false};
	/**
	 * data-null : true,false
	 * data-min-length : int
	 * data-max-length : int
	 * data-number : true,false
	 * data-email : true,false
	 * data-phone : true,false
	 * data-url :  true,false
	 * data-pattern : String
	 */
	function Plugin(element, options, callback) {
		this.element = element;
		if(typeof options === "function"){
			this.options = defaults;
			callback = options;
		}else{
			this.options = $.extend({}, defaults, options);
		}
		this._defaults = defaults;
		this._name = pluginName;
		this.init(callback);
	}
	Plugin.prototype = {
		init : function(callback) {
			var defaults = this.defaults,element = $(this.element),options = this.options,target = this;
			if($(element).is("form")){
				options = options||{};
				var error = new Array();
				$(element).submit(function(){
					error = validation(target);
					if(typeof callback === "function"){
						if(options.isReturnCallback){
							return callback(error);
						}else{
							callback(error);
						}
					}
					if(error.length>0||!options.autoValidation){
						return false;
					}
				});
			}else{
				console.error("해당 요소는 'form' 요소가 아닙니다.");
			}
		}
	};
	$.fn[pluginName] = function(options,callback) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this,options,callback));
			} else {
				$.fn.extend({
					reset : function(){
						return false;
					}
				});
			}
		});
	};
	/**
	 * @description 검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validation(target){
		var error = new Array();
		addError(error,validationNull(target));
		addError(error,validationMinLength(target));
		addError(error,validationMaxLength(target));
		addError(error,validationNumber(target));
		addError(error,validationEmail(target));
		addError(error,validationPhone(target));
		addError(error,validationUrl(target));
		addError(error,validationPattern(target));
		return error;
	}
	/**
	 * @description error 배열에 요소 담기
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param element
	 */
	function addError(errorArray,errors){
		if(errors.length>0){
			$.each(errors,function(cnt,node){
				errorArray.push(node);
			});
		}
	}
	/**
	 * @description 빈값인지의 유무
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param element
	 */
	function nullCheck(element){
		var dataNull = false;
		if($(element).attr("type")=="checkbox"||$(element).attr("type")=="radio"){
			if($(element).attr("name")!=undefined&&$(element).attr("name").replace(/ /gi,"")!=""){
				dataNull = $("input[name="+$(element).attr("name")+"]:checked").size()>0;
			}
		}else{
			dataNull = ($(element).val().replace(/ /gi,"")!="");
		}
		return dataNull;
	}
	/**
	 * @description 빈값 검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationNull(target){
		var error = new Array();
		$(target.element).find("[data-null]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&(($(node).data("null")!=undefined&&!$(node).data("null"))||$(node).data("null")=="false")){
				if(!nullCheck(node)){
					var title="";
					var nullPoint = ($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')=='');;
					if(nullPoint){
						if($(node).attr("type")=="file"){
							title="파일을 첨부해주세요";
						}else if($(node).attr("type")=="checkbox"||$(node).attr("type")=="radio"){
							title="값을 선택해주세요";
						}else{
							title=" 입력해 주시기 바랍니다";
						}
					}else{
						title = $(node).data("message");
					}
					error.push({
						element : node,
						message : title
					});
				}
			}
		});
		return error;
	}
	/**
	 * @description 최소길이 검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationMinLength(target){
		var error = new Array();
		$(target.element).find("[data-min-length]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&($(node).attr("multiple")==undefined)){
				if(nullCheck(node)){
					var minLength = parseInt($(node).data("min-length"));
					var dataLength = 0;
					var title = "";
					if($(node).attr("type")=="file"){
						dataLength = $("input[type=file]").val().replace("C:\\fakepath\\","").length;
						if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
							title = "파일명의 길이가 짧습니다. 최소 "+minLength+"글자 이상인 파일명을 올려주세요";
						}else{
							title = $(node).data("message");
						}
					}else if($(node).attr("type")=="checkbox"){
						dataLength = $("input[name="+$(node).attr("name")+"]:checked").length;
						if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
							title = "최소 "+minLength+"개를 선택해 주세요";
						}else{
							title = $(node).data("message");
						}
					}else{
						dataLength = $(node).val().length;
						if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
							title = "값의 길이가 짧습니다. 최소 "+minLength+"글자 이상인 값을 작성해주세요";
						}else{
							title = $(node).data("message");
						}
					}
					if(dataLength<minLength){
						error.push({
							element : node,
							message : title
						});
					}
				}
			}
		});
		return error;
	}
	/**
	 * @description 최대 길이 검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationMaxLength(target){
		var error = new Array();
		$(target.element).find("[data-max-length]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&($(node).attr("multiple")==undefined)){
				if(nullCheck(node)){
					var maxLength = parseInt($(node).data("max-length"));
					var dataLength = 0;
					var title = "";
					if($(node).attr("type")=="file"){
						dataLength = $("input[type=file]").val().replace("C:\\fakepath\\","").length;
						if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
							title = "파일명의 길이가 깁니다. 최대 "+maxLength+"글자 이하인 파일을 올려주세요";
						}else{
							title = $(node).data("message");
						}
					}else if($(node).attr("type")=="checkbox"){
						dataLength = $("input[name="+$(node).attr("name")+"]:checked").length;
						if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
							title = "최대 "+maxLength+"개를 선택해 주세요";
						}else{
							title = $(node).data("message");
						}
					}else{
						dataLength = $(node).val().length;
						if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
							title = "값의 길이가 깁니다. 최대 "+maxLength+"글자 이하인 값을 작성해주세요";
						}else{
							title = $(node).data("message");
						}
					}
					if(dataLength>maxLength){
						error.push({
							element : node,
							message : title
						});
					}
				}
			}
		});
		return error;
	}
	/**
	 * @description 숫자 검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationNumber(target){
		var error = new Array();
		$(target.element).find("[data-number=true]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&nullCheck(node)){
				var regex = /[0-9]/;
				if(!regex.test($(node).val())){
					var title="";
					if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
						title = "숫자만 입력해주세요";
					}else{
						title = $(node).data("message");
					}
					error.push({
						element : node,
						message : title
					});
				}
			}
		});
		return error;
	}
	/**
	 * @description 이메일 검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationEmail(target){
		var error = new Array();
		$(target.element).find("[data-email=true]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&nullCheck(node)){
				var regex = /^([-0-9a-zA-Z\\.\\_\\-]+)@([a-zA-Z][-0-9a-zA-Z]+[.]){1,}([a-zA-Z]+)$/;
				var title="";
				if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
					title = "정확한 이메일을 작성해주세요";
				}else{
					title = $(node).data("message");
				}
				if(!regex.test($(node).val())){
					error.push({
						element : node,
						message : title
					});
				}
			}
		});
		return error;
	}
	/**
	 * @description 연락처 검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationPhone(target){
		var error = new Array();
		$(target.element).find("[data-phone=true]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&nullCheck(node)){
				var regex = /^[0-9-+]+$/;
				if(!regex.test($(node).val())){
					var mobileRegExp = /^(01[016789])-?\d{3,4}-?\d{4}$/;
					var phoneRegExp = /^(070|02|031|032|033|041|042|043|051|052|053|054|055|061|062|063|064)-?\d{3,4}-?\d{4}$/;
					var title="";
					if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
						title = "정확한 연락처를 작성해주세요";
					}else{
						title = $(node).data("message");
					}
					if(!(mobileRegExp.test(elementValue)||phoneRegExp.test(elementValue))){
						error.push({
							element : node,
							message : title
						});
					}
				}
			}
		});
		return error;
	}
	/**
	 * @description url검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationUrl(target){
		var error = new Array();
		$(target.element).find("[data-url=true]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&nullCheck(node)){
				var regex = /^(http(s?)):\/\/(.*)/;
				var title="";
				if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
					title = "정확한 홈페이지 주소를 작성해주세요";
				}else{
					title = $(node).data("message");
				}
				if(!regex.test($(node).val())){
					error.push({
						element : node,
						message : title
					});
				}
			}
		});
		return error;
	}
	/**
	 * @description 패턴검증
	 * @date 2016. 1. 2.
	 * @author kwangheum
	 * @param target
	 */
	function validationPattern(target){
		var error = new Array();
		$(target.element).find("[data-pattern]").each(function(cnt,node){
			var visible = true;
			if(target.options.visibleOnly){
				visible = $(node).is(":visible");
			}
			if(visible&&nullCheck(node)){
				var regex = new RegExp($(node).data("pattern"));
				if(!regex.test($(node).val())){
					var title="";
					if($(node).data("message")==undefined||$(node).data("message").replace(/ /gi,'')==''){
						title = "입력할 수 없습니다";
					}else{
						title = $(node).data("message");
					}
					error.push({
						element : node,
						message : title
					});
				}
			}
		});
		return error;
	}
})(jQuery, window, document);