 /**
 * itemMap ó�� �κ� ����
 * /script/common/stringUtil.js/coMap �Լ� ����
 * ����׸� �°� Ŀ���͸���¡
 *
 * @fileName	: item.js
 * @author		: ��â��
 * @version		: 1.0
 * @since		: 2008-10-07
 */
 
var mainItemTitle = "";
var mainItemType = "";
var mainItemQuery = "";
var mainItemFullTitle = "";
 
// ����׸� Menu ��Ʈ��=================================================
var tab1 = true;	// �з�/�˻� ���
var tab2 = false;	// ���ǰ˻�
var tab3 = false;	// �ҷ�����
var tab4 = false;	// ��õ�׸�
 
 
function itemMap() {
  // fields
  this.ids				= new Array();	// ����׸� ���̵�
  this.titles 		= new Array();	// ����
  this.types 		= new Array();	// Ÿ�� 0:�Ϲ����, 1:������
  this.querys 		= new Array();  // �Ϲ���� �÷���, ������ ����
  this.fullTitles 	= new Array();	// �������� �������� ��ü Ÿ��Ʋ

  this.stat			= new Array();	// �������
  this.gubun		= new Array();	// ����	INGU, GAGU, COMP �׷��� �ڵ�
  this.densidty		= new Array();	// �е�
  this.filter			= new Array();	// ī�װ� => ���ͷ� ����
  this.years		= new Array();	// �⵵ �迭 
  this.statEdit	= new Array();	// ���� �������(�����̳� �ҷ����� �Ҷ� �ʿ�)  
    
  this.color 		= new Array(); 	// ���ʻ���
  this.legend		= new Array();	// ���ʰ�
  this.count 		= 0;

  // methods
  this.put					= itemMap_put;
  this.getIdAt			= itemMap_getIdAt;  
  this.getTitleAt			= itemMap_getTitleAt;
  this.getTypeAt			= itemMap_getTypeAt;
  this.getQueryAt			= itemMap_getQueryAt;  
  this.getFullTitleAt		= itemMap_getFullTitleAt;  
  this.getStat				= itemMap_getStat;  
  this.getGubun				= itemMap_getGubun;  
  this.getDensidty			= itemMap_getDensidty;  
  this.getFilter				= itemMap_getFilter;  
  this.getYearAt				= itemMap_getYearAt;
  this.getStatEdit			= itemMap_getStatEdit;  
  
  this.size					= itemMap_size;
  this.getMaxTitleLength	= itemMap_getMaxTitleLength;
  this.removeAt				= itemMap_removeAt;
  this.removeAll			= itemMap_removeAll;
  
  this.getLegendAt	= itemMap_getLegendAt;	// �������� get
  this.setLegendAt	= itemMap_setLegendAt;	// �������� set
  this.getColorAt	= itemMap_getColorAt;	// ���ʻ��� get
  this.setColorAt	= itemMap_setColorAt;	// ���ʻ��� set
}

/**
 * @type   : method
 * @access : public
 * @object : itemMap
 * @desc   : ���ο� map�� �߰��Ѵ�. ���� name�� ������ ��� overwrite�Ѵ�.
 * @sig    : title, type, query, fullTitle
 * @param  : title required map�� title�� ����� ��
 * @param  : type required map�� type�� ����� ��
 * @param  : query required map�� query�� ����� ��
 * @param  : fullTitle required map�� fullTitle�� ����� �� 
 * @return : �Ķ���Ͱ�
 */
