$(function(){
	oxEvent();
});


function oxEvent(){
	$(".oxo").click(function(){
		$(this).addClass("oxO");
		$(this).next(".oxx").removeClass("oxX");
		oxVaueInput($(this).val());
	});
	$(".oxx").click(function(){
		$(this).addClass("oxX");
		$(this).prev(".oxo").removeClass("oxO");
		oxVaueInput($(this).val());
	});
}