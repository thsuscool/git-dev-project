
(function(W, D) {
	W.$interactiveMapBtn = W.$interactiveMapBtn || {};
	
	$(document).ready(function() {
		
	});
	
	interactiveMapBtnInfo = {
		btnInfo	: function(map, delegate) {
			var that = this;
			this.map = map;
			this.id = null;
			this.poiObj = null;
			this.setObj = null;
			this.mapObj = null;
			this.year = companyDataYear;//dataYear; 2016.09.02 9월 서비스
			this.bndYear = bndYear;
			this.pageNum = "";
			this.center = null;
			this.mapBounds = null;
			this.themeCd = "";
			this.class_cd = "";
			this.resultcount = "500";
			this.isOpenPOI = false;
			this.selectedPoiTitle = "";
			this.companyTree = null;
			this.curSelectedCompanyNode = null;
			this.baseTileLayer = null;
			this.targetTileLayer = null;
			this.delegate = (delegate != undefined) ? delegate : null;
			this.isShow = false; //9월 서비스
			this.markerGroup = [];
			
			
			
			/**
			 * 
			 * @name         : initialize
			 * @description  : 초기화한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createUI = function(options) {
				var currentdate = new Date();
				this.id = makeStamp(currentdate);
				
				if (options != null) {
					if (options.intrPoiControl != undefined && options.intrPoiControl) {
						this.createPOIBtn();
					}else if (options.techPoiControl != undefined && options.techPoiControl) {
						this.createTechPOIBtn();
					}
					if (options.intrSettingControl != undefined && options.intrSettingControl) {
						this.createSettingBtn("intr");
					}else if (options.bizSettingControl != undefined && options.bizSettingControl) {
						this.createSettingBtn("biz");
					}else if (options.techSettingControl != undefined && options.techSettingControl) {
						this.createSettingBtn("tech");
					}
					if (options.mapTypeControl != undefined && options.mapTypeControl) {
						this.createMapTypeBtn();
					}
					if (options.intrZoomControl != undefined && options.intrZoomControl) {
						this.createZoomControl("intr");
					}else if (options.combineZoomControl != undefined && options.combineZoomControl) {
						this.createZoomControl("combine");
					}else if (options.bizZoomControl != undefined && options.bizZoomControl) {
						this.createZoomControl("biz");
					}else if (options.themaZoomControl != undefined && options.themaZoomControl) {
						this.createZoomControl("thema");
					}
					
				}else {
					this.createMapTypeBtn();
					this.createZoomControl();
				}
				
				this.eventHandler();
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
					html += "<div class='mapBtnWrapper' data-html2canvas-ignore=true>";
					html += "<a class='rightQuick rq01'><span>GPS</span></a>";
					html += 	"<ul class='rqListBox rq01'>";	
					html +=		"<li><a class='ico_side_Select'><span id='industry'>산업<br />분류</span></a>";
					html +=			"<ol class='rqIcon09'>";
					html += 			"<li>";
	    			html +=					"<div class='sidePopTree'>";
	    			html +=						"<p class='tit' style='text-align:center;'>전국사업체조사 9차산업분류표 위치조회</p>";
	    			html +=						"<div class='etcPopScroll'>";
					html +=		    				"<div class='tree'></div>"; 
			        html +=						"</div>";
	    			html +=					"</div>";
	    			html +=				"</li>";
	    			html +=			"</ol>";
					html +=    	"</li>";
					html += 	"<li><a><span>생활<br />서비스</span></a>";	
					html += 		"<ol class='rqIcon01'></ol>";    				
					html += 	"</li>";     			
					html += 	"<li><a><span>도소매</span></a>";    				
					html += 		"<ol class='rqIcon02'></ol>";    		
					html += 	"</li>";     		
					html += 	"<li><a class='ico_side_Select'><span>교통</span></a>";      			
					html += 		"<ol class='rqIcon03'></ol>";    				
					html += 	"</li>";    				
					html += 	"<li><a class='ico_side_Select'><span>숙박</span></a>";    			
					html +=			"<ol class='rqIcon04'></ol>";
					html +=    	"</li>"; 
					html +=    	"<li><a class='ico_side_Select'><span>음식점</span></a>";
					html +=    		"<ol class='rqIcon05'></ol>";
					html +=    	"</li>"; 
					html +=    	"<li><a class='ico_side_Select'><span>공공</span></a>";
					html +=    		"<ol class='rqIcon06'></ol>";
					html +=    	"</li>";  
					html +=    	"<li><a class='ico_side_Select'><span>교육</span></a>";
					html +=    		"<ol class='rqIcon07'></ol>";
					html +=    	"</li>"; 
					html +=    	"<li><a class='ico_side_Select'><span>기업</span></a>";
					html +=    		"<ol class='rqIcon08'></ol>";
					html +=    	"</li>";
					html +=    	"<li><a class='ico_side_Select'><span>편의<br/>문화</span></a>";
					html +=    		"<ol class='rqIcon00'></ol>";
					html +=    	"</li>";
					html +=    	"<li id='poiInit_"+that.id+"'><a class='ico_side_Select'><span>초기화</span></a>";
					html +=    	"</li>";
					html += "</ul>";
					html += "</div>";
					this._div.innerHTML = html;
					 
				};
				poiUI.addTo(this.map.gMap);
				
				this.addLifePoiList();			
				this.addShopPoiList();			
				this.addTrafficPoiList();
				this.addLodgePoiList();
				this.addRestaurantPoiList();
				this.addPublicPoiList();
				this.addEduPoiList();
				this.addCompanyPoiList();
				this.addCulturePoiList();
				this.reqInterstryList(0, "9", null);
			},
			
			
			/**
			 * 
			 * @name         : createTechPOIBtn
			 * @description  : 기술창업통계지도의 외부POI버튼을 생성한다.
			 * @date         : 2016. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createTechPOIBtn = function() {
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
					html += "<div class='mapBtnWrapper' data-html2canvas-ignore=true>";
					html += "<a class='rightQuick rq01'><span>GPS</span></a>";
					html += 	"<ul class='rqListBox rq01' style='width:330px;'>";	
					html +=		"<li><a class='ico_side_Select'><span id='industry'>산업<br />분류</span></a>";
					html +=			"<ol class='rqIcon09'>";
					html += 			"<li>";
	    			html +=					"<div class='sidePopTree'>";
	    			html +=						"<p class='tit' style='text-align:center;'>전국사업체조사 9차산업분류표 위치조회</p>";
	    			html +=						"<div class='etcPopScroll'>";
					html +=		    				"<div class='tree'></div>"; 
			        html +=						"</div>";
	    			html +=					"</div>";
	    			html +=				"</li>";
	    			html +=			"</ol>";
					html +=    	"</li>";
					html += 	"<li><a><span>기술</span></a>";	
					html += 		"<ol class='rqIcon11' style='width:250px;'></ol>";    				
					html += 	"</li>";     			    		
					html += 	"<li><a class='ico_side_Select'><span>교통</span></a>";      			
					html += 		"<ol class='rqIcon03'></ol>";    				
					html += 	"</li>";    				
					html +=    	"<li><a class='ico_side_Select'><span>공공</span></a>";
					html +=    		"<ol class='rqIcon06'></ol>";
					html +=    	"</li>";  
					html +=    	"<li><a class='ico_side_Select'><span>교육</span></a>";
					html +=    		"<ol class='rqIcon07'></ol>";
					html +=    	"</li>"; 
					html +=    	"<li><a class='ico_side_Select'><span>편의<br/>문화</span></a>";
					html +=    		"<ol class='rqIcon00'></ol>";
					html +=    	"</li>";
					html +=    	"<li id='poiInit_"+that.id+"'><a class='ico_side_Select'><span>초기화</span></a>";
					html +=    	"</li>";
					html += "</ul>";
					html += "</div>";
					this._div.innerHTML = html;
					 
				};
				poiUI.addTo(this.map.gMap);
						
				this.addTechPoiList();
				this.addTrafficPoiList();
				this.addPublicPoiList();
				this.addEduPoiList();
				this.addCulturePoiList();
				this.reqInterstryList(0, "9", null);
			},
			
			
			/**
			 * 
			 * @name         : createSettingBtn
			 * @description  : 인터랙티브맵의 설정버튼을 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createSettingBtn = function(type) {
				var setUI = sop.control({position: 'topright'});
				setUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'set_' +that.id);
				    that.setObj = this._div;
				    return this._div;
				};
				setUI.update = function (props) {
					var html = "";
					html += "<div class='mapBtnWrapper' data-html2canvas-ignore=true>";
					html += "<a href='javascript:void(0)' class='rightQuick rq02'><span>맵기능설정</span></a>";
					html += "<ul class='rqListBox rq02'>";
					
					if  (type == "intr") {
						html +=		"<li><a href='javascript:void(0)' class='ico_side_reset'><span>초기화</span></a></li>";
						html +=		"<li><a href='javascript:void(0)' class='ico_side_lv'><span>1레벨</span></a></li>";
						html +=		"<li><a href='javascript:void(0)' class='ico_side_Select multi_bound'><span>지역다중<br />선택</span></a></li>"; 
					}
					
					html +=		"<li><a href='javascript:void(0)' class='ico_side_map map_measure'><span>지도<br />측정</span></a></li>";
					html +=	"</ul>";
					html += "</div>";
					this._div.innerHTML = html;
					 
				};
				setUI.addTo(this.map.gMap);

				if  (type == "intr") {
					this.addBoundaryLevelList();
					this.addMultiSelectList();
				}else {
					$(".rqListBox.rq02").css("width", "42px");
				}
				this.addMeasureList();
			},
			
			
			/**
			 * 
			 * @name         : createMapTypeBtn
			 * @description  : 인터랙티브맵의 맵타입변경버튼을 생성한다.(일반/위성)
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createMapTypeBtn = function() {
				var mapUI = sop.control({position: 'topright'});
				mapUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'map_' +that.id);
				    that.mapObj = this._div;
				    return this._div;
				};
				mapUI.update = function (props) {
					var html = "";
					html += "<div class='mapBtnWrapper' data-html2canvas-ignore=true>";
					html += "<a class='rightQuick rq06'><span>GPS</span></a>";
					html += "<ul class='rqListBox rq06'>";
					html += 	"<li><a name='settlite' class='ico_side_gps01'><span>위성</span></a></li>"; 
					html += 	"<li><a name='normal' class='ico_side_gps02'><span>일반</span></a></li>";
					html += "</ul>";
					html += "</div>";
					this._div.innerHTML = html;
					 
				};
				mapUI.addTo(this.map.gMap);
			},
			
			
			/**
			 * 
			 * @name         : createZoomControl
			 * @description  : 인터랙티브맵의 줌 컨트롤을 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createZoomControl = function(type) {
				var zoomUI = sop.control({position: 'topright'});
				zoomUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'zoom_' +that.id);
				    that.zoomObj = this._div;
				    return this._div;
				};
				zoomUI.update = function (props) {
					var html = "";
					html += "<div class='mapZoomWrapper' data-html2canvas-ignore=true>"
					html += "<a class='rightQuick rq03'>확대하기</a>";
					if (type == "intr") {
						html += "<a class='rightQuick rq07'>이동</a>";
					}
					if (type == "intr") {
						html += "<a class='rightQuick rq04'>읍면동</a>";
					}else if (type == "biz") {
						html += "<a class='rightQuick rq04' style='top:32px;'>읍면동</a>";
					}
					if (type == "biz") {
						html += "<a class='rightQuick rq05' style='top:52px;'>축소하기</a>";
					}else if (type == "combine" || type == "thema") {
						html += "<a class='rightQuick rq05' style='top:32px;'>축소하기</a>";
					}else {
						html += "<a class='rightQuick rq05'>축소하기</a>";
					}
					html += "</div>";
					this._div.innerHTML = html;
					 
				};
				zoomUI.addTo(this.map.gMap);
			},
			
			
			/**
			 * 
			 * @name         : createEasyZoomControl
			 * @description  : 인터랙티브맵의 간편 줌 컨트롤을 생성한다.
			 * @date         : 2015. 10. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createEasyZoomControl = function() {
				var zoomUI = sop.control({position: 'topright'});
				zoomUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'zoom_' +that.id);
				    that.zoomObj = this._div;
				    return this._div;
				};
				zoomUI.update = function (props) {
					var html = "";
					html += "<div data-html2canvas-ignore=true class='mapZoomWrapper' style='height:64px;'>"
					html += "<a class='rightQuick rq03'>확대하기</a>";
					html += "<a class='rightQuick rq05' style='top:32px;'>축소하기</a>";
					html += "</div>";
					this._div.innerHTML = html;
					 
				};
				zoomUI.addTo(this.map.gMap);
			}
			
			
			/**
			 * 
			 * @name         : addLifePoiList
			 * @description  : 생활서비스 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addLifePoiList = function() {
				var html = "";
				html += "<li><a name='1001'><img src='/img/ico/ico_1001.png' alt='인테리어'/><span style='cursor:pointer;'>인테리어</span></a></li>";	
				html += "<li><a name='1002'><img src='/img/ico/ico_1002.png' alt='목욕탕'/><span style='cursor:pointer;'>목욕탕</span></a></li>";
				html += "<li><a name='1003'><img src='/img/ico/ico_1003.png' alt='교습학원'/><span style='cursor:pointer;'>교습학원</span></a></li>";
				html += "<li><a name='1004'><img src='/img/ico/ico_1004.png' alt='어학원'/><span style='cursor:pointer;'>어학원</span></a></li>";
				html += "<li><a name='1005'><img src='/img/ico/ico_1005.png' alt='예체능학원'/><span style='cursor:pointer;'>예체능학원</span></a></li>";
				html += "<li><a name='1006'><img src='/img/ico/ico_1006.png' alt='부동산중개업'/><span style='cursor:pointer;'>부동산중개업</span></a></li>";
				html += "<li><a name='1007'><img src='/img/ico/ico_1007.png' alt='이발소'/><span style='cursor:pointer;'>이발소</span></a></li>";    		
				html += "<li><a name='1008'><img src='/img/ico/ico_1008.png' alt='미용실'/><span style='cursor:pointer;'>미용실</span></a></li>";     			
				html += "<li><a name='1009'><img src='/img/ico/ico_1009.png' alt='세탁소'/><span style='cursor:pointer;'>세탁소</span></a></li>";    				
				html += "<li><a name='1010'><img src='/img/ico/ico_1010.png' alt='PC방'/><span style='cursor:pointer;'>PC방</span></a></li>";    				
				html += "<li><a name='1011'><img src='/img/ico/ico_1011.png' alt='노래방'/><span style='cursor:pointer;'>노래방</span></a></li>";     								
				$("#poi_" + that.id).find(".rqIcon01").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addShopPoiList
			 * @description  : 도소매 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addShopPoiList = function() {
				var html = "";
				html += "<li><a name='2001'><img src='/img/ico/ico_2001.png' alt='문구점'/><span style='cursor:pointer;'>문구점</span></a></li>";        				
				html += "<li><a name='2002'><img src='/img/ico/ico_2002.png' alt='서점'/><span style='cursor:pointer;'>서점</span></a></li>";    				
				html += "<li><a name='2003'><img src='/img/ico/ico_2003.png' alt='편의점'/><span style='cursor:pointer;'>편의점</span></a></li>";    				
				html += "<li><a name='2004'><img src='/img/ico/ico_2004.png' alt='식료품점'/><span style='cursor:pointer;'>식료품점</span></a></li>";    				
				html += "<li><a name='2005'><img src='/img/ico/ico_2005.png' alt='휴대폰점'/><span style='cursor:pointer;'>휴대폰점</span></a></li>";  
				html += "<li><a name='2006'><img src='/img/ico/ico_2006.png' alt='의류'/><span style='cursor:pointer;'>의류</span></a></li>";
				html += "<li><a name='2007'><img src='/img/ico/ico_2007.png' alt='화장품/방향제'/><span style='cursor:pointer;'>화장품/방향제</span></a></li>";
				html += "<li><a name='2008'><img src='/img/ico/ico_2008.png' alt='철물점'/><span style='cursor:pointer;'>철물점</span></a></li>";
				html += "<li><a name='2009'><img src='/img/ico/ico_2009.png' alt='주유소'/><span style='cursor:pointer;'>주유소</span></a></li>";
				html += "<li><a name='2010'><img src='/img/ico/ico_2010.png' alt='꽃집'/><span style='cursor:pointer;'>꽃집</span></a></li>";
				html += "<li><a name='2011'><img src='/img/ico/ico_2011.png' alt='슈퍼마켓'/><span style='cursor:pointer;'>슈퍼마켓</span></a></li>";
				$("#poi_" + that.id).find(".rqIcon02").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addTrafficPoiList
			 * @description  : 교통 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addTrafficPoiList = function() {
				var html = "";
				html += "<li><a name='3001'><img src='/img/ico/ico_3001.png' alt='지하철역'/><span style='cursor:pointer;'>지하철역</span></a></li>";    				
				html += "<li><a name='3002'><img src='/img/ico/ico_3002.png' alt='터미널'/><span style='cursor:pointer;'>터미널</span></a></li>";    						
				$("#poi_" + that.id).find(".rqIcon03").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addLodgePoiList
			 * @description  : 숙박 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addLodgePoiList = function() {
				var html = "";
				html += "<li><a name='4001'><img src='/img/ico/ico_4001.png' alt='호텔'/><span style='cursor:pointer;'>호텔</span></a></li>";
				html += "<li><a name='4002'><img src='/img/ico/ico_4002.png' alt='여관'/><span style='cursor:pointer;'>여관</span></a></li>"; 	
				html += "<li><a name='4003'><img src='/img/ico/ico_4003.png' alt='펜션'/><span style='cursor:pointer;'>펜션</span></a></li>";
				$("#poi_" + that.id).find(".rqIcon04").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addRestaurantPoiList
			 * @description  : 음식점 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addRestaurantPoiList = function() {
				var html = "";
				html += "<li><a name='5001'><img src='/img/ico/ico_5001.png' alt='한식'/><span style='cursor:pointer;'>한식</span></a></li>";
				html += "<li><a name='5002'><img src='/img/ico/ico_5002.png' alt='중식'/><span style='cursor:pointer;'>중식</span></a></li>";
				html += "<li><a name='5003'><img src='/img/ico/ico_5003.png' alt='일식'/><span style='cursor:pointer;'>일식</span></a></li>";
				html += "<li><a name='5004'><img src='/img/ico/ico_5004.png' alt='분식'/><span style='cursor:pointer;'>분식</span></a></li>";
				html += "<li><a name='5005'><img src='/img/ico/ico_5005.png' alt='서양식'/><span style='cursor:pointer;'>서양식</span></a></li>";
				html += "<li><a name='5006'><img src='/img/ico/ico_5006.png' alt='제과점'/><span style='cursor:pointer;'>제과점</span></a></li>";
				html += "<li><a name='5007'><img src='/img/ico/ico_5007.png' alt='패스트푸드'/><span style='cursor:pointer;'>패스트푸드</span></a></li>";
				html += "<li><a name='5008'><img src='/img/ico/ico_5008.png' alt='치킨'/><span style='cursor:pointer;'>치킨</span></a></li>";
				html += "<li><a name='5009'><img src='/img/ico/ico_5009.png' alt='호프/간이주점'/><span style='cursor:pointer;'>호프/간이주점</span></a></li>";
				html += "<li><a name='5010'><img src='/img/ico/ico_5010.png' alt='카페'/><span style='cursor:pointer;'>카페</span></a></li>";
				html += "<li><a name='5011'><img src='/img/ico/ico_5011.png' alt='기타 외국식'/><span style='cursor:pointer;'>기타 외국식</span></a></li>"; 
				$("#poi_" + that.id).find(".rqIcon05").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addPublicPoiList
			 * @description  : 공공 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addPublicPoiList = function() {
				var html = "";
				html += "<li><a name='6001'><img src='/img/ico/ico_6001.png' alt='우체국'/><span style='cursor:pointer;'>우체국</span></a></li>";
				html += "<li><a name='6002'><img src='/img/ico/ico_6002.png' alt='행정기관'/><span style='cursor:pointer;'>행정기관</span></a></li>";
				html += "<li><a name='6003'><img src='/img/ico/ico_6003.png' alt='경찰/지구대'/><span style='cursor:pointer;'>경찰/지구대</span></a></li>";
				html += "<li><a name='6004'><img src='/img/ico/ico_6004.png' alt='소방서'/><span style='cursor:pointer;'>소방서</span></a></li>"; 
				$("#poi_" + that.id).find(".rqIcon06").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addEduPoiList
			 * @description  : 교육 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addEduPoiList = function() {
				var html = "";
				html += "<li><a name='7001'><img src='/img/ico/ico_7001.png' alt='초등학교'/><span style='cursor:pointer;'>초등학교</span></a></li>";
				html += "<li><a name='7002'><img src='/img/ico/ico_7001.png' alt='중학교'/><span style='cursor:pointer;'>중학교</span></a></li>";
				html += "<li><a name='7003'><img src='/img/ico/ico_7001.png' alt='고등학교'/><span style='cursor:pointer;'>고등학교</span></a></li>";
				html += "<li><a name='7004'><img src='/img/ico/ico_7001.png' alt='전문대학'/><span style='cursor:pointer;'>전문대학</span></a></li>";
				html += "<li><a name='7005'><img src='/img/ico/ico_7001.png' alt='대학교'/><span style='cursor:pointer;'>대학교</span></a></li>";
				html += "<li><a name='7006'><img src='/img/ico/ico_7001.png' alt='대학원'/><span style='cursor:pointer;'>대학원</span></a></li>";
				html += "<li><a name='7007'><img src='/img/ico/ico_7001.png' alt='어린이보육업'/><span style='cursor:pointer;'>어린이보육업</span></a></li>";
				$("#poi_" + that.id).find(".rqIcon07").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addCompanyPoiList
			 * @description  : 기업 POI정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addCompanyPoiList = function() {
				var html = "";
				html += "<li><a name='8001'><img src='/img/ico/ico_8001.png' alt='제조/화학'/><span style='cursor:pointer;'>제조/화학</span></a></li>";
				html += "<li><a name='8002'><img src='/img/ico/ico_8002.png' alt='서비스'/><span style='cursor:pointer;'>서비스</span></a></li>";
				html += "<li><a name='8003'><img src='/img/ico/ico_8003.png' alt='통신/IT'/><span style='cursor:pointer;'>통신/IT</span></a></li>";
				html += "<li><a name='8004'><img src='/img/ico/ico_8004.png' alt='건설'/><span style='cursor:pointer;'>건설</span></a></li>";
				html += "<li><a name='8005'><img src='/img/ico/ico_8005.png' alt='판매/유통'/><span style='cursor:pointer;'>판매/유통</span></a></li>";
				html += "<li><a name='8006'><img src='/img/ico/ico_8006.png' alt='기타금융업'/><span style='cursor:pointer;'>기타금융업</span></a></li>";
				html += "<li><a name='8007'><img src='/img/ico/ico_8007.png' alt='기타의료업'/><span style='cursor:pointer;'>기타의료업</span></a></li>";
				html += "<li><a name='8008'><img src='/img/ico/ico_8008.png' alt='문화/체육'/><span style='cursor:pointer;'>문화/체육</span></a></li>";
				$("#poi_" + that.id).find(".rqIcon08").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addCulturePoiList
			 * @description  : 편의/문화 POI정보를 생성한다.
			 * @date         : 2016. 01. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addCulturePoiList = function() {
				var html = "";
				html += "<li><a name='9001'><img src='/img/ico/ico_9001.png' alt='백화점/중대형마트'/><span style='cursor:pointer;'>백화점/중대형마트</span></a></li>";
				html += "<li><a name='9002'><img src='/img/ico/ico_9002.png' alt='은행'/><span>은행</span style='cursor:pointer;'></a></li>";
				html += "<li><a name='9003'><img src='/img/ico/ico_9003.png' alt='병원'/><span>병원</span style='cursor:pointer;'></a></li>";
				html += "<li><a name='9004'><img src='/img/ico/ico_9004.png' alt='극장/영화관'/><span style='cursor:pointer;'>극장/영화관</span></a></li>";
				html += "<li><a name='9005'><img src='/img/ico/ico_9005.png' alt='도서관/박물관'/><span style='cursor:pointer;'>도서관/박물관</span></a></li>";
				$("#poi_" + that.id).find(".rqIcon00").append(html);
			},
			
			
			/**
			 * 
			 * @name         : addTechPoiList
			 * @description  : 기술업종 POI정보를 생성한다.
			 * @date         : 2016. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addTechPoiList = function() {
				var html = "";
				html += "<li><a name='11'><img src='/img/tech/rqIcon09_list01.png' alt='첨단기술업종'/><span style='cursor:pointer;'>첨단기술업종</span></a></li>";
				html += "<li><a name='22'><img src='/img/tech/rqIcon09_list02.png' alt='ICT업종'/><span style='cursor:pointer;'>ICT업종</span></a></li>";
				html += "<li><a name='12'><img src='/img/tech/rqIcon09_list03.png' alt='고기술업종'/><span>고기술업종</span style='cursor:pointer;'></a></li>";
				html += "<li><a name='21'><img src='/img/tech/rqIcon09_list04.png' alt='창의및디지털업종'/><span style='cursor:pointer;'>창의및디지털업종</span></a></li>";
				html += "<li><a name='13'><img src='/img/tech/rqIcon09_list05.png' alt='중기술업종'/><span>중기술업종</span style='cursor:pointer;'></a></li>";
				html += "<li><a name='23'><img src='/img/tech/rqIcon09_list06.png' alt='전문서비스업종'/><span style='cursor:pointer;'>전문서비스업종</span></a></li>";
				html += "<li><a name='14'><img src='/img/tech/rqIcon09_list07.png' alt='저기술업종'/><span style='cursor:pointer;'>저기술업종</span></a></li>";
				$("#poi_" + that.id).find(".rqIcon11").append(html);
			},
						
			
			/**
			 * 
			 * @name         : addBoundaryLevelList
			 * @description  : 경계레벨설정정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addBoundaryLevelList = function() {
				var html = "";
				html +=	"<ul>"
				html +=		"<li><a name='level_0' class='ico_side_lv0'><span>0레벨</span></a></li>";
				html +=		"<li><a name='level_1' class='ico_side_lv1'><span>1레벨</span></a></li>";
				html +=		"<li><a name='level_2' class='ico_side_lv2'><span>2레벨</span></a></li>";
				html +=	"</ul>";
				$("#set_" + that.id).find(".ico_side_lv").parent().append(html);
			},
			
			
			/**
			 * 
			 * @name         : addMultiSelectList
			 * @description  : 다중경계설정정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addMultiSelectList = function() {
				var html = "";
				html +=	"<ul>";
				html +=		"<li><a name='each' class='ico_side_gae'><span>개별클릭</span></a></li>";
				html +=		"<li><a name='circle' class='ico_side_won'><span>원</span></a></li>";
				html +=		"<li><a name='rectangle' class='ico_side_sakak'><span>사각</span></a></li>";
				html +=		"<li><a name='multi' class='ico_side_dakak'><span>다각</span></a></li>";
				html +=		"<li><a name='clearSelected' class='ico_side_haejae'><span>선택<br />해제</span></a></li>";
				html +=	"</ul>";
				$("#set_" + that.id).find(".ico_side_Select").parent().append(html);
			},
			
			
			/**
			 * 
			 * @name         : addMeasureList
			 * @description  : 측정정보를 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.addMeasureList = function() {
				var html = "";
				html +=	"<ul>";
				html +=		"<li><a name='distance' class='ico_side_kuri'><span>거리</span></a></li>";
				html +=		"<li><a name='munjuk' class='ico_side_munjuk'><span>면적</span></a></li>";
				html +=		"<li><a name='clear' class='ico_side_haejae'><span>측정<br />해제</span></a></li>";
				html +=	"</ul>";
				$("#set_" + that.id).find(".ico_side_map").parent().append(html);

				var drawControl = new Draw.Control.Manager();
				drawControl.addControl(new Draw.Control.Measure(this.map.gMap));
				drawControl.addControl(new Draw.Control.Overlay(this.map.gMap));
				this.map.gMap.addControl(drawControl); 
				this.map.drawControl = drawControl;
			},
			
			
			/**
			 * 
			 * @name         : changeZoomLevelTitle
			 * @description  : 줌 종료시, 해당레벨의 단계를 표시한다.
			 * @date         : 2015. 10. 07. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.changeZoomLevelTitle = function(title) {
				$("#zoom_" + that.id).find(".rightQuick.rq04").text(title);
			};
			
			
			/**
			 * 
			 * @name         : closeMenu
			 * @description  : 지도버튼을 선택했을 때, 열려있던 메뉴를 닫는다.
			 * @date         : 2015. 10. 07. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.closeMenu = function() {
				$("#poi_" + that.id).find(".rightQuick.rq01").next(".rqListBox").stop().animate({"right":"-650px"},200);
				$("#poi_" + that.id).find(".rightQuick.rq01").removeClass("on");
				$("#set_" + that.id).find(".rightQuick.rq02").next(".rqListBox").stop().animate({"right":"-650px"},200);
				$("#set_" + that.id).find(".rightQuick.rq02").removeClass("on");
				$("#map_" + that.id).find(".rightQuick.rq06").next(".rqListBox").stop().animate({"right":"-650px"},200);
				$("#map_" + that.id).find(".rightQuick.rq06").removeClass("on");
				this.initTree();
			},
			
			
			/**
			 * 
			 * @name         : initTree
			 * @description  : tree를 초기화한다..
			 * @date         : 2015. 10. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.initTree = function() {
				this.curSelectedCompanyNode = null;
				if (this.companyTree != null) {
					this.companyTree.activateNode("");
					var nodes = this.companyTree.getAllNodes();
					for (var i=0; i<nodes.length; i++) {
						nodes[i].isExpanded = false;
					}
					this.companyTree.rebuildTree();
				}
			}
			
			
			/**
			 * 
			 * @name         : clearPOI
			 * @description  : 표출된 POI 정보를 초기화한다.
			 * @date         : 2015. 10. 07. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.clearPOI = function() {
				this.closeMenu();
				this.map.markers.clearLayers();
				this.center = null;
				this.mapBounds = null;
				this.themeCd = "";
				this.class_cd = "";
				this.resultcount = "500";
				selectedPoiTitle = "";
				this.isOpenPOI = false;
				this.isShow = false; //9월 서비스
				this.curSelectedCompanyNode = null;
			},
			
			
			/**
			 * 
			 * @name         : controlHide
			 * @description  : 컨트롤 버튼을 숨긴다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.controlHide = function(name) {
				if (name == "poi") {
					$(this.poiObj).hide();
				}else if (name == "setting") {
					$(this.setObj).hide();
				}else if (name == "zoom") {
					$(this.mapObj).hide();
				}
			},
			
			
			/**
			 * 
			 * @name         : controlShow
			 * @description  : 컨트롤 버튼을 표출한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.controlShow = function(name) {
				if (name == "poi") {
					$(this.poiObj).show();
				}else if (name == "setting") {
					$(this.setObj).show();
				}else if (name == "zoom") {
					$(this.mapObj).show();
				}
			},
			
			
			/**
			 * 
			 * @name         : createSatelliteCRS
			 * @description  : 위성지도에 사용하는 좌표체계 생성
			 * @date         : 2015. 10. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createSatelliteCRS = function() {
				var code = 'EPSG:900913';
				var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';
				var options = {
					resolutions: [
						156543.0339,
						78271.51695,
						39135.758475,
						19567.8792375,
						9783.93961875,
						4891.969809375,
						2445.9849046875,
						1222.99245234375,
						611.496226171875,
						305.7481130859375,
						152.87405654296876,
						76.43702827148438,
						38.21851413574219,
						19.109257067871095,
						9.554628533935547,
						4.777314266967774,
						2.388657133483887,
						1.1943285667419434,
						0.5971642833709717,
						0.29858214168548586,
						0.14929107084274293
					],
					origin: [-20037508.34, 20037508.34]
				};

				// 새로 정의한 CRS 객체 생성.
				var crs = new sop.CRS.Proj(code, def, options);

				// projection 영역 설정.
				crs.projection.bounds = sop.bounds(
						[13232210.28055642, 3584827.864295762],
						[15238748.249933105, 5575460.5658249445]
				);

				return crs;
			},
			
			
			/**
			 * 
			 * @name         : createSatelliteTileLayer
			 * @description  : 위성 타일레이어 생성
			 * @date         : 2015. 10. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createSatelliteTileLayer = function() {
				var satTileURL = "http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg";
				var satTileOptions = {
					maxZoom: 18,
					minZoom: 6
				};
				var satTileLayer = new sop.TileLayer(satTileURL, satTileOptions);
				return satTileLayer;
			},
			
			
			/**
			 * 
			 * @name         : createTileLayer
			 * @description  : 타일레이어 토글버튼 생성
			 * @date         : 2015. 10. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createTileLayer = function(map, crs, baseLayer, targetLayer, zoomMargin) {
				if(arguments.length < 5) {
					throw new Error('Fail check arguments length. current = ' + arguments.length);
				}
	
				if(map.hasLayer(baseLayer)){
					return;
				}
				var center = map.getCenter();
				var zoom = that.map.zoom;
				map.removeLayer(targetLayer);
				map.options.crs = crs;
				baseLayer.addTo(map);
				that.map.setFixedBoundLevel(that.map.isFixedBound);
				that.map.mapMove([center.x, center.y], zoom);
			},
			
			
			/**
			 * 
			 * @name         : doClearSelectedBound
			 * @description  : 다중경계 선택을 초기화한다.
			 * @date         : 2015. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.doClearSelectedBound = function() {
				$(".multi_bound").find("span").html("다중<br/>선택");
				for (var i=0; i<this.map.selectedBoundList.length; i++) {
					var layer = this.map.selectedBoundList[i];
					this.map.clearLayerStyle(layer);
				}
				this.map.selectedBoundList = [];
				this.map.setBoundSelectedMoode(null);
			},
			
			
			/**
			 * 
			 * @name         : setFixedBoundBtn
			 * @description  : 경계 고정/자동을 토클한다.
			 * @date         : 2015. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.setFixedBoundBtn = function(bool) {
				if (bool) {
					if ($("#zoom_" + that.id).find(".rightQuick.rq07.on").length == 0) {
						$("#zoom_" + that.id).find(".rightQuick.rq07").click();
					}
				}else {
					if ($("#zoom_" + that.id).find(".rightQuick.rq07.on").length != 0) {
						$("#zoom_" + that.id).find(".rightQuick.rq07").click();
						this.doClearSelectedBound();
					}
				}
			},
			
			
			/**
			 * 
			 * @name         : eventHandler
			 * @description  : 이벤트 핸들러
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.eventHandler = function() {
				if ($("#poi_" + that.id).find(".etcPopScroll").length) {
					$("#poi_" + that.id).find(".etcPopScroll").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
				}
				$("#poi_" + that.id).find(".rightQuick.rq01").click(function() {
					var on = $(this).hasClass("on");
					$("#poi_" + that.id).find(".rightQuick").removeClass("on");
					$("#poi_" + that.id).find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
					$("#poi_" + that.id).find(".rqListBox>li>a").removeClass("on");
					$("#poi_" + that.id).find(".rqListBox").stop().animate({"right":"-650px"},200);
					if(!on){
						that.closeMenu();
						$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
						$(this).addClass("on");
					}else{
						$(this).next(".rqListBox").stop().animate({"right":"-650px"},200);
						$(this).removeClass("on");
					}
				});
				
				$("#set_" + that.id).find(".rightQuick.rq02").click(function() {
					var on = $(this).hasClass("on");
					$("#set_" + that.id).find(".rightQuick").removeClass("on");
					$("#set_" + that.id).find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
					$("#set_" + that.id).find(".rqListBox>li>a").removeClass("on");
					$("#set_" + that.id).find(".rqListBox").stop().animate({"right":"-650px"},200);
					if(!on){
						that.closeMenu();
						$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
						$(this).addClass("on");
					}else{
						$(this).next(".rqListBox").stop().animate({"right":"-650px"},200);
						$(this).removeClass("on");
					}
				});
				
				$("#map_" + that.id).find(".rightQuick.rq06").click(function() {
					var on = $(this).hasClass("on");
					$("#map_" + that.id).find(".rightQuick").removeClass("on");
					if(!on){
						that.closeMenu();
						$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
						$(this).addClass("on");
					}else{
						$(this).next(".rqListBox").stop().animate({"right":"-650px"},200);
						$(this).removeClass("on");
					} 
				}); 
				
				var settingList = ".rqListBox a";
				$("#poi_" + that.id).find(".rqListBox>li>a").click(function(){
					var on = $(this).hasClass("on"); 
					if(!on){
						$("#poi_" + that.id).find(".rqListBox>li>a").removeClass("on");
						$("#poi_" + that.id).find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
						$(this).next("ul").show();
						$(this).next("ol").show();
						$(this).addClass("on");
					}else{
						that.isOpenPOI = false;
						$(this).next("ul").hide();
						$(this).next("ol").hide();
						$(this).removeClass("on");
						
						that.initTree();
					}
				});
				
				$("#set_" + that.id).find(".rqListBox>li>a").click(function(){
					//경계가 고정이고,
					//선택된 엘리먼트가 경계일때, 아무동작 없이 리턴한다.
					if ($(this).attr("class").indexOf("ico_side_lv") != -1 && that.map.isFixedBound) {
						messageAlert.open("알림", "경계고정일 경우, 경계레벨 0레벨만 지원합니다.<br>1레벨 또는 2레벨을 사용을 원하시면 경계고정을 풀어주세요.");
						return false;
					}
					
					var on = $(this).hasClass("on"); 
					if(!on){
						that.isOpenPOI = false;
						$("#set_" + that.id).find(".rqListBox>li>a").removeClass("on");
						$("#set_" + that.id).find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
						$(this).next("ul").show();
						$(this).next("ol").show();
						$(this).addClass("on");
					}else{
						$(this).next("ul").hide();
						$(this).next("ol").hide();
						$(this).removeClass("on");
					}
				});
				
				$("#map_" + that.id).find(".rqListBox>li>a").click(function(){
					var on = $(this).hasClass("on"); 
					if(!on){
						that.isOpenPOI = false;
						$("#map_" + that.id).find(".rqListBox>li>a").removeClass("on");
						$("#map_" + that.id).find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
						$(this).next("ul").show();
						$(this).next("ol").show();
						$(this).addClass("on");
					}else{
						$(this).next("ul").hide();
						$(this).next("ol").hide();
						$(this).removeClass("on");
					}
				});
				
				$(settingList).mouseover(function() {
					$(this).addClass("over");
				});
				
				$(settingList).mouseout(function() {
					$(this).removeClass("over");
				});
				

				var optionList = ".rqListBox>li>ul>li>a";
				$(optionList).click(function() {
					var val = $(this).html();
					$(this).parents("ul").eq(0).prev("a").empty().html(val).removeClass("on");
					$(this).parents("ul").eq(0).hide();
				});
				
				$("#poi_" + that.id).find("#industry").click(function(){
					var nowUrl = location.href;
					var on = $(this).parent().hasClass("on");
					if(!on){	
						if(nowUrl.match("interactive")){
							apiLogWrite2("A0","A12","POI",$("#industry").text(),"00","없음");
						}else{
							apiLogWrite2("B0","B17","POI",$("#industry").text(),"00","없음");							
						}
					}
				});
				//세부POI 선택
				$("#poi_" + that.id).find(".rqListBox>li>ol>li").click(function(){
					var className = $(this).parent().attr("class");
					
					//산업체 POI
					if (className == "rqIcon09") {
						
					}
					//초기화
					else if (className == "rqIcon10") {
						that.isOpenPOI = false;
					}
					//테마POI
					else {
						$(this).parent().hide();
						$(this).parent().parent().find("a").removeClass("on");
						that.isOpenPOI = true;
						var themeCd = $(this).find("a").attr("name");
						that.selectedPoiTitle =  $(this).find("span").text();
						
						if (that.map.isFixedBound) {
							messageConfirm.open(
									"알림",
									"경계고정 및 레벨선택을 해제합니다.",
									btns = [
											{
											    title : "확인",
											    fAgm : null,
											    disable : false,
											    func : function(opt) {
											    	$("#zoom_" + that.id).find(".rightQuick.rq07").click();
											    	that.map.markers.clearLayers();
													that.map.setZoom(10);
													setTimeout(function() {
														that.markerGroup = [];
														that.reqThemePoiInfo(themeCd,  "0");
													}, 500);	
											    }
											}
									]
							);
						}else {
							that.map.markers.clearLayers();
							that.map.setZoom(10);
							setTimeout(function() {
								that.isShow = true; //9월 서비스
								that.reqThemePoiInfo(themeCd,  "0");
							}, 500);	
						}
						var nowUrl = location.href;
						if(nowUrl.match("interactive")){
							apiLogWrite2("A0","A12","POI",that.selectedPoiTitle,"00","없음");
						}else{
							apiLogWrite2("B0","B17","POI",that.selectedPoiTitle,"00","없음");							
						}
					}
				});
				
				//세부설정 선택
				$("#set_" + that.id).find(".rqListBox>li>ul>li").click(function(e){
					var type = $(this).find("a").attr("name");
					var typeList = {
							"distance"  : 0,	//측정-거리
							"munjuk"    : 1,	//측정-면적
							"clear"	    : 2,	//측정초기화
							"circle"    : 3,	//다중경계-원
							"rectangle" : 4,	//다중경계-사각형	
							"multi"		: 5,	//다중경계-다각형
							"each"		: 6,	//다중경계-개별
							"normal"	: 7,	//경계기준-연동
							"fixed"		: 8,	//경계기준-고정
							"level_0"	: 9,	//경계레벨-0
							"level_1"	: 10,	//경계레벨-1
							"level_2"	: 11,	//경계레벨-2
							"clearSelected" : 12 //다중경계해제
					};
					
					switch(typeList[type]) {
						case 0:	//거리계산
							$("#mapRgn_"+(that.map.id+1)).find(".draw-distance-out").click();
							break;
						case 1:	//면적계산
							$("#mapRgn_"+(that.map.id+1)).find(".draw-area-out").click();
							break;
						case 2:	//오버레이 초기화
							$("#set_"+that.id).find(".map_measure").find("span").html("지도<br/>측정");
							that.map.drawControl.removeOverlay();	
							break;
						case 3:	//원 영역
							that.setFixedBoundBtn(true);
							that.map.setBoundSelectedMoode("circle");
							that.map.selectedBoundList = [];
							$("#mapRgn_"+(that.map.id+1)).find(".draw-circle-sub-out").click();
							break;
						case 4:	//사각형 영역
							that.setFixedBoundBtn(true);
							that.map.setBoundSelectedMoode("rectangle");
							that.map.selectedBoundList = [];
							$("#mapRgn_"+(that.map.id+1)).find(".draw-rectangle-sub-out").click();
							break;
						case 5:	//다각형 영역
							that.setFixedBoundBtn(true);
							that.map.setBoundSelectedMoode("polygon");
							that.map.selectedBoundList = [];
							$("#mapRgn_"+(that.map.id+1)).find(".draw-polygon-sub-out").click();
							break;
						case 6:	//개별경계
							that.setFixedBoundBtn(true);
							that.map.selectedBoundList = [];
							that.map.setBoundSelectedMoode("multi");
							break;
						case 9:	//경계레벨 0
							that.map.setBoundLevel("0");
							that.map.lastGeojsonInfo = null; //9월 서비스
							break;
						case 10: //경계레벨 1
							that.map.setBoundLevel("1");
							that.map.lastGeojsonInfo = null; //9월 서비스
							break;
						case 11: //경계레벨 2
							that.map.setBoundLevel("2");
							that.map.lastGeojsonInfo = null; //9월 서비스
							break;
						case 12:
							that.doClearSelectedBound();
							that.setFixedBoundBtn(false);
							if (that.map.geojson) {
								that.map.clearDataOverlay();
							}
							break;
					}
					
				});
				
				//지도타입 선택
				$("#map_" + that.id).find(".rqListBox>li").click(function(){
					var type = $(this).find("a").attr("name");
					var zoomMargin, crs;
					if (type == "settlite") {
						that.map.mapMode = "settlite";
						crs = that.createSatelliteCRS();
						that.baseTileLayer = that.createSatelliteTileLayer();
						that.targetTileLayer = that.map.gMap.statisticTileLayer;
						zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
						that.createTileLayer(that.map.gMap, crs, that.baseTileLayer, that.targetTileLayer, zoomMargin);
					}else {
						that.map.mapMode = "normal";
						that.targetTileLayer = that.baseTileLayer;
						that.baseTileLayer = map.gMap.statisticTileLayer;
						zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
						that.createTileLayer(that.map.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);
					}
					
					if (that.delegate && 
						that.delegate.callbackFunc && 
						that.delegate.callbackFunc.didMapChangeMode instanceof Function) {
						that.delegate.callbackFunc.didMapChangeMode(type, that.map);
					}
				});
				
				
				//초기화선택
				$("#set_" + that.id).find(".ico_side_reset").click(function() {
					$("#set_" + that.id).find(".map_measure").find("span").html("지도<br/>측정");
					$("#set_" + that.id).find(".ico_side_lv1").click();
					$("#set_" + that.id).find(".rightQuick.rq02").click();
					that.doClearSelectedBound();
					that.setFixedBoundBtn(false);
					that.map.drawControl.removeOverlay();	
					
					//20170310 leekh 초기화 추가
					//$interactiveMap.ui.doClearMap(1);
					
					//2017.03.28 하드코딩 수정
					if (that.delegate != undefined && that.delegate != null) {
						if (typeof that.delegate.doClearMap === "function") {
							that.delegate.doClearMap(that.map.id+1);
						}
					}
					
					
				});
				
				//zoom-in
				$("#zoom_" + that.id).find(".rightQuick.rq03").click(function() {	
					if (!that.map.isFixedBound) {
						that.map.gMap.zoomIn(1);
					} 
					if (that.delegate != undefined && 
						that.delegate.callbackFunc != undefined &&
						that.delegate.callbackFunc.didMapZoomIn != undefined) {
						that.delegate.callbackFunc.didMapZoomIn(that.map);
					}
				});
				
				//zoom-out
				$("#zoom_" + that.id).find(".rightQuick.rq05").click(function() {
					if (!that.map.isFixedBound) {
						that.map.gMap.zoomOut(1);
					}
					if (that.delegate != undefined && 
							that.delegate.callbackFunc != undefined &&
							that.delegate.callbackFunc.didMapZoomOut != undefined) {
							that.delegate.callbackFunc.didMapZoomOut(that.map);
						}
				});
				
				
				$("#zoom_" + that.id).find(".rightQuick.rq07").click(function(){
					var on = $(this).hasClass("on");
					if(!on){
						$(this).addClass("on");
						$(this).css("background-image","url(/img/ico/ico_moveType02.png)");
						that.map.setBoundSelectedMoode("normal");
						that.map.setFixedBoundLevel(true);
						
						//고정일 경우,
						//경계레벨을 0레벨로 고정한다.
						$("#set_" + that.id).find(".ico_side_lv0").click();
						$("#set_" + that.id).find(".ico_side_lv").next().hide();
					}else{
						$(this).removeClass("on");
						$(this).css("background-image","url(/img/ico/ico_moveType01.png)");
						that.map.setFixedBoundLevel(false);
						if (that.map.isMultiSelectedBound) {
							that.doClearSelectedBound();
						}
						
						//고정을 해제할 경우,
						//경계레벨을 1레벨로 초기화한다.
						$("#set_" + that.id).find(".ico_side_lv1").click();
					} 
				}); 
				
				$("#poiInit_"+that.id).click(function() {
					that.isOpenPOI = false;
					that.map.markers.clearLayers();
					var on = $(this).find("a").hasClass("on");
					if (on) {
						$(this).find("a").removeClass("over");
						$(this).find("a").removeClass("on");
					}
				});
			},
			
			
			/**
			 * 
			 * @name          : reqThemePoiInfo
			 * @description   : 외부 POI정보를 호출한다.
			 * @date          : 2015. 10. 07. 
			 * @author	      : 권차욱
			 * @history 	  :
			 * @param themeCd : 테마코드
			 * @param pageNum : 페이지넘버
			 */
			this.reqThemePoiInfo = function(themeCd, pageNum) {
				this.themeCd = themeCd;
				this.pageNum = pageNum;
				this.mapBounds = this.map.gMap.getBounds();
				
				if (delegate) {
					if (delegate.setDataType) {
						delegate.setDataType(that.map.id, "poi");
					}
				}
				
				var area = "";
				area = 'RECTANGLE(';
				area += this.mapBounds._southWest.x + ' ' + this.mapBounds._southWest.y + ',';
				area += this.mapBounds._northEast.x + ' ' + this.mapBounds._northEast.y;
				area += ')';

				var sopOpenApiCompanySearchObj = new sop.openApi.companySearch.api();
				sopOpenApiCompanySearchObj.addParam("accessToken", accessToken);
				sopOpenApiCompanySearchObj.addParam("bnd_year", this.bndYear);
				sopOpenApiCompanySearchObj.addParam("year", this.year);
				sopOpenApiCompanySearchObj.addParam("area_type", "1");
				sopOpenApiCompanySearchObj.addParam("resultcount", this.resultcount);
				sopOpenApiCompanySearchObj.addParam("area", area);
				sopOpenApiCompanySearchObj.addParam("theme_cd", themeCd);
				sopOpenApiCompanySearchObj.addParam("pagenum", pageNum);
				
				var param = {
					"bnd_year"    : this.bndYear,
					"year" 	      : this.year,
					"area_type"   : "1",
					"area"		  : area,
					"theme_cd"	  : themeCd,
					"resultcount" : this.resultcount,
					"pagenum"	  : pageNum
				};
				
				sopOpenApiCompanySearchObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/stats/companysearch.json",
					options : {
						url : "/OpenAPI3/stats/companysearch.json",
						target : this,
						param : param,
						btntype: "poi",
						title : that.selectedPoiTitle,
						map : that.map
					}
				});
			},
			
			
			/**
			 * 
			 * @name            : reqCompanyPoiInfo
			 * @description     : 사업체 POI정보를 호출한다.
			 * @date            : 2015. 10. 15. 
			 * @author	        : 권차욱
			 * @history 	    :
			 * @param class_cd  : 사업체코드
			 * @param class_deg : 사업체차수
			 * @param pageNum : 페이지넘버
			 */
			this.reqCompanyPoiInfo = function(class_cd, class_deg, pageNum) {
				this.class_cd = class_cd;
				this.pageNum = pageNum;
				this.mapBounds = this.map.gMap.getBounds();
				
				if (delegate) {
					if (delegate.setDataType) {
						delegate.setDataType(that.map.id, "poi");
					}
				}
				
				var area = "";
				area = 'RECTANGLE(';
				area += this.mapBounds._southWest.x + ' ' + this.mapBounds._southWest.y + ',';
				area += this.mapBounds._northEast.x + ' ' + this.mapBounds._northEast.y;
				area += ')';

				var sopOpenApiCompanySearchObj = new sop.openApi.companyPoiSearch.api();
				sopOpenApiCompanySearchObj.addParam("accessToken", accessToken);
				sopOpenApiCompanySearchObj.addParam("bnd_year", this.bndYear);
				sopOpenApiCompanySearchObj.addParam("year", this.year);
				sopOpenApiCompanySearchObj.addParam("area_type", "1");
				sopOpenApiCompanySearchObj.addParam("resultcount", this.resultcount);
				sopOpenApiCompanySearchObj.addParam("area", area);
				sopOpenApiCompanySearchObj.addParam("class_code", class_cd);
				sopOpenApiCompanySearchObj.addParam("class_deg", class_deg);
				sopOpenApiCompanySearchObj.addParam("pagenum", pageNum);
				
				var param = {
					"bnd_year"    : this.bndYear,
					"year" 	      : this.year,
					"area_type"   : "1",
					"area"		  : area,
					"class_code"  : class_cd,
					"class_deg"	  : class_deg,
					"resultcount" : this.resultcount,
					"pagenum"	  : pageNum
				};
				
				sopOpenApiCompanySearchObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/stats/companysearch.json",
					options : {
						url : "/OpenAPI3/stats/companysearch.json",
						target : this,
						param : param,
						btntype: "poi",
						title : that.selectedPoiTitle,
						map : that.map
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : reqInterstryList
			 * @description  : OpenAPI 산업체분류 정보를 조회한다.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 * @param adm_cd : 행정동코드
			 * @param filterParam : 경계레이어 선택 시, 표출된 파라미터(key)정보
			 * @param title : 드랍한 버튼의 타이틀정보am
			 */
			this.reqInterstryList = function(depth, class_deg, class_cd) {
				var sopOpenApiInderstryCodeObj = new sop.openApi.InderstryList.api();
				sopOpenApiInderstryCodeObj.addParam("accessToken", accessToken);
				sopOpenApiInderstryCodeObj.addParam("class_deg", class_deg);
				if (class_cd != null) {
					sopOpenApiInderstryCodeObj.addParam("class_code", class_cd);
				}

				sopOpenApiInderstryCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/stats/industrycode.json",
					options : {
						that : this,
						depth : depth,
						class_deg : class_deg,
						class_cd : class_cd
					}
				});
			}
			
			
			
		}
	};
	
	/** ********* 테마사업체 POI 조회 START ********* */
	(function () {
		$class("sop.openApi.companySearch.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					var totalCount = res.result[0].totalcount;
					var returnCount = res.result[0].returncount;
					var pageNum = res.result[0].pagenum; //9월 서비스
					var apicallCount = parseInt(totalCount / (parseInt(options.param.resultcount) * (pageNum + 1))); //9월 서비스

					if (returnCount !== totalCount && apicallCount > 0) {
							that.reqThemePoiInfo(options.param.theme_cd, pageNum + 1);
					}
					
					var theme_cd = "";
					if (options.param.theme_cd.length == 2) {
						theme_cd = options.param.theme_cd;
					}else {
						theme_cd = options.param.theme_cd.substring(0, 2) + '_' + options.param.theme_cd.substring(2, 4);
					}
							
					var poiList = res.result[0].company_list;
					if (poiList.length > 0) {
						for (var i = 0; i < poiList.length; i++) {
							that.markerGroup.push(poiList[i]);
							var markerIcon = sop.icon({
								iconUrl: '/img/marker/marker/' + theme_cd + '.png',
								shadowUrl: '/img/marker/theme_shadow.png',
								iconAnchor: [12.5, 40 ],
								iconSize: [ 25, 40 ],
								infoWindowAnchor: [1, -34]
							});
							
							var marker = sop.marker([ poiList[i].x, poiList[i].y ], {
								icon: markerIcon
							});
							
							marker.info = poiList[i];
							marker.addTo(that.map.markers);
							
							var tel_num = "";
							if (!sop.Util.isUndefined(poiList[i].tel_no)) {
								tel_num = poiList[i].tel_no;
							}
							var html ="";
							html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
							html += 	'<tr>';
							html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
							html += 		'<td></td>';
							html += 	'</tr>';
							//html += 	'<tr>';
							//html += 		'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
							//html += 		'<td></td>';
							//html += 	'</tr>';
							html += '</table>';
							
							marker.bindInfoWindow(html);
						}
						
						//API 로그
						//apiLogWrite("A0", options);
					}
					else {
					}
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 테마사업체 POI 조회 END ********* */
	
	/** ********* 사업체 POI 조회 START ********* */
	(function () {
		$class("sop.openApi.companyPoiSearch.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					var result = res.result[0];
					var totalCount = result.totalcount;
					var returnCount = result.returncount;
					var pageNum = result.pagenum; //9월 서비스 
					var apicallCount = parseInt(totalCount / (parseInt(options.param.resultcount) * (pageNum + 1))); //9월 서비스

					if (returnCount !== totalCount && apicallCount > 0) {
							that.reqCompanyPoiInfo(options.param.class_code, options.param.class_deg, pageNum + 1);
					}
					
					var poiList = result.company_list;
					if (poiList.length > 0) {
						for (var i = 0; i < poiList.length; i++) {
							// 2016. 10. 04 수정 
							// 확인 부탁 드립니다요
							that.markerGroup.push(poiList[i]);
							var tempThemeCd = poiList[i].theme_cd;
							var markerIconImgPath = '';
							
							if (tempThemeCd != undefined) {
								var theme_cd = tempThemeCd.substring(0, 2) + '_' + tempThemeCd.substring(2, 4);
								markerIconImgPath = '/img/marker/marker/' + theme_cd + '.png';
							} else {
								markerIconImgPath = '/img/marker/thema_marker_default.png';
							}
							
							var markerIcon = sop.icon({
								iconUrl: markerIconImgPath,
								shadowUrl: '/img/marker/theme_shadow.png',
								iconAnchor: [12.5, 40 ],
								iconSize: [ 25, 40 ],
								infoWindowAnchor: [1, -34]
							});
							//
							
							var marker = sop.marker([ poiList[i].x, poiList[i].y ], {
								icon: markerIcon
							});
							
							marker.info = poiList[i];
							marker.addTo(that.map.markers);
							
							var tel_num = "";
							if (!sop.Util.isUndefined(poiList[i].tel_no)) {
								tel_num = poiList[i].tel_no;
							}
							var html ="";
							html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
							html += 	'<tr>';
							html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
							html += 		'<td></td>';
							html += 	'</tr>';
							//html += 	'<tr>';
							//html += 		'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
							//html += 		'<td></td>';
							//html += 	'</tr>';
							html += '</table>';
							
							marker.bindInfoWindow(html);
							
						}
						
						//API 로그
						//apiLogWrite("A0", options);
					}
					else {
					}
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 사업체 POI 조회 END ********* */
	
	/** ********* OpenAPI 산업체분류 Start ********* */
	(function() {
		$class("sop.openApi.InderstryList.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var that = options.that;
						if (res.errCd == "0") {
							var tmpData = [];
							for(var i=0; i < result.length; i++) {
								var tmpObj = {};
								tmpObj.id = that.id + "_" + result[i].class_code + "_" + options.depth;
								tmpObj.cd = result[i].class_code;
 								tmpObj.text = result[i].class_nm;
								tmpObj.depth = options.depth + 1;
								tmpObj.reqIcon = true;
								
								if (options.depth < 3) {
									tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
									tmpObj.state = "closed";
								}else {
									tmpObj.childCount = 0;
								}
								tmpData.push(tmpObj);								
							}
							
							if (that.companyTree == null) {
								if (options.depth == 0) {
									that.companyTree = $("#poi_" + that.id).find(".tree").easytree({
										data : tmpData,
										allowActivate: true,
							            disableIcons: true,
							            toggled : function(event, nodes, node) {
											if (node.childCount == null) {
												if (node.children.length > 0 ) {
													if(node.children[0].id == node.id + "_progress") {
														if (node.isExpanded) {
															that.reqInterstryList(
																	node.depth,
																	options.class_deg,
																	node.cd);
														}
													}
												}
											}
										},
										selected : function(node) {	
											var id = node.id.split("_")[1];
											that.curSelectedCompanyNode = node; 
											that.selectedPoiTitle = node.text;
										},
										iconSelected : function(e, id, node) {
											$("#poi_"+that.id).find(".rqIcon09").hide();
											$("#poi_"+that.id).find(".rqIcon09").prev().removeClass("on");
											var id = node.id.split("_")[1];
											that.isOpenPOI = true;
											that.map.markers.clearLayers();
											that.map.setZoom(10);
											setTimeout(function() {
												that.markerGroup = [];
												that.reqCompanyPoiInfo(id, "9", 0);
											}, 500);
										}
										
									});
								} 
							}else {
								for (var i=0; i<tmpData.length; i++) {
									that.companyTree.addNode(tmpData[i], that.id + "_" + options.class_cd + "_" +(options.depth-1));
								}
								that.companyTree.removeNode( that.id + "_" +options.class_cd + "_" + (options.depth-1) + "_progress");
								that.companyTree.rebuildTree();
							}
						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								that.reqInterstryList(
										options.depth,
										options.class_deg,
										options.class_cd);
							});
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* OpenAPI 산업체분류 End ********* */
	
	
	
}(window, document));