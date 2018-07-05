function hasCommunity(callback){
	var result;
	$.ajax({
		url: contextPath + "/ServiceAPI/community/community.json",
		method: "POST",
		data:{
			"cmmnty_map_id": getParameter("cmmnty_map_id"),
			"bnd_year":bndYear
		},
		async: false,				
		dataType:"json",
		success: function(res){
			if (res.errCd == "0") {
				if(res.result.summary){
					if(typeof callback==="function"){
						callback(res);
					}
				}else{
					messageAlert.open("알림", "존재하지 않는 페이지입니다",function(){
						location.href=contextPath+"/mobile/html/community/intro.html";
					});
				}
			} else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		error: function(xhr, status, errorThrown){
			messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
		}
	});
}
