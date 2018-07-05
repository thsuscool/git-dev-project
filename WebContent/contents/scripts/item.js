 /**
 * itemMap 처리 부분 시작
 * /script/common/stringUtil.js/coMap 함수 변형
 * 통계항목에 맞게 커스터마이징
 *
 * @fileName	: item.js
 * @author		: 정창교
 * @version		: 1.0
 * @since		: 2008-10-07
 */
 
var mainItemTitle = "";
var mainItemType = "";
var mainItemQuery = "";
var mainItemFullTitle = "";
 
// 통계항목 Menu 컨트롤=================================================
var tab1 = true;	// 분류/검색 통계
var tab2 = false;	// 조건검색
var tab3 = false;	// 불러오기
var tab4 = false;	// 추천항목
 
 
function itemMap() {
  // fields
  this.ids				= new Array();	// 통계항목 아이디
  this.titles 		= new Array();	// 제목
  this.types 		= new Array();	// 타입 0:일반통계, 1:고급통계
  this.querys 		= new Array();  // 일반통계 컬럼명, 고급통계 쿼리
  this.fullTitles 	= new Array();	// 툴팁으로 보여지는 전체 타이틀

  this.stat			= new Array();	// 통계정보
  this.gubun		= new Array();	// 구분	INGU, GAGU, COMP 그룹핑 코드
  this.densidty		= new Array();	// 밀도
  this.filter			= new Array();	// 카테고리 => 필터로 수정
  this.years		= new Array();	// 년도 배열 
  this.statEdit	= new Array();	// 수정 통계정보(수정이나 불러오기 할때 필요)  
    
  this.color 		= new Array(); 	// 범례색상
  this.legend		= new Array();	// 범례값
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
  
  this.getLegendAt	= itemMap_getLegendAt;	// 범례정보 get
  this.setLegendAt	= itemMap_setLegendAt;	// 범례정보 set
  this.getColorAt	= itemMap_getColorAt;	// 범례색상 get
  this.setColorAt	= itemMap_setColorAt;	// 범례색상 set
}

/**
 * @type   : method
 * @access : public
 * @object : itemMap
 * @desc   : 새로운 map을 추가한다. 같은 name가 존재할 경우 overwrite한다.
 * @sig    : title, type, query, fullTitle
 * @param  : title required map의 title로 사용할 값
 * @param  : type required map의 type로 사용할 값
 * @param  : query required map의 query로 사용할 값
 * @param  : fullTitle required map의 fullTitle로 사용할 값 
 * @return : 파라미터값
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

// 범례값 getter
function itemMap_getLegendAt(index) {
  return this.legend[index];
}

// 범례값 setter
function itemMap_setLegendAt(index, value) {
  this.legend[index] = value;
}

// 범례색상 getter
function itemMap_getColorAt(index) {
  return this.color[index];
}

// 범례색상 setter
function itemMap_setColorAt(index, value) {
  this.color[index] = value;
}

/**
 * @type   : method
 * @access : public
 * @object : itemMap
 * @desc   : map의 name-value 쌍의 갯수를 알려준다.
 * @return : name-value 쌍의 갯수
 */
function itemMap_size() {
  return this.count;
}

/**
 * @type   : method
 * @access : public
 * @object : itemMap
 * @desc   : map 내의 title 값들을 String으로 환산하여 최대길이를 알려준다.
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
 * @desc   : map 내의 idx 값에 해당되는 데이터를 지운다.
 * @return : 해당하는 데이터를 지우고 지도영역 리스트를 다시 그려준다.
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
 * @desc   : map 내의 name 값에 해당되는 데이터를 지운다.
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
 *  @Description	: 초기화 이벤트
 *  @Input			: type - 0 : 일반, 1: 고급
 *  @Input			: mode - 수정일 경우 mode : edit
 *  @Input			: idx - 수정할 통계항목의 id
 *  @Output			: 없음
 */
function init(type, mode, idx)
{
	if(type == "0" || type == "") {
		document.getElementById("itemFrame").src = '/statistics/flex/item/item.jsp?mode=' + mode + '&idx=' + idx;	
	} else if(type == "1") {
		alert("고급통계 수정");
	}
}

/**
 *  @Description	: 탭 메뉴 이동
 *  @Input			: src - 이동 할 page url
 *	@Input			: tab - tab 번호
 *  @Output			: 없음
 */
