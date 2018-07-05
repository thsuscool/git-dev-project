<!-- 
* 메인화면 HTML입니다.
* 
* history : 네이버시스템(주), 1.0, 2014/08/07  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
//-->
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>

<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>메인 | 통계청SGIS 오픈플랫폼</title> 
    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
    
    <!-- *신규* --> 
 	<link rel="stylesheet" type="text/css" href="/css/thematicFunc.css" />

 	
  	<!-- *신규* -->
  	
    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script> 
    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
    <script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.min.js"></script> 
	<!-- <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> -->
    <script type="text/javascript" src="/js/plugins/highcharts/highcharts.js"></script>
    <script type="text/javascript" src="/js/plugins/highcharts/highcharts-more.js"></script>
    <script type="text/javascript" src="/js/plugins/highcharts/highchart.drag.js"></script>
    
    <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>    
    <script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
    <script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
    <script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
    <script type="text/javascript" src="/js/common/common.js"></script>
    <script type="text/javascript" src="/js/common/mapNavigation.js"></script>
      
      
    <script type="text/javascript" src="/js/interactive/interactiveMapBtn.js"></script>
    <script type="text/javascript" src="/js/thematicMap/thematicEtc07.js"></script>
    <script type="text/javascript" src="/js/thematicMap/thematicMap_api.js"></script>
    <script type="text/javascript" src="/js/thematicMap/thematicMapFrame03_api.js"></script>
    <script type="text/javascript" src="/js/thematicMap/thematicMapFrame07.js"></script><!-- *신규* -->
	<script type="text/javascript"  src="/js/thematicMap/map07.js"></script>
	<script type="text/javascript" src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>
    
     <!-- 통계갤러리 -->
    <script type="text/javascript" src="/js/plugins/slick.min.js"></script>  
	<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
    <script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
    <script type="text/javascript" src="/js/plugins/imageCapture/rgbcolor.js"></script>
    <script type="text/javascript" src="/js/plugins/imageCapture/canvg.js"></script>
    <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.js"></script>
    <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->
    
    
</head>

<!-- <body>   -->
<!-- <div id="wrap"> -->
<input type="hidden" name="stat_thema_map_id" id="stat_thema_map_id"/>
<input type="hidden" name="theme" id="theme"/>
<input type="hidden" name="mapType" id="mapType"/>
		<div class="containerBox">  
			<div class="rela">
				
				<div class="sceneBox">
					<div class="sceneRela">
						<div class="toolBar">
							<a href="javascript:void(0)" class="interactiveView"></a> 
<!-- 							<a href="javascript:void(0)" class="interactiveSelect">둔산 2동</a> -->
							<div id="mapNavi_1"></div>
<!-- 							<a href="javascript:$thematicMapFrame07.ui.mapList[0].mapNavigation.getLocation();" class="interactiveIco"><img src="/img/ico/ico_gps01.gif" alt="위치검색" /></a>  -->
							<div class="navi-content">
								<div class='scrl-first'>
									<ul>
										<li><a href="#">test</a></li> 
									</ul>
								</div>
								<div class='scrl-second'>
									<ul>
										<li><a href="#">test</a></li>
									</ul>
								</div>
								<div class='scrl-third'>
									<ul>
										<li><a href="#">test</a></li>
									</ul>
								</div>
								<div class='navi-action'>
									<a href="javascript:void(0)"><img id='navi-confirm' src='/img/popup/btn_confirm.png' alt='확인' /></a>
									<a href="javascript:void(0)"><img id='navi-cancel' src='/img/popup/btn_close.png' alt='닫기' /></a>
								</div>
							</div>
							
							<div class="tb_right"> 
								<ul class="tbr01">   
									<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
									<li><a onclick="javascript:$thematicMapFrame07.ui.reportDataSet(1);" style="cursor:pointer;" title="보고서 보기"><img src="/img/ico/ico_toolbars06.png" alt="보고서 보기" /></a></li>
									<li><a href="${pageContext.request.contextPath}/view/board/qnaAndRequest?type=thema&amp;categoryCd=THEMRQ" target="_top" class="tb_mapAdd" title="주제도 신규 요청하기"><img src="/img/ico/ico_toolbars11.png" alt="주제도 요청하기"/></a></li>  
								</ul> 
								<a href="javascript:void(0)" class="tb_close"><img src="/img/ico/ico_winClose.gif" alt="창닫기" /></a>
							</div>
						</div>
						<div class="interactiveBar"><!-- map topbar -->
				    		<p class="helperText">
