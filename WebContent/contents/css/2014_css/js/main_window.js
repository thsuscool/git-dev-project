function sgis_month(){
	var url = "/contents/flash/news_month.xml";
	sendRequest(callback_month, '', 'GET', url, true, true);
}

function callback_month(oj){

	var reXmlText=strUtilTrim(oj.responseText);
    while(reXmlText.indexOf('\n') > -1 || reXmlText.indexOf('\t') > -1) {
        reXmlText=reXmlText.replace('\n', '').replace('\t', '');
    }
    var lm_oXML = xmlParse(reXmlText);
    var lm_sResultList = lm_oXML.getElementsByTagName("item");    
    var sgis_month = document.getElementById("sgis_month");
    var html = "<ul>";
    var lm_sResult = "";
    for(var i=0; i< lm_sResultList.length; i++){
    	lm_sResult = lm_sResultList.item(i);
    	var title = lm_sResult.getElementsByTagName("title").item(0).firstChild.nodeValue;
    	var url = lm_sResult.getElementsByTagName("url").item(0).firstChild.nodeValue;
    	if(title.length > 20){
    		title = title.substr(0, 19) + ".....";
    	}
    	html = html + "<li><a href='"+url+"' target='_blank' >"+title+"</a></li>";
    }
    html += "</ul>";
    sgis_month.innerHTML = html;
}
function sgis_statbd(){
    
    var url = "/contents/flash/sgis_statbd.xml";
    sendRequest(callback_statbd, '', 'GET', url, true, true);
}

function callback_statbd(oj){
    var reXmlText=strUtilTrim(oj.responseText);
    while(reXmlText.indexOf('\n') > -1 || reXmlText.indexOf('\t') > -1) {
        reXmlText=reXmlText.replace('\n', '').replace('\t', '');
    }
    var lm_oXML = xmlParse(reXmlText);
    var lm_sResultList = lm_oXML.getElementsByTagName("item");    
    var sgis_statbd = document.getElementById("sgis_statbd");
    var html = "<ul>";
    var lm_sResult = "";
    for(var i=0; i< lm_sResultList.length; i++){
        lm_sResult = lm_sResultList.item(i);
        var title = lm_sResult.getElementsByTagName("title").item(0).firstChild.nodeValue;
        var url = lm_sResult.getElementsByTagName("url").item(0).firstChild.nodeValue;
        if(title.length > 22){
    		title = title.substr(0, 21) + ".....";
    	}
        html = html + "<li><a href='"+url+"' >"+title+"</a></li>";
    } 
    html += "</ul>";
    sgis_statbd.innerHTML = html;
}

function sgis_oa(){
	
	var url = "/contents/flash/sgis_oa.xml";
	sendRequest(callback_sgisnavigator, '', 'GET', url, true, true);
}

function callback_sgisnavigator(oj){
	var reXmlText=strUtilTrim(oj.responseText);
    while(reXmlText.indexOf('\n') > -1 || reXmlText.indexOf('\t') > -1) {
        reXmlText=reXmlText.replace('\n', '').replace('\t', '');
    }
    var lm_oXML = xmlParse(reXmlText);
    var lm_sResultList = lm_oXML.getElementsByTagName("item");    
    var sgis_navigator = document.getElementById("sgis_oa");
    var html = "<ul>";
    var lm_sResult = "";
    for(var i=0; i< lm_sResultList.length; i++){
    	lm_sResult = lm_sResultList.item(i);
    	var title = lm_sResult.getElementsByTagName("title").item(0).firstChild.nodeValue;
    	var url = encodeURI(lm_sResult.getElementsByTagName("url").item(0).firstChild.nodeValue);
    	url += "&initCode=" + dongCd;
    	if(title.length > 22){
     		title = title.substr(0, 21) + ".....";
     	}
    	html = html + "<li><a href='"+url+"'>"+title+"</a></li>";
    } 
    html += "</url>";
    sgis_navigator.innerHTML = html;
    
}
function xmlParse(xml) {

    var dom;
    try {
      if(window.ActiveXObject){
        dom = new ActiveXObject("Microsoft.XMLDOM");
      }else{
        dom = document.implementation.createDocument("","",null);
      }

        dom.async = false;
        dom.loadXML(xml);
    } catch (error) {
        try { 
            var parser = new DOMParser();
            dom = parser.parseFromString(xml, "text/xml");
            delete parser;
        } catch (error2) {
            if (error2)
                alert("XML parsing is not supported.");
        }
    }
    return dom;
}

function strUtilTrim(pm_sStr){
 	return pm_sStr.replace(/^\s+|\s+$/g,"");
}