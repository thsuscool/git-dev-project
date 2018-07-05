<%@ page language="java" contentType="application/vnd.ms-excel;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>

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
	response.setHeader("Content-Type","Application/vnd.ms-excel;charset=utf-8");
	response.setHeader("Content-Disposition","attachment;filename=ServiceCount.xls");

	ConfigManager.getInstance();
	request.setCharacterEncoding("utf-8");
	String month = request.getParameter("searchMonth");
	if(month == null || "".equals(month)){
		month = "";
	}
	String year = request.getParameter("yearSelect");
	if(year == null || "".equals(year)){
		year = "";
	}
	month = year + month;
	String serviceName = request.getParameter("searchText");
	if(serviceName == null || "".equals(serviceName)){
		serviceName = "";
	}
	
		/*******************************/
	/* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
	/*******************************/
	 LData lData     = null;
	  String seperate = StringUtil.fromDB(request.getParameter("seperate"));
	  
	if(seperate.equals("")) lData     = new LData( request );
	else lData     = new LData( request,seperate);
	
  	DbManager dbmgr           = null;
    RecordModel countSet    = null;
    StringBuffer countQuery = new StringBuffer(1024);
    
    String nowDate = DateTime.getShortDateString();
    
    NumberFormat clsNf = NumberFormat.getInstance();
    
	try {
    	countQuery.delete(0, countQuery.length());
		dbmgr = new DbManager();
		
		countQuery.append("	select			\n");
		countQuery.append("	    api_process_date,			\n");
		countQuery.append("	    api_element_id_change,			\n");
		countQuery.append("	    api_element_id_area,			\n");
		countQuery.append("	    sum(case when (inoutgb = 'indata')			\n");
		countQuery.append("	         then use_count			\n");
		countQuery.append("	         else 0			\n");
		countQuery.append("	    end) as indatacnt,			\n");
		countQuery.append("	    sum(case when (inoutgb = 'outdata')			\n");
		countQuery.append("	         then use_count			\n");
		countQuery.append("	         else 0			\n");
		countQuery.append("	    end) as outdatacnt,			\n");
		countQuery.append("	    sum(use_count) as use_count			\n");
		countQuery.append("	from			\n");
		countQuery.append("	    (select																																	\n");
		countQuery.append("	                api_process_date,																												\n");
		countQuery.append("	                api_element_id_change,																											\n");
		countQuery.append("	                sum(use_count) as use_count,																									\n");
		countQuery.append("	                api_element_id_area,			\n");
		countQuery.append("	                inoutgb																												\n");
		countQuery.append("	            from																																\n");
		countQuery.append("	                (select																															\n");
		countQuery.append("	                    substr(a.api_process_date, 0, 6) as api_process_date,																		\n");
		countQuery.append("	                    case when (b.api_element_id =104 or b.api_element_id =42  or b.api_element_id =111)											\n");
		countQuery.append("	                         then 'Geocoder 서비스'																									\n");
		countQuery.append("	                         when (b.api_element_id =103 or b.api_element_id =31 or b.api_element_id =37 or b.api_element_id =129 )					\n");
		countQuery.append("	                         then 'Map Control 서비스'																								\n");
		countQuery.append("	                         when (b.api_element_id =112 or b.api_element_id =43 or b.api_element_id =105)											\n");
		countQuery.append("	                         then 'Reverse Geocoder 서비스'																							\n");
		countQuery.append("	                         when (b.api_element_id =32)																							\n");
		countQuery.append("	                         then 'WebMaP 서비스'																									\n");
		countQuery.append("	                         when (b.api_element_id =130)																							\n");
		countQuery.append("	                         then 'Wizard 서비스'																									\n");
		countQuery.append("	                         when (b.api_element_id =118)																							\n");
		countQuery.append("	                         then '도시화 지역 경계 API'																								\n");
		countQuery.append("	                         when (b.api_element_id =106 or b.api_element_id =120 or b.api_element_id =41)											\n");
		countQuery.append("	                         then '사업체 기반 Director 서비스'																							\n");
		countQuery.append("	                         when (b.api_element_id =108 or b.api_element_id =53)																	\n");
		countQuery.append("	                         then '소지역 집계구 기반 공간통계 정보서비스'																							\n");
		countQuery.append("	                         when (b.api_element_id =107 or b.api_element_id =51)																	\n");
		countQuery.append("	                         then '소지역 통계항목 검색'																								\n");
		countQuery.append("	                         when (b.api_element_id =109 or b.api_element_id =54)																	\n");
		countQuery.append("	                         then '소지역 포인트 기반 공간통계 정보서비스'																							\n");
		countQuery.append("	                         when (b.api_element_id =109)																							\n");
		countQuery.append("	                         then '소지역 포인트 기반 공간통계 정보서비스'																							\n");
		countQuery.append("	                         when (b.api_element_id =135)																							\n");
		countQuery.append("	                         then '우리지역주요지표 기준년도 검색 API'																							\n");
		countQuery.append("	                         when (b.api_element_id =133)																							\n");
		countQuery.append("	                         then '우리지역주요지표 통계 API'																							\n");
		countQuery.append("	                         when (b.api_element_id =134)																							\n");
		countQuery.append("	                         then '우리지역주요지표 항목 검색 API'																								\n");
		countQuery.append("	                         when (b.api_element_id =123)																							\n");
		countQuery.append("	                         then '원포인트 원반지름안 사업체검색 API'																							\n");
		countQuery.append("	                         when (b.api_element_id =121)																							\n");
		countQuery.append("	                         then '원포인트 최단거리 사업체검색 API'																						\n");
		countQuery.append("	                         when (b.api_element_id =122)																							\n");
		countQuery.append("	                         then '임의지역내 사업체검색 API'																							\n");
		countQuery.append("	                         when (b.api_element_id =10 or b.api_element_id =110)																	\n");
		countQuery.append("	                         then '좌표변환 서비스'																										\n");
		countQuery.append("	                         when (b.api_element_id =114)																							\n");
		countQuery.append("	                         then '집계구단위 경계 API'																									\n");
		countQuery.append("	                         when (b.api_element_id =115)																							\n");
		countQuery.append("	                         then '집계구단위 통계 API'																									\n");
		countQuery.append("	                         when (b.api_element_id =113)																							\n");
		countQuery.append("	                         then '통계항목 검색 API'																									\n");
		countQuery.append("	                         when (b.api_element_id =128 or b.api_element_id =127)																	\n");
		countQuery.append("	                         then '통계항목 기준년도 검색 서비스'																								\n");
		countQuery.append("	                         when (b.api_element_id =125)																							\n");
		countQuery.append("	                         then '포인트단위 임의지역내 모든통계값 검색 API'																						\n");
		countQuery.append("	                         when (b.api_element_id =124)																							\n");
		countQuery.append("	                         then '포인트단위 조건제공리스트 검색 API'																							\n");
		countQuery.append("	                         when (b.api_element_id =126)																							\n");
		countQuery.append("	                         then '포인트단위 집계구별 통계값 검색 API'																							\n");
		countQuery.append("	                         when (b.api_element_id =55)																							\n");
		countQuery.append("	                         then '행정경계KOSIS 공간통계정보서비스'																						\n");
		countQuery.append("	                         when (b.api_element_id =52)																							\n");
		countQuery.append("	                         then '행정경계KOSIS 통계항목검색서비스'																						\n");
		countQuery.append("	                         when (b.api_element_id =116)																							\n");
		countQuery.append("	                         then '행정구역 단위 경계 API'																									\n");
		countQuery.append("	                         when (b.api_element_id =117)																							\n");
		countQuery.append("	                         then '행정구역 단위 통계 API'																									\n");
		countQuery.append("	                         when (b.api_element_id =132)																							\n");
		countQuery.append("	                         then '행정구역경계기준년도 API'																							\n");
		countQuery.append("	                         when (b.api_element_id =131)																							\n");
		countQuery.append("	                         then '행정구역단일경계 API'																									\n");
		countQuery.append("	                         when (b.api_element_id =119)																							\n");
		countQuery.append("	                         then '행정구역코드 검색 API'																									\n");
		countQuery.append("	                         else api_element_name																									\n");
		countQuery.append("	                     end      as api_element_id_change,																							\n");
		countQuery.append("	                     case when (b.api_element_id =104 or b.api_element_id =42  or b.api_element_id =111)										\n");
		countQuery.append("	                         then 'C'																												\n");
		countQuery.append("	                         when (b.api_element_id =103 or b.api_element_id =31 or b.api_element_id =37 or b.api_element_id =129)					\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =112 or b.api_element_id =43 or b.api_element_id =105)											\n");
		countQuery.append("	                         then 'C'																												\n");
		countQuery.append("	                         when (b.api_element_id =32)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =130)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =118)																							\n");
		countQuery.append("	                         then 'A'																												\n");
		countQuery.append("	                         when (b.api_element_id =106 or b.api_element_id =120 or b.api_element_id =41)											\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =108 or b.api_element_id =53)																	\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =107 or b.api_element_id =51)																	\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =109 or b.api_element_id =54)																	\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =109)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =135)																							\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         when (b.api_element_id =133)																							\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         when (b.api_element_id =134)																							\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         when (b.api_element_id =123)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =121)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =122)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =10 or b.api_element_id =110)																	\n");
		countQuery.append("	                         then 'C'																												\n");
		countQuery.append("	                         when (b.api_element_id =114)																							\n");
		countQuery.append("	                         then 'A'																												\n");
		countQuery.append("	                         when (b.api_element_id =115)																							\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         when (b.api_element_id =113)																							\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         when (b.api_element_id =128 or b.api_element_id =127)																	\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         when (b.api_element_id =125)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =124)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =126)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =55)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =52)																							\n");
		countQuery.append("	                         then 'D'																												\n");
		countQuery.append("	                         when (b.api_element_id =116)																							\n");
		countQuery.append("	                         then 'A'																												\n");
		countQuery.append("	                         when (b.api_element_id =117)																							\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         when (b.api_element_id =132)																							\n");
		countQuery.append("	                         then 'A'																												\n");
		countQuery.append("	                         when (b.api_element_id =131)																							\n");
		countQuery.append("	                         then 'A'																												\n");
		countQuery.append("	                         when (b.api_element_id =119)																							\n");
		countQuery.append("	                         then 'B'																												\n");
		countQuery.append("	                         else api_element_name																									\n");
		countQuery.append("	                    end      as api_element_id_area,																							\n");
		countQuery.append("	                    b.api_element_name,																											\n");
		countQuery.append("	                    use_count     ,			\n");
		countQuery.append("	                    case when (substr(api_auth_key, 0, 4) = 'ESGA')			\n");
		countQuery.append("	                         then 'indata'			\n");
		countQuery.append("	                         else 'outdata'			\n");
		countQuery.append("	                    end as inoutgb																												\n");
		countQuery.append("	                from																															\n");
		countQuery.append("	                    sgis_api_log_group a																										\n");
		countQuery.append("	                join sgis_api_element_code b																									\n");
		countQuery.append("	                on a.api_element_id = b.api_element_id																							\n");
		countQuery.append("	                )																																\n");
		countQuery.append("	                where api_process_date like '" + month + "%'																					\n");
		countQuery.append("	                and api_element_name like '%" + serviceName + "%'																				\n");
		countQuery.append("	            group by api_process_date, api_element_id_change, api_element_id_area  , inoutgb			\n");
		countQuery.append("	    )			\n");
		countQuery.append("	    group by api_process_date, api_element_id_change, api_element_id_area			\n");	
		countQuery.append("	    order by api_element_id_area asc, use_count desc			\n");	

	
		dbmgr.prepareStatement(countQuery.toString(), lData);
		countSet = dbmgr.select();
    
    
    } catch( Exception e ) {
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    } finally {
    	dbmgr.close();
    }
		
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<title></title>
<style type='text/css'>

