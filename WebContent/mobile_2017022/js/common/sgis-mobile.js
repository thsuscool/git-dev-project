/**
 * 모바일 초기 설정
 */
(function (W, D) {
	W.$sgisMobile = W.$sgisMobile || {};
	$(document).ready(function(){
		$sgisMobile.ui.initialize();
	});
	/**
	 * ui관련
	 */
	$sgisMobile.ui = {
		parameters:{},
		initialize : function(pageTitle){
			$sgisMobile.ui.parameters = getAllParameter();
			createGlobalNavigatorBar(pageTitle);
		},
		search : function(){
			var search = function(searchText){
				if(searchText.replace(/ /,"")==""||searchText==undefined){
					messageAlert.open("알림", "검색어를 입력하세요.",function(){
						$sgisMobile.ui.search();
					});
				}else{
					location.href="/mobile/html/common/searchList.html?searchKeyword="+searchText;
				}
			}
			var ok = {
				title:"검색",
				func : function(opt) {
					var searchText = $(this).parents(".alertPopupWrapper").find("input[type=text].alertInputBox").val();
					search(searchText);
				}
			}
			var cancel = {
				title:"취소",
				func : function(opt) {}
			}
			messagePrompt.open("검색","지역명 검색어 or 검색어를 입력해주세요<br/>예)서울시 인구",[ok,cancel],"","검색어를 입력해주세요",function(id){
				$("#popupInput"+id).keyup(function(e){
					if(e.keyCode == 13){
						search($("#popupInput"+id).val());
						$("#wrapper_"+id).remove();
					}
				})
			});
		},
		mapResize : function(mapList){
			if(mapList&&mapList.length>0){
				for(var i=0;i<mapList.length;i++){
					mapList[i].gMap.invalidateSize();
				}
			}
		},
		createPaging : function(tableName, totalCount, obj, currentIndexName) {
			$("#"+tableName+"-page").empty();
			var obj;
			var totalPage = Math.ceil( totalCount / obj.pageSize);
			if(totalPage>0){
				var firstPage = $("<a/>",{
					"class" : "PasingFst "+(obj[currentIndexName]>1?"":"PasingOff"),
					href : "#",
					title : "맨앞",
					text : "◀◀"
				}).click(function(){
					if(obj[currentIndexName]>1){
						obj[currentIndexName] = 1;
						obj.makeLists();
					}
				});
				var prePage = $("<a/>",{
					"class" : "PasingForward "+(obj[currentIndexName]>1?"":"PasingOff"),
					href : "#",
					title : "이전",
					text : "◀"
				}).click(function(){
					if(obj[currentIndexName]>1){
						obj[currentIndexName] = obj[currentIndexName]-1;
						obj.makeLists();
					}
				});
				var currentPage = $("<span/>",{
					html : '<strong>'+(obj[currentIndexName])+'</strong>&#47;'+(totalPage>0?totalPage:'1')
				});
				var nextPage = $("<a/>",{
					"class" : "PasingNext "+(obj[currentIndexName]<totalPage?"":"PasingOff"),
					href : "#",
					title : "다음",
					text : "▶"
				}).click(function(){
					if(obj[currentIndexName]<totalPage){
						obj[currentIndexName] = obj[currentIndexName]+1;
						obj.makeLists();
					}
				});
				var lastPage = $("<a/>",{
					"class" : "PasingLst "+(obj[currentIndexName]<totalPage?"":"PasingOff"),
					href : "#",
					title : "맨끝",
					text : "▶▶"
				}).click(function(){
					if(obj[currentIndexName]<totalPage){
						obj[currentIndexName] = totalPage;
						obj.makeLists();
					}
				});
				$("#"+tableName+"-page").show().append(firstPage,prePage,currentPage,nextPage,lastPage);
			}else{
				$("#"+tableName+"-page").hide();
			}
		}
	}
	
	function getAllParameter (val) {
		var query_string = {};
		var query = window.location.search.substring(1);
		if(val != undefined) {	//주소창 url이 아닐경우
			query = val;
		}
		query = query.replace("params=", "");
		
		var vars = query.split('&');
		for ( var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			// If first entry with this name
			if (typeof query_string[pair[0]] === 'undefined') {
				query_string[pair[0]] = pair[1];
				// If second entry with this name
			}
			else if (typeof query_string[pair[0]] === 'string') {
				var arr = [ query_string[pair[0]], pair[1] ];
				query_string[pair[0]] = arr;
				// If third or later entry with this name
			}
			else {
				query_string[pair[0]].push(pair[1]);
			}
		}
		return query_string;
	}
	function createGlobalNavigatorBar(pageTitle){
		pageTitle = pageTitle==undefined||pageTitle==""?$("meta[name=title]").attr("content"):pageTitle
		$(".Wrap").prepend(
			'<div class="Header">'+
				'<header>'+
					'<div class="gnb">'+
						'<h1><a href="/mobile">SGIS오픈플랫폼</a></h1>'+
						'<h2>'+pageTitle+'</h2>'+
						'<a class="Btn_menuopen" href="#">메뉴열기</a>'+
						'<button class="Btn_SearchGo" type="button" onclick="$sgisMobile.ui.search()">지역명 검색어 또는 검색어 입력 예) 서울시 인구</button>'+
					'</div>'+
					'<div class="aside" style="height:565px;display:none;right:-300px;">'+
						'<aside>'+
							'<h3>전체메뉴</h3>'+
							'<div class="aside_menu">'+
								'<nav>'+
									'<ul>'+
										'<li class="menu03"><a href="/mobile/html/localMap/localMap.html">내주변통계</a></li>'+
										'<li class="menu01"><a href="/mobile/html/thematicMap/thematicMapMain.html">통계주제도</a></li>'+
										'<li class="menu02"><a href="/mobile/html/interactive/interactiveMap.html">대화형 통계지도</a></li>'+
										'<li class="menu04"><a href="/mobile/html/community/intro.html">통계소통지도</a></li>'+
										'<li class="menu05"><a href="/mobile/html/board/sopIntro.html">알림마당</a>'+
											'<ul>'+
												'<li><a href="/mobile/html/board/sopIntro.html">SGIS 플러스 소개</a></li>'+
												'<li><a href="/mobile/html/board/exp.html">용어설명</a></li>'+
												'<li><a href="/mobile/html/board/notice.html">공지사항</a></li>'+
											'</ul>'+
										'</li>'+
									'</ul>'+
								'</nav>'+
							'</div>'+
							'<div class="Footer">'+
								'<p class="Footermenu"></p>'+
								'<p class="Copyright">ⓒStatistics Korea. All rights reserved.</p>'+
							'</div>'+
							'<a class="Btn_menuclose" href="#">메뉴닫기</a>'+
						'</aside>'+
					'</div>'+
					'<div class="aside_back" style="display:none;"></div>'+
				'</header>'+
			'</div>'
		);
		$(".Btn_menuopen").click(function(){
			$(".aside_back").fadeIn();
			$(".aside").show().animate({
				right: 0
			},500,function(){
				$(".Content").css({
					"height": "100%",
					"max-height": "100%",
					"min-height": $(".aside").outerHeight(true),
					"overflow":"hidden"
				});
			});
		});
		$(".Btn_menuclose,.aside_back").click(function(){
			$(".aside").animate({
				right: -300
			},500,function(){
				$(".Content").attr("style","");
				$(".aside_back").fadeOut();
				$(".aside").hide();
			});
		});
	}
}(window, document));