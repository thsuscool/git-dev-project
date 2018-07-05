<%--
/*
    ********************************************************************
    * @source      : shortcut_06.03.jsp
    * @description : SGIS 소개-API키 이용신청
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------   
    *      
    * 2014-09-11 		이경현						디자인시각화      
    ********************************************************************
 */
--%>  
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
  String leftMenu="shortcut";
  if(loginYn.equals("N")) {
	out.print("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
	out.print("<html xmlns='http://www.w3.org/1999/xhtml'>");
	out.print("<head>");
	out.print("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
	out.print("<title>S-Open API키 이용신청:통계지리 정보서비스</title>");
	out.print("</head>");
	out.print("<body>");
    out.print("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); history.back(); </script> ");
	
  } else {

  GeneralBroker broker = null;
  RecordModel rm = null;

  String api_title = "";
  String api_e_mail = "";
  String api_first_e_mail = "";
  String api_last_e_mail = "";
  String api_use_org = "";
  String api_version = "";
  String api_use_name = "";
  String api_tel = "";
  String api_tel1 = "";
  String api_tel2 = "";
  String api_tel3 = "";
  String api_esti_user_count = "";
  String api_server_ip = "http://";
  String api_file = "";
  String api_use_reason = "";
  String api_approve_status = "";
  String api_agree = "";
  String api_use_agree ="";
  if(lData.getString("aT").equals("RET")) {

    try {

      broker = new GeneralBroker("apaa00");
      lData.setString("PARAM", "API_APPLY_INFO");
      rm = broker.getList(lData);

      if(rm != null && rm.next()) {
        api_title = StringUtil.verify((String)rm.get("api_title"));
        api_e_mail = StringUtil.verify((String)rm.get("api_e_mail"));
        api_use_org = StringUtil.verify((String)rm.get("api_use_org"));
        api_version = StringUtil.verify((String)rm.get("api_version"));
        api_use_name = StringUtil.verify((String)rm.get("api_use_name"));
        api_tel = StringUtil.verify((String)rm.get("api_tel"));
        api_esti_user_count = String.valueOf((BigDecimal)rm.get("api_esti_user_count"));
        api_server_ip = StringUtil.verify((String)rm.get("api_server_ip"));
        api_file = StringUtil.verify((String)rm.get("api_file"));
        api_use_reason = StringUtil.verify((String)rm.get("api_use_reason"));
        api_approve_status = String.valueOf((Character)rm.get("api_approve_status"));
        api_agree = String.valueOf((Character)rm.get("api_agree"));
        api_use_agree = String.valueOf((Character)rm.get("api_use_agree"));
        if(api_e_mail.indexOf("@") != -1) {
          api_first_e_mail = api_e_mail.substring(0, api_e_mail.indexOf("@"));
          api_last_e_mail = api_e_mail.substring(api_e_mail.indexOf("@")+1);
        }

        if(api_tel.indexOf("-") != -1) {
          int t1=api_tel.indexOf("-");
          api_tel1 = api_tel.substring(0, t1);
          int t2=api_tel.indexOf("-", t1+1);
          api_tel2 = api_tel.substring(t1+1, t2);
          api_tel3 = api_tel.substring(t2+1);
        }
      }

    } catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    }
  }

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" /><!-- 전화번호 자동 링크 생성 방지 --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
		<link rel="stylesheet" href="/contents/css/2014_css/css/default.css" />   
		<script type="text/javascript" src="/contents/css/2014_css/js/jquery-1.11.0.min.js"></script> 
		<script type="text/javascript" src="/contents/css/2014_css/js/default.js"></script> 
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/stringUtil.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
			
	
	<script type="text/javascript" language="javascript">
	//<![CDATA[
	function MM_showHideLayers() { //v9.0
		  var i,p,v,obj,args=MM_showHideLayers.arguments;
		  for (i=0; i<(args.length-2); i+=3)
		  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
		    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
		    obj.visibility=v; }
		}
		//특수문자처리
		function inputCheckSpecial(strobj){
		  re = /[~!@\#$%^&*\()\-=+_']/gi;
		  if(re.test(strobj)){
		    return false;
		  }
		  return true;
		}

		function applyClicked() {
		  var fm=document.apiFm;
		  var loginYn = "<%=loginYn%>";
		  var email = fm.api_email1.value.trim() + "@" + fm.api_email2.value.trim();

		  if(loginYn == "Y") {	//로그인 여부
		    if(!fm.agree.checked) {
		      alert("약관에 동의 하셔야 합니다.");
		      return false;
		    } else if(fm.api_use_org.value == "") {
		      alert("사용처를 선택하세요.");
		      return false;
		    } else if(fm.api_use_name.value.trim() == "") {
		      alert("담당자명을 입력하세요.");
		      return false;
		    } else if(fm.api_title.value.trim() == "") {
		      alert("시스템명을 입력하세요.");
		      return false;
		    } else if(fm.api_email1.value.trim() == "" || fm.api_email2.value.trim() == "") {
		      alert("이메일을 입력하세요.");
		      return false;
		    } else if(!email.isEmail()) {
		      alert("이메일 형식에 맞지 않습니다. 이메일을 다시 확인하세요.");
		      return false;
		    } else if(fm.api_tel1.value.trim() == "" || fm.api_tel2.value.trim() == "" || fm.api_tel3.value.trim() == "") {
		      alert("연락처를 입력하세요.");
		      return false;
		    } else if(fm.api_esti_user_count.value.trim() == "") {
		      alert("예상 사용자수를 입력하세요.");
		      return false;
		    } else if(fm.api_server_ip.value.trim() == "") {
		      alert("사용 서버 URL(IP)를  입력하세요.");
		      return false;
		    /*}else if(fm.api_server_ip.value.indexOf(".") == -1) {
		      alert("사용 서버 URL(IP)가 형식에 맞지 않습니다.  다시 확인하세요.");
		      return;
		    */} else if(!isUrl(fm.api_server_ip.value) && !isValidIPAddress(fm.api_server_ip.value)) {
		      alert("사용 서버 URL(IP)가 형식에 맞지 않습니다.  다시 확인하세요.");
		      return false;
		    } else if(fm.api_use_reason.value.trim() == "") {
		      alert("사용용도를  입력하세요.");
		      return false;
		    } else if(getLength(fm.api_use_reason.value) > 500) {
		        alert("입력가능한 글자수는 한글 250자, 영문 500자로 제한되어 있습니다.");
		      return false;   	  
		    } else if(fm.api_server_ip.value.length > 50){
		      	alert("사용 서버 URL이 너무 깁니다. 간략하게 기록해주세요 50자 이내 ");
		        return false;
		    } else {
				
		       //파일 확장자 필터링
		      var extend = true;
		     /*  if(fm.api_file.value.trim() != "") {
		        extend = fileExtendFilter(fm.api_file.value);
		      } 
		 */
		      if(extend == true) {
		    	 
		        if(fm.aT.value == "RET") {
		          if(!confirm("수정하시겠습니까?"))	return false;
		          fm.aT.value = "UPD";
		          fm.action="/contents/shortcut/shortcut_06_03_apply.jsp";
		          fm.submit();
		        } else {
		          if(!confirm("신청하시겠습니까?"))	return false;
		          fm.aT.value = "INS";
		          fm.action="/contents/shortcut/shortcut_06_03_apply.jsp";
		          fm.submit();
		        }
		      }

		    }
		  } else {
		    alert("로그인을 하십시오.");
		  }

		}

		function chkNumber() {
		  if(document.apiFm.api_esti_user_count.value != "" && !document.apiFm.api_esti_user_count.value.isInteger()) {
		    alert("숫자만 입력가능합니다.");
		    document.apiFm.api_esti_user_count.value="";
		    return false;
		  }
		}

		function chkNumber2() {
		  var fm=document.apiFm;

		  if(fm.api_tel1.value != "" && !Number(fm.api_tel1.value) && fm.api_tel1.value != 0) {
		    alert("숫자만 입력가능합니다.");
		    fm.api_tel1.value="";
		    return false;
		  } else if(fm.api_tel2.value != "" &&  !Number(fm.api_tel2.value) && fm.api_tel2.value != 0) {
		    alert("숫자만 입력가능합니다.");
		    fm.api_tel2.value="";
		    return false;
		  } else if(fm.api_tel3.value != "" &&  !Number(fm.api_tel3.value) && fm.api_tel3.value != 0) {
		    alert("숫자만 입력가능합니다.");
		    fm.api_tel3.value="";
		    return false;
		  }
		}

		/**
		 * @desc  url 유효성 체크
		 */
		function isUrl(s) {
		  //var regexp = /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z:]{3}/;
		  var regexp = /http:\/\/([\w=-]+\.)+/g;
		  return regexp.test(s)
		}

		/**
		 * @desc  ip 유효성 체크
		 */
		function isValidIPAddress(ipaddr) {
			//var re = /http:\/\/[0-9]{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
			var re = /http:\/\/[0-9]{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
			if (re.test(ipaddr)) {
			   var str = ipaddr.split("//");
			   var str1 = str[1].split("/");
			   var str2 = str1[0].split(":");
			   var parts = str2[0].split(".");
			   if (parseInt(parseFloat(parts[0])) == 0) { return false; }
			   for (var i=0; i<parts.length; i++) {
			      if (parseInt(parseFloat(parts[i])) > 255) { return false; }
			   }
			   return true;
			} else {
			   return false;
			}
		}

		function api_list() {
		  window.location.replace("shortcut_06_03_01.jsp");
		}

		function cancelClicked() {
		  var fm=document.apiFm;
		  var c = confirm("API키 이용신청을 취소하시겠습니까?");
		  if(c == 1) {
		    fm.aT.value = "DEL";
		    fm.action="shortcut_06_03_apply.jsp";
		    fm.submit();
		  }
		}

		function len_chk3(len){
		  var fm=document.apiFm.api_use_reason;

		    if(getLength(fm.value) > len ){
		       alert("입력가능한 글자수는 한글 "+len/2+"자, 영문 " +len+ "자로 제한되어 있습니다.")
		       fm.value = fm.value.substring(0, len / 2);
		       fm.focus();
		    }
		}
	//]]>
	</script>
	</head>

	<body>
		<div class="wrapper">
			<!-- cls:header start -->
			<div class="header"> 
			<!-- top -->
		  	<%@include file="/contents/include/header_2014.jsp" %>		<!-- 헤어 영역 -->
		  	<!-- /top -->			
  			</div><!-- cls:header end -->


			<!-- cls:contents start -->
			<div class="contents subbg">
				<div class="container">
					<div class="lnb">
						<%@include file="/contents/include/leftMenu_2014.jsp" %>
						<script type="text/javascript">
							$("#l05").attr("style", "display:block");		//left Menu에서 참여바당 부분 보여줌.
							$("#l052").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0523").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
	<div class="acticle">
			
			<!-- API키 이용신청 -->
			<div class="location">
				<p><span class="on">API Key 이용신청 </span> &lt;  <span>S-Open API</span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">API Key 이용신청 </p>
				<p class="txt02">통계지리정보서비스의 새로운 소식을 빠르게 전해 드립니다.</p>
			</div>
			   <form name="apiFm" method="post" enctype="multipart/form-data" action="/contents/shortcut/shortcut_06_03_apply.jsp">
			      <input type="hidden" name="aT" value="<%=lData.getString("aT") %>"/>
			      <input type="hidden" name="api_auth_key" value="<%=lData.getString("api_auth_key") %>"/>

			<div class="use_wrap">	
				<div class="listTitle02">S-Open API 이용약관(안)</div>
					<div class="joinWarp">
						<div class="join">
							<h5>제 1 조 [목적]</h5>
							<p>이 이용약관(이하 '약관'이라 합니다)은 통계청(이하 '기관'이라 합니다)과 이용 고객(이하 ‘회원’이라 합니다) 간에 통계청이 제공하는 S-Open API 서비스(이하 ‘API 서비스”라 합니다)의 이용에 관한 제반 사항과 기타 필요한 사항을 규정함을 목적으로 합니다. 
							</p>
							<h5>제 2 조 [용어의 정의]</h5>
							<p>① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
									가. 회원이라 함은 이 약관에 동의한 후 API 서비스를 제공받는 자를 말합니다.
									나. API라 함은 Application Programing Interface의 약자로서 회원이 자유롭게 통계청
									 서비스의 검색결과를 자신이 구축한 사이트에서 사용할 수 있도록 통계청이 제공하는 등록 값의 집합을 말합니다. 다. API 서비스라 함은 회원이 자발적인 참여를 통해 자유롭게 정보를 공유하고 창조적인 서비스를 생산할 수 있도록 돕기 위하여 통계청이 API를 제공하고 운영하는 것을 말합니다. 라. 인증Key라 함은 통계청의 관련 시스템이 API 서비스 이용 허가를 받은 회원임을 식별할 수 있 도록 통계청이 회원별로 할당하는 고유한 값을 말합니다. 
							</p>
							<h5>제3조 [이용약관의 효력 및 변경]</h5>
							<p>① 본 이용약관은 서비스의 이용을 위하여 회원이 동의를 함으로써 효력을 발생하며, 통계청은 합리적인 사유가 발생할 경우 이를 개정할 수 있으며 약관 개정 시에는 사전에 공지합니다.
							② 개정된 약관은 당 사이트를 통하여 공지함으로써 효력을 발휘하며, 회원은 주기적으로 공지사항을 확인하여야 할 의무가 있습니다. 회원이 약관의 변경 사실을 확인하지 못하여 발생한 모든 손해에 대한 책임은 회원에게 귀속됩니다.
							</p>
							<h5>제4조 [서비스의 제공 및 이용]</h5>
							<p>① 회원은 서비스를 이용함에 있어 로그인을 한 후, 서비스를 이용하기 위해서는 담당자이름, 연락처, 시스템정보 등 해당 입력정보를 등록하고, 약관에 동의한 후 발급받은 키(KEY, 이하 ‘키’라 합니다)를 사용하여 서비스를 이용할 수 있습니다. 키는 발급받은 자만이 이용할 수 있으며, 타인과 공유할 수 없습니다.
							② 하나의 인증(KEY)당 1일(매일 0시~24시) 50,000회 이하의 요청으로 제한하며, 이를 초과할 경우 서비스가 중지될 수 있습니다.
							③ 통계청 시스템에 과부하를 유도하는 방법 등에 의한 사용 시 서비스를 중지할 수 있습니다.
							④ 위의 서비스 이용사항을 준수하지 않은 경우 해당 서비스 중지 및 회원 자격상실 등의 불이익을 받을 수 있습니다.
							</p>
							<h5>제5조[서비스 이용 시간]</h5>
							<p>① 서비스 이용은 통계청의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니다. 단, 통계청의 시스템작업(점검, 증설, 교체 등)을 위해 통계청이 정한 일자나 시간에 서비스를 일시 중단할 수 있으며, 예정되어 있는 작업으로 인한 서비스 일시 중단은 당 사이트를 통해 사전에 공지합니다.
							② 통계청은 긴급한 시스템 점검, 증설 및 교체 등 부득이한 사유로 인하여 예고 없이 일시적으로 서비스를 중단할 수 있으며, 새로운 서비스로의 교체 등 통계청이 적절하다고 판단하는 사유에 의하여 현재 제공되는 서비스를 완전히 중단하거나 변경할 수 있습니다.
							③ 통계청은 국가비상사태, 정전, 시스템 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능할 경우, 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다. 다만 이 경우 그 사유 및 기간 등을 회원에게 사전 또는 사후에 공지합니다.
							④ 통계청은 통계청이 통제할 수 없는 사유로 인한 서비스 중단의 경우에는 통지하지 않습니다.
							⑤ 통계청은 서비스를 특정범위로 분할하여 각 범위 별로 이용가능시간을 별도로 지정할 수 있습니다. 다만 이 경우 그 내용을 공지합니다.
							</p>
							<h5>제6조 [통계청의 의무]</h5>
							<p>
							① 통계청은 본 약관에 동의한 회원에게 무상으로 서비스를 사용할 수 있는 KEY와 사용권을 부여합니다.
							② 통계청은 계속적이고 안정적인 서비스 제공을 위하여 설비에 장애가 생기거나 관련 자료가 멸실된 경우에는 부득이한 사유가 없는 한 지체 없이 이를 수리 또는 복구합니다.
							③ 통계청은 회원으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우는 회원에게 그 사유와 처리일정을 통보하여야 합니다.
							④ 통계청은 개인정보 보호정책을 공시하고 준수합니다.
							</p>
							<h5>제7조 [회원의 의무]</h5>
							<p>
							① 회원은 본 약관에서 규정하는 사항과 기타 통계청이 정한 제반 규정, 공지사항 및 관계법령을 준수하여야 하며, 기타 통계청의 업무에 방해가 되는 행위, 통계청의 명예를 손상시키는 행위를 해서는 안됩니다.
							② 회원은 담당자, 연락처, 시스템정보 등 Key 발급 등록항목이 변경된 경우에 해당 절차를 거쳐 이를 통계청에 즉시 알려야 합니다.
							③ 회원에게 발급된 인증 Key의 관리소홀 또는 부정사항에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다.
							④ 회원은 통계청의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며, 그 영업활동의 결과에 대해 통계청은 책임을 지지 않습니다. 또한 회원은 이와 같은 영업활동으로 통계청 손해를 입은 경우 통계청에 대해 손해배상의무를 지며, 통계청은 해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다.
							⑤ 회원은 통계청의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여할 수 없으며 이를 담보로 제공할 수 없습니다.
							⑥ 회원은 통계청 및 제 3자의 지적 재산권을 침해해서는 안됩니다.
							⑦ 회원은 다음 각 호에 해당하는 행위를 하여서는 안되며, 해당 행위를 하는 경우에 통계청 회원의 서비스 이용제한 및 적법 조치를 포함한 필요 조치를 취할 수 있습니다.
							- 타인의 ID, 비밀번호, 주민등록번호 등을 도용하는 행위
							- 회원 ID를 타인과 거래하는 행위
							- 통계청의 운영진, 직원 또는 관계자를 사칭하는 행위
							- 통계청으로부터 특별한 권리를 부여 받지 않고 통계청의 소프트웨어를 변경하거나, 통계청의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위
							- 서비스에 위해를 가하거나 고의로 방해하는 행위
							- 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위
							- 통계청의 승인을 받지 않고 다른 회원의 개인정보를 수집 또는 저장하는 행위
							- 범죄와 결부된다고 객관적으로 판단되는 행위
							- 본 약관을 포함하여 기타 통계청이 정한 제반 규정 또는 이용 조건을 위반하는 행위
							- 기타 관계법령에 위배되는 행위
							⑧ 회원의 행위에 대한 모든 책임은 회원이 부담하며, 회원은 통계청을 대리하는 것으로 오해가 될 수 있는 행위를 해서는 안됩니다.
							</p>
							<h5>제8조 [서비스 저작권]</h5>
							<p>
							① 통계청의 서비스를 이용해 회원이 제작한 응용프로그램의 저작권은 회원에게 귀속합니다.
							② 통계청이 제공하는 서비스의 저작권은 통계청에게 있으며, 통계청 사정에 따라 서비스 제공을 중지/변경 할 수도 있습니다. 
							</p>
							<h5>제9조 [책임의 제한]</h5>
							<p>
							① 통계청은 서비스 가이드에 어긋나는 활용으로 인한 검색결과 개별 게시물 저작자에 대한 피해에 책임을 지지 않습니다.
							② 통계청은 서비스의 사용 및 사용불능으로 인하여 회원에게 발생한 손해에 대하여 일체 책임을 지지 아니합니다.
							③ 통계청은 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.
							④ 통계청은 회원 상호간 및 회원과 제 3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다. 
							</p>
							<h5>제10조 [회원자격 박탈 및 손해배상]</h5>
							<p>
							① 통계청은 회원이 이용약관을 준수하지 않는 경우 서비스 사용 중지 및 회원자격을 박탈할 수 있습니다.
							② 회원에 의하여 통계청에 손해가 발생한 경우 통계청은 사용권 계약의 해지와는 별도로 회원에게 손해배상을 청구할 수 있습니다.
							</p>
							<h5>&lt;부칙&gt;</h5>
							<p>
							(시행일) 본 약관은 2009년 02월 01일부터 적용됩니다. 
							</p>
						</div>
						<div class="rad_input">
							<input type="checkbox" name="agree" id="agree" <%if(api_agree.equals("Y")) {%>checked="checked"<%} %>/> 위 약관에 동의합니다
						</div>
					</div>
					<div class="listTab"><span class="listTab_font01"><a href="/contents/shortcut/shortcut_06_03.jsp">API키 이용신청</a></span><span class="listTab_font02"><a href="shortcut_06_03_01.jsp">신청내역</a></span>	</div>
					<div class="listTitle02">API키 발급 필수 항목</div>
					<div class="identificationListFont"><span class="identificationListFonts">*</span>필수 입력항목입니다.</div>
					<table class="useTable" summary="Q&amp;A">
						<caption>API키 이용신청</caption>
						<colgroup>
							<col width="120"/>
							<col width=""/> 
						</colgroup>
						<tbody>
						<tr>
							<th scope="row">아이디<span class="identificationListFonts">*</span></th>
							<td class="bnr4">								
								<select name="api_use_org" id="api_use_org" class="input_use08" >
										<option>=선택=</option>
										<option value="개인" <%if(api_use_org.equals("개인")) {%>selected="selected"<%} %>>개인</option>
										<option value="기관" <%if(api_use_org.equals("기관")) {%>selected="selected"<%} %>>기관</option>										
								</select>								
							</td>
						</tr> 
						<tr style="display:none";>
							<th scope="row" style="display:none;">Version<span class="identificationListFonts">*</span></th>
							<td class="bnr4" style="display:none;">
								        <select  name="api_version" id="api_version" class="w100"  title="Version ">
					                      <option value="2.1" <%if(api_version.equals("1.0")) {%>selected="selected"<%} %>>1.0</option>
					                    </select>
							</td>
						</tr>						
						<tr>
							<th scope="row">담당자명<span class="identificationListFonts">*</span></th>
<%
    if(lData.getString("aT").equals("RET")) {
        sc_username = api_use_name;
    }
%>							
							<td class="bnr4">
								<input type="text" name="api_use_name" id="api_use_name" title="담당자명" value="<%=sc_username %>" class="input_use03" />
							</td>
						</tr>						
						<tr>
							<th scope="row">시스템명<span class="identificationListFonts">*</span></th>
							<td class="bnr4">
								<input type="text" name="api_title"  id="api_title"  title="시스템명" value="<%=api_title %>" class="input_use03" />
							</td>
						</tr>
						<tr>
							<th scope="row">E-mail <span class="identificationListFonts">*</span></th>
							<td class="bnr4">
								<input type="text" name="api_email1" id="api_email1"  value="<%=api_first_e_mail %>" title="이메일 계정"  class="input_use03" />
								<span>@</span>
								<span class="btn">
									<input type="text" name="api_email2"  id="api_email2" value="<%=api_last_e_mail %>"  title="이메일 도메인" class="input_use03" />
								</span>								
							</td>
						</tr>
						<tr>
							<th scope="row">연락처<span class="identificationListFonts">*</span></th>
							<td class="bnr4">
								<input type="text" name="api_tel1" id="api_tel1" onkeyup="chkNumber2();" value="<%=api_tel1 %>" title="연락처 앞번호"    maxlength="3" class="input_use12" />
								<span>-</span>
								<span class="btn">
									<input type="text" name="api_tel2" id="api_tel2" onkeyup="chkNumber2();" value="<%=api_tel2 %>" title="연락처 가운데번호" maxlength="4" class="input_use12" />											
								</span>
								<span>-</span>
								<span class="btn">
									<input type="text" name="api_tel3" id="api_tel3" onkeyup="chkNumber2();" value="<%=api_tel3 %>" title="연락처 뒷번호"    maxlength="4" class="input_use12" />
								</span>
							</td>
						</tr>
						<tr>
							<th scope="row">예상사용자수<span class="identificationListFonts">*</span></th>
							<td class="bnr4">
								<input type="text"  name="api_esti_user_count" id="api_esti_user_count" onkeyup="chkNumber();" value="<%=api_esti_user_count %>" title="예상사용자수" class="input_use12" />
								명
							</td>
						</tr>
						<tr>
							<th scope="row">사용서버 URL(IP)<span class="identificationListFonts">*</span></th>
							<td class="bnr4">
								<input name="api_server_ip" type="text" class="inp w301" id="api_server_ip" value="<%=api_server_ip %>" title="사용서버 URL(IP)" class="input_use01" />
							</td>
						</tr>
						<tr>
							<th scope="row">사용용도<span class="identificationListFonts">*</span></th>
							<td class="bnr4">
								API를 이용하여 어떤서비스를 구현하고자 하는지 적어주세요.<br/>고객님들의 의견은 더 좋은 S-Open API를 만들어가는데 큰 도움이 됩니다.
								<textarea name="api_use_reason" id="api_use_reason" onkeyup="len_chk3('500');" rows="12" cols="70" class="textArea"><%=api_use_reason %></textarea>
							</td>
						</tr>
						<tr>
							<th scope="row">서비스 공유<span class="identificationListFonts">*</span></th>
							<td class="bnr4">
								<div>
									<span ><a href="#" class="spanFont" onclick="window.open('http://<%=request.getServerName()%>/OpenAPI2/contents/index.vw')">S-Open API를 이용한 활용페이지</a></span>에 구축하신 서비스를 공개하시면 더 많은 개발자들이 모여 <br/>더 진보된 서비스를 만드는 바탕이 될 것입니다.
								</div>
								<div>
									<span class="spanFont02">활용페이지 서비스 공개 동의 </span>
									<input type="checkbox" name="url_check" id="url_check" value="Y" <%if(!api_use_agree.equals("N")){%>checked="checked"<%}%> />
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">지도 기준</th>
							<td class="bnr4">
								<font color="blue">현재 제공하고 있는 중부원점 기준 Open API는
									<br>2015년 하반기부터 세계측지계 기준으로 변경하여 서비스할 예정입니다.
								</font>
							</td>
						</tr>
						</tbody>
					</table>
					<div class="btnbox">
<%	if(api_approve_status.equals("S")) {	//신청%>
				<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
				<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
				<!-- 이미지 교체 필요 -->
				<a href="#" onclick="applyClicked();"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_02.gif" alt="저장" title="저장"/></a>
                <a href="#" onclick="cancelClicked();"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" alt="취소" title="취소"/></a>
                <a href="#" onclick="api_list();"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_04.gif" alt="목록" title="목록"/></a>
<%	} else if(api_approve_status.equals("A") || api_approve_status.equals("B")) { //승인, 반려%>
				<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
				<!-- 이미지 교체 필요 -->
				<a href="#" onclick="api_list(); return false;"><img src="/contents/gsks/images/button_list.gif" alt="목록" title="목록"/></a>
<%	} else {		//최초신청전%>
						<a href="#" onclick="applyClicked(); return false;"><img src="/contents/css/2014_css/img/btn/btn_application.png" alt="신청" /></a>						
<%	} %>
					</div>
			</div>
			</form>		
				<!--//회원가입-->

					<!-- center contents end -->
					</div>
					
				</div>
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div> 
		<%} %>
	</body>
</html>