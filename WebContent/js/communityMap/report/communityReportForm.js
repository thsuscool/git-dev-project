(function(W, D) {
	W.$communityMap = W.$communityMap || {}
	$(document).ready(function() {
		$communityMap.report.setData();
	});
	$communityMap.report = {
		map: null,
		datas: null,
		mapType: null,
		receiveLists: null,
		dataGeojson: [],
		/**
		 * @name         : setData
		 * @description  : 보고서를 설정한다.
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
		setData : function() {
			this.drawMap("1","reportMapDiv");//지도생성
			this.setChart();//차트생성
			$("#location").text(W.opener.$("#cmmnty_location").text().replace( /(^\s*)|(\s*$)/g,"" ));
			$("#date").text($communityMap.report.event.getToday());//작성일자 셋팅
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
		setLegend : function(data, options) {
			var map, legend, title, unit;
			if (window.opener.$communityMap != undefined) {
				map = W.opener.$communityMap.ui.mapList[data.id];
			}

			//소통지도
			if (this.mapType == "communityMap") {
				legend = $(map.legend.legendObj).clone().removeClass("min");
				if (legend.find("div[id^=legendBox_]").data("ing") != "hide") {
					if (data.param.isKosis != undefined && data.param.isKosis) {
						unit = data.data[0].UNIT;
					} else {
						unit = data.unit;
					}
					title = "범례 (단위 : " + unit + ")";
					$("#legend").append($(legend).html());
					$("#legendTitle").html(title);
					$("#legend").find(".legendBox").removeClass("min");
					$("#legend").find(".legendRound").hide();
					$("#legend").find(".lgListBox").hide();
					$("#legend").find(".legendRrefresh").css("right", "13px");
				} else {
					$("#communityMapRegion>.pntLeft").hide();
					$("#communityMapRegion>.pntRight").width("100%");
				}
			}

		},
		/**
		 * @name         : setChart
		 * @description  : 보고서의 차트를 설정한다.
		 * @date         : 2017. 02. 01. 
		 * @author	     : 나광흠
		 */
		setChart : function(){
			$("#searchItem").append(W.opener.$("#cmmntyMapNm").text());
			$("#cmmntyDataboardChart h3").append(W.opener.$("#region-stat .M_on a[data-type='region']").text());
			if(W.opener.$("#region-stat .M_on a").attr("id")=="allDataTable"){
				var alldata_sido = W.opener.$communityDataBoard.ui.data.sidoData;
				var alldata_sgg = W.opener.$communityDataBoard.ui.data.sggData;
				var alldata_emdong = W.opener.$communityDataBoard.ui.data.emdongData;
				$("#pntDataboardChart").append('<table><thead><tr></tr></thead><tbody><tr></tr></tbody></table>');
				var regionType = W.opener.$("#region-type>li.M_on>a").data("region-type");
				var regionColspan = 1;
				if(regionType=="sgg"){
					regionColspan = 2;
				}else if(regionType=="emdong"){
					regionColspan = 3;
				}
				var theadTr = $("#pntDataboardChart thead tr:last").append($("<th/>",{"text":"지역","scope":"col","colspan":regionColspan}));
				var data_iconSet = $.each(W.opener.$communityDataBoard.ui.regionIconData.symbolInfo,function(){
					var symbolImg;
					if(W.opener.$communityDataBoard.ui.regionIconData.community.reg_symbol){
						symbolImg = "/img/community/iconset_"+W.opener.$communityDataBoard.ui.regionIconData.community.reg_symbol+this.order+".png";
					}else{
						symbolImg = this.path_nm+"/thumbnail/thumbnail-XS-"+this.save_file_nm;
					}
					theadTr.append($("<th/>",{"scope":"col"}).append($("<img/>",{"src":contextPath+symbolImg,"alt":"","style":"width:23px;height:28px;"}),$("<p/>",{"text":this.label_nm})));
				}); 
				if(W.opener.$("#all_sido").parent().hasClass("M_on")){
					$.each(alldata_sido, function(cnt, node){
						data_iconSet;
						$("#pntDataboardChart tbody tr:last").append('<th>'+alldata_sido.sidoNode.nm+'</th>')
						$.map(W.opener.$communityDataBoard.ui.regionIconData.symbolInfo,function(value,key){
							$("#pntDataboardChart tbody tr:last").append($("<td/>",{"text":appendCommaToNumber(alldata_sido.sidoNode.symbol[key].cnt)}));
						});
					});
				}else if(W.opener.$("#all_sgg").parent().hasClass("M_on")){
					$.each(alldata_sgg, function(cnt, node){
						data_iconSet;
						$("#pntDataboardChart tbody tr:last").append('<th>'+alldata_sgg.sggNode.sidoNode.nm+'</th><th>'+alldata_sgg.sggNode.sggNode.nm+'</th>')
						$.map(W.opener.$communityDataBoard.ui.regionIconData.symbolInfo,function(value,key){
							$("#pntDataboardChart tbody tr:last").append($("<td/>",{"text":appendCommaToNumber(alldata_sgg.sggNode.sidoNode.symbol[key].cnt)}));
						});
					});
				}else if(W.opener.$("#all_emdong").parent().hasClass("M_on")){
					$.each(alldata_emdong, function(cnt, node){
						data_iconSet;
						$("#pntDataboardChart tbody tr:last").append('<th>'+alldata_emdong.emdongNode.sidoNode.nm+'</th><th>'+alldata_emdong.emdongNode.sggNode.nm+'</th><th>'+alldata_emdong.emdongNode.emdongNode.nm+'</th>')
						$.map(W.opener.$communityDataBoard.ui.regionIconData.symbolInfo,function(value,key){
							$("#pntDataboardChart tbody tr:last").append($("<td/>",{"text":appendCommaToNumber(alldata_emdong.emdongNode.emdongNode.symbol[key].cnt)}));
						});
					});
				}
				$("#pntDataboardChart table").css({"width":"100%","max-width":"100%;","border":"1px solid #dcdcdc"});
				$("#pntDataboardChart table th").css({"font-size":"15px","font-weight":"normal","background":"#f1f1f1","border":"1px solid #dcdcdc","height":"30px"});
				$("#pntDataboardChart table td").css({"font-size":"15px","font-weight":"normal","text-align":"center","border":"1px solid #dcdcdc","height":"30px"});
				$("#pntDataboardChart").css("height","auto");
			}else{
				$communityMap.report.event.chartToImage(W.opener.$("#region-stat #region-chart>.chart"), $("#pntDataboardChart"));//나머지 차트
			}
			//mng_s 20171218 주용민 
			//IE 보고서 무한로딩 수정
//			$("#pntDataboardTable").append(W.opener.$("#region-stat #region-chart>.table").clone());//기본의견테이블
			var table = W.opener.$("#region-stat #region-chart>.table").clone();
			var tableHtml = table[0].outerHTML;
			$("#pntDataboardTable")[0].innerHTML = tableHtml;
			//mng_e 20171218 주용민
			
			//통계리스트
			if(W.opener.$("#history-list input:checked").length<=0){
				$("#div_mapStatChart, #div_mapStatTable").hide();
			}else{
				$("#div_mapStatChart, #div_mapStatTable").show();
				$communityMap.report.event.chartToImage(W.opener.$(".dataBoardDiv #map-stat .normalBox .chart"),$("#pntStatList"))
				var tableHead = W.opener.$("#map-stat .tables>table>thead>tr>th");
				$("#pntStatTable").append("<thead><tr><th>"+tableHead[0].textContent+"</th><th>"+tableHead[1].textContent+"</th><th>"+tableHead[2].textContent+"</th><th>"+tableHead[3].textContent+"</th></tr></thead>")
				//mng_s 20171218 주용민 
				//IE 보고서 무한로딩 수정
//				$("#pntStatTable").append(W.opener.$(".dataBoardDiv #map-stat .tables #barChartTable").clone());
				var table = W.opener.$(".dataBoardDiv #map-stat .tables #barChartTable").clone()
				var tableHtml = table[0].outerHTML;
				$("#pntStatTable")[0].innerHTML = tableHtml;
				//mng_e 20171218 주용민
			}
			
			
			
		}
	}
}(window, document));