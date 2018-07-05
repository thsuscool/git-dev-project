<%--
/*********************************************************
 * @source      : gsks_01_02_process2.jsp
 * @description : 관리자 - 지식관리 
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008-11-12   김민수                 상세보기
 *********************************************************
--%>
<%@ page import="kr.co.offton.jdf.db.*" %>
<%@ page import="kr.co.offton.pdf.basis.*"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%
		String aT = lData.get("aT");
		int rtn = 0;

		String sgis_know_seq = lData.getString("sgis_know_seq");
		String sgis_member_key  = lData.getString("sgis_member_key");
		String sgis_know_service_code  = lData.getString("sgis_know_service_code");
		String sucessUrl =  "gsks_01_02_02.jsp?sgis_know_seq="+sgis_know_seq+"&sgis_member_key="+sgis_member_key+"&sgis_know_service_code="+sgis_know_service_code;
		String rtnUrl = "gsks_01_02.jsp";
		
		GeneralBroker seaaBroker = null;
		GeneralBroker myaaBroker = null;

		try{
			seaaBroker = new GeneralBroker("seaa00");    //댓글 추가,삭제
			myaaBroker = new GeneralBroker("myaa00");  //지식정보 수정,삭제

			lData.set("sc_userkey", sc_userkey);  //로그인한 사용자
			lData.set("sql", aT);

			if(aT.equals("cmtins")){  //덧글등록
				
				rtn = seaaBroker.process(Const.P_INS, lData);
				if(rtn > 0) rtnUrl = sucessUrl;

			}else if(aT.equals("cmtdel")){  //덧글삭제
				
				rtn = seaaBroker.process(Const.P_DEL, lData);
				if(rtn > 0) rtnUrl = sucessUrl;

			}else if(aT.equals("dovalue")){  //평가하기
				
				rtn = seaaBroker.process(Const.P_INS, lData);
				if(rtn > 0) rtnUrl = sucessUrl;
			
			}else  if(aT.equals("del")){   //지식삭제
				
				rtn = myaaBroker.process(Const.P_DEL, lData);
				if(rtn > 0) rtnUrl = rtnUrl;

			}else  if(aT.equals("public")){ //공개여부 변경

				rtn = seaaBroker.process(Const.P_INS, lData);
				if(rtn > 0) rtnUrl = rtnUrl;

			}

			response.sendRedirect(rtnUrl); //성공인경우

		}catch (Exception e){
			System.out.println(e);
			response.sendRedirect(rtnUrl); //실패인경우
		}
%>