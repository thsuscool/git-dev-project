<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
<script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
</head>
<body>
	<!--  팝업 -->
	<div class="dialogGtype"  id="">
		<div class="popGalleryCreateRela">
			<div class="popGalleryCreate">
				<div class="gcLeft t01">
					<div class="gdTitle">
						<div class="t01" id="titleTxt">
<!-- 							본관 성씨의 다양성과 공간분포 연구 -->
						</div>
						<div class="t02">
							<p class="s01" id="regDtTxt">
<!-- 							작성일:2016.06.05 -->
							</p>
							<p class="s02">
								<a onclick="javascript:collectionGallery.getModifyUseCasePage();"><img src="/img/ico/ico_edit01.png" alt="수정" /></a>
								<span>작성자:<span id="writerTxt"></span></span>
							</p>
						</div>
					</div>
					<div class="gdContScrollBox">
						<table style="border:1px;">
							<colgroup>
								<col width="150" />
								<col width="" />
							</colgroup>
							<tr>
								<th>활용자명</th>
								<td id="userName">

								</td>
							</tr>
							<tr>
								<th>구분</th>
								<td id="sectionTxt">
<!-- 									공간통계자료 -->
								</td>
							</tr>
							<tr>
								<th>활용목적</th>
								<td id="usePurposeTxt">
<!-- 									연구자료 -->
								</td>
							</tr>
							<tr>
								<th>활용분야</th>
								<td id="applicationFieldTxt">
<!-- 								경제산업 -->
								</td>
							</tr>
							<tr>
								<th>이용자료(통계청)</th>
								<td id="dataUse1Txt">
<!-- 									2000년 인구센서스 본관 성씨 데이터와 2000년 행정구역 경계 -->
								</td>
							</tr>
							<tr>
								<th>이용자료(타기관)</th>
								<td id="dataUse2Txt">
								<!-- - -->
								</td>
							</tr>
							<tr>
								<th>주요 활용내용</th>
								<td id="contentTxt">
<!-- 									1. 배경 및 목적 -->
<!-- 									<br />성씨 본관은 그 성씨가 시작된 지역이 어느 곳인지 알려주는 정보이다. 2000년 세너스 데이터에 시군구 -->
<!-- 									단위의 본관 성씨별 인구 구성에 대한 데이터가 존재한다.그 정보를 활용해 특정 지역에서 발생된 특정 -->
<!-- 									성씨의 인구가 어느 수준으로 전국적으로 퍼져 나갔는지를 파악하고자 연구를 시작하였다. -->
<!-- 									<br /><br />2. 배경 및 목적 -->
<!-- 									<br />성씨 본관은 그 성씨가 시작된 지역이 어느 곳인지 알려주는 정보이다. 2000년 세너스 데이터에 시군구 -->
<!-- 									단위의 본관 성씨별 인구 구성에 대한 데이터가 존재한다.그 정보를 활용해 특정 지역에서 발생된 특정 -->
<!-- 									성씨의 인구가 어느 수준으로 전국적으로 퍼져 나갔는지를 파악하고자 연구를 시작하였다. -->
<!-- 									<br /><br />3. 배경 및 목적 -->
<!-- 									<br />성씨 본관은 그 성씨가 시작된 지역이 어느 곳인지 알려주는 정보이다. 2000년 세너스 데이터에 시군구 -->
<!-- 									단위의 본관 성씨별 인구 구성에 대한 데이터가 존재한다.그 정보를 활용해 특정 지역에서 발생된 특정 -->
<!-- 									성씨의 인구가 어느 수준으로 전국적으로 퍼져 나갔는지를 파악하고자 연구를 시작하였다. -->
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="useSide t01">
					<p class="gdMapArea">
<!-- 						<img src="/img/pic/pic_testmap02.jpg" width="100%" height="100%" /> -->
<!-- 						<a href="javascript:void(0)" class="gdDownload"><img src="/img/ico/ico_down05.png" alt="다운로드" /></a> -->
					</p> 
					<ul class="gdEtcList">
						<li>
							<span class="t01">사이트 URL</span>
							<a class="t02" id="siteUrlTxt"></a>
						</li>
						<li id="fileList">
							<span class="t01">참고자료</span>
						</li>
					</ul> 
					<div class="gvVote"></div>
					<div class="gvTag"></div>
					<div class="gvIconEventBox">
						<div class="t01">
						</div>
						<div class="t02">
							<a onclick="javascript:collectionGallery.shareInfoOpen();"><img src="/img/ico/ico_share01.png" width="12" /></a>
							<a id="addMyGallery" onclick="javascript:collectionGallery.addMyGallery();"><img src="/img/ico/ico_mydown.png" width="20" /></a>
						</div>
					</div>
					<div class="gvReplyForm">
						<a id="likeInfo" title="추천" onclick="javascript:collectionGallery.clickGalleryLikeInfo();" class="like">좋아요</a>
						<input type="text" id="replyContent"/>
						<a onclick="javascript:collectionGallery.insertGalleryReply();" class="btnGesi">게시</a>
					</div>
					<div class="gvReplyListBox">
						<ul class="gvReplyList">
						</ul>
					</div>
				</div>
			
			</div>
			<a onclick="javascript:collectionGallery.selectGalleryList();" class="rightClose"><img src="/img/ico/ico_close06.png" /></a>
		</div>
		
	</div>
	
	<!-- 공유팝업 -->
		<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
			<div class="topbar">
				<span>조회한 통계결과  URL공유하기</span>
					<a onclick="javascript:collectionGallery.doCancel('sharedlg');">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<label for="urlsubj" class="label">URL 내용 :</label>
						<input type="text" id="urlsubj" class="inp" readonly=readonly />
					</li>
					<li>
						<div style="width:100%;margin:auto 0">
							<table style="margin:auto;width:270px;height:30px;margin-top:10px">
								<tr style="height:30px;line-height:1px;">
									<td valign="middle">
										<a onclick="javascript:collectionGallery.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
									</td>
									<td valign="middle">
										<div id="twitterDiv" style="margin-left:25px;">
											
										</div>
									</td>
									<td valign="middle">
										<div id="facebookDiv">
											<!-- <div class="fb-share-button" data-href="'+urlbox.val()+'" data-layout="button"></div> -->
										</div>
									</td>
								</tr>
							</table>
						</div>
					</li>
				</ul>
				<p class="txt">SGIS+plus 사용자간 통계조회 결과의<br />자유로운 열람이 가능합니다.</p>
				<div class="btnBox">
					<a onclick="javascript:collectionGallery.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
					<a onclick="javascript:collectionGallery.doCancel('sharedlg');" class="btnStyle01">닫기</a>
				</div>
			</div>
		</div>
	<!-- 공유팝업 끝 -->
	
</body>
</html>