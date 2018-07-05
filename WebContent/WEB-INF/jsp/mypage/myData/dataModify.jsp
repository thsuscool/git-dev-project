
<%
	/**************************************************************************************************************************
	* Program Name  : 데이터 업로드 JSP  
	* File Name     : dataUpload.jsp
	* Comment       : 
	* History       : 네이버시스템 최재영 2015-11-03
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>메인 | 통계청SGIS 오픈플랫폼</title> 
    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css'>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
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
	<script type="text/javascript" src="/js/mypage/myDataModify.js"></script>
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
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->

<div id="container">
		<p class="path">
				<a href="/view/index"> 
					<span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span>
				</a>
				<a href="/view/mypage/mypage">
					<span class="path_el">마이페이지&nbsp;&nbsp;>&nbsp;</span>
				</a>
				<a href="/view/mypage/myData/dataList">
					<span class="path_el">나의 데이터&nbsp;&nbsp;>&nbsp;</span>
				</a> 
				<a href="/view/mypage/myData/dataModify?data_uid=${data_uid}">
					<span class="path_el current">데이터 설정</span>
				</a>
			</p>
			
		<div class="containerBox">  
			
			
			
			<div class="mpSubTitle">
				<h3>나의 데이터 설정</h3>
				<p>업로드된 데이터를 SGIS+plus에 적용하기 위해서는 데이터 설정이 필요합니다. 설정을 통해 더욱 다양하게 자료를 활용해보세요.</p> 
			</div>  
			
<!-- 			<div class="dataMenuBox mt20">
				<h3>내 컴퓨터 파일 찾기</h3>
				<div class="dmFile">
					<input type="file" id="mpsFile" class="fileEvent" />
					<input type="text" class="inp" title="파일위치" disabled="true" />
					<label for="mpsFile" class="spbox type01">파일찾기</label>
					<a href="javascript:void(0)" class="spbox type01">데이터 업로드</a>
					<input type="checkbox" id="dataFirst" />
					<label for="dataFirst">데이터의 첫행을 컬럼명칭으로 처리</label>
				</div>
				<ul class="dmBtn"> 
					<li><a href="javascript:void(0)" class="spbox type02">엑셀양식다운로드</a></li>
					<li><a href="javascript:void(0)" class="spbox type02">CSV 예제보기</a></li>
					<li><a href="javascript:void(0)" class="spbox type02">TXT 예제보기</a></li>
					<li><a href="javascript:void(0)" class="spbox type02">KML예제보기</a></li>
				</ul> 
			</div> -->
			<div class="mpFormArea">
				<div class="mpfaSubj">
					<div class="fl">
						<label for="mpfSubj">제목</label>
						<input type="text" class="inp" id="mpfSubj" />
					</div> 
				</div>
				<p class="mpfText01">※ 테이블 정보 수정 및 마우스 우클릭을 통해 행,열 편집이 가능 합니다.</p>
				<input type="hidden" id="data_uid" name="data_uid" value="${data_uid}" checked="checked" />
			</div>
			<div class="btnbox type02"> 
			
				<div class="fl" id="progeress" style="display:none;">
					<span>진행&nbsp;현황 </span>
					<span id="currentCodingRow">0</span>
					<span>/&nbsp;</span>
					<span id="maxCodingRow"></span>
					<span id="successSubj">성공:</span>
					<span id="successCount">0</span>
					<span id="failSubj">실패:</span>
					<span id="failCount">0</span>
					<span id ="searchFailButton" style="display:none;"><a href="javascript:$myDataModify.searchFailRow()" class="btnType01">오류행수정</a></span>
				</div>
								
				<div class="fr" id="modifyButtonSpace">
					<a href="javascript:$myDataModify.dispPop(1)" class="btnType01" id="gioCalcButton">집계</a>
					<a href="javascript:$myDataModify.dispPop(2)" class="btnType01">연산</a>
					<a href="javascript:$myDataModify.createRow()" class="btnType01" id="addRow">추가(행)</a>
					<a href="javascript:$myDataModify.removeRow();" class="btnType01" id="removeRow">삭제(행)</a>
					<a href="javascript:$myDataModify.createCol();" class="btnType01">추가(열)</a>
					<a href="javascript:$myDataModify.removeCol();" class="btnType01">삭제(열)</a> 
				</div>
			</div>
			
			<div id="basic_handson01" style="overflow:auto"></div>
			
			<div class="btnbox">
				<div class="fl">
					<!-- <a href="javascript:void(0)" class="spbox type01">위치조회(지오코딩)</a>
					<a href="javascript:void(0)" class="spbox type01">행정동 코드 찾기</a> -->
					<a id="gioCoding" href="javascript:$myDataModify.popGio(1);" class="spbox type01" style="display:none;">위치조회(지오코딩)</a>
					<a href="javascript:$myDataModify.popMapGisSetting()" class="spbox type01">지도표출설정</a>
				</div> 
			</div> 
		</div>
			<!-- popBox start -->
			
		 	<div class="popBox" id="gioPop1" style="position:absolute;margin-top:150px;margin-left:-400px;z-index:1000;display:none;">
				<div class="topbar">
					<span>집계</span> 
					<a href="javascript:void(0)">닫기</a>
				</div>
				<div class="popContents">
					<ul class="listFormPop">
 					<li>
							<div class="dbTypeSubj">
								<label for="awSelect01">1.통계경계(공간연산 범위) 선택</label> <select id="awSelect01">
									<option value="1">시도</option>
									<option value="2">시군구</option>
									<option value="3">읍면동</option>
									<option value="4">집계구</option>								
								</select>
							</div>
						</li> 
						<li>
							<div class="dbTypeSubj">
								<label for="awSelect02">2.집계방법 선택</label> 
								<select id="awSelect02">
									<option value="2">합계값</option>
									<option value="3">빈도(카운트)</option>
								</select>
							</div>
						</li>
						<li>
							<div class="dbTypeSubj">
								<label for="awSelect03">3.집계필드 선택</label>
								<select id="awSelect03">
									<option value="a">A</option>
									<option value="b">B</option>
									<option value="c">C</option>
									<option value="d">D</option>
									<option value="e">E</option>
									<option value="f">F</option>
									<option value="g">G</option>
								</select>
							</div>
						</li>
						<!-- 2017 07 31 [개발팀] 수정 시작 -->
						<li id="yearCalcLi">
							<div class="dbTypeSubj">
								<input type="radio" name="calcYear" id="calcYearOn" value="on" title="사용">사용
								<input type="radio" name="calcYear" id="calcYearOff" value="off" title="미사용" checked="checked">미사용
								<label for="awSelect04">4.집계년도 선택 여부</label>
									<select id="awSelect04" style="display:none">
										<option value="a">A</option>
										<option value="b">B</option>
										<option value="c">C</option>
										<option value="d">D</option>
										<option value="e">E</option>
										<option value="f">F</option>
										<option value="g">G</option>
									</select>
							</div>
						</li>
						<!-- 2017 07 31 [개발팀] 수정 종료 -->
					</ul>
					<div class="btnBox">
						<a href="javascript:$myDataModify.setGioCalc();" class="btnType01">적용</a>
					</div>
				</div>
			</div> 
			
			
			
			<div class="popBox" id="gioPop2" style="position:absolute;margin-top:150px;margin-left:30px;z-index:1000;display:none;">
				<div class="topbar">
					<span>연산</span> 
					<a href="javascript:void(0)">닫기</a>
				</div>
				<div class="popContents" style="height:150px">
						<ul class="listFormPop">
							<li>
								<select id="calcField1" title="열선택" class="mpSelect">
									<option value="a">A</option>
									<option value="b">B</option>
									<option value="c">C</option>
									<option value="d">D</option>
									<option value="e">E</option>
									<option value="f">F</option>
								</select>
								<select id="calcField2" title="연산자선택" class="mpSelect type01">
									<option value="plus">+</option>
									<option value="minus">ㅡ</option>
									<option value="multiple">X</option>
									<option value="divided">/</option>
								</select>
								<select id="calcField3" title="열선택" class="mpSelect">
									<option value="a">A</option>
									<option value="b">B</option>
									<option value="c">C</option>
									<option value="d">D</option>
									<option value="e">E</option>
									<option value="f">F</option>
								</select>
								<span class="mpSpan etc">=</span>
								<select id="calcField4" title="키종류" class="mpSelect">
									<option value="a">A</option>
									<option value="b">B</option>
									<option value="c">C</option>
									<option value="d">D</option>
									<option value="e">E</option>
									<option value="f">F</option>
								</select> 
							</li> 
						</ul>
					<div class="btnBox"> 
						<a href="javascript:$myDataModify.selectFieldCalc();" class="btnType01">연산적용</a>
					</div>
					
				</div>
			</div> 
			
			
			
			<div class="popBox" id="gioPop3" style="position:absolute;margin-top:150px;margin-left:-150px;z-index:2147483647;display:none;">
				<div class="topbar">
					<span>새 이름으로 저장</span> 
					<a href="javascript:void(0)">닫기</a>
				</div>
				<div class="popContents" style="height:150px">
						<ul class="listFormPop">
							<li>
								<div class="dbTypeSubj">
									<label for="newSubject">제목 : </label>
									<input type="text" id="newSubject"/>
								</div>
							</li> 
						</ul>
					<div class="btnBox"> 
						<a href="javascript:$myDataModify.newSaveData();" class="btnType01">저장</a>
					</div>
					
				</div>
			</div> 
			
			
			
			
			
			
		<div class="popBox" id="gioCodingPop1" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 - 1</span> 
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<p class="txt">지오코딩은 지도에 표시할 X, Y 좌표을 찾는 과정입니다.</p>
				<p class="txt">이미 X, Y 좌표가 있고, 지오코딩을 실행하지 않으시려면 “X, Y 필드 선택”을 클릭하세요.</p>
				<p class="txt">X, Y 좌표값을 찾기 위해서는 “주소”정보가 필요합니다. “주소 필드 선택“을 클릭하시고 주소 필드를 선택해주세요.</p>
				<div class="btnBox">
					<a href="javascript:$myDataModify.confirmGioPop(1,'xy')" class="btnType01">X,Y 필드 선택</a> 
					<a href="javascript:$myDataModify.confirmGioPop(1,'addr')" class="btnType01">주소 필드 선택</a>
				</div>
			</div>
		</div>


		<div class="popBox" id="gioCodingPop2" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 – 2 (X, Y 좌표 필드 선택)</span> 
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect04">X 좌표 필드</label> <select id="awSelect04">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
								<option value="f">F</option>
								<option value="g">G</option>								
							</select>
						</div>
					</li>
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect05">Y 좌표 필드</label> <select id="awSelect05">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
								<option value="f">F</option>
								<option value="g">G</option>
							</select>
						</div>
					</li>
				</ul>
				<div class="btnBox">
					<a href="javascript:$myDataModify.confirmGioPop(2,'gio')" class="btnType01">확 인</a>
				</div>
			</div>
		</div>


		<div class="popBox" id="gioCodingPop3" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 – 2 (주소 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect06">주소 필드</label> <select id="awSelect06">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
							</select>
						</div>
					</li>
				</ul>
				<div class="btnBox">
					<a href="javascript:$myDataModify.confirmGioPop(2,'reverse')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		<!--  2017.08.01 [개발팀] 수정  -->
		<div class="popBox" id="yearListAddPop" style="position:absolute;margin-top:150px;margin-left:-150px;z-index:1200;display:none;">
			<div class="topbar">
				<span>연도 집계 데이터 컬럼 추가</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
							<li>
								<div class="dbTypeSubj">
									<label for="yearFieldName">년도입력 : </label>
									<input type="number" id="yearFieldName" min="1900"/>
								</div>
							</li> 
						</ul>
					<div class="btnBox"> 
						<a href="javascript:$myDataModify.yearFieldAdd($('#yearFieldName').val());" class="btnType01">추가</a>
					</div>
			</div>
		</div>
		<!--  2017.08.01 [개발팀] 수정  종료 -->
			<!-- popBox end -->
			
			
			
				 
		</div>  
		
		<!-- map Layer start -->
			<div class="popBox map" id="mapSetting" style="display:none;z-index: 214748364">
			<div class="rela">	
				<div class="topbar">
					<span>지도표출설정</span> 
					<a href="javascript:$myDataModify.hideMap();">닫기</a>
				</div>
				<div class="popContents">
					<div class="pfl">
						<dl>
							<dt>1. 표출 데이터 설정</dt>
							<dd>
								<ul id="mapSettingDisp" class="radio" style="height:135px;">
									
								</ul>
							</dd>
							<dt>2. 툴팁 표출 설정 (다중선택)</dt>
							<dd>
								<ul id="mapSettingTooltip" class="ckbox" style="height:135px;">
								
								</ul>
							</dd>
							
							<dt id="disp_subj_3">3. 데이터 시각화 적용 유형</dt>
							<dd>
								<ul class="radio" id="disp_content_3">
									<li id="dispMapSelect">
										<input type="radio" value="location" name="rd_ptype" id="rd_ptype01" checked="checked"> 
										<label for="rd_ptype01" class="on" ><a href="javascript:$myDataModify.ptype(1)">위치표시</a></label> 
										<input type="radio" value="ratio" name="rd_ptype" id="rd_ptype02">
										<label for="rd_ptype02"><a href="javascript:$myDataModify.ptype(2)">열지도</a></label>
									</li>
								</ul>
								<div class="btnBox">
									<a href="javascript:$myDataModify.reMakeMap();" class="btnType03">미리보기</a> 
									<a href="javascript:$myDataModify.confirmMapSetting()" class="btnType03">저장</a>
								</div>
							
								<div>
									<ul id="sharedOption" class="ckbox">
										<li>
											<input type="checkbox" value="shared" name="rd_option" id="sharedChecked"> 
											<label for="sharedChecked">공유</label>
										
											<input type="checkbox" value="useHistory" name="rd_option" id="useHistoryChecked"> 
											<label for="useHistoryChecked">활용사례</label>
										</li>
									</ul>
								</div>
							</dd>
							
						</dl>
						
					</div>
					
					
					<div class="pfr" >
						<div id="mapRgn_1" class="map_img" style="width:750px;height:580px"></div>
					</div>
				</div>
				</div>
			</div>
			<!-- map Layer end -->
		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>

	</div>
</body>


</html>