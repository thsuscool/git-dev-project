<%@ page import="kr.co.offton.jdf.db.RecordModel"%>
<%@ page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/contents/include/logger.jsp"%>

<%
	int num0=0; 
	int num1=1; 
	int num2=2; 
	int num3=3; 
	int num4=4; 
	int num5=5; 
	int num6=6; 
	int num7=7; 
	int num8=8; 
	int num9=9; 
	
	String left_member_key          =  session.getAttribute("userkey").toString();
	String left_member_id           =  session.getAttribute("userid").toString(); 
	String left_main_auth     = null;
	String left_statistics_auth     = null;
	String left_msgis_auth          = null;
	String left_publicmodel_auth    = null;
	String left_metadata_auth       = null;
	String left_funnymonth_auth     = null;
	String left_statbd_auth         = null;
	String left_openapi_auth         = null;
	String left_census_auth         = null;
	String left_admin_manage        = null;

	DbManager resultDbmgr           = null;
	RecordModel resultSet    = null;
	StringBuffer resultQuery = new StringBuffer(1024);
					
	try {
		//접속 30분 여부 체크
		resultDbmgr = new DbManager();	
		resultQuery = new StringBuffer(1024);
		
		resultQuery.append(" select                 \n");    
		resultQuery.append(" sgis_main_auth,        \n");
		resultQuery.append(" sgis_statistics_auth,  \n");
		resultQuery.append(" sgis_msgis_auth,       \n");
		resultQuery.append(" sgis_publicmodel_auth, \n");
		resultQuery.append(" sgis_metadata_auth,    \n");
		resultQuery.append(" sgis_funnymonth_auth,  \n");
		resultQuery.append(" sgis_statbd_auth,      \n");
		resultQuery.append(" sgis_openapi_auth,     \n");
		resultQuery.append(" sgis_census_auth,      \n");
		resultQuery.append(" sgis_admin_manage      \n");
		resultQuery.append(" from sgis_auth_manage  \n");	
		resultQuery.append(" where sgis_member_key ='"+left_member_key+"'; \n");	
		//System.out.println(resultQuery);
		resultDbmgr.prepareStatement(resultQuery.toString());
		resultSet = resultDbmgr.select();
		resultDbmgr.execute();
	} catch( Exception e ) {
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		resultDbmgr.close();
	}
	
	while(resultSet != null && resultSet.next()) {
		left_main_auth           =   resultSet.get("sgis_main_auth").toString();
    left_statistics_auth     =   resultSet.get("sgis_statistics_auth").toString();                       
    left_msgis_auth          =   resultSet.get("sgis_msgis_auth").toString();                      
    left_publicmodel_auth    =   resultSet.get("sgis_publicmodel_auth").toString();                        
    left_metadata_auth       =   resultSet.get("sgis_metadata_auth").toString();                        
    left_funnymonth_auth     =   resultSet.get("sgis_funnymonth_auth").toString();                         
    left_statbd_auth         =   resultSet.get("sgis_statbd_auth").toString();                         
    left_admin_manage        =   resultSet.get("sgis_admin_manage").toString();  
    left_openapi_auth        =   resultSet.get("sgis_openapi_auth").toString();
    left_census_auth         =   resultSet.get("sgis_census_auth").toString();
	
		/* 
		System.out.println( left_main_auth        );
		System.out.println( left_statistics_auth  );            
		System.out.println( left_msgis_auth       );      
		System.out.println( left_publicmodel_auth );              
		System.out.println( left_metadata_auth    );           
		System.out.println( left_funnymonth_auth  );              
		System.out.println( left_statbd_auth      );          
		System.out.println( left_admin_manage     );  
		System.out.println( left_openapi_auth     );  
		System.out.println( left_census_auth      );  
		*/
	}
%>

<!------------------------left시작---------------------------->
<script type="text/javascript">
function clickEvent(num,checks){
	if(num==1){
		 if(checks=="Y"){
			 window.open('/statistics/admin/index.jsp') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==2){
		 if(checks=="Y"){
			 window.open('/msgis/admin') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==3){
		 if(checks=="Y"){
			 window.open('/publicsmodel/admin/useHistoryList.vw') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==4){
		 if(checks=="Y"){
			 document.location.href('/metadata/') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==5){
		 if(checks=="Y"){
			 window.open('/funny_month/top/monthEleSetList.do') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==6){
		 if(checks=="Y"){
			 window.open('http://211.34.86.29/statbd_up/kosis_tbl_up.vw') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==7){
		 if(checks=="Y"){
			 document.location.href('/contents/gsks/gsks_01.jsp') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==8){
		 if(checks=="Y"){
			 document.location.href('/contents/gsks/gsks_01_03.jsp') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==9){
		 if(checks=="Y"){
			 document.location.href('/contents/gsks/gsks_01_04.jsp') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}else if(num==0){
		 if(checks=="Y"){
			 document.location.href('/contents/gsks/gsks_01_06.jsp') ; 
		 }else{
			 alert("접근 권한이 없습니다.")  ;
		 }
	}
}
</script>

  <div class="admin_left">
    <div><img src="/contents/gsks/images/admin_left_title.gif" alt="관리자 바로가기"></div>
    
    <!-- <div class="left_margin_10 top_margin_10"><a href="/contents/gsks/gsks_01_06.jsp"><img src="/contents/gsks/images/admin_left_menu_1.gif" alt="SGIS유통홈페이지 관리자" border="0"></a></div> -->
    
    <div class="left_margin_10 top_margin_10"><img src="/contents/gsks/images/admin_left_menu_1.gif" alt="SGIS유통홈페이지 관리자" border="0" onclick="javascript:clickEvent(<%=num0%>,'<%=left_main_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_2.gif" alt="통계내비게이터 고도화 관리" border="0" onclick="javascript:clickEvent(<%=num1%>,'<%=left_statistics_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_3.gif" alt="민간서비스모델 관리" border="0" onclick="javascript:clickEvent(<%=num2%>,'<%=left_msgis_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_4.gif" alt="공공서비스모델 관리" border="0"onclick="javascript:clickEvent(<%=num3%>,'<%=left_publicmodel_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_5.gif" alt="통계지리정보 메타데이터 관리" border="0" onclick="javascript:clickEvent(<%=num4%>,'<%=left_metadata_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_6.gif" alt="월간 SGIS 관리" border="0" onclick="javascript:clickEvent(<%=num5%>,'<%=left_funnymonth_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_7.gif" alt="지도로보는 행정구역통계 관리" border="0" onclick="javascript:clickEvent(<%=num6%>,'<%=left_statbd_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_9.gif" alt="OpenAPI인증키 관리" border="0" onclick="javascript:clickEvent(<%=num8%>,'<%=left_openapi_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_10.gif" alt="센서스경계자료제공" border="0" onclick="javascript:clickEvent(<%=num9%>,'<%=left_census_auth%>');"  style="cursor:hand"></div>
    
    <div class="left_menu"><img src="/contents/gsks/images/admin_left_menu_8.gif" alt="관리자 관리" border="0" onclick="javascript:clickEvent(<%=num7%>,'<%=left_admin_manage%>');"   style="cursor:hand"></div>
  </div>
<!------------------------left끝---------------------------->