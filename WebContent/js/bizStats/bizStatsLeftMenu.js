/**
 * 생활업종 통계지도 Left 메뉴(조회조건)에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/03  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$bizStatsLeftMenu = W.$bizStatsLeftMenu || {};
	
	$(document).ready(function() {
		$bizStatsLeftMenu.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$bizStatsLeftMenu.ui.commonDataList();		//공공데이터, 나의데이터 목록
		
		$.cssHooks.backgroundColor = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["backgroundColor"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("background-color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
		
		$.cssHooks.color = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["color"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
		
		//mng_s
		var sel_val_before = $("#select_job_best_from").val();
		var sel_val = "";
		$("#select_job_best_from").change(
				function() {
					sel_val = $("#select_job_best_from").val();
					
					var from = "";
					if(sel_val == 20161) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
					} else if(sel_val == 20162) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
					} else if(sel_val == 20163) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
					} else if(sel_val == 20164) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
					} else if(sel_val == 20171) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
					} else if(sel_val == 20172) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
					} else if(sel_val == 20173) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
					} else if(sel_val == 20174) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20171001'>2017년 10월 1일";
					}
					
					if(  $("#select_job_best_from").val() - $("#select_job_best_to").val() > 0 ) {
						
						$("#select_job_best_from").val(sel_val_before); //시작의 경우 첫번째 값으로 세팅한다.
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
						messageAlert.open("알림", "시작 기간은 종료 기간보다 클 수 없습니다.");
						$("#job_best_from").html(from);
						$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
						return false;
					}
					
					
					$("#job_best_from").html(from); 
					
					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
					
				}
		).change();
		
		var sel_val_before2 = $("#select_job_best_to").val();
		var sel_val2 = "";
		$("#select_job_best_to").change(
				function() {
					sel_val2 = $("#select_job_best_to").val();
					
					var to = "";
					if(sel_val2 == 20161) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
					} else if(sel_val2 == 20162) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
					} else if(sel_val2 == 20163) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
					} else if(sel_val2 == 20164) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
					} else if(sel_val2 == 20171) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
					} else if(sel_val2 == 20172) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
					} else if(sel_val2 == 20173) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
					} else if(sel_val2 == 20174) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20171231'>2017년 12월 31일<br>";
					} else if(sel_val2 == 20181) {
						// mng_s 20180419_김건민
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20180331'>2018년 03월 31일<br>";
						// mng_e 20180419_김건민
					}
					
					if(  $("#select_job_best_from").val() - $("#select_job_best_to").val() > 0 ) {
						$("#select_job_best_to").val(sel_val_before2); //종료의 경우 맨 마지막 값으로 세팅한다.
						// mng_s 20180419_김건민
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20180331'>2018년 03월 31일<br>"; //종료의 경우 맨 마지막 값으로 세팅한다.
						// mng_e 20180419_김건민
						messageAlert.open("알림", "종료 기간은 시작 기간보다 작을 수 없습니다.");
						$("#job_best_to").html(to);
						$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
						return false;
					}
					
					$("#job_best_to").html(to);
					
					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
				}
		).change();
		
		//mng_s
		var tmpValues = null;
		$("#slider-range_job_best").slider({
			orientation: "vertical",
			range: true,
			//min:0,
			max:70, //데이터 추가될 경우 각 분기별로 10씩 더하면 된다.
			values: [0, 70],
			step:10, //값은 10단위로 변경 되므로 이 값은 앞으로 변경할 필요 없을 것같다.
			slide: function(event, ui){
				console.log("[bizStatsLeftMenu.js] ui.values[1] [" + ui.values[1]);
				//슬라이더의 아랫쪽게 ui.values[0] 이다.
				var from = "";
				if(ui.values[1] == 110) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
				} else if(ui.values[1] == 100) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
				} else if(ui.values[1] == 90) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
				} else if(ui.values[1] == 80) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
				} else if(ui.values[1] == 70) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
				} else if(ui.values[1] == 60) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
				} else if(ui.values[1] == 50) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
				} else if(ui.values[1] == 40) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
				} else if(ui.values[1] == 30) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
				} else if(ui.values[1] == 20) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
				} else if(ui.values[1] == 10) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
				} else if(ui.values[1] == 0) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20171001'>2017년 10월 1일";
				}
				var to = "";
				if(ui.values[0] == 110) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150101'>2015년 1월 1일<br>";
				} else if(ui.values[0] == 100) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
				} else if(ui.values[0] == 90) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
				} else if(ui.values[0] == 80) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
				} else if(ui.values[0] == 70) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
				} else if(ui.values[0] == 60) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
				} else if(ui.values[0] == 50) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
				} else if(ui.values[0] == 40) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
				} else if(ui.values[0] == 30) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
				} else if(ui.values[0] == 20) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
				} else if(ui.values[0] == 10) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
				} else if(ui.values[0] == 0) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
				}
				
				
				$("#job_best_from").html(from); 
				$("#job_best_to").html(to);
				
				$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
				$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
				
			},
			start : function(e, ui) {
	        	tmpValues = ui.values;
	        },
	        stop : function(e, ui) {
        		if (ui.values[0] == ui.values[1]) { //슬라이더의 값이 같을 경우 한 단계 튕겨낸다.
        			if (tmpValues[0] != ui.values[0]) {
        				$("#slider-range_job_best").slider("values", 0, ui.values[1]-10);
        				
        				//슬라이더의 아랫쪽게 ui.values[0] 이다.
    					var from = "";
    					if(ui.values[1] == 110) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
    					} else if(ui.values[1] == 100) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
    					} else if(ui.values[1] == 90) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
    					} else if(ui.values[1] == 80) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
    					} else if(ui.values[1] == 70) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
    					} else if(ui.values[1] == 60) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
    					} else if(ui.values[1] == 50) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
    					} else if(ui.values[1] == 40) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
    					} else if(ui.values[1] == 30) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
    					} else if(ui.values[1] == 20) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
    					} else if(ui.values[1] == 10) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
    					} else if(ui.values[1] == 0) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20171001'>2017년 10월 1일";
    					}
    					var to = "";
    					if(ui.values[0] == 110) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
    					} else if(ui.values[0] == 100) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
    					} else if(ui.values[0] == 90) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
    					} else if(ui.values[0] == 80) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
    					} else if(ui.values[0] == 70) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
    					} else if(ui.values[0] == 60) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
    					} else if(ui.values[0] == 50) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
    					} else if(ui.values[0] == 40) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
    					} else if(ui.values[0] == 30) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
    					} else if(ui.values[0] == 20) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
    					} else if(ui.values[0] == 10) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
    					}
        				
    					
    					
    					$("#job_best_from").html(from); 
    					$("#job_best_to").html(to);
    					
    					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
    					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
        				
        			}else {
        				$("#slider-range_job_best").slider("values", 1, ui.values[0]+10);
        				
        				//슬라이더의 아랫쪽게 ui.values[0] 이다.
        				//상단의 슬라이더를 움직여서 같은 값이 됐을 경우 상단의 슬라이더를 밀어내고 input type 값도 한단계 밀어낸다.
    					var from = "";
    					if(ui.values[1] == 100) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
    					} else if(ui.values[1] == 90) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
    					} else if(ui.values[1] == 80) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
    					} else if(ui.values[1] == 70) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
    					} else if(ui.values[1] == 60) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
    					} else if(ui.values[1] == 50) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
    					} else if(ui.values[1] == 40) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
    					} else if(ui.values[1] == 30) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
    					} else if(ui.values[1] == 20) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
    					} else if(ui.values[1] == 10) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
    					} else if(ui.values[1] == 0) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
    					}
    					
    					var to = "";
    					if(ui.values[0] == 110) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150101'>2015년 1월 1일<br>";
    					} else if(ui.values[0] == 100) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
    					} else if(ui.values[0] == 90) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
    					} else if(ui.values[0] == 80) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
    					} else if(ui.values[0] == 70) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
    					} else if(ui.values[0] == 60) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
    					} else if(ui.values[0] == 50) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
    					} else if(ui.values[0] == 40) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
    					} else if(ui.values[0] == 30) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
    					} else if(ui.values[0] == 20) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
    					} else if(ui.values[0] == 10) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
    					} else if(ui.values[0] == 0) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
    					}
    					
    					
    					$("#job_best_from").html(from); 
    					$("#job_best_to").html(to);
    					
    					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
    					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
        				
        			}
	        	} else { //슬라이더 값이 겹치지 않았을 경우
	        		//슬라이더의 아랫쪽게 ui.values[0] 이다.
	        		var from = "";
					if(ui.values[1] == 110) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
					} else if(ui.values[1] == 100) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
					} else if(ui.values[1] == 90) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
					} else if(ui.values[1] == 80) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
					} else if(ui.values[1] == 70) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
					} else if(ui.values[1] == 60) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
					} else if(ui.values[1] == 50) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
					} else if(ui.values[1] == 40) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
					} else if(ui.values[1] == 30) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
					} else if(ui.values[1] == 20) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
					} else if(ui.values[1] == 10) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
					} else if(ui.values[1] == 0) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20171001'>2017년 10월 1일";
					}
					var to = "";
					if(ui.values[0] == 110) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150101'>2015년 1월 1일<br>";
					} else if(ui.values[0] == 100) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
					} else if(ui.values[0] == 90) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
					} else if(ui.values[0] == 80) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
					} else if(ui.values[0] == 70) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
					} else if(ui.values[0] == 60) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
					} else if(ui.values[0] == 50) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
					} else if(ui.values[0] == 40) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
					} else if(ui.values[0] == 30) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
					} else if(ui.values[0] == 20) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
					} else if(ui.values[0] == 10) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
					} else if(ui.values[0] == 0) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
					}
					
					
					$("#job_best_from").html(from); 
					$("#job_best_to").html(to);
					
					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
	        	}
	        }
		});
		
		$("#slider-range_job_best a").first().css("background-image","url(/img/im/slider_handle.png)");
		console.log("========================= [bizStatsLeftMenu.js] ===========================");
		
		//mng_e
		
		
	});
	
	$bizStatsLeftMenu.ui = {
			searchbtnCnt : 0, // 버튼생성 카운트
			curSelectedStatsType : null, // 현재 선택된 통계분류(Intro, 업종별 지역현황 등)
			arParamList : [], // 생성된 조회버튼에 매칭된 파라미터 정보배열
			mapColor : ["#0478cb", "#9ED563", "#FF0066"],		//지도 별 고유 색상
			curSearchBtnArray : { "one":"", "two":"", "three":"" },	//지도를 조회한 버튼 아이디
			curSelectedCompany : "food",		//사업체 업종선택
			jobBestSido : "", //mng_s 업종별 뜨는 지역 관심지역 시도==>데이터보드에 보여줄 변수
			jobBestSgg : "",  //mng_s 업종별 뜨는 지역 관심지역 시군구==>데이터보드에 보여줄 변수
			job_best_from_reload_val : "", //mng_s
			job_best_to_reload_val : "", //mng_s
			job_best_from_poi : "", //mng_s
			job_best_to_poi : "", //mng_s
			job_best_themeCd : "", //mng_s
			
			/**
			 * 
			 * @name         : doIntro
			 * @description  : 인트로서비스를 보여준다.
			 * @date         : 2015. 11. 03.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSidoIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$bizStatsMap.ui.doSidoIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doCompanySidoIntro
			 * @description  : 업종별 지역현황 정보를 보여준다.
			 * @date         : 2015. 11. 03.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanySidoIntro : function () {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$bizStatsMap.ui.doCompanySidoIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doCompanyDensityIntro
			 * @description  : 업종밀집도 정보를 보여준다.
			 * @date         : 2016. 06. 10.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanyDensityIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				setTimeout(function() {
					$bizStatsMap.ui.doCompanyDensityIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doCompanyOpenIntro
			 * @description  : 지자체 인허가
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 */
			doCompanyOpenIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() mapId [" + mapId);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() map [" + map);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
				
				
				setTimeout(function() {
					$bizStatsMap.ui.doCompanyOpenIntro();
				}, 300);
			
			},
			
			/**
			 * 
			 * @name         : doCompanyBestIntro
			 * @description  : 업종별 뜨는 지역
			 * @date         : 
			 * @author	     : 
			 * @history 	 : mng_s
			 */
			doCompanyBestIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() mapId [" + mapId);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() map [" + map);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
				
				
				setTimeout(function() {
					$bizStatsMap.ui.doCompanyBestIntro();
				}, 300);
			
			},
			
			//mng_s
			/**
			 * @name              : getSidoList
			 * @description       : 시도리스트
			 * @date              : 2015. 12. 09. 
			 * @author            : 나광흠
			 * @history           :
			 * @param type        : 'inter-recommend' 관심지역
			 * @param defaultSido : 처음 셋팅해줄 시도 코드
			 * @param defaultSgg  : 처음 셋팅해줄 시군구 코드
			 * @param callback    : callback
			 */
			getSidoList: function(type,defaultSido,defaultSgg,callback) {
				$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",true);
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
					data: {
						base_year: $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].bnd_year
					},
					dataType: "json",
					success: function(res) {
						$("#"+type+"-sido-select").empty();
						if(res.errCd=="0"){
							$("#"+type+"-sido-select").append($("<option/>",{text:"전국",value:"00",selected:(defaultSido=="00"),"data-coor-x":"990480.875","data-coor-y":"1815839.375"}));
							$.each(res.result.sidoList,function(cnt,node){
								if(defaultSido==node.sido_cd){
									$bizStatsLeftMenu.ui.getSggList(type,node.sido_cd,defaultSgg,callback);
								}
								$("#"+type+"-sido-select").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
							//if(!$bizStatsMap.ui.hasText(defaultSido)||defaultSido=="00"){
							if(defaultSido=="00"){
								$bizStatsLeftMenu.ui.getSggList(type,"00",defaultSgg,callback);
							}
						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$bizStatsLeftMenu.ui.getSidoList(type,defaultSido,defaultSgg,callback);
							});
						}
						$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
					},
					error: function(e) {
						$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
					}
				});
			},
			
			/**
			 * @name             : getSggList
			 * @description      : 시군구리스트
			 * @date             : 2015. 12. 09. 
			 * @author           : 나광흠
			 * @history          :
			 * @param type       : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역 
			 * @param sido_cd    : 시도 코드
			 * @param defaultSgg : 처음 셋팅해줄 시군구 코드
			 * @param callback   : callback
			 */
			getSggList: function(type,sido_cd,defaultSgg,callback) {
				$("#"+type+"-sgg-select").prop("disabled",true);
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
					data: {
						sido_cd: sido_cd,
						base_year: $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].bnd_year
					},
					dataType: "json",
					success: function(res) {
						$("#"+type+"-sgg-select").empty();
						if(res.errCd=="0"){
							$("#"+type+"-sgg-select").append($("<option/>",{text:"전체",value:"999","data-coor-x":"990480.875","data-coor-y":"1815839.375"}));
							/*
							if(defaultSgg==="999"){
								$bizStatsLeftMenu.getStandardAreaList(sido_cd,"999");
							}
							*/
							$.each(res.result.sggList,function(cnt,node){
								//if(type=="stand-recommend"&&defaultSgg==node.sgg_cd){
								//	$bizStatsLeftMenu.getStandardAreaList(sido_cd,node.sgg_cd);
								//}
								$("#"+type+"-sgg-select").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$bizStatsLeftMenu.ui.getSggList(type,sido_cd,defaultSgg);
							});
						}
						$("#"+type+"-sgg-select").prop("disabled",false);
						//$bizStatsLeftMenu.setSubmitTooltipContent();
						if(typeof callback === "function"){
							callback();
						}
					},
					error: function(e) {
						$("#"+type+"-sgg-select").prop("disabled",false);
						//$bizStatsLeftMenu.setSubmitTooltipContent();
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doNormalMapInit
			 * @description  : 지도를 노말지도로 초기화한다.
			 * @date         : 2015. 11. 05.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doNormalMapInit : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				setTimeout(function() {
					$bizStatsMap.ui.doNormalMapInit();
				}, 300);
			},

			/**
			 * 
			 * @name         : addSearchBtn
			 * @description  : 조건검색버튼을 생성한다.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			addSearchBtn : function() {
				//조회버튼은 최대 10개만 가능
				if(this.btnLimitCnt()) {
					//일반 버튼일 경우 파라미터 유효성 검사
					if(this.btnValidationCheck(this.curSelectedStatsType)) {
						var api_id = this.setParams(this.curSelectedStatsType);
						this.createSearchBtn(api_id); // 버튼생성
						this.searchbtnCnt++;
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
					}
				}
			},
			
			/**
			 * 
			 * @name         : btnLimitCnt
			 * @description  : 버튼갯수 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			btnLimitCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
				if(cnt > 9) {
					messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
					return false;
				}
				return true;
			},
			
			/**
			 * 
			 * @name         : getBtnCnt
			 * @description  : 버튼갯수 
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			getBtnCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
			},
			
			/**
			 * 
			 * @name         : createSearchBtn
			 * @description  : 조건버튼을 실제로 생성한다.(버튼 타이틀생성/버튼생성)
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			createSearchBtn : function(curSelectedStatsType) {
				// 버튼타이틀생성
				var btnTitle = null;
				var unit = null;
				var showData = null;
				
				//통계버튼 보이기
				var sq03 = $(".sideQuick.sq03");
				if(!sq03.hasClass("on")){
					$(".sideQuick.sq03").click();
				}

				console.log("~~~~~~~~~~~~this.arParamList")
				console.log(this.arParamList)
				
				
				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == this.searchbtnCnt) {
						var names = this.arParamList[i].names;
						if (Object.prototype.toString.call(names) === "[object Array]") {
							btnTitle = names.join(" + ");
						}else {
							btnTitle = names;
						}
						unit = this.arParamList[i].unit;
						showData = this.arParamList[i].filterParam;
						this.arParamList[i]["title"] = btnTitle;
						break;
					}
				}
				
				//타이틀
				var tmpTitle = btnTitle + " ("+ unit +")";
				
				//버튼생성
				var html = "<li class='dragItem' id='dragItem_"+this.searchbtnCnt+"'>" +
									"<a href='javascript:void(0)' id='"+this.curSelectedStatsType + "-" + this.searchbtnCnt+"' class='ellipsis drag on' title='"+tmpTitle+"'>" +
										"<div class='text'>"+tmpTitle+"</div>" +
									"</a>" +
									"<a href='javascript:$bizStatsLeftMenu.ui.deleteSearchBtn("+this.searchbtnCnt+");' class='sqdel'><img src='/img/um/btn_closel01.png' alt='삭제' /></a>" +
								"</li>";
				$("#searchBtnResultRgn ul").prepend(html);
				
				//버튼 드래그설정
				$(".dragItem").draggable({ 
					revert : "invalid",
					helper : "clone",
					cursor : "pointer",
					zIndex : 100,
					cursorAt : {left : -5},
					appendTo : "body",
					start : function(e, ui) {
					},
					drag : function(e, ui) {
						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
					},
					stop : function(e, ui) {
						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
					}
				});
				
				//조건버튼 드래그, 더블클릭 설정
				this.searchModeSetting();
				
				//버튼 카운트
				this.getBtnCnt();
			},
			
			/**
			 * 
			 * @name         : searchModeSetting
			 * @description  : 조건버튼 드래그, 더블클릭 설정. 
			 * @date         : 2015. 11. 10.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type : drag, doubleClick
			 */
			searchModeSetting : function(type) {
				$(".dragItem").draggable( "enable" );	//드랍 허용
				$(".ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled").css({"opacity":1});	//disabled일때 흐려짐현상 없앰
				//더블클릭 이벤트
				$(".dragItem").dblclick(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var index = id.split("-")[1];
					var tmpParam = "";
					for(var i = 0; i < $bizStatsLeftMenu.ui.arParamList.length; i ++) {
						if($bizStatsLeftMenu.ui.arParamList[i].idx == index) {
							tmpParam = $bizStatsLeftMenu.ui.arParamList[i];
						}
					}
					// 더블클릭 시, 콜백 호출
					$bizStatsMap.callbackFunc.didMapDoubleClick(id, tmpParam);
				});
				
				//원클릭 이벤트	/*2016-03-17 수정*/
				//9월 서비스
				/*$(".dragItem").mousedown(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var name = id.split("-")[0];
					//업종밀집도 변화, 지역 종합정보, 창업지역검색 일 경우 줌레벨을 시군구 레벨로 변경
					if(name == "jobChange" || name == "areaInfo" || name == "areaSearch") {
						if($bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].zoom < 4) {	//시도 레벨일 경우
							$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].setZoom(4);	//시군구 레벨로 변경
						}
					}
				});
*/				
				this.updateSearchBtnEffect(this.curSearchBtnArray["one"], 0);
				this.updateSearchBtnEffect(this.curSearchBtnArray["two"], 1);
				this.updateSearchBtnEffect(this.curSearchBtnArray["three"], 2);
			},
			
			/**
			 * 
			 * @name         : updateSearchBtnEffect
			 * @description  : 해당 조건버튼의 색상 및 깜빡임 효과. 
			 * @date         : 2015. 11. 10.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param btn_id : 조회 버튼 아이디 (element id)
			 * @param map_id : 지도 번호 (0, 1, 2)
			 */
			updateSearchBtnEffect : function(btn_id, map_id) {
				//모든 버튼 색상 초기화
				$("#searchBtnResultRgn ul li").each(function() {
					$(this).find("a").removeClass("M_on");
					$(this).find("a").css("background-color", "");	//해당 버튼 배경 없애기
				});
				
				//드랍된 버튼 아이디 저장
				if(map_id == "0") {
					this.curSearchBtnArray["one"] = btn_id;
				} else if(map_id == "1") {
					this.curSearchBtnArray["two"] = btn_id;
				} else if(map_id == "2") {
					this.curSearchBtnArray["three"] = btn_id;
				}
				
				//원래 드랍됐었던 조회버튼
				if(this.curSearchBtnArray["one"] != "") {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], this.mapColor[0]);
				}
				if(this.curSearchBtnArray["two"] != "") {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], this.mapColor[1]);
				}
				if(this.curSearchBtnArray["three"] != "") {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], this.mapColor[2]);
				}
				
				//분할 화면에 같은 버튼을 조회했을 경우
				if(this.curSearchBtnArray["one"] != "" && (this.curSearchBtnArray["one"] == this.curSearchBtnArray["two"])) {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], "#394955");
				}
				if(this.curSearchBtnArray["two"] != "" && (this.curSearchBtnArray["two"] == this.curSearchBtnArray["three"])) {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], "#394955");
				}
				if(this.curSearchBtnArray["three"] != "" && (this.curSearchBtnArray["three"] == this.curSearchBtnArray["one"])) {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], "#394955");
				}
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정한다. 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			setParams : function(curSelectedStatsType) {
				var tmpArParams = new Array();
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				var filterParam = null;
				var unit = null;
				var filterName = null;
				var themeNm = "";
				var conditions = []; // 후보지역 조건설정
				
				//업종밀집도 변화
				if (curSelectedStatsType == "jobChange") {
					var fullName = null;
					var tmpNames = [];
					
					filterParam = $(".jobArea_stepBox label.on").prev("input").val();
					fullName = $(".jobArea_stepBox label.on").text();
					tmpNames.push($.trim(fullName));
					unit = "개";
					
					if (tmpNames.length > 0) {
						tmpArParamName.push(tmpNames.join());
					}
					
					tmpArParams.push({
						key : "theme_cd",
						value : $(".jobArea_stepBox label.on").prev("input").val()
					});
					
					tmpArParams.push({
						key : "year",
						value : dataYear
					});
				}
				
				//지자체 인허가
				else if (curSelectedStatsType == "jobOpen") {
					var fullName = null;
					var tmpNames = [];
					
					filterParam = $(".jobArea_stepBox label.on").prev("input").val();
					fullName = $(".jobArea_stepBox label.on").text();
					tmpNames.push($.trim(fullName));
					unit = "개";
					
					if (tmpNames.length > 0) {
						tmpArParamName.push(tmpNames.join());
					}
					
					tmpArParams.push({
						key : "theme_cd",
						value : $(".jobArea_stepBox label.on").prev("input").val()
					});
					
					tmpArParams.push({
						key : "year",
						value : dataYear
					});
				}
				
				//업종별 뜨는 지역 mng_s
				else if (curSelectedStatsType == "jobBest") {
					var fullName = null;
					var tmpNames = [];
					
					filterParam = $(".jobArea_stepBox label.on").prev("input").val();
					fullName = $(".jobArea_stepBox label.on").text();
					$bizStatsMap.ui.jobBestTitle = fullName;
					tmpNames.push($.trim(fullName));
					unit = "개";
					
					if (tmpNames.length > 0) {
						tmpArParamName.push(tmpNames.join());
					}
					
					tmpArParams.push({
						key : "theme_cd",
						value : $(".jobArea_stepBox label.on").prev("input").val()
					});
					
					tmpArParams.push({
						key : "year",
						value : dataYear
					});
					
					tmpArParams.push({
						key : "jb_sido_cd",
						value : $("#inter-recommend-sido-select").val()
					});
					
					tmpArParams.push({
						key : "jb_ssg_cd",
						value : $("#inter-recommend-ssg-select").val()
					});
					
					tmpArParams.push({
						key : "param_job_best_from",
						value : $("#param_job_best_from").val()
					});
					
					tmpArParams.push({
						key : "param_job_best_to",
						value : $("#param_job_best_to").val()
					});

				}
				
				//지역 종합정보
				else if (curSelectedStatsType == "areaInfo") {
					tmpArParamName.push("생활업종후보지정보");
					unit = "개";
				}
				
				//조건 설정에 따른 지역 검색
				else if (curSelectedStatsType == "areaSearch") {
					unit = "개";
					
					// 사업체 업종
					if($("#companyTabDiv").is(":visible")) {
						var tmpThemeCd = "";
						var tmpThemeNm = "";
						
 						//요식업
						if(this.curSelectedCompany == "food") {
							$("input[name='rd_sch_food']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "요식업-"+$(this).next().text();
								}
							});
							
						//도소매
						} else if(this.curSelectedCompany == "retail") {
							$("input[name='rd_sch_retail']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "도소매-"+$(this).next().text();
								}
							});
							
						//서비스
						} else if(this.curSelectedCompany == "service") {
							$("input[name='rd_sch_service']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "서비스-"+$(this).next().text();
								}
							});
							
						//숙박업
						} else if(this.curSelectedCompany == "hotel") {
							$("input[name='rd_sch_hotel']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "숙박업-"+$(this).next().text();
								}
							});
						}
						
						themeNm = tmpThemeNm;
						tmpArParams.push({
							key : "theme_cd",
							value : tmpThemeCd
						});
					}
					
					// 사업체 수
					if($("#companyCountDiv").is(":visible")) {
						var corp_cnt = $("#companyCount").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(corp_cnt);

						tmpArParamName.push("사업체 수-"+tmpNm+" (" + themeNm + ")");
						tmpArParams.push({
							key : "corp_cnt",
							value : corp_cnt
						});
						conditions.push({category: "사업체 수("+themeNm+")", value: tmpNm});
					}
					
					// 사업체 증감
					if($("#companyIncreaseDiv").is(":visible")) {
						var rate_change = $("#companyIncrease").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderLowAvgHigh(rate_change);
						
						tmpArParamName.push("사업체 증감-"+tmpNm+" (" + themeNm + ")");
						tmpArParams.push({
							key : "rate_change",
							value : rate_change
						});
						conditions.push({category: "사업체 증감("+themeNm+")", value: tmpNm});
					}
					
					// 직장인구
					if($("#jobPeopleDiv").is(":visible")) {
						var ppl_val = $("#jobPeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(ppl_val);
						
						tmpArParams.push({
							key : "ppl_type",
							value : "2"
						});
						
						tmpArParamName.push("직장인구-"+tmpNm);
						tmpArParams.push({
							key : "ppl_val",
							value : ppl_val
						});
						
						conditions.push({category: "직장인구", value: tmpNm});
					}
					
					// 거주인구
					if($("#stayPeopleDiv").is(":visible")) {
						var ppl_val = $("#stayPeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(ppl_val);
						
						tmpArParams.push({
							key : "ppl_type",
							value : "1"
						});
						
						tmpArParamName.push("거주인구-"+tmpNm);
						tmpArParams.push({
							key : "ppl_val",
							value : ppl_val
						});
						
						conditions.push({category: "거주인구", value: tmpNm});
					}
					
					// 성별인구
					if($("#genderPeopleDiv").is(":visible")) {
						var pplGender = $("input[name='population_gender']:checked");
						var pplGenderVal = $("#genderPeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(pplGenderVal);
						
						tmpArParams.push({
							key : "ppl_gender_type",
							value : $(pplGender).val()
						});
						
						tmpArParamName.push("성별인구-"+tmpNm+" ("+$(pplGender).next().text()+")");
						tmpArParams.push({
							key : "ppl_gender_val",
							value : pplGenderVal
						});
						
						conditions.push({category: "성별인구("+$(pplGender).next().text()+")", value: tmpNm});
					}
					
					// 연령별인구
					if($("#agePeopleDiv").is(":visible")) {
						var pplAgeVal = $("#agePeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(pplAgeVal);
						
						var pplAge = [];						
						var tmpNames = [];
						$("input[name='rd_age']").each(function() {
							if($(this).attr("checked") == "checked") {
								pplAge.push($(this).val());
								tmpNames.push($(this).next().text());
							}
						});
						
						tmpArParams.push({
							key : "ppl_age_type",
							value : pplAge.join(",")
						});
						
						tmpArParamName.push("인구연령-"+tmpNm+" ("+tmpNames.join(",")+")");
						tmpArParams.push({
							key : "ppl_age_val",
							value : pplAgeVal
						});
						
						conditions.push({category: "연령" + ((tmpNames.length > 1) ? "(복합)" : "("+tmpNames[0]+")"), value: tmpNm});
					}
					
					// 가구유형
					if($("#householdDiv").is(":visible")) {
						var familyType = "";
						var familyVal = $("#household").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(familyVal);
						
						$("input[name='household_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								familyType = $(this);
							}
						});
						
						tmpArParams.push({
							key : "family_type",
							value : $(familyType).val()
						});
						
						tmpArParamName.push("가구-"+tmpNm+" ("+$(familyType).next().text()+")");
						tmpArParams.push({
							key : "family_val",
							value : familyVal
						});
						
						conditions.push({category: "가구" + $(familyType).next().text(), value: tmpNm});
					}
					
					// 점유형태
					if($("#occupyTypeDiv").is(":visible")) {
						var occupyType = "";
						var occupyVal = $("#occupyType").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(occupyVal);
						
						$("input[name='ocptn_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								occupyType = $(this);
							}
						});
						
						tmpArParams.push({
							key : "occupy_type",
							value : $(occupyType).val()
						});
						
						tmpArParamName.push("점유형태-"+tmpNm+" ("+$(occupyType).next().text()+")");
						tmpArParams.push({
							key : "occupy_val",
							value : occupyVal
						});
						
						conditions.push({category: "점유형태(" + $(occupyType).next().text() + ")", value: tmpNm});
					}
					
					// 거주 주택
					if($("#houseLivingTypeDiv").is(":visible")) {
						var houseType = "";
						$("input[name='house_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								houseType = $(this);
							}
						});
						
						tmpArParamName.push($(houseType).next().text());
						tmpArParams.push({
							key : "house_type",
							value : $(houseType).val()
						});
					}
					
					//해당 주택 수
					if($("#houseTypeDiv").is(":visible")) {
						var houseVal = $("#houseType").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(houseVal);
						
						tmpArParamName.push("주택 수-"+tmpNm);
						tmpArParams.push({
							key : "house_val",
							value : houseVal
						});
						
						conditions.push({category: "주택 수("+$(houseType).next().text()+")", value: tmpNm});
					}
					
					//아파트 시세
					if($("#apartPriceDiv").is(":visible")) {
						var apartPrice = $("#apartPrice").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(apartPrice);
						
						tmpArParamName.push("공시지가정도-"+tmpNm);
						tmpArParams.push({
							key : "apartprice",
							value : apartPrice
						});
						
						conditions.push({category: "공시지가", value: tmpNm});
					}
					
					//노후 주택
					if($("#oldHouseDiv").is(":visible")) {
						var oldHouse = $("#oldHouse").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(oldHouse);
						
						tmpArParamName.push("노후주택 수-"+tmpNm);
						tmpArParams.push({
							key : "house_old_val",
							value : oldHouse
						});
						
						conditions.push({category: "노후주택 수("+$(houseType).next().text()+")", value: tmpNm});
					}
				}
				
				this.arParamList.push({
					idx : this.searchbtnCnt,
					params : tmpArParams,
					noneParams : tmpArNoneParams,
					names : tmpArParamName,
					filterParam : filterParam,
					unit : unit,
					conditions : conditions
				});
				return curSelectedStatsType;
			},
			
			/**
			 * 
			 * @name         : setDetailStatsPanel
			 * @description  : 특정 통계버튼을 생성했을 때, 해당 통계에 대한 세부통계조건선택뷰를 생성한다.
			 * @date         : 2015. 11. 03. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 통계타입
			 */
			setDetailStatsPanel : function(type) {
				this.curSelectedStatsType = type;
				
				//데이터보드 초기화
				$bizStatsDataBoard.ui.initDataBoard();
				
				//좌측 메뉴의 순서대로 숫자를 지정해야 하므로 중간에 메뉴가 들어가면
				//숫자를 모두 바꿔주어야 한다. 아니면 숫자별로 if/else를 해주면 되는데 그냥 숫자를 바꿔주는게 낳을듯...
				var menuType = {
					"intro" : 0,					//Intro) 17개 시도별 생활업종현황
					"jobArea"  : 1,				//업종별 지역현황
					"jobChange"  : 2,			//업종밀집도 변화
					"areaSearch" 	 : 3,	//창업지역검색
					"areaInfo" 	 : 4,			//지역 종합정보
					"publicData" 	 : 7,		//공공데이터
					"userData"	 : 8,			//나의 데이터
					"jobOpen" : 5, 	//지자체 인허가통계 (업종별 개업 현황)
					"jobBest" : 6, 	//업종별 뜨는 지역
				};
				
				var titleType = {
					"intro" : "Intro) 17개 시도별 생활업종현황",
					"jobArea"  : "생활업종 선택하기",
					"jobChange" 		 : "생활업종 선택하기",
					"areaSearch" 	 : "창업지역검색",	
					"areaInfo" 	 : "생활업종후보지정보",				
					"publicData" 	 : "공공데이터 조회",	
					"userData"	 : "나의 데이터 불러오기",
					"jobOpen"	 : "지자체 인허가 업종 선택하기",
					"jobBest"	 : "관심지역 및 기간 선택하기"  //업종별 뜨는 지역인데 2뎁스의 타이틀을 넣는다.
				}
				
				var inx = menuType[type];
				
				$bizStatsMap.ui.menuType = inx;
				
				$("#submenuTitle").text(titleType[type]);
				$("#submenuTitle_stop03").text("지자체인허가 업종 선택하기");//다른 메뉴는 2뎁스까지 밖에 없지만 업종별 뜨는 지역만 3뎁스여서 이렇게 처리함.
				$("#depth1Menu").find("li").removeClass("on");
				
				$("#depth1Menu").find("li:eq("+inx+")").addClass("on");
				
				$(".totalResult").hide();
				$("#jobOpen_use_info").hide();
				
				//버튼생성 삭제
				$(".buttonMakeBtnClass").hide();
				
				if(!$bizStatsMap.ui.quickBoxShowYn || $bizStatsMap.ui.quickBoxShowYn !="N"){
					//Intro 제외 2depth열기, 3depth, 4dpeht 닫기
					if(menuType[type] != 0 && menuType[type] != 4 ) {
						if(menuType[type] == 6) { //업종별 뜨는 지역은 3depth
							$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
							$(".quickBox.step02").stop().animate({"left":"280px"},200);
							$(".quickBox.step03").stop().animate({"left":"560px"},200);
						} else {
							$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
							$(".quickBox.step02").stop().animate({"left":"280px"},200);
							$(".quickBox.step03").stop().animate({"left":"-280px"},200);
						}
						
					} else {
						$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
						$(".quickBox.step02").stop().animate({"left":"0px"},200);
						$(".quickBox.step03").stop().animate({"left":"-280px"},200);
					}
				}
				$bizStatsMap.ui.quickBoxShowYn = "";

				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				//공유
				var shareInfo = new share.shareInfo(map, $bizStatsMap.ui);
				map.shareInfo = shareInfo;
				
				//alert("[bizStatsLeftMenu.js] menuType[type] [" + menuType[type]);
				
				switch(menuType[type]) {
					//Intro) 17개 시도별 생활업종현황
					case 0:
						this.doSidoIntro();
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						break;
						
					//업종별 지역현황
					case 1:
						this.doCompanySidoIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						break;
						
					//업종밀집도 변화
					case 2:
						this.doNormalMapInit();
						this.doCompanyDensityIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						
						//버튼생성 보이기
						//$("#buttonMakeBtn02").show();
						break;
						
						//창업지역검색
					case 3:
						this.doNormalMapInit();
						$(".totalResult.tr0"+parseInt(inx+2)).show();
						
						//버튼생성 보이기
						$("#buttonMakeBtn01").show();
						break;	
						
					//지역 종합정보
					case 4:
						this.doNormalMapInit();
						$bizStatsLeftMenu.ui.addSearchBtn();
//						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						//버튼생성 보이기
//						$("#buttonMakeBtn02").show();
						break;

					//공공데이터
					case 7:
						this.doNormalMapInit();
						$(".totalResult.tr06").show();
						break;
						
					//나의 데이터
					case 8:
						this.doNormalMapInit();
						$(".totalResult.tr07").show();
						break;
					
					//지자체 인허가(업종별 개업 현황)
					case 5:
						this.doNormalMapInit();
						this.doCompanyOpenIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr08").show();
						$("#jobOpen_use_info").show();
						break;
					
					//업종별 뜨는 지역
					case 6:
						this.doNormalMapInit();
						this.doCompanyBestIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr09").show();
						$(".totalResult.tr10").show();
						//$("#jobBest_use_info").show();
						$("#job_recommend_3depth").hide(); //생활업종 후보지 검색의 3뎁스 메뉴 하이드
						$("#job_recommend_3depth_btn").hide(); ////생활업종 후보지 검색의 3뎁스 검색버튼생성 하이드
						
						$bizStatsLeftMenu.ui.getSidoList("inter-recommend", "00", "999");
						
						if ($bizStatsLeftMenu.ui.job_best_from_reload_val=="") { //최초 로딩시
							$("#job_best_from").html("<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일"); 
							$("#job_best_to").html("<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20171231'>2017년 12월 31일");
						} else { //한번이상 조회했을 경우 이전에 조회된 기간을 다시 세팅한다.
							$("#job_best_from").html($bizStatsLeftMenu.ui.job_best_from_reload_val); 
							$("#job_best_to").html($bizStatsLeftMenu.ui.job_best_to_reload_val);
						}
						
						
						$bizStatsMap.ui.jobBestTitle = $(".jobArea_stepBox label.on").text();
						
						break;
				}
			},
			
			/**
			 * 
			 * @name         : companyTab
			 * @description  : 사업체 업종선택 탭 선택시.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			companyTab : function(type) {
				this.curSelectedCompany = type;
			},
			
			/**
			 * 
			 * @name         : deleteSearchBtn
			 * @description  : 생성된 조건검색버튼을 삭제한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchbtnCnt   : 조회버튼 고유값
			 */
			deleteSearchBtn : function(value) {
				var btn_id = $("#dragItem_" + value).find("a").attr("id");
				$("#dragItem_" + value).remove();

				// 삭제된 조회버튼의 파라미터정보를 삭제한다.
				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == value) {
						this.arParamList.splice(this.arParamList.indexOf(this.arParamList[i]), 1);
						break;
					}
				}
				
				//지도를 조회한 버튼 아이디 초기화
				if(this.curSearchBtnArray["one"] == btn_id) {
					this.curSearchBtnArray["one"] = "";
				}
				if(this.curSearchBtnArray["two"] == btn_id) {
					this.curSearchBtnArray["two"] = "";
				}
				if(this.curSearchBtnArray["three"] == btn_id) {
					this.curSearchBtnArray["three"] = "";
				}

				//버튼 카운트
				this.getBtnCnt();
			},
			
			/**
			 * 
			 * @name         : btnValidationCheck
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보 유효성 검사. 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			btnValidationCheck : function(curSelectedStatsType) {
				//창업지역검색
				if (curSelectedStatsType == "areaSearch") {
					
					if($(".wonList01").find(".on").length > 5) {
						messageAlert.open("알림", "최대 5개까지만 선택 가능합니다.");
						return false;
					}else if ($(".wonList01").find(".on").length == 0) {
						messageAlert.open("알림", "최소 1개이상 조건을 선택하세요.");
						return false;
					}
					
					//사업체수, 사업체증감이 선택되어 있을경우
					if($("#companyCountAtag").hasClass("on") || $("#companyIncreaseAtag").hasClass("on")) {
						var str = "";
						//요식업
						if(this.curSelectedCompany == "food") {
							$("input[name='rd_sch_food']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							
						//도소매
						} else if(this.curSelectedCompany == "retail") {
							$("input[name='rd_sch_retail']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						
						//서비스
						} else if(this.curSelectedCompany == "service") {
							$("input[name='rd_sch_service']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						
						//숙박업
						} else if(this.curSelectedCompany == "hotel") {
							$("input[name='rd_sch_hotel']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						}
					
						if(str == "") {
							messageAlert.open("알림", "사업체 업종은 필수입니다.");
							return false;
						}
					}
					
					// 성별인구
					if($("#genderPeopleAtag").hasClass("on")) {
						var str = "";
						$("input[name='population_gender']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "성별은 필수입니다.");
							return false;
						}
					}
					
					// 연령별인구
					if($("#agePeopleAtag").hasClass("on")) {
						var str = "";
						$("input[name='rd_age']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "연령은 필수입니다.");
							return false;
						}
					}
					
					// 가구유형
					if($("#householdAtag").hasClass("on")) {
						var str = "";
						$("input[name='household_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "세대구성은 필수입니다.");
							return false;
						}
					}
					
					//점유형태
					if($("#occupyTypeAtag").hasClass("on")) {
						var str = "";
						$("input[name='ocptn_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "점유형태는 필수입니다.");
							return false;
						}
					}
					
					//거주주택, 노후주택이 선택되어 있을 경우
					if($("#houseTypeAtag").hasClass("on") || $("#oldHouseAtag").hasClass("on") ) {
						var str = "";
						$("input[name='house_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "거주주택 유형은 필수입니다.");
							return false;
						}
					}
				}
				
				//창업지역검색
				else if (curSelectedStatsType == "jobChange") {
					var str = "";
					$(".jobArea_stepBox input").each(function() {
						if($(this).attr("checked") == "checked") {
							str = "check";
						}
					});
					if(str == "") {
						messageAlert.open("알림", "생활업종을 선택하세요.");
						return false;
					}
				}
					
				return true;
			},
			
			/**
			 * 
			 * @name         : areaSearchCondition
			 * @description  : 창업지역 찾기 선택
			 * @date         : 2015. 11. 04.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type : 선택된 통계정보 타입
			 */
			areaSearchCondition : function(type) {
				
				/*var checkLength = 0;
				$(".wonList01").each(function(i,item_list){
					$(item_list).find('li>a').each(function(j,item){
						var aItem = item.getElementsByTagName("a");
						console.log(aItem);
					})
				});*/
//				console.log(type);
				var wonList01 = document.getElementById("wonList01");
				var liItems = wonList01.getElementsByTagName("li");
				var onCount = 0;
				for(var i =0; i < liItems.length; i ++){
					var aItem = liItems[i].getElementsByTagName("a")[0].className;
					//var aId = liItems[i].getElementsByTagName("a")[0].className;
					if(aItem == "on"){
						onCount = onCount + 1;
					}
				}
//				console.log(onCount);
				
				if(onCount > 5) {
					messageAlert.open("알림", "최대 5개까지만 선택 가능합니다.");
					if($("#"+type+"Atag").hasClass("on")) {
							$("#"+type+"Atag").removeClass("on");
						}
				}else if ($(".wonList01").find(".on").length == 0) {
					messageAlert.open("알림", "최소 1개이상 조건을 선택하세요.");
					return false;
				}
				
				
				if($("#"+type+"Atag").hasClass("on")) {
					$("#"+type+"Div").show();
					//직장인구일 경우 거주인구, 성별, 연령별 해제
					if(type == "jobPeople") {
						$("#stayPeopleAtag").removeClass("on");
						$("#genderPeopleAtag").removeClass("on");
						$("#agePeopleAtag").removeClass("on");
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						
					//거주인구, 성별, 연령별일 경우 직장인구 해제
					} else if(type == "stayPeople" || type == "genderPeople" || type == "agePeople") {
						$("#jobPeopleAtag").removeClass("on");
						$("#jobPeopleDiv").hide();
					}
				} else {
					$("#"+type+"Div").hide();
				}
				
				//사업체수, 사업체증감이 선택되어 있을경우
				if($("#companyCountAtag").hasClass("on") || $("#companyIncreaseAtag").hasClass("on")) {
					$("#companyTabDiv").show();		//사업체 업종 선택 필수
				} else {
					$("#companyTabDiv").hide();
				}
					
				//거주주택, 노후주택이 선택되어 있을 경우
				if($("#houseTypeAtag").hasClass("on") || $("#oldHouseAtag").hasClass("on") ) {
					$("#houseLivingTypeDiv").show();		//사업체 업종 선택 필수
				} else {
					$("#houseLivingTypeDiv").hide();
				}
				
				//3Depth 열기
				this.viewThreeDepth();
			},
			
			/**
			 * 
			 * @name         : viewThreeDepth
			 * @description  : 3Depth 메뉴를 show
			 * @date         : 2015. 11. 03. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			viewThreeDepth : function() {
				//메뉴버튼
				$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
				$("#areaSearchDetailDiv").stop().animate({"left":"560px"},200);
			},
			
			/**
			 * 
			 * @name         : commonDataList
			 * @description  : 공공데이터, 나의데이터 목록 가져오기
			 * @date         : 2015. 12. 09. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			commonDataList : function() {
				$publicDataBoard.ui.leftMenuList($bizStatsMap.ui);		//공공데이터 목록
				$mydataDataBoard.ui.delegateSetting($bizStatsMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($bizStatsMap.ui);				//공공데이터 세팅
			},
			
			/**
			 * 
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function() {
				$bizStatsMap.ui.doMaxSize();
			},
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function() {
				$bizStatsMap.ui.doAddMap();
			},
			
			/**
			 * 
			 * @name         : doCombineMap
			 * @description  : 범례결합창을 표출한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCombineMap : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.doCombineMap(mapId);
			},
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.doBookMark(mapId);
			},
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShare : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.doShare(mapId);
			},
			
			/**
			 * 
			 * @name         : doReport
			 * @description  : 보고서를 생성한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReport : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.reportDataSet(mapId);
			},
			
			/**
			 * 
			 * @name         : doHelp
			 * @description  : 도움말 페이지로 링크한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doHelp : function() {
				messageAlert.open("알림", "준비중입니다.");
			},
			
			/**
			 * 
			 * @name         : showNumberClick
			 * @description  : 통계값 표출유무 버튼 클릭 시
			 * @date         : 2016. 01. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberClick : function() {
				var map_id = $bizStatsMap.ui.curMapId;
				var legend = $bizStatsMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우 off로 변경
				if(legend.numberData) {
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				} else {	//통계표출 off일 경우 on으로 변경
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				}
				//통계값 표출유무 설정 호출
				legend.showNumberData();
			},
			
			/**
			 * 
			 * @name         : showNumberSetting
			 * @description  : 통계값 표출유무 연동 (범례에서 선택 시, 지도 선택 시)
			 * @date         : 2016. 01. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberSetting : function() {
				var map_id = $bizStatsMap.ui.curMapId;
				var legend = $bizStatsMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우
				if(legend.numberData) {
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				} else {	//통계표출 off일 경우
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				}
			},
			
			/**
			 * @name		: changeFindingType
			 * @description	: 조회타입설정 변경
			 * @date		: 2016.08.19
			 * @author		: 김재상
			*/
			changeFindingType : function(type){
				var map_id = $bizStatsMap.ui.curMapId;
				var legend = $bizStatsMap.ui.mapList[map_id].legend;
				
				$(".sqTabs>a").removeClass("on");
				// 통계버튼목록
				if(type == 1){
					$(".sqTabs>a#statisbtn").addClass("on");
				// 드래그앤드롭
				}else if(type == 2){
					$(".sqTabs>a#dragbtn").addClass("on");
				}
			},
			
			/**
			 * @name		: getCurSearchParam
			 * @description	: 현재 조회중인 버튼 반환
			 * @date		: 2016.08.19
			 * @author		: 김재상
			 */
			getCurSearchParam : function(){
				
				var firstMapParamIdx = parseInt($bizStatsLeftMenu.ui.curSearchBtnArray.one.split("-")[1]);
				var secondMapParamIdx = parseInt($bizStatsLeftMenu.ui.curSearchBtnArray.two.split("-")[1]);
				var thirdMapParamIdx = parseInt($bizStatsLeftMenu.ui.curSearchBtnArray.three.split("-")[1]);
				var arParamList = $bizStatsLeftMenu.ui.arParamList;
				
				var curSearchParam = {};
				
				for(var i=0; i<arParamList.length; i++){
					switch(arParamList[i].idx){
						case firstMapParamIdx:
							curSearchParam.one = arParamList[i];
							break;
						case secondMapParamIdx:
							curSearchParam.two = arParamList[i];
							break;
						case thirdMapParamIdx:
							curSearchParam.three = arParamList[i];
							break;
					} 
				}
				
				return curSearchParam;
			}
			
			
			
	};
	
	$bizStatsLeftMenu.Util = {
			/**
			 * 
			 * @name         : sliderSmallAvgBig
			 * @description  : 적은지역, 평균지역, 많은지역
			 * @date         : 2015. 12. 08. 
			 * @author	     : 김성현
			 * @param 		: type	1:적은지역, 2:평균지역, 3:많은지역
			 * @history 	 :
			 */
			sliderSmallAvgBig : function(type) {
				var returnStr = "";
				if(type == "1") {
					returnStr = "적은지역";
				} else if(type == "2") {
					returnStr = "평균지역";
				} else if(type == "3") {
					returnStr = "많은지역";
				}
				return returnStr;
			},
	
			/**
			 * 
			 * @name         : sliderLowAvgHigh
			 * @description  : 낮은지역, 평균지역, 높은지역
			 * @date         : 2015. 12. 09. 
			 * @author	     : 김성현
			 * @param 		: type	1:낮은지역, 2:평균지역, 3:높은지역
			 * @history 	 :
			 */
			sliderLowAvgHigh : function(type) {
				var returnStr = "";
				if(type == "1") {
					returnStr = "낮은지역";
				} else if(type == "2") {
					returnStr = "평균지역";
				} else if(type == "3") {
					returnStr = "높은지역";
				}
				return returnStr;
			}
	};

	$bizStatsLeftMenu.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : Left 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 06. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				$(".sqTabs").find(".mCSB_container").css("width", "292px");
				
				//슬라이드 세팅
				this.slideValue(".sliderDefault");
				
		    	//스크롤 생성
		    	$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
		    	$(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({axis:"xy"});
		    	$(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({
		        	axis:"xy",
		        	callbacks: {
		        		whileScrolling:function() {
		        			//3Detph 가 안보이는 버그 해결책
		        			if($(".quickBox.step03").find(".mCSB_container").position() != undefined) {
		        				if($(".quickBox.step03").find(".mCSB_container").position().left >= 1000) {
		        					$(".quickBox.step03").find(".mCSB_container").css("left", "0px");
			    				}	
		        			}
		        		}
		        	}
		        });
		        
		        //조건설정 항목 선택하기 클릭 시
		        body.on("click", ".wonList01 li:not(.disabled) a", function(){    
		    		var ck = $(this).hasClass("on");
		    		if(!ck){
		    			$(this).addClass("on");
		    		}else{
		    			$(this).removeClass("on");
		    		}
		    	});
		        
		        //창업지역검색 - 사업체 업종 선택
		        body.on("click",".cateMenu li a",function(){
		    		var inx = $(this).parent("li").index();
		    		$(this).parents(".cateMenu").eq(0).nextAll("div").hide();
		    		$(this).parents(".stepBox").eq(0).find(".cm0"+parseInt(inx+1)).show();
		            $(this).parents(".cateMenu").eq(0).children("li").removeClass("on");
		            $(this).parents("li").eq(0).addClass("on");
		        });  
				
				//통계메뉴 클릭 시
				body.on("click", ".sideQuick.sq02", function(){ 
					var on = $(this).hasClass("on");
					if(!on){
						$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
						$(".quickBox.step01").stop().animate({"left":"0"},200);
						//$(".shadow").show(); 
						$(this).find("span").hide();
						$(this).addClass("on").css("width","40px");
						$(this).find("img").css("padding-top", "4px");
					}else{ 
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "pass"); 
						$(this).find("span").show();
						$(this).removeClass("on").css("width","90px");
						 $(".quickBox.step02").removeClass("join");
						 $(this).find("img").css("padding-top", "");
					} 
				}); 
				
				//선택항목 클릭 시
				body.on("click",".sideQuick.sq03", function(){
					var isDrag = $(this).hasClass("dragStart");
					var on = $(this).hasClass("on");
					if(!on){
						$(this).addClass("on");
						if (isDrag) {
							if ($(this).next(".sqListBox").is(":visible")) {
								$(".sqListBox.sq03").hide();
							}else {
								$(".sqListBox.sq03").show();
								$("#mCSB_3_container").width("292px");
								$("#mCSB_4_container").width("292px");
							}
						}else {
							$(".sqListBox.sq03").show();
							$(this).next(".sqListBox").stop().animate({"left":"0px"},200);
						}
					}else{
						$(this).removeClass("on");
						if (isDrag) {
							if ($(this).next(".sqListBox").is(":visible")) {
								$(".sqListBox.sq03").hide();
							}else {
								$(".sqListBox.sq03").show();
								$("#mCSB_3_container").width("292px");
								$("#mCSB_4_container").width("292px");
							}
						}else {
							$(".sqListBox.sq03").show();
							$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
						}
					}
				}); 
				
				//닫기 버튼 클릭 시
				body.on("click",".stepClose",function(){ 
					$bizStatsLeftMenu.event.stepCloseAnimate(parseInt($(this).index(".stepClose")+1), "pass"); 
			    }); 
				
				//조건 상세설정 열고 닫기
				body.on("click","a.roundTextBox",function(){
					
					$("a.roundTextBox").each(function(){
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide(); 
					});
					
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).children("input").prop("checked", true);
						$(this).next(".joinDefault").show();
					}else{
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide(); 
					}
					
					
					
					
			    });
				
				//업종별 지역현황 - 생활업종 선택하기
				body.on("click",".jobArea_stepBox label",function(){
					$(".jobArea_stepBox label").removeClass("on");
					$(".jobArea_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$(".qmdl2 dd ul>li").removeClass("on");
					
					//업종밀집도 변화일 경우 버튼 생성
					if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobChange") {
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						
						//alert("themeCd [" + themeCd); //ex)한식의 경우 : 5001
						
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						//$bizStatsMap.ui.doReqCompanyDensity(themeCd, themeNm);
						$bizStatsMap.ui.setTitle("업종밀집도변화 > "+themeNm, viewId);
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].mapMove([1007770, 1855549], 2);
						
						//최초조회 시 전국정보 팝업
						var options = {
								params : {
									adm_cd : null,
									adm_nm : '전국',
									map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
									year : companyDataYear
								},
								dataBoard : {
									jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
								},
								etc : {
									themeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
									curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
									year : companyDataYear,
								}
						}
						$bizStatsDataBoard.ui.updateDataBoard(options, "jobChange");
					}
					
					//================================================================================
					//지자체 인허가 클릭시
					else if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobOpen") {
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						
						//alert("[bizStatsLeftMenu.js]  themeCd [" + themeCd);
						
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						//$bizStatsMap.ui.doReqCompanyDensity(themeCd, themeNm);
						$bizStatsMap.ui.setTitle("업종별 개업 현황 > "+themeNm, viewId);
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].mapMove([1007770, 1855549], 2);
						
						//최초조회 시 전국정보 팝업
						var options = {
								params : {
									adm_cd : null,
									adm_nm : '전국',
									map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
									year : companyDataYear + 1  //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
								},
								dataBoard : {
									jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
								},
								etc : {
									themeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
									curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
									year : companyDataYear + 1,   //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
								}
						}
						$bizStatsDataBoard.ui.updateDataBoard(options, "jobOpen");
					}
					
					//================================================================================
					//업종별 뜨는 지역 클릭시
					else if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobBest") {
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						
						var param_sido_cd = $("#inter-recommend-sido-select").val();
						var param_sgg_cd = $("#inter-recommend-sgg-select").val();
						var param_job_best_from = $("#param_job_best_from").val();
						var param_job_best_to = $("#param_job_best_to").val();
						
						$bizStatsLeftMenu.ui.job_best_from_poi = $("#param_job_best_from").val();
						$bizStatsLeftMenu.ui.job_best_to_poi = $("#param_job_best_to").val();
						$bizStatsLeftMenu.ui.job_best_themeCd = themeCd;
						
						$bizStatsLeftMenu.ui.jobBestSido = $("#inter-recommend-sido-select option:selected").text();
						$bizStatsLeftMenu.ui.jobBestSgg = $("#inter-recommend-sgg-select option:selected").text();
						
						console.log("[bizStatsLeftMenu.js]  themeCd [" + themeCd);
						console.log("[bizStatsLeftMenu.js]  param_sido_cd [" + param_sido_cd);
						console.log("[bizStatsLeftMenu.js]  param_sgg_cd [" + param_sgg_cd);
						console.log("[bizStatsLeftMenu.js]  param_job_best_from [" + param_job_best_from);
						console.log("[bizStatsLeftMenu.js]  param_job_best_to [" + param_job_best_to);
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						//$bizStatsMap.ui.doReqCompanyDensity(themeCd, themeNm);
						$bizStatsMap.ui.setTitle("업종별 뜨는 지역 > "+themeNm, viewId);
						$(".jobBestTitle").html(themeNm+" 뜨는 지역");
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].mapMove([1007770, 1855549], 2);
						
						//최초조회 시 전국정보 팝업
						var options = {
								params : {
									adm_cd : null,
									adm_nm : '전국',
									map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
									year : companyDataYear + 1,  //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
									param_sido_cd : param_sido_cd,
									param_sgg_cd : param_sgg_cd,
									param_job_best_from : param_job_best_from,
									param_job_best_to : param_job_best_to
								},
								dataBoard : {
									jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
								},
								etc : {
									themeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
									curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
									year : companyDataYear + 1,   //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
								}
						}
						$bizStatsDataBoard.ui.updateDataBoard(options, "jobBest");
					}
					
					
					//업종별 지역현황 항목 선택
					else if ($bizStatsLeftMenu.ui.curSelectedStatsType == "jobArea") {
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						$bizStatsMap.ui.doReqSidoCompany("", themeCd, themeNm, 0);
						$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+themeNm, viewId);
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
					}
					
					
					
					
			    });
				
				//mng_s
				//시도 이벤트
				$("body").on("change","select[id$=-sido-select]",function(){
					$bizStatsLeftMenu.ui.getSggList($(this).data("type"),$(this).val(),"");
					
				});
				
				//위치중심 공공데이터 선택
				body.on("click",".publicData_stepBox label",function(){
					$(".publicData_stepBox label").removeClass("on");
					$(".publicData_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
					
					//조회 실행
					var type = $(this).prev().val();
					$publicDataBoard.ui.updatePublicData(type);
			    });
				
				//단일 라디오버튼 선택 (li 안에 input 여러개)
				body.on("click",".radioStepBox label",function(){
					var ck = $(this).hasClass("on");
					
					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
					var elParent = $(this).parent().parent();
					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
						if (ck) {
							return;
						}
					}
					
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//단일 라디오버튼 선택 (li 안에 input 한개, 두개)
				body.on("click",".radioStepOneBox label",function(){
					var ck = $(this).hasClass("on");
					
					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
					var elParent = $(this).parent().parent();
					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
						if (ck) {
							return;
						}
					}
					
					$(this).parent().parent().find("label").removeClass("on");
					$(this).parent().parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//다중 라디오버튼 선택
				body.on("click",".multiCheckBox label",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					
					//2016.03.21 수정, 다중선택에서 최소 하나는 disable되지 않도록 변경
					if ($(".multiCheckBox .on").length == 0) {
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}
					
			    });
				
				//하단 패밀리사이트
				body.on("click","#bottomService",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$("#bottomServiceLayer").show();
					}else{
						$(this).removeClass("on");
						$("#bottomServiceLayer").hide();
					}
				});
				
				//통계메뉴바 자동 닫기
				body.on("click",".menuAutoClose label",function(){
					var ck = $(this).hasClass("on");
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//통계버튼창 드래그
				var top = $(".buttonBar").offset().top - 104;
				$(".buttonBar").draggable({
					//containment : "parent"
					start : function(e, ui) {
						var left = $(".sqListBox.sq03").offset().left;
						if (!$(".sideQuick.sq03").hasClass("dragStart") && parseInt(left) < 0) {
							$(".sqListBox.sq03").hide();
						}
						$(".sideQuick.sq03").addClass("dragStart");
						$(".sqListBox.sq03").stop().animate({"left":"0px"},0);
					}
				});
				$(".sqListBox > .sqTabs").dblclick(function() {
					$(".buttonBar").animate({"left":"0px","top":""+top+""}, 50);
					if ($(".sideQuick.sq03").hasClass("dragStart")) {
						$(".sideQuick.sq03").removeClass("dragStart");
					}
				});
			},
			
			/**
			 * 
			 * @name         : stepCloseAnimate
			 * @description  : 왼쪽 메뉴 닫기 애니메이션.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 김성현
			 * @param : inx, type (check : 통계메뉴바 자동닫기 체크,		 pass : 강제 닫기) 
			 * @history 	 :
			 */
			stepCloseAnimate : function(inx, type){  
				if(type == "check") {
					//통계메뉴바 자동 닫기 선택이 안되어 있을 경우
					if($("#menuAutoClose_radio").attr("checked") != "checked") {
						return;
					}
				}
			    var time = 300;
			    var fx = '.quickBox'; 
			    var btn = '.sideQuick.sq02';
			    $(fx).queue("step04", function(){ 
			    	$(btn).stop().animate({"left":"840px"},time);
			        $(fx+'.step04').animate({"left":"-280px"}, time);    
			    }); 
			    $(fx).queue("step03", function(){
			        $(fx+'.step04').css({"left":"-280px"});
			        $(btn).stop().animate({"left":"560px"},time);
			        $(fx+'.step03').animate({"left":"-280px"}, time);    
			    }); 
			    $(fx).queue("step02", function(){
			        $(fx+'.step04, '+fx+'.step03').css({"left":"-280px"});
			        $(btn).stop().animate({"left":"280px"},time);
			        $(fx+'.step02').animate({"left":"-280px"}, time);
			        $(".quickBox.step02").removeClass("join");
			    }); 
			    $(fx).queue("step01", function(){
			        $(fx+'.step04, '+fx+'.step03, '+fx+'.step02').css({"left":"-280px"});
			        $(btn).stop().animate({"left":"0"},time).removeClass("on");
			        $(fx+'.step02').animate({"left":"-1120px"}, time);
			        $(fx+'.step01').animate({"left":"-280px"}, time);
			        $(btn).find("span").show();
			        $(btn).css("width","90px");
			        $(".shadow").hide();
			    }); 
			    $(fx).dequeue("step0"+inx); 
			},
			
			/**
			 * 
			 * @name         : slideValue
			 * @description  : 슬라이드 바 컨트롤.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			slideValue : function(selector) { 
			    $(selector).slider({ 
			        min: 1,
			        max: 3
			    });
			    $(selector).slider("value", 2);
			},
			
			/**
			 * 
			 * @description  : 통계버튼 그라데이션 효과.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			dragAppend : function(selector, bgColor) {
				$(selector).css("background-color", bgColor);
				$(selector).addClass("M_on");
			},
			dragAnimate : function(btn_id, bgColor) {
				var selector = $("#"+btn_id);
				this.dragAppend(selector, bgColor);
			}
	};
	
}(window, document));