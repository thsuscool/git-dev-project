<%@ page language="java" contentType="text/html;charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>

<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%@page import="java.util.Calendar" %>
<%@page import="java.text.NumberFormat" %>

<%@ include file="/contents/include/logger.jsp"%>

<%
	ConfigManager.getInstance();
	request.setCharacterEncoding("utf-8");
	String area = request.getParameter("area");
	/*******************************/
	/* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
	/*******************************/
	
	if(seperate.equals("")) lData     = new LData( request );
	else lData     = new LData( request,seperate);
	
  	DbManager dbmgr           = null;
    RecordModel countSet    = null;
    StringBuffer countQuery = new StringBuffer(1024);
    
    String nowDate = DateTime.getShortDateString();
    
    //임시로 날자 2013년으로 수정
//    nowDate = "20130710";
    nowDate = nowDate.substring(0,6);
    
    
    NumberFormat clsNf = NumberFormat.getInstance();
    
	try {
    	countQuery.delete(0, countQuery.length());
		dbmgr = new DbManager();
		
		countQuery.append("	select																													\n");
		countQuery.append("	    api_process_date,																									\n");
		countQuery.append("	    api_element_id_change,																								\n");
		countQuery.append("	    sum(use_count) as use_count,																						\n");
		countQuery.append("	    api_element_id_area																									\n");
		countQuery.append("	from																													\n");
		countQuery.append("	    (select																												\n");
		countQuery.append("	        substr(a.api_process_date, 0, 6) as api_process_date,															\n");
		countQuery.append("	        case when (b.api_element_id =104 or b.api_element_id =42  or b.api_element_id =111)								\n");
		countQuery.append("	             then 'Geocoder 서비스'																						\n");
		countQuery.append("	             when (b.api_element_id =103 or b.api_element_id =31 or b.api_element_id =37 or b.api_element_id =129 )		\n");
		countQuery.append("	             then 'Map Control 서비스'																						\n");
		countQuery.append("	             when (b.api_element_id =112 or b.api_element_id =43 or b.api_element_id =105)								\n");
		countQuery.append("	             then 'Reverse Geocoder 서비스'																				\n");
		countQuery.append("	             when (b.api_element_id =32)																				\n");
		countQuery.append("	             then 'WebMaP 서비스'																							\n");
		countQuery.append("	             when (b.api_element_id =130)																				\n");
		countQuery.append("	             then 'Wizard 서비스'																							\n");
		countQuery.append("	             when (b.api_element_id =118)																				\n");
		countQuery.append("	             then '도시화 지역 경계 API'																						\n");
		countQuery.append("	             when (b.api_element_id =106 or b.api_element_id =120 or b.api_element_id =41)								\n");
		countQuery.append("	             then '사업체 기반 Director 서비스'																				\n");
		countQuery.append("	             when (b.api_element_id =108 or b.api_element_id =53)														\n");
		countQuery.append("	             then '소지역 집계구 기반 공간통계 정보서비스'																				\n");
		countQuery.append("	             when (b.api_element_id =107 or b.api_element_id =51)														\n");
		countQuery.append("	             then '소지역 통계항목 검색'																						\n");
		countQuery.append("	             when (b.api_element_id =109 or b.api_element_id =54)														\n");
		countQuery.append("	             then '소지역 포인트 기반 공간통계 정보서비스'																				\n");
		countQuery.append("	             when (b.api_element_id =109)																				\n");
		countQuery.append("	             then '소지역 포인트 기반 공간통계 정보서비스'																				\n");
		countQuery.append("	             when (b.api_element_id =135)																				\n");
		countQuery.append("	             then '우리지역주요지표 기준년도 검색 API'																				\n");
		countQuery.append("	             when (b.api_element_id =133)																				\n");
		countQuery.append("	             then '우리지역주요지표 통계 API'																					\n");
		countQuery.append("	             when (b.api_element_id =134)																				\n");
		countQuery.append("	             then '우리지역주요지표 항목 검색 API'																					\n");
		countQuery.append("	             when (b.api_element_id =123)																				\n");
		countQuery.append("	             then '원포인트 원반지름안 사업체검색 API'																				\n");
		countQuery.append("	             when (b.api_element_id =121)																				\n");
		countQuery.append("	             then '원포인트 최단거리 사업체검색 API'																				\n");
		countQuery.append("	             when (b.api_element_id =122)																				\n");
		countQuery.append("	             then '임의지역내 사업체검색 API'																					\n");
		countQuery.append("	             when (b.api_element_id =10 or b.api_element_id =110)														\n");
		countQuery.append("	             then '좌표변환 서비스'																							\n");
		countQuery.append("	             when (b.api_element_id =114)																				\n");
		countQuery.append("	             then '집계구단위 경계 API'																						\n");
		countQuery.append("	             when (b.api_element_id =115)																				\n");
		countQuery.append("	             then '집계구단위 통계 API'																						\n");
		countQuery.append("	             when (b.api_element_id =113)																				\n");
		countQuery.append("	             then '통계항목 검색 API'																							\n");
		countQuery.append("	             when (b.api_element_id =128 or b.api_element_id =127)														\n");
		countQuery.append("	             then '통계항목 기준년도 검색 서비스'																					\n");
		countQuery.append("	             when (b.api_element_id =125)																				\n");
		countQuery.append("	             then '포인트단위 임의지역내 모든통계값 검색 API'																			\n");
		countQuery.append("	             when (b.api_element_id =124)																				\n");
		countQuery.append("	             then '포인트단위 조건제공리스트 검색 API'																				\n");
		countQuery.append("	             when (b.api_element_id =126)																				\n");
		countQuery.append("	             then '포인트단위 집계구별 통계값 검색 API'																				\n");
		countQuery.append("	             when (b.api_element_id =55)																				\n");
		countQuery.append("	             then '행정경계KOSIS 공간통계정보서비스'																				\n");
		countQuery.append("	             when (b.api_element_id =52)																				\n");
		countQuery.append("	             then '행정경계KOSIS 통계항목검색서비스'																				\n");
		countQuery.append("	             when (b.api_element_id =116)																				\n");
		countQuery.append("	             then '행정구역 단위 경계 API'																						\n");
		countQuery.append("	             when (b.api_element_id =117)																				\n");
		countQuery.append("	             then '행정구역 단위 통계 API'																						\n");
		countQuery.append("	             when (b.api_element_id =132)																				\n");
		countQuery.append("	             then '행정구역경계기준년도 API'																					\n");
		countQuery.append("	             when (b.api_element_id =131)																				\n");
		countQuery.append("	             then '행정구역단일경계 API'																						\n");
		countQuery.append("	             when (b.api_element_id =119)																				\n");
		countQuery.append("	             then '행정구역코드 검색 API'																						\n");
		countQuery.append("	             else api_element_name																						\n");
		countQuery.append("	         end      as api_element_id_change,																				\n");
		countQuery.append("	         case when (b.api_element_id =104 or b.api_element_id =42  or b.api_element_id =111)							\n");
		countQuery.append("	             then 'C'																									\n");
		countQuery.append("	             when (b.api_element_id =103 or b.api_element_id =31 or b.api_element_id =37 or b.api_element_id =129)		\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =112 or b.api_element_id =43 or b.api_element_id =105)								\n");
		countQuery.append("	             then 'C'																									\n");
		countQuery.append("	             when (b.api_element_id =32)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =130)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =118)																				\n");
		countQuery.append("	             then 'A'																									\n");
		countQuery.append("	             when (b.api_element_id =106 or b.api_element_id =120 or b.api_element_id =41)								\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =108 or b.api_element_id =53)														\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =107 or b.api_element_id =51)														\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =109 or b.api_element_id =54)														\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =109)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =135)																				\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             when (b.api_element_id =133)																				\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             when (b.api_element_id =134)																				\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             when (b.api_element_id =123)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =121)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =122)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =10 or b.api_element_id =110)														\n");
		countQuery.append("	             then 'C'																									\n");
		countQuery.append("	             when (b.api_element_id =114)																				\n");
		countQuery.append("	             then 'A'																									\n");
		countQuery.append("	             when (b.api_element_id =115)																				\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             when (b.api_element_id =113)																				\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             when (b.api_element_id =128 or b.api_element_id =127)														\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             when (b.api_element_id =125)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =124)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =126)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =55)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =52)																				\n");
		countQuery.append("	             then 'D'																									\n");
		countQuery.append("	             when (b.api_element_id =116)																				\n");
		countQuery.append("	             then 'A'																									\n");
		countQuery.append("	             when (b.api_element_id =117)																				\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             when (b.api_element_id =132)																				\n");
		countQuery.append("	             then 'A'																									\n");
		countQuery.append("	             when (b.api_element_id =131)																				\n");
		countQuery.append("	             then 'A'																									\n");
		countQuery.append("	             when (b.api_element_id =119)																				\n");
		countQuery.append("	             then 'B'																									\n");
		countQuery.append("	             else api_element_name																						\n");
		countQuery.append("	        end      as api_element_id_area,																				\n");
		countQuery.append("	        b.api_element_name,																								\n");
		countQuery.append("	        use_count																										\n");
		countQuery.append("	    from																												\n");
		countQuery.append("	        sgis_api_log_group a																							\n");
		countQuery.append("	    join sgis_api_element_code b																						\n");
		countQuery.append("	    on a.api_element_id = b.api_element_id																				\n");
		countQuery.append("	    )																													\n");
		countQuery.append("	    where api_process_date like '" + nowDate.substring(0,6) +"%'	 					 														\n");
		countQuery.append("	    and api_element_id_area = '" + area + "'	 																					\n");
		countQuery.append("	group by api_process_date, api_element_id_change, api_element_id_area													\n");
		dbmgr.prepareStatement(countQuery.toString(), lData);
		countSet = dbmgr.select();
    
    
    } catch( Exception e ) {
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    } finally {
    	dbmgr.close();
    }
	
	int pieChartSize = countSet.getRowCount();
		%>


	<title>SGIS Open API 모니터링서비스</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/base.css" /> 
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/style.css" /> 
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery_chart.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.pie.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.categories.js"></script>
<script type="text/javascript">

	$(function() {
		var dataAjax = [], 
		series = <%= pieChartSize%>;							//차트를 이루는 데이터 건수를 설정
		<%
			
		%>
			var placeholderAjax = $("#placeholderAjax<%=area %>");		//API분포도 통계
		
		<%
			String api_process_date="";
			String use_count="";
			String api_element_id_change="";
			
		int i = 0;
	    while(countSet != null && countSet.next()) {
	    	api_process_date = countSet.get("api_process_date").toString();
	    	use_count = countSet.get("use_count").toString();
	    	api_element_id_change = countSet.get("api_element_id_change").toString();
	    	
	    	
	    //	api_process_date = clsNf.format(Integer.parseInt(api_process_date));
	%>
			dataAjax[<%=i%>] = {
			data: <%=use_count %>,		//데이터 값을 설정
			label: "<%= api_element_id_change%>" 			//데이터 이름 설정
			}
	
	<%
		i++;
	    }
	%>
		
		$.plot(placeholderAjax, dataAjax, {
			series: {
				pie: { 
					show: true,
					combine: {
						color: "#999",
						threshold: 0.01		
					}
				}
			},
			legend: {
				show: true				
			}
		});	
		
		if(0 == <%=i%>){
			$("#placeholderAjax<%=area%>").html("데이터가 없습니다.");
		}
		
		
	});
	
</script>

				<div class="p2">
					<div class="p2chart" id="placeholderAjax<%=area%>"></div>
				</div>
