<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="com.innogrid.sgisapi.api.vo.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Pyramid Ajax</title>
	
		<style type="text/css">
${demo.css}
		</style>
<!-- end -->

		<script type="text/javascript">
		
$(function () {
	
	  <%
  		List<PyramidVo> pyramidList  = new ArrayList<PyramidVo>();
	  	pyramidList =(List<PyramidVo>)request.getAttribute("pyramidList");
	  	String birYear =request.getAttribute("birYear").toString();
	  
	  	int selectAge = 0;	//찾고자 하는 나이가 몇번째인지 알기 위해
	  
  	%>
  	 	var categories = [
  	<%
  		for(int i=0; i<pyramidList.size(); i++){
  		String age = pyramidList.get(i).getAge();
  		
  		if((birYear + "세").equals(age) ){
  			selectAge = i;
  		}
  		
  		
  	%>
  		'<%=age %>',
  	<%
  		}
  	%>
  ];
    $(document).ready(function () {
    	pyrmdChart = $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            exporting: {
            	enabled : false,		//인쇄 및 그림파일로 추출
            },
            drilldown: {
            	animation : false,
            },
            title: {
                text: '움직이는 인구 피라미드'
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
                        return (Math.abs(this.value) / 10000) + '만명';
                    }
                },
                min: -500000,
                max: 500000
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {
                	animation : false		//애니메이션 지우기
                }
            },

            tooltip: {
                formatter: function () {
                	$("rect:eq(<%=selectAge+2 %>)").attr("fill", "yellow");							//마우스 over시 색상 유지
                	$("rect:eq(<%=selectAge+103 %>)").attr("fill", "yellow");						//마우스 over시 색상 유지
                    return '<b>' + this.series.name + this.point.category + ', 세¸ ' + '</b><br/>' +
                        '인구: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0) +'명';
                },
            },
            series: [{
                name: '남자',
                data: [
                   	<%
              		for(int i=0; i<pyramidList.size(); i++){
              		String male = pyramidList.get(i).getMale();
              	%>
              		-<%=male %>,
              	<%
              		}
              	%>   
                    ],
				color: 'blue'
            }, {
                name: '여자',
                data: [
                    	<%
                  		for(int i=0; i<pyramidList.size(); i++){
                  		String female = pyramidList.get(i).getFemale();
                  	%>
                  		<%=female %>,
                  	<%
                  		}
                  	%>   
                    ],
				color: 'red'
            }]
        });
    	
		$("rect[fill=red]:eq(<%=selectAge %>)").attr("fill", "yellow");
		$("rect[fill=blue]:eq(<%=selectAge %>)").attr("fill", "yellow");

		$("rect[fill=yellow]:eq(<%=selectAge %>)").attr("chk", "chk");
		
    });
    
});
</script>
<div id="container" style="min-width: 410px; max-width: 800px; height: 480px; margin: 0 auto"></div><br />
