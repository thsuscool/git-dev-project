$(function(){
	$("body").on("click",".btnSort",function(){
		var ck = $(this).hasClass("on");
		if(ck){
			$(this).removeClass("on");
			$(this).find("i").removeClass("fa-sort-desc fa-sort-asc").addClass("fa-sort-desc");
		}else{
			$(this).addClass("on");
			$(this).find("i").removeClass("fa-sort-desc fa-sort-asc").addClass("fa-sort-asc");
		}
	});
	$("body").on("click","#tabEvt a",function(){
		$("#dbnTabs01, #dbnTabs02").css("position","absolute");
		var _id = $(this).attr("data-id");
		$("#"+_id).css("position","static");
	}); 
	$("body").on("click",".chkListToggle",function(){
		var ck = $(this).hasClass("on");
		if(ck){
			$(this).removeClass("on");
			$(this).find("span").text("항목전체보기");
			$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
			$(".chkListHidden").css("display", "none");
		}else{
			$(this).addClass("on");
			$(this).find("span").text("항목닫기");
			$(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
			$(".chkListHidden").css("display", "table-row");
		}
	});
	
	if($("#dnbSlick").length) gis.dnbMenuSlide();
	if($(".dbnSlide01").length) gis.dbnSlide01();
	
});

var gis = {
	dbnSlide01:function(){
		$(".dbnSlide01").slick({
			dots: true,infinite:true,arrows:false,slidesToShow:1,adaptiveHeight: true,swipe:false
		}); 	
	},
	dnbMenuSlide:function(){
		$("#dnbSlick").slick({
			dots: false,infinite:true,arrows:false,slidesToShow:1,variableWidth: true
		}); 	
		$("body").on("click","#dnbSlickPrev",function(e){		
			$('#dnbSlick').slick("slickPrev");	
		});
		$("body").on("click","#dnbSlickNext",function(e){		
			$('#dnbSlick').slick("slickNext");	
		});
	},
	del:function(o){
		$(o).parents("li").eq(0).remove();
	},
	fileOpen:function(){
		$("#fileSelect").trigger("click");
		$("body").on("change","#fileSelect",function(){
			var _v = $(this).val();
			var fileList = '<li><a href="javascript:void(0)" onclick="gis.del(this)">';
			fileList += '<span>'+_v+'</span> ';
			fileList += '<i class="fa fa-minus-circle"></i>';
			fileList += '</a></li>';
			$(".jfileList").prepend(fileList);
		});
	},
	josaInfoRadio:function(o){
		if(o == "GIB"){
			$(".hiddenItemTable").css("display","none");
			$(".hiddenItemTr").css("display","none");
			$(".hiddenItemBtn, .hiddenItem").css("display","none");
			$(".showItem").css("display","block");
		}else{
			$(".hiddenItemTable").css("display","table");
			$(".hiddenItemTr").css("display"," table-row");
			$(".hiddenItemBtn").css("display","inline-block");
			$(".hiddenItem").css("display","block");
			$(".showItem").css("display","none");
		}
	},
	authPopupType:function(o){
		var ck = $(o).val();
		$(".selPopup").removeAttr("id");
		if(ck == "gis"){
			$(".selPopup:eq(0)").attr("id", "dialogAdmin");
		}else{
			$(".selPopup:eq(1)").attr("id", "dialogAdmin");
		}
	},
	moveItem:function(o, t){
		$("."+o+" .popTableScrollArea .cketc").each(function(i){
			var ck = $(this).prop("checked");
			if(ck){ 
				$("."+t+" .popTableScrollArea table:eq(1)").append("<tr>"+$(this).parents("tr").eq(0).html()+"</tr>");
				$(this).parents("tr").eq(0).remove();
			}
		});
	} 
}