<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<div class="dialogbox pwType" style="display:block;">
		<div class="policyWriteBox">
	   		<div class="bar">
	   			<span id="popupTitle"></span>
	   			<div id="dataSlider" class="dataSlider"></div> 
	   			<a onclick="javascript:$policyWriteCombineMap.event.popupClose();"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	   		</div>
	   		<div class="policywContents">
	   			<div class="policyMapArea" >
	   				<div id="mapRgn" style="width:100%; height:100%;"></div>
	   			</div> 
	   			<div class="policyFormArea">
	   				<div class="pcGuide">
	   					<table class="pcTable03">
	   						<colgroup>
	   							<col width="90" />
	   							<col width="" />
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
	   				</div>
	   				<ul class="pcTabs">
	   					<li><a class="on" id="policyStoryTab">정책 스토리</a></li>
	   					<li><a id="combineDataTab">융합결과 데이터</a></li>
	   				</ul>
	   				<div class="pcTabArea" id="policyStoryArea">
	   					<form id="policyMapUploadForm" name="policyMapUploadForm" method="post">
		   					<table class="pcTable01">
		   						<colgroup>
		   							<col width="90" />
		   							<col width="" />
		   						</colgroup>
		   						<tr>
		   							<th>제목</th>
		   							<td>
			   							<input type="text" id="pTitle" placeholder="제목을 작성해주세요" class="inp" name="" 
			   							onkeydown="javascript:$policyWriteCombineMap.util.maxLengthCheck('input', 'pTitle', 300);"
			   							onkeyup="javascript:$policyWriteCombineMap.util.maxLengthCheck('input', 'pTitle', 300);"/>
		   							</td>
		   						</tr>
		   						<tr>
		   							<th>정책분야</th>
		   							<td>
		   								<select class="select" id="pCtgrSelectBox">
		   									<c:forEach items="${categoryList}" var="data" varStatus="status">
												<option id="${data.category_id}" value="${data.category_id}">${data.category_nm}</option>
											</c:forEach>
		   								</select>
		   							</td>
		   						</tr>
		   						<tr>
		   							<th>단위</th>
		   							<td>
		   								<input id="unitInputBox" type="text" placeholder="단위를 입력하세요" class="inp unitInputBox" name="" style="display:none;" />
		   								<select class="select t01" id="unitSelectBox">
		   									<option value="1">명</option>
		   									<option value="2">세</option>
		   									<option value="3">가구</option>
		   									<option value="4">호</option>
		   									<option value="5">개</option>
		   									<option value="6">명/㎢</option>
		   									<option value="7">일백명당명</option>
		   								</select>
		   								<select class="select t02" id="unitOptionSelectBox">
		   									<option value="1">단위선택</option>
		   									<option value="2">직접입력</option>
		   								</select>
		   							</td>
		   						</tr>
		   						<tr>
		   							<th>표출명</th>
		   							<td>
		   								<input type="text" id="pTooltipNm" placeholder="표출명을 입력하세요." class="inp" name="" 
		   								onkeydown="javascript:$policyWriteCombineMap.util.maxLengthCheck('input', 'pTooltipNm', 50);" 
		   								onkeyup="javascript:$policyWriteCombineMap.util.maxLengthCheck('input', 'pTooltipNm', 50);"/>
		   							</td>
		   						</tr>
		   						<tr>
		   							<th colspan="2">정책내용 <span>작성자 : ${memberId}</span></th> 
		   						</tr>
		   						<tr>
		   							<th colspan="2" class="none">
		   								<div id="policyStoryTextArea" class="textarea" contentEditable="true" onkeydown="javascript:$policyWriteCombineMap.util.maxLengthCheck('textarea', 'policyStoryTextArea', 8000);"></div>
		   							</th>  
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
		    				
		    				<dl class="dscList" id="extraRankArea1" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable1"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList" id="extraRankArea2" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable2"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList" id="extraRankArea3" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable3"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList" id="extraRankArea4" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable4"></table>
			    				</dd>
		    				</dl>
		    				
		    				<dl class="dscList" id="extraRankArea5" style="display:none;">
				   				<dt class="mt15">
			    					<span></span> 
			    				</dt>
			    				<dd>
			    					<table class="pcTable02" id="extraRankTable5"></table>
			    				</dd>
		    				</dl>

			    			<div class="pcAddBox">
			    				<span>연관 정책통계지도 바로가기</span>
			    				<a onclick="javascript:$policyWriteCombineMap.ui.doRelationPolicyMap();"><img src="/img/policyStatic/ico_plus.png" class="add_img rel_img" /></a>
			    			</div>
			    			<select class="rel_select" id="pRelMapList">
			    				<option value="0">연관 정책통계지도를 선택하세요</option>
			    			</select>
			    			<a>
			    				<img src="/img/policyStatic/ico_mius01.png" class="del_img rel_img" />
			    			</a>
		    			</form>
	   				</div>
	   				
					<!-- 융합데이터 보기 탭 -->
	    			<div class="pcTabArea" id="policyCombineDataArea" style="display:none;padding:0 5px 30px 20px;"> <!-- 2018.01.03 [개발팀] -->
	    				<div class="stepBox demandIdx_stepBox">
	    					<ul class="dbTypeCk radioStepBox validationStepBox demandIdxChart">
	    						<li>
	    							<input type="radio" name="demandInx_radio" value="1" checked="checked">
	    							<label for="demandInx_radio" class="mr20 on">증감</label>
	    						</li>
	    						<li>
	    							<input type="radio" name="demandInx_radio" value="2">
	    							<label for="demandInx_radio" class="mr20">증감률</label>
	    						</li>
	    					</ul>
	    				</div>
	    				<div class="compareBox">
							<div class="typeBox">
								<a id="combineGraph" onclick="javascript:$policyWriteCombineMap.ui.changeChartAndGrid(1);" class="first on">차트</a>
								<a id="combineGrid" onclick="javascript:$policyWriteCombineMap.ui.changeChartAndGrid(2);">표</a>
							</div>
							<div id="wrapperChartScroll" class="censusChart" style="width:400px;height:360px;">
								<div class="charts" id="targetCharts"></div>
							</div>
							<div id="wrapperGridScroll" style="display:none;height:360px;">
								<table class="pcTable02" id="targetGrid"></table>
							</div>
							
						</div>
	   				</div>
	    			
					<!-- 취소/임시저장/정책통계지도 공개 -->
	    			<div class="pcBtn">
	    				<a onclick="javascript:$policyWriteCombineMap.event.popupClose();" style="width:200px;">취소</a>
	    				<a onclick="javascript:$policyWriteCombineMap.ui.doTempSave();" style="width:200px;">미리보기 및 저장</a>
	    				<!-- <a onclick="javascript:$policyWriteCombineMap.ui.doRegPolicyMap();">정책통계지도 공개</a> -->
	    			</div>
	   				
	   			</div>
	   		</div>
	   	</div>  
   	</div>
   	
   	<!-- 연관정책통계맵 팝업창 -->
   	<div class="FuseResult_Layer" id="relationPolicyMapPopup" style="display: none;">
		<div class="relationMapArea">
			<h3>정책통계지도 목록</h3>
			<button id="closePopup" class="btn_close" type="button" onclick="javascript:$policyWriteCombineMap.event.relationMapPopupClose();">창닫기</button>
			<div class="ContArea">
				<div class="contents">
					<table class="pcTable04" id="relationPolicyMapTable">
						<colgroup>
	   						<col width="60" />
	   						<col width="120" />
	   						<col width="100" />
	   						<col width="" />
	   						<col width="100" />
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
		    		<a onclick="javascript:$policyWriteCombineMap.event.relationMapPopupClose();">취소</a>
		    		<a onclick="javascript:$policyWriteCombineMap.ui.doApplyRelationPolicyMap();">적용</a>
		    	</div>
			</div>
		</div>
	</div>
	
	<!-- 미리보기 팝업창  -->
	<div id="preViewPopup" class="dialogbox pwType" style="display:none;">
		<div class="policyPreViewBox">
			<div class="bar">
	   			<span>정책통게지도 미리보기</span>
	   			<a onclick="javascript:$policyWriteCombineMap.ui.doDeleteTempPolicyMap();"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	   		</div>
		   	<div class="policywContents">
		   		<iframe class="preViewIframe" src=""></iframe>
		   		<div class="pcBtn2">
					<a onclick="javascript:$policyWriteCombineMap.ui.doDeleteTempPolicyMap();">취소</a>
				    <a onclick="javascript:$policyWriteCombineMap.ui.doUpdateTempPolicyMap();">정책통계지도 공개</a>
				</div>
		   	</div>
		   	
		</div>
		
	</div>