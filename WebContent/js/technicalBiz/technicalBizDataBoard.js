/**
 * 생활업종 통계지도 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/05  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$technicalBizDataBoard = W.$technicalBizDataBoard || {};
	
	$(document).ready(function() {
		$technicalBizDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$technicalBizDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅
		
		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			}
		});
		
	});
	
	$technicalBizDataBoard.ui = {
			mapData : [],				//지도별 데이터
			map : null,				//지도 (sMap.map)
			map_id : "0",				//지도 ID (0, 1, 2)
			chartDataList : [],
			miniGeojson : null,
			startUpSupplyListCurrentPageIndex : 1,		//창업지원시설 목록 페이지 번호
			industryListCurrentPageIndex : 1,				//산업단지 목록 페이지 번호
			selectedLctTypeList : null,
			searchOption : null, //조건검색 옵션
			searchDataArray : null, //조건검색 어레이
					
			// 창업지원시설 목록 페이징 처리
			startUpSupplyListPaging : function (totalCount, totalPage, pageSize, data) {
				$('#startUpSupplyListPaging .pages').paging({
					current : 1,
					max : totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){	// 페이지 선택 시
						$(".startUpSupplyLists").empty();
						if (data.length != 0) {
							var tmpData = data[page];
							for (var i=0; i<tmpData.length; i++) {
								var marker_no = (parseInt(page)*pageSize) + (i-pageSize);
								html = "";
								//2017.09.27 개발팀 수정 시작
/*								html += '<li id="supply_'+marker_no+'" class="supplyList" style="cursor:pointer;">';
								html += 	'<div class="rela">';
								html += 		'<div class="img"><img src="/img/tech/ico_listType01.png" /></div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">' + tmpData[i].inst_nm + '</p>';
								html += 			'<div style="height:5px;"></div>';
								html +=				'<table>';
								html += 			'<tr class="t02"><td class="td01">연락처</td><td class="td02">'+ tmpData[i].tel_no + '</td></tr>';
								html += 			'<tr style="height:3px;"></tr>';
								html += 			'<tr class="t02"><td class="td01">위치</td><td class="td02">'+ tmpData[i].addr + '</td></tr>';
								html += 			'<tr style="height:3px;"></tr>';
								
								var url = tmpData[i].url;
								if (url != undefined && url.length > 1) {
									if (url.indexOf("http") == -1 && url.indexOf("https") == -1) {
										url = "http://"+url;
									}
									html += '<tr class="t02"><td class="td01">링크</td><td class="td02"><a href="' + url + '" target="_blank">정보더보기>></td></tr>';
								}

								html +=				'</table>';
								html += 		'</div>';	
								html += 	'</div>';*/
								html += '<li id="supply_'+marker_no+'">';
								html += 	'<div class="rela">';
								html += 		'<div class="img">';
								if(tmpData[i].lct_type == '1'){
									html += 			'<span class="c01">기업<br />직접</span>';
								}else if(tmpData[i].lct_type == '2'){
									html += 			'<span class="c02">비즈<br />니스</span>';
								}else if(tmpData[i].lct_type == '3'){
									html += 			'<span class="c03">창업<br />보육</span>';
								}else if(tmpData[i].lct_type == '4'){
									html += 			'<span class="c04">창업<br />투자</span>';
								}
								
								html += 		'</div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">'+tmpData[i].inst_nm+'</p>';
								html += 			'<p class="t02"><span>연락처</span>'+tmpData[i].tel_no+'</p>';
								html += 			'<p class="t02"><span>위치</span> '+tmpData[i].addr+'</p>';
								var url = tmpData[i].url;
								if (url != undefined && url.length > 1) {
									if (url.indexOf("http") == -1 && url.indexOf("https") == -1) {
										url = "http://"+url;
									}
									html +=			'<p class="t02"><span>링크</span> <a href="'+url+'" target="_blank">정보 더보기&gt;&gt;&gt;</a></p>'
								}
								html += 		'</div>';
								
								
								
								html += 	'</div>';
								html += '</li>';
								
								
								//2017.09.27 개발팀 수정 종료
								
								$(".startUpSupplyLists").append(html);
							}		
						}
					}
				});
			},
			
			// 산업단지 목록 페이징 처리
			industryListPaging : function (totalCount, totalPage, pageSize, data) {
				$('#industryListPaging .pages').paging({
					current : 1,
					max : totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '>',
					prev : '<',
					first : '<<',
					last : '>>',
					onclick : function(e,page){
						$(".industryLists").empty();
						if (data.length != 0) {
							var tmpData = data[page];
							for (var i=0; i<tmpData.length; i++) {
								var html = "";
								html += '<li id="industry_'+i+'" class="industryList" style="cursor:pointer;">';
								html += 	'<div class="rela">';
								html += 		'<div class="img"><img src="/img/tech/ico_listType01.png" /></div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">' + tmpData[i].complex_nm + '</p>';
								html += 			'<div style="height:5px;"></div>';
								html +=				'<table>';
								html += 			'<tr class="t02"><td class="td01">사업 시행자</td><td class="td02">' + tmpData[i].implementer_mgmt_inst + '</td></tr>';
								html += 			'<tr style="height:3px;"></tr>';
								html += 			'<tr class="t02"><td class="td01">위치</td><td class="td02">' + tmpData[i].lc + '</td></tr>';
								html += 			'<tr style="height:3px;"></tr>';
								html += 			'<tr class="t02"><td class="td01">유치업종</td><td class="td02">' + tmpData[i].mvn_biz + '</td></tr>';
								html += 			'<tr style="height:3px;"></tr>';
								html += 		'</div>';
								html += 	'</div>';
								html += '</li>';
								$(".industryLists").append(html);
							}
							
						}
					}
				});
			},
	
			
			/**
			 * 
			 * @name         : mapDataSetting
			 * @description  : 지도별 데이터 형식 세팅
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			mapDataSetting : function() {
				var tempObj = {};
				for(var i = 0; i < 3; i ++) {
					tempObj = {
							"options" : {},
							"type" : ""
					}
					this.mapData.push(tempObj);					
				}
			},
			
			/**
			 * 
			 * @name         : reDraw
			 * @description  : 데이터보드 다시 그리기 (지도 삭제, 보고있는 지도 변경일 경우)
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reDraw : function(map_id) {
				//데이터가 조회되지 않은 지도는 데이터보드를 열지 않음
				if (map_id != this.map_id) {
					if(this.mapData[map_id].options != "") {
						var sceneInx = $(".sceneBox.on").length;
						if(sceneInx > 1) {
							this.updateDataBoard(this.mapData[map_id].options, this.mapData[map_id].type);	
						}
					}
				}
			},
			
			/**
			 * @name		: initDataBoard
			 * @description	: 데이터보드 초기화
			 * @date		: 2016.11.22
			 * @author		: 김재상 
			*/
			initDataBoard : function(){
				$technicalBizDataBoard.event.dataBoardClose();
			},
			
			/**
			 * 
			 * @name         : updateDataBoard
			 * @description  : 데이터보드 업데이트
			 * @date         : 2016. 09. 29. 
			 * @author	     : 김재상
			 */
			updateDataBoard : function(options, type) {				
				//2016.04.14 주용민
				//버블 지도 시각화시 타 경계 클릭 막기
				$technicalBizLeftMenu.ui.curSelectedStatsType = type;
				//메모리에 저장
				this.options = options;
				this.map = options.params.map;
				this.map_id = options.params.map.id;
				this.mapData[this.map_id].type = type;
				
				//데이터보드의 조회조건은 여기에 모두 저장
				this.mapData[this.map_id].options = options;

				//데이터보드 조회조건이 undefined일 경우 초기화
				if(this.mapData[this.map_id].options.dataBoard == undefined) {
					this.mapData[this.map_id].options.dataBoard = {};
				}
				
				//보고서 차트정보 초기화
				this.chartDataList[options.params.map.id] = null;
				
				//데이터보드 열기
				$(".dataBoardDiv").show();
				var sceneInx = $(".sceneBox.on").length;
				if(sceneInx == 1) {
					$technicalBizDataBoard.event.dataBoardOpen();	
				}
				//2017.10.18 개발팀 case 추가
				switch(type){
					case "sido"		: this.initSido(options); break;		//시도별 기술업종현황
					case "sigungu"	: this.initSigungu(options); break;		//시군구별 기술업종현황
					case "density"	: this.initDensity(options); break;		//업종밀집도변화
					case "lq"		: this.initLqInfo(options); break;		//업종별 입지계수
					case "search"	: this.initSearchInfo(options); break;	//검색
					case "supply"	: this.initSupply(options); break;		//지원시설 조회
					case "industry"	: this.initIndustry(options); break; //산업단지 조회
				}
			},
			
			/**
			 * @name		: initSido
			 * @description	: 시도별 기술업종 현황
			 * @date		: 2016.09.29
			 * @author		: 김재상
			*/
			initSido : function(options){
				$(".dataBoardDiv").hide();
				$("#sidoDiv").show();
				
				//명칭
				$("#sidoDiv > .areaBox").html(options.params.adm_nm+" <span>"+companyDataYear+"</span>");
				$("#sidoDiv > .areaSpan").text(options.params.adm_nm);
				$("#sidoDiv >.txtSubj .admNm").text(options.params.adm_nm);
				
				this.changeSidoFeatureChart(1);				// 업종별 지역 특성정보(spider)
				this.changeSidoEconomyChart('sales', 0);	// 경제총조사 현황(bar)
				
			},
			
			/**
			 * @name		: initSigungu
			 * @description	: 시군구별 기술업종 현황
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			initSigungu : function(options){
				$(".dataBoardDiv").hide();
				$("#sigunguDiv").show();
				
				//명칭
				$("#sigunguDiv > .areaBox").html(options.params.adm_nm+" <span>"+companyDataYear+"</span>");
				$("#sigunguDiv > .areaSpan").text(options.params.adm_nm);
				$("#sigunguDiv > .txtSubj .admNm").text(options.params.adm_nm);
				
				this.changeSigunguClassCd(options.dataBoard.jobAreaThemeCd);
				
			},
			
			/**
			 * @name		: initDensity
			 * @description	: 업종 밀집도 변화
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			initDensity : function(options){
				$(".dataBoardDiv").hide();
				$("#densityDiv").show();
				
				// 성남시는 따로 처리
				if(options.params.adm_cd != undefined && ['31020', '31021', '31022', '31023'].indexOf(options.params.adm_cd.substring(0,5)) != -1){
					$(".specializedInfo").show();
				}else{
					$(".specializedInfo a").removeClass("on");
					$(".specializedInfo").hide();
				}
				
				var m_class_cd = "0";
				var s_class_cd = "0";
				if (options.dataBoard.themeCd == "00") {
					m_class_cd = "0"
				}else {
					m_class_cd = options.dataBoard.themeCd.substring(0,2);
					s_class_cd = options.dataBoard.themeCd;
				}
				
				/*if (options.dataBoard.themeCd.length == 2) {
					s_class_cd = "0";
				}*/
				
				this.changeDensityTab(m_class_cd, s_class_cd);
				
			},
			
			//2017.10.18 개발팀 추가
			/**
			 * @name		: initLqInfo
			 * @description	: 업종별 입지계수 조회
			 * @date		: 2017.10.18
			 * @author		: 최재영
			 */
			initLqInfo : function(options){
				$(".dataBoardDiv").hide();
				$("#technicalLqDiv").show();
				//입지계수 차트 생성
				
				$technicalBizDataBoard.ui.lqInfoDataBoardOpen(options);
				//년도별 입지계수 차트 생성
				if(options.adm_cd != "00"){
					//년도별 입지계수 차트 실행
					$technicalBizDataBoard.ui.lqInfoYearDataBoardGrid(options);
				}
			
			},
			
			/**
			 * @name		: changeLqInfo
			 * @description	: 업종별 입지계수 조회
			 * @date		: 2017.10.18
			 * @author		: 최재영
			 */
			changeLqInfo : function(themeCd){
				
				/*var menuType = {
						11		: "첨단기술",	//시도별 기술업종 현황
						12		: "고기술",	//시군구별 기술업종 현황
						13	 	: "중기술",	//업종밀집도 변화
						14		: "저기술",	//업종별 입지계수 지도			
						21		: "창의 및 디지털",	//조건별 지역찾기
						22 	 	: "ICT",	//지원시설 조회
						23		: "전문서비스",		//산업단지 조회
				};*/
				
				/*var themeNm = menuType[themeCd];*/
				var standard = "company";
				if($("#standardButton").hasClass("off")){
					standard = "worker";
				}
				
				
				$("#technicalDbTabs > a").removeClass("on");
				$("#technicalDbTab_"+themeCd.toString().substring(0,2)).addClass("on");
				
				if(themeCd.toString().length == 2){
					$technicalBizDataBoardApi.request.getInnerTechCd(themeCd.toString().substring(0,2),"subTechnicalList");
				}else{
					$("#subTechnicalList > li > a").removeClass("on");
					$("#subTechnicalList_"+themeCd+"> a").addClass("on");
				}
				
				if($("#technicalLqDivAreaBox").data("name") =="sido"){
					$technicalBizMap.ui.doReqAllLq(themeCd, '', "0", "country",standard);
				}else{
					var adm_cd = $("#technicalLqDivAreaBox").data("admcd");
					$technicalBizMap.ui.doGetSggLq(adm_cd, '', themeCd, null);
				}
				
			},
			
			
			/**
			 * @name		: lqInfoDataBoardOpen
			 * @description	: 업종별 입지계수 데이터보드 오픈
			 * @date		: 2017.10.19
			 * @author		: 최재영
			 */
			lqInfoDataBoardOpen : function(options){
				//options.adm_cd == 00 이면 sido 
				//5자리면 adm_cd 므로 sidoName 
				//이상이면  sigungu 
				
				$("#technicalLqDivAreaBox").data("classCd",options.selectThemeCd);
				
				//
				$("#lqInfoChartRela > .compareBox > .typeBox > a").eq(0).trigger("click");
				
				if(options.adm_cd == "00"){
					/*$("#lqInfoChartStandard").hide();*/
					$("#lqInfoChartStandardButton").hide();
					$("#technicalLqDivAreaBox").data("name","sido");
					$("#technicalLqDivAreaBox").data("admcd","00");
					$("#technicalLqDivAreaBox").html("전국 <span>" +options.year+"</span>" );
					
					/*$("#lqInfoTypeBox").css({"position":"absolute","top":"-11px","left":"465px","z-index":"1000","display":"block;"});*/
					/*$("#lqInfoLctChart_1 > .sTit").css({"top" : "0px"});*/
					/*$("#lqInfoTypeBox").css({"position":"absolute","top":"23px","left":"260px"});*/
				}else if(options.adm_cd.length == 5){
					/*$("#lqInfoChartStandard").show();*/
					$("#lqInfoChartStandardButton").show();
					$("#technicalLqDivAreaBox").data("name","sigungu");
					$("#technicalLqDivAreaBox").data("admcd",options.adm_cd.substring(0,2));
					$("#technicalLqDivAreaBox").html(options.featureData[0].sido_nm +" <span>"+options.year+"</span>" );

					var html = '<a href="javascript:$technicalBizMap.ui.changeLqInfoChart(\''+options.adm_cd.substring(0,2)+'\',\''+options.featureData[0].sido_nm+'\',\''+options.selectThemeCd+'\',\''+options.params.map.id+'\',\'country\');" class="on">전국 대비</a>';
					html +='<a href="javascript:$technicalBizMap.ui.changeLqInfoChart(\''+options.adm_cd.substring(0,2)+'\',\''+options.featureData[0].sido_nm+'\',\''+options.selectThemeCd+'\',\''+options.params.map.id+'\',\'sido\');"">'+options.featureData[0].sido_nm+'대비</a> '
					$("#lqInfoChartStandardButton").html(html);
					
					/*$("#lqInfoTypeBox").css({"position":"absolute","top":"2px","left":"2px"});*/
					/*$("#lqInfoLctChart_1 > .sTit").css({"top" : "45px"});*/
				}else{
					/*$("#lqInfoChartStandard").show();*/
					$("#lqInfoChartStandardButton").show();
					$("#technicalLqDivAreaBox").data("name","emdong");
					$("#technicalLqDivAreaBox").data("admcd",options.adm_cd.substring(0,5));
					$("#technicalLqDivAreaBox").html(options.featureData[0].sgg_nm + " <span>" +options.year+"</span>" );
					
					$("#technicalLqDivAreaBox").html(options.featureData[0].sido_nm +" <span>"+options.year+"</span>" );
					var html = '<a href="javascript:$technicalBizMap.ui.changeLqInfoChart(\''+options.adm_cd.substring(0,5)+'\',\''+options.featureData[0].sido_nm+'\',\''+options.selectThemeCd+'\',\''+options.params.map.id+'\',\'country\');" class="on">전국 대비</a>';
					html +='<a href="javascript:$technicalBizMap.ui.changeLqInfoChart(\''+options.adm_cd.substring(0,5)+'\',\''+options.featureData[0].sido_nm+'\',\''+options.selectThemeCd+'\',\''+options.params.map.id+'\',\'sido\');"">'+options.featureData[0].sido_nm+'대비</a> '
					$("#lqInfoChartStandardButton").html(html);
					/*$("#lqInfoTypeBox").css({"position":"absolute","top":"2px","left":"2px"});*/
					/*$("#lqInfoLctChart_1 > .sTit").css({"top" : "45px"});*/
				}

				if(options.base_region != "country"){
					$("#lqInfoChartStandardButton > a").eq(0).removeClass("on");
					$("#lqInfoChartStandardButton > a").eq(1).addClass("on");
				}
				
				
				var id = "#lqInfoLctChart";
				
				var featureData = options.featureData;
				
				$(id).highcharts({ 
			        chart: { type: 'bubble', plotBorderWidth: 1, zoomType : 'x' }, //2018.01.15 [개발팀] 줌기능 추가
			        legend: {enabled: false},
			        title: {text: ''},
			        subtitle: {text: ''},
			        xAxis: {
			            gridLineWidth: 1,
			            title: {text: '사업체 LQ'},
			            labels: {
			                format: '{value}'
			            },
			            plotLines: [{
			                color: 'red',
			                dashStyle: 'solid',
			                width: 2,
			                value: 1,
			                label: {
			                    rotation: 0,
			                    y: 15,
			                    style: {
			                        fontStyle: 'italic'
			                    },
			                    /*text: '종사자'*/
			                },
			                zIndex: 3
			            }]
			        },

			        yAxis: {
			            startOnTick: false,
			            endOnTick: false,
			            title: {
			                text: '종사자 LQ'
			            },
			            labels: {
			                format: '{value}'
			            },
			            maxPadding: 0.2,
			            plotLines: [{
			                color: 'red',
			                dashStyle: 'solid',
			                width: 2,
			                value: 1,
			                label: {
			                    align: 'right',
			                    style: {
			                        fontStyle: 'italic'
			                    },
			                    /*text: '사업체',*/
			                    x: -10
			                },
			                zIndex: 3
			            }]
			        },

			        tooltip: {
			        	//2018.01.22 [개발팀] 툴팁로직 변경
			        	shared : true,
			        	formatter: function () {
			                var x = this.point.x;
			                var y = this.point.y;
			                var html = "";
			                $.each(this.series.chart.series, function (i, serie) {
			                    $.each(serie.data, function (j, p) {
			                        if (p.x === x && p.y === y) {
			                        	html += '<table">';
			                        	html +=	'<tr>';
			                        	html += 	'<td><span style="color:'+p.color+'">●</span><span>'+p.name+':</span><span style="font-weight:bold;">사업체:'+p.x+' 종사자:'+p.y+'</span></td>';
			                        	html += '</tr>';
						                html += '</table>';
						                html += '<br/><br/>';
			                        }
			                    });
			                });
			                return html;
			            }
			        },

			        /*plotOptions: {
			            series: {
			                dataLabels: {
			                    enabled: true,
			                    format: '{point.name}'
			                }
			            }
			        },*/
			        plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}',
                                style:{
                                   color:"#000",
                                   textOutline : "0px"
                                }
                            }
                        }
                    },
			    });
				
				if(options.selectThemeCd.toString().length =="2"){
					$("#company_nm1").text(featureData[0].techbiz_m_class_cd_nm +" 업종은 ");
					$("#worker_nm1").text(featureData[0].techbiz_m_class_cd_nm +" 업종은 ");
				}else{
					$("#company_nm1").text(featureData[0].techbiz_s_class_cd_nm +" 업종은 ");
					$("#worker_nm1").text(featureData[0].techbiz_s_class_cd_nm +" 업종은 ");
				}
				
				var overCompanyArea = new Array();
				var overWorkerArea = new Array();
				
				var techClass = {
						11 : "c01",
						12 : "c02",
						13 : "c03",
						14 : "c04",
						21 : "c05",
						22 : "c06",
						23 : "c07"
				};
				
				var tableHtml = "<table class='pcTable02' id='lqInfoLctChartTable'>";
				tableHtml +="<tr class='th'><td class='addSideLine th'>업종명</td><td class='addSideLine th'>사업체 입지계수</td><td class='addSideLine th'>종사자 입지계수</td></tr>";
				
				
				for(var i = 0 ; i < featureData.length; i++){
					var country_vs_corp_lq = Number(featureData[i].country_vs_corp_lq);
					var country_vs_worker_lq = Number(featureData[i].country_vs_worker_lq);
					
					var sido_vs_corp_lq = Number(featureData[i].sido_vs_corp_lq);
					var sido_vs_worker_lq = Number(featureData[i].sido_vs_worker_lq);
					
					var adm_nm = featureData[i].adm_nm;
					if(options.base_region == "country"){
						
						var color = addSeries(id,country_vs_corp_lq,country_vs_worker_lq,adm_nm,"#ff0000");
						/*tableHtml +="<tr><td class='addSideLine' style='background : "+color+";border:1px solid #ccc;'><font color='#fff'>"+featureData[i].adm_nm+"</td><td class='addSideLine'>"+Number(country_vs_corp_lq)+"</td><td class='addSideLine'>"+Number(country_vs_worker_lq)+"</td></tr>";*/
						tableHtml +="<tr><td class='addSideLine'>"+featureData[i].adm_nm+"</td><td class='addSideLine'>"+Number(country_vs_corp_lq)+"</td><td class='addSideLine'>"+Number(country_vs_worker_lq)+"</td></tr>";
					
						//2018.01.15 [개발팀]
						if(country_vs_corp_lq >= 1){
							var obj = {
									name : adm_nm,
									val : country_vs_corp_lq
							}
							overCompanyArea.push(obj);
						}
						
						if(country_vs_worker_lq >= 1){
							var obj = {
									name : adm_nm,
									val : country_vs_worker_lq
							}
							overWorkerArea.push(obj);
						}
						
					}else{
						
						var color = addSeries(id,sido_vs_corp_lq,sido_vs_worker_lq,adm_nm,"#ff0000");
						tableHtml +="<tr><td class='addSideLine'>"+featureData[i].adm_nm+"</td><td class='addSideLine'>"+Number(sido_vs_corp_lq)+"</td><td class='addSideLine'>"+Number(sido_vs_worker_lq)+"</td></tr>";
						
						//2018.01.15 [개발팀]
						if(sido_vs_corp_lq >= 1){
							var obj = {
									name : adm_nm,
									val : sido_vs_corp_lq
							}
							overCompanyArea.push(obj);
						}
						
						if(sido_vs_worker_lq >= 1){
							var obj = {
									name : adm_nm,
									val : sido_vs_corp_lq
							}
							overWorkerArea.push(obj);
						}
					}
					
				}
				tableHtml +="</table>";
				$("#lqInfoLctChart_2").html(tableHtml);
				
				//2018.01.15 [개발팀] 테이블 정렬추가
				$technicalBizDataBoard.util.tableSortable("#lqInfoLctChartTable");

				//2018.01.18 [개발팀]
				//버블차트 라이브러리 버그 대응
				setTimeout(function() {
					var charts = $(id).highcharts();
					charts.zoom();
				},100);
				
				$("#company_nm2").empty();
				$("#worker_nm2").empty();
				/*$("#company_nm2").text(overCompanyArea.toString());
				$("#worker_nm2").text(overWorkerArea.toString());*/
				lctArrayWrite(overCompanyArea,"company_nm2");
				lctArrayWrite(overWorkerArea,"worker_nm2");
				/*$("#company_nm3").text("순으로 전국 기준 이상으로 분포 하고 있음");
				$("#worker_nm3").text("순으로 전국 기준 이상으로 분포 하고 있음");*/
				
				//2017.09.05 개발팀 추가
				function addSeries(id,company_lct,worker_lct,nameVal,colorVal){
					var xVal = company_lct;
					var yVal = worker_lct;
					var charts = $(id).highcharts();
					
					if(id == "#lqInfoLctChart"){
						charts.addSeries({
							data :[{x :xVal, y :yVal, z:10, name : nameVal }],
							/*색상랜덤 변경*/
							/*color : colorVal*/
						});
						return charts.series[charts.series.length-1].color;
					}else{
						charts.addSeries({
							data :[{x :xVal, y :yVal, z:50, name : nameVal }],
							color : colorVal
						});
					}
				}
				
				function lctArrayWrite(lctList , id){
					var parent = $("#"+id).parent();
					parent.css("line-height", "");
					parent.css("height", "");
					
					lctList.sort(function(a,b){
						/*return a["val"] -b["val"];*/
						return b["val"] -a["val"];
					});
					
					lctList.sort();
					for(var i = 0 ; i < lctList.length; i ++){
						var oriText = $("#"+id).text();
						var appendText = "";
						if(oriText != ""){
							appendText = ", ";
						}
						appendText += lctList[i].name;
						$("#"+id).append(appendText);
					}
					
					if(lctList.length == 0){
						$("#"+id+"_append").html(" 초과 하는 지역이 존재 하지 않습니다.");
					}else{
						//업종이 전국과 비교하여 집적도가 높음
						$("#"+id+"_append").html(" 지역의 집적도가 높음");
					}
					
					if (parent.height() < 25) {
						parent.css({
							"line-height" : "40px",
							"height" : "auto" //2018.01.15 [개발팀]
						});
					}else {
						parent.css({
							"line-height" : "20px",
							"height" : "auto" //2018.01.15 [개발팀]
						});
					}
					
				}
				//2017.09.05 개발팀 추가 종료
				
				$("#btnList_1 > ul > li").eq(4).show();
				
				$technicalBizDataBoard.ui.setReportData(
						"lq", 
						"lqInfoLctChart", 
						featureData, 
						options.params.map.id);
				
				//입지계수 리포트  
				var map = options.params.map;
				options.url = "/ServiceAPI/technicalBiz/getRegionLq.json";
				
				//base_year
				//techbiz_class_cd
				//lower_search
				
				var lower_searchValue = 1;
				if(options.adm_cd.length > 5){
					lower_searchValue = 0;
				}
				//themeCd,themeNm,type,base_region,year,map,standard,callback
				//openApiGetAllLq , openApiGetSggLq
				var type = "company"
				if ($("#standardButton").hasClass("off")) {
					type = "worker";
					
				}
				
				var shareInfoOption = {
						url : "/ServiceAPI/technicalBiz/getRegionLq.json",
						map : map,
						params : {
							adm_cd : options.adm_cd.toString(),
							base_region : options.base_region,
							techbiz_class_cd : options.selectThemeCd.toString(),
							lower_search : lower_searchValue,
							year : options.year,
							standard : type,
							
						}
						
				};
				map.shareInfo.setTechnicalBizShareInfo(shareInfoOption,"lq",map.id);
				
				
			},
			
			
			/**
			 * @name		: lqInfoYearDataBoardGrid
			 * @description	: 업종별 년도 입지계수 데이터보드 오픈
			 * @date		: 2017.10.20
			 * @author		: 최재영
			 */
			lqInfoYearDataBoardGrid : function(options){
				
				$("#lqIncreaseTab").show();
				var id = "#lqColumCharts02";
				$(id).highcharts({
					chart: { zoomType: 'xy' },
			        colors: ['#9dc3e6', '#ff6969', '#00b0f0', '#c00000'],
			        title: { text: '' },
			        subtitle: {
			            text: ''
			        },
			        xAxis: [{
			            crosshair: true
			        }],
			        yAxis: [{ // Secondary yAxis
			            title: {
			                text: ''
			            },
			            labels: {
			            	enabled : false 
			            }
			        }],
			        tooltip: {
			            shared: true
			        },
			        legend: {
			        	enabled : false
			        },
			        series: []
			    });
				var pAdmCd = options.adm_cd;
				if(pAdmCd.length == "5"){
					pAdmCd = pAdmCd.substring(0,2);
					var paramOption = {
							adm_cd : pAdmCd,
							/*techiBiz_class_cd : options.featureData[0].techbiz_m_class_cd,*/
							techiBiz_class_cd : options.selectThemeCd,
					};
					
					//options.featureData[0].techbiz_m_class_cd
					//standard 설정
					//id 넣어주고
					//상위 호출
					//http://localhost:8080/ServiceAPI/technicalBiz/getRegionLq.json?techbiz_class_cd=11&lower_search=0&adm_cd=25
					$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(paramOption,'0',null);
					
				}else{
					//읍면동의 경우 해당 시군구의 데이터와 해당하는 읍면동 데이터가 나와야한다.
					var oriAdmCd = pAdmCd.substring(0,2);
					var oriParamOption = {
							adm_cd : oriAdmCd,
							/*techiBiz_class_cd : options.featureData[0].techbiz_m_class_cd*/
							techiBiz_class_cd : options.selectThemeCd
					}
					pAdmCd = pAdmCd.substring(0,5);
					var paramOption = {
							adm_cd : pAdmCd,
							/*techiBiz_class_cd : options.featureData[0].techbiz_m_class_cd*/
							techiBiz_class_cd : options.selectThemeCd
					};
					$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(oriParamOption,'0',$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(paramOption,'0',null));
					/*$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(paramOption,'0','1');*/
				}
				
				
				
				
				
				
				//하위 호출
				//http://localhost:8080/ServiceAPI/technicalBiz/getRegionLq.json?techbiz_class_cd=11&lower_search=1&adm_cd=25
				//$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(paramOption,'1');
			},
			
			/**
			 * @name		: changeLqInfoYearDataBoardGrid
			 * @description	: 업종별 년도 입지계수 데이터보드 변경
			 * @date		: 2017.10.23
			 * @author		: 최재영
			 */
			changeLqInfoYearDataBoardGrid : function(techiBiz_class_cd){
				
				$("#technicalYearDbTabs > a").removeClass("on");
				$("#technicalYearDbTab_"+techiBiz_class_cd.toString().substring(0,2)).addClass("on");
				if(techiBiz_class_cd.toString().length == 2){
					$technicalBizDataBoardApi.request.getInnerTechCd(techiBiz_class_cd.toString().substring(0,2),"subTechnicalYearList");
				}else{
					$("#subTechnicalYearList > li > a").removeClass("on");
					$("#subTechnicalYearList_"+techiBiz_class_cd + " > a").addClass("on");
				}
				var id = "#lqColumCharts02";
				$(id).highcharts({
					chart: { zoomType: 'xy' },
			        colors: ['#9dc3e6', '#ff6969'],
			        title: { text: '' },
			        subtitle: {
			            text: ''
			        },
			        xAxis: [{
			            crosshair: true
			        }],
			        yAxis: [{ // Secondary yAxis
			            title: {
			                text: ''
			            },
			            labels: {
			            	enabled : false 
			            }
			        }],
			        tooltip: {
			            shared: true
			        },
			        legend: {
			        	enabled : false
			        },
			        series: []
			    });
				
				var pAdmCd = $("#technicalLqDivAreaBox").data("admcd");
				
				if(pAdmCd.length == 2){
					var paramOption = {
							adm_cd : pAdmCd,
							techiBiz_class_cd : techiBiz_class_cd,
					};
					
					$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(paramOption,'0',null);
					
				}else{
					var oriAdmCd = pAdmCd.substring(0,2);
					var oriParamOption = {
							adm_cd : oriAdmCd,
							techiBiz_class_cd : techiBiz_class_cd
					}
					pAdmCd = pAdmCd.substring(0,5);
					var paramOption = {
							adm_cd : pAdmCd,
							techiBiz_class_cd : techiBiz_class_cd
					};
					
					$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(oriParamOption,'0',$technicalBizDataBoardApi.request.lqInfoYearDataBoardGrid(paramOption,'0',null));
				}
			},
			
			
			/**
			 * @name		: changeLqInfoYearDataBoard
			 * @description	: 입지계수 데이터 보드 년도 변겯
			 * @date		: 2017.10.23
			 * @author		: 최재영
			 */
			changeLqInfoYearDataBoard : function(year){
				 var techiBiz_class_cd = $("#technicalLqDivAreaBox").data("classCd");
				 
				 $("#lqInfoYearSettingList > li > a").removeClass("on")
				 $("#lqInfoYear_"+year +" > a").addClass("on");
				 var adm_cd = $("#technicalLqDivAreaBox").data("admcd");
				 var techbiz_m_class_cd = $("#technicalLqDivAreaBox").data("classCd");
				 
				 var standard = "company";
				 if($("#standardButton").hasClass("off")){
					 standard = "worker";
				 }
				 if(adm_cd == "00"){
					$technicalBizMap.ui.doReqAllLq(techbiz_m_class_cd,'','0','country',standard);
				 }else{
					 $technicalBizMap.ui.doGetSggLq(adm_cd,'',techbiz_m_class_cd,null);
				 }
				 
				
				 
			},
			
			/**
			 * @name		: lqColumnHide
			 * @description	: 입지계수 데이터 보드 년도 변겯
			 * @date		: 2017.10.24
			 * @author		: 최재영
			 */
			lqColumnHide : function(hideIdx1,hideIdx2){
				var chart = $("#lqColumCharts02").highcharts();
				
				var series1 = chart.series[hideIdx1];
				var series2 = chart.series[hideIdx2]; 
				
				 if (series1.visible) {
				        series1.hide();
				        series2.hide();
				        $("#ckbtn_"+hideIdx1).removeClass("on");
				    } else {
				    	series1.show();
				        series2.show();
				        $("#ckbtn_"+hideIdx1).addClass("on");
				    }
				 
				
			},
			
			//2017.10.18 개발팀 추가 종료
			
			//2017.10.30 개발팀 추가
			/**
			 * @name		: initSearchInfo
			 * @description	: 검색 데이터보드 오픈
			 * @date		: 2017.10.30
			 * @author		: 최재영
			 */
			initSearchInfo : function(options){
				$(".dataBoardDiv").hide();
				$("#technicalSearch").show();
				
				var dataArray = options.dataArray;
				var param = options.standardOption;
				
				$technicalBizDataBoard.ui.searchOption = param;
				$technicalBizDataBoard.ui.searchDataArray = dataArray;
				
				$("#searchTechBizCheckBoxList > a").addClass("on");
				
				if(options.standardOption.techbiz_class_cd == "00"){
					$("#searchTechBizCheckBoxList > a").show();
				}else{
					$("#searchTechBizCheckBoxList > a").hide();
				}
				
				this.initSearchStandardGridInfo();
				this.initSearchGridTechBizSggGridInfo();
				
				param.idx = 0;
				var reportData = {
						dataArray : dataArray,
						param : param,
				};
				
				$technicalBizDataBoard.ui.setReportData(
						"search", 
						"", 
						reportData, 
						options.params.map.id);
				
				var searchOption = {
						is_contain_bizfac : param.is_contain_bizfac,
						is_contain_induscom : param.is_contain_induscom,
						from_corp_lq : param.param.from_corp_lq,
						from_worker_lq : param.param.from_worker_lq,
						to_corp_lq : param.param.to_corp_lq,
						to_worker_lq : param.param.to_worker_lq,
						selectInfoType : param.selectInfoType,
						techbiz_class_cd : param.techbiz_class_cd,
						option1 : param.option1,
						option2 : param.option2,
				};
				
				
				var shareInfoOption = {
						url : "/ServiceAPI/technicalBiz/getRegionLq.json",
						map : options.params.map,
						params : {
							searchOption : searchOption,
							idx : 0
						}
				};
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				map.shareInfo.setTechnicalBizShareInfo(shareInfoOption,"search",options.params.map.id);

				
				
				if(param.afterSelectTabl != undefined){
					
					switch(param.afterSelectTabl){
						case 0 :$technicalBizDataBoard.ui.initSearchGridTechBizSggGridInfo(); break;
						case 1 :$technicalBizDataBoard.ui.initSearchGridTechBizCorpGraph(); break;
						case 2 :$technicalBizDataBoard.ui.initSearchGridTechBizWorkerGraph(); break;
						case 3 :$technicalBizDataBoard.ui.initSearchGridSupplyInfo(); break;
						case 4 :$technicalBizDataBoard.ui.initSearchGridIndustry(); break;
					}
				}

				if(param.afterCheckBox != undefined){
					if(param.techbiz_class_cd == "00"){
						
						var checkBoxLists = $("#searchTechBizCheckBoxList > a");
						var unCheckList = new Array();
						for(var i = 0 ; i < checkBoxLists.length; i++){
							var checkAble = false;
							
							for(var j = 0; j < param.afterCheckBox.length; j++){
								if(i == param.afterCheckBox[j]){
									checkAble = true;
								}
								
							}
							if(checkAble == false){
								unCheckList.push(i)
							}
							
						}
						for(var i = 0; i < unCheckList.length; i++){
							$technicalBizDataBoard.ui.searchCheckBoxChange(unCheckList[i]);
						}
						
					}
					
				}
				
				
				

				
				//조건 설정 목록
				//techbiz_class_cd 업종선택
				//selectInfoType
				//is_contain_bizfac
				//is_contain_induscom
				//option1
				//option2
				//param : from_corp_lq
				//		  to_corp_lq
				//		  from_worker_lq
				//		  to_worker_lq
				
				
				//비교지역 목록
				//dataArray adm_cd , adm_nm , techBizArray
				
			},
			
			/**
			 * @name		: searchCheckBoxChange
			 * @description	: 체크박스 변경시 이벤트
			 * @date		: 2017.10.30
			 * @author		: 최재영
			 */
			searchCheckBoxChange : function(idx){
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				var techCd = {
						0 : "11",
						1 : "12",
						2 : "13",
						3 : "14",
						4 : "21",
						5 : "22",
						6 : "23"
				};
				
				
				if(param.techbiz_class_cd == "00"){
					if($("#searchTechBizCheckBoxList > a").eq(idx).hasClass("on")){
						$("#searchTechBizCheckBoxList > a").eq(idx).removeClass("on")
					}else{
						$("#searchTechBizCheckBoxList > a").eq(idx).addClass("on")
					}
					this.initSearchCheckBoxChange();
				}
			},
			
			/**
			 * @name		: searchTabBoxChange
			 * @description	: 체크박스 변경시 이벤트
			 * @date		: 2017.10.30
			 * @author		: 최재영
			 */
			searchTabBoxChange : function(idx){
				if($("#searchTechBizCheckBoxList > a").eq(idx).is(':visible')){
					this.searchCheckBoxChange(idx);
				}
				
			},
			
			/**
			 * @name		: initSearchStandardGridInfo
			 * @description	: 조건 설정 목록 표출
			 * @date		: 2017.10.30
			 * @author		: 최재영
			 */
			initSearchStandardGridInfo : function(){
				var option = $technicalBizDataBoard.ui.searchOption;
				var html = "";
				var techNm = {
						11 : "첨단기술",
						12 : "고기술",
						13 : "중기술",
						14 : "저기술",
						21 : "창의 및 디지털",
						22 : "ICT",
						23 : "전문서비스"
						
				}
				
				html += '<a href="javascript:void(0)">';
				html += 	'<span class="t01">업종선택</span>';
				if(option.techbiz_class_cd == "00"){
					html += 	'<span class="t02">기술업종 전체</span>';
				}else{
					html += 	'<span class="t02">'+techNm[option.techbiz_class_cd]+'</span>';
				}
				
				html += '</a>';
				
				if(option.selectInfoType == "lq"){
					html += '<a href="javascript:void(0)">';
					html += 	'<span class="t01">사업체 입지계수</span>';
					if(option.option1 == true){
						html += 	'<span class="t02">'+option.param.from_corp_lq + "~" +option.param.to_corp_lq+'</span>';	
					}else{
						html += 	'<span class="t02">미선택</span>';
					}
					html += '</a>';
					html += '<a href="javascript:void(0)">';
					html += 	'<span class="t01">종사자 입지계수</span>';
					if(option.option2 == true){
						html += 	'<span class="t02">'+option.param.from_worker_lq + "~" +option.param.to_worker_lq+'</span>';	
					}else{
						html += 	'<span class="t02">미선택</span>';
					}
					
					html += '</a>';
				}else{
					html += '<a href="javascript:void(0)">';
					html += 	'<span class="t01">사업체 증감률</span>';
					if(option.option1 == true){
						html += 	'<span class="t02">'+option.param.from_corp_lq + "~" +option.param.to_corp_lq+'</span>';	
					}else{
						html += 	'<span class="t02">미선택</span>';
					}
					html += '</a>';
					html += '<a href="javascript:void(0)">';
					html += 	'<span class="t01">종사자 증감률</span>';
					if(option.option2 == true){
						html += 	'<span class="t02">'+option.param.from_worker_lq + "~" +option.param.to_worker_lq+'</span>';	
					}else{
						html += 	'<span class="t02">미선택</span>';
					}
					
					html += '</a>';
				}
				
					
				html += '<a href="javascript:void(0)">';
				html += 	'<span class="t01">창업  지원시설</span>';
				if(option.is_contain_induscom){
					html += 	'<span class="t02">포함</span>';
					}else{
					html += 	'<span class="t02">미포함</span>';
				}
				html += '</a>';
				html += '<a href="javascript:void(0)">';
				html += 	'<span class="t01">산업단지</span>';
				if(option.is_contain_bizfac){
					html += 	'<span class="t02">포함</span>';
				}else{
					html += 	'<span class="t02">미포함</span>';
				}
				
				html += '</a>';
				
				$("#technicalSearcParamInfo").html(html);
			},
			
			/**
			 * @name		: initSearchGridTechBizSggGridInfo
			 * @description	: 조건 설정 목록 표출
			 * @date		: 2017.10.30
			 * @author		: 최재영
			 */
			initSearchGridTechBizSggGridInfo : function(){
				
				$("#techbizSearchTabList > a").removeClass("on");
				$("#techbizSearchTabList > a").eq(0).addClass("on");
				
				
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				var techIndex = {
						11 : 0,
						12 : 1,
						13 : 2,
						14 : 3,
						21 : 4,
						22 : 5,
						23 : 6
				};
				
				var techNm = {
						11 : "첨",
						12 : "고",
						13 : "중",
						14 : "저",
						21 : "창",
						22 : "ICT",
						23 : "서"
				}
				
				var techClass = {
						11 : "b01",
						12 : "b02",
						13 : "b03",
						14 : "b04",
						21 : "b05",
						22 : "b06",
						23 : "b07"
				};
				$("#techBizSggCount").html("총 " +dataArray.length+ " 개 시군구 검색 완료");
				var html ="";
				for(var i = 0; i < dataArray.length; i++){					
					var admNm = dataArray[i].adm_nm;
					
					if(admNm == undefined){
						admNm = dataArray[i].sido_nm + " " +  dataArray[i].sgg_nm;
					}
					admNm = admNm.split(" ");
					
					var admStr = admNm[0];
					for(var j = 1; j < admNm.length; j++){
						admStr += "<br>" + admNm[j];
					}
					//admNm.length
					var lineHeight = 20;
					if(admNm.length > 2){
						lineHeight = 15;
					}
					html +="<li>";
					html +=		'<div class="rela">';
					/*html +=			'<span class="tit">'+dataArray[i].adm_nm+'</span>';*/
					html +=			'<span class="tit"style="line-height:'+lineHeight+'px;">'+admStr+'</span>';
					html +=			'<div class="sikunBox">';
					for(var j = 0; j < dataArray[i].techBiz.length; j++){
						html += 		'<span class="'+techClass[dataArray[i].techBiz[j]] +'">'+techNm[dataArray[i].techBiz[j]]+'</span>';
					}
					html +=			'</div>';
					html +=			'<a href="javascript:$technicalBizDataBoard.ui.searchDetailArea(\''+dataArray[i].adm_cd+'\',\''+dataArray[i].adm_nm+'\')">상세정보</a>';
					html +=		'</div>';
					html +="</li>";
				}
				
				$("#techBizSggGridTable").html(html);
				
				
				this.initSearchCheckBoxChange();
				
			},
			//2017.10.30 개발팀 추가 종료
			
			//2017.11.01 개발팀 추가
			/**
			 * @name		: initSearchGridTechBizCorpGraph
			 * @description	: 사업체 입지계수 그래프
			 * @date		: 2017.11.01
			 * @author		: 최재영
			 */
			initSearchGridTechBizCorpGraph : function(){
				
				$("#techbizSearchTabList > a").removeClass("on");
				$("#techbizSearchTabList > a").eq(1).addClass("on");
				
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				var techIndex = {
						11 : 0,
						12 : 1,
						13 : 2,
						14 : 3,
						21 : 4,
						22 : 5,
						23 : 6
				};
				
				var colorList = {
						"11" : "#ef356b",	//첨단기술
						"12" : "#f79339",	//고기술
						"13" : "#f7cb00",	//중기술
						"14" : "#b2cc19",	//저기술
						"21" : "#1778cc",	//창의 및 디지털				
						"22" : "#5b3fb2",	//ICT
						"23" : "#000000"	//전문서비스
				};
				
				var techNm = {
						11 : "첨단기술",
						12 : "고기술",
						13 : "중기술",
						14 : "저기술",
						21 : "창의 및 디지털",
						22 : "ICT",
						23 : "전문서비스업종"
				};
				
				
				$("#techBizSggGridTable").html('');
				for(var i = 0; i < dataArray.length; i++){
					var html ="";
					html += "<li>";
					html +=		"<div class='chartSize02 auto' id='corpGraph_"+i+"'>"
					html +=		"</div>"
					html += "</li>";
					$("#techBizSggGridTable").append(html);
					var categories = new Array();
					var values = new Array();
					var colors = new Array();
					for(var j = 0; j <dataArray[i].techBiz.length; j++){
						
						var checkIndex = techIndex[dataArray[i].techBiz[j]];
						
						if($("#searchTechBizCheckBoxList > a").eq(checkIndex).hasClass("on")){
							categories.push(techNm[dataArray[i].techBiz[j]]);
							values.push(Number(dataArray[i].country_vs_corp_lq[j]));
							colors.push(colorList[dataArray[i].techBiz[j]]);
						}
						//techBiz
						//country_vs_corp_lq
						//country_vs_worker_lq
						/*categories.push(techNm[dataArray[i].techBiz[j]]);
						values.push(Number(dataArray[i].country_vs_corp_lq[j]));
						colors.push(colorList[dataArray[i].techBiz[j]]);*/
					}
					
					makeCorpGraph("corpGraph_"+i,dataArray[i].adm_nm,categories,values,colors);
					
					/*if(values.length == 0){
						$("#techBizSggGridTable > li").eq(i).hide();
					}else{
						$("#techBizSggGridTable > li").eq(i).show();
					}*/
				}
				
				function makeCorpGraph(id,adm_nm,categories,values,colors){
					var titleXLen = adm_nm.split(" ");
					var titleXVal = -40;
					if(titleXLen.length == 2){
						titleXVal = -40;
					}else if(titleXLen.length == 3){
						titleXVal = -25;
					}else{
						titleXVal = -40;
					}
					
					$("#"+id).highcharts({
				        chart: {
				            type: 'bar', width:500, height:75, margin:[0,0,0,100]
				        },
				        colors: colors,
				        tooltip: { enabled: true },
				        title: { text: '' },
				        subtitle: { text: '' },
				        xAxis: {
				        	   categories: categories,
					           /*title: { text: adm_nm,  x:-40, y:0, offset:0, rotation: 0 },*/
				        	   title: { text: adm_nm,  x:titleXVal, y:0, offset:0, rotation: 0 },
					           labels: { x:-30 ,enabled: false}
				        },
				        yAxis: {
				            min: 0, title: { text: '', align: 'left' },
				            labels: { overflow: 'justify', enabled: false },
				            max : 2
				        }, 
				        plotOptions: { 
				        	bar: {
				                dataLabels: { enabled: false }
				            }
				        },
				        legend: { enabled: false },
				        credits: {  enabled: false },
				        series: [
				            {
				            	pointWidth: 15,
				            	colorByPoint: true,
				            	name: adm_nm,
				            	data: values
				        	}
				        ]
				    });
				}
			},
			
			/**
			 * @name		: initSearchGridTechBizWorkerGraph
			 * @description	: 사업체 입지계수 그래프
			 * @date		: 2017.11.01
			 * @author		: 최재영
			 */
			initSearchGridTechBizWorkerGraph : function(){
				$("#techbizSearchTabList > a").removeClass("on");
				$("#techbizSearchTabList > a").eq(2).addClass("on");
				
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				var techIndex = {
						11 : 0,
						12 : 1,
						13 : 2,
						14 : 3,
						21 : 4,
						22 : 5,
						23 : 6
				};
				
				var colorList = {
						"11" : "#ef356b",	//첨단기술
						"12" : "#f79339",	//고기술
						"13" : "#f7cb00",	//중기술
						"14" : "#b2cc19",	//저기술
						"21" : "#1778cc",	//창의 및 디지털				
						"22" : "#5b3fb2",	//ICT
						"23" : "#000000"	//전문서비스
				};
				
				var techNm = {
						11 : "첨단기술",
						12 : "고기술",
						13 : "중기술",
						14 : "저기술",
						21 : "창의 및 디지털",
						22 : "ICT",
						23 : "전문서비스업종"
				};
				
				
				$("#techBizSggGridTable").html('');
				for(var i = 0; i < dataArray.length; i++){
					var html ="";
					html += "<li>";
					html +=		"<div class='chartSize02 auto' id='corpGraph_"+i+"'>"
					html +=		"</div>"
					html += "</li>";
					$("#techBizSggGridTable").append(html);
					var categories = new Array();
					var values = new Array();
					var colors = new Array();
					for(var j = 0; j <dataArray[i].techBiz.length; j++){
						var checkIndex = techIndex[dataArray[i].techBiz[j]];
						if($("#searchTechBizCheckBoxList > a").eq(checkIndex).hasClass("on")){
							categories.push(techNm[dataArray[i].techBiz[j]]);
							values.push(Number(dataArray[i].country_vs_worker_lq[j]));
							colors.push(colorList[dataArray[i].techBiz[j]]);
						}
						//techBiz
						//country_vs_corp_lq
						//country_vs_worker_lq
						/*categories.push(techNm[dataArray[i].techBiz[j]]);
						values.push(Number(dataArray[i].country_vs_worker_lq[j]));
						colors.push(colorList[dataArray[i].techBiz[j]]);*/
					}
					makeWorkerGraph("corpGraph_"+i,dataArray[i].adm_nm,categories,values,colors);
					/*if(values.length == 0){
						$("#techBizSggGridTable > li").eq(i).hide();
					}else{
						$("#techBizSggGridTable > li").eq(i).show();
					}*/
				}
				
				function makeWorkerGraph(id,adm_nm,categories,values,colors){
					var titleXLen = adm_nm.split(" ");
					var titleXVal = -40;
					if(titleXLen.length == 2){
						titleXVal = -40;
					}else if(titleXLen.length == 3){
						titleXVal = -25;
					}else{
						titleXVal = -40;
					}
					
					$("#"+id).highcharts({
				        chart: {
				        	type: 'bar', width:500, height:75, margin:[0,0,0,100]
				        },
				        colors: colors,
				        tooltip: { enabled: true },
				        title: { text: '' },
				        subtitle: { text: '' },
				        xAxis: {
				        	categories: categories,
					           title: { text: adm_nm,  x:titleXVal, y:0, offset:0, rotation: 0 },
					           labels: { x:-30 ,enabled: false}
				        },
				        yAxis: {
				            min: 0, title: { text: '', align: 'left' },
				            labels: { overflow: 'justify', enabled: false },
				            max : 2
				        }, 
				        plotOptions: { 
				        	bar: {
				                dataLabels: { enabled: false }
				            }
				        },
				        legend: { enabled: false },
				        credits: {  enabled: false },
				        series: [
				            {
				            	pointWidth: 15,
				            	colorByPoint: true,
				            	name: adm_nm,
				            	data: values
				        	}
				        ]
				    });
				}
			},
			
			/**
			 * @name		: initSearchGridSupplyInfo
			 * @description	: 창업지원시설 정보
			 * @date		: 2017.11.01
			 * @author		: 최재영
			 */
			initSearchGridSupplyInfo : function(){
				$("#techbizSearchTabList > a").removeClass("on");
				$("#techbizSearchTabList > a").eq(3).addClass("on");
				
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				//bizfac_cnt
				$("#techBizSggGridTable").html('');
				for(var i = 0; i < dataArray.length; i++){
					var html ="";
					html += "<li>";
					html +=		"<div class='chartSize02 auto' id='corpGraph_"+i+"'>"
					html +=		"</div>"
					html += "</li>";
					$("#techBizSggGridTable").append(html);
					makeSupplyGraph('corpGraph_'+i ,dataArray[i].adm_nm,dataArray[i].bizfac_cnt )
				}				
				
				
				function makeSupplyGraph(id,adm_nm,values){
					var titleXLen = adm_nm.split(" ");
					var titleXVal = -40;
					if(titleXLen.length == 2){
						titleXVal = -40;
					}else if(titleXLen.length == 3){
						titleXVal = -25;
					}else{
						titleXVal = -40;
					}
					
					$("#"+id).highcharts({
				        chart: {
				        	type: 'bar', width:500, height:75, margin:[0,0,0,100]
				        },
				        colors: ['#1778cc'],
				        tooltip: { enabled: true },
				        title: { text: '' },
				        subtitle: { text: '' },
				        xAxis: {
				        	categories: ["창업지원시설"],
					           title: { text: adm_nm,  x:titleXVal, y:0, offset:0, rotation: 0 },
					           labels: { x:-30 ,enabled: false}
				        },
				        yAxis: {
				            min: 0, title: { text: '', align: 'left' },
				            labels: { overflow: 'justify', enabled: false },
				            max : 40
				        }, 
				        plotOptions: { 
				        	bar: {
				                dataLabels: { enabled: false }
				            }
				        },
				        legend: { enabled: false },
				        credits: {  enabled: false },
				        series: [
				            {
				            	pointWidth: 15,
				            	colorByPoint: true,
				            	name: adm_nm,
				            	data: [values]
				        	}
				        ]
				    });
				}
				
			},
			
			
			/**
			 * @name		: initSearchGridIndustry
			 * @description	: 산업단지 정보
			 * @date		: 2017.11.01
			 * @author		: 최재영
			 */
			initSearchGridIndustry : function(){
				$("#techbizSearchTabList > a").removeClass("on");
				$("#techbizSearchTabList > a").eq(4).addClass("on");
				
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				//induscom_cnt
				$("#techBizSggGridTable").html('');
				for(var i = 0; i < dataArray.length; i++){
					var html ="";
					html += "<li>";
					html +=		"<div class='chartSize02 auto' id='corpGraph_"+i+"'>"
					html +=		"</div>"
					html += "</li>";
					$("#techBizSggGridTable").append(html);
					makeSupplyGraph('corpGraph_'+i ,dataArray[i].adm_nm,dataArray[i].induscom_cnt )
				}
				
				function makeSupplyGraph(id,adm_nm,values){
					var titleXLen = adm_nm.split(" ");
					var titleXVal = -40;
					if(titleXLen.length == 2){
						titleXVal = -40;
					}else if(titleXLen.length == 3){
						titleXVal = -25;
					}else{
						titleXVal = -40;
					}
					
					$("#"+id).highcharts({
				        chart: {
				        	type: 'bar', width:500, height:75, margin:[0,0,0,100]
				        },
				        colors: ['#1778cc'],
				        tooltip: { enabled: true },
				        title: { text: '' },
				        subtitle: { text: '' },
				        xAxis: {
				        	categories: ["산업단지"],
					           title: { text: adm_nm,  x:titleXVal, y:0, offset:0, rotation: 0 },
					           labels: { x:-30 ,enabled: false}
				        },
				        yAxis: {
				            min: 0, title: { text: '', align: 'left' },
				            labels: { overflow: 'justify', enabled: false },
				            max : 40
				        }, 
				        plotOptions: { 
				        	bar: {
				                dataLabels: { enabled: false }
				            }
				        },
				        legend: { enabled: false },
				        credits: {  enabled: false },
				        series: [
				            {
				            	pointWidth: 15,
				            	colorByPoint: true,
				            	name: adm_nm,
				            	data: [values]
				        	}
				        ]
				    });
				}
			},
			
			/**
			 * @name		: initSearchCheckBoxChange 
			 * @description	: 체크박스 클릭시 지도 데이터 변경
			 * @date		: 2017.11.01
			 * @author		: 최재영
			 */
			initSearchCheckBoxChange : function(){
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				var checkBoxList = $("#searchTechBizCheckBoxList > a");
				
				var techIndex = {
						0 : "11",
						1 : "12",
						2 : "13",
						3 : "14",
						4 : "21",
						5 : "22",
						6 : "23"
				};
				
				
				var dataBoardTechCode = {
						0 : "b01",
						1 : "b02",
						2 : "b03",
						3 : "b04",
						4 : "b05",
						5 : "b06",
						6 : "b07"
				}
				
				var checkTechBizList = new Array();
				for(var i = 0; i < checkBoxList.length ; i ++){
					if($(checkBoxList[i]).hasClass("on")){
						checkTechBizList.push(techIndex[i]);
						//dataBoard 있는거 보여주기
						$(".sikunBox > ." + dataBoardTechCode[i]).show();
					}else{
						//dataBoard 있는것 가리기
						$(".sikunBox > ." + dataBoardTechCode[i]).hide();
					}
				}
				
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				
				var selectDataArray = new Array();
				var data = new Array();
				for(var i =0; i < dataArray.length; i ++){
					var selectedTechBiz = new Array();
					for(var j = 0; j < dataArray[i].techBiz.length; j++){
						for(var k = 0; k <checkTechBizList.length; k++){
							if(dataArray[i].techBiz[j] == checkTechBizList[k]){
								selectedTechBiz.push(dataArray[i].techBiz[j]);
							}
						}
					}
					
					if(selectedTechBiz.length > 0 ){
						var object = {
								country_vs_corp_lq : dataArray[i].country_vs_corp_lq,
								country_vs_worker_lq : dataArray[i].country_vs_worker_lq,
								corp_irds : dataArray[i].corp_irdsrate,
								worker_irds : dataArray[i].worker_irdsrate,
								techBiz : dataArray[i].techBiz,
								count : dataArray[i].techBiz.length,
								sgg_cd : dataArray[i].sgg_cd,
								sido_cd : dataArray[i].sido_cd,
								adm_cd : dataArray[i].adm_cd,
								sido_nm : dataArray[i].sido_nm,
								sgg_nm : dataArray[i].sgg_nm,
								pAdmCd : dataArray[i].adm_cd,
								bizfac_cnt : dataArray[i].bizfac_cnt,
								induscom_cnt : dataArray[i].induscom_cnt,
								showData : "count",
								unit : "개"
						}
						selectDataArray.push(object);
						selectDataArray[selectDataArray.length-1].techBiz = selectedTechBiz;
						selectDataArray[selectDataArray.length-1].count = selectedTechBiz.length;
						data.push(selectedTechBiz.length);
					}
					
				}
				
				if($("#techbizSearchTabList > a").eq(1).hasClass("on")){
					$technicalBizDataBoard.ui.initSearchGridTechBizCorpGraph()
					
				}
				if($("#techbizSearchTabList > a").eq(2).hasClass("on")){
					$technicalBizDataBoard.ui.initSearchGridTechBizWorkerGraph()
				}
				
				var tempArray = new Array();
				tempArray.push(data)
				map.data = null;
				map.legend.valPerSlice = map.legend.calculateLegend(tempArray);
				var res = {result : selectDataArray}
				map.setStatsData("normal",res,"count","개");
				if ($("#techLegend_bubble").hasClass("on")) {
					$technicalBizMap.ui.setChangeBubbleMode();
				}else {
					map.mapMode = "";
					$technicalBizMap.ui.setChangeColorMode();
				}
				
			},
			
			//2017.11.01 개발팀 추가
			
			/**
			 * @name		: initSupply
			 * @description	: 지원시설 조회
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			initSupply : function(options){
				$(".dataBoardDiv").hide();
				$("#supplyDiv").show();
				
				//지역통계현황 데이터보드 조회
				$technicalBizDataBoardApi.request.supplyAreaStateBarChart(options);  
				$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
			},
			
			/**
			 * @name		: initSupplyDetail
			 * @description	: 지원시설 상세조회
			 * @date		: 
			 * @author		: 
			 */
			initSupplyDetail : function(options){
				$(".dataBoardDiv").hide();
				$("#supplyDetailDiv").show();
				$("#supplyDetailDiv > .areaBox").html(options.params.adm_nm); //2017.02.23
				
				//데이터보드 초기화 	
				//대분류탭(사업체/종사자)
				//2017.05.02 지역선택 시, 무조건 총사업체로 초기화되는 현상
				if (options.isInit == undefined || (options.isInit != undefined &&options.isInit == true)) {
					for (var i=1; i<=2; i++) {
						if ($("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn0"+i).hasClass("on")) {
							$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn0"+i).removeClass("on");
						}
					}
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").addClass("on");
				}
				
				
				//중분류탭(기술업종 사업체수 등)
				for (var i=1; i<=4; i++) {
					if ($("#changeSupplyAreaSynthesizeStatsInfoTab02_Btn0"+i).hasClass("on")) {
						$("#changeSupplyAreaSynthesizeStatsInfoTab02_Btn0"+i).removeClass("on");
					}
				}
				$("#changeSupplyAreaSynthesizeStatsInfoTab02_Btn01").addClass("on");
				
				//소분류탭(첨단기술 등)
				for (var i=0; i<=7; i++) {
					if ($("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn0"+i).hasClass("on")) {
						$("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn0"+i).removeClass("on");
					}
				}
				$("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");

				//지원시설 탭
				for (var i=0; i<5; i++) {
					if ($("#startUpSupplyListTab_Btn"+i).hasClass("on")) {
						$("#startUpSupplyListTab_Btn"+i).removeClass("on");
					}
				}
				$("#startUpSupplyListTab_Btn0").addClass("on");
				
				$technicalBizDataBoardApi.request.initSupplyDetailCharts(options);
				
			},
			
			/**
			 * @name		: initIndustry
			 * @description	: 산업단지 조회
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			initIndustry : function(options){
				
				$(".dataBoardDiv").hide();
				$("#industryDiv").show();
				$technicalBizDataBoardApi.request.industryAreaStateBarChart(options);
			},
			
			/**
			 * @name		: industryDetailClick
			 * @description	: 지역별 지역종합정보조회(산업단지)
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 * @update      : 권차욱
			 */
			industryDetailClick : function (options, callback){
				$(".dataBoardDiv").hide();
				$("#industryDetailDiv").show();
				$("#industryDetailDiv > .areaBox").html(options.params.adm_nm); //2017.02.23
				options.params["menuType"] = "industry";
				options.params["corp_worker_type"] = "1";
				
				//2017.05.02 지역선택 시, 무조건 총사업체로 초기화되는 현상
				if (options.isInit != undefined && !options.isInit) {
					if (options.corp_worker_type != undefined) {
						options.params["corp_worker_type"] = options.corp_worker_type;
					}
				}
				
				//데이터보드 초기화 	
				//대분류탭(사업체/종사자)
				//2017.05.02 지역선택 시, 무조건 총사업체로 초기화되는 현상
				if (options.isInit == undefined || (options.isInit != undefined &&options.isInit == true)) {
					for (var i=1; i<=2; i++) {
						if ($("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn0"+i).hasClass("on")) {
							$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn0"+i).removeClass("on");
						}
					}
					$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn01").addClass("on");
				}
				
				//중분류탭(기술업종 사업체수 등)
				for (var i=1; i<=3; i++) {
					if ($("#changeIndustryAreaSynthesizeStatsInfoTab02_Btn0"+i).hasClass("on")) {
						$("#changeIndustryAreaSynthesizeStatsInfoTab02_Btn0"+i).removeClass("on");
					}
				}
				$("#changeIndustryAreaSynthesizeStatsInfoTab02_Btn01").addClass("on");
				
				//소분류탭(첨단기술 등)
				for (var i=1; i<=7; i++) {
					if ($("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn0"+i).hasClass("on")) {
						$("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn0"+i).removeClass("on");
					}
				}
				$("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");

				$technicalBizDataBoardApi.request.initIndustryDetailCharts(options, callback);
			},

			/**
			 * @name		: changeSidoFeatureChart
			 * @description	: 지역 특성정보 차트 선택
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			changeSidoFeatureChart : function(seq){
				$("#sidoFeatureMinorBtn a").removeClass("on");
				$("#sidoFeatureMajorBtn a").removeClass("on");
				$(".sidoFeatureChartArea").hide();
				$("#sidoFeatureChartArea0"+seq).show();
				this.options.params.chartSeq = seq;
				if(seq == 1){
					//기존 기술업종분포현황
					// 2017.08.24 개발팀 수정 시작
					$("#sidoFeatureMajorBtn02").removeClass("on");
					$("#sidoFeatureMinorBtn").hide();
					$("#sidoFeatureMajorBtn01").addClass("on");
					$("#sidoFeatureDetailBtn").show();
					$("#sidoFeatureDetailBtn a").eq(1).removeClass("on");
					$("#sidoFeatureDetailBtn a").eq(0).addClass("on");
					// 2017.08.24 개발팀 수정 종료
					$technicalBizDataBoardApi.request.sidoFeatureChart(this.options,"cnt");
				}else if(seq == 2){
					// 2017.08.24 개발팀 수정 시작
					//업종별 특성현황 증감 선택시
					$("sidoFeatureMajorBtn02").removeClass("on");
					$("#sidoFeatureMinorBtn").hide();
					$("#sidoFeatureMajorBtn01").addClass("on");
					$("#sidoFeatureDetailBtn").show();
					$("#sidoFeatureDetailBtn a").eq(0).removeClass("on");
					$("#sidoFeatureDetailBtn a").eq(1).addClass("on");
					$technicalBizDataBoardApi.request.sidoFeatureChart(this.options,"irdsrate");
					// 2017.08.24 개발팀 수정 종료
				}else{
					//기존 업종별 특성정보
					// 2017.08.24 개발팀 수정 시작
					//$("#sidoFeatureMinorBtn").show();
					//$("#sidoFeatureMajorBtn02").addClass("on");
					//$("#sidoFeatureMinorBtn0"+seq).addClass("on");
					//$technicalBizDataBoardApi.request.sidoFeatureDetailChart(this.options);
					// 2017.08.24 개발팀 수정 종료
					
					// 2017.08.24 개발팀 수정 시작
					//업종별 입지계수 현황 클릭시
					$("#sidoFeatureMinorBtn").show();
					$("#sidoFeatureDetailBtn").hide();
					$("#sidoFeatureMajorBtn02").addClass("on");
					$("#sidoFeatureMinorBtn0"+seq).addClass("on");
					$technicalBizDataBoardApi.request.sidoFeatureLctChart(this.options);
					// 2017.08.24 개발팀 수정 종료
				}
				
			},
			
			/**
			 * @name		: changeSidoEconomyChart
			 * @description	: 경제총조사 차트 선택
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			changeSidoEconomyChart : function(type, b_class_cd){
				$("#sidoEconomyMinorBtn a").removeClass("on");
				$("#sidoEconomyMinorBtn_"+type).addClass("on");
				this.options.params.economyChartType = type;
				
				//2017.09.11 개발팀 수정 추가
				//sales 매출액
				//lbcst 인건비
				//rntchrg 임대료
				//business_profit 영업이익
				
				$("#ChangeEconomyChart a").removeClass("on");
				switch(type){
					case "sales"	: $("#ChangeEconomyChart a").eq(0).addClass("on"); break;		//시도별 기술업종현황
					case "lbcst"	: $("#ChangeEconomyChart a").eq(1).addClass("on"); break;		//시군구별 기술업종현황
					case "rntchrg"	: $("#ChangeEconomyChart a").eq(2).addClass("on"); break;		//업종밀집도변화
					case "business_profit"	: $("#ChangeEconomyChart a").eq(3).addClass("on"); break;		//지원시설 조회
				}
				//2017.09.11 개발팀 수정 추가 완료
				
				if(b_class_cd != undefined){
					$(".sidoEconomyChartArea").hide();
					$("#sidoEconomyChartArea0"+b_class_cd).show();
					
					$("#sidoEconomyMajorBtn a").removeClass("on");
					$("#sidoEconomyMajorBtn #sidoEconomyMajorBtn0"+b_class_cd).addClass("on");
					this.options.params.b_class_cd = (b_class_cd == 0) ? undefined : b_class_cd;
					$technicalBizDataBoardApi.request.sidoEconomyChart(this.options);
				}else {
					$technicalBizDataBoardApi.request.updateEconomyChartData(this.options);
				}
			},
			
			//2017.09.20 개발팀 추가 함수 changeSigunguFeatureChart
			/**
			 * @name		: changeSigunguFeatureChart
			 * @description	: 시군구 상위 탭 클릭
			 * @date		: 2017.09.20
			 * @author		: 김재상
			 */
			changeSigunguFeatureChart : function(seq){
				if(seq == 1){
					$("#sigunguPerTab").show();
					$("#sigunguLctTab").hide();
					$("#sigunguDbTabs a").eq(0).addClass("on");
					$("#sigunguDbTabs a").eq(1).removeClass("on");
				}else{
					$("#sigunguLctTab").show();
					$("#sigunguPerTab").hide();
					$("#sigunguDbTabs a").eq(1).addClass("on");
					$("#sigunguDbTabs a").eq(0).removeClass("on");
				}
			},
			
			/**
			 * @name		: changeSigunguClassCd
			 * @description	: 시군구 기술업종 분류별 차트
			 * @date		: 2016.10.07
			 * @author		: 김재상
			 */
			changeSigunguClassCd : function(m_class_cd){
				$("#sigunguTabs a").removeClass("on");
				$("#sigunguTab_"+m_class_cd).addClass("on");
				var themeNm = $("#sigunguTab_"+m_class_cd).html();
				
				var title = "시군구 기술업종 현황 > " + themeNm;
				$(".helperText").html(title);
				
				//2017.09.14 개발팀 수정
				//추가 지표
				//사업자 증감율
				//종사자 증감율
				this.options.params.m_class_cd = m_class_cd;
				this.options.dataBoard.jobAreaThemeCd = m_class_cd; //2017.02.23
				$technicalBizDataBoardApi.request.sigunguClassChart(this.options);
				$technicalBizDataBoardApi.request.sigunguRankChart(this.options);
				
				
				//2017.09.21 개발팀 추가
				if($("#standardButton").hasClass("off")){
					$("#techRank_worker_cnt" +" a").removeClass("on");
					$("#rankChart_worker_cnt").show();
					this.changeSigunguRankType('worker_cnt');
				}else{
					$("#techRank_corp_cnt" +" a").removeClass("on");
					$("#rankChart_corp_cnt").show();
					this.changeSigunguRankType('corp_cnt');
				}
				//this.changeSigunguRankType('corp_cnt');
				//2017.09.21 개발팀 추가 종료
				
				//options - > params - > adm_cd 
				//options - > params - > adm_nm
				//2017.09.20 개발팀 추가
				this.changeSigunguLctChart("country");
				//2017.09.20 개발팀 추가 종료
			},
			
			/**
			 * @name		: changeSigunguRankType
			 * @description	: 업종별 시군구 차트
			 * @date		: 2016.10.07
			 * @author		: 김재상
			 */
			changeSigunguRankType: function(type){
				//2017.09.21 개발팀 수정
				//기존
				/*$("#sigunguRankTypes>a").removeClass("on");
				$("#"+type).addClass("on");
				$(".techRank").hide();
				$("#techRank_"+type).show();*/
				
				//클릭한탭을 펴주고 나머지 탭은 닫는다.
				var typeList = ["corp_cnt","corp_per","resid_ppltn_cnt","worker_cnt","avg_worker_cnt"];
				
				for(var i =0; i < typeList.length; i++){
					if(type != typeList[i]){
						$("#techRank_"+typeList[i] +" a").addClass("on");
						$("#rankChart_"+typeList[i]).hide();
					}
				}
				
				if(type == "corp_cnt" ||type == "corp_per" || type=="resid_ppltn_cnt" ){
					$("#standardButton").removeClass("off");
				}else{
					$("#standardButton").addClass("off");
				}
				
				//2017.09.21 개발팀 수정 완료
					
				var tmpType = "0";
				switch(type) {
					case "corp_cnt":
						tmpType = "0";
						break;
					case "corp_per":
						tmpType = "0"; //업종비율도 사업체로 조회
						break;
					case "resid_ppltn_cnt":
						tmpType = "2";
						break;
					case "worker_cnt":
						tmpType = "3";
						break;
					case "avg_worker_cnt":
						tmpType = "4";
						break;
				}
				
				var themeCd = this.options.params.m_class_cd;
				var themeNm = $("#sigunguTab_"+themeCd).html();
				//2017.09.14 개발팀 수정
				//추가 지표
				//사업자 증감율
				//종사자 증감율
				//그리고 callback으로 전체 다 가져오는거 추가
				
				//2017.09.21 개발팀 수정 show 일때만 조회
				if($("#techRank_"+type +" a").hasClass("on") == false){
					$technicalBizMap.ui.doReqSidoCompany(themeCd, themeNm, tmpType);
				}
				
			},
			
			//2017.09.20 개발팀 수정
			/**
			 * @name		: changeSigunguLctChart
			 * @description	: 입지계수 현황 그리기
			 * @date		: 2017.09.20
			 * @author		: 최재영
			 */
			changeSigunguLctChart : function(region){
				$("#sigunguLctCorpTextAdmNm").text(this.options.params.adm_nm);
				$("#sigunguLctWorkerTextAdmNm").text(this.options.params.adm_nm);
				$("#sigunguLctCorpMclassNm").text('');
				$("#sigunguLctWorkerMclassNm").text('');
				
				//#sigunguLctTab .noneAreaBox .dbTabs a
				if(region == "country"){
					$("#sigunguLctTab .noneAreaBox .dbTabs a").eq(0).addClass("on");
					$("#sigunguLctTab .noneAreaBox .dbTabs a").eq(1).removeClass("on");
				}else{
					$("#sigunguLctTab .noneAreaBox .dbTabs a").eq(1).addClass("on");
					$("#sigunguLctTab .noneAreaBox .dbTabs a").eq(0).removeClass("on");
				}
				
				//입지계수 그래프 그리기 
				$("#sigunguLctChart").highcharts({ 
			        chart: { type: 'bubble', plotBorderWidth: 1, zoomType : 'x' }, //2018.01.15 [개발팀] 줌기능 추가
			        legend: {enabled: false},
			        title: {text: ''},
			        subtitle: {text: ''},
			        xAxis: {
			            gridLineWidth: 1,
			            title: {text: '사업체 LQ'},
			            labels: {
			                format: '{value}'
			            },
			            plotLines: [{
			                color: 'red',
			                dashStyle: 'solid',
			                width: 2,
			                value: 1,
			                label: {
			                    rotation: 0,
			                    y: 15,
			                    style: {
			                        fontStyle: 'italic'
			                    },
			                    /*text: '종사자'*/
			                },
			                zIndex: 3
			            }]
			        },

			        yAxis: {
			            startOnTick: false,
			            endOnTick: false,
			            title: {
			                text: '종사자 LQ'
			            },
			            labels: {
			                format: '{value}'
			            },
			            maxPadding: 0.2,
			            plotLines: [{
			                color: 'red',
			                dashStyle: 'solid',
			                width: 2,
			                value: 1,
			                label: {
			                    align: 'right',
			                    style: {
			                        fontStyle: 'italic'
			                    },
			                    /*text: '사업체',*/
			                    x: -10
			                },
			                zIndex: 3
			            }]
			        },

			        tooltip: {
			        	//2018.01.22 [개발팀] 툴팁로직 변경
			        	shared : true,
			        	formatter: function () {
			                var x = this.point.x;
			                var y = this.point.y;
			                var html = "";
			                $.each(this.series.chart.series, function (i, serie) {
			                    $.each(serie.data, function (j, p) {
			                        if (p.x === x && p.y === y) {
			                        	html += '<table">';
			                        	html +=	'<tr>';
			                        	html += 	'<td><span style="color:'+p.color+'">●</span><span>'+p.name+':</span><span style="font-weight:bold;">사업체:'+p.x+' 종사자:'+p.y+'</span></td>';
			                        	html += '</tr>';
						                html += '</table>';
						                html += '<br/><br/>';
			                        }
			                    });
			                });
			                return html;
			            }
			        },

			       /* plotOptions: {
			            series: {
			                dataLabels: {
			                    enabled: true,
			                    format: '{point.name}'
			                }
			            }
			        },*/
			        plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}',
                                style:{
                                   color:"#000",
                                   textOutline : "0px"
                                }
                            }
                        }
                    },
			    });
				//seriesData 추가
				$technicalBizDataBoardApi.request.addLctSeriesChart(this.options, companyDataYear, region,'sigunguLctChart'); //2018.01.11 [개발팀]
				
			},
			/**
			 * @name		: changeDensityTab
			 * @description	: 업종밀집도 탭변경
			 * @date		: 2016.10.19
			 * @author		: 김재상
			 */
			changeDensityTab : function(m_class_cd, s_class_cd){
				$("#densityDiv .dbTabs01").hide();
				$("#densityDiv .dbTabs>a").removeClass("on");
				var themeNm = "";
				var title = "";
				if(m_class_cd == "0"){
					$("#densityDiv .dbTabs>a:nth-child(1)").addClass("on");
					this.options.params.m_class_cd = undefined;
					this.changeDensitySubTab('0');
					
					themeNm = $("#densityDiv .dbTabs>a:nth-child(1)").html();
					title = "업종밀집도 변화 > " + themeNm;
					$(".helperText").html(title);
				}else{
					$("#tab_"+m_class_cd).show();
					$("#m_class_"+m_class_cd).addClass("on");
					this.options.params.m_class_cd = m_class_cd;
					this.changeDensitySubTab(s_class_cd);

					themeNm = $("#m_class_"+m_class_cd).html();
					themeNm_sub = $("#m_class_"+m_class_cd).parent().siblings().find(".on").html();
					title = "업종밀집도 변화 > " + themeNm + " > " + themeNm_sub;
					$(".helperText").html(title);
				}
			},
			
			/**
			 * @name		: changeDensitySubTab
			 * @description	: 업종밀집도 서브탭변경
			 * @date		: 2016.10.19
			 * @author		: 김재상
			 */
			changeDensitySubTab : function(s_class_cd){
				$("#densityDiv .dbTabs01 a").removeClass("on");

				/*if(s_class_cd == "0"){
					$("#densityDiv .dbTabs01 li:nth-child(1)>a").addClass("on");
					this.options.params.s_class_cd = undefined;
				}else{*/
					$("#s_class_"+s_class_cd).addClass("on");
					this.options.params.s_class_cd = s_class_cd;
				//}
				themeNm = $("#s_class_"+s_class_cd).parent().parent().siblings().find(".on").html();
				themeNm_sub = $("#s_class_"+s_class_cd).html();
				title = "업종밀집도 변화 > " + themeNm + " > " + themeNm_sub;
				$(".helperText").html(title);
				
				this.options.params.base_year = undefined;
				if (!$(".specializedInfo a").hasClass("on")) {
					$technicalBizDataBoardApi.request.densityCombinedChart(this.options);
				}else {
					$technicalBizDataBoardApi.request.densityCombinedNewCorpChart(this.options.params.adm_cd, this.options);
				}	
				
				//업종밀집도변화 호출
				var themeCd = "";
				var themeNm = "";
				if (this.options.params.s_class_cd != undefined) {
					themeCd = this.options.params.s_class_cd;
					themeNm = $("#s_class_"+themeCd).html(); 
				}else {
					themeCd = this.options.params.m_class_cd;
					themeNm = $("#m_class_"+themeCd).html();
				}
				
				if (themeNm == undefined || themeNm.length == 0) {
					themeNm = "기술업종 전체현황";
				}
				
				if (themeCd == undefined) {
					themeCd = "00";
				}
				
				this.options.dataBoard.themeCd = themeCd;
				this.options.dataBoard.themeNm = themeNm;
				this.options.etc.themeCd = themeCd;
				this.mapData[this.map.id].options = this.options;
  				$technicalBizMap.ui.doReqCompanyDensity (themeCd, themeNm, this.options.params.year, this.options.params);
			},
			
			/**
			 * @name		: changeDensityBaseYear
			 * @description	: 업종밀집도 기준년도변경
			 * @date		: 2016.10.19
			 * @author		: 김재상
			 */
			changeDensityBaseYear : function(base_year){
				$(".ysettingList a").removeClass("on");
				$(".ysettingList a#densityBaseYear_"+base_year).addClass("on");
				
				this.options.params.base_year = base_year;
				this.options.params.year = base_year;
				this.options.etc.year = base_year;
				$technicalBizDataBoardApi.request.densityCombinedChart(this.options);
				$technicalBizMap.ui.doReqCompanyDensity (this.options.dataBoard.themeCd, this.options.dataBoard.themeNm, base_year, this.options.params);
			},
			
			/**
			 * @name         : changeDensityNewCorp
			 * @description  : 업종밀집도 성남시 사업체 현황 조회
			 * @date         : 2016. 11. 15.
			 * @author	     : 김재상
			 * @history 	 :
			 */
			changeDensityNewCorp : function(year){
				//신설법인 년도버튼 초기화
				$("#newCorpBaseYearList a").each(function() {
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
					}
				})
				
				if (year == undefined) {
					$(".specializedInfo a").toggleClass("on");
					$("#newCorpBaseYearList a").last().addClass("on");
				}else {
					$("#newCorpBaseYear_"+year).addClass("on");
				}
				
				if($(".specializedInfo a").hasClass("on")){
					$("#densityBaseYearList").hide();
					$("#newCorpBaseYearList").show();
					if (year == undefined) {
						$("#newCorpBaseYearList a").each(function() {
							if ($(this).hasClass("on")) {
								year = $(this).html();
							}
						})
						$technicalBizDataBoardApi.request.densityCombinedNewCorpChart(this.options.params.adm_cd, this.options);
					}
					$technicalBizMapApi.request.OpenApiNewCorpInfoList(this.options.params, year, this.map);
				}else{
					$("#densityBaseYearList").show();
					$("#newCorpBaseYearList").hide();
					var s_class_cd = "0";
					if (this.options.dataBoard.themeCd == "00") {
						m_class_cd = "0"
					}else {
						m_class_cd = this.options.dataBoard.themeCd.substring(0,2);
						s_class_cd = this.options.dataBoard.themeCd;
					}
					
					if (this.options.dataBoard.themeCd.length == 2) {
						s_class_cd = "0";
					}
					this.changeDensityTab(m_class_cd, s_class_cd);
					$technicalBizMap.ui.clearNewCorpBoundary(this.map);
				}
			},
			
			/**
			 * @name         : reset
			 * @description  :	생활업종지도 데이터보드 초기화
			 * @date         : 2015. 11. 26.
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reset : function(map_id) {
				$(".dataBoardDiv").hide();
				this.chartDataList[map_id] = null;
				
				this.mapData[map_id].options = {};
				this.mapData[map_id].type = "";
				if(this.map != null) {
					if (this.map.miniMap) {
//						this.map.miniMap = null;
						if(this.map.miniMap.geojson) {
							this.map.miniMap.geojson.remove();
						}
					}
				}
			},
			
			/**
			 * @name         : setReportData
			 * @description  : 보고서 데이터를 저장한다.
			 * @date         : 2015. 11. 26.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setReportData : function(category, type, data, id) {
				if ($technicalBizDataBoard.ui.chartDataList[id] == null) {
					$technicalBizDataBoard.ui.chartDataList[id] = [];
				}
				
				var e = {
						category: category,
						type: type,
						data: data
				};
				
				if(p = $.pick($technicalBizDataBoard.ui.chartDataList[id], {category: category, type: type})){
					var idx = $.indexOf($technicalBizDataBoard.ui.chartDataList[id], p);
					$technicalBizDataBoard.ui.chartDataList[id][idx].data = data;
				}else{
					$technicalBizDataBoard.ui.chartDataList[id].push(e);
				}
			},
			
			/**
			 * @name         : changeLegend
			 * @description  : 시군구별 기술업종현황 범례설정 버블<->색상
			 * @date         : 2016. 10. 25.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			changeLegend : function(type) {
				if (type == "color") {
					$technicalBizMap.ui.setChangeColorMode();
				}else {
					$technicalBizMap.ui.setChangeBubbleMode();
				}
			},
			
			/**
			 * @name         : changeSupplyTab
			 * @description  : 지원시설 조회 탭별 차트 조회
			 * @date         : 2016.10.17
			 * @author	     : 이정운
			 * @param		: type - 지원시설 조회 탭 구분
			 * @history 	 :
			 */
			changeSupplyTab : function (type){
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$("#supplyDiv .dbTabs a").removeClass("on");
				if('1' == type){
					$("#changeSupplyTabBtn01").addClass("on");
					//TODO 옵션 항목 확인	
					var options = {
							params : {
								map : map,
								menuType : 'supply'
							}
					}
					$technicalBizDataBoardApi.request.supplyAreaStateBarChart(options);
					$technicalBizMap.ui.doSupplyMarkerClear();
				}else if('2' == type){
					for (var i=1; i<=4; i++) {
						$("#startUpSupplyLctType_"+i).addClass("on");
					}
					$("#changeSupplyTabBtn02").addClass("on");
					 	
					var lctType = '';
					
					$("a[id ^= startUpSupplyLctType_]").each(function(){
						if($(this).hasClass("on")){
							if('' != lctType){
								lctType += ",";
							}
							lctType += $(this).attr("id").split("_")[1];
						}
					});
					if (lctType != "") {
						$technicalBizDataBoardApi.request.startUpSupplyBarChart(lctType);
					}
					$technicalBizMapApi.request.openApiTotalSupplyFacilityPoi(map);
				}
			},
			
			/**
			 * @name         : changeSupplyMap
			 * @description  : 지원시설 - 지역통계 현황 - 기술업종 사업체/기술업종 종사가 맵 구분
			 * @date         : 
			 * @author	     : 
			 * @param		: type - 기술업종 사업체/기술업종 종사가 맵 구분
			 * @history 	 :
			 */
			changeSupplyMap : function(type){
				$(".supplyMap").removeClass("on");
				switch(parseInt(type)) {
					case 1:
						$("#supplyMapBtn01").addClass("on");
						$(".techDataboardTab > a").css({
							   "background" : "#e05858",
							   "border-top" : "1px solid #e05858"
						});
						
						break;
					case 2:
						$("#supplyMapBtn02").addClass("on");
						$(".techDataboardTab > a").css({
							   "background" : "#1778cc",
							   "border-top" : "1px solid #1778cc"
						});
						
						break;
				}
				
				
				//2017.09.28 개발팀 추가
				if(type == 1){
					$("#standardButton").removeClass("off");
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").show();
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn02").hide();
				}else{
					$("#standardButton").addClass("off");
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").hide();
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn02").show();
				}
				
				//2017.09.28 개발팀 추가 종료
				$technicalBizMap.ui.doChangeColorMap(type, this.mapData[this.map_id].options["data"], "supply");
			},
			
			/**
			 * @name         : changeIndustryMap
			 * @description  : 산업단지 - 지역통계 현황 - 기술업종 사업체/기술업종 종사가 맵 구분
			 * @date         : 
			 * @author	     : 
			 * @param		: type - 기술업종 사업체/기술업종 종사가 맵 구분
			 * @history 	 :
			 */
			changeIndustryMap : function(type) {
				switch(parseInt(type)) {
					case 1:
						$(".techDataboardTab > a").css({
							   "background" : "#e05858",
							   "border-top" : "1px solid ##b7b6b6"
						});
						break;
					case 2:
						$(".techDataboardTab > a").css({
							   "background" : "#1778cc",
							   "border-top" : "1px solid ##b7b6b6"
						});
						break;
				}
				//2017.09.28 개발팀 추가 종료
				$technicalBizMap.ui.doChangeColorMap(type, this.mapData[this.map_id].options["data"], "industry");
			},
			
			
