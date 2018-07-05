/**
 * 
 */
(function (W, D) {
	/** ********* $statsPotal API 추상클래스 정의 START ********* */
	W.$statsPotal = W.$statsPotal || {};
	
	$statsPotal.Api = sop.Api.extend({
		host : '',
		context : '',
		port : '',
		isAccessToken : true,
		initialize : function (opt) {
			if (sop.Util.isUndefined(opt))
				throw new Error('Check opt Parameter');
			sop.Ajax.prototype.initialize.call(this);
			
			this.datatype = sop.Util.isUndefined(this.datatype) ? 'json' : this.datatype;
			opt.datatype = sop.Util.isUndefined(opt.datatype) ? this.datatype : opt.datatype;
			
			this.options = $d.util.isUndefined(opt.options) ? 'null' : opt.options;
			
			if (sop.Util.isUndefined(opt.url)) {
				opt.url = this.url + '.' + opt.datatype;
			}
			if (sop.Util.isUndefined(opt.host)) {
				opt.host = this.host;
			}
			// opt.url이 있을경우 opt.url은 datatype(json , xml)이 들어가 있는 컨텍스트가 존재해야한다.
			opt.url = this.context + opt.url;
			
			// callback Success 함수, Fail 함수 설정
			if (!sop.Util.isUndefined(opt.success)) {
				this.callbackSucesssFunc = opt.success;
			}
			
			// callback Success 함수, Fail 함수 설정
			if (!sop.Util.isUndefined(opt.fail)) {
				this.callbackFailFunc = opt.fail;
			}
			this.beforeExecute();
			this.execute(opt);
			
		},
		onSuccess : function (status, res) {
			// console.loglog('AbsApi Success status', status);
			var options = this.options;
			this.callbackSucesssFunc(status, res, options);
			
		},
		beforeExecute : function () {
//			console.log('before Execute...');
		}
	});
	
	$statsPotal.api = function (opt) {
		return new $statsPotal.Api(opt);
	};
	/** ********* $statsPotal API 추상클래스 정의 END ********* */
	
	/** ********* $statsPotal KOSIS API 정의 START ********* */
	$statsPotal.Api.Kosis = $statsPotal.Api.extend({
		isAccessToken : false
	});
	
	$statsPotal.api.kosis = function (opt) {
		return new $statsPotal.Api.Kosis(opt);
	};
	/** ********* $statsPotal KOSIS API 정의 END ********* */
	
	/** ********* $statsPotal thematicMap API 정의 START ********* */
	$statsPotal.Api.ThematicMap = {};
	$statsPotal.api.thematicMap = {};
	
	$statsPotal.Api.ThematicMap.GetStatsThemeMapParamInfo = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/GetStatsThemeMapParamInfo'
	});
	
	$statsPotal.api.thematicMap.getStatsThemeMapParamInfo = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetStatsThemeMapParamInfo(opt);
	};
	
	$statsPotal.Api.ThematicMap.AddStatsThemeMapParamInfo = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/AddStatsThemeMapParamInfo'
	});
	
	$statsPotal.api.thematicMap.addStatsThemeMapParamInfo = function (opt) {
		return new $statsPotal.Api.ThematicMap.AddStatsThemeMapParamInfo(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetStatsThemeMapList = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/GetStatsThemeMapList'
	});
	
	$statsPotal.api.thematicMap.getStatsThemeMapList = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetStatsThemeMapList(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetCategoryList = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/GetCategoryList'
	});
	
	$statsPotal.api.thematicMap.getCategoryList = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetCategoryList(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetCategory = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/GetCategory'
	});
	
	$statsPotal.api.thematicMap.getCategory = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetCategory(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetStatsThemeMapListByThematicId = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/GetStatsThemeMapListByThematicId'
	});
	
	$statsPotal.api.thematicMap.getStatsThemeMapListByThematicId = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetStatsThemeMapListByThematicId(opt);
	};
	
	$statsPotal.Api.ThematicMap.GetAllCategoryAndMenu = $statsPotal.Api.extend({
		isAccessToken : false,
		url : '/ServiceAPI/thematicMap/GetAllCategoryAndMenu'
	});
	
	$statsPotal.api.thematicMap.getAllCategoryAndMenu = function (opt) {
		return new $statsPotal.Api.ThematicMap.GetAllCategoryAndMenu(opt);
	};
	
	//행사정보	
