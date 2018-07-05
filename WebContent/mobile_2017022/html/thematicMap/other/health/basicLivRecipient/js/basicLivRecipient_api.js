/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemeKosis= $statsPotal.Api.extend({
		isAccessToken : false,
//		url : '/ServiceAPI/thematicMap/other/ThemaKosisDataBasicLibe'
		url : '/ServiceAPI/thematicMap/other/ThemaKosisData'
	});
	
	$statsPotal.api.thematicMap.getThemeKosis = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemeKosis(opt);
	};		
	
}(window, document));
