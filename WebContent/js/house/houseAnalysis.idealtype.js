/**
 * 간편동네찾기
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2016/11/30  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$houseAnalysisMap.idealtype = {
		/**
		 * @name		  : init
		 * @description   : 초기화
		 * @date		  : 2016. 12. 05. 
		 * @author		  : 나광흠
		 * @history 	  :
		 */
		init : function(){
//			$houseAnalysisMap.idealtype.step1init();
			$houseAnalysisMap.idealtype.step2init();
		},
		/**
		 * @name		: step1init
		 * @description : step1 초기화
		 * @date		: 2016. 12. 06. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		step1init : function(){
			$.each($houseAnalysisMap.ui.getUniqName($("#ideal-type-step input[data-type=radio]:checkbox"),"name"),function(cnt,node){
				$("#ideal-type-step input[data-type=radio][name="+node+"]:checkbox:checked").prop("checked",false).trigger("change");
				$("#ideal-type-step input[data-type=radio][name="+node+"][data-default=Y]:checkbox").prop("checked",true).trigger("change");
			});
			$.each($houseAnalysisMap.ui.getUniqName($("#ideal-type-step input:radio"),"name"),function(cnt,node){
				$("#ideal-type-step input[name="+node+"]").prop("checked",false).trigger("change");
				$("#ideal-type-step input[name="+node+"][data-default=Y]").prop("checked",true).trigger("change");
			});
			$.each($houseAnalysisMap.ui.getUniqName($("#ideal-type-step a[data-type=radio]"),"data-name"),function(cnt,node){
				$("#ideal-type-step a[data-name="+node+"][data-default=Y]").trigger("click");
			});
		},
		/**
		 * @name		: step2init
		 * @description : step2 초기화
		 * @date		: 2016. 12. 06. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		step2init : function(){
			$("#ideal-type-dropzone>div").removeClass("M_on").data({
				"id":"",
				"type":"",
				"original-color":"#dddddd"
			}).find(".Text").text("내용");
			$("#ideal-type-puzzle>path").attr("fill","#dddddd");
			$("#ideal-type-search-item-list ul").empty();
		},
		/**
		 * @name		: defaultPuzzleBox
		 * @description : 퍼즐 박스 초기화
		 * @date		: 2016. 12. 05. 
		 * @author		: 나광흠
		 * @history 	:
		 * @param box   : 퍼즐 박스 jquery selector
		 */
		defaultPuzzleBox : function(box){
			box.removeClass("M_on").find(".Text").text("내용");
			$("#ideal-type-step2 li[data-s_class_search_serial="+box.data("s_class_search_serial")+"]").removeClass("M_on");
			box.data({
				"b_class_search_serial":"",
				"m_class_search_serial":"",
				"s_class_search_serial":"",
				"original-color":"#dddddd"
			});
			$("#ideal-type-puzzle>path:eq("+$(box).index()+")").attr("fill","#dddddd");
		},
		/**
		 * @name		: activePuzzleBox
		 * @description : 퍼즐 박스 활성화
		 * @date		: 2016. 12. 05. 
		 * @author		: 나광흠
		 * @history 	:
		 * @param box   : 퍼즐 박스 jquery selector
		 * @param li    : html tag li
		 */
		activePuzzleBox : function(box,li){
			if($houseAnalysisMap.ui.hasText(li.data("b_class_search_serial"))&&$houseAnalysisMap.ui.hasText(li.data("m_class_search_serial"))&&$houseAnalysisMap.ui.hasText(li.data("s_class_search_serial"))){
				$("#ideal-type-dropzone>div").each(function(){
					if($(this).data("s_class_search_serial")===li.data("s_class_search_serial")){
						$houseAnalysisMap.idealtype.defaultPuzzleBox($(this));
					}
				});
				li.addClass("M_on");
				box.addClass("M_on").data({
					"b_class_search_serial":li.data("b_class_search_serial"),
					"m_class_search_serial":li.data("m_class_search_serial"),
					"s_class_search_serial":li.data("s_class_search_serial"),
					"original-color":li.data("color")
				}).children(".Text").text(li.text());
				$("#ideal-type-puzzle>path:eq("+box.index()+")").attr("fill",li.data("color"));
				li.addClass("M_on");
				var activeUniqId = $houseAnalysisMap.ui.getUniqName($("#ideal-type-dropzone>div"),"data-s_class_search_serial");
				$("#ideal-type-search-item-list ul li.M_on").each(function(){
					if(activeUniqId.indexOf($(this).data("s_class_search_serial"))<=-1){
						$("#ideal-type-step2 li[data-s_class_search_serial="+$(this).data("s_class_search_serial")+"]").removeClass("M_on");
					}
				});
			}else{
				$("#ideal-type-puzzle>path:eq("+$(box).index()+")").attr("fill",$(box).data("original-color"));
				messageAlert.open("알림", "지표 설정값이 잘못되어있습니다");
			}
		},
		/**
		 * @name		: setSearchItem
		 * @description : step2에 조건 리스트 생성하기
		 * @date		: 2016. 12. 05. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		setSearchItem : function(){
			$houseAnalysisMap.idealtype.step2init();
			var defaultData = {
				facilities : {
					"data-drag":"true",
					"data-color":"#336699",
					"data-over-color":"rgba(51, 102, 153, 0.3)",
					"data-type":"facilities"
				},
				neighbor : {
					"data-drag":"true",
					"data-color":"#996633",
					"data-over-color":"rgba(153, 102, 51, 0.3)",
					"data-type":"neighbor"
				},
				situation : {
					"data-drag":"true",
					"data-color":"#339966",
					"data-over-color":"rgba(51, 153, 102, 0.3)",
					"data-type":"situation"
				}
			}
			var indicatorArray = [];//등록된 지표 리스트
			$("#ideal-type-step1 a[data-type=radio][data-search-item=true].M_on,#ideal-type-step1 input[data-search-item=true]:checked").each(function(){
				$.each(idealTypeInfoList[$(this).data("parent-id")].children[$(this).data("id")].children,function(cnt,node){
					if(indicatorArray.indexOf(node.b_class_idx_id+node.m_class_idx_id)<=-1){
						indicatorArray.push(node.b_class_idx_id+node.m_class_idx_id);
						$("#"+node.type+"-list").append($("<li/>",$.extend(true,{"data-b_class_search_serial":node.b_class_search_serial,"data-m_class_search_serial":node.m_class_search_serial,"data-s_class_search_serial":node.s_class_search_serial,"text":node.det_exp},defaultData[node.type])));
					}
				});
			});
			
			//검색 조건 퍼즐에 셋팅하는 이벤트 설정
			$("#ideal-type-step2 li[data-drag=true]").draggable({ 
				revert: false, 
				helper: "clone",
				zIndex : 100
			}).dblclick(function(){
				if(!$(this).hasClass("M_on")){
					var emptyBox = $("#ideal-type-dropzone>div:not(.M_on):first");
					if(emptyBox.length>0){
						$houseAnalysisMap.idealtype.activePuzzleBox(emptyBox,$(this));
					}else{
						messageAlert.open("알림", "조회 할수있는 조건은 최대 6개까지입니다");
					}
				}
			}).contextmenu(function(e){
				$(this).trigger("dblclick");
				return false;
			});
			
			$("#ideal-type-step2").show();
			$("#ideal-type-step1").hide();
		}
	}
}(window, document));

