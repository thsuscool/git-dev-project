<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/css/oxquiz/common.css" />
<link rel="stylesheet" type="text/css" href="/css/oxquiz/default.css" />
<script type='text/javascript' src='/js/plugins/jquery.min.js'></script>
<script>
	window.resizeTo(760,910);
	
	var ox_one;
	var ox_two;
	var ox_three;
	var ox_four;
	var ox_five;
	var ox_memo;
	var ox_gender;
	var ox_name;
	var ox_phone;

	$(function(){
		oxEvent();
		
		$("#one_o").click(function(){
			ox_one = "O";
		});
		$("#one_x").click(function(){
			ox_one = "X";
		});
		$("#two_o").click(function(){
			ox_two = "O"
		});
		$("#two_x").click(function(){
			ox_two = "X";
		});
		$("#three_o").click(function(){
			ox_three = "O"
		});
		$("#three_x").click(function(){
			ox_three ="X";
		});
		$("#four_o").click(function(){
			ox_four = "O"
		});
		$("#four_x").click(function(){
			ox_four = "X";
		});
		$("#five_o").click(function(){
			ox_five = "O"
		});
		$("#five_x").click(function(){
			ox_five = "X";
		});
		
	});
	
	
	function oxEvent(){
		$(".oxo").click(function(){
			$(this).addClass("oxO");
			$(this).next(".oxx").removeClass("oxX");
		});
		$(".oxx").click(function(){
			$(this).addClass("oxX");
			$(this).prev(".oxo").removeClass("oxO");
		});
	}
	
	function oxSubmit(){
		ox_memo = $("#ox_memo").val();
		ox_gender = $("input[name=sex]:checked").val();
		ox_name = $("#ox_name").val();
		ox_phone = $("#ox_phone").val();

		if(ox_one == null || ox_two == null || ox_three == null || ox_four == null || ox_five == null){
			alert("풀지않은 문제가 있습니다.");
			return false;
		};
		
		
		if(ox_memo != ""){	
			if(ox_memo.length > 1000){
				alert("1000자 이하로 작성해주세요.");
				ox_memo.focus;
				return false;
			};
		}else{
			alert("내용을 입력해주세요.");
			return false;
		}
		if(ox_name == ""){
			ox_name.focus;
			alert("이름을 입력해주세요.");
			return false;
		}
		if(ox_phone == ""){
			ox_phone.focus;
			alert("전화번호를 입력해주세요.");
			return false;
		}

		$.ajax({
	 		type:"GET",
	 		url: "/ServiceAPI/quiz/quiz.json",
	 		data:{
	 			"ox_one" : ox_one,
	 			"ox_two" : ox_two,
	 			"ox_three" : ox_three,
	 			"ox_four" : ox_four,
	 			"ox_five" : ox_five,
	 			"ox_memo" : ox_memo,
	 			"ox_gender" : ox_gender,
	 			"ox_name" : ox_name,
	 			"ox_phone" : ox_phone
	 		},
	 		success:function(data){
	 				alert("제출이 완료되었습니다.")
	 				closeWindow();
					},
	 		error:function(data){
	 			alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
	 			closeWindow();
	 			}
	 		});
	}
	
	function closeWindow(){
		window.open('about:blank','_self').close();
	};
	
