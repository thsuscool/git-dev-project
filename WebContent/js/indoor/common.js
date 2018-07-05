// Timstamp 만드는 함수
function makeStamp (d) { // Date d
	var y = d.getFullYear(), M = d.getMonth() + 1, D = d.getDate(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), ss = d.getMilliseconds(),

	pad = function (x) {
		x = x + '';
		if (x.length === 1) {
			return '0' + x;
		}
		return x;
	};
	return y + pad(M) + pad(D) + pad(h) + pad(m) + pad(s) + pad(ss);
}


/*	공통 알럿 DIV
 * 	messageAlert.open(제목, 내용, 확인버튼콜백(options), 취소버튼콜백(options))
 */
var messageAlert = {
		open : function (title, message, okFnc, cancelFnc) {
			var alertId = makeRandomThirtySevenDigitString();
			var html = "";
			html += 
			html +="	<div class='popupWrapper' id='wrapper_"+alertId+"'>";
			html +="		<div class='alertPopupWrapper' id='popup_"+alertId+"'>";
			html +="			<div class='alertPopupTitle'>";
			html +="				<div class='myTitleFont'>"+title+"</div>";
			html +="				<div class='myXbtn' id='myXbtn_"+alertId+"'><a href='#'><img src='/img/popup/btn_popupX.png' alt='종료'/></a></div>";
			html +="			</div>";
			html +="			<div class='messageBox'>" + message + "</div>";
			html +="			<div class='btnbox'>";
			html += "				<img src='/img/popup/btn_confirm.png' alt='확인' id='okBtn_"+alertId+"' style='cursor: pointer;' />";
			if(cancelFnc != undefined) {
				html += "				<img src='/img/popup/btn_cancel.png' alt='취소' id='cancelBtn_"+alertId+"' style='cursor: pointer;' />";	
			}
			html +="			</div>";
			html +="		</div>";
			html +="	</div>";
			$("#footer").append(html);
			
			//화면 중앙에 맞추기
			var d = document;
			var h = d.body.clientHeight;
			var y = (window.pageYOffset) ?
		            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
		                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
			$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 50);
			
			
			if(okFnc != undefined) {	//확인 버튼 함수가 있을경우
				$("#okBtn_"+alertId).attr("onclick", "javascript:messageAlert.defaultClose(\""+alertId+"\");" + okFnc);
			} else {
				$("#okBtn_"+alertId).attr("onclick", "javascript:messageAlert.defaultClose(\""+alertId+"\");");
			}
			
			if(cancelFnc != undefined) {	//취소 버튼 함수가 있을경우
				$("#cancelBtn_"+alertId).attr("onclick", "javascript:messageAlert.defaultClose(\""+alertId+"\");" + cancelFnc);
			} else {
				$("#okBtn_"+alertId).attr("onclick", "javascript:messageAlert.defaultClose(\""+alertId+"\");");
			}
			
			$("#myXbtn_"+alertId).attr("onclick", "javascript:messageAlert.defaultClose(\""+alertId+"\");");
		},
		
		defaultClose : function (alertId) {
			$("#wrapper_"+alertId).remove(); 
		},
};


//37자리 아이디 생성 (Random10 + yyyyMMddHHmmssSSS + Random10)
function makeRandomThirtySevenDigitString () {
	var front = makeRandomDigitString(10);
	var currentdate = new Date();
	var timestamp = makeStamp(currentdate);
	var end = makeRandomDigitString(10);
	
	return front + timestamp + end;
}

function makeRandomDigitString (x) {
	var s = "";
	while (s.length < x && x > 0) {
		var r = Math.random();
		s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
	}
	return s;
}



function JSONtoString (object) {
	var results = [];
	for ( var property in object) {
		var value = object[property];
		if (value)
			results.push(property.toString() + ': ' + value);
	}
	
	return '{' + results.join(', ') + '}';
}


