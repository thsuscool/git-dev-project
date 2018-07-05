/**
 * 
 */
(function (W, D) {
	$statsPotal.Api.ThematicMap.GetThemaHouseMaintenanceCond= $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/other/ThemaHouseMaintenanceCond'
	});
	
	$statsPotal.api.thematicMap.getThemaHouseMaintenanceCond = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetThemaHouseMaintenanceCond(opt);
	};		
	
}(window, document));
