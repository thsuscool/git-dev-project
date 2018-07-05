/**
 * Created by htkim on 2014-11-10.
 * 빌딩 Shape 데이타를 로딩하여 지도 오버레이 레이어를 이용하여 화면에 나타낸다.
 *
 * name: String 필수
 * url: String 필수
 * Options = {
 * 	sopMap : Object,     // 필수
 * 	$ : jQueryObject,    // 필수
 * 	pathOption: Object,  // 옵션
 * 	successCallback: function // 옵션
 * }
 */

function load(name, url, options) {

	function checkParameter(url, options) {
		var checkVal;

		if (sop === undefined) {
			throw new Error('SOP map is must needed');
		}

		if (sop.Util.typeOf(url) !== 'string') {
			throw new Error('URL is must parameter.');
		}

		checkVal = options.sopMap;

		if (checkVal === undefined || sop.Util.typeOf(checkVal) !== 'object') {
			throw new Error('Incorrect sopMap Parameter.');
		}

		checkVal = options.$;
		if (checkVal === undefined || sop.Util.typeOf(checkVal) !== 'function') {
			throw new Error('Incorrect sopMap Parameter.');
		}
	}

	checkParameter(url, options);

	var $ = options.$, pOption;
//		map = options.sopMap;
//		layerGroup = sop.layerGroup().addTo(map);

	pOption = {
		stroke: true,
		color: 'blue',
		weight: 3,
		opacity: 1,
		fill: true,
		fillColor: 'blue',
		fillOpacity: 0.2
	};

	options.pathOption = sop.Util.extend(pOption, options.pathOption);

	return function () {
		$.ajax({
			url: url,
			data : {sufid:'200709514209561951292550', flr_no:'1'},
			type: 'POST',
			dataType: 'geojson',
			success: function (data, textStatus, jqXHR) {
				console.log('Data: ', data, ' Data success.');
				//data.name = name;

				/*var callback = options.successCallback || function () {};
				callback(data, textStatus, jqXHR, options);*/
			}
		});
	};
}
