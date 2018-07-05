/**
 * 
 */
(function (W, D) {
	W.$thematicMapMain = W.$thematicMapMain || {};
	
	$(document).ready(function () {
		// thematicMap.html 파라미터 갖고오기
		$thematicMapMain.param = getAllParameter();
		
		// StatthemamappLists 조회
		$thematicMapMain.request.getStatsThemeMapList($thematicMapMain.param);
		$thematicMapMain.request.getAllCategoryAndMenu();
		
		var widthSize = $(window).width();
		if (widthSize > 1260) {
			var value = parseInt(widthSize / 2 - 500);
			if (value < 0) {
				value = 0;
			}
			
			$("#mapNavi2").css("margin-left", value);
			
		}else{
			$("#mapNavi2").css("margin-left", '100px');
		}
		
		// map size
		/*var mapheight = $("body").height();
		$(".map_dummy").css("height", "100%");// mapheight - 195);
		// $(".map_dummy").css("overflow","scroll");
		$("#header").css("margin-bottom", "0px");*/
		
		var mapheight = $("body").height();
		var headheight = $("header").height();
		
		$(".map_dummy").css("height", mapheight-149 + "px");
		$("#header").css("margin-bottom", "0px");
		
		$(window).resize(function () {
			var widthSize = $(window).width();
			var heightSize = $(window).height();
			if (widthSize > 1260) {
				var value = parseInt(widthSize / 2 - 500);
				if (value < 0) {
					value = 0;
				}
				
				$("#mapNavi2").css("margin-left", value);
				
			}else{
				$("#mapNavi2").css("margin-left", '100px');
			}
			$(".map_dummy").css("height", heightSize-149 + "px");
		});
		
		$thematicMapMain.event.setEvent();
		
	});
	
	$thematicMapMain.ui = {
		origin : null,
		getAllMenues : function (obj) {
			var html = "";
			html += "<a href='/html/thematicMap/thematicMapList.html?theme=" + themaInfo.category + "'>" + themaInfo.category_nm + "</a>";
		},
	};
	
	$thematicMapMain.request = {
		getStatsThemeMapList : function (paramObj, searchParam) {
			var requestParam = {
				stat_thema_map_id : paramObj.stat_thema_map_id
			};
			
			$statsPotal.api.thematicMap.getStatsThemeMapListByThematicId({
				param : requestParam,
				method : 'POST',
				success : $thematicMapMain.response.successStatsThemeMapList
			});
		},
		getAllCategoryAndMenu : function () {
			$statsPotal.api.thematicMap.getAllCategoryAndMenu({
				method : 'POST',
				success : $thematicMapMain.response.successAllCategoryAndMenu
			});
		},
		getMenuList : function (thema_map_category){
			$.ajax({
				  type: "POST",
				  url: contextPath + "/ServiceAPI/thematicMap/GetMenuCategoryList.json",
				  async : false,
				  data : {
					  cate_id : thema_map_category						  
				  },
				  success: function(res) {
					$('#subj_list').text(res.result.categoryList[0].category_nm+" 주제도 목록");
					$thematicMapMain.response.setCategoryListHtml(res);			
				
				  },								  
				  dataType: "json",
				  error:function(e){}  
			});			
		}
	};
	$thematicMapMain.response = {
		successStatsThemeMapList : function (status, res) {
			if (res.errCd === 0) {
				var themaInfo = res.result.themeMapInfoList;
				$thematicMapMain.themaInfo = themaInfo;
				$("#thematicOrigin").html(themaInfo.rel_stat_info);
				$("#thematicTitle").html(themaInfo.title);
				$(".themeTooltip").attr("title", themaInfo.exp);
				
				console.log($("#thematicOrigin").html());
				
				// Frame URL 설정
				if ($thematicMapMain.param.mapType == '01') {
					$("#themeticFrame").attr("src", themaInfo.stat_thema_map_file_url + "?stat_thema_map_id=" + themaInfo.stat_thema_map_id + '&stat_disp_level=' + themaInfo.stat_disp_level + '&area_set=' + themaInfo.area_set);
				}
				else if ($thematicMapMain.param.mapType == '02') {
					$("#themeticFrame").attr("src", themaInfo.stat_thema_map_file_url);
				}
				
			}
		},
		
		createInfoTooltip : function(tmp, obj) {
			$(tmp).tooltip({
				position : {my: "left+25 top-10"},
				track: true,
				tooltipClass : "layer_alarm_pop",
				content : function() {
					var html =  "<div class='layer_alarm_pop'>" +
									"<p>" +
										"<font size='2' style='font-weight: bold;'>" + obj + "</font><br>" +
								    "</p>" +
							    "</div>" +
							    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

					return html;
				},
				
				open: function (event, ui) {
			        ui.tooltip.css("max-width", "400px");
			    },
			});
		},
		
		successAllCategoryAndMenu : function (status, res) {
			if (res.errCd == 0) {
				var categories = res.result.cateList;
				for ( var i = 0; i < categories.length; i++) {							
					var html = "<li style='background:url("+categories[i].category_icon_url+");background-size:30px 30px;background-repeat:no-repeat;background-position:left'><a href='javascript:$thematicMapMain.request.getMenuList(\""+categories[i].thema_map_category+"\");' style='margin-left:45px;'>"+categories[i].category_nm+"</a></li>";
					$('.qmIcon04').append(html);
				}
				
				$(".qmdl dd ul>li>a").click(function(){   
					var inx = $(this).parent("li").index();
					var qm = $(this).parents("ul").eq(0).attr("class");
					$(".qmdl dd ul>li").removeClass("on");
					$(this).parent("li").addClass("on");
					$(".totalResult").hide();
					if(qm=="qmIcon04"){
						$(".totalResult.tr0"+parseInt(inx+1)).show();
					}
					$(".sideQuick.sq02").stop().animate({"left":"640px"},200);
					$(".quickBox.step02").stop().animate({"left":"280px"},200); 
				});   
			}
		},
		
		setCategoryListHtml : function(res){
			$('#scrollBox').html("");
			
			var list = res.result.categoryList;
			var html = "<div class='totalResult tr"+list[0].category.substring(6,8)+"'>";
			html += "<div class='stepBox'>";
			html += "<ul id='stepBoxUl' style='width:340px;'>";
			for(var i=0;i<list.length;i++){															
				if(list[i].thema_map_type=="02"){
					html += "<li>"+ '<a id="rd_juger'+i+'" title="" href="/view/thematicMap/thematicMapMainOld?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '" target="_top">'+list[i].title+"</a></li>";
				}else{
					html += "<li>"+'<a id="rd_juger'+i+'" title="" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '" target="_top">' + list[i].title + "</a></li>";															
				}
			}
			html += "</ul></div></div>";
			$('#scrollBox').append(html);
			
			for(var i=0;i<list.length;i++){	
				var dataType = "";
//				// 시도,시군구,읍면동,집계구 설정(공통)
				if(list[i].max_expnsn_level == '01') {
					dataType += '<span class="sp01">시도</span>';
				} else if(list[i].max_expnsn_level == '02') {
					// 2016. 03. 28 j.h.Seok
					dataType += '<span class="sp01">시군구</span>';
				} else if(list[i].max_expnsn_level == '03') {
					dataType += '<span class="sp01">읍면동</span>';
				} else if(list[i].max_expnsn_level == '04'){
					dataType += '<span class="sp01">집계구</span>';
				}
				
				// 주제도 유형 정보
				if(list[i].thema_map_type=='02'){
					// 예전 데이터의 경우 disp_mthd 와 max_expnsn으로 박스표시
					dataType += '<span class="sp02">'+list[i].disp_method+'</span>';	
				}else{
					// theme_map_type이 다른경우 max_expnsn
					if(list[i].thema_map_type == '03'){
						dataType += '<span class="sp02">색상</span>'
					}else if(list[i].thema_map_type == '04'){
						dataType += '<span class="sp02">증감</span>';
					}else if(list[i].thema_map_type == '05'){
						dataType += '<span class="sp02">시계열</span>';
					}else if(list[i].thema_map_type == '06'){
						dataType += '<span class="sp02">분할뷰</span>';
					}			
				}
				
				//데이터 년도
				dataType += '<span class="sp03">'+list[i].year_info+'</span>';					
				$('#rd_juger'+i).attr('title',dataType);
			}
			
			linkTooltip();
		}
	};
	
	$thematicMapMain.event = {
			setEvent : function() {
				linkTooltip();
				$(".sideQuick.sq02").click(function(){ 
					var on = $(this).hasClass("on");
					if(!on){
						$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
						$(".quickBox.step01").stop().animate({"left":"0"},200);
						$(this).find("span").hide();
						$(this).addClass("on").css("width","40px");
					}else{ 
						$thematicMapMain.event.stepCloseAnimate(1); 
						$(this).find("span").show();
						$(this).removeClass("on").css("width","90px");
					} 
				});  
				
				$(".stepClose").click(function(){ 
					$thematicMapMain.event.stepCloseAnimate(parseInt($(this).index(".stepClose")+1)); 
			    }); 
			},
			
			stepCloseAnimate : function(inx) {  
			    var time = 300;
			    var fx = '.quickBox'; 
			    var btn = '.sideQuick.sq02'; 
			    $(fx).queue("step02", function(){ 
			        $(btn).stop().animate({"left":"280px"},time);
			        $(fx+'.step02').animate({"left":"-680px"}, time);       
			    }); 
			    $(fx).queue("step01", function(){
			        $(fx+'.step02').css({"left":"-680px"});
			        $(btn).stop().animate({"left":"0"},time).removeClass("on");
			        $(fx+'.step01').animate({"left":"-280px"}, time);   
			        $(btn).find("span").show();
			        $(btn).css("width","90px");
			        $(".shadow").hide();
			    }); 
			    $(fx).dequeue("step0"+inx);  
			}
			
			
	};
	
	/* window console.log 문제해결 */
	if (!window.console) {
		console = {
			log : function () {
			}
		};
	}
	
	function linkTooltip(){
		$("a, .stepBox label").tooltip({ 
			open: function( event, ui ) {
				$(".ui-tooltip .subj").text($(this).attr("data-subj"));
			},
			position: {
				my: "left+10 top", at: "right top", 
		        using: function( position, feedback ) {
		        	if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
			    		$( this ).css( position ).prepend("<span class='subj'></span>");
			    	}else {
			    		$( this ).css( position ); 
			    	}
		          $( "<div>" )
		            .addClass( feedback.vertical )
		            .addClass( feedback.horizontal )
		            .appendTo( this );
		        }
		    },
			content: function () {
				var title = $(this).attr("title");
				title = title.replace(/&lt;p&gt;/gi, '');
				title = title.replace(/&lt;p&gt;/gi, '');
				title = title.replace(/&lt;/gi, '<');
				title = title.replace(/&gt;/gi, '>');
				title = title.replace(/&quot;/gi, '');
				$(this).attr("title", title); 
		            return $(this).prop('title');
		        },
		});
	}
	
	
}(window, document));
