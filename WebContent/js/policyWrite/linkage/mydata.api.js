/**
 * 마이데이터 api 관련
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2017/02/16  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$mydata = W.$mydata || {};
	$mydata.api = {
		getMyDataList : {
			pageSize : 5,
			getList : function(page,map_disp_type,callback){
				page = $.isNumeric(page)?page:1;
				$.ajax({
					url : contextPath+"/view/map/policyWrite/mydataList",
					type:"POST",
					data: {
						index : page,
						map_disp_type : map_disp_type
					},
					async: true,
					dataType:"json",
					success: function(res){
						if(typeof callback === "function"){
							callback(res);
						}
					},
					error: function(data){
						if(typeof callback === "function"){
							callback(data);
						}
					}
				});
			}
		},
		/**
		 * @name           : getMyData
		 * @description    : 나의데이터에 저장된 내용 불러오기 
		 * @date           : 2017. 02. 16. 
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param data_uid : 시퀀스
		 * @param callback : callback
		 */
		getMyData : function(data_uid,callback){
			var url = "/ServiceAPI/mypage/myData/getMyData.json";
			var obj = new sop.portal.mydata.getMyData.api();
			obj.onBlockUIPopup();
			obj.addParam("data_uid", data_uid);
			obj.request({
				method : "POST",
				async : true,
				url : contextPath + url,
				options : {
					data_uid : data_uid,
					callback : callback,
					url : url
				}
			});
		}
	};
	/*********** 나의 데이터 저장 목록 시작 **********/
	(function() {
		$class("sop.portal.mydata.getMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if(res.errCd == "0") {
	        		var dataName,dataNameColumn,data=[],dataColumn=[];
	        		$.each(res.result[0].metaData,function(cnt,node){
	        			if(node.CHECK_TYPE=="1"){
	        				dataName = node.COL_NM;
	        				dataNameColumn = node.COL_ID;
	        			}else if(node.CHECK_TYPE=="2"){
	        				data.push(node.COL_NM);
	        				dataColumn.push(node.COL_ID);
	        			}else if(node.CHECK_TYPE=="3"){
	        				dataName = node.COL_NM;
	        				dataNameColumn = node.COL_ID;
	        				data.push(node.COL_NM);
	        				dataColumn.push(node.COL_ID);
	        			}
	        		});
	        		var result = [];
	        		var uploadData = res.result[0].uploadData;
	        		for(var i=0; i< uploadData.length; i++){
	        			var dataList = $.parseJSON(uploadData[i].USR_DATA);
	        			var oda = [];
	        			for(var x = 0; x < dataColumn.length; x ++){
	        				var info;
	        				if(res.result[0].mainData.MAP_DISP_TYPE=="colorFull"){
	        					info = {
	    							title : data[x],
		        					data : dataList[dataColumn[x]]
	        					};
	        					if (res.result[0].mainData.TOT_TYPE != "4") {
	        						info.adm_cd = uploadData[i].ADM_CD;
	        					} else {
	        						info.adm_cd = uploadData[i].TOT_REG_CD;
	        					}
	        				}else{
	        					info = {
	    							name : data[x],
		        					value : dataList[dataColumn[x]]
	        					};
	        				}
	        				oda.push(info);
	        			}
	        			result.push({
	        				center : [uploadData[i].GEO_X,uploadData[i].GEO_Y],
	        				title : dataName,
	        				subTitle : dataList[dataNameColumn],
	        				data :  oda
	        			});
	        		}
	        		if(typeof options.callback === "function"){
	        			if(res.result[0].mainData.MAP_DISP_TYPE=="colorFull"){
	        				options.callback(options.url,result,res.result[0].mainData.TOT_TYPE);
	        			}else{
	        				options.callback(options.url,result);
	        			}
	        		}
    			}
	        	this.onBlockUIClose();
	        },
	        onFail : function(status, options) {

	        }
	    });
	}());
	/*********** 나의 데이터 저장 목록 종료 **********/
}(window, document));

