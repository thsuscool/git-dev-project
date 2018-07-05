<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko"> 
<head>
<meta charset="utf-8" />  
<meta name="format-detection" content="telephone=no" /> 
<title>SGIS 통계지리정보서비스</title>         
<link rel="stylesheet" href="/edu/include/css/common.css" type="text/css" /> 
<script type="text/javascript" src="/edu/include/js/ui.js"></script>    
<script type="text/javascript" src="/edu/include/js/common.js"></script>  
</head>  
<body>      

<script type="text/javascript" src="/edu/include/js/header/header.js"></script>

<div class="container sub04"> 
	<ul id="nav">
		<li><a href="#header" class="on">SGIS에듀가 알려주는 사회변화</a></li>
	    <li><a href="#sbox02"></a></li>
	    <li><a href="#sbox03"></a></li>  
	</ul>
	<ul id="btnTop">
		<li><a href="#header" class="btnTop"><img src="/edu/include/img/etc/etc_top.png" alt="Link" /></a></li>
	</ul>

	<div id="sbox01" class="mboxArea sbox01 subtop04"> 
		<!--링크-->
		<div class="saListBox">
			<a href="/edu/jsp/sub01.jsp" class="maList01">저출산 과 고령화문제</a>
			<a href="/edu/jsp/sub02.jsp" class="maList02">대도시 쏠림현상</a>
			<a href="/edu/jsp/sub03.jsp" class="maList03">사회와 가정의 변화</a>
			<a href="/edu/jsp/sub04.jsp" class="maList04">도시성장에 따른 거주공간변화</a>
			<a href="/edu/jsp/sub09.jsp" class="maList09">산업 발달에 따른 지역의 변화</a>
			<a href="/edu/jsp/sub10.jsp" class="maList10">일상생활과 환경 문제</a> 
		</div>
		<ul class="topMenuList">
			<li><a href="#sbox02">도시가 성장하면 도시구조 변화가 생긴다 -> 도심 공동화 현상</a></li>
			<li><a href="#sbox03">지역 간 남녀 성비 비율 및 인구 분포의 불균형</a></li> 
		</ul>
	</div>
	<div id="sbox02" class="mboxArea sbox02 first">
		<div class="cont">
			<p class="subj"><img alt="이미지" src="/edu/include/img/etc/etc_subtxt04.png" /></p>
			<p class="tit">
				<span class="num">1</span>
				<span>도시가 성장하면 도시구조 변화가 생긴다 -> 도심 공동화 현상</span>
			</p>
			<p class="etc">산업화와 도시화가 본격적으로 진행되면서 산업이 발달한 도시로 많은 인구가 유출되면서 많은 변화가 일어났다. 청장년층을 중심으로 인구유출이 일어나면서 인구의 고령화 현상이 야기되며 인구분포의 양극화 현상과 도심의 공동화 현상이 발생하였다.</p>
			 <div style="height: 30px;"></div>
			 <div class="tltle01">SGIS 활용하기</div>
			<!-- 
			<div class="btnbox"><p class="btnCont01">SGIS 활용하기</p></div>
			 -->
			<p class="etc">통계지리정보서비스는 인구와 사업체에 대한 시계열 정보를 보유하고 있으므로 인구 구조의 변화를 지도상에서 확인해 볼 수 있다.</p> 
			<div class="btnbox"><a href="/view/map/interactiveMap/mainIndexView" target="_blank"  class="btnCont02">‘대화형통계지도>총조사 주요지표’ 바로가기</a></div>
			<div class="btnbox"><a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=tzvK4xEuFD20160121115806965LnKnzJtJ7F&theme=CTGR_001&mapType=04"  target="_blank" class="btnCont02 mt20">‘통계주제도>인구와 가구>인구 변화’ 바로가기</a></div>
		</div>
	</div>
	<div class="sbox03">
		 <p class="starTxt">
			<img alt="이미지"  src="/edu/include/img/ico/ico_star.png" />
			<span>전라남도 목포시를 대상으로 읍면동 단위의 인구분포와 인구의 변화를 확인해보도록 한다.</span>
		 </p>
 		 <div style="height: 30px;"></div>
		 <div class="tltle01_2">SGIS 이용법</div>
		 <div style="height: 40px;"></div>
		 <!-- 
		 <div class="btnbox ac"><p class="btnCont01 atype">SGIS 이용법</p></div>
		  -->
		 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/pic_dosiList01.jpg" /></p>
		 <p class="txtCenter">2010년 기준 신도심인 상동과 신흥동 등 지역에 인구가 밀집해 있으며 구도심인 유달동과 만호동의 인구는 작음을 확인할 수 있다.

		 <br /><br />통계버튼 생성 시 기준년도를 2000년으로 설정하면 과거 인구분포를 볼 수 있는데 현재 인구분포와 비교하면 
		 <br />구도심인 유달동의 인구가 아직 빠지기 전이며, 신도심인 상동도 아직 개발되기 전으로 전반적인 인구분포가 고른 것을 확인할 수 있다.</p>

		 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/pic_dosiList02.jpg" /></p>
		 <p class="txtCenter">유달동, 만호동 등 구도심 지역의 도시로의 인구유출로 인구의 감소현상을 확인할 수 있다.</p>
	</div>
	<div id="sbox03" class="mboxArea sbox04">
		<div class="cont">
			<p class="subj"><img alt="이미지"  src="/edu/include/img/etc/etc_subtxt04.png" /></p>
			<p class="tit">
				<span class="num">2</span>
				<span>지역 간 남녀 성비 비율 및 인구 분포의 불균형</span>
			</p>
			<p class="etc">도시화에 따라 기존의 농어촌 인구가 도시로 많이 유입되었지만, 그 중에서도 결혼과 취업으로 젊은 층의 남성보다 여성의 인구가 훨씬 많이 도시로 이동하였다. 연령별 인구 비율을 지역별로 확인해 보자.</p>
		 <div style="height: 30px;"></div>
		 <div class="tltle02">SGIS 활용하기</div>
			<!-- 
			<div class="btnbox"><p class="btnCont01">SGIS 활용하기</p></div>
			 -->
			<p class="etc">통계지리정보서비스는 인구와 사업체에 대한 시계열 정보를 보유하고 있으므로 인구 구조의 변화를 지도상에서 확인해 볼 수 있다. 대화형 통계지도 뿐만 아니라 통계주제도에서 간단히 비교할 수 있다.</p>
			<div class="btnbox"><a href="/view/map/interactiveMap/populationHouseView" target="_blank"  class="btnCont02">‘대화형통계지도>인구주택총조사’ 바로가기</a></div> 
			<div class="btnbox"><a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=qwnF6vrGvI20160121115806975tsn9uJMsrp&theme=CTGR_001&mapType=03" target="_blank"  class="btnCont02 mt20">‘통계주제도>인구와 가구>여자인구 대비 남자인구 비율’ 바로가기</a></div> 
		</div>
	</div>
	<div class="sbox03"> 
		 <p class="starTxt">
			<img alt="이미지"  src="/edu/include/img/ico/ico_star.png" />
			<span>전라남도 목포시를 대상으로 대화형통계지도와 통계주제도를 이용해서 남녀 인구분포 현황을 확인해보도록 한다.</span>
		 </p>
		 		 <div style="height: 30px;"></div>
		 <div class="tltle02_2">SGIS 이용법</div>
		 <div style="height: 40px;"></div>
		 <!-- 
		 <div class="btnbox ac"><p class="btnCont01 btype">SGIS 이용법</p></div>
		  -->
		 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/pic_dosiList03.jpg" /></p>
		 <p class="txtCenter">20세~35세 남자와 여자의 인구 비율을 조회해보면 구도심지에서 남자의 인구가 여자의 인구보다 더 많음을 알 수 있다.</p> 
		 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/pic_dosiList04.jpg" /></p>
		 <p class="txtCenter">구도심 지역이 신도심 지역보다 남자인구 비율이 높은 것을 알 수 있다.</p> 
	</div> 
	 

</div><!-- end cls:wrapper-->
 
 

</body>
</html> 