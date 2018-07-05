/**
 * Created by shkim on 2014-07-16.
 */
/**
 * Durin onm override */
(function() {
	$class("sop.portal.absAPI").extend($d.api.ajaxAPI).define({

		onBlockUIPopup: function() {
			this.blockUI = document.createElement("DIV");
			this.blockUI.style.backgroundColor = "#D3D3D3";
			this.blockUI.style.border = "0px solid black";
			this.blockUI.style.position = "absolute";
			this.blockUI.style.left = '0px';
			this.blockUI.style.top = '0px';
			if (window.innerHeight == undefined) {
				this.blockUI.style.height = document.body.scrollHeight + 'px';
				this.blockUI.style.width = document.documentElement.clientWidth + 'px';
			} else {
				this.blockUI.style.height = document.body.scrollHeight + 'px';
				this.blockUI.style.width = document.documentElement.clientWidth + 'px';
			}
			this.blockUI.style.zIndex = "10000";
			this.blockUI.style.filter = "alpha(opacity=60);";
			this.blockUI.style.MozOpacity = 0.6;
			this.blockUI.style.opacity = 0.6;
			this.blockUI.style.KhtmlOpacity = 0.6;
			document.body.appendChild(this.blockUI);

			this.popupUI = document.createElement("DIV");

			this.popupUI.style.position = "absolute";
			this.popupUI.style.lineHeight = '50px';
			this.popupUI.style.paddingBottom = '40px';
			this.popupUI.style.width = '100%';
			this.popupUI.style.top = '50%';
			this.popupUI.style.textAlign = 'center';
			this.popupUI.style.left = '0';
			this.popupUI.style.zIndex = "11000";

			var errorMsg = "<img src='/mobile/img/common/loding_type03.gif' style='width:140px;'/>";
			//var errorMsg = "Please Wait...";
			this.popupUI.innerHTML = errorMsg;
			document.body.appendChild(this.popupUI);
		}
	});
}());