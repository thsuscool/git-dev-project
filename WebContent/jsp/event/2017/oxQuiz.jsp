<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
<link rel="stylesheet" type="text/css" href="./css/common.css" />
<link rel="stylesheet" type="text/css" href="./css/default.css" />
<script src="./js/jquery-1.11.1.min.js"></script>
<script src="./js/default.js"></script>

 <script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
 <script type="text/javascript" src="/js/common/includeHead.js"></script>
 <script type="text/javascript"  src="/js/common/common.js"></script>




<!--[if lt IE 9]><script src="./js/html5shiv.js"></script><![endif]-->
<!--[if lt IE 9]><script src="./js/respond.js"></script><![endif]-->
<title>홍보 이벤트 OX퀴즈 문제</title>
<script language="javascript">

	window.resizeTo(775,910);
	apiLogWrite2("R0", "R03", "이벤트", "2017년 OX 퀴즈 View", "00", "없음");

var ox_1 = "";
var ox_2 = "";
var ox_3 = "";
var ox_4 = "";
var ox_5 = "";
var ox_6 = "";

var sex = "";
var tel_no = "";
var name = "";
var bigo1 = "";

alert("만료된 이벤트입니다.");
window.close();


function oxVaueInput(data){
	//퀴즈가 총 6개임
	for(var i=1; i<= 6; i++){
		var quizNum = data.substring(0,1);
		
		if(quizNum == "1"){
			ox_1 = data.substring(2);
		}else if(quizNum == "2"){
			ox_2 = data.substring(2);
		}else if(quizNum == "3"){
			ox_3 = data.substring(2);
		}else if(quizNum == "4"){
			ox_4 = data.substring(2);
		}else if(quizNum == "5"){
			ox_5 = data.substring(2);
		}else if(quizNum == "6"){
			ox_6 = data.substring(2);
		}
	}
}


function valChk(){
	
	alert("만료된 이벤트입니다.");
	window.close();
	
	return false;
	
	
	
	var chkReturn = true;
	if(ox_1 == ""){
		alert("1번 퀴즈를 풀지 않았습니다.");
		return false;
	}
	if(ox_2 == ""){
		alert("2번 퀴즈를 풀지 않았습니다.");
		return false;
	}
	if(ox_3 == ""){
		alert("3번 퀴즈를 풀지 않았습니다.");
		return false;
	}
	if(ox_4 == ""){
		alert("4번 퀴즈를 풀지 않았습니다.");
		return false;
	}
	if(ox_5 == ""){
		alert("5번 퀴즈를 풀지 않았습니다.");
		return false;
	}
	if(ox_6 == ""){
		alert("6번 퀴즈를 풀지 않았습니다.");
		return false;
	}
	
	var agreement = $("input[name=agreement]:checked").val();
	if(agreement !="Y"){
		alert("개인정보수집에 동의해 주세요");
		return false;
	}
	
	sex = $("input[name=sex]:checked").val();
	if(sex !="M" && sex != "F"){
		alert("성별을 선택해주세요");
		return false;
	}
	name =$("#name").val() 
	if(name==""){
		alert("성명을 작성해주세요");
		return false;
	}
	
	tel_no = $("#tel_no").val();
	
	for(var i=0; i<tel_no.length; i++){
		var str = tel_no.substring(i,i+1);
		if(!numberChk(str)){
			tel_no = replaceAll(str, "", tel_no);
			i--;
		}
	}
	tel_no = tel_no.replace(/ /g, '');
	$("#tel_no").val(tel_no);
	
	if(tel_no == ""){
		alert("휴대전화번호를 작성해주세요");
		return false;
	}
	
	bigo1 = $("#bigo1").val();
	if(bigo1 == ""){
		bigo1 = bigo1 + " ";
	}
	

	
	
	
	$.ajax({
 		type:"POST",
 		url: "/ServiceAPI/quiz/quiz2017.json",
 		data:{
 			"gubun" : "sel",
 			"ox_1" : ox_1,
 			"ox_2" : ox_2,
 			"ox_3" : ox_3,
 			"ox_4" : ox_4,
 			"ox_5" : ox_5,
 			"ox_6" : ox_6,
 			"bigo1" : bigo1,
 			"sex" : sex,
 			"name" : name,
 			"tel_no" : tel_no
 		},
 		success:function(data){
 				//	alert("제출이 완료되었습니다.")
 					if(data.result.resultCnt > 0){
 						if(confirm("입력된 휴대전화번호로 등록된 데이터가 있습니다. 수정하시겠습니까?")){
 							oxSubmit("mod");
 						}
 					}else{
 						oxSubmit("reg");
 					}
				},
 		error:function(data){
 		//	alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
 		//	closeWindow();
 			}
 		});
}




