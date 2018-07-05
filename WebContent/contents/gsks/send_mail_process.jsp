<%@ page language="java" contentType="text/html;charset=utf-8" %>

<%@ page import="java.util.Properties" %>
<%@ page import="javax.mail.*" %>
<%@ page import="javax.mail.internet.*" %>

<%@ page import="kr.co.offton.jdf.db.DbManager"       %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"     %>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>

<%
			String members = lData.get("members");
			DbManager dbmgr = null;
			RecordModel rm = null;
			StringBuffer sb = new StringBuffer(1024);

			try{
				dbmgr = new DbManager();

				sb.append(" SELECT sgis_name,  AESDecrypt(sgis_email,'sgis') as sgis_email                  \n");
				sb.append("       FROM sgis_member_info                       \n");
				sb.append("     WHERE sgis_member_key                       \n");
				sb.append("                     IN ("+members.substring(1)+") \n");

				dbmgr.prepareStatement(sb.toString(), lData);
				rm = dbmgr.select();
			}catch(Exception e){
				out.println(e);
			}finally{
				dbmgr.close();
			}

			//설정
			String host = mail_host;    //SMTP서비스가 설치된 컴터 IP(익명액세스 가능 상태)
			String name = mail_name;
			String from = mail_from;    //보내는 사람.
			
			
			String charType = "euc-kr";

			String subject =  lData.get("subject"); //제목			
			String content = lData.get("content"); //메일내용

			// 메일 호스트 설정.
			Properties props = new Properties(); 
			props.put("mail.smtp.host", host);  
	
			// Session
			Session mailSession = Session.getDefaultInstance(props, null);  

		  while(rm!=null && rm.next()) {

					// MimeMessage 
					MimeMessage message = new MimeMessage(mailSession);

					// 보내는 사람 메일 주소, 이름, 글자체 설정.
					InternetAddress addr = new InternetAddress(from, name, charType);         
					message.setFrom(addr);

					//제목 설정.
					message.setSubject(subject);   

					String to = StringUtil.verify((String)rm.get("sgis_email "));       //받는 사람.
					String sgis_name = StringUtil.verify((String)rm.get("sgis_name "));       //받는 사람.

					// 받는 사람 메일 주소 설정.
					message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));  
					// Multi Part 
					Multipart multipart = new MimeMultipart();         
					// BodyPart Mutil Part  
					BodyPart messageBodyPart = new MimeBodyPart();
					// 메일 내용 설정.
					messageBodyPart.setText(content);     
					multipart.addBodyPart(messageBodyPart);  
					// Multi Part content 
					message.setContent(multipart);
					// 메일 보내기.
		      Transport.send(message);
					// 모든 로직이 끝났음을 알리는 메세지.
					//out.println("Mail Sending OK!!!");
		  }

%>

<script>
		alert('성공적으로 발송되었습니다.');	
		window.close();
</script>