/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetYoungAdult = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaYoungAdult'
	});
	
	$statsPotal.api.thematicMap.getYoungAdult = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetYoungAdult(opt);
	};	
	
	
}(window, document));
