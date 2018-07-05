<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<title>SGIS 통계지리정보서비스</title>
<link rel="stylesheet" href="/edu/include/css/common.css" type="text/css" />
<!-- <link rel="stylesheet" href="/edu/include/css/default.css" type="text/css" /> -->
<script type="text/javascript" src="/edu/include/js/ui.js"></script>
<script type="text/javascript" src="/edu/include/js/common.js"></script>

<script type="text/javascript">


	var quizCnt = 0;		// 문제수
	var quizNum = 0;		// 문제순서
	var quizList = [];		// 문제배열
	
	window.onload = function () {
		
		// game1 진행 안하고 넘어오는거 방지
// 		if(getCookie("eduGame") != "game1"){
// 			location.href = "/edu/jsp/game01.jsp"
// 		}
		$(".popEnter").hide();
		initGame();
		apiLogWrite3("Q06","OX 퀴즈 조회");
	}
	
	function initGame(){
		quizList.push({ OX : "O", title : "통계주제도", 		quiz : "인구와 가구, 주거와 교통, 복지와 문화, 노동과 경제, 환경과 안전의 5가지 카테고리에 따라 관심 있는 통계를 주제도화한 서비스이다" });
		quizList.push({ OX : "O", title : "통계주제도", 		quiz : "색상, 증감, 시계열, 분할 타입으로 구분되어 제공된다" });
		quizList.push({ OX : "X", title : "통계주제도", 		quiz : "보고서 보기 기능을 제공하지 않는다" });
		quizList.push({ OX : "O", title : "통계주제도", 		quiz : "1인 가구 변화를 통해 증감률을 확인할 수 있다" });
		quizList.push({ OX : "O", title : "대화형 통계지도", 	quiz : "인구, 주택, 가구, 농림어업, 사업체 센서스 및 행정구역 통계 등 다양한 통계항목을 지역단위로 자유롭게 조회할 수 있는 통계지리정보 서비스이다" });
		quizList.push({ OX : "O", title : "대화형 통계지도", 	quiz : "지도화면을 분할할 수 있는 다중뷰 기능을 제공한다" });
		quizList.push({ OX : "X", title : "대화형 통계지도", 	quiz : "개인이 수집한 데이터를 지도 위에 표시할 수 없다" });
		quizList.push({ OX : "O", title : "살고싶은 우리동네", quiz : "사용자 조건에 맞는 주거지역을 추천해 주는 서비스이다" });
		quizList.push({ OX : "O", title : "살고싶은 우리동네", quiz : "생활편의 시설 현황, 교육환경, 자연환경 등 33종의 주거지 조건에 해당하는 추천지역리스트 및 통계정보를 확인할 수 있다" });
		quizList.push({ OX : "X", title : "살고싶은 우리동네", quiz : "관심지역을 읍면동까지 선택할 수 있다" });
		quizList.push({ OX : "O", title : "우리동네 생활업종", quiz : "36종의 생활업종 별 현황을 시군구별로 조회할 수 있다" });
		quizList.push({ OX : "O", title : "우리동네 생활업종", quiz : "업종밀집도를 열지도와 점지도로 볼 수 있다" });
		quizList.push({ OX : "O", title : "기술업종 통계지도", quiz : "2014년 사업체 정보를 바탕으로 지역에 분포된 기술업종의 현황을 확인할 수 있다" });
		quizList.push({ OX : "X", title : "기술업종 통계지도", quiz : "시도, 시군구, 읍면동별 기술업종 현황을 확인할 수 있다" });
		quizList.push({ OX : "O", title : "정책통계지도", 	quiz : "평균나이의 변화를 확인할 수 있다" });
		quizList.push({ OX : "O", title : "정책통계지도", 	quiz : "커피전문점 변화를 확인할 수 있다" });
		quizList.push({ OX : "O", title : "통계 갤러리", 		quiz : "여러 서비스에서 조회한 통계정보를 사용자가 갤러리로 등록할 수 있다" });
		quizList.push({ OX : "X", title : "통계 갤러리", 		quiz : "다른 사용자가 등록한 갤러리는 조회만 가능하다" });
		quizList.push({ OX : "X", title : "지방의 변화보기", 	quiz : "3년 간격으로 인구비율, 주택비율 등 다양한 통계 정보에 대한 시군구별 통계변화 모습을 지도로 제공한다" });
		quizList.push({ OX : "O", title : "지방의 변화보기", 	quiz : "65세 이상 1인 가구의 변화를 확인할 수 있다" });
		quizList.push({ OX : "O", title : "월간통계", 		quiz : "고용동향에서 실업률을 당월통계, 전월비 및 전년동월비 형태로 확인할 수 있다" });
		quizList.push({ OX : "X", title : "월간통계", 		quiz : "당월통계에 해당하는 시군구 단위의 통계지도로 제공한다" });
		quizList.push({ OX : "O", title : "고령화현황보기", 	quiz : "지역 간 고령화 비교, 추세분석의 고령화 관련 통계정보를 제공한다" });
		quizList.push({ OX : "X", title : "고령화현황보기", 	quiz : "전국 단위로 복지시설 통계를 확인할 수 있다" });
		quizList.push({ OX : "O", title : "인구피라미드", 	quiz : "시계열 정보를 연속적으로 보여줌으로써 우리나라 인구구조의 변화를 보여주는 서비스이다" });
		quizList.push({ OX : "O", title : "성씨분포", 		quiz : "시군구 단위의 성씨분포 인구비율 및 변화를 비교할 수 있도록 한 서비스이다" });
		quizList.push({ OX : "O", title : "자료신청", 		quiz : "통계청에서 생산한 집계구별 통계를 파일로 받을 수 있다" });
		
		quizCnt = quizList.length -1;
		
		quizList = shuffle(quizList);
	}
	
	function btn_start(){
		$('#btn_start').css('display', 'none');
		$(".game2 ul li:first-child").text(quizNum+1 + ".");
		$(".game2 ul li:last-child").text(quizList[0].quiz);
		$(".game2 p").text(quizList[0].title);
		apiLogWrite3("Q07","OX 퀴즈 실행");
	}
	
	function btn_OX(OX){
		if(quizList[quizNum].OX == OX){
			$("#nextQ").show();
			quizNum++;
// 			if(quizNum <= quizCnt){
			if(quizNum <= 4){
				$(".game2 p").text(quizList[quizNum].title);
				$(".game2 ul li:first-child").text(quizNum+1 + ".");
				$(".game2 ul li:last-child").text(quizList[quizNum].quiz);
				if(quizNum >= 9)
					$(".game2 ul li:last-child").css("margin-left", "35px")
				
			} else {
				//퀴즈 종료
				$(".popupp").hide();
				$("#gameEnd").show();
			}
		}
		else {
			$("#retry").show();
		}
	}
	
	function nextQ(){
		$("#nextQ").hide();
	}
	
	function retry(){
		$("#retry").hide();
	}
	
	function btn_hint_c(num){
		$('.pop').css('display', 'none');
		$('.popupp').eq(num).css('display', 'block');
	}
	
	function allCardView (){
		$(".popupp").hide();
		openPopup('pop_hint');
	}
	
	function btn_cancle01(){
		closePopup();
	}
	
	function btn_cancle(){
		closePopup();
		$(".popupp").hide();
		openPopup('pop_hint');
	}
	
	function closePopup() {
		$('.pop').css('display', 'none');
		$('.popup').css('display', 'none');
	}
	
	function openPopup(_selector) {
		$('.pop').css('display', 'none');
		$('.popup').css('display', 'block');
		$('.' + _selector).css('display', 'block');
	}
	
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}
	
	function setCookie( c_name,value,expireminute ) {
	    var exdate = new Date();
	    exdate.setMinutes(exdate.getMinutes()+expireminute);
	    document.cookie = c_name +  "=" + escape(value)
	                                           + ((expireminute==null) ? "" : ";expires="+exdate.toUTCString());
	}
	
	function getCookie( c_name ) {
	    if ( document.cookie.length>0 ) {
	        c_start=document.cookie.indexOf(c_name + "=");
	        if( c_start!=-1 ) { 
	            c_start=c_start + c_name.length+1 ;
	            c_end=document.cookie.indexOf(";",c_start);
	            if( c_end==-1 ) { c_end=document.cookie.length; }
	            return unescape(document.cookie.substring(c_start,c_end));
	        } 
	    }
	    return ""
	}

	function eventEnter(){
		
		var agreement = $("input[name=agreement]:checked").val();
		var sex = $("input[name=sex]:checked").val();
		var name =$("#name").val()
		var tel_no = $("#tel_no").val();
		
		if(agreement !="Y"){
			alert("개인정보수집에 동의해 주세요");
			return false;
		}
		
		if(sex !="M" && sex != "F"){
			alert("성별을 선택해주세요");
			return false;
		}
		 
		if(name==""){
			alert("성명을 입력해주세요");
			$("#name").focus();
			return false;
		}
		
		if(tel_no == ""){
			alert("연락처를 입력해주세요");
			$("#tel_no").focus();
			return false;
		}
		
		for(var i=0; i<tel_no.length; i++){
			var str = tel_no.substring(i,i+1);
			if(!numberChk(str)){
				tel_no = replaceAll(str, "", tel_no);
				i--;
			}
		}
		tel_no = tel_no.replace(/ /g, '');
		$("#tel_no").val(tel_no);
		
		$.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/quiz/quiz2017.json",
	 		data:{
	 			"gubun" : "regEvent",
	 			"ox_1" : "ox",
	 			"ox_2" : "ox",
	 			"ox_3" : "ox",
	 			"ox_4" : "ox",
	 			"ox_5" : "ox",
	 			"ox_6" : "ox",
	 			"sex"  : sex,
	 			"name" : name,
	 			"tel_no" : tel_no
	 		},
	 		success:function(data){
	 			if(data.result.resultCnt > 0){
	 				alert("응모된 연락처입니다.");
	 			} else {
		 			alert("응모가 완료되었습니다.");
		 			setCookie('eduGame', '', -1);
		 			location.href = "/edu/jsp/game01.jsp"
	 			}
 			},
	 		error:function(data){
	 			console.log(data);
	 		}
 		});
	}
	
	function numberChk(str){
		var flag = false;
		for(var i=0; i<=9; i++){
			if(str == i){
				flag = true;
				break;
			}
		}
		return flag;
	}
	
	
