/**
 * 나의데이터 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/12/09 초기 작성 author : 김성현 version : 1.0 see :
 * 
 */
// 세션을 받아온 후 실행
function getSession() {
	if (AuthInfo.authStatus) {
		$mydataDataBoard.ui.myDataList(1); // 나의데이터 목록
	} else {
		$("#myDataLoadList").html("<li>로그인이 필요합니다.</li>");
	}
	$mydataDataBoard.ui.sharedDataList(1); // 사용자 공유 데이터 목록
}

(function(W, D) {
	W.$mydataDataBoard = W.$mydataDataBoard || {};

	$(document).ready(function() {
		$mydataDataBoard.event.setUIEvent(); // UI에 사용되는 이벤트를 설정한다.
		$mydataDataBoard.ui.mapDataSetting(); // 지도별 데이터 형식 세팅

		sop.Map = sop.Map.extend({
			openPopup : function(popup) {
				this._popup = popup;

				return this.addLayer(popup).fire('popupopen', {
					popup : this._popup
				});
			}
		});

	});

	$mydataDataBoard.ui = {
		delegate : null, // interactiveMap, bizStatsMap
		mapData : [], // 지도별 데이터
		map : null, // 지도 (sMap.map)
		map_id : "0", // 지도 ID (0, 1, 2)
		myPageNum : 1, // 나의 데이터 현재 페이지
		sharedPageNum : 1, // 공유된 데이터 현재 페이지
		selectedMyData : null,
		groupColorList : [],
		isGroup : false,
		isTooltipShow : true,
		displayType : null,
		isShare : false,
		shareData : null,
		isStatsInfoClear : true,

		/**
		 * 
		 * @name : mapDataSetting
		 * @description : 지도별 데이터 형식 세팅
		 * @date : 2015. 12. 09.
		 * @author : 김성현
		 * @history :
		 */
		mapDataSetting : function() {
			var tempObj = {};
			for (var i = 0; i < 3; i++) {
				tempObj = {
					"options" : {
						map : null,
						data_id : null, // 데이터 key
						title : null, // 타이틀
						handsonTable : null, // 테이블
						markerGroup : [], // POI 그룹
						rowDataArray : [], // 데이터
						rowOriginDataArray : [], // 데이터(원본)
						rowHeaderArray : [], // 헤더
						dispData : [], // 표출데이터
						tooltipSetting : [], // 툴팁데이터
						tot_type : 0, // 집계단위 1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지
										// 않음
						searchMethod : "poi" // 조회 방법
					}
				}
				this.mapData.push(tempObj);
			}
		},

		/**
		 * @name : delegateSetting
		 * @description : 나의데이터 세팅 (interactive, bizstats)
		 * @date : 2015. 12. 09.
		 * @author : 김성현
		 * @param :
		 *            delegate
		 * @history :
		 */
		delegateSetting : function(delegate) {
			// 메모리에 저장
			this.delegate = delegate;
			this.map_id = delegate.curMapId;
			this.map = delegate.mapList[this.map_id];
			// this.mapData[this.map_id].options.map = this.map;
		},

		/**
		 * 
		 * @name : reDraw
		 * @description : 데이터보드 다시 그리기
		 * @date : 2016. 01. 11.
		 * @author : 김성현
		 * @param :
		 *            map_id
		 * @history :
		 */
		reDraw : function(map_id) {
			// 기존 조회된 데이터가 있을경우
			if (!$.isEmptyObject(this.mapData[map_id].options)) {
				this.updateMyData(this.mapData[map_id].options.data_id,
						this.mapData[map_id].options.title, null, false);
			}
		},
		
		setShareData : function(shareInfo) {
			this.isShare = true;
			this.shareData = shareInfo;
		},

		/**
		 * @name : updateMyData
		 * @description : 나의데이터 조회
		 * @date : 2015. 12. 09.
		 * @author : 김성현
		 * @param :
		 *            data_id, title
		 * @history :
		 */
		updateMyData : function(data_id, title, type, isClear) {
			// 초기화 //2016.03.18 수정
			// this.reset(this.map_id);
			if (type != undefined && (type == "ratio" || type == "location")) {
				this.isStatsInfoClear = false;
			}else {
				this.isStatsInfoClear = true;
			}
			
			if (this.delegate.dataTypeList[this.map.id] == "userData") {
				this.isStatsInfoClear = true;
			}
			
			if (isClear == undefined || isClear) {
				if (this.delegate.namespace == "interactiveMap") {
					$interactiveMap.ui.doClearMap(this.map_id + 1, this.isStatsInfoClear);
				} else if (this.delegate.namespace == "bizStatsMap") {
					$bizStatsMap.ui.doClearMap(this.map_id + 1, this.isStatsInfoClear);
				}
			}

			this.mapData[this.map_id].options.map = this.map;
			this.mapData[this.map_id].options.data_id = data_id;
			this.mapData[this.map_id].options.title = title;
			

			// 데이터타입 설정
			this.delegate.setDataType(this.map.id, "userData");

			// 보고서 생성을 위해 선택된 마이데이터의 정보저장
			this.selectedMyData = {
				id : data_id,
				title : title
			};
			//viewDataBoard
			$(".dataBoardDiv").hide();
			$("#myDataDiv").show();

			// 사용자 데이터 조회
			this.getUserData(data_id, title, this.map);
			if (this.delegate.namespace == "interactiveMap") {
				$interactiveDataBoard.event.dataBoardOpen();
				$interactiveLeftMenu.event.stepCloseAnimate(1, "check");
				$interactiveMap.ui.updateSearchTitle(title, undefined,
						this.map_id);

			} else if (this.delegate.namespace == "bizStatsMap") {
				$bizStatsDataBoard.event.dataBoardOpen();
				$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
				$bizStatsMap.ui.setTitle(title, "1");
			}
		},

		/**
		 * @name : myDataList
		 * @description : Left메뉴 나의데이터 목록
		 * @date : 2015. 12. 09.
		 * @author : 김성현
		 * @param :
		 *            pageNum 조회할 페이지
		 * @history :
		 */
		myDataList : function(pageNum) {
			// 나의 데이터 목록 조회
			var sopPortalMyDataListObj = new sop.portal.myDataList.api();
			sopPortalMyDataListObj.addParam("pageNum", pageNum);
			sopPortalMyDataListObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/mypage/myData/myDataList.json"
			});
		},

		/**
		 * @name : myDataPaging
		 * @description : Left메뉴 나의데이터 페이징 처리
		 * @date : 2015. 12. 10.
		 * @author : 김성현
		 * @param :
		 *            totalCount 전체개수, currentIndex 조회페이지
		 * @history :
		 */
		myDataPaging : function(totalCount, currentIndex) {
			var pageSize = 5;
			var totalPage = Math.ceil(totalCount / pageSize);
			$('#myDataPaging .pages').paging({
				current : currentIndex,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function(e, page) {
					$mydataDataBoard.ui.myPageNum = page;
					$mydataDataBoard.ui.myDataList(page);
				}
			});
		},

		/**
		 * @name : sharedDataList
		 * @description : Left메뉴 사용자 공유 데이터 목록
		 * @date : 2015. 12. 09.
		 * @author : 김성현
		 * @param :
		 *            pageNum 조회할 페이지
		 * @history :
		 */
		sharedDataList : function(pageNum) {
			// 공개된 사용자 데이터 목록 조회
			var sopPortalSharedDataListObj = new sop.portal.sharedDataList.api();
			sopPortalSharedDataListObj.addParam("pageNum", pageNum);
			sopPortalSharedDataListObj.request({
				method : "POST",
				async : true,
				url : contextPath
						+ "/ServiceAPI/mypage/myData/sharedDataList.json"
			});
		},

		/**
		 * @name : sharedDataPaging
		 * @description : Left메뉴 사용자 공유 데이터 페이징 처리
		 * @date : 2015. 12. 10.
		 * @author : 김성현
		 * @param :
		 *            totalCount 전체개수, currentIndex 조회페이지
		 * @history :
		 */
		sharedDataPaging : function(totalCount, currentIndex) {
			var pageSize = 5;
			var totalPage = Math.ceil(totalCount / pageSize);
			$('#shareDataPaging .pages').paging({
				current : currentIndex,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function(e, page) {
					$mydataDataBoard.ui.sharedPageNum = page;
					$mydataDataBoard.ui.sharedDataList(page);
				}
			});
		},

		/**
		 * @name : getUserData
		 * @description : 데이터보드 데이터 목록 호출
		 * @date : 2015. 12. 11.
		 * @author : 김성현
		 * @param :
		 *            data_id
		 * @history :
		 */
		getUserData : function(data_id, title, map) {
			var sopPortalGetUserDataObj = new sop.portal.getUserData.api();
			sopPortalGetUserDataObj.addParam("data_uid", data_id);
			sopPortalGetUserDataObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/mypage/myData/getMyData.json",
				options : {
					url : "/ServiceAPI/mypage/myData/getMyData.json",
					btntype : "mydata",
					api_id : "12002",
					params : {
						data_id : data_id
					},
					title : title,
					map : map
				}
			});
			var pathChk = $(location).attr('pathname');
			var parameter = "data_id="+data_id;
			var zoomLevel = map.zoom;
			var adm_nm = map.curSidoNm + map.curSiggNm + map.curDongNm;
			if(pathChk.includes("interactiveMap")){
				apiLogWrite2("A0","A27",title,parameter,zoomLevel,adm_nm);
			}else if(pathChk.includes("bizStatsMap")){
				apiLogWrite2("B0","B36",title,parameter,zoomLevel,adm_nm);
			}
		},

		/**
		 * @name : drawUserData
		 * @description : 데이터보드 데이터 목록 그리기
		 * @date : 2015. 12. 11.
		 * @author : 김성현
		 * @param :
		 *            res
		 * @history :
		 */
		drawUserData : function(res) {
			var mapData = this.mapData[this.map_id].options;
			var container = document.getElementById('userDataGrid');
			$("#userDataGrid").empty();
			var data = function() {
				return Handsontable.helper.createSpreadsheetData(100, 12);
			};

			var mainData = res.result[0].mainData;
			var metaData = res.result[0].metaData;
			var userDataArray = []; // 사용자 데이터 (USR_DATA)
			var data = [];
			var col_id = new Array();
			var col_nm = new Array();
			var rowHeader = new Array();

			// 메타데이터 세팅
			for (var i = 0; i < metaData.length; i++) {
				col_id[i] = metaData[i].COL_ID;
				col_nm[i] = metaData[i].COL_NM;
			}
			// 여기선 메타데이터를 헤더로 올려야 한다...

			// sample
			/*
			 * hot.updateSettings({ colHeaders: ['A','B','C'] });
			 */

			// 엑셀 헤더
			/*
			 * for(var i = 0; i < col_nm.length; i ++) { if(i==0) { rowHeader[i] =
			 * true; } else if(i == 1) { rowHeader[i] = "No"; } rowHeader[i+2] =
			 * col_nm[i]; }
			 */
			// 로우헤더 변경으로 사용 안함
			// data.push(rowHeader);
			// 엑셀에 보여지는 데이터 세팅
			for (var i = 0; i < mapData.rowDataArray.length; i++) {
				// 사용자 데이터 변환 (Object -> List)
				var userData = $.parseJSON(mapData.rowDataArray[i].USR_DATA);
				/*
				 * var tmpDataList = []; $.each(userData,function(key,value){
				 * var tmpObj = {}; tmpObj[key] = value;
				 * tmpDataList.push(tmpObj); });
				 * mapData.rowDataArray[i].USR_DATA = tmpDataList;
				 */

				// 엑셀에 보여지는 데이터를 위해 세팅 (Object)
				var userArray = new Array();
				$.each(userData, function(key, value) {
					userArray[key] = value;
				});
				userDataArray[i] = userArray;
			}

			// 엑셀에 보여지는 데이터 (Row)
			for (var i = 0; i < userDataArray.length; i++) {
				var tempRow = new Array();
				tempRow.push(true);
				tempRow.push(i + 1);
				for (var j = 0; j < col_id.length; j++) {
					tempRow.push(userDataArray[i][col_id[j]]);
				}
				data.push(tempRow);
			}

			var dbHeight = $(".dataSideContents").height() - 240;
			var hot = new Handsontable(container, {
				data : data,
				height : dbHeight,
				width : 520,
				autoRowSize : {
					syncLimit : '100%'
				},
				colHeaders : true,
				rowHeaders : true,
				stretchH : 'all',
				columnSorting : true,
				contextMenu : true,
				cells : function(row, col, prop) {
					var cellProperties = {};
					// 첫번째는 체크박스
					if (col === 0) {
						cellProperties.readOnly = false; // 체크박스 수정가능
						cellProperties.type = 'checkbox';
					} else {
						cellProperties.readOnly = true; // 다른 컬럼은 수정불가
					}
					return cellProperties;
				}
				  
			});

			// disp and tooltip setting

			// 추가 헤더 변경
			var headerArray = new Array();
			headerArray.push("선택");
			headerArray.push("No");
			$("#groupCell").find("option").remove();
			var dispHtml = "<ul class='mydata_dbTypeList'>";
			var tooltipHtml = "<ul class='mydata_dbTypeList'>";
			for (var i = 0; i < col_nm.length; i++) {
				headerArray.push(col_nm[i]);
				if (metaData[i].CHECK_TYPE == "3"
						|| metaData[i].CHECK_TYPE == "1") {
					dispHtml += "<li>";
					dispHtml += "<div style='text-align:left;padding-left:10px'>";
					dispHtml += "<input type='radio' name='rd_pselect' id='rd_pselect_"
							+ i + "' checked='checked'></input>";
					dispHtml += "<label class='on' for='rd_pck_" + i + "'>"
							+ col_nm[i] + "</label>";
					dispHtml += "</div>";
					dispHtml += "</li>";
				} else {
					dispHtml += "<li>";
					dispHtml += "<div style='text-align:left;padding-left:10px'>";
					dispHtml += "<input type='radio' name='rd_pselect' id='rd_pselect_"
							+ i + "'></input>";
					dispHtml += "<label for='rd_pck_" + i + "'>" + col_nm[i]
							+ "</label>";
					dispHtml += "</div>";
					dispHtml += "</li>";
				}

				if (metaData[i].CHECK_TYPE == "3"
						|| metaData[i].CHECK_TYPE == "2") {
					tooltipHtml += "<li>";
					tooltipHtml += "<div style='text-align:left;padding-left:10px'>";
					tooltipHtml += "<input class='ckbox' type='checkbox' name='rd_pck' id='rd_pck_"
							+ i + "' checked='checked'></input>";
					tooltipHtml += "<label class='on' for='rd_pck_" + i + "'>"
							+ col_nm[i] + "</label>";
					tooltipHtml += "</div>";
					tooltipHtml += "</li>";
				} else {
					tooltipHtml += "<li>";
					tooltipHtml += "<div style='text-align:left;padding-left:10px'>";
					tooltipHtml += "<input class='ckbox' type='checkbox' name='rd_pck' id='rd_pck_"
							+ i + "' ></input>";
					tooltipHtml += "<label for='rd_pck_" + i + "'>" + col_nm[i]
							+ "</label>";
					tooltipHtml += "</div>";
					tooltipHtml += "</li>";
				}

				$("#groupCell").append(
						"<option value='" + col_id[i] + "'>" + col_nm[i]
								+ "</option>");
			}
			dispHtml += "</ul>";
			tooltipHtml += "</ul>";
			$("#dispDataZone").html(dispHtml);
			$("#tooltipSetting").html(tooltipHtml);
			hot.updateSettings({
				colHeaders : headerArray
			});

			// 여기서 groupCell 설정을 하면 된다.
			// 추가 끝

			// 핸드슨테이블 저장
			this.mapData[this.map_id].options.handsonTable = hot;

			// POI, 열지도
			$(".myDataDivSub").hide();
			$("#myDataNormalDiv").show();
			
			this.displayType = mainData.MAP_DISP_TYPE;
			
			if (mainData.MAP_DISP_TYPE == "location"
					|| mainData.MAP_DISP_TYPE == "ratio") {
				$("#showInfoWindowPopup").show();
				$("#showInfoWindowPopup").next().show();
				$("#groupingInfo").parent().show();
				$("#groupingInfo").show();
				//$("#searchMethod01").show(); id dupl 오류로 class로변경
				//$("#searchMethod02").show();
				$(".searchMethod01").show(); 
				$(".searchMethod02").show();
				$("#searchMethod03").hide();
				$("#searchMethod04").hide();
				if (mainData.MAP_DISP_TYPE == "location") {
					$("#searchMethodBox label:eq(0)").click();
				} else {
					$("#searchMethodBox label:eq(1)").click();
				}
				$("#lgTypeList_" + this.map.legend.id + " li").eq(1).hide(); // 색상
				$("#lgTypeList_" + this.map.legend.id + " li").eq(2).hide(); // 버블
				$("#lgTypeList_" + this.map.legend.id + " li").eq(3).hide(); // 버블

			} else if (mainData.MAP_DISP_TYPE == "bubble"
					|| mainData.MAP_DISP_TYPE == "colorFull") { // 버블지도, 색상지도
				$("#showInfoWindowPopup").hide();
				$("#showInfoWindowPopup").next().hide();
				$("#groupingInfo").parent().hide();
				$("#groupingInfo").hide();
				$("#searchMethod01").hide();
				$("#searchMethod02").hide();
				$("#searchMethod03").show();
				$("#searchMethod04").show();
				
				if (mainData.MAP_DISP_TYPE == "bubble") {
					$("#searchMethodBox label:eq(2)").click();
				} else {
					$("#searchMethodBox label:eq(3)").click();
				}
				
				//범례 숨기기
				$("#lgTypeList_" + this.map.legend.id + " li").eq(3).hide(); // 색상
			}
			
			//이벤트 훅
			hot.addHook('afterOnCellMouseDown', $mydataDataBoard.event.handleHotAfterOnCellMouseDown);
		},

		/**
		 * @name : drawMapData
		 * @description : 지도에 데이터 그리기
		 * @date : 2015. 12. 14.
		 * @author : 김성현
		 * @history :
		 */
		drawMapData : function() {
			var mapData = this.mapData[this.map_id].options;
			var hot = mapData.handsonTable;
			var dataList = []; // 체크박스 체크된 전체 데이터 저장
			var x_coord = "989674"; // X좌표
			var y_coord = "1818313"; // Y좌표
			var radio1Index = 0; // 표출데이터 인덱스
			var checkList = []; // 툴팁데이터
			var zoomLevel = 0; // 줌레벨
			
			//북마크시 정보설정
			if (this.isShare) {
				if (this.shareData.paramInfo.type) {
					mapData.searchMethod = this.shareData.paramInfo.type;
					for (var i=1; i<=4; i++) {
						$("#dbTypeCk0"+i).prop("checked", false);
						if ($("#dbTypeCk0"+i).next().hasClass("on")) {
							$("#dbTypeCk0"+i).next().removeClass("on");
						}
					}
					
					switch(mapData.searchMethod) {
						case "colorFull":
							$("#dbTypeCk04").prop("checked", true);
							$("#dbTypeCk04").next().addClass("on");
							break;
						case "bubble":
							$("#dbTypeCk03").prop("checked", true);
							$("#dbTypeCk03").next().addClass("on");
							break;
						case "location":
							$("#dbTypeCk01").prop("checked", true);
							$("#dbTypeCk01").next().addClass("on");
							break;
						case "ratio":
							$("#dbTypeCk02").prop("checked", true);
							$("#dbTypeCk02").next().addClass("on");
							break;
					}
				}
			}

			// 데이터 정렬
			this.createRowObjData();

			// 범례결합을 위한 데이터설정
			if (this.delegate != null
					&& this.delegate.namespace == "interactiveMap") {
				this.delegate.dropBtnInfo[this.map.id] = {
					title : mapData.title
				};
			}

			// 북마크/공유 안됨
			//this.map.shareInfo = null;
			
			// 기존 데이터 삭제
			if (this.isStatsInfoClear) {
				this.map.clearDataOverlay();
			}else {
				if (mapData.searchMethod == "location" || mapData.searchMethod == "ratio") {
					if(this.map.markers) {
						this.map.markers.clearLayers();
					}
					if (this.map.heatMap) {
						this.map.heatMap.setUTMKs([]);
					}
				}else {
					if (this.map.dataGeojson) {
						this.map.clearToolTip();
						this.map.dataGeojson.remove();
						this.map.removeCaption();
						this.map.dataGeojson = null;
					}
					this.map.data = [];
					this.map.multiLayerControl.clear();
				}
				
			}
			
			// 현재 체크박스가 선택된 row를 dataList에 저장한다.
			for (var i = 0; i < mapData.rowDataArray.length; i++) {
				if (hot.getDataAtCell(i, 0)) {
					// 전체 데이터 저장
					for (var x = 0; x < mapData.rowDataArray[i].USR_DATA.length; x++) {
						for ( var p in mapData.rowDataArray[i].USR_DATA[x]) {
							for (var k = 0; k < mapData.rowHeaderArray.length; k++) {
								if (mapData.rowHeaderArray[k].COL_ID == p) {
									mapData.rowDataArray[i].USR_DATA[x]["COL_NM"] = mapData.rowHeaderArray[k].COL_NM;
									break;
								}
							}
						}
					}
					dataList.push(mapData.rowDataArray[i]);
				}
			}

			// 체크된 row가 없을 경우 return
			if (dataList.length == 0) {
				messageAlert.open("알림", "선택된 데이터가 없습니다.");
				return;
			}

			// 표출 데이터 인덱스 설정
			for (var i = 0; i < mapData.dispData.length; i++) {
				if (mapData.dispData[i] == true) {
					radio1Index = i;
				}
			}

			// 툴팁 데이터 설정
			for (var i = 0; i < mapData.tooltipSetting.length; i++) {
				if (mapData.tooltipSetting[i] == true) {
					checkList.push(i);
				}
			}

			// POI
			if (mapData.searchMethod == "location") {
				// 줌레벨 10으로 설정
				zoomLevel = 10;
				
				// 마커 생성 및 표출
				mapData.markerGroup = [];
				for (var i = 0; i < dataList.length; i++) {
					x_coord = dataList[i].GEO_X;
					y_coord = dataList[i].GEO_Y;
						
					var html  = "<div>";
				 	 html +=	"<div style='margin:0 auto;'>";
				 	 html += 	"<table style='width:300px;height:100%;margin-left:-135px;text-align:center;'>";
				 	 html +=		"<tr style='width:100%;height:30px;'>";
				 	 
				 	 if (this.isTooltipShow) {
				 		 html += "<td class='tooltip_title'><span style='font-weight:bold;height:30px;'>"+$mydataDataBoard.Util.getFirstKeyValue(dataList[i].USR_DATA[radio1Index])+"</span></td>";
				 	 }else {
				 		 html += "<td class='tooltip_title' style='display:none;'><span style='font-weight:bold;height:30px;'>"+$mydataDataBoard.Util.getFirstKeyValue(dataList[i].USR_DATA[radio1Index])+"</span></td>";
				 	 }
				 	
				 	 html +=		"</tr>";
				 	 html +=	"</table>";
					 html += 	"<img src='/img/marker/thema_marker_default.png' style='width:25px;height:40px;' />";
					 html +=	"</div>";
					 html += "</div>";
					 
					var markerIcon = new sop.DivIcon({
									html:html, 
									iconSize: new sop.Point(25, 40), 
									iconAnchor: new sop.Point(12.5, 40), 
									infoWindowAnchor: new sop.Point(1,-34)
					});
					
					var marker = sop.marker([ x_coord, y_coord ], {
						icon : markerIcon,
						autoClose : false
					});

					var html = "<table style='margin:10px;'>";
					html += "<tr>";
					html += "<td style='font-size:14px;font-weight:bold;color:#3792de;'>"
							+ mapData.rowHeaderArray[radio1Index].COL_NM
							+ ":"
							+ $mydataDataBoard.Util.getFirstKeyValue(dataList[i].USR_DATA[radio1Index]);
					+"</td>";
					html += "<td></td>";
					html += "</tr>";
					html += "<tr style='height:5px;'></tr>";
					for (var x = 0; x < checkList.length; x++) {
						html += "<tr>";
						html += "<td style='font-size:12px;padding-left:5px;'>"
								+ dataList[i].USR_DATA[checkList[x]].COL_NM
								+ " : "
								+ $mydataDataBoard.Util.getFirstKeyValue(dataList[i].USR_DATA[checkList[x]]);
								+ "</td>";
						html += "</tr>";
					}
					html += "</table>";
					
					marker.options["index"] = i;

					marker.bindInfoWindow(html, {
						autoClose : false
					});
					marker.addTo(this.map.markers);
					mapData.markerGroup.push(marker);
				}

			}

			// 열지도
			else if (mapData.searchMethod == "ratio") {
				// 줌레벨 10으로 설정
				zoomLevel = 10;

				for (var i = 0; i < dataList.length; i++) {
					x_coord = dataList[i].GEO_X;
					y_coord = dataList[i].GEO_Y;
					this.map.addHeatMap(x_coord, y_coord, 1000);
				}
			}

			// 버블지도, 색상지도
			else if (mapData.searchMethod == "bubble"
					|| mapData.searchMethod == "colorFull") {
				var resultList = new Array();
				var result = new Array();
				var resultArray = new Array();

				for (var i = 0; i < dataList.length; i++) {
					x_coord = dataList[i].GEO_X;
					y_coord = dataList[i].GEO_Y;
					var resultRow = new Array();
					if (mapData.tot_type != "4") {
						resultRow["adm_cd"] = dataList[i].ADM_CD;
					} else {
						resultRow["adm_cd"] = dataList[i].TOT_REG_CD;
					}
					// 지도 표출 데이터
					resultRow["data"] = $mydataDataBoard.Util
							.getFirstKeyValue(dataList[i].USR_DATA[radio1Index]);

					// 툴팁 표출 데이터
					var userData = [];
					for (var x = 0; x < checkList.length; x++) {
						userData
								.push({
									data : $mydataDataBoard.Util
											.getFirstKeyValue(dataList[i].USR_DATA[checkList[x]]),
									title : dataList[i].USR_DATA[checkList[x]].COL_NM
								});
					}
					resultRow["userData"] = userData;

					resultArray[i] = resultRow;
				}

				this.map.selectedBoundList = [];
				for (var i = 0; i < resultArray.length; i++) {

					resultObject = new Array();
					// tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
					if (i == 0) {
						resultObject["id"] = "API_MYDATA"
						resultObject["result"] = new Array();
						resultObject["result"].push(resultArray[i]);
						if (mapData.tot_type == "1") {
							resultObject["pAdmCd"] = "00";
							resultList["00"] = resultObject;
						} else if (mapData.tot_type == "2") {
							resultObject["pAdmCd"] = resultArray[i].adm_cd
									.substring(0, 2);
							resultList[resultArray[i].adm_cd.substring(0, 2)] = resultObject;
						} else if (mapData.tot_type == "3") {
							resultObject["pAdmCd"] = resultArray[i].adm_cd
									.substring(0, 5);
							resultList[resultArray[i].adm_cd.substring(0, 5)] = resultObject;
						} else if (mapData.tot_type == "4") {
							resultObject["pAdmCd"] = resultArray[i].adm_cd
									.substring(0, 7);
							resultList[resultArray[i].adm_cd.substring(0, 7)] = resultObject;

						}
						this.map.selectedBoundList.push(resultObject);

					} else if (resultList["00"] != undefined) {
						resultList["00"].result.push(resultArray[i]);
					} else if (resultList[resultArray[i].adm_cd.substring(0, 2)] != undefined) {
						resultList[resultArray[i].adm_cd.substring(0, 2)].result
								.push(resultArray[i]);
					} else if (resultList[resultArray[i].adm_cd.substring(0, 5)] != undefined) {
						resultList[resultArray[i].adm_cd.substring(0, 5)].result
								.push(resultArray[i]);
					} else if (resultList[resultArray[i].adm_cd.substring(0, 7)] != undefined) {
						resultList[resultArray[i].adm_cd.substring(0, 7)].result
								.push(resultArray[i]);
					} else {
						resultObject["id"] = "API_MYDATA"
						resultObject["result"] = new Array();
						resultObject["result"].push(resultArray[i]);

						if (mapData.tot_type == "1") {
							resultObject["pAdmCd"] = "00";
							resultList["00"] = resultObject;
						} else if (mapData.tot_type == "2") {
							resultObject["pAdmCd"] = resultArray[i].adm_cd
									.substring(0, 2);
							resultList[resultArray[i].adm_cd.substring(0, 2)] = resultObject;
						} else if (mapData.tot_type == "3") {
							resultObject["pAdmCd"] = resultArray[i].adm_cd
									.substring(0, 5);
							resultList[resultArray[i].adm_cd.substring(0, 5)] = resultObject;
						} else if (mapData.tot_type == "4") {
							resultObject["pAdmCd"] = resultArray[i].adm_cd
									.substring(0, 7);
							resultList[resultArray[i].adm_cd.substring(0, 7)] = resultObject;
						}
						this.map.selectedBoundList.push(resultObject);
					}
				}

				for ( var i in resultList) {
					if (i != "isEmpty") {
						switch (resultList[i].pAdmCd.length) {
						case 2:
							if (resultList[i].pAdmCd == "00") {
								// 줌레벨 2로 설정
								zoomLevel = 2;
								this.map.curPolygonCode = 1;
							} else {
								// 줌레벨 4로 설정
								zoomLevel = 4;
								this.map.curPolygonCode = 2;
							}
							break;
						case 5:
							// 줌레벨 7로 설정
							zoomLevel = 7;
							this.map.curPolygonCode = 3;
							break;
						case 7:
							// 줌레벨 9로 설정
							zoomLevel = 9;
							this.map.curPolygonCode = 4;
							break;
						}

						var options = {
							params : {
								filter : "data",
								unit : "",
								adm_cd : resultList[i].pAdmCd,
								year : "2014"
							}
						};
					
						if (mapData.searchMethod == "colorFull") {
							this.map.legend.selectType = "color";
						} else if (mapData.searchMethod == "bubble") {
							this.map.legend.selectType = "bubble";
						}
						this.map.isMultiControlDownBoundary = false;
						this.map.multiLayerControl.setStatsData("normal",
								resultList[i], options, false);
					}
				}

				// 범례결합을 위한 데이터설정
				this.map.dataForCombine = [];
				for (var i = 0; i < this.map.selectedBoundList.length; i++) {
					this.map.dataForCombine.push(this.map.selectedBoundList[i]);
				}
			}

			if (this.isShare) {
				this.map.mapMove(this.shareData.mapInfo.center, this.shareData.mapInfo.zoomlevel);
				this.isShare = false;
				this.shareData = null;
			}else {
				this.map.mapMove([ x_coord, y_coord ], zoomLevel);
			}
			
		},

		/**
		 * @name : drawMapGroupData
		 * @description : 지도에 데이터 그리기
		 * @date : 2016. 07. 13.
		 * @author : 최재영
		 * @history :
		 */
		drawMapGroupData : function(groupCell) {
			this.isGroup = true;
			var mapData = this.mapData[this.map_id].options;
			var hot = mapData.handsonTable;
			var dataList = []; // 체크박스 체크된 전체 데이터 저장
			var x_coord = "989674"; // X좌표
			var y_coord = "1818313"; // Y좌표
			var radio1Index = 0; // 표출데이터 인덱스
			var checkList = []; // 툴팁데이터
			var zoomLevel = 0; // 줌레벨

			// 데이터 정렬
			this.createRowObjData();

			// 범례결합을 위한 데이터설정
			if (this.delegate != null
					&& this.delegate.namespace == "interactiveMap") {
				this.delegate.dropBtnInfo[this.map.id] = {
					title : mapData.title
				};
			}

			// 북마크/공유 안됨
			//this.map.shareInfo = null;

			// 기존 데이터 삭제
			this.map.clearDataOverlay();

			// 현재 체크박스가 선택된 row를 dataList에 저장한다.
			for (var i = 0; i < mapData.rowDataArray.length; i++) {
				if (hot.getDataAtCell(i, 0)) {
					// 전체 데이터 저장
					for (var x = 0; x < mapData.rowDataArray[i].USR_DATA.length; x++) {
						for ( var p in mapData.rowDataArray[i].USR_DATA[x]) {
							for (var k = 0; k < mapData.rowHeaderArray.length; k++) {
								if (mapData.rowHeaderArray[k].COL_ID == p) {
									mapData.rowDataArray[i].USR_DATA[x]["COL_NM"] = mapData.rowHeaderArray[k].COL_NM;
									break;
								}
							}
						}
					}
					dataList.push(mapData.rowDataArray[i]);
				}
			}

			// 체크된 row가 없을 경우 return
			if (dataList.length == 0) {
				messageAlert.open("알림", "선택된 데이터가 없습니다.");
				return;
			}

			// 표출 데이터 인덱스 설정
			for (var i = 0; i < mapData.dispData.length; i++) {
				if (mapData.dispData[i] == true) {
					radio1Index = i;
				}
			}

			// 툴팁 데이터 설정
			for (var i = 0; i < mapData.tooltipSetting.length; i++) {
				if (mapData.tooltipSetting[i] == true) {
					checkList.push(i);
				}
			}

			// poi만 가능
			// 줌레벨 10으로 설정
			zoomLevel = 10;

			var colorList = {};
			var html = "";
			$("#groupCombobox").empty();
			html += "<option value='all'>전체</option>";
			for ( var groupKey in groupCell) {
				if (groupKey !== 'isEmpty') {
					var color = $mydataDataBoard.Util.getRandomColor();
					colorList[groupKey] = color;
					html += "<option value='"+color+"'>"+ groupKey +"</option>";
				}
			}
			$("#groupCombobox").append(html);

			// 마커 생성 및 표출
			mapData.markerGroup = [];
			for (var i = 0; i < dataList.length; i++) {
				x_coord = dataList[i].GEO_X;
				y_coord = dataList[i].GEO_Y;
				var markerIcon;

				for ( var groupKey in groupCell) {
					var group = groupCell[groupKey];
					if (typeof (group) !== 'function') {
						if (group.indexOf(i) != -1) {
							this.groupColorList[i] = colorList[groupKey];
							var length = $mydataDataBoard.Util.getFirstKeyValue(dataList[i].USR_DATA[radio1Index]).length;
							var width = (length * 15);
							if (width < 20) {
								width = 33;
							}
							var marginLeft = (width/2)-20;
							if(marginLeft <= 0) {
								marginLeft = 0;
							}
		
							var html  = "<div>";
						 	 html +=	"<div style='margin:0 auto;'>";
						 	 html += 	"<table style='width:"+width+"px;height:100%;margin-left:-"+marginLeft+"px;text-align:center;'>";
						 	 html +=		"<tr style='width:100%;height:30px;'>";
						 	 
						 	 if (this.isTooltipShow) {
						 		 html += "<td class='tooltip_title'><span style='font-weight:bold;height:30px;line-height:30px;'>"+$mydataDataBoard.Util.getFirstKeyValue(dataList[i].USR_DATA[radio1Index])+"</span></td>";
						 	 }else {
						 		 html += "<td class='tooltip_title' style='display:none;'><span style='font-weight:bold;height:30px;line-height:30px;'>"+$mydataDataBoard.Util.getFirstKeyValue(dataList[i].USR_DATA[radio1Index])+"</span></td>";
						 	 }
						 	 
						 	 html +=		"</tr>";
						 	 html +=	"</table>";
						 	 html +=	"<div style='background-color:"+colorList[groupKey]+";width:30px;height:30px;border-radius:50%;'>";
							 html +=	"</div>";
							 html += "</div>";
							 
							var markerIcon = new sop.DivIcon({
											html:html, 
											iconSize: new sop.Point(30, 30), 
											iconAnchor: new sop.Point(15, 30), 
											infoWindowAnchor: new sop.Point(1,-34)
							});
							break;
						}
					}

				}
				
				var marker = sop.marker([ x_coord, y_coord ], {
					icon : markerIcon,
					autoClose : false
				});

				var html = "<table style='margin:10px;'>";
				html += "<tr>";
				html += "<td style='font-size:14px;font-weight:bold;color:#3792de;'>"
						+ mapData.rowHeaderArray[radio1Index].COL_NM
						+ ":"
						+ $mydataDataBoard.Util
								.getFirstKeyValue(dataList[i].USR_DATA[radio1Index]);
				+"</td>";
				html += "<td></td>";
				html += "</tr>";
				html += "<tr style='height:5px;'></tr>";
				for (var x = 0; x < checkList.length; x++) {
					html += "<tr>";
					html += "<td style='font-size:12px;padding-left:5px;'>"
							+ dataList[i].USR_DATA[checkList[x]].COL_NM
							+ " : "
							+ $mydataDataBoard.Util
									.getFirstKeyValue(dataList[i].USR_DATA[checkList[x]])
							+ "</td>";
					html += "</tr>";
				}
				html += "</table>";
				
				marker.options["index"] = i;
				marker.options["key"] = groupKey;
				marker.bindInfoWindow(html);
				marker.addTo(this.map.markers);
				mapData.markerGroup.push(marker);
				
				
			}
			
			this.map.mapMove([ x_coord, y_coord ], zoomLevel);
			
		},
		
		
		/**
		 * @name : clearGroupingCell
		 * @description : 그룹화 해제
		 * @date : 2016. 12. 15.
		 * @author : 최재영
		 * @history :
		 */
		clearGroupingCell : function() {
			/*if (this.delegate.namespace == "interactiveMap") {
				$interactiveMap.ui.doClearMap(this.map_id + 1);
			} else if (this.delegate.namespace == "bizStatsMap") {
				$bizStatsMap.ui.doClearMap(this.map_id + 1);
			}*/
			
			/*for (var i = 0; i< $myData.marker.length; i++) {
					var marker = $myData.marker[i];
					marker.remove();
			}*/
			
			/*var mapData = this.mapData[this.map_id].options;
			for(var i = 0; mapData.markerGroup.length;i++){
				var marker = mapData.markerGroup[i];
				marker.remove();
			}*/
			$("#groupLegend").hide();
			$mydataDataBoard.ui.isGroup = false;
			$mydataDataBoard.ui.groupColorList = [];
			$mydataDataBoard.ui.toolTipChange();
			
		},
		

		/**
		 * @name : createRowObjData
		 * @description : 데이터 재정렬1
		 * @date : 2016. 03. 14.
		 * @author : 김성현
		 * @history :
		 */
		createRowObjData : function() {
			var mapData = this.mapData[this.map_id].options;

			// 원본 데이터로 다시 세팅
			mapData.rowDataArray = JSON.parse(JSON
					.stringify(mapData.rowOriginDataArray));

			for (var i = 0; i < mapData.rowDataArray.length; i++) {
				var userData = $.parseJSON(mapData.rowDataArray[i].USR_DATA);
				var rowObjList = new Array();
				mapData.rowDataArray[i].USR_DATA = new Array();
				var j = 0;
				$.each(userData, function(key, value) {
					var userObj = new Object();
					userObj[key] = value;
					rowObjList[j] = userObj;
					j++;
				});
				mapData.rowDataArray[i].USR_DATA = rowObjList;
				mapData.rowDataArray[i].ADM_CD = mapData.rowDataArray[i].ADM_CD
						.trim();
			}
			// 올바른 정렬 타이밍
			this.sortRowDataArray();

		},

		/**
		 * @name : sortRowDataArray
		 * @description : 데이터 재정렬2
		 * @date : 2016. 03. 14.
		 * @author : 김성현
		 * @history :
		 */
		sortRowDataArray : function() {
			var mapData = this.mapData[this.map_id].options;
			for (var i = 0; i < mapData.rowDataArray.length; i++) {
				var usrArray = new Array();
				for (var j = 0; j < mapData.rowHeaderArray.length; j++) {
					var key = mapData.rowHeaderArray[j].COL_ID;
					for (var k = 0; k < mapData.rowDataArray[i].USR_DATA.length; k++) {
						var tempRowArray = mapData.rowDataArray[i].USR_DATA[k];
						var tempKey = $mydataDataBoard.Util
								.getFirstKey(tempRowArray);
						if (key == tempKey) {
							var makeRowArray = new Array();
							makeRowArray[key] = tempRowArray[key];
							usrArray.push(makeRowArray);
						}
					}
				}
				mapData.rowDataArray[i].USR_DATA = usrArray;
			}
		},

		/**
		 * @name : drawKmlData
		 * @description : KML 데이터 읽기
		 * @date : 2016. 02. 01.
		 * @author : 김성현
		 * @param :
		 *            file_name
		 * @history :
		 */
		drawKmlData : function(file_name) {
			var myDataMap = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].gMap;
			var runLayer = sop.kml("/upload/myData/" + file_name).on('ready',
					function(e) {
						map.fitBounds(runLayer.getBounds());
					}).addTo(myDataMap);
		},

		/**
		 * @name : getMyKmlData
		 * @description : kml 데이터 가져오기 (데이터보드)
		 * @date : 2016. 02. 01.
		 * @author : 김성현
		 * @param :
		 *            file_name
		 * @history :
		 */
		getMyKmlData : function(file_path, file_nm_logic, file_nm_real) {
			var sopPortalGetMyKmlData = new sop.portal.getMyKmlData.api();
			sopPortalGetMyKmlData.addParam("file_path", file_path);
			sopPortalGetMyKmlData.addParam("file_nm_logic", file_nm_logic);
			sopPortalGetMyKmlData.addParam("file_nm_real", file_nm_real);
			sopPortalGetMyKmlData.request({
				method : "POST",
				async : true,
				url : contextPath
						+ "/ServiceAPI/mypage/myData/getMyKmlData.json",
			});
		},

		/**
		 * @name : remove
		 * @description : 나의데이터 삭제
		 * @date : 2015. 11. 24.
		 * @author : 김성현
		 * @param :
		 *            map_id
		 * @history :
		 */
		remove : function(map_id) {
			// 대화형통계지도 데이터보드 보이기
			$(".dataBoardDiv").hide();
			// $("#viewDataBoard").show();

			// 초기화
			this.reset(map_id);
		},

		/**
		 * @name : reset
		 * @description : 나의데이터 초기화
		 * @date : 2015. 12. 09.
		 * @author : 김성현
		 * @param :
		 *            map_id
		 * @history :
		 */
		reset : function(map_id) {
			var options = {
				map : null,
				data_id : null, // 데이터 key
				title : null, // 타이틀
				handsonTable : null, // 테이블
				markerGroup : [], // POI 그룹
				rowDataArray : [], // 데이터
				rowOriginDataArray : [], // 데이터(원본)
				rowHeaderArray : [], // 헤더
				dispData : [], // 표출데이터
				tooltipSetting : [], // 툴팁데이터
				tot_type : 0, // 집계단위 1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
				searchMethod : "poi" // 조회 방법
			}
			this.mapData[map_id].options = options;
			if (this.isStatsInfoClear) {
				this.map.clearDataOverlay();
				this.isStatsInfoClear = false;
			}
			this.map.legend.legendInit();

			$("#searchMethodBox label").removeClass("on");
			$("#searchMethodBox").find("label").removeClass("on");
			$("#searchMethodBox").find("input").removeAttr("checked");
			
			if (this.map.markers) {
				this.map.markers.clearLayers();
			}
			
			if (this.map.dataGeojson == null && 
				(this.map.multiLayerControl.dataGeojson == null || 
				 this.map.multiLayerControl.dataGeojson.length == 0)) {
				if (this.map.geojson) {
					this.map.geojson.remove();
				}
			}	
			
		},

		toolTipChange : function() {

			var dispDataArray = new Array();
			var toolTipArray = new Array();
			// toolTip
			$("input[name=rd_pselect]").each(function(i) {
				if ($("input[name=rd_pselect]").eq(i).attr("checked")) {
					dispDataArray.push(true);
				} else {
					dispDataArray.push(false);
				}
			});

			$("input:checkbox[name=rd_pck]").each(function(i) {
				if ($("input[name=rd_pck]").eq(i).attr("checked")) {
					toolTipArray.push(true);
				} else {
					toolTipArray.push(false);
				}
			});

			this.mapData[this.map_id].options.dispData = dispDataArray;
			this.mapData[this.map_id].options.tooltipSetting = toolTipArray;

			$mydataDataBoard.ui.drawMapData();
		}

	};

	$mydataDataBoard.Util = {
		/**
		 * @name : getFirstKeyValue
		 * @description : Array 첫번째 키의 value값을 가져온다.
		 * @date : 2015. 12. 15.
		 * @author : 김성현
		 * @history :
		 */
		getFirstKeyValue : function(data) {
			for (elem in data) {
				return data[elem];
			}
		},

		/**
		 * @name : getFirstKey
		 * @description : Array 첫번째 Object를 가져온다.
		 * @date : 2016. 03. 14.
		 * @author : 김성현
		 * @history :
		 */
		getFirstKey : function(data) {
			for (elem in data) {
				return elem;
			}
		},

		/**
		 * @name : settingDispAndToolTip
		 * @description : 표출데이터, 툴팁데이터 설정
		 * @date : 2015. 12. 15.
		 * @author : 김성현
		 * @history :
		 */
		settingDispAndToolTip : function(metaData) {
			var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id].options;
			for (var i = 0; i < metaData.length; i++) {
				if (metaData[i].CHECK_TYPE == "3") {
					// disp , tooltip
					mapData.dispData[i] = true;
					mapData.tooltipSetting[i] = true;
				} else if (metaData[i].CHECK_TYPE == "2") {
					// tooltip
					mapData.dispData[i] = false;
					mapData.tooltipSetting[i] = true;
				} else if (metaData[i].CHECK_TYPE == "1") {
					// disp
					mapData.dispData[i] = true;
					mapData.tooltipSetting[i] = false;
				} else {
					// nothing
					mapData.dispData[i] = false;
					mapData.tooltipSetting[i] = false;
				}
			}
		},

		changeWord : function(word) {
			switch (word.toLowerCase()) {
			case 'a':
				return 0;
				break;
			case 'b':
				return 1;
				break;
			case 'c':
				return 2;
				break;
			case 'd':
				return 3;
				break;
			case 'e':
				return 4;
				break;
			case 'f':
				return 5;
				break;
			case 'g':
				return 6;
				break;
			case 'h':
				return 7;
				break;
			case 'i':
				return 8;
				break;
			case 'j':
				return 9;
				break;
			case 'k':
				return 10;
				break;
			case 'l':
				return 11;
				break;
			case 'm':
				return 12;
				break;
			case 'n':
				return 13;
				break;
			case 'o':
				return 14;
				break;
			case 'p':
				return 15;
				break;
			case 'q':
				return 16;
				break;
			case 'r':
				return 17;
				break;
			case 's':
				return 18;
				break;
			case 't':
				return 19;
				break;
			case 'u':
				return 20;
				break;
			case 'v':
				return 21;
				break;
			case 'w':
				return 22;
				break;
			case 'x':
				return 23;
				break;
			case 'y':
				return 24;
				break;
			case 'z':
				return 25;
				break;

			}
		},
		/**
		 * @name : groupingCell
		 * @description : cell 그룹 데이터 생성
		 * @date : 2016. 07. 13.
		 * @author : 최재영
		 * @param :
		 *            col_id
		 * @history :
		 */
		groupingCell : function(col_id) {
			$("#groupLegend").show();
			var colNumber = Number($mydataDataBoard.Util.changeWord(col_id));
			var cellGroup = new Array();
			var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id];
			var hot = mapData.options.handsonTable;
			for (var i = 0; i < hot.countRows(); i++) {
				var cellData = hot.getDataAtCell(i, colNumber);
				if (cellGroup[cellData] == undefined) {
					cellGroup[cellData] = new Array();
					cellGroup[cellData].push(i);
				} else {
					cellGroup[cellData].push(i);
				}
			}
			$mydataDataBoard.ui.drawMapGroupData(cellGroup);

		},

		

		checkPck : function(idx) {
			var checkLength = $("input[name=rd_pck]").length;
			/*
			 * if($("input[name=rd_pck]").eq(idx).attr("checked") == "checked"){
			 * $("input[name=rd_pck]").eq(idx).attr("checked",false); }else{
			 * $("input[name=rd_pck]").eq(idx).attr("checked","checked"); }
			 */

			if ($("#rd_pck_" + idx).is(":checked")) {
				$("#rd_pck_" + idx).attr("checked", false);
			} else {
				$("#rd_pck_" + idx).attr("checked", true);
			}

			var checkedLength = 0;
			$("input:checkbox[name=rd_pck]").each(function(i) {
				if ($("input[name=rd_pck]").eq(i).attr("checked")) {
					checkedLength = checkedLength + 1;
				}
			});

			if (checkedLength > 3) {
				alert("3개 이상 체크 불가");
				$("input[name=rd_pck]").eq(idx).attr("checked", false);
			}

		},

		checkSelect : function(idx) {
			/* $("input[name=rd_pselect]").eq(idx).attr("checked","checked"); */

			/*
			 * var radioLength = $("input[name=rd_pselect]").length; for(var i
			 * =0;i<radioLength;i++){ if( i != idx){
			 * $("input[name=rd_pselect]").eq(i).attr("checked",false); }
			 *  }
			 */
			/* is(':checked') */
			$("input:radio[name='rd_pselect']").each(
					function(i) {
						if (i != idx) {
							$("input:radio[name='rd_pselect']").eq(i).attr(
									"checked", false);
						} else {
							$("input:radio[name='rd_pselect']").eq(idx).attr(
									"checked", "checked");
							$("input:radio[name='rd_pselect']").eq(idx).attr(
									"checked", true);
						}

					});

		},

		leadingZeros : function(n, digits) {
			var zero = '';
			n = n.toString();

			if (n.length < digits) {
				for (var i = 0; i < digits - n.length; i++)
					zero += '0';
			}
			return zero + n;
		},
		
		//랜덤칼러 생성
		getRandomColor : function() {
		    var letters = '0123456789ABCDEF';
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 16)];
		    }
		    return color;
		}

	};

	$mydataDataBoard.event = {
		/**
		 * 
		 * @name : setUIEvent
		 * @description : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2015. 12. 09.
		 * @author : 김성현
		 * @history :
		 * @param
		 */
		setUIEvent : function() {
			var body = $("body");

			// 조회 방법 설정 라디오버튼 선택
			body
					.on(
							"click",
							"#searchMethodBox label",
							function() {
								var ck = $(this).hasClass("on");
								$("#searchMethodBox").find("label")
										.removeClass("on");
								$("#searchMethodBox").find("input").removeAttr(
										"checked");
								if (!ck) {
									$(this).addClass("on");
									$(this).prev().attr("checked", "checked");
									var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id];
									// 조회 방법
									mapData.options.searchMethod = $(this)
											.prev().val();
									// 지도에 데이터 그리기
									$mydataDataBoard.ui.drawMapData();

								} else {
									$(this).removeClass("on");
									$(this).prev().removeAttr("checked");
								}
							});

			// 체크박스 전체선택, 전체해제
			// body.on("click", ".htCheckboxRendererInput:eq(0)", function() {
			/*body.on("click", ".htCheckboxRendererInput", function() {
				var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id];
				var hot = mapData.options.handsonTable;
				var tmpdata = hot.getDataAtCol(0);
				var cnt = 0;
				for (var i=0; i<tmpdata.length; i++) {
					if (tmpdata[i] == true) {
						cnt++;
					}
				}
				console.log(cnt);
			});
			*/
			body
					.on(
							"click",
							"#cellAllCheckController",
							function() {
								if ($(this).next().hasClass("on")) {
									$(this).next().removeClass("on")
								} else {
									$(this).next().addClass("on")
								}
								// 최재영
								// 기존 htCheckboxRendererInput 로 되어 있는데 이걸 다른체크
								// 박스 이벤트로 변경을 해서 ;; 음 ..
								var map = $mydataDataBoard.ui.map;
								var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id];
								var hot = mapData.options.handsonTable;
								var rows = hot.countRows();
								var tab = hot.getData();
								
								
								// 전체 체크박스에 선택이 되어 있을경우 전체 해제
								if ($("#cellAllCheckController").is(":checked") == true) {
									for(var i = 0; i < rows; i++){
										tab[i][0] = true;
								    }
								    hot.loadData(tab);
								    
								    //마커추가
									for (var i=0; i<mapData.options.markerGroup.length; i++) {
										var marker = mapData.options.markerGroup[i];
										marker.addTo(map.markers);
									}
								    
								} else {
									for(var i = 0; i < rows; i++){
										tab[i][0] = false;
								    }
								    hot.loadData(tab);
								    
								    //마커삭제
								    if (map.markers) {
								    	map.markers.clearLayers();
								    }
								}
							});

			body.on("click", "#showInfoWindowPopup", function() {
				if ($(this).next().hasClass("on")) {
					$(this).next().removeClass("on");
					$mydataDataBoard.ui.isTooltipShow = false;
					$(".tooltip_title").hide();

				} else {
					$(this).next().addClass("on");
					$mydataDataBoard.ui.isTooltipShow = true;
					$(".tooltip_title").show();
				}
			});

			body.on("click", "#dispDataZone label", function() {
				$("#dispDataZone label").each(function() {
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
				});
				$(this).addClass("on");
				$(this).prev().attr("checked", "checked");
			});

			body.on("click", "#tooltipSetting label", function() {
				if ($(this).hasClass("on")) {
					$(this).removeClass("on");
					$(this).prev().removeAttr("checked");
					$(this).prev().prop("checked", false);
				} else {
					$(this).addClass("on");
					$(this).prev().attr("checked", "checked");
					$(this).prev().prop("checked", true);
				}

				var length = 0;
				$("#tooltipSetting label").each(function(i) {
					if ($(this).hasClass("on")) {
						length++;
					}
				});

				if (length > 3) {
					messageAlert.open("알림", "툴팁은 3개까지만 볼 수 있습니다.");
					$(this).removeClass("on");
					$(this).prev().removeAttr("checked");
					$(this).prev().prop("checked", false);
				}
			});
			
			$("#groupCombobox").change(function() {
				var value = $(this).val();
				var text = $("#groupCombobox option:selected").text();
				var map = $mydataDataBoard.ui.map;
				var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map.id].options;  
				map.markers.clearLayers();
				if (value == "all") {
					$("#groupColor").css("background-color", "#ffffff");
					for (var i=0; i<mapData.markerGroup.length; i++) {
						var marker = mapData.markerGroup[i];
						map.markers.addLayer(marker);
					}
				}else {
					$("#groupColor").css("background-color", value);
					for (var i=0; i<mapData.markerGroup.length; i++) {
						var marker = mapData.markerGroup[i];
						if (marker.options.key == text) {
							map.markers.addLayer(marker);
						}
					}
				}
			});
			
		},
		
		handleHotAfterOnCellMouseDown : function(event, coord, element) {
			setTimeout(function() {
				var hot = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id].options.handsonTable;
				var data = hot.getDataAtRow(coord.row);
				var isCheck = data[0]; //checkbox
				var index = data[1]; //no
				var map = $mydataDataBoard.ui.map;
				if (map.markers) {
					if (!isCheck) {
						map.markers.eachLayer(function(marker) {
							if (marker.options.index == index-1) {
								marker.remove();
								map.markers.removeLayer(marker);
							}
						});
					}else {
						var isExist = false;
						map.markers.eachLayer(function(marker) {
							if (marker.options.index == index-1) {
								isExist = true;
								map.mapMove([marker._utmk.x, marker._utmk.y], map.zoom);
							}
						});
						if (!isExist) {
							var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id].options;
							for (var i=0; i<mapData.markerGroup.length; i++) {
								var marker = mapData.markerGroup[i];
								if (marker.options.index == index-1) {
									marker.addTo(map.markers);
									break;
								}
							}
						}
					}
				}
			}, 200);
		}
	};
	
	$mydataDataBoard.callbackFunc = {
			didMapMoveEnd : function(event, map) {
				if ($mydataDataBoard.ui.displayType == "location") {
					var mapData = $mydataDataBoard.ui.mapData[map.id].options;
					map.gMap.eachLayer(function(layer) {
						if (layer._markers) {
							if ($mydataDataBoard.ui.isTooltipShow) {
								$(".tooltip_title").show();
							}else {
								$(".tooltip_title").hide();
							}
						}
					});
				}
			}
	};

	/** ********* 나의 데이터 목록 Start ********* */
	$class("sop.portal.myDataList.api")
			.extend(sop.portal.absAPI)
			.define(
					{
						onSuccess : function(status, res, options) {
							var result = res.result;
							$("#myDataLoadList").empty();
							if (res.errCd == "0") {
								var html = "";
								for (var i = 0; i < result.list.length; i++) {
									var elem = result.list[i];
									html += "<li>";
									html += "	<a href=\"javascript:$mydataDataBoard.ui.updateMyData('"
											+ elem.DATA_ID
											+ "','"
											+ elem.DATA_TITLE + "', '"+elem.MAP_DISP_TYPE+"');\">";
									html += "		<div class='mydata_title'>"
											+ elem.DATA_TITLE + "</div>";
									html += "		<div class='mydata_info'>"
											+ elem.USR_ID.substring(0, 3)
											+ "xxx  " + elem.UPLOAD_DT
											+ "</div>";
									html += "</a>";
									html += "</li>";
								}
								$("#myDataLoadList").html(html);

								if (result.totalcount > 5) {
									var htmlPage = "<br><br><br><div id='myDataPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
									$("#myDataListTablePage").html(htmlPage);
								}
								$mydataDataBoard.ui.myDataPaging(
										result.totalcount,
										$mydataDataBoard.ui.myPageNum);
							}
						},
						onFail : function(status) {
						}
					});
	/** ********* 나의 데이터 목록 End ********* */

	/** ********* 공개된 사용자 데이터 목록 Start ********* */
	$class("sop.portal.sharedDataList.api")
			.extend(sop.portal.absAPI)
			.define(
					{
						onSuccess : function(status, res, options) {
							var result = res.result;
							$("#shareDataLoadList").empty();
							if (res.errCd == "0") {
								var html = "";
								for (var i = 0; i < result.list.length; i++) {
									var elem = result.list[i];
									html += "<li>";
									html += "	<a href=\"javascript:$mydataDataBoard.ui.updateMyData('"
											+ elem.DATA_ID
											+ "','"
											+ elem.DATA_TITLE + "', '"+elem.MAP_DISP_TYPE+"');\">";
									html += "		<div class='mydata_title'>"
											+ elem.DATA_TITLE + "</div>";
									html += "		<div class='mydata_info'>"
											+ elem.USR_ID.substring(0, 3)
											+ "xxx  " + elem.UPLOAD_DT
											+ "</div>";
									html += "</a>";
									html += "</li>";
								}
								$("#shareDataLoadList").html(html);

								if (result.totalcount > 5) {
									var htmlPage = "<br><br><br><div id='shareDataPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
									$("#shareDataListTablePage").html(htmlPage);
								}
								$mydataDataBoard.ui.sharedDataPaging(
										result.totalcount,
										$mydataDataBoard.ui.sharedPageNum);
							}
						},
						onFail : function(status) {
						}
					});
	/** ********* 공개된 사용자 데이터 목록 End ********* */

	/** ********* 사용자 데이터 (데이터보드) Start ********* */
	$class("sop.portal.getUserData.api")
			.extend(sop.portal.absAPI)
			.define(
					{
						// start
						onSuccess : function(status, res, options) {
							var result = res.result;
							var mapData = $mydataDataBoard.ui.mapData[$mydataDataBoard.ui.map_id].options;
							var map = options.map;
							if (res.errCd == "0") {
								
								// kml 일경우 데이터 불러오는것을 바꾸어야 한다.
								var str = res.result[0].mainData.FILE_NM_REAL;
								var extName = str.split(".");
								// 데이터가 kml일 경우
								if (extName[extName.length - 1] == "kml") {
									$mydataDataBoard.ui
											.drawKmlData(res.result[0].mainData.FILE_NM_LOGIC);
									$mydataDataBoard.ui
											.getMyKmlData(
													res.result[0].mainData.FILE_PATH,
													res.result[0].mainData.FILE_NM_LOGIC,
													res.result[0].mainData.FILE_NM_REAL);

								} else { // 기타 데이터일 경우
									mapData.tot_type = res.result[0].mainData.TOT_TYPE;
									mapData.rowOriginDataArray = JSON
											.parse(JSON
													.stringify(res.result[0].uploadData));
									mapData.rowDataArray = res.result[0].uploadData;
									mapData.rowHeaderArray = res.result[0].metaData;
									$mydataDataBoard.Util
											.settingDispAndToolTip(mapData.rowHeaderArray);
									setTimeout(function() {
										$mydataDataBoard.ui.drawUserData(res);
									}, 1000);

								}

								// API 로그
								options.title = res.result[0].mainData.DATA_TITLE; // 타이틀
								if ($mydataDataBoard.ui.delegate.namespace == "interactiveMap") {
									// apiLogWrite("A0", options);
								} else if ($mydataDataBoard.ui.delegate.namespace == "bizStatsMap") {
									// apiLogWrite("B0", options);
								}
								
								//공유
								map.shareInfo.setMyDataShareInfo(options, "userData", map.id); 
							}
						},
						onFail : function(status) {
						}
					});
	/** ********* 사용자 데이터 (데이터보드) End ********* */

	/** ********* kml 데이터 가져오기 (데이터보드) Start ********* */
	$class("sop.portal.getMyKmlData.api").extend(sop.portal.absAPI).define(
			{
				onSuccess : function(status, res, options) {
					if (res.errCd == "0") {
						$("#basic_handson01")
								.html(
										"<textarea disabled cols='63' rows='30' style='resize: none;wrap:hard'>"
												+ res.result[0].content
												+ "</textarea>");
						$(".myDataDivSub").hide();
						$("#myDataKmlDiv").show();
					}
				},
				onFail : function(status, options) {
				}
			});
	/** ********* kml 데이터 가져오기 (데이터보드) End ********* */
}(window, document));

$.fn.textWidth = function(){
	  var html_org = $(this).html();
	  var html_calc = '<span>' + html_org + '</span>';
	  $(this).html(html_calc);
	  var width = $(this).find('span:first').width();
	  $(this).html(html_org);
	  return width;
	};