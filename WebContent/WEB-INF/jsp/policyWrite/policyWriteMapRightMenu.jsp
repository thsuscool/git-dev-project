<%
/**************************************************************************************************************************
* Program Name	: 살고싶은 우리동네 Left메뉴 JSP	
* File Name		 : houseAnalysisMap.jsp
* Comment			 : 
* History			 : 2015-10-26
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div class="quickBox2 step01" id="quickBox-02">
	<div class="subj">
		<span>추가 데이터 불러오기</span>
		<a class="stepClose2">닫기</a>
	</div> 
	<div class="scrollBox" id="depth1Menu2">	
		<!-- 센서스 통계 목록  -->
		<dl class="qmdl pt0"> 
			<dt><a href="javascript:$('#rQmdlList01').slideToggle();void(0);">센서스 통계 목록</a></dt>
			<dd id="rQmdlList01" class="rQmdlList01">
				<ul class="techType01">
					<li id="companyBtn" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('company');"><span><a data-subj="전국사업체조사" title="${paramInfo.tooltipList.A0301}">전국사업체조사</a></span></li>
				</ul>
			</dd>
		</dl> 
							
		<!-- 기타 통계 목록 -->
		<dl class="qmdl pt0" id="etcMenuItem"> 
			<dt><a href="javascript:$('#rQmdlList02').slideToggle();void(0);">기타 통계 목록</a></dt>
			<dd id="rQmdlList02" class="rQmdlList02">
				<ul class="techType01">
					<li id="collaboData" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('local');"><span><a data-subj="협업형 데이터" title="${paramInfo.tooltipList.A0601}">협업형 데이터</a></span></li>  
				</ul>
			</dd>
		</dl>
							
		<!-- 사용자 통계 목록 -->
		<dl class="qmdl pt0"> 
			<dt><a href="javascript:$('#rQmdlList03').slideToggle();void(0);">사용자 통계 목록</a></dt>
			<dd id="rQmdlList03" class="rQmdlList03">
				<ul class="techType01">
					<li id="userData" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('userData');"><span><a data-subj="나의 데이터" title="${paramInfo.tooltipList.A0601}">나의 데이터</a></span></li>  
				</ul>
			</dd>
		</dl> 			
	</div> 
	
	<div class="btnBottom">
		<span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
	    <div class="serviceLayer" id="bottomServiceLayer">
			<ol>
				<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');" title="새창으로 열림">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');" title="새창으로 열림">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdis.kostat.go.kr');" title="새창으로 열림">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');" title="새창으로 열림">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');" title="새창으로 열림">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');" title="새창으로 열림">통계분류</a></li>
			</ol>
		</div>
	    <div class="btnService" id="bottomService">통계청 주요서비스</div>
	</div>
</div>
<!-- 대화형통계지도 메뉴 보기 end -->

<!-- 2Depth start -->
<div class="quickBox2 step02" id="quickBox2_2depth">
	<div class="subj">
		<span id=submenuTitle2></span>
		<a href="javascript:void(0)" class="stepClose2">닫기</a>
	</div>
	 <div class="normalBox2">
		<!-- 사업체총조사 통계 Start -->
		<div class="totalResult2 tr01" style="display:none;">
			<ol class="cateMenu">
	    		<li id="industryTab" class="companyTab on">
	    			<a href="javascript:$policyWriteMapRightMenu.ui.companyTab('industry');">산업분류</a>
	    		</li>
	            <li id="themeTab" class="companyTab">
	            	<a href="javascript:$policyWriteMapRightMenu.ui.companyTab('theme');">테마업종</a>
	            </li>
	        </ol>
	        
	        <!-- 산업분류탭 -->
	        <div id="industryArea">
				<!-- 산업분류 리스트 -->
				<div class="stepTreeBox" id="companyPoiTreeBox"></div>
			</div>
			
			<!-- 테마업종탭 -->
			<div id="themeArea" style="display:none;">
				<div class="stepTreeBox" id="themePoiTreeBox"></div>
			</div>   
		</div>
		<!-- 사업체총조사 통계 End -->
										
		<!-- 협업형데이터 START -->
		<div class="totalResult2 tr02" style="display:none;">
			<div class="stepBox">
				<p class="on">협업형 데이터</p>
				<ul class="dbTypeCk">
					<c:choose>
						<c:when test="${fn:length(localGovernmentList)>0 }">
							<c:forEach items="${localGovernmentList}" var="data" varStatus="status">
								<li class="local">
									<label class="checkBtn" id="btn_${data.div_cd }" for="btn_${data.div_cd }">${data.div_nm }</label>
								</li>
							</c:forEach>
						</c:when>
						<c:otherwise>
							<li>
								저장된 데이터가 존재하지 않습니다
							</li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
			<div class="stepBox">
				<p class="on">LBDMS 전송 데이터</p>
				<ul class="dbTypeCk">
					<c:choose>
						<c:when test="${fn:length(lbdmsList)>0 }">
							<c:forEach items="${lbdmsList}" var="data" varStatus="status">
								<li class="lbdms">
									<label class="checkBtn" id="btn_${data.seq }" for="btn_${data.seq}">${data.open_data_nm}</label>
								</li>
							</c:forEach>
						</c:when>
						<c:otherwise>
							<li>
								저장된 데이터가 존재하지 않습니다
							</li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>
		<!-- 협업형데이터 END -->
								 
		<!-- 사용자데이터업로드 Start -->
		<div class="totalResult2 tr03" style="display:none;">
			<div class="stepBox"> 
				<p class="on">나의 데이터에 저장된 목록</p>
				<ul id="myDataLoadList2" class="dbTypeCk"></ul>
			</div>
		</div>
		<!-- 사용자데이터업로드 End --> 
	</div>
 </div> 

 <!-- 3Depth start -->
<div class="quickBox2 step03" id="quickBox2_3depth">
	<div class="subj">
		<span id=submenuTitle3>선택된 위치데이터 목록</span>
		<a href="javascript:void(0)" class="stepClose2">닫기</a>
	</div>
	 <div class="scrollBox">
		<div id="poiBtnList" class="sqList">
			<ul></ul>
		</div> 
	</div>
	
	<div class="btnBottom">
		<a href="javascript:$policyWriteMapRightMenu.ui.doReqStatsData();" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">통계 보기</a>
	</div>		
 </div>