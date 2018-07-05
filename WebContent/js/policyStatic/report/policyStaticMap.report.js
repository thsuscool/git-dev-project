/**
 * 살고싶은 우리동네 보고서
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2017/01/31  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyStaticMap = W.$policyStaticMap || {};
	$(document).ready(function(){
		if (W.opener.$(".combineMap").is(":visible")) {
			W.opener.$policyStaticCombineMap.ui.reportLoad();
		}else {
			W.opener.$policyStaticMap.ui.reportLoad();
		}
	});
	$policyStaticMap.report = {
		/**
		 * @name         : setData
		 * @description  : 보고서를 설정한다.
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
		setData : function(data) {
			$("#mask").remove();
			switch(data.type) {
				case "normal":
					$("#demandMapDiv").show();
					$("#demandChartDiv").show();
					$("#demandTableDiv").show();
					break;
				case "combine":
					$("#policyMapDiv_report").show();
					$("#demandChartDiv").show();
					$("#demandTableDiv").show();
					break;
			}
			
			this.setMainReportInfo();
			this.setLegend(data);
			this.drawMap(data);		
			this.setChart(data);
			this.setGrid(data);
			
		},
		
		setMainReportInfo : function() {
			if (W.opener) {
				//보고서명
				var title = W.opener.$("#sTitle").html();
				if (title.indexOf("&gt;") != -1) {
					title = $.trim(title.split("&gt;")[1]);
				} 
				$("#policyTitle").html(title);
				
				//대상지역
				var region = W.opener.$("#regionTitleDB").html();
				$("#targetArea").html(region);
				
				//작성일자
				var date = $policyStaticMap.report.util.getToday();
				$("#datePolicy").html(date);
				
				//출처
				var origin = W.opener.$("#dataA_originDB").html();
				var origin2 = W.opener.$("#dataB_originDB").html();
				var html = origin + "<br>" + origin2;
				$("#policyOrigin").html(html);
				$("#policyInfo").show();
			}
			
		},
		
		/**
		 * @name           : drawMap
		 * @description    : 보고서의 지도화면을 생성한다.
		 * @date           : 2017. 01. 31. 
		 * @author	       : 나광흠
		 * @param mapId    : 지도 아이디
		 * @param reportId : 보고서에 들어갈 아이디
		 */
		drawMap : function(data) {
			var originWidth = data.mapWidth;
			var originHeight = data.mapHeight;
			var rate = originWidth/originHeight;
			var height = 472;
			var width = parseInt(height*rate);

			var reportMapCss = {
 	 				"width" : width+"px",
	 	 			"height" : height+"px",
	 	 			"overflow":"hidden"
 	 		};
			
			var id = "#staticMapDiv_"; 
			switch(data.type) {
				case "normal":
					id = "#staticMapDiv_"; 
					break;
				case "combine":
					id = "#policyMapDiv_"; 
					break;
			}
			
			for (var i=0; i<data.mapData.length; i++) {
				var mapData = data.mapData[i];
				$(id+(i+1)).attr("src", mapData);
				$(id+(i+1)).css(reportMapCss);
			}
		},
		/**
		 * @name         : setLegend
		 * @description  : 보고서의 범례를 설정한다.
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
		setLegend : function(data) {
			if (W.opener.$policyStaticMap) {
				var mapList = null;
				var legendId = "#legend_";
				switch(data.type) {
					case "normal":
						legendId = "#legend_";
						mapList = W.opener.$policyStaticMap.ui.mapList;
						break;
					case "combine":
						legendId = "#legend2_";
						mapList = W.opener.$policyStaticCombineMap.ui.mapList;
						break;
				}
				if (mapList != null) {
					for (var i=0; i<mapList.length; i++) {
						var map = mapList[i];
						var mapId = map.id + 1;
						var legend = $(map.legend.legendObj).clone().removeClass("min");
						$(legendId+mapId).append($(legend).html());
						$(legendId+mapId).find(".legendBox").removeClass("min");
						$(legendId+mapId).find(".legendRound").hide();
						$(legendId+mapId).find(".lgListBox").hide();
						$(legendId+mapId).find(".legendRrefresh").css("right", "13px");
					}
				}
			}	
		},
		/**
		 * @name         : setChart
		 * @description  : 보고서의 차트를 설정한다.
		 * @date         : 2017. 02. 01. 
		 * @author	     : 나광흠
		 */
		setChart : function(data){
			for (var i=0; i<data.chart.length; i++) {
				var chartImg = data.chart[i].data;
				$("#policyDetailChart").attr("src", chartImg);
			}
		},
		
		setGrid : function(data) {
			var grid = data.grid;
			$("#policyDetailTable").html(grid.html());
		}
	};
}(window, document));