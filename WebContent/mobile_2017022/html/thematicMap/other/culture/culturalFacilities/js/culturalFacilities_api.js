/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaPPLTnCulture = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaPPLTnCulture'
	});
	
	$statsPotal.api.thematicMap.getThemaPPLTnCulture = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaPPLTnCulture(opt);
	};		
	
}(window, document));
