<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String grade = "MM";
	try {
		grade =  (String)request.getSession().getAttribute("member_grade");
	}catch (IllegalArgumentException e) {
		System.out.println("처리중 에러가 발생하였습니다.");
	}catch (Exception e) {
		System.out.println("처리중 에러가 발생하였습니다.");
	}
%>

<!-- 2017.08.09 [개발팀] 등록선택팝업 -->
	<div id="policyWritePopup" class="dialogGtype pwType" style="display:none;">
		<div class="popSttRela">
			<div class="popStt">
				<div class="sttSubj">신규 정책통계지도 작성 타입 설정</div>
				<p class="sttText">데이터 불러오기 버튼을 통해 기준 데이터 목록과 비교 데이터 목록을 활성화 할 수 있습니다.
				대화형통계지도와 같이 <strong>센서스통계</strong>, SGIS+에서 <strong>즐겨찾기한 데이터 목록</strong>, 직접 <strong>업로드한 지자체의 데이터</strong> 목록 혹은 <strong>LBDMS에서 
				공개 요청하여 승인된 데이터</strong> 목록 등을 호출, 활용하여 두개 데이터의 레이어를 융합하거나 간단한 연산을  통해 지역주민에게 지역 정책방
				향을 설명할 수 있는 합리적인 지역 정책통계지도를 만들 수 있습니다.</p>
				
				<div class="sttBtn">
					<a onclick="javascript:$policyWritePopup.ui.goMyDataPage();">나의 데이터 만들기</a>
					<a onclick="javascript:$policyStaticMapDataManagement.ui.dataManagement('','','','1','01');" id="dataManageBtn">LBDMS 활용하기</a>
					<a href="/upload/policy/LBDMS-Manual.pdf" target="_blank" download>LBDMS 메뉴얼 다운로드</a>
				</div>
				
				<div class="sttCont">
					<div class="sttLeft">
						<dl>
							<dt>작성타입 선택</dt>
							<dd>
								<p class="slText">활용되는 데이터 특성에 따라 정책통계지도의 유형이 구분됩니다.작성하고자 하는 정책통계 지도의 유형을 선택하세요.</p>
								<ul class="slType">
								
									<!--소요변화형지표 -->
									<li id="demandIndex" class="idxType on">
										<div class="t01">
											수요변화형
											<br />(연도별 통계변화)
											<br />정책통계지도 만들기
										</div>
										<div class="t02">
											<strong>정책 수요 대상의 연도별 통계 변화 비교</strong>
											<p>데이터 A> 0 ~10세 인구통계, 2005년</p>
											<p>데이터 B> 상동, 2015년</p>
											<p>융합시 증감, 증감률 분석 가능</p>
										</div>
									</li>
									
									<!-- 시설분석형지표 -->
									<li id="analysisIndex" class="idxType">
										<div class="t01">
											시설분석형
											<br />(통계+위치정보)
											<br />정책통계지도 만들기
										</div>
										<div class="t02">
											<strong>정책수요 통계 데이터와 시설 위치정보 분포 비교</strong>
											<p>데이터 A> 0 ~10세 인구통계, 2015년</p>
											<p>데이터 B> 아동복지시설 분포도</p>
											<p>융합시 시설의 버퍼(반경) 설정 및 시각화 가능</p>
										</div>
									</li>
									
									<!-- 통계연산형지표 -->
									<li id="calculateIndex" class="idxType">
										<div class="t01">
											통계연산형
											<br />(통계+통계)
											<br />정책통계지도 만들기
										</div>
										<div class="t02">
											<strong>지표별 통계 또는 POI 데이터간 연산</strong>
											<p>데이터 A> 아동복지시설 예산, 2015년</p>
											<p>데이터 B>  0 ~10세 인구통계, 2015년</p>
											<p>융합시 연산을 통해 아동 1인당 시설예산비 분석 가능</p>
										</div>
									</li>
								</ul>
							</dd>
						</dl>
					</div>
					<div class="sttRight">
						<dl>
							<dt>지역 기준 선택</dt>
							<dd>
								<div class="bar">대상 지역 선택</div>
								<div class="sttForm" style="height:172px;">
									<p>작성하고자 하는 정책통계지도의 지역 범위를 선택해 주세요</p>
									<ul class="srType">
										<li>
											<label class="label">시도</label>
											<select id="pSidoList" class="select" title="시도"></select>
										</li>
										<li>
											<label class="label">시군구</label>
											<select id="pSggList" class="select" title="시군구"></select>
											<input type="checkbox" id="atdrcYn" title="비자치구"/>
											<label>비자치구</label>
										</li>
										<li id="pEmdListArea" style="display:none;">
											<label class="label">읍면동</label>
											<select id="pEmdList" class="select" title="읍면동"></select>
										</li>
									</ul>
									<!-- 통계청 멤버(MM) 일 경우에만 대상지역기준 선택 표출  -->
									<c:set value="<%=grade %>" var="grade"/>
									<c:choose>
										<c:when test="${grade == 'MM'}">
											<div id="dataRangeArea" class="stepBox mainIndex_stepBox">
												<ul class="dbTypeCk">
													<li style="float:left;width:100px;">
														<input type="radio" name="dRange" id="dRange_1" value="1" checked="checked" title="전국기준"/>
														<label for="dRange_1" class="on">전국 기준</label>
													</li>
													<li style="float:left;width:140px;">
														<input type="radio" name="dRange" id="dRange_2" value="2" title="대상지역기준"/>
														<label for="dRange_2">대상지역 기준</label>
														 <a style="margin-top:2px;background:transparent;border:none;"class="ar" data-subj="지역기준선택" title="-전국기준 : 정책통계지도 데이터를 전국기준으로 조회하도록 설정한다.</br>-대상지역기준 : 정책통계지도 데이터를 선택된 지역기준으로 조회하도록 설정한다."><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
													</li>
												</ul>
											</div>
										</c:when>
									</c:choose>
								</div>
								<div class="bar t01">센서스 통계 데이터  집계 경계 선택</div>
								<div class="sttForm" style="height:162px;">
									<p>표출하고자 하는 정책통계지도의 지역 경계를 선택해 주세요</p>
									<ul class="sbType" id="bordArea">
										<li id="sggBord"><a class="on">시군구 경계</a></li>
										<li id="emdBord"><a>읍면동 경계</a></li>
										<li id="jibgaeBord" style='display:none;'><a>집계구 경계</a></li>
										<!-- <li>
											<a href="javascript:void(0)">격자형 경계 범위 선택</a>
											<select class="select"><option>100m</option></select>
										</li> -->
									</ul>
								</div>
							</dd>
						</dl>
					</div>
				</div>
				
				<div class="sttBttom"><a href="javascript:$policyWritePopup.ui.doCreatePolicyMap();">선택 타입의 정책통계지도 만들기</a></div>
				
			</div>
			<a href="javascript:$policyWritePopup.ui.closePolicyWritePopup();" class="rightClose"><img src="/img/ico/ico_close06.png" alt="닫기" /></a>
		</div>
	</div>
