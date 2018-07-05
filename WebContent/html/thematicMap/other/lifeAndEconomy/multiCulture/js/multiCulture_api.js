/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaMultiCulture = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/GetThemaMultiCulture'
	});
	
	$statsPotal.api.thematicMap.getThemaMultiCulture = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaMultiCulture(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetAllHouse = $statsPotal.Api.extend({
		isAccessToken : true,
		host : openApiPath.substring(0, 22),
		url : openApiPath + '/OpenAPI3/stats/household',
		datatype : 'json'
	});
	
	$statsPotal.api.thematicMap.getAllHouse = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetAllHouse(opt);
	};
	
}(window, document));
