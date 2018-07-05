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

<!-- 신규 정책통계지도 작성 팁 S -->
<div class="New_layer M_on">
	<div class="Cont">
    	<h3><span>!</span>신규 정책통계지도 작성 팁</h3>
    	 
    	<button id="close_pw_index" class="btn_close" type="button">창닫기</button>
    	
    	<div class="LayerCont">
	        <p><img src="/img/policyWrite/btn_img_calldata.png" alt="데이터 불러오기">버튼을  통해 기준데이터 목록과 추가 데이터 목록을 활성화 할 수 있습니다.</p>
			<p>대화형통계지도와 같이 센서스통계 데이터를 조회하거나, SGIS+에서 즐겨찾기한 데이터 목록, 직접 업로드한 지자체의 데이터 목록 혹은 LBDMS에서 공개 요청하여 승인된 데이터 목록을 호출 활용하여 두개 데이터 목록을 호출, 활용하여 두개 데이터의 레이어를 융합하거나 간단한 연산을 통해 다양한 정책통계지도를 만들 수 있습니다.</p>
			
			<div class="map_ex">
				<span class="Hint">&lt; 협업형 정책통계지도 작성 예시 &gt;</span>
       			<dl>
					<dt><strong>버퍼분석형</strong> 정책통계지도 만들기
					<button id="index-buffer" class="" type="button">바로가기</button>
					</dt>
					<dd> 통계정보와 시설 위치정보 &gt; 버퍼분석
           				<ul>
							<li>ㆍ기준 데이터 화면 > 2015년 0~10세 인구통계</li>
							<li>ㆍ추가 데이터 화면 > 아동복지시설 문포도</li>
							<li>ㆍ융합 > 버퍼분석 > 각종 시각화 기능 설정</li>
						</ul>
					</dd>
				</dl>
				<dl>
					<dt><strong>연산형</strong> 정책통계지도 만들기
					<button id="index-combine" class="" type="button">바로가기</button>
					</dt>
					<dd> 통계정보간 연산 &gt; 간단한 데이터 분석
						<ul>
							<li>ㆍ기준 데이터 화면 > 아동복지시설예산</li>
							<li>ㆍ추가 데이터 화면 > 2015년 0~10세 인구통계</li>
							<li>ㆍ융합 &gt; 연산 &gt; “÷” 아동 1인당 시설예산비</li>
						</ul>
					</dd>
				</dl>
			</div>
		</div>
    
		<!-- 버튼 S -->
		<div class="Btn_Group">
			<button id="" type="button" style="width:200px;">LBDMS 둘러보기</button>
			<button id="" type="button" style="width:200px;">LBDMS 매뉴얼 다운로드</button>
		</div>
    <!-- 버튼 E --> 
    
	</div>
</div>
<!-- 신규 정책통계지도 작성 팁 E --> 