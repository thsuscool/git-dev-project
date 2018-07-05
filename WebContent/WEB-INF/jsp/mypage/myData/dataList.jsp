
<%
	/**************************************************************************************************************************
	* Program Name  : 나의데이터 리스트 JSP  
	* File Name     : dataList.jsp
	* Comment       : 
	* History       : 네이버시스템 최재영 2015-11-03
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<META http-equiv="Expires" content="-1">
<META http-equiv="Pragma" content="no-cache">
<META http-equiv="Cache-Control" content="No-Cache">
<title>메인 | 통계청SGIS 오픈플랫폼</title>

    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css'>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	<script type="text/javascript" src="/js/common/map.js"></script>

	<script src="/js/common/common.js"></script>
	<script src="/js/mypage/mypage.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/mypage/mypage.css" />
<!-- 	<link rel="stylesheet" type="text/css" href="/css/handsontable.css"> -->
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<!-- 	<script type="text/javascript" src="/js/plugins/handsontable.js"></script> -->
	<script type="text/javascript" src="/js/mypage/mypageEtc.js"></script>
	<script type="text/javascript" src="/js/mypage/myViewMap.js"></script>
	<script type="text/javascript" src="/js/mypage/myDataList.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
    <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
	
	<!-- 2016.03.23 j.h.Seok -->
	<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	<script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>
</head>

<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->

		<div id="container" style="width:1300px;">
			<p class="path">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/mypage/mypage"><span class="path_el">마이페이지
						&nbsp;&nbsp;>&nbsp;</span></a> <a href="/view/mypage/myData/dataList"><span
					class="path_el current">나의 데이터</span></a>
			</p>

			<div class="containerBox">
				<div class="mpSubTitle2">
					<h3>나의 데이터 목록 	
						<a data-subj="나의 데이터 목록" 
							title="• 목적
						<br>- 이용자들이 가진 다양한 데이터를 SGIS오픈플랫폼에서 제공하는 다양한 통계와 융합하여 자신만의 통계지도를 만들 수 있도록 지원합니다.
						<br>
						<br>• 주요기능 
						<br>- 주소 또는 좌표(UTM-K)를 포함한 이용자 데이터를 업로드하여 지도상에 다양한 시각화 기능을 이용해 위치를 시각적으로 표출
						<br>- 통계경계(집계구, 읍면동, 시군구, 시도) 단위로 연산(합, 평균 등)하여 폴리곤 형태의 색상지도로 표출
						<br>- 대화형통계지도, 우리동네 생활업종에서 불러오기 하여 다른 다양한 통계와 융합하여 사용 하실 수 있습니다.
						<br>
						<br>• 지원가능 포맷 
						<br>- 업로드 포맷 : 엑셀, CSV, TXT, KML
						<br>- 다운로드 포맷 : 엑셀, Shape
						<br>
						<br>• 이용용량 및 저장기간 제한
						<br>- 개인당 할당 용량 : 100MB
						<br>- 1회당 업로드 제한 : 3,500 row/ 10colum (엑셀, CSV, TXT)
						<br>         (KMS) 
						<br>- 저장기간 : 6개월
						<br>- SGIS 공유마당에 공유한 경우 : 1년
						<br>- 우수공유사례로 선정된 경우 : 5년
						<br>※ 단 공유할 경우 통계청의 승인절차를 진행 후 공유되며 개인정보 노출 등이 우려될 경우 승인취소 될 수 있습니다.">
						<img src="/img/ico/ico_tooltip01.png" alt="아이콘" />
							
							
							<!-- <h3>나의 데이터 업로드</h3>
						<p>• 목적
						- 이용자들이 가진 다양한 데이터를 SGIS오픈플랫폼에서 제공하는 다양한 통계와 융합하여 자신만의 통계지도를 만들 수 있도록 지원합니다.

						• 주요기능 
						- 주소 또는 좌표(UTM-K)를 포함한 이용자 데이터를 업로드하여 지도상에 다양한 시각화 기능을 이용해 위치를 시각적으로 표출
						- 통계경계(집계구, 읍면동, 시군구, 시도) 단위로 연산(합, 평균 등)하여 폴리곤 형태의 색상지도로 표출
						- 대화형통계지도, 생활업종 통계지도에서 불러오기 하여 다른 다양한 통계와 융합하여 사용 하실 수 있습니다.

						• 지원가능 포맷 
						- 업로드 포맷 : 엑셀, CSV, TXT, KML
						- 다운로드 포맷 : 엑셀, CSV, TXT, Shape

						• 이용용량 및 저장기간 제한
						- 개인당 할당 용량 : 100MB
						- 1회당 업로드 제한 : 3,500 row/ 10colum (엑셀, CSV, TXT)
									   ???????       (KMS) 
						- 저장기간 : 6개월
						- SGIS 공유마당에 공유한 경우 : 1년
						- 우수공유사례로 선정된 경우 : 5년
						※ 단 공유할 경우 통계청의 승인절차를 진행 후 공유되며 개인정보 노출 등이 우려될 경우 승인취소 될 수 있습니다.</p> -->
						
						</a>
					</h3>
					<div class="mpfileBox">
						<!-- <input type="file" id="mpfile" /> <label for="mpfile">내파일 업로드 하기</label> -->
						<span id="mpfile"
							onclick="$myDataList.myDataFileUpload();"><label
							for="mpfile">내파일 업로드 하기</label></span>
					</div>
					<p>업로드된 개인 데이터 목록입니다. 저장된 데이터는 SGIS+plus 서비스(대화형통계지도, 생활업종지도)에서
						활용가능합니다.</p>
				</div>


				<div class="mpForm"></div>

				<div id="article-wrap" class="searchReslutBox">
					<div class="fc">
						<ul id="mpList" class="mpSearchList">
							<%-- <li>
								<div class="mpLink">
									<a href="#1">2015년 10월 01일 11:20:52</a>
								</div>
								<div class="mpSpan">
									<div class="al">
										<a href="javascript:void(0)" class="spbox type01"
											data-subj="데이터적용 팁"
											title="업로드한 데이터를 해당 서비스 먑에 적용하여 데이터를 조회할 수 있습니다.<br />적용 전 데이터를 설정해 주세요">지도보기</a>
									</div>
									<div class="ar">
										<a href="javascript:void(0)" class="spbox type02"
											data-subj="데이터적용 팁"
											title="업로드한 데이터를 활용하기 위해서는<br />제공되는 서비스에 적용될 수 있도록 데이터 설정이 필요합니다">데이터설정</a>
										<a href="javascript:void(0)" class="spbox type02">목록삭제</a>
									</div>
								</div>
								<div class="mpEtc">
									<a href="javascript:void(0)">서울시 잠실본동 상가 정보.xlsx</a>
								</div>
							</li> --%>
							<%-- <li>
								<div class="mpLink">
									<a href="#1">2015년 10월 01일 11:20:52</a>
								</div>
								<div class="mpSpan">
									<div class="al">
										<a href="javascript:void(0)" class="spbox type01"
											data-subj="데이터적용 팁"
											title="업로드한 데이터를 해당 서비스 먑에 적용하여 데이터를 조회할 수 있습니다.<br />적용 전 데이터를 설정해 주세요">지도보기</a>
									</div>
									<div class="ar">
										<a href="javascript:void(0)" class="spbox type02"
											data-subj="데이터적용 팁"
											title="업로드한 데이터를 활용하기 위해서는<br />제공되는 서비스에 적용될 수 있도록 데이터 설정이 필요합니다">데이터설정</a>
										<a href="javascript:void(0)" class="spbox type02">목록삭제</a>
									</div>
								</div>
								<div class="mpEtc">
									<a href="javascript:void(0)">서울시 잠실본동 상가 정보.xlsx</a>
								</div>
							</li> --%>

						</ul>
						<div id="listPage"></div>
					</div>
				</div>
			</div>
			
				<!-- popBox 시작 -->
				<div class="popBox" id="downLoadPop" style="position:absolute;margin-top:150px;margin-left:-150px;z-index:1200;display:none;">
				<div class="topbar">
					<span>파일 선택</span> 
					<a href="#" onclick="$('#downLoadPop').hide();">닫기</a>
				</div>
				<div class="popContents" style="height:150px">
						<ul class="listFormPop">
							<li>
								
								<div class="dbTypeSubj">
									<span class="fileType etc">형식</span>
									<select id="fileType" title="다운로드 파일" class="mpSelect">
										<option value="xls">Excel</option>
										<option value="shp">SHP</option>
									</select> 
								</div>
							</li> 
						</ul>
					<div class="btnBox"> 
						<a href="javascript:$myDataList.fileDownLoad();" class="btnType01">저장</a>
					</div>
				</div>
			</div> 
			
			<div class="popBox" id="sizeAlert" style="position:absolute;margin-top:150px;margin-left:-150px;z-index:1200;display:none;">
				<div class="topbar">
					<span>파일 용량 초과</span> 
					<a href="#" onclick="$('#sizeAlert').hide();">닫기</a>
				</div>
				<div class="popContents" style="height:150px">
					<div class="messageBox" style="align:center">
						<br>
						<center>업로드 된 파일의 총 용량이 100MB를 <br>초과 하여 업로드가 불가 합니다.</center>
					</div>
						
					<div class="btnBox"> 
						<a href="#" onclick="$('#sizeAlert').hide();" class="btnType01">닫기</a>
					</div>
					
				</div>
			</div>
			
			<div class="popBox" id="deleteAlert" style="position:absolute;margin-top:150px;margin-left:-150px;z-index:1200;display:none;">
				<div class="topbar">
					<span>데이터 삭제</span> 
					<a href="#" onclick="$('#deleteAlert').hide();">닫기</a>
				</div>
				<div class="popContents" style="height:150px">
					<div class="messageBox" style="align:center">
						<br>
						<center>데이터를 삭제 하시겠습니까?</center>
					</div>
						
					<div class="btnBox"> 
						<a href="#" onclick="$myDataList.deleteData();$('#deleteAlert').hide();" class="btnType01">예</a>
						<a href="#" onclick="$('#deleteAlert').hide();" class="btnType01">아니오</a>
					</div>
				</div>
			</div> 
			
			<!-- popBox end -->
			
			
			
			
		</div>
		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>

	<!-- map Layer start -->
			<div class="popBox mapPreView" id="mapSetting" style="display:none;z-index: 1200;">
				<div class="rela">	
					<div class="topbar">
						<span>지도표출</span> 
						<a href="javascript:$myViewMap.hideMap();">닫기</a>
					</div>
					<div class="popContents">
					<!-- <div class="pfl">
					</div>
					<div class="pfr" > -->
						<div id="mapRgn_1" class="map_img" style="width:990px;height:580px;z-index:1200"></div>
					<!-- </div> -->
					</div>
				</div>
			</div>
			<!-- map Layer end -->
</body>
</html>