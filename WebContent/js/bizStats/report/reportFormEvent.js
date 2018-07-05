/**
 * 
 */
(function(W, D) {
	W.$reportFormEvent = W.$reportFormEvent || {}
	$(document).ready(function() {
		$reportFormEvent.UI.pntTitle();
		$("body").on("keyup","#reportTitle", function(){ //2017.03.13 pdf저장 이슈
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
					$(".pntCloseBtn").hide();
					$(".pntShowBtn").hide();
					
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
		 			var seletor = $("#reportTitle"); //2017.03.13 pdf저장 이슈
		 			seletor.css("height","30px"); 
		 			var sHeight = seletor.prop("scrollHeight"); 
		 			seletor.css("height",parseInt(sHeight)+"px"); 
		 		},
		 		
		 		pntTitle : function() { 
		 			var seletor = $("#reportTitle"); //2017.03.13 pdf저장 이슈
		 			var maxNum = 35;
		 			var rows = parseInt((seletor.val().length/maxNum)+1);
		 			seletor.css("height",parseInt(rows*30)+"px"); 
		 		},
		 		
		 		//PDF다운로드
		 		reportPdfDown : function() {
		 			$(".pntBtn").hide();
		 			$(".pntCloseBtn").hide();
					$(".pntShowBtn").hide();
		 			
					this.savePDF();
					//이미지저장
					/*if ($reportForm.ui.delegate != null) {
						$reportForm.ui.delegate.doBookMark(1, "report");
					}*/
		 		},
		 		
		 		makeImageURL : function(type){
					var map = $reportForm.ui.map;
					var shareInfo = map.shareInfo;
					var shareData = shareInfo.shareUrlInfo;
					var title = "갤러리등록";	
					var hist_id = makeRandomThirtySevenDigitString();
					var hist_type = "gcap";
					var map_type = type;
					var params = JSON.stringify(shareData);
					var hist_nm = title;
					
					if (map_type == null || map_type == undefined) {
						map_type = "IMAP";
					}
					
					var captureImage = new sop.portal.imageCapture.api();
					captureImage.addParam("hist_id",hist_id);
					captureImage.addParam("hist_type",hist_type);
					captureImage.addParam("map_type",map_type);
					captureImage.addParam("params",params);
					captureImage.addParam("hist_nm",hist_nm);
					captureImage.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/member/RegStatisticsHistory.json",
						options : {}
					});
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
		 					var imgHeight = canvas.height * imgWidth / canvas.width;
		 					var heightLeft = imgHeight;
		 					
		 					var pdf = new jsPDF('p', 'mm', 'a4');
		 					var position = 8;
		 					
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
	};
	
	(function(){
		$class("sop.portal.imageCapture.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				switch(parseInt(res.errCd)){
					case 0 : 
						var result = res.result;
						var hist_id = result.hist_id;
						var linkUrl = getShareURL(result.map_type);
						var makeUrl = captureDomain+"/capture.do?url="+linkUrl+"id="+hist_id;
						var urlMakeBase64 = new sop.portal.urlMakeBase64.api();
						urlMakeBase64.addParam("makeUrl",makeUrl);
						urlMakeBase64.addParam("fileName",hist_id);
						urlMakeBase64.addParam("type","gallery");
						urlMakeBase64.request({
							method : "POST",
							async : false,
							url : contextPath +"/ServiceAPI/gallery/urlMakeBase64.json"
						});
						
						
						break;
					case -401 : 
						console.log("400 err");
						break;
					case -100 :
						console.log("100 err");
						break;
					default : 
						console.log("res");
						console.log(res);
						break;
				}
			},
			onFail : function(status,option){
				console.log("fail");
				console.log(status);
			}
		})
	}());
	
	(function(){
		$class("sop.portal.urlMakeBase64.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				switch (parseInt(res.errCd)) {
					case 0:
						$("#reportMapDiv").hide();
						$("#report_captureImage").show();
						$("#report_captureImage").attr('src',"data:image/png;base64,"+res.result.base64);
						$reportFormEvent.UI.savePDF();
						break;
				}
			},
			onFail : function(status,option){
				$("#reportMapDiv").show();
				$("#report_captureImage").hide();
				$(".pntBtn").show();
	 			$(".pntCloseBtn").show();
				$(".pntShowBtn").show();
				messageAlert.open("알림", "서버문제로 pdf저장에 실패하였습니다.");
			}
		})
	}());
}(window, document));