var tabNum = '';
function Fn_TabChange(src, tab)
{	
	// 모든 탭 enable = false
	tab1 = false;				
	tab2 = false;
	tab3 = false;
	tab4 = false;
		
	// 선택한 탭 enable = true
	if(tab == "1") tab1 = true;
	else if(tab == "2") tab2 = true;
	else if(tab == "3") tab3 = true;
	else if(tab == "4") tab4 = true;

	tapMenuControl();
	tabNum=tab;
	document.getElementById("itemFrame").src = src;	
}

/**
 *  @Description	: 탭 메뉴 이미지 contrl
 *  @Input			: 없음
 *  @Output			: 없음
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
 *  @Description	: 초기화
 *  @Input			: pageNo - 페이지 번호
 *	@Input			: pageUrl - 페이지 주소 
 *  @Output			: 없음
 */
function Fn_Load(pageNo, pageUrl)
{
	Fn_Search_Url(pageNo, pageUrl);
}

/**
 *  @Description	: 페이지 이동
 *  @Input			: pageNo - 페이지 번호
 *	@Input			: pageUrl - 페이지 주소 
 *  @Output			: 없음
 */
function Fn_GoPage(pageNo, pageUrl)
{
	Fn_Search_Url(pageNo, pageUrl);
}

/**
 *  @Description	: 조회
 *  @Input			: pageNo - 페이지 번호
 *	@Input			: pageUrl - 페이지 주소
 *  @Output			: 없음
 */
function Fn_Search_Url(pageNo, pageUrl)
{	
	if(cfIsNull(pageNo)) pageNo = "1";
	
	var loadRequest = sendHttpRequest("GET", "/statistics/item/" + pageUrl + "?pageNo="+pageNo);	
	var result = cfTrim(loadRequest.responseText);

	document.getElementById("srchList").innerHTML = result;
}

 //-------------------------------------------
 // Flash의 객체를 Return해줌
 //-------------------------------------------
 function getMyApp(appName) 
 {
  // Internet Explorer and Netscape refer to the Flash application 
  // object differently.
  // This function returns the appropriate syntax depending on the browser.
  // 인터넷 익스플로러와 네스케이프는 Flash응용객체를 다르게 참조합니다.
  // 이 함수는 브라우저에 맞게 적당한 참조객체를 리턴해줍니다.(지돌스타)
  if (navigator.appName.indexOf ("Microsoft") !=-1) {	
   return window[appName];
  } else {	 
   return document[appName];
  }
 }
 
/**
 *  @Description	: Flex로 데이터를 전송하는 함수(일반통계)
 *  @Input			: 없음
 *  @Output			: 없음
 */ 
 function sendToFlexItemUserId()
 {
    var sgisMemberId = "Guest"  // 로그인한 사용자면 로그인한 사용자 id를 넣어 주시면 됩니다....

	var msg = getMyApp('SnaItem').sendItemUserid(sgisMemberId); 
 } 

/**
 *  @Description	: Flex로부터 선택한 일반통계 데이터를 받는 함수(일반통계)
 *  @Input			: s1 - m_Step1_SelectIdx
 *  @Input			: s2 - m_Step1_SelectData 
 *  @Input			: s3 - m_Step1_SelectLabel
 *  @Input			: s4 - m_Step2_SelectIdx
 *  @Input			: s5 - m_Step2_SelectData
 *  @Input			: s6 - m_Step2_SelectLabel
 *  @Input			: s7 - m_Step3_SelectIdx
 *  @Input			: s8 - m_Step3_SelectData
 *  @Input			: s9 - m_Step3_SelectLabel
 *  @Output			: 없음
 */
function callbackFromItemValue(s1,s2,s3,s4,s5,s6,s7,s8,s9) {
	mainItemTitle = s9;
	mainItemType = "0"; // 일반통계
	mainItemQuery = s8;
	mainItemFullTitle = s3 + " > " + s6 + " > " + s9;
}

/**
 *  @Description	: 일반통계 메뉴 셋팅
 *  @Input			: 없음
 *  @Output			: 없음
 */
function setMainItemValue() {
	if (mainItemTitle == "")
	{
		alert("통계항목을 선택 하십시오!");		
		return;
	}

	var idx = parent.frmEdit.sIdx.value;
	
	parent.parent.addUserItem(mainItemTitle, mainItemType, mainItemQuery, mainItemFullTitle, idx);	
}

