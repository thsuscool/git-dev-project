/**
 * mydata 리스트 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/03  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 *
 */
var stat="3";
(function(W, D){
	
W.$myDataList = W.$myDataList || {};
	
	$(document).ready(function() {
		$myDataList.getMyDataList('1');
	});
	
	$myDataList = {
			currentIndex : 1,
			selectUid : null,
			totalSize : 0,
			
			getMyDataList : function(index){
				$myDataList.currentIndex = index;
				$.ajax({
					async : false,
					type : "POST",
					url : "/view/mypage/myData/selectListMyData",
					dataType:"json",
					data:{
						index : index
					},
					success : function(data){
						
						$myDataList.drawListPage(data);
					},
					error:function(xhr, textStatus, error){
						
						
						
					},
					complete : function(){
						
					}					
					
				});
				
			},
	
			drawListPage : function(res){
				//count: 39
				//endPage: 5
				//list
					//DATA_ID: "773ce48d5a5630e1f73c8efaf21cc178_1447810818541"
					//DATA_TITLE: "234"
					//FILE_NM_LOGIC: "테스트3.xlsx1447810818541"
					//FILE_NM_REAL: "테스트3.xlsx"
					//FILE_PATH: "/test/upload/userData"
					//FILE_SZ: "9504"
					//RNUM: "1"
					//SHARE_YN: "N"
					//USR_ID: "choijy"
				//page: 1
				//pageCount: 8
				//startPage: 1
				var data = res.data;
				var count = data.count;
				var startPage = data.startPage;
				var endPage = data.endPage;
				var page = data.page;
				var list = data.list;
				
				$myDataList.totalSize = (res.size /1024)/1024;
				
				
				
				
				var html = "";
				for(var i = 0; i<list.length;i++){
					
					
					var ftype = list[i].FILE_NM_REAL.substring(list[i].FILE_NM_REAL.indexOf(".")+1).toLowerCase();
					
					html +='<li>';
					html +=		'<div class="mpLink">';
					/*html +=					'<a href="#1">' + list[i].UPLOAD_DT + '</a>';*/
					/*html +=					'<a href="#1">' + list[i].DATA_TITLE + '&nbsp;&nbsp;<span style="font-size:13px">('+list[i].UPLOAD_DT+')</span></a>';*/
					html +=					'<a href="javascript:$myDataList.openPortalMyData(\''+list[i].DATA_ID+'\',\''+list[i].DATA_TITLE+'\', \''+list[i].MAP_DISP_TYPE+'\');">' + list[i].DATA_TITLE +'</a>'+ '&nbsp;&nbsp;<span style="font-size:13px">('+list[i].UPLOAD_DT+')</span>';
					html +=		'</div>';
					html +=		'<div class="mpSpan">';
					html +=			'<div class="al">';
					if(ftype == "kml"){
						html +=				'<a href="javascript:$myViewMap.viewMyKml(\''+list[i].DATA_ID+'\')" class="spbox type01"';
					}else{
						html +=				'<a href="javascript:$myViewMap.getMyData(\''+list[i].DATA_ID+'\')" class="spbox type01"';
					}
					html +=						'data-subj="데이터적용 팁"';
					html +=						'title="업로드한 데이터를 해당 서비스 먑에 적용하여 데이터를 조회할 수 있습니다.<br />적용 전 데이터를 설정해 주세요">지도보기</a>';
					html +=			'</div>';
					html +=			'<div class="ar">';
					/*html +=				'<a href="javascript:alert(\''+list[i].DATA_ID+'\')" class="spbox type02"'*/
					
					if(ftype == "kml"){
						html +=			'<a class="spbox type02" title="'+list[i].FILE_NM_REAL+'" href="javascript:$myDataList.openDownLoadKml(\''+list[i].DATA_ID+'\')"><span style="display: inline-block;top:5px;position:relative;"><img width="20" height="20" src="/img/board/attachment.jpg">&nbsp;&nbsp;</span>다운로드</a>';
					}else{
						html +=			'<a class="spbox type02" title="'+list[i].FILE_NM_REAL+'" href="javascript:$myDataList.openDownLoadPop(\''+list[i].DATA_ID+'\')"><span style="display: inline-block;top:5px;position:relative;"><img width="20" height="20" src="/img/board/attachment.jpg">&nbsp;&nbsp;</span>다운로드</a>';
					}									
					html +=				'<a href="/view/mypage/myData/dataModify?data_uid='+list[i].DATA_ID+'" class="spbox type02"';
					html +=						'data-subj="데이터적용 팁"';
					html +=						'title="업로드한 데이터를 활용하기 위해서는<br />제공되는 서비스에 적용될 수 있도록 데이터 설정이 필요합니다">데이터편집</a>';
					html +=				'<a href="javascript:$myDataList.deletePopUp(\''+list[i].DATA_ID+'\')" class="spbox type02">삭제</a>';
					html +=			'</div>';
					html +=		'</div>';
					/*html +=		'<div class="mpEtc">';
					html +=			'<a href="javascript:void(0)">' + list[i].UPLOAD_DT + '</a>';
					html +=			'&nbsp;&nbsp;&nbsp;&nbsp;'
					html +=			'<a title="'+list[i].FILE_NM_REAL+'" href="javascript:$myDataList.openDownLoadPop(\''+list[i].DATA_ID+'\')"><img width="25" height="25" src="/img/board/attachment.jpg"></a>';
					html +=		'</div>';*/
					html +=	'</li>';
					
				}
				
				$("#mpList").html(html);
				
				html = "";
				
				html +='<div id="board_lists_paging" class="pagenation1" align="center" style="width: 100%;">';
				html +='<span class="pages">';
				for(var i =data.startPage; i <= data.endPage;i ++){
					if(i == page){
						html +='<a class="page current" href="javascript:$myDataList.getMyDataList('+i+');">' + i +'</a> &nbsp;&nbsp;&nbsp;';	
					}else{
						html +='<a class="page" href="javascript:$myDataList.getMyDataList('+i+');">' + i +'</a> &nbsp;&nbsp;&nbsp;';
					}
				}
				html +='</span>';
				
				$("#listPage").html(html);
				
				
			},
			
			//2017.10.19 [개발팀] 파라미터 추가 및 링크설정
			openPortalMyData : function(data_id, title, map_type){
				if (map_type == "ts_color" || map_type == "ts_bubble") {
					messageAlert.open("알림", "시계열 집계데이터는 정책통게지도 서비스에서만 지표로 활용됩니다.");
				}else {
					var url = "/view/map/interactiveMap/userdata?id="+data_id+"&title="+title;
					window.location.href= url;
				}
			},
			openDownLoadPop : function(data_id){
				$myDataList.selectUid = data_id;
				$("#downLoadPop").show();
				
			},
			
			openDownLoadKml : function(data_id){
				$myDataList.selectUid = data_id;
				var url = "/view/mypage/myData/fileDownLoadKml?data_id="+data_id;
				window.open(url,"_self","enabled");
				
			},
			
			
			fileDownLoad : function(selectType){
				$("#downLoadPop").hide();
				var selectType = $("#fileType").val();
				var data_id = $myDataList.selectUid;
				
				
				if(selectType == "xls"){
					var url = "/view/mypage/myData/fileDownLoad?data_id="+data_id;
					$myDataList.saveAs(url);
				}else{
					var url = "/view/mypage/myData/fileDownLoadSHP?data_id="+data_id;
					window.open(url,"_self","enabled");
				}
				
			},
			
			saveAs:function(uri){
			    var link = document.createElement('a');
			    if (typeof link.download === 'string') {
			        document.body.appendChild(link); // Firefox requires the link to be in the body
			        /*link.download = filename;*/
			        link.href = uri;
			        link.click();
			        document.body.removeChild(link); // remove the link when done
			    } else {
			        location.replace(uri);
			    }
			},
			
			
			deletePopUp : function(data_uid){
				$myDataList.selectUid = data_uid;
				$("#deleteAlert").show();
			},
			
			deleteData : function(){
				$myDataList.onBlockUIPopup();
				var deleteData = new sop.portal.DataDelete.api();
				deleteData.addParam("data_uid", $myDataList.selectUid);
				
				deleteData.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/DeleteMyData.json",
					options : {
						
					}
				});
			},
			
			selectSharedMyData : function(){
				var selectSharedMyData = new sop.portal.getSharedListMyData.api();
				selectSharedMyData.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/mypage/myData/selectSharedList.json",
					options : {
						
					}
				});
			},
			
			myDataFileUpload : function(){
				if($myDataList.totalSize < 100){
					location.href='/view/mypage/myData/dataUpload';
				}else{
					$("#sizeAlert").show();
				}
			},
			
			onBlockUIPopup : function(){
		    	var elements = document.getElementById("durianMask");
		    	var id = null;
		    	if (elements != null) {
		    		id = elements.getAttribute('id');
		    	}
		    	
		    	if (id != "durianMask") {
		    		 this.blockUI = document.createElement("DIV");
		             this.blockUI.id = "durianMask";
		             this.blockUI.style.backgroundColor = "#D3D3D3";
		             this.blockUI.style.border = "0px solid black";
		             this.blockUI.style.position = "absolute";
		             this.blockUI.style.left = '0px';
		             this.blockUI.style.top = '0px';

		             if(window.innerHeight == undefined){
		             	this.blockUI.style.height = document.body.scrollHeight + 'px';
		                 this.blockUI.style.width = document.documentElement.clientWidth + 'px';
		             }else{
		             	this.blockUI.style.height = document.body.scrollHeight + 'px';
		             	this.blockUI.style.width = document.documentElement.clientWidth + 'px';
//		                 this.blockUI.style.width = window.innerWidth + 'px';
		             }
		             this.blockUI.style.zIndex = "10000";
		             this.blockUI.style.filter = "alpha(opacity=60);";
		             this.blockUI.style.MozOpacity = 0.6;
		             this.blockUI.style.opacity = 0.6;
		             this.blockUI.style.KhtmlOpacity = 0.6;
		             document.body.appendChild(this.blockUI);
		    	
		             this.popupUI=document.createElement("DIV");


		             this.popupUI.style.position = "absolute";
		             this.popupUI.style.height = '10px';
		             this.popupUI.style.lineHeight = '50px';
		             this.popupUI.style.paddingBottom='40px';
		             this.popupUI.style.width ='400px';
		             this.popupUI.style.top ='50%';
		             this.popupUI.style.left = '50%';
		             this.popupUI.style.zIndex = "11000";
		             
		             var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
		             //var errorMsg = "Please Wait...";
		             this.popupUI.innerHTML=errorMsg;
		             document.body.appendChild(this.popupUI);
		    	}
		       
		    },
		    
		    
		    onBlockUIClose : function() {
				if(!$d.util.isUndefined(this.blockUI)) {
					D.body.removeChild(this.blockUI);
					delete this.blockUI;
				}
				if(!$d.util.isUndefined(this.popupUI)) {
					D.body.removeChild(this.popupUI);
					delete this.popupUI;
				}
			}
			
	},
	
	
	
    
	
	/** ********* Data 삭제 ********* */
	(function() {
	    $class("sop.portal.DataDelete.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	$myDataList.onBlockUIClose();
	        	$myDataList.getMyDataList($myDataList.currentIndex);
	        	if(res.errCd == "0") {
	        	}else if(res.errCd == "-401"){	        		
	        	}
	        },
	        onFail : function(status, options) {
	        	   $myDataList.onBlockUIClose();
	        }
	    });
	}());
	
	
	/** ********* 리스트 가져오기 테스트 ********* */
	(function() {
	    $class("sop.portal.getSharedListMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	
	        	if(res.errCd == "0") {
	        		
	        	}else if(res.errCd == "-401"){	        		
	        	}
	        },
	        onFail : function(status, options) {

	        }
	    });
	}());
	
	
	
	
	
}(window,document));