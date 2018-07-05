<!-- 
움직이는 인구피라미드 >시도인구추계 피라미드
//-->
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<!-- 
움직이는 인구피라미드
//-->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>움직이는 인구피라미드 | 분석지도</title>	
    <link href="css/default.css" rel="stylesheet" type="text/css" />  
    <link rel='stylesheet' type='text/css' href='/css/jquery-ui-1.10.4.custom.css'>
    <link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" type="text/css" href="css/sub.css" />
	<link rel="stylesheet" type="text/css" href="css/common.css" />
	<link rel="stylesheet" type="text/css" href="css/layout.css" />
	<link rel="stylesheet" type="text/css" href="css/styles.css" />
	 <script type='text/javascript' src='/js/plugins/jquery.min.js'></script>
	 <script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
	      <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type="text/javascript"  src="/js/common/common.js"></script>
	 <!-- 
	  -->
    <!-- 
     <script type="text/javascript" src="js/index.js"></script>
     -->
	<script type="text/javascript" src="js/common/script.js"></script>
	<script src="/jsp/pyramid/js/highchart/js/highcharts.js""></script>
	<script src="/jsp/pyramid/js/highchart/js/modules/exporting.js"></script>

		<script type="text/javascript">
			pageCountPlus();
		
			var date = new Date();
		
			var areaCode1 = '0';			//0:전국 피라미드 1 지역코드
			var areaCode2 = '11';			//0:전국 피라미드 2 지역코드
			var codename1 = "전국";
			var codename2 = "서울특별시";
			var years = date.getFullYear();				//년도
			var playIntevar;		//재생속도
		    var playWay;			//재생방향
			
			var categories = new Array();
		    var maleData = new Array();
		    var maleData_ = new Array();
		    var maleData2 = new Array();
		    var maleData2_ = new Array();
		    var femaleData = new Array();
		    var femaleData2 = new Array();
		    
		    
		    var pyra1MailCnt;
		    var pyra1FemailCnt;
		    var pyra2MailCnt;
		    var pyra2FemailCnt;
		    
		    var reportData = {
		    	baseYear : years,
		    	sidoSel1 : codename1,
		    	sidoSel2 : codename2
		    }; //보고서 데이터 객체
		
            $(function () {
		     		$("#map_data5").css("left", $("#wrap2").width()-500);
            	
		     		$("#goHelp").on('click',(function(e){
		         		location.href('/html/newhelp/Py_help_10_0.html');
		             	
					}));
		     		
		     		$("#viewReport").on('click', (function(e){
		          		reportOpen(); 
					}));
		     		
            	$("#standardYear").change(function(){
            		apiLogWrite2("D4", "D42", "시도인구추계피라미드", "기준년도 선택 : " + this.value , "00", codename1 + " " + codename2);
            		pageCountPlus();
            		years = this.value;
	          //  	play("s", "0");														//콤보박스 변경시 재생을 멈춘다
	            	getPyramidData();
	            	//getYearRatioAjax();
	            	reportData.baseYear = years;
	            });
            	
            	
           	 $("#sidoSel1").on("change",(function(e){
           		pageCountPlus();
           		 areaCode1 = this.value
	        	 codename1 = $("#sidoSel1 option:selected").text();
           		apiLogWrite2("D4", "D42", "시도인구추계피라미드", "비교지역1" , "00", codename1);
           		 $("#leftArea").html(codename1);
          		 getPyramidData();
          		reportData.sidoSel1 = codename1;
          	  }));	
           	 
           	 $("#sidoSel2").on('change',(function(e){
           		pageCountPlus();
           		 areaCode2 = this.value
           		 codename2 = $("#sidoSel2 option:selected").text();
           		apiLogWrite2("D4", "D42", "시도인구추계피라미드", "비교지역2" , "00", codename2);
           		 $("#rightArea").html(codename2);
           		getPyramidData();
           		reportData.sidoSel2 = codename2;
          	  }));	
           	 
           	$("#viewData").on('click',(function(e){
           		$("#map_data5").slideToggle(
           		);
        		  
        	  }));
           	$("#dataCloseBtn").on('click',(function(e){
           	//	$("#map_data5").toggle(500);
           		$("#map_data5").slideToggle(
               		);  
        	  }));
            	
          	   init();
          	   
          	   
          	   
          	  
          	 var cnt = true;
          	 $(window).resize(function(){
         		$("#map_data5").css("left", $("#wrap2").width()-500);
         		//if(cnt){
	         	//	setTimeout(function(){
	          	//		drawStroke();
	          	//		cnt = false;
	    		//	},200)
         		//}
         	});
          	   
          	 
            });
            
        	
            function init(){
            	getSidoData();
            	getPyramidData();
            	setSlide();
            	
            	$("#standardYear").val(years);
            	$("#nowYear").html(years);
            	
            	$("#leftArea").html(codename1);
            	$("#rightArea").html(codename2);
            	
            	selectMenu();
            	//setTimeout(function(){
          		//	drawStroke();
    			//},300)
            }
            
            function getPyramidData(){		//gbn : a(왼쪽 피라미드), b(오른쪽 피라미드)
            
            	jQuery.ajax({
            		type:"POST",
            		url: "/ServiceAPI/pyramid/pyramid2.json",
        	 		data:{ "years" : years,
		  	 			 "strType":"M",
		  	 			 "code1" : areaCode1,
		  	 			 "code2" : areaCode2,
			 			 "gubun" : "pyramid",
            			 },
            		success:function(data){
            			for(var i=0; i<data.result.length; i++){
    						years = data.result[i].years;
    						categories[i] = data.result[i].ages;
    						maleData[i] = parseInt("-" + data.result[i].male);
    						maleData2[i] = parseInt("-" + data.result[i].ms);
    						maleData_[i] = parseInt(data.result[i].male);
    						maleData2_[i] = parseInt(data.result[i].ms);
    						femaleData[i] = parseInt( data.result[i].female);
    						femaleData2[i] = parseInt( data.result[i].fs);
    						female = data.result[i].female;
    					}
            			pyra1MailCnt = data.result.length;
            		    pyra1FemailCnt = data.result.length;
            			
            			$("#nowYear").html(years); 
            			drawDataTable();
            			drawPyramid1();
            			drawPyramid2();
            			
            			reportData.pyra2FemailCnt = pyra2FemailCnt;
            			reportData.pyra2MailCnt = pyra2MailCnt;
            			reportData.pyra1FemailCnt = pyra1FemailCnt;
            			reportData.categories = categories;
            			reportData.maleData_ = maleData_;
            			reportData.maleData2_ = maleData2_;
            			reportData.femaleData = femaleData;
            			reportData.femaleData2 = femaleData2;
            		},
            		error:function(data) {
            		}
            	});
            	
            }
            
            
            function drawStroke(){
            	for(i=2; i<$("rect").length-pyra2FemailCnt-pyra2MailCnt-pyra1FemailCnt-14; i++){
	          			  //alert();
			          	$("rect:eq(" + i +")").attr("stroke", "#5B2A72");
			          	$("rect:eq(" + i +")").attr("width", "15");
	          	  	}
            	
            	for(i=$("rect").length-pyra2FemailCnt-pyra2MailCnt-pyra1FemailCnt-12; i<$("rect").length-pyra2FemailCnt-pyra2MailCnt-14; i++){
	          			  //alert();
			         // 	$("rect:eq(" + i +")").attr("stroke", "#6A1E3B");
			          	$("rect:eq(" + i +")").attr("stroke", "#6A1E3B");
			         	$("rect:eq(" + i +")").attr("width", "15");
	          	  	}
            	
            	for(i=$("rect").length-pyra2FemailCnt-pyra2MailCnt-9; i<$("rect").length-pyra2FemailCnt-6; i++){
	          			  //alert();
			          	$("rect:eq(" + i +")").attr("stroke", "#5B2A72");
			          	$("rect:eq(" + i +")").attr("width", "15");
	          	  	}

            	for(i=$("rect").length-pyra2FemailCnt-4; i<$("rect").length-2; i++){
	          			  //alert();
			          	$("rect:eq(" + i +")").attr("stroke", "#6A1E3B");
			          	$("rect:eq(" + i +")").attr("width", "15");
	          	  	}
            	
            }
            
            
            
            function getSidoData(){		//gbn : a(왼쪽 피라미드), b(오른쪽 피라미드)
            	jQuery.ajax({
            		type:"POST",
            		url: "/ServiceAPI/pyramid/pyramidSidoData.json",
            		success:function(data){
            			for(var i=0; i<data.result.length; i++){
							$("#sidoSel1").append("<option value=\"" + data.result[i].region_code + "\">" + data.result[i].region + "</option>");
							var selected = "";
							if(data.result[i].region == '서울특별시'){
								selected = "selected=\"selected\"";
							}
							$("#sidoSel2").append("<option value=\"" + data.result[i].region_code + "\"" +selected +"\">" + data.result[i].region + "</option>");
    					}
						//region_code, region 
						
						pyra2MailCnt = data.result.length;
            		    pyra2FemailCnt = data.result.length;
            		//	id="sidoSel1"
						
						
						
            		},
            		error:function(data) {
            		}
            	});
            	
            }
            
            
            
            function drawPyramid1(){			//gbn : a(왼쪽 피라미드), b(오른쪽 피라미드)
            	prymidObj = $('#pyramidArea1').highcharts({
      	            chart: {
      	                type: 'bar'
      	            },
      	            exporting: {
      	            	enabled : false,						//데이터를 밖으로 뺄 필요가 없음
      	            },
      	            drilldown:{
      	            	animation : false,						//재생을 해야 하기 때문에 애니메이션 속성 삭제함
      	            },
      	            title: {
      	                text: ''//codename1								//피라미드 제목 표출해주는 부분
      	            },
      	            subtitle: {
      	                text: ''								//피라미드 서브제목 표출해주는 부분
      	            },
      	            xAxis: [{
      	            	opposite: false,
      	            	categories: categories,					//	1세, 2세, 3세~~~ 배열
      	            	//linkedTo: 0,
      	            	minTickInterval : 1,					//세로 데이터 표출 단위는 10세로
      	                reversed: true,
      	                labels: {
      	                    step: 1
      	                }
      	            }, { // mirror axis on right side
      	                opposite: true,
      	                reversed: true,
      	                categories: categories,
      	                minTickInterval : 1,
      	                linkedTo: 1,
      	                labels: {
      	                    step: 1
      	                }
      	            }],
      	            yAxis: {
      	                title: {
      	                    text: null
      	                },
      	                labels: {
      	                    formatter: function () {
      	                    	drawStroke();
      	                        return (Math.abs(this.value) / 10000) + '만명';		//하단 데이터 표출 방법
      	                    }
      	                },
      	      //          min: -200000,
      	      //          max: 200000
      	            },

      	            plotOptions: {
      	                series: {
      	                    stacking: 'normal'
      	                },
      	                bar : {
      	                	animation : false	//애니메이션 지우기
      	                }
      	            },

      	            tooltip: {
      	                formatter: function () {
      	                	drawStroke();
      	                    return '<b>' + this.series.name + ', ' + this.point.category + '</b><br/>' +
      	                        '인구수: ' + appendCommaToNumber(Math.abs(this.point.y));
      	                }
      	            },

      	            series: [{
      	                name: '남자',				
      	                data: maleData,				//데이터 배열로
      	            //color : '#4d74e8'
      	                //color : '#5B2A72'
      	                //color : 'blue'
      	                //color : '#62b2ff'
      	               // color : 'blue'
      	                color : '#5B2A72'
      	               
      	            }, {
      	                name: '여자',
      	                data: femaleData,
      	            //color : '#ff7d7d'
      	                //color : '#6A1E3B'
      	                //color : 'red'
//      	                color : 'red'
      	              color : '#6A1E3B'
      	            }]
      	        });
            	drawStroke();
            	//$(".highcharts-title").css("margin-left", "2222px");            
            
            }
            
            function drawPyramid2(){			//gbn : a(왼쪽 피라미드), b(오른쪽 피라미드)
            	prymidObj = $('#pyramidArea2').highcharts({
      	            chart: {
      	                type: 'bar'
      	            },
      	            exporting: {
      	            	enabled : false,						//데이터를 밖으로 뺄 필요가 없음
      	            },
      	            drilldown:{
      	            	animation : false,						//재생을 해야 하기 때문에 애니메이션 속성 삭제함
      	            },
      	            title: {
      	                text: ''//codename2								//피라미드 제목 표출해주는 부분
      	            },
      	            subtitle: {
      	                text: ''								//피라미드 서브제목 표출해주는 부분
      	            },
      	            xAxis: [{
      	            	opposite: false,
      	            	categories: categories,					//	1세, 2세, 3세~~~ 배열
      	            	//linkedTo: 0,
      	            	minTickInterval : 1,					//세로 데이터 표출 단위는 10세로
      	                reversed: true,
      	                labels: {
      	                    step: 1
      	                }
      	            }, { // mirror axis on right side
      	                opposite: true,
      	                reversed: true,
      	                categories: categories,
      	                minTickInterval : 1,
      	                linkedTo: 1,
      	                labels: {
      	                    step: 1
      	                }
      	            }],
      	            yAxis: {
      	                title: {
      	                    text: null
      	                },
      	                labels: {
      	                    formatter: function () {
      	                    	drawStroke();
      	                        return (Math.abs(this.value) / 10000) + '만명';		//하단 데이터 표출 방법
      	                    }
      	                },
      	        //        min: -200000,
      	        //        max: 200000
      	            },

      	            plotOptions: {
      	                series: {
      	                    stacking: 'normal'
      	                },
      	                bar : {
      	                	animation : false	//애니메이션 지우기
      	                }
      	            },

      	            tooltip: {
      	                formatter: function () {
      	                	drawStroke();
      	                    return '<b>' + this.series.name + ', ' + this.point.category + '</b><br/>' +
      	                        '인구수: ' + appendCommaToNumber(Math.abs(this.point.y));
      	                }
      	            },

      	            series: [{
      	                name: '남자',				
      	                data: maleData2,				//데이터 배열로
      	              color : '#5B2A72'
      	            }, {
      	                name: '여자',
      	                data: femaleData2,
      	              color : '#6A1E3B'
      	            }]
      	        });
            	drawStroke();
            	
            	var pChart1 = $('#pyramidArea1').highcharts();
    			var pChart2 = $('#pyramidArea2').highcharts();
    			
    			this.svg1 = pChart1.getSVG({
    				chart : {
    					width : 800,
    					height : 410
    				}
    			});
    			
    			this.svg2 = pChart2.getSVG({
    				chart : {
    					width : 800,
    					height : 410
    				}
    			});
            }
            function setSlide(){				//슬라이드바 세팅
            	 //슬라이드 코딩
                $("#slider").slider(
                	{
                		step:1,
                		min: 1970,
                		max: 2045,
                		value: years,
                		change:function(event, ui){
                			//alert($("#slider").slider("value"));
                			//leftAreaName
                			years = $("#slider").slider("value");		//슬라이드바와 콤보박스 바인딩
                			$("#standardYear").val(years); 
                			$("#nowYear").html($("#slider").slider("value"));
                			getPyramidData();
        //        			viewData();
                		},
                		slide:function(event, ui){
                			play("s", "0");												//슬라이드시 재생을 멈춘다
                		}
                	}		
                );
            }
            
            function play(a, b){	//a : 재생방향, b : 배속
        		clearInterval(playIntevar);
        		playWay = a;
        		if(a != "s"){
        			playIntevar = setInterval(increYear, b);
        		}
        	}
            
            function increYear(){						//재생시 년도 데이터 계산
        		if(playWay=="l"&& $("#slider").slider("value") == "1961"){				//미니멈 년도가 되면 역재생 중지
        			clearInterval(playIntevar);
        		}
        		if(playWay=="r"&& $("#slider").slider("value") == "2059"){				//맥시멈 년도가 되면 역재생 중지
        			clearInterval(playIntevar);
        		}
        			if(playWay == "r"){
        				$("#slider").slider("value", years + 1);	
        			}else if(playWay == "l"){
        				$("#slider").slider("value", years - 1);
        			}
        	}
            
            function drawDataTable(){
            	var strDataTable = "";
            	strDataTable += "<table class=\"tab_n6\">";
            	strDataTable += "<tr>";
            	strDataTable += "	<th rowspan=\"2\">연령</th>";
            	strDataTable += "	<th colspan=\"2\" >" + years +"</span>년도 <br />" +  $("#leftArea").html()   + "인구분포(명)</th>";
            	strDataTable += "	<th colspan=\"2\" >" + $("#rightArea").html() + "(명)</th>";
            	strDataTable += "</tr>";
            	strDataTable += "<tr>	";													
            	strDataTable += "	<th>남</th>";
            	strDataTable += "	<th>여</th>";
            	strDataTable += "	<th>남</th>";
            	strDataTable += "	<th>여</th>";
            	strDataTable += "</tr>";
            	
            	for(var i=0; i<categories.length; i++){
            		if(i % 2 == 0){
		            	strDataTable += "<tr>";
		            	strDataTable += "	<td>" + categories[i] + "</td>";
		            	strDataTable += "	<td>" + maleData_[i] + "</td>";
		            	strDataTable += "	<td>" + femaleData[i] + "</td>";
		            	strDataTable += "	<td>" + maleData2_[i] + "</td>";
		            	strDataTable += "	<td>" + femaleData2[i] + "</td>";
		            	strDataTable += "</tr>";
            		}else{
		            	strDataTable += "<tr>";
		            	strDataTable += "	<td class=\"bg_color0\">" + categories[i] + "</td>";
		            	strDataTable += "	<td class=\"bg_color0\">" + maleData_[i] + "</td>";
		            	strDataTable += "	<td class=\"bg_color0\">" + femaleData[i] + "</td>";
		            	strDataTable += "	<td class=\"bg_color0\">" + maleData2_[i] + "</td>";
		            	strDataTable += "	<td class=\"bg_color0\">" + femaleData2[i] + "</td>";
		            	strDataTable += "</tr>";
            		}
	            	
            	}
            	strDataTable += "</table>";
            
            	$("#dataArea").html(strDataTable);
            
            }
            
            
            function nextYear(nextYear){
        		if(nextYear == 'a'){
        			$("#slider").slider("value", years + 1);
        			apiLogWrite2("D4", "D42", "시도인구추계피라미드", "다음년도 버튼 : " + (years + 1) , "00", codename1 + " " + codename2);
        		}else{
        			$("#slider").slider("value", years - 1);
        			apiLogWrite2("D4", "D42", "시도인구추계피라미드", "이전년도 버튼 : " + (years - 1) , "00", codename1 + " " + codename2);
        		}
        		reportData.baseYear = years;
        	}
            
            
            
            function pageCountPlus(){
            	jQuery.ajax({
            		type:"POST",
            		url: "/ServiceAPI/common/pageCallReg.json",
            		data:{"hpage":"/jsp/pyramid/pyramid2.jsp"},
            		success:function(data){
            				
            		},
            		error:function(data) {

            		}
            	});
            }
            
            /**
    		 * @name         : reportOpen
    		 * @description  : 보고서 팝업 호출
    		 * @date         : 2017. 02. 06. 
    		 * @author	     : 정려진
    		 */
    		function reportOpen() {
    			this.reportType = 2;
    			this.reportData = reportData;
            	
    			window.open("/jsp/pyramid/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
    		}
            	
            
             </script>
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" /             

</head>
<body style="overflow-x:hidden; overflow-y:auto;"> 
	<div id="wrap2">
		<!-- header // 
			<header id="header">
		-->
		<header>
			<!-- Top Include -->
			<!-- 
				<script type="text/javascript"  src="/js/common/includeSearch.js"></script>
			 -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		
	    <!-- body -->	
	    <!-- 
		<div id="container_p" >
		<p class="path">
                    <a href="/html/index.html"><span class="path_el">분석지도&nbsp;&nbsp;>&nbsp;</span></a>
					<a href="/html/index.html"><span class="path_el">움직이는 인구피라미드&nbsp;&nbsp;>&nbsp;</span></a>
                    <a id="button_pop" href="#"><span class="path_el current">시도인구추계 피라미드</span></a>	
					<span class="data_v"><input type="image" id="viewData" src="images/data_view.jpg"  alt="데이터 보기"/></span>
	     -->
					<!-- 
					<span class="help_v"><input type="image" id="goHelp" src="images/help_view.jpg"  alt="도움말"/></span>
					 -->
           <!--      </p><!-- path -->
			<!-- 
				<div id="layer_popup" style="left:380px">
					높은 정도의 출산율과 기대<br/>수명을 예상해 계산한 결과 </div>
					<script>
						$("#button_pop").hover(
						function(){
						//$("#layer_popup").show();
						},function(){
						$("#layer_popup").hide();
						});
						</script>
		</div><!-- container_p -->
		<div id="container_p_1" style="height: 35px;">
			<p class="path" style="text-align: left; height:35px; border-bottom: 1px #d9d9d9 solid;">
				<span style="float:left; margin-left:324px; margin-top:5px;">
					<a href="#"><span class="path_el" style="font-size:12px;  margin-top:400px;">처음페이지&nbsp;&nbsp;>&nbsp;</span></a> 
					<a href="#"><span class="path_el" style="font-size:12px;">분석지도&nbsp;&nbsp;>&nbsp;</span></a>
	                <a id="button_pop" href="#"><span class="path_el current"  style="font-size:12px; color: #3c9cd7; text-decoration: underline;">인구피라미드</span></a>	
				</span>
				<span class="data_v" style="float:right; margin-right:150px; margin-top:5px;">
					<input type="image" style="text-align:right;" id="viewData" src="images/data_view.jpg"  alt="데이터 보기"/>
					<input type="image" style="text-align:right;" id="viewReport" src="/img/ico/ico_toolbars06.png"  alt="보고서 보기"/>
				</span>
			</p>
		</div>

	    <div id="container_2" >				
				<!-- 래프트메뉴 -->
				<div id="left_menu" >					
						<div id='cssmenu'>
							<ul>
								   <li class='has-sub'><a href='/jsp/pyramid/pyramid1.jsp'><span  style="font-size:14px">전국인구추계 피라미드</span></a>
									  <ul>
										 <li><span><lable>인구성장 가정</lable><br/><br/>
										 <label><input type="radio" name="RG1" value="radio" id="RG1_0" onclick="eventonclick();" /> 중위 &nbsp; &nbsp; </label>
										 <label><input type="radio" name="RG1" value="radio" id="RG1_1" onclick="eventonclick();" /> 고위 &nbsp; &nbsp; </label>
										 <label><input type="radio" name="RG1" value="radio" id="RG1_2" onclick="eventonclick();" /> 저위</label>
										 </span>
										 </li>
										 <li>
											 <span class="py_sform">
													<form action="URL" method="post" class="md10">
														시작년도 선택	<select name="selectyear" onchange="selectyear(this.form)"  class="py_select ">
															<option selected value=0>2015</option>
															<option value=1>2014</option>
															<option value=2>2013</option>
															<option value=3>2012</option>
															<option value=4>2011</option>
														</select>
													</form>
													<form action="URL" method="post" >
														출생년도 선택	<select name="selectyear" onchange="selectyear(this.form)"  class="py_select">
															<option selected value=0>2015</option>
															<option value=1>2014</option>
															<option value=2>2013</option>
															<option value=3>2012</option>
															<option value=4>2011</option>
														</select>
													</form>
											 </span>
										 </li>
									  </ul>
								   </li>		
								   <li class='has-sub'><a href='#' id="selMenu"><span style="font-size:14px">시도인구추계 피라미드</span></a>
									  <ul>
										 <li>
											 <span class="py_sform2">
													<form action="URL" method="post" class="md10">
														비교년도 선택	<select name="selectyear" id="standardYear"  class="py_select ">
															<%
																for(int i=1970; i<=2045; i++){
															%>
																<option value="<%=i %>"><%=i %></option>
															<%
																}
															%>
														</select>
													</form>
													<form action="URL" method="post"  class="md10">
														비교지역 1	&nbsp; &nbsp; <select name="select"   class="py_select" id="sidoSel1">
															<option selected value=0>전국</option>
														</select>
													</form>
													<form action="URL" method="post" >
														비교지역 2	&nbsp; &nbsp; <select name="select"  class="py_select" id="sidoSel2">
															<option selected value=0>전국</option>
														</select>
													</form>
											 </span>
										 </li>
									  </ul>
								   </li>	
							</ul>
						</div>
				</div><!-- left_menu -->

				<!-- 지도영역 -->				 
				<div id="content_map" style="overflow-x:scroll; overflow-y:scroll; height:700px; width:1350px;">		
						<!-- 피라미드 4/29 수정 --------------->
						<div id="pyra2-wrap" >							
								<ul class="pra_img">
										<li class="arrow_l"><img alt="이전" src="images/btn_left_map.jpg"  onclick="nextYear('b')" title="이전년도 선택"></li>
										<li>		
											<span class="yearp">기준년도 <span id="nowYear"></span>년 <br />
											<span id="leftArea" style="left:260px; position:absolute;"></span>
											<span id="rightArea" style="left:780px; width:145px; position:absolute;"></span>
											</span>
											<div><br /></div>
											<span class="pra2_gra1" id="pyramidArea1" style="width:530px; margin-right:15px; float:left;"></span>
											<span class="pra2_gra2" id="pyramidArea2" style="width:530px; margin-right:15px; float:left;"></span><br/>
											<!-- 
											 <span class="s_bar"><a href="#"><img alt="슬라이드바" src="images/slide_bar.jpg"></a></span>
											 -->
										</li>										
										<li class="arrow_r">
											<img alt="다음" src="images/btn_right_map.jpg" onclick="nextYear('a')" title="다음년도 선택">
										</li>
								</ul>
						</div><!-- pyra2-wrap -->						 
						 <div class="btn_pyrplay2">
								<div id="slider" style="min-width: 410px; max-width: 800px; text-align:center; margin-left:200px;"></div><br /><br />
								<!-- 
								<a href="#"><img src="images/Back.jpg"  alt="2배속 역재생" onclick="play('l', 500)"></a>
								 -->
								<a href="#"><img src="images/play_left.jpg"  alt="역재생" onclick="play('l', 1000)" title="역재생"></a>
								<a href="#"><img src="images/stop.jpg"  alt="정지" onclick="play('s', 0)" title="정지"></a>
								<a href="#"><img src="images/play.jpg"  alt="재생" onclick="play('r', 1000)" title="재생"></a>
								<!-- 
								<a href="#"><img src="images/fast.jpg"  alt="2배속 재생" onclick="play('r', 500)"></a>
								 -->
						 </div>
						 <!-- 피라미드 4/29 수정 --------------->
						
						<!-- 데이터 영역 start! -->
						<div class="small_img">
						</div> <!-- 데이터 보기 작은 이미지 -->
						<!-- 필요없어서 제거  
												<input type="image"  src="images/btn_small_data.jpg"  alt="데이터보기"/>
						 -->

						<div id="map_data5"  style="display:none;"> <!-- 데이터 펼쳤을때/ display:none;을 삭제하면 보입니다.  style="display:none;"-->
							<div class="pyrcon_wrap5" style="overflow-x:hidden; overflow-y:scroll; height:448px; width:520px;">
								<div class="pry_form">
												<!-- 레이어 팝업이기 때문에 선택값은 필요없는 기능이여서 주석처리. lkh
												<form>년도선택&nbsp;
													<select name="selectyear" onchange=" " id="yearm"  class="pyr_selfield2">
														<option selected value=0>2015년 01월</option>
														<option value=1>2015년 02월</option>
														<option value=2>2015년 03월</option>
														<option value=3>2015년 04월</option>
														<option value=4>2015년 05월</option>
														<option value=5>2015년 06월</option>
														<option value=6>2015년 07월</option>
														<option value=7>2015년 08월</option>
														<option value=8>2015년 09월</option>
														<option value=9>2015년 10월</option>
														<option value=10>2015년 11월</option>
														<option value=11>2015년 12월</option>
													</select> &nbsp;  &nbsp;
													지역선택&nbsp;
													<select name="selectyear" onchange=" " id="yearm"  class="pyr_selfield2">
														<option selected value=0>경기도</option>
														<option value=1>2015년 02월</option>
														<option value=2>2015년 03월</option>
														<option value=3>2015년 04월</option>
														<option value=4>2015년 05월</option>
														<option value=5>2015년 06월</option>
														<option value=6>2015년 07월</option>
														<option value=7>2015년 08월</option>
														<option value=8>2015년 09월</option>
														<option value=9>2015년 10월</option>
														<option value=10>2015년 11월</option>
														<option value=11>2015년 12월</option>
													</select>&nbsp;
													<input type="submit" name="button" id="button" value="검 색" class="pyrfile_btn"/></form> 
												 -->
								</div><!-- pry_form -->
								<div class="c_fn3" id="dataArea">
										<!-- 데이터 테이블 영역 -->
								</div><!-- c_fn3 -->
							</div>	<!-- pyrcon_wrap5 -->
							<div class="center pyr2btn_b">
							<input type="image" id="dataCloseBtn" src="images/btn_arr.jpg"  alt="close"/>
							<!-- 필요없는 버튼 제거
							\ -->
							</div><!-- btn_b 닫기 버튼-->

						</div><!-- map_data 끝!-->

						<div class="map_data_closed6"    >							
						<!-- 
								<div class="center"><input type="image" onclick="eventonclick();" src="images/btn_arr.jpg"  alt="close"/></div><!-- **** 데이터 닫혔을 때 -->
						</div><!-- map_data_closed 끝!-->
						<!-- 데이터 영역 end! -->


				</div><!-- content_map -->
				

		    <div style="padding-bottom: 10px;">&nbsp;</div>

	    </div><!-- container_2 end!-->
	    
	    <!-- footer// -->
	    <!-- 
	     <footer id="footer2">
                <div class='footer-in'>
						<ul class='terms'>
							<li><a href='/html/member/personalInfo.html'>개인정보처리방침</a></li>
							<li><a href='/html/member/emailInfo.html'>이메일무단수집거부</a></li>
						</ul>
						<ul class='relation'>
							<li style='margin-right:7px;'><a href='http://kostat.go.kr' target='_blank'>통계청 |</a></li>
							<li style='margin-right:7px;'><a href='http://kosis.kr' target='_blank'>KOSIS |</a></li>
							<li style='margin-right:7px;'><a href='http://mdss.kostat.go.kr' target='_blank'>MDSS |</a></li>
							<li style='margin-right:7px;'><a href='https://kssc.kostat.go.kr:8443/ksscNew_web/index.jsp' target='_blank'>통계분류</a></li>
						</ul>
						<div class='info'>
							<p class='address'>(35208)대전광역시 서구 청사로 189</p>
							<dl class='tel'>
								<dt>통계청콜센터 :</dt>
								<dd>02)2012-9114</dd>
								<dt>관리자 :</dt>
								<dd>042)481-2248</dd>
								<dt>자료제공담당자 :</dt>
								<dd>(042)481-2438</dd>
							</dl>
						</div>
					</div>
            </footer>
	     -->
            <!-- //footer -->
           
	 <div style="padding-bottom: 10px;">&nbsp;</div>
	    <!-- footer// -->
	    <!-- 
	    <footer id="footer">
	    	<script type="text/javascript"  src="/jsp/share/js/2015_includeBottom_main.js"></script>
	    </footer>
	     -->
	    <footer id="footer">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
 	    </footer>
	</div><!-- wrap2 끝 -->
</body>
</html>