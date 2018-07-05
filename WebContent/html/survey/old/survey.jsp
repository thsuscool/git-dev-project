<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>SGIS 설문조사</title>
<link rel="stylesheet" type="text/css" href="./styles/common.css" />
<link rel="stylesheet" type="text/css" href="./styles/layout.css" />
<link rel="stylesheet" type="text/css" href="./styles/survey.css" />
<script src="./js/jquery-1.11.1.min.js"></script>
<%
	
	if(request.getParameter("err")==null || "".equals(request.getParameter("err"))){
		
	}else{
		if("err".equals(request.getParameter("err"))){
			%>
				<script type="text/javascript">
					alert("오류가 발생했습니다. 잠시후 다시 한번 시도해주세요");
				</script>
			<%
		}
	}
%>
<script type="text/javascript" language="javascript">
//<![CDATA[
     var wsize = 960;
     var hsize = 897;
     document.onreadystatechange=resizeFrame;
     function resizeFrame(){
    	 try{
    		 self.resizeTo(wsize, hsize);
    	 }catch(e){
    		 
    	 }
     }
     
     function fncResist() {
    	if(document.getElementsByName("sex")[0].checked ==true){
    		document.getElementById("mf").value = "M"
    	}else if(document.getElementsByName("sex")[1].checked ==true){
    		document.getElementById("mf").value = "F"
    	}
    	if(document.getElementById("name").value == "") {
			alert("성명을 입력하세요.");
			document.getElementsByName("name")[0].focus();
		    return;			
		} else if(document.getElementById("tel").value == "") {
			alert("전화번호를  입력하세요.");
			document.getElementsByName("tel")[0].focus();
		    return;	
		} else {
			document.joinFm.action="/contents/survey/survey_insert.jsp";
			document.joinFm.submit();
			return true;
		}
    	  /*
		    	  	     	
		
    	  */
	} 
 	

   function MM_openBrWindow(theURL,winName,features) { //v2.0
   	   var add = "scrollbars=yes, toolbar=no resizable=no,"+features;
   	  window.open(theURL,winName,add);
   }
   function fncCheck(qNum){
	   
	   var num = qNum.split("_")[1];
	   var select = qNum.split("_")[2];
	   if(num != "6"){
		   for(var i=1;i<5;i++){
			   if(i!=select){
				   $("#q_"+num+"_"+i+"").css("color", "#666");
			   }else{
				   $("#q_"+num+"_"+i+"").css("color", "red");
			   }
		   }
		   $("#q_"+num).html(select);
		   var name = "q_"+num;
		   if(name == "q_1"){
			   document.joinFm.q1.value = select;
		   }else{
			   document.joinFm.q3.value = select;
		   }
		   
	   }else{
		   for(var i=1;i<7;i++){
			   if(i!=select){
				   $("#q_"+num+"_"+i+"").css("color", "#666");
			   }else{
				   $("#q_"+num+"_"+i+"").css("color", "red");
			   }
		   }
		   document.joinFm.q6.value = select;
	   }
   }
	function fncCancel(){
		window.location.reload();
	}
