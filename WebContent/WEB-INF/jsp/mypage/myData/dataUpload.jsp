
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
<html lang="ko">
<head>
<meta charset="utf-8" />
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
<!-- <link rel="stylesheet" type="text/css" href="/css/handsontable.css"> -->
<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<!-- <script type="text/javascript" src="/js/plugins/handsontable.js"></script> -->
<script type="text/javascript" src="/js/mypage/mypageEtc.js"></script>
<script type="text/javascript" src="/js/mypage/myData.js"></script>
<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
<script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
<!-- 2016.03.23 j.h.Seok -->
<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
<script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>




<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<!--[if lt IE 9]>
    <script src="http://www.json.org/json2.js"></script>
<![endif]-->

</head>


<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

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
				<a href="/view/mypage/myData/dataUpload">
					<span class="path_el current">데이터 업로드</span>
				</a>
			</p>
			<div class="containerBox">
				<div class="mpSubTitle">
					 <h3>나의 데이터 업로드</h3>
					<p>업로드된 데이터를 SGIS+plus에 적용하기 위해서는 데이터 설정이 필요합니다. 설정을 통해 더욱 다양하게
						자료를 활용해보세요.</p>
					<p>1회당 업로드 제한:3500row / 10 column(엑셀,CSV,TXT)</p> 
						
						

				</div>

				<!-- <ul class="mpTabs">
					<li><a href="javascript:void(0)" class="on">데이터 업로드 및 위치조회</a></li>
					<li><a href="javascript:void(0)">데이터 연산</a></li>
					<li><a href="javascript:void(0)">시각화 유형</a></li>
				</ul> -->


				<div class="dataMenuBox">
					<h3>내 컴퓨터 파일 찾기</h3>

					<form id="fileForm" name="fileForm" method="post" enctype="multipart/form-data">
						<div id="hiddenFields" style="display: none;"></div>

						<div class="dmFile">
							<input type="file" name="mpsFile" id="mpsFile" class="fileEvent" onChange="javascript:$myData.setFile(this)" /> 
							<input id="myData_regist_file" name="myData_regist_file" type="text" class="inp" title="파일위치" disabled /> 
							<label id="myDataUpload" for="mpsFile" class="spbox type01" onClick="javascript:$myData.fileInit()">파일찾기</label>
						</div>
						<ul class="dmBtn">
