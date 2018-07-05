/**
 * 살고싶은 우리동네 버튼에 대한 클레스
 * 
 * history : (주)유코아시스템, 1.0, 2015/12/23  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$houseAnalysisMap.btninfo = {
		shcoolDataGeojson : [], 
		poi	: function(map) {
			var that = this;
			this.map = map;
			this.id = null;
			this.mapBounds = null;
			this.selectedPoiTitle = null;
			this.isShow = false;
			/**
			 * 
			 * @name         : initialize
			 * @description  : 초기화한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.initialize = function() {
				var currentdate = new Date();
				this.id = makeStamp(currentdate);
				
				this.createPOIBtn();
				this.eventHandler();
			};
			/**
			 * 
			 * @name         : clearPOI
			 * @description  : 표출된 POI 정보를 초기화한다.
			 * @date         : 2016. 02. 12. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.clearPOI = function() {
				this.map.mapBtnInfo.clearPOI();
				this.map.mapHouseBtnInfo.closeMenu();
				this.map.markers.clearLayers();
				this.map.mapHouseBtnInfo.center = null;
				this.map.mapHouseBtnInfo.mapBounds = null;
				this.map.mapHouseBtnInfo.selectedPoiTitle = "";
				this.map.mapHouseBtnInfo.isOpenPOI = false;
				this.map.mapHouseBtnInfo.isBusOpenPOI = false;
				this.map.mapHouseBtnInfo.isShowBus = false;
				this.map.mapHouseBtnInfo.isShow = false;
				this.clearSchool();
			},
			/**
			 * 
			 * @name         : clearSchool
			 * @description  : 표출된 학구도 정보를 초기화한다.
			 * @date         : 2016. 02. 12. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.clearSchool = function(){
				$.map($houseAnalysisMap.btninfo.shcoolDataGeojson,function(value,key){
					value.remove();
				});
				$houseAnalysisMap.btninfo.shcoolDataGeojson = [];
			}
			/**
			 * 
			 * @name         : closeMenu
			 * @description  : 지도버튼을 선택했을 때, 열려있던 메뉴를 닫는다.
			 * @date         : 2016. 02. 12. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.closeMenu = function() {
				$("ol[data-type=children]").hide();
				$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
				$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
			},
			/**
			 * 
			 * @name         : createPOIBtn
			 * @description  : 인터랙티브맵의 외부POI버튼을 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createPOIBtn = function() {
				var poiUI = sop.control({position: 'topright'});
				poiUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'poi_' +that.id);
				    that.poiObj = this._div;
				    return this._div;
				};
				poiUI.update = function (props) {
					var html = "";
					html += "<div class='mapBtnWrapper'>";
					html += "	<a class='rightQuick rq01 on'><span>GPS</span></a>";
					html += "	<ul class='rqListBox rq01' style='width: 234px;right: 45px;'>";	
					html += "		<li>";	
					html += "			<a><span>학구도</span></a>";	
					html += "			<ol class='rqIcon04'></ol>";    				
					html += "		</li>";     			
					html += "		<li>";	
					html += "			<a><span style='font-size: 10px;'>생활<br />편의 교통</span></a>";	
					html += "			<ol class='rqIcon01'></ol>";    				
					html += "		</li>";     			
					html += "		<li>";
					html += "			<a><span>교육</span></a>";      			
					html +=	"			<ol class='rqIcon02'></ol>";    				
					html += "		</li>";    				
					html += "		<li>";
					html += "			<a><span>복지 문화</span></a>";    			
					html +=	"			<ol class='rqIcon03'></ol>";
					html += "		</li>"; 
					html += "		<li id='poiInit_"+that.id+"'>";
					html += "			<a class='ico_side_Select'><span>초기화</span></a>";
					html += "		</li>";
					html += "	</ul>";
					html += "</div>";
					this._div.innerHTML = html;
				};
				poiUI.addTo(this.map.gMap);
				
				this.addLifePoiList();
				this.addEduPoiList();
				this.addWelfareCulturePoiList();
				this.addSchoolZone();
			};
			this.schoolZone = function(){
				var that = this;
				$houseAnalysisMap.ui.doReset(function(){
					$(".interactiveBar>.helperText>span").empty();
					that.map.mapHouseBtnInfo.isOpenPOI = true;
					that.map.mapHouseBtnInfo.isShow = true;
					that.mapBounds = map.gMap.getBounds();
					var area = 'RECTANGLE('+that.mapBounds._southWest.x + ' ' + that.mapBounds._southWest.y + ','+that.mapBounds._northEast.x + ' ' + that.mapBounds._northEast.y+')';
					var shcool = function(map,t,d,area){
						var urlPattern;
						var obj = new sop.portal.poi.houseScoolInfo.api();
						obj.onBlockUIPopup();
						obj.addParam("type", t);
						obj.addParam("area", area);
						obj.request({
							method: "POST",
							async: true,
							url : contextPath+"/ServiceAPI/house/areaSchool"+d+"."+(d=="Polygon"?"geojson":"json"),
							options : {
								d : d
							}
						});
					}
					shcool(that.map,that.schoolType,"Polygon",area);
					shcool(that.map,that.schoolType,"Point",area);
				});
			};
			this.busStopPoi = function(){
				var that = this;
				$houseAnalysisMap.ui.doReset(function(){
					$(".interactiveBar>.helperText>span").empty();
					that.map.mapHouseBtnInfo.isBusOpenPOI = true;
					that.map.mapHouseBtnInfo.isShowBus = true;
					that.mapBounds = map.gMap.getBounds();
					var obj = new sop.portal.poi.houseBusInfo.api();
					obj.onBlockUIPopup();
					obj.addParam("minx", that.mapBounds._southWest.x);
					obj.addParam("miny", that.mapBounds._southWest.y);
					obj.addParam("maxx", that.mapBounds._northEast.x);
					obj.addParam("maxy", that.mapBounds._northEast.y);
					obj.request({
						method: "POST",
						async: true,
						url : contextPath+"/ServiceAPI/bizStats/poietcbusstop.json"
					});
				});
			};
			/**
			 * 
			 * @name         : addSchoolZone
			 * @description  : 학구도 poi와 polygon정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addSchoolZone = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='requestSchoolInfo' data-code='0'><img src='/img/ico/ico_7001.png' alt='초등학교'><span style='text-indent: 0px;'>초등학교</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='requestSchoolInfo' data-code='1'><img src='/img/ico/ico_7001.png' alt='중학교'><span style='text-indent: 0px;'>중학교</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='requestSchoolInfo' data-code='2'><img src='/img/ico/ico_7001.png' alt='고등학교'><span style='text-indent: 0px;'>고등학교</span></a></li>";
				html += "<li style='width:auto;float:none;height:auto;'><span style='font-size:10px;'>* 자료원 : <br>한국교육개발원 (<a style='font-size: 10px;letter-spacing: 0px;text-align: center;display: inline-block;width: auto;height: auto;overflow: hidden;background: none;color: #666;border-radius: 0%;' href='http://schoolzone.edumac.kr' target='_blank'>schoolzone.edumac.kr</a>)<br>초등학교는 아래 일부지역만 제공됨에 유의<br>(서울(동부, 강서, 강남), 인천, 대전, 경기(고양), 경북)</span></li>";	
				$("#poi_" + that.id).find(".rqIcon04").append(html);
			};
			/**
			 * 
			 * @name         : addLifePoiList
			 * @description  : 생활편의교통 POI정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addLifePoiList = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'>";
				html += "	<a href='#' data-type='parent'><img src='/img/ico/ico_6002.png' alt='편의 시설'><span style='text-indent: 0px;'>편의 시설</span></a>";
				html += "	<ol style='display: none;' class='other' data-type='children'>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6002'><img src='/img/ico/ico_6002.png' alt='행정기관'>행정기관</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6001'><img src='/img/ico/ico_6001.png' alt='우체국'>우체국</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6003'><img src='/img/ico/ico_6003.png' alt='경찰'>경찰</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6004'><img src='/img/ico/ico_6004.png' alt='소방서'>소방서</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9002'><img src='/img/ico/ico_9002.png' alt='은행'>은행</a></li>";
				html += "	</ol>";
				html += "</li>";	
				html += "<li style='width:auto;float:none;'>";
				html += "	<a href='#' data-type='parent'><img src='/img/ico/ico_9001.png' alt='쇼핑 시설'><span style='text-indent: 0px;'>쇼핑 시설</span></a>";
				html += "	<ol style='display: none;' class='other' data-type='children'>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9001'><img src='/img/ico/ico_9001.png' alt='백화점/중대형마트'>백화점/중대형마트</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='2011'><img src='/img/ico/ico_2011.png' alt='슈퍼마켓'>슈퍼마켓</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='2003'><img src='/img/ico/ico_2003.png' alt='편의점'>편의점</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='2004'><img src='/img/ico/ico_2004.png' alt='식료품점'>식료품점</a></li>";
				html += "	</ol>";
				html += "</li>";	
				html += "<li style='width:auto;float:none;'>";
				html += "	<a href='#' data-type='parent'><img src='/img/ico/ico_5001.png' alt='외식 시설'><span style='text-indent: 0px;'>외식 시설</span></a>";
				html += "	<ol style='display: none;' class='other' data-type='children'>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5001'><img src='/img/ico/ico_5001.png' alt='한식'>한식</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5002'><img src='/img/ico/ico_5002.png' alt='중식'>중식</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5003'><img src='/img/ico/ico_5003.png' alt='일식'>일식</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5004'><img src='/img/ico/ico_5004.png' alt='분식'>분식</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5005'><img src='/img/ico/ico_5005.png' alt='서양식'>서양식</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5006'><img src='/img/ico/ico_5006.png' alt='제과점'>제과점</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5007'><img src='/img/ico/ico_5007.png' alt='패스트푸드'>패스트푸드</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5008'><img src='/img/ico/ico_5008.png' alt='치킨'>치킨</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5009'><img src='/img/ico/ico_5009.png' alt='호프 및 간이주점'>호프 및 간이주점</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5010'><img src='/img/ico/ico_5010.png' alt='카페'>카페</a></li>";
				html += "		<li><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5011'><img src='/img/ico/ico_5011.png' alt='기타외국식'>기타외국식</a></li>";
				html += "	</ol>";
				html += "</li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='requestBusStopinfo'><img src='/img/ico/ico_3002.png' alt='터미널'><span style='text-indent: 0px;'>버스정류장</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='3001'><img src='/img/ico/ico_3001.png' alt='지하철'><span style='text-indent: 0px;'>지하철</span></a></li>";	
				$("#poi_" + that.id).find(".rqIcon01").append(html);
			};
			/**
			 * 
			 * @name         : addEduPoiList
			 * @description  : 교육 POI정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addEduPoiList = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7004'><img src='/img/ico/ico_7001.png' alt='전문대학'><span style='text-indent: 0px;'>전문대학</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7005'><img src='/img/ico/ico_7001.png' alt='대학교'><span style='text-indent: 0px;'>대학교</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7006'><img src='/img/ico/ico_7001.png' alt='대학원'><span style='text-indent: 0px;'>대학원</span></a></li>";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='1003'><img src='/img/ico/ico_1003.png' alt='교습학원'><span style='text-indent: 0px;'>교습학원</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='1004'><img src='/img/ico/ico_1004.png' alt='어학원'><span style='text-indent: 0px;'>어학원</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='1005'><img src='/img/ico/ico_1005.png' alt='예체능학원'><span style='text-indent: 0px;'>예체능학원</span></a></li>";	
				$("#poi_" + that.id).find(".rqIcon02").append(html);
			};
			/**
			 * 
			 * @name         : addWelfareCulturePoiList
			 * @description  : 복지 문화 POI정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addWelfareCulturePoiList = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7007'><img src='/img/ico/ico_7001.png' alt='유치원(어린이보육업)'><span style='text-indent: 0px;'>유치원(어린이보육업)</span></a></li>";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='Q8721'><img src='/img/ico/ico_7001.png' alt='어린이집'><span style='text-indent: 0px;'>어린이집</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9003'><img src='/img/ico/ico_9003.png' alt='병원'><span style='text-indent: 0px;'>병원</span></a></li>";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='Q8711'><img src='/img/ico/ico_6002.png' alt='노인복지시설'><span style='text-indent: 0px;'>노인복지시설</span></a></li>";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='Q87'><img src='/img/ico/ico_6002.png' alt='사회복지시설'><span style='text-indent: 0px;'>사회복지시설</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9004'><img src='/img/ico/ico_9004.png' alt='극장/영화관'><span style='text-indent: 0px;'>극장/영화관</span></a></li>";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9005'><img src='/img/ico/ico_9005.png' alt='도서관/박물관'><span style='text-indent: 0px;'>도서관/박물관</span></a></li>";
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='R9012'><img src='/img/ico/ico_8002.png' alt='공연단체'><span style='text-indent: 0px;'>공연단체</span></a></li>";	
				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='R911'><img src='/img/ico/ico_8008.png' alt='스포츠서비스업'><span style='text-indent: 0px;'>스포츠서비스업</span></a></li>";	
				$("#poi_" + that.id).find(".rqIcon03").append(html);
			};
			/**
			 * 
			 * @name         : eventHandler
			 * @description  : 이벤트 핸들러
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.eventHandler = function(){
				$(".sop-top.sop-right").on("click",".sop-control",function(){
					if(/^set_|^map_/.test($(this).attr("id"))){
						$("#poi_" + that.id).find(".rightQuick.rq01").next(".rqListBox").stop().animate({"right":"-650px"},200);
						$("#poi_" + that.id).find(".rightQuick.rq01").removeClass("on");
					}
				});
				$("#poi_" + that.id).find(".rightQuick.rq01").click(function() {
					var on = $(this).hasClass("on");
					$(".sop-top.sop-right").find(".rightQuick").removeClass("on");
					$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
					$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
					$(".sop-top.sop-right").find(".rqListBox").stop().animate({"right":"-650px"},200);
					if(!on){
						$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
						$(this).addClass("on");
					}else{
						$(this).next(".rqListBox").stop().animate({"right":"-650px"},200);
						$(this).removeClass("on");
					}
				});
				$("#poi_" + that.id).find(".rqListBox>li>a").click(function(){
					$("ol[data-type=children]").hide();
					var on = $(this).hasClass("on"); 
					if(!on){
						$("#poi_" + that.id).find(".rqListBox>li>a").removeClass("on");
						$("#poi_" + that.id).find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
						$(this).next("ul").show();
						$(this).next("ol").show();
						$(this).addClass("on");
					}else{
						that.map.isOpenPOI = false;
						$(this).next("ul").hide();
						$(this).next("ol").hide();
						$(this).removeClass("on");
					}
				});
				$(".donremoveLayer").click(function(){
					$houseAnalysisMap.ui.doRemoveFlag = false;
					setTimeout(function(){
						$houseAnalysisMap.ui.doRemoveFlag = true;
					}, 6000);
				});
				$("#poi_" + that.id).find(".rqListBox a[data-type=reqCompanyPoiInfo],.rqListBox a[data-type=reqThemePoiInfo],.rqListBox a[data-type=requestBusStopinfo]").click(function(){
					$houseAnalysisMap.ui.doRemoveFlag = false;
					var map = that.map;
					map.mapBtnInfo.isOpenPOI = false;
					map.mapHouseBtnInfo.isOpenPOI = false;
					map.mapHouseBtnInfo.isBusOpenPOI = false;
					map.mapHouseBtnInfo.isShowBus = false;
					var element = $(this);
					
					// 2017. 07. 07 j.h.Seok 오류수정
					map.setFixedBoundLevel(false);
					map.gMap.setZoom(10);
					
					setTimeout(function(){
						$houseAnalysisMap.ui.doReset(function(){
							//map.gMap.setZoom(10);
							$("ol[data-type=children]").hide();
							$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
							$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
							map.mapHouseBtnInfo.clearPOI();
							var type = element.data("type").toString();
							if(type=="requestBusStopinfo"){
								map.mapHouseBtnInfo.busStopPoi();
								apiLogWrite2("J0","J03","POI",element.find("span").text(),"00","없음");
							}else{
								map.mapBtnInfo.isOpenPOI = true;
								map.mapBtnInfo.isShow = true;
								map.mapBtnInfo.selectedPoiTitle = element.find("span").text();
								var code = element.data("code").toString();
								
								$.each(code.split(","),function(cnt,node){
									if(type=="reqThemePoiInfo"){
										map.mapBtnInfo[type](node,"0");
									}else{
										map.mapBtnInfo[type](node,"9","0");
									}
								});
								apiLogWrite2("J0","J03","POI",element.context.text,"00","없음");
							}
						});
					},500);
				});
				$("#poiInit_" + that.id).click(function(){
					$("ol[data-type=children]").hide();
					var map = that.map;
					map.mapHouseBtnInfo.clearPOI();
				});
				$("#poi_" + that.id).find(".rqListBox a[data-type=parent]").click(function(){
					var isVisible = $(this).parent("li").children("ol").is(":visible");
					$("ol[data-type=children]").hide();
					if(!isVisible){
						$(this).parent("li").children("ol").show();
					}
					return false;
				});
				$("#poi_" + that.id).find(".rqListBox a[data-type=requestSchoolInfo]").click(function(){
					$("ol[data-type=children]").hide();
					$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
					$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
					var map = that.map;
					map.mapBtnInfo.clearPOI();
					map.mapHouseBtnInfo.schoolType = $(this).data("code");
					map.mapHouseBtnInfo.selectedPoiTitle = $(this).find("span").text();
					setTimeout(function(){
						$houseAnalysisMap.noReverseGeoCode = true;
						$houseAnalysisMap.ui.doReset(function(){
							if(map.geojson){
								map.geojson.remove();
							}
							$houseAnalysisMap.search.init();
							map.gMap.setZoom(8);
							that.clearPOI();
							that.schoolZone();
						});
					}, 500);
					apiLogWrite2("J0","J03","POI",map.mapHouseBtnInfo.selectedPoiTitle,"00","없음");
				});
			};
		}
	};
	/*********** 학구도 조회 시작 **********/
	(function() {
		$class("sop.portal.poi.houseScoolInfo.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					if(options.d == "Polygon"){
						kwangheum = res;
						$.each(res.features,function(cnt,node){
							var defaultStyle = {
								weight : 1.25,
								opacity : 1,
								color : "black",
								dashArray: "3",
								fillColor : "#c00",
								fillOpacity : 0,
								type:"region",
							};
							$houseAnalysisMap.btninfo.shcoolDataGeojson.push(sop.geoJson(node, {
								style: function () {
									return defaultStyle;
								},
								onEachFeature: function (feature, layer) {
									layer.on("mouseover",function(e){
										layer.setStyle({
											weight: 5,
											color: "#0086c6",
											dashArray: layer.options.dashArray,
											fillOpacity: 0.5,
											fillColor: layer.options.fillColor
										});
									});
									layer.on("mouseout",function(e){
										layer.setStyle(defaultStyle);
									});
								}
							}).addTo(map.gMap));
						});
					}else{
						$.each(res.result,function(cnt,node){
							var markerIcon = sop.icon({
								iconUrl: contextPath+'/img/house/marker-icon-shcool.png',
								shadowUrl: contextPath+'/img/marker/theme_shadow.png',
								iconAnchor: [12.5, 40 ],
								iconSize: [ 25, 40 ],
								infoWindowAnchor: [1, -34]
							});
							
							var marker = sop.marker([ node.x, node.y ], {
								icon: markerIcon
							});
							
							marker.info = node;
							marker.addTo(map.markers);
							var html="",encodeSchoolName = encodeURIComponent(node.sch_nm.replace(/(^\s*)|(\s*$)/gi, ""));
							html+="<div>"+node.sch_nm+"</div>"
							html+="<div style='text-align: center;padding-top:8px;'><a target='_blank' style='font-size:11px' href='http://www.schoolinfo.go.kr/index.jsp'>학교알리미로 바로가기</a></div>";
							marker.bindInfoWindow(html);
						});
					}
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 학구도 조회 종료 ********* */
	/*********** 버스정류장 조회 시작 **********/
	(function() {
		$class("sop.portal.poi.houseBusInfo.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					$.each(res.result,function(cnt,node){
						var markerIcon = sop.icon({
							iconUrl: contextPath+'/img/marker/marker/30_02.png',
							shadowUrl: contextPath+'/img/marker/theme_shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
						var marker = sop.marker([ node.x, node.y ], {
							icon: markerIcon
						});
						
						marker.info = node;
						marker.addTo(map.markers);
						marker.bindInfoWindow("<div>"+node.busstop_nm+"</div>");
					});
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 버스정류장 조회 종료 ********* */
}(window, document));