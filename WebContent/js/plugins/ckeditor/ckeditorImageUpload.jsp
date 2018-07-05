<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Iterator"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page import="java.io.File, java.util.List, java.io.IOException"%>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="org.apache.http.protocol.HttpContext"%>

<%@page import="java.util.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>upload</title>
</head>
<body>
<%
	boolean isMultipart = ServletFileUpload.isMultipartContent(request);  //multipart로 전송되었는가 체크
	if (isMultipart) {
		// 설정단계
 		File temporaryDir = new File("\\DATA\\tmp\\");  //업로드된 파일의 임시 저장 폴더
 		String realDir = config.getServletContext().getRealPath(request.getParameter("realDir"));  //실제 저장될 파일경로
 		String sFunc = request.getParameter("CKEditorFuncNum");
 		String realUrl = request.getParameter("realUrl");
 		
 		// 디스크 기반의 파일 아이템 팩토리 생성
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(1 * 1024 * 1024);  //최대 메모리 크기		(1메가)
		factory.setRepository(temporaryDir);  // 임시저장폴더 연결

		// 구현단계
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(1 * 1024 * 1024);  //최대 업로드 크기	(1메가)

		List<FileItem> items = new ArrayList();
		try {
			items = upload.parseRequest(request); //이 부분에서 파일이 생성	
		} catch(Exception e) {
%>
			<script type="text/javascript">
				alert("1메가 이하의 이미지만 등록 가능합니다.");
				window.parent.CKEDITOR.tools.callFunction("<%=sFunc%>", "이미지를 다시등록하세요.");
			</script>
<%
			return;
		}
		
		Iterator iter = items.iterator();
		while (iter.hasNext()) {
			FileItem fileItem = (FileItem) iter.next();
			if (fileItem.isFormField()) {  // File 컴포넌트가 아닌 일반 컴포넌트일 경우
				out.println(fileItem.getFieldName() + "=" + fileItem.getString("euc-kr") + "<br/>");
			}else{
				if (fileItem.getSize() > 0) {  //파일이 업로드 되었나 안되었나 체크
					String fieldName = fileItem.getFieldName();
					String fullName = fileItem.getName();
					String originalName = fullName.substring(0,fullName.lastIndexOf("."));
					String extension = fullName.substring(fullName.lastIndexOf(".")+1, fullName.length()).toLowerCase();
					String fileName = originalName + "_" + System.currentTimeMillis() + "." + extension;
					String contentType = fileItem.getContentType();
					boolean isInMemory = fileItem.isInMemory();
					long sizeInBytes = fileItem.getSize();
					
					File f = new File(realDir);
					if(!f.exists()) {
						f.mkdirs();
					}
					
			 		System.out.println("[realDir] : "+ realDir);
			 		System.out.println("[fieldName] : "+ fieldName);
			 		System.out.println("[fileName] : "+ fileName);
			 		System.out.println("[originalName] : "+ originalName);
			 		System.out.println("[extension] : "+ extension);
			 		System.out.println("[contentType] : "+ contentType);
			 		System.out.println("[isInMemory] : "+ isInMemory);
			 		System.out.println("[sizeInBytes] : "+ sizeInBytes);
			 		
			 		try {
			 			File uploadedFile = new File(realDir, fileName);
			 		 	if ((extension.equals("jpg")) || (extension.equals("gif")) || (extension.equals("jpeg")) || (extension.equals("png")) || (extension.equals("bmp"))) {
			 		%>
			 				<script type="text/javascript">
				 				var sFunc = "<%=sFunc%>";
				 				var fileName = "<%=realUrl%>" + "<%=fileName%>";
				 				window.parent.CKEDITOR.tools.callFunction(sFunc, fileName, "완료");
				 			</script>
			 		<%
			 				fileItem.write(uploadedFile);  //실제 디렉토리에 카피
			 			} else {
			 		%>
				 			<script type="text/javascript">
			 					alert("jpg, gif, jpeg, png, bmp 파일만 등록이 가능합니다.");
			 					window.parent.CKEDITOR.tools.callFunction("<%=sFunc%>", "이미지를 다시등록하세요.");
			 				</script>	
					<%
			 			}
			 			fileItem.delete();   //temp폴더의 파일 제거
			 		} catch(IOException ex) {
			 			out.println("error : "+ ex +"<br/>");
			 		}
				}
			}
		}
	} else {
// 		out.println("인코딩 타입이 multipart/form-data 가 아님.");
	}
%>
</body>
</html>