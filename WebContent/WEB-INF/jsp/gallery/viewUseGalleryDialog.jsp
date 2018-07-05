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
<script>
	function pop(img){ 
		img1= new Image(); 
		img1.src=($(img).find('img').attr('src'));
	
		$("#imgPop .popContents>ul>img").attr("src", img1.src);
		$("#imgPop .popContents>ul>img").css("width", img1.width);
		$("#imgPop").css("width", img1.width + 20);
		$("#imgPop").css("margin-left", -(img1.width/2));
		$("#imgPop").show();
	} 

</script>
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
								<span id="modifyUseGallery"></span>
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

								</td>
							</tr>
							<tr>
								<th>활용목적</th>
								<td id="usePurposeTxt">

								</td>
							</tr>
							<tr>
								<th>활용분야</th>
								<td id="applicationFieldTxt">

								</td>
							</tr>
							<tr>
								<th>이용자료(통계청)</th>
								<td id="dataUse1Txt">

								</td>
							</tr>
							<tr>
								<th>이용자료(타기관)</th>
								<td id="dataUse2Txt">

								</td>
							</tr>
							<tr>
								<th>주요 활용내용</th>
								<td id="contentTxt">
								
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="useSide t01">
					<p class="gdMapArea" onclick="pop(this);" style="cursor: pointer;">

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
							<a onclick="javascript:$resultGallery.shareInfoOpen();"><img src="/img/ico/ico_share01.png" width="12" /></a>
							<a id="addMyGallery" onclick="javascript:$resultGallery.addMyGallery();"><img src="/img/ico/ico_mydown.png" width="20" /></a>
						</div>
					</div>
					<div class="gvReplyForm">
						<a id="likeInfo" title="추천" onclick="javascript:$resultGallery.clickGalleryLikeInfo();" class="like">좋아요</a>
						<input type="text" id="replyContent"/>
						<a onclick="javascript:$resultGallery.insertGalleryReply();" class="btnGesi">게시</a>
					</div>
					<div class="gvReplyListBox">
						<ul class="gvReplyList">
						</ul>
					</div>
				</div>
			
			</div>
			<a onclick="javascript:$resultGallery.selectGalleryList();" class="rightClose"><img src="/img/ico/ico_close06.png" /></a>
		</div>
		
	</div>
	
	<!-- 공유팝업 -->
		<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
			<div class="topbar">
				<span>조회한 통계결과  URL공유하기</span>
					<a onclick="javascript:$resultGallery.doCancel('sharedlg');">닫기</a>
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
										<a onclick="javascript:$resultGallery.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
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
					<a onclick="javascript:$resultGallery.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
					<a onclick="javascript:$resultGallery.doCancel('sharedlg');" class="btnStyle01">닫기</a>
				</div>
			</div>
		</div>
	<!-- 공유팝업 끝 -->
	
	<!-- 이미지 확대 팝업 -->
	<div id="imgPop" class="galleryPopBox" style="display:none; z-index:20002;">
		<div class="topbar">
			<span>이미지 크게 보기</span>
				<a onclick="javascript:$resultGallery.doCancel('imgPop');" style="cursor: pointer;">닫기</a>
		</div>
		<div class="popContents">
			<ul class="listFormPop">
				<img src=""/> 
			</ul>
			<div class="btnBox">
				<a onclick="javascript:$resultGallery.doCancel('imgPop');" style="cursor: pointer;" class="btnStyle01">닫기</a>
			</div>
		</div>
	</div>
	<!-- 이미지 확대 끝 -->
	
	
</body>
</html>