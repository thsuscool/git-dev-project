<!--
// flash(파일경로, 가로, 세로, 아이디, 배경색, 변수윈도우모드(transparent, opaque), 보안사항(sameDomain, always))
function flash(url,w,h,id,bg,vars,win,allow){
//	alert("url===>"+url+", w===>"+w+", h====> "+h+", id====>"+id+", bg====>"+bg+", vars===>"+vars+", win====>"+win+", allow====>"+allow);

 // 플래시 정의
 var flashStr=
 "<object classid=clsid:d27cdb6e-ae6d-11cf-96b8-444553540000 codebase=http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0 width="+w+" height="+h+" id="+id+" align=middle >"+
 "<param name='allowScriptAccess' value="+allow+" />"+
 "<param name='movie' value='"+url+"' />"+
 "<param name='FlashVars' value='"+vars+"' />"+
 "<param name='wmode' value='"+win+"' />"+
 "<param name='menu' value='false' />"+
 "<param name='quality' value='high' />"+
 "<param name='bgcolor' value='"+bg+"' />"+
 /*"<embed src='"+url+"' FlashVars='"+vars+"' wmode='"+win+"' menu='false' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' name='"+id+"' align='middle' allowScriptAccess='"+allow+"' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+*/
 "</object>";

 // 플래시 출력
 document.write(flashStr);
}

/*
 * var flash_tag = "";
	var browerType="";
	var a,ua=navigator.userAgent;
	this.browser={
			chrome		: (ua.indexOf("Chrome") != -1) ?true:false ,
			konqueror : ((a=ua.split('Konqueror/')[1])?a.split(';')[0]:0)>=3.3 ,
			mozes     : ((a=ua.split('Gecko/')[1])?a.split(" ")[0]:0) >= 20011128 ,
			opera     : (!!window.opera) && ((typeof XMLHttpRequest)=='function') ,
			msie      : (!!window.ActiveXObject)?true:false ,
			netscape	: (ua.indexOf("Navigator") != -1) ?true:false ,
			safari 		: (ua.indexOf("Safari") != -1) ?true:false
		}
	 if(this.browser.msie){
		 browserType = "msie";
	 }
	if (browserType == "msie")

	{

		flash_tag += "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' id='SnaItem' width='519' height='134'>";

		flash_tag += "<param name='wmode' value='transparent' />";

		flash_tag += "<param name='movie' value='http://sgis1.kostat.go.kr/statistics_new/flex/item/SnaItem.swf' />";

		flash_tag += "<param name='quality' value='high' />";

		flash_tag += "<param name='allowScriptAccess' value='sameDomain' />";

		flash_tag += "</object>";

	}

	else

	{

		flash_tag += "<object id='SnaItem' type='application/x-shockwave-flash' data='/statistics_new/flex/item/SnaItem.swf' width='519' height='134'>";

        flash_tag += "<param name='quality' value='high' />";

        flash_tag += "<param name='wmode' value='transparent' />";

        flash_tag += "<param name='allowScriptAccess' value='always' />";

        flash_tag += "<param name='allowFullScreen' value='false' />";

        flash_tag += "<param name='quality' value='high' />";

        flash_tag += "<param name='bgcolor' value='#ffffff' />";

        flash_tag += "<param name='movie' value='http://sgis1.kostat.go.kr/statistics_new/flex/item/SnaItem.swf' />";

        flash_tag += "</object>";

	}

	document.write(flash_tag);

}
*/
function writeFlash(src,width,height,wmode,menu) {
	html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
	html = html + 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+ width + '" height="' + height + '">';
	html = html + '<param name="movie" value="' + src + '">';
	if(wmode != null) {	html = html + '<param name="wmode" value="' + wmode + '">';	}
	if(menu != null) {	html = html + '<param name="menu" value="' + menu+ '">';	}
	html = html + '<param name="quality" value="high">';
	html = html + '<embed src="' + src + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '"></embed>';
	html = html + '</object>';

	document.write(html);		
}
-->