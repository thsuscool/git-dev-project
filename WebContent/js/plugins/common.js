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