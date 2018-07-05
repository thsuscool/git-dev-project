<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>활용서비스 | 통계지리정보서비스</title>

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
				<a href="/view/common/serviceMain"><span class="path_el current">활용서비스</span></a>
			</p>
			<h2 class="ctit">활용서비스</h2>
			<p class="smr">  지도와 함께 만들어지는 각종 서비스와 콘텐츠를 제공합니다.</p>
			<div id="contents">
				<div id="content">
	
					<div class="notic_earea">
						<ul>
							<li>
								<p><img src="/img/nm/application_01.png" alt="살고싶은 우리동네" /></p>
								<dl>
									<dt>살고싶은 우리동네</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">사용자 조건에 맞는 주거지역을 추천해 주는<br /> 서비스입니다.</dd>
									<dd>
										<a href="/view/house/houseAnalysisMap">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li class="last">
								<p><img src="/img/nm/application_02.png" alt="우리동네 생활업종" /></p>
								<dl>
									<dt>우리동네 생활업종</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">지역을 검색하고 검색 결과로 나온 지역 종합현황,<br />
															특성 정보 통계를 제공하여  창업의사<br />
															결정을 지원합니다.
									</dd>
									<dd>
										<a href="/view/bizStats/bizStatsMap">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>								
							</li>
							<li>
								<p><img src="/img/nm/application_03.png" alt="지역현안 소통지도" /></p>
								<dl>
									<dt>지역현안 소통지도</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">지역사회 구성원이 직접 참여하여 <br />
															지역사회의 이슈를 찾아내고 통계와 결합해<br />
															커뮤니티 매핑기능을 제공합니다. 
									</dd>
									<dd>
										<a href="/view/community/intro">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li class="last">								
								<p><img src="/img/nm/application_04.png" alt="통계지도체험" /></p>
								<dl>
									<dt>통계지도체험</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">사용자가 능동적으로 직접 참여해, 각종 공간<br />
															데이터를 지도 위에 시각적, 공간적으로 표현<br />
															해 볼 수 있는 서비스입니다.
									</dd>
									<dd>
										<a href="https://sgis.kostat.go.kr/statexp/index.jsp">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<!-- <li>
								<p><img src="/img/nm/application_05.png" alt="우수활용사례" /></p>
								<dl>

									<dt>우수활용사례</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">이용자가 작접 참여해 우수활용사례를 공유하는  <br />
															서비스입니다.
									</dd>
									<dd>
										<a href="/jsp/share/useBoardList.jsp">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li> -->
							<li>
								<p><img src="/img/nm/application_06.png" alt="기술업종통계지도" /></p>
								<dl>

									<dt>기술업종통계지도</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">국민 생활과 밀접한 기술업종에 대한 지역별  <br />
															기술업종의 특성정보를 제공합니다.
									</dd>
									<dd>
										<a href="/view/technicalBiz/technicalBizMap">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li class="last">
								<p><img src="/img/nm/application_07.png" alt="정책통계지도" /></p>
								<dl>

									<dt>정책통계지도</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">지역별 수요변화 및 협업형 정책지도를 통해  <br />
															지역사회의 정책 결정에 도움을 제공합니다.
									</dd>
									<dd>
										<a href="/view/map/policyStaticMap">
											<img src="/img/nm/btn_service2.gif" alt="서비스 바로가기" />
										</a>
									</dd>
								</dl>
							</li>
							<li style="border-right: 1px solid #e1e1e1;">
								<p><img src="/img/nm/application_08.png" alt="통계갤러리" /></p>
								<dl>
									<dt>통계갤러리</dt>
									<dd class="narea_txt01"></dd>
									<dd class="narea_txt02">통계포털의 여러 서비스에서 확인한 통계정보를  <br />
															수집하고, 공유하는 기능을 제공합니다.
									</dd>
									<dd>
										<a href="/view/gallery/resultGallery">
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