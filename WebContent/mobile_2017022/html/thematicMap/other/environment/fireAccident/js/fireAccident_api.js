/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaFireAccident= $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaFireAccident'
	});
	
	$statsPotal.api.thematicMap.getThemaFireAccident = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaFireAccident(opt);
	};		
	
}(window, document));
