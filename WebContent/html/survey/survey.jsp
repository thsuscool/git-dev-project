<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>SGIS 통계지리정보서비스</title>
<link rel="stylesheet" type="text/css" href="./css/common.css" />
<script type='text/javascript' src='/js/plugins/jquery-1.11.1.min.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>

<script type="text/javascript">
	
		var wsize = 1050;
     	var hsize = 3227;
     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
   	 }
     	
	$(document).ready(function(){
		$(".quizBtn").hide();
		$(".imsi").hide();
		$("#srv41").parent().hide();
		$("#srv42").parent().hide();
		
		apiLogWrite3("R05","2017년 설문조사 view");
		
	});
	
	function fnAgree(val){
		$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);
		
		if(val == "Y"){
			$(".quizBtn").show();
				$(".imsi").show();
		} else {
			$(".quizBtn").hide();
				$(".imsi").hide();
		}
	}
	
	function setEtcVal(survayNum, val, aNum, obj){
		if($(obj).parent().children().hasClass('on')){
			$(obj).parent().children().removeClass('on');
		} else {
			$(obj).parent().children('a').attr('class', 'on')
			// 기타 포커스
			if((survayNum == "2" || survayNum == "31" || survayNum == "5") && val == "8"){
	 			$("#etc"+ survayNum).focus();
	 		} else if(val == "13"){
	 			$("#etc"+ survayNum).focus();
 			} else if(survayNum == "41" || survayNum == "42"){
 				$("#survay"+survayNum).val(val);
				$("#srv" + (survayNum) + " li>a").removeClass('on');
				$("#srv" + (survayNum) + " li>a").eq(aNum-1).attr('class', 'on');
 			}
		}
		$("#etc"+survayNum).attr('class', 'ml15');
	}
	
	function setVal(survayNum, val, aNum, obj){
		
		if(survayNum == "2" || survayNum == "31" || survayNum == "32" || survayNum == "5"){
	 		if($(obj).children().hasClass('on')){
				$(obj).children().removeClass('on');
			} else {
				$(obj).children().attr('class', 'on');
	 		}
	 		
// 			$("#srv" + (survayNum) + " li>a").eq(aNum-1).toggleClass('on');
	 		return false;
		}
		else if(survayNum == "3"){
			if(val == "5"){
				$("#srv31").parent().hide();
				$("#srv32").parent().hide();
				$("#srv4").parent().hide();
				$("#srv5").parent().hide();
				$("#srv41").parent().hide();
				$("#srv42").parent().hide();
			}
			else {
				$("#srv31").parent().show();
				$("#srv32").parent().show();
				$("#srv4").parent().show();
				$("#srv5").parent().show();
				$("#srv4 li>a").removeClass('on');
			}
		}
		else if(survayNum == "4"){
			$("#srv41 li>a").removeClass('on');
			$("#srv42 li>a").removeClass('on');
			$("#survay41").val("");
			$("#survay42").val("");
			$("#etc41").val("");
			$("#etc42").val("");
			if(val == "1" || val == "2"){
				$("#srv41").parent().show();
				$("#srv42").parent().hide();
			}
			else if(val != "3"){
				$("#srv41").parent().hide();
				$("#srv42").parent().show();
			}
			else {
				$("#srv41").parent().hide();
				$("#srv42").parent().hide();
			}
		}
		$("#survay"+survayNum).val(val);
		$("#srv" + (survayNum) + " li>a").removeClass('on');
		$("#srv" + (survayNum) + " li>a").eq(aNum-1).attr('class', 'on');
		
	}
	
	function surveyEnter(){
		
		$("#survay2").val($("#srv2 li>a.on").text());
		$("#survay31").val($("#srv31 li>a.on").text());
		$("#survay32").val($("#srv32 li>a.on").text());
		$("#survay5").val($("#srv5 li>a.on").text());
		
		$("#survay7").val($("#srv7text").val());
		$("#survay8").val($("#srv8text").val());
		
		if($("#name").val()==""){
			alert("이름을 입력해주세요");
			$("#name").focus();
			return false;
		}
		
		if($("#tel_no").val()==""){
			alert("이동전화번호(휴대폰)를 입력해주세요");
			$("#tel_no").focus();
			return false;
		} 
		if($("#survay1").val() == ""){ alert("1번 문항을 선택해 주세요"); return false; }
		if($("#survay2").val() == ""){ alert("2번 문항을 선택해 주세요"); return false; }
		if($("#survay3").val() == ""){ alert("3번 문항을 선택해 주세요"); return false; }
		if($("#survay3").val() != "5"){
			if($("#survay31").val() == ""){  alert("3-1번 문항을 선택해 주세요"); return false; }
			if($("#survay32").val() == ""){ alert("3-2번 문항을 선택해 주세요"); return false; }
			if($("#survay4").val() == ""){ alert("4번 문항을 선택해 주세요"); return false; }
			if($("#survay4").val() == "1" || $("#survay4").val() == "2"){
				if($("#survay41").val() == ""){ alert("4-1번 문항을 선택해 주세요"); return false; }
			} else if($("#survay4").val() == "4" || $("#survay4").val() == "5"){
				if($("#survay42").val() == ""){ alert("4-2번 문항을 선택해 주세요"); return false; }
			}
			if($("#survay5").val() == ""){ alert("5번 문항을 선택해 주세요"); return false; }
		}
		if($("#survay6").val() == ""){ alert("6번 문항을 선택해 주세요"); return false; }
// 		if($("#survay7").val() == ""){ alert("7번 문항을 선택해 주세요"); return false; }
// 		if($("#survay8").val() == ""){ alert("8번 문항을 선택해 주세요"); return false; }
		if($("#survay9").val() == ""){ alert("9번 문항을 선택해 주세요"); return false; }
		if($("#survay10").val() == ""){ alert("10번 문항을 선택해 주세요"); return false; }
		if($("#survay11").val() == ""){ alert("11번 문항을 선택해 주세요"); return false; }
					
		var survay9 = "-", survay10 = "-", survay11 = "-", survay12 = "-", survay13 = "-", survay14 = "-", etc10 = "-";
		
		if($("#survay2").val().length < 5){
			survay9 = $("#survay2").val();
			survay10 = "-";
		} else{
			survay9 = $("#survay2").val().substring(0,4);
			survay10 = $("#survay2").val().substring(4,$("#survay2").val().length);
		}

		if($("#survay3").val() != "5"){
			if($("#survay31").val().length < 5){
				survay11 = $("#survay31").val();
				survay12 = "-";
			} else{
				survay11 = $("#survay31").val().substring(0,4);
				survay12 = $("#survay31").val().substring(4,$("#survay31").val().length);
			}
			
			if($("#survay5").val().length < 5){
				survay13 = $("#survay5").val();
				survay14 = "-";
			} else {
				survay13 = $("#survay5").val().substring(0,4);
				survay14 = $("#survay5").val().substring(4,$("#survay5").val().length);
			}
			
			etc10 = $("#survay32").val();
		}
		
		if($("#survay4").val() == "") $("#survay4").val("-");
		if($("#survay7").val() == "") $("#survay7").val("-");
		if($("#survay8").val() == "") $("#survay8").val("-");
		if($("#etc2").val() == "") $("#etc2").val("-");
		if($("#etc31").val() == "") $("#etc31").val("-");
		if($("#etc32").val() == "") $("#etc32").val("-");
		if($("#etc41").val() == "") $("#etc41").val("-");
		if($("#etc42").val() == "") $("#etc42").val("-");
		if($("#etc5").val() == "")  $("#etc5").val("-");
		if($("#survay41").val() == "") $("#survay41").val("-");
		if($("#survay42").val() == "") $("#survay42").val("-");
		
		if(confirm("제출하시겠습니까?") == true){
			
			jQuery.ajax({
		 		type:"POST",
		 		url: "/ServiceAPI/common/APILogWrite.json",
		 		data:{	"type": "Q0",
		 			"api_id" : "R06",
		 			"title" : "2017년 설문조사 등록 및 수정",
		 			"parameter" : "없음",
		 			"zoomLevel" : "00",
		 			"adm_nm" : "전국"
		 		},
				async: true,
		 		success:function(data){ 
					$.ajax({
				 		type:"POST",
				 		url: "/ServiceAPI/quiz/quiz2017.json",
				 		data:{
				 			"gubun" : "survey",
				 			"survay1" : $("#survay1").val(),
				 			"survay2" : $("#survay3").val(),
				 			"survay3" : $("#survay4").val(),
				 			"survay4" : $("#survay6").val(),
				 			"survay5" : $("#survay9").val(),
				 			"survay7" : $("#survay10").val(),
				 			"survay8" : $("#survay11").val(),
				 			"survay9" : survay9,
				 			"survay10" : survay10,
				 			"survay11" : survay11,
				 			"survay12" : survay12,
				 			"survay13" : survay13,
				 			"survay14" : survay14,
				 			"etc1" : $("#survay7").val(),
				 			"etc2" : $("#survay8").val(),
				 			"etc3" : $("#etc2").val(),
				 			"etc4" : $("#etc31").val(),
				 			"etc5" : $("#etc32").val(),
				 			"etc6" : $("#survay41").val() + $("#etc41").val(),
				 			"etc7" : $("#survay42").val() + $("#etc42").val(),	 			
							"etc9" : $("#etc5").val(),
							"etc10" : etc10,
				 			"name" : $("#name").val(),
				 			"tel_no" : $("#tel_no").val()
				 		},
				 		success:function(data){
				 			if(data.result.resultCnt > 0){
			 					alert("등록된 연락처입니다.");
				 			}
		 					else {
								alert("등록되었습니다.");
				 				self.close();
		 					}
			 			},
				 		error:function(data){
				 			console.log(data);
				 		}
			 		});
		 		},
		 		error:function(data) {
					console.log("실패" + data); 
		 		}
			});
				
			
		} else
			return;
	}
	
	function onlyNumber(obj){
		$(obj).keyup(function(){
			$(this).val($(this).val().replace(/[^0-9]/g,""));
		});
	}
	
	function surveyCansle(){
		self.close();
	}
	
	function apiLogWrite3(api_id, title){
		jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/common/APILogWrite.json",
	 		data:{	"type": "Q0",
	 			"api_id" : api_id,
	 			"title" : title,
	 			"parameter" : "없음",
	 			"zoomLevel" : "00",
	 			"adm_nm" : "전국"
	 		},
			async: true,
	 		success:function(data){ 
// 				console.log("성공");
	 		},
	 		error:function(data) {
// 				console.log("실패" + data); 
	 		}
		});
	}
	