function getAllParameter () {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for ( var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		// If first entry with this name
		if (typeof query_string[pair[0]] === 'undefined') {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		}
		else if (typeof query_string[pair[0]] === 'string') {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		}
		else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
}

function JSONtoString (object) {
	var results = [];
	for ( var property in object) {
		var value = object[property];
		if (value)
			results.push(property.toString() + ': ' + value);
	}
	
	return '{' + results.join(', ') + '}';
}


/* 셀렉트박스 */
(function($) {
	$(window).bind('resize.nui-selectbox-hide', function() {
		$('.nui-selectbox-on').click();
	});

	$.getUUID = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

	$.fn.selectbox = function(options) {
		var settings = {
                default_prefix: 'SelectBasic',

                select_suffix: '_selectArea',
                option_suffix: '_optionsDiv',
                reverse_suffix: '_reverse',

                reset_class: 'SelectResetStyle',
                disabled_class: 'SelectDisable',

                container: '',
                reverse: false,

				uuid_prefix: 'nui-selectbox-',

                animation: 'show', // show, fadeIn
                duration: 0
            },
		    helper = {
                mergeClassName: function(name, suffix) {
                    var arr = name.split(' '),
                        result = '';
                    $.each(arr, function(i, value) {
                        result += (value || settings.default_prefix) + suffix + ' ';
                    });
                    return $.trim(result);
                },
                getSelectCSS: function(sel) {
                    var $sel = $(sel),
                        result = {}, 
                        style = ['position', 'left', 'right', 'top', 'bottom', 'width', 'visibility', 'float', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'vertical-align', 'z-index'],
                        i,
                        max;

                    for (i = 0, max = style.length; i < max; i++) {
                        result[style[i]] = $sel.css(style[i]);
                    }
                    result.display = 'inline-block';
                    return result;
                }
            };

		return this.each(function() {
			var $this = $(this),
				uuid,
                sel_class,
                opt_class,
                sel_reverse_class,
                opt_reverse_class,
                sel_val,
                sel_css,
                $sel_a,
                $sel;

            if (this.tagName.toUpperCase() !== 'SELECT' || $this.data('nui-selectbox-complete')) return;

			uuid = settings.uuid_prefix + $.getUUID();

            sel_class = helper.mergeClassName(this.className, settings.select_suffix);
            opt_class = helper.mergeClassName(this.className, settings.option_suffix);

            sel_reverse_class = helper.mergeClassName(this.className, settings.select_suffix + settings.reverse_suffix);
            opt_reverse_class = helper.mergeClassName(this.className, settings.option_suffix + settings.reverse_suffix);

            sel_val = $this.find('option:selected').text();
            $sel_a = $('<a href="#"></a>').html(sel_val);

            sel_css = helper.getSelectCSS(this);

            $sel = $('<span></span>')
						.attr('id', uuid)
                        .addClass(settings.reset_class)
                        .css(sel_css)
                        .addClass(sel_class)
                        .append($sel_a)
                        .insertBefore(this);

			if ($this.attr('disabled')) {
				$sel.addClass(settings.disabled_class);
			}

            $sel.bind('click.nui-selectbox-click', function(e) {
                var $opt,
                    sel_pos,
                    opt_height,
                    opt_outer_height,
                    sel_total_height,
                    opt_max_height,
                    con_height,
					isDisabled = $sel.is('.' + settings.disabled_class);
                
				if ($sel.is('.nui-selectbox-on') && !isDisabled) {
                    $opt = $('.nui-selectbox-select').remove();
                    $opt = null;
                    $sel.removeClass('nui-selectbox-on');
                } else if (!isDisabled) {
					$(window).trigger('resize.nui-selectbox-hide');

                    $opt = $('<div></div>')
                                .css({ width: sel_css.width, position: 'absolute' })
                                .addClass('nui-selectbox-select')
                                .addClass(opt_class)
                                .append('<p></p>')
                                .appendTo(document.body);

                    $this.find('option').each(function(i) {
                        var option_class = this.className;
                        $('<a href="#"></a>')
                            .data('nui-selectbox-optionid', i.toString())
                            .addClass(option_class)
                            .html($(this).text())
                            .appendTo($opt.find('p'));
                    });
                    
                    sel_pos = $sel.offset();
                    opt_height = $opt.height();
                    opt_outer_height = $opt.outerHeight(true);
                    sel_total_height = sel_pos.top + opt_outer_height;
                    opt_max_height = parseInt($opt.css('max-height'), 10)

                    if (opt_max_height  > 0 && opt_height > opt_max_height) {
                        $opt.css({
                            'max-height': 'none !important',
                            'height': opt_max_height + 'px !important',
                            'overflow-y': 'auto !important'
                        });

                        opt_height = $opt.height();
                        opt_outer_height = $opt.outerHeight(true);
                        sel_total_height = sel_pos.top + opt_outer_height;
                    }

                    if (settings.container !== '') {
                        con_height = typeof settings.container === 'number' ? settings.container : $(settings.container).height();
                        if (sel_total_height > con_height) {
                            sel_pos.top -= opt_outer_height;
                            $opt.addClass(opt_reverse_class);
                            settings.reverse = true;
                        }
                    }

                    $opt.find('a')
                        .one('click.nui-selectbox-option', function(e) {
                            var $opt_a = $(this);

                            $sel_a.html($opt_a.html());
							$this.attr('selectedIndex', $opt_a.data('nui-selectbox-optionid'))
								 .find('option').attr('selected', null)
								 .eq($opt_a.data('nui-selectbox-optionid')).attr('selected', 'selected');
							$sel.click();
							$this.trigger('change');
							e.preventDefault();
                        })
                        .end()
                        [settings.animation](settings.duration)
                        .css({left: sel_pos.left, top: sel_pos.top+40});

                    $sel.addClass('nui-selectbox-on'); 
                    if (settings.reverse) {
                        $sel.addClass('nui-selectbox-onreverse');
                    }
                }
                e.preventDefault();
            });
            
            $this.bind({
				hide: function(e) {
					$('#' + $(this).data('nui-selectbox-id')).hide();
					$(window).trigger('resize.nui-selectbox-hide');
				},
				show: function(e) {
					$('#' + $(this).data('nui-selectbox-id')).show();
				},
				toggle: function(e) {
					$('#' + $(this).data('nui-selectbox-id')).toggle();
					$(window).trigger('resize.nui-selectbox-hide');
				},
				enable: function(e) {
					$(this).attr('disabled', null);
					$('#' + $(this).data('nui-selectbox-id')).removeClass(settings.disabled_class);
				},
				disable: function(e) {
					$(window).trigger('resize.nui-selectbox-hide');
					$(this).attr('disabled', 'disabled');
					$('#' + $(this).data('nui-selectbox-id')).addClass(settings.disabled_class);
				}
			})
			.data({
				'nui-selectbox-complete': true,
				'nui-selectbox-id': uuid
			})
			.css({
				visibility: 'hidden',
				position: 'absolute',
				left: -5000,
				top: -5000
			});
		});
	};
})(jQuery);