</script>

</head>

<body>
	
	<script type="text/javascript" src="/edu/include/js/header/header.js"></script>
	
	<div id="bgg-container">
		<div class="eventWrap2">
			<div class="event2">
				<div class="game2">
					<p style="font-size:30px; margin-top: 19px; text-align: center;"></p>
					<ul>
						<li style="width:10px; height:100%; display:inline; float:left; font-size:22px; font-weight:bold; margin:18px 5px 8px 30px; text-align: left;"></li>
						<li style="width:510px; display:inline; float:left; font-size:22px; font-weight:bold; margin:15px 16px 10px; text-align: left; line-height: 1.5;"></li>
					</ul>
				</div>
				<div class="game22" style="width:619px; height:160px; position:absolute; left:290px; top:460px;">
					<ul class="gameSel">
						<li onclick="btn_OX('O');"><img src="/edu/include/img/game/btn_o.png" alt="o"></li>
						<li class="on" onclick="btn_OX('X');"><img src="/edu/include/img/game/btn_x.png" alt="x"></li>
					</ul>
				</div>
				<div id="nextQ" class="game2on">
					<h3>정답입니다</h3>
					<span class="btn_on2"><a onclick="nextQ()">다음문제 &nbsp;></a></span>
				</div>
				<div id="retry" class="game2on">
					<h3>오답입니다</h3>
					<ul>
						<li><span class="btn_on2"><a onclick="retry();">다시풀기 &nbsp;></a></span></li>
