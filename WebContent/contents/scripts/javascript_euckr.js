/*********팝업관련 자바스크립트 소스****************/
function close_layer(num){
  document.getElementById(num).style.display = 'none';

  //쿠키굽기
  setCookie(num, 'done' , 1);
}
function close_layer2(num){
  document.getElementById(num).style.display = 'none';

}
function link_target(url,target){
  if(target=='_blank'){
    window.open(url);
  }else if(target=='_self'){
    location.href=url;
  }else{
    opener.location.href=url;
  }
}
/*********팝업관련 자바스크립트 소스****************/


//글쓰기 경고창 가운데로 띄우는 소스
var popWidth = 500;  //팝업창 가로사이즈
var popHeight = 400; //팝업창 세로사이즈
var center = (screen.width - popWidth)/2;
var middle = (screen.height - popHeight)/2;
var windows = "width="+popWidth+" height="+popHeight+" scrollbars=no toolbar=no left="+center+" top="+middle;


//프린트페이지
function printPage() {
        var t_url = document.URL; // 현재 페이지의 url을 얻어냄

        // url중 불필요한 부분은 잘라냄
        t_url = t_url.substr(t_url.indexOf('/')+1);
        t_url = t_url.substr(t_url.indexOf('/')+1);
        t_url = t_url.substr(t_url.indexOf('/'));

        // 현재 파일명과 뒤의 파라메터부분을 분리함
        opt = t_url.substr(t_url.indexOf('?')+1);
        fn = t_url.substr(0,t_url.lastIndexOf('?'));

// & 로 되어있는 파라메터 구분자를 | 로 바꿈
// 이는 새로운페이지로 넘길때 파라메터값을 충돌(?)을 방지하기 위함
        add = '|';
        out = '&';
        temp = opt;

        while (temp.indexOf(out)>-1) {
                pos= temp.indexOf(out);
                temp = "" + (temp.substring(0, pos) + add + temp.substring((pos + out.length), temp.length));
        }

        opt=temp;

        if( fn.length == 0 )fn=opt;

// 새창을열고 파일명과 request 값을 넘겨줌
        link_page = "/include/print_contents.php?opt="+opt+"&fn="+fn;
    window.open(link_page,"print","width=720,height=700,left=200,top=50,scrollbars=yes,toolbar=no");
}
//프린트페이지


//검색창띄우기
function SearchPage()
{
  var frm = document.search_form;
  if(frm.search_word.value == " 검색어를 입력하세요!") return false;
  if(frm.search_word.value.length < 2) {
    alert("2자 이상 입력하세요");
    return false;
  }
  window.open("http://search.djjunggu.go.kr/RSA/front/Search.jsp?qt="+frm.search_word.value+"&menu="+frm.category.value,"search_form","width = 950, height = 780, scrollbars=yes");
  return false;

}
/* defaultValue 보이기 시작 */
function offmsg(obj){
 if(!obj.value) obj.value=obj.defaultValue;
}
// 클릭시 입력가능한 "" 상태로 변환
function onmsg(obj){
//onFocus="onmsg(this)" onMouseDown="onmsg(this)" onKeydown="onmsg(this)" onBlur="offmsg(this)"
 if(obj.value==obj.defaultValue) obj.value="";
}




//기본함수
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}
//기본함수


function openwin(code,linkurl,width,height,scroll)
{
  /*** 팝업 창 화면 중앙에 오픈시키기**/

  if ( getCookie(code) != "done" )  {
      var str;

      str = "height=" + height + ",innerHeight=" + height;
      str += ",width=" + width + ",innerWidth=" + width;
      if(scroll==1) str += ",scrollbars=yes";
      else str += ",scrollbars=no";

      if (window.screen) {
          var ah = screen.availHeight - 30;
          var aw = screen.availWidth - 10;
          var xc = (aw - width) / 2;
          var yc = (ah - height) / 2;

          str += ",left=" + xc + ",screenX=" + xc;
          str += ",top=" + yc + ",screenY=" + yc;

      }
    //팝업이 없을시 아래 2줄 앞부분을 "//"으로 가려줌
      noticeWindow = window.open(linkurl, code , str);
      //noticeWindow.opener = self;
      noticeWindow.focus();
  }
}

function openwin1(code,linkurl,width,height,scroll)
{
  /*** 팝업 창 화면 중앙에 오픈시키기**/

  if ( getCookie(code) != "done" )  {
      var str;

      str = "height=" + height + ",innerHeight=" + height;
      str += ",width=" + width + ",innerWidth=" + width;
      if(scroll==1) str += ",scrollbars=yes";
      else str += ",scrollbars=no";

      if (window.screen) {
          var ah = screen.availHeight - 30;
          var aw = screen.availWidth - 10;
          var xc = (aw - width) / 2;
          var yc = (ah - height) / 2;

          str += ",left=" + xc + ",screenX=" + xc;
          str += ",top=" + yc + ",screenY=" + yc;

      }
    //팝업이 없을시 아래 2줄 앞부분을 "//"으로 가려줌
      noticeWindow = window.open(linkurl, code , str);
      //noticeWindow.opener = self;
      noticeWindow.focus();
  }
}


