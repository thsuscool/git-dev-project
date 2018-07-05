/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemeoldHouse = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaOldHouse'
	});
	
	$statsPotal.api.thematicMap.getThemeoldHouse = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemeoldHouse(opt);
	};		
	
}(window, document));