<!-- 						<li><span class="btn_on2"><a onclick="allCardView();">힌트보기 &nbsp;></a></span></li> -->
					</ul>
				</div>
				<div id="btn_start" onclick="btn_start();" style="width:642px; height:430px; position:absolute; left:277px; top:228px; cursor: pointer;">
			   		<img src="/edu/include/img/game/bg_event02_st.png" alt="시작"/>
			   </div>
			   
				<div id="gameEnd" class="game2on">
					<h3>문제를 모두 풀었습니다</h3>
					<span class="btn_on2"><a href="/edu/jsp/game02.jsp">다시 시작하기</a></span>
<!-- 					<span class="btn_on"><a onclick="openPopup('popEnter');"><img src="/edu/include/img/game/eventico_btn1.png" alt="o"></a></span> -->
				</div>
			</div>
		</div>
	</div>
	
	<div class="popup" style="height: 100%;">
	     <div class="pop pop_hint">
			<ul class="con_hint">
				<li><a class="btn_hint_c" onclick="btn_hint_c(0);"><img src="/edu/include/img/game/eventico01_.png" alt="카드"/></a></li>
				<li><a class="btn_hint_c" onclick="btn_hint_c(1);"><img src="/edu/include/img/game/eventico02_.png" alt="카드"/></a></li>
				<li><a class="btn_hint_c" onclick="btn_hint_c(2);"><img src="/edu/include/img/game/eventico03_.png" alt="카드"/></a></li>
				<li><a class="btn_hint_c" onclick="btn_hint_c(3);"><img src="/edu/include/img/game/eventico04_.png" alt="카드"/></a></li>
				<li><a class="btn_hint_c" onclick="btn_hint_c(4);"><img src="/edu/include/img/game/eventico05_.png" alt="카드"/></a></li>
				<li><a class="btn_hint_c" onclick="btn_hint_c(5);"><img src="/edu/include/img/game/eventico06_.png" alt="카드"/></a></li>
			</ul>
		 	<a class="btn_cancle01" onclick="btn_cancle01();"></a>
		 </div>
		 <!--카드 전체보기(상세)-->
		 <div class="popupp">
			<div class="popCen">
				<span><img src="/edu/include/img/game/popup02_1.png" alt="저출산"></span>
				<h3>저출산과 고령화 문제</h3>
				<ul class="popup01">
					<li>- 저출산 고령화 문제가 심각해지고 있다</li>
					<li>- 시골지역의 고령화 정도가 더 심하다</li>
					<li>- 대도시로 인구가 집중되고 있다</li>
					<li>- 15세 이하 인구를 유소년 인구라고 한다</li>
					<li>- 저출산 정책에 따라 인구구조가 달라질 수 있다</li>
					<li>- 저출산의 원인에 결혼이 늦어지고 미혼자가 많아진 &nbsp;것도 포함된다</li>
					<li>- 저출산 고령화가 진행되면 미래 세대가 장래에 지 &nbsp;게 될 부담이 커진다</li>
				</ul>
				<a class="btn_cancle" onclick="btn_cancle();"></a>
			</div>
		 </div>
		 <div class="popupp">
			<div class="popCen">
				<span><img src="/edu/include/img/game/popup02_2.png" alt="대도시"></span>
				<h3>대도시 쏠림 현상</h3>
				<ul class="popup01">
					<li>- 수도권에 인구와 산업이 집중되었다</li>
					<li>- GRDP를 통해 각 지방의 경제성장의 차이를 &nbsp;확인할 수 있다</li>
				</ul>
				<a class="btn_cancle" onclick="btn_cancle();"></a>
			</div>
		 </div>
		 <div class="popupp">
			<div class="popCen">
				<span><img src="/edu/include/img/game/popup02_3.png" alt="사회와 가정의 변화"></span>
				<h3>사회와 가정의 변화</h3>
				<ul class="popup01">
					<li>- 급격한 사회 경제 문화적 변화로 1인 가구가 &nbsp;&nbsp;급증하고 있다</li>
					<li>- 1인 가구 증가는 경제 분야에도 영향을 끼쳤다</li>
				</ul>
				<a class="btn_cancle" onclick="btn_cancle();"></a>
			</div>
		 </div>
		 <div class="popupp">
			<div class="popCen">
				<span><img src="/edu/include/img/game/popup02_4.png" alt="도시성장"></span>
				<h3>도시 성장에 따른 거주공간 변화</h3>
				<ul class="popup01">
					<li>- 도시가 성장하면 도시구조 변화도 생긴다</li>
					<li>- 도시화에 따라 지역 간 인구 분포 불균형이 생&nbsp;겼다</li>
				</ul>
				<a class="btn_cancle" onclick="btn_cancle();"></a>
			</div>
		 </div>
		 <div class="popupp">
			<div class="popCen">
				<span><img src="/edu/include/img/game/popup02_5.png" alt="산업발달"></span>
				<h3>산업 발달에 따른 지역의 변화</h3>
				<ul class="popup01">
					<li>- 산업 발달에 따라 지역이 변화한다</li>
				</ul>
				<a class="btn_cancle" onclick="btn_cancle();"></a>
			</div>
		 </div>
		 <div class="popupp">
			<div class="popCen">
				<span><img src="/edu/include/img/game/popup02_6.png" alt="일상생활과 환경문제"></span>
				<h3>일상생활과 환경 문제</h3>
				<ul class="popup01">
					<li>- 급속한 공업화로 대기오염이 심각해지고 있다</li>
					<li>- 일상생활에서도 폐기물이 발생한다</li>
				</ul>
				<a class="btn_cancle" onclick="btn_cancle();"></a>
			</div>
		 </div>
		 
		 <!-- 이벤트 응모 -->
		 <div class="popEnter">
		 	<p class="giftTxt" style="top:20px;">응모하시면 100명을 추첨하여 <br />모바일 상품권(1만원)을 드립니다.</p>
			<p class="quizTit" style="top:132px; font-size:16px; left:5px;">웹게임 참여 이벤트</p>
			<p class="giftTxt" style="top:194px; font-size:16px; left:0; margin-left:0; width:660px;">개인정보수집</p>
			<p class="smsTxt" style="top:220px; font-size:13px; line-height:1.5em;">
				개인정보 수집항목(성별, 성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다.<br>개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다. 
			</p>
			
			<ul class="quizRadio" style="top:260px; font-size: 15px;">
				<li style="width:100%; align-items:center;">
					<input type="radio" name="agreement" class="mr5" value="Y" />동의   <input type="radio" name="agreement" class="ml5 mr5" value="N" />비동의
				</li>
			</ul>
			
			<ul class="quizRadio" style="top:294px; font-size: 15px; letter-spacing:0px; text-align:left; border-top: 1px solid #9999a3; margin-bottom: 10px;">
				<li class="mt15" style="width:100%; margin-left:204px;">
					성별  : 
					<input type="radio" name="sex" class="input" value="M" />남&nbsp;&nbsp; 
					<input type="radio" name="sex" class="input" value="F" />여
				</li>
				<li class="mt15" style="width:100%; margin-left:204px;">
					성명  :  <input type="text" class="input" id="name" style="vertical-align:middle;" />
				</li>
				<li class="mt15" style="width:100%; margin-left:170px;">
					핸드폰번호  :  <input type="text" class="input" id="tel_no" style="vertical-align:middle;" /> (숫자만 입력해 주세요)
				</li>
			</ul>
		
			<div class="quizBtn" style="top:420px;">
				<a onclick="eventEnter();" class="btnType01">응모</a>
				<a href="/edu/jsp/game01.jsp" class="btnType02">취소</a>
			</div>
			
		 </div>
	</div>
	
</body>
</html>
