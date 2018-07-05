/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaMultiHouse = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaMultiHouse'
	});
	
	$statsPotal.api.thematicMap.getThemaMultiHouse = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaMultiHouse(opt);
	};	
	
	
}(window, document));
