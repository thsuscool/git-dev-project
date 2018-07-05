<%
/**************************************************************************************************************************
* Program Name  : 나의데이터 데이터보드 JSP  
* File Name     : mydataDataBoard.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-12-09
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="dataBoardDiv" id="myDataDiv">
<!-- 	<p class="dbText01">업로드 데이터를 기반으로 순번에 따라 최대 300개 까지 표출됩니다</p> -->
	<!-- 일반 데이터 -->
	<div class="myDataDivSub" id="myDataNormalDiv">
		<div class="dbTitle01">조회 방식 설정</div>
		<div class="dbRangeBox">
			<ul class="dbTypeList" id="searchMethodBox">
				<li  style="display:none;" class="searchMethod01">
					<div class="dbTypeSubj">POI 보기</div>
					<div class="dbTypeCk">
						<input type="radio" name="dbTypeCk" id="dbTypeCk01" value="location" />
	                  	<label for="dbTypeCk01">선택</label>
					</div>
					<div class="dbTypeContents">
						 <span class="dbTypeGps"></span>
					</div>
				</li>
				<li class="searchMethod02" style="display:none;"><!-- id 삭제함. -->
					<div class="dbTypeSubj">열지도</div>
					<div class="dbTypeCk">
						<input type="radio" name="dbTypeCk" id="dbTypeCk02" value="ratio" />
	                  	<label for="dbTypeCk02">선택</label>
					</div>
					<div class="dbTypeContents" style="text-align: center;">
						<img src="/img/ico/wheel.500.png" width="40" height="40" style="margin-top: 8px;" alt="색상선택" />
					</div>
				</li>
				<li id="searchMethod03" style="display:none;">
					<div class="dbTypeSubj">버블범례</div>
					<div class="dbTypeCk">
						<input type="radio" name="dbTypeCk" id="dbTypeCk03" value="bubble" />
	                     <label for="dbTypeCk03">선택</label>
					</div>
					<div class="dbTypeContents">
						<ul class="dbRingList">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div>
				</li>
				<li id="searchMethod04" style="display:none;">
					<div class="dbTypeSubj">색상범례</div>
					<div class="dbTypeCk">
						<input type="radio" name="dbTypeCk" id="dbTypeCk04" value="colorFull" />
	                    <label for="dbTypeCk04">선택</label>
					</div>
					<div class="dbTypeContents">
						 <ul class="dbColorbar"></ul>
					</div>
				</li>
			</ul>
		</div>
		
		<div class="dbTitle01">적용된 위치정보 목록</div>
		<div class="mydata_dbTypeSubj01" style="height:32px;line-height:32px;">데이터 표출 및 툴팁설정
			<div class="mydata_group" style="margin-left:470px;">
				<a class="mydata_apply mydata_btn" onclick="javascript:$mydataDataBoard.ui.toolTipChange();">적용</a>
			</div>
		</div>
		<ul class="dbTypeList" id="dataSelectZone" style="margin-left:5px;margin-bottom:20px;">
				<li  class="searchMethod01"> <!-- id dupl 오류로 클래스로 변경 -->
					<div class="dbTypeSubj">데이터표출설정(선택)</div>
					<div class="dbTypeCk" id="dispDataZone">
					</div>
				</li>
				<li  class="searchMethod02"> <!-- id삭제함 -->
					<div class="dbTypeSubj">툴팁설정(다중)</div>
					<div class="dbTypeCk" id="tooltipSetting">
					</div>
				</li>
		</ul>
		<!-- <div class="mydata_dbTypeSubj02" style="margin:10px auto;" onclick="javascript:$mydataDataBoard.ui.toolTipChange();">툴팁적용</div> -->

		<div class="mydata_dbTypeSubj01" style="height:32px;line-height:32px;">그룹화 칼럼 선택
			<div id="groupingInfo" class="mydata_group">
				<select id="groupCell" style="width:120px;height:26px;float:left;margin-top:5px;"></select>
				<a class="mydata_combine mydata_btn" onclick="$mydataDataBoard.Util.groupingCell($('#groupCell').val())">그룹</a>
				<a class="mydata_combine_init mydata_btn" onclick="$mydataDataBoard.ui.clearGroupingCell()">해제</a>
			</div>
		</div>
		
		<div class="mydata_allcheck">
			<input type="checkbox" id="cellAllCheckController" name="cellAllCheckController" checked/>
			<label class="on" for="cellAllCheckController">스프레드시트 전체 체크 / 해제</label>
			<input type="checkbox" id="showInfoWindowPopup" name="showInfoWindowPopup" checked/>
			<label style="margin-left:50px;" for="showInfoWindowPopup" class="on">전체 말풍선보기</label>
		</div>
		<div id="groupLegend" style="margin-left:10px;height:40px;display:none;">
			<span style="float:left;margin-top:3px;font-size:13px;">그룹범례</span>
			<span id="groupColor" style="float:left;width:20px;height:20px;border-radius:50%;background-color:#fff;margin-left:10px;"></span>
			<select id="groupCombobox" style="width:270px;margin-left:10px;"></select>
		</div>
		<div id="userDataGrid" style="margin-left:10px;"></div>
		
	</div>
	
	<!-- KML 데이터 -->
	<div class="myDataDivSub" id="myDataKmlDiv">
		<div class="dbTitle01">KML 데이터</div>
		<div id="basic_handson01"></div>
	</div>
</div>