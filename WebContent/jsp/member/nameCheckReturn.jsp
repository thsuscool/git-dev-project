<%
/**************************************************************************************************************************
* Program Name  : ����Ȯ�� ��� ���� & ȸ������ JSP (Real)  
* File Name     : nameCheckReturn.jsp
* Comment       : 
* History       : ���̹��ý��� �輺�� 2014-08-07
*
**************************************************************************************************************************/
%>
<%@ page  contentType = "text/html;charset=ksc5601"%>
<%@ page import = "java.util.*" %> 
<%
    // ���� --------------------------------------------------------------------------------
    String retInfo		= "";																// �������

	String name			= "";                                                               //����
	String sex			= "";																//����
	String birYMD		= "";																//�������
	String fgnGbn		= "";																//���ܱ��� ���а�
	
    String di			= "";																//DI
    String ci1			= "";																//CI
    String ci2			= "";																//CI
    String civersion    = "";                                                               //CI Version
    
    String reqNum		= "";                                                               // ����Ȯ�� ��û��ȣ
    String result		= "";                                                               // ����Ȯ�ΰ�� (Y/N)
    String certDate		= "";                                                               // �����ð�
    String certGb		= "";                                                               // ��������
	String cellNo		= "";																// �ڵ��� ��ȣ
	String cellCorp		= "";																// �̵���Ż�
	String addVar		= "";


	//��ȭȭ�� ����
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
        	alert("���������� �����Դϴ�.");
        	window.opener.location.reload();
        	self.close();
	    </script>
<%
		return;
    }

    try{

        // Parameter ���� --------------------------------------------------------------------
        retInfo  = request.getParameter("retInfo").trim();
        String pRetInfo = retInfo;
%>
<%
        // 1. ��ȣȭ ��� (jar) Loading
        com.sci.v2.pcc.secu.SciSecuManager sciSecuMg = new com.sci.v2.pcc.secu.SciSecuManager();
        //��Ű���� ������ ���� Key�� ���� �Ѵ�.
        retInfo  = sciSecuMg.getDec(retInfo, reqNumSS);

        // 2.1�� �Ľ�---------------------------------------------------------------
        String[] aRetInfo1 = retInfo.split("\\^");

		encPara  = aRetInfo1[0];         //��ȣȭ�� ���� �Ķ����
        encMsg   = aRetInfo1[1];    //��ȣȭ�� ���� �Ķ������ Hash��
		
		String  encMsg2   = sciSecuMg.getMsg(encPara);
			// 3.��/���� ���� ---------------------------------------------------------------
        if(encMsg2.equals(encMsg)){
            msgChk="Y";
        }

		if(msgChk.equals("N")){
%>
		    <script language=javascript>
            	alert("���������� �����Դϴ�.");
            	window.opener.location.reload();
            	self.close();
		    </script>
<%
			return;
		}

        // ��ȣȭ �� ��/���� ���� ---------------------------------------------------------------
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
		// 2016.12.02 ��ť���ڵ� ����
		
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
	
		    /*********** �Ǹ��������� ���� Start **********/
		    (function() {
		        $class("sop.portal.nameInfo.api").extend(sop.portal.absAPI).define({
		            onSuccess : function(status, res) {		            	
		            	var result = res.result;		            	
		                if(res.errCd == "0") {		                	
		                	<%if(addVar.equals("JOIN")){%>
		                	window.opener.location.href = "/html/member/memberJoin.html?type=M&member_key="+result.member_key;	//�Ǹ����� ���� ��ȸ	
		                	<%}else{%>
		                	window.opener.nameInfoGet(result.member_key);	//�Ǹ����� ���� ��ȸ		                	
		                	<%}%>		                	
		                	//window.opener.location.href = nameInfoGet(result.member_key); //�Ǹ����� ���� ��ȸ		                	
		                	self.close();
		                } else {
		                	alert(res.errMsg);
		                	window.opener.location.reload();
		                	self.close();
		                }
		            },
		            onFail : function(status) {
		                alert("�����߻�");
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
		    /*********** �Ǹ��������� ���� End **********/
	    </script>
    </head>
	<body>
	</body>
</html>
<%
        // ----------------------------------------------------------------------------------
    }catch(Exception ex){
    	// 2016.12.02 ��ť���ڵ� ����
%>
	    <script language=javascript>
        	alert("������ �߻��߽��ϴ�.");
        	window.opener.location.reload();
        	self.close();
	    </script>
<%
    }
%>