/**
 * 플렉스 에러 때문에 임시로 구현 삭제 예정 
 * Alex
 */
function imsiSetMainItemValue(mainItemTitle, mainItemType, mainItemQuery, mainItemFullTitle) {
	parent.parent.addUserItem(mainItemTitle, mainItemType, mainItemQuery, mainItemFullTitle);	
}

function statValueItemChange(idx, selYear) 
{	
	setCheckedRadioValue(document.selectItem.rSelectItem, idx);
	
	if(mainStatValueMap.size() == 0) return;
	
	// 해당 항목에 적용된 범례 색상
	var color = mainItemMap.getColorAt(idx);
	if(cfIsNull(color)) color = userLegendColor;
	
	// 해당 항목에 적용된 범례 값
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
		fn_openFrame('statItem', '통계 항목 설정', 'single', '/statistics/item/menuItem.jsp?mode=edit&idx=' + idx + '&type=' + type, 'mapCenter', '576,410,,,,,10','max', '0', '', 'change', 'init');
	} else if(type == "1") {
		var src = '/statistics/item/modWeightItem.jsp?mode=edit&idx=' + idx + '&type=' + type + '&arrIdx=' + arrIdx;
		fn_openFrame('modWeightItem', '통계 항목 설정', 'single', src, 'mapCenter', '576,190 	,,,,,10','max', '0', '', 'change', 'init');
	}
}

/**
 *  @Description	: 항목추가 카운터 처리
 *  @Input			: stat - 고급통계항목 stat
 *	@Input			: title - 통계항목 타이틀명
 *  @Output			: "/statistics/item/mostNumerousCount.jsp?title="+title+"&stat="+stat;
 */
function setMostItemValue() {
	var type 				= "";	// 일반통계 0, 고급통계 1
	var title		 		= "";	// 제목
	var item 				= "";	// 일반통계 컬럼명
	var statColumn 	= "";	// 고급통계 컬럼명
	var statValue 	= "";	// 고급통계 값

	for(var i=0; i<mainItemMap.size(); i++) {
	
		var typeValue = mainItemMap.getTypeAt(i);
		
		if(typeValue == "0") {	// 일반통계
			if(i == mainItemMap.size()-1) {		// 마지막일 경우
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
		} else if(typeValue == "1") { // 고급통계
			
			var weightItemArray = dataParser(mainItemMap.getStatEdit(i),"|");			
			
			//korean_age,1,20,1,4,25,만나이,1|sex,5,2,,,,성별,1|marry_status,5,1,,,,혼인상태,
			
			for(var j=0; j<weightItemArray.length; j++) {
				var weightStatArray = dataParser(weightItemArray[j],",");
				
				if(i == mainItemMap.size()-1 && j == weightItemArray.length-1) {		// 마지막일 경우
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
				}	// end of if else - 마지막 구분
				
			}	// end of for - 고급통계 내부에서 컬럼명별로
		}	// end of if else - 일반 고급
	}	// end of for - 전체 등록된 통계항목에 대해서
	
	var param = "?statType=" + type + "&statTitle=" + title + "&statItem=" + item;
	param += "&statColumn=" + statColumn + "&statValue=" + statValue;
	
	var loadRequest = sendHttpRequest("GET", "/statistics/item/mostNumerousCount.jsp"+param);	
	var result = cfTrim(loadRequest.responseText);	
}

/**
 *  @Description	: 일반통계 항목 검색
 *  @Input			: 없음
 *  @Output			: 없음
 */
function searchItem() {
	var searchValue = document.getElementById("searchValue");	
	var itemType = document.getElementById("itemType").value;
	
	if(searchValue.value == "") {
		alert("검색어를 입력해 주세요!");
		searchValue.focus();
		return;
	}
	
	document.getElementById("content").src = "/statistics/item/searchItemResult.jsp?itemType="+itemType+"&searchValue="+ searchValue.value;
}

/**
 *  @Description	: kosis 항목 카운터 처리
 *  @Input			: 없음 
 *  @Output			: 없음
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
 *  @Description	: 해당 통계 항목의 기준년도를 가져오는 함수
 *  @Input			: type - 타입 0 - 일반통계, 1 - 고급통계
 *  @Input			: gubun - 구분 INGU - 인구, GAGU - 가구, COMP - 사업체
 *  @Input			: itemIdentifier - 일반통계 항목 
 *  @Output			: 없음
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
