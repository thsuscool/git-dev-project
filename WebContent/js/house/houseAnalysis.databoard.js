/**
 * 살고싶은 우리동네의 데이터 보드에 대한 클래스
 * 
 * history : (주)유코아시스템, 1.0, 2015/12/01  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$houseAnalysisMap.databoard = {
		data: {
			spiderChart:null,
			indicatorChart:null,
			smallLocationChart:null
		},
		descIndicatorChart ://지표별 상세현황 막대차트 내림차순 정렬할 지표 
		[
			"HMM0006"/*주택-노후주택비율*/,"HMM0008"/*주택-면적당 아파트가격*/,
			"HMM0013"/*안전-화재안전*/,"HMM0014"/*안전-교통사고안전*/,
			"HMM0020"/*교육-교원 1인당 학생수*/,
			"HMM0023"/*복지문화-유치원 및 보육시설*/,"HMM0024"/*복지문화-병의원 및 약국*/,"HMM0025"/*복지문화-노인복지시설*/,"HMM0026",/*복지문화-사회복지시설*/
			"HMM0028"/*안전-범죄안전*/,"HMM0029"/*안전-안전사고*/,"HMM0030"/*안전-자살안전*/,"HMM0031"/*안전-감염병 안전*/,"HMM0032"/*안전-자연재해 안전*/
		],
		bClassInfoList : {
			"HML0001": {
				text:"자연",
				rgbColor:"127,173,62"
			},
			"HML0002": {
				text:"주택",
				rgbColor:"25,126,191"
			},
			"HML0003": {
				text:"지역 인구",
				rgbColor:"219,76,96"
			},
			"HML0004": {
				text:"안전",
				rgbColor:"222,170,0"
			},
			"HML0005": {
				text:"생활 편의 교통",
				rgbColor:"229,99,47"
			},
			"HML0006": {
				text:"교육",
				rgbColor:"126,56,116"
			},
			"HML0007": {
				text:"복지 문화",
				rgbColor:"28,44,129"
			}
		},
		/**
		 * @name         : databoardViewSetting
		 * @description  : 데이터 보드쪽에 주거현황보기와 추천지역찾기가 보여주는게 다름에 따른 이벤트
		 * @date         : 2015. 12. 09.
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param type   : 'current' 주거현황보기 'recommend' 추천지역찾기
		 */
		databoardViewSetting:function(type){
			$(".dataSideScroll").mCustomScrollbar("scrollTo","0");
			$(".dataBoardDiv .dscList dd,.dataBoardDiv .dscList dt,#spider-web-slide-navigator,#detailChart1,#detailChart2").hide();
			$(".dataBoardDiv .dscList dt a").removeClass("on");
			var adm_cd = "00";
			if($houseAnalysisMap.ui.hasText($houseAnalysisMap.search.activeAdmCd)){
				adm_cd = $houseAnalysisMap.search.activeAdmCd.substring(0,5);
			}
			if(type=="current"){
				$(".dataBoardDiv .dscList dt:not(:lt(2)),.dataBoardDiv .dscList dd:not(:lt(2))").show();
				$(".dataBoardDiv .dscList dt:not(:lt(2)) a").addClass("on");
				$("#detailChart2").show();
			}else if(type=="recommend"){
				$(".dataBoardDiv .dscList dt a").addClass("on");
				$(".dataBoardDiv>.dscList dt:not(:last),.dataBoardDiv>.dscList dd:not(:last)").show();
				$("#spider-web-slide-navigator").show();
				$("#detailChart1").show();
			}
			if(adm_cd==($houseAnalysisMap.leftmenu.asanSidoCd+$houseAnalysisMap.leftmenu.asanSggCd)){
				$(".dataBoardDiv .dscList dt:last,.dataBoardDiv .dscList dd:last").show();
			}else{
				$(".dataBoardDiv .dscList dt:last,.dataBoardDiv .dscList dd:last").hide();
			}
			$("#asan-area a").removeClass("on");
			
			//추천지역 없는 경우 데이터 보드 사라짐
			if(type=="recommend" && 0 == $("#interestList").find("a").length){
				$(".dataSideBox").stop().animate({"right":"-1500px"},200);
				$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
				$(".interactiveDataBoard").addClass("disabled");
			}else{
				if($houseAnalysisMap.ui.hasText(type)){
					$(".dataSideBox").stop().animate({"right":"0"},200);
					$(".interactiveDataBoard").addClass("on").stop().animate({"right":"426px"},200);
				}
			}
			
		},
		/**
		 * @name            : getPolygonCodeToAdmCd
		 * @description     : PolygonCode 로 행정동 코드 얻기
		 * @date            : 2016. 07. 01.
		 * @author	        : 나광흠
		 * @history 	    :
		 */
		getPolygonCodeToAdmCd:function(){
			var map=$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
			if(parseInt(map.curPolygonCode)<=2){//시도
				return "00";
			}else if(map.curPolygonCode=="3"){//시군구
				return map.curSidoCd;
			}else if(map.curPolygonCode=="4"){//읍면동
				return map.curSidoCd+map.curSiggCd;
			}else if(parseInt(map.curPolygonCode)>4){//읍면동
				return map.curSidoCd+map.curSiggCd+map.curDongCd;
			}
		},
		/**
		 * @name            : getMapOptions
		 * @description     : 지도 옵션 얻기
		 * @date            : 2016. 07. 01.
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param adm_cd    : 행정동코드
		 */
		getMapOptions:function(adm_cd){
			if(adm_cd){
				adm_cd = adm_cd.toString();
			}
			var zoom = 2,sido_cd="",sgg_cd="",emdong_cd="";
			if(adm_cd&&adm_cd.length>=2&&adm_cd.substring(0,2)!="00"){
				sido_cd = adm_cd.substring(0,2);
				zoom = 4;
				if(adm_cd.length>=5&&adm_cd.substring(2,5)!="999"){
					sgg_cd = adm_cd.substring(2,5);
					zoom = 6;
					if(adm_cd.length>=7&&adm_cd.substring(5,7)!="00"){
						emdong_cd = adm_cd.substring(5,7);
						zoom = 9;
					}
				}
			}
			return {zoom:zoom,sido_cd:sido_cd,sgg_cd:sgg_cd,emdong_cd:emdong_cd,adm_cd:sido_cd+sgg_cd+emdong_cd};
		},
		/**
		 * @name         : openDataBoard
		 * @description  : 데이터 보드 열기
		 * @date         : 2015. 12. 09. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		openDataBoard:function(){
			$(".dataSideBox").stop().animate({"right":"0"},200);
			$(".interactiveDataBoard").addClass("on").stop().animate({"right":"426px"},200);
		},
		/**
		 * @name         : closeDataBoard
		 * @description  : 데이터 보드 닫기
		 * @date         : 2015. 12. 09.
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		closeDataBoard:function(){
			$(".dataSideBox").stop().animate({"right":"-1500px"},200);
			$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
		},
		/**
		 * @name          : areaComplex
		 * @description   : 데이터보드 지역종합현황 보기
		 * @date          : 2016. 08. 09.
		 * @author	      : 차수아
		 * @history 	  :
		 * @param b_class : 대분류 
		 * @param m_class : 중분류
		 */
		areaComplex : function(b_class,m_class){
			regionSpiderChart(b_class);
			$houseAnalysisMap.chart.indicatorChart(bClassInfoList[b_class].indicator[m_class])
		},
		/**
		 * @name          : initSmallLocationRadio
		 * @description   : 데이터보드 소지역정보 탭 첫번째 활성화 및 각 탭의 라디오 버튼 첫번째 활성화
		 * @date          : 2016. 09. 12.
		 * @author	      : 나광흠
		 * @history 	  :
		 */
		initSmallLocationRadio : function(){
			$.each($("#detailChart4>.ThisAreaInfo>ul>li"),function(cnt,node){
				if(cnt==0){
					$(node).addClass("M_on");
				}else{
					$(node).removeClass("M_on");
				}
				$(node).find("input:radio:first").prop("checked",true);
			});
		}
	};
	/**
	 * @name                 : regionSpiderChart
	 * @description          : 지역종합현황보기 스파이더 차트 그리기
	 * @date                 : 2016. 07. 01.
	 * @author	             : 나광흠
	 * @history 	         :
	 * @param b_class_idx_id : 대분류
	 */
	function regionSpiderChart(b_class_idx_id){
		var adm_cd = $houseAnalysisMap.search.activeAdmCd;
		var mapOption = $houseAnalysisMap.databoard.getMapOptions(adm_cd);
		$houseAnalysisMap.api.areaIndexChartLists(mapOption.sido_cd,mapOption.sgg_cd,mapOption.emdong_cd,null,function(res){
			var sido_nm="",sgg_nm="",emdong_nm="";
			if (res.errCd == "0") {
				var getValueName = "z_score";
				function calc(list){
					var array = [];
					if(list&&list.length>0){
						$.each(list,function(cnt,node){
							array.push(parseFloat(node[getValueName]));
						});
					}
					return array;
				}
				function appendLabelName(selector,appendName){
					selector.update({name:appendName+selector.name+" 평균"});
				}
				var categories = [];
				var series = [];
				$.each($houseAnalysisMap.databoard.bClassInfoList,function(cnt,node){
					categories.push(node.text);
				});
//				전국 데이터는 무조건 5로 하드코딩으로 변경
				function changeCountryZscore(obj){
					$.each(obj.list,function(){
						this.z_score = "5";
					});
				}
				changeCountryZscore(res.result.country);
				series.push({adm_nm:"전국",list:calc(res.result.country.list)});
				var resultTitle02="";
				if(mapOption.sido_cd&&mapOption.sido_cd!="00"){
					if(mapOption.sgg_cd&&mapOption.sgg_cd!="999"){
						if(mapOption.emdong_cd&&mapOption.emdong_cd!="00"){
							series.push({adm_nm:res.result.sgg.info.addr,list:calc(res.result.sgg.list)})
							series.push({adm_nm:res.result.emdong.info.addr,list:calc(res.result.emdong.list)})
						}else{
							series.push({adm_nm:res.result.sido.info.addr,list:calc(res.result.sido.list)});
							series.push({adm_nm:res.result.sgg.info.addr,list:calc(res.result.sgg.list)})
						}
					}else{
						series.push({adm_nm:res.result.sido.info.addr,list:calc(res.result.sido.list)});
					}
					var maxResult = -10;
					var selectwgtval = 0;
					for(var i=0; i<series[series.length-1].list.length; i++){
						var tempResult = parseFloat(series[series.length-1].list[i]);
						if(maxResult <= tempResult){
							maxResult = tempResult;
							selectwgtval = i;
						}
					}
					resultTitle02 = "<span style=\"color:#336699;\">"+series[0].adm_nm;
					resultTitle02 +="</span> 내에서 <span style=\"color:#336699;\">"+series[series.length-1].adm_nm;
					resultTitle02 +="</span> 의 <span style=\"color:#c30;\">「"+categories[selectwgtval]+"」</span> 지표가 좋음";
				}
				$houseAnalysisMap.chart.spiderChart(mapOption.adm_cd,"detailChart2", series, b_class_idx_id, resultTitle02);
				if($houseAnalysisMap.search.isAbode){
					$("#detailChart2 .highcharts-container").css('margin-top','25px');
				}
				appendLabelName($("#detailChart2").highcharts().legend.allItems[0],"");
				if($("#detailChart2").highcharts().legend.allItems.length>=2){
					appendLabelName($("#detailChart2").highcharts().legend.allItems[$("#detailChart2").highcharts().legend.allItems.length-1],"관심지역:");
				}
				if($("#detailChart2").highcharts().legend.allItems.length>=3){
					appendLabelName($("#detailChart2").highcharts().legend.allItems[1],"상위지역:");
				}
				if($houseAnalysisMap.search.isAbode==false){
					var interArea = $.extend(true, {}, series[series.length-1]);
					var compareSeries = [interArea];
					$houseAnalysisMap.api.areaIndexChartLists($houseAnalysisMap.search.getRecommendObject().now_resid_sido_cd,$houseAnalysisMap.search.getRecommendObject().now_resid_sgg_cd,null,null,function(res){
						if(res.errCd=="0"){
							if($("#stand-recommend-sido-select").val()=="00"||$houseAnalysisMap.search.isIdealType===true){
								changeCountryZscore(res.result.country);
								compareSeries.unshift({adm_nm:"전국",list:calc(res.result.country.list)});
							}else{
								if($("#stand-recommend-sgg-select").val()=="999"){
									compareSeries.unshift({adm_nm:res.result.sido.info.addr,list:calc(res.result.sido.list)});
								}else{
									compareSeries.unshift({adm_nm:res.result.sgg.info.addr,list:calc(res.result.sgg.list)});
								}
							}
							var maxResult = -10;
							var selectwgtval = 0;
							for(var i=0; i<compareSeries[0].list.length; i++){
								var tempResult = parseFloat(compareSeries[1].list[i]);
								if(maxResult <= tempResult){
									maxResult = tempResult;
									selectwgtval = i;
								}
							}
							resultTitle01 = "<span style=\"color:#336699;\">"+compareSeries[0].adm_nm +"</span>";
							resultTitle01 +="에 비해 <span style=\"color:#336699;\">"+compareSeries[1].adm_nm;
							resultTitle01 +="</span>의 <span style=\"color:#c30;\">「"+categories[selectwgtval]+"」</span> 지표가 좋음";
							$houseAnalysisMap.chart.spiderChart(mapOption.adm_cd,"detailChart1", compareSeries, b_class_idx_id, resultTitle01);
							$houseAnalysisMap.databoard.data.spiderChart = {
								compareSeries : compareSeries,
								categories : categories
							};
							appendLabelName($("#detailChart1").highcharts().legend.allItems[0],"기준지역:");
							appendLabelName($("#detailChart1").highcharts().legend.allItems[1],"추천지역:");
						}
					});
				}else{
					
				}
			} else if (res.errCd == "-100") {
				console.warn(res.errMsg);
			} else {
				messageAlert.open("알림", res.errMsg);
			}
		});
	}
}(window, document));