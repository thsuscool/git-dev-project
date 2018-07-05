/**
 * 
 */
(function(W, D) {
	W.$reportFormEvent = W.$reportFormEvent || {}
	$(document).ready(function() {
		$reportFormEvent.UI.pntTitle();
		$("body").on("keyup",".pntTitle textarea", function(){
			$reportFormEvent.UI.auto_text();
		});		
	});
	
	$reportFormEvent.UI = {
		 		//보고서 프린트
		 		reportPrint : function() {
		 			//메모가 없을경우 숨김
		 			if($("#memo").val() == "") {
		 				$("#memoDiv").hide();
		 			}
					$(".pntBtn").hide();
					
					window.focus();
		 			window.print();
		 			setTimeout(function(){
		 				window.close();
		 			}, 1);
		 		},
		 		
		 		//창 닫기
		 		reportClose : function() {
		 			window.close();
		 		},
		 		
		 		auto_text : function() {
		 			var seletor = $(".pntTitle textarea");
		 			seletor.css("height","30px"); 
		 			var sHeight = seletor.prop("scrollHeight"); 
		 			seletor.css("height",parseInt(sHeight)+"px"); 
		 		},
		 		
		 		pntTitle : function() { 
		 			var seletor = $(".pntTitle textarea");
		 			var maxNum = 35;
		 			var rows = parseInt((seletor.val().length/maxNum)+1);
		 			seletor.css("height",parseInt(rows*30)+"px"); 
		 		}
	}
}(window, document));