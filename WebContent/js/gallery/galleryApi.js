/**
 * gallery API 
 * history : 네이버시스템(주), 1.0, 2016/08/29  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 */

(function(W,D){
	W.$galleryApi = W.$galleryApi || {};
	
	$galleryApi.request = {
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			test : function(params){
				
			}
			
	};
	
	
	/* openApi Example*/
	(function(){
		$class("sop.openApi.example.api").extend(sop.portal.abs.API).define({
			onSuccess : function(status, res, options){
				switch(parseInt(res.errCd)){
					case 0 : 
						break;
					case -401 : 
						break;
					case -100 : 
						break;
					default : 
						break;
				}
			},
			onFail : function(status,option){
				
			}
		})
	});
	
}(window, document));
