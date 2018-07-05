/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetSingleFamily = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaSingleFamily'
	});
	
	$statsPotal.api.thematicMap.getSingleFamily = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetSingleFamily(opt);
	};	
	
	
}(window, document));