function itemMap_put(id, title, type, query, fullTitle, stat, gubun, densidty, filter, year,statEdit) 
{
// alert(id + "\ntitle:"+title+"\ntype:"+type+"\nquery:"+query+"\nfullTitle:"+fullTitle+"\nstat:"+stat+"\ngubun:"+gubun+"\ndensidty:"+densidty+"\nfilter:"+filter+"\nyear:"+year)

  	for (var i = 0; i < this.count; i++) 
  	{
	    if (this.ids[i] == id) {
	    	this.titles[i]		= title;
	      this.types[i] 		= type;
	      this.querys[i] 		= query;
	      this.fullTitles[i] 	= fullTitle;
	      this.stat[i] 			= stat;
	      this.gubun[i] 		= gubun;
	      this.densidty[i] 		= densidty;
	      this.filter[i] 		= filter;
	      this.years[i] 		= year;
	      this.statEdit[i] 		= statEdit;
	      return;
	    }
	}

	this.ids[this.count]		= id;
  	this.titles[this.count] 	= title;
  	this.types[this.count] 		= type;
  	this.querys[this.count] 	= query; 
  	this.fullTitles[this.count] = fullTitle; 
  	this.stat[this.count] 		= stat; 
  	this.gubun[this.count] 		= gubun; 
  	this.densidty[this.count] 	= densidty; 
  	this.filter[this.count] 	= filter; 
  	this.statEdit[this.count] 		= statEdit;   	
  	this.years[this.count++]	= year;
}

// itemMap getter
function itemMap_getIdAt(index) {
  return this.ids[index];
}

function itemMap_getTitleAt(index) {
  return this.titles[index];
}

function itemMap_getTypeAt(index) {
  return this.types[index];
}

function itemMap_getQueryAt(index) {
  return this.querys[index];
}

function itemMap_getFullTitleAt(index) {
  return this.fullTitles[index];
}

function itemMap_getStat(index) {
  return this.stat[index];
}

function itemMap_getGubun(index) {
  return this.gubun[index];
}

function itemMap_getDensidty(index) {
  return this.densidty[index];
}

function itemMap_getFilter(index) {
  return this.filter[index];
}

function itemMap_getYearAt(index) {
  return this.years[index];
}

function itemMap_getStatEdit(index) {
  return this.statEdit[index];
}

// ���ʰ� getter
function itemMap_getLegendAt(index) {
  return this.legend[index];
}

// ���ʰ� setter
function itemMap_setLegendAt(index, value) {
  this.legend[index] = value;
}

// ���ʻ��� getter
function itemMap_getColorAt(index) {
  return this.color[index];
}

// ���ʻ��� setter
function itemMap_setColorAt(index, value) {
  this.color[index] = value;
}

/**
 * @type   : method
 * @access : public
 * @object : itemMap
 * @desc   : map�� name-value ���� ������ �˷��ش�.
 * @return : name-value ���� ����
 */
function itemMap_size() {
  return this.count;
}

/**
 * @type   : method
 * @access : public
 * @object : itemMap
 * @desc   : map ���� title ������ String���� ȯ���Ͽ� �ִ���̸� �˷��ش�.
 * @return : max name length
 */
function itemMap_getMaxTitleLength() {
  var maxLength = 0;

  for (var i = 0; i < this.count; i++) {
    if (String(this.titles[i]).length > maxLength) {
      maxLength = String(this.titles[i]).length;
    }
  }

  return maxLength;
}

/**
 * @type   : method
 * @access : public
 * @object : itemMap
 * @desc   : map ���� idx ���� �ش�Ǵ� �����͸� �����.
 * @return : �ش��ϴ� �����͸� ����� �������� ����Ʈ�� �ٽ� �׷��ش�.
 */
