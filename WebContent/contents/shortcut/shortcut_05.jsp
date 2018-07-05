<%--
/*
    ********************************************************************
    * @source      : shortcut_07.jsp
    * @description : 서비스소개-자료제공목록
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2009-10-08 정종세 수정       
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ include file="/contents/include/comVarCoding.jsp"%>

<%
  String leftMenu="shortcut";

  GeneralBroker broker = null;
  RecordModel rm = null;
  RecordModel rm1 = null;
  RecordModel rm2 = null;
  RecordModel rm3 = null;
  RecordModel rm4 = null;

  String sgis_census_info_word = "";
  String sgis_census_return_call = "";

  String sgis_census_id = "";
  String sgis_census_name = "";

  try {

    broker = new GeneralBroker("ceaa00");

    /***************************/
    /* 안내문 자료 */
    /***************************/
    lData.setString("PARAM","INFORMATION");
    rm = broker.getList(lData);

    if(rm.next()) {
      sgis_census_info_word = StringUtil.verify(StringUtil.verify((String)rm.get("sgis_census_info_word")));
      sgis_census_return_call = StringUtil.toLine(StringUtil.verify((String)rm.get("sgis_census_return_call")));
    }
     sgis_census_info_word =   org.apache.commons.lang.StringEscapeUtils.unescapeHtml(sgis_census_info_word).replaceAll("<STRONG>", "<strong>");
     sgis_census_info_word =  org.apache.commons.lang.StringEscapeUtils.unescapeHtml(sgis_census_info_word).replaceAll("</STRONG>", "</strong>");

  } catch(Exception e) {
    //out.print(e);
  }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>자료제공 | 통계청SGIS 오픈플랫폼</title>
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.bxslider.min.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<!-- <script type="text/javascript" language="javascript" src="/contents/support/support.js"></script> -->
<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
<link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/data.css" />



<script type="text/javascript" language="javascript">
	
	pageCallReg();
	
</script>

</head>

