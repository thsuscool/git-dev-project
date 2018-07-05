/**
 * 통계소통지도의 데이터 보드에 대한 클래스
 * 
 * history : (주)유코아시스템, 1.0, 2016/06/22  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$communityDataBoard = W.$communityDataBoard || {};
	$(document).ready(function() {
		$communityDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
	});
	$communityDataBoard.ui = {
		iconData : null,//아이콘 데이터
		regionData : null,//지역 데이터
		mapData : null,//지도 통계 데이터
		regionIconData : null,//모든 지역 데이터
		data : {
			sidoData : null,
			sggData : null,
			emdongData : null
			
		},
		/**
		 * @name        : stat
		 * @description : 통계 데이터 셋팅
		 * @date        : 2016. 09. 06. 
		 * @author      : 나광흠
		 * @history     :
		 */
		stat: function(){
			this.search("region");
			this.search("region_icon");
		},
		/**
		 * @name        : setMapstatChartData
		 * @description : 지도 통계 데이터 셋팅
		 * @date        : 2016. 09. 06. 
		 * @author      : 나광흠
		 * @history     :
		 * @param res   : response
		 */
		setMapstatChartData : function(res){
			$("#barChartTable").empty();
			$communityDataBoard.ui.mapData = [];
			var total=0;
			var tableData = [];
			$.each(res.result,function(cnt,node){
				var data = $.isNumeric(node[res.showData])?parseInt(node[res.showData]):0;
				total+=data;
				if(node.adm_cd.length>7){
					$communityDataBoard.ui.mapData.push([node.adm_cd,data]);
				}else{
					$communityDataBoard.ui.mapData.push([node.adm_nm,data]);
				}
			});
			if($communityDataBoard.ui.mapData.length>0){
				$("dt[data-id=map-chart],dd[data-id=map-chart]").show();
				var height = res.result.length * 20;
				if (height < 303) {
					height = 303;
				}
				$("#map-stat .chart").height(height);
				$communityDataBoard.ui.chart("map",res.result[0].data_nm,res.unit);
				$.each($communityDataBoard.ui.mapData,function(cnt,node){
					var rate = (node[1] / total * 100).toFixed(1);
					tableData.push({item:node[0],value:node[1],rate:$.isNumeric(rate)?parseFloat(rate):0});
				});
				if(tableData){
					tableData.sort(function(a, b){
			 			var x = Number(a.value);
			 			var y = Number(b.value);
			 			if (x > y) return -1;
			 			if (x < y) return 1;
			 			return 0;
			 		});
					$.each(tableData,function(cnt,node){
						$("#barChartTable").append(
							$("<tr/>").append(
								$("<td/>",{"class":"al","style":"text-align:center;","text":node.item}),	
								$("<td/>",{"style":"text-align:center;","text":(cnt+1)}),	
								$("<td/>",{"style":"text-align:center;","text":appendCommaToNumber(node.value)}),	
								$("<td/>",{"style":"text-align:center;","text":node.rate})	
							)	
						);
					});
				}
			}else{
				$("dt[data-id=map-chart],dd[data-id=map-chart]").hide();
				$communityDataBoard.ui.mapData = null;
			}
		},
		/**
		 * @name		    : search
		 * @description     : 통계 검색
		 * @date		    : 2016. 09. 06. 
		 * @author		    : 나광흠
		 * @history 	    :
		 * @param stat_type : 검색 타입
		 */
		search : function(stat_type){
			var abs = new sop.portal.absAPI();
			var parameters = {
				cmmnty_map_id:$communityMapCommon.getParameter("cmmnty_map_id"),
				stat_type:stat_type,
				bnd_year:bndYear
			};
			$.each($("#"+stat_type+"-stat-search-form").serializeArray(),function(cnt,node){
				if(node.value!=undefined&&node.value.replace(/ /gi,"")!=""){
					parameters[node.name] = node.value;
				}
			});
			$.ajax({
				type: "POST",
				url: contextPath+"/ServiceAPI/community/communityPoiStats.json",
				data:parameters,
				dataType: "json",
				async : true,
				beforeSend: function(){
					abs.onBlockUIPopup();
				},
				success: function(res) {
					if(res.errCd=="0"){
						if(/^region$|^icon$/.test(stat_type)){
							var data = [],head = [];
							$("#"+stat_type+"-stat .table thead tr,#"+stat_type+"-stat .table tbody tr").empty();
							$.each(res.result.stats,function(cnt,node){
								if(stat_type=="region"){
									var symbolImg,symbolImgSize;
									if(res.result.community.reg_symbol){
										symbolImg = "/img/community/iconset_"+res.result.community.reg_symbol+node.order+".png";
										var img = new Image();
										img.onload = function() {
											symbolImgSize = "width:"+this.width+"px;height:"+this.height+"px;";
										}
										img.src = contextPath+symbolImg;
									}else{
										symbolImg = node.path_nm+"/thumbnail/thumbnail-XS-"+node.save_file_nm;
										symbolImgSize = "width:23px;height:28px;";
									}
									$("#"+stat_type+"-stat .table thead tr").append($("<th/>",{"scope":"col","style":"padding:5px 0;"}).append($("<img/>",{"src":contextPath+symbolImg,"alt":"","style":symbolImgSize}),$("<p/>",{"text":node.label_nm})));
								}else{
									$("#"+stat_type+"-stat .table thead tr").append($("<th/>",{"scope":"col","text":node.label_nm}));
								}
								data.push([node.label_nm,node.cnt]);
								head.push(node.label_nm);
								$("#"+stat_type+"-stat .table tbody tr").append($("<td/>",{"text":node.cnt}));
							});
							$("#"+stat_type+"-stat .table table").attr("summary",head.join());
							$communityDataBoard.ui[stat_type+"Data"] = data;
							$communityDataBoard.ui.chart(stat_type,"","개");
						}else if(stat_type=="region_icon"){
							$communityDataBoard.ui.regionIconData = res.result;
							$communityDataBoard.ui.createAllDataTable();
						}
					}else{
						$communityMapCommon.alert("알림",res.errMsg);
					}
				},
				error: function(xhr, status, errorThrown) {
					if(xhr.status=="412"){
						$communityMapCommon.alert("알림","파라미터값이 잘못되었습니다.");
					}else{
						$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.");
					}
				}
			}).always(function(){
				abs.onBlockUIClose();
			});
		},
		/**
		 * @name		    : chart
		 * @description     : 차트 값 셋팅
		 * @date		    : 2016. 09. 06. 
		 * @author		    : 나광흠
		 * @history 	    :
		 * @param stat_type : 검색 타입
		 * @param data_nm   : 데이터 이름
		 * @param unit      : 단위
		 */	
		chart : function(stat_type,data_nm,unit){
			if($("#"+stat_type+"-stat .chart").highcharts()){
				$("#"+stat_type+"-stat .chart").highcharts().destroy();
			}
			var chart = {
				line : {
					type : "line"
				},
				bar : {
					type: "bar"
				},
				column : {
					type: "column"
				},
				pie : {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: "pie"
				},
				spider : {
					polar: true,
					type : "line"
				}
			}
			var series = {
				data: $communityDataBoard.ui[stat_type+"Data"],
				min:0
			};
			if($communityDataBoard.ui[stat_type+"Data"].length<5){
				series.pointWidth = 50;
			}
			var chartType = $("#"+stat_type+"-stat .chart-type>li.M_on>a").data("value");
			$("#"+stat_type+"-stat .chart").highcharts({
				chart:$.extend({height:$("#"+stat_type+"-stat .chart").height()},chart[chartType?chartType:"bar"]),
				title: {
					text: ""
				},
				subtitle: {
					text: ""
				},
				xAxis: {
					type: "category"
				},
				yAxis: {
					title: ""
				},
				legend: {
					enabled: false
				},
				exporting: {
					buttons: {
						contextButton: {
							enabled: false
						}
					}
		        },
				tooltip: {
					formatter : function(){
						var header = "";
						var pointer = "";
						if(chartType=="pie"){
							header = '<div><span style="font-size:10px">'+this.key+'</span></div>';
							pointer+='<div>';
							pointer+=(data_nm?'<span style="color:'+node.series.color+'">'+data_nm+'</span> : ':"");
							pointer+=appendCommaToNumber(this.y);
							pointer+=(unit?' '+unit:unit);
							pointer+='</div>';
						}else{
							header = '<div><span style="font-size:10px">'+this.points[0].key+'</span></div>';
							$.each(this.points,function(cnt,node){
								pointer+='<div>';
								pointer+=(data_nm?'<span style="color:'+node.series.color+'">'+data_nm+'</span> : ':"");
								pointer+=appendCommaToNumber(this.y);
								pointer+=(unit?' '+unit:unit);
								pointer+='</div>';
							});
						}
						return header+pointer;
					},
					shared: true,
					useHTML: true
				},
				series: [series]
			});
		},
		/**
		 * @name		 : createAllDataTable
		 * @description  : 모든데이터표 값 셋팅. 
		 * @date		 : 2016. 09. 06. 
		 * @author		 : 나광흠
		 * @history 	 :
		 */	
		createAllDataTable:function(){
			if($communityDataBoard.ui.regionIconData){
				var regionType = $("#region-type>li.M_on>a").data("region-type");
				var regionColspan = 1;
				if(regionType=="sgg"){
					regionColspan = 2;
				}else if(regionType=="emdong"){
					regionColspan = 3;
				}
				var table = $("<table/>",{"border":"1"});
				var thead = $("<thead/>");
				var theadTr = $("<tr/>").append($("<th/>",{"text":"지역","scope":"col","colspan":regionColspan}));
				var tbody = $("<tbody/>");
				var summary = ["지역"];
				$.each($communityDataBoard.ui.regionIconData.symbolInfo,function(){
					var symbolImg;
					if($communityDataBoard.ui.regionIconData.community.reg_symbol){
						symbolImg = "/img/community/iconset_"+$communityDataBoard.ui.regionIconData.community.reg_symbol+this.order+".png";
					}else{
						symbolImg = this.path_nm+"/thumbnail/thumbnail-XS-"+this.save_file_nm;
					}
					theadTr.append($("<th/>",{"scope":"col"}).append($("<img/>",{"src":contextPath+symbolImg,"alt":"","style":$communityMapCommon.hasText(communityMapInfo.reg_symbol)?"":"width:23px;height:28px;"}),$("<p/>",{"text":this.label_nm})));
					summary.push(this.label_nm);
				});
				if(Object.keys($communityDataBoard.ui.regionIconData.stats).length>0){
					$.each($communityDataBoard.ui.regionIconData.stats,function(sidoCnt,sidoNode){
						if(regionType=="sido"){
							var tr = $("<tr/>");
							tr.append($("<th/>",{"text":sidoNode.nm}));
							$.map($communityDataBoard.ui.regionIconData.symbolInfo,function(value,key){
								tr.append($("<td/>",{"text":appendCommaToNumber(sidoNode.symbol[key].cnt)}));
							});
							tbody.append(tr);
						}else{
							if(regionType=="sgg"){
								$.each(sidoNode.children,function(sggCnt,sggNode){
									var tr = $("<tr/>")
									if(sggCnt==0){
										tr.append($("<th/>",{"text":sidoNode.nm,"rowspan":sidoNode.children.length}));
									}
									tr.append($("<th/>",{"text":sggNode.nm}));
									$.map($communityDataBoard.ui.regionIconData.symbolInfo,function(value,key){
										tr.append($("<td/>",{"text":appendCommaToNumber(sggNode.symbol[key].cnt)}));
									});
									tbody.append(tr);
									$communityDataBoard.ui.data.sggData = {
											//sggNode : {sidoNode,sggNode} //20170331 페이지 로딩시 에러나서 일단 아래처럼 수정함. 내용은 모름
											sggNode : sggNode
									}
								});
							}else if(regionType=="emdong"){
								var sidoRowspan = 0;
								$.each(sidoNode.children,function(sggCnt,sggNode){
									sidoRowspan += sggNode.children.length;
								});
								$.each(sidoNode.children,function(sggCnt,sggNode){
									$.each(sggNode.children,function(emdongCnt,emdongNode){
										var tr = $("<tr/>");
										if(emdongCnt==0){
											if(sggCnt==0){
												tr.append($("<th/>",{"text":sidoNode.nm,"rowspan":sidoRowspan}));
											}
											tr.append($("<th/>",{"text":sggNode.nm,"rowspan":sggNode.children.length}));
										}
										tr.append($("<th/>",{"text":emdongNode.nm}));
										$.map($communityDataBoard.ui.regionIconData.symbolInfo,function(value,key){
											tr.append($("<td/>",{"text":appendCommaToNumber(emdongNode.symbol[key].cnt)}));
										});
										tbody.append(tr);
										$communityDataBoard.ui.data.emdongData = {
												 //20170331 페이지 로딩시 에러나서 일단 아래처럼 수정함. 내용은 모름
												/*
												emdongNode : {
													sidoNode,
													sggNode,
													emdongNode
												}
												*/
												emdongNode : emdongNode
										}
									});
								});
							}
						}
						$communityDataBoard.ui.data.sidoData = {
								sidoNode : sidoNode
						}
					});
				}else{
					tbody.append($("<tr/>").append($("<td/>",{"text":"데이터가 존재하지 않습니다","colspan":Object.keys($communityDataBoard.ui.regionIconData.symbolInfo).length+1})))
				}
				$("#data-header thead,#data-body tbody").remove();
				$("#data-header,#data-body").attr("summary",summary.join());
				$("#data-header").append(thead.append(theadTr));
				$("#data-body").append(tbody);
				$("#region-all-data-table>.scrolls").mCustomScrollbar("update");
				$("#region-all-data-table>.scrolls").mCustomScrollbar("scrollTo", "top", {
					scrollInertia: 0
				});
			}
		}
	};
	

	$communityDataBoard.event = {
		/**
		 * @name		 : $communityDataBoard.event.setUIEvent
		 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date		 : 2016. 06. 22. 
		 * @author		 : 나광흠
		 * @history 	 :
		 */	
		setUIEvent : function() {
			var body = $("body");
			
			//투명도 설정 바
			$("#dataSlider").slider({
				range: "min",
				min: 5,
				max: 10,
				value: 10,
				slide: function( event, ui ) {  //ui.value
					$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value*0.1);
				}
			});
			$(".dataSideBox, .interactiveDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
			
			//닫기 버튼
			body.on("click",".dataSideBox .bar>a",function(){ 
				$(".dataSideBox").stop().animate({"right":"-1500px"},200);
				$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
			});
			
			//탭 열고 닫기
			body.on("click",".dscList dt>a",function(){
				var ck = $(this).hasClass("on");
				if(!ck){
					$(this).addClass("on");
					$(this).parents("dt").next("dd").show();
					$(".dataSideScroll").mCustomScrollbar("scrollTo","#"+$(this).attr("id"));
				}else{
					$(this).removeClass("on");
					$(this).parents("dt").next("dd").hide();
				}
			});
			
			//데이터보드 열고 닫기
			body.on("click",".interactiveDataBoard",function(){
				if(!$(this).hasClass("on")){
					//일반 데이터보드
					$(".dataSideBox").stop().animate({"right":"0"},200);
					$(".interactiveDataBoard").addClass("on").stop().animate({"right":"426px"},200);
				}else{
					//데이터보드 닫기
					$(".dataSideBox").stop().animate({"right":"-1500px"},200);
					$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
				}
			});
			
			//통계 검색 바꾸기
			body.on("click","#poi-search-stat-type a",function(){
				$("#poi-search-stat-type a").removeClass("on");
				$(this).addClass("on");
				$("#poi-stat-region-box,#poi-stat-icon-box").hide();
				$("#poi-stat-"+$(this).data("value")+"-box").show();
				$("#poi-stat-search-form").submit();
				return false;
			});
			
			//지역 검색 이벤트
			$("#region-stat-search-form").submit(function(){
				$communityDataBoard.ui.search($(this).attr("id").substring(0,$(this).attr("id").indexOf("-")));
				return false;
			});
			
			//차트 탭 이벤트
			$("#region-stat .chart-type>li>a").click(function(){
				$(this).parents(".chart-type").children("li").removeClass("M_on");
				$(this).parent("li").addClass("M_on");
				if($(this).data("value")=="all-data"){
					$("#"+$(this).data("type")+"-chart").hide();
					$("#"+$(this).data("type")+"-all-data-table").show();
				}else{
					$("#"+$(this).data("type")+"-chart").show();
					$("#"+$(this).data("type")+"-all-data-table").hide();
					$communityDataBoard.ui.chart($(this).data("type"),"","개");
				}
				return false;
			});
			//모든데이터표 하위 이벤트
			$("#region-type a").click(function(){
				$("#region-type li").removeClass("M_on");
				$(this).parent("li").addClass("M_on");
				$communityDataBoard.ui.createAllDataTable();
				$("#region-all-data-table").show();
				return false;
			});
			//표보기, 차트보기
			body.on("click",".typeBox>a",function(){ 
				$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
				$(this).addClass("on");
				var ck = $(this).index(".typeBox>a")+1;
				$(this).parents(".compareBox").eq(0).find(".chart").css("position","absolute");
				$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
				if(ck%2){
					$(this).parents(".compareBox").eq(0).find(".chart").css("position","static");
					$(this).parents(".compareBox").find(".normalBox").show();
				}else{
					$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
					$(this).parents(".compareBox").find(".normalBox").hide();
				}
		    });
		}
	};
}(window, document));