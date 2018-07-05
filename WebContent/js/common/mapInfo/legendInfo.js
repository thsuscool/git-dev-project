/**
 * 범례에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/08 초기 작성 author : 김성현 version : 1.0 see :
 * 
 */


(function(W, D) {
	W.$legendInfo = W.$legendInfo || {};
	$(document).ready(function() {
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

		
	});
	
	$legendInfo.ui = {
		slideInfo : function(){
			if(map.isInnerMapShow2 || map.isInnerMapShow3){ //mng_s map.isInnerMapShow2추가 20180219
				var slideValue2 = 0.7;	
			}else{
				var slideValue1 = 0.7;	
			}
		},
		/**
		 * @description : Element 생성
		 * @param elem
		 *            범례 HTML을 생성한다.
		 */
		create : function(elem) {
			$(elem.selector).replaceWith("<div>asdfd</div>");
		}
	}

	/*
	 * 
	 * @name : sLegendInfo 
	 * @description : 맵 및 맵에 오버레이될 범례를 생성한다. 
	 * @date : 2015.10. 15. 
	 * @author : 최재영
	 * @history : 기존 mapInfo.js에서 sMapInfo에서 legend 부분만을빼서 작업
	 */

	sLegendInfo = {
		legendInfo : function(map) {
			// 변수
			var that = this;
			//mng_s leekh 20170823 변수 추가
			var arData2;
			//mng_e leekh 20170823
			
			//mng_s
			var fixed_legend_val1 = null;
			var fixed_legend_val2 = null;
			var fixed_legend_val3 = null;
			
			this.initLv = 7;
			this.lv = 7;
			this.selectType="color";//현재 선택된 범례의 타입
			this.oldSelectType = null;
			this.guganSetting = null;
			this.colorSetting = null;
			this.opacity=null;
			this.map = map;
			this.id = null;
			this.numberData = false; //지도상에 숫자값을 보여줄지 결정
			this.initNumberData=true; //지도상에 숫자값을 보여줄지 결정
			this.reverseOn = false; //리버스 여부 
			this.legendObj = null; // 범례 Object
			this.rentalLegendObj = null; // 권리금 Object
			this.defaultStartLegendColor = ["#ffd75d", "#eaf5c0", "#cccccc", "#cccccc", "#cccccc", "#fdf3d6", "#cccccc"];
			this.defaultLegendColor = ["#cd1103","#0e4000","#004574","#230064", "#00076a", "#783300", "#cccccc"];
			this.legendColor = ["#ccc", "#c2b5b9", "#b99ea6", "#b08893", "#a77180", "#9e5a6d", "#95445a", "#8c2d47", "#831634", "#7a0021"];
			this.legendCircleRadius = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
			this.legendDotRadius = 5;
			this.legendColor1 = "#7A0021";
			this.legendColor2 = "#cccccc";			
			this.fixLegendColor1 = "#193b70";
			this.fixLegendColor2 = "#00b051";
			this.negativeLegendColor = null;
			this.guganLevel=[];//범례 임시
			this.guganLevelSetting=[];//확정값
			this.rentalLegendValue = [];
			this.rentalLegendCircle = [ 17, 35, 47 ];
			this.rentalLegendColor = [ "#e2f1ff", "#badcff", "#7dbdff", "#409eff", "#0880fa" ];
			this.rentalLegendType = "auto";
			this.isNegative = false;
			this.data = null;
			this.perPixel = 0;
			// 2016. 03. 30 본사수정
			this.nagaPixel = 0;
			this.valPerSlice = null;
			this.legendType = "auto";
			this.legendValue={
					auto : null,
					equal : null,
					user : [[100, 200, 300, 400, 500, 600, 700]]
			};
			this.dataGeojson = null;
			this.circleMarkerGroup = null;
			this.userTableWidthList = null;
			this.isNegativeColorShow = true;
			this.guganTextShow = true;	//2016.03.25 수정, 범례구간 텍스트 show/hide
			
			//2016.03.29  수정
			this.nagativeLv = 0;
			this.positiveLv = 0;
			this.tmpValPerSlice = null;
			this.combineColorList = null;
			this.LegendList = null;
			
			/**
		     * 
		     * @name         : initialize
		     * @description  : 범례를 초기화한다.
		     * @date         : 2015. 10. 09. 
		     * @author	     : 최재영
		     * @param delegate  : 범례를 생성한 부모객체
		     */
			this.initialize = function(delegate) {
				// 현재 범례를 변수에 저장				
				var tmpColors = ["#953266","#9B4371","#A1547C","#A76588","#AD7693","#B3879E","#B998AA","#BFA9B5","#C5BAC0","#CCCCCC"];
				this.lv = this.initLv;
				this.map.setLegendColor(tmpColors);
				this.delegate = delegate;
				var currentdate = new Date();
				this.id = makeStamp(currentdate);
				
				//살고싶은 우리동네의 경우, default색상
				if (this.delegate != undefined && this.delegate.namespace != undefined && this.delegate.namespace === "houseAnalysisMap") {
					this.legendColor1 = "#7A0021";
					this.legendColor2 = "#cccccc";
				}else {
					this.legendColor1 = "#cd1103";
					this.legendColor2 = "#ffd75d";
				}
			};
			
			/**
			 * 
			 * @name         : jenks
			 * @description  : 자동범례를 계산한다.(외부 알고리즘)
			 * @date         : 2015. 10. 15. 
			 * @author	     : 최재영
			 * @history 	 : 권차욱
			 * @param data	 : 통계데이터
			 * @param n_classes : 현재 범례레벨 - 1	
			 */
			this.jenks = function(data,n_classes){
				n_classes = parseInt(n_classes);
				data = data.slice().sort(function (a, b) { return a - b; });
				var matrices = that.jenksMatrices(data, n_classes),
	            lower_class_limits = matrices.lower_class_limits;
	            var k = data.length - 1;
	            var kclass = [];
	            var countNum = n_classes;
	            	            
	            if (data.length < n_classes+1) {
	            	valPerSlice = data;
	            	var tmpValperSlice = [];
	            	for (var i=0; i<n_classes+1; i++) {
	            		if (data.length == 1) {
	            			var max = data[0];
	            			if (max < 0) {
	            				var gap = (0 - max)/n_classes
	            				tmpValperSlice.push(max+(gap*i));
	            			}else {
	            				tmpValperSlice.push(max+(max*i));
	            			}
	            		}else {
	            			if (i == 0) {
	            				var min = Math.min.apply(null, data);
	        					var max = Math.max.apply(null, data);
	        					var gap = (max - min)/n_classes; 
	            			}
	            			
	            			if (min < 0 ) {
	            				if (gap < 0) {
	            					tmpValperSlice.push(min-(gap*i));
	            				} else {
	            					tmpValperSlice.push(min+(gap*i));
	            				}
	            			}else {
	            				tmpValperSlice.push(min+(gap*i));
	            			}
	            			
	            			if (i == n_classes) {	
	            				tmpValperSlice.pop();
	            				tmpValperSlice.push(max);
	            			}
	            		}
	            	}
	            	
	            	valPerSlice = tmpValperSlice;
	            	for (var i=0; i<valPerSlice.length; i++) {
				// 2016. 09. 23 SseOk 수정
	            		valPerSlice[i] = parseFloat(parseFloat(valPerSlice[i]).toFixed(2));
	            	}

	            	return valPerSlice;
	            }
	            
				kclass[n_classes] = data[data.length - 1];
				kclass[0] = data[0];

				while (countNum > 1) {
					kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 1];
					k = lower_class_limits[k][countNum] - 1;
					if (k < 0) {
						k = 0;
					}
					countNum--;
				};
				
				for (var i=0; i<kclass.length; i++) {
					// 2016. 09. 23 SseOk 수정
					kclass[i] = parseFloat(parseFloat(kclass[i]).toFixed(2));
				}
				
				return kclass;
			};
			
			/**
			 * 
			 * @name         : jenksMatrices
			 * @description  : 자동범례를 계산한다.(외부 알고리즘)
			 * @date         : 2015. 10. 15. 
			 * @author	     : 최재영
			 * @history 	 : 권차욱
			 * @param data	 : 통계데이터
			 * @param n_classes : 현재 범례레벨 - 1	
			 */
			this.jenksMatrices = function(data, n_classes){
				var lower_class_limits = [],
	            variance_combinations = [],
	            i, j,
	            variance = 0;

				for (i = 0; i < data.length + 1; i++) {
					var tmp1 = [], tmp2 = [];
					for (j = 0; j < n_classes + 1; j++) {
						tmp1.push(0);
						tmp2.push(0);
					}
					lower_class_limits.push(tmp1);
					variance_combinations.push(tmp2);
				}

				for (i = 1; i < n_classes + 1; i++) {
					lower_class_limits[1][i] = 1;
					variance_combinations[1][i] = 0;
				
					for (j = 2; j < data.length + 1; j++) {
						variance_combinations[j][i] = Infinity;
					}
				}

				for (var l = 2; l < data.length + 1; l++) {
					var sum = 0,
	                sum_squares = 0,
	                w = 0,
	                i4 = 0;

	            for (var m = 1; m < l + 1; m++) {
	                var lower_class_limit = l - m + 1,
	                    val = data[lower_class_limit - 1];	                
	                	w++;
	                	sum += val;
	                	sum_squares += val * val;
	                	variance = sum_squares - (sum * sum) / w;
	                	i4 = lower_class_limit - 1;

	                	if (i4 !== 0) {
	                		for (j = 2; j < n_classes + 1; j++) {
	                			if (variance_combinations[l][j] >=
	                				(variance + variance_combinations[i4][j - 1])) {
	                					lower_class_limits[l][j] = lower_class_limit;
	                					variance_combinations[l][j] = variance +
	                					variance_combinations[i4][j - 1];
	                			}
	                    }
	                }
	            }
	            lower_class_limits[l][1] = 1;
	            variance_combinations[l][1] = variance;
	        }

	        return {
	            lower_class_limits: lower_class_limits,
	            variance_combinations: variance_combinations
	        };
	    };
	    
	    /**
		 * 
		 * @name         : changeDataMode
		 * @description  : 통계의 표출방법을 설정한다.(색상, 버블, 점, 열지도)
		 * @date         : 2015. 10. 05. 
		 * @author	     : 권차욱
		 * @history 	 : 
		 * @param type	 : color:색상, bubble:버블, dot:점, heat:열
		 */
	    this.changeDataMode = function(type) {
	    	//2017.10.18 [개발팀] 체크정보 수정
	    	if (map.dataGeojson == null && map.multiLayerControl != undefined && 
	    	   (map.multiLayerControl.dataGeojson == null || map.multiLayerControl.dataGeojson.length == 0)) {
	    		//messageAlert.open("알림", "통계정보를 조회해주세요.");
	    		return;
	    	}
	    	this.dataGeojson = map.dataGeojson;
    			
	    	var mode = {
	    			"color"  : 0,	//색상지도
	    			"bubble" : 1,	//버블지도
	    			"dot"	 : 2,	//점지도
	    			"heat"	 : 3	//열지도
	    	};
	    	switch(mode[type]) {
	    		case 0:
	    			this.setColorMap();
	    			break;
	    		case 1:
	    			this.setBubbleMap();
	    			break;
	    		case 2:
	    			this.setDotMap();
	    			break;
	    		case 3:
	    			this.setHeatMap();
	    			break;
	    		default:
	    			this.setColorMap();
	    			break;
	    	}
	    };
	    	
	    /**
	     * 
	     * @name         : setColorMap
	     * @description  : 색상지도로 변경한다.
	     * @date         : 2015. 10. 05. 
	     * @author	     : 권차욱
	     * @history 	 :
	     */
	    this.setColorMap = function() {
	    	this.removeDataOverlay();
	    	if (this.map.multiLayerControl != undefined && 
	    		this.map.multiLayerControl.dataGeojson != null && 
	    		this.map.multiLayerControl.dataGeojson.length > 0) {
		    	for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
		    		var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
		    		dataGeojson.addTo(this.map.gMap);
		    	}
		    }else {
		    	this.map.dataGeojson.addTo(that.map.gMap);;
		    }   
		    this.map.checkShowCaption();
	    };
	    		
	    /**
	     * 
 		 * @name         : setBubbleMap
		 * @description  : 버블지도로 변경한다.
		 * @date         : 2015. 10. 05. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
	    this.setBubbleMap = function() {
	    	this.removeDataOverlay();
	    	if (this.circleMarkerGroup  == null) {
		    	this.circleMarkerGroup = [];
		    }
	    	if (this.map.multiLayerControl != undefined && 
	    		this.map.multiLayerControl.dataGeojson != null && 
	    		this.map.multiLayerControl.dataGeojson.length > 0) {
	    		for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    			var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
	    			this.drawBubbleMap(dataGeojson);
	    		}
	    	}else {
	    		var dataGeojson = that.map.dataGeojson;
	    		this.drawBubbleMap(dataGeojson);
	    	}  
		this.map.checkShowCaption();
	    };
	    	
	    /**
	     * 
	     * @name         : drawBubbleMap
	     * @description  : 버블지도를 생성한다.
	     * @date         : 2015. 11. 17. 
	     * @author	     : 권차욱
	     * @history 	 :
	     * @param geojson : 경계데이터
	     */
	    this.drawBubbleMap = function(geojson) {
	    	//2017.07.24 [개발팀] 공공데이터 추가 - geojson이 null일때 리턴
	    	if (geojson == null) {
	    		return;
	    	} 
	    	var searchYear = "";
	    	var delegate = this.map.delegate.ui;
	    	if (delegate != undefined && 
	    		delegate.curDropParams != undefined && 
	    		delegate.curDropParams[this.map.id] != undefined && delegate.curDropParams[this.map.id].param != undefined) {
				for(var i = 0; i < delegate.curDropParams[this.map.id].param.length; i ++) {
					if (delegate.curDropParams[this.map.id].param[i].key == "year") {
						searchYear = delegate.curDropParams[this.map.id].param[i].value + "년 ";
					}
				}	
			}
	    			
		    geojson.eachLayer(function(layer) {
		    	var info = null;
		    	var data = null;
		    	var unit = null;
		    	var color = layer.options.fillColor;
		    	var idx = 0;
		    	var x = layer.feature.properties.x;
		    	var y = layer.feature.properties.y;
		    	var adm_nm = layer.feature.properties.adm_nm;
		    	if (layer.feature.info.length > 0) {
		    		if (layer.feature.isKosis) {
		    			info = layer.feature.info;
			    		data = info[0];
				    	unit = info[1];
				    	
				    	var kosisData = "";
				    	if (unit != undefined) {
				    		kosisData = searchYear + appendCommaToNumber(data)+" ("+unit+")";
				    	}else {
				    		kosisData = searchYear + appendCommaToNumber(data);
				    	}
				    		
				    	var toolTip  = "<div style='margin:10px;'>";
				    		toolTip += 		"<div style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</div>";
				    		toolTip += 		"<div style='height:5px;'></div>";
				    		toolTip += 		"<div style='font-size:12px;padding-left:5px;'>"+kosisData+"</div>";
				    		toolTip += "</div>";
		    			} 
		    		else if (layer.feature.isThematicMap) {
		    			info = layer.feature.info[0];
			    		data = info[info.showData];
				    	unit = info.unit;
				    	var title;
				    	if (info.left_sep_ttip_title != undefined) {
				    		title = info.left_sep_ttip_title;
				    	}else {
				    		title = info.right_sep_ttip_title;
				    	}
				    		
				    	var toolTip  = "<div style='margin:10px;'>";
			    			toolTip += 		"<div style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</div>";
			    			toolTip +=		"<div style='height:5px;'></div>";
			    			toolTip += 		"<div style='font-size:12px;padding-left:5px;'>"+title+" : "+appendCommaToNumber(data)+" ("+unit+")</div>";
			    			toolTip += "</div>";
		    		}
		    		else {
		    			info = layer.feature.info[0];		    			
		    			data = info[info.showData];
				    	unit = info.unit;
				    		
				    	var toolTip  = "<div style='margin:10px;'>";
			    			toolTip += 		"<div style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</div>";
			    			toolTip +=		"<div style='height:5px;'></div>";
			    			
			    			if (info.api_id == "API_MYDATA") {
			    				for (var i=0; i<info.userData.length; i++) {
					    			toolTip += 	"<div style='font-size:12px;padding-left:5px;'>"+info.userData[i].title + " : " + info.userData[i].data+"</div>";
			    				}
			    			}else {
			    				if(info.isHouseMap){
			    					var dataNameText = info.data_nm;
			    					if($houseAnalysisMap.ui.indicatorStatMap){
			    						if(info.m_class_idx_id=="HMM0023"){
			    							dataNameText = "보육시설 대비 5세이하 인구 수";
			    						}else if(info.m_class_idx_id=="HMM0024"){
			    							dataNameText = "병의원 및 약국 대비 인구 수";
			    						}else if(info.m_class_idx_id=="HMM0025"){
			    							dataNameText = "노인복지시설 대비 65세 이상 인구 수";
			    						}else if(info.m_class_idx_id=="HMM0026"){
			    							dataNameText = "사회복지시설 대비 인구 수";
			    						}
			    					}
			    					toolTip += 	"<div style='font-size:12px;padding-left:5px;'>"+searchYear+" "+dataNameText+" : "+appendCommaToNumber(data)+" ("+unit+")</div>";
			    				}else{
			    					toolTip += 	"<div style='font-size:12px;padding-left:5px;'>"+searchYear+" "+that.getDataName(info.showData)+" : "+appendCommaToNumber(data)+" ("+unit+")</div>";
			    				}
			    			}
			    			
			    			toolTip += "</div>";
		    		}
			    		
		    		if (that.legendType == "negative") {
		    			that.legendColor = that.negativeLegendColor;
		    		}
		    		
			    	for (var i=0; i<that.legendColor.length; i++) {
			    		if (color == that.legendColor[i]) {
			    			idx = i;
			    			break;
			    		}
			    	}
			    			
			    	var marker = map.addCircleMarker(x, y, {
			    		radius : that.legendCircleRadius[idx],
			    		fillColor : color,
			    		color : "white",
			    		weight : 1,
			    		tooltipMsg : toolTip,
			    		options : {
			    			idx : idx,
			    			data : data
			    		}
			    	});
			    	that.circleMarkerGroup.push(marker);
		    	}
		    });	 
	    };
	    
	    /**
	     * 
	     * @name         : changeBubbleColor
	     * @description  : 버블지도의 색상을 변경한다.
	     * @date         : 2016. 01. 15. 
	     * @author	     : 권차욱
	     * @history 	 :
	     */
	    this.changeBubbleColor = function() {
	    	if (this.circleMarkerGroup != null && 
	    		this.circleMarkerGroup != undefined && 
	    		this.circleMarkerGroup.length > 0) {
	    		for (var i=0; i<this.circleMarkerGroup.length; i++) {
	    			var marker = this.circleMarkerGroup[i];
	    			marker.setStyle({
	    				radius : marker.options.radius,
						color : marker.options.color,
						fillColor : this.legendColor[marker.options.options.idx],
						fillOpacity : marker.options.fillOpacity,
						opacity : marker.options.opacity,
						weight : marker.options.weight,
						renderer: marker.options.renderer,
						options : marker.options.options
	    			}) ;
	    		}
	    	}
	    };
	    	
	    /**
	     * 
	     * @name         : setDotMap
	     * @description  : 점지도로 변경한다.
	     * @date         : 2015. 10. 05. 
	     * @author	     : 권차욱
	     * @history 	 :
	     */
	    this.setDotMap = function() {
	    	this.removeDataOverlay();
	    	if (this.circleMarkerGroup  == null) {
		    	this.circleMarkerGroup = [];
		    }
	    		
	    	if (this.map.multiLayerControl != undefined &&
	    		this.map.multiLayerControl.dataGeojson != null && 
	    		this.map.multiLayerControl.dataGeojson.length > 0) {
	    		for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    			var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
	    			this.drawDotMap(dataGeojson);
	    		}
	    	}else {
	    		var dataGeojson = that.map.dataGeojson;
	    		this.drawDotMap(dataGeojson);
	    	}       
	    };
	    	
	    /**
	     * 
	     * @name         : drawDotMap
	     * @description  : 점지도를 생성한다.
	     * @date         : 2015. 11. 17. 
	     * @author	     : 권차욱
	     * @history 	 :
	     * @params geojson : 경계데이터
	     */
	    this.drawDotMap = function(geojson) {
	    	//2017.07.24 [개발팀] 공공데이터 추가 - geojson이 null일때 리턴
	    	if (geojson == null) {
	    		return;
	    	} 
	    	var searchYear = "";
	    	var delegate = this.map.delegate.ui;
	    	if (delegate != undefined && 
	    		delegate.curDropParams != undefined && 
	    		delegate.curDropParams[this.map.id] != undefined && delegate.curDropParams[this.map.id].param != undefined) {
				for(var i = 0; i < delegate.curDropParams[this.map.id].param.length; i ++) {
					if (delegate.curDropParams[this.map.id].param[i].key == "year") {
						searchYear = delegate.curDropParams[this.map.id].param[i].value + "년 ";
					}
				}	
			}
	    			
	    	geojson.eachLayer(function(layer) {
		    	var info = null;
		    	var data = null;
		    	var unit = null;
		    	var color = layer.options.fillColor;
		    	var idx = 0;
		    	var x = layer.feature.properties.x;
		    	var y = layer.feature.properties.y;
		    	var adm_nm = layer.feature.properties.adm_nm;
		    	if (layer.feature.info.length > 0) {
		    		if (layer.feature.isKosis) {
		    			info = layer.feature.info;
			    		data = info[0];
				    	unit = info[1];
				    		
				    	var toolTip  = "<div style='margin:10px;'>";
			    			toolTip += 		"<div style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</div>";
			    			toolTip +=		"<div style='height:5px;'></div>";
			    			toolTip += 		"<div style='font-size:12px;padding-left:5px;'>"+appendCommaToNumber(data)+" ("+unit+")</div>";
			    			toolTip += "</div>";
		    		}else {
		    			info = layer.feature.info[0];
			    		data = info[info.showData];
				    	unit = info.unit;
				    	var dataNameText;
				    	if(info.isHouseMap){
				    		dataNameText = info.data_nm;
	    					if($houseAnalysisMap.ui.indicatorStatMap){
	    						if(info.m_class_idx_id=="HMM0023"){
	    							dataNameText = "보육시설 대비 5세이하 인구 수";
	    						}else if(info.m_class_idx_id=="HMM0024"){
	    							dataNameText = "병의원 및 약국 대비 인구 수";
	    						}else if(info.m_class_idx_id=="HMM0025"){
	    							dataNameText = "노인복지시설 대비 65세 이상 인구 수";
	    						}else if(info.m_class_idx_id=="HMM0026"){
	    							dataNameText = "사회복지시설 대비 인구 수";
	    						}
	    					}
	    					toolTip += 	"<div style='font-size:12px;padding-left:5px;'>"+searchYear+" "+dataNameText+" : "+appendCommaToNumber(data)+" ("+unit+")</div>";
	    				}else{
	    					dataNameText = searchYear+" "+that.getDataName(info.showData);
	    				}
				    	var toolTip  = "<div style='margin:10px;'>";
			    			toolTip += 		"<div style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</div>";
			    			toolTip +=		"<div style='height:5px;'></div>";
			    			toolTip += 		"<div style='font-size:12px;padding-left:5px;'>"+dataNameText+" : "+appendCommaToNumber(data)+" ("+unit+")</div>";
			    			toolTip += "</div>";
		    		}
		    				
			    	var marker = map.addCircleMarker(x, y, {
			    		radius : that.legendDotRadius,
			    		color : that.legendColor1,
			    		fillColor : that.legendColor1,
			    		tooltipMsg : toolTip 
			    	});
			    	that.circleMarkerGroup.push(marker);
		    	}
		    });	
	    };
	    	
	    /**
	     * 
	     * @name         : setHeatMap
	     * @description  : 열지도로 변경한다.
	     * @date         : 2015. 10. 05. 
	     * @author	     : 권차욱
	     * @history 	 :
	     */
	    this.setHeatMap = function() {
	    	this.removeDataOverlay();
	    	if (this.map.multiLayerControl != undefined &&
	    		this.map.multiLayerControl.dataGeojson != null && 
	    		this.map.multiLayerControl.dataGeojson.length > 0) {
	    		for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    			var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
	    			this.drawHeatMap(dataGeojson);
	    		}
	    	}else if (that.map.dataGeojson != undefined && 
	    			  that.map.dataGeojson != null) {
	    		var dataGeojson = that.map.dataGeojson;
	    		this.drawHeatMap(dataGeojson);
	    	}       
	    };
	    	
	    /**
	     * 
	     * @name         : drawHeatMap
	     * @description  : 열지도를 생성한다.
	     * @date         : 2015. 10. 05. 
	     * @author	     : 권차욱
	     * @history 	 :
	     * @param geojson : 경계데이터
	     */
	    this.drawHeatMap = function(geojson) {
	    	//2017.07.24 [개발팀] 공공데이터 추가 - geojson이 null일때 리턴
	    	if (geojson == null) {
	    		return;
	    	} 
	    	//히트맵 max(가중치)값 계산
	    	if (that.valPerSlice != null && that.valPerSlice.length > 0) {
	    		var max = Math.max.apply(null, that.valPerSlice[0]);
	    		that.map.zoomLevelHeat = false;
	    		that.map.setHeatMapOptions(that.map.heatRadius, that.map.heatBlur, max);
	    	}
	    	
		    geojson.eachLayer(function(layer) {
		    	var info = null;
		    	var data = null;
		    	var unit = null;
		    	var x = layer.feature.properties.x;
		    	var y = layer.feature.properties.y;
		    	if (layer.feature.info.length > 0) {
		    		if (layer.feature.isKosis) {
		    			info = layer.feature.info;
			    		data = info[0];
				    	unit = info[1];
		    		}else {
		    			info = layer.feature.info[0];
			    		data = info[info.showData];
				    	unit = info.unit;
		    		}	
		    	}
		    	that.map.addHeatMap(x, y, data);
		    });
	    };
	    	
	    /**
	     * 
	     * @name         : getDataName
	     * @description  : 표출데이터명을 가져온다.
	     * @date         : 2015. 11. 13. 
	     * @author	     : 권차욱
	     * @history 	 :
	     * @param showData : 통계표출 파라미터
	     */
	    this.getDataName = function(showData) {
	    	var showName = {
					"tot_ppltn" : "총인구",
					"tot_ppltn_male" : "총인구(남자)",
					"tot_ppltn_fem" : "총인구(여자)",
					"avg_age" : "평균나이",
					"avg_age_male" : "평균나이(남자)",
					"avg_age_fem" : "평균나이(여자)",
					"ppltn_dnsty" : "인구밀도",
					"aged_child_idx" : "노령화지수",
					"oldage_suprt_per" : "노년부양비",
					"juv_suprt_per" : "유년부양비",
					"tot_suprt_per" : "총부양비",
					"population" : "인구",
					"tot_worker" : "종사자수",
					"corp_cnt" : "사업체수",
					"household_cnt" : "가구수",
					"house_cnt" : "주택수",
					"farm_cnt" : "농가수",
					"forestry_cnt" : "임가수",
					"fishery_cnt" : "어가수",
					"tot_family" : "총가구",
					"avg_fmember_cnt" : "평균가구원수",
					"tot_house" : "총주택",
					"nongga_cnt" : "농가(가구)",
					"nongga_ppltn" : "농가(인구)",
					"imga_cnt" : "임가(가구)",
					"imga_ppltn" : "임가인구",
					"naesuoga_cnt" : "내수면총어가",
					"naesuoga_ppltn" : "해수면어가인구",
					"haesuoga_cnt" : "해수면총어가",
					"haesuoga_ppltn" : "해수면어가인구",
					"employee_cnt" : "종사자수"
			};
	    	return showName[showData];
	    };
	    	
	    /**
	     * 
	     * @name         : removeDataOverlay
	     * @description  : 오버레이를 초기화한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 :
	     */
	    this.removeDataOverlay = function() {
	    	if (this.circleMarkerGroup != null) {
	    		for (var i=0; i<this.circleMarkerGroup.length; i++) {
		    		var marker = this.circleMarkerGroup[i];
		    		marker.remove();
		    	}
	    		this.circleMarkerGroup = null;
	    	}
	    	if (this.map.dataGeojson) {
	    		this.map.removeCaption();
	    		this.map.dataGeojson.remove();
	    	}
	    		
	    	if (this.map.multiLayerControl != undefined && this.map.multiLayerControl.dataGeojson) {
	    		this.map.removeCaption();
	    		for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    			var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
		    		dataGeojson.remove();
	    		}
	    	}
	    	
	    	if (this.delegate.namespace != "interactiveCombineMap") {
	    		if (this.map.heatMap) {
	    			if(this.map.heatMap._utmks.length > 0) {
	    				this.map.heatMap.setUTMKs([]);
	    			}
		    	}
	    	}
	    	
	    };
	    	
	    /**
	     * 
	     * @name         : changeDotColor
	     * @description  : 점지도의 색상을 변경한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 :
	     * @params color : 색상
	     */
	    this.changeDotColor = function(color) {
	    	if (this.circleMarkerGroup != null) {
	    		for (var i=0; i<this.circleMarkerGroup.length; i++) {
		    		var marker = this.circleMarkerGroup[i];
		    		marker.setStyle({
		    			color : color,
		    			fillColor : color,
		    		});
		    	}
	    	}
	    };
	    	
	    /**
	     * 
	     * @name         : changeDotRadius
	     * @description  : 점지도의 크기를 변경한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 :
	     * params value  : 점지도 반지름 값
	     */
	    this.changeDotRadius = function(value) {
	    	this.legendDotRadius = value;
	    	if (this.circleMarkerGroup != null) {
	    		for (var i=0; i<this.circleMarkerGroup.length; i++) {
		    		var marker = this.circleMarkerGroup[i];
		    		marker.setRadius(value);
		    	}
	    	}
	    };
	    	
	    /**
	     * 
	     * @name         : setLegendParams
	     * @description  : 지도표출 카테고리별 범례를 변경한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 :
	     * @param type	 : 통계표출 타입(color:색상, bubble:버블, dot:점, heat:열)
	     * @param color  : 색상
	     * @param level  : 범례레벨
	     */
	    this.setLegendParams = function(type, color, level) {
	    	this.legendColor = color;
			this.lv = level;
			this.selectType = type;
			legendColor(
					this.legendColor[0],
					this.legendColor[this.lv-1],  
					"#colorStatus_"+this.id, 
					this.lv, 
					this.id, 
					this
			);
			var mode = {
	    			"color"  : 0,	//색상지도
	    			"bubble" : 1,	//버블지도
	    			"dot"	 : 2,	//점지도
	    			"heat"	 : 3    //열지도
	    	};
	    	switch(mode[type]) {
	    		case 0:
	    			if ($("#legendBox_"+that.id).hasClass("min")) {
	    				$("#legendColor_"+that.id).hide();
	    			}else if ($("#legendBox_"+that.id).hasClass("max")) {
	    				$("#legendColor_"+that.id).show();
	    			}else {
	    				$("#legendColor_"+that.id).hide();
	    			}
	    			$("#typeArea_"+this.id).removeClass().addClass("color");
	    			break;
	    		case 1:
	    			$("#legendColor_"+that.id).hide();
	    			if ($("#legendBox_"+that.id).hasClass("min")) {
	    				$("#bubbleLegendLine_"+that.id).hide();
	    			}else if ($("#legendBox_"+that.id).hasClass("max")) {
	    				$("#bubbleLegendLine_"+that.id).show();
	    			}else {
	    				$("#bubbleLegendLine_"+that.id).hide();
	    			}
	    			$("#typeArea_"+this.id).removeClass().addClass("ring");
	    			break;
	    		case 2:
	    			$("#legendPopEvent01_"+that.id).parent().hide();
					$("#legendPopEvent02_"+that.id).parent().hide();
					$("#legendColor_"+that.id).show();
	    			$("#bubbleLegendLine_"+that.id).hide();
	    			$("#typeArea_"+this.id).removeClass().addClass("jum");
	    			break;
	    		case 3:
	    			$("#legendPopEvent01_"+that.id).parent().hide();
					$("#legendPopEvent02_"+that.id).parent().hide();
					$("#legendColor_"+that.id).hide();
	    			$("#bubbleLegendLine_"+that.id).hide();
	    			$("#typeArea_"+this.id).removeClass().addClass("heat");
	    			break;
	    		default:
	    			if ($("#legendBox_"+that.id).hasClass("min")) {
	    				$("#legendColor_"+that.id).hide();
	    			}else if ($("#legendBox_"+that.id).hasClass("max")) {
	    				$("#legendColor_"+that.id).show();
	    			}else {
	    				$("#legendColor_"+that.id).hide();
	    			}
	    			$("#typeArea_"+this.id).removeClass().addClass("color");
	    			break;
	    	}
	    	/*var min = $(".legendBox").hasClass("min");
	    	if (min) {
	    		$(".legendBox").removeClass("min");
	    		$(".legendBox").addClass("max");
	    	}*/
	    };
	    	
	    /**
	     * 
	     * @name         : showNumberData
	     * @description  : 통계값 표출유무 설정.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history 	 :
	     */
	    this.showNumberData = function(){
	    	if(that.numberData){
	    		that.numberData = false;
	    		$("#showData_"+that.id).removeClass("on");
	    		$("#showData_"+that.id + ">span").text("통계치 off")
	    	}else{
	    		that.numberData = true;
	    		$("#showData_"+that.id).addClass("on");
	    		$("#showData_"+that.id + ">span").text("통계치 on");
	    	}	
	    	that.map.checkShowCaption();
	    	
	    	//Left Menu 통계표출 연동
	    	if(this.delegate.namespace == "interactiveMap") {
	    		$interactiveLeftMenu.ui.showNumberSetting();
	    	} else if(this.delegate.namespace == "bizStatsMap") {
	    		$bizStatsLeftMenu.ui.showNumberSetting();
	    	}
	    }
	    
	    /**
	     * 
	     * @name         : calculateLegend
	     * @description  : 범례를 계산한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history 	 : 권차욱 수정
	     * @param arData : 통계데이터
	     */
		this.calculateLegend = function(arData) {
			if (arData == null || arData[0].length == 0) {
				return;
			}
			this.data = arData;
			this.legendValue.equal = [];
			this.legendValue.auto = [];
					
			//데이터 중복제거
			for (var i=0; i<arData.length; i++) {
				var tmpData = [];
				$.each(arData[i], function(k, el){
					if($.inArray(el, tmpData) === -1) tmpData.push(el);
				});
				arData[i] = tmpData;
			}
			
			for (var i=0; i<arData.length; i++) {
				var tmpData = arData[i];
				for (var x=0; x<tmpData.length; x++) {
					// 2016. 09. 23 SseOk 수정
					tmpData[x] = parseFloat(parseFloat(tmpData[x]).toFixed(2));
				}
			}
				
			this.calNegativeLegend(arData);
			//mng_s 20170823 leekh
			arData2 = arData;
			//mng_e 20170823 leekh
			this.calEqualLegend(arData);	//균등범례
			this.calAutoLegend(arData);		//자동범례
			this.calUserLegend();			//사용자지정범례
				
			if(this.legendType =="auto"){
				that.valPerSlice = this.legendValue.auto;
				that.setGoganText(this.legendValue.auto[0]);
				that.updateGuganLegend();
				return this.legendValue.auto;
			}else if(this.legendType =="equal"){
				that.valPerSlice = this.legendValue.equal;
				that.setGoganText(this.legendValue.equal[0]);
				that.updateGuganLegend();
				return this.legendValue.equal;
			}else if (this.legendType == "negative") {
				that.valPerSlice = this.legendValue.negative;
				that.setGoganText(this.legendValue.negative[0]);
				that.legendColor1 = this.negativeLegendColor[this.negativeLegendColor.length-1];
				that.legendColor2 = this.negativeLegendColor[0];
				that.updateGuganLegend();
				return this.legendValue.negative;
			}
			else{
				that.valPerSlice = this.legendValue.user;
				that.setGoganText(this.legendValue.user[0]);
				that.updateGuganLegend();
				return this.legendValue.user;
			}
		};
		
		/**
	     * 
	     * @name         : updateGuganLegend
	     * @description  : 범례구간을 업데이트한다.
	     * @date         : 2016. 08. 16. 
	     * @author	     : 권차욱
	     * @history 	 : 
	     */
		this.updateGuganLegend = function() {
			var type = {
					"auto"     : 0,
					"equal"    : 1,
					"user"     : 2,
					"negative" : 3
			}
			
			switch (type[this.legendType]) {
				case 0:
					$("#guganAuto_"+that.id).click();
					break;
				case 1:
					$("#guganEqual_"+that.id).click();
					break;
				case 2:
					$("#guganUser_"+that.id).click();
					break;
				case 3:
					$("#guganNagative_"+that.id).click();
					break;
			}
		};
		
		/**
	     * 
	     * @name         : calCntPerGugan
	     * @description  : 구간별 빈도수를 계산한다.
	     * @date         : 2016. 08. 16. 
	     * @author	     : 권차욱
	     * @history 	 : 
	     * @params valPerSlice : 범례기준
	     * @params data	: 데이터
	     * @params min  : 최소값
	     * @params max  : 최대값
	     */
		this.calCntPerGugan = function(valPerSlice, data, min, max) {
			var guganData = [];
			var cnt = 0;
			for (var i=0; i<that.lv; i++) {
				guganData[i] = 0;
			}
			for (var i=0; i<data.length; i++) {
				for (var k=0; k<that.lv; k++) {
					if (data[i] <= valPerSlice[k+1]) {
						guganData[k] += 1;
						break;
					}else if (data[i] > valPerSlice[that.lv-1]) {
						guganData[that.lv-1] += 1;
						break;
					}
				}
			}
			
			var polygonList = [];
			for (var i=0; i<guganData.length; i++) {
				var tmpPolygonList = [];
				if (i==0) {
					polygonList.push([min, 0]);
					polygonList.push([min, guganData[i]]);
					polygonList.push([valPerSlice[i+1], guganData[i]]);
					polygonList.push([valPerSlice[i+1], 0]);
				}else if (i == guganData.length-1) {
					polygonList.push([valPerSlice[i], 0]);
					polygonList.push([valPerSlice[i], guganData[i]]);
					polygonList.push([max, guganData[i]]);
					polygonList.push([max, 0]);
				}else {
					polygonList.push([valPerSlice[i], 0]);
					polygonList.push([valPerSlice[i], guganData[i]]);
					polygonList.push([valPerSlice[i+1], guganData[i]]);
					polygonList.push([valPerSlice[i+1], 0]);
				}
			}
			return polygonList;

		};
			
		/**
	     * 
	     * @name         : calNegativeLegend
	     * @description  : 음수/양수범례를 계산한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 : 권차욱 수정
	     * @param arData : 통계데이터
	     */
		this.calNegativeLegend = function(arData) {
			var negativeData = null;
			var positiveData = null;
			var colorList = null;
			var tmpNegativeData = [], tmpPositiveData = [], tmpValPerSlice = [];
			this.isNegative = false;
			for (var i=0; i<arData.length; i++) {
				for (var k=0; k<arData[i].length; k++) {
					if (parseFloat(arData[i][k]) <= 0) {
						this.isNegative = true;
						if (negativeData == null) {negativeData = [];}
						negativeData.push(arData[i][k]);
					}else {
						if (positiveData == null) {positiveData = [];}
						positiveData.push(arData[i][k]);
					}
				}	
			}
			
			/*if (negativeData != null && negativeData.length == 1 && negativeData[0] == 0) {
				this.isNegative = false;
				negativeData = [];
				nagativeLv = 0;
			}*/
				
			//양수만 존재할 경우
			if (!this.isNegative) {
				$.each(positiveData, function(i, el){
					if($.inArray(el, tmpPositiveData) === -1) tmpPositiveData.push(el);
				});
				positiveData = tmpPositiveData;
				
				tmpValPerSlice[0] = [];
				var tmpResult = that.jenks(positiveData, parseInt(that.lv)); //2016.04.04 범례
				for (var i=0;i <tmpResult.length; i++) {
					tmpValPerSlice[0].push(tmpResult[i]);
				}
				
				if (colorList == null) {colorList = [];}
				var colorList2 = getCalculColor("#ffd75d", "#cd1103", that.lv);
				for (var i=0; i<colorList2.length; i++) {
					colorList.push(colorList2[i]);
				}
			}else {
				//음수/양수 데이터가 모두 존재할 경우
				if (positiveData != null) {
					//데이터 중복제거
					$.each(negativeData, function(i, el){
						if($.inArray(el, tmpNegativeData) === -1) tmpNegativeData.push(el);
					});
					$.each(positiveData, function(i, el){
						if($.inArray(el, tmpPositiveData) === -1) tmpPositiveData.push(el);
					});
					negativeData = tmpNegativeData;
					positiveData = tmpPositiveData;
						
					var lv = Math.floor((parseInt(that.lv))/2); //2016.04.04 범례
					var nagativeLv = 0;
					var positiveLv = 0;
					if (lv % 2 != 0) {
						nagativeLv = lv;
						positiveLv = parseInt(that.lv)-nagativeLv;
					}else {
						nagativeLv = lv;
						positiveLv = lv;
						
						//2016.03.17 수정 - 분할범례 버그수정
						if (that.lv == 5) {
							positiveLv = lv+1;
						}
					}
					
					tmpValPerSlice.push(that.jenks(negativeData, nagativeLv)); //2016.04.04 범례
					tmpValPerSlice[0].pop();
					tmpValPerSlice[0].push(0);
					
					var tmpResult = that.jenks(positiveData, positiveLv-1); //2016.04.04 범례
					for (var i=0;i <tmpResult.length; i++) {
						tmpValPerSlice[0].push(tmpResult[i]);
					}
					
					this.nagativeLv = nagativeLv;
					this.positiveLv = positiveLv;
					// 2017. 03. 10 개발팀 수정요청 
					colorList = getCalculColor("#22277a", "#cccccc", nagativeLv);
//					var colorList2 = getCalculColor("#663240", "#cc0000", positiveLv);
					var colorList2 = getCalculColor("#ffd75d", "#cd1103", parseInt(that.lv)-nagativeLv);
					for (var i=0; i<colorList2.length; i++) {
						colorList.push(colorList2[i]);
					}
				}
				//음수만 존재할 경우
				else {
					//데이터 중복제거
					$.each(negativeData, function(i, el){
						if($.inArray(el, tmpNegativeData) === -1) tmpNegativeData.push(el);
					});
					negativeData = tmpNegativeData;
					
					tmpValPerSlice[0] = [];
					var tmpResult = that.jenks(negativeData, parseInt(that.lv)); //2016.04.04 범례
					for (var i=0;i <tmpResult.length; i++) {
						tmpValPerSlice[0].push(tmpResult[i]);
					}
					
					if (colorList == null) {colorList = [];}
//					var colorList2 = getCalculColor("#0066aa", "#434471", that.lv);
					// 2017. 08. 02 색상 변경
					// mng_s 20170802_김건민
//					var colorList2 = getCalculColor("#a501b7", "#7c02cd", that.lv);
					var colorList2 = getCalculColor("#22277a", "#9395b0", that.lv);
					// mng_e 20170802_김건민
					for (var i=0; i<colorList2.length; i++) {
						colorList.push(colorList2[i]);
					}
				}
			}
				
			this.negativeLegendColor = colorList;
			this.legendValue.negative = tmpValPerSlice;
		};
		/**
		 * 
		 * @name         : calNegativeLegend2
		 * @description  : 음수/양수범례를 계산한다.
		 * @date         : 2017.08.23
		 * @author	     : 이경현 리버스시 범례 다시 계산
		 * @history 	 : 
		 * @param arData : 통계데이터
		 */
		//mng_s 20170823
		this.calNegativeLegend2 = function(arData) {
			var negativeData = null;
			var positiveData = null;
			var colorList = null;
			var tmpNegativeData = [], tmpPositiveData = [], tmpValPerSlice = [];
			this.isNegative = false;
			for (var i=0; i<arData.length; i++) {
				for (var k=0; k<arData[i].length; k++) {
					if (parseFloat(arData[i][k]) <= 0) {
						this.isNegative = true;
						if (negativeData == null) {negativeData = [];}
						negativeData.push(arData[i][k]);
					}else {
						if (positiveData == null) {positiveData = [];}
						positiveData.push(arData[i][k]);
					}
				}	
			}
			
			/*if (negativeData != null && negativeData.length == 1 && negativeData[0] == 0) {
				this.isNegative = false;
				negativeData = [];
				nagativeLv = 0;
			}*/
			
			//양수만 존재할 경우
			if (!this.isNegative) {
				$.each(positiveData, function(i, el){
					if($.inArray(el, tmpPositiveData) === -1) tmpPositiveData.push(el);
				});
				positiveData = tmpPositiveData;
				
				tmpValPerSlice[0] = [];
				var tmpResult = that.jenks(positiveData, parseInt(that.lv)); //2016.04.04 범례
				for (var i=0;i <tmpResult.length; i++) {
					tmpValPerSlice[0].push(tmpResult[i]);
				}
				
				if (colorList == null) {colorList = [];}
				var colorList2 = getCalculColor("#ffd75d", "#cd1103", that.lv);
				for (var i=0; i<colorList2.length; i++) {
					colorList.push(colorList2[i]);
				}
			}else {
				//음수/양수 데이터가 모두 존재할 경우
				if (positiveData != null) {
					//데이터 중복제거
					$.each(negativeData, function(i, el){
						if($.inArray(el, tmpNegativeData) === -1) tmpNegativeData.push(el);
					});
					$.each(positiveData, function(i, el){
						if($.inArray(el, tmpPositiveData) === -1) tmpPositiveData.push(el);
					});
					negativeData = tmpNegativeData;
					positiveData = tmpPositiveData;
					
					var lv = Math.floor((parseInt(that.lv))/2); //2016.04.04 범례
					var nagativeLv = 0;
					var positiveLv = 0;
					if (lv % 2 != 0) {
						nagativeLv = lv;
						positiveLv = parseInt(that.lv)-nagativeLv;
					}else {
						nagativeLv = lv;
						positiveLv = lv;
						
						//2016.03.17 수정 - 분할범례 버그수정
						if (that.lv == 5) {
							positiveLv = lv+1;
						}
					}
					
					tmpValPerSlice.push(that.jenks(negativeData, nagativeLv)); //2016.04.04 범례
					tmpValPerSlice[0].pop();
					tmpValPerSlice[0].push(0);
					
					var tmpResult = that.jenks(positiveData, positiveLv-1); //2016.04.04 범례
					for (var i=0;i <tmpResult.length; i++) {
						tmpValPerSlice[0].push(tmpResult[i]);
					}
					
					this.nagativeLv = nagativeLv;
					this.positiveLv = positiveLv;
					// 2017. 03. 10 개발팀 수정요청 
					colorList = getCalculColor("#cd1103", "#ffd75d", nagativeLv);
//					var colorList2 = getCalculColor("#663240", "#cc0000", positiveLv);
					var colorList2 = getCalculColor("#cccccc", "#22277a", parseInt(that.lv)-nagativeLv);
					for (var i=0; i<colorList2.length; i++) {
						colorList.push(colorList2[i]);
					}
				}
				//음수만 존재할 경우
				else {
					//데이터 중복제거
					$.each(negativeData, function(i, el){
						if($.inArray(el, tmpNegativeData) === -1) tmpNegativeData.push(el);
					});
					negativeData = tmpNegativeData;
					
					tmpValPerSlice[0] = [];
					var tmpResult = that.jenks(negativeData, parseInt(that.lv)); //2016.04.04 범례
					for (var i=0;i <tmpResult.length; i++) {
						tmpValPerSlice[0].push(tmpResult[i]);
					}
					
					if (colorList == null) {colorList = [];}
//					var colorList2 = getCalculColor("#0066aa", "#434471", that.lv);
					// 2017. 08. 02 색상 변경
					// mng_s 20170802_김건민
//					var colorList2 = getCalculColor("#a501b7", "#7c02cd", that.lv);
					var colorList2 = getCalculColor("#22277a", "#9395b0", that.lv);
					// mng_e 20170802_김건민
					for (var i=0; i<colorList2.length; i++) {
						colorList.push(colorList2[i]);
					}
				}
			}
			
			this.negativeLegendColor = colorList;
			this.legendValue.negative = tmpValPerSlice;
		};
		//mng_e 20170823 leekh
		
		/**
	     * 
	     * @name         : calEqualLegend
	     * @description  : 균등범례를 계산한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 : 
	     * @param arData : 통계데이터
	     */
		this.calEqualLegend = function(arData) {
			var equalMin, equalMax; 
			var tmpValPerSlice = [];
			for ( var k = 0; k < arData.length; k++) {
				if (arData[k].length == 1) {
					var data = arData[k][0];
					var tmpResult = new Array();
					for ( var x = 0; x < that.lv+1; x++) { //2016.04.04 범례
						var value = data+(data*x);
						// 2016. 09. 23 SseOk 수정
						tmpResult.push(parseFloat(parseFloat(value).toFixed(2)));
					}
					tmpValPerSlice[k] = tmpResult;
				}else {
					var min = Math.min.apply(null, arData[k]);
					var max = Math.max.apply(null, arData[k]);
					equalMin = min;
					equalMax = max;
							
					var result = (max - min) / (that.lv);//2016.04.04 범례
					if (result == 0 && min != max) {
						result = 1;
					}
							
					var tmpResult = new Array();
					for ( var y=0; y <that.lv; y++) { //2016.04.04 범례
						if (result == 1 && min != max) {
							tmpResult.push(result);
						}else {
							// 2016. 09. 23 SseOk 수정
							tmpResult.push(parseFloat(parseFloat((min+result * y)).toFixed(2))); //그래서 303 + 57* 
						}
					}
					tmpValPerSlice[k] = tmpResult;
				}
				
			}
			this.legendValue.equal = tmpValPerSlice;
		};
		
		/**
	     * 
	     * @name         : calAutoLegend
	     * @description  : 자동범례를 계산한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 : 
	     * @param arData : 통계데이터
	     */
		this.calAutoLegend = function(arData) {
			var tmpValPerSlice = [];
			for(var i = 0; i < arData.length; i++){
				var tmpResult = that.jenks(arData[i], that.lv); //2016.04.04 수정
				tmpValPerSlice.push(tmpResult);
			}
			this.legendValue.auto = tmpValPerSlice;
		}
			
		/**
	     * 
	     * @name         : calUserLegend
	     * @description  : 사용자범례를 계산한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history 	 : 
	     */
		this.calUserLegend = function() {
			//사용자범례가 지정되어 있지 않을 경우,
			//자동범례로 초기화한다.
			if (this.legendType != "user") {
				var tmpValPerSlice = this.legendValue.auto;
				this.legendValue.user = tmpValPerSlice;
			}	
		};
		
		/**
	     * 
	     * @name         : setUserLegend
	     * @description  : 사용자범례를 설정한다.
	     * @date         : 2016. 08. 16. 
	     * @author	     : 권차욱
	     * @history 	 : 
	     */
		this.setUserLegend = function(type, lv) {
			
			console.log("[legendInfo.js] setUserLegend() 호출");
			console.log("[legendInfo.js] setUserLegend() this.map.isInnerMapShow2 [" + this.map.isInnerMapShow2);
			console.log("[legendInfo.js] setUserLegend() this.map.isInnerMapShow3 [" + this.map.isInnerMapShow3);
			
			//범례기준치 설정
			var tmpValPerSlice = null;
			if (that.valPerSlice == null) {
				tmpValPerSlice = deepCopy(that.legendValue.user);
			}else {
				if (type == "equal") {
					tmpValPerSlice = deepCopy(that.legendValue.equal);
				}else if (type == "auto") {
					tmpValPerSlice = deepCopy(that.legendValue.auto);
				}else {
					tmpValPerSlice = deepCopy(that.legendValue.user);
				}
			}
			
			lv = parseInt(lv);
			
			if(this.map.isInnerMapShow2) { //mng_s 그리드인 경우
				//tmpValPerSlice = this.map.grid_legend_new;
				tmpValPerSlice = [[100,200,300,400,500,600,700,800,900,1000]]; //임시값 세팅
				lv = 10;
			}
			if(this.map.isInnerMapShow3) { //mng_s 행정구역 그리드인 경우
				//tmpValPerSlice = this.map.grid_legend_new;
				tmpValPerSlice = [[100,200,300,400,500,600,700,800,900,1000]]; //임시값 세팅
				lv = 10;
			}
			
			
			//범례에서 구간을 선택할 경우 
			if (lv > tmpValPerSlice[0].length) {
				var length = tmpValPerSlice[0].length;
				var idx = 0;
				var gap = 0;
				for (var i=length; i<lv; i++) {
					if (idx == 0) {
						gap = tmpValPerSlice[0][tmpValPerSlice[0].length-1]/5;
					}
					var max = tmpValPerSlice[0][tmpValPerSlice[0].length-1] + gap;
					tmpValPerSlice[0].push(max);
					idx++;
				}
			}else {
				var tmpSlice = [];
				for (var i=0; i<lv; i++) {
					tmpSlice.push(tmpValPerSlice[0][i]);
				}
				tmpValPerSlice[0] = tmpSlice;
			}
			
		
			var width = 380;
			var gap = 0.01;
			var curXpos = 0;
			var gChart = null;
			var xMax = tmpValPerSlice[0][tmpValPerSlice[0].length-1] + (tmpValPerSlice[0][tmpValPerSlice[0].length-1]/5); 
			var xMin = tmpValPerSlice[0][0];
			var renderImages = [];
			var plotBandList = [];
			var tmpLineData = [];
			var tmpStatsData = [];
			var tmpLegendColor = null;
			var polygonList = null;
			var imageHeight = ($("#goganList_"+that.id).height()/2)-10;
			var tmpDraggableX = false;
			if (type == "user") {
				tmpDraggableX = true;
			}
			var marginLeft = 15;
			var ylabelPosX = -15;
			
			//색상범위 설정
			if (that.negativeLegendColor != null || that.combineColorList != null) {
				if ($("#negativeDefaultColor_"+that.id+ " >a").hasClass("on")) {
					tmpLegendColor = that.negativeLegendColor;
				}
				else if ($("#combineColor_"+that.id+ " >a").hasClass("on")) {
					tmpLegendColor = that.combineColorList;
				}
				else {
					tmpLegendColor = getCalculColor(that.legendColor2,that.legendColor1, lv);
				}
			}else {
				tmpLegendColor = getCalculColor(that.legendColor2,that.legendColor1, lv);
			}
			
			//구간별 데이터 설정
			for (var i=0; i<lv; i++) {
				var from, to;
				if (i==0) {
					from = -10000;
					to = tmpValPerSlice[0][i+1];
				}
				else if (i==lv-1) {
					from = tmpValPerSlice[0][i]
					to = xMax*2;
				}
				else {
					from = tmpValPerSlice[0][i];
					to = tmpValPerSlice[0][i+1]
				}
				var tmpData = {
						from : from,
						to : to,
						color: tmpLegendColor[i],
						id: i
				}
				plotBandList.push(tmpData);
				
				if (i != lv-1) {
					var tmpLineList = [tmpValPerSlice[0][i+1], 20, 0];
					tmpLineData.push(tmpLineList);
				}
			}
			
			//구간별 히스토그램 설정
			if (that.data != undefined && that.data != null && that.data[0] != undefined && that.data[0].length > 0) {
				polygonList = that.calCntPerGugan(tmpValPerSlice[0], that.data[0], -10000, xMax*2);
			}		
			
			//사용자범례 차트 설정
			$("#goganList_"+that.id).empty();
			var chart = $("#goganList_"+that.id).highcharts({
				 chart: {
		               animation : false,    
		               events : {
		            	   load : function(e) {
		            		   //this.xAxis[0].setExtremes(xMin, xMax);
		            	   },
		                   redraw : function() {
		                	   gChart = this;
		                	   if (type == "user") {
		                		   if (renderImages.length > 0) {
			                           for (var i=0;i <renderImages.length; i++) {
			                               renderImages[i].destroy();
			                           }
			                           renderImages = [];
			                       }

			                       for (var i=0; i<gChart.series[0].points.length; i++) {
			                           var point = gChart.series[0].points[i];
			                           var image = gChart.renderer
			                                   .image('/img/bg/grip3.png', parseInt(point.clientX+4)-11 + marginLeft, 10, 15, 110)
			                                   .attr({
			                                       id : "image_"+ i,
			                                       zIndex : "10",
			                                       class : "arrow_grip"
			                                   })
			                                   .add();
			                           renderImages.push(image);
			                       } 
		                	   } 
		                   }
		               },
		               width : width,
		               height:160,
		               marginLeft: marginLeft
		               
		               
		           },
		           exporting: { enabled: false },
		           title: {
		               text: ''
		           },

		           xAxis: {
		               min : xMin,
		               max: xMax,
		               plotBands: plotBandList,
		               gridLineWidth: 0,
		               minorGridLineWidth: 0,
		               startOnTick : false,
		               endOnTick : false
		           },

		           yAxis : {
		               min : 0,
		               max : 20,
		               title : {
		                   enabled : false
		               },
		               labels : {
		            	   align : "left",
		            	   x : ylabelPosX,
		            	   y : 5,
		            	   formatter: function() {
		                       if ( this.isFirst ) { return ''; }
		                       return this.value;
		                   }
		               },
		               gridLineWidth: 0,
		               minorGridLineWidth: 0
		           },

		           plotOptions: {
		               column: {
		                   colorByPoint: false,
		                   grouping: false,
		                   shadow: false,
		                   borderWidth: 0,
		               },
		               series: {
		            	   states : {
		            		   hover : {
		            			   enabled : false
		            		   }
		            	   },
		                   point: {
		                       events: {
		                           drop : function(e) {
		                        	   var index = -1;
		        				       if(renderImages.length > 0) {
		        				           for (var i = 0; i < renderImages.length; i++) {
		        				               var image = renderImages[i];
		        				               if (image.element.id == "image_" + this.index) {
		        				                   index = i;
		        				                   break;
		        				               }
		        				           }

		        				           if (index != -1) {
		        				               renderImages[index].destroy();
		        				               renderImages.splice(index, 1);

		        				               for (var i = 0; i < this.series.points.length; i++) {
		        				                   var point = this.series.points[i];
		        				                   if (point.index == this.index) {
		        				                       var image = gChart.renderer
		        				                               .image('/img/bg/grip3.png', parseInt(point.clientX+4)-11 + marginLeft, 10, 15, 110)
		        				                               .attr({
		        				                                   id: "image_" + this.index,
		        				                                   zIndex: "10",
		        				                                   class : "arrow_grip"
		        				                               })
		        				                               .add();
		        				                       renderImages.push(image);
		        				                       break;
		        				                   }
		        				               }
		        				           }
		        				       }
		        				       //이미지 show
		        				       $("#image_"+this.index).fadeTo( 500, 1);
		        				       
		        				       //구간을 움직이고 나서, 구간안에 속한 데이터의 빈도수를 다시 계산한다.
		        				       if (that.data != null && that.data[0].length > 0) {
		        				    	   var tmpSlice = [];
		        							tmpSlice.push(gChart.xAxis[0].min);
		        							for (var i=0; i<gChart.series[0].xData.length; i++) {
		        								// 2016. 09. 23 SseOk 수정
		        								tmpSlice.push(parseFloat(parseFloat(gChart.series[0].xData[i]).toFixed(2)));
		        							}
		        							polygonList = that.calCntPerGugan(tmpSlice, that.data[0], -10000, xMax*2);
		        							gChart.series[1].setData(polygonList, true);
		        				       }
		                           },
		                           drag: function(e) {
		                        	   for (var i=0; i<this.series.xAxis.plotLinesAndBands.length; i++) {
		        				           if (this.series.xAxis.plotLinesAndBands[i].options.id == this.index) {
		        				               curXpos = this.series.xAxis.plotLinesAndBands[i].options.from;
		        				               break;
		        				           }
		        				       }

		        				       if (e.x < xMin) {
		        				           e.x = xMin;
		        				           return false;
		        				       }else if (e.x > xMax) {
		        				           e.x = xMax;
		        				           return false;
		        				       }

		        				       for (var i=0; i<this.series.data.length; i++) {
		        				           var data = this.series.data[i];
		        				           if (this.index != data.index) {
		        				               if (this.index < data.index) {
		        				                   if (e.x >= data.x - gap) {
		        				                       e.x = data.x - gap;
		        				                       return false;
		        				                   }
		        				               }else {
		        				                   if (e.x <= data.x + gap) {
		        				                       e.x = data.x + gap;
		        				                       return false;
		        				                   }
		        				               }
		        				           }
		        				       }
		        				       
		        				       this.series.xAxis.removePlotBand(this.index);
		        				       this.series.xAxis.removePlotBand(parseInt(this.index+1));
		        				       this.series.xAxis.addPlotBand({
		        				           from: curXpos,
		        				           to: e.x,
		        				           color: tmpLegendColor[parseInt(this.index)],
		        				           id: this.index
		        				       });

		        				       if (parseInt(this.index+1) < tmpValPerSlice[0].length-1) {
		        				    	   this.series.xAxis.addPlotBand({
		        				               from: e.x,
		        				               to: this.series.data[parseInt(this.index+1)].x,
		        				               color: tmpLegendColor[parseInt(this.index+1)],
		        				               id: parseInt(this.index+1)
		        				           });
		        				       }else {  
		        				    	   this.series.xAxis.addPlotBand({
		        				               from: e.x,
		        				               to: 1000000000,
		        				               color: tmpLegendColor[parseInt(this.index+1)],
		        				               id: parseInt(this.index+1)
		        				           });  
		        				       }

		        				       var index = -1;
		        				       if(renderImages.length > 0) {
		        				           for (var i=0; i<renderImages.length; i++) {
		        				               var image = renderImages[i];
		        				               if (image.element.id == "image_"+this.index) {
		        				                   index = i;
		        				                   break;
		        				               }
		        				           }
		        				           if (index != -1) {
		        				               //이미지 hide
		        				               $("#image_"+this.index).hide();
		        				           }
		        				       }
		        				       
		                           }
		                       }
		                   }
		               }
		           },

		           tooltip: {
		               formatter : function() {
		            	   var tooltip = null;
		            	   tooltip =  "<b><span>" + this.x.toFixed(2) + "</span></b>";
		            	   return tooltip;
		               },
		               positioner: function(boxWidth, boxHeight, point) {
		                   return {
		                       x: point.plotX - 25,
		                       y: point.plotY + 10
		                   };
		               }
		           },

		           series: [{
		               type: "column",
		               cursor: "move",
		               draggableX: tmpDraggableX,
		               showInLegend: false,
		               color: "rgba(0,0,0,0)",
		               data: tmpLineData,
		               borderWidth: 0,
		               pointWidth: 0.5
		           }, {
		        	   type: "polygon",
		        	   name: "polygon",
		        	   showInLegend: false,
		        	   borderWidth: 0,
		        	   color: "rgba(45,45,45,0.3)",
		        	   pointWidth: 10,
		        	   data: polygonList,
		        	   enableMouseTracking: false
		           }]
			});
		};	
		
		/**
	     * 
	     * @name         : setGoganText
	     * @description  : 범례의 레벨별 텍스트를 설정한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history 	 : 
	     */
		this.setGoganText = function(valPerSlice){
			var value = null;
			if (this.guganTextShow) {
				//데이터 중복제거
				var tmpData = [];
				$.each(valPerSlice, function(k, el){
					if($.inArray(el, tmpData) === -1) tmpData.push(el);
				});
				
				if (tmpData.length <= 1) {
					for(var i = 0;i <that.lv; i++){
						var idx = (that.lv-1) - i;
						value = appendCommaToNumber(valPerSlice[i]);
						$("#colorStatus_"+that.id+">li:eq("+idx+")>span").text(value);
					}
				}else {
					for(var i = 0;i <that.lv; i++){
						var idx = (that.lv-1) - i;
						if (i == 0) {
							value = appendCommaToNumber(valPerSlice[i+1]) + " 이하"; //2016.03.29 수정, 이하 삭제
						}else if (i == that.lv-1) {
							value = appendCommaToNumber(valPerSlice[i]) + " 초과";
						}else {
							value = appendCommaToNumber(valPerSlice[i]) + " ~ " + appendCommaToNumber(valPerSlice[i+1]) + " 이하"; //2016.03.29 수정, 이하
						}
						$("#colorStatus_"+that.id+">li:eq("+idx+")>span").text(value);
						$("#colorStatus_"+that.id+">li:eq("+idx+")>span").autoTextSize(9, 12, false); // ie에서 제대로 동작안함, ...찍힘
					}
				}	
			}
		}; //2016.03.25 수정, 세미콜론 추가
			
		/**
	     * 
	     * @name         : getColor
	     * @description  : 범례의 레벨별 텍스트를 설정한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history 	 : 권차욱 수정
	     * @param value  : 통계데이터
	     * @param valPerSlice : 범례기준데이터
	     */
		this.getColor = function(value, valPerSlice) {
			//음수/양수 분할
			if (this.legendType == "negative" && this.negativeLegendColor != null && this.isNegativeColorShow) {
				this.legendColor = this.negativeLegendColor;
				setLegendColor(this.legendColor,"#colorStatus_"+this.id, this.id,that);
				//setResizeColor(this.legendColor,"#goganList_"+this.id, this.id,that);
			}
			if (valPerSlice.length < this.lv && that.legendType == "auto") {
				for (var i=0; i<valPerSlice.length; i++) {
					if (value == valPerSlice[i]) {
						return [ that.legendColor[i], i+1 ];
					}
				}
			}else {
				var returnLevel=0;
				for(var i = 1; i<valPerSlice.length;i++){ //2016.04.04 범례
					if(value <= valPerSlice[i]){
						return [$.trim(that.legendColor[i-1]), i-1]; //2016.04.04 범례
					}
				}
				return [$.trim(that.legendColor[that.lv-1]), that.lv]; //2016.04.04 범례
			}
		}; //2016.03.25 수정, 세미콜론 추가
			
		/**
	     * 
	     * @name         : getColorForLevel
	     * @description  : 레벨에 따른 색상을 설정한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history
	     * @param level  : 범례레벨
	     */
		this.getColorForLevel = function (level) {
			/*var color;
			switch (level) {
				case 1:
					color = that.legendColor[0];
					break;
				case 2:
					color = that.legendColor[1];
					break;
				case 3:
					color = that.legendColor[2];
					break;
				case 4:
					color = that.legendColor[3];
					break;
				case 5:
					color = that.legendColor[4];
					break;
				case 6:
					color = that.legendColor[5];
					break;
				case 7:
					color = that.legendColor[6];
					break;
				case 8:
					color = that.legendColor[7];
					break;
				case 9:
					color = that.legendColor[8];
					break;
				case 10:
					color = that.legendColor[9];
					break;
				default:
					color = '#FFEB3B';
					break;
			}*/
			return that.legendColor[level];
		};		

		/**
	     * 
	     * @name         : userColorSetting
	     * @description  : 기본 버튼들의 기능에 대한 정의한다
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history
	     */
		this.userColorSetting = function(){
			$("body").on("click",".tabs .btnStyle01",function(){
				$(this).parents(".tabs").eq(0).find(".btnStyle01").removeClass("on");
				$(this).addClass("on");
			});
			
			//legend 객체에 대한 값 변경을 위해서 그냥 객체를 같이 던져도 괜찮을듯
			$("body").on("click","#tabsSelector_"+that.id+" >a",function(){
				$("#colorSetting_"+that.id).hide();
				$("#colorSettingList01_"+that.id).css({"width":"380px"});
				$("#colorbarBox_"+that.id+">a").css("top","-5000px");
				var inx = $(this).index("#tabsSelector_"+that.id+" >a");
				if(inx==0){
					$("#colorSetting_"+that.id).show();						
					var colorckList = $("#colorSetting_"+ that.id +" > li> a");
					var arrColor = new Array();
					var color;
						
					for(var i = 0 ; i<colorckList.length;i++){
						if(colorckList[i].classList.length>0){
							for(var y=0;y<colorckList[i].classList.length;y++){
								if(colorckList[i].classList[y] =="on"){
									color = colorckList[i].style.background;
								}
							}
						}
					}
					var startColor = "#ffd75d";
					if (this.delegate != undefined && this.delegate.namespace != undefined && this.delegate.namespace === "houseAnalysisMap") {
						startColor = "#cccccc"
					}
					legendColor(color, startColor, "#colorSettingList01_"+that.id, $("#lvSelect_"+that.id).val(),that.id,that);	
				}else if(inx==1){
					legendColor("#ff1b00", "#048cfc", "#colorSettingList01_"+that.id, that.lv,that.id,that);
					$('#colorSettingList01_'+that.id+'>li').append(
							$('<a href="javascript:void(0)">#ff1b00</a>')
								.width((100/$("#colorSettingList01_"+that.id+">li").length)+"%")
								.height("31px")
								.wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" })
					);
				}else{
					$("#colorbarBox_"+that.id+">a").css("top","10px");
					$("#colorSettingList01_"+that.id).css({"width":"300px"});
					legendColor(that.fixLegendColor1, that.fixLegendColor2, "#colorSettingList01_"+that.id, that.lv,that.id,that);
				}
			});
			
			$('.colorbarBox>a').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
			
			$('body').on('click', "#legendPopEvent01_"+that.id, function(){
				var ck = $("#typeArea_"+that.id).attr("class");
				if(ck == "dot"){
					$("#jumSettingLayer_"+that.id).show(); 
				}
					
				//단계설정 hide/show
				var on = $("#guganSettingLayer_"+that.id).is(":visible");
				if (!on) {
					$("#guganSettingLayer_"+that.id).show();
					if ($("#guganUser_"+that.id).hasClass("on")) {
						$("#guganUser_"+that.id).click();
					}
				}else {
					$("#guganSettingLayer_"+that.id).hide();
				}
					
				//색상설정 hide/show
				var on = $("#colorSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#colorSettingLayer_"+that.id).hide();
					$("#legendPopEvent02_"+that.id).removeClass("on");
				}
					
				//타입설정 hide/show
				$("#lgTypeList_"+that.id).hide();
				on = $("#legendPopEvent00_"+that.id).hasClass("on");
				if (on) {
					 $("#legendPopEvent00_"+that.id).removeClass("on");
				}
				
				//범례고정 hide/show
				on = $("#legendFixed_"+that.id).is(":visible");
				if (on) {
					$("#legendFixed_"+that.id).hide();
					$("#legendPopEvent03"+that.id).removeClass("on");
				}
				
				//투명도설정 hide/show
				var on = $("#opacityLayer_"+that.id).is(":visible");
				if (on) {
					$("#opacityLayer_"+that.id).hide();
					$("#legendPopEvent04"+that.id).removeClass("on");
				}
			});
				
			$('body').on('click', "#legendPopEvent02_"+that.id, function(){
				lvLegendSetting(that.id,that);
				var ck = $("#typeArea_"+that.id).attr("class");
				if(ck == "dot"){
					$("#jumSettingLayer_"+that.id).show(); 
				}
					
				//색상설정 hide/show
				var on = $("#colorSettingLayer_"+that.id).is(":visible");
				if (!on) {
					$("#colorSettingLayer_"+that.id).show();
				}else {
					$("#colorSettingLayer_"+that.id).hide();
				}
					
				//단계설정 hide/show
				var on = $("#guganSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#guganSettingLayer_"+that.id).hide();
					$("#legendPopEvent01_"+that.id).removeClass("on");
				}
					
				//타입설정 hide/show
				$("#lgTypeList_"+that.id).hide();
				on = $("#legendPopEvent00_"+that.id).hasClass("on");
				if (on) {
					$("#legendPopEvent00_"+that.id).removeClass("on");
				}	
				
				//범례고정 hide/show
				on = $("#legendFixed_"+that.id).is(":visible");
				if (on) {
					$("#legendFixed_"+that.id).hide();
					$("#egendPopEvent03"+that.id).removeClass("on");
				}
				
				//투명도설정 hide/show
				var on = $("#opacityLayer_"+that.id).is(":visible");
				if (on) {
					$("#opacityLayer_"+that.id).hide();
					$("#legendPopEvent04"+that.id).removeClass("on");
				}
			});
			
			$('body').on('click', '#legendPopEvent00_'+that.id, function() {
				//단계설정 hide/show
				var on = $("#guganSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#guganSettingLayer_"+that.id).hide();
					$("#legendPopEvent01_"+that.id).removeClass("on");
				}
					
				//색상설정 hide/show
				on = $("#colorSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#colorSettingLayer_"+that.id).hide();
					$("#legendPopEvent02_"+that.id).removeClass("on");
				}
				
				//범례고정 hide/show
				on = $("#legendFixed_"+that.id).is(":visible");
				if (on) {
					$("#legendFixed_"+that.id).hide();
					$("#egendPopEvent03"+that.id).removeClass("on");
				}
				
				//투명도설정 hide/show
				var on = $("#opacityLayer_"+that.id).is(":visible");
				if (on) {
					$("#opacityLayer_"+that.id).hide();
					$("#legendPopEvent04"+that.id).removeClass("on");
				}
			});
			
			//범례고정
			$('body').on('click', '#legendPopEvent03_'+that.id, function() {
				//단계설정 hide/show
				var on = $("#guganSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#guganSettingLayer_"+that.id).hide();
					$("#legendPopEvent01_"+that.id).removeClass("on");
				}
					
				//색상설정 hide/show
				on = $("#colorSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#colorSettingLayer_"+that.id).hide();
					$("#legendPopEvent02_"+that.id).removeClass("on");
				}
				
				//타입설정 hide/show
				$("#lgTypeList_"+that.id).hide();
				on = $("#legendPopEvent00_"+that.id).hasClass("on");
				if (on) {
					$("#legendPopEvent00_"+that.id).removeClass("on");
				}
				
				//투명도설정 hide/show
				var on = $("#opacityLayer_"+that.id).is(":visible");
				if (on) {
					$("#opacityLayer_"+that.id).hide();
					$("#legendPopEvent04"+that.id).removeClass("on");
				}
			});
			
			$('body').on('click', '#legendPopEvent04_'+that.id, function() {
				//단계설정 hide/show
				var on = $("#guganSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#guganSettingLayer_"+that.id).hide();
					$("#legendPopEvent01_"+that.id).removeClass("on");
				}
				
				//색상설정 hide/show
				on = $("#colorSettingLayer_"+that.id).is(":visible");
				if (on) {
					$("#colorSettingLayer_"+that.id).hide();
					$("#legendPopEvent02_"+that.id).removeClass("on");
				}
				
				//타입설정 hide/show
				$("#lgTypeList_"+that.id).hide();
				on = $("#legendPopEvent00_"+that.id).hasClass("on");
				if (on) {
					$("#legendPopEvent00_"+that.id).removeClass("on");
				}
				
				//범례고정 hide/show
				on = $("#legendFixed_"+that.id).is(":visible");
				if (on) {
					$("#legendFixed_"+that.id).hide();
					$("#egendPopEvent03"+that.id).removeClass("on");
				}
				
				//투명도설정 hide/show
				var on = $("#opacityLayer_"+that.id).is(":visible");
				if (!on) {
					$("#opacityLayer_"+that.id).show();
				}else {
					$("#opacityLayer_"+that.id).hide();
					$("#legendPopEvent04"+that.id).removeClass("on");
				}
			});
							
			$('body').on('click', "#opacityBox_"+that.id+" .colorck li a", function(){ 
				$(".jumColorLink").css("background",$(this).text());
			});
				
			$('.jumColorLink').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
			$('body').on('change sliderup sliderdown slidermove', ".jumColorLink", function(){
				$("#opacityBox_"+that.id+" .colorck li a.on").css("background",$(this).val()).text($(this).val()); 
			});
				
			$('body').on('change', "#opacitySel_"+that.id, function(){
				var val = $(this).val(); 
				$("#colorSetting01_"+that.id).css("opacity", val);  
			});
			$('body').on('change', "#opacitySel_"+that.id, function(){
				var val = $(this).val(); 
				$("#colorbarBox_"+that.id).css("opacity", val);  
			});
				
			$('body').on('change sliderup sliderdown slidermove', "#colorbarBox_"+that.id+">.fl", function(){
				var colorEnd = $("#colorbarBox_"+that.id+">.fr").text();
				$("#colorbarBox_"+that.id+">.fl").text($(this).val());
				legendColor(colorEnd, $(this).val(), "#colorSettingList01_"+that.id, that.lv,that.id,that);
			});
			
			$('body').on('change sliderup sliderdown slidermove', "#colorbarBox_"+that.id+">.fr", function(){
				var colorStart = $("#colorbarBox_"+that.id+">.fl").text();
				$("#colorbarBox_"+that.id+">.fr").text($(this).val());
				legendColor($(this).val(), colorStart, "#colorSettingList01_"+that.id, that.lv,that.id,that);
			});
		}
			
		/**
	     * 
	     * @name         : legendEvent
	     * @description  : 범례 이벤트에 대한 정의를 한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history
	     */	
		this.legendEvent = function(){
			$("#colorStatus_"+that.id).css("font-family", "Arial");
			$("#colorStatus_"+that.id+">li>span").css("font-size", "12px");
			
			var body = $("body"); 
			
			var settingList = "#lgListBox_"+that.id+">li>a";
			body.on("click", settingList, function(e){
				e.stopPropagation();
				var id = $(this).attr("id");
				var on = $(this).hasClass("on");
				if(!on){
					$(this).siblings("ul").show();
					$(this).addClass("on");
				}else{
					$(this).siblings("ul").hide();
					$(this).removeClass("on");
				}
				
				$(settingList).each(function() {
					if ($(this).attr("id") != id) {
						if ($(this).hasClass("on")) {
							$(this).removeClass("on");
						}
					}
				});
				
			});
			
			body.on("click","#lgTypeList_"+that.id+">li>a", function(){
				var cls = $(this).attr("data-type");
				if(cls =="data"){
					that.showNumberData();
				}else{
					var type = cls;
					var typeName = {
						"color"  : 0,	//색상
						"bubble" : 1,	//버블
						"dot"	 : 2,	//점
						"heat"	 : 3	//열
					};
					switch(typeName[cls]) {
						case 0:
							$("#legendPopEvent01_"+that.id).parent().show();
							$("#legendPopEvent02_"+that.id).parent().show();
			    			$("#bubbleLegendLine_"+that.id).hide();
			    			if ($("#legendBox_"+that.id).hasClass("min")) {
			    				$("#legendColor_"+that.id).hide();
			    			}else if ($("#legendBox_"+that.id).hasClass("max")) {
			    				$("#legendColor_"+that.id).show();
			    			}else {
			    				$("#legendColor_"+that.id).hide();
			    			}
							break;
						case 1:
							type = "ring";
							//$("#legendPopEvent01_"+that.id).parent().hide();
							//$("#legendPopEvent02_"+that.id).parent().hide();
			    			$("#legendColor_"+that.id).hide();
			    			if ($("#legendBox_"+that.id).hasClass("min")) {
			    				$("#bubbleLegendLine_"+that.id).hide();
			    			}else if ($("#legendBox_"+that.id).hasClass("max")) {
			    				$("#bubbleLegendLine_"+that.id).show();
			    			}else {
			    				$("#bubbleLegendLine_"+that.id).hide();
			    			}
			    			
							break;
						case 2:
							type = "jum";
							$("#legendPopEvent01_"+that.id).parent().hide();
							$("#legendPopEvent02_"+that.id).parent().hide();
							$("#legendColor_"+that.id).show();
			    			$("#bubbleLegendLine_"+that.id).hide();
							break;
						case 3:
							$("#legendPopEvent01_"+that.id).parent().hide();
							$("#legendPopEvent02_"+that.id).parent().hide();
							$("#legendColor_"+that.id).hide();
			    			$("#bubbleLegendLine_"+that.id).hide();
							break;
					}

					$("#typeArea_"+that.id).removeClass().addClass(type);
					that.selectType = cls;
					that.changeDataMode(cls);
					
					//분할맵일 경우, 분할맵 색상으로 돌아간다.
					if ($("#negativeDefaultColor_"+that.id + " >a").hasClass("on")) {
						that.isNegativeColorShow = true;
						that.map.setLegendColor();
					}else {
						legendColor(that.legendColor2, that.legendColor1, "#colorStatus_"+that.id, that.lv,that.id,that);
					}
				}
			});
				
			body.on("click","#btn_legendSetting_"+that.id, function(){
				var on = $(this).hasClass("on");
				if(!on){
					$("#lgListBox_"+that.id).stop().animate({"left":"220px"},200);
					$(this).addClass("on");
				}else{
					$("#lgListBox_"+that.id).stop().animate({"left":"-550px"},200);
					$(this).removeClass("on");
				}
			});
				
			var optionList = ".lgListBox>li>ul>li>a";
				body.on("click", optionList, function(){
				var html = $(this).html();
				if($(this).attr("data-type") !="data"){
					$(this).parents("ul").eq(0).siblings("a").empty().html(html).removeClass("on");	
				}else{
					$(this).parents("ul").eq(0).siblings("a").removeClass("on");
				}
				$(this).parents("ul").eq(0).hide();
			});
				
			body.on("click", "#btn_legend_"+that.id, function(){ 
				var legendBox = $("#legendBox_"+that.id);
				var ing = legendBox.attr("data-ing");
				legendBox.removeClass(ing); 
				$("#btn_legendSetting_"+that.id).removeClass("on");
				$("#lgListBox_"+that.id).stop().animate({"left":"-550px"},200);
				if(ing=="hide"){  
					legendBox.attr("data-ing", "min");
					legendBox.addClass("min");
					if ($("#typeArea_"+that.id).attr("class") == "color") {
						$("#colorStatus_"+that.id).find("span").hide();
					}
					if ($("#typeArea_"+that.id).attr("class") == "heat") {
						$("#heatMinLegend_"+that.id).show();
					}
				}else if(ing=="min"){ 
					legendBox.attr("data-ing", "max");
					legendBox.addClass("max");
					$("#heatMinLegend_"+that.id).hide();
					if ($("#typeArea_"+that.id).attr("class") == "ring") {
						$(".legendLine").show();
					}else if ($("#typeArea_"+that.id).attr("class") == "color" ||
							$("#typeArea_"+that.id).attr("class") == "jum") {
						$("#legendColor_"+that.id).show();
						$("#colorStatus_"+that.id).find("span").show();
					}
				}else if(ing=="max"){
					legendBox.attr("data-ing", "hide");
					legendBox.addClass("hide");
					$("#heatMinLegend_"+that.id).hide();
					if ($("#typeArea_"+that.id).attr("class") == "ring") {
						$(".legendLine").hide();
					}else if ($("#typeArea_"+that.id).attr("class") == "color" ||
							  $("#typeArea_"+that.id).attr("class") == "jum") {
						$("#legendColor_"+that.id).hide();
					}
				}	
			});	
			
			//범례고정 선택
			body.on("click","#legendFixed_"+that.id+">li>a", function(){
				var type = {
						"legendFixedA" : 0,
						"legendFixedB" : 1,
						"legendFixedC" : 2,
				};
				
				var cls = $(this).attr("class")
				switch (type[cls]) {
					case 0:
						$(this).css("background", "rgb(0, 112, 192)");
						$("#legendFixed_"+that.id).find(".legendFixedB").css("background", "#29435e");
						$("#legendFixed_"+that.id).find(".legendFixedC").css("background", "#29435e");
						break;
					case 1:
						$(this).css("background", "rgb(158, 213, 99)");
						$("#legendFixed_"+that.id).find(".legendFixedA").css("background", "#29435e");
						$("#legendFixed_"+that.id).find(".legendFixedC").css("background", "#29435e");
						break;
					case 2:
						$(this).css("background", "rgb(255, 0, 102)");
						$("#legendFixed_"+that.id).find(".legendFixedA").css("background", "#29435e");
						$("#legendFixed_"+that.id).find(".legendFixedB").css("background", "#29435e");
						break;
				}
				
				that.legendCopy(type[cls]);
				
			});
		}
		
		/**
	     * 
	     * @name         : colorck
	     * @description  : 
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history
	     */	
		this.colorck = function(){
			$(".colorck li").each(function(i){ 
				var selector = $(this).children("a");
				selector.css("background", selector.text());
			});
			
			$("body").on("click",".colorck li>a",function(){
				$(this).parents(".colorck").eq(0).find("a").removeClass("on");
				$(this).addClass("on");
				
				var dataid = $(this).parents(".colorck").eq(0).attr("id");
				var color = $(this).text();
				var startColor = $(this).attr("start-color");
				var listLegnth = $("#lvSelect_"+that.id).val();
				
				//mng_s
				console.log("[legendInfo.js] colorck() color [" + color);
				if (map.isInnerMapShow2) {
					if(color == "#cd1103") {
						map.gridLegendClickNum = 0;
					} else if(color == "#0e4000") {
						map.gridLegendClickNum = 1;
					} else if(color == "#004574") {
						map.gridLegendClickNum = 2;
					} else if(color == "#230064") {
						map.gridLegendClickNum = 3;
					} else if(color == "#00076a") {
						map.gridLegendClickNum = 4;
					} else if(color == "#783300") {
						map.gridLegendClickNum = 5;
					} 
				}
				
				//mng_s kimjoonha 20180219
				if (map.isInnerMapShow3) {
					if(color == "#cd1103") {
						map.gridLegendClickNum = 0;
					} else if(color == "#0e4000") {
						map.gridLegendClickNum = 1;
					} else if(color == "#004574") {
						map.gridLegendClickNum = 2;
					} else if(color == "#230064") {
						map.gridLegendClickNum = 3;
					} else if(color == "#00076a") {
						map.gridLegendClickNum = 4;
					} else if(color == "#783300") {
						map.gridLegendClickNum = 5;
					} 
				}
				
				
				//혼합색상 클릭 시
				if ($(this).hasClass("combined")){
					var arrColor = that.combineColorList;
					setLegendColor(arrColor, "#colorStatus_"+that.id, that.id, that);
					that.updateGuganLegend();
					return;
				}else {
					$("#combineColor_"+that.id).hide();
				}
				
				//분할맵일 경우, 분할맵 색상으로 돌아간다.
				if ($(this).parent().attr("class") == "negativeDefaultColor") {
					that.isNegativeColorShow = true;
					that.map.setLegendColor();
					
					//분할범례일 경우, 분할범례에 맞는 구간설정 색상을 설정한다.
					if (that.negativeLegendColor != null) {
						setLegendColor(that.negativeLegendColor,"#colorStatus_"+that.id, that.id,that);
						that.updateGuganLegend();
					}
					return;
				}
					
				that.legendColor1 = color;
				that.legendColor2 = $(this).attr("start-color");
				
				if(dataid =="colorSetting_"+that.id){
					legendColor(startColor, color, "#colorSettingList01_"+that.id, listLegnth,that.id,that);
				}else if(dataid =="legendColor_"+that.id){
					legendColor(startColor, color, "#colorStatus_"+that.id, listLegnth,that.id,that);
					that.updateGuganLegend();
					if (that.selectType == "dot") {
						that.changeDotColor(color);
					}
					//맵의 색상 변경 시키기
					that.isNegative = false;
					that.isNegativeColorShow = false;
					that.map.setLegendColor();
				} 
			}); 
		}
			
		/**
	     * 
	     * @name         : linkTooltip
	     * @description  : 
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history
	     */		
		this.linkTooltip = function(){
			$("a").tooltip({ 
				open: function( event, ui ) {
					var target = $(this);
					setTimeout(function() {
						$(".ui-tooltip .subj").text(target.attr("data-subj"));
						 ui.tooltip.css("max-width", "400px");
						//ui.tooltip.css("top", event.clientY); //2018.01.15 [개발팀] 주석처리
					},100);
					
				},
				position: {
				      my: "left+10 top", at: "right top", 
				      collision : "flip",
				      using: function( position, feedback ) {
				    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
				    		  $( this ).css( position ).prepend("<span class='subj'></span>");
				    	  }else {
				    		  $( this ).css( position ); 
				    	  }
				    	  
				          $( "<div>" )
				           /* .addClass( "arrow" )*/
				            .addClass( feedback.vertical )
				            .addClass( feedback.horizontal )
				            .appendTo( this );
				      }
				},
				content: function () {
					var title = $(this).attr("title");
					//2017-08-30 [개발팀]
					if (title != undefined) {
						title = title.replace(/&lt;p&gt;/gi, '');
						title = title.replace(/&lt;p&gt;/gi, '');
						title = title.replace(/&lt;/gi, '<');
						title = title.replace(/&gt;/gi, '>');
						title = title.replace(/&quot;/gi, '');
						$(this).attr("title", title); 
					}
					return $(this).prop('title');
		        }
			});
		}
			
		/**
	     * 
	     * @name         : jumSlider
	     * @description  : 점지도 범례의 반지름을 설정한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history
	     */		
		this.jumSlider = function(){
			$(".jumSlide").slider({
			    range: false, 
				min : 5,
				max : 9,
				values : [5],
			    slide : function(e, ui) {
			        $("#typeArea_"+that.id+" .colorck>li>a").css({"width":parseInt(ui.values[0]+7)+"px",
			        	"height":parseInt(ui.values[0]+7)+"px",
			        	"margin-top":parseInt(10-ui.values[0])+"px"}); 
			        that.changeDotRadius(ui.value);
			    }
			});
		}
			
		/**
	     * 
	     * @name         : heatTable
	     * @description  : 열지도 범례를 설정한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history
	     */		
		this.heatTable = function(){
			/*$('.heatTable').wheelColorPicker({
				layout: 'block',
				format: 'css'
			}); 
			$('.heatTable').on('slidermove', function() {
				$('#color-label_'+that.id).text($(this).val());
			}); */
			
			//반지름 조절
			$("#legendBox_"+that.id).find(".heatRadiusSlider").slider({
			    range: false, 
				min : 5,
				max : 40, //2016.09.12 9월 서비스 : 80->40
				values : [20],
			    slide : function(e, ui) {
			       $("#legendBox_"+that.id).find(".heatRadiusText").html(ui.value);
			       that.map.heatRadius = ui.value;
			       //that.map.setHeatMapOptions(that.map.heatRadius, that.map.heatBlur);
			       if (that.valPerSlice != null && that.valPerSlice.length > 0) {
			    		var max = Math.max.apply(null, that.valPerSlice[0]);
			    		that.map.setHeatMapOptions(that.map.heatRadius, that.map.heatBlur, max);
			       }else {
			    	   that.map.setHeatMapOptions(that.map.heatRadius, that.map.heatBlur);
			       }
			    }
			});
			
			//흐림도 조절
			$("#legendBox_"+that.id).find(".heatBlurSlider").slider({
			    range: false, 
				min : 20,	//2016.09.12 9월 서비스 : 5->20
				max : 120,
				values : [30],
			    slide : function(e, ui) {
			    	$("#legendBox_"+that.id).find(".heatBlurText").html(ui.value);
			    	that.map.heatBlur = ui.value;
				    //that.map.setHeatMapOptions(that.map.heatRadius, that.map.heatBlur);
			    	if (that.valPerSlice != null && that.valPerSlice.length > 0) {
			    		var max = Math.max.apply(null, that.valPerSlice[0]);
			    		that.map.setHeatMapOptions(that.map.heatRadius, that.map.heatBlur, max);
			    	}else {
			    		that.map.setHeatMapOptions(that.map.heatRadius, that.map.heatBlur);
			    	}
			    }
			});
			$("#legendBox_"+that.id).find(".heatRadiusText").html($("#legendBox_"+that.id).find(".heatRadiusSlider").slider("values")[0]);
			$("#legendBox_"+that.id).find(".heatBlurText").html($("#legendBox_"+that.id).find(".heatBlurSlider").slider("values")[0]);
		}
				
		/**
	     * 
	     * @name         : changeUserLegend
	     * @description  : 범례구간을 계산한다.
	     * @date         : 2015. 10. 09. 
	     * @author	     : 권차욱
	     * @history		 : 
	     */	
		this.changeUserLegend = function (lv, valPerSlice, userTableWidthList) {
			//현재 레벨과 범례구간값 갯수를 비교하여 다를 경우 => 범례레벨이 변경?記?경우
			//변경된 범례레벨만큼 범례구간값을 재정의한다.
			var tableWidth = $("#goganList_"+that.id).width();
			if (valPerSlice[0].length < lv) {
				var idx = lv - valPerSlice[0].length;
				for (var i=lv-idx; i<lv; i++) {
					var max = valPerSlice[0][valPerSlice[0].length-1];
					var preMax = valPerSlice[0][valPerSlice[0].length-2];
					var gap = Math.abs(max-preMax);
					valPerSlice[0][i] = max + gap;
				}
			}else if (valPerSlice[0].length >= lv) {
				var tmpValPerSlice = [];
				for (var i=0; i<lv; i++) {
					tmpValPerSlice.push(valPerSlice[0][i]);
				}
				valPerSlice[0] = tmpValPerSlice;
			}
			that.tmpValPerSlice = deepCopy(valPerSlice[0]);
			
			//2016.03.29 수정, 음수/양수체크
			var isNagative = false;
			var nagativeData = null
			var pasitiveData = null;
			for (var i=1; i<valPerSlice[0].length; i++) { //2016.04.04 범례
				if (valPerSlice[0][i] < 0) {
					isNagative = true;
					if (nagativeData == null) {nagativeData = [];}
					nagativeData.push(valPerSlice[0][i]);
				}else {
					if (pasitiveData == null) {pasitiveData = [];}
					pasitiveData.push(valPerSlice[0][i]);
				}
			}
			
			var nagaPerPixel = 0;
			var perPixel = 0;
			
			if (isNagative) {
				var nagaMin = Math.min.apply(null, nagativeData);
				var nagMax = Math.max.apply(null, nagativeData);
				nagaPerPixel = (tableWidth/2)/ nagaMin;
				
				var pasiMin = Math.min.apply(null, pasitiveData);
				var pasiMax = Math.max.apply(null, pasitiveData);
				perPixel = (tableWidth/2) / pasiMax;
				
				//각 구간별 width를 계산한다.
				if (userTableWidthList == null) {
					var tmpNagaWidthList = [];
					if (nagativeData != null) { //2016.08.01 권차욱 수정
						for (var i=0; i<that.nagativeLv;  i++) {
							var width = nagativeData[i] * nagaPerPixel;
							if (i!=0) {
								var tmpWidth = 0;
								for (var k=0; k<i; k++) {
									tmpWidth += tmpNagaWidthList[k];
								}
								width =  Math.abs((200 -width) - tmpWidth);
							}else {
								width = 200 - width;
							}
							tmpNagaWidthList.push(parseInt(width));
						}
					}
					
					var tmpPosiWidthList = [];
					if (pasitiveData != null) {	//2016.08.01 권차욱 수정
						for (var i=0; i<that.positiveLv;  i++) {
							var width = pasitiveData[i] * perPixel;
							if (i!=0) {
								var tmpWidth = 0;
								for (var k=0; k<i; k++) {
									tmpWidth += tmpPosiWidthList[k];
								}
								width = Math.abs(width - tmpWidth);
							}
							tmpPosiWidthList.push(parseInt(width));
						}
					}
					
					userTableWidthList = tmpNagaWidthList;
					for (var x=0; x<tmpPosiWidthList.length; x++) {
						userTableWidthList.push(tmpPosiWidthList[x]);
					}
				}

			}else {
				var min = valPerSlice[0][1];//Math.min.apply(null, valPerSlice[0]); //2016.04.04 범례
				var max = Math.max.apply(null, valPerSlice[0]);
				var gap = tableWidth/that.lv;
				perPixel = tableWidth / max;
					
				//각 구간별 width를 계산한다.
				if (userTableWidthList == null) {
					var tmpWidthList = [];
					for (var i=1; i<lv; i++) { //2016.04.04 범례
						var width = valPerSlice[0][i] * perPixel;
						if (i!=1) {	//2016.04.04 범례
							var tmpWidth = 0;
							for (var k=0; k<i-1; k++) { //2016.04.04 범례
								tmpWidth += tmpWidthList[k];
							}
							width = Math.abs(width - tmpWidth);
						}
						tmpWidthList.push(parseInt(width));
					}
					userTableWidthList = tmpWidthList;
				}
			}
				
			//계산된 width를 적용한다.
			var widthSum = 0;
			for (var i=0; i<userTableWidthList.length; i++) {
				var width = 0;
				if (i == userTableWidthList.length-1) {
					width = tableWidth - widthSum;
				}else {
					widthSum += userTableWidthList[i];
					width = userTableWidthList[i];
				}
				$("#goganList_"+that.id).find("td").eq(i).css("width", width+"px");
			}
				
			//바의 위치를 색상의 너비와 같게 맞춘다.
			var widthList = [];
			var width = 0;
			$("#goganList_"+that.id).find("td").each(function(idx) {
				width += $(this).width();
				var barPos = width;
				$("#popContents01_"+that.id+" .JCLRgrips").find(".JCLRgrip").eq(idx).css("left",barPos+"px");
			});
			$("#popContents01_"+that.id).find(".JColResizer").css("width", "0px");
			$("#goganList_"+that.id).css("width", "380px");
			$(".JCLRgrips").css("width", "380px");

			//이쪽부분 소스는 파악이 안된다.
			$("#popContents01_"+that.id+" .JCLRgrips").remove();	
			if ($("#goganList_"+that.id).length > 0) {
				$(function() {
					$("#goganList_"+that.id).colResizable({
						liveDrag:true, 
						gripInnerHtml:"<div class='grip'></div>", 
						draggingClass:"dragging", 
						partialRefresh:true,
						onResize:that.onSampleResized
					}); 
				});
			}
				
			$("#popContents01_"+that.id).find(".grip").each(function(idx) {
				$(this).append("<div class='legendTooltip' id='legendTooltip_"+idx+"'></div>");
				$(this).find(".legendTooltip").hide();
			});
			$(".legendTooltip").css({
				"background" : "#ffffff",
				"border-radius" :"10px",
				"width":"40px",
				"font-size":"8px",
				"text-align":"center",
				"top":"10px",
				"position":"absolute",
				"left":"-10px"
			});
				
			return {
				isNagative : isNagative,
				nagaPixel : nagaPerPixel,
				perPixel : perPixel,
				userTableWidthList : userTableWidthList,
				valPerSlice : valPerSlice
			}
		};
			
		/**
	     * 
	     * @name         : onSampleResized
	     * @description  : 범례구간 drag 이벤트(툴팁을 제어한다.)
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history		 : 권차욱 수정
	     */		
		this.onSampleResized = function(e){
			var id = $(e.target).find(".legendTooltip").attr("id");
			if (id != undefined) {
				var perPixel = that.perPixel;
				var value = null;
				var isNagative = false;
				
				//2016.03.29 수정,
				if (that.nagaPixel != 0) {
					if (e.pageX < 480) {
						perPixel = that.nagaPixel;
						isNagative = true;
					}else {
						perPixel = that.perPixel;
					}
				}
				
				var idx = parseInt(id.split("_")[1]);
				var width = 0;
				if (idx != 0) {
					for (var i=0; i<=idx; i++) {
						var tmpWidth = $(e.currentTarget).find("td").eq(i).width();
						width += tmpWidth;
					}
				}else {
					width = $(e.currentTarget).find("td").eq(0).width();
				}
				
				//2016.03.29 수정,
				if (that.nagaPixel != 0) {
					if (isNagative) {
						value = parseInt((190-width) / perPixel);
					}else {
						 value = parseInt((width-190) / perPixel);
					}
				}else {
					 value = parseInt(width / perPixel);
				}
				that.tmpValPerSlice[idx+1] = value;	//2016.04.04 범례
				
				$(e.target).find(".legendTooltip").show();
				$(e.target).find(".legendTooltip").html(value);
					
				setTimeout(function() {
					$("#"+id).hide();
				},2000);
			}
		};
			
		/**
	     * 
	     * @name         : lvSelect
	     * @description  : 범례구간 셀렉트박스 선택 이벤트처리
	     * @date         : 2015. 10. 09. 
	     * @author	     : 최재영
	     * @history		 : 권차욱 수정
	     */		
		this.lvSelect = function(){
			$("body").on("change","#lvSelect_"+that.id,function(){
				var lv = $(this).val();
				if (that.legendType == "user") {
					//resizeColor(that.legendColor2,that.legendColor1, null, $("#lvSelect_"+that.id).val());
					//legendColor(that.legendColor2,that.legendColor1, "#goganList_"+that.id, lv, that.id, that);	
					
					that.setUserLegend(that.legendType, parseInt(lv));
				}
			});
		}
			
		/**
	     * 
	     * @name         : themaLegendInit
	     * @description  : 통계주제도 내에서 범례를 초기화한다.(DB 의 설정 내용으로 변경)
	     * @date         : 2015. 11. 15. 
	     * @author	     : 석진혁
	     * @history		 : 
	     */	
		this.themaLegendInit = function(){
			$("body").on("click", "#themaInit_" + that.id, function(){
				switch(Number(that.map.thema_legend_type)) {
					case 1 :
						$("#legendPopEvent01_"+that.id).click();
						$("#legendPopEvent01_"+that.id).click();
						$('#goganEvent_'+that.id).trigger("click");
						
						//통계주제도 증감일 경우에만 적용
						if (that.delegate != undefined && that.delegate.namespace === "thematicMap04") {
							$("#negativeDefaultColor_"+that.id).show();
							$("#negativeDefaultColor_"+that.id+ " > a").click();
							$('#guganNagative_' + that.id).click();
						}else {
							$('#guganAuto_' + that.id).click();
						}
						
						break;
					case 2 : 
						$("#legendPopEvent01_"+that.id).click();
						$('#guganEqual_' + that.id).click();
						$("#legendPopEvent01_"+that.id).click();
						$('#goganEvent_'+that.id).trigger("click");
						break;
					case 3 : 
						var tempValues = that.map.thema_legend_values;
						var region = $("#selectValue2").val();
						for(var i = 0; i < tempValues.length; i++) {
							var tempItems = tempValues[i];
							if(region == tempItems.left_reg_type) {
								var returnValue = that.setThemaLegendUserValues(tempItems);
								that.userTableWidthList = null;
								that.legendValue.user = [returnValue];
								$('#guganUser_' + that.id).click();
								legendColor(that.legendColor2,that.legendColor1, "#colorStatus_"+that.id, that.lv, that.id, that);
							}
						}
						break;
				}
			});
		}
			
		/**
	     * 
	     * @name         : setThemaLegendUserValues
	     * @description  : 
	     * @date         : 2015. 11. 15. 
	     * @author	     : 석진혁
	     * @history		 : 
	     */	
		this.setThemaLegendUserValues = function(values) {
			var returnValue = [];
			var tempSize = 0;
				
			if ($("#selectValue").val() == "leftValue") {
				tempSize = String(values.left_sep_cnt);
				for(var i = 0; i < values.left_sep_cnt; i++) {
					var id = 'left_sep_' + (i + 1);
					//2016.04.04 범례
					if (i==0) {
						returnValue.push(parseFloat(values[id])-1);
					}
					returnValue.push(values[id]);
				}	
				returnValue.pop();
				
			}else {
				tempSize = String(values.right_sep_cnt);
				for(var i = 0; i < values.right_sep_cnt; i++) {
					var id = 'right_sep_' + (i + 1);
					//2016.04.04 범례
					if (i==0) {
						returnValue.push(parseFloat(values[id])-1);
					}
					returnValue.push(values[id]);
				}
				returnValue.pop();
			}
			that.lv = tempSize.trim();
			$("#lvSelect_"+that.id).val(tempSize.trim());	
			
			return returnValue;
		}
		
		/**
	     * 
	     * @name         : goganConfirm
	     * @description  : 범례적용버튼에 대한 처리를 수행한다.
	     * @date         : 2015. 10. 15. 
	     * @author	     : 최재영
	     * @history		 : 권차욱 수정
	     */	
		this.goganConfirm = function(){  // 범례구간설정 적용버튼
			$("body").on("click","#goganEvent_"+that.id, function(e){
				e.stopPropagation();
				var lv = $("#lvSelect_"+that.id).val();
				if (lv != that.lv) {
					that.userTableWidthList = null;
				}
				that.lv = lv;
					
				var type = {
						"auto"     : 0,	//자동범례
						"equal"    : 1,	//균등범례
						"user"     : 2,	//사용자지정범례
						"negative" : 3	//음수/양수범례
				};
					
				switch(type[that.legendType]) {
					case 0:
						that.valPerSlice = that.legendValue.auto;
						that.calculateLegend(that.data);
						resizeColor(that.legendColor2, that.legendColor1, null, that.lv);
						break;
					case 1:
						that.valPerSlice = that.legendValue.equal;
						that.calculateLegend(that.data);
						resizeColor(that.legendColor2, that.legendColor1, null, that.lv);
						break;
					case 2:
						var chart = $("#goganList_"+that.id).highcharts();
						var tmpSlice = [];
						
						tmpSlice.push(chart.xAxis[0].min);
						for (var i=0; i<chart.series[0].xData.length; i++) {
							// 2016. 09. 23 SseOk 수정
							tmpSlice.push(parseFloat(parseFloat(chart.series[0].xData[i]).toFixed(2)));
						}
						that.legendValue.user[0] = tmpSlice;
						that.valPerSlice = that.legendValue.user;
						break;
					case 3:
						if (that.legendValue.negative == undefined) {
							that.valPerSlice = that.legendValue.auto;
						}
						that.calculateLegend(that.data);
						break;
					default:
						break;
				}

				if (that.negativeLegendColor != null && $("#negativeDefaultColor_"+that.id+" > a").hasClass("on")) {
					setLegendColor(that.negativeLegendColor,"#colorStatus_"+that.id, that.id,that);
				}else {
					legendColor(that.legendColor2, that.legendColor1, "#colorStatus_"+that.id, that.lv, that.id, that);
				}
				
				that.updateGuganLegend();
				that.guganLevelSetting = that.guganLevel;
				that.map.setLegendColor();
				that.changeBubbleColor();	
				$(".guganSettingLayer").hide();
				var on = $("#legendPopEvent01_"+that.id).hasClass("on");
				if (on) {
					$("#legendPopEvent01_"+that.id).removeClass("on");
				}
				
				//2016.03.17 수정
				//텍스트 정렬을 middle로 한다.
				var height = $("#colorStatus_"+that.id+">li").eq(0).height();
				$("#colorStatus_"+that.id+">li").css("line-height", height+"px");
			});
		}
		
		/**
	     * 
	     * @name         : popClose
	     * @description  : 색상설정, 단계설정 팝업 취소버튼에 대한 처리를 수행한다.
	     * @date         : 2015. 10. 15. 
	     * @author	     : 최재영
	     * @history		 : 권차욱 수정
	     */	
		this.popClose = function(){
			$("body").on("click",".topbar>a, .hanClose",function(){
				$(this).parents(".popBox").eq(0).hide();
				var id = $(this).parents(".popBox").eq(0).attr("id").split("_")[0];
				if(id=="guganSettingLayer"){
					var on = $("legendPopEvent01_"+that.id).hasClass("on");
					if (on) {
						$("legendPopEvent01_"+that.id).removeClass("on");
					}
					$(".legendPopEvent").eq(0).removeClass("on");
				}else if(id=="colorSettingLayer"){
					var on = $("legendPopEvent02_"+that.id).hasClass("on");
					if (on) {
						$("legendPopEvent02_"+that.id).removeClass("on");
					}
					$(".legendPopEvent").eq(1).removeClass("on");
				}else if(id="opacityLayer"){
					var on = $("legendPopEvent04_"+that.id).hasClass("on");
					if (on) {
						$("legendPopEvent04_"+that.id).removeClass("on");
					}
					$(".legendPopEvent").eq(2).removeClass("on");
					$("#legendDataSlider").slider("option","value",0.7);
				}
			});
		}
				
		/**
	     * 
	     * @name         : selectLegendRangeData
	     * @description  : 
	     * @date         : 2015. 10. 15. 
	     * @author	     : 최재영
	     * @history		 : 
	     */	
		this.selectLegendRangeData = function(fillColor) {		
			for(var i = 0;i<=that.lv;i++){	
				var text = $("#colorStatus_"+that.id+">li:eq("+i+")").css("background-color");
				if(text == fillColor){
					$("#colorStatus_"+that.id+">li:eq("+i+")").addClass("ck");
				}else{
					$("#colorStatus_"+that.id+">li:eq("+i+")").removeClass("ck");
				}

				if (fillColor == "#ccc" && i== that.lv){
					if(that.reverseOn == false){
						$("#colorStatus_"+that.id+">li:eq("+(that.lv-1)+")").addClass("ck");
					}else{
						$("#colorStatus_"+that.id+">li:eq("+0+")").addClass("ck");
					}	
				}
			}	
		};
			
		/**
	     * 
	     * @name         : legendInit
	     * @description  : 범례 초기화버튼에 대한 처리를 수행한다.
	     * @date         : 2015. 10. 15. 
	     * @author	     : 최재영
	     * @history		 : 
	     */	
		this.legendInit = function(isClear){
			if (isClear == undefined) {isClear = true;}
			that.lv = that.initLv;
			that.numberData = false;
			that.legendType = "auto";
			that.selectType = "color";
			that.valPerSlice = null;
			that.userTableWidthList = null;
			that.legendValue.user = [[100, 200, 300, 400, 500, 600, 700]];
			that.fixLegendColor1 = "#193b70";
			that.fixLegendColor2 = "#00b051";
			
			//살고싶은 우리동네의 경우, default색상
			if (that.delegate != undefined) {
				if(this.delegate.namespace != undefined){
					if(this.delegate.namespace === "houseAnalysisMap"){
						that.legendColor1 = "#7A0021";
						that.legendColor2 = "#cccccc";
					}
				}
			}else {
				that.legendColor1 = "#cd1103";
				that.legendColor2 = "#ffd75d";
			}
		
			$("#colorStatus_"+that.id).css('opacity',1);
			$("#colorbarBox_"+that.id).css('opacity',1);
			$("#opacitySel_"+that.id+" option:eq(0)").attr("selected","selected")
			$("#lvSelect_"+that.id).val(that.lv);		    
			$("#showData_"+that.id).addClass(that.initNumberData?"on":"");
			$("#showData_"+that.id + ">span").text("통계치 "+that.initNumberData?"on":"off");
			$("#bubbleLegendLine_"+that.id).hide();
			    
    		//타입
			$("#typeArea_"+that.id).removeClass().addClass("color");
			that.selectType = "color";
				
			//구간설정
			$("#popContents01_"+that.id+" .JCLRgrips").remove();
			$("#goganList_"+that.id).addClass("on");
			$("#guganSettingButton_"+that.id + "> .btnStyle01").removeClass("on");
			$("#guganSettingButton_"+that.id + "> .al").addClass("on");
					
			//색상설정
			$("#colorSetting_"+that.id).show();	
			$("#colorSettingList01_"+that.id).css({"width":"380px"});
			$("#colorbarBox_"+that.id+">a").css("top","-5000px");
			$("#tabsSelector_"+that.id + "> .btnStyle01").removeClass("on");
			$("#tabsSelector_"+that.id + "> .al").addClass("on");
			$("#colorSetting_"+that.id +"> li > a").removeClass("on");
			$("#colorSetting_"+that.id +"> li:eq(0) > a").addClass("on");
			$("#legendColor_"+that.id + ">li > a").removeClass("on");
			$("#legendColor_"+that.id + ">li:eq(0) > a").addClass("on");
			$("#colorbarBox_"+that.id).find(".fl").css("background-color", that.fixLegendColor2);
			$("#colorbarBox_"+that.id).find(".fr").css("background-color", that.fixLegendColor1);
			$("#btn_legendSetting_"+that.id).show();
			$("#combineColor_"+that.id).hide();
			$("#legendColor_"+that.id).show();
				
			var legendBox = $("#legendBox_"+that.id);
			var ing = legendBox.attr("data-ing");
			legendBox.removeClass(ing); 
			$("#btn_legendSetting_"+that.id).removeClass("on");
			$("#lgListBox_"+that.id).stop().animate({"left":"-550px"},200);

			legendBox.attr("data-ing", "max");
			legendBox.addClass("max");
				
			resizeColor(that.legendColor2, that.legendColor1,  null, that.lv);
			legendColor(that.legendColor2, that.legendColor1, "#colorStatus_"+that.id, that.lv,that.id,that);
			legendColor(that.legendColor1, that.legendColor2, "#colorSettingList01_"+that.id, that.lv,that.id,that);
			legendColor(that.legendColor2, that.legendColor1, ".dbColorbar", that.lv,that.id,that);
			
			$("#lgListBox_"+that.id+">li>a").each(function() {
				if ($(this).hasClass("on")) {
					$(this).click();
				}
			});
			
			$("#legendPopEvent00_"+that.id).find("span").html("타입</br>설정");
			$("#legendPopEvent01_"+that.id).find("span").html("단계</br>설정");
			$("#legendPopEvent02_"+that.id).find("span").html("색상</br>설정");
			$("#legendPopEvent03_"+that.id).find("span").html("범례</br>고정");
			
			//히트맵 초기화
			$("#legendBox_"+that.id).find(".heatRadiusSlider").slider("values", [15]);
			$("#legendBox_"+that.id).find(".heatBlurSlider").slider("values", [30]);
			$("#legendBox_"+that.id).find(".heatRadiusText").html(15);
			$("#legendBox_"+that.id).find(".heatBlurText").html(30);
			that.map.heatRadius = 15;
			that.map.heatBlur = 30;
			
			if (!isClear) {
				$("#goganEvent_"+that.id).click();
			}
			that.changeDataMode("color");
			
			if (that.delegate != undefined && 
				that.delegate.namespace != undefined &&
				that.delegate.namespace == "interactiveMap") {
				//균등범례
				that.legendType="equal";
				$("#lvSelect_"+that.id).val(that.lv);
				$("#goganDisabled_"+that.id).show();
				$("#goganList_"+that.id).addClass("on");
				$("#guganEqual_"+that.id).click();
			}else {
				$("#guganAuto_"+that.id).click();
			}
		}
		
		/**
	     * 
	     * @name         : checkLegendFixed
	     * @description  : 범례고정 체크
	     * @date         : 2016.08.24 
	     * @author	     : 권차욱 
	     */
		this.checkLegendFixed = function() {
			var id = this.map.id;
			if (id == 0) {
				$("#legendFixed_"+this.id).find(".legendFixedA").css("background", "rgb(0, 112, 192)");
				$("#legendFixed_"+this.id).find(".legendFixedA").show();
			}else if (id == 1) {
				$("#legendFixed_"+this.id).find(".legendFixedB").css("background", "rgb(158, 213, 99)");
				$("#legendFixed_"+this.id).find(".legendFixedB").show();
			}else {
				$("#legendFixed_"+this.id).find(".legendFixedC").css("background", "rgb(255, 0, 102)");
				$("#legendFixed_"+this.id).find(".legendFixedC").show();
			}
		}
		
		/**
	     * 
	     * @name         : showLegendFixed
	     * @description  : 범례고정 항목에서 해당 지도의 범례를 show한다.
	     * @date         : 2016.08.26 
	     * @author	     : 권차욱 
	     */
		this.showLegendFixed = function() {
			for (var i=0; i<this.delegate.mapList.length; i++) {
				var map = this.delegate.mapList[i];
				if (map != null) {
					$("#map"+(map.id+1)+"_"+this.map.legend.id).show();
				}
			}
		}
		
		/**
	     * 
	     * @name         : hideLegendFixed
	     * @description  : 범례고정 항목에서 해당 지도의 범례를 hide한다.
	     * @date         : 2016.08.26 
	     * @author	     : 권차욱 
	     */
		this.hideLegendFixed = function(curMapId) {
			$("#map"+(curMapId+1)+"_"+this.map.legend.id).hide();
		}
		
		
		/**
	     * 
	     * @name         : legendCopy
	     * @description  : 범례 복사
	     * @date          :  
	     * @author	     : 
	     */
		this.legendCopy = function(targetId) {
			//해당 맵에 있는 범례정보를 저장한다.
			//처음에는 모두 저장하고, 이후에는 특정 변경되는 값만 저장한다.
			if (this.legendList == null) {
				this.legendList = [];
				for (var i=0; i<this.delegate.mapList.length; i++) {
					var map = this.delegate.mapList[i];
					var legendInfo = {
							legendType : map.legend.legendType,
							lv : map.legend.lv,
							legendColor : map.legend.legendColor,
							data : map.legend.data,
							legendColor1 : map.legend.legendColor1,
							legendColor2 : map.legend.legendColor2,
							combineColorList : map.legend.combineColorList,
							selectType : map.legend.selectType,
							numberData : map.legend.numberData
					};
					this.legendList[i] = deepCopy(legendInfo);
				}
			}else {
				for (var i=0; i<this.delegate.mapList.length; i++) {
					var map = this.delegate.mapList[i];
					if (map.legend.data.length > 0 && map.legend.data[0].length > 0) {
						this.legendList[i].legendType = map.legend.legendType;
						this.legendList[i].lv = map.legend.lv;
						this.legendList[i].legendColor = map.legend.legendColor;
						this.legendList[i].legendColor1 = map.legend.legendColor1;
						this.legendList[i].legendColor2 = map.legend.legendColor2;
						this.legendList[i].combineColorList = map.legend.combineColorList;
						this.legendList[i].selectType = map.legend.selectType;
						this.legendList[i].numberData = map.legend.numberData;
					}else {
						this.legendList[i].data = null;
					}
				}
			}
			
			//타겟이 되는 범례정보를 가져온다.
			//타겟의 범례가 초기화 되어 데이터가 없을 경우, 그냥 리턴한다.
			var targetLegend = this.legendList[targetId];
			if (targetLegend.data == null || targetLegend.data.length == 0) {
				return;
			}
			
			//타겟 범례의 정보를 설정한다.
			this.lv = targetLegend.lv;
			this.legendType = targetLegend.legendType;
			
			
			var curPage = document.location.href;
			var matchStr = "policy";
			if(curPage.match(matchStr)){ //mng_s 20180105 정책맵일경우
				this.data = targetLegend.data;
			} else {
				//mng_s 20171016 VIEW가 여러개일 때 범례 고정관련 수정
				if (targetId==0) {
					this.data = sLegendInfo.legendInfo.fixed_legend_val1;
				} else if (targetId==1) {
					this.data = sLegendInfo.legendInfo.fixed_legend_val2;
				} else if (targetId==2) {
					this.data = sLegendInfo.legendInfo.fixed_legend_val3;
				}
			}
			
			this.legendColor1 = targetLegend.legendColor1;
			this.legendColor2 = targetLegend.legendColor2;
			this.combineColorList = targetLegend.combineColorList;
			this.selectType = targetLegend.selectType;
			this.numberData = targetLegend.numberData;
	
			//타겟 범례의 데이터정보를 가지고, 범례를 다시 계산한다.
			this.calculateLegend(this.data);
			
			//타겟 범례의 단계설정을 설정한다.
			if (this.legendType == "auto") {
				$("#guganAuto_"+that.id).click();
			}else if (this.legendType == "equal") {
				$("#guganEqual_"+that.id).click();
			}else {
				$("#guganUser_"+that.id).click();
			}
			
			legendColor(this.legendColor2, this.legendColor1, "#colorStatus_"+this.id, this.lv, this.id, this);
			
			//혼합색상의 경우,
			if ($("#combineColor_"+this.delegate.mapList[targetId].legend.id+" >a").hasClass("on")) {
				$("#combineColor_"+this.id+" >a").css("background", "linear-gradient(-90deg, red, blue)");
				$("#combineColor_"+this.id+" >a").click();
				$("#combineColor_"+this.id).show();
				$("#tabsSelector_"+this.id+" .ac").click();
				
				var tmpCombineColorList = [];
				for (var i=this.combineColorList.length-1; i>=0; i--) {
					tmpCombineColorList.push(this.combineColorList[i]);
				}
				setLegendColor(tmpCombineColorList, "#colorSettingList01_"+this.id, this.id, this);
				this.legendColor = this.combineColorList;
			}else {
				$("#legendColor_"+this.id+" >li>a").each(function() {
					if ($(this).attr("data-color") == that.legendColor1) {
						$(this).click();
					}
				});
			}
			
			this.updateGuganLegend();
			this.map.setLegendColor();
			this.changeDataMode(this.selectType);
			
			//통계치 표출 유무
			if (this.numberData) {
				this.map.removeCaption();
				this.map.checkShowCaption();
			}
			
		}
		
		/**
	     * 
	     * @name         : createLegend
	     * @description  : 범례를 생성한다.
	     * @date         : 2015. 10. 15. 
	     * @author	     : 최재영
	     * @history		 : 권차욱 수정
	     */	
		this.createLegend = function() {
			var that = this;
			var infoLegend = sop.control({
				position : 'bottomleft'
			});
			infoLegend.onAdd = function(map) {
				this._div = sop.DomUtil.create('div', 'info');
				sop.DomEvent.disableClickPropagation(this._div);
				this.update();
				$(this._div).attr("id", 'legend_' + that.id);
				that.legendObj = this._div;
				return this._div;
			};
			infoLegend.update = function(props) {
				var lvSelect,loofLevel=5;
				if(that.lv<5){
					loofLevel = 0;
				}
				for(var i=10; i>=loofLevel; i--){
					lvSelect+='<option value="'+i+'">'+i+'레벨</option>';
				}
				var colorList = "";
				
				//mng_s
				$.map(that.defaultLegendColor,function(value, index){
					if (index == that.defaultLegendColor.length-1) {
						colorList+='<li id="combineColor_'+that.id+'" style="display:none;"><a href="javascript:void(0)" class="combined" data-color="combined" start-color="combined" style="background: linear-gradient(-90deg, red, blue);" >#fff</a></li>';
						colorList+='<li id="negativeDefaultColor_'+that.id+'" class="negativeDefaultColor" style="display:none;"><a href="javascript:void(0)" class="'+(index==0?'on':'')+'" data-color="'+value+'">'+value+'</a></li>';
					}else {
						var startColor = "#cccccc";
						if (that.delegate != undefined && 
							that.delegate.namespace != undefined && 
							that.delegate.namespace != "houseAnalysisMap") {
							startColor = that.defaultStartLegendColor[index];
						}
						colorList+='<li><a id="grid_lg_color_' + index + '" href="javascript:void(0)" class="'+(index==0?'on':'')+'" data-color="'+value+'" start-color="'+startColor+'">'+value+'</a></li>';
						
					}
				});
				
				
				
				this._div.innerHTML = '<div data-html2canvas-ignore=true class="legendRing legendBox max" id="legendBox_'+that.id+'" data-ing="max">'
						+'<div class="color" id="typeArea_'+that.id+'">'
						+'<ul class="colorbar" id="colorStatus_'+that.id+'"></ul>'
						+'<ul class="colorck" id="legendColor_'+that.id+'">'
						+colorList
						+'</ul>'
						+'<div class="heatMin" id="heatMinLegend_'+that.id +'" style="display:none;"><img src="/img/ico/wheel.500.png" style="width:80px;height:80px;margin:14px 10px 10px 10px;"/></div>'
						+'<ul class="legendLine" id="bubbleLegendLine_'+that.id+'" style="display:none;"></ul>'
						+'<a href="javascript:void(0)" id="reverseBtn_'+that.id+'" class="legendRrefresh">새로고침</a>'
						+'<div class="jumArea">'
						+'<div class="jumText">점 크기 조절</div>'
						+'<ul class="jumGage">'
						+'<li>작게</li>'
						+'<li>중간</li>'
						+'<li>크게</li>'
						+'</ul>'
						+'<div class="jumSlide"></div>'
						+'</div>'
						+'<div class="heatArea">'
						+'<div style="height:15px;"></div>'
						+'<img src="/img/ico/ico_dbPlay.png" style="float:left;margin:4px 10px 0 10px;width:10px;height:10px;"/><div style="height:20px;font-size:11px;">반지름 조절 (Radius)</div>'
						+'<div style="height:50px;">'
						+'<div class="heatRadiusSlider heatSlider"></div>'
						+'<div class="heatRadiusText heatInputText"></div>'
						+'<ul class="heatGuage" style="margin-top:5px;">'
						+'<li style="margin-top:5px;">5</li>'
						+'<li style="margin-right:10px;float:right;margin-top:5px;">40</li>'
						+'</ul>'
						+'</div>'
						+'<img src="/img/ico/ico_dbPlay.png" width=10 height=10 style="float:left;margin:4px 10px 0 10px;width:10px;height:10px;"/><div style="height:20px;font-size:11px;">흐림도 조절 (Blur)</div>'
						+'<div style="height:50px;">'
						+'<div class="heatBlurSlider heatSlider"></div>'
						+'<div class="heatBlurText heatInputText"></div>'
						+'<ul class="heatGuage">'
						+'<li style="margin-top:5px;">20</li>'
						+'<li style="margin-top:5px;">120</li>'
						+'</ul>'
						+'</div>'
						+'</div>'
						+'</div>'
						+'<div class="legendRound">'
						+'<a href="javascript:void(0)" id="btn_legend_'+that.id+'" class="btn_legend">데이터 시각화</a>'
						/*+'<span>(단위:명)</span>'*/ //=>고객삭제요구
						+'<a href="javascript:void(0)" id="btn_legendSetting_'+that.id+'" class="btn_legendSetting">설정</a>'
						+'</div>'
						+'</div>'
						+'<ul class="lgListBox" id="lgListBox_'+that.id+'">'
						
						//범례고정 기능
						+(that.delegate != undefined && that.delegate.namespace === "interactiveMap" ? 
						'<li>'
						+'<ul id="legendFixed_'+that.id+'" class="lgTypeList">'
						+'<li><a id="map1_'+that.id+'" href="javascript:void(0)" data-type="data" data-subj="범례고정" title="지도A" class="legendFixedA" style="display:none;"><span>지도<br />A</span></a>'
						+'<li><a id="map2_'+that.id+'" href="javascript:void(0)" data-type="data" data-subj="범례고정" title="지도B" class="legendFixedB" style="display:none;"><span>지도<br />B</span></a>'
						+'<li><a id="map3_'+that.id+'" href="javascript:void(0)" data-type="data" data-subj="범례고정" title="지도C" class="legendFixedC" style="display:none;"><span>지도<br />C</span></a>'
						+'</ul>'
						+'<a href="javascript:void(0)" id="legendPopEvent03_'+that.id+'" title="범례고정은 \'지도추가하여 비교하기\' 에서만 사용가능 합니다."><span>범례<br />고정</span></a>'
						+'</li>' : '')
						
						+'<li>'
						+'<ul id="lgTypeList_'+that.id+'" class="lgTypeList">'
						+'<li style="display:none;"><a id="showData_'+that.id+'" href="javascript:void(0)" data-type="data" data-subj="통계치 팁()" title="통계치" class="'+(that.numberData?"on":"")+'"><span>통계치 '+(that.numberData?"on":"off")+'</span></a>'
						+'<li><a href="javascript:void(0)" data-type="color" data-subj="색상지도 팁(Shaded Area map)" title="지도 내  경계영역 내 설정된 범례 범위값과 생상으로 시각화된 데이터를 통해 지역별로 비교할 수 있습니다."><span>색상</span></a>'
						+'<li><a href="javascript:void(0)" data-type="bubble" data-subj="버블지도 팁(Bubbles map)" title="지도내 경계영역 내 설정된 범례 범위값에 따라 경계영역 내 그려진 원형 크기로 시각화된 데이터를 통해 지역별로 비교할 수 있습니다."><span>버블</span></a>'
						+'<li><a href="javascript:void(0)" data-type="dot" data-subj="점지도 팁(Dot Destiny map)" title="지도내 경계영역 내 그려진 점으로 시각화된 데이터를 통해 지역별 밀집도를 비교할 수 있습니다."><span>점</span></a>'
						+'<li><a href="javascript:void(0)" data-type="heat" data-subj="열지도(Heat map)" title="지도내 경계여역 내 설정된 범례범위값과 색상으로 시각화된 데이터를 통해 지역벼로 비교할 수 있습니다."><span>열</span></a>'
						+'</ul>'
						+'<a href="javascript:void(0)" id="legendPopEvent00_'+that.id+'"><span>타입<br />설정</span></a>'
						+'</li>'
						+'<li><a href="javascript:void(0)" id="legendPopEvent01_'+that.id+'"class="legendPopEvent" data-id="guganSettingLayer"><span>단계<br />설정</span></a>'
						+'</li>'
						+'<li><a href="javascript:void(0)"; id="legendPopEvent02_'+that.id+'" class="legendPopEvent" data-id="colorSettingLayer"><span>색상<br />설정</span></a>'
						+'</li>'
						+'<li><a href="javascript:void(0)" id="initButton_'+that.id+'"><span>초기화</span></a></li>'
						+'<li><a href="javascript:void(0)" id="legendPopEvent04_'+that.id+'" class="legendPopEvent"><span>투명도<br />설정</span></a></li>'
						+'</ul>'
						
						//구간설정
						+'<div class="popBox guganSettingLayer" id="guganSettingLayer_'+that.id+'">'
						+'<div class="topbar">'
						+'<span>범례 구간설정</span>'
						+'<select class="lvSelect" id="lvSelect_'+that.id+'" title="범례 구간설정">'
						+lvSelect
						+'</select>'
						+'<a href="javascript:void(0)">닫기</a>'
						+'</div>'
						+'<div class="popContents" id="popContents01_'+that.id+'">'
						+'<div class="tabs" id="guganSettingButton_'+that.id+'">'
						
						+(that.delegate != undefined && that.delegate.namespace === "thematicMap04" ? 
							/*'<span style="float:none;line-height:30px;">분류방법</span>'
							+'<div>'
							+'<a href="javascript:void(0)" id="guganAuto_'+that.id+'" class="btnStyle01 al on" style="width:72px;">자동범례</a>' 
							+'<a href="javascript:void(0)" id="guganEqual_'+that.id+'" class="btnStyle01 ac" style="width:72px;border-right:1px solid #9f9f9f">균등범례</a>'
							+'<a href="javascript:void(0)" id="guganNagative_'+that.id+'" class="btnStyle01 ac" style="width:72px;border-right:1px solid #9f9f9f">분할범례</a>'
							+'<a href="javascript:void(0)" id="guganUser_'+that.id+'" class="btnStyle01 ar" style="width:72px;">사용자정의</a>'
							+'</div>'*/
							
							'<span>분류방법</span>'
							+'<a href="javascript:void(0)" id="guganNagative_'+that.id+'" class="btnStyle01 al on" title="표출되는 통계값의 범위내에서 음수/양수로 자동으로 구간을 확정">분할범례</a>'
							+'<a href="javascript:void(0)" id="guganEqual_'+that.id+'" class="btnStyle01 ac" title="표출되는 통계값의 범위내에서 균등하게 확정">균등범례</a>'
							+'<a href="javascript:void(0)" id="guganUser_'+that.id+'" class="btnStyle01 ar" title="표출 구간을 사용자가 정의">사용자정의</a>'
						:		
							'<span>분류방법</span>'
							+'<a href="javascript:void(0)" id="guganAuto_'+that.id+'" class="btnStyle01 al on" title="표출되는 통계값에 의해서 자동으로 구간을 확정(Natural Break)">자동범례</a>'
							+'<a href="javascript:void(0)" id="guganEqual_'+that.id+'" class="btnStyle01 ac" title="표출되는 통계값의 범위내에서 균등하게 확정">균등범례</a>'
							+'<a href="javascript:void(0)" id="guganUser_'+that.id+'" class="btnStyle01 ar" title="표출 구간을 사용자가 정의">사용자정의</a>'
						)
						
						+'</div>'
						+'<div class="goganDisabled" id="goganDisabled_'+that.id+'"></div>'
						//+'<table class="goganList" id="goganList_'+that.id+'" style="table-layout:fixed;"><tr></tr></table>'
						//히스토그램 범례
						+'<div class="goganList" id="goganList_'+that.id+'" style="height:160px;"></div>'
						
						+(that.delegate != undefined && that.delegate.namespace === "thematicMap" || that.delegate.namespace === "thematicMap04" ? 
							'<div class="btnBox" style="width: 50%; float: left;">' 
							+'<a href="javascript:void(0)" class="btnStyle01" id="themaInit_'+that.id+'">초기화</a>'
							+'</div>'
							+'<div class="btnBox" style="width: 50%; float: left;">' 
							+'<a href="javascript:void(0)" class="btnStyle01" id="goganEvent_'+that.id+'">적용</a>'
							+'</div>'
						:
							'<div class="btnBox">' 
							+'<a href="javascript:void(0)" class="btnStyle01" id="goganEvent_'+that.id+'">적용</a>'
							+'</div>'
						)
						+'</div>'
						+'</div>'
						
						//색상설정 start
						+'<div class="popBox colorSettingLayer" id="colorSettingLayer_'+that.id+'">'
						+'<div class="topbar">'
						+'<span>사용자 설정</span>'
						+'<a href="javascript:void(0)">닫기</a>'
						+'</div>'
						+'<div class="popContents" id="popContents02_'+that.id+'">'
						+'<div class="tabs only" id="tabsSelector_'+that.id+'">'
						+'<a href="javascript:void(0)" class="btnStyle01 al on">기본색상</a>'
						+'<a href="javascript:void(0)" class="btnStyle01 ac">혼합색상</a>'
						+'<a href="javascript:void(0)" class="btnStyle01 ar">사용자정의</a>'
						+'</div> '
						
						+'<div id="opacityBox_'+that.id+'" class="opacityBox">' 
						+'<ul class="colorck" id="colorSetting_'+that.id+'">'
						+(that.delegate != undefined && that.delegate.namespace != undefined && that.delegate.namespace === "houseAnalysisMap" ? 
							'<li><a href="javascript:void(1)" class="on">#7a0021</a></li>'
						:
							'<li><a href="javascript:void(1)" class="on">#cd1103</a></li>'
						)
						+'<li><a href="javascript:void(2)">#f6564a</a></li>'
						+'<li><a href="javascript:void(3)">#a63cba</a></li>'
						+'<li><a href="javascript:void(4)">#535353</a></li>'
						+'<li><a href="javascript:void(5)">#3b91ce</a></li>'
						+'<li><a href="javascript:void(6)">#31c9a2</a></li>'
						+'</ul>'
						+'</div>'
						+'<div class="colorbarBox" id="colorbarBox_'+that.id+'">'
						+'<a href="javascript:void(0)" class="fl">#00b051</a>'
						+'<ul class="colorSettingList01" id="colorSettingList01_'+that.id+'"></ul>'
						+'<a href="javascript:void(0)" class="fr">#193b70</a>'
						+'</div>'
						 
						+'<div class="btnBox">' 
						+'<a href="javascript:void(0)" class="btnStyle01" id="colorConfirm_'+that.id+'">적용</a>'
						+'</div>'
						+'</div>'
						+'</div>'
						+'</div>'	 
						+'</div>'
							
						//투명도설정 start
						+'<div class="popBox opacityLayer" id="opacityLayer_'+that.id+'" style="display:none; width:200px; left:580px; top:auto; bottom:70px;">'
						+'<div class="topbar">'
						+'<span>투명도 설정</span>'
						+'<a href="javascript:void(0)">닫기</a>'
						+'</div>'
						+'<div class="popContents" id="popContents03_'+that.id+'">'
						+'<div id="opacityBox_'+that.id+'" class="opacityBox" style="height:20px;">'
						+'<div id="legendDataSlider" class="dataSlider" style="margin-left:5px"></div>' 
						+'</div>'
						+'</div>'
						+'</div>';
				
			};
			infoLegend.addTo(this.map.gMap);
			
			//mng_s 20180104 주용민 투명도
			$("#legendDataSlider").slider({
		    	range: "min",
		        min: 0.1,
		        max: 1,
		        value: 0.7,
		        step : 0.1,
		        slide: function( event, ui ) {  //ui.value
		        	if(map.isInnerMapShow2){
		        		$('path').css('fill-opacity', ui.value);
						$('path[fill=#f0fff0]').css('fill-opacity', '0.1');
						$('path[fill=#F0FFF0]').css('fill-opacity', '0.1');
						$legendInfo.ui.slideInfo.slideValue2 = ui.value;
		        	} else if(map.isInnerMapShow3){ //mng_s 20180219
		        		$('path').css('fill-opacity', ui.value);
						$('path[fill=#f0fff0]').css('fill-opacity', '0.1');
						$('path[fill=#F0FFF0]').css('fill-opacity', '0.1');
						$legendInfo.ui.slideInfo.slideValue2 = ui.value;
		        	} else {
		        		$("path").css('fill-opacity', ui.value);
		        		$legendInfo.ui.slideInfo.slideValue1 = ui.value;
		        	}
			    }
		    });
			//mng_e
			
			//7레벨로 설정 
			$("#lvSelect_"+that.id).val(that.lv);
				
			if ($(".jumSlide").length){
			    this.jumSlider();
			}
			    
			if ($(".legendLine").length){
			   for (var i=0; i<10; i++) {
				   var txt = i+1;
					if(txt < 10){
						txt = "0"+txt;
					}
				   $("#bubbleLegendLine_"+that.id).prepend("<li><span style='margin-left:-30px;'>"+txt+"Lv</span></li>");
			   }
			}
			
			if ($(".heatRadiusSlider").length && $(".heatBlurSlider").length) {
				this.heatTable();
			}
			
			if ($(".popBox").length){
			    that.popClose();
			}
			        
			if ($("#themaInit_"+that.id).length){ 
			    this.themaLegendInit();
			}
			    
			if ($("#goganList_"+that.id).length){ 
			    this.lvSelect();
			    this.goganConfirm();
			}
			       
			if ($(".tabs.only").length){
			    this.userColorSetting(); 
			}
				
			this.legendEvent();
			resizeColor(this.legendColor2, this.legendColor1, null, that.lv);
			legendColor(this.legendColor2, this.legendColor1, "#colorStatus_"+that.id, that.lv,that.id,that);
			legendColor(this.legendColor1, this.legendColor2, "#colorSettingList01_"+that.id, that.lv,that.id,that);
			legendColor(this.legendColor2, this.legendColor1, ".dbColorbar", that.lv,that.id,that);
			    
			this.colorck();
			this.linkTooltip();
			$("#goganList_"+that.id).addClass("on");
				
			//분할범례 클릭 이벤트처리
			$("#guganNagative_"+that.id).click(function(e){
				// 2017. 02. 27 개발팀 수정요청
				$("#guganSettingButton_"+that.id).find("a").each(function() {
					if($(this).hasClass("on")) {
						$(this).removeClass("on")
					}
				});
				$(this).addClass("on");
				
				e.stopPropagation();
				that.legendType="negative";
				$("#lvSelect_"+that.id).val(that.lv);
				$("#goganDisabled_"+that.id).show();
				$("#goganList_"+that.id).addClass("on");
				//$("#popContents01_"+that.id+" .JCLRgrips").hide();
				//resizeColor(that.legendColor2,that.legendColor1, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
				that.setUserLegend(that.legendType, that.lv);
			});
				
			//자동범례 클릭 이벤트처리
			$("#guganAuto_"+that.id).click(function(e){
				// 2017. 02. 27 개발팀 수정요청
				$("#guganSettingButton_"+that.id).find("a").each(function() {
					if($(this).hasClass("on")) {
						$(this).removeClass("on")
					}
				});
				$(this).addClass("on");
				
				e.stopPropagation();
				that.legendType="auto";
				$("#lvSelect_"+that.id).val(that.lv);
				$("#goganDisabled_"+that.id).show();
				$("#goganList_"+that.id).removeClass("on");
				that.setUserLegend(that.legendType, that.lv);
			});
				
			//균등범례 클릭 이벤트처리
			$("#guganEqual_"+that.id).click(function(e){
				// 2017. 02. 27 개발팀 수정요청
				$("#guganSettingButton_"+that.id).find("a").each(function() {
					if($(this).hasClass("on")) {
						$(this).removeClass("on")
					}
				});
				$(this).addClass("on");
				
				e.stopPropagation();
				that.legendType="equal";
				$("#lvSelect_"+that.id).val(that.lv);
				$("#goganDisabled_"+that.id).show();
				$("#goganList_"+that.id).addClass("on");
				that.setUserLegend(that.legendType, that.lv);
			});

			//사용자지정범례 클릭 이벤트처리
			$("#guganUser_"+that.id).click(function(e){
				// 2017. 02. 27 개발팀 수정요청
				$("#guganSettingButton_"+that.id).find("a").each(function() {
					if($(this).hasClass("on")) {
						$(this).removeClass("on")
					}
				});
				$(this).addClass("on");
				
				e.stopPropagation();
				that.legendType="user";
				$("#lvSelect_"+that.id).val(that.lv);
				$("#goganDisabled_"+that.id).hide();
				$("#goganList_"+that.id).removeClass("on");
				that.setUserLegend(that.legendType, that.lv);
			});

			//초기화 버튼 mouseOn
			$("#initButton_"+that.id).mouseleave(function(){
				$(this).removeClass("on");
			});
			
			//초기화 버튼 클릭
			$("#initButton_"+that.id).click(function(){
				that.legendInit(false);
				$("#legendDataSlider").slider("option","value",0.7);
				$(".sop-interactive").css('fill-opacity', 0.7);
			});
				
			//색상설정(적용) 버튼 클릭
			$("#colorConfirm_"+that.id).click(function(){
				var tabsSelector =  $("#tabsSelector_"+that.id+" > a");
				var selectorTab;

				for(var i =0;i<tabsSelector.length;i++){
					for(var y=0;y<tabsSelector[i].classList.length;y++){
						if(tabsSelector[i].classList[y] == "on"){
							selectorTab = tabsSelector[i].classList[1];
						}
					}
				}
				
				//투명도 조절
				var opacity = $("#opacitySel_"+that.id).val();
				$("#colorStatus_"+that.id).css('opacity',opacity);
				
				//레벨
				var lv = $("#lvSelect_"+that.id).val();
				var color;
				var startColor;
				var endColor;
				    
				if(selectorTab =="al"){
					//기본색상
				    color = $("#colorSetting_"+that.id+" li>a.on").css("background-color");
				    that.legendColor1 = color;
				    that.legendColor2 = "#ffd75d";
				    if (that.delegate != undefined && that.delegate.namespace != undefined && that.delegate.namespace === "houseAnalysisMap") {
				    	that.legendColor2 = "#cccccc";	
				    }
				    legendColor(that.legendColor2, color, "#colorStatus_"+that.id, lv,that.id,that);
				    
				    //기본색상 선택 시, default색상 첫번째가 클릭된 것 처럼..
				    $("#legendColor_"+that.id+ " li").each(function(idx) {
				    	if ($(this).find("a").hasClass("on")) {
				    		$(this).find("a").removeClass("on");
				    	}
				    	if (idx == 0) {
				    		$(this).find("a").addClass("on");
				    	}
				    });
			    	//혼합색상 버튼 삭제
				    $('#combineColor_'+that.id).hide();
				}else if(selectorTab =="ac"){
					//혼합색상
					that.combineColorList = getColorFromcolorSettingList(that.id);
					setLegendColor(that.combineColorList, "#colorStatus_"+that.id, that.id, that);
					
					//기본색상 선택 시, default색상 첫번째가 클릭된 것 처럼..
				    $("#legendColor_"+that.id+ " li").each(function(idx) {
				    	if ($(this).find("a").hasClass("on")) {
				    		$(this).find("a").removeClass("on");
				    	}
				    	if ($(this).attr("id") == "combineColor_"+that.id) {
				    		$(this).find("a").addClass("on");
				    	}
				    });
					$('#combineColor_'+that.id+ " > a").css("background", "linear-gradient(-90deg, red, blue)");
					$('#combineColor_'+that.id).show();
				}else if(selectorTab =="ar"){
				    //사용자정의
					startColor = $("#colorbarBox_"+that.id+" .fl").text();
					endColor = $("#colorbarBox_"+that.id+" .fr").text();
					that.legendColor1 = endColor;
					that.legendColor2 = startColor;
					that.fixLegendColor1 = endColor;
					that.fixLegendColor2 = startColor;
					legendColor(startColor, endColor, "#colorStatus_"+that.id, lv,that.id,that);
					that.combineColorList = that.legendColor;
					
					//기본색상 선택 시, default색상 첫번째가 클릭된 것 처럼..
				    $("#legendColor_"+that.id+ " li").each(function(idx) {
				    	if ($(this).find("a").hasClass("on")) {
				    		$(this).find("a").removeClass("on");
				    	}
				    	if ($(this).attr("id") == "combineColor_"+that.id) {
				    		$(this).find("a").addClass("on");
				    	}
				    });
				    
					//혼합색상 버튼 삭제
					$('#combineColor_'+that.id + " > a").css("background", "linear-gradient(-90deg, red, blue)");
					$('#combineColor_'+that.id).show();
				}
				    
				//맵의 색상 변경 시키기
				that.updateGuganLegend();
				that.isNegative = false;
				that.isNegativeColorShow = false;
				that.map.setLegendColor();
				that.changeBubbleColor();
				$("#colorSettingLayer_"+that.id).hide();
				var on = $("#legendPopEvent02_"+that.id).hasClass("on");
				if (on) {
				   $("#legendPopEvent02_"+that.id).removeClass("on");
				}
			});
			
			$("#reverseBtn_"+that.id).click(function(){
				if(that.reverseOn==false){
					that.reverseOn=true;
				}else{
					that.reverseOn=false;
				}
					
				var cls = "#colorStatus_"+that.id;
				that.legendColor.reverse();
				$(cls).empty();
				for ( var i = 0; i < that.legendColor.length; i++) {
					var txt = i+1;
					if(txt<10){
						txt = "0"+txt;
					}
					
					//2013.03.29 수정
					//if(that.valPerSlice != null){
					//	$(cls).prepend("<li style='background:" + that.legendColor[i] + ";border:0px solid " + that.legendColor[i] + ";'><span>"+that.valPerSlice[0][i]+"</span></li>");	
					//}else{
						$(cls).prepend("<li style='background:" + that.legendColor[i] + ";border:0px solid " + that.legendColor[i] + ";'><span>"+txt+"Lv</span></li>");
					//}
				}
				
				if (that.valPerSlice != null) {
					that.setGoganText(that.valPerSlice[0]);
				}
					
				if ($("#typeArea_"+that.id).attr("class")=="color"){
					var liHeight = parseInt(220/that.lv); 
					$(cls+" li").css("height",liHeight+"px");
					$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*that.lv))+"px");
				}
				
				//mng_s 20170823 leekh
				if(this.isNegative){
					if(that.reverseOn==false){
						that.calNegativeLegend2(arData2);
					}else{
						that.calNegativeLegend(arData2);
					}
				}
				//mng_e 20170823 leekh
				
				
				
				that.map.setLegendColor();
			});	
			
			this.updateGuganLegend();
			//this.map.gMap.whenReady(function() {
				this.checkLegendFixed();
			//});
			
		};// createLegend 끝
	}// legendInfo 끝
}// sLegendInfo 끝


}(window, document));


