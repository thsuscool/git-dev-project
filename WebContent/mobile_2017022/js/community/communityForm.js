(function(W, D) {
	W.$communityForm = W.$communityForm || {};
	var defaultCurAdmCd,defaultCurAdmNm,defaultCurCenter,defaultCurZoom;
	$sgis.ready(function(){
		var showStaticList = function(){
			$(".sideQuick.sq03").next(".sqListBox").css("z-index","1001");
			$(".sideQuick.sq03").next(".sqListBox").stop().animate({"left":"0"},200,function(){
				$(".sideQuick.sq03").addClass("on");
			});
		};
		var hideStaticList = function(){
			$(".sideQuick.sq03").next(".sqListBox").stop().animate({"left":"-293px"},200,function(){
				$(".sideQuick.sq03").next(".sqListBox").css("z-index","0");
				$(".sideQuick.sq03").removeClass("on");
			});
		};
		$interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].gMap.on("movestart zoomstart mousedown",function(){
			if($(".sideQuick.sq03").hasClass("on")){
				hideStaticList();
			}
		});
		hasCommunity(function(res){
			$communityForm.communityInfo = res;
			if(/M|P|A/.test(res.result.summary.cmmnty_partcptn_grant_yn)&&res.result.summary.usr_id!==AuthInfo.member_id){
				$("#join-m-type").show();
			}else{
				$("#join-m-type").remove();
			}
			defaultCurAdmCd = res.result.summary.adm_cd;
			defaultCurAdmNm = res.result.summary.adm_nm;
			defaultCurCenter = [res.result.summary.area.x_coor,res.result.summary.area.y_coor];
			if(defaultCurAdmCd==undefined||defaultCurAdmCd.length<2){
				defaultCurZoom = 1;
			}else if(defaultCurAdmCd.length==2){
				defaultCurZoom = 4;
			}else if(defaultCurAdmCd.length==5){
				defaultCurZoom = 7;
			}else if(defaultCurAdmCd.length==7){
				defaultCurZoom = 9;
			}
			$communityForm.symbol = res.result.summary.reg_symbol;
			
			var symbolGroup = $communityForm.symbol;
			if(location.pathname.indexOf(communityPath+"Result.html")==-1){
				$.each(res.result.custom_symbol_list,function(cnt,node){
					var itemInput,itemImg;
					if($communityForm.symbol){
						itemInput = $("<input/>",{name:"symbol",type:"radio",value:node.order,checked:cnt==0});
						itemImg = $("<img/>",{style:"width: auto;",src:'/img/community/iconset_'+$communityForm.symbol+node.order+'.png'});
					}else{
						itemInput = $("<input/>",{name:"symbol",type:"radio",value:node.custom_symbol_id,checked:cnt==0});
						itemImg = $("<img/>",{style:"width: 23px;height:28px;",src:node.path_nm+node.save_file_nm});
					}
					$("#symbol-type").append(
						$("<li/>",{style:"width:calc(90%/"+res.result.custom_symbol_list.length+")","class":(cnt==0?"Check":"")}).append(
							$("<label/>").append(itemInput,itemImg)
						)	
					);
				});
			}
			$("#symbol-type-"+symbolGroup).show();
			var sideQuickLookId = location.pathname.indexOf(communityPath+"Result.html")>-1?".Community_map":"#insert-form";
			$(".sideQuick.sq03").css({"top":($(sideQuickLookId).offset().top-$(".sideQuick.sq03").outerHeight(false))+"px"});
			$(".sqListBox.sq03").css({"top":($(sideQuickLookId).offset().top-$(".sqListBox.sq03").outerHeight(false))+"px"});
			$communityForm.statisticsListBtn(res);
			//통계리스트
			$(".sideQuick.sq03").click(function() {
				var on = $(this).hasClass("on");
				if(!on){
					showStaticList();
				}else{
					hideStaticList();
				}
			});
			$(".List li input:radio").change(function(){
				$(this).parents(".List").find("li").removeClass("Check");
				$(this).parents("li").addClass("Check");
			});
			$("input[name=fileSearch]").change(function(){
				$("#filePathField").val($("input[name=fileSearch]")[0].files[0].name);
			});
			$("#insert-form").submit(function(){
				var mComm_id = "#insert-form";
				var sopAbs = new sop.portal.absAPI();
				sopAbs.onBlockUIPopup();
				if($communityForm.validation()){
					var formData = new FormData();
					formData.append("cmmnty_map_id",getParameter("cmmnty_map_id"));
					formData.append("loc_x",$communityForm.x);
					formData.append("loc_y",$communityForm.y);
					formData.append("title", $(mComm_id+" input[name=title]").val());
					formData.append("reg_lc", $(mComm_id+" input[name=reg_lc]").val());
					formData.append("opinion_state", $(mComm_id+" input[name=opinion_state]").val());
					formData.append("symbol", $(mComm_id+" input[name=symbol]:checked").val());
					
					if(/M|P|A/.test($communityForm.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityForm.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
						formData.append("cmmnty_ipcd", $("#id").val());
						formData.append("cmmnty_ppcd", $("#pw").val());
					}
					$.ajax({
						url: contextPath + "/ServiceAPI/community/communityPoiRegist.json",
						data: formData,
						processData: false,
						contentType: false,
						type: 'POST',
						dataType:"json",
						success: function(res){
							if (res.errCd == "0") {
								messageAlert.open(
									"알림", 
									"등록되었습니다",
									function done() {
										location.href=contextPath+'/mobile/html/community/mapPrtcpntRegistDetail.html?cmmnty_map_id='+getParameter('cmmnty_map_id')+'&cmmnty_poi_id='+res.result.cmmnty_poi_id;
									}
								);
								sopAbs.onBlockUIClose();
								apiLogWrite2("K4",getParameter("cmmnty_map_id"),"통계소통지도 모바일 등록","없음","00","전국");
							} else {
								messageAlert.open("알림", res.errMsg);
								sopAbs.onBlockUIClose();
							}
						},
						error: function(xhr, status, errorThrown){
							messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
							sopAbs.onBlockUIClose();
						}
					});
				}
				sopAbs.onBlockUIClose();
				return false;
			});
			if(location.pathname.indexOf("/mobile/html/community/mapPrtcpntRegistForm.html")>-1){
				var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
				map.gMap.on("click",function(e){
					if($communityForm.curAddressSearchType=="map"){
						$communityForm.addCoorMarker(e.utmk.x,e.utmk.y);
						$communityForm.curAddressSearchType = null;
					}
				});
			}
		});
		//20160531 나광흠 추가 시작
		$("#cmmnty_opinion_state").on("keyup keydown keypress",function(){
			if($(this).val().length>150){
				$("label[for=cmmnty_opinion_state] span").css({"color":"#c00","font-weight":"bold"});
			}else{
				$("label[for=cmmnty_opinion_state] span").css({"color":"","font-weight":""});
			}
			var count = ($(this).val().match(/\n/gi) || []).length;
			$("label[for=cmmnty_opinion_state] span").text($(this).val().length+count);
		});
		//20160531 나광흠 추가 종료
	});
	$communityForm = {
		x : null,
		y : null,
		symbol : null,
		marker : null,
		curAddressSearchType:null,//주소 등록 타입 (map:위치선택,popup:주소선택)
		addCoorMarker : function(x,y){
			var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
			map.gMap.closeInfoWindow();
			var address = $communityForm.getAddressFromCoordinate(x,y);
			if(address&&address.result.length>0){
				$("#file_input_textLocation").val(address.result[0].full_addr);
				var data = address.result[0];
				$communityForm.addMarker(data.sido_cd+data.sgg_cd+data.emdong_cd,x, y,map);
			}else{
				messageAlert.open("알림", "잘못된 좌표가 선택되었습니다. 다시 선택해주세요");
			}
		},
		addMarker : function(adm_cd,x,y,map){
			if($communityForm.marker!=null){
				$communityForm.marker.remove();
			}
			var curAdmCd = adm_cd.substring(0,defaultCurAdmCd?defaultCurAdmCd.length:0);
//			20160524 나광흠 수정 시작
//			if(defaultCurAdmCd==undefined||curAdmCd==defaultCurAdmCd||defaultCurAdmCd=="00"){
//				$communityForm.x = x;
//				$communityForm.y = y;
//				var marker = sop.marker([x,y]);
//				marker.addTo(map.gMap); //마커를 map 추가
//				$communityForm.marker = marker;
				
//			}else{
//				messageConfirm.open(
//					"알림","\'"+defaultCurAdmNm+"\' 에 벗어난 영역에는 등록하실 수 없습니다<br> 등록 가능 지역으로 이동하시겠습니까?",[{
//						title : "확인",
//						fAgm : null,
//						disable : false,
//						func : function(opt) {
//							var zoom;
//							map.mapMove(defaultCurCenter,defaultCurZoom);
//						}
//					},{
//						title : "취소",
//						fAgm : null,
//						disable : false,
//						func : function(opt) {
//						}
//					}   
//				]);
//				return;
//			}
			$communityForm.x = x;
			$communityForm.y = y;
			var marker = sop.marker([x,y]);
			marker.addTo(map.gMap); //마커를 map 추가
			$communityForm.marker = marker;
//			20160524 나광흠 수정 종료
		},
		currentLocationEvent : function(){
			var sopAbs = new sop.portal.absAPI();
			sopAbs.onBlockUIPopup();
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
					$communityForm.addCoorMarker(utmkXY.x,utmkXY.y);
					sopAbs.onBlockUIClose();
					var xy = [utmkXY.x, utmkXY.y];
					$interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].mapMove(xy, defaultCurZoom);//현재위치 클릭시 현재위치 표시
					
				}, function(error) {
					var message; 
					if (error.code === 1) {
						message = "현재위치를 동의하지 않았습니다";
					} else if (error.code === 2) {
						message = "GPS를 확인할 수 없습니다";
					} else if (error.code === 3) {
						message = "현재위치를 찾는데 시간이 초과되었습니다";
					} else {
						message = "알수 없는 에러가 발생하였습니다";
					}
					messageAlert.open("알림",message);
					sopAbs.onBlockUIClose();
				}, {
					timeout: 5000
				});
			} else {
				sopAbs.onBlockUIClose();
			}
		},
		validation : function(){
			var result = true; 
			if($communityForm.x==null||$communityForm.y==null){
				result = false;
				messageAlert.open("알림", "정확한 주소를 선택해주세요");
				$("#file_input_textLocation").focus();
			}else if($("#cmmnty_title").val().replace(/ /gi,'')==''){
				result = false;
				messageAlert.open("알림", "제목을 작성해주세요");
				$("#cmmnty_title").focus();
			}else if($("#cmmnty_opinion_state").val().replace(/ /gi,'')==''){
				result = false;
				messageAlert.open("알림","의견을 등록해주세요");
			}
			if(/M|P|A/.test($communityForm.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityForm.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
				if($("#id").val().replace(/ /gi,'')==''){
					result = false;
					messageAlert.open("알림", "아이디를 작성해주세요");
				}else if($("#pw").val().replace(/ /gi,'')==''){
					result = false;
					messageAlert.open("알림", "비밀번호를 작성해주세요");
				}
			}
			if(result){
				if($("#cmmnty_title").val().length>30){
					result = false;
					messageAlert.open("알림","제목은 최대 30글자까지 등록할 수 있습니다",function(){
						$("#cmmnty_title").focus();
					});
				}else if($("#cmmnty_opinion_state").val().length>150){
					result = false;
					messageAlert.open("알림","의견은 최대 150글자까지 등록할 수 있습니다",function(){
						$("#cmmnty_opinion_state").focus();
					});
				}
			}
			return result;
		},
		//통계리스트(색지도)
		statisticsListBtn : function(res){
			$("#cMapList").empty();
			var options = {};
			var defaultSetValue = function(options){
				options.addressAdmCd = "2503060";
				options.x = "989810";
				options.y = "1818183";
			};
			var zoom = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].gMap.getZoom();
			if (res.errCd=="0"){
				var sido = res.result.summary.area_estbs_sido_cd;
				var sgg = res.result.summary.area_estbs_sgg_cd;
				var emdong = res.result.summary.area_estbs_emdong_cd;
				options.addressAdmCd="";
				if(sido!="00"){
					options.addressAdmCd = options.addressAdmCd+sido;
					zoom = 3;
					if(sgg!="999"){
						options.addressAdmCd = options.addressAdmCd+sgg;
						zoom = 4;
						if(emdong!="00"){
							options.addressAdmCd = options.addressAdmCd+emdong;
							zoom = 6;
						}
					}
				}else{
					//전국 셋팅
					zoom = 1;
				}
				
				if(res.result.summary.area.x_coor&&res.result.summary.area.y_coor){
					options.x = res.result.summary.area.x_coor;
					options.y = res.result.summary.area.y_coor;
				}else{
					if(options.addressAdmCd){
						var getCoor = function(data,adm_cd){
							var returnValue = false;
							$.ajax({
								method: "GET",
								async: false,
								url: openApiPath + "/OpenAPI3/addr/stage.json",
								data: data,
								dataType: "json",
								success: function(res) {
									if (res.errCd == "0") {
										$.each(res.result,function(cnt,node){
											if(node.cd==adm_cd){
												returnValue = [node.x_coor,node.y_coor];
												return false;
											}
										});
									}
								},
								error: function(e) {
									messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
								}
							});
							return returnValue;
						}
						var center;
						if(options.addressAdmCd.length<=2){
							center = getCoor({"accessToken" : accessToken},options.addressAdmCd);
						}else if(options.addressAdmCd.length<=5){
							center = getCoor({"accessToken" : accessToken,"cd":options.addressAdmCd.substring(0,2)},options.addressAdmCd);
						}else if(options.addressAdmCd.length<=7){
							center = getCoor({"accessToken" : accessToken,"cd":options.addressAdmCd.substring(0,5)},options.addressAdmCd);
						}
						if(center){
							options.x = center[0];
							options.y = center[1];
						}
					}else{
						defaultSetValue(options);
					}
				}
				if(getParameter("center")&&getParameter("center")!=null&&getParameter("center")!="null"&&getParameter("center").length>0){
					var getParameterCenter = decodeURIComponent(getParameter("center")).split(",");
					options.x = getParameterCenter[0];
					options.y = getParameterCenter[1];
				}
				$.each(res.result.summary.stats,function(cnt,node){
					var histNm = node.hist_nm;
					if(node.list == "bassStats"){$
						histNm = "총인구"
					}else if(node.list == "bassBsnes"){
						histNm = "총사업체"
					}
					$("#cMapList").append(
						'<li><input type="radio" name="cMapLi" id="cMapLi_'+cnt+'" value="'+node.list+'"'+(cnt==0?" checked='checked'":'')+'><label for="cMapLi_'+cnt+'">'+histNm+'</label></li>'
					);
				});
				
				if($("#cMapList").children().length>0){
					//통계 선택
					$("#cMapList input:radio").change(function(){
						if($(this).is(":checked")){
							$communityForm.openApiStatistics($(this).val(),options,zoom);
						}
					});
					var sopAbs = new sop.portal.absAPI();
					sopAbs.onBlockUIPopup();
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {
							var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
							options.x = utmkXY.x;
							options.y = utmkXY.y;
							$communityForm.openApiStatistics(res.result.summary.stats[0].list,options,6);
							sopAbs.onBlockUIClose();
						}, function(error) {
							var message;
							if (error.code === 1) {
								message = "현재위치를 동의하지 않았습니다";
							} else if (error.code === 2) {
								message = "GPS를 확인할 수 없습니다";
							} else {
								message = "현재 위치를 찾는데 실패하였습니다";
							}
							messageAlert.open("알림", message);
					$communityForm.openApiStatistics(res.result.summary.stats[0].list,options,zoom);
							sopAbs.onBlockUIClose();
						}, {
							timeout: 5000
						});
					}
				}else{
					$(".sideQuick.sq03,.sqListBox.sq03").hide();
				}
				 
			}
		},
		
		openApiStatistics : function(key,options,zoom){
			if(options.addressAdmCd==undefined||options.addressAdmCd.length<=0){
				options.addressAdmCd = "00";
			}
			if(key=="bassStats"||key=="bassBsnes"){
				options.map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
				options.year = censusDataYear;
				options.map.mapMove([options.x,options.y],zoom);
				if(key=="bassStats"){
					options.id = "API_0301-0";
					options.title = "총인구";
					options.filterParam = "tot_ppltn";
					options.unit = "명";
				}else if(key=="bassBsnes"){
					options.id = "API_0304-0";
					options.title = "총사업체";
					options.filterParam = "corp_cnt";
					options.unit = "사업체수";
				}
				$communityForm.setStatsMap(options);
				//지도를 움직여서 실제적으로 데이터를 지도에 오버라이드
				var center = [options.map.gMap.getCenter().x,options.map.gMap.getCenter().y];
				options.map.mapMove([center[0]-100,center[1]-100],zoom);
				options.map.mapMove(center,zoom);
			}else{
				$interactiveMap.ui.analysisShareInfo({key:key},options);
			}
			
		},
		
		getAddressFromAddress : function(address){
			var sopAbs = new sop.portal.absAPI();
			sopAbs.onBlockUIPopup();
			var result;
			var addr_jibun ;
			var param_addr = function(){
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/geocode.json",
				data: {
					"accessToken" : accessToken,
					"address": address
				},
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						result = res;
						} else if(res.errCd == "-100"){
							addr_jibun=res.errCd;
					} else {
						messageAlert.open("알림", res.errMsg);
					}
					sopAbs.onBlockUIClose();
				},
				error: function(e) {
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					sopAbs.onBlockUIClose();
				}
			});
			}
			if(addr_jibun == "-100"){
				param_addr();
			}else{
				param_addr();
			}
			return result;
		},
		getAddressFromCoordinate : function(x,y){
			var sopAbs = new sop.portal.absAPI();
			sopAbs.onBlockUIPopup();
			var result;
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/rgeocode.json",
				data: {
					"accessToken" : accessToken,
					"x_coor": x,
					"y_coor": y,
					"addr_type" : 10
				},
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						result = res;
						}else if (res.errCd == "-100") {
							$.ajax({
								method: "GET",
								async: false,
								url: "//sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json",
								data: {
									"accessToken" : accessToken,
									"x_coor": x,
									"y_coor": y,
									"addr_type" : 20
								},
								dataType: "json",
								success: function(res){
									if (res.errCd == "0") {
										result = res;
									}
									sopAbs.onBlockUIClose();
								},
							});
					} else {
						messageAlert.open("알림", res.errMsg);
					}
					sopAbs.onBlockUIClose();
				},
				error: function(e) {
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					sopAbs.onBlockUIClose();
				}
			});
			return result;
		},
		getAdmCdToCoor:function(adm_cd,year,low_search){
			var result = null,type = "hadmarea";
			var data = {
				"accessToken" : accessToken,
				"year" : year
			};
			if(adm_cd!=null&&adm_cd!=undefined&&adm_cd.length>0){
				data.adm_cd = adm_cd;
				if(adm_cd.length>=7){
					type = "statsarea";
				}
			}
			if(low_search!=null&&low_search!=undefined&&low_search.length>0){
				if(adm_cd.length<=5){
					data.low_search = low_search;
				}
			}
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/boundary/"+type+".geojson",
				data: data,
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						result = res;
					} else {
						messageAlert.open("알림", res.errMsg);
					}
				},
				error: function(e) {
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
				}
			});
			return result;
		},
		getFnZipCodeSearch : function(){
			var pop = window.open(contextPath+"/view/community/popup/joso","pop","scrollbars=yes");
		},
		//통계리스트 총인구
		setStatsMap : function(options) {
			var selParams = new Array();
			var noneParams = new Array();
			var api_id = new Array();
			var index = null;
			var filterParam = new Array();
			var unit = new Array();
			var title = new Array();
			var maxYear = new Array();
			var initParams = new Array();
			$interactiveMapApi.request.combineFailCnt = 0;
			
			var namesList = new Array();
			var noneParamsList = new Array();
			var paramsList = new Array();
			
			
			namesList.push(options.title);
			paramsList.push({key : "year",value : options.year});
			paramsList.push({key : "low_search",value : "1"});
			var inintParam = {
				filterParam : options.filterParam,
				idx : 0,
				names : namesList,
				noneParams : noneParamsList,
				params : paramsList,
				title : options.title,
				unit : options.unit
			};
			
			initParams.push(inintParam);
			var tmpParamList = deepCopy(initParams);
			
			api_id.push(options.id.split("-")[0]);
			index = options.id.split("-")[1];

			for (var i=0; i<tmpParamList.length; i++) {
				if (tmpParamList[i].idx == index) { //=> 0302_1 형태
					selParams.push(tmpParamList[i].params);
					noneParams.push(tmpParamList[i].noneParams);
					filterParam.push(tmpParamList[i].filterParam);
					unit.push(tmpParamList[i].unit);
					title.push(tmpParamList[i].title);
					maxYear.push(tmpParamList[i].maxYear);
					break;
				}
			}
			
			for (var i = 0; i < api_id.length; i++) {
				if (selParams.length > 0) {				
					var params = {
							param : selParams[i],
							noneParams : noneParams[i],
							adm_cd : options.addressAdmCd,
							filter : filterParam[i],
							unit : unit[i],
							title : title[i],
							api_id : api_id[i],
							map : options.map,
							view_type : "NM",
							maxYear : maxYear[i]
					};	
					params.param.push({
						key : "low_search",
						value : "1"//map.boundLevel
					});
					$interactiveMap.ui.curDropParams[options.map.id] = params;
					$interactiveMap.ui.requestOpenApi(params);
				}
			}
		}
	};
}(window, document));