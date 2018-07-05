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
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$(document).ready(function(){
		$houseAnalysisMap.report.setData();
	});
	$houseAnalysisMap.report = {
		/**
		 * @name         : setData
		 * @description  : 보고서를 설정한다.
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
		setData : function() {
			this.drawMap("1","reportMapDiv");//지도생성
			this.setChart();//차트생성
			$("#stand-location").text("기준지역 : "+W.opener.$houseAnalysisMap.search.getRecommendObject().now_name);
			$("#inter-location").text("관심지역 : "+W.opener.$houseAnalysisMap.search.getRecommendObject().inter_name);
			$("#date").text($houseAnalysisMap.report.util.getToday());//작성일자 셋팅
			$("body").removeClass("loading");
			$("#mask").remove();
			$("#wrap").show();
		},
		/**
		 * @name           : drawMap
		 * @description    : 보고서의 지도화면을 생성한다.
		 * @date           : 2017. 01. 31. 
		 * @author	       : 나광흠
		 * @param mapId    : 지도 아이디
		 * @param reportId : 보고서에 들어갈 아이디
		 */
		drawMap : function(mapId,reportId) {
			if(W.opener){
				var clone = W.opener.$("#mapRgn_"+mapId).clone();
				var originWidth = W.opener.$("#mapRgn_"+mapId).width();
				var originHeight = W.opener.$("#mapRgn_"+mapId).height();
				var w = $(".pntMap").width();
				var h = $(".pntMap").height();
				
				//지도 크기, 배율 설정
				var scaleWidth = (w / originWidth) + 0.15;
				var scaleHeight = (h / originHeight);
				
				var reportMapCss = {
					"width" : originWidth+"px",
					"height" : originHeight+"px",
					"overflow":"hidden",
					"margin-left" : ((originWidth -w)*-1) / 2 + "px",
					"margin-top" : ((originHeight - h)*-1) / 2 + "px"
				};
				
				if(originWidth < w) {
					reportMapCss["transform"] = "scale("+scaleHeight+", "+scaleHeight+")";
				} else {
					reportMapCss["transform"] = "scale("+scaleWidth+", "+scaleHeight+")";
				}
				
				$(clone).find(".sop-control").hide();
				
				$("#"+reportId).html($(clone).html());
				$("#"+reportId).css(reportMapCss);
				
				//열지도의 경우, 
				//canvas에 열지도를 그리는 것이라 html을 clone할 때,
				//데이터는 복사되지 않아 그려지지 않는다.
				//따라서 기존의 canvas를 다시 redraw하여 표출한다.
				if ($(clone).find(".sop-heatmap-layer").length) {
					var originCanvas = $(W.opener.document).find(".sop-heatmap-layer")[0]
					var image = new Image();
					image.src = originCanvas.toDataURL("image/png");
					
					var canvas = $(".sop-heatmap-layer")[0];
					if (canvas != undefined) {
						canvas.width = image.width;
						canvas.height = image.height;
						canvas.getContext("2d").drawImage(image, 0, 0);
					}
				}
				this.setLegend(mapId);//범례생성
			}else{
				alert("비정상적인 접근입니다");
				self.close();
			}
		},
		/**
		 * @name         : setLegend
		 * @description  : 보고서의 범례를 설정한다.
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
		setLegend : function(mapId) {
			var map = W.opener.$houseAnalysisMap.ui.mapList[parseInt(mapId)-1];
			var legend = $(map.legend.legendObj).clone().removeClass("min");
			$("#legend_"+mapId).append($(legend).html());
			$("#legend_"+mapId).find(".legendBox").removeClass("min");
			$("#legend_"+mapId).find(".legendRound").hide();
			$("#legend_"+mapId).find(".lgListBox").hide();
			$("#legend_"+mapId).find(".legendRrefresh").css("right", "13px");
		},
		/**
		 * @name         : setChart
		 * @description  : 보고서의 차트를 설정한다.
		 * @date         : 2017. 02. 01. 
		 * @author	     : 나광흠
		 */
		setChart : function(){
			$("#pntIndicator").html("<ul class='indexfine'></ul>")
			$("#pntIndicator > ul").append(W.opener.$(".dataBoardDiv .dscList .indexfine").html());
			$("#pntIndicator").children(".indexfine").css({
						"overflow":"visible",
						"height":"auto"
					});

			//alert(W.opener.$("#interestList").html());

			W.opener.$("#interestList a.recommend-area").each(function (index){
				$("#pntList .List").append("<a>" + $(this).html() + "</a>");
	
			});
			
			//$("#pntList .List").children("img").remove();
		//	$("#pntList .List").append(W.opener.$("#interestList a.recommend-area").clone());
			if($("#pntList .List a").length>5){
				$("#pntList .List a").css({
					"width": "50%",
					"float": "left"
				});
			}
			var indicatorName = W.opener.$("#indicator-navigator .M_on .M_on").text().replace( /(^\s*)|(\s*$)/g,"" );
			$("#indicatorName h3").text("지표 현황 : "+indicatorName+" - 차트");
			$("#indicatorNameTable h3").text("지표 현황 : "+indicatorName+" - 표");
			var areaName = W.opener.$("#detailChart4 .M_on>a").text()+" ("+W.opener.$("#detailChart4 .M_on input:checked").parent().text().replace( /(^\s*)/g,"" )+")";
			$("#areaData h3").append(areaName+" - 차트");
			$("#smallLocationTable h3").append(areaName+" - 표");
			$houseAnalysisMap.report.util.chartToImage(W.opener.$("#detailChart1"), $("#pntDetailChart1"));
			$houseAnalysisMap.report.util.chartToImage(W.opener.$("#detailChart5"), $("#pntDetailChart5"));
			$houseAnalysisMap.report.util.chartToImage(W.opener.$("#detailChart4>div>ul>li.M_on .radio-chart"), $("#pntDetailChart4"));
			
			var spiederChart = W.opener.$houseAnalysisMap.databoard.data.spiderChart;
			$("#standardArea").append(" ("+spiederChart.compareSeries[0].adm_nm+")");
			$("#recommendArea").append(" ("+spiederChart.compareSeries[1].adm_nm+")");
			$.each(spiederChart.categories, function(cnt, node){	
				$("#pntDetailChart1_Table tbody:last").append('<tr><td>'+node+'</td><td>'+spiederChart.compareSeries[0].data[cnt]+'</td><td>'+spiederChart.compareSeries[1].data[cnt]+'</td></tr>');
			});
			
			var indicatorChart = W.opener.$houseAnalysisMap.databoard.data.indicatorChart;
			$("#indicatorValue").append(indicatorChart.standData.unit);
			$.each(indicatorChart.data,function(cnt,node){
				$("#pntDetailChart5_Table tbody:last").append('<tr><td>'+(node.name.split(';'))[0].replace("<br>","")+'</td><td>'+node.y+'</td></tr>')
			});
			
			var smallLocationChart = W.opener.$houseAnalysisMap.databoard.data.smallLocationChart;
			$("#small_recommendArea").append(" ("+smallLocationChart.series[0].name+")");
			$("#small_standardArea").append(" ("+smallLocationChart.series[1].name+")");
			$.each(smallLocationChart.categories,function(cnt,node){
				$("#pntDetailChart4_Table tbody:last").append('<tr><td>'+node+'</td><td>'+smallLocationChart.series[0].data[cnt]+'</td><td>'+smallLocationChart.series[1].data[cnt]+'</td></tr>')
			});
			
		}
	};
}(window, document));