<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%   
		response.setHeader("Cache-Control","no-store");   
		response.setHeader("Pragma","no-cache");   
		response.setDateHeader("Expires",0);   
		if (request.getProtocol().equals("HTTP/1.1")) response.setHeader("Cache-Control", "no-cache");
	%>
	
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<META http-equiv="Expires" content="-1"> 
<META http-equiv="Pragma" content="no-cache"> 
<META http-equiv="Cache-Control" content="No-Cache"> 
<title>Insert title here</title>
</head>
<script type="text/javascript" src="/js/gallery/galleryAdd.js"></script>
<script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
<body>
				<!-- gallery pop 2 start-->
				<div id="myGalleryDialog" style="" class="dialogGtype"
					style="z-index: 20001;">
					<div class="popUseCasesRela">
						<div class="popUseCases">
							<div class="usecLeft">
								<p class="useTit">갤러리 등록</p>
								<p class="useTxt">기존 서비스를 활용하여 갤러리를 등록하는 서비스입니다.</p>
								<ul class="ulIconList">
									<li class="b01" onclick="$galleryAdd.writeGalleryPopOpen();">
										<p class="t01">갤러리 등록</p>
										<p class="t02">갤러리를 등록할 수 있는 페이지로 이동합니다.</p>
									</li>
									<li class="b02" onclick="location.href='/view/gallery/bookMarkGallery'">
										<p class="t01">즐겨찾기로 이동</p>
										<p class="t02">기존에 저장해둔 목록을 활용할 수 있는 페이지로 이동합니다.</p>
									</li>
								</ul>
								<p class="useTailsubj">기존 서비스를 조회하여 갤러리 등록</p>
								<ul class="utIconList">
									<li><a href="/view/technicalBiz/technicalBizMap"><img
											src="/img/ico/ico_utIconList01.png" alt="기술업종 통계지도" /></a></li>
									<li><a href="/view/map/interactiveMap"><img
											src="/img/ico/ico_utIconList02.png" alt="대화형 통계지도" /></a></li>
									<li><a href="/view/house/houseAnalysisMap"><img
											src="/img/ico/ico_utIconList03.png" alt="살고싶은 우리동네" /></a></li>
									<li><a href="/view/bizStats/bizStatsMap"><img
											src="/img/ico/ico_utIconList04.png" alt="우리동네 생활업종" /></a></li>
									<li><a href="/view/thematicMap/categoryList"><img
											src="/img/ico/ico_utIconList05.png" alt="" /></a></li>
								</ul>
							</div>
							<div class="usecRight">
								<p class="useTit">활용 사례 등록</p>
								<p class="useTxt">이용자가 직접 통계정보를 수급하고 활용사례를 공유하는 서비스입니다.</p>
								<ul class="ulIconList01">
									<li class="b01" onclick="$galleryAdd.writeGalleryUseCase();">
										<p class="t01">활용 사례 등록</p>
										<p class="t02">이용자가 자료를 제공받아 활용한 사례를 등록하는 페이지로 이동합니다.</p>
									</li>
								</ul>
								<p class="useTailsubj" style="font-size:11px;">*자료신청 및 OpenAPI 신청을 통해 활용사례를 등록해주세요.</p>
								<ul class="utIconList01">
									<li><a onclick="javascript:$galleryAdd.goApplyData();"><img
											src="/img/ico/ico_utIconList06.png" alt="자료신청" /></a></li>
									<li><a onclick="javascript:$galleryAdd.goApplyOpenApi();"><img
											src="/img/ico/ico_utIconList07.png" alt="Open API 신청" /></a></li>
								</ul>
							</div>
						</div>
						<a class="rightClose" onclick="$('#myGalleryDialog').hide();"><img
							src="/img/ico/ico_close06.png" /></a>
					</div>
				</div>
				<!-- gallery pop 2 end-->
				<!-- gallery pop 3 start-->
				<form id="gallerySaveForm" method="post"
					enctype="multipart/form-data">
					<div id="galleryWritePop" class="dialogGtype" style="display: none;">
						<div class="popGalleryCreateRela">
							<div class="popGalleryCreate">
								<div class="gcLeft">
									<div class="topForm">
										<input id="gallery_title" name="title" type="text"
											placeholder="제목을 입력하세요." maxlength="100"/>
									</div>
									<div class="gcMap">
										<div id="mapArea"
											style="background-image: url('/img/pic/pic_testmap02.jpg');background-size: 100% 100%">
											<!-- <img src="/img/pic/pic_testmap02.jpg" width="100%" height="100%" /> -->
										</div>
										<a onclick="penCross(this, '.gicobox')" class="btnPen" style="display:none;">연필</a>
										<div class="gicobox">
											<div class="ico" id="iconList">
												<p>아이콘</p>
												<ul>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico01.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico02.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico03.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico04.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico05.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico06.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico07.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico08.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico09.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico10.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico11.png" /></a></li>
													<li><a><img class="imgIcon" src="/img/ico/ico_gico12.png" /></a></li>
												</ul>
											</div>
											<div class="talkArea" id="talkAreaList">
												<p>말풍선</p>
												<ul>
													<li><a><img class="imgTextArea" src="/img/ico/ico_mal01.png" /></a></li>
													<li><a><img class="imgTextArea" src="/img/ico/ico_mal02.png" /></a></li>
												</ul>
											</div>
										</div>
									</div>
									<div class="gcSlideBox" style="width:602px;height:67px;">
										<div style="display: none;">

											<!-- <img id="test01" src="/img/pic/pic_testmap02.jpg" /> -->

										</div>
										<div class="gcSlideArea" id="gcSlideArea">
											<!-- <div class="item" name="slickImage">
												<div class="rela">
													<a href="javascript:void(0)"><img name="slide"
														src="/img/pic/pic_testmap01.png" /></a> <a
														href="javascript:void(0)" class="gdel"
														onclick="galleryItemDel(this);"><img
														src="/img/ico/ico_del02.png" /></a>
												</div>
											</div> -->
											<!-- <div class="item">
												<div class="rela">
													<a href="javascript:void(0)"><img name="slide"
														src="/img/pic/pic_testmap01.png" /></a> <a
														href="javascript:void(0)" class="gdel"
														onclick="galleryItemDel(this);"><img
														src="/img/ico/ico_del02.png" /></a>
												</div>
											</div> -->
										</div>
										<a href="javascript:void(0)" class="gcPrev"><img
											src="/img/ico/ico_left02.png" alt="이전" /></a> <a
											href="javascript:void(0)" class="gcNext"><img
											src="/img/ico/ico_right02.png" alt="다음" /></a>
									</div>
									<a href="javascript:void(0)" class="gadd" onclick="gadd();$galleryAdd.selectBookMarkList();">맵추가</a>
								</div>
								<div class="useSide">
									<div class="contForm">
										<textarea id="applicationContent" name="applicationContent"
											placeholder="내용을 입력하세요.(1000자)"></textarea>
									</div>
									<div class="hashTag">
										<input id="hashTag" type="text" class="tags" value="" />
									</div>
									<p class="usSubj">
										<span>설문조사</span>
									</p>
									<div class="usForm">
										<input name="surveySubject" type="text" placeholder="설문제목" />
									</div>
									<div class="josaListBox">
										<div id="surveyDetail" class="josaListBoxScroll">
											<ul id="surveyDetailUl">
												<li name="ansLi">
													<input type="text" name="ansDetail"  placeholder="항목 입력" value="" />
													<a name="removePoll" onclick="$galleryAdd.removePollDetail(this)" class="itemDel">
														<img src="/img/ico/ico_close03.png" />
													</a>
												</li>
												<li id="surveyAdd_1"><a onclick="javascript:$galleryAdd.addSurveyDetail(1);">+ 항목추가</a></li>
											</ul>
										</div>
										<a class="radioLink" onclick="radioCross(this);" data-event="toggle" id="endSurveyTime">마감시간 설정</a>
										<div class="calendarEtcBox">
											<input id="survey_surv_end_dt" type="text" class="date" />
										</div>
										<a class="radioLink" onclick="radioCross(this);" id="surveyType">복수선택</a>
										<a class="radioLink on" onclick="radioCross(this);" id="publicType">공개여부</a>
									</div>
									<div class="josaListEtcBox">
										<a class="btnGtype on" onclick="$galleryAdd.gallerySaveForm();">갤러리 등록</a> 
										<a class="btnGtype01" onclick="$galleryAdd.writeGalleryHide();">취소</a>
									</div>
								</div>
							</div>
							<a onclick="javascript:$galleryAdd.writeGalleryHide();" class="rightClose"><img src="/img/ico/ico_close06.png" /></a>
						</div>
					</div>
				</form>

				<!-- gallery pop 3 end-->

				<!-- gallery pop Favorite List pop start -->
				<div class="gcFavBox">
					<a class="gcClose" onclick="$('.gcFavBox').hide();$('.fovScrollBox').mCustomScrollbar('destroy');"> 
						<img src="/img/ico/ico_close04.png" />
					</a>
					<div class="rela">
						<p class="gcFavTitle">즐겨찾기 목록</p>
						<table>
							<colgroup>
								<col width="50" />
								<col width="" />
								<col width="100" />
							</colgroup>
							<tr>
								<th>이미지</th>
								<th>제목</th>
								<th>날짜</th>
							</tr>
						</table>
						<div class="fovScrollBox">
							<table id="bookMarkList">
								<colgroup>
									<col width="50" />
									<col width="" />
									<col width="100" />
								</colgroup>
								<tbody></tbody>
							
							</table>
						</div>

						<p class="gcTailTitle">
							기존 서비스 이동 <span>기존 서비스를 조회하여 갤러리 등록</span>
						</p>
						<ul class="gcTailList">
							<li><a href="/view/technicalBiz/technicalBizMap" class="nico01">기술업종
									통계지도</a></li>
							<li><a href="/view/map/interactiveMap" class="nico02">대화형 통계지도</a></li>
							<li><a href="/view/house/houseAnalysisMap" class="nico03">살고싶은
									우리동네</a></li>
							<li><a href="/view/bizStats/bizStatsMap" class="nico04">생활업종
									통계지도</a></li>
							<li><a href="/view/thematicMap/categoryList" class="nico05">통계주제도</a></li>
						</ul>
					</div>
				</div>
				<!-- gallery pop Favorite List pop end -->
			
</body>
</html>