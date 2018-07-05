<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>분석지도 | 통계지리정보서비스</title>

	<link href="/css/default.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script src="/js/common/common.js"></script>
	
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />

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
				<a href="/view/common/analMapMain"><span class="path_el current">분석지도</span></a>
			</p>
			<h2 class="ctit">분석지도</h2>
			<p class="smr">  지도와 함께 통계를 볼수 있는 공간입니다.</p>
			<div id="contents">
				<div id="content">
	
					<div class="notic_earea">
						<ul>
							<li>
								<p><img src="/img/nm/icon_analysismap_01.png" alt="월간통계" /></p>
								<dl>
									<dt>월간통계</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">소비자물가지수, 실업률 등 월간 주요<br /> 
															서비스입니다.
									</dd>
									<dd>
										<a href="https://analysis.kostat.go.kr/funny_month/month/sta_month_main.do">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li class="last">
								<p><img src="/img/nm/icon_analysismap_02.png" alt="움직이는 인구피라미드" /></p>
								<dl>
									<dt>움직이는 인구피라미드</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">과거 인구에 대한 확정인구와 향후<br />
															인구변동을 고려하여 작성된 장래추계<br />
															변화를 그래프로 보실수 있습니다.

									</dd>
									<dd>
										<a href="https://sgis.kostat.go.kr/jsp/pyramid/pyramid1.jsp">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>								
							</li>
							<li>
								<p><img src="/img/nm/icon_analysismap_03.png" alt="고령화현황보기" /></p>
								<dl>
									<dt>고령화현황보기</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">고령화가 점점 심화 되는 상황에서 현황,  <br />
															추세, 복지 시설에 대한 통계를 확인하실수<br />
															있습니다. 
									</dd>
									<dd>
										<a href="https://analysis.kostat.go.kr/publicsmodel/">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li class="last">								
								<p><img src="/img/nm/icon_analysismap_04.png" alt="성씨분포" /></p>
								<dl>
									<dt>성씨분포</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">전국 및 지역별 성씨분포 인구비율 및 변화를<br />
															시도간 대비할 수 있는 서비스입니다.
									</dd>
									<dd>
										<a href="https://sgis.kostat.go.kr/statbd/family_01.vw">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li style="border-right:1px solid #e1e1e1;">
								<p><img src="/img/nm/icon_analysismap_05.png" alt="지방의변화보기" /></p>
								<dl>
									<!-- mng_s 20170908_김건민 -->
									<dt>지방의 변화보기</dt>
									<!-- mng_e 20170908_김건민 -->
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">통계적으로 지방(시군구)의 변화하는 모습을  <br />
															제공하는 서비스입니다.
									</dd>
									<dd>
										<a href="https://sgis.kostat.go.kr/statbd/future_01.vw">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
	
				</div>
			</div>
		</div>

		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>
</body>
</html>