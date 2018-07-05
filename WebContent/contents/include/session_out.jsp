<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ include file="/contents/include/logger.jsp"%>
<%

DbManager dbmgrOut          = null;
RecordModel countSetOut   = null;
StringBuffer countQueryOut = new StringBuffer(1024);
String  userkeyOut = "";
String checkIp = (request.getParameter("UserIp")==null)?request.getRemoteAddr():request.getParameter("UserIp"); // 내 현재 아이피
String selectkey =null;


/* <!-- 접속후 30분이 지났을경우 로그 아웃 과 세션 정보를 종료 시킨다.  30분이 안지났을경우 유지 시킨다.   2012년 03월 26일  SWan --> */
	
		 /////셔션에 정보가 있을경우

		try{
	 userkeyOut=  session.getAttribute("sc_userkey").toString();
		}catch (Exception e){
			 userkeyOut ="";
		}
///////////////////세션에 정보가 없을경우  (접속 아이피의 제일 마지막의 정보 를 가져온다  guest 가 아닐경우 검색)///////
if(userkeyOut.equals("")){
			 dbmgrOut            = null;
			countSetOut    = null;
			countQueryOut = new StringBuffer(1024);
			 try {
					dbmgrOut = new DbManager();
					countQueryOut = new StringBuffer(1024);
					countQueryOut.append("    	select top 1  sgis_member_key as selectkey from SGIS_UNIFIED_COUNT    \n");
					countQueryOut.append("   where sgis_access_user_ip='"+checkIp+"'   order by sgis_access_end_time desc \n");
					System.out.println(countQueryOut);
					dbmgrOut.prepareStatement(countQueryOut.toString());
					countSetOut = dbmgrOut.select();
					//dbmgrOut.execute();
				} catch( Exception e ) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} finally {
					dbmgrOut.close();
				}
				
				while(countSetOut != null && countSetOut.next()) {
					selectkey = countSetOut.get("selectkey").toString();
				}
					//System.out.println(selectkey);
			 ///////////////////////////////////////////
					if(!"guest".equals(selectkey)){
						 
						//======================== selectkey 에서 널포인터 익셉션 발생하므로 일단 주석처리 ================= 20150608
						//userkeyOut = selectkey.toString();
						
						 
					 }
}
///사용자가
	if(!userkeyOut.equals("")){
		dbmgrOut            = null;
		countSetOut    = null;
		countQueryOut = new StringBuffer(1024);
		 try {
				dbmgrOut = new DbManager();
				countQueryOut = new StringBuffer(1024);
				countQueryOut.append("    	select count(*) as countsession from sgis_logTime where logdate  \n");
				countQueryOut.append("    between SYSDATE-30/1440 and SYSDATE and userkey =  '"+userkeyOut+"' \n");
				System.out.println(countQueryOut);
				dbmgrOut.prepareStatement(countQueryOut.toString());
				countSetOut = dbmgrOut.select();
				//dbmgrOut.execute();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgrOut.close();
			}
			String countsession =null;
			while(countSetOut != null && countSetOut.next()) {
				countsession = countSetOut.get("countsession").toString();
				//System.out.println(countsession);
			}
			if(countsession.equals("0")){
				// 30 분 지났을 경우 세션 을 종료 시킨다.
				 %>
				 <script type="text/javascript">
				 alert("로그인 후 30분동안 아무런 행동이 없어서 강제로그아웃되었습니다.\n재로그인 후 이용해 주시기 바랍니다.");
				 parent.location.replace('/contents/include/logout.jsp');  //세션 삭제후 메인 페이지로 이동
				 </script>
				 <%
				 
			}else{
				// 30 분 지나지 않았을 경우 30분 추가 시킨다.
			try {
				dbmgrOut = new DbManager();
				countQueryOut = new StringBuffer(1024);
				countQueryOut.append("    	update sgis_logTime set logdate=SYSDATE where userkey = '"+userkeyOut+"' \n");
				System.out.println(countQueryOut);
				dbmgrOut.prepareStatement(countQueryOut.toString());
				//countSetOut = dbmgrOut.select();
				dbmgrOut.execute();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgrOut.close();
			}
				
			}
	}

	
%>