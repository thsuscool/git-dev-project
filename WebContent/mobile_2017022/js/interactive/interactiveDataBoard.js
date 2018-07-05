/**
 * 대화형 통계지도 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/10/28  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$interactiveDataBoard = W.$interactiveDataBoard || {};
	
	$interactiveDataBoard.ui = {
		/**
		 * 
		 * @name         : updateTargetAreaTable
		 * @description  : 해당 지역 데이터 보기 표 업데이트
		 * @date         : 2015. 10. 29. 
		 * @author	     : 김성현
		 * @param	: res, options
		 * @history 	 :
		 */
		updateTargetAreaTable : function(res, options) {
			$(".Content>.Btn_Top>nav>.Btn_Top5").removeClass("NoneAction");
			$(".Content>.Btn_Top>nav>.Btn_Top5").off("click").click(function() {
				$(".Content>.Btn_Top>nav>a[class^=Btn_Top]").removeClass("M_on");
				if($("#table-area").is(":visible")){
					$("html,body").animate({
						scrollTop: 0
					}, 300,function(){
						if ($("#legend_" + $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].mapInfo.id).find(".remarkbox").css("display") == "none") {
							$(".Content>.Btn_Top>nav>a.Btn_Top2").addClass("M_on");
						} else {
							$(".Content>.Btn_Top>nav>a.Btn_Top3").addClass("M_on");
						}
						$("#table-area").hide();
					});
				}else{
					$(".Content>.Btn_Top>nav>.Btn_Top5").addClass("M_on");
					$("#chart-area").hide();
					$("#table-area,.Map.mapareaboxd").show();
					$(".compareBox .tables .scrolls").height(($(window).height()/2)-($(".compareBox .tables>table").height()));
					$("html,body").animate({
						scrollTop: $(window).height()/2
					}, 300);
				}
			});
			var addrCdList = [];		//행정동코드 데이터
			var addrDataList = [];	//동이름 데이터
			var retDataList = [];	//수치 데이터
				
			for(var i = 0; i < res.result.length; i ++) {
				var elem = res.result[i];
				
				//읍면동 단위
				if(elem.adm_cd.length > 7) {
					addrDataList.push(elem.adm_cd);
				} else {
					addrDataList.push(elem.adm_nm);
				}
				addrCdList.push(elem.adm_cd);
				
				if(/API_03(01|02|03|04|05|06|07|08|09|10)/.test(res.id)) {
					retDataList.push(parseFloat(elem[res.showData]));
				}else {//조건결합시
					retDataList.push(parseFloat(elem.data_cnt));
				}
			}
			
			//표 데이터 생성
			var dataList = [];
			for(var i = 0; i < addrDataList.length; i ++) {
				dataList.push({ item : addrDataList[i], itemCd : addrCdList[i], value : retDataList[i] });
			}
			
			//정렬
			var dataList = $interactiveDataBoard.Util.tableDataSort(dataList);
			
			var html = "";
			for(var  i = 0; i < dataList.length; i ++) {
				html += "<tr data-id='"+dataList[i].itemCd+"'>";
				html += "	<td class='al' style='width:30%;'>"+(dataList[i].itemCd.length>7?dataList[i].itemCd:dataList[i].item)+"</td>";
				html += "	<td style='width:20%;'>"+(i+1)+"</td>";
				html += "	<td style='width:30%;'>"+appendCommaToNumber(dataList[i].value)+"</td>";
				html += "	<td style='width:20%;'>"+dataList[i].rate+"</td>";
				html += "</tr>";
			}
			$("#barChartTable").html(html);
		}
	};
	$interactiveDataBoard.Util = {
		/**
		 * 
		 * @name         : tableDataSort
		 * @description  : Data를 순서대로 정렬하고, 비율 삽입
		 * @date         : 2015. 10. 29. 
		 * @author	     : 김성현
		 * @param		: data
		 */	
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

		/**
		 * 
		 * @name         : tableDataSum
		 * @description  : Data 총 합계 구하기
		 * @date         : 2015. 10. 29. 
		 * @author	     : 김성현
		 * @param		: data
		 */	
		tableDataSum : function(data) {
			var totalSum = 0;
			for(var i = 0; i < data.length; i ++) {
					totalSum += Number(data[i].value);
				}
			return totalSum;
		}
	};
	
}(window, document));