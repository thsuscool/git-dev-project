<%@ page import="kr.co.offton.jdf.db.*" %>
<%@ page import="kr.co.offton.pdf.basis.*"%>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%

		String aT = "";
		String rtnUrl = "gsks_01_02.jsp";
		String sucessUrl =  "";
		int rtn = 0;
		
		String sgis_know_seq = "";
		String sgis_member_key  = "";
		String sgis_know_service_code  = "";

		String savePath = sc_filePath + "/know";			//���� 'ġ
		int sizeLimit   = fileSizeLimit * 10;	//50M
		String formName = "";
		String fileName = "";

		StringBuffer sb = new StringBuffer(1024);

		GeneralBroker myaaBroker = null;

		try{
			myaaBroker = new GeneralBroker("myaa00");  //���d�� ���,��d,��f

			MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
			Enumeration formNames  = multi.getFileNames();
			
			try{
				formName = (String)formNames.nextElement();														//file tag��
				fileName = multi.getFilesystemName(formName);													//file tag���� file��
			}catch(Exception e){
			}

		  aT = multi.getParameter("aT");

		  sgis_know_seq = multi.getParameter("sgis_know_seq");
		  sgis_member_key  = multi.getParameter("sgis_member_key");
		  sgis_know_service_code  = multi.getParameter("sgis_know_service_code");

			String sgis_know_file_name = "";
			String sgis_know_file_type = "";

			if(fileName!=null && fileName.indexOf(".") > -1){
				sgis_know_file_name = fileName;
				sgis_know_file_type = "";//fileName.substring( fileName.indexOf(".")+1, fileName.length() );
			}

			lData.set("sc_userkey",sc_userkey);
			lData.set("sgis_know_seq",multi.getParameter("sgis_know_seq"));
			lData.set("sgis_know_service_code",multi.getParameter("sgis_know_service_code"));
			lData.set("sgis_know_file_name",sgis_know_file_name);
			lData.set("sgis_know_file_type",sgis_know_file_type);		
			lData.set("sgis_know_url",multi.getParameter("sgis_know_url"));
			lData.set("sgis_know_title",multi.getParameter("sgis_know_title"));
			lData.set("sgis_know_desc",multi.getParameter("sgis_know_desc"));

		  if(aT.equals("ins")){  //��ĵ��

				lData.set("sql","knowins"); 
				
				rtn = myaaBroker.process(Const.P_INS, lData);
				if(rtn > 0) 
					sucessUrl =  "gsks_01_02.jsp";

			}else if(aT.equals("upd")){  //��ļ�d
				
				rtn = myaaBroker.process(Const.P_UPD, lData);

				if(rtn > 0) 
					sucessUrl =  "gsks_01_02_02.jsp?sgis_know_seq="+sgis_know_seq+"&sgis_member_key="+sgis_member_key+"&sgis_know_service_code="+sgis_know_service_code;
			}

			response.sendRedirect(sucessUrl); //�����ΰ��

		}catch(Exception e){
		
		System.out.println("------------------->"+e);
		//	response.sendRedirect(rtnUrl); //�����ΰ��
		}

%>