function itemMap_removeAt(idx) {
	for(var i=idx; i < this.count; i++) {
		if(i == idx) {
		  this.ids[idx]			= null;
		  this.titles[idx] 		= null;
		  this.types[idx] 		= null;
		  this.querys[idx] 		= null;	 		
		  this.fullTitles[idx] 	= null;	 		
		  this.stat[idx]		= null;
		  this.statEdit[idx]		= null;		  
		  this.gubun[idx]		= null;
		  this.densidty[idx]	= null;
		  this.filter[idx]	= null;
		  this.years[idx]		= null;
	  	  this.legend[idx]		= null;
	  	  this.color[idx]		= null;
		} else {
		  this.ids[i-1] 		= this.ids[i];		
		  this.titles[i-1] 		= this.titles[i];
		  this.types[i-1] 		= this.types[i];
		  this.querys[i-1] 		= this.querys[i];			  
		  this.fullTitles[i-1] 	= this.fullTitles[i];	 			
		  this.stat[i-1] 		= this.stat[i];
		  this.statEdit[i-1]	= this.statEdit[i];		  
		  this.gubun[i-1] 		= this.gubun[i];
		  this.densidty[i-1] 	= this.densidty[i];	 		
		  this.filter[i-1] 	= this.filter[i];
		  this.years[i-1] 		= this.years[i];
		  this.legend[i-1]		= this.legend[i];
	  	  this.color[i-1]		= this.color[i];
		}
	}
	this.count--;
  	
  	itemListSetting();
}

/**
 * @type   : method
 * @access : public
 * @object : coMap
 * @desc   : map ���� name ���� �ش�Ǵ� �����͸� �����.
 * @return : result value (true/false)
 */
function itemMap_removeAll() 
{
	for(var i = 0; i < this.count; i++) 
	{
		this.ids[i]			= null;
	  	this.titles[i] 		= null;
	  	this.types[i] 		= null;
	  	this.querys[i] 		= null;	 		
	  	this.fullTitles[i] 	= null;	 		
	  	this.stat[i]		= null;
	  	this.gubun[i]		= null;
	  	this.densidty[i]	= null;
	  	this.filter[i]	= null;
	  	this.years[i]		= null;
	  	this.legend[i]		= null;
	  	this.color[i]		= null;
	  	this.statEdit[i]	= null;	  	
	}
  		
  	this.count = 0;
  	itemListSetting();
}

/**
 *  @Description	: �ʱ�ȭ �̺�Ʈ
 *  @Input			: type - 0 : �Ϲ�, 1: ���
 *  @Input			: mode - ������ ��� mode : edit
 *  @Input			: idx - ������ ����׸��� id
 *  @Output			: ����
 */
function init(type, mode, idx)
{
	if(type == "0" || type == "") {
		document.getElementById("itemFrame").src = '/statistics/flex/item/item.jsp?mode=' + mode + '&idx=' + idx;	
	} else if(type == "1") {
		alert("������ ����");
	}
}

/**
 *  @Description	: �� �޴� �̵�
 *  @Input			: src - �̵� �� page url
 *	@Input			: tab - tab ��ȣ
 *  @Output			: ����
 */
var tabNum = '';
function Fn_TabChange(src, tab)
{	
	// ��� �� enable = false
	tab1 = false;				
	tab2 = false;
	tab3 = false;
	tab4 = false;
		
	// ������ �� enable = true
	if(tab == "1") tab1 = true;
	else if(tab == "2") tab2 = true;
	else if(tab == "3") tab3 = true;
	else if(tab == "4") tab4 = true;

	tapMenuControl();
	tabNum=tab;
	document.getElementById("itemFrame").src = src;	
}

/**
 *  @Description	: �� �޴� �̹��� contrl
 *  @Input			: ����
 *  @Output			: ����
 */
function tapMenuControl()
{
	MM_swapImgRestore();
	MM_swapImage('imgTab1','','/statistics/images/i_menu01.gif',1);	
	MM_swapImage('imgTab2','','/statistics/images/i_menu03.gif',1);
	MM_swapImage('imgTab3','','/statistics/images/i_menu04.gif',1);
	MM_swapImage('imgTab4','','/statistics/images/i_menu02.gif',1);
	
	if (tab1) MM_swapImage('imgTab1','','/statistics/images/i_menu01_on.gif',1);			
	if (tab2) MM_swapImage('imgTab2','','/statistics/images/i_menu03_on.gif',1);	
	if (tab3) MM_swapImage('imgTab3','','/statistics/images/i_menu04_on.gif',1);	
	if (tab4) MM_swapImage('imgTab4','','/statistics/images/i_menu02_on.gif',1);	
}

