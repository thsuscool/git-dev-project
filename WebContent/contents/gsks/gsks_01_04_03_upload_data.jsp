<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	
	System.out.println("[gsks_01_04_03_search_data.jsp] =========================== 시작 ===========================");

	GeneralBroker broker = null;
	RecordModel rm = null;

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
function gsks_count_data() {
	if( $('#sgis_census_year_id').val()=="" ) {
		alert('년도를 선택하세요.');
		return false;
	}
	
	//oa_in : 통계자료 ==> 인구
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"oa_in" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#oa_in').html(data);
		},
		error:function(data) {
			
		}
	});
	
	
	
}

function detail_data(detail_what) {
	window.open("gsks_01_04_03_detail_data.jsp?detail_what=" + detail_what ,"gsks_01_04_03_detail_data","width=600, height=480, scrollbars=yes, resizable=yes");
}


</script>

</head>
<body>


  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">센서스경계자료제공</div>
      
    </div>
    <div class="content">
	  	<div class="admin_tab_search">
				&nbsp;&nbsp;&nbsp;년 도&nbsp;&nbsp; : &nbsp;&nbsp;
				
				<select name="sgis_census_year" id="sgis_census_year_id">
		    			<option value="">= 선택 =</option>
	    		<%
	    			try {

	    				broker = new GeneralBroker("ceaa00");
	    				lData.setString("PARAM", "SIGUNGU_DATA_YEAR");
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
				<a href="#" target="_blank" onclick="javascript:gsks_count_data(); return false;">
                      <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/>
                </a>
                
		<div class="clear"></div>
	  </div>
	<table width="100%" cellpadding="0" cellspacing="0" class="table1" summary=""style="margin-left:10px" >
    <caption>
    사이트관리
    </caption>
    <thead>
      <tr align="center">
        <th class="td_top">구분</th>
        <th class="td_top"><center>대상자료명</center></th>
        <th class="td_top">건수</th>
        <th class="td_top">조회</th>
        
      </tr>
    </thead>
    <tbody>    
      <tr>
		<th rowspan="4" scope="row">통계자료</th>
        <td><center>집계구별 통계(인구)</center></td>
        <td><center id="oa_in">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('oa_in'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>        
      </tr>
	  <tr>
	    <td><center>집계구별 통계(가구)</center></td>
        <td><center id="oa_ga">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('oa_ga'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
	  <tr>
	    <td><center>집계구별 통계(주택)</center></td>
        <td><center id="oa_ho">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('oa_ho'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
	   <tr>
	    <td><center>집계구별 통계(사업체)</center></td>
        <td><center id="oa_cp">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('oa_cp'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
	  
	  
	  <tr >
		<th rowspan="4" scope="row">통계지역경계</th>
        <td><center>센서스용 행정구역경계<br/>(시도,시군구,읍면동)</center></td>
        <td><center id="bnd_sido">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_sido'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      
      <!-- 
	  <tr>
	    <td><center>기초단위구 경계</center></td>
        <td><center>0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:overLap(); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      -->
      
	  <tr>
	    <td><center>도시화지역</center></td>
        <td><center id="bnd_ua">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_ua'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
	  <tr>
	    <td><center>도시권경계</center></td>
        <td><center id="bnd_ma">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_ma'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      <tr>
	    <td><center>집계구경계</center></td>
        <td><center id="bnd_oa">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_oa'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      
      
      
      <tr >
		<th rowspan="6" scope="row">센서스지도</th>
        <td><center>DB설계</center></td>
        <td><center id="db_schema">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('db_schema'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
	  <tr>
	    <td><center>하천</center></td>
        <td><center id="bas_river">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bas_river'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
	  <tr>
	    <td><center>건물</center></td>
        <td><center id="bas_bldg">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bas_bldg'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      <tr>
	    <td><center>도로</center></td>
        <td><center id="bas_road">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bas_road'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      <tr>
	    <td><center>철도</center></td>
        <td><center id="bas_rail">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bas_rail'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      <tr>
	    <td><center>등고</center></td>
        <td><center id="bas_cntr">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bas_cntr'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
	  
    
      
    </tbody>
  </table>

  <div class="clear"></div>

</div>

</body>
</html>			