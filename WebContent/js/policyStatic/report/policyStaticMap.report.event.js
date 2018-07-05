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
	W.$policyStaticMap = W.$policyStaticMap || {};
	W.$policyStaticMap.report = W.$policyStaticMap.report || {};
	$policyStaticMap.report.event = {
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
 			if(!$("#memo").val()){
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
 		
 		reportPdfDown : function() {
 			$(".pntBtn").hide();
 			$(".pntCloseBtn").hide();
			$(".pntShowBtn").hide();
			
			this.savePDF();
 		},
 		
 		savePDF : function() {
			var scrollPos;
 			scrollPos = document.body.scrollTop;
 			window.scroll(0,0);
 			
			html2canvas(document.body, {
 				onrendered: function(canvas) {
 					window.scrollTo(0,scrollPos);
 					var imgData = canvas.toDataURL('image/png');
 					var imgWidth = 210;
 					var pageHeight = 297;
 					var imgHeight = parseInt(canvas.height * imgWidth / canvas.width);
 					var heightLeft = imgHeight;
 					var pdf = new jsPDF('p', 'mm', 'a4');
 					var position = 0;
 					
 					pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
 					heightLeft -= pageHeight;
 					
 					while (heightLeft >= 0) {
 						position = heightLeft - imgHeight;
 						pdf.addPage();
 						pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
 						heightLeft -= pageHeight;
 					}
 					
 					var currentdate = new Date();
 					var fileCreateTime = makeStamp(currentdate);
 					pdf.save('Report_' + fileCreateTime + '.pdf'); 					
 				}
 			});
 			
 			$(".pntBtn").show();
 			$(".pntCloseBtn").show();
		}
	};
}(window, document));