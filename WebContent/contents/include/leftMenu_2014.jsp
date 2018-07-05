<%@ page language="java" contentType="text/html;charset=utf-8" %>
<script type="text/javascript" language="javascript">
function checkLogin2014(url){
    var loginYn = '<%=loginYn%>';

    if(loginYn == 'Y'){
		alert("login true");    	
      return true;
    }
    else{
      alert('로그인 후 등록할 수 있습니다.');
      pop_login = window.open('https://'+location.host+'/contents/member/pop_login.jsp?login_url='+ url,'','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
      return false;
    }
}
function loginClick(url){
    if(checkLogin2014_2(url)) {
	    window.location.replace(url);
    }
    return;
  }
function checkLogin2014_2(url){
 	var loginYn = '<%=loginYn%>';
	
	if(url == '/contents/support/support_02_write.jsp'){
		 if(loginYn == 'Y')
		      return true;
	    else{
			var returnValue = confirm("로그인하시겠습니까? \n 취소버튼 클릭시 Guest 글쓰기 모드로 글을 쓸수 있습니다.");
			if(returnValue){
				pop_login = window.open('https://'+location.host+'/contents/member/pop_login.jsp?login_url='+ url,'','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
				return false;
			}else{
				window.location.replace("/contents/support/support_02_write.jsp?guest=guest");
				//return true;
			}		
	    }
	}else{
		if(loginYn == 'Y')
		      return true;
	    else{
			checkLogin2014(url);
	    }
	}
	
	
}
  
function loginClick2(url){
    if(checkLogin2014_2(url)) {
	    window.location.replace(url);
    }
    return;
  }
</script>
<div id="l01" style="display:none;">	<!-- 참여마당 레프트 메뉴 -->
	<p class="subj">SGIS 소개</p>
	<ul>
		<li><a href="/contents/shortcut/shortcut_11.jsp" id="l011">SGIS란?</a></li>
<!-- 		<li><a href="/contents/support/support_04.jsp" id="l012">용어 설명</a></li>   -->
		<li>
			<a href="/contents/shortcut/shortcut_02.jsp" id="l012">서비스 소개</a>
				<ul class="sub">
						<li><a id="l0121" href="/contents/shortcut/shortcut_02.jsp">소지역 통계</a></li>
						<li><a id="l0122" href="/contents/shortcut/shortcut_10.jsp">행정구역 통계</a></li>
						<li><a id="l0123" href="/contents/funnySGIS/funnySGIS_11.jsp">통계지도 시계열서비스</a></li>
						<li><a id="l0124" href="/contents/funnySGIS/funnySGIS_10.jsp">S-통계내비게이터</a></li>
						<li><a id="l0125" href="/contents/funnySGIS/funnySGIS_08.jsp">생활관심 지역찾기</a></li>
						<li><a id="l0126" href="/contents/funnySGIS/funnySGIS_12.jsp">사업체 위치찾기</a></li>
						<li><a id="l0127" href="/contents/shortcut/shortcut_07.jsp">고령화 현황보기</a></li>
						<li><a id="l0128" href="/contents/funnySGIS/funnySGIS_07.jsp">월간 통계</a></li>
						<li><a id="l0129" href="/contents/funnySGIS/funnySGIS_06.jsp">지방의 변화보기</a></li>
						<li><a id="l0120" href="/contents/funnySGIS/funnySGIS_03.jsp">움직이는 인구피라미드</a></li>
						<li><a id="l012a" href="/contents/funnySGIS/funnySGIS_04.jsp">성씨분포</a></li>
						<li><a id="l012b" href="/contents/funnySGIS/funnySGIS_05.jsp">통계지도 체험</a></li>
						<li><a id="l012c" href="/contents/funnySGIS/funnySGIS_09.jsp">인구이동 통계</a></li>
						<li><a id="l012d" href="/contents/funnySGIS/funnySGIS_13.jsp">이슈통계</a></li>
						<li><a id="l012e" href="/contents/funnySGIS/funnySGIS_14.jsp">주요지표</a></li>
						<li><a id="l012f" href="/contents/funnySGIS/funnySGIS_15.jsp">행정구역 경계지도</a></li>
				</ul>
		</li>
		<li><a href="/contents/support/support_04.jsp" id="l013">용어 설명</a>		<br /><br /><br /></li>
	</ul>
</div>
<div id="l02" style="display:none;">	<!-- 참여마당 레프트 메뉴 -->
	<p class="subj">지도로 보는 통계</p>
	<ul>
		<li><a href="/sgisnavigator/index.jsp?initialMode=join" id="l021">소지역 통계</a></li>
		<li><a href="/statbd/statbd_02.vw" id="l022">행정구역 통계</a></li>
		<li><a href="/funny_month" id="l024">월간 통계</a></li>
		<li><a href="/statbd/statbd_01.vw" id="l023">주요지표</a></li>
	</ul>
</div>
<div id="l03" style="display:none;">	<!-- 참여마당 레프트 메뉴 -->
	<p class="subj">분석지도</p>
	<ul>
		<li><a href="http://time.nso.go.kr/kostat" id="l031">통계시계열서비스</a></li>
		<li><a href="http://sgis.nso.go.kr/project/future/futue_main.asp" id="l032">지방의 변화보기</a></li>
		<li><a href="/publicsmodel" id="l033">고령화 현황보기</a></li>
		<li><a href="http://kogis.nso.go.kr/popmservice" id="l034">인구이동통계</a></li>
	</ul>
</div>
<div id="l04" style="display:none;">	<!-- 참여마당 레프트 메뉴 -->
	<p class="subj">활용지도</p>
	<ul>
		<li><a href="/statexp/index.jsp" id="l041">통계지도 체험</a></li>
		<li><a href="/sgisComp2" id="l042">사업체 위치 찾기</a></li>
		<li><a href="/msgis/index.vw" id="l043">생활관심 지역 찾기</a></li>
		<li><a href="http://sgis.nso.go.kr/pyramid/view_country.asp" id="l044">움직이는 인구피라미드</a></li>
		<li><a href="http://sgis.nso.go.kr/pyramid/view_familyname.asp" id="l045">성씨분포</a></li>
		<li><a href="http://sgis1.kostat.go.kr" id="l046">이슈통계</a></li>
	</ul>
</div>
<div id="l05" style="display:none;">	<!-- 참여마당 레프트 메뉴 -->
		<p class="subj">공유마당</p>
		<ul>
			<li><a href="/contents/shortcut/shortcut_05_02.jsp" id="l051">자료신청</a>
				<ul class="sub">
					<li><a id="l0511" href="/contents/shortcut/shortcut_05_02.jsp">공간통계 자료제공</a></li>
					<li><a id="l0512" href="/contents/shortcut/shortcut_05.jsp">자료제공 목록</a></li>
					<li><a id="l0513" href="#" onclick="javascript:loginClick('/contents/shortcut/shortcut_05_03.jsp'); return false;">자료신청</a></li>
					<li><a id="l0514" href="#" onclick="javascript:loginClick('/contents/shortcut/shortcut_05_01.jsp'); return false;">자료다운로드</a></li>
				</ul>
			</li>
			<li><a href="/contents/shortcut/shortcut_06_01.jsp" id="l052">S-Open API</a></li>
			<li>
				<ul class="sub">
					<li><a id="l0522" href="/contents/shortcut/shortcut_06_01.jsp">S-Open API 소개</a></li>	
					<li><a id="l0521" href="/contents/shortcut/shortcut_06.jsp">사용안내</a></li>
					<!-- 
					 <li><a id="l0523" href="#" onclick="javascript:loginClick('/contents/shortcut/shortcut_06_03.jsp'); return false;">API키 이용신청</a>	
					 -->
					<li><a id="l0524" href="/OpenAPI2/contents/sub03.vw" target="_blank">S-Open API 목록</a></li>
					<li><a id="l0525" href="/OpenAPI2/contents/index.vw" target="_blank">S-Open API 활용사례</a></li>
					<li><a id="l0523" href="#" onclick="javascript:loginClick('/contents/shortcut/shortcut_06_03.jsp'); return false;">API Key 이용 신청</a></li>	
				</ul>
			</li>
			<li><a href="/share" id="l053">활용갤러리</a>
				<ul class="sub">
					<li><a id="l0531" href="/share/useBoard/useBoardList.do">활용사례 조회</a></li>
					<li><a id="l0532" href="#" onclick="javascript:loginClick('/share/useBoard/useBoardRegist.do'); return false;">활용사례 등록</a></li>
				<%	if("01".equals(session.getAttribute("userlevel"))){%>	
					<li><a id="l0533" href="/share/useBoard/useBoardListConfirm.do">활용사례 등록승인</a></li>
					<%}%>
				</ul>
			</li>
		</ul>
</div>
<div id="l06" style="display:none;">	<!-- 참여마당 레프트 메뉴 -->
	<p class="subj">참여마당</p>
	<ul>
		<li><a href="/contents/support/support_07.jsp" id="l061">최근자료</a></li>
		<li><a href="/contents/support/support_01.jsp?code=Y" id="l062">공지사항</a></li>
		<li><a href="/contents/support/support_03.jsp" id="l063">자주묻는질문</a></li>
		<li><a href="/contents/support/support_02.jsp" id="l064">질문과답변</a></li>
		<li><a href="/contents/support/support_05.jsp" id="l065">서비스 개선 의견</a></li>
	</ul>
</div>


<div id="l07" style="display:none;">	<!-- 마이페이지 레프트 메뉴 -->
	<p class="subj">마이페이지</p>
	<ul>
		<li><a href="/contents/mypage/myPage_04.jsp" id="l071">개인정보</a></li>
		<li><a href="/contents/mypage/myPage_05.jsp" id="l072">알림정보</a></li>
		<li><a href="/contents/mypage/myPage_04_d.jsp" id="l074">탈퇴</a></li>
	</ul>
</div>
<div id="l08" style="display:none;">	<!-- 회원가입 레프트 메뉴 -->
	<p class="subj">회원가입</p>
	<ul>
		<li><a href="/vname_input_seed_mem.jsp" id="l081">회원가입</a></li>
		<li><a href="/contents/member/search_idpwd.jsp" id="l082">아이디/패스워드찾기</a></li>
	</ul>
</div>
<div id="l09" style="display:none;">	<!-- 회원가입 레프트 메뉴 -->
	<p class="subj">사이트맵</p>
	<ul>
		<li><a href="/contents/sitemap/index.jsp" id="l091">사이트맵</a></li>
	</ul>
</div>