</script>
</head>
<body>
	<div id="wrapper">
		<div class="wrap">
			<div class="header">
				<p>2017<br>통계청 <b style="color:#4da4af;">통계지리정보서비스(SGIS)</b><br>이용자 설문조사</p>
			</div>
			
			<input type="hidden" id="survay1"  value="">
			<input type="hidden" id="survay2"  value="">
			<input type="hidden" id="survay3"  value="">
			<input type="hidden" id="survay31" value="">
			<input type="hidden" id="survay32" value="">
			<input type="hidden" id="survay4"  value="">
			<input type="hidden" id="survay41" value="">
			<input type="hidden" id="survay42" value="">
			<input type="hidden" id="survay5"  value="">
			<input type="hidden" id="survay6"  value="">
			<input type="hidden" id="survay7"  value="">
			<input type="hidden" id="survay8"  value="">
			<input type="hidden" id="survay9"  value="">
			<input type="hidden" id="survay10" value="">
			<input type="hidden" id="survay11" value="">
			
			<div class="content">
			    <!--문제1-->
				<div class="content-top">
					 <div class="content-1" id="srv1">
						<p>1. 통계지리정보서비스(SGIS)에 대해 알고 있었습니까?</p>
							<ul>
								<li onclick="setVal(1,1,1)"><a>1</a><span>매우 잘 알고 있다.</span></li> 
								<li onclick="setVal(1,2,2)"><a>2</a><span>잘 알고 있다.</span></li>
								<li onclick="setVal(1,3,3)"><a>3</a><span>잘은 모르지만 들어는 봤다.</span></li>
								<li onclick="setVal(1,4,4)"><a>4</a><span>이번에 처음 알게 됨</span></li>
							</ul>
					 </div>
				</div>
				<!--문제end-->
				<!--문제2-->
				<div class="content-top">
					 <div class="content-1" id="srv2">
						<p>2. 통계지리정보서비스(SGIS)를 어떻게 알게 되셨습니까? (중복응답 가능)</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(2,1,1,this)"><a>1</a><span>통계청 홈페이지</span></li> 
									<li onclick="setVal(2,4,2,this)"><a>4</a><span>뉴스 및 신문기사</span></li>
									<li onclick="setVal(2,7,3,this)"><a>7</a><span>전시회</span></li>
								</ul>
								<ul>
									<li onclick="setVal(2,2,4,this)"><a>2</a><span>KOSIS 국가통계포털</span></li> 
									<li onclick="setVal(2,5,5,this)"><a>5</a><span>일반 포털</span></li>
