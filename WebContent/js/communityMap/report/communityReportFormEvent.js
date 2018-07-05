(function(W, D) {
	W.$communityMap = W.$communityMap || {};
	W.$communityMap.report = W.$communityMap.report || {}
	$communityMap.report.event = {
		/**
		 * @name         : show
		 * 
		 * @description  : 보이기
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 * @param id     : html id
		 */
		show : function(id){
			$("#"+id+"_show").hide();
			$("#"+id).show();
		},
		/**
		 * @name         : hide
		 * @description  : 숨기기
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 * @param id     : html id
		 */
		hide : function(id){
			$("#"+id).hide();
			$("#"+id+"_show").show();
		},
		/**
		 * @name         : reportPrint
		 * @description  : 프린트
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
 		reportPrint : function() {
 			//메모가 없을경우 숨김
 			if(!W.opener.$houseAnalysisMap.ui.hasText($("#memo").val())){
 				$("#memoDiv").hide();
 			}
			$(".pntBtn").hide();
			$(".pntCloseBtn").hide();
			$(".pntShowBtn").hide();
			window.focus();
 			window.print();
 			setTimeout(function(){
 				self.close();
 			}, 1);
 		},
 		/**
		 * @name         : getToday
		 * @description  : 오늘날짜 가져오기
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
		getToday : function() {
			var today = new Date();
 			var y = today.getFullYear();
 			var m = today.getMonth()+1;
 			var d = today.getDate();
 			var h = today.getHours();
 			var mn = today.getMinutes();
 			
 			var returnDate = "";
 			if(m < 10) {
 				m = "0" + m;
 			}
 			if(d < 10) {
 				d = "0" + d;
 			}
 			if(h < 10) {
 				h = "0" + h;
 			}
 			if(mn < 10) {
 				mn = "0" + mn;
 			}
 			returnDate = y + "년 " + m + "월 " + d + "일 " + h + "시 " + mn + "분";
 			
 			return returnDate;
		},
		/**
		 * @name         : chartToImage
		 * @description  : 차트를 이미지로 변환
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 * @param srcDiv : 복사할 차트 공간
		 * @param dscDiv : 붙여넣을 차트 공간
		 */
		chartToImage : function(srcDiv, dscDiv) {
			var chart = srcDiv.highcharts();
			//mng_s 20171218 주용민
//			var render_width = dscDiv.width();
//			var render_height = Math.max(dscDiv.height(),srcDiv.height());
//		    dscDiv.height(render_height);
		    var svg = chart.getSVG({
		        exporting: {
//		        	sourceWidth:  chart.chartWidth(),
		            sourceWidth:  dscDiv.width(),
		            sourceHeight: chart.chartHeight
		        }
		    });

		    dscDiv.empty();
		    var image = document.createElement('img');
//		    image.height = render_height;
//		    image.width = render_width;
		    //mng_e 20171218 주용민
		    dscDiv.append(image);
		    $(image).attr("src",'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))));
		}
	};
}(window, document));