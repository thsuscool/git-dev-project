<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>

		<style type="text/css">
${demo.css}
		</style>
		<script type="text/javascript">
		
  var categories = new Array();
  var maleData = new Array();
  var femaleData = new Array();
  var feMale = "";
  
  <%
  	String years = "";
  	String strType = "";
  	
  	years = request.getParameter("years");
  	strType = request.getParameter("strType");

  %>
  
$(function () {
	
	 jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/pyramid/pyramid.json",
	 		data:{"years":"<%=years %>",
	 			  "strType":"<%=strType %>"
	 			  },
	 		success:function(data){
					for(var i=0; i<data.result.length; i++){
						years = data.result[i].years;
						categories[i] = data.result[i].age;
						maleData[i] = parseInt("-" + data.result[i].male);
						femaleData[i] = parseInt( data.result[i].male);
						female = data.result[i].female;
					}
	 				
	 			drawPyramid();
	 			
	 		},
	 		error:function(data) {
	 			alert("error");
	 		}
		});
    $(document).ready(function () {
      
    });
    
});

	function drawPyramid(){
		  $('#container').highcharts({
	            chart: {
	                type: 'bar'
	            },
	            exporting: {
	            	enabled : false,
	            },
	            drilldown:{
	            	animation : false,
	            },
	            title: {
	                text: '움직이는 인구 피라미드'
	            },
	            subtitle: {
	                text: 'Source: https://sgis.kostat.go.kr'
	            },
	            xAxis: [{
	            	categories: categories,
	                reversed: true,
	                labels: {
	                    step: 1
	                }
	            }, { // mirror axis on right side
	                opposite: true,
	                reversed: true,
	                categories: categories,
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
	                        return (Math.abs(this.value) / 10000) + '만명';
	                    }
	                },
	                min: -500000,
	                max: 500000
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
	                    return '<b>' + this.series.name + ', ' + this.point.category + '</b><br/>' +
	                        '인구수: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
	                }
	            },

	            series: [{
	                name: '남자',
	                data: maleData,
	                color : 'blue'
	            }, {
	                name: '여자',
	                data: femaleData,
	                color : 'red'
	            }]
	        });
		
	}


		</script>
	</head>
	<body>

<!--
<script src="../../js/modules/exporting.js"></script>
-->

<div id="container" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>

	</body>
</html>
