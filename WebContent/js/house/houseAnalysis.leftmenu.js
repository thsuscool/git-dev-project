/**
 * 살고싶은 우리동네 Left 메뉴에 관한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2015/10/19  초기 작성
 * (주)유코아시스템, 1.0, 2015/12/01 디자인 변경으로 안한 수정
 * author : 이기로,나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};

	$houseAnalysisMap.leftmenu = {
		asanSidoCd:"34",//아산시 고유 시도 코드
		asanSggCd:"040",//아산시 고유 시군구 코드
		defaultSidoCd : null,//기본 시도 코드
		defaultSggCd : null,//기본 시군구 코드
		/**
		 * @name         : closeAnimate
		 * @description  : 왼쪽 메뉴 닫기 애니메이션.
		 * @date         : 2015. 10. 08. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param id     : 아이디
		 */
		closeAnimate : function(id){
			var time = 300;
			$("#"+id).removeClass("on");
			if(id == "look-abode"){
				$(".quickBox").stop().animate({"left":"-345"},time);
			}else{
				$(".quickBox").stop().animate({"left":"-478"},time);
			}
		},
		/**
		 * @name              : setSubmitTooltipContent
		 * @description       : 보기 버튼에 tooltip 타이틀과 내용 변경
		 * @date              : 2016. 1. 6. 
		 * @author            : 나광흠
		 * @history           :
		 */
		setSubmitTooltipContent:function(){
			var type,typeId,subject,content;
			if($("#look-abode-box").is(":visible")){
				typeId = "#look-abode-box";
				subject = "주거 현황 보기";
				if($("#look-select-location").is(":checked")){
					content = $("#current-sido-select option:selected").text()+" "+$("#current-sgg-select option:selected").text();
				}else{
					content = "전국";
				}
				if($("#look-select-type").is(":checked")){
					content+=" "+$("#look-abode-box .sub-class.M_on>a").data("text");
				}
				content+=" 보기"
			}else{
				typeId = "#search-recommend-box";
				subject = "추천 지역 찾기";
				content = $("#inter-recommend-sido-select option:selected").text()+" "+$("#inter-recommend-sgg-select option:selected").text();
			}
			$(typeId+" a.submit:visible").attr({"title":content,"data-subj":subject});
		},
		/**
		 * @name              : getSidoList
		 * @description       : 시도리스트
		 * @date              : 2015. 12. 09. 
		 * @author            : 나광흠
		 * @history           :
		 * @param type        : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역
		 * @param defaultSido : 처음 셋팅해줄 시도 코드
		 * @param defaultSgg  : 처음 셋팅해줄 시군구 코드
		 * @param callback    : callback
		 */
		getSidoList: function(type,defaultSido,defaultSgg,callback) {
			$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				data: {
					base_year: $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year
				},
				dataType: "json",
				success: function(res) {
					$("#"+type+"-sido-select").empty();
					if(res.errCd=="0"){
						$("#"+type+"-sido-select").append($("<option/>",{text:"전국",value:"00",selected:(defaultSido=="00"),"data-coor-x":"990480.875","data-coor-y":"1815839.375"}));
						$.each(res.result.sidoList,function(cnt,node){
							if(defaultSido==node.sido_cd){
								$houseAnalysisMap.leftmenu.getSggList(type,node.sido_cd,defaultSgg,callback);
							}
							$("#"+type+"-sido-select").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
						});
						if(!$houseAnalysisMap.ui.hasText(defaultSido)||defaultSido=="00"){
							$houseAnalysisMap.leftmenu.getSggList(type,"00",defaultSgg,callback);
						}
					}else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$houseAnalysisMap.leftmenu.getSidoList(type,defaultSido,defaultSgg,callback);
						});
					}
					$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
				},
				error: function(e) {
					$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
				}
			});
		},
		/**
		 * @name             : $houseAnalysisMap.leftmenu.getSggList
		 * @description      : 시군구리스트
		 * @date             : 2015. 12. 09. 
		 * @author           : 나광흠
		 * @history          :
		 * @param type       : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역 
		 * @param sido_cd    : 시도 코드
		 * @param defaultSgg : 처음 셋팅해줄 시군구 코드
		 * @param callback   : callback
		 */
		getSggList: function(type,sido_cd,defaultSgg,callback) {
			$("#"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				data: {
					sido_cd: sido_cd,
					base_year: $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year
				},
				dataType: "json",
				success: function(res) {
					$("#"+type+"-sgg-select").empty();
					if(res.errCd=="0"){
						$("#"+type+"-sgg-select").append($("<option/>",{text:"전체",value:"999","data-coor-x":"990480.875","data-coor-y":"1815839.375"}));
						if(defaultSgg==="999"){
							$houseAnalysisMap.leftmenu.getStandardAreaList(sido_cd,"999");
						}
						$.each(res.result.sggList,function(cnt,node){
							if(type=="stand-recommend"&&defaultSgg==node.sgg_cd){
								$houseAnalysisMap.leftmenu.getStandardAreaList(sido_cd,node.sgg_cd);
							}
							$("#"+type+"-sgg-select").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
						});
					}else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$houseAnalysisMap.leftmenu.getSggList(type,sido_cd,defaultSgg);
						});
					}
					$("#"+type+"-sgg-select").prop("disabled",false);
					$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#"+type+"-sgg-select").prop("disabled",false);
					$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
				}
			});
		},
		/**
		 * @name          : getStandardAreaList
		 * @description   : 기준지역 지표 중요도설정
		 * @date          : 2015. 12. 09. 
		 * @author        : 나광흠
		 * @history       :
		 * @param sido_cd : 시도 코드
		 * @param sgg_cd  : 시군구 코드
		 */
		getStandardAreaList: function(sido_cd, sgg_cd) {
			if(sido_cd == "00"){
				$("#search-recommend-box .IndexSelect li.sub-class:not(.M_on)").find(".SetStopPoint").css("left", "50%").attr("title","중요도 중");
				$("#search-recommend-box .IndexSelect li.sub-class span.bagic > strong").html(" 중");//기준지역 중요도 표시 
				$("#search-recommend-box .IndexSelect li.sub-class a").data("asis-order","2");//기준지역 중요도 표시 
				$("#search-recommend-box .IndexSelect li.sub-class a").attr("data-asis-order","2");//기준지역 중요도 표시 
			}else{
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/house/standardAreaLists.json",
					data: {
						sido_cd: sido_cd,
						sgg_cd: sgg_cd
					},
					dataType: "json",
					success: function(res) {
						var classList = {};
						$.each(res.result.summaryList, function(cnt, result) {
							classList[result.m_class_idx_id]={};
							classList[result.m_class_idx_id]["order"] = result.order;
							var left = "50%";
							classList[result.m_class_idx_id]["text"] = "중";
							if (result.order == "1") {
								classList[result.m_class_idx_id]["text"] = "하";
								left = "0%";
							} else if (result.order == "3") {
								classList[result.m_class_idx_id]["text"] = "상";
								left = "100%";
							}
							var parent = $("#search-recommend-box .IndexSelect a[data-id='" + result.m_class_idx_id + "']").parent("li");
							//기준지 중요도 표시관련
							parent.find("span.bagic > strong").html(" "+classList[result.m_class_idx_id]["text"]);
							parent.find("a").data("asis-order",result.order);
							parent.find("a").attr("data-asis-order",result.order);
							if(!parent.hasClass("M_on")){
								parent.find(".SetStopPoint").css("left", left).attr("title","중요도 "+classList[result.m_class_idx_id]["text"]);
							}
						});
						$("#search-recommend-box .IndexSelect .sub-class.M_on").each(function(){
							$("#recommend-search-list li[data-id="+$(this).children("a").data("id")+"]").data("asis-order",classList[$(this).children("a").data("id")]["order"]);
							$("#recommend-search-list li[data-id="+$(this).children("a").data("id")+"]").attr("data-asis-order",classList[$(this).children("a").data("id")]["order"]);
						});
					},
					error: function(e) {}
				});
			}
		}
	}
}(window, document));