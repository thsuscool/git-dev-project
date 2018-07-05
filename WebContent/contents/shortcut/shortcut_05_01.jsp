<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"%>

<!-- 2017. 11. 09 [개발팀] 추가 START -->
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<!-- 2017. 11. 09 [개발팀] 추가 END -->

<%@ include file="/contents/include/comVarCoding.jsp"%>
<%-- <%@ include file="/contents/include/logger.jsp"%> --%>
<%
    if(loginYn.equals("N")) {
    	out.println("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
    	out.println("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>");
    	out.println("<head>");
    	out.println("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
    	out.println("<title>센서스 공간통계 자료 다운로드:통계지리 정보서비스</title>");
    	out.println("</head>");
    	out.println("<body>");
        out.println("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); location.href='/view/member/login_new?returnPage=/contents/shortcut/shortcut_05_01.jsp'; </script> ");
    } else {

    GeneralBroker broker = null;

  RecordModel rm = null;
  RecordModel rm1 = null;
  RecordModel rm2 = null;
  RecordModel rm3 = null;

    String leftMenu="shortcut";

    String sgis_census_info_word = "";
    String sgis_census_return_call = "";

    try {

        broker = new GeneralBroker("ceaa00");

        /***************************/
        /* 안내문 자료 */
        /***************************/
        lData.setString("PARAM","INFORMATION");
        rm1 = broker.getList(lData);

                        if(rm1.next()) {
                            sgis_census_info_word = StringUtil.toLine(StringUtil.verify((String)rm1.get("sgis_census_info_word")));
                            sgis_census_return_call = StringUtil.toLine(StringUtil.verify((String)rm1.get("sgis_census_return_call")));
                        }

    } catch(Exception e) {
        System.out.print("sgisWebError : ");
      //2015-12-03 시큐어코딩
      //e.printStackTrace();
      //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>자료제공 | 통계청SGIS 오픈플랫폼</title>
<link href="/css/default.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/css/main.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/data.css" />

<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.bxslider.min.js"></script>

<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>


<link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/data.css" />

<script type="text/javascript" language="javascript">
	//<![CDATA[
	           
	pageCallReg();
	           
	function census_download(num,a,b) {
	    var fm=document.censusFm;
	    /* //- 2010.01.08 다운로드 카운팅 증가 임시제거 -//
		if (num == "0") {
	        //downloadIfr.location.href="/contents/include/download.jsp?filename="+fm.filename.value+ "&path=/census/";
	        downcountIfr.location.href="shortcut_05_01_01.jsp?sgis_census_req_id="+fm.sgis_census_req_id.value+"&sgis_census_id="+fm.sgis_census_id.value+"&sgis_census_data_id="+fm.sgis_census_data_id.value+"&sgis_census_req_year="+fm.sgis_census_req_year.value;
	    }else{
	        downcountIfr.location.href="shortcut_05_01_01.jsp?sgis_census_req_id="+fm.sgis_census_req_id[num].value+"&sgis_census_id="+fm.sgis_census_id[num].value+"&sgis_census_data_id="+fm.sgis_census_data_id[num].value+"&sgis_census_req_year="+fm.sgis_census_req_year[num].value;
	    }
		*/
	    fileDownload(a,b);
	}
	//]]>

	</script>
</head>


<body class="main">

	<div id="wrap">
		<!-- header // -->
		<!-- <header id="header">
			Top Include
			<script type="text/javascript"  src="/js/common/includeSearch.js"></script>
		</header> -->
		<header> <!-- Top Include --> <jsp:include
			page="/view/common/includeSearch"></jsp:include> </header>
		<!-- body -->

		<div id="container">
			<p class="path">
				<a href="#"> <span class="path_el">처음페이지&nbsp;&nbsp;&gt;&nbsp;</span>
				</a> <a href="#"> <span class="path_el">알림마당&nbsp;&nbsp;&gt;&nbsp;</span>
				</a> <a href="#"> <span class="path_el current">자료신청</span>
				</a>
			</p>
			<h2 class="ctit">자료신청</h2>
			<p class="smr">통계청에서 자체 생산한 통계지리정보 자료를 제공하는 것으로 파일형태로 서비스하고 있습니다.</p>
			<div class="tabs">
				<a href="/contents/shortcut/shortcut_05_02.jsp">서비스 소개</a> <a
					href="/contents/shortcut/shortcut_05.jsp">자료제공 목록</a> <a
					href="/contents/shortcut/shortcut_05_03.jsp">자료신청</a> <a
					href="/contents/shortcut/shortcut_05_01.jsp" class="active">자료
					다운로드</a>
			</div>



			<div id="contents">
				<div class="account-join account-join-info">
					<div class="title">
						<h3>자료다운로드</h3>
						<p>요청하신 자료를 다운받아 사용할 수 있습니다</p>
					</div>
				</div>



				<div id="content">
					<div class="account-modify02" style="background-color: #fafafa;">
						<div class="pl20 pr20">
							<ul>
								<h4 class="downloadInfo01">※ 제공자료에 대한 자세한 내용은 아래문서 참조</h4>
								<!-- 
								<li class="listS"><a
									href="/upload/census/oa_statistics_guide.hwp"
									style="color: #0000FF">집계구별 통계자료 이용안내</a></li>
								 -->
								<li class="listS"><a
									href="/upload/census/GIS_statistics_guid.zip"
									style="color: #0000FF">공간통계자료제공 안내</a></li>
								<!-- <li class="listS"><a href="/upload/census/2010_oa_item_identifier_code.xls" style="color:#0000FF">2010년 집계구별 통계항목 코드</a></li> -->
								<li class="listS"><a href="/upload/census/SOP_prj_utmk.zip"
									style="color: #0000FF">자료제공에서 사용되는 좌표계</a></li>
								
								<!-- 
								<li class="listS"><a href="/upload/census/adm_code.xls"
									style="color: #0000FF">SGIS 행정구역코드</a></li>
								<li class="listS"><a href="/upload/census/db_schema.hwp"
									style="color: #0000FF">SGIS 통계지리정보서비스 DB Schema 다운로드</a></li>
								<li class="listS"><a href="/upload/statistics_code.xls"
									style="color: #0000FF">집계구별 통계항목코드</a></li>
								 -->
							</ul>
							<br />
							<ul>
								<h4 class="downloadInfo01">※ 참고사항</h4>
								<li class="listS">지리정보 기준시점 : 기준년도 12월31일</li>
								<li class="listS">지리정보 좌표계 : UTM-K(GRS80타원체)</li>
								<li class="listS">서비스 제한 기준 : 집계구별 5미만 통계값 서비스제외(총괄항목은 미적용)</li>
							</ul>

							<br />

							<ul>
								<h4 class="downloadInfo01">※ SGIS 서비스 이용시 유의사항</h4>
								<li class="listS" style="line-height:18px;">SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업
									등의 자료를 제외하고 최신 경계를 반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다. 아래 사항을
									유의하여 SGIS 서비스를 이용하시기 바랍니다.</li>
								<h7
									style="color:#F86F5A; font-weight:bold; margin-bottom:8px; margin-left:320px;">1.
								제외된 자료</h7>
								<li class="listS" style="line-height:18px;">인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대,
									전투경찰대, 의무소방대 등의 특별 조사구와 외국인</li>
								<li class="listS">사업체 센서스 : 개인운수업(사업장이 일정치 않음)</li>
								<h7
									style="color:#F86F5A; font-weight:bold; margin-bottom:8px; margin-left:320px;">2.
								최신 경계 반영에 따른 차이</h7>
								<li class="listS" style="line-height:18px;">SGIS는 최신 행정구역 경계에 맞추어 서비스함에 따라 KOSIS 자료와
									다를 수 있음</li>
								<h7 style="color:#F86F5A; font-weight:bold; margin-bottom:8px; margin-left:320px;">
									3. 2015, 2016년 자료제공 특이사항
								</h7>
								<li class="listS" style="line-height:18px;">
									2015, 2016년 자료제공 항목중 교육정도별 인구, 성/혼인상태별 인구, 점유형태별 가구, 건축년도별 주택은 자료제공항목에서  제외되었습니다.(2015, 2016년 인구주택총조사 전수조사에서 제외됨)
								</li>
								
								<h7 style="color:#F86F5A; font-weight:bold; margin-bottom:8px; margin-left:320px;">
									4. 압축해제
								</h7>
								<li class="listS" style="line-height:18px;">
									윈도우 기본 압축 프로그램으로 압축 풀기가 않될 경우 무료 압축 프로그램을 설치 후 압축해제해 주시기 바랍니다.
								</li>
								
							</ul>

						</div>
					</div>

					<br />
					<!-- <div><a href="/upload/census/db_schema.hwp" style="font-weight:bold; color:#0000FF">* SGIS 통계지리정보서비스 DB Schema 다운로드</a></div> -->


					<p class="bullet_01_tit mb15">다운로드&nbsp;&nbsp;<a href="/upload/census/ref_code.zip"><img src="/contents/images/ref_down_btn2.png" style="height:40px; vertical-align:middle;" alt="코드표 및 이용설명서"/></a></p>

					<form name="censusFm" method="post" action="">
						<input type="hidden" name="filename" value="" /> <input
							type="hidden" name="path" value="" />

						<table class="tbl-normal none-head">
							<tr>
								<!-- 2017. 11. 10 [개발팀] 수정 START -->
								<th style="text-align: center;">자료구분</th>
								<th style="text-align: center;">대상자료명</th>
								<!-- <th style="text-align: center;">요청년도</th> -->
								<th style="text-align: center; width: 120px;">게시시작일</th>
								<th style="text-align: center; width: 120px;">게시종료일자</th>
								<th class="last" style="text-align: center; width: 150px;">다운로드</th>
								<!-- 2017. 11. 10 [개발팀] 수정 END -->
							</tr>
							<%
    try {
        broker = new GeneralBroker("ceaa00");
        int totCount=0;

        lData.setString("PARAM", "CENSUS_DOWN_DATA");
        lData.setString("sc_userkey", sc_userkey);

        rm =  broker.getList(lData);
        totCount = rm.getRowCount();
        
        // 2017. 11. 09 [개발팀] 추가 및 변경 START
		int rowcnt = 0 ;
		
		String tempReqId = "";
		String tempReqTxtName = "";
		String tempZipfilePath = "";
		String tempZipfileName = "";
		String tempCensusName = "";
		String tempReqYear = "";
		String tempReqStartYear = "";
		String tempReqEndYear = "";
		
		List loadDownDataList = new ArrayList();
		
		while(rm != null && rm.next()) {
			Map tempDataMap = new HashMap();
			
			String sgis_census_req_id 	= String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
			String sgis_census_id 		= String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			String sgis_census_data_id 	= String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			String sgis_census_name 		= StringUtil.verify((String)rm.get("sgis_census_code_name"));
			String sgis_census_data_name 	= StringUtil.verify((String)rm.get("sgis_census_data_name"));
			String sgis_census_req_year 	= StringUtil.verify((String)rm.get("sgis_census_req_year"));
			//String sgis_census_location = StringUtil.verify((String)rm.get("sgis_census_location"));
			String sgis_census_req_y_s_d 	= StringUtil.verify((String)rm.get("sgis_census_req_y_s_d"));
			String sgis_census_req_y_e_d 	= StringUtil.verify((String)rm.get("sgis_census_req_y_e_d"));
			String sgis_census_dir 		= StringUtil.verify((String)rm.get("sgis_census_dir"));
			String sgis_census_file 		= StringUtil.verify((String)rm.get("sgis_census_file"));
			
			String sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
			String sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
			String zipfile_path = StringUtil.verify((String)rm.get("zipfile_path"));
			String zipfile_name = StringUtil.verify((String)rm.get("zipfile_name"));
			
			// 통계자료의 경우 여러개의 텍스트 파일에 대한 정보를 보여줘야 함에 따라 이전 요청 id 를 저장
			if(tempReqId.equals("")) {
				tempReqId = sgis_census_req_id;
			}
			
			// 마지막 row 일 경우 임시 저장된 항목을 LIST 에 저장
			if((totCount - 1) == rm.getCurrentIndex() && tempReqTxtName.length() > 1) {
				if(sgis_census_req_id.equals(tempReqId) && (sgis_census_id.equals("1") || sgis_census_id.equals("4"))) {
					tempReqTxtName += sgis_census_req_year + "년 " + sgis_census_detail_data_nm + "</br>";
					tempZipfilePath = zipfile_path;
					tempZipfileName = zipfile_name;
					tempCensusName += sgis_census_name + "</br>";
					
					tempReqId = sgis_census_req_id;
				}
				
				tempDataMap.put("sgis_census_req_id", tempReqId);
				tempDataMap.put("sgis_census_id", sgis_census_id);
				tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
				tempDataMap.put("sgis_census_name", tempCensusName);
				
				if(tempReqTxtName.equals("")) {
					tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_detail_data_nm);
				} else {
					tempDataMap.put("sgis_census_data_name", tempReqTxtName);
				}
				
				tempDataMap.put("sgis_census_req_year", sgis_census_req_year);
				tempDataMap.put("sgis_census_req_y_s_d", sgis_census_req_y_s_d);
				tempDataMap.put("sgis_census_req_y_e_d", sgis_census_req_y_e_d);
				
				if(tempZipfilePath.equals("")) {
					tempDataMap.put("sgis_census_dir", zipfile_path);
					tempDataMap.put("sgis_census_file", zipfile_path + zipfile_name);
					tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(zipfile_name,15));
				} else {
					tempDataMap.put("sgis_census_dir", tempZipfilePath);
					tempDataMap.put("sgis_census_file", tempZipfilePath + tempZipfileName);
					tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(tempZipfileName,15));
				}
				
				loadDownDataList.add(tempDataMap);
				
				tempReqId = sgis_census_req_id;
				tempReqTxtName = "";
				tempZipfilePath = "";
				tempZipfileName = "";
				tempCensusName = "";
				
				tempDataMap = new HashMap();
			}
			
			// 임시 저장된 요청 id 와 다를 경우 임시 저장한 통계자료 정보를 LIST 에 저장
			if(!sgis_census_req_id.equals(tempReqId) && tempReqTxtName.length() > 1) {
				tempDataMap.put("sgis_census_req_id", tempReqId);
				tempDataMap.put("sgis_census_id", sgis_census_id);
				tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
				tempDataMap.put("sgis_census_name", tempCensusName);
				
				if(tempReqTxtName.equals("")) {
					tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_detail_data_nm);
				} else {
					tempDataMap.put("sgis_census_data_name", tempReqTxtName);
				}
				
				tempDataMap.put("sgis_census_req_year", tempReqYear);
				tempDataMap.put("sgis_census_req_y_s_d", tempReqStartYear);
				tempDataMap.put("sgis_census_req_y_e_d", tempReqEndYear);
				
				if(tempZipfilePath.equals("")) {
					tempDataMap.put("sgis_census_dir", zipfile_path);
					tempDataMap.put("sgis_census_file", zipfile_path + zipfile_name);
					tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(zipfile_name,15));
				} else {
					tempDataMap.put("sgis_census_dir", tempZipfilePath);
					tempDataMap.put("sgis_census_file", tempZipfilePath + tempZipfileName);
					tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(tempZipfileName,15));
				}
				
				loadDownDataList.add(tempDataMap);
				
				tempReqId = sgis_census_req_id;
				tempReqTxtName = "";
				tempZipfilePath = "";
				tempZipfileName = "";
				tempCensusName = "";
				tempDataMap = new HashMap();
			} else {
				tempReqId = sgis_census_req_id;
				tempReqYear = sgis_census_req_year;
				tempReqStartYear = sgis_census_req_y_s_d;
				tempReqEndYear = sgis_census_req_y_e_d;

			}
			
			// 같은 요청 id 에 한하여 통계자료, 세종시 통계자료 요청일 경우 요청한 텍스트 파일명을 모두 저장, 동적 압축파일의 경로와 이름은 동일하므로 저장하여 놓는다
            
            // 2018. 01. 29 이전 신청 내역의 경우 분기처리
            // if(tempIntVal > 4468 값은 해당 DB 의 소스 적용 시점의 MAX(sgis_census_req_id) 값으로 변경 필요
            int tempIntVal = Integer.parseInt(sgis_census_req_id);            
			if(tempIntVal > 4468 && sgis_census_req_id.equals(tempReqId) && (sgis_census_id.equals("1") || sgis_census_id.equals("4"))) {
				tempReqTxtName += sgis_census_req_year + "년 " + sgis_census_detail_data_nm + "</br>";
				tempZipfilePath = zipfile_path;
				tempZipfileName = zipfile_name;
				tempCensusName += sgis_census_name + "</br>";
				
				tempReqId = sgis_census_req_id;
				continue;
			} 
			// 경계 요청일 경우 LIST 에 바로 저장한다
			//else if(!sgis_census_id.equals("1") && !sgis_census_id.equals("4")) {
			else if(sgis_census_id.equals("2")) { //2이면 통계지역경계 20180131 김준하
				tempDataMap.put("sgis_census_req_id", sgis_census_req_id);
				tempDataMap.put("sgis_census_id", sgis_census_id);
				tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
				tempDataMap.put("sgis_census_name", sgis_census_name);
				tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_data_name);
				tempDataMap.put("sgis_census_req_year", sgis_census_req_year);
				tempDataMap.put("sgis_census_req_y_s_d", sgis_census_req_y_s_d);
				tempDataMap.put("sgis_census_req_y_e_d", sgis_census_req_y_e_d);
				tempDataMap.put("sgis_census_dir", sgis_census_dir);
				tempDataMap.put("sgis_census_file", sgis_census_dir + "/" + sgis_census_file);
				tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(sgis_census_file,15));
				
				loadDownDataList.add(tempDataMap);
			}
            // 2018. 01. 29 이전 신청 내역의 경우 분기처리
            else if(sgis_census_id.equals("1") || sgis_census_id.equals("4")) {
				tempDataMap.put("sgis_census_req_id", sgis_census_req_id);
				tempDataMap.put("sgis_census_id", sgis_census_id);
				tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
				tempDataMap.put("sgis_census_name", sgis_census_name);
				tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_data_name);
				tempDataMap.put("sgis_census_req_year", sgis_census_req_year);
				tempDataMap.put("sgis_census_req_y_s_d", sgis_census_req_y_s_d);
				tempDataMap.put("sgis_census_req_y_e_d", sgis_census_req_y_e_d);
				tempDataMap.put("sgis_census_dir", sgis_census_dir);
				tempDataMap.put("sgis_census_file", sgis_census_dir + "/" + sgis_census_file);
				tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(sgis_census_file,15));
				
				loadDownDataList.add(tempDataMap);
			}
			
			//out.println("sgis_census_file [" + sgis_census_file + "]");
			
			// String short_sgis_census_file = StringUtil.toShortenStringB(sgis_census_file,15);
			// sgis_census_file = sgis_census_dir + "/" + sgis_census_file;
		}
		
		// LIST 에 저장된 내용을 화면에 표출
		for(int i = 0; i < loadDownDataList.size(); i++) {
			Map tempMap = (Map) loadDownDataList.get(i);
			
			String sgis_census_req_id = (String) tempMap.get("sgis_census_req_id");
			String sgis_census_id = (String) tempMap.get("sgis_census_id");
			String sgis_census_data_id = (String) tempMap.get("sgis_census_data_id");
			
			String sgis_census_name = (String) tempMap.get("sgis_census_name");
			String sgis_census_data_name = (String) tempMap.get("sgis_census_data_name");
			String sgis_census_req_year = (String) tempMap.get("sgis_census_req_year");
			String sgis_census_req_y_s_d = (String) tempMap.get("sgis_census_req_y_s_d");
			String sgis_census_req_y_e_d = (String) tempMap.get("sgis_census_req_y_e_d");
			String sgis_census_file = (String) tempMap.get("sgis_census_file");
			String short_sgis_census_file = (String) tempMap.get("short_sgis_census_file");
		// 2017. 11. 09 [개발팀] 추가 및 변경 END
%>
							<tr>
								<td style="text-align: left; padding-left: 10px;"><%=sgis_census_name %></td>
								<td style="text-align: left; padding-left: 10px;"><%=sgis_census_data_name %></td>
								<!-- 2017. 11. 10 [개발팀] 수정 -->
								<!-- <td><%=sgis_census_req_year %></td> -->
								<td><%=sgis_census_req_y_s_d %></td>
								<td><%=sgis_census_req_y_e_d %></td>
								<td title="<%//=sgis_census_file %>" align="left" class="last">



							<%
					            if("/census/data/bas_cntr/bas_cntr_00_2013.egg".equals( sgis_census_file ) ) { //bas_cntr_00_2013.egg파일이 4기가 여서 다운이 않되 분할 링크를 검
					        %> <a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol1.egg'); return false;">bas_cntr_00_2013.vol1.egg</a><br />
									<a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol2.egg'); return false;">bas_cntr_00_2013.vol2.egg</a><br />
									<a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol3.egg'); return false;">bas_cntr_00_2013.vol3.egg</a><br />
									<a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol4.egg'); return false;">bas_cntr_00_2013.vol4.egg</a><br />
									<a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol5.egg'); return false;">bas_cntr_00_2013.vol5.egg</a><br />
									<a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol6.egg'); return false;">bas_cntr_00_2013.vol6.egg</a><br />
									<a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol7.egg'); return false;">bas_cntr_00_2013.vol7.egg</a><br />
									<a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol8.egg'); return false;">bas_cntr_00_2013.vol8.egg</a>

									<!-- 
					            	<br />
					            	<br />
					            	분할 압축파일입니다.
					            	<br />
					            	모두 다운 후 알집에서
					            	<br />
					            	bas_cntr_00_2013.vol1.egg
					            	<br />
					            	파일을 더블클릭하세요.
					            	 --> <%
								} else {
							%> <a
									href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>"
									onclick="census_download('<%=rowcnt %>',censusFm,'<%=sgis_census_file%>'); return false;"><%=short_sgis_census_file %></a>
									<%
					            }
					        %> <input type="hidden" name="sgis_census_req_id"
									value="<%=sgis_census_req_id %>" /> <input type="hidden"
									name="sgis_census_id" value="<%=sgis_census_id %>" /> <input
									type="hidden" name="sgis_census_data_id"
									value="<%=sgis_census_data_id %>" /> <input type="hidden"
									name="sgis_census_req_year" value="<%=sgis_census_req_year %>" />
								</td>
							</tr>
							<% rowcnt++; } %>
							<%if(rowcnt == 0) {%>
							<tr>
								<th colspan="6">데이터가 존재하지 않습니다.</th>
							</tr>
							<%} %>

							<% } catch(Exception e) {
        System.out.print("sgisWebError : ");
      //2015-12-03 시큐어코딩
      //e.printStackTrace();
      //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
}
%>
						</table>
					</form>

					<p class="lnfo">문의사항연락처: ☏042-481-2438, parkkb@korea.kr</p>
					
					
				</div>


				<!-- // 공간통계자료제공-->
				<!-- center contents end -->
				<br />
				<br />&nbsp;
			</div>

		</div>
	</div>
	<!-- cls:contents end -->
	<!-- cls:footer start -->
	<!-- footer// -->
	<!-- <footer id="footer">
			      <script type="text/javascript"  src="/js/common/includeBottom.js"></script>
			</footer> -->
	<footer id="footer"> <jsp:include
		page="/view/common/includeBottom"></jsp:include> </footer>
	<!-- //footer -->
	</div>
	<%} %>
	
	
	<!-- <div style="position:fixed; left:1200px; bottom: 140px; "><a href="/upload/census/ref_code.zip"><img src="/contents/images/ref_down_btn.png" alt="필수참조코드다운로드"/></a></div> -->
	
</body>
</html>