function openwin2(code,linkurl,width,height,top,left,scroll)
{

  if ( getCookie(code) != "done" )
  {
     //팝업이 없을시 아래 2줄 앞부분을 "//"으로 가려줌

    str = "scrollbars=yes,width=" + width +", height="+ height +", top="+ top +", left=" + left;

    if(scroll==1) str += ",scrollbars=yes";
    else  str += ",scrollbars=no";
    noticeWindow = window.open(linkurl, code , str);

    //noticeWindow.opener = self;
  }
}




//갤러리 게시판 이미지 확대
function viewImage1(img,W,H){
  str = 'height=' + H + ',innerHeight=' + H;
  str += ',width=' + W + ',innerWidth=' + W;

  if (window.screen) {
    var ah = screen.availHeight - 30;
    var aw = screen.availWidth - 10;
    var xc = (aw - W) / 2;
    var yc = (ah - H) / 2;

    str += ',left=' + xc + ',screenX=' + xc;
    str += ',top=' + yc + ',screenY=' + yc;
    if(scroll==1) str += ',scrollbars=yes';
  }
  img = escape(img);
  imgWin=window.open('/gallery/zoom.html?img='+img,'img',str);
}

function viewImage2(img){
        W=document.imagezoom.winwidth.value;
        H=document.imagezoom.winheight.value;

  str = 'height=' + H + ',innerHeight=' + H;
  str += ',width=' + W + ',innerWidth=' + W;

  if (window.screen) {
    var ah = screen.availHeight - 30;
    var aw = screen.availWidth - 10;
    var xc = (aw - W) / 2;
    var yc = (ah - H) / 2;

    str += ',left=' + xc + ',screenX=' + xc;
    str += ',top=' + yc + ',screenY=' + yc;
    if(scroll==1) str += ',scrollbars=yes';
  }
  img = escape(img);
  imgWin=window.open('zoom.html?img='+img,'img',str);
}




/* 아이프레임 리사이즈 */
function reSize()
{
  var BoardMainFrame = main_contents.document.body;
  var ContentFrame = document.all["main_contents"];

  ContentFrame.style.height = BoardMainFrame.scrollHeight + (BoardMainFrame.offsetHeight - BoardMainFrame.clientHeight);
  ContentFrame.style.width = BoardMainFrame.scrollWidth + (BoardMainFrame.offsetWidth - BoardMainFrame.clientWidth);

}
/* 리사이즈 끝 */




/* e-catalog */
function ecatalogOpen(url)
{
  if(screen.width>1024) openwin1('e_catalog',url,1000,675,0);
  else {
    if(screen.width==1024) window.open(url,"e_catalog","fullscreen,scrollbars=no");
    else alert('브로슈어는 해상도 1024×768 부터 지원이 됩니다.');
  }

}

/* e-catalog */
function ecatalogOpen2(url)
{
  if(screen.width>1024) openwin1('e_catalog',url,600,575,0);
  else {
    if(screen.width==1024) window.open(url,"e_catalog","fullscreen,scrollbars=no");
    else alert('브로슈어는 해상도 1024×768 부터 지원이 됩니다.');
  }

}
/* e-catalog 끝 */



//이미지 바꾸기
function MM_nbGroup(event, grpName) { //v6.0
  var i,img,nbArr,args=MM_nbGroup.arguments;
  if (event == "init" && args.length > 2) {
    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
      nbArr[nbArr.length] = img;
      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
        if (!img.MM_up) img.MM_up = img.src;
        img.src = img.MM_dn = args[i+1];
        nbArr[nbArr.length] = img;
    } }
  } else if (event == "over") {
    document.MM_nbOver = nbArr = new Array();
    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
      nbArr[nbArr.length] = img;
    }
  } else if (event == "out" ) {
    for (i=0; i < document.MM_nbOver.length; i++) {
      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
  } else if (event == "down") {
    nbArr = document[grpName];
    if (nbArr)
      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
    document[grpName] = nbArr = new Array();
    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
      nbArr[nbArr.length] = img;
  } }
}




// 새창띄우기
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

//인쇄 페이지
function printContent(getUrl)
{
  window.open("/_prog/print_contents.php?getUrl="+getUrl,"print","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=655,height=700");
}
//메일 보내기
function sendMail()
{
  m_gubun = bookmark_form.b_gubun.value;
  m_linkid = bookmark_form.b_linkid.value;
  window.open("/_prog/mail/mail.php?m_gubun="+m_gubun+"&m_linkid="+m_linkid,"mail","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=680,height=570");
}
//북마크
function bookMark(getUrl,Title) {

   bookmarkurl= getUrl
    bookmarktitle= Title
        if (document.all)
            window.external.AddFavorite(bookmarkurl,bookmarktitle)
}


