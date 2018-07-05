<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="com.innogrid.sgisapi.api.vo.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>
		<link rel="stylesheet" href="/share/resource/js/lib/jquery-ui-1.11.3.custom/jquery-ui.css" />
		
		<script type="text/javascript" src="/share/resource/js/lib/pyramid/jquery.min.js"></script>
		<script type="text/javascript" src="/share/resource/js/lib/jquery-ui-1.11.3.custom/jquery-ui.js"></script>
		
		<script src="/share/resource/js/lib/pyramid/highcharts.js"></script>
		<script src="/share/resource/js/lib/pyramid/exporting.js"></script>
	
		<style type="text/css">
${demo.css}
		</style>

<!-- start -->

<% 
	String strTypes = (String)request.getParameter("strTypes");  //인구성장타입 M중위 H고위 L저위
	if(strTypes == null){
		strTypes = "M";
	}
%>
<!-- end -->




		<script type="text/javascript">
		var playIntevar;		//재생속도
		var pyrmdChart;
		
		
$(function () {
	
	$("#standardYear").val("2015");
	jQuery.ajax({
		type:"POST",
		url: "/share/pyramid/pyramidAjax.do",
		data:{"years":"2015",
			  "strTypes":"<%=strTypes%>"},
		success:function(data){
			jQuery('#container2').html(data);
		},
		error:function(data) {

		}
	});

	/*
    
    */
    //슬라이드 코딩
    $("#slider").slider(
    	{
    		step:1,
    		min: 1960,
    		max: 2061,
    		value: $("#standardYear").val(),
    		change:function(event, ui){
    			//alert($("#slider").slider("value"));
    			$("#standardYear").val($("#slider").slider("value"));		//슬라이드바와 콤보박스 바인딩
    			$("#nowYear").html($("#slider").slider("value"));
    			getPyramidData();
    		},
    		slide:function(event, ui){
    			$("#amount").val("$" + ui.value);
    			play("s", "0");												//슬라이드시 재생을 멈춘다
    			$("#nowYear").html($("#slider").slider("value"));
    			getPyramidData();
    		}
    	}		
    );
    
    $("#standardYear").change(function(){
    	play("s", "0");														//콤보박스 변경시 재생을 멈춘다
    	$("#slider").slider("value", this.value);							//콤보박스와 슬라이드바 바인딩
    });
    
    $("#birYear").change(function(){
    	play("s", "0");														//콤보박스 변경시 재생을 멈춘다
    	getPyramidData();
    });
    
    $("#nowYear").html($("#slider").slider("value"));
    
    
});


	function test(a){
	//	$("#slider").slider("value", a.value);
	}
	//고위, 중위, 저위 선택에 의한 변화
	function fn_changeType(strType){
		var FRM = document.formType;
		FRM.strTypes.value = strType.value;
		FRM.submit();
	}
	
	
	
	var playIntevar;
	var playWay;
	function play(a, b){	//a : 재생방향, b : 배속
		clearInterval(playIntevar);
		playWay = a;
		if(a != "s"){
			playIntevar = setInterval(increYear, b);
		}
	}
	
	function increYear(){
		if(playWay=="l"&& $("#slider").slider("value") == "1961"){				//미니멈 년도가 되면 역재생 중지
			clearInterval(playIntevar);
		}
		if(playWay=="r"&& $("#slider").slider("value") == "2059"){				//맥시멈 년도가 되면 역재생 중지
			clearInterval(playIntevar);
		}
			if(playWay == "r"){
				$("#slider").slider("value", Number($("#standardYear").val()) + 1);	
				$("#nowYear").html($("#slider").slider("value"));
			}else if(playWay == "l"){
				$("#slider").slider("value", Number($("#standardYear").val()) - 1);
				$("#nowYear").html($("#slider").slider("value"));
			}
	}

	function init(){

	}
	
	function getPyramidData(){
		jQuery.ajax({
			type:"POST",
			url: "/share/pyramid/pyramidAjax.do",
			data:{"years":$("#slider").slider("value") ,
				  "strTypes":"<%=strTypes%>",
				  "birYear":$("#birYear").val()},
			success:function(data){
				jQuery('#container2').html(data);
			},
			error:function(data) {

			}
		});
	}
	
	
	function nextYear(nextYear){
		if(nextYear == 'a'){
			$("#slider").slider("value", Number($("#standardYear").val()) + 1);
		}else{
			$("#slider").slider("value", Number($("#standardYear").val()) - 1);
		}
	}
	function getSexRatioGraph(){
		jQuery.ajax({
			type:"POST",
			url: "/share/pyramid/sexRatioAjax.do",
			data:{"strTypes":"<%=strTypes%>"},
			success:function(data){
				jQuery('#container3').html(data);
			},
			error:function(data) {

			}
		});
	}
		</script>
	</head>
<body >

기준년도 선택
<form method="post" name="formType" action="/share/pyramid/pyramid.do">
	<select onchange="test(this);" id="standardYear" name="standardYear">
		<%
			for(int i=1960; i<=2060; i++){
		%>
			<option value="<%=i %>"><%=i %></option>
		<%
			}
		%>
	</select>
	<br />
	
	인구성장가정
	<input type="radio" name="strTypes" value="H" onclick="fn_changeType(this);" <%if(strTypes.equals("H")) {%>checked="checked"<%} %>>고위</input>
	<input type="radio" name="strTypes" value="M" onclick="fn_changeType(this);" <%if(strTypes.equals("M")) {%>checked="checked"<%} %>>중위</input>
	<input type="radio" name="strTypes" value="L" onclick="fn_changeType(this);" <%if(strTypes.equals("L")) {%>checked="checked"<%} %>>저위</input>
	<br />
	사용자표시: 출생년도
	<select onchange="test(this)" id="birYear">
		<option value="">선택</option>
		<%
			for(int i=1940; i<=2060; i++){
		%>
			<option value="<%=i %>"><%=i %></option>
		<%
			}
		%>
	</select>
</form>
<br />
<br />
<br />
<br />
<div style="margin-left:500px;">
기준년도 : <span id="nowYear"></span>
</div>
<div id="container2" style="min-width: 410px; max-width: 800px; height: 480px; margin: 0 auto"></div><br />
<div style="min-width: 410px; max-width: 800px; height: 50px; margin: 0 auto; text-align:center;">
<p>
<label for="amount">기준년도 : </label>
<input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;"></input>
</p>
<div id="slider" style="min-width: 410px; max-width: 800px; text-align:center; margin-left:0px;"></div>
</div>
<div style="text-align:center;">
<input type="button" value="이전년도" onclick="nextYear('b')" />
<input type="button" value="2배역재생" onclick="play('l',500)" />
<input type="button" value="역재생" onclick="play('l', 1000)" />
<input type="button" value="정지" onclick="play('s', 0)" />
<input type="button" value="재생" onclick="play('r', 1000)" />
<input type="button" value="2배재생" onclick="play('r', 500)" />
<input type="button" value="다음년도" onclick="nextYear('a')" />
<input type="button" value="성비그래프" onclick="getSexRatioGraph()" />
</div>
<div id="container3" style="min-width: 600px; max-width: 800px; height: 300px; margin: 0 auto"></div><br />

	</body>
</html>
