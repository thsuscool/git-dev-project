/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetStats = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/GetThemaMapData'
	});
	
	$statsPotal.api.thematicMap.getStats = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetStats(opt);
	};	
	
	
}(window, document));
