<%@ page language = "java" contentType = "text/html; charset=euc-kr"%>

<%@ page import="gov.mogaha.gpin.sp.proxy.*" %>

<%
    /**
     * 이 서비스는 공공I-PIN인증정보수신 페이지입니다.
     * 사용자인증 정보, 사이트가입확인요청 등의 요청서비스에 대해서 공공I-PIN에서 응답을 주는 페이지이므로
     * 1) 공공I-PIN 공무원창구를 통해 정확하게 URL이 등록되어야하며
     * 2) 서비스와 관련된 내용을 수정하시면 안됩니다.
     *
     */
    response.addHeader("Cache-Control", "private");

    GPinProxy proxy = GPinProxy.getInstance(this.getServletConfig().getServletContext());

    String parameter = request.getParameter("versionRequest");
    if(parameter != null && "versionRequest".equals(parameter) )
    {
        try
        {
            out.println(proxy.getSPVersion());
        }
        catch(Exception e)
        {
        	out.println("서버에서 처리중 에러가 발생했습니다.:"+e);
        }
        return;
    }
    boolean result = false;

	// 요청한 사용자 IP와 응답받는 사용자 IP를 비교한다.
    boolean ipCheck = request.getRemoteAddr().equals(session.getAttribute("gpinUserIP"));
    if (ipCheck)
    {
        try
        {
            result = proxy.parseSAMLResponse(request, session);
        }
        catch(Exception e)
        {
        	out.println("서버에서 처리중 에러가 발생했습니다.:"+e);
        }
    }
%>
<%!
    String getSession(HttpSession session, String attrName)
    {
        return session.getAttribute(attrName) != null ? (String)session.getAttribute(attrName) : "";
    }    
%>
<%
    // 변수 --------------------------------------------------------------------------------
    String retInfo		= "";					        // 결과정보
    String dupInfo		= "";                                                               //중복확인코드
    String virtualNo	= "";					       //개인 식별번호
    String realName	= "";					       //이름
    String sex		= "";					       //성별
    String age		= "";					       //나이
    String birthDate	= "";					      //생년월일
    String nationalInfo	= "";					      //국적
    String authInfo		= "";                                                              //본인인증방법
   
   String reqNumSS = (String)session.getAttribute("reqNum");   
   retInfo= (String)getSession(session, "retInfo"); 
   dupInfo = (String)getSession(session, "dupInfo");
   virtualNo= (String)getSession(session, "virtualNo");
   realName= (String)getSession(session, "realName");
   sex= (String)getSession(session, "sex");
   age= (String)getSession(session, "age");
   birthDate= (String)getSession(session, "birthDate");
   nationalInfo= (String)getSession(session, "nationalInfo");
   authInfo= (String)getSession(session, "authInfo");
   
   session.setAttribute("retInfo", dupInfo);
   session.setAttribute("virtualNo", virtualNo);
   session.setAttribute("nm", realName);
   session.setAttribute("realName", realName);
   session.setAttribute("sex", sex);
   session.setAttribute("age", age);
   session.setAttribute("birthDate", birthDate);
   session.setAttribute("nationalInfo", nationalInfo);
   session.setAttribute("authInfo", authInfo);
   session.setAttribute("gender", sex);
   session.setAttribute("birth", birthDate);
%>

<html>
    <head>
        <title></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	     <script type="text/javascript" src="/js/common/includeHead.js"></script>
	    <script src="/js/common/common.js"></script>
	    <script type="text/javascript">
		    $(document).ready(function() {
		    	nameInfoReg();	//실명인증정보 DB저장
		    });
	
		    /*********** G-PIN 실명인증정보 저장 Start **********/
		    (function() {			
		        $class("sop.portal.gpinnameInfo.api").extend(sop.portal.absAPI).define({
		            onSuccess : function(status, res) {
		            	var result = res.result;
			console.log(result);
		                if(res.errCd == "0") {		                	
		                	//window.opener.gpinnameInfoGet(result.member_key);	//실명인증 정보 조회
		                	window.opener.location.href = "/html/member/memberJoin.html?type=G&member_key="+result.member_key;	//실명인증 정보 조회
		                	self.close();
		                } else {
		                	alert(res.errMsg);
		                	self.close();
		                }
		            },
		            onFail : function(status) {
		                alert("에러발생!!!");
		            }
		        });
		    }());
	
		    function nameInfoReg() {
		        var sopPortalNameInfoObj = new sop.portal.gpinnameInfo.api();
		        sopPortalNameInfoObj.request({
		            method : "POST",
		            async : true,
		            url : contextPath+"/ServiceAPI/member/GpinNameInfoReg.json"
		        });
		    }
		    /*********** 실명인증정보 저장 End **********/
	    </script>
    </head>
	<body>
	</body>
</html>

	