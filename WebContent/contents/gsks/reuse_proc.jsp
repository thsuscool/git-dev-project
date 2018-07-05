<!-- 2012 03 29 회원 정지 해지 처리  -->
<%@page import="java.util.ArrayList"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.pdf.basis.*"            %>
<%@ page import="sun.misc.BASE64Encoder"              %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	String aT         = lData.getString("aT");
	String sendPage   = "";
	
	
	DbManager dbmgr      = null;
	 RecordModel countSet    = null;
	StringBuffer countQuery = new StringBuffer(1024);
	
	

		if(aT.equals("one")){
			
	   // 일괄 선택시
			
			String memKey = lData.getString("sgis_member_key");
			
			
			try {
				
				dbmgr = new DbManager();	
				countQuery = new StringBuffer(1024);
				countQuery.append("    	update sgis_member_info set sgis_use_che='Y'  where sgis_member_key='"+memKey+"'  \n");
				System.out.println(countQuery);
				dbmgr.prepareStatement(countQuery.toString());
				dbmgr.execute();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgr.close();
			}
			
			
			try {
				
				dbmgr = new DbManager();	
				countQuery = new StringBuffer(1024);
				countQuery.append("    	delete from sgis_reuseform where userkey='"+memKey+"'  \n");
				System.out.println(countQuery);
				dbmgr.prepareStatement(countQuery.toString());
				dbmgr.execute();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgr.close();
			}
			
			
		
			
			
			%>
			<script type="text/javascript">
			alert("해지 되었습니다.");
			location.reload('reuse_list.jsp');
			
			</script>
			<%
			
			
		}else if (aT.equals("all")){
			// 전부 해지 하기
			
			try {
				
				dbmgr = new DbManager();
				countQuery = new StringBuffer(1024);
				countQuery.append("    	select userkey from sgis_reuseform ");
				System.out.println(countQuery);
				dbmgr.prepareStatement(countQuery.toString());
				countSet = dbmgr.select();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgr.close();
			}
			ArrayList<String> userkeyList = new ArrayList<String>();
			while(countSet != null && countSet.next()) {
				userkeyList.add(countSet.get("userkey").toString());
			}
			
			
			//  업데이트 삭제 반복하기
			for(int i=0; i<userkeyList.size(); i++){
				
			String memKey = userkeyList.get(i);   //  배열에서 가져오기 
				
				try {
					
					dbmgr = new DbManager();	
					countQuery = new StringBuffer(1024);
					countQuery.append("    	update sgis_member_info set sgis_use_che='Y'  where sgis_member_key='"+memKey+"'  \n");
					System.out.println(countQuery);
					dbmgr.prepareStatement(countQuery.toString());
					dbmgr.execute();
				} catch( Exception e ) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} finally {
					dbmgr.close();
				}
				
				
				try {
					
					dbmgr = new DbManager();	
					countQuery = new StringBuffer(1024);
					countQuery.append("    	delete from sgis_reuseform where userkey='"+memKey+"'  \n");
					System.out.println(countQuery);
					dbmgr.prepareStatement(countQuery.toString());
					dbmgr.execute();
				} catch( Exception e ) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} finally {
					dbmgr.close();
				}
				
			}
			
			
			
			
			%>
			<script type="text/javascript">
			alert("모두 승인 되었습니다.");
			location.reload('reuse_list.jsp');
			
			</script>
			<%
			
		}else if(aT.equals("STAT")){
			String[] keys = lData.getString("chk").split(",");
			
			for(int i=0; i<keys.length; i++) {
				String memKey = keys[i]; 
				
	try {
					
					dbmgr = new DbManager();	
					countQuery = new StringBuffer(1024);
					countQuery.append("    	update sgis_member_info set sgis_use_che='Y'  where sgis_member_key='"+memKey+"'  \n");
					System.out.println(countQuery);
					dbmgr.prepareStatement(countQuery.toString());
					dbmgr.execute();
				} catch( Exception e ) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} finally {
					dbmgr.close();
				}
				
				
				try {
					
					dbmgr = new DbManager();	
					countQuery = new StringBuffer(1024);
					countQuery.append("    	delete from sgis_reuseform where userkey='"+memKey+"'  \n");
					System.out.println(countQuery);
					dbmgr.prepareStatement(countQuery.toString());
					dbmgr.execute();
				} catch( Exception e ) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} finally {
					dbmgr.close();
				}
				
				
				
				
			}
			
			
			%>
			<script type="text/javascript">
			alert("승인 되었습니다.");
			location.reload('reuse_list.jsp');
			
			</script>
			<%
			
			
		}
		
		
		
		
		
		
		
		
		
	
%>