// 점선 없애기
function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
//document.onfocusin=bluring;




// 클릭했을때 하단에 내용 펼쳐지기
var old_menu = '';
function menuclick( submenu)
{
if( old_menu != submenu ) {
if( old_menu !='' ) {
old_menu.style.display = 'none';
}
submenu.style.display = 'block';
old_menu = submenu;
} else {
submenu.style.display = 'none';
old_menu = '';
}
}

function doSubMenuClick(menuID, menuName, root, url, parentMenuID, subMenuID){
  document.form1.MENU_ID.value = menuID;
  document.form1.MENU_NAME.value = menuName;
  document.form1.ROOT.value = root;
  document.form1.PARENET_MENU_ID.value = parentMenuID;
  document.form1.SUB_MENU_ID.value = subMenuID;
  document.form1.action = url;
  document.form1.submit();
}

// 쿠키저장
function setCookie( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(name)
{
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0; while(i< clen)
  {
    var j = i + alen;
    if(document.cookie.substring(i,j)==arg)
      {
      var end = document.cookie.indexOf(";",j);
      if(end == -1) end = document.cookie.length;
      return unescape(document.cookie.substring(j,end));
      }
    i=document.cookie.indexOf(" ",i)+1;
    if (i==0) break;
  }
  return null;
}
function skin_color(color)
{
  setCookie( "Skin_Color", color , 1);
  self.location.reload()
}

 /* 스킨저장  */
 function SetSkin(color){
  //alert(color);
  setCookie( "Skin_Color", color , 1);
  self.location.reload()
}
/**********************************************
  - 지도서비스레이어 숨김/보임
  **********************************************/
function clspp(v,code,num){
  document.all(v).style.visibility='hidden';
}

function create_pp(v,url){
  document.all(v).style.visibility='visible';
//  jgmapstory.location.href = url;
}


try {
document.execCommand('BackgroundImageCache', false, true);
} catch(me) {}



/* welfare_05_02.html */
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

/* welfare_04_02.html */
function view_img(img)
{
    document.detail_img.src = img;
}
function view_img2(img)
{
    document.detail_img2.src = img;
}
function view_img3(img)
{
    document.detail_img3.src = img;
}
function view_img4(img)
{
    document.detail_img4.src = img;
}
function view_img5(img)
{
    document.detail_img5.src = img;
}
function view_img6(img)
{
    document.detail_img6.src = img;
}
function view_img7(img)
{
    document.detail_img7.src = img;
}

/* 클릭하면 펼쳐지는 텍스트*/
var old_menu = '';
function menuclick(sm_open)
{
if( old_menu != sm_open ) {
if( old_menu !='' ) {
old_menu.style.display = 'none';
}
sm_open.style.display = 'block';
old_menu = sm_open;
} else {
sm_open.style.display = 'none';
old_menu = '';
}
}


/**만족도평가**/
function menu_e_chk(){

  var chkflag;
    chkflag=0;
  var chk_estimate;
  for(i=0;i<estimate_form.e_score.length;i++)
  {
    chk_estimate = eval('estimate_form.e_score[i].checked');


    if(chk_estimate ==true) {
      chkflag = 1;
      break;
    }

  }
  if(chkflag==0) {
    alert('평가항목을 선택해 주세요');
    return false;
  }
  estimate_form.submit();
}

/**서브플래쉬 하이드**/
function top_flash_hide(num,color){
  var img1 = "<a href='javascript:;' onClick=\"top_flash_show(2,'"+color+"')\" onKeyPress=\"top_flash_show(2,'"+color+"')\"><img src='/images/kr/common/"+color+"/image_show_bt.gif' border='0' alt='이미지보기'></a>";

    document.getElementById('SPAN_ID').style.display = "none";
    document.getElementById('s_right_image_hide').innerHTML =img1;
    setCookie("set_view","none",1);
}

function top_flash_show(num,color){
  var img2 = "<a href='javascript:;' onClick=\"top_flash_hide(1,'"+color+"')\" onKeyPress=\"top_flash_hide(1,'"+color+"')\"><img src='/images/kr/common/"+color+"/image_hide_bt.gif' border='0' alt='이미지감추기'></a>";


    document.getElementById('SPAN_ID').style.display = "block";
    document.getElementById('s_right_image_hide').innerHTML =img2;
    setCookie("set_view","block",1);
}


/*
공통사용함수
셀렉트폼 이동함수 par1 : 폼 par1:셀렉트이름, par3:새창여부 (_blank :새창)
*/
function selectLinks(par1,par2,par3) {

  var Frm_name = par1;
  var Frm_ele = par2;
  var Target = par3;
  var Linkurl = document.forms[Frm_name].elements[Frm_ele].value;
    var open_method = document.forms[Frm_name].target = Target; // 새창뜨기 속성

  if(Target == "_blank") {
    window.open(Linkurl);
  }
  else
  {
    location.href=Linkurl;
  }
}