<!-- 				    			<span></span> -->
				    			<a href="javascript:void(0)" data-subj="주제도 설명" title="이 주제도는 2000년부터 2010년 사이에 1인 가구가 어떻게 
변했는지를 나타냅니다. 행정구역별로 1인 가구의 증강률을 비교할 수 있고, 각 지역의 연도별 1인가구 변화를 확인할 수 있습니다.<br />
※ 출처 : 통계청, 2000, 2005, 2010년 인구주택총조사<br />
※ 연평균증감률(CAGR) : (10년 인구/00년 인구)^(1/(2010-2000))-1"><img src="/img/ico/ico_i.gif" alt="주제도 설명" /></a>
				    		</p> 
				    	</div><!-- map topbar -->
				    	
				    	<!-- 데이터보드 -->
<!-- 				    	<a href="javascript:void(0)" class="interactiveDataBoard">데이터보드</a> -->
				    	<div class="dataSideBox" style="width:480px;">
				    		<div class="bar">
				    			<div id="dataSlider" class="dataSlider"></div> 
				    			<a href="javascript:void(0)"><img src="/img/ico/ico_close02.png" alt="데이터보드 닫기" /></a>
				    		</div>
				    		<div class="dataSideContents" id="container">
				    			<p class="thematicTopText">지역을 클릭하면 해당지역 증감현황을 볼 수 있습니다.</p>
					    		<div class="thematicCharts" style="width:460px;"></div>
					    		<p class="thematicBotText">출처: 통계청, 2000, 2005, 2010년 인구주택총조사</p>
				    		</div>
				    		
				    	</div>
				    	<!-- 데이터보드 end-->
				    	
				    	<!-- right menu -->   
<!-- 				    	<a href="javascript:void(0)" class="rightQuick rq06"><span>GPS</span></a> -->
<!-- 				    	<ul class="rqListBox rq06"> -->
<!-- 				    		<li><a href="javascript:void(0)" class="ico_side_gps01"><span>위성</span></a></li>  -->
<!-- 				    		<li><a href="javascript:void(0)" class="ico_side_gps02"><span>일반</span></a></li> -->
<!-- 				    	</ul> -->
				    					    	
<!-- 				    	<a href="javascript:void(0)" class="rightQuick rq03">확대하기</a> -->
<!-- 				    	<p class="rightQuick rq04">집계구</p> -->
<!-- 				    	<a href="javascript:void(0)" class="rightQuick rq05">축소하기</a> -->
				    	<!-- right menu --> 
				    	
				    	<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 --> 
				    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
				    	
			    	</div>
		    	</div>
		    	
				<!-- left menu -->
		    	<a href="javascript:void(0)" class="sideQuick sq02">
		    		<span>주제도 목록</span>
		    		<img src="/img/ico/ico_totalmenu.gif" alt="전체메뉴" />
		    	</a>
		     
<!-- 		    	<a href="javascript:void(0)" class="sideQuick sq03"> -->
<!-- 		    		<span>주제도 설정</span> -->
<!-- 		    		<img src="/img/ico/ico_jusetting.png" alt="주제도 설정" /> -->
<!-- 		    	</a> -->
		    	<div class="sqListBox sq03">
		    		<div class="sqTabs">
		    			<!-- <span>사용자 맞춤 주제도 설정</span>  -->
		    		</div>
		    		<div class="sqList">
		    			<ul>
		    				<li id="stat_sel">
		    					<span>통계선택</span>
