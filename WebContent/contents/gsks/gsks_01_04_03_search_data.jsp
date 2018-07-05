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
	//String sgis_census_data_id1 = lData.getString("sgis_census_data_id");
	
	
	/*
	int resultFlag =  0;

	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "RELOAD_DATA");
		
		//resultFlag = broker.process(Const.P_INS, lData);
						

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
	*/
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
	
	//oa_ga : 통계자료 ==> 가구
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"oa_ga" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#oa_ga').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//oa_ho : 통계자료 ==> 주택
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"oa_ho" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#oa_ho').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//oa_cp : 통계자료 ==> 사업체
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"oa_cp" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#oa_cp').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//=================================================================================================
	
	//bnd_sido : 통계지역경계 ==> 센서스용 행정구역경계(전체)
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bnd_all" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bnd_all').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bnd_sido : 통계지역경계 ==> 센서스용 행정구역경계(시도)
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bnd_sido" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bnd_sido').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bnd_sido : 통계지역경계 ==> 센서스용 행정구역경계(시군구)
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bnd_sigungu" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bnd_sigungu').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bnd_sido : 통계지역경계 ==> 센서스용 행정구역경계(읍면동)
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bnd_dong" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bnd_dong').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bnd_ua : 통계지역경계 ==> 도시화지역
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bnd_ua" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bnd_ua').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bnd_ma : 통계지역경계 ==> 도시권경계
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bnd_ma" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bnd_ma').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bnd_oa : 통계지역경계 ==> 집계구경계
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bnd_oa" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bnd_oa').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//=================================================================================================
	
	//db_schema : 센서스지도 ==> DB설계
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"db_schema" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#db_schema').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bas_river : 센서스지도 ==> 하천
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bas_river" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bas_river').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bas_bldg : 센서스지도 ==> 건물
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bas_bldg" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bas_bldg').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bas_road : 센서스지도 ==> 도로
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bas_road" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bas_road').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bas_rail : 센서스지도 ==> 철도
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bas_rail" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bas_rail').html(data);
		},
		error:function(data) {
			
		}
	});
	
	//bas_cntr : 센서스지도 ==> 등고
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_count_data.jsp",
		data:{"count_what":"bas_cntr" , "sgis_census_year" : $('#sgis_census_year_id').val()  },
		success:function(data){
			jQuery('#bas_cntr').html(data);
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
		<th rowspan="7" scope="row">통계지역경계</th>
        <td><center>센서스용 행정구역경계(전체)</center></td>
        <td><center id="bnd_all">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_all'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      
      <tr>
	    <td><center>센서스용 행정구역경계(시도)</center></td>
        <td><center id="bnd_sido">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_sido'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      <tr>
	    <td><center>센서스용 행정구역경계(시군구)</center></td>
        <td><center id="bnd_sigungu">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_sigungu'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      <tr>
	    <td><center>센서스용 행정구역경계(읍면동)</center></td>
        <td><center id="bnd_dong">0</center></td>
        <td><center><a href="#" target="_blank" onclick="javascript:detail_data('bnd_dong'); return false;">
                       <img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="absmiddle" border=0/></a></center></td>
      </tr>
      
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