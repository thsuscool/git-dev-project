/**
 * 대화형 통계지도 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/10  초기 작성
 * author : 권차욱, 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$technicalBizMapIndustryPopup = W.$technicalBizMapIndustryPopup || {};

	$(document).ready(
		function() {	
	});
	
	$(window).load(function() {
		setTimeout(function() {
			if(window.opener.$technicalBizMap){
				window.opener.$technicalBizMap.ui.openIndustryPopup();
			}
		}, 500);
	});
	
	$technicalBizMapIndustryPopup.ui = {
		delegate : null,
		data : null,
		
		setData : function(data) {
			this.data = data;
			this.drawPopup(data)
		},
		
		drawPopup : function(data) {
			$("#complex_nm").html(data.complex_nm);
			$("#make_purps_chartr").html(data.make_purps_chartr); 
			$("#implementer_mgmt_inst").html(data.implementer_mgmt_inst); 
			$("#lc").html(data.lc); 
			$("#tot_area").html(this.appendCommaToNumber(data.tot_area));
			$("#induty_fac_zone_area").html(this.appendCommaToNumber(data.induty_fac_zone_area));
			$("#support_fac_zone_area").html(this.appendCommaToNumber(data.support_fac_zone_area));
			$("#pub_fac_zone_area").html(this.appendCommaToNumber(data.pub_fac_zone_area));
			$("#green_zone_area").html(this.appendCommaToNumber(data.green_zone_area));
			$("#resid_zone_area").html(this.appendCommaToNumber(data.resid_zone_area));
			$("#etc_zone_area").html(this.appendCommaToNumber(data.etc_zone_area));
			$("#mvn_biz").html(data.mvn_biz); 
			$("#mvn_limit").html(data.mvn_limit); 
			$("#mvn_qualf").html(data.mvn_qualf); 
		},
		
		appendCommaToNumber : function(num) {
			var len, point, str;
			
			if(isNaN(num)) return 0;
			
			num = num + "";
			var tmpNum = null;
			var tmpMod = null;
			var isNagative = false;
			
			if (num.indexOf("-") != -1) {
				isNagative = true;
				num = num.replace("-", "");
			}
			
			if (num.indexOf(".") == -1) {
				tmpNum = num;
			}else {
				tmpNum = num.split(".")[0];
				tmpMod = "." + num.split(".")[1];
			}

			point = tmpNum.length % 3;
			len = tmpNum.length;
			
			str = tmpNum.substring(0, point);
			while (point < len) {
				if (str != "")
					str += ",";
				str += tmpNum.substring(point, point + 3);
				point += 3;
			}

			if (tmpMod != null && tmpMod.length > 0) {
				str = str + tmpMod;
			}
			
			if (isNagative) {
				str = "-" + str;
			}
			return str;
		}
		
	};
	
}(window, document));