/*$(function(){  
	var body = $("body");
	var settingList = ".lgListBox>li>a";
	body.on("click", settingList, function(){
		var on = $(this).hasClass("on");
		if(!on){
			$(this).siblings("ul").show();
			$(this).addClass("on");
		}else{
			$(this).siblings("ul").hide();
			$(this).removeClass("on");
		}
	});
});*/

function getColorFromcolorSettingList(id){
	var arrColor = new Array();
	$("#colorSettingList01_"+id+" a").each(function(){
		var colorCode = $(this).css("background-color");
		if(colorCode == '#fff' || colorCode == "transparent"){ //2016.10.13 추가 ie에서 rgb색상이 반영 안되는 버그
			colorCode = $(this).parent('li').css("background-color");
		}else{
			$(this).parent('li').css("background-color", colorCode);
		}
		arrColor.push(colorCode);
	});
	
	return arrColor;
}

function resizeColor(c01, c02, cls, max){  // 범례구간설정 색지정
	var arrColor = new Array();
	var paramColor1 = c01;
	var paramColor2 = c02;
	
	for ( var i = 0; i < max-1; i++) {
		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max-1);
		arrColor.push(paramColor);
	} 
	arrColor.push( $.xcolor.gradientlevel(paramColor2, paramColor2, 0, 1));
	
	if (cls != null && cls != "") {
		$(cls).empty();
		for ( var i = arrColor.length-1; i >=0; i--) { 
			$(cls).prepend("<td style='background:" + arrColor[i] + ";'></td>");	
		}
	}
	return arrColor;
}

