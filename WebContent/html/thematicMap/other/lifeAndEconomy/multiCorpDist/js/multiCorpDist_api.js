/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaMultiCorpDist = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaMultiCorpDist'
	});
	
	$statsPotal.api.thematicMap.getThemaMultiCorpDist = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaMultiCorpDist(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetThemaMultiCorpDistPOI = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaMultiCorpDistPOI'
	});
	
	$statsPotal.api.thematicMap.getThemaMultiCorpDistPOI = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaMultiCorpDistPOI(opt);
	};
	
}(window, document));
