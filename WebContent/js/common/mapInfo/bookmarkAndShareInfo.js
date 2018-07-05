/**
 * 즐겨찾기 & 공유에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/10  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$bookmarkAndShareInfo = W.$bookmarkAndShareInfo || {};
	
	share = {
		shareInfo : function(map, delegate) {
			var that = this;
			this.map = map;
			this.shareUrlInfo = [];
			this.share_type = "BMARK",
			this.delegate = delegate;
			
			/**
			 * 
			 * @name         : setShareInfo
			 * @description  : 공유 및 북마크정보를 세팅한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options : 공유 및 북마크정보
			 * @param type : 공유정보 타입(normal, share)
			 */
			this.setShareInfo = function(options, type, id) {
				this.map_type = options.map_type;
				
				if (options != null) {
					if(options.url != null || options.api_call_url != null) {
						var url = null;
						var params = {};
						var noneParams = {};
						var showData = null;
						var unit = null;
						var title = null;
						var zoomlevel = null;
						var center = null;
						var apiId = null;
						var isKosis = false;
						var dist_level = null;
						var btntype = null;		
						var maxYear = null;
						
						if (type == "normal") {
							// 파라미터세팅		
							for (var i = 0; i < options.params.param.length; i++) {
								var key = options.params.param[i].key;
								var value = options.params.param[i].value;
								params[key] = value;
							}
							
							if (options.params.adm_cd == undefined) {
								options.params.adm_cd = "00";
							}
							params["adm_cd"] = options.params.adm_cd;

							//조회조건이 아닌 파라미터 세팅
							noneParams = options.params.noneParams;
							url = options.url;
							zoomlevel = options.zoomlevel;
							center = options.center;
							showData = options.params.filter;
							unit = options.params.unit;
							title = options.params.title;
							apiId = options.params.api_id;
							btntype = options.btntype;
							maxYear = options.params.maxYear;
								
							if (options.params.isKosis !== undefined && options.params.isKosis == true) {
								isKosis = true; 
								dist_level = options.dist_level;
							}
			
						}else if(type=="bizStats"){
							
							//조회조건이 아닌 파라미터 세팅
							url = options.url;
							zoomlevel = options.zoomlevel;
							center = options.center;
							title = options.title;
							apiId = options.api_id;
							params = options.params;
							
						}else {
							url = options.api_call_url;
							zoomlevel = options.param_info.mapInfo.zoomlevel;
							center = options.param_info.mapInfo.center;
							showData = options.param_info.showData;
							unit = options.param_info.unit;
							title = options.param_info.title;
							params = options.param_info.paramInfo;
							apiId = options.param_info.api_id;
							btntype = options.param_info.btntype;
							
							if (options.param_info.isKosis !== undefined && options.param_info.isKosis == true) {
								isKosis = true; 
							}
						}

						// 공유정보 설정
						var shareInfo = {
								url : url,
								params : {
									mapInfo : {
										zoomlevel : zoomlevel,
										center : center
									},
									paramInfo : params,
									showData : showData,
									unit : unit,
									api_id : apiId,
									isKosis : isKosis,
									btntype : btntype,
									legend : {},
									title : $.trim(title),
									maxYear : maxYear
								},
								title : $.trim(title),
								
						};

						if(isKosis){	
							//관리자 통계주제도를 위한 표출레벨 설정
							if(dist_level=='1')
							{	//시도
								dist_level='01';
							}else if(dist_level=='2'){
								//시군구
								dist_level='02';
							}else if(dist_level=='3'){
								//읍면동
								dist_level='03';
							}else{
								dist_level='01';
							}
							shareInfo.params.dist_level=dist_level;
						}
						
						//초기화
						this.shareUrlInfo = [];
						
						this.shareUrlInfo.push(shareInfo);
					}
				}

				// 줌레벨, 센터좌표 재설정
				if (this.shareUrlInfo.length > 1) {
					var length = this.shareUrlInfo.length;
					var zoomlevel = this.shareUrlInfo[length - 1].params.mapInfo.zoomlevel;
					var center = this.shareUrlInfo[length - 1].params.mapInfo.center;
					for (var i = 0; i < this.shareUrlInfo.length; i++) {
						this.shareUrlInfo[i].params.mapInfo.zoomlevel = zoomlevel;
						this.shareUrlInfo[i].params.mapInfo.center = center;
					}
				}	
			},
			
			this.setTechnicalBizShareInfo = function(options, type, id) {
				if (options != undefined && options != null) {
					var zoomlevel, center, legend, url, paramInfo;
					//추가
					$("#bookmarkBtn").show();
					switch (type) {
						case "sido":
							url = options.url;
							zoomlevel = options.map.zoom;
							center = options.map.center;
							legend = {};
							paramInfo = {};
							break;
						case "sigungu":
							url = options.url;
							zoomlevel = options.map.zoom;
							center = options.map.center;
							legend = {};
							paramInfo = options.params;
							paramInfo["theme_nm"] = options.themeNm;
							break;
						case "density":
							url = options.url;
							zoomlevel = options.map.zoom;
							center = options.map.center;
							legend = {};
							paramInfo = options.params;
							break;
						case "supply":
							url = options.url;
							zoomlevel = options.map.zoom;
							center = options.map.center;
							legend = {};
							paramInfo = options.params;
							break;
						case "industry":
							url = options.url;
							zoomlevel = options.map.zoom;
							center = options.map.center;
							legend = {};
							paramInfo = options.params;
							break;
						case "lq" : 
							url = options.url;
							zoomlevel = options.map.zoom;
							center = options.map.center;
							legend = {};
							paramInfo = options.params;
							break;
						case "search" : 
							url = options.url;
							zoomlevel = options.map.zoom;
							center = options.map.center;
							legend = {};
							paramInfo = options.params;
							break;
					}
				
					// 공유정보 설정
					var shareInfo = {
							url : url,
							params : {
								mapInfo : {
									zoomlevel : zoomlevel,
									center : center
								},
								paramInfo : paramInfo,
								legend : legend,
								type : type
							}
					};
					
					this.shareUrlInfo = [];
					this.shareUrlInfo.push(shareInfo);
				}
				
			},
			
			/**
			 * 
			 * @name         : setHouseShareInfo
			 * @description  : 살고싶은 우리동네 공유정보
			 * @date         : 2017. 08. 30. 
			 * @author	     : 주용민
			 * @history 	 :
			 * @param options : 공유 및 북마크정보
			 * @param type : 공유정보 타입
			 */
			this.setHouseShareInfo = function(options, type, id) {
				if (options != undefined && options != null) {
					switch (type) {
					case 0:
						url = openApiPath + "/ServiceAPI/house/recommendAreaLists.geojson"
						zoomlevel = options.zoomlevel;
						center = options.center;
						title = options.title;
						params = options.params;
						break;
					case 1:
						url = openApiPath + "/OpenAPI3/boundary/hadmarea.geojson"
						zoomlevel = options.zoomlevel;
						center = options.center;
						title = options.title;
						params = options.params;
						break;
					case 2:
						url = openApiPath + "/ServiceAPI/house/recommendAreaLists.geojson"
						zoomlevel = options.zoomlevel;
						center = options.center;
						title = options.title;
						params = options.params;
						break;
					}
					
					// 공유정보 설정
					var shareInfo = {
							url : url,
							params : {
								mapInfo : {
									zoomlevel : zoomlevel,
									center : center
								},
								paramInfo : params,
								legend : {},
								title : $.trim(title),
								type : type
							},
							title : $.trim(title),
							
					};
					
					this.shareUrlInfo = [];
					this.shareUrlInfo.push(shareInfo);
				}
				
			},
			
			/**
			 * 
			 * @name         : setThematicMapShareInfo
			 * @description  : 통계주제도 공유정보
			 * @date         : 2017. 01. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options : 공유 및 북마크정보
			 * @param type : 공유정보 타입(색상, 증감, 시계열, 분할)
			 */
			this.setThematicMapShareInfo = function(options, type) {
				if (options != undefined && options != null) {
					// 공유정보 설정
					var shareInfo = {
							url : options.url,
							params : {
								mapInfo : {
									zoomlevel : null,
									center : null
								},
								paramInfo : {},
								legend : {},
								type : type
							}
					};
					
					this.shareUrlInfo = [];
					this.shareUrlInfo.push(shareInfo);
				}
			},
			
			/**
			 * 
			 * @name         : setMyDataShareInfo
			 * @description  : 마이데이터 공유정보
			 * @date         : 2017. 01. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options : 공유 및 북마크정보
			 * @param type : 
			 */
			this.setMyDataShareInfo = function(options, type) {
				if (options != undefined && options != null) {
					// 공유정보 설정
					var shareInfo = {
							url : options.url,
							params : {
								mapInfo : {},
								paramInfo : options.params,
								legend : {},
								title : options.title,
								type : type
							}
					};
					
					this.shareUrlInfo = [];
					this.shareUrlInfo.push(shareInfo);
				}
			},
			
						
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.doShare = function(title, srvType) {
				if (this.checkShare("SHARE", srvType)) {
					messageAlert.open(
							"알림", 
							"해당 통계정보를 공유하시겠습니까?",  
							function done() {
								if (that.shareUrlInfo != null && that.shareUrlInfo.length > 0) {
									that.share_type = "SHARE"; 
									for (var i=0; i<that.shareUrlInfo.length; i++) {
										var shareInfo = that.shareUrlInfo[i];
										if (that.map.legend != null) {
											shareInfo.params.legend["type"] = that.map.legend.selectType;
											shareInfo.params.legend["level"] = that.map.legend.lv;
											shareInfo.params.legend["color"] = that.map.legend.legendColor;
										}
									}
									////2017.02.22 이미지캡쳐 수정
									that.openApiRegBookmark(that.shareUrlInfo, that.share_type, title, srvType, "SHARE");
								}
							},
							function cancel() {}
					);
				}
			};
			
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크 정보를 수행한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.doBookMark = function(title, srvType) {
				if (this.checkShare("BMARK", srvType)) {
					messageAlert.open(
							"알림", 
							"해당 통계정보를 즐겨찾기 하시겠습니까?",  
							function done() {
								if (that.shareUrlInfo != null && that.shareUrlInfo.length > 0) {
									that.share_type = "BMARK"; 
									for (var i=0; i<that.shareUrlInfo.length; i++) {
										var shareInfo = that.shareUrlInfo[i];
										if (that.map.legend != null) {
											shareInfo.params.legend["type"] = that.map.legend.selectType;
											shareInfo.params.legend["level"] = that.map.legend.lv;
											shareInfo.params.legend["color"] = that.map.legend.legendColor;
										}
									}
									//2017.02.22 이미지캡쳐 수정
									that.openApiRegBookmark(that.shareUrlInfo, that.share_type, title, srvType, "BMARK");
								}
							},
							function cancel() {}
					);
				}	
			};
			
			
			/**
			 * 
			 * @name         : doShareToKakaoStory
			 * @description  : 카카오스토리에 공유한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.doShareToKakaoStory = function(linkUrl) {
				Kakao.Auth.login({
					success : function(authObj) {
						var linkURL = linkUrl;
						Kakao.API.request({
							url : '/v1/api/story/linkinfo',
							data : {
								url : linkURL
							},
						}).then(function(res) {
							res.description = that.shareUrlInfo[0].title;
							return Kakao.API.request( {
								url : '/v1/api/story/post/link',
								data : {
									link_info : res
								}
							});
						}).then(function(res) {
							return Kakao.API.request( {
								url : '/v1/api/story/mystory',
								data : { id : res.id },
								success: function(res) {
									messageAlert.open("알림", "카카오스토리에 정상적으로 공유하였습니다.");
								},
								fail : function(error) {
									messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
								}
							});
						});
					},
					fail : function(error) {
						messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
					}
				})
			};
			
			
			/**
			 * 
			 * @name         : checkShare
			 * @description  : 공유 또는 북마크가 가능한지 체크한다.
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.checkShare = function(type, srvType) {
				
				console.log("[bookmarkAndShareInfo.js] checkShare() 호출");
				
				var isShare = true;
				var shareMessage = "";
				var noneDataMessage = "";
				
				if (srvType != undefined && srvType == "report") {
					return true;
				}
				
				if (type == "SHARE") {
					shareMessage = "공유 기능은 로그인 후 이용하실 수 있습니다.<br>로그인 하시겠습니까?";
					noneDataMessage = "URL 공유하기는 통계조회 후 이용할 수 있습니다.";
				}else {
					var titleTxt = "즐겨찾기";
					if(srvType == "gallary"){
						titleTxt = "갤러리"
					}
					shareMessage = titleTxt + " 기능은 로그인 후 이용하실 수 있습니다.<br>로그인 하시겠습니까?";
					noneDataMessage = titleTxt + "는 통계조회 후 이용할 수 있습니다.";
				}
				
				var linkUrl = "";
				var domain = window.location.protocol+"//"+window.location.host;
				switch (srvType) {
					case "IMAP":
						linkUrl =  domain + "/view/map/interactiveMap";
						break;
					case "BMAP":
						linkUrl = domain + "/view/bizStats/bizStatsMap"
						break;
					case "TECH":
						linkUrl = domain + "/view/technicalBiz/technicalBizMap"
						break;
					case "THEME":
						linkUrl = domain + "/view/thematicMap/thematicMapMain"
						break;
					case "MYDATA" : 
						linkUrl = domain + "/view/map/interactiveMap/userdata"
						break;
					case "HMAP" : 
						linkUrl = domain + "/view/house/houseAnalysisMap"
						break;
					case "gallary" :
						linkUrl = window.location.href;
						if (linkUrl.indexOf("thematicMap") != -1) {
							linkUrl = window.parent.location.href;
						}
							
						break;
				}
				
				// URL공유하기 메뉴 로그인 체크 제외
				if(!AuthInfo.authStatus && type != "SHARE") {
					messageConfirm.open(
			    			 "알림", 
			    			 shareMessage,
			    			 btns = [
								{
								    title : "로그인",
								    fAgm : null,
								    disable : false,
								    func : function(opt) {
								    	var curUrl = linkUrl;
								    	goSelectLogin(curUrl); 
								    }
								 },
								 
			    			     {
								   title : "취소",
								   fAgm : null,
								   disable : false,
								   func : function(opt) {}
			    			     }   
			    			     
			    			 ]
			    	);
					
					isShare = false;
				}else {
					if (that.shareUrlInfo == null || that.shareUrlInfo.length == 0) {
						messageAlert.open("알림", noneDataMessage);
						isShare = false;
					}
				}
				
				return isShare;
			},
			
			
			/**
			 * 
			 * @name         : clearShareData
			 * @description  : 공유 또는 북마크 정보를 초기화한다.
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.clearShareData = function() {
				this.shareUrlInfo = [];
			},
			
			
			/**
			 * 
			 * @name         : openApiRegBookmark
			 * @description  : 북마크 및 공유정보를 등록한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 북마크 및 공유정보
			 * @param hist_type : 북마크 및 공유타입
			 */
			//2017.02.22 이미지캡처 수정
			this.openApiRegBookmark = function(params, hist_type, title, srvType, shareType) {
				var tmpParams = JSON.stringify(params);
				var sopOpenApiRegBookmarkObj = new sop.openApi.regBookmark.api();
				sopOpenApiRegBookmarkObj.addParam("hist_id", makeRandomThirtySevenDigitString());
				sopOpenApiRegBookmarkObj.addParam("hist_type", hist_type);
				sopOpenApiRegBookmarkObj.addParam("params", tmpParams);
				sopOpenApiRegBookmarkObj.addParam("hist_nm", title);
				if (srvType != undefined) {
					sopOpenApiRegBookmarkObj.addParam("map_type", srvType);
				}else {
					sopOpenApiRegBookmarkObj.addParam("map_type", "IMAP");
				}
				sopOpenApiRegBookmarkObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/member/RegStatisticsHistory.json",
					options : {
						shareType : shareType,
						params : params,
						obj : that
					}
				});
			};
			
			//2017.02.23 이미지캡쳐 수정
			//=========================================================================================//
			/**
			 * 
			 * @name         : doCapture
			 * @description  : 지도 캡쳐를 수행한다.
			 * @date         : 2017. 02. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param targetId : 캡쳐 엘리먼트 아이디
			 * @param fileName : 파일명
			 * @param callback : 콜백함수
			 */
			this.doCapture = function(targetId, fileName, callback) {
				var center = this.map.gMap.getCenter();
            	var zoom = this.map.gMap.getZoom();
            	this.map.gMap._resetView(center, zoom);

            	setTimeout(function() {
            		if( Object.prototype.toString.call(targetId) === '[object Array]' ) {
            			var canvasList = [];
            			for (var i=0; i<targetId.length; i++) {
            				var capture = html2canvas($(targetId[i]), {
                                logging: true,
                                useCORS: false,
                                proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
                                onrendered : function(canvas) {
                                	//익스플로러 예외처리
                                	var agent = navigator.userAgent.toLowerCase();
        	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        	                     		var doc = document.querySelector(targetId[i]); 
        	                     		var mapContainer = null;
        	                     		for (var k=0; k<doc.childNodes.length; k++) {
        	                     			var tmpClassName = doc.childNodes[k].className;
        	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
        	                     				mapContainer = doc.childNodes[k];
        	                     				break;
        	                     			}
        	                     		}
        	                     		if (mapContainer != null) {
        	                     			var svgList = mapContainer.querySelectorAll("svg");
        		                     		for (var k=0; k<svgList.length; k++) {
        		                     			var svg = svgList[k];
        		                     			var xml  = new XMLSerializer().serializeToString(svg);
        			                            var tmpCanvas = document.createElement("canvas");
        			                            canvg(tmpCanvas, xml);
        			                            var marginLeft = (tmpCanvas.width - canvas.width)/2;
        			                            var marginTop = (tmpCanvas.height - canvas.height)/2;
        			                            var ctx = canvas.getContext("2d");
        			                            ctx.drawImage(tmpCanvas, -marginLeft, -marginTop, tmpCanvas.width, tmpCanvas.height);
        		                     		}
        	                     		}
        	                     	}
                                	canvasList.push(canvas); 
                                	if (canvasList.length == targetId.length) {
                                		var targetCanvas = document.createElement("canvas");
                                		var width = canvas.width;
                                		var height = canvas.height;
                                		var dx = 0, dy = 0;
                                		targetCanvas.width = canvas.width *2
                                		targetCanvas.height = canvas.height;
                                		var ctx = targetCanvas.getContext("2d");
                            			for (var x=0; x<canvasList.length; x++) {
                            				if (x != 0) {
                            					dx += width;
                            				}
                            				ctx.drawImage(canvasList[x], dx, dy, width, height);
                            			}
                            			
                            			var data = targetCanvas.toDataURL();  
                                       	if (callback != undefined && callback != null && callback instanceof Function) {
                   							callback.call(undefined, data);
                   						}
                                	}
                                	
                                }
                            });
            			}
            		}else {
            			var capture = html2canvas($(targetId), {
                            logging: false,
                            useCORS: false,
                            proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
                            onrendered : function(canvas) {
                            	//익스플로러 예외처리
                            	var agent = navigator.userAgent.toLowerCase();
    	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
    	                     		var doc = document.querySelector(targetId); 
    	                     		var mapContainer = null;
    	                     		for (var x=0; x<doc.childNodes.length; x++) {
    	                     			var tmpClassName = doc.childNodes[x].className;
    	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
    	                     				mapContainer = doc.childNodes[x];
    	                     				break;
    	                     			}
    	                     		}
    	                     		if (mapContainer != null) {
    	                     			var svgList = mapContainer.querySelectorAll("svg");
    		                     		for (var x=0; x<svgList.length; x++) {
    		                     			var svg = svgList[x];
    		                     			var xml  = new XMLSerializer().serializeToString(svg);
    			                            var tmpCanvas = document.createElement("canvas");
    			                            canvg(tmpCanvas, xml);
    			                            var marginLeft = (tmpCanvas.width - canvas.width)/2;
    			                            var marginTop = (tmpCanvas.height - canvas.height)/2;
    			                            var ctx = canvas.getContext("2d");
    			                            ctx.drawImage(tmpCanvas, -marginLeft, -marginTop, tmpCanvas.width, tmpCanvas.height);
    		                     		}
    	                     		}
    	                     	}

	                           	var data = canvas.toDataURL();  
	                           	if (callback != undefined && callback != null && callback instanceof Function) {
	       							callback.call(undefined, data);
	       						}
                            }
                        });
            		}
            	}, 300);
			},
			//=========================================================================================//
			
			//2017.02.22 이미지캡쳐 수정
			//=========================================================================================//
			this.Popup = {
					show : function () {
						this.blockUI = document.createElement("DIV");
						this.blockUI.style.backgroundColor = "#D3D3D3";
						this.blockUI.style.border = "0px solid black";
						this.blockUI.style.position = "absolute";
						this.blockUI.style.left = '0px';
						this.blockUI.style.top = '0px';
						if (window.innerHeight == undefined) {
							this.blockUI.style.height = document.documentElement.clientHeight + 'px';
							this.blockUI.style.width = document.documentElement.clientWidth + 'px';
						}
						else {
							this.blockUI.style.height = window.innerHeight + 'px';
							this.blockUI.style.width = window.innerWidth + 'px';
						}
						this.blockUI.style.zIndex = "10000";
						this.blockUI.style.filter = "alpha(opacity=60);";
						this.blockUI.style.MozOpacity = 0.6;
						this.blockUI.style.opacity = 0.6;
						this.blockUI.style.KhtmlOpacity = 0.6;
						document.body.appendChild(this.blockUI);
						
						this.popupUI = document.createElement("DIV");
						this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
						this.popupUI.style.border = "3px solid rgb(0,0,0)";
						this.popupUI.style.position = "absolute";
						this.popupUI.style.height = '10px';
						this.popupUI.style.lineHeight = '50px';
						this.popupUI.style.paddingBottom = '40px';
						this.popupUI.style.width = '400px';
						this.popupUI.style.top = '50%';
						this.popupUI.style.left = '50%';
						this.popupUI.style.zIndex = "11000";
						this.popupUI.style.cursor = 'wait';
						var divHeight = this.popupUI.style.height.replace('px', '');
						var divWidth = this.popupUI.style.width.replace('px', '');
						this.popupUI.style.margin = '-' + divHeight / 2 + 'px 0 0 -' + divWidth / 2 + 'px';
						this.popupUI.style.textAlign = 'center';

						 var errorMsg = "<p>이미지정보 저장중입니다. 잠시만 기다려주세요.</p>";
						this.popupUI.innerHTML = errorMsg;
						
						document.body.appendChild(this.popupUI);
					},
					close : function () {
						if (!sop.Util.isUndefined(this.blockUI)) {
							document.body.removeChild(this.blockUI);
							delete this.blockUI;
						}
						if (!sop.Util.isUndefined(this.popupUI)) {
							D.body.removeChild(this.popupUI);
							delete this.popupUI;
						}
					}
				
				}
				//=========================================================================================//
		}
			
	};
	
	
	/** ********* 북마크 등록시작 ********* */
	(function() {
		$class("sop.openApi.regBookmark.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							
							var linkUrl = getShareURL(result.map_type);
							
							if (result.hist_type == "SHARE") {	
								var linkData = linkUrl+"id=" + result.hist_id;
								var urlbox = $("#sharedlg").find($("input"));
								urlbox.val(linkData);
								
								var elemDiv = document.getElementById("facebookDiv");
							    var markup = '<div class="fb-share-button" data-href="'+urlbox.val()+'" data-layout="button"></div>';
							    elemDiv.innerHTML = markup;
								FB.XFBML.parse(elemDiv);
								
								//트위터 공유버튼 생성 
								$("#twitterDiv").html("<a class='twitter-share-button' href='//twitter.com/share' data-url='"+urlbox.val()+"' data-count='none'></a>");
								twttr.widgets.load();
								
								//setTimeout(function() {
									$(".deem").show();
									$("#sharedlg").show();
								//}, 700);
							}
							//해당 즐겨찾기의 미리보기 이미지를 생성한다.
							//2017.02.22 이미지캡쳐 수정
							//=========================================================================================//
							if (options.shareType == "BMARK") {
								var that = options.obj;
								that.Popup.show();
								var captureId = options.params[0].params.mapCaptureId;
								that.doCapture(captureId, result.hist_id, function(data) {
									var saveData =  data.replace(/^data:image\/(png|jpg);base64,/, '');
									var base64ImageContent = saveData.replace(/^data:image\/(png|jpg);base64,/, "");				
									var formData = new FormData();
									formData.append('fileName', result.hist_id);
									formData.append('type', 'bookMark');
									formData.append('data', base64ImageContent); 
									
									$.ajax({
									    url: contextPath +"/ServiceAPI/gallery/urlMakeBase64.json",
									    data: formData,
									    type: 'POST',
									    contentType: false,
									    processData: false,
									    success : function() {
									    	console.log("11");
									    },
									    complete : function() {
									    	that.Popup.close();
									    }
									})
								});
							}
							//=========================================================================================//
							
							
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 북마크 등록종료 ********* */
	
	/** ********* 북마크 이미지 생성 시작 ********* */
	(function(){
		$class("sop.openApi.bookMarkBase64.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
			},
			onFail : function(status,option){
			}
		})
	}());
	/** ********* 북마크 이미지 생성 종료 ********* */
}(window, document));