/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaWomanPeaceFac = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaWomanPeaceFac'
	});
	
	$statsPotal.api.thematicMap.getThemaWomanPeaceFac = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaWomanPeaceFac(opt);
	};		
	
}(window, document));
