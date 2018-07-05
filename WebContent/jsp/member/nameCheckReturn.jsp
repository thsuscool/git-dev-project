<%
/**************************************************************************************************************************
* Program Name  : 본인확인 결과 수신 & 회원가입 JSP (Real)  
* File Name     : nameCheckReturn.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2014-08-07
*
**************************************************************************************************************************/
%>
<%@ page  contentType = "text/html;charset=ksc5601"%>
<%@ page import = "java.util.*" %> 
<%
    // 변수 --------------------------------------------------------------------------------
    String retInfo		= "";																// 결과정보

	String name			= "";                                                               //성명
	String sex			= "";																//성별
	String birYMD		= "";																//생년월일
	String fgnGbn		= "";																//내외국인 구분값
	
    String di			= "";																//DI
    String ci1			= "";																//CI
    String ci2			= "";																//CI
    String civersion    = "";                                                               //CI Version
    
    String reqNum		= "";                                                               // 본인확인 요청번호
    String result		= "";                                                               // 본인확인결과 (Y/N)
    String certDate		= "";                                                               // 검증시간
    String certGb		= "";                                                               // 인증수단
	String cellNo		= "";																// 핸드폰 번호
	String cellCorp		= "";																// 이동통신사
	String addVar		= "";


	//복화화용 변수
	String encPara		= "";
	String encMsg		= "";
	String msgChk       = "N";  
	
    //-----------------------------------------------------------------------------------------------------------------

    String reqNumSS = (String)session.getAttribute("reqNum");
    /*
    session.setAttribute("reqNum", null);
    session.setAttribute("approval_policy", null);
    session.setAttribute("approval_policy2", null);
    */
    if(reqNumSS == null) {
%>
		<script language=javascript>
        	alert("비정상적인 접근입니다.");
        	window.opener.location.reload();
        	self.close();
	    </script>
<%
		return;
    }

    try{

        // Parameter 수신 --------------------------------------------------------------------
        retInfo  = request.getParameter("retInfo").trim();
        String pRetInfo = retInfo;
%>
<%
        // 1. 암호화 모듈 (jar) Loading
        com.sci.v2.pcc.secu.SciSecuManager sciSecuMg = new com.sci.v2.pcc.secu.SciSecuManager();
        //쿠키에서 생성한 값을 Key로 생성 한다.
        retInfo  = sciSecuMg.getDec(retInfo, reqNumSS);

        // 2.1차 파싱---------------------------------------------------------------
        String[] aRetInfo1 = retInfo.split("\\^");

		encPara  = aRetInfo1[0];         //암호화된 통합 파라미터
        encMsg   = aRetInfo1[1];    //암호화된 통합 파라미터의 Hash값
		
		String  encMsg2   = sciSecuMg.getMsg(encPara);
			// 3.위/변조 검증 ---------------------------------------------------------------
        if(encMsg2.equals(encMsg)){
            msgChk="Y";
        }

		if(msgChk.equals("N")){
%>
		    <script language=javascript>
            	alert("비정상적인 접근입니다.");
            	window.opener.location.reload();
            	self.close();
		    </script>
<%
			return;
		}

        // 복호화 및 위/변조 검증 ---------------------------------------------------------------
		retInfo  = sciSecuMg.getDec(encPara, reqNumSS);
		
        String[] aRetInfo = retInfo.split("\\^");
        
        name		= aRetInfo[0];
		birYMD		= aRetInfo[1];
        sex			= aRetInfo[2];        
        fgnGbn		= aRetInfo[3];
        di			= aRetInfo[4];
        ci1			= aRetInfo[5];
        ci2			= aRetInfo[6];
        civersion	= aRetInfo[7];
        reqNum		= aRetInfo[8];
        result		= aRetInfo[9];
        certGb		= aRetInfo[10];
		cellNo		= aRetInfo[11];
		cellCorp	= aRetInfo[12];
        certDate	= aRetInfo[13];
		addVar		= aRetInfo[14];
		// 2016.12.02 시큐어코딩 삭제
		
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
	
		    /*********** 실명인증정보 저장 Start **********/
		    (function() {
		        $class("sop.portal.nameInfo.api").extend(sop.portal.absAPI).define({
		            onSuccess : function(status, res) {		            	
		            	var result = res.result;		            	
		                if(res.errCd == "0") {		                	
		                	<%if(addVar.equals("JOIN")){%>
		                	window.opener.location.href = "/html/member/memberJoin.html?type=M&member_key="+result.member_key;	//실명인증 정보 조회	
		                	<%}else{%>
		                	window.opener.nameInfoGet(result.member_key);	//실명인증 정보 조회		                	
		                	<%}%>		                	
		                	//window.opener.location.href = nameInfoGet(result.member_key); //실명인증 정보 조회		                	
		                	self.close();
		                } else {
		                	alert(res.errMsg);
		                	window.opener.location.reload();
		                	self.close();
		                }
		            },
		            onFail : function(status) {
		                alert("에러발생");
		                window.opener.location.reload();
		            	self.close();
		            }
		        });
		    }());
	
		    function nameInfoReg() {
		        var sopPortalNameInfoObj = new sop.portal.nameInfo.api();
		        sopPortalNameInfoObj.addParam("retInfo", "<%=pRetInfo%>");
		        sopPortalNameInfoObj.request({
		            method : "POST",
		            async : true,
		            url : contextPath+"/ServiceAPI/member/nameInfoReg.json"
		        });
		    }
		    /*********** 실명인증정보 저장 End **********/
	    </script>
    </head>
	<body>
	</body>
</html>
<%
        // ----------------------------------------------------------------------------------
    }catch(Exception ex){
    	// 2016.12.02 시큐어코딩 삭제
%>
	    <script language=javascript>
        	alert("오류가 발생했습니다.");
        	window.opener.location.reload();
        	self.close();
	    </script>
<%
    }
%>