/**
 *  @Description	: �ʱ�ȭ
 *  @Input			: pageNo - ������ ��ȣ
 *	@Input			: pageUrl - ������ �ּ� 
 *  @Output			: ����
 */
function Fn_Load(pageNo, pageUrl)
{
	Fn_Search_Url(pageNo, pageUrl);
}

/**
 *  @Description	: ������ �̵�
 *  @Input			: pageNo - ������ ��ȣ
 *	@Input			: pageUrl - ������ �ּ� 
 *  @Output			: ����
 */
function Fn_GoPage(pageNo, pageUrl)
{
	Fn_Search_Url(pageNo, pageUrl);
}

/**
 *  @Description	: ��ȸ
 *  @Input			: pageNo - ������ ��ȣ
 *	@Input			: pageUrl - ������ �ּ�
 *  @Output			: ����
 */
function Fn_Search_Url(pageNo, pageUrl)
{	
	if(cfIsNull(pageNo)) pageNo = "1";
	
	var loadRequest = sendHttpRequest("GET", "/statistics/item/" + pageUrl + "?pageNo="+pageNo);	
	var result = cfTrim(loadRequest.responseText);

	document.getElementById("srchList").innerHTML = result;
}

 //-------------------------------------------
 // Flash�� ��ü�� Return����
 //-------------------------------------------
 function getMyApp(appName) 
 {
  // Internet Explorer and Netscape refer to the Flash application 
  // object differently.
  // This function returns the appropriate syntax depending on the browser.
  // ���ͳ� �ͽ��÷η��� �׽��������� Flash���밴ü�� �ٸ��� �����մϴ�.
  // �� �Լ��� �������� �°� ������ ������ü�� �������ݴϴ�.(������Ÿ)
  if (navigator.appName.indexOf ("Microsoft") !=-1) {	
   return window[appName];
  } else {	 
   return document[appName];
  }
 }
 
/**
 *  @Description	: Flex�� �����͸� �����ϴ� �Լ�(�Ϲ����)
 *  @Input			: ����
 *  @Output			: ����
 */ 
 function sendToFlexItemUserId()
 {
    var sgisMemberId = "Guest"  // �α����� ����ڸ� �α����� ����� id�� �־� �ֽø� �˴ϴ�....

	var msg = getMyApp('SnaItem').sendItemUserid(sgisMemberId); 
 } 

/**
 *  @Description	: Flex�κ��� ������ �Ϲ���� �����͸� �޴� �Լ�(�Ϲ����)
 *  @Input			: s1 - m_Step1_SelectIdx
 *  @Input			: s2 - m_Step1_SelectData 
 *  @Input			: s3 - m_Step1_SelectLabel
 *  @Input			: s4 - m_Step2_SelectIdx
 *  @Input			: s5 - m_Step2_SelectData
 *  @Input			: s6 - m_Step2_SelectLabel
 *  @Input			: s7 - m_Step3_SelectIdx
 *  @Input			: s8 - m_Step3_SelectData
 *  @Input			: s9 - m_Step3_SelectLabel
 *  @Output			: ����
 */
function callbackFromItemValue(s1,s2,s3,s4,s5,s6,s7,s8,s9) {
	mainItemTitle = s9;
	mainItemType = "0"; // �Ϲ����
	mainItemQuery = s8;
	mainItemFullTitle = s3 + " > " + s6 + " > " + s9;
}

/**
 *  @Description	: �Ϲ���� �޴� ����
 *  @Input			: ����
 *  @Output			: ����
 */