//]]>
</script>
</head>
<body  >
<form name="joinFm" method="post">
	<div class="wrapper">
		<div class="contentsWrapper" >
			<div class="contents">			
				<div class="title">
					‘<span>SGIS오픈플랫폼(SOP:가칭)</span>’은 센서스 자료와 민간 데이터를 분석하고 공유할 수 있도록 구축한 SGIS서비스의 발전된 서비스로 2015년 4월 27일부터 대국민 시범서비스를 실시하고 있습니다.
				</div>
				<div class="question mt30">
					1. 이러한 서비스의 성격을 잘 반영한 ‘SGIS오픈플랫폼(SOP)’의 명칭은 무엇이라고 생각하십니까?( <span id="q_1"> </span> )
					<ul class="mt20">
						<li><a href="javascript:fncCheck('q_1_1')" id="q_1_1">1.SGIS통하는 지도</a>
							<br/>(센서스 자료와 민간 데이터를 활용해서 사용자가 원하는 정보를 얻을 수 있는, 통계로 통하는 지도라는 의미)  </li>
						<li><a href="javascript:fncCheck('q_1_2')" id="q_1_2">2.SGIS열린나루</a>
							<br/>(열린은 ‘open' 즉 ’열다‘, ’나루‘는 강이나 내, 바다목 등에서 배가 건너다니는 곳이란 의미로, 통계를 지도위에서 표현하고 정보 공유를 통해 열려있다는 의미)  
						</li>
						<li><a href="javascript:fncCheck('q_1_3')" id="q_1_3">3.통계여지도</a><br/>(대동여지도처럼 통계의 종합적인 내용을 담은 통계지도 서비스라는 의미) </li>
						<li><a href="javascript:fncCheck('q_1_4')" id="q_1_4">4.S-MAP</a>
							<br/>(‘S’는 SGIS 또는 Statistical등을 의미하며 통계를 지도로 표현하는 서비스라는 의미, ‘에스맵’으로 한국어 음절도 짧고, 통계와 지도를 서비스하는 의미도 함축하고 있으며, URL주소로 활용할 수도 있음)
						</li>
					</ul>
				</div>
				<div class="question mt30">
					2.  ‘SGIS오픈플랫폼(SOP)’의 명칭을 제안해주세요!<br/>
					<span>* 제안한 명칭은 통계청에 귀속되며, 우수 제안자를 선정하여 상품권을 지급합니다. </span>
					<div class="questionInputA mt20">	
						명칭<input type="text" class="questionInput w150 ml10 mr10" id="q_2_name" name="q_2_name"/>
						의미<input type="text" class="questionInput w545 ml10" id="q_2_contents" name="q_2_contents"/>
					</div>
				</div>				
				<div class="title mt30">
					‘<span>‘인터랙티브 맵’</span>’은 사용자가 필요에 따라 다양한 통계자료를 선택하여 공간통계정보를 검색할 수 있는 시스템입니다.
				</div>
				<div class="question mt30">
					3. 이러한 서비스의 성격을 잘 반영한 ‘인터랙티브 맵’의 명칭은 무엇이라고 생각하십니까?(<span id="q_3"> </span>)
					<ul class="mt20">
						<li><a href="javascript:fncCheck('q_3_1')" id="q_3_1">1.대화형 통계지도</a>
							<br/>(텍스트, 그래픽, 버튼 등을 눌러서 사용자의 동작에 반응한다는 의미를 가진 대화형 통계지도는 선택버튼을 누르면 원하는 조건의 통계지도를 만들 수 있다는 의미) 
						</li>
						<li><a href="javascript:fncCheck('q_3_2')" id="q_3_2">2.공감맵</a>
							<br/>(공간통계의 공 + 느낄 감 + 지도를 영어로 맵을 합성한 명칭으로 공감을 얻어낸다는 중복의 의미)  
						</li>
						<li><a href="javascript:fncCheck('q_3_3')" id="q_3_3">3.내가 만드는 통계지도</a><br/>(통계지도를 사용자가 직접 만들 수 있다는 의미)</li>
						<li><a href="javascript:fncCheck('q_3_4')" id="q_3_4">4.함께누리맵</a><br/>(함께 세상을 보는 지도라는 의미)</li>
					</ul>
				</div>
				<div class="question mt40">
					4. ‘인터랙티브맵’의 명칭을 제안해주세요! <br/>
					<span>* 제안한 명칭은 통계청에 귀속되며, 우수 제안자를 선정하여 상품권을 지급합니다. </span>
					<div class="questionInputA mt20">	
						명칭<input type="text" class="questionInput w150 ml10 mr10" id="q_4_name" name="q_4_name"/>
						의미<input type="text" class="questionInput w545 ml10" id="q_4_contents" name="q_4_contents"/>
					</div>
				</div>
				<div class="question mt40">
					5. SGIS에서 서비스 되었으면 하는 컨텐츠와, SGIS의 개선점, 기타 다양한 의견 등을 기술해 주시기 바랍니다. <br/>					
					<input type="text" class="questionInput w804 mt10 h100" id="q_5" name="q5"/>
				</div>
				<div class="userTitle mt40">
					* 아래 사항은 추첨 및 우수제안자 선정을 통한 상품권 지급 및 분석 목적으로만 활용하며 명칭공모 결과 발표 후 상품권 지급이 완료되면 개인정보는 삭제합니다.
				</div>
				<div class="user">
					<ul class="mt30">
						<li>성별 :<span><input type="radio" class="ml20 mr5" name="sex" checked="checked"/>남<input type="radio" class="ml20 mr5" name="sex" />여</span></li>
						<li>성명 :<span><input type="text" class="questionInput ml20 w100" id="name" name="name" value=""/></span></li>
						<li>휴대전화번호 :<span><input type="text" class="questionInput ml20 w100" id="tel" name="tel" value=""/></span></li>
						<li>분류 :	
							<p>
								<a href="javascript:fncCheck('q_6_1')" id="q_6_1">① 전문가(교수 및 연구원 등) </a><br/>
								<a href="javascript:fncCheck('q_6_2')" id="q_6_2">② 정부관련기관 근무자(공무원 및 공공기관, 교사 등) </a> <br/>
								<a href="javascript:fncCheck('q_6_3')" id="q_6_3">③ 개발자(프로그램 개발 등)</a><br/>
								<a href="javascript:fncCheck('q_6_4')" id="q_6_4">④ 학생(대학 이상 재학)</a> <br/>
								<a href="javascript:fncCheck('q_6_5')" id="q_6_5">⑤ 학생(초․중․고등학교 재학)</a><br/>
								<a href="javascript:fncCheck('q_6_6')" id="q_6_6">⑥ 주부 및 기타   </a><br/>
							</p>
							<input type="hidden" value="" name="q6" />
							<input type="hidden" value="" name="q1" id="q1" />
							<input type="hidden" value="" name="q3" />
							<input type="hidden" value="" name="mf" id="mf" />
						</li>
					</ul>
				</div>
				<div class="btnbox" style="padding-left:160px;">
						<a href="javascript:fncResist()"><img src="./images/btn_registration.png" alt="등록" /></a>&nbsp;&nbsp;&nbsp;	
						<a href="javascript:fncCancel()"><img src="./images/btn_ cancel.png" alt="취소"/></a>	
				</div>
			</div>			
		</div>
	</div>
</form>
</body>
</html>