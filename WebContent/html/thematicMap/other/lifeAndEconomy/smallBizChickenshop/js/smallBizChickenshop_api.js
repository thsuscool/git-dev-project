/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaSmallBizCond= $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaSmallBizCond'
	});
	
	$statsPotal.api.thematicMap.getThemaSmallBizCond = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaSmallBizCond(opt);
	};		
	
}(window, document));
