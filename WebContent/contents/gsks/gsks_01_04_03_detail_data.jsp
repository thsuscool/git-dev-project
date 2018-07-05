<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%

	GeneralBroker broker = null;
	RecordModel rm = null;
	
	String detail_what = lData.getString("detail_what");
	
	String sgis_census_id = "";
	String sgis_census_data_id = "";
	String detail_name = "";
	
	if ("oa_in".equals(detail_what)) { //통계자료(1), 인구(0)
		sgis_census_id = "1";
		sgis_census_data_id = "0";
		detail_name = "집계구별 통계(인구)";
	} else if ("oa_ga".equals(detail_what)) { //통계자료(1), 가구(1)
		sgis_census_id = "1";
		sgis_census_data_id = "1";
		detail_name = "집계구별 통계(가구)";
	} else if ("oa_ho".equals(detail_what)) { //통계자료(1), 주택(2)
		sgis_census_id = "1";
		sgis_census_data_id = "2";
		detail_name = "집계구별 통계(주택)";
	} else if ("oa_cp".equals(detail_what)) { //통계자료(1), 사업체(3)
		sgis_census_id = "1";
		sgis_census_data_id = "3";
		detail_name = "집계구별 통계(사업체)";
		
		
	//=============================================================================================
		
	} else if ("bnd_all".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(전체) (0)
		sgis_census_id = "2";
		sgis_census_data_id = "0";
		detail_name = "센서스용 행정구역경계(전체)";
	} else if ("bnd_sido".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(시도) (1)
		sgis_census_id = "2";
		sgis_census_data_id = "1";
		detail_name = "센서스용 행정구역경계(시도)";		
	} else if ("bnd_sigungu".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(시군구) (2)
		sgis_census_id = "2";
		sgis_census_data_id = "2";
		detail_name = "센서스용 행정구역경계(시군구)";
	} else if ("bnd_dong".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(읍면동) (3)
		sgis_census_id = "2";
		sgis_census_data_id = "3";
		detail_name = "센서스용 행정구역경계(읍면동)";
	} else if ("bnd_ua".equals(detail_what)) { //통계지역경계(2), 도시화지역(4)
		sgis_census_id = "2";
		sgis_census_data_id = "4";
		detail_name = "도시화지역";
	} else if ("bnd_ma".equals(detail_what)) { //통계지역경계(2), 도시권경계(5)
		sgis_census_id = "2";
		sgis_census_data_id = "5";
		detail_name = "도시권경계";
	} else if ("bnd_oa".equals(detail_what)) { //통계지역경계(2), 집계구경계(6)
		sgis_census_id = "2";
		sgis_census_data_id = "6";
		detail_name = "집계구경계";
	//=============================================================================================
	
		
		
	} else if ("db_schema".equals(detail_what)) { //센서스지도(3), DB설계(0)
		sgis_census_id = "3";
		sgis_census_data_id = "0";
		detail_name = "DB설계";
	} else if ("bas_river".equals(detail_what)) { //센서스지도(3), 하천(1)
		sgis_census_id = "3";
		sgis_census_data_id = "1";
		detail_name = "하천";
	} else if ("bas_bldg".equals(detail_what)) { //센서스지도(3), 건물(2)
		sgis_census_id = "3";
		sgis_census_data_id = "2";
		detail_name = "건물";
	} else if ("bas_road".equals(detail_what)) { //센서스지도(3), 도로(3)
		sgis_census_id = "3";
		sgis_census_data_id = "3";
		detail_name = "도로";
	} else if ("bas_rail".equals(detail_what)) { //센서스지도(3), 철도(4)
		sgis_census_id = "3";
		sgis_census_data_id = "4";
		detail_name = "철도";
	} else if ("bas_cntr".equals(detail_what)) { //센서스지도(3), 등고(5)
		sgis_census_id = "3";
		sgis_census_data_id = "5";
		detail_name = "등고";
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title><%=sc_pageTitle %></title>
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/gsks/style/style.css" type="text/css" media="all">
<script src=/contents/scripts/common.js></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/main/jquery-1.5.1.min.js"></script>

<script language="javascript">

//최신자료갱신
function gsks_search_detail_data() {
	if( $('#sgis_census_year_id').val()=="" ) {
		alert('년도를 선택하세요.');
		return false;
	}
	
	/*
	if( $('#search_word').val()=="" ) {
		alert('자료명을 입력하세요.');
		return false;
	}
	*/
	
	//oa_in : 통계자료 ==> 인구
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_detail_data_result.jsp",
		data:{"detail_what":"<%=detail_what%>" , "sgis_census_year" : $('#sgis_census_year_id').val() ,  "search_word" : $('#search_word').val() },
		success:function(data){
			jQuery('#search_result').html(data);
		},
		error:function(data) {
			
		}
	});
	
	  
    
}

</script>

</head>
<body>


  <div class="clear"></div>
  <div style="margin-left:19px;	background:url(/contents/gsks/images/content_title_point.gif) no-repeat 10px 23px;	width:560px;height:46px;border-bottom:1px solid #000000;">
      <div style="padding-left:26px; padding-top:20px; font-size:15px; color:#0e4d9c; font-weight:bold; width:500px; float:left; font-family:'dotum';"><%=detail_name%></div> 
  </div>
  
    <div style="width:570px;">
	  	<div class="admin_tab_search">
	  		<br />
				&nbsp;&nbsp;&nbsp;년 도&nbsp;&nbsp; : &nbsp;&nbsp;
				
				<select name="sgis_census_year" id="sgis_census_year_id">
		    			<option value="">= 선택 =</option>
	    		<%
	    			try {
	    				


	    				broker = new GeneralBroker("ceaa00");
	    				lData.setString("PARAM", "SIGUNGU_DETAIL_DATA_YEAR");
	    				
	    				lData.setString("sgis_census_id", sgis_census_id);
	    				lData.setString("sgis_census_data_id", sgis_census_data_id);
	    				
	    				rm = broker.getList(lData);
	    				
	    				String sgis_census_year = "";

	    			while(rm.next()) {
	    				sgis_census_year = String.valueOf(rm.get("sgis_census_year"));
	    		%>
	    				<option value="<%=sgis_census_year %>" ><%=sgis_census_year %></option>
	    		<%
	    			}
				%>
	    		</select>
	    		<%
		    		} catch(Exception e) {
	    				System.out.print("sgisWebError : ");
	    				//2015-12-03 시큐어코딩
	    				//e.printStackTrace();
	    				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	    			} 
    			%>
				
				&nbsp;				
				자료명 : <input type="text" name="search_word" id="search_word" title="자료명" class="inp w20"  />
				&nbsp;
				<a href="#" target="_blank" onclick="javascript:gsks_search_detail_data(); return false;">
                      <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/>
                </a>
                
		<div class="clear"></div>
	  </div>
	<table width="560" cellpadding="0" cellspacing="0" class="table1" summary=""style="margin-left:10px" >
    <caption>
    사이트관리
    </caption>
    <thead>
      <tr align="center">
        
        <th class="td_top" colspan='2'><center><%=detail_name%></center></th>
        
      </tr>
    </thead>
    <tbody id="search_result">
      
      
    </tbody>
  </table>

  <div class="clear"></div>

</div>

</body>
</html>			