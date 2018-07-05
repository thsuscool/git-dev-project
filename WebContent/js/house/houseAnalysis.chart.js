/**
 * 살고싶은 우리동네 화면에 대한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2015/12/23  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	var toparchyChartStyle={//차트 기본 크기
		width:495,
		height:214
	};
	$houseAnalysisMap.chart = {
		/**
		 * @name                : spiderChart
		 * @description         : 스파이더 차트 그리기
		 * @date                : 2016. 08. 24.
		 * @author	            : 나광흠
		 * @history             :
		 * @param adm_cd        : 행정동 코드
		 * @param id            : html id
		 * @param listData      : 데이터
		 * @param bClassId      : 대분류
		 * @param categoriTitle : legend title
		 */
		spiderChart : function(adm_cd, id, listData, bClassId, categoriTitle){
			$.each(listData,function(cnt,node){
				node.data = new Array();
				node.name = node.adm_nm;
				node.pointPlacement = "on";
				$.map(node.list,function(v,k){
					node.data.push(v);
				});
			});
			function titleMove(e) {
				var title = this.legend.title;
				if(title){
					title.translate(0, 30);
				}
				$("#"+id+" .highcharts-axis-labels>span>span").click(function(){
					var bClass = $(this).data("id");
					$("#indicator-navigator a[data-m-class="+Object.keys(bClassInfoList[bClass].indicator)[0]+"]").trigger("click");
					return false;
				});
			}
			var tempCnt = 0;
			var tempTotalName = 0;
			var hichartOptions = {
				exporting: {
					buttons: {
						contextButton: {
							enabled: false
						}
					}
		        },
				chart: {
					polar: true,
					type: 'line',
					width: 530,
					height: 280,
					style:{
						overflow: 'visible'
					},
					events: {
						load: titleMove,
						redraw: titleMove
					}
				},
				title: {
					text: ''
				},
				pane: {
					size: '80%'
				},
				xAxis: {
					categories: [
						'자연',
						'주택',
						'지역 인구',
						'안전',
						'생활편의교통',
						'교육',
						'복지 문화'
					],
					tickmarkPlacement: 'on',
					lineWidth: 0,
					labels: {
						useHTML:true,
						formatter:function(){
							if(bClassId=="HML0001" && this.value == "자연"){
								return '<span class="Spider_default spider_on Spider_HML0001" data-id="HML0001">'+this.value+'</span>'
							}else if(bClassId=="HML0002" && this.value == "주택"){
								return '<span class="Spider_default spider_on Spider_HML0002" data-id="HML0002">'+this.value+'</span>'
							}else if(bClassId=="HML0003" && this.value == "지역 인구"){
								return '<span class="Spider_default spider_on Spider_HML0003" data-id="HML0003">'+this.value+'</span>'
							}else if(bClassId=="HML0004" && this.value == "안전"){
								return '<span class="Spider_default spider_on Spider_HML0004" data-id="HML0004">'+this.value+'</span>'
							}else if(bClassId=="HML0005" && this.value == "생활편의교통"){
								return '<span class="Spider_default spider_on Spider_HML0005" data-id="HML0005">'+this.value+'</span>'
							}else if(bClassId=="HML0006" && this.value == "교육"){
								return '<span class="Spider_default spider_on Spider_HML0006" data-id="HML0006">'+this.value+'</span>'
							}else if(bClassId=="HML0007" && this.value == "복지 문화"){
								return '<span class="Spider_default spider_on Spider_HML0007" data-id="HML0007">'+this.value+'</span>'
							}else{
								if(this.value == "자연"){
									return '<span class="Spider_default" data-id="HML0001">'+this.value+'</span>'
								}else if(this.value == "주택"){
									return '<span class="Spider_default" data-id="HML0002">'+this.value+'</span>'
								}else if(this.value == "지역 인구"){
									return '<span class="Spider_default" data-id="HML0003">'+this.value+'</span>'
								}else if(this.value == "안전"){
									return '<span class="Spider_default" data-id="HML0004">'+this.value+'</span>'
								}else if(this.value == "생활편의교통"){
									return '<span class="Spider_default" data-id="HML0005">'+this.value+'</span>'
								}else if(this.value == "교육"){
									return '<span class="Spider_default" data-id="HML0006">'+this.value+'</span>'
								}else if(this.value == "복지 문화"){
									return '<span class="Spider_default" data-id="HML0007">'+this.value+'</span>'
								} 
							}
						}
					}
				},
				yAxis: {
					gridLineInterpolation: 'polygon',
					lineWidth: 0,
					min: 0,
					max: 10,
					tickInterval: 1,
					labels: {
						enabled: false
					}
				},
				series:listData,
				plotOptions: {
		            series: {
		                events: {
		                    legendItemClick: function () {
		                       return false;
		                    }
		                }
		            }
		        },
				tooltip: {
					headerFormat: '<div><span style="font-size:12px;">{point.key}</span><div/>',
					pointFormat: '<div><span style="font-size:11px;color:{series.color};padding:0">{series.name}: </span><span style="font-size:11px;font-weight: bold;">{point.y}</span></div>',
					shared: true,
					useHTML: true,
					percentageDecimals: 0,
					borderColor: "#f00",
					borderRadius: 0,
					borderWidth: 0,
					positioner: function () {
						if(null != this.chart && null != this.chart.hoverPoints && 0 != this.chart.hoverPoints.length){
							if(0 == this.chart.hoverPoints[0].index){//자연
								return { x: 10, y: 0 };
							}else if(1 == this.chart.hoverPoints[0].index){//주택
								return { x: 300, y: -20 };
							}else if(2 == this.chart.hoverPoints[0].index){//지역인구
								return { x: 300, y: 55 };
							}else if(3 == this.chart.hoverPoints[0].index){//안전
								return { x: 300, y: 120 };
							}else if(4 == this.chart.hoverPoints[0].index){//생활 편의 교통
								return { x: 10, y: 120 };
							}else if(5 == this.chart.hoverPoints[0].index){//교육
								return { x: 10, y: 55 };
							}else if(6 == this.chart.hoverPoints[0].index){//복지문화
								return { x: 10, y: -20 };
							}else{
								return { x: 0, y: 0 };	
							}
						}else{
							return { x: 0, y: 0 };
						}
		            }
				}
			};
			if($houseAnalysisMap.ui.hasText(categoriTitle)){
				hichartOptions.legend = {
					layout: 'horizontal',
					align: 'center',
					verticalAlign: 'bottom',
					floating: false,
					borderWidth: 1,
					itemMarginTop: -20,
					itemMarginBottom: 30,
					backgroundColor: '#FFFFFF',
					itemDistance:1,
					shadow: true,
					labelFormatter: function() {
						var tempName = this.name;
						if(listData.length > 2){
							tempTotalName = tempTotalName + this.name.length;
							if(tempCnt == 2){
								if(tempTotalName > 41){
									tempName = this.name.substr(0,(41-(tempTotalName-this.name.length)))+"..";
								}
							}
							tempCnt++;
							return tempName;
						}else{
							return this.name;
						}
					},
					title:{
						text:categoriTitle 
					},
					itemStyle: {
						fontSize: "10px"
					}
				};
			}
			$("#" + id).highcharts(hichartOptions);
		},
		/**
		 * 
		 * @name              : selectChartData
		 * @description       : 폴리곤을 오버했을 경우, 해당 차트데이터의 색상을 변경한다.
		 * @date              : 2016. 03. 07. 
		 * @author	          : 나광흠
		 * @history 	      :
		 * @param selectAdmCd : 행정동 코드
		 */
		selectChartData : function(selectAdmCd) {
			var bClass = $houseAnalysisMap.search.mapStat.indicator.b_class_idx_id;
			if($houseAnalysisMap.search.isIndicator==true&&$houseAnalysisMap.search.isShowDatabaord==true&&$houseAnalysisMap.search.isShowDatabaord&&bClass){
				var color = "rgb("+$houseAnalysisMap.databoard.bClassInfoList[bClass].rgbColor+")";
				var charts = $("#detailChart5").highcharts();
				$.each(charts.series[0].data,function(cnt,node){
					if(!/^<br>기준/.test(node.name)){
						var adm_cd_split = node.name.split(";");
						var maxLength = Math.max(selectAdmCd.length,adm_cd_split[1].length);
						if(adm_cd_split[1].substring(0,maxLength)==selectAdmCd.substring(0,maxLength)){
							if(node.color!="#FF0000"){
								node.update({ color: color });
							}
							charts.tooltip.refresh([node]);
						}else{
							if(node.color!="#ccc"&&node.color!="#FF0000"){
								node.update({ color: "#ccc" });
							}
						}
					}
				});
			}
		},
		/**
		 * 
		 * @name         : unSelectChartData
		 * @description  : 차트 전체의 색을 회색으로 변경
		 * @date         : 2016. 03. 07. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		unSelectChartData : function(){
			var charts = $("#detailChart5").highcharts();
			if(charts){
				$.each(charts.series[0].data,function(cnt,node){
					if(!/^<br>기준/.test(node.name)){
						if(node.color!="#ccc"&&node.color!="#FF0000"){
							node.update({ color: "#ccc" });
						}
					}
				});
				charts.tooltip.hide();
			}
		},
		/**
		 * @name               : indicatorChart
		 * @description        : 지역종합현황보기 스파이더 차트 그리기
		 * @date               : 2016. 07. 01.
		 * @author	           : 나광흠
		 * @history 	       :
		 * @param mClassObject : 중분류
		 */
		indicatorChart : function(mClassObject){
			$("#indicator-navigator>li,#indicator-navigator>li li").removeClass("M_on");
			$("#indicator-navigator>li[data-id="+mClassObject.b_class_idx_id+"]").addClass("M_on");
			$("#indicator-navigator>li[data-id="+mClassObject.b_class_idx_id+"] a[data-m-class="+mClassObject.m_class_idx_id+"]").parent().addClass("M_on");
			//기준지역 표시 유무
			var isSetStand = true;
			/**
			 * 기준 그래프 제외 대상
			 * 생활편의교통 
			 *      - 편의시설 수 : HMM0015
			 *      - 쇼핑시설 수 : HMM0016
			 *      - 외식시설 수 : HMM0017
			 *      - 잡화점 수 : HMM0033
			 * 교육 
			 *      - 고등교육기관 수 : HMM0021
			 *      - 학원 수 : HMM0022
			 * 복지문화 
			 *      - 문화시설 수 : HMM0027
			 *      - 체육시설 수 : HMM0027
			 */
			if(/^HMM00(15|16|17|21|22|27|33|34)$/.test(mClassObject.m_class_idx_id)){
				isSetStand = false;
			}
			$("#detailChart5-avg-text1,#detailChart5-avg-text2").empty().hide();
			var adm_cd = $houseAnalysisMap.search.activeAdmCd;
			var mapOption = $houseAnalysisMap.databoard.getMapOptions(adm_cd);
			var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
			var year = map.bnd_year,searchLevel;
			
			if(!$houseAnalysisMap.ui.hasText(mapOption.adm_cd)){
				searchLevel = 1;
			}else if(mapOption.adm_cd.length==2){
				searchLevel = 2;
			}else if(mapOption.adm_cd.length>=5){
				searchLevel = 3;
			}
			if(searchLevel>mClassObject.disp_level){
				searchLevel = mClassObject.disp_level;
			}
			setAvgText($("#detailChart5-avg-text2"),mClassObject,mapOption,year,searchLevel,"N",isSetStand);
			setIndicatorData(mClassObject,$houseAnalysisMap.search.isAbode?"00":$houseAnalysisMap.search.getRecommendObject().now_resid_sido_cd+$houseAnalysisMap.search.getRecommendObject().now_resid_sgg_cd,isSetStand,function(standResponse){
				var standData={};
				if($houseAnalysisMap.ui.hasText(standResponse.result.emdong)){
					standData = standResponse.result.emdong
				}else if($houseAnalysisMap.ui.hasText(standResponse.result.sgg)){
					standData = standResponse.result.sgg
				}else if($houseAnalysisMap.ui.hasText(standResponse.result.sido)){
					standData = standResponse.result.sido
				}else if($houseAnalysisMap.ui.hasText(standResponse.result.country)){
					standData = standResponse.result.country
				}
				$houseAnalysisMap.api.houseAnalysisOrderLists(searchLevel,mClassObject.b_class_idx_id,mClassObject.m_class_idx_id,year,mapOption.sido_cd,mapOption.sgg_cd,false,function(res){
					var data = [];
					var lineData = [];
					$.each(res.result,function(cnt,node){
						var short_adm_nm,y;
						if(mClassObject.b_class_idx_id=="HML0001"&&(mClassObject.m_class_idx_id=="HMM0001"||mClassObject.m_class_idx_id=="HMM0002")){
							y = parseFloat(node.z_score);
						}else{
							y = parseFloat(node.value);
						}
						data.push({
							name : node.short_adm_nm+";"+($houseAnalysisMap.ui.hasText(node.adm_cd)?node.adm_cd:"00"),
							y : y,
							color : (mapOption.adm_cd.substring(0,node.adm_cd.length)==node.adm_cd?"#FF0000":"#ccc")
						});
						lineData.push({
							y : parseFloat(standData.avg_value)
						});
					});
					var title;
					if(mClassObject.m_class_idx_id=="HMM0023"){
						title = "보육시설 대비 5세이하 인구 수";
					}else if(mClassObject.m_class_idx_id=="HMM0024"){
						title = "병의원 및 약국 대비 인구 수";
					}else if(mClassObject.m_class_idx_id=="HMM0025"){
						title = "노인복지시설 대비 65세 이상 인구 수";
					}else if(mClassObject.m_class_idx_id=="HMM0026"){
						title = "사회복지시설 대비 인구 수";
					}else{
						title = mClassObject.m_class_idx_nm;
					}
					data = data.sort(dynamicSort(($houseAnalysisMap.databoard.descIndicatorChart.indexOf(mClassObject.m_class_idx_id)>-1?"-":"")+"y"));
					var showLabelIndex;
					if(isSetStand){
						data.unshift({
							name : "<br>기준 : "+standData.adm_nm+";"+($houseAnalysisMap.ui.hasText(standData.adm_cd)?standData.adm_cd:"00"),
							y : parseFloat(standData.avg_value),
							color : "#0054FF"
						});
						lineData.unshift({
							y : parseFloat(standData.avg_value)
						});
						drawIndicatorChart(title, res.result[0].unit, data,{
							type: 'spline',
			                data: lineData,
			                lineColor : "#0054FF",
			                marker: {
			                	enabled: false
			                },
			                enableMouseTracking: false
						});
						$houseAnalysisMap.databoard.data.indicatorChart = {
							data : data,
							standData : standData
						}
					}else{
						drawIndicatorChart(title, res.result[0].unit, data,{});
					}
				});
			});
		},
		/**
		 * @name        : smallLocationChartBridge
		 * @description : 소지역정보 차트 그리기
		 * @date        : 2016. 07. 01.
		 * @author	    : 나광흠
		 * @history     :
		 * @param type  : age=(연령대별 인구),house=(주택종류),household=(자가/임차),company=(사업체 수)
		 */
		smallLocationChartBridge : function(type){
			if(type=="age"){//연령대별 인구
				getChartAdmCd(function(isSido,adm_cd){
					ageGroupChart(isSido,adm_cd);
				});
			}else if(type=="house"){//주택종류
				getChartAdmCd(function(isSido,adm_cd){
					houseChart(isSido,adm_cd);
				});
			}else if(type=="household"){//자가/임차
				getChartAdmCd(function(isSido,adm_cd){
					householdChart(isSido,adm_cd);
				});
			}else if(type=="company"){//사업체 수
				companyChart();
			}else{
				return;
			}
		}
	};
	/**
	 * @name                      : chart
	 * @description               : 차트 그리기
	 * @date                      : 2015. 12. 09.
	 * @author                    : 나광흠
	 * @history                   :
	 * @param dataName            : 데이터 이름
	 * @param unit                : 단위
	 * @param data                : 데이터 : [{name:"이름",y:"y축 값"}]
	 * @param lineData            : 선 데이터
	 */
	function drawIndicatorChart(dataName, unit, data, lineData) {
		var xAxisLabelIndex = 0;
		var xAxisCat = [];
		$.each(data,function(cnt,node){
			xAxisCat.push(node.name.split(";")[0]);
		});
		var datalength = data.length-1;
		var series = {
			data: data,
			type: "column",
			tooltip: {valueSuffix: ""}
		};
		var chartOption = {
			backgroundColor: 'white',
			width: toparchyChartStyle.width,
			height: toparchyChartStyle.height
		};
		var seriesArray;
		console.log(series);
		if($houseAnalysisMap.ui.hasText(lineData)){
			seriesArray = [series,lineData];
		}else{
			seriesArray = [series];
		}
		$("#detailChart5").highcharts({
			exporting: {
				buttons: {
					contextButton: {
						enabled: false
					}
				}
	        },
			chart: chartOption,
			title: {
				text: ''
			},
			xAxis: {
				categories: xAxisCat,
				type: "category",
				labels: {
					enabled: false
				}
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
					enabled: true
				}
			},
			series: seriesArray,
			tooltip: {
				formatter : function(){
					var header = '<div><span>'+this.points[0].key.replace("<br>", "").split(";")[0]+'</span><div/>';
					var pointer = "";
					$.each(this.points,function(){
						pointer+='<div><span style="color:'+this.series.color+';padding:0">'+dataName+': </span><span style="font-weight: bold;">'+appendCommaToNumber(this.y)+'</span>'+(unit?"("+unit+")":"")+'</div>';
					});
					return header+pointer;
				},
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					borderWidth: 0
				},
				series: {
					cursor: 'pointer',
					point: {
						events: {
							mouseOver: function(e) {
								var bClass = $houseAnalysisMap.search.mapStat.indicator.b_class_idx_id;
								if($houseAnalysisMap.search.isIndicator==true&&$houseAnalysisMap.search.isShowDatabaord==true&&$houseAnalysisMap.search.isShowDatabaord&&bClass){
									if(!/^<br>기준/.test(e.target.name)){
										var adm_cd = e.target.name.split(";")[1];
										$houseAnalysisMap.chart.selectChartData(adm_cd);
										var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
										if(map.dataGeojson){
											map.dataGeojson.eachLayer(function(layer){
												if(layer.feature&&layer.feature.properties&&layer.feature.properties.adm_cd===adm_cd){
													map.setPolyLayerMouseover({target:layer});
												}else{
													map.setPolyLayerMouseout({target:layer});
												}
											});
										}
										
									}
								}
							},
							mouseOut : function(e){
								if($houseAnalysisMap.search.isIndicator==true&&$houseAnalysisMap.search.isShowDatabaord==true){
									var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
									if(map.dataGeojson){
										map.dataGeojson.eachLayer(function(layer){
											map.setPolyLayerMouseout({target:layer});
										});
									}
									if(!/^<br>기준/.test(e.target.name)){
										$houseAnalysisMap.chart.unSelectChartData();
									}
								}
							}
						}
					}
				}
			},
			legend: {
				enabled: false
			}
		});
	}
	/**
	 * @name               : setIndicatorData
	 * @description        : 상세별 지표현황 값 셋팅
	 * @date               : 2016. 08. 08.
	 * @author	           : 나광흠
	 * @history 	       :
	 * @param mClassObject : 중분류
	 * @param adm_cd       : 행정동 코드
	 * @param isSetStand   : 기준지역을 셋팅할지의 여부
	 * @param callback     : callback
	 */
	function setIndicatorData(mClassObject,adm_cd,isSetStand,callback){
		var mapOption = $houseAnalysisMap.databoard.getMapOptions(adm_cd);
		var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
		var year = map.bnd_year,searchLevel;
		if(!$houseAnalysisMap.ui.hasText(mapOption.adm_cd)){
			searchLevel = 1;
		}else if(mapOption.adm_cd.length==2){
			searchLevel = 2;
		}else if(mapOption.adm_cd.length>=5){
			searchLevel = 3;
		}
		if(searchLevel>mClassObject.disp_level){
			searchLevel = mClassObject.disp_level;
		}
		setAvgText($("#detailChart5-avg-text1"),mClassObject,mapOption,year,searchLevel,"Y",isSetStand,callback);
	}
	/**
	 * @name               : setAvgText
	 * @description        : 상세별 지표현황 평균값 셋팅
	 * @date               : 2016. 08. 08.
	 * @author	           : 나광흠
	 * @history 	       :
	 * @param element      : jquery selector
	 * @param mClassObject : 중분류
	 * @param mapOption    : 지도 옵션
	 * @param year         : 년도
	 * @param searchLevel  : 검색 레벨
	 * @param stand_is     : 파라미터에 기준지역 여부(Y,N)
	 * @param isSetStand   : 기준지역을 셋팅할지의 여부
	 * @param callback     : callback
	 */
	function setAvgText(element,mClassObject,mapOption,year,searchLevel,stand_is,isSetStand,callback){
		var parameters = {
			b_class_idx_id : mClassObject.b_class_idx_id,
			m_class_idx_id : mClassObject.m_class_idx_id,
			year : year,
			level : searchLevel,
			stand_is : stand_is
		};
		if($houseAnalysisMap.ui.hasText(mapOption.sido_cd)){
			parameters.sido_cd = mapOption.sido_cd;
		}
		if($houseAnalysisMap.ui.hasText(mapOption.sgg_cd)){
			parameters.sgg_cd = mapOption.sgg_cd;
		}
		if($houseAnalysisMap.ui.hasText(mapOption.emdong_cd)){
			parameters.emdong_cd = mapOption.emdong_cd;
		}
		$.ajax({
			url : contextPath+"/ServiceAPI/house/houseAnalysisAvgLists.json",
			type:"POST",
			data: parameters,
			async: true,
			dataType:"json",
			success: function(res){
				if(res.errCd=="0"){
					element.show().empty();
					function create(data){
						if(data){
							element.append($("<li/>").append(
								(data.adm_nm+" : "),
								$("<strong/>",{"text":(appendCommaToNumber(data.avg_value))}),
								(data.unit?"("+data.unit+")":"")
							));
						}
					}
					if(isSetStand||stand_is=="N"||$houseAnalysisMap.search.isAbode==false){
						create(res.result.country);
						create(res.result.sido);
						create(res.result.sgg);
						create(res.result.emdong);
					}
					if(typeof callback === "function"){
						callback(res);
					}
				}
			},
			error: function(data){
				messageAlert.open("알림",errorMessage);
				return false;
			}
		});
	}
	/**
	 * @name           : getChartAdmCd
	 * @description    : 차트 adm_cd 구하기
	 * @date           : 2016. 07. 01.
	 * @author	       : 나광흠
	 * @history        :
	 * @param callback : callback
	 */
	function getChartAdmCd(callback){
		if(typeof callback === "function"){
			var adm_cd = $houseAnalysisMap.search.activeAdmCd;
			if(adm_cd.length<=2){
				accessTokenInfo(function(){
					callback(true,getFirstSggCd(adm_cd));
				});
			}else{
				callback(false,adm_cd);
			}
		}
	}
	/**
	 * @name          : getFirstSggCd
	 * @description   : 해당 시도의 첫번째 시군구 받기
	 * @date          : 2016. 07. 05.
	 * @author	      : 나광흠
	 * @history 	  :
	 * @param sido_cd : 시도코드
	 */
	function getFirstSggCd(sido_cd){
		var sggCd = null;
		if(sido_cd&&sido_cd.length==2){
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/stage.json",
				data: {
					accessToken:accessToken,
					cd: sido_cd,
					pg_yn: "0"
				},
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"&&res.result.length>0){
						sggCd = res.result[0].cd;
					}
				},
				error: function(e) {}
			});
		}
		return sggCd;
	}
	/**
	 * @name         : ageGroupChart
	 * @description  : 연령대별인구 차트
	 * @date         : 2016. 07. 01.
	 * @author	     : 나광흠
	 * @history      :
	 * @param isSido : 시도 코드인지 유무 
	 * @param adm_cd : 행정동 코드
	 */
	function ageGroupChart(isSido,adm_cd){
		var chartArea = "#age-chart";
		if($(chartArea).highcharts()){
			$(chartArea).highcharts().destroy();
		}
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		$houseAnalysisMap.api.census.getCensusData("API_0602",{"adm_cd" : adm_cd},
			function(res){
				var chartHeight = $("#databoard-area").height()-130;
				if(res.errCd=="0"){
					var categories = ['10세 이하', '10대', '20대', '30대', '40대', '50대', '60대', '70세 이상'];
					var series = new Array();
					var setData = function(data){
						var tempData = new Array();
						tempData.push(parseFloat(data.teenage_less_than_per)); //10대 미만 비율
						tempData.push(parseFloat(data.teenage_per)); //10대 비율
						tempData.push(parseFloat(data.twenty_per)); //20대 비율
						tempData.push(parseFloat(data.thirty_per)); //30대 비율
						tempData.push(parseFloat(data.forty_per)); //40대 비율
						tempData.push(parseFloat(data.fifty_per)); //50대 비율
						tempData.push(parseFloat(data.sixty_per)); //60대 비율
						tempData.push(parseFloat(data.seventy_more_than_per)); //70대 이상 비율
						series.push({
							"name": data.adm_nm,
							"data": tempData
						});
					};
					$.each(res.result,function(cnt,node){
						if(isSido){
							if(node.adm_cd==adm_cd.substring(0,2)){
								setData(node);
								return false;
							}
						}else{
							setData(node);
						}
					});
					categoryChart(chartArea,"column",toparchyChartStyle.width,toparchyChartStyle.height,series,categories,0,"%");
					$houseAnalysisMap.databoard.data.smallLocationChart = {
						series : series,
						categories :categories
					}
				}else if(res.errCd=="-100"){
					setEmptyChartText(chartArea);
				}
				abs.onBlockUIClose();
			}
		);
	}
	/**
	 * @name         : houseChart
	 * @description  : 주택종류 차트
	 * @date         : 2016. 07. 01.
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param isSido : 시도 코드인지 유무 
	 * @param adm_cd : 행정동 코드 
	 */
	function houseChart(isSido,adm_cd){
		var chartArea = "#house-chart";
		if($(chartArea).highcharts()){
			$(chartArea).highcharts().destroy();
		}
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		$houseAnalysisMap.api.census.getCensusData("API_0604",{"adm_cd" : adm_cd},
			function(res){
				var chartHeight = $("#databoard-area").height()-130;
				if(res.errCd=="0"){
					var series = [];
					var categories = ['아파트', '연립/다세대', '단독주택', '기타'];
					var setData = function(data){
						var tempData = new Array();
						tempData.push(parseFloat(data.apart_per?data.apart_per:0)); //아파트-  비율
						tempData.push(parseFloat(data.row_house_per?data.row_house_per:0)); //연립/다세대 - 비율
						tempData.push(parseFloat(data.detach_house_per?data.detach_house_per:0)); //단독주택 - 비율
						tempData.push(parseFloat(data.etc_per?data.etc_per:0)); //기타 - 비율
						series.push({
							"name": data.adm_nm,
							"data": tempData
						});
					};
					$.each(res.result,function(cnt,node){
						if(isSido){
							if(node.adm_cd==adm_cd.substring(0,2)){
								setData(node);
								return false;
							}
						}else{
							setData(node);
						}
					});
					categoryChart(chartArea,"column",toparchyChartStyle.width,toparchyChartStyle.height,series,categories,0,"%");
					$houseAnalysisMap.databoard.data.smallLocationChart = {
						series : series,
						categories :categories
					}
				}else if(res.errCd=="-100"){
					setEmptyChartText(chartArea);
				}
				abs.onBlockUIClose();
				return false;
			}
		);
	}
	/**
	 * @name         : householdChart
	 * @description  : 자가/임차 차트
	 * @date         : 2016. 07. 01.
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param isSido : 시도 코드인지 유무 
	 * @param adm_cd : 행정동 코드 
	 */
	function householdChart(isSido,adm_cd){
		var chartArea = "#household-chart";
		if($(chartArea).highcharts()){
			$(chartArea).highcharts().destroy();
		}
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		$houseAnalysisMap.api.census.getCensusData("API_0606",{"adm_cd" : adm_cd},
			function(res){
				var chartHeight = $("#databoard-area").height()-130;
				if(res.errCd=="0"){
					var series = [];
					var categories = ['자가', '임차'];
					var setData = function(data){
						var tempData = new Array();
						tempData.push(parseFloat(data.self_per)); //자가비율
						tempData.push(parseFloat(data.lease_per)); //임차비율
						series.push({
							"name": data.adm_nm,
							"data": tempData
						});
					};
					$.each(res.result,function(cnt,node){
						if(isSido){
							if(node.adm_cd==adm_cd.substring(0,2)){
								setData(node);
								return false;
							}
						}else{
							setData(node);
						}
					});
					categoryChart(chartArea,"column",toparchyChartStyle.width,toparchyChartStyle.height,series,categories,0,"%");
					$houseAnalysisMap.databoard.data.smallLocationChart = {
						series : series,
						categories :categories
					}
				}else if(res.errCd=="-100"){
					setEmptyChartText(chartArea);
				}
				abs.onBlockUIClose();
				return false;
			}
		);
	}
	/**
	 * @name         : companyChart
	 * @description  : 사업체 수 차트
	 * @date         : 2016. 07. 01.
	 * @author	     : 나광흠
	 * @history 	 :
	 */
	function companyChart(){
		var chartArea = "#company-chart";
		if($(chartArea).highcharts()){
			$(chartArea).highcharts().destroy();
		}
		var abs = new sop.portal.absAPI();
		var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
		abs.onBlockUIPopup();
		var adm_cd = $houseAnalysisMap.search.activeAdmCd;
		var series = [];
		var categories = ['종사자 수;명', '사업체 수;개'];
		var setListData = function(adm_cd){
			$.ajax({
				url : openApiPath+"/OpenAPI3/stats/population.json",
				type:"GET",
				data: {
					accessToken : accessToken,
					year : companyDataYear,
					bnd_year : map.bnd_year,
					adm_cd : adm_cd
				},
				async: false,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						var tempData = new Array();
						tempData.push(parseFloat($.isNumeric(res.result[0].employee_cnt)?res.result[0].employee_cnt:0));
						tempData.push(parseFloat($.isNumeric(res.result[0].corp_cnt)?res.result[0].corp_cnt:0));
						series.push({
							"originalName": res.result[0].adm_nm,
							"name": res.result[0].adm_nm,
							"data": tempData
						});
					}
				},
				error: function(data){
					messageAlert.open("알림",errorMessage);
					return false;
				}
			});
		};
		accessTokenInfo(function(){
			if(adm_cd.length>=7){
				setListData(adm_cd.substring(0,7));
			}
			if(adm_cd.length>=5){
				setListData(adm_cd.substring(0,5));
			}
			if(adm_cd.length>=2){
				setListData(adm_cd.substring(0,2));
			}
			for(var i = series.length-2 ;i>=0;i--){
				series[i].name = series[i].name.replace(series[i+1].originalName,"");
			}
			$("#databoard-box .TabArea:eq(3)>.origin_txt").text("출처 : "+map.bnd_year+" 전국사업체조사");
			categoryChart(chartArea,"column",toparchyChartStyle.width,toparchyChartStyle.height,series,categories,0,null);
			$houseAnalysisMap.databoard.data.smallLocationChart = {
				series : series,
				categories :categories
			}
			abs.onBlockUIClose();
		});
	}
	
	/**
	 * @name                      : categoryChart
	 * @description               : 카테고리 있는 차트 그리기
	 * @date                      : 2015. 12. 09.
	 * @author                    : 나광흠
	 * @history                   :
	 * @param element             : jquery selector
	 * @param type                : 차트 타입
	 * @param width               : 넓이
	 * @param height              : 높이
	 * @param series              : 데이터
	 * @param categories          : 카테고리 Array, 만약 카테고리별로 단위가 있으면 ["값;단위"] 이런식으로 카테고리에 ;로 구분해주고 단위를 넣어주시고 마지막 파라미터 unit은 빈칸으로 넣어주세요
	 * @param xRotation           : x 라벨 기울기
	 * @param unit                : 단위
	 * @param labelShowIndexArray : 보여주고싶은 x축 라벨 index
	 * @param pointClickCallback  : 차트 아이템 클릭 이벤트 콜벡
	 */
	function categoryChart(element, type, width, height, series, categories,xRotation,unit,labelShowIndexArray,pointClickCallback) {
		var xAxisLabelIndex = -1;
		if(!unit){
			unit = "";
		}
		var chartOption = {
			backgroundColor: 'white',
			width: width,
			height: height
		};
		if(type){
			chartOption.type = type;
		}
		$(element).empty();
		$(element).highcharts({
			exporting: {
				buttons: {
					contextButton: {
						enabled: false
					}
				}
	        },
			chart: chartOption,
			title: {
				text: ''
			},
			xAxis: {
				labels: {
					rotation: xRotation,
					style : {
						textOverflow :"none"
					},
					formatter:function(){
						if(labelShowIndexArray&&labelShowIndexArray.length>0){
							xAxisLabelIndex++;
							if(labelShowIndexArray.indexOf(xAxisLabelIndex)>-1){
								return this.value.split(";")[0];
							}
						}else{
							return this.value.split(";")[0];
						}
					},
					staggerLines: 1
				},
				categories: categories,
				crosshair: true
			},
			yAxis: {
				title: {
					text: ''
				}
			},
			series : series,
			legend: {
				itemStyle: {
					fontSize: "10px"
				}
			},
			tooltip: {
				formatter : function(){
					var seriesName = this.x.split(";");
					var header = '<div><span style="font-size:10px">'+seriesName[0]+'</span></div>';
					var pointer = "";
					$.each(this.points,function(cnt,node){
						pointer+='<div><span style="color:'+node.series.color+'">';
						pointer+=node.series.name+' : '+appendCommaToNumber(this.y)+' '+($houseAnalysisMap.ui.hasText(unit)?unit:seriesName[1]);
						pointer+='</span></div>'
					});
					return header+pointer;
				},
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					borderWidth: 0
				},
				series: {
					cursor: 'pointer',
					point: {
						events: {
							click: function(e) {
								if(typeof pointClickCallback === "function"){
									pointClickCallback(this);
								}
								this.series.chart.tooltip.refresh([this]);
							}
						}
					}
				}
			},
			legend: {
				itemStyle: {
					fontSize: "10px"
				}
			}
		});
	}
	/**
	 * @name              : setEmptyChartText
	 * @description       : 값이 없을때 문구 셋팅
	 * @date              : 2016. 08. 01.
	 * @author	          : 나광흠
	 * @history 	      :
	 * @param chartArea   : chart selector
	 */
	function setEmptyChartText(chartArea){
		if($(chartArea).highcharts()){
			$(chartArea).highcharts().destroy();
		}

		$(chartArea).empty().append($("<div/>",{style:"height:214px;text-align: center;width: 100%;display: table;"}).append($("<div/>",{text:"데이터가 존재하지 않습니다","style":"display: table-cell;vertical-align: middle;color:#bbb;font-size:11px;"})));
	}
}(window, document));

