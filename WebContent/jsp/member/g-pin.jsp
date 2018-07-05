<%@ page language = "java" contentType = "text/html; charset=euc-kr"%>

<%@ page import="gov.mogaha.gpin.sp.proxy.*" %>

<%
    /**
     * �� ���񽺴� ����I-PIN������������ �������Դϴ�.
     * ��������� ����, ����Ʈ����Ȯ�ο�û ���� ��û���񽺿� ���ؼ� ����I-PIN���� ������ �ִ� �������̹Ƿ�
     * 1) ����I-PIN ������â���� ���� ��Ȯ�ϰ� URL�� ��ϵǾ���ϸ�
     * 2) ���񽺿� ���õ� ������ �����Ͻø� �ȵ˴ϴ�.
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
        	out.println("�������� ó���� ������ �߻��߽��ϴ�.:"+e);
        }
        return;
    }
    boolean result = false;

	// ��û�� ����� IP�� ����޴� ����� IP�� ���Ѵ�.
    boolean ipCheck = request.getRemoteAddr().equals(session.getAttribute("gpinUserIP"));
    if (ipCheck)
    {
        try
        {
            result = proxy.parseSAMLResponse(request, session);
        }
        catch(Exception e)
        {
        	out.println("�������� ó���� ������ �߻��߽��ϴ�.:"+e);
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
    // ���� --------------------------------------------------------------------------------
    String retInfo		= "";					        // �������
    String dupInfo		= "";                                                               //�ߺ�Ȯ���ڵ�
    String virtualNo	= "";					       //���� �ĺ���ȣ
    String realName	= "";					       //�̸�
    String sex		= "";					       //����
    String age		= "";					       //����
    String birthDate	= "";					      //�������
    String nationalInfo	= "";					      //����
    String authInfo		= "";                                                              //�����������
   
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
		    	nameInfoReg();	//�Ǹ��������� DB����
		    });
	
		    /*********** G-PIN �Ǹ��������� ���� Start **********/
		    (function() {			
		        $class("sop.portal.gpinnameInfo.api").extend(sop.portal.absAPI).define({
		            onSuccess : function(status, res) {
		            	var result = res.result;
			console.log(result);
		                if(res.errCd == "0") {		                	
		                	//window.opener.gpinnameInfoGet(result.member_key);	//�Ǹ����� ���� ��ȸ
		                	window.opener.location.href = "/html/member/memberJoin.html?type=G&member_key="+result.member_key;	//�Ǹ����� ���� ��ȸ
		                	self.close();
		                } else {
		                	alert(res.errMsg);
		                	self.close();
		                }
		            },
		            onFail : function(status) {
		                alert("�����߻�!!!");
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
		    /*********** �Ǹ��������� ���� End **********/
	    </script>
    </head>
	<body>
	</body>
</html>

	