//	$statsPotal.Api.ThematicMap.GetAreaEvent = $statsPotal.Api.extend({
//		isAccessToken : false,
//		url : '/ServiceAPI/bizStats/areaevent.json'
//	});
//	
//	$statsPotal.api.thematicMap.getAreaEvent = function (opt) {
//		return new $statsPotal.Api.ThematicMap.GetAreaEvent(opt);
//	};
	
	/** ********* $statsPotal thematicMap API 정의 END ********* */
	
	/** ********* $statsPotal Boundary API 정의 START ********* */
	$statsPotal.Api.Boundary = {};
	$statsPotal.api.boundary = {};
	
	$statsPotal.Api.Boundary.Hadmarea = $statsPotal.Api.extend({
		host : openApiPath.substring(0, 22),
		url : openApiPath + '/OpenAPI3/boundary/hadmarea',
		datatype : 'geojson'
	});
	
	$statsPotal.api.boundary.hadmarea = function (opt) {
		return new $statsPotal.Api.Boundary.Hadmarea(opt);
	};
	
	$statsPotal.Api.Boundary.Statsarea = $statsPotal.Api.extend({
		host : openApiPath.substring(0, 22),
		url : openApiPath + '/OpenAPI3/boundary/statsarea',
		datatype : 'geojson'
	});
	
	$statsPotal.api.boundary.statsarea = function (opt) {
		return new $statsPotal.Api.Boundary.Statsarea(opt);
	};
	
	$statsPotal.Api.Boundary.Basearea = sop.Api.extend({
		url : '/OpenAPI3/boundary/basearea'
	});
	
	$statsPotal.api.boundary.basearea = function (opt) {
		return new $statsPotal.Api.Boundary.Basearea(opt);
	};
	
	$statsPotal.Api.Boundary.Userarea = sop.Api.extend({
		url : '/OpenAPI3/boundary/userarea'
	});
	
	$statsPotal.api.boundary.userarea = function (opt) {
		return new $statsPotal.Api.Boundary.Userarea(opt);
	};
	
	/** ********* $statsPotal thematicMap API 정의 END ********* */
	
	/** ********* $statsPotal 리버스 지오코드 API 정의 START ********* */
	$statsPotal.Api.Geo = {};
	$statsPotal.api.geo = {};
	$statsPotal.Api.Geo.ReverseGeo = $statsPotal.Api.extend({
		host : openApiPath.substring(0, 22),
		url : openApiPath + '/OpenAPI3/addr/rgeocode',
		datatype : 'json'
	});
	
	$statsPotal.api.geo.reverseGeo = function (opt) {
		return new $statsPotal.Api.Geo.ReverseGeo(opt);
	};
	/** ********* $statsPotal 리버스 지오코드 API 정의 END ********* */
	
	/** ********* $statsPotal Poi API 정의 START ********* */
	$statsPotal.Api.Poi = {};
	$statsPotal.api.poi = {};
	
	$statsPotal.Api.Poi.GetPoiInfobyThemecd = $statsPotal.Api.extend({
		host : openApiPath.substring(0, 22),
		url : openApiPath + '/OpenAPI3/stats/companysearch',
		datatype : 'json'
	});
	
	$statsPotal.api.poi.getPoiInfobyThemecd = function (opt) {
		return new $statsPotal.Api.Poi.GetPoiInfobyThemecd(opt);
	};
		
	/** ********* $statsPotal Poi API 정의 END ********* */
	
	/** ********* $statsPotal stats API 정의 START ********* */
	$statsPotal.Api.Stats = {};
	$statsPotal.api.stats = {};
	
	$statsPotal.Api.Stats.GetStatsHouseHold = $statsPotal.Api.extend({
		host : openApiPath.substring(0, 22),
		url : openApiPath + '/OpenAPI3/stats/household',
		datatype : 'json'
	});
	
	$statsPotal.api.stats.getStatsHouseHold = function (opt) {
		return new $statsPotal.Api.Stats.GetStatsHouseHold(opt);
	};
		
	/** ********* $statsPotal stats API 정의 END ********* */
	
}(window, document));
