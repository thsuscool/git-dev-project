<%
/**************************************************************************************************************************
* Program Name  : SGIS 플러스 소개 JSP  
* File Name     : sopIntro.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>SOP 소개 | 통계지리정보서비스</title>

	<link href="/css/default.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/common/board.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />

<script type="text/javascript">
	$(function(){
		$(document).ready(function() {
			//맨위로 버튼///////
			var scrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
			$("#topScrollTag").css("left", scrollWidthVal)
			$(window).scroll(function(){
			    var currentScrollY = $(this).scrollTop();
			    if(currentScrollY >= 10){
			    	$("#topScrollTag").fadeIn("fast");
			    }else{
			    	$("#topScrollTag").fadeOut("fast");
			    }
			});
		});
		// tabs
		$(".board_tab > a").click(function(){
			console.log("tabs click");
			
			$(".board_tab > a").removeClass("active");
			$(this).addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($(".board_tab > a").index(this)).show();
// 			return false;
		});
	});
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
		<div id="container">
			<p class="path">
                <a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
                <a href="/view/board/sopBoardMain"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a>
                <!-- mng_s 20170908_김건민 -->
                <a href="/view/board/sopIntro"><span class="path_el current">SGIS플러스 소개</span></a>
			</p>
			<h2 class="ctit">SGIS플러스 소개</h2>
			<p class="smr">SGIS플러스는 Statistical Geographic Information Service의 약자로서 통계청이 보유한 인구·가구·주택·사업체 등 공간통계정보와 각종 외부자료를 융·복합하여<br />소지역 공간의사결정을 지원하는 개방형 공간통계정보 플랫폼입니다.</p>
			<div class="board_tab">
				<a href="javascript:;" class="active">SGIS플러스 소개 및 연혁</a> <a href="javascript:;">SGIS플러스 주요 서비스 안내</a>
			</div>
			<!-- mng_e 20170908_김건민 -->
			<div id="contents">
				<div id="content_2">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						<div class="tab_contents">
							<div class="article-list">
							<!-- mng_s 20170908_김건민 -->
								<h3 class="ptit">SGIS플러스 소개</h3>
								<div id="content">
									<div class="pl20 pr20">
										<h4 class="itit">SGIS플러스란?</h4>
										<p class="para mb25">
											SGIS플러스는 SGIS(Statistical Geographic Information Service)를 기반으로 정부3.0의 개방, 공유, 소통, 참여가 가능한 개방형 플랫폼입니다.<br />사용자에게 통계정보와 지리정보를 융·복합하여 새로운 서비스를 만들 수 있는 기반을 지원합니다. 또한, 포털 서비스를 통해 사용자가 직접 플랫폼에서 제공하는 다양한 인터랙티브맵, 통계주제도 등의 다양한 서비스를 이용할 수 있습니다.
										</p>
							<!-- mng_e 20170908_김건민 -->
<!-- 										<h5 class="itit" >사업개요 한단락 소개</h5> -->
<!-- 										<p class="para mb25"> -->
<!-- 											기존 SGIS(Statistical Geographic Information Service)를 기반으로 정부3.0의 개방, 공유, 소통, 참여의 오픈 플랫폼을 제공하여 사용자에게 통계정보와 지리정보를 융합한 신개념 통계 서비스로써 웹 기반의 지도 위 원하는 위치와 범위, 통계조회 조건을 설정하여 일상 생활권범위의 센서스 통계를 구현하고, 포털서비스를 통해<br /> 새로운 사용자 경험을 제공하고자 합니다. -->
<!-- 											<br /> -->
<!-- 										</p> -->
<!-- 										<h5 class="itit">향후 발전방향</h5> -->
<!-- 										<p class="para mb25"> -->
<!-- 											단순히 서비스만 제공하는 것이 아니라 통계지리정보를 활용한 새로운 지식서비스 모델을 마련하기 위해 SGIS 오픈 플랫폼은 통계청의 통계데이터 뿐만아니라<br />지도데이터 및 다양한 외부 데이터를 함께  융합하여 제공하는 것을 목표로 데이터의 개방, 공유, 소통을 위한 오픈 플랫폼을 구축을 위해 모바일 기반의 서비스로<br />확장할 계획입니다. -->
<!-- 											<br /> -->
<!-- 										</p> -->
<!-- 										<h5 class="itit">사업목표 및 기대효과</h5> -->
<!-- 										<p class="para mb25"> -->
<!-- 											1.	사용자 경험 중심의 맞춤형 통계지리정보 서비스 모델 개발<br /> -->
<!-- 											2.	국민 생활과 공공정책 등과 관련하여 실질적인 문제해결을 지원하는 의사결정지원 모델 개발<br /> -->
<!-- 											3.	지도 기반 주제별 통계 정보를 바탕으로 이용자들간 자유로운 의사소통이 가능한 모델 개발<br /><br /> -->
<!-- 										</p> -->
										
										<h4 class="itit">개념도</h4>
										<img width=840 src="/img/board/sop_intro_img01.png" alt="사용자 참여, 개방 및 공유, 정보융합을 3대 축으로 한 위치기반 국민생활 데이터 허브" />
										<img width=840 src="/img/newhelp/Us_010_01.png" alt="통계지리정보시스템(SGIS플러스)" />
										<p class="para mb25"></p>
										<!-- mng_s 20170908_김건민 -->
										<h4 class="itit">SGIS플러스 연혁</h4>
										<p class="bullet_01_tit mb15">SGIS 연혁</p>
										<div class="ml20 mb20">
											<table class="tbl-normal none-head" summary="SGIS플러스 연혁">
												<caption class="dp-n">SGIS플러스 연혁</caption>
										<!-- mng_e 20170908_김건민 -->
												<colgroup>
													<col style="width: 151px;" /><col />
												</colgroup>
												<tbody>
												<tr>
													<th>2017년</th>
													<td>정책통계지도, 기술업종 통계지도, 통계갤러리, 그리드서비스, 조사업무지원시스템 서비스 개시</td>
												</tr>
												<tr>
													<th>2016년</th>
													<td>살고싶은 우리동네, 지역현안 소통지도, 모바일서비스, 위치기반데이터관리시스템 서비스 개시</td>
												</tr>
												<tr>
													<th>2015년</th>
													<td>SGIS 오픈플랫폼 전국 서비스 실시 - 대화형 통계지도, 통계주제도, 우리동네 생활업종 서비스 개시</td>
												</tr>
												<tr>
													<th>2014년</th>
													<td>SGIS 오픈플랫폼 1단계 구축</td>
												</tr>
												<tr>
													<th>2013년</th>
													<td>SGIS 오픈플랫폼 정보화전략계획(ISP) 추진</td>
												</tr>
<!-- 												<tr> -->
<!-- 													<th>2013년</th> -->
<!-- 													<td>SGIS 서비스 강화, 2011년 기준 사업체 통계 확충</td> -->
<!-- 												</tr> -->
												<tr>
													<th>2012년</th>
													<td>OGC 표준 준수 웹 GIS 엔진 도입, 소지역통계 개편</td>
												</tr>
												<tr>
													<th>2011.12</th>
													<td>통계지도 시계열 서비스, S-통계 네비게이터, 지도로 보는 행정구역 통계 서비스 개시</td>
												</tr>
<!-- 												<tr> -->
<!-- 													<th>2010.01 ~</th> -->
<!-- 													<td>매년 자료 업데이트</td> -->
<!-- 												</tr> -->
												<tr>
													<th>2009.05 ~</th>
													<td>통계지리정보서비스(SGIS) 전국 서비스 실시</td>
												</tr>
												<tr>
													<th>2008.12</th>
													<td>전국 자료 구축 및 시스템 확충</td>
												</tr>
												<tr>
													<th>2007.12</th>
													<td>7개 특, 광역시 서비스 확대</td>
												</tr>
												<tr>
													<th>2006.12</th>
													<td>대전광역시 시범서비스</td>
												</tr>
											</tbody>
										</table></div><br /><br />
<!-- 										<p class="bullet_01_tit mb15">SGIS Open Platform 연혁</p> -->
<!-- 										<div class="ml20 mb40"> -->
<!-- 											<table class="tbl-normal none-head"> -->
<!-- 												<caption class="dp-n">SGIS Open Platform 연혁</caption> -->
<!-- 												<colgroup> -->
<!-- 													<col style="width: 151px;" /><col /> -->
<!-- 												</colgroup> -->
<!-- 												<tbody> -->
<!-- 												<tr> -->
<!-- 													<th>2014.12</th> -->
<!-- 													<td>SGIS OPEN PLATFORM 포털사이트, 우리동네 생활업종 파일럿 서비스 런칭</td> -->
<!-- 												</tr> -->
<!-- 												<tr> -->
<!-- 													<th>2014.04</th> -->
<!-- 													<td>SOP 개발 사업체 선정</td> -->
<!-- 												</tr> -->
<!-- 												<tr> -->
<!-- 													<th>2014.03</th> -->
<!-- 													<td>SOP 사업 공모</td> -->
<!-- 												</tr> -->
<!-- 											</tbody> -->
<!-- 										</table> -->
<!-- 										</div> -->
									</div>
								</div>
							</div>

							<div class="pl20 pr20" style="display: none;">
								<!-- mng_s 20170908_김건민 -->
								<h3 class="ptit">SGIS플러스 서비스 안내</h3>
								<!-- mng_e 20170908_김건민 -->
								<ul class="box_sop_introduce">
									<li>
										<p><img src="/img/nm/nm_picture_renewal_01_1_new.png" alt="대화형 통계지도 안내" />
										
										</p>																			
									</li>
									<li class="last">
										<dl>
											<dt>대화형 통계지도&nbsp;&nbsp;&nbsp;</dt>
											<dd class="introduce_service" >
												<a href="/view/map/interactiveMap"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a>
												<a href="/view/newhelp/in_help_10_0"><img src="/img/nm/btn_intro_service.png" alt="서비스 안내 바로가기" /></a>
											</dd>																						
											<dd class="introduce_sop_txt01">공간통계 정보를 쉽고 빠르게 조회할 수 있습니다.</dd>
											<dd class="introduce_sop_txt02">인구, 주택, 가구, 농림어업, 사업체 센서스 및 행정구역통계 등 <br />다양한 통계항목을 지역단위로 자유롭게 조회할 수 있는<br /> 통계지리정보 서비스입니다.</dd>											
											<dd class="introduce_sop_txt03">다양한 통계항목을 조건별로 세분화하여 사용자 관심항목에 따라<br /> 조회할 수 있습니다.</dd>											
											<dd class="introduce_sop_txt03">원하는 통계 항목을 미리 설정하고 이를 지도상의 지역에 끌어서 <br />놓기(drag&drop) 하는 방식으로  통계 조회가 가능합니다.</dd>
											
<!-- 											<dd class="introduce_sop_txt01">다양하고 복잡한 공간통계 정보를 빠르고 쉽게 조회하는 방법!</dd> -->
<!-- 											<dd class="introduce_sop_txt02">인구, 주택, 가구, 농림어업, 사업체 센서스 통계 및 행정동(KOSIS)<br /> 통계 등 다양한 통계항목을 지역단위로 자유롭게 조회할 수 있는<br /> 새로운 통계지리 정보 서비스입니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">다양한 통계항목을 조건 별로 세분화하여 사용자 관심항목에 따라<br /> 개별 설정 조회가 가능합니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">조회하기 원하는 통계 항목을 미리 설정하고 이를 지도상<br /> 어느 지역에든지 드래그앤드롭 하는 것 만으로 간단히 통계 조회가<br /> 가능합니다.</dd> -->
										</dl>	
									</li>								
									
									<li>
										<p><img src="/img/nm/nm_picture_renewal_02_1_new.png" alt="우리동네 생활업종 안내" /></p>		<!-- 2016.03.18 수정 -->							
									</li>
									
									<li class="last">										
										<dl>
											<dt>우리동네 생활업종</dt>
											<dd class="introduce_service">
												<a href="/view/bizStats/bizStatsMap"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a>
												<a href="/view/newhelp/so_help_10_0"><img src="/img/nm/btn_intro_service.png" alt="서비스 안내 바로가기" /></a>
											</dd>
											<dd class="introduce_sop_txt01">창업 결정에 도움이 될 수 있는 다양한 통계를 조회할 수 있습니다.</dd>
											<dd class="introduce_sop_txt02">창업을 준비하는 사용자에게 유용한 창업관련 통계정보를 다양한<br /> 형태로 제공하는 의사결정지원서비스입니다.</dd>											
											<dd class="introduce_sop_txt03">사용자가 고려할 수 있는 창업 조건을 설정하여, 해당 후보지역을<br /> 검색 할 수 있습니다.</dd>											
											<dd class="introduce_sop_txt03">검색조건을 지도상에 끌어서 놓기(drag&drop)하여 지역의 특성을<br /> 파악하고, 미니맵을 통해 후보지역을 쉽게 이동할 수 있습니다.</dd>
											<dd class="introduce_sop_txt03">지역의 창업 관련 통계데이터를 다양하게 제공하여, 지역 간<br /> 통계정보도 비교할 수 있습니다.</dd>
											
											
<!-- 											<dd class="introduce_sop_txt01">창업 결정에 도움될 수 있는 다양한 통계 조회를 통해 보다 꼼꼼한 창업준비를!</dd> -->
<!-- 											<dd class="introduce_sop_txt02">창업을 준비하는 사용자가 고려하는 창업 조건에 따라 해당되는<br /> 지역을 검색하고, 선택 지역의 창업관련 통계정보를 다양한 형태로<br /> 제공하는 통계청의 첫 번째 대국민 의사결정지원 서비스입니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">창업을 준비하는 사용자가 고려할 수 있는 창업 조건을 설정하여,<br /> 해당 후보지역을 검색 할 수 있습니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">조건버튼 드래그앤드롭으로 지역을 검색하며, 미니맵을 통해<br /> 후보지역을 쉽게 이동하여 통계 조회가 가능하도록 편의성을 더했습니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">지역의 창업 관련 통계데이터의 특성에 따라 다양한 형태로 제공하여,<br /> 지역 간 다양한 창업관련 통계정보를 비교할 수 있습니다.</dd> -->
											
										</dl>
									</li>									
									
									<li>
										<p><img src="/img/nm/nm_picture_renewal_03_1_new.png" alt="통계주제도 안내" /></p>										
									</li>
									
									<li class="last">
										<dl>
											<dt>통계주제도</dt>
											<dd class="introduce_service">
												<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a>
												<a href="/view/newhelp/su_help_10_0"><img src="/img/nm/btn_intro_service.png" alt="서비스 안내 바로가기" /></a>
											</dd>
											<dd class="introduce_sop_txt01">사회적 이슈 및 트렌드를 반영한 주제별 통계를 쉽게 이용 할 수</dd>
											<dd class="introduce_sop_txt01">있습니다.</dd>
											<dd class="introduce_sop_txt02">인구·주거, 복지·문화, 일·산업, 환경·안전의 4가지 카테고리에 따라<br /> 관심 있는 통계를 주제도화한 서비스입니다.</dd>											
											<dd class="introduce_sop_txt03">데이터 분포 조회, 화면분할을 통한 비교, 조회 등 다양한 방식의<br /></dd>
											<dd class="introduce_sop_txt04">통계주제도가 제공됩니다.</dd>											
											
<!-- 											<dd class="introduce_sop_txt01">사회적 이슈, 시대 트렌드를 반영한 주제별 통계지리정보를 한눈에!</dd> -->
<!-- 											<dd class="introduce_sop_txt02">생활과 경제, 문화와 교육, 건강과 복지, 환경과 안전 등 4가지의<br /> 카테고리에 따라 다양한 관점에서 주제화한 통계지리정보 <br />조회 서비스입니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">주제의 특성에 따라 분포를 조회할 수 있는 형태, 분할뷰를 통한<br /> 비교 형태 등 다양한 형태로 주제도를 제공합니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">어디서든지 쉽게 카테고리별 주제도 목록을 조회할 수 있으며<br /> 해당 주제도로의 이동이 자유롭습니다.</dd>											 -->
										</dl>
									</li>
									
									<li>
										<p><img src="/img/nm/nm_picture_renewal_04_1_new.png" alt="개발자 지원 안내" /></p>										
									</li>
									<li class="last">
										<dl>
											<dt>개발지원센터</dt>
											<dd class="introduce_service">
												<a href="javascript:;" onclick="window.open('/developer/html/home.html')" title="새창으로 열림"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a>
												<a href="/view/board/sopDeveloper"><img src="/img/nm/btn_intro_service.png" alt="서비스 안내 바로가기" /></a>
											</dd>
											<dd class="introduce_sop_txt01">개발자들의 놀이터! OpenAPI를 활용해 나의 아이디어를 실현합니다.</dd>
											<dd class="introduce_sop_txt02">지도, 경계, 통계 API를 활용해 다양한 공간통계 서비스 개발이<br /> 가능하도록 풍부한 예시와 함께 사용자 가이드를 제공합니다.</dd>											
											<dd class="introduce_sop_txt03">실시간으로 API 소스를 변경해 보면서 테스트 할 수 있는 환경을<br /> 제공합니다.</dd>										
											
<!-- 											<dd class="introduce_sop_txt01">개발자들의 놀이터! SOP의 API를 활용해 나의 아이디어를 실현하자!</dd> -->
<!-- 											<dd class="introduce_sop_txt02">지도, 경계, 통계 API를 활용해 다양한 공간통계 서비스 개발이<br /> 가능하도록 가이드와 테스트 환경을 제공하는 서비스입니다.</dd>											 -->
<!-- 											<dd class="introduce_sop_txt03">인구, 가구 등 센서스 데이터API를 설명하고 제공합니다.</dd>										 -->
<!-- 											<dd class="introduce_sop_txt03">지도를 활용하기 위한 지도API를 설명하고 제공합니다.</dd>										 -->
<!-- 											<dd class="introduce_sop_txt03">실시간으로 API 테스트가 가능한 샘플 및 테스트 환경을 제공합니다.</dd>											 -->
										</dl>
									</li>
									
									<li>
										<p><img src="/img/nm/nm_picture_renewal_05_1.png" alt="모바일 홈페이지 안내" /></p>							
									</li>
									<li class="last">
										<dl>
											<dt>모바일 홈페이지&nbsp;&nbsp;&nbsp;</dt><br />
											<dd class="introduce_sop_txt01">내 손안의 통계, 통계를 쉽고 편하게 만날수  있습니다.. </dd>
											<dd class="introduce_sop_txt02">내 주변 통계와 홈페이지에서 제공하던 통계주제도, 대화형 통계지도,<br />지역현안 소통지도를 모바일 환경에서 제공합니다.. </dd>											
											<dd class="introduce_sop_txt03">
												<img src="/img/pic/0jx8R.png" alt="모바일 QR code">
											</dd>																						
										</dl>	
									</li>	
									
									<li>
										<p><img src="/img/nm/nm_picture_renewal_06_1.png" alt="지역현안 소통지도 안내" /></p>										
									</li>
									<li class="last">
										<dl>
											<dt>지역현안 소통지도</dt>
											<dd class="introduce_service">
												<a href="/view/community/intro"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a>
												<a href="/view/newhelp/community_help_1"><img src="/img/nm/btn_intro_service.png" alt="서비스 안내 바로가기" /></a>
											</dd>
											<dd class="introduce_sop_txt01">우리 주변의 이슈를 통계로 만들어 지도에 그려보자..</dd>
											<dd class="introduce_sop_txt02">소통지도 개설자는 대화형 통계지도 또는 나의 데이터를 이용해서<br /> 자유롭게 맵을 개설할수 있습니다.</dd>											
											<dd class="introduce_sop_txt03">개설된 소통지도는 지역사회 구성원이 직접 참여해 이슈를 찾아내고,<br /> 객관적인 지표인 관련 통계를 제공하고,<br /> 이를 기반으로 한 커뮤니티 매핑을 가능하게 하는 서비스입니다.</dd>										
										</dl>
									</li>
									
									<li>
										<p><img src="/img/nm/nm_picture_renewal_07_1_new.png" alt="살고싶은 우리동네 안내" /></p>										
									</li>
									<li class="last">
										<dl>
											<dt>살고싶은 우리동네</dt>
											<dd class="introduce_service">
												<a href="/view/house/houseAnalysisMap"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a>
												<a href="/view/newhelp/house_help_10_0"><img src="/img/nm/btn_intro_service.png" alt="서비스 안내 바로가기" /></a>
											</dd>
											<dd class="introduce_sop_txt01">통계에 기반한 주거지 분석서비스 '살고싶은 우리동네'</dd>
											<dd class="introduce_sop_txt02">생활편의 시설 현황, 교육환경 등 27종의 주거지 선정 조건에 해당하는<br /> 추천지역 리스트 및 통계정보를 클릭 몇번으로 확인해보세요.</dd>											
											<dd class="introduce_sop_txt03">원하는 조건에 맞는 주거지역을 추천해주는 서비스입니다.</dd>										
										</dl>
									</li>
																																			
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	 	<!-- 맨위로 버튼 -->
        <a id=topScrollTag href="javascript:window.scroll(0,0)" style="position: fixed; bottom:150px; display:none; border-radius: 5px; width: 50px; height: 50px;cursor: pointer;background-color: #8e787f; opacity: 0.4; filter: alpha(opacity=40);">
        	<img id="topScrollImg" src="/img/ico/arrowup.png" alt="맨위로 가기" />
        </a>
        
		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>