.table1 {margin:5px 0px 0px 0px; padding:0px; border-collapse:collapse;}
.table1 caption{display: none;}
.table1 th{color:#33698f; background-color:#e3f0f9; border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px; font-size:12px;}
.table1 td{font-weight:normal;text-align:justify;  border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px;}
.table1 .t_end{ border-right:none; }
.table1 .td_top{ border-top:2px solid #72aacf;}
.table1 .td_bottom{ border-bottom:none;}
.table1 .cell_left {text-align:left;}
.table1 .cell_right{text-align:right;}
.table1 .cell_center{text-align:center;}
.table1 .cell_point {background:#f3faff;}
.table1 a:link{font-weight:normal;}
.table1 a:active{font-weight:normal;}
.table1 a:visited{font-weight:normal;}
.table1 a:hover{font-weight:normal;}

</style>
</head>
<body>
	
<table width="15%" border=0 cellpadding="0" cellspacing="0" class="table1"  >
  <thead>
      <tr>
        <th class="td_top" >서비스명</th>
        <th class="td_top" >구분</th>
        <th class="t_end td_top" >내부횟수</th>
        <th class="t_end td_top" >외부횟수</th>
        <th class="t_end td_top" >활용횟수</th>
      </tr>
    </thead>
    <tbody>
<%
		
	String api_process_date="";
	String api_element_id_change="";
	String use_count="";
	String api_element_id_area="";
	String indatacnt="";
	String outdatacnt="";
	
	int apiSum = 0;
	int aSum = 0;
	int bSum = 0;
	int cSum = 0;
	int dSum = 0;
	int inSum = 0;
	int outSum = 0;
	String areaName = "";
	
	while(countSet != null && countSet.next()) {
		api_process_date = countSet.get("api_process_date").toString();
		api_element_id_change = countSet.get("api_element_id_change").toString();
		use_count = countSet.get("use_count").toString();
		api_element_id_area = countSet.get("api_element_id_area").toString();
		indatacnt = countSet.get("indatacnt").toString();
		outdatacnt = countSet.get("outdatacnt").toString();
		
		
		if("A".equals(api_element_id_area)){
			areaName = "좌표";
			aSum = aSum + Integer.parseInt(use_count);
		}else if("B".equals(api_element_id_area)){
			areaName = "경계";
			bSum = bSum + Integer.parseInt(use_count);
		}else if("C".equals(api_element_id_area)){
			areaName = "센서스";
			cSum = cSum + Integer.parseInt(use_count);
		}else if("D".equals(api_element_id_area)){
			areaName = "기타";
			dSum = dSum + Integer.parseInt(use_count);
		}
		
	//	api_process_date = clsNf.format(Integer.parseInt(api_process_date));
		
		apiSum = apiSum + Integer.parseInt(use_count);
		use_count = clsNf.format(Integer.parseInt(use_count));
		inSum = inSum + Integer.parseInt(indatacnt);
		outSum = outSum + Integer.parseInt(outdatacnt);
	
	//	api_process_date = clsNf.format(Integer.parseInt(api_process_date));
	%>
	
	<tr>
		<td><%= api_element_id_change %></td>
		<td><%= areaName %></td>
		<td><%= indatacnt %></td>
		<td><%= outdatacnt %></td>
		<td><%= use_count %></td>
	</tr>
<%
    }
%>
	<tr>
		<th class="td_top" colspan="4">좌표</th>
		<td><%= clsNf.format(aSum) %></td>
	</tr>
	<tr>
		<th class="td_top" colspan="4">경계</th>
		<td><%= clsNf.format(bSum) %></td>
	</tr>
	<tr>
		<th class="td_top" colspan="4">센서스</th>
		<td><%= clsNf.format(cSum) %></td>
	</tr>
	<tr>
		<th class="td_top" colspan="4">기타</th>
		<td><%= clsNf.format(dSum) %></td>
	</tr>
	<tr>
		<th class="td_top" colspan="4">내부합계</th>
		<td><%= clsNf.format(inSum) %></td>
	</tr>
	<tr>
		<th class="td_top" colspan="4">외부합계</th>
		<td><%= clsNf.format(outSum) %></td>
	</tr>
	<tr>
		<th class="td_top" colspan="4">합계</th>
		<td><%= clsNf.format(apiSum) %></td>
	</tr>
	</tbody>
	</table>
	</body>
</html>