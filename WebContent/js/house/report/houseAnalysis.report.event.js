/**
 * 살고싶은 우리동네 보고서 이벤트 관련
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2017/01/31  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	W.$houseAnalysisMap.report = W.$houseAnalysisMap.report || {};
	$houseAnalysisMap.report.event = {
		/**
		 * @name         : show
		 * @description  : 보이기
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 * @param id     : html id
		 */
		show : function(id){
			$("#"+id+"_show").hide();
			$("#"+id).show();
		},
		/**
		 * @name         : hide
		 * @description  : 숨기기
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 * @param id     : html id
		 */
		hide : function(id){
			$("#"+id).hide();
			$("#"+id+"_show").show();
		},
		/**
		 * @name         : reportPrint
		 * @description  : 프린트
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
 		reportPrint : function() {
 			//메모가 없을경우 숨김
 			if(!W.opener.$houseAnalysisMap.ui.hasText($("#memo").val())){
 				$("#memoDiv").hide();
 			}
			$(".pntBtn").hide();
			$(".pntCloseBtn").hide();
			$(".pntShowBtn").hide();
			window.focus();
 			window.print();
 			setTimeout(function(){
 				self.close();
 			}, 1);
 		},
	};
}(window, document));