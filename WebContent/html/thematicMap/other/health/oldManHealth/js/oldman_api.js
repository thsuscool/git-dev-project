/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetOldManHealthList = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaHealthFacOldMan'
	});
	
	$statsPotal.api.thematicMap.getOldManHealthList = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetOldManHealthList(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetOldManHealthListPOI = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaHealthFacOldManPOI'
	});
	
	$statsPotal.api.thematicMap.getOldManHealthListPOI = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetOldManHealthListPOI(opt);
	};
	
}(window, document));
