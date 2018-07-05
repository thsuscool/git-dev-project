<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
<script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>

</head>
<body>
	<!--  팝업 -->
	<div class="dialogGtype"  id="">
		<div class="popGalleryCreateRela viewType">
			<div class="popGalleryCreate">
				<div class="gcLeft t01">
					<div id="mapArea"class="gviewMap" style="background-image: url('/img/pic/pic_testmap02.jpg'); background-size: 100% 100%" onclick="goImage();">
						<!-- <img id="selectImgIcon" src="/img/pic/pic_testmap02.jpg" width="100%" height="100%" /> -->
						<!-- <a href="javascript:void(0)" class="gvDownload" style="z-index:20002"><img src="/img/ico/ico_down05.png" alt="다운로드" /></a> -->
					</div>
					<!-- <a href="javascript:void(0)"
											onclick="penCross(this, '.gicobox')" class="btnPen">연필</a>
					<div class="gicobox">
						<div class="ico" id="iconList">
							<p>아이콘</p>
							<ul>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico01.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico02.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico03.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico04.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico05.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico06.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico07.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico08.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico09.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico10.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico11.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgIcon" src="/img/ico/ico_gico12.png" /></a></li>
							</ul>
						</div>
						<div class="talkArea" id="talkAreaList">
							<p>말풍선</p>
							<ul>	
								<li><a href="javascript:void(0)"><img class="imgTextArea" src="/img/ico/ico_mal01.png" /></a></li>
								<li><a href="javascript:void(0)"><img class="imgTextArea" src="/img/ico/ico_mal02.png" /></a></li>
							</ul>
						</div>
					</div> -->
										
					
					
					<div class="gvSlideBox" id="imgSlideBox" style="width:602px;height:67px;">
						<div id="gvSlideArea" class="gvSlideArea">
						</div>
						<div class="gvController">
							<a onclick="javascript:$myGallery.playGallery();" class="gvPlay" style="cursor:pointer;"><img src="/img/ico/ico_play.png" alt="재생" /></a>
							<a onclick="javascript:$myGallery.stopPlay();" class="gvStop" style="cursor:pointer;"><img src="/img/ico/ico_stop.png" alt="멈춤" /></a>
						</div>
						<a id="gvPrev" class="gvPrev" style="cursor:pointer;"><img src="/img/ico/ico_left02.png" alt="이전" /></a>
						<a id="gvNext" class="gvNext" style="cursor:pointer;"><img src="/img/ico/ico_right02.png" alt="다음" /></a>
					</div>
				</div>
				<div class="useSide t01">
					<p class="gvTitle gwon01" id="titleTxt"></p><!-- gwon01 ~ gwon05 -->
					<div class="gvInfo">
						<p class="t01" id="regDtTxt"></p>
						<p class="t02">작성자:<span id="writerTxt"></span></p>
						<!-- <a href="javascript:$collectionModify.modifyData();"><img src="/img/ico/ico_edit01.png" alt="수정" /></a> -->
					</div> 
					<div class="gvText" id="postContentTxt">
					</div>
					<div class="gvVote type01" id="gvVote"></div>
					<div class="gvTag" id="gvTag"></div>
					<div class="gvIconEventBox">
						<div class="t01">
						</div>
						<div class="t02">
							<a onclick="javascript:$myGallery.shareInfoOpen();"><img src="/img/ico/ico_share01.png" width="12" /></a>
							<a id="addMyGallery" onclick="javascript:$myGallery.addMyGallery();"><img src="/img/ico/ico_mydown.png" width="20" /></a>
						</div>
					</div>
					<div class="gvReplyForm">
						<a id="likeInfo" onclick="javascript:$myGallery.clickGalleryLikeInfo();" class="like">좋아요</a>
						<input type="text" id="replyContent" />
						<a onclick="javascript:$myGallery.insertGalleryReply();" class="btnGesi">게시</a>
					</div>
					<div class="gvReplyListBox">
						<ul class="gvReplyList">
						</ul>
					</div>
					
					<div class="hashTag t01" style="display:none;">
						<input id="hashTag" type="text" class="tags"/>
					</div>
				</div>
			
			</div>
			<a onclick="javascript:$myGallery.stopPlay();$myGallery.selectGalleryList();" class="rightClose"><img src="/img/ico/ico_close06.png" /></a>
		</div>
		
	</div>
	
	<!-- 공유팝업 -->
		<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
			<div class="topbar">
				<span>조회한 통계결과  URL공유하기</span>
					<a onclick="javascript:$myGallery.doCancel('sharedlg');">닫기</a>
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
										<a onclick="javascript:$myGallery.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
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
					<a onclick="javascript:$myGallery.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
					<a onclick="javascript:$myGallery.doCancel('sharedlg');" class="btnStyle01">닫기</a>
				</div>
			</div>
		</div>
	<!-- 공유팝업 끝 -->
	
</body>
</html>