function setMainItemValue() {
	if (mainItemTitle == "")
	{
		alert("����׸��� ���� �Ͻʽÿ�!");		
		return;
	}

	var idx = parent.frmEdit.sIdx.value;
	
	parent.parent.addUserItem(mainItemTitle, mainItemType, mainItemQuery, mainItemFullTitle, idx);	
}

/**
 * �÷��� ���� ������ �ӽ÷� ���� ���� ���� 
 * Alex
 */
function imsiSetMainItemValue(mainItemTitle, mainItemType, mainItemQuery, mainItemFullTitle) {
	parent.parent.addUserItem(mainItemTitle, mainItemType, mainItemQuery, mainItemFullTitle);	
}

function statValueItemChange(idx, selYear) 
{	
	setCheckedRadioValue(document.selectItem.rSelectItem, idx);
	
	if(mainStatValueMap.size() == 0) return;
	
	// �ش� �׸� ����� ���� ����
	var color = mainItemMap.getColorAt(idx);
	if(cfIsNull(color)) color = userLegendColor;
	
	// �ش� �׸� ����� ���� ��
	var legend = mainItemMap.getLegendAt(idx);
	
	if(cfIsNull(selYear)) {
		if(cfIsNull(legend)) drawLegend(idx, color);
		else drawLegendUser(idx, legend, color);	
	} else {
		if(cfIsNull(legend)) drawLegend(idx, color, selYear);
		else drawLegendUser(idx, legend, color, selYear);		
	}

}

function modItem(idx, type, arrIdx) {
	if(type == "0") {
		fn_openFrame('statItem', '��� �׸� ����', 'single', '/statistics/item/menuItem.jsp?mode=edit&idx=' + idx + '&type=' + type, 'mapCenter', '576,410,,,,,10','max', '0', '', 'change', 'init');
	} else if(type == "1") {
		var src = '/statistics/item/modWeightItem.jsp?mode=edit&idx=' + idx + '&type=' + type + '&arrIdx=' + arrIdx;
		fn_openFrame('modWeightItem', '��� �׸� ����', 'single', src, 'mapCenter', '576,190 	,,,,,10','max', '0', '', 'change', 'init');
	}
}

/**
 *  @Description	: �׸��߰� ī���� ó��
 *  @Input			: stat - �������׸� stat
 *	@Input			: title - ����׸� Ÿ��Ʋ��
 *  @Output			: "/statistics/item/mostNumerousCount.jsp?title="+title+"&stat="+stat;
 */
function setMostItemValue() {
	var type 				= "";	// �Ϲ���� 0, ������ 1
	var title		 		= "";	// ����
	var item 				= "";	// �Ϲ���� �÷���
	var statColumn 	= "";	// ������ �÷���
	var statValue 	= "";	// ������ ��

	for(var i=0; i<mainItemMap.size(); i++) {
	
		var typeValue = mainItemMap.getTypeAt(i);
		
		if(typeValue == "0") {	// �Ϲ����
			if(i == mainItemMap.size()-1) {		// �������� ���
				type += typeValue;
				title += mainItemMap.getTitleAt(i);
				item += mainItemMap.getQueryAt(i);
				statColumn += "NO";
				statValue += "NO";
			} else {
				type += typeValue + ":";
				title += mainItemMap.getTitleAt(i) + ":";
				item += mainItemMap.getQueryAt(i) + ":";
				statColumn += "NO:";
				statValue += "NO:";				
			}		
		} else if(typeValue == "1") { // ������
			
			var weightItemArray = dataParser(mainItemMap.getStatEdit(i),"|");			
			
			//korean_age,1,20,1,4,25,������,1|sex,5,2,,,,����,1|marry_status,5,1,,,,ȥ�λ���,
			
			for(var j=0; j<weightItemArray.length; j++) {
				var weightStatArray = dataParser(weightItemArray[j],",");
				
				if(i == mainItemMap.size()-1 && j == weightItemArray.length-1) {		// �������� ���
					type += typeValue;
					title += weightStatArray[6];
					item += "NO";
					statColumn += weightStatArray[0];
					statValue += weightStatArray[2];
				} else {
					type += typeValue + ":";
					title += weightStatArray[6] + ":";
					item += "NO:";
					statColumn += weightStatArray[0] + ":";
					statValue += weightStatArray[2] + ":";					
				}	// end of if else - ������ ����
				
			}	// end of for - ������ ���ο��� �÷�����
		}	// end of if else - �Ϲ� ���
	}	// end of for - ��ü ��ϵ� ����׸� ���ؼ�
	
	var param = "?statType=" + type + "&statTitle=" + title + "&statItem=" + item;
	param += "&statColumn=" + statColumn + "&statValue=" + statValue;
	
	var loadRequest = sendHttpRequest("GET", "/statistics/item/mostNumerousCount.jsp"+param);	
	var result = cfTrim(loadRequest.responseText);	
}