function getCalculColor(sColor, eColor, lv) {
	var colorList = [];
	for ( var i = 0; i < lv; i++) {
		if (i==0) {
			var paramColor = $.xcolor.gradientlevel(sColor, eColor, i, lv);
			colorList.push(sColor);
		}else {
			var paramColor = $.xcolor.gradientlevel(sColor, eColor, i, lv);
			colorList.push(paramColor.getColor());
		}
	} 
	return colorList;
}

function setResizeColor(colorList, cls, id, obj) {
	var max = obj.lv;
	$(cls).empty();

	for ( var i = 0; i < colorList.length; i++) {
		var txt = i+1;
		if(txt<10){
			txt = "0"+txt;
		}
		
		$(cls).prepend("<td style='background:" + colorList[i] + ";'></td>");
	}
}

function setLegendColor(colorList, cls, id, obj) {
	var max = obj.lv;
	var arrColor = new Array();
	$(cls).empty();

	for( var i = 0; i < colorList.length; i++ ){
		var xcolor = $.xcolor.gradientlevel(colorList[i], colorList[i], 0, 1);
		arrColor.push(xcolor);
	}

	for ( var i = 0; i < arrColor.length; i++) {
		var txt = i+1;
		if(txt<10) txt = "0"+txt;
		if (obj.valPerSlice != null) {
			if ($(cls).parent().attr("class") == "ring") {
				$(cls).append("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
				$("#bubbleLegendLine_"+id).find("li").eq(9-i).find("span").html(appendCommaToNumber(obj.valPerSlice[0][i]));
			}else {
				$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
			}
		}else {
			if ($(cls).parent().attr("class") == "ring") {
				$(cls).append("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
			}else {
				$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
			}
		}
		
		//cls가 무엇이냐에 따라서 분기 처리를 또 해줘야 할듯
		obj.legendColor[i] = arrColor[i].getColor();
	}
	if (obj.valPerSlice != null) {
		obj.setGoganText(obj.valPerSlice[0]);
	}
	
	if ($("#typeArea_"+id).attr("class")=="color"){
		var liHeight = parseInt(220/max); 
		$(cls+" li").css("height",liHeight+"px");
		$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*max))+"px");
	}
	
	if(cls=="#colorSettingList01_"+id){
		$("#colorSettingList01_"+id+">li").each(function(){
			$(this).width((100/$("#colorSettingList01_"+id+">li").length)+"%");
			$(this).css("height","31px");
		});
		$('#colorSettingList01_'+id+'>li').append(
				$('<a href="javascript:void(0)">#ff1b00</a>')
					.width((100/$("#colorSettingList01_"+id+">li").length)+"%")
					.height("31px")
					.wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" })
		);
	}
	
}

