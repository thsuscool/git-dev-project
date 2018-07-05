/**
 * 
 */
(function(W, D) {
	W.$reportForm = W.$reportForm || {}

	$reportForm.UI = {
				cssList : [],
				jsList : [],
				mapWidthSize : 800,
				mapHeightSize : 500,
				datas : {},			//조회 정보를 담는 변수
				rgeoCnt : 0,		//리버스 지오코드가 실행 된 횟수
				reportMapCss : "",		//지도 CSS
				
				//CSS 추가
				addCss : function(el) {
					this.cssList.push(el);
				},
				
				//JS 추가
				addJs : function(el) {
					this.jsList.push(el);
				},
				
				//보고서 그리기 (실행)
		 		draw : function(options) {
		 			options = this.datas;
		 			
		 			var viewMapId = "";
		 			var mapInfoId = "";
		 			
		 			//mapInfoId 고유 아이디 가져오기
		 			mapInfoId = $interactiveMap.ui.mapList[options.mapId].mapInfo.id
		 			
		 			if(options.mapId == "0") {
		 				viewMapId = "#mapRgn_1";
		 			} else if(options.mapId == "1") {
		 				viewMapId = "#mapRgn_2";
		 			}
		 			
		 			//전체지도 복제
		 			var cloneMap = $(viewMapId).clone();
		 	 		$(cloneMap).removeClass("mapareaboxd").addClass("mapareaboxdClone");		//최상위 클래스 명칭 변경
		 	 		$(cloneMap).find(".map_dummy").css("padding-top", "0px");	//지도를 상단에 붙이기
		 	 		$(cloneMap).find(".map_remark").hide();	//지도 설정창 숨기기
		 	 		$(cloneMap).find(".map_remark_notice").hide();		//안내문 숨기기
		 	 		$(cloneMap).find(".sop-control-container").hide();		//지도 컨트롤러 숨기기
		 	 		var originalMapWidth = $(viewMapId).css("width").replace("px", "");
		 	 		var originalMapHeight = $(viewMapId).css("height").replace("px", "");
		 	 		
		 	 		//범례 복사
		 	 		var cloneLegend = $(cloneMap).find("#legend_"+mapInfoId).find(".remarkbox").clone();
		 	 		$(cloneLegend).find(".remarks_tit").hide();		//범례 상단 숨김
		 	 		$(cloneLegend).find(".btn_remark_offset").hide();	//최소화 버튼 숨김
		 	 		$(cloneLegend).find(".remarks_list > ul > li").css("background-color", "#fff");		//범례 색상 흰색으로
		 	 		
		 	 		//pie차트 복사
		 	 		var clonePie = "";
		 	 		if(options.isPieChart) {
		 	 			clonePie = $(cloneMap).find("#pieChart_"+mapInfoId).find(".graphbox").clone();
		 	 			$(clonePie).find(".rollover").hide();		//최소화 버튼 숨김
		 	 			$(clonePie).find(".graph_tit").hide();		//타이틀 숨김
		 	 			$(clonePie).find(".graph_txt").hide();	//상단 설명 숨김
		 	 		}
		 	 		//bar차트 복사
		 	 		var cloneBar = "";
		 	 		//범례 결합일 경우에도 차트는 안보여짐
		 	 		if(options.isBarChart || options.data.length == 1) {
		 	 			cloneBar = $(cloneMap).find("#barChart_"+mapInfoId).find(".graphbox_bar").clone();
		 	 			$(cloneBar).find(".rollover").hide();		//최소화 버튼 숨김
		 	 			$(cloneBar).find(".graph_txt").hide();	//상단 설명 숨김
		 	 		} 
		 	 		
		 	 		//보고서 제목
		 	 		if(options.reportInfo.title === undefined) {
		 	 			options.reportInfo.title = "보고서명 : " + $(cloneMap).find("#searchTitle_"+mapInfoId).find(".hidden_title_txt").text();
		 	 		}
		 	 		
		 	 		//검색조건
		 	 		if(options.reportInfo.searchCondition === undefined) {
		 	 			options.reportInfo.searchCondition = $(cloneMap).find("#searchTitle_"+mapInfoId).find(".hidden_title_txt").text();
		 	 		}
		 	 		
		 	 		//출처
		 	 		if(options.reportInfo.origin === undefined) {
		 	 			options.reportInfo.origin = $(cloneMap).find("#searchTitle_"+mapInfoId).find(".reference_txt").text();
		 	 		}
		 	 		options.reportInfo.origin = (options.reportInfo.origin).replace("출처 : ", "").replace("(통계표보기)", "");
		 	 		
		 	 		//단위
		 	 		if(options.reportInfo.unit === undefined) {
		 	 			options.reportInfo.unit = [];
		 	 			options.reportInfo.unit.push($(cloneLegend).find(".legend_unit").text().replace("(단위: ", "").replace(")", ""));
		 	 			if(options.mapInfoId.length > 1) {	//맵 분할일 경우
		 	 				options.reportInfo.unit.push($(cloneLegend2).find(".legend_unit").text().replace("(단위: ", "").replace(")", ""));
		 	 			}
		 	 		}
		 	 		
		 	 		/** 지역 & 데이터 매핑 세팅 **/
		 	 		for(var i = 0; i < options.data.length; i ++) {
		 	 			options.data[i] = $reportForm.Util.admCdSet(options.admCdList, options.data[i]);
		 	 		}
		 	 		
		 	 		/** 데이터 표 세팅 (일반 조회일 경우만) **/
		 	 		if(options.data.length == 1) {
		 	 			for(var i = 0; i < options.data.length; i ++) {
		 	 				options.data[i] = $reportForm.Util.tableDataSort(options.data[i]);
		 	 			}	
		 	 		}
		 	 		
		 			var html = "";
		 			html += "<!DOCTYPE html>";
		 			html += "<html lang='ko'>";
		 			html += "	<head>";
		 			html += "		<meta charset='utf-8'>";
		 			html += "		<meta name='format-detection' content='telephone=no' />";
		 			html += "		<meta http-equiv='X-UA-Compatible' content='IE=edge' />";
		 			html += "		<script type='text/javascript' src='/js/plugins/jquery.min.js'></script>";
		 			html += "		<script type='text/javascript' src='/js/common/reportFormEvent.js'></script>";
		 			html += "		<link href='/css/reportForm.css' rel='stylesheet' type='text/css' />"; 
		 			html += "		<link rel='stylesheet'  href='/js/plugins/jquery-easyui-1.4/sop.css' />";
		 			html += "		<link rel='stylesheet' type='text/css' href='/css/common.css'>"; 
		 			html += "		<style type='text/css' media='print'>@page{size:auto;margin:10mm;}body{margin:0;}</style>"; 
		 			//CSS 추가
		 			for(var i = 0; i < this.cssList.length; i ++) {
		 				html += this.cssList[i];
		 			}
		 			//JS 추가
		 			for(var i = 0; i < this.jsList.length; i ++) {
		 				html += this.jsList[i];
		 			}
		 			html += "	</head>";
		 			html += "	<body>"; 
		 			html += "	<div class='hiddenArea'>"+$(cloneBar).html()+"</div>";		//IE에러 때문에 안보이는곳에 먼저 띄움
		 			html += "	<div id='wrap'>";
		 			html += "	    <div class='printArea'>";
		 			html += "	    	<div class='pntPage'>"; 
		 			html += "				<h1 class='pntHeader'><img src='/img/common/logo.gif' alt='SGIS 오픈플랫폼'></h1>";	 
		 			html += "				<div class='pntBtn'><a href='javascript:$reportFormEvent.UI.reportPrint();'>인쇄</a><a href='javascript:$reportFormEvent.UI.reportClose();'>닫기</a></div>";
		 			html += "				<p class='pntURI'>통계지리정보서비스 (https://sgis.kostat.go.kr)</p>";
		 			//html += "				<h2 class='pntTitle'><input type='text' value='"+options.reportInfo.title+"'/></h2>";
		 			html += "				<h2 class='pntTitle'><textarea cols='60' rows='1'>"+options.reportInfo.title+"</textarea></h2>";
		 			html += "				<table class='pntTable' summary='보고서제목,검색조건,작성일자,출처,작성자'>";
		 			html += "					<caption>대화형 통계지도 검색 결과 보고서</caption>";
		 			html += "					<colgroup>";
		 			html += "						<col width='120' />";
		 			html += "						<col width='' />";
		 			html += "						<col width='120' />";
		 			html += "						<col width='' />";
		 			html += "					</colgroup>";
		 			html += "					<tbody>";
		 			html += "						<tr>";
		 			html += "							<th scope='col'>검색조건</th><td class='ac' colspan='3'>"+options.reportInfo.searchCondition+"</td>";
		 			html += "						</tr>";
		 			html += "						<tr>";
		 			html += "							<th scope='col'>출처</th><td class='ac' id='origin'>"+options.reportInfo.origin+"</td>";
		 			html += "							<th scope='col'>작성일자</th><td class='ac'>"+$reportForm.Util.getToday()+"</td>";
		 			html += "						</tr>";
		 			html += "					</tbody>";
		 			html += "				</table>"; 
		 			html += "				<div class='pntMap'><div id='reportMapDiv'>"+$(cloneMap).html()+"</div></div>";
		 			html += "				<div class='pntLeft'>";
		 			//범례 결합일 경우
		 			if(options.data.length > 1) {
		 				html += "					<h3>범례</h3>";
		 			} else {
		 				html += "					<h3>범례 (단위 : " + options.reportInfo.unit[0] + ")</h3>";
		 			}
		 			html += "					<div class='pntLegend remarkbox' style='display: block; position: relative;'>";
		 			html +=							$(cloneLegend).html();
		 			html +=	"					</div>";
		 			html += "				</div>";
		 			if(options.isBarChart) {	//막대차트
			 			html += "			<div class='pntRight mt60'>";
			 			html += "				<h3>지역별 그래프</h3>"; 
			 			html += "				<div class='pntChart'><div id='barChartDiv'>"+$(cloneBar).html()+"</div></div>";
			 			html += "			</div>";
		 			}
		 			html += "			</div>";
		 			
		 			
		 			html += "			<div class='pntPage'>";
		 			html += "				<div class='pntData'>";
		 			html += "					<div class='pntDataBox fc'>";
		 			html += "						<table class='pntTable' summary='항목,순위,값(명), 비율(%)'>";
		 			html += "							<caption>데이터 표1</caption>";
		 			html += "							<colgroup>";
		 			html += "								<col width='' />";
		 			html += "								<col width='120' />";
		 			html += "								<col width='120' />";
		 			//대화형통계지도일 경우
	 	 			if(options.mapType == "interactive") {
	 	 				html += "							<col width='120' />";
	 	 			}
		 			html += "							</colgroup>";
		 			html += "							<tbody>";
		 			//일반 데이터일 경우
		 			if(options.data.length == 1) {
				 		//대화형통계지도일 경우
		 	 			if(options.mapType == "interactive") {
		 	 				html += "								<tr>";
		 	 				html += "									<th scope='col'>지역 " + options.admNm +"</th>";	
				 			html += "									<th scope='col'>순위</th>";
				 			html += "									<th scope='col'>단위("+options.reportInfo.unit[0]+")</th>";
				 			html += "									<th scope='col'>비율(%)</th>";
		 	 				html += "								</tr>";
				 			html += "								<tr>";
				 			html += "									<td colspan='2'>합계</td>";
			 				html += "									<td>"+$reportForm.Util.addComma($reportForm.Util.tableDataSum(options.data[0]))+"</td>";
			 	 			html += "									<td>100</td>";
				 			html += "								</tr>";
		 	 			} else if(options.mapType == "KOSIS") {
		 	 				//코시스일 경우
		 	 				html += "								<tr>";
			 				html += "									<th scope='col'>지역</th>";
				 			html += "									<th scope='col'>순위</th>";
				 			html += "									<th scope='col'>단위("+options.reportInfo.unit[0]+")</th>";
		 	 				html += "								</tr>";
		 	 			}
		 			} else if(options.data.length > 1) {
		 				//범례결합일 경우
		 				html += "								<tr>";
		 				html += "									<th scope='col'>지역</th>";
			 			html += "									<th scope='col'>색상</th>";
			 			html += "									<th scope='col'>단위("+options.reportInfo.unit[0]+")</th>";
			 			html += "									<th scope='col'>단위("+options.reportInfo.unit[1]+")</th>";
			 			html += "								</tr>";
			 			html += "								<tr>";
			 			html += "									<td colspan='2'>합계</td>";
		 				html += "									<td>"+$reportForm.Util.addComma($reportForm.Util.tableDataSum(options.data[0]))+"</td>";
		 				html += "									<td>"+$reportForm.Util.addComma($reportForm.Util.tableDataSum(options.data[1]))+"</td>";
			 			html += "								</tr>";
		 			}
		 			//html += "							</thead>";
		 			//html += "							<tbody>";
		 			//일반 데이터일 경우
		 			if(options.data.length == 1) {
		 				//표그리기
			 			for(var i = 0; i < options.data[0].length; i ++) {
			 				html += "<tr>";
			 				html += "	<td class='al'>"+options.data[0][i].item+"</td>";
			 				html += "	<td class='ar'><div class='valueBox'><span class='bg' style='background:"+options.data[0][i].color+"'></span><span class='txt'>"+(i+1)+"</span></div></td>";
			 				//Width 사이즈
			 				if(options.data[0][i].value == 0) {
			 					html += "	<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>N/A</span></td>";
			 				} else {
			 					html += "	<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(options.data[0][i].value/options.data[0][0].value*100)+"%; background:rgba(76,139,253,1); '></span><span class='txt'>"+$reportForm.Util.addComma(options.data[0][i].value)+"</span></td>";
			 				}
			 				//대화형통계지도일 경우
			 	 			if(options.mapType == "interactive") {
			 	 				html += "	<td class='ar'><div class='valueBox'><span class='txt'>"+options.data[0][i].rate+"</span></div></td>";
			 	 			}
			 				html += "</tr>";
			 			}
			 			
		 			} else if(options.data.length > 1) {
		 				//범례결합일 경우
		 				//표그리기
			 			for(var i = 0; i < options.data[0].length; i ++) {
			 				html += "<tr>";
			 				html += "	<td class='al'>"+options.data[0][i].item+"</td>";
			 				html += "	<td class='ar'><div class='valueBox'><span class='bg' style='background:"+options.data[0][i].color+"'></span><span class='txt'></span></div></td>";
			 				html += "	<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>"+$reportForm.Util.addComma(options.data[0][i].value)+"</span></td>";	
			 				html += "	<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>"+$reportForm.Util.addComma(options.data[1][i].value)+"</span></td>";
			 				html += "</tr>";
			 			}
		 			}
		 			
		 			html += "							</tbody>";
		 			html += "						</table>";
		 			html += "					</div>";
		 			html += "				</div>";
		 			html += "				<div class='pntCenter' id='memoDiv'>";
		 			html += "					<h3>메모</h3>"; 
		 			html += "					<textarea id='memo'></textarea>";
		 			html += "				</div>";
		 			//대화형통계지도일 경우
	 	 			if(options.mapType == "interactive") {
			 			html += "				<dl class='pntDl'>";
			 			html += "					<dt>※ 자료 이용시 유의사항</dt>";
			 			html += "					<dd>";
			 			html += "						<p>SGIS 오픈플랫폼에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업 등의 자료를 제외하고 최신경계를 반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다.";
			 			html += "						</p>";
			 			html += "						<ol>";
			 			html += "							<li>제외된 자료"; 
			 			html += "								<br />- 인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대";
			 			html += "								<br />- 사업체 센서스 : 개인 운수업(사업장이 일정치 않음)";
			 			html += "							</li>";
			 			html += "							<li>";
			 			html += "								최신 경계 반영에 따른 차이";
			 			html += "								<br />- SGIS는 최신 행정구역 경계에 맞추어 서비스 함에 따라 KOSIS 자료와 다를 수 있습니다.";
			 			html += "							</li>";
			 			html += "						</ol>";
			 			html += "					</dd>";
			 			html += "				</dl>";
	 	 			}
		 			html += "			</div>";
		 			html += "	    </div>";
		 			html += "	</div>";
		 			html += "	</body>";
		 			 
		 			var objWin = window.open("", "reportPrint", "width=850, height=700, scrollbars=yes");
		 			objWin.document.open(); 
		 			objWin.document.write(html);  
		 			
		 			//지도 크기, 배율 설정
		 			var scaleWidthValue = (originalMapWidth / this.mapWidthSize).toFixed(2);
	 	 			var scaleHeightValue = (originalMapHeight / this.mapHeightSize).toFixed(2);
	 	 			var scaleWidth = (this.mapWidthSize / originalMapWidth);
	 	 			var scaleHeight = (this.mapHeightSize / originalMapHeight);
	 	 			$(".printArea .map_img").css("height", "788px"); 
	 	 			
	 	 			this.reportMapCss = {
		 	 				"width" : originalMapWidth+"px",
			 	 			"height" : originalMapHeight+"px",
			 	 			"overflow":"hidden",
			 	 			"margin-left" : ((originalMapWidth - this.mapWidthSize)*-1) / 2 + "px",
			 	 			"margin-top" : ((originalMapHeight - this.mapHeightSize)*-1) / 2 + "px"
		 	 		}
	 	 			
	 	 			if(originalMapWidth<800) {
	 	 				this.reportMapCss["transform"] = "scale("+scaleHeight+", "+scaleHeight+")";
	 	 			} else {
	 	 				this.reportMapCss["transform"] = "scale("+scaleWidth+", "+scaleHeight+")";
	 	 			}
	 	 			
	 	 			var barChartDiv = $("#barChartDiv", objWin.document);
	 	 			$(barChartDiv).html($(cloneBar).html());  
	 	 			$(barChartDiv).find(".highcharts-container").css("margin", "0 auto");
	 	 			
	 	 			//하이차트 툴팁 제거하고, 색상 맞추기
	 	 			$(".highcharts-tooltip", objWin.document).remove();	
	 	 			$(".highcharts-series.highcharts-tracker rect", objWin.document).attr("fill","#2951f2");
	 	 			
	 	 			objWin.document.close();
		 		},
		 		
		 		//지도 CSS 리턴
				mapSizeGet : function() {
					return this.reportMapCss;
				}
	},

	$reportForm.Util = {
				//Data를 순서대로 정렬하고, 비율 삽입
				tableDataSort : function(data) {
					var totalSum = 0;
		 	 		data.sort(function(a, b){
		 	 			var x = Number(a.value);
		 	 			var y = Number(b.value);
		 	 			if (x > y) return -1;
		 	 			if (x < y) return 1;
		 	 			return 0;
		 	 		});
		 	 		
		 	 		totalSum = this.tableDataSum(data);
		 	 		for(var i = 0; i < data.length; i ++) {	//비율 구하기
		 	 			if(data[i].value == 0) {
		 	 				data[i].rate = 0;
		 	 			} else {
		 	 				data[i].rate = (data[i].value / totalSum * 100).toFixed(1);
		 	 			}
		 	 		}
		 	 		return data;
				},
				
				//지역과 데이터 매핑
				admCdSet : function(admCdList, data) {
					var dataList = [];
					var tmpObj = {};
					//지역 데이터
					for(var i = 0; i < admCdList.length; i ++) {
						var admNm = admCdList[i].adm_nm;
						var admCd = admCdList[i].adm_cd;
						//기본값
						tmpObj = {
								item : admNm,
								itemCd : admCd,
								value : 0,
								color : "#fff"
						}
						//정보 데이터
						for(var x = 0; x < data.length; x ++) {
							//지역코드와 매핑
							if(data[x].itemCd == admCd) {
								data[x].item = admNm;
								if(data[x].value == undefined) { data[x].value = 0; }
								tmpObj =data[x];
							}
						}
						dataList.push(tmpObj);
					}
					return dataList;
				},
				
				//Data 총 합계 구하기
				tableDataSum : function(data) {
					var totalSum = 0;
					for(var i = 0; i < data.length; i ++) {
		 	 			totalSum += Number(data[i].value);
		 	 		}
					return totalSum;
				},
				
				//오늘날짜 가져오기
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
				
				//천단위 콤마
				addComma : function(num) {
					var len, point, str;
					
					num = num + "";
					var tmpNum = null;
					var tmpMod = null;
					if (num.indexOf(".") == -1) {
						tmpNum = num;
					}else {
						tmpNum = num.split(".")[0];
						tmpMod = "." + num.split(".")[1];
					}

					point = tmpNum.length % 3;
					len = tmpNum.length;
					
					str = tmpNum.substring(0, point);
					while (point < len) {
						if (str != "")
							str += ",";
						str += tmpNum.substring(point, point + 3);
						point += 3;
					}

					if (tmpMod != null && tmpMod.length > 0) {
						str = str + tmpMod;
					}
					return str;
				}
	},
	
	$reportForm.Request = {
			/**
			 * @name         : reportReverseGeoCode
			 * @description  : OpenAPI 리버스지오코딩 (집계구 주소 변환)
			 * @date         : 2015. 07. 30. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param  center
			 * @param  options
			 */
			reportReverseGeoCode : function (center, optData) {
				var sopReportReverseGeoCodeObj = new sop.report.ReverseGeoCode.api();
				sopReportReverseGeoCodeObj.addParam("accessToken", accessToken);
				sopReportReverseGeoCodeObj.addParam("addr_type", "10");
				sopReportReverseGeoCodeObj.addParam("x_coor", center.x);
				sopReportReverseGeoCodeObj.addParam("y_coor", center.y);
				
				sopReportReverseGeoCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						center : center,
						adm_cd : optData.adm_cd,
						idx : optData.idx,
						maxLen : optData.maxLen
					}
				});
			}
	};
	
	/** ********* OpenAPI 보고서용 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.report.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var idx = options.idx;
				var maxLen = options.maxLen;
				if (res.errCd == "0") {
					var fullAddr = result[0].full_addr.split(" ");		//새주소(FULL 주소)
					var roadNm = "";	//~길, 번지
					//정상적이지 않은 새주소는 미정
					if(fullAddr.length < 4) {
						roadNm = "";
					} else {
						roadNm = fullAddr[fullAddr.length - 2] + " " + fullAddr[fullAddr.length - 1] + " 부근 " ;
					}
					
					$reportForm.UI.datas.admCdList[idx].adm_nm = "(집계구 - " + $reportForm.UI.datas.admCdList[idx].adm_cd + ") " + roadNm;
					
					//실행 횟수 카운트 증가
					++$reportForm.UI.rgeoCnt;
					//마지막 집계구 리버스지오코드 프로세스를 종료했을 경우
					if($reportForm.UI.rgeoCnt == maxLen) {
						$reportForm.UI.draw();
					}
					
				} else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout($reportForm.UI.reportReverseGeoCode(options.center, options), 500);
					
				} else {
					$reportForm.UI.datas.admCdList[idx].adm_nm = "(집계구 - " + $reportForm.UI.datas.admCdList[idx].adm_cd + ")";
					//실행 횟수 카운트 증가
					++$reportForm.UI.rgeoCnt;
					//마지막 집계구 리버스지오코드 프로세스를 종료했을 경우
					if($reportForm.UI.rgeoCnt == maxLen) {
						$reportForm.UI.draw();
					}
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 보고서용 리버스지오코딩. End ********* */
	
}(window, document));


