<!-- 2017.12.12 [개발팀] 접근성 시정조치 - 불필요한 태그 삭제 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src='/js/plugins/jquery.form.js'></script> <!-- 2017.12.12 [개발팀] 접근성 조치  -->
<script src="/js/gallery/galleryAdd.js"></script> <!-- 2017.12.12 [개발팀] 접근성 조치  -->
<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
				<!-- gallery pop 2 start-->
				<div id="myGalleryDialog" class="dialogGtype"
					style="display: none; z-index: 20001;">
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
									<li class="b02" onclick="location.href='/view/mypage/bookmark'">
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
								<p class="useTailsubj">기존 서비스를 조회하여 활용사례 등록</p>
								<ul class="utIconList01">
									<li><a href="javascript:void(0)"><img
											src="/img/ico/ico_utIconList06.png" alt="자료신청" /></a></li>
									<li><a href="javascript:void(0)"><img
											src="/img/ico/ico_utIconList07.png" alt="Open API 신청" /></a></li>
								</ul>
							</div>
						</div>
						<a href="javascript:$('#myGalleryDialog').hide();" class="rightClose"><img
							src="/img/ico/ico_close06.png"  alt="닫기"/></a>
					</div>
				</div>
				<!-- gallery pop 2 end-->
				<!-- gallery pop 3 start-->
				<form id="gallerySaveForm" method="post"
					enctype="multipart/form-data">
					<div id="galleryWritePop" class="dialogGtype"
						style="display: none;">
						<div class="popGalleryCreateRela">
							<div class="popGalleryCreate">
								<div class="gcLeft">
									<div class="topForm">
										<input id="gallery_title" name="title" type="text" value="" title="제목을 입력하세요"
											placeholder="제목을 입력하세요." maxlength="100"/>
									</div>
									<div class="gcMap">
										<div id="mapArea" style="background-image: url('/img/pic/pic_testmap02.jpg');background-size: 100% 100%;"></div>
											<!-- style="background-image: url('/img/pic/pic_testmap02.jpg'); background-size: 100% 100%">
											<img src="/img/pic/pic_testmap02.jpg" width="100%" height="100%" /> -->

										<a href="javascript:void(0)"
											onclick="penCross(this, '.gicobox')" class="btnPen">연필</a>
										<div class="gicobox">
											<div class="ico" id="iconList">
												<p>아이콘</p>
												<ul>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico01.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico02.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico03.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico04.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico05.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico06.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico07.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico08.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico09.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico10.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico11.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico12.png" alt="아이콘" /></a></li>
												</ul>
											</div>
											<div class="talkArea" id="talkAreaList">
												<p>말풍선</p>
												<ul>
													<li><a href="javascript:void(0)"><img
															class="imgTextArea" src="/img/ico/ico_mal01.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgTextArea" src="/img/ico/ico_mal02.png" alt="아이콘" /></a></li>
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
										<input id="hashTag" type="text" class="tags" value="" title="해시태그" />
									</div>
									<p class="usSubj">
										<span>설문조사</span>
									</p>
									<div class="usForm">
										<input name="surveySubject" type="text" placeholder="설문제목" title="설문제목" />
									</div>
									<div class="josaListBox">
										<div id="surveyDetail" class="josaListBoxScroll">
											<ul id="surveyDetailUl">
												<li> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
													<input type="text" name="ansDetail"  placeholder="항목 입력" value=""  title="항목 입력"/>
													<a href="javascript:void(0)" onclick="$galleryAdd.removePollDetail(this)" class="itemDel"> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
														<img src="/img/ico/ico_close03.png" alt="닫기" />
													</a>
												</li>
												<li id="surveyAdd_1">
													<a href="javascript:$galleryAdd.addSurveyDetail(1)">+ 항목추가</a>
												</li>
											</ul>
										</div>
										<a href="javascript:void(0)" class="radioLink"
											onclick="radioCross(this);" data-event="toggle" id="endSurveyTime">마감시간 설정</a>
										<div class="calendarEtcBox">
											<input id="survey_surv_end_dt" type="text" class="date" title="마감시간 설정" />
										</div>
										<a href="javascript:void(0)" class="radioLink"
											onclick="radioCross(this)" id="surveyType">복수선택</a>
										<a href="javascript:void(0)" class="radioLink on"
											onclick="radioCross(this)" id="publicType">공개여부</a>
											
									</div>
									<div class="josaListEtcBox">
										<a href="javascript:void(0)" class="btnGtype on" onclick="$galleryAdd.gallerySaveForm()">갤러리 등록</a> 
										<a href="javascript:void(0)" class="btnGtype01" onclick="javascript:$galleryAdd.writeGalleryHide();$galleryAdd.deleteCaptureImage();">취소</a>
									</div>
								</div>
							</div>
							<a href="javascript:$galleryAdd.writeGalleryHide();$galleryAdd.deleteCaptureImage();"
								class="rightClose"><img src="/img/ico/ico_close06.png" alt="닫기" /></a>
						</div>
					</div>
				</form>

				<!-- gallery pop 3 end-->

				<!-- gallery pop Favorite List pop start -->
				<div class="gcFavBox">
					<a href="javascript:void(0)" class="gcClose"
						onclick="$('.gcFavBox').hide();$('.fovScrollBox').mCustomScrollbar('destroy');"> <img
						src="/img/ico/ico_close04.png" alt="닫기" />
					</a>
					<div class="rela">
						<p class="gcFavTitle">즐겨찾기 목록</p>
						<table>
							<colgroup>
								<col style="width:50px;" /> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
								<col style="width:auto;" /> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
								<col style="width:100px;" /> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
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
									<col style="width:50px;" /> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
									<col style="width:auto;" /> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
									<col style="width:100px;" /> <!-- 2017.12.12 [개발팀] 접근성 시정 -->
								</colgroup>
								<tbody>
									<tr style="display:none;">
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							
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
