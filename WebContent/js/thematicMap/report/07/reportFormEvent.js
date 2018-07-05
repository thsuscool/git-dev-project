/**
 * 
 */
(function(W, D) {
	W.$reportFormEvent = W.$reportFormEvent || {}
	$(document).ready(function() {
		$reportFormEvent.UI.pntTitle();
		$("body").on("keyup","#reportTitle", function(){ //2017.03.09 보고서 수정
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
		 			var seletor = $("#reportTitle"); //2017.03.09 보고서 수정
		 			seletor.css("height","30px"); 
		 			var sHeight = seletor.prop("scrollHeight"); 
		 			seletor.css("height",parseInt(sHeight)+"px"); 
		 		},
		 		
		 		pntTitle : function() { 
		 			var seletor = $("#reportTitle"); //2017.03.09 보고서 수정
		 			var maxNum = 35;
		 			var rows = parseInt((seletor.val().length/maxNum)+1);
		 			seletor.css("height",parseInt(rows*30)+"px"); 
		 		},
		 		
		 		//2017.03.09 보고서 수정
		 		//==============================================================================//
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
				}
		 		//==============================================================================//
	}
}(window, document));