<!-- 		    					<a href="javascript:$thematicMapFrame07.ui.changeLeftRightValue()" class="first" id="leftValue">증감틀</a> -->
<!-- 		    					<a href="javascript:$thematicMapFrame07.ui.changeLeftRightValue()" class="last" id="rightValue">CAGR</a> -->
		    					<input type="hidden" id="selectValue" value=""/>
		    				</li>
		    				<li id="region_boundary">		
		    					<span>지역경계</span>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" class="first" id="autoRegion">자동</a>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" id="sido" style="width:90px;">시도별 전국지도</a>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" id="sigungu" style="width:100px;">시군구별 전국지도</a>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" id="eupmyundong" class="last" style="width:100px;">읍면동별 전국지도</a>
		    					<input type="hidden" id="selectValue2" value="auto"/>
		    				</li>
		    				<li id="map_type">
		    					<span>지도유형</span>
		    					<a href="javascript:$thematicMapFrame07.ui.changeDataMode()" class="first" id="color">색상</a>
		    					<a href="javascript:$thematicMapFrame07.ui.changeDataMode()" class="last">버블</a>
		    					<input type="hidden" id="dataMode" value="color"/>
		    				</li> 
		    				<li id="data_type">
		    					<span>통계표출</span>
		    					<a href="javascript:$thematicMapFrame07.ui.changeDataMode2()" class="first">ON</a>
		    					<a href="javascript:$thematicMapFrame07.ui.changeDataMode2()" class="last" id="default_switch">OFF</a>
		    					<input type="hidden" id="dataMode2" value="dataOff"/>
		    				</li> 
		    			</ul>
		    		</div> 
		    	</div> 

		    	<!-- left menu --> 
	    		<div class="leftArea">
					<div class="shadow"></div>
					<div class="quickBox step01"><!-- 주제별 목록보기 start -->
						<div class="subj">
							<span>주제별 목록보기</span>
							<a href="javascript:void(0)" class="stepClose">닫기</a>
						</div> 
						<div class="scrollBox">							
							<dl class="qmdl"> 
								<dd>
									<ul class="qmIcon01">										
									</ul>
								</dd>
							</dl> 
							 
							<ul class="qmlist botn">
	                            <li><a href="${pageContext.request.contextPath}/view/board/qnaAndRequest?type=thema&amp;categoryCd=THEMRQ" target="_top">주제도 요청하기</a></li>
	                            <li><a onclick="javascript:$thematicMapFrame07.ui.reportDataSet(1);" style="cursor:pointer;">보고서 보기</a></li>
	                            <li><a href="${pageContext.request.contextPath}/view/newhelp/su_help_10_0" target="_top">도움말 보기</a></li> 
	                        </ul> 
						</div> 
						<div class="btnBottom">
	                        <span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
<!-- 	                        <div class="serviceLayer" style="display: none;"> -->
<!-- 								<ol> -->
<!-- 									<li><a href="javascript:void(0)">test1</a></li> -->
<!-- 									<li><a href="javascript:void(0)">test1</a></li> -->
<!-- 									<li><a href="javascript:void(0)">test1</a></li> -->
<!-- 									<li><a href="javascript:void(0)">test1</a></li> -->
<!-- 									<li><a href="javascript:void(0)">test1</a></li> -->
<!-- 									<li><a href="javascript:void(0)">test1</a></li> -->
<!-- 								</ol> -->
<!-- 							</div> -->
<!-- 	                        <a href="javascript:void(0)" class="btnService">통계청 주요서비스</a>  -->
	                    </div>
						
						
					</div><!-- 주제별 목로보기 end -->
					
					<div class="quickBox step02"><!-- 인구와 주거 주제도 목록 start -->
						<div class="subj">
							<span id="subj_list">인구와 주거 주제도 목록</span>
							<a href="javascript:void(0)" class="stepClose">닫기</a>
						</div>
						<div class="scrollBox" id="scrollBox" style="overflow-y:scroll;">
							<div class="totalResult tr01"><!-- Intro) 주요시도별 생활업종 보기 -->
								<div class="stepBox"> 
								    <ul id="stepBoxUl">
								    	 <li>
								            <input type="checkbox" id="rd_juger01" />
								            <label for="rd_juger01" data-subj="주제도 특성" title="<span class='sp01'>시도</span><span class='sp01'>시군구</span><span class='sp02'>다중뷰</span>">결혼기간 10년 이하 가구의 주택 점유형태 지역별 분포, 2010</label>
								        </li>
								        
								    </ul>
								</div> 
							</div>
							
							<div class="totalResult tr02"><!-- 복지와문화  -->
                            	<div class="stepBox">복지와문화</div>   
							</div>
							<div class="totalResult tr03"><!-- 일과산업  -->
                            	<div class="stepBox">일과산업</div>   
							</div>
							<div class="totalResult tr04"><!-- 환경과안전  -->
                            	<div class="stepBox">환경과안전</div>   
							</div>
						</div>
