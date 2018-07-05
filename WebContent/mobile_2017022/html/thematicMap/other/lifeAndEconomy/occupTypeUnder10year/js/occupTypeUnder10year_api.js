/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaOccupTypeUnder10year= $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaOccupTypeUnder10year'
	});
	
	$statsPotal.api.thematicMap.getThemaOccupTypeUnder10year = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaOccupTypeUnder10year(opt);
	};		
	
}(window, document));
