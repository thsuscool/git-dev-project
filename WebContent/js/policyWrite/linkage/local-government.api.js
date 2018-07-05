/**
 * 지자체 api 관련
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2017/02/17  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$localGovernment = W.$localGovernment || {};
	$localGovernment.api = {
		poi : {
			list : {
				pageSize : 5000,
				getList : function(isGetLastData,page_num,div_cd,base_year,sido_cd,sgg_cd,emdong_cd,callback){
					var url = "/ServiceAPI/policyWrite/getLocalGovernmentPoi.json";
					page_num = $.isNumeric(page_num)?page_num:1;
					if(!$.isNumeric(base_year)){
						messageAlert.open("알림", "경계 년도가 잘못되었습니다");
						return false;
					}
					if(div_cd==null||div_cd==undefined){
						messageAlert.open("알림", "구분 코드가 잘못되었습니다");
						return false;
					}else{
						div_cd = div_cd.toString();
						if(div_cd.replace(/ /gi,"")==""){
							messageAlert.open("알림", "구분 코드가 잘못되었습니다");
							return false;
						}
					}
					var obj = new sop.portal.localGovernment.poi.list.api();
					obj.addParam("div_cd", div_cd);
					obj.addParam("page_num", page_num);
					obj.addParam("pageSize", this.pageSize);
					obj.addParam("base_year", base_year);
					if($.isNumeric(sido_cd)&&sido_cd!="00"){
						obj.addParam("sido_cd", sido_cd);
						if($.isNumeric(sgg_cd)&&sgg_cd!="999"){
							obj.addParam("sgg_cd", sgg_cd);
							if($.isNumeric(emdong_cd)&&emdong_cd!="00"){
								obj.addParam("emdong_cd", emdong_cd);
							}
						}
					}
					obj.request({
						method : "POST",
						async : true,
						url : contextPath + url,
						options : {
							url : url,
							isGetLastData : isGetLastData,
							base_year : base_year,
							div_cd : div_cd,
							sido_cd : sido_cd,
							sgg_cd : sgg_cd,
							emdong_cd : emdong_cd,
							callback : callback
						}
					});
				}
			}
		},
		polygon : {
			list : {
				getList : function(){
					
				}
			}
		}
	};
	(function() {
		$class("sop.portal.localGovernment.poi.list.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	var totalCount = res.result.total_count;
	        	var apicallCount = parseInt(totalCount / (res.result.pageSize * res.result.page_num));
	        	var isLast = true;
	        	if (res.result.summaryList.length !== totalCount && apicallCount > 0) {
	        		isLast = false;
	        		$localGovernment.api.poi.list.getList(options.isGetLastData,res.result.page_num + 1,options.div_cd,options.base_year,options.sido_cd,options.sgg_cd,options.emdong_cd,options.callback)
				}else{
					if(options.isGetLastData===true){
						options.callback(res,options.url,isLast);
					}
				}
	        	if(options.isGetLastData!==true){
	        		options.callback(res,options.url,isLast);
	        	}
	        },
	        onFail : function(status, options) {
	        }
	    });
	}());
}(window, document));

