<%@ page contentType="text/html;charset=utf-8" %>
<%@	page import="java.sql.*, java.io.*, java.net.*, java.util.*" %>
<%
	
	try{
		String name = request.getParameter("name");
		String tel = request.getParameter("tel");
		String mf = request.getParameter("mf");
		String q1 = "";
		if(request.getParameter("q1")!=null){
			q1 = request.getParameter("q1");
		}
		String q2_name = "";
		if(request.getParameter("q_2_name")!=null){
			q2_name = request.getParameter("q_2_name");
		}
		String q2_contents = "";
		if(request.getParameter("q_2_contents")!=null){
			q2_contents = request.getParameter("q_2_contents");
		}
		String q3 = "";
		if(request.getParameter("q3")!=null){
			q3 = request.getParameter("q3");
		}
		String q4_name = "";
		if(request.getParameter("q_4_name")!=null){
			q4_name = request.getParameter("q_4_name");
		}
		String q4_contents = "";
		if(request.getParameter("q_4_contents")!=null){
			q4_contents = request.getParameter("q_4_contents");
		}
		String q5 = "";
		if(request.getParameter("q5")!=null){
			q5 = request.getParameter("q5");
		}
		String q6 = "";
		if(request.getParameter("q6")!=null){
			q6 = request.getParameter("q6");
		}	
		
		System.out.println("===================================");
		System.out.println("q1 : " + q1);
		System.out.println("q2_name : " + q2_name);
		System.out.println("q2_contents : " + q2_contents);
		System.out.println("q3 : " + q3);
		System.out.println("q4_name : " + q4_name);
		System.out.println("q4_contents : " + q4_contents);
		System.out.println("q5 : " + q5);
		System.out.println("q6 : " + q6);
		System.out.println("===================================");
		
	/*
	 	String sql = "SELECT  count(*)   FROM    mng_auth_ip        WHERE   USER_IP=?";	
	 	Class.forName("kr.co.realtimetech.kairos.jdbc.kairosDriver");
	 	Connection con = DriverManager.getConnection(
            "jdbc:kairos://10.184.95.10:50000/SGISDB;dbmeta=upper","root","sopkairos");
        PreparedStatement pstmt = con.prepareStatement(sql);
       	pstmt.setString(1, accessIP);
       	//pstmt.setString(1, "test");
       	ResultSet rs=pstmt.executeQuery();
        Logger.debug.println(this,"rs" + rs);
        int count=0;
        while(rs.next()) { 
		    int i=1;
		    count = Integer.parseInt(rs.getString(i++));
		    Logger.debug.println(this,"count" + count);
		    
  		} 
  		
  		if (rs!=null) { 
		   try {
		      rs.close();
		   } catch (SQLException e) {
		   }
		}
  
		if(pstmt!=null) {
		   try {
		      pstmt.close();
		   } catch (SQLException e) {
		   }
		}
		  
		if(con!=null) {
		   try {
		      con.close();
		   } catch (SQLException e) {
		   }
		}
        Logger.debug.println(this,rs);	
         Boolean isAccess= true;
	 	if(count== 0){
			response.sendRedirect("/html/common/noAuth.html");
		}
	}
	catch (Exception e) {
			Logger.debug.println(this,e);	
	}
	*/
	String alert = "";
 	if(alert != null) {
            %>
            	<script>alert('다른 위치에서 로그인 하여 로그아웃 되었습니다.');</script>
            <%
    }	} catch (Exception e) {
    }	
%>