</script>
<title>SGIS+plus OX퀴즈 이벤트</title>
</head>
<body>
	<div id="wrap">
		<div align="center">
			<img src="/img/oxquiz/oxQuizEvent.png"/>
		</div>
		<img src="/img/oxquiz/title.png" alt="title"/>
		<div>
			<div class="question mt50">
				<p class="mb20">	1.센서스 및 공공기관 자료를 활용하여 국민이 생활과 밀접한 분야별로 주제를 선정하여 지도상에 보여주는 서비스는<span> 『통계주제도』</span> 이다. </p>
				<div class="mb10">
					<button id="one_o" class="oxo"><img src="/img/oxquiz/o.png" alt="o"/></button>
					<button id="one_x" class="oxx"><img src="/img/oxquiz/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><label class="hint"><a href="/view/thematicMap/categoryList" target="_blank" style="color:red">통계주제도 클릭</a></label></p>
			</div>
		</div>
		<div>
			<div class="question mt30">
				<p class="mb20">	2.<span>『대화형 통계지도』</span>는 사용자가 직접 인구, 주택, 가구, 농림어업, 사업체, KOSIS(지역통계) 등 다양한 통계항목을 지도 위에서 소지역단위(집계구)로 조회하여 비교․분석할 수 있는 서비스이다.  </p>
				<div class="mb10">
					<button id="two_o" class="oxo"><img src="/img/oxquiz/o.png" alt="o"/></button>
					<button id="two_x" class="oxx"><img src="/img/oxquiz/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><label class="hint"><a href="/view/map/interactiveMap" target="_blank" style="color:red">대화형통계지도 클릭</a></label></p>
			</div>
		</div>
		<div>
			<div class="question mt30">
				<p class="mb20">	3.<span>『살고싶은 우리동네』</span>는 사용자 조건에 맞는 주거지역을 추천해 주는 서비스입니다. 27개 지표 중 최대 6개의 관심지표를 선택하면 추천된 10개의 지역을 볼 수 있다.  </p>
				<div class="mb10">
					<button id="three_o" class="oxo"><img src="/img/oxquiz/o.png" alt="o"/></button>
					<button id="three_x" class="oxx"><img src="/img/oxquiz/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><label class="hint"><a href="/view/house/houseAnalysisMap" target="_blank" style="color:red">살고싶은 우리동네 클릭</a></label></p>
			</div>
		</div>
		<div>
			<div class="question mt30">
				<p class="mb20">	4.2010년 서울특별시 강남구의 65세이상 인구 중 1인 가구는 강남구 세곡동이 가장 많다. </p>
				<div class="mb10">
					<button id="four_o" class="oxo"><img src="/img/oxquiz/o.png" alt="o"/></button>
					<button id="four_x" class="oxx"><img src="/img/oxquiz/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><label class="hint"><a href="/view/map/interactiveMap" target="_blank" style="color:red">1) 대화형통계지도>인구주택총조사>결합조건 선택<br> 
						&nbsp;&nbsp;&nbsp;2) 연령조건(65세~100세+)과 세대구성조건(1인가구) 선택 후 통계버튼생성<br> 
						&nbsp;&nbsp;&nbsp;3) 서울특별시 강남구로 이동 후 강남구 경계가 보이도록 레벨 조정<br> 
						&nbsp;&nbsp;&nbsp;4) 통계버튼을 강남구로 드래그<br>
						&nbsp;&nbsp;&nbsp;5) 어떤 동이 가장 색깔이 진한가요?
				</a></label></p>
			</div>
		</div>
		<div>
			<div class="question mt30 mb30">
				<p class="mb20">	5.2010년 65세이상 인구와 1인가구의 비율은 2000년보다 전체적으로 줄었다. </p>
				<div class="mb10">
					<button id="five_o" class="oxo"><img src="/img/oxquiz/o.png" alt="o"/></button>
					<button id="five_x" class="oxx"><img src="/img/oxquiz/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><label class="hint"><a href="http://sgis1.kostat.go.kr/statbd/future_01.vw" target="_blank" style="color:red">분석지도>지방의 변화보기> 65세이상 인구와 1인가구 클릭</a></label></p>
			</div>
		</div>
	</div><!--wrap-->
	<div class="improvement">
		<p>SGIS를 이용하면서 느낀 불편한 점이나 개선해야 할 점, 오류 등을 자유롭게 적어주시면 서비스를 개선하도록 노력하겠습니다. </p>
		<textarea id=ox_memo></textarea>
		<p class="mt30">*아래 사항은 추첨을 통한 경품 지급 및 분석 목적으로만 활용합니다. </p>
		<ul class="mt20">
			<li>성별 :<input type="radio" name="sex" class="ml5" value="남" checked="checked"/>남 <input type="radio" name="sex" class="ml5 mr5" value="여"/>여</li>
			<li>성명 :<input id="ox_name" type="text" class="input"/>
			<li>휴대전화번호 :<input id="ox_phone" type="text" class="input"/>
		</ul>
		<hr>
		<div align="right">
			<input type="button" value="제출" style="width:80px; height: 28px;" onclick="javascript:oxSubmit();"/>
			<input type="button" value="종료" style="width:80px; height: 28px;" onclick="javascript:closeWindow()"/>
		</div>
	</div>
</body>
</html>