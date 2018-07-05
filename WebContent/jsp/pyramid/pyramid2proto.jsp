<%@page import="com.sun.org.apache.bcel.internal.classfile.Code"%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.util.StringTokenizer"%>
<%@page import="com.innogrid.sgisapi.api.vo.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>피라미드 Example</title>
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
	
	

  	List sidoList  = new ArrayList();
  	sidoList =(List)request.getAttribute("sidoList");
	
	
	
%>
<!-- end -->




		<script type="text/javascript">
		var playIntevar;		//재생속도
		var pyrmdChart;
		
		
$(function () {
	$("#viewData").draggable();

	//jQuery('#viewData').fadeOut();
	
	
	$("#standardYear").val("2015");
	
	jQuery.ajax({
		type:"POST",
		url: "/share/pyramid/sidoPyramidAjax1.do",
		data:{"years":"2015",
			  "code":"" ,
			  "gubun":"a"},
		success:function(data){
			jQuery('#sidoContainer1').html(data);
		},
		error:function(data) {

		}
	});
	jQuery.ajax({
		type:"POST",
		url: "/share/pyramid/sidoPyramidAjax1.do",
		data:{"years":"2015",
			  "code":"" ,
			  "gubun":"b"},
		success:function(data){
			jQuery('#sidoContainer2').html(data);
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
    		min: 1970,
    		max: 2040,
    		value: $("#standardYear").val(),
    		change:function(event, ui){
    			//alert($("#slider").slider("value"));
    			$("#standardYear").val($("#slider").slider("value"));		//슬라이드바와 콤보박스 바인딩
    			$("#nowYear").html($("#slider").slider("value"));
    			setPyramid('a');
    			setPyramid('b');
    			viewData();
    		},
    		slide:function(event, ui){
    			play("s", "0");												//슬라이드시 재생을 멈춘다
    			$("#nowYear").html($("#slider").slider("value"));
    			setPyramid('a');
    			setPyramid('b');
    		}
    	}		
    );
    
    $("#standardYear").change(function(){
    	play("s", "0");														//콤보박스 변경시 재생을 멈춘다
    	$("#slider").slider("value", this.value);							//콤보박스와 슬라이드바 바인딩
    });
    
    $("#nowYear").html($("#slider").slider("value"));
    
	viewData();
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
		if(playWay=="l"&& $("#slider").slider("value") == "1970"){				//미니멈 년도가 되면 역재생 중지
			clearInterval(playIntevar);
		}
		if(playWay=="r"&& $("#slider").slider("value") == "2039"){				//맥시멈 년도가 되면 역재생 중지
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
	
	
	
	function nextYear(nextYear){
		if(nextYear == 'a'){
			$("#slider").slider("value", Number($("#standardYear").val()) + 1);
		}else{
			$("#slider").slider("value", Number($("#standardYear").val()) - 1);
		}
	}
	
	

	function setPyramid(gubun){
		var code;
		var codename;
		if(gubun == 'a'){
			code = $("#sidoSel1").val();
			codename = $("#sidoSel1 option:selected").text();
		}else{
			code = $("#sidoSel2").val();
			codename = $("#sidoSel2 option:selected").text();
		}
		jQuery.ajax({
			type:"POST",
			url: "/share/pyramid/sidoPyramidAjax1.do",
			data:{"years":$("#standardYear").val(),
				  "code":code ,
				  "codename":codename ,
				  "gubun": gubun},
			success:function(data){
				if(gubun == 'a'){
					jQuery('#sidoContainer1').html(data);
				}else{
					jQuery('#sidoContainer2').html(data);
				}
				viewData();
			},
			error:function(data) {

			}
		});
	}
	
	
	
	//var fadeGb = "1";		//1이면 fade out상태  0이면 in
	function viewDataFade(){
		jQuery('#viewData').animate({
				height:'toggle'
		});
		if(fadeGb == 1){
			//	fadeGb = "0";
		//		viewData();
				//jQuery('#viewData').fadeIn(555);
		}else{
		//	fadeGb = "1";
			//jQuery('#viewData').fadeOut(555);
		}
	} 
	
	function viewData(){
		var code1;
		var code2;
		var codename1;
		var codename2;

			code1 = $("#sidoSel1").val();
			code2 = $("#sidoSel2").val();
			codename1 = $("#sidoSel1 option:selected").text();
			codename2 = $("#sidoSel2 option:selected").text();

			
			jQuery.ajax({
			type:"POST",
			url: "/share/pyramid/sidoTableAjax1.do",
			data:{"years":$("#standardYear").val(),
				  "code1":code1 ,
				  "code2":code2 ,
				  "codename1":codename1 ,
				  "codename2":codename2 },
			success:function(data){
				jQuery('#viewData').html(data);
				//$("#viewData").resizable();
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
시도 선택 1
	<select onchange="setPyramid('a');" id="sidoSel1" name="sidoSel1">
		<option value="">전국</option>
  	<%
	  	for(int i=0; i<sidoList.size(); i++){
			StringTokenizer str = new StringTokenizer(sidoList.get(i).toString(), ",");
			String code = str.nextToken();			
			code = code.substring(10, code.length());			
			code = code.substring(3, code.length());			
			String name = str.nextToken();			
			name = name.substring(8, name.length()-1);		
			%>
			<option value="<%= code%>"><%= name%></option>
  	<%
	  	}
  	%>
	</select>
시도 선택 2
	<select onchange="setPyramid('b')" id="sidoSel2" name="sidoSel2">
		<option value="">전국</option>
  	<%
	  	for(int i=0; i<sidoList.size(); i++){
			StringTokenizer str = new StringTokenizer(sidoList.get(i).toString(), ",");
			String code = str.nextToken();			
			code = code.substring(10, code.length());			
			code = code.substring(3, code.length());			
			String name = str.nextToken();			
			name = name.substring(8, name.length()-1);		
			%>
			<option value="<%= code%>" cdname="<%= name%>"><%= name%></option>
  	<%
	  	}
  	%>
	</select>
	<br />
</form>
<br />
<br />
<br />
<br />
<div style="margin-left:500px;">
기준년도 : <span id="nowYear"></span>
</div>
<div style="text-align:center;">
<table>
	<tr>
		<td><span id="sidoContainer1" style="min-width: 0px; max-width: 30px; height: 480px; margin: 0 auto"></span></td>
		<td><span id="sidoContainer2" style="min-width: 0px; max-width: 30px; height: 480px; margin: 0 auto"></span></td>
	</tr>
</table>
</div>
<div style="min-width: 410px; max-width: 800px; height: 50px; margin: 0 auto; text-align:center;">
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
<input type="button" value="데이터보기" onclick="viewDataFade()" />
<!-- 
<div id="container3" style="min-width: 600px; max-width: 800px; height: 300px; margin: 0 auto"></div><br />
 -->
<div id="viewData" style="min-width: 30px; max-width: 370px; height: 350px; margin: 0 auto; overflow: auto; background-color: white;"></div><br />

	</body>
</html>