<!-- 							<li>
								<a href="javascript:$myData.upLoadFile()" class="spbox type02">데이터 업로드</a>
							</li> -->
							<li>
								<a href="javascript:$myData.fileDownLoad('xlsx')" class="spbox type02">엑셀양식다운로드</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('csv')" class="spbox type02">CSV 예제보기</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('txt')" class="spbox type02">TXT 예제보기</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('kml')" class="spbox type02">KML예제보기</a>
							</li>
						</ul>
						
						<div class="mpfaSubj">
							<div class="fl">
								<label for="mpfSubj">제목</label> <input type="text" class="inp" id="mpfSubj" name="mpfSubj" width="380px;" />
							</div>
							<div class="fr">
								<input type="checkbox" id="mpfCk" name="mpfCk" checked="checked"/> 
								<label for="mpfCk">데이터의 첫행을 컬럼명칭으로 처리</label> 
								<a href="javascript:void(0)" data-subj="데이터 첫행 명칭" title="데이터 첫행을 컬럼명칭으로 처리
									<br />하시면 해당 데이터의 첫 행을 컬럼 
									<br />명칭으로 사용 합니다.">
									<img src="/img/ico/ico_tooltip01.png" />
								</a>
							</div>
						</div>
					</form>
				</div>
				<div class="mpFormArea">
					<%--<div class="mpfaSubj">
						<div class="fl">
							<label for="mpfSubj">제목</label> <input type="text" class="inp"
								id="mpfSubj" />
						</div>
						<div class="fr">
							<input type="checkbox" id="mpfCk" /> <label for="mpfCk">데이터
								활용사례 공유</label> <a href="javascript:void(0)" data-subj="활용갤러리 공개"
								title="데이터 공개를 선택하시면 SGIS+plus를 <br />이용하는 다른 사용자와 해당 데이터를 공유하여 함께 활용할 수 있습니다.<br />데이터 공유 시 데이터 저장기간 연장이 가능합니다."><img
								src="/img/ico/ico_tooltip01.png" /></a>
						</div>
					</div> --%>
							<div class="fl">
								<p class="mpfText01">업로드 데이터를 지도에 표시하기 위해서는 위치조회(지오코딩)를 하여야 합니다.</p>
							</div>
							<div id="tableRowChange" class="btnbox type02" style="display:none;">
								<div class="fl" id="progeress">
									<span>진행&nbsp;현황 </span>
									<span id="currentCodingRow">0</span>
									<span>/&nbsp;</span>
									<span id="maxCodingRow"></span>
									<span id="successSubj">성공:</span>
									<span id="successCount"></span>
									<span id="failSubj">실패:</span>
									<span id="failCount"></span>
									<span id ="searchFailButton" style="display:none;"><a href="javascript:$myData.searchFailRow()" class="btnType01">오류행수정</a></span>
								</div>							 
								<div class="fr" id="cellModifyButton">
									<a href="javascript:$myData.createRow();" class="btnType01">추가(행)</a>
									<a href="javascript:$myData.removeRow();" class="btnType01">삭제(행)</a>
									<!-- <a href="javascript:$myData.createCol();" class="btnType01">추가(열)</a>
									<a href="javascript:$myData.removeCol();" class="btnType01">삭제(열)</a>  -->
								</div>
							</div>
							
					
				</div>
				
				
				<div id="allChkArea" style="display:none;">
				<input type="button" id="allSelect" value="전체선택" />
				<input type="button" id="allRemove" value="전체해지"  />
				</div>
				<div id="basic_handson01" style="overflow:auto"></div>

				<div class="btnbox">
					<div class="fl">
						<a id="gioCoding" href="javascript:$myData.popGio(1);" class="spbox type01" style="display:none;">위치조회(지오코딩)</a>
						<a id="gioBack" href="javascript:$myData.gioBack();" class="spbox type01" style="display:none;">뒤로가기</a>
						<a id="mapDisp" href="javascript:$myData.popMapGisSetting(0)" class="spbox type01" style="display:none;">지도표출설정</a>
					</div>
					<div class="fr" style="display: none">
						<a href="javascript:void(0)" class="spbox type02">지도보기</a> 
						<a href="javascript:void(0)" class="spbox type02">자료다운로드</a>
					</div>
				</div>
			</div>
		</div>

		<!-- popBox start-->
		<div class="popBox" id="splitSelectBox" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>구분자 선택</span>
				<a href="javascript:void(0)">닫기</a>			
			</div>
			
			<div class="popContents">
					<p class="txt">TXT 파일의 경우 데이터의 구분자를 선택 하여자 합니다.</p>
					<ul class="listFormPop">
						<li>
							<div class="dbTypeSubj">
								<label for="splitSelect">구분자</label> 
									<select  id="splitSelect" style="height:23px;margin: 1px 14px 0 0;">
										<option value=",">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,</option>
										<option value=";">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ;</option>
									</select>
							</div>
						</li>
					</ul>
					<div class="btnBox">
						<a href="javascript:$myData.setSplit()" class="btnType01">확 인</a>
					</div>
			</div>
				
		</div>
		
		<div class="popBox" id="gioPop1" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 - 1</span> 
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<p class="txt">지오코딩은 지도에 표시할 X, Y 좌표를 생성하는 과정입니다.</p>
				<p class="txt" style="font-weight: bold; color: #2e2e2e;">1. 나의 데이터를 POI로 표출하기</p>
				<p class="txt">
					X, Y 좌표값을 생성하려면 주소정보가 필요합니다.<br/>
					주소필드 선택을 클릭하시고, 주소가 있는 필드를 선택해 주세요.
					이미 X, Y 좌표값이 있으면 X, Y 필드 선택이나<br/>
					행정동 필드 선택을 클릭하여 진행하시면 됩니다.
				</p>
			
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(1,'xy')" class="btnType01">X,Y 필드 선택</a> 
					<a href="javascript:$myData.confirmGioPop(1,'addr')" class="btnType01">주소 필드 선택</a>
					<a href="javascript:$myData.confirmGioPop(1,'admdrcd')" class="btnType01">행정동 코드 선택</a>
				</div>
				
				<p class="txt" style="font-weight: bold; color: #2e2e2e;">2. 나의 데이터를 색상지도로 표출하기</p>
				<p class="txt">
					행정구역 단위로 데이터를 집계 한 후 색상지도로<br/>
					표출하려면 아래 버튼을 클릭하여 진행하시기 바랍니다.
				</p>
				
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(1,'sumAddr')" class="btnType04">주소, 집계 필드 선택</a> 
					<!-- <a href="javascript:$myData.confirmGioPop(1,'admCd')" class="btnType01">ADM 필드 선택</a> -->
				</div> 
				
			</div>
		</div>


		<div class="popBox" id="gioPop2" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 – 2 (X, Y 좌표 필드 선택)</span> 
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect01">X 좌표 필드</label> <select id="awSelect01">
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
							<label for="awSelect02">Y 좌표 필드</label> <select id="awSelect02">
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
					<a href="javascript:$myData.confirmGioPop(2,'gio')" class="btnType01">확 인</a>
				</div>
			</div>
		</div>


		<div class="popBox" id="gioPop3" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 – 2 (주소 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect03">주소 필드</label> <select id="awSelect03">
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
					<a href="javascript:$myData.confirmGioPop(2,'reverse')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		
		<div class="popBox" id="gioPop4" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 – 2 (주소 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="gioType1">집계레벨 필드</label> <select id="gioType1">
								<option value="1">시도</option>
								<option value="2">시군구</option>
								<option value="3">읍면동</option>
								<option value="4">행정동</option>
							</select>
						</div>
					</li>
					
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect04">주소 필드</label> <select id="awSelect04">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
							</select>
						</div>
					</li>
					
					<li>
						<div class="dbTypeSubj">
							<label for="sumFieldName">집계 필드</label> <select id="sumFieldName">
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
					<a href="javascript:$myData.confirmGioPop(2,'sumAddr')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		
		<div class="popBox" id="gioPop5" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 – 2 (ADM 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="gioType2">주소 필드</label> <select id="gioType2">
								<option value="1">시도</option>
								<option value="2">시군구</option>
								<option value="3">읍면동</option>
								<option value="4">행정동</option>
							</select>
						</div>
					</li>
					
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect05">주소 필드</label> <select id="awSelect05">
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
					<a href="javascript:$myData.confirmGioPop(2,'admCd')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		<div class="popBox" id="gioPop6" style="display: none;z-index:1200;">
			<div class="topbar">
				<span>지오코딩 선택 – 3 (코드 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect06">코드 필드</label> <select id="awSelect06">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
								<option value="f">F</option>
								<option value="g">G</option>
								<option value="h">H</option>
							</select>
						</div>
					</li>
				</ul>
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(2,'admdrcd')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		
		
		<div class="popBox" id="newSavePop" style="position:absolute;margin-top:150px;margin-left:-150px;z-index:2147483647;display:none;">
				<div class="topbar">
					<span>새 이름으로 저장</span> 
					<a href="javascript:void(0)">닫기</a>
				</div>
				<div class="popContents" style="height:150px">
						<ul class="listFormPop">
							<li>
								<div class="dbTypeSubj">
									<label for="newSubject">제목 : </label>
									<input type="text" id="mpfSubject2"/>
								</div>
							</li> 
						</ul>
					<div class="btnBox"> 
						<a href="javascript:$myData.saveSubject()" class="btnType01">저장</a>
					</div>
					
				</div>
		</div> 
		<!-- popBox End -->

		<!-- map Layer -->
		<div class="popBox map" id="mapSetting" style="display:none;z-index: 214748364">
			<div class="rela">
				<div class="topbar">
					<span>지도표출설정</span> 
					<a href="javascript:$myData.hideMap();">닫기</a>
				</div>
				<div class="popContents">
				<div class="pfl">
					<dl>
						<dt id="disp_subj_1">1. 표출 데이터 설정</dt>
						<dd id="disp_content_1">
							<ul id="mapSettingDisp" class="radio" style="height:135px;">
								
							</ul>
						</dd>
						<dt id="disp_subj_2">2. 툴팁 표출 설정 (다중선택)</dt>
						<dd id="disp_content_2">
							<ul id="mapSettingTooltip" class="ckbox" style="height:135px;">
								
							</ul>
						</dd>
						<dt id="disp_subj_3">3. 데이터 시각화 적용 유형</dt>
						<dd>
							<ul class="radio" id="disp_content_3">
								<li id="contentType_1">
									<input type="radio" value="location" name="rd_ptype" id="rd_ptype1" checked="checked" onclick = "$myData.ptype(1)"> 
									<label for="rd_ptype1" class="on" onclick = "$myData.ptype(1)">위치표시</label> 
									<input type="radio" value="ratio" name="rd_ptype" id="rd_ptype2" onclick = "$myData.ptype(2)">
									<label for="rd_ptype2" onclick = "$myData.ptype(2)">열지도</label>
								</li>
								
								<li id="contentType_2" style="display:none;">
									<input type="radio" value="colorFull" name="rd_ptype" id="rd_ptype3" checked="checked" onclick = "$myData.ptype(3)"> 
									<label for="rd_ptype3" class="on" onclick = "$myData.ptype(3)">색상지도</label> 
									<!-- <input type="radio" value="bubble" name="rd_ptype" id="rd_ptype4" onclick = "$myData.ptype(4)">
									<label for="rd_ptype4" onclick = "$myData.ptype(4)">버블지도</label> -->
								</li>
								
							</ul>
							<div class="btnBox">
								<a href="javascript:$myData.reMakeMap();" class="btnType03">미리보기</a> 
								<a href="javascript:$myData.confirmMapSetting()" class="btnType03">저장</a>
							</div>
							
						</dd>
					</dl>
				</div>
				<div class="pfr" >
					<!-- <img src="/img/pm/map_img.jpg" width="100%" height="100%" /> -->
					<div id="mapRgn_1" class="map_img" style="width:750px;height:580px"></div>
					<div id="mapRgn_2" class="map_img" style="width:750px;height:580px" style="display:none;"></div>
					
				</div>
			</div>
			</div>
		</div>
		
		

		<!-- map Layer2 -->
		
		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>

</body>
</html>