function oxSubmit(gubun){
		if(bigo1 == ""){
			bigo1 = bigo1 + " ";
		}
		$.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/quiz/quiz2017.json",
	 		data:{
	 			"gubun" : gubun,
	 			"ox_1" : ox_1,
	 			"ox_2" : ox_2,
	 			"ox_3" : ox_3,
	 			"ox_4" : ox_4,
	 			"ox_5" : ox_5,
	 			"ox_6" : ox_6,
	 			"bigo1" : bigo1,
	 			"sex" : sex,
	 			"name" : name,
	 			"tel_no" : tel_no
	 		},
	 		success:function(data){
	 				alert("제출이 완료되었습니다.")
	 				apiLogWrite2("R0", "R04", "이벤트", "2017년 OX 퀴즈 등록 및 수정", "00", "없음");
					window.close();	 				
					},
	 		error:function(data){
	 		//	alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
	 		//	closeWindow();
	 			}
	 		});
}

function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
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

function closeWindow(){
	window.close();
}

</script>
</head>
<body>
<p>
		<img src="./img/notice.png" alt="공지사항" style="margin-left: 100px;"/>
</p>
	<div id="wrap">
		<img src="./img/title.png" alt="title"/>
		<div>
			<div class="question mt50">
				<p class="mb20">	1.<span> 『통계주제도』</span> 는 사회적으로 관심있는 주제를 선정하여 관련 통계를 간편하게 색채지도로 조회할 수 있는 서비스입니다. 2015년 기준으로 우리나라에서 아파트가 가장 많은 지역은 서울특별시이다. </p>
				<div class="mb10">
					<button class="oxo" value="1_O"><img src="./img/o.png" alt="o"/></button>
					<button class="oxx" value="1_X"><img src="./img/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=rLvGnxrtvo20160121115806982pvp4FKMFFn&theme=CTGR_002&mapType=05" class="hint" target="_blank" >(힌트) 통계주제도>주거와 교통>아파트현황</a></p>
			</div>
		</div>
		<div>
			<div class="question mt30">
				<p class="mb20">	2.<span>『대화형 통계지도』</span>는 사용자가 직접 인구, 주택, 가구, 농림어업, 사업체, KOSIS(지역통계) 등 다양한 통계항목을 지도 위에서 소지역단위(집계구)로 조회하여 비교․분석할 수 있는 서비스입니다. 대전지역 전체에서 인구가 가장 많은 지역(구)은 대전시 서구이다  </p>
				<div class="mb10">
					<button class="oxo" value="2_O"><img src="./img/o.png" alt="o"/></button>
					<button class="oxx" value="2_X"><img src="./img/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><a href="/view/map/interactiveMap/mainIndexView" class="hint" target="_blank"> (힌트) 대화형 통계지도>총조사 주요지표>총인구</a></p>
			</div>
		</div>

		<div>
			<div class="question mt30">
				<p class="mb20">	3.<span>『살고싶은 우리동네』</span>는 사용자가 선택한 지표에 맞는 주거지역을 추천해 주는 서비스입니다. 간편동네찾기의 관심동네에는 북적북적동네, 열공동네, 여유만만동네, 튼튼동네 등 4개로 구분 되어 있다</p>
				<div class="mb10">
					<button class="oxo" value="3_O"><img src="./img/o.png" alt="o"/></button>
					<button class="oxx" value="3_X"><img src="./img/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><a href="/view/house/houseAnalysisMap" class="hint" target="_blank" >(힌트) 살고싶은 우리동네>간편동네찾기</a></p>
			</div>
		</div>
		<div>
			<div class="question mt30 mb30">
				<p class="mb20">	4.2015년 서울특별시 강남구의 65세이상 인구 중 1인 가구는 강남구 수서동이 921명으로 가장 많다. </p>
				<div class="mb10">
					<button class="oxo" value="4_O"><img src="./img/o.png" alt="o"/></button>
					<button class="oxx" value="4_X"><img src="./img/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><a href="/view/map/interactiveMap/populationHouseView" class="hint" target="_blank">(힌트) 대화형 통계지도>인구주택총조사>결합조건 : 연령별(선택), 세대구성별(선택)</a></p>
			</div>
		</div>
		<div>
			<div class="question mt30 mb30">
				<p class="mb20">	5.2015년 65세이상 인구와 1인가구의 비율은 2000년보다 전체적으로 줄었다.</p>
				<div class="mb10">
					<button class="oxo" value="5_O"><img src="./img/o.png" alt="o"/></button>
					<button class="oxx" value="5_X"><img src="./img/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><a href="/statbd/future_01.vw" class="hint" target="_blank">(힌트) 분석지도>지방의 변화보기> 65세이상 인구와 1인가구 클릭 </a></p>
			</div>
		</div>
		<div>
			<div class="question mt30 mb30 last">
				<p class="mb20">	6.통계지리정보서비스에서는 이용자가 갖고 있는 자료를 업로드하여 지도 위에 위치표시 및 공간분석을 할 수 있습니다. 대화형 통계지도의 “나의 데이터”를 이용하려면 로그인을 하여야 한다.  </p>
				<div class="mb10">
					<button class="oxo" value="6_O"><img src="./img/o.png" alt="o"/></button>
					<button class="oxx" value="6_X"><img src="./img/x.png" alt="X"/></button>
				</div>
				<p class="mt10"><a href="/view/map/interactiveMap/userDataView" class="hint" target="_blank">(힌트) 대화형 통계지도>나의 데이터</a></p>
			</div>
		</div>
	</div><!--wrap-->
	<div class="improvement">
		<p> SGIS를 이용하면서 느낀 불편한 점이나 개선해야 할 점, 오류 등을 자유롭게 적어주시면 보다 나은 서비스가 되도록 노력하겠습니다. </p>
		<textarea id="bigo1"></textarea>
		<h1 class="mt30">개인정보수집</h1>
		<p class="mt10">개인정보 수집항목(성별, 성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다. </p>
		<ul class="mt20">
			<li><input type="radio" name="agreement" class="mr5" value="Y" />동의   <input type="radio" name="agreement" class="ml5 mr5" value="N" />비동의</li>
		</ul>
		<ul class="mt20 br">
			<li class="mt10">성별 :<input type="radio" name="sex" class="ml5" value="M" />남 <input type="radio" name="sex" class="ml5 mr5" value="F" />여</li>
			<li>성명 :<input type="text" class="input"/ id="name">
			<li>휴대전화번호 :<input type="text" class="input" id="tel_no" />(숫자만 입력해 주세요)
		</ul>
		
		<div align="right">
			<input type="button" value="제출" style="width:80px; height: 28px;" onclick="javascript:valChk();"/>
			<input type="button" value="종료" style="width:80px; height: 28px;" onclick="javascript:closeWindow()"/>
		</div>
	</div>
</body>
</html>