<body class="main">

	<div id="wrap">
		<!-- header // -->
		<header> 
		<!-- Top Include --> 
		<jsp:include page="/view/common/includeSearch"></jsp:include> 
		</header>

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
					href="/contents/shortcut/shortcut_05.jsp" class="active">자료제공
					목록</a> <a href="/contents/shortcut/shortcut_05_03.jsp">자료신청</a> <a
					href="/contents/shortcut/shortcut_05_01.jsp">자료 다운로드</a>

			</div>
			<div id="contents">
				<div class="account-join account-join-info">
					<div class="title">
						<h3>자료제공 목록</h3>
						<p>통계자료, 통계지역경계를 제공합니다.</p>
					</div>
				</div>


				<div id="content">
					<div class="account-modify03" style="background-color: #fafafa;">
						<div class="pl20 pr20">
							<h4 class="downloadInfo01">참고사항</h4>
							<ul>
								<li class="listS">지리정보 기준시점 : 기준년도 12월31일</li>
								<li class="listS">지리정보 좌표계 : UTM-K(GRS80타원체)</li>
								<li class="listS">서비스 제한 기준 : 집계구별 5미만 통계값 서비스제외(총괄항목은 미적용)</li>
								<!-- <li class="listS">과거 집계구 자료신청도 가능합니다.</li> -->
							</ul>
						</div>
					</div>

					<!-- 루프 start -->

					<div class="mt40">
						<p class="bullet_01_tit mb15">통계자료</p>
						<table class="tbl-normal none-head">

							<tr>
								<th class="first" width="170px">대상자료명</th>
								<th width="200px">기준년도</th>
								<th width="90px">자료형식</th>
								<th width="90px">공개여부</th>
								<th width="90px">대상지역</th>
								<th class="last" width="90px">가격</th>
							</tr>


							<tr>
								<td>집계구별 통계(인구)</td>
								<td>2016, 2015, 2010, 2005, 2000</td>
								<td>txt</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>집계구별 통계(가구)</td>
								<td>2016, 2015, 2010, 2005, 2000</td>
								<td>txt</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>집계구별 통계(주택)</td>
								<td>2016, 2015, 2010, 2005, 2000</td>
								<td>txt</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>집계구별 통계(사업체)</td>
								<td>2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005,
									2004, 2003, 2002, 2001, 2000</td>
								<td>txt</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>


						</table>

						<p class="bullet_01_tit mb15">통계지역경계</p>
						<table class="tbl-normal none-head">

							<tr>
								<th class="first" width="170px">대상자료명</th>
								<th width="200px">기준년도</th>
								<th width="90px">자료형식</th>
								<th width="90px">공개여부</th>
								<th width="90px">대상지역</th>
								<th class="last" width="90px">가격</th>
							</tr>


							<tr>
								<td>센서스용 행정구역경계(전체)</td>
								<td>2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005,
									2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>센서스용 행정구역경계(시도)</td>
								<td>2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005,
									2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>센서스용 행정구역경계(시군구)</td>
								<td>2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005,
									2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>센서스용 행정구역경계(읍면동)</td>
								<td>2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005,
									2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>도시화지역</td>
								<td>2016</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>도시권경계</td>
								<td>2005</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>집계구경계</td>
								<td>2016, 2015</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>




						</table>
						
						<p class="bullet_01_tit mb15">센서스지도</p>
						<table >
							<tr>
								<td align='left'>통계지리정보시스템에서는 더이상 지도 데이터를 제공하지 않습니다. 
									<br/>지도 데이터가 필요하신 사용자께서는 링크된 설명서를 다운로드 받아 도로명 지도를 신청하시기 바랍니다.
									<br/>&nbsp;
								</td>
							</tr>
							<tr>
								<td align='left'><a href="/upload/census/howtoapply_roadnamemap.pdf"><font color='blue'>* 도로명 지도 신청 방법</font></a></td>
							</tr>
						</table>
						
						<!-- 
						<p class="bullet_01_tit mb15">센서스지도</p>
						<table class="tbl-normal none-head">
							<tr>
								<th class="first" width="170px">대상자료명</th>
								<th width="200px">기준년도</th>
								<th width="90px">자료형식</th>
								<th width="90px">공개여부</th>
								<th width="90px">대상지역</th>
								<th class="last" width="90px">가격</th>
							</tr>


							<tr>
								<td>DB설계</td>
								<td>2013</td>
								<td>hwp</td>
								<td>공개</td>
								<td>-</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>하천</td>
								<td>2013</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>건물</td>
								<td>2013</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>도로</td>
								<td>2013</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>철도</td>
								<td>2013</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>



							<tr>
								<td>등고</td>
								<td>2013</td>
								<td>SHP</td>
								<td>공개</td>
								<td>전국</td>
								<td class="last"><a href="#">무료</a></td>
							</tr>




						</table>
						
						 -->


						<!-- 
				<div class="listTitle">세종시 특별센서스</div>				
				<table class="listTable">
				<caption>통계자료</caption>
					<tr>
						<th class="first" width="170px">대상자료명</th>
						<th width="200px">기준년도</th>
						<th width="90px">자료형식</th>
						<th width="90px">공개여부</th>
						<th width="90px">대상지역</th>
						<th class="last" width="90px">가격</th>
					</tr>
  					
					
					<tr>
						<td>집계구별 통계(인구)</td>
						<td>2013</td>
						<td>txt</td>
						<td>공개</td>
						<td>세종시</td>
						<td><a href="#">무료</a></td>
					</tr>
					
						
					
					<tr>
						<td>집계구별 통계(가구)</td>
						<td>2013</td>
						<td>txt</td>
						<td>공개</td>
						<td>세종시</td>
						<td><a href="#">무료</a></td>
					</tr>
					
						
					
					<tr>
						<td>집계구별 통계(주택)</td>
						<td>2013</td>
						<td>txt</td>
						<td>공개</td>
						<td>세종시</td>
						<td><a href="#">무료</a></td>
					</tr>
					
	
 	
								
			</table>
			 -->

						<!-- 루프 end -->


						<p class="lnfo">문의사항연락처: ☏ 042-481-2438, parkkb@korea.kr</p>
					</div>


					<!-- // 공간통계자료제공-->
					<!-- center contents end -->
					<br />
					<br />&nbsp;
				</div>
			</div>
		</div>
		<!-- cls:contents end -->
		<!-- <footer id="footer">
			      <script type="text/javascript"  src="/js/common/includeBottom.js"></script>
			</footer> -->
		<!-- //footer -->
		<footer id="footer"> <jsp:include
			page="/view/common/includeBottom"></jsp:include> </footer>
	</div>

</body>
</html>