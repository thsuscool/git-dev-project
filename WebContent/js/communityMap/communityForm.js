/**
 * 통계 소통지도 등록화면
 * 
 * history : (주)유코아시스템, 1.0, 2016/1/12  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	var curAreaSelectId="";
	W.$communityForm = W.$communityForm || {};
	$communityForm = {
		ui:{
			curMapStat: [],
			makers: [],
			/**
			 * @name           : $communityForm.ui.initMap
			 * @description    : 지도 초기화
			 * @date           : 2016. 1. 14. 
			 * @author         : 나광흠
			 * @history        :
			 */
			initMap : function(selectId){ 
				selectId = $communityMapCommon.hasText(selectId)?selectId:"";
				curAreaSelectId = selectId;
				var adm_cd="",center,zoom;
				if($("#sggSelect"+selectId+"").val()!="999"){
					if($("#emdongSelect").val()!="00"){
						center = [$("#emdongSelect"+selectId+" option:selected").data("coor-x"),$("#emdongSelect"+selectId+" option:selected").data("coor-y")];
						zoom=10;
						adm_cd = $("#sidoSelect"+selectId).val()+$("#sggSelect"+selectId).val()+$("select[id^=emdongSelect]:last").val();
					}else{
						center = [$("#sggSelect"+selectId+" option:selected").data("coor-x"),$("#sggSelect"+selectId+" option:selected").data("coor-y")];
						zoom=6;
						adm_cd = $("#sidoSelect"+selectId).val()+$("#sggSelect"+selectId+"").val();
					}
				}else{
					center = [$("#sidoSelect"+selectId+" option:selected").data("coor-x"),$("#sidoSelect"+selectId+" option:selected").data("coor-y")];
					if($("#sidoSelect"+selectId).val()!="00"){
						zoom=4;
						adm_cd = $("#sidoSelect"+selectId).val();
					}else{
						zoom=2;
					}
				}
				$communityMap.ui.curAdmCd = adm_cd;
				$communityMap.ui.curCenter = center;
				$communityMap.ui.curZoom = zoom;
				$communityMap.ui.mapList[$communityMap.ui.curMapId].mapMove(center,zoom);
				var setmarkers;
				if($communityMap.ui.mydataMarkers.length>0){
					setmarkers = function(){
						$.each($communityMap.ui.mydataMarkers,function(cnt,node){
							node.addTo($communityMap.ui.mapList[$communityMap.ui.curMapId].gMap);
						});
					};
				}
				
				if($communityForm.ui.curMapStat.length>0){
					$communityMap.ui.setStats($communityForm.ui.curMapStat[$communityForm.ui.curMapStat.length-1]);
				}else{
					$communityMap.ui.doClearMap(setmarkers);
				}
			},
			/**
			 * @name                 : getSidoList
			 * @description          : 시도리스트
			 * @date                 : 2015. 12. 9. 
			 * @author               : 나광흠
			 * @history              :
			 * @param defaultSido    : 처음 셋팅해줄 시도 코드
			 * @param defaultSgg     : 처음 셋팅해줄 시군구 코드
			 * @param defaultEmdong  : 처음 셋팅해줄 읍면동 코드
			 */
			getSidoList : function(defaultSido,defaultSgg,defaultEmdong,id) {
				id = id?id:"";
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
					data: {
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						$("#sidoSelect"+id).empty();
						if(res.errCd=="0"){
							$("#sidoSelect"+id).append($("<option/>",{text:"전국",value:"00",selected:(!defaultSido),"data-coor-x":"989674","data-coor-y":"1818313"}));
							$.each(res.result.sidoList,function(cnt,node){
								if(defaultSido==node.sido_cd){
									$communityForm.ui.getSggList(node.sido_cd,defaultSgg,defaultEmdong,id);
								}
								$("#sidoSelect"+id).append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$communityForm.ui.getSidoList(defaultSido,defaultSgg,defaultEmdong);
							});
						}
					},
					error: function(e) {
					}
				});
			},
			/**
			 * @name                : getSggList
			 * @description         : 시군구리스트
			 * @date                : 2015. 12. 9. 
			 * @author              : 나광흠
			 * @history             :
			 * @param sido_cd       : 시도 코드
			 * @param defaultSgg    : 처음 셋팅해줄 시군구 코드
			 * @param defaultEmdong : 처음 셋팅해줄 읍면동 코드
			 */
			getSggList : function(sido_cd,defaultSgg,defaultEmdong,id) {
				id = id?id:"";
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
					data: {
						sido_cd: sido_cd,
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						$("#sggSelect"+id).empty();
						if(res.errCd=="0"){
							$("#sggSelect"+id).append($("<option/>",{text:"전체",value:"999","data-coor-x":"989674","data-coor-y":"1818313"}));
							$.each(res.result.sggList,function(cnt,node){
								if(defaultSgg==node.sgg_cd){
									$communityForm.ui.getEmdongList(sido_cd,node.sgg_cd,defaultEmdong,id)
								}
								$("#sggSelect"+id).append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$communityForm.ui.getSggList(sido_cd,defaultSgg,id);
							});
						}
					},
					error: function(e) {
					}
				});
			},
			/**
			 * @name                : getEmdongList
			 * @description         : 시군구리스트
			 * @date                : 2015. 12. 9. 
			 * @author              : 나광흠
			 * @history             :
			 * @param sido_cd       : 시도 코드
			 * @param sgg_cd        : 시군구 코드
			 * @param defaultEmdong : 처음 셋팅해줄 시군구 코드
			 */
			getEmdongList : function(sido_cd,sgg_cd,defaultEmdong,id){
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/admAddressList.json",
					data: {
						sido_cd : sido_cd,
						sgg_cd: sgg_cd,
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						$("#emdongSelect"+id).empty();
						if(res.errCd=="0"){
							$("#emdongSelect"+id).append($("<option/>",{text:"전체",value:"00","data-coor-x":"989674","data-coor-y":"1818313"}));
							$.each(res.result.admList,function(cnt,node){
								$("#emdongSelect"+id).append($("<option/>",{text:node.emdong_nm,value:node.emdong_cd,selected:(defaultEmdong==node.emdong_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$communityForm.ui.getEmdongList(sido_cd,defaultEmdong,id);
							});
						}
					},
					error: function(e) {
					}
				});
			},
			/**
			 * @name        : setThemeImage
			 * @description : 테마 이미지 셋팅
			 * @date        : 2016. 10. 20. 
			 * @author      : 나광흠
			 * @history     :
			 * @param cd    : 테마 코드
			 * @param isOn  : M_on 여부
			 */
			setThemeImage : function(cd,isOn){
				var imageName = cd;
				if(/^700(5|6|7)$/.test(cd)){
					imageName = "7001";
				}
				var item = $("#theme-list input[name=itemPoi][value="+cd+"]");
				item.parents(".group").find(".current-theme-list").append(
					$("<img/>",{
						"src":contextPath+"/img/ico/ico_"+imageName+".png",
						"data-id":item.val(),
						"title":item.data("title"),
						"class":isOn===true?"M_on":""
					}).tooltip({position: {my: "left0 top-8", at: "right top"}})
				);
			},
			/**
			 * @name           : setSelectList
			 * @description    : 선택한 항목에 추가해주기
			 * @date           : 2016. 11. 2. 
			 * @author         : 나광흠
			 * @history        :
			 * @param element  : jquery selector
			 * @param name     : input name
			 */
			setSelectList : function(element,name){
				var spanColor,textWidth;
				if(name==="itemPoi"){
					spanColor = "background: #3db78b;border: #399790 solid 1px;";
					textWidth = "width: 128px;"
					cn = "테마";
				}else if(name==="mydata"){
					spanColor = "background: #c2c851;border: #ada65b solid 1px;";
					textWidth = "width: 123px;"
					cn = "나의데이터";
				}else if(name==="stats"){
					spanColor = "background: #28425b;border: #1c3349 solid 1px;";
					textWidth = "width: 140px;";
					cn = "색지도";
				}
				var li = $("<li/>",{"data-type":name,"data-id":element.val()}).append(
					$("<button/>",{"type":"button","class":"delete","data-id":element.val(),"title":"삭제"}).click(function(){
						var id = $(this).data("id");
						$communityMapCommon.confirm(
							"알림","삭제하시겠습니까?",[{
								title : "확인",
								func : function(opt) {
									$("input[name="+name+"][value="+id+"]").prop("checked",false).trigger("change");
								}
							},{title : "취소"}   
						]);
					}),
					$("<span/>",{"text":cn,"style":"position: relative;font-size: 8px;color: #fff;border-radius: 5px;padding: 2px 5px;margin-right: 5px;"+spanColor}),
					$("<span/>",{"text":element.data("title"),"style":"position: relative;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;vertical-align: middle;"+textWidth})
				);
				if(name==="itemPoi"){
					var imageName = element.val();
					if(/^700(5|6|7)$/.test(element.val())){
						imageName = "7001";
					}
					li.append($("<img/>",{
						"src":contextPath+"/img/ico/ico_"+imageName+".png",
						"title":element.data("title"),
						"style":"margin: 5px 0 0 5px ;width: 15px;height: 15px;float:right;"
					}));
				}
				$("#select-list").append(li);
				if(typeof callback === "function"){
					callback(li);
				}
			}
		}
	};
	

	$communityForm.event = {	
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 1. 12. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			//툴팁 생성
			$("#choose-file-button").tooltip({
				position: {my: "right+100 top-40", at: "right top"}
			});
			$("#grant-helper").tooltip({
				open : function(event,ui){
					ui.tooltip.css("max-width","1000px");
				}
			});
			$("#add-symbol-button").tooltip({
				position: {my: "right+100 top+30", at: "right top"}
			});
			$("#init-map-intro-tooltip").tooltip("destroy");$("#init-map-intro-tooltip").tooltip({
				position: {my: "right+120 top-60", at: "right top"}
			});
			$("#map-year-helper").text(map.bnd_year+"년 기준");
			
			//datepicker 시작
			$("#startDate,#endDate").datepicker({
				dateFormat : "yy.mm.dd",
				showButtonPanel : true,
				dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
				monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
				monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
				changeYear : true,
				changeMonth : true,
				onSelect:function (value, element){
					if(element.id=="startDate"){
						$("#endDate").datepicker("option", "minDate", value);
					}else{
						$("#startDate").datepicker("option", "maxDate", value);
					}
				}
			});
			if($("#startDate").val().replace(/ /gi,"")!=""){
				$("#endDate").datepicker("option", "minDate", $("#startDate").val());
			}
			if($("#endDate").val().replace(/ /gi,"")!=""){
				$("#startDate").datepicker("option", "maxDate", $("#endDate").val());
			}
			$('#s_DateIcon').click(function(){
				$('#startDate').datepicker("show");
			});
			$('#e_DateIcon').click(function(){
				$('#endDate').datepicker("show");
			});
			//datepicker 종료
			
			//메인 이미지 변경 이벤트
			$("#fileSearch").change(function(){
				var inputFile = $(this);
				$("input[name=fileSearchSample]").val(null);
				if (window.FileReader) {
					if(!this.files[0].type.match(/image\//)){
						$communityMapCommon.alert("알림","이미지 파일만 등록할 수 있습니다");
						$("#imageView").css({"background-image":""});
						$("#fileSearch,#filePathField").val(null);
		            	return;
		            }
					var reader = new FileReader();
					reader.onload = function(e){
						$("#imageView").css({"background-image":"url("+e.target.result+")"});
						$("#filePathField").val(inputFile[0].files[0].name);
						$("#main-image-sample>li").removeClass("M_on");
					}
					reader.readAsDataURL(this.files[0]);
				}
			});
			
			//메인 샘플 이미지 선택 이벤트
			$("#main-image-sample a").click(function(){
				$("#fileSearch").val(null);
				$("#imageView").css({"background-image":$(this).css("background-image")});
				$("input[name=fileSearchSample]").val($(this).data("id"));
				$("#filePathField").val("샘플 이미지.png");
				$("#main-image-sample>li").removeClass("M_on");
				$(this).parent("li").addClass("M_on");
				return false;
			});
			
			//초기 지역 셀렉트 박스 설정
			$communityForm.ui.getSidoList(defaultSido,defaultSgg,defaultEmdong);
			
			//지역 추가 버튼 클릭 이벤트
			$("#add-area-button").click(function(){
				createArea();
				return false;
			});
			
			//지역 삭제 버튼 클릭 이벤트
			$("body").on("click",".area-delete-button",function(){
				$(this).parents("div[id^=add-area-list-box]").remove();
				$communityForm.ui.initMap();
				return false;
			});
			
			//시도 선택시
			$("body").on("change","select[id^=sidoSelect]",function(){
				$communityForm.ui.getSggList($(this).val(),"","",$(this).data("id"));
				$communityForm.ui.initMap($(this).data("id"));
			});
			
			//시군구 선택시
			$("body").on("change","select[id^=sggSelect]",function(){
				$communityForm.ui.getEmdongList($("#sidoSelect"+$(this).data("id")).val(),$(this).val(),"",$(this).data("id"));
				$communityForm.ui.initMap($(this).data("id"));
			});
			
			//읍면동 선택시
			$("body").on("change","select[id^=emdongSelect]",function(){
				$communityForm.ui.initMap($(this).data("id"));
			});
			
			//의견 등록 참여방법 div 클릭 이벤트
			$("#grant-type>div").click(function(){
				if(!$(this).parents("tr").hasClass("disabled")){
					$(this).find("input[name=grant_yn]").prop("checked",true).trigger("change");
					$("#grant-type>div").removeClass("M_on");
					$(this).addClass("M_on");
				}
			});
			
			//승인된 소통지도 구성원만 의견등록 가능한 라디오 버튼 이벤트
			$("input[name=grant_yn_s]:radio,#grant-type>.type3>ul>li label").click(function(){
				if($(this).parents("tr").hasClass("disabled")){
					return false;
				}
			});
			$("input[name=grant_yn]:radio").change(function(){
				if($("input[name=grant_yn]:radio:checked").val()==="P"){
					$("#pwdyn").val("Y");
				}else{
					$("#pwdyn").val("N");
				}
			});
			$("input[name=grant_yn_s]:radio").change(function(){
				if(!$(this).parents("tr").hasClass("disabled")){
					$("#grant_yn_s").val($(this).val()).trigger("change");
					$("#grant_yn_s_face").removeClass("type3_1 type3_2 type3_3").addClass("type3_"+($(this).parents("li").index()+1));
				}else{
					return false;
				}
			});
			
			//비밀번호 클릭 또는 포커스 이벤트
			$("#pwdchk").on("focus click",function(){
				if(!$(this).parents("tr").hasClass("disabled")){
					$("input[name=grant_yn_s][value=P]").prop("checked",true).trigger("change");
				}
			});
			
			//비밀번호 변경 버튼 클릭시
			$("#change-password-button").click(function(){
				$("#pwdchk").val(null);
				$(this).hide();
				$("#pwdchk,#change-password-cancel-button").show();
				$("#pwdyn").val("Y");
			});
			
			//비밀번호 변경 취소 버튼 클릭시
			$("#change-password-cancel-button").click(function(){
				$("#pwdchk").val(null);
				$("#pwdchk,#change-password-cancel-button").hide();
				$("#change-password-button").show();
				$("#pwdyn").val("N");
			});
			
			$(".i_box_choose>input[name=symbol]:radio").change(function(){
				if(!$("#symbol-box").parents("tr").hasClass("disabled")){
					$(this).parents(".i_box_cont").children(".i_box_choose").addClass("disabled").find("input:text").prop("disabled",true);
					$(this).parent(".i_box_choose").removeClass("disabled").find("input:text").prop("disabled",false);
				}else{
					if(communityMapInfo!=null){
						var symbol;
						if($communityMapCommon.hasText(communityMapInfo.reg_symbol)){
							symbol = communityMapInfo.reg_symbol;
						}else if($communityMapCommon.hasText(communityMapInfo.custom_symbol_group_id)){
							symbol = communityMapInfo.custom_symbol_group_id;
						}else{
							return false;
						}
						$("input[name=symbol][value="+symbol+"]:radio").prop("checked",true);
					}
				}
			})
			//심볼 탭 이벤트
			$("#symbol-tab a").click(function(){
				var radio="";
				if(!$("#symbol-box").parents("tr").hasClass("disabled")){
					$("#symbol-tab>li,#symbol-box>div").removeClass("M_on");
					$(this).parent("li").addClass("M_on");
					var div = $("#symbol-box>div:eq("+$(this).parent("li").index()+")");
					div.addClass("M_on");
					$("#symbol-box>div input").not($(".i_box5 .i_box_cont input")).not("input:radio").prop("disabled",true);
					if(div.is($(".i_box4"))){
						$("input[data-id^=symbol-d-]:checkbox").each(function(){
							$(this).prop("disabled",false).parents("li").find("input[name=iconSetRadioName]").prop("disabled",!$(this).is(":checked"));
						});
						if($("input[data-id^=symbol-d-]:checkbox:checked").length<=0){
							$("input[data-id^=symbol-d-]:checkbox:first").prop("checked",true);
						}
					}else if(div.is($(".i_box5"))){
						$(".i_box5 .i_box_cont").removeClass("M_on");
						$(".i_box5 .i_box_cont.i_box_list").addClass("M_on");
						if(communityMapInfo==null||communityMapInfo.reg_symbol){
							radio = ":first";
						}else{
							radio = "[value="+communityMapInfo.custom_symbol_group_id+"]";
						}
					}else{
						div.find(".i_box_choose").addClass("disabled");
						div.find(".i_box_choose:first").removeClass("disabled").find("input").prop("disabled",false);
						radio = ":first";
					}
					div.find("input[name=symbol]:radio"+radio).prop("checked",true).trigger("change");
				}
				return false;
			});
			
			//d타입 아이콘 체크박스 이벤트
			$("input[data-id^=symbol-d-]:checkbox").change(function(){
				if($(this).is(":checked")){
					if($("input[data-id^=symbol-d-]:checkbox:checked").length<=5){
						$(this).parents("li").find("input[name=iconSetRadioName]").prop("disabled",false);
					}else{
						$communityMapCommon.alert("알림","사용자 선택 아이콘은 최대 5개까지 등록이 가능합니다");
						$(this).prop("checked",false);
					}
				}else{
					$(this).parents("li").find("input[name=iconSetRadioName]").prop("disabled",true);
				}
			});
			
			//사용자 정의 아이콘 리스트 생성
			getCustomSymbolGroupList(defaultCustomSymbolGroupId);
			
			//사용자 정의 아이콘 만들기 버튼 이벤트
			$("#create-custom-icon-button").click(function(){
				emptyCreateBox();
				$(".i_box5 .i_box_cont").removeClass("M_on");
				$(".i_box5 .i_box_cont.i_box_make").addClass("M_on");
			});
			
			//사용자 정의 아이콘 이미지 파일 추가 이벤트
			$("#choose-file-button").click(function(){
				$("#choose-file-button").tooltip("close");
				if(($("#file-list").children("input:file").length-1)>=5){
					$communityMapCommon.alert("알림","최대 5개까지 등록이 가능합니다");
				}else{
					$("#file-list input:file:last").click();
				}
			});
			//사용자 정의 아이콘 이미지 파일 추가 이벤트
			$("#add-symbol-button").click(function(){
				$("#add-symbol-button").tooltip("close");
				if(($("#add-symbol-list").children("input:file").length-1)>=5){
					$communityMapCommon.alert("알림","최대 5개까지 등록이 가능합니다");
				}else{
					$("#add-symbol-list input:file:last").click();
				}
			});
			
			//파일 추가 이벤트
			$("#file-list,#add-symbol-list").on("change","input:file",function(){
				var list = null,parentName = null;
				if($(this).parents("#file-list").length>0){
					list = $("#file-list");
					parentName = ".i_box5 .i_box_make"; 
				}else if($(this).parents("#add-symbol-list").length>0){
					list = $("#add-symbol-list");
					parentName = ".i_box5 .i_box_modify"; 
				}else{
					return false;
				}
				var inputFile = $(this);
				if (window.FileReader) {
					var reader = new FileReader();
					reader.onload = function(e){
						var stamp = makeStamp(new Date());
						$(inputFile).attr("id",$(inputFile).attr("name")+stamp);
						list.append($("<input/>",{"type":"file","name":"customSymbolFile","style":"display:none;"}));
						$(parentName+" .i_icon_list").append(
							$("<li/>",{id:"preview-"+stamp}).append(
								$("<button/>",{"class":"i_btn_delete","type":"button","text":"아이콘삭제"}).click(function(){
									$("#preview-"+stamp+",#customSymbolFile"+stamp).remove();
								}),
								$("<label/>").append($("<span/>").append($("<img/>",{"src":e.target.result,"style":"width:23px;height:28px;"}))),
								$("<input/>",{"type":"text","value":"아이콘"})
							)
						);
					}
					reader.readAsDataURL(this.files[0]);
				}
			});
			
			//아이콘 그룹 추가 버튼 이벤트
			$("#create-button").click(function(){
				var abs = new sop.portal.absAPI();
				abs.onBlockUIPopup();
				var emptyName = false;
				var formData = new FormData();
				$.each($(".i_box_make .i_icon_list input:text"),function(cnt,node){
					formData.append("customSymbolName", $(node).val());
					if($(node).val().replace(/ /gi,"")==""){
						emptyName = true;
					}
				});
				if($(".i_box5>.i_box_make input[name=custom_symbol_group_nm]").val().replace(/ /gi,"")==""){
					$communityMapCommon.alert("알림","그룹 명을 등록해주세요");
					abs.onBlockUIClose();
				}else if($("#file-list input:file:not(:last)").length<=0){
					$communityMapCommon.alert("알림","아이콘을 등록해주세요");
					abs.onBlockUIClose();
				}else if(emptyName){
					$communityMapCommon.alert("알림","라벨을 입력해주세요");
					abs.onBlockUIClose();
				}else{
					var firstImage = $(".i_box_make .i_icon_list>li:first img").attr("src");
					formData.append("custom_symbol_group_nm", $(".i_box5>.i_box_make input[name=custom_symbol_group_nm]").val());
					$.each($("#file-list input:file:not(:last)"),function(cnt,node){
						formData.append("customSymbolFile", $(node)[0].files[0]);
					});
					$.ajax({
						url: contextPath+"/ServiceAPI/community/communityCustomSymbolGroupRegist.json",
						data: formData,
						processData: false,
						contentType: false,
						async: true,
						type: 'POST',
						success: function(res) {
							if(res.errCd=="0"){
								emptyCreateBox();
								getCustomSymbolGroupList(res.result.custom_symbol_group_id);
								$(".i_box5 .i_box_cont").removeClass("M_on");
								$(".i_box5 .i_box_cont.i_box_list").addClass("M_on");
							}else{
								$communityMapCommon.alert("알림", res.errMsg);
							}
							abs.onBlockUIClose();
						},
						error: function(data){
							$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
							abs.onBlockUIClose();
							return false;
						}
					});
				}
			});
			
			//아이콘 그룹 수정 버튼 이벤트
			$("#modify-symbol-group-button").click(function(){
				var abs = new sop.portal.absAPI();
				abs.onBlockUIPopup()
				var emptyName = false;
				$.each($(".i_box_modify .i_icon_list input:text"),function(cnt,node){
					if($(node).val().replace(/ /gi,"")==""){
						emptyName = true;
					}
				});
				if($(".i_box5>.i_box_modify input[name=custom_symbol_group_nm]").val().replace(/ /gi,"")==""){
					$communityMapCommon.alert("알림","그룹 명을 등록해주세요");
					abs.onBlockUIClose();
				}else if(emptyName){
					$communityMapCommon.alert("알림","라벨을 입력해주세요");
					abs.onBlockUIClose();
				}else{
					var formData = new FormData();
					var firstImage = $(".i_box_modify .i_icon_list>li:first img").attr("src");
					formData.append("custom_symbol_group_nm", $(".i_box5>.i_box_modify input[name=custom_symbol_group_nm]").val());
					formData.append("custom_symbol_group_id", $(".i_box5>.i_box_modify").data("id"));
					$.each($(".i_box_modify .i_icon_list input[name=modyfy_custom_symbol_id]"),function(cnt,node){
						formData.append("modifyCustomSymbolId", $(node).val());
					});
					$.each($(".i_box_modify .i_icon_list input[name=modyfy_label_nm]"),function(cnt,node){
						formData.append("modifyCustomSymbolName", $(node).val());
					});
					$.each($(".i_box_modify .i_icon_list input:text").not($(".i_box_modify .i_icon_list input[name=modyfy_label_nm]")),function(cnt,node){
						formData.append("customSymbolName", $(node).val());
					});
					$.each($("#add-symbol-list input:file:not(:last)"),function(cnt,node){
						formData.append("customSymbolFile", $(node)[0].files[0]);
					});
					$.each($("#delete-symbol-list input:hidden"),function(cnt,node){
						formData.append("deleteSymbolId", $(node).val());
					});
					if($communityMapCommon.getParameter("cmmnty_map_id")){
						formData.append("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
					}
					$.ajax({
						url: contextPath+"/ServiceAPI/community/communityCustomSymbolGroupModify.json",
						data: formData,
						processData: false,
						contentType: false,
						async: true,
						type: 'POST',
						success: function(res) {
							if(res.errCd=="0"){
								emptyModifyBox();
								getCustomSymbolGroupList();
								$(".i_box5 .i_box_cont").removeClass("M_on");
								$(".i_box5 .i_box_cont.i_box_list").addClass("M_on");
							}else{
								$communityMapCommon.alert("알림", res.errMsg);
							}
							abs.onBlockUIClose();
						},
						error: function(data){
							$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
							abs.onBlockUIClose();
							return false;
						}
					});
				}
			});
			
			//아이콘 그룹 삭제 버튼 이벤트
			$("#remove-symbol-group-button").click(function(){
				$communityMapCommon.confirm(
					"알림","삭제하시겠습니까?",[{
						title : "확인",
						func : function(opt) {
							$.ajax({
								url: contextPath+"/ServiceAPI/community/communityCustomSymbolGroupDelete.json",
								data:{
									custom_symbol_group_id : $(".i_box5>.i_box_modify").data("id")
								},
								async: true,
								type: 'POST',
								dataType: "json",
								success: function(res) {
									if(res.errCd=="0"){
										if(res.result.success){
											getCustomSymbolGroupList();
											$(".i_box5 .i_box_cont").removeClass("M_on");
											$(".i_box5 .i_box_cont.i_box_list").addClass("M_on");
										}else{
											$communityMapCommon.alert("알림", "삭제를 실패하였습니다");
										}
									}else{
										$communityMapCommon.alert("알림", res.errMsg);
									}
								},
								error: function(data){
									$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
									return false;
								}
							});
						}
					},{title : "취소"}   
				]);
			});
			
			//지도 위에 있는 메뉴 컨트롤 이벤트
			$("#menu-control-button").click(function(){
				if($(this).parent(".cm_make_map").hasClass("open")){
					$(this).parent(".cm_make_map").removeClass("open").addClass("close");
					$(this).children("img").attr({
						"src":contextPath+"/img/community/cm_make_map_open.png",
						"alt":"닫기"
					});
				}else{
					$(this).parent(".cm_make_map").removeClass("close").addClass("open");
					$(this).children("img").attr({
						"src":contextPath+"/img/community/cm_make_map_close.png",
						"alt":"열기"
					});
				}
				return false;
			});
			
			//기본POI 탭 이벤트
			$("#poi-tab a").click(function(){
				$("#poi-tab>li").removeClass("M_on");
				$(this).parent("li").addClass("M_on");
				$("#mydata-list,#theme-list").hide();
				$("#"+$(this).data("id")).show();
				return false;
			});
			
			//색지도 체크박스 변경 이벤트
			$("body").on("change","input[name=stats]:checkbox",function(){
				if($(this).is(":checked")){
					if($("input[name=stats]:checkbox:checked").length>5){
						$communityMapCommon.alert("알림", "색지도통계는 최대 5개까지 선택 가능합니다");
						$(this).prop("checked",false);
						return false;
					}else{
						$communityForm.ui.curMapStat.push($(this).val());
						$communityForm.ui.setSelectList($(this),"stats");
					}
				}else{
					$("#select-list li[data-type=stats][data-id="+$(this).val()+"]").remove();
					var index = $communityForm.ui.curMapStat.indexOf($(this).val());
					if(index>-1){
						$communityForm.ui.curMapStat.splice(index,1);
					}
				}
				$communityForm.ui.initMap(curAreaSelectId);
			});
			
			//mydata 체크박스 변경 이벤트
			$("input[name=mydata]:checkbox").change(function(){
				$("#select-list>li[data-type=mydata]").remove();
				if($(this).is(":checked")){
					$("input[name=mydata]:checkbox").prop("checked",false);
					$(this).prop("checked",true);
					$communityMapApi.request.getMyData($(this).val())
					$communityForm.ui.setSelectList($(this),"mydata");
					if($("#theme-list .current-theme-list>img.M_on").length>0){
						$communityMap.ui.getCompanyPoi($("#theme-list .current-theme-list>img.M_on").data("id"));
					}
				}else{
					$.each($communityMap.ui.mydataMarkers,function(cnt,node){
						node.remove();
					});
					$communityMap.ui.mydataMarkers = [];
				}
	    	});
			
			//임시저장
			$("#temp-submit").click(function(){
				if( $("#cmmnty_map_nm").val() == undefined || $("#cmmnty_map_nm").val().replace(/ /gi,"") ==''|| $("#cmmnty_map_nm").val() == null){
					$communityMapCommon.alert("알림", "맵이름을 입력하세요",function(){
						$("#cmmnty_map_nm").focus();
					});
					return false;	
				}else{
					$("#community-form input[name=temp]").remove();
					$("#community-form").append($("<input/>",{"name":"temp","value":"Y","type":"hidden"}));
					$("#community-form").trigger("submit");
				}
			});
			
			//임시저장 삭제 버튼 이벤트
			$("#temp-delete-submit").click(function(){
				$communityMapCommon.confirm(
					"알림","삭제하시겠습니까?",[{
						title : "확인",
						func : function(opt) {
							var obj = new sop.portal.communityTempDelete.api();			
							obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
							obj.request({
								method: "POST",
								async: false,
								url: contextPath + "/ServiceAPI/community/communityClose.json"
							});
						}
					},{title : "취소"}   
				]);
			});
			
			//개설 완료 이벤트
			$("#community-form").heumValidation({isReturnCallback:true},function(errors){
				var errorArray = new Array();
				if(errors){
					errorArray = errors;
				}
				if($("input[name=temp]").val()!=="Y"&&(communityMapInfo==null||(communityMapInfo!=null&&!$communityMapCommon.hasText(communityMapInfo.path_nm)))){
					if($("#fileSearch")[0].files.length<=0&&!$communityMapCommon.hasText($("input[name=fileSearchSample]").val())){
						errorArray.push({
							element : $("#fileSearch"),
							message : "메인이미지를 등록하거나 샘플 이미지를 선택해주세요"
						});
					}
				}
				if($("#kwrd").val().replace(/ /gi,"")!=""){
					if($("#kwrd").val().split(",").length>5){
						errorArray.push({
							element : $("#kwrd"),
							message : "키워드 최대 5개까지 작성하실 수 있습니다"
						});
					}else{
						$.each($("#kwrd").val().split(","),function(cnt,node){
							if(node.length>15){
								errorArray.push({
									element : $("#kwrd"),
									message : "키워드 하나당 최대 15자까지 작성하실 수 있습니다"
								});
								return false;
							}
						});
					}
				}
				if($("input[name=symbol]:checked").length<=0){
					errorArray.push({
						element : $("input[name=symbol]"),
						message : "아이콘을 선택해주세요"
					});
				}else{
					if($("input[name=symbol]:checked").val()=="d"&&$("input[name=iconSetRadio][data-id^=symbol-d]:checkbox:checked").length>5){
						errorArray.push({
							element : $("input[name=iconSetRadio][data-id^=symbol-d]:checkbox:first"),
							message : "사용자 선택 아이콘은 최대 5개까지 등록 가능합니다"
						});
					}
				}
				if($("#pwdyn").val()=="Y"&&$("#pwdchk").val().replace(/ /g, '') == ""){
					errorArray.push({
						element : $("#pwdchk"),
						message : "비밀번호를 입력해주세요."
					});
				}
				var admCdArray = [$("#sidoSelect").val()+$("#sggSelect").val()+$("#emdongSelect").val()];
				$("#add-area-list").children().each(function(cnt,node){
					var sido = $(node).find("select[id^=sidoSelect]").val();
					var sgg = $(node).find("select[id^=sggSelect]").val();
					var emdong = $(node).find("select[id^=emdongSelect]").val();
					if(admCdArray.indexOf(sido+sgg+emdong)>-1){
						errorArray.push({
							element : $("#add-area-list select[id^=sidoSelect]:first"),
							message : "중복된 지역이 존재합니다."
						});
						return false;
					}else{
						admCdArray.push(sido+sgg+emdong);
					}
				});
				if($("input[name=stats]:checkbox:checked").length>5){
					errorArray.push({
						element : $("input[name=stats]:first"),
						message : "색지도통계는 최대 5개까지 선택 가능합니다"
					});
				}
				if($("input[name=mydata]:checked").length>1){
					errorArray.push({
						element : $("input[name=mydata]"),
						message : "나의데이터는 하나만 등록하실 수 있습니다"
					});
				}
				if($("input[name=itemPoi]:checkbox:checked").length>4){
					errorArray.push({
						element : $("input[name=itemPoi]:first"),
						message : "테마는 최대 4개까지 선택 가능합니다"
					});
				}
				if(errorArray.length>0){
					var labelName = "";
					if($(errorArray[0].element).data("error-message")){
						labelName = $(errorArray[0].element).data("error-message");
					}
					$communityMapCommon.alert("알림", labelName+errorArray[0].message,function(){
						$(errorArray[0].element).focus();
					});
					$(errorArray[0].element).focus();
					return false;
				}else{
					var formData = new FormData();
					var excludeData = ["grant_yn_s","custom_symbol_group_nm"];
					$("#history-menu-box [name],.i_box_cont.i_box_make [name],.i_box_cont.i_box_modify [name]").each(function(cnt,node){
						excludeData.push($(node).attr("name"));
					});
					$.each($("#community-form").serializeArray(),function(cnt,node){
						if(excludeData.indexOf(node.name)<=-1&&$communityMapCommon.hasText(node.value)){
							formData.append(node.name,node.value);
						}
					});
					if(!$communityMapCommon.hasText($("input[name=fileSearchSample]").val())){
						formData.append("fileSearch", $("#fileSearch")[0].files[0]);
					}
						
					if($communityMapCommon.getParameter("cmmnty_map_id")){
						formData.append("cmmnty_map_id",$communityMapCommon.getParameter("cmmnty_map_id"));
					}
					var abs = new sop.portal.absAPI();
					abs.onBlockUIPopup();
					$.ajax({
						url: contextPath+"/ServiceAPI/community/communityCreate.json",
						data: formData,
						processData: false,
						contentType: false,
						async: true,
						type: 'POST',
						success: function(res) {
							abs.onBlockUIClose();
							if(res.errCd=="0"){
								$communityMapCommon.alert("알림","등록되었습니다",function(){
									if($communityMapCommon.hasText($("input[name=temp]").val())&&$("input[name=temp]").val()=="Y"){
										var addQuery = $communityMapCommon.addQuery(["cmmnty_map_id"]);
										if($communityMapCommon.hasText(addQuery)&&/^&/.test(addQuery)){
											addQuery = "?"+addQuery.replace(1,addQuery.length);
										}
										location.href=contextPath+"/view/community/intro"+addQuery
									}else{
										location.href=contextPath+"/view/community/view?cmmnty_map_id="+res.result.cmmnty_map_id+$communityMapCommon.addQuery(["cmmnty_map_id"])
									}
								});
							}else{
								$communityMapCommon.alert("알림",res.errMsg);
							}
						},
						error: function(xhr, status, errorThrown) {
							abs.onBlockUIClose();
							if(errorThrown=="Precondition Failed"){
								$communityMapCommon.alert("알림","조건이 잘못되었습니다");
							}else{
								$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.");
							}
						}
					});
				}
				return false;
			});
			//테마 트리 토글
			$("#theme-list .group>.parent").click(function(e){
				if(!$(e.target).is("img")){
					$(this).parent("li").toggleClass("M_on");
				}
			});
			//테마 체크박스 변경 이벤트
			$("#theme-list input[name=itemPoi]:checkbox").change(function(){
				if($("#theme-list input[name=itemPoi]:checkbox:checked").length>4){
					$communityMapCommon.alert("알림","테마는 최대 4개까지 선택 가능합니다");
					$(this).prop("checked",false);
					return false;
				}else{
					$(".current-theme-list img[data-id]").removeClass("M_on");
					if($(this).is(":checked")){
						var cd = $(this).val();
						$communityMap.ui.getCompanyPoi($(this).val());
						$communityForm.ui.setThemeImage($(this).val());
						$(".current-theme-list img[data-id="+$(this).val()+"]").addClass("M_on");
						$communityForm.ui.setSelectList($(this),"itemPoi");
					}else{
						$("#select-list li[data-type=itemPoi][data-id="+$(this).val()+"]").remove();
						$(".current-theme-list>img[data-id="+$(this).val()+"]").remove();
						var poiControl = map.mapBtnInfo;
						poiControl.isShow = false;
						$("#poi-list a").removeClass("M_on");
				    	poiControl.clearPOI();
				    	var poiFirst = $("input[name=itemPoi]:checkbox:checked:first");
				    	if(poiFirst.length>0){
				    		$(".current-theme-list img[data-id="+poiFirst.val()+"]").addClass("M_on");
				    		$communityMap.ui.getCompanyPoi(poiFirst.val());
				    	}
					}
				}
			});
			$("body").on("click",".current-theme-list img",function(){
				$(".current-theme-list img[data-id]").removeClass("M_on");
				$(this).addClass("M_on");
				$communityMap.ui.getCompanyPoi($(this).data("id"));
				return false;
			});
			$("#cmmnty_map_nm").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("cmmnty_map_nm",26,true,"맵이름","은","는");
			});
			$("#intrcn").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("intrcn",1300,true,"맵소개","은","는");
			});
			$communityMapCommon.setContentLength("cmmnty_map_nm",26);
			$communityMapCommon.setContentLength("intrcn",1300);
			setTimeout(function(){
				//지도 초기화
				$communityForm.ui.initMap();
				//초기 테마 poi 셋팅
				if($("#theme-list input:checkbox:checked").length>0){
					$(".current-theme-list img[data-id]").removeClass("M_on");
					map.mapBtnInfo.isOpenPOI = true;
					map.mapBtnInfo.themeCd = $("#theme-list input:checkbox:checked:first").val();
					map.mapBtnInfo.isShow = false;
					$(".current-theme-list img[data-id="+$("#theme-list input:checkbox:checked:first").val()+"]").addClass("M_on");
					$communityMapCommon.alert("알림","해당 레벨부터는 사업체 POI정보를 볼 수 없습니다.<br>집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.");
				}
			});
			$communityCreateHistory.event.setUIEvent();
		}
	};
	/**
	 * @name           : createArea
	 * @description    : 지역 selectbox 생성
	 * @date           : 2016. 6. 14. 
	 * @author         : 나광흠
	 * @history        :
	 */
	function createArea(){
		if($("#add-area-list").children("div").length>=4){
			$communityMapCommon.alert("알림","지역은 최대 5개까지 설정하실 수 있습니다");
		}else{
			var id = makeRandomThirtySevenDigitString();
			var div = $("<div/>",{"id":"add-area-list-box"+id,"class":"cm_area_box"});
			function create(element,area){
				var areaOption = {
					sido:{
						name : "시도",
						countryDefaultValue : "00"
					},
					sgg:{
						name : "시군구",
						countryDefaultValue : "999"
					},
					emdong:{
						name : "읍면동",
						countryDefaultValue : "00"
					}
				};
				element.append(
					$("<select/>",{"id":area+"Select"+id,"name":"add"+area,"data-id":id,"style":"margin-right:4px;","title":"지역설정 "+areaOption[area].name}).append(
						$("<option/>",{"data-coor-x":"989674","data-coor-y":"1818313","value":areaOption[area].countryDefaultValue,"text":area=="sido"?"전국":"전체"})
					)
				);
			}
			create(div,"sido");
			create(div,"sgg");
			create(div,"emdong");
			div.append(
				$("<button/>",{"title":"삭제","class":"cm_btn_add area-delete-button"}).append($("<img/>",{"src":contextPath+"/img/community/icon_x.png","alt":"삭제","style":"margin-left:1px;"})).tooltip({
					position: {my: "left0 top-8", at: "right top"}
				})
			);
			$("#add-area-list").append(div);
			$communityForm.ui.getSidoList("","","",id);
			$communityForm.ui.initMap(id);
		}
	}
	/**
	 * @name                         : getCustomSymbolGroupList
	 * @description                  : 커스텀 심볼 그룹 리스트
	 * @date                         : 2016. 05. 15. 
	 * @author                       : 나광흠
	 * @history                      :
	 * @param custom_symbol_group_id : 그룹 아이디
	 */
	function getCustomSymbolGroupList(custom_symbol_group_id){
		$("#custom-group-list").empty();
		$.ajax({
			url: contextPath+"/ServiceAPI/community/communityCustomSymbolGroupList.json",
			async: true,
			type: 'POST',
			dataType: "json",
			success: function(res) {
				if(res.errCd=="0"||res.errCd=="-100"){
					if(res.result.summaryList.length>0){
						var disabled = false;
						if(communityMapInfo&&communityMapInfo.poi_cnt>0){
							disabled = true;
						}
						$.each(res.result.summaryList,function(cnt,node){
							var imagePath = node.path_nm.substring(0,node.path_nm.lastIndexOf("/")); 
							var imageName = node.path_nm.substring(node.path_nm.lastIndexOf("/")+1);
							$("#custom-group-list").append(
								$("<li/>").append(
									$("<label/>").append(
										$("<input/>",{type:"radio",name:"symbol","checked":custom_symbol_group_id==node.custom_symbol_group_id,value:node.custom_symbol_group_id,"disabled":disabled}),
										$("<span/>").append($("<img/>",{src:imagePath+"/thumbnail/thumbnail-XS-"+imageName,style:"width:23px;height:28px;"}).click(function(){
											getCustomSymbolList(node.custom_symbol_group_id,node.custom_symbol_group_nm);
										}))
									),	
									$("<label/>").append($("<input/>",{type:"text","readonly":true,"value":node.custom_symbol_group_nm,"disabled":disabled}).click(function(){
										getCustomSymbolList(node.custom_symbol_group_id,node.custom_symbol_group_nm);
									}))
								)
							);
						});
					}else{
						$("#custom-group-list").append($("<li/>").append("등록된 아이콘이 없습니다."));
					}
				}else{
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			error: function(data){
				$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
				return false;
			}
		});
	}
	/**
	 * @name                         : getCustomSymbolList
	 * @description                  : 커스텀 심볼 리스트
	 * @date                         : 2016. 05. 15. 
	 * @author                       : 나광흠
	 * @history                      :
	 * @param custom_symbol_group_id : 그룹 아이디
	 * @param custom_symbol_group_nm : 그룹 이름
	 */
	function getCustomSymbolList(custom_symbol_group_id,custom_symbol_group_nm){
		if(custom_symbol_group_id){
			$.ajax({
				url: contextPath+"/ServiceAPI/community/communityCustomSymbolList.json",
				data:{
					custom_symbol_group_id : custom_symbol_group_id
				},
				async: true,
				type: 'POST',
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"){
						emptyModifyBox();
						var disabled = false;
						if(communityMapInfo&&communityMapInfo.poi_cnt>0){
							disabled = true;
						}
						$(".i_box5>.i_box_cont").removeClass("M_on");
						$(".i_box5>.i_box_modify").addClass("M_on").data("id",custom_symbol_group_id);
						$(".i_box5>.i_box_modify input[name=custom_symbol_group_nm]").val(custom_symbol_group_nm).prop("disabled",disabled);
						$(".i_box5>.i_box_modify .i_icon_list").empty();
						if(disabled){
							$("#modify-symbol-group-button,#remove-symbol-group-button,#add-symbol-button").hide();
						}else{
							$("#modify-symbol-group-button,#remove-symbol-group-button,#add-symbol-button").show();
						}
						$.each(res.result,function(cnt,node){
							$(".i_box5>.i_box_modify .i_icon_list").append(
								$("<li/>",{id:"preview-"+node.custom_symbol_id}).append(
									$("<button/>",{"class":"i_btn_delete","type":"button","text":"아이콘삭제","style":(disabled?"display:none;":"")}).click(function(){
										$("#preview-"+node.custom_symbol_id).remove();
										$("#delete-symbol-list").append($("<input/>",{type:"hidden",value:node.custom_symbol_id}));
									}),
									$("<label/>").append($("<span/>").append($("<img/>",{"src":node.path_nm+"thumbnail/thumbnail-XS-"+node.save_file_nm,"style":"width:23px;height:28px;"}))),
									$("<input/>",{"type":"hidden","name":"modyfy_custom_symbol_id","value":node.custom_symbol_id}),
									$("<input/>",{"type":"text","name":"modyfy_label_nm","value":node.label_nm,"disabled":disabled})
								)
							);
						});
					}else{
						$communityMapCommon.alert("알림", res.errMsg);
					}
				},
				error: function(data){
					$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					return false;
				}
			});
		}else{
			$communityMapCommon.alert("알림","심볼 그룹이 존재하지 않습니다");
		}
	}
	/**
	 * @name        : emptyCreateBox
	 * @description : 커스텀 심볼 그룹 만들기 박스 비우기
	 * @date        : 2016. 05. 15. 
	 * @author      : 나광흠
	 * @history     :
	 */
	function emptyCreateBox(){
		$("#file-list,.i_box_make .i_icon_list").empty();
		$("#file-list").append($("<input/>",{"type":"file","name":"customSymbolFile","style":"display:none;","accept":"image/*"}));
		$(".i_box_make input:text").val(null);
	}
	/**
	 * @name        : emptyModifyBox
	 * @description : 커스텀 심볼 그룹 수정 박스 비우기
	 * @date        : 2016. 05. 15. 
	 * @author      : 나광흠
	 * @history     :
	 */
	function emptyModifyBox(){
		$(".i_box5>.i_box_modify").data("id",null);
		$("#add-symbol-list,.i_box_modify .i_icon_list,#delete-symbol-list").empty();
		$("#add-symbol-list").append($("<input/>",{"type":"file","name":"customSymbolFile","style":"display:none;","accept":"image/*"}));
		$(".i_box_modify input:text").val(null);
	}
	/*********** 임시저장 삭제 시작 **********/
	(function() {
		$class("sop.portal.communityTempDelete.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					if(res.result.success){
						$communityMapCommon.alert("알림", "삭제되었습니다",function(){
							location.href = contextPath+"/view/community/intro";
						});
					}else{
						$communityMapCommon.alert("알림", "삭제를 실패했습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 임시저장 삭제 종료 **********/
}(window, document));