function legendColor(c01, c02, cls, max,id,obj){
	
	console.log("[legendInfo.js] legendColor() 호출");
	console.log("[legendInfo.js] legendColor() obj [" + obj);
	
	//mng_s
	if(obj.map.isInnerMapShow2) { //그리드일 경우
		//obj.valPerSlice = [[50000000,500000000,900000000,1000000000,3000000000,7000000000,90000000000]];
		
		//추후 줌별로 정의된 값을 여기서 세팅하면 된다.
		//obj.valPerSlice = [[50000000,500000000,900000000,1000000000,3000000000,5000000000,70000000000,100000000000,500000000000,900000000000]];
		
		if( obj.map.grid_legend_new != null && obj.map.grid_legend_new != undefined) {
			obj.valPerSlice = obj.map.grid_legend_new;
		}
		obj.lv = 10;
		
		//최소값 = ["#ffd75d", "#eaf5c0", "#cccccc", "#cccccc", "#cccccc", "#fdf3d6"];
		//최대값 = ["#cd1103", "#0e4000", "#004574", "#230064", "#00076a", "#783300"];
		//그리드의 경우 색을 더 진하게 해달라고 요청해서 c02가 제일 진한 색인데 여기서 다시 조정한다.
		
		/*
		if(c02 == "#cd1103") {
			//c02 = "#BF360C";
			//c01 = "#FBE9E7";
			
			c02 = "#842209";
			c01 = "#FBE9E7";
			
		} else if(c02 == "#0e4000") {
			//c02 = "#1B5E20";
			//c01 = "#E8F5E9";
			
			c02 = "#BF360C";
			c01 = "#FBE9E7";
		} else if(c02 == "#004574") {
			c02 = "#01579B";
			c01 = "#E1F5FE";
		} else if(c02 == "#230064") {
			c02 = "#4A148C";
			c01 = "#F3E5F5";
		} else if(c02 == "#00076a") {
			c02 = "#1A237E";
			c01 = "#E8EAF6";
		} else if(c02 == "#783300") {
			//c02 = "#3E2723";
			//c01 = "#EFEBE9";
			
			c02 = "#880E4f";
			c01 = "#FCE4EC";
		}
		*/
		
	}
	
	var arrColor = new Array();
	var paramColor1 = c01;
	var paramColor2 = c02;
	
	//legend 변수 세팅
	obj.lv = max;
	obj.legendColor = new Array();
	
	if(obj.map.isInnerMapShow2) { //그리드일 경우
		obj.lv = 10;
	}
	
	if(obj.map.isInnerMapShow3) { //행정구역 그리드일 경우
		obj.lv = 10;
	}
	
	//mng_s
	if(obj.map.isInnerMapShow2) { //그리드일 경우
		
		//추후 색상값이 결정되면 c02처럼 arrColor값을 푸쉬해서 색상표데로 넣으면 된다.
		if(c02 == "#cd1103") {
			//Pink
			arrColor.push($.xcolor.gradientlevel("#FCE4EC", "#FCE4EC", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#F8BBD0", "#F8BBD0", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#F48FB1", "#F48FB1", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#F06292", "#F06292", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#EC407A", "#EC407A", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#E91E63", "#E91E63", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#D81B60", "#D81B60", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#C2185B", "#C2185B", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#AD1457", "#AD1457", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#880E4f", "#880E4f", 0, 1));
			
		} else if(c02 == "#0e4000") {
			
			arrColor.push($.xcolor.gradientlevel("#FFF8E1", "#FFF8E1", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FFECB3", "#FFECB3", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FFE082", "#FFE082", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FFD54F", "#FFD54F", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FFCA28", "#FFCA28", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FFC107", "#FFC107", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FFB300", "#FFB300", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FFA000", "#FFA000", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FF8F00", "#FF8F00", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#FF6F00", "#FF6F00", 0, 1));
			
			
		} else if(c02 == "#004574") {
			
			arrColor.push($.xcolor.gradientlevel("#E8F5E9", "#E8F5E9", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#C8E6C9", "#C8E6C9", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#A5D6A7", "#A5D6A7", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#81C784", "#81C784", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#66BB6A", "#66BB6A", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#4CAF50", "#4CAF50", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#43A047", "#43A047", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#388E3C", "#388E3C", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#2E7D32", "#2E7D32", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#1B5E20", "#1B5E20", 0, 1));
			
			
		} else if(c02 == "#230064") {
			
			arrColor.push($.xcolor.gradientlevel("#E1F5FE", "#E1F5FE", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#B3E5FC", "#B3E5FC", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#81D4FA", "#81D4FA", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#4FC3F7", "#4FC3F7", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#29B6F6", "#29B6F6", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#03A9F4", "#03A9F4", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#039BE5", "#039BE5", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#0288D1", "#0288D1", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#0277BD", "#0277BD", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#01579B", "#01579B", 0, 1));
			
		} else if(c02 == "#00076a") {
			
			arrColor.push($.xcolor.gradientlevel("#E8EAF6", "#E8EAF6", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#C5CAE9", "#C5CAE9", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#9FA8DA", "#9FA8DA", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#7986CB", "#7986CB", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#5C6BC0", "#5C6BC0", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#3F51B5", "#3F51B5", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#3949AB", "#3949AB", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#303F9F", "#303F9F", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#283593", "#283593", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#1A237E", "#1A237E", 0, 1));
			
		} else if(c02 == "#783300") {
			
			arrColor.push($.xcolor.gradientlevel("#F3E5F5", "#F3E5F5", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#E1BEE7", "#E1BEE7", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#CE93D8", "#CE93D8", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#BA68C8", "#BA68C8", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#AB47BC", "#AB47BC", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#9C27B0", "#9C27B0", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#8E24AA", "#8E24AA", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#7B1FA2", "#7B1FA2", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#6A1B9A", "#6A1B9A", 0, 1));
			arrColor.push($.xcolor.gradientlevel("#4A148C", "#4A148C", 0, 1));
		}
		
	} else if(obj.map.isInnerMapShow3) { //행정구역 그리드일 경우
			
			//추후 색상값이 결정되면 c02처럼 arrColor값을 푸쉬해서 색상표데로 넣으면 된다.
			if(c02 == "#cd1103") {
				//Pink
				arrColor.push($.xcolor.gradientlevel("#FCE4EC", "#FCE4EC", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#F8BBD0", "#F8BBD0", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#F48FB1", "#F48FB1", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#F06292", "#F06292", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#EC407A", "#EC407A", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#E91E63", "#E91E63", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#D81B60", "#D81B60", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#C2185B", "#C2185B", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#AD1457", "#AD1457", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#880E4f", "#880E4f", 0, 1));
				
			} else if(c02 == "#0e4000") {
				
				arrColor.push($.xcolor.gradientlevel("#FFF8E1", "#FFF8E1", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FFECB3", "#FFECB3", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FFE082", "#FFE082", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FFD54F", "#FFD54F", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FFCA28", "#FFCA28", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FFC107", "#FFC107", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FFB300", "#FFB300", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FFA000", "#FFA000", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FF8F00", "#FF8F00", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#FF6F00", "#FF6F00", 0, 1));
				
				
			} else if(c02 == "#004574") {
				
				arrColor.push($.xcolor.gradientlevel("#E8F5E9", "#E8F5E9", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#C8E6C9", "#C8E6C9", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#A5D6A7", "#A5D6A7", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#81C784", "#81C784", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#66BB6A", "#66BB6A", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#4CAF50", "#4CAF50", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#43A047", "#43A047", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#388E3C", "#388E3C", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#2E7D32", "#2E7D32", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#1B5E20", "#1B5E20", 0, 1));
				
				
			} else if(c02 == "#230064") {
				
				arrColor.push($.xcolor.gradientlevel("#E1F5FE", "#E1F5FE", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#B3E5FC", "#B3E5FC", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#81D4FA", "#81D4FA", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#4FC3F7", "#4FC3F7", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#29B6F6", "#29B6F6", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#03A9F4", "#03A9F4", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#039BE5", "#039BE5", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#0288D1", "#0288D1", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#0277BD", "#0277BD", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#01579B", "#01579B", 0, 1));
				
			} else if(c02 == "#00076a") {
				
				arrColor.push($.xcolor.gradientlevel("#E8EAF6", "#E8EAF6", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#C5CAE9", "#C5CAE9", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#9FA8DA", "#9FA8DA", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#7986CB", "#7986CB", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#5C6BC0", "#5C6BC0", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#3F51B5", "#3F51B5", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#3949AB", "#3949AB", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#303F9F", "#303F9F", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#283593", "#283593", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#1A237E", "#1A237E", 0, 1));
				
			} else if(c02 == "#783300") {
				
				arrColor.push($.xcolor.gradientlevel("#F3E5F5", "#F3E5F5", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#E1BEE7", "#E1BEE7", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#CE93D8", "#CE93D8", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#BA68C8", "#BA68C8", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#AB47BC", "#AB47BC", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#9C27B0", "#9C27B0", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#8E24AA", "#8E24AA", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#7B1FA2", "#7B1FA2", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#6A1B9A", "#6A1B9A", 0, 1));
				arrColor.push($.xcolor.gradientlevel("#4A148C", "#4A148C", 0, 1));
			}
	//mng_e 행정구역 그리드일 경우 20180219
			
	}else {
		for ( var i = 0; i < max-1; i++) {
			var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max-1);
			arrColor.push(paramColor);
		} 
		arrColor.push( $.xcolor.gradientlevel(paramColor2, paramColor2, 0, 1));
	}
	
	
	
	//버블지도 라인 show
	for (var i=0; i<10; i++) {
		var txt = i+1;
		if(txt<10){
			txt = "0"+txt;
		}
		$("#bubbleLegendLine_"+id).find("li").eq(i).find("span").show();
		$("#bubbleLegendLine_"+id).find("li").eq(9-i).find("span").html(txt+"Lv");
	}
	
	//=================================//
	//2016.06.07 kcu 수정 : 색상반전 오류
	if (obj.reverseOn) {
		arrColor.reverse();
	}
	//=================================//
	
	$(cls).empty();
	for ( var i = 0; i < arrColor.length; i++) {
		var txt = i+1;
		if(txt<10){
			txt = "0"+txt;
		}
		
		if (obj.valPerSlice != null) {
			if ($(cls).parent().attr("class") == "ring") {
				$(cls).append("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
				$("#bubbleLegendLine_"+id).find("li").eq(9-i).find("span").html(appendCommaToNumber(obj.valPerSlice[0][i]));
			}else {
				$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
			}
		}else {
			if ($(cls).parent().attr("class") == "ring") {
				$(cls).append("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
			}else {
				$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
			}
		}
		
		//cls가 무엇이냐에 따라서 분기 처리를 또 해줘야 할듯
		obj.legendColor[i] = arrColor[i].getColor();
	}
	
	if (obj.valPerSlice != null) {
		obj.setGoganText(obj.valPerSlice[0]);
	}
	
	//버블지도 라인 hide
	var hiddenLv = 10-arrColor.length;
	for (var i=0; i<hiddenLv; i++) {
		$("#bubbleLegendLine_"+id).find("li").eq(i).find("span").hide();
	}
	
	if ($("#typeArea_"+id).attr("class")=="color"){
		var liHeight = parseInt(220/max); 
		$(cls+" li").css("height",liHeight+"px");
	}
	
	if(cls=="#colorSettingList01_"+id){
		$("#colorSettingList01_"+id+">li").each(function(){
			$(this).width((100/$("#colorSettingList01_"+id+">li").length)+"%");
			$(this).css("height","31px");
		});
	}
	
	//텍스트 정렬을 middle로 한다.
	if (cls.indexOf("#colorStatus_") != -1) {
		var height = $(cls+">li").eq(0).height();
		 $(cls+">li").css("line-height", height+"px");
	}
}

function lvLegendSetting(id,obj){
	var color;
	var listLegnth = $("#lvSelect_"+id).val();
	
	var tabsSelector =  $("#tabsSelector_"+id+" > a");
	var selectorTab;
	
	for(var i =0;i<tabsSelector.length;i++){
		for(var y=0;y<tabsSelector[i].classList.length;y++){
			if(tabsSelector[i].classList[y] == "on"){
				selectorTab = tabsSelector[i].classList[1];
			}
		}
	}
	var opacity = $("#opacitySel_"+id).val();
	
	if(selectorTab =="al"){
		var colorckList = $("#colorSetting_"+ id +" > li> a");
		var arrColor = new Array();
		
		for(var i = 0 ; i<colorckList.length;i++){
			if(colorckList[i].classList.length>0){
				for(var y=0;y<colorckList[i].classList.length;y++){
					if(colorckList[i].classList[y] =="on"){
						color = colorckList[i].style.background;
					}
				}
			}
		}
		
		var startColor = "#ffd75d";
		//살고싶은 우리동네의 경우, default색상
		if (obj.delegate != undefined && obj.delegate.namespace != undefined && obj.delegate.namespace === "houseAnalysisMap") {
			startColor = "#cccccc";
		}
		
		legendColor(color, startColor, "#colorSettingList01_"+id, $("#lvSelect_"+id).val(),id,obj);
	}
}

(function ($) {
	  $.fn.getTextWidth = function() {
	    var spanText = $("BODY #spanCalculateTextWidth");

	    if (spanText.size() <= 0) {
	      spanText = $("<span id='spanCalculateTextWidth' style='filter: alpha(0);'></span>");
	      spanText.appendTo("BODY");
	    }

	    var valu = this.val();
	    if (!valu) valu = this.text();

	    spanText.text(valu);

	    spanText.css({
	      "fontSize": this.css('fontSize'),
	      "fontWeight": this.css('fontWeight'),
	      "fontFamily": this.css('fontFamily'),
	      "position": "absolute",
	      "top": 0,
	      "opacity": 0,
	      "left": -2000
	    });

	    return spanText.outerWidth() + parseInt(this.css('paddingLeft')) + 'px';
	  };

	  $.fn.getTextHeight = function(width) {
	    var spanText = $("BODY #spanCalculateTextHeight");

	    if (spanText.size() <= 0) {
	      spanText = $("<span id='spanCalculateTextHeight'></span>");
	      spanText.appendTo("BODY");
	    }

	    var valu = this.val();
	    if (!valu) valu = this.text();

	    spanText.text(valu);

	    spanText.css({
	      "fontSize": this.css('fontSize'),
	      "fontWeight": this.css('fontWeight'),
	      "fontFamily": this.css('fontFamily'),
	      "top": 0,
	      "left": -1 * parseInt(width) + 'px',
	      "position": 'absolute',
	      "display": "inline-block",
	      "width": width
	    });

	    return spanText.innerHeight() + 'px';
	  };

	  /**
	   * Adjust the font-size of the text so it fits the container.
	   *
	   * @param minSize     Minimum font size?
	   * @param maxSize     Maximum font size?
	   * @param truncate    Truncate text after sizing to make sure it fits?
	   */
	  $.fn.autoTextSize = function(minSize, maxSize, truncate) {
	    var _self = this,
	        _width = _self.innerWidth(),
	        _textWidth = parseInt(_self.getTextWidth()),
	        _fontSize = parseInt(_self.css('font-size'));

	    if(_width >= _textWidth){
	    	_fontSize = maxSize;
	    	_self.css('font-size',_fontSize + 'px');
	    }
	    
	    while (_width < _textWidth || (maxSize && _fontSize > parseInt(maxSize))) {
	      if (minSize && _fontSize <= parseInt(minSize)) break;

	      _fontSize--;
	      _self.css('font-size', _fontSize + 'px');

	      _textWidth = parseInt(_self.getTextWidth());
	    }

	    if (truncate) _self.autoTruncateText();
	  };

	  /**
	   * Function that truncates the text inside a container according to the
	   * width and height of that container. In other words, makes it fit by chopping
	   * off characters and adding '...'.
	   */
	  $.fn.autoTruncateText = function() {
	    var _self = this,
	        _width = _self.outerWidth(),
	        _textHeight = parseInt(_self.getTextHeight(_width)),
	        _text = _self.text();
	    	_truncated = false;

	    // As long as the height of the text is higher than that
	    // of the container, we'll keep removing a character.
	    while (_textHeight > _self.outerHeight()) {
	      _text = _text.slice(0,-1);
	      _self.text(_text);
	      _textHeight = parseInt(_self.getTextHeight(_width));
	      _truncated = true;
	    }

	    // When we actually truncated the text, we'll remove the last
	    // 3 characters and replace it with '...'.
	    if (!_truncated) return;
	    _text = _text.slice(0, -3);

	    // Make sure there is no dot or space right in front of '...'.
	    var lastChar = _text[_text.length - 1];
	    if (lastChar == ' ' || lastChar == '.') _text = _text.slice(0, -1);
	    _self.text(_text + '...');
	  };
	})(jQuery);


