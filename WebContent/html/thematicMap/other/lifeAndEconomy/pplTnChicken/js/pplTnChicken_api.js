/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaPPLTnChicken = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaPPLTnChicken'
	});
	
	$statsPotal.api.thematicMap.getThemaPPLTnChicken = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaPPLTnChicken(opt);
	};		
	
}(window, document));
