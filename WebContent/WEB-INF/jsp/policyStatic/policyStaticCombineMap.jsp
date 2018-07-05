<!-- 2017.09.07 [개발팀] 융합기능개발 START -->
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<div class="dialogbox pwType" style="display:block;">
		<div class="policyStaticBox">
	   		<div class="bar">
	   			<span id="popupTitle"></span>
	   			<div onclick="javascript:$policyStaticCombineMap.ui.reportDataSet();" class="combine_report"><img src="/img/policyStatic/ico_report.png" alt="보고서출력" /></div>
	   			<a onclick="javascript:$policyStaticCombineMap.event.popupClose();"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	   		</div>
	   		<div class="policywContents">
	   			<div class="policyMapArea" >
	   				<div id="mapRgn" style="width:100%; height:100%;"></div>
	   			</div> 
	   			<div class="policyFormArea">
	   				<div class="pcGuide">
	   					<table class="pcTable03">
	   						<caption>정책통계지도 기본정보</caption>
	   						<colgroup>
	   							<col style="width:90px;" />
	   							<col style="width:auto;" />
	   						</colgroup>
	   						<tr>
	   							<th>대상지역 :</th>
	   							<td id="regionTitle"></td>
	   						</tr>
	   						<tr>
	   							<th>주요지표 :</th>
	   							<td id="dataA_title"></td>
	   						</tr>
	   						<tr>
	   							<th></th>
	   							<td id="dataB_title"></td>
	   						</tr>
	   						<tr>
	   							<th>출처 :</th>
	   							<td id="dataA_origin"></td>
	   						</tr>
	   						<tr>
	   							<th></th>
	   							<td id="dataB_origin"></td>
	   						</tr>
	   					</table>
	   					<a id="inst_title"></a>
	   					<a id="modify_bt" style="display:none; top:50px; background:#666; cursor:pointer;">수정</a>
	   				</div>
	   				<ul class="pcTabs">
	   					<li><a class="on" id="policyStoryTab">정책 스토리</a></li>
	   					<li><a id="combineDataTab">융합결과 데이터</a></li>
	   				</ul>
	   				<div class="pcTabArea" id="policyStoryArea">
	   					<form id="policyMapUploadForm" name="policyMapUploadForm" method="post">
		   					<table class="pcTable01">
		   						<caption>정책통계지도 등록</caption>
		   						<colgroup>
		   							<col style="width:90px;" />
		   							<col style="width:auto;" />
		   						</colgroup>
		   						<tr>
		   							<th>제목</th>
		   							<td>
			   							<input type="text" id="pTitle" class="inp" title="제목"  readonly />
		   							</td>
		   						</tr>
		   						<tr>
		   							<th>정책분야</th>
		   							<td>
		   								<input type="text" id="pCtgrTitle" class="inp" title="정책분야"  readonly />
		   								<select class="select" id="pCtgrSelectBox" disabled="disabled" style="display:none;" title="카테고리">
		   									<c:forEach items="${categoryList}" var="data" varStatus="status">
												<option id="p_${data.category_id}" value="${data.category_id}">${data.category_nm}</option>
											</c:forEach>
		   								</select>
		   							</td>
		   						</tr>
								<tr class="modifyShow" style="display:none;">
		   							<th>단위</th>
		   							<td>
		   								<input id="unitInputBox" type="text" placeholder="단위를 입력하세요" class="inp unitInputBox" title="단위" style="display:none;" />
		   								<select class="select t01" id="unitSelectBox" title="단위">
		   									<option value="1">명</option>
		   									<option value="2">세</option>
		   									<option value="3">가구</option>
		   									<option value="4">호</option>
		   									<option value="5">개</option>
		   									<option value="6">명/㎢</option>
		   									<option value="7">일백명당명</option>
		   								</select>
		   								<select class="select t02" id="unitOptionSelectBox" title="단위">
		   									<option value="1">단위선택</option>
		   									<option value="2">직접입력</option>
		   								</select>
		   							</td>
		   						</tr>
		   						<tr class="modifyShow" style="display:none;">
		   							<th>표출명</th>
		   							<td>
		   								<input type="text" id="pTooltipNm" placeholder="표출명을 입력하세요." class="inp"
		   								onkeydown="javascript:$policyStaticCombineMap.util.maxLengthCheck('input', 'pTooltipNm', 50);" 
		   								onkeyup="javascript:$policyStaticCombineMap.util.maxLengthCheck('input', 'pTooltipNm', 50);" title="표출명"/>
		   							</td>
		   						</tr>
		   						<tr>
		   							<th colspan="2">정책내용 <span>작성자 : <span id="writeUser"></span></span></th> 
		   						</tr>
		   						<tr id="autoCommentArea" style="display:none;">
		   							<th colspan="2" class="none">
		   								<div id="autoComment" class="textarea" contentEditable="false"></div>
		   							</th>
		   						</tr>
		   					</table>
		   					
		   					<!-- 증가/증가율 지역순위  -->
		   					<dl class="dscList" id="increasedPlusTableArea" style="display:none;">
				   				<dt class="mt15">
			    					<span>증가 지역 순위</span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="increasedPlusTable"></table>
			    				</dd>
		    				</dl>
		    				
		    				<!-- 감소/감소율 지역순위 -->
		    				<dl class="dscList" id="increasedMinusTableArea" style="display:none;">
				   				<dt class="mt15">
			    					<span>감소 지역 순위</span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="increasedMinusTable"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList" id="regionRankTableArea" style="display:none;">
				   				<dt class="mt15">
			    					<span>지역 순위</span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="regionRankTable"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList extraRankArea" id="extraRankArea1" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable1"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList extraRankArea" id="extraRankArea2" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable2"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList extraRankArea" id="extraRankArea3" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable3"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList extraRankArea" id="extraRankArea4" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable4"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList extraRankArea" id="extraRankArea5" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable5"></table>
			    				</dd>
		    				</dl>
		    				
			    			<div class="pcAddBox">
			    				<span>연관 정책통계지도 바로가기</span>
			    				<a style="display:none;"><img src="/img/policyStatic/ico_mius01.png" class="del_img rel_img" alt="연관정책통계지도 삭제" /></a>
			    				<a style="display:none;" onclick="javascript:$policyStaticCombineMap.ui.doRelationPolicyMap();"><img src="/img/policyStatic/ico_plus.png" class="add_img rel_img" alt="연관정책통계지도 추가"/></a>
			    			</div>
			    			
			    			<div class="dscList" id="relArea">
			    				<div style="height:auto; overflow-y:auto;margin-bottom:20px;">
			    					<table class="pcTable02" id="relTable" style="border:1px solid #c4c4c4;"></table>
			    				</div>
		    				</div>
		    			</form>
	   				</div>
	    			
					<!-- 융합데이터 보기 탭 -->
	    			<div class="pcTabArea" id="policyCombineDataArea" style="display:none;padding:0 5px 30px 20px;"> <!-- 2018.01.03 [개발팀] -->
	    				<div class="stepBox demandIdx_stepBox">
	    					<ul class="dbTypeCk radioStepBox validationStepBox demandIdxChart">
	    						<li>
	    							<input type="radio" name="demandInx_radio" id="demandInx_radio_1" value="1" checked="checked" title="증감">
	    							<label for="demandInx_radio_1" class="mr20 on">증감</label>
	    						</li>
	    						<li>
	    							<input type="radio" name="demandInx_radio" id="demandInx_radio_2" value="2" title="증감률">
	    							<label for="demandInx_radio_2" class="mr20">증감률</label>
	    						</li>
	    					</ul>
	    				</div>
	    				<div class="compareBox" id="combineBox">
							<div class="typeBox" id="combineTypeBox">
								<a id="combineGraph" onclick="javascript:$policyStaticCombineMap.ui.changeChartAndGrid(1);" class="first on">차트</a>
								<a id="combineGrid" onclick="javascript:$policyStaticCombineMap.ui.changeChartAndGrid(2);">표</a>
							</div>
							<div id="wrapperChartScroll2" class="censusChart" style="width:400px;height:360px;">
								<div class="charts2" id="targetCharts2"></div>
							</div>
							<div id="wrapperGridScroll" style="display:none;height:360px;">
								<table class="pcTable02" id="targetGrid"></table>
							</div>
							
						</div>
	   				</div>
	   				
	   				<!-- 취소/저장 -->
	    			<div class="pcBtn" id="modifyBtArea" style="display:none;">
	    				<a id="modifyCancel" style="margin-left:67px;">취소</a>
	    				<a id="modifySave" onclick="javascript:$policyStaticCombineMap.ui.doSavePolicyStatic();">저장</a>
	    			</div>
	    			
	   			</div>
	   		</div>
	   	</div>  
   	</div>
   	
   	<!-- 연관정책통계맵 팝업창 -->
   	<div class="FuseResult_Layer" id="relationPolicyMapPopup" style="display: none;">
		<div class="relationMapArea">
			<h3>정책통계지도 목록</h3>
			<button id="closePopup" class="btn_close" type="button" onclick="javascript:$policyStaticCombineMap.event.relationMapPopupClose();">창닫기</button>
			<div class="ContArea">
				<div class="contents">
					<table class="pcTable04" id="relationPolicyMapTable">
						<colgroup>
	   						<col style="width:60px;" />
	   						<col style="width:120px;" />
	   						<col style="width:100px;" />
	   						<col style="width:auto;" />
	   						<col style="width:100px;" />
	   					</colgroup>
	   					<tr>
	   						<th>순번</th>
	   						<th>카테고리</th>
	   						<th>분류</th>
	   						<th>제목</th>	
	   						<th>기관명</th>	
	   					</tr>
					</table>
					<div id="relationPolicyMapListPage" class="pagenation1">
						<span class="pages"> <a href="" class="page"></a></span>
					</div>
				</div>
				<div class="pcBtn" style="width:280px;margin:0 auto;">			
		    		<a onclick="javascript:$policyStaticCombineMap.event.relationMapPopupClose();">취소</a>
		    		<a onclick="javascript:$policyStaticCombineMap.ui.doApplyRelationPolicyMap();">적용</a>
		    	</div>
			</div>
		</div>
	</div>


<!-- 2017.09.07 [개발팀] 융합기능개발 END -->