<!-- 						<div class="btnBottom"> -->
<!-- 		                	<a href="#" class="btnStyle01" id="btnSample01" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">해당항목버튼생성</a> -->
<!-- 		                </div>  -->
					</div><!-- 인구와 주거 주제도 목록 end --> 
				</div>
				<!-- 색상설정 end --------->
			</div>	 
		</div>  
		<div id="thematicMapOrigin" style="display:none;"></div>
						<!-- loading image -->
						
		<!-- 갤러리 등록 및 즐겨찾기 -->
		<jsp:include page="/view/map/gallaryDialog"></jsp:include>
		
		<!-- 북마크 팝업  -->
		<div id="bookmarkdlg" class="popBox" style="display: none; z-index: 20001;">
			<div class="topbar">
				<span>조회한 통계결과 My Page 저장하기</span> 
				<a onclick="javascript:$thematicMapFrame07.ui.doCancel('bookmarkdlg');">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<label for="savesubj" class="label">저장제목 :</label> 
						<input type="text" id="savesubj" class="inp" maxlength="100" />
					</li>
					<li id="caseInput" style="display: none;">
						<span class="label">공개여부</span> <input type="checkbox" id="openShare" />
						<label for="ckbigong" class="mr20">SGIS+plus 활용사례 공유</label>
					</li>
				</ul>
				<div id="caseHelper" style="display: none;">
					<p class="txt">
						조회결과 저장기간은 2개월 까지며,<br />조회결과 공개여부에 따라 SGIS+plus 사용자간<br />데이터의 자유로운 열람이 가능합니다.
					</p>
					<p class="txt">
						저장된 내용을 활용사례로 공유시 저장기간을 연장할 수<br /> 있습니다.
					</p>
				</div>
				<div class="btnBox">
					<a onclick="javascript:$thematicMapFrame07.ui.doDone('bookmarkdlg');" class="btnStyle01">My Page 저장</a> 
					<a onclick="javascript:$thematicMapFrame07.ui.doCancel('bookmarkdlg');" class="btnStyle01">닫기</a>
				</div>
		 	</div>
	    </div>
		
		<div id="myGalleryPop" style="display: none; z-index: 20000;" class="popBox">
			<div class="topbar">
				<span>갤러리 등록 및 즐겨찾기</span>
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<p class="txt1">
					검색한 데이터로 갤러리를 등록 하시겠습니까?<br />즐겨찾기 하시겠습니까?
				</p>
				<div class="btnBox">
					<a href="javascript:$galleryAdd.interactiveGalleryPopHide();$galleryAdd.interactiveMyGalleryDialogPopOpen();" class="btnGtype">갤러리 등록</a> 
					<a href="javascript:$thematicMapFrame07.ui.doBookMark(1, 'THEME');" class="btnGtype">즐겨찾기</a> 
					<a onclick="javascript:$('#myGalleryPop').hide();" class="btnGtype">취소</a> <!-- 2017.02.23 -->
				</div>
			</div>			
		</div>
		
		<!-- ( mask ) -->
	    <div class="deem" style="display: none;"></div> 
	    <!-- ( mask ) -->
		


<!-- 	</div> -->
<!-- </body> -->
</html>