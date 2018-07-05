<%
	/**************************************************************************************************************************
	* Program Name  : 갤러리리스트 JSP  
	* File Name     : collectionGallery.jsp
	* Comment       : 
	* History       : 네이버시스템 최재영 2016-08-26
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    
        <%   
		response.setHeader("Cache-Control","no-store");   
		response.setHeader("Pragma","no-cache");   
		response.setDateHeader("Expires",0);   
		if (request.getProtocol().equals("HTTP/1.1")) response.setHeader("Cache-Control", "no-cache");
		
		
	%>   
	
<!-- 
* 메인화면 HTML입니다.
* 
* history : 네이버시스템(주), 1.0, 2016/10/12  초기 작성
* author : 최재영
* version : 1.0
* see : 
*
//-->
<!DOCTYPE html>
<html lang="ko">
<head>
 	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<!--	20170612 문제시 주석 해지 
	<META http-equiv="Expires" content="-1">
	<META http-equiv="Pragma" content="no-cache">
	<META http-equiv="Cache-Control" content="No-Cache">
	 -->
	
	<title>메인 | 통계청SGIS 오픈플랫폼</title>

    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css'>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	<link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery.css" />
    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
	
	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script> 
	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	<script type="text/javascript" src="/js/common/map.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.min.js"></script> 
    <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> 
    <script type="text/javascript" src="/js/plugins/slick.min.js"></script>
	<!-- <script src="/js/gallery/collectionGallery.js"></script> -->
	<script src="/js/gallery/resultGallery.js"></script>
	<script src="/js/interactive/kakao_script_api.js"></script>
	<script src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>

	<script type="text/javascript">
		setTimeout(function(){
			
			$(".serviceLayer").css("position", "fixed");
			$(".serviceLayer").css("left", $(".btnService").offset().left);
			//$(".serviceLayer").css("top", $(".btnService").css("top"));
		},1000);
	</script>

	
</head>

<body>   
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div class="containerBox">  
			<p class="mpGuide">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;>&nbsp;</span></a>
				<a href="/view/gallery/resultGallery"><span class="path_el current">통계 갤러리</span></a>
			</p>
			
			<div class="mpSubTitle">
				<h3>통계 갤러리</h3>
				<p>사용자가 통계 결과를 조합하고 공유하며 함께 소통할 수 있는 서비스입니다.</p> 
			</div>
			
			<div class="gallerySearchBox">
				<div class="selectDiv">
					<a class="selectItem" id="selectTypeItem">제목</a>
					<ul class="selectItemList">
						<li><a>제목</a></li>
						<li><a>작성자</a></li>
						<li><a>해시태그</a></li>
						<!-- <li><a href="javascript:void(0)">해시태그4</a></li> -->
					</ul>
				</div>
				<div class="form"> 
					<input type="text" name="searchWord" id="searchWord" onKeyPress="if(event.keyCode==13){$resultGallery.gallerySearch();}" title="검색" />
					<a onclick="javascript:$resultGallery.gallerySearch();"><img src="/img/ico/ico_search01.png" alt="검색" /></a>
				</div>
				<div id="myStatus" class="gsbRight after"><!-- before:로그인전 / after:로그인후 -->
					<!-- <div class="cycle">My</div>
					<div class="info">
						<p class="p01">정재은</p>
						<p class="p02">
							<span class="t01">갤러리 9개</span>
							<span class="t02">좋아요 30개</span>
						</p>
					</div> -->
				</div>
			</div>
			<div class="galleryCategory">
				<a name="orderSelectList" onclick="$resultGallery.galleryOrderList(this,'dt')" class="on">최신순</a>
				<a name="orderSelectList" onclick="$resultGallery.galleryOrderList(this,'hits')" >조회순</a>
				<a name="orderSelectList" onclick="$resultGallery.galleryOrderList(this,'like')">추천순</a>
				<select id="type" name="type" onchange="$resultGallery.galleryOrderList(this,'type')">
					<option value="ALL">모든 종류</option>
					<option value="1">통계갤러리</option>
					<option value="2">활용사례</option>
				</select>
			</div>
			
			<div class="galleryListTop">
				<span id="nowCount"></span>
				<a id="galleryInsertButton" style="cursor: pointer;">갤러리 등록</a>
			</div>
			
			
			<ul class="galleryListItem">
				<!-- <li>
					<div class="rela"> 
						<img src="/img/ico/ico_ygallery.png" alt="통계갤러리" class="etcTp" />
						<div class="map"><img src="/img/common/testimg01.png" width="100%" height="100%" /></div>
						<div class="maskbox">
							<div class="cont">
								<div class="conBar">
									<p class="t01">경기도 복지시설 분포는?</p>
									<p class="t02">작성일 : 2016.06.05</p>
									<a href="javascript:void(0)" class="num">4</a>
								</div>
								<div class="contEtc">
									<p class="t01">작성자 : 정재은</p>
									<p class="t02">내가 사는 경기도는 복지시설이 성남시에만 올려 있음</p>
								</div>
							</div>
							<div class="tailTxt">2016년 6월5일까지 설문완료</div>
							<div class="tailIcon">
								<span class="t01">50</span>
								<span class="t02">50</span>
								<span class="t03">50</span>
								<span class="t04">#경기도 #복지시설</span>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="rela">
						<img src="/img/ico/ico_bgallery.png" alt="활용갤러리" class="etcTp" />
						<div class="map"><img src="/img/common/testimg01.png" width="100%" height="100%" /></div>
						<div class="maskbox">
							<div class="cont">
								<div class="conBar">
									<p class="t01">경기도 복지시설 분포는?</p>
									<p class="t02">작성일 : 2016.06.05</p>
									<a href="javascript:void(0)" class="num">4</a>
								</div>
								<div class="contEtc">
									<p class="t01">작성자 : 정재은</p>
									<p class="t02">내가 사는 경기도는 복지시설이 성남시에만 올려 있음</p>
								</div>
							</div>
							<div class="tailTxt">2016년 6월5일까지 설문완료</div>
							<div class="tailIcon">
								<span class="t01">50</span>
								<span class="t02">50</span>
								<span class="t03">50</span>
								<span class="t04">#경기도 #복지시설</span>
							</div>
						</div>
					</div>
				</li>
				<li class="on">
					<div class="rela">
						<img src="/img/ico/ico_ygallery.png" alt="통계갤러리" class="etcTp" />
						<div class="map"><img src="/img/common/testimg01.png" width="100%" height="100%" /></div>
						<div class="maskbox">
							<div class="cont">
								<div class="conBar">
									<p class="t01">경기도 복지시설 분포는?</p>
									<p class="t02">작성일 : 2016.06.05</p>
									<a href="javascript:void(0)" class="num">4</a>
								</div>
								<div class="contEtc">
									<p class="t01">작성자 : 정재은</p>
									<p class="t02">내가 사는 경기도는 복지시설이 성남시에만 올려 있음</p>
								</div>
							</div>
							<div class="tailTxt">2016년 6월5일까지 설문완료</div>
							<div class="tailIcon">
								<span class="t01">50</span>
								<span class="t02">50</span>
								<span class="t03">50</span>
								<span class="t04">#경기도 #복지시설</span>
							</div>
						</div>
					</div>
				</li> -->
			</ul>
			
			<!-- <div class="paging">
				<a href="javascript:void(0)"><img src="/img/ico/ico_first01.png" alt="처음" /></a>
				<a href="javascript:void(0)"><img src="/img/ico/ico_prev01.png" alt="이전" /></a>
				<a href="javascript:void(0)">1</a>
				<a href="javascript:void(0)">2</a>
				<a href="javascript:void(0)">3</a>
				<a href="javascript:void(0)">4</a>
				<a href="javascript:void(0)">5</a>
				<a href="javascript:void(0)"><img src="/img/ico/ico_next01.png" alt="다음" /></a>
				<a href="javascript:void(0)"><img src="/img/ico/ico_last01.png" alt="마지막" /></a>
			</div> -->
			<div id="gallery_lists_paging" class="pagenation" style="width: 100%; margin-bottom:50px; text-align:center;">
				<span class="paging"></span>
			</div>	
				 
		</div>   
		
		
		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>
	
	<div id="dialogDiv" class=""></div>
	
	<!-- 갤러리 등록 및 즐겨찾기 -->
	<!-- <div id="insertGalleryDialog" class=""></div> --> 
	
	<%-- <jsp:include page="/view/map/gallaryDialog"></jsp:include> --%>
	
	<script>
			// 2016. 04. 21 j.h.Seok 수정
			 //트위터
			window.twttr = (function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0],
				    t = window.twttr || {};
				  if (d.getElementById(id)) return t;
				  js = d.createElement(s);
				  js.id = id;
				  js.src = "https://platform.twitter.com/widgets.js";
				  fjs.parentNode.insertBefore(js, fjs);
				 
				  t._e = [];
				  t.ready = function(f) {
				    t._e.push(f);
				  };
				 
				  return t;
			}(document, "script", "twitter-wjs"));
			
			window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '893451250742184', //'893451250742184'(상용),//'1516531411965359'(이전),
			      xfbml      : true,
			      version    : 'v2.5'//'v2.4'
			    });
			};

			 //페이스북
			window.facebook =(function(d, s, id){
			     var js, fjs = d.getElementsByTagName(s)[0];
			     if (d.getElementById(id)) {return;}
			     js = d.createElement(s); js.id = id;
			     js.src = "https://connect.facebook.net/ko_KR/sdk.js";
			     fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
			
		</script>
	
</body>
</html>