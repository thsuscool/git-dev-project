/**
 * 통계 소통지도 POI 보기 화면
 * 
 * history : (주)유코아시스템, 1.0, 2016/01/14  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$communityView = W.$communityView || {};
	$communityView = {
		ui:{
			newMarkers:[],//새로 등록할 마커
			markers:[],//마커그룹
			markersObject:null,
			curMarker:null,
			searchSymbol:"all",//아이콘 검색
			/**
			 * @name           : $communityView.ui.removeMarkers
			 * @description    : 마커 지우기
			 * @date           : 2016. 01. 17.
			 * @author	       : 나광흠
			 * @history 	   :
			 * @param markers  : 지도에서 제외할 마커 배열
			 */
			removeMarkers : function(markers){
				if(markers!=null&&markers.length>0){
					$.each(markers,function(cnt,node){
						node.remove();
					});
				}
				markers = [];
			},
			/**
			 * @name          : $communityView.ui.initForm
			 * @description   : 의견등록 form 초기화
			 * @date          : 2016. 05. 26.
			 * @author	      : 차수아
			 * @history 	  :
			 */
			initForm : function(){
				$communityView.ui.curMarker = null;
				var popupId = "#layer-popup-poi-regist";
				$(popupId+"-photo-file-list,"+popupId+"-photo-hidden-file-list").empty();
				$(popupId+"-form input:not(:radio),"+popupId+" textarea").val(null);
				$(popupId+"-form input:radio:first").prop("checked",true);
				$(popupId+"-photo-hidden-file-list").append($("<input/>",{"type":"file","style":"display:none;","name":"fileSearch"}));
				$communityMapCommon.setContentLength("layer-popup-poi-regist-title",30);
				$communityMapCommon.setContentLength("layer-popup-poi-regist-opinion_state",150);
			},
			/**
			 * @name           : $communityView.ui.initMarker
			 * @description    : 마커 초기화
			 * @date           : 2016. 01. 17.
			 * @author	       : 나광흠
			 * @history 	   :
			 */
			initMarker : function(){
				this.removeMarkers($communityView.ui.newMarkers);
				this.removeMarkers($communityView.ui.markers);
				$communityView.ui.markersObject = null;
				$communityView.ui.curMarker = null;
			},
			/**
			 * @name           : $communityView.ui.mapMarksLists
			 * @description    : 지도에 소통지도에 등록된 마커 찍기
			 * @date           : 2016. 01. 17.
			 * @author	       : 나광흠
			 * @history 	   : 
			 * @param callback : callback
			 */
			mapMarksLists: function(callback) {	
				if($communityMapCommon.hasText($communityView.ui.searchSymbol)||$communityView.ui.searchSymbol=="all"){
					var obj = new sop.portal.mapMarksLists.api();			
					obj.addParam("type", "markers");
					obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
					if($communityMapCommon.hasText($communityView.ui.searchSymbol)&&$communityView.ui.searchSymbol!="all"){
						obj.addParam("symbol", $communityView.ui.searchSymbol);
					}
					obj.request({
						method: "POST",
						async: false,
						url: contextPath + "/ServiceAPI/community/communityPoiList.json",
						options : {
							callback : callback
						}
					});
				}else{
					$.each($communityView.ui.markers,function(){
						this.remove();
					});
				}
			},
			/**
			 * @name                : $communityView.ui.getPoiDetail
			 * @description         : poi 상세정보
			 * @date                : 2016. 01. 17.
			 * @author	            : 나광흠
			 * @history 	        :
			 * @param cmmnty_poi_id : poi 아이디
			 * @param poi_reply_id  : 댓글 아이디
			 */
			getPoiDetail : function(cmmnty_poi_id,poi_reply_id){
				if($communityView.ui.markersObject[cmmnty_poi_id]){
					var obj = new sop.portal.mapMarks.api();			
					obj.addParam("cmmnty_poi_id", cmmnty_poi_id);
					obj.request({
						method: "POST",
						async: false,
						url: contextPath + "/ServiceAPI/community/communityPoi.json",
						options:{
							cmmnty_poi_id : cmmnty_poi_id,
							poi_reply_id : poi_reply_id
						}
					});
					
				}
			},
			/**
			 * @name                : $communityView.ui.createPoiSttemnt
			 * @description         : 신고 목록 셋팅
			 * @date                : 2016. 10. 06
			 * @author	            : 나광흠
			 * @history 	        :
			 * @param sttemntList   : 신고리스트
			 */
			createPoiSttemnt:function(sttemntList){
				if(sttemntList&&sttemntList.length>0){
					$.each(sttemntList,function(cnt,node){
						var div = $("<div/>");
						div.append(
							$("<p/>",{"class":"cont_info"}).append(
								$("<span/>",{"text":"번호 : "+(sttemntList.length-cnt)}),
								$("<span/>",{"text":"아이디 : "+node.usr_id}),
								$("<span/>",{"text":"신고일 : "+node.reg_date})	
							)
						);
						if(node.sttemnt_content.length>50){
							var content = $("<p/>",{"class":"cont","text":node.sttemnt_content.substring(0,50)+"..."});
							div.append(
								content,
								$("<button/>",{"class":"control_open"}).append($("<img/>",{"src":contextPath+"/img/community/btn_register_open.png","alt":"더보기"})).click(function(){
									$(this).hide();
									content.text(node.sttemnt_content);
									div.addClass("List_open");
									$(this).next().show();
								}),
								$("<button/>",{"class":"control_close","style":"display:none;"}).append($("<img/>",{"src":contextPath+"/img/community/btn_register_close.png","alt":"닫기"})).click(function(){
									$(this).hide();
									content.text(node.sttemnt_content.substring(0,50)+"...");
									div.removeClass("List_open");
									$(this).prev().show();
								})
							);
						}else{
							div.addClass("List_open").append($("<p/>",{"class":"cont","text":node.sttemnt_content}));
						}
						$("#poi-detail-report-list").append(div);
					});
				}else{
					$("#poi-detail-report-list").append($("<div/>",{"class":"List_open"}).append(
						$("<p/>",{"class":"cont_info"}).append(
							$("<p/>",{"class":"cont","text":"신고된 내용이 존재하지 않습니다"})
						)
					));
				}
			}
		}
	};
	$communityView.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 01. 14. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			$communityView.ui.mapMarksLists();
			var popupId = "poi-detail";
			//신고 등록
			$("#"+popupId+"-report-form").submit(function(){
				var content = $("#"+popupId+"-sttemnt-content").val();
				if(content.replace(/ /gi,"")==""){
					$communityMapCommon.alert("알림", "신고할 내용을 입력해주세요");
				}else if(content.length>1300){
					$communityMapCommon.alert("알림", "신고할 내용은 최대 1300자까지 작성하실 수 있습니다");
				}else if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&$("#"+popupId+"-sttemnt-id").val().replace(/ /gi,"")==""){
					$communityMapCommon.alert("알림", (communityMapInfo.cmmnty_partcptn_grant_yn=="A"?"별명을":"아이디를")+" 입력해주세요");
				}else if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&$("#"+popupId+"-sttemnt-pw").val().replace(/ /gi,"")==""){
					$communityMapCommon.alert("알림", "비밀번호를 입력해주세요");
				}else{
					var error = false;
					var obj = new sop.portal.poiReport.api();
					if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
						obj.addParam("cmmnty_ipcd", $("#"+popupId+"-sttemnt-id").val());
						obj.addParam("cmmnty_ppcd", $("#"+popupId+"-sttemnt-pw").val());
					}
					if(!error){
					obj.onBlockUIPopup();
					obj.addParam("cmmnty_poi_id", $("#"+popupId).data("id"));
					obj.addParam("sttemnt_content", content);
					obj.request({
						method: "POST",
						async: false,
						url: contextPath + "/ServiceAPI/community/communityPoiReportRegist.json",
						options:{
							cmmnty_poi_id : $("#"+popupId).data("id")
						}
					});
				}
				}
				return false;
			});
			
			//댓글 등록
			$("#"+popupId+"-reply-form").submit(function(){
				var content = $("#"+popupId+"-reply-content").val();
				if(content.replace(/ /gi,"")==""){
					$communityMapCommon.alert("알림", "댓글 내용을 입력해주세요",function(){
						$("#"+popupId+"-reply-content").focus();
					});
					return false;
				}else if(content.length>30){
					$communityMapCommon.alert("알림", "댓글 내용은 최대 30자까지 작성하실 수 있습니다");
					return false;
				}else if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!=AuthInfo.member_id){
					if($("#"+popupId+"-reply-id").val().replace(/ /gi,"")==""){
						$communityMapCommon.alert("알림",  (communityMapInfo.cmmnty_partcptn_grant_yn=="A"?"별명을":"아이디를")+" 입력해주세요");
						return false;
					}else if($("#"+popupId+"-reply-pw").val().replace(/ /gi,"")==""){
						$communityMapCommon.alert("알림", "비밀번호를 입력해주세요");
						return false;
					}
				}
				var obj = new sop.portal.poiReply.api();			
				obj.addParam("cmmnty_poi_id", $("#"+popupId).data("id"));
				obj.addParam("reply_content", content);
				if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
					obj.addParam("cmmnty_ipcd", $("#"+popupId+"-reply-id").val());
					obj.addParam("cmmnty_ppcd", $("#"+popupId+"-reply-pw").val());
				}
				obj.request({
					method: "POST",
					async: false,
					url: contextPath + "/ServiceAPI/community/communityPoiReplyRegist.json",
					options:{
						cmmnty_poi_id : $("#"+popupId).data("id")
					}
				});
				return false;
			});
			//수정하기 클릭
			$("#"+popupId+"-modify-button").click(function(){
				$communityView.ui.removeMarkers($communityView.ui.newMarkers);
				var obj = new sop.portal.poiModifySettingForm.api();			
				obj.addParam("cmmnty_poi_id", $("#poi-detail").data("id"));
				obj.request({
					method: "POST",
					async: false,
					url: contextPath + "/ServiceAPI/community/communityPoi.json"
				});
			});
			//삭제하기 클릭
			$("#"+popupId+"-delete-button").click(function(){
				if($communityLeftMenu.ui.poiRegist.checkDate()){
					$("#poi-detail-report-layer-popup").removeClass("M_on");
					if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!=AuthInfo.member_id){
						var stamp = makeStamp(new Date());
						var addInput = "<div>삭제하시겠습니까?</div>";
						var pwStyle="100%;",pwBoxStyle="";
						if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"){
							addInput += "<div style='padding: 20px 10px 0px 4px;width: 45%;float: left;'><input id='id-"+stamp+"' type='text' style='width: 100%;height: 40px;padding-left: 5px;border-radius: 4px 4px 4px 4px;border: 1px solid #ccc;' placeholder='아이디를 입력하세요'></div>";
							pwBoxStyle = "padding: 20px 0px 0px 12px;width: 45%;float: left;";
						}else{
							pwBoxStyle = "padding: 10px 4px 0px 4px;";
							pwStyle = "70%;";
						}
						addInput += "<div style='"+pwBoxStyle+"'><input type='password' style='width: "+pwStyle+"height: 40px;padding-left: 5px;border-radius: 4px 4px 4px 4px;border: 1px solid #ccc;' placeholder='비밀번호를 입력하세요'></div>";
						var ok = {
							title:"삭제",
							func : function(opt) {
								
								//alert("[communityView.js] 삭제시작")
								
								var register = $(this).parents(".alertPopupWrapper").find("#id-"+stamp).val();
								
								//alert("communityMapInfo.cmmnty_partcptn_grant_yn [" + communityMapInfo.cmmnty_partcptn_grant_yn);
								/*
								if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"){
									$communityMapCommon.alert("알림", "아이디를 입력하세요",function(){
										$("#"+popupId+"-delete-button").click();
									});
									return false;
								}
								*/
								var pw = $(this).parents(".alertPopupWrapper").find("input[type=password]").val();
								if(pw!=undefined&&pw.replace(/ /gi,'')!=''){
									var obj = new sop.portal.poiDelete.api();
									obj.addParam("cmmnty_poi_id", $("#poi-detail").data("id"));
									if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"){
										obj.addParam("cmmnty_ipcd", register);
									}
									obj.addParam("cmmnty_ppcd", pw);
									obj.request({
										method: "POST",
										async: false,
										url: contextPath + "/ServiceAPI/community/communityPoiDelete.json"
									});
								}else{
									$communityMapCommon.alert("알림", "비밀번호를 입력하세요",function(){
										$("#"+popupId+"-delete-button").click();
									});
								}
							}
						};
						$communityMapCommon.confirm("알림",addInput,[ok,{title:"취소"}]);
					}else{
						$communityMapCommon.confirm("알림", "삭제하시겠습니까?",[{
							title : "삭제",
							func : function(opt) {
								var obj = new sop.portal.poiDelete.api();	
								obj.addParam("cmmnty_poi_id", $("#poi-detail").data("id"));
								obj.request({
									method: "POST",
									async: false,
									url: contextPath + "/ServiceAPI/community/communityPoiDelete.json"
								});
							}
						},{title : "취소"}]
						);
					}
				}
			});
			$("body").on("keyup keydown keypress",".popupWrapper .alertInputBox",function(){
				var length=30;
				var lengthText = $(this).parents(".popupWrapper").find(".alertInputBoxLength");
				if($(this).val().length>length){
					lengthText.css({"color":"#c00","font-weight":"bold"});
					$communityMapCommon.alert("알림","최대 "+length+"글자까지 쓸 수 있습니다");
					$(this).val($(this).val().substring(0,length));
					$(this).blur();
				}else{
					lengthText.css({"color":"","font-weight":""});
				}
				lengthText.text($(this).val().length);
			});
			$("body").on("click","#poi-image-navigator button",function(){
				$("#poi-image-box img:not("+$(this).index()+")").hide();
				$("#poi-image-box img:eq("+$(this).index()+")").show();
				$(this).parent().children().removeClass("M_on");
				$(this).addClass("M_on");
				return false;
			});
		}
	};
	/*********** 마커 리스트 시작  **********/	
	(function() {
		$class("sop.portal.mapMarksLists.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if($communityMapCommon.hasText($communityView.ui.markersObject)){
					$.map($communityView.ui.markersObject,function(value,key){value.remove();});
				}
				$communityView.ui.markersObject = {};
				if (res.errCd == "0") {
					var result = res.result;
					if (result.summaryList.length > 0) {
						$.each(result.summaryList,function(cnt,node){
							var html = "";
							html+='<div class="BasicInfo">';
							html+='	<h4>'+node.title+'</h4>';
							html+='	<ul>';
							//2017.06.28 제목,주소,작성자,작성일 수정및 삭제, 의견 추가
							html+='		<li><div style="width:205px; height:70px; overflow-y:auto; font-size:12px; word-break:keep-all; white-space:normal;">' +node.opinion_state+ '</div></li>';
//							html+='		<li>주소: '+node.reg_lc+'</li>';
//							html+='		<li>작성자: '+node.usr_id+'</li>';
//							html+='		<li>작성일: '+node.reg_date+'</li>';
							html+='	</ul>';
							if(node.fileList&&node.fileList.length>0){
								html+='<div id="poi-image-box" style="text-align:center;padding-bottom: 30px;">';
								var navigator = "";
								$.each(node.fileList,function(imgCnt,imgNode){
									html+='<img src="'+imgNode.path_nm+"thumbnail/thumbnail-M-"+imgNode.save_file_nm+'" style="'+(imgCnt==0?'':'display:none;')+'"/>';
									navigator+='<button class="'+(imgCnt==0?'M_on':'')+'"></button>';
								});
								html+='</div>';
								if(node.fileList.length>1){
									html+='<div id="poi-image-navigator" class="navigator" style="width: 100%;top: auto;bottom: 73px;">'+navigator+'</div>';
								}
							}
							html+='	<div class="Btn_Group">';
							html+='		<button onclick="$communityView.ui.getPoiDetail(\''+node.cmmnty_poi_id+'\');">상세보기</button>';
							html+='	</div>';
							html+='</div>';
							var img = new Image();
							var symbol;
							if(node.reg_symbol){
								symbol = "/img/community/iconset_"+node.reg_symbol+node.symbol+".png";
							}else{
								var imagePath = node.symbol_path.substring(0,node.symbol_path.lastIndexOf("/")); 
								var imageName = node.symbol_path.substring(node.symbol_path.lastIndexOf("/")+1);
								symbol = imagePath+"/thumbnail/thumbnail-XS-"+imageName;
							}
							img.onload = function() {
								var iconSize = [this.width,this.height]; 
								if(node.reg_symbol===undefined||node.reg_symbol==null){
									iconSize = [23,28];
								}
								var myIcon = sop.icon({
									iconUrl: contextPath+symbol,
									iconSize: iconSize
								});
								var marker = sop.marker([node.x_loc, node.y_loc], {icon: myIcon}); //마커 생성시 myIcon 옵션값이용 마커 생성
								marker.addTo($communityMap.ui.mapList[$communityMap.ui.curMapId].gMap);
								marker.bindInfoWindow(html,{
									minWidth:200,
									maxWidth:200,
									maxHeight:500
								});
								marker.on("click",function(e){
									e.target._bringToFront();
								});
								$communityView.ui.markers.push(marker);
								$communityView.ui.markersObject[node.cmmnty_poi_id] = marker;
							}
							img.src = contextPath+symbol;
						});
					}
					$communityDataBoard.ui.stat();
					if(typeof options.callback === "function"){
						options.callback();
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 마커 리스트 끝  **********/	
	/*********** 마커 상세정보 시작  **********/	
	(function() {
		$class("sop.portal.mapMarks.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				$communityLeftMenu.ui.leftLayerPopupAllClose();
				$("#poi-detail").addClass("M_on");
				var popupId = "poi-detail";
				$("#"+popupId).data("id","");
				$("#"+popupId+"-title,#"+popupId+"-address,#"+popupId+"-date,#"+popupId+"-comment,#"+popupId+"-reply-count,#"+popupId+"-reply-list,#"+popupId+" .ImgList,#"+popupId+"-sttemnt-cnt,#"+popupId+"-report-list").empty();
				$("#"+popupId+"-reply-content,#"+popupId+"-sttemnt-content,#"+popupId+"-reply-id,#"+popupId+"-reply-pw").val("");
				$("#"+popupId+"-reply-content_length>span,#"+popupId+"-sttemnt-content_length>span").text("0");
				$("#"+popupId+" .ImgFace").css({"background-image":""});
				if (res.errCd == "0") {
					$("#"+popupId).data("id",res.result.summary.cmmnty_poi_id);
					var result = res.result;
					if(result.summary.is_register==="Y"||/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
						$("#"+popupId+"-report-list-button").show();
						if(result.summary.is_master==="Y"){
							if(result.summary.is_register==="Y"){
								$("#"+popupId+"-modify-button,#"+popupId+"-delete-button").show();
							}else{
								$("#"+popupId+"-modify-button,#"+popupId+"-delete-button").hide();
							}
						}else{
							$("#"+popupId+"-modify-button,#"+popupId+"-delete-button").show();
						}
						if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&result.summary.is_master==="N"){
							$("#"+popupId+"-report-button").show();
						}else{
							$("#"+popupId+"-report-button").hide();
						}
					}else{
						if(result.summary.is_master==="Y"){
							$("#"+popupId+"-report-list-button").show();
						}else{
							$("#"+popupId+"-report-list-button").hide();
						}
						$("#"+popupId+"-modify-button,#"+popupId+"-delete-button").hide();
						$("#"+popupId+"-report-button").show();
					}
					$("#"+popupId+"-title").text(result.summary.title);
					$("#"+popupId+"-address").text(result.summary.reg_lc);
					$("#"+popupId+"-date").text(result.summary.reg_date);
					var tagsToReplace = {'"': '&quot;','&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#039;'};
					function replaceTag(tag) {
						var s = tagsToReplace[tag] || tag;
						return s;
					}
					$("#"+popupId+"-comment").html(result.summary.opinion_state.replace(/[&<>\"\'\{\}]/g, replaceTag).replace(/\n/g, "<br/>"));
					$("#"+popupId+"-wirter").text(result.summary.usr_id);
					if(result.fileList&&result.fileList.length>0){
						$.each(result.fileList,function(cnt,node){
							if(cnt==0){
								$("#"+popupId+"-image").css({"background-image":"url("+node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm+")"}).data("original-path",node.path_nm+node.save_file_nm);
							}
							$("#"+popupId+"-image-list").append(
								$("<span/>",{
									"class":(cnt==0?"M_on":""),
									"style":"background-image:url("+node.path_nm+"thumbnail/thumbnail-S-"+node.save_file_nm+")",
									"data-thumbnail-path":node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm,
									"data-original-path":node.path_nm+node.save_file_nm
								})
							);
						});
						for(var i=0;i<5-result.fileList.length;i++){
							$("#"+popupId+"-image-list").append($("<span/>",{"text":"이미지가 존재하지 않습니다","data-thumbnail-path":"none","style":"cursor:default;"}));
						}
						$("#"+popupId+" .detail_box .ImgZone").show();
					}else{
						$("#"+popupId+" .detail_box .ImgZone").hide();
					}
					$("#"+popupId+"-sttemnt-cnt").text(result.summary.sttemnt_cnt);
					$("#"+popupId+"-reply-count").text(result.summary.reply_cnt);
					$communityView.ui.markersObject[res.result.summary.cmmnty_poi_id].closeInfoWindow();
					if(result.replyList.length>0){
						var onReplyId;
						if(options.poi_reply_id){
							onReplyId = options.poi_reply_id;
						}else{
							onReplyId = result.replyList[0].poi_reply_id;
						}
						$.each(result.replyList,function(cnt,node){
							var div = $("<div/>",{"style":(node.poi_reply_id==onReplyId?"":"display:none;")});
							var title = $("<span/>",{"class":"title"}).append($("<span/>",{"text":node.reply_content,"data-id":node.poi_reply_id}));
							if(node.is_register==="Y"||(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&node.usr_id!==AuthInfo.member_id)){
								title.append(
									$("<button/>",{"data-id":node.poi_reply_id}).append($("<img/>",{"src":contextPath+"/img/community/comment_modify.png","alt":"수정"})).click(function(){
										var id = $(this).data("id");
										var stamp = makeStamp(new Date());
										var ok = {
											title:"수정",
											func : function(opt) {
												var text = $(this).parents(".alertPopupWrapper").find("#content-"+stamp).val();
												var register = $(this).parents(".alertPopupWrapper").find("#id-"+stamp).val();
												var pw = $(this).parents(".alertPopupWrapper").find("input[type=password]").val();
												if(text!=undefined&&text.replace(/ /gi,'')!=''){
													if((communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&node.usr_id!==AuthInfo.member_id)&&(register==undefined||register==null||register.replace(/ /gi,"")=="")){
														$communityMapCommon.alert("알림", "아이디를 입력해주세요",function(){
															$("#"+popupId+"-reply-list li button.modify[data-id="+id+"]").click();
														});
														return false;
													}else if((/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&node.usr_id!==AuthInfo.member_id)&&(pw==undefined||pw==null||pw.replace(/ /gi,"")=="")){
														$communityMapCommon.alert("알림", "비밀번호를 입력해주세요",function(){
															$("#"+popupId+"-reply-list li button.modify[data-id="+id+"]").click();
														});
														return false;
													}
													var obj = new sop.portal.poiReplyModify.api();
													obj.addParam("reply_content", text);
													obj.addParam("poi_reply_id", id);
													if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&node.usr_id!==AuthInfo.member_id){
														obj.addParam("cmmnty_ipcd", register);
													}
													if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&node.usr_id!==AuthInfo.member_id){
														obj.addParam("cmmnty_ppcd", pw);
													}
													obj.request({
														method : "POST",
														async : false,
														url : contextPath + "/ServiceAPI/community/communityPoiReplyModify.json",
														options:{
															poi_reply_id : id,
															cmmnty_poi_id : $("#"+popupId).data("id")
														}
													});
												}else{
													$communityMapCommon.alert("알림", "댓글 내용을 입력해주세요",function(){
														$("#"+popupId+"-reply-list li button.modify[data-id="+id+"]").click();
													});
												}
											}
										};
										var cancel = {title:"취소"};
										var addInput = "",content = $("#"+popupId+"-reply-list div>span.title>span[data-id="+$(this).data("id")+"]").text();
										addInput += "<div style='padding: 20px 10px 0px 0px;'>";
										addInput += "	<input type='text' id='content-"+stamp+"' class='alertInputBox' placeholder='댓글을 입력하세요' value='"+content+"' style='width: 100%;height: 40px;padding-left: 5px;border-radius: 4px 4px 4px 4px;border: 1px solid #ccc;'>";
										addInput += "	<span>(<span class='alertInputBoxLength'>"+content.length+"</span>/30)</span>";
										addInput += "</div>";
										if(node.usr_id!==AuthInfo.member_id){
											var pwStyle="100%;",pwBoxStyle="";
											if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"){
												addInput += "<div style='padding: 20px 10px 0px 4px;width: 45%;float: left;'><input id='id-"+stamp+"' type='text' style='width: 100%;height: 40px;padding-left: 5px;border-radius: 4px 4px 4px 4px;border: 1px solid #ccc;' placeholder='아이디를 입력하세요'></div>";
												pwBoxStyle = "padding: 20px 0px 0px 12px;width: 45%;float: left;";
											}else{
												pwBoxStyle = "padding: 10px 4px 0px 4px;";
												pwStyle = "70%;";
											}
											if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
												addInput += "<div style='"+pwBoxStyle+"'><input type='password' style='width: "+pwStyle+"height: 40px;padding-left: 5px;border-radius: 4px 4px 4px 4px;border: 1px solid #ccc;' placeholder='비밀번호를 입력하세요'></div>";
											}
										}
										$communityMapCommon.confirm("수정",addInput,[ok,cancel]);
									}),
									$("<button/>",{"data-id":node.poi_reply_id}).append($("<img/>",{"src":contextPath+"/img/community/comment_delete.png","alt":"삭제"})).click(function(){
										var thisButton = $(this);
										var id = $(this).data("id");
										if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&node.usr_id!==AuthInfo.member_id){
											var stamp = makeStamp(new Date());
											var ok = {
												title:"삭제",
												func : function(opt) {
													var pw = $(this).parents(".alertPopupWrapper").find("input[type=password]").val();
													var register = $(this).parents(".alertPopupWrapper").find("#id-"+stamp).val();
													if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&(register==undefined||register==null||register.replace(/ /gi,"")=="")){
														$communityMapCommon.alert("알림", "아이디를 입력해주세요",function(){
															thisButton.click();
														});
														return false;
													}else if(pw==undefined||pw==null||pw.replace(/ /gi,'')==''){
														$communityMapCommon.alert("알림", "비밀번호를 입력하세요",function done(){
															thisButton.click();
														});
														return false;
													}
													
													var obj = new sop.portal.poiReplyDelete.api();
													if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"){
														obj.addParam("cmmnty_ipcd", register);
													}
													obj.addParam("poi_reply_id", id);
													obj.addParam("cmmnty_ppcd", pw);
													obj.request({
														method: "POST",
														async: false,
														url: contextPath + "/ServiceAPI/community/communityPoiReplyDelete.json",
														options:{
															cmmnty_poi_id : $("#"+popupId).data("id")
														}
													});
												}
											};
											var cancel = {
												title:"취소",
												func : function(opt) {}
											};
											var addInput = "<div>삭제하시겠습니까?</div>";
											if(node.usr_id!==AuthInfo.member_id){
												var pwStyle="100%;",pwBoxStyle="";
												if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"){
													addInput += "<div style='padding: 20px 10px 0px 4px;width: 45%;float: left;'><input id='id-"+stamp+"' type='text' style='width: 100%;height: 40px;padding-left: 5px;border-radius: 4px 4px 4px 4px;border: 1px solid #ccc;' placeholder='아이디를 입력하세요'></div>";
													pwBoxStyle = "padding: 20px 0px 0px 12px;width: 45%;float: left;";
												}else{
													pwBoxStyle = "padding: 10px 4px 0px 4px;";
													pwStyle = "70%;";
												}
												if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
													addInput += "<div style='"+pwBoxStyle+"'><input type='password' style='width: "+pwStyle+"height: 40px;padding-left: 5px;border-radius: 4px 4px 4px 4px;border: 1px solid #ccc;' placeholder='비밀번호를 입력하세요'></div>";
												}
											}
											$communityMapCommon.confirm("삭제",addInput,[ok,cancel]);
										}else{
											$communityMapCommon.confirm("알림", "삭제하시겠습니까?",[
	                                           {
													title : "삭제",
													func : function(opt) {
														var obj = new sop.portal.poiReplyDelete.api();			
														obj.addParam("poi_reply_id", id);
														obj.request({
															method: "POST",
															async: false,
															url: contextPath + "/ServiceAPI/community/communityPoiReplyDelete.json",
															options:{
																cmmnty_poi_id : $("#"+popupId).data("id")
															}
														});
													}
												},{title : "취소"}
											]);
										}
									})
								);
							}
							div.append(
								title,
								$("<span/>",{"class":"id","text":node.usr_id}),
								$("<span/>",{"class":"date","style":"margin-left:5px;","text":node.reg_date})
							);
							$("#"+popupId+"-reply-list").append(div);
						});
						function pageOff(){
							if($("#"+popupId+"-reply-list>div:visible").length<=0){
								$("#"+popupId+"-reply-list>div:first").show();
							}
							if($("#"+popupId+"-reply-list>div:visible").is($("#"+popupId+"-reply-list>div:first"))){
								$("#"+popupId+"-reply-page>a:first").addClass("off");
							}else{
								$("#"+popupId+"-reply-page>a:first").removeClass("off");
							}
							if($("#"+popupId+"-reply-list>div:visible").is($("#"+popupId+"-reply-list>div:last"))){
								$("#"+popupId+"-reply-page>a:last").addClass("off");
							}else{
								$("#"+popupId+"-reply-page>a:last").removeClass("off");
							}
							$("#"+popupId+"-reply-page strong").text($("#"+popupId+"-reply-list>div:visible").index()+1);
						}
						$("#"+popupId+"-reply-page").empty().append(
							$("<a/>",{"href":"#","class":"off"}).append($("<img/>",{"src":contextPath+"/img/community/reply_arrow_l.png","alt":"이전"})).click(function(){
								var item = $("#"+popupId+"-reply-list>div:visible").prev();
								if(item.length>0){
									$("#"+popupId+"-reply-list>div").hide();
									item.show();
								}
								pageOff();
								return false;
							}),
							$("<span/>").append($("<strong/>",{"text":"1"}),"&#47;"+result.replyList.length),
							$("<a/>",{"href":"#","class":(result.replyList.length>1?"":"off")}).append($("<img/>",{"src":contextPath+"/img/community/reply_arrow_r.png","alt":"다음"})).click(function(){
								var item = $("#"+popupId+"-reply-list>div:visible").next();
								if(item.length>0){
									$("#"+popupId+"-reply-list>div").hide();
									item.show();
								}
								pageOff();
								return false;
							})
						).show();
						pageOff();
					}else{
						$("#"+popupId+"-reply-page").empty().hide();
					}
					if((result.summary.is_register==="Y"&&!/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn))||result.summary.is_master==="Y"){
						$communityView.ui.createPoiSttemnt(result.sttemntList);
					}
					if(!$communityMapCommon.hasText($communityView.ui.markersObject[options.cmmnty_poi_id].originalMargin)){
						$communityView.ui.markersObject[options.cmmnty_poi_id].originalMargin = {
							"margin-left":parseInt($($communityView.ui.markersObject[options.cmmnty_poi_id]._icon).css("margin-left").replace("px","")),
							"margin-top":parseInt($($communityView.ui.markersObject[options.cmmnty_poi_id]._icon).css("margin-top").replace("px",""))
						};
					}
					$($communityView.ui.markersObject[options.cmmnty_poi_id]._icon).css({
						"margin-left" : $communityView.ui.markersObject[options.cmmnty_poi_id].originalMargin["margin-left"]-8,
						"margin-top" : $communityView.ui.markersObject[options.cmmnty_poi_id].originalMargin["margin-top"]-6
					}).addClass("community-on");
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 마커 상세정보 끝  **********/	
	/*********** 신고하기 시작  **********/	
	(function() {
		$class("sop.portal.poiReport.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				this.onBlockUIClose();
				if (res.errCd == "0") {
					if(res.result.success){
						$communityView.ui.getPoiDetail(options.cmmnty_poi_id);
						$("#poi-detail-report-layer-popup").removeClass("M_on");
						$communityMapCommon.alert("알림", "등록되었습니다");
					}else{
						$communityMapCommon.alert("알림", "등록을 실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 신고하기 끝  **********/	
	/*********** 댓글 등록 시작  **********/	
	(function() {
		$class("sop.portal.poiReply.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					if(res.result.success){
						$communityView.ui.getPoiDetail(options.cmmnty_poi_id);
						$communityMapCommon.alert("알림", "등록되었습니다");
					}else{
						$communityMapCommon.alert("알림", "등록을 실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 댓글 등록 끝  **********/	
	/*********** 댓글 삭제 시작  **********/	
	(function() {
		$class("sop.portal.poiReplyDelete.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					if(res.result.success){
						$communityView.ui.getPoiDetail(options.cmmnty_poi_id);
						$communityMapCommon.alert("알림", "삭제되었습니다");
					}else{
						$communityMapCommon.alert("알림", "삭제를 실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 댓글 삭제 끝  **********/	
	/*********** 댓글 수정 시작  **********/	
	(function() {
		$class("sop.portal.poiReplyModify.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					if(res.result.success){
						$communityView.ui.getPoiDetail(options.cmmnty_poi_id,options.poi_reply_id);
						$communityMapCommon.alert("알림", "수정되었습니다");
					}else{
						$communityMapCommon.alert("알림", "수정을 실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 댓글 삭제 끝  **********/	
	/*********** poi 수정폼 셋팅 시작  **********/	
	(function() {
		$class("sop.portal.poiModifySettingForm.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if (res.errCd == "0") {
					if($communityLeftMenu.ui.poiRegist.openPoiRegistBox()){
						$("#poi-detail").removeClass("M_on");
						if(communityMapInfo.cmmnty_partcptn_grant_yn=="A"){
							$("#type-password-check-button").show();
						}
						var popupId = "#layer-popup-poi-regist";
						$communityView.ui.curMarker = res.result.summary;
						$(popupId+" h2").text("소통지도 수정하기");
						$communityLeftMenu.ui.curAddressCenter = [res.result.summary.x_loc,res.result.summary.y_loc];
						$(popupId+" input[name=title]").val(res.result.summary.title);
						$(popupId+" input[name=reg_lc]").val(res.result.summary.reg_lc);
						$(popupId+" textarea[name=opinion_state]").val(res.result.summary.opinion_state);
						$(popupId+" input[name=symbol][value="+res.result.summary.symbol+"]:radio").prop("checked",true);
						$("#layer-popup-poi-regist-photo-file-list").empty();
						if(/(M|P|A)/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!=AuthInfo.member_id){
							$(popupId+"-form>div,"+popupId+"-form>button[type=submit]").addClass("disabled");
							$(popupId+"-form input:radio").prop("disabled",true);
							$(popupId+"-form input:not(:radio),"+popupId+" textarea").prop("readonly",true);
							$(popupId+" input[name=id],"+popupId+" input[name=pw]").val(null).prop("readonly",false).parent(".WriteBox").removeClass("disabled");
						}
						if(res.result.fileList){
							var files = $(this)[0].files;
							var filePhoto = $(this);
							$.each(res.result.fileList ,function(cnt, node){
								$(popupId+"-photo-file-list").append($("<li/>").append(
									$("<span/>",{"class":"img","style":"background-image:url("+node.path_nm+"thumbnail/thumbnail-S-"+node.save_file_nm+");"}),
									$("<span/>",{"class":"filename","text":node.ori_file_nm}),
									$("<button/>",{"type":"button","data-id":node.poi_atch_image_id}).click(function(){
										var element = $(this);
										if(!element.parents(".write_image").hasClass("disabled")){
											$communityMapCommon.confirm(
												"알림","삭제하시겠습니까?",[{
													title : "확인",
													func : function(opt) {
														$(popupId+"-photo-hidden-file-list").append($("<input/>",{"type":"hidden","name":"delete-image-id","value":element.data("id")}));
														filePhoto.remove();
														element.parent().remove();
													}
												},{title : "취소"}   
											]);
										}
									})
								)).show();
							});
						}
						$communityMapCommon.setContentLength("layer-popup-poi-regist-opinion_state",1300);
						$communityMapCommon.setContentLength("layer-popup-poi-regist-title",1300);
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** poi 수정폼 셋팅 끝  **********/	
	/*********** poi 삭제 시작  **********/	
	(function() {
		$class("sop.portal.poiDelete.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if (res.errCd == "0") {
					if(res.result.success){
						
						$("#poi-detail").removeClass("M_on").data("id","");
						$communityView.ui.initMarker();
						$communityView.ui.mapMarksLists();
						$communityLeftMenu.ui.communityPoi.all.getList();
						$communityLeftMenu.ui.communityPoi.my.getList();
						$communityMapCommon.alert("알림", "삭제되었습니다");
					}else{
						$communityMapCommon.alert("알림", "삭제을 실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** poi 삭제 끝  **********/	
}(window, document));
