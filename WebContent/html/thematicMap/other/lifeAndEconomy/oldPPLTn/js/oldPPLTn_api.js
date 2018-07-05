/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetOldPPLTn = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaOldPPLTn'
	});
	
	$statsPotal.api.thematicMap.getOldPPLTn = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetOldPPLTn(opt);
	};	
	
	
}(window, document));