//창업지원시설 상세보기 테스트 버튼/////////////////////////////////			
			startUpSupplyClick : function (options){
				options.params["menuType"] = "supply";
				options.params["corp_worker_type"] = "1";
				
				//2017.05.02 지역선택 시, 무조건 총사업체로 초기화되는 현상
				if (options.isInit != undefined && !options.isInit) {
					if (options.corp_worker_type != undefined) {
						options.params["corp_worker_type"] = options.corp_worker_type;
					}
				}
				this.initSupplyDetail(options);
			},
//////////////////////////////////////////////////////////////			
			/**
			 * @name         : changeSupplyAreaSynthesizeStatsInfoTab01
			 * @description  : 지원시설 - 총사업체/총종사자 탭 클릭
			 * @date         : 
			 * @author	     : 
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @history 	 :
			 */
			changeSupplyAreaSynthesizeStatsInfoTab01 : function(type01){
				
				$(".changeSupplyAreaSynthesizeStatsInfoTab01").removeClass("on");
				if('1' == type01){
					//2017.11.16 개발팀 수정
					/*$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").addClass("on");*/
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").show();
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn02").hide();
					$(".supplyAreaSynthesizeStatsInfo02_type").text("사업체");
					$(".supplyAreaSynthesizeStatsInfo02_unit").text("개");
					
				}else if('2' == type01){
					//2017.11.16 개발팀 수정
					/*$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn02").addClass("on");*/
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").hide();
					$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn02").show();
					$(".supplyAreaSynthesizeStatsInfo02_type").text("종사자");
					$(".supplyAreaSynthesizeStatsInfo02_unit").text("명");
				}
				$(".changeSupplyAreaSynthesizeStatsInfoTab02").removeClass("on");
				$("#changeSupplyAreaSynthesizeStatsInfoTab02_Btn01").addClass("on");
				
				$(".changeSupplyAreaSynthesizeStatsInfoTab03").removeClass("on");
				$("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");

				var options = this.mapData[this.map_id].options;
				options.params["menuType"] = "supply";
				options.params["corp_worker_type"] = type01;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizDataBoardApi.request.areaSynthesizeStatsInfo(options, type01, 1, 0);
				$technicalBizMap.ui.doDetailRegionInfo(options, "0", "supply");
			},
			
			/**
			 * @name         : changeSupplyAreaSynthesizeStatsInfoTab02
			 * @description  : 지원시설 - 사업체/종사자 수, 비율, 증감 탭 클릭
			 * @date         : 
			 * @author	     : 
			 * @param		: type02 - 사업체/종사자 수[1], 사업체/종사자 비율[2], 사업체/종사자 증감[3]
			 * @history 	 :
			 */
			changeSupplyAreaSynthesizeStatsInfoTab02 : function(type02){
				var type01 = '1';
				//2017.11.16 개발팀 수정
				/*$(".changeSupplyAreaSynthesizeStatsInfoTab01").each(function(){
					if($(this).hasClass("on")){
						if("changeSupplyAreaSynthesizeStatsInfoTab01_Btn01" == $(this).attr("id")){
							type01 = "1";
						}else if("changeSupplyAreaSynthesizeStatsInfoTab01_Btn02" == $(this).attr("id")){
							type01 = "2";
						}
					}
				})*/
				if(!$("#standardButton").hasClass("off")){
					type01 = "1";
				}else{
					type01 = "2";
				}
				
				//2017.11.16 개발팀 수정 종료
				$(".changeSupplyAreaSynthesizeStatsInfoTab02").removeClass("on");
				$("#changeSupplyAreaSynthesizeStatsInfoTab02_Btn0"+type02).addClass("on");
				
				//2017.09.28 개발팀 수정
				//$(".changeSupplyAreaSynthesizeStatsInfoTab03").removeClass("on");
				//$("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");
				if(type02 != "4"){
					/*$(".changeSupplyAreaSynthesizeStatsInfoTab03").removeClass("on");
					$("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");*/
					$("#supplyAreaInfoTab03").show();
				}else{
					$(".changeSupplyAreaSynthesizeStatsInfoTab03").removeClass("on");
					$("#supplyAreaInfoTab03").hide();
				}
				//2017.09.28 개발팀 수정 종료
				
				
				
				
				var options = this.mapData[this.map_id].options;
				options.params["menuType"] = "supply";
				options.params["corp_worker_type"] = type01;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizDataBoardApi.request.areaSynthesizeStatsInfo(options, type01, type02, 0);
				$technicalBizMap.ui.doDetailRegionInfo(options, "0", "supply");
			},
			
			/**
			 * @name         : changeSupplyAreaSynthesizeStatsInfoTab03
			 * @description  : 지원시설 - 사업체/종사자 수, 비율, 증감 별 기술목록 탭 클릭
			 * @date         : 
			 * @author	     : 
			 * @param		: type03 : 기술구분(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7])
			 * @history 	 :
			 */
			changeSupplyAreaSynthesizeStatsInfoTab03 : function(type03){
				var type01 = '1';
				
				//2017.11.16 개발팀 수정
				/*$(".changeSupplyAreaSynthesizeStatsInfoTab01").each(function(){
					if($(this).hasClass("on")){
						if("changeSupplyAreaSynthesizeStatsInfoTab01_Btn01" == $(this).attr("id")){
							type01 = "1";
						}else if("changeSupplyAreaSynthesizeStatsInfoTab01_Btn02" == $(this).attr("id")){
							type01 = "2";
						}
					}
				})*/
				
				if(!$("#standardButton").hasClass("off")){
					type01 = "1";
				}else{
					type01 = "2";
				}
				//2017.11.16 개발팀 수정 종료
				
				var type02 = '1';
				$(".changeSupplyAreaSynthesizeStatsInfoTab02").each(function(){
					if($(this).hasClass("on")){
						if("changeSupplyAreaSynthesizeStatsInfoTab02_Btn01" == $(this).attr("id")){
							type02 = "1";
						}else if("changeSupplyAreaSynthesizeStatsInfoTab02_Btn02" == $(this).attr("id")){
							type02 = "2";
						}else if("changeSupplyAreaSynthesizeStatsInfoTab02_Btn03" == $(this).attr("id")){
							type02 = "3";
						}
					}
				})
				
				$(".changeSupplyAreaSynthesizeStatsInfoTab03").removeClass("on");
				$("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn0"+type03).addClass("on");

				var options = this.mapData[this.map_id].options;
				options.params["menuType"] = "supply";
				options.params["corp_worker_type"] = type01;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizDataBoardApi.request.areaSynthesizeStatsInfo(options, type01, type02, type03);	
				$technicalBizMap.ui.doDetailRegionInfo(options, type03, "supply");
				//
			},
			
			//2017.09.27 개발팀 수정
			//파라미터 type 제거
			/**
			 * @name         : changeStartUpSupplyListTab
			 * @description  : 창업지원시설 목록 조회
			 * @date         : 
			 * @author	     : 
			 * @param		: type - 창업지원시설 목록 탭 구분
			 * @history 	 :
			 */
			changeStartUpSupplyListTab : function (){		
				//2017.09.26 개발팀 수정
				/*$(".startUpSupplyListTab").removeClass("on");
				$("#startUpSupplyListTab_Btn"+type).addClass("on");
				
				var options = this.mapData[this.map_id].options;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizMap.ui.doSupplyMarkerClear();
				$technicalBizDataBoardApi.request.supplyStartUpSupplyList(type, options);*/
				
				var startUpSupplyList = $("#startUpSupplyList a");
				var checkList = new Array();
				for(var i = 0; i < startUpSupplyList.length; i++){
					if($(startUpSupplyList[i]).hasClass("on")){
						checkList.push(Number(i+1));
					}
				}
				if(checkList.length != 0){
					var options = this.mapData[this.map_id].options;
					options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
					$technicalBizMap.ui.doSupplyMarkerClear();
					$technicalBizDataBoardApi.request.supplyStartUpSupplyList(checkList, options);
					$("#techListOrigin").show();					
				}else{
					$technicalBizMap.ui.doSupplyMarkerClear();
					$(".startUpSupplyListsTitle > strong").html("0");
					$("#techListStartUpSupplyLists").html('');
					$("#startUpSupplyListPaging .pages").html('');
					$("#techListOrigin").hide();					
				}
				
				
				//2017.09.26 개발팀 수정 종료
			},
			
			/**
			 * @name         : changeIndustryAreaSynthesizeStatsInfoTab01
			 * @description  : 산업단지 - 총사업체/총종사자 탭 클릭
			 * @date         : 
			 * @author	     : 
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @history 	 :
			 */
			changeIndustryAreaSynthesizeStatsInfoTab01 : function(type01){
				$(".changeIndustryAreaSynthesizeStatsInfoTab01").removeClass("on");
				if('1' == type01){
					$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn01").addClass("on");
					$(".industryAreaSynthesizeStatsInfo02_type").text("사업체");
					$(".industryAreaSynthesizeStatsInfo02_unit").text("개");
					//2017.09.30 개발팀 추가
					$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn01").show();
					$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn02").hide();
					
				}else if('2' == type01){
					$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn02").addClass("on");
					$(".industryAreaSynthesizeStatsInfo02_type").text("종사자");
					$(".industryAreaSynthesizeStatsInfo02_unit").text("명");
					
					//2017.09.30 개발팀 추가
					$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn01").hide();
					$("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn02").show();
				}
				
				$(".changeIndustryAreaSynthesizeStatsInfoTab02").removeClass("on");
				$("#changeIndustryAreaSynthesizeStatsInfoTab02_Btn01").addClass("on");
				$(".changeIndustryAreaSynthesizeStatsInfoTab03").removeClass("on");
				$("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");
				
				var options = this.mapData[this.map_id].options;
				options.params["menuType"] = "industry";
				options.params["corp_worker_type"] = type01;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizDataBoardApi.request.areaSynthesizeStatsInfo(options, type01, 1, 0);
				$technicalBizMap.ui.doDetailRegionInfo(options, "0", "industry");
				
			},
			
			/**
			 * @name         : changeIndustryAreaSynthesizeStatsInfoTab02
			 * @description  : 사업체/종사자 수, 비율, 증감 탭 클릭
			 * @date         : 
			 * @author	     : 
			 * @param		: type02 - 사업체/종사자 수[1], 사업체/종사자 비율[2], 사업체/종사자 증감[3]
			 * @history 	 :
			 */
			changeIndustryAreaSynthesizeStatsInfoTab02 : function(type02){
				var type01 = '1';
				
				//2017.11.16 개발팀 수정
				/*$(".changeIndustryAreaSynthesizeStatsInfoTab01").each(function(){
					if($(this).hasClass("on")){
						if("changeIndustryAreaSynthesizeStatsInfoTab01_Btn01" == $(this).attr("id")){
							type01 = "1";
						}else if("changeIndustryAreaSynthesizeStatsInfoTab01_Btn02" == $(this).attr("id")){
							type01 = "2";
						}
					}
				})*/
				if(!$("#standardButton").hasClass("off")){
					type01 = "1";
				}else{
					type01 = "2";
				}
				
				//2017.11.16 개발팀 수정 종료
				$(".changeIndustryAreaSynthesizeStatsInfoTab02").removeClass("on");
				$("#changeIndustryAreaSynthesizeStatsInfoTab02_Btn0"+type02).addClass("on");
				//2017.09.30 개발팀 수정
				//$(".changeIndustryAreaSynthesizeStatsInfoTab03").removeClass("on");
				//$("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");
				if(type02 != "4"){
					$(".changeIndustryAreaSynthesizeStatsInfoTab03").removeClass("on");
					$("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn00").addClass("on");
					$("#industryTab03").show();
				}else{
					$(".changeIndustryAreaSynthesizeStatsInfoTab03").removeClass("on");
					$("#industryTab03").hide();
				}
				
				
				var options = this.mapData[this.map_id].options;
				options.params["menuType"] = "industry";
				options.params["corp_worker_type"] = type01;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizDataBoardApi.request.areaSynthesizeStatsInfo(options, type01, type02, 0);
				$technicalBizMap.ui.doDetailRegionInfo(options, "0", "industry");
			},
			
			/**
			 * @name         : changeIndustryAreaSynthesizeStatsInfoTab03
			 * @description  : 사업체/종사자 수, 비율, 증감 별 기술목록 탭 클릭
			 * @date         : 
			 * @author	     : 
			 * @param		: type03 : 기술구분(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7])
			 * @history 	 :
			 */
			changeIndustryAreaSynthesizeStatsInfoTab03 : function(type03){
				var type01 = '1';
				//2017.11.16 개발팀 수정
				/*$(".changeIndustryAreaSynthesizeStatsInfoTab01").each(function(){
					if($(this).hasClass("on")){
						if("changeIndustryAreaSynthesizeStatsInfoTab01_Btn01" == $(this).attr("id")){
							type01 = "1";
						}else if("changeIndustryAreaSynthesizeStatsInfoTab01_Btn02" == $(this).attr("id")){
							type01 = "2";
						}
					}
				})*/
				if(!$("#standardButton").hasClass("off")){
					type01 = "1";
				}else{
					type01 = "2";
				}
				//2017.11.16 개발팀 수정 종료
				
				var type02 = '1';
				$(".changeIndustryAreaSynthesizeStatsInfoTab02").each(function(){
					if($(this).hasClass("on")){
						if("changeIndustryAreaSynthesizeStatsInfoTab02_Btn01" == $(this).attr("id")){
							type02 = "1";
						}else if("changeIndustryAreaSynthesizeStatsInfoTab02_Btn02" == $(this).attr("id")){
							type02 = "2";
						}else if("changeIndustryAreaSynthesizeStatsInfoTab02_Btn03" == $(this).attr("id")){
							type02 = "3";
						}
					}
				})
				
				$(".changeIndustryAreaSynthesizeStatsInfoTab03").removeClass("on");
				$("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn0"+type03).addClass("on");

				var options = this.mapData[this.map_id].options;
				options.params["menuType"] = "industry";
				options.params["corp_worker_type"] = type01;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizDataBoardApi.request.areaSynthesizeStatsInfo(options, type01, type02, type03);	
				$technicalBizMap.ui.doDetailRegionInfo(options, type03, "industry");
			},
			
			/**
			 * @name         : changeIndustryListTab
			 * @description  : 산업단지 목록 조회
			 * @date         : 2016.10.18
			 * @author	     : 이정운
			 * @param		: type - 산업단지 목록 탭 구분
			 * @history 	 :
			 */
			changeIndustryListTab : function (type){
				//2017.09.30 개발팀 수정
				/*$(".industryListTab").removeClass("on");
				$("#industryListTab_Btn"+type).addClass("on");
				
				var options = this.mapData[this.map_id].options;
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizMap.ui.doIndustryMarkerClear();
				$technicalBizDataBoardApi.request.industryList(type, options);*/
				
				var industryList = $("#industryList a");
				var checkList = new Array();
				for(var i = 0; i < industryList.length; i++){
					if($(industryList[i]).hasClass("on")){
						checkList.push(Number(i+1));
					}
				}
				if(checkList.length != 0){
					var options = this.mapData[this.map_id].options;
					options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
					$technicalBizMap.ui.doIndustryMarkerClear();
					$technicalBizDataBoardApi.request.industryList(checkList, options);
					$("#industryOrigin1").show();
					$("#industryOrigin2").show();					
				}else{
					$technicalBizMap.ui.doIndustryMarkerClear();
					$(".industryListsTitle > strong").html("0");
					$("#industryLists").html('');
					$("#industryOrigin1").hide();
					$("#industryOrigin2").hide();
					$("#industryListPaging .pages").html('');
				}
				
				//2017.09.30 개발팀 수정 종료
			},
			
			/**
			 * @name         : changeIndustryVariationState
			 * @description  : 산업단지 내 기술업종 증감현황 탭
			 * @date         : 2016.10.18
			 * @author	     : 이정운
			 * @param		: type - 산업단지 내 기술업종 증감현황 탭 구분
			 * @history 	 :
			 */
			changeIndustryVariationStateTab : function(type){
				$(".industryVariationStateTab").removeClass("on");
				$("#industryVariationStateTab_Btn0"+type).addClass("on");
				
				var options = this.mapData[this.map_id].options;
				$technicalBizDataBoardApi.request.industryVariationStateLineChart(type, options.curInfo.complex_no, options.curInfo.complex_nm);
			},
			
			/**
			 * @name         : changeIndustryDetailState
			 * @description  : 산업단지 내 기술업종 증감현황 탭
			 * @date         : 2016.10.18
			 * @author	     : 이정운
			 * @param		: type - 산업단지 내 기술업종 증감현황 탭 구분
			 * @history 	 :
			 */
			changeIndustryDetailStateTab : function(type){
				$(".industryDetailStateTab").removeClass("on");
				$("#industryDetailStateTab_Btn0"+type).addClass("on");
				
				var options = this.mapData[this.map_id].options;
				$technicalBizDataBoardApi.request.industryDetailStateBarChart(type, options.curInfo.complex_no, options.curInfo.complex_nm);
			},
			
			/**
			 * @name         : doComplexDetailInfo
			 * @description  : 산업단지 상세보기
			 * @date         : 2016.11.23
			 * @author	     : 이정운
			 * @param options: 옵션정보
			 * @param data   : 마커정보
			 * @history 	 :
			 */
			doComplexDetailInfo :function (options, data){
				$.each($(".industryDetailStep01").find("dt"), function(i){
					$(this).children("a").addClass("on");
				});
				$.each($(".industryDetailStep01").find("dd"), function(){
					$(this).css("display","none");
				});	
				$.each($(".industryDetailStep02").find("dt"), function(i){
					$(this).children("a").removeClass("on");
				});
				$.each($(".industryDetailStep02").find("dd"), function(){
					$(this).css("display","block");
				});
				
				//데이터보드 타이틀설정
				var title = data.sido_nm + " "+ data.sgg_nm+ " - " + data.complex_nm;
				$("#industryDetailDiv > .areaBox").html(title);
				
				//산업단지내 기술업종 증감현황
				var title = "["+data.complex_nm+"] 산업단지 내 기술업종 증감현황";
				$("#industryIrds").html(title);
				
				//산업단지 내 기술업종 분포현황
				var title = "["+data.complex_nm+"] 산업단지 내 기술업종 분포현황";
				$("#industrySpiderRate").html(title);
				
				//산업단지 내 기술업종 상세현황
				var title = "["+data.complex_nm+"] 산업단지 내 기술업종 상세현황";
				$("#industryDetailInfo").html(title);
				
				//산업단지 내 주요시설 현황
				var title = "["+data.complex_nm+"] 산업단지 내 기술업종 주요시설 현황";
				$("#industryMainFacility").html(title);
				
				//2017.10.12 개발팀 추가
				//산업단지 입지계수 현황 
				var title = "["+data.complex_nm+"]  입지계수 현황 "
				$("#industryLctDetailIrds").html(title);
				//2017.10.12 개발팀 추가 종료
				
				//첨단기술로 선택
				for (var i=1; i<=7; i++) {
					if ($("#industryDetailStateTab_Btn0"+i).hasClass("on")) {
						$("#industryDetailStateTab_Btn0"+i).removeClass("on");
					}
				}
				$("#industryDetailStateTab_Btn01").addClass("on");
				
				options.params["map"] = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				$technicalBizMap.ui.doSupplyMarkerClear();
				$technicalBizMapApi.request.OpenApiIndustryBoundary(data, options.params.map);					   				   //산업단지 경계정보
				$technicalBizMapApi.request.openApiSupplyPoiInIndustyBoundary(data, options.params.map);
				$technicalBizDataBoardApi.request.industryVariationStateLineChart('1', data.complex_no, data.complex_nm);		   //산업단지 내 기술업종 증감현황
				$technicalBizDataBoardApi.request.industryDistributionStateRadialShapeChart(data.complex_no, data.complex_nm);	   //산업단지 내 기술업종분포현황
				$technicalBizDataBoardApi.request.industryDetailStateBarChart('1', data.complex_no, data.complex_nm);			   //산업단지 내 상세정보현황
				$technicalBizDataBoardApi.request.industryImportantFacilityStateBarChart(data.complex_no, data.complex_nm); 	   //산업단지 내 중요시설현황
				
				//2017.10.11 개발팀 추가
				//기존 지역 종합 통계정보 , 주요지원시설현황, 산업단지 목록 숨기기
				//보여주는것 기술업종별 사업체,종사자 증감  and 기술업종별 입지계수
				//해당 산업단지의 전국 또는 소속시 기준의 입지계수 그리기 최초 실행
				$("#industryLctDetailStandard > a").eq(0).addClass("on");
				$("#industryLctDetailStandard > a").eq(1).removeClass("on");
				$technicalBizDataBoardApi.request.technicalBizIndustryDetailLctChart(options,data);
				//2017.10.11 개발팀 추가 종료
				
				$("#industryDiv").hide();
				$('.popUpIndustry').hide();
				$("#industryDetailDiv").show();
				$(".industryDetailStep02").show();
			},
			
			industryLctDetailChartStandardChange : function(number){
				var standardList = $("#industryLctDetailStandard > a");
				
				for(var i = 0; i < standardList.length; i++){
					$("#industryLctDetailStandard > a").eq(i).removeClass("on");
				}
				$("#industryLctDetailStandard > a").eq(number).addClass("on");
				
				var options = $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options;


				var markerGroup = options.marker;
				
				var pageNo =  $("#industryAreaSynthesizeStatsDetailInfoChart04Div").attr("data-page");
				var index = $("#industryAreaSynthesizeStatsDetailInfoChart04Div").attr("data-index");
				var marker = null;
				for (var i=0; i<markerGroup[pageNo].length; i++) {
					if (index == i) {
						marker = markerGroup[pageNo][i];
						break;
					}
				}
				
				$technicalBizDataBoardApi.request.technicalBizIndustryDetailLctChart(options,marker);
			},
			
			
			changeSearchDetailAreaInfoTab02 : function(type01){
				
				$(".searchDetailStatsInfoTab02").removeClass("on");
				$("#searchDetailStatsInfoTab02_Btn0"+type01).addClass("on");
				if(type01 == "1"){
					this.changeSearchDetailArea("0");
				}else if(type01 == "2"){
					this.changeSearchDetailAreaPieChart("0");
				}else if(type01 == "3"){
					this.changeSearchDetailAreaVariateLineChart("0");
				}else if(type01 == "4"){
					this.changeSearchDetailAreaBizLctChart("country");
				}
			},
			
			
			changeSearchDetailAreaInfoTab03 : function(type03){
				
				var detailInfoTab = $(".searchDetailStatsInfoTab02");
				var type01 = 0;
				for(var i = 0; i < detailInfoTab.length; i++){
					if($(detailInfoTab[i]).hasClass("on")){
						type01 = Number(i) + 1;
					}
				}
				
				if(type01 == "1"){
					this.changeSearchDetailArea(type03);
				}else if(type01 == "2"){
					this.changeSearchDetailAreaPieChart(type03);
				}else if(type01 == "3"){
					this.changeSearchDetailAreaVariateLineChart(type03);
				}else if(type01 == "4"){
					this.changeSearchDetailAreaBizLctChart("country");
				}
			},
			
			
			/**
			 * @name         : searchDetailArea
			 * @description  : 검색 지역 상세 보기
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @history 	 :
			 */
			searchDetailArea : function(adm_cd, adm_nm){
				$("#mapDataStandard").show();
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				var params = {
						year : companyDataYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						map : map
				}
				var type01 = "1";
				var type03 = "0";
				params.type01 = type01;
				params.type03 = type03;
				
				$("#technicalSearchDetail").data("admCd" ,adm_cd);
				$("#technicalSearchDetail").data("adm_nm" ,adm_nm);
				//해당 시군구 종사자수 및 사업체수
				
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				
				
				var tmpLayer = null;
				if($technicalBizMap.ui.searchDetailLayer == null){
					if (map.multiLayerControl.dataGeojson != null) {
						for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
							map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
								if (layer.feature.properties.adm_cd == adm_cd) {
									tmpLayer = layer;
								}
							});
						}
					}
					$technicalBizMap.ui.searchDetailLayer = tmpLayer;
				}else{
					tmpLayer = $technicalBizMap.ui.searchDetailLayer;
				}
					
				
				var x = tmpLayer.feature.properties.x;
				var y = tmpLayer.feature.properties.y;
					
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				$technicalBizMap.ui.doNormalMapInit();
				params.x = x;
				params.y = y;
				$technicalBizDataBoardApi.request.searchDetailAreaSggCnt(params);
				$technicalBizDataBoardApi.request.searchDetailSupplyIndustryPerInfo(params);
				
				$technicalBizDataBoardApi.request.searchDetailAreaTechnical(params,type01,type03);
				
				
				
				var param = $technicalBizDataBoard.ui.searchOption
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				
				var searchOption = {
						is_contain_bizfac : param.is_contain_bizfac,
						is_contain_induscom : param.is_contain_induscom,
						from_corp_lq : param.param.from_corp_lq,
						from_worker_lq : param.param.from_worker_lq,
						to_corp_lq : param.param.to_corp_lq,
						to_worker_lq : param.param.to_worker_lq,
						selectInfoType : param.selectInfoType,
						techbiz_class_cd : param.techbiz_class_cd,
						option1 : param.option1,
						option2 : param.option2,
				};
				
				
				$("#bookmarkBtn").hide();
				/*var shareInfoOption = {
						url : "/ServiceAPI/technicalBiz/getRegionLq.json",
						map : map,
						params : {
							searchOption : searchOption,
							idx : 1, 
							adm_cd : adm_cd.toString(),
							adm_nm : adm_nm
						}
				};
				
				
				
				map.shareInfo.setTechnicalBizShareInfo(shareInfoOption,"search",map.id);*/
				
			},
			
			
			/**
			 * @name         : searchDetailAreaBookMark
			 * @description  : 검색 지역 즐겨찾기 보기
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @history 	 :
			 */
			searchDetailAreaBookMark : function(adm_cd, adm_nm,layer,mIdx,sIdx){
				$("#mapDataStandard").show();
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				var params = {
						year : companyDataYear,
						adm_cd : adm_cd.toString().substring(0,5),
						adm_nm : adm_nm,
						map : map
				}
				var type01 = Number(mIdx) +1;
				var type03 = sIdx;
				params.type01 = type01;
				params.type03 = type03;
				
				$("#technicalSearchDetail").data("admCd" ,adm_cd);
				$("#technicalSearchDetail").data("adm_nm" ,adm_nm);
				//해당 시군구 종사자수 및 사업체수
				
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				
				
				/*var tmpLayer = null;
				if($technicalBizMap.ui.searchDetailLayer == null){
					if (map.multiLayerControl.dataGeojson != null) {
						for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
							map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
								if (layer.feature.properties.adm_cd == adm_cd) {
									tmpLayer = layer;
								}
							});
						}
					}
					$technicalBizMap.ui.searchDetailLayer = tmpLayer;
				}else{
					tmpLayer = $technicalBizMap.ui.searchDetailLayer;
				}*/
					
				
				var x = layer.feature.properties.x;
				var y = layer.feature.properties.y;
					
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				$technicalBizMap.ui.doNormalMapInit();
				params.x = x;
				params.y = y;
				$technicalBizDataBoardApi.request.searchDetailAreaSggCnt(params);
				$technicalBizDataBoardApi.request.searchDetailSupplyIndustryPerInfo(params);
				
				switch(type01){
					case 1 :
						$technicalBizDataBoardApi.request.searchDetailAreaTechnical(params,type01,type03);
						break;
					case 2 :
						$technicalBizDataBoardApi.request.searchDetailAreaPieChart(params,type01,type03);
						break;
					case 3 :
						$technicalBizDataBoardApi.request.searchDetailAreaVariateLineChart(params,type01,type03);
						break;
					case 4 :
						$technicalBizDataBoardApi.request.searchDetailAreaTechnical(params,type01,type03);
						break;
				}
				
				
				
				
				var param = $technicalBizDataBoard.ui.searchOption
				/*var dataArray = $technicalBizDataBoard.ui.searchDataArray;*/
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				
				
				setTimeout(function(){ $technicalBizDataBoard.event.dataBoardOpen(); }, 2000);
				var searchOption = {
						is_contain_bizfac : param.is_contain_bizfac,
						is_contain_induscom : param.is_contain_induscom,
						from_corp_lq : param.param.from_corp_lq,
						from_worker_lq : param.param.from_worker_lq,
						to_corp_lq : param.param.to_corp_lq,
						to_worker_lq : param.param.to_worker_lq,
						selectInfoType : param.selectInfoType,
						techbiz_class_cd : param.techbiz_class_cd,
						option1 : param.option1,
						option2 : param.option2,
				};
				
				

				var shareInfoOption = {
						url : "/ServiceAPI/technicalBiz/getRegionLq.json",
						map : map,
						params : {
							searchOption : searchOption,
							idx : 1, 
							adm_cd : adm_cd.toString(),
							adm_nm : adm_nm
						}
				};
				
				
				
				map.shareInfo.setTechnicalBizShareInfo(shareInfoOption,"search",map.id);
				
			},
			
			
			/**
			 * @name         : changeSearchDetailArea
			 * @description  : 검색 지역 상세 보기
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @history 	 :
			 */
			changeSearchDetailArea : function(type03){
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				var adm_cd = $("#technicalSearchDetail").data("admCd");
				var adm_nm = $("#technicalSearchDetail").data("adm_nm");
				var params = {
						year : companyDataYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						map : map
				}
				var type01 = "1";
				params.type01 = type01;
				params.type03 = type03;
				$technicalBizDataBoardApi.request.searchDetailAreaTechnical(params,type01,type03);
			},
			
			changeSearchDetailAreaPieChart : function(type03){
				
				var type01 = "2";
				
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				var adm_cd = $("#technicalSearchDetail").data("admCd");
				var adm_nm = $("#technicalSearchDetail").data("adm_nm");
				var params = {
						year : companyDataYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						map : map
				}
				params.type01 = type01;
				params.type03 = type03;
				$technicalBizDataBoardApi.request.searchDetailAreaPieChart(params,type01,type03);
				
			},
			
			
			changeSearchDetailAreaVariateLineChart : function(type03){
				var type01 = "3";
				
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				var adm_cd = $("#technicalSearchDetail").data("admCd");
				var adm_nm = $("#technicalSearchDetail").data("adm_nm");
				var params = {
						year : companyDataYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						map : map
				}
				params.type01 = type01;
				params.type03 = type03;

				$technicalBizDataBoardApi.request.searchDetailAreaVariateLineChart(params,type01,type03);
					
			},
			
			changeSearchDetailAreaBizLctChart : function(region){
				var type01 = "4";
				var type03 = "0"
				var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
				var adm_cd = $("#technicalSearchDetail").data("admCd");
				var adm_nm = $("#technicalSearchDetail").data("adm_nm");
				var params = {
						year : companyDataYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						map : map
				}
				params.type01 = type01;
				params.type03 = type03;
				
				if(region == "sido"){
					$("#searchDetailStatsInfoChart04Div >.chartAreaRela >.compareBox > .noneAreaBox > .dbTabs > a").eq(0).removeClass("on");
					$("#searchDetailStatsInfoChart04Div >.chartAreaRela >.compareBox > .noneAreaBox > .dbTabs > a").eq(1).addClass("on");
				}else{
					$("#searchDetailStatsInfoChart04Div >.chartAreaRela >.compareBox > .noneAreaBox > .dbTabs > a").eq(0).addClass("on");
					$("#searchDetailStatsInfoChart04Div >.chartAreaRela >.compareBox > .noneAreaBox > .dbTabs > a").eq(1).removeClass("on");
				}
				$technicalBizDataBoardApi.request.searchDetailAreaBizLctChart(params,type01,type03);
			},
			
			/**
			 * @name         : changeShowChartTable
			 * @description  : 입지계수차트 표 전환
			 * @date         : 2017.12.06
			 * @author	     : 최재영
			 * @history 	 :
			 */
			changeShowChartTable : function(id,idx){
				var showId = "";
				var hideId = "";
				
				if(idx == "1"){
					showId = "#"+id+"_"+idx;
					hideId = "#"+id+"_2";
					$(hideId).hide();
					$(showId).show();
					$(showId).parent().find(".ar").css("margin-left", "35px"); //2018.01.15 [개발팀]
					$(showId).parents(".compareBox").find(".combineGrid").hide();
				}else{
					showId = "#"+id+"_"+idx;
					hideId = "#"+id+"_1";
					$(showId).parent().find(".ar").css("margin-left", "-20px"); //2018.01.15 [개발팀]
					$(showId).parents(".compareBox").find(".combineGrid").show();
				}
				$(hideId).hide();
				$(showId).show();
			},
			
			//========== 2018.01.15 [개발팀] 기능추가 START =============//
			/**
			 * @name         : supplyChangeLqChart
			 * @description  : 지원시설 입지계수차트 변경 
			 * @date         : 2018.01.15
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 : 주무관 요청에 의한 기능변경
			 */
			supplyIndustryChangeLqChart : function(sido_cd, sido_nm, regionType, type) {
				$("#"+type+"LqInfoChartStandardButton > a").removeClass("on");
				if (regionType == "country") {
					$("#"+type+"LqInfoChartStandardButton > a").eq(0).addClass("on");
				}else {
					$("#"+type+"LqInfoChartStandardButton > a").eq(1).addClass("on");
				}
				
				var options = {
						params : {
							adm_cd : sido_cd,
							adm_nm : sido_nm,
							year : companyDataYear
						}
				};
				
				if (type == "supply") {
					$technicalBizDataBoardApi.request.technicalBizLctChart(options, null, null, regionType);
				}else {
					$technicalBizDataBoardApi.request.technicalBizIndustryLctChart(options, null, null, regionType);
				}
				
			}
			//========== 2018.01.15 [개발팀] 기능추가 END =============//	
	};
	
	//2018.01.15 [개발팀] 
	$technicalBizDataBoard.util = {
			
		/**
		  * 
		  * @name         : tableSortable
		  * @description  : 테이블 정렬 수행
		  * @date         : 2018. 01. 15. 
		  * @author	      : 권차욱 
		  * @history 	  :
		  * @param id	  : 엘리먼트 아이디
		  */		
		tableSortable : function(id) {
			var table = $(id);
			table.find(".th").click(function() {
				var n = $(this).index();
				var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
				  switching = true;
				  dir = "asc"; 
				  while (switching) {
				    switching = false;
				    rows = table.find("tr");

				    for (i = 1; i < (rows.length - 1); i++) {
				      shouldSwitch = false;
				      x = $(rows[i]).find("td").eq(n);
				      y = $(rows[i + 1]).find("td").eq(n);

				      if (dir == "asc") {
				        if (parseFloat(x.html()) > parseFloat(y.html())) {
				          shouldSwitch= true;
				          break;
				        }
				      } else if (dir == "desc") {
				        if (parseFloat(x.html()) < parseFloat(y.html())) {
				          shouldSwitch= true;
				          break;
				        }
				      }
				    }
				    if (shouldSwitch) {
				      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				      switching = true;
				      switchcount ++; 
				    } else {
				      if (switchcount == 0 && dir == "asc") {
				        dir = "desc";
				        switching = true;
				      }
				    }
				  }
			});
		}
	};

	$technicalBizDataBoard.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
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
			        	$(".dataSideBox, .bizStatsDataBoard").css("opacity", ui.value*0.1);
				    }
			    });
				$(".dataSideBox, .bizStatsDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
				
				//닫기 버튼
				body.on("click",".dataSideBox .bar>a",function(){ 
					$(".dataSideBox").stop().animate({"right":"-1500px"},200);
					$(".bizStatsDataBoard").removeClass("on").stop().animate({"right":"0"},200);
					
					//2017.08.31 개발팀 추가 시작
					//데이터 보드 닫기시 css 변경
					$("#mapDataStandard").css("right", "135px");
					//2017.08.31 개발팀 추가 종료
				});
				
				//탭 열고 닫기
				body.on("click",".dscList dt>a",function(){
					$(this).toggleClass("on");
					$(this).parents("dt").next("dd").slideToggle();
				});
				
				//데이터보드 열고 닫기
				body.on("click",".bizStatsDataBoard",function(){ 
					var ck = $(this).hasClass("on");
					//데이터 보드 오픈시 css 변경
					//2017.08.31 개발팀 추가 시작
					$("#mapDataStandard").stop().animate({"right" : "560px"}, 200);
					//2017.08.31 개발팀 추가 종료
					if(!ck){
						//일반 데이터보드
						$(".dataSideBox").stop().animate({"right":"0"},200);
						$(this).addClass("on").stop().animate({"right":"426px"},200);	
					}else{
						//데이터보드 닫기
						$(".dataSideBox").stop().animate({"right":"-1500px"},200);
						$(this).removeClass("on").stop().animate({"right":"0"},200);
						$("#mapDataStandard").stop().animate({"right" : "135px"}, 200);
					}
				});
				
				//차트/표 토글
				body.on("click",".typeBox>a",function(){ 
					/*$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
					$(this).addClass("on");
					var ck = $(this).index(".typeBox>a")+1;
					$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
					$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
					if(ck%2){
						$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
					}else{
						$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
					}*/
					
					$(this).parents(".compareBox > .typeBox").find("a").removeClass("on");
					$(this).addClass("on");
					var ck = $(this).index(".typeBox>a")+1;
					$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
					$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
					if(ck%2){
						$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
						
						$(this).parents(".compareBox").find(".combineGrid").attr('style','display:none; overflow:hidden;');
						$(this).parents(".compareBox").find(".combineGrid").find(".btn_excelDownload").hide();
					}else{
						$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
						
						$(this).parents(".compareBox").find(".combineGrid").attr('style','margin-top:-50px; display:block; overflow:visible;');
						$(this).parents(".compareBox").find(".combineGrid").find(".btn_excelDownload").show();
					}
					
			    });
				
				//데이터보기 엑셀 다운로드
				body.on("click",".btn_excelDownload", function(){
					var myForm = document.excelDownForm;
					$("#excelDownForm").html("");
					
					var titleData = [];
					$(this).parents(".compareBox").eq(0).find('table').eq(0).find(".addSideLine.th").each(function(){
						if($(this).css("display")!= "none"){
							titleData.push($(this).html());
						}
					});
					
					var excelDataElement = document.createElement("input");
					excelDataElement.type = "hidden";
					excelDataElement.name = "excelData";
					excelDataElement.value = titleData;
					myForm.appendChild(excelDataElement)
					
					$(this).parents(".compareBox").eq(0).find('table').eq(0).find("tr:not(.th)").each(function(){
						var contentData = [];
						
						$(this).find(".addSideLine").each(function(i){
							var tmpContentData = $(this).html();
								tmpContentData = tmpContentData.replace(/,/gi, "");
							contentData.push(tmpContentData)
						});
						var excelDataElement = document.createElement("input");
						excelDataElement.type = "hidden";
						excelDataElement.name = "excelData";
						excelDataElement.value = contentData;
						myForm.appendChild(excelDataElement)
					});

					var url = "/view/technicalBiz/excelDown";
					window.open("" , "_self", "enabled"); 
					myForm.action = url; 
					myForm.method="post";
					myForm.target="_self";
					myForm.submit();
					
				});
				
				//업종밀집도 변화 년도 설정
				body.on("click", ".yearList div", function() {
					//전체 체크 해제
					$(".yearList input").prop("checked", false);
					$(this).prev().prop("checked", true);
					
					//선택 체크
					$(".yearList li").removeClass("on");
					$(this).parent().addClass("on");
					
					//메모리에 있는 조회정보 가져오기
					var themeCd = $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.themeCd;
					var themeNm = $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.themeNm;
					
					//업종밀집도 변화 재 조회
					$technicalBizDataBoard.ui.jobChangeThemeClick(themeCd, themeNm);
				});
				
				//업종별 증감 테마 슬라이더 (IE10 이하일 경우 fade)
				if(browserFnc() != -1 && browserFnc() < 11) {
					$(".bxslider").bxSlider({
						infiniteLoop: false,
						hideControlOnEnd: true,
						mode : "fade"
					});
				} else {
					//테마 슬라이더
					$(".bxslider").bxSlider({
						infiniteLoop: false,
						hideControlOnEnd: true
					});
				}
				
				//테마코드 클릭 이벤트 (업종별 증감)
				$(".theme_icon").click(function() {
					var imgLen = $(this).find("img").attr("src").length;
					var currThemeCd = $(this).find("img").attr("src").substring(imgLen-8, imgLen-4);
					var currThemeNm = $(this).find(".themeIconSpan").text();
					$("#areaInfoCompanyBxslider").find("span").each(function(i, b){
						$(b).css("color", "#999999");
					});
					$(this).css("color", "#00bcd4");
					
					//선택한 테마코드를 메모리에 저장
					$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.indecreaseThemeCd = currThemeCd;
					$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.indecreaseThemeNm = currThemeNm;
					
					//업종별 증감 차트 재 호출
					$technicalBizDataBoardApi.request.areaInfoCompanyIndecrease($technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.params);
				});
				
				//주택 거래가격 라디오버튼 선택 시
				$("input:radio[name='priceRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.priceRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$technicalBizDataBoardApi.request.areaInfoHousePrice($technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.params);
				});
				
				//주택 거래 동향 라디오버튼 선택 시
				$("input:radio[name='tradeRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.tradeRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$technicalBizDataBoardApi.request.areaInfoHouseTrade($technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.params);
				});
				
				//시군구별 기술업종현황 데이터보드 색상<->버블
				body.on("click", ".techLegendBox>div", function() {
					var id = $(this).attr("id");
					$(this).addClass("on");
					if (id == "techLegend_color") {
						if ($(".techLegend_bubble").hasClass("on")) {
							$(".techLegend_bubble").removeClass("on");
						}
						$technicalBizDataBoard.ui.changeLegend("color");
					}else {
						if ($(".techLegend_color").hasClass("on")) {
							$(".techLegend_color").removeClass("on");
						}
						$technicalBizDataBoard.ui.changeLegend("bubble");
					}
				});
				
				//지원시설 조회 - 창업지원시설현황 탭 - 체크박스
				$("body").on("click",".chgCkbox a",function(){
					var ck = $(this).hasClass("on");
					if(ck){
						$(this).removeClass("on");
					}else{
						$(this).addClass("on");
					}
				});
				
				//지원시설 조회 - 창업지원시설현황 탭 - 체크박스
				body.on("click", "a[id ^= startUpSupplyLctType_]", function() {
					
					/*if($(this).hasClass("on")){
						$(this).removeClass("on");
					}else{
						$(this).addClass("on");
					}*/
					
					var lctType = '';
					
					$("a[id ^= startUpSupplyLctType_]").each(function(){
						if($(this).hasClass("on")){
							if('' != lctType){
								lctType += ",";
							}
							lctType += $(this).attr("id").split("_")[1];
						}
					});

					if (lctType != "") {
						$technicalBizDataBoardApi.request.startUpSupplyBarChart(lctType);
					}else{
						//2017.03.14j 기술업종통계지도 - 지원시설조회 - 창업시설현황을 모두 다 Disable 할 경우
						$technicalBizDataBoardApi.request.startUpSupplyBarChart("0");
					}
					$technicalBizMap.ui.doChangeSupplyMarker(lctType);
					
				});
				
				
				
				//지원시설 목록 리스트 선택 이벤트
				body.on("click", ".supplyList", function() {
					var id = $(this).attr("id");
					if (id != undefined) {
						var marker_no = parseInt(id.split("_")[1]);
						if ($technicalBizMap.ui.markerGroup1 != undefined || 
							$technicalBizMap.ui.markerGroup1 != null) {
							$technicalBizMap.ui.markerGroup1.eachLayer(function(marker){
								if (marker.no == marker_no) {
									marker.fire("click");
								}
							});
						}
						
					}
				});
				
				//산업단지 목록 리스트 선택 이벤트
				body.on("click", ".industryList", function() {
					var id = $(this).attr("id");
					if (id != undefined) {
						var marker_no = parseInt(id.split("_")[1]);
						if ($technicalBizMap.ui.industryMarkerGroup != undefined || 
							$technicalBizMap.ui.industryMarkerGroup != null) {
							
							if (Object.prototype.toString.call($technicalBizMap.ui.industryMarkerGroup) === "[object Array]") {
								for (var i=0;i <$technicalBizMap.ui.industryMarkerGroup.length; i++) {
									$technicalBizMap.ui.industryMarkerGroup[i].eachLayer(function(marker){
										if (marker.no == marker_no) {
											marker.fire("click");
										}
									});
								}
							}else {
								$technicalBizMap.ui.industryMarkerGroup.eachLayer(function(marker){
									if (marker.no == marker_no) {
										marker.fire("click");
									}
								});
							}
						}
						
					}
				});
			},
			
			/**
			 * 
			 * @name         : dataBoardOpen
			 * @description  : 데이터보드를 오픈한다. 
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			dataBoardOpen : function() {
				pageCallReg();
				//데이터 보드가 닫혀있을 경우 오픈한다.
				if(!$(".bizStatsDataBoard").hasClass("on")) {
					$(".bizStatsDataBoard").click();
					$("#dataBoard").show();
				}
			},
			
			/**
			 * 
			 * @name         : dataBoardClose
			 * @description  : 데이터보드를 클로즈한다. 
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			dataBoardClose : function() {
				//데이터 보드가 닫혀있을 경우 오픈한다.
				if($(".bizStatsDataBoard").hasClass("on")) {
					$(".bizStatsDataBoard").click();
					$("#dataBoard").hide();
				}
			},
			
			
			//2017.08.30 최재영 추가
			/**
			 * 
			 * @name         : checkClass
			 * @description  : 데이터보드 UI에서 산업별 체크 박스 선택 이벤트 
			 * @date         : 2017. 08. 30. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param
			 */	
			checkClass : function(checkVal){
				var checkAble = true;
				for(var i = 0; i < $technicalBizDataBoardApi.example.checkClassCd.length; i++){
					if($technicalBizDataBoardApi.example.checkClassCd[i] == checkVal){
						checkAble = false;
						$("#check_"+checkVal).removeClass("on");
						$technicalBizDataBoardApi.example.checkClassCd.splice(i,1);
					}
				}
				if(checkAble == true){
					$("#check_"+checkVal).addClass("on");
					$technicalBizDataBoardApi.example.checkClassCd.push(checkVal);
				}
				$technicalBizDataBoard.ui.changeSidoEconomyChart('sales', 0);
			}
			
	};
}(window, document));