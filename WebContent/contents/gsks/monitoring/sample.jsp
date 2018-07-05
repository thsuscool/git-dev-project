<%@ page language="java" contentType="text/html;charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Flot Examples: Pie Charts</title>
	<link href="../examples.css" rel="stylesheet" type="text/css">
	<style type="text/css">

	#menu {
		position: absolute;
		top: 20px;
		left: 625px;
		bottom: 20px;
		right: 20px;
		width: 200px;
	}

	#menu button {
		display: inline-block;
		width: 200px;
		padding: 3px 0 2px 0;
		margin-bottom: 4px;
		background: #eee;
		border: 1px solid #999;
		border-radius: 2px;
		font-size: 16px;
		-o-box-shadow: 0 1px 2px rgba(0,0,0,0.15);
		-ms-box-shadow: 0 1px 2px rgba(0,0,0,0.15);
		-moz-box-shadow: 0 1px 2px rgba(0,0,0,0.15);
		-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.15);
		box-shadow: 0 1px 2px rgba(0,0,0,0.15);
		cursor: pointer;
	}

	#description {
		margin: 15px 10px 20px 10px;
	}



	</style>
	<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="../../excanvas.min.js"></script><![endif]-->
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery_chart.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.pie.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.categories.js"></script>
	<script type="text/javascript">

	$(function() {



		var data = [], 
			series = 10;							//차트를 이루는 데이터 건수를 설정

		for (var i = 0; i < series; i++) {
			data[i] = {
				data: Math.floor(Math.random() * 500) + 1,		//데이터 값을 설정
				label: "데이터" + (i + 1)+":data="				//데이터 이름 설정
			}
		}

		var placeholder = $("#placeholder");
		var placeholder2 = $("#placeholder2");


		$("#example-8").click(function() {

			placeholder.unbind();

			$.plot(placeholder, data, {
				series: {
					pie: { 
						show: true,
						combine: {
							color: "#999",
							threshold: 0.01		//자료를 얼마나 디테일하게 표출해줄지 설정
						}
					}
				},
				legend: {
					show: true				//어떤 내역인지 확인하고 싶을때 설정
				}
			});
		});
		$("#example-9").click(function() {

			placeholder2.unbind();

			 var data = [  ["0시", 211], ["1시", 332], ["3시", 233], ["4시", 533], ["5시", 133], ["6시", 633], ["7시", 733], ["8시", 833], ["9시", 933], ["10시", 1233], ["11시", 1333], ["12시", 1433]
				, ["13시", 1533], ["14시", 2033], ["15시", 3133], ["16시", 1433], ["17시", 1233], ["18시", 1133], ["19시", 923], ["20시", 633], ["21시", 533], ["22시", 133], ["23시", 433]];
			    
			    $.plot($("#placeholder2"), [ data ], {
			        series: {
			            bars: {
			                show: true,		//true:막대, false:선
			                barWidth:  1,
			                align: "center" }
			        },
			        xaxis: {
			            mode: "categories",
			            tickLength: 0
			        }
			    });
		});
	});
	</script>
</head>
<body>

	<div id="header">
		<h2>leekh Charts 프로토타입</h2>
	</div>

	<div id="content">

		<div class="demo-container" style="position: relative; height: 300px;">
			<div id="placeholder2" style="width: 300px; height: 150px;"></div>
			<div id="placeholder" style="width: 300px; height: 150px;"></div>
			<div id="menu">
				<button id="example-9">막대차트</button>
				<button id="example-8">원형차트</button>
			</div>
		</div>

	</div>
</body>
</html>
