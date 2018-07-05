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
    <script type="text/javascript" src="js/index.js"></script>
	  -->
	<script type="text/javascript" src="js/common/script.js"></script>
	<script src="/jsp/pyramid/js/highchart/js/highcharts.js"></script>
	<script src="/jsp/pyramid/js/highchart/js/modules/exporting.js"></script>

	<script type="text/javascript">
	
			pageCountPlus();
	
			var date = new Date();
			var years = date.getFullYear();		//년도
		    var strType = "M";		//중위, 고위, 저위
		    var birYear = "1961";		//출생년도
		    var playIntevar;		//재생속도
		    var playWay;			//재생방향
		    
		    var prymidObj;			//피라미드 객체
		    
		    var reportData = {
		    	baseYear: years,
		    	strType : strType
		    };	//보고서데이터객체
		    
		    var categories = new Array();
		    
		    var maleData = new Array();
		    var maleData2 = new Array();
		    var femaleData = new Array();
		    
		    Highcharts.setOptions({
    			lang : {
    				thousandsSep : ','
    			}
    		});
		    
            $(function () {
            	
          	   init();
          	   
          	   
          	 $("#goHelp").on('click',(function(e){
         		location.href('/html/newhelp/Py_help_10_0.html');
             	
         	  }));
          	   
          	  $("[name=strTypes]").on('click',(function(e){
          		pageCountPlus();
          		strType = this.value;
          		
          		if(strType == "M"){
          			apiLogWrite2("D4", "D41", "전국인구추계피라미드", "인구성장가정(중위)", "00", "전국");
          		}else if(strType == "H"){
          			apiLogWrite2("D4", "D41", "전국인구추계피라미드", "인구성장가정(고위)", "00", "전국");
          		}else if(strType == "L"){
          			apiLogWrite2("D4", "D41", "전국인구추계피라미드", "인구성장가정(저위)", "00", "전국");
          		}
          		
          		
          		getPyramidData();
          		
          		reportData.strType = strType;
          		
          	  }));	
          	  
          	  
          	  //blue
          	  /*
          	  
          	 $("#map_data4").draggable(					//데이터 영역 drag
          		{
          			scroll : false,
          			handle : $("#dragArea")
          		}	 
          	 );			
          	  */
          	  
          	  

          	  $("#viewData").on('click',(function(e){
          		  $("#map_data4").slideToggle(500);
          		  
          		drawDataTable();  //테이블 데이터를 그린다
          		
          	  }));
          	  
          	  $("#viewReport").on('click', (function(e){
          		reportOpen(); 
          	  }));
          	 
          	  $("#closeDataTable").on('click',(function(e){
          		  $("#map_data4").slideToggle(500);
          	  }));
          	  
          	  $("#standardYear").on('change',(function(e){
          		apiLogWrite2("D4", "D41", "전국인구추계피라미드", "기준년도 선택 : " + this.value , "00", "전국");
          		pageCountPlus();
          		years = this.value;
          		
          		setSlide();
          		
          		reportData.baseYear = years;
          	  }));	
          	   
          	  
	          	$("#birYear").change(function(){
	          		birYear = this.value;
	            	play("s", "0");														//콤보박스 변경시 재생을 멈춘다
	          //  	getPyramidData();
	            	getYearRatioAjax();
	            });
            	
            });
            
            
            
            function init(){				//초기 데이터 세팅
            	
            	$("#map_data4").css("left", $("#wrap2").width()-400);
            
            	
            	
            	$("#standardYear").val(years);
            	$("#nowYear").html(years);
            	$("#strTypeM").attr("checked", true);
            	getPyramidData();
            	setSlide();
            	
            	selectMenu();
            	
            	var sw = true;
 				$(window).resize(function(){
            		 
              		$("#map_data4").css("left", $("#wrap2").width()-400);

              		if(sw){
	              		setTimeout(function(){
	              			drawStroke();
	        			},200)
	        			sw = false;
              		}
            		 
              	});
            	
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
        				$("#slider").slider("value", Number($("#standardYear").val()) + 1);	
        			}else if(playWay == "l"){
        				$("#slider").slider("value", Number($("#standardYear").val()) - 1);
        			}
        	}
            
            function getPyramidData(){			//피라미드 및 표를 구성하는 데이터를 가져옴
	            	jQuery.ajax({
	        	 		type:"POST",
	        	 		url: "/ServiceAPI/pyramid/pyramid.json",
	        	 		data:{"years": years,
	        	 			  "strType":strType,
	        	 			  "birYear": birYear,
	        	 			  "gubun" : "pyramid"
	        	 			  },
	        	 		success:function(data){
	        					for(var i=0; i<data.result.length; i++){
	        						years = data.result[i].years;
	        						categories[i] = data.result[i].age;
	        						maleData[i] = parseInt("-" + data.result[i].male);
	        						maleData2[i] = parseInt( data.result[i].male);
	        						femaleData[i] = parseInt( data.result[i].female);
	        						female = data.result[i].female;
	        					}
	        	 			drawPyramid();
	        	 			drawDataTable();
	        	 			getYearRatioAjax();
	        	 			getAddPyramidData();
	        	 			
	        	 			
	        	 			drawStroke();
	        	 			
	        	 			reportData.categories = categories;
	        				reportData.maleData2 = maleData2;
	        				reportData.femaleData = femaleData;
	        	 		},
	        	 		error:function(data) {
	        	 			//alert("error");
	        	 		}
	        		});
            }
            
            function drawStroke(){
            	 for(i=1; i<$("rect").length-103; i++){
	          		  if(i!=1){
			          	$("rect:eq(" + i +")").attr("stroke", "#5B2A72");
			          	$("rect:eq(" + i +")").attr("width", "4");
	          		  }
	          	  }
            	 for(i=$("rect").length-102; i<$("rect").length-2; i++){
	          		  if(i != $("rect").length-3 || i != $("rect").length-2){
			          	$("rect:eq(" + i +")").attr("stroke", "#6A1E3B");
			          	$("rect:eq(" + i +")").attr("width", "4");
	          		  }
	          	  }
            	 for(i=$("rect").length-2; i<$("rect").length; i++){
			          	$("rect:eq(" + i +")").attr("width", "12");
	          	  }
            }
            
            
            
        	function drawPyramid(){			//피라미드를 그림
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
      	                text: ''								//피라미드 제목 표출해주는 부분
      	            },
      	            subtitle: {
      	                text: ''								//피라미드 서브제목 표출해주는 부분
      	            },
      	            xAxis: [{
      	            	opposite: false,
      	            	categories: categories,					//	1세, 2세, 3세~~~ 배열
      	            	//linkedTo: 0,
      	            	minTickInterval : 10,					//세로 데이터 표출 단위는 10세로
      	                reversed: true,
      	                labels: {
      	                    step: 1
      	                },
      	            }, { // mirror axis on right side
      	                opposite: true,			//여자 눈금자 오른쪽에 표출
      	                reversed: true,
      	                categories: categories,
      	                minTickInterval : 10,
      	                linkedTo: 0,
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
      	                
      	                min: -500000,
      	                max: 500000,
      	              	minorTickInterval : 50000,
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
      //	                color : '#b2d8bf'
      //	                color : '#c2d699'
    //  	                color : '#f88d83'
  //    	                color : '#b29ae8'
  //    	                color : '#c2dd96'
 //     	                color : '#f1785b'
      	  //              color : '#33d1da'
      	                	color : '#5B2A72'
					//	color : 'blue'
      	            }, {
      	                name: '여자',
      	                data: femaleData,
     // 	                color : '#c7a8ca'
    //  	                color : '#71c5b5'
   //   	                color : '#ebc477'
   //   	                color : '#a370a8'
    //  	                color : '#f3b4bf'
 //     	                color : '#bad98b'
      	                	color : '#6A1E3B'
      	 //					color : 'red'
      	            }]
      	        });
        	
        		var pChart = $('#pyramidArea1').highcharts();
        		
        		this.svg1 = pChart.getSVG({
    				chart : {
    					width : 800,
    					height : 472
    				}
    			});
        	
      		
      	}

        	function setSlide(){			//슬라이드 세팅
        		//슬라이드 코딩
          	    $("#slider").slider(
          	    	{
          	    		step:1,
          	    		min: 1960,
          	    		max: 2065,
          	    		value: $("#standardYear").val(),
          	    		change:function(event, ui){
          	    			//alert($("#slider").slider("value"));
          	    			years = $("#slider").slider("value");
          	    			$("#standardYear").val(years);		//슬라이드바와 콤보박스 바인딩
          	    			$("#nowYear").html(years);
          	    			getPyramidData();
          	    		},
          	    		slide:function(event, ui){
          	    			play("s", "0");												//슬라이드시 재생을 멈춘다
          	    		//	years = $("#slider").slider("value");
          	    		//	$("#standardYear").val(years);		//슬라이드바와 콤보박스 바인딩
          	    		//	$("#nowYear").html(years);
          	    		//	getPyramid(years, strType)
          	    		}
          	    	}		
          	    );
        	}
        	
        	
        	function drawDataTable(){			//데이터 표를 그림
        		
        		switch (strType){
          		case 'M':
          			$("#pyramidDataTypeStr").html(years + "년도 인구피라미드(중위)");
					break;
				case 'H':
          			$("#pyramidDataTypeStr").html(years + "년도 인구피라미드(고위)");
					break;
				case 'L':
          			$("#pyramidDataTypeStr").html(years + "년도 인구피라미드(저위)");
					break;
				default:
          			$("#pyramidDataTypeStr").html(years + "년도 인구피라미드(중위)");
          		}
        		
        		
        		
        		
        		var drawHtml = "<div class=\"c_fn2\" >";
				drawHtml += "<table class=\"tab_n5\" style=\"margin-left:-20px\">";
				drawHtml += "	<tr>";
				drawHtml += "		<th>연령</th>";
				drawHtml += "		<th>남자인구수(명)</th>";
				drawHtml += "		<th>여자인구수(명)</th>";
				
				
				for(var i=0; i<categories.length; i++){
					
					if(i%2 == 0){
						drawHtml += "<tr>";
						
						drawHtml += "<td>" + setComma(categories[i]) + "</td>";
						drawHtml += "<td>" + setComma(maleData2[i]) + "</td>";
						drawHtml += "<td>" + setComma(femaleData[i]) + "</td>";
						drawHtml += "</tr>";
					}else{
						drawHtml += "<tr>";
						drawHtml += "<td class=\"bg_color0\">" + setComma(categories[i]) + "</td>";
						drawHtml += "<td class=\"bg_color0\">" + setComma(maleData2[i]) + "</td>";
						drawHtml += "<td class=\"bg_color0\">" + setComma(femaleData[i]) + "</td>";
						drawHtml += "</tr>";
					}
				}
				drawHtml += "</table>";
				
				
				$("#tableDataArea").html(drawHtml);
        	}
        	
        	function setComma(data){
        		if( data ){
	        		return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        		} else {
        			return '';
        		}
        	}
        	
        	function nextYear(nextYear){
        		if(nextYear == 'a'){
        			$("#slider").slider("value", years + 1);
        			apiLogWrite2("D4", "D41", "전국인구추계피라미드", "다음년도 선택 : " + (years + 1) , "00", "전국");
        		}else{
        			$("#slider").slider("value", years - 1);
        			apiLogWrite2("D4", "D41", "전국인구추계피라미드", "이전년도 선택 : " + (years - 1) , "00", "전국");
        		}
        		reportData.baseYear = years;
        	}
        	
        	function getYearRatioAjax(){		//출생년도, 현재년도 기준으로 비율정보를 불러옴
            	jQuery.ajax({
        	 		type:"POST",
        	 		url: "/ServiceAPI/pyramid/pyramid.json",
        	 		data:{"years": years,
        	 			  "strType":strType,
        	 			  "birYear": birYear,
        	 			  "gubun" : "ratio"
        	 			  },
        	 		success:function(data){
  						wobir = data.result[0].wobir;
  						manbir = data.result[0].manbir;
  						mannow = data.result[0].mannow;
  						wonow = data.result[0].wonow;

  						//$("#maleRatioStr").html("<span class=\"birYearGijunBirLeft\">출생년도 기준 : <font color='blue'>" + manbir + "%</font></span> <br/><span class=\"nowYearGijunLeft\">올해기준 : <font color='blue'>" + mannow +"%</span></font>" );
  						//$("#feMaleRatioStr").html("<span class=\"birYearGijunRight\">출생년도 기준 : <font color='blue'>" + wobir + "%</font></span> <br/><span class=\"nowYearGijunRight\">올해기준 : <font color='blue'>"+ wonow +"%</span></font>" );
  						
  						/*
  						
  						$(".birYearGijunLeft").hover(
								function(){
									$("#layer_popup_pyrBirLeft").show();
									},function(){
									$("#layer_popup_pyrBirLeft").hide();
						});
  						$(".birYearGijunLeft").hover(
								function(){
									$("#layer_popup_pyrBirLeft").show();
									},function(){
									$("#layer_popup_pyrBirLeft").hide();
						});
						
  						$(".nowYearGijunLeft").hover(
							function(){
								$("#layer_popup_pyrBirLeft").show();
								},function(){
								$("#layer_popup_pyrBirLeft").hide();
						});
  						$(".birYearGijunRight").hover(
								function(){
									$("#layer_popup_pyrBirRight").show();
									},function(){
									$("#layer_popup_pyrBirRight").hide();
						});
						
  						$(".nowYearGijunRight").hover(
							function(){
								$("#layer_popup_pyrBirRight").show();
								},function(){
								$("#layer_popup_pyrBirRight").hide();
						});
  						*/
  						
        	 		},
        	 		error:function(data) {
        	 			//alert("error");
        	 		}
        		});
        }
        	
        function getAddPyramidData(){
        	$("#totAll").html("");
 			$("#totMan").html("");
 			$("#totWoman").html("");
 			$("#sexRatio").html("");
 			$("#avgAge").html("");
            	jQuery.ajax({
        	 		type:"POST",
        	 		url: "/ServiceAPI/pyramid/pyramid.json",
        	 		data:{"years": years,
        	 				"birYear": birYear,
        	 			  "strType":strType,
        	 			  "gubun" : "addData"
        	 			  },
        	 		success:function(data){
        	 			if(data.result != null){
        	 				//year, type, total, male, female, sexratio, avrage
	        	 			$("#totAll").html("총인구 : <font color=\"blue\">" + setComma(data.result[0].total) + "명</font>");
	        	 			$("#totMan").html("남자인구 : <font color=\"blue\">" + setComma(data.result[0].male) + "명</font>");
	        	 			$("#totWoman").html("여자인구 : <font color=\"blue\">" + setComma(data.result[0].female) + "명</font>");
	        	 			$("#sexRatio").html("성비(여자1백명당) : <font color=\"blue\">" + data.result[0].sexratio + "</font>");
	        	 			$("#avgAge").html("평균연령 : <font color=\"blue\">" + data.result[0].avrage + "세</font>");
	        	 			
	        	 			reportData.totData = data;
	        	 			
	        	 			console.log('reportData.totData', reportData.totData);
        	 			}
  						
        	 		},
        	 		error:function(data) {
        	 			//alert("error");
        	 		}
        		});
        }
        
        
        function pageCountPlus(){
        	jQuery.ajax({
        		type:"POST",
        		url: "/ServiceAPI/common/pageCallReg.json",
        		data:{"hpage":"/jsp/pyramid/pyramid1.jsp"},
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
			this.reportType = 1;
			this.reportData = reportData;
			
			if( !this.reportData.totData ){
				setTimeout(function(){
				window.open("/jsp/pyramid/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
    			},5000);
			} else {
				window.open("/jsp/pyramid/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
			}
		}
        	
        	
             </script>
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />

</head>
<body style="overflow-x:hidden; overflow-y:auto;"> 
	<div id="wrap2">
		<!-- header // 
		  <header id="header">
		-->
		  <header>
               <!-- Top Include 
               <script type="text/javascript"  src="/js/common/includeSearch.js"></script>
               -->
               <jsp:include page="/view/common/includeSearch"></jsp:include>
               
               
           </header>
		
	    <!-- body -->	<!-- 
		<div id="container_p" >
		<p class="path">
                    <a href="/html/index.html"><span class="path_el">분석지도&nbsp;&nbsp;>&nbsp;</span></a>
					<a href="/html/index.html"><span class="path_el">움직이는 인구피라미드&nbsp;&nbsp;>&nbsp;</span></a>
                    <a id="button_pop" href="#"><span class="path_el current">전국인구추계 피라미드</span></a>	
					<span class="data_v"><input type="image" id="viewData" src="images/data_view.jpg"  alt="데이터 보기"/></span>
	     -->
					<!-- 
					<span class="help_v"><input type="image" id="goHelp" src="images/help_view.jpg"  alt="도움말"/></span>
					
    <!--             </p> -->
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
				<span class="data_v" style="float:right; margin-right:300px; margin-top:5px;">
				<input type="image" style="text-align:right;" id="viewData" src="images/data_view.jpg"  alt="데이터 보기"/>
				<input type="image" style="text-align:right;" id="viewReport" src="/img/ico/ico_toolbars06.png"  alt="보고서 보기"/></span>
			</p>
		</div>
	    <div id="container_2" >
	    
	    
	    			
				<!-- 래프트메뉴 -->
				<div id="left_menu" >		
				<div id="layer_popup_pyr3" style="">중위값은 고위와 저위의 중간치의<br />출산율과 기대수명을 예상해<br />계산한 것입니다.</div>
				<div id="layer_popup_pyr4" style="">고위값은 높은 정도의 <br />출산율과 기대수명을 예상해<br />계산한 것입니다.</div>
				<div id="layer_popup_pyr5" style="">저위값은 낮은 정도의 <br />출산율과 기대수명을 예상해<br />계산한 것입니다.</div>
						<div id='cssmenu'>
							<ul>
								   <li class='has-sub'><a href='#' id="selMenu"><span style="font-size:14px">전국인구추계 피라미드</span></a>
									  <ul>
										 <li><span><lable>인구성장 가정</lable><br/><br/>
										 <label id="layer3"><input type="radio" name="strTypes" id="strTypeM" value="M"/> 중위 &nbsp; &nbsp; </label>
										 <label id="layer4"><input type="radio" name="strTypes" id="strTypeH" value="H" /> 고위 &nbsp; &nbsp; </label>
										 <label id="layer5"><input type="radio" name="strTypes" id="strTypeL" value="L"/> 저위</label>
										 <script>
											$("#layer3").hover(
											function(){
											$("#layer_popup_pyr3").show();
											},function(){
											$("#layer_popup_pyr3").hide();
											});
											$("#layer4").hover(
											function(){
											$("#layer_popup_pyr4").show();
											},function(){
											$("#layer_popup_pyr4").hide();
											});
											$("#layer5").hover(
											function(){
											$("#layer_popup_pyr5").show();
											},function(){
											$("#layer_popup_pyr5").hide();
											});
											</script>
										 </span>
										 </li>
										 <li>
											 <span class="py_sform">
													<form action="URL" method="post" class="md10">
														기준년도 선택	<select name="selectyear" id="standardYear" class="py_select ">
															<%
																for(int i=1960; i<=2065; i++){
															%>
																<option value="<%=i %>"><%=i %></option>
															<%
																}
															%>
														</select>
													</form>
													<!-- 2015.09.25 이선희 사무관님 요청에 의해 삭제
													<form action="URL" method="post" >
														출생년도 선택	<select name="selectyear" id="birYear"  class="py_select">
															<%
																for(int i=1961; i<=2065; i++){
															%>
																<option value="<%=i %>"><%=i %></option>
															<%
																}
															%>
														</select>
													</form>
													 -->
											 </span>
										 </li>
									  </ul>
								   </li>		
								   <li class='has-sub'><a href='/jsp/pyramid/pyramid2.jsp'><span style="font-size:14px">시도인구추계 피라미드</span></a>
									  <ul>
										 <li>
											 <span class="py_sform2">
													<form action="URL" method="post" class="md10">
														비교년도 선택	<select name="selectyear" onchange="selectyear(this.form)"  class="py_select ">
															<option selected value=0>2015</option>
															<option value=1>2014</option>
															<option value=2>2013</option>
															<option value=3>2012</option>
															<option value=4>2011</option>
														</select>
													</form>
													<form action="URL" method="post"  class="md10">
														비교지역 1	&nbsp; &nbsp; <select name="select" onchange="select(this.form)"  class="py_select">
															<option selected value=0>전국</option>
															<option  value="서울">서울</option> 
															<option  value="경기">경기</option>  
															<option  value="인천">인천</option> 
															<option  value="대전">대전</option>
															<option  value="울산">울산</option> 
															<option  value="부산">부산</option> 
															<option  value="대구">대구</option> 
															<option  value="전북">전북</option> 	
															<option  value="전남">전남</option> 
															<option  value="충북">충북</option> 															
															<option  value="충남">충남</option> 
															<option  value="강원">강원</option> 
															<option  value="경북">경북</option> 
															<option  value="경북">경남</option> 
															<option  value="제주">제주</option> 
														</select>
													</form>
													<form action="URL" method="post" >
														비교지역 2	&nbsp; &nbsp; <select name="select" onchange="select(this.form)"  class="py_select">
															<option selected value=0>전국</option>
															<option  value="서울">서울</option> 
															<option  value="경기">경기</option>  
															<option  value="인천">인천</option> 
															<option  value="대전">대전</option>
															<option  value="울산">울산</option> 
															<option  value="부산">부산</option> 
															<option  value="대구">대구</option> 
															<option  value="전북">전북</option> 	
															<option  value="전남">전남</option> 
															<option  value="충북">충북</option> 															
															<option  value="충남">충남</option> 
															<option  value="강원">강원</option> 
															<option  value="경북">경북</option> 
															<option  value="경북">경남</option> 
															<option  value="제주">제주</option> 
														</select>
													</form>
											 </span>
										 </li>
									  </ul>
								   </li>	
							</ul>
							<!-- 이선희사무관 09.25 삭제 요청
							<div class="left_text" style="height:290px;">
							출생년도 기준은 사용자가 선택한 출생년도의 <br />
							해당나이를 100%로 보고 이후 년도부터의 <br />
							인구 변화율을 계산한것 입니다.<br />
							<br />
							올해년도 기준은 사용자 올해 나이 인구를<br />
							 100%로 해당나이를 100%로 보고 <br />
							 이후 년도부터의 인구변화율을 계산한것 입니다.<br />
							 
							 <br />
							 예) 사용자의 출생년도가 1981년일 경우<br />
							 - 출생년도 기준: 1981년 0세 인구를 100%  <br />
							 &nbsp;&nbsp;기준으로 인구 변화율을 계산
							 - 올해년도 기준: 2008년 27세 인구를 100% <br />
							 &nbsp;&nbsp;기준으로 인구 변화율을 계산
							 </div>
							 -->
							 <!-- 김정은주무관 16.09.21 문구추가 요청 -->
							 <div class="left_text" style="height:70px;">
							 1999년 이전 데이터는 80세이상,  <br />
							 2000년 이후 데이터는 100세이상까지 있습니다.
							 </div>
						</div>
						
						
						
						
				</div><!-- left_menu -->

				<!-- 지도영역 -->			
				<div id="content_map" style="overflow-x:hidden; overflow-y:hidden; height:550px; width:1100px;"><!--    -> 피라미드 4/29 수정 :스타일 수정 ------------->
						<!-- 피라미드 4/29 수정 ------------->
						<div id="pyra-wrap" >							
								<ul class="pra_img">
										<li class="arrow_l"><img alt="이전년도" src="images/btn_left_map.jpg"  onclick="nextYear('b')" title="이전년도 선택" ></li>
										<li>											
											<span class="yearp">기준년도 <span id="nowYear"></span>년</span>
											<span style="width:700px; float:left;" id="pyramidArea1"></span><br/>
										</li>										
										<li class="arrow_r">
											<img alt="다음" src="images/btn_right_map.jpg" onclick="nextYear('a')" title="다음년도 선택" />
										</li>
								</ul>
						</div><!-- pyra-wrap -->
						<!-- 피라미드 4/29 수정 끝--------------->
						
						<div class="man_wrap">
								<div id="slider" style="min-width: 410px; max-width: 800px; text-align:center; margin-left:50px;"></div><br /><br />
						<!-- 
								<a  id="button_pop2" href="#" >
									<div class="mann">
										<div class="man_img"><img src="images/man.jpg"  width="30px" /></div>
										<div class="man_te" id="maleRatioStr" style="font: bold;"><span class="birYearGijun">출생년도 기준 : 94.49%</span><br/><span class="nowYearGijun">올해기준 : 98.35%</span></div>
									</div>
									<div class="womann">
										<div class="wman_img"  ><img src="images/woman.jpg"  width="30px"  /></div>
										<div class="wman_te" id="feMaleRatioStr"><span class="birYearGijun">출생년도 기준 : 94.49%</span><br/><span class="nowYearGijun">올해기준 : 98.35%</span></div>			
									</div>
								</a>	
						 -->
						 	<div style="margin-left: 80px;">
							 <span id="totAll"></span>&nbsp;&nbsp;
							 <span id="totMan"></span>&nbsp;&nbsp;
							 <span id="totWoman"></span>&nbsp;&nbsp;
							 <span id="sexRatio"></span>&nbsp;&nbsp;
							 <span id="avgAge"></span>
						 	</div>
						 </div>

							<!-- 피라미드 4/29 수정 --------------->
						 <div class="btn_pyrplay">
						 <!-- 
								<a href="#"><img src="images/Back.jpg"  alt="2배속 역재생" onclick="play('l', 500)"></a>
						  -->
								<a href="#"><img src="images/play_left.jpg"  alt="역재생" onclick="play('l', 1000)" id="reversePlay" title="역재생"></a>
								<a href="#"><img src="images/stop.jpg"  alt="정지" onclick="play('s', 0)" title="정지"></a>
								<a href="#"><img src="images/play.jpg"  alt="재생" onclick="play('r', 1000)" title="재생"></a>
							<!-- 
								<a href="#"><img src="images/fast.jpg"  alt="2배속 재생" onclick="play('r', 500)"></a>
							 -->
						 </div>
						 <!-- 피라미드 4/29 수정 --------------->

						
						
						<!-- 데이터 영역 start! -->
						<div class="small_img">
						<!-- 원래 있던 데이터 보기  
						<input type="image"  src="images/btn_small_data.jpg"  alt="데이터보기"/>
						-->
						</div> <!-- 데이터 보기 작은 이미지 -->

						<div id="map_data4"  style="display:none;" > <!-- 데이터 펼쳤을때/ display:none;을 삭제하면 보입니다.  style="display:none;" -->							
								<div id="data_4"  style="overflow-x:hidden; overflow-y:scroll; height:498px; width:430px;">
									<div id="dragArea">
											<div class="pry_form">
											<!-- 
												<form>
													<select name="selectyear" onchange=" " id="yearm"  class="pyr_selfield">
															<%
																for(int i=1940; i<=2065; i++){
															%>
																<option value="<%=i %>"><%=i %></option>
															<%
																}
															%>
													</select> <input type="submit" name="button" id="tableDataSearchBtn" value="검 색" class="pyrfile_btn"/>
												</form> 
											 -->
											</div><!-- pry_form -->
											<h3 class="subtab_title" ><span id="pyramidDataTypeStr">2014년도 인구피라미드(중위)</span></h3>
											<div class="c_fn2" id="tableDataArea">
											</div><!-- c_fn end! -->
										</div>
									</div><!-- data_4 end! -->
								<div class="center btn_b4" ><input type="image" id="closeDataTable" src="images/btn_arr.jpg"  alt="데이터테이블 닫기"/></div><!-- btn_b 닫기 버튼-->
						</div><!-- map_data4 끝!-->
						<div class="map_data_closed5"  style="display:none;" >							
								<div class="center"><input type="image" onclick="eventonclick();" src="images/btn_arr.jpg"  alt="close"/></div><!-- **** 데이터 닫혔을 때 -->
						</div><!-- map_data_closed 끝!-->
						<!-- 데이터 영역 end! -->


				</div><!-- content_map -->
				


	    </div><!-- container_2 end!-->
	    
	    <!-- footer// -->
	    <!-- 
	     <footer id="footer">
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
							<p class='address'>(302-702)대전광역시 서구 청사로 189</p>
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