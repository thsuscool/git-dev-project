<%@ page import="kr.co.offton.jdf.db.RecordModel"%>
<%@ page import="kr.co.offton.jdf.db.DbManager"%>

<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	String member_key          =  session.getAttribute("userkey").toString();
	String main_auth           = null;
	String statistics_auth     = null;
	String msgis_auth          = null;
	String publicmodel_auth    = null;
	String metadata_auth       = null;
	String funnymonth_auth     = null;
	String statbd_auth         = null;
	String openapi_auth        = null;
	String census_auth         = null;
	String admin_manage        = null;
	
	String linkURL                  = null;

	DbManager indexDbmgr           = null;
	RecordModel indexSet    = null;
	StringBuffer indexQuery = new StringBuffer(1024);
	try {
		indexDbmgr = new DbManager();	
		indexQuery = new StringBuffer(1024);
		indexQuery.append(" select                 \n");    
		indexQuery.append(" sgis_main_auth,        \n");
		indexQuery.append(" sgis_statistics_auth,  \n");
		indexQuery.append(" sgis_msgis_auth,       \n");
		indexQuery.append(" sgis_publicmodel_auth, \n");
		indexQuery.append(" sgis_metadata_auth,    \n");
		indexQuery.append(" sgis_funnymonth_auth,  \n");
		indexQuery.append(" sgis_statbd_auth,      \n");
		indexQuery.append(" sgis_openapi_auth,     \n");
		indexQuery.append(" sgis_census_auth,      \n");
		indexQuery.append(" sgis_admin_manage      \n");
		indexQuery.append(" from sgis_auth_manage  \n");	
		indexQuery.append(" where sgis_member_key ='"+member_key+"'; \n");	
		//System.out.println(indexQuery);
		indexDbmgr.prepareStatement(indexQuery.toString());
		indexSet = indexDbmgr.select();
		indexDbmgr.execute();
	} catch( Exception e ) {
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		indexDbmgr.close();
	}
	
	while(indexSet != null && indexSet.next()) {
		main_auth           =   indexSet.get("sgis_main_auth").toString();
    statistics_auth     =   indexSet.get("sgis_statistics_auth").toString();                       
    msgis_auth          =   indexSet.get("sgis_msgis_auth").toString();                      
    publicmodel_auth    =   indexSet.get("sgis_publicmodel_auth").toString();                        
    metadata_auth       =   indexSet.get("sgis_metadata_auth").toString();                        
    funnymonth_auth     =   indexSet.get("sgis_funnymonth_auth").toString();                         
    statbd_auth         =   indexSet.get("sgis_statbd_auth").toString();                         
    admin_manage        =   indexSet.get("sgis_admin_manage").toString();  
    openapi_auth        =   indexSet.get("sgis_openapi_auth").toString();
    census_auth         =   indexSet.get("sgis_census_auth").toString();
	}
	
	if(main_auth.equals("Y")){
		linkURL = "gsks_01_06.jsp";
	}else{
		if(statistics_auth.equals("Y")){
			linkURL = "gsks_blank.jsp?auth=statistics";
		}else{
			if(msgis_auth.equals("Y")){
				linkURL = "gsks_blank.jsp?auth=msgis";
			}else{
				if(publicmodel_auth.equals("Y")){
					linkURL = "gsks_blank.jsp?auth=publicsmodel";
				}else{
					if(metadata_auth.equals("Y")){
						linkURL = "/metadata/";
					}else{
						if(funnymonth_auth.equals("Y")){
							linkURL = "gsks_blank.jsp?auth=funny_month";
						}else{
							if(statbd_auth.equals("Y")){
								linkURL = "gsks_blank.jsp?auth=statbd";
							}else{
								if(openapi_auth.equals("Y")){
									linkURL = "gsks_01_03.jsp";
								}else{
									if(census_auth.equals("Y")){
										linkURL = "gsks_01_04.jsp";
									}else{
										if(admin_manage.equals("Y")){
											linkURL = "gsks_01_06.jsp";
										}else{
											linkURL = "gsks_blank.jsp?auth=non";
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	//System.out.println("[/contents/gsks/index.jsp] linkURL = "+linkURL);
%>

  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>
    
  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">관리자페이지</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a></li>
      </ul>
    </div>
    <div class="content">내용</div>
  </div>
</div>
<div class="clear"></div>
<% response.sendRedirect(linkURL); %>
<%@ include file="/contents/gsks/include/footer.jsp" %>