/**
 *  @Description	: �Ϲ���� �׸� �˻�
 *  @Input			: ����
 *  @Output			: ����
 */
function searchItem() {
	var searchValue = document.getElementById("searchValue");	
	var itemType = document.getElementById("itemType").value;
	
	if(searchValue.value == "") {
		alert("�˻�� �Է��� �ּ���!");
		searchValue.focus();
		return;
	}
	
	document.getElementById("content").src = "/statistics/item/searchItemResult.jsp?itemType="+itemType+"&searchValue="+ searchValue.value;
}

/**
 *  @Description	: kosis �׸� ī���� ó��
 *  @Input			: ���� 
 *  @Output			: ����
 */
function setMostKosisItemValue(title, orgId, tblId, orgNm)
{
	var param = "?title="+title			  
			  + "&orgId=" + orgId
			  + "&tblId=" + tblId
			  + "&orgNm=" + orgNm;
			  
	var loadRequest = sendHttpRequest("GET", "/statistics/item/mostNumerousCount.jsp"+param);	
	var result = cfTrim(loadRequest.responseText);
}

/**
 *  @Description	: �ش� ��� �׸��� ���س⵵�� �������� �Լ�
 *  @Input			: type - Ÿ�� 0 - �Ϲ����, 1 - ������
 *  @Input			: gubun - ���� INGU - �α�, GAGU - ����, COMP - ���ü
 *  @Input			: itemIdentifier - �Ϲ���� �׸� 
 *  @Output			: ����
 */
function setBaseYearItemValue(type, gubun, itemIdentifier)
{
	var year = new Array();
	
	var lm_sURL = "/statistics/item/baseYearListItem.jsp?type=" + type + "&gubun=" + gubun + "&itemIdentifier=" + itemIdentifier;
	var loadRequest = sendHttpRequest("GET", lm_sURL);	
	var lm_oXML = parse(cfTrim(loadRequest.responseText));			
	var nodes = lm_oXML.getElementsByTagName('firstCode');	

 	for (var i = 0; i < nodes.length;i++)
 	{
 		year[i] = nodes[i].getAttribute('value');
 	}
	
	return year;
/*
	var lm_sURL = url + param;
	var loadRequest = sendHttpRequest("GET", lm_sURL);	
	var lm_oXML = parse(cfTrim(loadRequest.responseText));			
	var nodes = lm_oXML.getElementsByTagName('firstCode');
	
 	for (var i = 0; i < nodes.length;i++)
 	{
  		obj.options[i] = new Option(nodes[i].getAttribute('text'));
  		obj.options[i].value = nodes[i].getAttribute("value");
 	}


	var param = "?title="+title			  
			  + "&orgId=" + orgId
			  + "&tblId=" + tblId
			  + "&orgNm=" + orgNm;
			  
	var loadRequest = sendHttpRequest("GET", "/statistics/item/mostNumerousCount.jsp"+param);	
	var result = cfTrim(loadRequest.responseText);
*/	
}