<!-- 									<li onclick="setVal(2,8,6,this)"><a>8</a><span>기타</span><input type="text" id="etc2" maxlength="100" class="ml15"/></li> -->
									<li><a onclick="setEtcVal(2,8,6,this);">8</a><span onclick="setEtcVal(2,8,6,this);">기타</span><input type="text" id="etc2" maxlength="100" class="ml15"/></li>
								</ul>
								<ul>
									<li onclick="setVal(2,3,7,this)"><a>3</a><span>통계청 블로그 및 정책메일</span></li> 
									<li onclick="setVal(2,6,8,this)"><a>6</a><span>통계간행물</span></li>
								</ul>
						    </div>
					 </div>
				</div>
				<!--문제end-->
				<!--문제3-->
				<div class="content-top">
					 <div class="content-1" id="srv3">
						<p>3. 통계지리정보서비스(SGIS)를 얼마나 자주 이용하십니까?</p>
							<ul>
								<li onclick="setVal(3,1,1)"><a>1</a><span>수시로 이용</span></li> 
								<li onclick="setVal(3,2,2)"><a>2</a><span>한 달에 1회</span></li>
								<li onclick="setVal(3,3,3)"><a>3</a><span>한 달에 2~3회</span></li>
								<li onclick="setVal(3,4,4)"><a>4</a><span>분기에 1회</span></li>
								<li onclick="setVal(3,5,5)"><a>5</a><span>거의 이용하지 않는다.</span> ☞ 6번 문항으로 이동</li>
							</ul>
					 </div>
				</div>
			</div>
			<!--end-->
			<!--문제4-->
				<div class="content-top">
					 <div class="content-1" id="srv31">
						<p>3-1. 통계지리정보서비스(SGIS) 이용하시는 주된 목적은 무엇입니까?(중복응답 가능)</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(31,1,1,this)"><a>1</a><span>연구분석(논문)</span></li> 
									<li onclick="setVal(31,4,2,this)"><a>4</a><span>보고서 작성(시각화목적)</span></li>
									<li onclick="setVal(31,7,3,this)"><a>7</a><span>단순 정보 파악</span></li>
								</ul>
								<ul>
									<li onclick="setVal(31,2,4,this)"><a>2</a><span>정책수립의 기초자료</span></li> 
									<li onclick="setVal(31,5,5,this)"><a>5</a><span>상권분석 등 마케팅자료</span></li>
									<li><a onclick="setEtcVal(31,8,6,this)">8</a><span onclick="setEtcVal(31,8,6,this)">기타</span><input type="text" id="etc31" maxlength="100" class="ml15"/></li>
								</ul>
								<ul>
									<li onclick="setVal(31,3,7,this)"><a>3</a><span>교육용 자료(실습, 강의 등)</span></li> 
									<li onclick="setVal(31,6,8,this)"><a>6</a><span>프로그램 개발 및 DB구축</span></li>
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제5-->
				<div class="content-top">
					 <div class="content-1" id="srv32">
						<p>  3-2. 자주 이용하시는 콘텐츠는 무엇입니까? (중복응답 가능)</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(32,1,1,this)"><a>1</a><span>통계주제도</span></li> 
									<li onclick="setVal(32,5,2,this)"><a>5</a><span>지역현안 소통지도</span></li>
									<li onclick="setVal(32,9,3,this)"><a>9</a><span>움직이는 인구피라미드</span></li>
									<li><a onclick="setEtcVal(32,13,4,this)">13</a><span onclick="setEtcVal(32,13,4,this)">기타</span><input type="text" id="etc32" maxlength="100" class="ml15"/></li>
								</ul>
								<ul>
									<li onclick="setVal(32,2,5,this)"><a>2</a><span>대화형통계지도</span></li> 
									<li onclick="setVal(32,6,6,this)"><a>6</a><span>통계지도체험</span></li>
									<li onclick="setVal(32,10,7,this)"><a>10</a><span>성씨분포</span></li>
								</ul>
								<ul>
									<li onclick="setVal(32,3,8,this)"><a>3</a><span>살고싶은 우리동네</span></li> 
									<li onclick="setVal(32,7,9,this)"><a>7</a><span>고령화 현황보기</span></li>
									<li onclick="setVal(32,11,10,this)"><a>11</a><span>자료제공 및 신청</span></li>
								</ul>
								<ul>
									<li onclick="setVal(32,4,11,this)"><a>4</a><span>우리동네 생활업종</span></li> 
									<li onclick="setVal(32,8,12,this)"><a>8</a><span>지방의 변화보기</span></li>
									<li onclick="setVal(32,12,13,this)"><a>12</a><span>개발자지원센터(Open API)</span></li>
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제6-->
				<div class="content-top">
					 <div class="content-1" id="srv4">
						<p>4. 통계지리정보서비스(SGIS)에 대해 전반적으로 얼마나 만족하십니까?</p>
							<ul>
								<li onclick="setVal(4,1,1)"><a>1</a><span>매우 만족</span>    ☞ 4-1번 문항으로 이동</li> 
								<li onclick="setVal(4,2,2)"><a>2</a><span>만족</span>          ☞ 4-1번 문항으로 이동</li>
								<li onclick="setVal(4,3,3)"><a>3</a><span>보통</span></li>
								<li onclick="setVal(4,4,4)"><a>4</a><span>불만족</span>        ☞ 4-2번 문항으로 이동</li>
								<li onclick="setVal(4,5,5)"><a>5</a><span>매우 불만족</span>   ☞ 4-2번 문항으로 이동</li>
							</ul>
					 </div>
				</div>
			<!--문제end-->
			<!--문제7-->
				<div class="content-top">
					 <div class="content-1" id="srv41">
						<p>4-1. (4번 문항에서 ①, ②번 응답자만 해당) 만족한 이유는 무엇입니까?</p>
							<ul>
								<li onclick="setVal(41,1,1)"><a>1</a><span>지도와 통계가 융합되어 통계 이해에 도움</span></li> 
								<li onclick="setVal(41,2,2)"><a>2</a><span>제공하는 콘텐츠 다양</span></li>
								<li onclick="setVal(41,3,3)"><a>3</a><span>읍면동보다도 더 작은 단위의 소지역 통계 제공</span></li>
								<li onclick="setVal(41,4,4)"><a>4</a><span>자료공개(자료제공, Open API)로 공간통계 활용 유용</span></li>
								<li><a onclick="setEtcVal(41,5,5,this)">5</a><span onclick="setEtcVal(41,5,5,this)">기타</span><input type="text" id="etc41" maxlength="100" class="ml15"/></li>
							</ul>
					 </div>
				</div>
			<!--문제end-->
			<!--문제8-->
				<div class="content-top">
					 <div class="content-1" id="srv42">
						<p> 4-2. (4번 문항에서 ④, ⑤번 응답자만 해당) 만족하지 않는 이유는 무엇입니까?</p>
							<ul>
								<li onclick="setVal(42,1,1)"><a>1</a><span>수록 통계자료가 다양하지 않음</span></li> 
								<li onclick="setVal(42,2,2)"><a>2</a><span>이용절차 복잡</span></li>
								<li onclick="setVal(42,3,3)"><a>3</a><span>이용방법에 대한 설명 부족</span></li>
								<li onclick="setVal(42,4,4)"><a>4</a><span>홈페이지 디자인이나 구성 불만족</span></li>
								<li><a onclick="setEtcVal(42,5,5,this)">5</a><span onclick="setEtcVal(42,5,5,this)">기타</span><input type="text" id="etc42" maxlength="100" class="ml15"/></li>
							</ul>
					 </div>
				</div>
		   <!--문제end-->
		   <!--문제9-->
				<div class="content-top">
					 <div class="content-1" id="srv5">
						<p>5. 통계지리정보서비스(SGIS)가 개선이 필요한 부분은 무엇이라고 생각하십니까?(중복응답 가능) </p>
							<ul>
								<li onclick="setVal(5,1,1,this)"><a>1</a><span>다양한 방법으로 지속적인 홍보</span></li> 
								<li onclick="setVal(5,2,2,this)"><a>2</a><span>서비스 이용 편의성 확대 및 절차 간소화</span></li>
								<li onclick="setVal(5,3,3,this)"><a>3</a><span>통계 수록자료 및 제공범위 확대</span></li>
								<li onclick="setVal(5,4,4,this)"><a>4</a><span>홈페이지(SGIS) 구성 및 사이트맵 개선</span></li>
								<li onclick="setVal(5,5,5,this)"><a>5</a><span>다양한 서비스 개발</span></li>
								<li onclick="setVal(5,6,6,this)"><a>6</a><span>공간분석 및 시각화 기능 강화</span></li>
								<li onclick="setVal(5,7,7,this)"><a>7</a><span>개발자 지원기능 강화</span></li>
								<li><a onclick="setEtcVal(5,8,8,this)">8</a><span onclick="setEtcVal(5,8,8,this)">기타</span><input type="text" id="etc5" maxlength="100" class="ml15"/></li>
							</ul>
					 </div>
				</div>
		   <!--문제end-->
		   <!--문제10-->
				<div class="content-top">
					 <div class="content-1" id="srv6">
						<p> 6. 귀하는 앞으로도 통계지리정보서비스(SGIS)를 계속 이용하시겠습니까?</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(6,1,1)"><a>1</a><span>꼭 이용할 것</span></li> 
									<li onclick="setVal(6,4,2)"><a>4</a><span>별로 이용할 생각없음</span></li>
								</ul>
								<ul>
									<li onclick="setVal(6,2,3)"><a>2</a><span>이용할 생각이 조금 있음</span></li> 
									<li onclick="setVal(6,5,4)"><a>5</a><span>전혀 이용할 생각없음</span></li>
								</ul>
								<ul>
									<li onclick="setVal(6,3,5)"><a>3</a><span>보통</span></li> 
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제11-->
				<div class="content-top">
					 <div class="content-1" id="srv7">
						<p>7. SGIS의 서비스 개선을 위하여 귀하의 의견을 자유롭게 적어주시기 바랍니다.<br/>
						      &nbsp;&nbsp; (이용시 불편했던 점, 새롭게 추가되었으면 하는 서비스, 개선사항, Open API 등)</p>
							<div class="content-3">
								<textarea id="srv7text" maxlength="2000" class="content-squre"></textarea>
							</div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제12-->
				<div class="content-top">
					 <div class="content-1" id="srv8">
						<p> 8. SGIS의 이용 활성화를 위해서 언론보도, 대규모 전시회 참가, 이벤트 실시,<br/> 
						    &nbsp;&nbsp; 수요조사를 통한 방문교육 등을 실시하고 있습니다. 이외에도 SGIS를 널리 홍보하기 위한<br/>  
							&nbsp;&nbsp; 아이디어가 있으시면 의견주시기 바랍니다.</p>
							<div class="content-3">
								<textarea id="srv8text" maxlength="2000" class="content-squre"></textarea>
							</div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제13-->
				<div class="content-top">
					 <div class="content-1" id="srv9">
						<p>(9번~11번은 자료 분석용으로만 활용합니다.)<br/> 
							&nbsp;9. 귀하의 성별은 무엇입니까?</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(9,1,1)"><a>1</a><span>남자</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(9,2,2)"><a>2</a><span>여자</span></li> 
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제14-->
				<div class="content-top">
					 <div class="content-1" id="srv10">
						<p>10. 귀하의 연령대는 어떻게 되십니까?</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(10,1,1)"><a>1</a><span>19세 이하</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(10,2,2)"><a>2</a><span>20~29세</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(10,3,3)"><a>3</a><span>30~39세</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(10,4,4)"><a>4</a><span>40~49세</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(10,5,5)"><a>5</a><span>50~59세</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(10,6,6)"><a>6</a><span>60세 이상</span></li> 
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제15-->
				<div class="content-top">
					 <div class="content-1" id="srv11">
						<p>11. 귀하의 소속은 어디입니까?</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(11,1,1)"><a>1</a><span>연구기관</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(11,2,2)"><a>2</a><span>정부기관</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(11,3,3)"><a>3</a><span>교육기관</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(11,4,4)"><a>4</a><span>지방자치단체</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(11,5,5)"><a>5</a><span>금융기관</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(11,6,6)"><a>6</a><span>개인</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(11,7,7)"><a>7</a><span>기타</span></li> 
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<div class="last">※ 설문에 참여해 주셔서 감사합니다.</div>
			<!--문제15-->
				<div class="content-top">
					 <div class="content-1">
						<p>개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며,
						경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다.</p>
							<ul class="squre-type1" style="margin-left: 360px">
								<li onclick="fnAgree('Y');"><input type="radio" name="agreement" value="Y" />동의</li>
								<li onclick="fnAgree('N');"><input type="radio" name="agreement" value="N" checked="checked"/>비동의</li>
							</ul>
							<div class="content-3 h185 imsi">
									<ul class="squre-type2">
										<li>이        름:<input type="text" id="name" maxlength="10" class="ml15"/></li>
										<li>이동전화번호(휴대폰):<input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);" class="ml15"/></li>
									</ul>
								
							</div>
					 </div>
				</div>
			<!--문제end-->
			
			<div class="quizBtn" style="top:420px;">
				<a onclick="surveyEnter();" class="btnType01">제출하기</a>
				<a onclick="surveyCansle();" class="btnType02">취소</a>
			</div>
			
		</div>
	</div>
</body>
</html>
