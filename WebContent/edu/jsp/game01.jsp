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

	var cardArr2 = [];
	
	var cardArr = [];
	var isGameStart;
	var gameClearNum;
	var selectCard1;
	var selectCard2;
	var timeNum;
	var timerId;
	var idxChk;
	var closeBtnChk = false;
	
	window.onload = function () {
		initGame();
		apiLogWrite3("Q04","카드뒤집기 조회");
	}
	
	$(function() {
		
	});

	function btn_start(){
		$('#btn_start').css('display', 'none');
		$('.card>img').css('display', 'block');
		setTimeout(function() {
			$('.card>img').css('display', 'none');
			gameTimerStart();
			isGameStart = true;
		}, 2000);
		
		apiLogWrite3("Q05","카드뒤집기 실행");
		
	}

	function initGame() {
		$('#btn_start').css('display', '');
		$('.card>img').css('display', 'block');
		closeBtnChk = false;
		isGameStart = false;
		gameClearNum = 0;
		selectCard1 = null;
		timeNum = 60;

		for (var i = 0; i < 6; i++) {
			cardArr[i] = i;
		}
		
		cardArr = shuffle(cardArr);
		for (i = 0; i < 6; i++) {
			cardArr[i + 6] = cardArr[i];
		}
		cardArr = shuffle(cardArr);
		var html = '';
		for (i = 0; i < 12; i++) {
			html += '<li><a href="javascript:frontCard(' + (cardArr[i] + 1)
					+ ',' + i + ')" class="card_set1 card card'
					+ (cardArr[i] + 1) + '"><img src="/edu/include/img/game/eventico0'
					+ (cardArr[i] + 1) + '_.jpg"/></a></li>'
		}

		$('.con_card').html(html);
	}

	function frontCard(num, idx) {
// 		console.log("프론트 카드");
		if (idxChk == idx) {
			selectCard1 = null;
			selectCard2 = null;
			$('.card' + num).find('img').css('display', 'none');
			idxChk = null;

		} else if (idxChk != idx) {

			if (isGameStart == true) {
				if (selectCard1 == null) {
					selectCard1 = num;
					$('.card').eq(idx).find('img').css('display', 'block');
				} else if (selectCard2 == null) {
					selectCard2 = num;

					$('.card').eq(idx).find('img').css('display', 'block');
					var isSelect = false;
					var selectNum1 = selectCard1;
					var selectNum2 = selectCard2;
					if (selectCard1 == selectCard2) {
						isSelect = true
					}
					selectCard1 = null;
					selectCard2 = null;
					setTimeout(function() {
						if (isSelect) {
// 							console.log("카드 맞음");
							gameClearNum++;
							$('.card' + selectNum1).removeAttr('href');
							$('.card' + selectNum2).removeAttr('href');
							$('.card_img').html('<img src="/edu/include/img/game/pop_c'+selectNum2+'.png" />');
							clearInterval(timerId);
							closeBtnChk = true;		//카드상세 바로 닫기
							openPopup('popupp');
							$('.popupp').hide();
							$('.popupp').eq(num-1).css('display', '');
							
							if (gameClearNum == 6) {
								isGameStart = false;
							}
						} else {
// 							console.log("카드 틀림");
							$('.card' + selectNum1).find('img').css('display', 'none');
							$('.card' + selectNum2).find('img').css('display', 'none');
						}
					}, 300);
				}
			}
			idxChk = idx;
		} else {
			idxChk = idx;
		}
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
	
	function gameStart() {
		$('.btn_start').css('display', 'none');
		$('.card>img').css('display', 'block');
		setTimeout(function() {
			$('.card>img').css('display', 'none');
			gameTimerStart();
			isGameStart = true;
		}, 2000);
	}
	
	function gameTimerStart() {
		timerId = setInterval(function() {
			timeNum--;
			if (String(timeNum).length == 2) {
				$('.num1').text(String(timeNum).substr(0, 1));
				$('.num2').text(String(timeNum).substr(1));
			} else {
				$('.num1').text('0');
				$('.num2').text(String(timeNum).substr(0));
			}
			if (timeNum <= 0) {
				timeNum = 0;
				//게임종료 시간
				clearInterval(timerId);
				alert("시간이 종료되었습니다");
				location.href = "/edu/jsp/game01.jsp"
			}
		}, 1000);
	}

	function btn_hint_c(num){
		$('.pop').css('display', 'none');
		$('.popupp').eq(num).css('display', 'block');
	}
	
	function btn_cancle01(){

		//게임종료 클리어
		if (gameClearNum == 6) {
// 			setCookie('eduGame','game1',60);
			$('.card').removeAttr('href');
			alert("모두 맞추셨습니다.");
			location.href = "/edu/jsp/game01.jsp"
		} else {
			if (timeNum > 0) {
				gameTimerStart();
			}
		}
		
		closePopup();
	}
	
	function btn_cancle(){
		closePopup();
		$(".popupp").hide();
		
		//카드상세 바로 닫기 
		if(!closeBtnChk){
			openPopup('pop_hint');
		} else {
			btn_cancle01();
		}
		
		closeBtnChk = false;
	}

	function allCardView (){
		$(".popupp").hide();
		openPopup('pop_hint');
		clearInterval(timerId);
	}
	
	function readyPopup() {
		$('.popup>.bg').fadeTo(0, 0.5);
	}
	
	function openPopup(_selector) {
		$('.pop').css('display', 'none');
		$('.popup').css('display', 'block');
		$('.' + _selector).css('display', 'block');
	}
	
	function closePopup() {
		$('.pop').css('display', 'none');
		$('.popup').css('display', 'none');
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

</script>

</head>
<body>

	<script type="text/javascript" src="/edu/include/js/header/header.js"></script>

	<div class="eventWrap">
		<!--카드뒤집기 게임-->
		<div class="event1">
			<div class="eventbox">
			   <span onclick="allCardView()" style="cursor: pointer;"><img src="/edu/include/img/game/eventico_btn.png" alt="버튼"/></span>
			   <div class="titlecho">
					<span class="num2" style="font-size: 1.4em; color: #000; font-weight: bold; margin:7px">0</span>
					<span class="num1" style="font-size: 1.4em; color: #000; font-weight: bold; margin:7px">6</span>
			   </div>
			   <div class="mbox1">
				 <ul class="con_card">
				    
				 </ul>
			   </div>
			   
			   <div id="btn_start" onclick="btn_start();" style="width:622px; height:553px; position:absolute; left:11px; top:10px; cursor: pointer;">
			   		<img src="/edu/include/img/game/bg_event01_st.png" alt="시작"/>
			   </div>
			   
			</div>
		</div>
		<!--카드 전체보기-->
		<div class="popup">
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
						<li>- 15세 미만 인구를 유소년 인구라고 한다</li>
						<li>- 저출산 정책에 따라 인구구조가 달라질 수 있다</li>
						<li>- 저출산의 원인에 결혼이 늦어지고 미혼자가 많아진 것도 포함된다</li>
						<li>- 저출산 고령화가 진행되면 미래 세대가 장래에 지게 될 부담이 커진다</li>
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
						<li>- 도시 중심으로 청장년층 인구가 집중되었다</li>
						<li>- 비수도권과 시골지역 인구가 감소하였다</li>
						<li>- 대도시와 수도권에 집중적인 투자와 개발이 추진되었다</li>
						<li>- 지방이 강세였던 산업까지 수도권으로 이전하였다</li>
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
						<li>- 1인 가구가 급증하고 있다</li>
						<li>- 원인에는 사회의 발전과 개인주의적 가치관의 <br>
							심화, 결혼관의 변화 및 인구의 고령화,
							평균 수명 연장으로 인한 독거 가구 증가 등이 있다</li>
						<li>- 1인가구의 증가로 경제분야에도 변화가 생기고 있다</li>
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
						<li>- 인구분포의 양극화 현상과 도심의 공동화 현상이 발생하였다</li>
						<li>- 농어촌 인구가 도시로 많이 유입되었다</li>
						<li>- 결혼과 취업으로 젊은 층의 남성보다 여성의 인구가 훨씬 많이 도시로 이동하였다</li>
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
						<li>- 영종도(어업이 발달한 지역)</li>
						<li> 공항, 숙박시석, 식당 등이 많아졌다</li>
						<li>- 강원도 정선군(광업이 발달한 지역)</li>
						<li> 관광업이 발달하여 전시관, 휴양림, 스키장, 휴양시설 등이 많아졌다</li>
						<li>- 전라남도 광양시(어업 발달한 지역)</li>
						<li> 철강산업과 제조업이 발달하였다</li>
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
						<li>- 미세먼지 농도가 높아지면 야외 활동 자제하거나</li> 
						<li> 마스크를 착용해야 하며 우리 건강을 악화시킨다</li>
						<li>- 석유 화학제품 및 일회용품의 사용 증가로 일상생활에서 배출하는 폐기물의 양이 늘어나고 있다</li>
						<li>- 생산 활동 과정에서 산업 폐기물이 많이 발생하고 있다</li>
						<li>- 일상생활과 환경 문제는 많이 밀접해 있다</li>
					</ul>
					<a class="btn_cancle" onclick="btn_cancle();"></a>
				</div>
			 </div>
		</div>
	</div>

</body>
</html>
