<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.io.FileInputStream"%>				
				
<%
		
		String fileName = (String) request.getParameter("fileName");
		
	//	fileName = new String(fileName.getBytes("8859_1"), "EUC_KR"); //한글 깨짐현상 처리
//		String realPath = "C:/workspace/statsPotal/upload/share/" + fileName;//+"/upload";
		String realPath = "/DATA/docs/statsPotal/upload/share/" + fileName;//+"/upload";

		response.setHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode(fileName, "UTF-8"));
//		response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes(), "UTF-8"));

		FileInputStream fin = new FileInputStream(realPath);
		ServletOutputStream sout = response.getOutputStream();

		byte[] buf = new byte[1024];
		int size = 0;
		while((size = fin.read(buf)) != -1){
			sout.write(buf, 0, size);
		}
		
		fin.close();
		sout.close();
//					return "void";


%>
